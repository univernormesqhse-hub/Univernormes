---
name: Radar des parties intéressées (orbite, flux entrants / sortants, badges exigences)
section: assets
slug: radar-parties
description: Panneau néo-brutal avec trois anneaux pointillés autour d'un moyeu « ton entreprise » au halo doré pulsé ; 9 nœuds colorés (pictogramme + libellé) apparaissent en cascade et orbitent lentement, reliés au centre par des rayons ; des particules bleues filent vers le centre (« qui peut influencer ? ») puis des particules orange partent vers l'extérieur (« qui est affecté ? ») ; chaque nœud reçoit ensuite une coche verte « exigences », avec un libellé barré « remplir un simple tableau » au début ; se replie pour laisser place au téléphone TikTok/WhatsApp.
quand: Cartographie des parties intéressées (ISO 9001/14001/45001 § 4.2), parties prenantes RSE, acteurs d'un projet, interfaces d'un processus ; montrer les influences dans les deux sens.
component: src/partiesMetro/PartiesMetro.tsx
demo: Demo-RadarParties
tags: [parties intéressées, radar, orbite, influence, exigences, ISO 4.2]
---

## Utilisation
Composant `Radar` : nœuds tirés du tableau `Q` (pictogramme, couleur, exemple) ; `inF` / `outF` pilotent les flux, `88.1 + k * 0.12` la cascade des coches, `shrink` la sortie vers `TikTokPhone`.
