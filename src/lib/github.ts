// GitHub URL builders and release-asset classification, shared by the
// build-time fetcher (logic mirrored in scripts/fetch-content.mjs) and the
// client-side live-refresh layer.

import type { Platform, ReleaseAsset } from "./types";

export function repoUrl(owner: string, repo: string): string {
  return `https://github.com/${owner}/${repo}`;
}

export function rawUrl(
  owner: string,
  repo: string,
  branch: string,
  path: string,
): string {
  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
}

export function blobUrl(
  owner: string,
  repo: string,
  branch: string,
  path: string,
): string {
  return `https://github.com/${owner}/${repo}/blob/${branch}/${path}`;
}

export function releasesUrl(owner: string, repo: string): string {
  return `${repoUrl(owner, repo)}/releases`;
}

export function latestReleaseUrl(owner: string, repo: string): string {
  return `${repoUrl(owner, repo)}/releases/latest`;
}

export function issuesUrl(owner: string, repo: string): string {
  return `${repoUrl(owner, repo)}/issues`;
}

export function apiLatestReleaseUrl(owner: string, repo: string): string {
  return `https://api.github.com/repos/${owner}/${repo}/releases/latest`;
}

export function apiReleasesUrl(owner: string, repo: string): string {
  return `https://api.github.com/repos/${owner}/${repo}/releases?per_page=10`;
}

/** Map a release-asset filename to a target platform. */
export function platformForAsset(name: string): ReleaseAsset["platform"] {
  const n = name.toLowerCase();
  if (n.includes("universal-apple-darwin")) return "Universal";
  if (n.includes("apple-darwin") || n.includes("macos") || n.includes("darwin"))
    return "macOS";
  if (n.includes("windows") || n.includes("msvc") || n.endsWith(".exe") || n.includes("-pc-"))
    return "Windows";
  if (n.includes("linux") || n.includes("unknown-linux")) return "Linux";
  return "Unknown";
}

/** Map a release-asset filename to a CPU arch label. */
export function archForAsset(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("universal")) return "universal";
  if (n.includes("aarch64") || n.includes("arm64")) return "aarch64";
  if (n.includes("x86_64") || n.includes("amd64") || n.includes("x64")) return "x86_64";
  if (n.includes("i686") || n.includes("x86")) return "i686";
  return "";
}

export function kindForAsset(name: string): ReleaseAsset["kind"] {
  const n = name.toLowerCase();
  if (n.endsWith(".sha256") || n.endsWith(".sha256sum") || n.endsWith(".md5"))
    return "checksum";
  if (
    n.endsWith(".tar.gz") ||
    n.endsWith(".tgz") ||
    n.endsWith(".zip") ||
    n.endsWith(".dmg") ||
    n.endsWith(".exe") ||
    n.endsWith(".app.zip")
  )
    return "archive";
  return "other";
}

export function classifyAsset(a: {
  name: string;
  size: number;
  browser_download_url?: string;
  url?: string;
  content_type?: string;
}): ReleaseAsset {
  return {
    name: a.name,
    size: a.size,
    downloadUrl: a.browser_download_url ?? a.url ?? "",
    contentType: a.content_type,
    platform: platformForAsset(a.name),
    arch: archForAsset(a.name),
    kind: kindForAsset(a.name),
  };
}

/** Friendly platform label for a download row. */
export function platformLabel(p: ReleaseAsset["platform"]): string {
  switch (p) {
    case "Universal":
      return "macOS (Universal)";
    case "macOS":
      return "macOS";
    case "Windows":
      return "Windows";
    case "Linux":
      return "Linux";
    default:
      return "Other";
  }
}

export function formatBytes(bytes: number): string {
  if (!bytes || bytes < 0) return "";
  const units = ["B", "KB", "MB", "GB"];
  let v = bytes;
  let i = 0;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  return `${v.toFixed(v < 10 && i > 0 ? 1 : 0)} ${units[i]}`;
}

/** Whether an asset should be offered to a visitor on the given OS. */
export function assetMatchesPlatform(
  asset: ReleaseAsset,
  platform: Platform | null,
): boolean {
  if (!platform) return false;
  if (asset.platform === platform) return true;
  if (platform === "macOS" && asset.platform === "Universal") return true;
  return false;
}
