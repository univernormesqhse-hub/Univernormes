import React from 'react';
import {AbsoluteFill, Audio, staticFile} from 'remotion';
import {easeIn, easeInOut, easeOut, Gate, Kinetic, prog, useT} from '../anim';
import {Captions} from '../components/Captions';
import {Backdrop, Check, shadow} from '../identui/IdentUi';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {colors, sansFont, s} from '../theme';
import {captions} from './captions';

/**
 * « Les 9 principes généraux de prévention » — UI motion premium (skill video-promo-diagnostic-qhse), voix d'origine.
 * Techniques nouvelles dans la série : fil vertical « réseau social » qui s'enclenche carte par carte avec anneau
 * de progression n/9, et une micro-animation propre à chaque principe (détour, matrice de risques, vanne à la
 * source, établi ergonomique, mise à jour technique, machine à sous de substitution, diagramme de Gantt,
 * parapluie collectif vs casque individuel, consignes cochées), puis pyramide des 9 pastilles.
 */
const LOGO = 'promo/logo.png';
const RED = '#D9443A';
const ORANGE = '#E8892B';
const BLUE = '#2F6FB5';
const ECO = '#2E9B3E';
const STARTS = [4.08, 6.32, 10.48, 14.06, 17.1, 21.08, 26.94, 29.9, 37.32];
const END = 40.4;
const OUTRO_AT = 44.0;
export const HIERARCHIEPREV_FRAMES = s(OUTRO_AT + 3.8);
const TITLES = ['Éviter les risques', 'Évaluer les risques inévitables', 'Combattre les risques à la source', "Adapter le travail à l'homme", "Tenir compte de l'évolution technique", 'Remplacer le dangereux', 'Planifier la prévention', 'Protection collective d’abord', 'Donner les bonnes instructions'];
const TONES = [ECO, BLUE, RED, ORANGE, '#6B4FA0', '#C6A400', '#1F8A70', colors.navy, '#D45D8C'];

const Label: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 34, color = colors.navy, style}) => (
  <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: size, color, textTransform: 'uppercase', letterSpacing: -0.5, textAlign: 'center', lineHeight: 1.05, ...style}}>{children}</div>
);

