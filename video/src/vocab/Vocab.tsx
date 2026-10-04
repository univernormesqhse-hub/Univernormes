import {AbsoluteFill, Audio, staticFile} from 'remotion';
import {easeOut, Enter, Gate, prog, useT} from '../anim';
import {PhotoCard, RED} from '../charte/ui';
import {Background} from '../components/Background';
import {Captions} from '../components/Captions';
import {Footer} from '../components/Footer';
import {Camera, Flash, Wipe} from '../components/Fx';
import {Header} from '../components/Header';
import {F} from '../iso/ui';
import {BLUE, GOLD, PURPLE} from '../pieges/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {colors, handFont, s, sansFont} from '../theme';
import {captions} from './captions';

const LOGO = 'promo/logo.png';
const INTRO_END = 3.42;
const OUTRO_AT = 56.4;
export const VOCAB_FRAMES = s(59.8);
const ORANGE = '#E67E22';

/** Mot de la définition : [texte, instant, style] — 1 = initiale du sigle en couleur, 2 = mot-clé, sinon mot de liaison. */
type W = [string, number, (1 | 2)?];
type Visual =
  | {k: 'photo'; src: string; icons: string[]}
  | {k: 'formula'; num: string; mult: string; den: string; icon: string; note?: string}
  | {k: 'pyramid'; lit: string[]; potential?: boolean}
  | {k: 'why'}
  | {k: 'tree'}
  | {k: 'jsa'};
type Entry = {at: number; acr: string; fam: string; color: string; en?: string; words: W[]; v: Visual};

const FAM = {
  acc: ['Accidentologie', RED],
  ind: ['Indicateurs France', BLUE],
  intl: ['Indicateurs internationaux', PURPLE],
  cls: ['Classification des cas', ORANGE],
  grav: ['Gravité', '#A93226'],
  ana: ['Analyse des causes', colors.green],
} as const;

const e = (at: number, acr: string, fam: keyof typeof FAM, words: W[], v: Visual, en?: string): Entry => ({at, acr, fam: FAM[fam][0], color: FAM[fam][1], words, v, en});

