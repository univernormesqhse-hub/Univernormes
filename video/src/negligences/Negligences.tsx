import React from 'react';
import {AbsoluteFill, Audio, Img, interpolate, staticFile} from 'remotion';
import {easeIn, easeInOut, easeOut, prog, useT} from '../anim';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {s, sansFont} from '../theme';

/**
 * « Les pires négligences en milieu industriel » au format décryptage (skill capsule-decryptage-chiffres).
 * La vidéo d'origine n'avançait aucun chiffre : le décryptage s'appuie uniquement sur des calculs de physique
 * vérifiables (chute libre, moment de charge, vitesse périphérique, g = 9,81 m/s²) présentés comme exemples, et sur
 * la hiérarchie des mesures de l'ISO 45001 (§8.1.2). Voix « Isac » (ElevenLabs), personnages générés par IA.
 */
const CREAM = '#FAF2E5';
const DARK = '#082B66';
const GREEN = '#22B573';
const ORANGE = '#F47D00';
const RED = '#D0312D';
const INK = '#11241B';
const MUTED = '#6B6458';
const END = 160.4;
export const NEGLIGENCES_FRAMES = s(END);

const rise = (t: number, at: number, d = 0.45) => prog(t, at, at + d, easeOut);
const fr = (v: number, dec = 0) => v.toLocaleString('fr-FR', {minimumFractionDigits: dec, maximumFractionDigits: dec});

/* ---------- Briques ---------- */
const Scene: React.FC<{a: number; b: number; bg: string; children: React.ReactNode}> = ({a, b, bg, children}) => {
  const t = useT();
  if (t < a || t >= b) return null;
  return <AbsoluteFill style={{background: bg}}>{children}</AbsoluteFill>;
};

/** Balayage diagonal en 3 bandes (marine / blanc / vert). */
const Wipe: React.FC<{at: number}> = ({at}) => {
  const t = useT();
  const p = prog(t, at - 0.35, at + 0.35, easeInOut);
  if (p <= 0 || p >= 1) return null;
  const x = interpolate(p, [0, 1], [-2600, 1500]);
  return (
    <AbsoluteFill style={{overflow: 'hidden', pointerEvents: 'none'}}>
      {[DARK, '#FFFFFF', GREEN].map((c, i) => (
        <div key={i} style={{position: 'absolute', top: -400, left: x + i * 260, width: 300, height: 2800, background: c, transform: 'rotate(18deg)'}} />
      ))}
    </AbsoluteFill>
  );
};

const Kicker: React.FC<{at: number; text: string; dark?: boolean}> = ({at, text, dark}) => {
  const t = useT();
  const p = rise(t, at);
  return (
    <div style={{position: 'absolute', left: 76, top: 150, opacity: p}}>
      <div style={{display: 'flex', gap: 8, marginBottom: 18}}>
        {[dark ? '#5B7BB8' : DARK, dark ? '#FFFFFF' : '#D9CFBE', GREEN].map((c, i) => (
          <div key={i} style={{width: 34 * p, height: 6, borderRadius: 3, background: c}} />
        ))}
      </div>
      <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 28, letterSpacing: 6, color: dark ? 'rgba(255,255,255,0.75)' : MUTED}}>{text}</div>
    </div>
  );
};

const Title: React.FC<{at: number; lines: string[]; dark?: boolean; size?: number; top?: number}> = ({at, lines, dark, size = 84, top = 238}) => {
  const t = useT();
  return (
    <div style={{position: 'absolute', left: 76, right: 60, top}}>
      {lines.map((l, i) => {
        const p = rise(t, at + 0.1 + i * 0.12, 0.5);
        return (
          <div key={i} style={{overflow: 'hidden'}}>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: size, lineHeight: 1.08, color: dark ? '#fff' : INK, transform: `translateY(${(1 - p) * 100}%)`}}>{l}</div>
          </div>
        );
      })}
    </div>
  );
};

/** Gros chiffre qui compte jusqu'à sa valeur. */
const BigNumber: React.FC<{at: number; value: number; dec?: number; unit: string; color?: string; size?: number; x?: number; y: number; from?: number}> = ({at, value, dec = 0, unit, color = ORANGE, size = 260, x = 76, y, from = 0}) => {
  const t = useT();
  if (t < at) return null;
  const p = prog(t, at, at + 0.9, easeOut);
  const v = from + (value - from) * p;
  return (
    <div style={{position: 'absolute', left: x, top: y, display: 'flex', alignItems: 'baseline', opacity: rise(t, at, 0.2), filter: p < 1 ? `blur(${(1 - p) * 3}px)` : undefined}}>
      <span style={{fontFamily: sansFont, fontWeight: 900, fontSize: size, color, letterSpacing: -6, lineHeight: 1}}>{fr(v, dec)}</span>
      <span style={{fontFamily: sansFont, fontWeight: 900, fontSize: size * 0.32, color, marginLeft: 14}}>{unit}</span>
    </div>
  );
};

