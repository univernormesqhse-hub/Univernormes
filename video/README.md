# Capsules vidéo UNIVERSNORMES (Remotion)

Capsules animées verticales (1080×1920, 30 i/s) dans la charte UNIVERSNORMES :
- `SuperviseurHSE` : « Le Superviseur HSE » (54 s).
- `DangerRisque` : « La différence entre danger et risque » (58 s) — machine à lame animée, logo officiel et
  photos de la banque (`public/promo/`) ; script dans `src/danger/`.
- `CharteQualite` : « La Charte Qualité » (5 min 11) — 5 chapitres, document « charte » animé en fil rouge,
  logo officiel, ingénieur présentateur et photos de la banque ; script dans `src/charte/`.
- `EpiEpc` : « EPI vs EPC : le guide sécurité » (4 min 29) — 4 chapitres, figure EPI annotée, tableau
  comparatif animé, pyramide de priorité ; images dans `public/epi/`, script dans `src/epi/`.
- `InductionHSE` : « L'induction HSE » (4 min 43) — 4 chapitres, parcours des 5 objectifs, exemple du travail
  à chaud, normes ISO 45001 / 14001 ; images dans `public/induction/`, script dans `src/induction/`.
- `IntegrationHSE` : « Comment réussir son intégration HSE » (63 s) — l'erreur classique, le plan 30 jours,
  le filtre de priorisation et le plan d'action validé par le terrain ; script dans `src/integration/`.
- `TirantAir` : « Comment calculer le tirant d'air » (75 s) — schéma animé à l'échelle (longe, absorbeur,
  taille, marge = 5,80 m) ; images dans `public/tirant/`, script dans `src/tirant/`.
- `ResponsableQHSE` : « Comment le responsable QHSE protège l'entreprise » (73 s) — première capsule en
  direction artistique premium (voir `docs/DIRECTION-ARTISTIQUE.md`, kit `src/premium/`).
- `NormesISO` : « Le vrai rôle des grandes normes ISO » (62 s) — ISO 9001 / 14001 / 45001, direction
  artistique premium ; script dans `src/normes/`.
- `EspacesConfines` : « Pourquoi les espaces confinés sont des pièges mortels » (67 s) — coupe de cuve animée
  (gaz, chute, sauveteur), permis d'entrée et ses 3 règles ; images dans `public/confines/`.
- `IncidentAccident` : « Comment différencier un incident d'un accident » (65 s) — scène animée du câble au
  sol (incident puis accident), chaîne causale brisée ; images dans `public/incident/`.
- `QseQhse` : « La vraie différence entre QSE et QHSE » (73 s) — tuiles-lettres Q·H·S·E animées, sans
  musique de fond (voix off seule) ; script dans `src/qhse/`.
- `DangerRisque2` : « Danger ou risque ? » (6 min 25) — 4 parties, peau de banane, définitions INRS animées,
  falaise et rambarde, matrice probabilité × gravité, hiérarchie de prévention ; bruitages seuls (ni musique ni
  son de fond) ; images dans `public/danger2/`, script dans `src/danger2/` (`npm run render:danger2`).
- `Iso2026` : « ISO 9001 version 2026 : ce qui change » (81 s) — les 4 évolutions (culture qualité, risques et
  opportunités, clarification / annexe A, transition sereine), plans ciné tirés du montage éditorial V4
  (`public/iso26/`), bruitages seuls ; script dans `src/iso26/` (`npm run render:iso2026`).
- `Ishikawa` : « Le diagramme d'Ishikawa » (7 min 18) — 5 parties, diagramme en arêtes de poisson animé, enquête
  des 5M, 8M des services, adaptation santé, lean (3M, 4 clés) ; images dans `public/ishikawa/`, bruitages seuls ;
  script dans `src/ishikawa/` (`npm run render:ishikawa`).
- `CertificationAccreditation` : « Certification vs accréditation » (4 min 42) — 5 parties, tampons, contrôleur des
  contrôleurs, tableau face à face, chaîne de confiance, agrément et triangle, astuce Client / Arbitre ; bruitages
  seuls ; script dans `src/certif/` (`npm run render:certif`).
