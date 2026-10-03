import {Img, staticFile} from 'remotion';
import {easeIn, prog, useT} from '../anim';
import {RED} from '../charte/ui';
import {F} from '../iso/ui';
import {colors, handFont, sansFont} from '../theme';

export const AMBER = '#E39B1F';
export {RED};

/** Fenêtre temporelle [a, b[ avec fondu d'entrée et de sortie. */
export const Win: React.FC<{a: number; b: number; children: React.ReactNode}> = ({a, b, children}) => {
  const t = useT();
  if (t < a || t >= b) return null;
  return <div style={{position: 'absolute', inset: 0, opacity: prog(t, a, a + 0.25) * (1 - prog(t, b - 0.3, b, easeIn))}}>{children}</div>;
};

/** Grande carte-concept : DANGER (rouge) ou RISQUE (ambre). */
export const Concept: React.FC<{label: string; sub?: string; icon: string; color: string; w?: number}> = ({label, sub, icon, color, w = 400}) => (
  <div style={{width: w, padding: `${w * 0.07}px ${w * 0.05}px`, borderRadius: w * 0.09, background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: w * 0.02, boxShadow: '0 22px 44px rgba(14,30,60,0.2)', borderTop: `${w * 0.035}px solid ${color}`}}>
    <F n={icon} size={w * 0.46} />
    <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: w * 0.15, color, letterSpacing: -1, lineHeight: 1}}>{label}</div>
    {sub && <div style={{fontFamily: handFont, fontSize: w * 0.11, color: colors.navy, lineHeight: 1.05, textAlign: 'center'}}>{sub}</div>}
  </div>
);

/** Détourage produit (PNG transparent) avec ombre portée. */
export const Cut: React.FC<{src: string; w: number; rotate?: number; float?: number; t?: number}> = ({src, w, rotate = 0, float = 0, t = 0}) => (
  <Img src={staticFile(src)} style={{width: w, display: 'block', transform: `rotate(${rotate}deg) translateY(${Math.sin(t * 2) * float}px)`, filter: 'drop-shadow(0 22px 22px rgba(20,25,40,0.28))'}} />
);

/** Étiquette manuscrite avec flèche. */
export const Note: React.FC<{text: string; color?: string; size?: number}> = ({text, color = colors.navy, size = 54}) => (
  <div style={{fontFamily: handFont, fontSize: size, color, whiteSpace: 'nowrap', lineHeight: 1}}>{text}</div>
);

/** Signe opérateur rond (+, =, ≠, ×). */
export const Op: React.FC<{c: string; color?: string; size?: number}> = ({c, color = colors.navy, size = 110}) => (
  <div style={{width: size, height: size, borderRadius: '50%', background: color, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: size * 0.62, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '6px solid #fff', boxShadow: '0 10px 22px rgba(0,0,0,0.2)', lineHeight: 1}}>{c}</div>
);

/** Tampon incliné qui s'écrase. */
export const Stamp: React.FC<{text: string; p: number; color?: string; size?: number; rotate?: number}> = ({text, p, color = colors.green, size = 64, rotate = -10}) => (
  <div style={{transform: `rotate(${rotate}deg) scale(${2.2 - 1.2 * p})`, opacity: p, border: `8px solid ${color}`, color, borderRadius: 18, padding: '10px 28px', fontFamily: sansFont, fontWeight: 900, fontSize: size, letterSpacing: 2, whiteSpace: 'nowrap', background: 'rgba(255,255,255,0.85)'}}>{text}</div>
);

/** Carte « citation officielle » dont les mots apparaissent au rythme de la voix. */
export const Quote: React.FC<{source: string; words: [string, number, boolean?][]; color?: string; w?: number}> = ({source, words, color = RED, w = 960}) => {
  const t = useT();
  return (
    <div style={{width: w, background: '#fff', borderRadius: 34, padding: '40px 44px 44px', boxShadow: '0 24px 50px rgba(14,30,60,0.22)', borderLeft: `16px solid ${color}`, position: 'relative'}}>
      <div style={{position: 'absolute', right: 30, top: -10, fontFamily: 'Georgia, serif', fontSize: 220, color, opacity: 0.18, lineHeight: 1}}>”</div>
      <div style={{display: 'inline-flex', alignItems: 'center', gap: 12, background: colors.navy, color: '#fff', borderRadius: 12, padding: '6px 18px', fontFamily: sansFont, fontWeight: 800, fontSize: 28, letterSpacing: 2, marginBottom: 22}}>
        <F n="livres" size={38} /> {source}
      </div>
      <div style={{display: 'flex', flexWrap: 'wrap', columnGap: 14, rowGap: 6, fontFamily: sansFont, fontWeight: 700, fontSize: 50, lineHeight: 1.18, color: colors.ink}}>
        {words.map(([w0, at, hi], i) => {
          const p = prog(t, at, at + 0.3);
          const hp = prog(t, at + 0.15, at + 0.55);
          return (
            <span key={i} style={{position: 'relative', opacity: 0.12 + 0.88 * p, color: hi ? color : colors.ink, fontWeight: hi ? 900 : 700}}>
              {hi && <span style={{position: 'absolute', left: -4, right: -4, bottom: 4, height: 18, background: color, opacity: 0.2, transformOrigin: 'left', transform: `scaleX(${hp})`, borderRadius: 4}} />}
              <span style={{position: 'relative'}}>{w0}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
};

/** Jauge horizontale (0 → 1) avec libellé. */
export const Gauge: React.FC<{v: number; label: string; w?: number; color?: string}> = ({v, label, w = 760, color}) => {
  const c = color ?? (v > 0.66 ? RED : v > 0.33 ? AMBER : colors.green);
  return (
    <div style={{width: w, fontFamily: sansFont}}>
      <div style={{display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: 34, color: colors.navy, marginBottom: 12}}>
        <span>{label}</span>
        <span style={{color: c}}>{Math.round(v * 100)} %</span>
      </div>
      <div style={{height: 40, borderRadius: 20, background: '#E3DED1', overflow: 'hidden', boxShadow: 'inset 0 3px 6px rgba(0,0,0,0.12)'}}>
        <div style={{width: `${v * 100}%`, height: '100%', borderRadius: 20, background: c}} />
      </div>
    </div>
  );
};
