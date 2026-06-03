// Typed facade over the plain-ESM registry in `src/data/registry.mjs`.
// Application code imports projects/constants from HERE (typed), never from the
// raw .mjs.

// registry.mjs is plain ESM; TS infers a structurally-compatible shape via
// allowJs, which we narrow to the precise Project[] type here.
import { PROJECTS as RAW_PROJECTS, GITHUB_USER, DISCORD_URL, SITE_REPO } from "@/data/registry.mjs";
import type { Project } from "./types";

export const PROJECTS: Project[] = RAW_PROJECTS as unknown as Project[];

export const PROJECTS_BY_SLUG: Record<string, Project> = Object.fromEntries(
  PROJECTS.map((p) => [p.slug, p]),
);

export function getProject(slug: string): Project | undefined {
  return PROJECTS_BY_SLUG[slug];
}

export const GITHUB_USERNAME: string = GITHUB_USER;
export const DISCORD_INVITE_URL: string = DISCORD_URL;
export const SITE_REPO_NAME: string = SITE_REPO;

/** Base path the app is served under (GitHub Pages project site). */
export const BASE_PATH: string = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a path in `public/` with the deploy base path. */
export function withBase(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${clean}`;
}

/** Order projects for display: Server, Client, then the rest. */
export const ORDERED_PROJECTS: Project[] = PROJECTS;
