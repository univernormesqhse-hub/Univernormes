import React from 'react';
import {AbsoluteFill, Audio, Img, random, staticFile} from 'remotion';
import {Gate} from '../anim';
import {Captions} from '../components/Captions';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {s, sansFont} from '../theme';
import {Abs, BLUE, DIM, easeIn, easeInOut, easeOut, GREEN, INK, lerp, LOGO, PAPER, PH, pop, prog, RED, spring, T, useT} from '../implIso/kit';
import {captions} from './captions';

/**
 * « Processus et procédure : la différence clé » (1 min 23) — voix d'origine, sous-titres recalés mot à mot,
 * photos réelles (dont la photo « Process » fournie), thème « papier quadrillé » de la série.
 * Montage inédit : UN SEUL PLAN-SÉQUENCE. Toute la vidéo est une immense carte de processus posée sur le papier
 * quadrillé ; une caméra virtuelle survole la carte d'une station à l'autre (vol avec recul de focale), plonge en gros
 * plan sur la procédure puis recule pour révéler qu'elle n'est qu'une case du processus — exactement le propos.
 * Fil rouge : le « fil du processus », une ligne pointillée qui relie toutes les stations sur la carte et se trace au
 * fil de la vidéo, et une bague de focale dans l'en-tête (VUE D'ENSEMBLE ↔ GROS PLAN) qui suit le zoom de la caméra.
 * Le visuel « Procedure » fourni portait des filigranes de banque d'images : il est recréé en animation (coup de
 * pinceau rouge, mot manuscrit, liste 1-2-3).
 */
const ORANGE = '#F28C1E';
const VIO = '#7B5CD6';
const TEAL = '#14A3A3';
const GOLD = '#F5B700';
const PROC_RED = '#E5322D';
const OUTRO_AT = 79.8;
export const PROCVS_FRAMES = s(OUTRO_AT + 3.8);

/* ─────────── La carte du monde ─────────── */
const RW = 1080, RH = 1920, GX = 420, GY = 420;
const REG: Record<string, [number, number]> = {A: [0, 0], B: [1, 0], C: [2, 0], D: [2, 1], E: [1, 1], F: [0, 1], G: [0, 2], H: [1, 2], I: [2, 2]};
const ORDER = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
const rx = (k: string) => REG[k][0] * (RW + GX);
const ry = (k: string) => REG[k][1] * (RH + GY);
const cxOf = (k: string) => rx(k) + RW / 2;
const cyOf = (k: string) => ry(k) + RH / 2;
const WW = 3 * RW + 2 * GX, WH = 3 * RH + 2 * GY;
/* position de la mini-procédure dans la région F (coordonnées locales) */
const MINI = {x: 600, y: 940, w: 260, h: 200};

type Key = {t: number; x: number; y: number; z: number};
const at = (k: string, t: number, z = 1, dx = 0, dy = 0): Key => ({t, x: cxOf(k) + dx, y: cyOf(k) + dy, z});
const KEYS: Key[] = [
  at('A', 0), at('A', 7.5),
  at('B', 8.5), at('B', 20.2),
  at('C', 21.2), at('C', 32.7),
  at('D', 33.6), at('D', 39.4),
  at('E', 40.3), at('E', 49.9, 1.05),
  {t: 50.9, x: rx('F') + MINI.x + MINI.w / 2, y: ry('F') + MINI.y + MINI.h / 2, z: 3.6},
  {t: 51.9, x: rx('F') + MINI.x + MINI.w / 2, y: ry('F') + MINI.y + MINI.h / 2, z: 3.6},
  at('F', 54.2), at('F', 57.2),
  at('G', 58.1), at('G', 64.2),
  at('H', 65.1), at('H', 73.2),
  at('I', 74.1), at('I', 999),
];
const cam = (t: number) => {
  let i = 0;
  while (i < KEYS.length - 2 && t >= KEYS[i + 1].t) i++;
  const a = KEYS[i], b = KEYS[i + 1];
  const k = easeInOut(Math.min(1, Math.max(0, (t - a.t) / (b.t - a.t))));
  const dist = Math.hypot(b.x - a.x, b.y - a.y);
  const dip = dist > 500 ? Math.sin(k * Math.PI) * 0.45 : 0;
  const z = Math.exp(lerp(Math.log(a.z), Math.log(b.z), k)) * (1 - dip);
  return {x: lerp(a.x, b.x, k), y: lerp(a.y, b.y, k), z, flying: dist > 500 && k > 0 && k < 1};
};

