#!/usr/bin/env python3
"""Import FFXIV Classic wiki pages into the site's Resources section.

Fetches the *raw wikitext* of each page from the FFXIV Classic (Project Meteor)
wiki and converts it to faithful Markdown, writing one file per page under
`src/content/resources/<section>/<page>.md`. Those committed Markdown files are
the site's own copy of the content (the upstream wiki is a semi-defunct project,
so we host our own copy for longevity); the original page is linked from each
rendered page via the `sourceUrl` in `src/data/resources.mjs`.

This is a *manual* porting tool — it is NOT part of the build. Re-run it to
refresh the base content from upstream (it overwrites the .md files):

    python3 scripts/import-wiki-resources.py

Conversion notes:
  * Tables become GFM tables, or raw HTML <table> when they use colspan/rowspan
    (the site's Markdown renderer enables rehype-raw, so HTML tables render).
  * <nowiki>/<pre> blocks become fenced code.
  * Internal [[wiki links]] are de-linked to plain text (their targets are not
    on this site); external [url text] links are kept.
  * Wiki cruft (__TOC__, [[Category:...]], <div> wrappers, etc.) is dropped.
"""

import os
import re
import sys
import urllib.request

WIKI_BASE = "http://ffxivclassic.fragmenterworks.com/wiki/index.php"

HERE = os.path.dirname(os.path.abspath(__file__))
CONTENT_ROOT = os.path.join(HERE, "..", "src", "content", "resources")

# (section_slug, page_slug, wiki_page_name)
PAGES = [
    ("miscellaneous", "debug-commands", "Debug_Commands"),
    ("miscellaneous", "points-of-interest", "Points_of_interest"),
    ("game-data", "region-ids", "Regions"),
    ("game-data", "weather-ids", "Weather"),
    ("game-data", "music-ids", "Music"),
    ("game-data", "monster-models", "Monster_Models"),
    ("game-data", "background-object-models", "BgObj_Models"),
    ("game-data", "npc-animation-ids", "Populace_Animation"),
    ("game-data", "unofficial-additions", "Unofficial_Additions"),
    ("game-data", "dungeons", "Dungeons"),
    ("game-data", "quests", "Quests"),
    ("game-data", "unfinished-content", "Unfinished_Content"),
    ("game-data", "unknowns", "Unknowns"),
    ("game-protocol", "packet-headers", "Packet_Headers"),
    ("game-protocol", "game-opcodes", "Game_Opcodes"),
    ("game-protocol", "math-formula", "Math_Formula"),
    ("game-protocol", "retail-patcher-and-login", "Retail_Patcher_and_Login"),
    ("game-protocol", "zipatch-file-structure", "ZiPatch_File_Structure"),
    ("actor-system", "npc-actors", "NPC_Actors"),
    ("actor-system", "animations-and-vfx", "Animations_and_VFX"),
]


def fetch_raw(page_name):
    url = f"{WIKI_BASE}?title={page_name}&action=raw"
    req = urllib.request.Request(url, headers={"User-Agent": "garlemald-resources-importer"})
    with urllib.request.urlopen(req, timeout=40) as resp:
        return resp.read().decode("utf-8", errors="replace")


# --------------------------------------------------------------------------
# Inline conversion
# --------------------------------------------------------------------------

def _strip_link(m):
    """[[Target|Text]] -> Text ; [[Target]] -> Target (de-link internal)."""
    inner = m.group(1)
    if "|" in inner:
        inner = inner.split("|", 1)[1]
    # Drop a leading namespace-ish prefix only for de-linked display text? keep as-is.
    return inner


def _ext_link(m):
    """[http://x Text] -> [Text](http://x) ; [http://x] -> <http://x>."""
    inner = m.group(1).strip()
    parts = inner.split(None, 1)
    url = parts[0]
    if len(parts) == 2:
        return f"[{parts[1].strip()}]({url})"
    return f"<{url}>"


def convert_inline(text, *, html=False):
    """Convert wiki inline markup. `html=True` emits inline HTML (for HTML table
    cells, where Markdown is not reprocessed); otherwise emits Markdown inline."""
    # Internal links first (de-link to plain display text).
    text = re.sub(r"\[\[([^\]]+?)\]\]", _strip_link, text)
    # External links.
    text = re.sub(r"\[((?:https?|ftp)://[^\]]+)\]", _ext_link, text)
    # Bold/italic combos.
    if html:
        text = re.sub(r"'''''(.+?)'''''", r"<b><i>\1</i></b>", text)
        text = re.sub(r"'''(.+?)'''", r"<b>\1</b>", text)
        text = re.sub(r"''(.+?)''", r"<i>\1</i>", text)
    else:
        text = re.sub(r"'''''(.+?)'''''", r"***\1***", text)
        text = re.sub(r"'''(.+?)'''", r"**\1**", text)
        text = re.sub(r"''(.+?)''", r"*\1*", text)
    # <code>…</code> stays as HTML (renders either way). <tt> -> code.
    text = re.sub(r"<tt>(.*?)</tt>", r"<code>\1</code>", text, flags=re.S)
    return text.strip()


