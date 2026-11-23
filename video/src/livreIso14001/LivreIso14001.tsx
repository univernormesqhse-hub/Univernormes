import React from 'react';
import {AbsoluteFill, Audio, Img, staticFile, spring} from 'remotion';
import {
  Award, BookA, BookOpen, Briefcase, Building2, CalendarClock, ClipboardCheck, Droplets, Factory, FileText, Globe, Key, Leaf, Lightbulb, ListChecks,
  MousePointer2, Puzzle, Recycle, Search, ShoppingCart, Sprout, Sun, Thermometer, TreePine, UserCheck, Users, Wind, Wrench,
} from 'lucide-react';
import type {LucideIcon} from 'lucide-react';
import {easeIn, easeInOut, easeOut, prog, useT} from '../anim';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {NormRef} from '../rubalise/Rubalise';
import {s, sansFont} from '../theme';
import {captions} from './captions';

/**
 * « Décrypter l'ISO 14001 — Version 2026 » : vidéo de vente de l'ouvrage (voix off fournie, 1 min 46), identité
 * UNIVERSNORMES (marine #13296B, vert #1FA36E) mariée aux tons de la couverture (vert sauge, brun olive, terre).
 * Le livre est présenté comme un objet réel : volume 3D (couverture, dos, tranche de 127 pages), livre ouvert dont
 * les pages tournent sur les vraies pages du PDF (sommaire, parties, étude de cas, quiz, fiches, annexes).
 * Transitions « page qui tourne », gyrophare sur l'échéance 2029, bandeaux de référence normative. Aucune musique.
 */
const NAVY = '#13296B', GREEN = '#1FA36E', INK = '#0E1A3A', BG = '#F3F7F1', OLIVE = '#2E2B1C', SAGE = '#E2EFDC', EARTH = '#B8692E', RED = '#E03131', GREY = '#7C8696', PAPER = '#FBFAF6';
const FONT = sansFont;
const OUTRO_AT = 105.75;
export const LIVRE_ISO14001_FRAMES = s(OUTRO_AT + 4.0);
const cl = (v: number) => Math.min(1, Math.max(0, v));
const eo = (x: number) => 1 - Math.pow(1 - cl(x), 3);
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const pop = (t: number, a: number, k = 10, d = 11) => (t < a ? 0 : spring({frame: (t - a) * 30, fps: 30, config: {stiffness: k * 18, damping: d}}));
const PH = (f: string) => staticFile(`livre-iso14001/${f}`);
const PG = (n: number) => PH(`pages/p${String(n).padStart(3, '0')}.jpg`);
const LOGO = staticFile('tdb-epi/logo.png'), GLOBE = staticFile('tdb-epi/globe.png');
const COVER_R = 1068 / 672;

/* ═══ Habillage permanent ═══ */
const Backdrop: React.FC = () => {
  const t = useT();
  return <AbsoluteFill style={{background: BG}}>
    <AbsoluteFill style={{backgroundImage: 'radial-gradient(rgba(46,43,28,0.09) 2.5px, transparent 2.5px)', backgroundSize: '46px 46px', backgroundPosition: `${t * 5}px ${t * 9}px`}} />
    <div style={{position: 'absolute', left: -260 + Math.sin(t * 0.3) * 60, top: 160 + Math.cos(t * 0.25) * 80, width: 760, height: 760, borderRadius: '50%', background: 'radial-gradient(circle, rgba(31,163,110,0.18), transparent 68%)'}} />
    <div style={{position: 'absolute', right: -300 + Math.cos(t * 0.27) * 60, top: 1050 + Math.sin(t * 0.22) * 90, width: 860, height: 860, borderRadius: '50%', background: 'radial-gradient(circle, rgba(19,41,107,0.13), transparent 68%)'}} />
    <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 760, background: `linear-gradient(180deg, transparent, ${SAGE})`}} />
  </AbsoluteFill>;
};
const FLOAT: LucideIcon[] = [Leaf, Droplets, Recycle, Sun, Wind, TreePine, Globe, BookOpen, Sprout, Leaf];
const Floaters: React.FC = () => {
  const t = useT();
  return <AbsoluteFill style={{pointerEvents: 'none'}}>{FLOAT.map((Ic, i) => { const x = 60 + ((i * 337) % 940), y0 = 300 + ((i * 523) % 1400); const yy = ((((y0 - t * (16 + i * 4)) % 1700) + 1700) % 1700) + 150; return <div key={i} style={{position: 'absolute', left: x + Math.sin(t * 0.6 + i) * 40, top: yy, opacity: 0.08, transform: `rotate(${Math.sin(t * 0.4 + i * 2) * 25}deg)`}}><Ic size={90 + (i % 3) * 30} color={i % 2 ? GREEN : OLIVE} strokeWidth={2} /></div>; })}</AbsoluteFill>;
};
const Header: React.FC = () => {
  const t = useT();
  if (t < 7.0 || t > OUTRO_AT - 6.3) return null;
  const k = eo((t - 7.0) / 0.6) * (1 - prog(t, OUTRO_AT - 6.8, OUTRO_AT - 6.3, easeIn));
  return <div style={{position: 'absolute', left: 40, right: 40, top: 46, height: 120, zIndex: 50, transform: `translateY(${(1 - k) * -170}px)`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', borderRadius: 30, boxShadow: '0 14px 40px rgba(19,41,107,0.14)', padding: '0 26px'}}>
    <Img src={LOGO} style={{height: 96}} />
    <div style={{display: 'flex', alignItems: 'center', gap: 12, background: OLIVE, color: '#fff', borderRadius: 20, padding: '12px 20px', fontFamily: FONT, fontWeight: 900, fontSize: 25}}><BookOpen size={32} color="#8FD3A8" strokeWidth={2.6} />DÉCRYPTER L'ISO 14001</div>
  </div>;
};
const CUTS = [7.1, 17.55, 26.25, 37.55, 48.25, 57.1, 68.9, 83.9, 93.3, 99.4];
const Progress: React.FC = () => {
  const t = useT();
  if (t > OUTRO_AT) return null;
  const P = [0, ...CUTS];
  return <div style={{position: 'absolute', left: 60, right: 60, top: 1880, height: 12, zIndex: 50, display: 'flex', gap: 8}}>{P.map((a, i) => { const b = P[i + 1] ?? OUTRO_AT; const k = cl((t - a) / (b - a)); return <div key={i} style={{flex: 1, borderRadius: 6, background: 'rgba(46,43,28,0.14)', overflow: 'hidden'}}><div style={{width: `${k * 100}%`, height: '100%', background: k >= 1 ? OLIVE : GREEN}} /></div>; })}</div>;
};
/* transition « page qui tourne » : une grande feuille entre par la droite puis repart vers la gauche */
const PageTurn: React.FC<{at: number}> = ({at}) => {
  const t = useT();
  const u = (t - (at - 0.42)) / 0.84;
  if (u <= 0 || u >= 1) return null;
  const inPh = u < 0.5;
  const q = inPh ? easeOut(u / 0.5) : easeIn((u - 0.5) / 0.5);
  const ang = inPh ? lerp(95, 0, q) : lerp(0, -95, q);
  const shade = Math.abs(ang) / 95;
  return <AbsoluteFill style={{zIndex: 80, pointerEvents: 'none', perspective: 2400, overflow: 'hidden'}}>
    <AbsoluteFill style={{background: OLIVE, opacity: 0.22 * (1 - shade)}} />
    <div style={{position: 'absolute', inset: 0, transformOrigin: inPh ? 'right center' : 'left center', transform: `rotateY(${ang}deg)`, background: PAPER, boxShadow: `${inPh ? -40 : 40}px 0 80px rgba(0,0,0,${0.35 * (1 - shade)})`, overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent 0 58px, rgba(46,43,28,0.06) 58px 60px)'}} />
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 560, background: SAGE}} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 760, textAlign: 'center'}}><Img src={GLOBE} style={{width: 300, height: 300, objectFit: 'contain', transform: `rotate(${u * 120}deg)`}} /></div>
      <div style={{position: 'absolute', inset: 0, background: `linear-gradient(${inPh ? 90 : 270}deg, rgba(0,0,0,${0.25 * shade}), transparent 60%)`}} />
    </div>
  </AbsoluteFill>;
};
/* sous-titres : carte blanche, mots-clés en vert */
const Captions: React.FC = () => {
  const t = useT() + 0.15;
  const c = captions.find((x) => t >= x.start && t < x.end + 0.05);
  if (!c || t > OUTRO_AT) return null;
  const k = Math.min(1, (t - c.start) / 0.2);
  const parts = c.text.split(/(\*[^*]+\*)/).filter(Boolean);
  return <div style={{position: 'absolute', left: 0, right: 0, top: 1690, zIndex: 60, display: 'flex', justifyContent: 'center'}}>
    <div style={{background: '#fff', borderRadius: 22, padding: '14px 30px', boxShadow: '0 12px 34px rgba(19,41,107,0.18)', borderBottom: `6px solid ${GREEN}`, transform: `translateY(${(1 - k) * 24}px) scale(${0.94 + 0.06 * k})`, opacity: k, maxWidth: 960, textAlign: 'center', fontFamily: FONT, fontWeight: 800, fontSize: 46, color: INK, lineHeight: 1.15}}>
      {parts.map((p, i) => p.startsWith('*') ? <span key={i} style={{color: GREEN, fontWeight: 900}}>{p.slice(1, -1)}</span> : <span key={i}>{p}</span>)}
    </div>
  </div>;
};

