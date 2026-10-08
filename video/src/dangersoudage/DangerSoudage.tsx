import React from 'react';
import {AbsoluteFill, Audio, Img, random, staticFile} from 'remotion';
import {easeIn, easeInOut, easeOut, Gate, prog, useT} from '../anim';
import {Captions} from '../components/Captions';
import {Check} from '../identui/IdentUi';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {colors, s, sansFont} from '../theme';
import {captions} from './captions';

/**
 * « Le danger invisible du soudage » — UI motion premium (skill video-promo-diagnostic-qhse), voix d'origine,
 * photos de soudage (marques retirées) et schémas respiratoires fournis. Univers « laboratoire » clair, inédit.
 * Techniques nouvelles : fumée particulaire simulée sur photo, lentille de microscope classant les particules par
 * taille, lignes de flux vers le visage, parcours des particules dans les voies respiratoires (chacune s'arrête à
 * son niveau), poumons qui s'assombrissent, pictogrammes de danger chimique qui se retournent, recul de caméra
 * vers le plan de l'atelier, aspiration en tourbillon, lignes de ventilation, entonnoir collectif → individuel,
 * air qui s'éclaircit.
 */
const LOGO = 'promo/logo.png';
const INK = '#14283C';
const TEAL = '#2A8FA8';
const SMOKE = '#5D6B78';
const RED = '#D9443A';
const OK = '#2E9B3E';
const P = (n: string) => staticFile(`soudage/${n}.jpg`);
const SIZES: [string, string, number][] = [['5–10 µm', '#3E9E57', 34], ['3–5 µm', '#7DB35A', 26], ['2–3 µm', '#E3B73C', 19], ['1–2 µm', '#E07B2B', 13], ['0,1–1 µm', '#D23B34', 8]];
const MICRO = 8.8;
const PATH = 14.5;
const TOX = 23.8;
const SPREAD = 37.4;
const SOURCE = 45.4;
const RULE = 63.3;
const END = 67.8;
const OUTRO_AT = 72.5;
export const DANGERSOUDAGE_FRAMES = s(OUTRO_AT + 3.8);

