---
name: style-scene-personnages
description: Applique le style « scène à personnages détourés » (analysé sur une vidéo de récit vertical) à une capsule UNIVERSNORMES — fond crème, scène claire avec bande de sol, personnages détourés debout avec ombre portée, enseigne marine à texte jaune, pastilles blanches / marines / rouges empilées et barrées, fiches blanches à lignes, sous-titre avec un mot surligné jaune. Utiliser quand on demande d'ajouter des personnages, de « mettre en scène » une capsule, ou une vidéo « comme la vidéo des personnages / du récit ».
---

# Style « scène à personnages détourés »

## Ce qui a été relevé sur la référence (576 × 1024, 30 i/s, 5 min 41)
- Fond de page `#F6F0E9`, scène `#F4EAD4` avec deux grands disques beige translucides, bande de sol `#E3D5BF`.
- Personnages détourés **en pied** posés sur le sol, ombre floue elliptique sous les pieds, légère respiration ; ils changent de pose (bras croisés, main au menton, téléphone) à chaque idée — c'est la « coupe ».
- Décors plats vectoriels derrière eux (enseigne de lieu, auvent rayé, étals, pompes) ; une vraie photo seulement pour un lieu réel.
- **Enseigne** : rectangle marine `#141B3A`, texte jaune `#F2B33D`, capitales grasses.
- **Pastilles** centrées, empilées en haut de la scène : blanches (texte marine ou rouge `#C8323C`), marines (texte jaune), pastille « PEUR | La honte » en deux tons ; une pastille peut être **barrée** au trait rouge.
- **Fiches blanches** à coins arrondis et ombre douce : titre en petites capitales grises, lignes avec libellé à gauche et montant vert / rouge à droite.
- Sous-titre centré, une ligne, marine très gras, un mot surligné par un bloc jaune.
- Barre de progression orange en haut, marque en haut à gauche (ne pas copier la marque de la référence).

## Règles d'usage
- **Jamais** les personnes de la vidéo de référence (personnes réelles, autre créateur) : utiliser uniquement les personnages UNIVERSNORMES de `public/personnages/` (`equipe-hse/*.png`, `ingenieur.png`, `responsable.png`, `superviseur.png`) ou des illustrations générées.
- Les détourés UNIVERSNORMES s'arrêtent à la taille : la bande de sol passe devant leur bord bas, l'enseigne se pose sur le sol (devant), les pastilles restent au-dessus des têtes (4 au plus).
- Seuls les nombres prononcés s'affichent sur les fiches.

## Composants prêts (src/sstDangersRisquesMetro/SstDangersRisquesMetro.tsx)
- `SdStage({y, at, people: [src, x, hauteur, at, miroir?][], sign: [texte, at], pills: [texte, 'w'|'n'|'r'|'x', at][]})` — `x` barrée.
- `SdCard({y, at, title, rows: [libellé, icône, at][], total?})` — fiche blanche à lignes.
