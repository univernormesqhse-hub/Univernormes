#!/usr/bin/env python3
"""UNIVERSNORMES — générateur de la brochure institutionnelle.

Lit content/brochure.json (textes) et produit une page HTML A4 par variante :
  --variant print : format fini 210 × 297 mm + 3 mm de fond perdu, photos haute définition (assets/photos/print)
  --variant web   : format fini 210 × 297 mm, photos allégées (assets/photos/web), liens cliquables
Le HTML est ensuite converti en PDF par scripts/render.mjs (Chromium / Playwright).
"""
import argparse, html, json, re
from pathlib import Path

import qrcode
import qrcode.image.svg
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
TOTAL = 16


def t(s: str) -> str:
    """Échappe le HTML et applique la typographie française (apostrophes, espaces insécables)."""
    s = html.escape(s, quote=False).replace("'", "\u2019")
    s = re.sub(r" ([?!;])", "\u202f\\1", s)
    s = s.replace(" :", "\u00a0:")
    s = re.sub(r"\b(ISO|GHG|Scope|scopes) (\d)", "\\1\u00a0\\2", s)
    s = re.sub(r"(\d) (?=[a-zà-ÿ])", "\\1\u00a0", s)
    s = s.replace(" · ", "\u00a0· ")
    return s


class Ctx:
    def __init__(self, variant: str):
        self.variant = variant
        self.icons = {p.stem: p.read_text(encoding="utf-8") for p in (ROOT / "assets/icons").glob("*.svg")}

    def photo(self, name: str) -> str:
        return f"../assets/photos/{self.variant}/{name}.jpg"

    def bg(self, name: str, pos: str = "50% 50%") -> str:
        return f"background-image:url('{self.photo(name)}');background-position:{pos}"

    def ico(self, name: str, cls: str = "") -> str:
        return f'<span class="ico {cls}">{self.icons[name]}</span>'


LOGO = "../assets/logo/universnormes-logo.png"


def runhead(section: str, inv_left=False, inv_right=False) -> str:
    l = " inv" if inv_left else ""
    r = " inv" if inv_right else ""
    return (f'<div class="runhead"><span class="rl{l}"><b>UNIVERSNORMES</b>&ensp;Brochure institutionnelle</span>'
            f'<span class="rr{r}">{t(section)}</span></div>')


def folio(n: int, baseline: str, inv_left=False, inv_right=False) -> str:
    l = " inv" if inv_left else ""
    r = " inv" if inv_right else ""
    return (f'<div class="folio"><span class="rl{l}">{t(baseline)}</span>'
            f'<span class="pn{r}">{n:02d}<span>&thinsp;/&thinsp;{TOTAL}</span></span></div>')


def label(s: str, cls: str = "") -> str:
    return f'<div class="label {cls}">{t(s)}</div>'


def paras(lst) -> str:
    return "".join(f"<p>{t(p)}</p>" for p in lst)


_CHAP_FONT = None


def chapnum(num: str, ink: bool = False, size_pt: float = 80, stroke_mm: float = 0.4) -> str:
    """Grand numéro de chapitre en contour, converti en tracés vectoriels (Manrope ExtraBold).
    Les tracés évitent les polices Type 3 que produit un texte détouré dans le PDF."""
    global _CHAP_FONT
    if _CHAP_FONT is None:
        _CHAP_FONT = TTFont(ROOT / "assets/fonts/Manrope-ExtraBold.ttf")
    f = _CHAP_FONT
    gs, cmap, upm = f.getGlyphSet(), f.getBestCmap(), f["head"].unitsPerEm
    top = f["OS/2"].sCapHeight
    track = -0.04 * upm
    x, paths = 0.0, []
    for ch in num:
        g = gs[cmap[ord(ch)]]
        pen = SVGPathPen(gs)
        g.draw(pen)
        paths.append(f'<path transform="translate({x:.1f} 0)" d="{pen.getCommands()}"/>')
        x += g.width + track
    w = x - track
    pad = 0.04 * upm
    sw = stroke_mm / (size_pt * 25.4 / 72) * upm
    h_pt = (top + 2 * pad) / upm * size_pt
    cls = "chapnum ink" if ink else "chapnum"
    return (f'<svg class="{cls}" viewBox="{-pad:.1f} {-(top + pad):.1f} {w + 2 * pad:.1f} {top + 2 * pad:.1f}" '
            f'style="height:{h_pt:.2f}pt" stroke-width="{sw:.1f}"><g transform="scale(1 -1)">{"".join(paths)}</g></svg>')


