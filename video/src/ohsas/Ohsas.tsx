import React from 'react';
import {AbsoluteFill, Audio, Img, random, staticFile} from 'remotion';
import {Gate} from '../anim';
import {Captions} from '../components/Captions';
import {Blinds, Board, Deep, Dust, Kin, Out, Pill, Stamp, Tile} from '../durab/Durab';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {handFont, s, sansFont} from '../theme';
import {Abs, Bg, DIM, easeIn, easeInOut, easeOut, GREEN, INK, lerp, LOGO, PAPER, PH, pop, prog, RED, spring, T, useT} from '../implIso/kit';
import {Brut, HiLine, Mono, Strike} from '../tdbPilot/TdbPilot';
import {captions} from './captions';

/**
 * « OHSAS 18001 vs ISO 45001 » (4 min 17) — capsule « condensé + effet wahou » : voix d'origine, sous-titres recalés
 * mot à mot, photos réelles, thème « papier quadrillé ».
 * Fil rouge : LE TUBE PNEUMATIQUE À SIX GUICHETS (statut → HLS → prévention → engagement → récap → miroir) ; la
 * capsule du dossier file d'un guichet à l'autre et chaque guichet passé se coche.
 * Transition : LE GYROPHARE à chaque partie.
 * Condensé de la série : texte cinétique, mot surligné jaune, mot manuscrit, tuiles de bois, palettes d'affichage,
 * fenêtres d'interface, store vénitien sur photo, photos en profondeur, compteurs, cartes à ombre dure, étiquettes
 * monospace, tampons, mots barrés, onde de choc, cases cochées, poussière.
 * Effets « wahou » nouveaux : fenêtre de mise à jour logicielle qui explose en « RÉVOLUTION », document dépoussiéré,
 * globe 3D qui tourne avec épingles et « sécurité » en six langues en orbite, barre de recherche qui trouve puis OUVRE
 * l'élément trouvé (clic, la ligne s'agrandit en plein cadre), calques ISO qui fusionnent en un squelette commun,
 * piles de paperasse qui fondent en une seule, sélecteur qui pivote à 180° de « réactif » à « proactif », frise
 * risque → danger → accident avec bouclier placé en amont, pansements arrachés, projecteur qui passe d'un bureau à
 * toute l'équipe, mur construit à plusieurs mains, temple dont le pilier « sécurité » s'élève sous la stratégie,
 * tableau comparatif dont les lignes se retournent, miroir avec reflet qui balaie.
 */
const BLUE = '#1F6FD1';
const NAVY = '#0E2A5C';
const ORANGE = '#F07A12';
const YEL = '#F5C400';
const BURG = '#7A1F2B';
const NIGHT = '#151A26';
const TEAL = '#0F9D8F';
const VIO = '#6D4BD8';
const GOLD = '#E0A100';
const GLASS = '#BFD7EA';
const MONO = '"JetBrains Mono", "IBM Plex Mono", "DejaVu Sans Mono", monospace';
const OUTRO_AT = 257.0;
export const OHSAS_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string}[] = [
  {at: 26.85, n: '1', title: 'Du local à l’international', s: 'le statut des normes', c: BLUE, g: 'statut', k: 'gyro', lab: 'PARTIE 1 / 6'},
  {at: 54.2, n: '2', title: 'La structure de haut niveau', s: 'l’avantage HLS', c: VIO, g: 'HLS', k: 'gyro', lab: 'PARTIE 2 / 6'},
  {at: 102.9, n: '3', title: 'La prévention d’abord', s: 'une nouvelle philosophie', c: ORANGE, g: 'prévention', k: 'gyro', lab: 'PARTIE 3 / 6'},
  {at: 147.0, n: '4', title: 'L’engagement de tous', s: 'leadership et implication', c: TEAL, g: 'engagement', k: 'gyro', lab: 'PARTIE 4 / 6'},
  {at: 204.8, n: '5', title: 'Pourquoi évoluer ?', s: 'les changements clés', c: RED, g: 'récap', k: 'gyro', lab: 'PARTIE 5 / 6'},
  {at: 235.35, n: '6', title: 'Et votre culture ?', s: 'prête pour l’avenir', c: GREEN, g: 'miroir', k: 'gyro', lab: 'PARTIE 6 / 6'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 250.5;

const Count: React.FC<{n: number; a: number; b: number; from?: number; dec?: number; suf?: string}> = ({n, a, b, from = 0, dec = 0, suf = ''}) => {
  const t = useT();
  const v = lerp(from, n, prog(t, a, b, easeOut));
  return <>{v.toFixed(dec).replace('.', ',')}{suf}</>;
};
const Capsule: React.FC<{w: number; c: string; open?: number}> = ({w, c, open = 0}) => {
  const h = w * 0.36;
  return (
    <div style={{position: 'relative', width: w, height: h}}>
      <div style={{position: 'absolute', left: h * 0.3, right: h * 0.3, top: 0, bottom: 0, background: `linear-gradient(180deg, #fff, ${c} 35%, ${c} 70%, #0003)`, borderRadius: 6}} />
      <div style={{position: 'absolute', left: 0, top: 0, width: h * 0.6, height: h, borderRadius: '50%', background: 'linear-gradient(180deg, #EEE, #888)', transform: `translateX(${-open * h * 0.4}px)`}} />
      <div style={{position: 'absolute', right: 0, top: 0, width: h * 0.6, height: h, borderRadius: '50%', background: 'linear-gradient(180deg, #EEE, #888)', transform: `translateX(${open * h * 0.4}px)`}} />
      <div style={{position: 'absolute', left: '30%', right: '30%', top: '42%', height: '16%', background: 'rgba(255,255,255,0.55)', borderRadius: 4}} />
    </div>
  );
};
const Tube: React.FC<{x: number; y: number; w: number; h: number}> = ({x, y, w, h}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: h / 2, background: `linear-gradient(180deg, rgba(255,255,255,0.9), ${GLASS}88 40%, ${GLASS}CC 75%, rgba(255,255,255,0.7))`, border: `3px solid ${GLASS}`, boxShadow: 'inset 0 6px 10px rgba(255,255,255,0.8), 0 10px 20px rgba(20,33,61,0.1)'}} />
);
/** Fenêtre d'interface (barre à pastilles). */
const Win: React.FC<{x: number; y: number; w: number; h: number; at: number; title: string; c?: string; dark?: boolean; style?: React.CSSProperties; children: React.ReactNode}> = ({x, y, w, h, at, title, c = INK, dark, style, children}) => {
  const t = useT();
  const p = Math.max(0, Math.min(1, spring(t, at, 8, 13)));
  return (
    <Abs x={x} y={y} w={w} h={h} style={{background: dark ? NIGHT : '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `8px 8px 0 ${c}`, overflow: 'hidden', opacity: t >= at ? 1 : 0, transform: `translateY(${(1 - p) * 60}px) scale(${0.92 + 0.08 * p})`, ...style}}>
      <div style={{height: 44, background: dark ? '#0E1320' : '#EEF1F5', display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 14, borderBottom: `3px solid ${INK}`}}>{[RED, YEL, GREEN].map((q) => <div key={q} style={{width: 13, height: 13, borderRadius: 7, background: q}} />)}<span style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: dark ? '#8B95A8' : DIM, marginLeft: 10}}>{title}</span></div>
      <div style={{position: 'relative', height: h - 49}}>{children}</div>
    </Abs>
  );
};
/** Ligne de case cochée (brique « William »). */
const Check: React.FC<{at: number; label: string; c?: string; size?: number}> = ({at, label, c = GREEN, size = 32}) => {
  const t = useT();
  const p = pop(t, at);
  const k = prog(t, at + 0.25, at + 0.55, easeOut);
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 18, background: '#fff', border: `4px solid ${INK}`, borderRadius: 14, padding: '14px 18px', boxShadow: `6px 6px 0 ${k > 0.5 ? c : '#C9D2DF'}`, opacity: p, transform: `translateX(${(1 - p) * 60}px)`}}>
      <div style={{width: 48, height: 48, borderRadius: 10, border: `4px solid ${INK}`, background: k > 0 ? c : '#fff', color: '#fff', fontWeight: 900, fontSize: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transform: `scale(${1 + 0.2 * Math.sin(k * Math.PI)})`}}>{k > 0.3 ? '✓' : ''}</div>
      <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: size, color: INK}}>{label}</div>
    </div>
  );
};

