# « Analyse des risques QHSE » — direction artistique « LE SIGNAL » (salle de contrôle, nuit, ligne d'oscilloscope continue).
#   python3 build.py  ->  index.html (9:16) + ../analyse-risques-qhse-16x9/index.html (16:9)
# Sous-titres : src/script.txt (texte corrigé) calé sur la voix d'origine par src/align.py.
import json, os, shutil, subprocess, sys, math, html as H
sys.path.insert(0, "src")
from align import load, chunks, find

W, RATIO = load()
CH = chunks(W)
T = lambda phrase, after=0.0: find(W, phrase, after)
DUR = 428.76
END_VOICE = 426.75

CHAP = [  # (début, grammaire du karaoké)
    (0.0, "rise"),
    (T("C'est parti. Première partie"), "ink"),
    (T("On passe à la section deux"), "grey"),
    (T("Troisième partie : décoder"), "blur"),
    (T("On arrive à la section quatre"), "rise"),
    (T("Et voici notre dernière section"), "ink"),
]
def chap_of(t):
    k = 0
    for i, c in enumerate(CHAP):
        if t >= c[0] - 0.01: k = i
    return k

class Doc:
    def __init__(self, fmt):
        self.fmt = fmt; self.html = []; self.js = []; self.sfx = []; self.n = 0; self.pulses = []
    def id(self, p="e"):
        self.n += 1; return f"{p}{self.n}"
    def add(self, s): self.html.append(s)
    def j(self, s): self.js.append(s)
    def snd(self, name, t, v=0.4): self.sfx.append((name, round(t, 2), v))

def esc(s): return H.escape(s, quote=False)

# ------------------------------------------------------------- composants
def scene(d, t0, t1, inner, cls=""):
    sid = d.id("s")
    d.add(f'<div class="scene clip" id="{sid}" data-start="{t0:.2f}" data-duration="{t1 - t0:.2f}" data-track-index="2"><div class="stage {cls}">{inner}</div><div class="glare"></div></div>')
    d.j(f"blurIn('#{sid}', {t0:.2f}); blurOut('#{sid}', {t1 - 0.3:.2f}); glare('#{sid} .glare', {t0:.2f});")
    d.j(f"tl.fromTo('#{sid} .ph img', {{ scale: 1.0 }}, {{ scale: 1.1, duration: {t1 - t0:.2f}, ease: 'none' }}, {t0:.2f});")
    d.snd("whoosh", t1 - 0.3, 0.28); d.snd("soft-whoosh", t0 + 0.02, 0.22)
    return sid

def pop(d, sel, t, sound="pop", v=0.32, frm="{ y: 40 }"):
    d.j(f"pop('{sel}', {t:.2f}, {frm});")
    if sound: d.snd(sound, t, v)

def chip(d, text, t, cls="", icon=None):
    i = d.id("c")
    ic = f'<img src="assets/ic-{icon}.png" />' if icon else ""
    pop(d, f"#{i}", t)
    return f'<div class="chip {cls}" id="{i}">{ic}{esc(text)}</div>'

def photo(src, pos="50% 40%", cls=""):
    return f'<div class="ph {cls}"><img src="assets/photo-{src}.jpg" style="object-position: {pos};" /></div>'

def pulse(d, t, amp=2.6, color=None):
    """La ligne de signal (fil rouge) réagit : un pic d'amplitude, éventuellement une couleur."""
    d.j(f"tl.fromTo('#sigw', {{ scaleY: 1, svgOrigin: '0 70' }}, {{ scaleY: {amp}, svgOrigin: '0 70', duration: 0.25, yoyo: true, repeat: 3, ease: 'sine.inOut' }}, {t:.2f});")
    if color: d.j(f"tl.to('#sigp', {{ stroke: '{color}', duration: 0.3 }}, {t:.2f});")

def versus(d, t0, t1, L, R, vline="VS"):
    def side(S, tone):
        sid = d.id("sd")
        items = "".join(chip(d, a, t, "sm " + tone) for a, t in S["items"])
        ver = ""
        if S.get("verdict"):
            a, t, c = S["verdict"]; vid = d.id("vd")
            ver = f'<div class="stamp {c}" id="{vid}">{esc(a)}</div>'
            d.j(f"slam('#{vid}', {t:.2f});"); d.snd("tampon", t, 0.5)
        d.j(f"tl.fromTo('#{sid}', {{ opacity: 0, y: 60, rotationY: {(-22 if tone == 'r' else 22)}, transformPerspective: 1400 }}, {{ opacity: 1, y: 0, rotationY: 0, duration: 0.7, ease: 'power3.out' }}, {S['t']:.2f});")
        d.snd("swish", S["t"], 0.32)
        return f'''<div class="side {tone}" id="{sid}">{photo(S["img"], S.get("pos", "50% 35%"))}
          <div class="body"><div class="sdt">{esc(S["title"])}</div><div class="items">{items}</div>{ver}</div></div>'''
    vid = d.id("vs")
    d.j(f"tl.fromTo('#{vid}', {{ opacity: 0, scale: 0.3 }}, {{ opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2.5)' }}, {R['t']:.2f});")
    return scene(d, t0, t1, f'<div class="vs">{side(L, "r")}<div class="vsb" id="{vid}">{vline}</div>{side(R, "g")}</div>')

def steps_html(d, items, title=None, head_t=None, cls=""):
    out = []
    for k, (lb, sb, t, ic, tone) in enumerate(items):
        i = d.id("st")
        lead = f'<img class="sic" src="assets/ic-{ic}.png" />' if ic else f'<div class="snum {tone}">{k + 1}</div>'
        sub = f'<div class="hand ssb">{esc(sb)}</div>' if sb else ""
        out.append(f'<div class="step {tone}" id="{i}">{lead}<div class="stx"><div class="slb">{esc(lb)}</div>{sub}</div></div>')
        d.j(f"tl.fromTo('#{i}', {{ opacity: 0, scale: 0.6, y: 50 }}, {{ opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'back.out(2)' }}, {t:.2f});")
        d.snd("tick", t, 0.42); d.snd("pop", t + 0.02, 0.26)
    hd = ""
    if title:
        hid = d.id("hd"); hd = f'<div class="shead" id="{hid}">{esc(title)}</div>'
        d.j(f"tl.fromTo('#{hid}', {{ opacity: 0, y: -30, scaleX: 1.25 }}, {{ opacity: 1, y: 0, scaleX: 1, duration: 0.6, ease: 'power3.out' }}, {head_t:.2f});")
    return f'<div class="stk">{hd}<div class="steps n{len(items)} {cls}">{"".join(out)}</div></div>'

def layers(d, t0, t1, phases, cls=""):
    out = []
    for k, (inner, ts) in enumerate(phases):
        i = d.id("ly")
        out.append(f'<div class="layer" id="{i}">{inner}</div>')
        if k > 0:
            d.j(f"tl.fromTo('#{i}', {{ opacity: 0, scale: 0.94, filter: 'blur(18px)' }}, {{ opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.45 }}, {ts:.2f});")
            d.snd("soft-whoosh", ts, 0.28)
        if k + 1 < len(phases):
            d.j(f"tl.to('#{i}', {{ opacity: 0, scale: 1.05, filter: 'blur(18px)', duration: 0.3 }}, {phases[k + 1][1] - 0.25:.2f});")
    return scene(d, t0, t1, "".join(out), cls)

def myth(d, wrong, t_in, t_strike, right=None, t_right=None):
    i, s = d.id("my"), d.id("ms")
    d.j(f"slam('#{i}', {t_in:.2f});"); d.snd("thud", t_in, 0.42)
    d.j(f"tl.fromTo('#{s}', {{ scaleX: 0 }}, {{ scaleX: 1, duration: 0.35, ease: 'power2.inOut' }}, {t_strike:.2f}); tl.to('#{i}', {{ opacity: 0.4, duration: 0.2 }}, {t_strike + 0.35:.2f});")
    d.snd("stylo", t_strike, 0.4)
    out = f'<div class="myth" id="{i}"><div>{esc(wrong)}</div><div class="strike" id="{s}"></div></div>'
    if right:
        r = d.id("mr")
        d.j(f"slam('#{r}', {t_right:.2f});"); d.snd("validation", t_right, 0.42)
        out += f'<div class="myth ok" id="{r}"><div>{esc(right)}</div></div>'
    return f'<div class="mythbox">{out}</div>'

