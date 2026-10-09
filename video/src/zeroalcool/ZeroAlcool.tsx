import React from 'react';
import {AbsoluteFill, Audio, Img, random, staticFile} from 'remotion';
import {easeIn, easeInOut, easeOut, Gate, kf, prog, useT} from '../anim';
import {Captions} from '../components/Captions';
import {Check} from '../identui/IdentUi';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {handFont, s, sansFont} from '../theme';
import {captions} from './captions';

/**
 * « Zéro alcool : sécurité d'abord » (5 min 38) — voix d'origine, sous-titres recalés mot à mot. Habillage sombre
 * « du bar à la lumière ». Techniques nouvelles : capsule de bouteille qui saute pour ouvrir chaque partie, grille de
 * 764 silhouettes qui s'éteignent, iceberg, bouchon qui saute, étiquette de prix qui se balance, vision double avec
 * distorsion ondulante (filtre SVG turbulence), déchiqueteuse qui broie l'argument « tradition », machine à écrire
 * qui inscrit le risque dans le DUERP, mauvaise herbe arrachée avec ses racines, cartons jaune et rouge, boomerang,
 * 4 planètes en orbite autour de la prévention, mocktail qui se compose, chaîne humaine, 3 piliers, tir à la corde.
 * Les chiffres sont ceux cités par la vidéo d'origine.
 */
const LOGO = 'promo/logo.png';
const OUTRO_AT = 338.6;
export const ZEROALCOOL_FRAMES = s(OUTRO_AT + 3.8);
const BG = '#17121F';
const INK = '#F6F1E9';
const DIM = 'rgba(246,241,233,0.62)';
const AMB = '#FFB020';
const RED = '#FF4D5E';
const SAFE = '#2BD9A6';

type Pt = {n: number; l: string; at: number; end: number; c: string};
const PT: Pt[] = [
  {n: 1, l: 'Un risque sous-estimé', at: 59.4, end: 121.6, c: '#FF8A3D'},
  {n: 2, l: "La responsabilité de l'employeur", at: 121.8, end: 184.7, c: '#7C8CFF'},
  {n: 3, l: "L'option zéro alcool", at: 184.9, end: 226.8, c: RED},
  {n: 4, l: 'Prévenir, pas punir', at: 227.0, end: 287.7, c: SAFE},
  {n: 5, l: "L'affaire de tous", at: 287.9, end: 315.8, c: AMB},
];
const CAP = 2.9;

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
const Card: React.CSSProperties = {background: 'rgba(255,255,255,0.06)', border: '2px solid rgba(255,255,255,0.12)', borderRadius: 32, boxShadow: '0 24px 60px rgba(0,0,0,0.35)', backdropFilter: 'blur(6px)'};
const Chip: React.FC<{children: React.ReactNode; c?: string; q?: number; size?: number; dark?: boolean; style?: React.CSSProperties}> = ({children, c = AMB, q = 1, size = 38, dark, style}) => (
  <div style={{display: 'inline-flex', alignItems: 'center', gap: 12, padding: '14px 28px', borderRadius: 50, background: c, color: dark ? '#17121F' : '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: size, transform: `scale(${q})`, boxShadow: `0 12px 34px ${c}66`, whiteSpace: 'nowrap', ...style}}>{children}</div>
);
const Row: React.FC<{y: number; children: React.ReactNode; gap?: number}> = ({y, children, gap = 18}) => (
  <Abs x={0} y={y} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap, flexWrap: 'wrap', padding: '0 40px', boxSizing: 'border-box'}}>{children}</Abs>
);
const Src: React.FC<{q?: number}> = ({q = 1}) => <div style={{opacity: 0.75 * q}}><Hand size={30} color={DIM}>chiffre cité par la vidéo d'origine</Hand></div>;

/** Verre stylisé (vin / bière / mocktail). */
const Glass: React.FC<{w: number; fill: string; level?: number; crack?: number; kind?: 'vin' | 'biere'}> = ({w, fill, level = 0.6, crack = 0, kind = 'vin'}) => (
  <svg width={w} height={w * 1.5} viewBox="0 0 100 150">
    {kind === 'vin' ? (
      <>
        <defs><clipPath id={`gv${fill}`}><path d="M18 8 L82 8 Q84 60 50 72 Q16 60 18 8 Z" /></clipPath></defs>
        <rect x={0} y={72 - 64 * level} width={100} height={80} fill={fill} clipPath={`url(#gv${fill})`} />
        <path d="M18 8 L82 8 Q84 60 50 72 Q16 60 18 8 Z" fill="rgba(255,255,255,0.12)" stroke="#fff" strokeWidth={3} />
        <line x1={50} y1={72} x2={50} y2={132} stroke="#fff" strokeWidth={4} />
        <ellipse cx={50} cy={136} rx={26} ry={6} fill="none" stroke="#fff" strokeWidth={4} />
      </>
    ) : (
      <>
        <defs><clipPath id={`gb${fill}`}><path d="M22 20 L78 20 L72 140 L28 140 Z" /></clipPath></defs>
        <rect x={0} y={140 - 120 * level} width={100} height={130} fill={fill} clipPath={`url(#gb${fill})`} />
        <path d="M22 20 L78 20 L72 140 L28 140 Z" fill="rgba(255,255,255,0.1)" stroke="#fff" strokeWidth={3} />
        <path d="M78 45 Q98 50 94 80 Q90 100 74 100" fill="none" stroke="#fff" strokeWidth={4} />
      </>
    )}
    {crack > 0 && <path d="M50 12 L44 26 L56 34 L46 48 L54 58" fill="none" stroke="#fff" strokeWidth={2.5} pathLength={1} strokeDasharray={`${crack} 1`} />}
  </svg>
);

/* ─────────── Couverture ─────────── */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: BG, opacity: 1 - out, transform: `scale(${1 + out * 0.1})`}}>
      <AbsoluteFill style={{background: `radial-gradient(circle at 50% 32%, ${RED}40, transparent 50%), radial-gradient(circle at 50% 90%, ${SAFE}30, transparent 45%)`}} />
      <Abs x={0} y={95} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      {/* emblème : verre barré dans un bouclier */}
      <Abs x={290} y={300} w={500} h={560} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <svg width={500} height={560} viewBox="0 0 100 112" style={{position: 'absolute'}}>
          <path d="M50 4 L92 18 L92 52 Q92 88 50 108 Q8 88 8 52 L8 18 Z" fill={`${SAFE}22`} stroke={SAFE} strokeWidth={3.5} />
        </svg>
        <div style={{position: 'relative', transform: `rotate(${Math.sin(t * 2) * 4}deg)`}}>
          <Glass w={200} fill={AMB} level={0.6} />
          <div style={{position: 'absolute', left: -50, top: 110, width: 300, height: 26, borderRadius: 13, background: RED, transform: 'rotate(-38deg)', boxShadow: '0 6px 20px rgba(0,0,0,0.4)'}} />
        </div>
      </Abs>
      <Abs x={60} y={900} w={960} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: RED, color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: 34, letterSpacing: 3}}>PRÉVENTION DES RISQUES</div>
        <T size={170} style={{marginTop: 26, letterSpacing: -4, textTransform: 'uppercase'}}>Zéro alcool</T>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, marginTop: 6}}>
          <div style={{width: 70, height: 8, borderRadius: 4, background: SAFE}} />
          <T size={66} color={SAFE} style={{textTransform: 'uppercase', whiteSpace: 'nowrap'}}>Sécurité d'abord</T>
          <div style={{width: 70, height: 8, borderRadius: 4, background: SAFE}} />
        </div>
        <Hand size={56} color={DIM} style={{marginTop: 26}}>Convivialité, responsabilité, prévention</Hand>
      </Abs>
    </AbsoluteFill>
  );
};

