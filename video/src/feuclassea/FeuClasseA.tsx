import React from 'react';
import {AbsoluteFill, Audio, Img, random, staticFile} from 'remotion';
import {easeIn, easeInOut, easeOut, Gate, Kinetic, prog, useT} from '../anim';
import {Captions} from '../components/Captions';
import {Backdrop, Check, shadow} from '../identui/IdentUi';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {colors, s, sansFont} from '../theme';
import {captions} from './captions';

/**
 * « Comment identifier un feu de classe A » (26 s) — UI motion premium (skill video-promo-diagnostic-qhse), voix d'origine.
 * Techniques nouvelles dans la série : pictogramme « A » qui s'embrase, tiroir de fiches A/B/C/D/F d'où sort la fiche A,
 * coupe de bûche aux fissures incandescentes, portique scanner qui valide bois / papier / carton, trappe qui rejette
 * l'extincteur inadapté, radar de localisation de l'extincteur, partage du message à l'équipe sur smartphone.
 */
const LOGO = 'promo/logo.png';
const RED = '#D9443A';
const EMBER = '#FF7A1A';
const OK = colors.green;
const OUTRO_AT = 23.0;
export const FEUCLASSEA_FRAMES = s(OUTRO_AT + 3.8);
const CLASSES: [string, string, string][] = [['A', 'Solides', '#E07B2B'], ['B', 'Liquides', '#2F6FB5'], ['C', 'Gaz', '#C6A400'], ['D', 'Métaux', '#7B8594'], ['F', 'Huiles de cuisson', '#6B4FA0']];

const At: React.FC<{x: number; y: number; children: React.ReactNode; style?: React.CSSProperties}> = ({x, y, children, style}) => (
  <div style={{position: 'absolute', left: x, top: y, transform: 'translate(-50%, -50%)', ...style}}>{children}</div>
);
const pop = (t: number, at: number, d = 0.35) => prog(t, at, at + d, easeOut);
const T: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 34, color = colors.navy, style}) => (
  <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: size, color, textTransform: 'uppercase', letterSpacing: -0.5, textAlign: 'center', lineHeight: 1.05, ...style}}>{children}</div>
);

/** Petites flammes (CSS) qui dansent. */
const Flames: React.FC<{w: number; h: number; n?: number; k?: number}> = ({w, h, n = 7, k = 1}) => {
  const t = useT();
  return (
    <div style={{position: 'relative', width: w, height: h}}>
      {Array.from({length: n}, (_, i) => {
        const fl = Math.sin(t * (10 + i) + i * 2) * 0.12;
        const ww = (w / n) * 1.8;
        const hh = h * (0.55 + random(`h${i}`) * 0.45) * k;
        return <div key={i} style={{position: 'absolute', left: (i / n) * w - ww * 0.2, bottom: 0, width: ww, height: hh, transform: `scale(${1 + fl}, ${1 - fl})`, transformOrigin: '50% 100%', borderRadius: '50% 50% 45% 45% / 65% 65% 35% 35%', background: 'radial-gradient(ellipse at 50% 80%, #FFF3C0 0%, #FFC94A 30%, #FF7A1A 58%, rgba(229,67,47,0) 76%)', filter: 'blur(1.5px)'}} />;
      })}
    </div>
  );
};

/* ─────────── 0 : pictogramme A qui s'embrase ─────────── */
const Hook: React.FC = () => {
  const t = useT();
  const p = pop(t, 0.1, 0.5);
  const ign = prog(t, 0.8, 1.6, easeOut);
  const zoom = prog(t, 2.0, 2.6, easeIn);
  return (
    <AbsoluteFill style={{opacity: 1 - zoom}}>
      <At x={540} y={880} style={{transform: `translate(-50%, -50%) scale(${(0.6 + 0.4 * p) * (1 + zoom * 4)})`}}>
        <div style={{position: 'relative', width: 560, height: 560, borderRadius: 50, background: RED, boxShadow: `0 40px 90px rgba(217,68,58,${0.3 + 0.4 * ign})`, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{position: 'absolute', left: 40, right: 40, bottom: 0, opacity: ign}}><Flames w={480} h={360 * ign} n={8} /></div>
          <div style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 420, color: '#fff', lineHeight: 1, textShadow: `0 0 ${40 * ign}px rgba(255,200,80,0.9)`}}>A</div>
        </div>
      </At>
      <Kinetic text="Tu connais un feu de *classe A* ?" at={0.2} until={2.3} y={1340} size={82} accent={RED} />
    </AbsoluteFill>
  );
};

