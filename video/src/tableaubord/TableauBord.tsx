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
 * « Pourquoi alléger votre tableau de bord QHSE » — format UI motion premium (skill video-promo-diagnostic-qhse)
 * enrichi de techniques de montage : mur de 50 indicateurs qui sature puis explose en particules,
 * traversées de caméra (zoom-through) entre les plans, flou de mouvement, reflets lumineux, parallaxe 3D,
 * et recomposition finale des 50 tuiles en 5 indicateurs vitaux (raccord « avant / après »).
 */
const LOGO = 'promo/logo.png';
const SAT = 6.1;
const ONE = 10.72;
const LOOP = 17.48;
const SECU = 24.22;
const QE = 34.76;
const REACT = 46.64;
const RESULT = 56.96;
const FIVE = 64.82;
const OUTRO_AT = 69.5;
export const TABLEAUBORD_FRAMES = s(72.9);
const RED = '#D9443A';
const ORANGE = '#E8892B';
const BLUE = '#3D7DD8';

/* ─────────── Outils de montage ─────────── */

/** Plan avec traversée de caméra : entrée en reculant depuis la profondeur, sortie en plongeant à travers l'écran. */
const Shot: React.FC<{from: number; to: number; children: React.ReactNode; push?: number}> = ({from, to, children, push = 0.04}) => {
  const t = useT();
  if (t < from - 0.05 || t > to + 0.05) return null;
  const inP = prog(t, from, from + 0.45, easeOut);
  const outP = prog(t, to - 0.35, to, easeIn);
  const drift = 1 + push * prog(t, from, to, (v) => v);
  const scale = (0.82 + 0.18 * inP) * drift * (1 + 1.6 * outP);
  const blur = (1 - inP) * 10 + outP * 16;
  return (
    <AbsoluteFill style={{opacity: Math.min(1, inP * 1.6) * (1 - outP), transform: `scale(${scale})`, filter: blur > 0.3 ? `blur(${blur}px)` : undefined}}>
      {children}
    </AbsoluteFill>
  );
};

/** Reflet lumineux qui balaie une carte. */
const Sheen: React.FC<{at: number}> = ({at}) => {
  const t = useT();
  const p = prog(t, at, at + 0.9, easeInOut);
  if (p <= 0 || p >= 1) return null;
  return <div style={{position: 'absolute', inset: 0, background: `linear-gradient(105deg, transparent ${p * 140 - 40}%, rgba(255,255,255,0.75) ${p * 140 - 25}%, transparent ${p * 140 - 10}%)`, pointerEvents: 'none'}} />;
};

const Badge: React.FC<{text?: string}> = ({text = 'EXEMPLE'}) => (
  <div style={{border: '2px solid #CBD2DA', borderRadius: 10, padding: '3px 12px', fontFamily: sansFont, fontWeight: 800, fontSize: 20, color: '#9AA5B3', letterSpacing: 2}}>{text}</div>
);

/** Petite courbe (sparkline) qui se dessine. */
const Spark: React.FC<{pts: number[]; w: number; h: number; color: string; p: number; sw?: number}> = ({pts, w, h, color, p, sw = 4}) => {
  const max = Math.max(...pts);
  const min = Math.min(...pts);
  const d = pts.map((v, i) => `${i ? 'L' : 'M'}${(i / (pts.length - 1)) * w} ${h - ((v - min) / (max - min || 1)) * h}`).join(' ');
  return <svg width={w} height={h} style={{overflow: 'visible'}}><path d={d} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={`${p} 1`} /></svg>;
};

/* ─────────── Mur de 50 indicateurs ─────────── */
const LABELS = ['TF', 'TG', 'ISO 45001', 'Audit', 'CO₂', 'Déchets', 'NC', 'Eau', 'Énergie', 'Formation', 'Presqu\'acc.', 'EPI', 'Réclam.', 'Bruit', 'Incidents', 'ISO 14001', 'Conformité', 'Visites', 'Causeries', 'Absences'];
const COLS = 5;
const TW = 172;
const TH = 84;
const tilePos = (i: number) => ({x: 540 - (COLS * TW + (COLS - 1) * 14) / 2 + (i % COLS) * (TW + 14), y: 520 + Math.floor(i / COLS) * (TH + 14)});
const VITAL = [7, 16, 23, 32, 44]; // tuiles conservées à la fin
const FIVE_LIST: [string, string, string][] = [
  ['Taux de fréquence & prévention', 'bouclier', BLUE],
  ['Tendance des non-conformités', 'graphique', ORANGE],
  ['Dérive de consommation énergétique', 'eclair', colors.green],
  ['Délai de traitement des actions', 'chrono', '#8E5BD0'],
  ['Taux de clôture des correctifs', 'check', colors.navy],
];