/* ─────────── Cartes de partie : la capsule qui saute ─────────── */
const CapCard: React.FC<{p: Pt}> = ({p}) => {
  const t = useT();
  const a = p.at, b = p.at + CAP;
  if (t < a || t > b) return null;
  const inQ = prog(t, a, a + 0.5, easeOut);
  const flip = prog(t, a + 0.4, a + 0.9, easeInOut);
  const fly = prog(t, a + 1.0, a + 1.5, easeIn);
  const out = prog(t, b - 0.45, b, easeIn);
  const teeth = Array.from({length: 21}, (_, k) => {
    const ang = (k / 21) * Math.PI * 2;
    return `${50 + 48 * Math.cos(ang)},${50 + 48 * Math.sin(ang)} ${50 + 40 * Math.cos(ang + Math.PI / 21)},${50 + 40 * Math.sin(ang + Math.PI / 21)}`;
  }).join(' ');
  return (
    <AbsoluteFill style={{zIndex: 55, background: `radial-gradient(circle at 50% 45%, ${p.c}, ${BG} 75%)`, opacity: 1 - out, clipPath: `circle(${inQ * 150}% at 50% 45%)`}}>
      {/* titre révélé sous la capsule */}
      <Abs x={60} y={560} w={960} style={{textAlign: 'center', opacity: fly}}>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 360, color: '#fff', lineHeight: 1, textShadow: '0 20px 60px rgba(0,0,0,0.35)', transform: `scale(${0.6 + 0.4 * spring(t, a + 1.1)})`}}>{p.n}</div>
        <div style={{display: 'inline-block', padding: '8px 24px', borderRadius: 40, background: 'rgba(0,0,0,0.35)', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: '#fff', letterSpacing: 2, marginTop: 10}}>PARTIE {p.n}/5</div>
        <T size={96} style={{marginTop: 26, textShadow: '0 10px 30px rgba(0,0,0,0.3)'}}>{p.l}</T>
      </Abs>
      {/* capsule */}
      <div style={{position: 'absolute', left: 540 - 220, top: 760 - 220 - fly * 1400, width: 440, height: 440, perspective: 1200, transform: `rotate(${fly * 220}deg)`}}>
        <div style={{width: 440, height: 440, transformStyle: 'preserve-3d', transform: `rotateY(${flip * 180}deg) scale(${0.3 + 0.7 * spring(t, a + 0.05)})`}}>
          <svg width={440} height={440} viewBox="0 0 100 100" style={{position: 'absolute', backfaceVisibility: 'hidden'}}>
            <polygon points={teeth} fill="#C9CED8" stroke="#8D94A3" strokeWidth={1.5} />
            <circle cx={50} cy={50} r={36} fill={RED} stroke="#fff" strokeWidth={2} />
            <text x={50} y={58} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={22} fill="#fff">0 %</text>
          </svg>
          <svg width={440} height={440} viewBox="0 0 100 100" style={{position: 'absolute', backfaceVisibility: 'hidden', transform: 'rotateY(180deg)'}}>
            <polygon points={teeth} fill="#E6E9EF" stroke="#8D94A3" strokeWidth={1.5} />
            <circle cx={50} cy={50} r={36} fill="#F7F8FA" />
            <text x={50} y={64} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={44} fill={p.c}>{p.n}</text>
          </svg>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ─────────── Introduction + 764 ─────────── */
