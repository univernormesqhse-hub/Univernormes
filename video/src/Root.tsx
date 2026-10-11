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
import {IncidentCouverture} from './incident/Couverture';
import {QseQhse, QHSE_FRAMES} from './qhse/Qhse';
import {PlanPrevention, PLAN_FRAMES} from './prevention2/PlanPrevention';
import {PlanPreventionCouverture} from './prevention2/CouverturePlan';
import {DangerRisque2, DANGER2_FRAMES} from './danger2/DangerRisque';
import {DangerRisqueCouverture} from './danger2/Couverture';
import {Iso2026, ISO26_FRAMES} from './iso26/Iso2026';
import {Iso2026Couverture} from './iso26/Couverture';
import {Ishikawa, ISHIKAWA_FRAMES} from './ishikawa/Ishikawa';
import {IshikawaCouverture} from './ishikawa/Couverture';
import {Certification2, CERTIF_FRAMES} from './certif/Certification';
import {CertificationCouverture} from './certif/Couverture';
import {Pieges, PIEGES_FRAMES} from './pieges/Pieges';
import {PiegesPartie2Couverture} from './pieges/Couverture';
import {PodcastStudio, PodcastVertical, PODCAST_FRAMES} from './podcast/Podcast';
import {Hauteur, HAUTEUR_FRAMES} from './hauteur/Hauteur';
import {HauteurCouverture} from './hauteur/Couverture';
import {RisqueBrut, RISQUEBRUT_FRAMES} from './risquebrut/RisqueBrut';
import {RisqueBrutCouverture} from './risquebrut/Couverture';
import {Dico, DICO_FRAMES} from './dico/Dico';
import {DicoCouverture} from './dico/Couverture';
import {Vocab, VOCAB_FRAMES} from './vocab/Vocab';
import {VocabCouverture} from './vocab/Couverture';
import {Zones, ZONES_FRAMES} from './zones/Zones';
import {Arsenal, ARSENAL_FRAMES} from './arsenal/Arsenal';
import {ArsenalCouverture} from './arsenal/Couverture';
import {Swot, SWOT_FRAMES} from './swot/Swot';
import {SwotCouverture} from './swot/Couverture';
import {Docs5, DOCS5_FRAMES} from './docs5/Docs5';
import {Docs5Couverture} from './docs5/Couverture';
import {Ident, IDENT_FRAMES} from './ident/Ident';
import {IdentCouverture} from './ident/Couverture';
import {Familles, FAMILLES_FRAMES} from './familles/Familles';
import {FamillesCouverture} from './familles/Couverture';
import {Pls, PLS_FRAMES} from './pls/Pls';
import {DuerpPdp, DUERPPDP_FRAMES} from './duerppdp/DuerpPdp';
import {DuerpPdpCouverture} from './duerppdp/Couverture';
import {IdentUi, IDENTUI_FRAMES} from './identui/IdentUi';
import {IdentUiCouverture} from './identui/Couverture';
import {EquipeHse, EQUIPEHSE_FRAMES} from './equipeui/EquipeUi';
import {EquipeHseCouverture} from './equipeui/Couverture';
import {TableauBord, TABLEAUBORD_FRAMES} from './tableaubord/TableauBord';
import {TableauBordCouverture} from './tableaubord/Couverture';
import {NormeIso, NORMEISO_FRAMES} from './normeiso/NormeIso';
import {NormeIsoCouverture} from './normeiso/Couverture';
import {Iso9001Monde, ISO9001MONDE_FRAMES} from './iso9001monde/Iso9001Monde';
import {Iso9001MondeCouverture} from './iso9001monde/Couverture';
import {CompterAcc, COMPTERACC_FRAMES} from './compteracc/CompterAcc';
import {CompterAccCouverture} from './compteracc/Couverture';
import {AccidentAZ, ACCIDENTAZ_FRAMES} from './accidentaz/AccidentAZ';
import {AccidentAZCouverture} from './accidentaz/Couverture';
import {CertifIso, CERTIFISO_FRAMES} from './certifiso/CertifIso';
import {CertifIsoCouverture} from './certifiso/Couverture';
import {GuideIso, GUIDEISO_FRAMES} from './guideiso/GuideIso';
import {GuideIsoCouverture} from './guideiso/Couverture';
import {InductionHse, INDUCTIONHSE_FRAMES} from './inductionhse/InductionHse';
import {InductionHseCouverture} from './inductionhse/Couverture';
import {HierarchiePrev, HIERARCHIEPREV_FRAMES} from './hierarchieprev/HierarchiePrev';
import {HierarchiePrevCouverture} from './hierarchieprev/Couverture';
import {PermisFeu, PERMISFEU_FRAMES} from './permisfeu/PermisFeu';
import {PermisFeuCouverture} from './permisfeu/Couverture';
import {DangerSoudage, DANGERSOUDAGE_FRAMES} from './dangersoudage/DangerSoudage';
import {DangerSoudageCouverture} from './dangersoudage/Couverture';
import {FeuClasseA, FEUCLASSEA_FRAMES} from './feuclassea/FeuClasseA';
import {FeuClasseACouverture} from './feuclassea/Couverture';
import {OriginesIncendie, ORIGINESINCENDIE_FRAMES} from './originesincendie/OriginesIncendie';
import {OriginesIncendieCouverture} from './originesincendie/Couverture';
import {SixDirections, SIXDIRECTIONS_FRAMES} from './sixdirections/SixDirections';
import {SixDirectionsCouverture} from './sixdirections/Couverture';
import {MiTemps, MITEMPS_FRAMES} from './mitemps/MiTemps';
import {DemarcheQualite, DEMARCHEQUALITE_FRAMES} from './demarchequalite/DemarcheQualite';
import {ZeroAlcool, ZEROALCOOL_FRAMES} from './zeroalcool/ZeroAlcool';
import {IngenieurQhse, INGENIEURQHSE_FRAMES} from './ingenieurqhse/IngenieurQhse';
import {EpiEpcGuide, EPIEPCGUIDE_FRAMES} from './epiepc/EpiEpc';
import {Verites, VERITES_FRAMES} from './verites/Verites';
import {QuartHeure, QUARTHEURE_FRAMES} from './quartheure/QuartHeure';
import {Causerie, CAUSERIE_FRAMES} from './causerie/Causerie';
import {Codification, CODIFICATION_FRAMES} from './codification/Codification';
import {Smi, SMI_FRAMES} from './smi/Smi';
import {ChefQhse, CHEFQHSE_FRAMES} from './chefqhse/ChefQhse';
import {SeptM, SEPTM_FRAMES} from './septm/SeptM';
import {Specialiser, SPECIALISER_FRAMES} from './specialiser/Specialiser';
import {CinqPourquoi, CINQPOURQUOI_FRAMES} from './cinqpourquoi/CinqPourquoi';
import {OutilsQualite, OUTILSQUALITE_FRAMES} from './outilsqualite/OutilsQualite';
import {Toolbox, TOOLBOX_FRAMES} from './toolbox/Toolbox';
import {MgmtIntegre, MGMTINTEGRE_FRAMES} from './mgmtintegre/MgmtIntegre';
import {Indicateurs, INDICATEURS_FRAMES} from './indicateurs/Indicateurs';
import {RoleNormes, ROLENORMES_FRAMES} from './rolenormes/RoleNormes';
import {RoleNormesCouverture} from './rolenormes/Couverture';

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
  <Composition id="IncidentAccidentCouverture" component={IncidentCouverture} durationInFrames={91} fps={FPS} width={1080} height={1920} />
  <Composition id="QseQhse" component={QseQhse} durationInFrames={QHSE_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="PlanPrevention" component={PlanPrevention} durationInFrames={PLAN_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="PlanPreventionCouverture" component={PlanPreventionCouverture} durationInFrames={91} fps={FPS} width={1080} height={1920} />
  <Composition id="DangerRisque2" component={DangerRisque2} durationInFrames={DANGER2_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="DangerRisque2Couverture" component={DangerRisqueCouverture} durationInFrames={91} fps={FPS} width={1080} height={1920} />
  <Composition id="Iso2026" component={Iso2026} durationInFrames={ISO26_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="Iso2026Couverture" component={Iso2026Couverture} durationInFrames={91} fps={FPS} width={1080} height={1920} />
  <Composition id="Ishikawa" component={Ishikawa} durationInFrames={ISHIKAWA_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="IshikawaCouverture" component={IshikawaCouverture} durationInFrames={91} fps={FPS} width={1080} height={1920} />
  <Composition id="CertificationAccreditation" component={Certification2} durationInFrames={CERTIF_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CertificationAccreditationCouverture" component={CertificationCouverture} durationInFrames={91} fps={FPS} width={1080} height={1920} />
  <Composition id="PiegesIso2026" component={Pieges} durationInFrames={PIEGES_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="PiegesIso2026Partie2Couverture" component={PiegesPartie2Couverture} durationInFrames={91} fps={FPS} width={1080} height={1920} />
  <Composition id="PodcastStudio" component={PodcastStudio} durationInFrames={PODCAST_FRAMES} fps={FPS} width={1920} height={1080} />
  <Composition id="PodcastVertical" component={PodcastVertical} durationInFrames={PODCAST_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="TravailHauteur" component={Hauteur} durationInFrames={HAUTEUR_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="TravailHauteurCouverture" component={HauteurCouverture} durationInFrames={91} fps={FPS} width={1080} height={1920} />
  <Composition id="RisqueBrutReel" component={RisqueBrut} durationInFrames={RISQUEBRUT_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="RisqueBrutReelCouverture" component={RisqueBrutCouverture} durationInFrames={91} fps={FPS} width={1080} height={1920} />
  <Composition id="DictionnaireQHSE" component={Dico} durationInFrames={DICO_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="DictionnaireQHSECouverture" component={DicoCouverture} durationInFrames={91} fps={FPS} width={1080} height={1920} />
  <Composition id="SiglesQHSE" component={Vocab} durationInFrames={VOCAB_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="SiglesQHSECouverture" component={VocabCouverture} durationInFrames={91} fps={FPS} width={1080} height={1920} />
  <Composition id="ZonesAccidentTravail" component={Zones} durationInFrames={ZONES_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="ArsenalQHSE" component={Arsenal} durationInFrames={ARSENAL_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="ArsenalQHSECouverture" component={ArsenalCouverture} durationInFrames={91} fps={FPS} width={1080} height={1920} />
  <Composition id="AnalyseSwot" component={Swot} durationInFrames={SWOT_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="AnalyseSwotCouverture" component={SwotCouverture} durationInFrames={91} fps={FPS} width={1080} height={1920} />
  <Composition id="CinqDocumentsQHSE" component={Docs5} durationInFrames={DOCS5_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CinqDocumentsQHSECouverture" component={Docs5Couverture} durationInFrames={91} fps={FPS} width={1080} height={1920} />
  <Composition id="IdentificationEvaluation" component={Ident} durationInFrames={IDENT_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="IdentificationEvaluationCouverture" component={IdentCouverture} durationInFrames={91} fps={FPS} width={1080} height={1920} />
  <Composition id="FamillesRisquesSST" component={Familles} durationInFrames={FAMILLES_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="FamillesRisquesSSTCouverture" component={FamillesCouverture} durationInFrames={91} fps={FPS} width={1080} height={1920} />
  <Composition id="PlsDeuxSecouristes" component={Pls} durationInFrames={PLS_FRAMES} fps={FPS} width={1920} height={1080} />
  <Composition id="DuerpPlanPrevention" component={DuerpPdp} durationInFrames={DUERPPDP_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="DuerpPlanPreventionCouverture" component={DuerpPdpCouverture} durationInFrames={91} fps={FPS} width={1080} height={1920} />
  <Composition id="IdentificationEvaluationUi" component={IdentUi} durationInFrames={IDENTUI_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="IdentificationEvaluationUiCouverture" component={IdentUiCouverture} durationInFrames={1} fps={FPS} width={1080} height={1920} />
  <Composition id="EquipeHsePerformante" component={EquipeHse} durationInFrames={EQUIPEHSE_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="EquipeHsePerformanteCouverture" component={EquipeHseCouverture} durationInFrames={1} fps={FPS} width={1080} height={1920} />
  <Composition id="TableauBordQhse" component={TableauBord} durationInFrames={TABLEAUBORD_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="TableauBordQhseCouverture" component={TableauBordCouverture} durationInFrames={1} fps={FPS} width={1080} height={1920} />
  <Composition id="NormeIsoFonctionnement" component={NormeIso} durationInFrames={NORMEISO_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="NormeIsoFonctionnementCouverture" component={NormeIsoCouverture} durationInFrames={1} fps={FPS} width={1080} height={1920} />
  <Composition id="Iso9001Monde" component={Iso9001Monde} durationInFrames={ISO9001MONDE_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="Iso9001MondeCouverture" component={Iso9001MondeCouverture} durationInFrames={1} fps={FPS} width={1080} height={1920} />
  <Composition id="CompterAccidents" component={CompterAcc} durationInFrames={COMPTERACC_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CompterAccidentsCouverture" component={CompterAccCouverture} durationInFrames={1} fps={FPS} width={1080} height={1920} />
  <Composition id="AccidentTravailAZ" component={AccidentAZ} durationInFrames={ACCIDENTAZ_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="AccidentTravailAZCouverture" component={AccidentAZCouverture} durationInFrames={1} fps={FPS} width={1080} height={1920} />
  <Composition id="CertifIsoPourquoi" component={CertifIso} durationInFrames={CERTIFISO_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CertifIsoPourquoiCouverture" component={CertifIsoCouverture} durationInFrames={1} fps={FPS} width={1080} height={1920} />
  <Composition id="GuideIsoTrio" component={GuideIso} durationInFrames={GUIDEISO_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="GuideIsoTrioCouverture" component={GuideIsoCouverture} durationInFrames={1} fps={FPS} width={1080} height={1920} />
  <Composition id="InductionHsePremium" component={InductionHse} durationInFrames={INDUCTIONHSE_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="InductionHsePremiumCouverture" component={InductionHseCouverture} durationInFrames={1} fps={FPS} width={1080} height={1920} />
  <Composition id="HierarchiePrevention" component={HierarchiePrev} durationInFrames={HIERARCHIEPREV_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="HierarchiePreventionCouverture" component={HierarchiePrevCouverture} durationInFrames={1} fps={FPS} width={1080} height={1920} />
  <Composition id="PermisDeFeu" component={PermisFeu} durationInFrames={PERMISFEU_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="PermisDeFeuCouverture" component={PermisFeuCouverture} durationInFrames={1} fps={FPS} width={1080} height={1920} />
  <Composition id="DangerSoudage" component={DangerSoudage} durationInFrames={DANGERSOUDAGE_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="DangerSoudageCouverture" component={DangerSoudageCouverture} durationInFrames={1} fps={FPS} width={1080} height={1920} />
  <Composition id="FeuClasseA" component={FeuClasseA} durationInFrames={FEUCLASSEA_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="FeuClasseACouverture" component={FeuClasseACouverture} durationInFrames={1} fps={FPS} width={1080} height={1920} />
  <Composition id="OriginesIncendie" component={OriginesIncendie} durationInFrames={ORIGINESINCENDIE_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="OriginesIncendieCouverture" component={OriginesIncendieCouverture} durationInFrames={1} fps={FPS} width={1080} height={1920} />
  <Composition id="SixDirections" component={SixDirections} durationInFrames={SIXDIRECTIONS_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="SixDirectionsCouverture" component={SixDirectionsCouverture} durationInFrames={1} fps={FPS} width={1080} height={1920} />
  <Composition id="MiTempsTherapeutique" component={MiTemps} durationInFrames={MITEMPS_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="DemarcheQualite10Etapes" component={DemarcheQualite} durationInFrames={DEMARCHEQUALITE_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="ZeroAlcool" component={ZeroAlcool} durationInFrames={ZEROALCOOL_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="IngenieurQhse" component={IngenieurQhse} durationInFrames={INGENIEURQHSE_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="EpiVsEpcGuide" component={EpiEpcGuide} durationInFrames={EPIEPCGUIDE_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="TreizeVeritesHse" component={Verites} durationInFrames={VERITES_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="QuartHeureSecurite" component={QuartHeure} durationInFrames={QUARTHEURE_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CauserieParticipative" component={Causerie} durationInFrames={CAUSERIE_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CodificationDocumentsQhse" component={Codification} durationInFrames={CODIFICATION_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="QseIntegreSmi" component={Smi} durationInFrames={SMI_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="MissionsResponsableQhse" component={ChefQhse} durationInFrames={CHEFQHSE_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="MethodeDes7M" component={SeptM} durationInFrames={SEPTM_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="SeSpecialiserQhse" component={Specialiser} durationInFrames={SPECIALISER_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="MethodeCinqPourquoi" component={CinqPourquoi} durationInFrames={CINQPOURQUOI_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="OutilsMethodesQualite" component={OutilsQualite} durationInFrames={OUTILSQUALITE_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="ToolboxMeeting" component={Toolbox} durationInFrames={TOOLBOX_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="ManagementIntegreQse" component={MgmtIntegre} durationInFrames={MGMTINTEGRE_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="IndicateursSecurite" component={Indicateurs} durationInFrames={INDICATEURS_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="RoleNormesIso" component={RoleNormes} durationInFrames={ROLENORMES_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="RoleNormesCouverture" component={RoleNormesCouverture} durationInFrames={1} fps={FPS} width={1080} height={1920} />
  </>
);
