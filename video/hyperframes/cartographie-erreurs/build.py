# Génère index.html depuis src/template.html : python3 build.py
# Karaoké calé sur timeline.json (début / fin de chaque phrase de la voix), mise en scène en 8 scènes.
import json, re, html

TL = json.load(open("timeline.json"))
TEXT = {
    "hook1": "Votre entreprise : un !labyrinthe!… ou une *carte claire* ?",
    "hook2": "La cartographie des processus, c'est son *GPS*.",
    "def1": "Attention : ce n'est !pas un organigramme!.",
    "def2": "On suit les *flux*, de la demande du client jusqu'à la *valeur livrée*.",
    "def3": "C'est ce qu'exige la norme *ISO 9001*, au chapitre *4.4*.",
    "niv0": "Une bonne carte se lit sur *trois niveaux*.",
    "niv1": "*Macro* : la vue satellite, pour la direction et l'auditeur.",
    "niv2": "*Méso* : chaque processus, vu de l'intérieur.",
    "niv3": "*Micro* : le logigramme, tâche par tâche, pour l'opérateur.",
    "fam0": "Et partout, ^trois familles^.",
    "fam1": "Le ^management^, qui fixe le cap.",
    "fam2": "La ^réalisation^, qui crée la valeur pour le client.",
    "fam3": "Et le ^support^, sans qui tout s'arrête.",
    "err0": "Maintenant, les !cinq erreurs! à éviter.",
    "err1": "Un : dessiner le processus !idéal!, au lieu du processus *réel*.",
    "err2": "Deux : une carte si !complexe! que personne ne la comprend.",
    "err3": "Trois : un processus !sans pilote!.",
    "err4": "Quatre : une carte accrochée au mur, !jamais mise à jour!.",
    "err5": "Cinq : !aucun indicateur! pour la piloter.",
    "con1": "Une cartographie n'est pas faite pour l'auditeur.",
    "con2": "C'est un *outil de pilotage*, qui vit au rythme de l'entreprise.",
    "cta1": "Alors, votre carte : ^claire^, ou ^labyrinthe^ ?",
    "cta2": "Dites-le-moi en ^commentaire^.",
}
# style du karaoké par phrase : ink (Ray), grey (ambassa), blur (Amadou), rise (William)
MODE = {"hook1": "blur", "hook2": "grey", "def1": "ink", "def2": "ink", "def3": "ink", "niv0": "rise", "niv1": "rise", "niv2": "rise", "niv3": "rise",
        "fam0": "blur", "fam1": "blur", "fam2": "blur", "fam3": "blur", "err0": "ink", "err1": "ink", "err2": "ink", "err3": "ink", "err4": "ink", "err5": "ink",
        "con1": "grey", "con2": "grey", "cta1": "blur", "cta2": "blur"}
ORDER = list(TEXT)

def kara(key, top=250, extra=""):
    """Une phrase = un bloc ; chaque mot reçoit son instant au prorata des caractères."""
    s, e = TL[key]; e -= 0.15
    toks = re.findall(r"[!*^]?[^\s]+", TEXT[key])
    # regrouper les marqueurs multi-mots (!pas un organigramme!)
    words, mark = [], None
    for t in toks:
        m = t[0] if t[0] in "!*^" else None
        if m and mark is None:
            mark = m; t = t[1:]
        cur = mark
        if mark and mark in t:
            t = t.replace(mark, ""); mark = None
        words.append((t, cur))
    total = sum(len(w) + 1 for w, _ in words)
    acc, out = 0, []
    for w, m in words:
        t = s + (e - s) * acc / total
        acc += len(w) + 1
        cls = {"!": " r", "*": " g", "^": " h"}.get(m, "")
        out.append(f'<span class="w{cls}" data-t="{t:.2f}">{html.escape(w)}</span>')
    return f'<div class="kara {MODE[key]}" id="k-{key}" data-s="{s:.2f}" style="top: {top}px;{extra}">{" ".join(out)}</div>'

def seg_end(key):
    i = ORDER.index(key)
    return TL[ORDER[i + 1]][0] if i + 1 < len(ORDER) else 71.0

html_out = open("src/template.html").read()
for key in ORDER:
    html_out = html_out.replace("{{" + key + "}}", kara(key))
