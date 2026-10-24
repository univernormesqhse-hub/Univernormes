---
name: Couverture en lettres-photos animées
section: assets
slug: couverture-lettres-photo-animees
description: Titre dont chaque lettre est remplie d’une photo qui dérive, contour marine et reflet blanc qui balaie ; photo en haut fondue dans le papier quadrillé, badge mono, chips, tube des guichets.
quand: Frame 0 / miniature de chaque capsule ; titres courts (≤ 14 caractères par ligne à 104 px).
component: src/langageDg/LangageDg.tsx
demo: Demo-CouvertureLettresPhoto
tags: [couverture, titre, lettre-photo]
---

## Utilisation
`<PhotoLetterAnim ch="03 TYPES DE DG" src={IMG.cDir} size={104} ls={0} seed={3} />` — une ligne par appel, centrée dans un `Abs` pleine largeur. Même taille pour toutes les lignes ; réduire `size` si une ligne dépasse ~900 px.

## Notes
Variante statique : `PhotoLetter`. Sortie de la couverture : fondu 2,0→2,7 s.
