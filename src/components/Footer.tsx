"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import GitHubIcon from "@mui/icons-material/GitHub";
import { PROJECTS, GITHUB_USERNAME, withBase } from "@/lib/projects";
import { repoUrl } from "@/lib/github";
import DiscordButton from "@/components/DiscordButton";

const GITHUB_PROFILE = `https://github.com/${GITHUB_USERNAME}`;

interface ResourceLink {
  label: string;
  href: string;
  external?: boolean;
}

const RESOURCE_LINKS: ResourceLink[] = [
  { label: "All downloads", href: "/downloads/" },
  { label: "Quick start", href: "/start/" },
  { label: "About", href: "/about/" },
];

/** Shared style for an internal footer link rendered via next/link. */
const internalLinkSx = {
  color: "text.secondary",
  textDecoration: "none",
  fontSize: "0.875rem",
  "&:hover": { color: "text.primary" },
} as const;

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      variant="overline"
      sx={{ color: "text.primary", fontWeight: 700, letterSpacing: "0.08em" }}
    >
      {children}
    </Typography>
  );
}

export default function Footer() {
  const year = 2026;

  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        borderTop: "1px solid",
        borderColor: "divider",
        bgcolor: "rgba(0,0,0,0.25)",
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 6 } }}>
        <Grid container spacing={{ xs: 4, md: 5 }}>
          {/* Brand */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              component={Link}
              href="/"
              aria-label="Garlemald Software home"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1.25,
                textDecoration: "none",
                color: "text.primary",
                mb: 1.5,
              }}
            >
              <Box
                component="img"
                src={withBase("/brand/garlemald-emblem.png")}
                alt="Garlemald Software"
                sx={{ height: 30, width: "auto" }}
              />
              <Typography sx={{ fontWeight: 800, fontSize: "1.15rem" }}>
                Garlemald Software
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", maxWidth: 320 }}
            >
              A FINAL FANTASY XIV 1.0 (v1.23b) preservation toolkit — a Rust
              server and launcher, a clean-room client decompilation, the agents
              that drive it, and a one-command Apple Silicon installer.
            </Typography>
          </Grid>

          {/* Projects column */}
          <Grid size={{ xs: 6, md: 3 }}>
            <FooterHeading>Projects</FooterHeading>
            <Stack spacing={1} sx={{ mt: 1.5 }}>
              {PROJECTS.map((p) => (
                <Box
                  key={p.slug}
                  component={Link}
                  href={`/projects/${p.slug}/`}
                  sx={{
                    ...internalLinkSx,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      bgcolor: p.accent,
                      flexShrink: 0,
                    }}
                  />
                  {p.name}
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* Resources column */}
          <Grid size={{ xs: 6, md: 3 }}>
            <FooterHeading>Resources</FooterHeading>
            <Stack spacing={1} sx={{ mt: 1.5 }}>
              {RESOURCE_LINKS.map((link) => (
                <Box
                  key={link.href}
                  component={Link}
                  href={link.href}
                  sx={internalLinkSx}
                >
                  {link.label}
                </Box>
              ))}
              {PROJECTS.map((p) => (
                <MuiLink
                  key={p.slug}
                  href={repoUrl(p.owner, p.repo)}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.875rem",
                    "&:hover": { color: "text.primary" },
                  }}
                >
                  {p.name} repo
                </MuiLink>
              ))}
            </Stack>
          </Grid>

          {/* Community column */}
          <Grid size={{ xs: 12, md: 2 }}>
            <FooterHeading>Community</FooterHeading>
            <Stack spacing={1.5} sx={{ mt: 1.5, alignItems: "flex-start" }}>
              <DiscordButton variant="chip" />
              <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
                <Tooltip title="GitHub">
                  <IconButton
                    component="a"
                    href={GITHUB_PROFILE}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile"
                    size="small"
                    sx={{ color: "text.secondary" }}
                  >
                    <GitHubIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <MuiLink
                  href={GITHUB_PROFILE}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.875rem",
                    "&:hover": { color: "text.primary" },
                  }}
                >
                  @{GITHUB_USERNAME}
                </MuiLink>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: { xs: 4, md: 5 } }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between",
            gap: 1.5,
          }}
        >
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            © {year} Samuel Stegall. Each project is licensed under its own terms
            (AGPL-3.0-or-later / MIT) — see each repository for details.
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Built with Next.js + MUI
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
