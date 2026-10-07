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
 * « Pourquoi la norme ISO 9001 domine le monde de l'entreprise » — UI motion premium (skill
 * video-promo-diagnostic-qhse) avec des techniques de montage nouvelles dans la série : ouvertures en iris,
 * tour de paperasse qui s'effondre, 4 piliers 3D qui s'élèvent, carte-titre qui se retourne, balayage radar,
 * écosystème en orbite, engrenages, plaque ISO qui pivote en « système d'exploitation » qui démarre.
 */
const LOGO = 'promo/logo.png';
const REAL = 6.06;
const PILLARS = 9.88;
const P1 = 12.36;
const P2 = 21.68;
const P3 = 32.08;
const P4 = 40.9;
const FINAL = 50.66;
const OUTRO_AT = 61.3;
export const ISO9001MONDE_FRAMES = s(64.7);
const RED = '#D9443A';
const BLUE = '#3D7DD8';
const GOLD = '#C9A13B';
const PCOL = [BLUE, '#E8892B', '#8E5BD0', colors.green];
const PNAME = ['Résultat, pas méthode', 'Anticipation', 'Vision globale', 'Amélioration continue'];
const PAT = [P1, P2, P3, P4];

/* ─────────── Outils de montage ─────────── */

/** Ouverture en iris : le plan se révèle dans un cercle qui s'agrandit depuis un point. */
const Iris: React.FC<{from: number; to: number; cx?: number; cy?: number; children: React.ReactNode}> = ({from, to, cx = 540, cy = 960, children}) => {
  const t = useT();
  if (t < from || t > to) return null;
  const r = prog(t, from, from + 0.6, easeInOut) * 2300;
  return (
    <AbsoluteFill style={{clipPath: `circle(${r}px at ${cx}px ${cy}px)`}}>
      <Backdrop />
      {children}
      {r < 2200 && <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><circle cx={cx} cy={cy} r={r - 4} fill="none" stroke={colors.green} strokeWidth={10} /></svg>}
    </AbsoluteFill>
  );
};

/** Carte-titre de pilier qui se retourne (flip 3D) d'un pilier au suivant. */
const PillarHeader: React.FC<{i: number}> = ({i}) => {
  const t = useT();
  const flip = prog(t, PAT[i], PAT[i] + 0.6, easeInOut);
  const angle = (1 - flip) * -180;
  return (
    <div style={{position: 'absolute', left: 60, right: 60, top: 300, perspective: 1600}}>
      <div style={{transform: `rotateX(${angle}deg)`, transformStyle: 'preserve-3d', backfaceVisibility: 'hidden', background: '#fff', borderRadius: 30, boxShadow: shadow, padding: '20px 28px', display: 'flex', alignItems: 'center', gap: 22, opacity: Math.abs(angle) > 90 ? 0 : 1}}>
        <div style={{width: 92, height: 92, borderRadius: 24, background: PCOL[i], color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 60, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{i + 1}</div>
        <div style={{flex: 1}}>
          <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 24, letterSpacing: 4, color: '#9AA5B3'}}>PILIER {i + 1} / 4</div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: colors.navy, lineHeight: 1.05}}>{PNAME[i]}</div>
        </div>
        <div style={{display: 'flex', gap: 8, alignItems: 'flex-end'}}>
          {[0, 1, 2, 3].map((k) => <div key={k} style={{width: 16, height: 30 + k * 10, borderRadius: 5, background: k <= i ? PCOL[k] : '#E1E5EA'}} />)}
        </div>
      </div>
    </div>
  );
};

/* ─────────── Plans ─────────── */