/* ═════════════ Fil rouge : le tube à six guichets ═════════════ */
const Header: React.FC = () => {
  const t = useT();
  const si = sectIdx(t);
  const sx = (k: number) => 86 + k * 167;
  const a = si >= 0 ? SECT[si].at : 0;
  const pr = si < 0 ? 0 : prog(t, a, a + 1.4, easeInOut);
  const from = si <= 0 ? -0.45 : si - 1;
  const to = si < 0 ? -0.45 : si;
  const pos = lerp(from, to, pr);
  const x0 = Math.floor(pos);
  const cx = pos < 0 ? lerp(20, sx(0), pos + 1) : lerp(sx(x0), sx(Math.min(5, x0 + 1)), pos - x0);
  const c = si < 0 ? INK : SECT[si].c;
  return (
    <AbsoluteFill style={{zIndex: 40, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: '50%', top: 56, transform: 'translateX(-50%)', background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 8px 24px rgba(20,33,61,0.12)'}}><Img src={staticFile(LOGO)} style={{height: 76, display: 'block'}} /></div>
      {t > 2.6 && t < OUTRO_AT && (
        <div style={{position: 'absolute', left: 36, right: 36, top: 178, height: 108, borderRadius: 20, background: '#fff', border: `5px solid ${INK}`, boxShadow: `7px 7px 0 ${BURG}`, opacity: pop(t, 2.6), overflow: 'hidden'}}>
          <Tube x={30} y={26} w={940} h={26} />
          {SECT.map((x, k) => {
            const passed = k < si || t >= ALLDONE;
            const here = k === si && t < ALLDONE;
            return (
              <div key={k} style={{position: 'absolute', left: sx(k) - 22, top: 16}}>
                <div style={{width: 44, height: 44, borderRadius: 10, background: passed ? GREEN : here ? x.c : '#fff', border: `4px solid ${passed || here ? '#fff' : '#C9D2DF'}`, boxShadow: here ? `0 0 0 3px ${x.c}66` : passed ? `0 0 0 3px ${GREEN}55` : 'none', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 20}}>{passed ? '✓' : here ? x.n : ''}</div>
                <div style={{position: 'absolute', left: -52, width: 148, top: 50, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 14, color: here ? x.c : passed ? GREEN : '#A9B1BE'}}>{x.g}</div>
              </div>
            );
          })}
          <div style={{position: 'absolute', left: cx - 30, top: 29, filter: pr > 0 && pr < 1 ? 'blur(1.5px)' : undefined}}><Capsule w={60} c={c} /></div>
        </div>
      )}
    </AbsoluteFill>
  );
};

/* ═════════════ Transitions ═════════════ */
const TitleBlock: React.FC<{i: number; y: number; at: number; dark?: boolean}> = ({i, y, at, dark}) => {
  const t = useT();
  const S0 = SECT[i];
  return (
    <>
      <Abs x={60} y={y} w={960} style={{textAlign: 'center'}}><Kin text={S0.title} at={at} size={S0.title.length > 20 ? 66 : 80} color={dark ? '#fff' : INK} /></Abs>
      <Abs x={0} y={y + (S0.title.length > 20 ? 190 : 120)} w={1080} style={{textAlign: 'center'}}><div style={{display: 'inline-block', background: S0.c, color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 30, letterSpacing: 2, padding: '6px 16px', borderRadius: 6, opacity: pop(t, at + 0.5)}}>{S0.s.toUpperCase()}</div></Abs>
    </>
  );
};
const Pneumatique: React.FC<{i: number}> = ({i}) => {
  const t = useT();
  const S0 = SECT[i];
  const k = t - S0.at;
  if (k < 0 || k > 3.6) return null;
  const bg = prog(t, S0.at, S0.at + 0.3, easeOut) * (1 - prog(t, S0.at + 3.25, S0.at + 3.6, easeIn));
  const arrive = prog(t, S0.at + 0.15, S0.at + 0.75, easeOut);
  const leave = prog(t, S0.at + 2.9, S0.at + 3.4, easeIn);
  const cx = leave > 0 ? lerp(540, 1500, leave) : lerp(-300, 540, arrive);
  const bump = Math.max(0, 1 - Math.abs(k - 0.78) * 8);
  const open = prog(t, S0.at + 0.8, S0.at + 1.0, easeOut) * (1 - prog(t, S0.at + 2.65, S0.at + 2.85, easeIn));
  const unroll = prog(t, S0.at + 0.95, S0.at + 1.6, easeOut) * (1 - prog(t, S0.at + 2.4, S0.at + 2.85, easeInOut));
  const H = 760;
  const word = S0.g.toUpperCase().slice(0, 7);
  return (
    <AbsoluteFill style={{zIndex: 35, opacity: bg}}>
      <AbsoluteFill style={{background: '#F3F7FB'}} />
      <AbsoluteFill style={{backgroundImage: 'linear-gradient(#DDE7F1 2px, transparent 2px), linear-gradient(90deg, #DDE7F1 2px, transparent 2px)', backgroundSize: '60px 60px', opacity: 0.8}} />
      <Tube x={-40} y={560} w={1160} h={120} />
      {unroll > 0 && (
        <div style={{position: 'absolute', left: 140, top: 650, width: 800, height: H * unroll, overflow: 'hidden', background: 'linear-gradient(90deg, #EFE3C2, #FBF4DF 12%, #FBF4DF 88%, #EFE3C2)', boxShadow: '0 30px 60px rgba(20,33,61,0.25)'}}>
          <div style={{position: 'absolute', left: 0, right: 0, top: 60, textAlign: 'center'}}><div style={{display: 'inline-block', padding: '8px 24px', border: `6px solid ${S0.c}`, borderRadius: 12, color: S0.c, fontFamily: sansFont, fontWeight: 900, fontSize: 38, letterSpacing: 3, transform: 'rotate(-4deg)', opacity: prog(t, S0.at + 1.3, S0.at + 1.45)}}>{S0.lab}</div></div>
          <div style={{position: 'absolute', left: 40, right: 40, top: 190, textAlign: 'center'}}><Kin text={S0.title} at={S0.at + 1.35} size={S0.title.length > 20 ? 60 : 76} /></div>
          <div style={{position: 'absolute', left: 0, right: 0, top: 470, display: 'flex', justifyContent: 'center', gap: 10}}>{word.split('').map((ch, j) => <div key={j} style={{transform: `scale(${Math.max(0, Math.min(1, spring(t, S0.at + 1.6 + j * 0.06, 8, 12)))})`}}><Tile ch={ch} size={word.length > 6 ? 72 : 82} c={S0.c} /></div>)}</div>
          <div style={{position: 'absolute', left: 0, right: 0, top: 600, textAlign: 'center'}}><div style={{display: 'inline-block', background: S0.c, color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 26, padding: '6px 14px', borderRadius: 6}}>{S0.s.toUpperCase()}</div></div>
        </div>
      )}
      {unroll > 0 && <div style={{position: 'absolute', left: 120, top: 650 + H * unroll - 22, width: 840, height: 44, borderRadius: 22, background: 'linear-gradient(180deg, #E6D3A0, #B9995A)', boxShadow: '0 10px 20px rgba(0,0,0,0.25)'}} />}
      <div style={{position: 'absolute', left: cx - 160, top: 564, transform: `scaleX(${1 + bump * 0.08}) scaleY(${1 - bump * 0.06})`}}><Capsule w={320} c={S0.c} open={open} /></div>
    </AbsoluteFill>
  );
};
const Gyro: React.FC<{i: number}> = ({i}) => {
  const t = useT();
  const S0 = SECT[i];
  const k = t - S0.at;
  if (k < 0 || k > 3.4) return null;
  const inn = prog(t, S0.at, S0.at + 0.25, easeOut) * (1 - prog(t, S0.at + 3.0, S0.at + 3.4, easeIn));
  const band = prog(t, S0.at + 0.3, S0.at + 1.0, easeOut);
  const beam = S0.n === '!' ? '224,74,63' : '31,111,209';
  return (
    <AbsoluteFill style={{zIndex: 35, opacity: inn, overflow: 'hidden'}}>
      <AbsoluteFill style={{background: PAPER}} />
      <Bg />
      <AbsoluteFill style={{background: `conic-gradient(from ${k * 520}deg at 540px 300px, rgba(${beam},0.38) 0deg, transparent 26deg, transparent 180deg, rgba(${beam},0.38) 180deg, transparent 206deg)`, opacity: 1 - prog(t, S0.at + 1.6, S0.at + 2.4)}} />
      <div style={{position: 'absolute', left: 470, top: 250, width: 140, height: 90, borderRadius: '70px 70px 12px 12px', background: `radial-gradient(circle at 50% 40%, #fff, rgb(${beam}) 60%)`, border: `5px solid ${INK}`, boxShadow: `0 0 ${40 + 30 * Math.abs(Math.sin(k * 9))}px rgb(${beam})`}} />
      <div style={{position: 'absolute', left: -400, top: 760, width: 1900, height: 260, transform: `translateX(${lerp(-1900, 0, band)}px) rotate(-8deg)`, background: `repeating-conic-gradient(${NAVY} 0 25%, ${YEL} 0 50%) 0 0 / 130px 130px`, border: `8px solid ${INK}`}} />
      <div style={{position: 'absolute', left: 110, top: 740, width: 860, height: 300, transform: `rotate(-8deg) scale(${Math.max(0, Math.min(1, spring(t, S0.at + 0.9, 8, 12)))})`, background: '#fff', border: `7px solid ${INK}`, borderRadius: 24, boxShadow: `12px 12px 0 ${S0.c}`, display: 'flex', alignItems: 'center', gap: 26, padding: '0 30px', boxSizing: 'border-box'}}>
        <div style={{width: 150, height: 150, borderRadius: 75, background: S0.c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 96, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{S0.n}</div>
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, color: DIM, letterSpacing: 3}}>{S0.lab}</div><Kin text={S0.title} at={S0.at + 1.1} size={S0.title.length > 18 ? 50 : 62} /></div>
      </div>
      <Abs x={0} y={1140} w={1080} style={{textAlign: 'center'}}><div style={{display: 'inline-block', background: S0.c, color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 30, letterSpacing: 2, padding: '6px 16px', borderRadius: 6, opacity: pop(t, S0.at + 1.6)}}>{S0.s.toUpperCase()}</div></Abs>
    </AbsoluteFill>
  );
};
const Loupe: React.FC<{i: number}> = ({i}) => {
  const t = useT();
  const S0 = SECT[i];
  const k = t - S0.at;
  if (k < 0 || k > 3.5) return null;
  const slide = prog(t, S0.at, S0.at + 0.75, easeOut);
  const iris = prog(t, S0.at + 1.1, S0.at + 1.7, easeInOut);
  const out = prog(t, S0.at + 3.1, S0.at + 3.5, easeIn);
  const cx = lerp(1350, 540, slide);
  const cy = 860;
  const r = lerp(250, 1500, iris);
  return (
    <AbsoluteFill style={{zIndex: 35, opacity: 1 - out}}>
      <AbsoluteFill style={{background: `rgba(248,245,236,${0.6 * slide * (1 - iris) + iris})`}} />
      <AbsoluteFill style={{clipPath: `circle(${r}px at ${cx}px ${cy}px)`}}>
        <AbsoluteFill style={{background: PAPER}} />
        <Bg />
        <AbsoluteFill style={{background: `radial-gradient(circle at ${cx}px ${cy}px, ${S0.c}22, transparent 60%)`}} />
        <Abs x={0} y={560} w={1080} style={{display: 'flex', justifyContent: 'center', transform: `scale(${lerp(1.5, 1, iris)})`}}><Tile ch={S0.n} size={170} c={S0.c} /></Abs>
        <TitleBlock i={i} y={790} at={S0.at + 0.4} />
      </AbsoluteFill>
      {iris < 1 && (
        <>
          <div style={{position: 'absolute', left: cx - r, top: cy - r, width: r * 2, height: r * 2, borderRadius: '50%', border: `${lerp(26, 6, iris)}px solid ${INK}`, boxShadow: 'inset 0 0 40px rgba(255,255,255,0.6), 0 30px 60px rgba(20,33,61,0.3)', opacity: 1 - iris}} />
          <div style={{position: 'absolute', left: cx + r * 0.68, top: cy + r * 0.68, width: 60, height: 300, background: `linear-gradient(90deg, ${NIGHT}, #4A5468, ${NIGHT})`, borderRadius: 30, transform: 'rotate(-45deg)', transformOrigin: '50% 0', opacity: 1 - iris}} />
        </>
      )}
    </AbsoluteFill>
  );
};
/** Le store vénitien : les lamelles se ferment, portent le titre, puis se rouvrent sur la scène suivante. */
const Store: React.FC<{i: number}> = ({i}) => {
  const t = useT();
  const S0 = SECT[i];
  const k = t - S0.at;
  if (k < 0 || k > 3.5) return null;
  const n = 12;
  const lh = 1920 / n;
  const show = prog(t, S0.at + 0.55, S0.at + 0.8) * (1 - prog(t, S0.at + 2.7, S0.at + 2.9));
  return (
    <AbsoluteFill style={{zIndex: 35}}>
      {Array.from({length: n}, (_, j) => {
        const close = prog(t, S0.at + j * 0.035, S0.at + 0.4 + j * 0.035, easeOut);
        const open = prog(t, S0.at + 2.85 + j * 0.035, S0.at + 3.2 + j * 0.035, easeIn);
        const p = close * (1 - open);
        return (
          <div key={j} style={{position: 'absolute', left: 0, right: 0, top: j * lh, height: lh + 1, perspective: 1200}}>
            <div style={{width: '100%', height: '100%', transform: `rotateX(${(1 - p) * 88}deg)`, background: `linear-gradient(180deg, ${j % 2 ? '#FBF4E4' : '#F4EAD2'}, ${j % 2 ? '#EADCB9' : '#E3D2AA'})`, boxShadow: 'inset 0 -6px 10px rgba(0,0,0,0.12), 0 2px 0 rgba(0,0,0,0.08)', opacity: p > 0.01 ? 1 : 0}} />
          </div>
        );
      })}
      <div style={{position: 'absolute', left: 520, top: 0, width: 8, height: 1920 * prog(t, S0.at + 0.3, S0.at + 0.7) * (1 - prog(t, S0.at + 2.85, S0.at + 3.2)), background: '#B39A6A'}} />
      <AbsoluteFill style={{opacity: show}}>
        <Abs x={0} y={520} w={1080} style={{textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 40, letterSpacing: 6, color: DIM}}>{S0.lab}</Abs>
        <Abs x={0} y={610} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Tile ch={S0.n} size={150} c={S0.c} /></Abs>
        <TitleBlock i={i} y={830} at={S0.at + 0.7} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};


/* ═════════════ Barre de recherche qui trouve et OUVRE l'élément ═════════════ */
const SearchOpen: React.FC<{x: number; y: number; w: number; h: number; at: number; query: string; results: string[]; found: number; foundAt: number; clickAt: number; c: string; children: React.ReactNode}> = ({x, y, w, h, at, query, results, found, foundAt, clickAt, c, children}) => {
  const t = useT();
  const typeEnd = at + 0.3 + query.length * 0.05;
  const typed = Math.floor(prog(t, at + 0.3, typeEnd) * query.length);
  const drop = prog(t, typeEnd + 0.1, typeEnd + 0.5, easeOut);
  const hit = prog(t, foundAt, foundAt + 0.3, easeOut);
  const cur = prog(t, foundAt + 0.1, clickAt, easeInOut);
  const open = prog(t, clickAt + 0.15, clickAt + 0.85, easeInOut);
  const rowH = 86;
  const ry = y + 130 + found * rowH;
  const rowRect = {l: x + 30, t: ry, w: w - 60, h: rowH};
  const box = {l: lerp(rowRect.l, x, open), t: lerp(rowRect.t, y, open), w: lerp(rowRect.w, w, open), h: lerp(rowRect.h, h, open)};
  const ring = (t - clickAt) / 0.6;
  return (
    <>
      <Abs x={x} y={y} w={w} style={{opacity: pop(t, at) * (1 - open), transform: `translateY(${(1 - pop(t, at)) * 30}px)`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 18, height: 104, background: '#fff', border: `5px solid ${INK}`, borderRadius: 52, boxShadow: `8px 8px 0 ${c}`, padding: '0 30px'}}>
          <F n="loupe" size={62} />
          <div style={{flex: 1, fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: INK, whiteSpace: 'nowrap', overflow: 'hidden'}}>{query.slice(0, typed)}<span style={{opacity: Math.sin(t * 12) > 0 ? 1 : 0, color: c}}>|</span></div>
          <div style={{width: 64, height: 64, borderRadius: 32, background: c, color: '#fff', fontWeight: 900, fontSize: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${1 + 0.25 * Math.max(0, 1 - Math.abs(t - typeEnd) * 6)})`}}>↵</div>
        </div>
        <div style={{margin: '22px 30px 0', background: '#fff', border: `4px solid ${INK}`, borderRadius: 22, overflow: 'hidden', height: drop * results.length * rowH, boxShadow: '0 20px 40px rgba(20,33,61,0.15)'}}>
          {results.map((r, k) => {
            const isF = k === found && hit > 0;
            const scanning = hit === 0 && Math.floor((t * 3) % results.length) === k;
            return (
              <div key={k} style={{display: 'flex', alignItems: 'center', gap: 14, height: rowH, boxSizing: 'border-box', padding: '0 24px', borderBottom: '2px solid #EEF1F5', background: isF ? `${c}22` : scanning ? '#F2F6FC' : '#fff', opacity: pop(t, typeEnd + 0.4 + k * 0.12)}}>
                <div style={{width: 14, height: 14, borderRadius: 7, background: isF ? c : '#C9D2DF'}} />
                <div style={{flex: 1, fontFamily: sansFont, fontWeight: isF ? 900 : 700, fontSize: 27, color: isF ? INK : DIM}}>{r}</div>
                {isF && <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, color: '#fff', background: c, padding: '4px 12px', borderRadius: 6, transform: `scale(${hit})`}}>TROUVÉ ✓</div>}
              </div>
            );
          })}
        </div>
      </Abs>
      {t > foundAt && open < 1 && (
        <div style={{position: 'absolute', left: lerp(x + w - 120, rowRect.l + rowRect.w * 0.55, cur), top: lerp(y + 40, ry + 40, cur), zIndex: 20, transform: `scale(${t > clickAt && t < clickAt + 0.15 ? 0.85 : 1})`}}>
          <svg width={54} height={66} viewBox="0 0 24 30"><path d="M2 2 L2 24 L8 18 L12 28 L16 26 L12 17 L20 17 Z" fill="#fff" stroke={INK} strokeWidth={2} strokeLinejoin="round" /></svg>
        </div>
      )}
      {ring > 0 && ring < 1 && <div style={{position: 'absolute', left: rowRect.l + rowRect.w * 0.55 - ring * 90, top: ry + 40 - ring * 90, width: ring * 180, height: ring * 180, borderRadius: '50%', border: `6px solid ${c}`, opacity: 1 - ring, zIndex: 19}} />}
      {open > 0 && (
        <div style={{position: 'absolute', left: box.l, top: box.t, width: box.w, height: box.h, background: '#fff', border: `5px solid ${INK}`, borderRadius: lerp(14, 26, open), boxShadow: `10px 10px 0 ${c}`, overflow: 'hidden', zIndex: 10}}>
          <div style={{height: 50, background: `${c}22`, borderBottom: `3px solid ${INK}`, display: 'flex', alignItems: 'center', gap: 10, paddingLeft: 18, fontFamily: MONO, fontWeight: 700, fontSize: 20, color: INK}}><span style={{color: c}}>●</span>{results[found]}</div>
          <div style={{position: 'relative', height: h - 55, opacity: prog(t, clickAt + 0.7, clickAt + 1.0)}}>{children}</div>
        </div>
      )}
    </>
  );
};

/* ═════════════ Couverture ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <Img src={PH('zones/chantier.jpg')} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 880, objectFit: 'cover', objectPosition: '50% 35%'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 30%, ${PAPER}DD 40%, ${PAPER} 45%)`}} />
      <Abs x={0} y={90} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={690} w={1080} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', fontFamily: MONO, fontWeight: 700, fontSize: 28, letterSpacing: 4, color: '#fff', background: INK, padding: '8px 22px', borderRadius: 6}}>SANTÉ ET SÉCURITÉ AU TRAVAIL</div>
        <div style={{marginTop: 22, opacity: 0.55}}><Board text="OHSAS 18001" at={-1} h={84} c={DIM} stag={0.03} /></div>
        <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 80, color: RED, marginTop: 4}}>vs</div>
        <div style={{display: 'flex', justifyContent: 'center', gap: 6}}>{'ISO45001'.split('').map((c, i) => <React.Fragment key={i}>{i === 3 && <div style={{width: 24}} />}<Tile ch={c} size={100} c={GREEN} /></React.Fragment>)}</div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 48, color: INK, marginTop: 22}}>mise à jour ou <span style={{backgroundImage: `linear-gradient(${YEL}, ${YEL})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 40%', backgroundPosition: '0 85%'}}>révolution</span> ?</div>
      </Abs>
      <Abs x={60} y={1400} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140, top: 36}}><Capsule w={56} c={BLUE} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 70, width: 140, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ INTRO : mise à jour → révolution ═════════════ */
const Intro: React.FC = () => {
  const t = useT();
  const bar = prog(t, 8.0, 12.6, easeInOut);
  const dust = prog(t, 18.4, 20.4);
  const boom = prog(t, 21.3, 21.6);
  return (
    <Out end={26.95}>
      {t < 15.4 && (
        <>
          <HiLine words={['Une', 'transition', 'majeure']} mark={[2]} at={2.9} y={330} size={66} />
          <Win x={110} y={480} w={860} h={520} at={5.6} title="mise_a_jour_normative" c={GREEN}>
            <div style={{padding: 36}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 20}}><F n="engrenage" size={90} /><div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK}}>Mise à jour disponible</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, color: DIM, marginTop: 6}}>santé · sécurité au travail</div></div></div>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, marginTop: 40, fontFamily: sansFont, fontWeight: 900, fontSize: 44}}>
                <span style={{color: DIM, opacity: pop(t, 6.8)}}>OHSAS 18001</span><span style={{color: INK, opacity: pop(t, 7.4)}}>→</span><span style={{color: GREEN, opacity: pop(t, 7.6)}}>ISO 45001</span>
              </div>
              <div style={{marginTop: 46, height: 34, borderRadius: 17, background: '#E3E8EF', border: `3px solid ${INK}`, overflow: 'hidden'}}><div style={{width: `${bar * 100}%`, height: '100%', background: `repeating-linear-gradient(45deg, ${GREEN} 0 20px, #2FB37E 20px 40px)`}} /></div>
              <div style={{marginTop: 10, fontFamily: MONO, fontWeight: 700, fontSize: 22, color: INK, textAlign: 'right'}}>{Math.round(bar * 100)} %</div>
            </div>
          </Win>
          <Abs x={0} y={1060} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, opacity: pop(t, 13.9)}}><F n="coeur" size={80} /><div style={{fontFamily: handFont, fontWeight: 700, fontSize: 58, color: RED}}>le bien-être des équipes</div></Abs>
        </>
      )}
      {t >= 15.4 && (
        <>
          <HiLine words={['Dépoussiérage', 'ou', 'révolution', '?']} mark={[0, 2]} at={15.6} y={330} size={58} />
          {t < 21.5 && (
            <Abs x={240} y={470} w={600} h={600} style={{transform: `scale(${1 + boom * 0.3})`, opacity: 1 - boom}}>
              <div style={{position: 'absolute', inset: 0, background: '#F4F1E8', border: `5px solid ${INK}`, borderRadius: 16, boxShadow: `8px 8px 0 ${DIM}`, padding: 40, boxSizing: 'border-box', filter: `sepia(${0.6 - dust * 0.6})`}}>
                <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 34, color: INK}}>OHSAS 18001</div>
                {Array.from({length: 7}, (_, k) => <div key={k} style={{height: 14, background: '#D8CBA6', borderRadius: 7, marginTop: 30, width: `${70 + (k % 3) * 10}%`}} />)}
              </div>
              {Array.from({length: 40}, (_, k) => {const q = Math.max(0, dust - random(`dd${k}`) * 0.4); return q > 0 && q < 1 ? <div key={k} style={{position: 'absolute', left: random(`dx${k}`) * 600 + q * 500, top: random(`dy${k}`) * 600 - q * 200, width: 10 + random(`ds${k}`) * 16, height: 10 + random(`ds${k}`) * 16, borderRadius: '50%', background: '#C8BFA8', opacity: 0.8 * (1 - q)}} /> : null;})}
            </Abs>
          )}
          {boom > 0 && boom < 1 && <div style={{position: 'absolute', left: 540 - boom * 700, top: 770 - boom * 700, width: boom * 1400, height: boom * 1400, borderRadius: '50%', border: `20px solid ${RED}`, opacity: 1 - boom}} />}
          {t >= 21.3 && <Abs x={0} y={620} w={1080}><Board text="REVOLUTION" at={21.4} h={96} c={RED} stag={0.035} /></Abs>}
          {t >= 21.3 && <Abs x={0} y={800} w={1080} style={{textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 58, color: INK, opacity: pop(t, 22.6)}}>un changement total ?</Abs>}
          <Abs x={0} y={950} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, opacity: pop(t, 24.6)}}><F n="loupe" size={80} /><Pill at={25.3} c={INK} size={32}>on décortique ensemble</Pill></Abs>
        </>
      )}
    </Out>
  );
};

