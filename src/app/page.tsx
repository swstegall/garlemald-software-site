import type { Metadata } from "next";
import HomeView from "@/components/HomeView";

export const metadata: Metadata = {
  title: "Bring FFXIV 1.0 back to life",
  description:
    "An open-source family of tools to run, launch, decompile, and install the original 2010 FINAL FANTASY XIV (v1.23b, not A Realm Reborn): a Rust server emulator and launcher, a clean-room client decompilation, the agents that drive it, and a one-command Apple Silicon installer.",
};

export default function Page() {
  return <HomeView />;
}