const Tile: React.FC<{i: number; x: number; y: number; w?: number; h?: number; o?: number; rot?: number; blur?: number; alarm?: number}> = ({i, x, y, w = TW, h = TH, o = 1, rot = 0, blur = 0, alarm = 0}) => {
  const t = useT();
  const pts = Array.from({length: 7}, (_, k) => random(`p${i}-${k}`) * 10 + Math.sin(t * 2 + i + k) * 1.5);
  const red = alarm > 0 && random(`r${i}`) > 0.45;
  const blink = red ? 0.5 + 0.5 * Math.sin(t * 14 + i) : 0;
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: 16, background: red ? `rgba(255,${235 - blink * 50},${232 - blink * 60},1)` : '#fff', boxShadow: '0 6px 14px rgba(14,30,60,0.10)', opacity: o, transform: `rotate(${rot}deg)`, filter: blur > 0.3 ? `blur(${blur}px)` : undefined, padding: '8px 10px', boxSizing: 'border-box', overflow: 'hidden', border: red ? `2px solid rgba(217,68,58,${0.3 + 0.5 * blink * alarm})` : '2px solid transparent'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: sansFont, fontWeight: 800, fontSize: 16, color: '#8A94A1'}}>
        <span>{LABELS[i % LABELS.length]}</span><span style={{color: red ? RED : colors.navy}}>{(random(`v${i}`) * 99).toFixed(1)}</span>
      </div>
      <div style={{marginTop: 8}}><Spark pts={pts} w={w - 20} h={h - 44} color={red ? RED : i % 3 ? BLUE : colors.green} p={1} sw={3} /></div>
    </div>
  );
};

/** Le mur : apparition en rafale, saturation, puis explosion en particules (sauf une tuile). */
const Wall: React.FC<{start: number; boom: number; keep?: number[]; alarmAt: number; reverse?: boolean}> = ({start, boom, keep = [], alarmAt}) => {
  const t = useT();
  const alarm = prog(t, alarmAt, alarmAt + 0.6);
  return (
    <AbsoluteFill style={{transform: `perspective(1600px) rotateX(${8 - 8 * prog(t, start, start + 3)}deg) scale(${1 + 0.05 * Math.sin(t * 30) * alarm * (t < boom ? 1 : 0) * 0.15})`}}>
      {Array.from({length: 50}, (_, i) => {
        const at = start + i * 0.055;
        const p = prog(t, at, at + 0.25, easeOut);
        if (p <= 0) return null;
        const {x, y} = tilePos(i);
        const kept = keep.includes(i);
        const b = kept ? 0 : prog(t, boom + random(`d${i}`) * 0.25, boom + 0.9 + random(`d${i}`) * 0.25, easeIn);
        const ang = Math.atan2(y - 960, x - 540 + 0.01) + (random(`a${i}`) - 0.5);
        const dist = b * (900 + random(`s${i}`) * 700);
        return (
          <Tile key={i} i={i} x={x + Math.cos(ang) * dist} y={y + Math.sin(ang) * dist + (1 - p) * 40} o={p * (1 - b)} rot={b * (random(`rot${i}`) - 0.5) * 220} blur={b * 14} alarm={alarm} />
        );
      })}
    </AbsoluteFill>
  );
};

