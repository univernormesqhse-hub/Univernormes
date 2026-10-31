---
name: Rouleau prisme épuré (cadre noir, faces blanches, triangles jaunes) — arrêt calé sur la voix
section: assets
slug: rouleau-prisme
description: Modèle de rouleau validé par l'utilisateur : un prisme à 8 faces dans un cadre noir épais aux coins arrondis, flanqué de deux triangles jaunes. L'élément courant s'affiche en très gros caractères noirs sur la face centrale ; les faces voisines, inclinées en trapèze au-dessus et en dessous, montrent les éléments précédent et suivant dans leur couleur. Le contenu des faces change hors champ, donc une liste de N éléments (ici 15 normes ISO) défile sur le même prisme. À chaque élément : un tour complet + un cran avec décélération cubique, flou de vitesse et rebond amorti, arrêt pile au temps de la voix ; « tic » à chaque face qui passe, choc + ding à l'arrêt. Projection calculée face par face (perspective par élément, sans preserve-3d), ce qui évite les défauts de rendu 3D du navigateur. Sous le rouleau, la signification s'écrit mot à mot avec un trait de couleur qui se trace. Écran volontairement épuré : rien d'autre que le rouleau et la signification.
quand: Révéler une liste (normes, sigles, chiffres clés, lauréats, mots du jour) une par une avec suspense ; version minimaliste demandée par l'utilisateur pour les listes de normes.
component: src/isoQuinzeRouleau/IsoQuinzeRouleau.tsx
demo: Demo-RouleauIso
tags: [rouleau, prisme, machine à sous, minimaliste, normes iso, liste, révélation, triangles jaunes, cadre noir]
---

## Utilisation
Données : `N` (pre, num, desc, c, at, da, end). `LAND[i]` = instant d'arrêt, `reelPos(t)` = position en éléments (cible `posTarget(i) = i + N·(i+1)`), `FACES` = nombre de faces du prisme (8 → faces voisines bien inclinées), `PERSP` = perspective. `<Reel />` + `<Meaning />`. Pour une autre liste : remplacer `N` et les temps.
