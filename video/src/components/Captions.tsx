import {interpolate, useCurrentFrame} from 'remotion';
import {captions} from '../captions';
import {colors, FPS, handFont} from '../theme';

/** Sous-titre manuscrit dans une boîte blanche, 2 à 4 mots à la fois. */
export const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const cap = captions.find((c) => t >= c.start && t < c.end);
  if (!cap) return null;
  const local = frame - cap.start * FPS;
  const appear = interpolate(local, [0, 5], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 1652, display: 'flex', justifyContent: 'center'}}>
      <div
        style={{
          background: '#FCFBF7',
          borderRadius: 6,
          padding: '6px 34px 14px',
          boxShadow: '0 6px 14px rgba(40,30,10,0.18), 0 1px 0 rgba(0,0,0,0.05)',
          fontFamily: handFont,
          fontSize: 76,
          color: colors.ink,
          opacity: appear,
          transform: `scale(${0.94 + 0.06 * appear})`,
          whiteSpace: 'nowrap',
        }}
      >
        {cap.text}
      </div>
    </div>
  );
};
