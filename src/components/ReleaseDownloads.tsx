"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import MuiLink from "@mui/material/Link";
import DownloadIcon from "@mui/icons-material/Download";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import GitHubIcon from "@mui/icons-material/GitHub";
import VerifiedIcon from "@mui/icons-material/Verified";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CopyButton from "@/components/CopyButton";
import { usePlatform } from "@/lib/platform";
import { getProjectContentOrEmpty, fetchLiveLatestRelease } from "@/lib/content";
import {
  repoUrl,
  releasesUrl,
  latestReleaseUrl,
  formatBytes,
  platformLabel,
  assetMatchesPlatform,
} from "@/lib/github";
import type { Project, Release, ReleaseAsset } from "@/lib/types";

interface ReleaseDownloadsProps {
  project: Project;
}

interface AssetRow {
  archive: ReleaseAsset;
  checksum: ReleaseAsset | null;
}

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** Find the .sha256 checksum that belongs to a given archive asset. */
function checksumFor(
  archive: ReleaseAsset,
  assets: ReleaseAsset[],
): ReleaseAsset | null {
  const wanted = `${archive.name}.sha256`.toLowerCase();
  return (
    assets.find(
      (a) => a.kind === "checksum" && a.name.toLowerCase() === wanted,
    ) ?? null
  );
}

function archLabel(arch: string): string {
  switch (arch) {
    case "aarch64":
      return "Apple Silicon (aarch64)";
    case "x86_64":
      return "Intel / x86_64";
    case "universal":
      return "Universal";
    case "i686":
      return "32-bit (i686)";
    default:
      return arch;
  }
}

