#!/usr/bin/env python3
"""Post-traitement PDF : métadonnées et, pour la version impression, TrimBox / BleedBox (fond perdu 3 mm)."""
import sys
from pypdf import PdfReader, PdfWriter
from pypdf.generic import RectangleObject

src, dst, variant = sys.argv[1], sys.argv[2], sys.argv[3]
doc = sys.argv[4] if len(sys.argv) > 4 else "institutionnelle"
MM = 72 / 25.4
r = PdfReader(src)
w = PdfWriter(clone_from=r)
if variant == "print":
    b = 3 * MM
    for p in w.pages:
        x0, y0, x1, y1 = (float(v) for v in p.mediabox)
        p.bleedbox = RectangleObject([x0, y0, x1, y1])
        p.trimbox = RectangleObject([x0 + b, y0 + b, x1 - b, y1 - b])
        p.artbox = RectangleObject([x0 + b, y0 + b, x1 - b, y1 - b])
META = {
    "institutionnelle": {
        "/Title": "UNIVERSNORMES — Brochure institutionnelle",
        "/Subject": "Qualité · Sécurité · Environnement — Formations · Audits · Accompagnement · Conseil",
        "/Keywords": "QHSE, ISO 9001, ISO 14001, ISO 45001, formation, audit, accompagnement, conseil",
    },
    "formation": {
        "/Title": "Formation en management QHSE — UNIVERSNORMES QHSE",
        "/Subject": "Programme professionnel en 8 semaines — Qualité · Santé et sécurité au travail · Environnement",
        "/Keywords": "formation, management QHSE, ISO 9001, ISO 14001, ISO 45001, ISO 31000, ISO 19011",
    },
}
w.add_metadata({"/Author": "UNIVERSNORMES", **META[doc]})
with open(dst, "wb") as f:
    w.write(f)
print(dst)
