"use client";

import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DownloadIcon from "@mui/icons-material/Download";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import ProjectCard from "@/components/ProjectCard";
import DiscordButton from "@/components/DiscordButton";
import { ORDERED_PROJECTS, getProject, withBase } from "@/lib/projects";
import type { Project } from "@/lib/types";

// The five-stage story connecting the projects, in pipeline order. Each entry
// references a real project slug so the step links straight to its detail page.
interface FitStep {
  slug: string;
  role: string;
  body: string;
}

const FIT_STEPS: FitStep[] = [
  {
    slug: "xiv1point0-apple-silicon-installer",
    role: "Install the game",
    body: "One command brings the original 2010 FFXIV 1.0 client up on an Apple Silicon Mac — provisioning Wine and driving the retail installer through to a playable ffxivboot.exe.",
  },
  {
    slug: "garlemald-client",
    role: "Launch & patch",
    body: "The cross-platform launcher detects that 1.x install, patches it forward to the final 1.23b build, runs the login handshake, and starts the game — managing its own Wine runtime on macOS and Linux.",
  },
  {
    slug: "garlemald-server",
    role: "Run the world",
    body: "The Rust server emulator is what the client connects to: lobby, world, and map services in one Cargo workspace, driving over a thousand upstream Lua content scripts.",
  },
  {
    slug: "meteor-decomp",
    role: "Validate against the original",
    body: "A clean-room decompilation of the real 1.23b client binaries produces ground-truth wire formats and behaviour, used to validate the server byte-for-byte.",
  },
  {
    slug: "decomp-agents",
    role: "Automate the grind",
    body: "Parallel autonomous Claude agents claim functions from a shared queue and grind through the decompilation's per-function matching workflow, in their own git worktrees.",
  },
];

function HeroBackdrop() {
  return (
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        background:
          "radial-gradient(900px 420px at 78% -8%, rgba(63,185,80,0.16), transparent 62%), radial-gradient(700px 380px at 8% 6%, rgba(28,200,182,0.10), transparent 58%)",
        maskImage:
          "linear-gradient(to bottom, black 60%, transparent 100%)",
      }}
    />
  );
}

