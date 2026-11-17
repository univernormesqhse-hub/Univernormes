/**
 * Photo de couverture Facebook UNIVERSNORMES QHSE — image fixe 1640 × 856 (ordinateur + mobile), trois compositions :
 * A « Centre » (logo au centre, piliers en ligne lumineuse dessous), B « Diagonale » (composition inclinée, traînées),
 * C « Orbite » (piliers sur une orbite autour du logo). Zone de sécurité : rectangle central 1300 × 500
 * (x 170 → 1470, y 178 → 678) ; coin bas-gauche laissé au fond (photo de profil).
 * Palette : marine #082B66, vert #22B573, blanc, gris clair #F3F5F7 ; Montserrat 800-900.
 * Le temps `t` (secondes) pilote les effets : 0 pour l'image fixe, boucle pour la version animée.
 */
import React from 'react';
import {AbsoluteFill, Img, random, staticFile, useCurrentFrame} from 'remotion';
import {loadFont} from '@remotion/fonts';
import {BadgeCheck, Droplets, HardHat, Leaf} from 'lucide-react';

loadFont({family: 'Montserrat', url: staticFile('fonts/Montserrat.woff2'), weight: '100 900'});
const NAVY = '#082B66', GREEN = '#22B573', LIGHT = '#F3F5F7', DEEP = '#04163A';
const F = "'Montserrat', sans-serif";
export type CoverVariant = 'A' | 'B' | 'C';
export const PILLARS: [string, React.FC<{size?: number; color?: string; strokeWidth?: number}>][] = [['QUALITÉ', BadgeCheck], ['HYGIÈNE', Droplets], ['SÉCURITÉ', HardHat], ['ENVIRONNEMENT', Leaf]];
const SERVICES = ['FORMATION', 'AUDIT', 'CONSEIL'];
const ISO = 'ISO 9001 · ISO 14001 · ISO 45001';

