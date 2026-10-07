import {AbsoluteFill, Audio, Img, staticFile} from 'remotion';
import {easeInOut, easeOut, Gate, Kinetic, prog, useT} from '../anim';
import {Captions} from '../components/Captions';
import {Wipe} from '../components/Fx';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {colors, handFont, s, sansFont} from '../theme';
import {captions} from '../ident/captions';

/**
 * « Identifier ou évaluer ? » au format UI motion premium (skill video-promo-diagnostic-qhse) :
 * fond clair épuré, cartes d'interface en léger 3D, une information par plan, titre mot à mot en haut,
 * chaîne de 5 éléments, jauge de score, cartes cochées, final sur fond marine.
 */
const LOGO = 'promo/logo.png';
const DEF = 5.64;
const EX = 11.88;
const LIST = 16.4;
const EVAL = 26.72;
const SCORE = 35.44;
const RECAP = 43.8;
const FINAL = 52.58;
const OUTRO_AT = 55.4;
export const IDENTUI_FRAMES = s(58.8);
const ORANGE = '#E8892B';
const RED = '#D9443A';

const shadow = '0 30px 60px rgba(14,30,60,0.16), 0 6px 14px rgba(14,30,60,0.08)';
const Card: React.FC<{at: number; until?: number; x: number; y: number; w: number; h?: number; tilt?: number; children: React.ReactNode; style?: React.CSSProperties}> = ({at, until = Infinity, x, y, w, h, tilt = 0, children, style}) => {
  const t = useT();
  const p = prog(t, at, at + 0.55, easeOut);
  const q = until === Infinity ? 0 : prog(t, until - 0.3, until, easeInOut);
  if (p <= 0 || q >= 1) return null;
  return (
    <div style={{position: 'absolute', left: x - w / 2, top: y, width: w, height: h, borderRadius: 34, background: '#fff', boxShadow: shadow, opacity: p * (1 - q),
      transform: `perspective(1400px) translateY(${(1 - p) * 70 - q * 40}px) rotateY(${tilt * (0.6 + 0.4 * p)}deg) rotateX(${(1 - p) * 12}deg) scale(${0.94 + 0.06 * p})`, overflow: 'hidden', ...style}}>
      {children}
    </div>
  );
};

/** Barre de fenêtre d'application (3 pastilles + URL neutre). */
const Chrome: React.FC<{title: string}> = ({title}) => (
  <div style={{height: 64, background: '#F3F4F6', display: 'flex', alignItems: 'center', gap: 10, padding: '0 22px', borderBottom: '1px solid #E5E7EB'}}>
    {['#F16A5E', '#F5BE4F', '#61C554'].map((c) => <div key={c} style={{width: 16, height: 16, borderRadius: 8, background: c}} />)}
    <div style={{flex: 1, marginLeft: 16, height: 36, borderRadius: 18, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 700, fontSize: 22, color: '#6B7684'}}>{title}</div>
  </div>
);

const Check: React.FC<{p: number; size?: number; color?: string}> = ({p, size = 52, color = colors.green}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{flexShrink: 0}}>
    <circle cx={12} cy={12} r={11} fill="none" stroke={p > 0.99 ? color : '#D5D9DE'} strokeWidth={1.6} />
    <path d="M6.5 12.5 L10.5 16.2 L17.5 8.2" fill="none" stroke={color} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={`${p} 1`} />
  </svg>
);

const Pill: React.FC<{text: string; at: number; x: number; y: number; dark?: boolean; icon?: string}> = ({text, at, x, y, dark, icon}) => {
  const t = useT();
  const p = prog(t, at, at + 0.35, easeOut);
  if (p <= 0) return null;
  return (
    <div style={{position: 'absolute', left: x, top: y, transform: `translate(-50%, -50%) scale(${0.7 + 0.3 * p})`, opacity: p, display: 'flex', alignItems: 'center', gap: 10, background: dark ? colors.navy : '#fff', color: dark ? '#fff' : colors.navy, borderRadius: 40, padding: '12px 26px', fontFamily: sansFont, fontWeight: 800, fontSize: 30, boxShadow: '0 10px 24px rgba(14,30,60,0.14)', whiteSpace: 'nowrap'}}>
      {icon && <F n={icon} size={40} />}{text}
    </div>
  );
};

