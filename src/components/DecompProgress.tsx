"use client";

import { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import Divider from "@mui/material/Divider";
import MemoryIcon from "@mui/icons-material/Memory";
import { getProjectContentOrEmpty, fetchLiveReadme } from "@/lib/content";

const ACCENT = "#A371F7";
const SLUG = "meteor-decomp";

interface BinaryRow {
  name: string;
  files: number;
  bytes: number;
  totalBytes: number;
}

interface Parsed {
  binaries: BinaryRow[];
  total: BinaryRow | null;
}

/** Parse the README's `<!-- BEGIN:progress -->` table into per-binary rows. */
function parseProgress(md: string): Parsed {
  const binaries: BinaryRow[] = [];
  let total: BinaryRow | null = null;
  const num = (s: string | undefined): number =>
    Number((s ?? "").replace(/,/g, "").trim());

  for (const line of md.split("\n")) {
    if (!line.includes("|")) continue;
    // Strip markdown emphasis/backticks, then split the table row into cells.
    const parts = line.split("|").map((c) => c.replace(/[`*]/g, "").trim());
    // parts[0] is the empty cell before the leading "|".
    const name = parts[1] ?? "";
    const files = num(parts[2]);
    const bytes = num(parts[3]);
    const totalBytes = num(parts[4]);

    if (/^ffxiv\w+\.exe$/i.test(name)) {
      if (Number.isFinite(bytes) && Number.isFinite(totalBytes) && totalBytes > 0) {
        binaries.push({ name, files, bytes, totalBytes });
      }
    } else if (/^total$/i.test(name)) {
      if (Number.isFinite(bytes) && Number.isFinite(totalBytes) && totalBytes > 0) {
        total = { name: "Total", files, bytes, totalBytes };
      }
    }
  }
  return { binaries, total };
}

function pct(bytes: number, totalBytes: number): number {
  if (!totalBytes) return 0;
  return (bytes / totalBytes) * 100;
}

function Bar({
  label,
  bytes,
  totalBytes,
  emphasis,
}: {
  label: string;
  bytes: number;
  totalBytes: number;
  emphasis?: boolean;
}) {
  const value = pct(bytes, totalBytes);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 1,
          mb: 0.5,
        }}
      >
        <Typography
          component="span"
          sx={{
            fontFamily: "var(--font-mono), ui-monospace, monospace",
            fontSize: emphasis ? "0.95rem" : "0.85rem",
            fontWeight: emphasis ? 700 : 600,
            color: emphasis ? "text.primary" : "text.secondary",
          }}
        >
          {label}
        </Typography>
        <Typography
          component="span"
          sx={{
            fontVariantNumeric: "tabular-nums",
            fontWeight: 700,
            fontSize: emphasis ? "0.95rem" : "0.85rem",
            color: emphasis ? ACCENT : "text.primary",
          }}
        >
          {value.toFixed(2)}%
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        // Clamp the rendered bar to a visible minimum so tiny percentages
        // still register, while the label above shows the true value.
        value={Math.min(100, Math.max(value, 0.6))}
        sx={{
          height: emphasis ? 10 : 7,
          borderRadius: 5,
          bgcolor: "rgba(255,255,255,0.08)",
          "& .MuiLinearProgress-bar": {
            backgroundColor: ACCENT,
            borderRadius: 5,
          },
        }}
      />
      <Typography
        variant="caption"
        sx={{ color: "text.secondary", display: "block", mt: 0.5 }}
      >
        {bytes.toLocaleString()} / {totalBytes.toLocaleString()} bytes matched
      </Typography>
    </Box>
  );
}

/**
 * Live per-binary decompilation progress for meteor-decomp, parsed from the
 * machine-updated progress table in its README. Seeds from the baked snapshot
 * and refreshes from GitHub on mount. Renders nothing if the table is absent.
 */
export default function DecompProgress() {
  const baked = useMemo(() => {
    const c = getProjectContentOrEmpty(SLUG);
    return c.readmeByBranch.develop ?? c.readmeByBranch.master ?? "";
  }, []);
  const [readme, setReadme] = useState<string>(baked);

  useEffect(() => {
    let cancelled = false;
    fetchLiveReadme(SLUG, "develop").then((live) => {
      if (!cancelled && live) setReadme(live);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const { binaries, total } = useMemo(() => parseProgress(readme), [readme]);

  if (binaries.length === 0) return null;

  const sorted = [...binaries].sort((a, b) => b.totalBytes - a.totalBytes);
  const overall =
    total ??
    binaries.reduce<BinaryRow>(
      (acc, b) => ({
        name: "Total",
        files: acc.files + b.files,
        bytes: acc.bytes + b.bytes,
        totalBytes: acc.totalBytes + b.totalBytes,
      }),
      { name: "Total", files: 0, bytes: 0, totalBytes: 0 },
    );

  return (
    <Paper
      variant="outlined"
      sx={{
        p: { xs: 2.5, sm: 3 },
        borderColor: `${ACCENT}55`,
        backgroundImage: `linear-gradient(180deg, ${ACCENT}12, transparent 60%)`,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
        <MemoryIcon sx={{ color: ACCENT, fontSize: 22 }} />
        <Typography variant="h6" component="h2">
          Decompilation progress
        </Typography>
      </Box>
      <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
        Byte-identical recompilation coverage per client binary, live from the
        repository&apos;s README. Each bar is matched bytes ÷ total bytes.
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {sorted.map((b) => (
          <Bar
            key={b.name}
            label={b.name}
            bytes={b.bytes}
            totalBytes={b.totalBytes}
          />
        ))}
      </Box>

      <Divider sx={{ my: 2.5, borderColor: "divider" }} />
      <Bar
        label="Overall"
        bytes={overall.bytes}
        totalBytes={overall.totalBytes}
        emphasis
      />
      <Typography
        variant="caption"
        sx={{ color: "text.secondary", display: "block", mt: 1.5 }}
      >
        {overall.files.toLocaleString()} functions matched across{" "}
        {sorted.length} binaries.
      </Typography>
    </Paper>
  );
}
