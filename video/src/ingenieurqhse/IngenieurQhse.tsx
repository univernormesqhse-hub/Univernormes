import React from 'react';
import {AbsoluteFill, Audio, Img, random, staticFile} from 'remotion';
import {easeIn, easeInOut, easeOut, Gate, prog, useT} from '../anim';
import {Captions} from '../components/Captions';
import {Check} from '../identui/IdentUi';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {handFont, s, sansFont} from '../theme';
import {captions} from './captions';

/**
 * « L'ingénieur QHSE » (5 min 09) — voix d'origine, sous-titres recalés mot à mot, photo réelle de l'ingénieur
 * (détourée) en fil rouge. Techniques nouvelles : couverture « magazine » avec le titre derrière le sujet (effet de
 * profondeur), parallaxe 2,5D de la photo, annotations AR pointées sur le casque et le gilet, transitions en
 * diaphragme d'appareil photo, lettres QHSE extrudées en piliers 3D, cartes de mission façon jeu de rôle, « stories »
 * pour la variété du métier, arbre de compétences avec barre d'XP, portrait scindé (hard skills / soft skills),
 * courbe boursière des salaires, rose des vents des carrières, casque de réalité virtuelle et scan IA sur le visage,
 * globe 3D avec drapeaux. Les chiffres de salaire sont ceux cités par la vidéo d'origine.
 */
const LOGO = 'promo/logo.png';
const PHOTO = 'ingenieur/ingenieur.jpg';
const CUT = 'ingenieur/ingenieur-detoure.png';
const OUTRO_AT = 309.4;
export const INGENIEURQHSE_FRAMES = s(OUTRO_AT + 3.8);
const BG = '#0B1B33';
const INK = '#F2F6FA';
const DIM = 'rgba(242,246,250,0.62)';
const TEAL = '#14C3B4';
const LIME = '#C6F432';
const ORANGE = '#FF8A1F';
const PW = 736, PH = 1068; // dimensions de la photo

type Ch = {n: number; l: string; at: number; end: number; c: string};
const CH: Ch[] = [
  {n: 1, l: "Gardien de l'excellence", at: 20.9, end: 52.3, c: TEAL},
  {n: 2, l: "L'architecte de la performance", at: 52.5, end: 125.8, c: '#5B8CFF'},
  {n: 3, l: 'Le parcours vers l’expertise', at: 126.0, end: 172.7, c: LIME},
  {n: 4, l: 'Rémunération et évolution', at: 172.9, end: 232.5, c: ORANGE},
  {n: 5, l: 'Les défis de demain', at: 232.7, end: 290.9, c: '#B57BFF'},
];
const IRIS = 2.6;

const pop = (t: number, at: number, d = 0.4) => prog(t, at, at + d, easeOut);
const spring = (t: number, at: number, k = 7, w = 15) => {
  const x = t - at;
  return x <= 0 ? 0 : 1 - Math.exp(-x * k) * Math.cos(x * w);
};
const win = (t: number, a: number, b: number, f = 0.4) => prog(t, a, a + f) * (1 - prog(t, b - f, b));
const T: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 40, color = INK, style}) => (
  <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: size, color, letterSpacing: -0.5, lineHeight: 1.05, ...style}}>{children}</div>
);
const Hand: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 48, color = INK, style}) => (
  <div style={{fontFamily: handFont, fontSize: size, color, lineHeight: 1.1, ...style}}>{children}</div>
);
const Abs: React.FC<{x: number; y: number; w?: number; h?: number; children?: React.ReactNode; style?: React.CSSProperties}> = ({x, y, w, h, children, style}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, height: h, ...style}}>{children}</div>
);
const Glass: React.CSSProperties = {background: 'rgba(255,255,255,0.07)', border: '2px solid rgba(255,255,255,0.14)', borderRadius: 30, boxShadow: '0 24px 60px rgba(0,0,0,0.35)', backdropFilter: 'blur(8px)'};
const Chip: React.FC<{children: React.ReactNode; c?: string; q?: number; size?: number; dark?: boolean; style?: React.CSSProperties}> = ({children, c = TEAL, q = 1, size = 36, dark, style}) => (
  <div style={{display: 'inline-flex', alignItems: 'center', gap: 12, padding: '13px 26px', borderRadius: 50, background: c, color: dark ? BG : '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: size, transform: `scale(${q})`, boxShadow: `0 12px 34px ${c}55`, whiteSpace: 'nowrap', ...style}}>{children}</div>
);
const Row: React.FC<{y: number; children: React.ReactNode; gap?: number}> = ({y, children, gap = 16}) => (
  <Abs x={0} y={y} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap, flexWrap: 'wrap', padding: '0 40px', boxSizing: 'border-box'}}>{children}</Abs>
);
const Src: React.FC<{q?: number}> = ({q = 1}) => <div style={{opacity: 0.8 * q}}><Hand size={30} color={DIM}>chiffres cités par la vidéo d'origine</Hand></div>;

/** L'ingénieur détouré, placé par le haut-gauche avec une hauteur donnée. */
const Eng: React.FC<{x: number; y: number; h: number; style?: React.CSSProperties; filter?: string}> = ({x, y, h, style, filter}) => (
  <Img src={staticFile(CUT)} style={{position: 'absolute', left: x, top: y, height: h, width: (h * PW) / PH, filter: `drop-shadow(0 30px 40px rgba(0,0,0,0.45)) ${filter ?? ''}`, ...style}} />
);
/** Fond photo réelle floutée (parallaxe). */
const PhotoBg: React.FC<{o?: number; dx?: number; scale?: number; tint?: string}> = ({o = 1, dx = 0, scale = 1.25, tint = BG}) => (
  <AbsoluteFill style={{opacity: o, overflow: 'hidden'}}>
    <Img src={staticFile(PHOTO)} style={{position: 'absolute', left: -200 + dx, top: -100, width: 1480, height: 2148, objectFit: 'cover', filter: 'blur(18px) saturate(0.8)', transform: `scale(${scale})`}} />
    <AbsoluteFill style={{background: `linear-gradient(180deg, ${tint}E6 0%, ${tint}99 45%, ${tint}F2 100%)`}} />
  </AbsoluteFill>
);

/* ─────────── Couverture « magazine » ─────────── */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.2, 2.9, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: BG, opacity: 1 - out}}>
      <PhotoBg scale={1.3 + t * 0.02} />
      {/* titre DERRIÈRE le sujet */}
      <Abs x={0} y={250} w={1080} style={{textAlign: 'center'}}>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 290, color: LIME, letterSpacing: -6, lineHeight: 1, textShadow: '0 20px 60px rgba(0,0,0,0.4)'}}>QHSE</div>
      </Abs>
      <Eng x={540 - (1250 * PW) / PH / 2 + 10} y={330} h={1250} />
      {/* bandeau titre devant */}
      <Abs x={0} y={95} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={1290} w={1080} h={630} style={{background: `linear-gradient(180deg, transparent, ${BG}F0 30%, ${BG})`}} />
      <Abs x={60} y={1400} w={960} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: TEAL, color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: 32, letterSpacing: 3}}>MÉTIER · PORTRAIT</div>
        <T size={112} style={{marginTop: 14, textTransform: 'uppercase', letterSpacing: -3}}>L'ingénieur QHSE</T>
        <Hand size={54} color={LIME}>Architecte de la performance durable</Hand>
      </Abs>
      <Abs x={40} y={1150} style={{transform: 'rotate(-6deg)'}}><Chip c={ORANGE} size={30}>Qualité · Hygiène</Chip></Abs>
      <Abs x={600} y={1230} style={{transform: 'rotate(5deg)'}}><Chip c={TEAL} size={30}>Sécurité · Environnement</Chip></Abs>
    </AbsoluteFill>
  );
};

