---
name: Chaîne de dominos stoppée + mesures animées (consignation, VAT, EPI, permis)
section: assets
slug: dominos-mesures
description: Chaîne causale en dominos néo-brutaux (libellés verticaux, numéro au-dessus) qui surgissent un à un sur la voix, puis tombent en cascade (rotation autour du coin bas, 0,18 s de décalage, clic à chaque impact) et s'arrêtent net sur un mur vert « mesures de maîtrise » avec bouclier, tampon « CHAÎNE STOPPÉE ». Quatre mesures animées en SVG : armoire dont le levier passe de ON à OFF puis cadenas de consignation qui se verrouille (anse qui descend), voltmètre dont l'aiguille tombe à 0 V (vérification d'absence de tension), EPI (casque, gants, lunettes) qui tombent en place, autorisation de travail tamponnée « AUTORISÉ ». Aussi : sigle déplié lettre par lettre dans la barre de recherche, 4 verbes en cartes numérotées, frise de projet « APR ici ↓ », batterie animée pour les énergies résiduelles.
quand: APR, analyse de risques, arbre des causes simplifié, effet domino, enchaînement danger → dommage, consignation / LOTO, travaux électriques, permis de travail.
component: src/aprMetro/AprMetro.tsx
demo: Demo-DominosMesures
tags: [dominos, chaîne causale, consignation, cadenas, VAT, voltmètre, EPI, permis, APR]
---

## Utilisation
Dominos : tableau `DOM` ([libellé, temps, couleur]) + `FALL_AT` ; le mur est le 6e élément. Mesures : `<Lockout t at />`, `<VatMeter t at />`, `<Permit t at />` (SVG autonomes 300 × 250), EPI via `F`.