const ENTRIES: Entry[] = [
  e(3.42, 'AT', 'acc', [['Accident', 4.22, 1], ['du', 4.46], ['Travail', 4.66, 1]], {k: 'photo', src: 'incident/blessure-soins.jpg', icons: ['pansement', 'ambulance']}),
  e(5.56, 'PA', 'acc', [["Presqu'", 6.32, 1], ['Accident', 6.5, 1]], {k: 'pyramid', lit: ['PA']}),
  e(7.5, 'TF', 'ind', [['Taux', 8.16, 1], ['de', 8.24], ['Fréquence', 8.42, 1]], {k: 'formula', num: "Nb d'accidents avec arrêt", mult: '× 1 000 000', den: 'Heures travaillées', icon: 'graphique'}),
  e(9.48, 'TG', 'ind', [['Taux', 10.24, 1], ['de', 10.38], ['Gravité', 10.58, 1]], {k: 'formula', num: "Jours d'arrêt", mult: '× 1 000', den: 'Heures travaillées', icon: 'calendrier'}),
  e(11.48, 'IF', 'ind', [['Indice', 12.24, 1], ['de', 12.42], ['Fréquence', 12.66, 1]], {k: 'formula', num: "Nb d'accidents avec arrêt", mult: '× 1 000', den: 'Effectif salarié', icon: 'equipe'}),
  e(13.64, 'IG', 'ind', [['Indice', 14.34, 1], ['de', 14.54], ['Gravité', 14.76, 1]], {k: 'formula', num: "Somme des taux d'IPP", mult: '× 1 000 000', den: 'Heures travaillées', icon: 'balance'}),
  e(15.62, 'LTI', 'cls', [['Accident', 16.42, 2], ['avec', 16.68], ['arrêt', 16.92, 2], ['de', 17.06], ['travail', 17.3, 2]], {k: 'pyramid', lit: ['LTI']}, 'Lost Time Injury'),
  e(18.12, 'LTIR', 'intl', [['Taux', 19.04, 2], ['de', 19.22], ['fréquence', 19.34, 2], ['des', 19.6], ['accidents', 19.84, 2], ['avec', 20.12], ['arrêt', 20.42, 2]], {k: 'formula', num: 'Nb de LTI', mult: '× 200 000', den: 'Heures travaillées', icon: 'courbe', note: 'base OSHA : 100 salariés à temps plein'}, 'Lost Time Injury Rate'),
  e(21.18, 'TRIR', 'intl', [['Taux', 22.12, 2], ["d'incidence", 22.26, 2], ['des', 22.76], ['accidents', 23.0, 2], ['enregistrables', 23.26, 2]], {k: 'formula', num: 'Nb de cas enregistrables', mult: '× 200 000', den: 'Heures travaillées', icon: 'clipboard', note: 'base OSHA : 100 salariés à temps plein'}, 'Total Recordable Incident Rate'),
  e(24.5, 'MTI', 'cls', [['Accident', 25.32, 2], ['nécessitant', 25.6], ['un', 26.12], ['traitement', 26.3, 2], ['médical', 26.52, 2]], {k: 'pyramid', lit: ['MTI']}, 'Medical Treatment Injury'),
  e(27.56, 'FAI', 'cls', [['Accident', 28.4, 2], ['nécessitant', 28.68], ['uniquement', 29.26], ['des', 29.72], ['premiers', 29.88, 2], ['soins', 30.12, 2]], {k: 'pyramid', lit: ['FAI']}, 'First Aid Injury'),
  e(31.36, 'RWC', 'cls', [['Cas', 32.18, 2], ['avec', 32.24], ['restriction', 32.54, 2], ['de', 32.94], ['travail', 33.18, 2]], {k: 'pyramid', lit: ['RWC']}, 'Restricted Work Case'),
  e(34.06, 'DART', 'intl', [['Jours', 34.8, 2], ["d'absence,", 34.94, 2], ['de', 35.68], ['restriction', 35.84, 2], ['ou', 36.26], ['de', 36.48], ['changement', 36.66, 2], ['de', 36.9], ['poste', 37.06, 2]], {k: 'pyramid', lit: ['LTI', 'RWC']}, 'Days Away, Restricted or Transferred'),
  e(37.96, 'SIF', 'grav', [['Blessure', 38.74, 2], ['grave', 39.06, 2], ['ou', 39.22], ['mortelle', 39.4, 2]], {k: 'pyramid', lit: ['SIF']}, 'Serious Injury or Fatality'),
  e(40.54, 'SIFp', 'grav', [['Potentiel', 41.72, 2], ['de', 41.9], ['blessure', 42.06, 2], ['grave', 42.34, 2], ['ou', 42.52], ['mortelle', 42.7, 2]], {k: 'pyramid', lit: ['SIF', 'PA'], potential: true}, 'Serious Injury or Fatality potential'),
  e(43.56, 'RCA', 'ana', [['Analyse', 44.52, 2], ['des', 44.7], ['causes', 44.9, 2], ['racines', 45.06, 2]], {k: 'photo', src: 'ishikawa/ishikawa-6m.jpg', icons: ['loupe', 'cible']}, 'Root Cause Analysis'),
  e(45.98, 'ICAM', 'ana', [['Méthode', 46.92, 2], ["d'analyse", 47.08, 2], ['des', 47.5], ['causes', 47.66, 2], ["d'incident", 47.8, 2]], {k: 'photo', src: 'promo/audit-reunion.jpg', icons: ['detective', 'puzzle']}, 'Incident Cause Analysis Method'),
  e(48.82, '5WHY', 'ana', [['Méthode', 49.72, 2], ['des', 49.98], ['5', 50.14, 2], ['pourquoi', 50.34, 2]], {k: 'why'}, 'Five Whys'),
  e(51.2, 'FTA', 'ana', [['Analyse', 52.14, 2], ['par', 52.32], ['arbre', 52.6, 2], ['des', 52.78], ['causes', 52.94, 2]], {k: 'tree'}, 'Fault Tree Analysis'),
  e(53.14, 'JSA', 'ana', [['Analyse', 54.76, 2], ['de', 54.92], ['sécurité', 55.16, 2], ['du', 55.48], ['travail', 55.68, 2]], {k: 'jsa'}, 'Job Safety Analysis'),
];
const endOf = (i: number) => (i + 1 < ENTRIES.length ? ENTRIES[i + 1].at : OUTRO_AT);
const card = (c = 'transparent'): React.CSSProperties => ({background: '#fff', borderRadius: 26, boxShadow: '0 12px 26px rgba(14,30,60,0.14)', borderBottom: `7px solid ${c}`});

