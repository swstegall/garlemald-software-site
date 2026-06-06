import { readFile } from "node:fs/promises";
import { join } from "node:path";

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { allResourcePageParams, getResourcePage } from "@/lib/resources";
import ResourceDocView from "@/components/ResourceDocView";

const CONTENT_ROOT = join(process.cwd(), "src", "content", "resources");

export function generateStaticParams() {
  return allResourcePageParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string; page: string }>;
}): Promise<Metadata> {
  const { section, page } = await params;
  const found = getResourcePage(section, page);
  if (!found) return {};
  return {
    title: `${found.page.title} — Resources`,
    description: `${found.page.title} — FFXIV 1.0 (v1.23b) reference in the ${found.section.title} section, ported from the FFXIV Classic wiki.`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ section: string; page: string }>;
}) {
  const { section, page } = await params;
  const found = getResourcePage(section, page);
  if (!found) notFound();

  // Page bodies are local Markdown read at build time (static export). The
  // committed copy under src/content/resources is the site's own preservation
  // copy of the upstream wiki content.
  let markdown = "";
  try {
    markdown = await readFile(join(CONTENT_ROOT, found.page.file), "utf8");
  } catch {
    markdown = "";
  }

  return (
    <ResourceDocView
      sectionSlug={section}
      pageSlug={page}
      markdown={markdown}
    />
  );
}
