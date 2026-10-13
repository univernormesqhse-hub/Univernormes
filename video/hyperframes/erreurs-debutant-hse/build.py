# Génère les deux formats depuis la même liste de scènes :
#   python3 build.py   ->  index.html (9:16, ce projet)  +  ../erreurs-debutant-hse-16x9/index.html (16:9)
# Le texte des sous-titres vient de src/script.txt, calé sur la voix d'origine par src/align.py.
import json, os, shutil, subprocess, sys, html as H
sys.path.insert(0, "src")
from align import load, chunks, find

W, RATIO = load()
CH = chunks(W)
T = lambda phrase, after=0.0: find(W, phrase, after)
DUR = 451.93
END_VOICE = 450.3

# ---------------------------------------------------------------- chapitres
CHAP = [  # (début, style de karaoké, fond)
    (0.0, "rise", "paper"),
    (T("On attaque donc tout de suite"), "ink", "light"),
    (T("Ce qui nous amène à notre deuxième"), "grey", "paper"),
    (T("Allez, on passe à la troisième"), "blur", "warm"),
    (T("Place à notre quatrième"), "ink", "paper"),
]
def chap_of(t):
    k = 0
    for i, c in enumerate(CHAP):
        if t >= c[0] - 0.01: k = i
    return k

# ---------------------------------------------------------------- outils
class Doc:
    def __init__(self, fmt):
        self.fmt = fmt; self.html = []; self.js = []; self.sfx = []; self.n = 0; self.dark = []
    def id(self, p="e"):
        self.n += 1; return f"{p}{self.n}"
    def add(self, s): self.html.append(s)
    def j(self, s): self.js.append(s)
    def snd(self, name, t, v=0.4): self.sfx.append((name, round(t, 2), v))

def esc(s): return H.escape(s, quote=False)

# ------------------------------------------------------------- composants
def scene(d, t0, t1, inner, cls="", wipe=False):
    sid = d.id("s")
    d.add(f'<div class="scene clip" id="{sid}" data-start="{t0:.2f}" data-duration="{t1 - t0:.2f}" data-track-index="2"><div class="stage {cls}">{inner}</div></div>')
    if not wipe:
        d.j(f"blurIn('#{sid}', {t0:.2f}); blurOut('#{sid}', {t1 - 0.3:.2f});")
        d.snd("whoosh", t1 - 0.3, 0.3)
    return sid

def pop(d, sel, t, sound="pop", v=0.35, frm="{ y: 40 }"):
    d.j(f"pop('{sel}', {t:.2f}, {frm});")
    if sound: d.snd(sound, t, v)

def chip(d, text, t, cls="", icon=None):
    i = d.id("c")
    ic = f'<img src="assets/ic-{icon}.png" />' if icon else ""
    pop(d, f"#{i}", t)
    return f'<div class="chip {cls}" id="{i}">{ic}{esc(text)}</div>'

def photo(src, pos="50% 40%", cls=""):
    return f'<div class="ph {cls}"><img src="assets/photo-{src}.jpg" style="object-position: {pos};" /></div>'

def cover(d, t1):
    i = d.id("cv"); d.dark.append((0.0, t1))
    tags = [("Santé", T("la gestion de la santé") + 0.6, "g"), ("Sécurité", T("de la sécurité et de"), ""), ("Environnement", T("l'environnement, ou HSE"), "w")]
    chips = "".join(chip(d, a, t, c) for a, t, c in tags)
    d.add(f'''<div class="scene clip cover" id="{i}" data-start="0" data-duration="{t1:.2f}" data-track-index="2" style="z-index: 30;">
      <div class="cvph"><img id="{i}img" src="assets/photo-couverture.jpg" /></div><div class="cvgrad"></div>
      <div class="cvlogo"><img src="assets/logo.png" /></div>
      <div class="cvtxt"><div class="kick">HSE · QHSE · TERRAIN</div>
        <div class="cvt1"><span class="cvnum">15</span> ERREURS</div><div class="cvt2">DU DÉBUTANT HSE</div>
        <div class="hand cvsub">de la théorie au terrain</div><div class="cvchips">{chips}</div></div></div>''')
    d.j(f"tl.fromTo('#{i}img', {{ scale: 1.0 }}, {{ scale: 1.14, duration: {t1:.2f}, ease: 'none' }}, 0);")
    hse = T("ou HSE pour les intimes")
    d.j(f"tl.fromTo('#{i} .cvnum', {{ scale: 1 }}, {{ scale: 1.25, duration: 0.18, yoyo: true, repeat: 1 }}, {hse + 0.2:.2f});")
    d.j(f"blurOut('#{i}', {t1 - 0.3:.2f});"); d.snd("whoosh", t1 - 0.3, 0.35); d.snd("soft-whoosh", 0.05, 0.3)

def chapter(d, n, title, sub, t0, t1, img):
    i = d.id("ch"); d.dark.append((t0, t1))
    d.add(f'''<div class="scene clip chap" id="{i}" data-start="{t0:.2f}" data-duration="{t1 - t0:.2f}" data-track-index="2" style="z-index: 22;">
      <div class="chph"><img src="assets/photo-{img}.jpg" /></div><div class="chveil"></div>
      <div class="chnum">{n}</div><div class="chcard"><div class="chk">PARTIE {n} / 4</div><div class="cht">{esc(title)}</div><div class="hand chs">{esc(sub)}</div></div>
      <div class="wipe w1"></div><div class="wipe w2"></div></div>''')
    d.j(f"tl.fromTo('#{i} .wipe', {{ xPercent: 105 }}, {{ xPercent: 0, duration: 0.32, stagger: 0.07, ease: 'power3.in' }}, {t0 - 0.05:.2f});")
    d.j(f"tl.to('#{i} .wipe', {{ xPercent: -105, duration: 0.34, stagger: 0.07, ease: 'power3.out' }}, {t0 + 0.36:.2f});")
    d.j(f"tl.fromTo('#{i} .chnum', {{ opacity: 0, scale: 2.2, rotation: -8 }}, {{ opacity: 1, scale: 1, rotation: 0, duration: 0.45, ease: 'power4.out' }}, {t0 + 0.45:.2f});")
    d.j(f"tl.fromTo('#{i} .chcard', {{ opacity: 0, x: 160 }}, {{ opacity: 1, x: 0, duration: 0.5, ease: 'back.out(1.6)' }}, {t0 + 0.65:.2f});")
    d.j(f"tl.fromTo('#{i} .chph img', {{ scale: 1.25 }}, {{ scale: 1.05, duration: {t1 - t0:.2f}, ease: 'none' }}, {t0:.2f});")
    d.j(f"blurOut('#{i}', {t1 - 0.3:.2f});")
    d.snd("swish", t0 - 0.05, 0.45); d.snd("bass-hit", t0 + 0.45, 0.5); d.snd("whoosh", t1 - 0.3, 0.3)

