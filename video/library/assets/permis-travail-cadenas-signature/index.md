---
name: Permis de travail verrouillé — trois activités cadenassées, feu rouge, signature en direct et tampon « validé » qui déverrouille tout
section: assets
slug: permis-travail-cadenas-signature
description: Trois tuiles néo-brutales d'activités critiques (soudure, levage, espace confiné) tombent du haut l'une après l'autre au rythme de la voix, bordées de rouge avec une pastille cadenas fermé. Un feu tricolore sombre s'allume au rouge (« rien ne démarre »). Le document « Permis de travail » glisse depuis la droite en pivotant (lignes de texte grisées, ligne de signature pointillée « Validation du superviseur ») ; la signature manuscrite se trace en direct (SVG `pathLength` + `strokeDashoffset`), puis le tampon « VALIDÉ » s'abat (échelle 2,4 → 1, rebond). Aussitôt les cadenas tournent et s'ouvrent l'un après l'autre (rouge → vert, bordures des tuiles qui passent au vert) et le feu passe au vert. Précédé dans le film par le maillet du « dernier mot » qui frappe avec onde de choc sur une photo ronde du superviseur.
quand: Permis de travail, autorisation de démarrage, consignation / déconsignation, validation hiérarchique, levée de réserve, « rien ne démarre sans… », toute séquence « verrouillé → signé → autorisé » (permis de feu, travaux en hauteur, espace confiné, levage, habilitations).
component: src/superviseurHseMetro/SuperviseurHseMetro.tsx
demo: Demo-PermisCadenas
tags: [permis de travail, cadenas, feu tricolore, signature, tampon, validation, soudure, levage, espace confiné, consignation, déverrouillage, néo-brutal]
---

## Utilisation
Scène `Permis` : tuiles `T3` (`[libellé, temps d'arrivée, icône]`, l'espace confiné est un regard dessiné `<Manhole s={1} />`), cadenas `un = prog(t, tOk + k·0,12, tOk + 0,2 + k·0,12)` → `Lock`/`LockOpen` ; feu : rouge si `t > tRouge && !ok`, vert si `ok` ; permis : `doc = sp(t, tDoc)` (translation 900 px + rotation 6°), signature `sig = prog(t, tSig, tSig + 0,65)` sur un chemin SVG libre, tampon `<SlamTag text="VALIDÉ" … />`. Caler `tOk` juste après le tampon. Même film : volet comparateur bureau ✗ / terrain ✓, épingles d'omniprésence, radar des dangers à balayage conique, viseur « en direct » ✗ → ✓, plan d'évacuation tracé, déchets qui tombent dans les bacs, fusion « HSE ? » scindée au laser, projecteur d'une colonne à l'autre, électrocardiogramme, manuel 3D recto-verso qui s'ouvre puis pages qui forment un bouclier devant le carrousel 3D, transitions accélérées par `TimeWarp` (`src/anim.tsx`).
