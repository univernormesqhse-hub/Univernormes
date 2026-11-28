---
name: Les impacts de l'accident du travail — capsule métro courte (22 s), musique de fond retirée, moyeu qui pulse et quatre cartes-photos reliées, sans particules
section: assets
slug: impacts-accident-travail
description: Capsule verticale 1080 × 1920 sur une voix d'origine dont la musique de fond a été retirée par séparation de sources (UVR MDX-Net Voc_FT en onnx), puis nettoyée. Habillage papier cramé + deux cercles dorés, ligne de métro à 4 stations, sans particules ni musique. Briques - `AiHub` (moyeu rouge « accident du travail » qui pulse avec halo, rayons en pointillés tracés vers chaque carte au moment où elle est citée), `AiCard` (carte-photo 440 × 330 : photo en zoom lent, pastille-icône, titre, sous-titre monospace, tampon optionnel qui s'écrase, ex. « IRRÉVERSIBLE »).
quand: Capsule courte sur les conséquences d'un événement (accident, non-conformité, incident) ; toute idée centrale avec 3 ou 4 conséquences à relier.
component: src/impactsAccidentTravailMetro/ImpactsAccidentTravailMetro.tsx
demo: Demo-ImpactsAccidentTravailMetro
tags: [accident du travail, conséquences, blessure, arrêt de travail, justice, impact psychologique, moyeu, cartes, séparation de sources, sans musique, sans particules, métro, 2D]
---

## Utilisation
Composition `ImpactsAccidentTravailMetro`. Placer `AiHub` au centre (cx 540) et quatre `AiCard` aux coins (x 70 / 570, y 470 / 1000) ; donner à chaque rayon le même instant que sa carte.
