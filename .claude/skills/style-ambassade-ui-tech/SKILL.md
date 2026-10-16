---
name: style-ambassade-ui-tech
description: Applique le style « Ambassade » (ambassa.exe, vulgarisation tech / IA) à une vidéo verticale UNIVERSNORMES — fond gris très clair à trame de points, grandes « fusées » corail qui entrent par les coins, maquettes d'interfaces (fenêtres de code sombres, cartes produit, navigateur en pointillés), titres sans-serif très gras avec mot-clé en étiquette noire, gris de mots à venir, chips de technologies, rythme publicité tech. Utiliser quand on demande une vidéo « comme Ambassade », « style ambassa.exe », une capsule sur un outil numérique, un logiciel, l'IA, ou quand une capsule doit combiner les skills de William, Ray, Ambassade et Amadou.
---

# Style « Ambassade » — UI tech éditoriale, rythme publicitaire

Recette tirée de l'analyse de la vidéo de référence d'Ambassade (« Claude vient de révolutionner le motion
design », 51 s, 9:16, 576×1024, 30 i/s, voix off énergique). On reprend **le langage visuel**, jamais l'identité :
ni le pseudo « ambassa.exe », ni les filigranes, ni les logos de marques tierces.

## 1. Ce qui fait fonctionner le format

- **Ton** : accroche choc (« X vient de révolutionner Y »), négation des idées reçues (« Oubliez tout ce que vous
  savez… », « Et non, ce n'est pas… »), explication du « comment ça marche en coulisses », question rhétorique
  « Le résultat ? », chute tranchée (« … à la main, c'est terminé »), appel à l'action + mot-clé à commenter
  (« commente "GUIDE" »).
- **Structure** (≈ 45–50 s) : accroche logo + titre (0–4 s) → idées reçues balayées (4–12 s) → mécanisme en 3 temps
  (12–30 s) → coulisses (30–37 s) → résultat montré (37–42 s) → chute + CTA (42–50 s) → carte de fin.
- **Fond** : gris `#F2F2F2` avec trame de points `#DADADA` (pas 28–32 px) ; filigrane discret en bas.
- **Signature graphique** : 2 grandes **fusées / éclats corail** `#D86C50` (3–5 branches épaisses arrondies) qui
  entrent par un coin (haut-gauche ou bas-droite), restent en bord de cadre et changent de coin à chaque séquence.
- **Typographie** : sans-serif géométrique très gras (Montserrat 800 / Inter 800), noir `#111`, centrée ou alignée
  à gauche sous le visuel ; le **mot-clé passe en étiquette** (fond noir, texte blanc, coins 6 px, légère ombre) :
  « le motion design », « millimétrée », « en moins de 10 minutes ». Mots à venir affichés en gris clair `#BDBDBD`
  puis noircis à la prononciation (karaoké). Un mot fort peut grossir énormément (« des pixels », « ask? », « task »).
- **Objets UI** : fenêtres de code sombres `#1B1B1B` (3 pastilles, lignes de code = barres colorées corail/gris qui
  s'allongent), cartes produit blanches à ombre douce, navigateur en **pointillés** (« navigateur fantôme »),
  icône lecture sur tuile noire arrondie, mascotte pixel corail, chips de technologies sous un titre
  (« Remotion », « SVG », « Three.js » → ici « ISO 45001 », « DUERP », « JSA »…), grille de vignettes qui se
  remplit, loupe qui passe sur une grille et coche verte « corrige les bugs ».
- **Mouvements** : entrées en glissement + rebond court, cartes en légère perspective 3D, flou de mouvement sur les
  fusées, **morphing d'interface** (une carte se transforme en une autre), compteurs, pointeur qui clique.
- **Rythme** : un plan par proposition (≈ 1,5–2,5 s), changements nets, beaucoup de « pop » visuels.
- **Carte de fin** : « N'oublie pas de t'abonner à … », visuel produit au centre, étiquette noire « « GUIDE » »,
  sous-texte « pour passer au niveau supérieur ».

## 2. Adaptation UNIVERSNORMES / QHSE

- Fusées corail → garder la forme, couleur au choix : corail `#D86C50` ou orange sécurité `#F07A12` (cohérent avec la
  charte) ; trame de points sur le papier quadrillé clair habituel.
- Objets UI → maquettes d'outils QHSE : tableau de bord d'indicateurs, formulaire de déclaration, registre, logiciel
  de gestion documentaire, check-list numérique ; jamais de logos de marques réelles.
- Étiquettes noires → marine `#0E2A5C` possible ; mots-clés : délais, obligations, résultats.
- CTA : mot-clé à commenter (« commente "AUDIT" ») + site UNIVERSNORMES.

## 3. Production dans ce dépôt (Remotion, `video/`)

- Réutiliser `Kin`, `Pill`, `Card`, `Board` (palettes), `Deep`, `Stamp`, `Captions`, `SoundDesign`, `Outro`.
- Nouveaux blocs pour ce style : `Burst` (fusée à branches arrondies, entrée par un coin, `scale` + `rotate`),
  `DotGrid` (trame de points), `CodeWindow` (fenêtre sombre à barres de code animées), `GhostBrowser` (cadre en
  pointillés), `TagWord` (mot-clé en étiquette pleine), `KaraokeLine` (mots gris qui noircissent à la voix).
- Son : bruitages seuls — `sfx/swish` à chaque fusée, `sfx/pop` par carte, `tick` sur les chips, `sfx/click` par
  clic de pointeur, `bass-hit` sur la chute, `validation` sur la coche.
- Combinaison : Ambassade apporte **l'énergie publicitaire et les maquettes d'interface** ; à marier avec le texte
  surligné d'Amadou, les schémas pédagogiques de Ray et la mécanique promo de William.
