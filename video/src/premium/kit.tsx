import type {LucideIcon} from 'lucide-react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {easeIn, easeInOut, easeOut, prog, useSpring, useT} from '../anim';
import {sansFont} from '../theme';

/**
 * Kit graphique « premium institutionnel » UNIVERSNORMES.
 * Une seule famille typographique (Montserrat), palette restreinte (bleu, vert, blancs, gris),
 * pictogrammes vectoriels Lucide (licence ISC), mouvements doux et transitions graphiques.
 */
export const P = {
  navy: '#0E2A5C',
  navy2: '#173C7A',
  green: '#2E9B3E',
  greenSoft: '#E6F4E8',
  white: '#FFFFFF',
  bg: '#F3F5F8',
  line: '#DDE3EA',
  grey: '#8A94A3',
  ink: '#1E2733',
  alert: '#C8402F',
};

export const fadeWin = (t: number, a: number, b: number, inDur = 0.35, outDur = 0.3) =>
  t < a || t > b ? 0 : prog(t, a, a + inDur, easeOut) * (1 - prog(t, b - outDur, b, easeIn));

/** Apparition douce : glisse de quelques pixels + fondu (pas de rebond). */
export const Reveal: React.FC<{at: number; until?: number; x: number; y: number; dx?: number; dy?: number; scale?: boolean; children: React.ReactNode}> = ({at, until = Infinity, x, y, dx = 0, dy = 40, scale, children}) => {
  const t = useT();
  if (t < at || t > until) return null;
  const p = prog(t, at, at + 0.55, easeOut);
  const o = until === Infinity ? 0 : prog(t, until - 0.3, until, easeIn);
  return (
    <div style={{position: 'absolute', left: x, top: y, opacity: p * (1 - o), transform: `translate(-50%, -50%) translate(${(1 - p) * dx}px, ${(1 - p) * dy - o * 20}px) scale(${scale ? 0.9 + 0.1 * p : 1})`}}>
      {children}
    </div>
  );
};

/** Fond : gris très clair, grille fine, halo bleu discret. */
export const PremiumBackground: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: P.bg}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: 0.55}}>
        {Array.from({length: 12}, (_, i) => <line key={`v${i}`} x1={i * 90 + ((f * 0.15) % 90)} y1={0} x2={i * 90 + ((f * 0.15) % 90)} y2={1920} stroke={P.line} strokeWidth={1.2} />)}
        {Array.from({length: 22}, (_, i) => <line key={`h${i}`} x1={0} y1={i * 90} x2={1080} y2={i * 90} stroke={P.line} strokeWidth={1.2} />)}
      </svg>
      <div style={{position: 'absolute', left: -300, top: 300 + Math.sin(f / 90) * 30, width: 900, height: 900, borderRadius: '50%', background: 'radial-gradient(circle, rgba(23,60,122,0.10), transparent 65%)'}} />
      <div style={{position: 'absolute', right: -320, top: 1100 + Math.cos(f / 100) * 30, width: 900, height: 900, borderRadius: '50%', background: 'radial-gradient(circle, rgba(46,155,62,0.08), transparent 65%)'}} />
    </AbsoluteFill>
  );
};

/** Habillage : logo discret en haut à gauche, chapitre à droite, barre de progression. */
export const PremiumFrame: React.FC<{logo: string; chapters: [number, string][]; total: number; hideAt: number}> = ({logo, chapters, total, hideAt}) => {
  const t = useT();
  const o = 1 - prog(t, hideAt - 0.3, hideAt, easeIn);
  const vis = prog(t, 1.6, 2.2) * o;
  const cur = [...chapters].reverse().find(([a]) => t >= a);
  const idx = cur ? chapters.indexOf(cur) : -1;
  const chP = cur ? prog(t, cur[0], cur[0] + 0.5, easeOut) : 0;
  return (
    <AbsoluteFill style={{opacity: vis}}>
      <div style={{position: 'absolute', left: 0, top: 0, height: 8, width: 1080 * Math.min(1, t / total), background: P.green}} />
      <div style={{position: 'absolute', left: 40, top: 40, background: 'rgba(255,255,255,0.92)', borderRadius: 22, padding: '10px 18px', boxShadow: '0 6px 18px rgba(14,42,92,0.10)'}}>
        <Img src={staticFile(logo)} style={{width: 210, display: 'block'}} />
      </div>
      {cur && (
        <div style={{position: 'absolute', right: 40, top: 62, display: 'flex', alignItems: 'center', gap: 14, opacity: chP, transform: `translateY(${(1 - chP) * -10}px)`, fontFamily: sansFont}}>
          <div style={{fontWeight: 800, fontSize: 26, color: P.green, letterSpacing: 2}}>{String(idx + 1).padStart(2, '0')}</div>
          <div style={{width: 2, height: 30, background: P.line}} />
          <div style={{fontWeight: 700, fontSize: 26, color: P.navy, letterSpacing: 3, textTransform: 'uppercase'}}>{cur[1]}</div>
        </div>
      )}
    </AbsoluteFill>
  );
};

