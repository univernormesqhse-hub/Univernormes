import {AbsoluteFill, Audio, random, staticFile} from 'remotion';
import {easeIn, easeInOut, easeOut, Gate, Kinetic, prog, useT} from '../anim';
import {Captions} from '../components/Captions';
import {Backdrop, Check, shadow} from '../identui/IdentUi';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {colors, handFont, s, sansFont} from '../theme';
import {captions} from './captions';

/**
 * « Comment fonctionne vraiment une norme ISO » — UI motion premium (skill video-promo-diagnostic-qhse)
 * avec des techniques de montage inédites dans la série : compteur à rouleaux (odomètre),
 * réseau « chaos » qui se réaligne en processus (raccord début / fin), document qui se déplie en 3D,
 * tiroir qui se referme, éventail de cartes, transitions en panoramique filé (whip pan).
 */
const LOGO = 'promo/logo.png';
const CHAOS = 6.84;
const EXPERTS = 13.92;
const DRAWER = 23.18;
const FIELD = 28.58;
const CERTIF = 38.38;
const DOMAINS = 46.3;
const BACK = 59.52;
const ORDER = 66.3;
const OUTRO_AT = 75.4;
export const NORMEISO_FRAMES = s(78.8);
const RED = '#D9443A';
const GOLD = '#D9A23A';
const BLUE = '#3D7DD8';

/* ─────────── Outils de montage ─────────── */

/** Panoramique filé : le plan arrive en glissant de droite avec flou directionnel et repart vers la gauche. */
const Whip: React.FC<{from: number; to: number; children: React.ReactNode}> = ({from, to, children}) => {
  const t = useT();
  if (t < from - 0.05 || t > to + 0.05) return null;
  const i = prog(t, from, from + 0.4, easeOut);
  const o = prog(t, to - 0.3, to, easeIn);
  const x = (1 - i) * 1100 - o * 1100;
  const blur = (1 - i) * 18 + o * 18;
  return <AbsoluteFill style={{transform: `translateX(${x}px) skewX(${(1 - i) * -6 + o * 6}deg)`, filter: blur > 0.3 ? `blur(${blur}px)` : undefined}}>{children}</AbsoluteFill>;
};