const enter = (t: number, at: number) => ({opacity: rise(t, at), transform: `translateY(${(1 - rise(t, at)) * 24}px)`});

const Card: React.FC<{at: number; x?: number; y: number; w?: number; children: React.ReactNode; style?: React.CSSProperties}> = ({at, x = 76, y, w = 928, children, style}) => {
  const t = useT();
  if (t < at) return null;
  return <div style={{position: 'absolute', left: x, top: y, width: w, background: '#fff', borderRadius: 18, boxShadow: '0 18px 44px rgba(17,36,27,0.12)', boxSizing: 'border-box', ...enter(t, at), ...style}}>{children}</div>;
};

/** Ligne : pastille / chiffre à gauche, titre capitales + complément. */
const Row: React.FC<{at: number; y: number; lead: React.ReactNode; title: string; sub?: string; dark?: boolean}> = ({at, y, lead, title, sub}) => (
  <Card at={at} y={y} style={{display: 'flex', alignItems: 'center', gap: 30, padding: '30px 36px'}}>
    <div style={{minWidth: 110, display: 'flex', justifyContent: 'center'}}>{lead}</div>
    <div>
      <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK, lineHeight: 1.1}}>{title}</div>
      {sub && <div style={{fontFamily: sansFont, fontWeight: 600, fontSize: 34, color: MUTED, marginTop: 6}}>{sub}</div>}
    </div>
  </Card>
);

const Badge: React.FC<{ok?: boolean}> = ({ok}) => (
  <div style={{width: 76, height: 76, borderRadius: '50%', background: ok ? GREEN : RED, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 46, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{ok ? '✓' : '✕'}</div>
);

const Alert: React.FC<{at: number; y: number; text: string; ok?: boolean; strike?: boolean}> = ({at, y, text, ok, strike}) => {
  const t = useT();
  const st = prog(t, at + 0.5, at + 0.9, easeInOut);
  return (
    <Card at={at} y={y} style={{display: 'flex', alignItems: 'center', gap: 28, padding: '28px 34px'}}>
      <Badge ok={ok} />
      <div style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK, lineHeight: 1.15}}>
        {text}
        {strike && <div style={{position: 'absolute', left: 0, top: '52%', height: 6, width: `${st * 100}%`, background: RED, borderRadius: 3}} />}
      </div>
    </Card>
  );
};

const Pill: React.FC<{at: number; y: number; text: string; bg?: string; color?: string; size?: number}> = ({at, y, text, bg = INK, color = '#fff', size = 34}) => {
  const t = useT();
  if (t < at) return null;
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: y, display: 'flex', justifyContent: 'center', ...enter(t, at)}}>
      <div style={{background: bg, color, fontFamily: sansFont, fontWeight: 900, fontSize: size, padding: '18px 36px', borderRadius: 999, letterSpacing: 1, textAlign: 'center', maxWidth: 940}}>{text}</div>
    </div>
  );
};

const Stamp: React.FC<{at: number; x: number; y: number; text: string}> = ({at, x, y, text}) => {
  const t = useT();
  if (t < at) return null;
  const k = interpolate(t, [at, at + 0.14, at + 0.24], [2.2, 0.94, 1], {extrapolateRight: 'clamp'});
  return <div style={{position: 'absolute', left: x, top: y, transform: `translate(-50%, -50%) rotate(-8deg) scale(${k})`, border: `7px solid ${RED}`, borderRadius: 14, padding: '10px 28px', fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: RED, letterSpacing: 2, background: CREAM}}>{text}</div>;
};

