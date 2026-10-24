import React from 'react';
import {AbsoluteFill, Audio, staticFile} from 'remotion';
import {easeIn, easeOut, Enter, Gate, prog, useT} from '../anim';
import {PhotoCard, RED} from '../charte/ui';
import {Background} from '../components/Background';
import {Captions} from '../components/Captions';
import {Footer} from '../components/Footer';
import {Camera, Flash, Wipe} from '../components/Fx';
import {Header} from '../components/Header';
import {F} from '../iso/ui';
import {BLUE} from '../pieges/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {colors, handFont, s, sansFont} from '../theme';
import {captions} from './captions';
import {CategoriesEpiCouverture} from './Couverture';

/**
 * « Comment comprendre les catégories d'EPI » (60 s) au format « fiches éditoriales » de la capsule des sigles
 * (skill capsule-fiches-qhse) : fond papier, bandeau logo et slogan, une fiche par étape (enjeu, cas pratique,
 * catégories 1 / 2 / 3, verdict) avec pastille de famille, compteur, tuiles-lettres qui tombent puis s'allument sur
 * la voix, définition mot à mot, bloc visuel (visuels IA en cartes photo, tuiles d'icônes, échelle de gravité,
 * barre « par exclusion », duel infraction / vie, dé barré, tampon), points de progression, balayages de marque.
 * Voix d'origine, bruitages seuls.
 */
const LOGO = 'promo/logo.png';
const OUTRO_AT = 60.3;
const COVER_END = 0.8;
export const CATEGORIESEPI_FRAMES = s(OUTRO_AT + 3.5);
export const ORANGE = '#E67E22';
export const CAT = [colors.green, ORANGE, RED];
const PH = (p: string) => `categoriesepi/${p}`;

/** Mot de la définition : [texte, instant, style] — 2 = mot-clé, sinon mot de liaison. */
type W = [string, number, 2?];
type Visual =
  | {k: 'duel'}
  | {k: 'photo'; src: string; icons: string[]; at?: number; w?: number; h?: number; pos?: string}
  | {k: 'scale'; lit: number; litAt: number}
  | {k: 'exclusion'}
  | {k: 'hasard'}
  | {k: 'verdict'};
type Entry = {at: number; tiles: string[]; litAt: number[]; fam: string; color: string; sub?: string; words: W[]; v: Visual[]};

