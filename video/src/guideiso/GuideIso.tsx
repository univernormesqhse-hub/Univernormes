import React from 'react';
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
 * « Guide ISO 9001, 14001, 45001 » — UI motion premium (skill video-promo-diagnostic-qhse), voix d'origine.
 * Fil rouge : la maison (9001 = fondation, 14001 = murs, 45001 = toit) suivie par une mini-carte de chantier.
 * Techniques nouvelles dans la série : soupe à l'alphabet, labyrinthe, indicateur d'étages d'ascenseur,
 * double hélice d'ADN, roue PDCA qui gravit une pente, coulage de béton, mur de briques qui tombent, cercle
 * d'étoiles, rouleau de peinture qui coule, toit et nuage de poussière, passage de relais, punaises sur plan,
 * aiguillage, message vocal, usine à gaz qui se démêle, calques alignés, cadran rotatif, façade en carton
 * emportée par le vent ; transitions « plan qui se déroule ».
 */
const LOGO = 'promo/logo.png';
const RED = '#D9443A';
const BLUE = '#2F6FB5';
const ECO = '#2E9B3E';
const SAFE = '#E8892B';
const BP = '#123A73';
const PLAN = 35.0;
const P1 = 52.8;
const P2 = 86.5;
const P3 = 126.8;
const P4 = 164.6;
const MASE = 200.0;
const TEMOIN = 222.3;
const P5 = 241.0;
const P6 = 293.9;
const FIN = 323.3;
const OUTRO_AT = 341.8;
export const GUIDEISO_FRAMES = s(OUTRO_AT + 3.8);

const At: React.FC<{x: number; y: number; children: React.ReactNode; style?: React.CSSProperties}> = ({x, y, children, style}) => (
  <div style={{position: 'absolute', left: x, top: y, transform: 'translate(-50%, -50%)', ...style}}>{children}</div>
);
const Label: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 34, color = colors.navy, style}) => (
  <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: size, color, textTransform: 'uppercase', letterSpacing: -0.5, textAlign: 'center', lineHeight: 1.05, ...style}}>{children}</div>
);
const pop = (t: number, at: number, d = 0.35) => prog(t, at, at + d, easeOut);
const Card: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <div style={{borderRadius: 30, background: '#fff', boxShadow: shadow, ...style}}>{children}</div>
);
const Big: React.FC<{children: React.ReactNode; color?: string; size?: number}> = ({children, color = colors.navy, size = 200}) => (
  <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: size, color, lineHeight: 1, letterSpacing: -4, whiteSpace: 'nowrap'}}>{children}</div>
);

/* ─────────── Transition : plan qui se déroule ─────────── */
const Unroll: React.FC<{at: number}> = ({at}) => {
  const t = useT();
  if (t < at - 0.5 || t > at + 0.5) return null;
  const down = prog(t, at - 0.5, at, easeIn);
  const up = prog(t, at, at + 0.5, easeOut);
  const h = t < at ? down * 1920 : 1920 * (1 - up);
  const top = t < at ? 0 : up * 1920;
  return (
    <AbsoluteFill style={{zIndex: 70, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: 0, right: 0, top, height: h, background: BP, backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.08) 2px, transparent 2px)', backgroundSize: '60px 60px'}} />
      <div style={{position: 'absolute', left: -20, right: -20, top: t < at ? h - 40 : top - 40, height: 80, borderRadius: 40, background: 'linear-gradient(180deg, #0B2A57, #3C6FB0 45%, #0B2A57)', boxShadow: '0 10px 30px rgba(0,0,0,0.35)'}} />
    </AbsoluteFill>
  );
};

/* ─────────── Fil rouge : la maison ─────────── */
const House: React.FC<{found: number; walls: number; roof: number; scale?: number; tint?: boolean}> = ({found, walls, roof, scale = 1}) => (
  <svg width={520 * scale} height={460 * scale} viewBox="0 0 520 460">
    {/* fondation */}
    <rect x={40} y={380} width={440} height={60} rx={8} fill="#E3E6EB" stroke="#B9C0C8" strokeWidth={3} strokeDasharray={found > 0 ? undefined : '10 8'} />
    <rect x={40} y={440 - 60 * found} width={440} height={60 * found} rx={8} fill={BLUE} />
    {found > 0.98 && <text x={260} y={420} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={30} fill="#fff">ISO 9001</text>}
    {/* murs (briques) */}
    {Array.from({length: 6}, (_, r) => Array.from({length: 7}, (_, c) => {
      const k = r * 7 + c;
      const on = walls * 42 > k;
      return on ? <rect key={k} x={70 + c * 54 + (r % 2 ? 27 : 0) - (r % 2 && c === 6 ? 27 : 0)} y={330 - r * 40} width={(r % 2 && c === 6) ? 24 : 50} height={36} rx={4} fill={ECO} opacity={0.9} /> : null;
    }))}
    {walls > 0.98 && <text x={260} y={235} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={30} fill="#fff">ISO 14001</text>}
    {/* toit */}
    <g transform={`translate(0 ${(1 - roof) * -260})`} opacity={roof > 0 ? 1 : 0}>
      <path d="M20 140 L260 10 L500 140 Z" fill={SAFE} />
      <text x={260} y={115} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={30} fill="#fff">ISO 45001</text>
    </g>
  </svg>
);
/** Mini-carte de chantier en haut à droite (avancement de la maison). */
const MiniHouse: React.FC = () => {
  const t = useT();
  const found = prog(t, 108.6, 110.2, easeInOut);
  const walls = prog(t, 131.2, 133.2, (v) => v);
  const roof = prog(t, 168.8, 169.6, easeIn);
  const show = (t > P2 + 1 && t < MASE) || (t > P5 + 1 && t < P6);
  const o = show ? 1 : 0;
  return (
    <div style={{position: 'absolute', left: 30, top: 70, opacity: o, zIndex: 40}}>
      <div style={{background: 'rgba(255,255,255,0.85)', borderRadius: 20, padding: 10, boxShadow: '0 8px 20px rgba(14,30,60,0.15)'}}>
        <House found={found} walls={walls} roof={roof} scale={0.26} />
      </div>
    </div>
  );
};