/* ─────────── Micro-animations par principe (t local = secondes depuis l'arrivée de la carte) ─────────── */
const Viz: React.FC<{i: number; lt: number}> = ({i, lt}) => {
  const p = (a: number, b: number, e = easeInOut) => prog(lt, a, b, e);
  if (i === 0) {
    // détour : le chemin contourne le danger
    const d = p(0.4, 1.6);
    return (
      <svg width={700} height={460}>
        <path d="M60 400 L350 240 L640 60" stroke="#E3E6EB" strokeWidth={26} fill="none" strokeLinecap="round" strokeDasharray="2 40" />
        <path d="M60 400 C 100 200, 600 420, 640 60" stroke={ECO} strokeWidth={26} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={`${d} 1`} />
        <foreignObject x={290} y={170} width={130} height={130}><F n="danger" size={130} /></foreignObject>
      </svg>
    );
  }
  if (i === 1) {
    // matrice de risques : le point tombe dans sa case
    const drop = p(0.6, 1.4, easeOut);
    const cols = ['#7CC576', '#F5D547', '#F29B45', '#D9443A'];
    return (
      <div style={{position: 'relative', width: 520, height: 460}}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, width: 460, marginLeft: 60}}>
          {Array.from({length: 16}, (_, k) => { const r = 3 - Math.floor(k / 4), c = k % 4; return <div key={k} style={{height: 104, borderRadius: 12, background: cols[Math.min(3, Math.floor((r + c) / 1.6))], opacity: 0.85}} />; })}
        </div>
        <div style={{position: 'absolute', left: 60 + 2 * 116 + 32, top: -120 + drop * (1 * 112 + 150), width: 50, height: 50, borderRadius: 25, background: colors.navy, border: '6px solid #fff', boxShadow: shadow}} />
        <div style={{position: 'absolute', left: 0, top: 200, transform: 'rotate(-90deg)', fontFamily: sansFont, fontWeight: 800, fontSize: 22, color: '#8A93A0'}}>GRAVITÉ</div>
      </div>
    );
  }
  if (i === 2) {
    // vanne fermée à la source : les gouttes s'arrêtent
    const close = p(0.5, 1.8);
    return (
      <svg width={600} height={460}>
        <rect x={40} y={80} width={360} height={60} rx={20} fill="#8A93A0" />
        <rect x={360} y={80} width={60} height={160} rx={18} fill="#8A93A0" />
        <g transform={`translate(220 60) rotate(${close * 270})`}><circle r={60} fill="none" stroke={RED} strokeWidth={16} /><line x1={-60} y1={0} x2={60} y2={0} stroke={RED} strokeWidth={14} /><line x1={0} y1={-60} x2={0} y2={60} stroke={RED} strokeWidth={14} /></g>
        {Array.from({length: 5}, (_, k) => { const q = ((lt * 1.4 + k / 5) % 1); const on = q > close; return on ? <ellipse key={k} cx={390} cy={260 + q * 180} rx={12} ry={18} fill="#7CC4F0" /> : null; })}
        <rect x={300} y={420} width={190} height={20} rx={10} fill={close > 0.95 ? ECO : '#D5D9DE'} />
      </svg>
    );
  }
  if (i === 3) {
    // établi qui s'ajuste à la personne
    const up = p(0.5, 1.6);
    return (
      <div style={{position: 'relative', width: 620, height: 460}}>
        <div style={{position: 'absolute', left: 30, bottom: 0}}><F n="ouvrier-dark" size={300} /></div>
        <div style={{position: 'absolute', left: 300, bottom: 0, width: 280, height: 120 + up * 110}}>
          <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 30, borderRadius: 10, background: ORANGE}} />
          <div style={{position: 'absolute', left: 30, top: 30, bottom: 0, width: 20, background: '#8A93A0'}} />
          <div style={{position: 'absolute', right: 30, top: 30, bottom: 0, width: 20, background: '#8A93A0'}} />
        </div>
        <div style={{position: 'absolute', left: 600, bottom: 120 + up * 110 - 20, fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: ECO, opacity: up}}>↕</div>
      </div>
    );
  }
  if (i === 4) {
    // mise à jour technique
    const d = p(0.4, 2.4, (v) => v);
    return (
      <div style={{width: 600, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 30}}>
          <div style={{opacity: 1 - d * 0.6, filter: `grayscale(${d})`}}><F n="outils" size={170} /></div>
          <div style={{fontSize: 60, color: '#6B4FA0', fontFamily: sansFont, fontWeight: 900}}>→</div>
          <div style={{transform: `scale(${0.6 + 0.4 * d})`, opacity: 0.3 + 0.7 * d}}><F n="ordinateur" size={170} /></div>
        </div>
        <div style={{width: 560, height: 40, borderRadius: 20, background: '#E7E9EE', overflow: 'hidden'}}><div style={{width: `${d * 100}%`, height: '100%', background: '#6B4FA0'}} /></div>
        <Label size={32} color="#6B4FA0">{d < 1 ? `Mise à jour ${Math.round(d * 100)} %` : 'Technique à jour ✓'}</Label>
      </div>
    );
  }
  if (i === 5) {
    // machine à sous : dangereux → moins dangereux → pas dangereux
    const icons = ['radioactif', 'danger', 'feuille'];
    const roll = p(0.5, 4.6, easeOut);
    const pos = roll * 2;
    return (
      <div style={{width: 600, height: 420, borderRadius: 40, background: '#C6A400', padding: 26, boxSizing: 'border-box', boxShadow: shadow}}>
        <div style={{width: '100%', height: '100%', borderRadius: 26, background: '#fff', overflow: 'hidden', position: 'relative'}}>
          <div style={{position: 'absolute', left: 0, right: 0, top: 184 - pos * 300 - 120, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {icons.map((n, k) => <div key={k} style={{height: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}><F n={n} size={170} /><Label size={26} color={[RED, ORANGE, ECO][k]}>{['Dangereux', 'Moins dangereux', 'Pas dangereux'][k]}</Label></div>)}
          </div>
        </div>
      </div>
    );
  }
  if (i === 6) {
    // diagramme de Gantt
    const bars: [number, number, string][] = [[0, 0.4, ECO], [0.25, 0.6, BLUE], [0.5, 0.85, ORANGE], [0.7, 1, '#1F8A70']];
    return (
      <div style={{width: 640, background: '#fff', borderRadius: 24, padding: 24, boxShadow: shadow}}>
        {['Évaluer', 'Former', 'Équiper', 'Contrôler'].map((l, k) => {
          const [a, b, c] = bars[k];
          const g = p(0.3 + k * 0.25, 0.9 + k * 0.25);
          return <div key={l} style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: k ? 18 : 0}}><div style={{width: 150, fontFamily: sansFont, fontWeight: 800, fontSize: 26, color: colors.ink}}>{l}</div><div style={{flex: 1, height: 56, position: 'relative', background: '#F1F3F6', borderRadius: 12}}><div style={{position: 'absolute', left: `${a * 100}%`, width: `${(b - a) * 100 * g}%`, top: 0, bottom: 0, borderRadius: 12, background: c}} /></div></div>;
        })}
      </div>
    );
  }
  if (i === 7) {
    // parapluie collectif vs casque individuel, priorité
    const open = p(0.4, 1.4, easeOut);
    const tilt = p(3.8, 4.8);
    return (
      <div style={{position: 'relative', width: 680, height: 460}}>
        <svg width={420} height={300} style={{position: 'absolute', left: 0, top: 0}}>
          <path d={`M${210 - 200 * open} 150 Q 210 ${150 - 160 * open} ${210 + 200 * open} 150 Z`} fill={colors.navy} />
          <line x1={210} y1={150} x2={210} y2={290} stroke="#444" strokeWidth={10} />
        </svg>
        <div style={{position: 'absolute', left: 40, top: 270, display: 'flex', gap: 4}}>{['ouvrier', 'ouvrier-dark', 'salariee', 'agent-hse'].map((n) => <F key={n} n={n} size={86} />)}</div>
        <Label size={26} style={{position: 'absolute', left: 60, top: 380}}>Collective · priorité 1</Label>
        <div style={{position: 'absolute', right: 20, top: 150, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.55 + 0.45 * (1 - tilt), transform: `scale(${1 - 0.25 * tilt})`}}><F n="casque" size={140} /><Label size={24}>Individuelle · ensuite</Label></div>
        {tilt > 0 && <div style={{position: 'absolute', left: 180, top: -10, transform: `scale(${tilt})`}}><Check p={tilt} size={80} /></div>}
      </div>
    );
  }
  // consignes cochées
  const items = ['Mode opératoire', 'Consignes de sécurité', 'Gestes d’urgence'];
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
      <F n="megaphone" size={190} />
      <div style={{background: '#fff', borderRadius: 26, padding: '24px 30px', boxShadow: shadow}}>
        {items.map((l, k) => <div key={l} style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: k ? 16 : 0, opacity: p(0.3 + k * 0.5, 0.6 + k * 0.5)}}><Check p={p(0.5 + k * 0.5, 0.9 + k * 0.5)} size={50} /><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 32, color: colors.ink}}>{l}</div></div>)}
      </div>
    </div>
  );
};

