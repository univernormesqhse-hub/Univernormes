---
name: Indicateurs QHSE — capsule métro 2D (7 min 40) refaite d'après une présentation, sans aucune particule, mur de tableaux de bord, juge contre thermomètre vivant, noyade des 60 indicateurs, entonnoir à trois questions, faux 100 %, boussole
section: assets
slug: indicateurs-qhse
description: Capsule verticale 1080 × 1920 sur la voix d'origine d'une présentation « Mesurer moins, piloter mieux » (piège de la surcharge, bon indicateur, trois erreurs, méthode de tri, tableau de bord qui a du sens, conclusion). Habillage papier cramé + deux cercles dorés, ligne de métro à 12 stations, transitions gyrophare + carillon, rubalise, bandeaux ISO. Variante SANS PARTICULES - SwSparkle, SwFlare, SwDust, SwConfetti, SwFireflies, SwShatter, SwGrain et SwRipple sont retirés du rendu par le générateur. Briques nouvelles - `KpWall` (mur de tuiles de tableau de bord qui clignotent, grisent ou se réduisent à trois), `KpMini` (mini-graphique barre / courbe / anneau), `KpBurden` (pile d'indicateurs qui écrase l'équipe), `KpXList` (symptômes barrés d'une croix), `KpIdle` (engrenage qui tourne à vide), `KpThermo` (thermomètre vivant + courbe qui franchit le seuil), `KpGavel` (marteau du juge avec anticipation puis barré), `KpBar` (barre de réalisation sans chiffre), `KpFlood` (60 tuiles noyées par l'eau qui monte), `KpTower` (tour d'ivoire, décisions qui tombent, équipe perdue), `KpFunnel` (entonnoir à trois questions, indicateurs gardés ou jetés), `KpRing` (anneau 100 % + trophée puis loupe « ? »), `KpCompass` (la carte s'efface, la boussole trouve le nord).
quand: Capsule sur les indicateurs, KPI, tableaux de bord, revue de direction, pilotage par la donnée ; toute capsule où l'on veut un rendu sobre sans particules.
component: src/indicateursQhseMetro/IndicateursQhseMetro.tsx
demo: Demo-IndicateursQhseMetro
tags: [indicateurs, KPI, tableau de bord, pilotage, thermomètre, boussole, sans particules, métro, gyrophare, rubalise, photos animées, 2D]
---

## Utilisation
Composition `IndicateursQhseMetro`. Pour une capsule sans particules, reprendre la boucle de retrait du générateur (liste `SwSparkle … SwRipple`).