def versus(d, t0, t1, L, R, vline="VS"):
    """L / R = dict(title, img, pos, items=[(texte, t)], verdict=(texte, t, cls), tone, t)"""
    def side(S, tone):
        sid = d.id("sd")
        items = "".join(chip(d, a, t, "sm " + tone) for a, t in S["items"])
        ver = ""
        if S.get("verdict"):
            a, t, c = S["verdict"]; vid = d.id("vd")
            ver = f'<div class="stamp {c}" id="{vid}">{esc(a)}</div>'
            d.j(f"slam('#{vid}', {t:.2f});"); d.snd("tampon", t, 0.55)
        d.j(f"tl.fromTo('#{sid}', {{ opacity: 0, y: 60, rotationY: {(-20 if tone == 'r' else 20)}, transformPerspective: 1400 }}, {{ opacity: 1, y: 0, rotationY: 0, duration: 0.6, ease: 'power3.out' }}, {S['t']:.2f});")
        d.snd("swish", S["t"], 0.35)
        return f'''<div class="side {tone}" id="{sid}">{photo(S["img"], S.get("pos", "50% 35%"))}
          <div class="body"><div class="sdt">{esc(S["title"])}</div><div class="items">{items}</div>{ver}</div></div>'''
    vid = d.id("vs")
    d.j(f"tl.fromTo('#{vid}', {{ opacity: 0, scale: 0.3 }}, {{ opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2.5)' }}, {R['t']:.2f});")
    return scene(d, t0, t1, f'<div class="vs">{side(L, "r")}<div class="vsb" id="{vid}">{vline}</div>{side(R, "g")}</div>')

def steps(d, t0, t1, items, title=None, kind="num", head_t=None):
    """items = [(label, sous-titre, t, icône|None, ton)]"""
    hid = d.id("hd"); out = []
    for k, (lb, sb, t, ic, tone) in enumerate(items):
        i = d.id("st")
        lead = f'<img class="sic" src="assets/ic-{ic}.png" />' if ic else f'<div class="snum {tone}">{k + 1}</div>'
        out.append(f'<div class="step {tone}" id="{i}">{lead}<div class="stx"><div class="slb">{esc(lb)}</div><div class="hand ssb">{esc(sb)}</div></div></div>')
        d.j(f"tl.fromTo('#{i}', {{ opacity: 0, scale: 0.6, y: 50 }}, {{ opacity: 1, scale: 1, y: 0, duration: 0.42, ease: 'back.out(2)' }}, {t:.2f});")
        d.snd("tick", t, 0.45); d.snd("pop", t + 0.02, 0.3)
    hd = ""
    if title:
        hd = f'<div class="shead" id="{hid}">{esc(title)}</div>'
        d.j(f"tl.fromTo('#{hid}', {{ opacity: 0, y: -30 }}, {{ opacity: 1, y: 0, duration: 0.4 }}, {(head_t or t0 + 0.3):.2f});")
    return scene(d, t0, t1, f'<div class="stk">{hd}<div class="steps n{len(items)}">{"".join(out)}</div></div>')

def equation(d, t0, t1, terms, ops, title=None, head_t=None):
    """terms = [(label, icône, t, ton)] ; ops = [str] entre les termes"""
    parts = []
    for k, (lb, ic, t, tone) in enumerate(terms):
        i = d.id("tm")
        icon = f'<img src="assets/ic-{ic}.png" />' if ic else ""
        parts.append(f'<div class="term {tone}" id="{i}">{icon}<div>{esc(lb)}</div></div>')
        d.j(f"tl.fromTo('#{i}', {{ opacity: 0, scale: 1.5 }}, {{ opacity: 1, scale: 1, duration: 0.3, ease: 'power4.in' }}, {t:.2f});")
        d.snd("thud", t, 0.45)
        if k < len(ops):
            o = d.id("op")
            parts.append(f'<div class="op" id="{o}">{esc(ops[k])}</div>')
            d.j(f"tl.fromTo('#{o}', {{ opacity: 0, scale: 0 }}, {{ opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(3)' }}, {t + 0.25:.2f});")
    hd = ""
    if title:
        hid = d.id("hd"); hd = f'<div class="shead" id="{hid}">{esc(title)}</div>'
        d.j(f"tl.fromTo('#{hid}', {{ opacity: 0, y: -30 }}, {{ opacity: 1, y: 0, duration: 0.4 }}, {(head_t or t0 + 0.3):.2f});")
    return scene(d, t0, t1, f'<div class="stk">{hd}<div class="eq">{"".join(parts)}</div></div>')

def layers(d, t0, t1, phases, cls=""):
    """phases = [(html, t_debut)] superposées ; chaque phase s'efface quand la suivante arrive."""
    out = []
    for k, (inner, ts) in enumerate(phases):
        i = d.id("ly")
        out.append(f'<div class="layer" id="{i}">{inner}</div>')
        if k > 0:
            d.j(f"tl.fromTo('#{i}', {{ opacity: 0, scale: 0.94, filter: 'blur(18px)' }}, {{ opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.4 }}, {ts:.2f});")
            d.snd("soft-whoosh", ts, 0.3)
        if k + 1 < len(phases):
            d.j(f"tl.to('#{i}', {{ opacity: 0, scale: 1.04, filter: 'blur(18px)', duration: 0.3 }}, {phases[k + 1][1] - 0.25:.2f});")
    return scene(d, t0, t1, "".join(out), cls)

def myth(d, wrong, t_in, t_strike, right=None, t_right=None):
    i, s = d.id("my"), d.id("ms")
    d.j(f"slam('#{i}', {t_in:.2f});"); d.snd("thud", t_in, 0.45)
    d.j(f"tl.fromTo('#{s}', {{ scaleX: 0 }}, {{ scaleX: 1, duration: 0.35, ease: 'power2.inOut' }}, {t_strike:.2f}); tl.to('#{i}', {{ opacity: 0.45, duration: 0.2 }}, {t_strike + 0.35:.2f});")
    d.snd("stylo", t_strike, 0.4)
    out = f'<div class="myth" id="{i}"><div>{esc(wrong)}</div><div class="strike" id="{s}"></div></div>'
    if right:
        r = d.id("mr")
        d.j(f"slam('#{r}', {t_right:.2f});"); d.snd("validation", t_right, 0.45)
        out += f'<div class="myth ok" id="{r}"><div>{esc(right)}</div></div>'
    return f'<div class="mythbox">{out}</div>'

def photochips(d, img, pos, chips_html, extra=""):
    return f'<div class="pc">{photo(img, pos)}<div class="chips">{chips_html}</div>{extra}</div>'

def quote(d, text_html, img, t, who=""):
    i = d.id("qt")
    d.j(f"tl.fromTo('#{i} .qcard', {{ opacity: 0, y: 80 }}, {{ opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }}, {t:.2f});")
    d.j(f"tl.fromTo('#{i} .qph', {{ opacity: 0, scale: 0.3 }}, {{ opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.6)' }}, {t + 0.2:.2f});")
    d.j(f"tl.fromTo('#{i} .hl', {{ '--hl-x': 0 }}, {{ '--hl-x': 1, duration: 0.4, stagger: 0.5 }}, {t + 1.0:.2f});")
    d.snd("page", t, 0.4)
    return f'<div class="qt" id="{i}"><div class="qph"><img src="assets/photo-{img}.jpg" /></div><div class="qcard"><div class="qm">“</div><div class="qtx">{text_html}</div><div class="hand qwho">{esc(who)}</div></div></div>'

