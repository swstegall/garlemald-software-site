// Access layer for the build-time-baked content blob and the client-side
// "live refresh" that swaps in newer data from GitHub when available.

import generated from "@/data/generated/content.json";
import type {
  GeneratedContent,
  ProjectContent,
  Release,
} from "./types";
import {
  apiLatestReleaseUrl,
  apiReleasesUrl,
  classifyAsset,
  rawUrl,
} from "./github";
import { getProject } from "./projects";

export const CONTENT = generated as unknown as GeneratedContent;

export function getProjectContent(slug: string): ProjectContent | undefined {
  return CONTENT.projects[slug];
}

const EMPTY_CONTENT: ProjectContent = {
  slug: "",
  readmeByBranch: {},
  docs: [],
  latestRelease: null,
  releases: [],
};

export function getProjectContentOrEmpty(slug: string): ProjectContent {
  return CONTENT.projects[slug] ?? { ...EMPTY_CONTENT, slug };
}

// ---------------------------------------------------------------------------
// Client-side live refresh helpers. These run only in the browser as a
// progressive enhancement; every call fails soft and the baked snapshot stands.
// ---------------------------------------------------------------------------

/** Fetch a fresh README for a branch from raw.githubusercontent. */
export async function fetchLiveReadme(
  slug: string,
  branch: string,
): Promise<string | null> {
  const project = getProject(slug);
  if (!project) return null;
  try {
    const res = await fetch(
      rawUrl(project.owner, project.repo, branch, "README.md"),
      { cache: "no-store" },
    );
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

/** Fetch fresh arbitrary markdown for a doc path from a branch. */
export async function fetchLiveMarkdown(
  slug: string,
  branch: string,
  path: string,
): Promise<string | null> {
  const project = getProject(slug);
  if (!project) return null;
  try {
    const res = await fetch(rawUrl(project.owner, project.repo, branch, path), {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

interface GitHubApiRelease {
  tag_name: string;
  name: string | null;
  html_url: string;
  published_at: string;
  prerelease: boolean;
  body: string | null;
  assets: Array<{
    name: string;
    size: number;
    browser_download_url: string;
    content_type: string;
  }>;
}

/** Fetch the latest release live from the GitHub API. Fails soft to null. */
export async function fetchLiveLatestRelease(
  slug: string,
): Promise<Release | null> {
  const project = getProject(slug);
  if (!project || !project.hasReleases) return null;
  try {
    const res = await fetch(apiLatestReleaseUrl(project.owner, project.repo), {
      cache: "no-store",
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) return null;
    const r = (await res.json()) as GitHubApiRelease;
    return {
      tag: r.tag_name,
      name: r.name || r.tag_name,
      htmlUrl: r.html_url,
      publishedAt: r.published_at,
      body: r.body || "",
      isPrerelease: r.prerelease,
      assets: (r.assets || []).map(classifyAsset),
    };
  } catch {
    return null;
  }
}

export { apiReleasesUrl };
