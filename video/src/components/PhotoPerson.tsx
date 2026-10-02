import {Img, staticFile, useCurrentFrame} from 'remotion';

export const PERSONNES = {
  // Personne à droite de la photo (gilet orange), retournée pour regarder vers la droite.
  superviseur: {src: 'personnages/superviseur.png', ratio: 518 / 1000},
  // Personne à gauche de la photo (casque blanc, porte-documents).
  responsable: {src: 'personnages/responsable.png', ratio: 680 / 1000},
};

/**
 * Personnage détouré (photo) façon « sticker » : liseré blanc, ombre douce,
 * bas du buste fondu dans le décor. Placé par son centre (cx) et sa base (bottom).
 */
export const PhotoPerson: React.FC<{
  who: keyof typeof PERSONNES;
  cx: number;
  bottom: number;
  height: number;
  opacity?: number;
}> = ({who, cx, bottom, height, opacity = 1}) => {
  const frame = useCurrentFrame();
  const {src, ratio} = PERSONNES[who];
  const width = height * ratio;
  const breathe = 1 + 0.008 * Math.sin(frame / 10);
  const fade = 'linear-gradient(to bottom, #000 78%, transparent 100%)';
  return (
    <div
      style={{
        position: 'absolute',
        left: cx - width / 2,
        top: bottom - height,
        width,
        height,
        opacity,
        transformOrigin: '50% 100%',
        transform: `scale(${breathe})`,
        WebkitMaskImage: fade,
        maskImage: fade,
      }}
    >
      <Img
        src={staticFile(src)}
        style={{
          width: '100%',
          height: '100%',
          filter:
            'drop-shadow(5px 0 0 #fff) drop-shadow(-5px 0 0 #fff) drop-shadow(0 5px 0 #fff) drop-shadow(0 -5px 0 #fff) drop-shadow(0 14px 18px rgba(30,25,10,0.28))',
        }}
      />
    </div>
  );
};
