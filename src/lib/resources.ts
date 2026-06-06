// Typed facade over the plain-ESM Resources registry in `src/data/resources.mjs`.
// Pure data only (no `fs`), so this is safe to import from client components. The
// Markdown page bodies are read from disk at build time by the route server
// component (see `src/app/resources/[section]/[page]/page.tsx`).

import {
  RESOURCE_SECTIONS as RAW_SECTIONS,
  RESOURCE_WIKI_BASE as RAW_WIKI_BASE,
  RESOURCE_ATTRIBUTION as RAW_ATTRIBUTION,
  resourceSourceUrl,
} from "@/data/resources.mjs";

/** A single Resources page (metadata only; the Markdown body is read separately). */
export interface ResourcePage {
  /** URL slug under its section, e.g. "debug-commands". */
  slug: string;
  /** Display title, e.g. "Debug Commands". */
  title: string;
  /** Upstream wiki page name, e.g. "Debug_Commands". */
  source: string;
  /** Markdown path relative to `src/content/resources/`. */
  file: string;
}

/** A Resources section grouping related pages. */
export interface ResourceSection {
  slug: string;
  title: string;
  description: string;
  pages: ResourcePage[];
}

export const RESOURCE_SECTIONS: ResourceSection[] =
  RAW_SECTIONS as unknown as ResourceSection[];

export const RESOURCE_WIKI_BASE: string = RAW_WIKI_BASE;
export const RESOURCE_ATTRIBUTION: string = RAW_ATTRIBUTION;

export const RESOURCE_SECTIONS_BY_SLUG: Record<string, ResourceSection> =
  Object.fromEntries(RESOURCE_SECTIONS.map((s) => [s.slug, s]));

export function getResourceSection(slug: string): ResourceSection | undefined {
  return RESOURCE_SECTIONS_BY_SLUG[slug];
}

export function getResourcePage(
  sectionSlug: string,
  pageSlug: string,
): { section: ResourceSection; page: ResourcePage } | undefined {
  const section = RESOURCE_SECTIONS_BY_SLUG[sectionSlug];
  const page = section?.pages.find((p) => p.slug === pageSlug);
  return section && page ? { section, page } : undefined;
}

/** Canonical upstream URL for a page (the "Source" link shown on every page). */
export function sourceUrlFor(page: ResourcePage): string {
  return resourceSourceUrl(page.source);
}

/** Every (section, page) slug pair — for `generateStaticParams`. */
export function allResourcePageParams(): Array<{ section: string; page: string }> {
  return RESOURCE_SECTIONS.flatMap((s) =>
    s.pages.map((p) => ({ section: s.slug, page: p.slug })),
  );
}

export const RESOURCES_COUNT: number = RESOURCE_SECTIONS.reduce(
  (n, s) => n + s.pages.length,
  0,
);
