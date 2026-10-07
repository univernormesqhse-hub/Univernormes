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
 * « Pourquoi compter les accidents ne suffit plus » — UI motion premium (skill video-promo-diagnostic-qhse)
 * avec des techniques de montage nouvelles dans la série : jauge-compteur, glitch numérique RVB,
 * cadre « rétroviseur », ligne de temps qui défile (scrub) vers la gauche, écran partagé à volet coulissant,
 * ondes sonar des signaux faibles, retour en arrière (rewind) qui fait redescendre la courbe d'accidents.
 */
const LOGO = 'promo/logo.png';
const DATA = 4.78;
const SITE = 9.14;
const MIRROR = 14.5;
const TRAP = 21.06;
const SHIFT = 27.0;
const SPLIT = 34.76;
const BOARD = 40.94;
const BACK = 47.96;
const OUTRO_AT = 59.7;
export const COMPTERACC_FRAMES = s(63.1);
const RED = '#D9443A';
const BLUE = '#3D7DD8';

/* ─────────── Outils de montage ─────────── */

/** Coupe « glitch » : décalage RVB et bandes horizontales pendant quelques images. */
const Glitch: React.FC<{at: number; dur?: number; children: React.ReactNode}> = ({at, dur = 0.35, children}) => {
  const t = useT();
  const g = t >= at && t < at + dur ? 1 - (t - at) / dur : 0;
  if (g <= 0) return <>{children}</>;
  const sh = 14 * g;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{transform: `translateX(${-sh}px)`}}><AbsoluteFill style={{opacity: 0.55}}>{children}</AbsoluteFill></AbsoluteFill>
      <AbsoluteFill style={{transform: `translateX(${sh}px)`, opacity: 0.55}}>{children}</AbsoluteFill>
      {Array.from({length: 6}, (_, k) => <div key={k} style={{position: 'absolute', left: 0, right: 0, top: random(`gl${k}${Math.floor(t * 30)}`) * 1920, height: 10 + random(`gh${k}`) * 40, background: k % 2 ? 'rgba(61,125,216,0.25)' : 'rgba(217,68,58,0.22)', transform: `translateX(${(random(`gx${k}${Math.floor(t * 30)}`) - 0.5) * 80}px)`}} />)}
    </AbsoluteFill>
  );
};

/** Courbe d'accidents (repère de la ligne de temps). */
const curvePath = (spike: number, x0 = 60, x1 = 1020, base = 1120) => {
  const pts: string[] = [];
  for (let i = 0; i <= 48; i++) {
    const x = x0 + ((x1 - x0) * i) / 48;
    const wave = Math.sin(i * 0.9) * 14;
    const rise = i > 30 ? Math.pow((i - 30) / 18, 2) * 420 * spike : 0;
    pts.push(`${i ? 'L' : 'M'}${x} ${base + wave - rise}`);
  }
  return pts.join(' ');
};

/* ─────────── Plans ─────────── */

/** 1. Jauge : du réactif au proactif. */
const Gauge: React.FC = () => {
  const t = useT();
  const needle = -70 + 140 * prog(t, 2.8, 4.2, easeInOut);
  return (
    <AbsoluteFill>
      <Kinetic text="Piloter votre *sécurité*" at={0.1} until={2.1} y={400} size={90} />
      <Kinetic text="avec des indicateurs *proactifs*" at={2.16} y={400} size={74} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: prog(t, 0.3, 0.8)}}>
        <path d="M220 1160 A320 320 0 0 1 860 1160" fill="none" stroke="#E5E8EC" strokeWidth={60} strokeLinecap="round" />
        <path d="M220 1160 A320 320 0 0 1 540 840" fill="none" stroke={RED} strokeWidth={60} strokeLinecap="round" opacity={0.85} />
        <path d="M540 840 A320 320 0 0 1 860 1160" fill="none" stroke={colors.green} strokeWidth={60} strokeLinecap="round" opacity={prog(t, 2.8, 3.6)} />
        <g transform={`rotate(${needle} 540 1160)`}><line x1={540} y1={1160} x2={540} y2={880} stroke={colors.navy} strokeWidth={16} strokeLinecap="round" /></g>
        <circle cx={540} cy={1160} r={40} fill={colors.navy} />
        <text x={250} y={1260} textAnchor="middle" fontFamily="Montserrat" fontWeight={900} fontSize={40} fill={RED}>Réactif</text>
        <text x={830} y={1260} textAnchor="middle" fontFamily="Montserrat" fontWeight={900} fontSize={40} fill={colors.green}>Proactif</text>
      </svg>
    </AbsoluteFill>
  );
};

