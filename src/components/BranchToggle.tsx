"use client";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Chip from "@mui/material/Chip";

export interface BranchToggleProps {
  branches: string[];
  value: string;
  onChange: (branch: string) => void;
  size?: "small" | "medium";
}

/**
 * Exclusive toggle group for picking which branch's README to show. With a
 * single branch there is nothing to toggle, so we render a static chip; with
 * none, nothing at all.
 */
export default function BranchToggle({
  branches,
  value,
  onChange,
  size = "small",
}: BranchToggleProps) {
  if (branches.length === 0) return null;

  if (branches.length === 1) {
    return (
      <Chip
        label={branches[0]}
        size={size}
        variant="outlined"
        sx={{ fontFamily: "var(--font-mono)" }}
      />
    );
  }

  return (
    <ToggleButtonGroup
      exclusive
      size={size}
      value={value}
      onChange={(_event, next: string | null) => {
        // ToggleButtonGroup hands us null when the active button is re-clicked.
        if (next !== null) onChange(next);
      }}
      aria-label="README branch"
    >
      {branches.map((branch) => (
        <ToggleButton
          key={branch}
          value={branch}
          aria-label={`Show ${branch} branch`}
          sx={{ fontFamily: "var(--font-mono)", textTransform: "none", px: 2 }}
        >
          {branch}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
