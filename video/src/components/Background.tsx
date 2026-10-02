import {AbsoluteFill, random, useCurrentFrame} from 'remotion';
import {colors, sansFont} from '../theme';

const noise = `url("data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.45  0 0 0 0 0.4  0 0 0 0 0.3  0 0 0 0.10 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`,
)}")`;

const PARTICLES = Array.from({length: 26}, (_, i) => ({
  x: random(`px${i}`) * 1080,
  y: random(`py${i}`) * 1920,
  r: 4 + random(`pr${i}`) * 9,
  speed: 0.2 + random(`ps${i}`) * 0.6,
  plus: random(`pk${i}`) > 0.6,
  green: random(`pc${i}`) > 0.5,
}));

/**
 * Fond papier vivant : texture, grille de points, filigrane qui défile lentement,
 * grandes formes floues en parallaxe et particules flottantes.
 */
export const Background: React.FC<{tint?: string; tintAmount?: number}> = ({tint = colors.green, tintAmount = 0}) => {
  const f = useCurrentFrame();
  const rows = Array.from({length: 22});
  return (
    <AbsoluteFill style={{backgroundColor: colors.paper, overflow: 'hidden'}}>
      <AbsoluteFill style={{backgroundImage: noise}} />
      {/* formes floues de marque */}
      <div
        style={{
          position: 'absolute',
          width: 900,
          height: 900,
          borderRadius: '50%',
          left: 480 + Math.sin(f / 70) * 60,
          top: 200 + Math.cos(f / 90) * 50,
          background: `radial-gradient(circle, ${colors.green}2E 0%, transparent 65%)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 1000,
          height: 1000,
          borderRadius: '50%',
          left: -420 + Math.cos(f / 80) * 50,
          top: 1050 + Math.sin(f / 60) * 60,
          background: `radial-gradient(circle, ${colors.navy}24 0%, transparent 65%)`,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage: 'radial-gradient(rgba(60,50,30,0.15) 2.6px, transparent 3px)',
          backgroundSize: '64px 64px',
          backgroundPosition: `20px ${20 - ((f * 0.4) % 64)}px`,
        }}
      />
      {rows.map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: i * 96 - 60,
            left: (i % 2 ? -260 : -40) - ((f * (i % 2 ? 0.6 : -0.6)) % 1180) - (i % 2 ? 0 : 590),
            whiteSpace: 'nowrap',
            fontFamily: sansFont,
            fontWeight: 900,
            fontSize: 112,
            letterSpacing: 2,
            color: 'rgba(40,35,25,0.03)',
          }}
        >
          UNIVERSNORMES UNIVERSNORMES UNIVERSNORMES
        </div>
      ))}
      {PARTICLES.map((p, i) => {
        const y = (((p.y - f * p.speed * 2) % 2000) + 2000) % 2000 - 40;
        const x = p.x + Math.sin(f / 40 + i) * 18;
        const c = p.green ? colors.green : colors.navy;
        return p.plus ? (
          <div key={i} style={{position: 'absolute', left: x, top: y, color: c, opacity: 0.22, fontFamily: sansFont, fontWeight: 900, fontSize: p.r * 4, lineHeight: 1}}>
            +
          </div>
        ) : (
          <div key={i} style={{position: 'absolute', left: x, top: y, width: p.r * 2, height: p.r * 2, borderRadius: '50%', border: `3px solid ${c}`, opacity: 0.2}} />
        );
      })}
      {tintAmount > 0 && <AbsoluteFill style={{background: tint, opacity: tintAmount}} />}
    </AbsoluteFill>
  );
};
