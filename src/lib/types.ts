// Shared types for the whole application. Components and pages import from here.

export type Platform = "macOS" | "Linux" | "Windows";

export type ProjectCategory =
  | "Server"
  | "Client"
  | "Research"
  | "Tooling"
  | "Installer";

/** A documentation file we fetch from a repo and feature on the site. */
export interface ProjectDoc {
  /** Path relative to the repo root, e.g. "docs/RELEASING.md". */
  path: string;
  /** Human-readable title shown in the docs list and page heading. */
  title: string;
}

/**
 * A project, as declared in `src/data/registry.mjs`. This is static metadata —
 * the live README / docs / releases are merged in separately at build time
 * (see {@link GeneratedContent}).
 */
export interface Project {
  slug: string;
  name: string;
  owner: string;
  repo: string;
  tagline: string;
  summary: string;
  category: ProjectCategory;
  /** Primary implementation language, e.g. "Rust", "Python", "Shell". */
  language: string;
  /** SPDX-ish license id, e.g. "AGPL-3.0-or-later" or "MIT". */
  license: string;
  /** Hex accent colour used for this project's card and detail page. */
  accent: string;
  /** Material icon name (for `@mui/icons-material` lookup / Icon font). */
  icon: string;
  defaultBranch: string;
  /** Branches exposed in the README branch toggle. */
  branches: string[];
  platforms: Platform[];
  /** True if the repo cuts GitHub Releases. */
  hasReleases: boolean;
  /** True if releases carry no binary assets (clone/source only). */
  releasesAreSourceOnly?: boolean;
  /** True for the installer, which only targets Apple Silicon. */
  appleSiliconOnly?: boolean;
  topics: string[];
  docs: ProjectDoc[];
}

/** A single downloadable asset attached to a GitHub release. */
export interface ReleaseAsset {
  name: string;
  size: number;
  downloadUrl: string;
  contentType?: string;
  /** Derived from the asset filename. */
  platform: Platform | "Universal" | "Unknown";
  /** Derived from the asset filename: "aarch64", "x86_64", "universal", etc. */
  arch: string;
  /** "archive" | "checksum" | "other" — checksums are grouped with their archive. */
  kind: "archive" | "checksum" | "other";
}

/** The latest GitHub release for a project (or a lightweight prior entry). */
export interface Release {
  tag: string;
  name: string;
  htmlUrl: string;
  publishedAt: string;
  /** Markdown release notes (may be empty). */
  body: string;
  isPrerelease: boolean;
  assets: ReleaseAsset[];
}

/** A fetched documentation file with its rendered-from markdown body. */
export interface FetchedDoc extends ProjectDoc {
  /** The branch the markdown was fetched from. */
  branch: string;
  /** Raw markdown content. */
  markdown: string;
  /** URL slug for the doc viewer route (derived from `path`). */
  docSlug: string;
}

/** Per-project content resolved at build time. */
export interface ProjectContent {
  slug: string;
  /** README markdown keyed by branch name. May be partial if a branch 404s. */
  readmeByBranch: Record<string, string>;
  /** Curated docs (each fetched from the default branch). */
  docs: FetchedDoc[];
  /** Latest release, or null if the repo has none / fetch failed. */
  latestRelease: Release | null;
  /** Lightweight list of recent releases (tag + url + date), newest first. */
  releases: Array<{ tag: string; htmlUrl: string; publishedAt: string }>;
}

/** The whole baked content blob written by `scripts/fetch-content.mjs`. */
export interface GeneratedContent {
  generatedAt: string;
  /** True if the fetch ran offline / GitHub was unreachable (all-empty fallback). */
  offline: boolean;
  projects: Record<string, ProjectContent>;
}
