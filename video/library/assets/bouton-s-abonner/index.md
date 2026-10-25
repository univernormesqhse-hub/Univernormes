---
name: Bouton « S'abonner » cliqué (néo-brutal)
section: assets
slug: bouton-s-abonner
description: Bouton rouge à ombre dure, curseur qui glisse et clique, bouton qui s'enfonce et devient « ✓ Abonné » noir, onde de choc, chips thématiques qui s'allument.
quand: Appel à l'abonnement en fin de capsule (skill capsule-ui-neo-brutal).
component: src/plansPrev/PlansPrevention.tsx
demo: Demo-BoutonSAbonner
tags: [abonnement, cta, néo-brutal, curseur, clic]
---

## Utilisation
Dans `Fin` : `click` = instant du clic ; curseur SVG interpolé `prog(t, click-1.2, click)` ; ombre `nb(RED, 10)` → `nb(NBK, 4)` + translation 6 px au clic ; cercle qui s'agrandit 0,7 s.

## Notes
Caler le clic sur le mot « abonne-toi » de la voix ; `sfx/click` + `validation`.
