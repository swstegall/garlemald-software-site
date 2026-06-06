#!/usr/bin/env node
// Build-time content fetcher. Pulls every project's README (per branch), its
// curated docs, and its latest + recent GitHub releases, then writes a single
// baked blob to src/data/generated/content.json that the static export embeds.
//
// Design goals:
//  - Fail SOFT. A 404 doc is skipped; an unreachable GitHub leaves that project
//    partially/empty-populated. A total failure writes an `offline: true` blob
//    so `next build` still succeeds (the client live-refresh layer fills in).
//  - No dependencies. Uses Node's global fetch (Node >= 20).
//  - Honour GITHUB_TOKEN (Authorization) to avoid the 60 req/hr anon limit in CI.

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT = resolve(ROOT, "src/data/generated/content.json");

const { PROJECTS } = await import(
  resolve(ROOT, "src/data/registry.mjs").replace(/\\/g, "/")
).then((m) => m).catch(async () => {
  // Windows-safe import fallback.
  return await import(new URL("../src/data/registry.mjs", import.meta.url));
});

const TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";
const UA = "garlemald-software-site-content-fetcher";

function ghHeaders(json = false) {
  const h = { "User-Agent": UA };
  if (json) h.Accept = "application/vnd.github+json";
  if (TOKEN) h.Authorization = `Bearer ${TOKEN}`;
  return h;
}

async function fetchText(url) {
  try {
    const res = await fetch(url, { headers: ghHeaders(false) });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

async function fetchJson(url) {
  try {
    const res = await fetch(url, { headers: ghHeaders(true) });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

function rawUrl(owner, repo, branch, path) {
  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
}

// --- asset classification (mirrors src/lib/github.ts) -----------------------
function platformForAsset(name) {
  const n = name.toLowerCase();
  if (n.includes("universal-apple-darwin")) return "Universal";
  if (n.includes("apple-darwin") || n.includes("macos") || n.includes("darwin")) return "macOS";
  if (n.includes("windows") || n.includes("msvc") || n.endsWith(".exe") || n.includes("-pc-")) return "Windows";
  if (n.includes("linux") || n.includes("unknown-linux")) return "Linux";
  return "Unknown";
}
function archForAsset(name) {
  const n = name.toLowerCase();
  if (n.includes("universal")) return "universal";
  if (n.includes("aarch64") || n.includes("arm64")) return "aarch64";
  if (n.includes("x86_64") || n.includes("amd64") || n.includes("x64")) return "x86_64";
  if (n.includes("i686") || n.includes("x86")) return "i686";
  return "";
}
function kindForAsset(name) {
  const n = name.toLowerCase();
  if (n.endsWith(".sha256") || n.endsWith(".sha256sum") || n.endsWith(".md5")) return "checksum";
  if (n.endsWith(".tar.gz") || n.endsWith(".tgz") || n.endsWith(".zip") || n.endsWith(".dmg") || n.endsWith(".exe")) return "archive";
  return "other";
}
function classifyAsset(a) {
  return {
    name: a.name,
    size: a.size,
    downloadUrl: a.browser_download_url || a.url || "",
    contentType: a.content_type,
    platform: platformForAsset(a.name),
    arch: archForAsset(a.name),
    kind: kindForAsset(a.name),
  };
}

function docSlugFor(path) {
  return path.replace(/\.md$/i, "").replace(/[/\\]+/g, "-").replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();
}

async function fetchProject(project) {
  let anySuccess = false;

  // READMEs per branch.
  const readmeByBranch = {};
  for (const branch of project.branches) {
    const md = await fetchText(rawUrl(project.owner, project.repo, branch, "README.md"));
    if (md != null) {
      readmeByBranch[branch] = md;
      anySuccess = true;
    }
  }

  // Curated docs (from the default branch). 404 => skip.
  const docs = [];
  for (const doc of project.docs) {
    const md = await fetchText(rawUrl(project.owner, project.repo, project.defaultBranch, doc.path));
    if (md != null) {
      docs.push({
        path: doc.path,
        title: doc.title,
        // Optional section grouping for the Docs tab (e.g. "Contributing").
        // Omitted entirely when unset so the baked blob stays minimal.
        ...(doc.group ? { group: doc.group } : {}),
        branch: project.defaultBranch,
        markdown: md,
        docSlug: docSlugFor(doc.path),
      });
      anySuccess = true;
    }
  }

  // Releases.
  let latestRelease = null;
  let releases = [];
  if (project.hasReleases) {
    const latest = await fetchJson(`https://api.github.com/repos/${project.owner}/${project.repo}/releases/latest`);
    if (latest && latest.tag_name) {
      latestRelease = {
        tag: latest.tag_name,
        name: latest.name || latest.tag_name,
        htmlUrl: latest.html_url,
        publishedAt: latest.published_at,
        body: latest.body || "",
        isPrerelease: !!latest.prerelease,
        assets: (latest.assets || []).map(classifyAsset),
      };
      anySuccess = true;
    }
    const list = await fetchJson(`https://api.github.com/repos/${project.owner}/${project.repo}/releases?per_page=10`);
    if (Array.isArray(list)) {
      releases = list.map((r) => ({
        tag: r.tag_name,
        htmlUrl: r.html_url,
        publishedAt: r.published_at,
      }));
      anySuccess = true;
    }
  }

  return {
    content: { slug: project.slug, readmeByBranch, docs, latestRelease, releases },
    anySuccess,
  };
}

async function main() {
  console.log(`[fetch-content] fetching ${PROJECTS.length} projects${TOKEN ? " (authenticated)" : " (anonymous)"}…`);
  const projects = {};
  let anyOk = false;

  const results = await Promise.all(
    PROJECTS.map(async (p) => {
      const r = await fetchProject(p);
      const branches = Object.keys(r.content.readmeByBranch).length;
      const rel = r.content.latestRelease ? r.content.latestRelease.tag : "—";
      console.log(`[fetch-content]   ${p.slug}: ${branches} README branch(es), ${r.content.docs.length} doc(s), release ${rel}`);
      return { slug: p.slug, ...r };
    }),
  );

  for (const r of results) {
    projects[r.slug] = r.content;
    if (r.anySuccess) anyOk = true;
  }

  const blob = {
    generatedAt: new Date().toISOString(),
    offline: !anyOk,
    projects,
  };

  await mkdir(dirname(OUT), { recursive: true });
  await writeFile(OUT, JSON.stringify(blob, null, 2) + "\n", "utf8");
  console.log(`[fetch-content] wrote ${OUT}${anyOk ? "" : " (OFFLINE fallback — all fetches failed)"}`);
}

await main();
