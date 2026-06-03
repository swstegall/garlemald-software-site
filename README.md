# garlemald-software-site

The website for the **Garlemald** family of FINAL FANTASY XIV 1.0 (v1.23b)
preservation projects — a single place to read each project's docs, follow
idiot-proof quick-start guides, and download the latest releases.

Built with **Next.js 16 (App Router) + TypeScript + MUI v9**, statically
exported (`output: 'export'`) and deployed to **GitHub Pages**.

It documents five projects:

| Project | What it is |
|---|---|
| [Garlemald Server](https://github.com/swstegall/Garlemald-Server) | Rust FFXIV v1.23b server emulator (lobby / world / map) |
| [Garlemald Client](https://github.com/swstegall/Garlemald-Client) | Cross-platform Rust launcher for 1.23b private servers |
| [meteor-decomp](https://github.com/swstegall/meteor-decomp) | Clean-room decompilation of the 1.23b client binaries |
| [decomp-agents](https://github.com/swstegall/decomp-agents) | Parallel autonomous agents that drive the decompilation |
| [XIV 1.0 Apple Silicon Installer](https://github.com/swstegall/XIV-1.0-Apple-Silicon-Installer) | One-command FFXIV 1.0 install for Apple Silicon |

Community: **[Discord](https://discord.gg/CVjwWs6jnX)**

## How it works

Content is **baked at build time** and **live-refreshed in the browser**:

1. `src/data/registry.mjs` is the single source of truth — every project's
   repo, branches, curated docs, platforms, and release behaviour.
2. `scripts/fetch-content.mjs` (run by the `prebuild` npm hook) pulls each
   project's README (per branch), curated docs, and latest + recent GitHub
   releases into `src/data/generated/content.json`. It fails soft offline and
   honours `GITHUB_TOKEN` to avoid the anonymous API rate limit.
3. `next build` static-exports the site into `./out`, embedding that snapshot
   so every page renders instantly (even offline).
4. In the browser, pages re-fetch READMEs / docs / the latest release from
   GitHub and swap in anything newer — a graceful progressive enhancement.

```
registry.mjs ──► fetch-content.mjs ──► src/data/generated/content.json
                                              │
                                  baked import │   live re-fetch (client)
                                              ▼            │
                              Next.js static export (./out) ◄┘
```

## Develop

Requires Node 20+ (built and tested on Node 22+).

```sh
npm install
npm run fetch-content   # populate src/data/generated/content.json from GitHub
npm run dev             # http://localhost:3000
```

`npm run dev` does not run the fetcher automatically — run `fetch-content`
once (or any time you want fresh data). The production `build` runs it via the
`prebuild` hook.

## Build

```sh
npm run build           # prebuild fetches content, then static-exports to ./out
npx serve out           # preview the static output locally
```

Useful scripts:

| Script | Purpose |
|---|---|
| `npm run dev` | Dev server |
| `npm run fetch-content` | Refresh the baked content snapshot |
| `npm run build` | Fetch + static-export to `./out` |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |

## Deploy (GitHub Pages)

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every
push to `main`, on a **daily cron** (so the baked READMEs and release
downloads stay fresh), and on manual `workflow_dispatch`.

To enable it once: **Settings → Pages → Build and deployment → Source: GitHub
Actions**.

The site is served from the custom domain **www.garlemaldsoftware.com**, which
GitHub Pages serves at the **root** — so the build uses an **empty**
`NEXT_PUBLIC_BASE_PATH` and ships a `public/CNAME` to pin the domain. If you
ever drop the custom domain and serve from the bare
`https://<user>.github.io/garlemald-software-site/` project path instead, set
`NEXT_PUBLIC_BASE_PATH=/garlemald-software-site` in `.github/workflows/deploy.yml`
and remove `public/CNAME` (otherwise every asset and link 404s because the
sub-path prefix won't match the serving root).

> **Note:** Publishing GitHub Pages from a **private** repository requires a
> paid GitHub plan (Pro/Team/Enterprise). If this repo stays private on a free
> plan, either make it public, or deploy the `./out` folder to any static host
> (Netlify, Cloudflare Pages, S3, etc.) — the build is host-agnostic.

## Project layout

```
src/
├── app/                # App Router routes (server page.tsx → client *View)
│   ├── page.tsx                    # Home
│   ├── downloads/                  # Aggregated downloads
│   ├── start/                      # Quick-start hub
│   ├── about/                      # About / the bigger picture
│   └── projects/[slug]/            # Per-project page
│       └── docs/[doc]/             # Per-doc markdown viewer
├── components/         # Client UI (Markdown, ReleaseDownloads, cards, chrome…)
├── content/            # Authored quick-start guides
├── data/
│   ├── registry.mjs                # Single source of truth (plain ESM)
│   └── generated/content.json      # Baked content (regenerated each build)
└── lib/                # types, projects, github, platform, content, theme
scripts/fetch-content.mjs           # Build-time content fetcher
```

## License

The website code is © 2026 Samuel Stegall. Each documented project is licensed
under its own terms (AGPL-3.0-or-later for the server / client / meteor-decomp;
MIT for the installer) — see each project's repository.
