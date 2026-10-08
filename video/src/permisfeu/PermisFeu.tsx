import React from 'react';
import {AbsoluteFill, Audio, Img, random, staticFile} from 'remotion';
import {easeIn, easeInOut, easeOut, Gate, prog, useT} from '../anim';
import {Captions} from '../components/Captions';
import {Check} from '../identui/IdentUi';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {colors, handFont, s, sansFont} from '../theme';
import {captions} from './captions';

/**
 * « Comment fonctionne le permis de feu » — UI motion premium (skill video-promo-diagnostic-qhse), voix d'origine,
 * illustré par les photos fournies (public/permisfeu, marques retirées). Univers sombre « braises » inédit dans la série.
 * Techniques nouvelles : allumette qui s'enflamme, apparition par bord qui brûle, cylindre 3D de photos, distorsion de
 * chaleur (filtre de turbulence), plan vu du dessus avec rayon d'exclusion, coupe de bâtiment à braises cachées,
 * bouton d'arrêt d'urgence, accéléré du feu couvant, planche de BD photo, permis cadenassé puis validé, allumettes 3/10.
 */
const LOGO = 'promo/logo.png';
const EMBER = '#FF7A1A';
const FLAME = '#FFB13B';
const RED = '#E5432F';
const OK = '#3FBF5F';
const INK = '#F6EFE6';
const DIM = 'rgba(246,239,230,0.6)';
const P = (n: string) => staticFile(`permisfeu/${n}.jpg`);
const DEF = 3.0;
const QUAND = 18.6;
const SERT = 41.9;
const SURV = 79.6;
const EX = 94.9;
const STAT = 122.8;
const OUTRO_AT = 132.8;
export const PERMISFEU_FRAMES = s(OUTRO_AT + 3.8);

const At: React.FC<{x: number; y: number; children: React.ReactNode; style?: React.CSSProperties}> = ({x, y, children, style}) => (
  <div style={{position: 'absolute', left: x, top: y, transform: 'translate(-50%, -50%)', ...style}}>{children}</div>
);
const pop = (t: number, at: number, d = 0.35) => prog(t, at, at + d, easeOut);
const T: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 34, color = INK, style}) => (
  <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: size, color, textTransform: 'uppercase', letterSpacing: -0.5, textAlign: 'center', lineHeight: 1.05, ...style}}>{children}</div>
);
/** Titre qui s'allume lettre à lettre (lueur de braise). */
const Glow: React.FC<{text: string; at: number; until?: number; y: number; size?: number; color?: string}> = ({text, at, until = 9999, y, size = 84, color = INK}) => {
  const t = useT();
  if (t < at || t > until + 0.4) return null;
  const out = prog(t, until, until + 0.4, easeIn);
  return (
    <div style={{position: 'absolute', left: 60, right: 60, top: y, transform: 'translateY(-50%)', textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: size, lineHeight: 1.04, textTransform: 'uppercase', letterSpacing: -1, opacity: 1 - out}}>
      {text.split(' ').map((word, wi, arr) => {
        const base = arr.slice(0, wi).reduce((a, w) => a + w.length + 1, 0);
        return (
          <span key={wi} style={{display: 'inline-block', whiteSpace: 'nowrap', marginRight: wi < arr.length - 1 ? size * 0.26 : 0}}>
            {[...word].map((ch, j) => {
              const i = base + j;
              const p = prog(t, at + i * 0.022, at + i * 0.022 + 0.35, easeOut);
              const hot = 1 - prog(t, at + i * 0.022 + 0.2, at + i * 0.022 + 0.9);
              return <span key={j} style={{color: hot > 0.05 ? FLAME : color, opacity: p, textShadow: `0 0 ${24 * hot + 6}px rgba(255,122,26,${0.35 + 0.5 * hot})`, display: 'inline-block', transform: `translateY(${(1 - p) * 30}px)`}}>{ch}</span>;
            })}
          </span>
        );
      })}
    </div>
  );
};

/* ─────────── Décor : nuit chaude + braises qui montent ─────────── */
const Night: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 85%, #3A1E10 0%, #1B1310 45%, #0E0B0A 100%)'}}>
      <AbsoluteFill style={{backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1.5px, transparent 1.5px)', backgroundSize: '36px 36px'}} />
      {Array.from({length: 46}, (_, k) => {
        const sp = 0.05 + random(`e${k}`) * 0.08;
        const ph = (t * sp + random(`p${k}`)) % 1;
        const x = random(`x${k}`) * 1080 + Math.sin(t * (0.6 + random(`w${k}`)) + k) * 30;
        const sz = 3 + random(`s${k}`) * 6;
        return <div key={k} style={{position: 'absolute', left: x, top: 1920 - ph * 2100, width: sz, height: sz, borderRadius: sz, background: k % 3 ? EMBER : FLAME, boxShadow: `0 0 ${sz * 3}px ${EMBER}`, opacity: Math.sin(ph * Math.PI) * 0.75}} />;
      })}
      <div style={{position: 'absolute', left: '50%', top: 95, transform: 'translateX(-50%)', background: 'rgba(255,255,255,0.94)', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.4)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div>
    </AbsoluteFill>
  );
};