export const ENTRIES: Entry[] = [
  {at: 7.5, tiles: ['E', 'P', 'I'], litAt: [9.04, 9.12, 9.2], fam: "L'enjeu", color: RED, sub: 'Se tromper d’équipement…',
    words: [['Pas', 9.68], ['une', 9.8], ['simple', 9.92, 2], ['infraction', 10.24, 2], [':', 11.1], ['risquer', 11.28, 2], ['sa', 11.72], ['vie', 11.92, 2]],
    v: [{k: 'duel'}]},
  {at: 12.4, tiles: ['C', 'A', 'S'], litAt: [13.2, 13.28, 13.36], fam: 'Cas pratique', color: BLUE, sub: 'Un technicien, un solvant',
    words: [['Solvant', 15.24, 2], ['chimique', 15.64, 2], ['hautement', 16.04], ['corrosif', 16.48, 2]],
    v: [{k: 'photo', src: PH('technicien-solvant.jpg'), icons: ['eprouvette', 'goutte'], w: 520, h: 640, pos: '50% 40%'}]},
  {at: 17.4, tiles: ['C', 'A', 'T', '1'], litAt: [20.72, 20.8, 20.88, 21.48], fam: 'Risques minimaux', color: colors.green, sub: 'Le bas de l’échelle',
    words: [['Risques', 24.08, 2], ['minimaux', 24.48, 2], [':', 25.0], ['légères', 26.6], ['égratignures', 26.96, 2], ['ou', 27.6], ['salissures', 27.72, 2]],
    v: [{k: 'scale', lit: 1, litAt: 19.84}, {k: 'photo', src: PH('epi-cat1.jpg'), icons: ['pansement', 'savon'], at: 22.2}]},
  {at: 28.7, tiles: ['C', 'A', 'T', '2'], litAt: [30.24, 30.32, 30.4, 30.92], fam: 'Risques sérieux', color: ORANGE, sub: 'Le niveau intermédiaire',
    words: [['Définie', 32.8, 2], ['par', 33.24], ['exclusion', 33.44, 2], [':', 34.9], ['ni', 37.28], ['bénins,', 37.92, 2], ['ni', 38.44], ['mortels', 38.72, 2]],
    v: [{k: 'photo', src: PH('epi-cat2.jpg'), icons: ['casque', 'lunettes']}, {k: 'exclusion'}]},
  {at: 39.6, tiles: ['C', 'A', 'T', '3'], litAt: [41.64, 41.72, 41.8, 42.48], fam: 'Dangers extrêmes', color: RED, sub: 'Le sommet de l’échelle',
    words: [['Dangers', 45.6, 2], ['extrêmes', 46.16, 2], [':', 46.8], ['la', 47.68], ['mort', 47.8, 2], ['ou', 48.12], ['des', 48.32], ['dommages', 48.4, 2], ['irréversibles', 48.72, 2]],
    v: [{k: 'scale', lit: 3, litAt: 40.8}, {k: 'photo', src: PH('technicien-cat3.jpg'), icons: ['crane', 'bris'], at: 43.2, w: 520, h: 640, pos: '50% 34%'}]},
  {at: 50.9, tiles: ['E', 'P', 'I'], litAt: [57.72, 57.8, 57.88], fam: 'Le verdict', color: colors.navy, sub: 'Aucune place au hasard',
    words: [['Solvant', 54.4, 2], ['corrosif', 54.72, 2], ['=', 55.8], ['dégâts', 56.0, 2], ['irréversibles', 56.36, 2]],
    v: [{k: 'hasard'}, {k: 'verdict'}]},
];
const endOf = (i: number) => (i + 1 < ENTRIES.length ? ENTRIES[i + 1].at : OUTRO_AT);
/** Bornes de chaque bloc visuel d'une fiche (un bloc chasse le précédent). */
const visualAt = (e: Entry, k: number) => (k === 0 ? e.at + 0.4 : e.v[k].k === 'exclusion' ? 33.2 : e.v[k].k === 'verdict' ? 54.1 : (e.v[k] as {at: number}).at);
const card = (c = 'transparent'): React.CSSProperties => ({background: '#fff', borderRadius: 26, boxShadow: '0 12px 26px rgba(14,30,60,0.14)', borderBottom: `7px solid ${c}`});

/** Tuiles-lettres qui tombent en cascade puis s'allument au moment où la voix prononce le mot. */
const Letters: React.FC<{e: Entry}> = ({e}) => {
  const t = useT();
  const n = e.tiles.length;
  const size = n >= 4 ? 190 : 215;
  return (
    <div style={{display: 'flex', gap: 16}}>
      {e.tiles.map((c, i) => {
        const p = prog(t, e.at + 0.05 + i * 0.07, e.at + 0.42 + i * 0.07, easeOut);
        const litAt = e.litAt[i];
        const on = t >= litAt;
        const num = /\d/.test(c);
        return (
          <div key={i} style={{width: size, height: size * 1.12, borderRadius: size * 0.16, background: on ? (num ? CAT[Number(c) - 1] : e.color) : colors.navy, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: size * 0.7, transform: `translateY(${(1 - p) * -240}px) rotate(${(1 - p) * (i % 2 ? 12 : -12)}deg) scale(${on ? 1 + 0.08 * (1 - prog(t, litAt, litAt + 0.25)) : 1})`, opacity: Math.min(1, p * 2), boxShadow: `0 ${size * 0.08}px ${size * 0.16}px rgba(14,30,60,0.3)`, borderBottom: `${size * 0.05}px solid rgba(0,0,0,0.25)`, marginLeft: num ? 18 : 0}}>{c}</div>
        );
      })}
    </div>
  );
};

/** Précision en italique grise sous les tuiles. */
const Sub: React.FC<{e: Entry}> = ({e}) => {
  const t = useT();
  if (!e.sub) return null;
  const p = prog(t, e.at + 0.55, e.at + 0.9, easeOut);
  return <div style={{opacity: p, transform: `translateY(${(1 - p) * 16}px)`, fontFamily: sansFont, fontStyle: 'italic', fontWeight: 700, fontSize: 42, color: '#6B7684', whiteSpace: 'nowrap'}}>{e.sub}</div>;
};