/** Personnage découpé dans l'illustration duo (left = homme, right = femme). */
const Person: React.FC<{side: 'left' | 'right'; at: number; x: number; y: number; h: number; wave?: boolean; framed?: boolean}> = ({side, at, x, y, h, wave, framed}) => {
  const t = useT();
  if (t < at) return null;
  const w = h * 0.73;
  const bob = wave ? Math.sin(t * 5) * 4 : 0;
  return (
    <div style={{position: 'absolute', left: x, top: y + bob, width: w, height: h, overflow: 'hidden', borderRadius: framed ? 32 : 0, background: framed ? CREAM : undefined, boxShadow: framed ? '0 20px 50px rgba(0,0,0,0.25)' : undefined, ...enter(t, at)}}>
      <Img src={staticFile('negligences/duo.webp')} style={{position: 'absolute', height: h * 1.02, top: 0, left: side === 'left' ? -h * 0.03 : -h * 0.785}} />
    </div>
  );
};

const ChapterCard: React.FC<{at: number; n: string; kicker: string; lines: string[]; icon: React.ReactNode}> = ({at, n, kicker, lines, icon}) => {
  const t = useT();
  return (
    <>
      <div style={{position: 'absolute', left: 76, top: 300, fontFamily: sansFont, fontWeight: 900, fontSize: 260, color: 'transparent', WebkitTextStroke: `5px ${ORANGE}`, lineHeight: 1, ...enter(t, at)}}>{n}</div>
      <div style={{position: 'absolute', left: 0, top: 450}}>
        <Kicker at={at + 0.2} text={kicker} dark />
      </div>
      <Title at={at + 0.3} lines={lines} dark size={88} top={760} />
      <div style={{position: 'absolute', left: 540, top: 1360, transform: `translate(-50%, -50%) scale(${rise(t, at + 0.6, 0.5)})`}}>
        {typeof icon === 'string' ? <F n={icon} size={300} float={6} /> : icon}
      </div>
    </>
  );
};

/** Chariot élévateur dessiné (les icônes Fluent n'en ont pas). */
const Forklift: React.FC<{size: number; load?: boolean}> = ({size, load = true}) => (
  <svg width={size} height={size * 0.8} viewBox="0 0 250 200" style={{display: 'block', filter: 'drop-shadow(0 12px 16px rgba(0,0,0,0.25))'}}>
    <rect x={150} y={10} width={10} height={160} fill="#3A3F45" />
    <rect x={164} y={10} width={6} height={160} fill="#55606B" />
    <rect x={150} y={165} width={95} height={9} rx={3} fill="#3A3F45" />
    {load && <rect x={172} y={105} width={68} height={58} rx={4} fill="#C98B4B" stroke="#8C5A2B" strokeWidth={4} />}
    {load && <line x1={172} y1={134} x2={240} y2={134} stroke="#8C5A2B" strokeWidth={4} />}
    <path d="M20 95 L95 95 L110 55 L145 55 L145 160 L20 160 Z" fill="#F2B705" stroke="#B88700" strokeWidth={4} strokeLinejoin="round" />
    <path d="M60 95 L60 30 L120 30 L135 55" fill="none" stroke="#3A3F45" strokeWidth={8} strokeLinejoin="round" />
    <rect x={8} y={110} width={30} height={50} rx={6} fill="#3A3F45" />
    <circle cx={50} cy={165} r={24} fill="#22262B" /><circle cx={50} cy={165} r={10} fill="#9AA3AC" />
    <circle cx={125} cy={165} r={24} fill="#22262B" /><circle cx={125} cy={165} r={10} fill="#9AA3AC" />
  </svg>
);

/** Histogramme vertical. */
const Histogram: React.FC<{bars: {at: number; v: number; label: string; color: string; txt: string}[]; max: number; y: number; h: number}> = ({bars, max, y, h}) => {
  const t = useT();
  const bw = 200;
  const gap = (928 - bars.length * bw) / (bars.length - 1 || 1);
  return (
    <div style={{position: 'absolute', left: 76, top: y, width: 928, height: h}}>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 5, background: INK}} />
      {bars.map((b, i) => {
        if (t < b.at) return null;
        const p = prog(t, b.at, b.at + 0.7, easeOut);
        const bh = (b.v / max) * (h - 90) * p;
        return (
          <div key={i} style={{position: 'absolute', left: i * (bw + gap), bottom: 5, width: bw}}>
            <div style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: INK, marginBottom: 10}}>{b.txt}</div>
            <div style={{height: bh, background: b.color, borderRadius: '14px 14px 0 0'}} />
            <div style={{position: 'absolute', top: '100%', left: 0, right: 0, textAlign: 'center', marginTop: 16, fontFamily: sansFont, fontWeight: 800, fontSize: 32, color: INK}}>{b.label}</div>
          </div>
        );
      })}
    </div>
  );
};

