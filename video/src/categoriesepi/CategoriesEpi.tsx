import React from 'react';
import {AbsoluteFill, Audio, Img, random, staticFile} from 'remotion';
import {easeIn, easeInOut, easeOut, Gate, prog, useT} from '../anim';
import {Captions} from '../components/Captions';
import {Check} from '../identui/IdentUi';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {handFont, s, sansFont} from '../theme';
import {captions} from './captions';

/**
 * « Comment comprendre les catégories d'EPI » (60 s) — voix d'origine, sous-titres recalés mot à mot.
 * Visuels originaux générés par IA (public/categoriesepi/) : technicien en tenue de catégorie 3, technicien face au
 * fût de solvant corrosif, compositions d'EPI de catégorie 1 et 2.
 * Montage : couverture titrée qui plonge dans la visière (zoom traversant), grain argentique et halos de lumière,
 * fil rouge « jauge de gravité » 1 → 2 → 3 sous l'en-tête, procès-verbal arraché qui révèle un moniteur cardiaque,
 * mise au point de caméra (flou → net) sur les photos, vapeurs corrosives en particules, scanner holographique,
 * cartes 3D qui basculent, barre « par exclusion » dont les extrémités tombent, gyrophare de la catégorie 3,
 * dé barré, verdict tamponné.
 */
const LOGO = 'promo/logo.png';
const OUTRO_AT = 60.3;
export const CATEGORIESEPI_FRAMES = s(OUTRO_AT + 3.8);

const BG = '#0A1322';
const INK = '#0D1726';
const LIGHT = '#F4F7FB';
const DIM = 'rgba(244,247,251,0.68)';
const C1 = '#2ED18B';
const C2 = '#FFB627';
const C3 = '#FF4D4D';
const SKY = '#4DA8FF';
const CAT = [C1, C2, C3];
const PH = (p: string) => staticFile(`categoriesepi/${p}`);

const pop = (t: number, at: number, d = 0.4) => prog(t, at, at + d, easeOut);
const spring = (t: number, at: number, k = 7, w = 15) => {
  const x = t - at;
  return x <= 0 ? 0 : 1 - Math.exp(-x * k) * Math.cos(x * w);
};
const win = (t: number, a: number, b: number, f = 0.4) => prog(t, a, a + f) * (1 - prog(t, b - f, b));
const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

const T: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 40, color = LIGHT, style}) => (
  <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: size, color, letterSpacing: -0.5, lineHeight: 1.05, ...style}}>{children}</div>
);
const Hand: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 48, color = LIGHT, style}) => (
  <div style={{fontFamily: handFont, fontSize: size, color, lineHeight: 1.1, ...style}}>{children}</div>
);
const Abs: React.FC<{x: number; y: number; w?: number; h?: number; children?: React.ReactNode; style?: React.CSSProperties}> = ({x, y, w, h, children, style}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, height: h, ...style}}>{children}</div>
);
const Chip: React.FC<{children: React.ReactNode; c?: string; q?: number; size?: number; dark?: boolean; style?: React.CSSProperties}> = ({children, c = C1, q = 1, size = 32, dark = true, style}) => (
  <div style={{display: 'inline-flex', alignItems: 'center', gap: 12, padding: '12px 26px', borderRadius: 50, background: c, color: dark ? INK : '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: size, transform: `scale(${q})`, opacity: Math.min(1, q * 1.5), boxShadow: `0 12px 30px ${c}55`, whiteSpace: 'nowrap', ...style}}>{children}</div>
);
const Row: React.FC<{y: number; children: React.ReactNode; gap?: number}> = ({y, children, gap = 14}) => (
  <Abs x={0} y={y} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap, flexWrap: 'wrap', padding: '0 40px', boxSizing: 'border-box'}}>{children}</Abs>
);
const Title: React.FC<{children: React.ReactNode; y?: number; p?: number}> = ({children, y = 340, p = 1}) => (
  <Abs x={60} y={y} w={960} style={{textAlign: 'center', opacity: p, transform: `translateY(${(1 - p) * 30}px)`}}>
    <T size={60}>{children}</T>
  </Abs>
);

/** Photo IA : mise au point (flou → net), léger travelling, reflet qui balaie. */
const Photo: React.FC<{src: string; x: number; y: number; w: number; h: number; at: number; pos?: string; border?: string; zoom?: number; children?: React.ReactNode; tilt?: number}> = ({src, x, y, w, h, at, pos = 'center', border = 'rgba(255,255,255,0.9)', zoom = 1.06, children, tilt = 0}) => {
  const t = useT();
  const q = spring(t, at, 6, 12);
  const focus = prog(t, at, at + 0.9, easeOut);
  const sweep = prog(t, at + 0.5, at + 1.5, easeInOut);
  return (
    <Abs x={x} y={y} w={w} h={h} style={{perspective: 1600}}>
      <div style={{width: '100%', height: '100%', borderRadius: 34, overflow: 'hidden', border: `6px solid ${border}`, boxShadow: '0 40px 80px rgba(0,0,0,0.55)', transform: `scale(${0.85 + 0.15 * q}) rotateY(${tilt * (1 - q * 0.6)}deg)`, opacity: Math.min(1, q * 2), position: 'relative'}}>
        <Img src={src} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, filter: `blur(${(1 - focus) * 14}px)`, transform: `scale(${zoom + (t - at) * 0.006})`}} />
        <div style={{position: 'absolute', inset: 0, background: `linear-gradient(110deg, transparent ${sweep * 140 - 40}%, rgba(255,255,255,0.28) ${sweep * 140 - 25}%, transparent ${sweep * 140 - 10}%)`}} />
        {children}
      </div>
    </Abs>
  );
};