/* ─────────── Accroche ─────────── */
const SOUP = ['ISO', 'QSE', 'CSRD', 'MASE', 'SMI', 'RSE', 'PDCA', 'HLS', '9001', '14001', '45001', 'OHSAS'];
const Hook: React.FC = () => {
  const t = useT();
  const bowl = pop(t, 19.0, 0.5) * (1 - prog(t, 23.2, 23.6));
  const maze = pop(t, 23.4, 0.5);
  const path = prog(t, 24.2, 26.6, easeInOut);
  const fork = pop(t, 26.8, 0.4);
  return (
    <AbsoluteFill>
      {/* décideur en sueur */}
      {t < 11.0 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 10.5, 11.0)}}>
          <At x={540} y={820} style={{transform: `translate(-50%, -50%) scale(${pop(t, 0.2, 0.5)})`}}>
            <div style={{position: 'relative'}}>
              <F n="directeur" size={420} />
              {[0, 1, 2].map((k) => {
                const q = ((t - 2.2 + k * 0.5) % 1.5) / 1.5;
                return t > 2.4 ? <div key={k} style={{position: 'absolute', left: 110 + k * 120, top: 60 + q * 160, width: 30, height: 42, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', background: '#7CC4F0', opacity: 1 - q}} /> : null;
              })}
            </div>
          </At>
          <Kinetic text="Bienvenue dans ce *décryptage*" at={0.1} until={2.1} y={1340} size={76} />
          <Kinetic text="Des *sueurs froides* pour les décideurs" at={2.3} until={8.0} y={1340} size={68} accent={BLUE} />
          <Kinetic text="Les normes de *management ISO*" at={8.1} y={1340} size={74} />
        </AbsoluteFill>
      )}
      {/* démystifier : brouillard qui se dissipe */}
      {t >= 11.0 && t < 19.1 && (
        <AbsoluteFill style={{opacity: pop(t, 11.0) * (1 - prog(t, 18.7, 19.1))}}>
          <At x={540} y={800}><div style={{filter: `blur(${(1 - prog(t, 12.4, 14.4, easeInOut)) * 22}px)`, display: 'flex', gap: 40}}>{['9001', '14001', '45001'].map((n, k) => <Card key={n} style={{padding: '40px 30px', borderTop: `16px solid ${[BLUE, ECO, SAFE][k]}`}}><Big size={70} color={[BLUE, ECO, SAFE][k]}>{n}</Big></Card>)}</div></At>
          <Kinetic text="*Démystifier*, y voir clair" at={11.2} until={14.4} y={1340} size={80} />
          <Kinetic text="Naviguer dans les *pressions réglementaires*" at={14.5} until={18.9} y={1340} size={66} />
        </AbsoluteFill>
      )}
      {/* soupe à l'alphabet */}
      {bowl > 0 && (
        <AbsoluteFill style={{opacity: bowl}}>
          <At x={540} y={830}>
            <div style={{position: 'relative', width: 820, height: 820}}>
              <div style={{position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(circle, #F6D59A 0%, #E8B865 62%, #fff 63%, #fff 70%, #E3E6EB 71%)', boxShadow: shadow}} />
              {SOUP.map((w, k) => {
                const r = 120 + (k % 4) * 60;
                const a = t * (0.9 + (k % 3) * 0.25) + k * 1.7;
                return <div key={w} style={{position: 'absolute', left: 410 + Math.cos(a) * r, top: 410 + Math.sin(a) * r * 0.9, transform: `translate(-50%, -50%) rotate(${a * 40}deg)`, fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: '#8A5A1F'}}>{w}</div>;
              })}
            </div>
          </At>
          <Kinetic text="Une *soupe à l'alphabet*" at={19.2} until={23.2} y={1380} size={82} accent={SAFE} />
        </AbsoluteFill>
      )}
      {/* labyrinthe : par où commencer ? */}
      {maze > 0 && (
        <AbsoluteFill style={{opacity: maze}}>
          <At x={540} y={800}>
            <svg width={800} height={800} viewBox="0 0 800 800">
              <rect x={20} y={20} width={760} height={760} rx={30} fill="#fff" stroke={colors.navy} strokeWidth={8} />
              {['M140 20 V300 H300', 'M300 140 H520 V300', 'M660 20 V420 H460', 'M20 460 H240 V600', 'M380 460 V680 H560', 'M560 540 H780', 'M140 680 H260', 'M680 560 V780'].map((d, k) => <path key={k} d={d} fill="none" stroke={colors.navy} strokeWidth={8} strokeLinecap="round" />)}
              <path d="M80 80 V380 H200 V520 H320 V400 H600 V480 H700 V720" fill="none" stroke={SAFE} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={`${path} 1`} />
              <circle cx={80} cy={80} r={22} fill={colors.green} />
              <circle cx={700} cy={720} r={30} fill={RED} />
            </svg>
          </At>
          {fork > 0 && (
            <div style={{position: 'absolute', left: 0, right: 0, top: 1280, display: 'flex', justifyContent: 'center', gap: 30, transform: `scale(${fork})`}}>
              <Card style={{padding: '18px 30px'}}><Label size={36}>Une seule ?</Label></Card>
              <Label size={50} color={SAFE}>ou</Label>
              <Card style={{padding: '18px 30px'}}><Label size={36}>Tout de front ?</Label></Card>
            </div>
          )}
          <Kinetic text="Par où *commencer* ?" at={23.5} until={30.6} y={330} size={88} />
          <Kinetic text="Une hésitation *légitime*" at={30.8} y={330} size={84} />
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Plan : indicateur d'étages ─────────── */
const FLOORS: [string, number, string][] = [['Aperçu des normes', 37.34, colors.navy], ['ISO 9001 · Qualité', 39.54, BLUE], ['ISO 14001 · Environnement', 41.86, ECO], ['ISO 45001 · Santé-sécurité', 44.68, SAFE], ['Système intégré', 48.08, '#6B4FA0'], ['Faire le bon choix', 50.36, RED]];
const Plan: React.FC = () => {
  const t = useT();
  const cur = FLOORS.reduce((a, f, i) => (t >= f[1] ? i : a), -1);
  return (
    <AbsoluteFill>
      <Kinetic text="Notre *plan d'attaque*" at={PLAN + 0.1} y={330} size={84} />
      <div style={{position: 'absolute', left: 90, top: 470, width: 900}}>
        {FLOORS.map(([l, at, c], i) => {
          const k = 5 - i;
          const f = FLOORS[k];
          const on = cur === k;
          return (
            <div key={k} style={{display: 'flex', alignItems: 'center', gap: 24, height: 150, marginBottom: 14, borderRadius: 24, background: on ? f[2] : '#fff', boxShadow: shadow, padding: '0 30px', opacity: pop(t, PLAN + 0.3 + i * 0.1), transform: `translateX(${(1 - pop(t, PLAN + 0.3 + i * 0.1, 0.5)) * -200}px) scale(${on ? 1.04 : 1})`}}>
              <div style={{width: 90, height: 90, borderRadius: 45, border: `6px solid ${on ? '#fff' : f[2]}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 48, color: on ? '#fff' : f[2]}}>{k + 1}</div>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: on ? '#fff' : colors.navy, textTransform: 'uppercase'}}>{f[0]}</div>
              <div style={{marginLeft: 'auto', fontSize: 50, color: on ? '#fff' : '#D5D9DE'}}>{cur >= k ? '▲' : '•'}</div>
            </div>
          );
        })}
      </div>
      {/* cabine d'ascenseur */}
      <div style={{position: 'absolute', left: 40, top: 470 + (5 - Math.max(0, cur)) * 164, width: 16, height: 150, borderRadius: 8, background: SAFE, transition: 'none', opacity: cur >= 0 ? 1 : 0}} />
    </AbsoluteFill>
  );
};

/* ─────────── 1 : ADN partagé ─────────── */
const Dna: React.FC = () => {
  const t = useT();
  const helix = pop(t, P1 + 0.4, 0.6) * (1 - prog(t, 62.0, 62.6));
  const table = pop(t, 62.2, 0.5) * (1 - prog(t, 74.4, 74.9));
  const same = prog(t, 70.6, 72.4, easeInOut);
  const wheel = pop(t, 74.7, 0.5) * (1 - prog(t, 78.6, 79.0));
  const roll = prog(t, 75.2, 78.4, easeInOut);
  const load = prog(t, 82.6, 84.8, easeOut);
  const CL = ['4 · Contexte', '5 · Leadership', '6 · Planification', '7 · Support', '8 · Opérations', '9 · Évaluation', '10 · Amélioration'];
  return (
    <AbsoluteFill>
      <Kinetic text="L'*ADN* partagé" at={P1 + 0.3} until={62.0} y={330} size={90} />
      {helix > 0 && (
        <At x={540} y={880} style={{opacity: helix}}>
          <svg width={600} height={900}>
            {Array.from({length: 26}, (_, k) => {
              const y = 30 + k * 33;
              const ph = k * 0.45 + t * 2.4;
              const x1 = 300 + Math.sin(ph) * 200, x2 = 300 - Math.sin(ph) * 200;
              const front = Math.cos(ph) > 0;
              const c = [BLUE, ECO, SAFE][k % 3];
              return (
                <g key={k}>
                  <line x1={x1} y1={y} x2={x2} y2={y} stroke={c} strokeWidth={6} opacity={0.6} />
                  <circle cx={x1} cy={y} r={front ? 16 : 10} fill={colors.navy} />
                  <circle cx={x2} cy={y} r={front ? 10 : 16} fill={colors.green} />
                </g>
              );
            })}
          </svg>
        </At>
      )}
      {table > 0 && (
        <AbsoluteFill style={{opacity: table}}>
          <Kinetic text="Qualité, *écologie*, sécurité" at={63.6} until={70.4} y={330} size={70} />
          <Kinetic text="La *même structure*" at={70.6} until={74.4} y={330} size={84} />
          {['9001', '14001', '45001'].map((n, k) => (
            <div key={n} style={{position: 'absolute', left: 60 + k * 330, top: 470, width: 300, opacity: pop(t, [67.86, 68.72, 69.44][k] - 0.3)}}>
              <div style={{height: 90, borderRadius: '20px 20px 0 0', background: [BLUE, ECO, SAFE][k], display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Label size={40} color="#fff">{n}</Label></div>
              {CL.map((c, j) => {
                const jitter = (random(`j${k}${j}`) - 0.5) * 80 * (1 - same);
                return <div key={c} style={{marginTop: 10, height: 90, borderRadius: 14, background: '#fff', boxShadow: '0 4px 10px rgba(14,30,60,0.1)', display: 'flex', alignItems: 'center', padding: '0 14px', transform: `translateX(${jitter}px) rotate(${jitter * 0.05}deg)`, borderLeft: `8px solid ${same > 0.95 ? colors.green : '#D5D9DE'}`, fontFamily: sansFont, fontWeight: 800, fontSize: 24, color: colors.ink}}>{c}</div>;
              })}
            </div>
          ))}
        </AbsoluteFill>
      )}
      {wheel > 0 && (
        <AbsoluteFill style={{opacity: wheel}}>
          <Kinetic text="Le cycle *PDCA*" at={74.8} until={78.6} y={330} size={90} />
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            <line x1={80} y1={1300} x2={1000} y2={900} stroke={colors.navy} strokeWidth={10} strokeLinecap="round" />
          </svg>
          {(() => {
            const x = 220 + roll * 620, y = 1240 - roll * 270 - 170;
            return (
              <At x={x} y={y}>
                <div style={{width: 340, height: 340, borderRadius: '50%', transform: `rotate(${roll * 540}deg)`, background: `conic-gradient(${BLUE} 0 25%, ${ECO} 0 50%, ${SAFE} 0 75%, ${RED} 0)`, boxShadow: shadow, position: 'relative'}}>
                  {['P', 'D', 'C', 'A'].map((l, k) => <div key={l} style={{position: 'absolute', left: 170 + Math.cos((k * 90 + 45 - 90) * Math.PI / 180) * 100 - 30, top: 170 + Math.sin((k * 90 + 45 - 90) * Math.PI / 180) * 100 - 40, width: 60, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 64, color: '#fff'}}>{l}</div>)}
                </div>
              </At>
            );
          })()}
          <div style={{position: 'absolute', left: 120 + roll * 620, top: 1180 - roll * 270, width: 70, height: 50, background: colors.navy, clipPath: 'polygon(0 100%, 100% 0, 100% 100%)', transform: 'rotate(-23deg)'}} />
        </AbsoluteFill>
      )}
      {t >= 78.6 && (
        <AbsoluteFill style={{opacity: pop(t, 78.8)}}>
          <Kinetic text="Une norme maîtrisée…" at={78.9} y={330} size={80} />
          <At x={540} y={780}><Card style={{padding: '24px 40px', borderLeft: `14px solid ${BLUE}`}}><Label size={48} color={BLUE}>ISO 9001 · ✓ maîtrisée</Label></Card></At>
          {[['14001', ECO], ['45001', SAFE]].map(([n, c], k) => (
            <div key={n} style={{position: 'absolute', left: 120, top: 960 + k * 200, width: 840}}>
              <Label size={36} style={{textAlign: 'left'}}>ISO {n}</Label>
              <div style={{marginTop: 10, height: 60, borderRadius: 30, background: '#E7E9EE', overflow: 'hidden', position: 'relative'}}>
                <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${60 * load}%`, background: `repeating-linear-gradient(45deg, ${c} 0 24px, ${c}CC 24px 48px)`, backgroundPosition: `${t * 60}px 0`}} />
                <div style={{position: 'absolute', right: 20, top: 8, fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: colors.navy}}>{Math.round(60 * load)} %</div>
              </div>
            </div>
          ))}
          <At x={540} y={1440}><Label size={30} color="#8A93A0">… 60 % du travail déjà fait pour les autres (d'après la vidéo d'origine)</Label></At>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── 2 : ISO 9001 — la fondation ─────────── */
const Foundation: React.FC = () => {
  const t = useT();
  const dots = prog(t, 92.6, 95.2, easeOut);
  const pour = prog(t, 106.6, 110.2, easeInOut);
  const block1 = 1 - prog(t, 105.3, 105.8);
  return (
    <AbsoluteFill>
      <Kinetic text="ISO *9001* · la qualité" at={P2 + 0.2} until={92.4} y={330} size={84} accent={BLUE} />
      <At x={540} y={800} style={{opacity: pop(t, P2 + 0.4) * (1 - prog(t, 92.2, 92.6))}}><F n="grue" size={360} /></At>
      {block1 > 0 && t > 92.4 && (
        <AbsoluteFill style={{opacity: block1}}>
          <div style={{position: 'absolute', left: 140, top: 480, width: 800, height: 600, display: 'grid', gridTemplateColumns: 'repeat(40, 1fr)', gap: 4}}>
            {Array.from({length: 1000}, (_, k) => <div key={k} style={{height: 11, borderRadius: 6, background: random(`d${k}`) < dots ? BLUE : '#E7E9EE'}} />)}
          </div>
          <At x={540} y={1200}><Big color={BLUE} size={150}>+ 1 MILLION</Big></At>
          <At x={540} y={1320}><Label size={34}>de certificats actifs dans le monde</Label></At>
          <At x={540} y={1400}><Label size={24} color="#8A93A0">Ordre de grandeur cité par la vidéo d'origine</Label></At>
          <Kinetic text="Le socle *universel*" at={96.9} until={105.2} y={330} size={84} />
        </AbsoluteFill>
      )}
      {t >= 105.3 && (
        <AbsoluteFill style={{opacity: pop(t, 105.4)}}>
          <Kinetic text="La *fondation* en béton armé" at={105.6} until={115.6} y={330} size={72} accent={BLUE} />
          <Kinetic text="La base *indispensable*" at={122.4} y={330} size={84} accent={BLUE} />
          {/* coffrage + béton qui coule */}
          <At x={540} y={700}>
            <svg width={940} height={420}>
              <rect x={20} y={120} width={900} height={260} fill="#F1F3F6" stroke={colors.navy} strokeWidth={6} strokeDasharray="16 10" />
              {Array.from({length: 9}, (_, k) => <line key={k} x1={80 + k * 100} y1={130} x2={80 + k * 100} y2={370} stroke="#8A93A0" strokeWidth={6} />)}
              <path d={`M20 ${380 - 260 * pour} ${Array.from({length: 19}, (_, k) => `L${20 + k * 50} ${380 - 260 * pour + Math.sin(t * 6 + k) * 8 * (1 - pour)}`).join(' ')} L920 380 L20 380 Z`} fill={BLUE} opacity={0.92} />
              <path d={`M820 0 L870 0 L860 ${120 + 50 * (1 - pour)} L830 ${120 + 50 * (1 - pour)} Z`} fill="#8A93A0" opacity={pour < 1 ? 1 : 0} />
              {pour < 1 && pour > 0 && <rect x={838} y={120} width={14} height={260 - 260 * pour} fill={BLUE} opacity={0.8} />}
              {pour >= 1 && <text x={470} y={270} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={60} fill="#fff">ISO 9001</text>}
            </svg>
          </At>
          {[['Satisfaction clients', 'pouce', 111.7], ['Régularité opérationnelle', 'engrenage', 113.5], ['Processus maîtrisés', 'clipboard', 116.5], ['Fournisseurs gérés', 'camion', 118.4], ['Coûts de non-qualité ↓', 'argent', 120.6]].map(([l, n, at], k) => (
            <div key={l as string} style={{position: 'absolute', left: k % 2 ? 560 : 80, top: 980 + Math.floor(k / 2) * 150, width: 440, display: 'flex', alignItems: 'center', gap: 16, opacity: pop(t, at as number), transform: `translateY(${(1 - pop(t, at as number, 0.4)) * 40}px)`}}>
              <div style={{width: 110, height: 110, borderRadius: 26, background: '#fff', boxShadow: shadow, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}><F n={n as string} size={80} /></div>
              <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 32, color: colors.ink}}>{l}</div>
            </div>
          ))}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── 3 : ISO 14001 — les murs ─────────── */
const Walls: React.FC = () => {
  const t = useT();
  const stats = pop(t, 133.6, 0.5) * (1 - prog(t, 146.2, 146.6));
  const stars = prog(t, 142.8, 144.6, easeOut);
  const paint = prog(t, 149.0, 151.6, easeInOut);
  const drip = prog(t, 153.6, 154.6, easeIn);
  const green = t >= 146.4 && t < 154.4;
  const meters = t >= 154.4;
  return (
    <AbsoluteFill>
      <Kinetic text="ISO *14001* · l'environnement" at={P3 + 0.2} until={133.4} y={330} size={74} accent={ECO} />
      {t < 133.6 && <At x={540} y={880} style={{opacity: pop(t, P3 + 0.4)}}><House found={1} walls={prog(t, 131.2, 133.2, (v) => v)} roof={0} scale={1.6} /></At>}
      {stats > 0 && (
        <AbsoluteFill style={{opacity: stats}}>
          <Kinetic text="Ça grimpe à une *vitesse folle*" at={133.7} until={139.4} y={330} size={70} accent={ECO} />
          <Kinetic text="La pression *réglementaire*" at={139.6} until={146.2} y={330} size={76} />
          <At x={540} y={640}><Big color={ECO} size={170}>+ 300 000</Big></At>
          <At x={540} y={760}><Label size={34}>certifications dans le monde</Label></At>
          <At x={540} y={820}><Label size={24} color="#8A93A0">Ordre de grandeur cité par la vidéo d'origine</Label></At>
          <svg width={1080} height={500} style={{position: 'absolute', left: 0, top: 880, opacity: 1 - stars}}>
            <path d="M80 420 C 400 400, 600 300, 760 160 S 960 30, 1000 20" fill="none" stroke={ECO} strokeWidth={12} strokeLinecap="round" pathLength={1} strokeDasharray={`${prog(t, 134.4, 136.6)} 1`} />
          </svg>
          {stars > 0 && (
            <At x={540} y={1150}>
              <div style={{position: 'relative', width: 460, height: 460}}>
                <div style={{position: 'absolute', inset: 0, borderRadius: '50%', background: '#1F4FA8', transform: `scale(${stars})`}} />
                {Array.from({length: 12}, (_, k) => {
                  const a = (k / 12) * Math.PI * 2;
                  const p = prog(t, 143.0 + k * 0.08, 143.4 + k * 0.08, easeOut);
                  return <div key={k} style={{position: 'absolute', left: 230 + Math.cos(a) * 160 * p - 22, top: 230 + Math.sin(a) * 160 * p - 24, fontSize: 44, color: '#F8D44A', opacity: p}}>★</div>;
                })}
                <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: prog(t, 144.2, 144.6)}}><Label size={60} color="#fff">CSRD</Label></div>
              </div>
            </At>
          )}
        </AbsoluteFill>
      )}
      {green && (
        <AbsoluteFill style={{opacity: pop(t, 146.5)}}>
          <Kinetic text="Pas un petit *label vert*" at={146.6} until={154.3} y={330} size={80} accent={ECO} />
          <At x={540} y={900}>
            <div style={{position: 'relative', width: 840, height: 640, borderRadius: 24, background: '#C9CDD3', overflow: 'hidden'}}>
              <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${paint * 100}%`, background: '#5CC66C'}} />
              {drip > 0 && Array.from({length: 9}, (_, k) => <div key={k} style={{position: 'absolute', left: 40 + k * 95, top: 0, width: 30, height: 640 * drip * (0.4 + random(`dr${k}`) * 0.6), borderRadius: '0 0 15px 15px', background: '#C9CDD3'}} />)}
              <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Label size={70} color="#fff" style={{textShadow: '0 4px 12px rgba(0,0,0,0.3)'}}>Greenwashing ?</Label></div>
              {paint < 1 && <div style={{position: 'absolute', left: `${paint * 100}%`, top: 260, width: 70, height: 160, marginLeft: -35, borderRadius: 18, background: '#3E8E4A', boxShadow: '0 10px 20px rgba(0,0,0,0.3)'}} />}
            </div>
          </At>
          {drip > 0.6 && <At x={540} y={1340} style={{transform: `translate(-50%, -50%) scale(${2 - pop(t, 153.9, 0.25)}) rotate(-6deg)`, opacity: pop(t, 153.9, 0.25)}}><div style={{border: `9px solid ${RED}`, color: RED, borderRadius: 18, padding: '6px 30px', fontFamily: sansFont, fontWeight: 900, fontSize: 70, background: 'rgba(255,255,255,0.92)'}}>PAS DU TOUT</div></At>}
        </AbsoluteFill>
      )}
      {meters && (
        <AbsoluteFill style={{opacity: pop(t, 154.5)}}>
          <Kinetic text="Un cadre *rigoureux*, sur le terrain" at={154.6} y={330} size={68} accent={ECO} />
          {[['Énergie', 'eclair', 160.1], ['Déchets', 'poubelle', 160.86], ['Émissions', 'vapeur', 161.62]].map(([l, n, at], k) => {
            const p = prog(t, (at as number) - 0.2, (at as number) + 1.2, easeInOut);
            return (
              <div key={l as string} style={{position: 'absolute', left: 60 + k * 330, top: 560, width: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: pop(t, 156.0 + k * 0.3)}}>
                <Card style={{width: 300, height: 600, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', padding: 20, boxSizing: 'border-box', position: 'relative', overflow: 'hidden'}}>
                  <div style={{position: 'absolute', left: 90, right: 90, bottom: 150, height: 360 * (1 - 0.55 * p), borderRadius: 16, background: `linear-gradient(180deg, ${RED}, ${ECO})`, backgroundSize: '100% 360px', backgroundPosition: 'bottom'}} />
                  <div style={{position: 'absolute', top: 30}}><F n={n as string} size={90} /></div>
                  <Label size={34}>{l}</Label>
                  <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 50, color: ECO}}>↓</div>
                </Card>
              </div>
            );
          })}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── 4 : ISO 45001 — le toit ─────────── */
const Roof: React.FC = () => {
  const t = useT();
  const roof = prog(t, 168.8, 169.6, easeIn);
  const dust = prog(t, 169.6, 170.8, easeOut);
  const relay = prog(t, 173.2, 175.6, easeInOut);
  const pins = [196.8, 197.3, 197.8, 198.3, 198.8];
  return (
    <AbsoluteFill>
      <Kinetic text="ISO *45001* · santé et sécurité" at={P4 + 0.2} until={172.3} y={330} size={70} accent={SAFE} />
      {t < 172.4 && (
        <At x={540} y={900} style={{opacity: 1 - prog(t, 172.0, 172.4)}}>
          <div style={{position: 'relative'}}>
            <House found={1} walls={1} roof={roof} scale={1.6} />
            {dust > 0 && dust < 1 && Array.from({length: 12}, (_, k) => {
              const a = (k / 12) * Math.PI;
              return <div key={k} style={{position: 'absolute', left: 416 + Math.cos(a + Math.PI) * 460 * dust, top: 230 - Math.sin(a) * 60 * dust, width: 80 * (1 - dust) + 20, height: 80 * (1 - dust) + 20, borderRadius: '50%', background: 'rgba(185,170,150,0.6)', opacity: 1 - dust}} />;
            })}
          </div>
        </At>
      )}
      {t >= 172.4 && t < 188.6 && (
        <AbsoluteFill style={{opacity: pop(t, 172.5) * (1 - prog(t, 188.3, 188.7))}}>
          {/* passage de relais OHSAS → 45001 */}
          <At x={330 + relay * 100} y={700} style={{opacity: 1 - prog(t, 175.0, 175.8), transform: `translate(-50%, -50%) rotate(${-relay * 20}deg)`}}><Card style={{padding: '30px 40px', borderTop: '14px solid #8A93A0'}}><Label size={50} color="#8A93A0">OHSAS 18001</Label></Card></At>
          <At x={760 - relay * 220} y={700} style={{opacity: relay > 0.3 ? 1 : 0}}><Card style={{padding: '30px 40px', borderTop: `14px solid ${SAFE}`}}><Label size={50} color={SAFE}>ISO 45001</Label></Card></At>
          <At x={540} y={860} style={{opacity: pop(t, 175.0)}}><Label size={44}>Depuis 2018</Label></At>
          <At x={540} y={1060} style={{opacity: pop(t, 176.6), transform: `translate(-50%, -50%) scale(${pop(t, 176.6, 0.4)})`}}><Big color={SAFE} size={150}>+ 200 000</Big></At>
          <At x={540} y={1170} style={{opacity: pop(t, 177.0)}}><Label size={32}>certifications · ordre de grandeur cité</Label></At>
          <Kinetic text="Remplace l'*OHSAS*" at={172.5} until={180.0} y={330} size={84} />
          <Kinetic text="Prévenir *accidents* et maladies pro" at={180.2} until={188.2} y={330} size={66} accent={RED} />
          <div style={{position: 'absolute', left: 0, right: 0, top: 1260, display: 'flex', justifyContent: 'center', gap: 40, opacity: pop(t, 181.4)}}>
            {['casque', 'gants', 'lunettes', 'chaussure'].map((n, k) => <div key={n} style={{transform: `scale(${pop(t, 181.6 + k * 0.25, 0.3)})`}}><F n={n} size={120} /></div>)}
          </div>
        </AbsoluteFill>
      )}
      {t >= 188.6 && (
        <AbsoluteFill style={{opacity: pop(t, 188.7)}}>
          <Kinetic text="Avec les *travailleurs* eux-mêmes" at={188.8} until={194.0} y={330} size={72} accent={SAFE} />
          <Kinetic text="Pas *dans un bureau* : sur le terrain" at={194.1} y={330} size={66} />
          {/* plan de l'atelier, les opérateurs y épinglent les dangers */}
          <At x={540} y={900}>
            <div style={{position: 'relative', width: 880, height: 640, borderRadius: 24, background: BP, backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.1) 2px, transparent 2px)', backgroundSize: '44px 44px', boxShadow: shadow}}>
              {[[40, 40, 340, 240], [420, 40, 420, 180], [40, 320, 260, 280], [340, 260, 500, 340]].map(([x, y, w, h], k) => <div key={k} style={{position: 'absolute', left: x, top: y, width: w, height: h, border: '4px solid rgba(255,255,255,0.7)', borderRadius: 8}} />)}
              {pins.map((at, k) => {
                const p = prog(t, at, at + 0.3, easeIn);
                const x = [180, 600, 140, 520, 760][k], y = [140, 110, 430, 400, 520][k];
                return p > 0 ? <div key={k} style={{position: 'absolute', left: x - 22, top: y - 60 - (1 - p) * 300, opacity: p}}><F n="punaise" size={70} /></div> : null;
              })}
            </div>
          </At>
          <div style={{position: 'absolute', left: 0, right: 0, top: 1280, display: 'flex', justifyContent: 'center', gap: 30}}>
            {['ouvrier', 'ouvrier-dark', 'agent-hse', 'intervenant'].map((n, k) => <div key={n} style={{transform: `translateY(${(1 - pop(t, 190.9 + k * 0.3, 0.4)) * 200}px)`, opacity: pop(t, 190.9 + k * 0.3)}}><F n={n} size={140} /></div>)}
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── MASE ou ISO 45001 : aiguillage ─────────── */
const Switch: React.FC = () => {
  const t = useT();
  const lever = t < 215.6 ? -1 : 1;
  const sw = t < 209.4 ? 0 : t < 215.6 ? prog(t, 209.4, 210.0, easeInOut) * -1 : -1 + 2 * prog(t, 215.8, 216.4, easeInOut);
  return (
    <AbsoluteFill>
      <Kinetic text="*MASE* ou ISO 45001 ?" at={MASE + 0.2} until={209.2} y={330} size={84} accent={SAFE} />
      <Kinetic text="C'est assez *simple*" at={209.3} y={330} size={84} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <path d="M540 1500 V1100" stroke={colors.navy} strokeWidth={26} fill="none" strokeLinecap="round" />
        <path d="M540 1100 C 540 900, 280 900, 260 680" stroke={sw < 0 ? SAFE : '#C9D3E2'} strokeWidth={26} fill="none" strokeLinecap="round" />
        <path d="M540 1100 C 540 900, 800 900, 820 680" stroke={sw > 0 ? BLUE : '#C9D3E2'} strokeWidth={26} fill="none" strokeLinecap="round" />
        <g transform={`translate(540 1100) rotate(${sw * 30})`}><rect x={-14} y={-160} width={28} height={160} rx={14} fill={RED} /><circle r={30} fill={colors.navy} /></g>
      </svg>
      <At x={260} y={560} style={{opacity: pop(t, 209.4), transform: `translate(-50%, -50%) scale(${sw < 0 ? 1.06 : 0.92})`}}>
        <Card style={{width: 440, padding: '26px 20px', borderTop: `14px solid ${SAFE}`, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Label size={56} color={SAFE}>MASE</Label>
          <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 28, color: colors.ink, textAlign: 'center', marginTop: 10}}>Exigence d'un client local<br />chimie · pétrole</div>
          <div style={{display: 'flex', gap: 14, marginTop: 10}}><F n="eprouvette" size={70} /><F n="usine" size={70} /></div>
        </Card>
      </At>
      <At x={820} y={560} style={{opacity: pop(t, 215.8), transform: `translate(-50%, -50%) scale(${sw > 0 ? 1.06 : 0.92})`}}>
        <Card style={{width: 440, padding: '26px 20px', borderTop: `14px solid ${BLUE}`, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Label size={56} color={BLUE}>ISO 45001</Label>
          <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 28, color: colors.ink, textAlign: 'center', marginTop: 10}}>Reconnaissance internationale<br />et intersectorielle</div>
          <div style={{display: 'flex', gap: 14, marginTop: 10}}><F n="globe" size={70} /><F n="avion" size={70} /></div>
        </Card>
      </At>
      <At x={540} y={1560} style={{opacity: pop(t, MASE + 0.6)}}><Label size={30} color="#8A93A0">Bassins industriels · selon votre contexte{lever > 0 ? '' : ''}</Label></At>
    </AbsoluteFill>
  );
};

/* ─────────── Témoignage : message vocal ─────────── */
const VoiceNote: React.FC<{at: number; end: number; who: string; icon: string; text: string; color: string}> = ({at, end, who, icon, text, color}) => {
  const t = useT();
  const p = prog(t, at, end, (v) => v);
  const n = Math.floor(p * text.length);
  return (
    <div style={{width: 900}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14}}><F n={icon} size={100} /><Label size={34} style={{textAlign: 'left'}}>{who}</Label></div>
      <div style={{background: color, borderRadius: '10px 40px 40px 40px', padding: '26px 30px', boxShadow: shadow}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
          <div style={{width: 70, height: 70, borderRadius: 35, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, color}}>{p < 1 ? '❚❚' : '▶'}</div>
          <svg width={700} height={80}>
            {Array.from({length: 46}, (_, k) => {
              const h = 12 + Math.abs(Math.sin(k * 1.7) * 30 + Math.sin(k * 0.6 + t * (p < 1 ? 9 : 0)) * 20);
              return <rect key={k} x={k * 15} y={40 - h / 2} width={8} height={h} rx={4} fill={k / 46 < p ? '#fff' : 'rgba(255,255,255,0.4)'} />;
            })}
          </svg>
        </div>
        <div style={{marginTop: 18, fontFamily: handFont, fontSize: 44, color: '#fff', lineHeight: 1.2, minHeight: 160}}>« {text.slice(0, n)}{p < 1 ? '▍' : ' »'}</div>
      </div>
      <div style={{marginTop: 10, fontFamily: sansFont, fontWeight: 700, fontSize: 22, color: '#8A93A0'}}>Témoignage cité par la vidéo d'origine</div>
    </div>
  );
};
const Testimony: React.FC = () => {
  const t = useT();
  const months = 14;
  return (
    <AbsoluteFill>
      <Kinetic text="Retour du *terrain*" at={TEMOIN + 0.2} until={228.0} y={330} size={84} accent={SAFE} />
      <Kinetic text="Une norme qui *protège des vies*" at={235.6} y={330} size={74} accent={colors.green} />
      <At x={540} y={760} style={{opacity: pop(t, 225.4)}}><VoiceNote at={228.06} end={235.14} who="Chef d'atelier · métallurgie" icon="ouvrier-dark" text="Après notre certification, on a revu tout notre système avec les opérateurs. Résultat : zéro accident avec arrêt depuis 14 mois." color={SAFE} /></At>
      <div style={{position: 'absolute', left: 70, top: 1180, width: 940, display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 14, opacity: pop(t, 232.8)}}>
        {Array.from({length: months}, (_, k) => {
          const on = prog(t, 233.2 + k * 0.12, 233.4 + k * 0.12) > 0;
          return <div key={k} style={{height: 110, borderRadius: 16, background: on ? colors.green : '#fff', boxShadow: '0 6px 12px rgba(14,30,60,0.12)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: on ? '#fff' : colors.navy, fontFamily: sansFont, fontWeight: 900, fontSize: 26}}><div>M{k + 1}</div><div style={{fontSize: 34}}>{on ? '0' : '·'}</div></div>;
        })}
      </div>
    </AbsoluteFill>
  );
};

/* ─────────── 5 : système intégré ─────────── */
const Integrated: React.FC = () => {
  const t = useT();
  const untangle = prog(t, 254.2, 256.4, easeInOut);
  const layers = prog(t, 266.6, 269.4, easeInOut);
  const steps = t >= 272.4;
  const q = t >= 254.0 && t < 266.4;
  return (
    <AbsoluteFill>
      <Kinetic text="Le *système intégré*" at={P5 + 0.2} until={248.7} y={330} size={84} accent="#6B4FA0" />
      <Kinetic text="Peur de l'*usine à gaz* ?" at={248.9} until={254.0} y={330} size={80} accent={RED} />
      {t < 254.0 + 2.6 && t < 257 && (
        <At x={540} y={880} style={{opacity: pop(t, 249.0) * (1 - prog(t, 256.4, 256.8))}}>
          <svg width={900} height={700}>
            {[BLUE, ECO, SAFE].map((c, k) => {
              const y = 200 + k * 150;
              const messy = `M40 ${y} C 200 ${y - 300}, 300 ${y + 400}, 450 ${350} S 650 ${y - 350}, 860 ${y}`;
              const clean = `M40 ${y} C 200 ${y}, 300 ${y}, 450 ${y} S 650 ${y}, 860 ${y}`;
              return <path key={k} d={untangle > 0.5 ? clean : messy} stroke={c} strokeWidth={40} fill="none" strokeLinecap="round" opacity={untangle > 0.45 && untangle < 0.55 ? 0.3 : 0.9} />;
            })}
            
          </svg>
        </At>
      )}
      {q && (
        <At x={540} y={880} style={{opacity: pop(t, 256.5)}}>
          <div style={{position: 'relative', width: 880, padding: '50px 50px 40px', background: '#FFF6C9', boxShadow: shadow, transform: 'rotate(-1.5deg)', boxSizing: 'border-box'}}>
            <div style={{position: 'absolute', left: 420, top: -40}}><F n="punaise" size={80} /></div>
            <div style={{fontFamily: handFont, fontSize: 50, color: colors.ink, lineHeight: 1.25}}>« On pensait que combiner les trois normes allait multiplier la charge. En réalité, une fois le socle ISO 9001 en place, l'ajout des deux autres a été <span style={{background: `linear-gradient(90deg, rgba(124,197,118,0.6) ${prog(t, 264.0, 265.4) * 100}%, transparent 0)`}}>beaucoup plus rapide</span> qu'on ne le craignait. »</div>
            <div style={{marginTop: 20, fontFamily: sansFont, fontWeight: 800, fontSize: 26, color: '#8A93A0'}}>— Responsable QSE · témoignage cité par la vidéo d'origine</div>
          </div>
        </At>
      )}
      {t >= 266.4 && !steps && (
        <AbsoluteFill style={{opacity: pop(t, 266.5)}}>
          <Kinetic text="L'*ADN commun* fait la différence" at={266.5} until={272.3} y={330} size={70} />
          {[['Qualité', BLUE], ['Environnement', ECO], ['Sécurité', SAFE]].map(([l, c], k) => (
            <At key={l} x={540 + (k - 1) * 260 * (1 - layers)} y={900 + (k - 1) * 40 * (1 - layers)} style={{transform: `translate(-50%, -50%) perspective(1600px) rotateX(${50 * (1 - layers) + 10}deg) rotateZ(${(k - 1) * 8 * (1 - layers)}deg)`}}>
              <div style={{width: 520, height: 520, borderRadius: 30, background: `${c}55`, border: `6px solid ${c}`, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 20 + k * 60, boxSizing: 'border-box'}}><Label size={40} color={c as string}>{l}</Label></div>
            </At>
          ))}
          {layers >= 1 && <At x={540} y={1300} style={{transform: `translate(-50%, -50%) scale(${pop(t, 269.5, 0.3)})`}}><Card style={{padding: '18px 40px'}}><Label size={46} color="#6B4FA0">Redoutablement efficace</Label></Card></At>}
        </AbsoluteFill>
      )}
      {steps && (
        <AbsoluteFill style={{opacity: pop(t, 272.5)}}>
          <Kinetic text="On ne fait *pas tout* d'un coup" at={272.6} until={277.3} y={330} size={74} />
          <Kinetic text="Étape par *étape*" at={277.4} y={330} size={84} />
          {[['1', 'Fondation : la qualité', BLUE, 277.46], ['2', 'Environnement ou sécurité, selon les urgences du marché', ECO, 281.14], ['3', 'Tout fusionner : le SMI', '#6B4FA0', 286.92]].map(([n, l, c, at], k) => {
            const p = pop(t, at as number, 0.5);
            return (
              <div key={n} style={{position: 'absolute', left: 80 + k * 140, top: 1260 - k * 260, width: 940 - k * 140, height: 220, borderRadius: 26, background: c as string, boxShadow: shadow, display: 'flex', alignItems: 'center', gap: 24, padding: '0 30px', boxSizing: 'border-box', opacity: p, transform: `translateY(${(1 - p) * 80}px)`}}>
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 110, color: 'rgba(255,255,255,0.5)'}}>{n}</div>
                <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 36, color: '#fff'}}>{l}</div>
              </div>
            );
          })}
          <div style={{position: 'absolute', left: 120 + Math.min(2, Math.max(0, (t - 277.46) / 4.5)) * 140, top: 1150 - Math.min(2, Math.max(0, (t - 277.46) / 4.5)) * 260, transform: 'translate(0,-100%)', opacity: pop(t, 277.8)}}><F n="pas" size={110} /></div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── 6 : le bon choix — cadran rotatif ─────────── */
const QS: [string, string, number][] = [['Que demandent les clients ?', 'equipe', 304.56], ['Quels risques opérationnels ?', 'danger', 306.02], ['Quelles obligations légales ?', 'balance', 308.5], ['Quel niveau de maturité ?', 'graphique', 311.06], ['Quelles ambitions RSE ?', 'globe', 313.24]];
const Choice: React.FC = () => {
  const t = useT();
  const cur = QS.reduce((a, q, i) => (t >= q[2] - 0.2 ? i : a), -1);
  const rot = QS.reduce((a, q, i) => a + prog(t, q[2] - 0.3, q[2] + 0.2, easeInOut) * (i ? 72 : 0), 0);
  const end = t >= 316.8;
  return (
    <AbsoluteFill>
      <Kinetic text="Faire le *bon choix*" at={P6 + 0.2} until={300.2} y={330} size={84} accent={RED} />
      <Kinetic text="*5 questions* à se poser" at={300.3} until={316.7} y={330} size={84} />
      {!end && (
        <>
          <At x={540} y={880} style={{opacity: pop(t, 300.5), transform: `translate(-50%, -50%) scale(${0.8 + 0.2 * pop(t, 300.5, 0.5)})`}}>
            <div style={{position: 'relative', width: 760, height: 760}}>
              <div style={{position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(circle, #fff 0 42%, #EEF1F5 43% 100%)', boxShadow: shadow, transform: `rotate(${-rot}deg)`}}>
                {QS.map(([, n], i) => {
                  const a = (i * 72 - 90) * (Math.PI / 180);
                  return <div key={n} style={{position: 'absolute', left: 380 + Math.cos(a) * 290 - 55, top: 380 + Math.sin(a) * 290 - 55, transform: `rotate(${rot}deg)`, opacity: cur === i ? 1 : 0.45}}><F n={n} size={110} /></div>;
                })}
                {Array.from({length: 60}, (_, k) => <div key={k} style={{position: 'absolute', left: 378, top: 0, width: 4, height: k % 12 ? 14 : 30, background: '#B9C0C8', transformOrigin: '2px 380px', transform: `rotate(${k * 6}deg)`}} />)}
              </div>
              <div style={{position: 'absolute', left: 365, top: -30, width: 0, height: 0, borderLeft: '16px solid transparent', borderRight: '16px solid transparent', borderTop: `40px solid ${RED}`}} />
              <div style={{position: 'absolute', left: 230, top: 230, width: 300, height: 300, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Big size={160} color={RED}>{cur >= 0 ? cur + 1 : '?'}</Big></div>
            </div>
          </At>
          {cur >= 0 && <At x={540} y={1400} style={{transform: `translate(-50%, -50%) scale(${pop(t, QS[cur][2] - 0.2, 0.3)})`}}><Card style={{padding: '22px 40px'}}><Label size={44}>{QS[cur][0]}</Label></Card></At>}
        </>
      )}
      {end && (
        <AbsoluteFill style={{opacity: pop(t, 316.9)}}>
          <Kinetic text="Le *bon sens terrain*" at={317.0} until={320.1} y={330} size={84} accent={colors.green} />
          <Kinetic text="Pas la collection de *diplômes*" at={320.2} y={330} size={74} accent={RED} />
          <At x={300} y={900}><div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}><F n="casque" size={260} /><Label size={36} color={colors.green}>Terrain ✓</Label></div></At>
          <At x={780} y={900} style={{transform: `translate(-50%, -50%) rotate(${prog(t, 320.6, 321.4, easeIn) * 75}deg)`, transformOrigin: '50% 100%', opacity: 1 - prog(t, 321.6, 322.4) * 0.7}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8}}>
              {['diplome', 'medaille', 'trophee'].map((n) => <F key={n} n={n} size={130} />)}
              <Label size={30} color={RED}>Diplômes</Label>
            </div>
          </At>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Fin : vraie maison vs façade en carton ─────────── */
const Finale: React.FC = () => {
  const t = useT();
  const gust = prog(t, 335.4, 337.0, easeIn);
  return (
    <AbsoluteFill>
      <Kinetic text="L'ultime *réflexion*" at={FIN + 0.2} until={329.0} y={330} size={84} />
      <Kinetic text="La *maturité* d'intégrer en profondeur…" at={329.0} until={332.4} y={330} size={64} accent={colors.green} />
      <Kinetic text="… ou une façade *en carton* ?" at={332.5} until={337.3} y={330} size={70} accent={RED} />
      <Kinetic text="Bâtir ce qui fera *la différence demain*" at={337.5} y={330} size={64} />
      <At x={290} y={980} style={{opacity: pop(t, 329.0)}}><div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}><House found={1} walls={1} roof={1} scale={0.85} /><Label size={30} color={colors.green}>Système intégré</Label></div></At>
      <At x={800} y={980} style={{opacity: pop(t, 332.6)}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <div style={{transformOrigin: '50% 100%', transform: `perspective(1200px) rotateX(${-gust * 95}deg) translateX(${gust * 200}px)`}}>
            <svg width={400} height={380} viewBox="0 0 400 380">
              <path d="M20 120 L200 20 L380 120 V370 H20 Z" fill="#C8A26B" stroke="#8B6B3E" strokeWidth={6} />
              <rect x={70} y={170} width={90} height={80} fill="#E5CFA3" />
              <rect x={240} y={170} width={90} height={80} fill="#E5CFA3" />
              <rect x={160} y={270} width={80} height={100} fill="#A9834F" />
              <text x={200} y={110} textAnchor="middle" fontFamily={handFont} fontSize={34} fill="#6B4F2A">carton</text>
            </svg>
          </div>
          <Label size={30} color={RED}>Façade</Label>
        </div>
      </At>
      {t > 334.6 && t < 337.6 && Array.from({length: 8}, (_, k) => {
        const q = ((t - 334.6) * 1.6 + k / 8) % 1;
        return <div key={k} style={{position: 'absolute', left: -200 + q * 1400, top: 760 + k * 50, width: 260, height: 6, borderRadius: 3, background: 'rgba(120,140,170,0.55)'}} />;
      })}
    </AbsoluteFill>
  );
};

/* ─────────── Son ─────────── */
const CHAPS = [PLAN, P1, P2, P3, P4, MASE, TEMOIN, P5, P6, FIN];
const CUES: Sfx[] = [
  {at: 0.05, s: 'bass-hit', v: 0.45},
  {at: 2.4, s: 'tension', v: 0.22, dur: 2.5},
  {at: 11.2, s: 'soft-whoosh', v: 0.45},
  {at: 12.6, s: 'riser', v: 0.25, dur: 1.6},
  {at: 19.1, s: 'sfx/pop', v: 0.4},
  {at: 23.4, s: 'sfx/swish', v: 0.45},
  {at: 24.2, s: 'stylo', v: 0.35, dur: 2.4},
  {at: 26.8, s: 'sfx/pop', v: 0.4},
  ...CHAPS.flatMap((at) => [{at: at - 0.5, s: 'page', v: 0.6}, {at: at - 0.45, s: 'soft-whoosh', v: 0.4}]),
  ...FLOORS.map(([, at]) => ({at, s: 'sfx/ding', v: 0.3})),
  {at: 63.6, s: 'sfx/pop', v: 0.35},
  {at: 70.6, s: 'validation', v: 0.4},
  {at: 75.2, s: 'tension', v: 0.22, dur: 3},
  {at: 82.6, s: 'riser', v: 0.25, dur: 2},
  {at: 84.8, s: 'sfx/ding', v: 0.35},
  {at: 92.6, s: 'riser', v: 0.28, dur: 2.4},
  {at: 95.2, s: 'deep-hit', v: 0.5},
  {at: 106.6, s: 'tension', v: 0.25, dur: 3.6},
  {at: 110.2, s: 'deep-hit', v: 0.5},
  ...[111.7, 113.5, 116.5, 118.4, 120.6].map((at) => ({at, s: 'sfx/pop', v: 0.38})),
  ...Array.from({length: 14}, (_, k) => ({at: 131.2 + k * 0.14, s: 'sfx/click', v: 0.3})),
  {at: 133.6, s: 'deep-hit', v: 0.45},
  {at: 134.4, s: 'riser', v: 0.25, dur: 2.2},
  ...Array.from({length: 12}, (_, k) => ({at: 143.0 + k * 0.08, s: 'sfx/click', v: 0.2})),
  {at: 144.4, s: 'sfx/ding', v: 0.35},
  {at: 149.0, s: 'stylo', v: 0.35, dur: 2.6},
  {at: 153.9, s: 'tampon', v: 0.65},
  ...[160.1, 160.86, 161.62].map((at) => ({at, s: 'tick', v: 0.45})),
  {at: 168.8, s: 'sfx/whoosh', v: 0.5},
  {at: 169.6, s: 'bass-hit', v: 0.55},
  {at: 173.2, s: 'sfx/swish', v: 0.45},
  {at: 176.6, s: 'deep-hit', v: 0.45},
  ...[181.6, 181.85, 182.1, 182.35].map((at) => ({at, s: 'sfx/pop', v: 0.35})),
  ...[190.9, 191.2, 191.5, 191.8].map((at) => ({at, s: 'sfx/pop', v: 0.3})),
  ...[196.8, 197.3, 197.8, 198.3, 198.8].map((at) => ({at: at + 0.3, s: 'tick', v: 0.45})),
  {at: 209.4, s: 'cadenas', v: 0.5},
  {at: 215.8, s: 'cadenas', v: 0.5},
  {at: 228.0, s: 'notification', v: 0.4},
  ...Array.from({length: 14}, (_, k) => ({at: 233.2 + k * 0.12, s: 'sfx/click', v: 0.22})),
  {at: 235.0, s: 'validation', v: 0.45},
  {at: 254.2, s: 'soft-whoosh', v: 0.5},
  {at: 255.4, s: 'validation', v: 0.4},
  {at: 256.5, s: 'page', v: 0.5},
  {at: 264.0, s: 'stylo', v: 0.35, dur: 1.4},
  {at: 266.6, s: 'tension', v: 0.22, dur: 2.8},
  {at: 269.5, s: 'sfx/ding', v: 0.35},
  ...[277.46, 281.14, 286.92].map((at) => ({at, s: 'deep-hit', v: 0.4})),
  ...QS.flatMap(([, , at]) => [{at: at - 0.3, s: 'sfx/click', v: 0.35}, {at: at - 0.15, s: 'tick', v: 0.4}]),
  {at: 320.6, s: 'sfx/whoosh', v: 0.4},
  {at: 321.4, s: 'bass-hit', v: 0.4},
  {at: 334.6, s: 'soft-whoosh', v: 0.55, dur: 3},
  {at: 336.6, s: 'deep-hit', v: 0.5},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const GuideIso: React.FC = () => (
  <AbsoluteFill>
    <Backdrop />
    <Gate from={0} to={PLAN}><Hook /></Gate>
    <Gate from={PLAN} to={P1}><Plan /></Gate>
    <Gate from={P1} to={P2}><Dna /></Gate>
    <Gate from={P2} to={P3}><Foundation /></Gate>
    <Gate from={P3} to={P4}><Walls /></Gate>
    <Gate from={P4} to={MASE}><Roof /></Gate>
    <Gate from={MASE} to={TEMOIN}><Switch /></Gate>
    <Gate from={TEMOIN} to={P5}><Testimony /></Gate>
    <Gate from={P5} to={P6}><Integrated /></Gate>
    <Gate from={P6} to={FIN}><Choice /></Gate>
    <Gate from={FIN} to={OUTRO_AT}><Finale /></Gate>
    <Gate from={OUTRO_AT} to={999}><Outro at={OUTRO_AT} logo={LOGO} /></Gate>
    <MiniHouse />
    {[...CHAPS, OUTRO_AT].map((at) => <Unroll key={at} at={at} />)}
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0} to={OUTRO_AT}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-guide-iso-trio-origine.m4a')} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);
