import {easeInOut, easeOut, prog, useT} from '../anim';
import {F} from '../iso/ui';
import {colors, handFont, sansFont} from '../theme';

export const TEAL = '#1FB89A';
export const M_COLORS = ['#3D7DD8', '#F2A33A', '#2E9B3E', '#E0457B', '#7B5CD6', '#1FB89A', '#D9443A', '#E3A92B'];

export type Branch = {label: string; at: number; color?: string; icon?: string; items?: [string, number][]};

/**
 * Diagramme d'Ishikawa animé : colonne vertébrale qui se trace, tête « problème »,
 * arêtes alternées haut / bas qui poussent, étiquettes et causes qui se posent.
 */
export const Fishbone: React.FC<{
  at: number;
  branches: Branch[];
  head?: string;
  headAt?: number;
  y?: number;
  w?: number;
  scale?: number;
  highlight?: number;
}> = ({at, branches, head = 'PROBLÈME', headAt, y = 1000, w = 1000, scale = 1, highlight = -1}) => {
  const t = useT();
  const spine = prog(t, at, at + 0.9, easeInOut);
  const hAt = headAt ?? at + 0.6;
  const headP = prog(t, hAt, hAt + 0.5, easeOut);
  const x0 = 30;
  const x1 = w - 230;
  const perSide = Math.ceil(branches.length / 2);
  const step = (x1 - 230 - x0) / perSide;
  return (
    <div style={{position: 'absolute', left: 540 - w / 2, top: y - 360, width: w, height: 720, transform: `scale(${scale})`, transformOrigin: '50% 50%'}}>
      <svg width={w} height={720} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
        {/* queue */}
        <path d={`M${x0 - 10} 290 L${x0 + 60} 360 L${x0 - 10} 430 Z`} fill={colors.navy} opacity={prog(t, at, at + 0.4)} />
        <line x1={x0 + 40} y1={360} x2={x0 + 40 + (x1 - x0) * spine} y2={360} stroke={colors.navy} strokeWidth={16} strokeLinecap="round" />
        {branches.map((b, i) => {
          const top = i % 2 === 0;
          const k = Math.floor(i / 2);
          const bx = x0 + 200 + k * step + (top ? 0 : step * 0.5);
          const p = prog(t, b.at, b.at + 0.6, easeOut);
          const c = b.color ?? M_COLORS[i % M_COLORS.length];
          const ex = bx - 100;
          const ey = top ? 140 - (k % 2) * 80 : 580 + (k % 2) * 80;
          const hl = highlight === i;
          return (
            <g key={b.label} opacity={highlight >= 0 && !hl ? 0.35 : 1}>
              <line x1={bx + 40} y1={360} x2={bx + 40 + (ex - bx - 40) * p} y2={360 + (ey - 360) * p} stroke={c} strokeWidth={hl ? 12 : 9} strokeLinecap="round" />
              {(b.items ?? []).map(([, ia], j) => {
                const ip = prog(t, ia, ia + 0.4);
                const fy = 360 + (ey - 360) * (0.35 + j * 0.25);
                const fx = bx + 40 + (ex - bx - 40) * (0.35 + j * 0.25);
                return <line key={j} x1={fx} y1={fy} x2={fx + 110 * ip} y2={fy} stroke={c} strokeWidth={5} strokeLinecap="round" />;
              })}
            </g>
          );
        })}
      </svg>
      {branches.map((b, i) => {
        const top = i % 2 === 0;
        const k = Math.floor(i / 2);
        const bx = x0 + 200 + k * step + (top ? 0 : step * 0.5);
        const ex = bx - 100;
        const ey = top ? 140 - (k % 2) * 80 : 580 + (k % 2) * 80;
        const p = prog(t, b.at + 0.35, b.at + 0.8, easeOut);
        const c = b.color ?? M_COLORS[i % M_COLORS.length];
        const hl = highlight === i;
        return (
          <div key={b.label} style={{opacity: highlight >= 0 && !hl ? 0.35 : 1}}>
            <div style={{position: 'absolute', left: ex, top: ey + (top ? -54 : 54), transform: `translate(-50%, -50%) scale(${p * (hl ? 1.12 : 1)})`, background: c, color: '#fff', borderRadius: 40, padding: '10px 22px', fontFamily: sansFont, fontWeight: 900, fontSize: 28, whiteSpace: 'nowrap', boxShadow: '0 8px 18px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: 8, border: '4px solid #fff'}}>
              {b.icon && <F n={b.icon} size={40} />}
              {b.label}
            </div>
            {(b.items ?? []).map(([txt, ia], j) => {
              const fy = 360 + (ey - 360) * (0.35 + j * 0.25);
              const fx = bx + 40 + (ex - bx - 40) * (0.35 + j * 0.25);
              return (
                <div key={j} style={{position: 'absolute', left: fx + 118, top: fy, transform: 'translateY(-50%)', fontFamily: handFont, fontSize: 30, color: colors.navy, whiteSpace: 'nowrap', opacity: prog(t, ia + 0.2, ia + 0.5)}}>{txt}</div>
              );
            })}
          </div>
        );
      })}
      {/* tête */}
      <div style={{position: 'absolute', left: x1 + 20, top: 360, transform: `translate(0, -50%) scale(${headP})`, transformOrigin: 'left center'}}>
        <div style={{width: 230, height: 190, background: colors.navy, borderRadius: '30px 110px 110px 30px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 16px 30px rgba(14,42,92,0.35)', position: 'relative'}}>
          <div style={{position: 'absolute', right: 38, top: 40, width: 22, height: 22, borderRadius: '50%', background: '#fff'}} />
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: head.length > 9 ? 26 : 32, color: '#fff', letterSpacing: 1, textAlign: 'center', lineHeight: 1.05, padding: '0 30px 0 12px'}}>{head}</div>
        </div>
      </div>
    </div>
  );
};

/** Grande carte « M » (lettre + rang + icônes). */
export const MCard: React.FC<{n: number; name: string; color: string; icons: string[]; at: number}> = ({n, name, color, icons, at}) => {
  const t = useT();
  return (
    <div style={{width: 940, height: 330, borderRadius: 40, background: '#fff', boxShadow: '0 20px 40px rgba(14,30,60,0.18)', display: 'flex', alignItems: 'center', padding: '0 40px', gap: 30, borderLeft: `20px solid ${color}`}}>
      <div style={{position: 'relative', width: 230, textAlign: 'center'}}>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 230, lineHeight: 1, color}}>M</div>
        <div style={{position: 'absolute', right: -6, top: 6, width: 64, height: 64, borderRadius: '50%', background: colors.navy, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 38, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{n}</div>
      </div>
      <div style={{flex: 1}}>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 64, color: colors.navy, textTransform: 'uppercase', letterSpacing: -1, lineHeight: 1}}>{name}</div>
        <div style={{display: 'flex', gap: 22, marginTop: 22}}>
          {icons.map((ic, i) => {
            const p = prog(t, at + 0.5 + i * 0.2, at + 0.9 + i * 0.2, easeOut);
            return (
              <div key={ic} style={{width: 110, height: 110, borderRadius: 28, background: '#F4F1E8', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${p})`}}>
                <F n={ic} size={84} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
