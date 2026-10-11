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
 * « Le Management Intégré (SMI) » (5 min 02) — voix d'origine, sous-titres recalés mot à mot, photos réelles et
 * personnages détourés. Fil rouge inédit : un trépied Q / S / E équipé d'un treuil PDCA qui hisse la charge « SMI » un
 * cran plus haut à chaque partie ; transitions en roue PDCA qui balaie l'écran quart par quart (Plan, Do, Check, Act).
 * Autres techniques nouvelles : fusion de gouttes (métaballes), jonglage, cube casse-tête qui se mélange, triptyque
 * photo, usine à gaz de tuyaux, fenêtres de logiciels qui vivent leur vie, notifications d'audits empilées, aberration
 * chromatique, batterie qui se vide, pile de pièces, barre de recherche tapée, titre à reflet, interrupteur, couloirs
 * parallèles et plan d'architecte, prisme qui réunit trois faisceaux, étiquettes suspendues aux pieds du trépied,
 * normes superposées en pelure d'oignon, roue PDCA qui gravit une rampe, console à interrupteurs et texte brouillé,
 * cavalier d'échecs, immeuble en coupe, brouillard, tableau de bord, ticket de caisse, succès débloqué et confettis,
 * courants d'air, presse et broyeuse à papiers, couloirs de natation, ondes, badge vérifié, balise qui émet, plaque à
 * reflet, bulle d'intention qui devient liste, orage VUCA et haubans, flèches qui s'alignent, pièce à trois facettes,
 * traînées de vitesse et drapeau à damier.
 */
const LOGO = 'promo/logo.png';
const OUTRO_AT = 302.4;
export const MGMTINTEGRE_FRAMES = s(OUTRO_AT + 3.8);
const BG = '#0B1F24';
const INK = '#0E1A1C';
const LIGHT = '#F3FAF9';
const DIM = 'rgba(243,250,249,0.66)';
const TEAL = '#19C3B1';
const BLUE = '#3D8BFF';
const ORANGE = '#FF8A3D';
const GREEN = '#3DDC84';
const GOLD = '#FFC94D';
const RED = '#FF5A5F';
const PAPER = '#F7F4EC';
const PH = (p: string) => staticFile(p);

type Dom = {k: string; l: string; c: string; ic: string; iso: string};
const QSE: Dom[] = [
  {k: 'Q', l: 'Qualité', c: BLUE, ic: 'etoile', iso: 'ISO 9001'},
  {k: 'S', l: 'Sécurité', c: ORANGE, ic: 'casque', iso: 'ISO 45001'},
  {k: 'E', l: 'Environnement', c: GREEN, ic: 'pousse', iso: 'ISO 14001'},
];

type Pt = {n: number; l: string; at: number; end: number; c: string};
const PT: Pt[] = [
  {n: 1, l: 'Les piliers et le moteur', at: 74.5, end: 138.9, c: BLUE},
  {n: 2, l: 'Pourquoi intégrer ?', at: 139.0, end: 182.1, c: ORANGE},
  {n: 3, l: 'Levier de performance', at: 182.2, end: 255.1, c: GREEN},
  {n: 4, l: 'Face au monde VUCA', at: 255.2, end: 302.2, c: GOLD},
];
const WIPE = 2.4;

const pop = (t: number, at: number, d = 0.4) => prog(t, at, at + d, easeOut);
const spring = (t: number, at: number, k = 7, w = 15) => {
  const x = t - at;
  return x <= 0 ? 0 : 1 - Math.exp(-x * k) * Math.cos(x * w);
};
const win = (t: number, a: number, b: number, f = 0.4) => prog(t, a, a + f) * (1 - prog(t, b - f, b));
const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
/** Point sur un cercle, angle en degrés compté depuis midi dans le sens horaire. */
const pt = (cx: number, cy: number, r: number, deg: number): [number, number] => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
};
const sector = (cx: number, cy: number, r: number, a0: number, a1: number) => {
  if (a1 - a0 <= 0.05) return '';
  const [x0, y0] = pt(cx, cy, r, a0);
  const [x1, y1] = pt(cx, cy, r, a1);
  return `M${cx} ${cy} L${x0} ${y0} A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1} ${y1} Z`;
};
const arc = (cx: number, cy: number, r: number, a0: number, a1: number) => {
  const [x0, y0] = pt(cx, cy, r, a0);
  const [x1, y1] = pt(cx, cy, r, a1);
  return `M${x0} ${y0} A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1} ${y1}`;
};

