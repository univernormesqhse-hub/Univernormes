---
name: Déploiement en étapes + barre de progression
section: assets
slug: six-etapes-progression
description: Barre hachurée « DÉPLOIEMENT n/6 » qui avance, grille de 6 cartes qui s’activent et se cochent une à une, puis des points dispersés qui s’alignent (« ne pas s’éparpiller »).
quand: Méthode en N étapes, plan de déploiement, procédure.
component: src/kaizen/Kaizen.tsx
demo: Demo-SixEtapesProgression
tags: [étapes, progression, néo-brutal]
---

## Utilisation
`STEPS = [{l, ic, a}]` ; barre linéaire ; alignement `lerp(position aléatoire → ligne)`.

## Origine
Capsule « Méthode Kaizen » (`CondenseKaizen`).
