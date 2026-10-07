import {AbsoluteFill, Audio, Img, staticFile} from 'remotion';
import {easeInOut, easeOut, prog, useT} from '../anim';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {colors, handFont, s, sansFont} from '../theme';
import {P, Rescuer, Victim, victim} from './Scene';
import {NARR_END, ORDER, SEG} from './timeline';

const INTRO_END = 4.6;
const OUTRO_AT = NARR_END + 0.1;
export const PLS_FRAMES = s(OUTRO_AT + 6.2);
const RED = '#D9443A';
const STAGE_W = 1280;
const H = 1080;
const S = SEG;

const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const lp = (a: P, b: P, k: number): P => ({x: lerp(a.x, b.x, k), y: lerp(a.y, b.y, k)});
const add = (a: P, dx: number, dy: number): P => ({x: a.x + dx, y: a.y + dy});
const on = (t: number, a: number, b = Infinity) => prog(t, a, a + 0.35, easeOut) * (1 - prog(t, b - 0.3, b));

/* ─────────────── Caméra (cadrages pédagogiques) ─────────────── */
const CAM: [number, number, number, number][] = [
  [0, 640, 620, 0.95],
  [S.p2.start, 900, 600, 1.35],
  [S.p3.start, 470, 640, 1.3],
  [S.p4.start, 420, 600, 1.4],
  [S.p6.start, 620, 680, 1.0],
  [S.t3.start, 620, 660, 1.04],
  [S.t4.start, 400, 650, 1.38],
  [S.t5.start, 680, 640, 1.0],
  [S.s2.start, 740, 720, 1.22],
  [S.s3.start, 380, 680, 1.5],
  [S.s4.start, 420, 700, 1.3],
  [S.s5.start, 640, 660, 1.0],
  [S.k0.start, 640, 640, 0.95],
];
const camera = (t: number) => {
  let c = CAM[0];
  let prev = CAM[0];
  for (const k of CAM) if (t >= k[0]) { prev = c; c = k; }
  const m = prog(t, c[0], c[0] + 1.2, easeInOut);
  return {x: lerp(prev[1], c[1], m), y: lerp(prev[2], c[2], m), z: lerp(prev[3], c[3], m)};
};

/* ─────────────── Secouriste 2 : positions et mains ─────────────── */
type Key = [number, P, (t: number) => [P, P]];
const rest = (p: P): [P, P] => [add(p, -70, -10), add(p, 70, -10)];
const PILLOW_REST: P = {x: 250, y: 830};
const pillowPos = (t: number, head: P): P | null => {
  if (t < S.p1.start + 0.8) return null;
  const set = prog(t, S.p1.start + 1.0, S.p1.start + 3.2, easeInOut);
  const slide = prog(t, S.s4.start + 0.8, S.s4.start + 2.8, easeInOut);
  const held = lp({x: 470, y: 760}, PILLOW_REST, set);
  return lp(held, {x: head.x - 6, y: head.y + 22}, slide);
};