const T: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 40, color = LIGHT, style}) => (
  <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: size, color, letterSpacing: -0.5, lineHeight: 1.05, ...style}}>{children}</div>
);
const Hand: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 48, color = LIGHT, style}) => (
  <div style={{fontFamily: handFont, fontSize: size, color, lineHeight: 1.1, ...style}}>{children}</div>
);
const Abs: React.FC<{x: number; y: number; w?: number; h?: number; children?: React.ReactNode; style?: React.CSSProperties}> = ({x, y, w, h, children, style}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, height: h, ...style}}>{children}</div>
);
const Chip: React.FC<{children: React.ReactNode; c?: string; q?: number; size?: number; dark?: boolean; style?: React.CSSProperties}> = ({children, c = TEAL, q = 1, size = 34, dark = true, style}) => (
  <div style={{display: 'inline-flex', alignItems: 'center', gap: 12, padding: '12px 26px', borderRadius: 50, background: c, color: dark ? INK : '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: size, transform: `scale(${q})`, boxShadow: `0 12px 30px ${c}55`, whiteSpace: 'nowrap', ...style}}>{children}</div>
);
const Row: React.FC<{y: number; children: React.ReactNode; gap?: number}> = ({y, children, gap = 14}) => (
  <Abs x={0} y={y} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap, flexWrap: 'wrap', padding: '0 40px', boxSizing: 'border-box'}}>{children}</Abs>
);
const Title: React.FC<{children: React.ReactNode; y?: number}> = ({children, y = 450}) => <Abs x={60} y={y} w={960} style={{textAlign: 'center'}}><T size={58}>{children}</T></Abs>;
const Photo: React.FC<{src: string; x: number; y: number; w: number; h: number; q?: number; r?: number; pos?: string; children?: React.ReactNode; filter?: string; border?: string}> = ({src, x, y, w, h, q = 1, r = 0, pos = 'center', children, filter, border = 'rgba(255,255,255,0.92)'}) => {
  const t = useT();
  return (
    <Abs x={x} y={y} w={w} h={h} style={{borderRadius: 30, overflow: 'hidden', border: `6px solid ${border}`, boxShadow: '0 30px 60px rgba(0,0,0,0.5)', transform: `scale(${q}) rotate(${r}deg)`}}>
      <Img src={PH(src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${1.05 + (t % 30) * 0.004})`, filter}} />
      {children}
    </Abs>
  );
};
/** Titre dont un reflet balaie les lettres. */
const Shimmer: React.FC<{children: React.ReactNode; size: number; p: number}> = ({children, size, p}) => (
  <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: size, lineHeight: 1.08, letterSpacing: -0.5, backgroundImage: `linear-gradient(105deg, ${LIGHT} 0%, ${LIGHT} 42%, #FFFFFF 48%, ${GOLD} 50%, #FFFFFF 52%, ${LIGHT} 58%, ${LIGHT} 100%)`, backgroundSize: '260% 100%', backgroundPosition: `${(1 - p) * 100}% 0`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent'}}>{children}</div>
);

/* ─────────── Fil rouge : le trépied Q / S / E et son treuil PDCA ─────────── */
const FEET: [number, number][] = [[34, 440], [366, 440], [200, 412]];
const legPt = (k: number, f: number): [number, number] => [200 + (FEET[k][0] - 200) * f, 40 + (FEET[k][1] - 40) * f];
const Tripod: React.FC<{w: number; legs?: number[]; winch?: number; load?: number; lift?: number; crank?: number; glow?: number[]; wob?: number}> = ({w, legs = [1, 1, 1], winch = 1, load = 1, lift = 0, crank = 0, glow = [0, 0, 0], wob = 0}) => {
  const ly = 300 - lift * 220;
  const [wx, wy] = legPt(0, 0.6);
  return (
    <svg width={w} height={w * 1.15} viewBox="0 0 400 460" style={{overflow: 'visible', display: 'block'}}>
      <g transform={`rotate(${wob} 200 440)`}>
        {[2, 0, 1].map((k) => {
          const p = legs[k];
          if (p <= 0) return null;
          const [ex, ey] = legPt(k, p);
          return (
            <g key={k}>
              {glow[k] > 0 && <line x1={200} y1={40} x2={ex} y2={ey} stroke={QSE[k].c} strokeWidth={40} strokeLinecap="round" opacity={0.4 * glow[k]} style={{filter: 'blur(10px)'}} />}
              <line x1={200} y1={40} x2={ex} y2={ey} stroke={QSE[k].c} strokeWidth={k === 2 ? 13 : 17} strokeLinecap="round" opacity={k === 2 ? 0.8 : 1} />
              {p > 0.97 && <rect x={FEET[k][0] - 18} y={FEET[k][1] - 4} width={36} height={11} rx={5} fill="#9FB3B7" />}
            </g>
          );
        })}
        {load > 0 && (
          <g opacity={load}>
            <line x1={200} y1={56} x2={200} y2={ly} stroke="#DDE7E8" strokeWidth={3} />
            <g transform={`translate(200 ${ly})`}>
              <path d="M-9 0 Q0 13 9 0" stroke="#DDE7E8" strokeWidth={3} fill="none" />
              <rect x={-48} y={11} width={96} height={72} rx={9} fill={TEAL} stroke="#0B7A70" strokeWidth={4} />
              <path d="M-48 33 H48 M-48 61 H48" stroke="#0B7A70" strokeWidth={3} opacity={0.6} />
              <text y={57} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={24} fill={INK}>SMI</text>
            </g>
          </g>
        )}
        {winch > 0 && (
          <g opacity={Math.min(1, winch)}>
            <line x1={wx} y1={wy} x2={196} y2={44} stroke="#DDE7E8" strokeWidth={3} />
            <g transform={`translate(${wx} ${wy}) scale(${winch})`}>
              <rect x={-32} y={-24} width={64} height={48} rx={11} fill="#22383D" stroke={GOLD} strokeWidth={4} />
              <circle r={15} fill={GOLD} />
              <g transform={`rotate(${(crank * 180) / Math.PI})`}>
                <line x1={0} y1={0} x2={0} y2={-38} stroke={GOLD} strokeWidth={7} strokeLinecap="round" />
                <circle cy={-38} r={8} fill={LIGHT} />
              </g>
            </g>
          </g>
        )}
        <circle cx={200} cy={40} r={19} fill="#C9D6D8" stroke="#6E8488" strokeWidth={4} />
        <circle cx={200} cy={40} r={7} fill="#6E8488" />
      </g>
    </svg>
  );
};

/* ─────────── Couverture ─────────── */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: BG, opacity: 1 - out}}>
      <Img src={PH('promo/terrain-controle.jpg')} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1120, objectFit: 'cover', objectPosition: '58% 30%', filter: 'saturate(0.9) brightness(0.78)'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${BG}D0 0%, ${BG}30 18%, ${BG}10 34%, ${BG}E8 56%, ${BG} 62%)`}} />
      <Abs x={0} y={95} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={380} y={1480}><Tripod w={320} lift={0.6} crank={t * 2} glow={[0.7, 0.7, 0.7]} /></Abs>
      <Abs x={60} y={1010} w={960} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: TEAL, color: INK, fontFamily: sansFont, fontWeight: 800, fontSize: 30, letterSpacing: 3}}>QUALITÉ · SÉCURITÉ · ENVIRONNEMENT</div>
        <T size={96} style={{marginTop: 22, textTransform: 'uppercase', letterSpacing: -2}}>Le Management</T>
        <T size={150} color={TEAL} style={{textTransform: 'uppercase', letterSpacing: -4}}>Intégré</T>
        <div style={{display: 'flex', justifyContent: 'center', gap: 14, marginTop: 20}}>
          {QSE.map((d) => <div key={d.k} style={{width: 66, height: 66, borderRadius: 33, background: d.c, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={36} color={INK}>{d.k}</T></div>)}
          <div style={{height: 66, borderRadius: 33, background: GOLD, padding: '0 24px', display: 'flex', alignItems: 'center'}}><T size={30} color={INK}>+ PDCA</T></div>
        </div>
        <Hand size={48} color={DIM} style={{marginTop: 16}}>3 piliers, 1 moteur : le SMI</Hand>
      </Abs>
    </AbsoluteFill>
  );
};

/* ─────────── Transition : la roue PDCA qui balaie l'écran ─────────── */
const PDCA: [string, string, string][] = [['P', 'Plan', BLUE], ['D', 'Do', ORANGE], ['C', 'Check', GREEN], ['A', 'Act', GOLD]];
const PdcaWipe: React.FC<{p: Pt}> = ({p}) => {
  const t = useT();
  const a = p.at, b = p.at + WIPE;
  if (t < a || t > b) return null;
  const disc = spring(t, a + 0.8) * (1 - prog(t, b - 0.75, b - 0.35, easeIn));
  return (
    <AbsoluteFill style={{zIndex: 55, pointerEvents: 'none'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {PDCA.map(([k, , c], i) => {
          const inP = prog(t, a + i * 0.2, a + i * 0.2 + 0.24, easeInOut);
          const outP = prog(t, b - 0.78 + i * 0.16, b - 0.78 + i * 0.16 + 0.2, easeInOut);
          const [mx, my] = pt(540, 960, 600, i * 90 + 45);
          return (
            <g key={k}>
              <path d={sector(540, 960, 1300, i * 90 + outP * 90, i * 90 + inP * 90)} fill={c} />
              <text x={mx} y={my + 80} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={230} fill="rgba(255,255,255,0.88)" opacity={prog(inP, 0.6, 1) * (1 - prog(outP, 0, 0.4))}>{k}</text>
            </g>
          );
        })}
      </svg>
      {disc > 0.01 && (
        <Abs x={210} y={630} w={660} h={660} style={{transform: `scale(${disc})`}}>
          <div style={{position: 'absolute', inset: 0, borderRadius: 330, background: BG, border: `10px solid ${LIGHT}`, boxShadow: '0 30px 80px rgba(0,0,0,0.5)'}} />
          <svg width={660} height={660} style={{position: 'absolute', inset: 0}}>
            <g transform={`rotate(${(t - a) * 140} 330 330)`}>
              {[0, 90, 180, 270].map((d, i) => {
                const [hx, hy] = pt(330, 330, 290, d + 72);
                return (
                  <g key={d}>
                    <path d={arc(330, 330, 290, d + 8, d + 72)} stroke={PDCA[i][2]} strokeWidth={12} fill="none" strokeLinecap="round" />
                    <path d="M0 -13 L22 0 L0 13 Z" fill={PDCA[i][2]} transform={`translate(${hx} ${hy}) rotate(${d + 72})`} />
                  </g>
                );
              })}
            </g>
          </svg>
          <div style={{position: 'absolute', left: 80, right: 80, top: 110, textAlign: 'center'}}>
            <div style={{display: 'flex', justifyContent: 'center'}}><Tripod w={120} lift={lerp((p.n - 1) / 4, p.n / 4, prog(t, a + 0.9, a + 1.7, easeInOut))} crank={t * 6} /></div>
            <T size={30} color={p.c} style={{letterSpacing: 6, marginTop: 10}}>PARTIE {p.n}/4</T>
            <T size={p.l.length > 20 ? 50 : 56} style={{marginTop: 10}}>{p.l}</T>
          </div>
        </Abs>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Ouverture : fusion, jonglage, casse-tête, triptyque, usine à gaz ─────────── */
const Rubik: React.FC<{t: number; at: number}> = ({t, at}) => {
  const q = spring(t, at);
  const u = 92;
  const r: [number, number] = [u * 0.866, u * 0.5], l: [number, number] = [-u * 0.866, u * 0.5], dn: [number, number] = [0, u];
  const O: [number, number] = [540, 700];
  const add = (o: [number, number], a: [number, number], i: number, b: [number, number], j: number): [number, number] => [o[0] + a[0] * i + b[0] * j, o[1] + a[1] * i + b[1] * j];
  const faces: {o: [number, number]; a: [number, number]; b: [number, number]; dark: number}[] = [
    {o: O, a: r, b: l, dark: 0},
    {o: add(O, l, 3, r, 0), a: r, b: dn, dark: 0.18},
    {o: add(O, r, 3, l, 0), a: l, b: dn, dark: 0.34},
  ];
  const PAL = [BLUE, ORANGE, GREEN, '#FFFFFF', GOLD, TEAL];
  const step = Math.floor(Math.max(0, t - at) * 3.2);
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, transform: `rotate(${Math.sin(t * 2.4) * 4}deg) scale(${q})`, transformOrigin: '540px 980px'}}>
      {faces.map((f, fi) => (
        <g key={fi}>
          <polygon points={[add(f.o, f.a, 0, f.b, 0), add(f.o, f.a, 3, f.b, 0), add(f.o, f.a, 3, f.b, 3), add(f.o, f.a, 0, f.b, 3)].map((p) => p.join(',')).join(' ')} fill="#0A1418" />
          {Array.from({length: 9}, (_, n) => {
            const i = n % 3, j = Math.floor(n / 3);
            const shift = (fi === 0 ? i : j) === step % 3 ? step : 0;
            const col = PAL[(Math.floor(random(`rk${fi}-${n}`) * 6) + shift) % 6];
            const ps = [add(f.o, f.a, i, f.b, j), add(f.o, f.a, i + 1, f.b, j), add(f.o, f.a, i + 1, f.b, j + 1), add(f.o, f.a, i, f.b, j + 1)];
            const cx = (ps[0][0] + ps[2][0]) / 2, cy = (ps[0][1] + ps[2][1]) / 2;
            const pts = ps.map((p) => `${cx + (p[0] - cx) * 0.84},${cy + (p[1] - cy) * 0.84}`).join(' ');
            return (
              <g key={n}>
                <polygon points={pts} fill={col} />
                <polygon points={pts} fill="#000" opacity={f.dark} />
              </g>
            );
          })}
        </g>
      ))}
    </svg>
  );
};
const IntroA: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      {/* fusion des trois gouttes en une seule dynamique */}
      {t < 9.1 && (() => {
        const o = pop(t, 2.4) * (1 - prog(t, 8.8, 9.1));
        const merge = prog(t, 7.6, 8.4, easeInOut);
        const B: [number, number, string, number, string][] = [[300, 1000, BLUE, 5.0, 'Q'], [780, 1000, ORANGE, 5.76, 'S'], [540, 1330, GREEN, 6.64, 'E']];
        return (
          <AbsoluteFill style={{opacity: o}}>
            <Title>{t < 4.4 ? <>Le <span style={{color: TEAL}}>SMI</span>, c'est quoi ?</> : t < 7.6 ? <>Fusionner <span style={{color: BLUE}}>Q</span>, <span style={{color: ORANGE}}>S</span> et <span style={{color: GREEN}}>E</span></> : <>Une seule et même <span style={{color: TEAL}}>dynamique</span></>}</Title>
            {t < 4.9 && (
              <Abs x={200} y={640} w={700} style={{opacity: 1 - prog(t, 4.5, 4.9)}}>
                {[['S', 'ystème'], ['M', 'anagement'], ['I', 'ntégré']].map(([L, w], k) => (
                  <div key={L} style={{display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 26, transform: `translateX(${(1 - spring(t, 2.8 + k * 0.22)) * -500}px)`, opacity: t > 2.8 + k * 0.22 ? 1 : 0}}>
                    <T size={200} color={TEAL}>{L}</T>
                    <T size={90} style={{opacity: prog(t, 3.2 + k * 0.22, 3.6 + k * 0.22)}}>{w}</T>
                  </div>
                ))}
              </Abs>
            )}
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
              <defs>
                <filter id="mgGoo" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="22" result="b" />
                  <feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -14" />
                </filter>
              </defs>
              <g filter="url(#mgGoo)">
                {B.map(([x, y, c, at], k) => <circle key={k} cx={lerp(x, 540, merge)} cy={lerp(y, 1110, merge)} r={120 * spring(t, at)} fill={c} />)}
                {merge > 0.4 && <circle cx={540} cy={1110} r={175 * prog(t, 7.95, 8.5, easeOut)} fill={TEAL} />}
              </g>
              {t > 8.4 && (
                <g transform={`rotate(${(t - 8.4) * 160} 540 1110)`} opacity={pop(t, 8.45)}>
                  {[0, 120, 240].map((a) => {
                    const [hx, hy] = pt(540, 1110, 250, a + 95);
                    return (
                      <g key={a}>
                        <path d={arc(540, 1110, 250, a + 10, a + 95)} stroke={TEAL} strokeWidth={12} fill="none" strokeLinecap="round" />
                        <path d="M0 -16 L26 0 L0 16 Z" fill={TEAL} transform={`translate(${hx} ${hy}) rotate(${a + 95})`} />
                      </g>
                    );
                  })}
                </g>
              )}
            </svg>
            {B.map(([x, y, , at, k], i) => t > at && merge < 0.5 && <Abs key={i} x={x - 60} y={y - 58} w={120} h={120} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: (1 - merge * 2) * pop(t, at)}}><T size={90}>{k}</T></Abs>)}
            {merge > 0.5 && <Abs x={340} y={1052} w={400} style={{textAlign: 'center', transform: `scale(${spring(t, 8.1)})`}}><T size={110} color={INK}>SMI</T></Abs>}
          </AbsoluteFill>
        );
      })()}
      {/* jonglage → casse-tête */}
      {t > 8.9 && t < 14.6 && (() => {
        const o = pop(t, 8.9) * (1 - prog(t, 14.3, 14.6));
        const fall = prog(t, 13.5, 14.2, easeIn);
        return (
          <AbsoluteFill style={{opacity: o}}>
            <Title>{t < 13.6 ? <>Jongler avec <span style={{color: GOLD}}>trois domaines</span>…</> : <>… un vrai <span style={{color: RED}}>casse-tête</span></>}</Title>
            {t < 14.1 && (
              <>
                <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: 0.35 * (1 - fall)}}>
                  <path d="M380 1320 Q540 200 700 1320" stroke={LIGHT} strokeWidth={4} fill="none" strokeDasharray="4 14" strokeLinecap="round" />
                  <path d="M700 1320 Q540 1400 380 1320" stroke={LIGHT} strokeWidth={4} fill="none" strokeDasharray="4 14" strokeLinecap="round" />
                </svg>
                <Abs x={310} y={1340} style={{transform: `translateY(${Math.sin(t * 8) * 10}px) rotate(-15deg)`, opacity: 1 - fall}}><F n="main-levee" size={140} /></Abs>
                <Abs x={630} y={1340} style={{transform: `translateY(${Math.sin(t * 8 + Math.PI) * 10}px) rotate(15deg) scaleX(-1)`, opacity: 1 - fall}}><F n="main-levee" size={140} /></Abs>
                {QSE.map((d, k) => {
                  const u = ((t - 8.9) * 0.9 + k / 3) % 1;
                  let x: number, y: number;
                  if (u < 0.62) {
                    const v = u / 0.62;
                    x = 380 + 320 * v;
                    y = 1320 - Math.sin(Math.PI * v) * 560;
                  } else {
                    const v = (u - 0.62) / 0.38;
                    x = 700 - 320 * v;
                    y = 1320 + Math.sin(Math.PI * v) * 30;
                  }
                  return (
                    <Abs key={k} x={x + (k - 1) * 220 * fall - 80} y={y + fall * 520 - 80} w={160} h={160} style={{borderRadius: 80, background: d.c, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: `0 10px 30px ${d.c}66`, border: '5px solid rgba(255,255,255,0.85)', boxSizing: 'border-box', opacity: 1 - fall}}>
                      <F n={d.ic} size={80} />
                      <T size={30} color={INK}>{d.k}</T>
                    </Abs>
                  );
                })}
              </>
            )}
            {t > 13.6 && <Rubik t={t} at={13.65} />}
            {t > 13.9 && <Row y={1420}><Chip c={RED} dark={false} q={spring(t, 13.95)} size={32}>Casse-tête !</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
      {/* triptyque des trois exigences, puis l'usine à gaz */}
      {t > 14.3 && t < 29.9 && (() => {
        const o = pop(t, 14.3) * (1 - prog(t, 29.5, 29.9));
        const zoom = prog(t, 28.5, 29.8, easeIn);
        const PANELS: {d: Dom; src: string; at: number; lab: string; x: number; pos: string}[] = [
          {d: QSE[0], src: 'zones/client.jpg', at: 14.6, lab: 'Les exigences des clients', x: 60, pos: '55% 75%'},
          {d: QSE[1], src: 'promo/terrain-controle.jpg', at: 17.8, lab: 'Les collaborateurs', x: 390, pos: '62% 30%'},
          {d: QSE[2], src: 'arsenal/aspects-env.jpg', at: 21.2, lab: 'Les responsabilités environnementales', x: 720, pos: '50% 50%'},
        ];
        return (
          <AbsoluteFill style={{opacity: o, transform: `scale(${1 + zoom * 5})`, filter: zoom > 0 ? `blur(${zoom * 10}px)` : undefined, transformOrigin: '540px 1000px'}}>
            <Title>{t < 23.2 ? <>Trois exigences <span style={{color: GOLD}}>en parallèle</span></> : t < 28.2 ? <>Unifier… sans <span style={{color: RED}}>usine à gaz</span> ?</> : <>Le <span style={{color: TEAL}}>défi</span> à décortiquer</>}</Title>
            {PANELS.map((pn, k) => t > pn.at - 0.05 && (
              <Abs key={k} x={pn.x} y={620} w={300} h={760} style={{borderRadius: 26, overflow: 'hidden', border: `6px solid ${pn.d.c}`, boxShadow: '0 30px 60px rgba(0,0,0,0.5)', transform: `translateY(${(1 - spring(t, pn.at, 7, 12)) * -900}px)`}}>
                <Img src={PH(pn.src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pn.pos, transform: `scale(${1.1 + (t - pn.at) * 0.01})`}} />
                <div style={{position: 'absolute', left: 0, right: 0, top: 0, padding: '14px 16px', background: pn.d.c, display: 'flex', alignItems: 'center', gap: 10}}><F n={pn.d.ic} size={44} /><T size={28} color={INK}>{pn.d.l}</T></div>
                <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, padding: 18, background: 'rgba(11,31,36,0.86)'}}><T size={28}>{pn.lab}</T></div>
              </Abs>
            ))}
            {t > 24.5 && (
              <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
                {Array.from({length: 15}, (_, k) => {
                  const R = (n: string) => random(`tg${k}${n}`);
                  const x0 = 210 + (k % 3) * 330, y0 = 700 + R('a') * 620;
                  const x3 = 210 + ((k + 1 + Math.floor(R('b') * 2)) % 3) * 330, y3 = 700 + R('c') * 620;
                  const d = `M${x0} ${y0} C${R('d') * 1080} ${600 + R('e') * 800}, ${R('f') * 1080} ${600 + R('g') * 800}, ${(x0 + x3) / 2} ${(y0 + y3) / 2 + (R('h') - 0.5) * 300} S${R('i') * 1080} ${600 + R('j') * 800}, ${x3} ${y3}`;
                  return <path key={k} d={d} stroke={QSE[k % 3].c} strokeWidth={9} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - prog(t, 24.6 + k * 0.17, 25.5 + k * 0.17)} opacity={0.92} />;
                })}
                {Array.from({length: 7}, (_, k) => {
                  const q = spring(t, 25.4 + k * 0.25);
                  if (q <= 0) return null;
                  const x = 120 + random(`vx${k}`) * 840, y = 680 + random(`vy${k}`) * 660;
                  return (
                    <g key={`v${k}`} transform={`translate(${x} ${y}) scale(${q}) rotate(${(t - 25) * 90 * (k % 2 ? 1 : -1)})`}>
                      <circle r={26} fill="#C9D6D8" stroke="#55696D" strokeWidth={5} />
                      {[0, 60, 120].map((a) => <line key={a} x1={-22} y1={0} x2={22} y2={0} stroke="#55696D" strokeWidth={5} transform={`rotate(${a})`} />)}
                    </g>
                  );
                })}
              </svg>
            )}
            {t > 26.6 && <Row y={1420}><Chip c={RED} dark={false} q={spring(t, 26.62)} size={32}><F n="usine" size={46} />Usine à gaz</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Le chaos des silos et la recherche d'une solution ─────────── */
const WINS = [{x: 60, y: 600, ph: 0}, {x: 470, y: 830, ph: 2.1}, {x: 110, y: 1070, ph: 4.2}];
const TOASTS = ['Audit ISO 9001', 'Audit ISO 45001', 'Audit ISO 14001', 'Nouvel audit planifié', 'Encore un audit…'];
const IntroB: React.FC = () => {
  const t = useT();
  const o = win(t, 29.6, 53.7, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {t < 35.2 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 34.8, 35.2)}}>
          <Title>{t < 33.0 ? <>Une situation <span style={{color: GOLD}}>familière</span></> : <>Le chaos des <span style={{color: RED}}>silos</span></>}</Title>
          <Photo src="iso26/ecrans-referentiels.jpg" x={70} y={640} w={940} h={620} q={spring(t, 29.8)} pos="50% 55%" />
          {t > 33.0 && <Row y={1300}>{QSE.map((d, k) => <Chip key={k} c={d.c} q={spring(t, 33.1 + k * 0.15)} size={28}>{d.l}</Chip>)}</Row>}
        </AbsoluteFill>
      )}
      {t > 34.9 && t < 47.3 && (() => {
        const ow = pop(t, 34.9) * (1 - prog(t, 46.9, 47.3));
        const gl = t > 43.0 && t < 46.2;
        const jx = gl ? (random(`gx${Math.floor(t * 24)}`) - 0.5) * 18 : 0;
        return (
          <AbsoluteFill style={{opacity: ow}}>
            <Title>{t < 42.1 ? <>Chaque système <span style={{color: RED}}>vit sa vie</span></> : <>Résultat : <span style={{color: RED}}>la confusion</span></>}</Title>
            <AbsoluteFill style={{transform: `translateX(${jx}px)`, filter: gl ? 'drop-shadow(7px 0 0 rgba(255,40,90,0.65)) drop-shadow(-7px 0 0 rgba(40,200,255,0.65))' : undefined}}>
              {WINS.map((w, k) => {
                const d = QSE[k];
                const x = w.x + Math.sin(t * 0.9 + w.ph) * 26, y = w.y + Math.cos(t * 0.75 + w.ph) * 18;
                return (
                  <Abs key={k} x={x} y={y} w={520} h={330} style={{borderRadius: 18, background: '#F4F7F8', overflow: 'hidden', boxShadow: '0 24px 50px rgba(0,0,0,0.5)', transform: `scale(${spring(t, 35.0 + k * 0.25)}) rotate(${Math.sin(t * 0.6 + w.ph) * 1.5}deg)`}}>
                    <div style={{height: 56, background: d.c, display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px'}}>
                      {['#FF5F57', '#FEBC2E', '#28C840'].map((c2) => <div key={c2} style={{width: 14, height: 14, borderRadius: 7, background: c2}} />)}
                      <T size={26} color={INK} style={{marginLeft: 10}}>Système {d.l}</T>
                    </div>
                    <div style={{padding: '18px 20px'}}>
                      {t > 37.8 && <div style={{display: 'flex', alignItems: 'center', gap: 12, opacity: pop(t, 37.8 + k * 0.12)}}><F n="memo" size={46} /><T size={26} color={INK}>Politique {d.k}</T></div>}
                      {t > 39.2 && (
                        <div style={{position: 'relative', height: 120, marginTop: 14}}>
                          {[0, 1, 2].map((c) => {
                            const at = 39.3 + (c ? 0.9 + c * 0.25 : 0) + k * 0.1;
                            return t > at && <div key={c} style={{position: 'absolute', left: c * 34, top: c * 16, width: 300, padding: '12px 14px', borderRadius: 10, background: '#fff', border: '2px solid #D6DEE0', boxShadow: '0 6px 12px rgba(0,0,0,0.12)', transform: `scale(${spring(t, at)})`}}><T size={22} color={INK}>Procédure{c ? ` (copie ${c})` : ''}</T></div>;
                          })}
                        </div>
                      )}
                    </div>
                  </Abs>
                );
              })}
              {t > 38.2 && [[455, 790], [450, 1060]].map(([x, y], k) => <Abs key={k} x={x - 40} y={y - 40} w={80} h={80} style={{borderRadius: 40, background: RED, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${spring(t, 38.2 + k * 0.2)})`, boxShadow: `0 0 30px ${RED}`}}><T size={50} color="#fff">≠</T></Abs>)}
            </AbsoluteFill>
            {TOASTS.map((tx, k) => t > 40.85 + k * 0.32 && (
              <Abs key={k} x={600 + (1 - spring(t, 40.85 + k * 0.32, 9, 14)) * 500} y={590 + k * 92} w={430} h={80} style={{borderRadius: 16, background: 'rgba(20,40,46,0.96)', border: `2px solid ${k < 3 ? QSE[k].c : '#8AA0A4'}`, display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px', boxSizing: 'border-box', boxShadow: '0 12px 24px rgba(0,0,0,0.4)'}}><F n="calendrier" size={44} /><T size={24}>{tx}</T></Abs>
            ))}
            {gl && [0, 1, 2].map((k) => <Abs key={k} x={150 + k * 300} y={700 + ((t * 120 + k * 200) % 500)} style={{opacity: 0.9}}><F n="question" size={90} /></Abs>)}
            {t > 43.9 && (() => {
              const lv = 1 - 0.85 * prog(t, 44.0, 45.6);
              return (
                <Abs x={660} y={1180} w={240} style={{textAlign: 'center', transform: `scale(${spring(t, 43.98)})`}}>
                  <div style={{position: 'relative', width: 200, height: 96, border: '7px solid #DDE7E8', borderRadius: 16, margin: '0 auto', boxSizing: 'border-box'}}>
                    <div style={{position: 'absolute', right: -22, top: 24, width: 12, height: 34, borderRadius: 4, background: '#DDE7E8'}} />
                    <div style={{position: 'absolute', left: 6, top: 6, bottom: 6, width: lv * 174, borderRadius: 8, background: lv > 0.5 ? GREEN : lv > 0.25 ? GOLD : RED}} />
                  </div>
                  <T size={26} style={{marginTop: 10}}>Énergie</T>
                </Abs>
              );
            })()}
            {t > 46.0 && (
              <Abs x={905} y={1130} w={160} style={{textAlign: 'center'}}>
                <div style={{position: 'relative', height: 190}}>
                  {Array.from({length: 7}, (_, k) => t > 46.02 + k * 0.1 && <div key={k} style={{position: 'absolute', left: 20, bottom: k * 22 + (1 - spring(t, 46.02 + k * 0.1, 9, 16)) * 200, width: 120, height: 34, borderRadius: '50%', background: `linear-gradient(180deg, #FFE08A, ${GOLD})`, border: '3px solid #C98F12'}} />)}
                </div>
                <T size={26}>Coûts</T>
              </Abs>
            )}
          </AbsoluteFill>
        );
      })()}
      {t > 46.9 && (() => {
        const q = 'approche unifiée QSE';
        const n = Math.floor(q.length * prog(t, 47.6, 50.3));
        const res = t > 52.9;
        return (
          <AbsoluteFill style={{opacity: pop(t, 46.9)}}>
            <Title>{t < 51.3 ? <>Une approche <span style={{color: TEAL}}>unifiée</span> ?</> : <>Et la <span style={{color: TEAL}}>réponse</span>…</>}</Title>
            <Abs x={90} y={760} w={900} h={120} style={{borderRadius: 60, background: '#fff', display: 'flex', alignItems: 'center', gap: 18, padding: '0 34px', boxSizing: 'border-box', boxShadow: `0 0 0 ${res ? 8 : 0}px ${TEAL}66, 0 20px 50px rgba(0,0,0,0.45)`, transform: `scale(${spring(t, 47.0)})`}}>
              <F n="loupe" size={60} />
              <T size={44} color={INK}>{q.slice(0, n)}<span style={{opacity: Math.floor(t * 2.5) % 2 ? 1 : 0, color: TEAL}}>|</span></T>
              {t > 51.3 && t < 52.9 && <div style={{marginLeft: 'auto', width: 46, height: 46, borderRadius: 23, border: `6px solid ${TEAL}`, borderTopColor: 'transparent', transform: `rotate(${t * 720}deg)`, boxSizing: 'border-box'}} />}
            </Abs>
            {res && (
              <Abs x={90} y={900} w={900} h={170} style={{borderRadius: 30, background: 'rgba(20,40,46,0.96)', border: `3px solid ${TEAL}`, display: 'flex', alignItems: 'center', gap: 20, padding: '0 30px', boxSizing: 'border-box', transform: `translateY(${(1 - spring(t, 52.94)) * -60}px)`, opacity: pop(t, 52.94)}}>
                <F n="engrenage" size={90} />
                <div><T size={40} color={TEAL}>Système de management intégré</T><Hand size={34} color={DIM}>Qualité · Sécurité · Environnement</Hand></div>
              </Abs>
            )}
            {t > 53.0 && (
              <Abs x={760 - 300 * prog(t, 53.0, 53.3, easeOut)} y={1100 - 120 * prog(t, 53.0, 53.3, easeOut)} style={{transform: `scale(${1 - 0.15 * prog(t, 53.3, 53.38) + 0.15 * prog(t, 53.38, 53.46)})`}}>
                <svg width={60} height={70} viewBox="0 0 30 35"><path d="M3 2 L3 28 L10 21 L15 33 L19 31 L14 19 L24 19 Z" fill="#fff" stroke={INK} strokeWidth={2} /></svg>
              </Abs>
            )}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Le SMI : révélation, cadre unique, prisme ─────────── */
const IntroC: React.FC = () => {
  const t = useT();
  const o = win(t, 53.5, 74.6, 0.3);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {t < 54.3 && <AbsoluteFill style={{background: '#fff', opacity: 1 - prog(t, 53.5, 54.3), zIndex: 5}} />}
      {t < 61.4 && (() => {
        const sh = prog(t, 54.2, 55.6, easeInOut);
        const on = prog(t, 59.25, 59.45);
        return (
          <AbsoluteFill style={{opacity: 1 - prog(t, 61.0, 61.4)}}>
            <Abs x={60} y={460} w={960} style={{textAlign: 'center'}}><Shimmer size={68} p={sh}>Système de Management Intégré</Shimmer></Abs>
            <Row y={680} gap={20}>
              {['S', 'M', 'I'].map((L, k) => (
                <div key={L} style={{width: 250, height: 290, borderRadius: 40, background: 'rgba(25,195,177,0.12)', border: `5px solid ${TEAL}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `translateY(${(1 - spring(t, 55.9 + k * 0.18, 8, 14)) * -500}px)`, opacity: t > 55.9 + k * 0.18 ? 1 : 0, boxShadow: `0 0 ${40 * on}px ${TEAL}`}}>
                  <T size={220} color={TEAL}>{L}</T>
                </div>
              ))}
            </Row>
            {t > 58.0 && <Abs x={60} y={1060}><Chip c={LIGHT} q={spring(t, 58.1)} size={30}><F n="ampoule" size={44} />Assez simple</Chip></Abs>}
            {t > 59.1 && <Abs x={440} y={1060}><Chip c={GOLD} q={spring(t, 59.18)} size={30}><F n="eclair" size={44} />Redoutablement efficace</Chip></Abs>}
            <Abs x={420} y={1220} w={240} h={120} style={{borderRadius: 60, background: on > 0.5 ? TEAL : '#33474C', boxShadow: on > 0.5 ? `0 0 50px ${TEAL}` : 'none', opacity: pop(t, 57.0)}}>
              <div style={{position: 'absolute', top: 10, left: 10 + on * 120, width: 100, height: 100, borderRadius: 50, background: '#fff', boxShadow: '0 6px 14px rgba(0,0,0,0.35)'}} />
            </Abs>
          </AbsoluteFill>
        );
      })()}
      {t > 61.1 && t < 67.3 && (() => {
        const conv = prog(t, 63.8, 64.6, easeInOut);
        return (
          <AbsoluteFill style={{opacity: win(t, 61.1, 67.3, 0.3)}}>
            <Title>{t < 63.8 ? <>Des systèmes <span style={{color: RED}}>parallèles</span>…</> : <>… un <span style={{color: TEAL}}>cadre unique</span></>}</Title>
            {conv < 1 && QSE.map((d, k) => {
              const y = lerp(760 + k * 200, 900, conv);
              const x = 120 + (((t - 61.2) * (180 + k * 70)) % 760);
              return (
                <React.Fragment key={k}>
                  <Abs x={80} y={y} w={920} h={6} style={{background: `${d.c}66`, opacity: 1 - conv}} />
                  <Abs x={80} y={y - 60} style={{opacity: 1 - conv}}><T size={24} color={d.c}>Système {d.l}</T></Abs>
                  <Abs x={x - 30} y={y - 27} w={60} h={60} style={{borderRadius: 30, background: d.c, opacity: 1 - conv}} />
                  {t > 62.3 && <Abs x={x - 34} y={y - 104} style={{opacity: (1 - conv) * pop(t, 62.38)}}><F n="fatigue" size={60} /></Abs>}
                </React.Fragment>
              );
            })}
            {t > 63.8 && (
              <Abs x={90} y={620} w={900} h={760} style={{borderRadius: 24, overflow: 'hidden', background: '#0F3D63', border: '4px solid #8EC5FF', opacity: pop(t, 63.85), boxShadow: '0 30px 60px rgba(0,0,0,0.5)'}}>
                <div style={{position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)', backgroundSize: '30px 30px'}} />
                <svg width={900} height={760} style={{position: 'absolute', inset: 0}}>
                  {['M150 650 L750 650', 'M150 650 L150 170', 'M750 650 L750 170', 'M150 170 L750 170', 'M150 410 L750 410', 'M450 170 L450 650', 'M150 650 L450 410', 'M450 650 L150 410', 'M450 650 L750 410', 'M750 650 L450 410', 'M150 410 L450 170', 'M450 410 L150 170', 'M450 410 L750 170', 'M750 410 L450 170', 'M100 170 L450 60 L800 170'].map((dd, k) => (
                    <path key={k} d={dd} stroke="#fff" strokeWidth={k < 6 ? 8 : 4} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - prog(t, 64.0 + k * 0.16, 64.4 + k * 0.16)} opacity={k < 6 ? 1 : 0.7} />
                  ))}
                </svg>
                <div style={{position: 'absolute', left: 24, bottom: 18, fontFamily: 'monospace', fontSize: 26, color: '#CFE6FF'}}>PLAN · SMI · CADRE UNIQUE</div>
              </Abs>
            )}
            {t > 65.1 && <Row y={1420}><Chip c={TEAL} q={spring(t, 65.18)} size={30}>Un seul squelette cohérent</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
      {t > 66.9 && (() => {
        const beams: [number, number, string, number, string][] = [[180, 620, BLUE, 68.76, 'Qualité'], [540, 600, ORANGE, 69.52, 'Sécurité'], [900, 620, GREEN, 70.4, 'Environnement']];
        const out = prog(t, 71.9, 72.5, easeOut);
        return (
          <AbsoluteFill style={{opacity: pop(t, 66.9)}}>
            <Title>{t < 71.8 ? <>Le SMI vient <span style={{color: TEAL}}>fédérer</span></> : <>Autour d'un <span style={{color: GOLD}}>but commun</span></>}</Title>
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
              {beams.map(([x, y, c, at], k) => {
                const p = prog(t, at, at + 0.45, easeOut);
                if (p <= 0) return null;
                const ex = lerp(x, 540, p), ey = lerp(y + 60, 890, p);
                return (
                  <g key={k}>
                    <line x1={x} y1={y + 60} x2={ex} y2={ey} stroke={c} strokeWidth={34} strokeLinecap="round" opacity={0.35} style={{filter: 'blur(8px)'}} />
                    <line x1={x} y1={y + 60} x2={ex} y2={ey} stroke={c} strokeWidth={14} strokeLinecap="round" />
                  </g>
                );
              })}
              <g style={{transform: `scale(${spring(t, 67.2)})`, transformOrigin: '540px 980px'}}>
                <polygon points="390,880 690,880 540,1130" fill="rgba(255,255,255,0.14)" stroke="#fff" strokeWidth={5} />
                <polygon points="430,895 520,895 470,990" fill="rgba(255,255,255,0.25)" />
              </g>
              {out > 0 && (
                <>
                  <line x1={540} y1={1130} x2={540} y2={lerp(1130, 1320, out)} stroke="#E8FFFB" strokeWidth={46} strokeLinecap="round" opacity={0.4} style={{filter: 'blur(10px)'}} />
                  <line x1={540} y1={1130} x2={540} y2={lerp(1130, 1320, out)} stroke="#E8FFFB" strokeWidth={20} strokeLinecap="round" />
                </>
              )}
            </svg>
            {beams.map(([x, y, c, at, l], k) => t > at - 0.1 && <Abs key={k} x={x - 150} y={y - 30} w={300} style={{textAlign: 'center'}}><Chip c={c} q={spring(t, at)} size={26}>{l}</Chip></Abs>)}
            {t > 73.0 && <Row y={1340}><Chip c={TEAL} q={spring(t, 73.08)} size={40}><F n="cible" size={56} />Performance durable</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ─────────── Partie 1 : les piliers et le moteur ─────────── */
const TAGS: {k: number; at: number; iso: number; dom: number; txt: string; src: string; pos?: string}[] = [
  {k: 0, at: 92.74, iso: 94.94, dom: 96.26, txt: 'Satisfaction du client', src: 'iso26/labo-manuel.jpg'},
  {k: 1, at: 98.46, iso: 99.62, dom: 101.06, txt: 'Lieu de travail sûr et sain', src: 'induction/technicien-hse.jpg', pos: '70% 30%'},
  {k: 2, at: 104.14, iso: 105.1, dom: 106.58, txt: 'Impact écologique maîtrisé', src: 'arsenal/aspects-env.jpg'},
];
const PDCA_TXT = ['Définir la politique et les objectifs', 'Mettre en œuvre les processus', 'Mesurer et surveiller les résultats', 'Corriger et améliorer le système'];
const PDCA_AT = [119.85, 120.3, 120.64, 121.2];
const PDCA_STEP = [124.6, 126.2, 126.9, 128.6, 129.4];
const Wheel: React.FC<{r: number; rot: number; hi?: number}> = ({r, rot, hi = -1}) => (
  <svg width={r * 2 + 20} height={r * 2 + 20} viewBox={`${-r - 10} ${-r - 10} ${r * 2 + 20} ${r * 2 + 20}`} style={{overflow: 'visible', display: 'block'}}>
    <g transform={`rotate(${rot})`}>
      {PDCA.map(([k, , c], i) => {
        const [mx, my] = pt(0, 0, r * 0.6, i * 90 + 45);
        const [ox, oy] = pt(0, 0, 14, i * 90 + 45);
        return (
          <g key={k} opacity={hi < 0 || hi === i ? 1 : 0.45} transform={hi === i ? `translate(${ox} ${oy})` : undefined}>
            <path d={sector(0, 0, r, i * 90 + 1.5, i * 90 + 88.5)} fill={c} />
            <text x={mx} y={my + r * 0.13} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={r * 0.36} fill={INK} transform={`rotate(${-rot} ${mx} ${my})`}>{k}</text>
          </g>
        );
      })}
      <circle r={r * 0.25} fill={BG} stroke={LIGHT} strokeWidth={6} />
    </g>
    <text y={r * 0.07} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={r * 0.15} fill={LIGHT}>PDCA</text>
  </svg>
);
const RAMP_TH = Math.atan2(320, 920);
const PdcaWheel: React.FC = () => {
  const t = useT();
  const roll = prog(t, 122.9, 123.8, easeInOut);
  const hi = t > 121.6 ? -1 : PDCA_AT.filter((a) => t >= a - 0.05).length - 1;
  const stepN = PDCA_STEP.reduce((acc, a) => acc + prog(t, a, a + 0.5, easeInOut), 0);
  const sp = (stepN / 5) * 0.82;
  const bx = 80 + 920 * sp, by = 1500 - 320 * sp;
  const r = lerp(260, 150, roll);
  const cx = lerp(540, bx - Math.sin(RAMP_TH) * 150, roll), cy = lerp(1000, by - Math.cos(RAMP_TH) * 150, roll);
  const spin = -90 * PDCA_AT.slice(1).reduce((acc, a) => acc + prog(t, a, a + 0.25, easeInOut), 0);
  const rot = spin + (((920 * sp) / Math.cos(RAMP_TH)) / 150) * (180 / Math.PI);
  return (
    <AbsoluteFill style={{opacity: win(t, 116.2, 131.3, 0.35)}}>
      <Title>{t < 122.9 ? <>Le moteur : le <span style={{color: GOLD}}>cycle PDCA</span></> : <>L'<span style={{color: GOLD}}>amélioration continue</span></>}</Title>
      {roll > 0 && (
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: roll}}>
          <polygon points="80,1500 1000,1180 1000,1500" fill="rgba(25,195,177,0.12)" />
          <line x1={80} y1={1500} x2={1000} y2={1180} stroke={TEAL} strokeWidth={8} strokeLinecap="round" />
          {[1, 2, 3, 4, 5].map((k) => {
            const ss = (k / 5) * 0.82;
            return <circle key={k} cx={80 + 920 * ss} cy={1500 - 320 * ss} r={9} fill={stepN >= k - 0.1 ? GOLD : '#55696D'} />;
          })}
        </svg>
      )}
      <Abs x={cx - r - 10} y={cy - r - 10} style={{transform: `scale(${spring(t, 116.3)})`}}><Wheel r={r} rot={rot} hi={roll > 0 ? -1 : hi} /></Abs>
      {t < 122.9 && hi >= 0 && <Abs x={0} y={1320} w={1080} style={{textAlign: 'center'}}><T size={64} color={PDCA[hi][2]}>{PDCA[hi][1].toUpperCase()}</T></Abs>}
      {PDCA_TXT.map((tx, i) => t > PDCA_STEP[i] && (
        <Abs key={i} x={60 + (i % 2) * 490} y={600 + Math.floor(i / 2) * 160} w={470} h={140} style={{borderRadius: 20, background: 'rgba(14,38,44,0.95)', border: `4px solid ${PDCA[i][2]}`, padding: '14px 18px', boxSizing: 'border-box', transform: `scale(${spring(t, PDCA_STEP[i])})`}}>
          <T size={32} color={PDCA[i][2]}>{PDCA[i][1].toUpperCase()}</T>
          <T size={24} style={{marginTop: 6}}>{tx}</T>
        </Abs>
      ))}
      {t > 129.4 && <Abs x={80} y={950}><Chip c={GOLD} q={spring(t, 129.45)} size={28}>… encore mieux la fois suivante</Chip></Abs>}
    </AbsoluteFill>
  );
};
const Agnostic: React.FC = () => {
  const t = useT();
  const back = prog(t, 137.2, 137.7, easeInOut);
  const beat = t > 137.4 ? Math.max(0, Math.sin((t - 137.4) * 7)) ** 6 : 0;
  const ats = [134.24, 135.16, 135.76];
  return (
    <AbsoluteFill style={{opacity: pop(t, 130.9) * (1 - prog(t, 138.6, 138.95))}}>
      <Title>{t < 137.3 ? <>Un cycle <span style={{color: GOLD}}>universel</span></> : <>Le <span style={{color: RED}}>cœur battant</span> du SMI</>}</Title>
      {QSE.map((d, k) => {
        const at = ats[k];
        if (t < at) return null;
        const x = lerp(540, 220 + k * 320, spring(t, at) * (1 - back));
        return (
          <Abs key={k} x={x - 120} y={880} style={{opacity: 1 - back}}>
            <Wheel r={110} rot={(t - at) * 120} />
            <div style={{position: 'absolute', left: -40, right: -40, top: 252, textAlign: 'center'}}><Chip c={d.c} size={24}>{d.l}</Chip></div>
          </Abs>
        );
      })}
      <Abs x={350} y={810} style={{transform: `scale(${(t < 134.2 ? spring(t, 131.0) : back) * (1 + beat * 0.09)})`, filter: beat > 0.02 ? `drop-shadow(0 0 ${30 * beat}px ${RED})` : undefined}}><Wheel r={180} rot={(t - 131) * 60} /></Abs>
      {t > 132.3 && t < 134.3 && <Row y={1300}><Chip c={LIGHT} q={spring(t, 132.44)} size={30}>Complètement agnostique</Chip></Row>}
      {t > 137.3 && <Row y={1300}><Chip c={RED} dark={false} q={spring(t, 137.36)} size={30}><F n="coeur" size={44} />Le cœur battant</Chip></Row>}
    </AbsoluteFill>
  );
};
const P1: React.FC = () => {
  const t = useT();
  const o = win(t, 76.7, 138.9, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {t < 82.8 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 82.4, 82.8)}}>
          <Title>{t < 78.6 ? <>Comment <span style={{color: BLUE}}>ça marche</span> ?</> : <>Imaginez une <span style={{color: BLUE}}>architecture</span></>}</Title>
          <Photo src="confines/tripode-formation.jpg" x={70} y={620} w={940} h={660} q={spring(t, 76.9)} pos="45% 50%" />
          {t > 80.9 && <Row y={1320}><Chip c={LIGHT} q={spring(t, 80.98)} size={30}>Trois appuis, un treuil</Chip></Row>}
        </AbsoluteFill>
      )}
      {t > 82.4 && t < 108.6 && (() => {
        const side = prog(t, 89.9, 90.8, easeInOut);
        const W = lerp(560, 440, side), X = lerp(260, 50, side), Y = lerp(640, 700, side);
        const legs = [prog(t, 83.9, 84.3, easeOut), prog(t, 84.25, 84.65, easeOut), prog(t, 84.6, 85.0, easeOut)];
        const glow = TAGS.map((g, i) => (t > g.at ? pop(t, g.at) * (i === 2 || t < TAGS[i + 1].at ? 1 : 0.35) : 0));
        const sc = W / 400;
        return (
          <AbsoluteFill style={{opacity: pop(t, 82.4) * (1 - prog(t, 108.2, 108.6))}}>
            <Title>{t < 90.0 ? <>3 piliers <span style={{color: GOLD}}>+ 1 moteur</span></> : <>Les <span style={{color: BLUE}}>trois piliers</span></>}</Title>
            <Abs x={X} y={Y}><Tripod w={W} legs={legs} winch={spring(t, 86.6)} load={0} crank={t > 87.6 ? (t - 87.6) * 4 : 0} glow={glow} /></Abs>
            {side < 0.1 && t > 84.9 && <Abs x={60} y={1380}><Chip c={BLUE} dark={false} q={spring(t, 84.9)} size={28}>Trois piliers solides</Chip></Abs>}
            {side < 0.1 && t > 86.5 && <Abs x={560} y={1380}><Chip c={GOLD} q={spring(t, 86.58)} size={28}>Un moteur commun</Chip></Abs>}
            {side < 0.1 && t > 87.6 && <Abs x={580} y={1470}><Hand size={36} color={DIM} style={{opacity: pop(t, 87.62)}}>qui ne s'arrête jamais</Hand></Abs>}
            {TAGS.map((g, i) => {
              if (t < g.at) return null;
              const d = QSE[g.k];
              const ty = 610 + i * 280;
              const [lx, ly] = legPt(g.k, 0.55);
              const sx = X + lx * sc, sy = Y + ly * sc;
              const sw = Math.sin((t - g.at) * 7) * 6 * Math.exp(-(t - g.at) * 2.2);
              return (
                <React.Fragment key={i}>
                  <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><path d={`M${sx} ${sy} Q${(sx + 540) / 2} ${Math.max(sy, ty + 120) + 40} 540 ${ty + 120}`} stroke={d.c} strokeWidth={4} fill="none" strokeDasharray="10 8" opacity={pop(t, g.at)} /></svg>
                  <Abs x={540} y={ty} w={480} h={240} style={{borderRadius: 22, background: 'rgba(14,38,44,0.96)', border: `4px solid ${d.c}`, boxShadow: '0 20px 40px rgba(0,0,0,0.45)', transform: `rotate(${sw}deg) scale(${spring(t, g.at)})`, transformOrigin: '0% 50%', overflow: 'hidden'}}>
                    <Img src={PH(g.src)} style={{position: 'absolute', right: 0, top: 0, width: 170, height: 240, objectFit: 'cover', objectPosition: g.pos ?? 'center'}} />
                    <div style={{position: 'absolute', left: 20, top: 16, width: 280}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                        <div style={{width: 50, height: 50, borderRadius: 25, background: d.c, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={28} color={INK}>{d.k}</T></div>
                        <T size={d.l.length > 9 ? 28 : 34}>{d.l}</T>
                      </div>
                      {t > g.iso && <T size={40} color={d.c} style={{marginTop: 12, opacity: pop(t, g.iso)}}>{d.iso}</T>}
                      {t > g.dom && <Hand size={30} style={{marginTop: 6, opacity: pop(t, g.dom)}}>{g.txt}</Hand>}
                    </div>
                  </Abs>
                </React.Fragment>
              );
            })}
          </AbsoluteFill>
        );
      })()}
      {t > 108.3 && t < 116.4 && (() => {
        const stack = prog(t, 111.5, 112.6, easeInOut);
        const ok = prog(t, 112.4, 112.8);
        return (
          <AbsoluteFill style={{opacity: win(t, 108.3, 116.4, 0.3)}}>
            <Title>{t < 111.4 ? <>Des normes conçues pour <span style={{color: TEAL}}>dialoguer</span></> : <>Une <span style={{color: TEAL}}>structure commune</span></>}</Title>
            {QSE.map((d, k) => (
              <Abs key={k} x={lerp(70 + k * 330, 400, stack) + (k - 1) * 18 * (1 - ok)} y={680 + (k - 1) * 10 * stack} w={280} h={380} style={{borderRadius: 14, background: stack > 0.5 ? `rgba(247,244,236,${lerp(1, 0.55, ok)})` : PAPER, boxShadow: '0 16px 30px rgba(0,0,0,0.4)', overflow: 'hidden', transform: `scale(${spring(t, 108.5 + k * 0.15)})`}}>
                <div style={{height: 56, background: d.c, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={28} color={INK}>{d.iso}</T></div>
                {[0.85, 0.6, 0.75, 0.5, 0.8, 0.65, 0.7].map((w, j) => <div key={j} style={{margin: '18px 20px 0', height: 14, width: 240 * w, borderRadius: 7, background: ok > 0.5 ? TEAL : '#C9C2B0'}} />)}
              </Abs>
            ))}
            {t > 110.1 && t < 111.6 && [[385, 760], [715, 760]].map(([x, y], k) => (
              <Abs key={k} x={x - 50} y={y} style={{transform: `scale(${spring(t, 110.14 + k * 0.2)})`}}>
                <div style={{padding: '12px 18px', borderRadius: 24, background: '#fff', display: 'flex', gap: 8}}>{[0, 1, 2].map((j) => <div key={j} style={{width: 14, height: 14, borderRadius: 7, background: TEAL, transform: `translateY(${Math.sin(t * 10 + j) * 4}px)`}} />)}</div>
              </Abs>
            ))}
            {t > 114.2 && <Row y={1160}><Chip c={t < 115.4 ? LIGHT : TEAL} q={spring(t, t < 115.4 ? 114.26 : 115.46)} size={34}>{t < 115.4 ? 'Possible…' : <><Check p={prog(t, 115.5, 115.9)} size={34} color={INK} />… et logique</>}</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
      {t > 116.2 && t < 131.3 && <PdcaWheel />}
      {t > 130.9 && <Agnostic />}
    </AbsoluteFill>
  );
};

/* ─────────── Partie 2 : pourquoi intégrer ─────────── */
const ROWS: [string, string, string, number, number][] = [
  ['Organisation', 'Silos · vision fragmentée', 'Vision transversale', 159.0, 162.4],
  ['Documentation', 'Redondante', 'Mutualisée', 164.3, 167.35],
  ['Audits', 'Multiples', 'Combinés', 169.95, 171.15],
  ['Coût', 'Élevé', 'Rationalisé', 172.6, 173.3],
  ['Culture', 'Cloisonnée', 'Partagée', 177.25, 178.6],
];
const SCR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&@$';
const scramble = (a: string, b: string, p: number, seed: string) => {
  if (p <= 0) return a;
  if (p >= 1) return b;
  const n = Math.max(a.length, b.length);
  let o = '';
  for (let i = 0; i < n; i++) {
    if (p > 0.3 + (i / n) * 0.7) o += b[i] ?? '';
    else o += b[i] === ' ' ? ' ' : SCR[Math.floor(random(`${seed}-${i}-${Math.floor(p * 24)}`) * SCR.length)];
  }
  return o;
};
const P2: React.FC = () => {
  const t = useT();
  const o = win(t, 141.3, 182.1, 0.4);
  if (o <= 0) return null;
  const all = prog(t, 179.14, 179.6);
  return (
    <AbsoluteFill style={{opacity: o}}>
      {t < 145.6 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 145.2, 145.6)}}>
          <Row y={720} gap={2}>
            {'POURQUOI ?'.split('').map((ch, k) => (
              <div key={k} style={{transform: `translateY(${(1 - spring(t, 142.9 + k * 0.05, 8, 14)) * -600}px) rotate(${(1 - spring(t, 142.9 + k * 0.05)) * 30}deg)`, opacity: t > 142.9 + k * 0.05 ? 1 : 0}}>
                <T size={128} color={ch === '?' ? ORANGE : LIGHT}>{ch === ' ' ? ' ' : ch}</T>
              </div>
            ))}
          </Row>
          {t > 143.7 && <Abs x={0} y={960} w={1080} style={{textAlign: 'center'}}><Hand size={50} color={DIM} style={{opacity: pop(t, 143.76)}}>se donner la peine d'intégrer ?</Hand></Abs>}
        </AbsoluteFill>
      )}
      {t > 145.2 && (
        <AbsoluteFill style={{opacity: pop(t, 145.3)}}>
          <Title>{t < 148.9 ? <>Une comparaison <span style={{color: ORANGE}}>directe</span></> : t < 179.1 ? <>Avant / <span style={{color: TEAL}}>après</span></> : <>Et ça, ça <span style={{color: TEAL}}>change tout</span></>}</Title>
          <Abs x={40} y={590} w={1000} h={900} style={{borderRadius: 32, background: '#0F2A30', border: `3px solid ${all > 0.5 ? TEAL : '#2C4A50'}`, boxShadow: all > 0 ? `0 0 ${60 * all}px ${TEAL}55` : '0 30px 60px rgba(0,0,0,0.5)', transform: `scale(${spring(t, 147.33)})`}}>
            <div style={{position: 'absolute', left: 30, right: 30, top: 28, display: 'flex', alignItems: 'center'}}>
              <T size={26} color={DIM} style={{width: 250}}>CRITÈRE</T>
              <T size={26} color={t > 150.6 && t < 151.9 ? RED : '#C98A8A'} style={{flex: 1}}>SYSTÈMES SÉPARÉS</T>
              <T size={26} color={TEAL} style={{width: 170, textAlign: 'right', transform: `scale(${t > 151.9 && t < 153.4 ? 1.15 : 1})`, transformOrigin: '100% 50%'}}>→ SMI</T>
            </div>
            {ROWS.map(([lab, a, b, at, flip], k) => {
              const vis = t > at - 0.1;
              const fp = Math.min(1, Math.max(0, spring(t, flip, 9, 16)));
              const sc = prog(t, flip, flip + 0.55);
              const spot = k === 4 && t > 174.8 && t < at;
              return (
                <div key={lab} style={{position: 'absolute', left: 24, right: 24, top: 100 + k * 156, height: 136, borderRadius: 22, background: spot ? 'rgba(255,201,77,0.12)' : 'rgba(255,255,255,0.04)', border: spot ? `3px solid ${GOLD}` : '3px solid transparent', display: 'flex', alignItems: 'center', padding: '0 20px', boxSizing: 'border-box', opacity: vis || spot ? 1 : 0.25}}>
                  <T size={30} style={{width: 230}}>{lab}</T>
                  <div style={{flex: 1, height: 84, borderRadius: 14, background: '#071417', border: `2px solid ${t > flip ? TEAL : '#3A2A2A'}`, display: 'flex', alignItems: 'center', padding: '0 18px', overflow: 'hidden'}}>
                    {vis && <T size={t > flip + 0.3 ? 34 : 30} color={t > flip + 0.55 ? TEAL : t > flip ? LIGHT : '#E88A8A'} style={{whiteSpace: 'nowrap', fontFamily: t > flip && t < flip + 0.55 ? 'monospace' : sansFont}}>{t > flip ? scramble(a, b, sc, `sc${k}`) : a}</T>}
                    {spot && <T size={34} color={GOLD}>?</T>}
                  </div>
                  <div style={{width: 130, height: 70, borderRadius: 35, marginLeft: 20, background: t > flip ? (all > 0.5 ? TEAL : '#1E8F83') : '#5A3A3A', position: 'relative', boxShadow: all > 0.5 ? `0 0 24px ${TEAL}` : 'none', flexShrink: 0}}>
                    <div style={{position: 'absolute', top: 7, left: 7 + 60 * fp, width: 56, height: 56, borderRadius: 28, background: '#fff', boxShadow: '0 4px 10px rgba(0,0,0,0.4)'}} />
                  </div>
                </div>
              );
            })}
          </Abs>
          {t > 156.3 && t < 158.9 && <Row y={1515}><Chip c={TEAL} q={spring(t, 156.34)} size={30}>Le choix devient une évidence</Chip></Row>}
          {t > 179.1 && <Row y={1515}><Chip c={TEAL} q={spring(t, 179.14)} size={30}><Check p={prog(t, 179.3, 179.7)} size={36} color={INK} />Ça change tout</Chip></Row>}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Partie 3 : levier de performance ─────────── */
const Chess: React.FC = () => {
  const t = useT();
  const jump = prog(t, 185.5, 186.2, easeInOut);
  const cell = 150;
  const kx = lerp(0, 1, jump) * cell + cell / 2, ky = lerp(3, 1, jump) * cell + cell / 2 - Math.sin(Math.PI * jump) * 120;
  return (
    <AbsoluteFill style={{opacity: 1 - prog(t, 187.5, 187.9)}}>
      <Title>Un vrai <span style={{color: GREEN}}>levier stratégique</span></Title>
      <Abs x={240} y={620} w={600} h={600} style={{transform: `scale(${spring(t, 184.6)})`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.5)'}}>
        {Array.from({length: 16}, (_, k) => {
          const i = k % 4, j = Math.floor(k / 4);
          const target = i === 1 && j === 1;
          return <div key={k} style={{position: 'absolute', left: i * cell, top: j * cell, width: cell, height: cell, background: target && jump > 0.9 ? GOLD : (i + j) % 2 ? '#1D3F46' : '#E7F2F1', boxShadow: target && jump > 0.9 ? `0 0 40px ${GOLD}` : 'none'}} />;
        })}
        <div style={{position: 'absolute', left: kx - 75, top: ky - 95, width: 150, textAlign: 'center', fontFamily: "'DejaVu Sans', sans-serif", fontSize: 140, lineHeight: 1, color: jump > 0.9 ? INK : TEAL, textShadow: '0 10px 20px rgba(0,0,0,0.45)'}}>♞</div>
      </Abs>
      {t > 185.0 && <Row y={1330}><Chip c={GREEN} q={spring(t, 185.06)} size={32}><F n="trophee" size={46} />Levier de performance</Chip></Row>}
    </AbsoluteFill>
  );
};
const Building: React.FC = () => {
  const t = useT();
  const zoom = prog(t, 191.9, 193.5, easeIn);
  const FL: [string, string, number][] = [['Direction', 'directeur', 189.3], ['Équipes', 'ouvrier', 189.9]];
  return (
    <AbsoluteFill style={{opacity: pop(t, 187.5) * (1 - prog(t, 193.3, 193.7)), transform: `scale(${1 + zoom * 1.8})`, transformOrigin: '470px 830px'}}>
      <Title>À <span style={{color: GREEN}}>tous les étages</span></Title>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <polygon points="150,700 470,580 790,700" fill="#22383D" stroke="#55696D" strokeWidth={5} />
        {FL.map(([, , at], k) => {
          const y = 700 + k * 260;
          const lit = prog(t, at, at + 0.5);
          return (
            <g key={k}>
              <rect x={170} y={y} width={600} height={260} fill="#16292D" stroke="#55696D" strokeWidth={5} />
              <rect x={175} y={y + 5} width={590} height={250 * lit} fill={TEAL} opacity={0.35} />
            </g>
          );
        })}
        <rect x={430} y={1100} width={80} height={120} fill="#0A1418" stroke="#55696D" strokeWidth={4} />
        <line x1={60} y1={1222} x2={1020} y2={1222} stroke="#55696D" strokeWidth={6} />
        {t > 190.4 && <path d={`M510 1180 L${lerp(510, 860, prog(t, 190.5, 191.1))} 1180`} stroke={TEAL} strokeWidth={10} strokeLinecap="round" strokeDasharray="20 14" strokeDashoffset={-t * 60} />}
      </svg>
      {FL.map(([l, ic, at], k) => <Abs key={k} x={200} y={740 + k * 260} w={560} style={{display: 'flex', alignItems: 'center', gap: 20, opacity: 0.45 + 0.55 * prog(t, at, at + 0.4)}}><F n={ic} size={140} /><T size={46}>{l}</T></Abs>)}
      <Abs x={800} y={960} w={240} style={{textAlign: 'center', opacity: 0.45 + 0.55 * prog(t, 190.9, 191.3), transform: `scale(${0.9 + 0.1 * spring(t, 190.9)})`}}><F n="poignee" size={140} /><T size={30}>Parties prenantes</T></Abs>
    </AbsoluteFill>
  );
};
const Direction: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill style={{opacity: pop(t, 193.4) * (1 - prog(t, 211.6, 212.0))}}>
      <Title>{t < 198.8 ? <>Pour la <span style={{color: GREEN}}>direction</span></> : t < 205.6 ? <>Un <span style={{color: GREEN}}>tableau de bord unique</span></> : t < 209.7 ? <>L'<span style={{color: GOLD}}>impact financier</span></> : <>Conformité <span style={{color: GREEN}}>maîtrisée</span></>}</Title>
      {t < 199.1 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 198.7, 199.1)}}>
          <Photo src="iso26/direction-equipe.jpg" x={70} y={620} w={940} h={560} q={spring(t, 193.5)} pos="50% 40%">
            {t > 195.6 && <div style={{position: 'absolute', inset: -40, background: 'linear-gradient(90deg, transparent, rgba(225,238,238,0.85) 40%, rgba(225,238,238,0.85))', transform: `translateX(${(1 - prog(t, 195.66, 197.0, easeOut)) * 100}%)`, filter: 'blur(24px)'}} />}
          </Photo>
          {t > 195.6 && <Abs x={90} y={640}><Chip c={LIGHT} q={spring(t, 195.66)} size={28}>Naviguer à vue…</Chip></Abs>}
          {t > 197.0 && QSE.map((d, k) => (
            <Abs key={k} x={90 + k * 330} y={1210} w={240} h={180} style={{borderRadius: 14, background: PAPER, borderTop: `14px solid ${d.c}`, padding: 14, boxSizing: 'border-box', transform: `rotate(${(k - 1) * 4}deg) scale(${spring(t, 197.1 + k * 0.12)})`}}>
              <T size={24} color={INK}>Rapport {d.k}</T>
              {[0.8, 0.6, 0.7].map((w, j) => <div key={j} style={{marginTop: 14, height: 10, width: 200 * w, borderRadius: 5, background: '#CFC8B6'}} />)}
            </Abs>
          ))}
          {t > 197.9 && [[360, 1264], [690, 1264]].map(([x, y], k) => <Abs key={k} x={x - 36} y={y} w={72} h={72} style={{borderRadius: 36, background: RED, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${spring(t, 197.9 + k * 0.15)})`}}><T size={40} color="#fff">✕</T></Abs>)}
        </AbsoluteFill>
      )}
      {t > 198.8 && t < 205.8 && (
        <AbsoluteFill style={{opacity: win(t, 198.8, 205.8, 0.3)}}>
          <Photo src="iso26/analyste-kpi.jpg" x={70} y={600} w={940} h={880} filter="brightness(0.45)" />
          <Abs x={120} y={660} w={840} h={600} style={{borderRadius: 26, background: 'rgba(11,31,36,0.93)', border: `3px solid ${GREEN}`, padding: 26, boxSizing: 'border-box', transform: `scale(${spring(t, 198.9)})`}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 12}}><F n="graphique" size={50} /><T size={34}>Tableau de bord SMI</T></div>
            <div style={{display: 'flex', gap: 16, marginTop: 20}}>
              {QSE.map((d, k) => (
                <div key={k} style={{flex: 1, height: 170, borderRadius: 16, background: 'rgba(255,255,255,0.05)', border: `2px solid ${d.c}`, padding: 12, boxSizing: 'border-box'}}>
                  <T size={22} color={d.c}>{d.l}</T>
                  <svg width={220} height={100} viewBox="0 0 220 100"><path d={`M0 ${70 - k * 6} C40 ${50 + k * 8} 70 ${80 - k * 10} 110 45 S180 ${30 + k * 5} 220 ${20 + k * 6}`} stroke={d.c} strokeWidth={5} fill="none" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - prog(t, 199.3 + k * 0.2, 200.3 + k * 0.2)} /></svg>
                </div>
              ))}
            </div>
            <div style={{marginTop: 18, height: 220, borderRadius: 16, background: 'rgba(25,195,177,0.08)', border: `2px solid ${TEAL}`, padding: 14, boxSizing: 'border-box', opacity: pop(t, 200.58)}}>
              <T size={24} color={TEAL}>Vue consolidée Q · S · E</T>
              <svg width={760} height={150} viewBox="0 0 760 150">
                <path d="M0 130 C120 110 200 120 300 80 S500 60 600 40 S700 30 760 20 L760 150 L0 150 Z" fill={`${TEAL}33`} />
                <path d="M0 130 C120 110 200 120 300 80 S500 60 600 40 S700 30 760 20" stroke={TEAL} strokeWidth={6} fill="none" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - prog(t, 200.6, 201.6)} />
              </svg>
            </div>
          </Abs>
          {t > 200.0 && <Abs x={80} y={1300}><Chip c={GREEN} q={spring(t, 200.1)} size={28}>Vision d'ensemble</Chip></Abs>}
          {t > 200.5 && <Abs x={560} y={1300}><Chip c={TEAL} q={spring(t, 200.58)} size={28}>Consolidée</Chip></Abs>}
          {t > 202.6 && <Abs x={80} y={1390}><Chip c={LIGHT} q={spring(t, 202.7)} size={28}><F n="boussole" size={40} />Pilotage plus simple</Chip></Abs>}
          {t > 203.8 && <Abs x={500} y={1390}><Chip c={GOLD} q={spring(t, 203.82)} size={28}><F n="cible" size={40} />Décisions pertinentes</Chip></Abs>}
        </AbsoluteFill>
      )}
      {t > 205.6 && t < 209.9 && (() => {
        const pr = prog(t, 205.7, 206.6, easeOut);
        const LINES: [string, number][] = [["Frais d'audit", 207.78], ['Coûts cachés', 208.74]];
        return (
          <AbsoluteFill style={{opacity: win(t, 205.6, 209.9, 0.3)}}>
            <Abs x={270} y={620} w={540} h={110} style={{borderRadius: 24, background: '#22383D', border: '4px solid #55696D', zIndex: 2}}><div style={{position: 'absolute', left: 60, right: 60, bottom: 18, height: 14, borderRadius: 7, background: '#0A1418'}} /></Abs>
            <Abs x={320} y={712} w={440} h={620 * pr} style={{overflow: 'hidden'}}>
              <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 620, background: PAPER, padding: '28px 30px', boxSizing: 'border-box'}}>
                <div style={{fontFamily: 'monospace', fontWeight: 700, fontSize: 30, color: INK, textAlign: 'center'}}>IMPACT FINANCIER</div>
                <div style={{borderTop: '3px dashed #B8B1A0', margin: '18px 0'}} />
                {LINES.map(([l, at]) => (
                  <div key={l} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 30, fontFamily: 'monospace', fontWeight: 700, fontSize: 30, color: INK}}>
                    <span style={{textDecoration: t > at ? 'line-through' : 'none', textDecorationColor: RED, textDecorationThickness: 4}}>{l}</span>
                    {t > at && <span style={{color: '#1E9E5A', transform: `scale(${spring(t, at)})`, display: 'inline-block'}}>▼ moins</span>}
                  </div>
                ))}
                <div style={{borderTop: '3px dashed #B8B1A0', margin: '34px 0 18px'}} />
                {t > 209.0 && <div style={{fontFamily: 'monospace', fontWeight: 700, fontSize: 28, color: '#1E9E5A', textAlign: 'center', opacity: pop(t, 209.0)}}>RISQUES MIEUX MAÎTRISÉS</div>}
              </div>
            </Abs>
          </AbsoluteFill>
        );
      })()}
      {t > 209.6 && (
        <AbsoluteFill style={{opacity: pop(t, 209.6)}}>
          <Abs x={110} y={620 + (1 - spring(t, 209.72, 8, 13)) * -400} w={860} h={200} style={{borderRadius: 30, background: 'linear-gradient(135deg, #12343B, #0B1F24)', border: `4px solid ${GOLD}`, display: 'flex', alignItems: 'center', gap: 24, padding: '0 30px', boxSizing: 'border-box', boxShadow: `0 0 50px ${GOLD}55`}}>
            <div style={{width: 130, height: 130, borderRadius: 65, background: `${GOLD}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}><F n="bouclier" size={96} /></div>
            <div><T size={24} color={GOLD} style={{letterSpacing: 4}}>SUCCÈS DÉBLOQUÉ</T><T size={40} style={{marginTop: 6}}>Risques réglementaires</T><T size={40} color={GREEN}>bien mieux maîtrisés</T></div>
          </Abs>
          {Array.from({length: 40}, (_, k) => {
            const dt = t - 210.0;
            if (dt <= 0) return null;
            const a = random(`cf${k}`) * Math.PI * 2, v = 300 + random(`cv${k}`) * 500;
            return <div key={k} style={{position: 'absolute', left: 540 + Math.cos(a) * v * dt, top: 720 + Math.sin(a) * v * dt + 600 * dt * dt, width: 16, height: 10, background: [GOLD, TEAL, BLUE, ORANGE, GREEN][k % 5], transform: `rotate(${dt * 600 + k * 30}deg)`, opacity: 1 - prog(dt, 1.2, 1.8)}} />;
          })}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
const Equipes: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill style={{opacity: pop(t, 211.7) * (1 - prog(t, 234.1, 234.5))}}>
      <Title>{t < 215.5 ? <>Pour les <span style={{color: GREEN}}>équipes</span></> : t < 221.7 ? <>Imaginez <span style={{color: GREEN}}>un peu</span>…</> : t < 227.9 ? <>Chacun <span style={{color: GREEN}}>contribue</span></> : t < 229.9 ? <>L'implication <span style={{color: GREEN}}>plus forte</span></> : <>Fini « chacun <span style={{color: RED}}>son couloir</span> »</>}</Title>
      {t < 215.8 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 215.4, 215.8)}}>
          <Photo src="promo/participants.jpg" x={70} y={620} w={940} h={640} q={spring(t, 211.9)}>
            {t > 214.3 && (
              <svg width={940} height={640} style={{position: 'absolute', inset: 0}}>
                {Array.from({length: 7}, (_, k) => <path key={k} d={`M-50 ${80 + k * 80} C200 ${40 + k * 80} 400 ${130 + k * 80} 600 ${70 + k * 80} S900 ${110 + k * 80} 1000 ${60 + k * 80}`} stroke="rgba(255,255,255,0.8)" strokeWidth={5} fill="none" strokeDasharray="60 90" strokeDashoffset={-(t - 214.3) * 600 - k * 40} strokeLinecap="round" opacity={pop(t, 214.38)} />)}
              </svg>
            )}
          </Photo>
          {t > 214.3 && <Row y={1300}><Chip c={LIGHT} q={spring(t, 214.38)} size={30}>Une vraie bouffée d'air</Chip></Row>}
        </AbsoluteFill>
      )}
      {t > 215.5 && t < 221.9 && (() => {
        const press = prog(t, 217.06, 217.6, easeIn);
        return (
          <AbsoluteFill style={{opacity: win(t, 215.5, 221.9, 0.3)}}>
            <Abs x={520} y={560} w={40} h={60 + press * 354} style={{background: '#55696D'}} />
            <Abs x={300} y={620} w={480} h={40} style={{background: '#8AA0A4', borderRadius: 8, transform: `translateY(${press * 354}px)`, zIndex: 2}} />
            {Array.from({length: 14}, (_, k) => <Abs key={k} x={340 + Math.sin(k * 1.7) * 14 * (1 - press)} y={lerp(1040 - k * 24, 1040 - k * 2, press)} w={400} h={22} style={{background: PAPER, border: '2px solid #CFC8B6', borderRadius: 4, boxSizing: 'border-box'}} />)}
            {t > 217.0 && <Abs x={80} y={1110}><Chip c={GREEN} q={spring(t, 217.06)} size={28}>Procédures plus simples</Chip></Abs>}
            {t > 218.3 && ['personnages/ingenieur.png', 'personnages/responsable.png', 'personnages/superviseur.png'].map((src, k) => (
              <Abs key={k} x={80 + k * 200} y={1200} w={170} h={170} style={{borderRadius: 85, overflow: 'hidden', background: '#22383D', border: `5px solid ${QSE[k].c}`, filter: `blur(${12 * (1 - prog(t, 218.5 + k * 0.15, 219.2 + k * 0.15))}px)`, transform: `scale(${spring(t, 218.42 + k * 0.12)})`}}>
                <Img src={PH(src)} style={{width: '100%', height: '130%', objectFit: 'cover', objectPosition: '50% 0%'}} />
              </Abs>
            ))}
            {t > 218.3 && <Abs x={80} y={1390}><T size={28} color={DIM} style={{opacity: pop(t, 219.0)}}>Des responsabilités claires</T></Abs>}
            {t > 219.9 && (
              <>
                <Abs x={740} y={1260} w={260} h={140} style={{borderRadius: 18, background: '#33474C', border: '4px solid #8AA0A4', zIndex: 2}}>
                  <div style={{position: 'absolute', left: 30, right: 30, top: 14, height: 12, borderRadius: 6, background: '#0A1418'}} />
                  <T size={22} style={{position: 'absolute', bottom: 14, width: '100%', textAlign: 'center'}}>Broyeuse</T>
                </Abs>
                {Array.from({length: 4}, (_, k) => {
                  const at = 220.1 + k * 0.25;
                  const p = prog(t, at, at + 0.6, easeIn);
                  return p < 1 && <Abs key={k} x={lerp(600 + k * 30, 800, p)} y={lerp(1000 + k * 40, 1250, p)} w={150} h={110} style={{background: PAPER, border: '2px solid #CFC8B6', transform: `rotate(${(1 - p) * (k * 25 - 30)}deg) scale(${1 - p * 0.4})`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={44} color={RED}>≠</T></Abs>;
                })}
                {Array.from({length: 8}, (_, k) => <Abs key={`s${k}`} x={765 + k * 26} y={1400} w={14} h={60 * prog(t, 220.4 + (k % 3) * 0.1, 221.2)} style={{background: PAPER}} />)}
                <Abs x={600} y={1490}><T size={26} color={DIM} style={{opacity: pop(t, 220.1)}}>moins de paperasse</T></Abs>
              </>
            )}
          </AbsoluteFill>
        );
      })()}
      {t > 221.6 && t < 230.1 && (() => {
        const ends: [number, number][] = [[850, 720], [850, 980], [850, 1240]];
        const ats = [225.0, 225.8, 227.12];
        return (
          <AbsoluteFill style={{opacity: win(t, 221.6, 230.1, 0.3)}}>
            <Img src={PH('personnages/superviseur.png')} style={{position: 'absolute', left: 60, top: 700, height: 700, transform: `scale(${spring(t, 221.75)})`, transformOrigin: '50% 100%'}} />
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
              {ends.map(([x, y], k) => {
                const p = prog(t, ats[k], ats[k] + 0.4, easeOut);
                return p > 0 && <path key={k} d={`M400 980 Q600 ${(980 + y) / 2 - 60} ${lerp(400, x - 100, p)} ${lerp(980, y, p)}`} stroke={QSE[k].c} strokeWidth={8} fill="none" strokeDasharray="16 10" strokeDashoffset={-t * 60} />;
              })}
            </svg>
            {ends.map(([x, y], k) => (
              <Abs key={k} x={x - 100} y={y - 100} w={200} h={200} style={{borderRadius: 100, background: t > ats[k] ? QSE[k].c : `${QSE[k].c}44`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `scale(${0.7 + 0.3 * spring(t, ats[k])})`, boxShadow: t > ats[k] ? `0 0 40px ${QSE[k].c}` : 'none'}}>
                <F n={QSE[k].ic} size={90} />
                <T size={22} color={INK}>{QSE[k].l}</T>
              </Abs>
            ))}
            {t > 227.9 && <Row y={1440} gap={8}>{Array.from({length: 12}, (_, k) => { const p = prog(t, 228.0 + k * 0.1, 228.2 + k * 0.1); return <div key={k} style={{filter: `grayscale(${1 - p})`, opacity: 0.4 + 0.6 * p}}><F n={k % 2 ? 'salariee' : 'salarie'} size={64} /></div>; })}</Row>}
          </AbsoluteFill>
        );
      })()}
      {t > 229.8 && (() => {
        const free = prog(t, 232.14, 232.7, easeOut);
        const conv = prog(t, 232.4, 233.6, easeInOut);
        return (
          <AbsoluteFill style={{opacity: pop(t, 229.85)}}>
            <Abs x={60} y={620} w={960} h={800} style={{borderRadius: 30, overflow: 'hidden', background: 'linear-gradient(180deg, #1E9BD7, #1479B0)', border: '8px solid #DDE7E8', boxSizing: 'border-box'}}>
              <div style={{position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 30% 40%, rgba(255,255,255,0.18) 0 8%, transparent 9%), radial-gradient(ellipse at 70% 70%, rgba(255,255,255,0.14) 0 6%, transparent 7%)', backgroundSize: '160px 120px', backgroundPosition: `${t * 20}px ${t * 8}px`}} />
              {[261, 523].map((y, k) => (
                <div key={k} style={{position: 'absolute', left: 0, right: 0, top: y - 8, height: 16, display: 'flex', gap: 6, opacity: 1 - free, transform: `translateY(${free * (k ? 60 : -60)}px)`}}>
                  {Array.from({length: 40}, (_, j) => <div key={j} style={{width: 18, height: 16, borderRadius: 8, background: j % 4 < 2 ? '#E8434A' : '#fff', flexShrink: 0}} />)}
                </div>
              ))}
              {QSE.map((d, k) => {
                const y0 = 130 + k * 262;
                const xs = 100 + (Math.min(t, 232.4) - 229.9) * 160 + k * 30;
                const x = lerp(xs, 700 + (k - 1) * 70, conv), y = lerp(y0, 392 + (k - 1) * 40, conv);
                const stroke = Math.sin(t * 9 + k);
                return (
                  <React.Fragment key={k}>
                    <svg width={944} height={784} style={{position: 'absolute', inset: 0}}><path d={`M${x - 30} ${y} L${x - 160} ${y - 30} M${x - 30} ${y} L${x - 160} ${y + 30}`} stroke="rgba(255,255,255,0.5)" strokeWidth={4} /></svg>
                    <div style={{position: 'absolute', left: x - 10, top: y - 52 + stroke * 10, width: 18, height: 44, borderRadius: 9, background: '#F2C7A5'}} />
                    <div style={{position: 'absolute', left: x - 10, top: y + 8 - stroke * 10, width: 18, height: 44, borderRadius: 9, background: '#F2C7A5'}} />
                    <div style={{position: 'absolute', left: x - 26, top: y - 26, width: 52, height: 52, borderRadius: 26, background: d.c, border: '4px solid #fff', boxSizing: 'border-box'}} />
                  </React.Fragment>
                );
              })}
              <div style={{position: 'absolute', left: 850, top: 300, width: 8, height: 190, background: '#DDE7E8'}} />
              <svg width={944} height={784} style={{position: 'absolute', inset: 0}}><path d={`M858 300 L${930 + Math.sin(t * 6) * 6} 330 L858 360 Z`} fill={GOLD} /></svg>
            </Abs>
            {t > 231.2 && t < 232.3 && <Row y={1440}><Chip c={RED} dark={false} q={spring(t, 231.22)} size={28}>Chacun son couloir</Chip></Row>}
            {t > 233.4 && <Row y={1440}><Chip c={GOLD} q={spring(t, 233.46)} size={30}>Une mission commune</Chip></Row>}
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};
const Parties: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill style={{opacity: pop(t, 234.2)}}>
      <Title>{t < 237.2 ? <>Au-delà de <span style={{color: GREEN}}>l'entreprise</span></> : t < 239.4 ? <>Un SMI <span style={{color: BLUE}}>certifié</span></> : t < 247.2 ? <>Un <span style={{color: GREEN}}>signal fort</span></> : t < 249.4 ? <>L'<span style={{color: GOLD}}>image de marque</span></> : <>L'engagement <span style={{color: GREEN}}>RSE</span></>}</Title>
      {t < 247.5 && (() => {
        const bx = lerp(390, 120, prog(t, 237.0, 237.8, easeInOut));
        const RX: [string, string, number, string][] = [['zones/client.jpg', 'Client', 242.22, '50% 78%'], ['zones/entrepot.jpg', 'Fournisseur', 243.02, '62% 50%'], ['promo/audit-reunion.jpg', 'Autorités', 243.98, '50% 50%']];
        return (
          <AbsoluteFill style={{opacity: 1 - prog(t, 247.1, 247.5)}}>
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
              {t < 237.8 && [0, 1, 2].map((k) => (
                <path key={k} d={Array.from({length: 40}, (_, j) => { const x = bx + 300 + j * 20; const y = 1010 + Math.sin((x - (t - 234.3) * 500) / 60 + k) * (30 + k * 12) * prog(x, bx + 300, bx + 500); return `${j ? 'L' : 'M'}${x} ${y}`; }).join(' ')} stroke={TEAL} strokeWidth={6 - k * 1.5} fill="none" opacity={(0.9 - k * 0.25) * pop(t, 234.4) * (1 - prog(t, 237.2, 237.8))} />
              ))}
              {t > 239.4 && RX.map(([, , at], k) => {
                const ty = 720 + k * 290;
                const p = prog(t, at - 0.6, at, easeOut);
                return p > 0 && <path key={k} d={`M${bx + 150} 860 Q${(bx + 150 + 760) / 2} ${ty - 120} ${lerp(bx + 150, 760, p)} ${lerp(860, ty, p)}`} stroke={QSE[k].c} strokeWidth={6} fill="none" strokeDasharray="18 12" strokeDashoffset={-t * 80} />;
              })}
            </svg>
            <Abs x={bx} y={860} style={{transform: `scale(${spring(t, 234.4)})`}}><F n="usine" size={300} /></Abs>
            {t > 238.4 && <Abs x={bx + 220} y={850} w={110} h={110} style={{borderRadius: 55, background: '#1D9BF0', border: '6px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${spring(t, 238.5, 9, 18)})`, boxShadow: '0 0 30px #1D9BF0', boxSizing: 'border-box'}}><Check p={prog(t, 238.6, 239.0)} size={60} color="#fff" /></Abs>}
            {t > 239.4 && [0, 1, 2].map((k) => {
              const ph = ((t - 239.46) * 1.2 + k / 3) % 1;
              return <div key={k} style={{position: 'absolute', left: bx + 150 - 60 - ph * 200, top: 860 - 60 - ph * 200, width: 120 + ph * 400, height: 120 + ph * 400, borderRadius: '50%', border: `5px solid ${TEAL}`, opacity: (1 - ph) * pop(t, 239.46), clipPath: 'inset(0 0 50% 50%)', boxSizing: 'border-box'}} />;
            })}
            {t > 239.4 && RX.map(([src, l, at, pos], k) => (
              <Abs key={k} x={760} y={620 + k * 290} w={240} style={{textAlign: 'center', opacity: 0.35 + 0.65 * prog(t, at, at + 0.3), transform: `scale(${0.8 + 0.2 * spring(t, at)})`}}>
                <div style={{width: 200, height: 200, margin: '0 auto', borderRadius: 100, overflow: 'hidden', border: `6px solid ${t > at ? QSE[k].c : '#55696D'}`, boxShadow: t > at ? `0 0 30px ${QSE[k].c}` : 'none', boxSizing: 'border-box'}}><Img src={PH(src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos}} /></div>
                <T size={28} style={{marginTop: 8}}>{l}</T>
              </Abs>
            ))}
            {t > 244.8 && <Abs x={60} y={1300}><Chip c={LIGHT} q={spring(t, 244.9)} size={28}><F n="poignee" size={40} />Gage de sérieux</Chip></Abs>}
            {t > 245.9 && <Abs x={60} y={1390}><Chip c={GREEN} q={spring(t, 246.02)} size={28}>… et de fiabilité</Chip></Abs>}
          </AbsoluteFill>
        );
      })()}
      {t > 247.2 && (
        <AbsoluteFill style={{opacity: pop(t, 247.25)}}>
          <Abs x={140} y={600} w={800} h={170} style={{borderRadius: 24, background: 'linear-gradient(135deg, #C9D6D8, #8AA0A4 45%, #E8F0F1 55%, #8AA0A4)', border: '4px solid #E8F0F1', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, overflow: 'hidden', transform: `scale(${spring(t, 247.3)})`, boxShadow: '0 20px 40px rgba(0,0,0,0.45)'}}>
            <T size={52} color={INK}>Image de marque</T>
            {t > 248.4 && <div style={{width: 70, height: 70, borderRadius: 35, background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${spring(t, 248.42)})`}}><T size={44} color={INK}>↑</T></div>}
            <div style={{position: 'absolute', top: -40, bottom: -40, width: 120, left: `${lerp(-20, 120, prog(t, 247.5, 248.5, easeInOut))}%`, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.85), transparent)', transform: 'skewX(-20deg)'}} />
          </Abs>
          {t > 249.3 && (() => {
            const solid = prog(t, 252.0, 252.4);
            const ITEMS: [string, number][] = [['Démarche structurée', 252.14], ['Concrète', 253.54], ['Vérifiable', 254.3]];
            return (
              <Abs x={110} y={860} w={860} h={540} style={{transform: `scale(${spring(t, 249.4)})`}}>
                <svg width={860} height={600} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
                  <path d="M40 0 H820 Q860 0 860 40 V460 Q860 500 820 500 H260 L170 580 L190 500 H40 Q0 500 0 460 V40 Q0 0 40 0 Z" fill={solid > 0.5 ? 'rgba(61,220,132,0.14)' : 'rgba(255,255,255,0.03)'} stroke={solid > 0.5 ? GREEN : DIM} strokeWidth={5} strokeDasharray={solid > 0.5 ? undefined : '22 16'} />
                </svg>
                {t < 252.1 && <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 500, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 1 - solid}}><Hand size={60} color={DIM}>Une déclaration d'intention ?</Hand></div>}
                {t > 252.1 && (
                  <div style={{position: 'absolute', left: 50, top: 60}}>
                    {ITEMS.map(([l, at]) => t > at && (
                      <div key={l} style={{display: 'flex', alignItems: 'center', gap: 18, marginBottom: 34, transform: `translateX(${(1 - spring(t, at)) * -60}px)`, opacity: pop(t, at)}}>
                        <div style={{width: 76, height: 76, borderRadius: 18, background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Check p={prog(t, at + 0.1, at + 0.5)} size={56} color={INK} /></div>
                        <T size={46}>{l}</T>
                      </div>
                    ))}
                  </div>
                )}
                {t > 254.2 && <Abs x={580} y={280} style={{transform: `translate(${Math.sin((t - 254.2) * 4) * 40}px, ${Math.cos((t - 254.2) * 4) * 20}px)`}}><F n="loupe" size={150} /></Abs>}
              </Abs>
            );
          })()}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
const P3: React.FC = () => {
  const t = useT();
  const o = win(t, 184.5, 255.1, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {t < 187.9 && <Chess />}
      {t > 187.5 && t < 193.7 && <Building />}
      {t > 193.4 && t < 212.0 && <Direction />}
      {t > 211.7 && t < 234.5 && <Equipes />}
      {t > 234.2 && <Parties />}
    </AbsoluteFill>
  );
};

/* ─────────── Partie 4 : face au monde VUCA, l'essentiel, la conclusion ─────────── */
const CLOUDS: [string, string, number][] = [['V', 'Volatile', 261.68], ['U', 'Incertain', 262.36], ['C', 'Complexe', 263.04], ['A', 'Ambigu', 263.72]];
const GUYS: [string, number, [number, number], [number, number]][] = [
  ['Processus standardisés', 265.7, [90, 1450], [60, 1480]],
  ['Gestion des risques intégrée', 269.98, [990, 1450], [565, 1480]],
  ['Vision systémique', 273.78, [70, 1130], [60, 1050]],
  ['Référentiels clairs', 275.3, [1010, 1130], [695, 1050]],
];
const Storm: React.FC = () => {
  const t = useT();
  const clear = prog(t, 276.34, 277.8, easeInOut);
  const wob = t > 264.5 && t < 265.9 ? Math.sin((t - 264.5) * 16) * 4 * (1 - prog(t, 265.7, 265.9)) : 0;
  const fog = prog(t, 268.78, 269.5) * (1 - prog(t, 270.0, 271.0));
  return (
    <AbsoluteFill style={{opacity: 1 - prog(t, 279.2, 279.6)}}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, rgba(20,28,40,${0.95 * (1 - clear)}) 0%, rgba(30,42,60,${0.9 * (1 - clear)}) 55%, rgba(30,42,60,0) 100%)`}} />
      {clear > 0 && <AbsoluteFill style={{background: `radial-gradient(circle at 80% 30%, rgba(255,201,77,${0.35 * clear}), transparent 55%)`}} />}
      <Title>{t < 260.1 ? <>Le monde <span style={{color: GOLD}}>d'aujourd'hui</span></> : t < 276.3 ? <>Un monde <span style={{color: RED}}>VUCA</span></> : <>Un outil de <span style={{color: GOLD}}>résilience</span></>}</Title>
      {clear < 1 && Array.from({length: 70}, (_, k) => {
        const x = ((random(`rx${k}`) * 1200 + t * 120) % 1200) - 60;
        const y = ((random(`ry${k}`) * 1300 + t * 1400) % 1300) + 560;
        return <div key={k} style={{position: 'absolute', left: x, top: y, width: 3, height: 34, background: 'rgba(180,210,255,0.5)', transform: 'rotate(12deg)', opacity: (1 - clear) * pop(t, 258.0)}} />;
      })}
      {t > 260.85 && t < 261.15 && <AbsoluteFill style={{background: 'rgba(255,255,255,0.5)'}} />}
      {CLOUDS.map(([L, w, at], k) => t > at - 0.05 && (
        <Abs key={k} x={60 + k * 245} y={590 - clear * 300} w={230} style={{textAlign: 'center', opacity: 1 - clear, transform: `scale(${spring(t, at)})`}}>
          <div style={{position: 'relative', height: 130}}>
            <div style={{position: 'absolute', left: 20, top: 40, width: 190, height: 80, borderRadius: 40, background: '#5B6B80'}} />
            <div style={{position: 'absolute', left: 50, top: 6, width: 100, height: 100, borderRadius: 50, background: '#6E7F95'}} />
            <div style={{position: 'absolute', left: 110, top: 22, width: 80, height: 80, borderRadius: 40, background: '#66778C'}} />
            <T size={64} style={{position: 'absolute', left: 0, right: 0, top: 30}}>{L}</T>
          </div>
          <T size={26} color={DIM}>{w}</T>
        </Abs>
      ))}
      {t > 264.4 && t < 266.0 && Array.from({length: 6}, (_, k) => <div key={k} style={{position: 'absolute', left: (((t - 264.4) * 1400 + k * 90) % 1300) - 200, top: 900 + k * 70, width: 220, height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.6)'}} />)}
      {t > 272.3 && t < 272.7 && <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><polyline points="672,730 640,800 690,820 650,900 700,910 660,990" stroke="#FFF6C2" strokeWidth={8} fill="none" strokeLinejoin="round" /></svg>}
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {GUYS.map(([, at, a], k) => {
          const p = prog(t, at, at + 0.5, easeOut);
          return p > 0 && <line key={k} x1={540} y1={912} x2={lerp(540, a[0], p)} y2={lerp(912, a[1], p)} stroke={k === 3 ? DIM : GOLD} strokeWidth={5} strokeDasharray={k === 3 ? '12 10' : undefined} />;
        })}
      </svg>
      <Abs x={280} y={860}><Tripod w={520} lift={0.75} crank={t * 1.5} wob={wob} /></Abs>
      {GUYS.map(([l, at, , tag], k) => t > at + 0.3 && <Abs key={k} x={tag[0]} y={tag[1]} style={{opacity: pop(t, at + 0.3)}}><Chip c={k === 3 ? '#55696D' : GOLD} dark={k !== 3} size={24}>{l}</Chip></Abs>)}
      {fog > 0 && <AbsoluteFill style={{background: `linear-gradient(180deg, transparent 30%, rgba(200,210,220,${0.55 * fog}) 60%, transparent 95%)`, filter: 'blur(10px)'}} />}
      {t > 277.6 && <Row y={1550}><Chip c={GOLD} q={spring(t, 277.62)} size={28}>Pour naviguer dans notre époque</Chip></Row>}
    </AbsoluteFill>
  );
};
const Coin: React.FC = () => {
  const t = useT();
  const sp = prog(t, 287.5, 289.3, easeOut);
  const ang = sp * 1080;
  const cos = Math.cos((ang * Math.PI) / 180);
  const half = Math.floor((ang + 90) / 180);
  const land = t > 289.3;
  const face = QSE[half % 3];
  const toss = Math.sin(Math.PI * sp) * -260;
  return (
    <AbsoluteFill style={{opacity: pop(t, 286.6)}}>
      <Abs x={310} y={760 + toss} w={460} h={460} style={{transform: `scaleX(${Math.max(0.04, Math.abs(cos))})`}}>
        <div style={{position: 'absolute', inset: 0, borderRadius: 230, background: land ? TEAL : face.c, border: '14px solid rgba(255,255,255,0.75)', boxShadow: 'inset 0 -16px 0 rgba(0,0,0,0.18), 0 30px 60px rgba(0,0,0,0.45)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 40, boxSizing: 'border-box'}}>
          {land ? (
            <>
              <T size={40} color={INK}>Organisation</T>
              <T size={52} color={INK}>performante</T>
              <T size={34} color={INK} style={{marginTop: 6, opacity: pop(t, 290.84)}}>& responsable</T>
            </>
          ) : (
            <>
              <F n={face.ic} size={150} />
              <T size={face.l.length > 9 ? 40 : 48} color={INK}>{face.l}</T>
            </>
          )}
        </div>
      </Abs>
      <Abs x={360} y={1290} w={360} h={30} style={{borderRadius: '50%', background: 'rgba(0,0,0,0.35)', transform: `scaleX(${1 - Math.abs(toss) / 600})`}} />
      {land && <Row y={1360}><Chip c={TEAL} q={spring(t, 290.16)} size={30}>Q · S · E : une seule pièce</Chip></Row>}
    </AbsoluteFill>
  );
};
const Essentiel: React.FC = () => {
  const t = useT();
  const ats = [282.12, 282.68, 283.44];
  return (
    <AbsoluteFill style={{opacity: pop(t, 279.25) * (1 - prog(t, 291.5, 291.9))}}>
      <Title>{t < 284.1 ? <>Ce qu'il faut <span style={{color: GOLD}}>retenir</span></> : t < 286.5 ? <>Pas en <span style={{color: RED}}>concurrence</span></> : <>Trois facettes d'une <span style={{color: TEAL}}>même pièce</span></>}</Title>
      {t < 284.4 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 284.0, 284.4)}}>
          <Abs x={260} y={640}><Tripod w={560} lift={0.75} crank={t * 1.5} glow={ats.map((a) => pop(t, a))} /></Abs>
          {QSE.map((d, k) => t > ats[k] && <Abs key={k} x={[70, 700, 390][k]} y={[1380, 1380, 1460][k]}><Chip c={d.c} q={spring(t, ats[k])} size={28}>{d.l}</Chip></Abs>)}
        </AbsoluteFill>
      )}
      {t > 284.0 && t < 286.9 && (() => {
        const al = prog(t, 285.88, 286.4, easeInOut);
        return (
          <AbsoluteFill style={{opacity: win(t, 284.0, 286.9, 0.3)}}>
            {QSE.map((d, k) => (
              <Abs key={k} x={480 + (k - 1) * 280} y={800} w={120} h={320} style={{transform: `rotate(${lerp([-100, 165, 70][k], 0, al)}deg)`, transformOrigin: '50% 50%'}}>
                <svg width={120} height={320} viewBox="0 0 120 320"><path d="M60 0 L120 100 L80 100 L80 320 L40 320 L40 100 L0 100 Z" fill={d.c} /></svg>
              </Abs>
            ))}
            <Abs x={0} y={1300} w={1080} style={{textAlign: 'center'}}><T size={110} color={al > 0.5 ? TEAL : RED}>{al > 0.5 ? '=' : '≠'}</T></Abs>
          </AbsoluteFill>
        );
      })()}
      {t > 286.5 && <Coin />}
    </AbsoluteFill>
  );
};
const Finale: React.FC = () => {
  const t = useT();
  const lift = lerp(0.75, 1, prog(t, 294.7, 295.9, easeInOut));
  const crank = t * 1.5 + prog(t, 294.7, 295.9) * 12;
  return (
    <AbsoluteFill style={{opacity: pop(t, 291.65)}}>
      {t < 297.1 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 296.7, 297.1)}}>
          <Title>{t < 294.6 ? <>Plus qu'une <span style={{color: DIM}}>optimisation</span></> : <>Une <span style={{color: TEAL}}>évolution culturelle</span></>}</Title>
          {t > 295.9 && <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><g transform={`rotate(${(t - 295.9) * 30} 540 818)`} opacity={pop(t, 295.94)}>{Array.from({length: 12}, (_, k) => <path key={k} d={`M540 818 L${pt(540, 818, 520, k * 30 - 5)[0]} ${pt(540, 818, 520, k * 30 - 5)[1]} L${pt(540, 818, 520, k * 30 + 5)[0]} ${pt(540, 818, 520, k * 30 + 5)[1]} Z`} fill="rgba(25,195,177,0.16)" />)}</g></svg>}
          <Abs x={260} y={640}><Tripod w={560} lift={lift} crank={crank} glow={[0.5, 0.5, 0.5]} /></Abs>
          {t > 291.7 && <Abs x={60} y={1420}><Chip c="#55696D" dark={false} q={spring(t, 291.8)} size={28} style={{textDecoration: t > 294.4 ? 'line-through' : 'none', textDecorationThickness: 4}}>Optimisation technique</Chip></Abs>}
          {t > 295.9 && <Abs x={540} y={1420}><Chip c={TEAL} q={spring(t, 295.94)} size={28}>Évolution culturelle</Chip></Abs>}
        </AbsoluteFill>
      )}
      {t > 296.7 && (
        <AbsoluteFill style={{opacity: pop(t, 296.8)}}>
          <Title>{t < 299.1 ? <>La question <span style={{color: DIM}}>n'est plus</span>…</> : <>… mais à quelle <span style={{color: GOLD}}>vitesse</span></>}</Title>
          {t < 299.4 && (
            <Row y={760}>
              <div style={{position: 'relative', transform: `scale(${spring(t, 297.0)})`, opacity: 1 - prog(t, 299.1, 299.4)}}>
                <Chip c={LIGHT} size={44}>Faut-il intégrer ?</Chip>
                {t > 298.9 && <div style={{position: 'absolute', left: -10, right: -10, top: '50%', height: 10, background: RED, transform: `scaleX(${prog(t, 298.92, 299.2)})`, transformOrigin: '0 50%'}} />}
              </div>
            </Row>
          )}
          {t > 299.1 && Array.from({length: 16}, (_, k) => {
            const y = 620 + random(`sl${k}`) * 860;
            const x = 1200 - (((t - 299.1) * (2200 + random(`sv${k}`) * 1200) + random(`so${k}`) * 1000) % 1600);
            return <div key={k} style={{position: 'absolute', left: x, top: y, width: 260 + random(`sw${k}`) * 200, height: 6, borderRadius: 3, background: `linear-gradient(90deg, ${GOLD}, transparent)`, opacity: 0.85}} />;
          })}
          {t > 299.1 && (
            <Abs x={0} y={820} w={1080} style={{textAlign: 'center', transform: `skewX(-12deg) scale(${spring(t, 299.18)})`}}>
              <T size={140} color={GOLD} style={{letterSpacing: -3}}>À QUELLE</T>
              <T size={140} color={GOLD} style={{letterSpacing: -3}}>VITESSE ?</T>
            </Abs>
          )}
          {t > 301.3 && (
            <Abs x={90} y={1150} style={{transform: `scale(${spring(t, 301.36)})`, transformOrigin: '0 100%'}}>
              <div style={{position: 'absolute', left: 0, top: 0, width: 10, height: 230, background: '#DDE7E8', borderRadius: 5}} />
              {Array.from({length: 24}, (_, k) => {
                const i = k % 6, j = Math.floor(k / 6);
                return <div key={k} style={{position: 'absolute', left: 10 + i * 34, top: j * 34 + Math.sin(t * 8 - i * 0.8) * 6 * (i / 5), width: 34, height: 34, background: (i + j) % 2 ? '#111' : '#fff'}} />;
              })}
            </Abs>
          )}
          {t > 301.3 && <Row y={1420}><Chip c={TEAL} q={spring(t, 301.36)} size={32}>Pour rester dans la course</Chip></Row>}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
const P4: React.FC = () => {
  const t = useT();
  if (t < 257.4) return null;
  return (
    <AbsoluteFill style={{opacity: pop(t, 257.5, 0.5)}}>
      {t < 279.6 && <Storm />}
      {t > 279.2 && t < 291.9 && <Essentiel />}
      {t > 291.6 && <Finale />}
    </AbsoluteFill>
  );
};

/* ─────────── En-tête, fond, sortie ─────────── */
const Header: React.FC = () => {
  const t = useT();
  const p = PT.find((x) => t >= x.at + WIPE - 0.3 && t < x.end);
  return (
    <AbsoluteFill style={{zIndex: 40, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: '50%', top: 95, transform: 'translateX(-50%)', background: '#fff', borderRadius: 26, padding: '10px 28px'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div>
      {t > 2.5 && t < 74.4 && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 236, display: 'flex', justifyContent: 'center', opacity: pop(t, 2.5) * (1 - prog(t, 74.0, 74.4))}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '8px 24px', borderRadius: 40, background: 'rgba(255,255,255,0.08)', border: `2px solid ${TEAL}`}}><F n="engrenage" size={40} /><T size={34}>Le Management <span style={{color: TEAL}}>Intégré</span></T></div>
        </div>
      )}
      {p && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 214, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, opacity: pop(t, p.at + WIPE - 0.3) * (1 - prog(t, p.end - 0.3, p.end))}}>
          <Tripod w={66} lift={p.n / 4} crank={t * 2} />
          <div style={{padding: '8px 22px', borderRadius: 40, background: 'rgba(255,255,255,0.08)', border: `2px solid ${p.c}`}}><T size={32}>{p.n}. {p.l}</T></div>
        </div>
      )}
    </AbsoluteFill>
  );
};
const Bg: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill style={{background: BG}}>
      <AbsoluteFill style={{backgroundImage: 'linear-gradient(rgba(25,195,177,0.07) 2px, transparent 2px), linear-gradient(90deg, rgba(25,195,177,0.07) 2px, transparent 2px)', backgroundSize: '90px 90px', backgroundPosition: `0 ${t * 6}px`}} />
      <AbsoluteFill style={{backgroundImage: 'linear-gradient(rgba(25,195,177,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(25,195,177,0.035) 1px, transparent 1px)', backgroundSize: '18px 18px', backgroundPosition: `0 ${t * 6}px`}} />
      <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 42%, rgba(25,195,177,0.12), transparent 62%)'}} />
    </AbsoluteFill>
  );
};
const OutroFade: React.FC = () => {
  const t = useT();
  return <AbsoluteFill style={{background: 'linear-gradient(180deg, #FBFAF6 0%, #F1EDE3 100%)', zIndex: 80, opacity: prog(t, OUTRO_AT - 0.5, OUTRO_AT)}} />;
};

