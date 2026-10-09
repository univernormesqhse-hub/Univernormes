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
 * « Démarche qualité en 10 étapes » (5 min 29) — voix d'origine, transcription locale. Fil rouge inédit : un plateau
 * de jeu de société premium — 10 cases, un pion qui saute de case en case, un dé 3D qui roule à chaque phase, et le
 * contenu de chaque étape qui jaillit du plateau comme un livre pop-up. Autres techniques nouvelles : avalanche de
 * feuilles qui forme une montagne puis se range en feuille de route, tour de Jenga qui vacille, machine à billes
 * (entrée → processus → sortie), main dont chaque doigt est un des 5M, volant de pilote et cadrans, dépliant en
 * accordéon, tableau de bord automobile, machine à sous des 4 critères d'un bon indicateur, puzzle qui s'assemble,
 * roue de Deming qui monte la pente retenue par sa cale, route qui file vers l'horizon.
 */
const LOGO = 'promo/logo.png';
const OUTRO_AT = 329.2;
export const DEMARCHEQUALITE_FRAMES = s(OUTRO_AT + 3.8);
const BG = '#F4EFE6';
const INK = '#14213D';
const DIM = 'rgba(20,33,61,0.6)';
const GOLD = '#F2B705';

type Ph = {n: number; l: string; c: string; at: number; end: number; steps: number[]};
const PH: Ph[] = [
  {n: 1, l: 'Définir le cap', c: '#2563EB', at: 70.0, end: 108.8, steps: [1, 2, 3]},
  {n: 2, l: 'Cartographier', c: '#F08A00', at: 109.0, end: 163.5, steps: [4, 5]},
  {n: 3, l: 'Piloter et documenter', c: '#0FA968', at: 163.8, end: 217.0, steps: [6, 7]},
  {n: 4, l: 'Mesurer', c: '#E11D48', at: 217.3, end: 269.9, steps: [8, 9]},
  {n: 5, l: 'Améliorer en continu', c: '#7C3AED', at: 270.1, end: 308.0, steps: [10]},
];
const STEPS: {n: number; l: string; icon: string; ph: number; at: number}[] = [
  {n: 1, l: 'Raison d’être', icon: 'boussole', ph: 0, at: 86.5},
  {n: 2, l: 'Politique qualité', icon: 'parchemin', ph: 0, at: 95.3},
  {n: 3, l: 'Objectifs', icon: 'cible', ph: 0, at: 101.0},
  {n: 4, l: 'Processus', icon: 'engrenage', ph: 1, at: 118.7},
  {n: 5, l: 'Ressources 5M', icon: 'boite-outils', ph: 1, at: 145.0},
  {n: 6, l: 'Pilotes', icon: 'superviseur', ph: 2, at: 174.2},
  {n: 7, l: 'Documentation', icon: 'classeur', ph: 2, at: 195.9},
  {n: 8, l: 'Surveillance', icon: 'loupe', ph: 3, at: 230.3},
  {n: 9, l: 'Indicateurs', icon: 'graphique', ph: 3, at: 249.6},
  {n: 10, l: 'Amélioration continue', icon: 'repeter', ph: 4, at: 277.3},
];
// plateau : serpentin de 9 cases + case finale
const SQ: [number, number][] = [[210, 720], [540, 720], [870, 720], [870, 990], [540, 990], [210, 990], [210, 1260], [540, 1260], [870, 1260], [540, 1510]];

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
const Paper: React.CSSProperties = {background: '#fff', borderRadius: 32, boxShadow: '0 22px 50px rgba(20,33,61,0.14), 0 2px 0 rgba(20,33,61,0.05)'};
const Chip: React.FC<{children: React.ReactNode; c?: string; q?: number; size?: number; style?: React.CSSProperties}> = ({children, c = INK, q = 1, size = 38, style}) => (
  <div style={{display: 'inline-flex', alignItems: 'center', gap: 12, padding: '14px 28px', borderRadius: 50, background: c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: size, transform: `scale(${q})`, boxShadow: `0 12px 30px ${c}55`, whiteSpace: 'nowrap', ...style}}>{children}</div>
);
/** Élément « pop-up » : se redresse depuis le plateau comme dans un livre animé. */
const PopUp: React.FC<{at: number; children: React.ReactNode; style?: React.CSSProperties}> = ({at, children, style}) => {
  const t = useT();
  const q = spring(t, at, 6, 11);
  return <div style={{perspective: 1400, ...style}}><div style={{transformOrigin: '50% 100%', transform: `rotateX(${(1 - q) * 88}deg)`, opacity: t >= at ? 1 : 0}}>{children}</div></div>;
};

