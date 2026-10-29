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
import {NeoCaptions} from '../components/NeoCaptions';

/**
 * « Le flash info QSSE » (voix d'origine, 1 min 52) — capsule « condensé + effet wahou + ultra premium » présentée en
 * métro (7 stations). Tube de verre à six guichets : l'outil → résultats → activités → info importante → équipe &
 * idées → réussir ; la capsule file d'un guichet à l'autre. Gyrophare, loupe, capsule pneumatique, store vénitien ;
 * barre de recherche « flash info QSSE ». Chaque rubrique se remplit en direct dans un mini-bulletin (vignette en
 * haut à droite) ; exemple de résultats avec « 0 non-conformité » et drapeaux d'efforts ; agenda, tampon IMPORTANT,
 * cartes de correspondants, bulles d'idées. Final wahou : le bulletin A4 s'assemble rubrique par rubrique, coches
 * « courtes / claires / vérifiées », bande tricolore du code couleur (jaune qualité, orange sécurité, vert
 * environnement), étoiles de satisfaction et courbe d'amélioration, puis téléphone TikTok avec le WhatsApp entouré.
 * Images de la session réutilisées. Kits capsule-ui-neo-brutal et capsule-recit-illustre.
 */
const IMG = {
  cover: 'audit13-gen/affichage.jpg',
  c1: 'audit13-gen/affichage.jpg',
  c2: 'audit13-gen/tableau-bord.jpg',
  r1: 'audit13-gen/tableau-bord.jpg',
  r2: 'audit13-gen/controle.jpg',
  r3: 'audit13-gen/documents.jpg',
  r4: 'missions-gen/communication.jpg',
  tiktok: 'taproot-gen/tiktok-profil.jpg',
};
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
const OUTRO_AT = 112.3;
export const FLASH_INFO_METRO_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store' | 'none';
type SX = {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string};
const SECT: SX[] = [
  {at: 2.9, n: '!', title: 'Le flash info QSSE', s: 'un outil simple', c: NAVY, g: 'l’outil', k: 'none', lab: 'GUICHET 1 / 6'},
  {at: 28.9, n: '1', title: 'Les résultats QSSE', s: 'rubrique 1', c: TEAL, g: 'résultats', k: 'gyro', lab: 'GUICHET 2 / 6'},
  {at: 45.8, n: '2', title: 'Les prochaines activités', s: 'rubrique 2', c: BLUE, g: 'activités', k: 'loupe', lab: 'GUICHET 3 / 6'},
  {at: 56.0, n: '3', title: 'L’information importante', s: 'rubrique 3', c: VIO, g: 'info importante', k: 'tube', lab: 'GUICHET 4 / 6'},
  {at: 65.2, n: '4', title: 'L’équipe QSSE', s: 'rubrique 4 · et vos idées', c: ORANGE, g: 'équipe & idées', k: 'store', lab: 'GUICHET 5 / 6'},
  {at: 78.3, n: '★', title: 'Pour réussir', s: 'court · clair · vérifié', c: GREEN, g: 'réussir', k: 'gyro', lab: 'GUICHET 6 / 6'},
];
const SECTX = SECT;
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 99.4;
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
  const S0 = SECTX[i];
  return (
    <>
      <Abs x={60} y={y} w={960} style={{textAlign: 'center'}}><Kin text={S0.title} at={at} size={S0.title.length > 20 ? 66 : 80} color={dark ? '#fff' : INK} /></Abs>
      <Abs x={0} y={y + (S0.title.length > 20 ? 190 : 120)} w={1080} style={{textAlign: 'center'}}><div style={{display: 'inline-block', background: S0.c, color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 30, letterSpacing: 2, padding: '6px 16px', borderRadius: 6, opacity: pop(t, at + 0.5)}}>{S0.s.toUpperCase()}</div></Abs>
    </>
  );
};
const Pneumatique: React.FC<{i: number}> = ({i}) => {
  const t = useT();
  const S0 = SECTX[i];
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
  const S0 = SECTX[i];
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
  const S0 = SECTX[i];
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
  const S0 = SECTX[i];
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
const Card: React.FC<{x: number; y: number; w: number; h: number; at: number; c: string; children: React.ReactNode; style?: React.CSSProperties}> = ({x, y, w, h, at, c, children, style}) => {
  const t = useT();
  const p = Math.max(0, Math.min(1, spring(t, at, 8, 13)));
  return <Abs x={x} y={y} w={w} h={h} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 22, boxShadow: `8px 8px 0 ${c}`, overflow: 'hidden', opacity: t >= at ? 1 : 0, transform: `translateY(${(1 - p) * 50}px) scale(${0.9 + 0.1 * p})`, ...style}}>{children}</Abs>;
};
const IcoLab: React.FC<{ic: string; l: string; size?: number; fs?: number; c?: string}> = ({ic, l, size = 100, fs = 28, c = INK}) => (
  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 10, textAlign: 'center', padding: '0 10px'}}><F n={ic} size={size} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: fs, color: c, lineHeight: 1.1}}>{l}</div></div>
);
/* ═════════════ Briques « ultra premium » ═════════════ */
/** Reflet lumineux qui balaie une surface (à placer dans un parent overflow: hidden). */
const Shine: React.FC<{at: number; dur?: number; every?: number}> = ({at, dur = 0.9, every = 0}) => {
  const t = useT();
  const k = every > 0 && t > at ? ((t - at) % every) : t - at;
  if (k < 0 || k > dur) return null;
  const p = k / dur;
  return <div style={{position: 'absolute', top: -40, bottom: -40, left: `${lerp(-60, 140, p)}%`, width: '35%', background: 'linear-gradient(100deg, transparent, rgba(255,255,255,0.75), transparent)', transform: 'skewX(-18deg)', pointerEvents: 'none', zIndex: 5}} />;
};
/** Carte en verre dépoli à ombre colorée et reflet. */
const GlassCard: React.FC<{x: number; y: number; w: number; h: number; at: number; c: string; children: React.ReactNode; tilt?: number}> = ({x, y, w, h, at, c, children, tilt = 0}) => {
  const t = useT();
  const p = Math.max(0, Math.min(1, spring(t, at, 8, 13)));
  return (
    <Abs x={x} y={y} w={w} h={h} style={{opacity: t >= at ? 1 : 0, transform: `perspective(1400px) rotateY(${(1 - p) * 35 + tilt}deg) translateY(${(1 - p) * 60}px)`, borderRadius: 26, background: 'linear-gradient(145deg, rgba(255,255,255,0.92), rgba(255,255,255,0.62))', border: `4px solid ${INK}`, boxShadow: `0 24px 50px ${c}44, 8px 8px 0 ${c}`, overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, background: `radial-gradient(circle at 20% 0%, ${c}22, transparent 60%)`}} />
      {children}
      <Shine at={at + 0.3} />
    </Abs>
  );
};
const Num: React.FC<{n: number | string; c: string; size?: number}> = ({n, c, size = 90}) => (
  <div style={{width: size, height: size, borderRadius: size / 2, background: `radial-gradient(circle at 35% 30%, #fff8, ${c} 55%)`, border: `5px solid ${INK}`, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: size * 0.55, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 0 18px ${c}88`}}>{n}</div>
);


/* ═════════════ Briques communes ═════════════ */
const Pic: React.FC<{src: string; ic: string; w: number; h: number; zoom?: number; pos?: string; filter?: string}> = ({src, ic, w, h, zoom = 1, pos = 'center', filter}) => (src ? <Img src={PH(src)} style={{width: w, height: h, objectFit: 'cover', objectPosition: pos, transform: `scale(${zoom})`, display: 'block', filter}} /> : <div style={{width: w, height: h, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F4F6FA', filter}}><F n={ic} size={Math.min(w, h) * 0.5} /></div>);
const Shot: React.FC<{src: string; ic: string; x: number; y: number; w: number; h: number; at: number; pos?: string; blinds?: boolean; c?: string; children?: React.ReactNode; filter?: string}> = ({src, ic, x, y, w, h, at, pos = '50% 40%', blinds, c = INK, children, filter}) => {
  const t = useT();
  if (src) return blinds ? (t > at ? <Blinds src={src} x={x} y={y} w={w} h={h} at={at} pos={pos} filter={filter}>{children}</Blinds> : null) : <Deep src={src} x={x} y={y} w={w} h={h} at={at} pos={pos} filter={filter}>{children}</Deep>;
  return <Abs x={x} y={y} w={w} h={h} style={{background: '#F4F6FA', border: `5px solid ${INK}`, borderRadius: 30, boxShadow: `8px 8px 0 ${c}`, overflow: 'hidden', opacity: pop(t, at), display: 'flex', alignItems: 'center', justifyContent: 'center', filter}}><F n={ic} size={Math.min(w, h) * 0.5} />{children}</Abs>;
};
const PneuDeliver: React.FC<{x: number; y: number; w: number; at: number; c: string}> = ({x, y, w, at, c}) => {
  const t = useT();
  const p = prog(t, at, at + 0.7, easeInOut);
  if (t < at - 0.2) return null;
  return (
    <Abs x={x} y={y} w={w} h={60} style={{opacity: 1 - prog(t, at + 0.9, at + 1.3)}}>
      <Tube x={0} y={14} w={w} h={30} />
      <div style={{position: 'absolute', left: lerp(-40, w - 60, p), top: 16, filter: p > 0 && p < 1 ? 'blur(2px)' : undefined}}><Capsule w={70} c={c} /></div>
    </Abs>
  );
};
const LoupeSweep: React.FC<{x0: number; y0: number; x1: number; y1: number; a: number; b: number; size?: number}> = ({x0, y0, x1, y1, a, b, size = 200}) => {
  const t = useT();
  const p = prog(t, a, b, easeInOut);
  if (t < a || t > b + 0.4) return null;
  return (
    <div style={{position: 'absolute', left: lerp(x0, x1, p), top: lerp(y0, y1, p), width: size, height: size, borderRadius: '50%', border: `${size * 0.05}px solid ${INK}`, background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.65), rgba(191,215,234,0.3) 60%)', boxShadow: '0 12px 30px rgba(0,0,0,0.25)', zIndex: 8, opacity: 1 - prog(t, b, b + 0.4)}}>
      <div style={{position: 'absolute', right: -size * 0.3, bottom: -size * 0.2, width: size * 0.5, height: size * 0.14, background: INK, borderRadius: size * 0.07, transform: 'rotate(40deg)'}} />
    </div>
  );
};

/* ═════════════ La ligne de métro (6 stations = 6 maillons) ═════════════ */
const STATIONS = [
  {n: 1, l: 'Le flash info QSSE', s: 'flash info', at: 9.4},
  {n: 2, l: 'Les résultats', s: 'résultats', at: 30.4},
  {n: 3, l: 'Les prochaines activités', s: 'activités', at: 47.4},
  {n: 4, l: 'L’information importante', s: 'info', at: 57.4},
  {n: 5, l: 'L’équipe QSSE', s: 'équipe', at: 66.9},
  {n: 6, l: 'Le code couleur', s: 'couleurs', at: 89.2},
  {n: 7, l: 'La satisfaction', s: 'satisfaction', at: 96.2},
];
const Metro: React.FC = () => {
  const t = useT();
  const cur = STATIONS.reduce((a, x, k) => (t >= x.at ? k : a), -1);
  const sx = (k: number) => 80 + k * (800 / (STATIONS.length - 1));
  const mv = cur <= 0 ? 1 : prog(t, STATIONS[cur].at - 0.8, STATIONS[cur].at, easeInOut);
  const tx = cur < 0 ? sx(0) - 50 : cur === 0 ? sx(0) : lerp(sx(cur - 1), sx(cur), mv);
  return (
    <Abs x={60} y={1400} w={960} h={104} style={{zIndex: 30, background: 'rgba(255,255,255,0.95)', border: `4px solid ${INK}`, borderRadius: 20, boxShadow: `5px 5px 0 ${NAVY}`}}>
      <div style={{position: 'absolute', left: 80, right: 80, top: 30, height: 12, borderRadius: 6, background: `linear-gradient(90deg, ${GREEN}, ${BLUE}, ${RED}, ${ORANGE}, ${VIO}, ${TEAL})`}} />
      {STATIONS.map((x, k) => { const on = k <= cur; return <div key={x.n} style={{position: 'absolute', left: sx(k) - 18, top: 18, width: 36, height: 36, borderRadius: 18, background: on ? `radial-gradient(circle at 35% 30%, #DDEBFF, ${BLUE})` : '#fff', border: `4px solid ${on ? INK : '#9FB3CC'}`, boxSizing: 'border-box', color: on ? '#fff' : INK, fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: k === cur ? `0 0 18px ${BLUE}` : 'none'}}>{x.n}</div>; })}
      {STATIONS.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: sx(k) - 66, width: 132, top: 62, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 15, color: k === cur ? BURG : DIM}}>{x.s}</div>)}
      {cur >= 0 && <Img src={staticFile('metroiso-gen/metro/rame-dessus.png')} style={{position: 'absolute', left: tx - 50, top: 18, width: 100, height: 34, filter: 'drop-shadow(0 0 8px rgba(120,180,255,0.9))'}} />}
    </Abs>
  );
};
const StationBanner: React.FC = () => {
  const t = useT();
  const r = STATIONS.find((x) => t >= x.at - 0.1 && t < x.at + 3.0);
  if (!r) return null;
  const q = prog(t, r.at - 0.1, r.at + 0.3, easeOut);
  const out = prog(t, r.at + 2.6, r.at + 3.0, easeIn);
  return (
    <Abs x={40} y={1230} w={1000} h={150} style={{zIndex: 32, opacity: 1 - out, transform: `translateY(${(1 - q) * 110}px) scale(${0.8 + 0.2 * q})`}}>
      <div style={{position: 'absolute', inset: 0, borderRadius: 30, background: `linear-gradient(110deg, #0B2147, ${NIGHT})`, border: `5px solid ${BLUE}`, boxShadow: `0 0 40px ${BLUE}AA`, display: 'flex', alignItems: 'center', gap: 22, padding: '0 26px', overflow: 'hidden'}}>
        <div style={{width: 100, height: 100, borderRadius: 50, background: `radial-gradient(circle at 35% 30%, #DDEBFF, ${BLUE} 60%, #0B2147)`, border: '5px solid #fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transform: `rotateY(${(1 - q) * 360}deg)`}}><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 12, color: '#fff'}}>STATION</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 48, color: '#fff', lineHeight: 0.9}}>{r.n}</div></div>
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18, color: '#9CC6FF', letterSpacing: 3}}>LIGNE FLASH INFO · STATION {r.n} / 7</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: r.l.length > 32 ? 32 : 38, color: '#fff', lineHeight: 1.1}}>{r.l}</div></div>
        <div style={{position: 'absolute', top: 0, bottom: 0, width: 120, left: lerp(-160, 1100, prog(t, r.at + 0.2, r.at + 1.1)), background: 'linear-gradient(90deg, transparent, rgba(200,225,255,0.5), transparent)', transform: 'skewX(-20deg)'}} />
      </div>
    </Abs>
  );
};