def qr_svg(link: str) -> str:
    img = qrcode.make(link, image_factory=qrcode.image.svg.SvgPathImage, box_size=10, border=0,
                      error_correction=qrcode.constants.ERROR_CORRECT_M)
    svg = img.to_string(encoding="unicode")
    svg = re.sub(r"<\?xml[^>]*\?>", "", svg)
    svg = re.sub(r'\s(width|height)="[^"]*"', "", svg, count=2)
    svg = svg.replace('fill="#000000"', 'fill="#061A47"')
    return svg


# ═══════════════════════════════ Pages ═══════════════════════════════

def p_cover(c: Ctx, d, m):
    cv = d["cover"]
    lines = "".join(f"<span>{t(x)}</span>" for x in cv["title"])
    return f'''
<section class="page cover dark">
  <div class="ph photo" style="{c.bg(cv['photo'], '30% 0%')}"></div>
  <div class="veil"></div>
  <div class="trim">
    <div class="logo"><img src="{LOGO}" alt="UNIVERSNORMES"></div>
    <div class="kick">{t(cv['kicker'])}</div>
    <h1>{lines}</h1>
    <div class="rule"></div>
    <div class="slogan">{t(m['slogan'])}</div>
    <div class="base"><span>{t(m['baseline'])}</span><span>{t(m['metiers'])}</span></div>
  </div>
</section>'''


def p_direction(c: Ctx, d, m, n):
    x = d["direction"]
    return f'''
<section class="page dir">
  <div class="ph photo" style="{c.bg(x['photo'], '70% 8%')}"></div>
  <div class="trim">
    {runhead(x['label'], inv_right=True)}
    <div class="col">
      {label(x['label'])}
      <div class="lead">{t(x['lead'])}</div>
    </div>
    <blockquote>{c.ico('Quote')}<span>{t(x['quote'])}</span></blockquote>
    <div class="body">{paras(x['body'])}</div>
    <div class="sign"><span></span>{t(x['signature'])}</div>
    {folio(n, m['baseline'])}
  </div>
</section>'''


def p_presentation(c: Ctx, d, m, n):
    x = d["presentation"]
    facts = "".join(
        f'<div class="fact"><div class="v">{t(f["value"])}</div><div class="l">{t(f["label"])}</div>'
        f'<div class="d">{t(f["detail"])}</div></div>' for f in x["facts"])
    return f'''
<section class="page pres">
  <div class="ph band" style="{c.bg(x['photo'], '50% 42%')}"></div>
  <div class="trim">
    {runhead(x['label'])}
    <div class="top">{label(x['label'])}<h2>{t(x['title'])}</h2></div>
    <div class="cols">{paras(x['body'])}</div>
    <div class="facts">{facts}</div>
    {folio(n, m['baseline'])}
  </div>
</section>'''


def p_vision(c: Ctx, d, m, n):
    x = d["vision"]
    vals = "".join(
        f'<div class="val"><div class="n">{i + 1:02d}</div><h4>{t(v["name"])}</h4><p>{t(v["text"])}</p></div>'
        for i, v in enumerate(x["values"]))
    return f'''
<section class="page vis dark">
  <div class="bleed ph photo" style="{c.bg(x['photo'], '50% 45%')}"></div>
  <div class="bleed veil"></div>
  <div class="trim">
    {runhead(x['label'], True, True)}
    <div class="head">{label(x['label'])}<h2>{t(x['title'])}</h2></div>
    <div class="vm">
      <div class="vm-b">{c.ico('Eye', 'vm-i')}<div class="k">Vision</div><div class="t">{t(x['vision'])}</div></div>
      <div class="vm-b">{c.ico('Target', 'vm-i')}<div class="k">Mission</div><div class="t">{t(x['mission'])}</div></div>
    </div>
    <div class="vals-k label light">Nos valeurs</div>
    <div class="vals">{vals}</div>
    {folio(n, m['baseline'], True, True)}
  </div>
</section>'''


def p_expertise(c: Ctx, d, m, n):
    x = d["expertise"]
    doms = "".join(
        f'<div class="dom"><div class="n">{i + 1:02d}</div>{c.ico(dm["icon"], "ico-ring")}'
        f'<div><h3>{t(dm["name"])}</h3><p>{t(dm["text"])}</p></div></div>' for i, dm in enumerate(x["domains"]))
    return f'''
<section class="page exp">
  <div class="trim">
    {runhead(x['label'])}
    <div class="left">{label(x['label'])}<h2>{t(x['title'])}</h2><p class="small">{t(x['intro'])}</p></div>
    <div class="ph photo" style="{c.bg(x['photo'], '38% 50%')}"></div>
    <div class="list">{doms}</div>
    {folio(n, m['baseline'])}
  </div>
</section>'''


