---
name: Scanner 3D d'identification des dangers (HAZID) + schéma en tube
section: assets
slug: scanner-hazid
description: Le site industriel 3D du film « La ligne invisible » réutilisé dans une capsule claire, temps remappé (×1,55) sur la phase du scanner volumétrique : cônes de lumière qui balaient le site, étiquettes de dangers qui surgissent ; en 2D par-dessus, pastilles des dangers détectés qui s'ajoutent et compteur « SCAN · DANGERS DÉTECTÉS : n » en direct, titre blanc en surlignage jaune. Complété par : acronyme déplié dans la barre de recherche (HAZ·ard ID·entification), 4 cartes-photos de contextes avec onde radar et balayage rouge « systématique » suivi de coches, schéma en 4 étapes le long d'un tube de verre où descend une capsule lumineuse (texte tapé à la voix), tuiles de risques avec tampon « REPÉRÉ », frise conception → construction → exploitation avec épingle, éclair de gyrophare non bloquant.
quand: HAZID, HAZOP, identification des dangers, inspection, audit terrain, « repérer », « détecter », toute démarche en étapes successives.
component: src/hazidMetro/HazidMetro.tsx
demo: Demo-ScannerHazid
tags: [HAZID, scanner, 3D, WebGL, dangers, schéma, étapes, acronyme, gyrophare]
---

## Utilisation
`<ThreeCanvas><Scene3D t={10.4 + (t - début) * 1.55} /></ThreeCanvas>` (fenêtre du scanner du film) + liste `HAZ` pour les pastilles/compteur. Schéma : tableau `STEPS` et composant `Schema`. Acronyme : `Intro` (largeurs `maxWidth` animées). `GyroFlash` pour une transition sans écran-titre.
