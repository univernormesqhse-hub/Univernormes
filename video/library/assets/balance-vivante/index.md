---
name: Balance vivante (blocs qui tombent, fléau qui s'équilibre, disque au sommet)
section: assets
slug: balance-vivante
description: Balance néo-brutale à fléau en bois sur un pied triangulaire marine : des blocs étiquetés tombent du haut avec rebond (spring) sur le plateau gauche ou droit ; l'inclinaison est calculée en continu à partir du poids posé de chaque côté (± 13°, légère respiration), les blocs suivent l'angle ; option d'un disque lumineux (« HSE ») qui descend se poser au sommet, remet le fléau à l'horizontale et trace un arc pointillé entre les deux plateaux, avec libellés de plateaux remplaçables (PRÉVENTION / CONTRÔLE → PÉDAGOGIE / AUTORITÉ).
quand: Toute opposition à doser ou à concilier : prévention vs contrôle, pédagogie vs autorité, coûts vs bénéfices, gravité vs probabilité, exigences vs moyens ; montrer qu'un rôle fait tenir les deux côtés.
component: src/rhseMetro/RhseMetro.tsx
demo: Demo-BalanceVivante
tags: [balance, équilibre, prévention, contrôle, comparaison, neo-brutal]
---

## Utilisation
`<Balance L={[[label, at, couleur], …]} R={[…]} hseAt={t?} labL="…" labR="…" />` dans un conteneur 960 × 540. Pour reprendre une balance déjà chargée dans la scène suivante, passer les blocs avec `at = 0`.