def p_services(c: Ctx, d, m, n):
    x = d["services"]
    cards = ""
    for i, g in enumerate(x["groups"]):
        lis = "".join(f'<li>{c.ico("Check")}<span>{t(it)}</span></li>' for it in g["items"])
        cards += (f'<div class="card"><div class="ch">{c.ico(g["icon"])}<div><div class="cn">{i + 1:02d}</div>'
                  f'<h3>{t(g["name"])}</h3></div></div><ul>{lis}</ul></div>')
    return f'''
<section class="page srv sand">
  <div class="trim">
    {runhead(x['label'])}
    <div class="head"><div>{label(x['label'])}<h2>{t(x['title'])}</h2></div><p>{t(x['intro'])}</p></div>
    <div class="grid">{cards}</div>
    <div class="note">{c.ico('ArrowRight')}<span>Chaque intervention peut être conduite séparément ou combinée dans un dispositif sur mesure.</span></div>
    {folio(n, m['baseline'])}
  </div>
</section>'''


def chap_items(lst) -> str:
    return '<ul class="items">' + "".join(f"<li>{t(i)}</li>" for i in lst) + "</ul>"


def norm(x) -> str:
    return f'<div class="norm"><span class="a">{t(x["norm"])}</span><span class="b">{t(x["normName"])}</span></div>'


def p_qualite(c: Ctx, d, m, n):
    x = d["qualite"]
    return f'''
<section class="page q">
  <div class="ph photo" style="{c.bg(x['photo'], '50% 38%')}"></div>
  <div class="trim">
    {runhead('Domaine ' + x['num'] + ' · ' + x['label'], True, True)}
    <div class="cn">{chapnum(x['num'])}{label(x['label'], 'light')}</div>
    <div class="ph inset" style="{c.bg(x['photo2'], '50% 55%')}"></div>
    <div class="colL">{norm(x)}<h2>{t(x['title'])}</h2><p>{t(x['body'])}</p></div>
    <div class="colR"><div class="items-k">Nos interventions</div>{chap_items(x['items'])}</div>
    {folio(n, m['baseline'])}
  </div>
</section>'''


def p_securite(c: Ctx, d, m, n):
    x = d["securite"]
    chips = "".join(f"<span>{t(k)}</span>" for k in x["methods"])
    return f'''
<section class="page s dark">
  <div class="ph photo" style="{c.bg(x['photo'], '46% 30%')}"></div>
  <div class="trim">
    {runhead('Domaine ' + x['num'] + ' · ' + x['label'], True, True)}
    <div class="col">
      <div class="cn">{chapnum(x['num'])}{label(x['label'], 'light')}</div>
      <div class="nwrap">{norm(x)}</div>
      <h2>{t(x['title'])}</h2><p>{t(x['body'])}</p>
      <div class="items-k">Nos interventions</div>{chap_items(x['items'])}
      <div class="meth"><div class="items-k">Méthodes d’analyse des risques maîtrisées</div><div class="chips">{chips}</div></div>
    </div>
    {folio(n, m['baseline'], True, True)}
  </div>
</section>'''


def p_environnement(c: Ctx, d, m, n):
    x = d["environnement"]
    scopes = [("Scope 1", "Émissions directes"), ("Scope 2", "Énergie achetée"), ("Scope 3", "Chaîne de valeur")]
    sc = "".join(f'<div class="sc"><b>{t(a)}</b><span>{t(b)}</span></div>' for a, b in scopes)
    return f'''
<section class="page e">
  <div class="ph photo" style="{c.bg(x['photo'], '40% 50%')}"></div>
  <div class="trim">
    {runhead('Domaine ' + x['num'] + ' · ' + x['label'])}
    <div class="top">
      <div class="cn">{chapnum(x['num'], True)}{label(x['label'])}</div>
      <div class="nwrap">{norm(x)}</div>
      <h2>{t(x['title'])}</h2>
    </div>
    <div class="intro"><p class="lead-s">{t(x['body'])}</p></div>
    <div class="list"><div class="items-k">Nos interventions</div>{chap_items(x['items'])}</div>
    <div class="ghg">{c.ico('Leaf', 'gi')}<div><div class="gk">Bilan carbone · GHG Protocol</div><div class="scs">{sc}</div></div></div>
    {folio(n, m['baseline'], True, True)}
  </div>
</section>'''


