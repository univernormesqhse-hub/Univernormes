---
name: Entrée dans la zone de danger (le danger devient risque)
section: assets
slug: exposition-zone
description: Zone de danger circulaire en pointillés rouges qui tourne autour d'un pictogramme ; un ouvrier marche en sautillant vers elle et y entre au mot « exposition » : la zone pulse, le badge « EXPOSITION ! » tombe et l'équation DANGER + exposition → RISQUE s'allume (la carte RISQUE passe du gris à l'orange).
quand: Toute explication danger / risque / exposition, notion de zone dangereuse, périmètre de sécurité, co-activité.
component: src/dangerRisqueMetro/DangerRisqueMetro.tsx
demo: Demo-ExpositionZone
tags: [danger, risque, exposition, zone, marche, équation]
---

## Utilisation
Dans `Defs` (3e temps) : `walk = prog(t, a, b)` déplace l'icône ouvrier de 0 à 480 px avec rebond `|sin|` ; `inz = t > b` déclenche pulsation de la zone, badge et carte RISQUE.
