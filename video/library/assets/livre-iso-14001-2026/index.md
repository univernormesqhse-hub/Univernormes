---
name: Vidéo de vente d'un ouvrage — « Décrypter l'ISO 14001 — Version 2026 » (1 min 50), livre réel en volume 3D, livre ouvert dont les vraies pages tournent, transition « page qui tourne »
section: assets
slug: livre-iso-14001-2026
description: Vidéo commerciale verticale 1080 × 1920 pour vendre un livre, à l'identité UNIVERSNORMES (marine, vert) mariée aux tons de la couverture (vert sauge, brun olive, terre). Le livre est un objet réel : `Book3D` / `BookStage` (couverture du PDF, dos titré, tranche de pages, quatrième, ombre au sol, reflet qui balaie la couverture), `OpenBook` (livre ouvert incliné, les vraies pages du PDF tournent en 3D avec ombre de reliure), `Page` (page réelle posée avec surlignage vert qui se trace). Transition `PageTurn` : une grande feuille entre par la droite et repart vers la gauche à chaque coupe, avec bruit de page. Autres briques : `Rays` (rayons lumineux tournants derrière le livre), `Gyro` (gyrophare avec faisceau tournant pour l'échéance), `Photo` (Ken Burns + reflet), `Title`, `Chip`, `Card`, `Count`, `Stamp`, `NormRef` (bandeau de référence normative). Scènes : calendrier qui bascule sur AVRIL 2026 + « CHANGE » tamponné, ce qui change (3 cartes photo) et questions en bulles, révélation du livre en 3D (127 pages, Comprendre / Interpréter / Mettre en œuvre), frise 1996 → 2026 et compteur 400 000 organismes certifiés, 4 axes de révision en cartes qui pivotent sur la vraie page § 3.2, relation bidirectionnelle organisme ↔ environnement, livre ouvert (4 parties, 8 chapitres, NatéoPack, quiz de 12 questions), éventail de fiches pratiques et annexes réelles, compteur 189 exigences, barre de transition 2026 → 2029 avec gyrophare et 4 phases, cibles en photos, appel à l'action « COMMANDER » cliqué, logo.
quand: Vente ou lancement d'un livre, guide, e-book, manuel, catalogue ou rapport (tout document PDF) ; présentation commerciale d'un livrable écrit.
component: src/livreIso14001/LivreIso14001.tsx
demo: Demo-LivreIso14001
tags: [livre, ouvrage, e-book, vente, publicité, ISO 14001, environnement, livre 3D, page qui tourne, mockup, appel à l'action, identité UNIVERSNORMES, motion design, 2D]
---

## Utilisation
Composition `LivreIso14001`. Pour un autre livre : remplacer `public/livre-iso14001/couverture.jpg` et les pages (`pdftoppm -r 150 -jpeg`), puis ajuster `COVER_R` (hauteur / largeur de la couverture) et les numéros de pages des `spreads` d'`OpenBook`.
