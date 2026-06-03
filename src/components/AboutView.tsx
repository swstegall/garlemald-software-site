"use client";

import type * as React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import MuiLink from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DnsIcon from "@mui/icons-material/Dns";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import MemoryIcon from "@mui/icons-material/Memory";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import TerminalIcon from "@mui/icons-material/Terminal";
import ExtensionIcon from "@mui/icons-material/Extension";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { ORDERED_PROJECTS, withBase } from "@/lib/projects";
import type { Project } from "@/lib/types";
import DiscordButton from "@/components/DiscordButton";

const ICONS: Record<string, typeof DnsIcon> = {
  dns: DnsIcon,
  rocket_launch: RocketLaunchIcon,
  memory: MemoryIcon,
  smart_toy: SmartToyIcon,
  terminal: TerminalIcon,
};

function ProjectIcon({ project }: { project: Project }) {
  const Icon = ICONS[project.icon] ?? ExtensionIcon;
  return (
    <Box
      sx={{
        flexShrink: 0,
        width: 44,
        height: 44,
        borderRadius: 2,
        display: "grid",
        placeItems: "center",
        color: project.accent,
        bgcolor: `${project.accent}22`,
        border: "1px solid",
        borderColor: `${project.accent}55`,
      }}
    >
      <Icon fontSize="medium" aria-hidden />
    </Box>
  );
}

/** Section heading with a consistent rhythm above the body. */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      variant="h4"
      component="h2"
      sx={{ mt: { xs: 5, md: 7 }, mb: 2 }}
    >
      {children}
    </Typography>
  );
}

