"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import MuiLink from "@mui/material/Link";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import HomeIcon from "@mui/icons-material/Home";
import GitHubIcon from "@mui/icons-material/GitHub";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { getProject } from "@/lib/projects";
import { getProjectContentOrEmpty, fetchLiveMarkdown } from "@/lib/content";
import { blobUrl } from "@/lib/github";

import Markdown from "@/components/Markdown";

interface DocViewProps {
  slug: string;
  docSlug: string;
}

export default function DocView({ slug, docSlug }: DocViewProps) {
  const project = getProject(slug)!;
  const content = getProjectContentOrEmpty(slug);
  const doc = content.docs.find((d) => d.docSlug === docSlug);

  // Live-refreshed markdown body; seeded from the baked doc when present.
  const [markdown, setMarkdown] = useState<string>(doc?.markdown ?? "");

  // Progressive enhancement: pull the freshest copy from GitHub and swap it in.
  useEffect(() => {
    if (!doc) return;
    let cancelled = false;
    (async () => {
      const live = await fetchLiveMarkdown(slug, doc.branch, doc.path);
      if (!cancelled && live) setMarkdown(live);
    })();
    return () => {
      cancelled = true;
    };
  }, [slug, doc]);

  // Friendly not-found state.
  if (!doc) {
    return (
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Document not found
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 4 }}>
          We couldn&apos;t find a document at{" "}
          <Box component="span" sx={{ fontFamily: "var(--font-mono)" }}>
            {docSlug}
          </Box>{" "}
          for {project.name}.
        </Typography>
        <Button
          variant="outlined"
          component={Link}
          href={`/projects/${slug}/`}
          startIcon={<ArrowBackIcon />}
        >
          Back to {project.name}
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
      <Breadcrumbs aria-label="Breadcrumb" sx={{ mb: 3 }}>
        <MuiLink
          component={Link}
          href="/"
          color="inherit"
          sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}
        >
          <HomeIcon fontSize="inherit" />
          Home
        </MuiLink>
        <MuiLink component={Link} href={`/projects/${slug}/`} color="inherit">
          {project.name}
        </MuiLink>
        <Typography color="text.primary" sx={{ fontWeight: 600 }}>
          {doc.title}
        </Typography>
      </Breadcrumbs>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          mb: 1,
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "flex-end" },
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="h4" component="h1" sx={{ wordBreak: "break-word" }}>
            {doc.title}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              fontFamily: "var(--font-mono)",
              wordBreak: "break-all",
            }}
          >
            {doc.path}
            {doc.branch ? ` @ ${doc.branch}` : ""}
          </Typography>
        </Box>

        <Button
          variant="outlined"
          size="small"
          startIcon={<GitHubIcon />}
          component="a"
          href={blobUrl(project.owner, project.repo, doc.branch, doc.path)}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ flexShrink: 0 }}
        >
          View on GitHub
        </Button>
      </Stack>

      <Divider sx={{ mb: 4 }} />

      <Markdown
        markdown={markdown}
        linkBase={{
          owner: project.owner,
          repo: project.repo,
          branch: doc.branch,
        }}
      />

      <Divider sx={{ mt: 6, mb: 3 }} />
      <Button
        variant="text"
        component={Link}
        href={`/projects/${slug}/`}
        startIcon={<ArrowBackIcon />}
      >
        Back to {project.name}
      </Button>
    </Container>
  );
}
