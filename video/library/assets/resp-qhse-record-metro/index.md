---
name: Le responsable QHSE « record de motion design » — organigramme 3D, tambour des intitulés, réseau à impulsions lumineuses, plateau multi-sites, radar de compétences extrudé, anneau d'audit, éventail de onze cartes de mission
section: assets
slug: resp-qhse-record-metro
description: Capsule métro (3 min 08, voix fournie) à six guichets et onze stations (gyrophare `TK = 3.4`, cadre de marquage au sol jaune / noir, NeoCaptions, aucune musique) qui ajoute un pack WebGL réutilisable, `src/respQhseRecordMetro/RqGL.tsx` — `labelTex` / `Tag` (étiquettes en texture canvas posées en volume), `Hub` (réseau en étoile, tubes courbes, impulsions lumineuses), `OrgTree` (organigramme dont les liens poussent), `TitleDrum` (tambour à facettes qui fait défiler des intitulés), `Radar3D` (radar extrudé qui se gonfle axe par axe), `Bars3D` (histogramme 3D + flèche de croissance), `LoopTrack` (anneau parcouru par un jeton, stations qui s'allument), `CardFan` (cartes qui arrivent et se rangent en éventail), `Sites` (plateau multi-sites, trajet en arc). Réutilise `HardHat` du pack `SafeGL`. Scènes — `RqHero` (casque et lettres Q H S E qui s'illuminent au mot), `RqPolicy` (cinq verbes en marches puis particules « POLITIQUE » → « QHSE »), `RqTeam`, `RqNames`, `RqLinks`, `RqSkills`, `RqPerf`, `RqDaily`, `RqLoop`, `RqCards`. Caméra : dans un cadre vertical, prévoir une distance d'environ 15 à 17 unités pour une largeur de 5 à 6 unités.
quand: Métier de responsable QHSE, fiche de poste, missions, organigramme, interlocuteurs, compétences, amélioration continue, liste de missions ; toute scène 3D d'organigramme, de réseau, de radar ou de liste de cartes.
component: src/respQhseRecordMetro/RespQhseRecordMetro.tsx
demo: Demo-RespQhseRecord
tags: [responsable QHSE, métier, missions, organigramme, radar, réseau, WebGL, métro]
---

## Utilisation
`Tag3D txt bg pos w sub` ; `Hub u center nodes grow` (nœuds `[position, libellé, couleur, instant]`) ; `OrgTree u top mid leaves` ; `TitleDrum titles turn` ; `Radar3D vals labels r` ; `LoopTrack u k stations R speed` ; `CardFan u cards` (`[instant, titre, sous-titre, couleur]`).
