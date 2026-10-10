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
- `Iso9001Monde` : « Pourquoi la norme ISO 9001 domine le monde de l'entreprise » au format UI motion premium
  enrichi — tour de paperasse tamponnée qui s'effondre, ouvertures en iris, 4 piliers 3D, carte-titre qui se retourne,
  chemins libres vers une cible, radar des risques, écosystème en orbite, engrenages, plaque ISO qui pivote en
  « système d'exploitation » ; voix d'origine. `npm run render:iso9001monde`.
- `CompterAccidents` : « Pourquoi compter les accidents ne suffit plus » au format UI motion premium enrichi —
  jauge réactif → proactif, coupes glitch RVB, écran de chiffres qui se brouille, courbe dans un rétroviseur,
  ligne de temps qui défile vers la gauche, écran partagé à volet, ondes sonar, retour en arrière qui efface le pic
  (« accident évité ») ; valeurs marquées EXEMPLE ; voix d'origine. `npm run render:compteracc`.
- `AccidentTravailAZ` : « La gestion de l'accident du travail de A à Z » au format UI motion premium enrichi —
  pages de dossier qui se tournent, tableau à palettes (split-flap), formulaire déchiré, diagramme de Venn de la
  règle de trois, doubles comptes à rebours 24 h / 48 h, enveloppe DAT en vol, tapis roulant de certificats écrits
  à la main, loupe sur dossier flou, éphéméride de la phase contradictoire, électrocardiogramme, cadenas à trois
  molettes, sablier 60 jours, dolly zoom sur le dossier clos ; voix d'origine (5 min 26)
  dans `public/voix-accident-a-z-origine.m4a`. `npm run render:accidentaz`.
- `CertifIsoPourquoi` : « Pourquoi faire certifier son entreprise ISO » au format UI motion premium enrichi —
  pièce prestige/stratégie, autocollants ISO plaqués puis décollés en diagonale, scanner rayons X extérieur/intérieur,
  passeport tamponné et portes 3D des marchés publics, bulles qui se décodent, citation au surligneur, vue éclatée
  remise à plat, carrousel en profondeur des 5 effets internes, lettres qui tombent (POURQUOI → QUOI), cercles au
  feutre et vote d'experts, loi barrée vs recette, duel NORME vs STANDARD, propagation du PDF, transitions en stores
  vénitiens ; voix d'origine (`public/voix-certif-iso-origine.m4a`). `npm run render:certifiso`.
- `GuideIsoTrio` : « Guide ISO 9001, 14001, 45001 » au format UI motion premium enrichi — fil rouge de la maison
  (fondation 9001, murs 14001, toit 45001) avec mini-carte de chantier, soupe à l'alphabet, labyrinthe, indicateur
  d'étages, double hélice d'ADN, roue PDCA, coulage de béton, briques, étoiles CSRD, peinture « greenwashing » qui
  coule, relais OHSAS → 45001, punaises sur plan, aiguillage MASE / 45001, message vocal, usine à gaz démêlée, calques
  alignés, cadran des 5 questions, façade en carton emportée par le vent, transitions « plan qui se déroule » ;
  voix d'origine (`public/voix-guide-iso-trio-origine.m4a`). `npm run render:guideiso`.
- `InductionHsePremium` : « L'induction HSE » au format UI motion premium enrichi, illustré par les photos terrain
  fournies (`public/induction/`, marques retirées) — lettres H-S-E remplies de photos, polaroïd qui se développe,
  barrière levante, badge d'accès imprimé, distribution de cartes (qui est concerné), itinéraire GPS des 5 objectifs,
  zoom plan → terrain, mallette d'EPI, alertes façon smartphone, tri des déchets, panoramique 360°, vision thermique et
  étincelles, permis de feu validé, photo en trois volets étalonnés, cartes « idées reçues » balayées, cercles de
  protection, empreintes du premier pas, transitions pellicule + flash ; voix d'origine. `npm run render:inductionhse`.
- `HierarchiePrevention` : « Les 9 principes généraux de prévention » (44 s) au format UI motion premium — fil vertical
  façon réseau social qui s'enclenche carte par carte avec anneau n/9, micro-animation propre à chaque principe (détour,
  matrice de risques, vanne à la source, établi ergonomique, mise à jour technique, machine à sous de substitution,
  Gantt, parapluie collectif vs casque, consignes cochées), pyramide finale ; voix d'origine. `npm run render:hierarchie`.
