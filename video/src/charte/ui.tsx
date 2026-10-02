import {Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {easeIn, easeInOut, easeOut, Enter, prog, useSpring, useT} from '../anim';
import {F} from '../iso/ui';
import {colors, handFont, sansFont} from '../theme';

export const RED = '#D9443A';
export const GOLD = '#E3A92B';

/** Photo de la banque d'images dans un cadre de marque, avec zoom lent (Ken Burns). */
export const PhotoCard: React.FC<{
  src: string;
  at: number;
  until?: number;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  rotate?: number;
  pos?: string;
  from?: 'up' | 'down' | 'left' | 'right' | 'scale';
  label?: string;
  icon?: string;
  children?: React.ReactNode;
}> = ({src, at, until = Infinity, x = 540, y = 1040, w = 960, h = 700, rotate = 0, pos = '50% 50%', from = 'up', label, icon, children}) => {
  const t = useT();
  const z = 1.04 + 0.1 * prog(t, at, at + 9, (v) => v);
  return (
    <Enter at={at} until={until} x={x} y={y} from={from} dist={from === 'left' || from === 'up' ? -260 : 260} rotate={rotate}>
      <div style={{position: 'relative', width: w, height: h, borderRadius: 34, overflow: 'hidden', border: '10px solid #fff', boxShadow: '0 24px 50px rgba(14,30,60,0.32)'}}>
        <Img src={staticFile(src.includes('/') ? src : `promo/${src}.jpg`)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${z})`}} />
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 10, background: `linear-gradient(90deg, ${colors.green}, ${colors.navy})`}} />
        {label && (
          <div style={{position: 'absolute', left: 22, bottom: 30, display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.95)', borderRadius: 14, padding: '8px 18px 8px 10px', fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: colors.navy, boxShadow: '0 8px 18px rgba(0,0,0,0.2)', opacity: prog(t, at + 0.5, at + 0.9), transform: `translateX(${(1 - prog(t, at + 0.5, at + 0.9)) * -40}px)`, whiteSpace: 'nowrap'}}>
            {icon && <F n={icon} size={44} />}
            {label}
          </div>
        )}
        {children}
      </div>
    </Enter>
  );
};

/**
 * Le fil rouge visuel : la charte qualité, un document officiel qui « s'écrit » ligne à ligne,
 * puis reçoit son sceau. `write` 0→1 pilote l'écriture, `seal` 0→1 le tampon.
 */
export const CharterDoc: React.FC<{w?: number; write?: number; seal?: number; dusty?: number; lines?: number; title?: string}> = ({w = 520, write = 1, seal = 0, dusty = 0, lines = 6, title = 'CHARTE QUALITÉ'}) => {
  const h = w * 1.3;
  const sc = w / 520;
  const sealS = seal <= 0 ? 0 : interpolate(seal, [0, 0.6, 1], [2.4, 0.9, 1]);
  return (
    <div style={{position: 'relative', width: w, height: h, filter: dusty ? `grayscale(${dusty}) brightness(${1 - dusty * 0.08})` : undefined}}>
      <div style={{position: 'absolute', inset: 0, borderRadius: 22 * sc, background: '#FFFDF7', boxShadow: '0 26px 50px rgba(30,25,10,0.25)', border: `${3 * sc}px solid #E7DFC9`, overflow: 'hidden'}}>
        <div style={{height: 120 * sc, background: colors.navy, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 * sc}}>
          <div style={{width: 54 * sc, height: 54 * sc, borderRadius: '50%', background: colors.green, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <svg width={34 * sc} height={34 * sc} viewBox="0 0 24 24"><path d="M4 12.5 L10 18 L20 6" stroke="#fff" strokeWidth={3.6} fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40 * sc, color: '#fff', letterSpacing: 1}}>{title}</div>
        </div>
        <div style={{padding: `${34 * sc}px ${40 * sc}px`}}>
          {Array.from({length: lines}, (_, i) => {
            const p = Math.max(0, Math.min(1, write * lines - i));
            const len = [0.92, 0.78, 0.86, 0.64, 0.9, 0.72, 0.8, 0.6][i % 8];
            return (
              <div key={i} style={{display: 'flex', alignItems: 'center', gap: 16 * sc, marginBottom: 30 * sc}}>
                <div style={{width: 30 * sc, height: 30 * sc, borderRadius: 8 * sc, background: p > 0.05 ? colors.green : '#E5E0D0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 18 * sc, color: '#fff', transform: `scale(${0.6 + 0.4 * Math.min(1, p * 3)})`}}>{i + 1}</div>
                <div style={{height: 14 * sc, borderRadius: 7 * sc, width: `${len * 100 * p}%`, background: i % 3 === 0 ? colors.navy : '#B9C1CC'}} />
              </div>
            );
          })}
          <div style={{position: 'absolute', left: 40 * sc, bottom: 40 * sc, fontFamily: handFont, fontSize: 46 * sc, color: colors.navy, opacity: write >= 1 ? 1 : 0}}>La Direction</div>
          <svg style={{position: 'absolute', left: 40 * sc, bottom: 30 * sc}} width={200 * sc} height={14 * sc}><path d={`M0 7 H${200 * sc}`} stroke="#C9C1AC" strokeWidth={3} strokeDasharray="6 6" /></svg>
        </div>
      </div>
      {seal > 0 && (
        <div style={{position: 'absolute', right: 26 * sc, bottom: 24 * sc, width: 150 * sc, height: 150 * sc, transform: `scale(${sealS}) rotate(-14deg)`, opacity: Math.min(1, seal * 3)}}>
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            {Array.from({length: 18}, (_, i) => {
              const a = (i / 18) * Math.PI * 2;
              return <circle key={i} cx={50 + 44 * Math.cos(a)} cy={50 + 44 * Math.sin(a)} r={7} fill={RED} />;
            })}
            <circle cx={50} cy={50} r={44} fill={RED} />
            <circle cx={50} cy={50} r={34} fill="none" stroke="#fff" strokeWidth={2.5} strokeDasharray="4 3" />
            <text x={50} y={47} textAnchor="middle" fontFamily="Montserrat" fontWeight={900} fontSize={13} fill="#fff">OFFICIEL</text>
            <text x={50} y={63} textAnchor="middle" fontFamily="Montserrat" fontWeight={800} fontSize={9} fill="#fff">APPROUVÉ</text>
          </svg>
        </div>
      )}
      {dusty > 0 && (
        <div style={{position: 'absolute', inset: 0, borderRadius: 22 * sc, opacity: dusty, background: 'radial-gradient(circle at 30% 20%, rgba(150,140,120,0.35), transparent 40%), radial-gradient(circle at 70% 70%, rgba(150,140,120,0.3), transparent 45%), rgba(190,180,160,0.25)'}} />
      )}
    </div>
  );
};

/** Carton de chapitre : grand numéro, titre et sous-titre, sur bandeau vert / marine. */
export const Chapter: React.FC<{at: number; until: number; n: number; title: string; sub: string; icons: string[]; total?: number}> = ({at, until, n, title, sub, icons, total = 5}) => {
  const t = useT();
  const sp = useSpring(at + 0.05, {damping: 12});
  const band = prog(t, at, at + 0.5, easeOut);
  const out = prog(t, until - 0.35, until, easeIn);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <div style={{position: 'absolute', left: 0, top: 640, width: 1080 * band, height: 640, background: `linear-gradient(120deg, ${colors.navy}, #17407F)`, transform: 'skewY(-4deg)', boxShadow: '0 30px 60px rgba(14,42,92,0.35)'}} />
      <div style={{position: 'absolute', right: 0, top: 1210, width: 760 * prog(t, at + 0.15, at + 0.65), height: 40, background: colors.green, transform: 'skewY(-4deg)'}} />
      <div style={{position: 'absolute', left: 40, top: 640, fontFamily: sansFont, fontWeight: 900, fontSize: 440, lineHeight: 1, color: 'transparent', WebkitTextStroke: `10px ${colors.greenLight}`, transform: `scale(${sp}) translateX(${(1 - sp) * -120}px)`, opacity: 0.9}}>{n}</div>
      <div style={{position: 'absolute', left: 400, top: 790, width: 640}}>
        <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 34, color: colors.greenLight, letterSpacing: 6, opacity: prog(t, at + 0.3, at + 0.7)}}>PARTIE {n} / {total}</div>
        <div style={{overflow: 'hidden', marginTop: 10}}>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: Math.max(...title.split(' ').map((w) => w.length)) >= 11 ? 64 : title.length > 12 ? 70 : 84, lineHeight: 1.02, color: '#fff', textTransform: 'uppercase', letterSpacing: -2, transform: `translateY(${(1 - prog(t, at + 0.35, at + 0.85)) * 110}%)`}}>{title}</div>
        </div>
        <div style={{fontFamily: handFont, fontSize: 54, color: '#fff', opacity: prog(t, at + 0.7, at + 1.1), marginTop: 14}}>{sub}</div>
      </div>
      {icons.map((ic, i) => (
        <Enter key={ic} at={at + 0.6 + i * 0.18} x={[230, 540, 850][i]} y={1450} bouncy>
          <div style={{width: 190, height: 190, borderRadius: 48, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 16px 32px rgba(14,42,92,0.22)', borderBottom: `8px solid ${colors.green}`}}>
            <F n={ic} size={130} float={6} />
          </div>
        </Enter>
      ))}
    </div>
  );
};