/** Photo avec cadre fin, grain et travelling lent. */
const Shot: React.FC<{n: string; w: number; h: number; at: number; pos?: string; style?: React.CSSProperties; filter?: string; zoom?: number}> = ({n, w, h, at, pos = '50% 50%', style, filter, zoom = 0.1}) => {
  const t = useT();
  const k = 1 + zoom * Math.min(1, Math.max(0, (t - at) / 7));
  return (
    <div style={{width: w, height: h, borderRadius: 26, overflow: 'hidden', position: 'relative', boxShadow: '0 30px 70px rgba(0,0,0,0.55), 0 0 0 2px rgba(255,177,59,0.25)', ...style}}>
      <Img src={P(n)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${k})`, filter}} />
      <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.45))'}} />
    </div>
  );
};

/* ─────────── 0 : allumette qui s'enflamme ─────────── */
const Match: React.FC = () => {
  const t = useT();
  const strike = prog(t, 0.0, 0.45, easeIn);
  const lit = t > 0.45;
  const fl = Math.sin(t * 22) * 0.06 + Math.sin(t * 13) * 0.05;
  const out = prog(t, 2.6, 3.1, easeIn);
  return (
    <AbsoluteFill style={{opacity: 1 - out}}>
      {lit && <AbsoluteFill style={{background: `radial-gradient(circle at 540px 760px, rgba(255,140,40,${0.35 * pop(t, 0.45, 0.4)}) 0%, transparent 45%)`}} />}
      <At x={540 + (1 - strike) * 260} y={880 + (1 - strike) * 120} style={{transform: `translate(-50%, -50%) rotate(${-18 + strike * 18}deg)`}}>
        <div style={{position: 'relative', width: 40, height: 520}}>
          <div style={{position: 'absolute', left: 6, top: 60, width: 28, height: 460, borderRadius: 6, background: 'linear-gradient(90deg, #D9B98A, #F2DDB8, #C9A777)'}} />
          <div style={{position: 'absolute', left: 0, top: 10, width: 40, height: 70, borderRadius: '50% 50% 45% 45%', background: lit ? '#3A1A10' : '#B3261E'}} />
          {lit && (
            <div style={{position: 'absolute', left: -50, top: -170, width: 140, height: 230, transform: `scale(${pop(t, 0.45, 0.25) * (1 + fl)}, ${pop(t, 0.45, 0.25) * (1 - fl)})`, transformOrigin: '50% 100%'}}>
              <div style={{position: 'absolute', inset: 0, borderRadius: '50% 50% 45% 45% / 65% 65% 35% 35%', background: 'radial-gradient(ellipse at 50% 75%, #FFF6C8 0%, #FFC94A 30%, #FF7A1A 60%, rgba(229,67,47,0) 75%)', filter: 'blur(2px)'}} />
            </div>
          )}
        </div>
      </At>
      {!lit && <div style={{position: 'absolute', left: 300, top: 1040, width: 480, height: 26, borderRadius: 13, background: '#4A2A1C'}} />}
      {lit && Array.from({length: 14}, (_, k) => {
        const q = prog(t, 0.45, 1.2, easeOut);
        const a = (k / 14) * Math.PI * 2;
        return <div key={k} style={{position: 'absolute', left: 540 + Math.cos(a) * 220 * q, top: 700 + Math.sin(a) * 220 * q, width: 8, height: 8, borderRadius: 4, background: FLAME, opacity: 1 - q, boxShadow: `0 0 12px ${EMBER}`}} />;
      })}
      <Glow text="C'est quoi" at={0.5} until={2.6} y={1170} size={70} color={DIM} />
      <Glow text="un permis de feu ?" at={0.8} until={2.6} y={1320} size={96} />
    </AbsoluteFill>
  );
};

/* ─────────── 1 : définition — document qui apparaît par un bord qui brûle ─────────── */
const burnPoly = (r: number, cx: number, cy: number, seed: string) => {
  const pts: string[] = [];
  for (let k = 0; k < 72; k++) {
    const a = (k / 72) * Math.PI * 2;
    const j = 1 + (random(`${seed}${k}`) - 0.5) * 0.16;
    pts.push(`${cx + Math.cos(a) * r * j}px ${cy + Math.sin(a) * r * j}px`);
  }
  return `polygon(${pts.join(',')})`;
};
const Definition: React.FC = () => {
  const t = useT();
  const burn = prog(t, DEF + 0.4, DEF + 2.4, easeInOut) * 1300;
  const hazards: [string, string, number][] = [['Flamme', 'flamme', 9.0], ['Étincelles', 'soudeur-etincelles', 9.85], ['Forte chaleur', 'chalumeau', 10.6]];
  const goal = t >= 11.9;
  const shock = prog(t, 13.7, 14.9, easeOut);
  return (
    <AbsoluteFill>
      {!goal && (
        <>
          <At x={540} y={700}>
            <div style={{position: 'relative', width: 760, height: 760}}>
              <div style={{position: 'absolute', inset: -30, clipPath: burnPoly(burn + 26, 410, 410, 'b'), background: `radial-gradient(circle, ${FLAME}, ${EMBER} 70%, ${RED})`, filter: 'blur(6px)', opacity: burn < 1250 ? 1 : 0}} />
              <div style={{position: 'absolute', inset: 0, clipPath: burnPoly(burn, 380, 380, 'b'), background: '#F6EEDD', borderRadius: 18, padding: '50px 56px', boxSizing: 'border-box', boxShadow: '0 30px 80px rgba(0,0,0,0.6)'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
                  <div style={{width: 90, height: 80, clipPath: 'polygon(50% 0, 100% 100%, 0 100%)', background: RED, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 40}}>!</div>
                  <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 60, color: '#B3261E'}}>PERMIS DE FEU</div>
                </div>
                <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 30, color: '#6B5B4A', marginTop: 8}}>Autorisation écrite de sécurité</div>
                {['Zone et intervention identifiées', 'Évaluation des risques', 'Mesures de sécurité', 'Surveillance après travaux', 'Signatures'].map((l, k) => (
                  <div key={l} style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: k ? 22 : 40}}>
                    <div style={{width: 34, height: 34, borderRadius: 8, border: '4px solid #6B5B4A'}} />
                    <div style={{fontFamily: handFont, fontSize: 40, color: '#2B2420'}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </At>
          <Glow text="Une autorisation écrite" at={4.1} until={8.4} y={1260} size={74} />
          <Glow text="Avant les travaux qui produisent…" at={6.7} until={11.7} y={1260} size={58} color={DIM} />
          <div style={{position: 'absolute', left: 60, right: 60, top: 1330, display: 'flex', justifyContent: 'center', gap: 24}}>
            {hazards.map(([l, n, at]) => {
              const p = pop(t, at, 0.4);
              return p > 0 ? (
                <div key={l} style={{opacity: p, transform: `translateY(${(1 - p) * 60}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>
                  <Shot n={n} w={280} h={200} at={at} pos={n === 'flamme' ? '50% 45%' : '50% 50%'} />
                  <T size={30} color={FLAME}>{l}</T>
                </div>
              ) : null;
            })}
          </div>
        </>
      )}
      {goal && (
        <AbsoluteFill style={{opacity: pop(t, 12.0)}}>
          <Glow text="Son but : empêcher" at={12.0} until={18.2} y={420} size={78} />
          {[0, 1, 2].map((k) => <div key={k} style={{position: 'absolute', left: 540 - 520 * shock - k * 60, top: 900 - 520 * shock - k * 60, width: (520 * shock + k * 60) * 2, height: (520 * shock + k * 60) * 2, borderRadius: '50%', border: `${10 - k * 3}px solid rgba(255,122,26,${(1 - shock) * 0.8})`}} />)}
          <div style={{position: 'absolute', left: 0, right: 0, top: 760, display: 'flex', justifyContent: 'center', gap: 40}}>
            {[['Incendie', 13.3], ['Explosion', 14.1]].map(([l, at]) => {
              const p = pop(t, at as number, 0.3);
              const x = prog(t, (at as number) + 0.5, (at as number) + 0.8);
              return (
                <div key={l as string} style={{position: 'relative', padding: '24px 40px', borderRadius: 24, border: `4px solid ${RED}`, background: 'rgba(229,67,47,0.15)', transform: `scale(${p})`}}>
                  <T size={54} color={RED}>{l}</T>
                  <div style={{position: 'absolute', left: -10, right: -10, top: '50%', height: 10, borderRadius: 5, background: INK, transform: `rotate(-8deg) scaleX(${x})`}} />
                </div>
              );
            })}
          </div>
          <At x={540} y={1180} style={{transform: `translate(-50%, -50%) scale(${pop(t, 15.6, 0.5)})`}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 22, padding: '26px 40px', borderRadius: 30, background: 'rgba(63,191,95,0.15)', border: `4px solid ${OK}`}}>
              <Check p={prog(t, 16.0, 16.6)} size={90} color={OK} />
              <T size={44} color={INK} style={{textAlign: 'left'}}>Zone et intervention<br />sécurisées</T>
            </div>
          </At>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── 2 : quand ? Cylindre 3D de photos + distorsion de chaleur ─────────── */
const WORKS: [string, string, number][] = [
  ['Soudage à l’arc ou au gaz', 'soudeur-etincelles', 24.4],
  ['Découpage au chalumeau', 'chalumeau', 26.1],
  ['Oxycoupage', 'decoupeuse', 27.86],
  ['Meulage', 'meuleuse', 29.18],
  ['Tronçonnage', 'tronconneuse', 29.74],
  ['Disqueuse', 'decoupeuse', 30.4],
  ['Brasage, soudage à l’étain', 'chalumeau', 31.7],
  ['Étanchéité au bitume', 'flamme', 33.92],
];
const When: React.FC = () => {
  const t = useT();
  const idx = WORKS.reduce((a, w, i) => (t >= w[2] - 0.2 ? i : a), 0);
  const rot = WORKS.reduce((a, w, i) => a + (i ? prog(t, w[2] - 0.35, w[2] + 0.1, easeInOut) : 0), 0);
  const step = 360 / WORKS.length;
  const R = 640;
  const shimmer = t >= 36.6;
  const seed = Math.floor(t * 12);
  return (
    <AbsoluteFill>
      <svg width={0} height={0} style={{position: 'absolute'}}>
        <filter id="heat"><feTurbulence type="fractalNoise" baseFrequency={`0.012 ${0.04 + Math.sin(t * 3) * 0.01}`} numOctaves={2} seed={seed} /><feDisplacementMap in="SourceGraphic" scale={shimmer ? 14 + 10 * Math.sin(t * 5) : 0} /></filter>
      </svg>
      <Glow text="Quand l’utilise-t-on ?" at={QUAND + 0.2} until={20.3} y={420} size={80} />
      <Glow text="Travaux par points chauds" at={20.5} until={36.6} y={400} size={74} color={FLAME} />
      <Glow text="Étincelles, flamme nue, surface très chaude" at={36.8} y={400} size={60} />
      {!shimmer && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 560, height: 900, perspective: 2200, opacity: pop(t, 21.0, 0.6)}}>
          <div style={{position: 'absolute', left: 540, top: 450, transformStyle: 'preserve-3d', transform: `translateZ(${-R}px) rotateY(${-rot * step}deg)`}}>
            {WORKS.map(([l, n], i) => {
              const d = Math.abs(i - rot);
              return (
                <div key={i} style={{position: 'absolute', left: -310, top: -380, width: 620, height: 760, transform: `rotateY(${i * step}deg) translateZ(${R}px)`, backfaceVisibility: 'hidden', opacity: d < 1.6 ? 1 - d * 0.45 : 0}}>
                  <Shot n={n} w={620} h={620} at={WORKS[i][2]} pos={n === 'flamme' ? '50% 45%' : '50% 50%'} />
                  <T size={40} color={i === idx ? FLAME : DIM} style={{marginTop: 22}}>{l}</T>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {!shimmer && <div style={{position: 'absolute', left: 0, right: 0, top: 1520, display: 'flex', justifyContent: 'center', gap: 14}}>{WORKS.map((_, i) => <div key={i} style={{width: i === idx ? 46 : 14, height: 14, borderRadius: 7, background: i === idx ? EMBER : 'rgba(246,239,230,0.25)'}} />)}</div>}
      {shimmer && (
        <AbsoluteFill style={{opacity: pop(t, 36.7)}}>
          <At x={540} y={950}>
            <div style={{filter: 'url(#heat)'}}><Shot n="soudeur-fumees" w={940} h={900} at={36.7} zoom={0.12} /></div>
          </At>
          {[['Étincelles', 38.2], ['Flamme nue', 39.1], ['Surface très chaude', 40.0]].map(([l, at], k) => (
            <div key={l as string} style={{position: 'absolute', left: 120 + k * 0, top: 1100 + k * 110, padding: '12px 24px', borderRadius: 40, background: 'rgba(14,11,10,0.75)', border: `3px solid ${EMBER}`, opacity: pop(t, at as number), transform: `translateX(${(1 - pop(t, at as number, 0.4)) * -120}px)`}}><T size={36} color={FLAME}>{l}</T></div>
          ))}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── 3 : à quoi sert-il ? ─────────── */
const PHASES: [string, number][] = [['Avant', 46.14], ['Pendant', 46.78], ['Après', 47.42]];
const ITEMS: [string, string, number, number][] = [['Cartons', 'colis', 50.7, 0], ['Carburant', 'goutte', 51.34, 1], ['Poussière, gaz', 'vapeur', 53.0, 2], ['Combustibles', 'feu', 54.6, 3]];
const Purpose: React.FC = () => {
  const t = useT();
  const plan = t >= 49.2 && t < 56.3;
  const hidden = t >= 56.3 && t < 65.0;
  const ext = t >= 65.0 && t < 69.8;
  const roles = t >= 69.8 && t < 76.0;
  const stop = t >= 76.0;
  const sweep = prog(t, 49.6, 55.2, (v) => v);
  return (
    <AbsoluteFill>
      <Glow text="À quoi sert-il ?" at={SERT + 0.2} until={43.7} y={420} size={86} />
      {t < 49.2 && (
        <AbsoluteFill style={{opacity: pop(t, 43.8) * (1 - prog(t, 48.8, 49.2))}}>
          <Glow text="Vérifier les risques" at={43.9} y={420} size={78} />
          <div style={{position: 'absolute', left: 80, right: 80, top: 680, height: 16, borderRadius: 8, background: 'rgba(246,239,230,0.15)'}}><div style={{width: `${prog(t, 46.1, 48.2) * 100}%`, height: '100%', borderRadius: 8, background: `linear-gradient(90deg, ${OK}, ${FLAME}, ${EMBER})`}} /></div>
          {PHASES.map(([l, at], k) => (
            <At key={l} x={180 + k * 360} y={900} style={{transform: `translate(-50%, -50%) scale(${pop(t, at, 0.35)})`}}>
              <div style={{width: 280, height: 280, borderRadius: 40, background: 'rgba(255,255,255,0.06)', border: `4px solid ${[OK, FLAME, EMBER][k]}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14}}>
                <F n={['clipboard', 'casque', 'loupe'][k]} size={120} />
                <T size={44} color={[OK, FLAME, EMBER][k]}>{l}</T>
              </div>
            </At>
          ))}
        </AbsoluteFill>
      )}
      {plan && (
        <AbsoluteFill style={{opacity: pop(t, 49.3)}}>
          <Glow text="Retirer ou protéger les combustibles" at={49.4} y={400} size={62} />
          {/* plan vu du dessus : rayon d'exclusion autour du point chaud */}
          <At x={540} y={1000}>
            <div style={{position: 'relative', width: 940, height: 940, borderRadius: 40, background: '#1F2A33', backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.05) 2px, transparent 2px)', backgroundSize: '47px 47px', overflow: 'hidden'}}>
              <div style={{position: 'absolute', left: 470 - 340, top: 470 - 340, width: 680, height: 680, borderRadius: '50%', border: `4px dashed ${EMBER}`, background: 'radial-gradient(circle, rgba(255,122,26,0.18), rgba(255,122,26,0.03))'}} />
              <div style={{position: 'absolute', left: 470, top: 470, width: 680, height: 4, transformOrigin: '0 50%', transform: `rotate(${sweep * 720}deg)`, background: `linear-gradient(90deg, ${FLAME}, transparent)`, marginTop: -2}} />
              <At x={470} y={470}><div style={{width: 120, height: 120, borderRadius: 60, overflow: 'hidden', border: `5px solid ${FLAME}`, boxShadow: `0 0 40px ${EMBER}`}}><Img src={P('soudeur-etincelles')} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div></At>
              {ITEMS.map(([l, n, at, k]) => {
                const a = (k / 4) * Math.PI * 2 + 0.6;
                const away = prog(t, at + 0.6, at + 1.4, easeInOut);
                const r = 190 + away * 230;
                return (
                  <At key={l} x={470 + Math.cos(a) * r} y={470 + Math.sin(a) * r} style={{opacity: pop(t, at - 0.4)}}>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4}}>
                      <div style={{width: 110, height: 110, borderRadius: 24, background: away > 0.9 ? 'rgba(63,191,95,0.2)' : 'rgba(229,67,47,0.25)', border: `3px solid ${away > 0.9 ? OK : RED}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={n} size={76} /></div>
                      <T size={22}>{l}</T>
                    </div>
                  </At>
                );
              })}
              <div style={{position: 'absolute', right: 24, bottom: 20, display: 'flex', alignItems: 'center', gap: 14, opacity: pop(t, 53.0)}}>
                <Img src={P('aspirateur-fumees')} style={{width: 150, height: 130, objectFit: 'contain', background: '#fff', borderRadius: 16}} />
                <Img src={P('poumons-particules')} style={{width: 150, height: 130, objectFit: 'cover', objectPosition: '50% 30%', background: '#fff', borderRadius: 16}} />
              </div>
            </div>
          </At>
        </AbsoluteFill>
      )}
      {hidden && (
        <AbsoluteFill style={{opacity: pop(t, 56.4)}}>
          <Glow text="Repérer les zones cachées" at={56.5} y={400} size={74} />
          <At x={540} y={1020}>
            <svg width={920} height={900} viewBox="0 0 920 900">
              <path d="M60 300 L460 60 L860 300" fill="none" stroke="#6B5B4A" strokeWidth={22} />
              <path d="M120 300 L460 100 L800 300" fill="none" stroke="#3A2E26" strokeWidth={12} strokeDasharray="20 14" />
              <rect x={80} y={300} width={760} height={560} fill="rgba(255,255,255,0.04)" stroke="#6B5B4A" strokeWidth={14} />
              <rect x={430} y={300} width={60} height={560} fill="rgba(107,91,74,0.6)" />
              <rect x={600} y={320} width={50} height={540} rx={10} fill="none" stroke="#8A93A0" strokeWidth={8} />
              <path d="M100 760 C 300 740, 500 790, 820 760" fill="none" stroke="#C9A12C" strokeWidth={8} />
              {[['Cloison', 460, 560, 60.3], ['Toiture', 300, 200, 61.2], ['Gaine', 625, 520, 62.4], ['Câble', 260, 755, 62.9], ['Charpente', 640, 210, 63.6]].map(([l, x, y, at]) => {
                const p = pop(t, at as number, 0.4);
                const fl = 0.75 + Math.sin(t * 9 + (x as number)) * 0.25;
                return p > 0 ? (
                  <g key={l as string}>
                    <circle cx={x as number} cy={y as number} r={46 * p * fl} fill="rgba(255,122,26,0.35)" />
                    <circle cx={x as number} cy={y as number} r={16 * p} fill={FLAME} />
                    <text x={x as number} y={(y as number) - 64} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={34} fill={INK}>{(l as string).toUpperCase()}</text>
                  </g>
                ) : null;
              })}
            </svg>
          </At>
        </AbsoluteFill>
      )}
      {ext && (
        <AbsoluteFill style={{opacity: pop(t, 65.1)}}>
          <Glow text="Des moyens d’extinction adaptés" at={65.2} y={400} size={66} />
          <At x={540} y={1000} style={{transform: `translate(-50%, -50%) rotate(${(1 - pop(t, 65.6, 0.7)) * -25}deg) scale(${0.7 + 0.3 * pop(t, 65.6, 0.7)})`}}>
            <div style={{width: 640, height: 700, borderRadius: 40, background: '#fff', overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.6)'}}><Img src={P('extincteur')} style={{width: '100%', height: '100%', objectFit: 'contain'}} /></div>
          </At>
          {[['Disponible', 68.0], ['Vérifié', 68.6]].map(([l, at], k) => (
            <At key={l as string} x={300 + k * 480} y={1420} style={{transform: `translate(-50%, -50%) scale(${pop(t, at as number, 0.3)})`}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 12, padding: '14px 26px', borderRadius: 40, background: 'rgba(63,191,95,0.18)', border: `3px solid ${OK}`}}><Check p={1} size={50} color={OK} /><T size={36}>{l}</T></div>
            </At>
          ))}
        </AbsoluteFill>
      )}
      {roles && (
        <AbsoluteFill style={{opacity: pop(t, 69.9)}}>
          <Glow text="Qui fait quoi, et combien de temps" at={70.0} y={400} size={62} />
          {[['Réalise le travail', 'soudeur-fumees', 70.5], ['Surveille la zone', 'technicien', 72.1]].map(([l, n, at], k) => (
            <At key={l} x={290 + k * 500} y={900} style={{transform: `translate(-50%, -50%) translateY(${(1 - pop(t, at as number, 0.5)) * 200}px)`, opacity: pop(t, at as number)}}>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16}}>
                <Shot n={n as string} w={440} h={520} at={at as number} pos={k ? '62% 40%' : '50% 40%'} />
                <T size={34} color={k ? OK : FLAME}>{l}</T>
              </div>
            </At>
          ))}
          <At x={540} y={1360} style={{opacity: pop(t, 73.6)}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
              <svg width={130} height={130}><circle cx={65} cy={65} r={55} fill="none" stroke="rgba(246,239,230,0.2)" strokeWidth={12} /><circle cx={65} cy={65} r={55} fill="none" stroke={OK} strokeWidth={12} strokeLinecap="round" strokeDasharray={`${prog(t, 73.8, 75.6) * 345} 345`} transform="rotate(-90 65 65)" /></svg>
              <T size={40} style={{textAlign: 'left'}}>Surveillance<br />après la fin</T>
            </div>
          </At>
        </AbsoluteFill>
      )}
      {stop && (
        <AbsoluteFill style={{opacity: pop(t, 76.1)}}>
          <AbsoluteFill style={{background: `rgba(229,67,47,${t > 77.0 && t < 78.6 && Math.floor(t * 5) % 2 ? 0.14 : 0})`}} />
          <Glow text="Arrêter si ça devient dangereux" at={76.2} y={400} size={66} color={INK} />
          <At x={540} y={1000}>
            <div style={{position: 'relative', width: 520, height: 520}}>
              <div style={{position: 'absolute', inset: 40, borderRadius: 40, background: '#F2C230', boxShadow: '0 30px 60px rgba(0,0,0,0.5)'}} />
              <div style={{position: 'absolute', left: 110, top: 100 + pop(t, 77.0, 0.15) * 26, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle at 40% 35%, #FF6B5B, #B3261E 70%)', boxShadow: `0 ${30 - pop(t, 77.0, 0.15) * 22}px 0 #7A1712, 0 40px 60px rgba(0,0,0,0.4)`}} />
              <div style={{position: 'absolute', left: 0, right: 0, bottom: 60}}><T size={44} color="#3A2A00">ARRÊT</T></div>
            </div>
          </At>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── 4 : surveillance après travaux — accéléré du feu couvant ─────────── */
const Smolder: React.FC = () => {
  const t = useT();
  const spark = prog(t, 82.8, 84.0, easeIn);
  const smoke = prog(t, 85.0, 87.0);
  const ff = prog(t, 87.0, 88.8, easeIn);
  const fire = prog(t, 88.6, 89.4, easeOut);
  const watch = t >= 89.6;
  const hours = Math.floor(ff * 2) ;
  return (
    <AbsoluteFill>
      <Glow text="Pourquoi surveiller après ?" at={SURV + 0.2} until={82.5} y={420} size={78} />
      <Glow text="Un feu couvant…" at={82.7} until={86.7} y={420} size={86} color={FLAME} />
      <Glow text="… qui se déclare plus tard" at={86.8} until={89.5} y={420} size={78} color={RED} />
      {!watch && (
        <>
          {/* carton */}
          <At x={540} y={1150}>
            <div style={{position: 'relative', width: 520, height: 380}}>
              <div style={{position: 'absolute', inset: 0, borderRadius: 14, background: 'linear-gradient(180deg, #C89A5E, #A9783F)', boxShadow: '0 30px 60px rgba(0,0,0,0.5)'}} />
              <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 60, background: '#B9884C', borderRadius: '14px 14px 0 0'}} />
              {spark >= 1 && <div style={{position: 'absolute', left: 300, top: 40, width: 40 + 30 * smoke, height: 20 + 10 * smoke, borderRadius: '50%', background: `radial-gradient(circle, #FFD27A, ${EMBER} 40%, #3A1A10 80%)`, opacity: 0.7 + Math.sin(t * 8) * 0.3}} />}
              {fire > 0 && <div style={{position: 'absolute', left: 60, right: 60, top: -300 * fire, height: 340 * fire, borderRadius: '50% 50% 20% 20% / 70% 70% 30% 30%', background: 'radial-gradient(ellipse at 50% 85%, #FFF3C0 0%, #FFB13B 30%, #FF7A1A 55%, rgba(229,67,47,0) 78%)', filter: 'blur(3px)', transform: `scaleX(${1 + Math.sin(t * 14) * 0.05})`}} />}
            </div>
          </At>
          {spark < 1 && <div style={{position: 'absolute', left: 540 + 60 * spark, top: 600 + spark * 590, width: 14, height: 14, borderRadius: 7, background: FLAME, boxShadow: `0 0 20px 6px ${EMBER}`}} />}
          {smoke > 0 && Array.from({length: 7}, (_, k) => {
            const q = ((t * 0.5 + k / 7) % 1);
            return <div key={k} style={{position: 'absolute', left: 820 + Math.sin(q * 6 + k) * 40 - 60 * q, top: 1150 - q * 520, width: 60 + q * 140, height: 60 + q * 140, borderRadius: '50%', background: 'rgba(200,200,200,0.12)', filter: 'blur(14px)', opacity: smoke * (1 - q)}} />;
          })}
          {/* horloge accélérée */}
          <At x={540} y={1530} style={{opacity: pop(t, 86.9)}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 16, padding: '12px 26px', borderRadius: 40, background: 'rgba(14,11,10,0.8)', border: `3px solid ${FLAME}`}}>
              <div style={{fontSize: 40, color: FLAME, fontFamily: sansFont, fontWeight: 900}}>▶▶</div>
              <div style={{fontFamily: 'monospace', fontSize: 44, color: INK}}>+{String(hours).padStart(1, '0')} h {String(Math.floor((ff * 120) % 60)).padStart(2, '0')} min</div>
            </div>
          </At>
        </>
      )}
      {watch && (
        <AbsoluteFill style={{opacity: pop(t, 89.7)}}>
          <Glow text="La surveillance : une partie essentielle" at={89.8} y={420} size={62} />
          <At x={540} y={950}><Shot n="technicien" w={940} h={640} at={89.8} pos="62% 40%" /></At>
          <At x={540} y={1400} style={{transform: `translate(-50%, -50%) scale(${pop(t, 92.4, 0.4)})`}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 16, padding: '18px 34px', borderRadius: 40, background: 'rgba(63,191,95,0.18)', border: `4px solid ${OK}`}}><Check p={prog(t, 92.6, 93.0)} size={60} color={OK} /><T size={40}>Zone surveillée après travaux</T></div>
          </At>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── 5 : exemple — planche de BD photo, puis permis cadenassé / validé ─────────── */
const PANELS: [string, string, number, string][] = [
  ['Un soudeur répare une barrière près d’un stock de cartons', 'soudeur-fumees', 96.6, '50% 40%'],
  ['Cartons éloignés ou couverture anti-feu', 'decoupeuse', 103.9, '40% 40%'],
  ['Aucun produit inflammable à proximité', 'flamme', 107.1, '50% 45%'],
  ['Extincteur à portée de main', 'extincteur', 110.2, '50% 50%'],
  ['Un surveillant des étincelles', 'technicien', 112.8, '62% 40%'],
  ['Contrôle de la zone après soudage', 'soudeur-etincelles', 115.8, '50% 50%'],
];
const Example: React.FC = () => {
  const t = useT();
  const gate = t >= 118.9;
  const unlock = prog(t, 121.0, 121.6, easeOut);
  return (
    <AbsoluteFill>
      <Glow text="Exemple très simple" at={EX + 0.2} until={96.4} y={400} size={86} color={FLAME} />
      {!gate && (
        <div style={{position: 'absolute', left: 50, right: 50, top: 300, bottom: 300, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'repeat(3, 1fr)', gap: 18}}>
          {PANELS.map(([l, n, at, pos], k) => {
            const p = pop(t, at, 0.45);
            const active = t >= at && (k === PANELS.length - 1 || t < PANELS[k + 1][2]);
            return (
              <div key={k} style={{position: 'relative', borderRadius: 18, overflow: 'hidden', background: '#1A1512', border: `5px solid ${active ? FLAME : 'rgba(246,239,230,0.85)'}`, transform: `scale(${0.85 + 0.15 * p}) rotate(${(k % 2 ? 1 : -1) * (1 - p) * 6}deg)`, opacity: p, boxShadow: active ? `0 0 40px rgba(255,122,26,0.5)` : 'none'}}>
                <Img src={P(n)} style={{width: '100%', height: '100%', objectFit: n === 'extincteur' ? 'contain' : 'cover', objectPosition: pos, background: n === 'extincteur' ? '#fff' : undefined, filter: active ? 'none' : 'saturate(0.6) brightness(0.8)'}} />
                <div style={{position: 'absolute', left: 10, top: 10, width: 54, height: 54, borderRadius: 27, background: active ? FLAME : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#1A1512'}}>{k + 1}</div>
                <div style={{position: 'absolute', left: 10, right: 10, bottom: 10, background: '#FFF8E8', borderRadius: 12, padding: '8px 12px', fontFamily: handFont, fontSize: 30, color: '#2B2420', lineHeight: 1.05, boxShadow: '0 4px 10px rgba(0,0,0,0.3)'}}>{l}</div>
              </div>
            );
          })}
        </div>
      )}
      {gate && (
        <AbsoluteFill style={{opacity: pop(t, 119.0)}}>
          <Glow text="Sans ces vérifications…" at={119.1} until={120.5} y={400} size={78} />
          <Glow text="… le travail ne commence pas" at={120.6} y={400} size={74} color={FLAME} />
          <At x={540} y={1000}>
            <div style={{position: 'relative', width: 700, height: 820, borderRadius: 24, background: '#F6EEDD', padding: '50px 56px', boxSizing: 'border-box', boxShadow: '0 40px 80px rgba(0,0,0,0.6)'}}>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: '#B3261E'}}>PERMIS DE FEU</div>
              {['Combustibles éloignés', 'Extincteur en place', 'Surveillant désigné', 'Contrôle après travaux'].map((l, k) => (
                <div key={l} style={{display: 'flex', alignItems: 'center', gap: 16, marginTop: k ? 24 : 40}}>
                  <Check p={prog(t, 119.6 + k * 0.3, 119.9 + k * 0.3)} size={56} color="#2E9B3E" />
                  <div style={{fontFamily: handFont, fontSize: 44, color: '#2B2420'}}>{l}</div>
                </div>
              ))}
              {/* cadenas qui s'ouvre puis tampon */}
              <div style={{position: 'absolute', right: 40, bottom: 40, width: 150, height: 170, opacity: 1 - prog(t, 121.6, 122.0)}}>
                <div style={{position: 'absolute', left: 30, top: -unlock * 40, width: 90, height: 90, borderRadius: '45px 45px 0 0', border: '16px solid #8A93A0', borderBottom: 'none', transform: `rotate(${unlock * -20}deg)`, transformOrigin: '0 100%'}} />
                <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 100, borderRadius: 18, background: '#B3261E'}} />
              </div>
              {t > 121.7 && <div style={{position: 'absolute', right: 30, bottom: 50, transform: `scale(${2 - pop(t, 121.7, 0.25)}) rotate(-10deg)`, opacity: pop(t, 121.7, 0.25), border: '9px solid #2E9B3E', color: '#2E9B3E', borderRadius: 16, padding: '4px 22px', fontFamily: sansFont, fontWeight: 900, fontSize: 60, background: 'rgba(255,255,255,0.85)'}}>VALIDÉ</div>}
            </div>
          </At>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── 6 : 30 % — dix allumettes, trois s'allument ─────────── */
const Stat: React.FC = () => {
  const t = useT();
  const lit = [2, 5, 8];
  const count = Math.round(30 * prog(t, 129.6, 130.6, easeOut));
  return (
    <AbsoluteFill>
      <Glow text="Une source importante d’incendie" at={STAT + 0.2} until={127.6} y={420} size={70} />
      <div style={{position: 'absolute', left: 90, right: 90, top: 700, height: 520, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
        {Array.from({length: 10}, (_, k) => {
          const on = lit.includes(k) && t > 129.6 + lit.indexOf(k) * 0.3;
          const fl = Math.sin(t * 20 + k) * 0.08;
          return (
            <div key={k} style={{position: 'relative', width: 40, height: 420, opacity: pop(t, STAT + 0.4 + k * 0.06)}}>
              <div style={{position: 'absolute', left: 8, top: 50, width: 24, height: 370, borderRadius: 6, background: 'linear-gradient(90deg, #D9B98A, #F2DDB8, #C9A777)'}} />
              <div style={{position: 'absolute', left: 2, top: 0, width: 36, height: 64, borderRadius: '50% 50% 45% 45%', background: on ? '#3A1A10' : '#B3261E'}} />
              {on && <div style={{position: 'absolute', left: -38, top: -150, width: 116, height: 190, borderRadius: '50% 50% 45% 45% / 65% 65% 35% 35%', background: 'radial-gradient(ellipse at 50% 75%, #FFF6C8 0%, #FFC94A 30%, #FF7A1A 60%, rgba(229,67,47,0) 75%)', filter: 'blur(2px)', transform: `scale(${1 + fl}, ${1 - fl})`, transformOrigin: '50% 100%'}} />}
            </div>
          );
        })}
      </div>
      <At x={540} y={1360} style={{opacity: pop(t, 129.4)}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 210, color: FLAME, lineHeight: 1, textShadow: `0 0 40px ${EMBER}`}}>{count} %</div></At>
      <At x={540} y={1490} style={{opacity: pop(t, 130.4)}}><T size={34}>des origines d’incendie en entreprise</T></At>
      <At x={540} y={1560} style={{opacity: pop(t, 130.8)}}><T size={24} color={DIM}>Source : INRS, citée par la vidéo d’origine</T></At>
    </AbsoluteFill>
  );
};

/** Fondu de la nuit vers le papier de la signature de fin. */
const OutroFade: React.FC = () => {
  const t = useT();
  const p = prog(t, OUTRO_AT - 0.6, OUTRO_AT, easeInOut);
  return p > 0 ? <AbsoluteFill style={{background: 'linear-gradient(180deg, #FBFAF6 0%, #F1EDE3 100%)', opacity: p}} /> : null;
};

/* ─────────── Son ─────────── */
const CUTS = [DEF, QUAND, SERT, SURV, EX, STAT];
const CUES: Sfx[] = [
  {at: 0.0, s: 'sfx/swish', v: 0.55},
  {at: 0.45, s: 'bass-hit', v: 0.5},
  {at: 0.5, s: 'tension', v: 0.2, dur: 2},
  ...CUTS.map((at) => ({at: at - 0.2, s: 'soft-whoosh', v: 0.5})),
  {at: DEF + 0.4, s: 'riser', v: 0.25, dur: 2},
  {at: DEF + 2.4, s: 'page', v: 0.5},
  ...[9.0, 9.85, 10.6].map((at) => ({at, s: 'sfx/pop', v: 0.4})),
  {at: 13.3, s: 'deep-hit', v: 0.5},
  {at: 13.7, s: 'bass-hit', v: 0.5},
  {at: 16.0, s: 'validation', v: 0.45},
  ...WORKS.map(([, , at], i) => ({at: at - 0.35, s: i ? 'sfx/swish' : 'sfx/whoosh', v: 0.38})),
  ...WORKS.map(([, , at]) => ({at: at + 0.05, s: 'sfx/click', v: 0.35})),
  {at: 36.7, s: 'tension', v: 0.25, dur: 4},
  ...[38.2, 39.1, 40.0].map((at) => ({at, s: 'sfx/pop', v: 0.35})),
  ...PHASES.map(([, at]) => ({at, s: 'tick', v: 0.5})),
  {at: 49.6, s: 'riser', v: 0.2, dur: 5.5},
  ...ITEMS.map(([, , at]) => ({at: at + 0.6, s: 'sfx/whoosh', v: 0.35})),
  ...[60.3, 61.2, 62.4, 62.9, 63.6].map((at) => ({at, s: 'sfx/ding', v: 0.25})),
  {at: 65.6, s: 'sfx/whoosh', v: 0.45},
  ...[68.0, 68.6].map((at) => ({at, s: 'validation', v: 0.35})),
  ...[70.5, 72.1].map((at) => ({at, s: 'sfx/pop', v: 0.4})),
  {at: 73.8, s: 'tick', v: 0.4},
  {at: 77.0, s: 'cadenas', v: 0.6},
  {at: 77.05, s: 'alarme', v: 0.16, dur: 1.4},
  {at: 82.8, s: 'sfx/swish', v: 0.35},
  {at: 84.0, s: 'sfx/thud', v: 0.35},
  {at: 85.0, s: 'tension', v: 0.25, dur: 3.5},
  ...Array.from({length: 8}, (_, k) => ({at: 87.0 + k * 0.22, s: 'tick', v: 0.35})),
  {at: 88.6, s: 'bass-hit', v: 0.55},
  {at: 92.4, s: 'validation', v: 0.45},
  ...PANELS.map(([, , at]) => ({at, s: 'page', v: 0.45})),
  ...[119.6, 119.9, 120.2, 120.5].map((at) => ({at, s: 'tick', v: 0.45})),
  {at: 121.0, s: 'cadenas', v: 0.55},
  {at: 121.7, s: 'tampon', v: 0.7},
  ...[129.6, 129.9, 130.2].map((at) => ({at, s: 'sfx/swish', v: 0.4})),
  {at: 130.6, s: 'deep-hit', v: 0.5},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const PermisFeu: React.FC = () => (
  <AbsoluteFill>
    <Night />
    <Gate from={0} to={DEF}><Match /></Gate>
    <Gate from={DEF} to={QUAND}><Definition /></Gate>
    <Gate from={QUAND} to={SERT}><When /></Gate>
    <Gate from={SERT} to={SURV}><Purpose /></Gate>
    <Gate from={SURV} to={EX}><Smolder /></Gate>
    <Gate from={EX} to={STAT}><Example /></Gate>
    <Gate from={STAT} to={OUTRO_AT}><Stat /></Gate>
    <OutroFade />
    <Gate from={OUTRO_AT} to={999}><Outro at={OUTRO_AT} logo={LOGO} /></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0} to={OUTRO_AT}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-permis-feu-origine.m4a')} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);