/* ─────────── Dé 3D ─────────── */
const PIPS: Record<number, [number, number][]> = {1: [[50, 50]], 2: [[25, 25], [75, 75]], 3: [[25, 25], [50, 50], [75, 75]], 4: [[25, 25], [75, 25], [25, 75], [75, 75]], 5: [[25, 25], [75, 25], [50, 50], [25, 75], [75, 75]], 6: [[25, 22], [75, 22], [25, 50], [75, 50], [25, 78], [75, 78]]};
const Dice: React.FC<{size: number; rx: number; ry: number}> = ({size, rx, ry}) => {
  const h = size / 2;
  const faces: [number, string][] = [[1, `translateZ(${h}px)`], [6, `rotateY(180deg) translateZ(${h}px)`], [3, `rotateY(90deg) translateZ(${h}px)`], [4, `rotateY(-90deg) translateZ(${h}px)`], [2, `rotateX(90deg) translateZ(${h}px)`], [5, `rotateX(-90deg) translateZ(${h}px)`]];
  return (
    <div style={{width: size, height: size, perspective: 800}}>
      <div style={{width: size, height: size, position: 'relative', transformStyle: 'preserve-3d', transform: `rotateX(${rx}deg) rotateY(${ry}deg)`}}>
        {faces.map(([n, tr]) => (
          <div key={n} style={{position: 'absolute', inset: 0, transform: tr, background: '#fff', border: '3px solid #E3DDD2', borderRadius: size * 0.18, boxSizing: 'border-box'}}>
            {PIPS[n].map(([x, y], k) => <div key={k} style={{position: 'absolute', left: `${x}%`, top: `${y}%`, width: size * 0.17, height: size * 0.17, marginLeft: -size * 0.085, marginTop: -size * 0.085, borderRadius: '50%', background: n === 1 ? '#E11D48' : INK}} />)}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─────────── Plateau de jeu ─────────── */
// passages du plateau : [début, fin, case de départ (index), case d'arrivée (index)]
const BOARD: [number, number, number, number, number][] = [[48.0, 73.4, -1, 0, 0], [109.0, 112.3, 2, 3, 1], [163.8, 167.0, 4, 5, 2], [217.3, 220.0, 6, 7, 3], [270.1, 273.3, 8, 9, 4]];
const pawnAt = (t: number): [number, number, number] => {
  // position du pion (x, y, saut) selon la chronologie globale
  const moves: [number, number, number][] = [[68.4, -1, 0], [110.2, 2, 3], [165.0, 4, 5], [218.3, 6, 7], [271.3, 8, 9]];
  let from = -1, to = -1, at = 0;
  for (const m of moves) if (t >= m[0]) { at = m[0]; from = m[1]; to = m[2]; }
  if (to < 0) return [100, 1500, 0];
  const n = to - from;
  const u = Math.min(1, (t - at) / (0.45 * n));
  const f = u * n;
  const k = Math.min(n - 1, Math.floor(f));
  const fr = f - k;
  const a = from + k < 0 ? [100, 1500] as [number, number] : SQ[from + k];
  const b = SQ[from + k + 1];
  const done = u >= 1;
  const x = done ? SQ[to][0] : a[0] + (b[0] - a[0]) * fr;
  const y = done ? SQ[to][1] : a[1] + (b[1] - a[1]) * fr;
  return [x, y, done ? 0 : Math.sin(fr * Math.PI) * 120];
};
const Board: React.FC = () => {
  const t = useT();
  const seg = BOARD.find(([a, b]) => t >= a && t < b);
  if (!seg) return null;
  const [a, b, , to, phi] = seg;
  const intro = a === 48.0 && t < 70.0;
  const o = win(t, a, b, 0.35);
  // caméra : vue d'ensemble puis plongée dans la case d'arrivée
  const zoom = 1 + 2.2 * prog(t, b - 0.9, b, easeIn);
  const [fx, fy] = SQ[to];
  const camX = 540 + (fx - 540) * prog(t, b - 0.9, b, easeIn);
  const camY = 1100 + (fy - 1100) * prog(t, b - 0.9, b, easeIn);
  const tilt = a === 48.0 ? 18 - 18 * prog(t, 48.0, 50.0) : 0;
  const lit = (k: number) => {
    if (intro) {
      const ph = STEPS[k].ph;
      const when = [54.3, 55.1, 59.0, 62.4, 66.7][ph];
      return t >= when;
    }
    return k <= to;
  };
  const [px, py, hop] = pawnAt(t);
  // dé : lancé en début de passage (sauf introduction)
  const rollAt = a === 48.0 ? 68.2 : a + 0.3;
  const roll = prog(t, rollAt, rollAt + 0.9, easeOut);
  const diceN = to - seg[2];
  const final: Record<number, [number, number]> = {1: [0, 0], 2: [-90, 0], 3: [0, -90], 4: [0, 90], 5: [90, 0], 6: [0, 180]};
  const [frx, fry] = final[Math.max(1, Math.min(6, diceN))];
  return (
    <AbsoluteFill style={{zIndex: 35, opacity: o, background: BG}}>
      <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 55%, rgba(242,183,5,0.18), transparent 60%)'}} />
      <div style={{position: 'absolute', inset: 0, transformOrigin: `${camX}px ${camY}px`, transform: `translate(${540 - camX}px, ${1100 - camY}px) scale(${zoom}) perspective(2000px) rotateX(${tilt}deg)`}}>
        {/* plateau */}
        <div style={{position: 'absolute', left: 40, top: 560, width: 1000, height: 1100, borderRadius: 50, background: 'linear-gradient(160deg, #1C2B4F, #14213D)', boxShadow: '0 40px 80px rgba(20,33,61,0.35), inset 0 0 0 10px #2B3D66'}} />
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
          <path d={`M100 1500 L100 720 ${SQ.map(([x, y]) => `L${x} ${y}`).join(' ')}`} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth={26} strokeDasharray="2 34" strokeLinecap="round" />
        </svg>
        <div style={{position: 'absolute', left: 64, top: 1452, width: 120, height: 96, borderRadius: 20, background: GOLD, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK}}>DÉPART</div>
        {SQ.map(([x, y], k) => {
          const st = STEPS[k];
          const c = PH[st.ph].c;
          const on = lit(k);
          const appear = a === 48.0 ? spring(t, 48.3 + k * 0.12) : 1;
          const big = k === 9;
          const S = big ? 240 : 230;
          return (
            <div key={k} style={{position: 'absolute', left: x - S / 2, top: y - S / 2, width: S, height: S, borderRadius: big ? S / 2 : 34, background: on ? c : '#26375E', border: `6px solid ${on ? '#fff' : '#3A4C78'}`, boxSizing: 'border-box', transform: `scale(${appear}) rotateY(${(1 - appear) * 180}deg)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, boxShadow: on ? `0 0 40px ${c}88` : 'none'}}>
              <div style={{position: 'absolute', left: 14, top: 8, fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: on ? '#fff' : '#6D7FA8'}}>{st.n}</div>
              <div style={{opacity: on ? 1 : 0.35}}><F n={st.icon} size={big ? 100 : 90} /></div>
              <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 24, color: on ? '#fff' : '#8090B5', textAlign: 'center', padding: '0 10px', lineHeight: 1.05}}>{st.l}</div>
            </div>
          );
        })}
        {/* pion */}
        <div style={{position: 'absolute', left: px - 40, top: py - 130 - hop, width: 80, height: 130, zIndex: 5, filter: 'drop-shadow(0 18px 12px rgba(0,0,0,0.35))'}}>
          <div style={{position: 'absolute', left: 18, top: 0, width: 44, height: 44, borderRadius: 22, background: 'radial-gradient(circle at 35% 30%, #FF8FA3, #E11D48)'}} />
          <div style={{position: 'absolute', left: 6, top: 36, width: 0, height: 0, borderLeft: '34px solid transparent', borderRight: '34px solid transparent', borderBottom: '80px solid #E11D48'}} />
          <div style={{position: 'absolute', left: 0, top: 108, width: 80, height: 22, borderRadius: 11, background: '#B3123A'}} />
        </div>
      </div>
      {/* dé */}
      {t > rollAt - 0.05 && (
        <div style={{position: 'absolute', left: 540 - 80 + (1 - roll) * -420, top: 360 + Math.abs(Math.sin(roll * Math.PI * 2.5)) * -120 * (1 - roll), zIndex: 6, opacity: 1 - prog(t, b - 0.9, b - 0.5)}}>
          <Dice size={160} rx={frx + (1 - roll) * 720} ry={fry + (1 - roll) * 540} />
        </div>
      )}
      {/* titre de phase */}
      {!intro && (() => {
        const ph = PH[phi];
        const st = Math.max(a, 70.0);
        return (
          <div style={{position: 'absolute', left: 0, right: 0, top: 230, display: 'flex', justifyContent: 'center', opacity: pop(t, st + 0.3) * (1 - prog(t, b - 0.8, b - 0.4))}}>
            <div style={{padding: '14px 34px', borderRadius: 50, background: ph.c, transform: `scale(${spring(t, st + 0.3)})`, boxShadow: `0 14px 30px ${ph.c}66`}}><T size={50} color="#fff">{ph.n < 5 ? `Phase ${ph.n} · ${ph.l}` : `Étape 10 · ${ph.l}`}</T></div>
          </div>
        );
      })()}
      {a === 48.0 && t < 70.0 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 240, textAlign: 'center', opacity: pop(t, 48.6) * (1 - prog(t, 69.6, 70.0))}}>
          <T size={58}>Le programme</T>
          <div style={{display: 'flex', justifyContent: 'center', gap: 10, marginTop: 14, flexWrap: 'wrap', padding: '0 40px'}}>
            {PH.map((p, k) => <Chip key={p.n} c={p.c} size={28} q={spring(t, [54.3, 55.1, 59.0, 62.4, 66.7][k])} style={{padding: '8px 18px'}}>{p.n < 5 ? `${p.n}. ${p.l}` : '∞ Amélioration'}</Chip>)}
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Couverture ─────────── */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.3, 3.0, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: BG, transform: `scale(${1 - out * 0.15})`, opacity: 1 - out}}>
      <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 30%, rgba(37,99,235,0.18), transparent 50%), radial-gradient(circle at 80% 85%, rgba(242,183,5,0.3), transparent 40%)'}} />
      <Abs x={0} y={95} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(20,33,61,0.12)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      {/* emblème : mini-plateau 10 cases */}
      <Abs x={190} y={330} w={700} h={460} style={{borderRadius: 40, background: 'linear-gradient(160deg, #1C2B4F, #14213D)', boxShadow: '0 30px 60px rgba(20,33,61,0.3)', transform: `rotate(-4deg)`}}>
        {Array.from({length: 10}, (_, k) => {
          const r = Math.floor(k / 5), c = r ? 4 - (k % 5) : k % 5;
          const col = PH[STEPS[k].ph].c;
          return <div key={k} style={{position: 'absolute', left: 40 + c * 128, top: 70 + r * 190, width: 108, height: 130, borderRadius: 22, background: col, border: '5px solid #fff', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: '#fff'}}>{k + 1}</div>;
        })}
        <div style={{position: 'absolute', left: 560, top: -70}}><Dice size={130} rx={-25 + Math.sin(t * 2) * 10} ry={35 + t * 20} /></div>
      </Abs>
      <Abs x={60} y={880} w={960} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: INK, color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: 34, letterSpacing: 3}}>INSPIRÉE DE L'ISO 9001</div>
        <T size={128} style={{marginTop: 26, textTransform: 'uppercase', letterSpacing: -3}}>Démarche</T>
        <T size={128} color="#2563EB" style={{textTransform: 'uppercase', letterSpacing: -3}}>qualité</T>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 18, marginTop: 10}}>
          <div style={{width: 120, height: 8, borderRadius: 4, background: GOLD}} />
          <T size={70} color={INK}>en 10 étapes</T>
          <div style={{width: 120, height: 8, borderRadius: 4, background: GOLD}} />
        </div>
        <Hand size={58} style={{marginTop: 26}}>Par où commencer ?</Hand>
      </Abs>
      <Abs x={0} y={1560} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}>
        {PH.map((p) => <div key={p.n} style={{padding: '8px 14px', borderRadius: 30, background: `${p.c}1F`, border: `3px solid ${p.c}`, fontFamily: sansFont, fontWeight: 800, fontSize: 22, color: p.c, whiteSpace: 'nowrap'}}>{['Cap', 'Processus', 'Pilotage', 'Mesure', 'Amélioration'][p.n - 1]}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ─────────── Accroche ─────────── */
const Hook: React.FC = () => {
  const t = useT();
  const o = 1 - prog(t, 47.6, 48.1);
  if (o <= 0) return null;
  // avalanche de feuilles → montagne → feuille de route
  const N = 46;
  const sort = prog(t, 10.4, 12.6, easeInOut);
  const papersO = 1 - prog(t, 17.6, 18.2);
  return (
    <AbsoluteFill style={{opacity: o}}>
      {papersO > 0 && (
        <AbsoluteFill style={{opacity: papersO}}>
          {Array.from({length: N}, (_, k) => {
            const at = 2.6 + (k / N) * 4.0;
            const fall = Math.min(1, Math.max(0, (t - at) / 0.7));
            // position finale dans la montagne (triangle)
            const row = Math.floor(Math.sqrt(k * 2));
            const inRow = k - (row * (row + 1)) / 2;
            const mx = 540 + (inRow - row / 2) * 100 + (random(`mx${k}`) - 0.5) * 40;
            const my = 880 + row * 68;
            // position rangée (feuille de route : 2 colonnes de jalons)
            const lane = k % 10;
            const rx = 220 + (lane % 2) * 640 + (random(`rx${k}`) - 0.5) * 20;
            const ry = 640 + Math.floor(lane / 2) * 190;
            const x0 = mx, y0 = -200 - random(`y${k}`) * 300;
            const fx = x0 + (mx - x0), fy = y0 + (my - y0) * easeIn(fall);
            const x = fx + (rx - fx) * sort, y = fy + (ry - fy) * sort;
            const rot = (random(`r${k}`) - 0.5) * 60 * (1 - sort) + (1 - fall) * 200;
            const sc = 1 - sort * (k < 10 ? 0 : 1);
            return t > at - 0.05 && sc > 0.01 ? (
              <div key={k} style={{position: 'absolute', left: x - 60, top: y - 75, width: 120, height: 150, background: '#fff', borderRadius: 8, boxShadow: '0 6px 14px rgba(20,33,61,0.18)', transform: `rotate(${rot}deg) scale(${sc})`, padding: 12, boxSizing: 'border-box'}}>
                {Array.from({length: 5}, (_, j) => <div key={j} style={{height: 7, borderRadius: 4, background: '#D8DCE5', marginTop: 10, width: `${60 + random(`w${k}${j}`) * 40}%`}} />)}
              </div>
            ) : null;
          })}
          {/* étiquettes de la montagne */}
          {[['Normes', 6.6, 260, 880], ['Procédures', 7.4, 640, 820], ['Paperasse', 8.2, 420, 1040]].map(([l, at, x, y]) => (
            <Abs key={l as string} x={x as number} y={y as number} style={{transform: `scale(${spring(t, at as number) * (1 - sort)}) rotate(${(random(l as string) - 0.5) * 12}deg)`}}><Chip c="#E11D48">{l}</Chip></Abs>
          ))}
          {/* feuille de route */}
          {sort > 0 && (
            <>
              <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
                <path d="M220 640 L860 640 L860 830 L220 830 L220 1020 L860 1020 L860 1210 L220 1210 L220 1400 L860 1400" fill="none" stroke={GOLD} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={`${prog(t, 11.0, 13.6)} 1`} />
              </svg>
              <Abs x={0} y={1460} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 20}}>
                <Chip c="#2563EB" q={spring(t, 10.7)}>Aventure structurée</Chip>
              </Abs>
              <Abs x={0} y={500} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Chip c={INK} q={spring(t, 13.0)}>Feuille de route</Chip></Abs>
            </>
          )}
        </AbsoluteFill>
      )}
      {/* par où commencer ? */}
      {t > 18.0 && t < 30.4 && (
        <AbsoluteFill style={{opacity: win(t, 18.0, 30.4, 0.4)}}>
          <Abs x={0} y={600} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 30, alignItems: 'flex-end'}}>
            <div style={{transform: `scale(${spring(t, 18.4)})`}}><F n="directeur" size={220} /></div>
            <div style={{transform: `scale(${spring(t, 19.2)})`}}><F n="equipe" size={200} /></div>
          </Abs>
          <Abs x={0} y={880} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Chip c="#2563EB" q={spring(t, 24.7)} size={50}>Par où commencer ?</Chip></Abs>
          {/* surcharge d'infos */}
          {t > 26.2 && Array.from({length: 14}, (_, k) => {
            const at = 26.2 + k * 0.1;
            const x = 80 + random(`ix${k}`) * 800, y = 980 + random(`iy${k}`) * 300;
            return <Abs key={k} x={x} y={y} style={{transform: `scale(${spring(t, at)}) rotate(${(random(`ir${k}`) - 0.5) * 30}deg)`, opacity: 1 - prog(t, 28.2, 28.6)}}><F n={['memo', 'enveloppe', 'dossier', 'graphique', 'parchemin', 'classeur'][k % 6]} size={110} /></Abs>;
          })}
          {/* première brique */}
          {t > 28.3 && (
            <>
              <Abs x={240} y={1430} w={600} h={60} style={{borderRadius: 14, background: '#2D4373', backgroundImage: 'radial-gradient(circle, #3D5590 14px, transparent 15px)', backgroundSize: '60px 60px', backgroundPosition: '0 -6px', transform: `scaleX(${pop(t, 28.3)})`}} />
              <Abs x={420} y={1430 - 140 - (1 - Math.min(1, ((t - 28.9) / 0.5) ** 2)) * 700} w={240} h={140} style={{borderRadius: 18, background: GOLD, boxShadow: 'inset 0 -14px 0 rgba(0,0,0,0.15)', opacity: t > 28.9 ? 1 : 0}}>
                {[0, 1, 2, 3].map((k) => <div key={k} style={{position: 'absolute', top: -22, left: 18 + k * 56, width: 40, height: 26, borderRadius: '8px 8px 0 0', background: '#E0A800'}} />)}
                <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={32}>1re brique</T></div>
              </Abs>
            </>
          )}
        </AbsoluteFill>
      )}
      {/* cheminement logique → ISO 9001 → 10 étapes */}
      {t > 30.2 && (
        <AbsoluteFill style={{opacity: pop(t, 30.3)}}>
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            <path d="M140 1500 C 300 1400, 200 1250, 420 1200 S 760 1150, 700 1000 S 380 860, 600 760 S 900 700, 940 600" fill="none" stroke="#D9CFBF" strokeWidth={60} strokeLinecap="round" />
            <path d="M140 1500 C 300 1400, 200 1250, 420 1200 S 760 1150, 700 1000 S 380 860, 600 760 S 900 700, 940 600" fill="none" stroke={GOLD} strokeWidth={14} strokeLinecap="round" strokeDasharray="1 40" pathLength={1} />
          </svg>
          {Array.from({length: 10}, (_, k) => {
            const pts: [number, number][] = [[150, 1490], [300, 1370], [430, 1200], [620, 1150], [700, 1010], [520, 900], [600, 770], [760, 700], [880, 640], [950, 590]];
            const [x, y] = pts[k];
            const at = 31.9 + k * 0.17;
            const on = t > 42.4 + k * 0.12;
            return <div key={k} style={{position: 'absolute', left: x - 44, top: y - 44, width: 88, height: 88, borderRadius: 44, background: on ? PH[STEPS[k].ph].c : '#fff', border: `5px solid ${on ? '#fff' : INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: on ? '#fff' : INK, transform: `scale(${spring(t, at)})`, boxShadow: on ? `0 0 26px ${PH[STEPS[k].ph].c}` : '0 8px 16px rgba(0,0,0,0.12)'}}>{k + 1}</div>;
          })}
          <Abs x={70} y={600} style={{transform: `scale(${spring(t, 39.6)}) rotate(-6deg)`}}>
            <div style={{width: 230, height: 230, borderRadius: 115, background: '#fff', border: `10px solid #2563EB`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px rgba(37,99,235,0.3)'}}><T size={34} color="#2563EB">NORME</T><T size={60} color={INK}>ISO</T><T size={52} color="#2563EB">9001</T></div>
          </Abs>
          <Abs x={0} y={1580} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 16}}>
            {t > 43.9 && <Chip c={INK} q={spring(t, 43.9)} size={34}>Système de management de la qualité</Chip>}
          </Abs>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Phase 1 : définir le cap ─────────── */
const P1: React.FC = () => {
  const t = useT();
  const o = win(t, 73.2, 108.8, 0.4);
  if (o <= 0) return null;
  const jO = 1 - prog(t, 85.0, 85.5);
  // tour de Jenga
  const wob = t > 83.6 ? Math.sin((t - 83.6) * 9) * 9 * Math.exp(-(t - 83.6) * 1.4) : 0;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {jO > 0 && (
        <AbsoluteFill style={{opacity: jO}}>
          <Abs x={0} y={590} w={1080} style={{textAlign: 'center'}}><T size={70} color="#2563EB" style={{transform: `scale(${spring(t, 77.9)})`}}>LES FONDATIONS</T><Hand size={48} color={DIM}>3 étapes absolument cruciales</Hand></Abs>
          <div style={{position: 'absolute', left: 540, top: 1560, transformOrigin: '0 0', transform: `rotate(${wob}deg)`}}>
            {Array.from({length: 9}, (_, r) => (
              <div key={r} style={{position: 'absolute', left: -210, top: -(r + 1) * 72, width: 420, height: 68, display: 'flex', gap: 6, transform: `translateY(${(1 - spring(t, 74.0 + r * 0.25)) * -900}px)`}}>
                {[0, 1, 2].map((k) => {
                  const missing = r === 0 && k === 1 && t > 82.5 && t < 84.8;
                  return <div key={k} style={{flex: 1, borderRadius: 10, background: r < 1 ? '#2563EB' : `hsl(${30 + r * 4}, 55%, ${68 - r * 2}%)`, boxShadow: 'inset 0 -8px 0 rgba(0,0,0,0.12)', opacity: missing ? 0 : 1, transform: r === 0 && k === 1 ? `translateX(${prog(t, 82.4, 83.0) * 260 * (t < 84.8 ? 1 : 0)}px)` : undefined}} />;
                })}
              </div>
            ))}
          </div>
          {t > 83.6 && <Abs x={0} y={1300} w={1080} style={{display: 'flex', justifyContent: 'center', opacity: 1 - prog(t, 84.6, 85.0)}}><Chip c="#E11D48" q={spring(t, 83.7)}>Risque de s'écrouler</Chip></Abs>}
        </AbsoluteFill>
      )}
      {/* étape 1 : raison d'être */}
      {t > 85.4 && t < 95.4 && (
        <AbsoluteFill style={{opacity: win(t, 85.4, 95.4, 0.35)}}>
          <PopUp at={86.5} style={{position: 'absolute', left: 90, top: 560, width: 900}}>
            <div style={{...Paper, padding: 40, borderTop: '14px solid #2563EB', display: 'flex', alignItems: 'center', gap: 30}}>
              <div style={{transform: `rotate(${Math.sin(t * 2) * 25}deg)`}}><F n="boussole" size={200} /></div>
              <div><T size={34} color="#2563EB">ÉTAPE 1</T><T size={64}>La raison d'être</T><Hand size={40} color={DIM}>de l'organisme</Hand></div>
            </div>
          </PopUp>
          <Abs x={90} y={980} w={900} style={{display: 'flex', flexDirection: 'column', gap: 22}}>
            {[['Son métier', 'outils', 89.4], ['Ses clients', 'equipe', 90.5]].map(([l, ic, at]) => (
              <PopUp key={l as string} at={at as number}><div style={{...Paper, display: 'flex', alignItems: 'center', gap: 22, padding: '20px 30px'}}><F n={ic as string} size={90} /><T size={50}>{l}</T><div style={{marginLeft: 'auto'}}><Check p={prog(t, (at as number) + 0.3, (at as number) + 0.7)} size={60} color="#2563EB" /></div></div></PopUp>
            ))}
            <PopUp at={91.8}><div style={{border: '6px dashed #2563EB', borderRadius: 32, padding: '22px 30px', display: 'flex', alignItems: 'center', gap: 22, background: 'rgba(37,99,235,0.06)'}}><F n="carte" size={90} /><T size={50}>Le périmètre du système</T></div></PopUp>
          </Abs>
        </AbsoluteFill>
      )}
      {/* étape 2 : politique qualité dans son cadre */}
      {t > 95.2 && t < 101.1 && (
        <AbsoluteFill style={{opacity: win(t, 95.2, 101.1, 0.35)}}>
          <PopUp at={95.4} style={{position: 'absolute', left: 140, top: 580, width: 800}}>
            <div style={{position: 'relative', ...Paper, padding: '50px 50px 60px', textAlign: 'center'}}>
              <T size={34} color="#2563EB">ÉTAPE 2</T>
              <F n="parchemin" size={200} />
              <T size={66}>Politique qualité</T>
              {['Engagement de la direction', 'Orientations'].map((l, k) => <div key={l} style={{height: 14, borderRadius: 7, background: '#DCE3F3', margin: '24px auto 0', width: `${80 - k * 20}%`}} />)}
              {/* cadre doré qui se dessine */}
              <svg width={800} height={760} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}><rect x={-14} y={-14} width={828} height={790} rx={44} fill="none" stroke={GOLD} strokeWidth={16} pathLength={1} strokeDasharray={`${prog(t, 99.3, 100.4)} 1`} /></svg>
            </div>
          </PopUp>
          {t > 99.3 && <Abs x={0} y={1440} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Chip c={GOLD} q={spring(t, 99.4)} style={{color: INK}}>Cadre stratégique</Chip></Abs>}
        </AbsoluteFill>
      )}
      {/* étape 3 : objectifs mesurables */}
      {t > 100.9 && (
        <AbsoluteFill style={{opacity: pop(t, 100.9)}}>
          <PopUp at={101.0} style={{position: 'absolute', left: 90, top: 570, width: 900}}>
            <div style={{...Paper, padding: 40, display: 'flex', alignItems: 'center', gap: 30, borderTop: '14px solid #2563EB'}}>
              <F n="cible" size={180} />
              <div><T size={34} color="#2563EB">ÉTAPE 3</T><T size={62}>Des objectifs clairs</T><T size={62} color="#2563EB">et mesurables</T></div>
            </div>
          </PopUp>
          {/* règle graduée qui mesure */}
          {t > 104.2 && (
            <Abs x={110} y={1050} w={860} h={180} style={{...Paper, padding: '24px 30px', boxSizing: 'border-box', transform: `scale(${spring(t, 104.3)})`}}>
              <div style={{position: 'relative', height: 60, background: '#FFE9A8', borderRadius: 12}}>
                {Array.from({length: 21}, (_, k) => <div key={k} style={{position: 'absolute', left: `${k * 5}%`, top: 0, width: 4, height: k % 5 ? 24 : 44, background: INK}} />)}
                <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${prog(t, 104.6, 106.4, easeInOut) * 78}%`, background: 'rgba(37,99,235,0.35)', borderRadius: 12}} />
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 14}}><Hand size={38}>départ</Hand><Hand size={38} color="#2563EB">objectif</Hand></div>
            </Abs>
          )}
          {t > 106.6 && <Abs x={0} y={1300} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Chip c="#2563EB" q={spring(t, 106.6)}><Check p={prog(t, 106.8, 107.2)} size={40} color="#fff" />Stratégie vérifiable</Chip></Abs>}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Phase 2 : cartographier ─────────── */
const P2: React.FC = () => {
  const t = useT();
  const o = win(t, 112.1, 163.5, 0.4);
  if (o <= 0) return null;
  const C = '#F08A00';
  // machine à billes
  const ball = prog(t, 129.0, 136.4, (x) => x);
  const bx = ball < 0.25 ? 120 + ball * 4 * 260 : ball < 0.75 ? 380 + (ball - 0.25) * 2 * 320 : 700 + (ball - 0.75) * 4 * 260;
  const by = ball < 0.25 ? 1150 + ball * 4 * 60 : ball < 0.75 ? 1210 + Math.sin((ball - 0.25) * 2 * Math.PI * 3) * 40 : 1210 + (ball - 0.75) * 4 * 60;
  const out = ball >= 0.75;
  // main des 5M
  const M5: [string, number, string][] = [['Main-d’œuvre', 149.2, 'ouvrier-dark'], ['Milieu', 150.8, 'usine'], ['Matière', 152.2, 'brique'], ['Matériel', 153.0, 'outils'], ['Méthodes', 154.3, 'clipboard']];
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* le moteur */}
      {t < 121.5 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 121.1, 121.5)}}>
          <Abs x={0} y={590} w={1080} style={{textAlign: 'center'}}><Hand size={50} color={DIM}>le cœur du réacteur</Hand><T size={84} color={C} style={{transform: `scale(${spring(t, 115.8)})`}}>LE MOTEUR</T></Abs>
          <Abs x={240} y={860} w={600} h={560}>
            {[[0, 0, 300, 1], [260, 140, 220, -1.3], [80, 300, 200, -1.5]].map(([x, y, sz, sp], k) => (
              <div key={k} style={{position: 'absolute', left: x, top: y, transform: `rotate(${t * 60 * sp}deg) scale(${spring(t, 112.6 + k * 0.3)})`}}><F n="engrenage" size={sz} /></div>
            ))}
          </Abs>
          {t > 118.7 && <Abs x={0} y={1440} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Chip c={C} q={spring(t, 118.8)}>Étape 4 · Les processus</Chip></Abs>}
        </AbsoluteFill>
      )}
      {/* entrée → processus → sortie */}
      {t > 121.4 && t < 142.3 && (
        <AbsoluteFill style={{opacity: win(t, 121.4, 142.3, 0.4)}}>
          <Abs x={0} y={580} w={1080} style={{textAlign: 'center'}}><T size={60}>Un processus, c'est…</T></Abs>
          {/* trois zones */}
          {[['ENTRÉE', 60, 127.5, '#2563EB'], ['PROCESSUS', 360, 125.8, C], ['SORTIE', 760, 130.5, '#0FA968']].map(([l, x, at, c]) => (
            <Abs key={l as string} x={x as number} y={760} w={l === 'PROCESSUS' ? 360 : 260} style={{textAlign: 'center', transform: `scale(${spring(t, at as number)})`}}>
              <div style={{padding: '12px 0', borderRadius: 20, background: c as string, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 36}}>{l}</div>
            </Abs>
          ))}
          {/* machine */}
          <Abs x={360} y={900} w={360} h={420} style={{borderRadius: 40, background: 'linear-gradient(180deg, #FFB547, #F08A00)', boxShadow: 'inset 0 -16px 0 rgba(0,0,0,0.12), 0 24px 50px rgba(240,138,0,0.35)', transform: `scale(${spring(t, 125.9)})`}}>
            <div style={{position: 'absolute', left: 40, top: 40, transform: `rotate(${t * 90}deg)`}}><F n="engrenage" size={140} /></div>
            <div style={{position: 'absolute', right: 30, top: 150, transform: `rotate(${-t * 120}deg)`}}><F n="engrenage" size={110} /></div>
            <div style={{position: 'absolute', left: 30, right: 30, bottom: 40, height: 50, borderRadius: 25, background: 'rgba(255,255,255,0.35)'}} />
          </Abs>
          {/* rail */}
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><path d="M80 1150 L380 1210 M700 1210 L1000 1270" stroke={INK} strokeWidth={10} strokeLinecap="round" opacity={0.3} /></svg>
          {/* objet qui traverse */}
          {t > 128.8 && (ball < 0.25 || out) && (
            <div style={{position: 'absolute', left: bx - 75, top: by - 150, transform: `scale(${spring(t, 128.9)})`}}>{out ? <F n="colis" size={150} /> : <F n="enveloppe" size={150} />}</div>
          )}
          {t > 132.4 && <Abs x={40} y={1340} w={340} style={{textAlign: 'center', transform: `scale(${spring(t, 132.5)})`}}><Hand size={44} color="#2563EB">commande client</Hand></Abs>}
          {t > 135.9 && <Abs x={700} y={1340} w={340} style={{textAlign: 'center', transform: `scale(${spring(t, 136.0)})`}}><Hand size={44} color="#0FA968">produit livré</Hand></Abs>}
          {t > 140.2 && <Abs x={0} y={1460} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Chip c={INK} q={spring(t, 140.3)}>Plus efficace, plus rationnel</Chip></Abs>}
        </AbsoluteFill>
      )}
      {/* les 5M : une main */}
      {t > 142.2 && t < 156.9 && (
        <AbsoluteFill style={{opacity: win(t, 142.2, 156.9, 0.4)}}>
          <Abs x={0} y={580} w={1080} style={{textAlign: 'center'}}><T size={44} color={C}>ÉTAPE 5 · LES RESSOURCES</T><T size={96} style={{transform: `scale(${spring(t, 148.2)})`}}>Les 5M</T></Abs>
          {/* paume */}
          <Abs x={360} y={1180} w={360} h={360} style={{borderRadius: '120px 120px 160px 160px', background: '#8D5A3B', boxShadow: 'inset 0 -20px 0 rgba(0,0,0,0.15)', transform: `scale(${spring(t, 145.0)})`, transformOrigin: '50% 100%'}} />
          {M5.map(([l, at, ic], k) => {
            const ang = [-62, -28, 0, 28, 56][k];
            const len = [220, 330, 360, 330, 260][k];
            const open = spring(t, at, 6, 12);
            return (
              <div key={l} style={{position: 'absolute', left: 540, top: 1300, width: 0, height: 0, transform: `rotate(${ang}deg)`}}>
                <div style={{position: 'absolute', left: -42, top: -len * (0.25 + 0.75 * open), width: 84, height: len * (0.25 + 0.75 * open), borderRadius: 42, background: '#9C6644', boxShadow: 'inset -8px 0 0 rgba(0,0,0,0.12)'}} />
                <div style={{position: 'absolute', left: -90, top: -len - 170, width: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `rotate(${-ang}deg) scale(${open})`, opacity: t > at ? 1 : 0}}>
                  <div style={{width: 120, height: 120, borderRadius: 60, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 0 6px ${C}`}}><F n={ic} size={84} /></div>
                  <div style={{marginTop: 8, padding: '4px 12px', borderRadius: 14, background: C, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 26, whiteSpace: 'nowrap'}}>{l}</div>
                </div>
              </div>
            );
          })}
        </AbsoluteFill>
      )}
      {/* cap + moteur */}
      {t > 156.7 && (
        <AbsoluteFill style={{opacity: pop(t, 156.7)}}>
          <Abs x={0} y={620} w={1080} style={{textAlign: 'center'}}><Hand size={52} color={DIM}>Bien identifier les ressources = bien piloter</Hand></Abs>
          <Abs x={0} y={860} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 50}}>
            <div style={{textAlign: 'center', transform: `translateX(${(1 - prog(t, 162.4, 163.2, easeInOut)) * 0 + prog(t, 162.4, 163.2) * 60}px) scale(${spring(t, 161.3)})`}}><div style={{width: 260, height: 260, borderRadius: 130, background: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n="boussole" size={170} /></div><T size={46} style={{marginTop: 12}}>Le cap</T></div>
            <T size={90} color={GOLD}>+</T>
            <div style={{textAlign: 'center', transform: `translateX(${-prog(t, 162.4, 163.2) * 60}px) scale(${spring(t, 162.2)})`}}><div style={{width: 260, height: 260, borderRadius: 130, background: C, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><div style={{transform: `rotate(${t * 80}deg)`}}><F n="engrenage" size={170} /></div></div><T size={46} style={{marginTop: 12}}>Le moteur</T></div>
          </Abs>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Phase 3 : piloter et documenter ─────────── */
const P3: React.FC = () => {
  const t = useT();
  const o = win(t, 166.8, 217.0, 0.4);
  if (o <= 0) return null;
  const C = '#0FA968';
  const wheel = Math.sin(t * 1.3) * 25;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {t < 174.3 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 173.9, 174.3)}}>
          <Abs x={0} y={620} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 40}}>
            {[['Qui est aux commandes ?', 'superviseur', 166.9], ['Le mode d’emploi', 'classeur', 168.1]].map(([l, ic, at]) => (
              <PopUp key={l} at={at as number}><div style={{...Paper, width: 420, padding: 30, textAlign: 'center'}}><F n={ic as string} size={170} /><T size={44} style={{marginTop: 10}}>{l}</T></div></PopUp>
            ))}
          </Abs>
          <Abs x={0} y={1200} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 20}}>
            <Chip c={C} q={spring(t, 171.2)}>Responsabilités</Chip><Chip c={INK} q={spring(t, 172.4)}>Documentation</Chip>
          </Abs>
        </AbsoluteFill>
      )}
      {/* étape 6 : volant de pilote */}
      {t > 174.1 && t < 196.0 && (
        <AbsoluteFill style={{opacity: win(t, 174.1, 196.0, 0.4)}}>
          <Abs x={0} y={570} w={1080} style={{textAlign: 'center'}}><T size={40} color={C}>ÉTAPE 6</T><T size={70}>Un pilote par processus</T></Abs>
          {/* volant */}
          <Abs x={340} y={760} w={400} h={400} style={{transform: `rotate(${wheel}deg) scale(${spring(t, 176.8)})`}}>
            <svg width={400} height={400} viewBox="0 0 400 400">
              <circle cx={200} cy={200} r={175} fill="none" stroke={INK} strokeWidth={40} />
              <circle cx={200} cy={200} r={175} fill="none" stroke="#2A3A63" strokeWidth={14} strokeDasharray="20 16" />
              {[90, 210, 330].map((a) => <line key={a} x1={200} y1={200} x2={200 + 160 * Math.cos((a * Math.PI) / 180)} y2={200 + 160 * Math.sin((a * Math.PI) / 180)} stroke={INK} strokeWidth={30} />)}
              <circle cx={200} cy={200} r={60} fill={C} stroke={INK} strokeWidth={10} />
            </svg>
          </Abs>
          {t > 180.2 && t < 182.4 && (
            <Abs x={720} y={800} style={{transform: `scale(${spring(t, 180.2)})`}}><div style={{position: 'relative'}}><F n="superviseur" size={150} /><div style={{position: 'absolute', left: -10, top: 66, width: 170 * prog(t, 180.9, 181.3), height: 14, background: '#E11D48', borderRadius: 7, transform: 'rotate(-30deg)', transformOrigin: '0 50%'}} /></div><Hand size={34} color="#E11D48">pas juste un superviseur</Hand></Abs>
          )}
          {/* cadrans de rôle */}
          <Abs x={60} y={1200} w={960} style={{display: 'flex', gap: 20}}>
            {[['Règles du jeu appliquées', 'clipboard', 184.2], ['Indicateurs suivis', 'graphique', 186.2], ['Actions d’amélioration', 'ampoule', 190.2]].map(([l, ic, at]) => (
              <div key={l} style={{flex: 1, ...Paper, padding: '18px 14px', textAlign: 'center', transform: `scale(${spring(t, at as number)})`, borderBottom: `10px solid ${C}`}}>
                <F n={ic as string} size={90} />
                <T size={28} style={{marginTop: 8}}>{l}</T>
              </div>
            ))}
          </Abs>
          {t > 192.7 && <Abs x={0} y={1480} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Chip c={C} q={spring(t, 192.8)}><F n="bouclier" size={44} />Garant du bon fonctionnement</Chip></Abs>}
        </AbsoluteFill>
      )}
      {/* étape 7 : dépliant en accordéon */}
      {t > 195.8 && (
        <AbsoluteFill style={{opacity: pop(t, 195.8)}}>
          <Abs x={0} y={570} w={1080} style={{textAlign: 'center'}}><T size={40} color={C}>ÉTAPE 7</T><T size={70}>La documentation</T></Abs>
          {/* accordéon */}
          <div style={{position: 'absolute', left: 540 - 450, top: 770, width: 900, height: 420, perspective: 1600, display: 'flex'}}>
            {Array.from({length: 4}, (_, k) => {
              const u = prog(t, 197.6 + k * 0.18, 198.6 + k * 0.18, easeOut);
              const ang = (k % 2 ? -1 : 1) * 70 * (1 - u);
              return (
                <div key={k} style={{width: 225, height: 420, background: k % 2 ? '#F7FBF9' : '#fff', transformOrigin: k % 2 ? '0 50%' : '100% 50%', transform: `rotateY(${ang}deg)`, borderRight: '2px solid #E0E7E3', boxShadow: '0 20px 40px rgba(20,33,61,0.12)', padding: 20, boxSizing: 'border-box'}}>
                  <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: C}}>{k + 1}</div>
                  {Array.from({length: 6}, (_, j) => <div key={j} style={{height: 10, borderRadius: 5, background: '#DCE6E0', marginTop: 18, width: `${50 + random(`d${k}${j}`) * 50}%`}} />)}
                  <div style={{marginTop: 24, display: 'flex', justifyContent: 'center'}}><F n={['clipboard', 'engrenage', 'check', 'equipe'][k]} size={70} /></div>
                </div>
              );
            })}
          </div>
          {t > 203.3 && t < 205.0 && <Abs x={0} y={1230} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Chip c={GOLD} q={spring(t, 203.4)} style={{color: INK}}>Pas une contrainte : un super outil</Chip></Abs>}
          {t > 205.0 && (
            <Abs x={60} y={1230} w={960} style={{display: 'flex', gap: 18}}>
              {/* même façon : 3 silhouettes synchronisées */}
              <div style={{flex: 1, ...Paper, padding: 16, textAlign: 'center', transform: `scale(${spring(t, 205.9)})`}}>
                <div style={{display: 'flex', justifyContent: 'center', gap: 2}}>{[0, 1, 2].map((k) => <div key={k} style={{transform: `translateY(${Math.abs(Math.sin(t * 4)) * -14}px)`}}><F n="ouvrier" size={66} /></div>)}</div>
                <T size={26}>Tous de la même façon</T>
              </div>
              <div style={{flex: 1, ...Paper, padding: 16, textAlign: 'center', transform: `scale(${spring(t, 208.5)})`}}>
                <div style={{display: 'flex', justifyContent: 'center'}}><div style={{width: 70, height: 70, borderRadius: 35, background: C, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Check p={prog(t, 209.8, 210.2)} size={50} color="#fff" /></div></div>
                <T size={26} style={{marginTop: 6}}>Preuve de conformité</T>
              </div>
              <div style={{flex: 1, ...Paper, padding: 16, textAlign: 'center', transform: `scale(${spring(t, 213.0)})`}}>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-end'}}><F n="main-levee" size={70} /><div style={{transform: `translateX(${(1 - prog(t, 213.2, 214.0)) * -40}px)`}}><F n="classeur" size={50} /></div></div>
                <T size={26}>Intégration des nouveaux</T>
              </div>
            </Abs>
          )}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Phase 4 : mesurer ─────────── */
const P4: React.FC = () => {
  const t = useT();
  const o = win(t, 219.8, 269.9, 0.4);
  if (o <= 0) return null;
  const C = '#E11D48';
  const needle = (t - 220) * 0.6;
  const REELS: [string, number][] = [['Pertinent', 257.0], ['Simple', 260.4], ['Mesurable', 264.8], ['Atteignable', 266.6]];
  const WORDS = ['Pertinent', 'Simple', 'Mesurable', 'Atteignable', 'Rapide', 'Coûteux', 'Flou', 'Joli'];
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* tableau de bord automobile */}
      {t < 248.2 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 247.8, 248.2)}}>
          <Abs x={0} y={570} w={1080} style={{textAlign: 'center'}}><T size={74} color={C} style={{transform: `scale(${spring(t, 220.2)})`}}>Le tableau de bord</T>{t > 230.3 && <Hand size={48} color={DIM}>Étape 8 · la surveillance, 3 types</Hand>}</Abs>
          <Abs x={60} y={780} w={960} h={460} style={{borderRadius: '230px 230px 60px 60px', background: 'linear-gradient(180deg, #1B2238, #0E1424)', boxShadow: '0 30px 60px rgba(0,0,0,0.35), inset 0 0 0 8px #2A3352', transform: `scale(${spring(t, 220.4)})`}}>
            {/* 3 cadrans */}
            {[['Contrôles', 'loupe', 235.8, 210], ['Audits internes', 'clipboard', 239.8, 480], ['Performance', 'graphique', 245.0, 750]].map(([l, ic, at, cx], k) => {
              const on = t > (at as number);
              const a = on ? -110 + 220 * (0.55 + 0.25 * Math.sin(t * 1.5 + k)) : -110 + Math.min(220, needle * 40) * 0;
              return (
                <div key={l as string} style={{position: 'absolute', left: (cx as number) - 130, top: 60, width: 260, height: 260}}>
                  <svg width={260} height={260} viewBox="0 0 260 260">
                    <circle cx={130} cy={130} r={115} fill="#121A2E" stroke={on ? C : '#3A4466'} strokeWidth={10} />
                    {Array.from({length: 11}, (_, j) => { const aa = ((-110 + j * 22 - 90) * Math.PI) / 180; return <line key={j} x1={130 + 92 * Math.cos(aa)} y1={130 + 92 * Math.sin(aa)} x2={130 + 106 * Math.cos(aa)} y2={130 + 106 * Math.sin(aa)} stroke="#8892B0" strokeWidth={4} />; })}
                    <g transform={`translate(130 130) rotate(${a})`}><line x1={0} y1={0} x2={0} y2={-90} stroke={on ? '#FFB21E' : '#556'} strokeWidth={8} strokeLinecap="round" /></g>
                    <circle cx={130} cy={130} r={16} fill="#fff" />
                  </svg>
                  <div style={{position: 'absolute', left: 0, right: 0, top: 170, display: 'flex', justifyContent: 'center', opacity: on ? 1 : 0.25}}><F n={ic as string} size={60} /></div>
                  <div style={{textAlign: 'center', marginTop: 4, fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: on ? '#fff' : '#556'}}>{l}</div>
                </div>
              );
            })}
          </Abs>
          {t > 236.2 && t < 239.8 && <Abs x={0} y={1300} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Chip c={INK} q={spring(t, 236.3)}><F n="colis" size={44} />Vérifier à la réception</Chip></Abs>}
          {t > 240.5 && t < 244.9 && <Abs x={0} y={1300} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Chip c={INK} q={spring(t, 240.6)}>Le système appliqué sur le terrain ?</Chip></Abs>}
          {t > 245.6 && <Abs x={0} y={1300} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Chip c={C} q={spring(t, 245.7)}>Grâce à des indicateurs</Chip></Abs>}
        </AbsoluteFill>
      )}
      {/* étape 9 : machine à sous */}
      {t > 248.0 && (
        <AbsoluteFill style={{opacity: pop(t, 248.0)}}>
          <Abs x={0} y={570} w={1080} style={{textAlign: 'center'}}><T size={40} color={C}>ÉTAPE 9</T><T size={66}>Un bon indicateur, c'est…</T></Abs>
          <Abs x={60} y={790} w={960} h={600} style={{borderRadius: 50, background: `linear-gradient(180deg, ${C}, #A50E33)`, boxShadow: '0 30px 60px rgba(225,29,72,0.35), inset 0 -18px 0 rgba(0,0,0,0.15)', transform: `scale(${spring(t, 249.7)})`}}>
            <div style={{position: 'absolute', left: 40, right: 40, top: 40, height: 60, display: 'flex', justifyContent: 'center', gap: 14}}>{Array.from({length: 9}, (_, k) => <div key={k} style={{width: 26, height: 26, borderRadius: 13, background: Math.floor(t * 6 + k) % 2 ? GOLD : '#FFE7A1'}} />)}</div>
            <div style={{position: 'absolute', left: 40, right: 40, top: 120, height: 400, display: 'flex', gap: 14}}>
              {REELS.map(([w, at], k) => {
                const spin = t < at;
                const idx = WORDS.indexOf(w);
                const pos = spin ? (t * 9 + k * 1.7) % WORDS.length : idx;
                const land = spring(t, at, 9, 20);
                return (
                  <div key={w} style={{flex: 1, background: '#fff', borderRadius: 24, overflow: 'hidden', position: 'relative', boxShadow: 'inset 0 12px 20px rgba(0,0,0,0.25)'}}>
                    <div style={{position: 'absolute', left: 0, right: 0, top: 150 - pos * 100 + (spin ? 0 : (1 - land) * -40), filter: spin ? 'blur(3px)' : undefined}}>
                      {[...WORDS, ...WORDS].map((x, j) => <div key={j} style={{height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK}}>{x}</div>)}
                    </div>
                    {!spin && <div style={{position: 'absolute', left: 0, right: 0, top: 150, height: 100, border: `5px solid ${GOLD}`, borderRadius: 16, boxSizing: 'border-box'}} />}
                    {!spin && <div style={{position: 'absolute', left: '50%', bottom: 16, marginLeft: -26}}><Check p={prog(t, at + 0.15, at + 0.5)} size={52} color="#0FA968" /></div>}
                  </div>
                );
              })}
            </div>
            {/* levier */}
            <div style={{position: 'absolute', right: -60, top: 150, width: 24, height: 200, borderRadius: 12, background: '#C7CBD6', transformOrigin: '50% 100%', transform: `rotate(${t > 250.4 && t < 251.2 ? 30 : 0}deg)`}}><div style={{position: 'absolute', left: -18, top: -40, width: 60, height: 60, borderRadius: 30, background: GOLD}} /></div>
          </Abs>
          <Abs x={60} y={1420} w={960} style={{display: 'flex', justifyContent: 'space-between'}}>
            {[['lié aux objectifs', 257.6], ['facile à calculer', 261.4], ['objectif', 265.0], ['pour motiver', 268.0]].map(([l, at]) => <div key={l as string} style={{width: 225, textAlign: 'center', opacity: pop(t, at as number)}}><Hand size={34}>{l}</Hand></div>)}
          </Abs>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Étape 10 : amélioration continue ─────────── */
const P5: React.FC = () => {
  const t = useT();
  const o = win(t, 273.1, 308.2, 0.4);
  if (o <= 0) return null;
  const C = '#7C3AED';
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* état d'esprit + carburant */}
      {t < 285.0 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 284.6, 285.0)}}>
          <Abs x={0} y={590} w={1080} style={{textAlign: 'center'}}>
            <Hand size={52} color={DIM}>pas une fin…</Hand>
            <T size={80} color={C} style={{transform: `scale(${spring(t, 274.6)})`}}>un état d'esprit</T>
          </Abs>
          {t > 277.2 && (
            <Abs x={240} y={900} w={600} h={420} style={{transform: `scale(${spring(t, 277.3)})`}}>
              <svg width={600} height={420} viewBox="0 0 600 420">
                <path d="M60 340 A240 240 0 0 1 540 340" fill="none" stroke="#E6DEF9" strokeWidth={50} strokeLinecap="round" />
                <path d="M60 340 A240 240 0 0 1 540 340" fill="none" stroke={C} strokeWidth={50} strokeLinecap="round" pathLength={1} strokeDasharray={`${0.05 + 0.95 * prog(t, 280.6, 283.4, easeInOut)} 1`} />
                <g transform={`translate(300 340) rotate(${-90 + 180 * (0.05 + 0.95 * prog(t, 280.6, 283.4, easeInOut))})`}><line x1={0} y1={0} x2={-200} y2={0} stroke={INK} strokeWidth={14} strokeLinecap="round" /></g>
                <circle cx={300} cy={340} r={28} fill={INK} />
                <text x={50} y={410} fontFamily={sansFont} fontWeight={900} fontSize={40} fill="#E11D48">E</text>
                <text x={530} y={410} fontFamily={sansFont} fontWeight={900} fontSize={40} fill="#0FA968">F</text>
              </svg>
            </Abs>
          )}
          {t > 280.6 && <Abs x={0} y={1380} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Chip c={C} q={spring(t, 280.6)}>Le carburant de la démarche</Chip></Abs>}
        </AbsoluteFill>
      )}
      {/* puzzle qui s'assemble */}
      {t > 284.8 && t < 287.6 && (
        <AbsoluteFill style={{opacity: win(t, 284.8, 287.6, 0.3)}}>
          {Array.from({length: 9}, (_, k) => {
            const r = Math.floor(k / 3), c = k % 3;
            const q = prog(t, 284.9 + k * 0.1, 285.7 + k * 0.1, easeOut);
            const sx = (random(`px${k}`) - 0.5) * 1200, sy = (random(`py${k}`) - 0.5) * 1400;
            return <div key={k} style={{position: 'absolute', left: 240 + c * 200 + sx * (1 - q), top: 760 + r * 200 + sy * (1 - q), width: 196, height: 196, borderRadius: 24, background: PH[Math.min(4, Math.floor(k / 2))].c, transform: `rotate(${(1 - q) * 180}deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 0 0 6px rgba(255,255,255,0.5)'}}><F n="puzzle" size={110} /></div>;
          })}
        </AbsoluteFill>
      )}
      {/* roue de Deming qui monte la pente */}
      {t > 287.3 && (() => {
        const climb = prog(t, 288.0, 307.6, (x) => x);
        const slope = -14;
        const dist = climb * 520;
        const tn = Math.tan((-slope * Math.PI) / 180);
        const cx = 240 + dist * Math.cos((slope * Math.PI) / 180);
        const sy = (x: number) => 1450 - (x - 60) * tn;
        const cy = sy(cx) - 196 - 30;
        const Q: [string, string, number][] = [['P', 'Plan', 293.0], ['D', 'Do', 294.2], ['C', 'Check', 297.6], ['A', 'Act', 300.7]];
        return (
          <AbsoluteFill style={{opacity: pop(t, 287.3)}}>
            <Abs x={0} y={580} w={1080} style={{textAlign: 'center'}}><T size={64}>La roue de l'amélioration</T><T size={52} color={C} style={{transform: `scale(${spring(t, 290.3)})`}}>PDCA</T></Abs>
            {/* pente */}
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
              <path d={`M60 ${1450} L1040 ${1450 - 980 * Math.tan((-slope * Math.PI) / 180)} L1040 1600 L60 1600 Z`} fill="#E9E1D2" />
              <path d={`M60 1450 L1040 ${1450 - 980 * Math.tan((-slope * Math.PI) / 180)}`} stroke={INK} strokeWidth={8} />
            </svg>
            {/* roue */}
            <div style={{position: 'absolute', left: cx - 190, top: cy - 190 + 30, width: 380, height: 380, transform: `rotate(${dist * 0.8}deg)`}}>
              <svg width={380} height={380} viewBox="0 0 380 380">
                {Q.map(([l, , at], k) => {
                  const a0 = (k * 90 - 90) * Math.PI / 180, a1 = ((k + 1) * 90 - 90) * Math.PI / 180;
                  const on = t > at;
                  return <g key={l}><path d={`M190 190 L${190 + 180 * Math.cos(a0)} ${190 + 180 * Math.sin(a0)} A180 180 0 0 1 ${190 + 180 * Math.cos(a1)} ${190 + 180 * Math.sin(a1)} Z`} fill={on ? PH[k].c : '#D5CDBF'} stroke="#fff" strokeWidth={8} /><text x={190 + 100 * Math.cos((a0 + a1) / 2)} y={190 + 100 * Math.sin((a0 + a1) / 2) + 22} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={70} fill="#fff" transform={`rotate(${-dist * 0.8} ${190 + 100 * Math.cos((a0 + a1) / 2)} ${190 + 100 * Math.sin((a0 + a1) / 2)})`}>{l}</text></g>;
                })}
                <circle cx={190} cy={190} r={40} fill={INK} />
              </svg>
            </div>
            {/* cale « système qualité » */}
            <div style={{position: 'absolute', left: cx - 150, top: sy(cx - 90) - 86, width: 0, height: 0, borderBottom: `90px solid ${GOLD}`, borderRight: '110px solid transparent', transformOrigin: '0 100%', transform: `rotate(${slope}deg)`, opacity: pop(t, 302.0)}} />
            {/* légendes P D C A */}
            <Abs x={60} y={800} w={960} style={{display: 'flex', justifyContent: 'center', gap: 12, marginTop: 10}}>
              {Q.map(([l, w, at], k) => <Chip key={l} c={PH[k].c} q={spring(t, at)} size={32} style={{padding: '8px 18px'}}>{l} · {w}</Chip>)}
            </Abs>
            {t > 302.0 && <Abs x={0} y={900} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Hand size={50} style={{opacity: pop(t, 302.0)}}>un cycle vertueux qui ne s'arrête jamais</Hand></Abs>}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Conclusion ─────────── */
const Concl: React.FC = () => {
  const t = useT();
  if (t < 308.0) return null;
  const o = pop(t, 308.1, 0.6);
  const road = prog(t, 321.0, 324.5, easeInOut);
  return (
    <AbsoluteFill style={{opacity: o}}>
      {t < 320.4 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 320.0, 320.4)}}>
          <Abs x={0} y={600} w={1080} style={{textAlign: 'center'}}><Hand size={52} color={DIM}>Construire un système qualité ?</Hand><T size={84} color="#0FA968" style={{transform: `scale(${spring(t, 311.2)})`}}>Plus accessible</T><T size={60}>qu'il n'y paraît</T></Abs>
          {/* la montagne de papier devenue colline + pousse arrosée au quotidien */}
          <Abs x={140} y={1020} w={800} h={420}>
            <svg width={800} height={420} viewBox="0 0 800 420"><path d={`M0 420 Q400 ${420 - 380 * (1 - prog(t, 311.2, 312.6, easeInOut) * 0.75)} 800 420 Z`} fill="#D9CFBF" /></svg>
            {t > 316.8 && <div style={{position: 'absolute', left: 340, top: 120, transform: `scale(${0.5 + 0.8 * prog(t, 316.8, 319.6)})`, transformOrigin: '50% 100%'}}><F n="pousse" size={140} /></div>}
          </Abs>
          {t > 316.8 && <Abs x={0} y={1460} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Chip c="#0FA968" q={spring(t, 316.8)}>Le faire vivre au quotidien</Chip></Abs>}
        </AbsoluteFill>
      )}
      {t > 320.2 && (
        <AbsoluteFill style={{opacity: pop(t, 320.2)}}>
          {/* route vers l'horizon */}
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFE7B0" /><stop offset="1" stopColor={BG} /></linearGradient></defs>
            <rect x={0} y={560} width={1080} height={520} fill="url(#sky)" />
            <circle cx={540} cy={1060} r={140} fill={GOLD} opacity={0.7} />
            <path d="M200 1640 L520 1060 L560 1060 L880 1640 Z" fill="#3A4558" />
            {Array.from({length: 8}, (_, k) => { const q = ((k / 8 + t * 0.25) % 1); const y = 1060 + q * q * 580; const w = 4 + q * 14; return <rect key={k} x={540 - w / 2} y={y} width={w} height={20 + q * 50} fill="#fff" opacity={road} />; })}
            <rect x={0} y={1060} width={1080} height={4} fill="#C9BFAE" />
          </svg>
          {t > 321.2 && t < 323.0 && <Abs x={760} y={900} style={{transform: `scale(${spring(t, 321.2)})`}}><div style={{position: 'relative'}}><svg width={140} height={180} viewBox="0 0 70 90"><rect x={6} y={6} width={5} height={84} fill={INK} /><rect x={11} y={6} width={50} height={32} fill="#fff" stroke={INK} strokeWidth={2} />{[0, 1, 2, 3, 4].map((i) => [0, 1, 2].map((j) => (i + j) % 2 ? <rect key={`${i}${j}`} x={11 + i * 10} y={6 + j * 10.6} width={10} height={10.6} fill={INK} /> : null))}</svg><div style={{position: 'absolute', left: -10, top: 70, width: 160 * prog(t, 321.9, 322.3), height: 12, background: '#E11D48', borderRadius: 6, transform: 'rotate(-30deg)', transformOrigin: '0 50%'}} /></div><Hand size={34} color="#E11D48">pas une destination</Hand></Abs>}
          <Abs x={0} y={600} w={1080} style={{textAlign: 'center'}}><T size={86} style={{transform: `scale(${spring(t, 323.0)})`}}>Un voyage</T><T size={86} color="#2563EB" style={{transform: `scale(${spring(t, 324.1)})`}}>permanent</T></Abs>
          {/* pion au départ + dé */}
          {t > 326.5 && (
            <>
              <Abs x={0} y={1300} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 40}}>
                <div style={{transform: `scale(${spring(t, 326.6)})`, filter: 'drop-shadow(0 18px 12px rgba(0,0,0,0.35))', position: 'relative', width: 120, height: 200}}>
                  <div style={{position: 'absolute', left: 27, top: 0, width: 66, height: 66, borderRadius: 33, background: 'radial-gradient(circle at 35% 30%, #FF8FA3, #E11D48)'}} />
                  <div style={{position: 'absolute', left: 9, top: 54, width: 0, height: 0, borderLeft: '51px solid transparent', borderRight: '51px solid transparent', borderBottom: '120px solid #E11D48'}} />
                  <div style={{position: 'absolute', left: 0, top: 166, width: 120, height: 32, borderRadius: 16, background: '#B3123A'}} />
                </div>
                <div style={{transform: `translateY(${(1 - prog(t, 327.0, 328.2, easeOut)) * -300}px)`}}><Dice size={150} rx={-20 + (1 - prog(t, 327.0, 328.4)) * 720} ry={30 + (1 - prog(t, 327.0, 328.4)) * 540} /></div>
              </Abs>
              <Abs x={0} y={1530} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Chip c="#E11D48" q={spring(t, 327.2)} size={42}>Par où commence le vôtre ?</Chip></Abs>
            </>
          )}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── En-tête ─────────── */
const Header: React.FC = () => {
  const t = useT();
  const ph = PH.find((p) => t >= p.at && t < p.end);
  const step = STEPS.reduce((a, st, k) => (t >= st.at - 0.2 ? k : a), -1);
  const showStep = ph && step >= 0 && STEPS[step].ph === PH.indexOf(ph);
  return (
    <AbsoluteFill style={{zIndex: 40, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: '50%', top: 95, transform: 'translateX(-50%)', background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(20,33,61,0.1)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div>
      {t > 2.8 && t < 48.0 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 240, display: 'flex', justifyContent: 'center', opacity: pop(t, 2.8) * (1 - prog(t, 47.6, 48.0))}}>
          <div style={{padding: '10px 26px', borderRadius: 40, background: '#fff', boxShadow: '0 10px 30px rgba(20,33,61,0.1)'}}><T size={38}>Démarche qualité <span style={{color: '#2563EB'}}>en 10 étapes</span></T></div>
        </div>
      )}
      {ph && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 240, display: 'flex', justifyContent: 'center', gap: 12, opacity: pop(t, ph.at + 2.6) * (1 - prog(t, ph.end - 0.3, ph.end))}}>
          <div style={{padding: '10px 24px', borderRadius: 40, background: ph.c}}><T size={34} color="#fff">{ph.n < 5 ? `Phase ${ph.n} · ${ph.l}` : ph.l}</T></div>
          {showStep && <div style={{padding: '10px 22px', borderRadius: 40, background: '#fff', boxShadow: '0 10px 30px rgba(20,33,61,0.1)', transform: `scale(${spring(t, STEPS[step].at - 0.2)})`}}><T size={34} color={ph.c}>Étape {step + 1}/10</T></div>}
        </div>
      )}
      {/* 10 jalons de progression */}
      {t > 70.0 && t < 308.0 && (
        <div style={{position: 'absolute', left: 140, right: 140, top: 340, display: 'flex', gap: 8, alignItems: 'center', opacity: pop(t, 70.0) * (1 - prog(t, 307.6, 308.0))}}>
          {STEPS.map((st, k) => <div key={k} style={{flex: 1, height: 12, borderRadius: 6, background: t >= st.at - 0.2 ? PH[st.ph].c : 'rgba(20,33,61,0.12)', transform: `scaleY(${k === step ? 1.6 : 1})`}} />)}
        </div>
      )}
    </AbsoluteFill>
  );
};

const Bg: React.FC = () => {
  const t = useT();
  const ph = PH.find((p) => t >= p.at && t < p.end);
  const c = ph ? ph.c : '#2563EB';
  return (
    <AbsoluteFill style={{background: BG}}>
      <AbsoluteFill style={{backgroundImage: 'linear-gradient(rgba(20,33,61,0.05) 2px, transparent 2px), linear-gradient(90deg, rgba(20,33,61,0.05) 2px, transparent 2px)', backgroundSize: '60px 60px', backgroundPosition: `0 ${-t * 5}px`}} />
      <AbsoluteFill style={{background: `radial-gradient(circle at 85% 20%, ${c}22, transparent 45%), radial-gradient(circle at 10% 85%, ${c}18, transparent 40%)`}} />
    </AbsoluteFill>
  );
};

const OutroFade: React.FC = () => {
  const t = useT();
  return <AbsoluteFill style={{background: 'linear-gradient(180deg, #FBFAF6 0%, #F1EDE3 100%)', zIndex: 80, opacity: prog(t, OUTRO_AT - 0.5, OUTRO_AT)}} />;
};

const CUES: Sfx[] = [
  {at: 0.05, s: 'signature', v: 0.35},
  {at: 2.3, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...Array.from({length: 12}, (_, k) => ({at: 2.7 + k * 0.33, s: 'page', v: 0.28})),
  {at: 6.6, s: 'sfx/pop', v: 0.3}, {at: 7.4, s: 'sfx/pop', v: 0.3}, {at: 8.2, s: 'sfx/pop', v: 0.3},
  {at: 10.4, s: 'soft-whoosh', v: 0.5, dur: 2}, {at: 10.7, s: 'validation', v: 0.3}, {at: 13.0, s: 'sfx/ding', v: 0.3},
  {at: 18.4, s: 'sfx/pop', v: 0.3}, {at: 24.7, s: 'notification', v: 0.35},
  ...Array.from({length: 7}, (_, k) => ({at: 26.2 + k * 0.2, s: 'sfx/pop', v: 0.22})),
  {at: 29.3, s: 'sfx/thud', v: 0.45},
  ...Array.from({length: 10}, (_, k) => ({at: 31.9 + k * 0.17, s: 'sfx/click', v: 0.22})),
  {at: 39.6, s: 'tampon', v: 0.5},
  ...Array.from({length: 10}, (_, k) => ({at: 42.4 + k * 0.12, s: 'tick', v: 0.22})),
  {at: 48.0, s: 'soft-whoosh', v: 0.55, dur: 2},
  ...Array.from({length: 10}, (_, k) => ({at: 48.3 + k * 0.12, s: 'sfx/click', v: 0.25})),
  ...[54.3, 55.1, 59.0, 62.4, 66.7].map((at) => ({at, s: 'sfx/pop', v: 0.32})),
  // passages du plateau : dé + sauts du pion
  ...BOARD.flatMap(([a, , from, to], bi) => {
    const roll = a === 48.0 ? 68.2 : a + 0.3;
    const moveAt = [68.4, 110.2, 165.0, 218.3, 271.3][bi];
    const n = to - from;
    return [{at: roll, s: 'sfx/swish', v: 0.35}, {at: roll + 0.7, s: 'sfx/thud', v: 0.35}, ...Array.from({length: n}, (_, k) => ({at: moveAt + 0.45 * (k + 1) - 0.05, s: 'sfx/click', v: 0.4}))];
  }),
  ...PH.slice(0, 5).map((p) => ({at: p.at + 0.3, s: 'bass-hit', v: 0.35})),
  ...BOARD.slice(1).map(([, b]) => ({at: b - 0.9, s: 'soft-whoosh', v: 0.5, dur: 1.5})),
  ...Array.from({length: 9}, (_, k) => ({at: 74.0 + k * 0.25, s: 'sfx/thud', v: 0.22})),
  {at: 82.4, s: 'sfx/swish', v: 0.3}, {at: 83.6, s: 'deep-hit', v: 0.45},
  ...[86.5, 89.4, 90.5, 91.8, 95.4, 101.0].map((at) => ({at, s: 'page', v: 0.4})),
  {at: 99.3, s: 'stylo', v: 0.3, dur: 1.2}, {at: 104.3, s: 'sfx/pop', v: 0.3}, {at: 106.6, s: 'validation', v: 0.32},
  {at: 115.8, s: 'bass-hit', v: 0.3}, {at: 118.8, s: 'sfx/pop', v: 0.3},
  {at: 125.9, s: 'sfx/pop', v: 0.3}, {at: 127.5, s: 'sfx/pop', v: 0.25}, {at: 129.0, s: 'sfx/whoosh', v: 0.3}, {at: 130.5, s: 'sfx/pop', v: 0.25},
  {at: 132.5, s: 'sfx/swish', v: 0.3}, {at: 135.8, s: 'sfx/ding', v: 0.32}, {at: 140.3, s: 'validation', v: 0.3},
  {at: 145.0, s: 'sfx/pop', v: 0.3}, {at: 148.2, s: 'bass-hit', v: 0.35},
  ...[149.2, 150.8, 152.2, 153.0, 154.3].map((at) => ({at, s: 'sfx/pop', v: 0.32})),
  {at: 161.3, s: 'sfx/pop', v: 0.3}, {at: 162.2, s: 'sfx/pop', v: 0.3}, {at: 162.9, s: 'validation', v: 0.3},
  {at: 166.9, s: 'page', v: 0.4}, {at: 168.1, s: 'page', v: 0.4}, {at: 171.2, s: 'sfx/pop', v: 0.25}, {at: 172.4, s: 'sfx/pop', v: 0.25},
  {at: 176.8, s: 'sfx/swish', v: 0.3}, {at: 180.9, s: 'sfx/swish', v: 0.3},
  ...[184.2, 186.2, 190.2].map((at) => ({at, s: 'sfx/pop', v: 0.3})), {at: 192.8, s: 'validation', v: 0.32},
  ...Array.from({length: 4}, (_, k) => ({at: 197.6 + k * 0.18, s: 'page', v: 0.35})),
  {at: 203.4, s: 'sfx/ding', v: 0.3}, {at: 205.9, s: 'sfx/pop', v: 0.3}, {at: 209.8, s: 'validation', v: 0.3}, {at: 213.0, s: 'sfx/pop', v: 0.3},
  {at: 220.2, s: 'sfx/rise', v: 0.3}, {at: 235.8, s: 'tick', v: 0.35}, {at: 239.8, s: 'tick', v: 0.35}, {at: 245.0, s: 'tick', v: 0.35},
  {at: 249.7, s: 'sfx/pop', v: 0.3}, {at: 250.4, s: 'sfx/click', v: 0.45},
  ...Array.from({length: 40}, (_, k) => ({at: 250.6 + k * 0.4, s: 'tick', v: 0.12})).filter((c) => c.at < 266.6),
  ...[257.0, 260.4, 264.8, 266.6].map((at) => ({at, s: 'validation', v: 0.35})),
  {at: 274.6, s: 'sfx/pop', v: 0.3}, {at: 277.3, s: 'sfx/pop', v: 0.3}, {at: 280.6, s: 'riser', v: 0.2, dur: 3},
  ...Array.from({length: 9}, (_, k) => ({at: 285.6 + k * 0.1, s: 'sfx/click', v: 0.3})),
  {at: 290.3, s: 'bass-hit', v: 0.35}, ...[293.0, 294.2, 297.6, 300.7].map((at) => ({at, s: 'sfx/pop', v: 0.35})), {at: 302.0, s: 'sfx/thud', v: 0.35},
  {at: 308.1, s: 'soft-whoosh', v: 0.5, dur: 2}, {at: 311.2, s: 'sfx/pop', v: 0.3}, {at: 316.8, s: 'sfx/ding', v: 0.3},
  {at: 320.2, s: 'soft-whoosh', v: 0.5, dur: 2}, {at: 321.9, s: 'sfx/swish', v: 0.3}, {at: 323.0, s: 'bass-hit', v: 0.35}, {at: 324.1, s: 'sfx/pop', v: 0.3},
  {at: 327.0, s: 'sfx/swish', v: 0.35}, {at: 328.2, s: 'sfx/thud', v: 0.4}, {at: 327.2, s: 'notification', v: 0.35},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const DemarcheQualite: React.FC = () => (
  <AbsoluteFill style={{background: BG}}>
    <Bg />
    <Gate from={0} to={48.5}><Hook /></Gate>
    <Gate from={73} to={109.2}><P1 /></Gate>
    <Gate from={112} to={164}><P2 /></Gate>
    <Gate from={166.5} to={217.4}><P3 /></Gate>
    <Gate from={219.5} to={270.3}><P4 /></Gate>
    <Gate from={273} to={308.5}><P5 /></Gate>
    <Gate from={308} to={OUTRO_AT}><Concl /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={48} to={273.4}><Board /></Gate>
    <Gate from={0} to={3.1}><Cover /></Gate>
    <Gate from={OUTRO_AT - 0.5} to={999}><OutroFade /></Gate>
    <Gate from={OUTRO_AT} to={999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.4} to={OUTRO_AT}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-demarche-qualite-10-etapes-origine.m4a')} trimAfter={s(329.0)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);