/* ═════════════ PARTIE 1 : globe 3D ═════════════ */
const PINS = [{lon: 0, lat: 52}, {lon: -74, lat: 41}, {lon: 139, lat: 36}, {lon: 18, lat: -34}, {lon: -47, lat: -23}, {lon: 77, lat: 28}, {lon: 3, lat: 6}, {lon: 151, lat: -34}, {lon: 37, lat: 55}, {lon: -99, lat: 19}];
const Globe: React.FC<{r: number; at: number; pins: number}> = ({r, at, pins}) => {
  const t = useT();
  const rot = (t - at) * 40;
  const pr = (lon: number, lat: number) => {const a = ((lon + rot) * Math.PI) / 180, b = (lat * Math.PI) / 180; return {x: Math.sin(a) * Math.cos(b) * r, y: -Math.sin(b) * r, z: Math.cos(a) * Math.cos(b)};};
  return (
    <svg width={r * 2 + 20} height={r * 2 + 20} viewBox={`${-r - 10} ${-r - 10} ${r * 2 + 20} ${r * 2 + 20}`}>
      <defs><radialGradient id="gl" cx="35%" cy="30%"><stop offset="0%" stopColor="#BFE3FF" /><stop offset="100%" stopColor={BLUE} /></radialGradient></defs>
      <circle r={r} fill="url(#gl)" stroke={INK} strokeWidth={6} />
      {[-60, -30, 0, 30, 60].map((lat) => <ellipse key={lat} cx={0} cy={-Math.sin((lat * Math.PI) / 180) * r} rx={Math.cos((lat * Math.PI) / 180) * r} ry={Math.cos((lat * Math.PI) / 180) * r * 0.18} fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth={2} />)}
      {Array.from({length: 6}, (_, k) => {const a = (((k * 30 + rot) % 180) * Math.PI) / 180; return <ellipse key={k} cx={0} cy={0} rx={Math.abs(Math.cos(a)) * r} ry={r} fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth={2} />;})}
      {PINS.map((p, k) => {const q = pr(p.lon, p.lat); const on = prog(t, at + 1.5 + k * 0.45, at + 1.8 + k * 0.45); return q.z > 0 && on > 0 && k < pins ? <g key={k} transform={`translate(${q.x} ${q.y}) scale(${on})`}><circle r={12} fill={k === 0 ? RED : YEL} stroke={INK} strokeWidth={3} /><circle r={22} fill="none" stroke={YEL} strokeWidth={3} opacity={0.5 + 0.5 * Math.sin(t * 6 + k)} /></g> : null;})}
    </svg>
  );
};
const Statut: React.FC = () => {
  const t = useT();
  const WORDS = ['Sécurité', 'Safety', 'Seguridad', 'Sicherheit', 'Segurança', 'Usalama'];
  return (
    <Out end={54.3}>
      <HiLine words={['L’origine', 'et', 'la', 'portée']} mark={[0, 3]} at={30.6} y={330} size={66} />
      <Brut x={60} y={460} w={400} h={420} at={35.3} sh={DIM} style={{textAlign: 'center'}}>
        <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, color: DIM}}>OHSAS 18001</div>
        <div style={{position: 'relative', width: 200, height: 200, margin: '20px auto', borderRadius: '50%', background: '#EEF1F5', border: `4px dashed ${DIM}`}}><div style={{position: 'absolute', left: 80, top: 80, width: 40, height: 40, borderRadius: 20, background: RED, border: `4px solid ${INK}`, boxShadow: `0 0 0 ${10 + 6 * Math.sin(t * 5)}px ${RED}33`}} /></div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK, opacity: pop(t, 36.0)}}>spécification britannique</div>
        <div style={{marginTop: 8}}><Pill at={39.6} c={DIM} size={26}>restait locale</Pill></div>
      </Brut>
      <Abs x={480} y={470} w={560} h={560} style={{opacity: pop(t, 41.2), transform: `scale(${Math.max(0, Math.min(1, spring(t, 41.2, 8, 12)))})`}}>
        <div style={{position: 'absolute', left: 60, top: 40}}><Globe r={210} at={41.2} pins={10} /></div>
        {WORDS.map((w, k) => {const a = (t - 50.7) * 0.9 + (k / WORDS.length) * Math.PI * 2; const on = pop(t, 50.7 + k * 0.12); return <div key={w} style={{position: 'absolute', left: 280 + Math.cos(a) * 260 - 70, top: 270 + Math.sin(a) * 120 - 18, width: 140, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: '#fff', background: [GREEN, BLUE, ORANGE, VIO, TEAL, RED][k], borderRadius: 20, padding: '4px 0', opacity: on, zIndex: Math.sin(a) > 0 ? 3 : 0}}>{w}</div>;})}
      </Abs>
      <Abs x={0} y={1060} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={43.0} c={GREEN} size={30}>norme internationale</Pill><Pill at={46.8} c={BLUE} size={30}>légitimité mondiale</Pill></Abs>
      <Abs x={0} y={1160} w={1080} style={{textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 56, color: INK, opacity: pop(t, 50.7)}}>un langage commun, partout</Abs>
    </Out>
  );
};