/** Tuiles-lettres du sigle qui tombent en cascade puis s'allument. */
const Letters: React.FC<{e: Entry}> = ({e}) => {
  const t = useT();
  const chars = e.acr === '5WHY' ? ['5', 'W', 'H', 'Y'] : e.acr.split('');
  const n = chars.length;
  const size = n >= 4 ? 190 : n === 3 ? 215 : 240;
  const inis = e.words.filter((w) => w[2] === 1);
  return (
    <div style={{display: 'flex', gap: 16}}>
      {chars.map((c, i) => {
        const p = prog(t, e.at + 0.05 + i * 0.07, e.at + 0.42 + i * 0.07, easeOut);
        const litAt = inis.length ? inis[i]?.[1] ?? 99 : e.at + 0.7 + i * 0.1;
        const on = t >= litAt;
        const small = c === 'p';
        return (
          <div key={i} style={{width: size, height: size * 1.12, borderRadius: size * 0.16, background: on ? e.color : colors.navy, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: size * (small ? 0.55 : 0.7), transform: `translateY(${(1 - p) * -240}px) rotate(${(1 - p) * (i % 2 ? 12 : -12)}deg) scale(${on ? 1 + 0.08 * (1 - prog(t, litAt, litAt + 0.25)) : 1})`, opacity: Math.min(1, p * 2), boxShadow: `0 ${size * 0.08}px ${size * 0.16}px rgba(14,30,60,0.3)`, borderBottom: `${size * 0.05}px solid rgba(0,0,0,0.25)`}}>{c}</div>
        );
      })}
    </div>
  );
};

/** Développé anglais du sigle, initiales en couleur. */
const English: React.FC<{e: Entry}> = ({e}) => {
  const t = useT();
  if (!e.en) return null;
  const p = prog(t, e.at + 0.55, e.at + 0.9, easeOut);
  return (
    <div style={{opacity: p, transform: `translateY(${(1 - p) * 16}px)`, fontFamily: sansFont, fontStyle: 'italic', fontWeight: 700, fontSize: e.en.length > 28 ? 36 : 42, color: '#6B7684', whiteSpace: 'nowrap'}}>
      <span style={{fontSize: 26, fontStyle: 'normal', background: '#E4E8EE', borderRadius: 8, padding: '3px 10px', marginRight: 12, letterSpacing: 2}}>EN</span>
      {e.en.split(' ').map((w, i) => (
        <span key={i}>{i > 0 && ' '}{/^[A-Z5F]/.test(w) && w !== 'or' ? <><span style={{color: e.color, fontWeight: 900}}>{w[0]}</span>{w.slice(1)}</> : w}</span>
      ))}
    </div>
  );
};

