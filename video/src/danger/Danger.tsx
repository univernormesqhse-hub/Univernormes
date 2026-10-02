import {AbsoluteFill, Audio, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {easeIn, easeInOut, easeOut, Enter, Gate, kf, Kinetic, prog, Underline, useSpring, useT} from '../anim';
import {Background} from '../components/Background';
import {Captions} from '../components/Captions';
import {Footer} from '../components/Footer';
import {AlertVignette, Camera, Cue, SfxTrack, Wipe} from '../components/Fx';
import {Header} from '../components/Header';
import {Cross} from '../components/Icons';
import {F, Pill, Tile} from '../iso/ui';
import {Outro} from '../scenes/Outro';
import {colors, s, sansFont} from '../theme';
import {captions} from './captions';

const LOGO = 'promo/logo.png';
const OUTRO_AT = 54.9;
export const DANGER_FRAMES = s(57.8);
const WIPES = [9.8, 35.1, 50.1];
const RED = '#D9443A';
const AMBER = '#E89B1C';

/** Photo de la banque d'images dans un cadre de marque, avec zoom lent. */
const PhotoCard: React.FC<{src: string; at: number; until?: number; x?: number; y?: number; w?: number; h?: number; rotate?: number; pos?: string; children?: React.ReactNode}> = ({src, at, until = Infinity, x = 540, y = 1040, w = 960, h = 700, rotate = 0, pos = '50% 50%', children}) => {
  const t = useT();
  const z = 1.05 + 0.1 * prog(t, at, at + 8, (v) => v);
  return (
    <Enter at={at} until={until} x={x} y={y} from="up" dist={260} rotate={rotate}>
      <div style={{position: 'relative', width: w, height: h, borderRadius: 34, overflow: 'hidden', border: '10px solid #fff', boxShadow: '0 24px 50px rgba(14,30,60,0.32)'}}>
        <Img src={staticFile(`promo/${src}.jpg`)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${z})`}} />
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 10, background: `linear-gradient(90deg, ${colors.green}, ${colors.navy})`}} />
        {children}
      </div>
    </Enter>
  );
};

/** Machine équipée d'une lame circulaire qui tourne (le fil rouge de la vidéo). */
const Machine: React.FC<{size?: number; speed?: number; glow?: number}> = ({size = 420, speed = 1, glow = 0}) => {
  const f = useCurrentFrame();
  const teeth = Array.from({length: 24}, (_, i) => {
    const a = (i / 24) * Math.PI * 2;
    const a2 = a + Math.PI / 24;
    return `${100 + 70 * Math.cos(a)},${100 + 70 * Math.sin(a)} ${100 + 86 * Math.cos(a2)},${100 + 86 * Math.sin(a2)}`;
  }).join(' ');
  return (
    <svg width={size} height={size * 1.05} viewBox="0 0 200 210" overflow="visible">
      {/* lame */}
      <g transform={`translate(0 -18) rotate(${f * 14 * speed} 100 100)`} style={{filter: glow ? `drop-shadow(0 0 ${6 + glow * 10}px rgba(217,68,58,${0.5 + 0.4 * glow}))` : undefined}}>
        <polygon points={teeth} fill="#2B2F36" />
        <circle cx={100} cy={100} r={72} fill="#3B414B" />
        <circle cx={100} cy={100} r={52} fill="#6B7280" opacity={0.35} />
        <circle cx={100} cy={100} r={16} fill="#E5E7EB" stroke="#2B2F36" strokeWidth={5} />
        <path d="M100 40 A60 60 0 0 1 160 100" stroke="rgba(255,255,255,0.35)" strokeWidth={5} fill="none" />
      </g>
      {/* carter */}
      <rect x={18} y={118} width={164} height={74} rx={14} fill="#C9D1DB" stroke={colors.ink} strokeWidth={5} />
      <rect x={30} y={130} width={92} height={50} rx={8} fill="#E6EBF1" stroke={colors.ink} strokeWidth={3} />
      <rect x={134} y={124} width={40} height={64} rx={6} fill="#fff" stroke={colors.ink} strokeWidth={3} />
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M${134 + i * 12} 188 L${150 + i * 12} 124`} stroke={colors.green} strokeWidth={6} clipPath="url(#hz)" />
      ))}
      <circle cx={48} cy={155} r={7} fill={glow ? RED : colors.green} />
      <rect x={10} y={190} width={180} height={14} rx={5} fill={colors.ink} />
    </svg>
  );
};