/** Titre mot-clé : surtitre vert, titre fort, trait qui se dessine. */
export const KeyTitle: React.FC<{at: number; until: number; kicker?: string; title: string; y?: number; size?: number; color?: string; accent?: string}> = ({at, until, kicker, title, y = 380, size = 84, color = P.navy, accent}) => {
  const t = useT();
  if (t < at || t > until) return null;
  const o = 1 - prog(t, until - 0.3, until, easeIn);
  const words = title.split(' ');
  return (
    <div style={{position: 'absolute', left: 70, right: 70, top: y, transform: 'translateY(-50%)', opacity: o, fontFamily: sansFont}}>
      {kicker && (
        <div style={{fontWeight: 700, fontSize: 30, color: P.green, letterSpacing: 6, textTransform: 'uppercase', marginBottom: 14, opacity: prog(t, at, at + 0.4), transform: `translateX(${(1 - prog(t, at, at + 0.5, easeOut)) * -30}px)`}}>{kicker}</div>
      )}
      <div style={{display: 'flex', flexWrap: 'wrap', columnGap: size * 0.26}}>
        {words.map((w, i) => {
          const p = prog(t, at + 0.1 + i * 0.05, at + 0.6 + i * 0.05, easeOut);
          const hi = w.startsWith('*');
          return (
            <span key={i} style={{overflow: 'hidden', display: 'inline-block', paddingBottom: size * 0.06}}>
              <span style={{display: 'inline-block', fontWeight: 800, fontSize: size, lineHeight: 1.05, letterSpacing: -size * 0.02, color: hi ? accent ?? P.green : color, transform: `translateY(${(1 - p) * 105}%)`}}>{w.replace(/\*/g, '')}</span>
            </span>
          );
        })}
      </div>
      <div style={{height: 6, width: 140 * prog(t, at + 0.4, at + 0.9, easeInOut), background: P.green, borderRadius: 3, marginTop: 18}} />
    </div>
  );
};