/** Définition, mot à mot au rythme de la voix. */
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
            {st === 2 ? <span style={{color: e.color === colors.navy ? colors.navy : e.color}}>{w}</span> : <span style={{fontWeight: 600, color: '#8A94A1', fontSize: fs * 0.85}}>{w}</span>}
          </span>
        );
      })}
    </div>
  );
};

/** Duel : « simple infraction » barrée face à « risquer sa vie ». */
const Duel: React.FC<{e: Entry}> = ({e}) => {
  const t = useT();
  const a = e.at + 0.5;
  const pL = prog(t, a, a + 0.35, easeOut);
  const pR = prog(t, 11.2, 11.55, easeOut);
  const strike = prog(t, 10.7, 11.0);
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 30}}>
      <div style={{...card('#B9C0C8'), position: 'relative', width: 380, height: 380, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, transform: `scale(${0.6 + 0.4 * pL}) rotate(-2deg)`, opacity: pL}}>
        <F n="clipboard" size={150} float={4} />
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: '#6B7684', textAlign: 'center', lineHeight: 1.1}}>Simple<br />infraction</div>
        <svg width={380} height={380} style={{position: 'absolute', inset: 0}}>
          <line x1={40} y1={40} x2={340} y2={340} stroke={RED} strokeWidth={16} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - strike} />
        </svg>
      </div>
      <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 90, color: colors.navy, opacity: pR}}>≠</div>
      <div style={{...card(RED), width: 380, height: 380, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, transform: `scale(${0.6 + 0.4 * pR}) rotate(2deg)`, opacity: pR}}>
        <F n="coeur" size={150} float={4} />
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: RED, textAlign: 'center', lineHeight: 1.1}}>Risquer<br />sa vie</div>
      </div>
    </div>
  );
};

/** Échelle de gravité : trois niveaux en pyramide, celui de la fiche s'allume. */
const LEVELS: [number, string][] = [[3, 'Mort / irréversible'], [2, 'Risques sérieux'], [1, 'Risques minimaux']];
const Scale: React.FC<{lit: number; litAt: number; a: number}> = ({lit, litAt, a}) => {
  const t = useT();
  const H = 110;
  const hl = prog(t, litAt, litAt + 0.3);
  return (
    <div style={{position: 'relative', width: 980, height: 3 * (H + 12)}}>
      {LEVELS.map(([n], i) => {
        const p = prog(t, a + (2 - i) * 0.08, a + 0.35 + (2 - i) * 0.08);
        const w = 240 + i * 150;
        const on = n === lit && hl > 0;
        return (
          <div key={n} style={{position: 'absolute', top: i * (H + 12), left: 330 - w / 2, width: w, height: H, display: 'flex', alignItems: 'center', justifyContent: 'center', clipPath: `polygon(${(50 / w) * 100}% 0, ${100 - (50 / w) * 100}% 0, 100% 100%, 0 100%)`, background: on ? CAT[n - 1] : '#D9DEE4', opacity: p, transform: `translateX(${(1 - p) * -40}px) scale(${n === lit ? 1 + 0.06 * hl : 1})`, color: on ? '#fff' : '#6B7684', fontFamily: sansFont, fontWeight: 900, fontSize: 40}}>CAT. {n}</div>
        );
      })}
      {LEVELS.map(([n, label], i) => {
        const on = n === lit;
        const p = prog(t, a + 0.3 + i * 0.05, a + 0.6 + i * 0.05);
        return (
          <div key={n} style={{position: 'absolute', top: i * (H + 12), left: 660, height: H, display: 'flex', alignItems: 'center', gap: 10, opacity: p, fontFamily: on && hl > 0 ? sansFont : handFont, fontWeight: on && hl > 0 ? 900 : 400, fontSize: on && hl > 0 ? 34 : 40, color: on && hl > 0 ? CAT[n - 1] : '#7A8594', transform: `translateX(${on ? (1 - hl) * 30 : 0}px)`, whiteSpace: 'nowrap'}}>
            {on && hl > 0 && <span style={{fontSize: 24}}>◀</span>}{label}
          </div>
        );
      })}
    </div>
  );
};