/* ═════════════ PARTIE 2 : HLS — recherche qui ouvre ═════════════ */
const Hls: React.FC = () => {
  // les trois calques fusionnent en un seul « système intégré »
  const t = useT();
  const merge = prog(t, 78.6, 80.0, easeInOut);
  const L = [{l: 'ISO 45001', s: 'sécurité', c: RED, ic: 'casque'}, {l: 'ISO 9001', s: 'qualité', c: BLUE, ic: 'medaille'}, {l: 'ISO 14001', s: 'environnement', c: GREEN, ic: 'feuille'}];
  return (
    <Out end={82.8}>
      <HiLine words={['Un', 'point', 'fondamental']} mark={[2]} at={57.7} y={330} size={66} />
      <SearchOpen x={60} y={440} w={960} h={780} at={60.2} query="structure de haut niveau ISO" results={['Annexe SL : historique des révisions', 'HLS : le squelette commun des normes ISO', 'Glossaire des termes de management', 'Calendrier des audits']} found={1} foundAt={66.6} clickAt={67.6} c={VIO}>
        <div style={{position: 'absolute', left: 30, top: 24, display: 'flex', alignItems: 'center', gap: 20}}><F n="prise" size={110} /><div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: INK}}>un adaptateur universel</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: VIO, opacity: pop(t, 74.0)}}>squelette commun · architecture partagée</div></div></div>
        {L.map((x, k) => {
          const a = 74.4 + k * 0.5;
          const ox = lerp((k - 1) * 290, 0, merge), oy = lerp(0, (k - 1) * -14, merge);
          return (
            <div key={x.l} style={{position: 'absolute', left: 330 + ox, top: 220 + oy, width: 290, height: 360, borderRadius: 20, background: `${x.c}${merge > 0.9 ? '55' : '22'}`, border: `5px solid ${x.c}`, opacity: pop(t, a), transform: `translateY(${(1 - pop(t, a)) * 60}px) rotate(${(k - 1) * 4 * (1 - merge)}deg)`, textAlign: 'center', paddingTop: 30, boxSizing: 'border-box', zIndex: k}}>
              <div style={{opacity: 1 - merge}}><F n={x.ic} size={110} style={{margin: '0 auto'}} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: INK, marginTop: 10}}>{x.l}</div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: x.c}}>{x.s}</div></div>
            </div>
          );
        })}
        {merge > 0.9 && <div style={{position: 'absolute', left: 330, top: 600, zIndex: 5, width: 290, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: VIO, transform: `scale(${Math.max(0, Math.min(1, spring(t, 79.8, 8, 10)))})`}}>système intégré ✓</div>}
        <div style={{position: 'absolute', left: 30, bottom: 26}}><Mono at={78.8} c={INK} size={20}>les normes s’emboîtent</Mono></div>
      </SearchOpen>
    </Out>
  );
};
const Paperasse: React.FC = () => {
  const t = useT();
  const melt = prog(t, 97.1, 99.8, easeInOut);
  const needle = lerp(-80, 80, prog(t, 100.4, 101.6, easeOut));
  return (
    <Out end={103.0}>
      <HiLine words={['Une', 'gestion', 'intégrée']} mark={[2]} at={82.9} y={330} size={66} />
      <Abs x={60} y={450} w={960} style={{display: 'flex', justifyContent: 'center', gap: 20}}>
        {[{l: 'sécurité', n: '45001', c: RED, a: 87.0}, {l: 'qualité', n: '9001', c: BLUE, a: 89.7}, {l: 'environnement', n: '14001', c: GREEN, a: 91.8}].map((x) => (
          <Brut key={x.n} x={0} y={0} w={290} h={170} at={x.a} sh={x.c} style={{position: 'relative', textAlign: 'center'}}><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 26, color: x.c}}>ISO {x.n}</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK, marginTop: 10}}>{x.l}</div></Brut>
        ))}
      </Abs>
      <Abs x={60} y={680} w={560} h={480} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 22, boxShadow: `8px 8px 0 ${VIO}`, overflow: 'hidden', opacity: pop(t, 94.0)}}>
        {[0, 1, 2].map((p) => Array.from({length: 7}, (_, k) => {const gone = p !== 1 ? melt : 0; const x = lerp(60 + p * 160, 220, p === 1 ? 0 : melt); return <div key={`${p}-${k}`} style={{position: 'absolute', left: x, top: 390 - k * 40, width: 130, height: 36, background: '#F4F1E8', border: `3px solid ${INK}`, borderRadius: 4, opacity: pop(t, 97.1 + k * 0.05) * (1 - gone), transform: `rotate(${(random(`pp${p}${k}`) - 0.5) * 8}deg)`}} />;}))}
        <div style={{position: 'absolute', left: 16, top: 14}}><Mono at={97.1} c={RED} size={18}>{melt > 0.5 ? 'une seule pile' : 'efforts dupliqués'}</Mono></div>
      </Abs>
      <Abs x={650} y={680} w={370} h={480} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 22, boxShadow: `8px 8px 0 ${GREEN}`, opacity: pop(t, 100.2)}}>
        <svg width={370} height={300} style={{position: 'absolute', top: 40}}><path d="M45 230 A140 140 0 0 1 325 230" fill="none" stroke="#E3E8EF" strokeWidth={30} /><path d="M45 230 A140 140 0 0 1 325 230" fill="none" stroke={GREEN} strokeWidth={30} strokeDasharray={440} strokeDashoffset={440 * (1 - prog(t, 100.4, 101.6, easeOut))} /><g transform={`rotate(${needle} 185 230)`}><line x1={185} y1={230} x2={185} y2={110} stroke={INK} strokeWidth={10} strokeLinecap="round" /></g><circle cx={185} cy={230} r={16} fill={INK} /></svg>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 40, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: GREEN}}>gain de temps</div>
      </Abs>
    </Out>
  );
};