/* ═══ Briques ═══ */
const Title: React.FC<{y: number; at: number; l: string; c?: string; fs?: number; sub?: string; out?: number}> = ({y, at, l, c = NAVY, fs = 64, sub, out}) => {
  const t = useT();
  if (t < at || (out && t > out)) return null;
  const words = l.split(' ');
  return <div style={{position: 'absolute', left: 50, right: 50, top: y, zIndex: 20, textAlign: 'center'}}>
    <div style={{fontFamily: FONT, fontWeight: 900, fontSize: fs, color: c, lineHeight: 1.05}}>{words.map((w, i) => { const k = eo((t - at - i * 0.06) / 0.35); return <span key={i} style={{display: 'inline-block', marginRight: 16, opacity: k, transform: `translateY(${(1 - k) * 50}px) rotate(${(1 - k) * 6}deg)`}}>{w}</span>; })}</div>
    {sub && <div style={{marginTop: 10, fontFamily: FONT, fontWeight: 700, fontSize: 30, color: GREEN, opacity: eo((t - at - 0.4) / 0.4)}}>{sub}</div>}
  </div>;
};
const Chip: React.FC<{x: number; y: number; at: number; l: string; c?: string; Ic?: LucideIcon; fs?: number; out?: number; dark?: boolean}> = ({x, y, at, l, c = NAVY, Ic, fs = 32, out, dark = true}) => {
  const t = useT();
  if (t < at || (out && t > out)) return null;
  const k = Math.min(1.06, pop(t, at, 12, 10)), o = out ? 1 - prog(t, out - 0.25, out) : 1;
  return <div style={{position: 'absolute', left: x, top: y, zIndex: 22, transform: `translate(-50%, -50%) scale(${k})`, opacity: o, display: 'flex', alignItems: 'center', gap: 12, background: dark ? c : '#fff', color: dark ? '#fff' : c, border: dark ? 'none' : `4px solid ${c}`, borderRadius: 999, padding: `12px ${fs * 0.8}px`, fontFamily: FONT, fontWeight: 900, fontSize: fs, whiteSpace: 'nowrap', boxShadow: '0 10px 26px rgba(19,41,107,0.22)'}}>{Ic && <Ic size={fs * 1.15} strokeWidth={2.6} />}{l}</div>;
};
const Card: React.FC<{x: number; y: number; w: number; h: number; at: number; children: React.ReactNode; out?: number; from?: 'up' | 'left' | 'right' | 'zoom'; style?: React.CSSProperties; z?: number}> = ({x, y, w, h, at, children, out, from = 'up', style, z = 15}) => {
  const t = useT();
  if (t < at || (out && t > out + 0.3)) return null;
  const k = eo((t - at) / 0.5), o = out ? 1 - prog(t, out, out + 0.3, easeIn) : 1;
  const tr = from === 'up' ? `translateY(${(1 - k) * 120}px)` : from === 'left' ? `translateX(${(1 - k) * -700}px)` : from === 'right' ? `translateX(${(1 - k) * 700}px)` : `scale(${0.6 + 0.4 * k})`;
  return <div style={{position: 'absolute', left: x, top: y, width: w, height: h, zIndex: z, opacity: k * o, transform: tr, background: '#fff', borderRadius: 28, boxShadow: '0 18px 50px rgba(19,41,107,0.16)', overflow: 'hidden', ...style}}>{children}</div>;
};
/* photo en mouvement (Ken Burns + reflet) */
const Photo: React.FC<{src: string; at: number; z0?: number; z1?: number; ox?: number; oy?: number; style?: React.CSSProperties}> = ({src, at, z0 = 1.04, z1 = 1.18, ox = 50, oy = 50, style}) => {
  const t = useT();
  const z = lerp(z0, z1, cl((t - at) / 7));
  return <div style={{position: 'absolute', inset: 0, overflow: 'hidden', ...style}}>
    <Img src={PH(`photos/${src}`)} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${z})`, transformOrigin: `${ox}% ${oy}%`}} />
    <div style={{position: 'absolute', top: 0, bottom: 0, width: 140, left: lerp(-200, 1300, cl((t - at - 0.3) / 1.4)), background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)', transform: 'skewX(-18deg)'}} />
  </div>;
};
const Count: React.FC<{v: number; at: number; dur?: number; suffix?: string}> = ({v, at, dur = 0.8, suffix = ''}) => {
  const t = useT();
  return <>{Math.round(v * prog(t, at, at + dur, easeOut)).toLocaleString('fr-FR')}{suffix}</>;
};
const Stamp: React.FC<{x: number; y: number; at: number; l: string; c?: string; fs?: number; out?: number; rot?: number}> = ({x, y, at, l, c = RED, fs = 48, out, rot = -8}) => {
  const t = useT();
  if (t < at || (out && t > out)) return null;
  const k = eo((t - at) / 0.22), sc = lerp(2.4, 1, k);
  return <div style={{position: 'absolute', left: x, top: y, zIndex: 30, transform: `translate(-50%, -50%) rotate(${rot}deg) scale(${sc})`, opacity: k, border: `8px solid ${c}`, borderRadius: 16, padding: '8px 26px', fontFamily: FONT, fontWeight: 900, fontSize: fs, color: c, letterSpacing: 3, background: 'rgba(255,255,255,0.9)', whiteSpace: 'nowrap'}}>{l}</div>;
};
/* page réelle du livre (papier, ombre, légère inclinaison) */
const Page: React.FC<{n: number; x: number; y: number; w: number; at: number; rot?: number; out?: number; z?: number; hl?: [number, number, number]}> = ({n, x, y, w, at, rot = 0, out, z = 16, hl}) => {
  const t = useT();
  if (t < at || (out && t > out + 0.3)) return null;
  const k = Math.min(1.05, pop(t, at, 11, 11)), o = out ? 1 - prog(t, out, out + 0.3, easeIn) : 1;
  const h = w * 1.5;
  return <div style={{position: 'absolute', left: x, top: y, width: w, height: h, zIndex: z, opacity: Math.min(1, k) * o, transform: `translateY(${(1 - Math.min(1, k)) * 160}px) rotate(${rot * Math.min(1, k)}deg) scale(${0.7 + 0.3 * k})`, background: PAPER, borderRadius: 6, boxShadow: '0 22px 50px rgba(46,43,28,0.28), 0 2px 0 #E5E0D2', overflow: 'hidden'}}>
    <Img src={PG(n)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
    {hl && <div style={{position: 'absolute', left: '7%', top: `${hl[0]}%`, height: `${hl[1]}%`, width: `${86 * prog(t, hl[2], hl[2] + 0.6, easeInOut)}%`, background: 'rgba(31,163,110,0.32)', borderRadius: 4, mixBlendMode: 'multiply'}} />}
    <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.12), transparent 8%)'}} />
  </div>;
};
/* ─── Le livre en volume : couverture, dos, tranche de pages, quatrième ─── */
const Book3D: React.FC<{w: number; ry: number; rx?: number; rz?: number; shineAt?: number[]}> = ({w, ry, rx = 0, rz = 0, shineAt = []}) => {
  const t = useT();
  const h = w * COVER_R, d = w * 0.09;
  const face: React.CSSProperties = {position: 'absolute', backfaceVisibility: 'hidden'};
  const shine = shineAt.map((a) => cl((t - a) / 1.0)).find((u) => u > 0 && u < 1);
  return <div style={{width: w, height: h, position: 'relative', transformStyle: 'preserve-3d', transform: `rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`}}>
    <div style={{...face, inset: 0, transform: `translateZ(${d / 2}px)`, borderRadius: '3px 8px 8px 3px', overflow: 'hidden', background: '#fff'}}>
      <Img src={PH('couverture.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.28) 0%, rgba(255,255,255,0.25) 2.2%, rgba(0,0,0,0.08) 4%, transparent 9%)'}} />
      {shine !== undefined && <div style={{position: 'absolute', top: -100, bottom: -100, width: w * 0.35, left: lerp(-w * 0.5, w * 1.2, shine), background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)', transform: 'skewX(-20deg)'}} />}
    </div>
    <div style={{...face, inset: 0, transform: `rotateY(180deg) translateZ(${d / 2}px)`, borderRadius: '8px 3px 3px 8px', background: `linear-gradient(180deg, #fff 0 55%, ${SAGE} 55%)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20}}>
      <Img src={LOGO} style={{width: w * 0.6}} />
      <div style={{fontFamily: FONT, fontWeight: 800, fontSize: w * 0.04, color: OLIVE, textAlign: 'center', padding: '0 30px'}}>Comprendre, interpréter et mettre en œuvre les nouvelles exigences</div>
    </div>
    <div style={{...face, left: (w - d) / 2, top: 0, width: d, height: h, transform: `rotateY(-90deg) translateZ(${w / 2}px)`, background: `linear-gradient(90deg, #1E1C12, ${OLIVE} 30%, #4A4630 50%, ${OLIVE} 70%, #1E1C12)`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{transform: 'rotate(90deg)', whiteSpace: 'nowrap', fontFamily: FONT, fontWeight: 900, fontSize: d * 0.42, color: '#fff', letterSpacing: 2}}>DÉCRYPTER L'ISO 14001 <span style={{color: '#8FD3A8'}}>· VERSION 2026</span></div>
    </div>
    <div style={{...face, left: (w - d) / 2, top: 4, width: d, height: h - 8, transform: `rotateY(90deg) translateZ(${w / 2 - 4}px)`, background: 'repeating-linear-gradient(90deg, #F8F5EC 0 2px, #DED8C8 2px 3px)'}} />
    <div style={{...face, left: 4, top: (h - d) / 2, width: w - 8, height: d, transform: `rotateX(90deg) translateZ(${h / 2 - 3}px)`, background: 'repeating-linear-gradient(0deg, #F8F5EC 0 2px, #DED8C8 2px 3px)'}} />
    <div style={{...face, left: 4, top: (h - d) / 2, width: w - 8, height: d, transform: `rotateX(-90deg) translateZ(${h / 2 - 3}px)`, background: 'repeating-linear-gradient(0deg, #F8F5EC 0 2px, #DED8C8 2px 3px)'}} />
  </div>;
};
const BookStage: React.FC<{x: number; y: number; w: number; ry: number; rx?: number; rz?: number; scale?: number; shineAt?: number[]; floor?: number}> = ({x, y, w, ry, rx, rz, scale = 1, shineAt, floor = 1}) => {
  const h = w * COVER_R;
  return <div style={{position: 'absolute', left: x - w / 2, top: y, width: w, height: h, zIndex: 18, perspective: 2200, transform: `scale(${scale})`, transformOrigin: '50% 50%'}}>
    <div style={{position: 'absolute', left: -w * 0.15, top: h * 0.96, width: w * 1.3, height: 90, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(46,43,28,0.38), transparent 70%)', opacity: floor}} />
    <Book3D w={w} ry={ry} rx={rx} rz={rz} shineAt={shineAt} />
  </div>;
};
/* ─── Livre ouvert : les vraies pages tournent ─── */
const OpenBook: React.FC<{x: number; y: number; pw: number; spreads: [number, number][]; flips: number[]; at: number; dur?: number}> = ({x, y, pw, spreads, flips, at, dur = 0.8}) => {
  const t = useT();
  if (t < at) return null;
  const ph = pw * 1.5;
  const done = flips.filter((f) => t >= f + dur).length;
  const cur = flips.findIndex((f) => t >= f && t < f + dur);
  const u = cur >= 0 ? easeInOut((t - flips[cur]) / dur) : 0;
  const from = cur >= 0 ? cur : done, to = cur >= 0 ? cur + 1 : done;
  const k = eo((t - at) / 0.7);
  const pg = (n: number, side: 'l' | 'r') => <div style={{position: 'absolute', inset: 0, background: PAPER, overflow: 'hidden'}}>
    <Img src={PG(n)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
    <div style={{position: 'absolute', inset: 0, background: side === 'l' ? 'linear-gradient(270deg, rgba(0,0,0,0.22), transparent 12%)' : 'linear-gradient(90deg, rgba(0,0,0,0.22), transparent 12%)'}} />
  </div>;
  return <div style={{position: 'absolute', left: x, top: y, width: pw * 2, height: ph, zIndex: 17, perspective: 2600, opacity: k, transform: `translateY(${(1 - k) * 200}px) scale(${0.8 + 0.2 * k})`}}>
    <div style={{position: 'absolute', inset: 0, transformStyle: 'preserve-3d', transform: 'rotateX(12deg)'}}>
      <div style={{position: 'absolute', left: -18, right: -18, top: -14, bottom: -22, background: OLIVE, borderRadius: 14, boxShadow: '0 40px 70px rgba(46,43,28,0.4)'}} />
      {[3, 2, 1].map((j) => <div key={j} style={{position: 'absolute', left: -j * 3, right: -j * 3, top: j * 3, bottom: -j * 3, background: j % 2 ? '#E9E4D6' : '#F6F2E8', borderRadius: 4}} />)}
      <div style={{position: 'absolute', left: 0, top: 0, width: pw, height: ph}}>{pg(spreads[from][0], 'l')}</div>
      <div style={{position: 'absolute', left: pw, top: 0, width: pw, height: ph}}>{pg(spreads[to][1], 'r')}</div>
      {cur >= 0 && <div style={{position: 'absolute', left: pw, top: 0, width: pw, height: ph, transformStyle: 'preserve-3d', transformOrigin: 'left center', transform: `rotateY(${-180 * u}deg)`}}>
        <div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden'}}>{pg(spreads[from][1], 'r')}<div style={{position: 'absolute', inset: 0, background: `rgba(0,0,0,${0.3 * u})`}} /></div>
        <div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)'}}>{pg(spreads[to][0], 'l')}<div style={{position: 'absolute', inset: 0, background: `rgba(0,0,0,${0.3 * (1 - u)})`}} /></div>
      </div>}
      <div style={{position: 'absolute', left: pw - 20, top: 0, width: 40, height: ph, background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.18), transparent)'}} />
    </div>
  </div>;
};
/* gyrophare (urgence) */
const Gyro: React.FC<{x: number; y: number; at: number; out: number; size?: number}> = ({x, y, at, out, size = 150}) => {
  const t = useT();
  if (t < at || t > out) return null;
  const k = Math.min(1.08, pop(t, at, 14, 9)) * (1 - prog(t, out - 0.3, out, easeIn));
  const rot = (t - at) * 540;
  return <div style={{position: 'absolute', left: x, top: y, zIndex: 40, transform: `translate(-50%, -50%) scale(${k})`}}>
    <div style={{position: 'absolute', left: -size * 2.5, top: -size * 2.5, width: size * 5, height: size * 5, borderRadius: '50%', background: `conic-gradient(from ${rot}deg, rgba(255,60,40,0.45), transparent 50deg, transparent 180deg, rgba(255,60,40,0.45) 180deg, transparent 230deg)`, filter: 'blur(6px)'}} />
    <div style={{position: 'relative', width: size, height: size * 0.9}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: size * 0.75, borderRadius: `${size / 2}px ${size / 2}px 10px 10px`, background: `radial-gradient(circle at ${50 + 30 * Math.sin(rot / 57.3)}% 40%, #FFD0C8, #FF3B2F 45%, #A31212)`, boxShadow: `0 0 ${40 + 30 * Math.abs(Math.sin(rot / 57.3))}px rgba(255,59,47,0.9)`}} />
      <div style={{position: 'absolute', left: -12, right: -12, bottom: 0, height: size * 0.2, borderRadius: 10, background: '#2B2F3A'}} />
    </div>
  </div>;
};

/* ═══ Scènes ═══ */
const MONTHS = ['JANVIER', 'FÉVRIER', 'MARS', 'AVRIL'];
const Hook: React.FC = () => {
  const t = useT();
  const mi = Math.min(3, Math.floor(t / 0.13));
  const flip = t < 0.52 ? (t / 0.13) % 1 : 1;
  const ck = Math.min(1.06, pop(t, 0, 12, 10));
  const ex = prog(t, 6.6, 7.1, easeIn);
  return <>
    <div style={{position: 'absolute', left: 540 - 230, top: 210 - ex * 500, width: 460, height: 420, zIndex: 20, transform: `scale(${ck}) rotate(${-3 + Math.sin(t * 1.4) * 1.5}deg)`, background: '#fff', borderRadius: 30, boxShadow: '0 22px 50px rgba(19,41,107,0.22)', overflow: 'hidden'}}>
      <div style={{height: 120, background: OLIVE, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, color: '#fff', fontFamily: FONT, fontWeight: 900, fontSize: 64}}><CalendarClock size={64} color="#8FD3A8" />2026</div>
      <div style={{height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: 800}}><div style={{fontFamily: FONT, fontWeight: 900, fontSize: 96, color: mi === 3 ? GREEN : NAVY, transform: `rotateX(${(1 - eo(flip)) * 90}deg)`}}>{MONTHS[mi]}</div></div>
    </div>
    <div style={{position: 'absolute', left: 0, right: 0, top: 690 - ex * 400, zIndex: 20, textAlign: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 140, color: OLIVE, letterSpacing: -2, opacity: eo((t - 0.68) / 0.3), transform: `scale(${lerp(1.6, 1, eo((t - 0.68) / 0.35))})`}}>L'ISO 14001</div>
    <Stamp x={540} y={960 - ex * 400} at={1.82} l="CHANGE" c={GREEN} fs={86} rot={-6} />
    <Gyro x={890} y={930} at={1.9} out={3.6} size={110} />
    <Card x={60} y={1110} w={470} h={330} at={2.4} from="left" out={6.6}><Photo src="tri-dechets.jpg" at={2.4} /></Card>
    <Card x={550} y={1110} w={470} h={330} at={3.3} from="right" out={6.6}><Photo src="prelevement-eau.jpg" at={3.3} ox={60} /></Card>
    <Chip x={540} y={1130} at={3.4} l="Système de management environnemental" c={NAVY} Ic={Leaf} fs={27} out={6.6} />
    <div style={{position: 'absolute', left: 0, right: 0, top: 1490, zIndex: 24, textAlign: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 64, color: NAVY, opacity: eo((t - 5.59) / 0.3) * (1 - ex)}}>Êtes-vous prêt <span style={{display: 'inline-block', color: RED, transform: `scale(${Math.min(1.3, pop(t, 6.02, 14, 7))}) rotate(${Math.sin(t * 6) * 10}deg)`}}>?</span></div>
  </>;
};
const CHG: [string, string, LucideIcon, string, number][] = [['Changement climatique', 'auditeur-climat.jpg', Thermometer, RED, 7.24], ['Conditions environnementales', 'prelevement-eau.jpg', Droplets, GREEN, 8.24], ['Nouvelle Annexe A', '', FileText, NAVY, 9.54]];
const QS: [string, number, number][] = [['Qu\'est-ce qui change vraiment ?', 10.37, 0], ['Pourquoi ?', 12.39, 1], ['Comment, concrètement ?', 14.52, 0]];
const Problem: React.FC = () => {
  const t = useT();
  const shrink = prog(t, 10.2, 10.8, easeInOut);
  return <>
    {CHG.map(([l, ph, Ic, c, a], i) => { const k = eo((t - a) / 0.5); const y = lerp(250 + i * 270, 230 + i * 170, shrink), h = lerp(240, 150, shrink); return t >= a ? <div key={l} style={{position: 'absolute', left: 60, top: y, width: 960, height: h, zIndex: 16, opacity: k, transform: `translateX(${(1 - k) * (i % 2 ? 700 : -700)}px)`, background: '#fff', borderRadius: 30, boxShadow: '0 18px 44px rgba(19,41,107,0.16)', overflow: 'hidden', display: 'flex', alignItems: 'center'}}>
      <div style={{position: 'relative', width: lerp(330, 200, shrink), height: '100%', flexShrink: 0, background: SAGE}}>{ph ? <Photo src={ph} at={a} /> : <Img src={PG(93)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top'}} />}</div>
      <div style={{display: 'flex', alignItems: 'center', gap: 20, padding: '0 28px'}}><div style={{width: 90, height: 90, borderRadius: 26, background: c, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}><Ic size={56} color="#fff" /></div><div style={{fontFamily: FONT, fontWeight: 900, fontSize: 44, color: NAVY, lineHeight: 1.05}}>{l}</div></div>
    </div> : null; })}
    {t > 10.3 && [0, 1, 2, 3, 4].map((i) => { const a = t * 0.9 + i * 1.256; return <div key={i} style={{position: 'absolute', left: 540 + Math.cos(a) * 420 - 40, top: 1190 + Math.sin(a) * 230 - 60, zIndex: 12, fontFamily: FONT, fontWeight: 900, fontSize: 120, color: i % 2 ? GREEN : NAVY, opacity: 0.16 * eo((t - 10.3) / 0.6), transform: `rotate(${Math.sin(t + i) * 20}deg)`}}>?</div>; })}
    {QS.map(([l, a, side], i) => { const k = Math.min(1.06, pop(t, a, 12, 9)); return t >= a ? <div key={l} style={{position: 'absolute', left: side ? 540 : 60, top: 830 + i * 230, zIndex: 20, transform: `scale(${k})`, transformOrigin: side ? 'right center' : 'left center', ...(side ? {left: undefined, right: 60} : {})}}>
      <div style={{background: i === 2 ? GREEN : NAVY, color: '#fff', borderRadius: 34, padding: '26px 40px', fontFamily: FONT, fontWeight: 900, fontSize: 52, boxShadow: '0 16px 40px rgba(19,41,107,0.28)', whiteSpace: 'nowrap'}}>{l}</div>
      <div style={{position: 'absolute', [side ? 'right' : 'left']: 60, bottom: -26, width: 0, height: 0, borderLeft: '22px solid transparent', borderRight: '22px solid transparent', borderTop: `30px solid ${i === 2 ? GREEN : NAVY}`}} />
    </div> : null; })}
  </>;
};
const Rays: React.FC<{at: number; y: number; c?: string}> = ({at, y, c = 'rgba(31,163,110,0.16)'}) => {
  const t = useT();
  if (t < at) return null;
  return <div style={{position: 'absolute', left: 540 - 900, top: y - 900, width: 1800, height: 1800, zIndex: 5, opacity: eo((t - at) / 0.8), background: `repeating-conic-gradient(from ${t * 12}deg, ${c} 0deg 9deg, transparent 9deg 22deg)`, maskImage: 'radial-gradient(circle, #000 20%, transparent 65%)', WebkitMaskImage: 'radial-gradient(circle, #000 20%, transparent 65%)'}} />;
};
const Reveal: React.FC = () => {
  const t = useT();
  const k = eo((t - 17.7) / 1.3);
  const ry = lerp(-200, -16, k) + (t > 19 ? Math.sin((t - 19) * 0.9) * 9 : 0);
  return <>
    <Rays at={17.7} y={720} />
    <Title y={210} at={17.7} l="Découvrez" fs={52} c={GREEN} />
    <BookStage x={540} y={300} w={500} ry={ry} rx={lerp(30, 6, k)} rz={lerp(-12, 0, k)} scale={lerp(0.35, 1, k)} shineAt={[19.1, 23.0]} floor={k} />
    {t > 25.0 && <div style={{position: 'absolute', left: 790, top: 270, zIndex: 30, width: 190, height: 190, borderRadius: 95, background: EARTH, color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontWeight: 900, transform: `scale(${Math.min(1.1, pop(t, 25.0, 13, 8))}) rotate(${12 + Math.sin(t * 2) * 4}deg)`, boxShadow: '0 12px 30px rgba(184,105,46,0.45)'}}><div style={{fontSize: 70, lineHeight: 1}}><Count v={127} at={25.0} dur={0.6} /></div><div style={{fontSize: 26}}>pages</div></div>}
    <Chip x={190} y={1250} at={21.65} l="Comprendre" Ic={Lightbulb} c={NAVY} fs={30} />
    <Chip x={540} y={1250} at={22.36} l="Interpréter" Ic={Search} c={GREEN} fs={30} />
    <Chip x={890} y={1250} at={23.24} l="Mettre en œuvre" Ic={Wrench} c={OLIVE} fs={28} />
    <Chip x={540} y={1390} at={24.48} l="Les nouvelles exigences 2026" Ic={ListChecks} c={GREEN} fs={34} dark={false} />
  </>;
};
const YEARS: [string, string, number][] = [['1996', '1ʳᵉ édition', 26.82], ['2015', '3ᵉ édition', 34.42], ['2024', 'Amendement climat', 34.73], ['2026', '4ᵉ édition', 36.06]];
const Frise: React.FC = () => {
  const t = useT();
  const lineK = Math.max(prog(t, 26.6, 27.4, easeOut) * 0.25, prog(t, 34.2, 36.2, easeInOut));
  return <>
    <Title y={220} at={26.4} l="La référence mondiale" fs={66} />
    <div style={{position: 'absolute', left: 110, top: 520, width: 860 * Math.max(0.25, lineK) * (t > 26.6 ? 1 : 0), height: 14, borderRadius: 7, background: `linear-gradient(90deg, ${OLIVE}, ${GREEN})`, zIndex: 15}} />
    {YEARS.map(([y, l, a], i) => { const x = 110 + [0, 0.62, 0.8, 1][i] * 860; const k = Math.min(1.08, pop(t, a, 13, 9)); const last = i === 3; return t >= a ? <div key={y} style={{position: 'absolute', left: x, top: 527, zIndex: 18, transform: 'translate(-50%, -50%)'}}>
      <div style={{width: last ? 58 : 40, height: last ? 58 : 40, borderRadius: '50%', background: last ? GREEN : '#fff', border: `8px solid ${last ? '#fff' : OLIVE}`, transform: `scale(${k})`, boxShadow: last ? '0 0 0 10px rgba(31,163,110,0.3)' : 'none', margin: '0 auto'}} />
      <div style={{position: 'absolute', left: '50%', bottom: 70, transform: `translateX(-50%) translateY(${(1 - Math.min(1, k)) * 30}px)`, fontFamily: FONT, fontWeight: 900, fontSize: last ? 58 : 44, color: last ? GREEN : OLIVE, opacity: Math.min(1, k)}}>{y}</div>
      <div style={{position: 'absolute', left: '50%', top: 72, transform: 'translateX(-50%)', whiteSpace: 'nowrap', fontFamily: FONT, fontWeight: 800, fontSize: 22, color: NAVY, background: '#fff', borderRadius: 12, padding: '6px 10px', opacity: Math.min(1, k), boxShadow: '0 6px 16px rgba(19,41,107,0.12)', ...(i === 2 ? {top: 120} : {})}}>{l}</div>
    </div> : null; })}
    <Card x={60} y={760} w={960} h={480} at={28.6} from="zoom" out={37.2}>
      <Photo src="planete.jpg" at={28.6} z0={1.0} z1={1.15} />
      <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(14,26,58,0.15), rgba(14,26,58,0.78))'}} />
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 40, textAlign: 'center', color: '#fff', fontFamily: FONT, fontWeight: 900}}>
        <div style={{fontSize: 34, opacity: eo((t - 30.3) / 0.4)}}>utilisée par plus de</div>
        <div style={{fontSize: 140, lineHeight: 1, color: '#8FE3B8'}}>{t > 31.8 ? <Count v={400000} at={31.8} dur={1.4} /> : '0'}</div>
        <div style={{fontSize: 40, opacity: eo((t - 32.35) / 0.4)}}>organismes certifiés</div>
      </div>
    </Card>
    <Page n={14} x={80} y={1290} w={220} at={27.2} rot={-7} out={37.2} />
    <Stamp x={660} y={1420} at={36.49} l="4ᵉ ÉDITION" c={GREEN} fs={70} rot={-7} />
  </>;
};
const AXES: [string, string, LucideIcon, string, number][] = [['Changement climatique', 'auditeur-climat.jpg', Thermometer, RED, 40.66], ['Conditions environnementales', 'prelevement-eau.jpg', Leaf, GREEN, 43.43], ['Alignement Annexe SL', 'direction.jpg', Puzzle, NAVY, 45.38], ['Clarification des termes', 'audit.jpg', BookA, EARTH, 47.16]];
const Axes: React.FC = () => {
  const t = useT();
  const m = prog(t, 40.2, 40.9, easeInOut);
  return <>
    <Title y={220} at={37.7} l="4 axes de révision" fs={70} />
    {t > 37.9 && <div style={{position: 'absolute', left: lerp(290, 60, m), top: lerp(370, 380, m), width: lerp(500, 250, m), height: lerp(750, 375, m), zIndex: 16, background: PAPER, borderRadius: 6, boxShadow: '0 22px 50px rgba(46,43,28,0.3)', overflow: 'hidden', opacity: eo((t - 37.9) / 0.4), transform: `rotate(${lerp(0, -4, m)}deg)`}}>
      <Img src={PG(18)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      <div style={{position: 'absolute', left: '8%', top: '31%', height: '4%', width: `${84 * prog(t, 38.4, 39.2, easeInOut)}%`, background: 'rgba(31,163,110,0.35)', mixBlendMode: 'multiply'}} />
      {[0, 1, 2, 3].map((i) => <div key={i} style={{position: 'absolute', left: '6%', top: `${[40.5, 52, 62, 77][i]}%`, width: '8%', height: '5%', borderRadius: 6, background: AXES[i][3], opacity: cl((t - AXES[i][4]) / 0.3)}} />)}
    </div>}
    {t > 38.9 && <div style={{position: 'absolute', left: 820, top: 420, zIndex: 25, width: 160, height: 160, borderRadius: 80, background: GREEN, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 100, transform: `scale(${Math.min(1.1, pop(t, 39.32, 13, 8))})`, boxShadow: '0 12px 30px rgba(31,163,110,0.4)'}}>4</div>}
    <NormRef at={41.0} dur={3.8} l="ISO 14001:2026 § 4.1 et § 4.2" sub="AXE 1 · CLIMAT INTÉGRÉ" x={340} y={630} />
    <NormRef at={45.6} dur={2.4} l="Annexe SL · structure HLS" sub="AXE 3 · ALIGNEMENT" x={340} y={630} />
    {AXES.map(([l, ph, Ic, c, a], i) => { const k = eo((t - a) / 0.55); const x = 60 + (i % 2) * 490, y = 820 + Math.floor(i / 2) * 360; return t >= a ? <div key={l} style={{position: 'absolute', left: x, top: y, width: 470, height: 330, zIndex: 18, perspective: 1400}}>
      <div style={{width: '100%', height: '100%', borderRadius: 28, overflow: 'hidden', position: 'relative', transform: `rotateY(${(1 - k) * 90}deg)`, boxShadow: '0 18px 44px rgba(19,41,107,0.22)', background: '#fff'}}>
        <Photo src={ph} at={a} />
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 30%, rgba(14,26,58,0.85))'}} />
        <div style={{position: 'absolute', left: 18, top: 18, width: 70, height: 70, borderRadius: 20, background: c, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 44}}>{i + 1}</div>
        <div style={{position: 'absolute', left: 20, right: 20, bottom: 18, display: 'flex', alignItems: 'center', gap: 14, color: '#fff', fontFamily: FONT, fontWeight: 900, fontSize: 34, lineHeight: 1.05}}><Ic size={48} color="#8FE3B8" style={{flexShrink: 0}} />{l}</div>
      </div>
    </div> : null; })}
  </>;
};
const Philo: React.FC = () => {
  const t = useT();
  const a1 = prog(t, 52.13, 52.9, easeOut), a2 = prog(t, 55.62, 56.4, easeOut);
  const circ = (x: number, at: number, child: React.ReactNode, l: string, c: string) => { const k = Math.min(1.06, pop(t, at, 11, 10)); return <div style={{position: 'absolute', left: x - 170, top: 440, width: 340, zIndex: 18, transform: `scale(${k})`, textAlign: 'center'}}>
    <div style={{width: 340, height: 340, borderRadius: 170, overflow: 'hidden', position: 'relative', border: `12px solid ${c}`, boxShadow: '0 18px 44px rgba(19,41,107,0.25)', background: '#fff'}}>{child}</div>
    <div style={{marginTop: 14, fontFamily: FONT, fontWeight: 900, fontSize: 38, color: c}}>{l}</div>
  </div>; };
  return <>
    <div style={{position: 'absolute', left: 0, right: 0, top: 230, zIndex: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, transform: `scale(${Math.min(1.06, pop(t, 48.5, 12, 9))})`}}><div style={{width: 110, height: 110, borderRadius: 55, background: '#F5B400', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `rotate(${Math.sin(t * 3) * 12}deg)`}}><Key size={64} color="#fff" strokeWidth={2.6} /></div><div style={{fontFamily: FONT, fontWeight: 900, fontSize: 70, color: NAVY}}>Une idée clé</div></div>
    {circ(230, 49.6, <Photo src="terrain.jpg" at={49.6} />, 'Mon organisme', NAVY)}
    {circ(850, 50.2, <div style={{position: 'absolute', inset: 0, backgroundImage: `url(${PH('couverture.jpg')})`, backgroundSize: '216% auto', backgroundPosition: '50% 56%', transform: `scale(${1.05 + 0.05 * Math.sin(t)})`}} />, 'Environnement', GREEN)}
    <svg width={1080} height={420} style={{position: 'absolute', left: 0, top: 440, zIndex: 19}}>
      <defs><marker id="ah1" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill={NAVY} /></marker><marker id="ah2" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill={EARTH} /></marker></defs>
      {a1 > 0 && <path d={`M 410 120 Q 540 40 ${lerp(410, 670, a1)} ${lerp(120, 120, a1)}`} fill="none" stroke={NAVY} strokeWidth={14} strokeLinecap="round" markerEnd="url(#ah1)" />}
      {a2 > 0 && <path d={`M 670 240 Q 540 320 ${lerp(670, 410, a2)} 240`} fill="none" stroke={EARTH} strokeWidth={14} strokeLinecap="round" markerEnd="url(#ah2)" />}
    </svg>
    <Card x={60} y={930} w={960} h={170} at={51.58} from="left"><div style={{display: 'flex', alignItems: 'center', gap: 24, height: '100%', padding: '0 34px', borderLeft: `18px solid ${NAVY}`}}><Factory size={70} color={NAVY} style={{flexShrink: 0}} /><div style={{fontFamily: FONT, fontWeight: 900, fontSize: 42, color: NAVY, lineHeight: 1.1}}>« Quel est mon impact sur l'environnement ? »</div></div></Card>
    <Card x={60} y={1130} w={960} h={170} at={54.6} from="right"><div style={{display: 'flex', alignItems: 'center', gap: 24, height: '100%', padding: '0 34px', borderLeft: `18px solid ${EARTH}`}}><Sun size={70} color={EARTH} style={{flexShrink: 0}} /><div style={{fontFamily: FONT, fontWeight: 900, fontSize: 40, color: OLIVE, lineHeight: 1.1}}>« Comment l'environnement affecte-t-il mon activité ? »</div></div></Card>
    {t > 53.7 && t < 54.6 && <div style={{position: 'absolute', left: 0, right: 0, top: 1150, zIndex: 20, textAlign: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 56, color: GREEN, opacity: eo((t - 53.74) / 0.25)}}>… mais aussi</div>}
    <Stamp x={540} y={1430} at={56.4} l="DANS LES DEUX SENS" c={GREEN} fs={58} rot={-5} />
  </>;
};
const PARTS: [string, string, number, string][] = [['I', 'Comprendre', 59.01, NAVY], ['II', 'Maîtriser', 60.98, GREEN], ['III', 'Auditer', 63.83, EARTH], ['IV', 'S\'exercer', 65.31, OLIVE]];
const Contenu: React.FC = () => {
  const t = useT();
  return <>
    <div style={{position: 'absolute', left: 0, right: 0, top: 230, zIndex: 20, display: 'flex', justifyContent: 'center', gap: 40, fontFamily: FONT, fontWeight: 900}}>
      {[[4, 'parties', 57.4, NAVY], [8, 'chapitres', 58.25, GREEN]].map(([v, l, a, c]) => <div key={l as string} style={{display: 'flex', alignItems: 'baseline', gap: 14, transform: `scale(${Math.min(1.08, pop(t, a as number, 13, 9))})`}}><span style={{fontSize: 120, color: c as string, lineHeight: 1}}>{v as number}</span><span style={{fontSize: 52, color: INK}}>{l as string}</span></div>)}
    </div>
    <OpenBook x={70} y={450} pw={470} at={57.2} spreads={[[4, 5], [10, 11], [20, 21], [42, 43], [52, 53], [54, 55], [60, 61]]} flips={[58.9, 60.85, 63.7, 65.2, 66.55, 67.8]} />
    {PARTS.map(([n, l, a, c], i) => { const k = Math.min(1.08, pop(t, a, 13, 9)); const on = t >= a && (i === 3 || t < PARTS[i + 1][2]); return t >= a ? <div key={n} style={{position: 'absolute', left: 60 + i * 245, top: 1250, width: 225, zIndex: 22, transform: `scale(${k * (on ? 1.06 : 0.96)})`, background: on ? c : '#fff', color: on ? '#fff' : c, border: `4px solid ${c}`, borderRadius: 22, padding: '12px 0', textAlign: 'center', fontFamily: FONT, fontWeight: 900, boxShadow: '0 10px 24px rgba(19,41,107,0.18)'}}><div style={{fontSize: 24, opacity: 0.85}}>PARTIE {n}</div><div style={{fontSize: 32}}>{l}</div></div> : null; })}
    <Chip x={300} y={1470} at={67.07} l="Étude de cas NatéoPack" Ic={Factory} c={EARTH} fs={30} />
    {t > 67.97 && <div style={{position: 'absolute', left: 640, top: 1405, zIndex: 24, width: 360, height: 130, borderRadius: 26, background: NAVY, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, fontFamily: FONT, fontWeight: 900, transform: `scale(${Math.min(1.08, pop(t, 67.97, 13, 8))}) rotate(${Math.sin(t * 5) * 2}deg)`, boxShadow: '0 12px 28px rgba(19,41,107,0.3)'}}><span style={{fontSize: 40}}>Quiz</span><span style={{fontSize: 76, color: '#8FE3B8'}}><Count v={12} at={68.37} dur={0.4} /></span><span style={{fontSize: 30}}>questions</span></div>}
  </>;
};
const FICHES = [63, 64, 67, 69, 72, 76, 78];
const TOOLS: [number, string, LucideIcon, number][] = [[83, 'Diagnostic de transition', ClipboardCheck, 74.02], [87, 'Audit interne clause par clause', ListChecks, 76.19], [84, 'Politique environnementale', FileText, 78.57]];
const Outils: React.FC = () => {
  const t = useT();
  const up = prog(t, 73.4, 74.0, easeInOut);
  return <>
    <div style={{position: 'absolute', left: 0, right: 0, top: 220, zIndex: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 18, transform: `scale(${Math.min(1.05, pop(t, 69.1, 12, 9))})`}}><Wrench size={66} color={GREEN} strokeWidth={2.6} style={{transform: `rotate(${Math.sin(t * 4) * 15}deg)`}} /><div style={{fontFamily: FONT, fontWeight: 900, fontSize: 60, color: NAVY}}>Des outils prêts à l'emploi</div></div>
    {FICHES.map((n, i) => { const a = 71.0 + i * 0.16; const ang = (i - 3) * 9; const k = eo((t - a) / 0.45); const cx = 540 + (i - 3) * lerp(105, 80, up), cy = lerp(720, 560, up); return t >= a ? <div key={n} style={{position: 'absolute', left: cx - 120, top: cy - 180 + (1 - k) * -600, width: 240, height: 360, zIndex: 16 + i, transform: `rotate(${ang * k}deg) scale(${lerp(1, 0.78, up)})`, transformOrigin: '50% 120%', background: PAPER, borderRadius: 6, boxShadow: '0 16px 34px rgba(46,43,28,0.3)', overflow: 'hidden', opacity: k}}><Img src={PG(n)} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div> : null; })}
    {t > 72.19 && <div style={{position: 'absolute', left: 540 - 210, top: lerp(1000, 770, up), zIndex: 30, width: 420, height: 110, borderRadius: 55, background: GREEN, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, fontFamily: FONT, fontWeight: 900, fontSize: 40, transform: `scale(${Math.min(1.08, pop(t, 72.19, 13, 9))})`, boxShadow: '0 12px 28px rgba(31,163,110,0.4)'}}><span style={{fontSize: 70}}>7</span>fiches pratiques</div>}
    {TOOLS.map(([n, l, Ic, a], i) => <React.Fragment key={n}>
      <Page n={n} x={60 + i * 335} y={900} w={290} at={a} rot={[-4, 2, 5][i]} z={20} />
      <Chip x={205 + i * 335} y={1355} at={a + 0.3} l={l} Ic={Ic} c={[NAVY, EARTH, GREEN][i]} fs={i === 1 ? 19 : 21} />
    </React.Fragment>)}
    {t > 80.9 && <div style={{position: 'absolute', left: 540 - 380, top: 1440, zIndex: 32, width: 760, height: 150, borderRadius: 34, background: NAVY, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 22, fontFamily: FONT, fontWeight: 900, transform: `scale(${Math.min(1.08, pop(t, 80.9, 12, 9))})`, boxShadow: '0 16px 36px rgba(19,41,107,0.35)'}}><span style={{fontSize: 100, color: '#8FE3B8', lineHeight: 1}}>{t > 82.15 ? <Count v={189} at={82.15} dur={0.7} /> : '0'}</span><span style={{fontSize: 38, lineHeight: 1.05}}>exigences<br />commentées</span></div>}
  </>;
};
const PHASES: [string, string, string, number][] = [['Diagnostic', '2026', NAVY, 91.4], ['Mise à niveau', '2027', GREEN, 91.7], ['Consolidation', '2027 – 2028', EARTH, 92.0], ['Certification', '2028 – 2029', OLIVE, 92.3]];
const Transition: React.FC = () => {
  const t = useT();
  const fill = prog(t, 85.0, 88.23, easeInOut);
  const alarm = t > 88.23 && t < 90.0;
  return <>
    {alarm && <AbsoluteFill style={{zIndex: 6, background: `rgba(224,49,49,${0.10 + 0.08 * Math.sin((t - 88.23) * 18)})`}} />}
    <Title y={220} at={84.1} l="Transition : top départ" fs={62} />
    <Card x={60} y={360} w={960} h={300} at={84.3} from="zoom"><div style={{padding: '40px 50px'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: FONT, fontWeight: 900, fontSize: 40, color: NAVY}}>{['2026', '2027', '2028', '2029'].map((y, i) => <span key={y} style={{color: i === 3 && t > 88.23 ? RED : fill >= i / 3 ? GREEN : GREY, transform: `scale(${i === 3 && t > 88.23 ? 1.2 + 0.08 * Math.sin(t * 10) : 1})`}}>{y}</span>)}</div>
      <div style={{marginTop: 34, height: 60, background: '#EEF2F0', borderRadius: 30, overflow: 'hidden', position: 'relative'}}><div style={{width: `${fill * 100}%`, height: '100%', background: `linear-gradient(90deg, ${GREEN}, ${t > 88.23 ? RED : '#37C98C'})`, borderRadius: 30}} />
        <div style={{position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(-45deg, rgba(255,255,255,0.18) 0 18px, transparent 18px 36px)', backgroundPosition: `${t * 60}px 0`}} /></div>
      <div style={{marginTop: 22, textAlign: 'center', fontFamily: FONT, fontWeight: 800, fontSize: 30, color: OLIVE}}>Certifiés ISO 14001:2015 → ISO 14001:2026</div>
    </div></Card>
    {t > 88.23 && <div style={{position: 'absolute', left: 60, top: 720, zIndex: 30, display: 'flex', alignItems: 'center', gap: 20, transform: `scale(${Math.min(1.08, pop(t, 88.23, 14, 8))})`, transformOrigin: 'left center'}}><div style={{fontFamily: FONT, fontWeight: 900, fontSize: 150, color: RED, lineHeight: 1}}>2029</div><div style={{fontFamily: FONT, fontWeight: 900, fontSize: 40, color: INK, lineHeight: 1.1}}>date limite<br />pour migrer</div></div>}
    <Gyro x={900} y={800} at={88.1} out={93.3} size={140} />
    <Page n={46} x={60} y={960} w={300} at={90.0} rot={-5} z={18} />
    {PHASES.map(([l, y, c, a], i) => { const k = eo((t - a) / 0.4); return t >= a ? <div key={l} style={{position: 'absolute', left: 400, top: 950 + i * 118, width: 620, height: 104, zIndex: 20, opacity: k, transform: `translateX(${(1 - k) * 500}px)`, background: '#fff', borderRadius: 22, boxShadow: '0 10px 26px rgba(19,41,107,0.14)', display: 'flex', alignItems: 'center', gap: 18, padding: '0 20px', borderLeft: `16px solid ${c}`}}>
      <div style={{width: 62, height: 62, borderRadius: 31, background: c, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 36, flexShrink: 0}}>{i + 1}</div>
      <div style={{flex: 1, fontFamily: FONT, fontWeight: 900, fontSize: 36, color: NAVY}}>{l}</div>
      <div style={{fontFamily: FONT, fontWeight: 800, fontSize: 26, color: GREY}}>{y}</div>
    </div> : null; })}
    <Chip x={540} y={1530} at={92.58} l="Calendrier en 4 phases" Ic={CalendarClock} c={GREEN} fs={32} />
  </>;
};
const WHO: [string, string, LucideIcon, number][] = [['Responsables environnement', 'prelevement-eau.jpg', Leaf, 93.53], ['Auditeurs', 'audit.jpg', ClipboardCheck, 95.05], ['Consultants', 'poignee.jpg', Briefcase, 95.56], ['Dirigeants', 'direction.jpg', Building2, 96.06]];
const PourQui: React.FC = () => {
  const t = useT();
  return <>
    <Title y={220} at={93.4} l="Pour qui ?" fs={76} />
    {WHO.map(([l, ph, Ic, a], i) => { const k = Math.min(1.06, pop(t, a, 12, 10)); const x = 60 + (i % 2) * 490, y = 380 + Math.floor(i / 2) * 520; return t >= a ? <div key={l} style={{position: 'absolute', left: x, top: y, width: 470, height: 490, zIndex: 18, transform: `scale(${k})`, borderRadius: 30, overflow: 'hidden', boxShadow: '0 18px 44px rgba(19,41,107,0.2)', background: '#fff'}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 350}}><Photo src={ph} at={a} /></div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 350, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, padding: '0 16px', fontFamily: FONT, fontWeight: 900, fontSize: i === 0 ? 30 : 38, color: NAVY, textAlign: 'center', lineHeight: 1.05}}><Ic size={44} color={GREEN} style={{flexShrink: 0}} />{l}</div>
      {t > 97.53 && <div style={{position: 'absolute', right: 16, top: 16, width: 70, height: 70, borderRadius: 35, background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${Math.min(1.1, pop(t, 97.6 + i * 0.12, 14, 8))})`}}><UserCheck size={40} color="#fff" /></div>}
    </div> : null; })}
    <Stamp x={540} y={1500} at={97.7} l="FAIT POUR VOUS" c={GREEN} fs={64} rot={-4} />
  </>;
};
const Cta: React.FC = () => {
  const t = useT();
  const k = eo((t - 99.5) / 1.2);
  const out = t > OUTRO_AT ? prog(t, OUTRO_AT + 3.2, OUTRO_AT + 4.0) : 0;
  const press = t > 102.2 && t < 102.5;
  return <AbsoluteFill style={{zIndex: 45, opacity: 1 - out}}>
    <Rays at={99.5} y={560} c="rgba(184,105,46,0.13)" />
    <BookStage x={540} y={190} w={420} ry={lerp(-150, -22, k) + Math.sin(t * 0.8) * 7} rx={6} scale={lerp(0.5, 1, k)} shineAt={[100.6, 104.6]} floor={k} />
    <div style={{position: 'absolute', left: 0, right: 0, top: 900, textAlign: 'center', fontFamily: FONT, fontWeight: 900, color: OLIVE, lineHeight: 1.05, clipPath: `inset(0 ${(1 - prog(t, 99.67, 100.6, easeOut)) * 100}% 0 0)`}}><div style={{fontSize: 72}}>DÉCRYPTER L'ISO 14001</div><div style={{fontSize: 46, color: GREEN, marginTop: 6}}>VERSION 2026</div></div>
    {t > 101.49 && <div style={{position: 'absolute', left: 540 - 300, top: 1080, width: 600, height: 130, zIndex: 50, borderRadius: 65, background: `linear-gradient(90deg, ${GREEN}, #17845A)`, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, fontFamily: FONT, fontWeight: 900, fontSize: 52, letterSpacing: 2, transform: `scale(${Math.min(1.08, pop(t, 101.49, 13, 8)) * (press ? 0.93 : 1 + 0.035 * Math.sin(t * 6))})`, boxShadow: `0 0 0 ${12 + 10 * Math.abs(Math.sin(t * 3))}px rgba(31,163,110,0.22), 0 18px 40px rgba(31,163,110,0.45)`}}><ShoppingCart size={58} />COMMANDER</div>}
    {t > 101.6 && t < 103.4 && <div style={{position: 'absolute', left: lerp(900, 640, prog(t, 101.7, 102.2, easeInOut)), top: lerp(1450, 1160, prog(t, 101.7, 102.2, easeInOut)), zIndex: 60}}>{t > 102.2 && t < 102.7 && <div style={{position: 'absolute', left: -50 - (t - 102.2) * 120, top: -50 - (t - 102.2) * 120, width: 100 + (t - 102.2) * 240, height: 100 + (t - 102.2) * 240, borderRadius: '50%', border: '6px solid #fff', opacity: 1 - (t - 102.2) / 0.5}} />}<MousePointer2 size={76} color="#fff" fill={INK} strokeWidth={1.6} style={{filter: 'drop-shadow(3px 4px 4px rgba(0,0,0,0.35))'}} /></div>}
    <div style={{position: 'absolute', left: 0, right: 0, top: 1250, textAlign: 'center', fontFamily: FONT, fontWeight: 800, fontSize: 40, color: NAVY, opacity: eo((t - 102.76) / 0.4)}}>Votre exemplaire, dès maintenant</div>
    <div style={{position: 'absolute', left: 0, right: 0, top: 1330, display: 'flex', justifyContent: 'center', opacity: eo((t - 104.2) / 0.5), transform: `translateY(${(1 - eo((t - 104.2) / 0.5)) * 40}px)`}}><div style={{background: '#fff', borderRadius: 30, padding: '10px 30px', boxShadow: '0 14px 34px rgba(19,41,107,0.16)'}}><Img src={LOGO} style={{height: 150}} /></div></div>
    <div style={{position: 'absolute', left: 0, right: 0, top: 1540, textAlign: 'center', fontFamily: FONT, fontWeight: 700, fontSize: 29, color: OLIVE, opacity: eo((t - 104.9) / 0.5)}}>Cabinet de Conseil <span style={{color: GREEN}}>•</span> Formation <span style={{color: GREEN}}>•</span> Audit <span style={{color: GREEN}}>•</span> Accompagnement QHSE</div>
    {t > 105.2 && <div style={{position: 'absolute', left: 780, top: 230, zIndex: 50, width: 170, height: 170, borderRadius: 85, background: EARTH, color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontWeight: 900, transform: `scale(${Math.min(1.1, pop(t, 105.2, 13, 8))}) rotate(${10 + Math.sin(t * 2) * 4}deg)`}}><Award size={56} /><div style={{fontSize: 24, textAlign: 'center', lineHeight: 1.05}}>Édition<br />2026</div></div>}
  </AbsoluteFill>;
};

const SC: [React.FC, number, number][] = [[Hook, 0, 7.1], [Problem, 7.1, 17.55], [Reveal, 17.55, 26.25], [Frise, 26.25, 37.55], [Axes, 37.55, 48.25], [Philo, 48.25, 57.1], [Contenu, 57.1, 68.9], [Outils, 68.9, 83.9], [Transition, 83.9, 93.3], [PourQui, 93.3, 99.4], [Cta, 99.4, 999]];
const Cam: React.FC<{children: React.ReactNode}> = ({children}) => {
  const t = useT();
  const a = [...CUTS].reverse().find((c) => t >= c) ?? 0;
  const punch = 1 + 0.05 * Math.exp(-(t - a) * 4) + 0.012 * Math.sin(t * 0.7);
  return <AbsoluteFill style={{transform: `scale(${punch})`, transformOrigin: '50% 45%'}}>{children}</AbsoluteFill>;
};
const CUES: Sfx[] = [
  ...[0.13, 0.26, 0.39].map((at) => ({at, s: 'page', v: 0.25})), {at: 0.68, s: 'deep-hit', v: 0.3}, {at: 1.82, s: 'tampon', v: 0.38}, {at: 1.9, s: 'alarme', v: 0.09, dur: 1.5},
  ...[2.4, 3.3].map((at) => ({at, s: 'sfx/swish', v: 0.22})), {at: 6.02, s: 'sfx/pop', v: 0.3},
  ...CUTS.map((at) => ({at: at - 0.42, s: 'page', v: 0.42})), ...CUTS.map((at) => ({at: at - 0.4, s: 'soft-whoosh', v: 0.18})),
  ...[7.24, 8.24, 9.54].map((at) => ({at, s: 'sfx/swish', v: 0.24})), ...[10.37, 12.39, 14.52].map((at) => ({at, s: 'sfx/pop', v: 0.26})),
  {at: 17.6, s: 'riser', v: 0.22, dur: 1.4}, {at: 18.9, s: 'deep-hit', v: 0.32}, ...[21.65, 22.36, 23.24, 24.48].map((at) => ({at, s: 'sfx/pop', v: 0.22})), {at: 25.0, s: 'sfx/ding', v: 0.22},
  {at: 26.82, s: 'sfx/ding', v: 0.2}, {at: 28.6, s: 'sfx/swish', v: 0.2}, {at: 31.8, s: 'tick', v: 0.2}, {at: 33.2, s: 'validation', v: 0.22}, ...[34.42, 34.73, 36.06].map((at) => ({at, s: 'sfx/ding', v: 0.2})), {at: 36.49, s: 'tampon', v: 0.35},
  {at: 37.9, s: 'page', v: 0.3}, {at: 39.32, s: 'sfx/pop', v: 0.26}, ...[40.66, 43.43, 45.38, 47.16].map((at) => ({at, s: 'sfx/swish', v: 0.25})), ...[41.0, 45.6].map((at) => ({at, s: 'sfx/click', v: 0.22})),
  {at: 48.5, s: 'sfx/ding', v: 0.22}, ...[49.6, 50.2].map((at) => ({at, s: 'sfx/pop', v: 0.22})), ...[52.13, 55.62].map((at) => ({at, s: 'soft-whoosh', v: 0.3})), ...[51.58, 54.6].map((at) => ({at, s: 'sfx/swish', v: 0.2})), {at: 56.4, s: 'tampon', v: 0.35},
  {at: 57.4, s: 'sfx/pop', v: 0.22}, {at: 58.25, s: 'sfx/pop', v: 0.22}, ...[58.9, 60.85, 63.7, 65.2, 66.55, 67.8].map((at) => ({at, s: 'page', v: 0.4})), {at: 67.97, s: 'sfx/ding', v: 0.22},
  ...[0, 1, 2, 3, 4, 5, 6].map((i) => ({at: 71.0 + i * 0.16, s: 'page', v: 0.18})), {at: 72.19, s: 'sfx/pop', v: 0.26}, ...[74.02, 76.19, 78.57].map((at) => ({at, s: 'tampon', v: 0.25})), {at: 80.9, s: 'sfx/swish', v: 0.22}, {at: 82.15, s: 'tick', v: 0.22}, {at: 82.9, s: 'validation', v: 0.22},
  {at: 85.0, s: 'sfx/rise', v: 0.18, dur: 3.2}, {at: 88.23, s: 'alarme', v: 0.14, dur: 1.8}, {at: 88.23, s: 'deep-hit', v: 0.32}, {at: 90.0, s: 'page', v: 0.3}, ...[91.4, 91.7, 92.0, 92.3].map((at) => ({at, s: 'sfx/click', v: 0.22})),
  ...[93.53, 95.05, 95.56, 96.06].map((at) => ({at, s: 'sfx/pop', v: 0.24})), {at: 97.7, s: 'tampon', v: 0.35},
  {at: 99.5, s: 'riser', v: 0.22, dur: 2.0}, {at: 101.49, s: 'sfx/ding', v: 0.25}, {at: 102.2, s: 'sfx/click', v: 0.35}, {at: 102.25, s: 'validation', v: 0.25}, {at: OUTRO_AT - 1.4, s: 'signature-marque', v: 0.5, dur: 3.5},
];

export const LivreIso14001: React.FC = () => {
  const t = useT();
  return <AbsoluteFill style={{background: BG, fontFamily: FONT}}>
    <Backdrop />
    <Floaters />
    <Cam>{SC.map(([C, a, b]) => (t >= a - 0.05 && t < b + 0.05 ? <C key={a} /> : null))}</Cam>
    <Header />
    {CUTS.map((a) => <PageTurn key={a} at={a} />)}
    <Captions />
    <Progress />
    <Audio src={PH('voix-livre-iso14001.mp3')} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>;
};
