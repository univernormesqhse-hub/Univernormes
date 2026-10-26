---
name: Retour à la maison, le soir (récit illustré)
section: assets
slug: maison-retour
description: Maison SVG en néo-brutal ; le ciel passe au bleu nuit avec étoiles, les fenêtres s'allument, l'opérateur marche jusqu'à la porte qui s'ouvre sur un halo doré.
quand: Ouverture / fin d'une capsule sécurité (« rentrer sain et sauf »), enjeu humain, sens de la prévention.
component: src/sainSaufMetro/SainSaufMetro.tsx
demo: Demo-MaisonRetour
tags: [maison, retour, sain et sauf, nuit, récit, humain]
---

## Utilisation
`House w open night` : `open` 0→1 ouvre la porte (halo radial), `night` > 0,5 allume les fenêtres ; ciel = dégradé `rgba(14,42,92, 0.85 · night)` + étoiles scintillantes.