/** Barres horizontales. */
const HBars: React.FC<{bars: {at: number; v: number; label: string; color: string; txt: string}[]; max: number; y: number}> = ({bars, max, y}) => {
  const t = useT();
  return (
    <div style={{position: 'absolute', left: 76, top: y, width: 928}}>
      {bars.map((b, i) => {
        if (t < b.at) return null;
        const p = prog(t, b.at, b.at + 0.8, easeOut);
        return (
          <div key={i} style={{marginBottom: 54, opacity: rise(t, b.at, 0.2)}}>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK, marginBottom: 14, letterSpacing: 1}}>{b.label}</div>
            <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
              <div style={{height: 58, width: Math.max(14, (b.v / max) * 700 * p), background: b.color, borderRadius: 12}} />
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: INK}}>{b.txt}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/** Triangle de stabilité vu de dessus : le centre de gravité sort du triangle. */
const Stability: React.FC<{at: number; out: number; y: number}> = ({at, out, y}) => {
  const t = useT();
  if (t < at) return null;
  const k = prog(t, out, out + 0.9, easeInOut);
  const cx = 300;
  const cy = interpolate(k, [0, 1], [330, 90]);
  const inside = k < 0.55;
  return (
    <div style={{position: 'absolute', left: 240, top: y, ...enter(t, at)}}>
      <svg width={600} height={480} viewBox="0 0 600 480">
        <polygon points="80,60 520,60 300,420" fill={inside ? '#D8F3E6' : '#F9D9D7'} stroke={inside ? GREEN : RED} strokeWidth={8} strokeLinejoin="round" />
        <circle cx={80} cy={60} r={18} fill={INK} />
        <circle cx={520} cy={60} r={18} fill={INK} />
        <circle cx={300} cy={420} r={18} fill={INK} />
        <circle cx={cx} cy={cy} r={30} fill={inside ? ORANGE : RED} stroke="#fff" strokeWidth={6} />
        <text x={300} y={472} textAnchor="middle" fontFamily="Montserrat" fontWeight={800} fontSize={26} fill={MUTED}>essieu arrière (pivot)</text>
        <text x={300} y={36} textAnchor="middle" fontFamily="Montserrat" fontWeight={800} fontSize={26} fill={MUTED}>roues avant (fourches)</text>
      </svg>
      <div style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: inside ? GREEN : RED, marginTop: 6}}>{inside ? 'Centre de gravité dans le triangle' : 'Centre de gravité hors du triangle'}</div>
    </div>
  );
};

/** Hiérarchie des mesures ISO 45001 : escalier du plus efficace au moins efficace. */
const Hierarchy: React.FC<{y: number}> = ({y}) => {
  const t = useT();
  const steps: [string, number, string][] = [
    ['Éliminer le danger', 135.28, GREEN],
    ['Le remplacer', 136.68, '#4FC18E'],
    ['Protections techniques', 137.76, '#8ED9B5'],
    ['Organiser le travail', 139.84, '#C9BFB0'],
    ['Équiper (EPI)', 142.64, ORANGE],
  ];
  return (
    <div style={{position: 'absolute', left: 76, top: y, width: 928}}>
      {steps.map(([l, at, c], i) => {
        if (t < at) return null;
        const p = rise(t, at, 0.5);
        return (
          <div key={i} style={{display: 'flex', alignItems: 'center', marginBottom: 22, opacity: p, transform: `translateX(${(1 - p) * -40}px)`}}>
            <div style={{width: 928 - i * 110, height: 118, background: c, borderRadius: 16, display: 'flex', alignItems: 'center', padding: '0 30px', boxSizing: 'border-box', gap: 26}}>
              <span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 58, color: i < 2 ? '#fff' : INK}}>{i + 1}</span>
              <span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: i < 2 ? '#fff' : INK}}>{l}</span>
            </div>
          </div>
        );
      })}
      {t > 143.2 && (
        <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: sansFont, fontWeight: 800, fontSize: 28, color: MUTED, letterSpacing: 2, opacity: rise(t, 143.2)}}>
          <span>↑ LE PLUS EFFICACE</span>
          <span>EN DERNIER ↓</span>
        </div>
      )}
    </div>
  );
};

const Bulb: React.FC<{at: number; y: number; size?: number}> = ({at, y, size = 260}) => {
  const t = useT();
  const on = rise(t, at + 0.3, 0.4);
  return (
    <div style={{position: 'absolute', left: 540, top: y, transform: `translate(-50%, -50%) scale(${rise(t, at, 0.5)})`, filter: `drop-shadow(0 0 ${on * 60}px rgba(255,214,90,${on * 0.8}))`}}>
      <F n="ampoule" size={size} />
    </div>
  );
};

