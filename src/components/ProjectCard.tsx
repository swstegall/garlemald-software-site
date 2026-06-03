"use client";

import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import type { SvgIconComponent } from "@mui/icons-material";
import DnsIcon from "@mui/icons-material/Dns";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import MemoryIcon from "@mui/icons-material/Memory";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import TerminalIcon from "@mui/icons-material/Terminal";
import AppsIcon from "@mui/icons-material/Apps";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { getProjectContent } from "@/lib/content";
import { platformLabel } from "@/lib/github";
import type { Project } from "@/lib/types";

const ICONS: Record<string, SvgIconComponent> = {
  dns: DnsIcon,
  rocket_launch: RocketLaunchIcon,
  memory: MemoryIcon,
  smart_toy: SmartToyIcon,
  terminal: TerminalIcon,
};

function iconFor(name: string): SvgIconComponent {
  return ICONS[name] ?? AppsIcon;
}

export default function ProjectCard({ project }: { project: Project }) {
  const ProjectIcon = iconFor(project.icon);
  const accent = project.accent;
  const latestTag = getProjectContent(project.slug)?.latestRelease?.tag ?? null;

  // Decide the small "release" affordance chip, if any.
  const releaseLabel: string | null = latestTag
    ? latestTag
    : project.releasesAreSourceOnly
      ? "source"
      : null;

  return (
    <Card
      sx={{
        height: "100%",
        position: "relative",
        overflow: "hidden",
        transition:
          "transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease",
        // Left accent strip in the project's colour.
        "&::before": {
          content: '""',
          position: "absolute",
          insetBlock: 0,
          insetInlineStart: 0,
          width: 4,
          bgcolor: accent,
          opacity: 0.85,
        },
        "&:hover": {
          transform: "translateY(-4px)",
          borderColor: alpha(accent, 0.6),
          boxShadow: `0 12px 32px ${alpha(accent, 0.18)}`,
        },
        "&:focus-within": {
          borderColor: alpha(accent, 0.6),
        },
      }}
    >
      <CardActionArea
        component={Link}
        href={`/projects/${project.slug}/`}
        aria-label={`Open the ${project.name} project page`}
        sx={{
          height: "100%",
          alignItems: "stretch",
          "& .MuiCardActionArea-focusHighlight": { opacity: 0 },
        }}
      >
        <Box
          sx={{
            p: { xs: 2.5, sm: 3 },
            pl: { xs: 2.75, sm: 3.25 },
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          {/* Header row: accent-tinted icon + name + category */}
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
            <Avatar
              variant="rounded"
              sx={{
                bgcolor: alpha(accent, 0.16),
                color: accent,
                width: 44,
                height: 44,
                border: `1px solid ${alpha(accent, 0.4)}`,
              }}
            >
              <ProjectIcon fontSize="small" />
            </Avatar>
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography
                variant="h6"
                component="h3"
                sx={{ lineHeight: 1.25, wordBreak: "break-word" }}
              >
                {project.name}
              </Typography>
              <Chip
                label={project.category}
                size="small"
                variant="outlined"
                sx={{
                  mt: 0.5,
                  height: 20,
                  fontSize: "0.68rem",
                  color: accent,
                  borderColor: alpha(accent, 0.5),
                }}
              />
            </Box>
          </Box>

          {/* Tagline, clamped to ~2 lines */}
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: "2.6em",
            }}
          >
            {project.tagline}
          </Typography>

          {/* Language + license */}
          <Stack direction="row" spacing={0.75} useFlexGap sx={{ flexWrap: "wrap" }}>
            <Chip
              label={project.language}
              size="small"
              sx={{ height: 22, fontSize: "0.7rem" }}
            />
            <Chip
              label={project.license}
              size="small"
              variant="outlined"
              sx={{ height: 22, fontSize: "0.7rem" }}
            />
            {releaseLabel ? (
              <Chip
                label={releaseLabel}
                size="small"
                sx={{
                  height: 22,
                  fontSize: "0.7rem",
                  bgcolor: alpha(accent, 0.16),
                  color: accent,
                }}
              />
            ) : null}
          </Stack>

          {/* Platform chips */}
          <Stack direction="row" spacing={0.75} useFlexGap sx={{ flexWrap: "wrap" }}>
            {project.platforms.map((p) => (
              <Chip
                key={p}
                label={platformLabel(p)}
                size="small"
                variant="outlined"
                sx={{
                  height: 22,
                  fontSize: "0.7rem",
                  color: "text.secondary",
                }}
              />
            ))}
          </Stack>

          {/* "View project ->" affordance pinned to the bottom */}
          <Box
            sx={{
              mt: "auto",
              pt: 0.5,
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: accent,
              fontWeight: 600,
              fontSize: "0.85rem",
            }}
          >
            View project
            <ArrowForwardIcon sx={{ fontSize: "1rem" }} />
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
}