- `PiegesIso2026` : « Les pièges de l'ISO 9001:2026 » (15 min 18) — créée à partir de l'audio seul : 5 parties
  (structure et clause 10.3 fantôme, culture et éthique, climat et résilience, IA, transition), bruitages seuls ;
  script dans `src/pieges/` (`npm run render:pieges`).
- `TravailHauteur` : « Le travail en hauteur » (5 min 47) — 5 parties : chronomètre d'une seconde, chute de 2 m,
  chaîne de causes, harnais et rituel en 3 temps, culture QHSE, autorité d'arrêt (STOP), choix final ; bruitages
  seuls ; script dans `src/hauteur/` (`npm run render:hauteur`).
- `RisqueBrutReel` : « Risque brut vs risque réel » (79 s) — cotation gravité × probabilité animée, matrice 4×4,
  criticité 16 → 4, illustrations reprises de la vidéo source (`public/risquebrut/`), bruitages seuls ; script dans
  `src/risquebrut/` (`npm run render:risquebrut`).
- `DictionnaireQHSE` : « Le dictionnaire essentiel des professionnels de la prévention » (40 s) — 10 fiches-sigles
  (QHSE, HSE, SST, EPI, EPC, DUERP, AT, FDS, RPS, PDCA) : lettres en cascade, définition mot à mot calée sur la voix,
  photos et icônes 3D, roue PDCA animée, bruitages seuls (sans musique ni ambiance). `npm run render:dictionnaire`.
- `SiglesQHSE` : « Le vocabulaire essentiel des sigles en QHSE » (60 s) — 20 sigles (AT, PA, TF, TG, IF, IG, LTI, LTIR,
  TRIR, MTI, FAI, RWC, DART, SIF, SIFp, RCA, ICAM, 5 Why, FTA, JSA) : tuiles-lettres, développé anglais, définition mot à mot,
  formules des indicateurs, pyramide de gravité, 5 pourquoi, arbre des causes, JSA ; bruitages seuls. `npm run render:sigles`.
- `ZonesAccidentTravail` : « Accident du travail : les 3 zones » (57 s) — carte animée du lieu de travail
  (entreprise, chantier, client, fournisseur), trajet domicile ⇄ entreprise avec détour refusé et détours admis
  (enfants, boulangerie), vie courante / droit commun, récapitulatif ; photos client fournies dans `public/zones/`,
  bruitages seuls. `npm run render:zones`.
- `ArsenalQHSE` : « L'arsenal indispensable du responsable QHSE » (89 s) — 10 outils (analyse des risques, DUERP,
  JSA/JHA, arbre des causes, 5 pourquoi, plan d'actions, audit interne, veille réglementaire, aspects environnementaux,
  tableau de bord) : bandeau « Outil n/10 », images fournies (`public/arsenal/`), actions cochées au rythme de la voix,
  escalier des 5 pourquoi, plan d'actions qui se remplit, final « connaître ≠ savoir utiliser » ; bruitages seuls.
  `npm run render:arsenal`.
- `AnalyseSwot` : « Comment utiliser l'analyse SWOT » (75 s) — accroche « risque de stagner », tuiles S/W/O/T qui
  se déplient, exemple du petit restaurant (illustrations de la vidéo source recadrées dans `public/swot/`), une section
  par quadrant avec mini-matrice et points cochés au rythme de la voix, modèle SWOT fourni, matrice complète
  internes / externes, conclusion stratégique ; bruitages seuls. `npm run render:swot`.
- `CinqDocumentsQHSE` : « Les cinq documents incontournables en QHSE » (28 s, partie 1/2) — compteur 10 documents,
  une fiche par document (politique QSE, DUERP développé lettre à lettre, programme annuel de prévention, procédures,
  instructions de travail) avec illustrations de la source recadrées (`public/docs5/`), suivi 5 dossiers cochés, teaser
  « à suivre » ; bruitages seuls. `npm run render:docs5`.
