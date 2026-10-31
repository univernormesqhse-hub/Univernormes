---
name: Rouleau 3D de machine à sous qui s'arrête sur chaque élément au rythme de la voix
section: assets
slug: rouleau-machine-a-sous
description: Cylindre en vraie 3D CSS (perspective + preserve-3d) portant N faces (ici les 20 sigles, couleur de leur famille) dans une machine à sous néo-brutale : cadre sombre à liseré or, ampoules qui chassent pendant la rotation puis clignotent à l'arrêt, ligne de gain (flèches rouges), levier qui se tire à chaque lancer. À chaque élément : un tour complet + un cran, décélération cubique calée pour que l'arrêt tombe pile au temps où la voix prononce l'élément, flou de vitesse proportionnel à la vitesse angulaire, rebond mécanique amorti (« clac »), éclair de la couleur de la famille autour de la fenêtre. Bruitage généré automatiquement : un « tic » à chaque face qui passe devant la ligne, levier, choc et ding à l'arrêt.
quand: Listes de sigles, de termes, de chiffres ou de lauréats à révéler un par un ; quiz, tirage au sort, « le mot du jour », lexique ; tout moment où l'on veut transformer une énumération en suspense.
component: src/siglesQhse/SiglesQhse.tsx
demo: Demo-RouleauSigles
tags: [machine à sous, rouleau, 3d, slot, tirage, sigles, révélation, suspense, levier]
---

## Utilisation
`<SlotReel />` lit les temps `SG[i].a` ; `reelAngle(t)` donne l'angle (cible `reelTarget(i) = i·STEP + 360·(i+1)`), `SPIN` = durée du lancer, `FACE_H` / `R3D` = géométrie du cylindre. `reelTicks(i)` produit les « tic » de bruitage. Pour une autre liste : remplacer `SG` (texte + couleur) et garder `STEP = 360 / N`.
