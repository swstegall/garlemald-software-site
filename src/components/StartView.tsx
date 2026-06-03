"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { SvgIconComponent } from "@mui/icons-material";
import DnsIcon from "@mui/icons-material/Dns";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import MemoryIcon from "@mui/icons-material/Memory";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import TerminalIcon from "@mui/icons-material/Terminal";
import ExtensionIcon from "@mui/icons-material/Extension";
import GitHubIcon from "@mui/icons-material/GitHub";

import type { Project } from "@/lib/types";
import { ORDERED_PROJECTS } from "@/lib/projects";
import { repoUrl } from "@/lib/github";
import { getQuickStart } from "@/content/quickstart";
import QuickStartGuide from "@/components/QuickStartGuide";
import DiscordButton from "@/components/DiscordButton";

/** Map a project's snake_case Material icon name to its component. */
function iconFor(name: string): SvgIconComponent {
  switch (name) {
    case "dns":
      return DnsIcon;
    case "rocket_launch":
      return RocketLaunchIcon;
    case "memory":
      return MemoryIcon;
    case "smart_toy":
      return SmartToyIcon;
    case "terminal":
      return TerminalIcon;
    default:
      return ExtensionIcon;
  }
}

function ProjectSection({ project }: { project: Project }) {
  const guide = getQuickStart(project.slug);
  const Icon = iconFor(project.icon);

  return (
    <Box
      component="section"
      id={project.slug}
      sx={{
        // Offset so the sticky header doesn't cover the anchored heading.
        scrollMarginTop: 96,
        py: { xs: 5, md: 7 },
      }}
    >
      {/* Project header */}
      <Box sx={{ mb: 4 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{
            alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              aria-hidden
              sx={{
                width: 52,
                height: 52,
                borderRadius: 2,
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: `${project.accent}1A`,
                border: "1px solid",
                borderColor: `${project.accent}66`,
              }}
            >
              <Icon sx={{ color: project.accent, fontSize: 28 }} />
            </Box>
            <Box>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 700 }}>
                {project.name}
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                {project.tagline}
              </Typography>
            </Box>
          </Box>

          <Button
            component="a"
            href={repoUrl(project.owner, project.repo)}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            startIcon={<GitHubIcon />}
            sx={{
              flexShrink: 0,
              color: project.accent,
              borderColor: `${project.accent}66`,
              "&:hover": {
                borderColor: project.accent,
                bgcolor: `${project.accent}14`,
              },
            }}
          >
            View on GitHub
          </Button>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          sx={{ mt: 2, flexWrap: "wrap", gap: 1 }}
        >
          <Chip
            label={project.category}
            size="small"
            sx={{
              bgcolor: `${project.accent}1A`,
              color: project.accent,
              fontWeight: 600,
            }}
          />
          <Chip label={project.language} size="small" variant="outlined" />
          <Chip label={project.license} size="small" variant="outlined" />
        </Stack>
      </Box>

      {/* The guide */}
      {guide ? (
        <QuickStartGuide guide={guide} accent={project.accent} />
      ) : (
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          A quick-start guide for this project is coming soon. In the meantime,
          see the{" "}
          <Box
            component={Link}
            href={`/projects/${project.slug}/`}
            sx={{ color: project.accent }}
          >
            project page
          </Box>
          .
        </Typography>
      )}
    </Box>
  );
}

export default function StartView() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      {/* Hero */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="overline"
          sx={{ color: "text.secondary", letterSpacing: 1.5 }}
        >
          Quick Start
        </Typography>
        <Typography
          variant="h2"
          component="h1"
          sx={{ fontWeight: 800, mb: 2, lineHeight: 1.1 }}
        >
          Get started in minutes
        </Typography>
        <Typography
          variant="h6"
          component="p"
          sx={{ color: "text.secondary", fontWeight: 400, maxWidth: 760 }}
        >
          Foolproof, copy-pasteable walkthroughs for every project in the
          workspace. Pick the one you need below — each guide lists its
          prerequisites and the exact commands to run.
        </Typography>
      </Box>

      {/* Recommended order */}
      <Paper
        variant="outlined"
        sx={{
          p: { xs: 2.5, sm: 3 },
          mb: 2,
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h6" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
          Which order should I follow?
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 1.5 }}>
          <Box component="strong" sx={{ color: "text.primary" }}>
            To play the game:
          </Box>{" "}
          on an Apple Silicon Mac, start with the{" "}
          <Box component={Link} href="#xiv1point0-apple-silicon-installer" sx={{ color: "primary.main" }}>
            Installer
          </Box>{" "}
          to get a 1.0 client, then the{" "}
          <Box component={Link} href="#garlemald-client" sx={{ color: "primary.main" }}>
            Client
          </Box>{" "}
          to launch it, pointed at a{" "}
          <Box component={Link} href="#garlemald-server" sx={{ color: "primary.main" }}>
            Server
          </Box>{" "}
          you run yourself. (Already have a 1.x install, or on Linux/Windows? Skip
          straight to the Client.)
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          <Box component="strong" sx={{ color: "text.primary" }}>
            To contribute to the reverse-engineering effort:
          </Box>{" "}
          set up{" "}
          <Box component={Link} href="#meteor-decomp" sx={{ color: "primary.main" }}>
            meteor-decomp
          </Box>{" "}
          (the client decompilation), then optionally{" "}
          <Box component={Link} href="#decomp-agents" sx={{ color: "primary.main" }}>
            decomp-agents
          </Box>{" "}
          to grind through it automatically.
        </Typography>
      </Paper>

      {/* In-page nav */}
      <Box
        sx={{
          position: "sticky",
          top: 64,
          zIndex: 1,
          py: 1.5,
          mb: 2,
          bgcolor: "background.default",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{ flexWrap: "wrap", gap: 1, overflowX: "auto" }}
        >
          {ORDERED_PROJECTS.map((p) => (
            <Button
              key={p.slug}
              component={Link}
              href={`#${p.slug}`}
              size="small"
              variant="text"
              sx={{
                color: "text.secondary",
                whiteSpace: "nowrap",
                "&:hover": { color: p.accent },
              }}
            >
              {p.name}
            </Button>
          ))}
        </Stack>
      </Box>

      {/* Per-project sections */}
      {ORDERED_PROJECTS.map((p, i) => (
        <Box key={p.slug}>
          <ProjectSection project={p} />
          {i < ORDERED_PROJECTS.length - 1 && <Divider />}
        </Box>
      ))}

      {/* Closing */}
      <Divider sx={{ my: 4 }} />
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
          Stuck on a step?
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "text.secondary", mb: 3, maxWidth: 560, mx: "auto" }}
        >
          The community is the fastest way to get unblocked. Ask questions, share
          progress, or report a bug on the Discord.
        </Typography>
        <DiscordButton variant="contained" size="large" />
      </Box>
    </Container>
  );
}
