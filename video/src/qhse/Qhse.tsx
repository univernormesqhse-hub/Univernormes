import {AbsoluteFill, Audio, interpolate, staticFile} from 'remotion';
import {easeIn, easeInOut, easeOut, Enter, Gate, Kinetic, prog, useSpring, useT} from '../anim';
import {PhotoCard, RED} from '../charte/ui';
import {Background} from '../components/Background';
import {Captions} from '../components/Captions';
import {Footer} from '../components/Footer';
import {Camera, Cue, SfxTrack, Wipe} from '../components/Fx';
import {Header} from '../components/Header';
import {F, Pill} from '../iso/ui';
import {Outro} from '../scenes/Outro';
import {colors, handFont, s, sansFont} from '../theme';
import {captions} from './captions';

const LOGO = 'promo/logo.png';
const OUTRO_AT = 70.1;
export const QHSE_FRAMES = s(73.3);
const fade = (t: number, a: number, b: number) => (1 - prog(t, b - 0.3, b, easeIn)) * (t >= a ? 1 : 0);

/** Les quatre piliers : lettre, libellé, illustration, couleur. */
const PIL = {
  Q: {label: 'Qualité', icon: 'medaille', c: '#2F5AA8'},
  H: {label: 'Hygiène', icon: 'savon', c: '#D9A23A'},
  S: {label: 'Sécurité', icon: 'casque', c: '#E8772E'},
  E: {label: 'Environnement', icon: 'feuille', c: colors.green},
};
type L = keyof typeof PIL;

/** Tuile-lettre d'un pilier. */
const Tile: React.FC<{l: L; w?: number; dim?: number; glow?: number; caption?: boolean}> = ({l, w = 220, dim = 0, glow = 0, caption = true}) => {
  const p = PIL[l];
  return (
    <div style={{width: w, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, filter: dim ? `grayscale(${dim})` : undefined, opacity: 1 - dim * 0.55}}>
      <div style={{width: w, height: w * 1.12, borderRadius: w * 0.16, background: p.c, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: `0 18px 36px rgba(14,30,60,0.25), 0 0 ${glow * 50}px ${glow * 14}px ${p.c}`, border: '6px solid #fff'}}>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: w * 0.5, color: '#fff', lineHeight: 1}}>{l}</div>
        <F n={p.icon} size={w * 0.36} />
      </div>
      {caption && <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: Math.max(24, w * 0.13), color: colors.navy, whiteSpace: 'nowrap'}}>{p.label}</div>}
    </div>
  );
};

/** Mot-sigle en blocs de lettres (QSE, HSE, QHSE). */
const Acro: React.FC<{word: string; w?: number}> = ({word, w = 130}) => (
  <div style={{display: 'flex', gap: 10}}>
    {word.split('').map((ch, i) => (
      <div key={i} style={{width: w, height: w * 1.1, borderRadius: w * 0.18, background: PIL[ch as L].c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: w * 0.62, color: '#fff', border: '5px solid #fff', boxShadow: '0 10px 22px rgba(14,30,60,0.2)'}}>{ch}</div>
    ))}
  </div>
);