/** Définition française, mot à mot au rythme de la voix. */
const Definition: React.FC<{e: Entry}> = ({e}) => {
  const t = useT();
  const long = e.words.map((w) => w[0]).join(' ').length > 34;
  const fs = long ? 54 : 64;
  return (
    <div style={{width: 960, display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'center', columnGap: 16, rowGap: 2, fontFamily: sansFont, fontWeight: 800, fontSize: fs, lineHeight: 1.15, color: colors.navy}}>
      {e.words.map(([w, at, st], i) => {
        const p = prog(t, at - 0.05, at + 0.22, easeOut);
        return (
          <span key={i} style={{opacity: p, transform: `translateY(${(1 - p) * 26}px)`, display: 'inline-block'}}>
            {st === 1 ? <><span style={{color: e.color, fontSize: fs * 1.22}}>{w[0]}</span>{w.slice(1)}</> : st === 2 ? w : <span style={{fontWeight: 600, color: '#8A94A1', fontSize: fs * 0.85}}>{w}</span>}
          </span>
        );
      })}
    </div>
  );
};

/** Formule de calcul de l'indicateur : numérateur, trait, dénominateur. */
const Formula: React.FC<{e: Entry; v: Extract<Visual, {k: 'formula'}>}> = ({e, v}) => {
  const t = useT();
  const a = e.at + 0.45;
  const p1 = prog(t, a, a + 0.3);
  const bar = prog(t, a + 0.25, a + 0.6);
  const p2 = prog(t, a + 0.5, a + 0.8);
  const pi = prog(t, a + 0.7, a + 1.0);
  return (
    <div style={{...card(e.color), width: 960, padding: '40px 34px', display: 'flex', alignItems: 'center', gap: 26, transform: `scale(${0.9 + 0.1 * p1})`, opacity: p1}}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6}}>
        <div style={{transform: `scale(${pi})`}}><F n={v.icon} size={150} float={4} /></div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 48, color: e.color}}>{e.acr} =</div>
      </div>
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: sansFont, color: colors.navy}}>
        <div style={{opacity: p1, fontWeight: 800, fontSize: 44, textAlign: 'center'}}>{v.num} <span style={{color: e.color, whiteSpace: 'nowrap'}}>{v.mult}</span></div>
        <div style={{height: 7, borderRadius: 4, background: colors.navy, width: `${bar * 100}%`, margin: '14px 0'}} />
        <div style={{opacity: p2, transform: `translateY(${(1 - p2) * -14}px)`, fontWeight: 800, fontSize: 44}}>{v.den}</div>
        {v.note && <div style={{opacity: p2, marginTop: 12, fontFamily: handFont, fontSize: 38, color: '#7A8594'}}>{v.note}</div>}
      </div>
    </div>
  );
};

const LEVELS: [string, string][] = [['SIF', 'Grave ou mortel'], ['LTI', 'Arrêt de travail'], ['RWC', 'Poste aménagé'], ['MTI', 'Soins médicaux'], ['FAI', 'Premiers soins'], ['PA', "Presqu'accident"]];

