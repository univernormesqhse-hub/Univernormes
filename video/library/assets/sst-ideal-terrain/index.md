---
name: La SST, de l'idéal au terrain — capsule métro 2D (2 min 27), musique de fond retirée, fossé idéal / réalité, 1 € → 4 à 6 €, tableau hier / aujourd'hui, sans particules
section: assets
slug: sst-ideal-terrain
description: Capsule verticale 1080 × 1920 sur une voix d'origine dont la musique de fond a été retirée par séparation de sources (UVR MDX-Net Voc_FT en onnx), puis nettoyée. Habillage papier cramé + deux cercles dorés, ligne de métro à 10 stations, transitions gyrophare + carillon, sans particules ni musique. Briques - `SpQuote` (citation à grands guillemets qui s'éclaire mot à mot, mots-clés en couleur), `SpGap` (deux photos idéal / réalité sur un sol qui se fend : le fossé s'ouvre, les cartes s'écartent, étiquette « LE FOSSÉ »), `SpRoi` (pièce 1 € → flèche → pile de pièces et montant prononcé), `SpTable` (tableau deux colonnes hier / aujourd'hui : en-têtes puis chaque case se dévoile au mot près), `SpCard` (carte-photo à pastille-icône).
quand: Capsule sur la SST, la culture sécurité, l'écart entre principe et terrain, le retour sur investissement de la prévention, l'évolution des EPI ; tout comparatif avant / après.
component: src/sstIdealTerrainMetro/SstIdealTerrainMetro.tsx
demo: Demo-SstIdealTerrainMetro
tags: [SST, santé sécurité au travail, culture sécurité, idéal, réalité, retour sur investissement, EPI, hier aujourd'hui, tableau, séparation de sources, sans musique, sans particules, métro, gyrophare, 2D]
---

## Utilisation
Composition `SstIdealTerrainMetro`. `SpTable` : `heads` = [gauche, instant, droite, instant], `rows` = [texte gauche, instant, texte droit, instant]. `SpRoi` n'affiche que les montants prononcés.
