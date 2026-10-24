# Librairie de motions

> Généré par `build-library.mjs` — ne pas éditer à la main. Source de vérité : `library/<section>/<slug>/index.md`.

10 motions validés. Galerie visuelle : `library/gallery.html`.

## Templates (1)

| Motion | Ce que ça fait | Quand l’utiliser | Code | Aperçu |
|---|---|---|---|---|
| [Capsule condensé « métro »](templates/capsule-metro-condense/index.md) | Vidéo verticale complète : couverture lettres-photos, tube de verre à 6 guichets, ligne de métro à 8 stations, scènes par partie, voix d’origine + sous-titres + SFX, outro. | Toute capsule pédagogique QHSE de 2 à 6 min à partir d’un dérush voix ; adapter les 6 guichets aux vraies parties de la vidéo. | `src/langageDg/LangageDg.tsx` | [mp4](templates/capsule-metro-condense/preview.mp4) |

## Assets (7)

| Motion | Ce que ça fait | Quand l’utiliser | Code | Aperçu |
|---|---|---|---|---|
| [Barre de recherche qui trouve et ouvre](assets/barre-recherche-ouvre/index.md) | Requête tapée lettre à lettre, liste de résultats scannée, « TROUVÉ ✓ », curseur qui clique et la fenêtre du résultat s’ouvre en plein cadre. | Introduire une notion clé, une comparaison ou un outil ; une fois par capsule. | `src/langageDg/LangageDg.tsx` | [mp4](assets/barre-recherche-ouvre/preview.mp4) |
| [Couverture en lettres-photos animées](assets/couverture-lettres-photo-animees/index.md) | Titre dont chaque lettre est remplie d’une photo qui dérive, contour marine et reflet blanc qui balaie ; photo en haut fondue dans le papier quadrillé, badge mono, chips, tube des guichets. | Frame 0 / miniature de chaque capsule ; titres courts (≤ 14 caractères par ligne à 104 px). | `src/langageDg/LangageDg.tsx` | [mp4](assets/couverture-lettres-photo-animees/preview.mp4) |
| [Ligne de métro + bandeau de station](assets/metro-stations/index.md) | Ligne colorée à 8 stations en bas de la zone utile, pastille qui avance, bandeau « LIGNE HSE · STATION x/8 » de 3 s à chaque arrêt. | Fil conducteur de toute capsule « métro » ; stations calées sur les mots clés de la voix. | `src/langageDg/LangageDg.tsx` | [mp4](assets/metro-stations/preview.mp4) |
| [Transition gyrophare](assets/transition-gyrophare/index.md) | Faisceau de gyrophare qui balaie l’écran, bandeau damier qui traverse en biais et carte de partie numérotée. | Transition principale entre parties d’une capsule (≈ 3,7 s). | `src/langageDg/LangageDg.tsx` | [mp4](assets/transition-gyrophare/preview.mp4) |
| [Transition loupe](assets/transition-loupe/index.md) | Une loupe balaie l’écran et grossit la carte de partie avant de la révéler. | Partie qui « examine » ou zoome sur un sujet (profil, analyse). | `src/langageDg/LangageDg.tsx` | [mp4](assets/transition-loupe/preview.mp4) |
| [Transition tube pneumatique](assets/transition-pneumatique/index.md) | Capsule qui file dans le tube de verre et livre la carte de partie au guichet. | Partie qui « livre » une idée clé ou change de posture. | `src/langageDg/LangageDg.tsx` | [mp4](assets/transition-pneumatique/preview.mp4) |
| [Transition store vénitien](assets/transition-store-venitien/index.md) | Lames de store qui pivotent pour révéler la partie suivante. | Révélation d’un contenu ou d’une photo ; aussi `<Shot blinds />` pour découvrir une image. | `src/accueilSecu/AccueilSecu.tsx` | [mp4](assets/transition-store-venitien/preview.mp4) |

## Sous-titres (1)

| Motion | Ce que ça fait | Quand l’utiliser | Code | Aperçu |
|---|---|---|---|---|
| [Sous-titres papier mot à mot](subtitles/sous-titres-papier-mot-a-mot/index.md) | Carte blanche manuscrite sous le métro, mots qui apparaissent en suivant la voix, mot clé en vert (`*emph*`). | Style par défaut des capsules UNIVERSNORMES (thème papier quadrillé clair). | `src/components/Captions.tsx` | [mp4](subtitles/sous-titres-papier-mot-a-mot/preview.mp4) |

## Sons (1)

| Motion | Ce que ça fait | Quand l’utiliser | Code | Aperçu |
|---|---|---|---|---|
| [Kit SFX de transition](sounds/kit-sfx-transition/index.md) | Séquence whoosh → 4 dings → soft-whoosh → thud → pop → whoosh qui accompagne chaque transition de partie. | À chaque transition (gyrophare, loupe, tube, store) ; volume 0,12–0,45 sous la voix. | `src/langageDg/LangageDg.tsx` | `public/sfx/whoosh.wav` |
