import {Img, staticFile} from 'remotion';
import {easeInOut, prog, useT} from '../anim';
import {colors} from '../theme';
import {SEG} from './timeline';

/**
 * Démonstration en vue zénithale : victime, secouriste 1 (à la tête) et secouriste 2 (sur le côté),
 * dessinés et articulés. Repère : la victime est allongée, tête à gauche ; le retournement se fait
 * vers le bas de l'écran (côté du secouriste 2).
 */

export type P = {x: number; y: number};
type P3 = {x: number; y: number; z: number};

const SKIN_V = '#6E4227'; // victime
const SKIN_1 = '#3E2416'; // secouriste 1
const SKIN_2 = '#5C3620'; // secouriste 2
const HAIR = '#16100C';
const TEE = '#8E949C';
const TEE_D = '#6F757D';
const PANTS = '#23262B';
const NAVY = colors.navy;
const GLOVE = '#5B8DEF';

const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const lp = (a: P3, b: P3, k: number): P3 => ({x: lerp(a.x, b.x, k), y: lerp(a.y, b.y, k), z: lerp(a.z, b.z, k)});
const lp2 = (a: P, b: P, k: number): P => ({x: lerp(a.x, b.x, k), y: lerp(a.y, b.y, k)});

/** Cinématique inverse à deux segments (bras / jambes des secouristes). */
const ik = (s: P, t: P, a: number, b: number, bend: 1 | -1): P => {
  const dx = t.x - s.x;
  const dy = t.y - s.y;
  const d = Math.min(Math.hypot(dx, dy), a + b - 1);
  const ang = Math.atan2(dy, dx);
  const cos = (a * a + d * d - b * b) / (2 * a * d);
  const off = Math.acos(Math.max(-1, Math.min(1, cos)));
  return {x: s.x + Math.cos(ang + bend * off) * a, y: s.y + Math.sin(ang + bend * off) * a};
};

// Poses dans le repère du corps (avant rotation). z = hauteur au-dessus du sol.
type Pose = Record<'sF' | 'sN' | 'eF' | 'eN' | 'hF' | 'hN' | 'pF' | 'pN' | 'kF' | 'kN' | 'fF' | 'fN', P3>;
const P0: Pose = {
  sF: {x: 420, y: 470, z: 20}, sN: {x: 420, y: 610, z: 20},
  eF: {x: 525, y: 440, z: 8}, eN: {x: 525, y: 640, z: 8},
  hF: {x: 625, y: 428, z: 8}, hN: {x: 625, y: 652, z: 8},
  pF: {x: 660, y: 500, z: 20}, pN: {x: 660, y: 580, z: 20},
  kF: {x: 850, y: 488, z: 12}, kN: {x: 850, y: 592, z: 12},
  fF: {x: 1035, y: 478, z: 10}, fN: {x: 1035, y: 602, z: 10},
};

const PIVOT = 612; // axe de rotation (bord du corps côté retournement)

/** Projection d'un point du corps tourné d'un angle th (rad) vers le bas de l'écran. */
const rot = (p: P3, th: number): P => ({x: p.x, y: PIVOT + (p.y - PIVOT) * Math.cos(th) + p.z * Math.sin(th)});

export type Rig = {
  th: number;
  head: P;
  face: number;
  sF: P; sN: P; eF: P; eN: P; hF: P; hN: P;
  pF: P; pN: P; kF: P; kN: P; fF: P; fN: P;
  torsoY: number; torsoW: number;
};