/* ── 1. Accroche : deux cartes face à face ── */
const Hook: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Kinetic text="*Identifier* ou évaluer ?" at={0.6} until={3.4} y={400} size={92} />
      <Kinetic text="Quelle est la *différence* ?" at={3.5} y={400} size={86} accent={RED} />
      {[['loupe', 'Identification', 'des risques', colors.green, 0.72, -12, 300], ['balance', 'Évaluation', 'des risques', ORANGE, 2.02, 12, 780]].map(([ic, l, sub, c, at, tilt, x]) => (
        <Card key={l as string} at={at as number} x={x as number} y={640} w={420} h={560} tilt={tilt as number}>
          <div style={{height: 300, background: `linear-gradient(160deg, ${c}22, ${c}55)`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={ic as string} size={220} float={5} /></div>
          <div style={{padding: '30px 30px'}}>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: c as string}}>{l}</div>
            <div style={{fontFamily: sansFont, fontWeight: 600, fontSize: 32, color: '#6B7684'}}>{sub}</div>
            <div style={{marginTop: 22, height: 14, borderRadius: 7, background: '#EEF0F3', width: '80%'}} />
            <div style={{marginTop: 12, height: 14, borderRadius: 7, background: '#EEF0F3', width: '55%'}} />
          </div>
        </Card>
      ))}
      <div style={{position: 'absolute', left: 540 - 60, top: 860, width: 120, height: 120, borderRadius: 60, background: RED, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 90, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 16px 30px rgba(217,68,58,0.35)', transform: `scale(${prog(t, 3.9, 4.25, easeOut) * (1 + 0.05 * Math.sin(t * 8))})`}}>≠</div>
    </AbsoluteFill>
  );
};