/** Catégorie 2 « par exclusion » : bénins et mortels barrés puis écartés, il reste les risques sérieux. */
const Exclusion: React.FC = () => {
  const t = useT();
  const a = 33.3;
  const items: [string, string, number, number | null][] = [['pansement', 'Bénins', 0, 37.92], ['casque', 'Sérieux', 1, null], ['crane', 'Mortels', 2, 38.72]];
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 22}}>
      {items.map(([ic, l, k, cut]) => {
        const p = prog(t, a + k * 0.15, a + k * 0.15 + 0.3, easeOut);
        const x = cut ? prog(t, cut - 0.1, cut + 0.25) : 0;
        const out = cut ? prog(t, cut + 0.35, cut + 0.7, easeIn) : 0;
        const glow = k === 1 ? prog(t, 36.0, 36.3) : 0;
        return (
          <div key={l} style={{...card(CAT[k]), position: 'relative', width: k === 1 ? 340 : 270, height: k === 1 ? 380 : 320, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, transform: `scale(${p * (1 - 0.25 * out) * (1 + 0.06 * glow)}) translateY(${out * 60}px)`, opacity: p * (1 - 0.6 * out), background: k === 1 && glow > 0 ? '#FFF4E6' : '#fff', boxShadow: k === 1 && glow > 0 ? `0 0 0 6px ${ORANGE}, 0 16px 34px rgba(14,30,60,0.2)` : card().boxShadow}}>
            <F n={ic} size={k === 1 ? 160 : 120} float={4} />
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: k === 1 ? 42 : 34, color: CAT[k]}}>{l}</div>
            {cut && (
              <svg width={270} height={320} style={{position: 'absolute', inset: 0}}>
                <line x1={30} y1={30} x2={240} y2={290} stroke={RED} strokeWidth={14} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - x} />
                <line x1={240} y1={30} x2={30} y2={290} stroke={RED} strokeWidth={14} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - x} />
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
};

/** Aucune place au hasard : le dé roule puis est barré. */
const Hasard: React.FC<{a: number}> = ({a}) => {
  const t = useT();
  const roll = prog(t, a, a + 1.2, easeOut);
  const ban = prog(t, 53.3, 53.6);
  return (
    <div style={{position: 'relative', width: 420, height: 420, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{...card(colors.navy), width: 300, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `translateX(${(1 - roll) * -300}px) rotate(${roll * 540}deg)`, opacity: Math.min(1, roll * 3)}}><F n="de" size={210} /></div>
      <svg width={420} height={420} style={{position: 'absolute', inset: 0}}>
        <circle cx={210} cy={210} r={190} fill="none" stroke={RED} strokeWidth={20} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - ban} />
        <line x1={76} y1={76} x2={344} y2={344} stroke={RED} strokeWidth={20} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - prog(t, 53.5, 53.75)} />
      </svg>
    </div>
  );
};