/** Lettre-photo : la photo n'apparaît qu'à l'intérieur du glyphe, contour marine (charte « L'INDUCTION HSE »). */
const PhotoLetter: React.FC<{ch: string; src: string; size: number; pos?: string; ls?: number}> = ({ch, src, size, pos = 'center', ls = -4}) => (
  <div style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: size, lineHeight: 0.92, letterSpacing: ls}}>
    <span style={{position: 'absolute', left: 0, top: 0, color: 'transparent', WebkitTextStroke: `${size * 0.03}px ${NAVY}`}}>{ch}</span>
    <span style={{position: 'relative', color: 'transparent', backgroundImage: `url(${PH(src)})`, backgroundSize: 'cover', backgroundPosition: pos, WebkitBackgroundClip: 'text', backgroundClip: 'text'}}>{ch}</span>
  </div>
);
const Watermark: React.FC<{o?: number}> = ({o = 0.05}) => (
  <AbsoluteFill style={{overflow: 'hidden'}}>{Array.from({length: 13}, (_, k) => <div key={k} style={{position: 'absolute', left: -20, top: 300 + k * 140, fontFamily: 'Arial, sans-serif', fontWeight: 500, fontSize: 150, color: `rgba(20,33,61,${o})`, whiteSpace: 'nowrap', letterSpacing: -2}}>UNIVERSNORMES</div>)}</AbsoluteFill>
);