/** Accroche : une tour de paperasse tamponnée qui grossit puis s'effondre. */
const Paperwork: React.FC = () => {
  const t = useT();
  const fall = prog(t, 5.75, 6.4, easeIn);
  const stamps: [string, number, number, number, string][] = [['URGENT', 4.45, 300, 900, RED], ['REFUSÉ', 4.9, 720, 1060, RED], ['À VALIDER', 5.3, 420, 1250, GOLD]];
  return (
    <AbsoluteFill>
      <Kinetic text="La norme la plus *utilisée* au monde" at={0.1} until={3.3} y={400} size={74} />
      <Kinetic text="… un *cauchemar* bureaucratique ?" at={3.4} y={400} size={74} accent={RED} />
      <div style={{position: 'absolute', left: 540 - 70, top: 520, opacity: prog(t, 0.6, 1.0) * (1 - fall)}}><F n="globe" size={140} /></div>
      {Array.from({length: 22}, (_, k) => {
        const at = 0.4 + k * 0.12;
        const p = prog(t, at, at + 0.3, easeOut);
        const dir = random(`f${k}`) - 0.5;
        return (
          <div key={k} style={{position: 'absolute', left: 290 + Math.sin(k * 2.3) * 22, top: 1540 - k * 34, width: 500, height: 70, borderRadius: 8, background: k % 3 === 0 ? '#FFF7E6' : '#fff', border: '2px solid #E1E5EA', boxShadow: '0 4px 10px rgba(14,30,60,0.08)', opacity: p * (1 - fall),
            transform: `translateY(${(1 - p) * -300 + fall * (600 + k * 30)}px) translateX(${fall * dir * 900}px) rotate(${Math.sin(k * 1.7) * 3 + fall * dir * 140}deg)`}}>
            <div style={{margin: '14px 20px', height: 10, borderRadius: 5, background: '#E5E8EC', width: `${50 + (k * 23) % 40}%`}} />
          </div>
        );
      })}
      {stamps.map(([l, at, x, y, c]) => {
        const p = prog(t, at, at + 0.18, easeOut);
        return p > 0 ? <div key={l} style={{position: 'absolute', left: x, top: y, transform: `translate(-50%, -50%) rotate(-12deg) scale(${2.2 - 1.2 * p}) translateY(${fall * 900}px)`, opacity: p * (1 - fall), border: `7px solid ${c}`, color: c, borderRadius: 14, padding: '6px 22px', fontFamily: sansFont, fontWeight: 900, fontSize: 52, background: 'rgba(255,255,255,0.85)'}}>{l}</div> : null;
      })}
    </AbsoluteFill>
  );
};

/** En réalité : un outil de pilotage (tablette avec graphiques qui poussent). */
const Reality: React.FC = () => {
  const t = useT();
  const bars = [0.45, 0.62, 0.55, 0.78, 0.9];
  return (
    <AbsoluteFill>
      <Kinetic text="Un outil de *pilotage* pragmatique" at={REAL + 0.4} y={400} size={74} />
      <div style={{position: 'absolute', left: 120, top: 600, width: 840, height: 620, borderRadius: 50, background: '#12161C', padding: 22, boxSizing: 'border-box', boxShadow: '0 40px 80px rgba(14,30,60,0.3)', transform: `perspective(1600px) rotateX(${12 - 12 * prog(t, REAL, REAL + 1.5, easeOut)}deg)`}}>
        <div style={{width: '100%', height: '100%', borderRadius: 32, background: '#fff', padding: 34, boxSizing: 'border-box', position: 'relative', overflow: 'hidden'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: colors.navy}}>Pilotage qualité</div>
            <div style={{border: '2px solid #CBD2DA', borderRadius: 10, padding: '3px 12px', fontFamily: sansFont, fontWeight: 800, fontSize: 18, color: '#9AA5B3', letterSpacing: 2}}>EXEMPLE</div>
          </div>
          <div style={{position: 'absolute', left: 50, right: 50, bottom: 50, height: 380, display: 'flex', alignItems: 'flex-end', gap: 30}}>
            {bars.map((b, k) => <div key={k} style={{flex: 1, height: `${b * 100 * prog(t, 7.0 + k * 0.15, 7.8 + k * 0.15, easeOut)}%`, borderRadius: '14px 14px 4px 4px', background: k === bars.length - 1 ? colors.green : BLUE}} />)}
          </div>
          <svg width={740} height={420} style={{position: 'absolute', left: 50, bottom: 40}}><path d="M10 330 L190 260 L370 280 L550 160 L730 60" stroke={GOLD} strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={`${prog(t, 8.0, 9.2)} 1`} /></svg>
        </div>
      </div>
      <div style={{position: 'absolute', left: 540, top: 1300, transform: `translateX(-50%) scale(${prog(t, 8.7, 9.1, easeOut)})`, display: 'flex', alignItems: 'center', gap: 12, background: colors.green, color: '#fff', borderRadius: 40, padding: '14px 32px', fontFamily: sansFont, fontWeight: 900, fontSize: 38, whiteSpace: 'nowrap'}}><F n="engrenage" size={52} /> Pragmatique</div>
    </AbsoluteFill>
  );
};

