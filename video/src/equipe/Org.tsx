import {Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {easeIn, easeInOut, easeOut, Kinetic, prog, useSpring, useT} from '../anim';
import {Plate} from '../components/PhotoPerson';
import {colors, sansFont} from '../theme';
import {Link, R, Role, ROLES} from './roles';

const STICKER =
  'drop-shadow(5px 0 0 #fff) drop-shadow(-5px 0 0 #fff) drop-shadow(0 5px 0 #fff) drop-shadow(0 -5px 0 #fff) drop-shadow(0 16px 20px rgba(30,25,10,0.28))';

const heroBox = (r: Role) => {
  const h = r.heroHeight;
  const w = h * r.ratio;
  const cx = r.side === 'right' ? (r.ratio > 0.9 ? 620 : 700) : r.ratio > 0.9 ? 460 : 380;
  return {left: cx - w / 2, top: 1610 - h, w, h, cx};
};

const medBox = (r: Role) => {
  const h = (2 * R) / r.win;
  const w = h * r.ratio;
  return {left: r.x - r.fx * w, top: r.y - r.fy * h, w, h};
};

/**
 * Un rôle : présentation plein écran (« héros », photo détourée façon sticker),
 * puis envol vers son médaillon dans l'organigramme.
 */
export const RoleFigure: React.FC<{role: Role; dim: number}> = ({role, dim}) => {
  const t = useT();
  const plateP = useSpring(role.heroIn, {damping: 14});
  if (t < role.heroIn) return null;
  const reveal = prog(t, role.heroIn, role.heroIn + 0.7);
  const m = prog(t, role.heroOut, role.heroOut + 0.65, easeInOut);
  const hb = heroBox(role);
  const mb = medBox(role);
  const L = interpolate(m, [0, 1], [hb.left, mb.left]);
  const T = interpolate(m, [0, 1], [hb.top, mb.top]);
  const W = interpolate(m, [0, 1], [hb.w, mb.w]);
  const H = interpolate(m, [0, 1], [hb.h, mb.h]);
  const fcx = L + role.fx * W;
  const fcy = T + role.fy * H;
  const ccx = interpolate(m, [0, 1], [fcx, role.x]);
  const ccy = interpolate(m, [0, 1], [fcy, role.y]);
  const rad = interpolate(m, [0, 0.85, 1], [2200, R * 1.6, R], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const landed = prog(t, role.heroOut + 0.5, role.heroOut + 0.9);
  const bump = m >= 1 ? 1 + 0.08 * Math.sin(Math.min(1, (t - role.heroOut - 0.65) / 0.35) * Math.PI) : 1;
  const opacity = interpolate(dim, [0, 1], [1, 0.25]);
  const fadeBottom = m < 1 ? `linear-gradient(to bottom, #000 ${80 + m * 20}%, transparent 100%)` : 'none';
  return (
    <div style={{position: 'absolute', inset: 0, opacity, transform: `scale(${bump})`, transformOrigin: `${role.x}px ${role.y}px`}}>
      {m < 1 && <Plate x={hb.cx} y={hb.top + hb.h * 0.32} r={330} p={plateP * (1 - m)} />}
      {/* disque du médaillon */}
      {m > 0 && (
        <div
          style={{
            position: 'absolute',
            left: role.x - R,
            top: role.y - R,
            width: R * 2,
            height: R * 2,
            borderRadius: '50%',
            background: `radial-gradient(circle at 40% 30%, #ffffff, #DCEFD9)`,
            opacity: m,
            boxShadow: '0 12px 26px rgba(30,25,10,0.22)',
          }}
        />
      )}
      <div style={{position: 'absolute', inset: 0, clipPath: `circle(${rad}px at ${ccx}px ${ccy}px)`}}>
        <div style={{position: 'absolute', left: L, top: T, width: W, height: H, overflow: 'hidden', WebkitMaskImage: fadeBottom, maskImage: fadeBottom}}>
          <Img
            src={staticFile(role.src)}
            style={{width: '100%', height: '100%', transformOrigin: '50% 100%', transform: `translateY(${(1 - reveal) * 105}%)`, filter: m < 0.6 ? STICKER : 'none'}}
          />
        </div>
      </div>
      {/* anneau du médaillon */}
      {m > 0 && (
        <svg width={R * 2 + 40} height={R * 2 + 40} style={{position: 'absolute', left: role.x - R - 20, top: role.y - R - 20, opacity: m}}>
          <circle cx={R + 20} cy={R + 20} r={R + 2} fill="none" stroke="#fff" strokeWidth={8} />
          <circle cx={R + 20} cy={R + 20} r={R + 9} fill="none" stroke={colors.green} strokeWidth={5} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - landed} transform={`rotate(-90 ${R + 20} ${R + 20})`} />
        </svg>
      )}
      {/* étiquette */}
      {landed > 0 && (
        <div style={{position: 'absolute', left: role.x - 200, top: role.y + R + 18, width: 400, textAlign: 'center', fontFamily: sansFont, opacity: landed, transform: `translateY(${(1 - landed) * 20}px)`}}>
          <div style={{fontWeight: 800, fontSize: 31, color: colors.navy, lineHeight: 1.1}}>{role.title}</div>
          <div style={{fontWeight: 600, fontSize: 22, color: colors.green, marginTop: 4}}>{role.mission}</div>
        </div>
      )}
    </div>
  );
};

/** Textes de la séquence « héros » : numéro, titre cinétique, puces de missions. */
export const HeroText: React.FC<{role: Role}> = ({role}) => {
  const t = useT();
  const until = role.heroOut + 0.15;
  if (t < role.heroIn - 0.1 || t > until + 0.4) return null;
  const left = role.side === 'right';
  const chipX = left ? 60 : 1080 - 60;
  const badge = prog(t, role.heroIn, role.heroIn + 0.4) * (1 - prog(t, until - 0.25, until, easeIn));
  const [w1, ...rest] = role.title.split(' ');
  return (
    <>
      <div style={{position: 'absolute', left: 540 - 90, top: 262, width: 180, textAlign: 'center', opacity: badge, transform: `scale(${0.6 + 0.4 * badge})`}}>
        <span style={{background: colors.navy, color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: 28, padding: '6px 18px', borderRadius: 30}}>
          {role.num} <span style={{opacity: 0.55}}>/ 06</span>
        </span>
      </div>
      <Kinetic text={`${w1} *${rest.join(' ')}*`} at={role.heroIn + 0.05} until={until} y={475} size={w1.length > 11 ? 92 : 104} />
      {role.chips.map((c, i) => {
        const p = prog(t, c.at, c.at + 0.45);
        const out = prog(t, until - 0.3 + i * 0.04, until + i * 0.04, easeIn);
        if (t < c.at || out >= 1) return null;
        const strike = c.strike ? prog(t, c.at + 0.35, c.at + 0.7) : 0;
        return (
          <div
            key={c.label}
            style={{
              position: 'absolute',
              top: 640 + i * 128,
              ...(left ? {left: chipX} : {right: 1080 - chipX}),
              opacity: Math.min(1, p * 2) * (1 - out),
              transform: `translateX(${(left ? -1 : 1) * ((1 - p) * 120 + out * 160)}px)`,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              background: '#fff',
              borderRadius: 18,
              padding: '16px 26px 16px 18px',
              boxShadow: '0 12px 26px rgba(30,25,10,0.16)',
              fontFamily: sansFont,
              fontWeight: 800,
              fontSize: 34,
              color: c.strike ? '#8A94A3' : colors.ink,
              whiteSpace: 'nowrap',
            }}
          >
            <div style={{width: 40, height: 40, borderRadius: '50%', background: c.strike ? '#D9443A' : colors.green, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26}}>
              {c.strike ? '✕' : '✓'}
            </div>
            <span style={{position: 'relative'}}>
              {c.label}
              {c.strike && <span style={{position: 'absolute', left: 0, top: '52%', height: 5, width: `${strike * 100}%`, background: '#D9443A', borderRadius: 3}} />}
            </span>
          </div>
        );
      })}
    </>
  );
};

/** Emplacement vide d'un maillon (cercle pointillé numéroté). */
export const Slot: React.FC<{role: Role; at: number; index: number}> = ({role, at, index}) => {
  const t = useT();
  const f = useCurrentFrame();
  const sp = useSpring(at, {damping: 11});
  if (t < at || t > role.heroOut + 0.7) return null;
  const pulse = 1 + 0.03 * Math.sin(f / 8 + index);
  return (
    <div style={{position: 'absolute', left: role.x - R, top: role.y - R, width: R * 2, height: R * 2, transform: `scale(${sp * pulse})`}}>
      <svg width={R * 2} height={R * 2} style={{position: 'absolute', inset: 0, transform: `rotate(${f * 0.5}deg)`}}>
        <circle cx={R} cy={R} r={R - 4} fill="rgba(255,255,255,0.45)" stroke={colors.navy} strokeOpacity={0.35} strokeWidth={5} strokeDasharray="10 14" strokeLinecap="round" />
      </svg>
      <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 64, color: colors.navy, opacity: 0.3}}>{index + 1}</div>
    </div>
  );
};

