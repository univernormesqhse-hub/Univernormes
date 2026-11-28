---
name: Maîtriser QSE avec le SMI — capsule métro 2D (6 min 04) avec bandeau « EXIGENCE » sur chaque page, silos qui fusionnent, blocs HLS qui s'emboîtent, pyramide documentaire, anneau budgétaire, sans particules
section: assets
slug: maitriser-qse-smi
description: Capsule verticale 1080 × 1920 sur la voix d'origine nettoyée d'une analyse « Maîtriser QSE avec le SMI » (définition, normes intégrables, avantages, déploiement en 4 phases, défis et coûts, avenir de la certification). Habillage papier cramé + deux cercles dorés, ligne de métro à 12 stations, transitions gyrophare + carillon, rubalise, sans particules. Nouveauté - `GmReq`, bandeau d'exigence persistant (rubalise + étiquette « EXIGENCE » + clause + libellé) qui glisse à l'entrée de chaque page et reste jusqu'à la suivante, piloté par une table `REQS` [début, fin, clause, texte]. Briques animées - `GmPile` (pile de manuels qui vacille et se fend), `GmSilos` (trois silos Q / E / S qui fusionnent en « Système intégré »), `GmBlocks` (blocs de construction qui s'emboîtent : structure de haut niveau), `GmDash` (trois tableaux de bord qui n'en font qu'un), `GmDivide` (pile de paperasse divisée), `GmPyramid` (pyramide documentaire construite par la base), `GmDonut` (anneau budgétaire, seules les parts prononcées chiffrées), `GmTime` (frise délai puis retour sur investissement), `GmWall` (mur de la résistance au changement dont les briques tombent).
quand: Capsule sur le système de management intégré (SMI), l'intégration ISO 9001 / 14001 / 45001, la HLS / Annexe SL, la conduite du changement, le budget d'une certification ; partout où chaque page doit rappeler l'exigence normative concernée.
component: src/maitriserQseSmiMetro/MaitriserQseSmiMetro.tsx
demo: Demo-MaitriserQseSmiMetro
tags: [SMI, système de management intégré, HLS, Annexe SL, ISO 9001, ISO 14001, ISO 45001, exigences, bandeau, pyramide documentaire, budget, sans particules, métro, gyrophare, 2D]
---

## Utilisation
Composition `MaitriserQseSmiMetro`. Pour réutiliser le bandeau d'exigence : copier `REQS` + `GmReq`, renseigner une ligne par page (mêmes temps que les entrées de `Heads`), puis placer `<GmReq />` juste après `<Heads … />` dans chaque scène. Le bandeau occupe y 389–441 ; démarrer le contenu à y ≥ 470.
