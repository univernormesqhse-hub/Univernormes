import {createContext, useContext} from 'react';
import {Img, staticFile} from 'remotion';

/** Visuels générés avec Nano Banana Pro (Higgsfield), détourés. */
export type AssetName =
  | 'dirigeant-presente' | 'dirigeant-dossiers' | 'dirigeant-pouce'
  | 'ouvrier-travail' | 'ouvrier-chute' | 'ouvrier-pouce'
  | 'machine' | 'machine-arret' | 'coffre' | 'garde-corps' | 'ambulance' | 'pieces' | 'fleche' | 'dossiers';

export const PlaceholderCtx = createContext(false);

export const assetSrc = (name: AssetName | 'decor', placeholder: boolean) => {
  const ext = name === 'decor' ? 'jpg' : 'png';
  return staticFile(`nanobanana/${placeholder ? '_placeholder_' : ''}${name}.${ext}`);
};

/** Visuel placé par son centre horizontal (x) et sa base (bottom), hauteur fixe. */
export const Asset: React.FC<{
  name: AssetName;
  x: number;
  bottom: number;
  h: number;
  opacity?: number;
  rotate?: number;
  scale?: number;
  dx?: number;
  dy?: number;
  flip?: boolean;
  glow?: string;
  origin?: string;
}> = ({name, x, bottom, h, opacity = 1, rotate = 0, scale = 1, dx = 0, dy = 0, flip, glow, origin = '50% 100%'}) => {
  const ph = useContext(PlaceholderCtx);
  if (opacity <= 0) return null;
  return (
    <div style={{position: 'absolute', left: x, top: bottom - h, height: h, transform: `translateX(-50%) translate(${dx}px, ${dy}px)`, opacity}}>
      <Img
        src={assetSrc(name, ph)}
        style={{
          height: h,
          display: 'block',
          transformOrigin: origin,
          transform: `scale(${scale * (flip ? -1 : 1)}, ${scale}) rotate(${rotate}deg)`,
          filter: `drop-shadow(0 18px 22px rgba(20,25,40,0.28))${glow ? ` drop-shadow(0 0 26px ${glow})` : ''}`,
        }}
      />
    </div>
  );
};

export const usePh = () => useContext(PlaceholderCtx);

export const euros = (n: number) => `${Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} €`;
