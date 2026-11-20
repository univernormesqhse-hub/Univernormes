import React from 'react';
import {AbsoluteFill} from 'remotion';
import {BookOpen} from 'lucide-react';
import {easeIn, easeInOut, prog, useT} from '../anim';
import {sansFont} from '../theme';

/**
 * Kit « rubalise » réutilisable (2D) :
 *  - NormRef      : petit bandeau de référence normative (« ISO 45001 § 6.1.2 ») qui glisse depuis la gauche ;
 *  - RibbonSweep  : ruban rouge et blanc qui traverse l'écran en diagonale et emporte l'image (coupure cachée) ;
 *  - BarrierLift  : bandes de signalisation qui glissent, se ferment puis se lèvent comme une barrière ;
 *  - TapeZone     : rubalise qui se déroule autour d'une zone (rouleau en tête) ;
 *  - TapeCross    : rubans qui se déroulent en travers de l'écran, utilisés comme transition ;
 *  - TapeFX       : orchestration (une seule balise par composition), centrée sur les instants de coupe.
 * N'afficher en bandeau que des références exactes (clause existante, ou citée dans la voix).
 */
export const TP_R = '#D7263D';
const INK = '#111111';
const NAVY = '#0E2A5C';
const MONO = "'JetBrains Mono', 'Courier New', monospace";
const cl1 = (v: number) => Math.min(1, Math.max(0, v));
const eo3 = (x: number) => 1 - Math.pow(1 - cl1(x), 3);
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
export const TP_STRIPES = (w: number, a = 45) => `repeating-linear-gradient(${a}deg, ${TP_R} 0 ${w}px, #FFFFFF ${w}px ${w * 2}px)`;

export const NormRef: React.FC<{at: number; dur?: number; l: string; sub?: string; y?: number; x?: number}> = ({at, dur = 4.5, l, sub, y = 1250, x = 50}) => {
  const t = useT();
  if (t < at || t > at + dur + 0.6) return null;
  const k = eo3((t - at) / 0.5) * (1 - prog(t, at + dur, at + dur + 0.5, easeIn));
  const sweep = prog(t, at + 0.4, at + 1.2, easeInOut);
  return (
    <div style={{position: 'absolute', left: x - (1 - k) * 760, top: y, zIndex: 72, display: 'flex', alignItems: 'stretch', filter: 'drop-shadow(5px 5px 0 rgba(0,0,0,0.3))'}}>
      <div style={{width: 20, background: TP_STRIPES(9), borderRadius: '10px 0 0 10px', border: `3px solid ${INK}`, borderRight: 'none'}} />
      <div style={{background: NAVY, border: `3px solid ${INK}`, borderLeft: 'none', borderRadius: '0 12px 12px 0', padding: '10px 20px 10px 14px', display: 'flex', alignItems: 'center', gap: 14, position: 'relative', overflow: 'hidden'}}>
        <BookOpen size={34} color="#FFD966" strokeWidth={2.4} />
        <div>
          <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 15, color: '#FFD966', letterSpacing: 3}}>{sub ?? 'RÉFÉRENCE NORMATIVE'}</div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#fff', whiteSpace: 'nowrap'}}>{l}</div>
        </div>
        <div style={{position: 'absolute', top: 0, bottom: 0, width: 80, left: -100 + sweep * 800, background: 'linear-gradient(90deg, rgba(255,217,102,0), rgba(255,217,102,0.45), rgba(255,217,102,0))', transform: 'skewX(-20deg)'}} />
      </div>
    </div>
  );
};

