# Capsule « Indicateurs QHSE » — comment la modifier

Fichier unique : `src/indicateursQhseMetro/IndicateursQhseMetro.tsx` (composition `IndicateursQhseMetro`).

- **Textes à l'écran** : dans les scènes `KpIntro`, `KpS1` à `KpS6` (attribut `l=` des `PopChip`, `Stamp2`, `Crossed`, et listes de `NumList` / `KpXList` / `KpFunnel`). Les titres de chaque page sont dans les blocs `<Heads h={…} />` en bas du fichier.
- **Sections et transitions gyrophare** : tableau `SECT` (titre, sous-titre, couleur, instant `at` en secondes).
- **Stations de la ligne de métro** : tableau `STATIONS`.
- **Couleurs** : constantes `DP_B`, `DP_R`, `DP_G`, `DP_O`, `DP_V`, `NAVY`, `TO_GOLD`.
- **Photos** : objet `IMG` (chemins dans `public/`).
- **Timings** : chaque élément a un `at` en secondes calé sur la voix ; les sous-titres sont dans `captions.ts` (début / fin en secondes).
- **Sons** : tableau `CUES` (gyro-carillon aux transitions, gyro-tinte aux titres, tampons, clics).
- **Sans particules** : les effets SwSparkle, SwFlare, SwDust, SwConfetti, SwFireflies, SwShatter, SwGrain et SwRipple ne sont pas montés dans le rendu.
- **Rendu** : `npm run render:indicateursqhse`.
