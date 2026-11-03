---
name: Comparateur à volet glissant — deux photos séparées par une poignée qui glisse vers la notion citée
section: assets
slug: comparateur-volet-glissant
description: Comparateur « avant / après » mis au service d'un face-à-face de deux notions (induction HSE contre sensibilisation HSE). Deux photos plein cadre sont superposées dans une carte néo-brutale ; la photo de gauche est découpée par un volet vertical blanc muni d'une poignée ronde « ⇔ ». Au rythme de la voix, la poignée glisse (ease in-out, 0,7 s) pour élargir la notion dont on parle : 74 % de l'image à gauche quand la voix décrit la première, 26 % quand elle passe à la seconde, retour au centre à la fin. Pastilles de rôle en haut à gauche et à droite, étiquette « 1 · objectifs » centrée en bas, puis deux puces-réponses qui tombent sous la carte (une par notion). Dans la même capsule : population de pictogrammes (nouveaux employés et visiteurs marqués, vague verte « tous les employés »), électrocardiogramme de la fréquence (un seul pic contre des pics périodiques), porte de site qui s'ouvre en 3D, badges d'accès à cordon qui se balancent, boucle ∞ à comète, tableau-checklist balayé ligne à ligne, carrousel cylindrique 3D en final.
quand: Toute comparaison de deux notions, de deux méthodes, de deux époques ou d'un avant / après (induction vs sensibilisation, correctif vs préventif, audit interne vs externe, ancien vs nouveau procédé), quand la voix alterne d'un côté à l'autre.
component: src/inductionSensibilisationMetro/InductionSensibilisationMetro.tsx
demo: Demo-ComparateurVolet
tags: [comparaison, avant-après, volet, slider, face-à-face, deux notions, induction, sensibilisation, HSE, photos, électrocardiogramme, population]
---

## Utilisation
Scène `DiffObj` : poser deux `Img` plein cadre dans une carte `W × H`, la seconde dans un conteneur `overflow: hidden` de largeur `sx * W` ; `sx` interpole entre les positions cibles aux temps de la voix (`[t0, cible]`). Poignée : trait blanc 8 px + rond « ⇔ ». Pastilles : `<Role k="i" />` / `<Role k="s" />`. Puces-réponses : `<Pill2 at ic l c />`. Électrocardiogramme : fonction `ecg(x, spikes)` + balayage `scan = prog(t, a, b) * W` (voir `DiffFreq`). Population : `DiffPublic` (grille 7 × 4, vagues décalées par colonne).
