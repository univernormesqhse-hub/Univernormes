import {useCurrentFrame} from 'remotion';
import {easeOut, prog} from '../anim';
import {Caption} from '../captions';
import {colors, FPS, handFont} from '../theme';

/**
 * Sous-titre manuscrit dans une boîte blanche : la boîte arrive en ressort léger,
 * les mots se révèlent un à un, les mots clés (*…*) sont surlignés en vert.
 */
export const Captions: React.FC<{captions: Caption[]}> = ({captions}) => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const cap = captions.find((c) => t >= c.start && t < c.end);
  if (!cap) return null;
  const words = cap.text.split(' ');
  const dur = cap.end - cap.start;
  const step = Math.min(0.11, (dur * 0.6) / words.length);
  const box = prog(t, cap.start, cap.start + 0.22);
  let inKey = false;
  // Police réduite pour les sous-titres longs (la boîte ne dépasse jamais l'écran).
  const chars = cap.text.replace(/\*/g, '').length;
  const fontSize = Math.min(76, Math.floor(990 / (chars * 0.47)));
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 1650, display: 'flex', justifyContent: 'center'}}>
      <div
        style={{
          background: '#FCFBF7',
          borderRadius: 8,
          padding: '6px 34px 14px',
          boxShadow: '0 8px 18px rgba(40,30,10,0.2), 0 1px 0 rgba(0,0,0,0.05)',
          fontFamily: handFont,
          fontSize,
          color: colors.ink,
          whiteSpace: 'nowrap',
          transform: `translateY(${(1 - box) * 18}px) scale(${0.92 + 0.08 * box}) rotate(${(1 - box) * -1.5}deg)`,
          opacity: Math.min(1, box * 2),
        }}
      >
        {words.map((w, i) => {
          if (w.startsWith('*')) inKey = true;
          const key = inKey;
          if (w.endsWith('*') || w.replace(/[.,?…]+$/, '').endsWith('*')) inKey = false;
          const p = prog(t, cap.start + i * step, cap.start + i * step + 0.18, easeOut);
          return (
            <span
              key={i}
              style={{
                display: 'inline-block',
                marginRight: i < words.length - 1 ? '0.26em' : 0,
                opacity: p,
                transform: `translateY(${(1 - p) * 14}px)`,
                color: key ? colors.green : colors.ink,
              }}
            >
              {w.replace(/\*/g, '')}
            </span>
          );
        })}
      </div>
    </div>
  );
};
