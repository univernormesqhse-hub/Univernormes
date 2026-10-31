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
import {TirantCouverture} from './tirant/Couverture';
import {ResponsableQHSE, RESPONSABLE_FRAMES} from './responsable/Responsable';
import {ResponsableCouverture} from './responsable/Couverture';
import {NormesISO, NORMES_FRAMES} from './normes/Normes';
import {NormesCouverture} from './normes/Couverture';
import {EspacesConfines, CONFINES_FRAMES} from './confines/Confines';
import {ConfinesCouverture} from './confines/Couverture';
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
import {FichePoste, FICHEPOSTE_FRAMES} from './fichePoste/FichePoste';
import {ImplIso, IMPLISO_FRAMES} from './implIso/ImplIso';
import {Jsa, JSA_FRAMES} from './jsa/Jsa';
import {TdbQhse, TDB_FRAMES} from './tdbQhse/TdbQhse';
import {Kpi12, KPI12_FRAMES} from './kpi12/Kpi12';
import {PlanAction, PLANACTION_FRAMES} from './planAction/PlanAction';
import {TroisIso, TROISISO_FRAMES} from './troisIso/TroisIso';
import {Haccp, HACCP_FRAMES} from './haccp/Haccp';
import {Coordo, COORDO_FRAMES} from './coordo/Coordo';
import {Assistant, ASSISTANT_FRAMES} from './assistant/Assistant';
import {Animateur, ANIMATEUR_FRAMES} from './animateur/Animateur';
import {Acronymes, ACRONYMES_FRAMES} from './acronymes/Acronymes';
import {AcroSecu, ACROSECU_FRAMES} from './acrosecu/AcroSecu';
import {ProcProc, PROCPROC_FRAMES} from './procProc/ProcProc';
import {IdProc, IDPROC_FRAMES} from './idProc/IdProc';
import {ProcVs, PROCVS_FRAMES} from './procVs/ProcVs';
import {Durab, DURAB_FRAMES} from './durab/Durab';
import {AiprAtex, AIPRATEX_FRAMES} from './aiprAtex/AiprAtex';
import {Deming, DEMING_FRAMES} from './deming/Deming';
import {AccInc, ACCINC_FRAMES} from './accInc/AccInc';
import {SecuInd, SECUIND_FRAMES} from './secuInd/SecuInd';
import {PlanHse, PLANHSE_FRAMES} from './planHse/PlanHse';
import {Pouls, POULS_FRAMES} from './pouls/Pouls';
import {DeclAt, DECLAT_FRAMES} from './declAt/DeclAt';
import {TdbPilot, TDBPILOT_FRAMES} from './tdbPilot/TdbPilot';
import {DangerSit, DANGERSIT_FRAMES} from './dangerSit/DangerSit';
import {ArbreCauses, ARBRECAUSES_FRAMES} from './arbreCauses/ArbreCauses';
import {Amputation, AMPUTATION_FRAMES} from './amputation/Amputation';
import {Echafaudage, ECHAF_FRAMES} from './echafaudage/Echafaudage';
import {Iso14001, ISO14001_FRAMES} from './iso14001/Iso14001';
import {AccueilSecu, ACCUEIL_FRAMES} from './accueilSecu/AccueilSecu';
import {IsoAfrique, ISOAFR_FRAMES} from './isoAfrique/IsoAfrique';
import {Ohsas, OHSAS_FRAMES} from './ohsas/Ohsas';
import {IfsBrc, IFSBRC_FRAMES} from './ifsBrc/IfsBrc';
import {EntretienHse, ENTRETIEN_FRAMES} from './entretienHse/EntretienHse';
import {NormesIso, NORMESISO_FRAMES} from './normesIso/NormesIso';
import {Zones3, ZONES3_FRAMES} from './zones3/Zones3';
import {Qhse2, QHSE2_FRAMES} from './qhse2/Qhse2';
import {VendrediBilan, VENDREDI_FRAMES} from './vendrediBilan/VendrediBilan';
import {NeufPrincipes, NEUF_FRAMES} from './neufPrincipes/NeufPrincipes';
import {Caidat2, CAIDAT_FRAMES} from './caidat/Caidat';
import {PermisTravail, PERMIS_FRAMES} from './permisTravail/PermisTravail';
import {Responsabilite2, RESPONSABILITE_FRAMES} from './responsabilite/Responsabilite';
import {CartoRisques, CARTO_FRAMES} from './cartoRisques/CartoRisques';
import {EnqueteIshikawa, ENQUETE_FRAMES} from './enqueteIshikawa/EnqueteIshikawa';
import {InfluenceQhse, INFLUENCE_FRAMES} from './influenceQhse/InfluenceQhse';
import {VingtOutils, VINGT_FRAMES} from './vingtOutils/VingtOutils';
import {HeuresSansAcc, HEURES_FRAMES} from './heuresSansAcc/HeuresSansAcc';
import {MaturitePrev, MATURITE_FRAMES} from './maturitePrev/MaturitePrev';
import {IsoPerf, ISOPERF_FRAMES} from './isoPerf/IsoPerf';
import {Metrologie, METRO_FRAMES} from './metrologie/Metrologie';
import {DevoirAlerte, ALERTE_FRAMES} from './devoirAlerte/DevoirAlerte';
import {MetroIso, METROISO_FRAMES} from './metroIso/MetroIso';
import {MetroIsoPlan, METROPLAN_FRAMES} from './metroIso/MetroIsoPlan';
import {DiagQhse, DIAG_FRAMES} from './diagQhse/DiagQhse';
import {SystemeQsse, SYSQSSE_FRAMES} from './systemeQsse/SystemeQsse';
import {SiglesQhse, SIGLES_FRAMES} from './siglesQhse/SiglesQhse';
import {Soudure, SOUDURE_FRAMES} from './soudure/Soudure';
import {ReglesOr, REGLES_FRAMES} from './reglesOr/ReglesOr';
import {ChefOrchestre, ORCHESTRE_FRAMES} from './chefOrchestre/ChefOrchestre';
import {SuperviseurHse, SUPERVISEUR_FRAMES} from './superviseurHse/SuperviseurHse';
import {Iso45001Active, ISO45001A_FRAMES} from './iso45001Active/Iso45001Active';
import {QuaranteDevoirs, DEVOIRS_FRAMES} from './quaranteDevoirs/QuaranteDevoirs';
import {ToolboxCondense, TOOLBOXC_FRAMES} from './toolboxCondense/ToolboxCondense';
import {ChutesPlainPied, CHUTES_FRAMES} from './chutesPlainPied/ChutesPlainPied';
import {AtmpEcosysteme, ATMP_FRAMES} from './atmpEcosysteme/AtmpEcosysteme';
import {AffichagesOblig, AFFICH_FRAMES} from './affichagesOblig/AffichagesOblig';
import {LangageDg, LANGAGE_FRAMES} from './langageDg/LangageDg';
import {PremierEmploi, PREMIER_FRAMES} from './premierEmploi/PremierEmploi';
import {CafeHse, CAFE_FRAMES} from './cafeHse/CafeHse';
import {NormesIsac, NORMES_ISAC_FRAMES} from './normesIsac/NormesIsac';
import {EquipeIsac, EQUIPE_ISAC_FRAMES} from './equipeIsac/EquipeIsac';
import {Kaizen, KAIZEN_FRAMES} from './kaizen/Kaizen';
import {PlansPrevention, PLANS_PREV_FRAMES} from './plansPrev/PlansPrevention';
import {OutilsStrat, OUTILS_STRAT_FRAMES} from './outilsStrat/OutilsStrat';
import {SmartMethode, SMART_FRAMES} from './smartMethode/SmartMethode';
import {Amdec, AMDEC_FRAMES} from './amdec/Amdec';
import {CinqPourquoiMetro, CINQ_POURQUOI_METRO_FRAMES} from './cinqPourquoiMetro/CinqPourquoiMetro';
import {IshikawaMetro, ISHIKAWA_METRO_FRAMES} from './ishikawaMetro/IshikawaMetro';
import {QualiteOutilsMetro, QUALITE_OUTILS_METRO_FRAMES} from './qualiteOutilsMetro/QualiteOutilsMetro';
import {PiliersPrevMetro, PILIERS_PREV_METRO_FRAMES} from './piliersPrevMetro/PiliersPrevMetro';
import {PiliersTerrainMetro, PILIERS_TERRAIN_METRO_FRAMES} from './piliersTerrainMetro/PiliersTerrainMetro';
import {SainSaufMetro, SAIN_SAUF_METRO_FRAMES} from './sainSaufMetro/SainSaufMetro';
import {BonOutilMetro, BON_OUTIL_METRO_FRAMES} from './bonOutilMetro/BonOutilMetro';
import {EdificeIsoMetro, EDIFICE_ISO_METRO_FRAMES} from './edificeIsoMetro/EdificeIsoMetro';
import {AnimTerrainMetro, ANIM_TERRAIN_METRO_FRAMES} from './animTerrainMetro/AnimTerrainMetro';
import {PlanPrevEtapes, PLAN_PREV_ETAPES_FRAMES} from './planPrevEtapes/PlanPrevEtapes';
import {DangerRisqueMetro, DANGER_RISQUE_METRO_FRAMES} from './dangerRisqueMetro/DangerRisqueMetro';
import {SecuriteRegleeGeree, SECURITE_REGLEE_GEREE_FRAMES} from './securiteRegleeGeree/SecuriteRegleeGeree';
import {JsaMetro, JSA_METRO_FRAMES} from './jsaMetro/JsaMetro';
import {SwiftMetro, SWIFT_METRO_FRAMES} from './swiftMetro/SwiftMetro';
import {ParetoMetro, PARETO_METRO_FRAMES} from './paretoMetro/ParetoMetro';
import {TaprootMetro, TAPROOT_METRO_FRAMES} from './taprootMetro/TaprootMetro';
import {RhseMetro, RHSE_METRO_FRAMES} from './rhseMetro/RhseMetro';
import {MissionsMetro, MISSIONS_METRO_FRAMES} from './missionsMetro/MissionsMetro';
import {PrincipesMetro, PRINCIPES_METRO_FRAMES} from './principesMetro/PrincipesMetro';
import {EvalRisquesMetro, EVAL_RISQUES_METRO_FRAMES} from './evalRisquesMetro/EvalRisquesMetro';
import {Audit13Metro, AUDIT13_METRO_FRAMES} from './audit13Metro/Audit13Metro';
import {CauseriesMetro, CAUSERIES_METRO_FRAMES} from './causeriesMetro/CauseriesMetro';
import {PartiesMetro, PARTIES_METRO_FRAMES} from './partiesMetro/PartiesMetro';
import {FlashInfoMetro, FLASH_INFO_METRO_FRAMES} from './flashInfoMetro/FlashInfoMetro';
import {FoudreMetro, FOUDRE_METRO_FRAMES} from './foudreMetro/FoudreMetro';
import {ChallengesMetro, CHALLENGES_METRO_FRAMES} from './challengesMetro/ChallengesMetro';
import {IsoQuinzeMetro, ISO_QUINZE_METRO_FRAMES} from './isoQuinzeMetro/IsoQuinzeMetro';
import {IsoQuinze3D, ISO_QUINZE_3D_FRAMES} from './isoQuinze3D/IsoQuinze3D';
import {IsoQuinzeSub, ISO_QUINZE_SUB_FRAMES} from './isoQuinzeSub/IsoQuinzeSub';
import {IsoQuinzeCartes, ISO_QUINZE_CARTES_FRAMES} from './isoQuinzeCartes/IsoQuinzeCartes';
import {IsoQuinzeCarte, ISO_QUINZE_CARTE_FRAMES} from './isoQuinzeCarte/IsoQuinzeCarte';
import {Matrice44Metro, MATRICE44_METRO_FRAMES} from './matrice44Metro/Matrice44Metro';
import {HazidMetro, HAZID_METRO_FRAMES} from './hazidMetro/HazidMetro';
import {AprMetro, APR_METRO_FRAMES} from './aprMetro/AprMetro';
import {HazopMetro, HAZOP_METRO_FRAMES} from './hazopMetro/HazopMetro';
import {AmdecMetro, AMDEC_METRO_FRAMES} from './amdecMetro/AmdecMetro';
import {WhatIfMetro, WHATIF_METRO_FRAMES} from './whatIfMetro/WhatIfMetro';
import {LigneInvisible, LIGNE_FRAMES} from './ligneInvisible/LigneInvisible';
import {RoleNormes, ROLENORMES_FRAMES} from './rolenormes/RoleNormes';
import {RoleNormesCouverture} from './rolenormes/Couverture';