/** Compteur à rouleaux : chaque chiffre défile jusqu'à sa valeur. */
const Odometer: React.FC<{value: string; at: number; size: number; color?: string}> = ({value, at, size, color = colors.navy}) => {
  const t = useT();
  const H = size * 1.1;
  const digits = value.padStart(5, ' ').split('');
  return (
    <div style={{display: 'flex', fontFamily: sansFont, fontWeight: 900, fontSize: size, color, lineHeight: `${H}px`}}>
      {digits.map((d, k) => {
        const p = prog(t, at + k * 0.06, at + 0.55 + k * 0.06, easeOut);
        const n = d === ' ' ? 10 : parseInt(d, 10);
        const turns = 10 + n;
        return (
          <div key={k} style={{height: H, overflow: 'hidden', width: d === ' ' ? 0 : size * 0.64}}>
            <div style={{transform: `translateY(${-p * turns * H}px)`, filter: p < 0.98 ? `blur(${(1 - p) * 4}px)` : undefined}}>
              {Array.from({length: turns + 1}, (_, j) => <div key={j} style={{height: H, textAlign: 'center'}}>{d === ' ' ? '' : (j % 10).toString()}</div>)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* ─────────── Réseau chaos ↔ ordre ─────────── */
const WORKERS = ['salarie', 'salariee', 'agent-hse', 'relais', 'superviseur', 'coordinatrice'];
const chaosPos = (k: number, t: number) => ({
  x: 540 + Math.cos(k * 1.05 + 0.4) * (250 + random(`r${k}`) * 120) + Math.sin(t * 2.2 + k * 1.7) * 26,
  y: 1020 + Math.sin(k * 1.05 + 0.4) * (230 + random(`q${k}`) * 90) + Math.cos(t * 1.9 + k) * 22,
});
const orderPos = (k: number) => ({x: 540 - 5 * 85 + k * 170, y: 1020});

/** Les 6 travailleurs : désordre (liens emmêlés, erreurs) ou ordre (chaîne de processus). */
const Network: React.FC<{order: number; at: number; labels?: number}> = ({order, at, labels = 0}) => {
  const t = useT();
  const pos = WORKERS.map((_, k) => {
    const c = chaosPos(k, t);
    const o = orderPos(k);
    const kk = Math.min(1, Math.max(0, order * 1.4 - k * 0.08));
    return {x: c.x + (o.x - c.x) * kk, y: c.y + (o.y - c.y) * kk};
  });
  const tangle: [number, number][] = [[0, 3], [1, 4], [2, 5], [0, 2], [3, 5], [1, 5], [4, 0]];
  const errs: [string, number, number][] = [['Erreur', 1, 12.3], ['Risque', 3, 12.7], ['Erreur', 4, 13.1], ['Risque', 0, 63.2]];
  return (
    <AbsoluteFill>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {tangle.map(([a, b], k) => {
          const p = prog(t, at + 0.3 + k * 0.1, at + 0.7 + k * 0.1) * (1 - order);
          return p > 0 ? <line key={k} x1={pos[a].x} y1={pos[a].y} x2={pos[a].x + (pos[b].x - pos[a].x) * p} y2={pos[a].y + (pos[b].y - pos[a].y) * p} stroke="#9AA5B3" strokeWidth={4} strokeDasharray="10 8" /> : null;
        })}
        {order > 0.6 && pos.slice(0, -1).map((p, k) => {
          const q = prog(t, ORDER + 1.4 + k * 0.12, ORDER + 1.8 + k * 0.12);
          return <line key={k} x1={p.x + 60} y1={p.y} x2={p.x + 60 + (pos[k + 1].x - p.x - 120) * q} y2={p.y} stroke={colors.green} strokeWidth={8} strokeLinecap="round" markerEnd={q > 0.95 ? 'url(#isoArrow)' : undefined} />;
        })}
        <defs><marker id="isoArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill={colors.green} /></marker></defs>
      </svg>
      {pos.map((p, k) => {
        const e = prog(t, at + k * 0.1, at + 0.4 + k * 0.1, easeOut);
        return (
          <div key={k} style={{position: 'absolute', left: p.x - 60, top: p.y - 60, width: 120, height: 120, borderRadius: 60, background: '#fff', boxShadow: '0 10px 22px rgba(14,30,60,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${e})`, border: `5px solid ${order > 0.5 ? colors.green : '#D5D9DE'}`}}>
            <F n={WORKERS[k]} size={86} />
            {order < 0.5 && <div style={{position: 'absolute', right: -6, top: -10, fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: GOLD, opacity: 1 - order * 2}}>?</div>}
          </div>
        );
      })}
      {labels > 0 && errs.map(([l, k, a], j) => {
        const p = prog(t, a, a + 0.3, easeOut) * (1 - order);
        return p > 0 ? <div key={j} style={{position: 'absolute', left: pos[k].x + 30, top: pos[k].y - 100, transform: `scale(${p}) rotate(-6deg)`, background: RED, color: '#fff', borderRadius: 14, padding: '6px 16px', fontFamily: sansFont, fontWeight: 900, fontSize: 28, opacity: 0.6 + 0.4 * Math.abs(Math.sin(t * 6 + j))}}>{l}</div> : null;
      })}
    </AbsoluteFill>
  );
};

/* ─────────── Document de la norme (dépliage 3D) ─────────── */
const NormDoc: React.FC<{open: number; w?: number}> = ({open, w = 420}) => (
  <div style={{width: w, height: w * 1.3, position: 'relative', perspective: 1600}}>
    <div style={{position: 'absolute', inset: 0, borderRadius: 18, background: '#fff', boxShadow: shadow, padding: w * 0.08, boxSizing: 'border-box'}}>
      <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: w * 0.1, color: colors.navy}}>NORME ISO</div>
      <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: w * 0.05, color: '#8A94A1', marginBottom: w * 0.05}}>Document de référence</div>
      {Array.from({length: 9}, (_, k) => <div key={k} style={{height: w * 0.025, borderRadius: 4, background: '#E5E8EC', width: `${60 + ((k * 37) % 40)}%`, marginBottom: w * 0.035}} />)}
      <div style={{position: 'absolute', right: w * 0.08, bottom: w * 0.08}}><F n="medaille" size={w * 0.22} /></div>
    </div>
    {/* volet qui se déplie */}
    <div style={{position: 'absolute', inset: 0, borderRadius: 18, background: `linear-gradient(135deg, ${colors.navy}, #1d4a8f)`, transformOrigin: 'left center', transform: `rotateY(${-170 * open}deg)`, backfaceVisibility: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: open < 0.98 ? 1 : 0}}>
      <F n="globe" size={w * 0.4} />
    </div>
  </div>
);

/* ─────────── Plans ─────────── */
const Hook: React.FC = () => {
  const t = useT();
  const val = t < 1.56 ? '9001' : t < 2.6 ? '14001' : '45001';
  const at = t < 1.56 ? 0.6 : t < 2.6 ? 1.56 : 2.6;
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: 0, right: 0, top: 640, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 1 - prog(t, 3.8, 4.3)}}>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 90, color: colors.green, letterSpacing: 10, opacity: prog(t, 0, 0.3)}}>ISO</div>
        <div style={{background: '#fff', borderRadius: 34, boxShadow: shadow, padding: '20px 50px'}}><Odometer key={val} value={val} at={at} size={190} /></div>
        <div style={{marginTop: 30, display: 'flex', gap: 16}}>
          {[['9001', 0.66, 'medaille'], ['14001', 1.56, 'feuille'], ['45001', 2.6, 'casque']].map(([n, a, ic]) => (
            <div key={n as string} style={{display: 'flex', alignItems: 'center', gap: 8, background: '#fff', borderRadius: 30, padding: '10px 20px', boxShadow: '0 8px 18px rgba(14,30,60,0.12)', fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: colors.navy, opacity: prog(t, a as number, (a as number) + 0.3), transform: `scale(${0.6 + 0.4 * prog(t, a as number, (a as number) + 0.35, easeOut)})`}}><F n={ic as string} size={40} />{n}</div>
          ))}
        </div>
      </div>
      <Kinetic text="Mais au *fond*…" at={3.8} until={4.7} y={900} size={96} />
      <Kinetic text="Qu'est-ce qu'une *norme ISO* ?" at={4.76} y={900} size={90} />
    </AbsoluteFill>
  );
};

