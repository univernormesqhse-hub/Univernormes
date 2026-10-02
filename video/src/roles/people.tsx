import {Img, staticFile, useCurrentFrame} from 'remotion';
import {colors, sansFont} from '../theme';

// Les deux personnages (photos détourées) et leur cadrage de médaillon.
export const AGENT = {src: 'personnages/equipe-hse/agent.png', ratio: 758 / 1100, fx: 0.4, fy: 0.21, win: 0.44, color: colors.green, title: 'Agent HSE'};
export const SUPERVISEUR = {src: 'personnages/equipe-hse/responsable.png', ratio: 738 / 1100, fx: 0.44, fy: 0.2, win: 0.42, color: colors.navy, title: 'Superviseur HSE'};
export type Person = typeof AGENT;

const STICKER =
  'drop-shadow(5px 0 0 #fff) drop-shadow(-5px 0 0 #fff) drop-shadow(0 5px 0 #fff) drop-shadow(0 -5px 0 #fff) drop-shadow(0 16px 20px rgba(30,25,10,0.28))';

/** Photo détourée façon sticker, placée par son centre (cx) et sa base (bottom). */
export const Hero: React.FC<{p: Person; cx: number; bottom: number; h: number; reveal?: number; opacity?: number; flip?: boolean}> = ({p, cx, bottom, h, reveal = 1, opacity = 1, flip}) => {
  const f = useCurrentFrame();
  const w = h * p.ratio;
  const fade = 'linear-gradient(to bottom, #000 80%, transparent 100%)';
  return (
    <div style={{position: 'absolute', left: cx - w / 2, top: bottom - h, width: w, height: h, overflow: 'hidden', opacity, WebkitMaskImage: fade, maskImage: fade}}>
      <Img src={staticFile(p.src)} style={{width: '100%', height: '100%', transformOrigin: '50% 100%', transform: `translateY(${(1 - reveal) * 105}%) scale(${(flip ? -1 : 1) * (1 + 0.008 * Math.sin(f / 10))}, ${1 + 0.008 * Math.sin(f / 10)})`, filter: STICKER}} />
    </div>
  );
};

/** Portrait rond (médaillon). */
export const Medal: React.FC<{p: Person; r: number; ring?: string}> = ({p, r, ring}) => {
  const h = (2 * r) / p.win;
  const w = h * p.ratio;
  return (
    <div style={{position: 'relative', width: r * 2, height: r * 2, borderRadius: '50%', overflow: 'hidden', background: 'radial-gradient(circle at 40% 30%, #fff, #DCEFD9)', border: '8px solid #fff', boxShadow: `0 0 0 6px ${ring ?? p.color}, 0 14px 28px rgba(30,25,10,0.22)`}}>
      <Img src={staticFile(p.src)} style={{position: 'absolute', height: h, width: w, left: r - 8 - p.fx * w, top: r - 8 - p.fy * h}} />
    </div>
  );
};

export const NameTag: React.FC<{p: Person; size?: number}> = ({p, size = 40}) => (
  <div style={{background: p.color, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: size, padding: '8px 24px 10px', borderRadius: 14, whiteSpace: 'nowrap', textTransform: 'uppercase'}}>{p.title}</div>
);
