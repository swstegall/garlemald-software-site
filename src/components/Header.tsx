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
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import MuiLink from "@mui/material/Link";
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
import { RESOURCE_SECTIONS } from "@/lib/resources";
import DiscordButton from "@/components/DiscordButton";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/#projects" },
  { label: "Resources", href: "/resources/" },
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

  const [resourcesAnchor, setResourcesAnchor] =
    React.useState<null | HTMLElement>(null);
  const resourcesMenuOpen = Boolean(resourcesAnchor);

  const openResourcesMenu = (e: React.MouseEvent<HTMLElement>) => {
    setResourcesAnchor(e.currentTarget);
  };
  const closeResourcesMenu = () => setResourcesAnchor(null);

  const Brand = (
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
      }}
    >
      <Box
        component="img"
        src={withBase("/brand/garlemald-emblem.png")}
        alt="Garlemald"
        sx={{ height: 30, width: "auto", display: "block" }}
      />
      <Typography
        component="span"
        sx={{ fontWeight: 800, fontSize: "1.15rem", letterSpacing: "-0.01em" }}
      >
        Garlemald Software
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
            ) : link.label === "Resources" ? (
              <React.Fragment key={link.label}>
                <Button
                  color="inherit"
                  onClick={openResourcesMenu}
                  endIcon={<ExpandMoreIcon />}
                  aria-haspopup="true"
                  aria-expanded={resourcesMenuOpen ? "true" : undefined}
                  aria-controls={
                    resourcesMenuOpen ? "resources-menu" : undefined
                  }
                  sx={{
                    color: pathname.startsWith("/resources")
                      ? "primary.main"
                      : "text.primary",
                  }}
                >
                  Resources
                </Button>
                <Popover
                  id="resources-menu"
                  anchorEl={resourcesAnchor}
                  open={resourcesMenuOpen}
                  onClose={closeResourcesMenu}
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  transformOrigin={{ vertical: "top", horizontal: "left" }}
                  slotProps={{
                    paper: {
                      sx: { mt: 0.5, p: 2.5, maxWidth: "min(940px, 94vw)" },
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, minmax(180px, 1fr))",
                        md: "repeat(4, minmax(170px, 1fr))",
                      },
                      gap: { xs: 2, md: 3 },
                    }}
                  >
                    {RESOURCE_SECTIONS.map((section) => (
                      <Box key={section.slug}>
                        <MuiLink
                          component={Link}
                          href={`/resources/#${section.slug}`}
                          onClick={closeResourcesMenu}
                          underline="none"
                          sx={{
                            display: "block",
                            fontWeight: 700,
                            fontSize: "0.95rem",
                            color: "text.primary",
                            pb: 0.75,
                            mb: 0.75,
                            borderBottom: "1px solid",
                            borderColor: "divider",
                            "&:hover": { color: "primary.main" },
                          }}
                        >
                          {section.title}
                        </MuiLink>
                        <Stack
                          component="ul"
                          spacing={0.25}
                          sx={{ listStyle: "none", m: 0, p: 0 }}
                        >
                          {section.pages.map((page) => {
                            const href = `/resources/${section.slug}/${page.slug}/`;
                            return (
                              <Box component="li" key={page.slug}>
                                <MuiLink
                                  component={Link}
                                  href={href}
                                  onClick={closeResourcesMenu}
                                  underline="none"
                                  sx={{
                                    display: "block",
                                    py: 0.4,
                                    fontSize: "0.875rem",
                                    color:
                                      pathname === href
                                        ? "primary.main"
                                        : "text.secondary",
                                    "&:hover": { color: "primary.main" },
                                  }}
                                >
                                  {page.title}
                                </MuiLink>
                              </Box>
                            );
                          })}
                        </Stack>
                      </Box>
                    ))}
                  </Box>
                </Popover>
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
            src={withBase("/brand/garlemald-emblem.png")}
            alt=""
            sx={{ height: 26, width: "auto" }}
          />
          <Typography sx={{ fontWeight: 800 }}>Garlemald Software</Typography>
        </Box>
        <Divider />
        <List>
          {NAV_LINKS.filter((link) => link.label !== "Resources").map(
            (link) => (
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
            ),
          )}
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
        <List
          subheader={
            <ListSubheader
              component="div"
              sx={{ bgcolor: "transparent", color: "text.secondary" }}
            >
              Resources
            </ListSubheader>
          }
        >
          {RESOURCE_SECTIONS.map((section) => (
            <React.Fragment key={section.slug}>
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  href={`/resources/#${section.slug}`}
                  onClick={() => setDrawerOpen(false)}
                >
                  <ListItemText
                    primary={section.title}
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontWeight: 700,
                        fontSize: "0.95rem",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
              {section.pages.map((page) => {
                const href = `/resources/${section.slug}/${page.slug}/`;
                return (
                  <ListItem key={page.slug} disablePadding>
                    <ListItemButton
                      component={Link}
                      href={href}
                      onClick={() => setDrawerOpen(false)}
                      selected={pathname === href}
                      sx={{ pl: 4, py: 0.25 }}
                    >
                      <ListItemText
                        primary={page.title}
                        sx={{
                          "& .MuiListItemText-primary": { fontSize: "0.85rem" },
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </React.Fragment>
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