/* ═════════════ PARTIE 3 : sélecteur 180°, frise, pansements ═════════════ */
const Virage: React.FC = () => {
  const t = useT();
  const turn = prog(t, 115.6, 116.6, easeInOut);
  return (
    <Out end={127.7}>
      <HiLine words={['Réactif', '→', 'proactif']} mark={[0, 2]} at={106.4} y={330} size={70} />
      <Abs x={190} y={440} w={700} h={400} style={{opacity: pop(t, 108.6)}}>
        <svg width={700} height={400}>
          <path d="M80 330 A270 270 0 0 1 620 330" fill="none" stroke="#E3E8EF" strokeWidth={40} strokeLinecap="round" />
          <path d="M80 330 A270 270 0 0 1 620 330" fill="none" stroke={turn > 0.5 ? GREEN : RED} strokeWidth={40} strokeLinecap="round" strokeDasharray={850} strokeDashoffset={850 * (1 - turn)} />
          <g transform={`rotate(${lerp(-90, 90, turn)} 350 330)`}><polygon points="340,330 360,330 350,110" fill={INK} /></g>
          <circle cx={350} cy={330} r={40} fill={NIGHT} stroke="#fff" strokeWidth={6} />
        </svg>
        <div style={{position: 'absolute', left: 0, top: 350}}><Mono at={109.6} c={RED} size={24}>réactif</Mono></div>
        <div style={{position: 'absolute', right: 0, top: 350}}><Mono at={110.5} c={GREEN} size={24}>proactif</Mono></div>
        <div style={{position: 'absolute', left: 260, top: 10, width: 180, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 54, color: INK, opacity: pop(t, 115.8)}}>180°</div>
      </Abs>
      <Abs x={60} y={880} w={960} style={{display: 'flex', gap: 20}}>
        <Brut x={0} y={0} w={470} h={330} at={116.7} sh={RED} style={{position: 'relative', textAlign: 'center'}}><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM}}>OHSAS 18001</div><div style={{display: 'flex', justifyContent: 'center', gap: 8, marginTop: 10}}><F n="feu" size={90} /><F n="extincteur" size={90} /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK, marginTop: 10}}>gérer le danger une fois là</div></Brut>
        <Brut x={0} y={0} w={470} h={330} at={125.4} sh={GREEN} style={{position: 'relative', textAlign: 'center'}}><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: GREEN}}>ISO 45001</div><div style={{display: 'flex', justifyContent: 'center', marginTop: 10}}><F n="telescope" size={100} /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK, marginTop: 10}}>agir bien plus en amont</div></Brut>
      </Abs>
    </Out>
  );
};
const Frise: React.FC = () => {
  const t = useT();
  const shield = Math.max(0, Math.min(1, spring(t, 129.3, 8, 10)));
  const peel = prog(t, 139.8, 140.6, easeIn);
  const N = [{l: 'risque', x: 120, c: YEL}, {l: 'danger', x: 470, c: ORANGE}, {l: 'accident', x: 820, c: RED}];
  return (
    <Out end={147.1}>
      <HiLine words={['L’anticipation']} mark={[0]} at={127.8} y={330} size={70} />
      <Abs x={60} y={450} w={960} h={330} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 22, boxShadow: `8px 8px 0 ${ORANGE}`, opacity: pop(t, 127.8)}}>
        <div style={{position: 'absolute', left: 110, right: 110, top: 150, height: 10, background: `linear-gradient(90deg, ${YEL}, ${ORANGE}, ${RED})`, borderRadius: 5}} />
        {N.map((n, k) => <div key={n.l} style={{position: 'absolute', left: n.x - 50, top: 110, width: 100, textAlign: 'center', opacity: pop(t, 128.0 + k * 0.3)}}><div style={{margin: '0 auto', width: 80, height: 80, borderRadius: 40, background: n.c, border: `5px solid ${INK}`, filter: k > 0 && shield > 0.5 ? 'grayscale(1) opacity(0.4)' : undefined}} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK, marginTop: 8}}>{n.l}</div></div>)}
        <div style={{position: 'absolute', left: 120 - 60, top: lerp(-260, 20, shield), opacity: t > 129.3 ? 1 : 0}}><F n="bouclier" size={120} /></div>
        {shield > 0.5 && <div style={{position: 'absolute', left: 260, right: 120, top: 154, height: 0, borderTop: `6px dashed ${GREEN}`}} />}
        <div style={{position: 'absolute', left: 16, top: 14}}><Mono at={129.3} c={GREEN} size={18}>identifier et prévenir avant</Mono></div>
      </Abs>
      <Abs x={0} y={820} w={1080}><Board text="ANTICIPER" at={134.6} h={84} c={ORANGE} stag={0.04} /></Abs>
      <Abs x={140} y={960} w={800} h={240} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 22, overflow: 'hidden', opacity: pop(t, 137.6)}}>
        <svg width={800} height={240} style={{position: 'absolute', inset: 0}}><path d="M60 120 L180 90 L260 140 L360 80 L460 150 L560 100 L740 130" fill="none" stroke={BURG} strokeWidth={8} opacity={1 - prog(t, 141.6, 142.6)} /></svg>
        {[160, 360, 560].map((x, k) => <div key={x} style={{position: 'absolute', left: x, top: 70 + peel * 300 * (1 + k * 0.3), transform: `rotate(${-20 + k * 20 + peel * 90}deg)`, opacity: pop(t, 138.0 + k * 0.2) * (1 - peel)}}><F n="pansement" size={110} /></div>)}
        {t > 141.6 && <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, opacity: prog(t, 141.6, 142.2)}}><F n="cerveau" size={100} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: INK}}>au cœur des décisions</div></div>}
      </Abs>
      <Abs x={0} y={1230} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Pill at={144.8} c={ORANGE} size={32}>un vrai changement de culture</Pill></Abs>
    </Out>
  );
};

