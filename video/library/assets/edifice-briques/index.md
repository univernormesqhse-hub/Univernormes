---
name: Édifice de briques (récapitulatif bâti de bas en haut + couronnement)
section: assets
slug: edifice-briques
description: Mur néo-brutal de 20 briques colorées par famille (4 colonnes × 5 rangées) qui tombent une à une avec rebond, de la rangée du bas vers le haut, chacune avec sa pastille de numéro et un libellé court ; un bandeau « seulement les normes et les documents » se barre, puis un fronton doré se trace et 4 pierres de couronnement lumineuses (leadership, participation collective, prévention, amélioration continue) se posent sur le sommet au rythme de la voix, poussière dorée.
quand: Récapitulatif final d'une liste longue (principes, règles d'or, exigences, étapes) ; montrer que chaque élément est une brique et ce qui « couronne » le système.
component: src/principesMetro/PrincipesMetro.tsx
demo: Demo-EdificeBriques
tags: [édifice, briques, récapitulatif, construction, liste, neo-brutal]
---

## Utilisation
`<Edifice />` lit le tableau `PR` (numéro tel que prononcé, libellé, couleur) ; la cadence (`224.9 + k * 0.17`) et le couronnement (`roof`) se règlent en tête du composant.
