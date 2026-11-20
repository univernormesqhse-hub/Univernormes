---
name: La matrice d'Eisenhower — capsule métro (7 min 35) sur fond papier cramé et cercles dorés, photos du dépôt animées, matrice 2 × 2, bandeaux de source, transitions rubalise (ruban diagonal, barrière qui se lève, rubans qui se déroulent) et gyrophare + alarme
section: assets
slug: eisenhower
description: Capsule métro (voix d'origine) sur l'habillage `regles-or-papier` (`PaperGoldBg`, `DemingCorner`, bordure marquage au sol, couverture `KTriptych`, titre en lettres-photos « EISENHOWER »), six guichets ouverts par la transition `Gyro` avec `alarme`. Réutilise les boîtes à outils `dix-outils-qhse`, `coordonnateur-hse`, `criteres-smi` et `amdec-cinq-etapes`. Ajoute les scènes `EQ`, `EMatrix` (matrice 2 × 2 Urgent / Important avec cadrans qui s'allument, photos, éléments rangés, focus et barrés), `Toasts`, `WeekGrid`, `Waffle`, `RequestRain`, `ShieldGuard`, et le kit « rubalise » réutilisable : `NormRef` (petit bandeau de référence normative ou de source, par exemple « ISO 45001 § 6.1.2 », liseré rouge et blanc, reflet doré), `RibbonSweep` (ruban rouge et blanc qui traverse l'écran en diagonale et emporte l'image), `BarrierLift` (bandes de signalisation qui glissent, se ferment puis se lèvent comme une barrière), `TapeZone` (rubalise qui se déroule autour d'une zone avec son rouleau), `TapeCross` (rubans qui se déroulent en travers de l'écran comme transition), orchestrés par `TapeFX`.
quand: Gestion du temps, priorisation, délégation, routines de travail ; et pour toute capsule : citer une référence normative ou une source, transitions de chantier / sécurité, délimiter une zone à l'écran.
component: src/eisenhowerMetro/EisenhowerMetro.tsx
demo: Demo-EisenhowerMetro
tags: [Eisenhower, urgent, important, priorisation, délégation, gestion du temps, Covey, rubalise, référence normative, barrière, transitions, photos animées, gyrophare, alarme, fond papier, 2D, métro]
---

## Utilisation
`<TapeFX events={[[t, 'ribbon' | 'barrier' | 'tape'], …]} zones={[[x, y, w, h, début, fin], …]} refs={[[t, 'ISO 45001 § 6.1.2', 'RÉFÉRENCE'], …]} />` placé une seule fois dans la composition principale ; chaque transition est centrée sur l'instant de coupe `t` (± 0,5 s). `NormRef at l sub y dur` s'utilise aussi seul. N'afficher en bandeau que des références réellement citées dans la voix.