/* ═════════════ PARTIE 4 : projecteur, participation, pilier ═════════════ */
const Projecteur: React.FC = () => {
  const t = useT();
  const flood = prog(t, 156.3, 158.4);
  return (
    <Out end={160.3}>
      <HiLine words={['L’affaire', 'de', 'tout', 'le', 'monde']} mark={[2, 3, 4]} at={150.6} y={330} size={58} />
      <Abs x={60} y={450} w={960} h={700} style={{background: NIGHT, border: `5px solid ${INK}`, borderRadius: 24, overflow: 'hidden', opacity: pop(t, 150.6)}}>
        {Array.from({length: 20}, (_, k) => {
          const c = k % 5, r = Math.floor(k / 5);
          const x = 70 + c * 180, y = 60 + r * 160;
          const lit = k === 7 ? prog(t, 153.6, 154.2) : prog(t, 156.3 + Math.hypot(c - 2, r - 1.4) * 0.25, 156.7 + Math.hypot(c - 2, r - 1.4) * 0.25);
          return <div key={k} style={{position: 'absolute', left: x, top: y, filter: `brightness(${0.25 + lit * 0.75}) grayscale(${1 - lit})`, transform: `scale(${1 + lit * 0.08})`}}><F n={['ouvrier', 'salariee', 'salarie', 'intervenant', 'femme-bureau'][k % 5]} size={110} /></div>;
        })}
        <div style={{position: 'absolute', left: 70 + 2 * 180 - 80, top: 60 + 160 - 60, width: 270, height: 270, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(255,240,170,0.45), transparent)', opacity: prog(t, 153.6, 154.2) * (1 - flood)}} />
        <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, rgba(255,240,170,0.35), transparent 70%)', opacity: flood}} />
        <div style={{position: 'absolute', left: 18, top: 16}}><Mono at={153.9} c={flood > 0.5 ? GREEN : DIM} size={20}>{flood > 0.5 ? 'engagement de toute l’entreprise' : 'un seul service'}</Mono></div>
      </Abs>
    </Out>
  );
};
const Participation: React.FC = () => {
  const t = useT();
  return (
    <Out end={180.8}>
      <HiLine words={['Consultation', '→', 'participation']} mark={[2]} at={160.4} y={330} size={58} />
      <Blinds src="verites/formation-sol.jpg" x={60} y={440} w={960} h={330} at={161.0} pos="50% 50%"><div style={{position: 'absolute', left: 16, top: 16}}><Mono at={161.6} c={TEAL} size={20}>le rôle des employés</Mono></div></Blinds>
      <Abs x={60} y={810} w={960} style={{display: 'flex', gap: 20}}>
        <Brut x={0} y={0} w={470} h={400} at={164.3} sh={DIM} style={{position: 'relative', textAlign: 'center'}}>
          <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM}}>OHSAS 18001 · CONSULTATION</div>
          <div style={{position: 'relative', margin: '40px auto 0', width: 300, height: 150, background: '#EEF1F5', border: `4px solid ${INK}`, borderRadius: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 25, color: DIM}}>« donner son avis »</div>
          <div style={{marginTop: 20}}><Pill at={166.7} c={DIM} size={26}>un premier pas</Pill></div>
        </Brut>
        <Brut x={0} y={0} w={470} h={400} at={170.4} sh={TEAL} style={{position: 'relative', textAlign: 'center', overflow: 'hidden'}}>
          <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: TEAL}}>ISO 45001 · PARTICIPATION</div>
          {Array.from({length: 12}, (_, k) => {const r = Math.floor(k / 4), c = k % 4; const a = 172.0 + k * 0.6; const p = Math.max(0, Math.min(1, spring(t, a, 9, 12))); return <div key={k} style={{position: 'absolute', left: 30 + c * 100 + (r % 2) * 20, top: 300 - r * 70, width: 92, height: 62, borderRadius: 6, background: [TEAL, GREEN, BLUE][k % 3], border: `3px solid ${INK}`, transform: `translateY(${(1 - p) * -400}px)`, opacity: t >= a ? 1 : 0}} />;})}
          {[0, 1, 2].map((k) => <div key={k} style={{position: 'absolute', left: 40 + k * 140, top: 70 + Math.sin(t * 4 + k) * 8, opacity: pop(t, 176.3 + k * 0.3)}}><F n="main-levee" size={70} /></div>)}
        </Brut>
      </Abs>
    </Out>
  );
};
const Pilier: React.FC = () => {
  const t = useT();
  const rise = Math.max(0, Math.min(1, spring(t, 187.0, 8, 11)));
  return (
    <Out end={204.9}>
      <HiLine words={['Un', 'pilier', 'de', 'la', 'stratégie']} mark={[1]} at={183.9} y={330} size={62} />
      <Abs x={140} y={440} w={800} h={560} style={{opacity: pop(t, 181.0)}}>
        <svg width={800} height={560}>
          <polygon points="400,10 780,130 20,130" fill={NAVY} stroke={INK} strokeWidth={6} />
          <rect x={20} y={500} width={760} height={50} rx={8} fill="#C9D2DF" stroke={INK} strokeWidth={5} />
          {[110, 250, 550, 690].map((x) => <rect key={x} x={x - 30} y={140} width={60} height={360} fill="#E3E8EF" stroke={INK} strokeWidth={5} />)}
          <rect x={350} y={140 + (1 - rise) * 360} width={100} height={360 * rise} fill={TEAL} stroke={INK} strokeWidth={6} />
        </svg>
        <div style={{position: 'absolute', left: 0, right: 0, top: 70, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 34, color: '#fff', letterSpacing: 4}}>STRATÉGIE</div>
        <div style={{position: 'absolute', left: 350, top: 160, width: 100, height: 330, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: rise}}><div style={{transform: 'rotate(-90deg)', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: '#fff', whiteSpace: 'nowrap'}}>SÉCURITÉ</div></div>
        <div style={{position: 'absolute', left: 600, top: 240, opacity: pop(t, 184.9) * (1 - prog(t, 186.6, 187.2)), transform: `translateX(${prog(t, 186.6, 187.2) * 300}px)`}}><Mono at={184.9} c={DIM} size={22}>sujet annexe</Mono></div>
      </Abs>
      <Abs x={60} y={1030} w={960} style={{display: 'flex', justifyContent: 'center', gap: 22, alignItems: 'center'}}>
        <div style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: DIM, opacity: pop(t, 195.0)}}>contrainte légale<Strike p={prog(t, 196.0, 196.5)} c={RED} /></div>
        <div style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: DIM, opacity: pop(t, 196.2)}}>case à cocher<Strike p={prog(t, 197.3, 197.8)} c={RED} /></div>
      </Abs>
      <Abs x={0} y={1110} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={198.2} c={TEAL} size={30}>levier</Pill><Pill at={199.2} c={GREEN} size={30}>performance</Pill><Pill at={199.9} c={BLUE} size={30}>durabilité</Pill></Abs>
      <Abs x={0} y={1210} w={1080} style={{textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 54, color: INK, opacity: pop(t, 201.5)}}>la direction incarne la sécurité</Abs>
    </Out>
  );
};

