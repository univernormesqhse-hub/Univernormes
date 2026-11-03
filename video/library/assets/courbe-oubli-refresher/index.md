---
name: Courbe de l'oubli et dents de scie des recyclages — compétences tracées en direct sur un moniteur sombre
section: assets
slug: courbe-oubli-refresher
description: Graphique « compétences × temps » tracé en direct dans un moniteur sombre à lignes de balayage. Mode « érosion » : la courbe orange lumineuse part du haut et décroît (exponentielle), traverse le seuil pointillé jaune « EXIGENCES DU POSTE » et entre dans la zone de risque teintée de rouge ; des repères rouges s'accrochent à la courbe au rythme de la voix (consignes oubliées, mauvaises habitudes, procédures mal appliquées) avec étiquettes néo-brutales sur tige. Mode « dents de scie » : montée de la formation initiale puis rechutes relancées à chaque refresher (pics verts lumineux qui restent au-dessus du seuil) contre la courbe pointillée rouge « sans refresher » qui s'effondre ; pastilles « Formation initiale · acquérir » et « Refreshers · maintenir », légende sous le moniteur. Tête de tracé blanche, halo `drop-shadow`, tout en SVG (aucune image).
quand: Oubli des compétences, maintien des acquis, recyclages et formations périodiques, vieillissement d'un équipement ou d'une barrière, dérive d'un indicateur qu'on corrige par des actions régulières, toute notion « sans entretien ça se dégrade ».
component: src/refresherHseMetro/RefresherHseMetro.tsx
demo: Demo-CourbeOubli
tags: [courbe, graphique, oubli, compétences, recyclage, refresher, dents de scie, seuil, zone de risque, moniteur, SVG, formation]
---

## Utilisation
`<Curve W={900} H={660} a={t0} b={t1} mode="saw" />` (ou `mode="decay"` avec `marks={[[u, 'libellé'], …]}`, `u` = position 0 → 1 sur l'axe du temps, à caler sur la voix : `u = (temps - a) / (b - a)`). Niveaux : `lvlDecay`, `lvlSaw` (période `SAWP`, départ `SAW0`), `lvlNoRef`. Seuil à 0,6. Poser dans un conteneur `STAGE` + calque `SCAN`. Même film : check-list à trois états `<CRow mark="ok|ko" />`, interrupteurs des situations déclenchantes, calendrier à feuilles, citation à onde de choc, conversation WhatsApp tapée.
