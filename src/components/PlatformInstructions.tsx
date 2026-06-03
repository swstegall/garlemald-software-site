"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode, SyntheticEvent } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AppleIcon from "@mui/icons-material/Apple";
import MicrosoftIcon from "@mui/icons-material/Microsoft";
import TerminalIcon from "@mui/icons-material/Terminal";
import DevicesIcon from "@mui/icons-material/Devices";
import { usePlatform } from "@/lib/platform";
import type { Platform } from "@/lib/types";

export interface PlatformInstructionsItem {
  platform: Platform | "All";
  label?: string;
  children: ReactNode;
}

interface PlatformInstructionsProps {
  items: PlatformInstructionsItem[];
  defaultPlatform?: Platform;
}

function iconFor(platform: Platform | "All") {
  switch (platform) {
    case "macOS":
      return <AppleIcon fontSize="small" />;
    case "Windows":
      return <MicrosoftIcon fontSize="small" />;
    case "Linux":
      return <TerminalIcon fontSize="small" />;
    default:
      return <DevicesIcon fontSize="small" />;
  }
}

/**
 * Tabbed per-platform instructions. Auto-selects the visitor's detected OS
 * when an item targets it, otherwise falls back to `defaultPlatform`, then the
 * first item.
 */
export default function PlatformInstructions({
  items,
  defaultPlatform,
}: PlatformInstructionsProps) {
  const { os, ready } = usePlatform();

  const initialIndex = useMemo(() => {
    if (defaultPlatform) {
      const i = items.findIndex((it) => it.platform === defaultPlatform);
      if (i >= 0) return i;
    }
    return 0;
  }, [items, defaultPlatform]);

  const [index, setIndex] = useState<number>(initialIndex);
  // Tracks whether the user has manually picked a tab; once they have, we stop
  // overriding their choice with the auto-detected OS.
  const [userPicked, setUserPicked] = useState<boolean>(false);

  useEffect(() => {
    if (!ready || userPicked || !os) return;
    const i = items.findIndex((it) => it.platform === os);
    if (i >= 0) setIndex(i);
  }, [ready, os, items, userPicked]);

  if (items.length === 0) return null;

  const safeIndex = index < items.length ? index : 0;

  const handleChange = (_event: SyntheticEvent, value: number) => {
    setUserPicked(true);
    setIndex(value);
  };

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={safeIndex}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          aria-label="Platform-specific instructions"
        >
          {items.map((item, i) => (
            <Tab
              key={`${item.platform}-${i}`}
              icon={iconFor(item.platform)}
              iconPosition="start"
              label={item.label ?? item.platform}
              id={`platform-tab-${i}`}
              aria-controls={`platform-tabpanel-${i}`}
              sx={{ minHeight: 48 }}
            />
          ))}
        </Tabs>
      </Box>

      {items.map((item, i) => (
        <Box
          key={`panel-${item.platform}-${i}`}
          role="tabpanel"
          hidden={safeIndex !== i}
          id={`platform-tabpanel-${i}`}
          aria-labelledby={`platform-tab-${i}`}
          sx={{ pt: 2.5 }}
        >
          {safeIndex === i ? item.children : null}
        </Box>
      ))}
    </Box>
  );
}
