import type { Metadata } from "next";
import DownloadsView from "@/components/DownloadsView";

export const metadata: Metadata = {
  title: "Downloads",
  description:
    "Prebuilt binaries and source for the Garlemald FFXIV 1.0 toolkit — server, launcher, decompilation, agents, and the Apple Silicon installer. Each download points to the latest GitHub release with per-platform builds and sha256 checksums.",
};

export default function Page() {
  return <DownloadsView />;
}
