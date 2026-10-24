---
name: Ligne de métro + bandeau de station
section: assets
slug: metro-stations
description: Ligne colorée à 8 stations en bas de la zone utile, pastille qui avance, bandeau « LIGNE HSE · STATION x/8 » de 3 s à chaque arrêt.
quand: Fil conducteur de toute capsule « métro » ; stations calées sur les mots clés de la voix.
component: src/langageDg/LangageDg.tsx
demo: Demo-MetroStations
tags: [métro, progression]
---

## Utilisation
`STATIONS = [{at, l, t}]` ; `<Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>` + `<StationBanner />`. SFX par station : soft-whoosh (−1,2 s), bass-hit, bell.
