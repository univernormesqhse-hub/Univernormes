---
name: La démarche prévention HSE — capsule métro 2D sur fond blanc (deux cercles colorés), bordure marquage jaune / noir, roue de Deming « QHSE » au coin, couverture en triptyque éditorial, mots tracés au trait (remplacent les particules)
section: assets
slug: demarche-prevention-hse
description: Capsule métro (6 min 02, voix d'origine) entièrement en 2D, sans objet 3D ni particules, huit guichets et douze stations (gyrophare / tube / loupe, recherche qui ouvre un film photo 2D, NeoCaptions, aucune musique). Habillage `src/demarchePreventionHse/WhiteDecor.tsx` — `WhiteBg` (fond totalement blanc, deux grands cercles jaune / bleu très doux qui respirent), `DemingCorner` (roue PDCA à quatre quadrants qui gravit sa pente retenue par la cale, moyeu « QHSE », quadrant de la section courante mis en avant, tour complet à la fin), `DemingFrame` (variante de bordure PDCA qui tourne, non utilisée ici : la bordure reste le marquage au sol jaune / noir), `PDCA`. Couverture `KTriptych` : trois panneaux photo en biais qui se dévoilent l'un après l'autre (masque oblique, travelling), numéros 01 / 02 / 03, légendes, filet or. Techniques 2D (`partW2`) : `DrawWord` (mot dont le contour SVG se trace puis se remplit, soulignement or), `Fold` (carte à rideau), `Stamp2` (tampon qui frappe), `DpStrike` (barré animé), `Trace` (flèche tracée), `ArcGauge` (jauge en arc), temple à quatre piliers qui montent, balance actes / directives, F × G et grille de cotation qui s'allume, DUERP qui se déploie lettre à lettre et pousse ses racines, cible et flèche « à la source », quatre exigences en tiroirs, parcours de formation, jauge de vigilance qui s'érode puis remonte, trois vecteurs tissés en filet, indicateurs résultat (jauges TF / TG) contre moyens (barres), ligne qui se plie en boucle à quatre stations, classeur poussiéreux contre roue PDCA, `FilmStrip` (film photo à plat qui défile).
quand: Démarche de prévention HSE / SST de bout en bout (engagement de la direction, évaluation des risques, DUERP, plan d'action, formation, mesures techniques / organisationnelles / humaines, indicateurs TF / TG et de moyens, amélioration continue) ; toute capsule demandée « sur fond blanc », « sans 3D » ou avec la roue de Deming en habillage.
component: src/demarchePreventionHse/DemarchePreventionHse.tsx
demo: Demo-DemarchePreventionHse
tags: [démarche prévention, HSE, DUERP, PDCA, roue de Deming, fond blanc, 2D, métro]
---

## Utilisation
Fond : `<WhiteBg />` ; coin : `<DemingCorner active={indexSection} show={0..1} done={0..1} />` ; cadre PDCA optionnel : `<DemingFrame />`.
`DrawWord text at y size c dur out` ; `Fold x y w h at c ic l sub out` ; `Stamp2 x y at l c rot fs out` ; `ArcGauge cx cy r v c label` ; `FilmStrip imgs at w h`.
