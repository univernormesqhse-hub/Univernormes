---
name: Capsule condensé « métro »
section: templates
slug: capsule-metro-condense
description: Vidéo verticale complète : couverture lettres-photos, tube de verre à 6 guichets, ligne de métro à 8 stations, scènes par partie, voix d’origine + sous-titres + SFX, outro.
quand: Toute capsule pédagogique QHSE de 2 à 6 min à partir d’un dérush voix ; adapter les 6 guichets aux vraies parties de la vidéo.
component: src/langageDg/LangageDg.tsx
demo: Demo-CapsuleMetroCondense
tags: [template, métro, condensé, couverture]
---

## Utilisation
Assembler le fichier à partir de la dernière capsule livrée (`src/langageDg/LangageDg.tsx`) :
- **en-tête** : `IMG`, couleurs, `OUTRO_AT`, `export const X_FRAMES = s(OUTRO_AT + 3.8)`, `SECT` (6 guichets : `at`, `title`, `g`, `k: gyro|loupe|tube|store`), `ALLDONE` ;
- **bloc commun** : Capsule, Tube, Header, Gyro, Loupe, Pneumatique, Store, SearchOpen, Shot, Pic… ;
- **métro** : `STATIONS` (8 arrêts calés sur les mots clés) + Metro, StationBanner, PhotoLetterAnim ;
- **scènes** : une par guichet, `Gate from={at+3.4}` ; `CUES` (SFX) ; export.
Zone utile : titre y=330, contenu 440→1370, métro y=1400, sous-titres dessous.

## Notes
Ne jamais inventer de chiffre ; signaler tout libellé ajouté. Couverture = frame 0 **et** attached_pic.