const Logo: React.FC<{y: number; w?: number; at?: number}> = ({y, w = 340, at = 0}) => {
  const t = useT();
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: y, display: 'flex', justifyContent: 'center', opacity: rise(t, at)}}>
      <Img src={staticFile('promo/logo.png')} style={{width: w, background: '#fff', borderRadius: 14, padding: '10px 18px'}} />
    </div>
  );
};

/* ---------- Composition ---------- */
export const Negligences: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill style={{background: CREAM}}>
      {/* 1. Affirmation */}
      <Scene a={0} b={10.55} bg={CREAM}>
        <Kicker at={0} text="ON L’ENTEND PARTOUT…" />
        <BigNumber at={0.2} value={20} unit="ANS" color={RED} y={250} />
        <div style={{position: 'absolute', left: 76, right: 70, top: 560, fontFamily: sansFont, fontWeight: 900, fontSize: 54, lineHeight: 1.15, color: INK, ...enter(t, 1.6)}}>« VINGT ANS DE MÉTIER. IL NE M’ARRIVERA RIEN ! »</div>
        <Stamp at={7.1} x={560} y={820} text="RASSURANT ?" />
        <Person side="left" at={0.6} x={60} y={980} h={680} />
        <Person side="right" at={0.9} x={540} y={980} h={680} />
        <Pill at={8.16} y={1720} text="QUE DISENT VRAIMENT LES LOIS DE LA PHYSIQUE ?" size={32} />
      </Scene>

      {/* 2. La source */}
      <Scene a={10.55} b={21.75} bg={DARK}>
        <Kicker at={10.6} text="LA SOURCE" dark />
        <Title at={10.6} lines={['TROIS FORMULES', '+ UNE NORME']} dark />
        <Row at={14.84} y={560} lead={<F n="echelle" size={96} />} title="CHUTE LIBRE" sub="t = √(2h ÷ g), g = 9,81 m/s²" />
        <Row at={15.84} y={770} lead={<Forklift size={110} />} title="MOMENT DE CHARGE" sub="M = poids × distance" />
        <Row at={17.2} y={980} lead={<F n="outils" size={96} />} title="VITESSE D’UN DISQUE" sub="v = π × diamètre × tours/s" />
        <Row at={19.0} y={1190} lead={<div style={{background: GREEN, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 30, padding: '20px 14px', borderRadius: 12}}>45001</div>} title="ISO 45001 · § 8.1.2" sub="hiérarchie des mesures de prévention" />
      </Scene>

      {/* 3. Le piège */}
      <Scene a={21.75} b={28.35} bg={CREAM}>
        <Kicker at={21.8} text="ATTENTION À UNE CHOSE" />
        <Title at={21.8} lines={['L’EXPÉRIENCE', 'CHANGE…']} />
        <Alert at={24.12} y={560} ok text="VOS RÉFLEXES" />
        <Alert at={26.4} y={740} text="PAS LA GRAVITÉ" />
        <Person side="left" at={22.2} x={260} y={1000} h={760} />
      </Scene>

      {/* 4. Le plan */}
      <Scene a={28.35} b={33.9} bg={GREEN}>
        <Kicker at={28.4} text="ALORS…" dark />
        <Title at={28.4} lines={['COMBIEN DE TEMPS', 'POUR RÉAGIR ?']} dark size={90} />
        <Bulb at={29.5} y={1000} />
        <div style={{position: 'absolute', left: 80, right: 80, top: 1300, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 50, color: INK, ...enter(t, 31.88)}}>JE VOUS EXPLIQUE TOUT, SIMPLEMENT.</div>
      </Scene>

      {/* 5. Chapitre 01 */}
      <Scene a={33.9} b={37.5} bg={DARK}>
        <ChapterCard at={33.95} n="01" kicker="PREMIÈRE NÉGLIGENCE" lines={['TRAVAIL EN HAUTEUR', 'SANS HARNAIS']} icon="echelle" />
      </Scene>
      <Scene a={37.5} b={51.15} bg={CREAM}>
        <Kicker at={37.55} text="CHUTE DE 2 MÈTRES" />
        <Title at={37.55} lines={['TEMPS DE CHUTE']} />
        <BigNumber at={39.44} value={0.64} dec={2} unit="s" y={360} size={230} />
        <Pill at={41.64} y={640} text="MOINS D’UNE SECONDE" bg={ORANGE} color={INK} />
        {t > 42.9 && <div style={{position: 'absolute', left: 76, top: 800, fontFamily: sansFont, fontWeight: 800, fontSize: 30, letterSpacing: 4, color: MUTED, ...enter(t, 42.9)}}>VITESSE À L’IMPACT (km/h)</div>}
        <Histogram
          y={900}
          h={640}
          max={36}
          bars={[
            {at: 44.5, v: 22.55, txt: '22,6', label: '2 m', color: '#8ED9B5'},
            {at: 47.36, v: 27.62, txt: '27,6', label: '3 m', color: GREEN},
            {at: 50.0, v: 35.66, txt: '35,7', label: '5 m', color: ORANGE},
          ]}
        />
      </Scene>
      <Scene a={51.15} b={61.05} bg={CREAM}>
        <Kicker at={51.2} text="MAIS ATTENTION" />
        <Title at={51.2} lines={['CE QUE ÇA', 'VEUT DIRE']} />
        <Alert at={52.16} y={560} strike text="PETITE HAUTEUR = SANS DANGER" />
        <Alert at={55.08} y={760} ok text="AUCUN RÉFLEXE NE RATTRAPE UNE GLISSADE" />
        <Person side="left" at={52.5} x={260} y={1060} h={560} />
        <Pill at={58.24} y={1680} text="VOTRE ÉQUILIBRE N’EST PAS UNE PROTECTION" />
      </Scene>

      {/* 6. Chapitre 02 */}
      <Scene a={61.05} b={64.3} bg={DARK}>
        <ChapterCard at={61.1} n="02" kicker="DEUXIÈME NÉGLIGENCE" lines={['MANUTENTION', 'SURCHARGÉE']} icon={<Forklift size={380} />} />
      </Scene>
      <Scene a={64.3} b={75.15} bg={CREAM}>
        <Kicker at={64.35} text="EXEMPLE SIMPLIFIÉ" />
        <Title at={64.35} lines={['LA PLAQUE', 'DE CHARGE']} />
        <Card at={66.04} y={560} style={{padding: '34px 40px', background: '#E4E7EA', border: '6px solid #9AA3AC'}}>
          <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 30, letterSpacing: 4, color: MUTED}}>CAPACITÉ NOMINALE</div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 78, color: INK, marginTop: 8}}>2 000 kg</div>
          <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 40, color: INK}}>à 500 mm du talon des fourches</div>
        </Card>
        <Row at={70.4} y={900} lead={<span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: GREEN}}>=</span>} title="MOMENT LIMITE : 1 000 kg·m" sub="2 000 kg × 0,5 m" />
        <Row at={72.48} y={1110} lead={<span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: ORANGE}}>+</span>} title="+ 500 kg « POUR GAGNER UN VOYAGE »" sub="charge réelle : 2 500 kg" />
      </Scene>
      <Scene a={75.15} b={81.95} bg={DARK}>
        <Kicker at={75.2} text="QUE FAUT-IL COMPRENDRE ?" dark />
        <div style={{position: 'absolute', left: 76, top: 250, fontFamily: sansFont, fontWeight: 900, fontSize: 90, color: '#fff', ...enter(t, 75.2)}}>
          2 500 <span style={{color: '#8ED9B5'}}>× 0,5</span> =
        </div>
        <BigNumber at={78.16} value={1250} unit="kg·m" y={430} size={230} from={1000} />
        <div style={{position: 'absolute', left: 76, top: 720, fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: '#fff', ...enter(t, 78.9)}}>CONTRE 1 000 kg·m PRÉVUS</div>
        <Pill at={79.68} y={880} text="+ 25 % AU-DELÀ DE LA LIMITE" bg={RED} />
      </Scene>
      <Scene a={81.95} b={87.5} bg={CREAM}>
        <Kicker at={82.0} text="LE RÉSULTAT" />
        <Title at={82.0} lines={['LE CHARIOT', 'BASCULE']} />
        <Stability at={82.24} out={83.28} y={560} />
        <div style={{position: 'absolute', left: 540, top: 1440, transform: `translate(-50%, -50%) rotate(${interpolate(t, [85.76, 86.4], [0, 14], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeIn})}deg)`, opacity: rise(t, 84.6)}}>
          <Forklift size={380} />
        </div>
      </Scene>

      {/* 7. Chapitre 03 */}
      <Scene a={87.5} b={91.2} bg={DARK}>
        <ChapterCard at={87.55} n="03" kicker="TROISIÈME NÉGLIGENCE" lines={['OUTILS BRICOLÉS,', 'PROTECTIONS RETIRÉES']} icon="outils" />
      </Scene>
      <Scene a={91.2} b={101.25} bg={CREAM}>
        <Kicker at={91.25} text="EXEMPLE : MEULEUSE" />
        <Title at={91.25} lines={['LA VITESSE', 'DU DISQUE']} />
        <Card at={91.52} y={560} w={440} style={{padding: '30px 32px', textAlign: 'center'}}>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 66, color: INK}}>Ø 125 mm</div>
          <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 30, color: MUTED}}>diamètre du disque</div>
        </Card>
        <Card at={93.6} x={564} y={560} w={440} style={{padding: '30px 32px', textAlign: 'center'}}>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 66, color: INK}}>11 000</div>
          <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 30, color: MUTED}}>tours par minute</div>
        </Card>
        <BigNumber at={97.0} value={72} unit="m/s" y={780} size={210} />
        <HBars
          y={1080}
          max={260}
          bars={[
            {at: 99.36, v: 259.2, txt: '≈ 260 km/h', label: 'BORD DU DISQUE', color: ORANGE},
            {at: 99.9, v: 22.55, txt: '22,6 km/h', label: 'IMPACT D’UNE CHUTE DE 2 m', color: '#8ED9B5'},
          ]}
        />
      </Scene>
      <Scene a={101.25} b={107.75} bg={CREAM}>
        <Kicker at={101.3} text="SANS PROTECTION" />
        <Title at={101.3} lines={['UN ÉCLAT À', 'CETTE VITESSE…']} />
        <Alert at={101.28} y={560} text="CARTER RETIRÉ" />
        <Alert at={102.16} y={740} text="LUNETTES ABSENTES" />
        <Card at={104.84} y={960} w={440} style={{padding: '34px 20px', textAlign: 'center', borderBottom: `10px solid ${RED}`}}>
          <F n="pansement" size={150} style={{margin: '0 auto'}} />
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: RED, marginTop: 18}}>AMPUTATION</div>
        </Card>
        <Card at={105.96} x={564} y={960} w={440} style={{padding: '34px 20px', textAlign: 'center', borderBottom: `10px solid ${RED}`}}>
          <F n="yeux" size={150} style={{margin: '0 auto'}} />
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: RED, marginTop: 18}}>ŒIL PERDU</div>
        </Card>
      </Scene>

      {/* 8. Que retenir */}
      <Scene a={107.75} b={110.45} bg={DARK}>
        <Kicker at={107.8} text="L’ESSENTIEL" dark />
        <Title at={107.8} lines={['QUE RETENIR ?']} dark size={96} />
        <Bulb at={108.0} y={1000} size={300} />
      </Scene>
      <Scene a={110.45} b={118.35} bg={CREAM}>
        <Kicker at={110.5} text="NON, L’EXPÉRIENCE NE PROTÈGE PAS" />
        <Title at={110.5} lines={['CE QUE DIT', 'LA PHYSIQUE']} />
        <Row at={111.44} y={560} lead={<span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 50, color: ORANGE}}>0,64 s</span>} title="LA CHUTE" sub="dure moins d’une seconde" />
        <Row at={113.6} y={790} lead={<span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 50, color: RED}}>+25 %</span>} title="LA SURCHARGE" sub="fait basculer le chariot" />
        <Row at={115.4} y={1020} lead={<span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: ORANGE}}>≈ 260</span>} title="LE DISQUE" sub="frappe à plus de 200 km/h" />
      </Scene>
      <Scene a={118.35} b={125.45} bg={CREAM}>
        <Kicker at={118.4} text="L’ENJEU" />
        <Title at={118.4} lines={['COMPRENDRE,', 'PAS BLÂMER']} />
        <Alert at={118.4} y={560} text="BLÂMER LES TRAVAILLEURS" />
        <Row at={121.2} y={760} lead={<span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 76, color: ORANGE}}>1</span>} title="COMPRENDRE" sub="le risque" />
        <Row at={122.6} y={970} lead={<span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 76, color: GREEN}}>2</span>} title="RESPECTER" sub="les limites" />
        <Row at={124.16} y={1180} lead={<span style={{fontFamily: sansFont, fontWeight: 900, fontSize: 76, color: DARK}}>3</span>} title="GARDER" sub="les protections" />
      </Scene>

      {/* 9. Avis + hiérarchie */}
      <Scene a={125.45} b={134.95} bg={DARK}>
        <Kicker at={125.5} text="MON AVIS" dark />
        <Title at={125.5} lines={['LES RÈGLES', 'DE SÉCURITÉ…']} dark />
        <Alert at={128.16} y={600} strike text="DE SIMPLES CONTRAINTES ADMINISTRATIVES" />
        <Alert at={130.68} y={820} ok text="DES GARDE-FOUS" />
        <Person side="right" at={126} x={285} y={1080} h={700} framed />
      </Scene>
      <Scene a={134.95} b={144.7} bg={CREAM}>
        <Kicker at={135.0} text="ISO 45001 · § 8.1.2" />
        <Title at={135.0} lines={['L’ORDRE', 'À SUIVRE']} />
        <Hierarchy y={560} />
      </Scene>

      {/* 10. Signature */}
      <Scene a={144.7} b={152.45} bg={DARK}>
        <Bulb at={144.75} y={420} size={220} />
        <div style={{position: 'absolute', left: 0, right: 0, top: 620, textAlign: 'center'}}>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 96, color: '#fff', ...enter(t, 145.0)}}>DÉCRYPTER</div>
          <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 60, color: ORANGE, ...enter(t, 145.6)}}>tout simplement</div>
          <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 52, color: '#8ED9B5', marginTop: 8, ...enter(t, 146.44)}}>avec UNIVERSNORMES QHSE</div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: '#fff', marginTop: 90, ...enter(t, 148.84)}}>LES NORMES EXPLIQUÉES</div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: ORANGE, marginTop: 20, ...enter(t, 150.4)}}>SANS JARGON, SANS PRISE DE TÊTE !</div>
        </div>
        <Logo y={1500} at={146.9} />
      </Scene>

      {/* 11. Question */}
      <Scene a={152.45} b={END + 1} bg={ORANGE}>
        <Kicker at={152.5} text="ET VOUS ?" dark />
        <Title at={152.5} lines={['QUELLE NÉGLIGENCE', 'VOYEZ-VOUS', 'LE PLUS SOUVENT ?']} size={80} />
        <Person side="left" at={152.7} x={50} y={1040} h={640} wave framed />
        <Person side="right" at={152.9} x={562} y={1040} h={640} framed />
        {t > 154.0 && <div style={{position: 'absolute', left: 160, top: 900, width: 170, height: 110, background: '#fff', borderRadius: 22, ...enter(t, 154.0)}} />}
        {t > 155.0 && (
          <div style={{position: 'absolute', left: 770, top: 900, width: 190, height: 110, background: INK, borderRadius: 22, color: '#fff', fontSize: 70, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', letterSpacing: 6, ...enter(t, 155.0)}}>…</div>
        )}
        <Pill at={156.16} y={1720} text="DITES-LE EN COMMENTAIRE" bg="#FFF3E2" color={INK} size={40} />
      </Scene>

      {[10.55, 33.9, 61.05, 87.5, 107.75].map((a) => (
        <Wipe key={a} at={a} />
      ))}
      <Audio src={staticFile('negligences/voix-negligences.mp3')} />
      <SoundDesign cues={SFX} />
    </AbsoluteFill>
  );
};