/** Personnage « opérateur sans protection » (illustration 3D, sans EPI). */
const Operator: React.FC<{size?: number}> = ({size = 300}) => <F n="homme-bureau" size={size} />;

/** 0 – 9,8 s : Danger = Risque ? Sur un site industriel… */
const Hook: React.FC = () => {
  const t = useT();
  const neq = prog(t, 2.8, 3.3, easeInOut);
  const out = prog(t, 9.5, 9.8, easeIn);
  const bump = prog(t, 5.7, 6.2, easeInOut) * (1 - prog(t, 6.4, 6.8, easeInOut));
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="*Danger* & risque" at={0.1} until={2.75} y={410} size={100} accent={RED} />
      <Kinetic text="La même *chose* ?" at={2.8} until={4.05} y={410} size={100} />
      <Kinetic text="Sur un site *industriel*" at={4.1} until={7.25} y={410} size={76} maxWidth={1040} />
      <Kinetic text="Prévenir les *accidents*" at={7.3} until={9.7} y={410} size={76} maxWidth={1040} accent={RED} />
      {t < 4.3 && (
        <>
          <Enter at={0.15} until={4.2} x={290} y={950} from="left" dist={-500} bouncy>
            <div style={{width: 400, height: 260, borderRadius: 34, background: RED, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: '#fff', boxShadow: '0 18px 36px rgba(217,68,58,0.35)'}}>
              <F n="danger" size={100} />
              DANGER
            </div>
          </Enter>
          <Enter at={0.9} until={4.2} x={790} y={950} from="right" dist={500} bouncy>
            <div style={{width: 400, height: 260, borderRadius: 34, background: AMBER, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: '#fff', boxShadow: '0 18px 36px rgba(232,155,28,0.35)'}}>
              <F n="cible" size={100} />
              RISQUE
            </div>
          </Enter>
          <Enter at={1.7} until={4.2} x={540} y={950} bouncy>
            <div style={{width: 140, height: 140, borderRadius: '50%', background: '#fff', border: `8px solid ${neq > 0.5 ? RED : colors.navy}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 90, color: neq > 0.5 ? RED : colors.navy, transform: `rotate(${neq * 360}deg)`, boxShadow: '0 12px 24px rgba(0,0,0,0.2)'}}>
              {neq > 0.5 ? '≠' : '='}
            </div>
          </Enter>
          <Enter at={2.9} until={4.2} x={540} y={1280} bouncy rotate={Math.sin(t * 6) * 8}>
            <F n="question" size={180} />
          </Enter>
        </>
      )}
      {t > 4.1 && (
        <PhotoCard src="raffinerie" at={4.15} until={9.7} y={1050} w={760} h={1020} pos="50% 40%">
          <div style={{position: 'absolute', inset: 0, background: `rgba(217,68,58,${0.18 * bump})`}} />
          <div style={{position: 'absolute', left: 30, bottom: 40}}>
            <Enter at={5.8} x={0} y={0} from="left" dist={-200}>
              <div style={{display: 'flex', gap: 14, transform: `translate(180px, -30px) scale(${1 + 0.05 * bump})`}}>
                <div style={{background: RED, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 34, padding: '8px 18px', borderRadius: 12}}>DANGER</div>
                <div style={{background: AMBER, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 34, padding: '8px 18px', borderRadius: 12}}>RISQUE</div>
              </div>
            </Enter>
          </div>
          <div style={{position: 'absolute', right: 30, top: 30}}>
            <Enter at={8.4} x={0} y={0} bouncy>
              <div style={{transform: 'translate(-70px, 70px)'}}><F n="danger" size={150} /></div>
            </Enter>
          </div>
        </PhotoCard>
      )}
    </div>
  );
};

/** 9,8 – 35,1 s : la lame (danger), la pièce verrouillée (pas de risque), l'opérateur (le risque). */
const Lame: React.FC = () => {
  const t = useT();
  const m = useSpring(9.95, {damping: 13});
  const room = prog(t, 19.3, 20.4, easeInOut) * (1 - prog(t, 24.0, 24.5, easeIn));
  const op = kf(t, [25.4, 27.6], [1300, 820]);
  const opIn = t > 25.3 && t < 34.9;
  const expo = prog(t, 27.0, 27.6) * (1 - prog(t, 34.6, 34.9));
  const formula = prog(t, 28.6, 29.0);
  const proba = prog(t, 30.4, 31.6, easeOut);
  const grav = prog(t, 32.2, 33.4, easeOut);
  const out = prog(t, 34.8, 35.1, easeIn);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="Une lame en *rotation*" at={9.85} until={14.65} y={410} size={80} maxWidth={1040} />
      <Kinetic text="La lame = le *danger*" at={14.7} until={18.65} y={410} size={86} maxWidth={1040} accent={RED} />
      <Kinetic text="Seule, dans une pièce *verrouillée*…" at={18.7} until={23.45} y={410} size={60} maxWidth={1040} />
      <Kinetic text="Aucun *risque*" at={23.5} until={24.25} y={410} size={104} />
      <Kinetic text="Le *risque* apparaît" at={24.3} until={28.55} y={410} size={92} accent={AMBER} />
      <Kinetic text="Probabilité × *gravité*" at={28.6} until={35.0} y={410} size={80} maxWidth={1040} accent={AMBER} />

      {/* la machine */}
      <div style={{position: 'absolute', left: interpolate(prog(t, 25.2, 26.0, easeInOut), [0, 1], [540, 400]), top: interpolate(formula, [0, 1], [1000, 1120]), transform: `translate(-50%, -50%) scale(${m * interpolate(formula, [0, 1], [1, 0.78])})`}}>
        <Machine size={460} speed={1} glow={prog(t, 14.7, 15.2) * (1 - prog(t, 18.5, 19.0)) + expo} />
      </div>
      {/* étiquette DANGER */}
      <Enter at={14.75} until={18.65} x={540} y={640} from="up" dist={-80} bouncy>
        <div style={{textAlign: 'center', fontFamily: sansFont}}>
          <div style={{background: RED, color: '#fff', fontWeight: 900, fontSize: 52, padding: '8px 28px', borderRadius: 14}}>DANGER</div>
          <div style={{fontWeight: 700, fontSize: 30, color: colors.ink, marginTop: 10}}>Source du dommage</div>
          <svg width={40} height={70} style={{marginTop: 4}}><path d="M20 0 V56 M6 42 L20 62 L34 42" stroke={RED} strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
      </Enter>
      {/* pièce verrouillée */}
      {room > 0 && (
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
          <rect x={210} y={700} width={660} height={600} rx={30} fill="rgba(14,42,92,0.05)" stroke={colors.navy} strokeWidth={14} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - room} />
        </svg>
      )}
      <Enter at={20.9} until={24.2} x={870} y={1000} bouncy>
        <div style={{background: '#fff', borderRadius: 30, padding: 14, boxShadow: '0 12px 26px rgba(0,0,0,0.18)'}}><F n="cadenas" size={130} /></div>
      </Enter>
      <Enter at={23.5} until={24.25} x={540} y={1430} bouncy>
        <Pill label="Aucune exposition = aucun risque" icon="check" size={34} />
      </Enter>
      {/* l'opérateur sans protection s'approche */}
      {opIn && (
        <div style={{position: 'absolute', left: op, top: 1000, transform: 'translate(-50%, -50%)', opacity: 1 - out}}>
          <Operator size={360} />
          <div style={{position: 'absolute', left: 60, top: -50}}>
            <div style={{background: AMBER, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 28, padding: '6px 14px', borderRadius: 10, whiteSpace: 'nowrap', opacity: prog(t, 26.4, 26.8)}}>SANS EPI</div>
          </div>
        </div>
      )}
      {expo > 0 && (
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: expo}}>
          <ellipse cx={formula > 0.5 ? 540 : 560} cy={formula > 0.5 ? 1100 : 1010} rx={430 - formula * 60} ry={300 - formula * 40} fill="rgba(232,155,28,0.12)" stroke={AMBER} strokeWidth={8} strokeDasharray="22 16" strokeDashoffset={-t * 60} />
        </svg>
      )}
      <Enter at={27.4} until={28.5} x={580} y={700} bouncy>
        <div style={{background: AMBER, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 56, padding: '8px 30px', borderRadius: 14}}>RISQUE</div>
      </Enter>
      {/* formule : probabilité × gravité */}
      {formula > 0 && (
        <div style={{position: 'absolute', left: 60, top: 560, width: 960, opacity: formula, transform: `translateY(${(1 - formula) * 40}px)`}}>
          <div style={{display: 'flex', gap: 24}}>
            {[
              {k: 'PROBABILITÉ', v: proba, c: colors.navy, n: 'sablier'},
              {k: 'GRAVITÉ', v: grav, c: RED, n: 'danger'},
            ].map((g) => (
              <div key={g.k} style={{flex: 1, background: '#fff', borderRadius: 24, padding: '18px 22px', boxShadow: '0 12px 26px rgba(30,25,10,0.14)'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: 12, fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: g.c}}>
                  <F n={g.n} size={60} /> {g.k}
                </div>
                <div style={{marginTop: 14, height: 26, borderRadius: 13, background: '#E7EAEE', overflow: 'hidden'}}>
                  <div style={{width: `${g.v * 100}%`, height: '100%', background: `linear-gradient(90deg, ${colors.green}, ${AMBER}, ${RED})`}} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/** 35,1 – 50,1 s : résumé (danger / risque) puis la démarche identifier → évaluer → prévenir. */
const Resume: React.FC = () => {
  const t = useT();
  const partOut = prog(t, 43.8, 44.15, easeIn);
  const steps = [
    {at: 44.1, n: 'loupe', k: 'Identifier', sub: 'le danger', c: RED},
    {at: 45.4, n: 'balance', k: 'Évaluer', sub: 'le risque', c: AMBER},
    {at: 46.3, n: 'bouclier', k: 'Prévenir', sub: "l'accident", c: colors.green},
  ];
  return (
    <div style={{position: 'absolute', inset: 0}}>
      <Kinetic text="Pour *résumer*" at={35.15} until={44.0} y={410} size={104} />
      <Kinetic text="La démarche *QHSE*" at={44.1} until={50.0} y={410} size={92} />
      {partOut < 1 && (
        <div style={{position: 'absolute', inset: 0, opacity: 1 - partOut}}>
          <Enter at={36.1} x={540} y={830} from="left" dist={-600}>
            <div style={{width: 960, height: 360, background: '#fff', borderRadius: 34, boxShadow: '0 16px 32px rgba(30,25,10,0.16)', display: 'flex', alignItems: 'center', gap: 20, padding: '0 30px', borderLeft: `18px solid ${RED}`}}>
              <div style={{transform: 'scale(0.62)', transformOrigin: 'center', width: 280, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Machine size={420} speed={0.6} /></div>
              <div style={{fontFamily: sansFont}}>
                <div style={{fontWeight: 900, fontSize: 64, color: RED}}>DANGER</div>
                <div style={{fontWeight: 700, fontSize: 36, color: colors.ink, marginTop: 6}}>L'objet statique</div>
                <div style={{fontWeight: 600, fontSize: 30, color: '#5B6675'}}>→ notre lame</div>
              </div>
            </div>
          </Enter>
          <Enter at={39.7} x={540} y={1250} from="right" dist={600}>
            <div style={{width: 960, height: 360, background: '#fff', borderRadius: 34, boxShadow: '0 16px 32px rgba(30,25,10,0.16)', display: 'flex', alignItems: 'center', gap: 20, padding: '0 30px', borderLeft: `18px solid ${AMBER}`}}>
              <div style={{position: 'relative', width: 280, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Operator size={230} />
                <div style={{position: 'absolute', right: 0, top: 30}}><F n="ciseaux" size={100} /></div>
              </div>
              <div style={{fontFamily: sansFont}}>
                <div style={{fontWeight: 900, fontSize: 64, color: AMBER}}>RISQUE</div>
                <div style={{fontWeight: 700, fontSize: 36, color: colors.ink, marginTop: 6}}>L'action précise</div>
                <div style={{fontWeight: 600, fontSize: 30, color: '#5B6675'}}>→ se couper en la manipulant</div>
              </div>
            </div>
          </Enter>
        </div>
      )}
      {steps.map((st, i) => (
        <Enter key={st.k} at={st.at} until={50.0} x={540} y={720 + i * 260} from="left" dist={-500}>
          <div style={{width: 900, height: 210, background: '#fff', borderRadius: 30, boxShadow: '0 14px 28px rgba(30,25,10,0.15)', display: 'flex', alignItems: 'center', gap: 26, padding: '0 30px', borderLeft: `16px solid ${st.c}`}}>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 80, color: st.c, width: 70}}>{i + 1}</div>
            <F n={st.n} size={130} />
            <div style={{fontFamily: sansFont}}>
              <div style={{fontWeight: 900, fontSize: 56, color: colors.navy, textTransform: 'uppercase'}}>{st.k}</div>
              <div style={{fontWeight: 600, fontSize: 32, color: '#5B6675'}}>{st.sub}</div>
            </div>
          </div>
        </Enter>
      ))}
      <Enter at={48.4} until={50.0} x={540} y={1530} bouncy>
        <Pill label="La base d'une démarche QHSE efficace" icon="check" size={30} />
      </Enter>
    </div>
  );
};

/** 50,1 – 54,9 s : l'opérateur protégé, le responsable qui a isolé le risque. */
const Final: React.FC = () => {
  const t = useT();
  return (
    <div style={{position: 'absolute', inset: 0}}>
      <Kinetic text="Opérateur *protégé*" at={50.15} until={52.45} y={410} size={92} />
      <Kinetic text="Isoler le risque du *danger*" at={52.5} until={54.85} y={410} size={70} maxWidth={1040} />
      <Underline at={53.0} until={54.85} x={540} y={480} width={560} />
      <PhotoCard src="hse-machine" at={50.2} until={54.85} x={540} y={840} w={960} h={560} pos="65% 40%">
        <div style={{position: 'absolute', right: 26, top: 26}}>
          <Enter at={50.8} x={0} y={0} bouncy>
            <div style={{transform: 'translate(-110px, 40px)'}}><Pill label="Protégé" icon="bouclier" size={32} /></div>
          </Enter>
        </div>
      </PhotoCard>
      <PhotoCard src="terrain-controle" at={51.5} until={54.85} x={540} y={1380} w={820} h={420} pos="60% 35%">
        <div style={{position: 'absolute', left: 22, bottom: 30}}>
          <Enter at={52.6} x={0} y={0} from="left" dist={-200}>
            <div style={{transform: 'translate(210px, -20px)'}}><Pill label="Le responsable QHSE" icon="clipboard" size={28} /></div>
          </Enter>
        </div>
      </PhotoCard>
    </div>
  );
};

const CUES: Cue[] = [
  {at: 0.15, sfx: 'whoosh', volume: 0.3},
  {at: 0.9, sfx: 'whoosh', volume: 0.3},
  {at: 1.7, sfx: 'pop', volume: 0.3},
  {at: 2.8, sfx: 'swish', volume: 0.35},
  {at: 3.0, sfx: 'thud', volume: 0.4},
  {at: 4.15, sfx: 'whoosh', volume: 0.3},
  {at: 5.8, sfx: 'pop', volume: 0.3},
  {at: 8.4, sfx: 'bell', volume: 0.25},
  ...WIPES.map((at) => ({at: at - 0.35, sfx: 'whoosh', volume: 0.45})),
  {at: 10.0, sfx: 'rise', volume: 0.25},
  {at: 14.75, sfx: 'thud', volume: 0.45},
  {at: 19.3, sfx: 'swish', volume: 0.3},
  {at: 20.9, sfx: 'click', volume: 0.45},
  {at: 23.5, sfx: 'ding', volume: 0.35},
  {at: 25.4, sfx: 'whoosh', volume: 0.3},
  {at: 27.4, sfx: 'bell', volume: 0.3},
  {at: 28.6, sfx: 'pop', volume: 0.3},
  {at: 30.4, sfx: 'rise', volume: 0.25},
  {at: 32.2, sfx: 'rise', volume: 0.25},
  {at: 36.1, sfx: 'swish', volume: 0.3},
  {at: 39.7, sfx: 'swish', volume: 0.3},
  ...[44.1, 45.4, 46.3].map((at) => ({at, sfx: 'pop', volume: 0.32})),
  {at: 48.4, sfx: 'ding', volume: 0.35},
  {at: 50.8, sfx: 'pop', volume: 0.3},
  {at: 51.5, sfx: 'whoosh', volume: 0.3},
  {at: OUTRO_AT - 0.35, sfx: 'whoosh', volume: 0.45},
  {at: OUTRO_AT + 0.4, sfx: 'rise', volume: 0.3},
  {at: OUTRO_AT + 1.4, sfx: 'pop', volume: 0.35},
];

export const DangerRisque: React.FC = () => {
  const frame = useCurrentFrame();
  const fade = interpolate(frame, [DANGER_FRAMES - s(0.8), DANGER_FRAMES], [1, 0], {extrapolateLeft: 'clamp'});
  const music = (f: number) => interpolate(f / 30, [0, 0.3, 54.6, 55.2, 57.0, 57.8], [0.28, 0.09, 0.09, 0.34, 0.34, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill>
      <Camera shakes={[3.0, 14.75]}>
        <Background />
        <Gate from={0} to={9.8}><Hook /></Gate>
        <Gate from={9.8} to={35.1}><Lame /></Gate>
        <Gate from={35.1} to={50.1}><Resume /></Gate>
        <Gate from={50.1} to={OUTRO_AT}><Final /></Gate>
        <Gate from={OUTRO_AT} to={99}><Outro at={OUTRO_AT} logo={LOGO} /></Gate>
        <AlertVignette from={27.4} to={34.6} />
      </Camera>
      <Header hideAt={OUTRO_AT} logo={LOGO} />
      <Footer hideAt={OUTRO_AT} />
      {WIPES.map((at) => (
        <Wipe key={at} at={at} />
      ))}
      <Wipe at={OUTRO_AT} />
      <Captions captions={captions} />
      <Audio src={staticFile('voix-off-danger.m4a')} volume={fade} />
      <Audio src={staticFile('musique-promo.m4a')} volume={music} />
      <SfxTrack cues={CUES} />
    </AbsoluteFill>
  );
};
