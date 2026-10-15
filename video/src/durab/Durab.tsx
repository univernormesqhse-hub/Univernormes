import React from 'react';
import {AbsoluteFill, Audio, Img, random, staticFile} from 'remotion';
import {Gate} from '../anim';
import {Captions} from '../components/Captions';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {s, sansFont} from '../theme';
import {Abs, Bg, BLUE, DIM, easeIn, easeInOut, easeOut, GREEN, INK, lerp, LOGO, PAPER, PH, pop, prog, RED, spring, T, useT} from '../implIso/kit';
import {captions} from './captions';

/**
 * « La durabilité décodée » (6 min 52) — LA capsule-somme de la série : voix d'origine, sous-titres recalés mot à mot,
 * photos réelles, thème « papier quadrillé ». Elle réunit le meilleur de toutes les capsules précédentes :
 *  • tuiles de lettres en bois (vocabulaire HSE) — la « soupe à l'alphabet » qui tourbillonne puis se trie ;
 *  • palettes d'affichage (acronymes sécurité) — le DÉCODEUR de l'en-tête et les dates 1987 / 1992 / 2022 / 2026 ;
 *  • ligne de métro (identifier les processus) — le plan des 4 parties ;
 *  • passage du témoin (identifier les processus) — transition de partie, le titre s'écrivant en tuiles ;
 *  • store vénitien (acronymes sécurité) — révélation des photos réelles ;
 *  • mise en abyme (procédure des procédures) — les acronymes qui s'emboîtent comme des poupées gigognes ;
 *  • tiroirs d'archives (procédure des procédures) — les 4 familles de l'écosystème ;
 *  • clé de voûte, cycle orbital, écran partagé, carrefour, rouleaux, tampons, vitre, ondes de choc, poussière d'or,
 *    photos en profondeur 3D, typographie cinétique lettre à lettre…
 * Fil rouge propre : le DÉCODEUR — une rangée de palettes dans l'en-tête qui affiche l'acronyme en cours de décodage
 * (DD → RSE → CSRD → ESG → ISO 26000 → ?) au-dessus d'une mini-ligne de métro des parties.
 */
const ORANGE = '#F28C1E';
const VIO = '#7B5CD6';
const TEAL = '#14A3A3';
const GOLD = '#F5B700';
const EU = '#1E4FA8';
const WOOD = '#F3D9A4';
const OUTRO_AT = 408.9;
export const DURAB_FRAMES = s(OUTRO_AT + 3.8);

const PARTS = [
  {at: 43.5, n: '1', title: 'Les fondements du développement durable', c: GREEN, code: 'DD'},
  {at: 110.6, n: '2', title: 'La stratégie d’entreprise : la RSE', c: BLUE, code: 'RSE'},
  {at: 171.4, n: '3', title: 'La réglementation : CSRD & ESG', c: EU, code: 'CSRD'},
  {at: 267.0, n: '4', title: 'L’écosystème & l’ISO 26000', c: VIO, code: 'ISO26000'},
];
const DECODE = [
  {at: 2.6, w: 'DD RSE'}, {at: 43.5, w: 'DD'}, {at: 110.6, w: 'RSE'}, {at: 171.4, w: 'CSRD'}, {at: 236.5, w: 'ESG'}, {at: 249.4, w: 'ESRS'}, {at: 267.0, w: 'ISO26000'}, {at: 354.7, w: '?'},
];
const partIdx = (t: number) => PARTS.reduce((k, p, i) => (t >= p.at ? i : k), -1);

/* ═════════════ Briques communes ═════════════ */
export const Kin: React.FC<{text: string; at: number; size: number; color?: string; stagger?: number; style?: React.CSSProperties}> = ({text, at, size, color = INK, stagger = 0.025, style}) => {
  const t = useT();
  let n = 0;
  return (
    <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: size, color, lineHeight: 1.08, letterSpacing: -1, ...style}}>
      {text.split(' ').map((w, wi) => (
        <span key={wi} style={{display: 'inline-block', whiteSpace: 'nowrap', marginRight: size * 0.25}}>
          {w.split('').map((ch, i) => {
            const k = n++;
            const p = prog(t, at + k * stagger, at + k * stagger + 0.45, easeOut);
            return <span key={i} style={{display: 'inline-block', opacity: p, transform: `translateY(${(1 - p) * size * 0.6}px) rotate(${(1 - p) * 8}deg)`, filter: `blur(${(1 - p) * 10}px)`}}>{ch}</span>;
          })}
        </span>
      ))}
    </div>
  );
};
export const Center: React.FC<{y: number; children: React.ReactNode; style?: React.CSSProperties}> = ({y, children, style}) => (
  <Abs x={40} y={y} w={1000} style={{textAlign: 'center', ...style}}>{children}</Abs>
);
export const Deep: React.FC<{src: string; x: number; y: number; w: number; h: number; at: number; pos?: string; tilt?: number; children?: React.ReactNode; filter?: string; round?: number}> = ({src, x, y, w, h, at, pos = 'center', tilt = 1, children, filter, round = 30}) => {
  const t = useT();
  const k = t - at;
  const inn = prog(t, at, at + 0.7, easeOut);
  const sweep = ((k * 0.45) % 1.6) - 0.3;
  return (
    <Abs x={x} y={y} w={w} h={h} style={{perspective: 2200, opacity: inn}}>
      <div style={{position: 'absolute', inset: 0, borderRadius: round, overflow: 'hidden', border: '8px solid #fff', boxShadow: '0 40px 80px rgba(20,33,61,0.3)', transform: `rotateY(${Math.sin(k * 0.6) * 4 * tilt}deg) rotateX(${Math.cos(k * 0.5) * 2.5 * tilt}deg) scale(${0.92 + inn * 0.08})`}}>
        <Img src={PH(src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, filter, transform: `scale(${1.12 + Math.min(Math.max(k, 0), 20) * 0.01}) translateX(${Math.sin(k * 0.4) * 14}px)`}} />
        <div style={{position: 'absolute', inset: 0, background: `linear-gradient(105deg, transparent ${sweep * 100 - 12}%, rgba(255,255,255,0.3) ${sweep * 100}%, transparent ${sweep * 100 + 12}%)`}} />
        <div style={{position: 'absolute', inset: 0, boxShadow: 'inset 0 0 120px rgba(20,33,61,0.3)'}} />
        {children}
      </div>
    </Abs>
  );
};
/** Store vénitien : la photo apparaît à travers des lamelles qui pivotent. */
export const Blinds: React.FC<{src: string; x: number; y: number; w: number; h: number; at: number; pos?: string; n?: number; children?: React.ReactNode; filter?: string}> = ({src, x, y, w, h, at, pos = 'center', n = 10, children, filter}) => {
  const t = useT();
  const sh = h / n;
  const k = t - at;
  return (
    <Abs x={x} y={y} w={w} h={h} style={{borderRadius: 30, overflow: 'hidden', boxShadow: `0 30px 70px rgba(20,33,61,${0.3 * prog(t, at, at + 0.8)})`}}>
      {Array.from({length: n}, (_, i) => {
        const p = prog(t, at - 0.15 + i * 0.045, at + 0.35 + i * 0.045, easeOut);
        return (
          <div key={i} style={{position: 'absolute', left: 0, top: i * sh, width: w, height: sh + 1, overflow: 'hidden', perspective: 900, opacity: p > 0 ? 1 : 0}}>
            <div style={{width: w, height: sh + 1, overflow: 'hidden', transform: `rotateX(${(1 - p) * 88}deg)`, filter: `brightness(${0.7 + p * 0.3})`}}>
              <Img src={PH(src)} style={{position: 'absolute', left: 0, top: -i * sh, width: w, height: h, objectFit: 'cover', objectPosition: pos, filter, transformOrigin: `${w / 2}px ${h / 2}px`, transform: `scale(${1.1 + Math.min(Math.max(k, 0), 20) * 0.01}) translateX(${Math.sin(k * 0.45) * 14}px)`}} />
            </div>
          </div>
        );
      })}
      <div style={{position: 'absolute', inset: 0, borderRadius: 30, boxShadow: 'inset 0 0 0 8px #fff'}} />
      {children}
    </Abs>
  );
};
export const Pill: React.FC<{at: number; c: string; children: React.ReactNode; size?: number; style?: React.CSSProperties}> = ({at, c, children, size = 34, style}) => {
  const t = useT();
  const p = Math.min(1, spring(t, at, 8, 14));
  return <div style={{display: 'inline-block', padding: `${size * 0.3}px ${size * 0.7}px`, borderRadius: 60, background: c, color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: size, transform: `scale(${Math.max(0, p)})`, boxShadow: '0 10px 24px rgba(20,33,61,0.18)', whiteSpace: 'nowrap', ...style}}>{children}</div>;
};
export const Stamp: React.FC<{at: number; c: string; text: string; x: number; y: number; rot?: number; size?: number}> = ({at, c, text, x, y, rot = -8, size = 54}) => {
  const t = useT();
  if (t < at) return null;
  const p = prog(t, at, at + 0.22, easeIn);
  return (
    <Abs x={x} y={y} style={{transform: `rotate(${rot}deg) scale(${lerp(2.2, 1, p)})`, opacity: p, zIndex: 5}}>
      <div style={{padding: '10px 26px', border: `7px solid ${c}`, borderRadius: 14, color: c, fontFamily: sansFont, fontWeight: 900, fontSize: size, letterSpacing: 2, textTransform: 'uppercase', background: 'rgba(255,255,255,0.9)', whiteSpace: 'nowrap'}}>{text}</div>
    </Abs>
  );
};
export const Cite: React.FC<{y: number; at: number; text: string}> = ({y, at, text}) => {
  const t = useT();
  return <Abs x={0} y={y} w={1080} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 700, fontSize: 24, color: DIM, opacity: pop(t, at)}}>{text}</Abs>;
};
export const Dust: React.FC<{n?: number; c?: string}> = ({n = 22, c = GOLD}) => {
  const t = useT();
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {Array.from({length: n}, (_, i) => {
        const x = random(`dx${i}`) * 1080 + Math.sin(t * 0.6 + i) * 30;
        const y = ((random(`dy${i}`) * 1920 - t * (20 + random(`ds${i}`) * 40)) % 1920 + 1920) % 1920;
        const r = 4 + random(`dr${i}`) * 7;
        return <div key={i} style={{position: 'absolute', left: x, top: y, width: r, height: r, borderRadius: r, background: c, opacity: 0.2 + 0.3 * Math.abs(Math.sin(t * 1.5 + i)), boxShadow: `0 0 ${r * 2}px ${c}`}} />;
      })}
    </AbsoluteFill>
  );
};
export const Out: React.FC<{end: number; children: React.ReactNode}> = ({end, children}) => {
  const t = useT();
  const o = prog(t, end - 0.4, end, easeIn);
  return <AbsoluteFill style={{opacity: 1 - o, transform: `translateY(${-o * 50}px)`}}>{children}</AbsoluteFill>;
};
export const Card: React.FC<{x: number; y: number; w: number; h?: number; at: number; c?: string; children: React.ReactNode; style?: React.CSSProperties}> = ({x, y, w, h, at, c, children, style}) => {
  const t = useT();
  const p = Math.min(1, spring(t, at, 8, 14));
  return <Abs x={x} y={y} w={w} h={h} style={{background: '#fff', borderRadius: 26, boxShadow: '0 20px 44px rgba(20,33,61,0.16)', borderTop: c ? `10px solid ${c}` : undefined, padding: 26, boxSizing: 'border-box', transform: `translateY(${(1 - p) * 60}px) scale(${0.9 + 0.1 * Math.max(0, p)})`, opacity: t >= at ? 1 : 0, ...style}}>{children}</Abs>;
};

