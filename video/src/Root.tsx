import {Composition} from 'remotion';
import {SuperviseurHSE, TOTAL_FRAMES} from './SuperviseurHSE';
import {FPS} from './theme';
import {EquipeHSE, EQUIPE_FRAMES} from './equipe/EquipeHSE';
import {Prevention, PREVENTION_FRAMES} from './prevention/Prevention';
import {Iso, ISO_FRAMES} from './iso/Iso';
import {Roles, ROLES_FRAMES} from './roles/Roles';
import {PyramideQHSE, PYRAMIDE_FRAMES} from './pyramide/Pyramide';
import {Promo, PROMO_FRAMES} from './promo/Promo';
import {DangerRisque, DANGER_FRAMES} from './danger/Danger';
import {CharteQualite, CHARTE_FRAMES} from './charte/Charte';
import {EpiEpc, EPI_FRAMES} from './epi/EpiEpc';
import {InductionHSE, INDUCTION_FRAMES} from './induction/Induction';
import {IntegrationHSE, INTEGRATION_FRAMES} from './integration/Integration';
import {TirantAir, TIRANT_FRAMES} from './tirant/Tirant';
import {ResponsableQHSE, RESPONSABLE_FRAMES} from './responsable/Responsable';
import {NormesISO, NORMES_FRAMES} from './normes/Normes';
import {EspacesConfines, CONFINES_FRAMES} from './confines/Confines';
import {IncidentAccident, INCIDENT_FRAMES} from './incident/Incident';
import {QseQhse, QHSE_FRAMES} from './qhse/Qhse';
import {PlanPrevention, PLAN_FRAMES} from './prevention2/PlanPrevention';
import {DangerRisque2, DANGER2_FRAMES} from './danger2/DangerRisque';
import {Iso2026, ISO26_FRAMES} from './iso26/Iso2026';
import {Ishikawa, ISHIKAWA_FRAMES} from './ishikawa/Ishikawa';
import {Certification2, CERTIF_FRAMES} from './certif/Certification';
import {Pieges, PIEGES_FRAMES} from './pieges/Pieges';
import {PodcastStudio, PodcastVertical, PODCAST_FRAMES} from './podcast/Podcast';
import {Hauteur, HAUTEUR_FRAMES} from './hauteur/Hauteur';
import {RisqueBrut, RISQUEBRUT_FRAMES} from './risquebrut/RisqueBrut';
import {Dico, DICO_FRAMES} from './dico/Dico';
import {Vocab, VOCAB_FRAMES} from './vocab/Vocab';
import {Zones, ZONES_FRAMES} from './zones/Zones';
import {Arsenal, ARSENAL_FRAMES} from './arsenal/Arsenal';
import {Swot, SWOT_FRAMES} from './swot/Swot';
import {Docs5, DOCS5_FRAMES} from './docs5/Docs5';
import {Ident, IDENT_FRAMES} from './ident/Ident';
import {Familles, FAMILLES_FRAMES} from './familles/Familles';
import {Pls, PLS_FRAMES} from './pls/Pls';
import {DuerpPdp, DUERPPDP_FRAMES} from './duerppdp/DuerpPdp';
import {IdentUi, IDENTUI_FRAMES} from './identui/IdentUi';
import {EquipeHse, EQUIPEHSE_FRAMES} from './equipeui/EquipeUi';
import {TableauBord, TABLEAUBORD_FRAMES} from './tableaubord/TableauBord';
import {NormeIso, NORMEISO_FRAMES} from './normeiso/NormeIso';
import {Iso9001Monde, ISO9001MONDE_FRAMES} from './iso9001monde/Iso9001Monde';
import {CompterAcc, COMPTERACC_FRAMES} from './compteracc/CompterAcc';
import {AccidentAZ, ACCIDENTAZ_FRAMES} from './accidentaz/AccidentAZ';