/** Lettres-photos ANIMÉES : la photo dérive lentement à l'intérieur des glyphes + reflet qui balaie. */
const PhotoLetterAnim: React.FC<{ch: string; src: string; size: number; ls?: number; seed?: number}> = ({ch, src, size, ls = -2, seed = 0}) => {
  const t = useT();
  const px = 50 + Math.sin(t * 1.3 + seed) * 22;
  const py = 45 + Math.cos(t * 0.9 + seed) * 14;
  const sweep = ((t * 0.55 + seed * 0.3) % 1.6) - 0.3;
  return (
    <div style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: size, lineHeight: 0.92, letterSpacing: ls}}>
      <span style={{position: 'absolute', left: 0, top: 0, color: 'transparent', WebkitTextStroke: `${size * 0.03}px ${NAVY}`}}>{ch}</span>
      <span style={{position: 'relative', color: 'transparent', backgroundImage: `url(${PH(src)})`, backgroundSize: '170% auto', backgroundPosition: `${px}% ${py}%`, WebkitBackgroundClip: 'text', backgroundClip: 'text'}}>{ch}</span>
      <span style={{position: 'absolute', left: 0, top: 0, color: 'transparent', backgroundImage: `linear-gradient(105deg, transparent ${sweep * 100 - 12}%, rgba(255,255,255,0.75) ${sweep * 100}%, transparent ${sweep * 100 + 12}%)`, WebkitBackgroundClip: 'text', backgroundClip: 'text'}}>{ch}</span>
    </div>
  );
};