def p_audit(c: Ctx, d, m, n):
    x = d["audit"]
    cols = "".join(f'<div class="c">{c.ico(k["icon"])}<h3>{t(k["name"])}</h3><p>{t(k["text"])}</p></div>' for k in x["cols"])
    return f'''
<section class="page au">
  <div class="ph big" style="{c.bg(x['photo2'], '30% 40%')}"><div class="shade"></div><div class="q">{t(x['quote'])}</div></div>
  <div class="ph side" style="{c.bg(x['photo'], '50% 45%')}"></div>
  <div class="trim">
    {runhead('Domaine ' + x['num'] + ' · ' + x['label'])}
    <div class="head"><div class="cn">{chapnum(x['num'], True)}{label(x['label'])}</div><h2>{t(x['title'])}</h2></div>
    <div class="cols">{cols}</div>
    {folio(n, m['baseline'])}
  </div>
</section>'''


def p_formation(c: Ctx, d, m, n):
    x = d["formation"]
    fl = x["flagship"]
    wk = "".join(f'<div class="wk"><b>S{i + 1}</b><span>{t(w)}</span></div>' for i, w in enumerate(fl["weeks"]))
    fm = "".join(f'<div class="fm">{c.ico(f["icon"])}<div><h4>{t(f["name"])}</h4><p>{t(f["text"])}</p></div></div>'
                 for f in x["formats"])
    return f'''
<section class="page f">
  <div class="ph photo" style="{c.bg(x['photo2'], '50% 42%')}"></div>
  <div class="trim">
    {runhead('Domaine ' + x['num'] + ' · ' + x['label'], True, True)}
    <div class="head"><div><div class="cn">{chapnum(x['num'], True)}{label(x['label'])}</div>
      <h2>{t(x['title'])}</h2></div><p>{t(x['body'])}</p></div>
    <div class="flag">
      <div><div class="k">Parcours phare</div><h3>{t(fl['name'])}</h3>
        <div class="eight num">8<small>semaines de parcours progressif</small></div></div>
      <div class="weeks">{wk}</div>
    </div>
    <div class="formats">{fm}</div>
    {folio(n, m['baseline'])}
  </div>
</section>'''


def p_methodologie(c: Ctx, d, m, n):
    x = d["methodologie"]
    st = "".join(f'<div class="st"><div class="node num">{i + 1:02d}</div>{c.ico(s["icon"])}<h4>{t(s["name"])}</h4>'
                 f'<p>{t(s["text"])}</p></div>' for i, s in enumerate(x["steps"]))
    pdca = "".join(f"<span>{t(k)}</span>" for k in ["Planifier", "Faire", "Vérifier", "Agir"])
    return f'''
<section class="page m">
  <div class="ph band" style="{c.bg(x['photo'], '50% 35%')}"></div>
  <div class="trim">
    {runhead(x['label'])}
    <div class="head">{label(x['label'])}<h2>{t(x['title'])}</h2></div>
    <div class="line"></div>
    <div class="proc">{st}</div>
    <div class="pdca">{c.ico('RefreshCw')}<div class="t">Une logique d’amélioration continue, à chaque étape</div><div class="pp">{pdca}</div></div>
    <div class="cap">Chaque démarche est construite avec vos équipes, à partir de votre contexte et de vos priorités.</div>
    {folio(n, m['baseline'], True, True)}
  </div>
</section>'''


def p_engagements(c: Ctx, d, m, n):
    x = d["engagements"]
    it = "".join(f'<div class="eng">{c.ico(k["icon"])}<h4>{t(k["name"])}</h4><p>{t(k["text"])}</p></div>' for k in x["items"])
    return f'''
<section class="page g">
  <div class="ph photo" style="{c.bg(x['photo'], '50% 50%')}"></div>
  <div class="trim">
    {runhead(x['label'], True, True)}
    <div class="over">{label(x['label'], 'light')}<h2>{t(x['title'])}</h2><div class="q">{t(x['quote'])}</div></div>
    <div class="grid">{it}</div>
    {folio(n, m['baseline'])}
  </div>
</section>'''


def p_pourquoi(c: Ctx, d, m, n):
    x = d["pourquoi"]
    rs = "".join(f'<div class="r"><div class="n num">{i + 1:02d}</div><h3>{t(r["name"])}</h3><p>{t(r["text"])}</p></div>'
                 for i, r in enumerate(x["reasons"]))
    return f'''
<section class="page w dark">
  <div class="bleed ph photo" style="{c.bg(x['photo'], '50% 50%')}"></div>
  <div class="bleed veil"></div>
  <div class="trim">
    {runhead(x['label'], True, True)}
    <div class="head">{label(x['label'], 'light')}<h2>{t(x['title'])}</h2></div>
    <div class="rs">{rs}</div>
    {folio(n, m['baseline'], True, True)}
  </div>
</section>'''