/** 2. Des chiffres qui ne dictent aucune action : écran saturé qui se brouille. */
const DataWall: React.FC = () => {
  const t = useT();
  const fade = prog(t, 7.6, 8.6);
  return (
    <AbsoluteFill>
      <Kinetic text="Des chiffres… *aucune action*" at={DATA + 0.2} y={400} size={82} accent={RED} />
      <div style={{position: 'absolute', left: 90, top: 560, width: 900, height: 700, borderRadius: 30, background: '#0E1726', boxShadow: shadow, overflow: 'hidden', padding: 30, boxSizing: 'border-box'}}>
        {Array.from({length: 22}, (_, r) => (
          <div key={r} style={{fontFamily: 'monospace', fontSize: 24, color: r % 4 === 0 ? '#F07C72' : '#7FA6D9', whiteSpace: 'nowrap', opacity: (1 - fade) * prog(t, DATA + r * 0.05, DATA + 0.3 + r * 0.05), transform: `translateX(${-((t * 60 + r * 37) % 200)}px)`}}>
            {Array.from({length: 16}, (_, c) => (random(`n${r}${c}${Math.floor(t * 6)}`) * 999).toFixed(1)).join('  ')}
          </div>
        ))}
        <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: fade}}>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 200, color: '#fff'}}>0</div>
          <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 44, color: '#9FB0C8'}}>action concrète</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** 3. Le chantier et son compteur d'accidents. */
const Site: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Kinetic text="Prenez un *chantier*" at={SITE + 0.1} y={400} size={90} />
      <div style={{position: 'absolute', left: 90, top: 560, width: 900, height: 620, borderRadius: 34, overflow: 'hidden', boxShadow: shadow, transform: `scale(${1.02 + 0.05 * prog(t, SITE, MIRROR, (v) => v)})`}}>
        <div style={{width: '100%', height: '100%', backgroundImage: `url(${staticFile('zones/chantier.jpg')})`, backgroundSize: 'cover', backgroundPosition: '50% 40%'}} />
      </div>
      <div style={{position: 'absolute', left: 540, top: 1110, transform: `translateX(-50%) translateY(${(1 - prog(t, 11.4, 11.9, easeOut)) * 80}px)`, opacity: prog(t, 11.4, 11.8), background: '#fff', borderRadius: 28, boxShadow: shadow, padding: '20px 32px', display: 'flex', alignItems: 'center', gap: 22, whiteSpace: 'nowrap'}}>
        <F n="pansement" size={70} />
        <div>
          <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 26, color: '#6B7684'}}>Accidents du travail</div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 64, color: RED}}>{Math.round(7 * prog(t, 12.6, 13.8, easeOut))}</div>
        </div>
        <div style={{border: '2px solid #CBD2DA', borderRadius: 10, padding: '3px 12px', fontFamily: sansFont, fontWeight: 800, fontSize: 18, color: '#9AA5B3', letterSpacing: 2}}>EXEMPLE</div>
      </div>
    </AbsoluteFill>
  );
};