- `IdentificationEvaluation` : « Différencier l'identification et l'évaluation des risques » (59 s) — duel
  identifier ≠ évaluer, étape 1 avec les 5 dangers repérés à la loupe (pictogrammes fournis dans `public/ident/`),
  étape 2 avec matrice probabilité × gravité où se placent les dangers, résumé « on identifie puis on évalue » ;
  bruitages seuls. `npm run render:ident`.
- `FamillesRisquesSST` : « Les 40 familles de risques SST » (126 s) — une fiche par famille (n° / 40, groupe en
  couleur, photo issue des capsules précédentes ou composition d'icônes 3D), grille des 40 familles qui se remplit,
  récap final ; aucune image de la vidéo source, bruitages seuls. `npm run render:familles`.
- `PlsDeuxSecouristes` : « Position latérale de sécurité à deux secouristes » (16:9, 2 min 34) — recréation complète
  en motion design d'une démonstration de référence : vue zénithale animée, victime et deux secouristes africains
  articulés (cinématique des membres), annotations synchronisées, panneau d'étapes, check-list, narration réécrite
  en synthèse vocale française (`public/pls/voix-off-pls.m4a`). Storyboard et bible : `docs/pls-2-secouristes-storyboard.md`.
  `npm run render:pls`.
- `DuerpPlanPrevention` : « La vraie différence entre le DUERP et le plan de prévention » (72 s) — schéma animé
  chaudière / salariés internes (cadre DUERP) puis arrivée des intervenants extérieurs, coactivité, cadre plan de
  prévention, règle d'or en deux colonnes ; images fournies (`public/duerppdp/`) et visuels des capsules précédentes,
  aucune image de la source, bruitages seuls. `npm run render:duerppdp`.
- `IdentificationEvaluationUi` : « Identifier ou évaluer ? » au format UI motion premium (skill
  `video-promo-diagnostic-qhse`) — cartes d'interface en 3D, chaîne des 5 dangers, tableau de cotation qui se classe,
  jauges probabilité × gravité, cartes cochées, final marine avec règle tapée ; voix d'origine. `npm run render:identui`.
- `EquipeHsePerformante` : « L'architecture d'une équipe HSE performante » au format UI motion premium (skill
  `video-promo-diagnostic-qhse`) — règles empilées puis barrées, bureau ↔ chantier, 6 maillons, organigramme qui se
  construit (avatars à peau foncée), flux descendant / remontant, circuit fermé ; voix d'origine. `npm run render:equipe`.
- `TableauBordQhse` : « Pourquoi alléger votre tableau de bord QHSE » au format UI motion premium enrichi —
  mur de 50 indicateurs qui sature puis explose en particules (flou de mouvement), tuile survivante qui devient
  l'indicateur clé, boucle en parallaxe 3D, traversées de caméra entre plans, reflets lumineux, raccord final
  50 → 5 indicateurs vitaux ; valeurs marquées EXEMPLE ; voix d'origine. `npm run render:tableaubord`.
- `NormeIsoFonctionnement` : « Comment fonctionne vraiment une norme ISO » au format UI motion premium enrichi —
  compteur à rouleaux 9001 → 14001 → 45001, réseau « chaos » qui se réaligne en processus dans le cadre ISO
  (raccord début / fin), document qui se déplie en 3D, tiroir qui se referme, éventail de cartes par domaine,
  transitions en panoramique filé ; voix d'origine. `npm run render:normeiso`.
- `PodcastStudio` / `PodcastVertical` : podcast studio multicaméra des pièges de l'ISO 9001:2026 à partir des
  4 images de référence (`public/podcast/`), cadrages pilotés par la détection des locuteurs ; script dans
  `src/podcast/` (`npm run render:podcast`, `npm run render:podcast-v`).
- `PromoFormationQHSE` : vidéo promotionnelle de la formation Management QHSE (77 s, session du 05/11/2026 en ligne) — logo officiel
  (`public/promo/logo.png`), banque de photos fournie (`public/promo/`), badges ISO recréés, musique de fond générée.
- `PyramideQHSE` : « L'anatomie d'un système documentaire QHSE » (73 s) — pyramide documentaire à 5 niveaux, avec
  l'ingénieur au plan (photo détourée) ; script dans `src/pyramide/`.
- `AgentSuperviseur` : « Agent ou Superviseur HSE : qui fait quoi ? » (64 s) — les deux photos détourées + illustrations
  Fluent ; script dans `src/roles/`.
- `Iso9001` : « Les véritables évolutions de la norme qualité » (65 s) — illustrations 3D Microsoft Fluent Emoji
  (licence MIT, `public/fluent/LICENSE-fluentui-emoji.txt`) ; script dans `src/iso/`.
- `Prevention` : « Pourquoi la prévention rapporte gros » (61 s) — personnages et objets générés avec Nano Banana Pro
  (Higgsfield), détourés, dans `public/nanobanana/` ; script dans `src/prevention/`. Sans les visuels, prévisualiser avec
  `--props='{"placeholders":true}'` (images factices aux mêmes dimensions).
- `EquipeHSE` : « L'architecture d'une équipe HSE performante » (69 s) — organigramme vivant des 6 rôles,
  chaque rôle présenté en plein écran (photo détourée) puis envolé dans son médaillon. Code dans `src/equipe/`
  (`roles.ts` : rôles, cadrages, timings, liens ; `captions.ts` : script de la voix-off).

## Commandes
```bash
npm install
npm run studio            # aperçu interactif dans le navigateur
npm run render:superviseur # rendu + mastering audio (-14 LUFS) → 1080p et 720p dans out/
npm run render:equipe
npm run render:prevention
npm run render:iso
npm run render:roles
npm run render:pyramide
npm run render:promo
npm run render:danger
npm run render:charte
npm run render:epi
npm run render:induction
npm run render:integration
npm run render:tirant
npm run render:responsable
npm run render:normes
npm run render:confines
npm run render:incident
npm run render:qhse
```
Dans l'environnement cloud, pointer Remotion vers le Chromium préinstallé :
`REMOTION_BROWSER=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell`.

## Direction motion design
- 9 actes (`src/scenes/`), calés sur les sous-titres de la voix-off : Hook, Terrain, Permis, Urgence, Versus, Action, Manuels, Bouclier, Outro.
- Transitions de marque en diagonale (marine + liserés verts) aux changements d'acte, caméra avec dérive de zoom et secousses sur les impacts (tampon, VS, cadenas…).
- Typographie cinétique (mots révélés par masque, mots clés en vert), sous-titres révélés mot à mot.
- Fond vivant : formes floues en parallaxe, filigrane qui défile, particules.
- Sound design : bruitages synthétisés dans `public/sfx/` (whoosh, pop, clic, impact, ding, cloche), placés dans `CUES` (`src/SuperviseurHSE.tsx`).
- Boîte à outils d'animation dans `src/anim.tsx` (`Enter`, `Kinetic`, `Underline`, courbes d'accélération).

## Structure
- `src/captions.ts` : script de la voix-off + timings des sous-titres (à modifier pour une autre capsule).
- `src/SuperviseurHSE.tsx` : orchestration des actes, transitions, caméra, bruitages.
- `src/components/` : charte fixe (fond, bandeaux, sous-titres), personnages photo (`PhotoPerson`) et pictos SVG.
- `public/personnages/equipe-hse/` : les 6 rôles détourés pour la capsule équipe.
- `public/personnages/` : personnes détourées depuis la photo (superviseur = gilet orange, responsable = casque blanc) et photo d'équipe pour la scène finale.
- `public/voix-off.m4a` : piste audio (extraite de la capsule d'origine ; à remplacer par une voix-off propre).
- `public/fonts/` : Patrick Hand (sous-titres) et Montserrat (titres, bandeaux), embarquées.
