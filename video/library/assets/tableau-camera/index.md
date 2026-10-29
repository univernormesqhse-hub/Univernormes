---
name: Tableau lu à la caméra (zoom ligne → case, dézoom, mini-carte)
section: assets
slug: tableau-camera
description: Un tableau (ici le planning de causeries, thèmes × 12 mois) reconstruit en grille néo-brutale et parcouru par une caméra pilotée par images clés : zoom moyen sur l'intitulé de la ligne lue (ligne surlignée jaune), zoom serré sur chaque case au moment où la voix la cite (avatar coloré qui tombe avec rebond + onde jaune), dézoom sur la vue d'ensemble entre deux lignes ; bandeau des mois collant en haut quand on est zoomé, mini-carte avec cadre de visée rouge, compteur « THÈME n / 8 », vue finale complète avec décompte par animateur.
quand: Faire lire un tableau dense à l'écran sans perdre le spectateur : planning (causeries, audits, formations), matrice de responsabilités RACI, grille de cotation, tableau de bord ligne par ligne.
component: src/causeriesMetro/CauseriesMetro.tsx
demo: Demo-TableauCamera
tags: [tableau, zoom, caméra, planning, mini-carte, lecture guidée]
---

## Utilisation
Données dans `ROWS` (intitulé, temps, cases `[mois, personne, temps]`) ; `KEYS` génère les images clés (ligne : ×1,3, case : ×1,75, retour ×1) et `camAt(t)` les interpole ; `Lecture` borne le cadre pour ne jamais sortir du tableau.
