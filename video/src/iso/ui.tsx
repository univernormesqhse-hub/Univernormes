import {Img, staticFile, useCurrentFrame} from 'remotion';
import {colors, sansFont} from '../theme';

/** Illustration 3D Microsoft Fluent Emoji (licence MIT), placée par son centre. */
export const F: React.FC<{n: string; size: number; float?: number; style?: React.CSSProperties}> = ({n, size, float = 0, style}) => {
  const f = useCurrentFrame();
  return (
    <Img
      src={staticFile(`fluent/${n}.png`)}
      style={{width: size, height: size, display: 'block', transform: `translateY(${Math.sin(f / 14 + size) * float}px)`, filter: 'drop-shadow(0 14px 18px rgba(20,25,40,0.22))', ...style}}
    />
  );
};

/** Tuile blanche arrondie avec une illustration. */
export const Tile: React.FC<{n: string; size?: number; color?: string; children?: React.ReactNode}> = ({n, size = 150, color = colors.green, children}) => (
  <div style={{position: 'relative', width: size, height: size, borderRadius: size * 0.26, background: '#fff', boxShadow: '0 14px 30px rgba(30,25,10,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: `8px solid ${color}`}}>
    <F n={n} size={size * 0.72} />
    {children}
  </div>
);

/** Carte « certificat » ISO 9001 avec l'année. */
export const IsoCard: React.FC<{year: string; active?: boolean; w?: number}> = ({year, active, w = 330}) => (
  <div
    style={{
      width: w,
      height: w * 1.18,
      borderRadius: 30,
      background: active ? colors.navy : '#FBFAF6',
      border: `6px solid ${active ? colors.green : '#C9CFD6'}`,
      boxShadow: '0 18px 36px rgba(30,25,10,0.2)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      fontFamily: sansFont,
      color: active ? '#fff' : colors.ink,
      position: 'relative',
    }}
  >
    <div style={{fontWeight: 800, fontSize: w * 0.12, letterSpacing: 2, opacity: 0.85}}>ISO 9001</div>
    <div style={{fontWeight: 900, fontSize: w * 0.3, letterSpacing: -2, color: active ? colors.greenLight : '#5B6675', lineHeight: 1}}>{year}</div>
    <div style={{width: w * 0.5, height: 6, borderRadius: 3, background: active ? colors.green : '#C9CFD6', marginTop: 10}} />
  </div>
);

/** Barre de fondement (approche processus, satisfaction client…). */
export const Bar: React.FC<{label: string; n: string; color: string; w?: number; glow?: number}> = ({label, n, color, w = 760, glow = 0}) => (
  <div
    style={{
      width: w,
      height: 118,
      borderRadius: 24,
      background: color,
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      padding: '0 26px',
      boxShadow: `0 12px 26px rgba(14,42,92,0.25), 0 0 ${glow * 40}px ${glow * 10}px rgba(124,197,118,${glow * 0.8})`,
      fontFamily: sansFont,
      fontWeight: 900,
      fontSize: 40,
      color: '#fff',
      letterSpacing: 0.5,
      textTransform: 'uppercase',
    }}
  >
    <div style={{width: 84, height: 84, borderRadius: 20, background: 'rgba(255,255,255,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <F n={n} size={66} />
    </div>
    {label}
  </div>
);

/** Pastille de libellé. */
export const Pill: React.FC<{label: string; color?: string; icon?: string; size?: number}> = ({label, color = colors.green, icon, size = 34}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 12, background: '#fff', borderRadius: 16, padding: '12px 22px 12px 14px', boxShadow: '0 12px 26px rgba(30,25,10,0.18)', fontFamily: sansFont, fontWeight: 800, fontSize: size, color: colors.ink, whiteSpace: 'nowrap', borderLeft: `10px solid ${color}`}}>
    {icon && <F n={icon} size={size * 1.4} />}
    {label}
  </div>
);