export const RemotionRoot: React.FC = () => (
  <>
  <Composition
    id="SuperviseurHSE"
    component={SuperviseurHSE}
    durationInFrames={TOTAL_FRAMES}
    fps={FPS}
    width={1080}
    height={1920}
  />
  <Composition id="EquipeHSE" component={EquipeHSE} durationInFrames={EQUIPE_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="Prevention" component={Prevention} durationInFrames={PREVENTION_FRAMES} fps={FPS} width={1080} height={1920} defaultProps={{placeholders: false}} />
  <Composition id="Iso9001" component={Iso} durationInFrames={ISO_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="AgentSuperviseur" component={Roles} durationInFrames={ROLES_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="PyramideQHSE" component={PyramideQHSE} durationInFrames={PYRAMIDE_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="PromoFormationQHSE" component={Promo} durationInFrames={PROMO_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="DangerRisque" component={DangerRisque} durationInFrames={DANGER_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CharteQualite" component={CharteQualite} durationInFrames={CHARTE_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="EpiEpc" component={EpiEpc} durationInFrames={EPI_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="InductionHSE" component={InductionHSE} durationInFrames={INDUCTION_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="IntegrationHSE" component={IntegrationHSE} durationInFrames={INTEGRATION_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="TirantAir" component={TirantAir} durationInFrames={TIRANT_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="ResponsableQHSE" component={ResponsableQHSE} durationInFrames={RESPONSABLE_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="NormesISO" component={NormesISO} durationInFrames={NORMES_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="EspacesConfines" component={EspacesConfines} durationInFrames={CONFINES_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="IncidentAccident" component={IncidentAccident} durationInFrames={INCIDENT_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="QseQhse" component={QseQhse} durationInFrames={QHSE_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="PlanPrevention" component={PlanPrevention} durationInFrames={PLAN_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="DangerRisque2" component={DangerRisque2} durationInFrames={DANGER2_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="Iso2026" component={Iso2026} durationInFrames={ISO26_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="Ishikawa" component={Ishikawa} durationInFrames={ISHIKAWA_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CertificationAccreditation" component={Certification2} durationInFrames={CERTIF_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="PiegesIso2026" component={Pieges} durationInFrames={PIEGES_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="PodcastStudio" component={PodcastStudio} durationInFrames={PODCAST_FRAMES} fps={FPS} width={1920} height={1080} />
  <Composition id="PodcastVertical" component={PodcastVertical} durationInFrames={PODCAST_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="TravailHauteur" component={Hauteur} durationInFrames={HAUTEUR_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="RisqueBrutReel" component={RisqueBrut} durationInFrames={RISQUEBRUT_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="DictionnaireQHSE" component={Dico} durationInFrames={DICO_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="SiglesQHSE" component={Vocab} durationInFrames={VOCAB_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="ZonesAccidentTravail" component={Zones} durationInFrames={ZONES_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="ArsenalQHSE" component={Arsenal} durationInFrames={ARSENAL_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="AnalyseSwot" component={Swot} durationInFrames={SWOT_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CinqDocumentsQHSE" component={Docs5} durationInFrames={DOCS5_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="IdentificationEvaluation" component={Ident} durationInFrames={IDENT_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="FamillesRisquesSST" component={Familles} durationInFrames={FAMILLES_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="PlsDeuxSecouristes" component={Pls} durationInFrames={PLS_FRAMES} fps={FPS} width={1920} height={1080} />
  <Composition id="DuerpPlanPrevention" component={DuerpPdp} durationInFrames={DUERPPDP_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="IdentificationEvaluationUi" component={IdentUi} durationInFrames={IDENTUI_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="EquipeHsePerformante" component={EquipeHse} durationInFrames={EQUIPEHSE_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="TableauBordQhse" component={TableauBord} durationInFrames={TABLEAUBORD_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="NormeIsoFonctionnement" component={NormeIso} durationInFrames={NORMEISO_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="Iso9001Monde" component={Iso9001Monde} durationInFrames={ISO9001MONDE_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CompterAccidents" component={CompterAcc} durationInFrames={COMPTERACC_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="AccidentTravailAZ" component={AccidentAZ} durationInFrames={ACCIDENTAZ_FRAMES} fps={FPS} width={1080} height={1920} />
  </>
);