const S2_KEYS = (t: number): Key[] => {
  const r = victim(t);
  return [
    [0, {x: 700, y: 1250}, () => rest({x: 700, y: 1210})],
    [S.r3.start, {x: 700, y: 870}, () => rest({x: 700, y: 830})],
    [S.p1.start, {x: 520, y: 880}, (tt) => { const p = pillowPos(tt, r.head) ?? {x: 470, y: 760}; return [add(p, -55, 20), add(p, 55, 20)]; }],
    [S.p1.start + 3.6, {x: 560, y: 900}, () => rest({x: 560, y: 860})],
    [S.p2.start, {x: 880, y: 830}, () => [add(r.kF, 10, 10), add(r.fN, -10, 10)]],
    [S.p3.start, {x: 560, y: 900}, () => [r.eN, add(r.hN, 10, 0)]],
    [S.p4.start, {x: 560, y: 900}, () => [add(r.eF, 0, 10), add(r.hF, 20, 10)]],
    [S.p5.start + 1.0, {x: 560, y: 900}, () => rest({x: 560, y: 860})],
    [S.p6.start + 0.6, {x: 560, y: 930}, () => rest({x: 560, y: 890})],
    [S.p7.start, {x: 560, y: 930}, () => [r.sF, r.pF]],
    [S.s1.start + 0.6, {x: 560, y: 930}, () => [add(r.pF, -30, 0), add(r.pF, 30, 0)]],
    [S.s2.start + 0.8, {x: 600, y: 940}, () => [add(r.pF, -20, 10), add(r.kF, 0, -10)]],
    [S.s3.start, {x: 600, y: 940}, () => [add(r.pF, -20, 10), add(r.kF, 0, -10)]],
    [S.s4.start + 0.4, {x: 520, y: 940}, (tt) => { const p = pillowPos(tt, r.head) ?? PILLOW_REST; return [add(p, -40, 40), add(p, 40, 45)]; }],
    [S.s4.start + 3.2, {x: 600, y: 940}, () => [add(r.pF, -20, 10), add(r.kF, 0, -10)]],
  ];
};
const s2State = (t: number) => {
  const keys = S2_KEYS(t);
  let i = 0;
  for (let k = 0; k < keys.length; k++) if (t >= keys[k][0]) i = k;
  const cur = keys[i];
  const prev = keys[Math.max(0, i - 1)];
  const m = prog(t, cur[0], cur[0] + 0.8, easeInOut);
  const hp = prev[2](t);
  const hc = cur[2](t);
  return {pos: lp(prev[1], cur[1], m), hands: [lp(hp[0], hc[0], m), lp(hp[1], hc[1], m)] as [P, P]};
};

/* ─────────────── Annotations (repère de la scène) ─────────────── */
const Tag: React.FC<{x: number; y: number; text: string; o: number; color?: string; dark?: boolean}> = ({x, y, text, o, color = colors.green, dark}) => {
  if (o <= 0) return null;
  const w = text.length * 16 + 40;
  return (
    <g opacity={o} transform={`translate(${x} ${y}) scale(${0.85 + 0.15 * o})`}>
      <rect x={-w / 2} y={-26} width={w} height={52} rx={26} fill={dark ? colors.navy : '#fff'} stroke={color} strokeWidth={4} />
      <text x={0} y={9} textAnchor="middle" fontFamily="Montserrat" fontWeight={800} fontSize={26} fill={dark ? '#fff' : colors.navy}>{text}</text>
    </g>
  );
};
const Hand: React.FC<{x: number; y: number; text: string; o: number; color?: string; size?: number; anchor?: 'start' | 'middle' | 'end'}> = ({x, y, text, o, color = colors.navy, size = 40, anchor = 'middle'}) =>
  o > 0 ? <text x={x} y={y} textAnchor={anchor} fontFamily="Patrick Hand" fontSize={size} fill={color} opacity={o}>{text}</text> : null;
const Ring: React.FC<{c: P; r: number; o: number; color?: string}> = ({c, r, o, color = colors.green}) =>
  o > 0 ? <circle cx={c.x} cy={c.y} r={r * (0.7 + 0.3 * o)} fill="none" stroke={color} strokeWidth={7} opacity={o} strokeDasharray={`${2 * Math.PI * r * Math.min(1, o * 1.4)} 9999`} /> : null;
const Arrow: React.FC<{d: string; o: number; draw: number; color?: string; w?: number}> = ({d, o, draw, color = colors.green, w = 8}) =>
  o > 0 ? <path d={d} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={`${draw} 1`} markerEnd={draw > 0.97 ? `url(#arrow-${color === RED ? 'r' : 'g'})` : undefined} opacity={o} /> : null;

