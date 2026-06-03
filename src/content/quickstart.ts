// Hand-authored, copy-pasteable quick-start guides for every documented
// project. Distilled from each repo's real README so the commands and
// prerequisites stay accurate. Consumed by QuickStartGuide.tsx and StartView.tsx.
//
// Guides are PLATFORM-SEGMENTED: each guide declares the operating systems it
// supports (`platforms`), and individual steps may be tagged with the
// platform(s) they apply to. The QuickStartGuide renderer shows a segmented
// control so the reader sees only the steps for their chosen OS. A step with no
// `platforms` is universal and shows for every OS.

import type { Platform } from "@/lib/types";

/** A single ordered step in a quick-start walkthrough. */
export interface QuickStartStep {
  /** Short imperative title, e.g. "Clone the repository". */
  title: string;
  /** Optional explanatory prose. May contain inline markdown. */
  body?: string;
  /** Optional copy-pasteable shell snippet for this step. */
  code?: string;
  /** Language hint for the code block (e.g. "sh", "bash", "powershell"). */
  lang?: string;
  /** If set, this step only applies to these platforms; omit = all. */
  platforms?: Platform[];
}

/** A complete quick-start guide for one project. */
export interface QuickStart {
  /** Matches the project slug. */
  slug: string;
  /** OSes the segmented control offers (the project's real OS support). */
  platforms: Platform[];
  /** One or two sentences framing what this guide gets you to. */
  intro: string;
  /** Short bullet strings — everything to have ready before step 1. */
  prerequisites: string[];
  /** The ordered walkthrough (filtered by the selected platform at render). */
  steps: QuickStartStep[];
  /** Optional per-OS caveats; the selected platform's note is surfaced. */
  platformNotes?: Partial<Record<Platform, string>>;
  /** Optional "where to go next" pointers (markdown; internal links allowed). */
  next?: string[];
}

