import type { Metadata } from "next";
import StartView from "@/components/StartView";

export const metadata: Metadata = {
  title: "Quick Start",
  description:
    "Foolproof, copy-pasteable quick-start guides for every project in the workspace — server, client, installer, decompilation, and the agent orchestrator.",
};

export default function Page() {
  return <StartView />;
}