/** Pyramide de gravité : le niveau du sigle s'allume. */
const Pyramid: React.FC<{e: Entry; v: Extract<Visual, {k: 'pyramid'}>}> = ({e, v}) => {
  const t = useT();
  const H = 74;
  const a = e.at + 0.4;
  const hl = prog(t, a + 0.5, a + 0.8);
  return (
    <div style={{position: 'relative', width: 980, height: LEVELS.length * (H + 8) + 10}}>
      {LEVELS.map(([k, label], i) => {
        const p = prog(t, a + (LEVELS.length - 1 - i) * 0.06, a + 0.3 + (LEVELS.length - 1 - i) * 0.06);
        const w = 180 + i * 88;
        const on = v.lit.includes(k);
        const ghost = v.potential && k === 'SIF';
        const bg = on ? (ghost ? 'transparent' : e.color) : '#D9DEE4';
        return (
          <div key={k} style={{position: 'absolute', top: i * (H + 8), left: 320 - w / 2, width: w, height: H, display: 'flex', alignItems: 'center', justifyContent: 'center', clipPath: `polygon(${(42 / w) * 100}% 0, ${100 - (42 / w) * 100}% 0, 100% 100%, 0 100%)`, background: on && hl > 0 ? bg : '#D9DEE4', outline: 'none', opacity: p, transform: `translateX(${(1 - p) * -40}px) scale(${on ? 1 + 0.06 * hl : 1})`, color: on ? '#fff' : '#6B7684', fontFamily: sansFont, fontWeight: 900, fontSize: 34, letterSpacing: 1}}>
            {ghost ? null : k}
            {ghost && <div style={{position: 'absolute', inset: 0, background: `repeating-linear-gradient(45deg, ${e.color}, ${e.color} 10px, #f3c9c3 10px, #f3c9c3 20px)`, opacity: hl, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'}}>SIF</div>}
          </div>
        );
      })}
      {LEVELS.map(([k, label], i) => {
        const on = v.lit.includes(k);
        const p = prog(t, a + 0.3 + i * 0.04, a + 0.6 + i * 0.04);
        return (
          <div key={k} style={{position: 'absolute', top: i * (H + 8), left: 650, height: H, display: 'flex', alignItems: 'center', gap: 10, opacity: p * (on ? 1 : 0.85), fontFamily: on ? sansFont : handFont, fontWeight: on ? 900 : 400, fontSize: on ? 33 : 36, color: on ? e.color : '#7A8594', transform: `translateX(${on ? (1 - hl) * 30 : 0}px)`, whiteSpace: 'nowrap'}}>
            {on && <span style={{fontSize: 24}}>◀</span>}{label}
          </div>
        );
      })}
      {v.potential && (
        <div style={{position: 'absolute', left: 500, top: 5 * (H + 8) - 6, width: 0, height: 0}}>
          <svg width={140} height={5 * (H + 8)} style={{position: 'absolute', left: -60, top: -5 * (H + 8) + 40, overflow: 'visible', opacity: prog(t, a + 0.8, a + 1.1)}}>
            <path d={`M10 ${5 * (H + 8) - 40} C 110 ${4 * (H + 8)}, 110 ${H + 8}, 10 0`} fill="none" stroke={e.color} strokeWidth={6} strokeDasharray="14 10" strokeDashoffset={(1 - prog(t, a + 0.8, a + 1.4)) * 400} />
          </svg>
        </div>
      )}
    </div>
  );
};

/** 5 pourquoi en cascade jusqu'à la cause racine. */
const Why: React.FC<{e: Entry}> = ({e}) => {
  const t = useT();
  const a = e.at + 0.5;
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
      {[1, 2, 3, 4, 5].map((n) => {
        const p = prog(t, a + n * 0.22, a + n * 0.22 + 0.25, easeOut);
        return (
          <div key={n} style={{display: 'flex', alignItems: 'center', gap: 12, opacity: p, transform: `translateY(${(1 - p) * 40}px) scale(${0.6 + 0.4 * p})`}}>
            <div style={{...card(e.color), width: 150, height: 190, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: (n - 1) * 40}}>
              <F n="question" size={80} />
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 27, color: colors.navy}}>Pourquoi</div>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: e.color}}>{n}</div>
            </div>
          </div>
        );
      })}
      <div style={{opacity: prog(t, a + 1.45, a + 1.75), transform: `scale(${prog(t, a + 1.45, a + 1.8, easeOut)})`, marginTop: 150, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <F n="cible" size={110} />
        <div style={{fontFamily: handFont, fontSize: 32, color: e.color, whiteSpace: 'nowrap'}}>Cause racine</div>
      </div>
    </div>
  );
};