const At: React.FC<{x: number; y: number; children: React.ReactNode; style?: React.CSSProperties}> = ({x, y, children, style}) => (
  <div style={{position: 'absolute', left: x, top: y, transform: 'translate(-50%, -50%)', ...style}}>{children}</div>
);
const pop = (t: number, at: number, d = 0.35) => prog(t, at, at + d, easeOut);
const T: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 34, color = INK, style}) => (
  <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: size, color, textTransform: 'uppercase', letterSpacing: -0.5, textAlign: 'center', lineHeight: 1.05, ...style}}>{children}</div>
);
/** Titre qui se dépose mot à mot en sortant d'un flou de fumée. */
const Head: React.FC<{text: string; at: number; until?: number; y?: number; size?: number; accent?: string}> = ({text, at, until = 9999, y = 380, size = 80, accent = TEAL}) => {
  const t = useT();
  if (t < at || t > until + 0.4) return null;
  const out = prog(t, until, until + 0.4, easeIn);
  return (
    <div style={{position: 'absolute', left: 60, right: 60, top: y, transform: 'translateY(-50%)', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', columnGap: size * 0.25, opacity: 1 - out}}>
      {text.split(' ').map((w, i) => {
        const p = prog(t, at + i * 0.07, at + i * 0.07 + 0.6, easeOut);
        const hi = w.startsWith('*');
        return <span key={i} style={{fontFamily: sansFont, fontWeight: 900, fontSize: size, lineHeight: 1.05, textTransform: 'uppercase', letterSpacing: -1, color: hi ? accent : INK, filter: `blur(${(1 - p) * 14}px)`, opacity: p, transform: `translateY(${(1 - p) * -24}px) scale(${1.15 - 0.15 * p})`, display: 'inline-block'}}>{w.replace(/\*/g, '')}</span>;
      })}
    </div>
  );
};

/* ─────────── Décor laboratoire ─────────── */
const Lab: React.FC = () => (
  <AbsoluteFill style={{background: 'linear-gradient(180deg, #F3F7FA 0%, #E2EAF1 100%)'}}>
    <AbsoluteFill style={{backgroundImage: 'linear-gradient(rgba(20,40,60,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(20,40,60,0.05) 1px, transparent 1px)', backgroundSize: '54px 54px'}} />
    <div style={{position: 'absolute', left: 0, right: 0, top: 100, display: 'flex', justifyContent: 'center'}}><Img src={staticFile(LOGO)} style={{height: 104}} /></div>
  </AbsoluteFill>
);

/** Fumée particulaire qui monte (sur photo ou décor). */
const Smoke: React.FC<{x: number; y: number; w: number; h: number; n?: number; dense?: number; drift?: number}> = ({x, y, w, h, n = 60, dense = 1, drift = 0}) => {
  const t = useT();
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w, height: h, pointerEvents: 'none', overflow: 'hidden'}}>
      {Array.from({length: n}, (_, k) => {
        const sp = 0.12 + random(`v${k}`) * 0.15;
        const ph = (t * sp + random(`p${k}`)) % 1;
        const sz = 30 + random(`z${k}`) * 90 * (0.4 + ph);
        const cx = w * (0.3 + random(`x${k}`) * 0.4) + Math.sin(t * 0.9 + k) * 40 * ph + drift * ph * w * 0.4;
        return <div key={k} style={{position: 'absolute', left: cx - sz / 2, top: h - ph * h - sz / 2, width: sz, height: sz, borderRadius: '50%', background: `rgba(93,107,120,${0.22 * dense})`, filter: 'blur(16px)', opacity: Math.sin(ph * Math.PI)}} />;
      })}
      {Array.from({length: Math.round(n * 0.8)}, (_, k) => {
        const sp = 0.18 + random(`q${k}`) * 0.2;
        const ph = (t * sp + random(`r${k}`)) % 1;
        const sz = 3 + random(`d${k}`) * 6;
        return <div key={`d${k}`} style={{position: 'absolute', left: w * (0.35 + random(`u${k}`) * 0.3) + Math.sin(t * 2 + k) * 30 * ph + drift * ph * w * 0.4, top: h - ph * h, width: sz, height: sz, borderRadius: sz, background: k % 4 ? '#3F4A55' : '#E3B73C', opacity: Math.sin(ph * Math.PI) * 0.9 * dense}} />;
      })}
    </div>
  );
};