const Annotations: React.FC<{t: number}> = ({t}) => {
  const r = victim(t);
  const s2 = s2State(t);
  const sh = r.sN;
  const bubbleWords: [string, number][] = [['Attention…', S.t2.start], ['Pour tourner…', S.t2.start + 0.55], ['Tournez !', S.t2.start + 1.15]];
  const word = [...bubbleWords].reverse().find(([, a]) => t >= a);
  return (
    <g>
      {/* rôles */}
      <Tag x={175} y={r.head.y - 175} text="SECOURISTE 1" o={on(t, S.r1.start + 0.3, S.p0.start)} dark />
      <Ring c={r.head} r={95} o={on(t, S.r2.start, S.r3.start + 1)} />
      <Hand x={470} y={r.head.y - 110} text="maintien de la tête" o={on(t, S.r2.start + 0.3, S.r3.start + 1)} color={colors.green} />
      <Tag x={s2.pos.x} y={s2.pos.y + 140} text="SECOURISTE 2" o={on(t, S.r3.start + 0.6, S.p0.start + 0.5)} dark />
      {/* préparation */}
      <Tag x={PILLOW_REST.x} y={PILLOW_REST.y + 85} text="Coussin" o={on(t, S.p1.start + 3.0, S.p2.start)} />
      <Arrow d="M1110 440 L1110 505" o={on(t, S.p2.start + 0.4, S.p3.start)} draw={prog(t, S.p2.start + 0.4, S.p2.start + 1.0)} />
      <Arrow d="M1110 650 L1110 585" o={on(t, S.p2.start + 0.4, S.p3.start)} draw={prog(t, S.p2.start + 0.4, S.p2.start + 1.0)} />
      <Hand x={1110} y={410} text="dans l'axe" o={on(t, S.p2.start + 1.2, S.p3.start)} />
      {(() => {
        const o = on(t, S.p3.start + 2.2, S.p4.start + 0.5);
        const R = 70;
        return o > 0 ? (
          <g opacity={o}>
            <path d={`M${sh.x + R} ${sh.y} A${R} ${R} 0 0 1 ${sh.x} ${sh.y + R}`} fill="none" stroke={colors.green} strokeWidth={7} />
            <rect x={sh.x + 22} y={sh.y + 22} width={22} height={22} fill="none" stroke={colors.green} strokeWidth={4} />
            <text x={sh.x + 88} y={sh.y + 82} fontFamily="Montserrat" fontWeight={900} fontSize={40} fill={colors.green}>90°</text>
          </g>
        ) : null;
      })()}
      <Hand x={250} y={815} text="paume vers le haut" o={on(t, S.p3.start + 3.0, S.p4.start + 0.5)} color={colors.green} size={38} />
      <Arrow d="M640 400 C 560 330, 380 380, 350 560" o={on(t, S.p4.start + 0.3, S.p5.start + 0.5)} draw={prog(t, S.p4.start + 0.3, S.p4.start + 1.3)} />
      <Ring c={{x: 336, y: 592}} r={58} o={on(t, S.p5.start, S.p6.start + 0.5)} />
      <Hand x={300} y={445} text="sous la main de S1" o={on(t, S.p5.start + 0.4, S.p6.start + 0.5)} color={colors.green} size={36} />
      {(() => {
        const o = on(t, S.p6.start + 1.2, S.p7.start + 0.3);
        return o > 0 ? (
          <g opacity={o}>
            <line x1={720} y1={710} x2={720} y2={850} stroke={colors.ochre} strokeWidth={6} strokeDasharray="14 10" />
            <path d="M706 728 L720 708 L734 728 M706 832 L720 852 L734 832" stroke={colors.ochre} strokeWidth={6} fill="none" />
            <text x={745} y={790} fontFamily="Patrick Hand" fontSize={38} fill={colors.ochre}>assez loin</text>
          </g>
        ) : null;
      })()}
      <Ring c={r.sF} r={42} o={on(t, S.p7.start + 0.5, S.t1.start)} />
      <Ring c={r.pF} r={42} o={on(t, S.p7.start + 0.9, S.t1.start)} />
      <Hand x={r.sF.x} y={r.sF.y - 62} text="épaule" o={on(t, S.p7.start + 0.6, S.t1.start)} color={colors.green} size={34} />
      <Hand x={r.pF.x} y={r.pF.y - 62} text="hanche" o={on(t, S.p7.start + 1.0, S.t1.start)} color={colors.green} size={34} />
      {/* retournement */}
      {word && t < S.t3.start + 0.6 && (
        <g transform={`translate(175 ${r.head.y - 220})`} opacity={on(t, S.t2.start, S.t3.start + 0.6)}>
          <rect x={-150} y={-46} width={300} height={92} rx={30} fill="#fff" stroke={colors.navy} strokeWidth={5} />
          <path d="M-10 46 L0 80 L18 46" fill="#fff" stroke={colors.navy} strokeWidth={5} />
          <rect x={-14} y={40} width={36} height={10} fill="#fff" />
          <text x={0} y={14} textAnchor="middle" fontFamily="Montserrat" fontWeight={900} fontSize={word[0] === 'Tournez !' ? 44 : 34} fill={word[0] === 'Tournez !' ? colors.green : colors.navy}>{word[0]}</text>
        </g>
      )}
      <Arrow d="M520 380 C 760 330, 820 560, 640 760" o={on(t, S.t3.start + 0.8, S.t4.start)} draw={prog(t, S.t3.start + 0.8, S.t3.start + 2.0)} w={12} />
      <Hand x={860} y={390} text="d'un seul bloc" o={on(t, S.t3.start + 1.4, S.t4.start)} color={colors.green} size={44} />
      <Tag x={s2.pos.x + 230} y={s2.pos.y - 40} text="bras tendus" o={on(t, S.t3.start + 2.4, S.t4.start)} />
      {(() => {
        const o = on(t, S.t4.start + 0.6, S.t5.start);
        return o > 0 ? (
          <g opacity={o}>
            <line x1={r.head.x - 90} y1={r.head.y} x2={720} y2={r.torsoY} stroke={colors.green} strokeWidth={6} strokeDasharray="18 12" />
            <Tag x={r.head.x + 40} y={r.head.y + 150} text="tête dans l'axe : aucune torsion" o={1} color={RED} />
          </g>
        ) : null;
      })()}
      <Tag x={820} y={350} text="Variante : genou opposé fléchi" o={on(t, S.t5.start + 1.8, S.t5.start + 7.6)} color={colors.ochre} />
      {/* stabilisation */}
      {(() => {
        const o = on(t, S.s2.start + 3.0, S.s3.start + 0.5);
        const k = r.kF;
        return o > 0 ? (
          <g opacity={o}>
            <path d={`M${k.x - 60} ${k.y} A60 60 0 0 1 ${k.x} ${k.y - 60}`} fill="none" stroke={colors.green} strokeWidth={7} transform={`rotate(180 ${k.x} ${k.y})`} />
            <text x={k.x + 50} y={k.y + 70} fontFamily="Montserrat" fontWeight={900} fontSize={40} fill={colors.green}>90°</text>
          </g>
        ) : null;
      })()}
      <Ring c={{x: r.head.x + 14, y: r.head.y + 30}} r={52} o={on(t, S.s3.start + 0.4, S.s4.start)} />
      {(() => {
        const o = on(t, S.s3.start + 1.6, S.s4.start);
        const ph = t * 6;
        return o > 0 ? <path d={`M${r.head.x - 60} ${r.head.y + 120} ${Array.from({length: 9}, (_, i) => `Q ${r.head.x - 45 + i * 30} ${r.head.y + 120 + (i % 2 ? -1 : 1) * 18 * Math.sin(ph)} ${r.head.x - 30 + i * 30} ${r.head.y + 120}`).join(' ')}`} fill="none" stroke={colors.green} strokeWidth={5} opacity={o} /> : null;
      })()}
      <Hand x={r.head.x + 90} y={r.head.y + 185} text="elle respire" o={on(t, S.s3.start + 2.0, S.s4.start)} color={colors.green} size={38} />
      <Tag x={r.head.x - 20} y={r.head.y + 150} text="Coussin" o={on(t, S.s4.start + 2.4, S.s5.start)} />
      <Ring c={r.head} r={110} o={on(t, S.s5.start + 0.3, S.s6.start + 0.5)} />
    </g>
  );
};

