---
name: Matrice des risques qui se colore + cible vers la zone rouge (sirène)
section: assets
slug: matrice-cible
description: Matrice néo-brutale 5 × 5 (probabilité → / gravité ↑) dont les cases se colorent en vague diagonale (vert, jaune, orange, rouge selon P × G) ; une cible noire glisse d'abord sur l'axe des probabilités puis monte sur l'axe des gravités jusqu'à la case extrême, qui pulse en rouge avec halo ; tampon « ZONE ROUGE », bordure du panneau qui vire au rouge, balayage de gyrophare rouge (sirène), puis fondu vers une photo d'arrêt de production avec puces « ressources ».
quand: Expliquer la cotation des risques, une matrice de criticité (risques, aspects environnementaux, AMDEC), montrer qu'une combinaison forte probabilité × forte gravité déclenche une action immédiate.
component: src/evalRisquesMetro/EvalRisquesMetro.tsx
demo: Demo-MatriceCible
tags: [matrice, criticité, zone rouge, probabilité, gravité, sirène, neo-brutal]
---

## Utilisation
Composant `Matrice` : couleurs par `scoreC((i + 1) * (j + 1))`, vague `396 + (i + j) * 0.35`, trajet de la cible `mvx` / `mvy`, puis `sw` pour la bascule vers la photo. Réutiliser `Eq` pour l'équation R = P × G (+ exposition) qui précède.
