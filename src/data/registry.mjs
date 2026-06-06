// Canonical registry of every project the site documents.
//
// This file is plain ESM (no TypeScript) on purpose: it is the single source
// of truth consumed BOTH by the build-time content fetcher
// (`scripts/fetch-content.mjs`, run by Node) AND by the typed application layer
// (`src/lib/projects.ts`, which re-exports it with the `Project` type applied).
// Keeping it as `.mjs` avoids any TS-loader requirement on the CI Node runtime.

export const GITHUB_USER = "swstegall";
export const DISCORD_URL = "https://discord.gg/CVjwWs6jnX";
export const SITE_REPO = "garlemald-software-site";

/**
 * A curated documentation file to fetch from a repo. `path` is relative to the
 * repo root; if a file 404s at fetch time it is silently skipped, so listing an
 * optional doc here is safe.
 */

export const PROJECTS = [
  {
    slug: "garlemald-server",
    name: "Garlemald Server",
    owner: GITHUB_USER,
    repo: "Garlemald-Server",
    tagline: "FFXIV 1.23b server emulator, rebuilt from scratch in Rust.",
    summary:
      "A private-server emulator for FINAL FANTASY XIV v1.23b — the final patch of the original 2010 1.0 release, not A Realm Reborn. A from-scratch Rust port of the C# Project Meteor Server: lobby, world, map, and web services in a single Cargo workspace, backed by SQLite and driving 1,142 upstream Lua content scripts.",
    category: "Server",
    language: "Rust",
    license: "AGPL-3.0-or-later",
    accent: "#3FB950",
    icon: "dns",
    defaultBranch: "develop",
    branches: ["develop", "main"],
    platforms: ["macOS", "Linux", "Windows"],
    hasReleases: true,
    topics: [
      "ffxiv",
      "ffxiv-1-0",
      "final-fantasy-xiv",
      "game-server",
      "rust",
      "private-server",
      "sqlite",
      "tokio",
      "lua",
      "project-meteor",
    ],
    docs: [
      { path: "README.md", title: "Overview" },
      // Contributor onboarding set (Garlemald-Server issue #30). The `group`
      // gathers these into a "Contributing" section on the project's Docs tab;
      // give another project's docs the same group to add the same section there.
      { path: "CONTRIBUTING.md", title: "Contributing guide", group: "Contributing" },
      { path: "docs/architecture.md", title: "Architecture", group: "Contributing" },
      { path: "docs/lua-runtime.md", title: "Lua runtime", group: "Contributing" },
      { path: "docs/dev-environment.md", title: "Developer environment", group: "Contributing" },
      { path: "docs/agents.md", title: "Working an issue with an AI agent", group: "Contributing" },
      { path: "CLAUDE.md", title: "Agent guide (Claude)", group: "Contributing" },
      { path: "AGENTS.md", title: "Agent guide (OpenAI Codex)", group: "Contributing" },
      { path: "docs/RELEASING.md", title: "Releasing", group: "Contributing" },
      { path: "docs/post_warp_respawn_fix_analysis.md", title: "Post-warp respawn fix analysis" },
      { path: "NOTICE.md", title: "Attribution (NOTICE)" },
      { path: "LICENSE.md", title: "License" },
    ],
  },
  {
    slug: "garlemald-client",
    name: "Garlemald Client",
    owner: GITHUB_USER,
    repo: "Garlemald-Client",
    tagline: "Cross-platform Rust launcher for FFXIV 1.23b private servers.",
    summary:
      "A cross-platform launcher for FINAL FANTASY XIV v1.23b. It detects an installed 1.x client, patches it forward to 2012.09.19.0001, runs the login handshake against a private server, and launches the game — on macOS (including Apple Silicon), Linux, and Windows. On macOS and Linux it downloads and manages its own Wine runtime, so there is nothing to install beyond the launcher itself.",
    category: "Client",
    language: "Rust",
    license: "AGPL-3.0-or-later",
    accent: "#1CC8B6",
    icon: "rocket_launch",
    defaultBranch: "develop",
    branches: ["develop", "main"],
    platforms: ["macOS", "Linux", "Windows"],
    hasReleases: true,
    topics: [
      "apple-silicon",
      "cross-platform",
      "ffxiv",
      "final-fantasy-xiv",
      "launcher",
      "rust",
      "wine",
      "zipatch",
    ],
    docs: [
      { path: "README.md", title: "Overview" },
      // Contributor onboarding set (Garlemald-Client issue #24). The `group`
      // gathers these into a "Contributing" section on the project's Docs tab;
      // give another project's docs the same group to add the same section there.
      { path: "CONTRIBUTING.md", title: "Contributing guide", group: "Contributing" },
      { path: "docs/architecture.md", title: "Architecture", group: "Contributing" },
      { path: "docs/dev-environment.md", title: "Developer environment", group: "Contributing" },
      { path: "docs/agents.md", title: "Working an issue with an AI agent", group: "Contributing" },
      { path: "CLAUDE.md", title: "Agent guide (Claude)", group: "Contributing" },
      { path: "AGENTS.md", title: "Agent guide (OpenAI Codex)", group: "Contributing" },
      { path: "docs/RELEASING.md", title: "Releasing", group: "Contributing" },
      { path: "ws2_32-proxy/README.md", title: "ws2_32 proxy" },
      { path: "NOTICE.md", title: "Attribution (NOTICE)" },
      { path: "LICENSE.md", title: "License" },
    ],
  },
  {
    slug: "meteor-decomp",
    name: "meteor-decomp",
    owner: GITHUB_USER,
    repo: "meteor-decomp",
    tagline: "Clean-room decompilation of the FFXIV 1.23b client binaries.",
    summary:
      "A clean-room decompilation of the FINAL FANTASY XIV 1.23b Windows client binaries (ffxivgame / boot / login / updater / config). A hybrid effort: a byte-identical recompilation track under Ghidra + a VS2005 + Platform SDK toolchain, plus a functional/wire reverse-engineering track that has already produced enough ground truth to validate the Rust server byte-for-byte in several subsystems.",
    category: "Research",
    language: "C++ / Python",
    license: "AGPL-3.0-or-later",
    accent: "#A371F7",
    icon: "memory",
    defaultBranch: "develop",
    branches: ["develop", "master"],
    platforms: ["macOS", "Linux"],
    hasReleases: true,
    releasesAreSourceOnly: true,
    topics: ["ffxiv", "decompilation", "ghidra", "reverse-engineering", "reverse-engineering"],
    docs: [
      { path: "README.md", title: "Overview" },
      { path: "PLAN.md", title: "Plan, scope & roadmap" },
      { path: "CONTRIBUTING.md", title: "Contributing" },
      { path: "docs/matching-workflow.md", title: "Matching workflow" },
      { path: "docs/msvc-setup.md", title: "MSVC 2005 setup" },
      { path: "docs/fid_signature_matching.md", title: "FID signature matching" },
      { path: "docs/decomp-status.md", title: "Decomp status" },
      { path: "docs/wire-protocol.md", title: "Wire protocol" },
      { path: "AGENTS.md", title: "Agent discipline rules" },
      { path: "NOTICE.md", title: "Attribution (NOTICE)" },
      { path: "LICENSE.md", title: "License" },
    ],
  },
  {
    slug: "decomp-agents",
    name: "decomp-agents",
    owner: GITHUB_USER,
    repo: "decomp-agents",
    tagline: "Parallel autonomous Claude agents that grind the decomp.",
    summary:
      "Parallel autonomous Claude agents that grind through meteor-decomp's per-function matching workflow. It spawns 1–8 worker subprocesses, each pinned to its own git worktree, claims functions from a shared SQLite queue, and merges completed branches back with auto-resolution for trivial conflicts. A distributed, GitHub-native mode coordinates many contributors through a fork + claim system.",
    category: "Tooling",
    language: "Python",
    license: "AGPL-3.0-or-later",
    accent: "#E3B341",
    icon: "smart_toy",
    defaultBranch: "main",
    branches: ["main"],
    platforms: ["macOS", "Linux"],
    hasReleases: false,
    topics: ["claude", "agents", "automation", "decompilation", "orchestration"],
    docs: [
      { path: "README.md", title: "Overview" },
      { path: "prompts/worker_system.md", title: "Worker system prompt" },
      { path: "prompts/merge_resolver_system.md", title: "Merge-resolver prompt" },
    ],
  },
  {
    slug: "xiv1point0-apple-silicon-installer",
    name: "XIV 1.0 Apple Silicon Installer",
    owner: GITHUB_USER,
    repo: "XIV-1.0-Apple-Silicon-Installer",
    tagline: "One-command FFXIV 1.0 install for Apple Silicon Macs.",
    summary:
      "A single-command installer that brings the original FINAL FANTASY XIV 1.0 (the 2010 release, not A Realm Reborn) up on an Apple Silicon Mac. Given the retail install disc or its ISO, install.sh downloads the Sikarugir wrapper Frameworks and a CrossOver-built Wine engine, provisions a dedicated Wine prefix, and drives the stock installer through to a playable ffxivboot.exe — no Homebrew, no admin rights.",
    category: "Installer",
    language: "Shell",
    license: "MIT",
    accent: "#58A6FF",
    icon: "terminal",
    defaultBranch: "master",
    branches: ["master"],
    platforms: ["macOS"],
    appleSiliconOnly: true,
    hasReleases: false,
    topics: ["ffxiv", "apple-silicon", "macos", "wine", "installer"],
    docs: [
      { path: "README.md", title: "Overview" },
      { path: "LICENSE.md", title: "License" },
    ],
  },
];

export const PROJECTS_BY_SLUG = Object.fromEntries(PROJECTS.map((p) => [p.slug, p]));
