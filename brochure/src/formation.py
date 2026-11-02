#!/usr/bin/env python3
"""UNIVERSNORMES — brochure « Formation en management QHSE » (12 pages A4).

Même système que la brochure institutionnelle (src/build.py) : textes dans content/formation-management-qhse.json,
styles communs src/styles.css + styles propres src/formation.css, rendu PDF par scripts/render.mjs.
Le contenu du programme reprend mot pour mot la voix de la vidéo de présentation de la formation.
"""
import argparse, json, sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from build import LOGO, ROOT, Ctx, chapnum, label, qr_svg, t  # noqa: E402

TOTAL = 12


def runhead(m, section: str, inv_left=False, inv_right=False) -> str:
    l, r = (" inv" if inv_left else ""), (" inv" if inv_right else "")
    return (f'<div class="runhead"><span class="rl{l}"><b>{t(m["org"])}</b>&ensp;{t(m["doc"])}</span>'
            f'<span class="rr{r}">{t(section)}</span></div>')


def folio(m, n: int, inv_left=False, inv_right=False) -> str:
    l, r = (" inv" if inv_left else ""), (" inv" if inv_right else "")
    return (f'<div class="folio"><span class="rl{l}">{t(m["kicker"])}</span>'
            f'<span class="pn{r}">{n:02d}<span>&thinsp;/&thinsp;{TOTAL}</span></span></div>')


def chips(lst, cls="chip") -> str:
    return "".join(f'<span class="{cls}">{t(x)}</span>' for x in lst)


def p_cover(c, d, m):
    cv = d["cover"]
    l1, l2 = cv["title"]
    return f'''
<section class="page fcv dark">
  <div class="ph photo" style="{c.bg(cv['photo'], '50% 4%')}"></div>
  <div class="veil"></div>
  <div class="trim">
    <div class="logo"><img src="{LOGO}" alt="UNIVERSNORMES"></div>
    <div class="badge"><span class="num">8</span><small>semaines</small></div>
    <div class="kick">{t(m['kicker'])}</div>
    <h1><span>{t(l1)}</span><span>{t(l2)}</span></h1>
    <div class="rule"></div>
    <div class="sub">{t(cv['subtitle'])}</div>
    <div class="base"><span>{t(m['domains'])}</span><span>{t(m['org'])}</span></div>
  </div>
</section>'''


def p_contexte(c, d, m, n):
    x = d["contexte"]
    needs = "".join(f'<div class="nd">{c.ico(k["icon"])}<span>{t(k["name"])}</span></div>' for k in x["needs"])
    return f'''
<section class="page fct">
  <div class="ph photo" style="{c.bg(x['photo'], '58% 50%')}"></div>
  <div class="ph band"></div>
  <div class="trim">
    {runhead(m, x['label'], False, True)}
    <div class="col">{label('01 · ' + x['label'])}<h2>{t(x['title'])}</h2>
      <p class="lead-s">{t(x['body'][0])}</p><p>{t(x['body'][1])}</p></div>
    <blockquote>{c.ico('Quote')}<span>{t(x['quote'])}</span></blockquote>
    <div class="needs"><div class="items-k">Ce que les entreprises attendent</div><div class="nds">{needs}</div></div>
    {folio(m, n)}
  </div>
</section>'''


def p_bref(c, d, m, n):
    x = d["bref"]
    sk = "".join(f'<div class="sk"><div class="n num">{i + 1:02d}</div><h4>{t(s["name"])}</h4><p>{t(s["text"])}</p></div>'
                 for i, s in enumerate(x["skills"]))
    return f'''
<section class="page fbr sand">
  <div class="ph band" style="{c.bg(x['photo'], '50% 46%')}"></div>
  <div class="trim">
    {runhead(m, x['label'])}
    <div class="head">{label('02 · ' + x['label'])}<h2>{t(x['title'])}</h2></div>
    <div class="facts">
      <div class="fk dark"><div class="big num">8</div><div class="bl">semaines<br>d’apprentissage progressif</div></div>
      <div class="fk"><div class="items-k">Référentiels étudiés</div><div class="chips2">{chips(x['norms'])}</div></div>
      <div class="fk"><div class="items-k">Pédagogie</div><p>{t(x['pedagogy'])}</p>
        <div class="items-k sp">Validation</div><p>{t(x['validation'])}</p></div>
    </div>
    <div class="skills"><div class="label">Les cinq savoir-faire visés</div><div class="sks">{sk}</div></div>
    {folio(m, n)}
  </div>
</section>'''