/** 0 – 16,3 s : QSE, HSE, QHSE… une seule lettre change la stratégie. */
const Hook: React.FC = () => {
  const t = useT();
  const mix = prog(t, 4.7, 6.6, easeInOut) * (1 - prog(t, 7.2, 8.0, easeInOut));
  const hIn = prog(t, 9.7, 10.4, easeOut) * (1 - prog(t, 11.6, 12.3, easeIn)) + prog(t, 12.6, 13.2, easeOut);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - prog(t, 16.0, 16.3, easeIn)}}>
      <Kinetic text="QSE, HSE, *QHSE*…" at={0.05} until={4.55} y={420} size={92} />
      <Kinetic text="On finit par les *confondre*" at={4.6} until={8.1} y={420} size={72} maxWidth={1000} accent={RED} />
      <Kinetic text="Une *lettre* change tout" at={8.15} until={14.35} y={420} size={78} maxWidth={1000} />
      <Kinetic text="*Décryptons* !" at={14.4} until={16.2} y={420} size={100} />

      {t < 8.15 && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 0, 8.15)}}>
          {[
            {w: 'QSE', at: 0.05, y: 760},
            {w: 'HSE', at: 1.46, y: 1010},
            {w: 'QHSE', at: 2.7, y: 1260},
          ].map((a, i) => (
            <div key={a.w} style={{position: 'absolute', left: 540 + Math.sin(t * 3 + i * 2) * 120 * mix, top: a.y + Math.cos(t * 2.6 + i) * 110 * mix, transform: `translate(-50%, -50%) rotate(${Math.sin(t * 2 + i) * 10 * mix}deg)`}}>
              <Enter at={a.at} x={0} y={0} from="left" dist={-600} bouncy><Acro word={a.w} /></Enter>
            </div>
          ))}
          <Enter at={6.0} until={8.1} x={860} y={620} bouncy rotate={Math.sin(t * 4) * 8}><F n="pensif" size={150} /></Enter>
        </div>
      )}
      {t >= 8.15 && t < 14.4 && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 8.15, 14.4)}}>
          <div style={{position: 'absolute', left: 540, top: 980, transform: 'translate(-50%, -50%)', display: 'flex', gap: 10, alignItems: 'center'}}>
            {(['Q', 'H', 'S', 'E'] as L[]).map((l) => {
              const isH = l === 'H';
              const w = 160;
              return (
                <div key={l} style={{width: isH ? (w + 10) * hIn : w + 0, overflow: 'visible', display: 'flex', justifyContent: 'center', transform: isH ? `translateY(${(1 - hIn) * -260}px) scale(${0.4 + 0.6 * hIn})` : undefined, opacity: isH ? hIn : 1}}>
                  <div style={{width: w, height: w * 1.1, borderRadius: 28, background: PIL[l].c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 100, color: '#fff', border: '6px solid #fff', boxShadow: isH ? `0 0 ${40 * hIn}px ${12 * hIn}px rgba(217,162,58,0.6)` : '0 10px 22px rgba(14,30,60,0.2)', flexShrink: 0}}>{l}</div>
                </div>
              );
            })}
          </div>
          <Enter at={9.2} x={300} y={1300} bouncy><Pill label="Enlever" icon="ciseaux" color={RED} size={34} /></Enter>
          <Enter at={9.8} x={790} y={1300} bouncy><Pill label="Ajouter" icon="check" size={34} /></Enter>
          <Enter at={11.2} x={540} y={1480} bouncy><Pill label="La vraie stratégie de l'entreprise" icon="cible" size={32} /></Enter>
        </div>
      )}
      {t >= 14.4 && <Enter at={14.45} x={540} y={1020} bouncy rotate={Math.sin(t * 3) * 6}><F n="loupe" size={340} float={8} /></Enter>}
    </div>
  );
};

/** Disposition horizontale de tuiles. */
const Row: React.FC<{ls: L[]; y: number; w: number; at: number; dims?: Partial<Record<L, number>>; glows?: Partial<Record<L, number>>; caption?: boolean}> = ({ls, y, w, at, dims = {}, glows = {}, caption}) => (
  <>
    {ls.map((l, i) => {
      const gap = w + 40;
      const x = 540 + (i - (ls.length - 1) / 2) * gap;
      return (
        <Enter key={l} at={at + i * 0.18} x={x} y={y} bouncy>
          <Tile l={l} w={w} dim={dims[l]} glow={glows[l]} caption={caption} />
        </Enter>
      );
    })}
  </>
);

