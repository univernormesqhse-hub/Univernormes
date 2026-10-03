import {easeOut, Enter, prog, useT} from '../anim';
import {F} from '../iso/ui';
import {colors, handFont, sansFont} from '../theme';

export const BLUE = '#3D7DD8';
export const GOLD = '#E3A92B';
export const PURPLE = '#7B5CD6';

/** Deux cartes face à face (A vs B). */
export const Duel: React.FC<{
  a: {t: string; s?: string; icon: string; c: string; at: number};
  b: {t: string; s?: string; icon: string; c: string; at: number};
  y?: number;
  w?: number;
  h?: number;
}> = ({a, b, y = 1000, w = 440, h = 560}) => (
  <>
    {[a, b].map((x, i) => (
      <Enter key={x.t} at={x.at} x={i ? 790 : 290} y={y} from={i ? 'right' : 'left'} dist={i ? 300 : -300}>
        <div style={{width: w, height: h, borderRadius: 40, background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, boxShadow: '0 20px 40px rgba(14,30,60,0.18)', borderTop: `16px solid ${x.c}`, padding: '0 24px'}}>
          <F n={x.icon} size={w * 0.42} />
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: x.c, textTransform: 'uppercase', textAlign: 'center', lineHeight: 1.05}}>{x.t}</div>
          {x.s && <div style={{fontFamily: handFont, fontSize: 40, color: colors.navy, textAlign: 'center', lineHeight: 1.1}}>{x.s}</div>}
        </div>
      </Enter>
    ))}
  </>
);

/** Liste d'étapes numérotées qui glissent depuis la gauche. */
export const Steps: React.FC<{items: {l: string; s?: string; icon: string; at: number; c?: string}[]; y?: number; gap?: number; active?: number}> = ({items, y = 650, gap = 175, active = -1}) => (
  <>
    {items.map((k, i) => (
      <Enter key={k.l} at={k.at} x={540} y={y + i * gap} from="left" dist={-280}>
        <div style={{width: 930, display: 'flex', alignItems: 'center', gap: 22, background: '#fff', borderRadius: 28, padding: '14px 26px', boxShadow: '0 12px 26px rgba(14,30,60,0.14)', borderLeft: `14px solid ${k.c ?? colors.green}`, opacity: active >= 0 && active !== i ? 0.5 : 1, transform: `scale(${active === i ? 1.03 : 1})`}}>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: k.c ?? colors.green, width: 44}}>{i + 1}</div>
          <F n={k.icon} size={84} />
          <div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: colors.navy, lineHeight: 1.05}}>{k.l}</div>
            {k.s && <div style={{fontFamily: handFont, fontSize: 32, color: '#5B6675'}}>{k.s}</div>}
          </div>
        </div>
      </Enter>
    ))}
  </>
);

/** Badge de clause normative (ex. « 10.1 »). */
export const Clause: React.FC<{n: string; label?: string; color?: string; size?: number; ghost?: boolean}> = ({n, label, color = colors.navy, size = 1, ghost}) => (
  <div style={{display: 'inline-flex', alignItems: 'center', gap: 14 * size, background: ghost ? 'transparent' : '#fff', border: `${5 * size}px ${ghost ? 'dashed' : 'solid'} ${color}`, borderRadius: 20 * size, padding: `${10 * size}px ${22 * size}px`, boxShadow: ghost ? 'none' : '0 10px 22px rgba(14,30,60,0.15)', opacity: ghost ? 0.55 : 1}}>
    <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 46 * size, color, letterSpacing: -1}}>§ {n}</div>
    {label && <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 28 * size, color: colors.navy, whiteSpace: 'nowrap'}}>{label}</div>}
  </div>
);

/** Smartphone stylisé (écran d'icônes, ou vue « sous le capot »). */
export const Phone: React.FC<{xray: number}> = ({xray}) => {
  const t = useT();
  const icons = ['memo', 'graphique', 'equipe', 'calendrier', 'cible', 'cle', 'loupe', 'globe', 'ampoule'];
  return (
    <div style={{width: 420, height: 820, borderRadius: 70, background: colors.navy, padding: 22, boxShadow: '0 30px 60px rgba(14,42,92,0.4)', position: 'relative'}}>
      <div style={{width: '100%', height: '100%', borderRadius: 50, background: '#EEF3F8', overflow: 'hidden', position: 'relative'}}>
        <div style={{position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, padding: '80px 30px', opacity: 1 - xray}}>
          {icons.map((ic) => (
            <div key={ic} style={{width: 96, height: 96, borderRadius: 26, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 12px rgba(0,0,0,0.1)'}}><F n={ic} size={70} /></div>
          ))}
        </div>
        <div style={{position: 'absolute', inset: 0, background: '#0B1F44', opacity: xray, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20}}>
          <div style={{transform: `rotate(${t * 60}deg)`}}><F n="engrenage" size={170} /></div>
          <div style={{transform: `rotate(${-t * 80}deg)`}}><F n="engrenage" size={120} /></div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#7CC576', letterSpacing: 2}}>NOUVEAU MOTEUR</div>
        </div>
      </div>
      <div style={{position: 'absolute', top: 34, left: '50%', width: 120, height: 26, marginLeft: -60, borderRadius: 13, background: colors.navy}} />
    </div>
  );
};

/** Compteur numérique animé. */
export const Count: React.FC<{from?: number; to: number; at: number; dur?: number; suffix?: string; prefix?: string; size?: number; color?: string}> = ({from = 0, to, at, dur = 1.2, suffix = '', prefix = '', size = 120, color = colors.navy}) => {
  const t = useT();
  const v = Math.round(from + (to - from) * prog(t, at, at + dur, easeOut));
  return <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: size, color, lineHeight: 1, letterSpacing: -2, whiteSpace: 'nowrap'}}>{prefix}{String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}{suffix}</div>;
};

/** Frise chronologique horizontale avec jalons. */
export const Timeline: React.FC<{at: number; y?: number; marks: {at: number; x: number; label: string; sub: string; c: string}[]}> = ({at, y = 1000, marks}) => {
  const t = useT();
  const p = prog(t, at, at + 1.2, easeOut);
  return (
    <>
      <div style={{position: 'absolute', left: 80, top: y - 6, width: 920 * p, height: 12, borderRadius: 6, background: colors.navy}} />
      {marks.map((m, i) => (
        <div key={m.label}>
          <div style={{position: 'absolute', left: m.x - 22, top: y - 22, width: 44, height: 44, borderRadius: '50%', background: m.c, border: '6px solid #fff', boxShadow: '0 6px 14px rgba(0,0,0,0.2)', transform: `scale(${prog(t, m.at, m.at + 0.4, easeOut)})`}} />
          <Enter at={m.at + 0.1} x={m.x} y={i % 2 ? y + 150 : y - 150} bouncy>
            <div style={{textAlign: 'center', background: '#fff', borderRadius: 22, padding: '12px 18px', boxShadow: '0 10px 22px rgba(14,30,60,0.15)', borderTop: `8px solid ${m.c}`, minWidth: 240}}>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: m.c, whiteSpace: 'nowrap'}}>{m.label}</div>
              <div style={{fontFamily: handFont, fontSize: 30, color: colors.navy, whiteSpace: 'nowrap'}}>{m.sub}</div>
            </div>
          </Enter>
        </div>
      ))}
    </>
  );
};
