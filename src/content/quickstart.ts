// Hand-authored, copy-pasteable quick-start guides for every documented
// project. Distilled from each repo's real README so the commands and
// prerequisites stay accurate. Consumed by QuickStartGuide.tsx and StartView.tsx.

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
  /** If set, this step only applies to these platforms (shown as chips). */
  platforms?: Platform[];
}

/** A complete quick-start guide for one project. */
export interface QuickStart {
  /** Matches the project slug. */
  slug: string;
  /** One or two sentences framing what this guide gets you to. */
  intro: string;
  /** Short bullet strings — everything to have ready before step 1. */
  prerequisites: string[];
  /** The ordered walkthrough. */
  steps: QuickStartStep[];
  /** Optional per-OS caveats rendered as a small notes section. */
  platformNotes?: Partial<Record<Platform, string>>;
  /** Optional "where to go next" pointers (plain text, may contain markdown links). */
  next?: string[];
}

export const QUICKSTARTS: Record<string, QuickStart> = {
  "garlemald-server": {
    slug: "garlemald-server",
    intro:
      "Build and launch a private FINAL FANTASY XIV v1.23b server on your own machine. One script compiles the four-binary Cargo workspace, seeds a SQLite database, and boots the full lobby / world / map / web stack on localhost.",
    prerequisites: [
      "Rust 1.95 — installed automatically by `rustup` on the first build (the version is pinned in `rust-toolchain.toml`).",
      "Git, to clone the repository.",
      "A C toolchain (Xcode Command Line Tools on macOS, `build-essential` on Linux, MSVC build tools on Windows) for native dependencies.",
      "No external database: SQLite is embedded and seeded on first run — there is no MySQL/PHP/WAMP to provision.",
    ],
    steps: [
      {
        title: "Install Rust (if you don't have it)",
        body: "`rustup` will pull the exact pinned toolchain on first build, so this is the only one-time setup.",
        code: "curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh",
        lang: "sh",
        platforms: ["macOS", "Linux"],
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
        title: "On Windows, use the .cmd launcher",
        body: "Every helper script has a `.cmd` equivalent in the same directory.",
        code: "scripts\\run-all.cmd",
        lang: "powershell",
        platforms: ["Windows"],
      },
      {
        title: "Let the first run seed the database",
        body: "The first launch creates `./data/garlemald.db`, applies the bundled schema, seeds every reference table from the 40 bundled SQL files, and boots on localhost. This only happens once.",
      },
      {
        title: "Connect a client and sign up",
        body: "Point **Garlemald Client** (or a patched 1.23b client reporting `2012.09.19.0001`) at the lobby on `127.0.0.1:54994`, then sign up through the web endpoint to mint a playable session. The web signup/login runs on `127.0.0.1:54993`.",
      },
      {
        title: "Run individual services for debugging (optional)",
        body: "Each service can be started on its own. Override any config path with `--config <path>` on the corresponding binary.",
        code: "./scripts/run-web.sh     # HTTP signup/login on :54993\n./scripts/run-lobby.sh   # Lobby / character-list on :54994\n./scripts/run-world.sh   # World handoff on :54992\n./scripts/run-map.sh     # Map / zone / AI on :1989",
        lang: "sh",
      },
    ],
    platformNotes: {
      Windows:
        "Use the `.cmd` variant of every `scripts/run-*` helper; the bash scripts are for macOS and Linux.",
      macOS:
        "Install the Xcode Command Line Tools (`xcode-select --install`) if the build complains about a missing linker or C compiler.",
      Linux:
        "Install your distro's `build-essential` / `base-devel` package and `pkg-config` so the native crates compile.",
    },
    next: [
      "Need a client? Set up [Garlemald Client](/projects/garlemald-client/) to patch and launch a 1.x install against this server.",
      "Configuration lives in `configs/{lobby,world,map,web}.toml` — see the project's [Overview doc](/projects/garlemald-server/) for the full table.",
      "Questions or bug reports? Join the [Discord](https://discord.gg/CVjwWs6jnX).",
    ],
  },

  "garlemald-client": {
    slug: "garlemald-client",
    intro:
      "Build the cross-platform launcher that detects your installed FFXIV 1.x client, patches it forward to `2012.09.19.0001`, and launches the game against a private server. On macOS and Linux it manages its own Wine runtime, so there is nothing else to install.",
    prerequisites: [
      "Rust 1.95.0 — installed automatically by `rustup` on the first build (pinned in `rust-toolchain.toml`).",
      "An existing FINAL FANTASY XIV 1.x install (CrossOver bottle, Whisky prefix, or manual Wine install — all auto-detected). On Apple Silicon, the XIV 1.0 Apple Silicon Installer can produce one.",
      "Linux only: the `gtk3` and `webkit2gtk-4.1` runtime libraries for the login WebView.",
      "Windows only: the MSVC C++ x86 build tools (the launcher must build 32-bit).",
    ],
    steps: [
      {
        title: "Install Rust (if you don't have it)",
        body: "`rustup` pulls the exact pinned toolchain on first build.",
        code: "curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh",
        lang: "sh",
        platforms: ["macOS", "Linux"],
      },
      {
        title: "Clone the repository",
        code: "git clone https://github.com/swstegall/Garlemald-Client.git\ncd Garlemald-Client",
        lang: "sh",
      },
      {
        title: "Install the Linux WebView libraries",
        body: "The embedded login flow needs GTK 3 and WebKit2GTK. Install them with your package manager (Debian/Ubuntu example shown).",
        code: "sudo apt install libgtk-3-dev libwebkit2gtk-4.1-dev",
        lang: "sh",
        platforms: ["Linux"],
      },
      {
        title: "Build and run (macOS / Linux)",
        body: "On non-Windows hosts the launcher downloads and manages its own Wine runtime, so this is all you need.",
        code: "cargo build --release\ncargo run --release",
        lang: "bash",
        platforms: ["macOS", "Linux"],
      },
      {
        title: "Build and run (Windows, 32-bit)",
        body: "On Windows the launcher must be built as 32-bit (`i686`) so it can read the suspended thread context of the 32-bit `ffxivgame.exe` and patch it at launch.",
        code: "rustup target add i686-pc-windows-msvc\ncargo build --release --target i686-pc-windows-msvc\ncargo run   --release --target i686-pc-windows-msvc",
        lang: "powershell",
        platforms: ["Windows"],
      },
      {
        title: "Package a macOS .app bundle (optional)",
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
    intro:
      "Stand up the decompilation pipeline for the FFXIV 1.23b client binaries. The static-analysis track runs under Ghidra and emits per-function assembly, a work pool, and validated wire-protocol reports; the matching track recompiles individual functions byte-identically.",
    prerequisites: [
      "Ghidra 12 + JDK 21 — `brew install ghidra` pulls `openjdk@21` on macOS.",
      "Python 3 with `make`, for the extraction and validation tooling.",
      "Your own copy of the Square Enix 1.23b binaries — they are copyright SE and are NEVER committed to this repo. `make bootstrap` symlinks them from your local install.",
      "For the optional byte-matching track: the VS 2005 RTM + Platform SDK 2003 R2 toolchain running under CrossOver Wine (set up by `vstudio2005-workspace/install.sh` + `install-psdk.sh`).",
    ],
    steps: [
      {
        title: "Clone the repository",
        code: "git clone https://github.com/swstegall/meteor-decomp.git\ncd meteor-decomp",
        lang: "sh",
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
        code: "make split BINARY=ffxivlogin.exe   # ~30s — sanity check\nmake split BINARY=ffxivgame.exe    # 30–60 min on Apple Silicon",
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
        title: "Set up the matching toolchain (optional)",
        body: "Only needed for the byte-identical recompilation track. Point the env file at your MSVC-2005-under-Wine install, then verify `cl.exe` + PSDK + objdiff are reachable.",
        code: "echo 'export MSVC_TOOLCHAIN_DIR=\"$HOME/sdk/msvc-2005\"' \\\n    > ~/.config/meteor-decomp.env\nmake setup-msvc",
        lang: "sh",
        platforms: ["macOS", "Linux"],
      },
      {
        title: "Attempt a byte-identical match (optional)",
        body: "Compiles the `_rosetta/*.cpp` sources and diffs each against the binary slice. `make diff FUNC=...` grades a single function OK / PARTIAL / MISMATCH.",
        code: "make rosetta        # compile + diff all _rosetta/*.cpp\nmake diff FUNC=...  # grade one function",
        lang: "sh",
        platforms: ["macOS", "Linux"],
      },
    ],
    platformNotes: {
      macOS:
        "`brew install ghidra` brings JDK 21 with it. The MSVC matching toolchain runs under CrossOver Wine 9.",
      Linux:
        "Install Ghidra 12 and a JDK 21; the matching toolchain runs under Wine with the VS 2005 + PSDK install scripts.",
    },
    next: [
      "Read the [Plan, scope & roadmap](/projects/meteor-decomp/) and the matching-workflow doc before attempting a match.",
      "Want to grind functions automatically? Pair this with [decomp-agents](/projects/decomp-agents/).",
      "The original `.exe` files belong only in your local install — never `git add` them.",
    ],
  },

  "decomp-agents": {
    slug: "decomp-agents",
    intro:
      "Spawn 1–8 parallel Claude agents that grind through meteor-decomp's per-function matching loop. Each worker runs in its own git worktree, claims functions from a shared SQLite queue, and merges completed branches back automatically.",
    prerequisites: [
      "Python ≥ 3.11.",
      "A working meteor-decomp checkout at `../meteor-decomp/` that has already run `make split BINARY=<X>.exe` for your target binary.",
      "The meteor-decomp build toolchain (Wine + MSVC 2005 SP1) working, so `make diff` can grade matches.",
      "Claude authentication: either a Pro/Max subscription via the Claude Code CLI, or a metered `ANTHROPIC_API_KEY`.",
    ],
    steps: [
      {
        title: "Clone and install",
        body: "Uses `uv` or plain `pip` — either works.",
        code: "cd server-workspace/decomp-agents\nuv venv && source .venv/bin/activate\nuv pip install -e .          # or:  pip install -e .\ncp .env.example .env",
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
        body: "Pay-as-you-go alternative. Budget is roughly $0.10–0.50 per attempted function. Get a key from the Anthropic console, then:",
        code: "echo \"ANTHROPIC_API_KEY=sk-ant-...\" >> .env",
        lang: "sh",
      },
      {
        title: "Prime meteor-decomp for the agents (recommended)",
        body: "Dump Ghidra's pseudo-C so workers get a structural hint per function. Run this inside your meteor-decomp checkout. Without it they work from raw asm only and the match rate drops.",
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
        body: "Spawns the workers. Tune the worker count and target binary with env vars, e.g. `DECOMP_AGENT_WORKERS=5` and `DECOMP_BINARY=ffxivgame`.",
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
      "For multi-contributor coordination, see the distributed (fork + GitHub claim) mode in the [Overview doc](/projects/decomp-agents/).",
    ],
  },

  "xiv1point0-apple-silicon-installer": {
    slug: "xiv1point0-apple-silicon-installer",
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
        platforms: ["macOS"],
      },
      {
        title: "Mount your 1.0 disc or ISO",
        body: "Double-click the 1.0 `.iso` in Finder (or insert the disc). The script scans `/Volumes/*/` for `ffxivsetup.exe`, so there are no path arguments to pass.",
        platforms: ["macOS"],
      },
      {
        title: "Run the installer",
        body: "The script runs unattended — downloading the Sikarugir Frameworks and CrossOver Wine engine into `target/runtime/`, staging the disc into `target/iso/disc1/`, and provisioning the Wine prefix — until the InstallShield GUI appears.",
        code: "./install.sh",
        lang: "sh",
        platforms: ["macOS"],
      },
      {
        title: "Click through the InstallShield GUI",
        body: "When the graphical installer appears, accept all defaults. In particular **leave the install path at** `C:\\Program Files (x86)\\SquareEnix\\FINAL FANTASY XIV` so the verification step can find the expected file layout. Re-running `install.sh` skips any step whose output already exists, so a failed run resumes cleanly.",
        platforms: ["macOS"],
      },
      {
        title: "Wait for \"Install verified.\"",
        body: "The script confirms `ffxivboot.exe`, `ffxivupdater.exe`, `ffxivconfig.exe`, and the expected `data/` / `client/` archive layout before declaring success.",
        platforms: ["macOS"],
      },
      {
        title: "Launch the game",
        body: "Activate the local Wine with `wine-env.sh` (it exports `WINEPREFIX`, `WINE`, `WINESERVER`, and the library paths the bundled engine expects), then run the boot binary.",
        code: "cd target\nsource ./wine-env.sh\n\"$WINE\" \"$WINEPREFIX/drive_c/Program Files (x86)/SquareEnix/FINAL FANTASY XIV/ffxivboot.exe\"",
        lang: "sh",
        platforms: ["macOS"],
      },
    ],
    platformNotes: {
      macOS:
        "Everything installs under `./target/` next to the script — no Homebrew, no `/usr/local`, no admin rights. Deleting the repository removes the install.",
    },
    next: [
      "Install done? Drive it against a private server with [Garlemald Client](/projects/garlemald-client/), which auto-detects this install.",
      "Stuck? The [Overview doc](/projects/xiv1point0-apple-silicon-installer/) has a troubleshooting table for the common disc-discovery and Rosetta errors.",
      "Questions? Join the [Discord](https://discord.gg/CVjwWs6jnX).",
    ],
  },
};

/** Look up a project's quick-start guide by slug. */
export function getQuickStart(slug: string): QuickStart | undefined {
  return QUICKSTARTS[slug];
}
