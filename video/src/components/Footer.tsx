import {easeIn, easeOut, prog, useT} from '../anim';
import {colors, sansItalic} from '../theme';

/** Bandeau bas droit : slogan sur bande marine avec barre oblique verte. */
export const Footer: React.FC<{hideAt: number}> = ({hideAt}) => {
  const t = useT();
  const x = 700 * (1 - prog(t, 0.25, 0.95, easeOut)) + 700 * prog(t, hideAt, hideAt + 0.45, easeIn);
  return (
  <div style={{position: 'absolute', left: 0, top: 1790, width: 1080, height: 130, transform: `translateX(${x}px)`}}>
    <svg width={1080} height={130} style={{position: 'absolute', inset: 0}}>
      <path d="M470 130 L548 18 Q556 6 572 6 H1080 V130 Z" fill={colors.navy} />
      <path d="M452 130 L534 12" stroke={colors.green} strokeWidth="8" />
      <path d="M560 128 L596 24 H628 L592 128 Z" fill={colors.green} />
    </svg>
    <div
      style={{
        position: 'absolute',
        left: 622,
        top: 28,
        fontFamily: sansItalic,
        fontStyle: 'italic',
        fontWeight: 700,
        fontSize: 31,
        lineHeight: '44px',
        color: '#fff',
        whiteSpace: 'nowrap',
      }}
    >
      Des normes aujourd’hui,
      <br />
      <span style={{color: colors.green, fontWeight: 500}}>un avenir durable demain</span>
    </div>
  </div>
  );
};