def svgscene(d, t0, t1, svg, vb="0 0 960 760"):
    return scene(d, t0, t1, f'<svg class="svgst" viewBox="{vb}" preserveAspectRatio="xMidYMid meet">{svg}</svg>')

# ------------------------------------------------------------- le film
def film(d):
    t = {}
    t["voyage"] = T("Le but de cette exploration")
    cover(d, t["voyage"])
    t["cit"] = T("Commençons tout de suite")
    versus(d, t["voyage"], t["cit"],
           dict(title="La belle théorie", img="theorie", pos="50% 50%", t=T("déjouer les erreurs classiques") - 0.5, items=[("Les manuels", T("des manuels"))],
                verdict=("ERREURS CLASSIQUES", T("déjouer les erreurs classiques"), "r")),
           dict(title="La vraie vie du terrain", img="terrain", pos="60% 40%", t=T("véritable état d'esprit") - 0.3, items=[("État d'esprit d'expert", T("véritable état d'esprit") + 0.3)]),
           vline="→")
    t["choc"] = T("C'est le choc classique")
    ql = T("le terrain fonctionne souvent")
    layers(d, t["cit"], t["choc"], [
        (photochips(d, "jeune-pro", "45% 30%", chip(d, "Connaissances impeccables", T("connaissances impeccables"), "g", "livres") + chip(d, "Certifications prestigieuses", T("certifications prestigieuses"), "", "diplome")), t["cit"]),
        (quote(d, 'Le <span class="hl">terrain</span> fonctionne souvent <span class="hl">différemment</span>.', "chantier", ql), ql - 0.2),
    ])
    t["axes"] = T("Pour que ce soit super clair")
    # collision école / terrain
    i = d.id("cl")
    hit = T("la friction totale") + 0.2
    d.j(f"tl.fromTo('#{i}a', {{ x: -900, rotation: -10 }}, {{ x: 0, rotation: -4, duration: 0.5, ease: 'power3.in' }}, {hit - 0.5:.2f});")
    d.j(f"tl.fromTo('#{i}b', {{ x: 900, rotation: 10 }}, {{ x: 0, rotation: 4, duration: 0.5, ease: 'power3.in' }}, {hit - 0.5:.2f});")
    d.j(f"tl.fromTo('#{i}z', {{ opacity: 0, scale: 0.2, rotation: -30 }}, {{ opacity: 1, scale: 1, rotation: 0, duration: 0.35, ease: 'back.out(3)' }}, {hit:.2f});")
    d.j(f"tl.fromTo('#{i}', {{ x: 0 }}, {{ x: 16, duration: 0.05, repeat: 7, yoyo: true }}, {hit:.2f});")
    d.snd("deep-hit", hit, 0.5); d.snd("bass-hit", hit, 0.4)
    scene(d, t["choc"], t["axes"], f'''<div class="clash" id="{i}"><div class="clw a" id="{i}a"><img src="assets/ic-diplome.png" />L'ÉCOLE</div>
        <div class="clz" id="{i}z">⚡</div><div class="clw b" id="{i}b"><img src="assets/ic-casque.png" />LE TERRAIN</div>
        <div class="hand clsub">friction totale</div></div>''')
    t["ch1"] = T("On attaque donc tout de suite")
    steps(d, t["axes"], t["ch1"], [
        ("Le piège du débutant", "théorie vs réalité", T("d'abord, le piège"), None, "g"),
        ("Le syndrome du policier", "autorité vs influence", T("ensuite, le fameux syndrome"), None, ""),
        ("La déconnexion du terrain", "bureau vs opérations", T("puis la déconnexion"), None, "o"),
        ("L'humain avant tout", "relations & crédibilité", T("l'humain avant tout", T("on terminera")), None, "r"),
    ], title="4 grands axes", head_t=T("quatre grands axes"))
    # ---------------- PARTIE 1
    t["rev"] = T("En fait, quand on connaît")
    chapter(d, 1, "Le piège du débutant", "Théorie vs réalité", t["ch1"], t["rev"], "revolution")
    t["math"] = T("C'est mathématique")
    i = d.id("mur"); wall = T("on se heurte à un mur")
    bricks = "".join(f'<rect x="{20 + (c * 150) + (75 if r % 2 else 0)}" y="{70 + r * 90}" width="140" height="80" rx="8" fill="#C4553A" stroke="#7A2E1E" stroke-width="5" />' for r in range(6) for c in range(6) if 20 + c * 150 + (75 if r % 2 else 0) < 900)
    d.j(f"tl.fromTo('#{i}w rect', {{ opacity: 0, y: -400 }}, {{ opacity: 1, y: 0, duration: 0.35, stagger: 0.012, ease: 'bounce.out' }}, {wall - 0.2:.2f});")
    d.snd("thud", wall, 0.6); d.snd("deep-hit", wall + 0.3, 0.45)
    cal = T("dès la première semaine")
    bub = T("on se dit")
    layers(d, t["rev"], t["math"], [
        (f'''<div class="pc">{photo("revolution", "45% 35%")}<div class="chips">{chip(d, "Semaine 1", cal, "", "calendrier")}<div class="bubble" id="{i}b">« On va tout changer ! »</div></div></div>''', t["rev"]),
        (f'''<div class="wallbox"><svg class="svgst" viewBox="0 0 960 640" preserveAspectRatio="xMidYMid meet"><g id="{i}w">{bricks}</g></svg>
            <div class="wallchips">{chip(d, "Résistance", T("les équipes résistent"), "r")}{chip(d, "Conflits", T("des conflits éclatent"), "r")}{chip(d, "Crédibilité : 0", T("on perd toute crédibilité"), "r", "chaine-cassee")}</div></div>''', wall - 0.3),
    ])
    d.j(f"pop('#{i}b', {bub:.2f}, {{ x: 80 }});"); d.snd("pop", bub, 0.4)
    t["ch2"] = T("Ce qui nous amène à notre deuxième")
    equation(d, t["math"], t["ch2"], [
        ("Changement durable", "trophee", T("un changement durable"), "n"),
        ("Stratégie", "cible", T("une vraie stratégie"), "g"),
        ("Écoute", "yeux", T("énormément d'écoute"), "g"),
        ("Patience", "calendrier", T("pas mal de patience"), "g"),
    ], ["=", "+", "+"], title="Rien de magique", head_t=T("ça n'a rien de magique"))
    # ---------------- PARTIE 2
    t["vs2"] = T("D'un côté, on a le novice")
    chapter(d, 2, "Le syndrome du policier", "Autorité vs influence", t["ch2"], t["vs2"], "novice")
    t["respect"] = T("De cette dynamique découle")
    versus(d, t["vs2"], t["respect"],
           dict(title="Le novice « policier »", img="novice", pos="50% 25%", t=t["vs2"] + 0.2,
                items=[("Sanctionner", T("sanctionner, crier")), ("Crier", T("crier, imposer")), ("Imposer", T("imposer les choses")), ("Menacer", T("menacer."))],
                verdict=("REJET TOTAL", T("C'est un rejet total"), "r")),
           dict(title="L'expert « coach »", img="coach", pos="55% 40%", t=T("À l'opposé, le vrai expert"),
                items=[("Prévenir", T("de prévenir")), ("Accompagner", T("d'accompagner")), ("Influencer", T("d'influencer positivement")), ("Protéger", T("de protéger"))],
                verdict=("PARTENARIAT", T("basée sur le partenariat"), "g")))
    t["hier"] = T("Du coup, cette fameuse hiérarchie")
    i = d.id("bal"); tilt = T("supérieur à la peur")
    d.j(f"tl.fromTo('#{i}beam', {{ rotation: 0, svgOrigin: '480 330' }}, {{ rotation: -14, svgOrigin: '480 330', duration: 0.9, ease: 'elastic.out(1, 0.5)' }}, {tilt:.2f});")
    d.j(f"tl.fromTo('#{i}L', {{ y: 0 }}, {{ y: 112, duration: 0.9, ease: 'elastic.out(1, 0.5)' }}, {tilt:.2f}); tl.fromTo('#{i}R', {{ y: 0 }}, {{ y: -112, duration: 0.9, ease: 'elastic.out(1, 0.5)' }}, {tilt:.2f});")
    d.j(f"tl.fromTo('#{i}gt', {{ opacity: 0, scale: 0 }}, {{ opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(3)', transformOrigin: '50% 50%' }}, {tilt + 0.4:.2f});")
    d.snd("cadenas", tilt, 0.4); d.snd("bass-hit", tilt + 0.4, 0.45)
    dos = T("le surveillant a le dos tourné")
    d.j(f"pop('#{i}dos', {dos:.2f}, {{ y: 40 }}); tl.fromTo('#{i}ab', {{ opacity: 0, scale: 1.6 }}, {{ opacity: 1, scale: 1, duration: 0.28, ease: 'power4.in' }}, {T('abandonnées direct'):.2f});")
    d.snd("pop", dos, 0.35); d.snd("tampon", T("abandonnées direct"), 0.5)
    rm = T("respect mutuel")
    d.j(f"pop('#{i}rm', {rm:.2f}, {{ y: 40 }});"); d.snd("validation", rm, 0.45)
    svgscene(d, t["respect"], t["hier"], f'''
      <text x="480" y="52" text-anchor="middle" class="svh">La règle d'or</text>
      <path d="M 480 330 L 430 640 L 530 640 Z" fill="#0E2A5C" /><rect x="360" y="636" width="240" height="26" rx="10" fill="#0E2A5C" />
      <g id="{i}beam"><rect x="150" y="318" width="660" height="24" rx="12" fill="#0E2A5C" /><circle cx="480" cy="330" r="26" fill="#2E9B3E" /></g>
      <g id="{i}L"><line x1="190" y1="330" x2="190" y2="420" stroke="#0E2A5C" stroke-width="6" /><rect x="70" y="420" width="240" height="120" rx="20" fill="#2E9B3E" /><text x="190" y="497" text-anchor="middle" class="svw">RESPECT</text></g>
      <g id="{i}R"><line x1="770" y1="330" x2="770" y2="420" stroke="#0E2A5C" stroke-width="6" /><rect x="650" y="420" width="240" height="120" rx="20" fill="#D9443A" /><text x="770" y="497" text-anchor="middle" class="svw">PEUR</text></g>
      <g id="{i}gt"><circle cx="480" cy="215" r="62" fill="#fff" stroke="#2E9B3E" stroke-width="8" /><text x="480" y="250" text-anchor="middle" class="svgt">&gt;</text></g>
      <g id="{i}dos"><rect x="40" y="690" width="420" height="60" rx="30" fill="#0E2A5C" /><text x="250" y="730" text-anchor="middle" class="svc">Surveillant de dos ?</text></g>
      <g id="{i}ab"><rect x="480" y="690" width="440" height="60" rx="12" fill="#fff" stroke="#D9443A" stroke-width="6" /><text x="700" y="731" text-anchor="middle" class="svc r">RÈGLES ABANDONNÉES</text></g>
      <g id="{i}rm"><rect x="620" y="110" width="320" height="60" rx="30" fill="#2E9B3E" /><text x="780" y="151" text-anchor="middle" class="svc w">RESPECT MUTUEL</text></g>''', "0 0 960 770")
    t["ch3"] = T("Allez, on passe à la troisième")
    i = d.id("pyr"); fx = T("faire une fixette")
    lv = [(T("de supprimer le danger"), "1 · SUPPRIMER LE DANGER", "à la source", "#2E9B3E", 900), (T("des protections collectives"), "2 · PROTECTION COLLECTIVE", "garde-corps, capotages…", "#0E2A5C", 720), (T("le tout dernier recours"), "3 · EPI", "le tout dernier recours", "#D9443A", 540)]
    rows = ""
    for k, (tt, a, b, c, w) in enumerate(lv):
        x = (960 - w) / 2; y = 150 + k * 170
        rows += f'<g id="{i}r{k}"><rect x="{x}" y="{y}" width="{w}" height="150" rx="22" fill="{c}" /><text x="480" y="{y + 70}" text-anchor="middle" class="svw">{a}</text><text x="480" y="{y + 118}" text-anchor="middle" class="svs">{b}</text></g>'
        d.j(f"tl.fromTo('#{i}r{k}', {{ opacity: 0, scaleX: 0.2, transformOrigin: '50% 50%' }}, {{ opacity: 1, scaleX: 1, duration: 0.45, ease: 'back.out(1.6)' }}, {tt:.2f});")
        d.snd("thud", tt, 0.45)
    hy = T("de façon systématique")
    d.j(f"tl.fromTo('#{i}ar', {{ opacity: 0, y: -40 }}, {{ opacity: 1, y: 0, duration: 0.4 }}, {hy:.2f});")
    layers(d, t["hier"], t["ch3"], [
        (f'<div class="pc">{photo("epi", "50% 50%")}<div class="chips">{myth(d, "Fixette sur les EPI", fx, T("C est le réflexe du policier"))}</div></div>', t["hier"]),
        (f'''<svg class="svgst" viewBox="0 0 960 680" preserveAspectRatio="xMidYMid meet"><text x="480" y="80" text-anchor="middle" class="svh">Hiérarchie des contrôles</text>{rows}
            <g id="{i}ar"><path d="M 920 170 V 600 M 895 570 L 920 610 L 945 570" stroke="#0E2A5C" stroke-width="8" fill="none" stroke-linecap="round" /><text x="905" y="140" text-anchor="end" class="svs n">de haut en bas</text></g></svg>''', hy - 0.3),
    ])
    # ---------------- PARTIE 3
    t["excel"] = T("Soyons honnêtes")
    chapter(d, 3, "La déconnexion du terrain", "Bureau vs opérations", t["ch3"], t["excel"], "chantier")
    t["proc"] = T("On peut créer les procédures")
    i = d.id("xl"); ham = T("la chute d'un marteau")
    cells = ""
    for r in range(7):
        for c in range(5):
            fill = "#E8F3EA" if r == 0 else "#fff"
            cells += f'<rect x="{90 + c * 156}" y="{140 + r * 52}" width="156" height="52" fill="{fill}" stroke="#B9C7D8" stroke-width="2" />'
    vals = "".join(f'<text x="{168 + c * 156}" y="{180 + r * 52}" text-anchor="middle" class="svx">{v}</text>' for r, row in enumerate([["Site", "Risque", "Statut", "Action", "✓"], ["A", "Chute", "OK", "—", "✓"], ["B", "Bruit", "OK", "—", "✓"], ["C", "Levage", "OK", "—", "✓"], ["D", "Chimique", "OK", "—", "✓"], ["E", "Électrique", "OK", "—", "✓"], ["F", "Hauteur", "OK", "—", "✓"]]) for c, v in enumerate(row))
    d.j(f"tl.fromTo('#{i}t', {{ opacity: 0, y: 60, rotationX: 30, transformPerspective: 1400 }}, {{ opacity: 1, y: 0, rotationX: 0, duration: 0.6, ease: 'power3.out' }}, {t['excel'] + 0.3:.2f});")
    d.j(f"tl.fromTo('#{i}h', {{ opacity: 0, y: -700, rotation: -40, svgOrigin: '480 120' }}, {{ opacity: 1, y: 0, rotation: 15, svgOrigin: '480 120', duration: 0.55, ease: 'power3.in' }}, {ham - 0.3:.2f});")
    d.j(f"tl.fromTo('#{i}t', {{ x: 0 }}, {{ x: 14, duration: 0.05, repeat: 7, yoyo: true }}, {ham + 0.25:.2f}); tl.fromTo('#{i}k', {{ opacity: 0, scale: 0 }}, {{ opacity: 1, scale: 1, transformOrigin: '50% 50%', duration: 0.3, ease: 'back.out(3)' }}, {ham + 0.3:.2f});")
    d.snd("click", t["excel"] + 0.5, 0.4); d.snd("riser", ham - 1.6, 0.25); d.snd("deep-hit", ham + 0.25, 0.55); d.snd("thud", ham + 0.25, 0.5)
    svgscene(d, t["excel"], t["proc"], f'''<text x="480" y="80" text-anchor="middle" class="svh">Bien au chaud derrière l'écran…</text>
      <g id="{i}t"><rect x="70" y="110" width="820" height="420" rx="20" fill="#fff" stroke="#0E2A5C" stroke-width="6" /><rect x="70" y="110" width="820" height="30" rx="14" fill="#2E9B3E" />{cells}{vals}</g>
      <g id="{i}h"><rect x="455" y="120" width="34" height="300" rx="12" fill="#8A5636" /><rect x="380" y="400" width="190" height="90" rx="16" fill="#5B6577" /></g>
      <g id="{i}k"><path d="M 400 530 L 440 470 L 470 540 L 520 460 L 540 545 L 590 490" stroke="#D9443A" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round" /><text x="480" y="620" text-anchor="middle" class="svc r">Le tableau n'arrête pas le marteau</text></g>''', "0 0 960 650")
    t["illu"] = T("Et ceci illustre parfaitement")
    tr = T("ils se découvrent uniquement")
    layers(d, t["proc"], t["illu"], [
        (f'<div class="pc">{photo("revolution", "40% 35%")}<div class="chips">{myth(d, "Procédures parfaites sur le papier", t["proc"] + 0.3, T("ça ne garantit absolument pas"), "Les vrais risques sont sur le terrain", tr - 0.6)}</div></div>', t["proc"]),
        (photochips(d, "chantier", "50% 50%", chip(d, "Aller sur le terrain", T("en allant sur le terrain"), "g", "casque") + chip(d, "Observer", T("en observant"), "", "yeux") + chip(d, "Écouter les équipes", T("en écoutant les gens"), "w", "equipe")), tr),
    ])
    t["gants"] = T("Alors, ça nous amène à une question")
    i = d.id("wm"); z = T("du fameux « zéro accident") ; pq = T("C'est ce qu'on appelle")
    red = T("rouge écarlate")
    d.j(f"tl.fromTo('#{i}b', {{ opacity: 0, y: 60 }}, {{ opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.6)' }}, {z:.2f});")
    d.j(f"tl.fromTo('#{i}n', {{ opacity: 0, scale: 2.2, svgOrigin: '480 340' }}, {{ opacity: 1, scale: 1, svgOrigin: '480 340', duration: 0.35, ease: 'power4.in' }}, {z + 0.4:.2f}); tl.fromTo('#{i}st text', {{ opacity: 0 }}, {{ opacity: 1, duration: 0.2, stagger: 0.12 }}, {z + 0.8:.2f});")
    d.j(f"tl.to('#{i}b', {{ opacity: 0, scale: 0.8, duration: 0.3 }}, {pq - 0.3:.2f}); tl.fromTo('#{i}m', {{ opacity: 0, scale: 0.4, svgOrigin: '480 380' }}, {{ opacity: 1, scale: 1, svgOrigin: '480 380', duration: 0.5, ease: 'back.out(1.8)' }}, {pq:.2f});")
    d.j(f"tl.fromTo('#{i}L', {{ x: 0, rotation: 0, svgOrigin: '480 380' }}, {{ x: -150, rotation: -12, svgOrigin: '480 380', duration: 0.6, ease: 'power3.out' }}, {red - 0.2:.2f}); tl.fromTo('#{i}R', {{ x: 0, rotation: 0, svgOrigin: '480 380' }}, {{ x: 150, rotation: 12, svgOrigin: '480 380', duration: 0.6, ease: 'power3.out' }}, {red - 0.2:.2f});")
    d.snd("bass-hit", z, 0.4)
    d.snd("tampon", z + 0.4, 0.45); d.snd("ding", z + 0.8, 0.35)
    d.snd("soft-whoosh", pq, 0.35); d.snd("deep-hit", red - 0.2, 0.5)
    for k, (lab, ph) in enumerate([("Incidents cachés", "à cacher les petits"), ("Dérives tolérées", "dérives tolérées"), ("Petits écarts → désastres", "causer de vrais désastres")]):
        d.j(f"pop('#{i}c{k}', {T(ph):.2f}, {{ y: 30 }});"); d.snd("pop", T(ph), 0.4)
    seeds = "".join(f'<ellipse cx="{cx}" cy="{cy}" rx="9" ry="15" fill="#1A1414" />' for cx, cy in [(400, 330), (450, 400), (510, 350), (560, 420), (430, 460), (520, 470)])
    svgscene(d, t["illu"], t["gants"], f'''<text x="480" y="70" text-anchor="middle" class="svh">L'illusion des chiffres</text>
      <g id="{i}b"><rect x="230" y="150" width="500" height="330" rx="26" fill="#0E2A5C" /><text x="480" y="225" text-anchor="middle" class="svw">ACCUEIL DE L'USINE</text><text id="{i}n" x="480" y="395" text-anchor="middle" class="svbig">0</text><text x="480" y="455" text-anchor="middle" class="svs">accident</text>
        <g id="{i}st"><text x="320" y="340" text-anchor="middle" style="font-size: 64px; fill: #F2C230;">★</text><text x="640" y="340" text-anchor="middle" style="font-size: 64px; fill: #F2C230;">★</text></g></g>
      <g id="{i}m"><text x="480" y="140" text-anchor="middle" class="svh g">L'effet pastèque</text>
        <g id="{i}L"><path d="M 480 210 A 170 170 0 0 0 480 550 Z" fill="#E5484D" stroke="#2E9B3E" stroke-width="30" /></g>
        <g id="{i}R"><path d="M 480 210 A 170 170 0 0 1 480 550 Z" fill="#E5484D" stroke="#2E9B3E" stroke-width="30" />{seeds}</g>
        <circle cx="480" cy="380" r="185" fill="#2E9B3E" id="{i}skin" /></g>
      <g id="{i}c0"><rect x="20" y="600" width="300" height="64" rx="32" fill="#D9443A" /><text x="170" y="642" text-anchor="middle" class="svc w">Incidents cachés</text></g>
      <g id="{i}c1"><rect x="330" y="600" width="300" height="64" rx="32" fill="#D9443A" /><text x="480" y="642" text-anchor="middle" class="svc w">Dérives tolérées</text></g>
      <g id="{i}c2"><rect x="640" y="600" width="300" height="64" rx="32" fill="#0E2A5C" /><text x="790" y="642" text-anchor="middle" class="svc w">→ vrais désastres</text></g>''', "0 0 960 690")
    d.j(f"tl.fromTo('#{i}skin', {{ opacity: 1 }}, {{ opacity: 0, duration: 0.25 }}, {red - 0.25:.2f});")
    t["causes"] = T("Mais si on gratte un peu")
    q = d.id("q")
    d.j(f"tl.fromTo('#{q}', {{ opacity: 0, scale: 0.6, rotation: -6 }}, {{ opacity: 1, scale: 1, rotation: -2, duration: 0.5, ease: 'back.out(2)' }}, {T('pourquoi cet opérateur'):.2f});")
    d.snd("pop", T("pourquoi cet opérateur"), 0.45)
    layers(d, t["gants"], t["causes"], [
        (f'''<div class="pc">{photo("operateur", "55% 35%")}<div class="chips"><div class="qbig" id="{q}">Pourquoi ne porte-t-il pas ses <span class="hlk">gants</span> ?</div>
            {myth(d, "« Il veut juste désobéir »", T("il veut juste désobéir"), T("la solution de facilité"))}</div></div>''', t["gants"]),
    ])
    t["eq"] = T("C'est là qu'intervient")
    steps(d, t["causes"], t["eq"], [
        ("Gants inadaptés", "tâche hyper minutieuse", T("les gants sont inadaptés"), "gants", "o"),
        ("La chaleur", "les rend insupportables", T("la chaleur les rend"), "sirene", "o"),
        ("Pression de la production", "pas le temps de les mettre", T("la pression de la production"), "outils", "o"),
        ("Le contexte dicte le comportement", "rarement la mauvaise volonté", T("qui dictent le comportement"), "loupe", "g"),
    ], title="Causes systémiques", head_t=T("des causes systémiques"))
    t["perf"] = T("Bien sûr, cet environnement")
    i = d.id("fx"); f1 = T("le comportement est tout simplement")
    d.j(f"tl.fromTo('#{i} .fxa', {{ opacity: 0, x: -200 }}, {{ opacity: 1, x: 0, duration: 0.4, ease: 'power3.out' }}, {f1:.2f}); tl.fromTo('#{i} .fxb', {{ opacity: 0, scale: 1.6 }}, {{ opacity: 1, scale: 1, duration: 0.3, ease: 'power4.in' }}, {T('fonction du contexte'):.2f});")
    d.snd("thud", f1, 0.45); d.snd("bass-hit", T("fonction du contexte"), 0.5)
    layers(d, t["eq"], t["perf"], [
        (f'''<div class="fx" id="{i}"><div class="hand fxk">Retenez bien cette équation</div><div class="fxrow"><span class="fxa">COMPORTEMENT</span><span class="fxb"> = f( <em>CONTEXTE</em> )</span></div></div>''', t["eq"]),
        (myth(d, "Chercher un coupable", T("chercher un coupable"), T("ou de sanctionner"), "Comprendre et améliorer l'environnement", T("c'est de comprendre")), T("Au lieu de chercher") - 0.2),
    ])
    t["ch4"] = T("Place à notre quatrième")
    al = T("C'est vraiment l'alliance")
    parts = []
    for k, (lb, ic, ph, tone) in enumerate([("Sécurité", "bouclier", "entre la sécurité", "g"), ("Performance", "hausse", "et la performance", "n"), ("Durabilité", "trophee", "qui crée la durabilité", "o")]):
        tm = d.id("tm"); tt = T(ph)
        parts.append(f'<div class="term {tone}" id="{tm}"><img src="assets/ic-{ic}.png" /><div>{lb}</div></div>')
        d.j(f"tl.fromTo('#{tm}', {{ opacity: 0, scale: 1.5 }}, {{ opacity: 1, scale: 1, duration: 0.3, ease: 'power4.in' }}, {tt:.2f});"); d.snd("thud", tt, 0.45)
        if k < 2:
            o = d.id("op"); parts.append(f'<div class="op" id="{o}">{"+="[k]}</div>')
            d.j(f"tl.fromTo('#{o}', {{ opacity: 0, scale: 0 }}, {{ opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(3)' }}, {tt + 0.3:.2f});")
    layers(d, t["perf"], t["ch4"], [
        (f'<div class="pc">{photo("usine", "50% 50%")}<div class="chips">{myth(d, "La production, ennemie de la sécurité", T("Considérer la production"), T("erreur stratégique"), "Pérenniser l\'usine", T("elle doit la pérenniser"))}</div></div>', t["perf"]),
        (f'<div class="stk"><div class="shead">L\'alliance intelligente</div><div class="eq">{"".join(parts)}</div></div>', al - 0.3),
    ])
    # ---------------- PARTIE 4
    t["eco"] = T("Il faut bien réaliser")
    chapter(d, 4, "L'humain avant tout", "Relations & crédibilité", t["ch4"], t["eco"], "equipe")
    t["ecoute"] = T("C'est pour ça qu'il est capital")
    i = d.id("nw")
    nodes = [("Opérateurs", "operatrice", "des opérateurs"), ("Managers", "manager", "des managers"), ("Direction", "direction", "de la direction"), ("Sous-traitants", "sous-traitant", "des sous-traitants"), ("Techniciens", "technicien", "des techniciens")]
    import math
    g = ""
    for k, (lb, img, ph) in enumerate(nodes):
        a = -math.pi / 2 + k * 2 * math.pi / 5
        x, y = 480 + 300 * math.cos(a), 360 + 255 * math.sin(a)
        g += f'''<g id="{i}l{k}"><line x1="480" y1="360" x2="{x:.0f}" y2="{y:.0f}" stroke="#2E9B3E" stroke-width="8" stroke-dasharray="14 12" /></g>
          <g id="{i}n{k}"><clipPath id="{i}cp{k}"><circle cx="{x:.0f}" cy="{y:.0f}" r="78" /></clipPath><circle cx="{x:.0f}" cy="{y:.0f}" r="86" fill="#fff" stroke="#0E2A5C" stroke-width="8" />
          <image href="assets/photo-{img}.jpg" x="{x - 78:.0f}" y="{y - 78:.0f}" width="156" height="156" preserveAspectRatio="xMidYMin slice" clip-path="url(#{i}cp{k})" />
          <rect x="{x - 105:.0f}" y="{y + 70:.0f}" width="210" height="46" rx="23" fill="#0E2A5C" /><text x="{x:.0f}" y="{y + 102:.0f}" text-anchor="middle" class="svc w">{lb}</text></g>'''
        tt = T(ph)
        d.j(f"tl.fromTo('#{i}n{k}', {{ opacity: 0, scale: 0, transformOrigin: '50% 50%' }}, {{ opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }}, {tt:.2f}); tl.fromTo('#{i}l{k} line', {{ opacity: 0 }}, {{ opacity: 1, duration: 0.3 }}, {tt:.2f});")
        d.snd("pop", tt, 0.4)
    lien = T("C'est la qualité du lien")
    d.j(f"tl.to('#{i} line', {{ stroke: '#F2C230', strokeWidth: 14, duration: 0.3 }}, {lien:.2f}); tl.fromTo('#{i}c', {{ scale: 1 }}, {{ scale: 1.15, duration: 0.3, yoyo: true, repeat: 3, transformOrigin: '50% 50%' }}, {lien:.2f});")
    d.j(f"tl.fromTo('#{i}x', {{ opacity: 0, scale: 1.6 }}, {{ opacity: 1, scale: 1, transformOrigin: '50% 50%', duration: 0.28, ease: 'power4.in' }}, {T('erreur fatale'):.2f});")
    d.snd("ding", lien, 0.4); d.snd("tampon", T("erreur fatale"), 0.5)
    svgscene(d, t["eco"], t["ecoute"], f'''<g id="{i}">{g}<g id="{i}c"><circle cx="480" cy="360" r="70" fill="#2E9B3E" /><text x="480" y="372" text-anchor="middle" class="svw">HSE</text></g></g>
      <g id="{i}x"><rect x="300" y="690" width="360" height="56" rx="12" fill="#fff" stroke="#D9443A" stroke-width="6" /><text x="480" y="728" text-anchor="middle" class="svc r">Les ignorer = erreur fatale</text></g>''', "0 0 960 760")
    t["cred"] = T("Tout ça, ça sert à construire")
    steps(d, t["ecoute"], t["cred"], [
        ("Ne pas couper la parole", "écouter avant de parler", T("ça ne coupe pas la parole"), "stop", "n"),
        ("Valoriser l'expérience", "de ceux qui sont sur le terrain", T("ça valorise l'expérience"), "medaille", "g"),
        ("Faire preuve de pédagogie", "expliquer, pas imposer", T("ça fait preuve de pédagogie"), "ampoule", "g"),
        ("Repérer les signaux faibles", "que seules les équipes connaissent", T("ça sait repérer"), "yeux", "o"),
    ], title="Écoute active", head_t=t["ecoute"] + 0.5)
    t["adn"] = T("Si on devait vraiment tout résumer")
    pil = []
    for k, (lb, ic, ph) in enumerate([("Présence", "casque", "en étant présent"), ("Cohérence", "puzzle", "hyper cohérent"), ("Humilité", "pouce", "d'humilité"), ("Apprentissage continu", "livres", "apprentissage continu")]):
        pid = d.id("pl"); tt = T(ph)
        pil.append(f'<div class="step g" id="{pid}"><img class="sic" src="assets/ic-{ic}.png" /><div class="stx"><div class="slb">{lb}</div></div></div>')
        d.j(f"tl.fromTo('#{pid}', {{ opacity: 0, y: 80, scaleY: 0.3, transformOrigin: '50% 100%' }}, {{ opacity: 1, y: 0, scaleY: 1, duration: 0.45, ease: 'back.out(1.8)' }}, {tt:.2f});"); d.snd("tick", tt, 0.45)
    layers(d, t["cred"], t["adn"], [
        (f'<div class="pc">{photo("mine-equipe", "60% 40%")}<div class="chips">{myth(d, "Un beau titre, un badge tout neuf", T("avec un beau titre"), T("ou un badge") + 1.0)}</div></div>', t["cred"]),
        (f'<div class="stk"><div class="shead">La crédibilité se gagne</div><div class="steps n4 pillars">{"".join(pil)}</div></div>', T("La confiance se gagne") - 0.3),
    ])
    t["quote"] = T("Pour refermer cette analyse")
    i = d.id("adn"); c1 = T("comprendre avant de corriger"); c2 = T("de corriger", c1)
    d.j(f"tl.fromTo('#{i}a', {{ opacity: 0, scale: 1.5 }}, {{ opacity: 1, scale: 1, duration: 0.35, ease: 'power3.out' }}, {c1:.2f}); tl.fromTo('#{i}r', {{ opacity: 0, scaleX: 0, transformOrigin: '0 50%' }}, {{ opacity: 1, scaleX: 1, duration: 0.4 }}, {c1 + 0.4:.2f}); tl.fromTo('#{i}b', {{ opacity: 0, scale: 1.5 }}, {{ opacity: 1, scale: 1, duration: 0.35, ease: 'power3.out' }}, {c2:.2f});")
    d.j(f"pop('#{i}d', {c2 + 1.2:.2f}, {{ y: 40 }});")
    d.snd("bass-hit", c1, 0.45); d.snd("swish", c1 + 0.4, 0.35); d.snd("bass-hit", c2, 0.45); d.snd("pop", c2 + 1.2, 0.4)
    scene(d, t["adn"], t["quote"], f'''<div class="big2"><div class="hand b2k">Le principe directeur absolu</div>
        <div class="b2w" id="{i}a">COMPRENDRE</div><div class="b2arrow" id="{i}r">avant de</div><div class="b2w g" id="{i}b">CORRIGER</div>
        <div class="chip n" id="{i}d" style="position: relative;">L'ADN de l'expert</div></div>''', "light")
    t["final"] = T("La question décisive")
    layers(d, t["quote"], t["final"], [
        (quote(d, 'On ne protège pas durablement les personnes contre elles-mêmes, mais <span class="hl">avec elles</span>.', "ecoute", T("on ne protège pas durablement"), "— la pensée à garder en tête"), t["quote"]),
    ])
    versus(d, t["final"], END_VOICE + 0.25,
           dict(title="Faire la police ?", img="novice", pos="50% 25%", t=T("faire la police") - 0.2, items=[]),
           dict(title="Bâtir la sécurité, main dans la main", img="ecoute", pos="50% 40%", t=T("ou de bâtir") - 0.1, items=[("Avec les équipes", T("avec les équipes"))]),
           vline="?")
    # carte de fin
    e = d.id("end")
    d.add(f'''<div class="scene clip endc" id="{e}" data-start="{END_VOICE:.2f}" data-duration="{DUR - END_VOICE:.2f}" data-track-index="4" style="z-index: 40;">
      <img src="assets/logo.png" class="endlogo" /><div class="endtag">Des normes aujourd'hui,<br /><span>un avenir durable demain</span></div></div>''')
    d.j(f"tl.fromTo('#{e} .endlogo', {{ opacity: 0, scale: 0.8 }}, {{ opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.6)' }}, {END_VOICE + 0.05:.2f}); tl.fromTo('#{e} .endtag', {{ opacity: 0, y: 30 }}, {{ opacity: 1, y: 0, duration: 0.4 }}, {END_VOICE + 0.4:.2f});")
    d.snd("signature-marque", END_VOICE, 0.55)
    return t