/** Verdict : solvant corrosif → fiche catégorie 3 → tampon « EPI catégorie 3 ». */
const Verdict: React.FC<{a: number}> = ({a}) => {
  const t = useT();
  const pc = prog(t, 56.3, 56.65, easeOut);
  const st = prog(t, 58.24, 58.5, easeIn);
  return (
    <div style={{position: 'relative', width: 1000, height: 460}}>
      <PhotoCard src={PH('technicien-solvant.jpg')} at={a} x={200} y={200} w={330} h={400} rotate={-3} from="left" pos="50% 40%" />
      <div style={{position: 'absolute', left: 400, top: 170, opacity: prog(t, 55.9, 56.2)}}>
        <svg width={110} height={60}><path d={`M6 30 H${6 + 80 * prog(t, 55.9, 56.3)}`} stroke={colors.navy} strokeWidth={9} strokeLinecap="round" /><path d="M80 10 L102 30 L80 50" fill="none" stroke={colors.navy} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" opacity={prog(t, 56.2, 56.3)} /></svg>
      </div>
      <div style={{...card(RED), position: 'absolute', left: 540, top: 20, width: 420, height: 360, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, transform: `scale(${pc}) rotate(2deg)`, opacity: pc}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
          <div style={{width: 130, height: 146, borderRadius: 22, background: RED, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 100, boxShadow: '0 10px 22px rgba(14,30,60,0.28)', borderBottom: '8px solid rgba(0,0,0,0.22)'}}>3</div>
          <F n="crane" size={120} float={4} />
        </div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: RED}}>Catégorie 3</div>
        <div style={{fontFamily: handFont, fontSize: 36, color: '#7A8594'}}>Mort / dommages irréversibles</div>
      </div>
      {t > 58.24 && (
        <div style={{position: 'absolute', left: 500, top: 400, transform: `translate(-50%, -50%) rotate(-5deg) scale(${2.2 - 1.2 * st})`, opacity: st, display: 'flex', alignItems: 'center', gap: 16, border: `9px solid ${RED}`, borderRadius: 22, padding: '10px 30px', background: 'rgba(255,255,255,0.95)'}}>
          <F n="check" size={64} />
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: RED, whiteSpace: 'nowrap', letterSpacing: 1}}>EPI CATÉGORIE 3</div>
        </div>
      )}
    </div>
  );
};

