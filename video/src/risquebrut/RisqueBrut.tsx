import {AbsoluteFill, Audio, staticFile} from 'remotion';
import {easeInOut, easeOut, Enter, Gate, kf, Kinetic, prog, useT} from '../anim';
import {PhotoCard, RED} from '../charte/ui';
import {Background} from '../components/Background';
import {Captions} from '../components/Captions';
import {Footer} from '../components/Footer';
import {Camera, Flash, Wipe} from '../components/Fx';
import {Header} from '../components/Header';
import {Note, Op, Stamp, Win} from '../danger2/ui';
import {F, Pill} from '../iso/ui';
import {CineShot, Highlight, Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {colors, handFont, s, sansFont} from '../theme';
import {captions} from './captions';

const LOGO = 'promo/logo.png';
const OUTRO_AT = 75.6;
export const RISQUEBRUT_FRAMES = s(79.0);
const img = (n: string) => `risquebrut/${n}.jpg`;
const GREEN = colors.green;
const AMBER = '#E39B1F';

const levelColor = (v: number) => (v >= 12 ? RED : v >= 6 ? AMBER : GREEN);

/** Barre de cotation (gravité ou probabilité, sur 4). */
const Rating: React.FC<{label: string; v: number; color: string}> = ({label, v, color}) => (
  <div style={{width: 820, display: 'flex', alignItems: 'center', gap: 20, background: '#fff', borderRadius: 24, padding: '16px 24px', boxShadow: '0 12px 26px rgba(14,30,60,0.14)'}}>
    <div style={{width: 230, fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: colors.navy}}>{label}</div>
    <div style={{flex: 1, display: 'flex', gap: 10}}>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{flex: 1, height: 46, borderRadius: 12, background: i < Math.round(v) ? color : '#E3DED1', transform: `scaleY(${i < Math.round(v) ? 1 : 0.8})`}} />
      ))}
    </div>
    <div style={{width: 90, textAlign: 'right', fontFamily: sansFont, fontWeight: 900, fontSize: 44, color}}>{Math.round(v)}/4</div>
  </div>
);

