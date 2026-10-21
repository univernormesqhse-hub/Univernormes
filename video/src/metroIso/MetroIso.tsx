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
 * « Les 4 normes ISO de base » (1 min 46) — capsule « condensé + effet wahou + ultra premium » présentée comme UN PLAN
 * DE MÉTRO : chaque norme est une ligne (M 9001, M 14001, M 45001, M 19011), chaque compétence citée est une station
 * que la rame dessert au rythme de la voix ; la dernière partie relie la station « théorie » au terminus « pratique ».
 * Voix d'origine (sans musique de fond), sous-titres calés mot à mot, photos générées (ChatGPT) d'après
 * prompts-images-metro-iso.md, thème « papier quadrillé ».
 * Fil rouge : LE TUBE PNEUMATIQUE À SIX GUICHETS (ISO 9001 → ISO 14001 → ISO 45001 → ISO 19011 → retiens bien →
 * terminus), adaptés aux parties réellement présentes. Transition : LE GYROPHARE à chaque partie ; dans les scènes :
 * capsule pneumatique, loupe, store vénitien. Barre de recherche qui trouve puis OUVRE le plan du réseau.
 */
const IMG = {
  cover: 'metroiso-gen/couverture.jpg',
  qualite: 'metroiso-gen/qualite.jpg',
  environnement: 'metroiso-gen/environnement.jpg',
  sst: 'metroiso-gen/sst.jpg',
  audit: 'metroiso-gen/audit.jpg',
  terrain: 'metroiso-gen/terrain.jpg',
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
const OUTRO_AT = 105.6;
export const METROISO_FRAMES = s(OUTRO_AT + 3.8);
type TK = 'tube' | 'gyro' | 'loupe' | 'store';
const SECT: {at: number; n: string; title: string; s: string; c: string; g: string; k: TK; lab: string}[] = [
  {at: 17.2, n: '1', title: 'Ligne ISO 9001', s: 'management de la qualité', c: BLUE, g: 'ISO 9001', k: 'gyro', lab: 'LIGNE 1 / 4'},
  {at: 34.2, n: '2', title: 'Ligne ISO 14001', s: 'management environnemental', c: GREEN, g: 'ISO 14001', k: 'gyro', lab: 'LIGNE 2 / 4'},
  {at: 50.3, n: '3', title: 'Ligne ISO 45001', s: 'santé et sécurité au travail', c: ORANGE, g: 'ISO 45001', k: 'gyro', lab: 'LIGNE 3 / 4'},
  {at: 66.8, n: '4', title: 'Ligne ISO 19011', s: 'audit des systèmes', c: VIO, g: 'ISO 19011', k: 'gyro', lab: 'LIGNE 4 / 4'},
  {at: 84.3, n: '5', title: 'Correspondance', s: 'connaître ne suffit pas', c: RED, g: 'retiens bien', k: 'gyro', lab: 'CORRESPONDANCE'},
  {at: 99.1, n: '6', title: 'Terminus', s: 'de la théorie à la pratique', c: NAVY, g: 'terminus', k: 'gyro', lab: 'TERMINUS'},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const ALLDONE = 104.7;
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

/** Pastille de ligne de métro. */
const LineBadge: React.FC<{code: string; c: string; size: number}> = ({code, c, size}) => (
  <div style={{width: size, height: size, borderRadius: size, background: c, border: `${size * 0.06}px solid #fff`, boxShadow: `0 0 0 ${size * 0.04}px ${INK}, 0 ${size * 0.08}px ${size * 0.2}px rgba(0,0,0,0.25)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, lineHeight: 0.95}}>
    <span style={{fontSize: size * 0.16, opacity: 0.85}}>ISO</span><span style={{fontSize: size * (code.length > 4 ? 0.24 : 0.3)}}>{code}</span>
  </div>
);
/** Rame de métro stylisée (vue de face). */
const Train: React.FC<{c: string; w: number}> = ({c, w}) => (
  <div style={{width: w, height: w * 0.62, borderRadius: `${w * 0.22}px ${w * 0.22}px ${w * 0.08}px ${w * 0.08}px`, background: `linear-gradient(180deg, #fff, #E3E8EF)`, border: `${w * 0.04}px solid ${INK}`, position: 'relative', boxShadow: `0 ${w * 0.06}px 0 ${INK}`}}>
    <div style={{position: 'absolute', left: '12%', right: '12%', top: '14%', height: '38%', borderRadius: w * 0.08, background: NIGHT}} />
    <div style={{position: 'absolute', left: 0, right: 0, bottom: '16%', height: '12%', background: c}} />
    {[0.2, 0.8].map((x) => <div key={x} style={{position: 'absolute', left: `${x * 100 - 6}%`, bottom: '4%', width: '12%', height: '10%', borderRadius: 99, background: YEL, boxShadow: `0 0 ${w * 0.12}px ${YEL}`}} />)}
  </div>
);
/** Plan du réseau : 4 lignes courbes qui convergent vers le hub central. */
const NETWORK = [
  {code: '9001', c: BLUE, d: 'M 40 90 C 260 90, 300 300, 480 320'},
  {code: '14001', c: GREEN, d: 'M 920 90 C 700 90, 660 300, 480 320'},
  {code: '45001', c: ORANGE, d: 'M 40 560 C 260 560, 300 340, 480 320'},
  {code: '19011', c: VIO, d: 'M 920 560 C 700 560, 660 340, 480 320'},
];
const Network: React.FC<{at: number; lit?: number; hub: string}> = ({at, lit = 4, hub}) => {
  const t = useT();
  return (
    <div style={{position: 'absolute', inset: 0}}>
      <svg width={960} height={650} style={{position: 'absolute', left: 0, top: 0}}>
        {NETWORK.map((n, k) => <g key={n.code}><path d={n.d} fill="none" stroke={INK} strokeWidth={26} strokeLinecap="round" strokeDasharray={700} strokeDashoffset={700 * (1 - prog(t, at + k * 0.35, at + k * 0.35 + 1.0, easeOut))} opacity={k < lit ? 1 : 0.25} /><path d={n.d} fill="none" stroke={n.c} strokeWidth={16} strokeLinecap="round" strokeDasharray={700} strokeDashoffset={700 * (1 - prog(t, at + k * 0.35, at + k * 0.35 + 1.0, easeOut))} opacity={k < lit ? 1 : 0.25} /></g>)}
      </svg>
      {NETWORK.map((n, k) => <div key={n.code} style={{position: 'absolute', left: (k % 2 ? 920 : 40) - 60, top: (k < 2 ? 90 : 560) - 60, opacity: pop(t, at + k * 0.35 + 0.6), transform: `scale(${0.6 + 0.4 * pop(t, at + k * 0.35 + 0.6)})`}}><LineBadge code={n.code} c={n.c} size={120} /></div>)}
      <div style={{position: 'absolute', left: 480 - 120, top: 320 - 70, width: 240, height: 140, borderRadius: 70, background: '#fff', border: `8px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK, lineHeight: 1.05, opacity: pop(t, at + 1.4), boxShadow: `0 0 ${20 + 10 * Math.sin(t * 4)}px ${YEL}`}}>{hub}</div>
    </div>
  );
};

/* ═════════════ Couverture ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <div style={{position: 'absolute', left: 0, top: 200}}>{IMG.cover ? <Pic src={IMG.cover} ic="carte" w={1080} h={740} pos="50% 30%" /> : <div style={{position: 'relative', width: 1080, height: 650, transform: 'translate(60px, 40px)'}}><Network at={-5} hub="QHSE" /></div>}</div>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER} 9%, ${PAPER}00 16%, ${PAPER}00 34%, ${PAPER}DD 43%, ${PAPER} 48%)`}} />
      <Abs x={0} y={90} w={1080} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 50, boxSizing: 'border-box'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={0} y={930} w={1080} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', fontFamily: MONO, fontWeight: 700, fontSize: 26, letterSpacing: 4, color: '#fff', background: INK, padding: '8px 22px', borderRadius: 6}}>PLAN DU RÉSEAU QHSE</div>
        <div style={{marginTop: 16}}><Board text="4 NORMES ISO" at={-1} h={84} gap={2} c={BLUE} stag={0.02} /></div>
        <div style={{marginTop: 8}}><Board text="DE BASE" at={-1} h={84} gap={2} c={GREEN} stag={0.02} /></div>
        <div style={{marginTop: 18, display: 'flex', justifyContent: 'center', gap: 16}}>{NETWORK.map((n) => <LineBadge key={n.code} code={n.code} c={n.c} size={110} />)}</div>
      </Abs>
      <Abs x={60} y={1470} w={960} h={120} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `7px 7px 0 ${BURG}`, overflow: 'hidden'}}>
        <Tube x={30} y={34} w={900} h={24} />
        {SECT.map((x, k) => <div key={k} style={{position: 'absolute', left: 70 + k * 164 - 20, top: 26, width: 40, height: 40, borderRadius: 10, background: x.c, border: '4px solid #fff', boxSizing: 'border-box', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{x.n}</div>)}
        <div style={{position: 'absolute', left: 140, top: 36}}><Capsule w={56} c={BLUE} /></div>
        {SECT.map((x, k) => <div key={`l${k}`} style={{position: 'absolute', left: 70 + k * 164 - 75, width: 150, top: 74, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: x.c}}>{x.g}</div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ INTRO ═════════════ */
const Intro: React.FC = () => {
  const t = useT();
  return (
    <Out end={17.2}>
      <HiLine words={t < 10.9 ? ['4', 'normes', 'ISO', 'de', 'base'] : ['Le', 'plan', 'du', 'réseau']} mark={t < 10.9 ? [0, 1] : [1, 3]} at={t < 10.9 ? 2.8 : 11.0} y={330} size={62} />
      {t < 10.9 && (
        <Abs x={60} y={450} w={960} h={900}>
          {[{l: 'professionnel QHSE', c: BLUE, a: 5.58}, {l: 'assistant QHSE', c: GREEN, a: 7.3}, {l: 'futur responsable QHSE', c: ORANGE, a: 8.3}].map((p, k) => (
            <div key={p.l} style={{position: 'absolute', left: 60 + k * 30, top: 40 + k * 230, width: 780, height: 190, borderRadius: 22, background: '#fff', border: `5px solid ${INK}`, boxShadow: `8px 8px 0 ${p.c}`, display: 'flex', alignItems: 'center', overflow: 'hidden', opacity: pop(t, p.a), transform: `translateX(${(1 - prog(t, p.a, p.a + 0.5, easeOut)) * 900}px) rotate(${(k - 1) * 2}deg)`}}>
              <div style={{width: 150, alignSelf: 'stretch', background: p.c, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n="badge" size={90} /></div>
              <div style={{flex: 1, padding: '0 26px'}}><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 22, color: DIM}}>TITRE DE TRANSPORT · RÉSEAU QHSE</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 42, color: INK}}>{p.l}</div></div>
              <div style={{width: 0, alignSelf: 'stretch', borderLeft: `5px dashed ${DIM}`, marginRight: 60}} />
            </div>
          ))}
        </Abs>
      )}
      <SearchOpen x={60} y={440} w={960} h={760} at={10.9} query="normes ISO QHSE" results={['ISO 9001 · qualité', 'Plan du réseau : 4 normes', 'ISO 26000']} found={1} foundAt={12.4} clickAt={12.7} c={BLUE}>
        <div style={{position: 'absolute', left: 0, top: 30, width: 960, height: 650, transform: 'scale(0.94)', transformOrigin: '50% 0'}}><Network at={13.0} hub="Professionnel QHSE" /></div>
      </SearchOpen>
      {t > 13.6 && <Abs x={0} y={1230} w={1080} style={{textAlign: 'center'}}><Pill at={14.78} c={NAVY} size={30}>pour exercer efficacement ton métier</Pill></Abs>}
    </Out>
  );
};

/* ═════════════ LIGNE GÉNÉRIQUE ═════════════ */
type St = {l: string; a: number};
const LineScene: React.FC<{code: string; c: string; mg: string; mgAt: number; t0: number; end: number; img: string; ic: string; st: St[]}> = ({code, c, mg, mgAt, t0, end, img, ic, st}) => {
  const t = useT();
  const reached = st.filter((x) => t >= x.a).length;
  const y0 = 0;
  const gap = 470 / Math.max(1, st.length - 1);
  const ty = reached === 0 ? -70 : y0 + (reached - 1) * gap;
  const lastA = reached === 0 ? t0 : st[reached - 1].a;
  const moveP = prog(t, lastA, lastA + 0.5, easeInOut);
  const prevY = reached <= 1 ? -70 : y0 + (reached - 2) * gap;
  const yy = lerp(prevY, ty, moveP);
  return (
    <Out end={end}>
      <Abs x={60} y={300} w={960} h={130} style={{display: 'flex', alignItems: 'center', gap: 24}}>
        <div style={{opacity: pop(t, t0), transform: `scale(${0.5 + 0.5 * pop(t, t0)}) rotate(${(1 - pop(t, t0)) * -90}deg)`}}><LineBadge code={code} c={c} size={130} /></div>
        <div style={{opacity: pop(t, mgAt)}}><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, color: DIM}}>DIRECTION</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: c, lineHeight: 1.05}}>{mg}</div></div>
      </Abs>
      <Shot src={img} ic={ic} x={60} y={460} w={960} h={380} at={t0 + 0.2} c={c} blinds />
      <Abs x={60} y={880} w={960} h={520}>
        <div style={{position: 'absolute', left: 92, top: -10, width: 36, height: 510, borderRadius: 18, background: INK}} />
        <div style={{position: 'absolute', left: 98, top: -10, width: 24, height: 510 * prog(t, t0 + 0.2, t0 + 1.2, easeOut), borderRadius: 12, background: c}} />
        {st.map((x, k) => { const on = t >= x.a; return (
          <div key={x.l} style={{position: 'absolute', left: 0, top: y0 + k * gap - 30, width: 960, height: 60, display: 'flex', alignItems: 'center'}}>
            <div style={{marginLeft: 80, width: 60, height: 60, borderRadius: 30, background: on ? '#fff' : '#E3E8EF', border: `8px solid ${on ? c : INK}`, boxSizing: 'border-box', boxShadow: on ? `0 0 24px ${c}` : 'none'}} />
            <div style={{marginLeft: 40, fontFamily: sansFont, fontWeight: 900, fontSize: on ? 38 : 34, color: on ? INK : '#9AA7BC', background: on ? `${c}22` : 'transparent', borderRadius: 12, padding: '4px 14px', opacity: 0.35 + 0.65 * pop(t, x.a)}}>{x.l}</div>
          </div>
        ); })}
        {t > t0 + 0.4 && <div style={{position: 'absolute', left: 60, top: yy - 60, transform: 'scale(0.9)'}}><Train c={c} w={100} /></div>}
      </Abs>
    </Out>
  );
};
const L9001: St[] = [{l: 'structurer les processus', a: 22.5}, {l: 'maîtriser les non-conformités', a: 24.94}, {l: 'suivre les indicateurs', a: 27.1}, {l: 'actions correctives', a: 30.26}, {l: 'améliorer continuellement', a: 31.22}];
const L14001: St[] = [{l: 'aspects et impacts', a: 41.74}, {l: 'maîtriser les déchets', a: 43.94}, {l: 'prévenir les pollutions', a: 45.38}, {l: 'performance environnementale', a: 46.94}];
const L45001: St[] = [{l: 'identifier les dangers', a: 56.42}, {l: 'évaluer les risques', a: 59.06}, {l: 'mesures de prévention', a: 61.22}, {l: 'réduire accidents et maladies', a: 63.38}];
const L19011: St[] = [{l: 'programme d’audit', a: 75.38}, {l: 'conduire des entretiens', a: 76.62}, {l: 'preuves objectives', a: 78.5}, {l: 'formuler des constats', a: 80.54}, {l: 'suivre les actions correctives', a: 82.26}];

/* ═════════════ 5 · CORRESPONDANCE ═════════════ */
const Retiens: React.FC = () => {
  const t = useT();
  return (
    <Out end={99.1}>
      <HiLine words={['Connaître', 'ne', 'suffit', 'pas']} mark={[0, 2]} at={86.3} y={330} size={66} />
      <Abs x={60} y={450} w={960} h={300} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 26, boxShadow: `8px 8px 0 ${RED}`, display: 'flex', alignItems: 'center', overflow: 'hidden', opacity: pop(t, 84.7)}}>
        <div style={{width: 200, alignSelf: 'stretch', background: NAVY, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n="livres" size={120} /></div>
        <div style={{flex: 1, padding: '0 30px'}}><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, color: DIM}}>STATION</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: INK}}>les exigences</div><div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 30, color: DIM}}>connaître la norme</div></div>
        <Stamp at={87.46} c={RED} text="ne suffit pas" x={420} y={150} rot={-8} size={50} />
      </Abs>
      <Abs x={60} y={790} w={960} h={570}>
        <div style={{position: 'absolute', left: 92, top: 0, width: 36, height: 560, borderRadius: 18, background: INK}} />
        <div style={{position: 'absolute', left: 98, top: 0, width: 24, height: 560 * prog(t, 89.4, 98.0), borderRadius: 12, background: `linear-gradient(180deg, ${RED}, ${GREEN})`}} />
        {[{l: 'outils opérationnels', ic: 'outils', a: 91.94, y: 60}, {l: 'appliquer sur le terrain', ic: 'casque', a: 94.02, y: 260}, {l: 'résultats mesurables', ic: 'hausse', a: 97.62, y: 460}].map((p) => <div key={p.l} style={{position: 'absolute', left: 0, top: p.y - 50, width: 960, height: 100, display: 'flex', alignItems: 'center', opacity: 0.3 + 0.7 * pop(t, p.a)}}><div style={{marginLeft: 70, width: 80, height: 80, borderRadius: 40, background: t > p.a ? '#fff' : '#E3E8EF', border: `9px solid ${t > p.a ? GREEN : INK}`, boxSizing: 'border-box'}} /><div style={{marginLeft: 30, display: 'flex', alignItems: 'center', gap: 18, background: '#fff', border: `5px solid ${INK}`, borderRadius: 20, padding: '10px 24px', boxShadow: t > p.a ? `6px 6px 0 ${GREEN}` : 'none'}}><F n={p.ic} size={64} /><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: INK}}>{p.l}</span></div></div>)}
      </Abs>
    </Out>
  );
};

