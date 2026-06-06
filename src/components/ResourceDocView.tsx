"use client";

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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { getResourcePage, sourceUrlFor } from "@/lib/resources";
import Markdown from "@/components/Markdown";

interface ResourceDocViewProps {
  sectionSlug: string;
  pageSlug: string;
  markdown: string;
}

export default function ResourceDocView({
  sectionSlug,
  pageSlug,
  markdown,
}: ResourceDocViewProps) {
  const found = getResourcePage(sectionSlug, pageSlug);

  if (!found) {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Resource not found
        </Typography>
        <Button
          variant="outlined"
          component={Link}
          href="/resources/"
          startIcon={<ArrowBackIcon />}
        >
          Back to Resources
        </Button>
      </Container>
    );
  }

  const { section, page } = found;
  const sourceUrl = sourceUrlFor(page);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
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
        <MuiLink component={Link} href="/resources/" color="inherit">
          Resources
        </MuiLink>
        <Typography color="text.secondary">{section.title}</Typography>
        <Typography color="text.primary" sx={{ fontWeight: 600 }}>
          {page.title}
        </Typography>
      </Breadcrumbs>

      <Typography variant="h4" component="h1" sx={{ wordBreak: "break-word" }}>
        {page.title}
      </Typography>

      {/* Source attribution — every Resources page links back to the original
          wiki page it was ported from (the upstream wiki may go offline; this is
          our preservation copy). */}
      <Box
        sx={{
          mt: 2,
          mb: 4,
          p: 2,
          borderRadius: 1.5,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "rgba(255,255,255,0.03)",
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Ported from the FFXIV Classic (Project Meteor) wiki and preserved here.
          View the original source page:
        </Typography>
        <Button
          variant="outlined"
          size="small"
          endIcon={<OpenInNewIcon />}
          component="a"
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ flexShrink: 0 }}
        >
          Source: {page.source}
        </Button>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {markdown.trim() ? (
        <Markdown markdown={markdown} />
      ) : (
        <Typography sx={{ color: "text.secondary" }}>
          This page has not been imported yet.{" "}
          <MuiLink href={sourceUrl} target="_blank" rel="noopener noreferrer">
            Read it on the original wiki
          </MuiLink>
          .
        </Typography>
      )}

      <Divider sx={{ mt: 6, mb: 3 }} />
      <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap", gap: 1 }}>
        <Button
          variant="text"
          component={Link}
          href="/resources/"
          startIcon={<ArrowBackIcon />}
        >
          Back to Resources
        </Button>
        <Button
          variant="text"
          component="a"
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          endIcon={<OpenInNewIcon />}
        >
          Original source
        </Button>
      </Stack>
    </Container>
  );
}
