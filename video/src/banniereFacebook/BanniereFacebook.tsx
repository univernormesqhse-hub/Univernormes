/**
 * Bannière Facebook animée UNIVERSNORMES (820 × 360, rendue en 2× : 1640 × 720), boucle de 16 s.
 * Fond vert profond en dégradé avec balayage de lumière, trame de points, halos ; capsules en filet qui glissent ;
 * sceau ISO dont l'anneau de texte tourne, trois services (formation, audit, conseil) en orbite ; titre révélé par
 * masque, puces ISO, bouton à reflet, coordonnées. Zone sûre mobile respectée (texte entre x 96 et 730).
 */
import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {loadFont} from '@remotion/fonts';

loadFont({family: 'Montserrat', url: staticFile('fonts/Montserrat.woff2'), weight: '100 900'});
export const BANNIERE_FB_FRAMES = 16 * 30;
const F = "'Montserrat', sans-serif";
const LIME = '#8BE36B', GOLD = '#F5C84B', DEEP = '#062B19';
const cl = (v: number) => Math.min(1, Math.max(0, v));
const ease = Easing.bezier(0.22, 1, 0.36, 1);
const k = (t: number, a: number, d = 0.6) => ease(cl((t - a) / d));

const Capsule: React.FC<{x: number; y: number; w: number; h: number; rot: number; o: number; fill?: string; stroke?: string; sw?: number}> = ({x, y, w, h, rot, o, fill = 'none', stroke = 'rgba(255,255,255,0.9)', sw = 10}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: h / 2, border: `${sw}px solid ${stroke}`, background: fill, transform: `rotate(${rot}deg)`, opacity: o, boxSizing: 'border-box'}} />
);

const Seal: React.FC<{t: number; cx: number; cy: number}> = ({t, cx, cy}) => {
  const R = 74;
  const txt = 'QUALITÉ • SÉCURITÉ • ENVIRONNEMENT • ';
  const s = k(t, 1.2, 0.9);
  return (
    <svg width={220} height={220} viewBox="-110 -110 220 220" style={{position: 'absolute', left: cx - 110, top: cy - 110, transform: `scale(${s * 0.86})`, opacity: s}}>
      <defs><path id="sealR" d={`M 0 ${-R} a ${R} ${R} 0 1 1 0 ${2 * R} a ${R} ${R} 0 1 1 0 ${-2 * R}`} /></defs>
      <circle r={98} fill="rgba(6,43,25,0.55)" stroke="rgba(255,255,255,0.25)" strokeWidth={1.5} />
      <circle r={88} fill="none" stroke={LIME} strokeWidth={2} strokeDasharray="2 6" transform={`rotate(${-t * 12})`} />
      <g transform={`rotate(${t * 22.5})`}><text fontFamily={F} fontWeight={800} fontSize={13.5} letterSpacing={2.6} fill="#fff"><textPath href="#sealR">{txt}{txt.slice(0, 0)}</textPath></text></g>
      <circle r={54} fill="#fff" />
      <text y={-8} textAnchor="middle" fontFamily={F} fontWeight={900} fontSize={30} fill={DEEP}>ISO</text>
      <text y={16} textAnchor="middle" fontFamily={F} fontWeight={800} fontSize={8.6} letterSpacing={0.8} fill="#1E8A4C">CERTIFICATION</text>
      <path d="M -16 28 l 9 9 l 22 -22" fill="none" stroke={GOLD} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={60} strokeDashoffset={60 * (1 - k(t, 1.9, 0.5))} />
    </svg>
  );
};