/* ═════════════ Kit néo-brutaliste (skill capsule-ui-neo-brutal) ═════════════ */
const NBK = '#111';
const ACC = '#22B573';
const nb = (bg = '#fff', sh = 8): React.CSSProperties => ({background: bg, border: `4px solid ${NBK}`, borderRadius: 18, boxShadow: `${sh}px ${sh}px 0 ${NBK}`, boxSizing: 'border-box'});
const NBadge: React.FC<{at: number; text: string; bg?: string; rot?: number; size?: number}> = ({at, text, bg = ACC, rot = -10, size = 30}) => {
  const t = useT();
  if (t < at) return null;
  const sc = spring(t, at);
  return <div style={{display: 'inline-block', background: bg, color: '#fff', border: `4px solid ${NBK}`, borderRadius: 10, padding: '4px 16px', fontFamily: sansFont, fontWeight: 900, fontSize: size, letterSpacing: 1, transform: `rotate(${rot}deg) scale(${lerp(1.5, 1, Math.min(1, sc))})`, boxShadow: `4px 4px 0 ${NBK}`, whiteSpace: 'nowrap'}}>{text}</div>;
};
const Chip: React.FC<{at: number; ic: string; l: string; c: string}> = ({at, ic, l, c}) => {
  const t = useT();
  const on = t > at;
  return <div style={{...nb(on ? '#fff' : '#F1F1EA', 5), display: 'flex', alignItems: 'center', gap: 10, padding: '8px 16px 8px 8px', opacity: on ? 1 : 0.35, transform: `scale(${on ? Math.min(1.04, spring(t, at)) : 0.94})`}}><div style={{width: 54, height: 54, borderRadius: 12, background: on ? c : '#DDD', border: `3px solid ${NBK}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={ic} size={38} /></div><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: NBK, whiteSpace: 'nowrap'}}>{l}</span>{on && <span style={{fontSize: 26, fontWeight: 900, color: ACC}}>✓</span>}</div>;
};
/* ═════════════ Outils communs ═════════════ */
type HD = [number, string[], number[]];
const headAt = (h: HD[], t: number) => h.reduce((a, x) => (t >= x[0] - 0.2 ? x : a), h[0]);
const Heads: React.FC<{h: HD[]}> = ({h}) => {
  const t = useT();
  const x = headAt(h, t);
  const len = x[1].join(' ').length;
  return <HiLine words={x[1]} mark={x[2]} at={x[0]} y={330} size={len > 26 ? 50 : len > 20 ? 56 : 62} />;
};
const fmt = (v: number) => Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const arcP = (r: number, a0: number, a1: number) => { const p = (a: number) => [r * Math.cos((a * Math.PI) / 180), r * Math.sin((a * Math.PI) / 180)]; const [x0, y0] = p(a0); const [x1, y1] = p(a1); return `M 0 0 L ${x0} ${y0} A ${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1} ${y1} Z`; };
const Strk: React.FC<{at: number; c?: string}> = ({at, c = RED}) => {
  const t = useT();
  return <div style={{position: 'absolute', left: 8, right: 8, top: '50%', height: 7, background: c, borderRadius: 4, transform: `scaleX(${prog(t, at, at + 0.4)}) rotate(-3deg)`, transformOrigin: '0 50%'}} />;
};
const Row: React.FC<{at: number; ic: string; l: string; c: string; fs?: number; w?: number}> = ({at, ic, l, c, fs = 30, w}) => {
  const t = useT();
  const on = t > at;
  return <div style={{...nb('#fff', 5), boxShadow: `5px 5px 0 ${c}`, width: w, display: 'flex', alignItems: 'center', gap: 14, padding: '10px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: fs, lineHeight: 1.1, opacity: on ? 1 : 0, transform: `translateX(${on ? (1 - Math.min(1, spring(t, at))) * -160 : 0}px)`}}><F n={ic} size={58} /><span style={{flex: 1}}>{l}</span><span style={{color: ACC}}>{t > at + 0.4 ? '✓' : ''}</span></div>;
};

/* ═════════════ Couverture ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <div style={{position: 'absolute', left: 0, top: 0, transform: `scale(${1 + t * 0.02})`, transformOrigin: '50% 30%'}}><Pic src={IMG.cover} ic="tableau" w={1080} h={820} pos="50% 40%" /></div>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 0%, ${PAPER}00 24%, ${PAPER}CC 32%, ${PAPER} 37%)`}} />
      <Abs x={0} y={70} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={560} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{...nb(NBK, 5), color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 26, letterSpacing: 3, padding: '8px 22px'}}>COMMUNIQUER EFFICACEMENT</div></Abs>
      <Abs x={0} y={650} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="FLASH INFO" src={IMG.c1} size={150} ls={4} /></Abs>
      <Abs x={0} y={840} w={1080} style={{display: 'flex', justifyContent: 'center'}}><PhotoLetterAnim ch="QSSE" src={IMG.c2} size={190} ls={8} seed={3} /></Abs>
      <Abs x={40} y={1030} w={1000} style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 10}}>{[['résultats', TEAL], ['activités', BLUE], ['info importante', VIO], ['équipe QSSE', ORANGE], ['vos idées', GREEN]].map(([n, c], k) => <div key={n} style={{...nb(c, 4), padding: '6px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: '#fff', transform: `translateY(${(1 - Math.min(1, spring(t, 0.3 + k * 0.08))) * 60}px)`}}>{n}</div>)}</Abs>
      <Abs x={60} y={1480} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140, top: 36}}><Capsule w={56} c={NAVY} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 75, width: 150, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

const Barred: React.FC<{at: number; strk: number; text: string; fs?: number}> = ({at, strk, text, fs = 30}) => {
  const t = useT();
  if (t < at) return null;
  return <div style={{position: 'relative', display: 'inline-block', ...nb('#fff', 5), padding: '10px 18px', fontFamily: sansFont, fontWeight: 900, fontSize: fs, color: DIM, transform: `scale(${pop(t, at)})`}}>{text}<Strk at={strk} /></div>;
};

const PH_W = 330, PH_H = 330 * 2712 / 1220;
const NUM = {x: 0.212 * PH_W, y: 0.32 * PH_H};
const TikTokPhone: React.FC<{at: number; zAt: number; ringAt: number; badgeAt: number}> = ({at, zAt, ringAt, badgeAt}) => {
  const t = useT();
  if (t < at) return null;
  const up = Math.min(1, spring(t, at));
  const z = prog(t, zAt, zAt + 0.8, easeInOut);
  const Z = lerp(1, 2.2, z);
  const ring = prog(t, ringAt, ringAt + 0.7, easeOut);
  return (
    <>
      <div style={{position: 'absolute', left: 303, top: 70, width: PH_W + 24, height: PH_H + 24, borderRadius: 48, background: NBK, boxShadow: `10px 10px 0 #25D366, 0 30px 60px rgba(0,0,0,0.25)`, transform: `translateY(${(1 - up) * 900}px) rotate(${(1 - up) * 8}deg)`, padding: 12, boxSizing: 'border-box'}}>
        <div style={{position: 'relative', width: PH_W, height: PH_H, borderRadius: 36, overflow: 'hidden', background: '#fff'}}>
          <Img src={PH(IMG.tiktok)} style={{position: 'absolute', left: 0, top: 0, width: PH_W, height: PH_H, transformOrigin: `${NUM.x}px ${NUM.y}px`, transform: `translate(${(PH_W / 2 - NUM.x) * z}px, ${(PH_H / 2 - NUM.y) * z}px) scale(${Z})`}} />
          {ring > 0 && <svg style={{position: 'absolute', left: 0, top: 0}} width={PH_W} height={PH_H}><ellipse cx={PH_W / 2} cy={PH_H / 2} rx={150} ry={34} fill="none" stroke={RED} strokeWidth={7} strokeLinecap="round" pathLength={1} style={{strokeDasharray: 1, strokeDashoffset: 1 - ring}} transform={`rotate(-3 ${PH_W / 2} ${PH_H / 2})`} /></svg>}
          <div style={{position: 'absolute', left: PH_W / 2 - 40, top: 8, width: 80, height: 22, borderRadius: 11, background: NBK}} />
        </div>
      </div>
      {t > ringAt + 0.3 && <div style={{position: 'absolute', left: 0, top: 70 + 12 + PH_H / 2 - 40, display: 'flex', alignItems: 'center', gap: 6, transform: `translateX(${Math.sin(t * 6) * 8}px) scale(${Math.min(1, spring(t, ringAt + 0.3))})`}}><div style={{...nb('#25D366', 5), padding: '8px 14px', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#fff'}}>WhatsApp</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 60, color: RED}}>→</div></div>}
      {t > badgeAt && <div style={{position: 'absolute', left: 0, right: 0, top: 70 + PH_H + 40, display: 'flex', justifyContent: 'center'}}><NBadge at={badgeAt} text="ÉCRIS-MOI ICI · ACCOMPAGNEMENT PERSONNALISÉ" bg={NBK} rot={-1} size={24} /></div>}
    </>
  );
};
type CH = [string, string, number];
const hd = (l: string, a: number): HD => { const w = l.split(' '); return [a, w, [w.length - 1]]; };
const SC: React.FC<{at: number; end: number; c: string; badge: string; img?: string; pos?: string; ih?: number; chips?: CH[]; h?: HD[]; hx?: HD[]; vis?: React.ReactNode; over?: React.ReactNode; children?: React.ReactNode}> = ({at, end, c, badge, img, pos = '50% 40%', ih = 560, chips = [], h, hx = [], vis, over, children}) => {
  const t = useT();
  const hh: HD[] = (h ?? [...chips.map(([l, , a]) => hd(l, a)), ...hx]).sort((x, y) => x[0] - y[0]);
  const bd = <div style={{position: 'absolute', left: 20, top: 20, zIndex: 6}}><NBadge at={at + 0.2} text={badge} bg={c} rot={-2} size={26} /></div>;
  return (
    <Out end={end}>
      {hh.length > 0 && <Heads h={hh} />}
      {img ? <Shot src={img} ic="causerie" x={60} y={440} w={960} h={ih} at={at} pos={pos} c={c}>{bd}{over}</Shot> : (
        <Abs x={60} y={440} w={960} h={ih} style={{...nb('#fff', 8), boxShadow: `8px 8px 0 ${c}`, overflow: 'hidden', opacity: pop(t, at), transform: `translateY(${(1 - pop(t, at)) * 40}px)`, backgroundImage: 'radial-gradient(#0001 2px, transparent 2px)', backgroundSize: '22px 22px'}}>{bd}{vis}{over}</Abs>
      )}
      <Abs x={60} y={440 + ih + 34} w={960} style={{display: 'flex', flexWrap: 'wrap', gap: 12}}>{chips.map(([l, ic, a]) => (t > a ? <Chip key={l} at={a} ic={ic} l={l} c={c} /> : null))}</Abs>
      {children}
    </Out>
  );
};


/* ═════════════ Le bulletin « flash info » (vignette et version finale) ═════════════ */
const RUB: [string, string, string, number][] = [['Résultats QSSE', 'graphique', TEAL, 30.4], ['Prochaines activités', 'calendrier', BLUE, 47.4], ['Information importante', 'danger', VIO, 57.4], ['Équipe QSSE', 'equipe', ORANGE, 66.9], ['Vos idées', 'ampoule', GREEN, 75.2]];
const QSE: [string, string, number][] = [['QUALITÉ', YEL, 90.0], ['SÉCURITÉ', ORANGE, 91.2], ['ENVIRONNEMENT', GREEN, 93.2]];
const Bulletin: React.FC<{t: number; all?: number; checks?: boolean}> = ({t, all, checks}) => (
  <div style={{position: 'relative', width: 600, height: 850, background: '#fff', border: `6px solid ${NBK}`, borderRadius: 16, boxShadow: `10px 10px 0 ${NBK}`, overflow: 'hidden'}}>
    <div style={{height: 120, background: NAVY, display: 'flex', alignItems: 'center', gap: 14, padding: '0 22px'}}><div style={{...nb(RED, 4), color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 26, padding: '4px 10px', transform: 'rotate(-4deg)'}}>FLASH</div><div style={{color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 52, letterSpacing: -1}}>INFO QSSE</div></div>
    <div style={{display: 'flex', height: 18}}>{QSE.map(([l, c, a]) => <div key={l} style={{flex: 1, background: t > a ? c : '#E3E8EF', transition: 'none'}} />)}</div>
    {RUB.map(([l, ic, c, a], k) => { const at = all ?? a; const on = t > at + (all !== undefined ? k * 0.22 : 0); const p = on ? Math.min(1, spring(t, at + (all !== undefined ? k * 0.22 : 0), 9, 13)) : 0; return (
      <div key={l} style={{position: 'absolute', left: 18, right: 18, top: 156 + k * 136, height: 120, borderRadius: 12, border: `4px solid ${on ? NBK : '#D5DCE6'}`, background: on ? '#fff' : '#F4F6F9', borderLeft: `18px solid ${on ? c : '#D5DCE6'}`, display: 'flex', alignItems: 'center', gap: 14, padding: '0 16px', boxSizing: 'border-box', transform: `translateX(${(1 - p) * 300}px)`, opacity: on ? 1 : 0.6}}>
        <F n={ic} size={58} />
        <div style={{flex: 1}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30}}>{l}</div>{[0, 1].map((j) => <div key={j} style={{height: 10, borderRadius: 5, background: '#0002', marginTop: 8, width: `${80 - j * 25}%`}} />)}</div>
        {checks && t > 83.9 + k * 0.15 && <div style={{width: 40, height: 40, borderRadius: 20, background: GREEN, border: `3px solid ${NBK}`, color: '#fff', fontWeight: 900, fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${Math.min(1.15, spring(t, 83.9 + k * 0.15))})`}}>✓</div>}
      </div>
    ); })}
  </div>
);
const Mini: React.FC = () => {
  const t = useT();
  return <div style={{position: 'absolute', right: 16, top: 16, zIndex: 7, transform: 'scale(0.26)', transformOrigin: '100% 0'}}><Bulletin t={t} /></div>;
};

/* ═════════════ Guichet 1 : recherche ═════════════ */
const Intro: React.FC = () => {
  const t = useT();
  const C4: CH[] = [['les résultats', 'graphique', 16.8], ['les activités en cours', 'calendrier', 17.8], ['les nouvelles procédures', 'clipboard', 19.2], ['les bonnes pratiques', 'pouce', 20.6]];
  return (
    <Out end={28.95}>
      <Heads h={[[0.9, ['Informer', 'tous', 'les', 'salariés'], [0, 3]], [4.5, ['Communiquer', 'efficacement'], [1]], [7.0, ['Un', 'outil', 'simple'], [2]], [9.3, ['Le', 'flash', 'info', 'QSSE'], [1, 2]], [13.5, ['Transmettre', 'rapidement'], [1]], [16.8, ['Résultats', '·', 'activités'], [0, 2]], [19.2, ['Procédures', '·', 'bonnes', 'pratiques'], [0, 3]], [21.8, ['Mais', 'attention', '!'], [1]], [24.7, ['Pas', 'qu’une', 'feuille'], [2]], [27.4, ['Comment', 'le', 'construire'], [2]]]} />
      <SearchOpen x={60} y={440} w={960} h={900} at={2.8} query="flash info QSSE" results={['flash info QSSE · l’outil de communication', 'affiche sécurité du mois', 'journal interne']} found={0} foundAt={9.3} clickAt={9.8} c={NAVY}>
        <div style={{position: 'absolute', left: 30, top: 24, width: 900, height: 380, borderRadius: 22, overflow: 'hidden', border: `4px solid ${NBK}`}}><Img src={PH(IMG.cover)} style={{width: 900, height: 380, objectFit: 'cover', objectPosition: '50% 40%', transform: `scale(${1.1 - prog(t, 10.5, 29, (x: number) => x) * 0.08})`}} /><Shine at={10.8} /></div>
        <div style={{position: 'absolute', left: 30, right: 30, top: 430, display: 'flex', flexWrap: 'wrap', gap: 12}}>{C4.map(([l, ic, a]) => (t > a ? <Chip key={l} at={a} ic={ic} l={l} c={NAVY} /> : null))}</div>
        {t > 21.8 && <div style={{position: 'absolute', left: 0, right: 0, top: 590, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22}}>
          <NBadge at={21.9} text="ATTENTION !" bg={RED} rot={-3} size={34} />
          <Barred at={24.6} strk={26.3} text="quelques infos sur une feuille" fs={28} />
        </div>}
        {t > 27.4 && <div style={{position: 'absolute', left: 0, right: 0, top: 760, display: 'flex', justifyContent: 'center'}}><NBadge at={27.5} text="VOICI COMMENT LE CONSTRUIRE" bg={GREEN} rot={-1} size={30} /></div>}
      </SearchOpen>
    </Out>
  );
};

/* ═════════════ Les rubriques ═════════════ */
const R1: React.FC = () => {
  const t = useT();
  return <SC at={32.4} end={45.85} c={TEAL} badge="RUBRIQUE 1 · LES RÉSULTATS QSSE" img={IMG.r1} pos="50% 30%" ih={520} chips={[['non-conformités', 'croix', 33.1], ['avancées du plan d’action', 'clipboard', 34.1], ['résultats obtenus', 'graphique', 35.7]]} over={<Mini />}>
    {t > 37.2 && <Abs x={60} y={1090} w={960} h={240} style={{...nb('#fff', 7), boxShadow: `7px 7px 0 ${TEAL}`, display: 'flex', alignItems: 'center', gap: 22, padding: '0 22px', opacity: pop(t, 37.2)}}>
      <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, position: 'absolute', left: 20, top: 10, color: DIM}}>PAR EXEMPLE</div>
      <div style={{display: 'flex', alignItems: 'center', gap: 12, marginTop: 20}}><div style={{...nb(GREEN, 6), width: 110, height: 110, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${Math.min(1.05, spring(t, 38.1))})`}}>0</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, lineHeight: 1.1, width: 200}}>non-conformité ce mois-ci</div></div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20}}>{([['port des EPI', 'casque', 41.9], ['tri des déchets', 'recyclage', 44.3]] as CH[]).map(([l, ic, a]) => (t > a ? <div key={l} style={{...nb(ORANGE, 5), display: 'flex', alignItems: 'center', gap: 10, padding: '6px 14px', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 26, transform: `scale(${pop(t, a)})`}}><F n={ic} size={40} />effort : {l}</div> : null))}</div>
    </Abs>}
  </SC>;
};
const R2: React.FC = () => {
  const t = useT();
  const AG: [string, string, number][] = [['inspections', 'loupe', 49.7], ['visites de terrain', 'pas', 50.4], ['formations', 'diplome', 51.6], ['causeries', 'causerie', 52.2]];
  return <SC at={49.4} end={56.05} c={BLUE} badge="RUBRIQUE 2 · LES PROCHAINES ACTIVITÉS" img={IMG.r2} pos="50% 35%" ih={500} h={[[49.4, ['Annoncer', 'les', 'activités'], [2]], [49.7, ['Inspections', '·', 'visites'], [0, 2]], [51.6, ['Formations', '·', 'causeries'], [0, 2]], [54.0, ['Dates', 'et', 'équipes'], [0, 2]]]} over={<Mini />}>
    <Abs x={60} y={970} w={960} h={330} style={{...nb('#fff', 7), boxShadow: `7px 7px 0 ${BLUE}`, opacity: pop(t, 49.5)}}>
      <div style={{position: 'absolute', left: 20, top: 14, fontFamily: MONO, fontWeight: 700, fontSize: 22}}>AGENDA À VENIR</div>
      {AG.map(([l, ic, a], k) => (t > a ? <div key={l} style={{position: 'absolute', left: 20, right: 20, top: 56 + k * 66, height: 56, display: 'flex', alignItems: 'center', gap: 14, borderBottom: '2px dashed #0002', transform: `translateX(${(1 - Math.min(1, spring(t, a))) * 300}px)`}}>
        <div style={{width: 70, height: 46, borderRadius: 8, background: BLUE, color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: t > 54.0 ? 1 : 0.25}}>date</div>
        <F n={ic} size={42} /><span style={{flex: 1, fontFamily: sansFont, fontWeight: 900, fontSize: 28}}>{l}</span>
        {t > 54.6 + k * 0.1 && <div style={{display: 'flex', gap: 4}}>{[0, 1, 2].map((j) => <div key={j} style={{width: 30, height: 30, borderRadius: 15, background: ['#7AA7E8', '#F5B97A', '#7DD3A8'][j], border: `3px solid ${NBK}`, marginLeft: j ? -10 : 0}} />)}</div>}
      </div> : null))}
    </Abs>
  </SC>;
};
const R3: React.FC = () => <SC at={59.6} end={65.3} c={VIO} badge="RUBRIQUE 3 · L’INFORMATION IMPORTANTE" img={IMG.r3} pos="50% 50%" chips={[['nouvelles procédures', 'clipboard', 60.5], ['modifications en cours', 'engrenage', 61.8], ['les changements qui les concernent', 'equipe', 63.4]]} over={<><Mini /><Stamp at={59.9} text="IMPORTANT" c={RED} x={330} y={330} rot={-8} size={56} /></>} />;
const R4: React.FC = () => {
  const t = useT();
  return <SC at={68.7} end={78.35} c={ORANGE} badge="RUBRIQUE 4 · L’ÉQUIPE QSSE" img={IMG.r4} pos="50% 30%" ih={480} h={[[68.8, ['Les', 'correspondants', 'QSSE'], [1, 2]], [70.9, ['Leurs', 'missions'], [1]], [71.8, ['Comment', 'les', 'contacter'], [2]], [73.6, ['Enfin', ':', 'vos', 'idées'], [3]], [76.4, ['Vos', 'suggestions'], [1]]]} over={<Mini />}>
    <Abs x={60} y={950} w={960} h={360}>
      {[0, 1, 2].map((k) => { const a = 69.2 + k * 0.3; return t > a ? <div key={k} style={{...nb('#fff', 6), boxShadow: `6px 6px 0 ${ORANGE}`, position: 'absolute', left: k * 230, top: 0, width: 210, height: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, transform: `scale(${Math.min(1.05, spring(t, a))}) rotate(${(k - 1) * 3}deg)`}}><F n={['agent-hse', 'superviseur', 'salariee'][k]} size={80} /><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 16}}>CORRESPONDANT</div>{t > 70.9 && <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 18, opacity: pop(t, 70.9)}}>mission ✓</div>}{t > 71.8 && <div style={{display: 'flex', gap: 6, opacity: pop(t, 71.8 + k * 0.1)}}><F n="telephone" size={28} /><F n="enveloppe" size={28} /></div>}</div> : null; })}
      {t > 75.0 && <div style={{position: 'absolute', left: 700, top: 0, width: 260, display: 'flex', flexDirection: 'column', gap: 10}}>{['une idée ?', 'je propose…', 'et si on…'].map((w, k) => <div key={w} style={{...nb('#FFF6D8', 4), borderRadius: 24, padding: '8px 14px', fontFamily: handFont, fontWeight: 700, fontSize: 30, transform: `scale(${pop(t, 75.2 + k * 0.3)}) rotate(${k % 2 ? 3 : -3}deg)`}}>{w}</div>)}</div>}
      {t > 76.4 && <div style={{position: 'absolute', left: 0, top: 230}}><Chip at={76.5} ic="ampoule" l="suggestions d’amélioration" c={GREEN} /></div>}
    </Abs>
  </SC>;
};