const SFX: Sfx[] = [
  {at: 0.2, s: 'tick', v: 0.15, dur: 0.9},
  {at: 7.1, s: 'tampon', v: 0.4},
  ...[10.55, 33.9, 61.05, 87.5, 107.75].map((at) => ({at: at - 0.35, s: 'soft-whoosh', v: 0.25})),
  ...[14.84, 15.84, 17.2, 19.0, 24.12, 26.4, 41.64, 44.5, 47.36, 50.0, 52.16, 55.08, 66.04, 70.4, 72.48, 91.52, 93.6, 101.28, 102.16, 104.84, 105.96, 111.44, 113.6, 115.4, 121.2, 122.6, 124.16, 135.28, 136.68, 137.76, 139.84, 142.64].map((at) => ({at, s: 'sfx/pop', v: 0.14})),
  {at: 39.44, s: 'tick', v: 0.15, dur: 0.9},
  {at: 78.16, s: 'tick', v: 0.15, dur: 0.9},
  {at: 79.68, s: 'tampon', v: 0.3},
  {at: 85.76, s: 'sfx/thud', v: 0.35},
  {at: 97.0, s: 'tick', v: 0.15, dur: 0.9},
  {at: 145.0, s: 'signature-marque', v: 0.25, dur: 4},
];
