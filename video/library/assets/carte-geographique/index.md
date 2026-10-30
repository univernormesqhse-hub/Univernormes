---
name: Cartes géographiques animées (globe, épingle, arcs, zoom)
section: assets
slug: carte-geographique
description: Vraies cartes (d3-geo + Natural Earth 1:50m dans `public/geo/countries-50m.json`). Globe orthographique sur fond étoilé ouvert en iris : il tourne jusqu'à une ville, épingle qui tombe avec ondes concentriques, pays mis en lumière, arcs de grand cercle (halo + trait + tête lumineuse) qui partent vers 14 villes de tous les continents, puis rotation + zoom sur une région (pays et villes qui s'allument, pastilles de noms). Variante plate (Mercator) dans une fiche photo qui se retourne : zoom de l'Europe jusqu'à une ville, pays surligné, épingle, badges.
quand: Montrer où se trouve une organisation, un site, un client, une réglementation ; dire « mondial », « international », « dans votre pays » avec une preuve visuelle ; transition finale vers l'appel à l'action.
component: src/isoQuinzeCarte/Carte.tsx
demo: Demo-CarteGeographique
tags: [carte, globe, géographie, d3-geo, arcs, épingle, zoom, Afrique]
---

## Utilisation
`<Globe w h cx cy r center tilt arcs pins hi />` (`center` = [lon, lat] au centre, `arcs` = {from, to, p, c}, `pins` = {at, c, pop, ring?, label?}, `hi` = {nom du pays: {c, a}}) et `<FlatMap w h center zoom hi pins />`. Villes prêtes dans `CITIES`. Données chargées une fois (delayRender). Dépendances : d3-geo 3.1.1, topojson-client 3.1.0.