export default function AboutView() {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
      {/* Intro / hero */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={3}
        sx={{ mb: 4, alignItems: { xs: "flex-start", sm: "center" } }}
      >
        <Box
          component="img"
          src={withBase("/brand/garlemald-emblem.png")}
          alt="Garlemald Software icon"
          sx={{
            height: 104,
            width: "auto",
            flexShrink: 0,
            filter: "drop-shadow(0 6px 20px rgba(63,185,80,0.25))",
          }}
        />
        <Box>
          <Typography
            variant="overline"
            sx={{ color: "primary.main", letterSpacing: "0.12em" }}
          >
            About
          </Typography>
          <Typography variant="h3" component="h1" sx={{ mt: 0.5 }}>
            Preserving FINAL FANTASY XIV 1.0
          </Typography>
        </Box>
      </Stack>

      <Typography
        variant="h6"
        component="p"
        sx={{ color: "text.secondary", fontWeight: 400, lineHeight: 1.6, maxWidth: "62ch" }}
      >
        A small toolkit of open-source projects for running, launching,
        installing, and reverse-engineering the original 2010 release of FINAL
        FANTASY XIV — the version the world stopped being able to play in 2012.
      </Typography>

      {/* What is 1.0 */}
      <SectionHeading>What is FINAL FANTASY XIV 1.0?</SectionHeading>
      <Stack spacing={2} sx={{ maxWidth: "68ch" }}>
        <Typography sx={{ color: "text.secondary", lineHeight: 1.75 }}>
          FINAL FANTASY XIV first launched in 2010. It was a strikingly
          ambitious MMORPG that struggled at release, and Square Enix made the
          rare decision to tear it down and rebuild it. The original game ran
          through a series of patches up to its final version,{" "}
          <Box component="span" sx={{ color: "text.primary", fontWeight: 600 }}>
            v1.23b
          </Box>
          , before its servers were shut down on November 11, 2012 — its story
          ending with the in-game cataclysm of the Seventh Umbral Calamity.
        </Typography>
        <Typography sx={{ color: "text.secondary", lineHeight: 1.75 }}>
          When the servers went dark, the game was replaced by a wholly new
          client and server: 2013&apos;s{" "}
          <Box component="span" sx={{ color: "text.primary", fontWeight: 600 }}>
            A Realm Reborn
          </Box>
          . Because 1.0 only ever existed online, it became unplayable the moment
          the lights went out. There is no offline mode, no re-release — the
          original game survives only through preservation work.
        </Typography>
      </Stack>

      {/* Project Meteor */}
      <SectionHeading>What is Project Meteor preservation?</SectionHeading>
      <Stack spacing={2} sx={{ maxWidth: "68ch" }}>
        <Typography sx={{ color: "text.secondary", lineHeight: 1.75 }}>
          The community has spent years keeping 1.0 alive. The retail client
          binaries still exist on collectors&apos; disks, but a client is useless
          without a server to talk to — and Square Enix&apos;s servers are gone
          forever. The{" "}
          <MuiLink
            href="http://ffxivclassic.fragmenterworks.com/wiki/index.php/Main_Page"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "primary.main", fontWeight: 600 }}
          >
            Project Meteor Server
          </MuiLink>{" "}
          (formerly Seventh Umbral) is the landmark community effort that
          re-implements the 1.x server from scratch, reverse-engineering the wire
          protocol packet by packet so the original client can once again log in
          and walk around Eorzea.
        </Typography>
        <Typography sx={{ color: "text.secondary", lineHeight: 1.75 }}>
          The projects on this site build on and beside that legacy: a
          ground-up Rust rewrite of the server, a modern cross-platform
          launcher, a clean-room decompilation of the client binaries, the
          automation that drives it, and a one-command installer for Apple
          Silicon Macs.
        </Typography>
      </Stack>

      {/* The toolkit */}
      <SectionHeading>The toolkit</SectionHeading>
      <Typography
        sx={{ color: "text.secondary", lineHeight: 1.75, mb: 3, maxWidth: "68ch" }}
      >
        Five projects fit together so you can stand the whole thing up yourself —
        install the game, launch it, point it at a server, and dig into how it
        works under the hood.
      </Typography>

      <Stack spacing={2}>
        {ORDERED_PROJECTS.map((project) => (
          <Paper
            key={project.slug}
            variant="outlined"
            sx={{
              p: { xs: 2, sm: 2.5 },
              display: "flex",
              alignItems: "flex-start",
              gap: 2,
              transition: "border-color 120ms ease",
              "&:hover": { borderColor: `${project.accent}88` },
            }}
          >
            <ProjectIcon project={project} />
            <Box sx={{ minWidth: 0, flexGrow: 1 }}>
              <Stack
                direction="row"
                spacing={1}
                sx={{ mb: 0.5, alignItems: "center", flexWrap: "wrap" }}
              >
                <Typography variant="h6" component="h3">
                  {project.name}
                </Typography>
                <Chip
                  label={project.category}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: "0.7rem",
                    color: project.accent,
                    borderColor: `${project.accent}66`,
                    bgcolor: "transparent",
                  }}
                  variant="outlined"
                />
              </Stack>
              <Typography
                sx={{ color: "text.secondary", lineHeight: 1.6, mb: 1.25 }}
              >
                {project.tagline}
              </Typography>
              <Button
                component={Link}
                href={`/projects/${project.slug}/`}
                size="small"
                endIcon={<ArrowForwardIcon />}
                sx={{ color: project.accent, px: 0.5, minWidth: 0 }}
              >
                Explore {project.name}
              </Button>
            </Box>
          </Paper>
        ))}
      </Stack>

      {/* Community */}
      <SectionHeading>Join the community</SectionHeading>
      <Paper
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          background:
            "linear-gradient(135deg, rgba(88,101,242,0.12), rgba(28,200,182,0.06))",
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          sx={{
            alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ maxWidth: "52ch" }}>
            <Typography variant="h6" component="p" sx={{ mb: 0.5 }}>
              Get help, share progress, and follow development.
            </Typography>
            <Typography sx={{ color: "text.secondary", lineHeight: 1.6 }}>
              The fastest way to ask questions, report issues, and keep up with
              new releases across all five projects is the Discord server.
            </Typography>
          </Box>
          <Box sx={{ flexShrink: 0 }}>
            <DiscordButton variant="contained" size="large" />
          </Box>
        </Stack>
      </Paper>

      {/* Attribution & licensing */}
      <SectionHeading>Attribution &amp; licensing</SectionHeading>
      <Stack spacing={2} sx={{ maxWidth: "68ch" }}>
        <Typography sx={{ color: "text.secondary", lineHeight: 1.75 }}>
          These projects stand on the shoulders of the preservation community.
          They derive from and credit the upstream work that made them possible:
        </Typography>
        <List dense disablePadding sx={{ pl: 1 }}>
          {[
            {
              name: "Project Meteor Server",
              href: "http://ffxivclassic.fragmenterworks.com/wiki/index.php/Main_Page",
              note: "the community 1.x server re-implementation this work ports from and is validated against.",
            },
            {
              name: "Seventh Umbral",
              href: "https://github.com/Meteor-Project/SeventhUmbral",
              note: "the original launcher and server lineage that Project Meteor and these tools grew out of.",
            },
            {
              name: "LandSandBoat",
              href: "https://github.com/LandSandBoat/server",
              note: "the FINAL FANTASY XI private server, referenced for the XI-inherited combat and systems math.",
            },
          ].map((item) => (
            <ListItem key={item.name} disableGutters sx={{ alignItems: "flex-start" }}>
              <ListItemText
                primary={
                  <MuiLink
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: "text.primary",
                      fontWeight: 600,
                      "&:hover": { color: "primary.main" },
                    }}
                  >
                    {item.name}
                  </MuiLink>
                }
                secondary={item.note}
                slotProps={{
                  secondary: { sx: { color: "text.secondary", lineHeight: 1.6 } },
                }}
              />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 1 }} />

        <Typography sx={{ color: "text.secondary", lineHeight: 1.75 }}>
          The server, client, and decompilation projects are released under the{" "}
          <Box component="span" sx={{ color: "text.primary", fontWeight: 600 }}>
            GNU AGPL-3.0-or-later
          </Box>
          . The Apple Silicon installer is released under the{" "}
          <Box component="span" sx={{ color: "text.primary", fontWeight: 600 }}>
            MIT
          </Box>{" "}
          license. Each repository ships its full license text and a{" "}
          <Box component="span" sx={{ fontFamily: "var(--font-mono)" }}>
            NOTICE
          </Box>{" "}
          file crediting its upstreams in detail.
        </Typography>
        <Typography sx={{ color: "text.secondary", lineHeight: 1.75 }}>
          FINAL FANTASY XIV is a trademark of Square Enix Holdings Co., Ltd.
          These are independent, non-commercial preservation and research
          projects, and are not affiliated with or endorsed by Square Enix.
        </Typography>
        <Box sx={{ pt: 0.5 }}>
          <MuiLink
            component={Link}
            href="/projects/garlemald-server/"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.5,
              color: "primary.main",
              fontWeight: 600,
            }}
          >
            Read the per-project NOTICE files
            <OpenInNewIcon sx={{ fontSize: 16 }} aria-hidden />
          </MuiLink>
        </Box>
      </Stack>
    </Container>
  );
}