# ------------------------------------------------------------- sous-titres karaoké
def captions(d):
    out = []
    for k, c in enumerate(CH):
        s = W[c[0]]["t"]
        e = W[CH[k + 1][0]]["t"] if k + 1 < len(CH) else END_VOICE
        mode = CHAP[chap_of(s)][1]
        if any(a - 0.05 <= s < b - 0.3 for a, b in d.dark): mode += " dk"
        ws = []
        for j in c:
            w = W[j]; cls = {"!": " r", "*": " g"}.get(w["m"], "")
            ws.append(f'<span class="w{cls}" data-t="{w["t"]:.2f}">{esc(w["w"])}</span>')
        out.append(f'<div class="clip cap {mode}" id="cap{k}" data-start="{s - 0.05:.2f}" data-duration="{max(0.2, e - s):.2f}" data-track-index="9"><div class="capin">{" ".join(ws)}</div></div>')
    d.add('<div id="caps">' + "\n".join(out) + "</div>")

# ------------------------------------------------------------- fonds, en-tête, route
def chrome(d):
    for k, (s, mode, bg) in enumerate(CHAP):
        e = CHAP[k + 1][0] if k + 1 < len(CHAP) else DUR
        d.add(f'<div class="clip bgl {bg}" id="bg{k}" data-start="{s:.2f}" data-duration="{e - s:.2f}" data-track-index="0"><div class="ring r1"></div><div class="ring r2"></div></div>')
    cv_end = T("Le but de cette exploration")
    d.add(f'<div class="clip hdr" id="hdr" data-start="{cv_end - 0.3:.2f}" data-duration="{END_VOICE - cv_end + 0.3:.2f}" data-track-index="1"><div class="hlogo"><img src="assets/logo.png" /></div></div>')
    labels = ["Piège", "Policier", "Terrain", "Humain"]
    stops = "".join(f'<div class="stop" id="rs{k}" style="--k: {k};"></div><div class="stopl" style="--k: {k};">{l}</div>' for k, l in enumerate(labels))
    d.add(f'''<div class="clip route" id="route" data-start="{cv_end:.2f}" data-duration="{END_VOICE - cv_end:.2f}" data-track-index="3">
      <div class="rline"></div><div class="rfill" id="rfill"></div>{stops}
      <svg class="pin" id="pin" viewBox="0 0 80 100"><path d="M 40 96 C 40 96, 6 56, 6 36 A 34 34 0 1 1 74 36 C 74 56, 40 96, 40 96 Z" fill="#D9443A" stroke="#fff" stroke-width="5" /><circle cx="40" cy="36" r="13" fill="#fff" /></svg></div>''')
    d.j(f"tl.fromTo('#route', {{ opacity: 0, y: 30 }}, {{ opacity: 1, y: 0, duration: 0.4 }}, {cv_end:.2f}); tl.set('#rfill', {{ scaleX: 0 }}, 0); tl.set('#pin', {{ '--p': 0 }}, 0);")
    for k in range(4):
        s = CHAP[k + 1][0]
        d.j(f"tl.to('#pin', {{ '--p': {k}, duration: 0.8, ease: 'power3.inOut' }}, {s:.2f}); tl.to('#rfill', {{ scaleX: {k / 3:.3f}, duration: 0.8, ease: 'power3.inOut' }}, {s:.2f}); tl.to('#rs{k}', {{ backgroundColor: '#2E9B3E', borderColor: '#2E9B3E', scale: 1.25, duration: 0.25 }}, {s + 0.7:.2f}); tl.fromTo('#pin', {{ y: 0 }}, {{ y: -22, duration: 0.18, yoyo: true, repeat: 1 }}, {s + 0.8:.2f});")