/** Arbre des causes (FTA) dessiné de haut en bas. */
const Tree: React.FC<{e: Entry}> = ({e}) => {
  const t = useT();
  const a = e.at + 0.45;
  const box = (x: number, y: number, w: number, label: string, at: number, top?: boolean) => {
    const p = prog(t, at, at + 0.25, easeOut);
    return (
      <div style={{position: 'absolute', left: x - w / 2, top: y - 38, width: w, height: 76, borderRadius: 16, background: top ? e.color : '#fff', color: top ? '#fff' : colors.navy, border: top ? 'none' : `4px solid ${e.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: top ? 34 : 28, lineHeight: 1.05, transform: `scale(${p})`, boxShadow: '0 8px 18px rgba(14,30,60,0.14)'}}>{label}</div>
    );
  };
  const line = (x1: number, y1: number, x2: number, y2: number, at: number) => {
    const p = prog(t, at, at + 0.2);
    return <line x1={x1} y1={y1} x2={x1 + (x2 - x1) * p} y2={y1 + (y2 - y1) * p} stroke={colors.navy} strokeWidth={5} strokeLinecap="round" />;
  };
  const L2 = [250, 730];
  const L3 = [120, 380, 600, 860];
  return (
    <div style={{position: 'relative', width: 980, height: 440}}>
      <svg width={980} height={440} style={{position: 'absolute', inset: 0}}>
        {L2.map((x, i) => <g key={x}>{line(490, 76, x, 200, a + 0.25 + i * 0.05)}</g>)}
        {L3.map((x, i) => <g key={x}>{line(L2[Math.floor(i / 2)], 238, x, 352, a + 0.75 + i * 0.05)}</g>)}
      </svg>
      {box(490, 40, 440, 'Événement redouté', a, true)}
      {box(L2[0], 200, 330, 'Cause A', a + 0.45)}
      {box(L2[1], 200, 330, 'Cause B', a + 0.5)}
      {['Défaut matériel', 'Erreur humaine', 'Organisation', 'Environnement'].map((l, i) => <div key={l}>{box(L3[i], 380, 230, l, a + 0.95 + i * 0.1)}</div>)}
    </div>
  );
};

/** Analyse de sécurité du poste : étape → danger → mesure. */
const Jsa: React.FC<{e: Entry}> = ({e}) => {
  const t = useT();
  const a = e.at + 0.5;
  const cols: [string, string, string][] = [['clipboard', 'Étape', colors.navy], ['danger', 'Danger', RED], ['bouclier', 'Mesure', colors.green]];
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
      {cols.map(([ic, l, c], i) => {
        const p = prog(t, a + i * 0.45, a + i * 0.45 + 0.3, easeOut);
        const ar = prog(t, a + i * 0.45 + 0.2, a + i * 0.45 + 0.45);
        return (
          <div key={l} style={{display: 'flex', alignItems: 'center', gap: 10}}>
            <div style={{...card(c), width: 250, height: 280, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, transform: `scale(${p})`}}>
              <F n={ic} size={130} float={4} />
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: c}}>{l}</div>
              <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 24, color: '#fff', background: c, borderRadius: 14, padding: '2px 14px'}}>{i + 1}</div>
            </div>
            {i < 2 && <svg width={70} height={40} style={{opacity: ar}}><path d={`M4 20 H${4 + 50 * ar}`} stroke={colors.navy} strokeWidth={7} strokeLinecap="round" /><path d="M48 6 L64 20 L48 34" fill="none" stroke={colors.navy} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" opacity={ar > 0.9 ? 1 : 0} /></svg>}
          </div>
        );
      })}
    </div>
  );
};

const VisualBlock: React.FC<{e: Entry}> = ({e}) => {
  const t = useT();
  const v = e.v;
  if (v.k === 'photo') {
    return (
      <>
        <PhotoCard src={v.src} at={e.at + 0.4} x={390} y={1290} w={580} h={380} rotate={-2} from="left" />
        <div style={{position: 'absolute', left: 850, top: 1290, transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', gap: 16}}>
          {v.icons.map((ic, k) => {
            const p = prog(t, e.at + 0.7 + k * 0.15, e.at + 1.05 + k * 0.15, easeOut);
            return <div key={ic} style={{...card(e.color), width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${p})`}}><F n={ic} size={125} float={4} /></div>;
          })}
        </div>
      </>
    );
  }
  const inner = v.k === 'formula' ? <Formula e={e} v={v} /> : v.k === 'pyramid' ? <Pyramid e={e} v={v} /> : v.k === 'why' ? <Why e={e} /> : v.k === 'tree' ? <Tree e={e} /> : <Jsa e={e} />;
  return <div style={{position: 'absolute', left: 540, top: 1290, transform: 'translate(-50%, -50%)'}}>{inner}</div>;
};

