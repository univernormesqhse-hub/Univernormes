---
name: SST dangers et risques — capsule métro 2D (4 min 56) refaite d'après une présentation, voix nettoyée, sans particules, effet domino, danger qui devient risque, contagion en open space, batterie de l'épuisement, coût de l'inaction
section: assets
slug: sst-dangers-risques
description: Capsule verticale 1080 × 1920 sur la voix d'origine (passe-haut 70 Hz + débruitage spectral léger, aucune musique de fond détectée) d'une présentation « SST : dangers et risques » (au-delà de l'accident, qu'est-ce qu'un danger, risques courants, gestion proactive, coût de l'inaction). Habillage papier cramé + deux cercles dorés, ligne de métro à 12 stations, transitions gyrophare + carillon, rubalise, bandeaux ISO 45001, sans particules. Scènes à personnages détourés (technique extraite d'une vidéo de récit, personnages UNIVERSNORMES uniquement) : `SdStage` (scène crème, bande de sol, détourés avec ombre et respiration, enseigne marine à texte jaune, pastilles blanches / marines / rouges / barrées) et `SdCard` (fiche blanche à lignes). Briques nouvelles - `SdDomino` (dominos porteurs de conséquences qui tombent en chaîne), `SdLatent` (danger « potentiel » qui pulse, flèche en pointillés vers un dommage hypothétique), `SdBecome` (pastille DANGER qui se fend et vire au RISQUE), `SdTrack` (barre de suivi de cinq items, l'item en cours s'allume), `SdBattery` (batterie qui se vide et clignote), `SdSpread` (contagion poste par poste dans un open space, sans particule), `SdDose` (exposition chronique qui s'accumule jusqu'à la maladie), `SdShield` (bouclier qui protège les personnes et l'entreprise). Réutilise PicFX, NumList, Scale2, Medal, DrawWord, Crossed, Stamp2.
quand: Capsule sur la santé et sécurité au travail, la différence danger / risque, les risques psychosociaux, l'épuisement, les infections, les maladies professionnelles, l'accident du travail et la prévention proactive.
component: src/sstDangersRisquesMetro/SstDangersRisquesMetro.tsx
demo: Demo-SstDangersRisquesMetro
tags: [SST, danger, risque, domino, RPS, épuisement, infection, maladie professionnelle, accident du travail, prévention, sans particules, métro, gyrophare, 2D]
---

## Utilisation
Composition `SstDangersRisquesMetro`. `SdDomino`, `SdBecome`, `SdSpread` et `SdTrack` se réutilisent pour toute capsule sur la chaîne de conséquences d'un accident ou la typologie des risques.