/** Calcule la position de chaque articulation de la victime à l'instant t. */
export const victim = (t: number): Rig => {
  const S = SEG;
  const legs = prog(t, S.p2.start + 0.6, S.p2.start + 2.6, easeInOut);
  const arm90 = prog(t, S.p3.start + 0.4, S.p3.start + 2.6, easeInOut);
  const ear = prog(t, S.p4.start + 1.2, S.p4.start + 4.2, easeInOut);
  const knee0 = prog(t, S.t5.start + 2.0, S.t5.start + 3.4, easeInOut) * (1 - prog(t, S.t5.start + 6.6, S.t5.start + 7.8, easeInOut));
  const th = (Math.PI / 2) * prog(t, S.t3.start + 2.2, S.t3.start + 5.6, easeInOut);
  const knee = prog(t, S.s2.start + 1.2, S.s2.start + 3.6, easeInOut);

  const p: Pose = {...P0};
  // jambes rapprochées dans l'axe
  p.kF = lp(P0.kF, {x: 850, y: 522, z: 12}, legs);
  p.fF = lp(P0.fF, {x: 1035, y: 524, z: 10}, legs);
  p.kN = lp(P0.kN, {x: 850, y: 562, z: 12}, legs);
  p.fN = lp(P0.fN, {x: 1035, y: 558, z: 10}, legs);
  // bras côté retournement à angle droit, paume vers le haut
  p.eN = lp(P0.eN, {x: 420, y: 745, z: 8}, arm90);
  p.hN = lp(P0.hN, {x: 300, y: 742, z: 8}, arm90);
  // dos de la main opposée contre l'oreille (passe au-dessus du thorax)
  const lift = Math.sin(ear * Math.PI) * 60;
  p.eF = lp(P0.eF, {x: 455, y: 545, z: 85}, ear);
  p.eF.z += lift;
  p.hF = lp(P0.hF, {x: 336, y: 590, z: 40}, ear);
  p.hF.z += lift;
  // variante : genou opposé fléchi (démonstration)
  p.kF = lp(p.kF, {x: 780, y: 470, z: 150}, knee0);
  p.fF = lp(p.fF, {x: 900, y: 524, z: 10}, knee0);

  const near = (q: P3): P => ({x: q.x, y: q.y}); // éléments restés au sol
  const torsoY = PIVOT + (540 - PIVOT) * Math.cos(th) + 45 * Math.sin(th);
  const r: Rig = {
    th,
    head: {x: 330, y: PIVOT + (540 - PIVOT) * Math.cos(th) + 40 * Math.sin(th)},
    face: th / (Math.PI / 2),
    sF: rot(p.sF, th), sN: rot(p.sN, th), eF: rot(p.eF, th), hF: rot(p.hF, th),
    eN: near(p.eN), hN: near(p.hN),
    pF: rot(p.pF, th), pN: rot(p.pN, th),
    kF: rot(p.kF, th), fF: rot(p.fF, th), kN: rot(p.kN, th), fN: rot(p.fN, th),
    torsoY,
    torsoW: 150 * Math.cos(th) + 92 * Math.sin(th),
  };
  // le bras au sol reste accroché à l'épaule basse
  r.sN = {x: 420, y: Math.max(r.sN.y, torsoY + r.torsoW / 2 - 18)};
  // stabilisation : genou du dessus fléchi à angle droit, vers l'avant
  r.kF = lp2(r.kF, {x: 690, y: 820}, knee);
  r.fF = lp2(r.fF, {x: 880, y: 815}, knee);
  return r;
};

const Seg: React.FC<{a: P; b: P; w: number; c: string}> = ({a, b, w, c}) => <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={c} strokeWidth={w} strokeLinecap="round" />;

/** Membre deux couleurs (manche / peau, ou pantalon). */
const Limb: React.FC<{a: P; b: P; c: P; w1: number; w2: number; c1: string; c2: string; sleeve?: number}> = ({a, b, c, w1, w2, c1, c2, sleeve = 1}) => {
  const m = lp2(a, b, sleeve);
  return (
    <g>
      <Seg a={a} b={b} w={w1} c={c2} />
      <Seg a={b} b={c} w={w2} c={c2} />
      {sleeve > 0 && <Seg a={a} b={m} w={w1 + 4} c={c1} />}
    </g>
  );
};

