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
  </>
);
