---
name: Arbre des scénarios « ET SI… ? »
section: assets
slug: arbre-scenarios
description: Nœud central (bloc néo-brutal coloré, icône + libellé) d'où poussent des branches en courbes de Bézier qui se tracent une à une, chacune terminée par une carte « ET SI… ? » (icône + scénario) qui grandit depuis son point d'attache au moment où la voix l'énonce.
quand: Toute arborescence de scénarios, causes ou conséquences : What if / SWIFT, arbre des causes simplifié, cartographie d'options, « si… alors… ».
component: src/swiftMetro/SwiftMetro.tsx
demo: Demo-ArbreScenarios
tags: [arbre, branches, scénarios, what if, SWIFT, mind map]
---

## Utilisation
`BR` = [libellé, icône, instant] ; chaque branche est un `path` `C` du nœud (330, 410) vers (500, y) tracé par `strokeDashoffset` entre instant − 1,6 et instant − 1,0 ; la carte suit avec `scale` ancré à gauche.
