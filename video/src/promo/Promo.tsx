import {AbsoluteFill, Audio, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {easeIn, easeInOut, easeOut, Enter, Gate, kf, Kinetic, prog, useSpring, useT} from '../anim';
import {Background} from '../components/Background';
import {Captions} from '../components/Captions';
import {Footer} from '../components/Footer';
import {Camera, Cue, SfxTrack, Wipe} from '../components/Fx';
import {Header} from '../components/Header';
import {Cross} from '../components/Icons';
import {F, Pill, Tile} from '../iso/ui';
import {Outro} from '../scenes/Outro';
import {colors, s, sansFont} from '../theme';
import {captions} from './captions';

const LOGO = 'promo/logo.png';
const OUTRO_AT = 67.3;
export const PROMO_FRAMES = s(70.2);
const WIPES = [20.7, 30.4, 59.1];
const RED = '#D9443A';

/** Photo de la banque d'images dans un cadre de marque, avec zoom lent (Ken Burns). */
const PhotoCard: React.FC<{src: string; at: number; until?: number; x?: number; y?: number; w?: number; h?: number; rotate?: number; from?: 'up' | 'down' | 'left' | 'right' | 'scale'; pos?: string; gray?: number; children?: React.ReactNode}> = ({src, at, until = Infinity, x = 540, y = 1040, w = 960, h = 700, rotate = 0, from = 'up', pos = '50% 50%', gray = 0, children}) => {
  const t = useT();
  const z = 1.06 + 0.1 * prog(t, at, at + 8, (v) => v);
  return (
    <Enter at={at} until={until} x={x} y={y} from={from} dist={from === 'left' || from === 'right' ? -700 : 260} rotate={rotate}>
      <div style={{position: 'relative', width: w, height: h, borderRadius: 34, overflow: 'hidden', border: '10px solid #fff', boxShadow: '0 24px 50px rgba(14,30,60,0.32)'}}>
        <Img src={staticFile(`promo/${src}.jpg`)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${z})`, filter: gray ? `grayscale(${gray}) brightness(${1 - 0.1 * gray})` : undefined}} />
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 10, background: `linear-gradient(90deg, ${colors.green}, ${colors.navy})`}} />
        {children}
      </div>
    </Enter>
  );
};

/** Badge de certification ISO (recréé aux couleurs de la marque). */
const IsoBadge: React.FC<{num: string; color: string; size?: number}> = ({num, color, size = 300}) => (
  <svg width={size} height={size * 0.62} viewBox="0 0 300 186" overflow="visible">
    <path d="M120 40 H298 L274 146 H120 Z" fill={color} />
    <text x={226} y={92} textAnchor="middle" fontFamily="Montserrat" fontWeight={900} fontSize={42} fill="#fff">ISO</text>
    <text x={226} y={132} textAnchor="middle" fontFamily="Montserrat" fontWeight={800} fontSize={34} fill="#fff">{num}</text>
    <circle cx={86} cy={93} r={78} fill="#fff" stroke={color} strokeWidth={10} />
    <circle cx={86} cy={93} r={54} fill={color} opacity={0.15} />
    <path d="M56 92 L80 118 L124 58" fill="none" stroke={color} strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" />
    <text x={86} y={160} textAnchor="middle" fontFamily="Montserrat" fontWeight={800} fontSize={14} fill={color} letterSpacing={1}>CERTIFIED</text>
  </svg>
);

const Stamp: React.FC<{label: string; color?: string; rotate?: number}> = ({label, color = colors.green, rotate = -10}) => (
  <div style={{border: `8px solid ${color}`, color, borderRadius: 18, padding: '8px 26px 12px', fontFamily: sansFont, fontWeight: 900, fontSize: 52, letterSpacing: 2, background: 'rgba(255,255,255,0.88)', transform: `rotate(${rotate}deg)`, whiteSpace: 'nowrap', boxShadow: '0 10px 24px rgba(0,0,0,0.15)'}}>{label}</div>
);

/** 0 – 10,7 s : accroche + « connaître ne suffit pas, il faut appliquer sur le terrain ». */
const Hook: React.FC = () => {
  const t = useT();
  const out = prog(t, 10.4, 10.7, easeIn);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="Tu travailles en *QHSE* ?" at={0.2} until={2.05} y={410} size={86} maxWidth={1040} />
      <Kinetic text="Cette formation va *changer* ta pratique" at={2.1} until={4.75} y={410} size={62} maxWidth={1040} />
      <Kinetic text="Connaître ne suffit *pas*" at={4.85} until={8.25} y={410} size={78} maxWidth={1040} accent={RED} />
      <Kinetic text="*Appliquer* sur le terrain" at={8.3} until={10.6} y={410} size={80} maxWidth={1040} />
      <PhotoCard src="hse-machine" at={0.25} until={4.85} y={1060} h={780} pos="70% 50%">
        <div style={{position: 'absolute', right: 24, top: 24}}>
          <Enter at={2.2} x={0} y={0} bouncy spin={-30}>
            <div style={{width: 210, height: 210, borderRadius: '50%', background: colors.ochre, border: '8px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#fff', lineHeight: 1.1, transform: 'translate(-105px, 105px) rotate(12deg)'}}>
              NOUVELLE
              <br />
              SESSION
            </div>
          </Enter>
        </div>
      </PhotoCard>
      {/* connaître les notions… */}
      <Enter at={4.9} until={8.3} x={540} y={1000} bouncy>
        <div style={{position: 'relative', textAlign: 'center'}}>
          <Tile n="livres" size={360} color="#8A94A3" />
          <div style={{position: 'absolute', left: 30, top: 30}}><Cross size={300} progress={prog(t, 7.0, 7.4)} /></div>
          <div style={{marginTop: 26, fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: '#5B6675'}}>CONNAÎTRE LES NOTIONS</div>
        </div>
      </Enter>
      {/* … appliquer sur le terrain */}
      <PhotoCard src="mine-terrain" at={8.3} until={10.6} y={1060} h={760} from="down" pos="60% 50%">
        <div style={{position: 'absolute', left: 26, bottom: 36}}>
          <Enter at={9.7} x={0} y={0} bouncy>
            <div style={{transform: 'translate(150px, -30px)'}}><Pill label="Sur le terrain" icon="check" /></div>
          </Enter>
        </div>
      </PhotoCard>
    </div>
  );
};

const SKILLS = [
  {at: 10.75, n: 'danger', label: 'Identifier les risques'},
  {at: 12.05, n: 'clipboard', label: 'Conduire un audit'},
  {at: 13.45, n: 'loupe', label: 'Analyser un incident'},
  {at: 14.95, n: 'outils', label: 'Suivre les actions correctives'},
  {at: 16.75, n: 'courbe', label: 'Piloter les indicateurs'},
];

/** 10,7 – 20,7 s : les compétences essentielles. */
const Competences: React.FC = () => {
  const t = useT();
  const all = prog(t, 18.5, 18.9);
  return (
    <div style={{position: 'absolute', inset: 0}}>
      <Kinetic text="Des compétences *essentielles*" at={10.75} until={20.6} y={410} size={68} maxWidth={1040} />
      <PhotoCard src="terrain-controle" at={10.75} until={20.6} y={790} h={500} pos="50% 40%" />
      {SKILLS.map((sk, i) => {
        const ok = prog(t, 18.5 + i * 0.1, 18.8 + i * 0.1);
        return (
          <Enter key={sk.label} at={sk.at} until={20.6} x={540} y={1130 + i * 100} from="left" dist={-500}>
            <div style={{width: 960, height: 88, display: 'flex', alignItems: 'center', gap: 18, background: '#fff', borderRadius: 20, padding: '0 22px', boxShadow: `0 10px 22px rgba(30,25,10,0.14), 0 0 ${ok * 26}px rgba(124,197,118,${0.6 * ok})`, borderLeft: `12px solid ${ok > 0.5 ? colors.green : colors.navy}`, fontFamily: sansFont, fontWeight: 800, fontSize: 36, color: colors.ink}}>
              <F n={sk.n} size={66} />
              <div style={{flex: 1}}>{sk.label}</div>
              {ok > 0 && <div style={{transform: `scale(${ok})`}}><F n="check" size={60} /></div>}
            </div>
          </Enter>
        );
      })}
      {all > 0 && <div style={{position: 'absolute', left: 820, top: 560, transform: `scale(${all}) rotate(${(1 - all) * 40}deg)`}}><F n="etincelles" size={160} /></div>}
    </div>
  );
};

const QHSE = [
  {l: 'Q', w: 'Qualité', c: colors.navy},
  {l: 'H', w: 'Hygiène', c: colors.green},
  {l: 'S', w: 'Sécurité', c: colors.ochre},
  {l: 'E', w: 'Environnement', c: '#3F9E86'},
];

/** 20,7 – 30,4 s : la formation Management QHSE : outils, méthodes, exigences. */
const Formation: React.FC = () => {
  const t = useT();
  const tilesOut = prog(t, 28.5, 28.85, easeIn);
  return (
    <div style={{position: 'absolute', inset: 0}}>
      <Kinetic text="Formation *Management QHSE*" at={20.75} until={23.25} y={410} size={68} maxWidth={1040} />
      <Kinetic text="Outils · Méthodes · *Exigences*" at={23.3} until={28.75} y={410} size={64} maxWidth={1040} />
      <Kinetic text="Piloter un *système QHSE*" at={28.8} until={30.3} y={410} size={72} maxWidth={1040} />
      <PhotoCard src="formation-incendie" at={20.8} until={30.3} y={850} h={560} pos="50% 45%">
        <div style={{position: 'absolute', left: 0, bottom: 10, right: 0, padding: '18px 26px', background: 'linear-gradient(transparent, rgba(14,42,92,0.88))', display: 'flex', alignItems: 'center', gap: 16}}>
          <div style={{background: colors.green, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 28, padding: '6px 16px', borderRadius: 10}}>FORMATION</div>
          <div style={{color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 38}}>MANAGEMENT QHSE</div>
        </div>
      </PhotoCard>
      {tilesOut < 1 &&
        [
          {at: 24.6, n: 'outils', label: 'Outils', x: 230},
          {at: 25.3, n: 'equerre', label: 'Méthodes', x: 540},
          {at: 26.3, n: 'clipboard', label: 'Exigences', x: 850},
        ].map((p) => (
          <Enter key={p.label} at={p.at} x={p.x} y={1330} bouncy>
            <div style={{textAlign: 'center', opacity: 1 - tilesOut, transform: `scale(${1 - 0.3 * tilesOut})`}}>
              <Tile n={p.n} size={200} color={colors.green} />
              <div style={{marginTop: 14, fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: colors.navy, textTransform: 'uppercase'}}>{p.label}</div>
            </div>
          </Enter>
        ))}
      {QHSE.map((q, i) => (
        <Enter key={q.l} at={28.85 + i * 0.12} until={30.3} x={195 + i * 230} y={1330} bouncy>
          <div style={{textAlign: 'center'}}>
            <div style={{width: 200, height: 200, borderRadius: 34, background: q.c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 130, color: '#fff', boxShadow: '0 14px 28px rgba(14,42,92,0.25)'}}>{q.l}</div>
            <div style={{marginTop: 12, fontFamily: sansFont, fontWeight: 800, fontSize: 26, color: colors.navy}}>{q.w}</div>
          </div>
        </Enter>
      ))}
    </div>
  );
};

const MODULES = [
  {at: 35.9, n: 'danger', label: 'Analyse des risques'},
  {at: 37.2, n: 'clipboard', label: 'Audit QHSE'},
  {at: 38.7, n: 'outils', label: 'Actions correctives'},
  {at: 40.0, n: 'courbe', label: 'Indicateurs & amélioration continue'},
];

/** 30,4 – 43,5 s : au programme. */
const Programme: React.FC = () => {
  const t = useT();
  return (
    <div style={{position: 'absolute', inset: 0}}>
      <Kinetic text="Au *programme*" at={30.45} until={43.4} y={410} size={104} />
      {[
        {num: '9001', c: colors.green, at: 31.5, x: 200},
        {num: '14001', c: '#2A9FD6', at: 32.8, x: 540},
        {num: '45001', c: colors.ochre, at: 34.2, x: 880},
      ].map((b) => (
        <Enter key={b.num} at={b.at} until={43.4} x={b.x} y={720} bouncy spin={-20}>
          <IsoBadge num={b.num} color={b.c} size={310} />
        </Enter>
      ))}
      {MODULES.map((m, i) => (
        <Enter key={m.label} at={m.at} until={43.4} x={i % 2 ? 795 : 285} y={1010 + Math.floor(i / 2) * 230} from={i % 2 ? 'left' : 'right'} dist={i % 2 ? -400 : 400}>
          <div style={{width: 480, height: 200, background: '#fff', borderRadius: 26, boxShadow: '0 14px 28px rgba(30,25,10,0.15)', display: 'flex', alignItems: 'center', gap: 16, padding: '0 22px', borderTop: `12px solid ${[colors.ochre, colors.navy, colors.green, '#2A9FD6'][i]}`}}>
            <F n={m.n} size={110} />
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: colors.navy, lineHeight: 1.1}}>{m.label}</div>
          </div>
        </Enter>
      ))}
      <Enter at={41.6} until={43.4} x={540} y={1490} bouncy>
        <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
          <div style={{transform: `rotate(${t * 120}deg)`}}><F n="recyclage" size={90} /></div>
          <Pill label="Amélioration continue" icon="courbe" />
        </div>
      </Enter>
    </div>
  );
};

const PROFILES = [
  {at: 44.0, n: 'livres', label: 'Étudiant', x: 290, y: 1110},
  {at: 44.9, n: 'pousse', label: 'Débutant', x: 790, y: 1110},
  {at: 45.9, n: 'gilet', label: 'Agent HSE', x: 290, y: 1270},
  {at: 47.1, n: 'equipe', label: 'Superviseur', x: 790, y: 1270},
  {at: 48.1, n: 'medaille', label: 'Professionnel QHSE', x: 540, y: 1430},
];

/** 43,5 – 59,1 s : pour qui ? puis « connaître » → « maîtriser ». */
const Public: React.FC = () => {
  const t = useT();
  const partOut = prog(t, 52.8, 53.1, easeIn);
  return (
    <div style={{position: 'absolute', inset: 0}}>
      <Kinetic text="Pour *qui* ?" at={43.55} until={52.95} y={410} size={110} />
      <Kinetic text="Ne te contente plus de *connaître*" at={53.0} until={55.75} y={410} size={62} maxWidth={1040} accent={RED} />
      <Kinetic text="*Maîtrise* et passe à l'action" at={55.8} until={59.0} y={410} size={68} maxWidth={1040} />
      {partOut < 1 && (
        <div style={{position: 'absolute', inset: 0, opacity: 1 - partOut}}>
          <PhotoCard src="participants" at={43.6} y={760} h={480} pos="50% 40%">
            <div style={{position: 'absolute', left: '50%', top: '50%'}}>
              <Enter at={50.0} x={0} y={0} bouncy spin={-25}>
                <Stamp label="C'EST POUR TOI !" />
              </Enter>
            </div>
          </PhotoCard>
          {PROFILES.map((p) => (
            <Enter key={p.label} at={p.at} x={p.x} y={p.y} bouncy>
              <Pill label={p.label} icon={p.n} size={38} />
            </Enter>
          ))}
        </div>
      )}
      {t > 53.0 && (
        <>
          <PhotoCard src="audit-reunion" at={53.2} until={59.0} x={330} y={900} w={560} h={420} rotate={-5} from="left" gray={1}>
            <div style={{position: 'absolute', left: 20, top: 20}}><Pill label="Connaître" icon="livres" size={30} /></div>
          </PhotoCard>
          <PhotoCard src="formation-consignation" at={55.8} until={59.0} x={740} y={1260} w={600} h={450} rotate={4} from="right">
            <div style={{position: 'absolute', left: 20, top: 20}}><Pill label="Maîtriser" icon="cible" size={32} /></div>
          </PhotoCard>
          {t > 56.0 && (
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
              <path d="M 420 1120 C 450 1250, 480 1280, 520 1290" fill="none" stroke={colors.green} strokeWidth={12} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - prog(t, 56.0, 56.5)} />
            </svg>
          )}
          <Enter at={58.1} until={59.0} x={300} y={1450} bouncy>
            <Pill label="Avec méthode" icon="equerre" />
          </Enter>
        </>
      )}
    </div>
  );
};

/** 59,1 – 67,3 s : appel à l'action — prochaine cohorte avec UNIVERSNORMES. */
const Cta: React.FC = () => {
  const t = useT();
  const fanOut = prog(t, 62.0, 62.4, easeIn);
  const logo = useSpring(62.35, {damping: 12});
  const pulse = 1 + 0.04 * Math.sin(t * 8);
  return (
    <div style={{position: 'absolute', inset: 0}}>
      <Kinetic text="Rejoins la *prochaine cohorte*" at={59.15} until={62.25} y={410} size={66} maxWidth={1040} />
      <Kinetic text="Management *QHSE*" at={62.3} until={64.65} y={410} size={86} maxWidth={1040} />
      <Kinetic text="Forme-toi · maîtrise · *évolue*" at={64.7} until={67.2} y={410} size={66} maxWidth={1040} />
      {/* éventail de photos */}
      {fanOut < 1 &&
        [
          {src: 'formation-incendie', r: -10, x: 330, at: 59.3},
          {src: 'terrain-controle', r: 8, x: 750, at: 59.5},
          {src: 'participants', r: -2, x: 540, at: 59.7},
        ].map((p) => (
          <div key={p.src} style={{position: 'absolute', inset: 0, opacity: 1 - fanOut, transform: `translateY(${-fanOut * 300}px) scale(${1 - 0.3 * fanOut})`, transformOrigin: '540px 900px'}}>
            <PhotoCard src={p.src} at={p.at} x={p.x} y={940} w={520} h={380} rotate={p.r} from="down" />
          </div>
        ))}
      {fanOut < 1 && (
        <Enter at={59.4} until={62.3} x={540} y={640} bouncy>
          <div style={{transform: `scale(${pulse}) rotate(-3deg)`, background: colors.green, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 52, padding: '12px 34px 16px', borderRadius: 18, boxShadow: '0 14px 28px rgba(46,155,62,0.35)', whiteSpace: 'nowrap'}}>PROCHAINE COHORTE</div>
        </Enter>
      )}
      {/* logo UNIVERSNORMES fourni */}
      {t > 62.3 && (
        <div style={{position: 'absolute', left: 540, top: 880, transform: `translate(-50%, -50%) scale(${logo})`}}>
          <div style={{background: '#fff', borderRadius: 40, padding: '34px 40px', boxShadow: '0 24px 50px rgba(14,42,92,0.22)'}}>
            <Img src={staticFile(LOGO)} style={{width: 760, display: 'block'}} />
          </div>
        </div>
      )}
      <Enter at={62.6} until={67.2} x={540} y={1210} from="up" dist={60}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12, background: colors.navy, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 36, padding: '14px 30px', borderRadius: 60, whiteSpace: 'nowrap', transform: `scale(${pulse})`}}>
          <F n="calendrier" size={50} /> INSCRIPTIONS OUVERTES
        </div>
      </Enter>
      {[
        {at: 64.7, n: 'livres', w: 'Forme-toi', x: 200},
        {at: 65.6, n: 'cible', w: 'Maîtrise', x: 540},
        {at: 66.5, n: 'fusee', w: 'Évolue', x: 880},
      ].map((p) => (
        <Enter key={p.w} at={p.at} until={67.2} x={p.x} y={1430} bouncy>
          <div style={{textAlign: 'center'}}>
            <Tile n={p.n} size={150} color={colors.green} />
            <div style={{marginTop: 10, fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: colors.navy, textTransform: 'uppercase'}}>{p.w}</div>
          </div>
        </Enter>
      ))}
    </div>
  );
};

const CUES: Cue[] = [
  {at: 0.25, sfx: 'whoosh', volume: 0.3},
  {at: 2.2, sfx: 'pop', volume: 0.35},
  {at: 4.9, sfx: 'swish', volume: 0.3},
  {at: 7.0, sfx: 'swish', volume: 0.35},
  {at: 8.3, sfx: 'whoosh', volume: 0.35},
  {at: 9.7, sfx: 'ding', volume: 0.3},
  {at: 10.75, sfx: 'whoosh', volume: 0.3},
  ...SKILLS.map((k) => ({at: k.at, sfx: 'pop', volume: 0.25})),
  ...[0, 1, 2, 3, 4].map((i) => ({at: 18.5 + i * 0.1, sfx: 'ding', volume: 0.15})),
  ...WIPES.map((at) => ({at: at - 0.35, sfx: 'whoosh', volume: 0.45})),
  ...[24.6, 25.3, 26.3].map((at) => ({at, sfx: 'pop', volume: 0.3})),
  ...[0, 1, 2, 3].map((i) => ({at: 28.85 + i * 0.12, sfx: 'click', volume: 0.3})),
  ...[31.5, 32.8, 34.2].map((at) => ({at, sfx: 'thud', volume: 0.4})),
  ...MODULES.map((m) => ({at: m.at, sfx: 'swish', volume: 0.25})),
  {at: 41.6, sfx: 'pop', volume: 0.3},
  {at: 43.6, sfx: 'whoosh', volume: 0.3},
  ...PROFILES.map((p) => ({at: p.at, sfx: 'pop', volume: 0.28})),
  {at: 50.0, sfx: 'thud', volume: 0.5},
  {at: 53.2, sfx: 'swish', volume: 0.3},
  {at: 55.8, sfx: 'whoosh', volume: 0.3},
  {at: 58.1, sfx: 'pop', volume: 0.3},
  ...[59.3, 59.5, 59.7].map((at) => ({at, sfx: 'swish', volume: 0.25})),
  {at: 62.35, sfx: 'rise', volume: 0.35},
  {at: 62.6, sfx: 'ding', volume: 0.35},
  ...[64.7, 65.6, 66.5].map((at) => ({at, sfx: 'pop', volume: 0.35})),
  {at: OUTRO_AT - 0.35, sfx: 'whoosh', volume: 0.45},
  {at: OUTRO_AT + 0.4, sfx: 'rise', volume: 0.3},
  {at: OUTRO_AT + 1.4, sfx: 'pop', volume: 0.35},
];

export const Promo: React.FC = () => {
  const frame = useCurrentFrame();
  const fade = interpolate(frame, [PROMO_FRAMES - s(0.8), PROMO_FRAMES], [1, 0], {extrapolateLeft: 'clamp'});
  // musique : présente mais discrète sous la voix, remonte pour le carton final
  const music = (f: number) => {
    const t = f / 30;
    return interpolate(t, [0, 0.3, 67.0, 67.6, 69.4, 70.2], [0.32, 0.11, 0.11, 0.38, 0.38, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  };
  return (
    <AbsoluteFill>
      <Camera shakes={[50.0]}>
        <Background />
        <Gate from={0} to={10.7}><Hook /></Gate>
        <Gate from={10.7} to={20.7}><Competences /></Gate>
        <Gate from={20.7} to={30.4}><Formation /></Gate>
        <Gate from={30.4} to={43.5}><Programme /></Gate>
        <Gate from={43.5} to={59.1}><Public /></Gate>
        <Gate from={59.1} to={OUTRO_AT}><Cta /></Gate>
        <Gate from={OUTRO_AT} to={99}><Outro at={OUTRO_AT} logo={LOGO} /></Gate>
      </Camera>
      <Header hideAt={OUTRO_AT} logo={LOGO} />
      <Footer hideAt={OUTRO_AT} />
      {WIPES.map((at) => (
        <Wipe key={at} at={at} />
      ))}
      <Wipe at={OUTRO_AT} />
      <Captions captions={captions} />
      <Audio src={staticFile('voix-off-promo.m4a')} volume={fade} />
      <Audio src={staticFile('musique-promo.m4a')} volume={music} />
      <SfxTrack cues={CUES} />
    </AbsoluteFill>
  );
};