/** Matrice 4×4 gravité × probabilité avec la cellule courante. */
const Matrix: React.FC<{g: number; p: number; at: number}> = ({g, p, at}) => {
  const t = useT();
  const C = 120;
  return (
    <div style={{position: 'relative', width: C * 4, height: C * 4}}>
      {Array.from({length: 16}).map((_, i) => {
        const gi = i % 4;
        const pi = 3 - Math.floor(i / 4);
        const v = (gi + 1) * (pi + 1);
        const k = prog(t, at + (gi + 3 - pi) * 0.05, at + (gi + 3 - pi) * 0.05 + 0.35, easeOut);
        return <div key={i} style={{position: 'absolute', left: gi * C + 5, top: (3 - pi) * C + 5, width: C - 10, height: C - 10, borderRadius: 14, background: levelColor(v), opacity: 0.25 + 0.35 * k, transform: `scale(${k})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: '#fff'}}>{v}</div>;
      })}
      <div style={{position: 'absolute', left: (g - 1) * C, top: (4 - p) * C, width: C, height: C, borderRadius: 18, border: '8px solid #fff', background: levelColor(Math.round(g) * Math.round(p)), boxShadow: '0 10px 24px rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: '#fff', opacity: prog(t, at + 0.6, at + 0.9)}}>{Math.round(g) * Math.round(p)}</div>
      <div style={{position: 'absolute', left: -70, top: C * 2, transform: 'translate(-50%, -50%) rotate(-90deg)', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: colors.navy, letterSpacing: 2, whiteSpace: 'nowrap'}}>PROBABILITÉ ↑</div>
      <div style={{position: 'absolute', left: C * 2, top: C * 4 + 30, transform: 'translateX(-50%)', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: colors.navy, letterSpacing: 2, whiteSpace: 'nowrap'}}>GRAVITÉ →</div>
    </div>
  );
};

/** Carte de définition. */
const Def: React.FC<{title: string; text: string; color: string; icon: string}> = ({title, text, color, icon}) => (
  <div style={{width: 900, background: '#fff', borderRadius: 34, padding: '30px 36px', boxShadow: '0 18px 36px rgba(14,30,60,0.18)', borderLeft: `18px solid ${color}`, display: 'flex', alignItems: 'center', gap: 26}}>
    <F n={icon} size={150} />
    <div>
      <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 52, color, textTransform: 'uppercase', letterSpacing: -1}}>{title}</div>
      <div style={{fontFamily: handFont, fontSize: 46, color: colors.navy, lineHeight: 1.1, marginTop: 6}}>{text}</div>
    </div>
  </div>
);

const Scenes: React.FC = () => {
  const t = useT();
  const p = kf(t, [45.9, 47.6], [4, 1]);
  const score = Math.round(kf(t, [52.4, 55.6], [16, 4]));
  const crit = Math.round(kf(t, [26.0, 27.4], [0, 16]));
  return (
    <>
      <Kinetic text="Risque *brut*" at={0.1} until={2.2} y={420} size={100} accent={RED} />
      <Kinetic text="Risque *réel*" at={2.25} until={4.6} y={420} size={100} accent={GREEN} />
      <Kinetic text="Quelle *différence* ?" at={4.65} until={10.7} y={420} size={90} maxWidth={1000} />
      <Kinetic text="Aucune *protection*" at={10.75} until={15.6} y={420} size={88} accent={RED} maxWidth={1000} />
      <Kinetic text="Le risque *brut*" at={15.65} until={21.85} y={420} size={92} accent={RED} />
      <Kinetic text="Criticité *maximale*" at={21.9} until={28.0} y={420} size={86} accent={RED} maxWidth={1000} />
      <Kinetic text="Cibler la *probabilité*" at={28.05} until={35.45} y={420} size={84} accent={AMBER} maxWidth={1000} />
      <Kinetic text="Les mesures de *prévention*" at={35.5} until={39.25} y={420} size={76} accent={GREEN} maxWidth={1000} />
      <Kinetic text="Le risque *réel*" at={39.3} until={45.65} y={420} size={92} accent={GREEN} />
      <Kinetic text="Nouveau score : *4*" at={45.7} until={49.2} y={420} size={90} accent={GREEN} maxWidth={1000} />
      <Kinetic text="De *16* à *4*" at={49.25} until={57.0} y={420} size={100} accent={GREEN} />
      <Kinetic text="Retenez *ceci*" at={57.05} until={67.5} y={420} size={96} />
      <Kinetic text="Un risque *maîtrisé*" at={67.55} until={OUTRO_AT} y={420} size={90} accent={GREEN} maxWidth={1000} />

      <Win a={0.1} b={4.6}>
        <PhotoCard src={img('technicien-sans-protection')} at={0.2} x={540} y={850} w={940} h={510} label="Risque brut" icon="danger" from="left" rotate={-1.5} />
        <PhotoCard src={img('technicien-harnais')} at={2.3} x={540} y={1340} w={940} h={420} pos="50% 30%" label="Risque réel" icon="check" from="right" rotate={1.5} />
      </Win>

      <Win a={4.65} b={10.7}>
        <CineShot src={img('chantier')} at={4.7} until={10.7} move="up" pos="50% 45%" y={960} h={760} label="Chiffrer l'écart" grade="none" />
        <Enter at={6.9} x={540} y={1430} bouncy>
          <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
            <Pill label="Brut" icon="danger" color={RED} size={32} />
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: colors.navy}}>↔</div>
            <Pill label="Réel" icon="check" color={GREEN} size={32} />
          </div>
        </Enter>
      </Win>

      <Win a={10.75} b={15.6}>
        <CineShot src={img('technicien-sans-protection')} at={10.8} until={15.6} move="push" pos="55% 50%" y={950} h={620} grade="alert" />
        <Highlight at={13.0} until={15.6} x={560} y={900} r={110} color={RED} label="sans protection" />
        <Enter at={14.2} x={540} y={1400} bouncy><Pill label="Échafaudage, aucune protection" icon="danger" color={RED} size={30} /></Enter>
      </Win>

      <Win a={15.65} b={21.85}>
        <Enter at={15.9} x={540} y={900} from="left" dist={-300}><Def title="Risque brut" text="le niveau de risque auquel on est exposé avant toute prévention" color={RED} icon="danger" /></Enter>
        <Enter at={19.4} x={540} y={1250} bouncy><Note text="AVANT les mesures" color={RED} size={64} /></Enter>
      </Win>

      <Win a={21.9} b={28.0}>
        <Enter at={22.0} x={540} y={640} from="left" dist={-260}><Rating label="Gravité" v={4} color={RED} /></Enter>
        <Enter at={22.5} x={540} y={760} from="left" dist={-260}><Rating label="Probabilité" v={4} color={RED} /></Enter>
        <div style={{position: 'absolute', left: 540, top: 1140, transform: 'translate(-50%, -50%)', opacity: prog(t, 23.4, 23.8)}}><Matrix g={4} p={4} at={23.4} /></div>
        {t > 26.0 && <div style={{position: 'absolute', left: 350, top: 1470, transform: 'translate(-50%, -50%)', fontFamily: sansFont, fontWeight: 900, fontSize: 80, color: RED, whiteSpace: 'nowrap'}}>4 × 4 = {crit}</div>}
        {t > 27.4 && <div style={{position: 'absolute', left: 830, top: 1470, transform: 'translate(-50%, -50%)'}}><Stamp text="TRÈS ÉLEVÉE" p={prog(t, 27.4, 27.7)} color={RED} size={44} /></div>}
      </Win>

      <Win a={28.05} b={35.45}>
        <CineShot src={img('plateforme-criticite')} at={28.1} until={35.45} move="down" pos="50% 30%" y={900} h={720} grade="alert" />
        <Enter at={30.2} x={300} y={1370} bouncy><Pill label="Gravité : constante" icon="cadenas" color={RED} size={30} /></Enter>
        <Enter at={33.4} x={790} y={1370} bouncy><Pill label="Probabilité : à réduire" icon="cible" color={AMBER} size={30} /></Enter>
        {t > 33.6 && <div style={{position: 'absolute', left: 790, top: 1250 + 40 * Math.sin(t * 5), transform: 'translate(-50%, -50%)', fontFamily: sansFont, fontWeight: 900, fontSize: 80, color: AMBER}}>↓</div>}
      </Win>

      <Win a={35.5} b={39.25}>
        <CineShot src={img('etat-conforme')} at={35.55} until={39.25} move="push" pos="50% 55%" y={900} h={720} grade="none" />
        {[
          ['Garde-corps', 'barriere', 36.6, 230],
          ['Harnais', 'cadenas', 37.1, 540],
          ['Formation', 'formatrice', 37.6, 850],
        ].map(([l, ic, at, x]) => <Enter key={l as string} at={at as number} x={x as number} y={1380} bouncy><Pill label={l as string} icon={ic as string} color={GREEN} size={28} /></Enter>)}
      </Win>

      <Win a={39.3} b={45.65}>
        <Enter at={39.5} x={540} y={900} from="right" dist={300}><Def title="Risque réel (résiduel)" text="le risque qui reste après la mise en place des mesures de prévention" color={GREEN} icon="bouclier" /></Enter>
        <Enter at={42.8} x={540} y={1250} bouncy><Note text="APRÈS les mesures" color={GREEN} size={64} /></Enter>
      </Win>

      <Win a={45.7} b={49.2}>
        <Enter at={45.8} x={540} y={640} bouncy><Rating label="Gravité" v={4} color={RED} /></Enter>
        <Enter at={45.9} x={540} y={760} bouncy><Rating label="Probabilité" v={p} color={levelColor(p * 4)} /></Enter>
        <div style={{position: 'absolute', left: 540, top: 1140, transform: 'translate(-50%, -50%)'}}><Matrix g={4} p={p} at={45.7} /></div>
        {t > 47.7 && <div style={{position: 'absolute', left: 350, top: 1470, transform: 'translate(-50%, -50%)', fontFamily: sansFont, fontWeight: 900, fontSize: 80, color: GREEN, whiteSpace: 'nowrap'}}>4 × 1 = 4</div>}
        {t > 48.4 && <div style={{position: 'absolute', left: 830, top: 1470, transform: 'translate(-50%, -50%)'}}><Stamp text="FAIBLE" p={prog(t, 48.4, 48.7)} color={GREEN} size={50} /></div>}
      </Win>

      <Win a={49.25} b={57.0}>
        <Enter at={50.6} x={540} y={720} bouncy>
          <div style={{width: 420, background: '#fff', borderRadius: 30, padding: '20px 0', textAlign: 'center', boxShadow: '0 14px 30px rgba(14,30,60,0.16)', borderTop: `14px solid ${RED}`}}>
            <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: '#7A8594', letterSpacing: 2}}>RISQUE BRUT</div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 130, color: RED, lineHeight: 1}}>16</div>
          </div>
        </Enter>
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
          <line x1={540} y1={860} x2={540} y2={860 + 300 * prog(t, 52.4, 53.4, easeInOut)} stroke={colors.navy} strokeWidth={10} strokeDasharray="18 12" />
        </svg>
        <Enter at={53.2} x={540} y={1010} bouncy><Pill label="Mesures de prévention" icon="bouclier" color={GREEN} size={30} /></Enter>
        {t > 54.6 && (
          <Enter at={54.7} x={540} y={1300} bouncy>
            <div style={{width: 420, background: '#fff', borderRadius: 30, padding: '20px 0', textAlign: 'center', boxShadow: '0 14px 30px rgba(14,30,60,0.16)', borderTop: `14px solid ${levelColor(score)}`}}>
              <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: '#7A8594', letterSpacing: 2}}>RISQUE RÉSIDUEL</div>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 130, color: levelColor(score), lineHeight: 1}}>{score}</div>
            </div>
          </Enter>
        )}
        {t > 55.8 && <div style={{position: 'absolute', left: 860, top: 1180, transform: 'translate(-50%, -50%)'}}><Stamp text="÷ 4" p={prog(t, 55.8, 56.1)} color={GREEN} size={60} /></div>}
      </Win>

      <Win a={57.05} b={67.5}>
        {[
          {at: 58.1, title: 'Risque brut', text: 'avant prévention', c: RED, icon: 'danger', y: 820},
          {at: 62.0, title: 'Risque réel', text: 'ce qui reste après prévention', c: GREEN, icon: 'bouclier', y: 1180},
        ].map((d) => (
          <Enter key={d.title} at={d.at} x={540} y={d.y} from={d.c === RED ? 'left' : 'right'} dist={d.c === RED ? -300 : 300}><Def title={d.title} text={d.text} color={d.c} icon={d.icon} /></Enter>
        ))}
        <Enter at={60.5} x={540} y={1000} bouncy><Op c="→" color={colors.navy} size={80} /></Enter>
      </Win>

      <Win a={67.55} b={OUTRO_AT + 0.3}>
        <CineShot src={img('technicien-harnais')} at={67.6} until={OUTRO_AT + 0.3} move="pull" pos="50% 30%" y={940} h={800} grade="warm" label="Mission accomplie sereinement" />
        {t > 73.4 && <div style={{position: 'absolute', left: 540, top: 1440, transform: 'translate(-50%, -50%)'}}><Stamp text="RISQUE MAÎTRISÉ" p={prog(t, 73.4, 73.7)} color={GREEN} size={56} /></div>}
      </Win>
    </>
  );
};

/** Sound design (bruitages seuls, ni musique ni son de fond). */
const CUES: Sfx[] = [
  {at: 0.2, s: 'soft-whoosh', v: 0.5},
  {at: 0.25, s: 'bass-hit', v: 0.5},
  {at: 2.3, s: 'soft-whoosh', v: 0.5},
  {at: 2.35, s: 'validation', v: 0.45},
  {at: 4.7, s: 'soft-whoosh', v: 0.45},
  {at: 6.9, s: 'sfx/pop', v: 0.5},
  {at: 9.5, s: 'tension', v: 0.32, dur: 1.4},
  {at: 10.8, s: 'soft-whoosh', v: 0.45},
  {at: 13.0, s: 'alarme', v: 0.28, dur: 1.6},
  {at: 15.9, s: 'page', v: 0.5},
  {at: 19.4, s: 'tick', v: 0.55},
  {at: 22.0, s: 'tick', v: 0.55},
  {at: 22.5, s: 'tick', v: 0.55},
  ...Array.from({length: 7}, (_, i) => ({at: 23.4 + i * 0.05 * 2, s: 'tick', v: 0.4})),
  {at: 26.0, s: 'riser', v: 0.4, dur: 1.4},
  {at: 27.4, s: 'tampon', v: 0.75},
  {at: 27.42, s: 'deep-hit', v: 0.55},
  {at: 28.1, s: 'soft-whoosh', v: 0.45},
  {at: 30.2, s: 'cadenas', v: 0.55},
  {at: 33.4, s: 'sfx/pop', v: 0.5},
  {at: 35.55, s: 'soft-whoosh', v: 0.45},
  {at: 36.6, s: 'validation', v: 0.5},
  {at: 37.1, s: 'validation', v: 0.5},
  {at: 37.6, s: 'validation', v: 0.5},
  {at: 39.5, s: 'page', v: 0.5},
  {at: 42.8, s: 'tick', v: 0.55},
  {at: 45.9, s: 'sfx/whoosh', v: 0.45},
  {at: 47.6, s: 'sfx/ding', v: 0.5},
  {at: 48.4, s: 'tampon', v: 0.7},
  {at: 50.6, s: 'bass-hit', v: 0.5},
  {at: 52.4, s: 'sfx/swish', v: 0.45},
  {at: 53.2, s: 'sfx/pop', v: 0.5},
  ...Array.from({length: 6}, (_, i) => ({at: 54.7 + i * 0.15, s: 'tick', v: 0.45})),
  {at: 55.8, s: 'tampon', v: 0.7},
  {at: 58.1, s: 'soft-whoosh', v: 0.45},
  {at: 60.5, s: 'sfx/pop', v: 0.45},
  {at: 62.0, s: 'soft-whoosh', v: 0.45},
  {at: 67.6, s: 'soft-whoosh', v: 0.45},
  {at: 73.4, s: 'tampon', v: 0.7},
  {at: 73.45, s: 'validation', v: 0.5},
  {at: OUTRO_AT - 0.4, s: 'soft-whoosh', v: 0.5},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const RisqueBrut: React.FC = () => (
  <AbsoluteFill>
    <Camera shakes={[27.4, 55.8]}>
      <Background />
      <Gate from={0} to={OUTRO_AT}><Scenes /></Gate>
      <Gate from={OUTRO_AT} to={999}><Outro at={OUTRO_AT} logo={LOGO} /></Gate>
    </Camera>
    <Header hideAt={OUTRO_AT} logo={LOGO} />
    <Footer hideAt={OUTRO_AT} />
    <Wipe at={15.65} />
    <Wipe at={39.3} />
    <Wipe at={57.05} />
    <Wipe at={OUTRO_AT} />
    <Flash at={27.4} />
    <Captions captions={captions} />
    <Audio src={staticFile('voix-off-risque-brut.m4a')} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

