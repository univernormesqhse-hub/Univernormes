---
name: Diagramme de Pareto vivant + court-circuit de la barre sécurité
section: assets
slug: court-circuit-pareto
description: Diagramme de Pareto à 8 barres triées qui poussent une à une avec leur icône, courbe cumulée qui se trace, accolade rouge sur les 2-3 barres dominantes (lueur orange), pansements quand les ressources arrivent (barres qui fondent), zoom sur la dernière barre, puis court-circuit : la minuscule barre de sécurité vire au rouge, grandit et saute en tête au milieu d'éclairs, couronnée « priorité absolue ».
quand: Toute capsule Pareto / 80-20, priorisation, exception de sécurité qui passe avant le coût, hiérarchisation de risques.
component: src/paretoMetro/ParetoMetro.tsx
demo: Demo-CourtCircuit
tags: [pareto, 80/20, graphique, barres, priorité, sécurité, court-circuit]
---

## Utilisation
Composant `Chart` piloté par le temps (instants codés : croissance, courbe, accolade, `shrink`, `zoom`, `fly`) ; données `V` (hauteurs illustratives) et icônes `BIC`.
