import React from 'react';
import {AbsoluteFill, Audio, random, staticFile, useCurrentFrame} from 'remotion';
import {easeIn, easeInOut, easeOut, Gate, Kinetic, kf, prog, useT} from '../anim';
import {Captions} from '../components/Captions';
import {Backdrop, Check, shadow} from '../identui/IdentUi';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {colors, handFont, s, sansFont} from '../theme';
import {captions} from './captions';
import {NARR_END, SEG} from './timeline';

/**
 * « La gestion de l'accident du travail de A à Z » — UI motion premium (skill video-promo-diagnostic-qhse),
 * voix off masculine dynamique, et techniques de montage nouvelles dans la série :
 * transitions « page tournée » (chaque étape est une page de dossier), tableau à palettes (split-flap),
 * formulaire déchiré, diagramme de Venn qui converge puis perd un cercle, doubles comptes à rebours
 * en accéléré, enveloppe en vol sur trajectoire, tapis roulant de certificats avec écriture manuscrite,
 * loupe révélatrice sur dossier flou, éphéméride arraché page par page, électrocardiogramme,
 * cadenas à trois molettes, sablier, travelling compensé (dolly zoom) sur le dossier clos.
 */
const LOGO = 'promo/logo.png';
const RED = '#D9443A';
const A = (k: string) => SEG[k].start;
const Z = (k: string) => SEG[k].end;
const FLIP = 0.75;
/** Débuts des pages (accroche, sommaire, 5 étapes, conclusion). */
const C = [0, A('m0') - 0.5, A('a0') - 0.55, A('o0') - 0.55, A('d0') - 0.55, A('e0') - 0.55, A('r0') - 0.55, A('f1') - 0.55];
const OUTRO_AT = NARR_END + 0.7;
export const ACCIDENTAZ_FRAMES = s(OUTRO_AT + 3.8);

const At: React.FC<{x: number; y: number; children: React.ReactNode; style?: React.CSSProperties}> = ({x, y, children, style}) => (
  <div style={{position: 'absolute', left: x, top: y, transform: 'translate(-50%, -50%)', ...style}}>{children}</div>
);
const Label: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 34, color = colors.navy, style}) => (
  <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: size, color, textTransform: 'uppercase', letterSpacing: -0.5, textAlign: 'center', lineHeight: 1.05, ...style}}>{children}</div>
);
const pop = (t: number, at: number, d = 0.35) => prog(t, at, at + d, easeOut);

/* ─────────── Outils de montage ─────────── */

/** Page de dossier : tourne autour de son bord gauche pour révéler la suivante. */
const Page: React.FC<{i: number; children: React.ReactNode}> = ({i, children}) => {
  const t = useT();
  const from = i ? C[i] - FLIP : 0;
  const to = C[i + 1] ?? OUTRO_AT;
  if (t < from || t >= to) return null;
  const q = prog(t, to - FLIP, to, easeInOut);
  return (
    <AbsoluteFill style={{zIndex: 50 - i, transformOrigin: '0% 50%', transform: `perspective(2600px) rotateY(${-q * 105}deg)`, boxShadow: q > 0 ? `${30 * q}px 0 80px rgba(14,30,60,${0.35 * q})` : undefined}}>
      <Backdrop />
      {children}
      {q > 0 && <AbsoluteFill style={{background: `linear-gradient(90deg, rgba(14,30,60,${0.3 * q}) 0%, rgba(14,30,60,${0.08 * q}) 45%, rgba(255,255,255,${0.4 * q}) 100%)`}} />}
    </AbsoluteFill>
  );
};

/** Tremblement de caméra bref (impact). */
const Shake: React.FC<{at: number[]; children: React.ReactNode}> = ({at, children}) => {
  const t = useT();
  let a = 0;
  for (const x of at) if (t >= x && t < x + 0.35) a = Math.max(a, 1 - (t - x) / 0.35);
  const f = Math.floor(t * 30);
  return <AbsoluteFill style={{transform: a ? `translate(${(random(`sx${f}`) - 0.5) * 34 * a}px, ${(random(`sy${f}`) - 0.5) * 34 * a}px)` : undefined}}>{children}</AbsoluteFill>;
};

const CH = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
/** Palette de tableau d'affichage (split-flap) : défile puis se fige sur son caractère. */
const Flap: React.FC<{c: string; at: number; size: number; tone?: string}> = ({c, at, size, tone = colors.navy}) => {
  const f = useCurrentFrame();
  const t = f / 30;
  const vis = prog(t, at - 0.45, at - 0.3);
  if (c === ' ') return <div style={{width: size * 0.36}} />;
  const settled = t >= at;
  const ch = settled ? c : CH[Math.floor(random(`${c}${at}${Math.floor(f / 2)}`) * CH.length)];
  const fold = settled ? 1 - prog(t, at, at + 0.14) : (f % 2) * 0.5;
  return (
    <div style={{width: size * 0.74, height: size * 1.12, position: 'relative', background: tone, borderRadius: size * 0.1, overflow: 'hidden', opacity: vis, boxShadow: '0 8px 16px rgba(14,30,60,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: size * 0.84, color: '#fff'}}>
      <span style={{transform: `scaleY(${1 - 0.6 * fold})`, display: 'inline-block'}}>{ch}</span>
      <div style={{position: 'absolute', left: 0, right: 0, top: '50%', height: Math.max(2, size * 0.035), background: 'rgba(0,0,0,0.4)'}} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: '50%', background: 'rgba(255,255,255,0.07)'}} />
    </div>
  );
};
const FlapRow: React.FC<{text: string; at: number; size: number; gap?: number; tone?: string}> = ({text, at, size, gap = 0.05, tone}) => (
  <div style={{display: 'flex', gap: size * 0.08}}>
    {[...text].map((c, i) => <Flap key={i} c={c} at={at + i * gap} size={size} tone={tone} />)}
  </div>
);