# --------------------------------------------------------------------------
# Table conversion
# --------------------------------------------------------------------------

CELL_ATTR_RE = re.compile(r'(colspan|rowspan)\s*=\s*"?(\d+)"?', re.I)


def split_cell(raw):
    """A wiki cell may be `attrs | content`. Return (attrs, content)."""
    raw = raw.strip()
    # Only treat the part before the first single `|` as attributes if it looks
    # like attributes (contains `=`) and isn't a wiki link.
    if "|" in raw:
        head, rest = raw.split("|", 1)
        if "=" in head and "[[" not in head and "{{" not in head:
            return head.strip(), rest.strip()
    return "", raw.strip()


def parse_table(lines):
    """Parse a wiki table (list of lines incl. {| and |}) into (caption, rows).
    Each row is a list of (is_header, attrs, content)."""
    caption = None
    rows = []
    cur = []

    def flush():
        nonlocal cur
        if cur:
            rows.append(cur)
            cur = []

    for ln in lines[1:]:  # skip the `{|` opener
        s = ln.rstrip("\n")
        st = s.strip()
        if st.startswith("|}"):
            break
        if st.startswith("|+"):
            caption = convert_inline(st[2:].strip())
            continue
        if st.startswith("|-"):
            flush()
            continue
        if st.startswith("!"):
            body = st[1:]
            for cell in re.split(r"!!", body):
                attrs, content = split_cell(cell)
                cur.append((True, attrs, content))
            continue
        if st.startswith("|"):
            body = st[1:]
            for cell in re.split(r"\|\|", body):
                attrs, content = split_cell(cell)
                cur.append((False, attrs, content))
            continue
        # Continuation of the previous cell's content (multi-line cell).
        if cur:
            is_h, attrs, content = cur[-1]
            cur[-1] = (is_h, attrs, (content + "\n" + s).strip())
    flush()
    return caption, rows


def table_has_span(rows):
    for row in rows:
        for _h, attrs, _c in row:
            if CELL_ATTR_RE.search(attrs or ""):
                return True
    return False


def render_html_table(caption, rows):
    out = ['<table>']
    if caption:
        out.append(f"  <caption>{caption}</caption>")
    for row in rows:
        out.append("  <tr>")
        for is_h, attrs, content in row:
            tag = "th" if is_h else "td"
            span = ""
            for m in CELL_ATTR_RE.finditer(attrs or ""):
                span += f' {m.group(1).lower()}="{m.group(2)}"'
            cell = convert_inline(content.replace("\n", " ").strip(), html=True)
            out.append(f"    <{tag}{span}>{cell}</{tag}>")
        out.append("  </tr>")
    out.append("</table>")
    return "\n".join(out)


def render_gfm_table(caption, rows):
    if not rows:
        return ""
    # Header = first row if it has any header cells, else synthesize from row 0.
    header = rows[0]
    body = rows[1:]
    ncols = max(len(r) for r in rows)

    def cellmd(content):
        c = convert_inline(content, html=False)
        c = c.replace("\n", "<br>").replace("|", "\\|")
        return c or " "

    lines = []
    if caption:
        lines.append(f"**{caption}**")
        lines.append("")
    head_cells = [cellmd(c) for _h, _a, c in header]
    head_cells += [" "] * (ncols - len(head_cells))
    lines.append("| " + " | ".join(head_cells) + " |")
    lines.append("| " + " | ".join(["---"] * ncols) + " |")
    for row in body:
        cells = [cellmd(c) for _h, _a, c in row]
        cells += [" "] * (ncols - len(cells))
        lines.append("| " + " | ".join(cells) + " |")
    return "\n".join(lines)


# --------------------------------------------------------------------------
# Block conversion
# --------------------------------------------------------------------------

def convert_lists(block):
    """Convert a run of wiki list lines (*, #, :) to Markdown."""
    out = []
    for ln in block.split("\n"):
        m = re.match(r"^([*#:;]+)\s?(.*)$", ln)
        if not m:
            out.append(convert_inline(ln))
            continue
        markers, rest = m.group(1), m.group(2)
        depth = len(markers) - 1
        indent = "  " * depth
        bullet = "1." if markers[-1] == "#" else "-"
        out.append(f"{indent}{bullet} {convert_inline(rest)}")
    return "\n".join(out)


