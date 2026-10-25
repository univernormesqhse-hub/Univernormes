import {useCurrentFrame} from 'remotion';
import {easeOut, prog} from '../anim';
import {Caption} from '../captions';
import {FPS, sansFont} from '../theme';

/**
 * Sous-titre « néo-brutaliste » (skill capsule-ui-neo-brutal) : 2 à 4 mots en grotesque très grasse, dans une carte
 * blanche à bordure noire épaisse et ombre dure décalée, avec le mot porteur (*…*) en couleur d'accent.
 * Entrée en ressort court (6 images max), remplacée à chaque groupe de mots.
 */
export const NeoCaptions: React.FC<{captions: Caption[]; accent?: string; top?: number}> = ({captions, accent = '#22B573', top = 1640}) => {
  const frame = useCurrentFrame();
  // ~0,15 s d'avance sur la voix (règle de livraison de la librairie)
  const t = frame / FPS + 0.15;
  const cap = captions.find((c) => t >= c.start && t < c.end);
  if (!cap) return null;
  const p = prog(t, cap.start, cap.start + 6 / FPS, easeOut);
  const chars = cap.text.replace(/\*/g, '').length;
  const fontSize = Math.min(64, Math.floor(900 / (chars * 0.6)));
  let inKey = false;
  const words = cap.text.split(' ');
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top, display: 'flex', justifyContent: 'center'}}>
      <div
        style={{
          background: '#fff',
          border: '4px solid #111',
          borderRadius: 16,
          boxShadow: '8px 8px 0 #111',
          padding: '8px 30px 12px',
          fontFamily: sansFont,
          fontWeight: 900,
          fontSize,
          color: '#111',
          whiteSpace: 'nowrap',
          letterSpacing: -0.5,
          transform: `translateY(${(1 - p) * 24}px) scale(${0.9 + 0.1 * p})`,
          opacity: Math.min(1, p * 1.6),
        }}
      >
        {words.map((w, i) => {
          if (w.startsWith('*')) inKey = true;
          const key = inKey;
          if (w.replace(/[.,?:;!…»]+$/, '').endsWith('*')) inKey = false;
          return (
            <span key={i} style={{marginRight: i < words.length - 1 ? '0.24em' : 0, color: key ? accent : '#111'}}>
              {w.replace(/\*/g, '')}
            </span>
          );
        })}
      </div>
    </div>
  );
};