def quote(d, text_html, img, t, who=""):
    i = d.id("qt")
    d.j(f"tl.fromTo('#{i} .qcard', {{ opacity: 0, y: 80 }}, {{ opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }}, {t:.2f});")
    d.j(f"tl.fromTo('#{i} .qph', {{ opacity: 0, scale: 0.3 }}, {{ opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.6)' }}, {t + 0.2:.2f});")
    d.j(f"tl.fromTo('#{i} .hl', {{ '--hl-x': 0 }}, {{ '--hl-x': 1, duration: 0.4, stagger: 0.5 }}, {t + 1.0:.2f});")
    d.snd("page", t, 0.38)
    return f'<div class="qt" id="{i}"><div class="qph"><img src="assets/photo-{img}.jpg" /></div><div class="qcard"><div class="qm">“</div><div class="qtx">{text_html}</div><div class="hand qwho">{esc(who)}</div></div></div>'

def svg(inner, vb="0 0 960 760"):
    return f'<svg class="svgst" viewBox="{vb}" preserveAspectRatio="xMidYMid meet">{inner}</svg>'

def bigwords(d, words, sub=None, sub_t=None):
    """Mots géants (ambassa) qui s'abattent un par un : [(mot, t, ton)]"""
    out = []
    for w, t, tone in words:
        i = d.id("bw")
        out.append(f'<div class="bw {tone}" id="{i}">{esc(w)}</div>')
        d.j(f"tl.fromTo('#{i}', {{ opacity: 0, scale: 1.8, filter: 'blur(10px)' }}, {{ opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.3, ease: 'power4.in' }}, {t:.2f});")
        d.snd("bass-hit", t + 0.25, 0.4)
    s = ""
    if sub:
        i = d.id("bs"); s = f'<div class="hand bws" id="{i}">{esc(sub)}</div>'
        d.j(f"tl.fromTo('#{i}', {{ opacity: 0, y: 30 }}, {{ opacity: 1, y: 0, duration: 0.4 }}, {sub_t:.2f});")
    return f'<div class="bwbox">{"".join(out)}{s}</div>'

# ------------------------------------------------------------- couverture et titres
def cover(d, t1):
    i = d.id("cv")
    c1 = T("les fameuses cases à cocher"); c2 = T("au cœur de l'action")
    d.add(f'''<div class="scene clip cover" id="{i}" data-start="0" data-duration="{t1:.2f}" data-track-index="2" style="z-index: 30;">
      <div class="cvph"><img id="{i}img" src="assets/photo-couverture.jpg" /></div><div class="cvgrad"></div>
      <div class="radar" id="{i}r"><div class="rsweep" id="{i}sw"></div><div class="rring a"></div><div class="rring b"></div><div class="rring c"></div><div class="rblip" id="{i}b1"></div><div class="rblip" id="{i}b2"></div><div class="rblip" id="{i}b3"></div></div>
      <div class="cvlogo"><img src="assets/logo.png" /></div>
      <div class="cvtxt"><div class="kick">QHSE · TERRAIN · DÉCISION</div>
        <div class="cvt1">ANALYSE</div><div class="cvt2">DES RISQUES</div>
        <div class="hand cvsub">entendre les murmures avant le hurlement</div>
        <div class="cvchips"><div class="chip r" id="{i}k1">Cases à cocher<div class="strike" id="{i}ks"></div></div><div class="chip g" id="{i}k2">Au cœur de l'action</div></div></div></div>''')
    d.j(f"tl.fromTo('#{i}img', {{ scale: 1.0 }}, {{ scale: 1.16, duration: {t1:.2f}, ease: 'none' }}, 0);")
    d.j(f"tl.fromTo('#{i}sw', {{ rotation: 0 }}, {{ rotation: 720, duration: {t1:.2f}, ease: 'none' }}, 0);")
    for k, tb in enumerate([1.2, 4.6, 9.0]):
        d.j(f"tl.fromTo('#{i}b{k + 1}', {{ opacity: 0, scale: 0.2 }}, {{ opacity: 1, scale: 1, duration: 0.25, ease: 'back.out(3)' }}, {tb:.2f}); tl.to('#{i}b{k + 1}', {{ opacity: 0.25, duration: 1.4 }}, {tb + 0.3:.2f});")
        d.snd("tick", tb, 0.3)
    d.j(f"pop('#{i}k1', {c1:.2f}, {{ y: 40 }}); tl.fromTo('#{i}ks', {{ scaleX: 0 }}, {{ scaleX: 1, duration: 0.3 }}, {c1 + 1.6:.2f}); pop('#{i}k2', {c2:.2f}, {{ y: 40 }});")
    d.snd("pop", c1, 0.38); d.snd("stylo", c1 + 1.6, 0.38); d.snd("validation", c2, 0.4)
    d.j(f"blurOut('#{i}', {t1 - 0.3:.2f});"); d.snd("whoosh", t1 - 0.3, 0.32); d.snd("riser", 0.05, 0.18)

def chapter(d, n, title, sub, t0, t1, img):
    i = d.id("ch")
    d.add(f'''<div class="scene clip chap" id="{i}" data-start="{t0:.2f}" data-duration="{t1 - t0:.2f}" data-track-index="2" style="z-index: 22;">
      <div class="chph"><img src="assets/photo-{img}.jpg" /></div><div class="chveil"></div>
      <svg class="chsig" viewBox="0 0 1000 200" preserveAspectRatio="none"><path id="{i}sg" d="M 0 100 H 380 L 410 100 L 440 20 L 470 180 L 500 60 L 520 100 H 1000" fill="none" stroke="#4ADE80" stroke-width="4" /></svg>
      <div class="chnum">{n:02d}</div><div class="chcard"><div class="chk">PARTIE {n} / 5</div><div class="cht">{esc(title)}</div><div class="hand chs">{esc(sub)}</div></div>
      <div class="flash"></div></div>''')
    d.j(f"tl.fromTo('#{i} .flash', {{ opacity: 1 }}, {{ opacity: 0, duration: 0.5, ease: 'power2.out' }}, {t0:.2f});")
    d.j(f"tl.fromTo('#{i}sg', {{ strokeDasharray: 1300, strokeDashoffset: 1300 }}, {{ strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut' }}, {t0 + 0.1:.2f});")
    d.j(f"tl.fromTo('#{i} .chnum', {{ opacity: 0, scale: 1.6, scaleX: 1.9 }}, {{ opacity: 1, scale: 1, scaleX: 1, duration: 0.7, ease: 'power4.out' }}, {t0 + 0.35:.2f});")
    d.j(f"tl.fromTo('#{i} .chcard', {{ opacity: 0, x: 160 }}, {{ opacity: 1, x: 0, duration: 0.6, ease: 'back.out(1.5)' }}, {t0 + 0.7:.2f});")
    d.j(f"tl.fromTo('#{i} .chph img', {{ scale: 1.3 }}, {{ scale: 1.05, duration: {t1 - t0:.2f}, ease: 'none' }}, {t0:.2f});")
    d.j(f"blurOut('#{i}', {t1 - 0.3:.2f});")
    d.snd("deep-hit", t0, 0.5); d.snd("bass-hit", t0 + 0.35, 0.45); d.snd("whoosh", t1 - 0.3, 0.3)
    pulse(d, t0, 3.2)