const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...[5.0, 5.76, 6.64].map((at) => ({at, s: 'sfx/pop', v: 0.3})), {at: 7.6, s: 'sfx/swish', v: 0.35}, {at: 8.1, s: 'bass-hit', v: 0.32}, {at: 8.45, s: 'sfx/rise', v: 0.22},
  ...Array.from({length: 12}, (_, k) => ({at: 9.0 + k * 0.37, s: 'tick', v: 0.12})), {at: 13.5, s: 'sfx/thud', v: 0.35}, {at: 13.65, s: 'sfx/pop', v: 0.3}, ...Array.from({length: 3}, (_, k) => ({at: 13.8 + k * 0.31, s: 'sfx/click', v: 0.22})), {at: 13.95, s: 'deep-hit', v: 0.25},
  ...[14.6, 17.8, 21.2].flatMap((at) => [{at, s: 'sfx/whoosh', v: 0.3}, {at: at + 0.4, s: 'sfx/thud', v: 0.22}]),
  ...Array.from({length: 5}, (_, k) => ({at: 24.6 + k * 0.5, s: 'sfx/swish', v: 0.14})), ...Array.from({length: 4}, (_, k) => ({at: 25.4 + k * 0.5, s: 'sfx/click', v: 0.16})), {at: 26.62, s: 'deep-hit', v: 0.32}, {at: 28.5, s: 'sfx/whoosh', v: 0.45},
  {at: 29.8, s: 'sfx/pop', v: 0.25}, ...[33.1, 33.25, 33.4].map((at) => ({at, s: 'sfx/pop', v: 0.18})), ...[35.0, 35.25, 35.5].map((at) => ({at, s: 'sfx/pop', v: 0.25})), {at: 37.8, s: 'sfx/click', v: 0.3}, {at: 38.2, s: 'deep-hit', v: 0.25}, {at: 38.4, s: 'deep-hit', v: 0.2},
  {at: 39.3, s: 'page', v: 0.3}, {at: 40.3, s: 'page', v: 0.22}, {at: 40.55, s: 'page', v: 0.18}, ...TOASTS.map((_, k) => ({at: 40.85 + k * 0.32, s: 'notification', v: 0.26})), {at: 43.0, s: 'tension', v: 0.15, dur: 3}, {at: 43.1, s: 'sfx/swish', v: 0.22},
  {at: 43.98, s: 'sfx/pop', v: 0.25}, ...Array.from({length: 4}, (_, k) => ({at: 44.2 + k * 0.35, s: 'tick', v: 0.14})), ...Array.from({length: 7}, (_, k) => ({at: 46.02 + k * 0.1, s: 'tick', v: 0.2})),
  {at: 47.0, s: 'sfx/pop', v: 0.3}, ...Array.from({length: 20}, (_, k) => ({at: 47.6 + k * 0.135, s: 'tick', v: 0.1})), {at: 52.94, s: 'notification', v: 0.35}, {at: 53.4, s: 'sfx/click', v: 0.5}, {at: 53.5, s: 'bass-hit', v: 0.45},
  {at: 54.2, s: 'soft-whoosh', v: 0.35, dur: 1.5}, ...[55.9, 56.08, 56.26].map((at) => ({at, s: 'sfx/thud', v: 0.3})), {at: 58.1, s: 'sfx/pop', v: 0.25}, {at: 59.18, s: 'sfx/pop', v: 0.3}, {at: 59.3, s: 'sfx/click', v: 0.5}, {at: 59.35, s: 'validation', v: 0.3},
  {at: 61.2, s: 'sfx/whoosh', v: 0.25}, ...[62.38, 62.5, 62.62].map((at) => ({at, s: 'sfx/pop', v: 0.14})), {at: 63.85, s: 'sfx/swish', v: 0.35}, ...Array.from({length: 6}, (_, k) => ({at: 64.0 + k * 0.4, s: 'stylo', v: 0.18})), {at: 65.18, s: 'sfx/ding', v: 0.25},
  {at: 67.2, s: 'sfx/pop', v: 0.3}, ...[68.76, 69.52, 70.4].map((at) => ({at, s: 'sfx/rise', v: 0.2})), {at: 71.9, s: 'bass-hit', v: 0.35}, {at: 73.08, s: 'validation', v: 0.32},
  ...PT.flatMap((p) => [{at: p.at, s: 'sfx/swish', v: 0.4}, ...[0, 1, 2, 3].map((i) => ({at: p.at + i * 0.2, s: 'sfx/click', v: 0.32})), {at: p.at + 0.8, s: 'bass-hit', v: 0.3}, {at: p.at + WIPE - 0.78, s: 'sfx/swish', v: 0.35}, {at: p.at + WIPE - 0.05, s: 'sfx/click', v: 0.4}]),
  {at: 76.9, s: 'sfx/pop', v: 0.25}, {at: 80.98, s: 'sfx/pop', v: 0.2}, {at: 82.4, s: 'sfx/whoosh', v: 0.3}, ...[83.9, 84.25, 84.6].map((at) => ({at, s: 'sfx/thud', v: 0.35})), {at: 86.6, s: 'cadenas', v: 0.3}, ...Array.from({length: 8}, (_, k) => ({at: 87.6 + k * 0.25, s: 'tick', v: 0.12})),
  ...TAGS.flatMap((g) => [{at: g.at, s: 'sfx/whoosh', v: 0.28}, {at: g.at + 0.1, s: 'sfx/pop', v: 0.2}, {at: g.iso, s: 'sfx/ding', v: 0.22}]),
  {at: 110.14, s: 'notification', v: 0.2}, {at: 110.34, s: 'notification', v: 0.16}, {at: 111.5, s: 'sfx/swish', v: 0.35}, {at: 112.6, s: 'validation', v: 0.3}, {at: 114.26, s: 'sfx/pop', v: 0.25}, {at: 115.46, s: 'sfx/ding', v: 0.3},
  {at: 116.3, s: 'sfx/pop', v: 0.3}, ...PDCA_AT.map((at) => ({at, s: 'sfx/click', v: 0.45})), {at: 122.9, s: 'sfx/whoosh', v: 0.3}, ...PDCA_STEP.flatMap((at) => [{at, s: 'tick', v: 0.3}, {at: at + 0.05, s: 'sfx/pop', v: 0.18}]), {at: 129.45, s: 'sfx/ding', v: 0.25},
  {at: 131.0, s: 'sfx/pop', v: 0.25}, {at: 132.44, s: 'sfx/pop', v: 0.2}, ...[134.24, 135.16, 135.76].map((at) => ({at, s: 'sfx/pop', v: 0.3})), {at: 137.2, s: 'sfx/swish', v: 0.3}, {at: 137.62, s: 'deep-hit', v: 0.35}, {at: 138.52, s: 'deep-hit', v: 0.3},
  {at: 142.95, s: 'bass-hit', v: 0.4}, {at: 143.3, s: 'sfx/pop', v: 0.2}, {at: 143.76, s: 'sfx/whoosh', v: 0.2}, {at: 147.33, s: 'sfx/whoosh', v: 0.3}, {at: 150.66, s: 'sfx/ding', v: 0.2}, {at: 151.98, s: 'sfx/ding', v: 0.2}, {at: 156.34, s: 'sfx/pop', v: 0.25},
  ...ROWS.flatMap(([, , , at, flip]) => [{at, s: 'sfx/pop', v: 0.2}, {at: flip, s: 'sfx/click', v: 0.5}, ...[0.1, 0.2, 0.3].map((d) => ({at: flip + d, s: 'tick', v: 0.14})), {at: flip + 0.55, s: 'validation', v: 0.2}]), {at: 174.82, s: 'tension', v: 0.12, dur: 1.5}, {at: 179.14, s: 'bass-hit', v: 0.4}, {at: 179.2, s: 'validation', v: 0.32},
  {at: 184.6, s: 'sfx/pop', v: 0.25}, {at: 185.06, s: 'sfx/ding', v: 0.2}, {at: 185.5, s: 'sfx/swish', v: 0.35}, {at: 186.2, s: 'sfx/thud', v: 0.45},
  {at: 187.6, s: 'sfx/whoosh', v: 0.3}, {at: 189.3, s: 'sfx/ding', v: 0.2}, {at: 189.9, s: 'sfx/ding', v: 0.2}, {at: 190.9, s: 'sfx/ding', v: 0.2}, {at: 191.9, s: 'sfx/whoosh', v: 0.45},
  {at: 193.5, s: 'sfx/pop', v: 0.25}, {at: 195.66, s: 'soft-whoosh', v: 0.3, dur: 1.5}, ...[197.1, 197.22, 197.34].map((at) => ({at, s: 'page', v: 0.22})), {at: 197.9, s: 'deep-hit', v: 0.2}, {at: 198.05, s: 'deep-hit', v: 0.18},
  {at: 198.9, s: 'sfx/swish', v: 0.3}, ...[199.3, 199.5, 199.7].map((at) => ({at, s: 'stylo', v: 0.14})), {at: 200.1, s: 'sfx/pop', v: 0.22}, {at: 200.58, s: 'sfx/pop', v: 0.22}, {at: 202.7, s: 'sfx/pop', v: 0.22}, {at: 203.82, s: 'sfx/pop', v: 0.22},
  ...Array.from({length: 8}, (_, k) => ({at: 205.7 + k * 0.11, s: 'tick', v: 0.15})), {at: 207.78, s: 'stylo', v: 0.3}, {at: 208.74, s: 'stylo', v: 0.3}, {at: 209.0, s: 'sfx/ding', v: 0.25}, {at: 209.72, s: 'notification', v: 0.35}, {at: 210.0, s: 'validation', v: 0.35}, {at: 210.05, s: 'sfx/pop', v: 0.2},
  {at: 211.9, s: 'sfx/pop', v: 0.25}, {at: 214.38, s: 'soft-whoosh', v: 0.4, dur: 1.5}, {at: 217.06, s: 'sfx/thud', v: 0.45}, ...[218.42, 218.54, 218.66].map((at) => ({at, s: 'sfx/pop', v: 0.2})), ...Array.from({length: 4}, (_, k) => ({at: 220.1 + k * 0.25, s: 'sfx/swish', v: 0.18})), ...Array.from({length: 6}, (_, k) => ({at: 220.4 + k * 0.08, s: 'tick', v: 0.14})),
  {at: 221.75, s: 'sfx/pop', v: 0.25}, ...[225.0, 225.8, 227.12].map((at) => ({at, s: 'sfx/ding', v: 0.25})), ...[228.0, 228.4, 228.8, 229.2].map((at) => ({at, s: 'sfx/pop', v: 0.15})), {at: 229.85, s: 'sfx/whoosh', v: 0.25}, {at: 231.22, s: 'sfx/pop', v: 0.2}, ...[232.14, 232.22, 232.3, 232.38].map((at) => ({at, s: 'sfx/pop', v: 0.18})), {at: 233.46, s: 'validation', v: 0.3},
  {at: 234.4, s: 'sfx/rise', v: 0.25}, {at: 237.0, s: 'sfx/swish', v: 0.3}, {at: 238.5, s: 'validation', v: 0.35}, {at: 239.46, s: 'notification', v: 0.25}, ...[242.22, 243.02, 243.98].map((at) => ({at, s: 'sfx/ding', v: 0.25})), {at: 244.9, s: 'sfx/pop', v: 0.25}, {at: 246.02, s: 'sfx/pop', v: 0.25},
  {at: 247.3, s: 'sfx/pop', v: 0.3}, {at: 247.5, s: 'soft-whoosh', v: 0.3, dur: 1}, {at: 248.42, s: 'sfx/ding', v: 0.25}, {at: 249.4, s: 'sfx/pop', v: 0.25}, {at: 252.0, s: 'sfx/swish', v: 0.3}, ...[252.14, 253.54, 254.3].flatMap((at) => [{at, s: 'sfx/click', v: 0.4}, {at: at + 0.1, s: 'validation', v: 0.2}]),
  {at: 260.85, s: 'deep-hit', v: 0.45}, ...CLOUDS.map(([, , at]) => ({at, s: 'deep-hit', v: 0.22})), {at: 264.5, s: 'soft-whoosh', v: 0.45, dur: 1.4}, ...GUYS.slice(0, 3).flatMap(([, at]) => [{at, s: 'cadenas', v: 0.3}, {at: at + 0.5, s: 'sfx/thud', v: 0.2}]), {at: 275.3, s: 'sfx/click', v: 0.2},
  {at: 268.78, s: 'soft-whoosh', v: 0.3, dur: 1.5}, {at: 272.3, s: 'deep-hit', v: 0.35}, {at: 276.34, s: 'sfx/rise', v: 0.3}, {at: 277.62, s: 'sfx/ding', v: 0.25},
  {at: 279.3, s: 'sfx/whoosh', v: 0.25}, ...[282.12, 282.68, 283.44].map((at) => ({at, s: 'sfx/ding', v: 0.22})), {at: 284.1, s: 'sfx/pop', v: 0.2}, {at: 285.88, s: 'sfx/swish', v: 0.35}, {at: 286.3, s: 'validation', v: 0.3}, {at: 286.6, s: 'sfx/pop', v: 0.25},
  {at: 287.5, s: 'sfx/rise', v: 0.25}, ...Array.from({length: 6}, (_, k) => ({at: 287.6 + k * 0.28, s: 'tick', v: 0.15})), {at: 289.3, s: 'sfx/thud', v: 0.35}, {at: 289.35, s: 'validation', v: 0.25}, {at: 290.16, s: 'sfx/pop', v: 0.2},
  {at: 291.8, s: 'sfx/pop', v: 0.2}, {at: 294.4, s: 'stylo', v: 0.25}, ...Array.from({length: 10}, (_, k) => ({at: 294.7 + k * 0.12, s: 'tick', v: 0.18})), {at: 295.94, s: 'bass-hit', v: 0.4}, {at: 296.0, s: 'validation', v: 0.32},
  {at: 297.0, s: 'sfx/pop', v: 0.25}, {at: 298.92, s: 'stylo', v: 0.3}, {at: 299.1, s: 'sfx/whoosh', v: 0.5}, {at: 299.18, s: 'bass-hit', v: 0.35}, {at: 301.36, s: 'validation', v: 0.35},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const MgmtIntegre: React.FC = () => (
  <AbsoluteFill style={{background: BG}}>
    <Bg />
    <Gate from={2.0} to={30.0}><IntroA /></Gate>
    <Gate from={29.5} to={53.8}><IntroB /></Gate>
    <Gate from={53.4} to={74.7}><IntroC /></Gate>
    <Gate from={76.6} to={139.0}><P1 /></Gate>
    <Gate from={141.2} to={182.2}><P2 /></Gate>
    <Gate from={184.4} to={255.2}><P3 /></Gate>
    <Gate from={257.4} to={OUTRO_AT}><P4 /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    {PT.map((p) => <Gate key={p.n} from={p.at} to={p.at + WIPE + 0.1}><PdcaWipe p={p} /></Gate>)}
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT - 0.5} to={999}><OutroFade /></Gate>
    <Gate from={OUTRO_AT} to={999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.3} to={OUTRO_AT}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-management-integre-origine.m4a')} trimAfter={s(302.25)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);