/** Géométrie d'un lien entre deux médaillons (bord à bord). */
export const linkGeom = (l: Link) => {
  const a = ROLES[l.from];
  const b = ROLES[l.to];
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const d = Math.hypot(dx, dy);
  const ux = dx / d;
  const uy = dy / d;
  const pad = R + 22;
  return {x1: a.x + ux * pad, y1: a.y + uy * pad, x2: b.x - ux * pad, y2: b.y - uy * pad, ux, uy, len: d - pad * 2};
};

/** Flèches de l'organigramme + flux de particules (information qui circule). */
export const Links: React.FC<{links: Link[]; flow: number; highlight: 'down' | 'up' | null; hl: number}> = ({links, flow, highlight, hl}) => {
  const t = useT();
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
      <defs>
        <marker id="hd-down" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 Z" fill={colors.navy} />
        </marker>
        <marker id="hd-up" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 Z" fill={colors.green} />
        </marker>
      </defs>
      {links.map((l, i) => {
        if (t < l.at) return null;
        const g = linkGeom(l);
        const p = prog(t, l.at, l.at + 0.55, easeOut);
        const color = l.up ? colors.green : colors.navy;
        const isHl = highlight === (l.up ? 'up' : 'down');
        const w = 8 + (isHl ? hl * 6 : 0);
        const op = highlight && !isHl ? 1 - hl * 0.6 : 1;
        const x2 = g.x1 + (g.x2 - g.x1) * p;
        const y2 = g.y1 + (g.y2 - g.y1) * p;
        const dots = flow > 0 ? [0, 1, 2] : [];
        return (
          <g key={i} opacity={op}>
            <line x1={g.x1} y1={g.y1} x2={x2} y2={y2} stroke={color} strokeWidth={w} strokeLinecap="round" markerEnd={p > 0.95 ? `url(#hd-${l.up ? 'up' : 'down'})` : undefined} />
            {dots.map((k) => {
              const ph = ((t * 0.9 + k / 3 + i * 0.13) % 1);
              return <circle key={k} cx={g.x1 + (g.x2 - g.x1) * ph} cy={g.y1 + (g.y2 - g.y1) * ph} r={9} fill={l.up ? colors.greenLight : '#5B7BB8'} stroke="#fff" strokeWidth={3} opacity={flow * Math.sin(ph * Math.PI)} />;
            })}
            {l.label && p > 0.9 && (
              <text
                x={(g.x1 + g.x2) / 2 + (g.ux > 0 ? 34 : -34)}
                y={(g.y1 + g.y2) / 2 - 14}
                textAnchor={g.ux > 0 ? 'start' : 'end'}
                fontFamily="Montserrat"
                fontWeight={700}
                fontSize={24}
                fill={colors.navy}
                opacity={prog(t, l.at + 0.5, l.at + 0.9) * 0.75}
              >
                {l.label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
};
