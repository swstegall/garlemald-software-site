import type { Metadata } from "next";
import AboutView from "@/components/AboutView";

export const metadata: Metadata = {
  title: "About",
  description:
    "What FINAL FANTASY XIV 1.0 / v1.23b was, how Project Meteor preservation keeps it alive, and how these five open-source projects fit together as a toolkit to run, launch, install, and decompile it.",
};

export default function Page() {
  return <AboutView />;
}
