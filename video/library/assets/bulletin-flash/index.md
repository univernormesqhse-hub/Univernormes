---
name: Bulletin « flash info » qui se remplit (vignette + assemblage final)
section: assets
slug: bulletin-flash
description: Bulletin A4 néo-brutal (bandeau marine « FLASH · INFO QSSE », bande tricolore, 5 blocs-rubriques à liseré coloré, pictogramme et lignes de texte factices) ; en vignette réduite dans le coin de chaque scène, il s'allume rubrique par rubrique au fil de la voix ; au final, les 5 blocs arrivent en cascade, reçoivent des coches vertes, la bande se colore jaune / orange / vert (code couleur qualité, sécurité, environnement) avec étiquettes, puis carte « satisfaction lecteurs » (étoiles qui se remplissent + courbe montante).
quand: Présenter un support de communication à construire (flash info, affiche du mois, journal interne, compte rendu type, rapport mensuel) en montrant sa structure qui se remplit.
component: src/flashInfoMetro/FlashInfoMetro.tsx
demo: Demo-BulletinFlash
tags: [bulletin, flash info, communication, rubriques, code couleur, satisfaction]
---

## Utilisation
`<Bulletin t={t} all? checks? />` lit `RUB` (titre, pictogramme, couleur, temps) et `QSE` (code couleur) ; `Mini` le pose en vignette à 26 % dans le coin d'une photo.
