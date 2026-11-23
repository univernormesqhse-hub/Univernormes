---
name: Présentation du tableau de bord de gestion des EPI — vidéo motion design (2 min 05) à l'identité UNIVERSNORMES (marine, vert, blanc, globe et orbites), voix off fournie, interface Excel reconstituée et écran réel dans un ordinateur, transition « orbite »
section: assets
slug: tableau-de-bord-epi
description: Vidéo de présentation d'un outil (classeur Excel de suivi des EPI) en 1080 × 1920, indépendante de l'habillage métro. Fond clair à trame de points et halos marine / vert, icônes EPI qui dérivent, en-tête logo + pastille, barre de progression par scène, sous-titres en carte blanche (mots-clés en vert), poussée caméra à chaque coupe, transition `OrbitWipe` (bandes marine et verte en diagonale + globe blanc qui tourne). Briques : `Title` (mots qui montent), `Chip`, `Card`, `Laptop` (enregistrement d'écran réel dans un ordinateur avec reflet et zoom), `Cursor` (curseur qui se déplace et clique avec onde verte), `Count`, `Stamp`. Scènes : icônes EPI + questions, barre de navigation à 3 boutons, date du jour qui bascule, 3 compteurs valide / en cours / dépassé, filtres (segments) qui recalculent un mini tableau de bord, barres par atelier, grille de compteurs par EPI, fiche salarié avec liste déroulante, courbes mises en service / renouvellements, tableau Dotation, calcul « mise en service + validité = renouvellement » → jours restants → statut « Dépassé », référentiels et validités, bénéfices cochés, fin sur le logo animé.
quand: Présentation / démonstration d'un outil numérique (tableur, tableau de bord, application) pour UNIVERSNORMES ; vidéo commerciale d'un livrable.
component: src/tdbEpi/TdbEpi.tsx
demo: Demo-TableauBordEpi
tags: [EPI, tableau de bord, Excel, dotation, renouvellement, suivi, présentation produit, démo d'outil, curseur, interface, identité UNIVERSNORMES, motion design, 2D]
---

## Utilisation
Composition `TableauBordEpi`. Les briques (`Title`, `Chip`, `Card`, `Laptop`, `Cursor`, `Count`, `Stamp`, `OrbitWipe`) se réutilisent pour toute présentation d'outil ; les extraits d'écran sont dans `public/tdb-epi/`.