export default function ReleaseDownloads({ project }: ReleaseDownloadsProps) {
  const baked = getProjectContentOrEmpty(project.slug);
  const { os, ready } = usePlatform();
  const [release, setRelease] = useState<Release | null>(baked.latestRelease);

  // Progressive enhancement: swap in a fresher release if GitHub returns a
  // different tag than the baked snapshot. Fails soft to the baked data.
  useEffect(() => {
    if (!project.hasReleases) return;
    let cancelled = false;
    fetchLiveLatestRelease(project.slug)
      .then((live) => {
        if (cancelled || !live) return;
        setRelease((prev) => (prev && prev.tag === live.tag ? prev : live));
      })
      .catch(() => {
        /* keep baked snapshot */
      });
    return () => {
      cancelled = true;
    };
  }, [project.slug, project.hasReleases]);

  const archiveAssets = useMemo<ReleaseAsset[]>(
    () => (release?.assets ?? []).filter((a) => a.kind === "archive"),
    [release],
  );

  const rows = useMemo<AssetRow[]>(
    () =>
      archiveAssets.map((archive) => ({
        archive,
        checksum: checksumFor(archive, release?.assets ?? []),
      })),
    [archiveAssets, release],
  );

  const matchingRows = useMemo<AssetRow[]>(() => {
    if (!ready || !os) return [];
    return rows.filter((r) => assetMatchesPlatform(r.archive, os));
  }, [rows, os, ready]);

  const repoHref = repoUrl(project.owner, project.repo);

  // --- Case (iii): no prebuilt downloads — clone the repo ------------------
  if (!project.hasReleases) {
    const cloneCmd = `git clone ${repoHref}.git`;
    return (
      <Paper
        variant="outlined"
        sx={{ p: { xs: 2.5, sm: 3 }, borderColor: "divider" }}
      >
        <Typography variant="h6" sx={{ mb: 1 }}>
          No prebuilt downloads — clone the repository
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
          This project ships as source. Clone it and follow the quick start to
          get set up.
        </Typography>
        <CloneSnippet command={cloneCmd} accent={project.accent} />
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          sx={{ mt: 2.5 }}
        >
          <Button
            variant="contained"
            startIcon={<GitHubIcon />}
            component="a"
            href={repoHref}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              bgcolor: project.accent,
              color: "#06140A",
              "&:hover": { bgcolor: project.accent, filter: "brightness(1.08)" },
            }}
          >
            View on GitHub
          </Button>
          <Button variant="outlined" component={Link} href="/start/">
            Setup guide
          </Button>
        </Stack>
      </Paper>
    );
  }

  // --- Case (ii): source/tag-only releases (meteor-decomp) -----------------
  if (project.releasesAreSourceOnly) {
    const cloneCmd = `git clone ${repoHref}.git`;
    return (
      <Paper
        variant="outlined"
        sx={{ p: { xs: 2.5, sm: 3 }, borderColor: "divider" }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          sx={{ mb: 1, alignItems: { xs: "flex-start", sm: "center" } }}
        >
          <Typography variant="h6">Source-only releases</Typography>
          {release?.tag ? (
            <Chip
              size="small"
              label={release.tag}
              sx={{ bgcolor: "rgba(255,255,255,0.06)" }}
            />
          ) : null}
        </Stack>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
          Releases here are tagged source snapshots — there are no prebuilt
          binaries. Clone the repository and follow the quick start to build it
          yourself.
        </Typography>
        <CloneSnippet command={cloneCmd} accent={project.accent} />
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          sx={{ mt: 2.5 }}
        >
          <Button
            variant="contained"
            startIcon={<OpenInNewIcon />}
            component="a"
            href={latestReleaseUrl(project.owner, project.repo)}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              bgcolor: project.accent,
              color: "#06140A",
              "&:hover": { bgcolor: project.accent, filter: "brightness(1.08)" },
            }}
          >
            View release
          </Button>
          <Button variant="outlined" component={Link} href="/start/">
            Build it (Quick start)
          </Button>
          <Button
            variant="text"
            startIcon={<GitHubIcon />}
            component="a"
            href={repoHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            Repository
          </Button>
        </Stack>
      </Paper>
    );
  }

  // --- Case (i): binary releases with archive assets -----------------------
  if (!release || archiveAssets.length === 0) {
    // hasReleases is true but we have no asset data (e.g. offline baked fetch).
    return (
      <Paper
        variant="outlined"
        sx={{ p: { xs: 2.5, sm: 3 }, borderColor: "divider" }}
      >
        <Typography variant="h6" sx={{ mb: 1 }}>
          Downloads
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
          Release assets could not be loaded right now. Head to GitHub for the
          latest prebuilt binaries.
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
          <Button
            variant="contained"
            startIcon={<OpenInNewIcon />}
            component="a"
            href={latestReleaseUrl(project.owner, project.repo)}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              bgcolor: project.accent,
              color: "#06140A",
              "&:hover": { bgcolor: project.accent, filter: "brightness(1.08)" },
            }}
          >
            Latest release
          </Button>
          <Button
            variant="outlined"
            component="a"
            href={releasesUrl(project.owner, project.repo)}
            target="_blank"
            rel="noopener noreferrer"
          >
            All releases
          </Button>
        </Stack>
      </Paper>
    );
  }

  return (
    <Paper
      variant="outlined"
      sx={{ p: { xs: 2.5, sm: 3 }, borderColor: "divider" }}
    >
      {/* Release header */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.5}
        sx={{
          mb: 2,
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          sx={{ alignItems: "center", flexWrap: "wrap" }}
        >
          <Typography variant="h6">Downloads</Typography>
          <Chip
            size="small"
            label={release.tag}
            sx={{
              bgcolor: "rgba(255,255,255,0.06)",
              fontWeight: 700,
            }}
          />
          {release.isPrerelease ? (
            <Chip size="small" color="warning" label="pre-release" />
          ) : null}
          {release.publishedAt ? (
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {formatDate(release.publishedAt)}
            </Typography>
          ) : null}
        </Stack>
        <Stack direction="row" spacing={1.5}>
          <MuiLink
            href={release.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}
          >
            Release notes <OpenInNewIcon sx={{ fontSize: 15 }} />
          </MuiLink>
          <MuiLink
            href={releasesUrl(project.owner, project.repo)}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}
          >
            All releases <OpenInNewIcon sx={{ fontSize: 15 }} />
          </MuiLink>
        </Stack>
      </Stack>

      {/* Visitor-OS spotlight */}
      {ready && os && matchingRows.length > 0 ? (
        <Box
          sx={{
            mb: 3,
            p: { xs: 2, sm: 2.5 },
            borderRadius: 2,
            border: "1px solid",
            borderColor: project.accent,
            bgcolor: "rgba(255,255,255,0.02)",
            backgroundImage: `linear-gradient(180deg, ${project.accent}14, transparent)`,
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{ mb: 1.5, alignItems: "center" }}
          >
            <CheckCircleIcon sx={{ color: project.accent, fontSize: 20 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              Recommended for your system ({platformLabel(os)})
            </Typography>
          </Stack>
          <Stack spacing={1.25}>
            {matchingRows.map((row) => (
              <Stack
                key={`primary-${row.archive.name}`}
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                sx={{ alignItems: { xs: "stretch", sm: "center" } }}
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<DownloadIcon />}
                  component="a"
                  href={row.archive.downloadUrl}
                  sx={{
                    bgcolor: project.accent,
                    color: "#06140A",
                    fontWeight: 700,
                    "&:hover": {
                      bgcolor: project.accent,
                      filter: "brightness(1.08)",
                    },
                  }}
                >
                  Download {archLabel(row.archive.arch)}
                </Button>
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary" }}
                >
                  {row.archive.name}
                  {row.archive.size ? ` · ${formatBytes(row.archive.size)}` : ""}
                </Typography>
                {row.checksum ? (
                  <MuiLink
                    href={row.checksum.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="caption"
                    sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}
                  >
                    <VerifiedIcon sx={{ fontSize: 14 }} /> sha256
                  </MuiLink>
                ) : null}
              </Stack>
            ))}
          </Stack>
        </Box>
      ) : null}

      {/* All platforms list */}
      <Typography
        variant="overline"
        sx={{ color: "text.secondary", display: "block", mb: 1 }}
      >
        All platforms
      </Typography>
      <Stack
        divider={<Divider flexItem sx={{ borderColor: "divider" }} />}
        spacing={0}
      >
        {rows.map((row) => {
          const isMatch = ready && os
            ? assetMatchesPlatform(row.archive, os)
            : false;
          return (
            <Stack
              key={`row-${row.archive.name}`}
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              sx={{
                py: 1.5,
                alignItems: { xs: "flex-start", sm: "center" },
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ minWidth: 0 }}>
                <Stack
                  direction="row"
                  spacing={1}
                  useFlexGap
                  sx={{ alignItems: "center", flexWrap: "wrap" }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {platformLabel(row.archive.platform)}
                  </Typography>
                  {row.archive.arch ? (
                    <Chip
                      size="small"
                      variant="outlined"
                      label={row.archive.arch}
                    />
                  ) : null}
                  {isMatch ? (
                    <Chip
                      size="small"
                      label="your OS"
                      sx={{
                        bgcolor: `${project.accent}22`,
                        color: project.accent,
                        fontWeight: 700,
                      }}
                    />
                  ) : null}
                </Stack>
                <Typography
                  variant="caption"
                  sx={{
                    color: "text.secondary",
                    display: "block",
                    wordBreak: "break-all",
                  }}
                >
                  {row.archive.name}
                  {row.archive.size ? ` · ${formatBytes(row.archive.size)}` : ""}
                </Typography>
              </Box>
              <Stack
                direction="row"
                spacing={1.5}
                sx={{ flexShrink: 0, alignItems: "center" }}
              >
                {row.checksum ? (
                  <MuiLink
                    href={row.checksum.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="caption"
                    sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}
                  >
                    <VerifiedIcon sx={{ fontSize: 14 }} /> sha256
                  </MuiLink>
                ) : null}
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<DownloadIcon />}
                  component="a"
                  href={row.archive.downloadUrl}
                >
                  Download
                </Button>
              </Stack>
            </Stack>
          );
        })}
      </Stack>

      <Divider sx={{ my: 2.5, borderColor: "divider" }} />
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.5}
        sx={{
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
        }}
      >
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          Verify a download with{" "}
          <Box component="code" sx={{ fontFamily: "monospace" }}>
            shasum -a 256 &lt;file&gt;
          </Box>{" "}
          against its sha256.
        </Typography>
        <Button
          variant="text"
          size="small"
          startIcon={<GitHubIcon />}
          component="a"
          href={repoHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          {project.owner}/{project.repo}
        </Button>
      </Stack>
    </Paper>
  );
}

/** A copyable `git clone` command box. */
function CloneSnippet({
  command,
  accent,
}: {
  command: string;
  accent: string;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1,
        px: 1.5,
        py: 1,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "rgba(0,0,0,0.35)",
      }}
    >
      <Box
        component="code"
        sx={{
          fontFamily: "monospace",
          fontSize: "0.85rem",
          color: "text.primary",
          overflowX: "auto",
          whiteSpace: "nowrap",
          "&::before": { content: '"$ "', color: accent },
        }}
      >
        {command}
      </Box>
      <CopyButton
        text={command}
        size="small"
        ariaLabel="Copy git clone command"
        tooltip="Copy"
      />
    </Box>
  );
}
