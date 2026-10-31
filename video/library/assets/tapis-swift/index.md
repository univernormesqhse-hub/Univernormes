---
name: Tapis roulant SWIFT à 5 machines-tampons + touches de clavier 3D
section: assets
slug: tapis-swift
description: Un dossier avance sur un tapis roulant (rouleaux qui défilent) et passe sous 5 machines-tampons (PÉRIMÈTRE, QUESTIONS, SCÉNARIOS, ÉVALUATION, MESURES) qui s'allument et frappent l'une après l'autre au rythme de la voix ; chaque frappe ajoute une pastille de couleur sur le dossier, une carte « ÉTAPE n / 5 » au-dessus affiche l'étape en grand avec son icône. Aussi : sigle déplié en touches de clavier 3D qui tombent et s'enfoncent (S·W·I·F·T) avec le mot complet lettre par lettre, écran partagé chaos → ordre (les « ? » libres de What-If flottent, ceux de SWIFT se rangent en grille 3 × 3 guidée), inauguration avec ruban coupé aux ciseaux et badge « MISE EN SERVICE », questions guidées tapées puis jouées en mini-scènes SVG (ventilateur qui s'arrête et se barre avec air vicié, cartons mal empilés dont le rayonnage penche avec triangle « ! », départ de feu et fumée dans un rayonnage avec « ALERTE »), compteur de situations cochées.
quand: SWIFT, What-If structuré, méthode en étapes, processus séquentiel, chaîne de validation, sigles à déplier, comparaison méthode libre / méthode structurée, scénarios d'entrepôt (ventilation, stockage, incendie).
component: src/swiftTechMetro/SwiftTechMetro.tsx
demo: Demo-TapisSwift
tags: [swift, what if, tapis roulant, tampon, étapes, sigle, clavier, entrepôt, incendie, ventilation, stockage]
---

## Utilisation
Tapis : `Schema` (étapes, temps, couleurs et icônes dans `MACH`). Touches : `<Key L c press up />` + `KEYS` / `WORDS` dans `Intro`. Chaos → ordre : `Compare`. Mini-scènes : `<SitScene t q />` (q = 0 ventilation, 1 stockage, 2 incendie) avec les questions dans `SIT`.