/** Pastille ronde avec pictogramme vectoriel. */
export const IconDisc: React.FC<{Icon: LucideIcon; size?: number; bg?: string; fg?: string; ring?: string}> = ({Icon, size = 150, bg = P.white, fg = P.navy, ring}) => (
  <div style={{width: size, height: size, borderRadius: '50%', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 30px rgba(14,42,92,0.12)', border: ring ? `${Math.max(3, size * 0.03)}px solid ${ring}` : undefined}}>
    <Icon size={size * 0.46} color={fg} strokeWidth={1.8} />
  </div>
);

/** Carte : pictogramme + libellé (+ sous-libellé). */
export const InfoCard: React.FC<{Icon: LucideIcon; label: string; sub?: string; w?: number; accent?: string; dark?: boolean}> = ({Icon, label, sub, w = 440, accent = P.green, dark}) => (
  <div style={{width: w, display: 'flex', alignItems: 'center', gap: 22, background: dark ? P.navy : P.white, borderRadius: 26, padding: '22px 26px', boxShadow: '0 14px 34px rgba(14,42,92,0.12)', borderLeft: `8px solid ${accent}`, fontFamily: sansFont}}>
    <div style={{width: 86, height: 86, flexShrink: 0, borderRadius: 20, background: dark ? 'rgba(255,255,255,0.1)' : P.bg, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Icon size={48} color={dark ? '#fff' : accent === P.alert ? P.alert : P.navy} strokeWidth={1.8} />
    </div>
    <div>
      <div style={{fontWeight: 800, fontSize: 36, color: dark ? '#fff' : P.navy, lineHeight: 1.1}}>{label}</div>
      {sub && <div style={{fontWeight: 500, fontSize: 26, color: dark ? '#C9D6EA' : P.grey, marginTop: 6}}>{sub}</div>}
    </div>
  </div>
);

/** Photo dans un cadre arrondi, étalonnage froid homogène et zoom lent. */
export const PhotoFrame: React.FC<{src: string; at: number; w: number; h: number; pos?: string; label?: string; radius?: number}> = ({src, at, w, h, pos = '50% 50%', label, radius = 32}) => {
  const t = useT();
  const z = 1.06 + 0.08 * prog(t, at, at + 10, (v) => v);
  return (
    <div style={{position: 'relative', width: w, height: h, borderRadius: radius, overflow: 'hidden', boxShadow: '0 24px 60px rgba(14,42,92,0.22)'}}>
      <Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${z})`, filter: 'saturate(0.88) contrast(1.04)'}} />
      <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(14,42,92,0) 55%, rgba(14,42,92,0.55) 100%)'}} />
      {label && (
        <div style={{position: 'absolute', left: 28, bottom: 26, fontFamily: sansFont, fontWeight: 700, fontSize: 30, color: '#fff', letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 12}}>
          <div style={{width: 10, height: 10, borderRadius: 5, background: P.green}} />
          {label}
        </div>
      )}
    </div>
  );
};

/** Ligne de connexion qui se dessine. */
export const Connector: React.FC<{x1: number; y1: number; x2: number; y2: number; p: number; color?: string; dashed?: boolean; width?: number}> = ({x1, y1, x2, y2, p, color = P.navy, dashed, width = 4}) => (
  <line x1={x1} y1={y1} x2={x1 + (x2 - x1) * p} y2={y1 + (y2 - y1) * p} stroke={color} strokeWidth={width} strokeDasharray={dashed ? '10 10' : undefined} strokeLinecap="round" />
);

/** Transition graphique : panneau bleu avec liseré vert qui balaie l'écran. */
export const PanelWipe: React.FC<{at: number; dur?: number}> = ({at, dur = 0.8}) => {
  const t = useT();
  if (t < at - dur / 2 || t > at + dur / 2) return null;
  const p = (t - (at - dur / 2)) / dur;
  const x = interpolate(p, [0, 0.5, 1], [-1200, 0, 1200], {easing: easeInOut});
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div style={{position: 'absolute', top: 0, bottom: 0, left: x - 60, width: 1200, background: P.navy, transform: 'skewX(-8deg)'}} />
      <div style={{position: 'absolute', top: 0, bottom: 0, left: x + 1140, width: 40, background: P.green, transform: 'skewX(-8deg)'}} />
    </AbsoluteFill>
  );
};

/** Sous-titres sobres : phrase sur bandeau bleu, mot prononcé mis en évidence. */
export const KaraokeCaptions: React.FC<{script: {w: string; t: number}[][]; until: number}> = ({script, until}) => {
  const t = useT();
  if (t > until) return null;
  const idx = script.findIndex((l, i) => t >= l[0].t - 0.05 && (i === script.length - 1 || t < script[i + 1][0].t - 0.05));
  if (idx < 0) return null;
  const line = script[idx];
  const last = line[line.length - 1].t + 0.9;
  if (t > last && (idx === script.length - 1 || script[idx + 1][0].t - last > 0.4)) return null;
  const p = prog(t, line[0].t - 0.05, line[0].t + 0.2, easeOut);
  return (
    <div style={{position: 'absolute', left: 60, right: 60, top: 1650, display: 'flex', justifyContent: 'center'}}>
      <div style={{maxWidth: 960, background: 'rgba(14,42,92,0.92)', borderRadius: 18, padding: '16px 28px', textAlign: 'center', fontFamily: sansFont, fontWeight: 600, fontSize: 40, lineHeight: 1.3, opacity: p, transform: `translateY(${(1 - p) * 12}px)`, boxShadow: '0 10px 30px rgba(14,42,92,0.25)'}}>
        {line.map((wd, i) => {
          const spoken = t >= wd.t;
          const current = spoken && (i === line.length - 1 ? t < wd.t + 0.5 : t < line[i + 1].t);
          return (
            <span key={i} style={{color: current ? '#8FD39A' : spoken ? '#FFFFFF' : 'rgba(255,255,255,0.55)'}}>
              {wd.w}
              {i < line.length - 1 ? ' ' : ''}
            </span>
          );
        })}
      </div>
    </div>
  );
};

/** Introduction courte : logo, puis titre du sujet. */
export const PremiumIntro: React.FC<{logo: string; kicker: string; title: string; end: number}> = ({logo, kicker, title, end}) => {
  const t = useT();
  const lg = useSpring(0.1, {damping: 18});
  const logoOut = prog(t, 1.2, 1.6, easeInOut);
  const out = prog(t, end - 0.3, end, easeIn);
  return (
    <AbsoluteFill style={{opacity: 1 - out}}>
      <div style={{position: 'absolute', left: 540, top: interpolate(logoOut, [0, 1], [900, 620]), transform: `translate(-50%, -50%) scale(${lg * interpolate(logoOut, [0, 1], [1, 0.62])})`}}>
        <Img src={staticFile(logo)} style={{width: 760, display: 'block'}} />
      </div>
      <div style={{position: 'absolute', left: 540, top: 900, width: 6, height: 140 * prog(t, 1.4, 1.9, easeOut), background: P.green, transform: 'translateX(-50%)'}} />
      <KeyTitle at={1.6} until={end} kicker={kicker} title={title} y={1150} size={80} />
    </AbsoluteFill>
  );
};

/** Écran final réutilisable : logo, signature, services, contact. */
export const PremiumOutro: React.FC<{at: number; logo: string; contact?: string; cta?: string}> = ({at, logo, contact = '+226 67 96 74 19', cta = 'Formez vos équipes avec UNIVERSNORMES'}) => {
  const t = useT();
  const bg = prog(t, at, at + 0.6, easeInOut);
  const lg = useSpring(at + 0.3, {damping: 18});
  const items = ['Formations', 'Audits', 'Accompagnement', 'Conseil'];
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', inset: 0, background: P.white, clipPath: `circle(${bg * 140}% at 50% 45%)`}} />
      <div style={{position: 'absolute', left: 540, top: 720, transform: `translate(-50%, -50%) scale(${lg})`}}>
        <Img src={staticFile(logo)} style={{width: 820, display: 'block'}} />
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1000, textAlign: 'center', fontFamily: sansFont, opacity: prog(t, at + 0.8, at + 1.2), transform: `translateY(${(1 - prog(t, at + 0.8, at + 1.3, easeOut)) * 20}px)`}}>
        <div style={{fontWeight: 800, fontSize: 46, color: P.navy}}>{cta}</div>
        <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 16, marginTop: 34, padding: '0 60px'}}>
          {items.map((it, i) => (
            <div key={it} style={{fontWeight: 700, fontSize: 30, color: P.navy, background: P.bg, borderRadius: 40, padding: '14px 24px', opacity: prog(t, at + 1.1 + i * 0.12, at + 1.4 + i * 0.12)}}>{it}</div>
          ))}
        </div>
      </div>
      <div style={{position: 'absolute', left: 540, top: 1330, transform: 'translate(-50%, -50%)', opacity: prog(t, at + 1.6, at + 2.0), display: 'flex', alignItems: 'center', gap: 18, background: P.green, borderRadius: 60, padding: '20px 40px', fontFamily: sansFont, fontWeight: 800, fontSize: 40, color: '#fff', whiteSpace: 'nowrap', boxShadow: '0 14px 30px rgba(46,155,62,0.3)'}}>
        WhatsApp · {contact}
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1460, textAlign: 'center', fontFamily: sansFont, fontWeight: 600, fontStyle: 'italic', fontSize: 32, color: P.grey, opacity: prog(t, at + 2.0, at + 2.4)}}>Des normes aujourd'hui, un avenir durable demain</div>
    </AbsoluteFill>
  );
};