# ------------------------------------------------------------- assemblage
def build(fmt, out_dir):
    d = Doc(fmt)
    chrome(d)
    film(d)
    captions(d)
    # bruitages : piste libre la plus basse, durée = durée réelle du fichier
    durs = {}
    def fdur(n):
        if n not in durs:
            durs[n] = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f"assets/sfx-{n}.wav"]))
        return durs[n]
    free, aud = {}, []
    for k, (n, t, v) in enumerate(sorted(d.sfx, key=lambda x: x[1])):
        if t < 0 or t > DUR - 0.1: continue
        dd = min(fdur(n), 3.0, DUR - t - 0.01)
        tr = next(x for x in range(20, 60) if free.get(x, -1) <= t)
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
    other = "../erreurs-debutant-hse-16x9"
    os.makedirs(other, exist_ok=True)
    for f in ["hyperframes.json", ".gitignore", "AGENTS.md", "CLAUDE.md"]:
        shutil.copy(f, other)
    open(os.path.join(other, "meta.json"), "w").write('{\n  "id": "erreurs-debutant-hse-16x9",\n  "name": "erreurs-debutant-hse-16x9",\n  "createdAt": "2026-10-13T15:00:00.000Z"\n}\n')
    open(os.path.join(other, "package.json"), "w").write(open("package.json").read().replace('"erreurs-debutant-hse"', '"erreurs-debutant-hse-16x9"'))
    if os.path.islink(os.path.join(other, "assets")) or not os.path.exists(os.path.join(other, "assets")):
        if os.path.islink(os.path.join(other, "assets")): os.unlink(os.path.join(other, "assets"))
        shutil.copytree("assets", os.path.join(other, "assets"))
    else:
        for f in os.listdir("assets"):
            shutil.copy2(os.path.join("assets", f), os.path.join(other, "assets", f))
    print("16:9", build("L", other))
