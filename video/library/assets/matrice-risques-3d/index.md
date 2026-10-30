---
name: Matrice des risques 4 × 4 — 3D WebGL + 2D interactive
section: assets
slug: matrice-risques-3d
description: Matrice des risques en vraie 3D (WebGL) : 16 colonnes de hauteur P × G, du vert au rouge, qui surgissent en vague diagonale avec leur valeur ; orbite caméra ; « hiérarchiser » = les colonnes s'illuminent dans l'ordre croissant de leur valeur ; la caméra passe en vue de dessus et la 3D redevient un tableau, axes Probabilité ↑ / Gravité → qui se tracent. Variante 2D néo-brutale (Grid2D) : cases qui se construisent en vague, ligne P et colonne G surlignées qui se dessinent, case croisée mise en avant (les autres s'estompent), gyrophare d'alarme sur la case ; dé 3D CSS qui roule ; échelles 1 → 4 à segments ; afficheur à palettes « 3 × 4 = 12 ».
quand: Évaluation des risques, cotation P × G (ou F × G), criticité, matrice d'impact, toute grille à deux critères ; démonstrations « cas pratique ».
component: src/matrice44Metro/Matrix3D.tsx
demo: Demo-MatriceRisques3D
tags: [matrice, risques, 3D, WebGL, P × G, cotation, criticité, dé]
---

## Utilisation
3D : `<ThreeCanvas … gl={{alpha: true}}><Matrix3DScene u={t - début} /></ThreeCanvas>` (caméra : `KEYS`). 2D : `<Grid2D x y at scale hiP hiPAt hiG hiGAt pick pickAt alarm />`, `<Scale14 />`, `<Dice stop land />` dans `Matrice44Metro.tsx`. Couleur d'une valeur : `riskColor(v)`.