/* ─────────────── Scène ─────────────── */
const Stage: React.FC = () => {
  const t = useT();
  const cam = camera(t);
  const r = victim(t);
  const s2 = s2State(t);
  const s1In = prog(t, S.r1.start - 0.4, S.r1.start + 0.8, easeOut);
  const s1Pos: P = {x: lerp(-120, 170, s1In), y: r.head.y};
  const s1Hands: [P, P] = [add(r.head, -14, -58), add(r.head, -14, 58)];
  const collar = prog(t, S.c4.start + 0.8, S.c4.start + 2.0, easeOut);
  const pillow = pillowPos(t, r.head);
  const lean = -26 * prog(t, S.t3.start + 2.2, S.t3.start + 4.5, easeInOut) * (1 - prog(t, S.t4.start, S.t4.start + 1));
  return (
    <svg width={STAGE_W} height={H} viewBox={`0 0 ${STAGE_W} ${H}`} style={{position: 'absolute', left: 0, top: 0}}>
      <defs>
        <filter id="blur"><feGaussianBlur stdDeviation="18" /></filter>
        <marker id="arrow-g" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill={colors.green} /></marker>
        <marker id="arrow-r" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill={RED} /></marker>
        <pattern id="floor" width="120" height="120" patternUnits="userSpaceOnUse"><rect width="120" height="120" fill="#F6F3EC" /><path d="M120 0 V120 M0 120 H120" stroke="#E7E1D3" strokeWidth={2} /></pattern>
      </defs>
      <g transform={`translate(${STAGE_W / 2} ${H / 2}) scale(${cam.z}) translate(${-cam.x} ${-cam.y})`}>
        <rect x={-1500} y={-1500} width={4500} height={4500} fill="url(#floor)" />
        <Victim r={r} collar={collar} pillow={pillow} />
        <Rescuer pos={s1Pos} facing={0} hands={s1Hands} skin="#3E2416" hair="ras" opacity={s1In} arm={[90, 84]} />
        <Rescuer pos={s2.pos} facing={-Math.PI / 2} hands={s2.hands} skin="#5C3620" hair="court" lean={lean} arm={[135, 130]} />
        <Annotations t={t} />
      </g>
    </svg>
  );
};

