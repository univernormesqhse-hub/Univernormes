---
name: La matrice des risques QHSE — fleuve qui tourne aux rapides, asymptote du risque zéro, vecteur G / P, grille 4 × 4, standardisation, formule de criticité, tamis, cartes de contraste
section: assets
slug: gestion-matrice-risques
description: Capsule métro (tube de verre à six guichets, gyrophare, recherche qui ouvre « matrice des risques » sur une mini-matrice colorée, carrousel 3D de photos de terrain, matrice 4 × 4 en vraie 3D sans valeurs affichées) sur la maîtrise et la gestion de la matrice des risques, police Cambria (repli Caladea), palette `XG` vert / `XY` jaune / `XO` orange / `XR` rouge / `XN` marine, seuls les chiffres prononcés sont affichés. Techniques nouvelles — `<XRiver>` long fleuve tranquille dont les vagues s'emballent en rapides au mot « faux » ; `<XAsymptote>` courbe du risque qui s'approche de zéro sans jamais l'atteindre (zéro barré) ; `<XVector>` composante gravité, composante probabilité puis vecteur résultant « risque » ; `<XGrid>` grille 4 × 4 en couleurs seules dont les axes 1 → 4 se numérotent sur la voix (option `pick`) ; `<XSnap>` cartes d'opinion éparpillées qui s'alignent sur une grille (standardisation) ; `<XFormula>` formule assemblée terme à terme (Criticité = Impact × Probabilité) ; `<XSieve>` tamis : le bruit de fond passe, le danger rouge reste ; `<XContrast>` deux cartes risque modéré / très critique (la seconde pulse) ; `<XLifeline>` électrocardiogramme qui se trace sous un bouclier (la survie) ; `<KOrbitSig>` orbite 3D des sigles de la matrice (couverture). Réutilise `Matrix3DScene` (`labels={false}`), `LOrg`, `VMorph`, `VFour`, `VWheel`, `LArch`, `Ring3D`, `SearchOpen`, `JCrtOff`.
quand: Évaluation et cotation des risques, matrice gravité × probabilité, criticité, typologie des risques (stratégique, opérationnel, financier, technique, externe), démonter le mythe du risque zéro, standardiser une méthode d'évaluation, hiérarchiser des risques.
component: src/gestionMatriceMetro/GestionMatriceMetro.tsx
demo: Demo-GestionMatrice
tags: [matrice des risques, gravité, probabilité, criticité, risque zéro, vecteur, typologie des risques, standardisation, filtre, cotation, 3D, Cambria]
---

## Utilisation
`XFormula terms=[[libellé, couleur, instant], …]` (`'='` et `'×'` s'affichent en opérateurs). `XGrid at gAt pAt cy` numérote l'axe gravité à partir de `gAt` puis l'axe probabilité à partir de `pAt` (0,35 s d'écart). `XSnap items snap` : les cartes s'alignent à l'instant `snap`. `XContrast low high` : n'y écrire que les scores prononcés par la voix.