/* ── fond : dégradé marine, grille en perspective, bokeh (profondeur de champ), particules, traînées ── */
export const CoverBg: React.FC<{W: number; H: number; t: number; tilt?: number; horizon?: number}> = ({W, H, t, tilt = 0, horizon = 0.62}) => {
  const parts = Array.from({length: 70}, (_, i) => {
    const z = random(`pz${i}`); const x = random(`px${i}`) * W, y0 = random(`py${i}`) * H;
    const y = ((y0 - t * (12 + z * 40)) % H + H) % H; const r = 1 + z * 2.6;
    return <div key={i} style={{position: 'absolute', left: x + Math.sin(t * 0.5 + i) * 6, top: y, width: r * 2, height: r * 2, borderRadius: '50%', background: GREEN, boxShadow: `0 0 ${6 + z * 10}px ${GREEN}`, opacity: 0.35 + z * 0.55}} />;
  });
  const bokeh = Array.from({length: 9}, (_, i) => {
    const x = random(`bx${i}`) * W, y = random(`by${i}`) * H, r = 30 + random(`br${i}`) * 70;
    return <div key={i} style={{position: 'absolute', left: x - r + Math.sin(t * 0.3 + i) * 10, top: y - r, width: r * 2, height: r * 2, borderRadius: '50%', background: i % 3 ? 'rgba(34,181,115,0.16)' : 'rgba(243,245,247,0.08)', filter: 'blur(14px)'}} />;
  });
  const trails = Array.from({length: 6}, (_, i) => {
    const y = H * (0.15 + i * 0.14) + random(`ty${i}`) * 40; const L = 260 + random(`tl${i}`) * 420; const x = ((random(`tx${i}`) * W + t * (180 + i * 30)) % (W + L)) - L;
    return <div key={i} style={{position: 'absolute', left: x, top: y, width: L, height: i % 2 ? 2 : 3, borderRadius: 2, background: `linear-gradient(90deg, transparent, ${i % 3 ? GREEN : '#FFFFFF'})`, opacity: 0.55, transform: `rotate(${-8 + tilt}deg)`, boxShadow: `0 0 10px ${GREEN}`}} />;
  });
  return (
    <AbsoluteFill style={{background: `radial-gradient(120% 90% at 50% 40%, #0E3A86 0%, ${NAVY} 40%, ${DEEP} 100%)`, overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: -W * 0.5, top: H * horizon, width: W * 2, height: H * 1.2, perspective: 600, perspectiveOrigin: '50% 0%'}}>
        <div style={{width: '100%', height: '100%', transform: 'rotateX(68deg)', transformOrigin: '50% 0%', backgroundImage: `linear-gradient(rgba(34,181,115,0.35) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(34,181,115,0.35) 1.5px, transparent 1.5px)`, backgroundSize: '70px 70px', backgroundPosition: `0 ${(t * 40) % 70}px`, maskImage: 'linear-gradient(180deg, transparent 0%, #000 25%, #000 60%, transparent 100%)', WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, #000 25%, #000 60%, transparent 100%)'}} />
      </div>
      <div style={{position: 'absolute', left: 0, top: H * horizon - 2, width: W, height: 4, background: `linear-gradient(90deg, transparent, ${GREEN}, transparent)`, opacity: 0.55, filter: 'blur(1px)'}} />
      {bokeh}{trails}{parts}
      <AbsoluteFill style={{background: 'radial-gradient(80% 70% at 50% 45%, transparent 55%, rgba(2,10,30,0.65) 100%)'}} />
    </AbsoluteFill>
  );
};

/* ── plaque du logo avec balayage de lumière ── */
export const LogoPlate: React.FC<{w: number; t: number; sweep?: number}> = ({w, t, sweep}) => {
  const s = sweep ?? ((t * 0.25 + 0.5) % 1);
  return (
    <div style={{position: 'relative', width: w, padding: w * 0.06, background: '#FFFFFF', borderRadius: w * 0.07, boxShadow: `0 30px 60px rgba(0,0,0,0.45), 0 0 0 3px rgba(34,181,115,0.5), 0 0 60px rgba(34,181,115,0.35)`, overflow: 'hidden', boxSizing: 'border-box'}}>
      <Img src={staticFile('promo/logo.png')} style={{width: '100%', display: 'block'}} />
      <div style={{position: 'absolute', top: -40, left: `${-40 + s * 160}%`, width: '14%', height: '200%', transform: 'rotate(18deg)', background: 'linear-gradient(90deg, transparent, rgba(34,181,115,0.12), rgba(255,255,255,0.45), rgba(34,181,115,0.12), transparent)', mixBlendMode: 'screen'}} />
    </div>
  );
};

/* ── pastille de pilier ── */
export const Pillar: React.FC<{i: number; size: number; t: number; label?: boolean}> = ({i, size, t, label = true}) => {
  const [l, I] = PILLARS[i];
  const glow = 0.5 + 0.5 * Math.sin(t * 2 - i * 1.2);
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.16}}>
      <div style={{width: size, height: size, borderRadius: size * 0.28, background: `linear-gradient(145deg, ${GREEN}, #138A55)`, border: '3px solid rgba(255,255,255,0.85)', boxShadow: `0 0 ${18 + 22 * glow}px rgba(34,181,115,${0.45 + 0.35 * glow}), 0 14px 30px rgba(0,0,0,0.35)`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><I size={size * 0.56} color="#FFFFFF" strokeWidth={2.2} /></div>
      {label && <div style={{fontFamily: F, fontWeight: 900, fontSize: size * 0.2, letterSpacing: 2, color: '#FFFFFF', textShadow: '0 2px 10px rgba(0,0,0,0.5)'}}>{l}</div>}
    </div>
  );
};
const GlowLine: React.FC<{x1: number; y1: number; x2: number; y2: number; t: number}> = ({x1, y1, x2, y2, t}) => {
  const L = Math.hypot(x2 - x1, y2 - y1), a = Math.atan2(y2 - y1, x2 - x1);
  const p = (t * 0.4) % 1;
  return <div style={{position: 'absolute', left: x1, top: y1 - 3, width: L, height: 6, transformOrigin: '0 50%', transform: `rotate(${a}rad)`, borderRadius: 3, background: `linear-gradient(90deg, rgba(34,181,115,0.15), ${GREEN} ${p * 100}%, rgba(255,255,255,0.95) ${p * 100 + 3}%, ${GREEN} ${p * 100 + 6}%, rgba(34,181,115,0.15))`, boxShadow: `0 0 16px ${GREEN}`}} />;
};
const Signature: React.FC<{size: number; align?: 'center' | 'left'}> = ({size, align = 'center'}) => (
  <div style={{fontFamily: F, fontWeight: 800, fontSize: size, letterSpacing: size * 0.08, color: LIGHT, textAlign: align, textShadow: '0 4px 18px rgba(0,0,0,0.5)'}}>Qualité <span style={{color: GREEN}}>·</span> Sécurité <span style={{color: GREEN}}>·</span> Environnement</div>
);
const Services: React.FC<{size: number; gap?: number}> = ({size, gap = 26}) => (
  <div style={{display: 'flex', alignItems: 'center', gap, fontFamily: F, fontWeight: 900, fontSize: size, letterSpacing: size * 0.12, color: '#FFFFFF'}}>
    {SERVICES.map((s, i) => <React.Fragment key={s}>{i > 0 && <span style={{width: size * 0.32, height: size * 0.32, borderRadius: 3, background: GREEN, transform: 'rotate(45deg)', boxShadow: `0 0 12px ${GREEN}`}} />}<span>{s}</span></React.Fragment>)}
  </div>
);
const IsoLine: React.FC<{size: number}> = ({size}) => <div style={{fontFamily: F, fontWeight: 700, fontSize: size, letterSpacing: size * 0.18, color: 'rgba(243,245,247,0.82)'}}>{ISO}</div>;

/* ── les trois compositions (1640 × 856) ── */
const W = 1640, H = 856;
const VarA: React.FC<{t: number}> = ({t}) => {
  const xs = [530, 723, 917, 1110], py = 516;
  return (
    <>
      <CoverBg W={W} H={H} t={t} horizon={0.72} />
      <div style={{position: 'absolute', left: 820 - 230, top: 186}}><LogoPlate w={460} t={t} /></div>
      <div style={{position: 'absolute', left: 0, top: 452, width: W}}><Signature size={30} /></div>
      {xs.slice(0, 3).map((x, i) => <GlowLine key={i} x1={x + 43} y1={py + 43} x2={xs[i + 1] - 43} y2={py + 43} t={t + i * 0.3} />)}
      {xs.map((x, i) => <div key={i} style={{position: 'absolute', left: x - 100, top: py, width: 200, display: 'flex', justifyContent: 'center'}}><Pillar i={i} size={86} t={t} /></div>)}
      <div style={{position: 'absolute', left: 170, top: 236}}><div style={{display: 'flex', flexDirection: 'column', gap: 18}}>{SERVICES.map((s) => <div key={s} style={{fontFamily: F, fontWeight: 900, fontSize: 30, letterSpacing: 4, color: '#fff', borderLeft: `6px solid ${GREEN}`, paddingLeft: 14}}>{s}</div>)}</div></div>
      <div style={{position: 'absolute', right: 170, top: 236, textAlign: 'right', fontFamily: F, fontWeight: 800, fontSize: 24, letterSpacing: 3, color: 'rgba(243,245,247,0.85)', lineHeight: 2.05}}>ISO 9001<br />ISO 14001<br />ISO 45001</div>
    </>
  );
};
const VarB: React.FC<{t: number}> = ({t}) => {
  const pts: [number, number][] = [[930, 560], [1080, 470], [1230, 380], [1380, 290]];
  return (
    <>
      <CoverBg W={W} H={H} t={t} tilt={-14} horizon={0.68} />
      <div style={{position: 'absolute', left: 0, top: 0, width: W, height: H, background: 'linear-gradient(115deg, transparent 52%, rgba(34,181,115,0.08) 52.2%, rgba(34,181,115,0.02) 70%, transparent 70.2%)'}} />
      <div style={{position: 'absolute', left: 200, top: 196, transform: 'rotate(-4deg)', transformOrigin: '0 0'}}>
        <LogoPlate w={370} t={t} />
        <div style={{marginTop: 22}}><Signature size={25} align="left" /></div>
        <div style={{marginTop: 16}}><Services size={32} gap={16} /></div>
        <div style={{marginTop: 14}}><IsoLine size={19} /></div>
      </div>
      {pts.slice(0, 3).map(([x, y], i) => <GlowLine key={i} x1={x} y1={y} x2={pts[i + 1][0]} y2={pts[i + 1][1]} t={t + i * 0.3} />)}
      {pts.map(([x, y], i) => <div key={i} style={{position: 'absolute', left: x - 54, top: y - 54, transform: 'rotate(-4deg)'}}><div style={{position: 'relative'}}><Pillar i={i} size={108} t={t} label={false} /><div style={{position: 'absolute', top: 120, left: -60, width: 228, textAlign: 'center', fontFamily: F, fontWeight: 900, fontSize: 17, letterSpacing: 3, color: '#fff'}}>{PILLARS[i][0]}</div></div></div>)}
    </>
  );
};
const VarC: React.FC<{t: number}> = ({t}) => {
  const cx = 820, cy = 430, rx = 420, ry = 150;
  const angs = [-150, -30, 30, 150].map((d) => (d * Math.PI) / 180 + t * 0.08);
  return (
    <>
      <CoverBg W={W} H={H} t={t} horizon={0.74} />
      <svg width={W} height={H} style={{position: 'absolute', left: 0, top: 0}}>
        <defs><linearGradient id="orb" x1="0" x2="1"><stop offset="0" stopColor={GREEN} stopOpacity="0.2" /><stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.95" /><stop offset="1" stopColor={GREEN} stopOpacity="0.2" /></linearGradient><filter id="gl"><feGaussianBlur stdDeviation="4" /></filter></defs>
        <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke={GREEN} strokeWidth={10} opacity={0.35} filter="url(#gl)" />
        <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="url(#orb)" strokeWidth={3.5} transform={`rotate(-6 ${cx} ${cy})`} />
        <ellipse cx={cx} cy={cy} rx={rx + 26} ry={ry + 18} fill="none" stroke="rgba(243,245,247,0.25)" strokeWidth={1.5} strokeDasharray="4 10" transform={`rotate(-6 ${cx} ${cy})`} />
      </svg>
      <div style={{position: 'absolute', left: cx - 190, top: cy - 120}}><LogoPlate w={380} t={t} /></div>
      {angs.map((a, i) => { const x = cx + Math.cos(a) * rx, y = cy + Math.sin(a) * ry; return <div key={i} style={{position: 'absolute', left: x - 50, top: y - 50}}><div style={{position: 'relative'}}><Pillar i={i} size={100} t={t} label={false} /><div style={{position: 'absolute', top: 108, left: -70, width: 240, textAlign: 'center', fontFamily: F, fontWeight: 900, fontSize: 16, letterSpacing: 3, color: '#fff'}}>{PILLARS[i][0]}</div></div></div>; })}
      <div style={{position: 'absolute', left: 0, top: 598, width: W, display: 'flex', justifyContent: 'center'}}><Services size={30} /></div>
      <div style={{position: 'absolute', left: 0, top: 196, width: W}}><Signature size={24} /></div>
      <div style={{position: 'absolute', left: 0, top: 644, width: W, display: 'flex', justifyContent: 'center'}}><IsoLine size={18} /></div>
    </>
  );
};

/* contrôle : rectangle de sécurité 1300 × 500, coin profil, rognages ordinateur / mobile */
const SafeOverlay: React.FC = () => (
  <AbsoluteFill style={{pointerEvents: 'none'}}>
    <div style={{position: 'absolute', left: 170, top: 178, width: 1300, height: 500, border: '4px dashed #FF3B6B', boxSizing: 'border-box'}}><span style={{position: 'absolute', left: 8, top: 6, fontFamily: F, fontWeight: 800, fontSize: 18, color: '#FF3B6B'}}>ZONE DE SÉCURITÉ 1300 × 500</span></div>
    <div style={{position: 'absolute', left: 0, top: 0, width: W, height: 107, background: 'rgba(255,59,107,0.18)', borderBottom: '2px solid #FF3B6B'}} />
    <div style={{position: 'absolute', left: 0, top: H - 107, width: W, height: 107, background: 'rgba(255,59,107,0.18)', borderTop: '2px solid #FF3B6B'}} />
    <span style={{position: 'absolute', right: 16, top: 70, fontFamily: F, fontWeight: 800, fontSize: 16, color: '#FF8FA8'}}>rogné sur ordinateur (haut / bas)</span>
    <div style={{position: 'absolute', left: 0, top: 0, width: 140, height: H, background: 'rgba(255,190,0,0.14)', borderRight: '2px solid #FFBE00'}} /><div style={{position: 'absolute', right: 0, top: 0, width: 140, height: H, background: 'rgba(255,190,0,0.14)', borderLeft: '2px solid #FFBE00'}} />
    <span style={{position: 'absolute', left: 1510, top: 400, width: 120, fontFamily: F, fontWeight: 800, fontSize: 14, color: '#FFD45C'}}>rogné sur mobile</span>
    <div style={{position: 'absolute', left: 40, top: 520, width: 300, height: 300, borderRadius: '50%', border: '4px dashed #FFFFFF', background: 'rgba(255,255,255,0.08)'}}><span style={{position: 'absolute', left: 0, top: 130, width: 300, textAlign: 'center', fontFamily: F, fontWeight: 800, fontSize: 18, color: '#fff'}}>photo de profil</span></div>
  </AbsoluteFill>
);

export const CouvertureFacebook: React.FC<{variant: CoverVariant; control?: boolean; t?: number}> = ({variant, control, t}) => {
  const f = useCurrentFrame();
  const tt = t ?? f / 30;
  const V = variant === 'A' ? VarA : variant === 'B' ? VarB : VarC;
  return <AbsoluteFill style={{background: DEEP}}><V t={tt} />{control && <SafeOverlay />}</AbsoluteFill>;
};
