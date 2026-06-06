import type { Metadata } from "next";

import ResourcesView from "@/components/ResourcesView";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "FFXIV 1.0 (v1.23b) reference material — game data, the wire protocol, the actor system, and more — ported from the FFXIV Classic wiki and hosted here for preservation.",
};

export default function Page() {
  return <ResourcesView />;
}
