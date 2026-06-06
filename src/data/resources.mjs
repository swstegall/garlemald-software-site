// Canonical registry of the site's Resources section.
//
// Resources are FFXIV 1.0 (v1.23b) reference pages ported from the FFXIV Classic
// (Project Meteor) wiki and hosted here for longevity. This file is the single
// source of truth for the section/page tree; the page bodies live as Markdown
// under `src/content/resources/<section>/<page>.md` (imported at build time by
// the route, see `src/lib/resources.ts`). Re-import the bodies from upstream with
// `python3 scripts/import-wiki-resources.py`.
//
// Plain ESM (no TypeScript) so it can be consumed by both Node build scripts and
// the typed app layer (`src/lib/resources.ts`, which applies the `ResourceSection`
// type). To add a page: drop its Markdown under the right section folder and add
// an entry here — nothing else to wire up.

// Base of the upstream wiki. Each page's `source` is a wiki page name; the
// rendered page links back to `${RESOURCE_WIKI_BASE}/${source}`.
export const RESOURCE_WIKI_BASE =
  "http://ffxivclassic.fragmenterworks.com/wiki/index.php";

export const RESOURCE_ATTRIBUTION =
  "Reference content ported from the community FFXIV Classic (Project Meteor) wiki and hosted here for preservation. Each page links to its original source.";

/**
 * @typedef {Object} ResourcePageDef
 * @property {string} slug   URL slug under the section, e.g. "debug-commands".
 * @property {string} title  Display title, e.g. "Debug Commands".
 * @property {string} source Upstream wiki page name, e.g. "Debug_Commands".
 * @property {string} file   Markdown path relative to `src/content/resources/`.
 */

export const RESOURCE_SECTIONS = [
  {
    slug: "miscellaneous",
    title: "Miscellaneous",
    description: "Grab-bag references: GM/debug commands and notable in-world locations.",
    pages: [
      { slug: "debug-commands", title: "Debug Commands", source: "Debug_Commands", file: "miscellaneous/debug-commands.md" },
      { slug: "points-of-interest", title: "Points of Interest", source: "Points_of_interest", file: "miscellaneous/points-of-interest.md" },
    ],
  },
  {
    slug: "game-data",
    title: "Game Data",
    description: "Internal IDs and data tables: regions, weather, music, models, animations, and content.",
    pages: [
      { slug: "region-ids", title: "Region IDs", source: "Regions", file: "game-data/region-ids.md" },
      { slug: "weather-ids", title: "Weather IDs", source: "Weather", file: "game-data/weather-ids.md" },
      { slug: "music-ids", title: "Music IDs", source: "Music", file: "game-data/music-ids.md" },
      { slug: "monster-models", title: "Monster Models", source: "Monster_Models", file: "game-data/monster-models.md" },
      { slug: "background-object-models", title: "Background Object Models", source: "BgObj_Models", file: "game-data/background-object-models.md" },
      { slug: "npc-animation-ids", title: "NPC Animation IDs", source: "Populace_Animation", file: "game-data/npc-animation-ids.md" },
      { slug: "unofficial-additions", title: "Unofficial Additions", source: "Unofficial_Additions", file: "game-data/unofficial-additions.md" },
      { slug: "dungeons", title: "Dungeons", source: "Dungeons", file: "game-data/dungeons.md" },
      { slug: "quests", title: "Quests", source: "Quests", file: "game-data/quests.md" },
      { slug: "unfinished-content", title: "Unfinished Content", source: "Unfinished_Content", file: "game-data/unfinished-content.md" },
      { slug: "unknowns", title: "Unknowns", source: "Unknowns", file: "game-data/unknowns.md" },
    ],
  },
  {
    slug: "game-protocol",
    title: "Game Protocol",
    description: "The 1.x wire protocol: packet headers, opcodes, math formulae, the retail patcher/login, and ZiPatch.",
    pages: [
      { slug: "packet-headers", title: "Packet Headers", source: "Packet_Headers", file: "game-protocol/packet-headers.md" },
      { slug: "game-opcodes", title: "Game Opcodes", source: "Game_Opcodes", file: "game-protocol/game-opcodes.md" },
      { slug: "math-formula", title: "Math Formula", source: "Math_Formula", file: "game-protocol/math-formula.md" },
      { slug: "retail-patcher-and-login", title: "Retail Patcher and Login", source: "Retail_Patcher_and_Login", file: "game-protocol/retail-patcher-and-login.md" },
      { slug: "zipatch-file-structure", title: "ZiPatch File Structure", source: "ZiPatch_File_Structure", file: "game-protocol/zipatch-file-structure.md" },
    ],
  },
  {
    slug: "actor-system",
    title: "Actor System",
    description: "How actors work: NPC actor structure and the animation / VFX system.",
    pages: [
      { slug: "npc-actors", title: "NPC Actors", source: "NPC_Actors", file: "actor-system/npc-actors.md" },
      { slug: "animations-and-vfx", title: "Animations and VFX", source: "Animations_and_VFX", file: "actor-system/animations-and-vfx.md" },
    ],
  },
];

/** Build the canonical upstream URL for a page's `source` wiki name. */
export function resourceSourceUrl(source) {
  return `${RESOURCE_WIKI_BASE}/${source}`;
}