/* ─────────── Transition « diaphragme » + carte de chapitre ─────────── */
const IrisCard: React.FC<{ch: Ch}> = ({ch}) => {
  const t = useT();
  const a = ch.at, b = ch.at + IRIS;
  if (t < a || t > b) return null;
  const close = prog(t, a, a + 0.45, easeIn);
  const open = prog(t, b - 0.5, b, easeOut);
  const ap = close * (1 - open); // 0 ouvert, 1 fermé
  const blades = 8;
  return (
    <AbsoluteFill style={{zIndex: 55}}>
      {/* contenu de la carte (visible quand le diaphragme est fermé) */}
      <AbsoluteFill style={{opacity: prog(t, a + 0.4, a + 0.6) * (1 - prog(t, b - 0.55, b - 0.3)), background: `radial-gradient(circle at 50% 45%, ${ch.c}55, ${BG} 70%)`}}>
        <Eng x={540 - (900 * PW) / PH / 2} y={720} h={900} filter={`grayscale(1) contrast(1.1) drop-shadow(0 0 0 ${ch.c})`} style={{opacity: 0.35}} />
        <Abs x={60} y={560} w={960} style={{textAlign: 'center'}}>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 300, color: ch.c, lineHeight: 1, transform: `scale(${0.7 + 0.3 * spring(t, a + 0.5)})`}}>{ch.n}</div>
          <div style={{display: 'inline-block', padding: '8px 24px', borderRadius: 40, border: `3px solid ${ch.c}`, fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: ch.c, letterSpacing: 2}}>CHAPITRE {ch.n}/5</div>
          <T size={92} style={{marginTop: 22, textShadow: '0 10px 30px rgba(0,0,0,0.5)'}}>{ch.l}</T>
        </Abs>
      </AbsoluteFill>
      {/* lamelles du diaphragme */}
      {ap > 0.001 && (
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
          {Array.from({length: blades}, (_, k) => {
            const rot = (k * 360) / blades + ap * 30;
            const r = 1400 * (1 - ap) + 0;
            return (
              <g key={k} transform={`translate(540 960) rotate(${rot})`}>
                <path d={`M ${r * 0.2} ${-1500} L 1600 -400 L 1600 1600 L ${r * 0.2 - 60} 0 Z`} fill={k % 2 ? '#101827' : '#141E31'} stroke="#2A3A55" strokeWidth={4} transform={`translate(${(1 - ap) * 900} 0)`} />
              </g>
            );
          })}
        </svg>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Accroche : parallaxe 2,5D + annotations AR ─────────── */
const Callout: React.FC<{x: number; y: number; tx: number; ty: number; at: number; label: string; c?: string}> = ({x, y, tx, ty, at, label, c = LIME}) => {
  const t = useT();
  if (t < at) return null;
  const q = prog(t, at, at + 0.5, easeOut);
  return (
    <>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
        <circle cx={x} cy={y} r={14 + 8 * Math.sin(t * 5)} fill="none" stroke={c} strokeWidth={4} />
        <circle cx={x} cy={y} r={7} fill={c} />
        <path d={`M${x} ${y} L${x + (tx - x) * 0.6} ${ty} L${tx} ${ty}`} fill="none" stroke={c} strokeWidth={4} pathLength={1} strokeDasharray={`${q} 1`} />
      </svg>
      <Abs x={tx < x ? tx - 330 : tx} y={ty - 32} w={330} style={{display: 'flex', justifyContent: tx < x ? 'flex-end' : 'flex-start', opacity: prog(t, at + 0.3, at + 0.6)}}>
        <div style={{padding: '10px 20px', borderRadius: 14, background: 'rgba(11,27,51,0.85)', border: `3px solid ${c}`, fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#fff', whiteSpace: 'nowrap'}}>{label}</div>
      </Abs>
    </>
  );
};
const Hook: React.FC = () => {
  const t = useT();
  const o = 1 - prog(t, 20.6, 21.0);
  if (o <= 0) return null;
  const H = 1200, EX = 540 - (H * PW) / PH / 2 + 60 - t * 4, EY = 520;
  const sc = H / PH;
  const P = (px: number, py: number): [number, number] => [EX + px * sc, EY + py * sc];
  const [hx, hy] = P(330, 90), [vx, vy] = P(150, 640), [wx, wy] = P(470, 795);
  const qO = win(t, 13.0, 20.9, 0.4);
  return (
    <AbsoluteFill style={{opacity: o}}>
      <PhotoBg dx={-t * 10} scale={1.25 + t * 0.01} />
      <Eng x={EX} y={EY} h={H} style={{transform: `scale(${1 + t * 0.004})`, transformOrigin: '50% 100%'}} />
      <Abs x={60} y={250} w={960}><Hand size={50} color={DIM} style={{opacity: pop(t, 2.8)}}>Au cœur d'un métier d'avenir</Hand><T size={86} style={{transform: `translateX(${(1 - pop(t, 3.6, 0.6)) * -300}px)`}}>Ingénieur <span style={{color: LIME}}>QHSE</span></T></Abs>
      <Callout x={hx} y={hy} tx={690} ty={600} at={7.0} label="Expertise technique" />
      <Callout x={vx} y={vy} tx={690} ty={880} at={10.6} label="Protéger les gens" c={TEAL} />
      <Callout x={wx} y={wy} tx={700} ty={1120} at={12.1} label="Protéger la planète" c={ORANGE} />
      {qO > 0 && (
        <Abs x={70} y={1240} w={940} style={{...Glass, padding: '30px 36px', opacity: qO, transform: `translateY(${(1 - spring(t, 13.1)) * 200}px)`, background: 'rgba(11,27,51,0.88)'}}>
          <T size={30} color={LIME}>LA QUESTION</T>
          <T size={46} style={{marginTop: 8}}>Vous rêvez d'un métier où votre expertise contribue directement à la <span style={{color: LIME}}>protection des personnes</span> ?</T>
          {t > 17.4 && <div style={{marginTop: 14, transform: `scale(${spring(t, 17.4)})`, transformOrigin: '0 50%'}}><Chip c={TEAL} size={30}><Check p={prog(t, 17.6, 18.0)} size={34} color="#fff" />Si oui : la suite est pour vous</Chip></div>}
        </Abs>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Chapitre 1 : gardien de l'excellence ─────────── */
const C1: React.FC = () => {
  const t = useT();
  const o = win(t, 23.3, 52.3, 0.4);
  if (o <= 0) return null;
  const H = 980, EX = 540 - (H * PW) / PH / 2, EY = 640;
  return (
    <AbsoluteFill style={{opacity: o}}>
      <PhotoBg o={0.6} dx={-80} tint="#06231F" />
      {/* aura bouclier */}
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <path d="M540 560 L880 680 L880 1020 Q880 1400 540 1600 Q200 1400 200 1020 L200 680 Z" fill={`${TEAL}22`} stroke={TEAL} strokeWidth={8} pathLength={1} strokeDasharray={`${prog(t, 23.5, 25.0)} 1`} />
      </svg>
      <Eng x={EX} y={EY} h={H} />
      <Abs x={60} y={470} w={960} style={{textAlign: 'center'}}><T size={60} style={{transform: `scale(${spring(t, 27.9)})`}}>Une <span style={{color: TEAL}}>mission</span>, pas un simple travail</T></Abs>
      {t > 31.1 && <Abs x={720} y={760} style={{transform: `scale(${spring(t, 31.2)}) rotate(${Math.sin(t * 2) * 6}deg)`}}><div style={{width: 230, height: 230, borderRadius: 115, background: `radial-gradient(circle at 35% 30%, #FFE680, #F2B705)`, boxShadow: '0 20px 40px rgba(0,0,0,0.4), inset 0 0 0 10px rgba(255,255,255,0.4)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}><F n="medaille" size={90} /><T size={22} color={BG} style={{textAlign: 'center'}}>EXCELLENCE<br />OPÉRATIONNELLE</T></div></Abs>}
      {t > 35.6 && (
        <>
          {[['Sécurité', 35.6, TEAL, 0], ['Durabilité', 36.6, LIME, Math.PI]].map(([l, at, c, ph]) => {
            const a = (t - (at as number)) * 1.1 + (ph as number);
            return <Abs key={l as string} x={540 + Math.cos(a) * 420 - 110} y={1100 + Math.sin(a) * 160} style={{transform: `scale(${spring(t, at as number)})`, zIndex: Math.sin(a) > 0 ? 5 : 0}}><Chip c={c as string} dark={c === LIME}>{l}</Chip></Abs>;
          })}
        </>
      )}
      {t > 44.5 && (
        <Row y={1490} gap={12}>
          <Chip c={ORANGE} size={30} q={spring(t, 44.6)}>Hyper stratégique</Chip>
          <Chip c={TEAL} size={30} q={spring(t, 45.6)}>Enrichissant</Chip>
          <Chip c={LIME} dark size={30} q={spring(t, 48.3)}>Impact mesurable</Chip>
        </Row>
      )}
      {t > 48.3 && Array.from({length: 3}, (_, k) => { const q = ((t - 48.3) * 0.7 + k / 3) % 1; return <Abs key={k} x={540 - 500 * q} y={1100 - 500 * q} w={1000 * q} h={1000 * q} style={{borderRadius: '50%', border: `4px solid ${LIME}`, opacity: (1 - q) * 0.6}} />; })}
    </AbsoluteFill>
  );
};

/* ─────────── Chapitre 2 : l'architecte ─────────── */
const MISSIONS: [string, string, string, number, string][] = [
  ['Détective', 'Analyser & prévenir les risques', 'loupe', 88.9, '#5B8CFF'],
  ['Gardien du temple', 'Assurer la conformité', 'bouclier', 95.0, TEAL],
  ['Formateur', 'Former & animer les équipes', 'megaphone', 99.7, LIME],
  ['Gestion de crise', 'Gérer les crises, en tirer des leçons', 'sirene', 105.9, ORANGE],
];
const C2: React.FC = () => {
  const t = useT();
  const o = win(t, 55.0, 125.8, 0.4);
  if (o <= 0) return null;
  const C = '#5B8CFF';
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* contrôler → concevoir, bâtir : immeuble qui s'élève */}
      {t < 68.6 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 68.2, 68.6)}}>
          <Abs x={0} y={500} w={1080} style={{textAlign: 'center'}}><T size={56}>Il ne fait pas que <span style={{textDecoration: t > 61.3 ? 'line-through' : 'none', color: DIM}}>contrôler</span></T></Abs>
          <Row y={610} gap={14}><Chip c={C} q={spring(t, 63.3)}>Il conçoit</Chip><Chip c={TEAL} q={spring(t, 64.3)}>Il bâtit</Chip></Row>
          {/* immeuble */}
          {Array.from({length: 8}, (_, k) => {
            const q = prog(t, 63.6 + k * 0.4, 64.0 + k * 0.4, easeOut);
            return <Abs key={k} x={560} y={1500 - (k + 1) * 92} w={360} h={88} style={{background: k % 2 ? '#22406E' : '#2B4E86', border: '3px solid #5B8CFF', borderRadius: 6, transform: `translateY(${(1 - q) * -500}px)`, opacity: q, display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>{[0, 1, 2, 3].map((w) => <div key={w} style={{width: 50, height: 46, borderRadius: 4, background: random(`w${k}${w}`) > 0.3 ? '#FFE680' : '#163056'}} />)}</Abs>;
          })}
          <Eng x={60} y={760} h={850} />
          {t > 65.7 && <Abs x={560} y={680} w={360} style={{textAlign: 'center', opacity: pop(t, 65.7)}}><Hand size={44} color={LIME}>succès durable</Hand></Abs>}
        </AbsoluteFill>
      )}
      {/* QHSE : 4 piliers extrudés */}
      {t > 68.4 && t < 86.5 && (
        <AbsoluteFill style={{opacity: win(t, 68.4, 86.5, 0.4)}}>
          <Abs x={0} y={500} w={1080} style={{textAlign: 'center'}}><T size={50}>Qu'est-ce que ça veut dire ?</T></Abs>
          <Row y={640} gap={22}>
            {[['Q', 'Qualité', 71.1, '#5B8CFF'], ['H', 'Hygiène', 71.7, TEAL], ['S', 'Sécurité', 72.4, ORANGE], ['E', 'Environnement', 73.0, LIME]].map(([l, w, at, c]) => {
              const q = spring(t, at as number, 6, 12);
              const ext = Array.from({length: 14}, (_, k) => `${k + 1}px ${k + 1}px 0 ${c}${k < 7 ? '' : ''}`).join(', ');
              return (
                <div key={l as string} style={{width: 210, textAlign: 'center', transform: `translateY(${(1 - q) * 500}px) rotateY(${Math.sin(t * 1.2 + (at as number)) * 14}deg)`}}>
                  <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 200, color: '#fff', lineHeight: 1, textShadow: `${ext}, 24px 28px 30px rgba(0,0,0,0.5)`}}>{l}</div>
                  <div style={{marginTop: 18, padding: '6px 14px', borderRadius: 14, background: c as string, fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: c === LIME ? BG : '#fff'}}>{w}</div>
                </div>
              );
            })}
          </Row>
          <Abs x={140} y={1040} w={800} h={40} style={{borderRadius: 10, background: 'linear-gradient(180deg, #3A4F72, #22314B)', opacity: pop(t, 73.5)}} />
          {t > 80.9 && <Row y={1160}><Chip c={TEAL} q={spring(t, 81.0)}>Viser l'excellence</Chip></Row>}
          {t > 82.9 && (
            <Abs x={420} y={1260} w={240} h={240} style={{transform: `scale(${spring(t, 83.0)})`}}>
              <div style={{position: 'absolute', inset: 0, transform: `rotate(${t * 90}deg)`}}><F n="engrenage" size={240} /></div>
              <Abs x={-120} y={250} w={480} style={{textAlign: 'center'}}><T size={36} color={LIME}>Moteur de progrès</T></Abs>
            </Abs>
          )}
        </AbsoluteFill>
      )}
      {/* 4 missions : cartes de jeu de rôle */}
      {t > 86.3 && t < 109.6 && (
        <AbsoluteFill style={{opacity: win(t, 86.3, 109.6, 0.4)}}>
          <Abs x={0} y={490} w={1080} style={{textAlign: 'center'}}><T size={54}>4 grandes missions</T></Abs>
          {MISSIONS.map(([n, d, ic, at, c], k) => {
            const q = spring(t, at, 6, 12);
            const active = t >= at && (k === 3 || t < MISSIONS[k + 1][3]);
            const col = k % 2, row = Math.floor(k / 2);
            return (
              <Abs key={n} x={70 + col * 480} y={590 + row * 520} w={460} h={490} style={{perspective: 1200}}>
                <div style={{width: '100%', height: '100%', transformStyle: 'preserve-3d', transform: `rotateY(${(1 - q) * 180}deg) scale(${active ? 1.03 : 0.97})`}}>
                  {/* dos */}
                  <div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', borderRadius: 26, background: `repeating-linear-gradient(45deg, #17294A 0 20px, #1D3358 20px 40px)`, border: '6px solid #2C4A7A'}} />
                  {/* face */}
                  <div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden', borderRadius: 26, background: `linear-gradient(170deg, ${c}, #0F2240 70%)`, border: `6px solid ${active ? '#fff' : `${c}88`}`, overflow: 'hidden', boxShadow: active ? `0 0 50px ${c}` : 'none'}}>
                    <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 260, overflow: 'hidden'}}>
                      <Img src={staticFile(CUT)} style={{position: 'absolute', left: 60, top: -10, height: 420, filter: k === 3 ? 'saturate(1.3) hue-rotate(-15deg)' : undefined}} />
                      <div style={{position: 'absolute', right: 14, top: 14, width: 100, height: 100, borderRadius: 50, background: 'rgba(255,255,255,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={ic} size={70} /></div>
                    </div>
                    <div style={{position: 'absolute', left: 20, right: 20, top: 270}}>
                      <T size={38}>{n}</T>
                      <Hand size={30} color={DIM}>{d}</Hand>
                      {['Expertise', 'Terrain'].map((st, j) => <div key={st} style={{display: 'flex', alignItems: 'center', gap: 10, marginTop: 10}}><div style={{width: 110, fontFamily: sansFont, fontWeight: 800, fontSize: 20, color: DIM}}>{st}</div><div style={{flex: 1, height: 12, borderRadius: 6, background: 'rgba(255,255,255,0.15)'}}><div style={{height: '100%', borderRadius: 6, background: '#fff', width: `${prog(t, at + 0.4, at + 1.2) * (70 + random(`st${k}${j}`) * 30)}%`}} /></div></div>)}
                    </div>
                  </div>
                </div>
              </Abs>
            );
          })}
        </AbsoluteFill>
      )}
      {/* variété : stories */}
      {t > 109.4 && (() => {
        const ST: [string, string, string, number][] = [['Un jour', 'Audit sur la ligne de production', 'loupe', 113.6], ['Le lendemain', 'Session de formation', 'megaphone', 117.0], ['La semaine d’après', 'Projet environnemental', 'feuille', 119.6]];
        const cur = ST.reduce((a, s0, k) => (t >= s0[3] ? k : a), 0);
        const s0 = ST[cur];
        return (
          <AbsoluteFill style={{opacity: pop(t, 109.4)}}>
            <Abs x={0} y={490} w={1080} style={{textAlign: 'center'}}><T size={54}>La <span style={{color: LIME}}>variété</span> : zéro routine</T></Abs>
            <Abs x={190} y={600} w={700} h={1000} style={{borderRadius: 44, overflow: 'hidden', border: '8px solid #0A1324', boxShadow: '0 30px 70px rgba(0,0,0,0.5)', background: '#0F2240'}}>
              <Img src={staticFile(PHOTO)} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${1.1 + (t - s0[3]) * 0.03}) translateX(${cur * -20}px)`, filter: ['none', 'hue-rotate(160deg) saturate(0.8)', 'hue-rotate(60deg) saturate(1.2)'][cur]}} />
              <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.45), transparent 30%, transparent 60%, rgba(0,0,0,0.75))'}} />
              {/* barres de progression des stories */}
              <div style={{position: 'absolute', left: 20, right: 20, top: 20, display: 'flex', gap: 8}}>
                {ST.map((x, k) => <div key={k} style={{flex: 1, height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.35)'}}><div style={{height: '100%', borderRadius: 4, background: '#fff', width: `${k < cur ? 100 : k === cur ? Math.min(100, ((t - x[3]) / ((ST[k + 1]?.[3] ?? 123.3) - x[3])) * 100) : 0}%`}} /></div>)}
              </div>
              <div style={{position: 'absolute', left: 24, top: 46, display: 'flex', alignItems: 'center', gap: 12}}><div style={{width: 56, height: 56, borderRadius: 28, overflow: 'hidden', border: `3px solid ${LIME}`}}><Img src={staticFile(PHOTO)} style={{width: 56, height: 80, objectFit: 'cover'}} /></div><T size={26}>ingenieur.qhse</T></div>
              <div style={{position: 'absolute', left: 30, right: 30, bottom: 40}} key={cur}>
                <div style={{display: 'flex', alignItems: 'center', gap: 14, transform: `translateY(${(1 - pop(t, s0[3], 0.5)) * 40}px)`, opacity: pop(t, s0[3])}}><div style={{width: 90, height: 90, borderRadius: 45, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={s0[2]} size={64} /></div><div><Hand size={36} color={LIME}>{s0[0]}</Hand><T size={44}>{s0[1]}</T></div></div>
              </div>
            </Abs>
            {t > 123.2 && <Row y={1440}><Chip c={ORANGE} q={spring(t, 123.3)}>Totalement transversal</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Chapitre 3 : arbre de compétences + portrait scindé ─────────── */
const C3: React.FC = () => {
  const t = useT();
  const o = win(t, 128.4, 172.7, 0.4);
  if (o <= 0) return null;
  const NODES: [string, string, number, number, number][] = [
    ['Formation solide', 'ecole', 133.3, 540, 1440],
    ['Diplôme d’ingénieur · Bac+5', 'diplome', 135.4, 300, 1180],
    ['Master spécialisé QHSE', 'livres', 141.9, 780, 1180],
    ['Stages', 'casque', 149.7, 300, 900],
    ['Alternance', 'outils', 150.3, 780, 900],
  ];
  const xp = prog(t, 133.3, 152.0, (x) => x);
  return (
    <AbsoluteFill style={{opacity: o}}>
      {t < 152.9 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 152.5, 152.9)}}>
          <Abs x={0} y={490} w={1080} style={{textAlign: 'center'}}><T size={54}>Le parcours, niveau par niveau</T></Abs>
          {/* barre d'XP */}
          <Abs x={140} y={590} w={800} h={56} style={{borderRadius: 28, background: 'rgba(255,255,255,0.1)', border: `3px solid ${LIME}`, overflow: 'hidden'}}>
            <div style={{height: '100%', width: `${xp * 100}%`, background: `linear-gradient(90deg, ${TEAL}, ${LIME})`}} />
            <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={28} color={BG}>XP · {Math.round(xp * 100)} %</T></div>
          </Abs>
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            {[[0, 1], [0, 2], [1, 3], [2, 4], [1, 4], [2, 3]].map(([a, b], k) => {
              const A = NODES[a], B = NODES[b];
              const on = t > B[2];
              return <line key={k} x1={A[3]} y1={A[4]} x2={B[3]} y2={B[4]} stroke={on ? LIME : 'rgba(255,255,255,0.15)'} strokeWidth={on ? 8 : 4} strokeDasharray={on ? undefined : '10 10'} />;
            })}
          </svg>
          {NODES.map(([l, ic, at, x, y]) => {
            const on = t > at;
            return (
              <Abs key={l} x={x - 130} y={y - 110} w={260} style={{textAlign: 'center'}}>
                <div style={{width: 150, height: 150, margin: '0 auto', borderRadius: 30, transform: `rotate(45deg) scale(${on ? 1 + 0.06 * Math.sin((t - at) * 6) * Math.exp(-(t - at)) : 0.85})`, background: on ? `linear-gradient(135deg, ${TEAL}, #0C6E66)` : '#1A2C4A', border: `5px solid ${on ? LIME : '#2C4266'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: on ? `0 0 40px ${LIME}66` : 'none'}}><div style={{transform: 'rotate(-45deg)', opacity: on ? 1 : 0.3}}><F n={ic} size={80} /></div></div>
                <div style={{marginTop: 18, fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: on ? '#fff' : '#5D7194'}}>{l}</div>
              </Abs>
            );
          })}
          {t > 148.1 && <Abs x={0} y={720} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Chip c={ORANGE} q={spring(t, 148.1)} size={32}>La vraie clé : le terrain</Chip></Abs>}
        </AbsoluteFill>
      )}
      {/* portrait scindé */}
      {t > 152.7 && (() => {
        const H = 1050, EX = 540 - (H * PW) / PH / 2 + 20, EY = 560;
        const split = prog(t, 154.4, 155.4, easeInOut) * 40;
        return (
          <AbsoluteFill style={{opacity: pop(t, 152.7)}}>
            <Abs x={0} y={470} w={1080} style={{textAlign: 'center'}}><T size={54}>Une <span style={{color: LIME}}>dualité</span></T></Abs>
            <div style={{position: 'absolute', inset: 0, clipPath: 'inset(0 50% 0 0)', transform: `translateX(${-split}px)`}}>
              <Eng x={EX} y={EY} h={H} filter="grayscale(1) sepia(1) hue-rotate(170deg) saturate(3) brightness(0.9)" />
            </div>
            <div style={{position: 'absolute', inset: 0, clipPath: 'inset(0 0 0 50%)', transform: `translateX(${split}px)`}}>
              <Eng x={EX} y={EY} h={H} filter="sepia(0.6) saturate(1.4) hue-rotate(-10deg)" />
            </div>
            <Abs x={540 - 3} y={560} w={6} h={1050} style={{background: `linear-gradient(180deg, transparent, ${LIME}, transparent)`, opacity: split / 40}} />
            <Abs x={30} y={600} w={330}>
              <T size={34} color="#7FB2FF">HARD SKILLS</T>
              {[['Normes ISO', 156.2], ['Analyse de risque', 158.6], ['Réglementation', 161.6]].map(([l, at]) => <div key={l as string} style={{marginTop: 14, padding: '10px 16px', borderRadius: 14, background: 'rgba(91,140,255,0.25)', border: '2px solid #5B8CFF', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: '#fff', transform: `translateX(${(1 - pop(t, at as number)) * -300}px)`, opacity: pop(t, at as number)}}>{l}</div>)}
            </Abs>
            <Abs x={720} y={600} w={330} style={{textAlign: 'right'}}>
              <T size={34} color={ORANGE}>SOFT SKILLS</T>
              {[['Communicant', 165.0], ['Rigoureux', 166.2], ["Vision d'ensemble", 166.9], ['Fédérer les équipes', 169.7]].map(([l, at]) => <div key={l as string} style={{marginTop: 14, padding: '10px 16px', borderRadius: 14, background: 'rgba(255,138,31,0.22)', border: `2px solid ${ORANGE}`, fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: '#fff', transform: `translateX(${(1 - pop(t, at as number)) * 300}px)`, opacity: pop(t, at as number)}}>{l}</div>)}
            </Abs>
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Chapitre 4 : salaire (courbe boursière) + rose des vents ─────────── */
const C4: React.FC = () => {
  const t = useT();
  const o = win(t, 175.3, 232.5, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {t < 211.4 && (() => {
        const draw = prog(t, 182.0, 209.0, (x) => x);
        const pts: [number, number][] = [[80, 1330], [180, 1300], [260, 1310], [340, 1240], [420, 1250], [500, 1160], [580, 1170], [660, 1060], [740, 1030], [820, 920], [900, 860], [990, 760]];
        const n = Math.max(2, Math.ceil(draw * pts.length));
        const path = pts.slice(0, n).map((p, k) => `${k ? 'L' : 'M'}${p[0]} ${p[1]}`).join(' ');
        const last = pts[n - 1];
        return (
          <AbsoluteFill style={{opacity: 1 - prog(t, 211.0, 211.4)}}>
            <Abs x={0} y={480} w={1080} style={{textAlign: 'center'}}><T size={52}>La reconnaissance de l'expertise</T></Abs>
            {/* bandeau défilant */}
            <Abs x={0} y={580} w={1080} h={64} style={{background: '#06101F', borderTop: `2px solid ${ORANGE}`, borderBottom: `2px solid ${ORANGE}`, overflow: 'hidden'}}>
              <div style={{position: 'absolute', top: 12, left: 1080 - ((t - 175) * 160) % 2600, whiteSpace: 'nowrap', fontFamily: 'monospace', fontWeight: 700, fontSize: 34, color: ORANGE}}>QHSE JUNIOR ▲ 35–45 k€ · CHIMIE ▲ · NUCLÉAIRE ▲ · SENIOR / DIRECTEUR ▲ 85 k€+ · EXPERTISE VALORISÉE ▲ · QHSE JUNIOR ▲ 35–45 k€ ·</div>
            </Abs>
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
              {Array.from({length: 6}, (_, k) => <line key={k} x1={60} x2={1020} y1={760 + k * 120} y2={760 + k * 120} stroke="rgba(255,255,255,0.08)" strokeWidth={2} />)}
              <path d={`${path} L${last[0]} 1400 L80 1400 Z`} fill={`${ORANGE}22`} />
              <path d={path} fill="none" stroke={ORANGE} strokeWidth={8} strokeLinejoin="round" strokeLinecap="round" />
              <circle cx={last[0]} cy={last[1]} r={16 + 4 * Math.sin(t * 6)} fill={ORANGE} />
            </svg>
            {t > 184.4 && <Abs x={60} y={1130} style={{transform: `scale(${spring(t, 184.5)})`, transformOrigin: '0 100%'}}><div style={{...Glass, padding: '16px 24px', background: 'rgba(11,27,51,0.9)'}}><Hand size={32} color={DIM}>Débutant</Hand><T size={60} color={ORANGE}>35–45 k€</T><T size={24} color={DIM}>brut / an</T></div></Abs>}
            {t > 192.2 && t < 201.8 && <Abs x={380} y={1440} style={{transform: `scale(${spring(t, 192.2)})`}}><Chip c="#5B8CFF" size={30}>Chimie · Nucléaire : départ plus élevé</Chip></Abs>}
            {t > 207.8 && <Abs x={660} y={680} style={{transform: `scale(${spring(t, 207.9)})`}}><div style={{...Glass, padding: '16px 24px', background: 'rgba(11,27,51,0.9)', border: `3px solid ${LIME}`}}><Hand size={32} color={DIM}>Senior · directeur</Hand><T size={60} color={LIME}>85 k€ +</T></div></Abs>}
            <Abs x={0} y={1500} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Src q={pop(t, 185)} /></Abs>
          </AbsoluteFill>
        );
      })()}
      {/* rose des vents des carrières */}
      {t > 211.2 && (() => {
        const DIRS: [string, string, number, number][] = [['Progression hiérarchique', 'directeur', 216.6, 0], ['Hyper spécialiste', 'microscope', 222.1, 90], ['Conseil', 'poignee', 228.1, 180], ['Entrepreneuriat', 'fusee', 229.2, 270]];
        const cur = DIRS.reduce((a, d, k) => (t >= d[2] ? k : a), -1);
        const needle = cur < 0 ? (t - 211) * 200 : DIRS[cur][3] + Math.sin((t - DIRS[cur][2]) * 9) * 18 * Math.exp(-(t - DIRS[cur][2]) * 2);
        return (
          <AbsoluteFill style={{opacity: pop(t, 211.2)}}>
            <Abs x={0} y={480} w={1080} style={{textAlign: 'center'}}><T size={54}>Un vrai <span style={{color: ORANGE}}>carrefour</span> de carrière</T></Abs>
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
              <circle cx={540} cy={1080} r={250} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.2)" strokeWidth={4} />
              <circle cx={540} cy={1080} r={180} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={2} strokeDasharray="6 10" />
              {[0, 90, 180, 270].map((a) => <path key={a} d="M540 830 L570 1050 L540 1080 L510 1050 Z" fill="rgba(255,255,255,0.12)" transform={`rotate(${a} 540 1080)`} />)}
              <g transform={`rotate(${needle} 540 1080)`}><path d="M540 860 L575 1080 L540 1110 L505 1080 Z" fill={ORANGE} /><path d="M540 1300 L575 1080 L540 1050 L505 1080 Z" fill="#E6ECF5" /></g>
              <circle cx={540} cy={1080} r={22} fill={BG} stroke="#fff" strokeWidth={4} />
            </svg>
            {DIRS.map(([l, ic, at, a], k) => {
              const rad = ((a - 90) * Math.PI) / 180;
              const x = 540 + Math.cos(rad) * 360, y = 1080 + Math.sin(rad) * 380;
              const on = t >= at;
              return (
                <Abs key={l} x={x - 110} y={y - 80} w={220} style={{textAlign: 'center', opacity: on ? 1 : 0.35, transform: `scale(${on ? 0.9 + 0.1 * spring(t, at) : 0.85})`}}>
                  <div style={{width: 110, height: 110, margin: '0 auto', borderRadius: 55, background: on ? '#fff' : 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: k === cur ? `0 0 0 6px ${ORANGE}` : 'none'}}><F n={ic} size={74} /></div>
                  <div style={{marginTop: 8, fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: '#fff'}}>{l}</div>
                </Abs>
              );
            })}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Chapitre 5 : défis de demain ─────────── */
const C5: React.FC = () => {
  const t = useT();
  const o = win(t, 235.1, 290.9, 0.4);
  if (o <= 0) return null;
  const C = '#B57BFF';
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* transition écologique : thermomètre CO2 qui baisse, feuilles */}
      {t < 261.0 && (() => {
        const co2 = 1 - 0.7 * prog(t, 257.4, 260.0, easeInOut);
        return (
          <AbsoluteFill style={{opacity: 1 - prog(t, 260.6, 261.0)}}>
            <Abs x={0} y={480} w={1080} style={{textAlign: 'center'}}><T size={40} color={C}>DÉFI N° 1</T><T size={70} style={{transform: `scale(${spring(t, 246.0)})`}}>La transition écologique</T></Abs>
            <Eng x={40} y={760} h={850} />
            <Abs x={640} y={700} w={140} h={700} style={{borderRadius: 70, background: 'rgba(255,255,255,0.08)', border: '5px solid rgba(255,255,255,0.3)', overflow: 'hidden'}}>
              <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: `${co2 * 100}%`, background: `linear-gradient(180deg, ${co2 > 0.6 ? '#FF5A5A' : LIME}, ${co2 > 0.6 ? '#B22' : TEAL})`}} />
              <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={40} style={{transform: 'rotate(-90deg)', whiteSpace: 'nowrap'}}>CO₂</T></div>
            </Abs>
            {[['Stratégie RSE', 255.2, TEAL], ['Décarbonation', 257.4, LIME], ['Économie circulaire', 259.3, ORANGE]].map(([l, at, c], k) => <Abs key={l as string} x={810} y={760 + k * 150} style={{transform: `translateX(${(1 - spring(t, at as number)) * 400}px)`}}><div style={{width: 230, padding: '12px 14px', borderRadius: 18, background: c as string, fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: c === LIME ? BG : '#fff', textAlign: 'center'}}>{l}</div></Abs>)}
            {t > 259.3 && <Abs x={830} y={1230} style={{transform: `rotate(${t * 60}deg) scale(${spring(t, 259.4)})`}}><F n="recyclage" size={160} /></Abs>}
          </AbsoluteFill>
        );
      })()}
      {/* technologie : casque VR + scan IA + capteurs IoT sur la photo */}
      {t > 260.8 && t < 276.0 && (() => {
        const H = 1150, EX = 540 - (H * PW) / PH / 2, EY = 560;
        const sc = H / PH;
        const scan = ((t - 262.7) * 0.6) % 1;
        const vr = spring(t, 267.8, 6, 12);
        return (
          <AbsoluteFill style={{opacity: win(t, 260.8, 276.0, 0.4)}}>
            <PhotoBg o={0.5} tint="#120B2A" />
            <Eng x={EX} y={EY} h={H} />
            <Abs x={0} y={470} w={1080} style={{textAlign: 'center'}}><T size={60}>La technologie change tout</T></Abs>
            {/* scan IA */}
            {t > 262.7 && t < 267.6 && (
              <>
                <Abs x={EX + 150 * sc} y={EY + (60 + scan * 500) * sc} w={460 * sc} h={6} style={{background: C, boxShadow: `0 0 30px ${C}`}} />
                <Abs x={EX + 170 * sc} y={EY + 150 * sc} w={360 * sc} h={330 * sc} style={{border: `4px solid ${C}`, borderRadius: 12}} />
                <Abs x={60} y={760}><Chip c={C} size={30} q={spring(t, 262.7)}>IA : prédire les accidents</Chip></Abs>
              </>
            )}
            {/* capteurs connectés */}
            {t > 265.3 && [[150, 640], [470, 800], [330, 120]].map(([px, py], k) => {
              const x = EX + px * sc, y = EY + py * sc;
              const q = ((t - 265.3) * 0.9 + k / 3) % 1;
              return <React.Fragment key={k}><Abs x={x - 14} y={y - 14} w={28} h={28} style={{borderRadius: 14, background: TEAL, boxShadow: `0 0 20px ${TEAL}`}} /><Abs x={x - 60 * q} y={y - 60 * q} w={120 * q} h={120 * q} style={{borderRadius: '50%', border: `3px solid ${TEAL}`, opacity: 1 - q}} /></React.Fragment>;
            })}
            {t > 265.3 && <Abs x={660} y={1150}><Chip c={TEAL} size={30} q={spring(t, 265.4)}>IoT : temps réel</Chip></Abs>}
            {/* casque VR posé sur les yeux */}
            {t > 267.8 && (
              <Abs x={EX + 225 * sc} y={EY + (175 - (1 - vr) * 300) * sc} w={260 * sc} h={95 * sc} style={{borderRadius: 30, background: 'linear-gradient(180deg, #2D2A3E, #14121E)', border: `4px solid ${C}`, boxShadow: `0 0 40px ${C}AA`, opacity: Math.min(1, vr * 2)}}>
                <div style={{position: 'absolute', left: 16, right: 16, top: 18, bottom: 18, borderRadius: 18, background: `linear-gradient(90deg, ${C}, #6E8BFF, ${TEAL})`, opacity: 0.6 + 0.3 * Math.sin(t * 4)}} />
              </Abs>
            )}
            {t > 267.8 && <Abs x={60} y={1350}><Chip c="#6E8BFF" size={30} q={spring(t, 268.0)}>Réalité virtuelle : formation immersive</Chip></Abs>}
            {t > 274.0 && <Row y={1500}><Chip c={LIME} dark size={32} q={spring(t, 274.0)}>Plus efficace · plus prédictif</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
      {/* globalisation : globe 3D */}
      {t > 275.8 && (() => {
        const rot = (t - 275.8) * 40;
        const FL: [string, number, number, string][] = [['FR', 10, 48, '#2E5BFF'], ['US', -95, 38, '#E23B3B'], ['JP', 138, 36, '#fff'], ['BR', -50, -12, '#1FA84F'], ['ZA', 25, -28, '#F2B705'], ['IN', 78, 22, '#FF8A1F']];
        return (
          <AbsoluteFill style={{opacity: pop(t, 275.8)}}>
            <Abs x={0} y={480} w={1080} style={{textAlign: 'center'}}><T size={40} color={C}>DERNIER DÉFI</T><T size={70} style={{transform: `scale(${spring(t, 277.9)})`}}>La globalisation</T></Abs>
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
              <defs><radialGradient id="gl" cx="0.35" cy="0.3"><stop offset="0" stopColor="#3A6FD8" /><stop offset="1" stopColor="#0A1E4A" /></radialGradient></defs>
              <circle cx={540} cy={1060} r={330} fill="url(#gl)" stroke="#6E8BFF" strokeWidth={4} />
              {Array.from({length: 7}, (_, k) => { const lon = ((k * 30 + rot) % 180) - 90; const rx = Math.abs(Math.sin((lon * Math.PI) / 180)) * 330; return <ellipse key={k} cx={540} cy={1060} rx={rx} ry={330} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth={2} />; })}
              {[-60, -30, 0, 30, 60].map((lat) => { const y = 1060 - Math.sin((lat * Math.PI) / 180) * 330; const rx = Math.cos((lat * Math.PI) / 180) * 330; return <ellipse key={lat} cx={540} cy={y} rx={rx} ry={rx * 0.12} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={2} />; })}
            </svg>
            {FL.map(([n, lon, lat, c], k) => {
              const a = ((lon + rot) * Math.PI) / 180;
              const z = Math.cos(a) * Math.cos((lat * Math.PI) / 180);
              const x = 540 + Math.sin(a) * Math.cos((lat * Math.PI) / 180) * 330, y = 1060 - Math.sin((lat * Math.PI) / 180) * 330;
              if (z < -0.1 || t < 283.7 + k * 0.15) return null;
              return <Abs key={n} x={x - 36} y={y - 70} w={72} style={{textAlign: 'center', opacity: Math.min(1, (z + 0.1) * 3), transform: `scale(${0.6 + 0.4 * z})`}}><div style={{width: 72, height: 48, borderRadius: 8, background: c, border: '3px solid #fff', fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: c === '#fff' ? '#E23B3B' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{n}</div><div style={{width: 4, height: 24, background: '#fff', margin: '0 auto'}} /></Abs>;
            })}
            <Row y={1430} gap={12}>
              <Chip c={C} size={30} q={spring(t, 283.7)}>Réglementations</Chip>
              <Chip c={TEAL} size={30} q={spring(t, 284.7)}>Cultures de travail</Chip>
            </Row>
            {t > 288.7 && <Row y={1530}><Hand size={44} color={LIME} style={{opacity: pop(t, 288.7)}}>un enrichissement énorme</Hand></Row>}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Conclusion : couverture finale ─────────── */
const Concl: React.FC = () => {
  const t = useT();
  if (t < 290.9) return null;
  const o = pop(t, 291.0, 0.6);
  const H = 1150, EX = 540 - (H * PW) / PH / 2 + 10, EY = 600;
  return (
    <AbsoluteFill style={{opacity: o}}>
      <PhotoBg scale={1.3 + (t - 291) * 0.01} />
      <Abs x={0} y={330} w={1080} style={{textAlign: 'center', opacity: prog(t, 299.8, 301.0)}}>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 250, color: LIME, letterSpacing: -6, lineHeight: 1, opacity: 0.95}}>QHSE</div>
      </Abs>
      <Eng x={EX} y={EY} h={H} style={{transform: `scale(${1 + (t - 291) * 0.003})`, transformOrigin: '50% 100%'}} />
      <Abs x={0} y={1350} w={1080} h={570} style={{background: `linear-gradient(180deg, transparent, ${BG}F0 30%, ${BG})`}} />
      {[['Stratégique', 295.2, -6, 60, 640], ['Technique', 296.0, 5, 720, 760], ['Humain', 297.5, -4, 80, 900]].map(([l, at, r, x, y]) => <Abs key={l as string} x={x as number} y={y as number} style={{transform: `rotate(${r}deg) scale(${spring(t, at as number, 8, 18)})`}}><Chip c={[TEAL, '#5B8CFF', ORANGE][[295.2, 296.0, 297.5].indexOf(at as number)]} size={36}>{l}</Chip></Abs>)}
      <Abs x={60} y={1420} w={960} style={{textAlign: 'center'}}>
        <Hand size={48} color={DIM} style={{opacity: pop(t, 300.3)}}>Architecte de la performance durable</Hand>
        <T size={110} color={LIME} style={{textTransform: 'uppercase', transform: `scale(${spring(t, 305.4)})`}}>Indispensable</T>
      </Abs>
    </AbsoluteFill>
  );
};

/* ─────────── En-tête ─────────── */
const Header: React.FC = () => {
  const t = useT();
  const ch = CH.find((c) => t >= c.at + IRIS - 0.3 && t < c.end);
  return (
    <AbsoluteFill style={{zIndex: 40, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 440, background: `linear-gradient(180deg, ${BG}F2, ${BG}99 60%, transparent)`}} />
      <div style={{position: 'absolute', left: '50%', top: 95, transform: 'translateX(-50%)', background: '#fff', borderRadius: 26, padding: '10px 28px'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div>
      {ch && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 240, display: 'flex', justifyContent: 'center', opacity: pop(t, ch.at + IRIS - 0.3) * (1 - prog(t, ch.end - 0.3, ch.end))}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 14, padding: '8px 24px 8px 8px', borderRadius: 40, background: 'rgba(11,27,51,0.8)', border: `2px solid ${ch.c}`}}>
            <div style={{width: 56, height: 56, borderRadius: 28, background: ch.c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: ch.c === LIME ? BG : '#fff'}}>{ch.n}</div>
            <T size={34}>{ch.l}</T>
          </div>
        </div>
      )}
      {t > 20.9 && t < 290.9 && (
        <div style={{position: 'absolute', left: 160, right: 160, top: 330, display: 'flex', gap: 10, opacity: pop(t, 20.9) * (1 - prog(t, 290.5, 290.9))}}>
          {CH.map((c) => <div key={c.n} style={{flex: 1, height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.12)', overflow: 'hidden'}}><div style={{height: '100%', width: `${prog(t, c.at, c.end, (v) => v) * 100}%`, background: c.c}} /></div>)}
        </div>
      )}
    </AbsoluteFill>
  );
};

const Bg: React.FC = () => {
  const t = useT();
  const ch = CH.find((c) => t >= c.at && t < c.end);
  const c = ch ? ch.c : TEAL;
  return (
    <AbsoluteFill style={{background: BG}}>
      <AbsoluteFill style={{backgroundImage: 'linear-gradient(rgba(255,255,255,0.035) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.035) 2px, transparent 2px)', backgroundSize: '72px 72px', backgroundPosition: `0 ${-t * 6}px`}} />
      <AbsoluteFill style={{background: `radial-gradient(circle at 85% 20%, ${c}2E, transparent 45%), radial-gradient(circle at 10% 85%, ${c}22, transparent 45%)`}} />
    </AbsoluteFill>
  );
};

const OutroFade: React.FC = () => {
  const t = useT();
  return <AbsoluteFill style={{background: 'linear-gradient(180deg, #FBFAF6 0%, #F1EDE3 100%)', zIndex: 80, opacity: prog(t, OUTRO_AT - 0.5, OUTRO_AT)}} />;
};

const CUES: Sfx[] = [
  {at: 0.05, s: 'signature', v: 0.35}, {at: 2.2, s: 'soft-whoosh', v: 0.5, dur: 2},
  {at: 3.6, s: 'sfx/swish', v: 0.3}, {at: 7.0, s: 'tick', v: 0.35}, {at: 10.6, s: 'tick', v: 0.35}, {at: 12.1, s: 'tick', v: 0.35},
  {at: 13.1, s: 'sfx/whoosh', v: 0.35}, {at: 17.4, s: 'validation', v: 0.32},
  ...CH.flatMap((c) => [{at: c.at, s: 'sfx/click', v: 0.5}, {at: c.at + 0.05, s: 'soft-whoosh', v: 0.45, dur: 1.5}, {at: c.at + 0.55, s: 'bass-hit', v: 0.35}, {at: c.at + IRIS - 0.5, s: 'sfx/click', v: 0.45}]),
  {at: 23.5, s: 'sfx/rise', v: 0.25}, {at: 27.9, s: 'sfx/pop', v: 0.3}, {at: 31.2, s: 'sfx/ding', v: 0.35}, {at: 35.6, s: 'sfx/pop', v: 0.28}, {at: 36.6, s: 'sfx/pop', v: 0.28},
  {at: 44.6, s: 'sfx/pop', v: 0.28}, {at: 45.6, s: 'sfx/pop', v: 0.28}, {at: 48.3, s: 'sfx/pop', v: 0.28},
  {at: 61.3, s: 'sfx/swish', v: 0.3}, {at: 63.3, s: 'sfx/pop', v: 0.3}, {at: 64.3, s: 'sfx/pop', v: 0.3}, ...Array.from({length: 8}, (_, k) => ({at: 63.6 + k * 0.4, s: 'sfx/thud', v: 0.2})),
  ...[71.1, 71.7, 72.4, 73.0].map((at) => ({at, s: 'sfx/thud', v: 0.4})), {at: 81.0, s: 'sfx/pop', v: 0.3}, {at: 83.0, s: 'sfx/rise', v: 0.25},
  ...MISSIONS.map((m) => ({at: m[3], s: 'page', v: 0.45})), ...MISSIONS.map((m) => ({at: m[3] + 0.4, s: 'sfx/ding', v: 0.25})),
  {at: 109.4, s: 'soft-whoosh', v: 0.4, dur: 1.5}, {at: 113.6, s: 'sfx/swish', v: 0.3}, {at: 117.0, s: 'sfx/swish', v: 0.3}, {at: 119.6, s: 'sfx/swish', v: 0.3}, {at: 123.3, s: 'sfx/pop', v: 0.3},
  ...[133.3, 135.4, 141.9, 149.7, 150.3].map((at) => ({at, s: 'validation', v: 0.32})), {at: 148.1, s: 'sfx/pop', v: 0.3},
  {at: 154.4, s: 'soft-whoosh', v: 0.4, dur: 1.5}, ...[156.2, 158.6, 161.6].map((at) => ({at, s: 'sfx/swish', v: 0.25})), ...[165.0, 166.2, 166.9, 169.7].map((at) => ({at, s: 'sfx/swish', v: 0.25})),
  {at: 182.0, s: 'riser', v: 0.15, dur: 8}, {at: 184.5, s: 'bass-hit', v: 0.4}, {at: 192.2, s: 'sfx/pop', v: 0.3}, {at: 197.6, s: 'sfx/rise', v: 0.25}, {at: 207.9, s: 'bass-hit', v: 0.45},
  {at: 211.4, s: 'soft-whoosh', v: 0.4, dur: 1.5}, ...[216.6, 222.1, 228.1, 229.2].map((at) => ({at, s: 'tick', v: 0.35})), ...[216.7, 222.2, 228.2, 229.3].map((at) => ({at, s: 'sfx/pop', v: 0.28})),
  {at: 246.0, s: 'sfx/pop', v: 0.3}, ...[255.2, 257.4, 259.3].map((at) => ({at, s: 'sfx/swish', v: 0.3})), {at: 257.6, s: 'sfx/rise', v: 0.25},
  {at: 262.7, s: 'tension', v: 0.18, dur: 4.5}, {at: 265.4, s: 'notification', v: 0.3}, {at: 267.8, s: 'sfx/whoosh', v: 0.35}, {at: 268.4, s: 'sfx/thud', v: 0.35}, {at: 274.0, s: 'validation', v: 0.32},
  {at: 277.9, s: 'bass-hit', v: 0.35}, ...Array.from({length: 6}, (_, k) => ({at: 283.7 + k * 0.15, s: 'sfx/pop', v: 0.25})),
  {at: 291.0, s: 'soft-whoosh', v: 0.5, dur: 2}, ...[295.2, 296.0, 297.5].map((at) => ({at, s: 'tampon', v: 0.45})), {at: 300.0, s: 'sfx/rise', v: 0.25}, {at: 305.4, s: 'bass-hit', v: 0.5},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const IngenieurQhse: React.FC = () => (
  <AbsoluteFill style={{background: BG}}>
    <Bg />
    <Gate from={0} to={21.2}><Hook /></Gate>
    <Gate from={23.2} to={52.5}><C1 /></Gate>
    <Gate from={54.9} to={126}><C2 /></Gate>
    <Gate from={128.3} to={173}><C3 /></Gate>
    <Gate from={175.2} to={232.7}><C4 /></Gate>
    <Gate from={235} to={291}><C5 /></Gate>
    <Gate from={290.8} to={OUTRO_AT}><Concl /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    {CH.map((c) => <Gate key={c.n} from={c.at} to={c.at + IRIS + 0.1}><IrisCard ch={c} /></Gate>)}
    <Gate from={0} to={3.0}><Cover /></Gate>
    <Gate from={OUTRO_AT - 0.5} to={999}><OutroFade /></Gate>
    <Gate from={OUTRO_AT} to={999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.3} to={OUTRO_AT}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-ingenieur-qhse-origine.m4a')} trimAfter={s(309.2)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);