export const RibbonSweep: React.FC<{at: number; paper?: string; brand?: string}> = ({at, paper = '#F6F2E6', brand = 'UNIVERSNORMES'}) => {
  const t = useT();
  const u = (t - (at - 0.5)) / 1.0;
  if (u <= 0 || u >= 1) return null;
  const p = lerp(-3800, 1400, eo3(u) * 0.5 + u * 0.5);
  const W = 2600;
  return (
    <AbsoluteFill style={{zIndex: 70, pointerEvents: 'none', overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 540, top: 960, width: 0, height: 0, transform: 'rotate(-28deg)'}}>
        <div style={{position: 'absolute', left: p, top: -2200, width: W, height: 4400, background: paper}}>
          {[0, 1].map((e) => <div key={e} style={{position: 'absolute', top: 0, bottom: 0, width: 110, left: e ? W - 55 : -55, background: TP_STRIPES(34, 0), boxShadow: '0 0 30px rgba(0,0,0,0.35)', border: `4px solid ${INK}`}} />)}
          <div style={{position: 'absolute', left: W / 2 - 300, top: 2200 - 60, width: 600, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(28deg)'}}>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 54, color: INK, letterSpacing: 6, opacity: 0.8}}>{brand}</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const BarrierLift: React.FC<{at: number}> = ({at}) => {
  const t = useT();
  if (t < at - 0.5 || t > at + 0.75) return null;
  const N = 6, H = 1920 / N + 2;
  return (
    <AbsoluteFill style={{zIndex: 70, pointerEvents: 'none', overflow: 'hidden'}}>
      {Array.from({length: N}, (_, i) => {
        const d = i * 0.05;
        const close = eo3((t - (at - 0.5) - d) / 0.4);
        const lift = prog(t, at + 0.05 + d * 1.2, at + 0.6 + d * 1.2, easeIn);
        const fromLeft = i % 2 === 0;
        return (
          <div key={i} style={{position: 'absolute', left: 0, top: i * (H - 2), width: 1080, height: H, transformOrigin: fromLeft ? '0% 50%' : '100% 50%', transform: `translateX(${(1 - close) * (fromLeft ? -1100 : 1100)}px) rotate(${(fromLeft ? -1 : 1) * lift * 85}deg)`, opacity: 1 - prog(t, at + 0.45 + d, at + 0.7 + d)}}>
            <div style={{position: 'absolute', inset: 0, background: TP_STRIPES(46, fromLeft ? 60 : 120), borderTop: `5px solid ${INK}`, borderBottom: `5px solid ${INK}`}} />
            <div style={{position: 'absolute', top: H / 2 - 22, [fromLeft ? 'left' : 'right']: 24, width: 44, height: 44, borderRadius: 22, background: INK, border: '6px solid #fff'}} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

export const TapeZone: React.FC<{x: number; y: number; w: number; h: number; at: number; dur?: number; out?: number}> = ({x, y, w, h, at, dur = 1.4, out}) => {
  const t = useT();
  if (t < at || (out !== undefined && t > out + 0.5)) return null;
  const k = prog(t, at, at + dur, easeInOut);
  const fade = out !== undefined ? 1 - prog(t, out, out + 0.5) : 1;
  const P = 2 * (w + h), L = k * P;
  const pt = (q: number): [number, number] => (q < w ? [x + q, y] : q < w + h ? [x + w, y + q - w] : q < 2 * w + h ? [x + w - (q - w - h), y + h] : [x, y + h - (q - 2 * w - h)]);
  const [hx, hy] = pt(Math.min(L, P - 0.01));
  const id = `tz${Math.round(at * 100)}`;
  const d = `M ${x} ${y} h ${w} v ${h} h ${-w} Z`;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, zIndex: 71, pointerEvents: 'none', opacity: fade}}>
      <defs><pattern id={id} width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="20" height="40" fill={TP_R} /><rect x="20" width="20" height="40" fill="#fff" /></pattern></defs>
      <path d={d} fill="none" stroke={INK} strokeWidth={30} pathLength={P} strokeDasharray={`${L} ${P}`} strokeLinejoin="round" />
      <path d={d} fill="none" stroke={`url(#${id})`} strokeWidth={22} pathLength={P} strokeDasharray={`${L} ${P}`} strokeLinejoin="round" />
      {k < 1 && <g transform={`translate(${hx} ${hy}) rotate(${L * 3})`}><circle r={30} fill="#fff" stroke={INK} strokeWidth={6} /><circle r={12} fill={TP_R} stroke={INK} strokeWidth={4} /></g>}
    </svg>
  );
};

export const TapeCross: React.FC<{at: number; paper?: string}> = ({at, paper = '#F6F2E6'}) => {
  const t = useT();
  if (t < at - 0.55 || t > at + 0.7) return null;
  const tapes: [number, number, number][] = [[-30, 420, 0], [24, 1500, 0.08], [-14, 980, 0.16], [36, 700, 0.24]];
  const fl = Math.max(0, 1 - Math.abs(t - at) / 0.22);
  return (
    <AbsoluteFill style={{zIndex: 70, pointerEvents: 'none', overflow: 'hidden'}}>
      <AbsoluteFill style={{background: paper, opacity: 0.92 * fl}} />
      {tapes.map(([ang, cy, d], i) => {
        const k = eo3((t - (at - 0.55) - d) / 0.4);
        const gone = prog(t, at + 0.2 + d, at + 0.65 + d, easeIn);
        const len = 2600 * k;
        const head = i % 2 ? 2600 - len : len;
        return (
          <div key={i} style={{position: 'absolute', left: -760, top: cy - 45, width: 2600, height: 90, transformOrigin: '50% 50%', transform: `rotate(${ang}deg) translateY(${gone * 1400}px)`}}>
            <div style={{position: 'absolute', left: i % 2 ? 2600 - len : 0, top: 0, width: len, height: 90, background: TP_STRIPES(30), border: `5px solid ${INK}`, boxShadow: '0 10px 24px rgba(0,0,0,0.3)'}} />
            {k < 1 && <div style={{position: 'absolute', left: head - 55, top: -10, width: 110, height: 110, borderRadius: 55, background: '#fff', border: `7px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><div style={{width: 40, height: 40, borderRadius: 20, background: TP_R, border: `5px solid ${INK}`}} /></div>}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

export type TapeKind = 'ribbon' | 'barrier' | 'tape';
export const TapeFX: React.FC<{events: [number, TapeKind][]; zones?: [number, number, number, number, number, number][]; refs?: [number, string, string?, number?][]; paper?: string; refY?: number}> = ({events, zones = [], refs = [], paper, refY}) => (
  <>
    {events.map(([a, k], i) => (k === 'ribbon' ? <RibbonSweep key={i} at={a} paper={paper} /> : k === 'barrier' ? <BarrierLift key={i} at={a} /> : <TapeCross key={i} at={a} paper={paper} />))}
    {zones.map(([x, y, w, h, a, o], i) => <TapeZone key={`z${i}`} x={x} y={y} w={w} h={h} at={a} out={o} />)}
    {refs.map(([a, l, s, d], i) => <NormRef key={`r${i}`} at={a} l={l} sub={s} dur={d} y={refY} />)}
  </>
);
