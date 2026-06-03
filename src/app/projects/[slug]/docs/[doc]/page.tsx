import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PROJECTS, getProject } from "@/lib/projects";
import { CONTENT } from "@/lib/content";
import DocView from "@/components/DocView";

export function generateStaticParams() {
  const params: Array<{ slug: string; doc: string }> = [];
  for (const project of PROJECTS) {
    const docs = CONTENT.projects[project.slug]?.docs;
    if (!docs) continue;
    for (const doc of docs) {
      params.push({ slug: project.slug, doc: doc.docSlug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; doc: string }>;
}): Promise<Metadata> {
  const { slug, doc } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const fetched = CONTENT.projects[slug]?.docs.find((d) => d.docSlug === doc);
  if (!fetched) return { title: project.name };
  return {
    title: `${fetched.title} — ${project.name}`,
    description: `${fetched.title} documentation for ${project.name} (${fetched.path}).`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; doc: string }>;
}) {
  const { slug, doc } = await params;
  if (!getProject(slug)) notFound();
  return <DocView slug={slug} docSlug={doc} />;
}