export const QUICKSTARTS: Record<string, QuickStart> = {
  "garlemald-server": {
    slug: "garlemald-server",
    platforms: ["Windows", "macOS", "Linux"],
    intro:
      "Build and launch a private FINAL FANTASY XIV v1.23b server on your own machine. One script compiles the four-binary Cargo workspace, seeds a SQLite database, and boots the full lobby / world / map / web stack on localhost.",
    prerequisites: [
      "Git, to clone the repository.",
      "Rust 1.95 — `rustup` installs the pinned toolchain automatically on the first build (pinned in `rust-toolchain.toml`).",
      "A C toolchain for native crates: Xcode Command Line Tools (macOS), `build-essential` + `pkg-config` (Linux), or the MSVC C++ Build Tools (Windows).",
      "No external database: SQLite is embedded and seeded on first run — there is no MySQL/PHP/WAMP to provision.",
    ],
    steps: [
      {
        title: "Install Rust",
        body: "`rustup` pulls the exact pinned toolchain on the first build, so this is the only one-time setup.",
        code: "curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh",
        lang: "sh",
        platforms: ["macOS", "Linux"],
      },
      {
        title: "Install Rust",
        body: "Install Rust with `winget` (or download `rustup-init.exe` from rustup.rs). You also need the **MSVC C++ Build Tools** — the “Desktop development with C++” workload from the Visual Studio Build Tools.",
        code: "winget install Rustlang.Rustup",
        lang: "powershell",
        platforms: ["Windows"],
      },
      {
        title: "Clone the repository",
        code: "git clone https://github.com/swstegall/Garlemald-Server.git\ncd Garlemald-Server",
        lang: "sh",
      },
      {
        title: "Build and launch the whole stack",
        body: "`run-all.sh` builds every workspace member once, then starts all four services. Per-server logs land in `./logs/{lobby,world,map,web}.log`, and `Ctrl-C` propagates a clean shutdown to every child process.",
        code: "./scripts/run-all.sh",
        lang: "sh",
        platforms: ["macOS", "Linux"],
      },
      {
        title: "Build and launch the whole stack",
        body: "Every helper script has a `.cmd` equivalent in the `scripts/` directory.",
        code: "scripts\\run-all.cmd",
        lang: "powershell",
        platforms: ["Windows"],
      },
      {
        title: "Let the first run seed the database",
        body: "The first launch creates `./data/garlemald.db`, applies the bundled schema, seeds every reference table from the 40 bundled SQL files, and boots on localhost. This only happens once.",
      },
      {
        title: "Know where configuration lives",
        body: "Garlemald Server is configured with **TOML files**, not a `.env`. Each service reads its own file under `configs/` — `configs/lobby.toml`, `configs/world.toml`, `configs/map.toml`, and `configs/web.toml` — and all four share one SQLite database. The localhost defaults boot straight into a playable single-user server; override any path with `--config <path>` on the matching binary, and see the comments inside each `configs/*.toml` for the env knobs (packet logging, Lua script root, etc.).",
      },
      {
        title: "Connect a client and sign up",
        body: "Point **[Garlemald Client](/projects/garlemald-client/)** (or a patched 1.23b client reporting `2012.09.19.0001`) at the lobby on `127.0.0.1:54994`, then sign up through the web endpoint on `127.0.0.1:54993` to mint a playable session.",
      },
      {
        title: "Run individual services for debugging (optional)",
        body: "Each service can be started on its own when you're iterating on one.",
        code: "./scripts/run-web.sh     # HTTP signup/login on :54993\n./scripts/run-lobby.sh   # Lobby / character list on :54994\n./scripts/run-world.sh   # World handoff on :54992\n./scripts/run-map.sh     # Map / zone / AI on :1989",
        lang: "sh",
        platforms: ["macOS", "Linux"],
      },
      {
        title: "Run individual services for debugging (optional)",
        body: "Use the `.cmd` variants when iterating on a single service.",
        code: "scripts\\run-web.cmd\nscripts\\run-lobby.cmd\nscripts\\run-world.cmd\nscripts\\run-map.cmd",
        lang: "powershell",
        platforms: ["Windows"],
      },
    ],
    platformNotes: {
      Windows:
        "Use the `.cmd` variant of every `scripts/run-*` helper — the bash scripts are for macOS and Linux — and install the MSVC C++ Build Tools so the native crates link.",
      macOS:
        "Run `xcode-select --install` if the build complains about a missing linker or C compiler.",
      Linux:
        "Install your distro's `build-essential` / `base-devel` package and `pkg-config` so the native crates compile.",
    },
    next: [
      "Need a client? Set up [Garlemald Client](/projects/garlemald-client/) to patch and launch a 1.x install against this server.",
      "Grab a prebuilt server binary from the [Downloads page](/downloads/).",
      "Questions or bug reports? Join the [Discord](https://discord.gg/CVjwWs6jnX).",
    ],
  },

  "garlemald-client": {
    slug: "garlemald-client",
    platforms: ["Windows", "macOS", "Linux"],
    intro:
      "Build the cross-platform launcher that detects your installed FFXIV 1.x client, patches it forward to `2012.09.19.0001`, and launches the game against a private server. On macOS and Linux it manages its own Wine runtime, so there is nothing else to install.",
    prerequisites: [
      "Git and Rust 1.95.0 — `rustup` installs the pinned toolchain on the first build.",
      "An existing FINAL FANTASY XIV 1.x install (CrossOver bottle, Whisky prefix, or manual Wine install — all auto-detected). On Apple Silicon, the [XIV 1.0 Apple Silicon Installer](/projects/xiv1point0-apple-silicon-installer/) can produce one.",
      "Linux only: the GTK 3 + WebKit2GTK 4.1 runtime libraries for the login WebView.",
      "Windows only: the MSVC C++ **x86** build tools (the launcher must build 32-bit).",
    ],
    steps: [
      {
        title: "Install Rust",
        body: "`rustup` pulls the exact pinned toolchain on the first build.",
        code: "curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh",
        lang: "sh",
        platforms: ["macOS", "Linux"],
      },
      {
        title: "Install Rust",
        body: "Install Rust with `winget` (or `rustup-init.exe`), plus the **MSVC C++ build tools** — you specifically need the **x86 (32-bit)** target support.",
        code: "winget install Rustlang.Rustup",
        lang: "powershell",
        platforms: ["Windows"],
      },
      {
        title: "Clone the repository",
        code: "git clone https://github.com/swstegall/Garlemald-Client.git\ncd Garlemald-Client",
        lang: "sh",
      },
      {
        title: "Install the WebView libraries",
        body: "The embedded login flow needs GTK 3 and WebKit2GTK. Install them with your package manager (Debian/Ubuntu shown).",
        code: "sudo apt install libgtk-3-dev libwebkit2gtk-4.1-dev",
        lang: "sh",
        platforms: ["Linux"],
      },
      {
        title: "Build and run",
        body: "On macOS and Linux the launcher downloads and manages its own Wine runtime, so this is all you need.",
        code: "cargo build --release\ncargo run --release",
        lang: "bash",
        platforms: ["macOS", "Linux"],
      },
      {
        title: "Build and run (32-bit)",
        body: "On Windows the launcher must be built as 32-bit (`i686`) so it can read the suspended thread context of the 32-bit `ffxivgame.exe` and patch it at launch.",
        code: "rustup target add i686-pc-windows-msvc\ncargo build --release --target i686-pc-windows-msvc\ncargo run   --release --target i686-pc-windows-msvc",
        lang: "powershell",
        platforms: ["Windows"],
      },
      {
        title: "Package a distributable .app bundle (optional)",
        body: "For a distributable, ad-hoc-signed application bundle. Add `--universal` for a fat x86_64 + aarch64 binary.",
        code: "scripts/package-macos.sh               # host arch, ad-hoc signed\nscripts/package-macos.sh --universal   # x86_64 + aarch64 fat binary",
        lang: "bash",
        platforms: ["macOS"],
      },
      {
        title: "Launch, log in, and play",
        body: "On first run the launcher detects your 1.x install, CRC32-verifies and applies the patch chain (`2010.09.18.0000` → `2012.09.19.0001`), then shows the WebView login. The lobby hostname is injected into the PE at launch, so the same binary can target any private server.",
      },
    ],
    platformNotes: {
      macOS:
        "Nothing to install beyond the launcher — it provisions its own Wine runtime. Apple Silicon and Intel are both supported.",
      Linux:
        "Install `gtk3` + `webkit2gtk-4.1` first or the login WebView won't open; the Wine runtime is still self-managed.",
      Windows:
        "Build for the `i686-pc-windows-msvc` target — a 64-bit build cannot patch the 32-bit game process.",
    },
    next: [
      "Point the client at a [Garlemald Server](/projects/garlemald-server/) instance (default lobby `127.0.0.1:54994`).",
      "On Apple Silicon and don't have a 1.x install yet? Run the [XIV 1.0 Apple Silicon Installer](/projects/xiv1point0-apple-silicon-installer/) first.",
      "Grab a prebuilt launcher from the [Downloads page](/downloads/).",
    ],
  },

  "meteor-decomp": {
    slug: "meteor-decomp",
    platforms: ["macOS", "Linux"],
    intro:
      "Stand up the decompilation pipeline for the FFXIV 1.23b client binaries. The static-analysis track runs under Ghidra and emits per-function assembly, a work pool, and validated wire-protocol reports; the optional matching track recompiles individual functions byte-identically. The toolchain targets macOS and Linux.",
    prerequisites: [
      "Git, Python 3, and `make`.",
      "Ghidra 12 + JDK 21 for the static-analysis track.",
      "Your own copy of the Square Enix 1.23b binaries — they are copyright SE and are NEVER committed to this repo. `make bootstrap` symlinks them from your local install.",
      "Optional byte-matching track: the VS 2005 RTM + Platform SDK 2003 R2 toolchain running under CrossOver Wine.",
    ],
    steps: [
      {
        title: "Clone the repository",
        code: "git clone https://github.com/swstegall/meteor-decomp.git\ncd meteor-decomp",
        lang: "sh",
      },
      {
        title: "Install Ghidra 12 + JDK 21",
        body: "Homebrew pulls `openjdk@21` along with Ghidra.",
        code: "brew install ghidra",
        lang: "sh",
        platforms: ["macOS"],
      },
      {
        title: "Install Ghidra 12 + JDK 21",
        body: "Install a JDK 21, then download Ghidra 12 from the official NSA release page, unzip it, and confirm `ghidraRun` launches.",
        code: "sudo apt install openjdk-21-jdk\n# Download Ghidra 12 from:\n#   https://github.com/NationalSecurityAgency/ghidra/releases\n# then: unzip ghidra_*.zip && ./ghidra_*/ghidraRun",
        lang: "sh",
        platforms: ["Linux"],
      },
      {
        title: "Bootstrap",
        body: "Symlinks the original binaries from your local install (it does **not** copy them) and dumps the PE structure as a sanity check.",
        code: "make bootstrap",
        lang: "sh",
      },
      {
        title: "Run the static-analysis split",
        body: "Requires Ghidra 12 + JDK 21. Start with a small binary to confirm the toolchain, then run the big one. `ffxivlogin.exe` takes ~30s; `ffxivgame.exe` takes 30–60 min on Apple Silicon.",
        code: "make split BINARY=ffxivlogin.exe   # ~30s — sanity check\nmake split BINARY=ffxivgame.exe    # 30–60 min",
        lang: "sh",
      },
      {
        title: "Inspect the work pool",
        body: "After a split you get per-function asm under `asm/<binary>/`, a `config/<binary>.symbols.json` function list, recovered RTTI, and the `config/<binary>.yaml` work pool (one row per function).",
        code: "make progress",
        lang: "sh",
      },
      {
        title: "Run the Phase 3 extraction / validation pipeline",
        body: "These targets emit the ground-truth wire reports under `build/wire/` and the validated headers under `include/net/` that pin field offsets against the binary.",
        code: "make extract-net          # net-class vtable → fn_rva map\nmake extract-gam          # GAM property registry\nmake extract-paramnames   # PARAMNAME dispatchers (192/192)\nmake extract-opcodes      # Down opcode → vtable-slot\nmake validate-murmur2     # MurmurHash2 vectors",
        lang: "sh",
      },
      {
        title: "Configure the matching toolchain via its env file (optional)",
        body: "Only needed for the byte-identical recompilation track. The build reads a small **env file** at `~/.config/meteor-decomp.env` that points it at your MSVC-2005-under-Wine install via `MSVC_TOOLCHAIN_DIR`. Set it once, then verify `cl.exe` + PSDK + objdiff are reachable.",
        code: "echo 'export MSVC_TOOLCHAIN_DIR=\"$HOME/sdk/msvc-2005\"' \\\n    > ~/.config/meteor-decomp.env\nmake setup-msvc",
        lang: "sh",
      },
      {
        title: "Attempt a byte-identical match (optional)",
        body: "Compiles the `_rosetta/*.cpp` sources and diffs each against the binary slice. `make diff FUNC=...` grades a single function OK / PARTIAL / MISMATCH.",
        code: "make rosetta        # compile + diff all _rosetta/*.cpp\nmake diff FUNC=...  # grade one function",
        lang: "sh",
      },
    ],
    platformNotes: {
      macOS:
        "`brew install ghidra` brings JDK 21 with it. The MSVC matching toolchain runs under CrossOver Wine 9.",
      Linux:
        "Install Ghidra 12 and a JDK 21; the matching toolchain runs under Wine with the VS 2005 + PSDK install scripts.",
    },
    next: [
      "Read the [Plan, scope & roadmap](/projects/meteor-decomp/docs/plan/) and the [matching workflow](/projects/meteor-decomp/docs/docs-matching-workflow/) before attempting a match.",
      "Want to grind functions automatically? Pair this with [decomp-agents](/projects/decomp-agents/).",
      "The original `.exe` files belong only in your local install — never `git add` them.",
    ],
  },

  "decomp-agents": {
    slug: "decomp-agents",
    platforms: ["macOS", "Linux"],
    intro:
      "Spawn 1–8 parallel Claude agents that grind through meteor-decomp's per-function matching loop. Each worker runs in its own git worktree, claims functions from a shared SQLite queue, and merges completed branches back automatically.",
    prerequisites: [
      "Python ≥ 3.11 (with `uv` or plain `pip`).",
      "A working [meteor-decomp](/projects/meteor-decomp/) checkout at `../meteor-decomp/` that has already run `make split BINARY=<X>.exe` for your target binary.",
      "The meteor-decomp build toolchain (Wine + MSVC 2005) working, so `make diff` can grade matches.",
      "Claude authentication: either a Pro/Max subscription via the Claude Code CLI, or a metered `ANTHROPIC_API_KEY`.",
    ],
    steps: [
      {
        title: "Clone and install",
        body: "Uses `uv` or plain `pip` — either works. The `cp .env.example .env` gives you the config file the orchestrator reads on startup.",
        code: "cd server-workspace/decomp-agents\nuv venv && source .venv/bin/activate\nuv pip install -e .          # or:  pip install -e .\ncp .env.example .env",
        lang: "sh",
      },
      {
        title: "Configure your .env",
        body: "The orchestrator is driven entirely by environment variables read from `.env`. Open the file you just copied and set the handful that matter most — the full table is in the project [Overview](/projects/decomp-agents/).",
        code: "# Auth path: \"subscription\" (Claude CLI OAuth) or \"api_key\" (metered)\nDECOMP_AUTH_MODE=subscription\n# ANTHROPIC_API_KEY=sk-ant-...   # only when DECOMP_AUTH_MODE=api_key\nDECOMP_AGENT_WORKERS=5           # parallel workers, 1–8\nDECOMP_REPO=../meteor-decomp     # path to your meteor-decomp checkout\nDECOMP_BINARY=ffxivgame          # which binary to grind",
        lang: "sh",
      },
      {
        title: "Authenticate Claude — subscription (no per-token billing)",
        body: "One-time OAuth via the Claude Code CLI. Credentials land in the macOS Keychain and every worker subprocess picks them up automatically.",
        code: "claude              # opens browser; sign in once\nclaude /status      # confirm \"Logged in via subscription\"\nunset ANTHROPIC_API_KEY    # make sure no key shadows OAuth",
        lang: "sh",
      },
      {
        title: "…or authenticate with a metered API key",
        body: "Pay-as-you-go alternative — roughly $0.10–0.50 per attempted function. Get a key from the Anthropic console, set `DECOMP_AUTH_MODE=api_key`, then:",
        code: "echo \"ANTHROPIC_API_KEY=sk-ant-...\" >> .env",
        lang: "sh",
      },
      {
        title: "Prime meteor-decomp for the agents (recommended)",
        body: "Run this **inside your meteor-decomp checkout** to dump Ghidra's pseudo-C so workers get a structural hint per function. Without it they work from raw asm only and the match rate drops.",
        code: "make decompile-headless BINARY=<X>.exe",
        lang: "sh",
      },
      {
        title: "Dry-run to provision worktrees and the queue",
        body: "Sets up the per-agent worktrees and the SQLite claim database without spawning any agents.",
        code: "python orchestrator.py --dry-run",
        lang: "sh",
      },
      {
        title: "Run the orchestrator for real",
        body: "Spawns the workers using the settings from your `.env`.",
        code: "python orchestrator.py\n# or via the installed console script:\ndecomp-agents",
        lang: "sh",
      },
      {
        title: "Inspect what happened",
        body: "The coordination SQLite DB records every claim, outcome, and merge.",
        code: "sqlite3 output/coordination.sqlite \"\n  SELECT outcome, COUNT(*) FROM claims\n  WHERE released_at IS NOT NULL\n  GROUP BY outcome;\"",
        lang: "sh",
      },
    ],
    platformNotes: {
      macOS:
        "Subscription OAuth credentials are stored in the macOS Keychain and inherited by every worker subprocess.",
      Linux:
        "Same flow as macOS; ensure the meteor-decomp Wine + MSVC 2005 toolchain is reachable so `make diff` can grade.",
    },
    next: [
      "This tool drives [meteor-decomp](/projects/meteor-decomp/) — set that up first and confirm `make split` ran.",
      "`Ctrl-C` cleanly stops every worker and flushes a final merge pass.",
      "Read the full [Overview](/projects/decomp-agents/) for distributed (fork + GitHub claim) mode and every `DECOMP_*` env var.",
    ],
  },

  "xiv1point0-apple-silicon-installer": {
    slug: "xiv1point0-apple-silicon-installer",
    platforms: ["macOS"],
    intro:
      "Bring the original FINAL FANTASY XIV 1.0 up on an Apple Silicon Mac with a single command. Given your retail install disc or ISO, `install.sh` provisions a self-contained Wine runtime and drives the stock installer through to a playable `ffxivboot.exe`.",
    prerequisites: [
      "An Apple Silicon Mac running macOS.",
      "Your own FINAL FANTASY XIV 1.0 install disc, or its ISO mounted under `/Volumes/`, with `ffxivsetup.exe` at the root. The client is NOT redistributed — you must supply it.",
      "Rosetta 2 — installed automatically by the script if missing (the bundled Wine engine is x86_64).",
      "Internet access on the first run, for the wrapper template and Wine engine downloads.",
    ],
    steps: [
      {
        title: "Clone the repository",
        code: "git clone https://github.com/swstegall/XIV-1.0-Apple-Silicon-Installer.git\ncd XIV-1.0-Apple-Silicon-Installer",
        lang: "sh",
      },
      {
        title: "Mount your 1.0 disc or ISO",
        body: "Double-click the 1.0 `.iso` in Finder (or insert the disc). The script scans `/Volumes/*/` for `ffxivsetup.exe`, so there are no path arguments to pass.",
      },
      {
        title: "Run the installer",
        body: "The script runs unattended — downloading the Sikarugir Frameworks and CrossOver Wine engine into `target/runtime/`, staging the disc into `target/iso/disc1/`, and provisioning the Wine prefix — until the InstallShield GUI appears.",
        code: "./install.sh",
        lang: "sh",
      },
      {
        title: "Click through the InstallShield GUI",
        body: "When the graphical installer appears, accept all defaults. In particular **leave the install path at** `C:\\Program Files (x86)\\SquareEnix\\FINAL FANTASY XIV` so the verification step can find the expected file layout. Re-running `install.sh` skips any step whose output already exists, so a failed run resumes cleanly.",
      },
      {
        title: "Wait for \"Install verified.\"",
        body: "The script confirms `ffxivboot.exe`, `ffxivupdater.exe`, `ffxivconfig.exe`, and the expected `data/` / `client/` archive layout before declaring success.",
      },
      {
        title: "Launch the game",
        body: "The install ships an env file, `wine-env.sh`, that you `source` to activate the local Wine — it exports `WINEPREFIX`, `WINE`, `WINESERVER`, and the library paths the bundled engine expects. Source it from any shell, then run the boot binary.",
        code: "cd target\nsource ./wine-env.sh\n\"$WINE\" \"$WINEPREFIX/drive_c/Program Files (x86)/SquareEnix/FINAL FANTASY XIV/ffxivboot.exe\"",
        lang: "sh",
      },
    ],
    platformNotes: {
      macOS:
        "Everything installs under `./target/` next to the script — no Homebrew, no `/usr/local`, no admin rights. Deleting the repository removes the install.",
    },
    next: [
      "Install done? Drive it against a private server with [Garlemald Client](/projects/garlemald-client/), which auto-detects this install.",
      "Stuck? The project [Overview](/projects/xiv1point0-apple-silicon-installer/) has a troubleshooting table for the common disc-discovery and Rosetta errors.",
      "Questions? Join the [Discord](https://discord.gg/CVjwWs6jnX).",
    ],
  },
};

/** Look up a project's quick-start guide by slug. */
export function getQuickStart(slug: string): QuickStart | undefined {
  return QUICKSTARTS[slug];
}