/* ═════════════ Guichet 6 : le bulletin s'assemble → code couleur → satisfaction → WhatsApp ═════════════ */
const Final: React.FC = () => {
  const t = useT();
  const sh = prog(t, 104.9, 105.6, easeInOut);
  const stars = prog(t, 96.2, 97.6, (x: number) => x) * 5;
  const trend = prog(t, 98.4, 99.6, easeOut);
  return (
    <>
      <Heads h={[[81.6, ['Une', 'présentation', 'claire'], [1, 2]], [83.1, ['Des', 'infos', 'vérifiées'], [2]], [85.0, ['Un', 'ton', 'adapté'], [2]], [88.8, ['Un', 'code', 'couleur'], [1, 2]], [90.0, ['Jaune', ':', 'qualité'], [0, 2]], [91.2, ['Orange', ':', 'sécurité'], [0, 2]], [93.2, ['Vert', ':', 'environnement'], [0, 2]], [95.7, ['Mesurer', 'la', 'satisfaction'], [2]], [98.4, ['Au', 'fil', 'du', 'temps'], [3]], [100.6, ['Des', 'outils', 'efficaces'], [2]], [105.6, ['Écris-moi'], [0]], [106.2, ['Sur', 'WhatsApp'], [1]]]} />
      {sh < 1 && <AbsoluteFill style={{opacity: 1 - sh, transform: `scale(${1 - sh * 0.15})`}}>
        <Abs x={60} y={440} w={960} h={880}>
          <div style={{position: 'absolute', left: 20, top: 10, transform: `scale(0.98) rotate(${-1 + Math.sin(t) * 0.6}deg)`, transformOrigin: '0 0'}}><Bulletin t={t} all={81.9} checks /></div>
          <div style={{position: 'absolute', left: 650, top: 20, width: 300, display: 'flex', flexDirection: 'column', gap: 12}}>
            {([['courtes', 'chrono', 80.4], ['claires', 'yeux', 81.6], ['vérifiées', 'check', 83.9], ['ton adapté', 'bulle', 85.3]] as CH[]).map(([l, ic, a]) => (t > a ? <Chip key={l} at={a} ic={ic} l={l} c={GREEN} /> : null))}
            {QSE.map(([l, c, a]) => (t > a ? <div key={l} style={{...nb(c, 5), padding: '8px 12px', fontFamily: sansFont, fontWeight: 900, fontSize: 22, color: c === YEL ? NBK : '#fff', transform: `scale(${Math.min(1.05, spring(t, a))})`}}>{l}</div> : null))}
          </div>
          {t > 95.6 && <div style={{position: 'absolute', left: 650, top: 600, width: 300, ...nb('#fff', 6), padding: 14, transform: `scale(${Math.min(1, spring(t, 95.6))})`}}>
            <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 18}}>SATISFACTION LECTEURS</div>
            <div style={{display: 'flex', gap: 4, marginTop: 8}}>{[0, 1, 2, 3, 4].map((j) => <div key={j} style={{fontSize: 44, color: stars > j + 0.5 ? GOLD : '#D5DCE6', transform: `scale(${stars > j + 0.5 ? 1.1 : 1})`}}>★</div>)}</div>
            {t > 98.3 && <svg width={270} height={70}><path d="M 5 60 L 70 50 L 130 40 L 190 26 L 262 8" fill="none" stroke={GREEN} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" pathLength={1} style={{strokeDasharray: 1, strokeDashoffset: 1 - trend}} /></svg>}
          </div>}
        </Abs>
        {t > 100.5 && <Abs x={60} y={1330} w={960} style={{display: 'flex', justifyContent: 'center'}}><NBadge at={100.6} text="DES OUTILS DE COMMUNICATION EFFICACES" bg={NAVY} rot={-1} size={26} /></Abs>}
        {t > 93.4 && t < 95 && <Dust n={22} c={GOLD} />}
      </AbsoluteFill>}
      {sh > 0 && <Abs x={60} y={440} w={960} h={930} style={{opacity: sh}}>
        <TikTokPhone at={105.4} zAt={106.3} ringAt={106.9} badgeAt={107.6} />
        {t > 108.2 && <Dust n={22} c={GOLD} />}
      </Abs>}
    </>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const trans = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1, 4, 0.18, 'sfx/ding', 0.12), {at: x.at + 0.45, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6, s: 'sfx/pop', v: 0.22}, {at: x.at + 2.9, s: 'sfx/whoosh', v: 0.3}];
