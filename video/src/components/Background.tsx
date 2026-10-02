import {AbsoluteFill} from 'remotion';
import {colors, sansFont} from '../theme';

const noise = `url("data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.45  0 0 0 0 0.4  0 0 0 0 0.3  0 0 0 0.10 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`,
)}")`;

/** Fond papier beige + grille de points + filigrane UNIVERSNORMES. */
export const Background: React.FC = () => {
  const rows = Array.from({length: 21});
  return (
    <AbsoluteFill style={{backgroundColor: colors.paper}}>
      <AbsoluteFill style={{backgroundImage: noise}} />
      <AbsoluteFill
        style={{
          backgroundImage: 'radial-gradient(rgba(60,50,30,0.16) 2.6px, transparent 3px)',
          backgroundSize: '64px 64px',
          backgroundPosition: '20px 20px',
        }}
      />
      <AbsoluteFill style={{overflow: 'hidden'}}>
        {rows.map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: i * 96 - 20,
              left: i % 2 ? -260 : -40,
              whiteSpace: 'nowrap',
              fontFamily: sansFont,
              fontWeight: 900,
              fontSize: 112,
              letterSpacing: 2,
              color: 'rgba(40,35,25,0.032)',
            }}
          >
            UNIVERSNORMES UNIVERSNORMES
          </div>
        ))}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
