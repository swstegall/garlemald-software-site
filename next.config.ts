import type { NextConfig } from "next";

// GitHub Pages project sites are served from a sub-path
// (https://<user>.github.io/<repo>/), so the build sets NEXT_PUBLIC_BASE_PATH
// to "/<repo>". Local dev leaves it empty for a clean root.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  // Emit a fully static site into ./out — deployable to GitHub Pages or any
  // static host. No Node server at runtime.
  output: "export",

  // Static export cannot use the default image optimizer.
  images: { unoptimized: true },

  // Emit /route/index.html so the static host serves clean directory URLs.
  trailingSlash: true,

  ...(basePath ? { basePath, assetPrefix: basePath } : {}),

  // Keep type-checking ON — type errors should fail the build.
  // (Next 16 decoupled ESLint from `next build`; lint runs as a separate CI step.)
  typescript: { ignoreBuildErrors: false },
};

export default nextConfig;