/** 16,3 – 27,4 s : le modèle QSE, l'hygiène absorbée par la sécurité. */
const ModeleQSE: React.FC = () => {
  const t = useT();
  const absorb = prog(t, 20.8, 21.9, easeInOut);
  const btp = t >= 23.0;
  return (
    <div style={{position: 'absolute', inset: 0, opacity: prog(t, 16.3, 16.6) * (1 - prog(t, 27.1, 27.4, easeIn))}}>
      <Kinetic text="Modèle *QSE*" at={16.3} until={18.75} y={420} size={104} />
      <Kinetic text="L'hygiène *absorbée*" at={18.8} until={22.95} y={420} size={82} maxWidth={1000} accent={PIL.H.c} />
      <Kinetic text="BTP & industrie *lourde*" at={23.0} until={27.3} y={420} size={74} maxWidth={1000} />

      {!btp && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 16.3, 23.0)}}>
          <Row ls={['Q', 'S', 'E']} y={980} w={260} at={16.4} glows={{S: absorb * (1 - prog(t, 22.2, 22.9))}} />
          {t > 18.8 && (
            <div style={{position: 'absolute', left: interpolate(absorb, [0, 1], [540, 540]), top: interpolate(absorb, [0, 1], [1460, 960]), transform: `translate(-50%, -50%) scale(${interpolate(absorb, [0, 1], [1, 0.2])})`, opacity: prog(t, 18.9, 19.3) * (1 - prog(t, 21.6, 21.9))}}>
              <Tile l="H" w={200} />
            </div>
          )}
          <Enter at={19.7} until={20.7} x={820} y={1460} bouncy><div style={{fontFamily: handFont, fontSize: 56, color: colors.navy}}>pas disparue…</div></Enter>
          <Enter at={21.9} x={540} y={1460} bouncy><Pill label="Hygiène intégrée à la Sécurité" icon="savon" color={PIL.S.c} size={32} /></Enter>
        </div>
      )}
      {btp && (
        <>
          <PhotoCard src="epi/soudeur.jpg" at={23.05} x={540} y={940} w={940} h={680} pos="35% 40%" label="Chantier BTP" icon="grue" />
          <Enter at={24.6} x={300} y={1400} bouncy><Acro word="QSE" w={90} /></Enter>
          <Enter at={26.5} x={760} y={1400} bouncy><Pill label="Risques physiques d'abord" icon="danger" color={PIL.S.c} size={30} /></Enter>
        </>
      )}
    </div>
  );
};

/** 27,4 – 43,4 s : l'approche HSE, la qualité gérée à part. */
const ApprocheHSE: React.FC = () => {
  const t = useT();
  const out = prog(t, 31.6, 32.6, easeInOut);
  const prot = t >= 38.0;
  return (
    <div style={{position: 'absolute', inset: 0, opacity: prog(t, 27.4, 27.7) * (1 - prog(t, 43.1, 43.4, easeIn))}}>
      <Kinetic text="Approche *HSE*" at={27.45} until={31.2} y={420} size={100} />
      <Kinetic text="La qualité *écartée* ?" at={31.25} until={33.1} y={420} size={82} maxWidth={1000} accent={PIL.Q.c} />
      <Kinetic text="Un département *indépendant*" at={33.15} until={37.95} y={420} size={70} maxWidth={1000} accent={PIL.Q.c} />
      <Kinetic text="Équipes & *environnement*" at={38.0} until={43.3} y={420} size={74} maxWidth={1000} />

      {!prot && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 27.4, 38.0)}}>
          <Row ls={['H', 'S', 'E']} y={880} w={240} at={27.5} />
          {t > 30.0 && (
            <div style={{position: 'absolute', left: interpolate(out, [0, 1], [540, 540]), top: interpolate(out, [0, 1], [1260, 1360]), transform: 'translate(-50%, -50%)', opacity: prog(t, 30.0, 30.4)}}>
              <div style={{position: 'relative', padding: out > 0.5 ? '26px 40px' : 0, borderRadius: 30, border: `5px dashed ${out > 0.5 ? PIL.Q.c : 'transparent'}`, display: 'flex', alignItems: 'center', gap: 26, background: out > 0.5 ? 'rgba(255,255,255,0.7)' : 'transparent'}}>
                <Tile l="Q" w={170} caption={false} />
                {t > 33.2 && (
                  <div style={{fontFamily: sansFont, opacity: prog(t, 33.3, 33.8)}}>
                    <div style={{fontWeight: 900, fontSize: 38, color: PIL.Q.c}}>Service Qualité</div>
                    <div style={{fontWeight: 700, fontSize: 30, color: colors.navy}}>totalement indépendant</div>
                  </div>
                )}
              </div>
            </div>
          )}
          <Enter at={33.4} until={34.9} x={840} y={1080} bouncy><Pill label="Pas un oubli" icon="check" size={30} /></Enter>
        </div>
      )}
      {prot && (
        <>
          <PhotoCard src="promo/terrain-controle.jpg" at={38.05} x={540} y={900} w={940} h={600} pos="55% 35%" label="Protection des équipes" icon="equipe" />
          <Enter at={40.6} x={300} y={1340} bouncy><Pill label="Équipes" icon="casque" color={PIL.S.c} size={34} /></Enter>
          <Enter at={41.8} x={780} y={1340} bouncy><Pill label="Environnement" icon="feuille" size={34} /></Enter>
          <Enter at={39.0} x={540} y={1500} bouncy><Acro word="HSE" w={90} /></Enter>
        </>
      )}
    </div>
  );
};