/** 4. Regarder dans le rétroviseur : la courbe vue dans un miroir de voiture. */
const Mirror: React.FC = () => {
  const t = useT();
  const p = prog(t, MIRROR + 0.3, MIRROR + 1.0, easeOut);
  return (
    <AbsoluteFill>
      <Kinetic text="Regarder dans le *rétroviseur*" at={MIRROR + 0.2} y={400} size={78} />
      <div style={{position: 'absolute', left: 90, top: 640, width: 900, height: 440, transform: `perspective(1600px) rotateY(${(1 - p) * -40}deg) scale(${0.8 + 0.2 * p})`, opacity: p}}>
        <div style={{position: 'absolute', inset: 0, borderRadius: 220, background: '#20262E', boxShadow: '0 30px 60px rgba(0,0,0,0.35)'}} />
        <div style={{position: 'absolute', inset: 26, borderRadius: 200, overflow: 'hidden', background: 'linear-gradient(180deg, #DDE8F3, #B9CADB)'}}>
          <svg width={848} height={388} viewBox="0 0 848 388" style={{transform: 'scaleX(-1)'}}>
            <path d={curvePath(0.6, 0, 848, 260)} fill="none" stroke={RED} strokeWidth={9} strokeLinecap="round" pathLength={1} strokeDasharray={`${prog(t, 16.2, 18.0)} 1`} />
          </svg>
          <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(255,255,255,0.55) 0%, transparent 35%, transparent 70%, rgba(255,255,255,0.25) 100%)'}} />
          <div style={{position: 'absolute', left: 40, bottom: 26, fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#20262E', letterSpacing: 3}}>PASSÉ</div>
        </div>
      </div>
      <div style={{position: 'absolute', left: 540 - 20, top: 1080, width: 40, height: 120, background: '#20262E', borderRadius: 10, opacity: p}} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 1300, textAlign: 'center', fontFamily: handFont, fontSize: 56, color: colors.navy, opacity: prog(t, 18.4, 18.9)}}>vous ne mesurez que <span style={{color: RED}}>ce qui s'est déjà produit</span></div>
    </AbsoluteFill>
  );
};

