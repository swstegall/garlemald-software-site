"use client";

import { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import type { QuickStart, QuickStartStep } from "@/content/quickstart";
import type { Platform } from "@/lib/types";
import { usePlatform } from "@/lib/platform";
import Markdown from "@/components/Markdown";
import CopyButton from "@/components/CopyButton";

/** Heuristic: does this string carry markdown worth rendering through Markdown? */
function looksLikeMarkdown(text: string): boolean {
  return /[*_`[\]#]|https?:\/\//.test(text);
}

function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: 1.5,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.default",
      }}
    >
      <CopyButton text={code} size="small" ariaLabel="Copy command" tooltip="Copy" />
      <Box
        component="pre"
        aria-label={lang ? `${lang} code` : "code"}
        sx={{
          m: 0,
          p: 2,
          pr: 6,
          overflowX: "auto",
          fontFamily: "var(--font-mono), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
          fontSize: "0.85rem",
          lineHeight: 1.65,
          color: "text.primary",
        }}
      >
        <code>{code}</code>
      </Box>
    </Box>
  );
}

function StepCard({
  index,
  step,
  accent,
}: {
  index: number;
  step: QuickStartStep;
  accent: string;
}) {
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      {/* Number rail with a connecting line. */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <Box
          aria-hidden
          sx={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: accent,
            color: "#0d1117",
            fontWeight: 700,
            fontSize: "0.95rem",
            lineHeight: 1,
          }}
        >
          {index}
        </Box>
        <Box
          aria-hidden
          sx={{ flexGrow: 1, width: "2px", mt: 1, bgcolor: "divider", minHeight: 8 }}
        />
      </Box>

      {/* Step body. */}
      <Box sx={{ flexGrow: 1, pb: 4, minWidth: 0 }}>
        <Typography
          variant="h6"
          component="h3"
          sx={{ fontWeight: 600, mb: step.body || step.code ? 1 : 0 }}
        >
          {step.title}
        </Typography>

        {step.body &&
          (looksLikeMarkdown(step.body) ? (
            <Box sx={{ color: "text.secondary", mb: step.code ? 2 : 0 }}>
              <Markdown markdown={step.body} />
            </Box>
          ) : (
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", mb: step.code ? 2 : 0 }}
            >
              {step.body}
            </Typography>
          ))}

        {step.code && <CodeBlock code={step.code} lang={step.lang} />}
      </Box>
    </Box>
  );
}

export default function QuickStartGuide({
  guide,
  accent = "#3FB950",
}: {
  guide: QuickStart;
  accent?: string;
}) {
  // The segmented control offers the project's supported OSes; default to the
  // visitor's OS when supported, else the first listed platform.
  const platforms = guide.platforms?.length ? guide.platforms : [];
  const { os, ready } = usePlatform();
  const [selected, setSelected] = useState<Platform>(platforms[0]);

  useEffect(() => {
    if (ready && os && platforms.includes(os)) setSelected(os);
  }, [ready, os, platforms]);

  // Steps with no `platforms` are universal; tagged steps show only for the
  // selected OS.
  const visibleSteps = useMemo(
    () =>
      guide.steps.filter(
        (s) => !s.platforms || s.platforms.length === 0 || s.platforms.includes(selected),
      ),
    [guide.steps, selected],
  );

  const selectedNote = guide.platformNotes?.[selected];

  return (
    <Box>
      {/* Intro */}
      {looksLikeMarkdown(guide.intro) ? (
        <Box sx={{ color: "text.secondary", mb: 4 }}>
          <Markdown markdown={guide.intro} />
        </Box>
      ) : (
        <Typography variant="body1" sx={{ color: "text.secondary", mb: 4 }}>
          {guide.intro}
        </Typography>
      )}

      {/* Prerequisites */}
      {guide.prerequisites.length > 0 && (
        <Paper
          variant="outlined"
          sx={{ p: { xs: 2, sm: 3 }, mb: 5, borderColor: "divider", bgcolor: "background.paper" }}
        >
          <Typography
            variant="overline"
            sx={{ display: "block", mb: 1, color: "text.secondary", letterSpacing: 1 }}
          >
            Before you start
          </Typography>
          <List dense disablePadding>
            {guide.prerequisites.map((req, i) => (
              <ListItem key={i} disableGutters alignItems="flex-start">
                <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}>
                  <CheckCircleOutlineIcon fontSize="small" sx={{ color: accent }} />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    looksLikeMarkdown(req) ? (
                      <Box sx={{ color: "text.primary", fontSize: "0.875rem", "& p": { m: 0 } }}>
                        <Markdown markdown={req} />
                      </Box>
                    ) : (
                      <Typography variant="body2" sx={{ color: "text.primary" }}>
                        {req}
                      </Typography>
                    )
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      {/* Platform selector + walkthrough header */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1.5, sm: 2 }}
        sx={{ mb: 2.5, alignItems: { xs: "flex-start", sm: "center" }, justifyContent: "space-between" }}
      >
        <Typography variant="overline" sx={{ color: "text.secondary", letterSpacing: 1 }}>
          Walkthrough
        </Typography>
        {platforms.length > 1 && (
          <ToggleButtonGroup
            exclusive
            size="small"
            value={selected}
            onChange={(_e, next: Platform | null) => {
              if (next) setSelected(next);
            }}
            aria-label="Choose your operating system"
            sx={{
              "& .MuiToggleButton-root.Mui-selected": {
                bgcolor: `${accent}22`,
                color: accent,
                borderColor: `${accent}66`,
                "&:hover": { bgcolor: `${accent}33` },
              },
            }}
          >
            {platforms.map((p) => (
              <ToggleButton key={p} value={p} sx={{ textTransform: "none", px: 1.75 }}>
                {p === "Linux" ? "Linux (Ubuntu)" : p}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        )}
      </Stack>

      {/* Steps for the selected platform */}
      <Box>
        {visibleSteps.map((step, i) => (
          <StepCard key={`${selected}-${i}`} index={i + 1} step={step} accent={accent} />
        ))}
      </Box>

      {/* Selected-platform note */}
      {selectedNote && (
        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            alignItems: "flex-start",
            p: 2,
            mt: 1,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "rgba(255,255,255,0.02)",
          }}
        >
          <InfoOutlinedIcon fontSize="small" sx={{ color: accent, mt: 0.3 }} />
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            <Box component="span" sx={{ fontWeight: 600, color: "text.primary" }}>
              {selected === "Linux" ? "Linux (Ubuntu)" : selected}:
            </Box>{" "}
            {selectedNote}
          </Typography>
        </Box>
      )}

      {/* Next steps */}
      {guide.next && guide.next.length > 0 && (
        <>
          <Divider sx={{ my: 3 }} />
          <Typography
            variant="overline"
            sx={{ display: "block", mb: 1.5, color: "text.secondary", letterSpacing: 1 }}
          >
            Where to next
          </Typography>
          <List dense disablePadding>
            {guide.next.map((item, i) => (
              <ListItem key={i} disableGutters alignItems="flex-start">
                <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}>
                  <ArrowForwardIcon fontSize="small" sx={{ color: accent }} />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <Box sx={{ color: "text.primary", fontSize: "0.875rem", "& p": { m: 0 } }}>
                      <Markdown markdown={item} />
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Box>
  );
}