/* ── 2. Identifier = repérer : fenêtre d'application qui se remplit ── */
const Definition: React.FC = () => {
  const t = useT();
  const rows: [string, number, string][] = [['Repérer les dangers', 7.56, 'loupe2'], ['Et les situations à risque', 8.76, 'danger'], ['Susceptibles de causer un dommage', 9.84, 'pansement']];
  return (
    <AbsoluteFill>
      <Kinetic text="*Identifier*, c'est repérer" at={DEF + 0.1} y={400} size={86} />
      <Card at={DEF + 0.3} x={540} y={560} w={920} h={900} tilt={-6}>
        <Chrome title="Identification des risques" />
        <div style={{height: 300, backgroundImage: `url(${staticFile('ident/entrepot.jpg')})`, backgroundSize: 'cover', backgroundPosition: '50% 45%'}} />
        <div style={{padding: '26px 34px', display: 'flex', flexDirection: 'column', gap: 18}}>
          {rows.map(([l, at, ic], k) => {
            const p = prog(t, at - 0.1, at + 0.3, easeOut);
            return (
              <div key={l} style={{display: 'flex', alignItems: 'center', gap: 18, padding: '18px 22px', borderRadius: 22, background: '#F7F9FB', opacity: 0.2 + 0.8 * p, transform: `translateX(${(1 - p) * 40}px)`}}>
                <div style={{width: 46, height: 46, borderRadius: 23, background: colors.green, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{k + 1}</div>
                <F n={ic} size={52} />
                <div style={{flex: 1, fontFamily: sansFont, fontWeight: 800, fontSize: 32, color: colors.navy}}>{l}</div>
                <Check p={prog(t, at + 0.3, at + 0.7)} size={44} />
              </div>
            );
          })}
        </div>
      </Card>
    </AbsoluteFill>
  );
};

/* ── 3. L'exemple : écran d'inspection puis chaîne des 5 dangers ── */
const HAZ: [string, string, number][] = [
  ["Chute d'objets", 'ident/chute-objets.png', 16.5],
  ['Risque électrique', 'ident/electrique.jpg', 18.2],
  ['Glissade', 'ident/glissade.jpg', 19.9],
  ['Machine', 'ident/machines.png', 21.58],
  ["Absence d'EPI", 'ident/epi.jpg', 23.66],
];
const Example: React.FC = () => {
  const t = useT();
  const found = HAZ.filter(([, , at]) => t >= at).length;
  return (
    <AbsoluteFill>
      <Kinetic text="Par *exemple*" at={EX + 0.1} until={LIST} y={400} size={90} />
      {/* téléphone d'inspection */}
      <Card at={EX + 0.3} until={LIST + 0.2} x={540} y={540} w={560} h={1000} tilt={8} style={{borderRadius: 70, border: '14px solid #12161C', background: '#12161C'}}>
        <div style={{height: '100%', borderRadius: 56, overflow: 'hidden', background: '#fff', position: 'relative'}}>
          <div style={{height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: colors.navy}}>Visite terrain</div>
          <div style={{height: 600, backgroundImage: `url(${staticFile('ident/flaque.jpg')})`, backgroundSize: 'cover', backgroundPosition: '50% 40%'}} />
          <div style={{padding: 26, fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: colors.navy, display: 'flex', alignItems: 'center', gap: 12}}>
            <F n="danger" size={50} /> {t > 14.76 ? 'Plusieurs dangers' : 'Analyse…'}
          </div>
        </div>
      </Card>
      {/* chaîne des 5 dangers */}
      <Gate from={LIST} to={EVAL}>
        <Kinetic text="*5* dangers identifiés" at={LIST + 0.05} y={400} size={84} />
        <div style={{position: 'absolute', right: 70, top: 300, fontFamily: sansFont, fontWeight: 900, fontSize: 150, color: colors.green, lineHeight: 1}}>{found}</div>
        {HAZ.map(([l, img, at], k) => {
          const p = prog(t, at - 0.15, at + 0.35, easeOut);
          const y = 560 + k * 205;
          return (
            <div key={l}>
              {k > 0 && <svg width={60} height={60} style={{position: 'absolute', left: 510, top: y - 52, opacity: p}}><ellipse cx={30} cy={30} rx={12} ry={24} fill="none" stroke="#B9C0C8" strokeWidth={6} /></svg>}
              <div style={{position: 'absolute', left: 120, top: y, width: 840, height: 160, borderRadius: 80, background: '#fff', boxShadow: '0 14px 30px rgba(14,30,60,0.12)', display: 'flex', alignItems: 'center', gap: 22, padding: '0 34px 0 18px', opacity: p, transform: `translateX(${(1 - p) * 120}px) scale(${0.9 + 0.1 * p})`}}>
                <div style={{width: 124, height: 124, borderRadius: 62, background: '#F7F9FB', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}><Img src={staticFile(img)} style={{width: 104, height: 104, objectFit: 'contain'}} /></div>
                <div style={{width: 50, height: 50, borderRadius: 25, background: colors.navy, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 26, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{k + 1}</div>
                <div style={{flex: 1, fontFamily: sansFont, fontWeight: 800, fontSize: 40, color: colors.navy}}>{l}</div>
                <Check p={prog(t, at + 0.35, at + 0.75)} />
              </div>
            </div>
          );
        })}
      </Gate>
    </AbsoluteFill>
  );
};

/* ── 4. Évaluer : tableau de niveaux puis classement ── */
const LEVELS = [12, 8, 9, 16, 6]; // cotation d'exemple (P × G sur 16)
const Evaluation: React.FC = () => {
  const t = useT();
  const sort = prog(t, 33.3, 34.3, easeInOut);
  const order = [...LEVELS.keys()].sort((a, b) => LEVELS[b] - LEVELS[a]);
  return (
    <AbsoluteFill>
      <Kinetic text="*Évaluer*, c'est hiérarchiser" at={EVAL + 0.1} y={400} size={84} accent={ORANGE} />
      <Card at={EVAL + 0.3} x={540} y={560} w={920} h={920} tilt={6}>
        <Chrome title="Évaluation des risques" />
        <div style={{display: 'flex', justifyContent: 'space-between', padding: '22px 34px 6px', fontFamily: sansFont, fontWeight: 800, fontSize: 24, color: '#9AA5B3', letterSpacing: 2}}>
          <span>DANGER</span><span>NIVEAU</span>
        </div>
        {HAZ.map(([l], k) => {
          const rank = order.indexOf(k);
          const y = 120 + (k + (rank - k) * sort) * 150;
          const fill = prog(t, 29.8 + k * 0.25, 30.8 + k * 0.25, easeOut) * LEVELS[k] / 16;
          const c = LEVELS[k] >= 12 ? RED : LEVELS[k] >= 8 ? ORANGE : colors.green;
          const top = rank === 0 && sort > 0.9;
          return (
            <div key={l} style={{position: 'absolute', left: 30, right: 30, top: y, height: 130, borderRadius: 24, background: top ? '#FFF1EF' : '#F7F9FB', border: top ? `3px solid ${RED}` : '3px solid transparent', padding: '18px 24px', boxSizing: 'border-box'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: sansFont, fontWeight: 800, fontSize: 32, color: colors.navy}}>
                <span>{sort > 0.5 ? `${rank + 1}. ` : ''}{l}</span><span style={{color: c}}>{Math.round(fill * 16)}/16</span>
              </div>
              <div style={{marginTop: 16, height: 18, borderRadius: 9, background: '#E5E8EC'}}><div style={{width: `${fill * 100}%`, height: '100%', borderRadius: 9, background: c}} /></div>
            </div>
          );
        })}
      </Card>
      <Pill text="Priorité de traitement" at={33.4} x={540} y={1530} dark icon="cible" />
    </AbsoluteFill>
  );
};

/* ── 5. Probabilité × Gravité : jauges ── */
const Gauge: React.FC<{x: number; y: number; r: number; at: number; value: number; max: number; color: string; label: string; big?: boolean}> = ({x, y, r, at, value, max, color, label, big}) => {
  const t = useT();
  const p = prog(t, at, at + 1.1, easeInOut);
  const v = value * p;
  const C = 2 * Math.PI * r;
  const o = prog(t, at - 0.3, at);
  return (
    <div style={{position: 'absolute', left: x - r - 20, top: y - r - 20, width: 2 * r + 40, opacity: o, textAlign: 'center'}}>
      <svg width={2 * r + 40} height={2 * r + 40}>
        <circle cx={r + 20} cy={r + 20} r={r} fill="none" stroke="#E8EBEF" strokeWidth={big ? 26 : 18} />
        <circle cx={r + 20} cy={r + 20} r={r} fill="none" stroke={color} strokeWidth={big ? 26 : 18} strokeLinecap="round" strokeDasharray={`${(C * v) / max} ${C}`} transform={`rotate(-90 ${r + 20} ${r + 20})`} />
        <text x={r + 20} y={r + 20 + (big ? 30 : 18)} textAnchor="middle" fontFamily="Montserrat" fontWeight={900} fontSize={big ? 110 : 64} fill={colors.navy}>{Math.round(v)}<tspan fontSize={big ? 40 : 28} fill="#9AA5B3">/{max}</tspan></text>
      </svg>
      <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: big ? 38 : 32, color, marginTop: -6}}>{label}</div>
    </div>
  );
};
const Score: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Kinetic text="Pour chaque *risque*" at={SCORE + 0.1} y={400} size={86} accent={ORANGE} />
      <Card at={SCORE + 0.3} x={540} y={540} w={920} h={980}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '28px 34px 0'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: colors.navy}}><F n="engrenage" size={48} />Machine</div>
          <div style={{border: '2px solid #CBD2DA', borderRadius: 10, padding: '4px 12px', fontFamily: sansFont, fontWeight: 800, fontSize: 20, color: '#9AA5B3', letterSpacing: 2}}>EXEMPLE</div>
        </div>
      </Card>
      <Gauge x={330} y={830} r={130} at={38.06} value={4} max={4} color="#3D7DD8" label="Probabilité" />
      <Gauge x={750} y={830} r={130} at={41.16} value={4} max={4} color={RED} label="Gravité" />
      <div style={{position: 'absolute', left: 540 - 40, top: 790, fontFamily: sansFont, fontWeight: 900, fontSize: 80, color: colors.navy, opacity: prog(t, 41.0, 41.3)}}>×</div>
      <Gauge x={540} y={1230} r={170} at={42.4} value={16} max={16} color={RED} label="Criticité : prioritaire" big />
    </AbsoluteFill>
  );
};