/* ─────────────── Panneau pédagogique ─────────────── */
type Phase = {id: string; label: string; from: number; to: number; color: string};
const PHASES: Phase[] = [
  {id: 'ctx', label: 'Situation', from: INTRO_END, to: S.r1.start - 0.4, color: '#6B7684'},
  {id: 'rol', label: 'Rôles', from: S.r1.start - 0.4, to: S.p0.start - 0.3, color: '#6B7684'},
  {id: 'p', label: '1  Préparation', from: S.p0.start - 0.3, to: S.t0.start - 0.3, color: colors.green},
  {id: 't', label: '2  Retournement', from: S.t0.start - 0.3, to: S.s0.start - 0.3, color: colors.navy},
  {id: 's', label: '3  Stabilisation', from: S.s0.start - 0.3, to: S.k0.start - 0.3, color: '#1A9E8F'},
];
const CARD: Record<string, [string, string]> = {
  c1: ['Inconsciente, respire, rachis suspect', 'danger'], c2: ['Fonctions vitales évaluées, alerte au 15', 'telephone'],
  c3: ['Régulation : PLS à deux secouristes', 'stethoscope'], c4: ['Collier cervical si indiqué', 'check'],
  r1: ['S1 à la tête : il guide la manœuvre', 'equipe'], r2: ['Maintien de la tête en permanence', 'main-levee'], r3: ['S2 réalise le retournement', 'equipe'],
  p1: ['Préparer le coussin', 'colis'], p2: ["Jambes rapprochées dans l'axe", 'pas'], p3: ['Bras à 90°, paume vers le haut', 'main-levee'],
  p4: ["Dos de la main contre l'oreille", 'main-levee'], p5: ['S1 maintient la main sous la sienne', 'poignee'], p6: ['À genoux, assez loin de la victime', 'equerre'],
  p7: ['Saisir la hanche et l\'épaule', 'poignee'],
  t1: ['S1 donne des ordres clairs', 'megaphone'], t2: ['« Attention… Pour tourner… Tournez ! »', 'megaphone'], t3: ["D'un seul bloc, bras tendus", 'repeter'],
  t4: ['Tête accompagnée, aucune torsion', 'stop'], t5: ['Variante : genou opposé fléchi', 'question'],
  s1: ["Main de l'épaule vers la hanche", 'poignee'], s2: ['Genou fléchi à angle droit', 'equerre'], s3: ['Bouche ouverte, respiration vérifiée', 'poumons'],
  s4: ['Coussin glissé sous la tête', 'colis'], s5: ['S1 reste en maintien de la tête', 'main-levee'], s6: ['Lésions : côté atteint au sol', 'pansement'],
};

