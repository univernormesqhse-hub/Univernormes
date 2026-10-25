---
name: Organigramme vivant filmé par une caméra
section: assets
slug: organigramme-camera
description: Organigramme dont les rôles (portraits détourés en médaillons) apparaissent au fil de la voix ; une caméra (zoom + panoramique interpolés par images clés) se pose sur chaque rôle, les autres se grisent, une fiche à puces cochées accompagne le rôle actif.
quand: Présenter une équipe, une chaîne de responsabilités, un processus à étapes reliées.
component: src/equipeIsac/EquipeIsac.tsx
demo: Demo-OrganigrammeCamera
tags: [organigramme, caméra, wahou]
---

## Utilisation
`NODES` (x, y, at), `LINKS` (a, b, up, at), `CAM = [t, cx, cy, zoom][]` → `translate(480 - cx·z, 465 - cy·z) scale(z)` ; `focusId(t)` grise les autres. Fiches : `ROLE_PANEL` placées dans un coin libre (jamais sous le bandeau de station).

## Origine
Capsule « Équipe HSE performante » voix Isac (`CondenseEquipeIsac`).