/** Carton d'étape : palettes géantes, puis se range en étiquette en haut de page. */
const Chapter: React.FC<{n: number; title: string; at: number; until: number}> = ({n, title, at, until}) => {
  const t = useT();
  const k = prog(t, until, until + 0.55, easeInOut);
  const y = 860 + (330 - 860) * k;
  const sc = 1 - 0.62 * k;
  return (
    <div style={{position: 'absolute', left: 540, top: y, transform: `translate(-50%, -50%) scale(${sc})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26}}>
      <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 44, letterSpacing: 10, color: colors.green, opacity: prog(t, at + 0.2, at + 0.5)}}>ÉTAPE</div>
      <FlapRow text={`0${n}`} at={at + 0.55} size={230} gap={0.12} tone={colors.green} />
      <FlapRow text={title} at={at + 0.75} size={78} gap={0.04} />
    </div>
  );
};

/** Bruitages des palettes. */
const flapSfx = (at: number, n: number, gap = 0.05): Sfx[] => Array.from({length: Math.ceil(n / 2)}, (_, i) => ({at: at - 0.3 + i * gap * 2, s: 'sfx/click', v: 0.2}));

/* ─────────── Page 0 : accroche ─────────── */

const FormBody: React.FC = () => (
  <div style={{width: 760, height: 820, borderRadius: 30, background: '#fff', boxShadow: shadow, padding: '46px 54px', boxSizing: 'border-box'}}>
    <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
      <F n="clipboard" size={86} />
      <div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: colors.navy}}>DÉCLARATION</div>
        <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 26, color: '#8A93A0'}}>Accident du travail</div>
      </div>
    </div>
    {['Nom de la victime', 'Date et heure', 'Lieu', 'Circonstances', 'Lésions', 'Témoins'].map((l, i) => (
      <div key={l} style={{marginTop: i ? 26 : 50}}>
        <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 22, color: '#8A93A0'}}>{l}</div>
        <div style={{height: 50, borderRadius: 12, background: '#F3F4F6', marginTop: 8}} />
      </div>
    ))}
  </div>
);

const Hook: React.FC = () => {
  const t = useT();
  const inF = pop(t, 0.15, 0.6);
  const tear = prog(t, A('h2') - 0.25, A('h2') + 0.55, easeIn);
  const watch = pop(t, A('h2') - 0.2, 0.5);
  const into = prog(t, A('h3') - 0.15, A('h3') + 0.55, easeIn);
  const person = pop(t, A('h3') + 0.2, 0.5);
  const jag = 'polygon(0 0, 52% 0, 47% 12%, 54% 24%, 46% 38%, 53% 52%, 45% 66%, 52% 80%, 47% 100%, 0 100%)';
  const jagR = 'polygon(52% 0, 100% 0, 100% 100%, 47% 100%, 52% 80%, 45% 66%, 53% 52%, 46% 38%, 54% 24%, 47% 12%)';
  const ang = t * 300;
  return (
    <AbsoluteFill>
      {/* chronomètre (derrière le formulaire) */}
      {watch > 0 && into < 1 && (
        <At x={540} y={880} style={{transform: `translate(-50%, -50%) scale(${(0.6 + 0.4 * watch) * (1 + 3.2 * into)})`, opacity: 1 - into}}>
          <svg width={720} height={800} viewBox="-360 -420 720 800">
            <rect x={-40} y={-410} width={80} height={60} rx={14} fill={colors.navy} />
            <circle r={340} fill="#fff" stroke={colors.navy} strokeWidth={26} />
            {Array.from({length: 60}, (_, k) => {
              const a = (k / 60) * Math.PI * 2;
              const L = k % 5 ? 18 : 40;
              return <line key={k} x1={Math.sin(a) * 300} y1={-Math.cos(a) * 300} x2={Math.sin(a) * (300 - L)} y2={-Math.cos(a) * (300 - L)} stroke={k % 5 ? '#B9C0C8' : colors.navy} strokeWidth={k % 5 ? 4 : 9} />;
            })}
            <path d={`M0 0 L0 -280 A280 280 0 ${(ang % 360) > 180 ? 1 : 0} 1 ${Math.sin((ang * Math.PI) / 180) * 280} ${-Math.cos((ang * Math.PI) / 180) * 280} Z`} fill="rgba(217,68,58,0.14)" />
            <line x1={0} y1={30} x2={Math.sin((ang * Math.PI) / 180) * 270} y2={-Math.cos((ang * Math.PI) / 180) * 270} stroke={RED} strokeWidth={10} strokeLinecap="round" />
            <circle r={22} fill={colors.navy} />
          </svg>
        </At>
      )}
      {/* formulaire qui se déchire en deux */}
      {tear < 1 && (
        <At x={540} y={860} style={{opacity: inF, transform: `translate(-50%, -50%) translateY(${(1 - inF) * 80}px)`}}>
          <div style={{position: 'relative', width: 760, height: 820}}>
            <div style={{position: 'absolute', inset: 0, clipPath: jag, transform: `translate(${-tear * 520}px, ${tear * 420}px) rotate(${-tear * 22}deg)`}}><FormBody /></div>
            <div style={{position: 'absolute', inset: 0, clipPath: jagR, transform: `translate(${tear * 520}px, ${tear * 380}px) rotate(${tear * 26}deg)`}}><FormBody /></div>
          </div>
        </At>
      )}
      {/* la personne derrière chaque délai */}
      {person > 0 && (
        <At x={540} y={840} style={{transform: `translate(-50%, -50%) scale(${0.5 + 0.5 * person})`, opacity: person}}>
          {[0, 1, 2].map((r) => {
            const ph = ((t - A('h3') + r * 0.45) % 1.35) / 1.35;
            return <div key={r} style={{position: 'absolute', left: 260 - 260 * (0.7 + ph), top: 260 - 260 * (0.7 + ph), width: 520 * (0.7 + ph), height: 520 * (0.7 + ph), borderRadius: '50%', border: `5px solid rgba(46,155,62,${1 - ph})`}} />;
          })}
          <div style={{width: 520, height: 520, borderRadius: '50%', background: '#fff', boxShadow: shadow, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n="ouvrier-dark" size={360} /></div>
        </At>
      )}
      <Kinetic text="Pas un simple *formulaire*" at={0.6} until={A('h2') - 0.2} y={1430} size={78} />
      <Kinetic text="Une course contre *la montre*" at={A('h2')} until={A('h3') - 0.1} y={1430} size={78} accent={RED} />
      <Kinetic text="Derrière chaque délai : *une personne*" at={A('h3') + 0.1} y={1430} size={70} />
    </AbsoluteFill>
  );
};

/* ─────────── Page 1 : sommaire en tableau d'affichage ─────────── */

const MENU = ["L'ACCIDENT", 'OBLIGATIONS', 'LE MÉDECIN', "L'ENQUÊTE", 'LA RECHUTE'];
const menuAt = (i: number) => {
  const w = [11, 16, 11, 10, 11];
  const tot = w.reduce((a, b) => a + b, 0);
  const cum = w.slice(0, i).reduce((a, b) => a + b, 0);
  return A('m1') + ((Z('m1') - A('m1')) * cum) / tot;
};
const Menu: React.FC = () => {
  const t = useT();
  const go = pop(t, A('m2'), 0.3);
  return (
    <AbsoluteFill>
      <At x={540} y={420}><FlapRow text="DE A À Z" at={A('m0') + 0.6} size={120} gap={0.08} tone={colors.green} /></At>
      <At x={540} y={560} style={{opacity: pop(t, A('m0') + 0.2)}}><Label size={30} color="#8A93A0" style={{letterSpacing: 8}}>5 étapes · le parcours complet</Label></At>
      {MENU.map((m, i) => {
        const at = menuAt(i);
        const lit = prog(t, at + 0.3, at + 0.5);
        return (
          <div key={m} style={{position: 'absolute', left: 90, top: 660 + i * 172, width: 900, height: 140, borderRadius: 26, background: go > 0 ? `rgba(46,155,62,${0.12 * go})` : '#fff', boxShadow: shadow, display: 'flex', alignItems: 'center', gap: 22, padding: '0 24px', boxSizing: 'border-box', opacity: prog(t, A('m0') + 0.3 + i * 0.08, A('m0') + 0.6 + i * 0.08), transform: `translateX(${(1 - prog(t, A('m0') + 0.3 + i * 0.08, A('m0') + 0.7 + i * 0.08)) * 120}px)`}}>
            <FlapRow text={`0${i + 1}`} at={at} size={70} tone={colors.green} />
            <FlapRow text={m} at={at + 0.06} size={58} gap={0.03} />
            <div style={{marginLeft: 'auto', width: 30, height: 30, borderRadius: 15, background: lit ? colors.green : '#D5D9DE', boxShadow: lit ? '0 0 22px rgba(46,155,62,0.9)' : 'none'}} />
          </div>
        );
      })}
      <Kinetic text="C'est *parti* !" at={A('m2')} y={1560} size={96} />
    </AbsoluteFill>
  );
};

/* ─────────── Page 2 : l'accident (règle de trois) ─────────── */

const Venn: React.FC = () => {
  const t = useT();
  const R = 230;
  const yank = prog(t, A('a5') + 0.15, A('a5') + 0.75, easeIn);
  const circles = [
    {x: 390, y: 840, from: [-700, 0], at: A('a2'), c: colors.navy, n: 'eclair', l: 'Soudain · daté · localisé', lx: -70, ly: -60},
    {x: 690, y: 840, from: [700, 0], at: A('a3'), c: colors.green, n: 'employeur', l: "Sous l'autorité de l'employeur", lx: 70, ly: -60},
    {x: 540, y: 1100, from: [0, 900], at: A('a4'), c: colors.ochre, n: 'pansement2', l: 'Lésion physique ou psychique', lx: 0, ly: 90},
  ];
  const all = pop(t, Z('a4') - 0.3, 0.4);
  const fail = prog(t, A('a5') + 0.6, A('a5') + 0.9);
  const stamp = pop(t, A('a5') + 1.3, 0.25);
  return (
    <AbsoluteFill>
      <Kinetic text="La règle de *trois*" at={A('a1')} y={480} size={84} />
      {circles.map((c, i) => {
        const p = prog(t, c.at - 0.35, c.at + 0.35, easeOut);
        const dy = i === 2 ? yank * 1100 : 0;
        return (
          <div key={i} style={{position: 'absolute', left: c.x - R + c.from[0] * (1 - p), top: c.y - R + c.from[1] * (1 - p) + dy, width: R * 2, height: R * 2, borderRadius: '50%', background: c.c, opacity: 0.82 * p, mixBlendMode: 'multiply'}}>
            <div style={{position: 'absolute', left: R - 150 + c.lx, top: R - 150 + c.ly, width: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6}}>
              <F n={c.n} size={110} />
              <Label size={27} color="#fff">{c.l}</Label>
            </div>
          </div>
        );
      })}
      {all > 0 && (
        <At x={540} y={940} style={{transform: `translate(-50%, -50%) scale(${all})`}}>
          <div style={{width: 150, height: 150, borderRadius: 75, background: fail ? RED : '#fff', border: `8px solid ${fail ? '#fff' : colors.green}`, boxShadow: shadow, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: fail ? '#fff' : colors.navy}}>{fail ? '✕' : 'AT'}</div>
        </At>
      )}
      {stamp > 0 && (
        <At x={540} y={1380} style={{transform: `translate(-50%, -50%) scale(${2.2 - 1.2 * stamp}) rotate(-6deg)`, opacity: stamp}}>
          <div style={{border: `9px solid ${RED}`, color: RED, borderRadius: 20, padding: '10px 34px', fontFamily: sansFont, fontWeight: 900, fontSize: 64, background: 'rgba(255,255,255,0.92)', whiteSpace: 'nowrap'}}>PAS UN ACCIDENT DU TRAVAIL</div>
        </At>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Page 3 : obligations (comptes à rebours, enveloppe) ─────────── */

const Dial: React.FC<{x: number; y: number; hours: number; at: number; label: string; who: [string, string]}> = ({x, y, hours, at, label, who}) => {
  const t = useT();
  const p = pop(t, at - 0.3, 0.5);
  // accéléré : le temps restant fond vite puis ralentit
  const run = prog(t, at + 0.3, at + 3.2, easeOut);
  const left = hours * (1 - 0.82 * run);
  const hh = Math.floor(left);
  const mm = Math.floor((left - hh) * 60);
  const ss = Math.floor((((left - hh) * 60) % 1) * 60);
  const pad = (n: number) => String(n).padStart(2, '0');
  const r = 170;
  const circ = 2 * Math.PI * r;
  return (
    <At x={x} y={y} style={{opacity: p, transform: `translate(-50%, -50%) scale(${0.7 + 0.3 * p})`}}>
      <div style={{position: 'relative', width: 420, height: 420}}>
        <svg width={420} height={420} style={{position: 'absolute', inset: 0}}>
          <circle cx={210} cy={210} r={r + 26} fill="#fff" style={{filter: 'drop-shadow(0 20px 30px rgba(14,30,60,0.18))'}} />
          <circle cx={210} cy={210} r={r} fill="none" stroke="#E7E9EE" strokeWidth={24} />
          <circle cx={210} cy={210} r={r} fill="none" stroke={left / hours < 0.4 ? RED : colors.green} strokeWidth={24} strokeLinecap="round" strokeDasharray={`${circ * (left / hours)} ${circ}`} transform="rotate(-90 210 210)" />
        </svg>
        <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 112, color: colors.navy, lineHeight: 1}}>{hours}H</div>
          <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 32, color: '#8A93A0', fontVariantNumeric: 'tabular-nums'}}>{pad(hh)}:{pad(mm)}:{pad(ss)}</div>
        </div>
      </div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 14}}>
        <F n={who[0]} size={84} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: colors.green}}>→</div><F n={who[1]} size={84} />
      </div>
      <Label size={28} style={{marginTop: 6}}>{label}</Label>
    </At>
  );
};

const Doc: React.FC<{title: string; n: string; badge: string; sub: string; accent: string}> = ({title, n, badge, sub, accent}) => (
  <div style={{width: 430, height: 560, borderRadius: 30, background: '#fff', boxShadow: shadow, overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    <div style={{alignSelf: 'stretch', height: 22, background: accent}} />
    <F n={n} size={150} style={{marginTop: 34}} />
    <Label size={38} style={{marginTop: 18, padding: '0 20px'}}>{title}</Label>
    <div style={{marginTop: 24, background: accent, color: '#fff', borderRadius: 40, padding: '10px 26px', fontFamily: sansFont, fontWeight: 900, fontSize: 36}}>{badge}</div>
    <Label size={24} color="#8A93A0" style={{marginTop: 18, padding: '0 30px'}}>{sub}</Label>
  </div>
);

const Obligations: React.FC = () => {
  const t = useT();
  const push = prog(t, A('o3') - 0.4, A('o3') + 0.2, easeInOut);
  // trajectoire de l'enveloppe : employeur → CPAM
  const fly = prog(t, A('o2') + 1.4, A('o2') + 2.6, easeInOut);
  const bx = (u: number) => (1 - u) ** 2 * 230 + 2 * (1 - u) * u * 540 + u * u * 850;
  const by = (u: number) => (1 - u) ** 2 * 1300 + 2 * (1 - u) * u * 1040 + u * u * 1300;
  const doc1 = pop(t, A('o3') + 0.1, 0.5);
  const doc2 = pop(t, A('o4') + 0.1, 0.5);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{transform: `translateY(${-push * 1400}px)`}}>
        <Dial x={300} y={760} hours={24} at={A('o1')} label="Salarié → employeur" who={['salarie', 'employeur']} />
        <Dial x={780} y={760} hours={48} at={A('o2')} label="Employeur → CPAM" who={['employeur', 'batiment']} />
        <div style={{opacity: pop(t, A('o2') + 1.0)}}>
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            <path d="M230 1300 Q540 1040 850 1300" fill="none" stroke={colors.navy} strokeWidth={5} strokeDasharray="4 16" strokeLinecap="round" opacity={0.4} />
            <path d="M230 1300 Q540 1040 850 1300" fill="none" stroke={colors.green} strokeWidth={8} strokeLinecap="round" pathLength={1} strokeDasharray={`${fly} 1`} />
          </svg>
          <At x={180} y={1330}><F n="employeur" size={150} /></At>
          <At x={900} y={1320}><div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}><F n="batiment" size={150} /><Label size={32}>CPAM</Label></div></At>
          {fly > 0 && fly < 1 && (
            <At x={bx(fly)} y={by(fly) - 30} style={{transform: `translate(-50%, -50%) rotate(${(fly - 0.5) * 50}deg) scale(${1 + Math.sin(fly * Math.PI) * 0.3})`}}><F n="enveloppe" size={120} /></At>
          )}
          {fly >= 1 && <At x={900} y={1180} style={{transform: `translate(-50%, -50%) scale(${pop(t, A('o2') + 2.6, 0.3)})`}}><Check p={prog(t, A('o2') + 2.7, A('o2') + 3.0)} size={80} /></At>}
          <At x={540} y={1470} style={{opacity: pop(t, A('o2') + 1.2)}}><Label size={30}>DAT · déclaration d'accident du travail</Label></At>
        </div>
      </AbsoluteFill>
      {doc1 > 0 && <At x={300} y={900} style={{transform: `translate(-50%, -50%) translateY(${(1 - doc1) * 700}px) rotate(${(1 - doc1) * -14 - 3}deg)`}}><Doc title="Feuille d'accident" n="pansement2" badge="0 € avancé" sub="Soins pris en charge" accent={colors.green} /></At>}
      {doc2 > 0 && <At x={780} y={940} style={{transform: `translate(-50%, -50%) translateY(${(1 - doc2) * 700}px) rotate(${(1 - doc2) * 14 + 3}deg)`}}><Doc title="Attestation de salaire" n="argent" badge="IJ" sub="Indemnités journalières (si arrêt)" accent={colors.navy} /></At>}
      <Kinetic text="Le chrono *démarre*" at={A('o1')} until={A('o3') - 0.4} y={470} size={80} accent={RED} />
      <Kinetic text="Et ce n'est pas *tout*" at={A('o3')} y={470} size={80} />
    </AbsoluteFill>
  );
};

/* ─────────── Page 4 : le médecin (tapis roulant de certificats) ─────────── */

const CERTS = [
  {k: 'd1', t: 'Initial', sub: 'Fige la situation · jour J', c: colors.navy},
  {k: 'd2', t: 'De prolongation', sub: 'La guérison prend plus de temps', c: colors.ochre},
  {k: 'd3', t: 'Final', sub: "L'état est stabilisé", c: colors.green},
  {k: 'd4', t: 'De rechute', sub: 'Dégradation après la clôture', c: RED},
];
const Doctor: React.FC = () => {
  const t = useT();
  const pos = CERTS.reduce((a, c, i) => a + (i ? prog(t, A(c.k) - 0.35, A(c.k) + 0.25, easeInOut) : 0), 0);
  const belt = pos * 640;
  return (
    <AbsoluteFill>
      <At x={180} y={520} style={{opacity: pop(t, A('d1') - 0.4), transform: `translate(-50%, -50%) rotate(${Math.sin(t * 2) * 3}deg)`}}><F n="medecin" size={210} /></At>
      <div style={{position: 'absolute', left: 300, top: 470, opacity: pop(t, A('d1') - 0.3)}}>
        <div style={{fontFamily: handFont, fontSize: 56, color: colors.navy}}>Sa plume =</div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: colors.green}}>LE MOTEUR DU DOSSIER</div>
      </div>
      {CERTS.map((c, i) => {
        const x = 540 + i * 640 - belt;
        const appear = pop(t, A(c.k) - 0.5, 0.4);
        const write = prog(t, A(c.k) + 0.1, A(c.k) + 1.2, (v) => v);
        const sign = prog(t, A(c.k) + 1.0, A(c.k) + 1.8, easeInOut);
        const act = 1 - Math.min(1, Math.abs(i - pos));
        return (
          <At key={c.k} x={x} y={960} style={{transform: `translate(-50%, -50%) scale(${0.8 + 0.2 * act}) rotate(${(i - pos) * 4}deg)`, opacity: appear * (0.45 + 0.55 * act)}}>
            <div style={{width: 560, height: 620, borderRadius: 26, background: '#FFFEFA', boxShadow: shadow, overflow: 'hidden', position: 'relative'}}>
              <div style={{height: 20, background: c.c}} />
              <div style={{padding: '34px 40px'}}>
                <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 28, letterSpacing: 6, color: '#8A93A0'}}>CERTIFICAT MÉDICAL</div>
                <div style={{fontFamily: handFont, fontSize: 92, color: c.c, lineHeight: 1.05, marginTop: 20, clipPath: `inset(0 ${100 - write * 100}% 0 0)`}}>{c.t}</div>
                <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 30, color: colors.ink, marginTop: 22}}>{c.sub}</div>
                {[0, 1, 2].map((l) => <div key={l} style={{height: 14, borderRadius: 7, background: '#ECEEF2', marginTop: 26, width: `${90 - l * 18}%`}} />)}
              </div>
              <svg width={560} height={140} style={{position: 'absolute', left: 0, bottom: 20}}>
                <path d="M300 90 C 330 30, 350 120, 380 60 S 430 40, 450 90 S 500 70, 520 50" fill="none" stroke={colors.navy} strokeWidth={5} strokeLinecap="round" pathLength={1} strokeDasharray={`${sign} 1`} />
                <line x1={290} y1={110} x2={530} y2={110} stroke="#D5D9DE" strokeWidth={3} />
              </svg>
              <div style={{position: 'absolute', left: 40, bottom: 40}}><F n="stethoscope" size={90} /></div>
            </div>
          </At>
        );
      })}
      {/* tapis roulant */}
      <div style={{position: 'absolute', left: 40, right: 40, top: 1300, height: 70, borderRadius: 35, background: colors.navy, boxShadow: shadow, overflow: 'hidden', opacity: pop(t, A('d1') - 0.5)}}>
        {Array.from({length: 14}, (_, k) => (
          <div key={k} style={{position: 'absolute', top: 15, left: ((k * 80 - belt * 0.9) % 1120 + 1120) % 1120 - 40, width: 40, height: 40, borderRadius: 20, border: '5px solid rgba(255,255,255,0.35)', boxSizing: 'border-box'}} />
        ))}
      </div>
      <At x={540} y={1450} style={{opacity: pop(t, A('d1'))}}><Label size={30} color="#8A93A0">{`${Math.min(4, Math.round(pos) + 1)} / 4 documents`}</Label></At>
    </AbsoluteFill>
  );
};

/* ─────────── Page 5 : l'enquête (loupe, éphéméride, décision) ─────────── */

const DOSSIER = ["Réserves de l'employeur", 'Circonstances floues', 'Témoins à entendre', 'Faits à préciser'];
const DossierCard: React.FC<{sharp: boolean}> = ({sharp}) => (
  <div style={{width: 840, height: 660, borderRadius: 30, background: '#fff', padding: '40px 50px', boxSizing: 'border-box', filter: sharp ? 'none' : 'blur(9px)', boxShadow: sharp ? 'none' : shadow}}>
    <div style={{display: 'flex', alignItems: 'center', gap: 18}}><F n="dossier" size={90} /><Label size={42}>Dossier n° AT-EXEMPLE</Label></div>
    {DOSSIER.map((d, i) => (
      <div key={d} style={{display: 'flex', alignItems: 'center', gap: 20, marginTop: 34}}>
        <div style={{width: 44, height: 44, borderRadius: 12, background: i < 2 ? RED : colors.ochre, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 30, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>?</div>
        <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 38, color: colors.ink}}>{d}</div>
      </div>
    ))}
  </div>
);
const Inquiry: React.FC = () => {
  const t = useT();
  const d = pop(t, A('e1') - 0.4, 0.5);
  const out = prog(t, A('e2') - 0.3, A('e2') + 0.3, easeIn);
  const u = prog(t, A('e1') - 0.1, Z('e1') + 0.2, easeInOut);
  const lx = 270 + 520 * Math.sin(u * Math.PI * 1.2) ** 2;
  const ly = 790 + u * 380;
  // éphéméride : 10 jours arrachés un à un
  const cal = pop(t, A('e2') + 0.1, 0.45);
  const tearT = (k: number) => A('e2') + 0.7 + k * ((Z('e2') - A('e2') - 0.5) / 9);
  const torn = Array.from({length: 9}, (_, k) => t >= tearT(k)).filter(Boolean).length;
  const calUp = prog(t, A('e3') - 0.3, A('e3') + 0.3, easeInOut);
  const notes = [0, 1, 2, 3].map((k) => pop(t, A('e3') + 0.9 + k * 0.55, 0.3));
  const verdict = pop(t, A('e4') + 0.9, 0.25);
  return (
    <Shake at={[A('e4') + 0.9]}>
      <Kinetic text="La CPAM *enquête*" at={A('e1') - 0.3} until={A('e2') - 0.2} y={480} size={84} />
      {out < 1 && d > 0 && (
        <div style={{position: 'absolute', left: 120, top: 640, opacity: d, transform: `translateX(${-out * 1200}px) rotate(${-out * 10}deg)`}}>
          <DossierCard sharp={false} />
          <div style={{position: 'absolute', inset: 0, clipPath: `circle(150px at ${lx - 120}px ${ly - 640}px)`}}><DossierCard sharp /></div>
          <div style={{position: 'absolute', left: lx - 120 - 160, top: ly - 640 - 160, width: 320, height: 320, borderRadius: '50%', border: `14px solid ${colors.navy}`, boxShadow: 'inset 0 0 30px rgba(255,255,255,0.6), 0 20px 40px rgba(14,30,60,0.3)'}}>
            <div style={{position: 'absolute', left: 250, top: 250, width: 160, height: 40, borderRadius: 20, background: colors.navy, transform: 'rotate(45deg)', transformOrigin: '0 50%'}} />
          </div>
        </div>
      )}
      {cal > 0 && (
        <At x={540} y={880 - calUp * 330} style={{transform: `translate(-50%, -50%) scale(${(0.7 + 0.3 * cal) * (1 - 0.42 * calUp)})`, opacity: cal}}>
          <div style={{position: 'relative', width: 520, height: 560}}>
            <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 110, borderRadius: '30px 30px 0 0', background: RED, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Label size={40} color="#fff">Phase contradictoire</Label></div>
            {Array.from({length: 10}, (_, k) => 9 - k).map((k) => {
              const gone = k < torn;
              const tp = gone ? prog(t, tearT(k), tearT(k) + 0.6, easeIn) : 0;
              if (tp >= 1) return null;
              return (
                <div key={k} style={{position: 'absolute', left: 0, right: 0, top: 110, height: 450, borderRadius: '0 0 30px 30px', background: '#fff', boxShadow: k === torn ? shadow : '0 2px 4px rgba(0,0,0,0.06)', transformOrigin: '50% 0%', transform: `translate(${tp * 380}px, ${-tp * 520}px) rotate(${tp * 38}deg)`, opacity: 1 - tp * 0.6, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                  <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 40, color: '#8A93A0'}}>JOUR</div>
                  <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 230, color: k === 9 ? RED : colors.navy, lineHeight: 1}}>{k + 1}</div>
                </div>
              );
            })}
          </div>
          {torn >= 9 && <div style={{position: 'absolute', left: 260, top: 480, transform: `translate(-50%, -50%) scale(${2 - pop(t, tearT(8) + 0.5, 0.25)}) rotate(-8deg)`, opacity: pop(t, tearT(8) + 0.5, 0.25), border: `8px solid ${RED}`, color: RED, borderRadius: 18, padding: '6px 26px', fontFamily: sansFont, fontWeight: 900, fontSize: 52, background: 'rgba(255,255,255,0.92)', whiteSpace: 'nowrap'}}>PAS UN DE PLUS</div>}
        </At>
      )}
      {calUp > 0 && (
        <>
          <At x={180} y={1180} style={{opacity: pop(t, A('e3') + 0.2), transform: `translate(-50%, -50%) translateX(${(1 - pop(t, A('e3') + 0.2, 0.5)) * -300}px)`}}><div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}><F n="employeur" size={190} /><Label size={28}>Employeur</Label></div></At>
          <At x={900} y={1180} style={{opacity: pop(t, A('e3') + 0.4), transform: `translate(-50%, -50%) translateX(${(1 - pop(t, A('e3') + 0.4, 0.5)) * 300}px)`}}><div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}><F n="salarie" size={190} /><Label size={28}>Salarié</Label></div></At>
          <At x={540} y={1170} style={{opacity: pop(t, A('e3'))}}>
            <div style={{position: 'relative', width: 400, height: 380}}>
              <F n="dossier" size={300} style={{position: 'absolute', left: 50, top: 40}} />
              {notes.map((n, k) => n > 0 && (
                <div key={k} style={{position: 'absolute', left: [10, 210, 40, 230][k], top: [20, 0, 210, 200][k], width: 160, height: 120, background: '#FFE27A', boxShadow: '0 10px 18px rgba(0,0,0,0.18)', transform: `scale(${n}) rotate(${[-8, 6, 5, -6][k]}deg)`, fontFamily: handFont, fontSize: 30, color: colors.ink, padding: 12, boxSizing: 'border-box', lineHeight: 1}}>{['Observation', 'Pièce ajoutée', 'Témoignage', 'Précision'][k]}</div>
              ))}
            </div>
          </At>
        </>
      )}
      {verdict > 0 && (
        <At x={540} y={1460} style={{transform: `translate(-50%, -50%) scale(${2.4 - 1.4 * verdict}) rotate(-5deg)`, opacity: verdict}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 16, border: `9px solid ${colors.navy}`, color: colors.navy, borderRadius: 20, padding: '8px 30px', fontFamily: sansFont, fontWeight: 900, fontSize: 70, background: 'rgba(255,255,255,0.94)'}}><F n="juge2" size={80} />DÉCISION</div>
        </At>
      )}
    </Shake>
  );
};

/* ─────────── Page 6 : la rechute (ECG, 15 %, cadenas, sablier) ─────────── */

const ecg = (x: number, spikeAt: number[], amp: number) => {
  let y = Math.sin(x / 40) * 4;
  for (const s0 of spikeAt) {
    const d = x - s0;
    if (d > -40 && d < 60) y += d < 0 ? -amp * 0.25 * (1 + d / 40) : d < 20 ? amp * (d / 20) : d < 40 ? amp * (1 - (d - 20) / 10) : -amp * 0.4 * (1 - (d - 40) / 20);
  }
  return y;
};
const Relapse: React.FC = () => {
  const t = useT();
  // électrocardiogramme qui défile ; pic rouge à la rechute
  const scroll = t * 260;
  const bigSpike = prog(t, A('r1') - 0.2, A('r1') + 0.2);
  const pts: string[] = [];
  for (let x = 0; x <= 1080; x += 6) {
    const wx = x + scroll;
    const beats = [Math.floor(wx / 360) * 360 + 180];
    const isBig = Math.abs(x - 760) < 70;
    pts.push(`${x},${560 - ecg(wx, beats, isBig ? 30 + 120 * bigSpike : 30)}`);
  }
  const n15 = Math.round(15 * prog(t, A('r1') + 0.2, A('r1') + 1.6, easeOut));
  const block1 = 1 - prog(t, A('r2') + 0.1, A('r2') + 0.4);
  const sectors = pop(t, A('r2') + 0.3, 0.45) * (1 - prog(t, A('r3') - 0.3, A('r3')));
  const quiet = prog(t, A('r2') + 1.6, Z('r2') - 0.3, (v) => v);
  const lock = pop(t, A('r3') - 0.1, 0.5) * (1 - prog(t, A('r7') - 0.3, A('r7') + 0.1));
  const conds = ['r4', 'r5', 'r6'];
  const open = prog(t, Z('r6') + 0.05, Z('r6') + 0.45, easeOut);
  const glass = pop(t, A('r7') - 0.1, 0.5);
  const sand = prog(t, A('r7') + 0.3, Z('r7') + 0.6, (v) => v);
  return (
    <AbsoluteFill>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: pop(t, A('r0') + 1.5)}}>
        <polyline points={pts.join(' ')} fill="none" stroke={bigSpike > 0.5 && t < A('r2') ? RED : colors.green} strokeWidth={6} strokeLinejoin="round" />
      </svg>
      {block1 > 0 && (
        <div style={{opacity: block1 * pop(t, A('r1') - 0.1)}}>
          <At x={540} y={760}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 230, color: RED, lineHeight: 1}}>≈{n15}%</div></At>
          <At x={540} y={950}><Label size={34}>des accidents du travail rechutent</Label></At>
          <div style={{position: 'absolute', left: 240, top: 1010, width: 600, display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 12}}>
            {Array.from({length: 100}, (_, k) => {
              const red = k < 15 && prog(t, A('r1') + 0.3 + k * 0.08, A('r1') + 0.5 + k * 0.08) > 0;
              return <div key={k} style={{height: 46, borderRadius: 23, background: red ? RED : '#D5D9DE', transform: red ? 'scale(1.12)' : undefined}} />;
            })}
          </div>
          <At x={540} y={1585}><Label size={22} color="#8A93A0">Ordre de grandeur cité par la vidéo d'origine</Label></At>
        </div>
      )}
      {sectors > 0 && (
        <div style={{opacity: sectors}}>
          {[{n: 'chantier', l: 'BTP', x: 300}, {n: 'usine2', l: 'Industrie', x: 780}].map((c, i) => (
            <At key={c.l} x={c.x} y={850} style={{transform: `translate(-50%, -50%) scale(${pop(t, A('r2') + 0.3 + i * 0.25, 0.4)})`}}>
              <div style={{width: 360, height: 360, borderRadius: 40, background: '#fff', boxShadow: shadow, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}><F n={c.n} size={210} /><Label size={40}>{c.l}</Label></div>
            </At>
          ))}
          {/* douleur silencieuse pendant des mois… puis qui explose */}
          <svg width={1080} height={300} style={{position: 'absolute', left: 0, top: 1110}}>
            {Array.from({length: 40}, (_, k) => {
              const burst = k > 30 ? prog(t, Z('r2') - 0.6, Z('r2') - 0.2) : 0;
              const h = 6 + burst * (60 + random(`b${k}`) * 120) + (1 - quiet) * 0;
              const on = k / 40 < quiet;
              return <rect key={k} x={60 + k * 24.5} y={150 - h / 2} width={14} height={h} rx={7} fill={burst > 0 ? RED : on ? colors.navy : '#D5D9DE'} />;
            })}
          </svg>
          <At x={540} y={1430}><Label size={32} color="#8A93A0">Des mois de silence… puis la douleur revient</Label></At>
        </div>
      )}
      {lock > 0 && (
        <div style={{opacity: lock}}>
          <Kinetic text="3 conditions" at={A('r3')} until={A('r7') - 0.2} y={470} size={80} />
          <At x={540} y={830} style={{transform: `translate(-50%, -50%) scale(${0.7 + 0.3 * lock})`}}>
            <svg width={560} height={600} viewBox="0 0 560 600">
              <path d="M150 300 V180 A130 130 0 0 1 410 180 V300" fill="none" stroke="#8A93A0" strokeWidth={44} strokeLinecap="round" transform={`translate(0 ${-open * 70}) rotate(${open * -18} 150 300)`} />
              <rect x={60} y={270} width={440} height={320} rx={50} fill={open >= 1 ? colors.green : colors.navy} />
            </svg>
            <div style={{position: 'absolute', left: 105, top: 350, display: 'flex', gap: 22}}>
              {conds.map((k) => {
                const roll = prog(t, A(k) - 0.1, A(k) + 0.45, easeOut);
                return (
                  <div key={k} style={{width: 102, height: 160, borderRadius: 18, background: '#fff', overflow: 'hidden', position: 'relative', boxShadow: 'inset 0 10px 18px rgba(0,0,0,0.25)'}}>
                    <div style={{position: 'absolute', left: 0, right: 0, top: -roll * 160, height: 320}}>
                      <div style={{height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 80, color: RED}}>✕</div>
                      <div style={{height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 80, color: colors.green}}>✓</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </At>
          <div style={{position: 'absolute', left: 110, top: 1180, display: 'flex', flexDirection: 'column', gap: 22}}>
            {[['r4', 'Lien direct avec l’accident d’origine'], ['r5', 'Aggravation réelle de l’état de santé'], ['r6', 'Aucune consolidation définitive avant']].map(([k, l]) => (
              <div key={k} style={{display: 'flex', alignItems: 'center', gap: 20, opacity: pop(t, A(k) - 0.15), transform: `translateX(${(1 - pop(t, A(k) - 0.15, 0.4)) * -80}px)`}}>
                <Check p={prog(t, A(k) + 0.3, A(k) + 0.7)} size={58} />
                <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 36, color: colors.ink}}>{l}</div>
              </div>
            ))}
          </div>
          {open > 0 && <At x={540} y={540} style={{transform: `translate(-50%, -50%) scale(${open})`}}><div style={{background: colors.green, color: '#fff', borderRadius: 40, padding: '12px 34px', fontFamily: sansFont, fontWeight: 900, fontSize: 44, whiteSpace: 'nowrap'}}>RECHUTE RECONNUE</div></At>}
        </div>
      )}
      {glass > 0 && (
        <AbsoluteFill style={{opacity: glass}}>
          <At x={540} y={880} style={{transform: `translate(-50%, -50%) scale(${0.7 + 0.3 * glass}) rotate(${kf(t, [A('r7') - 0.1, A('r7') + 0.4], [180, 0])}deg)`}}>
            <svg width={420} height={620} viewBox="0 0 420 620">
              <rect x={20} y={0} width={380} height={40} rx={20} fill={colors.navy} />
              <rect x={20} y={580} width={380} height={40} rx={20} fill={colors.navy} />
              <path d="M60 40 C 60 200, 190 250, 190 310 C 190 370, 60 420, 60 580 H360 C 360 420, 230 370, 230 310 C 230 250, 360 200, 360 40 Z" fill="rgba(255,255,255,0.85)" stroke={colors.navy} strokeWidth={8} />
              <clipPath id="sandTop"><path d="M60 40 C 60 200, 190 250, 190 310 C 230 250, 360 200, 360 40 Z" /></clipPath>
              <clipPath id="sandBot"><path d="M190 310 C 190 370, 60 420, 60 580 H360 C 360 420, 230 370, 230 310 Z" /></clipPath>
              <rect x={40} y={60 + sand * 250} width={340} height={260} fill={colors.ochre} clipPath="url(#sandTop)" />
              <rect x={40} y={580 - sand * 230} width={340} height={240} fill={colors.ochre} clipPath="url(#sandBot)" />
              {sand > 0 && sand < 1 && <rect x={206} y={310} width={8} height={270} fill={colors.ochre} />}
            </svg>
          </At>
          <At x={540} y={1300}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 130, color: colors.navy, lineHeight: 1, whiteSpace: 'nowrap'}}>60 JOURS</div></At>
          <At x={540} y={1430}><Label size={32} color="#8A93A0">pour que la caisse statue sur la rechute</Label></At>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Page 7 : conclusion (travelling compensé) ─────────── */

const Finale: React.FC = () => {
  const t = useT();
  const dz = prog(t, A('f1') - 0.2, Z('f1') + 0.3, easeInOut);
  const q = pop(t, A('f1') + 1.2, 0.4);
  const go = prog(t, A('f2') - 0.1, A('f2') + 0.5, easeInOut);
  const line = prog(t, A('f2') + 0.2, Z('f2') + 0.2, easeInOut);
  return (
    <AbsoluteFill>
      {/* tunnel : le décor s'ouvre pendant que le sujet reste fixe (vertigo) */}
      <AbsoluteFill style={{opacity: 1 - go}}>
        {Array.from({length: 7}, (_, k) => {
          const sz = (260 + k * 190) * (1 + dz * 0.9);
          return <div key={k} style={{position: 'absolute', left: 540 - sz / 2, top: 860 - sz / 2, width: sz, height: sz, borderRadius: 40 + k * 10, border: `3px solid rgba(14,42,92,${0.16 - k * 0.018})`}} />;
        })}
        <At x={540} y={860} style={{transform: `translate(-50%, -50%) scale(${1.15 - 0.2 * dz})`}}>
          <div style={{position: 'relative'}}>
            <F n="dossier" size={420} />
            <div style={{position: 'absolute', left: 90, top: 170, transform: `rotate(-12deg) scale(${pop(t, A('f1') + 0.3, 0.25) ? 2 - pop(t, A('f1') + 0.3, 0.25) : 0})`, border: `8px solid ${colors.green}`, color: colors.green, borderRadius: 16, padding: '4px 22px', fontFamily: sansFont, fontWeight: 900, fontSize: 64, background: 'rgba(255,255,255,0.9)'}}>CLOS</div>
            {q > 0 && <div style={{position: 'absolute', left: 330, top: -60, transform: `scale(${q}) rotate(${(1 - q) * 30}deg)`, fontFamily: sansFont, fontWeight: 900, fontSize: 220, color: RED}}>?</div>}
          </div>
        </At>
        <Kinetic text="Dossier clos = *victoire* ?" at={A('f1')} until={A('f2') - 0.1} y={1400} size={80} accent={RED} />
      </AbsoluteFill>
      {go > 0 && (
        <AbsoluteFill style={{opacity: go}}>
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            <line x1={80} y1={860} x2={80 + 920 * line} y2={860} stroke={colors.green} strokeWidth={10} strokeLinecap="round" />
          </svg>
          {[['Accident', 0.05, 'collision'], ['Certificat final', 0.42, 'parchemin'], ['Suivi', 0.75, 'stethoscope'], ['Prévention', 0.98, 'bouclier']].map(([l, u, n], k) => (
            <At key={k} x={80 + 920 * (u as number)} y={860} style={{opacity: line >= (u as number) ? 1 : 0, transform: `translate(-50%, -50%) scale(${line >= (u as number) ? 1 : 0.4})`}}>
              <div style={{width: 120, height: 120, borderRadius: 60, background: '#fff', boxShadow: shadow, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `5px solid ${k === 1 ? colors.navy : colors.green}`}}><F n={n as string} size={78} /></div>
              <div style={{position: 'absolute', left: 60, top: k % 2 ? -70 : 150, transform: 'translateX(-50%)', whiteSpace: 'nowrap'}}><Label size={28}>{l}</Label></div>
            </At>
          ))}
          <Kinetic text="Le suivi *continue*" at={A('f2')} until={A('f3') - 0.1} y={520} size={84} />
          <Kinetic text="La prévention *non plus*" at={A('f3')} y={1220} size={92} />
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Son ─────────── */

const CHAP = [C[2], C[3], C[4], C[5], C[6]];
const TITLES = ["L'ACCIDENT", 'OBLIGATIONS', 'LE MÉDECIN', "L'ENQUÊTE", 'LA RECHUTE'];
const CUES: Sfx[] = [
  {at: 0.05, s: 'bass-hit', v: 0.5},
  {at: 0.2, s: 'page', v: 0.5},
  {at: A('h2') - 0.25, s: 'page', v: 0.7},
  {at: A('h2') - 0.2, s: 'sfx/swish', v: 0.5},
  ...Array.from({length: 7}, (_, k) => ({at: A('h2') + 0.1 + k * 0.25, s: 'tick', v: 0.4})),
  {at: A('h3') - 0.15, s: 'soft-whoosh', v: 0.55},
  ...[0, 1, 2].map((k) => ({at: A('h3') + 0.3 + k * 0.9, s: 'deep-hit', v: 0.32})),
  // pages tournées
  ...C.slice(1).map((c) => ({at: c - FLIP, s: 'page', v: 0.65})),
  ...C.slice(1).map((c) => ({at: c - FLIP + 0.1, s: 'soft-whoosh', v: 0.4})),
  {at: OUTRO_AT - FLIP, s: 'page', v: 0.6},
  // palettes
  ...flapSfx(A('m0') + 0.6, 8, 0.08),
  ...MENU.flatMap((m, i) => [...flapSfx(menuAt(i), m.length + 2, 0.03), {at: menuAt(i) + 0.35, s: 'sfx/ding', v: 0.22}]),
  {at: A('m2'), s: 'validation', v: 0.45},
  ...CHAP.flatMap((c, i) => [{at: c + 0.2, s: 'bass-hit', v: 0.4}, ...flapSfx(c + 0.55, 4, 0.12), ...flapSfx(c + 0.75, TITLES[i].length, 0.04)]),
  // règle de trois
  ...['a2', 'a3', 'a4'].flatMap((k) => [{at: A(k) - 0.35, s: 'sfx/whoosh', v: 0.45}, {at: A(k) + 0.3, s: 'sfx/pop', v: 0.42}]),
  {at: Z('a4') - 0.3, s: 'validation', v: 0.45},
  {at: A('a5') + 0.15, s: 'sfx/swish', v: 0.5},
  {at: A('a5') + 0.6, s: 'alarme', v: 0.16, dur: 0.6},
  {at: A('a5') + 1.3, s: 'tampon', v: 0.7},
  // obligations
  ...['o1', 'o2'].flatMap((k) => [{at: A(k) - 0.3, s: 'sfx/pop', v: 0.45}, ...Array.from({length: 10}, (_, j) => ({at: A(k) + 0.3 + j * 0.28, s: 'tick', v: 0.32}))]),
  {at: A('o2') + 1.4, s: 'sfx/whoosh', v: 0.5},
  {at: A('o2') + 2.65, s: 'notification', v: 0.42},
  {at: A('o3') - 0.4, s: 'soft-whoosh', v: 0.5},
  {at: A('o3') + 0.1, s: 'page', v: 0.5},
  {at: A('o4') + 0.1, s: 'page', v: 0.5},
  {at: A('o4') + 0.6, s: 'sfx/ding', v: 0.3},
  // médecin
  ...CERTS.flatMap((c, i) => [...(i ? [{at: A(c.k) - 0.35, s: 'soft-whoosh', v: 0.45}] : []), {at: A(c.k) + 0.1, s: 'stylo', v: 0.42, dur: 1.6}]),
  // enquête
  {at: A('e1') - 0.1, s: 'soft-whoosh', v: 0.45},
  {at: A('e1') + 1.0, s: 'tension', v: 0.25, dur: 2},
  {at: A('e2') - 0.3, s: 'sfx/swish', v: 0.5},
  ...Array.from({length: 9}, (_, k) => ({at: A('e2') + 0.7 + k * ((Z('e2') - A('e2') - 0.5) / 9), s: 'page', v: 0.4})),
  {at: A('e2') + 0.7 + 8 * ((Z('e2') - A('e2') - 0.5) / 9) + 0.5, s: 'tampon', v: 0.6},
  ...[0, 1, 2, 3].map((k) => ({at: A('e3') + 0.9 + k * 0.55, s: 'sfx/pop', v: 0.4})),
  {at: A('e4') + 0.9, s: 'tampon', v: 0.75},
  {at: A('e4') + 0.9, s: 'bass-hit', v: 0.5},
  // rechute
  {at: A('r1') - 0.2, s: 'deep-hit', v: 0.55},
  ...Array.from({length: 15}, (_, k) => ({at: A('r1') + 0.3 + k * 0.08, s: 'sfx/click', v: 0.2})),
  ...[0, 1].map((k) => ({at: A('r2') + 0.3 + k * 0.25, s: 'sfx/pop', v: 0.42})),
  {at: Z('r2') - 0.6, s: 'bass-hit', v: 0.45},
  {at: A('r3') - 0.1, s: 'cadenas', v: 0.5},
  ...['r4', 'r5', 'r6'].flatMap((k) => [{at: A(k) - 0.1, s: 'tick', v: 0.5}, {at: A(k) + 0.35, s: 'sfx/click', v: 0.4}]),
  {at: Z('r6') + 0.05, s: 'cadenas', v: 0.6},
  {at: Z('r6') + 0.1, s: 'validation', v: 0.5},
  {at: A('r7') - 0.1, s: 'soft-whoosh', v: 0.5},
  {at: A('r7') + 0.3, s: 'tension', v: 0.25, dur: 3},
  // conclusion
  {at: A('f1') - 0.2, s: 'riser', v: 0.3, dur: 2},
  {at: A('f1') + 0.3, s: 'tampon', v: 0.6},
  {at: A('f1') + 1.2, s: 'deep-hit', v: 0.5},
  {at: A('f2') - 0.1, s: 'soft-whoosh', v: 0.5},
  ...[0.05, 0.42, 0.75, 0.98].map((u) => ({at: A('f2') + 0.2 + u * (Z('f2') - A('f2')), s: 'sfx/pop', v: 0.4})),
  {at: A('f3'), s: 'bass-hit', v: 0.45},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const AccidentAZ: React.FC = () => (
  <AbsoluteFill>
    <Backdrop />
    <Gate from={OUTRO_AT - FLIP} to={999}><Outro at={OUTRO_AT} logo={LOGO} /></Gate>
    <Page i={0}><Hook /></Page>
    <Page i={1}><Menu /></Page>
    {TITLES.map((title, i) => {
      const k = ['a', 'o', 'd', 'e', 'r'][i];
      return (
        <Page key={k} i={i + 2}>
          <Chapter n={i + 1} title={title} at={C[i + 2]} until={Z(`${k}0`) + 0.1} />
          {i === 0 && <Venn />}
          {i === 1 && <Obligations />}
          {i === 2 && <Doctor />}
          {i === 3 && <Inquiry />}
          {i === 4 && <Relapse />}
        </Page>
      );
    })}
    <Page i={7}><Finale /></Page>
    <AbsoluteFill style={{zIndex: 100}}><Captions captions={captions} /></AbsoluteFill>
    <Audio src={staticFile('voix-off-accident-a-z.m4a')} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);