const searchCues = (at: number, len: number, foundAt: number, clickAt: number): Sfx[] => [...rep(at + 0.3, Math.round(len), 0.05, 'sfx/click', 0.1), {at: foundAt, s: 'validation', v: 0.3}, {at: clickAt, s: 'sfx/click', v: 0.5}, {at: clickAt + 0.15, s: 'soft-whoosh', v: 0.5, dur: 1}, {at: clickAt + 0.85, s: 'sfx/thud', v: 0.35}];
const pops = (xs: number[]): Sfx[] => xs.map((at) => ({at, s: 'sfx/pop', v: 0.22}));
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 0.1, s: 'sfx/rise', v: 0.25, dur: 1.8},
  ...SECT.filter((x) => x.k !== 'none').flatMap(trans), {at: ALLDONE, s: 'validation', v: 0.3},
  ...STATIONS.map((r) => ({at: r.at, s: 'sfx/bell', v: 0.22})),
  ...searchCues(2.8, 15, 9.3, 9.8), ...pops([16.8, 17.8, 19.2, 20.6]), {at: 21.9, s: 'tampon', v: 0.4}, {at: 26.3, s: 'sfx/swish', v: 0.4}, {at: 27.5, s: 'tampon', v: 0.3},
  ...RUB.map((r) => ({at: r[3], s: 'sfx/thud', v: 0.3})),
  ...pops([33.1, 34.1, 35.7]), {at: 38.1, s: 'bass-hit', v: 0.35}, ...pops([41.9, 44.3]),
  ...[49.7, 50.4, 51.6, 52.2].map((at) => ({at, s: 'sfx/swish', v: 0.3})), {at: 54.0, s: 'sfx/pop', v: 0.25}, ...rep(54.6, 4, 0.1, 'sfx/pop', 0.14),
  {at: 59.9, s: 'tampon', v: 0.5}, ...pops([60.5, 61.8, 63.4]),
  ...[69.2, 69.5, 69.8].map((at) => ({at, s: 'sfx/thud', v: 0.32})), {at: 70.9, s: 'validation', v: 0.25}, ...pops([71.8, 75.2, 75.5, 75.8, 76.5]),
  {at: 81.9, s: 'soft-whoosh', v: 0.4, dur: 1}, ...RUB.map((_, k) => ({at: 81.9 + k * 0.22, s: 'sfx/thud', v: 0.28})), ...pops([80.4, 81.6, 85.3]), ...rep(83.9, 5, 0.15, 'sfx/ding', 0.14),
  ...QSE.map((x) => ({at: x[2], s: 'bass-hit', v: 0.3})), {at: 95.6, s: 'sfx/pop', v: 0.28}, ...rep(96.2, 5, 0.28, 'sfx/ding', 0.16), {at: 98.4, s: 'stylo', v: 0.3, dur: 1.2}, {at: 100.6, s: 'tampon', v: 0.3},
  {at: 105.4, s: 'soft-whoosh', v: 0.4, dur: 0.8}, {at: 106.3, s: 'sfx/rise', v: 0.3, dur: 0.8}, {at: 106.9, s: 'stylo', v: 0.35, dur: 0.7}, {at: 107.2, s: 'sfx/pop', v: 0.3}, {at: 107.6, s: 'tampon', v: 0.35}, {at: 108.2, s: 'bass-hit', v: 0.3},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