const Banner: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const loop = (t % 16) / 16;
  const sweep = ((t - 2.2) % 6) / 6;
  const words = ['FORMATIONS', 'AUDITS', 'CONSEILS'];
  const iso = ['ISO 9001', 'ISO 45001', 'ISO 14001'];
    const btnShine = ((t - 3) % 4) / 4;
  return (
    <AbsoluteFill style={{background: `linear-gradient(118deg, ${DEEP} 0%, #0B4A2B 38%, #13703F 70%, #2AA45A 100%)`, overflow: 'hidden', fontFamily: F}}>
      {/* trame de points + halos */}
      <AbsoluteFill style={{backgroundImage: 'radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1.2px)', backgroundSize: '14px 14px', backgroundPosition: `${(t * 4) % 14}px 0`, maskImage: 'linear-gradient(90deg, transparent 0%, #000 40%, #000 100%)', WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, #000 40%, #000 100%)', opacity: 0.7}} />
      <div style={{position: 'absolute', left: 300 + Math.sin(t * 0.4) * 30, top: -120, width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,227,107,0.28), transparent 65%)'}} />
      <div style={{position: 'absolute', left: -140, top: 180 + Math.cos(t * 0.35) * 20, width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,200,75,0.12), transparent 65%)'}} />
      {/* balayage de lumière diagonal */}
      <div style={{position: 'absolute', left: interpolate(sweep, [0, 1], [-400, 1200]), top: -100, width: 140, height: 600, transform: 'rotate(22deg)', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent)'}} />

      {/* capsules en filet, à droite */}
      <Capsule x={560 + 40 * (1 - k(t, 0.2, 1.2))} y={-60} w={380} h={130} rot={-38 + Math.sin(t * 0.39) * 2} o={k(t, 0.2, 1.2) * 0.9} stroke="#fff" sw={11} />
      <Capsule x={600 + 60 * (1 - k(t, 0.4, 1.2))} y={150} w={360} h={150} rot={-38 + Math.cos(t * 0.39) * 2} o={k(t, 0.4, 1.2)} stroke="#fff" sw={13} fill="rgba(6,43,25,0.35)" />
      <Capsule x={520} y={250} w={260} h={90} rot={-38} o={k(t, 0.6, 1.2) * 0.35} stroke={LIME} sw={3} />
      <Capsule x={700} y={-20} w={200} h={70} rot={-38} o={k(t, 0.8, 1.2) * 0.4} stroke={GOLD} sw={2.5} />
      {Array.from({length: 7}, (_, i) => { const p = (loop * 2 + i / 7) % 1; return <div key={i} style={{position: 'absolute', left: 560 + i * 34 + p * 40, top: 340 - p * 380, width: 4 + (i % 3), height: 4 + (i % 3), borderRadius: '50%', background: i % 2 ? LIME : '#fff', opacity: 0.55 * Math.sin(p * Math.PI)}} />; })}
      <Seal t={t} cx={690} cy={200} />

      {/* trois services en orbite autour du sceau */}
      {[['Formation', 'M3 9l9-5 9 5-9 5-9-5z M7 11.2V16c0 1.5 2.5 3 5 3s5-1.5 5-3v-4.8', 0], ['Audit', 'M9 3h6v3H9z M6 5h12v16H6z M9 12l2 2 4-4', 1], ['Conseil', 'M9 18h6 M10 21h4 M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z', 2]].map(([l, d, i]) => {
        const a0 = -Math.PI / 2 + (i as number) * (Math.PI * 2 / 3) + t * 0.22;
        const cx = 690 + Math.cos(a0) * 95, cy = 200 + Math.sin(a0) * 92;
        const q = k(t, 2.0 + (i as number) * 0.2, 0.6);
        return <div key={l as string} style={{position: 'absolute', left: cx - 23, top: cy - 23, width: 46, height: 46, borderRadius: 14, background: '#fff', boxShadow: '0 8px 18px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${q})`, opacity: q}}>
          <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke={DEEP} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round"><path d={d as string} /></svg>
          <div style={{position: 'absolute', top: 49, left: -12, width: 70, textAlign: 'center', color: '#fff', fontWeight: 800, fontSize: 9, letterSpacing: 1, textShadow: '0 2px 6px rgba(0,0,0,0.4)'}}>{(l as string).toUpperCase()}</div>
        </div>;
      })}
      {/* logo */}
      <div style={{position: 'absolute', left: 96, top: 18, background: '#fff', borderRadius: 14, padding: '6px 14px', boxShadow: '0 10px 24px rgba(0,0,0,0.25)', transform: `translateY(${-30 * (1 - k(t, 0, 0.7))}px)`, opacity: k(t, 0, 0.5)}}>
        <Img src={staticFile('promo/logo.png')} style={{height: 50, display: 'block'}} />
      </div>

      {/* titre révélé par masque */}
      <div style={{position: 'absolute', left: 96, top: 98, display: 'flex', gap: 10, alignItems: 'center'}}>
        {words.map((w, i) => { const q = k(t, 0.5 + i * 0.22, 0.6); return <React.Fragment key={w}>
          {i > 0 && <span style={{width: 7, height: 7, borderRadius: 2, background: GOLD, transform: `rotate(45deg) scale(${q})`}} />}
          <span style={{display: 'inline-block', overflow: 'hidden', height: 34}}><span style={{display: 'inline-block', transform: `translateY(${(1 - q) * 36}px)`, color: '#fff', fontWeight: 800, fontSize: 25, letterSpacing: 1.5}}>{w}</span></span>
        </React.Fragment>; })}
      </div>
      <div style={{position: 'absolute', left: 96, top: 136, height: 3, width: 300 * k(t, 1.2, 0.8), background: `linear-gradient(90deg, ${GOLD}, ${LIME})`, borderRadius: 2}} />

      {/* puces ISO */}
      <div style={{position: 'absolute', left: 96, top: 152, display: 'flex', gap: 8}}>
        {iso.map((s, i) => { const q = k(t, 1.4 + i * 0.15, 0.5); const pulse = Math.max(0, Math.sin((t - 4 - i * 0.6) * 0.9)) ** 12; return <div key={s} style={{padding: '5px 11px', borderRadius: 8, border: `1.5px solid ${LIME}`, background: `rgba(139,227,107,${0.12 + 0.25 * pulse})`, color: '#fff', fontWeight: 800, fontSize: 14, letterSpacing: 1, transform: `translateX(${(1 - q) * -20}px)`, opacity: q, boxShadow: pulse > 0.05 ? `0 0 ${14 * pulse}px ${LIME}` : 'none'}}>{s}</div>; })}
      </div>
      <div style={{position: 'absolute', left: 96, top: 190, color: '#fff', fontWeight: 800, fontSize: 17, opacity: k(t, 1.9, 0.6)}}>Certifications internationales</div>
      <div style={{position: 'absolute', left: 96, top: 212, color: LIME, fontWeight: 600, fontSize: 13, letterSpacing: 1, opacity: k(t, 2.0, 0.6)}}>Qualité · Sécurité · Environnement</div>

      {/* bouton + coordonnées */}
      <div style={{position: 'absolute', left: 96, top: 244, transform: `scale(${0.8 + 0.2 * k(t, 2.2, 0.5)})`, transformOrigin: '0 50%', opacity: k(t, 2.2, 0.4)}}>
        <div style={{position: 'relative', overflow: 'hidden', background: '#fff', color: DEEP, fontWeight: 900, fontSize: 13, letterSpacing: 2, padding: '11px 20px', borderRadius: 10, boxShadow: '0 8px 18px rgba(0,0,0,0.25)'}}>
          EN SAVOIR PLUS  →
          <div style={{position: 'absolute', top: -10, left: interpolate(btnShine, [0, 1], [-60, 220]), width: 30, height: 70, transform: 'rotate(20deg)', background: 'linear-gradient(90deg, transparent, rgba(139,227,107,0.6), transparent)'}} />
        </div>
      </div>
      <div style={{position: 'absolute', left: 96, top: 298, display: 'flex', gap: 16, color: '#fff', fontWeight: 700, fontSize: 14.5, opacity: k(t, 2.6, 0.6)}}>
        <span style={{display: 'flex', alignItems: 'center', gap: 7}}><svg width={18} height={18} viewBox="0 0 24 24"><circle cx={12} cy={12} r={12} fill={GOLD} /><path d="M8.5 6.5c.5-.4 1.3-.3 1.6.3l1 2c.2.5.1 1-.3 1.3l-.8.7c.6 1.3 1.6 2.3 2.9 2.9l.7-.8c.3-.4.9-.5 1.3-.3l2 1c.6.3.7 1.1.3 1.6l-.9 1c-.7.7-1.8.9-2.7.5-3-1.4-5.4-3.8-6.8-6.8-.4-.9-.2-2 .5-2.7z" fill={DEEP} /></svg>+226 67 96 74 19</span>
        <span style={{display: 'flex', alignItems: 'center', gap: 7}}><svg width={18} height={18} viewBox="0 0 24 24"><circle cx={12} cy={12} r={12} fill={GOLD} /><rect x={6} y={8} width={12} height={9} rx={1.5} fill="none" stroke={DEEP} strokeWidth={1.8} /><path d="M6.5 8.8 12 13l5.5-4.2" fill="none" stroke={DEEP} strokeWidth={1.8} /></svg>univernormesqhse@gmail.com</span>
      </div>
      {/* fondu de boucle */}
      <AbsoluteFill style={{background: DEEP, opacity: Math.max(interpolate(t, [15.5, 16], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), interpolate(t, [0, 0.35], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}))}} />
    </AbsoluteFill>
  );
};

export const BanniereFacebook: React.FC = () => {
  const {width} = useVideoConfig();
  const s = width / 820;
  return <AbsoluteFill style={{background: DEEP}}><div style={{width: 820, height: 360, transform: `scale(${s})`, transformOrigin: '0 0', position: 'relative'}}><Banner /></div></AbsoluteFill>;
};