export const Victim: React.FC<{r: Rig; collar: number; pillow: P | null}> = ({r, collar, pillow}) => {
  const t = useT();
  const breathe = 1 + Math.sin(t * 2.4) * 0.012;
  const k = r.face;
  const tx0 = 400;
  const tx1 = 670;
  return (
    <g>
      {/* ombre portée */}
      <ellipse cx={650} cy={r.torsoY + 30} rx={470} ry={70 + 20 * (1 - k)} fill="rgba(20,25,35,0.10)" filter="url(#blur)" />
      {pillow && <rect x={pillow.x - 70} y={pillow.y - 45} width={140} height={90} rx={30} fill="#9FD3C7" stroke="#7FB8AB" strokeWidth={4} />}
      {/* bras au sol (côté retournement) */}
      <Limb a={r.sN} b={r.eN} c={r.hN} w1={30} w2={26} c1={TEE} c2={SKIN_V} sleeve={0.45} />
      <circle cx={r.hN.x} cy={r.hN.y} r={16} fill={SKIN_V} />
      {/* jambe basse */}
      <Limb a={r.pN} b={r.kN} c={r.fN} w1={46} w2={38} c1={PANTS} c2={PANTS} sleeve={0} />
      <ellipse cx={r.fN.x + 18} cy={r.fN.y} rx={30} ry={18} fill="#F4F4F4" stroke="#CFCFCF" strokeWidth={3} />
      {/* tronc */}
      <g transform={`translate(0 ${r.torsoY}) scale(1 ${breathe})`}>
        <rect x={tx0} y={-r.torsoW / 2} width={tx1 - tx0} height={r.torsoW} rx={Math.min(55, r.torsoW / 2)} fill={TEE} />
        {k > 0.05 && <rect x={tx0} y={-r.torsoW / 2} width={tx1 - tx0} height={r.torsoW * 0.4} rx={Math.min(40, r.torsoW / 4)} fill={TEE_D} opacity={k} />}
        <rect x={tx1 - 60} y={-r.torsoW / 2 + 4} width={90} height={r.torsoW - 8} rx={Math.min(40, r.torsoW / 2 - 4)} fill={PANTS} />
      </g>
      {/* jambe haute */}
      <Limb a={r.pF} b={r.kF} c={r.fF} w1={46} w2={38} c1={PANTS} c2={PANTS} sleeve={0} />
      <ellipse cx={r.fF.x + 18} cy={r.fF.y} rx={30} ry={18} fill="#F4F4F4" stroke="#CFCFCF" strokeWidth={3} />
      {/* cou + collier cervical */}
      <rect x={r.head.x + 30} y={r.head.y - 24} width={60} height={48} rx={18} fill={SKIN_V} />
      {collar > 0 && <rect x={r.head.x + 36} y={r.head.y - 34 - 6 * (1 - collar)} width={50} height={68} rx={16} fill="#F2F2F2" stroke="#3A7BD5" strokeWidth={5} opacity={collar} />}
      {/* tête : cheveux tressés, visage qui pivote avec le corps */}
      <g transform={`translate(${r.head.x} ${r.head.y})`}>
        <ellipse cx={-6} cy={0} rx={56} ry={50} fill={HAIR} />
        {[-30, -15, 0, 15, 30].map((yy) => <path key={yy} d={`M-52 ${yy * 0.9} Q-20 ${yy} 10 ${yy * 0.85}`} stroke="#2B2018" strokeWidth={4} fill="none" opacity={1 - k * 0.5} />)}
        <ellipse cx={12} cy={k * 26} rx={36 - k * 6} ry={38 - k * 18} fill={SKIN_V} />
        {/* yeux fermés + bouche */}
        <g opacity={1 - k * 0.6} transform={`translate(0 ${k * 26})`}>
          <path d="M18 -14 q6 4 12 0" stroke="#2A160C" strokeWidth={3} fill="none" />
          <path d="M18 14 q6 -4 12 0" stroke="#2A160C" strokeWidth={3} fill="none" />
          <path d="M40 -6 v12" stroke="#4A2516" strokeWidth={4} strokeLinecap="round" />
        </g>
      </g>
      {/* bras du dessus (main contre l'oreille) */}
      <Limb a={r.sF} b={r.eF} c={r.hF} w1={30} w2={26} c1={TEE} c2={SKIN_V} sleeve={0.45} />
      <circle cx={r.hF.x} cy={r.hF.y} r={16} fill={SKIN_V} stroke="#5A3420" strokeWidth={2} />
    </g>
  );
};