/** Les 4 piliers en 3D qui s'élèvent. */
const Pillars: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Kinetic text="Les *4 piliers* du succès" at={PILLARS + 0.2} y={400} size={86} />
      <div style={{position: 'absolute', left: 90, right: 90, top: 640, height: 820, perspective: 1400}}>
        <div style={{position: 'absolute', inset: 0, transform: 'rotateX(14deg)', transformOrigin: 'bottom'}}>
          <div style={{position: 'absolute', left: -20, right: -20, top: 0, height: 70, borderRadius: 18, background: colors.navy, transform: `scaleX(${prog(t, 11.4, 11.9, easeOut)})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 36, letterSpacing: 4}}>ISO 9001</div>
          {[0, 1, 2, 3].map((k) => {
            const h = prog(t, 10.5 + k * 0.18, 11.3 + k * 0.18, easeOut);
            return (
              <div key={k} style={{position: 'absolute', left: k * 230, bottom: 0, width: 170, height: 700 * h, borderRadius: '18px 18px 0 0', background: `linear-gradient(90deg, ${PCOL[k]}, ${PCOL[k]}cc 60%, ${PCOL[k]}88)`, boxShadow: '0 20px 40px rgba(14,30,60,0.2)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 30, boxSizing: 'border-box', overflow: 'hidden'}}>
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 90, color: '#fff'}}>{k + 1}</div>
              </div>
            );
          })}
          <div style={{position: 'absolute', left: -40, right: -40, bottom: -40, height: 40, borderRadius: 10, background: '#D5D9DE'}} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** Pilier 1 : la cible est imposée, les chemins sont libres. */
const Pillar1: React.FC = () => {
  const t = useT();
  const paths: [string, string, number, string][] = [
    ['M120 1500 C 200 1100, 300 900, 540 860', BLUE, 19.1, '6 0'],
    ['M380 1520 C 360 1250, 620 1150, 540 860', colors.green, 19.5, '18 12'],
    ['M700 1520 C 880 1300, 900 1000, 540 860', '#E8892B', 19.9, '4 10'],
    ['M960 1450 C 700 1350, 760 950, 540 860', '#8E5BD0', 20.4, '24 8'],
  ];
  return (
    <AbsoluteFill>
      <PillarHeader i={0} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {paths.map(([d, c, at, dash], k) => <path key={k} d={d} stroke={c} strokeWidth={10} fill="none" strokeLinecap="round" strokeDasharray={prog(t, at, at + 0.8) >= 1 ? dash : `${prog(t, at, at + 0.8) * 1400} 1400`} />)}
      </svg>
      <div style={{position: 'absolute', left: 540 - 130, top: 860 - 130, width: 260, height: 260, borderRadius: 130, background: '#fff', boxShadow: shadow, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${prog(t, 13.4, 13.9, easeOut) * (1 + 0.04 * Math.sin(t * 4))})`}}><F n="cible" size={190} /></div>
      <div style={{position: 'absolute', left: 540, top: 600, transform: `translateX(-50%) scale(${prog(t, 16.4, 16.8, easeOut)})`, background: colors.navy, color: '#fff', borderRadius: 30, padding: '10px 26px', fontFamily: sansFont, fontWeight: 900, fontSize: 32, whiteSpace: 'nowrap'}}>Objectif imposé</div>
      {[['Méthode', 15.2, 220, 1180], ['Vos solutions', 19.7, 820, 1200], ['Vos formats', 20.7, 300, 1400]].map(([l, at, x, y], k) => {
        const p = prog(t, at as number, (at as number) + 0.35, easeOut);
        const strike = k === 0 ? prog(t, 15.5, 15.9) : 0;
        return p > 0 ? (
          <div key={l as string} style={{position: 'absolute', left: x as number, top: y as number, transform: `translate(-50%, -50%) scale(${p})`, background: '#fff', borderRadius: 24, padding: '10px 22px', boxShadow: '0 8px 18px rgba(14,30,60,0.14)', fontFamily: handFont, fontSize: 44, color: k === 0 ? RED : colors.green, whiteSpace: 'nowrap'}}>
            {k === 0 ? 'Méthode imposée' : `${l} ✓`}
            {k === 0 && <div style={{position: 'absolute', left: 10, right: 10, top: '52%', height: 6, background: RED, borderRadius: 3, transform: `scaleX(${strike})`, transformOrigin: 'left'}} />}
          </div>
        ) : null;
      })}
    </AbsoluteFill>
  );
};

