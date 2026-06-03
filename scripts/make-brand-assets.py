#!/usr/bin/env python3
"""Generate the site's brand assets from the source app icon.

Extracts just the green emblem (the "G" + wing + banner) from
public/brand/garlemald-icon.png — dropping the white canvas and the black
rounded-rectangle tile — to a transparent PNG, then derives the favicon,
apple-touch icon, and the social (OG) card from it.

Run from the repo root:  python3 scripts/make-brand-assets.py
Requires Pillow (PIL).
"""
import os
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "public/brand/garlemald-icon.png")


def extract_emblem(src_path):
    """Keep green-dominant pixels (the emblem); drop white + black; crop tight."""
    src = Image.open(src_path).convert("RGBA")
    W, H = src.size
    px = src.load()
    out = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    op = out.load()
    minx, miny, maxx, maxy = W, H, 0, 0
    for y in range(H):
        for x in range(W):
            r, g, b, _ = px[x, y]
            greenness = g - max(r, b)
            if g >= 50 and greenness >= 18:
                al = 255 if greenness >= 38 else int((greenness - 18) / 20 * 255)
                op[x, y] = (r, g, b, al)
                if al > 30:
                    minx, miny = min(minx, x), min(miny, y)
                    maxx, maxy = max(maxx, x), max(maxy, y)
    pad = 6
    box = (max(0, minx - pad), max(0, miny - pad),
           min(W, maxx + pad + 1), min(H, maxy + pad + 1))
    return out.crop(box)


def square(img, size, scale=0.86):
    """Center `img` (preserving aspect) on a transparent square of `size`."""
    s = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    iw, ih = img.size
    f = (size * scale) / max(iw, ih)
    nw, nh = max(1, int(iw * f)), max(1, int(ih * f))
    r = img.resize((nw, nh), Image.LANCZOS)
    s.paste(r, ((size - nw) // 2, (size - nh) // 2), r)
    return s


def load_font(size):
    for p in [
        "/System/Library/Fonts/SFNSDisplay.ttf",
        "/System/Library/Fonts/HelveticaNeue.ttc",
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/Library/Fonts/Arial.ttf",
    ]:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                pass
    return ImageFont.load_default()


def main():
    emblem = extract_emblem(SRC)
    ew, eh = emblem.size
    print("emblem cropped to", emblem.size)

    emblem.save(os.path.join(ROOT, "public/brand/garlemald-emblem.png"))
    square(emblem, 512).save(os.path.join(ROOT, "src/app/icon.png"))
    square(emblem, 180).save(os.path.join(ROOT, "src/app/apple-icon.png"))

    ico = os.path.join(ROOT, "src/app/favicon.ico")
    if os.path.exists(ico):
        os.remove(ico)
    square(emblem, 256).save(
        ico, format="ICO", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)]
    )

    # OG social card: dark brand background + emblem + wordmark.
    OG_W, OG_H = 1200, 630
    og = Image.new("RGBA", (OG_W, OG_H), (10, 13, 11, 255))
    glow = Image.new("RGBA", (OG_W, OG_H), (0, 0, 0, 0))
    ImageDraw.Draw(glow).ellipse([700, -200, 1500, 500], fill=(63, 185, 80, 40))
    og = Image.alpha_composite(og, glow)
    em_h = 360
    f = em_h / eh
    em_r = emblem.resize((int(ew * f), em_h), Image.LANCZOS)
    og.alpha_composite(em_r, (110, (OG_H - em_h) // 2))
    d = ImageDraw.Draw(og)
    tx = 110 + int(ew * f) + 70
    title_font, sub_font = load_font(96), load_font(40)
    d.text((tx, 222), "Garlemald", font=title_font, fill=(232, 239, 233, 255))
    d.text((tx, 322), "Software", font=title_font, fill=(63, 185, 80, 255))
    d.text((tx, 452), "FFXIV 1.0 preservation toolkit",
           font=sub_font, fill=(157, 170, 160, 255))
    og.convert("RGB").save(os.path.join(ROOT, "public/brand/og.png"))

    for p in ["public/brand/garlemald-emblem.png", "public/brand/og.png",
              "src/app/icon.png", "src/app/apple-icon.png", "src/app/favicon.ico"]:
        full = os.path.join(ROOT, p)
        print("  wrote", p, os.path.getsize(full), "bytes")


if __name__ == "__main__":
    main()
