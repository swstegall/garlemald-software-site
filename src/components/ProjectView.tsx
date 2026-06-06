"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

import GitHubIcon from "@mui/icons-material/GitHub";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import BugReportIcon from "@mui/icons-material/BugReport";
import DescriptionIcon from "@mui/icons-material/Description";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import DnsIcon from "@mui/icons-material/Dns";
import MemoryIcon from "@mui/icons-material/Memory";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import TerminalIcon from "@mui/icons-material/Terminal";
import ExtensionIcon from "@mui/icons-material/Extension";

// Material icon components all share this shape; deriving it from a concrete
// import avoids depending on a named type export that may not exist.
type IconComponent = typeof ExtensionIcon;

import { getProject } from "@/lib/projects";
import { getProjectContentOrEmpty, fetchLiveReadme, fetchLiveMarkdown } from "@/lib/content";
import { repoUrl, releasesUrl, issuesUrl } from "@/lib/github";
import type { Platform, FetchedDoc } from "@/lib/types";
import { getQuickStart } from "@/content/quickstart";

import Markdown from "@/components/Markdown";
import BranchToggle from "@/components/BranchToggle";
import QuickStartGuide from "@/components/QuickStartGuide";
import ReleaseDownloads from "@/components/ReleaseDownloads";
import DecompProgress from "@/components/DecompProgress";

const ICON_MAP: Record<string, IconComponent> = {
  dns: DnsIcon,
  rocket_launch: RocketLaunchIcon,
  memory: MemoryIcon,
  smart_toy: SmartToyIcon,
  terminal: TerminalIcon,
};

function iconFor(name: string): IconComponent {
  return ICON_MAP[name] ?? ExtensionIcon;
}

// Optional one-line intro shown under a doc-group heading. Keyed by the group
// name authored in the registry (`ProjectDoc.group`); add an entry to describe a
// new section. Groups without an entry simply render with no blurb.
const DOC_GROUP_BLURBS: Record<string, string> = {
  Contributing:
    "Everything you need to set up the project, understand the codebase, and open your first pull request.",
};

// The ungrouped catch-all section, always rendered last.
const DEFAULT_DOC_GROUP = "Reference";

interface DocSection {
  /** Group key, or null for the implicit single-section (no groups) case. */
  group: string | null;
  /** Heading to show above the grid, or null to render with no heading. */
  heading: string | null;
  blurb?: string;
  docs: FetchedDoc[];
}

/**
 * Partition a project's docs into display sections by their `group`.
 *
 * - No doc has a group → one headless section (renders exactly like before, so
 *   projects without grouping are visually unchanged).
 * - Otherwise → one section per named group in first-appearance (registry)
 *   order, with the ungrouped "Reference" section always last.
 */
function buildDocSections(docs: FetchedDoc[]): DocSection[] {
  if (!docs.some((d) => d.group)) {
    return [{ group: null, heading: null, docs }];
  }
  const order: string[] = [];
  const byGroup = new Map<string, FetchedDoc[]>();
  for (const d of docs) {
    const g = d.group ?? DEFAULT_DOC_GROUP;
    if (!byGroup.has(g)) {
      byGroup.set(g, []);
      order.push(g);
    }
    byGroup.get(g)!.push(d);
  }
  order.sort(
    (a, b) =>
      (a === DEFAULT_DOC_GROUP ? 1 : 0) - (b === DEFAULT_DOC_GROUP ? 1 : 0),
  );
  return order.map((g) => ({
    group: g,
    heading: g,
    blurb: DOC_GROUP_BLURBS[g],
    docs: byGroup.get(g)!,
  }));
}

type SectionKey = "overview" | "quickstart" | "downloads" | "docs";

interface ProjectViewProps {
  slug: string;
}

