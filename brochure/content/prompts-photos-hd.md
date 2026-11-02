# Prompts ChatGPT — photos haute définition pour l'impression

Les photos actuelles proviennent des visuels existants d'UNIVERSNORMES (1 080 à 1 672 px). Elles conviennent à la
version numérique ; pour une impression offset à 300 dpi, générez des versions HD avec les prompts ci-dessous,
enregistrez-les dans `assets/photos/source/` **sous le même nom de fichier**, puis relancez `bash scripts/build.sh`.

Consignes communes à ajouter à chaque prompt : *photographie éditoriale réaliste, lumière naturelle, rendu haut de
gamme type rapport annuel d'un groupe industriel international, aucune inscription lisible, aucun logo, aucun texte,
résolution maximale.*

| Fichier | Page | Format | Prompt |
|---|---|---|---|
| couverture-site-gazier.jpg | 1 | carré | Trois professionnels QHSE africains (deux hommes, une femme) en combinaison bleue et casque blanc consultent un dossier devant des sphères de stockage de gaz au coucher du soleil, torchère au loin, ciel orangé, sol en gravier au premier plan. |
| direction-equipe.jpg | 2 | carré | Comité de direction africain en costume sombre autour d'une table de réunion, ambiance feutrée bleu nuit, lumière zénithale, un dirigeant de dos présente un document, atmosphère sérieuse et confidentielle. |
| presentation-equipe-site.jpg | 3 | paysage 16:9 | Un dirigeant africain en costume serre la main d'un responsable QHSE en gilet jaune, deux collègues avec tablette, casques blancs, raffinerie floue en arrière-plan, lumière de fin d'après-midi. |
| vision-equipe-en-marche.jpg | 4 | paysage 3:2 | Équipe de techniciens africains en tenue de sécurité marchant vers un site industriel au lever du soleil, vue de dos, route bordée de verdure. |
| expertise-salle-pilotage.jpg | 5 | portrait 2:3 | Ingénieur africain en gilet jaune et casque blanc devant un grand écran de supervision bleu dans une salle de contrôle, vue de trois quarts dos. |
| qualite-controle-production.jpg | 7 | paysage 16:9 | Technicienne africaine en blouse blanche, charlotte et masque, contrôle une ligne de conditionnement pharmaceutique en inox, environnement propre et lumineux. |
| qualite-manuel.jpg | 7 | paysage 4:3 | Gros plan sur les mains d'un auditeur qui feuillette un manuel qualité relié bleu marine dans un laboratoire, arrière-plan flou. |
| securite-consignation.jpg | 8 | portrait 9:16 | Électricien africain en combinaison bleue et casque blanc pose un cadenas de consignation sur une armoire électrique, une responsable sécurité en gilet jaune vérifie sur tablette. |
| environnement-prelevement.jpg | 9 | paysage 16:9 | Technicien environnement africain en gilet jaune et gants bleus prélève un échantillon d'eau à la sortie d'un rejet, station de traitement et végétation en arrière-plan. |
| audit-inspection.jpg | 10 | paysage 3:2 | Auditrice HSE africaine en gilet jaune et casque blanc inspecte un extincteur avec une check-list dans un atelier industriel moderne. |
| audit-rapport.jpg | 10 | carré | Gros plan d'un rapport d'audit relié posé sur un bureau sombre, un doigt suit une ligne, lumière bleutée, texte illisible. |
| formation-participants.jpg | 11 | paysage 21:9 | Participants africains en gilet de sécurité attentifs pendant une formation en salle, prise de notes, ambiance studieuse et lumineuse. |
| methodologie-atelier.jpg | 12 | paysage 21:9 | Animateur QHSE africain présente un tableau de suivi à des opérateurs casqués lors d'un point sécurité de cinq minutes en atelier. |
| engagements-partenariat.jpg | 13 | paysage 16:9 | Deux mains qui se rejoignent pour une poignée de main professionnelle, costumes sombres, fond bleu nuit flou. |
| pourquoi-usine.jpg | 14 | carré | Silhouette d'un responsable debout face à une grande porte lumineuse au bout d'une usine automatisée, brume légère, tons bleus. |
| contact-responsable.jpg | 15 | portrait 9:16 | Responsable QHSE africain souriant, lunettes, chemise bleue et gilet jaune, tablette en main, devant un mur d'écrans de suivi. |

## Brochure « Formation en management QHSE »

La couverture reprend `contact-responsable.jpg`, et les semaines 1, 3 et 5 réutilisent `expertise-salle-pilotage.jpg`,
`securite-briefing.jpg` et `environnement-prelevement.jpg` (voir plus haut).

| Fichier | Page | Format | Prompt |
|---|---|---|---|
| fqhse-contexte.jpg | 2 | paysage 16:9 | Responsable QHSE africain en gilet jaune présente un tableau de suivi à son équipe sur un site industriel, un collègue tient un chronomètre au premier plan. |
| fqhse-bref.jpg | 3 | paysage 16:9 | Équipe africaine en tenue de sécurité penchée sur une maquette d'usine et des plans, ambiance de travail collaborative. |
| fqhse-s2-qualite.jpg | 5 | paysage 16:9 | Technicienne qualité africaine en blouse blanche et charlotte examine une pièce à la loupe, bacs de pièces métalliques au premier plan. |
| fqhse-s4-urgences.jpg | 6 | paysage 3:2 | Casque de chantier jaune et extincteur rouge posés dans un atelier moderne, pictogrammes EPI au mur, lumière naturelle. |
| fqhse-s6-conformite.jpg | 7 | paysage 3:2 | Responsable HSE africaine en gilet jaune remplit un registre de conformité à son bureau, classeurs et extincteur en arrière-plan. |
| fqhse-s7-audit.jpg | 8 | portrait 2:3 | Auditrice africaine en gilet jaune analyse un tableau de bord d'indicateurs sur un grand écran, site industriel visible par la fenêtre. |
| fqhse-s8-leadership.jpg | 8 | paysage 3:2 | Cheffe de projet QHSE africaine guide son équipe sur un site industriel au lever du soleil, tablette en main. |
| fqhse-pedagogie.jpg | 9 | paysage 3:2 | Formatrice HSE africaine anime une causerie sécurité devant des opérateurs casqués, tableau blanc avec les consignes de sécurité. |
| fqhse-public-professionnels.jpg | 10 | portrait | Responsable HSE africaine souriante, gilet jaune, tablette en main, raffinerie en arrière-plan. |
| fqhse-public-techniciens.jpg | 10 | portrait | Technicien africain en gilet jaune et casque blanc, plans roulés et tablette, maquette d'installation industrielle. |
| fqhse-public-etudiants.jpg | 10 | portrait | Étudiante africaine travaillant sur un classeur de cours QHSE et un ordinateur portable, casque de sécurité posé sur le bureau. |
| fqhse-inscription.jpg | 11 | paysage 16:9 | Réunion de planification QHSE : une responsable africaine présente un planning mural à des collègues en tenue de sécurité. |
