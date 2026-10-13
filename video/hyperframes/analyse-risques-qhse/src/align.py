# Aligne le script corrigé (src/script.txt) sur les mots horodatés de l'ASR (src/asr-words.json).
import json, re, unicodedata, difflib

def norm(w):
    w = unicodedata.normalize("NFD", w.lower())
    w = "".join(c for c in w if unicodedata.category(c) != "Mn")
    return re.sub(r"[^a-z0-9]", "", w)

def load():
    asr = json.load(open("src/asr-words.json"))
    # l'ASR colle parfois l'élision : on découpe aussi « l'entreprise » en « l » + « entreprise » des deux côtés
    a_tok, a_t = [], []
    for t, w in asr:
        for p in re.split(r"[’']", w):
            if norm(p):
                a_tok.append(norm(p)); a_t.append(t)
    words = []  # (texte affiché, marque, n° de phrase)
    for si, line in enumerate(open("src/script.txt", encoding="utf-8").read().strip().split("\n")):
        mark = None
        for tok in line.split():
            m = tok[0] if tok[0] in "!*" and len(tok) > 1 else None
            raw = tok
            if m and mark is None:
                mark = m; raw = raw[1:]
            cur = mark
            if mark and len(raw) > 0 and mark in raw[1:] + (raw[-1] if raw else ""):
                raw = raw.replace(mark, ""); mark = None
            words.append({"w": raw, "m": cur, "s": si})
    # sous-jetons normalisés par mot affiché
    s_tok, s_idx = [], []
    for i, w in enumerate(words):
        for p in re.split(r"[’'\-]", w["w"]):
            if norm(p):
                s_tok.append(norm(p)); s_idx.append(i)
    sm = difflib.SequenceMatcher(None, s_tok, a_tok, autojunk=False)
    t_of = {}
    for a, b, n in sm.get_matching_blocks():
        for k in range(n):
            i = s_idx[a + k]
            t_of.setdefault(i, a_t[b + k])
    # interpolation des mots non appariés
    known = sorted(t_of)
    for i in range(len(words)):
        if i in t_of:
            words[i]["t"] = t_of[i]; continue
        prv = max([k for k in known if k < i], default=None)
        nxt = min([k for k in known if k > i], default=None)
        if prv is None: words[i]["t"] = t_of[nxt] - 0.3 * (nxt - i)
        elif nxt is None: words[i]["t"] = t_of[prv] + 0.3 * (i - prv)
        else: words[i]["t"] = t_of[prv] + (t_of[nxt] - t_of[prv]) * (i - prv) / (nxt - prv)
    # l'ASR horodate un peu tard : on avance légèrement
    for w in words:
        w["t"] = round(max(0.0, w["t"] - 0.08), 2)
    # monotonie
    for i in range(1, len(words)):
        if words[i]["t"] < words[i - 1]["t"]:
            words[i]["t"] = words[i - 1]["t"]
    ratio = len(t_of) / len(words)
    return words, ratio

def chunks(words, maxc=44, maxw=8):
    """Découpe en sous-titres : coupure sur ponctuation forte, ou longueur max."""
    out, cur = [], []
    for i, w in enumerate(words):
        cur.append(i)
        txt = " ".join(words[j]["w"] for j in cur)
        nxt_new_sentence = i + 1 < len(words) and words[i + 1]["s"] != w["s"]
        strong = w["w"][-1] in ".?!:;" or w["w"].endswith("»")
        soft = w["w"][-1] == "," and len(txt) > 22
        if nxt_new_sentence or strong or soft or len(txt) > maxc or len(cur) >= maxw:
            out.append(cur); cur = []
    if cur: out.append(cur)
    return out

def find(words, phrase, after=0.0):
    """Instant du premier mot de « phrase » (après l'instant « after »)."""
    target = [norm(p) for p in re.split(r"[\s’'\-]+", phrase) if norm(p)]
    flat = []
    for i, w in enumerate(words):
        for p in re.split(r"[’'\-]", w["w"]):
            if norm(p): flat.append((norm(p), i))
    for k in range(len(flat) - len(target) + 1):
        if [f[0] for f in flat[k:k + len(target)]] == target and words[flat[k][1]]["t"] >= after:
            return words[flat[k][1]]["t"]
    raise KeyError(phrase)

if __name__ == "__main__":
    W, r = load()
    print("mots", len(W), "appariés %.0f%%" % (r * 100))
    C = chunks(W)
    print("sous-titres", len(C))
    for c in C[:12] + C[-6:]:
        print(f'{W[c[0]]["t"]:7.2f}', " ".join(W[j]["w"] for j in c))