/** Ligne de liste : pastille-icône + libellé, qui glisse depuis la gauche. */
export const Row: React.FC<{at: number; until?: number; y: number; icon: string; label: string; sub?: string; color?: string; num?: number; w?: number; x?: number; active?: boolean}> = ({at, until, y, icon, label, sub, color = colors.green, num, w = 900, x = 540, active = true}) => (
  <Enter at={at} until={until} x={x} y={y} from="left" dist={-240}>
    <div style={{width: w, display: 'flex', alignItems: 'center', gap: 24, background: '#fff', borderRadius: 30, padding: '18px 26px', boxShadow: '0 14px 30px rgba(30,25,10,0.15)', borderLeft: `14px solid ${color}`, opacity: active ? 1 : 0.45, transition: 'none'}}>
      {num !== undefined && <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 64, color, width: 60, textAlign: 'center'}}>{num}</div>}
      <div style={{width: 104, height: 104, borderRadius: 26, background: '#F4F1E8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
        <F n={icon} size={80} />
      </div>
      <div style={{fontFamily: sansFont}}>
        <div style={{fontWeight: 900, fontSize: 44, color: colors.navy, lineHeight: 1.05}}>{label}</div>
        {sub && <div style={{fontWeight: 600, fontSize: 30, color: '#5B6675', marginTop: 6}}>{sub}</div>}
      </div>
    </div>
  </Enter>
);

/** Badge rond vert (validé) ou rouge (exclu). */
export const Verdict: React.FC<{ok: boolean; size?: number}> = ({ok, size = 120}) => (
  <div style={{width: size, height: size, borderRadius: '50%', background: ok ? colors.green : RED, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 12px 24px ${ok ? 'rgba(46,155,62,0.4)' : 'rgba(217,68,58,0.4)'}`, border: `${size * 0.06}px solid #fff`}}>
    <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24">
      {ok ? <path d="M4 12.5 L10 18 L20 6" stroke="#fff" strokeWidth={3.8} fill="none" strokeLinecap="round" strokeLinejoin="round" /> : <path d="M5 5 L19 19 M19 5 L5 19" stroke="#fff" strokeWidth={3.8} strokeLinecap="round" />}
    </svg>
  </div>
);

/** Trait barrant qui se dessine sur un élément. */
export const Strike: React.FC<{p: number; w: number; color?: string}> = ({p, w, color = RED}) => (
  <div style={{position: 'absolute', left: -10, top: '50%', width: (w + 20) * p, height: 12, borderRadius: 6, background: color, transform: 'rotate(-6deg)', transformOrigin: 'left center'}} />
);

/** Engrenage SVG qui tourne. */
export const Gear: React.FC<{size: number; color?: string; speed?: number; teeth?: number}> = ({size, color = colors.navy, speed = 1, teeth = 10}) => {
  const f = useCurrentFrame();
  const pts = Array.from({length: teeth * 2}, (_, i) => {
    const a = (i / (teeth * 2)) * Math.PI * 2;
    const r = i % 2 === 0 ? 48 : 38;
    return `${50 + r * Math.cos(a)},${50 + r * Math.sin(a)}`;
  }).join(' ');
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{transform: `rotate(${f * 2 * speed}deg)`}}>
      <polygon points={pts} fill={color} strokeLinejoin="round" stroke={color} strokeWidth={6} />
      <circle cx={50} cy={50} r={14} fill="#F1EDE3" />
    </svg>
  );
};

/** Petit compteur animé. */
export const useCount = (at: number, dur: number, to: number) => {
  const t = useT();
  return Math.round(to * prog(t, at, at + dur, easeInOut));
};