/* ═════════════ PARTIE 5 : recherche qui ouvre le tableau ═════════════ */
const COMP = [{k: 'Statut', a: 'spécification britannique', b: 'norme internationale', ta: 215.9, tb: 219.0}, {k: 'Philosophie', a: 'réactive', b: 'proactive', ta: 219.9, tb: 221.5}, {k: 'Travailleurs', a: 'consultation', b: 'participation active', ta: 223.2, tb: 225.5}, {k: 'Direction', a: 'responsabilité', b: 'engagement stratégique', ta: 227.6, tb: 229.1}];
const Recap: React.FC = () => {
  const t = useT();
  return (
    <Out end={235.45}>
      <HiLine words={['Le', 'récapitulatif']} mark={[1]} at={208.4} y={330} size={66} />
      <SearchOpen x={60} y={440} w={960} h={800} at={208.4} query="OHSAS 18001 vs ISO 45001" results={['Guide de migration OHSAS → ISO', 'Tableau comparatif des points clés', 'Foire aux questions', 'Exemples d’audits']} found={1} foundAt={210.9} clickAt={211.8} c={RED}>
        <div style={{display: 'flex', height: 70, alignItems: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 24, borderBottom: `3px solid ${INK}`}}><div style={{width: 230, paddingLeft: 24, color: DIM}}>CRITÈRE</div><div style={{flex: 1, color: DIM}}>OHSAS 18001</div><div style={{flex: 1, color: GREEN}}>ISO 45001</div></div>
        {COMP.map((r) => {
          const flip = prog(t, r.tb, r.tb + 0.5, easeInOut);
          return (
            <div key={r.k} style={{display: 'flex', alignItems: 'center', height: 150, borderBottom: '2px solid #EEF1F5', opacity: pop(t, r.ta - 0.3)}}>
              <div style={{width: 230, paddingLeft: 24, fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK}}>{r.k}</div>
              <div style={{flex: 1, fontFamily: sansFont, fontWeight: 800, fontSize: 28, color: DIM, paddingRight: 10}}>{r.a}</div>
              <div style={{flex: 1, perspective: 600}}><div style={{background: flip > 0.5 ? `${GREEN}22` : '#EEF1F5', border: `3px solid ${flip > 0.5 ? GREEN : '#C9D2DF'}`, borderRadius: 12, padding: '14px 16px', marginRight: 20, fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: GREEN, transform: `rotateX(${(1 - flip) * 90}deg)`, transformOrigin: '50% 0'}}>{r.b}</div></div>
            </div>
          );
        })}
      </SearchOpen>
      <Stamp at={234.0} c={RED} text="refonte totale" x={290} y={1262} rot={-4} size={54} />
    </Out>
  );
};