const VisualBlock: React.FC<{e: Entry}> = ({e}) => {
  const t = useT();
  const k = e.v.reduce((acc, _, i) => (t >= visualAt(e, i) - 0.05 ? i : acc), 0);
  const v = e.v[k];
  const a = visualAt(e, k);
  const nextAt = k + 1 < e.v.length ? visualAt(e, k + 1) : endOf(ENTRIES.indexOf(e));
  const o = 1 - prog(t, nextAt - 0.3, nextAt - 0.05);
  if (v.k === 'photo') {
    const w = v.w ?? 580;
    const h = v.h ?? 420;
    return (
      <div style={{position: 'absolute', inset: 0, opacity: o}}>
        <PhotoCard src={v.src} at={a} x={390} y={1290} w={w} h={h} rotate={-2} from="left" pos={v.pos} />
        <div style={{position: 'absolute', left: 850, top: 1290, transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', gap: 16}}>
          {v.icons.map((ic, j) => {
            const p = prog(t, a + 0.3 + j * 0.15, a + 0.65 + j * 0.15, easeOut);
            return <div key={ic} style={{...card(e.color), width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${p})`}}><F n={ic} size={125} float={4} /></div>;
          })}
        </div>
      </div>
    );
  }
  const inner = v.k === 'duel' ? <Duel e={e} /> : v.k === 'scale' ? <Scale lit={v.lit} litAt={v.litAt} a={a} /> : v.k === 'exclusion' ? <Exclusion /> : v.k === 'hasard' ? <Hasard a={a} /> : <Verdict a={a} />;
  return <div style={{position: 'absolute', left: 540, top: 1290, transform: 'translate(-50%, -50%)', opacity: o}}>{inner}</div>;
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
          <F n="casque" size={48} />
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: colors.navy, letterSpacing: 2}}>LES CATÉGORIES D’EPI</div>
        </div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: e.color}}>{String(i + 1).padStart(2, '0')}<span style={{color: '#B9C0C8', fontSize: 30}}> / {String(ENTRIES.length).padStart(2, '0')}</span></div>
      </div>
      <Enter at={e.at + 0.15} x={540} y={400} bouncy>
        <div style={{background: e.color, color: '#fff', borderRadius: 30, padding: '8px 24px', fontFamily: sansFont, fontWeight: 800, fontSize: 28, letterSpacing: 3, textTransform: 'uppercase', whiteSpace: 'nowrap'}}>{e.fam}</div>
      </Enter>
      <div style={{position: 'absolute', left: 540, top: 590, transform: 'translate(-50%, -50%)'}}><Letters e={e} /></div>
      <div style={{position: 'absolute', left: 540, top: 772, transform: 'translate(-50%, -50%)'}}><Sub e={e} /></div>
      <div style={{position: 'absolute', left: 540, top: 905, transform: 'translate(-50%, -50%)'}}><Definition e={e} /></div>
      <VisualBlock e={e} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 1560, display: 'flex', justifyContent: 'center', gap: 9}}>
        {ENTRIES.map((x, k) => <div key={k} style={{width: k === i ? 40 : 13, height: 13, borderRadius: 7, background: k < i ? '#9AA5B3' : k === i ? e.color : '#D5D9DE'}} />)}
      </div>
    </div>
  );
};

/** Intro : mosaïque d'EPI, titre cinétique, les 3 niveaux, la question du critère. */
const ICONS = ['casque', 'gants', 'lunettes', 'chaussure', 'gilet', 'epi-ble', 'pansement', 'crane'];
const Intro: React.FC = () => {
  const t = useT();
  const q = prog(t, 5.88, 6.2, easeOut);
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: 60, right: 60, top: 320, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16}}>
        {ICONS.map((ic, i) => {
          const p = prog(t, 0.9 + i * 0.06, 1.25 + i * 0.06, easeOut);
          return <div key={ic} style={{...card(CAT[i % 3]), width: 200, height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: p * (t > 2.4 ? 0.4 : 1), transform: `translateY(${(1 - p) * -80}px) rotate(${(1 - p) * (i % 2 ? 20 : -20)}deg)`}}><F n={ic} size={110} /></div>;
        })}
      </div>
      <Enter at={1.4} x={540} y={900} from="down" bouncy>
        <div style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, color: colors.navy, lineHeight: 1}}>
          <div style={{fontSize: 98, whiteSpace: 'nowrap'}}>LES CATÉGORIES</div>
          <div style={{fontSize: 130, color: colors.green, marginTop: 6}}>D’EPI</div>
        </div>
      </Enter>
      <Enter at={2.2} x={540} y={1110} from="up">
        <div style={{fontFamily: handFont, fontSize: 64, color: colors.navy, whiteSpace: 'nowrap'}}>Équipements de <span style={{color: colors.green}}>protection individuelle</span></div>
      </Enter>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1240, display: 'flex', justifyContent: 'center', gap: 22, opacity: 1 - q}}>
        {[0, 1, 2].map((k) => {
          const p = prog(t, 4.68 + k * 0.12, 5.0 + k * 0.12, easeOut);
          return <div key={k} style={{width: 170, height: 190, borderRadius: 28, background: CAT[k], color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 130, transform: `translateY(${(1 - p) * -200}px) rotate(${(1 - p) * (k % 2 ? 14 : -14)}deg)`, opacity: Math.min(1, p * 2), boxShadow: '0 15px 30px rgba(14,30,60,0.3)', borderBottom: '10px solid rgba(0,0,0,0.22)'}}>{k + 1}</div>;
        })}
      </div>
      {t > 5.88 && (
        <div style={{position: 'absolute', left: 540, top: 1335, transform: `translate(-50%, -50%) scale(${q}) rotate(-3deg)`, display: 'flex', alignItems: 'center', gap: 18, background: colors.navy, color: '#fff', borderRadius: 26, padding: '16px 34px', fontFamily: sansFont, fontWeight: 900, fontSize: 50, whiteSpace: 'nowrap'}}>
          <F n="question" size={80} /> SUR QUEL CRITÈRE ?
        </div>
      )}
    </AbsoluteFill>
  );
};

/** La couverture reste à l'écran sur les premières images, puis s'efface sur l'intro. */
const CoverHold: React.FC = () => {
  const t = useT();
  const o = 1 - prog(t, COVER_END, COVER_END + 0.25);
  return o > 0 ? <AbsoluteFill style={{opacity: o, zIndex: 50}}><CategoriesEpiCouverture /></AbsoluteFill> : null;
};

/** Bruitages seuls (ni musique ni ambiance), calés sur chaque action. */
const CUES: Sfx[] = [
  {at: 0.05, s: 'bass-hit', v: 0.5},
  {at: 0.85, s: 'soft-whoosh', v: 0.45},
  ...ICONS.map((_, i) => ({at: 0.95 + i * 0.06, s: 'sfx/click', v: 0.3})),
  {at: 1.4, s: 'sfx/whoosh', v: 0.5},
  {at: 2.2, s: 'sfx/swish', v: 0.45},
  ...[0, 1, 2].map((k) => ({at: 4.75 + k * 0.12, s: 'sfx/pop', v: 0.45})),
  {at: 5.9, s: 'tampon', v: 0.6},
  ...ENTRIES.flatMap((e, i) => [
    {at: e.at - 0.1, s: i % 2 ? 'soft-whoosh' : 'page', v: 0.5},
    ...e.tiles.map((_, k) => ({at: e.at + 0.38 + k * 0.07, s: 'sfx/click', v: 0.38})),
    ...e.litAt.filter((x, k) => k === 0 || /\d/.test(e.tiles[k])).map((at) => ({at, s: 'tick', v: 0.45})),
  ]),
  {at: 8.0, s: 'sfx/pop', v: 0.42}, {at: 10.75, s: 'stylo', v: 0.5, dur: 0.5}, {at: 11.25, s: 'deep-hit', v: 0.5},
  {at: 12.8, s: 'soft-whoosh', v: 0.42}, {at: 13.15, s: 'sfx/pop', v: 0.42}, {at: 13.3, s: 'sfx/pop', v: 0.4},
  {at: 17.8, s: 'sfx/pop', v: 0.35}, {at: 19.84, s: 'sfx/ding', v: 0.45}, {at: 22.2, s: 'soft-whoosh', v: 0.42}, {at: 22.6, s: 'sfx/pop', v: 0.42}, {at: 22.75, s: 'sfx/pop', v: 0.4},
  {at: 29.1, s: 'soft-whoosh', v: 0.42}, {at: 29.5, s: 'sfx/pop', v: 0.42}, {at: 29.65, s: 'sfx/pop', v: 0.4},
  ...[0, 1, 2].map((k) => ({at: 33.3 + k * 0.15, s: 'sfx/pop', v: 0.4})), {at: 36.0, s: 'sfx/ding', v: 0.45},
  {at: 37.85, s: 'stylo', v: 0.5, dur: 0.4}, {at: 38.65, s: 'stylo', v: 0.5, dur: 0.4},
  {at: 40.0, s: 'sfx/pop', v: 0.35}, {at: 40.8, s: 'deep-hit', v: 0.55}, {at: 43.2, s: 'soft-whoosh', v: 0.42}, {at: 43.6, s: 'sfx/pop', v: 0.42}, {at: 43.75, s: 'sfx/pop', v: 0.4},
  {at: 47.8, s: 'deep-hit', v: 0.6},
  {at: 51.3, s: 'sfx/swish', v: 0.45}, {at: 53.3, s: 'stylo', v: 0.5, dur: 0.5},
  {at: 54.1, s: 'soft-whoosh', v: 0.42}, {at: 54.5, s: 'sfx/pop', v: 0.35}, {at: 56.0, s: 'sfx/swish', v: 0.35},
  {at: 58.3, s: 'tampon', v: 0.65}, {at: 58.5, s: 'validation', v: 0.45},
  {at: OUTRO_AT - 0.4, s: 'soft-whoosh', v: 0.5},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const CategoriesEpi: React.FC = () => (
  <AbsoluteFill>
    <Camera shakes={[47.8, 58.3]}>
      <Background />
      <Gate from={0} to={ENTRIES[0].at}><Intro /></Gate>
      <Gate from={ENTRIES[0].at} to={OUTRO_AT}>{ENTRIES.map((x, i) => <Page key={i} e={x} i={i} />)}</Gate>
      <Gate from={OUTRO_AT} to={999}><Outro at={OUTRO_AT} logo={LOGO} /></Gate>
    </Camera>
    <Header hideAt={OUTRO_AT} logo={LOGO} />
    <Footer hideAt={OUTRO_AT} />
    {ENTRIES.map((x, i) => <Wipe key={i} at={x.at} dur={0.45} color={x.color} />)}
    <Wipe at={OUTRO_AT} />
    <Flash at={47.8} />
    <Flash at={58.3} />
    <Captions captions={captions} />
    <Gate from={0} to={COVER_END + 0.3}><CoverHold /></Gate>
    <Audio src={staticFile('voix-categories-epi-origine.m4a')} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);
