import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Box from "@mui/material/Box";
import "./globals.css";
import "highlight.js/styles/github-dark.css";
import ThemeRegistry from "@/components/ThemeRegistry";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { withBase } from "@/lib/projects";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://swstegall.github.io/garlemald-software-site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Garlemald Software — FFXIV 1.0 preservation toolkit",
    template: "%s · Garlemald Software",
  },
  description:
    "A Rust FFXIV v1.23b (1.0) server and launcher, a clean-room client decompilation, the agents that drive it, and a one-command Apple Silicon installer. Docs, quick-start guides, and downloads.",
  applicationName: "Garlemald Software",
  openGraph: {
    type: "website",
    siteName: "Garlemald Software",
    title: "Garlemald Software — FFXIV 1.0 preservation toolkit",
    description:
      "A Rust FFXIV v1.23b (1.0) server and launcher, a clean-room client decompilation, the agents that drive it, and a one-command Apple Silicon installer.",
    images: [{ url: withBase("/brand/og.png"), width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Garlemald Software — FFXIV 1.0 preservation toolkit",
    description:
      "Rust FFXIV 1.0 server + launcher, a client decompilation, agent tooling, and an Apple Silicon installer.",
    images: [withBase("/brand/og.png")],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <ThemeRegistry>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100dvh",
            }}
          >
            <Header />
            <Box component="main" sx={{ flex: 1 }}>
              {children}
            </Box>
            <Footer />
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