# ------------------------------------------------------------- le film
def film(d):
    t = {}
    t["s1"] = T("Pourquoi ? Parce que")
    cover(d, t["s1"])

    # 1 · signes avant-coureurs : l'oscilloscope géant
    t["road"] = T("Allez, regardons rapidement")
    i = d.id("osc"); sg = T("perçoit les signes avant-coureurs"); cat = T("bien avant qu'une catastrophe")
    xs = [(260, sg - 1.2), (470, sg), (640, sg + 0.8)]
    blips = "".join(f'<g id="{i}b{k}"><circle cx="{x}" cy="300" r="20" fill="none" stroke="#F2C230" stroke-width="6" /><text x="{x}" y="250" text-anchor="middle" class="svc a">signe</text></g>' for k, (x, _) in enumerate(xs))
    for k, (x, tb) in enumerate(xs):
        d.j(f"tl.fromTo('#{i}b{k}', {{ opacity: 0, scale: 0.2, svgOrigin: '{x} 300' }}, {{ opacity: 1, scale: 1, svgOrigin: '{x} 300', duration: 0.35, ease: 'back.out(3)' }}, {tb:.2f});")
        d.snd("tick", tb, 0.45)
    d.j(f"tl.fromTo('#{i}l', {{ strokeDasharray: 2200, strokeDashoffset: 2200 }}, {{ strokeDashoffset: 0, duration: {cat - t['s1'] + 0.6:.2f}, ease: 'none' }}, {t['s1'] + 0.3:.2f});")
    d.j(f"tl.fromTo('#{i}x', {{ opacity: 0, scale: 0.3, svgOrigin: '850 300' }}, {{ opacity: 1, scale: 1, svgOrigin: '850 300', duration: 0.35, ease: 'power4.in' }}, {cat + 0.5:.2f});")
    d.snd("deep-hit", cat + 0.5, 0.5); pulse(d, sg, 2.8, None)
    xp = T("quarante années")
    d.j(f"pop('#{i}xp', {xp:.2f}, {{ y: 30 }});"); d.snd("pop", xp, 0.38)
    ec = T("d'écouter et de structurer")
    osc = svg(f'''<text x="480" y="80" text-anchor="middle" class="svh">Rarement une surprise totale</text>
        <g id="{i}xp"><rect x="300" y="110" width="360" height="60" rx="30" fill="#0E2A5C" stroke="#4ADE80" stroke-width="3" /><text x="480" y="150" text-anchor="middle" class="svc w">40 ans de terrain le prouvent</text></g>
        <path d="M 40 300 H 920" stroke="rgba(255,255,255,0.15)" stroke-width="2" />
        <path id="{i}l" d="M 40 300 H 230 L 245 300 L 255 280 L 265 320 L 275 300 H 440 L 455 300 L 465 262 L 478 336 L 490 300 H 610 L 625 300 L 635 240 L 650 360 L 662 300 H 800 L 815 300 L 830 120 L 850 480 L 868 300 H 920" fill="none" stroke="#4ADE80" stroke-width="7" stroke-linejoin="round" />
        {blips}
        <g id="{i}x"><circle cx="850" cy="300" r="70" fill="rgba(255,77,79,0.18)" stroke="#FF4D4F" stroke-width="6" /><text x="850" y="560" text-anchor="middle" class="svc r">catastrophe</text></g>''', "0 0 960 620")
    layers(d, t["s1"], t["road"], [
        (quote(d, 'Les accidents sont <span class="hl">rarement</span> des surprises <span class="hl">totales</span>.', "terrain", T("Les accidents qui arrivent"), "— ce que le terrain enseigne"), t["s1"]),
        (osc, xp - 0.4),
        (bigwords(d, [("ÉCOUTER", ec + 0.2, "g"), ("STRUCTURER", T("et de structurer") + 0.2, "w")], "ce qui est déjà visible", T("ce qui est déjà visible")), ec - 0.3),
    ])

    # 2 · feuille de route : 5 parties
    t["ch1"] = CHAP[1][0]
    scene(d, t["road"], t["ch1"], steps_html(d, [
        ("Au-delà de l'admin", "décision vs bureaucratie", T("D'abord, on ira"), None, "g"),
        ("Boîte à outils", "choisir la bonne méthode", T("ensuite, on ouvrira"), None, "w"),
        ("Matrice de criticité", "lire et décider", T("avant de décoder"), None, "a"),
        ("Démarche terrain", "les 7 étapes clés", T("On passera ensuite"), None, "w"),
        ("Erreurs coûteuses", "les pièges à éviter", T("les erreurs qui coûteraient"), None, "r"),
    ], "Feuille de route", t["road"] + 0.4, "road"))

    # ===== PARTIE 1
    t["p1"] = T("Soyons clairs")
    chapter(d, 1, "Au-delà de l'administration préventive", "décision vs bureaucratie", t["ch1"], t["p1"], "paperasse")
    t["obj"] = T("L'objectif, c'est d'anticiper")
    dr = T("ça donne à la direction"); op = T("ça donne aux opérateurs")
    layers(d, t["p1"], t["obj"], [
        (f'<div class="pc">{photo("paperasse", "50% 50%")}<div class="chips">{myth(d, "Une énième fiche Excel", t["p1"] + 0.6, T("perdue sur un serveur"))}</div></div>', t["p1"]),
        (f'''<div class="vs">{''.join([
            f'<div class="side g" id="dA">{photo("direction", "55% 40%")}<div class="body"><div class="sdt">La direction</div><div class="items">{chip(d, "Des arguments en béton", dr + 0.8, "sm g")}{chip(d, "pour décider", dr + 1.6, "sm w")}</div></div></div>',
            '<div class="vsb">+</div>',
            f'<div class="side g" id="dB">{photo("operatrice", "50% 25%")}<div class="body"><div class="sdt">Les opérateurs</div><div class="items">{chip(d, "De vraies raisons", op + 0.8, "sm g")}{chip(d, "de se protéger", op + 1.6, "sm w")}</div></div></div>'])}</div>''', dr - 0.3),
    ])
    d.j(f"tl.fromTo('#dA', {{ opacity: 0, rotationY: -25, transformPerspective: 1400 }}, {{ opacity: 1, rotationY: 0, duration: 0.6 }}, {dr:.2f}); tl.fromTo('#dB', {{ opacity: 0, rotationY: 25, transformPerspective: 1400 }}, {{ opacity: 1, rotationY: 0, duration: 0.6 }}, {op:.2f});")
    t["triade"] = T("Les outils ou les méthodes")
    layers(d, t["obj"], t["triade"], [
        (bigwords(d, [("TUER", T("de tuer"), "r"), ("POLLUER", T("de polluer"), "a"), ("RUINER", T("ou de ruiner"), "r")], "anticiper… avant que ça n'arrive", T("avant même que ça")), t["obj"]),
        (f'<div class="pc">{photo("paperasse", "40% 50%")}<div class="chips">{myth(d, "Sans conviction viscérale", T("Une démarche QHSE sans"), T("ce n'est rien d'autre"), "= paperasse stérile", T("de la paperasse stérile"))}</div></div>', T("Une démarche QHSE sans") - 0.3),
    ])
    pulse(d, T("de tuer"), 2.4)
    # la triade : triangle danger / probabilité / gravité
    t["ch2"] = CHAP[2][0]
    i = d.id("tri")
    V = [(480, 270, "DANGER", "Que peut-il se passer ?", T("Un : que peut-il"), "#4ADE80"), (170, 700, "PROBABILITÉ", "la vraisemblance", T("Deux : quelle est"), "#F2C230"), (790, 700, "GRAVITÉ", "les conséquences", T("Trois : si ça arrive"), "#FF6B6B")]
    g = f'<path id="{i}e" d="M 480 270 L 170 700 L 790 700 Z" fill="rgba(74,222,128,0.06)" stroke="rgba(255,255,255,0.5)" stroke-width="4" stroke-dasharray="14 10" />'
    for k, (x, y, a, b, tt, c) in enumerate(V):
        ty = y - 110 if k == 0 else y + 120
        g += f'''<g id="{i}v{k}"><circle cx="{x}" cy="{y}" r="74" fill="#0B2240" stroke="{c}" stroke-width="8" /><text x="{x}" y="{y + 26}" text-anchor="middle" class="svbig2" style="fill: {c};">{k + 1}</text>
          <text x="{x}" y="{ty}" text-anchor="middle" class="svw">{a}</text><text x="{x}" y="{ty + 44}" text-anchor="middle" class="svs">{b}</text></g>'''
        d.j(f"tl.fromTo('#{i}v{k}', {{ opacity: 0, scale: 0.2, svgOrigin: '{x} {y}' }}, {{ opacity: 1, scale: 1, svgOrigin: '{x} {y}', duration: 0.5, ease: 'back.out(2.2)' }}, {tt:.2f});")
        d.snd("bass-hit", tt, 0.4)
    an = T("cette triade restera")
    g += f'<g id="{i}c"><circle cx="480" cy="560" r="64" fill="#2E9B3E" /><text x="480" y="552" text-anchor="middle" class="svc w">point</text><text x="480" y="494" text-anchor="middle" class="svc w">d\'ancrage</text></g>'
    d.j(f"tl.fromTo('#{i}e', {{ strokeDashoffset: 0, opacity: 0 }}, {{ strokeDashoffset: -240, opacity: 1, duration: 3, ease: 'none' }}, {t['triade'] + 0.5:.2f}); tl.fromTo('#{i}c', {{ opacity: 0, scale: 0, svgOrigin: '480 560' }}, {{ opacity: 1, scale: 1, svgOrigin: '480 560', duration: 0.45, ease: 'back.out(3)' }}, {an:.2f});")
    d.snd("validation", an, 0.42)
    scene(d, t["triade"], t["ch2"], svg(f'<text x="480" y="40" text-anchor="middle" class="svh">3 questions fondamentales</text>{g}', "0 0 960 900"))

    # ===== PARTIE 2
    t["box"] = T("Si on fouille dans cette boîte")
    chapter(d, 2, "La boîte à outils QHSE", "choisir la bonne méthode", t["ch2"], t["box"], "chimie")
    t["scale"] = T("Ensuite, il est crucial")
    meth = [("HAZOP", "Risque élevé · chimie lourde", "Exhaustivité · mots-guides", "Lourd · équipe pluridisciplinaire", T("La HAZOP"), "chimie"),
            ("MOSAR", "Systèmes complexes", "Vision systémique", "Plus académique", T("MOSAR offre"), "ingenieur"),
            ("5 POURQUOI", "Post-incident, à chaud", "Simple et participatif", "S'arrêter trop tôt", T("la méthode des cinq pourquoi"), "groupe")]
    cards = ""
    for k, (nm, ap, fo, li, tt, img) in enumerate(meth):
        c = d.id("mt")
        cards += f'''<div class="mcard" id="{c}">{photo(img, "50% 40%")}<div class="mname">{nm}</div>
          <div class="mrow"><span class="mk">APPLICATION</span>{esc(ap)}</div><div class="mrow g"><span class="mk">FORCE</span>{esc(fo)}</div><div class="mrow r"><span class="mk">LIMITE</span>{esc(li)}</div></div>'''
        d.j(f"tl.fromTo('#{c}', {{ opacity: 0, y: 120, rotationX: -35, transformPerspective: 1600 }}, {{ opacity: 1, y: 0, rotationX: 0, duration: 0.7, ease: 'power3.out' }}, {tt:.2f});")
        d.snd("swish", tt, 0.35); d.snd("thud", tt + 0.4, 0.35)
    hd = d.id("hd")
    d.j(f"tl.fromTo('#{hd}', {{ opacity: 0, scaleX: 1.25 }}, {{ opacity: 1, scaleX: 1, duration: 0.6 }}, {t['box'] + 0.3:.2f});")
    scene(d, t["box"], t["scale"], f'<div class="stk"><div class="shead" id="{hd}">La boîte à outils</div><div class="mgrid">{cards}</div></div>')
    # cadran APR ⟷ AMDEC
    t["trees"] = T("Et pour cartographier")
    i = d.id("dial"); apr = T("l'APR, donne"); amd = T("on trouve l'AMDEC")
    d.j(f"tl.fromTo('#{i}k', {{ x: 0 }}, {{ x: 600, duration: 1.2, ease: 'power3.inOut' }}, {amd - 0.4:.2f});")
    d.j(f"tl.fromTo('#{i}a', {{ opacity: 0, y: 40 }}, {{ opacity: 1, y: 0, duration: 0.5 }}, {apr:.2f}); tl.to('#{i}a', {{ opacity: 0.35, duration: 0.4 }}, {amd - 0.3:.2f}); tl.fromTo('#{i}b', {{ opacity: 0, y: 40 }}, {{ opacity: 1, y: 0, duration: 0.5 }}, {amd + 0.4:.2f});")
    fgd = T("qui croise la fréquence")
    d.j(f"tl.fromTo('#{i}f', {{ opacity: 0, scale: 1.6, svgOrigin: '780 640' }}, {{ opacity: 1, scale: 1, svgOrigin: '780 640', duration: 0.3, ease: 'power4.in' }}, {fgd + 0.6:.2f}); tl.fromTo('#{i}c', {{ opacity: 0, scale: 1.6, svgOrigin: '780 735' }}, {{ opacity: 1, scale: 1, svgOrigin: '780 735', duration: 0.3, ease: 'power4.in' }}, {T('très chronophage'):.2f});")
    d.snd("cadenas", amd - 0.4, 0.38); d.snd("bass-hit", fgd + 0.6, 0.42); d.snd("tampon", T("très chronophage"), 0.45)
    ticks = "".join(f'<line x1="{180 + k * 60}" y1="330" x2="{180 + k * 60}" y2="{350 if k % 5 else 370}" stroke="rgba(255,255,255,0.4)" stroke-width="3" />' for k, _ in enumerate(range(11)))
    scene(d, t["scale"], t["trees"], svg(f'''<text x="480" y="60" text-anchor="middle" class="svh">Jongler entre les échelles</text>
        <text x="180" y="160" text-anchor="middle" class="svw">MACRO</text><text x="780" y="160" text-anchor="middle" class="svw">MICRO</text>
        <rect x="160" y="290" width="640" height="24" rx="12" fill="rgba(255,255,255,0.12)" />{ticks}
        <g id="{i}k"><circle cx="180" cy="302" r="44" fill="#4ADE80" stroke="#fff" stroke-width="6" /><circle cx="180" cy="302" r="12" fill="#0B2240" /></g>
        <g id="{i}a"><rect x="40" y="430" width="400" height="230" rx="26" fill="rgba(255,255,255,0.07)" stroke="#4ADE80" stroke-width="4" /><text x="240" y="500" text-anchor="middle" class="svbig2" style="fill: #4ADE80;">APR</text><text x="240" y="560" text-anchor="middle" class="svs">vision macro, très rapide</text><text x="240" y="610" text-anchor="middle" class="svs">tout en amont</text></g>
        <g id="{i}b"><rect x="520" y="430" width="400" height="230" rx="26" fill="rgba(255,255,255,0.07)" stroke="#F2C230" stroke-width="4" /><text x="720" y="500" text-anchor="middle" class="svbig2" style="fill: #F2C230;">AMDEC</text><text x="720" y="560" text-anchor="middle" class="svs">précision chirurgicale</text><text x="720" y="610" text-anchor="middle" class="svs">maintenance préventive</text></g>
        <g id="{i}f"><rect x="610" y="605" width="340" height="66" rx="16" fill="#0E2A5C" stroke="#F2C230" stroke-width="3" /><text x="780" y="650" text-anchor="middle" class="svw" style="font-size: 34px;">F × G × D</text></g>
        <g id="{i}c"><rect x="600" y="700" width="360" height="62" rx="12" fill="none" stroke="#FF6B6B" stroke-width="6" /><text x="780" y="743" text-anchor="middle" class="svc r">CHRONOPHAGE</text></g>''', "0 0 960 790"))
    # les arbres logiques
    t["ch3"] = CHAP[3][0]
    i = d.id("tr")
    def tree(x0, label, sub, tt, dirn, col):
        gid = f"{i}{dirn}"
        if dirn == "c":   # arbre des causes : de l'accident vers les causes (on remonte le temps)
            br = f'<path d="M {x0 + 130} 230 L {x0 + 40} 380 M {x0 + 130} 230 L {x0 + 220} 380 M {x0 + 40} 380 L {x0} 520 M {x0 + 40} 380 L {x0 + 80} 520 M {x0 + 220} 380 L {x0 + 180} 520 M {x0 + 220} 380 L {x0 + 260} 520" />'
            nodes = f'<rect x="{x0 + 70}" y="190" width="120" height="60" rx="10" fill="#FF4D4F" />' + "".join(f'<circle cx="{x}" cy="{y}" r="20" fill="{col}" />' for x, y in [(x0 + 40, 380), (x0 + 220, 380), (x0, 520), (x0 + 80, 520), (x0 + 180, 520), (x0 + 260, 520)])
            arr = f'<path d="M {x0 + 250} 600 H {x0 + 10} M {x0 + 40} 580 L {x0 + 10} 600 L {x0 + 40} 620" />'
        elif dirn == "d":  # arbre de défaillances : du scénario redouté vers les combinaisons
            br = f'<path d="M {x0 + 130} 250 V 300 M {x0 + 40} 300 H {x0 + 220} M {x0 + 40} 300 V 380 M {x0 + 220} 300 V 380 M {x0} 450 H {x0 + 80} M {x0 + 180} 450 H {x0 + 260} M {x0} 450 V 520 M {x0 + 80} 450 V 520 M {x0 + 180} 450 V 520 M {x0 + 260} 450 V 520" />'
            nodes = f'<rect x="{x0 + 60}" y="190" width="140" height="60" rx="10" fill="#FF4D4F" /><text x="{x0 + 130}" y="230" text-anchor="middle" class="svc w">PIRE</text>' + f'<path d="M {x0 + 10} 420 Q {x0 + 40} 370 {x0 + 70} 420 Z" fill="{col}" /><path d="M {x0 + 190} 420 Q {x0 + 220} 370 {x0 + 250} 420 Z" fill="{col}" />' + "".join(f'<circle cx="{x}" cy="540" r="20" fill="{col}" />' for x in [x0, x0 + 80, x0 + 180, x0 + 260])
            arr = f'<text x="{x0 + 130}" y="610" text-anchor="middle" class="svs">ET / OU</text>'
        else:             # arbre d'événements : de l'étincelle vers le futur
            br = f'<path d="M {x0 + 20} 380 L {x0 + 120} 380 L {x0 + 180} 280 M {x0 + 120} 380 L {x0 + 180} 480 M {x0 + 180} 280 L {x0 + 260} 230 M {x0 + 180} 280 L {x0 + 260} 320 M {x0 + 180} 480 L {x0 + 260} 440 M {x0 + 180} 480 L {x0 + 260} 530" />'
            nodes = f'<text x="{x0 + 10}" y="400" text-anchor="middle" style="font-size: 64px;">✦</text>' + "".join(f'<circle cx="{x0 + 260}" cy="{y}" r="18" fill="{col}" />' for y in [230, 320, 440, 530])
            arr = f'<path d="M {x0 + 10} 600 H {x0 + 250} M {x0 + 220} 580 L {x0 + 250} 600 L {x0 + 220} 620" />'
        d.j(f"tl.fromTo('#{gid}', {{ opacity: 0.12 }}, {{ opacity: 1, duration: 0.4 }}, {tt:.2f}); tl.fromTo('#{gid} .br path', {{ strokeDasharray: 1600, strokeDashoffset: 1600 }}, {{ strokeDashoffset: 0, duration: 1.4, ease: 'power2.out' }}, {tt:.2f});")
        d.snd("stylo", tt, 0.32)
        return f'''<g id="{gid}"><text x="{x0 + 130}" y="130" text-anchor="middle" class="svw" style="font-size: 30px;">{label}</text><text x="{x0 + 130}" y="168" text-anchor="middle" class="svs" style="font-size: 30px;">{sub}</text>
          <g class="br" fill="none" stroke="{col}" stroke-width="6" stroke-linecap="round">{br}</g>{nodes}<g fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="5" stroke-linecap="round">{arr}</g></g>'''
    trees = tree(30, "ARBRE DES CAUSES", "on remonte le temps", T("L'arbre des causes"), "c", "#4ADE80") + tree(350, "DÉFAILLANCES", "du pire scénario", T("L'arbre de défaillances"), "d", "#F2C230") + tree(670, "ÉVÉNEMENTS", "vers le futur", T("Et l'arbre des événements"), "e", "#7DD3FC")
    scene(d, t["trees"], t["ch3"], svg(f'<text x="480" y="56" text-anchor="middle" class="svh">Les arbres logiques</text>{trees}', "0 0 960 640"))

    # ===== PARTIE 3
    t["eq"] = T("Alors, voici la fameuse")
    chapter(d, 3, "Décoder la matrice de criticité", "lire et décider", t["ch3"], t["eq"], "matrice")
    t["mx"] = T("Si on croise un événement")
    i = d.id("fx")
    d.j(f"tl.fromTo('#{i} .fa', {{ opacity: 0, x: -200 }}, {{ opacity: 1, x: 0, duration: 0.4 }}, {T('la criticité est égale'):.2f}); tl.fromTo('#{i} .fb', {{ opacity: 0, scale: 1.6 }}, {{ opacity: 1, scale: 1, duration: 0.3, ease: 'power4.in' }}, {T('à la probabilité'):.2f}); tl.fromTo('#{i} .fc', {{ opacity: 0, scale: 1.6 }}, {{ opacity: 1, scale: 1, duration: 0.3, ease: 'power4.in' }}, {T('par la gravité'):.2f});")
    d.snd("thud", T("la criticité est égale"), 0.42); d.snd("thud", T("à la probabilité"), 0.42); d.snd("bass-hit", T("par la gravité"), 0.48)
    layers(d, t["eq"], t["mx"], [
        (f'<div class="fx" id="{i}"><div class="hand fxk">l\'équation universelle</div><div class="fxrow"><span class="fa">C</span><span class="fb"> = P</span><span class="fc"> × G</span></div><div class="fxleg"><span>Criticité</span><span>Probabilité</span><span>Gravité</span></div></div>', t["eq"]),
        (myth(d, "La formule décide à notre place", T("ce qu'il faut absolument"), T("pas les décisions"), "L'intelligence humaine interprète", T("c'est bien l'intelligence")), T("ce qu'il faut absolument") - 0.3),
    ])
    # la matrice 5 × 5 vivante
    t["ch4"] = CHAP[4][0]
    i = d.id("mx")
    cells = ""
    def col(v):
        return "#2E9B3E" if v <= 4 else "#9BC53D" if v <= 6 else "#F2C230" if v <= 12 else "#F28C28" if v <= 16 else "#E5484D"
    order = []
    for r in range(5):          # r = gravité (bas = faible)
        for c in range(5):      # c = probabilité
            p, gv = c + 1, 5 - r
            v = p * gv
            x, y = 200 + c * 140, 110 + r * 120
            cid = f"{i}c{p}{gv}"
            cells += f'<g id="{cid}"><rect x="{x}" y="{y}" width="130" height="110" rx="14" fill="{col(v)}" /><text x="{x + 65}" y="{y + 70}" text-anchor="middle" class="svw" style="font-size: 40px;">{v}</text></g>'
            order.append((p + gv, cid))
    order.sort()
    tm = t["mx"] - 0.2
    for k, (_, cid) in enumerate(order):
        d.j(f"tl.fromTo('#{cid}', {{ opacity: 0, scale: 0.3, transformOrigin: '50% 50%' }}, {{ opacity: 1, scale: 1, duration: 0.25, ease: 'back.out(2)' }}, {tm + 0.25 + k * 0.03:.2f});")
    d.snd("tick", tm + 0.3, 0.35); d.snd("tick", tm + 0.6, 0.35); d.snd("tick", tm + 0.9, 0.35)
    neg = T("le risque est négligeable"); red = T("tous les voyants")
    d.j(f"tl.fromTo('#{i}n', {{ opacity: 0, scale: 0.5, svgOrigin: '100 665' }}, {{ opacity: 1, scale: 1, svgOrigin: '100 665', duration: 0.4, ease: 'back.out(2.5)' }}, {neg:.2f});")
    d.j(f"tl.fromTo('#{i}r', {{ opacity: 0, scale: 0.5, svgOrigin: '890 30' }}, {{ opacity: 1, scale: 1, svgOrigin: '890 30', duration: 0.4, ease: 'back.out(2.5)' }}, {red:.2f}); tl.fromTo('#{i}c55 rect', {{ fill: '#E5484D' }}, {{ fill: '#FF1F2D', duration: 0.18, yoyo: true, repeat: 7 }}, {red:.2f});")
    d.snd("ding", neg, 0.4); d.snd("deep-hit", red, 0.5); pulse(d, red, 3.0)
    jh = T("c'est le jugement humain")
    d.j(f"pop('#{i}j', {jh:.2f}, {{ y: 30 }});"); d.snd("validation", jh, 0.4)
    scene(d, t["mx"], t["ch4"], svg(f'''<text x="550" y="70" text-anchor="middle" class="svh">Matrice de criticité</text>{cells}
        <text x="60" y="420" text-anchor="middle" class="svs" transform="rotate(-90 60 420)">GRAVITÉ →</text><text x="550" y="760" text-anchor="middle" class="svs">PROBABILITÉ →</text>
        <g id="{i}n"><rect x="10" y="642" width="180" height="46" rx="23" fill="#0B2240" stroke="#4ADE80" stroke-width="3" /><text x="100" y="674" text-anchor="middle" class="svc g">négligeable</text></g>
        <g id="{i}r"><rect x="800" y="8" width="180" height="46" rx="23" fill="#FF4D4F" /><text x="890" y="40" text-anchor="middle" class="svc w">ROUGE VIF</text><path d="M 825 54 L 825 104" stroke="#FF4D4F" stroke-width="5" /></g>
        <g id="{i}j"><rect x="150" y="780" width="800" height="60" rx="30" fill="#0E2A5C" stroke="#4ADE80" stroke-width="3" /><text x="550" y="820" text-anchor="middle" class="svc w">le jugement humain déclenche l'action</text></g>''', "0 0 1000 850"))

    # ===== PARTIE 4
    t["id"] = T("La toute première phase")
    chapter(d, 4, "La démarche sur le terrain", "les 7 étapes clés", t["ch4"], t["id"], "chantier")
    t["act"] = T("Ensuite, on passe à l'action")
    scene(d, t["id"], t["act"], steps_html(d, [
        ("Périmètre", "des frontières nettes", T("définir un périmètre"), "cible", "g"),
        ("Groupe de travail", "avec les opérateurs", T("on monte un groupe"), "equipe", "g"),
        ("Collecte", "schémas et historiques", T("On collecte"), "classeur", "w"),
        ("Dangers", "sans aucune autocensure", T("on identifie absolument"), "danger", "a"),
    ], "Phase 1 · Identification", t["id"] + 0.3, "path"))
    t["p5"] = CHAP[5][0]
    i = d.id("act")
    ev = T("On évalue d'abord"); rs = T("puis le risque résiduel"); dc = T("on classe et on décide"); mj = T("de tout documenter"); mo = T("Une analyse figée")
    d.j(f"tl.fromTo('#{i}g', {{ rotation: -80, svgOrigin: '200 330' }}, {{ rotation: 60, svgOrigin: '200 330', duration: 0.8, ease: 'power3.out' }}, {ev + 0.5:.2f}); tl.to('#{i}g', {{ rotation: -30, svgOrigin: '200 330', duration: 0.9, ease: 'elastic.out(1, 0.5)' }}, {rs + 0.4:.2f});")
    d.j(f"tl.fromTo('#{i}A', {{ opacity: 0.15 }}, {{ opacity: 1, duration: 0.4 }}, {ev:.2f}); tl.fromTo('#{i}B', {{ opacity: 0.15 }}, {{ opacity: 1, duration: 0.4 }}, {dc:.2f}); tl.fromTo('#{i}C', {{ opacity: 0.15 }}, {{ opacity: 1, duration: 0.4 }}, {mj:.2f});")
    d.j(f"tl.fromTo('#{i}f1', {{ strokeDasharray: 400, strokeDashoffset: 400 }}, {{ strokeDashoffset: 0, duration: 0.5 }}, {T('inacceptable, on agit'):.2f}); tl.fromTo('#{i}f2', {{ strokeDasharray: 400, strokeDashoffset: 400 }}, {{ strokeDashoffset: 0, duration: 0.5 }}, {T('faible, on garde'):.2f});")
    d.j(f"tl.fromTo('#{i}cy', {{ rotation: 0, svgOrigin: '820 330' }}, {{ rotation: 360, svgOrigin: '820 330', duration: 4, ease: 'none' }}, {mj:.2f}); tl.fromTo('#{i}m', {{ opacity: 0, scale: 1.8, svgOrigin: '480 690' }}, {{ opacity: 1, scale: 1, svgOrigin: '480 690', duration: 0.3, ease: 'power4.in' }}, {T('une analyse morte'):.2f});")
    d.snd("riser", ev, 0.2); d.snd("cadenas", rs + 0.4, 0.38); d.snd("thud", T("inacceptable, on agit"), 0.45); d.snd("pop", T("faible, on garde"), 0.38); d.snd("tampon", T("une analyse morte"), 0.5)
    scene(d, t["act"], t["p5"], svg(f'''<text x="480" y="60" text-anchor="middle" class="svh">Phase 2 · Action</text>
        <g id="{i}A"><text x="200" y="150" text-anchor="middle" class="svw">ÉVALUER</text><path d="M 70 330 A 130 130 0 0 1 330 330" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="28" /><path d="M 70 330 A 130 130 0 0 1 200 200" fill="none" stroke="#4ADE80" stroke-width="28" /><path d="M 200 200 A 130 130 0 0 1 330 330" fill="none" stroke="#FF6B6B" stroke-width="28" />
          <g id="{i}g"><line x1="200" y1="330" x2="200" y2="225" stroke="#fff" stroke-width="10" stroke-linecap="round" /></g><circle cx="200" cy="330" r="18" fill="#fff" /><text x="200" y="400" text-anchor="middle" class="svs">brut → résiduel</text></g>
        <g id="{i}B"><text x="480" y="150" text-anchor="middle" class="svw">DÉCIDER</text><circle cx="480" cy="250" r="34" fill="#0E2A5C" stroke="#fff" stroke-width="5" />
          <path id="{i}f1" d="M 480 284 L 400 380" stroke="#FF6B6B" stroke-width="10" fill="none" stroke-linecap="round" /><path id="{i}f2" d="M 480 284 L 560 380" stroke="#4ADE80" stroke-width="10" fill="none" stroke-linecap="round" />
          <text x="390" y="420" text-anchor="middle" class="svc r">inacceptable</text><text x="390" y="452" text-anchor="middle" class="svs">→ agir</text><text x="575" y="420" text-anchor="middle" class="svc g">faible</text><text x="575" y="452" text-anchor="middle" class="svs">→ surveiller</text></g>
        <g id="{i}C"><text x="820" y="150" text-anchor="middle" class="svw">METTRE À JOUR</text><g id="{i}cy"><path d="M 820 230 A 100 100 0 1 1 720 330" fill="none" stroke="#4ADE80" stroke-width="16" stroke-linecap="round" /><path d="M 700 300 L 720 340 L 750 310" fill="none" stroke="#4ADE80" stroke-width="14" stroke-linecap="round" /></g><text x="820" y="345" text-anchor="middle" style="font-size: 54px;">📄</text><text x="820" y="470" text-anchor="middle" class="svs">documenter en continu</text></g>
        <g id="{i}m"><rect x="230" y="640" width="500" height="90" rx="16" fill="none" stroke="#FF6B6B" stroke-width="8" /><text x="480" y="700" text-anchor="middle" class="svbig2" style="fill: #FF6B6B; font-size: 46px;">FIGÉE = MORTE</text></g>''', "0 0 960 760"))

    # ===== PARTIE 5
    t["gg"] = T("Prétendre analyser les risques")
    chapter(d, 5, "Les erreurs qui coûtent cher", "les pièges à éviter", t["p5"], t["gg"], "fumees")
    t["comb"] = T("Une autre erreur fatale")
    versus(d, t["gg"], t["comb"],
           dict(title="Depuis un fauteuil", img="manuel", pos="50% 50%", t=t["gg"] + 0.3, items=[("Bien au chaud", T("bien au chaud") + 0.2)], verdict=("INCOMPLET", T("dangereusement incomplet"), "r")),
           dict(title="Genchi genbutsu", img="terrain", pos="60% 40%", t=T("le genchi genbutsu") - 0.2, items=[("Aller sur place", T("aller sur place")), ("Se salir les bottes", T("se salir un peu")), ("La vraie réalité du site", T("affronter la vraie"))]),
           vline="→")
    # risques combinés
    t["opt"] = T("Et puis, il y a l'excès")
    i = d.id("cb"); r1 = T("Gérer un seul danger"); r2 = T("si deux dangers"); r3 = T("Et trois en même")
    d.j(f"tl.fromTo('#{i}1', {{ opacity: 0, scale: 0.3, svgOrigin: '480 380' }}, {{ opacity: 1, scale: 1, svgOrigin: '480 380', duration: 0.5, ease: 'back.out(2)' }}, {r1:.2f}); tl.fromTo('#{i}2', {{ opacity: 0, x: 200 }}, {{ opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }}, {r2:.2f}); tl.fromTo('#{i}3', {{ opacity: 0, y: -200 }}, {{ opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }}, {r3:.2f});")
    d.j(f"tl.to('#{i}core', {{ opacity: 1, duration: 0.2, yoyo: true, repeat: 9 }}, {r3 + 0.6:.2f}); tl.fromTo('#{i}t1', {{ opacity: 0 }}, {{ opacity: 1, duration: 0.3 }}, {r1 + 0.6:.2f}); tl.fromTo('#{i}t2', {{ opacity: 0 }}, {{ opacity: 1, duration: 0.3 }}, {r2 + 1.6:.2f}); tl.fromTo('#{i}t3', {{ opacity: 0, scale: 1.6, svgOrigin: '480 760' }}, {{ opacity: 1, scale: 1, svgOrigin: '480 760', duration: 0.3, ease: 'power4.in' }}, {T('une urgence vitale'):.2f});")
    d.snd("pop", r1, 0.4); d.snd("swish", r2, 0.38); d.snd("tension", r2 + 0.5, 0.22); d.snd("deep-hit", r3, 0.5); d.snd("bass-hit", T("une urgence vitale"), 0.5); pulse(d, T("une urgence vitale"), 3.2)
    scene(d, t["comb"], t["opt"], svg(f'''<text x="480" y="60" text-anchor="middle" class="svh">Les risques combinés</text>
        <g style="mix-blend-mode: screen;"><circle id="{i}1" cx="400" cy="420" r="190" fill="rgba(74,222,128,0.45)" /><circle id="{i}2" cx="580" cy="420" r="190" fill="rgba(242,194,48,0.45)" /><circle id="{i}3" cx="490" cy="270" r="190" fill="rgba(255,77,79,0.5)" /></g>
        <circle id="{i}core" cx="490" cy="370" r="46" fill="#FF1F2D" opacity="0" />
        <text id="{i}t1" x="250" y="660" text-anchor="middle" class="svs">1 danger : faisable</text><text id="{i}t2" x="720" y="660" text-anchor="middle" class="svs">2 : imprévisible</text>
        <g id="{i}t3"><rect x="250" y="715" width="460" height="74" rx="18" fill="#FF4D4F" /><text x="480" y="766" text-anchor="middle" class="svw">3 : URGENCE VITALE</text></g>''', "0 0 960 810"))
    # biais d'optimisme
    t["bar"] = T("Il faut aussi faire une distinction")
    layers(d, t["opt"], t["bar"], [
        (f'<div class="pc">{photo("couverture", "50% 50%")}<div class="chips">{myth(d, "« Ça n arrivera jamais chez nous »".replace("n arrivera", "n\'arrivera"), T("ça n'arrivera jamais"), T("est un biais cognitif"), "Un biais cognitif terrible", T("est un biais cognitif") + 0.6)}</div></div>', t["opt"]),
        (bigwords(d, [("JUSTE AVANT", T("juste avant que tout"), "w"), ("QUE TOUT SAUTE", T("ne saute") - 0.1, "r")]), T("C'est glaçant d'y penser")),
    ])
    pulse(d, T("ne saute"), 3.0)
    # espoir vs barrière
    t["plan"] = T("Et puis, produire un superbe")
    versus(d, t["bar"], t["plan"],
           dict(title="Un espoir", img="paperasse", pos="50% 50%", t=T("une consigne imprimée") - 0.3, items=[("Consigne collée au mur", T("collée sur un mur")), ("Formation d'il y a 3 ans", T("une formation qu'on"))], verdict=("FAUX ESPOIR", T("faux espoir administratif"), "r")),
           dict(title="Une vraie barrière", img="detecteur", pos="50% 40%", t=T("Une véritable barrière"), items=[("Soupape calibrée", T("une soupape physiquement")), ("Testée régulièrement", T("régulièrement testée"))], verdict=("DÉFENSE SOLIDE", T("une défense solide"), "g")))
    # le plan d'action qui doit vivre
    t["sig"] = T("Tout ça nous ramène")
    i = d.id("pl"); ng = T("une preuve accablante")
    rows = ""
    for k, (lb, st) in enumerate([("Action 1", "—"), ("Action 2", "—"), ("Action 3", "—"), ("Risque identifié", "AUCUNE MESURE")]):
        y = 230 + k * 100
        rows += f'<g id="{i}r{k}"><rect x="140" y="{y}" width="680" height="80" rx="14" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.25)" stroke-width="2" /><rect x="170" y="{y + 22}" width="36" height="36" rx="6" fill="none" stroke="#fff" stroke-width="4" /><text x="230" y="{y + 52}" class="svc w">{lb}</text><text x="790" y="{y + 52}" text-anchor="end" class="svc {"r" if k == 3 else "w"}">{st}</text></g>'
        d.j(f"tl.fromTo('#{i}r{k}', {{ opacity: 0, x: -80 }}, {{ opacity: 1, x: 0, duration: 0.35 }}, {t['plan'] + 0.4 + k * 0.25:.2f});")
    vv = T("c'est fait pour vivre")
    d.j(f"tl.fromTo('#{i}n', {{ opacity: 0, scale: 2, svgOrigin: '480 690' }}, {{ opacity: 1, scale: 1, rotation: -4, svgOrigin: '480 690', duration: 0.3, ease: 'power4.in' }}, {ng:.2f}); tl.to('#{i}n', {{ opacity: 0, duration: 0.3 }}, {vv - 0.3:.2f});")
    for k in range(3):
        d.j(f"tl.fromTo('#{i}k{k}', {{ opacity: 0, scale: 0, svgOrigin: '188 {248 + k * 100}' }}, {{ opacity: 1, scale: 1, svgOrigin: '188 {248 + k * 100}', duration: 0.3, ease: 'back.out(3)' }}, {vv + 0.3 + k * 0.3:.2f});")
        d.snd("validation", vv + 0.3 + k * 0.3, 0.35)
    d.snd("tampon", ng, 0.55)
    checks = "".join(f'<path id="{i}k{k}" d="M 176 {246 + k * 100} L 186 {258 + k * 100} L 204 {236 + k * 100}" fill="none" stroke="#4ADE80" stroke-width="7" stroke-linecap="round" />' for k in range(3))
    scene(d, t["plan"], t["sig"], svg(f'''<text x="480" y="80" text-anchor="middle" class="svh">Le plan d'action</text><text x="480" y="140" text-anchor="middle" class="svs">piloté, ou rien</text>{rows}{checks}
        <g id="{i}n"><rect x="200" y="640" width="560" height="100" rx="16" fill="rgba(11,34,64,0.9)" stroke="#FF6B6B" stroke-width="10" /><text x="480" y="708" text-anchor="middle" class="svbig2" style="fill: #FF6B6B; font-size: 52px;">NÉGLIGENCE</text></g>''', "0 0 960 780"))
    # murmures → hurlement
    t["q"] = T("Alors, la question que")
    i = d.id("wv"); mm = T("ces petits murmures"); hu = T("en hurlement")
    bars = ""
    for k in range(40):
        x = 60 + k * 21
        bars += f'<rect class="wb" x="{x}" y="0" width="12" height="1" rx="6" fill="#4ADE80" style="--k: {k};" />'
    d.j(f"tl.set('#{i} .wb', {{ attr: {{ y: 395, height: 10 }} }}, 0);")
    d.j(f"tl.to('#{i} .wb', {{ attr: {{ y: (k) => 395 - (16 + 14 * Math.abs(Math.sin(k * 1.7))), height: (k) => 2 * (16 + 14 * Math.abs(Math.sin(k * 1.7))) }}, duration: 0.6, stagger: 0.02 }}, {mm:.2f});")
    d.j(f"tl.to('#{i} .wb', {{ attr: {{ y: (k) => 395 - (60 + 160 * Math.abs(Math.sin(k * 0.9 + 1))), height: (k) => 2 * (60 + 160 * Math.abs(Math.sin(k * 0.9 + 1))) }}, fill: '#FF4D4F', duration: 0.5, stagger: 0.01, ease: 'power4.in' }}, {hu - 0.2:.2f});")
    d.j(f"tl.fromTo('#{i}m', {{ opacity: 0, scaleX: 1.6, svgOrigin: '480 200' }}, {{ opacity: 1, scaleX: 1, svgOrigin: '480 200', duration: 0.8 }}, {mm:.2f}); tl.fromTo('#{i}h', {{ opacity: 0, scale: 2.2, svgOrigin: '480 720' }}, {{ opacity: 1, scale: 1, svgOrigin: '480 720', duration: 0.3, ease: 'power4.in' }}, {hu:.2f});")
    d.snd("soft-whoosh", mm, 0.25); d.snd("deep-hit", hu, 0.55); d.snd("bass-hit", hu + 0.05, 0.45); pulse(d, hu, 3.4, "#FF4D4F")
    sgn = T("pour que ce signe")
    layers(d, t["sig"], t["q"], [
        (f'<div class="pc">{photo("operatrice", "50% 25%")}<div class="chips">{chip(d, "Une inquiétude non formulée", T("L'inquiétude qu'un opérateur"), "a", "haut-parleur")}{chip(d, "Un classeur que personne n'ouvre", T("ou ce gros classeur"), "w", "classeur")}</div></div>', sgn - 0.2),
        (svg(f'''<text x="480" y="90" text-anchor="middle" class="svh">Capter les murmures</text><g id="{i}">{bars}</g>
            <text id="{i}m" x="480" y="200" text-anchor="middle" class="svw">murmures</text>
            <g id="{i}h"><text x="480" y="740" text-anchor="middle" class="svbig2" style="fill: #FF4D4F;">HURLEMENT</text></g>''', "0 0 960 780"), mm - 0.4),
    ])
    # question finale : le signe ou la sirène
    i = d.id("fin"); sv = T("le signe a-t-il été vu"); sr = T("la sirène d'alarme")
    d.j(f"tl.fromTo('#{i}a', {{ opacity: 0, x: -200 }}, {{ opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }}, {sv:.2f}); tl.fromTo('#{i}b', {{ opacity: 0, x: 200 }}, {{ opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }}, {sr - 0.6:.2f});")
    d.j(f"tl.fromTo('#{i}s', {{ rotation: 0 }}, {{ rotation: 1440, duration: 3.2, ease: 'none' }}, {sr - 0.4:.2f}); tl.fromTo('#{i}glow', {{ opacity: 0 }}, {{ opacity: 0.85, duration: 0.25, yoyo: true, repeat: 9 }}, {sr - 0.3:.2f});")
    d.snd("tension", sr - 0.6, 0.3); d.snd("deep-hit", sr, 0.5); pulse(d, sr, 4.0, "#FF4D4F")
    scene(d, t["q"], END_VOICE + 0.2, f'''<div class="final"><div class="glowred" id="{i}glow"></div>
        <div class="fq g" id="{i}a"><img src="assets/ic-yeux.png" /><span>Le signe a-t-il été <em>vu</em> ?</span></div>
        <div class="siren"><div class="sbeam" id="{i}s"></div><div class="sbulb"></div><div class="sbase"></div></div>
        <div class="fq r" id="{i}b"><img src="assets/ic-sirene.png" /><span>…ou attend-on la <em>sirène</em> ?</span></div></div>''')
    e = d.id("end")
    d.add(f'''<div class="scene clip endc" id="{e}" data-start="{END_VOICE:.2f}" data-duration="{DUR - END_VOICE:.2f}" data-track-index="4" style="z-index: 40;">
      <img src="assets/logo.png" class="endlogo" /><div class="endtag">Des normes aujourd'hui,<br /><span>un avenir durable demain</span></div></div>''')
    d.j(f"tl.fromTo('#{e} .endlogo', {{ opacity: 0, scale: 0.8 }}, {{ opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.6)' }}, {END_VOICE + 0.05:.2f}); tl.fromTo('#{e} .endtag', {{ opacity: 0, y: 30 }}, {{ opacity: 1, y: 0, duration: 0.4 }}, {END_VOICE + 0.4:.2f});")
    d.snd("signature-marque", END_VOICE, 0.5)

# ------------------------------------------------------------- sous-titres
def captions(d):
    out = []
    for k, c in enumerate(CH):
        s = W[c[0]]["t"]
        e = W[CH[k + 1][0]]["t"] if k + 1 < len(CH) else END_VOICE
        mode = CHAP[chap_of(s)][1]
        ws = []
        for j in c:
            w = W[j]; cls = {"!": " r", "*": " g"}.get(w["m"], "")
            ws.append(f'<span class="w{cls}" data-t="{w["t"]:.2f}">{esc(w["w"])}</span>')
        out.append(f'<div class="clip cap {mode}" id="cap{k}" data-start="{s - 0.05:.2f}" data-duration="{max(0.2, e - s):.2f}" data-track-index="9"><div class="capin">{" ".join(ws)}</div></div>')
    d.add('<div id="caps">' + "\n".join(out) + "</div>")

# ------------------------------------------------------------- fond, logo, ligne de signal
def chrome(d):
    d.add(f'<div class="clip bgl" id="bg" data-start="0" data-duration="{DUR}" data-track-index="0"><div class="grid" id="grid"></div><div class="glow g1" id="g1"></div><div class="glow g2" id="g2"></div><div class="vign"></div></div>')
    d.j(f"tl.fromTo('#grid', {{ backgroundPosition: '0px 0px' }}, {{ backgroundPosition: '0px 1360px', duration: {DUR}, ease: 'none' }}, 0);")
    d.j(f"tl.fromTo('#g1', {{ x: 0, y: 0 }}, {{ x: 300, y: 200, duration: {DUR / 4:.1f}, yoyo: true, repeat: 3, ease: 'sine.inOut' }}, 0); tl.fromTo('#g2', {{ x: 0, y: 0 }}, {{ x: -260, y: -180, duration: {DUR / 6:.1f}, yoyo: true, repeat: 5, ease: 'sine.inOut' }}, 0);")
    cv_end = T("Pourquoi ? Parce que")
    d.add(f'<div class="clip hdr" id="hdr" data-start="{cv_end - 0.3:.2f}" data-duration="{END_VOICE - cv_end + 0.3:.2f}" data-track-index="1"><div class="hlogo"><img src="assets/logo.png" /></div></div>')
    # ligne d'oscilloscope continue : motif de battement répété, défilement linéaire sur tout le film
    per = 300; n = 70
    seg = "".join(f"L {k * per + 120} 70 L {k * per + 132} 52 L {k * per + 144} 92 L {k * per + 156} 70 L {k * per + per} 70 " for k in range(n))
    labels = ["Admin", "Outils", "Matrice", "Terrain", "Erreurs"]
    marks = "".join(f'<div class="smk" id="sm{k}" style="--k: {k};"><i></i><span>{l}</span></div>' for k, l in enumerate(labels))
    d.add(f'''<div class="clip sig" id="sig" data-start="{cv_end:.2f}" data-duration="{END_VOICE - cv_end:.2f}" data-track-index="3">
      <div class="sigwin"><svg class="sigsvg" viewBox="0 0 2400 140" preserveAspectRatio="none"><g id="sigw" style="transform-origin: 0 70px;"><path id="sigp" d="M 0 70 {seg}" fill="none" stroke="#4ADE80" stroke-width="5" stroke-linejoin="round" /></g></svg><div class="sigfade"></div></div>
      <div class="smarks">{marks}</div></div>''')
    d.j(f"tl.fromTo('#sig', {{ opacity: 0 }}, {{ opacity: 1, duration: 0.6 }}, {cv_end:.2f}); tl.fromTo('#sigp', {{ x: 0 }}, {{ x: -{per * (n - 9)}, duration: {END_VOICE - cv_end:.2f}, ease: 'none' }}, {cv_end:.2f});")
    for k in range(5):
        s = CHAP[k + 1][0]
        d.j(f"tl.to('#sm{k}', {{ opacity: 1, color: '#4ADE80', duration: 0.3 }}, {s + 0.3:.2f}); tl.fromTo('#sm{k} i', {{ scale: 1 }}, {{ scale: 1.8, duration: 0.25, yoyo: true, repeat: 1, backgroundColor: '#4ADE80' }}, {s + 0.3:.2f}); tl.set('#sm{k} i', {{ backgroundColor: '#4ADE80' }}, {s + 0.85:.2f});")

def build(fmt, out_dir):
    d = Doc(fmt)
    chrome(d); film(d); captions(d)
    durs = {}
    def fdur(n):
        if n not in durs:
            durs[n] = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f"assets/sfx-{n}.wav"]))
        return durs[n]
    free, aud = {}, []
    for k, (n, t, v) in enumerate(sorted(d.sfx, key=lambda x: x[1])):
        if t < 0 or t > DUR - 0.1: continue
        dd = min(fdur(n), 3.0, DUR - t - 0.01)
        tr = next(x for x in range(20, 70) if free.get(x, -1) <= t)
        free[tr] = t + dd + 0.01
        aud.append(f'<audio class="clip" id="sfx{k}" src="assets/sfx-{n}.wav" data-start="{t}" data-duration="{dd:.2f}" data-volume="{v}" data-track-index="{tr}"></audio>')
    w, h = (1080, 1920) if fmt == "P" else (1920, 1080)
    tpl = open("src/template.html", encoding="utf-8").read()
    page = (tpl.replace("{{W}}", str(w)).replace("{{H}}", str(h)).replace("{{FMT}}", fmt).replace("{{DUR}}", f"{DUR}")
               .replace("{{BODY}}", "\n".join(d.html)).replace("{{AUDIO}}", "\n".join(aud)).replace("/*JS*/", "\n".join(d.js)))
    os.makedirs(out_dir, exist_ok=True)
    open(os.path.join(out_dir, "index.html"), "w", encoding="utf-8").write(page)
    return len(d.html), len(aud)

if __name__ == "__main__":
    print("9:16", build("P", "."))
    other = "../analyse-risques-qhse-16x9"
    os.makedirs(other, exist_ok=True)
    for f in ["hyperframes.json", ".gitignore", "AGENTS.md", "CLAUDE.md"]:
        shutil.copy(f, other)
    open(os.path.join(other, "meta.json"), "w").write('{\n  "id": "analyse-risques-qhse-16x9",\n  "name": "analyse-risques-qhse-16x9",\n  "createdAt": "2026-10-13T16:30:00.000Z"\n}\n')
    open(os.path.join(other, "package.json"), "w").write(open("package.json").read().replace('"analyse-risques-qhse"', '"analyse-risques-qhse-16x9"'))
    os.makedirs(os.path.join(other, "assets"), exist_ok=True)
    for f in os.listdir("assets"):
        shutil.copy2(os.path.join("assets", f), os.path.join(other, "assets", f))
    print("16:9", build("L", other))
