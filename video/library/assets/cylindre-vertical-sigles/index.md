---
name: Cylindre vertical — colonne qui tourne autour de son axe, sigles en tuiles qui passent un à un, signification qui s'écrit
section: assets
slug: cylindre-vertical-sigles
description: Variante « axe vertical » du rouleau prisme validé : une colonne noire à rebords elliptiques (haut et bas) tourne autour de son axe vertical ; ses 10 faces portent chacune un sigle en tuiles de couleur (lettres blanches, contour noir épais, ombre dure). À chaque sigle, la colonne fait un tour complet + un cran, de droite à gauche, avec décélération cubique, flou de vitesse proportionnel à la vitesse angulaire et rebond amorti ; l'arrêt tombe pile quand la voix prononce le sigle. Le sigle courant est face à nous, les voisins restent visibles de profil sur les bords courbes (projection face par face : `translateX(R·sinθ·s) scale(s) rotateY(−θ)`, s = perspective / (perspective + R·(1 − cosθ))), assombris selon l'angle ; ombrage cylindrique (bords noirs, reflet vertical), triangles jaunes haut et bas, halo de la couleur du sigle à l'arrêt. En-tête discret « rubrique + compteur 01 / 10 ». Sous la colonne, la signification s'écrit mot à mot calée sur les segments de parole, les lettres capitales qui forment le sigle dans sa couleur, trait de couleur qui se trace.
quand: Lexiques et dictionnaires de sigles, glossaires, « le mot du jour », listes de normes, d'indicateurs ou d'équipements à révéler un par un ; quand on veut le rouleau validé mais en colonne verticale (défilement horizontal).
component: src/siglesPreventionCylindre/SiglesPreventionCylindre.tsx
demo: Demo-CylindreVertical
tags: [cylindre, colonne, axe vertical, rouleau, sigles, tuiles, glossaire, dictionnaire, révélation, signification, machine à sous]
---

## Utilisation
Données `RAW` : `{g, desc, c, at, da, de}` en secondes de la voix (`at` = sigle prononcé, `da` → `de` = segment de parole de la signification ; caler sur la détection des silences, l'horodatage mot à mot de la transcription locale pouvant être en avance). `OFF` décale la voix pour laisser la couverture s'afficher. Géométrie : `FACES`, `FACE_W` (rayon `R3D` déduit), `PERSP`. Écrire la signification avec des capitales exactement sur les lettres du sigle (« Équipement de Protection Individuelle ») : elles prennent la couleur du sigle. Choisir des couleurs bien distinctes de l'encre du texte.
