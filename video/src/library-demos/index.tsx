import React from 'react';
import {Composition} from 'remotion';
import {FPS} from '../theme';
import {Window} from './Window';
import {LangageDg} from '../langageDg/LangageDg';
import {AccueilSecu} from '../accueilSecu/AccueilSecu';
import {PremierEmploi} from '../premierEmploi/PremierEmploi';
import {CafeHse} from '../cafeHse/CafeHse';
import {NormesIsac} from '../normesIsac/NormesIsac';
import {EquipeIsac} from '../equipeIsac/EquipeIsac';
import {Kaizen} from '../kaizen/Kaizen';
import {PlansPrevention} from '../plansPrev/PlansPrevention';
import {OutilsStrat} from '../outilsStrat/OutilsStrat';

// Aperçus de la librairie (library/<section>/<slug>/index.md → demo: Demo-<Slug>).
const s = (sec: number) => Math.round(sec * FPS);
const DEMOS: {id: string; C: React.FC; at: number; dur: number}[] = [
  {id: 'Demo-CapsuleMetroCondense', C: LangageDg, at: 0, dur: 8},
  {id: 'Demo-CouvertureLettresPhoto', C: LangageDg, at: 0, dur: 2.8},
  {id: 'Demo-TransitionGyrophare', C: LangageDg, at: 2.4, dur: 4},
  {id: 'Demo-TransitionLoupe', C: LangageDg, at: 101.9, dur: 4},
  {id: 'Demo-TransitionPneumatique', C: LangageDg, at: 153.1, dur: 4},
  {id: 'Demo-TransitionStoreVenitien', C: AccueilSecu, at: 150.9, dur: 4},
  {id: 'Demo-BarreRechercheOuvre', C: LangageDg, at: 156.8, dur: 5},
  {id: 'Demo-MetroStations', C: LangageDg, at: 14.4, dur: 4},
  {id: 'Demo-SousTitresPapierMotAMot', C: LangageDg, at: 19.5, dur: 5},
  {id: 'Demo-PorteLumineuse3d', C: PremierEmploi, at: 41.0, dur: 5.5},
  {id: 'Demo-JaugeCompteur100', C: PremierEmploi, at: 51.8, dur: 3.2},
  {id: 'Demo-TexteMorphPreuve', C: PremierEmploi, at: 121.6, dur: 6.2},
  {id: 'Demo-RadarCibles', C: PremierEmploi, at: 188.6, dur: 5},
  {id: 'Demo-ReseauGraphe', C: PremierEmploi, at: 201.6, dur: 10},
  {id: 'Demo-CercleViciseBrise', C: PremierEmploi, at: 221.4, dur: 6},
  {id: 'Demo-CitationOndeChoc', C: CafeHse, at: 16.2, dur: 9.5},
  {id: 'Demo-CarteRetournee3d', C: CafeHse, at: 43.0, dur: 7.5},
  {id: 'Demo-PlanArchitecte', C: CafeHse, at: 82.4, dur: 4},
  {id: 'Demo-QuatreIngredients', C: CafeHse, at: 94.4, dur: 24},
  {id: 'Demo-CoffreTresor', C: CafeHse, at: 199.0, dur: 6},
  {id: 'Demo-PontTraducteur', C: CafeHse, at: 254.2, dur: 4.6},
  {id: 'Demo-FeuilleDeRoute', C: CafeHse, at: 268.4, dur: 22},
  {id: 'Demo-PageDecollee', C: CafeHse, at: 296.4, dur: 6},
  {id: 'Demo-SousTitresNeoBrutal', C: NormesIsac, at: 13.0, dur: 6},
  {id: 'Demo-CarteNormeNeoBrutal', C: NormesIsac, at: 12.9, dur: 12},
  {id: 'Demo-PelliculeFilm', C: NormesIsac, at: 9.4, dur: 3.4},
  {id: 'Demo-TelephoneMessages', C: NormesIsac, at: 5.9, dur: 3.6},
  {id: 'Demo-PanneauIndicateurNon', C: NormesIsac, at: 82.2, dur: 5.6},
  {id: 'Demo-EditeurCodeLive', C: NormesIsac, at: 150.9, dur: 8.4},
  {id: 'Demo-TriangleCid', C: NormesIsac, at: 107.2, dur: 7.6},
  {id: 'Demo-OrganigrammeCamera', C: EquipeIsac, at: 23.4, dur: 13},
  {id: 'Demo-CircuitFerme', C: EquipeIsac, at: 65.6, dur: 10},
  {id: 'Demo-PileReglesQuiTombe', C: EquipeIsac, at: 2.7, dur: 2.6},
  {id: 'Demo-RoueePdca', C: Kaizen, at: 52.6, dur: 7},
  {id: 'Demo-PyramideDomino', C: Kaizen, at: 129.8, dur: 23},
  {id: 'Demo-SixEtapesProgression', C: Kaizen, at: 159.6, dur: 16},
  {id: 'Demo-TourQuiSEffondre', C: Kaizen, at: 228.8, dur: 8},
  {id: 'Demo-GrandChiffreCompteur', C: Kaizen, at: 268.4, dur: 5},
  {id: 'Demo-AfficheArrachee', C: Kaizen, at: 2.8, dur: 7.6},
  {id: 'Demo-CadenasConsignation', C: PlansPrevention, at: 24.2, dur: 4.4},
  {id: 'Demo-BoutonSAbonner', C: PlansPrevention, at: 60.5, dur: 5.8},
  {id: 'Demo-MatricesStrategiques', C: OutilsStrat, at: 28.0, dur: 21},
  {id: 'Demo-NuageGroupes', C: OutilsStrat, at: 68.6, dur: 7},
];

export const LibraryDemos: React.FC = () => (
  <>
    {DEMOS.map(({id, C, at, dur}) => (
      <Composition key={id} id={id} component={() => <Window start={s(at)}><C /></Window>} durationInFrames={s(dur)} fps={FPS} width={1080} height={1920} />
    ))}
  </>
);