/* ─────────── Fil vertical qui s'enclenche ─────────── */
const Feed: React.FC = () => {
  const t = useT();
  // position continue du fil (avec léger dépassement à chaque enclenchement)
  const pos = STARTS.reduce((a, st, i) => a + (i ? prog(t, st - 0.35, st + 0.15, easeInOut) : 0), 0);
  const snap = STARTS.reduce((a, st, i) => (i && t > st - 0.35 && t < st + 0.6 ? Math.sin(prog(t, st + 0.15, st + 0.6) * Math.PI) * 18 : a), 0);
  const idx = Math.max(0, STARTS.reduce((a, st, i) => (t >= st - 0.1 ? i : a), 0));
  const exit = prog(t, END - 0.2, END + 0.5, easeIn);
  return (
    <AbsoluteFill style={{opacity: 1 - exit}}>
      {STARTS.map((st, i) => {
        const d = i - pos;
        if (Math.abs(d) > 1.3) return null;
        return (
          <div key={i} style={{position: 'absolute', left: 60, top: 300 + d * 1750 - snap, width: 960, height: 1220, borderRadius: 50, background: '#fff', boxShadow: shadow, overflow: 'hidden', transform: `scale(${1 - Math.abs(d) * 0.08})`}}>
            <div style={{height: 260, background: TONES[i], position: 'relative', display: 'flex', alignItems: 'center', padding: '0 50px', gap: 30}}>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 200, color: 'rgba(255,255,255,0.35)', lineHeight: 1}}>{i + 1}</div>
              <Label size={54} color="#fff" style={{textAlign: 'left', flex: 1}}>{TITLES[i]}</Label>
            </div>
            <div style={{height: 860, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Viz i={i} lt={t - st} /></div>
          </div>
        );
      })}
      {/* anneau de progression n/9 */}
      <div style={{position: 'absolute', right: 70, top: 220, width: 130, height: 130, zIndex: 5}}>
        <svg width={130} height={130}><circle cx={65} cy={65} r={54} fill="#fff" stroke="#E7E9EE" strokeWidth={10} /><circle cx={65} cy={65} r={54} fill="none" stroke={TONES[idx]} strokeWidth={10} strokeLinecap="round" strokeDasharray={`${((pos + 1) / 9) * 339} 339`} transform="rotate(-90 65 65)" /></svg>
        <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: colors.navy}}>{idx + 1}/9</div>
      </div>
      {/* poignée de défilement */}
      <div style={{position: 'absolute', right: 26, top: 400, width: 8, height: 1000, borderRadius: 4, background: 'rgba(14,42,92,0.1)'}}><div style={{position: 'absolute', left: 0, right: 0, top: (pos / 8) * 880, height: 120, borderRadius: 4, background: colors.navy}} /></div>
    </AbsoluteFill>
  );
};

