"use client";

import { useEffect, useState } from "react";
import type { Platform } from "./types";

export interface DetectedPlatform {
  os: Platform | null;
  isAppleSilicon: boolean;
  /** True once detection has run client-side (avoids SSR hydration mismatch). */
  ready: boolean;
}

function detect(): { os: Platform | null; isAppleSilicon: boolean } {
  if (typeof navigator === "undefined") return { os: null, isAppleSilicon: false };
  const ua = navigator.userAgent || "";
  const plat = (navigator.platform || "").toLowerCase();
  const uaLower = ua.toLowerCase();

  let os: Platform | null = null;
  if (plat.includes("mac") || uaLower.includes("mac os")) os = "macOS";
  else if (plat.includes("win") || uaLower.includes("windows")) os = "Windows";
  else if (plat.includes("linux") || uaLower.includes("linux")) os = "Linux";

  // Best-effort Apple Silicon detection. Not exposed by the UA directly; we
  // treat all modern Macs as likely Apple Silicon but never block on it.
  let isAppleSilicon = false;
  if (os === "macOS") {
    isAppleSilicon = !uaLower.includes("intel mac");
  }
  return { os, isAppleSilicon };
}

/** Detect the visitor's OS on the client (null during SSR / first paint). */
export function usePlatform(): DetectedPlatform {
  const [state, setState] = useState<DetectedPlatform>({
    os: null,
    isAppleSilicon: false,
    ready: false,
  });
  useEffect(() => {
    const d = detect();
    setState({ ...d, ready: true });
  }, []);
  return state;
}

export const ALL_PLATFORMS: Platform[] = ["macOS", "Linux", "Windows"];