def p_contact(c: Ctx, d, m, n):
    x = d["contact"]
    steps = "".join(f'<div class="stp"><b>{i + 1:02d}</b><span>{t(s)}</span></div>' for i, s in enumerate(x["steps"]))
    tel = t(m["whatsapp"]).replace(" ", "\u00a0")
    link = m["whatsapp_link"]
    return f'''
<section class="page c">
  <div class="ph photo" style="{c.bg(x['photo'], '50% 22%')}"></div>
  <div class="trim">
    {runhead(x['label'], False, True)}
    <div class="col">{label(x['label'])}<h2>{t(x['title'])}</h2><p>{t(x['body'])}</p>
      <div class="steps"><div class="items-k">Comment nous travaillons ensemble</div>{steps}</div></div>
    <a class="card2" href="{link}">
      <div><div class="k">Écrivez-nous sur WhatsApp</div><div class="nm">UNIVERSNORMES</div>
        <div class="tel">{c.ico('Phone')}<span class="num">{tel}</span></div>
        <div class="lab">Formations · Audits ·<br>Accompagnement · Conseil</div></div>
      <div><div class="qr">{qr_svg(link)}</div><div class="qrc">{t(x['qr_caption'])}</div></div>
    </a>
    <div class="sig"><img src="{LOGO}" alt="UNIVERSNORMES"><div class="t">{t(m['slogan'])}</div></div>
    {folio(n, m['baseline'], False, True)}
  </div>
</section>'''


def p_back(c: Ctx, d, m):
    tel = t(m["whatsapp"]).replace(" ", "\u00a0")
    arcs = "".join(f'<circle cx="108" cy="150" r="{r}" fill="none" stroke="#6FD3B3" stroke-width="0.25"/>'
                   for r in range(30, 260, 14))
    return f'''
<section class="page bk dark">
  <svg class="arcs" viewBox="0 0 216 303" preserveAspectRatio="xMidYMid slice">{arcs}</svg>
  <div class="trim">
    <div class="center">
      <div class="plate"><img src="{LOGO}" alt="UNIVERSNORMES"></div>
      <div class="slogan">{t(m['slogan'])}</div>
      <div class="rule"></div>
      <div class="met">{t(m['baseline'])}</div>
      <div class="met s2">{t(m['metiers'])}</div>
    </div>
    <div class="foot"><span>WhatsApp&ensp;<b class="num">{tel}</b></span><span>{t(m['footer'])}</span></div>
  </div>
</section>'''


def build(variant: str) -> str:
    d = json.loads((ROOT / "content/brochure.json").read_text(encoding="utf-8"))
    m = d["meta"]
    c = Ctx(variant)
    pages = [
        p_cover(c, d, m),
        p_direction(c, d, m, 2),
        p_presentation(c, d, m, 3),
        p_vision(c, d, m, 4),
        p_expertise(c, d, m, 5),
        p_services(c, d, m, 6),
        p_qualite(c, d, m, 7),
        p_securite(c, d, m, 8),
        p_environnement(c, d, m, 9),
        p_audit(c, d, m, 10),
        p_formation(c, d, m, 11),
        p_methodologie(c, d, m, 12),
        p_engagements(c, d, m, 13),
        p_pourquoi(c, d, m, 14),
        p_contact(c, d, m, 15),
        p_back(c, d, m),
    ]
    bleed = "3mm" if variant == "print" else "0mm"
    return f'''<!doctype html>
<html lang="fr"><head><meta charset="utf-8">
<title>{t(m['title'])}</title>
<meta name="author" content="UNIVERSNORMES">
<link rel="stylesheet" href="../src/styles.css">
<style>:root {{ --b: {bleed}; }} @page {{ size: calc(210mm + 2 * {bleed}) calc(297mm + 2 * {bleed}); margin: 0; }}</style>
</head><body class="v-{variant}">{''.join(pages)}
</body></html>'''


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--variant", choices=["print", "web"], default="web")
    ap.add_argument("--pages", help="ex. 1-3 pour la maquette", default=None)
    a = ap.parse_args()
    out = ROOT / "build"
    out.mkdir(exist_ok=True)
    doc = build(a.variant)
    if a.pages:
        lo, hi = (int(v) for v in a.pages.split("-"))
        parts = doc.split("<section ")
        head, secs = parts[0], parts[1:]
        tail = secs[-1].split("</section>")[-1]
        secs = ["<section " + s.split("</section>")[0] + "</section>" for s in secs]
        doc = head + "".join(secs[lo - 1:hi]) + tail
    f = out / f"brochure-{a.variant}.html"
    f.write_text(doc, encoding="utf-8")
    print(f)