/* ═════════════ PARTIE 6 : le miroir ═════════════ */
const Miroir: React.FC = () => {
  const t = useT();
  const sweep = ((t - 243.2) / 2.2) % 1;
  return (
    <Out end={OUTRO_AT}>
      <HiLine words={['Un', 'miroir', 'tendu']} mark={[1]} at={243.0} y={330} size={70} />
      <Abs x={290} y={440} w={500} h={640} style={{opacity: pop(t, 238.9), transform: `scale(${Math.max(0, Math.min(1, spring(t, 238.9, 8, 12)))})`}}>
        <div style={{position: 'absolute', inset: 0, borderRadius: '50%', background: `linear-gradient(160deg, ${GOLD}, #B8860B)`, border: `6px solid ${INK}`}} />
        <div style={{position: 'absolute', inset: 30, borderRadius: '50%', background: 'linear-gradient(160deg, #E9F3FB, #BFD7EA)', overflow: 'hidden', border: `4px solid ${INK}`}}>
          <div style={{position: 'absolute', left: 120, top: 150}}><F n="usine2" size={200} /></div>
          <div style={{position: 'absolute', left: 140, top: 340, transform: 'scaleY(-1)', opacity: 0.25}}><F n="usine2" size={160} /></div>
          {t > 243.2 && <div style={{position: 'absolute', left: -300 + sweep * 900, top: -100, width: 120, height: 900, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)', transform: 'rotate(20deg)'}} />}
        </div>
      </Abs>
      {[{l: 'maturité', a: 245.5, x: 60, y: 520, c: BLUE}, {l: 'culture de sécurité', a: 246.9, x: 660, y: 620, c: VIO}, {l: 'anticiper demain', a: 248.4, x: 60, y: 820, c: ORANGE}].map((q) => <Abs key={q.l} x={q.x} y={q.y} w={400}><div style={{display: 'inline-block', whiteSpace: 'nowrap', background: '#fff', border: `4px solid ${INK}`, borderRadius: 16, boxShadow: `6px 6px 0 ${q.c}`, padding: '10px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK, opacity: pop(t, q.a), transform: `scale(${pop(t, q.a)})`}}>{q.l} ?</div></Abs>)}
      <Abs x={0} y={1120} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, opacity: pop(t, 254.3)}}><F n="bouclier" size={90} /><div style={{fontFamily: handFont, fontWeight: 700, fontSize: 60, color: GREEN}}>plus sûr, plus sain</div><F n="coeur" size={80} /></Abs>
      {t > 251.9 && <Dust n={22} c={GOLD} />}
    </Out>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const flaps = (a: number, n: number): Sfx[] => rep(a, n, 0.06, 'tick', 0.16);
const trans = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1, 4, 0.18, 'sfx/ding', 0.12), {at: x.at + 0.45, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6, s: 'sfx/pop', v: 0.22}, {at: x.at + 2.9, s: 'sfx/whoosh', v: 0.3}];
const searchCues = (at: number, len: number, foundAt: number, clickAt: number): Sfx[] => [...rep(at + 0.3, Math.round(len), 0.05, 'sfx/click', 0.1), {at: at + 0.35 + len * 0.05, s: 'sfx/pop', v: 0.25}, ...rep(at + 0.8 + len * 0.05, 4, 0.12, 'sfx/pop', 0.1), {at: foundAt, s: 'validation', v: 0.3}, {at: clickAt, s: 'sfx/click', v: 0.5}, {at: clickAt + 0.15, s: 'soft-whoosh', v: 0.5, dur: 1}, {at: clickAt + 0.85, s: 'sfx/thud', v: 0.35}];
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...SECT.flatMap(trans), ...SECT.map((x) => ({at: x.at + 1.4, s: 'validation', v: 0.2})), {at: ALLDONE, s: 'validation', v: 0.35},
  {at: 5.6, s: 'notification', v: 0.3}, {at: 8.0, s: 'riser', v: 0.2, dur: 4.6}, ...rep(8.2, 18, 0.25, 'tick', 0.1), {at: 12.6, s: 'validation', v: 0.3}, {at: 13.9, s: 'sfx/pop', v: 0.22},
  {at: 18.4, s: 'soft-whoosh', v: 0.4, dur: 2}, {at: 21.3, s: 'deep-hit', v: 0.55}, {at: 21.32, s: 'bass-hit', v: 0.45}, ...flaps(21.4, 16), {at: 22.6, s: 'stylo', v: 0.25}, {at: 25.3, s: 'sfx/pop', v: 0.22},
  {at: 35.3, s: 'sfx/thud', v: 0.3}, {at: 39.6, s: 'sfx/pop', v: 0.2}, {at: 41.2, s: 'soft-whoosh', v: 0.4, dur: 1.5}, ...rep(42.7, 10, 0.45, 'sfx/pop', 0.14), {at: 43.0, s: 'sfx/pop', v: 0.22}, {at: 46.8, s: 'sfx/pop', v: 0.22}, ...rep(50.7, 6, 0.12, 'sfx/ding', 0.12),
  ...searchCues(60.2, 28, 66.6, 67.6), ...[74.4, 74.9, 75.4].map((a) => ({at: a, s: 'sfx/thud', v: 0.28})), {at: 78.6, s: 'sfx/swish', v: 0.35}, {at: 80.0, s: 'cadenas', v: 0.4}, {at: 80.05, s: 'validation', v: 0.3},
  ...[87.0, 89.7, 91.8].map((a) => ({at: a, s: 'sfx/thud', v: 0.3})), {at: 94.0, s: 'sfx/whoosh', v: 0.25}, ...rep(97.1, 7, 0.05, 'page', 0.15), {at: 97.3, s: 'soft-whoosh', v: 0.35, dur: 2}, {at: 100.4, s: 'sfx/rise', v: 0.3}, {at: 101.6, s: 'sfx/ding', v: 0.3},
  {at: 108.6, s: 'sfx/whoosh', v: 0.25}, {at: 115.6, s: 'tension', v: 0.2, dur: 1}, {at: 116.6, s: 'bass-hit', v: 0.45}, {at: 116.7, s: 'sfx/thud', v: 0.3}, {at: 125.4, s: 'sfx/thud', v: 0.3},
  {at: 129.3, s: 'sfx/whoosh', v: 0.3}, {at: 129.9, s: 'cadenas', v: 0.4}, ...flaps(134.6, 9), ...[138.0, 138.2, 138.4].map((a) => ({at: a, s: 'sfx/pop', v: 0.2})), {at: 139.8, s: 'page', v: 0.5}, {at: 141.6, s: 'sfx/ding', v: 0.25}, {at: 144.8, s: 'sfx/pop', v: 0.22},
  {at: 153.6, s: 'sfx/click', v: 0.4}, {at: 156.3, s: 'riser', v: 0.3, dur: 2}, {at: 158.4, s: 'validation', v: 0.3},
  {at: 161.0, s: 'soft-whoosh', v: 0.3}, {at: 164.3, s: 'sfx/thud', v: 0.3}, {at: 170.4, s: 'sfx/thud', v: 0.3}, ...rep(172.3, 12, 0.6, 'sfx/thud', 0.16),
  {at: 181.0, s: 'sfx/whoosh', v: 0.25}, {at: 186.6, s: 'sfx/swish', v: 0.3}, {at: 187.0, s: 'sfx/rise', v: 0.3}, {at: 187.8, s: 'deep-hit', v: 0.4}, {at: 196.0, s: 'stylo', v: 0.3}, {at: 197.3, s: 'stylo', v: 0.3}, ...[198.2, 199.2, 199.9].map((a) => ({at: a, s: 'sfx/pop', v: 0.2})), {at: 201.5, s: 'stylo', v: 0.25},
  ...searchCues(208.4, 24, 210.9, 211.8), ...COMP.flatMap((r) => [{at: r.ta, s: 'sfx/pop', v: 0.18}, {at: r.tb, s: 'sfx/swish', v: 0.3}, {at: r.tb + 0.5, s: 'sfx/ding', v: 0.18}]), {at: 234.0, s: 'tampon', v: 0.55},
  {at: 238.9, s: 'soft-whoosh', v: 0.4}, {at: 243.2, s: 'sfx/rise', v: 0.2}, ...[245.5, 246.9, 248.4].map((a) => ({at: a, s: 'sfx/pop', v: 0.22})), {at: 254.3, s: 'validation', v: 0.3},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const Ohsas: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.6} to={27.0}><Intro /></Gate>
    <Gate from={30.2} to={54.4}><Statut /></Gate>
    <Gate from={57.5} to={82.9}><Hls /></Gate>
    <Gate from={82.8} to={103.1}><Paperasse /></Gate>
    <Gate from={106.2} to={127.8}><Virage /></Gate>
    <Gate from={127.7} to={147.2}><Frise /></Gate>
    <Gate from={150.4} to={160.4}><Projecteur /></Gate>
    <Gate from={160.3} to={180.9}><Participation /></Gate>
    <Gate from={180.8} to={205.0}><Pilier /></Gate>
    <Gate from={208.2} to={235.5}><Recap /></Gate>
    <Gate from={238.7} to={OUTRO_AT}><Miroir /></Gate>
    {SECT.map((x, i) => <Gate key={x.n} from={x.at} to={x.at + 3.7}><Gyro i={i} /></Gate>)}
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={256.9}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-ohsas-iso45001-origine.m4a')} trimAfter={s(257.0)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Pneumatique, Loupe, Store, Check, Count, Deep, Kin, GLASS, T];