import {LibraryDemos} from './library-demos';

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
  <Composition id="TirantAirCouverture" component={TirantCouverture} durationInFrames={91} fps={FPS} width={1080} height={1920} />
  <Composition id="ResponsableQHSE" component={ResponsableQHSE} durationInFrames={RESPONSABLE_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="ResponsableQHSECouverture" component={ResponsableCouverture} durationInFrames={1} fps={FPS} width={1080} height={1920} />
  <Composition id="NormesISO" component={NormesISO} durationInFrames={NORMES_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="NormesISOCouverture" component={NormesCouverture} durationInFrames={1} fps={FPS} width={1080} height={1920} />
  <Composition id="EspacesConfines" component={EspacesConfines} durationInFrames={CONFINES_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="EspacesConfinesCouverture" component={ConfinesCouverture} durationInFrames={91} fps={FPS} width={1080} height={1920} />
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
  <Composition id="FichePosteFonction" component={FichePoste} durationInFrames={FICHEPOSTE_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="ImplementationIso" component={ImplIso} durationInFrames={IMPLISO_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="MaitriseJsa" component={Jsa} durationInFrames={JSA_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="TableauBordQhseEfficace" component={TdbQhse} durationInFrames={TDB_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="DouzeIndicateursQhse" component={Kpi12} durationInFrames={KPI12_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="MaitriserPlanActionQhse" component={PlanAction} durationInFrames={PLANACTION_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="TroisNormesIsoSimplifiees" component={TroisIso} durationInFrames={TROISISO_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="MaitriserPrpPrpoCcp" component={Haccp} durationInFrames={HACCP_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="RoleCoordinateurHse" component={Coordo} durationInFrames={COORDO_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="ImpactAssistantHse" component={Assistant} durationInFrames={ASSISTANT_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="AnimateurHseReflexe" component={Animateur} durationInFrames={ANIMATEUR_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="VocabulaireAcronymesHse" component={Acronymes} durationInFrames={ACRONYMES_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="AcronymesSecuriteIndustrielle" component={AcroSecu} durationInFrames={ACROSECU_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="ProcedureDesProcedures" component={ProcProc} durationInFrames={PROCPROC_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="IdentifierLesProcessus" component={IdProc} durationInFrames={IDPROC_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="ProcessusVsProcedure" component={ProcVs} durationInFrames={PROCVS_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="DurabiliteDecodee" component={Durab} durationInFrames={DURAB_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="AiprVsAtex" component={AiprAtex} durationInFrames={AIPRATEX_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="RoueDeDeming" component={Deming} durationInFrames={DEMING_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="AccidentIncidentQuasi" component={AccInc} durationInFrames={ACCINC_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="SecuriteTravailVsIndustrielle" component={SecuInd} durationInFrames={SECUIND_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="LePlanHse" component={PlanHse} durationInFrames={PLANHSE_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="PriseDePoulsTerrain" component={Pouls} durationInFrames={POULS_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="DeclarationAccidentTravail" component={DeclAt} durationInFrames={DECLAT_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="PiloterTableauxDeBordQhse" component={TdbPilot} durationInFrames={TDBPILOT_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="DangerOuSituationDangereuse" component={DangerSit} durationInFrames={DANGERSIT_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="ArbreDesCauses" component={ArbreCauses} durationInFrames={ARBRECAUSES_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="AmputationGuideCrise" component={Amputation} durationInFrames={AMPUTATION_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="SecuriteEchafaudages" component={Echafaudage} durationInFrames={ECHAF_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="AspectsIso14001Cotation" component={Iso14001} durationInFrames={ISO14001_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="AccueilSecuriteSite" component={AccueilSecu} durationInFrames={ACCUEIL_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="Iso9001AfriqueOuest" component={IsoAfrique} durationInFrames={ISOAFR_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="OhsasVsIso45001" component={Ohsas} durationInFrames={OHSAS_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="MandatInvisibleIfsBrc" component={IfsBrc} durationInFrames={IFSBRC_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="ReussirEntretienHse" component={EntretienHse} durationInFrames={ENTRETIEN_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseNormesIso" component={NormesIso} durationInFrames={NORMESISO_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseTroisZones" component={Zones3} durationInFrames={ZONES3_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseQseHseQhse" component={Qhse2} durationInFrames={QHSE2_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseVendrediBilan" component={VendrediBilan} durationInFrames={VENDREDI_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseNeufPrincipes" component={NeufPrincipes} durationInFrames={NEUF_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseCaidat" component={Caidat2} durationInFrames={CAIDAT_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondensePermisTravail" component={PermisTravail} durationInFrames={PERMIS_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseResponsabilite" component={Responsabilite2} durationInFrames={RESPONSABILITE_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseCartoRisques" component={CartoRisques} durationInFrames={CARTO_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseEnqueteIshikawa" component={EnqueteIshikawa} durationInFrames={ENQUETE_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseInfluenceQhse" component={InfluenceQhse} durationInFrames={INFLUENCE_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseVingtOutils" component={VingtOutils} durationInFrames={VINGT_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseHeuresSansAcc" component={HeuresSansAcc} durationInFrames={HEURES_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseMaturitePrev" component={MaturitePrev} durationInFrames={MATURITE_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseIsoPerf" component={IsoPerf} durationInFrames={ISOPERF_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseMetrologie" component={Metrologie} durationInFrames={METRO_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseDevoirAlerte" component={DevoirAlerte} durationInFrames={ALERTE_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseMetroIso" component={MetroIso} durationInFrames={METROISO_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="MetroIsoPlan" component={MetroIsoPlan} durationInFrames={METROPLAN_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseDiagQhse" component={DiagQhse} durationInFrames={DIAG_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseSystemeQsse" component={SystemeQsse} durationInFrames={SYSQSSE_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseSiglesQhse" component={SiglesQhse} durationInFrames={SIGLES_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseSoudure" component={Soudure} durationInFrames={SOUDURE_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseReglesOr" component={ReglesOr} durationInFrames={REGLES_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseChefOrchestre" component={ChefOrchestre} durationInFrames={ORCHESTRE_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseSuperviseurHse" component={SuperviseurHse} durationInFrames={SUPERVISEUR_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseIso45001Active" component={Iso45001Active} durationInFrames={ISO45001A_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseQuaranteDevoirs" component={QuaranteDevoirs} durationInFrames={DEVOIRS_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseToolbox" component={ToolboxCondense} durationInFrames={TOOLBOXC_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseChutesPlainPied" component={ChutesPlainPied} durationInFrames={CHUTES_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseAtmpEcosysteme" component={AtmpEcosysteme} durationInFrames={ATMP_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseAffichagesOblig" component={AffichagesOblig} durationInFrames={AFFICH_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseLangageDg" component={LangageDg} durationInFrames={LANGAGE_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondensePremierEmploi" component={PremierEmploi} durationInFrames={PREMIER_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseCafeHse" component={CafeHse} durationInFrames={CAFE_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseNormesIsac" component={NormesIsac} durationInFrames={NORMES_ISAC_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseEquipeIsac" component={EquipeIsac} durationInFrames={EQUIPE_ISAC_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseKaizen" component={Kaizen} durationInFrames={KAIZEN_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondensePlansPrevention" component={PlansPrevention} durationInFrames={PLANS_PREV_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseOutilsStrat" component={OutilsStrat} durationInFrames={OUTILS_STRAT_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseSmart" component={SmartMethode} durationInFrames={SMART_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseAmdec" component={Amdec} durationInFrames={AMDEC_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseCinqPourquoi" component={CinqPourquoiMetro} durationInFrames={CINQ_POURQUOI_METRO_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseIshikawaMetro" component={IshikawaMetro} durationInFrames={ISHIKAWA_METRO_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseQualiteOutilsMetro" component={QualiteOutilsMetro} durationInFrames={QUALITE_OUTILS_METRO_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondensePiliersPrevMetro" component={PiliersPrevMetro} durationInFrames={PILIERS_PREV_METRO_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondensePiliersTerrainMetro" component={PiliersTerrainMetro} durationInFrames={PILIERS_TERRAIN_METRO_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseSainSaufMetro" component={SainSaufMetro} durationInFrames={SAIN_SAUF_METRO_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseBonOutilMetro" component={BonOutilMetro} durationInFrames={BON_OUTIL_METRO_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseEdificeIsoMetro" component={EdificeIsoMetro} durationInFrames={EDIFICE_ISO_METRO_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseAnimTerrainMetro" component={AnimTerrainMetro} durationInFrames={ANIM_TERRAIN_METRO_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondensePlanPrevEtapes" component={PlanPrevEtapes} durationInFrames={PLAN_PREV_ETAPES_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseDangerRisqueMetro" component={DangerRisqueMetro} durationInFrames={DANGER_RISQUE_METRO_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseSecuriteRegleeGeree" component={SecuriteRegleeGeree} durationInFrames={SECURITE_REGLEE_GEREE_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseJsaMetro" component={JsaMetro} durationInFrames={JSA_METRO_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseSwiftMetro" component={SwiftMetro} durationInFrames={SWIFT_METRO_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseParetoMetro" component={ParetoMetro} durationInFrames={PARETO_METRO_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseTaprootMetro" component={TaprootMetro} durationInFrames={TAPROOT_METRO_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseRhseMetro" component={RhseMetro} durationInFrames={RHSE_METRO_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseMissionsMetro" component={MissionsMetro} durationInFrames={MISSIONS_METRO_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondensePrincipesMetro" component={PrincipesMetro} durationInFrames={PRINCIPES_METRO_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseEvalRisquesMetro" component={EvalRisquesMetro} durationInFrames={EVAL_RISQUES_METRO_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseAudit13Metro" component={Audit13Metro} durationInFrames={AUDIT13_METRO_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseCauseriesMetro" component={CauseriesMetro} durationInFrames={CAUSERIES_METRO_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondensePartiesMetro" component={PartiesMetro} durationInFrames={PARTIES_METRO_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseFlashInfoMetro" component={FlashInfoMetro} durationInFrames={FLASH_INFO_METRO_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseFoudreMetro" component={FoudreMetro} durationInFrames={FOUDRE_METRO_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseChallengesMetro" component={ChallengesMetro} durationInFrames={CHALLENGES_METRO_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseIsoQuinzeMetro" component={IsoQuinzeMetro} durationInFrames={ISO_QUINZE_METRO_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseIsoQuinze3D" component={IsoQuinze3D} durationInFrames={ISO_QUINZE_3D_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseIsoQuinzeSub" component={IsoQuinzeSub} durationInFrames={ISO_QUINZE_SUB_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseIsoQuinzeCartes" component={IsoQuinzeCartes} durationInFrames={ISO_QUINZE_CARTES_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseIsoQuinzeCarte" component={IsoQuinzeCarte} durationInFrames={ISO_QUINZE_CARTE_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseMatrice44Metro" component={Matrice44Metro} durationInFrames={MATRICE44_METRO_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseHazidMetro" component={HazidMetro} durationInFrames={HAZID_METRO_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseAprMetro" component={AprMetro} durationInFrames={APR_METRO_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseHazopMetro" component={HazopMetro} durationInFrames={HAZOP_METRO_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseAmdecMetro" component={AmdecMetro} durationInFrames={AMDEC_METRO_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="CondenseWhatIfMetro" component={WhatIfMetro} durationInFrames={WHATIF_METRO_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="LigneInvisible" component={LigneInvisible} durationInFrames={LIGNE_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="RoleNormesIso" component={RoleNormes} durationInFrames={ROLENORMES_FRAMES} fps={FPS} width={1080} height={1920} />
  <Composition id="RoleNormesCouverture" component={RoleNormesCouverture} durationInFrames={1} fps={FPS} width={1080} height={1920} />
  <LibraryDemos />
  </>
);