/** 5–6. Ligne de temps : piège, puis défilement vers la gauche et effort avant la rupture. */
const Timeline: React.FC = () => {
  const t = useT();
  const spike = prog(t, 22.3, 23.6, easeIn);
  const scrub = prog(t, 29.0, 30.7, easeInOut);
  const presentX = 600 - scrub * 300;
  const effort = (k: number) => prog(t, 31.6 + k * 0.25, 32.2 + k * 0.25, easeOut);
  return (
    <AbsoluteFill>
      <Kinetic text="Le *piège*" at={TRAP + 0.2} until={SHIFT - 0.1} y={400} size={110} accent={RED} />
      <Kinetic text="Décalez la ligne de temps *vers la gauche*" at={SHIFT + 0.1} y={400} size={68} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {/* axe */}
        <line x1={60} y1={1260} x2={1020} y2={1260} stroke={colors.navy} strokeWidth={5} />
        {Array.from({length: 13}, (_, k) => <line key={k} x1={60 + k * 80 - scrub * 300} y1={1250} x2={60 + k * 80 - scrub * 300} y2={1270} stroke="#9AA5B3" strokeWidth={3} />)}
        <path d={curvePath(spike)} fill="none" stroke={RED} strokeWidth={9} strokeLinecap="round" transform={`translate(${-scrub * 0} 0)`} />
        {/* présent / tête de lecture */}
        <line x1={presentX} y1={560} x2={presentX} y2={1300} stroke={colors.navy} strokeWidth={5} strokeDasharray="14 10" />
        <rect x={presentX - 70} y={520} width={140} height={46} rx={23} fill={colors.navy} />
        <text x={presentX} y={552} textAnchor="middle" fontFamily="Montserrat" fontWeight={900} fontSize={24} fill="#fff">PRÉSENT</text>
        {/* zone de rupture */}
        <rect x={600} y={640} width={420} height={620} fill={`rgba(217,68,58,${0.08 * spike})`} />
        <text x={810} y={690} textAnchor="middle" fontFamily="Montserrat" fontWeight={900} fontSize={30} fill={RED} opacity={spike}>LE MAL EST FAIT</text>
        {/* effort fourni avant la rupture */}
        {[0, 1, 2, 3].map((k) => <rect key={k} x={presentX + 30 + k * 64} y={1240 - 260 * effort(k) * (0.5 + k * 0.15)} width={46} height={260 * effort(k) * (0.5 + k * 0.15)} rx={10} fill={colors.green} opacity={0.9} />)}
      </svg>
      <div style={{position: 'absolute', left: 80, top: 1290, fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#9AA5B3'}}>PASSÉ</div>
      <div style={{position: 'absolute', right: 80, top: 1290, fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#9AA5B3'}}>FUTUR</div>
      {/* anticipation impossible */}
      <div style={{position: 'absolute', left: 540, top: 1380, transform: `translateX(-50%) scale(${prog(t, 25.0, 25.3, easeOut) * (1 - prog(t, SHIFT - 0.2, SHIFT + 0.1))})`, display: 'flex', alignItems: 'center', gap: 12, background: '#fff', border: `4px solid ${RED}`, borderRadius: 24, padding: '12px 24px', fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: RED, whiteSpace: 'nowrap'}}>✕ Anticipation impossible</div>
      <div style={{position: 'absolute', left: 540, top: 1380, transform: `translateX(-50%) scale(${prog(t, 32.4, 32.8, easeOut)})`, display: 'flex', alignItems: 'center', gap: 12, background: '#fff', border: `4px solid ${colors.green}`, borderRadius: 24, padding: '12px 24px', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: colors.green, whiteSpace: 'nowrap'}}>Effort mesuré avant la rupture</div>
    </AbsoluteFill>
  );
};

/** 7. Écran partagé : réactif | proactif, volet qui coulisse. */
const Split: React.FC = () => {
  const t = useT();
  const div = 540 + 540 * (1 - prog(t, SPLIT + 0.2, SPLIT + 1.0, easeOut)) - 120 * prog(t, 39.2, 40.2, easeInOut);
  return (
    <AbsoluteFill>
      <Kinetic text="Le rôle des indicateurs *proactifs*" at={SPLIT + 0.1} y={400} size={70} />
      <div style={{position: 'absolute', left: 0, top: 540, width: div, height: 900, overflow: 'hidden', background: '#FCEDEB'}}>
        <div style={{position: 'absolute', left: Math.max(10, (div - 380) / 2), top: 80, width: 380, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, opacity: prog(t, 37.5, 38.0)}}>
          <F n="pansement" size={150} />
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: RED, textAlign: 'center'}}>Réactifs</div>
          <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 34, color: colors.navy, textAlign: 'center'}}>constatent l'échec</div>
        </div>
      </div>
      <div style={{position: 'absolute', left: div, top: 540, right: 0, height: 900, overflow: 'hidden', background: '#EAF6EC'}}>
        <div style={{position: 'absolute', left: (1080 - div - 380) / 2, top: 80, width: 380, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, opacity: prog(t, 39.3, 39.8)}}>
          <F n="bouclier" size={150} />
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: colors.green, textAlign: 'center'}}>Proactifs</div>
          <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 34, color: colors.navy, textAlign: 'center'}}>mesurent la prévention</div>
        </div>
      </div>
      <div style={{position: 'absolute', left: div - 6, top: 520, width: 12, height: 940, borderRadius: 6, background: colors.navy}} />
      <div style={{position: 'absolute', left: div - 40, top: 950, width: 80, height: 80, borderRadius: 40, background: colors.navy, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, fontWeight: 900, fontFamily: sansFont}}>⇆</div>
    </AbsoluteFill>
  );
};

