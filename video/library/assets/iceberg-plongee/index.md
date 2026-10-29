---
name: Iceberg avec plongée sous l'eau et racines
section: assets
slug: iceberg-plongee
description: Iceberg néo-brutal : pointe blanche « erreur humaine » au-dessus d'une ligne d'eau ondulante, puis la caméra plonge (translation verticale) sous la surface ; la masse immergée s'opacifie avec « cause profonde ? » et des points d'interrogation qui flottent, bulles qui montent, puis des racines brunes qui se tracent sous l'iceberg (causes profondes, facteurs contributifs).
quand: Toute notion « partie visible / partie cachée » : erreur humaine vs causes profondes, analyse d'accident, pyramide de Bird, culture sécurité, coûts cachés.
component: src/taprootMetro/TaprootMetro.tsx
demo: Demo-IcebergPlongee
tags: [iceberg, plongée, causes profondes, racines, enquête, accident]
---

## Utilisation
`<Iceberg dive={0..1} tipAt={t} roots={t?} />` : `dive` pilote la plongée (300 px) et l'opacité de la partie immergée ; `roots` lance le tracé des 5 racines.
