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
import {SmartMethode} from '../smartMethode/SmartMethode';
import {Amdec} from '../amdec/Amdec';
import {CinqPourquoiMetro} from '../cinqPourquoiMetro/CinqPourquoiMetro';
import {IshikawaMetro} from '../ishikawaMetro/IshikawaMetro';
import {QualiteOutilsMetro} from '../qualiteOutilsMetro/QualiteOutilsMetro';
import {PiliersPrevMetro} from '../piliersPrevMetro/PiliersPrevMetro';
import {PiliersTerrainMetro} from '../piliersTerrainMetro/PiliersTerrainMetro';
import {SainSaufMetro} from '../sainSaufMetro/SainSaufMetro';
import {BonOutilMetro} from '../bonOutilMetro/BonOutilMetro';
import {EdificeIsoMetro} from '../edificeIsoMetro/EdificeIsoMetro';
import {AnimTerrainMetro} from '../animTerrainMetro/AnimTerrainMetro';
import {PlanPrevEtapes} from '../planPrevEtapes/PlanPrevEtapes';
import {DangerRisqueMetro} from '../dangerRisqueMetro/DangerRisqueMetro';
import {SecuriteRegleeGeree} from '../securiteRegleeGeree/SecuriteRegleeGeree';
import {JsaMetro} from '../jsaMetro/JsaMetro';
import {SwiftMetro} from '../swiftMetro/SwiftMetro';
import {ParetoMetro} from '../paretoMetro/ParetoMetro';
import {TaprootMetro} from '../taprootMetro/TaprootMetro';
import {RhseMetro} from '../rhseMetro/RhseMetro';
import {MissionsMetro} from '../missionsMetro/MissionsMetro';
import {PrincipesMetro} from '../principesMetro/PrincipesMetro';
import {EvalRisquesMetro} from '../evalRisquesMetro/EvalRisquesMetro';
import {Audit13Metro} from '../audit13Metro/Audit13Metro';
import {CauseriesMetro} from '../causeriesMetro/CauseriesMetro';
import {PartiesMetro} from '../partiesMetro/PartiesMetro';
import {FlashInfoMetro} from '../flashInfoMetro/FlashInfoMetro';
import {FoudreMetro} from '../foudreMetro/FoudreMetro';
import {ChallengesMetro} from '../challengesMetro/ChallengesMetro';
import {IsoQuinzeMetro} from '../isoQuinzeMetro/IsoQuinzeMetro';
import {LigneInvisible} from '../ligneInvisible/LigneInvisible';
import {IsoQuinze3D} from '../isoQuinze3D/IsoQuinze3D';
import {IsoQuinzeSub} from '../isoQuinzeSub/IsoQuinzeSub';
import {IsoQuinzeCartes} from '../isoQuinzeCartes/IsoQuinzeCartes';
import {IsoQuinzeCarte} from '../isoQuinzeCarte/IsoQuinzeCarte';
import {Matrice44Metro} from '../matrice44Metro/Matrice44Metro';
import {HazidMetro} from '../hazidMetro/HazidMetro';
import {AprMetro} from '../aprMetro/AprMetro';
import {HazopMetro} from '../hazopMetro/HazopMetro';
import {AmdecMetro} from '../amdecMetro/AmdecMetro';
import {WhatIfMetro} from '../whatIfMetro/WhatIfMetro';
import {SwiftTechMetro} from '../swiftTechMetro/SwiftTechMetro';

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
  {id: 'Demo-MaisonEtapes', C: SmartMethode, at: 29.7, dur: 5},
  {id: 'Demo-TriPriorites', C: Amdec, at: 30.8, dur: 5.6},
  {id: 'Demo-AcronymeDeplie', C: Amdec, at: 2.8, dur: 4.1},
  {id: 'Demo-ForageCouches', C: CinqPourquoiMetro, at: 10.4, dur: 21},
  {id: 'Demo-AreteCamera', C: IshikawaMetro, at: 19.8, dur: 23},
  {id: 'Demo-RoueDemingPente', C: QualiteOutilsMetro, at: 10.0, dur: 13.6},
  {id: 'Demo-TempleTroisPiliers', C: PiliersPrevMetro, at: 55.0, dur: 9.4},
  {id: 'Demo-ChecklistDechiree', C: PiliersPrevMetro, at: 7.0, dur: 4.0},
  {id: 'Demo-FailleOrganisationnelle', C: PiliersTerrainMetro, at: 51.8, dur: 10.2},
  {id: 'Demo-AtelierBalaye', C: SainSaufMetro, at: 21.8, dur: 7.4},
  {id: 'Demo-MaisonRetour', C: SainSaufMetro, at: 55.8, dur: 5.2},
  {id: 'Demo-BesoinOutilFlip', C: BonOutilMetro, at: 64.8, dur: 8},
  {id: 'Demo-EdificeCleDeVoute', C: EdificeIsoMetro, at: 52.0, dur: 18},
  {id: 'Demo-CercleCauserie', C: AnimTerrainMetro, at: 227.3, dur: 19.5},
  {id: 'Demo-EtoileCinqPoints', C: PlanPrevEtapes, at: 26.0, dur: 15.2},
  {id: 'Demo-ExpositionZone', C: DangerRisqueMetro, at: 38.0, dur: 6.0},
  {id: 'Demo-GraveMarbre', C: SecuriteRegleeGeree, at: 66.6, dur: 6.6},
  {id: 'Demo-ScanDangers', C: JsaMetro, at: 9.5, dur: 4.9},
  {id: 'Demo-ArbreScenarios', C: SwiftMetro, at: 30.9, dur: 10.8},
  {id: 'Demo-CourtCircuit', C: ParetoMetro, at: 59.4, dur: 4.1},
  {id: 'Demo-IcebergPlongee', C: TaprootMetro, at: 17.6, dur: 13.6},
  {id: 'Demo-BalanceVivante', C: RhseMetro, at: 19.3, dur: 12.0},
  {id: 'Demo-RoueCycle', C: MissionsMetro, at: 138.6, dur: 9.0},
  {id: 'Demo-EdificeBriques', C: PrincipesMetro, at: 224.6, dur: 11.6},
  {id: 'Demo-MatriceCible', C: EvalRisquesMetro, at: 392.0, dur: 23.0},
  {id: 'Demo-ChecklistAudit', C: Audit13Metro, at: 125.8, dur: 11.0},
  {id: 'Demo-TableauCamera', C: CauseriesMetro, at: 105.5, dur: 15.0},
  {id: 'Demo-RadarParties', C: PartiesMetro, at: 77.2, dur: 13.0},
  {id: 'Demo-BulletinFlash', C: FlashInfoMetro, at: 81.8, dur: 18.0},
  {id: 'Demo-EclairSurtension', C: FoudreMetro, at: 46.7, dur: 20.0},
  {id: 'Demo-ArcadeNiveaux', C: ChallengesMetro, at: 7.4, dur: 14.0},
  {id: 'Demo-TableauPeriodique', C: IsoQuinzeMetro, at: 69.0, dur: 9.5},
  {id: 'Demo-FromageSuisse3D', C: LigneInvisible, at: 33.6, dur: 15.5},
  {id: 'Demo-TableauPeriodique3D', C: IsoQuinze3D, at: 73.4, dur: 7.2},
  {id: 'Demo-SuperpositionSubliminale', C: IsoQuinzeSub, at: 1.8, dur: 10.5},
  {id: 'Demo-CartesAnimees', C: IsoQuinzeCartes, at: 4.6, dur: 7.5},
  {id: 'Demo-CarteGeographique', C: IsoQuinzeCarte, at: 80.3, dur: 6.2},
  {id: 'Demo-MatriceRisques3D', C: Matrice44Metro, at: 11.9, dur: 9.0},
  {id: 'Demo-ScannerHazid', C: HazidMetro, at: 19.5, dur: 5.9},
  {id: 'Demo-DominosMesures', C: AprMetro, at: 19.8, dur: 7.4},
  {id: 'Demo-PidHazop', C: HazopMetro, at: 44.0, dur: 19.0},
  {id: 'Demo-EngrenagesPompe', C: AmdecMetro, at: 19.9, dur: 8.5},
  {id: 'Demo-EntrepotWhatIf', C: WhatIfMetro, at: 27.2, dur: 12.4},
  {id: 'Demo-TapisSwift', C: SwiftTechMetro, at: 17.0, dur: 8.6},
];

export const LibraryDemos: React.FC = () => (
  <>
    {DEMOS.map(({id, C, at, dur}) => (
      <Composition key={id} id={id} component={() => <Window start={s(at)}><C /></Window>} durationInFrames={s(dur)} fps={FPS} width={1080} height={1920} />
    ))}
  </>
);