const Intro: React.FC = () => {
  const t = useT();
  const o = 1 - prog(t, 59.0, 59.4);
  if (o <= 0) return null;
  const clink = spring(t, 3.3, 6, 18);
  const slide = prog(t, 12.9, 14.4, easeIn);
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* verres qui trinquent puis glissent hors du comptoir */}
      {t < 16.6 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 16.2, 16.6)}}>
          <Abs x={60} y={1380} w={960} h={26} style={{borderRadius: 13, background: 'linear-gradient(90deg, #6B4226, #8B5A34, #6B4226)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', opacity: pop(t, 2.4)}} />
          {[-1, 1].map((sd) => {
            const x = 540 + sd * (60 + 220 * (1 - clink)) - 110 + slide * 1200 * sd;
            return (
              <Abs key={sd} x={x} y={1050} style={{transform: `rotate(${sd * -14 * (1 - Math.min(1, clink))}deg)`, opacity: pop(t, 2.5)}}>
                <Glass w={220} fill={sd < 0 ? '#C2185B' : AMB} kind={sd < 0 ? 'vin' : 'biere'} crack={prog(t, 7.9, 8.6)} level={0.6} />
              </Abs>
            );
          })}
          {t > 3.4 && t < 5.5 && Array.from({length: 12}, (_, k) => {
            const a = (k / 12) * Math.PI * 2, r = 60 + (t - 3.4) * 260;
            return <Abs key={k} x={540 + Math.cos(a) * r - 8} y={1110 + Math.sin(a) * r - 8} w={16} h={16} style={{borderRadius: 8, background: AMB, opacity: 1 - (t - 3.4) / 2.1}} />;
          })}
          <Row y={600}>
            <Chip c={AMB} dark q={spring(t, 3.3)}>Convivialité</Chip>
            <Chip c="#C2185B" q={spring(t, 5.0)}>Fête</Chip>
          </Row>
          {t > 7.9 && <Row y={760}><Chip c={RED} q={spring(t, 7.9)}>…ou drame</Chip></Row>}
          {t > 15.4 && (
            <Abs x={0} y={880} w={1080} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20}}>
              <div style={{transform: `scale(${spring(t, 15.5, 8, 18)})`}}><F n="bouclier" size={260} /></div>
              <T size={58} color={SAFE} style={{textTransform: 'uppercase', whiteSpace: 'nowrap', transform: `scale(${spring(t, 15.7)})`}}>La sécurité avant tout</T>
            </Abs>
          )}
        </AbsoluteFill>
      )}
      {/* 764 */}
      {t > 16.6 && t < 47.4 && (() => {
        const q = win(t, 16.6, 47.4, 0.4);
        const shown = Math.floor(764 * prog(t, 18.7, 22.0, easeInOut));
        const grey = prog(t, 40.8, 43.0);
        const COLS = 28;
        const lens = prog(t, 44.0, 46.5, easeInOut);
        return (
          <AbsoluteFill style={{opacity: q}}>
            <Abs x={0} y={560} w={1080} style={{textAlign: 'center'}}>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 230, color: t > 29.7 ? RED : INK, lineHeight: 1, textShadow: t > 29.7 ? `0 0 60px ${RED}88` : 'none', transform: `scale(${spring(t, 18.6, 6, 12)})`}}>{t < 22 ? shown : 764}</div>
              {t > 29.7 && <T size={44} style={{transform: `scale(${spring(t, 29.7)})`}}>accidents du travail mortels</T>}
              {t > 33.2 && <T size={40} color={AMB} style={{marginTop: 6}}>France · 2024</T>}
              {t > 33.2 && <Src q={pop(t, 33.6)} />}
            </Abs>
            {/* grille de 764 silhouettes */}
            <div style={{position: 'absolute', left: 66, top: 975, width: 948, display: 'flex', flexWrap: 'wrap', gap: 3}}>
              {Array.from({length: 764}, (_, k) => {
                const on = k < shown || t >= 22;
                const g = random(`g${k}`) < grey;
                return <svg key={k} width={20} height={24} viewBox="0 0 30 36" style={{opacity: on ? 1 : 0.06}}><circle cx={15} cy={7} r={6} fill={g ? '#4A4458' : t > 29.7 ? RED : AMB} /><path d="M5 34 Q5 16 15 16 Q25 16 25 34 Z" fill={g ? '#4A4458' : t > 29.7 ? RED : AMB} /></svg>;
              })}
            </div>
            {t > 36.3 && t < 40.6 && <Row y={1240}><Chip c={RED} q={spring(t, 36.3)}>764 personnes</Chip></Row>}
            {t > 40.8 && t < 44.0 && <Row y={1240}><Hand size={58} style={{opacity: pop(t, 40.8), background: 'rgba(23,18,31,0.85)', padding: '6px 24px', borderRadius: 20}}>…jamais rentrées chez elles</Hand></Row>}
            {lens > 0 && (
              <Abs x={140 + lens * 600} y={1080 + Math.sin(lens * 6) * 120} w={260} h={260} style={{borderRadius: 130, border: `14px solid ${INK}`, background: 'rgba(255,255,255,0.08)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <T size={60}>?</T>
                <div style={{position: 'absolute', right: -70, bottom: -70, width: 110, height: 28, borderRadius: 14, background: INK, transform: 'rotate(45deg)'}} />
              </Abs>
            )}
          </AbsoluteFill>
        );
      })()}
      {/* et si l'alcool ? → iceberg (sous-estimé) */}
      {t > 47.2 && (
        <AbsoluteFill style={{opacity: pop(t, 47.2)}}>
          <Abs x={0} y={580} w={1080} style={{textAlign: 'center'}}>
            <Hand size={52} color={DIM}>Et si la cause était sous nos yeux…</Hand>
            <T size={86} color={AMB} style={{transform: `scale(${spring(t, 51.0)})`}}>l'alcool ?</T>
          </Abs>
          <Abs x={0} y={820} w={1080} style={{display: 'flex', justifyContent: 'center', transform: `translateY(${(1 - spring(t, 51.2)) * 300}px)`}}>
            <div style={{transform: `rotate(${Math.sin(t * 3) * 8}deg)`}}><Glass w={170} fill={AMB} kind="biere" level={0.75} /></div>
          </Abs>
          {t > 57.4 && <Row y={1180}><Chip c={RED} q={spring(t, 57.6)}>Impact sous-estimé</Chip></Row>}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Partie 1 : risque sous-estimé ─────────── */
const P1: React.FC = () => {
  const t = useT();
  const o = win(t, 62.2, 121.6, 0.4);
  if (o <= 0) return null;
  const C = '#FF8A3D';
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* iceberg */}
      {t < 71.6 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 71.2, 71.6)}}>
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            <defs><linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1F4E79" /><stop offset="1" stopColor="#0B1A33" /></linearGradient></defs>
            <rect x={0} y={900} width={1080} height={720} fill="url(#sea)" opacity={pop(t, 62.4)} />
            <path d={`M0 900 ${Array.from({length: 28}, (_, k) => `L${k * 40} ${900 + Math.sin(k * 0.8 + t * 3) * 8}`).join(' ')} L1080 900`} stroke="#8EC9FF" strokeWidth={6} fill="none" />
            <g transform={`translate(540 900) scale(${spring(t, 62.6, 5, 10)})`}>
              <path d="M-90 0 L-20 -170 L30 -120 L90 0 Z" fill="#EAF6FF" />
              <path d="M-380 0 L380 0 L300 260 L160 560 L-120 600 L-330 300 Z" fill="#9FD3F7" opacity={prog(t, 63.8, 65.2)} />
            </g>
          </svg>
          <Abs x={600} y={700} style={{transform: `scale(${spring(t, 68.2)})`}}><Chip c={AMB} dark size={34}>Convivialité</Chip></Abs>
          {t > 63.8 && <Abs x={0} y={1180} w={1080} style={{textAlign: 'center', opacity: prog(t, 64.4, 65.2)}}><T size={60} color="#0B1A33">Le risque caché</T></Abs>}
        </AbsoluteFill>
      )}
      {/* pot de départ : bouchon qui saute */}
      {t > 71.4 && t < 83.4 && (
        <AbsoluteFill style={{opacity: win(t, 71.4, 83.4, 0.4)}}>
          <Abs x={360} y={900} w={360} h={560} style={{transform: `rotate(${-8 + Math.sin(t * 6) * (t < 75 ? 3 : 0)}deg)`}}>
            <svg width={360} height={560} viewBox="0 0 90 140"><path d="M38 0 L52 0 L52 30 Q70 44 70 64 L70 136 Q70 140 66 140 L24 140 Q20 140 20 136 L20 64 Q20 44 38 30 Z" fill="#1E5631" stroke="#fff" strokeWidth={2} /><rect x={20} y={74} width={50} height={36} fill="#F2E6C9" /><text x={45} y={97} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={11} fill="#1E5631">POT</text></svg>
          </Abs>
          {/* bouchon */}
          <Abs x={505 + prog(t, 75.0, 76.2) * 260} y={880 - Math.sin(prog(t, 75.0, 76.2) * Math.PI) * 420 - prog(t, 75.0, 76.2) * 100} w={50} h={60} style={{borderRadius: 12, background: '#C9A26B', transform: `rotate(${prog(t, 75.0, 76.2) * 720}deg)`}} />
          {t > 75.0 && Array.from({length: 26}, (_, k) => {
            const q = Math.min(1, (t - 75.0) / 1.6);
            const a = -Math.PI / 2 + (random(`c${k}`) - 0.5) * 1.8;
            const r = 100 + random(`r${k}`) * 420;
            return <Abs key={k} x={540 + Math.cos(a) * r * q} y={880 + Math.sin(a) * r * q + q * q * 260} w={18} h={10} style={{background: ['#FFB020', '#FF4D5E', '#2BD9A6', '#7C8CFF'][k % 4], transform: `rotate(${k * 40 + t * 300}deg)`, opacity: 1 - prog(t, 77.5, 78.5)}} />;
          })}
          <Row y={600}><Chip c={C} q={spring(t, 71.8)}>Pot de départ</Chip><Chip c="#7C8CFF" q={spring(t, 73.2)}>Gros contrat</Chip></Row>
          {t > 76.3 && <Row y={1500}><Chip c={INK} dark q={spring(t, 76.4)}>Rituel · cohésion · culture</Chip></Row>}
          {/* étiquette de prix */}
          {t > 81.3 && (
            <Abs x={680} y={760} style={{transformOrigin: '0 0', transform: `rotate(${18 * Math.exp(-(t - 81.3) * 1.2) * Math.sin((t - 81.3) * 6) + 8}deg) scale(${spring(t, 81.3)})`}}>
              <div style={{width: 4, height: 80, background: INK, marginLeft: 20}} />
              <div style={{width: 240, height: 130, borderRadius: '20px 60px 60px 20px', background: AMB, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 14px 30px rgba(0,0,0,0.4)'}}><T size={44} color={BG}>Prix ? </T></div>
            </Abs>
          )}
        </AbsoluteFill>
      )}
      {/* 10 à 20 % : grille de 100 accidents */}
      {t > 83.3 && t < 99.6 && (
        <AbsoluteFill style={{opacity: win(t, 83.3, 99.6, 0.4)}}>
          <Abs x={0} y={570} w={1080} style={{textAlign: 'center'}}>
            <T size={40} color={DIM}>Accidents du travail liés à l'alcool</T>
            <T size={150} color={C} style={{transform: `scale(${spring(t, 87.2)})`}}>10 à 20 %</T>
            <Src q={pop(t, 88)} />
          </Abs>
          <div style={{position: 'absolute', left: 240, top: 920, width: 600, display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 8}}>
            {Array.from({length: 100}, (_, k) => {
              const app = pop(t, 84.0 + k * 0.025, 0.2);
              const hot = k < 10 ? prog(t, 87.6, 88.4) : k < 20 ? prog(t, 88.4, 89.4) * 0.6 : 0;
              return <div key={k} style={{height: 52, borderRadius: 10, background: hot > 0 ? `rgba(255,138,61,${0.35 + 0.65 * hot})` : 'rgba(255,255,255,0.12)', transform: `scale(${app})`, boxShadow: hot > 0.5 ? `0 0 16px ${C}` : 'none'}} />;
            })}
          </div>
          {t > 93.0 && t < 95.0 && <Row y={1540}><Hand size={50} color={DIM} style={{textDecoration: 'line-through'}}>petit détail</Hand></Row>}
          {t > 95.1 && <Row y={1520}><Chip c={RED} q={spring(t, 95.1)}>Une cause majeure</Chip></Row>}
        </AbsoluteFill>
      )}
      {/* 4 verres → risque ×2 */}
      {t > 99.5 && t < 111.4 && (() => {
        const g = prog(t, 103.8, 104.8, easeOut);
        return (
          <AbsoluteFill style={{opacity: win(t, 99.5, 111.4, 0.4)}}>
            <Row y={600} gap={30}>
              {[0, 1, 2, 3].map((k) => <div key={k} style={{transform: `translateY(${(1 - spring(t, 100.6 + k * 0.25)) * -400}px)`}}><Glass w={120} fill="#C2185B" level={0.6} /></div>)}
            </Row>
            <Row y={890}><T size={50}>4 verres par jour</T><F n="homme-bureau" size={90} /></Row>
            <svg width={1080} height={560} style={{position: 'absolute', left: 0, top: 1000}}>
              <path d="M240 420 A300 300 0 0 1 840 420" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={50} strokeLinecap="round" />
              <path d="M240 420 A300 300 0 0 1 840 420" fill="none" stroke={RED} strokeWidth={50} strokeLinecap="round" pathLength={1} strokeDasharray={`${0.3 + 0.4 * g} 1`} />
              <g transform={`translate(540 420) rotate(${180 * (0.3 + 0.4 * g)})`}><line x1={0} y1={0} x2={-250} y2={0} stroke={INK} strokeWidth={12} strokeLinecap="round" transform="rotate(0)" /></g>
              <circle cx={540} cy={420} r={26} fill={INK} />
              <text x={540} y={330} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={110} fill={RED} opacity={g}>×2</text>
              <text x={540} y={510} textAnchor="middle" fontFamily={sansFont} fontWeight={800} fontSize={34} fill={DIM}>risque d'accident grave</text>
            </svg>
            {t > 106.4 && <Abs x={0} y={1490} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 16, alignItems: 'center', transform: `scale(${spring(t, 106.5)})`}}><F n="femme-bureau" size={80} /><Chip c="#C2185B" size={34}>Pour une femme : seuil plus bas</Chip></Abs>}
          </AbsoluteFill>
        );
      })()}
      {/* vigilance qui baisse : vision double + distorsion */}
      {t > 110.6 && (() => {
        const blur = prog(t, 111.6, 113.0);
        const black = prog(t, 115.0, 115.6);
        return (
          <AbsoluteFill style={{opacity: win(t, 110.6, 121.6, 0.4)}}>
            <svg width={0} height={0} style={{position: 'absolute'}}>
              <filter id="drunk"><feTurbulence type="fractalNoise" baseFrequency={`${0.006 + 0.004 * Math.sin(t * 2)} 0.02`} numOctaves={2} seed={Math.floor(t * 6)} /><feDisplacementMap in="SourceGraphic" scale={blur * 40} /></filter>
            </svg>
            <div style={{position: 'absolute', inset: 0, filter: blur > 0.02 ? 'url(#drunk)' : undefined}}>
              {[0, 1].map((k) => (
                <div key={k} style={{position: 'absolute', inset: 0, transform: `translate(${k ? blur * 30 * Math.sin(t * 2) : 0}px, ${k ? blur * 10 : 0}px)`, opacity: k ? 0.45 * blur : 1, mixBlendMode: k ? 'screen' : 'normal'}}>
                  <Abs x={90} y={640} w={900} h={620} style={{borderRadius: 36, background: 'linear-gradient(180deg, #2B2540, #1E1A2C)', overflow: 'hidden'}}>
                    <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 200, background: 'repeating-linear-gradient(90deg, #F2C200 0 60px, #222 60px 120px)', opacity: 0.85}} />
                    <div style={{position: 'absolute', left: 120, bottom: 170}}><F n="chariot" size={220} /></div>
                    <div style={{position: 'absolute', right: 140, bottom: 180}}><F n="ouvrier" size={220} /></div>
                    <div style={{position: 'absolute', left: 380, top: 60}}><F n="danger" size={150} /></div>
                  </Abs>
                </div>
              ))}
            </div>
            <Row y={560}><Chip c="#7C8CFF" q={spring(t, 111.6)}>Vigilance qui baisse</Chip></Row>
            {t > 112.9 && (
              <Abs x={140} y={1320} w={800} h={70} style={{borderRadius: 35, background: 'rgba(255,255,255,0.1)', overflow: 'hidden'}}>
                <div style={{height: '100%', width: `${30 + 60 * prog(t, 113.0, 114.6)}%`, background: `linear-gradient(90deg, ${AMB}, ${RED})`, borderRadius: 35}} />
                <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={32}>Temps de réaction</T></div>
              </Abs>
            )}
            <AbsoluteFill style={{background: '#000', opacity: black * 0.85}} />
            {t > 115.0 && t < 118.4 && <Row y={900}><T size={110} color={RED} style={{transform: `scale(${spring(t, 115.1)})`, textShadow: `0 0 50px ${RED}`}}>FATAL</T></Row>}
            {t > 118.4 && <Abs x={0} y={760} w={1080} style={{textAlign: 'center'}}><T size={84} style={{transform: `scale(${spring(t, 118.6)})`}}>Qui est responsable ?</T></Abs>}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Partie 2 : responsabilité ─────────── */
const P2: React.FC = () => {
  const t = useT();
  const o = win(t, 124.6, 184.7, 0.4);
  if (o <= 0) return null;
  const C = '#7C8CFF';
  const book = prog(t, 127.6, 128.6, easeOut);
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* le Code du travail s'ouvre */}
      {t < 145.3 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 144.9, 145.3)}}>
          <div style={{position: 'absolute', left: 140, top: 600, width: 800, height: 520, perspective: 1600}}>
            <div style={{position: 'absolute', left: 400, top: 0, width: 400, height: 520, background: '#F4EEDF', borderRadius: '0 20px 20px 0', boxShadow: '0 20px 50px rgba(0,0,0,0.4)', padding: 30, boxSizing: 'border-box'}}>
              <T size={30} color="#3B3355" style={{opacity: pop(t, 131.1)}}>OBLIGATION DE SÉCURITÉ</T>
              {Array.from({length: 7}, (_, k) => <div key={k} style={{height: 10, borderRadius: 5, background: '#D9CFBC', marginTop: 20, width: `${60 + random(`b${k}`) * 40}%`}} />)}
            </div>
            <div style={{position: 'absolute', left: 400, top: 0, width: 400, height: 520, transformOrigin: '0 50%', transform: `rotateY(${-180 * book}deg)`, transformStyle: 'preserve-3d'}}>
              <div style={{position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${C}, #4B55B8)`, borderRadius: '0 20px 20px 0', backfaceVisibility: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}><T size={46} style={{textAlign: 'center'}}>CODE DU TRAVAIL</T><F n="balance" size={150} /></div>
              <div style={{position: 'absolute', inset: 0, background: '#ECE4D1', borderRadius: '20px 0 0 20px', transform: 'rotateY(180deg)', backfaceVisibility: 'hidden', padding: 30, boxSizing: 'border-box'}}>
                <T size={30} color="#3B3355">L'EMPLOYEUR</T>
                {Array.from({length: 7}, (_, k) => <div key={k} style={{height: 10, borderRadius: 5, background: '#D9CFBC', marginTop: 20, width: `${60 + random(`a${k}`) * 40}%`}} />)}
              </div>
            </div>
          </div>
          {t > 131.1 && <Row y={1160}><Chip c={C} q={spring(t, 131.1)}><F n="bouclier" size={44} />Obligation de sécurité</Chip></Row>}
          {t > 138.2 && <Row y={1290}><F n="cerveau" size={90} /><T size={40}>+</T><F n="coeur" size={90} /><Hand size={44} color={DIM} style={{opacity: pop(t, 138.4)}}>santé physique et mentale</Hand></Row>}
          {t > 141.0 && (
            <Row y={1430} gap={26}>
              <div style={{opacity: 0.5, transform: `scale(${spring(t, 141.0)})`}}><Hand size={44} color={DIM} style={{textDecoration: 'line-through'}}>faire de son mieux</Hand></div>
              <Chip c={RED} q={spring(t, 143.1)}><F n="cible" size={44} />Obligation de résultat</Chip>
            </Row>
          )}
        </AbsoluteFill>
      )}
      {/* déchiqueteuse : l'argument « tradition » */}
      {t > 145.2 && t < 161.2 && (() => {
        const shred = prog(t, 150.3, 152.4, easeIn);
        return (
          <AbsoluteFill style={{opacity: win(t, 145.2, 161.2, 0.4)}}>
            <Abs x={0} y={570} w={1080} style={{textAlign: 'center'}}><Hand size={50} color={DIM}>« Ah, mais c'est la tradition… »</Hand></Abs>
            {/* feuille */}
            <Abs x={290} y={700 + shred * 330} w={500} h={340} style={{clipPath: `inset(0 0 ${shred * 100}% 0)`, background: '#F4EEDF', borderRadius: 18, padding: 30, boxSizing: 'border-box', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', transform: `scale(${spring(t, 147.9)})`}}>
              <T size={64} color="#3B3355" style={{textAlign: 'center'}}>TRADITION</T>
              <T size={34} color="#6B6380" style={{textAlign: 'center', marginTop: 8}}>c'est convivial !</T>
            </Abs>
            {/* lanières qui sortent */}
            {shred > 0 && Array.from({length: 12}, (_, k) => <Abs key={k} x={300 + k * 40} y={1130} w={30} h={shred * 300} style={{background: '#F4EEDF', borderRadius: 4, transform: `rotate(${(random(`s${k}`) - 0.5) * 12 * shred}deg)`, transformOrigin: '50% 0'}} />)}
            {/* machine */}
            <Abs x={220} y={1020} w={640} h={130} style={{borderRadius: 24, background: 'linear-gradient(180deg, #3B3355, #241F34)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)'}}>
              <div style={{position: 'absolute', left: 60, right: 60, top: 0, height: 16, background: '#0D0A14', borderRadius: 8}} />
              <div style={{position: 'absolute', right: 30, top: 50, width: 30, height: 30, borderRadius: 15, background: shred > 0 && shred < 1 ? RED : '#4A4458'}} />
            </Abs>
            <Row y={1470}><F n="juge" size={100} /><Chip c={RED} q={spring(t, 150.3)}>Rien devant un tribunal</Chip></Row>
            {t > 153.4 && <Row y={1360}><Hand size={46} color={AMB} style={{opacity: pop(t, 153.4)}}>aucune protection juridique</Hand></Row>}
          </AbsoluteFill>
        );
      })()}
      {/* conséquences + DUERP à la machine à écrire */}
      {t > 161.0 && (
        <AbsoluteFill style={{opacity: pop(t, 161.0)}}>
          {t < 171.6 && (
            <AbsoluteFill style={{opacity: 1 - prog(t, 171.2, 171.6)}}>
              <Abs x={0} y={580} w={1080} style={{textAlign: 'center'}}><T size={70} color={RED}>Des conséquences lourdes</T></Abs>
              <Row y={760} gap={30}>
                {[['Responsabilité civile', 'argent', 163.5], ['Responsabilité pénale', 'juge2', 164.4]].map(([l, ic, at]) => <div key={l} style={{...Card, width: 400, padding: 30, textAlign: 'center', transform: `scale(${spring(t, at as number)})`}}><F n={ic as string} size={130} /><T size={36} style={{marginTop: 10}}>{l}</T></div>)}
              </Row>
              <Row y={1140} gap={16}>
                {[['Séminaires', 167.3], ['Fêtes de fin d’année', 168.0], ['Hors des locaux', 170.0]].map(([l, at]) => <Chip key={l as string} c={AMB} dark size={32} q={spring(t, at as number)}>{l}</Chip>)}
              </Row>
            </AbsoluteFill>
          )}
          {t > 171.5 && (() => {
            const txt = 'Risque alcool';
            const n = Math.floor(txt.length * prog(t, 173.6, 175.6, (x) => x));
            return (
              <AbsoluteFill style={{opacity: pop(t, 171.5)}}>
                <Abs x={0} y={580} w={1080} style={{textAlign: 'center'}}><Hand size={50} color={DIM}>Obligation administrative</Hand><T size={84} color={AMB} style={{transform: `scale(${spring(t, 176.4)})`}}>le DUERP</T></Abs>
                <Abs x={150} y={820} w={780} h={420} style={{background: '#F4EEDF', borderRadius: 18, padding: 30, boxSizing: 'border-box', boxShadow: '0 20px 50px rgba(0,0,0,0.4)'}}>
                  <div style={{display: 'grid', gridTemplateColumns: '1.3fr 1fr 1fr', gap: 0, border: '3px solid #3B3355', fontFamily: 'Courier New, monospace', fontWeight: 700, fontSize: 28, color: '#3B3355'}}>
                    {['Risque', 'Gravité', 'Mesures', 'Chute', '●●●', '✓', 'Bruit', '●●', '✓'].map((c, k) => <div key={k} style={{padding: '14px 12px', borderRight: k % 3 < 2 ? '2px solid #3B3355' : 'none', borderBottom: '2px solid #3B3355', background: k < 3 ? '#E3D9C4' : 'transparent'}}>{c}</div>)}
                    <div style={{padding: '14px 12px', borderRight: '2px solid #3B3355', color: RED}}>{txt.slice(0, n)}{Math.floor(t * 3) % 2 ? '|' : ''}</div>
                    <div style={{padding: '14px 12px', borderRight: '2px solid #3B3355', color: RED}}>{t > 175.8 ? '●●●' : ''}</div>
                    <div style={{padding: '14px 12px', color: RED}}>{t > 176.4 ? 'à définir' : ''}</div>
                  </div>
                </Abs>
                <Abs x={330} y={1260} w={420} h={170} style={{borderRadius: 24, background: 'linear-gradient(180deg, #3B3355, #241F34)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', transform: `translateY(${Math.floor(t * 12) % 2 && t > 173.6 && t < 175.6 ? 4 : 0}px)`}}>
                  {Array.from({length: 3}, (_, r) => <div key={r} style={{display: 'flex', gap: 8, justifyContent: 'center', marginTop: r ? 10 : 20}}>{Array.from({length: 8 - r}, (_, k) => <div key={k} style={{width: 30, height: 30, borderRadius: 15, background: '#D9D2E6'}} />)}</div>)}
                </Abs>
              </AbsoluteFill>
            );
          })()}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Partie 3 : zéro alcool ─────────── */
const P3: React.FC = () => {
  const t = useT();
  const o = win(t, 187.6, 226.8, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {t < 206.1 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 205.7, 206.1)}}>
          <Abs x={0} y={570} w={1080} style={{textAlign: 'center'}}>
            <Hand size={48} color={DIM}>Un cas concret : un grand groupe</Hand>
            <T size={70} style={{transform: `scale(${spring(t, 192.3)})`}}>Une décision radicale</T>
          </Abs>
          {/* le grand zéro */}
          <Abs x={0} y={780} w={1080} style={{display: 'flex', justifyContent: 'center'}}>
            <div style={{position: 'relative', width: 420, height: 420, transform: `scale(${spring(t, 194.5, 6, 12)})`}}>
              <svg width={420} height={420} viewBox="0 0 100 100"><circle cx={50} cy={50} r={40} fill="none" stroke={RED} strokeWidth={14} pathLength={1} strokeDasharray={`${prog(t, 194.6, 196.2)} 1`} transform="rotate(-90 50 50)" /></svg>
              <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={64} color={INK} style={{textAlign: 'center'}}>Tolérance<br />zéro</T></div>
            </div>
          </Abs>
          <Row y={1220}><Chip c={INK} dark size={34} q={spring(t, 194.5)}>Depuis janvier 2026</Chip></Row>
          {t > 198.9 && <Row y={1330} gap={10}>{Array.from({length: 6}, (_, k) => <div key={k} style={{transform: `scale(${spring(t, 198.9 + k * 0.12)})`, position: 'relative'}}><F n="usine" size={86} /><div style={{position: 'absolute', right: -8, top: -8, width: 40, height: 40, borderRadius: 20, background: RED, border: '4px solid #fff', boxSizing: 'border-box'}}><div style={{position: 'absolute', left: 4, right: 4, top: 14, height: 5, background: '#fff'}} /></div></div>)}<Hand size={40} color={DIM}>tous les sites</Hand></Row>}
          {t > 204.9 && <Row y={1480}><div style={{transform: `scale(${spring(t, 204.9, 8, 18)}) rotate(-4deg)`, border: `8px solid ${RED}`, borderRadius: 18, padding: '6px 26px'}}><T size={56} color={RED}>NON NÉGOCIABLE</T></div></Row>}
        </AbsoluteFill>
      )}
      {/* loi vs zéro alcool, puis la racine arrachée */}
      {t > 206.0 && (() => {
        const pull = prog(t, 220.7, 222.4, easeIn);
        return (
          <AbsoluteFill style={{opacity: pop(t, 206.0)}}>
            <Abs x={0} y={570} w={1080} style={{textAlign: 'center'}}><T size={56}>Plus loin que la loi</T></Abs>
            <Row y={680} gap={24}>
              <div style={{...Card, width: 440, padding: 26, textAlign: 'center'}}>
                <T size={34} color="#7C8CFF">CODE DU TRAVAIL</T>
                <div style={{display: 'flex', justifyContent: 'center', gap: 10, marginTop: 14}}>
                  {[['vin', '#C2185B', 211.9], ['biere', AMB, 213.2], ['biere', '#E8C26B', 213.9]].map(([k, c, at], i) => <div key={i} style={{transform: `scale(${spring(t, at as number)})`}}><Glass w={80} fill={c as string} kind={k as 'vin' | 'biere'} /></div>)}
                </div>
                <Hand size={34} color={DIM}>vin, bière, cidre… autorisés</Hand>
              </div>
              <div style={{...Card, width: 440, padding: 26, textAlign: 'center', borderColor: RED, transform: `scale(${spring(t, 215.6)})`}}>
                <T size={34} color={RED}>ZÉRO ALCOOL</T>
                <div style={{position: 'relative', display: 'inline-block', marginTop: 14}}><Glass w={80} fill={AMB} kind="biere" /><div style={{position: 'absolute', left: -20, top: 50, width: 130, height: 14, borderRadius: 7, background: RED, transform: 'rotate(-38deg)'}} /></div>
                <Hand size={34} color={DIM}>interdiction totale</Hand>
              </div>
            </Row>
            {/* gérer → supprimer : mauvaise herbe arrachée */}
            <Abs x={0} y={1140} w={1080} h={460}>
              <div style={{position: 'absolute', left: 0, right: 0, top: 220, height: 240, background: 'linear-gradient(180deg, #4A3426, #2C1F17)'}} />
              <div style={{position: 'absolute', left: 440, top: 40 - pull * 520, width: 200, height: 420, opacity: t > 218.0 ? 1 - prog(t, 223.5, 224.5) : 0, transform: `rotate(${pull * 20}deg)`}}>
                <svg width={200} height={420} viewBox="0 0 100 210">
                  <path d="M50 110 Q48 60 50 20" stroke="#5E8C31" strokeWidth={6} fill="none" />
                  <path d="M50 60 Q20 40 14 18 Q40 26 50 50" fill="#7DB346" /><path d="M50 50 Q80 30 88 8 Q60 16 50 40" fill="#7DB346" />
                  <path d="M50 110 Q40 140 26 170 M50 110 Q52 150 48 200 M50 110 Q64 140 80 168 M44 140 Q30 150 18 150" stroke="#C9A97A" strokeWidth={4} fill="none" />
                  <text x={50} y={100} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={14} fill="#fff">RISQUE</text>
                </svg>
              </div>
              {t > 219.0 && <div style={{position: 'absolute', left: 60, top: 40, opacity: pop(t, 219.0)}}><Chip c="#7C8CFF" size={32}>Gérer le risque</Chip></div>}
              {t > 220.7 && <div style={{position: 'absolute', right: 60, top: 40}}><Chip c={RED} size={32} q={spring(t, 220.7)}>Le supprimer à la racine</Chip></div>}
            </Abs>
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Partie 4 : prévenir, pas punir ─────────── */
const P4: React.FC = () => {
  const t = useT();
  const o = win(t, 229.8, 287.7, 0.4);
  if (o <= 0) return null;
  const C = SAFE;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* cartons + boomerang + se cacher */}
      {t < 247.4 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 247.0, 247.4)}}>
          <Abs x={0} y={570} w={1080} style={{textAlign: 'center'}}><T size={60}>Une simple interdiction suffit-elle ?</T></Abs>
          <Row y={760} gap={40}>
            {[['#FFD43B', 235.7, -12], ['#FF3B4E', 236.6, 10]].map(([c, at, r]) => <div key={c as string} style={{width: 180, height: 260, borderRadius: 18, background: c as string, transform: `translateY(${(1 - spring(t, at as number)) * 600}px) rotate(${r}deg)`, boxShadow: '0 20px 40px rgba(0,0,0,0.5)'}} />)}
          </Row>
          {t > 235.7 && <Row y={1060}><Chip c="#7C8CFF" size={34} q={spring(t, 235.8)}>Répression = sanction</Chip></Row>}
          {t > 239.1 && (() => {
            const u = prog(t, 239.2, 241.6, (x) => x);
            const bx = 540 + Math.sin(u * Math.PI * 2) * 360, by = 1260 - Math.sin(u * Math.PI) * 140;
            return (
              <>
                <Abs x={bx - 70} y={by - 40} w={140} h={80} style={{transform: `rotate(${u * 1080}deg)`}}><svg width={140} height={80} viewBox="0 0 70 40"><path d="M4 30 Q35 -10 66 30 Q60 34 54 30 Q35 6 16 30 Q10 34 4 30 Z" fill={AMB} /></svg></Abs>
                <Row y={1380}><Chip c={RED} size={34} q={spring(t, 239.1)}>Contre-productif</Chip></Row>
              </>
            );
          })()}
          {t > 243.5 && (
            <Abs x={600} y={1180} w={300} h={300}>
              <div style={{position: 'absolute', left: 60 + (1 - prog(t, 243.6, 244.4)) * 100, top: 40}}><F n="anxieux" size={140} /></div>
              <div style={{position: 'absolute', left: 0, top: 80, width: 200, height: 220, background: 'repeating-linear-gradient(0deg, #6B4E3D 0 40px, #5A4031 40px 44px)', borderRadius: 12}} />
              <div style={{position: 'absolute', left: -60, top: 300}}><Hand size={38} color={DIM}>peur d'être jugé, licencié</Hand></div>
            </Abs>
          )}
        </AbsoluteFill>
      )}
      {/* approche globale : 4 planètes en orbite */}
      {t > 247.2 && t < 271.6 && (
        <AbsoluteFill style={{opacity: win(t, 247.2, 271.6, 0.4)}}>
          <Abs x={0} y={570} w={1080} style={{textAlign: 'center'}}><T size={64} color={C} style={{transform: `scale(${spring(t, 249.2)})`}}>Une approche globale</T></Abs>
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            {[200, 330].map((r) => <ellipse key={r} cx={540} cy={1130} rx={r * 1.25} ry={r * 0.9} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth={3} strokeDasharray="10 12" />)}
          </svg>
          <Abs x={420} y={1010} w={240} h={240} style={{borderRadius: 120, background: `radial-gradient(circle at 35% 30%, #7FF0CF, ${C})`, boxShadow: `0 0 80px ${C}88`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `scale(${spring(t, 249.3)})`}}><F n="bouclier" size={90} /><T size={28} color={BG}>PRÉVENTION</T></Abs>
          {[['Former les managers', 'directeur', 252.7], ['Intégrer les addictions', 'clipboard', 257.9], ['Médecine du travail', 'medecin', 263.7], ['Alternatives sans alcool', 'pouce', 269.3]].map(([l, ic, at], k) => {
            if (t < (at as number)) return null;
            const r = k % 2 ? 330 : 200;
            const ang = (k * Math.PI) / 2 + (t - 247) * 0.35 * (k % 2 ? -1 : 1);
            const x = 540 + Math.cos(ang) * r * 1.25, y = 1130 + Math.sin(ang) * r * 0.9;
            return (
              <Abs key={l as string} x={x - 95} y={y - 95} w={190} style={{textAlign: 'center', transform: `scale(${spring(t, at as number)})`}}>
                <div style={{width: 130, height: 130, margin: '0 auto', borderRadius: 65, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 0 6px ${[AMB, '#7C8CFF', RED, C][k]}`}}><F n={ic as string} size={90} /></div>
                <div style={{marginTop: 8, padding: '4px 10px', borderRadius: 12, background: 'rgba(0,0,0,0.55)', fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: '#fff'}}>{l}</div>
              </Abs>
            );
          })}
          {t > 252.7 && t < 257.8 && Array.from({length: 3}, (_, k) => { const q = ((t - 252.7) * 0.8 + k / 3) % 1; return <Abs key={k} x={540 - 200 * q} y={1130 - 200 * q} w={400 * q} h={400 * q} style={{borderRadius: '50%', border: `4px solid ${AMB}`, opacity: 1 - q}} />; })}
        </AbsoluteFill>
      )}
      {/* mocktail qui se compose */}
      {t > 271.4 && (() => {
        const L1 = prog(t, 272.0, 273.4), L2 = prog(t, 273.4, 274.8), L3 = prog(t, 274.8, 276.2);
        return (
          <AbsoluteFill style={{opacity: pop(t, 271.4)}}>
            <Abs x={0} y={570} w={1080} style={{textAlign: 'center'}}><Hand size={50} color={DIM}>Ne pas supprimer la convivialité…</Hand><T size={80} color={C} style={{transform: `scale(${spring(t, 275.6)})`}}>la réinventer</T></Abs>
            <Abs x={340} y={820} w={400} h={600}>
              <svg width={400} height={600} viewBox="0 0 100 150">
                <defs><clipPath id="mk"><path d="M14 20 L86 20 L70 130 L30 130 Z" /></clipPath></defs>
                <g clipPath="url(#mk)">
                  <rect x={0} y={130 - 36 * L1} width={100} height={40} fill="#FF7A59" />
                  <rect x={0} y={130 - 36 * L1 - 36 * L2} width={100} height={36 * L2 + 1} fill="#FFB347" />
                  <rect x={0} y={130 - 36 * L1 - 36 * L2 - 30 * L3} width={100} height={30 * L3 + 1} fill="#9BE564" opacity={0.9} />
                </g>
                <path d="M14 20 L86 20 L70 130 L30 130 Z" fill="rgba(255,255,255,0.08)" stroke="#fff" strokeWidth={2.5} />
                <line x1={60} y1={4} x2={50} y2={120} stroke="#FF4D5E" strokeWidth={4} opacity={pop(t, 276.6)} />
                <g transform={`translate(80 22) scale(${spring(t, 277.4)})`}><circle r={14} fill="#FFB020" /><circle r={10} fill="#FFE29A" />{Array.from({length: 6}, (_, k) => <line key={k} x1={0} y1={0} x2={10 * Math.cos(k)} y2={10 * Math.sin(k)} stroke="#FFB020" strokeWidth={1.5} />)}</g>
              </svg>
              {t > 280.4 && Array.from({length: 8}, (_, k) => { const a = (k / 8) * Math.PI * 2 + t; return <Abs key={k} x={200 + Math.cos(a) * 230} y={260 + Math.sin(a) * 260} w={22} h={22} style={{transform: `rotate(45deg) scale(${0.6 + 0.4 * Math.sin(t * 5 + k)})`, background: AMB, opacity: pop(t, 280.4)}} />; })}
            </Abs>
            <Row y={1450}><Chip c={AMB} dark size={34} q={spring(t, 280.5)}>Sans alcool, aussi désirable</Chip></Row>
            {t > 284.4 && <Abs x={640} y={860} style={{transform: `scale(${spring(t, 284.6, 8, 18)}) rotate(-10deg)`}}><div style={{border: `6px solid ${C}`, borderRadius: 14, padding: '4px 18px', background: 'rgba(0,0,0,0.4)'}}><T size={46} color={C}>NORMAL</T></div></Abs>}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Partie 5 : l'affaire de tous ─────────── */
const P5: React.FC = () => {
  const t = useT();
  const o = win(t, 290.7, 315.8, 0.4);
  if (o <= 0) return null;
  const ICONS = ['directeur', 'ouvrier-dark', 'femme-bureau', 'medecin', 'salarie', 'homme-bureau', 'salariee'];
  return (
    <AbsoluteFill style={{opacity: o}}>
      {t < 298.6 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 298.2, 298.6)}}>
          <Abs x={0} y={580} w={1080} style={{textAlign: 'center'}}><Hand size={50} color={DIM}>pas l'affaire d'une seule personne</Hand><T size={84} color={AMB} style={{transform: `scale(${spring(t, 294.3)})`}}>L'affaire de tous</T></Abs>
          {/* chaîne humaine */}
          <Abs x={0} y={900} w={1080} h={400}>
            {ICONS.map((ic, k) => {
              const at = 292.6 + k * 0.35;
              const x = 60 + k * 140;
              return <div key={k} style={{position: 'absolute', left: x, top: 60, transform: `translateY(${(1 - spring(t, at)) * 400}px)`}}><F n={ic} size={150} /></div>;
            })}
            <svg width={1080} height={400} style={{position: 'absolute', inset: 0}}><path d={`M130 230 ${ICONS.slice(1).map((_, k) => `Q${200 + k * 140} 270 ${270 + k * 140} 230`).join(' ')}`} fill="none" stroke={AMB} strokeWidth={10} strokeLinecap="round" pathLength={1} strokeDasharray={`${prog(t, 295.4, 297.0)} 1`} /></svg>
          </Abs>
        </AbsoluteFill>
      )}
      {/* 3 piliers */}
      {t > 298.4 && (
        <AbsoluteFill style={{opacity: pop(t, 298.4)}}>
          <Abs x={0} y={570} w={1080} style={{textAlign: 'center'}}><T size={70} style={{transform: `scale(${spring(t, 299.6)})`}}>3 piliers solides</T></Abs>
          {/* fronton */}
          <Abs x={140} y={760} w={800} h={130} style={{opacity: pop(t, 312.6)}}>
            <svg width={800} height={130} viewBox="0 0 800 130"><path d="M0 130 L400 0 L800 130 Z" fill={AMB} /><text x={400} y={110} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={40} fill={BG}>PRÉVENTION DURABLE</text></svg>
          </Abs>
          {[['Informer', 'megaphone', 302.6], ['Confiance', 'poignee', 307.3], ['Accompagner', 'main-levee', 311.9]].map(([l, ic, at], k) => {
            const h = 600 * spring(t, at as number, 6, 12);
            return (
              <Abs key={l as string} x={180 + k * 260} y={1500 - h} w={200} h={h} style={{borderRadius: '16px 16px 0 0', background: `linear-gradient(90deg, #E9E1D2, #CFC5B3 60%, #B9AF9C)`, overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.4)'}}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 40, gap: 14}}><F n={ic as string} size={100} /><T size={30} color={BG} style={{textAlign: 'center'}}>{l}</T></div>
              </Abs>
            );
          })}
          <Abs x={140} y={1500} w={800} h={40} style={{borderRadius: 8, background: '#CFC5B3'}} />
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Conclusion : tir à la corde ─────────── */
const Concl: React.FC = () => {
  const t = useT();
  if (t < 315.7) return null;
  const o = pop(t, 315.8, 0.6);
  // position du ruban central : négatif = culture du risque gagne, positif = sécurité gagne
  const pos = t < 325.5 ? -60 * prog(t, 320.8, 322.4) + Math.sin(t * 4) * 10 * prog(t, 319, 320) : -60 + 300 * prog(t, 325.5, 327.6, easeInOut) + Math.sin(t * 3) * 6;
  return (
    <AbsoluteFill style={{opacity: o}}>
      <Abs x={0} y={580} w={1080} style={{textAlign: 'center'}}>
        <Hand size={50} color={DIM}>La question que chaque entreprise doit se poser</Hand>
        <T size={70} style={{marginTop: 10}}>Votre choix ?</T>
      </Abs>
      {/* corde */}
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <path d={`M-40 1180 Q540 ${1195 + Math.sin(t * 6) * 6} 1120 1180`} stroke="#C9A66B" strokeWidth={22} fill="none" />
        <path d={`M-40 1180 Q540 ${1195 + Math.sin(t * 6) * 6} 1120 1180`} stroke="#9C7B45" strokeWidth={22} fill="none" strokeDasharray="10 14" />
        <line x1={540} y1={1060} x2={540} y2={1300} stroke="rgba(255,255,255,0.3)" strokeWidth={4} strokeDasharray="12 12" />
      </svg>
      <Abs x={540 + pos - 20} y={1150} w={40} h={80} style={{background: RED, borderRadius: 8, boxShadow: `0 0 20px ${RED}`}} />
      {/* équipes */}
      <Abs x={20} y={1010} w={360} style={{textAlign: 'center', transform: `scale(${spring(t, 320.8)})`}}>
        <div style={{display: 'flex', justifyContent: 'center', transform: `rotate(${-8 + (t > 325.5 ? 10 * prog(t, 325.5, 327) : 0)}deg)`}}><Glass w={90} fill={AMB} kind="biere" /><F n="crane" size={110} /></div>
        <Chip c={RED} size={28}>Culture du risque</Chip>
        <Hand size={32} color={DIM} style={{marginTop: 6}}>au nom de la tradition</Hand>
      </Abs>
      <Abs x={700} y={1010} w={360} style={{textAlign: 'center', transform: `scale(${spring(t, 325.5)})`}}>
        <div style={{display: 'flex', justifyContent: 'center', transform: `rotate(${8}deg)`}}><F n="bouclier" size={110} /><F n="equipe" size={110} /></div>
        <Chip c={SAFE} dark size={28}>Culture de la sécurité</Chip>
      </Abs>
      {t > 328.2 && t < 333.9 && <Row y={1400}><Hand size={44} color={DIM} style={{opacity: pop(t, 328.2)}}>habitudes dangereuses… ou rien n'est plus important</Hand></Row>}
      {t > 333.9 && (
        <Row y={1380} gap={24}>
          <div style={{transform: `scale(${(1 + 0.08 * Math.sin((t - 333.9) * 8)) * spring(t, 333.9)})`}}><F n="coeur" size={120} /></div>
          <T size={60} color={SAFE}>La vie et la santé</T>
        </Row>
      )}
      {t > 335.7 && <Row y={1530}><Chip c={AMB} dark size={36} q={spring(t, 335.7)}>Tout se joue ici</Chip></Row>}
    </AbsoluteFill>
  );
};

/* ─────────── En-tête ─────────── */
const Header: React.FC = () => {
  const t = useT();
  const p = PT.find((x) => t >= x.at + CAP - 0.3 && t < x.end);
  return (
    <AbsoluteFill style={{zIndex: 40, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: '50%', top: 95, transform: 'translateX(-50%)', background: '#fff', borderRadius: 26, padding: '10px 28px'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div>
      {t > 2.5 && t < 59.4 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 240, display: 'flex', justifyContent: 'center', opacity: pop(t, 2.5) * (1 - prog(t, 59.0, 59.4))}}>
          <div style={{padding: '10px 26px', borderRadius: 40, background: 'rgba(255,255,255,0.08)', border: '2px solid rgba(255,255,255,0.15)'}}><T size={38}>Zéro alcool : <span style={{color: SAFE}}>sécurité d'abord</span></T></div>
        </div>
      )}
      {p && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 240, display: 'flex', justifyContent: 'center', opacity: pop(t, p.at + CAP - 0.3) * (1 - prog(t, p.end - 0.3, p.end))}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 14, padding: '8px 24px 8px 8px', borderRadius: 40, background: 'rgba(255,255,255,0.08)', border: `2px solid ${p.c}`}}>
            <div style={{width: 58, height: 58, borderRadius: 29, background: p.c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: '#fff'}}>{p.n}</div>
            <T size={36}>{p.l}</T>
          </div>
        </div>
      )}
      {t > 59.4 && t < 315.8 && (
        <div style={{position: 'absolute', left: 160, right: 160, top: 335, display: 'flex', gap: 10, opacity: pop(t, 59.4) * (1 - prog(t, 315.4, 315.8))}}>
          {PT.map((x) => <div key={x.n} style={{flex: 1, height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.12)', overflow: 'hidden'}}><div style={{height: '100%', width: `${prog(t, x.at, x.end, (v) => v) * 100}%`, background: x.c}} /></div>)}
        </div>
      )}
    </AbsoluteFill>
  );
};

const Bg: React.FC = () => {
  const t = useT();
  const p = PT.find((x) => t >= x.at && t < x.end);
  const c = p ? p.c : RED;
  return (
    <AbsoluteFill style={{background: BG}}>
      <AbsoluteFill style={{background: `radial-gradient(circle at 80% 15%, ${c}33, transparent 45%), radial-gradient(circle at 15% 90%, ${c}22, transparent 45%)`}} />
      {Array.from({length: 18}, (_, k) => <div key={k} style={{position: 'absolute', left: random(`bx${k}`) * 1080, top: ((random(`by${k}`) * 1920 - t * (8 + random(`bs${k}`) * 12)) % 1920 + 1920) % 1920, width: 6 + random(`bz${k}`) * 10, height: 6 + random(`bz${k}`) * 10, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.12)'}} />)}
    </AbsoluteFill>
  );
};

const OutroFade: React.FC = () => {
  const t = useT();
  return <AbsoluteFill style={{background: 'linear-gradient(180deg, #FBFAF6 0%, #F1EDE3 100%)', zIndex: 80, opacity: prog(t, OUTRO_AT - 0.5, OUTRO_AT)}} />;
};

const CUES: Sfx[] = [
  {at: 0.05, s: 'signature', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  {at: 3.35, s: 'sfx/ding', v: 0.45}, {at: 5.0, s: 'sfx/pop', v: 0.3}, {at: 7.9, s: 'deep-hit', v: 0.45},
  {at: 12.9, s: 'sfx/whoosh', v: 0.4}, {at: 15.5, s: 'bass-hit', v: 0.45},
  {at: 18.6, s: 'riser', v: 0.2, dur: 3.4}, ...Array.from({length: 16}, (_, k) => ({at: 18.7 + k * 0.2, s: 'tick', v: 0.18})),
  {at: 29.7, s: 'deep-hit', v: 0.5}, {at: 36.3, s: 'sfx/pop', v: 0.3}, {at: 40.8, s: 'tension', v: 0.2, dur: 2.5}, {at: 44.0, s: 'sfx/swish', v: 0.3},
  {at: 51.0, s: 'sfx/pop', v: 0.35}, {at: 57.6, s: 'sfx/thud', v: 0.35},
  ...PT.flatMap((p) => [{at: p.at - 0.05, s: 'soft-whoosh', v: 0.5, dur: 1.8}, {at: p.at + 0.5, s: 'sfx/click', v: 0.45}, {at: p.at + 1.0, s: 'sfx/pop', v: 0.5}, {at: p.at + 1.15, s: 'bass-hit', v: 0.35}]),
  {at: 62.6, s: 'deep-hit', v: 0.3}, {at: 68.2, s: 'sfx/pop', v: 0.3},
  {at: 71.8, s: 'sfx/pop', v: 0.3}, {at: 73.2, s: 'sfx/pop', v: 0.3}, {at: 75.0, s: 'sfx/pop', v: 0.6}, {at: 75.1, s: 'sfx/rise', v: 0.25}, {at: 76.4, s: 'sfx/ding', v: 0.3}, {at: 81.3, s: 'sfx/swish', v: 0.3},
  ...Array.from({length: 10}, (_, k) => ({at: 84.0 + k * 0.25, s: 'tick', v: 0.15})), {at: 87.6, s: 'bass-hit', v: 0.4}, {at: 95.1, s: 'deep-hit', v: 0.4},
  ...[0, 1, 2, 3].map((k) => ({at: 100.6 + k * 0.25, s: 'sfx/thud', v: 0.3})), {at: 103.8, s: 'sfx/rise', v: 0.3}, {at: 104.4, s: 'bass-hit', v: 0.4}, {at: 106.5, s: 'sfx/pop', v: 0.3},
  {at: 111.6, s: 'tension', v: 0.25, dur: 3}, {at: 115.1, s: 'deep-hit', v: 0.55}, {at: 118.6, s: 'sfx/pop', v: 0.3},
  {at: 127.6, s: 'page', v: 0.5}, {at: 131.1, s: 'sfx/pop', v: 0.3}, {at: 138.2, s: 'sfx/pop', v: 0.3}, {at: 143.1, s: 'tampon', v: 0.5},
  {at: 147.9, s: 'page', v: 0.4}, {at: 150.3, s: 'deep-hit', v: 0.35}, ...Array.from({length: 7}, (_, k) => ({at: 150.4 + k * 0.28, s: 'sfx/click', v: 0.3})), {at: 153.4, s: 'sfx/swish', v: 0.3},
  {at: 163.5, s: 'sfx/thud', v: 0.4}, {at: 164.4, s: 'sfx/thud', v: 0.4}, ...[167.3, 168.0, 170.0].map((at) => ({at, s: 'sfx/pop', v: 0.3})),
  ...Array.from({length: 13}, (_, k) => ({at: 173.6 + k * 0.155, s: 'sfx/click', v: 0.35})), {at: 176.4, s: 'sfx/bell', v: 0.35},
  {at: 192.3, s: 'bass-hit', v: 0.4}, {at: 194.6, s: 'sfx/rise', v: 0.3}, ...Array.from({length: 6}, (_, k) => ({at: 198.9 + k * 0.12, s: 'sfx/pop', v: 0.25})), {at: 204.9, s: 'tampon', v: 0.55},
  {at: 211.9, s: 'sfx/pop', v: 0.3}, {at: 213.2, s: 'sfx/pop', v: 0.3}, {at: 213.9, s: 'sfx/pop', v: 0.3}, {at: 215.6, s: 'sfx/thud', v: 0.35}, {at: 220.7, s: 'sfx/whoosh', v: 0.45}, {at: 221.9, s: 'validation', v: 0.35},
  {at: 235.7, s: 'sfx/whoosh', v: 0.35}, {at: 236.6, s: 'sfx/whoosh', v: 0.35}, {at: 239.2, s: 'soft-whoosh', v: 0.45, dur: 2.4}, {at: 243.6, s: 'sfx/swish', v: 0.3},
  {at: 249.3, s: 'bass-hit', v: 0.4}, ...[252.7, 257.9, 263.7, 269.3].map((at) => ({at, s: 'validation', v: 0.32})),
  ...[272.0, 273.4, 274.8].map((at) => ({at, s: 'sfx/pop', v: 0.3})), {at: 277.4, s: 'sfx/ding', v: 0.35}, {at: 280.4, s: 'sfx/rise', v: 0.25}, {at: 284.6, s: 'tampon', v: 0.5},
  ...Array.from({length: 7}, (_, k) => ({at: 292.6 + k * 0.35, s: 'sfx/pop', v: 0.25})), {at: 295.4, s: 'validation', v: 0.32},
  {at: 302.6, s: 'sfx/thud', v: 0.4}, {at: 307.3, s: 'sfx/thud', v: 0.4}, {at: 311.9, s: 'sfx/thud', v: 0.4}, {at: 312.6, s: 'bass-hit', v: 0.35},
  {at: 316.0, s: 'soft-whoosh', v: 0.5, dur: 2}, {at: 320.8, s: 'tension', v: 0.22, dur: 4}, {at: 325.5, s: 'sfx/rise', v: 0.3}, {at: 327.4, s: 'bass-hit', v: 0.45},
  {at: 333.9, s: 'sfx/ding', v: 0.35}, {at: 335.7, s: 'validation', v: 0.35},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const ZeroAlcool: React.FC = () => (
  <AbsoluteFill style={{background: BG}}>
    <Bg />
    <Gate from={0} to={59.6}><Intro /></Gate>
    <Gate from={62} to={122}><P1 /></Gate>
    <Gate from={124.5} to={185}><P2 /></Gate>
    <Gate from={187.5} to={227}><P3 /></Gate>
    <Gate from={229.7} to={288}><P4 /></Gate>
    <Gate from={290.6} to={316}><P5 /></Gate>
    <Gate from={315.6} to={OUTRO_AT}><Concl /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    {PT.map((p) => <Gate key={p.n} from={p.at} to={p.at + CAP + 0.1}><CapCard p={p} /></Gate>)}
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT - 0.5} to={999}><OutroFade /></Gate>
    <Gate from={OUTRO_AT} to={999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.3} to={OUTRO_AT}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-zero-alcool-origine.m4a')} trimAfter={s(338.4)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);