def p_roadmap(c, d, m, n):
    x = d["roadmap"]
    cols = ["", ""]
    for w in d["weeks"]:
        meta = f'{len(w["modules"])} modules'
        cols[(w["n"] - 1) // 4] += (
            f'<div class="rw"><div class="node num">{w["n"]:02d}</div><div><div class="wl">Semaine {w["n"]}</div>'
            f'<h4>{t(w["title"])}</h4><p>{t(w["objective"])}</p><div class="mt num">{t(meta)}</div></div></div>')
    return f'''
<section class="page frm dark">
  <svg class="arcs" viewBox="0 0 216 303" preserveAspectRatio="xMidYMid slice">{''.join(f'<circle cx="216" cy="0" r="{r}" fill="none" stroke="#6FD3B3" stroke-width="0.25"/>' for r in range(40, 330, 16))}</svg>
  <div class="trim">
    {runhead(m, x['label'], True, True)}
    <div class="head">{label('03 · ' + x['label'])}<h2>{t(x['title'])}</h2></div>
    <div class="tl"><div class="tc">{cols[0]}</div><div class="tc">{cols[1]}</div></div>
    {folio(m, n, True, True)}
  </div>
</section>'''


def mini_roadmap(cur) -> str:
    segs = "".join(
        f'<span class="{"on" if k in cur else ("past" if k < min(cur) else "")}">S{k}</span>' for k in range(1, 9))
    return f'<div class="mini">{segs}</div>'


def week_block(c, w, side: str) -> str:
    mods = "".join(f"<li>{t(mo)}</li>" for mo in w["modules"])
    tags = chips(w["tags"], "tag")
    return f'''
    <article class="wk {side}">
      <div class="ph wph" style="{c.bg(w['photo'], w['pos'])}"></div>
      <div class="wtx">
        <div class="wh">{chapnum(f"{w['n']:02d}", True, size_pt=54, stroke_mm=0.35)}<div><div class="wl">Semaine {w['n']}</div><h3>{t(w['title'])}</h3></div></div>
        <div class="obj"><span>Objectif</span>{t(w['objective'])}</div>
        <ul class="items">{mods}</ul>
        <div class="tags">{tags}</div>
      </div>
    </article>'''


def p_program(c, d, m, n, i):
    a, b = d["weeks"][2 * i], d["weeks"][2 * i + 1]
    bg = " sand" if i % 2 else ""
    return f'''
<section class="page fpg{bg}">
  <div class="trim">
    {runhead(m, f"Programme détaillé · semaines {a['n']} et {b['n']}")}
    <div class="ptop">{label('04 · Programme détaillé')}{mini_roadmap({a['n'], b['n']})}</div>
    {week_block(c, a, 'side-l')}
    <div class="sep"></div>
    {week_block(c, b, 'side-r')}
    {folio(m, n)}
  </div>
</section>'''


def p_pedagogie(c, d, m, n):
    x = d["pedagogie"]
    tr = "".join(f'<div class="tr">{c.ico(k["icon"])}<div class="ln num">{"ABC"[i]}</div><h3>{t(k["name"])}</h3><p>{t(k["text"])}</p></div>'
                 for i, k in enumerate(x["trio"]))
    return f'''
<section class="page fpd">
  <div class="ph photo" style="{c.bg(x['photo'], '50% 30%')}"></div>
  <div class="trim">
    {runhead(m, x['label'], True, True)}
    <div class="head">{label('05 · ' + x['label'])}<h2>{t(x['title'])}</h2></div>
    <div class="trio">{tr}</div>
    <div class="out">{c.ico('Flag')}<p>{t(x['outcome'])}</p></div>
    {folio(m, n)}
  </div>
</section>'''