/* ─────────── 1 : tiroir de fiches ─────────── */
const Drawer: React.FC = () => {
  const t = useT();
  const open = prog(t, 2.5, 3.1, easeOut);
  const pull = prog(t, 3.3, 4.1, easeInOut);
  return (
    <AbsoluteFill>
      <Kinetic text="Les matériaux *solides*" at={4.0} until={6.0} y={360} size={84} accent={'#E07B2B'} />
      <At x={540} y={1060}>
        <div style={{position: 'relative', width: 860, height: 760, perspective: 1600}}>
          {/* fiches */}
          {CLASSES.map(([l, d, c], k) => {
            const isA = k === 0;
            const y = 300 - k * 54 - (isA ? pull * 420 : 0);
            return (
              <div key={l} style={{position: 'absolute', left: 60 + k * 10, top: y, width: 740 - k * 20, height: 420, borderRadius: 26, background: '#fff', boxShadow: shadow, borderTop: `22px solid ${c}`, zIndex: isA && pull > 0.5 ? 20 : 10 - k, transform: `scale(${isA ? 1 + pull * 0.08 : 1})`, opacity: open}}>
                <div style={{position: 'absolute', left: 30, top: -60, width: 110, height: 60, borderRadius: '18px 18px 0 0', background: c, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={44} color="#fff">{l}</T></div>
                {isA && (
                  <div style={{padding: '40px 40px', display: 'flex', alignItems: 'center', gap: 30, opacity: prog(t, 3.8, 4.2)}}>
                    <div style={{width: 160, height: 160, borderRadius: 24, background: RED, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 120, color: '#fff'}}>A</div>
                    <div>
                      <T size={54} style={{textAlign: 'left'}}>Feux de solides</T>
                      <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 32, color: '#6B7684', marginTop: 10}}>{t > 4.8 ? 'Matériaux combustibles' : '…'}</div>
                    </div>
                  </div>
                )}
                {!isA && <div style={{position: 'absolute', right: 30, top: 14}}><T size={26} color="#8A93A0">{d}</T></div>}
              </div>
            );
          })}
          {/* caisson du tiroir */}
          <div style={{position: 'absolute', left: 0, right: 0, top: 330, height: 430, borderRadius: '0 0 30px 30px', background: 'linear-gradient(180deg, #2B4A7A, #0E2A5C)', boxShadow: shadow, zIndex: 15, transform: `translateY(${(1 - open) * 120}px)`}}>
            <div style={{position: 'absolute', left: 330, top: 80, width: 200, height: 40, borderRadius: 20, background: 'rgba(255,255,255,0.3)'}} />
          </div>
        </div>
      </At>
    </AbsoluteFill>
  );
};

/* ─────────── 2 : braises (coupe de bûche) ─────────── */
const Embers: React.FC = () => {
  const t = useT();
  const glow = prog(t, 6.4, 7.8, easeInOut);
  const cracks = Array.from({length: 14}, (_, k) => {
    const a = (k / 14) * Math.PI * 2 + random(`a${k}`) * 0.3;
    const pts: string[] = [];
    for (let r = 0; r <= 1; r += 0.2) pts.push(`${300 + Math.cos(a + (random(`j${k}${r}`) - 0.5) * 0.4) * r * 250},${300 + Math.sin(a + (random(`j${k}${r}`) - 0.5) * 0.4) * r * 250}`);
    return pts.join(' ');
  });
  return (
    <AbsoluteFill>
      <Kinetic text="Qui brûlent avec des *braises*" at={6.0} until={9.1} y={360} size={82} accent={EMBER} />
      <At x={540} y={1020} style={{transform: `translate(-50%, -50%) scale(${pop(t, 6.0, 0.5)})`}}>
        <svg width={600} height={600}>
          <defs><filter id="gl"><feGaussianBlur stdDeviation="6" /></filter></defs>
          <circle cx={300} cy={300} r={290} fill="#5A4636" />
          {[250, 200, 150, 100, 55].map((r, k) => <circle key={k} cx={300} cy={300} r={r} fill="none" stroke="#3E2F24" strokeWidth={6} />)}
          <circle cx={300} cy={300} r={240} fill={`rgba(255,122,26,${0.25 * glow + Math.sin(t * 5) * 0.05 * glow})`} />
          {cracks.map((pts, k) => (
            <g key={k}>
              <polyline points={pts} fill="none" stroke={EMBER} strokeWidth={14} filter="url(#gl)" opacity={glow * (0.7 + Math.sin(t * 6 + k) * 0.3)} />
              <polyline points={pts} fill="none" stroke="#FFE0A0" strokeWidth={4} opacity={glow} pathLength={1} strokeDasharray={`${glow} 1`} />
            </g>
          ))}
        </svg>
      </At>
      {Array.from({length: 18}, (_, k) => {
        const q = ((t * 0.5 + random(`q${k}`)) % 1);
        return glow > 0.3 ? <div key={k} style={{position: 'absolute', left: 300 + random(`x${k}`) * 480, top: 1000 - q * 600, width: 8, height: 8, borderRadius: 4, background: '#FFB13B', boxShadow: `0 0 10px ${EMBER}`, opacity: Math.sin(q * Math.PI)}} /> : null;
      })}
    </AbsoluteFill>
  );
};