- `PermisDeFeu` : « Comment fonctionne le permis de feu » dans un univers sombre « braises » inédit, illustré par les
  photos fournies (`public/permisfeu/`, marques retirées) — allumette qui s'enflamme, document qui apparaît par un bord
  qui brûle, cylindre 3D des travaux par points chauds, distorsion de chaleur, plan avec rayon d'exclusion, coupe de
  bâtiment à braises cachées, bouton d'arrêt d'urgence, accéléré du feu couvant, planche de BD photo, permis cadenassé
  puis validé, allumettes 3/10 (30 %, INRS) ; voix d'origine. `npm run render:permisfeu`.
- `DangerSoudage` : « Le danger invisible du soudage » (75 s), univers « laboratoire » inédit — fumée particulaire
  simulée sur photo, microscope classant les particules par taille, flux vers le visage, parcours des particules dans
  les voies respiratoires (schémas fournis, `public/soudage/`), poumons qui s'assombrissent, pictogrammes de danger,
  recul de caméra vers l'atelier, aspiration en tourbillon, ventilation, entonnoir collectif → individuel, air qui
  s'éclaircit ; voix d'origine. `npm run render:soudage`.
- `FeuClasseA` : « Comment identifier un feu de classe A » (26 s) — pictogramme A qui s'embrase, tiroir de fiches
  A/B/C/D/F, bûche aux fissures incandescentes, portique scanner bois / papier / carton, trappe qui rejette le CO₂,
  radar de localisation de l'extincteur, partage à l'équipe sur smartphone ; voix d'origine (sous-titres lus sur la
  source par OCR). `npm run render:classea`.
