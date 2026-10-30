---
name: P&ID vivant + feuille HAZOP + rouleau de mots-guides + oscilloscope
section: assets
slug: pid-hazop
description: Schéma de procédé (P&ID) en SVG animé : cuve avec losange de danger, canalisation où le liquide circule en tirets (vitesse liée au débit), débitmètre dont l'aiguille passe dans le rouge avec étiquette « DÉBIT + », boucle de régulation FC qui passe en défaut (✕ clignotant), vanne de régulation qui s'ouvre trop (symbole qui s'élargit, « OUVERTURE EXCESSIVE »), réacteur qui pulse en orange (« ? ») puis reçoit un bouclier de protection ; en dessous, feuille HAZOP 6 colonnes (paramètre, mot-guide, déviation, causes, conséquences, protection) dont la ligne se remplit à la voix (révélation par masque). Aussi : rouleau 3D de machine à sous (rotateX, 5 faces) qui s'arrête sur chaque mot-guide avec cliquetis, courbe d'oscilloscope « en direct » qui sort de sa bande de fonctionnement normal (déviations entourées), sigle déplié ligne par ligne.
quand: HAZOP, procédés industriels, déviations, régulation, P&ID, analyse de causes, toute chaîne paramètre → déviation → cause → conséquence → barrière ; énumérations de mots-clés (rouleau).
component: src/hazopMetro/HazopMetro.tsx
demo: Demo-PidHazop
tags: [HAZOP, P&ID, procédé, vanne, régulation, feuille d'analyse, machine à sous, oscilloscope, déviation]
---

## Utilisation
`<PID />` (temps des étapes dans le composant), feuille : tableau `ROW` ([colonne, valeur, temps]). Rouleau : `WORDS` + `MotsGuides` (rayon `R = FH / (2 tan(π/5))` pour 5 faces). Oscilloscope : `sig(x, dev)` et `Objectif`.