/** Pilier 2 : cartographie des activités + balayage radar des risques. */
const FAMILIES: [string, string][] = [['Achats', 'colis'], ['Production', 'usine'], ['Logistique', 'camion'], ['Ressources humaines', 'equipe'], ['Ventes', 'poignee'], ['Maintenance', 'outils']];
const Pillar2: React.FC = () => {
  const t = useT();
  const sweep = prog(t, 27.4, 31.0, (v) => v) * 360 * 1.5;
  const risks: [number, number, number][] = [[0, 28.5, 29.4], [2, 28.9, 29.7], [5, 29.3, 30.1]];
  return (
    <AbsoluteFill>
      <PillarHeader i={1} />
      <div style={{position: 'absolute', left: 540 - 420, top: 560, width: 840, height: 840}}>
        {/* radar */}
        <svg width={840} height={840} style={{position: 'absolute', inset: 0, opacity: prog(t, 27.2, 27.6)}}>
          {[140, 280, 410].map((r) => <circle key={r} cx={420} cy={420} r={r} fill="none" stroke="#DCE2E8" strokeWidth={3} />)}
          <defs><linearGradient id="sweep" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor={colors.green} stopOpacity={0} /><stop offset="1" stopColor={colors.green} stopOpacity={0.35} /></linearGradient></defs>
          <path d={`M420 420 L${420 + 410 * Math.cos((sweep - 40) * Math.PI / 180)} ${420 + 410 * Math.sin((sweep - 40) * Math.PI / 180)} A410 410 0 0 1 ${420 + 410 * Math.cos(sweep * Math.PI / 180)} ${420 + 410 * Math.sin(sweep * Math.PI / 180)} Z`} fill="url(#sweep)" opacity={t < 31.2 ? 1 : 0} />
        </svg>
        <div style={{position: 'absolute', left: 420 - 80, top: 420 - 80, width: 160, height: 160, borderRadius: 80, background: colors.navy, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${prog(t, 24.0, 24.4, easeOut)})`}}><F n="batiment" size={100} /></div>
        {FAMILIES.map(([l, ic], k) => {
          const a = (k / FAMILIES.length) * Math.PI * 2 - Math.PI / 2;
          const p = prog(t, 25.0 + k * 0.2, 25.4 + k * 0.2, easeOut);
          const x = 420 + Math.cos(a) * 290;
          const y = 420 + Math.sin(a) * 290;
          const risk = risks.find(([n]) => n === k);
          const found = risk ? prog(t, risk[1], risk[1] + 0.25) : 0;
          const safe = risk ? prog(t, risk[2], risk[2] + 0.3, easeOut) : 0;
          return (
            <div key={l} style={{position: 'absolute', left: x - 95, top: y - 75, width: 190, height: 150, borderRadius: 26, background: '#fff', boxShadow: shadow, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, transform: `scale(${p})`, border: `4px solid ${found > 0 && safe < 1 ? RED : safe > 0 ? colors.green : 'transparent'}`}}>
              <F n={ic} size={64} />
              <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: l.length > 12 ? 20 : 24, color: colors.navy, textAlign: 'center'}}>{l}</div>
              {found > 0 && <div style={{position: 'absolute', right: -18, top: -18, transform: `scale(${found})`}}><F n={safe > 0.5 ? 'bouclier' : 'danger'} size={56} /></div>}
            </div>
          );
        })}
      </div>
      <Kinetic text="avant que ça *déraille*" at={30.6} y={1500} size={58} accent={RED} />
    </AbsoluteFill>
  );
};

/** Pilier 3 : l'écosystème en orbite. */
const Pillar3: React.FC = () => {
  const t = useT();
  const rings: [string, string, number, number, number][] = [['Client final', 'coeur', 35.24, 200, 0.5], ['Fournisseurs', 'camion', 39.14, 320, -0.35], ['Réglementation', 'juge', 40.02, 430, 0.25]];
  return (
    <AbsoluteFill>
      <PillarHeader i={2} />
      <div style={{position: 'absolute', left: 540 - 450, top: 560, width: 900, height: 900}}>
        <svg width={900} height={900} style={{position: 'absolute', inset: 0}}>
          {rings.map(([l, , at, r]) => <circle key={l} cx={450} cy={450} r={r} fill="none" stroke="#C9D1DA" strokeWidth={3} strokeDasharray="10 10" pathLength={1} opacity={prog(t, at - 0.6, at - 0.2)} />)}
        </svg>
        <div style={{position: 'absolute', left: 450 - 95, top: 450 - 95, width: 190, height: 190, borderRadius: 95, background: colors.navy, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px rgba(14,42,92,0.35)', transform: `scale(${prog(t, P3 + 0.4, P3 + 0.9, easeOut)})`}}>
          <F n="batiment" size={90} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 22, color: '#fff'}}>Entreprise</div>
        </div>
        {rings.map(([l, ic, at, r, speed]) => {
          const a = -Math.PI / 2 + (t - at) * speed;
          const p = prog(t, at - 0.2, at + 0.3, easeOut);
          return (
            <div key={l} style={{position: 'absolute', left: 450 + Math.cos(a) * r - 80, top: 450 + Math.sin(a) * r - 70, width: 160, height: 140, borderRadius: 26, background: '#fff', boxShadow: shadow, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `scale(${p})`, borderBottom: '6px solid #8E5BD0'}}>
              <F n={ic} size={66} />
              <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 21, color: colors.navy, textAlign: 'center'}}>{l}</div>
            </div>
          );
        })}
      </div>
      <Kinetic text="Tout votre *écosystème*" at={37.3} y={1500} size={64} accent="#8E5BD0" />
    </AbsoluteFill>
  );
};

/** Pilier 4 : engrenages, retours clients, erreur décortiquée, correction. */
const Gear: React.FC<{x: number; y: number; r: number; speed: number; color: string}> = ({x, y, r, speed, color}) => {
  const t = useT();
  const teeth = Math.round(r / 12);
  const pts = Array.from({length: teeth * 2}, (_, i) => {
    const a = (i / (teeth * 2)) * Math.PI * 2;
    const rr = i % 2 === 0 ? r : r * 0.82;
    return `${r + rr * Math.cos(a)},${r + rr * Math.sin(a)}`;
  }).join(' ');
  return (
    <svg width={2 * r} height={2 * r} style={{position: 'absolute', left: x - r, top: y - r, transform: `rotate(${t * speed}deg)`}}>
      <polygon points={pts} fill={color} stroke={color} strokeWidth={6} strokeLinejoin="round" />
      <circle cx={r} cy={r} r={r * 0.32} fill="#F6F3EC" />
    </svg>
  );
};
const Pillar4: React.FC = () => {
  const t = useT();
  const err = prog(t, 47.4, 47.9, easeOut);
  const fix = prog(t, 48.6, 49.6, easeInOut);
  return (
    <AbsoluteFill>
      <PillarHeader i={3} />
      <div style={{opacity: prog(t, P4 + 0.3, P4 + 0.8)}}>
        <Gear x={430} y={860} r={170} speed={40} color={colors.green} />
        <Gear x={680} y={1020} r={110} speed={-62} color={colors.navy} />
        <Gear x={330} y={1120} r={80} speed={-85} color="#9AA5B3" />
      </div>
      <div style={{position: 'absolute', left: 540, top: 600, transform: `translateX(-50%) scale(${prog(t, 44.2, 44.6, easeOut)})`, background: colors.green, color: '#fff', borderRadius: 30, padding: '10px 28px', fontFamily: sansFont, fontWeight: 900, fontSize: 34, whiteSpace: 'nowrap'}}>Le moteur du dispositif</div>
      {['« Livraison en retard »', '« Produit conforme ? »', '« Merci ! »'].map((b, k) => {
        const at = 46.4 + k * 0.25;
        const p = prog(t, at, at + 0.4, easeOut);
        return <div key={b} style={{position: 'absolute', left: 760, top: 700 + k * 110, transform: `translateX(${(1 - p) * 300}px)`, opacity: p * (1 - prog(t, 47.3, 47.6)), background: '#fff', borderRadius: '24px 24px 24px 4px', padding: '12px 20px', boxShadow: '0 8px 18px rgba(14,30,60,0.14)', fontFamily: handFont, fontSize: 32, color: colors.navy, whiteSpace: 'nowrap'}}>{b}</div>;
      })}
      {err > 0 && (
        <div style={{position: 'absolute', left: 540, top: 1360, transform: `translate(-50%, 0) scale(${err})`, display: 'flex', alignItems: 'center', gap: 16, background: '#fff', borderRadius: 26, padding: '16px 26px', boxShadow: shadow, border: `4px solid ${fix > 0.5 ? colors.green : RED}`}}>
          <F n={fix > 0.5 ? 'check' : 'loupe'} size={64} />
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: fix > 0.5 ? colors.green : RED, whiteSpace: 'nowrap'}}>{fix > 0.5 ? 'Tir corrigé, en continu' : 'Erreur décortiquée'}</div>
        </div>
      )}
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {fix > 0 && <path d="M260 1420 C 80 1300, 120 760, 300 700" stroke={colors.green} strokeWidth={10} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={`${fix} 1`} />}
      </svg>
    </AbsoluteFill>
  );
};

/** Final : la plaque de l'accueil pivote et devient un « système d'exploitation » qui démarre. */
const Final: React.FC = () => {
  const t = useT();
  const flip = prog(t, 55.1, 55.9, easeInOut);
  const angle = flip * 180;
  const modules: [string, number][] = [['Résultats', 56.6], ['Anticipation', 57.1], ['Écosystème', 57.6], ['Amélioration continue', 58.1]];
  const boot = prog(t, 56.2, 58.8, easeInOut);
  const curve = prog(t, 59.4, 60.7, easeInOut);
  return (
    <AbsoluteFill>
      <Kinetic text="Plus qu'un *label*" at={FINAL + 0.3} until={55.4} y={400} size={90} />
      <Kinetic text="Un *système d'exploitation*" at={55.5} y={400} size={80} />
      <div style={{position: 'absolute', left: 90, top: 560, width: 900, height: 900, perspective: 2000}}>
        {/* recto : plaque laiton */}
        <div style={{position: 'absolute', inset: 0, transform: `rotateY(${angle}deg) scale(${0.85 + 0.15 * prog(t, 51.3, 51.9, easeOut)})`, backfaceVisibility: 'hidden', borderRadius: 30, background: 'linear-gradient(135deg, #E8CF8A, #B8902F 55%, #E3C26F)', boxShadow: '0 40px 80px rgba(14,30,60,0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, opacity: prog(t, 51.3, 51.7)}}>
          {[[40, 40], [820, 40], [40, 820], [820, 820]].map(([x, y], k) => <div key={k} style={{position: 'absolute', left: x, top: y, width: 36, height: 36, borderRadius: 18, background: 'radial-gradient(circle at 35% 35%, #fff6d8, #8a6a1c)'}} />)}
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 150, color: '#5E4410', textShadow: '0 2px 0 rgba(255,255,255,0.5)'}}>ISO 9001</div>
          <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 40, color: '#5E4410', letterSpacing: 6}}>LABEL DE CONFORMITÉ</div>
          <div style={{position: 'absolute', inset: 0, borderRadius: 30, background: `linear-gradient(105deg, transparent ${prog(t, 52.2, 53.2) * 140 - 40}%, rgba(255,255,255,0.6) ${prog(t, 52.2, 53.2) * 140 - 25}%, transparent ${prog(t, 52.2, 53.2) * 140 - 10}%)`}} />
        </div>
        {/* verso : système d'exploitation */}
        <div style={{position: 'absolute', inset: 0, transform: `rotateY(${angle - 180}deg)`, backfaceVisibility: 'hidden', borderRadius: 30, background: '#0E1726', boxShadow: '0 40px 80px rgba(14,30,60,0.35)', padding: 40, boxSizing: 'border-box', color: '#fff'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
            {['#F16A5E', '#F5BE4F', '#61C554'].map((c) => <div key={c} style={{width: 18, height: 18, borderRadius: 9, background: c}} />)}
            <div style={{marginLeft: 16, fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: '#9FB0C8'}}>ISO 9001 — système d'exploitation</div>
          </div>
          <div style={{marginTop: 34, height: 18, borderRadius: 9, background: '#1E2B40'}}><div style={{width: `${boot * 100}%`, height: '100%', borderRadius: 9, background: colors.green}} /></div>
          <div style={{marginTop: 30, display: 'flex', flexDirection: 'column', gap: 18}}>
            {modules.map(([m, at], k) => (
              <div key={m} style={{display: 'flex', alignItems: 'center', gap: 16, fontFamily: sansFont, fontWeight: 700, fontSize: 34, opacity: prog(t, at - 0.2, at)}}>
                <Check p={prog(t, at, at + 0.35)} size={44} color={PCOL[k]} />
                <span style={{color: '#E6ECF5'}}>Module {k + 1} · {m}</span>
              </div>
            ))}
          </div>
          <svg width={820} height={200} style={{position: 'absolute', left: 40, bottom: 40}}>
            <path d="M10 190 C 260 185, 480 140, 810 20 L810 190 Z" fill={`rgba(46,155,62,${0.25 * curve})`} />
            <path d="M10 190 C 260 185, 480 140, 810 20" stroke={colors.greenLight} strokeWidth={8} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={`${curve} 1`} />
            <text x={20} y={30} fontFamily="Montserrat" fontWeight={800} fontSize={26} fill="#9FB0C8" opacity={curve}>Croissance long terme</text>
          </svg>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** Bruitages seuls (ni musique ni ambiance). */
const CUES: Sfx[] = [
  {at: 0.05, s: 'bass-hit', v: 0.5},
  {at: 0.6, s: 'sfx/pop', v: 0.4},
  ...Array.from({length: 11}, (_, k) => ({at: 0.4 + k * 0.24, s: 'page', v: 0.22})),
  ...[4.45, 4.9, 5.3].map((at) => ({at, s: 'tampon', v: 0.6})),
  {at: 5.75, s: 'sfx/whoosh', v: 0.55},
  {at: 5.8, s: 'deep-hit', v: 0.5},
  ...[REAL, PILLARS, P1, P2, P3, P4, FINAL].map((at) => ({at: at - 0.05, s: 'soft-whoosh', v: 0.48})),
  ...[0, 1, 2, 3, 4].map((k) => ({at: 7.0 + k * 0.15, s: 'sfx/click', v: 0.3})),
  {at: 8.7, s: 'validation', v: 0.42},
  ...[0, 1, 2, 3].map((k) => ({at: 10.5 + k * 0.18, s: 'deep-hit', v: 0.32})),
  {at: 11.4, s: 'sfx/thud', v: 0.45},
  ...[P1, P2, P3, P4].map((at) => ({at: at + 0.1, s: 'page', v: 0.5})),
  {at: 13.4, s: 'sfx/pop', v: 0.45},
  {at: 15.5, s: 'sfx/swish', v: 0.45},
  {at: 16.4, s: 'sfx/pop', v: 0.42},
  ...[19.1, 19.5, 19.9, 20.4].map((at) => ({at, s: 'stylo', v: 0.3, dur: 0.6})),
  ...FAMILIES.map((_, k) => ({at: 25.0 + k * 0.2, s: 'sfx/pop', v: 0.36})),
  {at: 27.4, s: 'riser', v: 0.28, dur: 2.0},
  ...[28.5, 28.9, 29.3].map((at) => ({at, s: 'notification', v: 0.32})),
  ...[29.4, 29.7, 30.1].map((at) => ({at, s: 'validation', v: 0.34})),
  {at: P3 + 0.4, s: 'deep-hit', v: 0.42},
  ...[35.24, 39.14, 40.02].map((at) => ({at, s: 'sfx/pop', v: 0.45})),
  {at: P4 + 0.3, s: 'sfx/click', v: 0.35},
  {at: 44.2, s: 'sfx/pop', v: 0.42},
  ...[46.4, 46.65, 46.9].map((at) => ({at, s: 'notification', v: 0.28})),
  {at: 47.4, s: 'sfx/swish', v: 0.45},
  {at: 48.6, s: 'riser', v: 0.26, dur: 1.0},
  {at: 49.6, s: 'validation', v: 0.45},
  {at: 51.3, s: 'deep-hit', v: 0.45},
  {at: 52.2, s: 'sfx/ding', v: 0.35},
  {at: 55.1, s: 'sfx/whoosh', v: 0.5},
  ...[56.6, 57.1, 57.6, 58.1].map((at) => ({at, s: 'tick', v: 0.48})),
  {at: 59.4, s: 'stylo', v: 0.32, dur: 1.2},
  {at: 60.6, s: 'validation', v: 0.45},
  {at: OUTRO_AT - 0.4, s: 'soft-whoosh', v: 0.5},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const Iso9001Monde: React.FC = () => (
  <AbsoluteFill>
    <Backdrop />
    <Gate from={0} to={REAL + 0.6}><Paperwork /></Gate>
    <Iris from={REAL} to={PILLARS + 0.6} cy={1000}><Reality /></Iris>
    <Iris from={PILLARS} to={P1 + 0.6} cy={1100}><Pillars /></Iris>
    <Iris from={P1} to={P2 + 0.6} cx={180} cy={360}><Pillar1 /></Iris>
    <Iris from={P2} to={P3 + 0.6} cx={420} cy={360}><Pillar2 /></Iris>
    <Iris from={P3} to={P4 + 0.6} cx={660} cy={360}><Pillar3 /></Iris>
    <Iris from={P4} to={FINAL + 0.6} cx={900} cy={360}><Pillar4 /></Iris>
    <Iris from={FINAL} to={OUTRO_AT + 0.6}><Final /></Iris>
    <Gate from={OUTRO_AT} to={999}><Outro at={OUTRO_AT} logo={LOGO} /></Gate>
    <Gate from={0} to={OUTRO_AT}><Captions captions={captions} /></Gate>
    <Audio src={staticFile('voix-off-iso9001-monde.m4a')} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);