/* ─── Tuiles en bois (capsule « vocabulaire HSE ») ─── */
export const Tile: React.FC<{ch: string; size: number; c?: string; glow?: number}> = ({ch, size, c = INK, glow = 0}) => (
  <div style={{width: size, height: size, borderRadius: size * 0.14, background: `linear-gradient(160deg, #FBEBC6, ${WOOD} 55%, #E2BE7C)`, boxShadow: `0 ${size * 0.08}px 0 #B98A4A, 0 ${size * 0.16}px ${size * 0.25}px rgba(20,33,61,0.3)${glow ? `, 0 0 ${size * 0.5 * glow}px ${c}` : ''}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: size * 0.62, color: c, position: 'relative', flexShrink: 0}}>
    {ch}
    <div style={{position: 'absolute', inset: size * 0.05, borderRadius: size * 0.11, border: '1px solid rgba(255,255,255,0.5)'}} />
  </div>
);
export const Word: React.FC<{text: string; at: number; size: number; c: string; variant?: number; gap?: number}> = ({text, at, size, c, variant = 0, gap}) => {
  const t = useT();
  return (
    <div style={{display: 'flex', gap: gap ?? size * 0.1, justifyContent: 'center'}}>
      {text.split('').map((ch, i) => {
        const st = at + i * 0.07;
        const p = variant === 0 ? Math.min(1, spring(t, st, 7, 12)) : prog(t, st, st + 0.45, easeOut);
        const q = 1 - Math.max(0, p);
        const land = Math.max(0, 1 - Math.abs(t - st - 0.4) * 4);
        const tr = variant === 0 ? `translateY(${-q * 900}px) rotate(${q * (i % 2 ? 25 : -25)}deg)` : variant === 1 ? `perspective(800px) rotateX(${q * 95}deg)` : `rotate(${q * 540}deg) scale(${1 - q})`;
        return <div key={i} style={{transform: tr, opacity: t >= st ? 1 : 0}}>{ch === ' ' ? <div style={{width: size * 0.4}} /> : <Tile ch={ch} size={size} c={c} glow={land} />}</div>;
      })}
    </div>
  );
};

/* ─── Palettes d'affichage (capsule « acronymes sécurité ») ─── */
const POOL = 'ABCDEFGHIJKLMNOPRSTUVXYZ0123456789';
const FL = 0.06;
const Half: React.FC<{ch: string; top: boolean; w: number; h: number; c: string}> = ({ch, top, w, h, c}) => (
  <div style={{width: w, height: h / 2, overflow: 'hidden', position: 'relative', background: top ? '#FFFFFF' : '#F4F6FA'}}>
    <div style={{position: 'absolute', left: 0, top: top ? 0 : -h / 2, width: w, height: h, lineHeight: `${h}px`, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: h * 0.68, color: c}}>{ch}</div>
  </div>
);
export const Flap: React.FC<{ch: string; at: number; h: number; w?: number; n?: number; c?: string; seed?: string}> = ({ch, at, h, w = h * 0.74, n = 8, c = INK, seed = ''}) => {
  const t = useT();
  const seq = [...Array.from({length: n}, (_, k) => POOL[Math.floor(random(`${seed}${ch}${k}`) * POOL.length)]), ch];
  const raw = (t - at) / FL;
  const idx = Math.max(0, Math.min(n, Math.floor(raw)));
  const f = raw < 0 ? 1 : idx >= n ? 1 : raw - idx;
  const cur = raw < 0 ? ' ' : seq[idx];
  const prev = raw < 0 ? ' ' : idx === 0 ? ' ' : seq[idx - 1];
  const done = raw >= n;
  return (
    <div style={{position: 'relative', width: w, height: h, borderRadius: h * 0.08, overflow: 'hidden', perspective: h * 4, boxShadow: `0 ${h * 0.05}px ${h * 0.12}px rgba(20,33,61,0.25), inset 0 0 0 1px rgba(20,33,61,0.08)`, flexShrink: 0}}>
      <Half ch={cur} top w={w} h={h} c={c} />
      <Half ch={done ? cur : prev} top={false} w={w} h={h} c={c} />
      {!done && raw >= 0 && (f < 0.5
        ? <div style={{position: 'absolute', left: 0, top: 0, transformOrigin: '50% 100%', transform: `rotateX(${-f * 180}deg)`}}><Half ch={prev} top w={w} h={h} c={c} /></div>
        : <div style={{position: 'absolute', left: 0, top: h / 2, transformOrigin: '50% 0%', transform: `rotateX(${(1 - f) * 180}deg)`}}><Half ch={cur} top={false} w={w} h={h} c={c} /></div>)}
      <div style={{position: 'absolute', left: 0, right: 0, top: h / 2 - 1, height: 2, background: 'rgba(20,33,61,0.18)'}} />
    </div>
  );
};
export const Board: React.FC<{text: string; at: number; h: number; gap?: number; c?: string; stag?: number; n?: number}> = ({text, at, h, gap = 4, c = INK, stag = 0.05, n = 7}) => (
  <div style={{display: 'flex', gap, justifyContent: 'center'}}>
    {text.split('').map((ch, i) => <Flap key={`${text}${i}`} ch={ch} at={at + i * stag} h={h} c={c} n={n + (i % 3)} seed={text} />)}
  </div>
);

/* ═════════════ Fil rouge : le décodeur + passage du témoin ═════════════ */
const Header: React.FC = () => {
  const t = useT();
  const d = DECODE.reduce((k, x) => (t >= x.at ? x : k), DECODE[0]);
  const pi = partIdx(t);
  const col = pi >= 0 ? PARTS[pi].c : INK;
  return (
    <AbsoluteFill style={{zIndex: 40, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: '50%', top: 60, transform: 'translateX(-50%)', background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 8px 24px rgba(20,33,61,0.12)'}}><Img src={staticFile(LOGO)} style={{height: 76, display: 'block'}} /></div>
      {t > 2.6 && t < OUTRO_AT && (
        <div style={{position: 'absolute', left: 40, right: 40, top: 190, height: 80, display: 'flex', alignItems: 'center', gap: 16, opacity: pop(t, 2.6), background: '#ffffffE8', borderRadius: 24, padding: '0 20px', boxShadow: '0 8px 20px rgba(20,33,61,0.1)'}}>
          <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 18, letterSpacing: 3, color: DIM}}>DÉCODEUR</div>
          <div style={{display: 'flex', gap: 3}}>{d.w.split('').map((ch, i) => <Flap key={`${d.w}${i}`} ch={ch === ' ' ? ' ' : ch} at={d.at + i * 0.05} h={52} n={6} c={col} seed={d.w} />)}</div>
          <div style={{flex: 1}} />
          <div style={{display: 'flex', alignItems: 'center'}}>
            {PARTS.map((p, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div style={{width: 34, height: 6, background: i <= pi ? PARTS[i].c : '#DDE3EC'}} />}
                <div style={{width: 30, height: 30, borderRadius: 15, background: i <= pi ? p.c : '#fff', border: `4px solid ${p.c}`, boxSizing: 'border-box', transform: `scale(${i === pi ? 1.2 : 1})`, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{i <= pi ? p.n : ''}</div>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
const Baton: React.FC<{i: number}> = ({i}) => {
  const t = useT();
  const p = PARTS[i];
  const k = t - p.at;
  const inn = prog(t, p.at, p.at + 0.6, easeInOut);
  const out = prog(t, p.at + 3.0, p.at + 3.6, easeInOut);
  if (k < 0 || out >= 1) return null;
  const lead = out > 0 ? out : inn;
  const X = -500 + lead * 2100;
  const poly = out > 0 ? `polygon(${X}px 0, 2200px 0, 2200px 1920px, ${X - 400}px 1920px)` : `polygon(-600px 0, ${X}px 0, ${X - 400}px 1920px, -600px 1920px)`;
  return (
    <AbsoluteFill style={{zIndex: 35}}>
      <AbsoluteFill style={{background: p.c, clipPath: poly}}>
        <Abs x={0} y={560} w={1080}><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 40, letterSpacing: 8, color: '#ffffffCC', textAlign: 'center', opacity: pop(t, p.at + 0.4)}}>PARTIE {p.n}</div></Abs>
        <Abs x={0} y={650} w={1080}><Word text={p.code} at={p.at + 0.5} size={p.code.length > 5 ? 110 : 170} c={p.c} variant={0} /></Abs>
        <Abs x={70} y={920} w={940} style={{textAlign: 'center'}}><Kin text={p.title} at={p.at + 1.2} size={64} color="#fff" /></Abs>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 26, background: 'repeating-linear-gradient(90deg, #ffffff40 0 60px, transparent 60px 120px)'}} />
      </AbsoluteFill>
      <div style={{position: 'absolute', left: X - 200 - 130, top: 960 - 34, width: 260, height: 68, borderRadius: 34, background: `linear-gradient(180deg, #fff, ${GOLD} 40%, #C98F00)`, boxShadow: '0 16px 30px rgba(0,0,0,0.3)', transform: `rotate(${-68 + Math.sin(k * 8) * 4}deg)`}} />
    </AbsoluteFill>
  );
};

/* ═════════════ Couverture ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <Img src={PH('durab/planete-odd.jpg')} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 860, objectFit: 'cover', objectPosition: '50% 50%', filter: 'saturate(1.1)'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 34%, ${PAPER}DD 42%, ${PAPER} 46%)`}} />
      <Abs x={0} y={90} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={50} y={720} w={980} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: INK, color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: 30, letterSpacing: 3}}>DD · RSE · CSRD · ESG · ISO 26000</div>
        <T size={120} style={{marginTop: 20, textTransform: 'uppercase', letterSpacing: -3}}>La durabilité</T>
        <T size={120} style={{textTransform: 'uppercase', letterSpacing: -3}}><span style={{background: GREEN, color: '#fff', padding: '0 24px', borderRadius: 20}}>décodée</span></T>
        <T size={44} color={DIM} style={{marginTop: 16}}>Faire le tri dans la soupe à l’alphabet</T>
      </Abs>
      <Abs x={0} y={1290} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 34}}>
        {['DD', 'RSE', 'ESG'].map((w, k) => <div key={w} style={{display: 'flex', gap: 6, transform: `rotate(${(k - 1) * 5}deg)`}}>{w.split('').map((c, i) => <Tile key={i} ch={c} size={100} c={[GREEN, BLUE, EU][k]} />)}</div>)}
      </Abs>
      <Abs x={0} y={1440} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 6}}>{'CSRD'.split('').map((c, i) => <Flap key={i} ch={c} at={-9} h={110} c={EU} />)}</Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ INTRO ═════════════ */
const LET = 'DDRSEESGCSRDISOESRSDDRSEISO'.split('');
const Soupe: React.FC = () => {
  const t = useT();
  return (
    <Out end={12.4}>
      <Center y={330}><Kin text="La soupe à l’alphabet" at={6.0} size={64} color={ORANGE} /></Center>
      <Abs x={140} y={520} w={800} h={560}>
        <div style={{position: 'absolute', left: 0, top: 120, width: 800, height: 440, borderRadius: '0 0 400px 400px', background: 'linear-gradient(180deg, #fff, #E9EEF5)', boxShadow: '0 30px 60px rgba(20,33,61,0.25), inset 0 -20px 40px rgba(20,33,61,0.08)', opacity: pop(t, 3.0)}} />
        <div style={{position: 'absolute', left: 30, top: 100, width: 740, height: 80, borderRadius: '50%', background: '#F6E2B6', border: '10px solid #fff', boxSizing: 'border-box', opacity: pop(t, 3.0)}} />
        {LET.map((ch, i) => {
          const a = t * (1.2 + (i % 3) * 0.3) + i * 0.8;
          const r = 80 + (i % 5) * 60;
          const x = 400 + Math.cos(a) * r - 40;
          const y = 140 + Math.sin(a) * r * 0.18 - 50 - (t < 7.8 ? 0 : 0);
          return <div key={i} style={{position: 'absolute', left: x, top: y, transform: `rotate(${a * 50}deg) scale(${pop(t, 3.2 + i * 0.05) * (0.7 + 0.3 * Math.sin(a) ** 2)})`, zIndex: Math.sin(a) > 0 ? 2 : 0}}><Tile ch={ch} size={80} c={[GREEN, BLUE, EU, VIO, ORANGE][i % 5]} /></div>;
        })}
        {Array.from({length: 6}, (_, k) => <div key={k} style={{position: 'absolute', left: 200 + k * 80, top: 60 - ((t * 60 + k * 40) % 120), width: 20, height: 40, borderRadius: 10, background: '#ffffff', opacity: 0.5 * (1 - ((t * 60 + k * 40) % 120) / 120), filter: 'blur(6px)'}} />)}
      </Abs>
      <Abs x={0} y={1130} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}>
        <Pill at={1.7} c={GREEN} size={30}>DD</Pill><Pill at={1.9} c={BLUE} size={30}>RSE</Pill><Pill at={2.2} c={EU} size={30}>ESG</Pill><Pill at={2.6} c={VIO} size={30}>CSRD</Pill><Pill at={3.7} c={ORANGE} size={30}>ISO</Pill>
      </Abs>
      <Stamp at={7.8} c={GREEN} text="Pas de panique" x={250} y={1250} rot={-6} size={60} />
    </Out>
  );
};
/** Le tri puis l'emboîtement, en poupées gigognes (mise en abyme). */
const Tri: React.FC = () => {
  const t = useT();
  const rows = [{w: 'DD', c: GREEN, a: 12.5}, {w: 'RSE', c: BLUE, a: 13.0}, {w: 'CSRD', c: EU, a: 13.5}, {w: 'ESG', c: TEAL, a: 14.0}];
  const nest = prog(t, 18.2, 19.6, easeInOut);
  const z = 1 + Math.max(0, t - 19.8) * 0.08;
  return (
    <Out end={21.7}>
      <Center y={330}><Kin text="Faire le tri" at={11.1} size={66} /></Center>
      {nest < 1 && rows.map((r, k) => (
        <Abs key={k} x={0} y={460 + k * 170} w={1080} style={{opacity: 1 - nest}}><Word text={r.w} at={r.a} size={130} c={r.c} variant={k % 3} /></Abs>
      ))}
      {nest > 0 && (
        <Abs x={0} y={420} w={1080} h={900} style={{opacity: nest, transform: `scale(${z})`}}>
          {rows.map((r, k) => {
            const W = 960 - k * 200, H = 860 - k * 190;
            const p = Math.min(1, spring(t, 18.2 + k * 0.25, 8, 13));
            return (
              <div key={k} style={{position: 'absolute', left: (1080 - W) / 2, top: (900 - H) / 2 + k * 30, width: W, height: H, borderRadius: 40 - k * 6, border: `8px solid ${r.c}`, background: `${r.c}10`, transform: `scale(${Math.max(0, p)})`}}>
                <div style={{position: 'absolute', left: 24, top: 14, fontFamily: sansFont, fontWeight: 900, fontSize: 52 - k * 4, color: r.c}}>{r.w}</div>
              </div>
            );
          })}
          <div style={{position: 'absolute', left: 0, right: 0, top: 520, textAlign: 'center', opacity: pop(t, 19.9)}}><F n="planete" size={140} float={6} /></div>
        </Abs>
      )}
      <Center y={1340}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: GREEN, opacity: pop(t, 19.9)}}>…pour façonner l’économie de demain</div></Center>
    </Out>
  );
};
const TeteFroide: React.FC = () => {
  const t = useT();
  return (
    <Out end={25.0}>
      <Abs x={0} y={520} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 80, alignItems: 'center'}}>
        <div style={{textAlign: 'center', opacity: pop(t, 21.8)}}><F n="froid" size={220} float={8} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: BLUE, marginTop: 12}}>tête froide</div></div>
        <div style={{textAlign: 'center', opacity: pop(t, 22.9)}}><div style={{transform: `rotate(${Math.sin(t * 3) * 12}deg)`}}><F n="loupe" size={220} /></div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: ORANGE, marginTop: 12}}>on décortique</div></div>
      </Abs>
    </Out>
  );
};
const Programme: React.FC = () => {
  const t = useT();
  const items = [{a: 27.4}, {a: 30.9}, {a: 35.0}, {a: 39.5}];
  const fill = items.filter((x) => t >= x.a).length;
  const go = prog(t, 42.7, 43.6, easeIn);
  return (
    <Out end={43.5}>
      <Center y={320}><Kin text="Au programme" at={25.1} size={64} /></Center>
      <Abs x={170} y={450} w={100} h={900}>
        <div style={{position: 'absolute', left: 38, top: 20, width: 24, height: 780, borderRadius: 12, background: '#DDE3EC'}} />
        <div style={{position: 'absolute', left: 38, top: 20, width: 24, height: Math.max(0, (fill - 1) / 3) * 780, borderRadius: 12, background: `linear-gradient(180deg, ${PARTS.map((p) => p.c).join(', ')})`}} />
        <div style={{position: 'absolute', left: 14, top: 20 + lerp(0, 780, Math.max(0, (fill - 1) / 3)) - 60 - go * 900, width: 72, height: 110, borderRadius: 18, background: INK, boxShadow: '0 10px 20px rgba(20,33,61,0.3)', opacity: pop(t, 27.4), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly'}}>
          {[0, 1, 2].map((k) => <div key={k} style={{width: 40, height: 18, borderRadius: 4, background: GOLD}} />)}
        </div>
      </Abs>
      {PARTS.map((p, k) => {
        const on = t >= items[k].a;
        return (
          <Abs key={k} x={180} y={450 + k * 260} w={860} style={{display: 'flex', alignItems: 'center', gap: 30}}>
            <div style={{width: 80, height: 80, borderRadius: 40, background: on ? p.c : '#fff', border: `8px solid ${p.c}`, boxSizing: 'border-box', transform: `scale(${on ? 1 + 0.2 * Math.max(0, 1 - (t - items[k].a) * 3) : 0.9})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: on ? '#fff' : p.c}}>{p.n}</div>
            <div>
              <div style={{display: 'flex', gap: 5, marginBottom: 8, opacity: on ? 1 : 0.3}}>{p.code.split('').map((ch, i) => <Tile key={i} ch={ch} size={48} c={p.c} />)}</div>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: on ? INK : '#C3CAD6'}}>{p.title}</div>
            </div>
          </Abs>
        );
      })}
      <Abs x={0} y={1440} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Pill at={42.7} c={GREEN} size={40}>C’est parti !</Pill></Abs>
    </Out>
  );
};

/* ═════════════ PARTIE 1 — Fondements ═════════════ */
const Brundtland: React.FC = () => {
  const t = useT();
  const bal = prog(t, 69.9, 71.5, easeInOut);
  const tilt = lerp(-14, 10, bal);
  return (
    <Out end={79.0}>
      <Center y={320}><Kin text="Une définition historique" at={47.6} size={56} color={GREEN} /></Center>
      <Abs x={0} y={420} w={1080}><Board text="1987" at={53.5} h={170} gap={10} c={GREEN} n={10} /></Abs>
      <Card x={70} y={640} w={940} at={55.5} c={GREEN}>
        <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
          <F n="parchemin" size={90} />
          <div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK}}>Gro Harlem Brundtland</div>
            <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 28, color: DIM}}>alors Première ministre de Norvège</div>
          </div>
        </div>
        <div style={{fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 32, color: INK, marginTop: 18, lineHeight: 1.35, opacity: pop(t, 59.0)}}>« Un développement qui répond aux besoins du présent sans compromettre la capacité des générations futures de répondre aux leurs. »</div>
        <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 22, color: DIM, marginTop: 8, opacity: pop(t, 59.0)}}>définition du rapport Brundtland (1987)</div>
      </Card>
      {t > 65 && <Stamp at={65.2} c={ORANGE} text="changement de paradigme" x={140} y={600} rot={-5} size={40} />}
      {t > 67.4 && (
        <Abs x={60} y={1080} w={960} h={300} style={{opacity: pop(t, 67.4)}}>
          <div style={{position: 'absolute', left: 470, top: 110, width: 20, height: 180, background: DIM, borderRadius: 10}} />
          <div style={{position: 'absolute', left: 80, top: 100, width: 800, height: 14, background: INK, borderRadius: 7, transform: `rotate(${tilt}deg)`}}>
            <div style={{position: 'absolute', left: -60, top: -130, width: 220, height: 130, borderRadius: 16, overflow: 'hidden', border: '5px solid #fff', boxShadow: '0 10px 20px rgba(0,0,0,0.2)', transform: `rotate(${-tilt}deg)`}}><Img src={PH('smi/fumees.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.6)'}} /><div style={{position: 'absolute', left: 0, right: 0, bottom: 0, background: 'rgba(20,33,61,0.75)', color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: 20, textAlign: 'center', padding: 4}}>court terme</div></div>
            <div style={{position: 'absolute', right: -60, top: -130, width: 220, height: 130, borderRadius: 16, overflow: 'hidden', border: '5px solid #fff', boxShadow: '0 10px 20px rgba(0,0,0,0.2)', transform: `rotate(${-tilt}deg)`}}><Img src={PH('induction/operatrice.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 25%'}} /><div style={{position: 'absolute', left: 0, right: 0, bottom: 0, background: `${GREEN}DD`, color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: 20, textAlign: 'center', padding: 4}}>générations futures</div></div>
          </div>
        </Abs>
      )}
      {t > 76.2 && <Abs x={0} y={1320} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 6}}>{Array.from({length: 7}, (_, k) => <div key={k} style={{width: 120, height: 50, borderRadius: 6, background: 'linear-gradient(180deg, #D98C5F, #B5653B)', transform: `translateY(${(1 - Math.min(1, spring(t, 76.3 + k * 0.06, 9, 14))) * -300}px)`}} />)}</Abs>}
    </Out>
  );
};
const Rio: React.FC = () => {
  const t = useT();
  const pil = [{l: 'Économie', a: 93.2, c: BLUE, ic: 'argent'}, {l: 'Écologie', a: 93.9, c: GREEN, ic: 'pousse'}, {l: 'Social', a: 94.6, c: ORANGE, ic: 'equipe'}];
  return (
    <Out end={95.5}>
      <Center y={320}><Kin text="Le Sommet de la Terre" at={87.5} size={58} color={GREEN} /></Center>
      {t < 91.4 && <Blinds src="durab/planete-odd.jpg" x={60} y={600} w={960} h={540} at={87.6} pos="50% 50%" />}
      <Abs x={0} y={420} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 30}}>
        <Board text="1992" at={86.2} h={140} gap={8} c={GREEN} n={10} />
      </Abs>
      <Abs x={0} y={1170} w={1080} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 34, color: DIM, opacity: pop(t, 88.7) * (1 - prog(t, 91.0, 91.4))}}>Rio · organisé par l’ONU</Abs>
      <Abs x={140} y={700} w={800} h={110} style={{clipPath: 'polygon(50% 0, 100% 100%, 0 100%)', background: INK, opacity: pop(t, 91.5)}} />
      <Abs x={140} y={760} w={800} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: '#fff', opacity: pop(t, 91.7)}}>3 piliers indissociables</Abs>
      <Abs x={170} y={820} w={740} h={460} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
        {pil.map((p, k) => {
          const h = 420 * Math.min(1, spring(t, p.a, 7, 12));
          return (
            <div key={k} style={{width: 200, height: Math.max(0, h), background: `linear-gradient(90deg, ${p.c}CC, ${p.c}, ${p.c}CC)`, borderRadius: '10px 10px 0 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 20, overflow: 'hidden', boxShadow: '0 14px 30px rgba(20,33,61,0.2)'}}>
              <F n={p.ic} size={90} />
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: '#fff', marginTop: 12}}>{p.l}</div>
            </div>
          );
        })}
      </Abs>
      <Abs x={120} y={1280} w={840} h={30} style={{background: INK, borderRadius: 8, opacity: pop(t, 91.5)}} />
    </Out>
  );
};
const TroisP: React.FC = () => {
  const t = useT();
  const conv = prog(t, 104.7, 108.8, easeInOut);
  const C = [{l: 'Profit', s: 'rentabilité financière', c: BLUE, a: 102.3, ang: -Math.PI / 2, sa: 104.8}, {l: 'Planet', s: 'protection de la planète', c: GREEN, a: 102.9, ang: Math.PI / 6, sa: 106.4}, {l: 'People', s: 'respect de l’humain', c: ORANGE, a: 103.4, ang: (5 * Math.PI) / 6, sa: 107.5}];
  const R = lerp(260, 130, conv);
  return (
    <Out end={110.6}>
      <Center y={320}><Kin text="Les fameux 3P" at={101.0} size={64} /></Center>
      <Abs x={0} y={420} w={1080} h={900}>
        {C.map((c, k) => {
          const x = 540 + Math.cos(c.ang) * R;
          const y = 440 + Math.sin(c.ang) * R;
          const p = Math.min(1, spring(t, c.a, 8, 13));
          return (
            <div key={k} style={{position: 'absolute', left: x - 210, top: y - 210, width: 420, height: 420, borderRadius: 210, background: `${c.c}44`, border: `6px solid ${c.c}`, transform: `scale(${Math.max(0, p)})`, mixBlendMode: 'multiply', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: c.c, transform: `translate(${Math.cos(c.ang) * 70}px, ${Math.sin(c.ang) * 70}px)`}}>{c.l}</div>
              <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 22, color: INK, opacity: pop(t, c.sa), transform: `translate(${Math.cos(c.ang) * 70}px, ${Math.sin(c.ang) * 70}px)`, width: 200, textAlign: 'center'}}>{c.s}</div>
            </div>
          );
        })}
        {t > 108.4 && (
          <div style={{position: 'absolute', left: 540 - 110, top: 440 - 110, width: 220, height: 220, borderRadius: 110, overflow: 'hidden', border: '6px solid #fff', boxShadow: `0 0 ${30 + 20 * Math.sin(t * 4)}px ${GOLD}`, transform: `scale(${Math.min(1, spring(t, 108.4, 7, 12))}) rotate(${(t - 108.4) * 10}deg)`}}>
            <Img src={PH('durab/planete-odd.jpg')} style={{position: 'absolute', left: -150, top: -40, width: 520, height: 292}} />
          </div>
        )}
        {t > 108.6 && <div style={{position: 'absolute', left: 0, right: 0, top: 690, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK, opacity: pop(t, 108.7)}}>en totale harmonie</div>}
      </Abs>
      {t > 108.5 && <Dust n={16} />}
    </Out>
  );
};

/* ═════════════ PARTIE 2 — RSE ═════════════ */
const RseDef: React.FC = () => {
  const t = useT();
  const cross = prog(t, 126.3, 126.9, easeOut);
  return (
    <Out end={127.8}>
      <Center y={330}><Kin text="Un acronyme qu’on entend tous les jours" at={115.9} size={46} /></Center>
      <Abs x={0} y={460} w={1080}><Word text="RSE" at={119.6} size={220} c={BLUE} variant={0} /></Abs>
      <Center y={760}>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: INK, opacity: pop(t, 120.2)}}>
          <span style={{color: '#fff', background: BLUE, borderRadius: 10, padding: '0 10px'}}>R</span>esponsabilité <span style={{color: '#fff', background: BLUE, borderRadius: 10, padding: '0 10px'}}>S</span>ociétale<br />de l’<span style={{color: '#fff', background: BLUE, borderRadius: 10, padding: '0 10px'}}>E</span>ntreprise
        </div>
      </Center>
      <Abs x={290} y={1040} w={500} h={160} style={{opacity: pop(t, 124.4), display: 'flex', alignItems: 'center', gap: 20, padding: '0 26px', background: '#fff', borderRadius: 22, boxShadow: '0 10px 24px rgba(20,33,61,0.12)'}}>
        <div style={{width: 60, height: 60, borderRadius: 10, border: `5px solid ${DIM}`}} />
        <div style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: DIM}}>option « pour faire joli »<div style={{position: 'absolute', left: -10, right: -10, top: '50%', height: 8, background: RED, transform: `scaleX(${cross})`, transformOrigin: '0 50%'}} /></div>
      </Abs>
    </Out>
  );
};
const RseCoeur: React.FC = () => {
  const t = useT();
  const st = [{l: 'clients', a: 135.9, ic: 'pouce'}, {l: 'fournisseurs', a: 136.6, ic: 'camion'}, {l: 'salariés', a: 137.3, ic: 'equipe'}];
  const ping = t > 138.2 ? ((t - 138.2) % 1.2) / 1.2 : 0;
  const shocks = t > 143.6;
  return (
    <Out end={145.8}>
      <Center y={320}><Kin text="Au cœur de la stratégie" at={132.6} size={58} color={BLUE} /></Center>
      <Abs x={0} y={420} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}>
        <Pill at={129.9} c={BLUE} size={28}>économique</Pill><Pill at={131.0} c={GREEN} size={28}>environnemental</Pill><Pill at={132.0} c={ORANGE} size={28}>social</Pill>
      </Abs>
      <Abs x={290} y={560} w={500} h={500}>
        {[0, 1, 2].map((k) => <div key={k} style={{position: 'absolute', inset: k * 60, borderRadius: '50%', border: `4px dashed ${[BLUE, GREEN, ORANGE][k]}66`, transform: `rotate(${t * (k % 2 ? -10 : 10)}deg)`}} />)}
        <Deep src="iso26/direction-equipe.jpg" x={130} y={130} w={240} h={240} at={128.0} round={120} />
        {ping > 0 && <div style={{position: 'absolute', left: 250 - ping * 300, top: 250 - ping * 300, width: ping * 600, height: ping * 600, borderRadius: '50%', border: `6px solid ${RED}`, opacity: 1 - ping}} />}
        {shocks && <div style={{position: 'absolute', inset: -40, borderRadius: '50%', border: `14px solid ${BLUE}`, boxShadow: `0 0 40px ${BLUE}88`, opacity: pop(t, 143.6) * (0.7 + 0.3 * Math.sin(t * 8))}} />}
      </Abs>
      {st.map((s0, k) => {
        const ang = -Math.PI / 2 + (k / 3) * Math.PI * 2 + t * 0.25;
        return (
          <Abs key={k} x={540 + Math.cos(ang) * 330 - 90} y={810 + Math.sin(ang) * 330 - 80} w={180} style={{textAlign: 'center', opacity: pop(t, s0.a)}}>
            <div style={{width: 110, height: 110, margin: '0 auto', borderRadius: 55, background: '#fff', boxShadow: '0 10px 20px rgba(20,33,61,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={s0.ic} size={70} /></div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK}}>{s0.l}</div>
          </Abs>
        );
      })}
      {shocks && [0, 1, 2].map((k) => {
        const p = ((t - 143.6) * 1.4 + k * 0.33) % 1;
        return <div key={k} style={{position: 'absolute', left: lerp(-100, 220, p), top: 760 + k * 60, width: 80, height: 16, borderRadius: 8, background: RED, opacity: 1 - p, transform: `rotate(${k * 10 - 10}deg)`}} />;
      })}
      <Abs x={0} y={1230} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}>
        <Pill at={138.2} c={RED} size={30}>risques identifiés</Pill><Pill at={142.4} c={BLUE} size={30}>organisation résiliente</Pill>
      </Abs>
    </Out>
  );
};
const DejaRse: React.FC = () => {
  const t = useT();
  const mount = 1 - prog(t, 154.4, 155.8, easeInOut) * 0.75;
  const P = [{ph: 'verites/groupe.jpg', l: 'formation', a: 157.2}, {ph: 'epiepc/kit-epi.jpg', l: 'sécurité', a: 157.6}, {ph: 'causerie/groupe.jpg', l: 'dialogue', a: 158.0}];
  return (
    <Out end={171.4}>
      <Center y={320}><Kin text="Plutôt rassurant !" at={146.7} size={62} color={GREEN} /></Center>
      {t < 157 && (
        <Abs x={0} y={460} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 40, opacity: 1 - prog(t, 156.4, 157)}}>
          <div style={{transform: `scale(${mount})`, transformOrigin: 'bottom', opacity: pop(t, 150.9)}}><F n="montagne" size={420} /></div>
          <div style={{opacity: pop(t, 152.8), display: 'flex', flexDirection: 'column', alignItems: 'center'}}><F n="argent" size={150} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: RED}}>une fortune ?</div></div>
        </Abs>
      )}
      {t >= 157 && P.map((p, k) => (
        <Blinds key={k} src={p.ph} x={60 + k * 330} y={460} w={300} h={420} at={p.a} n={8}>
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, padding: 10, background: 'linear-gradient(0deg, rgba(20,33,61,0.85), transparent)', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: '#fff', textAlign: 'center'}}>{p.l}</div>
          {t > 160.2 + k * 0.25 && <div style={{position: 'absolute', right: 10, top: 10, padding: '6px 14px', borderRadius: 10, background: BLUE, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 26, transform: `rotate(8deg) scale(${lerp(2, 1, prog(t, 160.2 + k * 0.25, 160.45 + k * 0.25))})`}}>RSE</div>}
        </Blinds>
      ))}
      {t > 157 && <Center y={910}><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 34, color: INK, opacity: pop(t, 158.7)}}>des actions RSE… sans l’étiquette officielle</div></Center>}
      <Abs x={0} y={1010} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16}}>
        <Pill at={164.8} c={TEAL} size={30}>repérer</Pill><div style={{fontWeight: 900, fontSize: 40, opacity: pop(t, 166.6)}}>→</div><Pill at={166.8} c={BLUE} size={30}>structurer</Pill><div style={{fontWeight: 900, fontSize: 40, opacity: pop(t, 168.9)}}>→</div><Pill at={169.1} c={GOLD} size={30}>avantage compétitif</Pill>
      </Abs>
      {t > 169.1 && <Abs x={430} y={1110} style={{transform: `scale(${Math.min(1, spring(t, 169.2, 8, 12))})`}}><F n="trophee" size={200} /></Abs>}
    </Out>
  );
};

/* ═════════════ PARTIE 3 — CSRD & ESG ═════════════ */
const Csrd: React.FC = () => {
  const t = useT();
  return (
    <Out end={196.0}>
      <Center y={320}><Kin text="Le vrai game changer" at={183.6} size={58} color={EU} /></Center>
      <Abs x={240} y={420} w={600} h={600}>
        {Array.from({length: 12}, (_, k) => {
          const a = (k / 12) * Math.PI * 2 - Math.PI / 2;
          const p = Math.min(1, spring(t, 185.2 + k * 0.08, 9, 13));
          return <div key={k} style={{position: 'absolute', left: 300 + Math.cos(a) * 250 * Math.max(0, p) - 26, top: 300 + Math.sin(a) * 250 * Math.max(0, p) - 26, width: 52, height: 52, color: GOLD, fontSize: 52, lineHeight: '52px', textAlign: 'center', opacity: t > 185.2 + k * 0.08 ? 1 : 0}}>★</div>;
        })}
        <div style={{position: 'absolute', left: 0, right: 0, top: 230}}><Board text="CSRD" at={186.3} h={130} gap={8} c={EU} n={9} /></div>
      </Abs>
      <Abs x={0} y={1030} w={1080} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: EU, opacity: pop(t, 185.4)}}>la directive européenne</Abs>
      <Abs x={0} y={1110} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20}}>
        <div style={{opacity: pop(t, 188.9)}}><F n="calendrier" size={100} /></div>
        <div style={{display: 'flex', gap: 4}}>{'DEC 2022'.split('').map((ch, i) => (ch === ' ' ? <div key={i} style={{width: 20}} /> : <Flap key={i} ch={ch} at={189.0 + i * 0.05} h={90} c={EU} />))}</div>
      </Abs>
      <Abs x={0} y={1260} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Pill at={192.1} c={EU} size={32}>reporting extra-financier musclé</Pill></Abs>
    </Out>
  );
};
const Transparence: React.FC = () => {
  const t = useT();
  const glass = prog(t, 201.9, 203.2, easeInOut);
  const cross = prog(t, 199.9, 200.5, easeOut);
  return (
    <Out end={213.3}>
      <Abs x={0} y={330} w={1080} style={{display: 'flex', justifyContent: 'center'}}>
        <div style={{position: 'relative', opacity: pop(t, 196.1)}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: DIM}}>bureaucratie & paperasse</div><div style={{position: 'absolute', left: -10, right: -10, top: '50%', height: 10, background: RED, transform: `scaleX(${cross})`, transformOrigin: '0 50%', borderRadius: 5}} /></div>
      </Abs>
      <Deep src="arsenal/veille-juridique.jpg" x={60} y={440} w={960} h={520} at={196.2}>
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(255,255,255,0.75), rgba(220,235,255,0.45) 40%, rgba(255,255,255,0.7))', transform: `translateX(${glass * 1000}px)`, borderRight: '6px solid #fff'}}>
          <div style={{position: 'absolute', left: 50, top: 200, fontFamily: sansFont, fontWeight: 900, fontSize: 60, color: EU}}>opacité ?</div>
        </div>
      </Deep>
      <Abs x={0} y={990} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Pill at={202.0} c={EU} size={36}>transparence totale, long terme</Pill></Abs>
      {t > 204.8 && (
        <Abs x={60} y={1100} w={960} h={240} style={{opacity: pop(t, 204.9)}}>
          <div style={{position: 'absolute', left: 0, top: 40, textAlign: 'center', width: 220}}><F n="graphique" size={110} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26}}>investisseurs</div></div>
          <div style={{position: 'absolute', right: 0, top: 40, textAlign: 'center', width: 220, opacity: pop(t, 210.8)}}><F n="pousse" size={110} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: GREEN}}>modèles durables</div></div>
          {Array.from({length: 6}, (_, k) => {
            const p = ((t - 208.6) * 0.8 + k / 6) % 1;
            return t > 208.6 ? <div key={k} style={{position: 'absolute', left: lerp(220, 680, p), top: 80 - Math.sin(p * Math.PI) * 60, opacity: Math.sin(p * Math.PI)}}><F n="argent" size={60} /></div> : null;
          })}
          <div style={{position: 'absolute', left: 260, top: 200, width: 440, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 24, color: DIM, opacity: pop(t, 206.0)}}>données ultra fiables → capitaux fléchés</div>
        </Abs>
      )}
    </Out>
  );
};
const Calendrier: React.FC = () => {
  const t = useT();
  const pts = [{l: 'Déc. 2022', s: 'publication', a: 215.2, x: 140}, {l: 'Aujourd’hui', s: 'grandes entreprises cotées', a: 219.8, x: 540}, {l: '2026', s: 'entreprises plus modestes', a: 227.8, x: 940}];
  const wave = t > 225.7 ? (t - 225.7) : 0;
  return (
    <Out end={236.5}>
      <Center y={320}><Kin text="Le calendrier" at={215.2} size={62} color={EU} /></Center>
      <Abs x={100} y={520} w={880} h={10} style={{background: '#DDE3EC', borderRadius: 5}} />
      <Abs x={100} y={520} w={880 * prog(t, 215.2, 228.4, easeInOut)} h={10} style={{background: EU, borderRadius: 5}} />
      {pts.map((p, k) => (
        <Abs key={k} x={p.x - 140} y={470} w={280} style={{textAlign: 'center', opacity: pop(t, p.a)}}>
          <div style={{width: 110, height: 110, margin: '0 auto', borderRadius: 55, background: t > p.a ? EU : '#fff', border: `6px solid ${EU}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={k === 0 ? 'calendrier' : k === 1 ? 'usine' : 'maison'} size={64} /></div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: EU, marginTop: 12}}>{p.l}</div>
          <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 24, color: DIM}}>{p.s}</div>
        </Abs>
      ))}
      <Abs x={0} y={820} w={1080} h={520} style={{overflow: 'hidden'}}>
        <div style={{position: 'absolute', left: 540 - 70, top: 200, opacity: pop(t, 219.8)}}><F n="usine" size={140} /></div>
        {wave > 0 && [0, 1, 2, 3].map((k) => {
          const r = ((wave * 220 + k * 140) % 560);
          return <div key={k} style={{position: 'absolute', left: 540 - r, top: 270 - r, width: r * 2, height: r * 2, borderRadius: '50%', border: `6px solid ${EU}`, opacity: 1 - r / 560}} />;
        })}
        {Array.from({length: 10}, (_, k) => {
          const a = (k / 10) * Math.PI * 2;
          const d = 330;
          const hit = wave * 220 > d - 60;
          return <div key={k} style={{position: 'absolute', left: 540 + Math.cos(a) * d - 35, top: 270 + Math.sin(a) * d * 0.55 - 35, opacity: pop(t, 226.0 + k * 0.05), transform: `scale(${hit ? 1.15 : 0.9})`, filter: hit ? 'none' : 'grayscale(1)'}}><F n="batiment" size={70} /></div>;
        })}
      </Abs>
      <Cite y={1350} at={227.8} text="échéances citées dans la vidéo d’origine" />
      <Stamp at={234.7} c={EU} text="personne n'y échappera" x={170} y={1180} rot={-4} size={44} />
    </Out>
  );
};
const Esg: React.FC = () => {
  const t = useT();
  const L = [{ch: 'E', w: 'Environnement', a: 242.4, c: GREEN}, {ch: 'S', w: 'Social', a: 243.7, c: ORANGE}, {ch: 'G', w: 'Gouvernance', a: 244.2, c: EU}];
  const eq = prog(t, 261.4, 264.6, easeInOut);
  return (
    <Out end={267.0}>
      <Abs x={0} y={320} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 40}}>
        {L.map((l, k) => (
          <div key={k} style={{textAlign: 'center'}}>
            <Word text={l.ch} at={l.a - 0.3} size={190} c={l.c} variant={k} />
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: l.c, marginTop: 16, opacity: pop(t, l.a)}}>{l.w}</div>
          </div>
        ))}
      </Abs>
      {t > 248 && t < 256 && (
        <Abs x={60} y={680} w={960} h={420} style={{opacity: pop(t, 248.4) * (1 - prog(t, 255.4, 256))}}>
          {[0, 1, 2].map((k) => (
            <div key={k} style={{position: 'absolute', left: 60 + k * 300, top: 120, width: 200, height: 240, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <F n={['usine', 'batiment', 'usine2'][k]} size={140} />
            </div>
          ))}
          <div style={{position: 'absolute', left: 0, top: 30, width: 960, height: 60, borderRadius: 12, background: GOLD, backgroundImage: `repeating-linear-gradient(90deg, transparent 0 46px, ${INK} 46px 49px)`, transform: `translateY(${(1 - pop(t, 249.4)) * -200}px)`, boxShadow: '0 10px 20px rgba(0,0,0,0.2)'}} />
          <div style={{position: 'absolute', left: 0, right: 0, top: 330, textAlign: 'center'}}><Pill at={251.7} c={EU} size={34}>ESRS · la même règle du jeu</Pill></div>
        </Abs>
      )}
      {t > 255.5 && (
        <Abs x={60} y={700} w={960} h={520} style={{opacity: pop(t, 255.6)}}>
          <div style={{position: 'absolute', left: 0, right: 0, top: 0, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: INK}}>dans le rapport de gestion</div>
          <div style={{position: 'absolute', left: 470, top: 200, width: 20, height: 260, background: DIM, borderRadius: 10}} />
          <div style={{position: 'absolute', left: 80, top: 190, width: 800, height: 16, background: INK, borderRadius: 8, transform: `rotate(${lerp(-12, 0, eq)}deg)`}}>
            <div style={{position: 'absolute', left: -40, top: -120, width: 240, height: 110, borderRadius: 18, background: BLUE, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', transform: `rotate(${lerp(12, 0, eq)}deg)`}}>info financière</div>
            <div style={{position: 'absolute', right: -40, top: -120, width: 240, height: 110, borderRadius: 18, background: GREEN, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', transform: `rotate(${lerp(12, 0, eq)}deg)`}}>info extra-financière</div>
          </div>
          <div style={{position: 'absolute', left: 0, right: 0, top: 300, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 80, color: GOLD, opacity: pop(t, 264.0)}}>=</div>
        </Abs>
      )}
      <Stamp at={265.8} c={RED} text="c'est énorme !" x={330} y={1250} rot={-6} size={50} />
    </Out>
  );
};

/* ═════════════ PARTIE 4 — Écosystème & ISO 26000 ═════════════ */
const Tiroirs: React.FC = () => {
  const t = useT();
  const D = [{n: 1, l: 'Normes certifiables', ex: 'ISO 50001 · énergie', a: 284.7, c: BLUE}, {n: 2, l: 'Référentiels de bonnes pratiques', ex: 'ISO 26000', a: 289.4, c: GREEN}, {n: 3, l: 'Labels RSE', ex: 'EcoVadis', a: 293.9, c: ORANGE}, {n: 4, l: 'Modèles d’excellence', ex: 'EFQM', a: 298.3, c: VIO}];
  const jungle = 1 - prog(t, 279.4, 281.6, easeInOut);
  return (
    <Out end={303.4}>
      <Center y={320}><Kin text="Une jungle ? Non : 4 familles" at={272.8} size={52} color={VIO} /></Center>
      {jungle > 0 && (
        <Abs x={0} y={420} w={1080} h={900} style={{opacity: jungle}}>
          <svg width={1080} height={900}>{Array.from({length: 12}, (_, k) => <path key={k} d={`M${random(`j${k}`) * 1080} 0 C ${random(`k${k}`) * 1080} 300, ${random(`l${k}`) * 1080} 600, ${random(`m${k}`) * 1080} 900`} stroke={GREEN} strokeWidth={10 + (k % 3) * 6} fill="none" opacity={0.5} />)}</svg>
          {Array.from({length: 14}, (_, k) => <div key={k} style={{position: 'absolute', left: random(`jx${k}`) * 980, top: random(`jy${k}`) * 800, transform: `rotate(${(random(`jr${k}`) - 0.5) * 60 + Math.sin(t * 2 + k) * 8}deg)`}}><F n={['feuille', 'herbe', 'arbre', 'question'][k % 4]} size={80} /></div>)}
        </Abs>
      )}
      {D.map((d, k) => {
        const open = prog(t, d.a, d.a + 0.5, easeOut) * (1 - prog(t, d.a + 3.6, d.a + 4.0, easeIn) * 0.8);
        return (
          <Abs key={k} x={110} y={440 + k * 215} w={860} h={195} style={{opacity: 1 - jungle}}>
            <div style={{position: 'absolute', inset: 0, borderRadius: 18, background: 'linear-gradient(180deg, #C9CFD9, #A8B1C0)', boxShadow: 'inset 0 6px 14px rgba(0,0,0,0.25)'}} />
            <div style={{position: 'absolute', left: 20, right: 20, top: 14, height: 167, borderRadius: 14, background: '#fff', transform: `translateX(${open * 0}px) translateY(${-open * 0}px) scale(${1 + open * 0.04})`, boxShadow: `0 ${8 + open * 20}px ${20 + open * 20}px rgba(20,33,61,${0.15 + open * 0.15})`, borderLeft: `14px solid ${d.c}`, display: 'flex', alignItems: 'center', gap: 22, padding: '0 22px'}}>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: d.c, width: 60}}>{d.n}</div>
              <div style={{flex: 1}}>
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: INK}}>{d.l}</div>
                <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: d.c, opacity: pop(t, d.a + 0.6)}}>ex. {d.ex}</div>
              </div>
              <div style={{width: 120, height: 40, borderRadius: 20, background: '#8D96A6', boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.3)'}} />
            </div>
          </Abs>
        );
      })}
      <Center y={1330}><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 32, color: INK, opacity: pop(t, 301.0)}}>chaque outil a un rôle précis</div></Center>
    </Out>
  );
};
const Iso26: React.FC = () => {
  const t = useT();
  const key = Math.min(1, spring(t, 305.9, 7, 12));
  const cross = prog(t, 310.3, 310.9, easeOut);
  const sizes = [{l: 'multinationale', a: 316.8, s: 130, ic: 'usine2'}, {l: 'PME', a: 318.3, s: 105, ic: 'batiment'}, {l: 'association', a: 319.5, s: 85, ic: 'maison'}];
  return (
    <Out end={328.7}>
      <Center y={320}><Kin text="Zoom sur l’ISO 26000" at={303.5} size={58} color={VIO} /></Center>
      <Abs x={190} y={410} w={700} h={330}>
        <svg width={700} height={330} viewBox="0 0 700 330">
          {Array.from({length: 9}, (_, i) => {
            if (i === 4) return null;
            const a0 = Math.PI - (i / 9) * Math.PI, a1 = Math.PI - ((i + 1) / 9) * Math.PI;
            const R1 = 310, R0 = 210, cx = 350, cy = 330;
            const p = (r: number, a: number) => `${cx + Math.cos(a) * r},${cy - Math.sin(a) * r}`;
            return <polygon key={i} points={`${p(R0, a0)} ${p(R1, a0)} ${p(R1, a1)} ${p(R0, a1)}`} fill="#E6EAF1" stroke="#fff" strokeWidth={6} opacity={pop(t, 304.0 + i * 0.08)} />;
          })}
        </svg>
        <div style={{position: 'absolute', left: 350 - 70, top: 20 - (1 - key) * 400, width: 140, height: 108, background: VIO, clipPath: 'polygon(0 0, 100% 0, 80% 100%, 20% 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: t > 305.9 ? 1 : 0}}><span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 22, color: '#fff', marginTop: -10}}>26000</span></div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 240, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: VIO, opacity: pop(t, 306.0)}}>la pierre angulaire</div>
      </Abs>
      <Abs x={0} y={770} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 30}}>
        <div style={{position: 'relative', opacity: pop(t, 309.4)}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: DIM}}>cahier des charges punitif</div><div style={{position: 'absolute', left: -10, right: -10, top: '50%', height: 8, background: RED, transform: `scaleX(${cross})`, transformOrigin: '0 50%'}} /></div>
      </Abs>
      <Abs x={0} y={880} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 18, opacity: pop(t, 312.6)}}>
        <div style={{transform: `rotate(${Math.sin(t * 2) * 20}deg)`}}><F n="boussole" size={100} /></div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: VIO}}>des lignes directrices</div>
      </Abs>
      <Abs x={0} y={1030} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 60}}>
        {sizes.map((z, k) => <div key={k} style={{textAlign: 'center', opacity: pop(t, z.a), transform: `translateY(${(1 - pop(t, z.a)) * 40}px)`}}><F n={z.ic} size={z.s} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK}}>{z.l}</div></div>)}
      </Abs>
      <Abs x={0} y={1250} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}>
        <Pill at={324.0} c={VIO} size={30}>vos propres priorités</Pill><Pill at={327.1} c={GREEN} size={30} style={{transform: `scale(${Math.min(1, spring(t, 327.1, 6, 20))}) rotate(${Math.sin(t * 6) * 3}deg)`}}>hyper flexible</Pill>
      </Abs>
    </Out>
  );
};
const Benefices: React.FC = () => {
  const t = useT();
  const B = [{l: 'Risques systémiques en forte baisse', a: 333.3, ic: 'bouclier', c: BLUE}, {l: 'Dialogue social renforcé', a: 338.3, ic: 'bulle', c: ORANGE}, {l: 'Un aimant à talents', a: 345.5, ic: 'aimant', c: RED}, {l: 'Confiance du tissu local', a: 350.2, ic: 'equipe', c: GREEN}];
  return (
    <Out end={354.7}>
      <Center y={320}><Kin text="Ça rapporte gros" at={330.8} size={62} color={GOLD} /></Center>
      <Abs x={60} y={430} w={960} style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22}}>
        {B.map((b, k) => (
          <div key={k} style={{height: 380, borderRadius: 26, background: '#fff', boxShadow: '0 14px 30px rgba(20,33,61,0.15)', borderTop: `10px solid ${b.c}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 20, boxSizing: 'border-box', transform: `scale(${Math.min(1, spring(t, b.a, 8, 13))}) rotateY(${(1 - prog(t, b.a, b.a + 0.5)) * 90}deg)`}}>
            <div style={{transform: k === 2 ? `translateX(${Math.sin(t * 8) * 4}px)` : 'none'}}><F n={b.ic} size={120} /></div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: b.c, textAlign: 'center'}}>{b.l}</div>
          </div>
        ))}
      </Abs>
      {t > 345.5 && t < 350.2 && Array.from({length: 5}, (_, k) => {
        const p = ((t - 345.5) * 0.7 + k * 0.2) % 1;
        return <div key={k} style={{position: 'absolute', left: lerp(1080, 820, p), top: 1060 + k * 18, opacity: 1 - p}}><F n="salarie" size={50} /></div>;
      })}
    </Out>
  );
};

/* ═════════════ CONCLUSION ═════════════ */
const Levier: React.FC = () => {
  const t = useT();
  const wipe = prog(t, 363.6, 364.6, easeInOut);
  const L = [{x: 'paperasse', a: 359.9}, {x: 'corvée administrative', a: 361.3}, {x: 'simple conformité', a: 368.6}];
  const R = [{x: 'levier ultime', a: 371.6}, {x: 'performance', a: 373.9}, {x: 'croissance globale', a: 375.1}];
  const coin = prog(t, 377.3, 378.6, easeOut);
  return (
    <Out end={382.8}>
      <Center y={300}><Kin text="La vraie question" at={354.8} size={62} /></Center>
      <Abs x={30} y={410} w={500} h={760} style={{borderRadius: 28, background: '#EEF0F4', overflow: 'hidden', opacity: pop(t, 356.9)}}>
        <Img src={PH('docs5/dossiers.jpg')} style={{position: 'absolute', left: 0, top: 0, width: '100%', height: 260, objectFit: 'cover', filter: 'grayscale(1)'}} />
        <div style={{position: 'absolute', left: 0, right: 0, top: 230, textAlign: 'center'}}><span style={{padding: '8px 20px', borderRadius: 30, background: DIM, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 30}}>une corvée ?</span></div>
        <div style={{position: 'absolute', left: 20, right: 20, top: 320, display: 'flex', flexDirection: 'column', gap: 18}}>{L.map((x, k) => <div key={k} style={{fontFamily: sansFont, fontWeight: 800, fontSize: 34, color: DIM, opacity: pop(t, x.a)}}>✕ {x.x}</div>)}</div>
      </Abs>
      <Abs x={550} y={410} w={500} h={760} style={{borderRadius: 28, background: '#FFF6DB', overflow: 'hidden', clipPath: `inset(0 ${(1 - wipe) * 100}% 0 0 round 28px)`}}>
        <Img src={PH('iso26/analyste-kpi.jpg')} style={{position: 'absolute', left: 0, top: 0, width: '100%', height: 260, objectFit: 'cover'}} />
        <div style={{position: 'absolute', left: 0, right: 0, top: 230, textAlign: 'center'}}><span style={{padding: '8px 20px', borderRadius: 30, background: GOLD, color: INK, fontFamily: sansFont, fontWeight: 900, fontSize: 30}}>exactement l’inverse</span></div>
        <div style={{position: 'absolute', left: 20, right: 20, top: 320, display: 'flex', flexDirection: 'column', gap: 18}}>{R.map((x, k) => <div key={k} style={{fontFamily: sansFont, fontWeight: 800, fontSize: 34, color: '#B07D00', opacity: pop(t, x.a)}}>✓ {x.x}</div>)}</div>
      </Abs>
      {t > 377.2 && (
        <Abs x={0} y={1190} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20}}>
          <div style={{width: 130, height: 130, borderRadius: 65, background: `radial-gradient(circle at 35% 35%, #FFF2B0, ${GOLD} 55%, #B07D00)`, transform: `rotateY(${coin * 720}deg)`, boxShadow: '0 10px 24px rgba(176,125,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 50, color: '#8A5F00'}}>★</div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: '#B07D00'}}>une opportunité en or</div>
          <div style={{opacity: pop(t, 381.0)}}><F n="boussole" size={90} /></div>
        </Abs>
      )}
      {t > 377 && <Dust n={14} />}
    </Out>
  );
};
const Accompagner: React.FC = () => {
  const t = useT();
  return (
    <Out end={392.8}>
      <Center y={330}><Kin text="Personne n’est obligé de naviguer à vue" at={382.9} size={46} /></Center>
      <Card x={110} y={480} w={860} at={386.2} c={TEAL}>
        <div style={{display: 'flex', alignItems: 'center', gap: 22}}>
          <F n="boussole" size={110} />
          <div>
            <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 26, color: DIM}}>exemple cité par la source</div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 48, color: TEAL}}>cabinet Euro-Symbiose</div>
          </div>
        </div>
        <div style={{display: 'flex', gap: 14, marginTop: 24}}><Pill at={389.9} c={TEAL} size={30}>formation</Pill><Pill at={390.8} c={BLUE} size={30}>auto-évaluation</Pill></div>
      </Card>
      <Deep src="induction/briefing-atelier.jpg" x={160} y={860} w={760} h={440} at={386.6} />
    </Out>
  );
};
const Vision: React.FC = () => {
  const t = useT();
  const fork = prog(t, 399.0, 400.2, easeInOut);
  const door = prog(t, 405.6, 407.2, easeInOut);
  return (
    <Out end={OUTRO_AT}>
      <Center y={320}><Kin text="Une question de vision" at={393.9} size={60} color={GREEN} /></Center>
      {door < 1 && (
        <Abs x={0} y={420} w={1080} h={900} style={{opacity: 1 - door}}>
          <svg width={1080} height={900}>
            <path d="M540 880 L540 640 C540 520, 280 500, 250 330" fill="none" stroke="#DDE3EC" strokeWidth={70} strokeLinecap="round" strokeDasharray={800} strokeDashoffset={800 * (1 - fork)} />
            <path d="M540 640 C540 520, 800 500, 830 330" fill="none" stroke={`${GREEN}55`} strokeWidth={70} strokeLinecap="round" strokeDasharray={600} strokeDashoffset={600 * (1 - fork)} />
          </svg>
          <Abs x={70} y={60} w={360} style={{textAlign: 'center', opacity: pop(t, 399.9)}}>
            <div style={{display: 'flex', justifyContent: 'center'}}>{[0, 1, 2].map((k) => <div key={k} style={{transform: `translateX(${Math.sin(t * 3 + k) * 6}px)`}}><F n="salarie" size={80} /></div>)}</div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: DIM}}>suivre le mouvement<br />par obligation</div>
          </Abs>
          <Abs x={650} y={40} w={360} style={{textAlign: 'center', opacity: pop(t, 402.7)}}>
            <div style={{transform: `translateY(${-Math.max(0, t - 404.4) * 30}px) rotate(-30deg)`}}><F n="fusee" size={130} /></div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: GREEN}}>devenir les pionniers<br />d’une économie réinventée</div>
          </Abs>
        </Abs>
      )}
      {t > 405.6 && (
        <Blinds src="iso26/usine-porte.jpg" x={60} y={420} w={960} h={820} at={405.6} pos="50% 50%">
          <div style={{position: 'absolute', left: '50%', top: '42%', width: 260, height: 260, marginLeft: -130, marginTop: -130, borderRadius: '50%', background: `radial-gradient(circle, ${GOLD}AA, transparent 70%)`, opacity: 0.6 + 0.4 * Math.sin(t * 3)}} />
        </Blinds>
      )}
      {t > 407.0 && <Center y={1270}><Kin text="La question reste ouverte." at={407.1} size={60} color={INK} /></Center>}
      {t > 405.6 && <Dust n={24} />}
    </Out>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const flapTicks = (a: number, n: number): Sfx[] => rep(a, n, 0.06, 'tick', 0.16);
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...PARTS.flatMap((p) => [{at: p.at, s: 'sfx/whoosh', v: 0.45}, ...rep(p.at + 0.85, p.code.length, 0.07, 'sfx/thud', 0.25), {at: p.at + 1.2, s: 'bass-hit', v: 0.3}, {at: p.at + 3.0, s: 'sfx/swish', v: 0.4}]),
  ...DECODE.map((d) => ({at: d.at, s: 'tick', v: 0.12, dur: 0.6})),
  // intro
  ...[1.7, 1.9, 2.2, 2.6, 3.7].map((a) => ({at: a, s: 'sfx/pop', v: 0.2})), ...rep(3.2, 10, 0.12, 'sfx/click', 0.12), {at: 7.8, s: 'tampon', v: 0.45},
  ...[12.5, 13.0, 13.5, 14.0].flatMap((a) => rep(a + 0.35, 3, 0.07, 'sfx/click', 0.25)), {at: 18.2, s: 'sfx/rise', v: 0.3}, {at: 19.9, s: 'sfx/ding', v: 0.3},
  {at: 21.8, s: 'sfx/pop', v: 0.25}, {at: 22.9, s: 'sfx/pop', v: 0.25},
  ...[27.4, 30.9, 35.0, 39.5].map((a) => ({at: a, s: 'sfx/ding', v: 0.25})), {at: 42.7, s: 'sfx/whoosh', v: 0.35},
  // partie 1
  ...flapTicks(53.5, 14), {at: 54.4, s: 'deep-hit', v: 0.35}, {at: 55.5, s: 'sfx/whoosh', v: 0.3}, {at: 59.0, s: 'stylo', v: 0.3}, {at: 65.2, s: 'tampon', v: 0.45},
  {at: 69.9, s: 'tension', v: 0.2, dur: 2}, {at: 71.5, s: 'sfx/thud', v: 0.3}, ...rep(76.3, 7, 0.06, 'sfx/thud', 0.15),
  ...flapTicks(86.2, 14), {at: 87.6, s: 'soft-whoosh', v: 0.35}, {at: 91.5, s: 'sfx/swish', v: 0.3}, ...[93.2, 93.9, 94.6].map((a) => ({at: a, s: 'sfx/rise', v: 0.2})),
  ...[102.3, 102.9, 103.4].map((a) => ({at: a, s: 'sfx/pop', v: 0.3})), {at: 104.7, s: 'riser', v: 0.25, dur: 4}, {at: 108.5, s: 'validation', v: 0.35},
  // partie 2
  ...rep(119.95, 3, 0.07, 'sfx/thud', 0.3), {at: 120.2, s: 'sfx/ding', v: 0.25}, {at: 126.3, s: 'sfx/swish', v: 0.3},
  {at: 128.0, s: 'soft-whoosh', v: 0.35}, ...[135.9, 136.6, 137.3].map((a) => ({at: a, s: 'sfx/pop', v: 0.22})), ...rep(138.2, 4, 1.2, 'sfx/ding', 0.12), {at: 143.6, s: 'deep-hit', v: 0.35}, ...rep(143.8, 3, 0.7, 'sfx/thud', 0.2),
  {at: 150.9, s: 'sfx/thud', v: 0.3}, {at: 152.8, s: 'sfx/pop', v: 0.25}, {at: 154.4, s: 'sfx/whoosh', v: 0.3}, ...[157.2, 157.6, 158.0].map((a) => ({at: a, s: 'soft-whoosh', v: 0.25, dur: 1})), ...[160.2, 160.45, 160.7].map((a) => ({at: a, s: 'tampon', v: 0.3})),
  {at: 164.8, s: 'sfx/pop', v: 0.25}, {at: 166.8, s: 'sfx/pop', v: 0.25}, {at: 169.1, s: 'validation', v: 0.35},
  // partie 3
  {at: 183.6, s: 'bass-hit', v: 0.35}, ...rep(185.2, 12, 0.08, 'sfx/click', 0.15), ...flapTicks(186.3, 14), ...flapTicks(189.0, 14), {at: 192.1, s: 'sfx/ding', v: 0.25},
  {at: 199.9, s: 'sfx/swish', v: 0.3}, {at: 201.9, s: 'soft-whoosh', v: 0.4}, {at: 204.9, s: 'sfx/pop', v: 0.25}, ...rep(208.6, 5, 0.25, 'sfx/click', 0.15), {at: 210.8, s: 'sfx/ding', v: 0.25},
  ...[215.2, 219.8, 227.8].map((a) => ({at: a, s: 'sfx/ding', v: 0.25})), {at: 225.7, s: 'deep-hit', v: 0.4}, ...rep(225.9, 4, 0.6, 'sfx/whoosh', 0.15), {at: 234.7, s: 'tampon', v: 0.45},
  ...[242.1, 243.4, 243.9].map((a) => ({at: a, s: 'sfx/thud', v: 0.3})), {at: 249.4, s: 'sfx/thud', v: 0.3}, {at: 251.7, s: 'sfx/pop', v: 0.25}, {at: 255.6, s: 'sfx/whoosh', v: 0.3}, {at: 261.4, s: 'tension', v: 0.2, dur: 3}, {at: 264.0, s: 'sfx/ding', v: 0.3}, {at: 265.8, s: 'tampon', v: 0.5},
  // partie 4
  {at: 272.8, s: 'tension', v: 0.15, dur: 3}, {at: 279.4, s: 'sfx/whoosh', v: 0.35}, ...[284.7, 289.4, 293.9, 298.3].map((a) => ({at: a, s: 'page', v: 0.4})),
  ...rep(304.0, 8, 0.08, 'sfx/click', 0.12), {at: 305.9, s: 'deep-hit', v: 0.45}, {at: 310.3, s: 'sfx/swish', v: 0.3}, {at: 312.6, s: 'sfx/ding', v: 0.25}, ...[316.8, 318.3, 319.5].map((a) => ({at: a, s: 'sfx/pop', v: 0.25})), {at: 327.1, s: 'sfx/rise', v: 0.25},
  ...[333.3, 338.3, 345.5, 350.2].map((a) => ({at: a, s: 'sfx/swish', v: 0.3})), {at: 345.6, s: 'sfx/ding', v: 0.2},
  // conclusion
  {at: 356.9, s: 'soft-whoosh', v: 0.35}, ...[359.9, 361.3, 368.6].map((a) => ({at: a, s: 'sfx/thud', v: 0.18})), {at: 363.6, s: 'sfx/whoosh', v: 0.35}, ...[371.6, 373.9, 375.1].map((a) => ({at: a, s: 'sfx/ding', v: 0.22})), {at: 377.3, s: 'sfx/rise', v: 0.3}, {at: 378.6, s: 'validation', v: 0.35},
  {at: 386.2, s: 'sfx/whoosh', v: 0.3}, {at: 389.9, s: 'sfx/pop', v: 0.22}, {at: 390.8, s: 'sfx/pop', v: 0.22},
  {at: 399.0, s: 'soft-whoosh', v: 0.35}, {at: 399.9, s: 'sfx/pop', v: 0.22}, {at: 402.7, s: 'sfx/pop', v: 0.22}, {at: 404.4, s: 'sfx/rise', v: 0.3}, {at: 405.6, s: 'riser', v: 0.3, dur: 3}, {at: 407.1, s: 'bass-hit', v: 0.4},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const Durab: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={1.5} to={12.5}><Soupe /></Gate>
    <Gate from={11.0} to={21.8}><Tri /></Gate>
    <Gate from={21.7} to={25.1}><TeteFroide /></Gate>
    <Gate from={25.0} to={43.6}><Programme /></Gate>
    <Gate from={47.0} to={79.1}><Brundtland /></Gate>
    <Gate from={79.0} to={95.6}><Rio /></Gate>
    <Gate from={95.5} to={110.7}><TroisP /></Gate>
    <Gate from={114.1} to={127.9}><RseDef /></Gate>
    <Gate from={127.8} to={145.9}><RseCoeur /></Gate>
    <Gate from={145.8} to={171.5}><DejaRse /></Gate>
    <Gate from={175.0} to={196.1}><Csrd /></Gate>
    <Gate from={196.0} to={213.4}><Transparence /></Gate>
    <Gate from={213.3} to={236.6}><Calendrier /></Gate>
    <Gate from={236.5} to={267.1}><Esg /></Gate>
    <Gate from={270.6} to={303.5}><Tiroirs /></Gate>
    <Gate from={303.4} to={328.8}><Iso26 /></Gate>
    <Gate from={328.7} to={354.8}><Benefices /></Gate>
    <Gate from={354.7} to={382.9}><Levier /></Gate>
    <Gate from={382.8} to={392.9}><Accompagner /></Gate>
    <Gate from={392.8} to={OUTRO_AT}><Vision /></Gate>
    {PARTS.map((p, i) => <Gate key={p.n} from={p.at} to={p.at + 3.7}><Baton i={i} /></Gate>)}
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={408.6}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-durabilite-decodee-origine.m4a')} trimAfter={s(408.7)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);
