---
name: Maison qui se construit étage par étage + tampons
section: assets
slug: maison-etapes
description: Maison SVG qui pousse (fondations → murs + fenêtres → toit qui tombe), fiches d'étapes empilées qui glissent depuis la droite, tampon « SMART ✓ » sur chaque étape.
quand: Décomposer un projet en étapes, montrer une construction progressive, valider chaque étape d'un plan.
component: src/smartMethode/SmartMethode.tsx
demo: Demo-MaisonEtapes
tags: [projet, étapes, maison, construction, tampon, décomposer]
---

## Utilisation
Composant `Maison` : `FLOORS` (l, s, at, c) ; rectangles SVG en `scaleY(prog(...))` avec `transformOrigin` au sol ; toit en `translateY` ; tampon `lerp(2, 1, prog)`.

## Notes
Libellés d'étapes repris de la vidéo source (Fondations / Murs porteurs / Toiture).
