# UNIVERSNORMES — Brochures

Deux brochures A4 portrait partagent le même système graphique et la même chaîne de production (texte JSON,
HTML/CSS, conversion PDF par Chromium) :

| Document | PDF impression (fond perdu 3 mm, TrimBox/BleedBox) | PDF numérique (A4, liens et QR code cliquables) |
|---|---|---|
| Brochure institutionnelle, 16 pages | `dist/universnormes-brochure-impression.pdf` | `dist/universnormes-brochure-numerique.pdf` |
| Formation en management QHSE, 12 pages | `dist/universnormes-formation-management-qhse-impression.pdf` | `dist/universnormes-formation-management-qhse-numerique.pdf` |

Le programme de la formation reprend mot pour mot la voix de la vidéo de présentation de la formation.

## Arborescence

```
content/brochure.json       textes de la brochure institutionnelle (un bloc par page)
content/formation-management-qhse.json  textes de la brochure formation (programme semaine par semaine)
content/prompts-photos-hd.md prompts pour régénérer les photos en haute définition
src/styles.css              système graphique : couleurs, typographies, grilles, mise en page de chaque page
src/build.py                brochure institutionnelle : assemble le HTML à partir du JSON (une fonction par page)
src/formation.py            brochure formation (réutilise les fonctions de build.py)
src/formation.css           styles propres à la brochure formation
scripts/render.mjs          conversion HTML → PDF (Playwright / Chromium) + contrôle de débordement
scripts/finalize.py         métadonnées PDF, TrimBox et BleedBox de la version impression
scripts/build.sh            chaîne complète : déclinaisons photo → HTML → 2 PDF
scripts/icons.mjs           génère les pictogrammes SVG (Lucide) dans assets/icons
assets/logo/                logo officiel (utilisé tel quel, jamais redessiné ni recoloré)
assets/fonts/               polices statiques et licences OFL
assets/icons/               pictogrammes vectoriels
assets/photos/source/       photos d'origine (les dossiers print/ et web/ sont régénérés)
```

## Modifier la brochure

- **Un texte** : éditer `content/brochure.json` ou `content/formation-management-qhse.json`, puis relancer
  `bash scripts/build.sh` (les deux brochures sont régénérées).
- **Une photo** : remplacer le fichier dans `assets/photos/source/` en gardant le même nom (ou changer le nom dans le
  JSON), puis relancer le script. Le cadrage se règle dans `src/build.py` (deuxième argument de `c.bg(...)`, en %).
- **Une couleur ou une taille** : variables `--navy`, `--green`, etc. en tête de `src/styles.css`.
- **Prévisualiser** : ouvrir `build/brochure-web.html` ou `build/formation-web.html` dans Chrome après un premier build.

## Prérequis

`python3` avec `qrcode`, `pypdf` et `fonttools` (`python3 -m pip install qrcode pypdf fonttools`), `ffmpeg`, et
Node.js avec Playwright (réutilisé depuis le dossier voisin `video/`).

## Charte appliquée

- Couleurs relevées sur le logo : marine `#0A2669` / `#061A47` (pages foncées), vert `#00A078` / `#6FD3B3`,
  fond sable `#F4F2ED`.
- Titres : Manrope ExtraBold ; sous-titres : Manrope SemiBold ; texte courant : Source Sans 3 ; chiffres, étiquettes
  et folios : IBM Plex Sans. Toutes les polices sont incorporées (TrueType), aucune police Type 3.
- Sur fond foncé, le logo est posé sur un cartouche blanc pour rester intact.

## Crédits et licences

- Polices Manrope, Source Sans 3 et IBM Plex Sans : SIL Open Font License 1.1 (fichiers `assets/fonts/*-OFL.txt`).
- Pictogrammes : Lucide (licence ISC).
- Photos et logo : propriété d'UNIVERSNORMES.