/* ─────────── 3 : portique scanner bois / papier / carton ─────────── */
const MATS: [string, string, number][] = [['Bois', 'arbre', 9.6], ['Papier', 'parchemin', 10.8], ['Carton', 'colis', 11.4]];
const Scanner: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Kinetic text="Bois, papier, *carton*" at={9.2} until={12.9} y={360} size={88} accent={'#E07B2B'} />
      {/* tapis */}
      <div style={{position: 'absolute', left: 0, right: 0, top: 1260, height: 60, background: '#2B3440', backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.15) 0 20px, transparent 20px 60px)', backgroundPosition: `${-t * 300}px 0`}} />
      {/* portique */}
      <div style={{position: 'absolute', left: 400, top: 700, width: 280, height: 570, border: '26px solid #0E2A5C', borderBottom: 'none', borderRadius: '40px 40px 0 0', boxSizing: 'border-box'}}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 30, height: 8, background: MATS.some(([, , at]) => t > at && t < at + 0.6) ? OK : '#5A6B80', boxShadow: MATS.some(([, , at]) => t > at && t < at + 0.6) ? `0 0 30px ${OK}` : 'none'}} />
      </div>
      {MATS.map(([l, n, at]) => {
        const x = -200 + prog(t, at - 0.9, at + 1.0, (v) => v) * 1500;
        const passed = t > at;
        return (
          <div key={l} style={{position: 'absolute', left: x - 120, top: 1000, width: 240, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {passed && <div style={{marginBottom: 6, transform: `scale(${pop(t, at, 0.3)})`, display: 'flex', alignItems: 'center', gap: 6, background: OK, borderRadius: 30, padding: '6px 14px'}}><T size={24} color="#fff">Classe A</T><span style={{color: '#fff', fontSize: 26}}>✓</span></div>}
            <div style={{width: 200, height: 200, borderRadius: 30, background: '#fff', boxShadow: shadow, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={n} size={140} /></div>
            <T size={30} style={{marginTop: 8}}>{l}</T>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

/* ─────────── 4 : le bon extincteur (trappe) puis localisation ─────────── */
const EXT: [string, boolean, string][] = [['Eau pulvérisée', true, '#2F6FB5'], ['Mousse', true, '#7DB35A'], ['Poudre ABC', true, '#E3B73C'], ['CO₂', false, '#3A3F47']];
const Extinction: React.FC = () => {
  const t = useT();
  const loc = t >= 16.9;
  return (
    <AbsoluteFill>
      <Kinetic text="Un moyen d'extinction *adapté*" at={13.0} until={16.8} y={360} size={76} accent={OK} />
      <Kinetic text="Et les *équipements* du site" at={17.0} until={19.7} y={360} size={78} />
      {!loc && (
        <>
          <div style={{position: 'absolute', left: 60, right: 60, top: 560, display: 'flex', justifyContent: 'space-between'}}>
            {EXT.map(([l, ok, c], k) => {
              const at = 13.8 + k * 0.6;
              const p = pop(t, at, 0.35);
              const drop = !ok ? prog(t, 16.0, 16.7, easeIn) : 0;
              return (
                <div key={l} style={{width: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: p * (1 - drop * 0.9), transform: `translateY(${(1 - p) * -80 + drop * 700}px) rotate(${drop * 30}deg)`}}>
                  <div style={{width: 120, height: 300, borderRadius: '50px 50px 24px 24px', background: `linear-gradient(90deg, ${RED}, #F06A5B 40%, ${RED})`, position: 'relative', boxShadow: shadow}}>
                    <div style={{position: 'absolute', left: 14, right: 14, top: 90, height: 110, borderRadius: 10, background: c, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={18} color="#fff">{l}</T></div>
                    <div style={{position: 'absolute', left: 40, top: -30, width: 40, height: 40, borderRadius: 8, background: '#333'}} />
                  </div>
                  <T size={26} style={{marginTop: 12}}>{l}</T>
                  {t > 15.2 && <div style={{marginTop: 8, transform: `scale(${pop(t, 15.2 + k * 0.1, 0.3)})`}}>{ok ? <Check p={1} size={56} color={OK} /> : <div style={{width: 56, height: 56, borderRadius: 28, background: RED, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 36, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>✕</div>}</div>}
                </div>
              );
            })}
          </div>
          {/* trappe */}
          <div style={{position: 'absolute', left: 60, right: 60, top: 1110, height: 24, display: 'flex'}}>
            <div style={{flex: 3, background: '#0E2A5C', borderRadius: 12}} />
            <div style={{flex: 1, position: 'relative'}}><div style={{position: 'absolute', left: 0, right: 0, height: 24, background: RED, borderRadius: 12, transformOrigin: '100% 50%', transform: `rotate(${prog(t, 15.9, 16.2) * 70}deg)`}} /></div>
          </div>
          <At x={540} y={1260} style={{opacity: pop(t, 16.1)}}><T size={28} color="#8A93A0">CO₂ : non adapté aux feux de classe A</T></At>
        </>
      )}
      {loc && (
        <At x={540} y={1000} style={{opacity: pop(t, 17.0)}}>
          <div style={{position: 'relative', width: 900, height: 900, borderRadius: 40, background: '#EEF2F7', boxShadow: shadow, overflow: 'hidden', backgroundImage: 'linear-gradient(rgba(14,42,92,0.06) 2px, transparent 2px), linear-gradient(90deg, rgba(14,42,92,0.06) 2px, transparent 2px)', backgroundSize: '60px 60px'}}>
            {[[60, 60, 330, 200], [520, 60, 320, 260], [60, 640, 360, 200], [560, 620, 280, 220]].map(([x, y, w, h], k) => <div key={k} style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: 16, background: '#D9E1EA'}} />)}
            {[0, 1, 2].map((r) => {
              const ph = ((t - 17.0 + r * 0.5) % 1.5) / 1.5;
              return <div key={r} style={{position: 'absolute', left: 450 - 420 * ph, top: 450 - 420 * ph, width: 840 * ph, height: 840 * ph, borderRadius: '50%', border: `4px solid rgba(46,155,62,${1 - ph})`}} />;
            })}
            <At x={450} y={450}><div style={{width: 46, height: 46, borderRadius: 23, background: '#2F6FB5', border: '8px solid #fff', boxShadow: shadow}} /></At>
            <At x={680} y={400} style={{transform: `translate(-50%, -100%) scale(${pop(t, 17.9, 0.4)})`}}>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{width: 150, height: 150, borderRadius: 75, background: '#fff', border: `6px solid ${RED}`, overflow: 'hidden', boxShadow: shadow}}><Img src={staticFile('permisfeu/extincteur.jpg')} style={{width: '100%', height: '100%', objectFit: 'contain'}} /></div>
                <div style={{width: 0, height: 0, borderLeft: '18px solid transparent', borderRight: '18px solid transparent', borderTop: `26px solid ${RED}`}} />
              </div>
            </At>
            <div style={{position: 'absolute', left: 30, right: 30, bottom: 30, display: 'flex', justifyContent: 'center', opacity: pop(t, 18.4)}}><div style={{display: 'flex', alignItems: 'center', gap: 12, background: '#fff', borderRadius: 40, padding: '12px 26px', boxShadow: shadow}}><Check p={prog(t, 18.6, 19.0)} size={48} color={OK} /><T size={30}>Disponible sur le site</T></div></div>
          </div>
        </At>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── 5 : partage à l'équipe ─────────── */
const Share: React.FC = () => {
  const t = useT();
  const sent = prog(t, 21.6, 22.0, easeOut);
  return (
    <AbsoluteFill>
      <Kinetic text="*Partage* à ton équipe" at={19.8} y={360} size={88} accent={OK} />
      <At x={540} y={1030} style={{transform: `translate(-50%, -50%) translateY(${(1 - pop(t, 19.8, 0.5)) * 300}px)`}}>
        <div style={{width: 600, height: 1080, borderRadius: 70, background: '#111', padding: 20, boxSizing: 'border-box', boxShadow: shadow}}>
          <div style={{width: '100%', height: '100%', borderRadius: 54, background: '#F4F6F9', position: 'relative', overflow: 'hidden'}}>
            <div style={{position: 'absolute', left: 30, right: 30, top: 60, borderRadius: 26, background: '#fff', boxShadow: '0 8px 18px rgba(0,0,0,0.08)', padding: 22, transform: `translateY(${sent * -10}px)`}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 14}}><div style={{width: 80, height: 80, borderRadius: 18, background: RED, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: '#fff'}}>A</div><T size={30} style={{textAlign: 'left'}}>Feu de classe A</T></div>
              <div style={{marginTop: 14, fontFamily: sansFont, fontWeight: 700, fontSize: 26, color: '#4A5563', lineHeight: 1.3}}>Solides combustibles · braises · bois, papier, carton · extincteur adapté</div>
            </div>
            {/* feuille de partage */}
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 520, borderRadius: '40px 40px 0 0', background: '#fff', boxShadow: '0 -10px 30px rgba(0,0,0,0.12)', transform: `translateY(${(1 - pop(t, 20.4, 0.5)) * 520}px)`, padding: 30, boxSizing: 'border-box'}}>
              <div style={{width: 80, height: 8, borderRadius: 4, background: '#D5D9DE', margin: '0 auto 24px'}} />
              <T size={28} color="#8A93A0">Partager avec l'équipe</T>
              <div style={{display: 'flex', justifyContent: 'space-around', marginTop: 30}}>
                {['ouvrier', 'ouvrier-dark', 'salariee', 'agent-hse'].map((n, k) => {
                  const sel = t > 20.9 + k * 0.15;
                  return <div key={n} style={{position: 'relative', width: 110, height: 110, borderRadius: 55, background: '#EEF2F7', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `5px solid ${sel ? OK : 'transparent'}`}}><F n={n} size={80} />{sel && <div style={{position: 'absolute', right: -6, bottom: -6}}><Check p={1} size={38} color={OK} /></div>}</div>;
                })}
              </div>
              <div style={{marginTop: 50, height: 100, borderRadius: 50, background: sent > 0.5 ? OK : '#2F6FB5', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${1 - Math.sin(sent * Math.PI) * 0.06})`}}><T size={34} color="#fff">{sent > 0.5 ? 'Envoyé ✓' : 'Envoyer'}</T></div>
            </div>
          </div>
        </div>
      </At>
    </AbsoluteFill>
  );
};

const CUES: Sfx[] = [
  {at: 0.05, s: 'bass-hit', v: 0.45},
  {at: 0.8, s: 'sfx/whoosh', v: 0.45},
  {at: 2.0, s: 'soft-whoosh', v: 0.5},
  {at: 2.5, s: 'cadenas', v: 0.4},
  {at: 3.3, s: 'page', v: 0.55},
  {at: 4.1, s: 'sfx/pop', v: 0.4},
  {at: 5.9, s: 'sfx/swish', v: 0.45},
  {at: 6.4, s: 'tension', v: 0.22, dur: 2.6},
  ...[9.6, 10.8, 11.4].flatMap((at) => [{at, s: 'notification', v: 0.35}]),
  {at: 12.9, s: 'sfx/swish', v: 0.45},
  ...[0, 1, 2, 3].map((k) => ({at: 13.8 + k * 0.6, s: 'sfx/pop', v: 0.38})),
  ...[0, 1, 2, 3].map((k) => ({at: 15.2 + k * 0.1, s: 'tick', v: 0.4})),
  {at: 15.9, s: 'cadenas', v: 0.5},
  {at: 16.3, s: 'sfx/thud', v: 0.45},
  {at: 16.9, s: 'soft-whoosh', v: 0.45},
  {at: 17.9, s: 'sfx/ding', v: 0.35},
  {at: 18.6, s: 'validation', v: 0.4},
  {at: 19.7, s: 'sfx/swish', v: 0.45},
  {at: 20.4, s: 'sfx/whoosh', v: 0.35},
  ...[0, 1, 2, 3].map((k) => ({at: 20.9 + k * 0.15, s: 'sfx/click', v: 0.35})),
  {at: 21.7, s: 'notification', v: 0.45},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const FeuClasseA: React.FC = () => (
  <AbsoluteFill>
    <Backdrop />
    <Gate from={0} to={2.6}><Hook /></Gate>
    <Gate from={2.4} to={6.0}><Drawer /></Gate>
    <Gate from={6.0} to={9.2}><Embers /></Gate>
    <Gate from={9.2} to={13.0}><Scanner /></Gate>
    <Gate from={13.0} to={19.8}><Extinction /></Gate>
    <Gate from={19.8} to={OUTRO_AT}><Share /></Gate>
    <Gate from={OUTRO_AT} to={999}><Outro at={OUTRO_AT} logo={LOGO} /></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0} to={OUTRO_AT}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-feu-classe-a-origine.m4a')} trimAfter={s(22.9)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);