/* ── 6. Résumé : cartes cochées ── */
const Recap: React.FC = () => {
  const t = useT();
  const cards: [string, string, string, number, string][] = [
    ['1', 'Identifier', 'Trouver les dangers et les risques', 45.2, colors.green],
    ['2', 'Évaluer', 'Déterminer leur niveau', 48.06, ORANGE],
    ['3', 'Hiérarchiser', 'Traiter les priorités', 51.04, colors.navy],
  ];
  return (
    <AbsoluteFill>
      <Kinetic text="En *résumé*" at={RECAP + 0.1} y={400} size={96} />
      {cards.map(([n, l, sub, at, c], k) => {
        const p = prog(t, at - 0.3, at + 0.25, easeOut);
        return (
          <div key={l} style={{position: 'absolute', left: 90, width: 900, top: 560 + k * 300, height: 250, borderRadius: 34, background: '#fff', boxShadow: shadow, display: 'flex', alignItems: 'center', gap: 30, padding: '0 40px', opacity: p, transform: `perspective(1200px) translateY(${(1 - p) * 60}px) rotateX(${(1 - p) * 14}deg)`}}>
            <div style={{width: 150, height: 150, borderRadius: 30, background: `${c}18`, color: c, fontFamily: sansFont, fontWeight: 900, fontSize: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'}}>
              {n}
              <div style={{position: 'absolute', right: -14, top: -16, fontSize: 40, color: c, opacity: prog(t, at, at + 0.3) * (1 - prog(t, at + 0.6, at + 1.0)), transform: `scale(${1 + prog(t, at, at + 0.6)})`}}>✦</div>
            </div>
            <div style={{flex: 1}}>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 54, color: colors.navy}}>{l}</div>
              <div style={{fontFamily: sansFont, fontWeight: 600, fontSize: 32, color: '#6B7684'}}>{sub}</div>
            </div>
            <Check p={prog(t, at + 0.3, at + 0.75)} size={70} color={c} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

/* ── 7. Final sur fond marine : la règle, tapée ── */
const RULE = "On identifie d'abord, puis on évalue.";
const Final: React.FC = () => {
  const t = useT();
  const bg = prog(t, FINAL - 0.1, FINAL + 0.4);
  const typed = Math.floor(Math.max(0, t - 52.9) * 18);
  const done = typed >= RULE.length;
  const click = prog(t, 53.6, 53.75) * (1 - prog(t, 53.75, 53.95));
  return (
    <AbsoluteFill style={{background: `rgba(14,42,92,${bg})`}}>
      <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 35%, rgba(46,155,62,0.28), transparent 60%)', opacity: bg}} />
      <div style={{position: 'absolute', left: 80, right: 80, top: 520, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 92, color: '#fff', lineHeight: 1.1, opacity: prog(t, FINAL, FINAL + 0.4)}}>
        Identifier <span style={{color: colors.greenLight}}>≠</span><br />Évaluer
      </div>
      <div style={{position: 'absolute', left: 540, top: 880, transform: `translate(-50%, 0) scale(${1 - 0.08 * click})`, opacity: prog(t, FINAL + 0.3, FINAL + 0.6), background: '#fff', color: colors.navy, borderRadius: 50, padding: '22px 44px', fontFamily: sansFont, fontWeight: 800, fontSize: 40, whiteSpace: 'nowrap', boxShadow: '0 16px 30px rgba(0,0,0,0.3)'}}>
        La règle d'or →
      </div>
      <svg width={60} height={70} style={{position: 'absolute', left: 640 - (1 - prog(t, FINAL + 0.4, 53.5, easeInOut)) * 160, top: 930 + (1 - prog(t, FINAL + 0.4, 53.5, easeInOut)) * 160, opacity: prog(t, FINAL + 0.4, FINAL + 0.6) * (1 - prog(t, 54.2, 54.5))}}><path d="M5 5 L5 55 L18 43 L28 65 L37 61 L27 39 L45 39 Z" fill="#fff" stroke={colors.navy} strokeWidth={3} /></svg>
      <div style={{position: 'absolute', left: 80, right: 80, top: 1060, height: 110, borderRadius: 55, background: '#fff', display: 'flex', alignItems: 'center', gap: 18, padding: '0 34px', opacity: prog(t, 52.8, 53.0), transform: `scale(${0.9 + 0.1 * prog(t, 52.8, 53.1, easeOut)})`}}>
        <F n="memo" size={50} />
        <div style={{flex: 1, fontFamily: sansFont, fontWeight: 700, fontSize: 38, color: colors.navy, whiteSpace: 'nowrap', overflow: 'hidden'}}>{RULE.slice(0, typed)}<span style={{opacity: Math.floor(t * 3) % 2 && !done ? 1 : 0}}>|</span></div>
        {done && <div style={{width: 60, height: 60, borderRadius: 30, background: colors.green, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${prog(t, 52.9 + RULE.length / 18, 53.2 + RULE.length / 18, easeOut)})`}}><svg width={34} height={34} viewBox="0 0 24 24"><path d="M4 12.5 L10 18 L20 6" stroke="#fff" strokeWidth={3.6} fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg></div>}
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1230, textAlign: 'center', fontFamily: handFont, fontSize: 46, color: colors.greenLight, opacity: prog(t, 54.6, 55.0)}}>UNIVERSNORMES · Qualité · Sécurité · Environnement</div>
    </AbsoluteFill>
  );
};

/* ── Fond et logo discret ── */
const Backdrop: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #FBFAF6 0%, #F1EDE3 100%)'}}>
      <AbsoluteFill style={{backgroundImage: 'radial-gradient(rgba(14,42,92,0.08) 2px, transparent 2px)', backgroundSize: '44px 44px', opacity: 0.6}} />
      <div style={{position: 'absolute', left: 540 - 380, top: 260 + Math.sin(t * 0.6) * 30, width: 760, height: 760, borderRadius: '50%', background: 'radial-gradient(circle, rgba(46,155,62,0.10), transparent 70%)'}} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 110, display: 'flex', justifyContent: 'center'}}><Img src={staticFile(LOGO)} style={{height: 110}} /></div>
    </AbsoluteFill>
  );
};

/** Bruitages seuls (ni musique ni ambiance), discrets et précis. */
const CUES: Sfx[] = [
  {at: 0.05, s: 'bass-hit', v: 0.45},
  {at: 0.72, s: 'soft-whoosh', v: 0.45},
  {at: 2.02, s: 'soft-whoosh', v: 0.45},
  {at: 3.9, s: 'deep-hit', v: 0.5},
  ...[DEF, EX, LIST, EVAL, SCORE, RECAP].map((at) => ({at: at - 0.25, s: 'soft-whoosh', v: 0.45})),
  ...[7.56, 8.76, 9.84].flatMap((at) => [{at, s: 'sfx/pop', v: 0.42}, {at: at + 0.6, s: 'tick', v: 0.45}]),
  {at: 14.76, s: 'notification', v: 0.4},
  ...HAZ.flatMap(([, , at]) => [{at: at - 0.1, s: 'sfx/pop', v: 0.48}, {at: at + 0.65, s: 'tick', v: 0.5}]),
  ...LEVELS.map((_, k) => ({at: 29.8 + k * 0.25, s: 'sfx/click', v: 0.32})),
  {at: 33.3, s: 'sfx/swish', v: 0.45},
  {at: 33.4, s: 'sfx/pop', v: 0.45},
  {at: 38.06, s: 'riser', v: 0.3, dur: 1.0},
  {at: 41.16, s: 'riser', v: 0.3, dur: 1.0},
  {at: 43.4, s: 'deep-hit', v: 0.5},
  ...[45.2, 48.06, 51.04].flatMap((at) => [{at: at - 0.3, s: 'sfx/whoosh', v: 0.4}, {at: at + 0.6, s: 'validation', v: 0.42}]),
  {at: FINAL - 0.1, s: 'bass-hit', v: 0.5},
  {at: 53.6, s: 'sfx/click', v: 0.5},
  ...Array.from({length: Math.ceil(RULE.length / 3)}, (_, k) => ({at: 52.9 + (k * 3) / 18, s: 'sfx/click', v: 0.22})),
  {at: 52.9 + RULE.length / 18, s: 'validation', v: 0.5},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const IdentUi: React.FC = () => (
  <AbsoluteFill>
    <Backdrop />
    <Gate from={0} to={DEF}><Hook /></Gate>
    <Gate from={DEF} to={EX}><Definition /></Gate>
    <Gate from={EX} to={EVAL}><Example /></Gate>
    <Gate from={EVAL} to={SCORE}><Evaluation /></Gate>
    <Gate from={SCORE} to={RECAP}><Score /></Gate>
    <Gate from={RECAP} to={FINAL}><Recap /></Gate>
    <Gate from={FINAL - 0.1} to={OUTRO_AT}><Final /></Gate>
    <Gate from={OUTRO_AT} to={999}><Outro at={OUTRO_AT} logo={LOGO} /></Gate>
    <Wipe at={OUTRO_AT} />
    <Gate from={0} to={FINAL - 0.1}><Captions captions={captions} /></Gate>
    <Audio src={staticFile('voix-off-identification.m4a')} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);
