---
name: Les 7 règles d'or du responsable QSE — refonte métro 2D sur fond papier cramé et deux cercles dorés (bordure marquage jaune / noir, roue de Deming « QHSE », triptyque), bandeau « RÈGLE D'OR · n / 7 », batterie, manuel au tiroir, courbe de charge lissée, chaos → flux doré, escalier de l'excellence
section: assets
slug: regles-or-papier
description: Refonte de la capsule `reglesOr` (6 min 07, voix d'origine, sous-titres d'origine) sur l'habillage des capsules métro récentes, mais avec un nouveau fond `PaperGoldBg` (`src/reglesOrPapier/PaperDecor.tsx`) — papier crème de la capsule « mannequin », grain `feTurbulence`, taches d'usure, bords brûlés (vignettage brun chaud) et deux cercles **dorés** à opacité douce qui respirent ; toutes les surfaces « papier » du kit passent en `PAPER_CREME`. Huit guichets et douze stations, gyrophare / tube / loupe, recherche qui ouvre un film photo, NeoCaptions, aucune musique. Nouveaux outils 2D — `RuleBanner` (plaque sombre, médaille dorée numérotée qui tourne, « RÈGLE D'OR · n / 7 », reflet qui balaie), `Battery` (batterie qui se vide, sans pourcentage), `LoadCurve` (pics de charge qui se lissent), `ChaosToFlow` (segments éparpillés multicolores qui s'alignent en un flux doré fléché), `PaperPile` (pile de documents qui monte), `RoStairs` (escalier gravi marche après marche, drapeau doré au sommet) ; scènes `RoIntro`, `RoChallenge`, `RoPlan`, `RoOwn`, `RoLive`, `RoAudit` (triangle direction / manager / équipes avec flux de points dorés), `RoPeak`, `RoFinal`.
quand: Toute capsule demandée « sur fond papier », « papier cramé », « avec les cercles dorés », ou une refonte d'une ancienne capsule dans l'habillage métro récent ; règles d'or, management QSE, appropriation, audits, excellence opérationnelle.
component: src/reglesOrPapier/ReglesOrPapier.tsx
demo: Demo-ReglesOrPapier
tags: [règles d'or, management QSE, fond papier, cercles dorés, refonte, 2D, métro]
---

## Utilisation
`<PaperGoldBg />` (fond) ; `RuleBanner n l at y out` ; `Battery x y a b` ; `LoadCurve at smooth=[a,b] y` ; `ChaosToFlow at align=[a,b] y` ; `PaperPile x y at n dur` ; `RoStairs at y`.