export default function ProjectView({ slug }: ProjectViewProps) {
  const project = getProject(slug)!;
  const content = getProjectContentOrEmpty(slug);
  const quickStart = useMemo(() => getQuickStart(slug), [slug]);

  const [section, setSection] = useState<SectionKey>("overview");

  // README / branch state.
  const [branch, setBranch] = useState<string>(project.defaultBranch);
  const [readme, setReadme] = useState<string>(
    content.readmeByBranch[project.defaultBranch] ?? "",
  );
  const [readmeLoading, setReadmeLoading] = useState<boolean>(false);

  // Switch branches: show the baked README immediately if present, otherwise
  // fetch it live. Either way attempt a live refresh for freshness.
  function handleBranchChange(next: string) {
    if (next === branch) return;
    setBranch(next);
    const baked = content.readmeByBranch[next];
    if (baked) {
      setReadme(baked);
      setReadmeLoading(false);
    } else {
      setReadme("");
      setReadmeLoading(true);
    }
  }

  // Live refresh: whenever the branch changes, try to pull the freshest README
  // from GitHub and swap it in if the fetch succeeds. Fails soft to the bake.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const live =
        (await fetchLiveReadme(slug, branch)) ??
        (await fetchLiveMarkdown(slug, branch, "README.md"));
      if (cancelled) return;
      if (live) setReadme(live);
      setReadmeLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [slug, branch]);

  const Icon = iconFor(project.icon);

  // Docs shown in the Docs tab — README is surfaced as the Overview instead.
  const sidebarDocs = useMemo(
    () => content.docs.filter((d) => d.path !== "README.md"),
    [content.docs],
  );
  // Partition into sections by `group` (e.g. "Contributing") for the Docs tab.
  const docSections = useMemo(() => buildDocSections(sidebarDocs), [sidebarDocs]);

  const overviewEmpty = !readme && !readmeLoading;

  return (
    <Box>
      {/* Header band -------------------------------------------------------- */}
      <Box
        component="header"
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          background: `linear-gradient(180deg, ${project.accent}14 0%, transparent 70%)`,
        }}
      >
        <Container maxWidth="lg" sx={{ py: { xs: 5, md: 7 } }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            sx={{ alignItems: { xs: "flex-start", sm: "center" } }}
          >
            <Box
              aria-hidden
              sx={{
                flexShrink: 0,
                width: 72,
                height: 72,
                borderRadius: 3,
                display: "grid",
                placeItems: "center",
                bgcolor: `${project.accent}1F`,
                border: "1px solid",
                borderColor: `${project.accent}55`,
              }}
            >
              <Icon sx={{ fontSize: 40, color: project.accent }} />
            </Box>

            <Box sx={{ minWidth: 0 }}>
              <Typography variant="h3" component="h1" sx={{ wordBreak: "break-word" }}>
                {project.name}
              </Typography>
              <Typography
                variant="h6"
                component="p"
                sx={{ color: "text.secondary", fontWeight: 400, mt: 0.5 }}
              >
                {project.tagline}
              </Typography>
            </Box>
          </Stack>

          {/* Metadata chips */}
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{ mt: 3, flexWrap: "wrap" }}
          >
            <Chip
              label={project.language}
              size="small"
              sx={{
                bgcolor: `${project.accent}22`,
                color: project.accent,
                fontWeight: 700,
              }}
            />
            <Chip label={project.category} size="small" variant="outlined" />
            <Chip label={project.license} size="small" variant="outlined" />
            {project.platforms.map((p: Platform) => (
              <Chip key={p} label={p} size="small" variant="outlined" />
            ))}
            {project.appleSiliconOnly && (
              <Chip label="Apple Silicon" size="small" variant="outlined" />
            )}
          </Stack>

          {/* Action buttons */}
          <Stack
            direction="row"
            spacing={1.5}
            useFlexGap
            sx={{ mt: 3, flexWrap: "wrap" }}
          >
            <Button
              variant="contained"
              size="small"
              startIcon={<GitHubIcon />}
              component="a"
              href={repoUrl(project.owner, project.repo)}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub repo
            </Button>
            {project.hasReleases && (
              <Button
                variant="outlined"
                size="small"
                startIcon={<LocalOfferIcon />}
                component="a"
                href={releasesUrl(project.owner, project.repo)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Releases
              </Button>
            )}
            <Button
              variant="outlined"
              size="small"
              startIcon={<BugReportIcon />}
              component="a"
              href={issuesUrl(project.owner, project.repo)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Issues
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Section tabs ------------------------------------------------------- */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 2,
          bgcolor: "rgba(10,13,11,0.85)",
          backdropFilter: "saturate(140%) blur(8px)",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="lg">
          <Tabs
            value={section}
            onChange={(_e, next: SectionKey) => setSection(next)}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            aria-label="Project sections"
          >
            <Tab value="overview" label="Overview" />
            {quickStart && <Tab value="quickstart" label="Quick start" />}
            <Tab value="downloads" label="Downloads" />
            <Tab value="docs" label="Docs" />
          </Tabs>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        {/* OVERVIEW ---------------------------------------------------------- */}
        {section === "overview" && (
          <Box>
            {slug === "meteor-decomp" && (
              <Box sx={{ mb: 4 }}>
                <DecompProgress />
              </Box>
            )}
            {project.branches.length > 1 && (
              <Stack
                direction="row"
                spacing={2}
                useFlexGap
                sx={{ mb: 3, alignItems: "center", flexWrap: "wrap" }}
              >
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Branch
                </Typography>
                <BranchToggle
                  branches={project.branches}
                  value={branch}
                  onChange={handleBranchChange}
                />
              </Stack>
            )}

            {readmeLoading && overviewEmpty ? (
              <Stack spacing={1.5}>
                <Skeleton variant="text" width="40%" height={48} />
                <Skeleton variant="text" width="90%" />
                <Skeleton variant="text" width="80%" />
                <Skeleton variant="rectangular" height={160} />
                <Skeleton variant="text" width="70%" />
              </Stack>
            ) : overviewEmpty ? (
              <Typography sx={{ color: "text.secondary" }}>
                No README is available for the{" "}
                <Box component="span" sx={{ fontFamily: "var(--font-mono)" }}>
                  {branch}
                </Box>{" "}
                branch.
              </Typography>
            ) : (
              <Markdown
                markdown={readme}
                linkBase={{
                  owner: project.owner,
                  repo: project.repo,
                  branch,
                }}
              />
            )}
          </Box>
        )}

        {/* QUICK START ------------------------------------------------------- */}
        {section === "quickstart" && quickStart && (
          <Box>
            <QuickStartGuide guide={quickStart} accent={project.accent} />
            <Divider sx={{ my: 4 }} />
            <Button
              variant="outlined"
              component={Link}
              href="/start/"
              endIcon={<ChevronRightIcon />}
            >
              See all quick-start guides
            </Button>
          </Box>
        )}

        {/* DOWNLOADS --------------------------------------------------------- */}
        {section === "downloads" && <ReleaseDownloads project={project} />}

        {/* DOCS -------------------------------------------------------------- */}
        {section === "docs" && (
          <Box>
            <Typography variant="h5" component="h2" sx={{ mb: 1 }}>
              Documentation
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
              Curated docs pulled from the repository. The project README is on
              the Overview tab.
            </Typography>

            {sidebarDocs.length === 0 ? (
              <Typography sx={{ color: "text.secondary" }}>
                No additional documentation has been published for this project
                yet.
              </Typography>
            ) : (
              <Stack spacing={4}>
                {docSections.map((docSection) => (
                  <Box component="section" key={docSection.group ?? "__default"}>
                    {docSection.heading && (
                      <Typography
                        variant="h6"
                        component="h3"
                        sx={{ mb: docSection.blurb ? 0.5 : 1.5 }}
                      >
                        {docSection.heading}
                      </Typography>
                    )}
                    {docSection.blurb && (
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", mb: 2 }}
                      >
                        {docSection.blurb}
                      </Typography>
                    )}
                    <Grid container spacing={2}>
                      {docSection.docs.map((doc) => (
                        <Grid key={doc.docSlug} size={{ xs: 12, md: 6 }}>
                          <Card variant="outlined" sx={{ height: "100%" }}>
                            <CardActionArea
                              component={Link}
                              href={`/projects/${slug}/docs/${doc.docSlug}/`}
                              sx={{
                                p: 2.5,
                                height: "100%",
                                alignItems: "flex-start",
                              }}
                            >
                              <Stack
                                direction="row"
                                spacing={1.5}
                                sx={{ alignItems: "flex-start" }}
                              >
                                <DescriptionIcon
                                  sx={{ color: project.accent, mt: 0.25 }}
                                />
                                <Box sx={{ minWidth: 0 }}>
                                  <Typography
                                    variant="subtitle1"
                                    sx={{ fontWeight: 700 }}
                                  >
                                    {doc.title}
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    sx={{
                                      color: "text.secondary",
                                      fontFamily: "var(--font-mono)",
                                      wordBreak: "break-all",
                                    }}
                                  >
                                    {doc.path}
                                  </Typography>
                                </Box>
                              </Stack>
                            </CardActionArea>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                ))}
              </Stack>
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
}