/* ─────────── Fond : dégradé, grille en perspective, grain, halo ─────────── */
const Bg: React.FC = () => {
  const t = useT();
  const cat3 = win(t, 39.6, 50.8, 0.8);
  return (
    <AbsoluteFill style={{background: BG, overflow: 'hidden'}}>
      <AbsoluteFill style={{background: `radial-gradient(90% 60% at 50% 42%, ${cat3 > 0 ? `rgba(120,20,30,${0.55 * cat3})` : '#1A2B47'} 0%, ${BG} 70%)`}} />
      <AbsoluteFill style={{background: 'radial-gradient(90% 60% at 50% 42%, #1A2B47 0%, rgba(10,19,34,0) 70%)', opacity: 1 - cat3}} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: 0.18}}>
        {Array.from({length: 13}, (_, k) => <line key={`v${k}`} x1={540 + (k - 6) * 60} y1={1250} x2={540 + (k - 6) * 260} y2={1920} stroke={SKY} strokeWidth={2} />)}
        {Array.from({length: 8}, (_, k) => {
          const y = 1250 + Math.pow(((k + (t * 0.6) % 1) / 8), 1.8) * 670;
          return <line key={`h${k}`} x1={0} y1={y} x2={1080} y2={y} stroke={SKY} strokeWidth={2} />;
        })}
      </svg>
      {/* halo lumineux qui dérive */}
      <div style={{position: 'absolute', left: 540 + Math.sin(t * 0.4) * 300 - 450, top: 300 + Math.cos(t * 0.3) * 120, width: 900, height: 900, borderRadius: '50%', background: 'radial-gradient(circle, rgba(77,168,255,0.10) 0%, rgba(77,168,255,0) 65%)'}} />
      {/* poussières en suspension */}
      {Array.from({length: 26}, (_, k) => {
        const sp = 20 + random(`ds${k}`) * 40;
        const y = (random(`dy${k}`) * 1920 - t * sp + 1920 * 4) % 1920;
        return <div key={k} style={{position: 'absolute', left: random(`dx${k}`) * 1080 + Math.sin(t + k) * 10, top: y, width: 4 + random(`dr${k}`) * 5, height: 4 + random(`dr${k}`) * 5, borderRadius: 10, background: '#BFD8F0', opacity: 0.15 + random(`do${k}`) * 0.2}} />;
      })}
    </AbsoluteFill>
  );
};

/** Grain argentique (bruit SVG dont la graine change à chaque image) + vignettage. */
const Grain: React.FC = () => {
  const t = useT();
  const seed = Math.floor(t * 30) % 50;
  return (
    <AbsoluteFill style={{zIndex: 70, pointerEvents: 'none'}}>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: 0.07, mixBlendMode: 'overlay'}}>
        <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={seed} /></filter>
        <rect width={1080} height={1920} filter="url(#grain)" />
      </svg>
      <AbsoluteFill style={{background: 'radial-gradient(120% 80% at 50% 50%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.45) 100%)'}} />
    </AbsoluteFill>
  );
};

/* ─────────── Couverture : titre de la thématique sur le visuel IA ─────────── */
const Cover: React.FC = () => {
  const t = useT();
  const z = prog(t, 0.9, 1.7, easeIn);
  if (z >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, overflow: 'hidden', opacity: 1 - prog(t, 1.45, 1.7)}}>
      {/* zoom traversant vers la visière du masque */}
      <AbsoluteFill style={{transform: `scale(${1 + z * 5})`, transformOrigin: '52% 39%'}}>
        <Img src={PH('technicien-cat3.jpg')} style={{width: 1080, height: 1920, objectFit: 'cover', filter: `brightness(${0.8 - z * 0.3})`}} />
        <AbsoluteFill style={{background: `linear-gradient(180deg, ${BG}F2 0%, ${BG}D0 22%, ${BG}10 40%, ${BG}00 62%, ${BG}C8 84%, ${BG} 100%)`}} />
      </AbsoluteFill>
      <div style={{opacity: 1 - z * 2}}>
        <Abs x={0} y={95} w={1080} style={{display: 'flex', justifyContent: 'center'}}>
          <div style={{background: '#fff', borderRadius: 26, padding: '10px 28px'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div>
        </Abs>
        <Abs x={60} y={270} w={960} style={{textAlign: 'center'}}>
          <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: C2, color: INK, fontFamily: sansFont, fontWeight: 800, fontSize: 30, letterSpacing: 3}}>SÉCURITÉ AU TRAVAIL</div>
          <T size={64} style={{marginTop: 22, textTransform: 'uppercase', letterSpacing: -1}}>Comprendre les</T>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, marginTop: 4}}>
            <T size={210} color={C2} style={{textShadow: '0 12px 40px rgba(255,182,39,0.35)'}}>3</T>
            <div style={{textAlign: 'left'}}>
              <T size={84} style={{textTransform: 'uppercase', letterSpacing: -2}}>catégories</T>
              <T size={84} color={C2} style={{textTransform: 'uppercase', letterSpacing: -2}}>d'EPI</T>
            </div>
          </div>
          <Hand size={46} color={DIM} style={{marginTop: 6}}>Équipements de protection individuelle</Hand>
        </Abs>
        <Row y={1620} gap={16}>
          {['Risques minimaux', 'Risques sérieux', 'Risques mortels'].map((l, k) => (
            <div key={l} style={{display: 'flex', alignItems: 'center', gap: 10, padding: '12px 22px', borderRadius: 40, background: 'rgba(10,19,34,0.78)', border: `3px solid ${CAT[k]}`}}>
              <T size={34} color={CAT[k]}>{k + 1}</T>
              <T size={26}>{l}</T>
            </div>
          ))}
        </Row>
      </div>
    </AbsoluteFill>
  );
};

