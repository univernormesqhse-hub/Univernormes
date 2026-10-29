---
name: Éclairs procéduraux + onde de surtension + bouclier en couches
section: assets
slug: eclair-surtension
description: Éclairs générés en code (tracé fractal déterministe à partir de `random(seed)`, branches secondaires, halo bleuté, scintillement en 3 temps, flash blanc plein écran) qui frappent une photo assombrie avec pluie et nuages qui défilent, ondes de choc orange au-delà du point d'impact ; puis schéma sombre : la foudre frappe l'entrée d'un câble pointillé, une boule de surtension court le long du tracé et fait clignoter en rouge (tremblement + halo) automates, contrôle-commande, instruments, sécurité ; enfin 4 couches de protection tombent en grille et tout repasse au vert avec coches.
quand: Risque foudre, électrique, surtensions, ATEX, propagation d'un incident le long d'un réseau (fluide, électricité, information), effet domino, défense en profondeur / barrières multiples.
component: src/foudreMetro/FoudreMetro.tsx
demo: Demo-EclairSurtension
tags: [foudre, éclair, surtension, procédural, protection, barrières]
---

## Utilisation
`<Bolt x0 y0 x1 y1 at seed w? c? />` (dans un parent positionné) + `<Flash ats={[…]} />` ; `Surtension` montre le trajet (`P`), les équipements (`EQ`, `NODE`) et les couches (`LAY`).