/* ─────────── Briques ─────────── */
const Kin: React.FC<{text: string; at: number; size: number; color?: string; stagger?: number; style?: React.CSSProperties}> = ({text, at: a0, size, color = INK, stagger = 0.025, style}) => {
  const t = useT();
  let n = 0;
  return (
    <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: size, color, lineHeight: 1.08, letterSpacing: -1, ...style}}>
      {text.split(' ').map((w, wi) => (
        <span key={wi} style={{display: 'inline-block', whiteSpace: 'nowrap', marginRight: size * 0.25}}>
          {w.split('').map((ch, i) => {
            const k = n++;
            const p = prog(t, a0 + k * stagger, a0 + k * stagger + 0.45, easeOut);
            return <span key={i} style={{display: 'inline-block', opacity: p, transform: `translateY(${(1 - p) * size * 0.6}px) rotate(${(1 - p) * 8}deg)`, filter: `blur(${(1 - p) * 10}px)`}}>{ch}</span>;
          })}
        </span>
      ))}
    </div>
  );
};
const Center: React.FC<{y: number; children: React.ReactNode; style?: React.CSSProperties}> = ({y, children, style}) => (
  <Abs x={40} y={y} w={1000} style={{textAlign: 'center', ...style}}>{children}</Abs>
);
const Pill: React.FC<{at: number; c: string; children: React.ReactNode; size?: number; style?: React.CSSProperties}> = ({at: a0, c, children, size = 34, style}) => {
  const t = useT();
  const p = Math.min(1, spring(t, a0, 8, 14));
  return <div style={{display: 'inline-block', padding: `${size * 0.3}px ${size * 0.7}px`, borderRadius: 60, background: c, color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: size, transform: `scale(${Math.max(0, p)})`, boxShadow: '0 10px 24px rgba(20,33,61,0.18)', whiteSpace: 'nowrap', ...style}}>{children}</div>;
};
const Photo: React.FC<{src: string; x: number; y: number; w: number; h: number; at: number; pos?: string; round?: number; children?: React.ReactNode}> = ({src, x, y, w, h, at: a0, pos = 'center', round = 28, children}) => {
  const t = useT();
  const k = t - a0;
  const p = prog(t, a0, a0 + 0.7, easeOut);
  const sweep = ((k * 0.45) % 1.6) - 0.3;
  return (
    <Abs x={x} y={y} w={w} h={h} style={{opacity: p, transform: `scale(${0.92 + p * 0.08})`, borderRadius: round, overflow: 'hidden', border: '8px solid #fff', boxShadow: '0 30px 60px rgba(20,33,61,0.25)'}}>
      <Img src={PH(src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${1.08 + Math.min(Math.max(k, 0), 15) * 0.008})`}} />
      <div style={{position: 'absolute', inset: 0, background: `linear-gradient(105deg, transparent ${sweep * 100 - 12}%, rgba(255,255,255,0.3) ${sweep * 100}%, transparent ${sweep * 100 + 12}%)`}} />
      {children}
    </Abs>
  );
};
const Stamp: React.FC<{at: number; c: string; text: string; x: number; y: number; rot?: number; size?: number}> = ({at: a0, c, text, x, y, rot = -8, size = 54}) => {
  const t = useT();
  if (t < a0) return null;
  const p = prog(t, a0, a0 + 0.22, easeIn);
  return (
    <Abs x={x} y={y} style={{transform: `rotate(${rot}deg) scale(${lerp(2.2, 1, p)})`, opacity: p, zIndex: 5}}>
      <div style={{padding: '10px 26px', border: `7px solid ${c}`, borderRadius: 14, color: c, fontFamily: sansFont, fontWeight: 900, fontSize: size, letterSpacing: 2, textTransform: 'uppercase', background: 'rgba(255,255,255,0.9)', whiteSpace: 'nowrap'}}>{text}</div>
    </Abs>
  );
};
const Hand: React.FC<{children: React.ReactNode; size: number; color?: string; style?: React.CSSProperties}> = ({children, size, color = '#fff', style}) => (
  <div style={{fontFamily: '"Comic Sans MS", "Segoe Print", cursive', fontWeight: 700, fontSize: size, color, fontStyle: 'italic', letterSpacing: 1, ...style}}>{children}</div>
);
/** Le visuel « Procedure » recréé : coup de pinceau rouge + mot manuscrit qui s'écrit. */
const Brush: React.FC<{at: number; w?: number; scale?: number}> = ({at: a0, w = 900, scale = 1}) => {
  const t = useT();
  const p = prog(t, a0, a0 + 0.7, easeOut);
  const word = 'Procédure';
  return (
    <div style={{position: 'relative', width: w, height: 200 * scale}}>
      <svg width={w} height={200 * scale} viewBox="0 0 900 200" preserveAspectRatio="none" style={{position: 'absolute', inset: 0, clipPath: `inset(0 ${(1 - p) * 100}% 0 0)`}}>
        <path d="M10 70 L60 40 L140 52 L220 28 L340 44 L460 22 L600 38 L720 18 L860 30 L892 60 L870 100 L890 140 L820 168 L700 176 L560 184 L420 172 L300 186 L160 170 L60 178 L20 150 L40 120 L8 100 Z" fill={PROC_RED} />
        {Array.from({length: 14}, (_, k) => <rect key={k} x={40 + k * 60} y={20 + (k % 3) * 70} width={40 + (k % 4) * 10} height={4} fill="#ffffff40" />)}
      </svg>
      <div style={{position: 'absolute', left: 40 * scale, top: 22 * scale, display: 'flex'}}>
        {word.split('').map((ch, i) => <Hand key={i} size={120 * scale} style={{opacity: prog(t, a0 + 0.4 + i * 0.06, a0 + 0.5 + i * 0.06), transform: `translateY(${(1 - prog(t, a0 + 0.4 + i * 0.06, a0 + 0.6 + i * 0.06)) * 10}px)`}}>{ch}</Hand>)}
      </div>
    </div>
  );
};

/* ─────────── Régions de la carte ─────────── */
const Frame: React.FC<{k: string; label: string; c: string; children: React.ReactNode}> = ({k, label, c, children}) => (
  <div style={{position: 'absolute', left: rx(k), top: ry(k), width: RW, height: RH}}>
    <div style={{position: 'absolute', left: 30, top: 290, right: 30, bottom: 420, borderRadius: 40, border: `3px dashed ${c}55`, background: 'rgba(255,255,255,0.35)'}} />
    <div style={{position: 'absolute', left: 60, top: 260, padding: '6px 20px', borderRadius: 20, background: c, color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: 24, letterSpacing: 2}}>{label}</div>
    {children}
  </div>
);
const RegA: React.FC = () => {
  const t = useT();
  const path = prog(t, 5.8, 7.2, easeInOut);
  return (
    <Frame k="A" label="ÉTAPE 1 · LE PROCESSUS" c={BLUE}>
      <Center y={340}><Kin text="Son seul objectif ?" at={1.8} size={60} /></Center>
      <Photo src="procvs/process.jpg" x={60} y={450} w={960} h={656} at={2.4} pos="50% 45%" />
      <Abs x={60} y={1150} w={960} h={180}>
        <svg width={960} height={180} viewBox="0 0 960 180">
          <path d="M80 90 C 300 10, 660 170, 880 90" fill="none" stroke={BLUE} strokeWidth={10} strokeDasharray={1000} strokeDashoffset={1000 * (1 - path)} strokeLinecap="round" />
        </svg>
        <div style={{position: 'absolute', left: 0, top: 50, width: 160, textAlign: 'center', opacity: pop(t, 5.8)}}><Pill at={5.8} c={INK} size={28}>début</Pill></div>
        <div style={{position: 'absolute', right: 0, top: 50, width: 200, textAlign: 'center', opacity: pop(t, 7.0)}}><Pill at={7.0} c={GREEN} size={28}>fin ✓</Pill></div>
      </Abs>
      <Center y={1300}><Kin text="un résultat utile" at={4.3} size={58} color={GREEN} /></Center>
    </Frame>
  );
};
const RegB: React.FC = () => {
  const t = useT();
  const lanes = [{l: 'Ventes', ph: 'verites/telephone.jpg', c: BLUE}, {l: 'Planification', ph: 'verites/operatrice-tablette.jpg', c: VIO}, {l: 'Production', ph: 'induction/technicien-hse.jpg', c: ORANGE}, {l: 'Logistique', ph: 'zones/entrepot.jpg', c: TEAL}];
  const thread = prog(t, 11.4, 13.4, easeInOut);
  const chain = [{l: 'besoins du client', a: 14.5, ic: 'bulle'}, {l: 'ressources', a: 15.9, ic: 'boite-outils'}, {l: 'étapes', a: 17.7, ic: 'engrenage'}, {l: 'résultat', a: 18.9, ic: 'trophee'}];
  return (
    <Frame k="B" label="IL EST GLOBAL" c={VIO}>
      <Center y={330}><Kin text="Il traverse les services" at={10.5} size={58} color={VIO} /></Center>
      {lanes.map((ln, i) => (
        <Abs key={i} x={70} y={430 + i * 140} w={940} h={120} style={{opacity: pop(t, 9.6 + i * 0.25), display: 'flex', alignItems: 'center', gap: 20, background: '#fff', borderRadius: 22, boxShadow: '0 10px 24px rgba(20,33,61,0.1)', overflow: 'hidden'}}>
          <div style={{width: 150, height: 120}}><Img src={PH(ln.ph)} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: ln.c}}>{ln.l}</div>
        </Abs>
      ))}
      <svg style={{position: 'absolute', left: 0, top: 0}} width={RW} height={1100}>
        <path d="M640 410 C 760 470, 560 560, 700 630 S 560 760, 720 800 S 580 900, 760 990" fill="none" stroke={RED} strokeWidth={12} strokeDasharray={900} strokeDashoffset={900 * (1 - thread)} strokeLinecap="round" />
      </svg>
      {t > 12.9 && <Abs x={760} y={420} style={{opacity: pop(t, 12.9)}}><Pill at={12.9} c={RED} size={26}>relie les gens</Pill></Abs>}
      <Abs x={50} y={1030} w={980} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        {chain.map((c, i) => (
          <React.Fragment key={i}>
            <div style={{textAlign: 'center', width: 200, opacity: pop(t, c.a), transform: `translateY(${(1 - pop(t, c.a)) * 40}px)`}}>
              <div style={{width: 120, height: 120, margin: '0 auto', borderRadius: 60, background: '#fff', boxShadow: '0 10px 24px rgba(20,33,61,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `5px solid ${i === 3 ? GREEN : VIO}`}}><F n={c.ic} size={72} /></div>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK, marginTop: 10}}>{c.l}</div>
            </div>
            {i < 3 && <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: VIO, opacity: pop(t, chain[i + 1].a - 0.2), marginTop: -40}}>→</div>}
          </React.Fragment>
        ))}
      </Abs>
    </Frame>
  );
};
const RegC: React.FC = () => {
  const t = useT();
  const ex = [{l: 'Recrutement', ph: 'induction/accueil-groupe.jpg', a: 25.2}, {l: 'Facturation', ph: 'verites/ecriture.jpg', a: 26.1}, {l: 'Livraison', ph: 'zones/entrepot.jpg', a: 27.1}];
  const map = prog(t, 29.9, 31.4, easeInOut);
  return (
    <Frame k="C" label="À COMPRENDRE EN PREMIER" c={ORANGE}>
      <Center y={330}><Kin text="Avant toute amélioration…" at={20.7} size={56} /></Center>
      <Center y={410}><Kin text="comprendre le processus" at={23.2} size={56} color={ORANGE} /></Center>
      {ex.map((e, i) => (
        <Photo key={i} src={e.ph} x={60 + i * 330} y={540} w={300} h={380} at={e.a}>
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, padding: 12, background: 'linear-gradient(0deg, rgba(20,33,61,0.85), transparent)', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#fff', textAlign: 'center'}}>{e.l}</div>
        </Photo>
      ))}
      <svg style={{position: 'absolute', left: 0, top: 0}} width={RW} height={1400}>
        {[[210, 920, 540, 1060], [540, 920, 540, 1060], [870, 920, 540, 1060]].map((l, k) => <line key={k} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} stroke={ORANGE} strokeWidth={6} strokeDasharray="12 10" opacity={map} />)}
      </svg>
      <Abs x={290} y={1060} w={500} h={170} style={{borderRadius: 26, background: '#fff', border: `6px solid ${ORANGE}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, transform: `scale(${Math.min(1, spring(t, 29.9, 8, 13))})`, opacity: t > 29.9 ? 1 : 0}}>
        <F n="carte" size={90} />
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: ORANGE}}>cartographier</div>
      </Abs>
      <Stamp at={28.5} c={RED} text="rien ne s'améliore sans" x={150} y={950} rot={-4} size={36} />
    </Frame>
  );
};
const RegD: React.FC = () => {
  const t = useT();
  const items = [{l: 'les décisions', a: 33.1, ic: 'balance', c: VIO}, {l: 'les flux d’information', a: 34.7, ic: 'enveloppe', c: BLUE}, {l: 'les délais', a: 36.0, ic: 'chrono', c: ORANGE}, {l: 'les interactions', a: 36.9, ic: 'equipe', c: GREEN}];
  return (
    <Frame k="D" label="IL ENGLOBE AUSSI" c={TEAL}>
      <Center y={330}><Kin text="Il englobe aussi…" at={33.1} size={60} color={TEAL} /></Center>
      <Abs x={340} y={640} w={400} h={400} style={{borderRadius: 200, background: `radial-gradient(circle, ${TEAL}22, transparent 70%)`}} />
      <Abs x={440} y={740} w={200} h={200} style={{borderRadius: 100, background: TEAL, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 14px 30px rgba(20,33,61,0.2)', transform: `rotate(${t * 20}deg)`}}><F n="engrenage" size={130} /></Abs>
      {items.map((it, k) => {
        const ang = -Math.PI / 2 + (k / 4) * Math.PI * 2 + Math.PI / 4;
        const p = Math.min(1, spring(t, it.a, 8, 13));
        const x = 540 + Math.cos(ang) * 320 * Math.max(0, p);
        const y = 840 + Math.sin(ang) * 300 * Math.max(0, p);
        return (
          <Abs key={k} x={x - 150} y={y - 80} w={300} style={{textAlign: 'center', opacity: t > it.a ? 1 : 0}}>
            <div style={{width: 120, height: 120, margin: '0 auto', borderRadius: 60, background: '#fff', border: `6px solid ${it.c}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={it.ic} size={74} /></div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: it.c, marginTop: 8}}>{it.l}</div>
          </Abs>
        );
      })}
      <Center y={1270}><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 34, color: INK, opacity: pop(t, 37.7)}}>entre tous les acteurs concernés</div></Center>
    </Frame>
  );
};
const ITEMS = ['Vérifier', 'Emballer', 'Étiqueter'];
const Checklist: React.FC<{at: number; size: number; done?: boolean}> = ({at: a0, size, done = true}) => {
  const t = useT();
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: size * 0.35}}>
      {ITEMS.map((x, k) => {
        const a = a0 + k * 0.7;
        return (
          <div key={k} style={{display: 'flex', alignItems: 'center', gap: size * 0.5, opacity: pop(t, a)}}>
            <svg width={size * 1.6} height={size * 1.3} viewBox="0 0 80 64"><ellipse cx={40} cy={32} rx={34} ry={26} fill="none" stroke={INK} strokeWidth={4} strokeDasharray={200} strokeDashoffset={200 * (1 - prog(t, a, a + 0.4))} /><text x={40} y={44} textAnchor="middle" fontFamily="Comic Sans MS, cursive" fontWeight={700} fontSize={34} fill={INK}>{k + 1}</text></svg>
            <Hand size={size} color={INK}>{x}</Hand>
            {done && <div style={{fontSize: size, color: GREEN, fontWeight: 900, transform: `scale(${Math.min(1, spring(t, a + 0.5, 9, 15))})`}}>✓</div>}
          </div>
        );
      })}
    </div>
  );
};
const RegE: React.FC = () => {
  const t = useT();
  const wall = prog(t, 48.4, 49.2, easeOut);
  return (
    <Frame k="E" label="ATTENTION À LA CONFUSION" c={PROC_RED}>
      <Center y={330}><Kin text="Ne pas le confondre avec…" at={39.8} size={54} /></Center>
      <Abs x={90} y={430}><Brush at={40.6} /></Abs>
      <Abs x={110} y={690} w={600}><Checklist at={45.6} size={60} /></Abs>
      <Abs x={700} y={700} w={330} style={{display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start'}}>
        <Pill at={43.0} c={PROC_RED} size={28}>comment faire</Pill><Pill at={44.0} c={PROC_RED} size={28}>une seule tâche</Pill><Pill at={46.6} c={PROC_RED} size={28}>dans l’ordre</Pill>
      </Abs>
      <Abs x={160} y={1010} w={760} h={330} style={{transform: `perspective(1200px) rotateX(${(1 - wall) * 60}deg)`, transformOrigin: '50% 0', opacity: pop(t, 47.5)}}>
        <div style={{position: 'absolute', inset: 0, background: '#fff', borderRadius: 10, boxShadow: '0 20px 40px rgba(20,33,61,0.25)', padding: 24, boxSizing: 'border-box'}}>
          <div style={{height: 26, width: '50%', background: PROC_RED, borderRadius: 6, marginBottom: 18}} />
          {[0, 1, 2, 3, 4].map((k) => <div key={k} style={{height: 14, width: `${90 - (k % 3) * 15}%`, background: '#DCE2EC', borderRadius: 4, marginBottom: 16}} />)}
        </div>
        <div style={{position: 'absolute', left: '50%', top: -16, width: 32, height: 32, marginLeft: -16, borderRadius: 16, background: PROC_RED, boxShadow: '0 4px 8px rgba(0,0,0,0.3)'}} />
        <div style={{position: 'absolute', right: -20, bottom: -30, display: 'flex', gap: 10}}><Pill at={47.5} c={INK} size={26}>détaillée</Pill><Pill at={48.4} c={INK} size={26}>écrite</Pill><Pill at={49.0} c={INK} size={26}>affichée</Pill></div>
      </Abs>
    </Frame>
  );
};
/** La carte du processus, dont la procédure n'est qu'une case. */
const RegF: React.FC = () => {
  const t = useT();
  const boxes = [{l: 'Commande', x: 60, y: 940}, {l: 'Préparer', x: 330, y: 940}, {l: '', x: MINI.x, y: MINI.y}, {l: 'Expédier', x: 600, y: 1200}, {l: 'Livrer', x: 330, y: 1200}];
  const label = prog(t, 53.4, 54.2);
  return (
    <Frame k="F" label="NIVEAU SUPÉRIEUR" c={BLUE}>
      <Center y={330}><Kin text="Le processus voit l’ensemble" at={53.6} size={56} color={BLUE} /></Center>
      <Center y={420}><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 34, color: PROC_RED, opacity: pop(t, 55.1)}}>la procédure zoome sur un morceau</div></Center>
      <Abs x={40} y={880} w={1000} h={460} style={{borderRadius: 30, border: `5px solid ${BLUE}`, opacity: label}} />
      <Abs x={60} y={830} style={{opacity: label}}><Pill at={53.4} c={BLUE} size={28}>PROCESSUS : livrer une commande</Pill></Abs>
      <svg style={{position: 'absolute', left: 0, top: 0}} width={RW} height={1500}>
        <path d="M320 1040 L330 1040 M590 1040 L600 1040 M860 1040 C 960 1040, 960 1300, 860 1300 M600 1300 L590 1300" stroke={BLUE} strokeWidth={6} fill="none" opacity={label} />
      </svg>
      {boxes.map((b, k) => k === 2 ? (
        <Abs key={k} x={b.x} y={b.y} w={MINI.w} h={MINI.h} style={{background: '#fff', borderRadius: 10, boxShadow: '0 6px 14px rgba(20,33,61,0.2)', border: `3px solid ${PROC_RED}`, overflow: 'hidden'}}>
          <div style={{transform: `scale(${MINI.w / 900})`, transformOrigin: '0 0'}}><div style={{padding: 20}}><Brush at={-9} w={860} /></div><div style={{padding: '0 60px'}}><Checklist at={-9} size={70} /></div></div>
        </Abs>
      ) : (
        <Abs key={k} x={b.x} y={b.y} w={MINI.w} h={MINI.h} style={{background: '#fff', borderRadius: 18, boxShadow: '0 6px 14px rgba(20,33,61,0.15)', border: `4px solid ${BLUE}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: BLUE, opacity: label}}>{b.l}</Abs>
      ))}
      {t > 53.4 && <Abs x={MINI.x - 20} y={MINI.y - 20} w={MINI.w + 40} h={MINI.h + 40} style={{borderRadius: 24, border: `5px solid ${PROC_RED}`, opacity: 0.4 + 0.6 * Math.abs(Math.sin(t * 3))}} />}
      <Abs x={MINI.x + 20} y={MINI.y - 70} style={{opacity: label}}><Pill at={54.0} c={PROC_RED} size={24}>PROCÉDURE</Pill></Abs>
    </Frame>
  );
};
const RegG: React.FC = () => {
  const t = useT();
  const zoom = prog(t, 61.2, 62.0, easeInOut);
  const steps = ['Commande', 'Préparer', 'Emballer', 'Expédier', 'Livrer'];
  return (
    <Frame k="G" label="CONCRÈTEMENT" c={GREEN}>
      <Photo src="zones/entrepot.jpg" x={60} y={330} w={960} h={480} at={57.6} pos="50% 40%">
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, padding: 16, background: 'linear-gradient(0deg, rgba(20,33,61,0.85), transparent)', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: '#fff', textAlign: 'center'}}>Livrer une commande client</div>
      </Photo>
      <Abs x={60} y={860} w={960} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        {steps.map((st, k) => {
          const isPack = k === 2;
          const sc = isPack ? 1 + zoom * 0.35 : 1 - zoom * 0.1;
          return (
            <div key={k} style={{width: 168, height: 110, borderRadius: 18, background: isPack && zoom > 0.3 ? PROC_RED : '#fff', border: `4px solid ${isPack && zoom > 0.3 ? PROC_RED : GREEN}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: isPack && zoom > 0.3 ? '#fff' : GREEN, opacity: pop(t, 58.5 + k * 0.15) * (isPack ? 1 : 1 - zoom * 0.5), transform: `scale(${sc})`, zIndex: isPack ? 2 : 1}}>{st}</div>
          );
        })}
      </Abs>
      <Abs x={60} y={1000} w={960} style={{opacity: pop(t, 59.7)}}><div style={{height: 10, borderRadius: 5, background: GREEN}} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: GREEN, textAlign: 'center', marginTop: 10}}>= le processus</div></Abs>
      <Abs x={300} y={1100} w={480} h={230} style={{borderRadius: 24, background: '#fff', border: `6px solid ${PROC_RED}`, padding: 20, boxSizing: 'border-box', opacity: zoom, transform: `scale(${0.6 + 0.4 * zoom})`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16}}><F n="colis" size={90} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: PROC_RED}}>Emballer un colis<br /><span style={{fontSize: 28, color: INK}}>= la procédure</span></div></div>
      </Abs>
    </Frame>
  );
};
const RegH: React.FC = () => {
  const t = useT();
  const join = prog(t, 68.6, 70.6, easeInOut);
  const tasks = [{l: 'Tâche A', x: 80, y: 520}, {l: 'Tâche B', x: 720, y: 600}, {l: 'Tâche C', x: 400, y: 1000}];
  const spin = t > 70.6 ? (t - 70.6) * 140 : 0;
  return (
    <Frame k="H" label="LA MACHINE" c={ORANGE}>
      <Center y={330}><Kin text="Des tâches isolées…" at={64.6} size={56} color={DIM} /></Center>
      {tasks.map((tk, k) => {
        const gx = 300 + k * 160;
        const gy = 760;
        return (
          <Abs key={k} x={lerp(tk.x, gx, join)} y={lerp(tk.y, gy, join)} w={240} style={{textAlign: 'center', opacity: pop(t, 65.0 + k * 0.3)}}>
            <div style={{width: 200, height: 200, margin: '0 auto', transform: `rotate(${(k % 2 ? -1 : 1) * spin}deg)`}}><F n="engrenage" size={200} /></div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK, opacity: 1 - join}}>{tk.l}</div>
          </Abs>
        );
      })}
      {t > 66.7 && t < 68.6 && <Stamp at={66.8} c={RED} text="aucun résultat cohérent" x={180} y={860} rot={-4} size={40} />}
      <Center y={1020}><div style={{opacity: pop(t, 69.4)}}><Kin text="…une machine" at={69.4} size={70} color={ORANGE} /></div></Center>
      <Abs x={0} y={1140} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, opacity: pop(t, 71.0)}}>
        <F n="pouce" size={110} float={6} />
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: GREEN}}>client satisfait,<br />à chaque fois</div>
      </Abs>
    </Frame>
  );
};
const RegI: React.FC = () => {
  const t = useT();
  return (
    <Frame k="I" label="EN UNE PHRASE" c={INK}>
      <Abs x={60} y={340} w={960} h={430} style={{borderRadius: 30, background: '#fff', boxShadow: '0 20px 44px rgba(20,33,61,0.15)', borderLeft: `16px solid ${BLUE}`, padding: 34, boxSizing: 'border-box', opacity: pop(t, 74.6), transform: `translateX(${(1 - pop(t, 74.6)) * -200}px)`}}>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 58, color: BLUE}}>Processus</div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 80, color: INK, marginTop: 10}}>QUOI</div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 60, color: DIM}}>& POURQUOI</div>
        <div style={{position: 'absolute', right: 30, top: 30}}><F n="telescope" size={150} /></div>
      </Abs>
      <Abs x={60} y={800} w={960} h={430} style={{borderRadius: 30, background: '#fff', boxShadow: '0 20px 44px rgba(20,33,61,0.15)', borderLeft: `16px solid ${PROC_RED}`, padding: 34, boxSizing: 'border-box', opacity: pop(t, 76.8), transform: `translateX(${(1 - pop(t, 76.8)) * 200}px)`}}>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 58, color: PROC_RED}}>Procédure</div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 80, color: INK, marginTop: 10}}>COMMENT</div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 60, color: DIM}}>& DANS QUEL ORDRE</div>
        <div style={{position: 'absolute', right: 30, top: 30}}><F n="loupe" size={150} /></div>
      </Abs>
    </Frame>
  );
};

/* ─────────── Le plan-séquence ─────────── */
const World: React.FC = () => {
  const t = useT();
  const c = cam(t);
  const idx = Math.max(0, ORDER.findIndex((k, i) => i === ORDER.length - 1 || Math.hypot(cxOf(k) - c.x, cyOf(k) - c.y) < Math.hypot(cxOf(ORDER[i + 1]) - c.x, cyOf(ORDER[i + 1]) - c.y)));
  const pts = ORDER.map((k) => `${cxOf(k)},${ry(k) + 1300}`);
  const total = ORDER.length - 1;
  const progLine = Math.min(total, idx + (c.flying ? 0.5 : 0));
  const vis = (k: string) => {
    const hw = 540 / c.z + 200, hh = 960 / c.z + 200;
    return Math.abs(cxOf(k) - c.x) < hw + RW / 2 && Math.abs(cyOf(k) - c.y) < hh + RH / 2;
  };
  const R: Record<string, React.FC> = {A: RegA, B: RegB, C: RegC, D: RegD, E: RegE, F: RegF, G: RegG, H: RegH, I: RegI};
  return (
    <AbsoluteFill style={{overflow: 'hidden', background: PAPER}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: WW, height: WH, transformOrigin: '0 0', transform: `translate(${540 - c.x * c.z}px, ${960 - c.y * c.z}px) scale(${c.z})`,
        backgroundColor: PAPER, backgroundImage: 'linear-gradient(rgba(20,33,61,0.06) 2px, transparent 2px), linear-gradient(90deg, rgba(20,33,61,0.06) 2px, transparent 2px)', backgroundSize: '60px 60px'}}>
        {/* le fil du processus */}
        <svg style={{position: 'absolute', left: 0, top: 0}} width={WW} height={WH}>
          <polyline points={pts.join(' ')} fill="none" stroke="#C9D2DF" strokeWidth={16} strokeDasharray="4 34" strokeLinecap="round" />
          <polyline points={pts.slice(0, Math.floor(progLine) + 2).join(' ')} fill="none" stroke={GOLD} strokeWidth={16} strokeDasharray="4 34" strokeLinecap="round" opacity={0.9} />
        </svg>
        {ORDER.map((k) => (vis(k) ? React.createElement(R[k], {key: k}) : null))}
      </div>
    </AbsoluteFill>
  );
};

/* ─────────── En-tête : bague de focale ─────────── */
const Header: React.FC = () => {
  const t = useT();
  const c = cam(t);
  const zl = Math.min(1, Math.max(0, (Math.log(c.z) - Math.log(0.55)) / (Math.log(3.6) - Math.log(0.55))));
  const isProc = t > 39.7 && t < 53.6 || (t > 61.2 && t < 64.4);
  return (
    <AbsoluteFill style={{zIndex: 40, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: '50%', top: 64, transform: 'translateX(-50%)', background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 8px 24px rgba(20,33,61,0.12)'}}><Img src={staticFile(LOGO)} style={{height: 78, display: 'block'}} /></div>
      {t > 2.6 && t < OUTRO_AT && (
        <div style={{position: 'absolute', left: 90, right: 90, top: 200, height: 56, display: 'flex', alignItems: 'center', gap: 14, opacity: pop(t, 2.6), background: '#ffffffE6', borderRadius: 28, padding: '0 22px', boxShadow: '0 8px 20px rgba(20,33,61,0.1)'}}>
          <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 18, color: BLUE, letterSpacing: 1}}>VUE D’ENSEMBLE</div>
          <div style={{flex: 1, height: 22, position: 'relative', borderRadius: 11, background: `repeating-linear-gradient(90deg, #C9D2DF 0 3px, transparent 3px 14px)`}}>
            <div style={{position: 'absolute', left: `calc(${zl * 100}% - 18px)`, top: -7, width: 36, height: 36, borderRadius: 18, background: isProc ? PROC_RED : BLUE, boxShadow: '0 4px 10px rgba(20,33,61,0.3)'}} />
          </div>
          <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 18, color: PROC_RED, letterSpacing: 1}}>GROS PLAN</div>
        </div>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Couverture ─────────── */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <Img src={PH('procvs/process.jpg')} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 900, objectFit: 'cover', objectPosition: '50% 40%'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 34%, ${PAPER}DD 44%, ${PAPER} 49%)`}} />
      <Abs x={0} y={90} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={50} y={800} w={980} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: INK, color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: 30, letterSpacing: 3}}>LA DIFFÉRENCE CLÉ</div>
        <T size={110} color={BLUE} style={{marginTop: 20, textTransform: 'uppercase', letterSpacing: -3}}>Processus</T>
        <T size={60} color={DIM} style={{margin: '4px 0'}}>et</T>
      </Abs>
      <Abs x={90} y={1130}><Brush at={-9} w={900} scale={1} /></Abs>
      <Abs x={0} y={1370} w={1080} style={{textAlign: 'center'}}><T size={46} color={INK}>Quoi & pourquoi · Comment & dans quel ordre</T></Abs>
    </AbsoluteFill>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const FLIGHTS = [7.5, 20.2, 32.7, 39.4, 49.9, 57.2, 64.2, 73.2];
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...FLIGHTS.flatMap((a) => [{at: a, s: 'sfx/whoosh', v: 0.4}, {at: a + 0.8, s: 'sfx/thud', v: 0.2}]),
  {at: 2.4, s: 'sfx/swish', v: 0.3}, {at: 5.8, s: 'sfx/pop', v: 0.25}, {at: 7.0, s: 'sfx/ding', v: 0.3},
  ...rep(9.6, 4, 0.25, 'sfx/click', 0.2), {at: 11.4, s: 'sfx/rise', v: 0.25}, ...[14.5, 15.9, 17.7, 18.9].map((a) => ({at: a, s: 'sfx/pop', v: 0.25})), {at: 19.0, s: 'sfx/ding', v: 0.3},
  ...[25.2, 26.1, 27.1].map((a) => ({at: a, s: 'sfx/swish', v: 0.25})), {at: 28.5, s: 'tampon', v: 0.45}, {at: 29.9, s: 'validation', v: 0.3},
  ...[33.1, 34.7, 36.0, 36.9].map((a) => ({at: a, s: 'sfx/pop', v: 0.25})),
  {at: 40.6, s: 'soft-whoosh', v: 0.45, dur: 1.2}, {at: 41.0, s: 'stylo', v: 0.4}, ...[45.6, 46.3, 47.0].map((a) => ({at: a, s: 'stylo', v: 0.3})), ...[46.1, 46.8, 47.5].map((a) => ({at: a, s: 'sfx/ding', v: 0.18})), {at: 48.4, s: 'sfx/thud', v: 0.3},
  {at: 51.9, s: 'riser', v: 0.3, dur: 2.5}, {at: 54.2, s: 'bass-hit', v: 0.4},
  {at: 58.5, s: 'sfx/click', v: 0.2}, {at: 61.2, s: 'sfx/whoosh', v: 0.3}, {at: 62.0, s: 'sfx/ding', v: 0.3},
  {at: 65.0, s: 'sfx/pop', v: 0.2}, {at: 65.3, s: 'sfx/pop', v: 0.2}, {at: 65.6, s: 'sfx/pop', v: 0.2}, {at: 66.8, s: 'tampon', v: 0.4}, {at: 68.6, s: 'sfx/rise', v: 0.25}, ...rep(70.6, 6, 0.3, 'sfx/click', 0.15), {at: 71.0, s: 'validation', v: 0.35},
  {at: 74.6, s: 'sfx/whoosh', v: 0.35}, {at: 76.8, s: 'sfx/whoosh', v: 0.35}, {at: 78.6, s: 'bass-hit', v: 0.35},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const ProcVs: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Gate from={0} to={OUTRO_AT}><World /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={79.4}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-processus-procedure-origine.m4a')} trimAfter={s(79.6)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [random];