- `OriginesIncendie` : « Maîtriser les différentes origines d'un incendie industriel » (49 s) — plan-séquence sur une
  planche « tableau périodique des feux » (A, B, C, D, F, batteries) : la caméra vole de case en case, chaque case a son
  animation (braises, nappe qui s'embrase, jet de gaz, gerbe Mg/Na/Al, poêle, emballement thermique), vue d'ensemble
  puis partage ; voix d'origine (sous-titres lus par OCR). `npm run render:origines`.
- `RoleNormesIso` : « Le rôle stratégique des grandes normes ISO » (2 min 36) — plan de métro des 9 normes, version
  « excellence » : voyage en caméra embarquée (flou de mouvement selon la vitesse, traînée lumineuse, lignes de vitesse,
  parallaxe, roulis dans les courbes), afficheur LED « Prochain arrêt », panneaux en portes coulissantes avec illustration
  animée par norme (roue PDCA, usine qui verdit, danger → coche, ferme → assiette, Venn RSE, jauge d'énergie, cadenas C-I-D,
  ECG, cible de mesure), final : lignes illuminées puis convergence vers un pôle « Confiance » ; voix d'origine.
  `npm run render:rolenormes`.
- `SixDirections` : « La sécurité dans les six directions » (1 min 20) — diorama 3D réel (CSS preserve-3d) : disque
  d'atelier flottant, opérateur au centre, caméra orbitale qui tourne autour de lui pour chaque direction, bascule vers
  le haut (charge suspendue, chutes d'objets avec ombres) puis plongée verticale (trou, trappe à charnière, fissures) ;
  objets « billboards » face caméra, balayage radar au sol, cube gyroscopique dans le viseur, rubalise circulaire,
  ouverture et clignement de paupières ; voix d'origine (sous-titres lus par OCR). `npm run render:sixdirections`.
- `MiTempsTherapeutique` : « Le mi-temps thérapeutique » (4 min 46) — couverture titrée dès la première image (exportée
  aussi en `out/couverture-mi-temps-therapeutique.png` et intégrée comme vignette du MP4), cartes de chapitre en origami,
  classeur à onglets, mur contre escalier, curseur de comparaison, ordonnance qui s'écrit, batterie, route qui
  bifurque, dominos des 4 acteurs, verre à deux robinets (employeur / Sécurité sociale), rosette « travail effectif »,
  bocal de congés, avenant signé, astérisque d'exception, brique contre plume, balançoire à ressort ; voix d'origine
  (transcription locale Whisper via sherpa-onnx). `npm run render:mitemps`.
- `DemarcheQualite10Etapes` : « Démarche qualité en 10 étapes » (5 min 29) — couverture titrée dès la première image
  (exportée en `out/couverture-demarche-qualite-10-etapes.png` et intégrée comme vignette), fil rouge « jeu de
  société » : plateau de 10 cases, pion qui saute, dé 3D, étapes qui jaillissent en pop-up ; avalanche de feuilles
  rangée en feuille de route, tour de Jenga, machine entrée → processus → sortie, main des 5M, volant de pilote,
  dépliant en accordéon, tableau de bord automobile, machine à sous des critères d'un bon indicateur, puzzle, roue de
  Deming sur sa pente avec sa cale, route vers l'horizon ; voix d'origine (transcription locale). `npm run render:demarche`.
- `ZeroAlcool` : « Zéro alcool : sécurité d'abord » (5 min 38) — couverture titrée dès la première image (exportée en
  `out/couverture-zero-alcool.png`, intégrée comme vignette), habillage sombre « du bar à la lumière » : capsule de
  bouteille qui saute à chaque partie, grille de 764 silhouettes, iceberg, bouchon qui saute, étiquette de prix,
  vision double avec distorsion (filtre SVG), déchiqueteuse, DUERP à la machine à écrire, racine arrachée, cartons
  jaune et rouge, boomerang, planètes en orbite, mocktail, chaîne humaine, 3 piliers, tir à la corde ; voix d'origine,
  sous-titres recalés mot à mot (`tools/`). `npm run render:zeroalcool`.
- `IngenieurQhse` : « L'ingénieur QHSE » (5 min 09) — photo réelle de l'ingénieur (`public/ingenieur/`, détourée)
  en fil rouge : couverture « magazine » avec le titre derrière le sujet (exportée en `out/couverture-ingenieur-qhse.png`,
  intégrée comme vignette), parallaxe 2,5D et annotations AR, transitions en diaphragme, lettres QHSE extrudées, cartes
  de mission façon jeu de rôle, stories, arbre de compétences avec XP, portrait scindé hard/soft skills, courbe
  boursière des salaires (chiffres cités par la vidéo d'origine), rose des vents des carrières, casque VR et scan IA,
  globe 3D ; voix d'origine, sous-titres recalés mot à mot. `npm run render:ingenieur`.
- `EpiVsEpcGuide` : « EPI vs EPC : le guide sécurité » (4 min 25) — images réelles d'EPI et d'EPC (`public/epiepc/`,
  détourées, marques floutées), couverture en duel scindé (exportée en `out/couverture-epi-vs-epc.png`, intégrée comme
  vignette), chapitres ouverts par fermeture éclair, bascule « de l'autre côté du miroir », habillage d'une opératrice
  par ses EPI, projecteur sur la protection solitaire, capot sur la source du danger, aspiration de particules, filet
  qui rattrape, ring de boxe et rounds, lingot de la règle d'or, podium, Plan A/B/C, risque résiduel, parapluie
  collectif ; voix d'origine, sous-titres recalés mot à mot. `npm run render:epivsepc`.
- `TreizeVeritesHse` : « Les 13 vérités du HSE » (5 min 28) — photos réelles (`public/verites/`, `public/induction/`,
  `public/ingenieur/`), fil rouge « dossier confidentiel » : 13 vérités déclassifiées (caviardage, marqueurs de preuve),
  couverture dossier kraft (exportée en `out/couverture-13-verites-hse.png`, intégrée comme vignette), intercalaires qui
  s'ouvrent, photo « super-héros » BD déchirée, couteau suisse des 10 métiers, tapis de course, vinyle « on a toujours
  fait comme ça », atome à l'électron libre, insigne → poignée de main, funambule sécurité/production, manomètre,
  trousseau des clés du succès, piste du marathon ; voix d'origine, sous-titres recalés mot à mot. `npm run render:verites`.
- `QuartHeureSecurite` : « Le Quart d'Heure Sécurité » (4 min 38) — photos réelles (briefings, marquage au sol,
  presque-accident), chronomètre de 15 min en fil rouge, transitions en balayage d'horloge, couverture titrée (exportée en
  `out/couverture-quart-heure-securite.png`, intégrée comme vignette), année en 365 points, ciel jour/nuit, colonne qui
  se redresse, courbe de glycémie, carte « menu » 10/15/20 min, cercle de respiration, glitch des bugs humains, jeu
  « trouvez le risque », courriel frauduleux à l'hameçon, fissure du petit écart, arbre de la culture active ; voix
  d'origine, sous-titres recalés mot à mot. `npm run render:quartheure`.