/* ─────────── Plans ─────────── */
const Intro: React.FC = () => {
  const t = useT();
  const n = Math.min(50, Math.floor(prog(t, 2.4, 5.2) * 50));
  return (
    <AbsoluteFill>
      <Wall start={2.4} boom={99} alarmAt={6.6} />
      <Kinetic text="En *QHSE*…" at={0.1} until={1.9} y={400} size={110} />
      <Kinetic text="*50* indicateurs = meilleur pilotage ?" at={2.0} y={400} size={74} />
      <div style={{position: 'absolute', right: 60, top: 1530, fontFamily: sansFont, fontWeight: 900, fontSize: 110, color: n >= 50 ? RED : colors.navy, opacity: prog(t, 2.4, 2.8)}}>{n}<span style={{fontSize: 36, color: '#9AA5B3'}}> indicateurs</span></div>
    </AbsoluteFill>
  );
};

const Saturation: React.FC = () => {
  const t = useT();
  const load = prog(t, SAT + 0.2, 8.0, easeInOut);
  return (
    <AbsoluteFill>
      <Wall start={SAT - 3.0} boom={ONE + 0.1} keep={[22]} alarmAt={SAT + 0.4} />
      <Kinetic text="Tableau de bord *saturé*" at={SAT + 0.1} until={ONE} y={400} size={80} accent={RED} />
      <div style={{position: 'absolute', left: 90, right: 90, top: 1540, opacity: prog(t, SAT + 0.2, SAT + 0.5) * (1 - prog(t, ONE - 0.2, ONE))}}>
        <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: sansFont, fontWeight: 800, fontSize: 28, color: colors.navy}}><span>Charge d'information</span><span style={{color: RED}}>{Math.round(load * 100)} %</span></div>
        <div style={{marginTop: 10, height: 22, borderRadius: 11, background: '#E5E8EC'}}><div style={{width: `${load * 100}%`, height: '100%', borderRadius: 11, background: `linear-gradient(90deg, ${colors.green}, ${ORANGE}, ${RED})`}} /></div>
      </div>
      <div style={{position: 'absolute', left: 540 - 90, top: 900, width: 180, height: 180, borderRadius: 90, background: colors.navy, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.35)', transform: `scale(${prog(t, 9.0, 9.35, easeOut) * (1 - prog(t, ONE - 0.15, ONE + 0.1))})`}}>?</div>
    </AbsoluteFill>
  );
};

/** Une seule tuile survit et devient un vrai indicateur qui déclenche une décision. */
const OneKpi: React.FC = () => {
  const t = useT();
  const from = tilePos(22);
  const m = prog(t, ONE + 0.2, ONE + 1.2, easeInOut);
  const W = 172 + (760 - 172) * m;
  const H = 84 + (360 - 84) * m;
  const x = from.x + (540 - W / 2 - from.x) * m;
  const y = from.y + (620 - from.y) * m;
  const arrow = prog(t, 14.5, 15.3, easeInOut);
  const btn = prog(t, 15.3, 15.7, easeOut);
  const click = prog(t, 16.2, 16.32) * (1 - prog(t, 16.32, 16.5));
  return (
    <AbsoluteFill>
      <Kinetic text="Un *indicateur*…" at={ONE + 0.3} until={14.0} y={400} size={90} />
      <Kinetic text="…doit *déclencher* une décision" at={14.05} y={400} size={74} />
      <div style={{position: 'absolute', left: x, top: y, width: W, height: H, borderRadius: 16 + 18 * m, background: '#fff', boxShadow: shadow, overflow: 'hidden', padding: 18 + 16 * m, boxSizing: 'border-box'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 16 + 18 * m, color: '#6B7684'}}><span>Indicateur clé</span>{m > 0.9 && <Badge />}</div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 20 + 90 * m, color: colors.navy, lineHeight: 1.1}}>Taux de fréquence</div>
        <div style={{marginTop: 10, opacity: m}}><Spark pts={[4, 5, 4, 6, 7, 6, 9]} w={W - 70} h={110 * m} color={RED} p={prog(t, ONE + 1.0, ONE + 2.0)} sw={6} /></div>
        <Sheen at={ONE + 1.3} />
      </div>
      <Kinetic text="pas seulement rassurer la direction" at={11.7} until={14.0} y={1110} size={44} color="#8A94A1" accent="#8A94A1" />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><line x1={540} y1={1000} x2={540} y2={1000 + 220 * arrow} stroke={colors.green} strokeWidth={10} strokeLinecap="round" /></svg>
      <div style={{position: 'absolute', left: 540, top: 1300, transform: `translate(-50%, 0) scale(${btn * (1 - 0.08 * click)})`, background: colors.green, color: '#fff', borderRadius: 50, padding: '26px 54px', fontFamily: sansFont, fontWeight: 900, fontSize: 46, boxShadow: '0 16px 34px rgba(46,155,62,0.4)', display: 'flex', alignItems: 'center', gap: 16, whiteSpace: 'nowrap'}}>
        <F n="cible" size={60} /> DÉCISION
      </div>
    </AbsoluteFill>
  );
};