const TRANS: Record<string, React.FC<{i: number}>> = {gyro: Gyro, loupe: Loupe, tube: Pneumatique, store: Store};
const SCN: [React.FC, number, number][] = [[Intro, 2.7, 29.0], [R1, 32.3, 45.9], [R2, 49.3, 56.1], [R3, 59.5, 65.35], [R4, 68.6, 78.4], [Final, 81.8, OUTRO_AT]];
export const FlashInfoMetro: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    {SCN.map(([C, a, b], k) => <Gate key={k} from={a} to={b}><C /></Gate>)}
    {SECT.map((x, i) => { const C = TRANS[x.k]; return C ? <Gate key={x.n + i} from={x.at} to={x.at + 3.7}><C i={i} /></Gate> : null; })}
    <Gate from={2.8} to={OUTRO_AT}><Metro /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={OUTRO_AT - 0.1}><NeoCaptions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-flashinfo-metro-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Kin, Brut, T, TitleBlock, Win, GLASS, Check, Card, Num, GlassCard, IcoLab, Mono, sectIdx, Blinds, Deep, LoupeSweep, PneuDeliver, Shine, YEL, Board, random, PhotoLetter, Watermark, Captions, Pill, Strike, Count, handFont, TEAL, GOLD, Tile, BURG, NAVY, VIO, Stamp, StationBanner, NIGHT, BLUE, Shot, Chip, SECTX, Dust, Row, Strk, arcP, ACC, fmt, ORANGE, IMG, easeIn, hd];