const Page: React.FC<{e: Entry; i: number}> = ({e, i}) => {
  const t = useT();
  const end = endOf(i);
  if (t < e.at || t >= end) return null;
  const fade = 1 - prog(t, end - 0.15, end);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: fade}}>
      <div style={{position: 'absolute', left: 40, right: 40, top: 290, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, background: '#fff', borderRadius: 18, padding: '10px 20px', boxShadow: '0 8px 18px rgba(14,30,60,0.12)'}}>
          <F n="livres" size={48} />
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: colors.navy, letterSpacing: 2}}>LEXIQUE DES SIGLES QHSE</div>
        </div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: e.color}}>{String(i + 1).padStart(2, '0')}<span style={{color: '#B9C0C8', fontSize: 30}}> / {ENTRIES.length}</span></div>
      </div>
      <Enter at={e.at + 0.15} x={540} y={400} bouncy>
        <div style={{background: e.color, color: '#fff', borderRadius: 30, padding: '8px 24px', fontFamily: sansFont, fontWeight: 800, fontSize: 28, letterSpacing: 3, textTransform: 'uppercase', whiteSpace: 'nowrap'}}>{e.fam}</div>
      </Enter>
      <div style={{position: 'absolute', left: 540, top: 590, transform: 'translate(-50%, -50%)'}}><Letters e={e} /></div>
      <div style={{position: 'absolute', left: 540, top: 772, transform: 'translate(-50%, -50%)'}}><English e={e} /></div>
      <div style={{position: 'absolute', left: 540, top: e.en ? 905 : 860, transform: 'translate(-50%, -50%)'}}><Definition e={e} /></div>
      <VisualBlock e={e} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 1560, display: 'flex', justifyContent: 'center', gap: 9}}>
        {ENTRIES.map((x, k) => <div key={x.acr} style={{width: k === i ? 40 : 13, height: 13, borderRadius: 7, background: k < i ? '#9AA5B3' : k === i ? e.color : '#D5D9DE'}} />)}
      </div>
    </div>
  );
};

/** Intro : titre cinétique et mosaïque de sigles. */
const Intro: React.FC = () => {
  const t = useT();
  const tiles = ENTRIES.map((x) => x.acr === '5WHY' ? '5 Why' : x.acr);
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: 60, right: 60, top: 320, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14}}>
        {tiles.map((l, i) => {
          const p = prog(t, 0.1 + i * 0.05, 0.45 + i * 0.05, easeOut);
          return <div key={l} style={{background: ENTRIES[i].color, color: '#fff', borderRadius: 16, padding: '10px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: 46, opacity: p * (t > 1.4 ? 0.35 : 1), transform: `translateY(${(1 - p) * -80}px) rotate(${(1 - p) * (i % 2 ? 20 : -20)}deg)`, boxShadow: '0 6px 14px rgba(14,30,60,0.2)'}}>{l}</div>;
        })}
      </div>
      <Enter at={0.62} x={540} y={900} from="down" bouncy>
        <div style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, color: colors.navy, lineHeight: 1}}>
          <div style={{fontSize: 120, whiteSpace: 'nowrap'}}>LES SIGLES</div>
          <div style={{fontSize: 92, color: colors.green, marginTop: 6}}>IMPORTANTS</div>
        </div>
      </Enter>
      <Enter at={1.52} x={540} y={1110} from="up">
        <div style={{fontFamily: handFont, fontSize: 78, color: colors.navy, whiteSpace: 'nowrap'}}>à connaître en <span style={{color: colors.green}}>QHSE</span></div>
      </Enter>
      <Enter at={2.1} x={540} y={1330} bouncy>
        <div style={{display: 'flex', alignItems: 'center', gap: 18, background: colors.navy, color: '#fff', borderRadius: 26, padding: '16px 32px', fontFamily: sansFont, fontWeight: 900, fontSize: 46, transform: 'rotate(-3deg)'}}>
          <F n="livres" size={80} /> {ENTRIES.length} SIGLES
        </div>
      </Enter>
    </AbsoluteFill>
  );
};

