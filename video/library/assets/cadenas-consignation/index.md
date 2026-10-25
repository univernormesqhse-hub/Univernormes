---
name: Cadenas de consignation + jauge d'énergie
section: assets
slug: cadenas-consignation
description: Photo de la machine qui se désature, cadenas SVG dont l'anse se ferme, étiquette « CONSIGNÉ – ne pas manœuvrer », jauge d'énergie qui tombe à 0 ✓.
quand: Illustrer une consignation / LOTO, une mise en sécurité avant intervention, ou tout « on coupe avant d'agir ».
component: src/plansPrev/PlansPrevention.tsx
demo: Demo-CadenasConsignation
tags: [consignation, cadenas, énergie, jauge, maintenance]
---

## Utilisation
Composant `Consignation` : `lock = prog(t, a, a+0.5)` pilote la translation de l'anse (path SVG), `nrj = 1 - prog(...)` vide la jauge et pilote `saturate()` de la photo (`Shot filter`). Étiquette en `nb('#fff')` bord rouge, rotation 8°.

## Notes
SFX : `sfx/thud` au verrouillage, `tampon` sur l'étiquette, `validation` quand la jauge atteint 0.