const Panel: React.FC = () => {
  const t = useT();
  const cur = [...ORDER].reverse().find((id) => CARD[id] && t >= SEG[id].start - 0.2);
  const phase = PHASES.find((p) => t >= p.from && t < p.to);
  const phaseIds = phase ? ORDER.filter((id) => CARD[id] && SEG[id].start >= phase.from && SEG[id].start < phase.to) : [];
  const enter = cur ? prog(t, SEG[cur].start - 0.2, SEG[cur].start + 0.25, easeOut) : 0;
  return (
    <div style={{position: 'absolute', left: STAGE_W, top: 0, width: 1920 - STAGE_W, height: H, background: '#fff', boxShadow: '-12px 0 30px rgba(14,30,60,0.10)', padding: '40px 40px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 22}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
        <Img src={staticFile('promo/logo.png')} style={{height: 62}} />
      </div>
      <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: colors.navy, lineHeight: 1.15}}>Position latérale de sécurité<br /><span style={{color: colors.green}}>à deux secouristes</span></div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
        {PHASES.slice(2).map((p) => {
          const active = phase?.id === p.id;
          const done = t >= p.to;
          return (
            <div key={p.id} style={{display: 'flex', alignItems: 'center', gap: 12, padding: '12px 18px', borderRadius: 16, background: active ? p.color : done ? '#EEF6EF' : '#F2F4F7', color: active ? '#fff' : done ? colors.green : '#8A94A1', fontFamily: sansFont, fontWeight: 800, fontSize: 26, transform: `scale(${active ? 1.02 : 1})`}}>
              <span style={{flex: 1}}>{p.label}</span>
              {done && <span style={{fontSize: 28}}>✓</span>}
            </div>
          );
        })}
      </div>
      {cur && t < S.k0.start && (
        <div style={{marginTop: 6, borderRadius: 24, background: '#F6F8FB', border: `3px solid ${phase?.color ?? colors.navy}`, padding: '22px 22px', display: 'flex', alignItems: 'center', gap: 18, opacity: enter, transform: `translateY(${(1 - enter) * 24}px)`}}>
          <F n={CARD[cur][1]} size={78} />
          <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: colors.navy, lineHeight: 1.18}}>{CARD[cur][0]}</div>
        </div>
      )}
      <div style={{display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4}}>
        {t < S.k0.start && phaseIds.filter((id) => id !== cur && SEG[id].start < t).slice(-4).map((id) => (
          <div key={id} style={{display: 'flex', alignItems: 'center', gap: 10, fontFamily: sansFont, fontWeight: 600, fontSize: 22, color: '#6B7684'}}>
            <span style={{color: colors.green, fontWeight: 900}}>✓</span>{CARD[id][0]}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─────────────── Sous-titres ─────────────── */
const Subtitle: React.FC = () => {
  const t = useT();
  const id = ORDER.find((k) => t >= SEG[k].start - 0.1 && t < SEG[k].end + 0.25);
  if (!id || id === 'intro') return null;
  const seg = SEG[id];
  const o = prog(t, seg.start - 0.1, seg.start + 0.15) * (1 - prog(t, seg.end, seg.end + 0.25));
  return (
    <div style={{position: 'absolute', left: 60, width: STAGE_W - 120, bottom: 40, display: 'flex', justifyContent: 'center', opacity: o}}>
      <div style={{background: 'rgba(14,42,92,0.92)', color: '#fff', borderRadius: 18, padding: '14px 28px', fontFamily: sansFont, fontWeight: 600, fontSize: 32, lineHeight: 1.3, textAlign: 'center', maxWidth: 1080}}>{seg.text}</div>
    </div>
  );
};

/* ─────────────── À retenir ─────────────── */
const Recap: React.FC = () => {
  const t = useT();
  if (t < S.k0.start - 0.2) return null;
  const o = prog(t, S.k0.start - 0.2, S.k0.start + 0.4);
  const items: [string, number][] = [['Position stable', S.k1.start + 0.2], ['La plus latérale possible', S.k1.start + 1.6], ['Respiration et voies aériennes contrôlables', S.k2.start + 0.3], ['Écoulement des sécrétions favorisé', S.k3.start + 0.6]];
  return (
    <div style={{position: 'absolute', left: 0, top: 0, width: STAGE_W, height: H, background: `rgba(241,237,227,${0.82 * o})`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{width: 860, background: '#fff', borderRadius: 34, padding: '40px 48px', boxShadow: '0 30px 60px rgba(14,30,60,0.2)', borderTop: `12px solid ${colors.green}`, opacity: o, transform: `scale(${0.92 + 0.08 * o})`}}>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: colors.navy, marginBottom: 26}}>À <span style={{color: colors.green}}>retenir</span></div>
        {items.map(([l, at]) => {
          const p = prog(t, at, at + 0.35, easeOut);
          return (
            <div key={l} style={{display: 'flex', alignItems: 'center', gap: 20, marginBottom: 20, opacity: 0.25 + 0.75 * p}}>
              <div style={{width: 58, height: 58, borderRadius: '50%', background: p > 0.5 ? colors.green : '#D5D9DE', color: '#fff', fontSize: 34, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${0.6 + 0.4 * p})`, fontFamily: sansFont}}>✓</div>
              <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 38, color: colors.navy}}>{l}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ─────────────── Intro / écran final ─────────────── */
const Title: React.FC<{outro?: boolean}> = ({outro}) => {
  const t = useT();
  const a = outro ? OUTRO_AT : 0;
  const end = outro ? Infinity : INTRO_END;
  const o = prog(t, a, a + 0.5) * (outro ? 1 : 1 - prog(t, end - 0.45, end));
  if (o <= 0) return null;
  const l = prog(t, a + 0.1, a + 0.8, easeOut);
  const ti = prog(t, a + 0.7, a + 1.3, easeOut);
  const st = prog(t, a + 1.2, a + 1.8, easeOut);
  return (
    <AbsoluteFill style={{background: colors.paper, opacity: o, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 34}}>
      <AbsoluteFill style={{background: `radial-gradient(circle at 50% 40%, rgba(46,155,62,0.10), transparent 60%)`}} />
      <Img src={staticFile('promo/logo.png')} style={{height: outro ? 230 : 170, transform: `scale(${0.8 + 0.2 * l})`, opacity: l}} />
      {outro ? (
        <>
          <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 46, color: colors.navy, letterSpacing: 4, opacity: ti, transform: `translateY(${(1 - ti) * 20}px)`}}>Formation <span style={{color: colors.green}}>•</span> Normes <span style={{color: colors.green}}>•</span> QHSE <span style={{color: colors.green}}>•</span> HSE</div>
          <div style={{fontFamily: handFont, fontSize: 44, color: colors.green, opacity: st}}>Des normes aujourd'hui, un avenir durable demain</div>
        </>
      ) : (
        <>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 78, color: colors.navy, textAlign: 'center', lineHeight: 1.08, opacity: ti, transform: `translateY(${(1 - ti) * 30}px)`}}>Position latérale de sécurité<br /><span style={{color: colors.green}}>à deux secouristes</span></div>
          <div style={{display: 'flex', alignItems: 'center', gap: 14, background: colors.navy, color: '#fff', borderRadius: 40, padding: '12px 30px', fontFamily: sansFont, fontWeight: 800, fontSize: 30, letterSpacing: 3, opacity: st}}>SECOURISME • FORMATION</div>
        </>
      )}
    </AbsoluteFill>
  );
};

/* ─────────────── Son : bruitages discrets, voix prioritaire ─────────────── */
const CUES: Sfx[] = [
  {at: 0.15, s: 'bass-hit', v: 0.4},
  {at: 0.8, s: 'soft-whoosh', v: 0.35},
  {at: INTRO_END - 0.3, s: 'soft-whoosh', v: 0.35},
  {at: S.c2.start + 0.3, s: 'notification', v: 0.3},
  {at: S.c4.start + 0.8, s: 'sfx/click', v: 0.35},
  {at: S.r1.start - 0.3, s: 'soft-whoosh', v: 0.3},
  {at: S.r3.start, s: 'soft-whoosh', v: 0.3},
  ...[S.p0, S.t0, S.s0, S.k0].flatMap((g) => [{at: g.start - 0.35, s: 'soft-whoosh', v: 0.38}, {at: g.start, s: 'deep-hit', v: 0.32}]),
  ...ORDER.filter((id) => CARD[id]).map((id) => ({at: SEG[id].start - 0.15, s: 'page', v: 0.22})),
  {at: S.p2.start + 0.4, s: 'stylo', v: 0.3, dur: 0.5},
  {at: S.p3.start + 2.2, s: 'stylo', v: 0.3, dur: 0.6},
  {at: S.p4.start + 0.3, s: 'stylo', v: 0.3, dur: 0.8},
  {at: S.p5.start, s: 'tick', v: 0.35},
  {at: S.p7.start + 0.5, s: 'tick', v: 0.35},
  {at: S.p7.start + 0.9, s: 'tick', v: 0.35},
  {at: S.t3.start + 2.2, s: 'soft-whoosh', v: 0.42},
  {at: S.t3.start + 5.5, s: 'sfx/thud', v: 0.3},
  {at: S.t4.start + 0.6, s: 'sfx/ding', v: 0.3},
  {at: S.s2.start + 3.0, s: 'tick', v: 0.35},
  {at: S.s3.start + 0.4, s: 'tick', v: 0.35},
  {at: S.s4.start + 0.8, s: 'soft-whoosh', v: 0.3},
  ...[S.k1.start + 0.2, S.k1.start + 1.6, S.k2.start + 0.3, S.k3.start + 0.6].map((at) => ({at, s: 'validation', v: 0.32})),
  {at: OUTRO_AT, s: 'soft-whoosh', v: 0.4},
  {at: OUTRO_AT + 0.3, s: 'signature-marque', v: 0.5, dur: 3.2},
];

export const Pls: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill style={{background: colors.paper}}>
      {t >= INTRO_END - 0.5 && t < OUTRO_AT + 0.6 && (
        <>
          <Stage />
          <Recap />
          <Subtitle />
          <Panel />
        </>
      )}
      <Title />
      <Title outro />
      <Audio src={staticFile('pls/voix-off-pls.m4a')} />
      <SoundDesign cues={CUES} />
    </AbsoluteFill>
  );
};
