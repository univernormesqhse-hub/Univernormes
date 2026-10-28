---
name: Scan qui révèle les dangers cachés
section: assets
slug: scan-dangers
description: Carte « INTERVENTION SIMPLE » avec des cases en pointillés floues et grisées ; un faisceau turquoise balaie la carte de gauche à droite et chaque case se révèle au mot prononcé (icône nette, bord rouge plein, libellé) ; badge final « N DANGERS RÉVÉLÉS ».
quand: Toute situation « ce qui paraît simple cache des risques » : analyse de tâche, JSA, visite de chantier, identification des dangers.
component: src/jsaMetro/JsaMetro.tsx
demo: Demo-ScanDangers
tags: [scan, révélation, dangers, flou, JSA, identification]
---

## Utilisation
`DG` = [libellé, icône, instant] ; `scan = prog(t, a, b, linéaire)` pilote le faisceau ; chaque case passe de `blur + grayscale + opacité 0,08` à nette quand `t > instant`.