def convert_gallery(block, slug):
    """<gallery>File:X.png|caption ...</gallery> -> markdown images + captions.
    Images must be downloaded to public/img/resources/<slug>/ separately (the
    wiki hosts them; this tool only fetches wikitext). Filenames: spaces -> '_'."""
    out = []
    for ln in block.split("\n"):
        ln = ln.strip()
        if not ln:
            continue
        name, _, caption = ln.partition("|")
        name = re.sub(r"^(File|Image):", "", name.strip(), flags=re.I)
        fname = name.replace(" ", "_")
        caption = convert_inline(caption.strip())
        alt = caption or fname
        out.append(f"![{alt}](/img/resources/{slug}/{fname})")
        if caption:
            out.append("")
            out.append(f"*{caption}*")
        out.append("")
    return "\n".join(out)


def convert(wikitext, slug=""):
    # Normalize newlines; protect code blocks first.
    wikitext = wikitext.replace("\r\n", "\n")

    # <gallery>…</gallery> -> markdown image embeds (local hosted paths).
    wikitext = re.sub(
        r"<gallery[^>]*>(.*?)</gallery>",
        lambda m: convert_gallery(m.group(1), slug),
        wikitext, flags=re.S | re.I,
    )

    placeholders = {}

    def stash(content, lang=""):
        key = f"@@CODE{len(placeholders)}@@"
        fence = f"```{lang}\n{content.rstrip()}\n```"
        placeholders[key] = fence
        return key

    # <nowiki>…</nowiki> and <pre>…</pre> -> fenced code.
    wikitext = re.sub(r"<nowiki>\s*\n?(.*?)</nowiki>", lambda m: stash(m.group(1)),
                      wikitext, flags=re.S | re.I)
    wikitext = re.sub(r"<pre>\s*\n?(.*?)</pre>", lambda m: stash(m.group(1)),
                      wikitext, flags=re.S | re.I)

    # Drop wiki cruft.
    wikitext = re.sub(r"__(TOC|NOTOC|NOEDITSECTION|FORCETOC)__", "", wikitext)
    wikitext = re.sub(r"\[\[Category:[^\]]+\]\]", "", wikitext, flags=re.I)
    wikitext = re.sub(r"</?(div|span|center|small|big|font)\b[^>]*>", "", wikitext, flags=re.I)
    wikitext = re.sub(r"<br\s*/?>", "\n", wikitext, flags=re.I)

    lines = wikitext.split("\n")
    out = []
    i = 0
    n = len(lines)
    while i < n:
        line = lines[i]
        st = line.strip()

        # Code placeholder on its own line.
        if st in placeholders:
            out.append(placeholders[st])
            i += 1
            continue

        # Table.
        if st.startswith("{|"):
            tbl = [line]
            i += 1
            depth = 1
            while i < n and depth > 0:
                t = lines[i].strip()
                if t.startswith("{|"):
                    depth += 1
                if t.startswith("|}"):
                    depth -= 1
                    tbl.append(lines[i])
                    i += 1
                    break
                tbl.append(lines[i])
                i += 1
            caption, rows = parse_table(tbl)
            if table_has_span(rows):
                out.append(render_html_table(caption, rows))
            else:
                out.append(render_gfm_table(caption, rows))
            out.append("")
            continue

        # Heading: == H == -> ## H
        m = re.match(r"^(={2,6})\s*(.*?)\s*\1\s*$", st)
        if m:
            level = len(m.group(1))
            out.append("#" * level + " " + convert_inline(m.group(2)))
            out.append("")
            i += 1
            continue

        # ---- horizontal rule
        if re.match(r"^-{4,}$", st):
            out.append("---")
            i += 1
            continue

        # List block (collect consecutive list lines).
        if re.match(r"^[*#:;]", st):
            block = []
            while i < n and re.match(r"^[*#:;]", lines[i].strip()):
                block.append(lines[i].strip())
                i += 1
            out.append(convert_lists("\n".join(block)))
            out.append("")
            continue

        # Blank line.
        if st == "":
            out.append("")
            i += 1
            continue

        # Plain paragraph line.
        out.append(convert_inline(line))
        i += 1

    text = "\n".join(out)
    # Restore any inline code placeholders that ended up mid-line.
    for k, v in placeholders.items():
        text = text.replace(k, v)
    # Collapse 3+ blank lines to 1.
    text = re.sub(r"\n{3,}", "\n\n", text).strip() + "\n"
    return text


def main():
    written = 0
    for section, slug, page in PAGES:
        try:
            raw = fetch_raw(page)
        except Exception as e:  # noqa: BLE001
            print(f"!! {page}: fetch failed: {e}", file=sys.stderr)
            continue
        md = convert(raw, slug)
        outdir = os.path.join(CONTENT_ROOT, section)
        os.makedirs(outdir, exist_ok=True)
        path = os.path.join(outdir, f"{slug}.md")
        with open(path, "w", encoding="utf-8") as f:
            f.write(md)
        written += 1
        print(f"ok {section}/{slug}.md  ({len(md)} bytes from {page})")
    print(f"\nWrote {written}/{len(PAGES)} pages to {os.path.relpath(CONTENT_ROOT, HERE)}")


if __name__ == "__main__":
    main()
