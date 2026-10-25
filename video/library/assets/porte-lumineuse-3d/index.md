---
name: Porte 3D qui s’ouvre sur la lumière
section: assets
slug: porte-lumineuse-3d
description: Porte en arche qui pivote en 3D (rotateY), halo doré et rayons volumétriques derrière, personnage qui franchit le seuil en rapetissant.
quand: Idée de passage, d’accès, de « premier pas » (diplôme → terrain, entrée dans un rôle).
component: src/premierEmploi/PremierEmploi.tsx
demo: Demo-PorteLumineuse3d
tags: [3d, révélation, wahou]
---

## Utilisation
Composant `Porte` (phase 1) : `open = prog(t, a, a+1.4)`, `walk = prog(t, a+2.4, a+4.2)`. SFX : cadenas + soft-whoosh long.

## Origine
Capsule « Premier emploi en QHSE » (`CondensePremierEmploi`).
