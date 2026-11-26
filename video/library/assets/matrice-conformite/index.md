---
name: La matrice de conformité — capsule métro 2D (6 min 50) refaite d'après une présentation, papier cramé + cercles dorés, gyrophare avec alarme, rubalise, matrice qui se remplit, case « conforme » démasquée, barres de priorité triées
section: assets
slug: matrice-conformite
description: Capsule verticale 1080 × 1920 sur la voix d'origine d'une présentation (matrice de conformité réglementaire, réalité terrain, priorisation par les risques, jurisprudence, faute inexcusable et risque pénal, devoir de vigilance). Habillage papier cramé + deux cercles dorés, bordure de marquage au sol, ligne de métro à 12 stations, sept guichets ouverts par la transition gyrophare + alarme, faisceau gyrophare à chaque changement de titre, rubalise (ruban diagonal, barrière, ruban qui se déroule, zones délimitées), bandeaux de référence normative ISO 14001 / 45001. Briques nouvelles - `CmMatrix` (tableau texte / obligation / statut / action qui se remplit colonne par colonne, statuts en pastilles), `CmNerve` (noyau « matrice » relié aux domaines par des influx animés), `CmCheckbox` (case « conforme » cochée puis démasquée), `CmBomb` (bombe à retardement, mèche et minuteur), `CmPriority` (barres égales qui se trient par gravité), `CmCurves` (courbe jurisprudence contre marches de la réglementation), `CmPenal` (trois cartes sombres qui se retournent), `CmChain` (chaîne d'approvisionnement avec flux). Réutilise PicFX, PhotoCompare, Compartments, VerbCard + OrBadge, Scale2, TimeArrow, Counter, Crossed, Stamp2, QBubble, DrawWord, Medal.
quand: Capsule sur la veille et la conformité réglementaire, la matrice des exigences légales, la jurisprudence, la responsabilité pénale, le devoir de vigilance ; refaire une présentation commentée en motion design.
component: src/matriceConformiteMetro/MatriceConformiteMetro.tsx
demo: Demo-MatriceConformiteMetro
tags: [conformité réglementaire, veille, matrice, jurisprudence, faute inexcusable, responsabilité pénale, devoir de vigilance, priorisation, métro, gyrophare, rubalise, photos animées, 2D]
---

## Utilisation
Composition `MatriceConformiteMetro`. Les lignes de `CmMatrix` sont dans `CM_ROWS` ; `CmPriority`, `CmCurves`, `CmPenal` et `CmChain` se réutilisent pour toute capsule juridique ou réglementaire.