html_out = html_out.replace("{{hook1-cover}}", kara("hook1", 1330, " color: #fff;"))
# fin des blocs de karaoké (fondu quand la phrase suivante commence)
ends = {k: seg_end(k) for k in ORDER}
html_out = html_out.replace("/*KARA_ENDS*/", "const KARA_ENDS = " + json.dumps(ends) + ";")
SFX = [
    ("soft-whoosh", 0.05, .35), ("pop", 2.3, .45), ("pop", 3.2, .45), ("whoosh", 3.65, .45),
    ("swish", 3.9, .35), ("pop", 4.1, .4), ("bass-hit", 6.15, .5), ("pop", 6.5, .4), ("whoosh", 7.3, .45),
    ("thud", 8.0, .5), ("stylo", 9.45, .45), ("deep-hit", 9.8, .4), ("pop", 10.3, .4), ("tick", 10.9, .5), ("tick", 11.08, .5), ("tick", 11.26, .5),
    ("soft-whoosh", 11.3, .3), ("pop", 11.8, .35), ("validation", 12.9, .45), ("swish", 13.85, .4), ("page", 15.4, .4), ("tampon", 17.25, .6), ("whoosh", 18.3, .45),
    ("swish", 18.75, .4), ("click", 21.3, .5), ("pop", 23.6, .35), ("riser", 24.0, .25), ("whoosh", 24.6, .45), ("click", 24.85, .5), ("pop", 26.2, .35),
    ("whoosh", 27.45, .45), ("click", 27.7, .5), ("tick", 28.1, .4), ("tick", 28.38, .4), ("tick", 28.66, .4), ("tick", 28.94, .4), ("pop", 29.2, .35), ("pop", 29.6, .35), ("whoosh", 31.25, .45),
    ("soft-whoosh", 32.2, .4), ("pop", 34.1, .4), ("pop", 36.0, .4), ("ding", 37.7, .35), ("pop", 39.0, .4), ("deep-hit", 40.1, .35), ("whoosh", 40.85, .45),
    ("tick", 41.3, .4), ("tick", 41.38, .4), ("tick", 41.46, .4), ("tick", 41.54, .4), ("tick", 41.62, .4), ("thud", 42.0, .5), ("tension", 42.1, .25),
    ("thud", 43.75, .55), ("deep-hit", 43.95, .35), ("stylo", 44.1, .35), ("swish", 47.5, .4),
    ("thud", 47.85, .55), ("deep-hit", 48.05, .35), ("soft-whoosh", 48.1, .35), ("pop", 49.6, .35), ("pop", 49.9, .35), ("pop", 50.2, .35), ("swish", 50.85, .4),
    ("thud", 51.2, .55), ("deep-hit", 51.4, .35), ("tick", 51.6, .45), ("tick", 51.8, .45), ("tick", 52.0, .45), ("pop", 52.4, .4), ("swish", 53.15, .4),
    ("thud", 53.5, .55), ("deep-hit", 53.7, .35), ("cadenas", 55.0, .45), ("swish", 56.45, .4),
    ("thud", 56.8, .55), ("deep-hit", 57.0, .35), ("tick", 57.6, .4), ("tick", 57.9, .4), ("tick", 58.2, .4), ("whoosh", 59.45, .45),
    ("thud", 60.1, .5), ("stylo", 62.0, .4), ("tampon", 63.4, .6), ("soft-whoosh", 64.0, .35), ("riser", 64.6, .25), ("whoosh", 66.35, .45),
    ("swish", 66.7, .35), ("pop", 68.0, .45), ("pop", 68.6, .45), ("soft-whoosh", 69.2, .35),
] + [("click", round(69.6 + i * 0.11, 2), .22) for i in range(10)] + [("validation", 70.8, .45), ("signature-marque", 71.3, .6)]
import subprocess
DUR = {}
def dur(n):
    if n not in DUR:
        DUR[n] = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f"assets/sfx-{n}.wav"]))
    return DUR[n]
# piste libre la plus basse pour chaque bruitage (pas de chevauchement sur une même piste)
free, sx = {}, []
for i, (n, t, v) in enumerate(SFX):
    d = min(dur(n), 3.2)
    tr = next(k for k in range(20, 40) if free.get(k, -1) <= t)
    free[tr] = t + d + 0.01
    sx.append(f'      <audio class="clip" id="sfx{i}" src="assets/sfx-{n}.wav" data-start="{t}" data-duration="{d:.2f}" data-volume="{v}" data-track-index="{tr}"></audio>')
html_out = html_out.replace("      <!--SFX-->", "\n".join(sx))
open("index.html", "w").write(html_out)
print("index.html écrit")
