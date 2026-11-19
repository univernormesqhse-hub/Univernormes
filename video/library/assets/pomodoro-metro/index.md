---
name: La méthode Pomodoro — capsule métro 2D à motion design dense sur fond papier cramé et cercles dorés (bordure marquage, roue de Deming, triptyque) : minuteur tomate SVG, tempête de notifications, houle d'icônes, cerveau-jongleur, néon années 80, morphing POMODORO → TOMATE, anneau 0 → 25, bouclier hexagonal, roue des 4 étapes, dominos, montagne découpée, chaos / clarté, citation tapée, trophée
section: assets
slug: pomodoro-metro
description: Capsule métro (5 min 02, voix d'origine) sur l'habillage `regles-or-papier` (`PaperGoldBg`, `DemingCorner`, bordure marquage au sol, couverture `KTriptych` Focus / Pause / Victoire), huit guichets, douze stations, recherche qui ouvre un film photo, NeoCaptions, aucune musique. Treize nouveaux motions 2D : `TomatoTimer` (minuteur tomate : cadran gradué, secteur qui se vide, aiguille, reflets, sonnerie vibrante à ondes), `NotifStorm` (cartes de notification qui jaillissent des bords), `IconWave` (houle « tsunami numérique » portant des icônes), `Juggler` (cerveau relié à six tâches en orbite par des fils tirés, jauge d'énergie qui se vide), `MorphWord` (mot qui bascule lettre à lettre vers un autre), `BigRing` (anneau à 25 graduations qui se remplit avec compteur), `ShieldBubble` (bouclier hexagonal où ricochent les distractions), `CycleWheel` (roue d'étapes avec comète dorée et pastilles numérotées), `CycleStrip` (frise 4 × 25 min + pauses puis grand repos), `Dominoes` (chaîne de dominos qui libèrent des bénéfices), `MountainSlicer` (montagne qui se découpe en blocs « 25 »), `ChaosClarity` (gribouillis / grille ordonnée), `TypeQuote` (citation tapée dans une carte à guillemets), `Trophy3` (trophée et confettis), plus `lerpColor`.
quand: Gestion du temps, productivité, concentration, méthodes de travail (Pomodoro, time-blocking), charge mentale, multitâche ; toute capsule qui demande « une multitude de motion design complexe et impressionnant » sur fond papier.
component: src/pomodoroMetro/PomodoroMetro.tsx
demo: Demo-PomodoroMetro
tags: [pomodoro, gestion du temps, productivité, concentration, multitâche, motion design, fond papier, cercles dorés, 2D, métro]
---

## Utilisation
`TomatoTimer cx cy r at prog0 prog1 a b ring=[a,b] label` ; `NotifStorm at end n` ; `IconWave at y` ; `Juggler at drain=[a,b]` ; `MorphWord a b at sw y size ca cb` ; `BigRing cx cy r at v dur c sub` ; `ShieldBubble at cy` ; `CycleWheel cx cy r at nodes=[[l, ic, c, at]]` ; `CycleStrip at y` ; `Dominoes y items=[[l, ic, c, at]]` ; `MountainSlicer at slice y` ; `ChaosClarity at right` ; `TypeQuote at dur text y` ; `Trophy3 at cy`.