def p_publics(c, d, m, n):
    x = d["publics"]
    cards = "".join(
        f'<div class="pc"><div class="ph pp" style="{c.bg(k["photo"], k["pos"])}"></div><div class="pt">'
        f'<div class="n num">{i + 1:02d}</div><h3>{t(k["name"])}</h3><p>{t(k["text"])}</p></div></div>'
        for i, k in enumerate(x["items"]))
    recap = "".join(f'<div class="rc">{c.ico("Check")}<span><b class="num">S{w["n"]}</b>{t(w["title"])}</span></div>'
                    for w in d["weeks"])
    return f'''
<section class="page fpu">
  <div class="trim">
    {runhead(m, x['label'])}
    <div class="head">{label('06 · ' + x['label'])}<h2>{t(x['title'])}</h2></div>
    <div class="cards">{cards}</div>
    <div class="recap"><div class="items-k">{t(x['recap_title'])}</div><div class="rcs">{recap}</div></div>
    {folio(m, n)}
  </div>
</section>'''


def p_inscription(c, d, m, n):
    x = d["inscription"]
    tel = t(m["whatsapp"]).replace(" ", " ")
    link = m["whatsapp_link"]
    its = "".join(f'<div class="stp"><b class="num">{i + 1:02d}</b><span>{t(s)}</span></div>' for i, s in enumerate(x["items"]))
    return f'''
<section class="page fin">
  <div class="ph photo" style="{c.bg(x['photo'], '50% 35%')}"></div>
  <div class="trim">
    {runhead(m, x['label'], True, True)}
    <div class="col">{label('07 · ' + x['label'])}<h2>{t(x['title'])}</h2><p class="lead-s">{t(x['body'])}</p>
      <div class="steps"><div class="items-k">Renseignements disponibles</div>{its}</div></div>
    <a class="wa" href="{link}">
      <div class="k">Contact WhatsApp</div><div class="nm">{t(m['org'])}</div>
      <div class="tel">{c.ico('Phone')}<span class="num">{tel}</span></div>
      <div class="qr">{qr_svg(link)}</div><div class="qrc">{t(x['qr_caption'])}</div>
    </a>
    <div class="sig"><img src="{LOGO}" alt="UNIVERSNORMES"><div class="t">{t(m['slogan'])}</div></div>
    {folio(m, n)}
  </div>
</section>'''


def p_back(c, d, m):
    tel = t(m["whatsapp"]).replace(" ", " ")
    arcs = "".join(f'<circle cx="108" cy="150" r="{r}" fill="none" stroke="#6FD3B3" stroke-width="0.25"/>'
                   for r in range(30, 260, 14))
    return f'''
<section class="page bk dark">
  <svg class="arcs" viewBox="0 0 216 303" preserveAspectRatio="xMidYMid slice">{arcs}</svg>
  <div class="trim">
    <div class="center">
      <div class="plate"><img src="{LOGO}" alt="UNIVERSNORMES"></div>
      <div class="doc">{t(m['doc'])}</div>
      <div class="slogan">{t(m['slogan'])}</div>
      <div class="rule"></div>
      <div class="met">{t(m['domains'])}</div>
      <div class="met s2">{t(m['metiers'])}</div>
    </div>
    <div class="foot"><span>WhatsApp&ensp;<b class="num">{tel}</b></span><span>{t(m['kicker'])}</span></div>
  </div>
</section>'''


def build(variant: str) -> str:
    d = json.loads((ROOT / "content/formation-management-qhse.json").read_text(encoding="utf-8"))
    m = d["meta"]
    c = Ctx(variant)
    pages = [p_cover(c, d, m), p_contexte(c, d, m, 2), p_bref(c, d, m, 3), p_roadmap(c, d, m, 4)]
    pages += [p_program(c, d, m, 5 + i, i) for i in range(4)]
    pages += [p_pedagogie(c, d, m, 9), p_publics(c, d, m, 10), p_inscription(c, d, m, 11), p_back(c, d, m)]
    bleed = "3mm" if variant == "print" else "0mm"
    return f'''<!doctype html>
<html lang="fr"><head><meta charset="utf-8">
<title>{t(m['title'])}</title>
<meta name="author" content="UNIVERSNORMES">
<link rel="stylesheet" href="../src/styles.css">
<link rel="stylesheet" href="../src/formation.css">
<style>:root {{ --b: {bleed}; }} @page {{ size: calc(210mm + 2 * {bleed}) calc(297mm + 2 * {bleed}); margin: 0; }}</style>
</head><body class="v-{variant}">{''.join(pages)}
</body></html>'''


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--variant", choices=["print", "web"], default="web")
    a = ap.parse_args()
    out = ROOT / "build"
    out.mkdir(exist_ok=True)
    f = out / f"formation-{a.variant}.html"
    f.write_text(build(a.variant), encoding="utf-8")
    print(f)