/** 43,4 – 59,8 s : la norme intégrale QHSE, l'hygiène pilier autonome. */
const NormeQHSE: React.FC = () => {
  const t = useT();
  const hGlow = prog(t, 46.8, 47.6) * (1 - prog(t, 49.8, 50.4) * 0.5);
  const risk = t >= 54.4;
  const sectors = [
    {at: 51.9, n: 'epi-ble', l: 'Agroalimentaire'},
    {at: 52.7, n: 'eprouvette', l: 'Chimie'},
    {at: 53.4, n: 'stethoscope', l: 'Santé'},
  ];
  return (
    <div style={{position: 'absolute', inset: 0, opacity: prog(t, 43.4, 43.7) * (1 - prog(t, 59.5, 59.8, easeIn))}}>
      <Kinetic text="La norme *intégrale*" at={43.45} until={46.75} y={420} size={86} maxWidth={1000} />
      <Kinetic text="Le *H* devient pilier" at={46.8} until={50.45} y={420} size={86} maxWidth={1000} accent={PIL.H.c} />
      <Kinetic text="Des secteurs *sensibles*" at={50.5} until={54.35} y={420} size={78} maxWidth={1000} />
      <Kinetic text="La moindre *faille*…" at={54.4} until={59.7} y={420} size={88} maxWidth={1000} accent={RED} />

      {!risk && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 43.4, 54.4)}}>
          <Row ls={['Q', 'H', 'S', 'E']} y={t < 50.5 ? 1000 : 820} w={200} at={43.5} glows={{H: hGlow}} />
          <Enter at={48.5} until={50.4} x={540} y={1400} bouncy><Pill label="Pilier totalement autonome" icon="savon" color={PIL.H.c} size={34} /></Enter>
          {sectors.map((sc, i) => (
            <Enter key={sc.l} at={sc.at} x={[230, 540, 850][i]} y={1300} bouncy>
              <div style={{width: 270, padding: '20px 0', borderRadius: 30, background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, boxShadow: '0 14px 30px rgba(30,25,10,0.16)', borderBottom: `10px solid ${PIL.H.c}`}}>
                <F n={sc.n} size={120} />
                <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: colors.navy}}>{sc.l}</div>
              </div>
            </Enter>
          ))}
        </div>
      )}
      {risk && (
        <>
          <Enter at={54.45} x={540} y={960} bouncy>
            <div style={{position: 'relative', width: 520, height: 520, borderRadius: '50%', background: '#fff', border: `12px solid ${RED}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 0 ${16 + Math.sin(t * 5) * 8}px rgba(200,64,47,0.18)`}}>
              <F n="microbe" size={300} float={10} />
            </div>
          </Enter>
          <Enter at={56.4} x={300} y={1380} bouncy><Pill label="Faille sanitaire" icon="danger" color={RED} size={34} /></Enter>
          <Enter at={57.6} x={790} y={1380} bouncy><Pill label="Conséquences dramatiques" icon="crane" color={RED} size={30} /></Enter>
        </>
      )}
    </div>
  );
};