const visualCues = (e: Entry): Sfx[] => {
  const a = e.at;
  switch (e.v.k) {
    case 'photo': return [{at: a + 0.4, s: 'soft-whoosh', v: 0.42}, {at: a + 0.75, s: 'sfx/pop', v: 0.45}];
    case 'formula': return [{at: a + 0.7, s: 'stylo', v: 0.5, dur: 0.5}, {at: a + 1.15, s: 'sfx/pop', v: 0.42}];
    case 'pyramid': return [{at: a + 0.9, s: e.color === FAM.grav[1] ? 'deep-hit' : 'sfx/ding', v: e.color === FAM.grav[1] ? 0.6 : 0.4}];
    case 'why': return [1, 2, 3, 4, 5].map((n) => ({at: a + 0.5 + n * 0.22, s: 'tick', v: 0.5})).concat([{at: a + 1.95, s: 'validation', v: 0.5}]);
    case 'tree': return [{at: a + 0.45, s: 'sfx/pop', v: 0.45}, {at: a + 0.95, s: 'sfx/pop', v: 0.42}, {at: a + 1.4, s: 'sfx/pop', v: 0.42}];
    case 'jsa': return [0, 1, 2].map((k) => ({at: a + 0.5 + k * 0.45, s: k === 2 ? 'validation' : 'sfx/pop', v: 0.48}));
  }
};

/** Bruitages seuls (ni musique ni ambiance), calés sur chaque action. */
const CUES: Sfx[] = [
  {at: 0.05, s: 'bass-hit', v: 0.55},
  ...[0, 4, 8, 12, 16].map((k) => ({at: 0.1 + k * 0.05, s: 'sfx/click', v: 0.38})),
  {at: 0.6, s: 'sfx/whoosh', v: 0.5},
  {at: 1.5, s: 'sfx/swish', v: 0.45},
  {at: 2.15, s: 'tampon', v: 0.6},
  ...ENTRIES.flatMap((e, i) => [
    {at: e.at - 0.1, s: i % 2 ? 'soft-whoosh' : 'page', v: 0.5},
    ...(e.acr === '5WHY' ? 'xxxx' : e.acr).split('').map((_, k) => ({at: e.at + 0.38 + k * 0.07, s: 'sfx/click', v: 0.38})),
    ...e.words.filter((w) => w[2] === 1).map((w) => ({at: w[1], s: 'tick', v: 0.45})),
    ...visualCues(e),
  ]),
  {at: OUTRO_AT - 0.4, s: 'soft-whoosh', v: 0.5},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const Vocab: React.FC = () => (
  <AbsoluteFill>
    <Camera shakes={[38.0]}>
      <Background />
      <Gate from={0} to={INTRO_END}><Intro /></Gate>
      <Gate from={INTRO_END} to={OUTRO_AT}>{ENTRIES.map((x, i) => <Page key={x.acr} e={x} i={i} />)}</Gate>
      <Gate from={OUTRO_AT} to={999}><Outro at={OUTRO_AT} logo={LOGO} /></Gate>
    </Camera>
    <Header hideAt={OUTRO_AT} logo={LOGO} />
    <Footer hideAt={OUTRO_AT} />
    {ENTRIES.map((x) => <Wipe key={x.acr} at={x.at} dur={0.45} color={x.color} />)}
    <Wipe at={OUTRO_AT} />
    <Flash at={38.0} />
    <Captions captions={captions} />
    <Audio src={staticFile('voix-off-vocabulaire.m4a')} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);
