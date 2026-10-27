---
name: Étoile à 5 points autour d'un document
section: assets
slug: etoile-cinq-points
description: Document central (« PLAN DE PRÉVENTION ») dont les 5 lignes se colorent au fil de la voix ; 5 nœuds numérotés (icône + étiquette) popent sur un pentagone dont les côtés se tracent un à un, puis l'étoile intérieure se dessine en or et le document s'illumine.
quand: Toute liste de 5 éléments constitutifs d'un document, d'une norme ou d'une méthode (5 points, 5 piliers, 5 exigences).
component: src/planPrevEtapes/PlanPrevEtapes.tsx
demo: Demo-EtoileCinqPoints
tags: [étoile, pentagone, 5 points, document, liste, construction]
---

## Utilisation
`PTS` = [libellé, icône, instant, couleur] ; `pp(k)` place le nœud k sur le cercle (CX, CY, R). Côtés : `prog(t, a - 0.2, a + 0.3)` ; étoile : lignes k → (k + 2) % 5 en or avec `drop-shadow`.
