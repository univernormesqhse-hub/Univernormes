---
name: Les acteurs de la prévention HSE — capsule métro 2D (fond blanc, roue de Deming « QHSE », bordure marquage jaune / noir, triptyque), chaîne des cinq acteurs, acronymes déployés, seuil de 300 salariés, droit d'alerte, engrenages et chaîne qui s'effondre
section: assets
slug: acteurs-prevention-hse
description: Capsule métro (6 min 07, voix d'origine) entièrement en 2D sur l'habillage de `demarche-prevention-hse` (`WhiteBg`, `DemingCorner`, bordure marquage au sol, couverture `KTriptych` Employeur / CSE · CSSCT / Salariés), sept guichets et douze stations, recherche qui ouvre un film photo 2D, NeoCaptions, aucune musique. Nouveaux outils 2D (`partW2`) — `NumList` (liste numérotée en tiroirs qui glissent, numéro qui devient ✓), `PopChip` (pastille à ressort), `Acronym` (acronyme qui se déploie lettre à lettre : DUERP, CSSCT), `Gear` (engrenage SVG) ; scènes `AcIntro` (cadre juridique, chaîne des cinq acteurs), `AcBoss` (pyramide dont le sommet s'allume, « déléguer à 100 % » barré, trois actions), `AcPilot` (stratège → terrain, chef d'orchestre, carte des dangers à épingles, missions), `AcCse` (voix des employés, seuil de 300 salariés en pictogrammes, CSE global, contributions, sirène du droit d'alerte), `AcDoc` (préventif, pont humain / environnement, étude de poste), `AcStaff` (citation tapée, Code du travail, quatre obligations, droit de retrait), `AcFinal` (horlogerie, un maillon lâche, tout s'effondre et se reforme). Réutilise `DrawWord`, `Fold`, `Stamp2`, `DpStrike`, `Trace`, `FilmStrip`.
quand: Rôles et obligations des acteurs de la prévention (employeur, responsable HSE, CSE, CSSCT, médecin du travail, salariés), droit d'alerte, droit de retrait, seuil CSSCT ; toute capsule sur une « chaîne de responsabilité » ou demandée sur fond blanc sans 3D.
component: src/acteursPreventionHse/ActeursPreventionHse.tsx
demo: Demo-ActeursPreventionHse
tags: [acteurs de la prévention, employeur, CSE, CSSCT, médecin du travail, droit d'alerte, droit de retrait, fond blanc, 2D, métro]
---

## Utilisation
`NumList items=[[libellé, sous-titre, icône, instant]] y enter h gap cols` ; `PopChip x y at l c ic fs out` ; `Acronym x y w title rows=[[lettre, suite, instant]] c at` ; `Gear cx cy r n a c`.