/** 8. Le tableau se remplit d'actions tangibles. */
const Board: React.FC = () => {
  const t = useT();
  const rows: [string, string, number, number][] = [['Inspections réalisées', 'clipboard', 43.22, 24], ['Situations à risque signalées', 'megaphone', 44.76, 17], ['Équipes formées', 'formatrice', 46.58, 9]];
  return (
    <AbsoluteFill>
      <Kinetic text="Des actions *tangibles*" at={BOARD + 0.1} y={400} size={90} accent={colors.green} />
      <div style={{position: 'absolute', left: 90, top: 560, width: 900, height: 880, borderRadius: 34, background: '#fff', boxShadow: shadow, padding: 34, boxSizing: 'border-box'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 26}}>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: colors.navy}}>Indicateurs proactifs</div>
          <div style={{border: '2px solid #CBD2DA', borderRadius: 10, padding: '3px 12px', fontFamily: sansFont, fontWeight: 800, fontSize: 18, color: '#9AA5B3', letterSpacing: 2}}>EXEMPLE</div>
        </div>
        {rows.map(([l, ic, at, n], k) => {
          const p = prog(t, at - 0.2, at + 0.3, easeOut);
          return (
            <div key={l} style={{display: 'flex', alignItems: 'center', gap: 22, padding: '24px 26px', borderRadius: 26, background: '#F4FAF5', marginBottom: 22, opacity: p, transform: `perspective(1200px) rotateX(${(1 - p) * 60}deg)`, transformOrigin: 'top'}}>
              <F n={ic} size={80} />
              <div style={{flex: 1, fontFamily: sansFont, fontWeight: 800, fontSize: 34, color: colors.navy}}>{l}</div>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 64, color: colors.green}}>{Math.round(n * prog(t, at, at + 1.2, easeOut))}</div>
              <Check p={prog(t, at + 0.5, at + 0.9)} size={52} />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/** 9. Retour au chantier : sonar des signaux faibles, intervention, puis retour en arrière qui évite le pic. */
const Finale: React.FC = () => {
  const t = useT();
  const rewind = prog(t, 56.8, 58.6, easeInOut);
  const spike = 1 - rewind;
  const vhs = rewind > 0 && rewind < 1;
  const sonars: [number, number][] = [[260, 760], [540, 820], [820, 760]];
  return (
    <AbsoluteFill>
      <Kinetic text="Détecter les *signaux faibles*" at={BACK + 0.2} until={56.6} y={400} size={74} />
      <Kinetic text="… *avant* l'accident" at={56.7} y={400} size={92} accent={colors.green} />
      {sonars.map(([x, y], k) => (
        <div key={k}>
          {[0, 1, 2].map((r) => {
            const ph = ((t - 52.0 - k * 0.3 + r * 0.6) % 1.8) / 1.8;
            const on = t > 52.0 + k * 0.3 && t < 56.8;
            return on ? <div key={r} style={{position: 'absolute', left: x - 200 * ph, top: y - 200 * ph, width: 400 * ph, height: 400 * ph, borderRadius: '50%', border: `4px solid rgba(46,155,62,${1 - ph})`}} /> : null;
          })}
          <div style={{position: 'absolute', left: x - 70, top: y - 70, width: 140, height: 140, borderRadius: 70, background: '#fff', boxShadow: shadow, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${prog(t, 49.6 + k * 0.3, 50.0 + k * 0.3, easeOut)})`}}><F n={['clipboard', 'loupe', 'megaphone'][k]} size={90} /></div>
        </div>
      ))}
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <line x1={60} y1={1260} x2={1020} y2={1260} stroke={colors.navy} strokeWidth={5} />
        <path d={curvePath(spike * prog(t, BACK + 0.3, BACK + 1.2))} fill="none" stroke={rewind > 0.6 ? colors.green : RED} strokeWidth={9} strokeLinecap="round" />
        <line x1={600} y1={980} x2={600} y2={1290} stroke={colors.navy} strokeWidth={5} strokeDasharray="14 10" />
        {/* intervention terrain */}
        <path d="M540 900 C 560 1000, 600 1060, 640 1150" stroke={colors.green} strokeWidth={10} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={`${prog(t, 54.5, 55.6)} 1`} />
      </svg>
      <div style={{position: 'absolute', left: 660, top: 1080, transform: `scale(${prog(t, 55.4, 55.8, easeOut)})`}}><F n="casque" size={90} /></div>
      {vhs && (
        <AbsoluteFill style={{pointerEvents: 'none'}}>
          {Array.from({length: 40}, (_, k) => <div key={k} style={{position: 'absolute', left: 0, right: 0, top: k * 48, height: 2, background: 'rgba(14,42,92,0.12)'}} />)}
          <div style={{position: 'absolute', right: 70, top: 300, fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: colors.navy, opacity: Math.floor(t * 4) % 2 ? 1 : 0.3}}>◀◀</div>
        </AbsoluteFill>
      )}
      <div style={{position: 'absolute', left: 540, top: 1380, transform: `translateX(-50%) scale(${prog(t, 58.6, 58.95, easeOut)}) rotate(-5deg)`, border: `8px solid ${colors.green}`, color: colors.green, borderRadius: 18, padding: '10px 30px', fontFamily: sansFont, fontWeight: 900, fontSize: 60, background: 'rgba(255,255,255,0.9)', whiteSpace: 'nowrap'}}>ACCIDENT ÉVITÉ</div>
    </AbsoluteFill>
  );
};

/** Bruitages seuls (ni musique ni ambiance). */
const CUES: Sfx[] = [
  {at: 0.05, s: 'bass-hit', v: 0.5},
  {at: 2.8, s: 'riser', v: 0.3, dur: 1.4},
  {at: 4.2, s: 'validation', v: 0.42},
  {at: DATA - 0.05, s: 'sfx/swish', v: 0.5},
  ...Array.from({length: 8}, (_, k) => ({at: DATA + 0.2 + k * 0.22, s: 'sfx/click', v: 0.24})),
  {at: 7.6, s: 'deep-hit', v: 0.45},
  ...[SITE, MIRROR, TRAP, SPLIT, BOARD, BACK].map((at) => ({at: at - 0.05, s: 'sfx/swish', v: 0.48})),
  {at: 11.4, s: 'sfx/pop', v: 0.45},
  ...Array.from({length: 7}, (_, k) => ({at: 12.6 + k * 0.16, s: 'tick', v: 0.38})),
  {at: MIRROR + 0.3, s: 'soft-whoosh', v: 0.45},
  {at: 16.2, s: 'stylo', v: 0.32, dur: 1.6},
  {at: 22.3, s: 'tension', v: 0.32, dur: 1.6},
  {at: 23.6, s: 'alarme', v: 0.18, dur: 0.8},
  {at: 25.0, s: 'tampon', v: 0.55},
  {at: 29.0, s: 'soft-whoosh', v: 0.5},
  ...[0, 1, 2, 3].map((k) => ({at: 31.6 + k * 0.25, s: 'sfx/pop', v: 0.38})),
  {at: 32.4, s: 'validation', v: 0.42},
  {at: SPLIT + 0.2, s: 'soft-whoosh', v: 0.45},
  {at: 39.2, s: 'sfx/swish', v: 0.5},
  ...[43.22, 44.76, 46.58].flatMap((at) => [{at: at - 0.2, s: 'sfx/pop', v: 0.45}, {at: at + 0.5, s: 'tick', v: 0.5}]),
  ...[49.6, 49.9, 50.2].map((at) => ({at, s: 'sfx/pop', v: 0.4})),
  ...[52.0, 53.8, 55.6].map((at) => ({at, s: 'sfx/ding', v: 0.28})),
  {at: 54.5, s: 'sfx/whoosh', v: 0.42},
  {at: 56.8, s: 'riser', v: 0.3, dur: 1.6},
  {at: 58.6, s: 'tampon', v: 0.7},
  {at: 58.65, s: 'validation', v: 0.45},
  {at: OUTRO_AT - 0.4, s: 'soft-whoosh', v: 0.5},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const CompterAcc: React.FC = () => (
  <AbsoluteFill>
    <Backdrop />
    <Gate from={0} to={DATA}><Gauge /></Gate>
    <Gate from={DATA} to={SITE}><Glitch at={DATA}><DataWall /></Glitch></Gate>
    <Gate from={SITE} to={MIRROR}><Glitch at={SITE}><Site /></Glitch></Gate>
    <Gate from={MIRROR} to={TRAP}><Mirror /></Gate>
    <Gate from={TRAP} to={SPLIT}><Glitch at={TRAP}><Timeline /></Glitch></Gate>
    <Gate from={SPLIT} to={BOARD}><Split /></Gate>
    <Gate from={BOARD} to={BACK}><Glitch at={BOARD}><Board /></Glitch></Gate>
    <Gate from={BACK} to={OUTRO_AT}><Glitch at={BACK}><Finale /></Glitch></Gate>
    <Gate from={OUTRO_AT} to={999}><Outro at={OUTRO_AT} logo={LOGO} /></Gate>
    <Gate from={0} to={OUTRO_AT}><Captions captions={captions} /></Gate>
    <Audio src={staticFile('voix-off-compter-accidents.m4a')} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);
