import {Img, staticFile, useCurrentFrame} from 'remotion';
import {colors} from '../theme';

export const PERSONNES = {
  // Personne à droite de la photo (gilet orange), retournée pour regarder vers la droite.
  superviseur: {src: 'personnages/superviseur.png', ratio: 518 / 1000},
  // Personne à gauche de la photo (casque blanc, porte-documents).
  responsable: {src: 'personnages/responsable.png', ratio: 680 / 1000},
};

/**
 * Personnage détouré (photo) façon « sticker » : liseré blanc, ombre portée,
 * bas du buste fondu. Placé par son centre (cx) et sa base (bottom).
 * `reveal` (0 → 1) le fait monter depuis sa base, comme sortant d'un masque.
 */
export const PhotoPerson: React.FC<{
  who: keyof typeof PERSONNES;
  cx: number;
  bottom: number;
  height: number;
  opacity?: number;
  reveal?: number;
  tilt?: number;
}> = ({who, cx, bottom, height, opacity = 1, reveal = 1, tilt = 0}) => {
  const frame = useCurrentFrame();
  const {src, ratio} = PERSONNES[who];
  const width = height * ratio;
  const breathe = 1 + 0.008 * Math.sin(frame / 10);
  const fade = 'linear-gradient(to bottom, #000 80%, transparent 100%)';
  return (
    <div
      style={{
        position: 'absolute',
        left: cx - width / 2,
        top: bottom - height,
        width,
        height,
        opacity,
        overflow: 'hidden',
        WebkitMaskImage: fade,
        maskImage: fade,
      }}
    >
      <Img
        src={staticFile(src)}
        style={{
          width: '100%',
          height: '100%',
          transformOrigin: '50% 100%',
          transform: `translateY(${(1 - reveal) * 105}%) scale(${breathe}) rotate(${tilt}deg)`,
          filter:
            'drop-shadow(5px 0 0 #fff) drop-shadow(-5px 0 0 #fff) drop-shadow(0 5px 0 #fff) drop-shadow(0 -5px 0 #fff) drop-shadow(0 16px 20px rgba(30,25,10,0.28))',
        }}
      />
    </div>
  );
};

/** Disque de marque derrière un personnage, avec anneau pointillé en rotation. */
export const Plate: React.FC<{x: number; y: number; r: number; p: number; color?: string}> = ({x, y, r, p, color = colors.green}) => {
  const frame = useCurrentFrame();
  if (p <= 0) return null;
  return (
    <div style={{position: 'absolute', left: x - r, top: y - r, width: r * 2, height: r * 2, transform: `scale(${p})`}}>
      <div style={{position: 'absolute', inset: 0, borderRadius: '50%', background: `radial-gradient(circle at 35% 30%, ${color}55, ${color}22 70%)`}} />
      <svg width={r * 2} height={r * 2} style={{position: 'absolute', inset: 0, transform: `rotate(${frame * 0.6}deg)`}}>
        <circle cx={r} cy={r} r={r - 8} fill="none" stroke={color} strokeWidth={6} strokeDasharray="4 22" strokeLinecap="round" />
      </svg>
      <svg width={r * 2 + 60} height={r * 2 + 60} style={{position: 'absolute', left: -30, top: -30, transform: `rotate(${-frame * 0.9}deg)`}}>
        <circle cx={r + 30} cy={r + 30} r={r + 22} fill="none" stroke={color} strokeWidth={8} strokeDasharray={`${r * 1.2} ${r * 5}`} strokeLinecap="round" />
      </svg>
    </div>
  );
};
