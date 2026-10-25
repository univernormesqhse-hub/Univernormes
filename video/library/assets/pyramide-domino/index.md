---
name: Pyramide de priorités + dominos
section: assets
slug: pyramide-domino
description: Étages néo-brutalistes qui tombent du haut (sécurité → qualité → productivité), tampon « NON NÉGOCIABLE », puis huit dominos qui basculent en cascade (« effet domino »).
quand: Hiérarchiser des priorités, montrer un enchaînement de conséquences.
component: src/kaizen/Kaizen.tsx
demo: Demo-PyramideDomino
tags: [hiérarchie, priorités, wahou]
---

## Utilisation
Étages : `translateY((1 − pop)·−400)` ; dominos : `rotate(prog(t, a + k·0.18, …)·72°)` autour du coin bas-droit.

## Origine
Capsule « Méthode Kaizen » (`CondenseKaizen`).