/** Secouriste vu du dessus, à genoux : tenue UNIVERSNORMES, gants nitrile, bras en cinématique inverse. */
export const Rescuer: React.FC<{pos: P; facing: number; hands: [P, P]; skin: string; hair: 'ras' | 'court'; opacity?: number; lean?: number; arm?: [number, number]}> = ({pos, facing, hands, skin, hair, opacity = 1, lean = 0, arm = [120, 115]}) => {
  const c = Math.cos(facing);
  const s = Math.sin(facing);
  const loc = (fx: number, fy: number): P => ({x: pos.x + fx * c - fy * s, y: pos.y + fx * s + fy * c});
  const shL = loc(10 + lean, -62);
  const shR = loc(10 + lean, 62);
  const elL = ik(shL, hands[0], arm[0], arm[1], -1);
  const elR = ik(shR, hands[1], arm[0], arm[1], 1);
  const head = loc(30 + lean, 0);
  const deg = (facing * 180) / Math.PI;
  return (
    <g opacity={opacity}>
      {/* jambes repliées (genoux au sol) */}
      <g transform={`translate(${pos.x} ${pos.y}) rotate(${deg})`}>
        <ellipse cx={-10} cy={0} rx={115} ry={95} fill="rgba(20,25,35,0.12)" />
        <rect x={-110} y={-60} width={95} height={46} rx={22} fill={NAVY} />
        <rect x={-110} y={14} width={95} height={46} rx={22} fill={NAVY} />
        <rect x={-130} y={-56} width={34} height={38} rx={12} fill="#1E1E1E" />
        <rect x={-130} y={18} width={34} height={38} rx={12} fill="#1E1E1E" />
      </g>
      {/* bras */}
      <line x1={shL.x} y1={shL.y} x2={elL.x} y2={elL.y} stroke={NAVY} strokeWidth={34} strokeLinecap="round" />
      <line x1={shR.x} y1={shR.y} x2={elR.x} y2={elR.y} stroke={NAVY} strokeWidth={34} strokeLinecap="round" />
      <line x1={elL.x} y1={elL.y} x2={hands[0].x} y2={hands[0].y} stroke={skin} strokeWidth={28} strokeLinecap="round" />
      <line x1={elR.x} y1={elR.y} x2={hands[1].x} y2={hands[1].y} stroke={skin} strokeWidth={28} strokeLinecap="round" />
      <circle cx={hands[0].x} cy={hands[0].y} r={20} fill={GLOVE} />
      <circle cx={hands[1].x} cy={hands[1].y} r={20} fill={GLOVE} />
      {/* buste : polo marine, empiècement vert, logo au dos */}
      <g transform={`translate(${pos.x} ${pos.y}) rotate(${deg})`}>
        <rect x={-40 + lean} y={-80} width={100} height={160} rx={46} fill={NAVY} />
        <rect x={-2 + lean} y={-80} width={26} height={160} rx={10} fill={colors.green} />
      </g>
      <foreignObject x={pos.x - 40 + lean * c} y={pos.y - 40 + lean * s} width={80} height={80} style={{overflow: 'visible'}}>
        <div style={{width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `rotate(${deg - 90}deg) translateY(-6px)`}}>
          <div style={{width: 62, height: 62, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.3)'}}>
            <Img src={staticFile('promo/logo.png')} style={{width: 54, height: 'auto'}} />
          </div>
        </div>
      </foreignObject>
      {/* tête */}
      <circle cx={head.x} cy={head.y} r={40} fill={skin} />
      <circle cx={head.x - c * 6} cy={head.y - s * 6} r={hair === 'ras' ? 37 : 41} fill={HAIR} opacity={hair === 'ras' ? 0.85 : 1} />
      {hair === 'court' && <circle cx={head.x - c * 10} cy={head.y - s * 10} r={34} fill="#22170F" />}
      <ellipse cx={head.x + c * 26} cy={head.y + s * 26} rx={11} ry={8} fill={skin} transform={`rotate(${deg} ${head.x + c * 26} ${head.y + s * 26})`} />
    </g>
  );
};