/* ─────────── Intro et pyramide finale ─────────── */
const Intro: React.FC = () => {
  const t = useT();
  const out = prog(t, 3.6, 4.1, easeIn);
  return (
    <AbsoluteFill style={{opacity: 1 - out}}>
      <Kinetic text="Les *9 principes* généraux de prévention" at={0.2} y={520} size={86} />
      <div style={{position: 'absolute', left: 190, top: 760, width: 700, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24}}>
        {TONES.map((c, k) => {
          const p = prog(t, 0.8 + k * 0.12, 1.2 + k * 0.12, easeOut);
          return <div key={k} style={{height: 210, borderRadius: 30, background: c, transform: `perspective(900px) rotateY(${(1 - p) * 180}deg) translateY(${-out * (k - 4) * 60}px)`, opacity: p, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 120, color: '#fff', boxShadow: shadow}}>{k + 1}</div>;
        })}
      </div>
    </AbsoluteFill>
  );
};
const Pyramid: React.FC = () => {
  const t = useT();
  const rows = [[0], [1, 2], [3, 4, 5], [6, 7, 8]];
  return (
    <AbsoluteFill>
      <Kinetic text="Une démarche *hiérarchisée*" at={END + 0.2} y={360} size={84} />
      {rows.map((r, ri) => r.map((k, ci) => {
        const p = prog(t, END + 0.3 + k * 0.12, END + 0.8 + k * 0.12, easeOut);
        const x = 540 + (ci - (r.length - 1) / 2) * 230;
        const y = 650 + ri * 230;
        return <div key={k} style={{position: 'absolute', left: x - 105, top: y - 105 - (1 - p) * 600, width: 210, height: 210, borderRadius: 30, background: TONES[k], opacity: p, boxShadow: shadow, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 110, color: '#fff'}}>{k + 1}</div>;
      }))}
      <div style={{position: 'absolute', left: 0, right: 0, top: 1560, textAlign: 'center', opacity: prog(t, END + 1.8, END + 2.2)}}><Label size={30} color="#8A93A0">Code du travail · article L4121-2</Label></div>
    </AbsoluteFill>
  );
};

const CUES: Sfx[] = [
  {at: 0.05, s: 'bass-hit', v: 0.45},
  ...TONES.map((_, k) => ({at: 0.8 + k * 0.12, s: 'sfx/click', v: 0.25})),
  ...STARTS.map((st, i) => ({at: st - 0.35, s: i ? 'sfx/swish' : 'soft-whoosh', v: 0.45})),
  ...STARTS.map((st) => ({at: st + 0.15, s: 'sfx/pop', v: 0.4})),
  {at: STARTS[0] + 1.6, s: 'validation', v: 0.4},
  {at: STARTS[1] + 1.4, s: 'tick', v: 0.5},
  {at: STARTS[2] + 1.8, s: 'cadenas', v: 0.45},
  {at: STARTS[3] + 1.6, s: 'sfx/ding', v: 0.35},
  {at: STARTS[4] + 2.4, s: 'validation', v: 0.4},
  {at: STARTS[5] + 0.5, s: 'riser', v: 0.22, dur: 2},
  {at: STARTS[5] + 4.6, s: 'sfx/ding', v: 0.4},
  ...[0, 1, 2, 3].map((k) => ({at: STARTS[6] + 0.3 + k * 0.25, s: 'sfx/click', v: 0.3})),
  {at: STARTS[7] + 0.4, s: 'soft-whoosh', v: 0.45},
  {at: STARTS[7] + 4.8, s: 'validation', v: 0.45},
  ...[0, 1, 2].map((k) => ({at: STARTS[8] + 0.9 + k * 0.5, s: 'tick', v: 0.45})),
  ...Array.from({length: 9}, (_, k) => ({at: END + 0.8 + k * 0.12, s: 'sfx/thud', v: 0.25})),
  {at: END + 2.0, s: 'bass-hit', v: 0.45},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const HierarchiePrev: React.FC = () => (
  <AbsoluteFill>
    <Backdrop />
    <Gate from={0} to={4.2}><Intro /></Gate>
    <Gate from={3.6} to={END + 0.6}><Feed /></Gate>
    <Gate from={END} to={OUTRO_AT}><Pyramid /></Gate>
    <Gate from={OUTRO_AT} to={999}><Outro at={OUTRO_AT} logo={LOGO} /></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0} to={OUTRO_AT}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-hierarchie-prevention-origine.m4a')} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);