/* ═════════════ 6 · TERMINUS ═════════════ */
const Terminus: React.FC = () => {
  const t = useT();
  const run = prog(t, 103.3, 105.0, easeInOut);
  return (
    <Out end={OUTRO_AT}>
      <HiLine words={['De', 'la', 'théorie', 'à', 'la', 'pratique']} mark={[2, 5]} at={99.4} y={330} size={58} />
      <Shot src={IMG.terrain} ic="hausse" x={60} y={440} w={960} h={420} at={99.4} c={NAVY} />
      <Abs x={60} y={900} w={960} h={420} style={{background: '#fff', border: `6px solid ${INK}`, borderRadius: 30, boxShadow: `9px 9px 0 ${NAVY}`, overflow: 'hidden', opacity: pop(t, 100.0)}}>
        <div style={{position: 'absolute', left: 80, right: 80, top: 230, height: 30, borderRadius: 15, background: INK}} />
        <div style={{position: 'absolute', left: 86, width: 788 * run, top: 236, height: 18, borderRadius: 9, background: `linear-gradient(90deg, ${BLUE}, ${GREEN}, ${ORANGE}, ${VIO})`}} />
        {[{l: 'THÉORIE', x: 80, c: DIM}, {l: 'PRATIQUE', x: 880, c: GREEN}].map((p) => <div key={p.l} style={{position: 'absolute', left: p.x - 50, top: 195, width: 100, height: 100, borderRadius: 50, background: '#fff', border: `10px solid ${p.c}`, boxSizing: 'border-box'}} />)}
        {[{l: 'théorie', x: 80, a: 103.3}, {l: 'pratique', x: 880, a: 104.74}].map((p) => <div key={p.l} style={{position: 'absolute', left: Math.max(10, Math.min(p.x - 110, 960 - 240)), top: 310, width: 220, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: INK, opacity: pop(t, p.a)}}>{p.l}</div>)}
        <div style={{position: 'absolute', left: 80 + 800 * run - 55, top: 130}}><Train c={NAVY} w={110} /></div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 30, display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={99.38} c={NAVY} size={28}>Universnormes QHSE</Pill><Pill at={101.9} c={GREEN} size={28}>développer tes compétences</Pill></div>
      </Abs>
      {t > ALLDONE && <Dust n={22} c={GOLD} />}
    </Out>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const flaps = (a: number, n: number): Sfx[] => rep(a, n, 0.06, 'tick', 0.16);
const trans = (x: {at: number}): Sfx[] => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1, 4, 0.18, 'sfx/ding', 0.12), {at: x.at + 0.45, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6, s: 'sfx/pop', v: 0.22}, {at: x.at + 2.9, s: 'sfx/whoosh', v: 0.3}];
const searchCues = (at: number, len: number, foundAt: number, clickAt: number): Sfx[] => [...rep(at + 0.3, Math.round(len), 0.05, 'sfx/click', 0.1), {at: at + 0.35 + len * 0.05, s: 'sfx/pop', v: 0.25}, ...rep(at + 0.8 + len * 0.05, 3, 0.12, 'sfx/pop', 0.1), {at: foundAt, s: 'validation', v: 0.3}, {at: clickAt, s: 'sfx/click', v: 0.5}, {at: clickAt + 0.15, s: 'soft-whoosh', v: 0.5, dur: 1}, {at: clickAt + 0.85, s: 'sfx/thud', v: 0.35}];
const stationCues = (L: St[]): Sfx[] => L.flatMap((x) => [{at: x.a, s: 'soft-whoosh', v: 0.2, dur: 0.5}, {at: x.a + 0.45, s: 'sfx/ding', v: 0.2}]);
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, ...flaps(0.1, 14), {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...SECT.flatMap(trans), ...SECT.map((x) => ({at: x.at + 0.8, s: 'validation', v: 0.18})), {at: ALLDONE, s: 'validation', v: 0.3},
  {at: 2.8, s: 'sfx/rise', v: 0.2, dur: 1}, ...[5.58, 7.3, 8.3].map((a) => ({at: a, s: 'sfx/whoosh', v: 0.25})),
  ...searchCues(10.9, 15, 12.4, 12.7), ...rep(13.0, 4, 0.35, 'sfx/rise', 0.14), {at: 14.4, s: 'bass-hit', v: 0.3}, {at: 14.78, s: 'sfx/pop', v: 0.2},
  ...stationCues(L9001), {at: 20.02, s: 'sfx/ding', v: 0.22}, ...stationCues(L14001), {at: 36.98, s: 'sfx/ding', v: 0.22}, ...stationCues(L45001), {at: 53.22, s: 'sfx/ding', v: 0.22}, ...stationCues(L19011), {at: 70.22, s: 'sfx/ding', v: 0.22},
  {at: 84.7, s: 'sfx/whoosh', v: 0.25}, {at: 87.46, s: 'tampon', v: 0.6}, {at: 89.4, s: 'sfx/rise', v: 0.2, dur: 8}, ...[91.94, 94.02, 97.62].map((a) => ({at: a, s: 'validation', v: 0.22})),
  {at: 99.4, s: 'soft-whoosh', v: 0.35, dur: 1}, ...[99.38, 101.9].map((a) => ({at: a, s: 'sfx/pop', v: 0.2})), {at: 103.3, s: 'soft-whoosh', v: 0.5, dur: 1.8}, {at: 105.0, s: 'sfx/ding', v: 0.3},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const MetroIso: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.6} to={17.25}><Intro /></Gate>
    <Gate from={17.6} to={34.25}><LineScene code="9001" c={BLUE} mg="management de la qualité" mgAt={20.02} t0={17.6} end={34.2} img={IMG.qualite} ic="graphique" st={L9001} /></Gate>
    <Gate from={34.6} to={50.35}><LineScene code="14001" c={GREEN} mg="management environnemental" mgAt={36.98} t0={34.6} end={50.3} img={IMG.environnement} ic="recyclage" st={L14001} /></Gate>
    <Gate from={50.7} to={66.85}><LineScene code="45001" c={ORANGE} mg="santé et sécurité au travail" mgAt={53.22} t0={50.7} end={66.8} img={IMG.sst} ic="casque" st={L45001} /></Gate>
    <Gate from={67.2} to={84.35}><LineScene code="19011" c={VIO} mg="audit des systèmes de management" mgAt={70.22} t0={67.2} end={84.3} img={IMG.audit} ic="auditeur" st={L19011} /></Gate>
    <Gate from={84.6} to={99.15}><Retiens /></Gate>
    <Gate from={99.4} to={OUTRO_AT}><Terminus /></Gate>
    {SECT.map((x, i) => <Gate key={x.n} from={x.at} to={x.at + 3.7}><Gyro i={i} /></Gate>)}
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={105.3}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-metro-iso-origine.m4a')} trimAfter={s(OUTRO_AT)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Pneumatique, Loupe, Store, Kin, Brut, T, TitleBlock, Win, GLASS, Check, Tile, Card, Num, random, GlassCard, IcoLab, Mono, TEAL, BURG, sectIdx, Blinds, Deep, spring, Strike, LoupeSweep, PneuDeliver, Shine, Count];
