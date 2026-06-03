"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import MenuIcon from "@mui/icons-material/Menu";
import GitHubIcon from "@mui/icons-material/GitHub";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { PROJECTS, GITHUB_USERNAME, withBase } from "@/lib/projects";
import DiscordButton from "@/components/DiscordButton";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/#projects" },
  { label: "Downloads", href: "/downloads/" },
  { label: "Quick Start", href: "/start/" },
  { label: "About", href: "/about/" },
];

const GITHUB_PROFILE = `https://github.com/${GITHUB_USERNAME}`;

/** Whether a nav href represents the current route (ignoring hash links). */
function isActive(pathname: string, href: string): boolean {
  if (href.includes("#")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href);
}

export default function Header() {
  const pathname = usePathname() ?? "/";
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [projectsAnchor, setProjectsAnchor] =
    React.useState<null | HTMLElement>(null);
  const projectsMenuOpen = Boolean(projectsAnchor);

  const openProjectsMenu = (e: React.MouseEvent<HTMLElement>) => {
    setProjectsAnchor(e.currentTarget);
  };
  const closeProjectsMenu = () => setProjectsAnchor(null);

  const Brand = (
    <Box
      component={Link}
      href="/"
      aria-label="Garlemald home"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1.25,
        textDecoration: "none",
        color: "text.primary",
      }}
    >
      <Box
        component="img"
        src={withBase("/brand/garlemald-icon.png")}
        alt="Garlemald"
        sx={{ height: 30, width: "auto", display: "block" }}
      />
      <Typography
        component="span"
        sx={{ fontWeight: 800, fontSize: "1.15rem", letterSpacing: "-0.01em" }}
      >
        Garlemald
      </Typography>
    </Box>
  );

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ gap: 1, minHeight: { xs: 60, md: 68 } }}>
        {Brand}

        <Box sx={{ flexGrow: 1 }} />

        {/* Desktop nav */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 0.5,
          }}
        >
          {NAV_LINKS.map((link) =>
            link.label === "Projects" ? (
              <React.Fragment key={link.label}>
                <Button
                  color="inherit"
                  onClick={openProjectsMenu}
                  endIcon={<ExpandMoreIcon />}
                  aria-haspopup="true"
                  aria-expanded={projectsMenuOpen ? "true" : undefined}
                  aria-controls={projectsMenuOpen ? "projects-menu" : undefined}
                  sx={{
                    color: pathname.startsWith("/projects")
                      ? "primary.main"
                      : "text.primary",
                  }}
                >
                  Projects
                </Button>
                <Menu
                  id="projects-menu"
                  anchorEl={projectsAnchor}
                  open={projectsMenuOpen}
                  onClose={closeProjectsMenu}
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  transformOrigin={{ vertical: "top", horizontal: "left" }}
                  slotProps={{ list: { dense: true } }}
                >
                  {PROJECTS.map((p) => (
                    <MenuItem
                      key={p.slug}
                      component={Link}
                      href={`/projects/${p.slug}/`}
                      onClick={closeProjectsMenu}
                      selected={pathname === `/projects/${p.slug}/`}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          bgcolor: p.accent,
                          mr: 1.25,
                          flexShrink: 0,
                        }}
                      />
                      {p.name}
                    </MenuItem>
                  ))}
                </Menu>
              </React.Fragment>
            ) : (
              <Button
                key={link.label}
                component={Link}
                href={link.href}
                color="inherit"
                sx={{
                  color: isActive(pathname, link.href)
                    ? "primary.main"
                    : "text.primary",
                }}
              >
                {link.label}
              </Button>
            ),
          )}
        </Box>

        {/* Right-edge actions (desktop) */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 1,
            ml: 1,
          }}
        >
          <DiscordButton variant="outlined" size="small" />
          <Tooltip title="GitHub">
            <IconButton
              component="a"
              href={GITHUB_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              sx={{ color: "text.primary" }}
            >
              <GitHubIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Mobile hamburger */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            edge="end"
            aria-label="Open navigation menu"
            onClick={() => setDrawerOpen(true)}
            sx={{ color: "text.primary" }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{ paper: { sx: { width: 280, bgcolor: "background.paper" } } }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.25,
            px: 2,
            py: 2,
          }}
        >
          <Box
            component="img"
            src={withBase("/brand/garlemald-icon.png")}
            alt=""
            sx={{ height: 26, width: "auto" }}
          />
          <Typography sx={{ fontWeight: 800 }}>Garlemald</Typography>
        </Box>
        <Divider />
        <List>
          {NAV_LINKS.map((link) => (
            <ListItem key={link.label} disablePadding>
              <ListItemButton
                component={Link}
                href={link.href}
                onClick={() => setDrawerOpen(false)}
                selected={isActive(pathname, link.href)}
              >
                <ListItemText primary={link.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List
          subheader={
            <ListSubheader
              component="div"
              sx={{ bgcolor: "transparent", color: "text.secondary" }}
            >
              Projects
            </ListSubheader>
          }
        >
          {PROJECTS.map((p) => (
            <ListItem key={p.slug} disablePadding>
              <ListItemButton
                component={Link}
                href={`/projects/${p.slug}/`}
                onClick={() => setDrawerOpen(false)}
                selected={pathname === `/projects/${p.slug}/`}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: p.accent,
                    mr: 1.5,
                    flexShrink: 0,
                  }}
                />
                <ListItemText primary={p.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          <DiscordButton variant="contained" size="small" fullWidth />
          <Button
            component="a"
            href={GITHUB_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            color="inherit"
            startIcon={<GitHubIcon />}
            fullWidth
          >
            GitHub
          </Button>
        </Box>
      </Drawer>
    </AppBar>
  );
}
