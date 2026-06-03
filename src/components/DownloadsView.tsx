"use client";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import DownloadIcon from "@mui/icons-material/Download";
import DnsIcon from "@mui/icons-material/Dns";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import MemoryIcon from "@mui/icons-material/Memory";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import TerminalIcon from "@mui/icons-material/Terminal";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import ReleaseDownloads from "@/components/ReleaseDownloads";
import { usePlatform } from "@/lib/platform";
import { ORDERED_PROJECTS } from "@/lib/projects";
import { platformLabel } from "@/lib/github";
import type { Project } from "@/lib/types";

function iconFor(name: string, props: SvgIconProps) {
  switch (name) {
    case "dns":
      return <DnsIcon {...props} />;
    case "rocket_launch":
      return <RocketLaunchIcon {...props} />;
    case "memory":
      return <MemoryIcon {...props} />;
    case "smart_toy":
      return <SmartToyIcon {...props} />;
    case "terminal":
      return <TerminalIcon {...props} />;
    default:
      return <InsertDriveFileIcon {...props} />;
  }
}

function ProjectDownloadSection({ project }: { project: Project }) {
  return (
    <Box component="section" aria-labelledby={`dl-${project.slug}`}>
      <Stack
        direction="row"
        spacing={1.75}
        sx={{ mb: 2, alignItems: "flex-start" }}
      >
        <Box
          aria-hidden
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 44,
            height: 44,
            flexShrink: 0,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            color: project.accent,
            bgcolor: `${project.accent}14`,
          }}
        >
          {iconFor(project.icon, { fontSize: "medium" })}
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{ alignItems: "center", flexWrap: "wrap" }}
          >
            <Typography
              id={`dl-${project.slug}`}
              variant="h5"
              component="h2"
              sx={{ scrollMarginTop: 96 }}
            >
              {project.name}
            </Typography>
            <Chip
              size="small"
              label={project.category}
              variant="outlined"
              sx={{ borderColor: project.accent, color: project.accent }}
            />
          </Stack>
          <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
            {project.tagline}
          </Typography>
        </Box>
      </Stack>
      <ReleaseDownloads project={project} />
    </Box>
  );
}

export default function DownloadsView() {
  const { os, ready } = usePlatform();

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 5, md: 7 } }}>
      <Stack spacing={1.5} sx={{ mb: 4 }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <DownloadIcon color="primary" />
          <Typography variant="h3" component="h1">
            Downloads
          </Typography>
        </Stack>
        <Typography
          variant="body1"
          sx={{ color: "text.secondary", maxWidth: 760 }}
        >
          Every download below points to the latest GitHub release for the
          project. Binaries are listed per platform with a matching{" "}
          <Box component="span" sx={{ fontFamily: "monospace" }}>
            sha256
          </Box>{" "}
          checksum for verification. Release data is baked at build time and
          live-refreshes from GitHub when you open the page, so you always see
          the newest tag.
        </Typography>
      </Stack>

      {ready && os ? (
        <Alert
          icon={false}
          severity="success"
          variant="outlined"
          sx={{ mb: 4, borderColor: "divider" }}
        >
          We detected <strong>{platformLabel(os)}</strong> — {platformLabel(os)}{" "}
          builds are highlighted first where a project ships them.
        </Alert>
      ) : null}

      <Stack
        spacing={5}
        divider={<Divider flexItem sx={{ borderColor: "divider" }} />}
      >
        {ORDERED_PROJECTS.map((project) => (
          <ProjectDownloadSection key={project.slug} project={project} />
        ))}
      </Stack>
    </Container>
  );
}
