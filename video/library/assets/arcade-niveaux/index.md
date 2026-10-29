---
name: Écran d'arcade à niveaux qui se débloquent
section: assets
slug: arcade-niveaux
description: Écran « SÉLECTION DU CHALLENGE » nuit étoilée avec titre néon jaune et « ▶ APPUIE SUR START » clignotant : grille 4 × 2 de tuiles verrouillées (cadenas, numéro) ; à chaque élément annoncé par la voix, la tuile s'allume dans sa couleur avec halo, pictogramme et « NIV. n », le cadenas saute en tournoyant ; la même grille en miniature (manette) reste dans le coin de chaque scène ; slam « NIVEAU n DÉBLOQUÉ » avec confettis et ondes.
quand: Gamification : challenges, concours, quiz, parcours de formation, étapes d'un programme ou d'un plan d'action à débloquer une à une.
component: src/challengesMetro/ChallengesMetro.tsx
demo: Demo-ArcadeNiveaux
tags: [arcade, gamification, niveaux, challenge, cadenas, néon]
---

## Utilisation
`<Arcade size gap />` lit `CHG` (titre, pictogramme, couleur, temps, slam) ; le déverrouillage se fait à `d.at + 0.3` (slam) ou `d.at − 3,3` (élément introduit par une transition).