/* ─────────── 0 : photo + fumée ─────────── */
const Intro: React.FC = () => {
  const t = useT();
  const out = prog(t, MICRO - 0.4, MICRO, easeIn);
  return (
    <AbsoluteFill style={{opacity: 1 - out}}>
      <At x={540} y={1060}>
        <div style={{position: 'relative', width: 960, height: 880, borderRadius: 34, overflow: 'hidden', boxShadow: '0 30px 70px rgba(20,40,60,0.35)'}}>
          <Img src={P('soudeur-fumees')} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${1.05 + t * 0.012})`}} />
          <Smoke x={0} y={0} w={960} h={880} n={50} dense={0.9 + prog(t, 3.3, 6) * 0.8} />
          <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(243,247,250,0) 60%, rgba(20,40,60,0.55))'}} />
        </div>
      </At>
      <Head text="Les fumées de soudage peuvent causer des *cancers*" at={0.1} until={3.1} size={70} accent={RED} />
      <Head text="Jamais une simple fumée *inoffensive*" at={3.3} until={5.4} size={74} accent={RED} />
      <Head text="Un mélange de *gaz* et de *particules métalliques*" at={5.6} until={8.6} size={68} />
    </AbsoluteFill>
  );
};

/* ─────────── 1 : microscope + flux vers le visage ─────────── */
const Micro: React.FC = () => {
  const t = useT();
  const lens = pop(t, MICRO + 0.2, 0.7);
  const flow = t >= 11.2;
  return (
    <AbsoluteFill>
      <Head text="Observez ce *nuage*" at={MICRO + 0.1} until={11.1} size={84} />
      <Head text="Il remonte vers le *visage*" at={11.3} until={14.3} size={80} accent={RED} />
      {!flow && (
        <At x={540} y={980} style={{transform: `translate(-50%, -50%) scale(${0.4 + 0.6 * lens})`, opacity: lens}}>
          <div style={{position: 'relative', width: 820, height: 820}}>
            <div style={{position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(circle, #FFFFFF 0%, #EAF2F6 60%, #CFDCE6 100%)', boxShadow: 'inset 0 0 60px rgba(20,40,60,0.35), 0 0 0 28px #1F2F3D, 0 30px 80px rgba(20,40,60,0.4)', overflow: 'hidden'}}>
              {Array.from({length: 55}, (_, k) => {
                const sz = SIZES[k % 5];
                const x = 410 + Math.cos(k * 2.4 + t * (0.2 + (k % 5) * 0.08)) * (60 + random(`m${k}`) * 300);
                const y = 410 + Math.sin(k * 1.7 + t * (0.25 + (k % 3) * 0.07)) * (60 + random(`n${k}`) * 300);
                return <div key={k} style={{position: 'absolute', left: x - sz[2], top: y - sz[2], width: sz[2] * 2, height: sz[2] * 2, borderRadius: '50%', background: sz[1], opacity: 0.85, boxShadow: `inset -${sz[2] * 0.3}px -${sz[2] * 0.3}px 0 rgba(0,0,0,0.15)`}} />;
              })}
              {Array.from({length: 6}, (_, k) => <div key={`g${k}`} style={{position: 'absolute', left: 120 + k * 110 + Math.sin(t + k) * 30, top: 200 + (k % 3) * 160, width: 160, height: 60, borderRadius: 30, background: 'rgba(93,107,120,0.12)', filter: 'blur(10px)'}} />)}
            </div>
            <div style={{position: 'absolute', left: -40, bottom: 40, padding: '10px 20px', borderRadius: 14, background: '#1F2F3D', color: '#fff', fontFamily: 'monospace', fontSize: 30}}>× 10 000</div>
          </div>
          <div style={{position: 'absolute', left: 0, right: 0, top: 880, display: 'flex', justifyContent: 'center', gap: 20}}>
            {SIZES.map(([l, c, r]) => <div key={l} style={{display: 'flex', alignItems: 'center', gap: 8}}><div style={{width: r * 1.4, height: r * 1.4, borderRadius: '50%', background: c}} /><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 22, color: INK}}>{l}</div></div>)}
          </div>
        </At>
      )}
      {flow && (
        <At x={540} y={1050} style={{opacity: pop(t, 11.3)}}>
          <div style={{position: 'relative', width: 960, height: 880, borderRadius: 34, overflow: 'hidden', boxShadow: '0 30px 70px rgba(20,40,60,0.35)'}}>
            <Img src={P('soudeur-etincelles')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '45% 50%', filter: 'brightness(0.9)'}} />
            <svg width={960} height={1020} viewBox="0 0 960 1020" preserveAspectRatio="xMidYMid slice" style={{position: 'absolute', inset: 0, width: 960, height: 880}}>
              {[0, 1, 2, 3, 4].map((k) => (
                <path key={k} d={`M${560 + k * 18} 760 C ${640 + k * 30} ${620 - k * 10}, ${420 - k * 20} ${520 - k * 15}, ${470 + k * 12} ${330 - k * 10}`} fill="none" stroke={k % 2 ? '#E3B73C' : 'rgba(255,255,255,0.85)'} strokeWidth={6} strokeLinecap="round" strokeDasharray="14 22" strokeDashoffset={-t * 120 - k * 20} opacity={prog(t, 11.6 + k * 0.1, 12.2 + k * 0.1)} />
              ))}
              <circle cx={470} cy={300} r={110 * pop(t, 13.0, 0.4)} fill="none" stroke={RED} strokeWidth={8} strokeDasharray="20 12" />
            </svg>
          </div>
        </At>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── 2 : parcours dans les voies respiratoires ─────────── */
const LEVELS = [75, 180, 290, 395, 497];
const Airway: React.FC = () => {
  const t = useT();
  const W = 1000;
  const k = W / 1084;
  const sx = 440 * k;
  return (
    <AbsoluteFill>
      <Head text="Une taille *microscopique*" at={PATH + 0.1} until={18.5} size={84} />
      <Head text="Jusqu'au fond des *poumons*" at={18.7} until={23.6} size={82} accent={RED} />
      <At x={540} y={1000} style={{opacity: pop(t, PATH + 0.3, 0.5)}}>
        <div style={{position: 'relative', width: W, height: 566 * k, borderRadius: 24, overflow: 'hidden', background: '#fff', boxShadow: '0 30px 70px rgba(20,40,60,0.25)'}}>
          <Img src={P('voies-respiratoires')} style={{width: '100%', height: '100%'}} />
          {/* particules qui descendent : chaque taille s'arrête à son niveau */}
          {SIZES.map(([, c, r], i) => Array.from({length: 4}, (_, j) => {
            const start = 16.4 + i * 0.9 + j * 0.18;
            const p = prog(t, start, start + 1.2 + i * 0.35, easeInOut);
            if (p <= 0) return null;
            const ty = (LEVELS[i] + (j - 1.5) * 6) * k;
            const x = (i >= 2 ? 545 * k : sx) + (j - 1.5) * 12 + (i >= 2 ? (j % 2 ? 1 : -1) * 0 : 0);
            const yy = -20 + (ty + 20) * p;
            const xx = p < 0.6 || i < 2 ? sx + (j - 1.5) * 10 : sx + (x - sx) * ((p - 0.6) / 0.4);
            const rr = r * 0.9 + 12;
            return <div key={`${i}-${j}`} style={{position: 'absolute', left: xx - rr / 2, top: yy - rr / 2, width: rr, height: rr, borderRadius: '50%', background: c, border: '3px solid #fff', boxShadow: `0 0 16px ${c}, 0 2px 6px rgba(0,0,0,0.3)`}} />;
          }))}
        </div>
      </At>
      {/* jauge de profondeur */}
      <div style={{position: 'absolute', left: 60, top: 1310, right: 60, display: 'flex', justifyContent: 'space-between', opacity: pop(t, 18.7)}}>
        {SIZES.map(([l, c], i) => <div key={l} style={{flex: 1, margin: '0 4px', padding: '10px 0', borderRadius: 12, background: prog(t, 17.6 + i * 0.9 + i * 0.35, 18 + i * 0.9 + i * 0.35) > 0 ? c : '#D5DEE6', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 22, textAlign: 'center'}}>{l}</div>)}
      </div>
      <div style={{position: 'absolute', left: 60, right: 60, top: 1390, display: 'flex', justifyContent: 'space-between', opacity: pop(t, 19.0)}}><T size={22} color={SMOKE}>Nez</T><T size={22} color={RED}>→ Alvéoles (plus profond)</T></div>
    </AbsoluteFill>
  );
};

/* ─────────── 3 : toxicité — pictogrammes et poumons qui s'assombrissent ─────────── */
const Picto: React.FC<{kind: number; p: number}> = ({kind, p}) => (
  <div style={{width: 230, height: 230, transform: `perspective(900px) rotateY(${(1 - p) * 180}deg)`, opacity: p > 0 ? 1 : 0}}>
    <svg width={230} height={230} viewBox="0 0 230 230">
      <rect x={40} y={40} width={150} height={150} rx={10} transform="rotate(45 115 115)" fill="#fff" stroke={RED} strokeWidth={14} />
      {kind === 0 && <g fill="#111"><rect x={104} y={62} width={22} height={74} rx={8} /><circle cx={115} cy={160} r={13} /></g>}
      {kind === 1 && <g fill="#111"><circle cx={115} cy={100} r={34} /><rect x={95} y={118} width={40} height={24} rx={6} /><circle cx={102} cy={98} r={9} fill="#fff" /><circle cx={128} cy={98} r={9} fill="#fff" /><path d="M70 160 L160 175 M70 175 L160 160" stroke="#111" strokeWidth={12} strokeLinecap="round" /></g>}
      {kind === 2 && <g fill="#111"><circle cx={115} cy={72} r={20} /><path d="M80 175 C 80 110, 150 110, 150 175 Z" /><path d="M115 118 L121 132 L136 133 L124 142 L128 157 L115 148 L102 157 L106 142 L94 133 L109 132 Z" fill="#fff" /></g>}
    </svg>
  </div>
);
const Tox: React.FC = () => {
  const t = useT();
  const dark = prog(t, 30.1, 33.0, easeInOut);
  const lungsOn = t >= 30.0;
  return (
    <AbsoluteFill>
      <Head text="Selon le *métal* soudé" at={TOX + 0.1} until={25.2} size={84} />
      <Head text="Irritantes, *toxiques*, *cancérogènes*" at={25.3} until={29.9} size={74} accent={RED} />
      <Head text="Risque de *cancer du poumon*" at={30.1} until={33.1} size={80} accent={RED} />
      <Head text="Et des troubles *neurologiques*" at={33.2} size={74} accent={'#6B4FA0'} />
      {!lungsOn && (
        <div style={{position: 'absolute', left: 0, right: 0, top: 820, display: 'flex', justifyContent: 'center', gap: 40}}>
          {[26.0, 26.9, 28.6].map((at, k) => (
            <div key={k} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14}}>
              <Picto kind={k} p={prog(t, at, at + 0.5, easeOut)} />
              <T size={28} color={RED} style={{opacity: pop(t, at + 0.3)}}>{['Irritant', 'Toxique', 'Cancérogène'][k]}</T>
            </div>
          ))}
        </div>
      )}
      {lungsOn && (
        <At x={540} y={1010} style={{opacity: pop(t, 30.1)}}>
          <div style={{position: 'relative', width: 880, height: 818, borderRadius: 30, overflow: 'hidden', background: '#fff', boxShadow: '0 30px 70px rgba(20,40,60,0.25)'}}>
            <Img src={P('poumons-particules')} style={{width: '100%', height: '100%'}} />
            {Array.from({length: 26}, (_, k) => {
              const left = random(`lx${k}`) > 0.5;
              const x = (left ? 0.21 + random(`a${k}`) * 0.2 : 0.47 + random(`a${k}`) * 0.2) * 880;
              const y = (0.52 + random(`b${k}`) * 0.36) * 818;
              const r = (10 + random(`c${k}`) * 28) * prog(dark, random(`d${k}`) * 0.6, random(`d${k}`) * 0.6 + 0.4);
              return <div key={k} style={{position: 'absolute', left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: '50%', background: 'radial-gradient(circle, rgba(40,40,45,0.85), rgba(40,40,45,0))'}} />;
            })}
            {t > 33.2 && <div style={{position: 'absolute', left: 560, top: 30, width: 150, height: 150, borderRadius: '50%', background: '#fff', boxShadow: `0 0 0 ${8 + Math.sin(t * 6) * 6}px rgba(107,79,160,0.35)`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${pop(t, 33.3, 0.4)})`}}><F n="cerveau" size={110} /></div>}
          </div>
        </At>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── 4 : recul de caméra vers l'atelier ─────────── */
