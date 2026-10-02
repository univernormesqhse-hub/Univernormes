import {Composition} from 'remotion';
import {SuperviseurHSE, TOTAL_FRAMES} from './SuperviseurHSE';
import {FPS} from './theme';
import {EquipeHSE, EQUIPE_FRAMES} from './equipe/EquipeHSE';

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
  </>
);