/** La boucle Mesurer → Analyser → Agir → Améliorer, en parallaxe 3D. */
const Loop: React.FC = () => {
  const t = useT();
  const steps: [string, number, string, string][] = [['Mesurer', 17.48, 'graphique', BLUE], ['Analyser', 18.32, 'loupe', '#8E5BD0'], ['Agir', 19.18, 'outils', ORANGE], ['Améliorer', 19.98, 'fusee', colors.green]];
  const rot = prog(t, 20.8, 24.2, (v) => v) * 360;
  const ghosts = prog(t, 22.8, 23.8, easeIn);
  return (
    <AbsoluteFill>
      <Kinetic text="La *boucle* de pilotage" at={LOOP + 0.1} y={400} size={86} />
      <div style={{position: 'absolute', left: 540 - 380, top: 600, width: 760, height: 760, transform: `perspective(1400px) rotateX(${18 - 18 * prog(t, LOOP, LOOP + 2)}deg)`}}>
        <svg width={760} height={760} style={{position: 'absolute', inset: 0, transform: `rotate(${rot}deg)`}}>
          {[0, 1, 2, 3].map((k) => {
            const a0 = (k * 90 - 80) * (Math.PI / 180);
            const a1 = (k * 90 - 10) * (Math.PI / 180);
            const p = prog(t, steps[k][1] + 0.2, steps[k][1] + 0.8, easeInOut);
            const R = 300;
            return <path key={k} d={`M${380 + Math.cos(a0) * R} ${380 + Math.sin(a0) * R} A${R} ${R} 0 0 1 ${380 + Math.cos(a1) * R} ${380 + Math.sin(a1) * R}`} fill="none" stroke={steps[k][3]} strokeWidth={16} strokeLinecap="round" pathLength={1} strokeDasharray={`${p} 1`} />;
          })}
        </svg>
        {steps.map(([l, at, ic, c], k) => {
          const a = (k * 90 - 135) * (Math.PI / 180);
          const p = prog(t, at - 0.1, at + 0.35, easeOut);
          return (
            <div key={l} style={{position: 'absolute', left: 380 + Math.cos(a) * 300 - 120, top: 380 + Math.sin(a) * 300 - 75, width: 240, height: 150, borderRadius: 30, background: '#fff', boxShadow: shadow, borderBottom: `8px solid ${c}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: p, transform: `scale(${0.6 + 0.4 * p}) translateZ(40px)`}}>
              <F n={ic} size={62} />
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: c}}>{l}</div>
            </div>
          );
        })}
        <div style={{position: 'absolute', left: 380 - 90, top: 380 - 90, width: 180, height: 180, borderRadius: 90, background: colors.navy, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: prog(t, 20.2, 20.6)}}><F n="repeter" size={110} /></div>
      </div>
      {/* tout ce qui ne nourrit pas la boucle tombe */}
      {[0, 3, 9, 14, 19, 27, 35, 41].map((i, k) => {
        const p = prog(t, 21.2 + k * 0.08, 21.6 + k * 0.08, easeOut);
        const x = k % 2 ? 900 : 40 + (k % 3) * 10;
        const y = 1430 + (k % 4) * 40;
        return <Tile key={i} i={i} x={x - (k % 2 ? 60 : 0)} y={y + ghosts * 500} o={p * (1 - ghosts) * 0.85} rot={ghosts * (k % 2 ? 30 : -30)} blur={ghosts * 8} />;
      })}
      <Kinetic text="Le reste doit *disparaître*" at={21.1} y={1540} size={56} accent={RED} />
    </AbsoluteFill>
  );
};

/** Sécurité : le TF seul trompe, croisé avec les actions de prévention il éclaire. */
const Secu: React.FC = () => {
  const t = useT();
  const cross = prog(t, 31.0, 32.0, easeInOut);
  return (
    <AbsoluteFill>
      <Kinetic text="Prenez la *sécurité*" at={SECU + 0.1} y={400} size={90} accent={BLUE} />
      <div style={{position: 'absolute', left: 140, top: 560 + cross * -20, width: 800, height: 300, borderRadius: 34, background: '#fff', boxShadow: shadow, padding: 30, boxSizing: 'border-box', transform: `perspective(1400px) rotateY(${-8 + 8 * cross}deg)`, overflow: 'hidden'}}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: '#6B7684'}}>Taux de fréquence</div><Badge /></div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 120, color: colors.navy, lineHeight: 1.1}}>14,2</div>
        <Sheen at={25.0} />
      </div>
      <div style={{position: 'absolute', left: 540, top: 900, transform: 'translateX(-50%)', opacity: prog(t, 28.6, 29.0) * (1 - cross), fontFamily: handFont, fontSize: 52, color: RED, whiteSpace: 'nowrap'}}>« fausse impression de maîtrise »</div>
      <div style={{position: 'absolute', left: 540 - 40, top: 900, opacity: cross, fontFamily: sansFont, fontWeight: 900, fontSize: 80, color: colors.green}}>×</div>
      <div style={{position: 'absolute', left: 140, top: 1020, width: 800, height: 300, borderRadius: 34, background: '#fff', boxShadow: shadow, padding: 30, boxSizing: 'border-box', opacity: prog(t, 31.4, 31.9), transform: `perspective(1400px) translateY(${(1 - prog(t, 31.4, 32.0, easeOut)) * 120}px) rotateY(${8 - 8 * cross}deg)`}}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: '#6B7684'}}>Actions de prévention réalisées</div><Badge /></div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 110, color: colors.green, lineHeight: 1.1}}>{Math.round(85 * prog(t, 32.3, 33.6, easeOut))} %</div>
        <div style={{height: 20, borderRadius: 10, background: '#E5E8EC'}}><div style={{width: `${85 * prog(t, 32.3, 33.6, easeOut)}%`, height: '100%', borderRadius: 10, background: colors.green}} /></div>
      </div>
      <div style={{position: 'absolute', left: 540, top: 1400, transform: `translateX(-50%) scale(${prog(t, 33.6, 34.0, easeOut)})`, display: 'flex', alignItems: 'center', gap: 14, background: colors.navy, color: '#fff', borderRadius: 40, padding: '14px 30px', fontFamily: sansFont, fontWeight: 800, fontSize: 34, whiteSpace: 'nowrap'}}><Check p={1} size={44} color={colors.greenLight} /> Résultat × moyens = vraie lecture</div>
    </AbsoluteFill>
  );
};

/** Qualité & environnement : les données brutes s'effacent, seules les tendances critiques restent. */
const QualEnv: React.FC = () => {
  const t = useT();
  const raw = 1 - prog(t, 39.7, 40.8);
  const nc = [3, 4, 3, 4, 3, 4, 4, 9, 12];
  const en = [5, 5, 6, 6, 7, 8, 9, 10, 11];
  const card = (k: number, title: string, pts: number[], c: string, at: number, alert: string, alertAt: number) => (
    <div key={title} style={{position: 'absolute', left: 90 + k * 460, top: 600, width: 440, height: 720, borderRadius: 34, background: '#fff', boxShadow: shadow, padding: 26, boxSizing: 'border-box', overflow: 'hidden', transform: `perspective(1400px) rotateY(${k ? -6 : 6}deg) translateY(${(1 - prog(t, at, at + 0.5, easeOut)) * 120}px)`, opacity: prog(t, at, at + 0.4)}}>
      <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: c}}>{title}</div>
      <div style={{marginTop: 4}}><Badge /></div>
      <div style={{position: 'relative', marginTop: 30, height: 380}}>
        {Array.from({length: 26}, (_, i) => <div key={i} style={{position: 'absolute', left: random(`x${title}${i}`) * 370, top: random(`y${title}${i}`) * 360, width: 12, height: 12, borderRadius: 6, background: '#B9C0C8', opacity: raw * prog(t, at + 0.3 + i * 0.03, at + 0.5 + i * 0.03)}} />)}
        <div style={{position: 'absolute', inset: 0, opacity: 1 - raw}}><Spark pts={pts} w={370} h={360} color={c} p={prog(t, 40.5, 41.7)} sw={8} /></div>
      </div>
      <div style={{marginTop: 30, display: 'flex', alignItems: 'center', gap: 10, background: `${c}18`, color: c, borderRadius: 18, padding: '10px 16px', fontFamily: sansFont, fontWeight: 900, fontSize: 28, opacity: prog(t, alertAt, alertAt + 0.3), transform: `scale(${0.8 + 0.2 * prog(t, alertAt, alertAt + 0.3, easeOut)})`}}><F n="danger" size={40} />{alert}</div>
    </div>
  );
  return (
    <AbsoluteFill>
      <Kinetic text="Qualité & *environnement*" at={QE + 0.1} y={400} size={80} accent={colors.green} />
      {card(0, 'Non-conformités', nc, ORANGE, 35.9, 'Hausse soudaine', 42.6)}
      {card(1, 'Énergie', en, colors.green, 36.6, 'Dérive de consommation', 44.2)}
      <Kinetic text="Isolez les *tendances critiques*" at={40.0} until={QE + 12} y={1440} size={54} />
    </AbsoluteFill>
  );
};

/** Réactivité : le volume d'écarts ne dit rien, la vitesse de clôture dit tout. */
const Reactivite: React.FC = () => {
  const t = useT();
  const bars: [string, string, number, number, string][] = [['Délai de traitement', '5 jours', 52.3, 0.2, ORANGE], ['Actions correctives clôturées', '95 %', 54.4, 0.95, colors.green]];
  return (
    <AbsoluteFill>
      <Kinetic text="La vraie santé du *système*" at={REACT + 0.1} y={400} size={78} />
      <div style={{position: 'absolute', left: 140, top: 580, width: 800, height: 220, borderRadius: 34, background: '#fff', boxShadow: shadow, padding: 30, boxSizing: 'border-box', opacity: prog(t, 49.0, 49.4) * (1 - 0.6 * prog(t, 51.0, 51.5))}}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: '#6B7684'}}>Volume d'écarts constatés</div><Badge /></div>
        <div style={{position: 'relative', display: 'inline-block', fontFamily: sansFont, fontWeight: 900, fontSize: 100, color: colors.navy}}>
          {Math.round(847 * prog(t, 49.2, 50.5, easeOut))}
          <div style={{position: 'absolute', left: -10, right: -10, top: '50%', height: 12, borderRadius: 6, background: RED, transform: `scaleX(${prog(t, 50.6, 51.1)}) rotate(-4deg)`, transformOrigin: 'left'}} />
        </div>
      </div>
      {bars.map(([l, v, at, fill, c], k) => {
        const p = prog(t, at - 0.3, at + 0.2, easeOut);
        const f = prog(t, at, at + 1.2, easeOut) * fill;
        return (
          <div key={l} style={{position: 'absolute', left: 140, top: 880 + k * 280, width: 800, height: 240, borderRadius: 34, background: '#fff', boxShadow: shadow, padding: 30, boxSizing: 'border-box', opacity: p, transform: `perspective(1400px) translateY(${(1 - p) * 80}px) rotateX(${(1 - p) * 20}deg)`, overflow: 'hidden'}}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: '#6B7684'}}>{l}</div><Badge /></div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 80, color: c}}>{v}</div>
            <div style={{height: 22, borderRadius: 11, background: '#E5E8EC'}}><div style={{width: `${f * 100}%`, height: '100%', borderRadius: 11, background: c}} /></div>
            <Sheen at={at + 1.0} />
          </div>
        );
      })}
      <Kinetic text="= votre *réactivité*" at={53.0} y={1500} size={64} accent={colors.green} />
    </AbsoluteFill>
  );
};

/** Raccord final : le mur revient, explose, et 5 tuiles se recomposent en liste. */
const Result: React.FC = () => {
  const t = useT();
  const boom = 62.3;
  const morph = prog(t, 62.6, 64.0, easeInOut);
  return (
    <AbsoluteFill>
      <Kinetic text="*Résultat*" at={RESULT + 0.1} until={62.2} y={400} size={110} />
      <Kinetic text="Seulement l'*essentiel*" at={62.3} until={FIVE} y={400} size={86} />
      <Kinetic text="Les *5* indicateurs vitaux" at={FIVE} y={400} size={80} />
      {t < boom + 1.4 && <Wall start={RESULT + 0.2} boom={boom} keep={VITAL} alarmAt={58.9} />}
      {VITAL.map((i, k) => {
        if (t < boom) return null;
        const from = tilePos(i);
        const to = {x: 90, y: 560 + k * 150};
        const x = from.x + (to.x - from.x) * morph;
        const y = from.y + (to.y - from.y) * morph;
        const w = TW + (900 - TW) * morph;
        const h = TH + (126 - TH) * morph;
        const [label, ic, c] = FIVE_LIST[k];
        const lab = prog(t, 64.2 + k * 0.15, 64.6 + k * 0.15, easeOut);
        return (
          <div key={i} style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: 16 + 14 * morph, background: '#fff', boxShadow: shadow, display: 'flex', alignItems: 'center', gap: 18, padding: '0 22px', boxSizing: 'border-box', borderLeft: `${12 * morph}px solid ${c}`, overflow: 'hidden'}}>
            <div style={{opacity: lab, display: 'flex', alignItems: 'center', gap: 18, flex: 1}}>
              <div style={{width: 60, height: 60, borderRadius: 30, background: c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 32, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{k + 1}</div>
              <F n={ic} size={56} />
              <div style={{flex: 1, fontFamily: sansFont, fontWeight: 800, fontSize: 34, color: colors.navy}}>{label}</div>
              <Check p={prog(t, 65.3 + k * 0.2, 65.7 + k * 0.2)} size={50} color={c} />
            </div>
            <Sheen at={64.4 + k * 0.12} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

/** Bouton final : action terrain immédiate. */
const Action: React.FC = () => {
  const t = useT();
  const p = prog(t, 67.0, 67.4, easeOut);
  const click = prog(t, 68.3, 68.42) * (1 - prog(t, 68.42, 68.6));
  const ripple = prog(t, 68.35, 69.2, easeOut);
  return (
    <AbsoluteFill>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><line x1={540} y1={1320} x2={540} y2={1320 + 110 * prog(t, 66.6, 67.1)} stroke={colors.green} strokeWidth={10} strokeLinecap="round" /></svg>
      <div style={{position: 'absolute', left: 540, top: 1460, transform: `translate(-50%, 0) scale(${p * (1 - 0.08 * click)})`, background: colors.green, color: '#fff', borderRadius: 60, padding: '28px 56px', fontFamily: sansFont, fontWeight: 900, fontSize: 44, boxShadow: '0 18px 36px rgba(46,155,62,0.45)', display: 'flex', alignItems: 'center', gap: 16, whiteSpace: 'nowrap'}}>
        <F n="casque" size={60} /> ACTION TERRAIN IMMÉDIATE
      </div>
      {ripple > 0 && ripple < 1 && <div style={{position: 'absolute', left: 540 - 300 * ripple, top: 1520 - 300 * ripple, width: 600 * ripple, height: 600 * ripple, borderRadius: '50%', border: `6px solid rgba(46,155,62,${1 - ripple})`}} />}
      <svg width={60} height={70} style={{position: 'absolute', left: 700 - (1 - prog(t, 67.4, 68.3, easeInOut)) * 200, top: 1520 + (1 - prog(t, 67.4, 68.3, easeInOut)) * 180, opacity: prog(t, 67.4, 67.6) * (1 - prog(t, 69.0, 69.3))}}><path d="M5 5 L5 55 L18 43 L28 65 L37 61 L27 39 L45 39 Z" fill="#fff" stroke={colors.navy} strokeWidth={3} /></svg>
    </AbsoluteFill>
  );
};

/** Bruitages seuls (ni musique ni ambiance) : rafales, traversées, explosions, validations. */
const CUES: Sfx[] = [
  {at: 0.05, s: 'bass-hit', v: 0.5},
  ...Array.from({length: 14}, (_, k) => ({at: 2.4 + k * 0.2, s: 'sfx/click', v: 0.26})),
  {at: 5.2, s: 'tick', v: 0.5},
  {at: SAT, s: 'sfx/whoosh', v: 0.45},
  {at: SAT + 0.4, s: 'tension', v: 0.3, dur: 4},
  {at: 6.7, s: 'alarme', v: 0.18, dur: 1.2},
  {at: 9.0, s: 'sfx/ding', v: 0.42},
  {at: ONE + 0.1, s: 'deep-hit', v: 0.6},
  {at: ONE + 0.12, s: 'sfx/whoosh', v: 0.55},
  {at: ONE + 1.3, s: 'sfx/swish', v: 0.35},
  {at: 14.5, s: 'stylo', v: 0.4, dur: 0.6},
  {at: 15.3, s: 'sfx/pop', v: 0.5},
  {at: 16.2, s: 'sfx/click', v: 0.55},
  {at: 16.3, s: 'validation', v: 0.45},
  ...[LOOP, SECU, QE, REACT, RESULT].map((at) => ({at: at - 0.3, s: 'soft-whoosh', v: 0.5})),
  ...[17.48, 18.32, 19.18, 19.98].map((at) => ({at, s: 'sfx/pop', v: 0.45})),
  {at: 20.8, s: 'riser', v: 0.28, dur: 1.4},
  {at: 22.8, s: 'sfx/swish', v: 0.45},
  {at: 25.0, s: 'sfx/swish', v: 0.3},
  {at: 28.6, s: 'notification', v: 0.35},
  {at: 31.0, s: 'deep-hit', v: 0.45},
  {at: 32.3, s: 'riser', v: 0.25, dur: 1.2},
  {at: 33.6, s: 'validation', v: 0.45},
  {at: 35.9, s: 'sfx/pop', v: 0.4},
  {at: 36.6, s: 'sfx/pop', v: 0.4},
  {at: 39.7, s: 'soft-whoosh', v: 0.4},
  {at: 40.5, s: 'stylo', v: 0.4, dur: 1.0},
  {at: 42.6, s: 'notification', v: 0.4},
  {at: 44.2, s: 'notification', v: 0.4},
  {at: 49.0, s: 'sfx/pop', v: 0.4},
  {at: 50.6, s: 'sfx/swish', v: 0.5},
  {at: 52.3, s: 'tick', v: 0.45},
  {at: 54.4, s: 'tick', v: 0.45},
  {at: 55.5, s: 'validation', v: 0.45},
  ...Array.from({length: 10}, (_, k) => ({at: RESULT + 0.2 + k * 0.27, s: 'sfx/click', v: 0.24})),
  {at: 59.0, s: 'tension', v: 0.28, dur: 2.5},
  {at: 62.3, s: 'deep-hit', v: 0.6},
  {at: 62.32, s: 'sfx/whoosh', v: 0.55},
  {at: 62.6, s: 'riser', v: 0.3, dur: 1.4},
  ...[0, 1, 2, 3, 4].map((k) => ({at: 65.3 + k * 0.2, s: 'tick', v: 0.5})),
  {at: 67.0, s: 'sfx/pop', v: 0.5},
  {at: 68.3, s: 'sfx/click', v: 0.6},
  {at: 68.35, s: 'validation', v: 0.55},
  {at: OUTRO_AT - 0.4, s: 'soft-whoosh', v: 0.5},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const TableauBord: React.FC = () => (
  <AbsoluteFill>
    <Backdrop />
    <Gate from={0} to={SAT}><Intro /></Gate>
    <Gate from={SAT} to={ONE + 1.4}><Saturation /></Gate>
    <Gate from={ONE} to={LOOP}><OneKpi /></Gate>
    <Shot from={LOOP} to={SECU}><Loop /></Shot>
    <Shot from={SECU} to={QE}><Secu /></Shot>
    <Shot from={QE} to={REACT}><QualEnv /></Shot>
    <Shot from={REACT} to={RESULT}><Reactivite /></Shot>
    <Gate from={RESULT} to={OUTRO_AT}><Result /><Action /></Gate>
    <Gate from={OUTRO_AT} to={999}><Outro at={OUTRO_AT} logo={LOGO} /></Gate>
    <Gate from={0} to={OUTRO_AT}><Captions captions={captions} /></Gate>
    <Audio src={staticFile('voix-off-tableau-bord.m4a')} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);