const Spread: React.FC = () => {
  const t = useT();
  const back = prog(t, 39.6, 41.2, easeInOut);
  const cloud = prog(t, 40.6, 44.6, easeOut);
  return (
    <AbsoluteFill>
      <Head text="L'illusion s'arrête au *masque*" at={SPREAD + 0.1} until={40.0} size={78} accent={RED} />
      <Head text="Le nuage gagne *l'atelier*" at={40.1} until={42.5} size={82} />
      <Head text="Les *collègues* sont exposés" at={42.6} size={80} accent={RED} />
      {/* plan de l'atelier (vu du dessus) */}
      <At x={540} y={1000} style={{opacity: back}}>
        <div style={{position: 'relative', width: 960, height: 960, borderRadius: 30, background: '#fff', boxShadow: '0 30px 70px rgba(20,40,60,0.25)', backgroundImage: 'linear-gradient(rgba(20,40,60,0.06) 2px, transparent 2px), linear-gradient(90deg, rgba(20,40,60,0.06) 2px, transparent 2px)', backgroundSize: '60px 60px', overflow: 'hidden'}}>
          {[[60, 60, 300, 120], [600, 60, 300, 120], [60, 780, 420, 120], [640, 760, 260, 140]].map(([x, y, w, h], k) => <div key={k} style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: 14, background: '#E4EBF1'}} />)}
          {Array.from({length: 18}, (_, k) => {
            const a = (k / 18) * Math.PI * 2;
            const r = 40 + cloud * (160 + random(`s${k}`) * 260);
            return <div key={k} style={{position: 'absolute', left: 300 + Math.cos(a) * r * 0.6 + cloud * 160 - 90, top: 470 + Math.sin(a) * r * 0.6 - 90, width: 180, height: 180, borderRadius: '50%', background: 'rgba(93,107,120,0.28)', filter: 'blur(20px)'}} />;
          })}
          <At x={300} y={470}><div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}><div style={{width: 150, height: 150, borderRadius: 75, overflow: 'hidden', border: `6px solid ${TEAL}`}}><Img src={P('soudeur-fumees')} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div><T size={24}>Soudeur (masqué)</T></div></At>
          <At x={720} y={470}><div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}><div style={{width: 150, height: 150, borderRadius: 75, overflow: 'hidden', border: `6px solid ${cloud > 0.6 ? RED : '#B9C4CE'}`, boxShadow: cloud > 0.6 ? `0 0 0 ${10 + Math.sin(t * 8) * 6}px rgba(217,68,58,0.25)` : 'none'}}><Img src={P('technicien')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '62% 30%'}} /></div><T size={24} color={cloud > 0.6 ? RED : INK}>Collègue (exposé)</T></div></At>
        </div>
      </At>
      {/* photo plein cadre qui recule */}
      {back < 1 && (
        <At x={540 - back * 240} y={1060 - back * 90} style={{transform: `translate(-50%, -50%) scale(${1 - back * 0.84})`, opacity: 1 - back * 0.4}}>
          <div style={{width: 960, height: 880, borderRadius: 34 + back * 400, overflow: 'hidden', boxShadow: '0 30px 70px rgba(20,40,60,0.35)'}}><Img src={P('soudeur-fumees')} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
        </At>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── 5 : prévention à la source ─────────── */
const Source: React.FC = () => {
  const t = useT();
  const vac = t >= 48.2 && t < 52.8;
  const vent = t >= 52.8 && t < 58.0;
  const funnel = t >= 58.0;
  return (
    <AbsoluteFill>
      <Head text="Prévenir *à la source*" at={SOURCE + 0.1} until={48.2} size={88} accent={OK} />
      {t < 48.2 && (
        <At x={540} y={980} style={{opacity: pop(t, SOURCE + 0.4)}}>
          <div style={{display: 'flex', alignItems: 'flex-end', gap: 30}}>
            {[['Source', 'cible', OK, 300], ['Air ambiant', 'vent', TEAL, 220], ['Individu', 'casque', SMOKE, 150]].map(([l, n, c, h], k) => (
              <div key={l as string} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, opacity: pop(t, SOURCE + 0.6 + k * 0.3)}}>
                <div style={{width: 260, height: (h as number) * prog(t, SOURCE + 0.6 + k * 0.3, SOURCE + 1.3 + k * 0.3), borderRadius: 20, background: c as string, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 20, boxSizing: 'border-box'}}><F n={n as string} size={90} /></div>
                <T size={28}>{`${k + 1}. ${l}`}</T>
              </div>
            ))}
          </div>
        </At>
      )}
      {vac && (
        <AbsoluteFill style={{opacity: pop(t, 48.3)}}>
          <Head text="Aspirer *au point d'émission*" at={48.3} size={76} accent={OK} />
          <At x={540} y={980}>
            <div style={{position: 'relative', width: 960, height: 900}}>
              <div style={{position: 'absolute', left: 520, top: 40, width: 420, height: 380, borderRadius: 26, background: '#fff', boxShadow: '0 20px 50px rgba(20,40,60,0.2)', overflow: 'hidden'}}><Img src={P('aspirateur-fumees')} style={{width: '100%', height: '100%', objectFit: 'contain'}} /></div>
              <div style={{position: 'absolute', left: 40, top: 420, width: 520, height: 420, borderRadius: 26, overflow: 'hidden', boxShadow: '0 20px 50px rgba(20,40,60,0.2)'}}><Img src={P('soudeur-etincelles')} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
              {/* tourbillon d'aspiration vers la buse */}
              {Array.from({length: 40}, (_, k) => {
                const q = ((t * 0.7 + k / 40) % 1);
                const a = k * 0.9 + q * 8;
                const r = (1 - q) * 160;
                const x = 300 + (640 - 300) * q + Math.cos(a) * r;
                const y = 560 + (300 - 560) * q + Math.sin(a) * r * 0.6;
                return <div key={k} style={{position: 'absolute', left: x, top: y, width: 10 - q * 6, height: 10 - q * 6, borderRadius: 6, background: k % 3 ? '#4C5A66' : '#E3B73C', opacity: 1 - q * 0.6}} />;
              })}
            </div>
          </At>
        </AbsoluteFill>
      )}
      {vent && (
        <AbsoluteFill style={{opacity: pop(t, 52.9)}}>
          <Head text="Ventilation générale *adaptée*" at={52.9} until={55.4} size={74} accent={TEAL} />
          <Head text="Procédés *moins émissifs*" at={55.5} size={80} accent={OK} />
          <At x={540} y={980}>
            <svg width={960} height={820}>
              <rect x={10} y={10} width={940} height={800} rx={30} fill="#fff" stroke="#CBD6E0" strokeWidth={4} />
              {Array.from({length: 7}, (_, k) => <path key={k} d={`M40 ${120 + k * 95} C 300 ${80 + k * 95}, 600 ${170 + k * 95}, 900 ${120 + k * 95}`} fill="none" stroke={TEAL} strokeWidth={6} strokeLinecap="round" strokeDasharray="30 30" strokeDashoffset={-t * 160} opacity={0.6} />)}
              <g transform={`translate(860 120) rotate(${t * 360})`}>{[0, 1, 2, 3].map((k) => <ellipse key={k} cx={0} cy={-40} rx={18} ry={40} fill={INK} transform={`rotate(${k * 90})`} />)}<circle r={12} fill="#fff" /></g>
              <g transform="translate(120 620)">
                <rect x={0} y={0} width={340} height={40} rx={20} fill="#E4EBF1" />
                <rect x={0} y={0} width={340 * (1 - 0.6 * prog(t, 55.8, 57.4))} height={40} rx={20} fill={prog(t, 55.8, 57.4) > 0.9 ? OK : '#E07B2B'} />
                <text x={0} y={-16} fontFamily={sansFont} fontWeight={900} fontSize={30} fill={INK}>ÉMISSIONS</text>
              </g>
            </svg>
          </At>
        </AbsoluteFill>
      )}
      {funnel && (
        <AbsoluteFill style={{opacity: pop(t, 58.1)}}>
          <Head text="Puis la protection *individuelle*" at={58.1} size={74} accent={TEAL} />
          <At x={540} y={1000}>
            <svg width={900} height={860} viewBox="0 0 900 860">
              {[['Captage à la source', OK, 0], ['Ventilation générale', TEAL, 1], ['Procédés moins émissifs', '#7DB35A', 2], ['Protection individuelle', '#E07B2B', 3]].map(([l, c, k]) => {
                const i = k as number;
                const w = 860 - i * 180;
                const p = pop(t, 58.4 + i * 0.5, 0.4);
                const last = i === 3;
                return (
                  <g key={l as string} opacity={p} transform={`translate(0 ${(1 - p) * 30})`}>
                    <path d={`M${450 - w / 2} ${40 + i * 190} H${450 + w / 2} L${450 + w / 2 - 90} ${210 + i * 190} H${450 - w / 2 + 90} Z`} fill={c as string} opacity={last && t > 60.3 ? 1 : 0.9} />
                    <text x={450} y={135 + i * 190} textAnchor="middle" fontFamily={sansFont} fontWeight={900} fontSize={last ? 26 : 32} fill="#fff">{(l as string).toUpperCase()}</text>
                  </g>
                );
              })}
            </svg>
          </At>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── 6 : règle + air qui s'éclaircit ─────────── */
const Rule: React.FC = () => {
  const t = useT();
  const stamp = pop(t, 65.7, 0.25);
  const clear = prog(t, 68.6, 70.6, easeInOut);
  const end = t >= END;
  return (
    <AbsoluteFill>
      <Head text="Une règle *essentielle*" at={RULE + 0.1} until={END - 0.3} size={84} accent={RED} />
      {!end && (
        <At x={540} y={980} style={{transform: `translate(-50%, -50%) scale(${2.2 - 1.2 * stamp}) rotate(-6deg)`, opacity: stamp}}>
          <div style={{border: `12px solid ${RED}`, borderRadius: 26, padding: '30px 46px', background: 'rgba(255,255,255,0.9)', textAlign: 'center'}}>
            <T size={60} color={RED}>Jamais</T>
            <T size={60} color={RED}>« sans danger »</T>
          </div>
        </At>
      )}
      {end && (
        <AbsoluteFill style={{opacity: pop(t, END + 0.1)}}>
          <Head text="Capté *à la source*" at={END + 0.1} until={69.5} size={86} accent={OK} />
          <Head text="Soudeur et atelier *protégés*" at={69.6} size={78} accent={OK} />
          <At x={540} y={1050}>
            <div style={{position: 'relative', width: 960, height: 860, borderRadius: 34, overflow: 'hidden', boxShadow: '0 30px 70px rgba(20,40,60,0.3)'}}>
              <Img src={P('soudeur-etincelles')} style={{width: '100%', height: '100%', objectFit: 'cover', filter: `blur(${(1 - clear) * 10}px) grayscale(${1 - clear}) brightness(${0.8 + 0.2 * clear})`}} />
              <div style={{position: 'absolute', inset: 0, background: `rgba(93,107,120,${0.55 * (1 - clear)})`}} />
              <div style={{position: 'absolute', left: 30, right: 30, bottom: 30, display: 'flex', justifyContent: 'center', gap: 24, opacity: prog(t, 70.4, 70.9)}}>
                {['Soudeur protégé', 'Atelier protégé'].map((l) => <div key={l} style={{display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,0.94)', borderRadius: 40, padding: '12px 24px'}}><Check p={prog(t, 70.6, 71.0)} size={50} color={OK} /><T size={30}>{l}</T></div>)}
              </div>
            </div>
          </At>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

const CUES: Sfx[] = [
  {at: 0.05, s: 'bass-hit', v: 0.45},
  {at: 0.2, s: 'tension', v: 0.2, dur: 3},
  {at: 3.4, s: 'deep-hit', v: 0.4},
  ...[MICRO, PATH, TOX, SPREAD, SOURCE, RULE].map((at) => ({at: at - 0.3, s: 'soft-whoosh', v: 0.45})),
  {at: MICRO + 0.2, s: 'riser', v: 0.22, dur: 1.4},
  {at: 11.6, s: 'sfx/whoosh', v: 0.4},
  {at: 13.0, s: 'alarme', v: 0.12, dur: 0.8},
  ...SIZES.map((_, i) => ({at: 16.4 + i * 0.9 + 1.2 + i * 0.35, s: 'sfx/click', v: 0.35})),
  {at: 22.6, s: 'deep-hit', v: 0.45},
  ...[26.0, 26.9, 28.6].map((at) => ({at, s: 'sfx/swish', v: 0.45})),
  ...[26.4, 27.3, 29.0].map((at) => ({at, s: 'tampon', v: 0.45})),
  {at: 30.1, s: 'tension', v: 0.25, dur: 3},
  {at: 33.3, s: 'sfx/ding', v: 0.3},
  {at: 39.6, s: 'sfx/whoosh', v: 0.45},
  {at: 43.4, s: 'alarme', v: 0.12, dur: 1.0},
  ...[0, 1, 2].map((k) => ({at: SOURCE + 0.6 + k * 0.3, s: 'sfx/pop', v: 0.4})),
  {at: 48.4, s: 'soft-whoosh', v: 0.55, dur: 3},
  {at: 53.0, s: 'soft-whoosh', v: 0.4, dur: 2},
  {at: 57.4, s: 'validation', v: 0.4},
  ...[0, 1, 2, 3].map((k) => ({at: 58.4 + k * 0.5, s: 'sfx/pop', v: 0.38})),
  {at: 65.7, s: 'tampon', v: 0.7},
  {at: 68.6, s: 'riser', v: 0.22, dur: 2},
  {at: 70.6, s: 'validation', v: 0.45},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const DangerSoudage: React.FC = () => (
  <AbsoluteFill>
    <Lab />
    <Gate from={0} to={MICRO}><Intro /></Gate>
    <Gate from={MICRO} to={PATH}><Micro /></Gate>
    <Gate from={PATH} to={TOX}><Airway /></Gate>
    <Gate from={TOX} to={SPREAD}><Tox /></Gate>
    <Gate from={SPREAD} to={SOURCE}><Spread /></Gate>
    <Gate from={SOURCE} to={RULE}><Source /></Gate>
    <Gate from={RULE} to={OUTRO_AT}><Rule /></Gate>
    <Gate from={OUTRO_AT} to={999}><Outro at={OUTRO_AT} logo={LOGO} /></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0} to={OUTRO_AT}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-danger-soudage-origine.m4a')} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);