const Chaos: React.FC = () => (
  <AbsoluteFill>
    <Kinetic text="Sans méthode, tout le monde *improvise*" at={CHAOS + 0.1} y={400} size={72} accent={RED} />
    <div style={{position: 'absolute', left: 540 - 110, top: 560, transform: 'scale(1)'}}><F n="usine2" size={220} /></div>
    <Network order={0} at={9.0} labels={1} />
  </AbsoluteFill>
);

const Experts: React.FC = () => {
  const t = useT();
  const conv = prog(t, 16.8, 17.9, easeInOut);
  const open = prog(t, 18.2, 19.4, easeInOut);
  const ex = ['directeur', 'coordinatrice', 'superviseur', 'assistante', 'agent-hse'];
  return (
    <AbsoluteFill>
      <Kinetic text="Des experts *internationaux*" at={EXPERTS + 0.9} until={19.8} y={400} size={78} />
      <Kinetic text="= une *norme ISO*" at={19.9} y={400} size={100} />
      <div style={{position: 'absolute', left: 540 - 210, top: 760, transform: `scale(${0.4 + 0.6 * prog(t, 17.6, 18.4, easeOut)})`, opacity: prog(t, 17.6, 18.0)}}><NormDoc open={open} /></div>
      {ex.map((ic, k) => {
        const a = (k / ex.length) * Math.PI * 2 + t * 0.6;
        const R = 360 * (1 - conv * 0.45);
        const p = prog(t, 15.2 + k * 0.12, 15.6 + k * 0.12, easeOut);
        return (
          <div key={ic} style={{position: 'absolute', left: 540 + Math.cos(a) * R - 70, top: 1030 + Math.sin(a) * R * 0.75 - 70, width: 140, height: 140, borderRadius: 70, background: '#fff', boxShadow: '0 10px 22px rgba(14,30,60,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${p * (1 - 0.3 * conv)})`, opacity: 1 - prog(t, 19.0, 19.6)}}>
            <F n={ic} size={100} />
          </div>
        );
      })}
      <div style={{position: 'absolute', left: 540 - 60, top: 970, opacity: (1 - conv) * prog(t, EXPERTS + 1.0, EXPERTS + 1.4)}}><F n="globe" size={120} /></div>
    </AbsoluteFill>
  );
};

const Drawer: React.FC = () => {
  const t = useT();
  const slide = prog(t, 26.5, 27.3, easeInOut);
  const close = prog(t, 27.3, 27.9, easeIn);
  const dust = prog(t, 27.9, 28.5);
  return (
    <AbsoluteFill>
      <Kinetic text="Un document ne fait *aucun miracle*" at={DRAWER + 0.2} y={400} size={72} accent={RED} />
      {/* meuble */}
      <div style={{position: 'absolute', left: 190, top: 1080, width: 700, height: 420, borderRadius: 20, background: '#8C6A4B', boxShadow: shadow}} />
      {/* tiroir */}
      <div style={{position: 'absolute', left: 230, top: 1120 + 0, width: 620, height: 170, borderRadius: 14, background: '#A8825E', transform: `translateY(${(1 - close) * 120}px) scaleY(${1 + (1 - close) * 0.15})`, boxShadow: 'inset 0 -10px 0 rgba(0,0,0,0.12)', zIndex: 2}}>
        <div style={{position: 'absolute', left: 260, top: 70, width: 100, height: 24, borderRadius: 12, background: '#5C4330'}} />
      </div>
      <div style={{position: 'absolute', left: 540 - 150, top: 640 + slide * 560, transform: `scale(${0.72 - 0.25 * slide}) rotateX(${slide * 50}deg)`, opacity: 1 - prog(t, 27.4, 27.6), zIndex: 1}}><NormDoc open={1} w={420} /></div>
      {dust > 0 && dust < 1 && Array.from({length: 10}, (_, k) => <div key={k} style={{position: 'absolute', left: 260 + k * 60, top: 1110 - dust * (40 + (k % 3) * 30), width: 14, height: 14, borderRadius: 7, background: '#C8B8A6', opacity: 1 - dust}} />)}
      <div style={{position: 'absolute', left: 0, right: 0, top: 1560, textAlign: 'center', fontFamily: handFont, fontSize: 56, color: '#8A94A1', opacity: prog(t, 27.2, 27.6)}}>… oublié dans un tiroir</div>
    </AbsoluteFill>
  );
};

const Field: React.FC = () => {
  const t = useT();
  const fly = prog(t, FIELD + 0.2, 30.2, easeInOut);
  const scan = prog(t, 33.6, 35.4, easeInOut);
  const loop = prog(t, 35.6, 37.4, easeInOut);
  return (
    <AbsoluteFill>
      <Kinetic text="Le levier : le *terrain*" at={FIELD + 0.1} until={33.3} y={400} size={86} />
      <Kinetic text="Auditer, *améliorer*" at={33.4} y={400} size={92} />
      <div style={{position: 'absolute', left: 540 - 105 - fly * 230, top: 1300 - fly * 640, transform: `scale(${0.5})`, transformOrigin: 'top left'}}><NormDoc open={1} w={420} /></div>
      <div style={{position: 'absolute', left: 540 - 170, top: 830, transform: `scale(${prog(t, 29.6, 30.2, easeOut)})`}}><F n="usine2" size={340} /></div>
      {/* exigences qui descendent vers le terrain */}
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {[0, 1, 2].map((k) => {
          const p = prog(t, 30.8 + k * 0.3, 31.6 + k * 0.3, easeInOut);
          return <path key={k} d={`M${300} ${820 + k * 60} C 380 ${820 + k * 60}, 400 ${930 + k * 40}, 450 ${960 + k * 40}`} stroke={GOLD} strokeWidth={7} fill="none" strokeDasharray="14 10" pathLength={1} opacity={p} />;
        })}
        {loop > 0 && <path d="M540 1000 m-340 0 a340 250 0 1 0 680 0 a340 250 0 1 0 -680 0" fill="none" stroke={colors.green} strokeWidth={10} pathLength={1} strokeDasharray={`${loop} 1`} strokeLinecap="round" />}
      </svg>
      <div style={{position: 'absolute', left: 180, top: 760, display: 'flex', gap: 8, opacity: prog(t, 31.6, 32.0)}}><div style={{background: GOLD, color: '#fff', borderRadius: 14, padding: '6px 16px', fontFamily: sansFont, fontWeight: 900, fontSize: 26}}>EXIGENCES</div></div>
      {scan > 0 && scan < 1 && <div style={{position: 'absolute', left: 470 + Math.sin(scan * Math.PI * 2) * 110, top: 950 + Math.cos(scan * Math.PI * 3) * 70}}><F n="loupe" size={130} /></div>}
      {[[470, 980], [620, 1030], [550, 1120]].map(([x, y], k) => {
        const p = prog(t, 34.2 + k * 0.3, 34.5 + k * 0.3, easeOut) * (1 - loop);
        return <div key={k} style={{position: 'absolute', left: x - 20, top: y - 20, width: 40, height: 40, borderRadius: 20, background: RED, opacity: p, transform: `scale(${p * (1 + 0.2 * Math.sin(t * 8 + k))})`, boxShadow: '0 0 20px rgba(217,68,58,0.6)'}} />;
      })}
      <div style={{position: 'absolute', left: 0, right: 0, top: 1300, display: 'flex', justifyContent: 'center', opacity: prog(t, 37.0, 37.4)}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12, background: colors.green, color: '#fff', borderRadius: 40, padding: '14px 30px', fontFamily: sansFont, fontWeight: 900, fontSize: 36}}><F n="repeter" size={50} />Amélioration continue</div>
      </div>
    </AbsoluteFill>
  );
};

const Certif: React.FC = () => {
  const t = useT();
  const rows: [string, string, boolean, number][] = [['Crée le cadre', 'Normes publiées', true, 41.76], ['Certifie les entreprises', 'Jamais directement', false, 43.78]];
  return (
    <AbsoluteFill>
      <Kinetic text="L'*ISO* crée le cadre" at={CERTIF + 0.6} y={400} size={86} />
      <div style={{position: 'absolute', left: 540 - 120, top: 520, width: 240, height: 240, borderRadius: 120, background: '#fff', boxShadow: shadow, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `scale(${prog(t, 39.2, 39.8, easeOut)})`}}>
        <F n="globe" size={120} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: colors.navy}}>ISO</div>
      </div>
      {rows.map(([l, sub, ok, at], k) => {
        const p = prog(t, at - 0.2, at + 0.3, easeOut);
        return (
          <div key={l} style={{position: 'absolute', left: 90, width: 900, top: 840 + k * 220, height: 190, borderRadius: 34, background: '#fff', boxShadow: shadow, display: 'flex', alignItems: 'center', gap: 24, padding: '0 34px', opacity: p, transform: `perspective(1400px) rotateX(${(1 - p) * 30}deg)`, borderLeft: `14px solid ${ok ? colors.green : RED}`}}>
            <div style={{flex: 1}}>
              <div style={{position: 'relative', display: 'inline-block', fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: colors.navy}}>{l}
                {!ok && <div style={{position: 'absolute', left: -8, right: -8, top: '52%', height: 9, borderRadius: 5, background: RED, transform: `scaleX(${prog(t, 44.2, 44.7)})`, transformOrigin: 'left'}} />}
              </div>
              <div style={{fontFamily: sansFont, fontWeight: 600, fontSize: 30, color: '#6B7684'}}>{sub}</div>
            </div>
            {ok ? <Check p={prog(t, at + 0.3, at + 0.7)} size={76} /> : <div style={{width: 76, height: 76, borderRadius: 38, background: RED, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${prog(t, 44.5, 44.8, easeOut)})`}}>✕</div>}
          </div>
        );
      })}
      <div style={{position: 'absolute', left: 0, right: 0, top: 1320, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, opacity: prog(t, 45.2, 45.6)}}>
        <F n="auditeur" size={90} />
        <div style={{fontFamily: handFont, fontSize: 46, color: colors.navy}}>la certification relève d'un organisme tiers</div>
      </div>
    </AbsoluteFill>
  );
};

const Domains: React.FC = () => {
  const t = useT();
  const cards: [string, string, string, string, number][] = [
    ['ISO 9001', 'Qualité du produit', 'medaille', BLUE, 49.1],
    ['ISO 14001', "Limite l'impact écologique", 'feuille', colors.green, 52.48],
    ['ISO 45001', 'Sécurise les équipes', 'casque', '#E8892B', 55.28],
  ];
  const fan = prog(t, 47.0, 48.6, easeInOut);
  return (
    <AbsoluteFill>
      <Kinetic text="Des bonnes pratiques *par domaine*" at={DOMAINS + 0.1} y={400} size={74} />
      {cards.map(([n, sub, ic, c, at], k) => {
        const active = t >= at && (k === 2 || t < cards[k + 1][4]);
        const rot = (k - 1) * 14 * fan;
        const x = 540 + (k - 1) * 250 * fan;
        const lift = active ? -60 : 0;
        return (
          <div key={n} style={{position: 'absolute', left: x - 200, top: 640 + lift + Math.abs(k - 1) * 40 * fan, width: 400, height: 560, borderRadius: 34, background: '#fff', boxShadow: active ? '0 40px 70px rgba(14,30,60,0.28)' : shadow, transform: `rotate(${rot}deg) scale(${active ? 1.08 : 0.94})`, transformOrigin: '50% 120%', zIndex: active ? 5 : k, overflow: 'hidden', opacity: prog(t, DOMAINS + 0.3 + k * 0.1, DOMAINS + 0.7 + k * 0.1)}}>
            <div style={{height: 260, background: `linear-gradient(160deg, ${c}22, ${c}66)`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={ic} size={170} float={4} /></div>
            <div style={{padding: '24px 26px'}}>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 48, color: c}}>{n}</div>
              <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 30, color: colors.navy, marginTop: 6}}>{sub}</div>
              <div style={{marginTop: 18}}><Check p={prog(t, at + 0.4, at + 0.8)} size={56} color={c} /></div>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

const Back: React.FC = () => (
  <AbsoluteFill style={{filter: 'grayscale(0.6)'}}>
    <Kinetic text="Notre usine *du début*…" at={BACK + 0.1} y={400} size={82} accent={RED} />
    <div style={{position: 'absolute', left: 540 - 110, top: 560}}><F n="usine2" size={220} /></div>
    <Network order={0} at={BACK + 0.2} labels={1} />
    <Kinetic text="méthodes fragmentées · risques inutiles" at={62.2} y={1460} size={44} color="#8A94A1" accent={RED} />
  </AbsoluteFill>
);

const Order: React.FC = () => {
  const t = useT();
  const order = prog(t, ORDER + 0.8, ORDER + 2.4, easeInOut);
  const frame = prog(t, ORDER + 0.2, ORDER + 1.0, easeOut);
  const curve = prog(t, 71.9, 74.4, easeInOut);
  return (
    <AbsoluteFill>
      <Kinetic text="Du chaos au *progrès*" at={ORDER + 0.1} y={400} size={92} />
      <div style={{position: 'absolute', left: 30, right: 30, top: 900, height: 240, borderRadius: 40, border: `6px solid ${colors.navy}`, opacity: frame, transform: `scale(${0.9 + 0.1 * frame})`}}>
        <div style={{position: 'absolute', left: '50%', top: -30, transform: 'translateX(-50%)', background: colors.navy, color: '#fff', borderRadius: 14, padding: '6px 22px', fontFamily: sansFont, fontWeight: 900, fontSize: 30, whiteSpace: 'nowrap'}}>CADRE ISO</div>
      </div>
      <Network order={order} at={ORDER - 1} />
      <div style={{position: 'absolute', left: 120, top: 1220, width: 840, height: 300, opacity: prog(t, 71.6, 72.0)}}>
        <svg width={840} height={300}>
          <path d="M10 10 V290 H830" stroke={colors.navy} strokeWidth={5} fill="none" />
          <path d={`M10 290 C 300 285, 520 240, 830 30 L830 290 Z`} fill={`rgba(46,155,62,${0.2 * curve})`} />
          <path d="M10 290 C 300 285, 520 240, 830 30" stroke={colors.green} strokeWidth={8} fill="none" pathLength={1} strokeDasharray={`${curve} 1`} strokeLinecap="round" />
        </svg>
        <div style={{position: 'absolute', right: 0, top: -40, display: 'flex', gap: 10}}>
          {[['Structuré', 72.34], ['Durable', 73.36], ['Mesurable', 74.3]].map(([l, a]) => (
            <div key={l as string} style={{background: '#fff', borderRadius: 20, padding: '6px 16px', boxShadow: '0 6px 14px rgba(14,30,60,0.12)', fontFamily: sansFont, fontWeight: 800, fontSize: 26, color: colors.green, opacity: prog(t, a as number, (a as number) + 0.3), transform: `scale(${0.6 + 0.4 * prog(t, a as number, (a as number) + 0.3, easeOut)})`}}>✓ {l}</div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** Bruitages seuls (ni musique ni ambiance). */
const CUES: Sfx[] = [
  {at: 0.05, s: 'bass-hit', v: 0.5},
  ...[0.6, 1.56, 2.6].flatMap((at) => [{at, s: 'sfx/swish', v: 0.4}, ...Array.from({length: 5}, (_, k) => ({at: at + 0.1 + k * 0.09, s: 'sfx/click', v: 0.25})), {at: at + 0.6, s: 'tick', v: 0.5}]),
  {at: 3.8, s: 'soft-whoosh', v: 0.45},
  {at: 4.76, s: 'deep-hit', v: 0.45},
  ...[CHAOS, EXPERTS, DRAWER, FIELD, CERTIF, DOMAINS, BACK, ORDER].map((at) => ({at: at - 0.2, s: 'sfx/whoosh', v: 0.45})),
  ...[0, 1, 2, 3, 4, 5].map((k) => ({at: 9.0 + k * 0.1, s: 'sfx/pop', v: 0.35})),
  {at: 10.5, s: 'tension', v: 0.28, dur: 2.5},
  ...[12.3, 12.7, 13.1].map((at) => ({at, s: 'alarme', v: 0.14, dur: 0.35})),
  ...[0, 1, 2, 3, 4].map((k) => ({at: 15.2 + k * 0.12, s: 'sfx/pop', v: 0.38})),
  {at: 16.8, s: 'riser', v: 0.3, dur: 1.2},
  {at: 18.2, s: 'page', v: 0.55},
  {at: 19.9, s: 'tampon', v: 0.6},
  {at: 26.5, s: 'sfx/swish', v: 0.4},
  {at: 27.85, s: 'sfx/thud', v: 0.6},
  {at: 27.87, s: 'deep-hit', v: 0.4},
  {at: FIELD + 0.2, s: 'sfx/whoosh', v: 0.42},
  {at: 30.8, s: 'stylo', v: 0.4, dur: 1.0},
  ...[34.2, 34.5, 34.8].map((at) => ({at, s: 'notification', v: 0.3})),
  {at: 35.6, s: 'riser', v: 0.28, dur: 1.6},
  {at: 37.0, s: 'validation', v: 0.45},
  {at: 39.2, s: 'sfx/pop', v: 0.45},
  {at: 42.0, s: 'validation', v: 0.42},
  {at: 44.2, s: 'sfx/swish', v: 0.5},
  {at: 44.5, s: 'deep-hit', v: 0.45},
  {at: 47.0, s: 'soft-whoosh', v: 0.4},
  ...[49.1, 52.48, 55.28].flatMap((at) => [{at, s: 'page', v: 0.45}, {at: at + 0.5, s: 'tick', v: 0.5}]),
  {at: 62.2, s: 'tension', v: 0.26, dur: 2.2},
  {at: ORDER + 0.8, s: 'riser', v: 0.32, dur: 1.6},
  ...[0, 1, 2, 3, 4].map((k) => ({at: ORDER + 1.4 + k * 0.12, s: 'sfx/click', v: 0.35})),
  {at: ORDER + 2.4, s: 'deep-hit', v: 0.45},
  {at: 71.9, s: 'stylo', v: 0.35, dur: 2.0},
  ...[72.34, 73.36, 74.3].map((at) => ({at, s: 'validation', v: 0.4})),
  {at: OUTRO_AT - 0.4, s: 'soft-whoosh', v: 0.5},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const NormeIso: React.FC = () => (
  <AbsoluteFill>
    <Backdrop />
    <Gate from={0} to={CHAOS}><Hook /></Gate>
    <Whip from={CHAOS} to={EXPERTS}><Chaos /></Whip>
    <Whip from={EXPERTS} to={DRAWER}><Experts /></Whip>
    <Whip from={DRAWER} to={FIELD}><Drawer /></Whip>
    <Whip from={FIELD} to={CERTIF}><Field /></Whip>
    <Whip from={CERTIF} to={DOMAINS}><Certif /></Whip>
    <Whip from={DOMAINS} to={BACK}><Domains /></Whip>
    <Whip from={BACK} to={ORDER}><Back /></Whip>
    <Gate from={ORDER} to={OUTRO_AT}><Order /></Gate>
    <Gate from={OUTRO_AT} to={999}><Outro at={OUTRO_AT} logo={LOGO} /></Gate>
    <Gate from={0} to={OUTRO_AT}><Captions captions={captions} /></Gate>
    <Audio src={staticFile('voix-off-norme-iso.m4a')} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);