- `CauserieParticipative` : « Quart d'heure sécurité : le rendre participatif » (4 min 44) — photos réelles détourées   (briefing en atelier, animateurs, chutes), fil rouge de l'étincelle de la discussion, transitions en bulle de parole   qui s'ouvre puis éclate, couverture titrée (exportée en `out/couverture-causerie-participative.png`, intégrée comme   vignette), étiquette pivotante, fossé intention / impact et pont-levier, bulles « liste de courses », programme en   éventail de cartes, chaussure aux trois cailloux, machine à sous du charisme, vitre « monologue » qui vole en éclats,   table de mixage des tons, diable à ressort, réseau descendant vs maillé, flou → net, filet de sécurité, fiche recette,   panneau de réglages du déploiement, projecteur sur un seul sujet, balance passif / participatif ; voix d'origine,   sous-titres recalés mot à mot. `npm run render:causerie`.
- `CodificationDocumentsQhse` : « Codifier ses documents QHSE » (5 min 34 ; la source s'interrompt au début de la   partie outils, la voix s'arrête à la fin d'une phrase) — pyramide documentaire en photos réelles construite niveau   par niveau, étiqueteuse en fil rouge, transitions en dossier suspendu qui s'ouvre, couverture titrée (exportée en   `out/couverture-codification-documents-qhse.png`, intégrée comme vignette), bazar de fichiers qui se range en   grille, explorateur qui déborde, cascade de boîtes de dialogue d'erreur, carte d'identité imprimée, clé de voûte   ISO 9001, classeur à onglets, scanner d'empreinte, chaîne des versions, afficheur à palettes, lexique, puzzle,   nom de fichier en wagons, terminal qui nettoie un nom, liste triée par date, rayons X, rideau avant / après ; voix   d'origine, sous-titres recalés mot à mot. `npm run render:codification`.
- `QseIntegreSmi` : « QSE : une politique ou trois ? » (4 min 58) — photos réelles (contrôleuse, briefing, raffinerie,   fumées de soudage) et responsables détourés, fil rouge du « OU » au « ET », transitions en tresse Q / S / E,   couverture titrée (exportée en `out/couverture-qse-integre-smi.png`, intégrée comme vignette), puzzle, échangeur à   trois voies, mobile en équilibre, colonnes antiques, horloge à engrenages, bouclier, empreinte qui rétrécit, silos,   tir à la corde à trois, photocopieuse à doublons, agenda des audits, face-à-face, boutons radio contre cases à   cocher, train d'engrenages, coffre et radar 360°, immeuble à ascenseur, plateau de jeu des étapes, levier, saut du   OU au ET ; voix d'origine, sous-titres recalés mot à mot (« 100 % » cité par la vidéo d'origine).   `npm run render:smi`.
- `MissionsResponsableQhse` : « Missions du responsable QHSE : le chef d'orchestre » (5 min 30) — photos réelles   (technicien HSE, accident, raffinerie, briefing, réunion) et chef d'orchestre détouré, portée musicale en fil rouge,   transitions en rideau de théâtre, couverture titrée (exportée en `out/couverture-missions-responsable-qhse.png`,   intégrée comme vignette), verre dépoli, ondes symphonie / cacophonie, plan de l'orchestre, parapluie, échecs,   mouvement d'horlogerie, calendrier qui s'effeuille, jumelles, carte de chaleur des douleurs, changement d'échelle,   dôme protecteur, partition stricte, entonnoir, plan d'évacuation, ola du public, pièce interne / externe, seau percé,   plante à pièces, rideau final ; voix d'origine, sous-titres recalés mot à mot (exemple du rappel produit cité par la   vidéo d'origine). `npm run render:chefqhse`.
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