/* ─────────── Fil rouge : jauge de gravité 1 → 2 → 3 ─────────── */
const Scale: React.FC = () => {
  const t = useT();
  const o = win(t, 17.6, 50.8, 0.5) + win(t, 55.4, 60.2, 0.5);
  if (o <= 0) return null;
  const level = t < 29.9 ? 1 : t < 41.4 ? 2 : 3;
  const lvlAt = [17.6, 29.9, 41.4][level - 1];
  return (
    <Abs x={140} y={232} w={800} h={70} style={{opacity: Math.min(1, o), display: 'flex', gap: 10, alignItems: 'center'}}>
      {[1, 2, 3].map((n) => {
        const on = n <= level;
        const cur = n === level;
        const fill = cur ? prog(t, lvlAt, lvlAt + 0.6, easeOut) : on ? 1 : 0;
        return (
          <div key={n} style={{flex: 1, height: 54, borderRadius: 27, background: 'rgba(255,255,255,0.08)', border: `2px solid ${on ? CAT[n - 1] : 'rgba(255,255,255,0.18)'}`, position: 'relative', overflow: 'hidden', boxShadow: cur ? `0 0 ${20 + Math.sin(t * 6) * 8}px ${CAT[n - 1]}` : 'none'}}>
            <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${fill * 100}%`, background: CAT[n - 1]}} />
            <T size={28} color={fill > 0.5 ? INK : DIM} style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Catégorie {n}</T>
          </div>
        );
      })}
    </Abs>
  );
};

/* ─────────── 1. Les EPI classés en 3 catégories (1,0 → 7,5 s) ─────────── */
const Intro: React.FC = () => {
  const t = useT();
  const o = win(t, 1.3, 7.5, 0.35);
  if (o <= 0) return null;
  const scan = prog(t, 6.3, 7.3, easeInOut);
  return (
    <AbsoluteFill style={{opacity: o}}>
      <Title p={pop(t, 1.4)}>{t < 4.4 ? <>Les <span style={{color: C2}}>équipements de protection</span> individuelle</> : t < 6.2 ? <>Classés en <span style={{color: C2}}>3 catégories</span></> : <>Mais sur quel <span style={{color: C2}}>critère</span> ?</>}</Title>
      {/* EPI en orbite autour du casque */}
      <Abs x={540} y={820} style={{opacity: 1 - prog(t, 4.2, 4.6)}}>
        <div style={{position: 'absolute', left: -150, top: -150, transform: `scale(${spring(t, 1.6)})`}}><F n="casque" size={300} /></div>
        {['gants', 'lunettes', 'chaussure', 'gilet', 'epi-ble'].map((n, k) => {
          const a = (k / 5) * Math.PI * 2 + t * 0.9;
          const r = 330 * spring(t, 2.0 + k * 0.12);
          return <div key={n} style={{position: 'absolute', left: Math.cos(a) * r - 75, top: Math.sin(a) * r * 0.55 - 75}}><F n={n} size={150} /></div>;
        })}
      </Abs>
      {/* trois tuiles en verre qui s'empilent comme les étages d'une échelle */}
      {t > 4.2 && [0, 1, 2].map((k) => {
        const q = spring(t, 4.3 + k * 0.18);
        return (
          <Abs key={k} x={170} y={1200 - k * 230} w={740} h={190} style={{transform: `translateY(${(1 - q) * 300}px) rotateX(${(1 - q) * 50}deg)`, opacity: Math.min(1, q * 1.5), borderRadius: 30, background: 'rgba(255,255,255,0.07)', border: `3px solid ${CAT[k]}`, backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', gap: 30, padding: '0 40px', boxSizing: 'border-box', boxShadow: `0 20px 50px rgba(0,0,0,0.4), inset 0 0 40px ${CAT[k]}22`}}>
            <T size={130} color={CAT[k]}>{k + 1}</T>
            <div style={{flex: 1}}>
              <T size={40}>Catégorie {k + 1}</T>
              <div style={{marginTop: 14, height: 18, width: 380, borderRadius: 9, background: 'rgba(255,255,255,0.12)'}} />
            </div>
            <T size={90} color="rgba(255,255,255,0.5)">?</T>
          </Abs>
        );
      })}
      {/* faisceau scanner qui cherche le critère */}
      {t > 6.2 && (
        <Abs x={130} y={lerp(700, 1420, scan)} w={820} h={8} style={{background: SKY, boxShadow: `0 0 30px ${SKY}, 0 0 80px ${SKY}`, borderRadius: 4, opacity: 1 - prog(t, 7.2, 7.4)}} />
      )}
    </AbsoluteFill>
  );
};

/* ─────────── 2. Infraction ? Non : risque vital (7,5 → 12,3 s) ─────────── */
const Vital: React.FC = () => {
  const t = useT();
  const o = win(t, 7.5, 12.3, 0.35);
  if (o <= 0) return null;
  const tear = prog(t, 10.9, 11.4, easeIn);
  const beatX = (t - 10.9) * 520;
  return (
    <AbsoluteFill style={{opacity: o}}>
      <Title p={pop(t, 7.6)}>{t < 10.9 ? <>Se tromper d'<span style={{color: C2}}>équipement</span>…</> : <>… c'est <span style={{color: C3}}>risquer sa vie</span></>}</Title>
      {/* moniteur cardiaque révélé sous le procès-verbal */}
      <Abs x={110} y={600} w={860} h={760} style={{borderRadius: 34, background: '#03070D', border: '6px solid #1F2B3D', boxShadow: '0 40px 80px rgba(0,0,0,0.6)', overflow: 'hidden'}}>
        <svg width={860} height={760} style={{position: 'absolute', inset: 0}}>
          {Array.from({length: 18}, (_, k) => <line key={`g${k}`} x1={k * 50} y1={0} x2={k * 50} y2={760} stroke="#0F2A1D" strokeWidth={2} />)}
          {Array.from({length: 16}, (_, k) => <line key={`r${k}`} x1={0} y1={k * 50} x2={860} y2={k * 50} stroke="#0F2A1D" strokeWidth={2} />)}
          <path d={Array.from({length: 120}, (_, i) => {
            const x = i * 8;
            const ph = (x + 400) % 430;
            const y = 380 + (ph > 180 && ph < 200 ? -200 : ph > 200 && ph < 215 ? 150 : ph > 150 && ph < 175 ? -25 : 0);
            return `${i ? 'L' : 'M'}${x} ${y}`;
          }).join(' ')} fill="none" stroke={C3} strokeWidth={6} strokeLinejoin="round" style={{filter: `drop-shadow(0 0 10px ${C3})`}} strokeDasharray={`${Math.max(0, beatX)} 2000`} />
        </svg>
        <T size={44} color={C3} style={{position: 'absolute', right: 40, top: 30, opacity: Math.floor(t * 3) % 2 ? 1 : 0.4}}>♥ RISQUE VITAL</T>
      </Abs>
      {/* procès-verbal « infraction » qui se déchire en deux */}
      {tear < 1 && [0, 1].map((side) => (
        <Abs key={side} x={150} y={640} w={780} h={680} style={{clipPath: side ? 'polygon(52% 0, 100% 0, 100% 100%, 47% 100%, 55% 70%, 46% 45%, 54% 20%)' : 'polygon(0 0, 52% 0, 54% 20%, 46% 45%, 55% 70%, 47% 100%, 0 100%)', transform: `translateX(${(side ? 1 : -1) * tear * 700}px) rotate(${(side ? 1 : -1) * tear * 25}deg) scale(${spring(t, 7.8)})`, transformOrigin: side ? '100% 100%' : '0 100%'}}>
          <div style={{width: '100%', height: '100%', borderRadius: 20, background: '#F7F1DC', padding: 50, boxSizing: 'border-box', boxShadow: '0 30px 60px rgba(0,0,0,0.5)'}}>
            <T size={34} color="#8A7D5A" style={{letterSpacing: 4}}>PROCÈS-VERBAL</T>
            {[0.9, 0.7, 0.8, 0.6].map((w, j) => <div key={j} style={{marginTop: 34, height: 16, width: 620 * w, borderRadius: 8, background: '#D9CFB0'}} />)}
            {t > 9.7 && (
              <div style={{marginTop: 60, display: 'inline-block', border: `8px solid ${C3}`, borderRadius: 16, padding: '6px 26px', transform: `rotate(-10deg) scale(${spring(t, 9.8, 9, 18)})`}}>
                <T size={74} color={C3}>INFRACTION</T>
              </div>
            )}
            {t > 10.0 && <Hand size={44} color="#5A513A" style={{marginTop: 40}}>« simple » ?</Hand>}
          </div>
        </Abs>
      ))}
    </AbsoluteFill>
  );
};

/* ─────────── 3. Le technicien et le solvant corrosif (12,3 → 17,4 s) ─────────── */
const Solvent: React.FC = () => {
  const t = useT();
  const o = win(t, 12.3, 17.5, 0.35);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      <Title p={pop(t, 12.4)}>{t < 14.3 ? <>Prenons un <span style={{color: SKY}}>technicien</span></> : <>Un solvant <span style={{color: C1}}>hautement corrosif</span></>}</Title>
      <Photo src={PH('technicien-solvant.jpg')} x={165} y={500} w={750} h={1000} at={12.5} tilt={-14}>
        {/* vapeurs corrosives animées au-dessus du fût */}
        {t > 14.3 && Array.from({length: 22}, (_, k) => {
          const life = ((t - 14.3) * 0.6 + random(`v${k}`)) % 1;
          return <div key={k} style={{position: 'absolute', left: 590 + Math.sin(life * 6 + k) * 50 + random(`vx${k}`) * 40, top: 430 - life * 330, width: 40 + life * 80, height: 40 + life * 80, borderRadius: '50%', background: 'radial-gradient(circle, rgba(120,230,120,0.55) 0%, rgba(120,230,120,0) 70%)', opacity: (1 - life) * pop(t, 14.3, 0.8)}} />;
        })}
      </Photo>
      {t > 14.3 && <Abs x={60} y={590}><Chip c={SKY} dark={false} q={spring(t, 14.4)} size={30}><F n="eprouvette" size={42} />Solvant chimique</Chip></Abs>}
      {t > 16.2 && (
        <Abs x={610} y={1200} style={{transform: `scale(${spring(t, 16.3, 8, 16)}) rotate(-6deg)`}}>
          <div style={{width: 300, height: 300, transform: 'rotate(45deg)', background: '#fff', border: `14px solid ${C3}`, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 40px ${C3}`}}>
            <div style={{transform: 'rotate(-45deg)', textAlign: 'center'}}><F n="goutte" size={110} style={{margin: '0 auto'}} /><T size={34} color={INK}>CORROSIF</T></div>
          </div>
        </Abs>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Carte de catégorie ─────────── */
const CatCard: React.FC<{n: number; at: number; img: string; label: string; x?: number; y?: number; w?: number; h?: number; flipOut?: number}> = ({n, at, img, label, x = 120, y = 360, w = 840, h = 800, flipOut = 1e9}) => {
  const t = useT();
  const q = spring(t, at, 6, 13);
  const out = prog(t, flipOut, flipOut + 0.6, easeIn);
  const c = CAT[n - 1];
  return (
    <Abs x={x} y={y} w={w} h={h} style={{perspective: 1800}}>
      <div style={{width: '100%', height: '100%', borderRadius: 40, background: '#FBFAF6', overflow: 'hidden', boxShadow: `0 40px 90px rgba(0,0,0,0.55), 0 0 0 6px ${c}`, transform: `rotateY(${(1 - q) * -70 + out * 90}deg) scale(${0.8 + 0.2 * q})`, opacity: Math.min(1, q * 2) * (1 - out), position: 'relative'}}>
        <Img src={PH(img)} style={{position: 'absolute', left: 0, top: 120, width: w, height: h - 120, objectFit: 'cover', transform: `scale(${1.04 + (t - at) * 0.008})`}} />
        <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 130, background: c, display: 'flex', alignItems: 'center', gap: 24, padding: '0 40px'}}>
          <T size={96} color={INK}>{n}</T>
          <div>
            <T size={46} color={INK}>Catégorie {n}</T>
            <T size={28} color="rgba(13,23,38,0.75)" style={{marginTop: 6}}>{label}</T>
          </div>
        </div>
      </div>
    </Abs>
  );
};

/* ─────────── 4. Catégorie 1 : risques minimaux (17,4 → 28,6 s) ─────────── */
const Cat1: React.FC = () => {
  const t = useT();
  const o = win(t, 17.4, 28.7, 0.4);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {t < 20.6 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 20.2, 20.6)}}>
          <Title p={pop(t, 17.5)}>On commence <span style={{color: C1}}>au bas de l'échelle</span></Title>
          {/* échelle en perspective dont le premier barreau s'allume */}
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            {[-1, 1].map((sd) => <line key={sd} x1={540 + sd * 260} y1={1500} x2={540 + sd * 130} y2={620} stroke="#5B6B82" strokeWidth={18} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - prog(t, 17.6, 18.4, easeInOut)} />)}
            {[0, 1, 2].map((k) => {
              const y = 1380 - k * 300;
              const half = lerp(250, 150, (1380 - y) / 880);
              const lit = k === 0 && t > 19.4;
              return <line key={k} x1={540 - half} y1={y} x2={540 + half} y2={y} stroke={lit ? C1 : '#5B6B82'} strokeWidth={22} strokeLinecap="round" opacity={pop(t, 18.2 + k * 0.15)} style={{filter: lit ? `drop-shadow(0 0 18px ${C1})` : 'none'}} />;
            })}
          </svg>
          {[0, 1, 2].map((k) => <Abs key={k} x={830} y={1350 - k * 300}><T size={56} color={CAT[k]} style={{opacity: pop(t, 18.4 + k * 0.15)}}>{k + 1}</T></Abs>)}
        </AbsoluteFill>
      )}
      {t > 20.2 && (
        <>
          <CatCard n={1} at={20.3} img="epi-cat1.jpg" label="Risques minimaux" y={360} h={780} />
          {t > 23.9 && <Abs x={80} y={1180}><Chip c={C1} q={spring(t, 24.0)} size={34}><Check p={prog(t, 24.1, 24.5)} size={44} color={INK} />Risques minimaux</Chip></Abs>}
          {t > 26.8 && <Abs x={110} y={1300}><Chip c="#FBFAF6" q={spring(t, 26.9)} size={32}><F n="pansement" size={48} />Légères égratignures</Chip></Abs>}
          {t > 27.7 && <Abs x={560} y={1400}><Chip c="#FBFAF6" q={spring(t, 27.8)} size={32}><F n="savon" size={48} />Salissures</Chip></Abs>}
        </>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── 5. Catégorie 2 : définie par exclusion (28,6 → 39,4 s) ─────────── */
const Cat2: React.FC = () => {
  const t = useT();
  const o = win(t, 28.6, 39.5, 0.4);
  if (o <= 0) return null;
  const ex = prog(t, 33.2, 34.0, easeInOut);
  const drop1 = prog(t, 37.6, 38.3, easeIn);
  const drop3 = prog(t, 38.5, 39.2, easeIn);
  return (
    <AbsoluteFill style={{opacity: o}}>
      {t < 33.4 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 33.0, 33.4)}}>
          <CatCard n={2} at={29.9} img="epi-cat2.jpg" label="Le niveau intermédiaire" y={360} h={800} />
          {t > 31.0 && <Abs x={130} y={1210}><Chip c={C2} q={spring(t, 31.1)} size={32}><F n="puzzle" size={46} />Plus complexe</Chip></Abs>}
          {t > 32.1 && <Abs x={520} y={1310}><Chip c="#FBFAF6" q={spring(t, 32.2)} size={30}>Définie par exclusion</Chip></Abs>}
        </AbsoluteFill>
      )}
      {t > 33.0 && (
        <AbsoluteFill style={{opacity: pop(t, 33.0)}}>
          <Title>{t < 35.3 ? <>Elle se définit <span style={{color: C2}}>par exclusion</span></> : <>Tous les <span style={{color: C2}}>risques sérieux</span></>}</Title>
          {/* barre de tous les risques : les extrémités sont exclues puis tombent */}
          {[
            {k: 0, l: 'Bénins', icon: 'pansement', x: 70, w: 260, d: drop1, at: 37.6},
            {k: 1, l: 'Sérieux', icon: 'casque', x: 340, w: 400, d: 0, at: 0},
            {k: 2, l: 'Mortels', icon: 'crane', x: 750, w: 260, d: drop3, at: 38.5},
          ].map(({k, l, icon, x, w, d, at}) => {
            const q = spring(t, 33.3 + k * 0.15);
            const struck = at && t > at - 0.4;
            return (
              <Abs key={l} x={x + (k === 1 ? 0 : (k === 0 ? -1 : 1) * ex * 0)} y={720 + d * 900} w={w} h={420} style={{transform: `scale(${q}) rotate(${(k === 0 ? -1 : 1) * d * 40}deg)`, opacity: 1 - d}}>
                <div style={{width: '100%', height: '100%', borderRadius: 28, background: k === 1 ? C2 : 'rgba(255,255,255,0.08)', border: `4px solid ${CAT[k]}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, boxShadow: k === 1 && t > 35.3 ? `0 0 ${40 + Math.sin(t * 6) * 15}px ${C2}` : 'none'}}>
                  <F n={icon} size={k === 1 ? 170 : 120} />
                  <T size={k === 1 ? 46 : 36} color={k === 1 ? INK : LIGHT}>{l}</T>
                </div>
                {struck && (
                  <svg width={w} height={420} style={{position: 'absolute', inset: 0}}>
                    <line x1={20} y1={20} x2={w - 20} y2={400} stroke={C3} strokeWidth={14} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - prog(t, at - 0.4, at - 0.1)} />
                    <line x1={w - 20} y1={20} x2={20} y2={400} stroke={C3} strokeWidth={14} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - prog(t, at - 0.25, at)} />
                  </svg>
                )}
              </Abs>
            );
          })}
          {/* accolade « tous les risques » */}
          <Abs x={70} y={1170} w={940} h={20} style={{borderRadius: 10, background: 'rgba(255,255,255,0.25)', transform: `scaleX(${prog(t, 33.4, 34.0, easeOut)})`}} />
          <Row y={1210}><T size={34} color={DIM}>{t < 37.0 ? 'Tous les risques…' : 'Ni bénins, ni mortels'}</T></Row>
          {t > 35.8 && <Row y={1290}><Chip c={C2} q={spring(t, 35.9)} size={34}>= Catégorie 2</Chip></Row>}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── 6. Catégorie 3 : dangers extrêmes (39,4 → 50,8 s) ─────────── */
const Cat3: React.FC = () => {
  const t = useT();
  const o = win(t, 39.4, 50.9, 0.4);
  if (o <= 0) return null;
  const scanY = ((t - 42.0) * 0.5) % 1;
  return (
    <AbsoluteFill style={{opacity: o}}>
      {/* gyrophare : faisceau rouge qui tourne */}
      <AbsoluteFill style={{background: `conic-gradient(from ${t * 220}deg at 50% 0%, rgba(255,77,77,0.22) 0deg, rgba(255,77,77,0) 40deg, rgba(255,77,77,0) 180deg, rgba(255,77,77,0.18) 220deg, rgba(255,77,77,0) 260deg)`, opacity: pop(t, 41.2, 0.6), mixBlendMode: 'screen'}} />
      <Title p={pop(t, 39.5)}>{t < 41.2 ? <>Le <span style={{color: C3}}>sommet</span> de l'échelle</> : t < 45.3 ? <>Le niveau <span style={{color: C3}}>ultime</span></> : <>Réservé aux <span style={{color: C3}}>dangers extrêmes</span></>}</Title>
      {t < 41.5 && (
        <Abs x={340} y={620} w={400} h={600} style={{opacity: 1 - prog(t, 41.1, 41.5)}}>
          {[0, 1, 2].map((k) => {
            const q = spring(t, 39.6 + k * 0.25);
            return <div key={k} style={{position: 'absolute', left: 0, bottom: k * 190, width: 400, height: 170, borderRadius: 26, background: k === 2 ? C3 : 'rgba(255,255,255,0.08)', border: `3px solid ${CAT[k]}`, transform: `scale(${q})`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: k === 2 ? `0 0 50px ${C3}` : 'none'}}><T size={90} color={k === 2 ? '#fff' : CAT[k]}>{k + 1}</T></div>;
          })}
        </Abs>
      )}
      {t > 41.2 && (
        <Photo src={PH('technicien-cat3.jpg')} x={185} y={495} w={710} h={1035} at={41.3} pos="50% 30%" border={C3} zoom={1.12}>
          {/* scanner holographique qui détaille la tenue */}
          <div style={{position: 'absolute', left: 0, right: 0, top: `${scanY * 100}%`, height: 6, background: '#7FF6FF', boxShadow: '0 0 30px #7FF6FF, 0 0 80px #7FF6FF', opacity: t > 42.0 ? 0.9 : 0}} />
          <div style={{position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, rgba(127,246,255,0.06) 0 2px, transparent 2px 6px)', opacity: t > 42.0 ? 1 : 0}} />
          {[['Masque à cartouches', 43.2, 290, 300], ['Combinaison étanche', 44.0, 60, 520], ['Gants chimiques', 44.8, 420, 640]].map(([l, at, x, y]) => t > (at as number) && (
            <div key={l as string} style={{position: 'absolute', left: x as number, top: y as number, opacity: pop(t, at as number), transform: `translateX(${(1 - pop(t, at as number)) * 30}px)`}}>
              <div style={{padding: '8px 18px', borderRadius: 14, background: 'rgba(5,15,25,0.8)', border: '2px solid #7FF6FF', fontFamily: sansFont, fontWeight: 800, fontSize: 24, color: '#BFFBFF', whiteSpace: 'nowrap'}}>◉ {l}</div>
            </div>
          ))}
        </Photo>
      )}
      {t > 45.6 && <Abs x={70} y={1290}><Chip c={C3} dark={false} q={spring(t, 45.7)} size={32}>Dangers extrêmes</Chip></Abs>}
      {t > 47.6 && <Abs x={480} y={1290}><Chip c="#FBFAF6" q={spring(t, 47.7)} size={32}><F n="crane" size={44} />Mort</Chip></Abs>}
      {t > 48.7 && <Abs x={220} y={1390}><Chip c="#FBFAF6" q={spring(t, 48.8)} size={32}><F n="bris" size={44} />Dommages irréversibles</Chip></Abs>}
    </AbsoluteFill>
  );
};

/* ─────────── 7. Aucune place au hasard (50,8 → 53,9 s) ─────────── */
const Hazard: React.FC = () => {
  const t = useT();
  const o = win(t, 50.8, 53.9, 0.35);
  if (o <= 0) return null;
  const roll = prog(t, 51.0, 52.6, easeOut);
  return (
    <AbsoluteFill style={{opacity: o}}>
      <Title p={pop(t, 50.9)}>Le choix ne laisse <span style={{color: C2}}>aucune place au hasard</span></Title>
      <Abs x={390} y={640} style={{transform: `translate(${(1 - roll) * -500}px, ${Math.abs(Math.sin(roll * 9)) * -120 * (1 - roll)}px) rotate(${roll * 720}deg)`}}><F n="de" size={300} /></Abs>
      {t > 52.7 && (
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
          <circle cx={540} cy={790} r={230} fill="none" stroke={C3} strokeWidth={22} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - prog(t, 52.7, 53.1)} />
          <line x1={378} y1={628} x2={702} y2={952} stroke={C3} strokeWidth={22} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - prog(t, 52.9, 53.2)} />
        </svg>
      )}
      <Row y={1120} gap={18}>
        {[0, 1, 2].map((k) => (
          <div key={k} style={{width: 270, height: 300, borderRadius: 26, overflow: 'hidden', border: `5px solid ${CAT[k]}`, transform: `translateY(${(1 - spring(t, 51.3 + k * 0.15)) * 400}px)`, position: 'relative', background: '#FBFAF6'}}>
            <Img src={PH(['epi-cat1.jpg', 'epi-cat2.jpg', 'technicien-cat3.jpg'][k])} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: k === 2 ? '50% 32%' : 'center'}} />
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, background: CAT[k], padding: '6px 0', textAlign: 'center'}}><T size={30} color={INK}>Cat. {k + 1}</T></div>
          </div>
        ))}
      </Row>
    </AbsoluteFill>
  );
};

/* ─────────── 8. Verdict : solvant corrosif → EPI de catégorie 3 (53,9 → 60,3 s) ─────────── */
const Verdict: React.FC = () => {
  const t = useT();
  const o = win(t, 53.9, 60.4, 0.35);
  if (o <= 0) return null;
  const arrow = prog(t, 55.6, 56.4, easeInOut);
  return (
    <AbsoluteFill style={{opacity: o}}>
      <Title p={pop(t, 54.0)}>{t < 55.5 ? <>Et ce <span style={{color: C1}}>solvant corrosif</span> ?</> : t < 57.0 ? <>Des <span style={{color: C3}}>dégâts irréversibles</span></> : <>Verdict : EPI de <span style={{color: C3}}>catégorie 3</span></>}</Title>
      <Photo src={PH('technicien-solvant.jpg')} x={60} y={560} w={430} h={573} at={54.1} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <path d="M500 850 C 560 780, 600 780, 640 830" fill="none" stroke={C3} strokeWidth={12} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - arrow} />
        {arrow > 0.95 && <path d="M615 800 L645 835 L605 845" fill="none" stroke={C3} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />}
      </svg>
      {t > 55.6 && <Photo src={PH('technicien-cat3.jpg')} x={600} y={520} w={420} h={650} at={55.8} pos="50% 30%" border={C3} zoom={1.25} />}
      {t > 57.9 && (
        <Abs x={190} y={1220} w={700} style={{display: 'flex', justifyContent: 'center', transform: `rotate(-4deg) scale(${lerp(2.2, 1, prog(t, 57.9, 58.2, easeIn))})`, opacity: prog(t, 57.9, 58.1)}}>
          <div style={{border: `10px solid ${C3}`, borderRadius: 24, padding: '14px 40px', background: 'rgba(10,19,34,0.85)', display: 'flex', alignItems: 'center', gap: 22}}>
            <Check p={prog(t, 58.4, 58.9)} size={70} color={C1} />
            <T size={66} color={C3}>CATÉGORIE 3</T>
          </div>
        </Abs>
      )}
      {t > 58.6 && <Row y={1420}><T size={26} color={DIM} style={{opacity: pop(t, 58.6)}}>Classement des EPI : règlement (UE) 2016/425</T></Row>}
    </AbsoluteFill>
  );
};

/* ─────────── En-tête, sortie ─────────── */
const Header: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill style={{zIndex: 40, pointerEvents: 'none', opacity: pop(t, 1.4)}}>
      <div style={{position: 'absolute', left: '50%', top: 95, transform: 'translateX(-50%)', background: '#fff', borderRadius: 26, padding: '10px 28px'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div>
      {(t < 17.4 || (t > 50.8 && t < 55.4)) && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 236, display: 'flex', justifyContent: 'center', opacity: t < 17.4 ? 1 - prog(t, 17.0, 17.4) : win(t, 50.8, 55.4, 0.4)}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '8px 24px', borderRadius: 40, background: 'rgba(255,255,255,0.08)', border: `2px solid ${C2}`}}><F n="casque" size={40} /><T size={32}>Les 3 catégories d'<span style={{color: C2}}>EPI</span></T></div>
        </div>
      )}
    </AbsoluteFill>
  );
};
const OutroFade: React.FC = () => {
  const t = useT();
  return <AbsoluteFill style={{background: 'linear-gradient(180deg, #FBFAF6 0%, #F1EDE3 100%)', zIndex: 80, opacity: prog(t, OUTRO_AT - 0.5, OUTRO_AT)}} />;
};

const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.3}, {at: 0.9, s: 'soft-whoosh', v: 0.55, dur: 2}, {at: 1.5, s: 'bass-hit', v: 0.3},
  {at: 1.6, s: 'sfx/pop', v: 0.3}, ...[0, 1, 2, 3, 4].map((k) => ({at: 2.0 + k * 0.12, s: 'sfx/pop', v: 0.14})),
  ...[0, 1, 2].map((k) => ({at: 4.3 + k * 0.18, s: 'sfx/thud', v: 0.28})), {at: 6.3, s: 'sfx/rise', v: 0.25},
  {at: 7.6, s: 'sfx/whoosh', v: 0.3}, {at: 7.8, s: 'page', v: 0.35}, {at: 9.8, s: 'tampon', v: 0.5}, {at: 10.9, s: 'sfx/swish', v: 0.45}, {at: 11.0, s: 'deep-hit', v: 0.4},
  ...[0, 1].map((k) => ({at: 11.2 + k * 0.6, s: 'tick', v: 0.25})),
  {at: 12.5, s: 'sfx/whoosh', v: 0.3}, {at: 14.4, s: 'sfx/pop', v: 0.25}, {at: 14.5, s: 'tension', v: 0.12, dur: 2.5}, {at: 16.3, s: 'alarme', v: 0.14, dur: 0.8},
  {at: 17.6, s: 'sfx/whoosh', v: 0.25}, {at: 19.4, s: 'sfx/ding', v: 0.25}, {at: 20.3, s: 'sfx/swish', v: 0.4}, {at: 20.5, s: 'bass-hit', v: 0.25}, {at: 24.0, s: 'validation', v: 0.25}, {at: 26.9, s: 'sfx/pop', v: 0.25}, {at: 27.8, s: 'sfx/pop', v: 0.25},
  {at: 29.9, s: 'sfx/swish', v: 0.4}, {at: 30.1, s: 'bass-hit', v: 0.25}, {at: 31.1, s: 'sfx/pop', v: 0.25}, {at: 32.2, s: 'sfx/pop', v: 0.22},
  {at: 33.2, s: 'sfx/whoosh', v: 0.3}, ...[0, 1, 2].map((k) => ({at: 33.3 + k * 0.15, s: 'sfx/thud', v: 0.22})), {at: 35.9, s: 'sfx/ding', v: 0.25},
  {at: 37.2, s: 'stylo', v: 0.3}, {at: 37.7, s: 'sfx/whoosh', v: 0.25}, {at: 38.1, s: 'stylo', v: 0.3}, {at: 38.6, s: 'sfx/whoosh', v: 0.25},
  ...[0, 1, 2].map((k) => ({at: 39.6 + k * 0.25, s: 'sfx/pop', v: 0.22})), {at: 41.2, s: 'alarme', v: 0.16, dur: 1.2}, {at: 41.3, s: 'deep-hit', v: 0.4}, {at: 42.0, s: 'sfx/rise', v: 0.2},
  ...[43.2, 44.0, 44.8].map((at) => ({at, s: 'sfx/click', v: 0.3})), {at: 45.7, s: 'sfx/thud', v: 0.3}, {at: 47.7, s: 'deep-hit', v: 0.3}, {at: 48.8, s: 'sfx/thud', v: 0.3},
  {at: 51.0, s: 'sfx/swish', v: 0.35}, ...[0, 1, 2, 3].map((k) => ({at: 51.2 + k * 0.32, s: 'tick', v: 0.2})), {at: 52.7, s: 'sfx/thud', v: 0.35},
  {at: 54.1, s: 'sfx/whoosh', v: 0.3}, {at: 55.6, s: 'sfx/swish', v: 0.35}, {at: 55.8, s: 'bass-hit', v: 0.25}, {at: 58.0, s: 'tampon', v: 0.55}, {at: 58.5, s: 'validation', v: 0.32},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const CategoriesEpi: React.FC = () => (
  <AbsoluteFill style={{background: BG}}>
    <Bg />
    <Gate from={1.0} to={7.6}><Intro /></Gate>
    <Gate from={7.4} to={12.4}><Vital /></Gate>
    <Gate from={12.2} to={17.6}><Solvent /></Gate>
    <Gate from={17.3} to={28.8}><Cat1 /></Gate>
    <Gate from={28.5} to={39.6}><Cat2 /></Gate>
    <Gate from={39.3} to={51.0}><Cat3 /></Gate>
    <Gate from={50.7} to={54.0}><Hazard /></Gate>
    <Gate from={53.8} to={OUTRO_AT}><Verdict /></Gate>
    <Gate from={0} to={OUTRO_AT}><Header /><Scale /></Gate>
    <Gate from={0} to={1.8}><Cover /></Gate>
    <Grain />
    <Gate from={OUTRO_AT - 0.5} to={999}><OutroFade /></Gate>
    <Gate from={OUTRO_AT} to={999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={1.4} to={OUTRO_AT}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-categories-epi-origine.m4a')} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);