function Hero() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <HeroBackdrop />
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, py: { xs: 8, md: 12 } }}>
        <Grid container spacing={{ xs: 4, md: 6 }} sx={{ alignItems: "center" }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Chip
              label="FINAL FANTASY XIV v1.23b · not A Realm Reborn"
              size="small"
              variant="outlined"
              sx={{
                mb: 2.5,
                color: "primary.main",
                borderColor: alpha("#3FB950", 0.4),
              }}
            />
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontSize: { xs: "2.2rem", sm: "2.8rem", md: "3.4rem" },
                mb: 2,
              }}
            >
              Bring{" "}
              <Box
                component="span"
                sx={{
                  background:
                    "linear-gradient(90deg, #56D364 0%, #1CC8B6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                FINAL FANTASY XIV 1.0
              </Box>{" "}
              back to life.
            </Typography>
            <Typography
              variant="h6"
              component="p"
              sx={{
                color: "text.secondary",
                fontWeight: 400,
                maxWidth: 620,
                mb: 4,
                lineHeight: 1.55,
              }}
            >
              An open-source family of tools to run, launch, decompile, and
              install the original 2010 FINAL FANTASY XIV — the v1.23b client at
              the end of the Seventh Umbral Era, not A Realm Reborn. Rewritten
              from scratch in Rust, validated against the real client.
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              sx={{ mb: 1 }}
            >
              <Button
                component={Link}
                href="/start/"
                variant="contained"
                size="large"
                endIcon={<RocketLaunchIcon />}
              >
                Get started
              </Button>
              <Button
                component={Link}
                href="/downloads/"
                variant="outlined"
                size="large"
                startIcon={<DownloadIcon />}
              >
                Downloads
              </Button>
              <DiscordButton variant="outlined" size="large" />
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <Box
                aria-hidden
                sx={{
                  position: "absolute",
                  inset: "-12%",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(63,185,80,0.22), transparent 68%)",
                  filter: "blur(8px)",
                }}
              />
              <Box
                component="img"
                src={withBase("/brand/garlemald-icon.png")}
                alt="Garlemald — a winged emerald-green G"
                sx={{
                  position: "relative",
                  width: "100%",
                  maxWidth: 380,
                  height: "auto",
                  filter: "drop-shadow(0 12px 40px rgba(0,0,0,0.55))",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function ProjectsGrid() {
  return (
    <Container
      maxWidth="lg"
      component="section"
      id="projects"
      sx={{ py: { xs: 7, md: 10 }, scrollMarginTop: "80px" }}
    >
      <Box sx={{ mb: { xs: 4, md: 5 }, maxWidth: 720 }}>
        <Typography variant="h3" component="h2" sx={{ mb: 1.5 }}>
          The projects
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Five independent, open-source repositories — a server, a launcher, a
          clean-room decompilation, the agents that drive it, and a one-command
          installer. Each is documented here with live READMEs, docs, and
          downloads.
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {ORDERED_PROJECTS.map((project: Project) => (
          <Grid key={project.slug} size={{ xs: 12, sm: 6, lg: 4 }}>
            <ProjectCard project={project} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

function FitStepCard({ step, index }: { step: FitStep; index: number }) {
  const project = getProject(step.slug);
  const accent = project?.accent ?? "#3FB950";
  const name = project?.name ?? step.slug;
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 1.25,
        position: "relative",
        transition: "border-color 160ms ease",
        "&:hover": { borderColor: alpha(accent, 0.5) },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Avatar
          sx={{
            bgcolor: alpha(accent, 0.16),
            color: accent,
            width: 34,
            height: 34,
            fontSize: "0.9rem",
            fontWeight: 700,
            border: `1px solid ${alpha(accent, 0.4)}`,
          }}
        >
          {index + 1}
        </Avatar>
        <Typography
          variant="overline"
          sx={{ color: "text.secondary", letterSpacing: "0.08em" }}
        >
          {step.role}
        </Typography>
      </Box>
      <Typography variant="body2" sx={{ color: "text.secondary", flex: 1 }}>
        {step.body}
      </Typography>
      <Box
        component={Link}
        href={`/projects/${step.slug}/`}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 0.5,
          color: accent,
          fontWeight: 600,
          fontSize: "0.85rem",
          textDecoration: "none",
          "&:hover": { textDecoration: "underline" },
        }}
      >
        {name}
        <ArrowForwardIcon sx={{ fontSize: "1rem" }} />
      </Box>
    </Paper>
  );
}

function HowItFitsTogether() {
  return (
    <Box
      component="section"
      sx={{ borderTop: "1px solid", borderColor: "divider" }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 7, md: 10 } }}>
        <Box sx={{ mb: { xs: 4, md: 5 }, maxWidth: 720 }}>
          <Typography variant="h3" component="h2" sx={{ mb: 1.5 }}>
            How it fits together
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            The pieces form a pipeline: get the original game running, launch it
            against an emulated world, and reverse-engineer the real client to
            keep that world honest.
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {FIT_STEPS.map((step, i) => (
            <Grid key={step.slug} size={{ xs: 12, sm: 6, lg: 4 }}>
              <FitStepCard step={step} index={i} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

function CommunityBand() {
  return (
    <Box
      component="section"
      sx={{ borderTop: "1px solid", borderColor: "divider" }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 7, md: 9 } }}>
        <Paper
          variant="outlined"
          sx={{
            p: { xs: 4, md: 6 },
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            background:
              "radial-gradient(600px 240px at 50% 0%, rgba(63,185,80,0.10), transparent 70%)",
          }}
        >
          <Typography variant="h4" component="h2" sx={{ mb: 1.5 }}>
            Join the preservation effort
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", maxWidth: 560, mx: "auto", mb: 3.5 }}
          >
            Whether you want to play, contribute a fix, or help grind the
            decompilation, the community is on Discord. Come say hello.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            sx={{ justifyContent: "center" }}
          >
            <DiscordButton variant="contained" size="large" />
            <Button
              component={Link}
              href="/projects/garlemald-server/"
              variant="outlined"
              size="large"
              endIcon={<ArrowForwardIcon />}
            >
              Explore the projects
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

export default function HomeView() {
  return (
    <Box>
      <Hero />
      <ProjectsGrid />
      <Divider sx={{ borderColor: "transparent" }} />
      <HowItFitsTogether />
      <CommunityBand />
    </Box>
  );
}