/** 59,8 – 70,1 s : peu importe le sigle, la mission reste la même. */
const Mission: React.FC = () => {
  const t = useT();
  const merge = prog(t, 63.6, 64.8, easeInOut);
  const shield = useSpring(65.7, {damping: 10});
  return (
    <div style={{position: 'absolute', inset: 0, opacity: prog(t, 59.8, 60.1) * (1 - prog(t, 69.8, 70.1, easeIn))}}>
      <Kinetic text="Peu importe le *sigle*" at={59.85} until={63.95} y={420} size={82} maxWidth={1000} />
      <Kinetic text="La *mission* reste la même" at={64.0} until={65.6} y={420} size={74} maxWidth={1000} />
      <Kinetic text="Maîtriser les *dangers*" at={65.65} until={70.0} y={420} size={80} maxWidth={1000} />

      {t < 65.7 &&
        [
          {w: 'QSE', x: 540, y: 760},
          {w: 'HSE', x: 540, y: 1000},
          {w: 'QHSE', x: 540, y: 1240},
        ].map((a, i) => (
          <div key={a.w} style={{position: 'absolute', left: a.x, top: interpolate(merge, [0, 1], [a.y, 1000]), transform: `translate(-50%, -50%) scale(${1 - merge * 0.6})`, opacity: 1 - merge}}>
            <Enter at={60.0 + i * 0.25} x={0} y={0} bouncy><Acro word={a.w} w={120} /></Enter>
          </div>
        ))}
      {t >= 60.8 && t < 65.7 && <Enter at={60.9} until={63.5} x={860} y={1420} bouncy><F n="usine" size={140} /></Enter>}
      {t >= 64.0 && t < 65.7 && (
        <Enter at={64.1} x={540} y={1000} bouncy><div style={{width: 200, height: 200, borderRadius: '50%', background: colors.navy, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 110, color: '#fff'}}>=</div></Enter>
      )}
      {t >= 65.7 && (
        <>
          <PhotoCard src="induction/accueil-groupe.jpg" at={65.75} x={540} y={900} w={940} h={600} pos="50% 50%" label="Un environnement de travail sûr" icon="equipe" />
          <div style={{position: 'absolute', left: 860, top: 640, transform: `translate(-50%, -50%) scale(${shield})`}}>
            <div style={{width: 190, height: 190, borderRadius: '50%', background: colors.green, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '8px solid #fff', boxShadow: '0 14px 30px rgba(46,155,62,0.4)'}}><F n="bouclier" size={120} /></div>
          </div>
          <Enter at={67.5} x={300} y={1340} bouncy><Pill label="Sûr" icon="check" size={40} /></Enter>
          <Enter at={69.0} x={760} y={1340} bouncy><Pill label="Responsable" icon="feuille" size={40} /></Enter>
        </>
      )}
    </div>
  );
};

const CUES: Cue[] = [
  {at: 0.05, sfx: 'pop', volume: 0.3},
  {at: 1.46, sfx: 'pop', volume: 0.3},
  {at: 2.7, sfx: 'pop', volume: 0.3},
  {at: 4.7, sfx: 'swish', volume: 0.3},
  {at: 9.7, sfx: 'pop', volume: 0.3},
  {at: 11.6, sfx: 'swish', volume: 0.3},
  {at: 12.6, sfx: 'ding', volume: 0.3},
  {at: 16.0, sfx: 'whoosh', volume: 0.4},
  {at: 20.8, sfx: 'swish', volume: 0.3},
  {at: 21.9, sfx: 'ding', volume: 0.3},
  {at: 23.05, sfx: 'whoosh', volume: 0.3},
  {at: 27.1, sfx: 'whoosh', volume: 0.4},
  {at: 31.6, sfx: 'swish', volume: 0.3},
  {at: 38.05, sfx: 'whoosh', volume: 0.3},
  {at: 43.1, sfx: 'whoosh', volume: 0.4},
  {at: 46.8, sfx: 'rise', volume: 0.25},
  ...[51.9, 52.7, 53.4].map((at) => ({at, sfx: 'pop', volume: 0.3})),
  {at: 54.45, sfx: 'thud', volume: 0.45},
  {at: 59.5, sfx: 'whoosh', volume: 0.4},
  {at: 63.6, sfx: 'swish', volume: 0.3},
  {at: 65.7, sfx: 'ding', volume: 0.35},
  {at: OUTRO_AT - 0.35, sfx: 'whoosh', volume: 0.4},
  {at: OUTRO_AT + 1.4, sfx: 'pop', volume: 0.3},
];

export const QseQhse: React.FC = () => (
  <AbsoluteFill>
    <Camera shakes={[54.45]}>
      <Background />
      <Gate from={0} to={16.3}><Hook /></Gate>
      <Gate from={16.3} to={27.4}><ModeleQSE /></Gate>
      <Gate from={27.4} to={43.4}><ApprocheHSE /></Gate>
      <Gate from={43.4} to={59.8}><NormeQHSE /></Gate>
      <Gate from={59.8} to={OUTRO_AT}><Mission /></Gate>
      <Gate from={OUTRO_AT} to={999}><Outro at={OUTRO_AT} logo={LOGO} /></Gate>
    </Camera>
    <Header hideAt={OUTRO_AT} logo={LOGO} />
    <Footer hideAt={OUTRO_AT} />
    {[16.3, 27.4, 43.4, 59.8, OUTRO_AT].map((at) => <Wipe key={at} at={at} />)}
    <Captions captions={captions} />
    {/* Voix off seule : pas de musique de fond (demande du client). */}
    <Audio src={staticFile('voix-off-qse-qhse.m4a')} />
    <SfxTrack cues={CUES} />
  </AbsoluteFill>
);
