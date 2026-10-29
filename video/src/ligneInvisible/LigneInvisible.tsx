/**
 * « LA LIGNE INVISIBLE » — film de motion design QHSE (72 s, 1080 × 1920, 30 i/s).
 * Couche 3D (Site3D, Three.js) + couche typographique cinétique 2D + bande-son originale synthétisée (scripts
 * Python/numpy, aucune musique ni son protégé). Récit en 7 actes :
 *  1. Ouverture — une étincelle tombe dans le noir, frappe le sol, le site industriel s'allume.
 *  2. Le danger — un scanner volumétrique révèle 4 dangers (définition ISO 45001 § 3.19).
 *  3. Le risque — un opérateur entre sous la charge suspendue : risque = probabilité × gravité (§ 3.21).
 *  4. Le modèle de Reason — la trajectoire d'accident traverse des barrières percées, le temps se fige et
 *     rembobine, une barrière se referme : l'accident s'arrête net.
 *  5. La hiérarchie des mesures — éliminer → substituer → protection collective → organisation → EPI (§ 8.1.2).
 *  6. L'amélioration continue — anneau PDCA autour du site, piliers Q-H-S-E.
 *  7. Finale — lever du jour, « on la tient. Ensemble. », signature UNIVERSNORMES.
 */
import React, {useEffect, useState} from 'react';
import {AbsoluteFill, Audio, Img, continueRender, delayRender, random, staticFile, useCurrentFrame} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
import {Scene3D, HAZ, HIER, clamp01, ease, outE, pg} from './Site3D';
import {sansFont} from '../theme';
import {LOGO} from '../implIso/kit';

export const LIGNE_FPS = 30;
export const LIGNE_DUR = 72;
export const LIGNE_FRAMES = LIGNE_FPS * LIGNE_DUR;
const MONO = '"JetBrains Mono", "IBM Plex Mono", "DejaVu Sans Mono", monospace';
const W = 1080, H = 1920;

/* ═════════════ Typographie cinétique ═════════════ */
/** Mot à mot : chaque mot sort d'un flou, monte et se pose ; `hi` = indices surlignés. */
const Words: React.FC<{text: string; at: number; out: number; size: number; y: number; hi?: number[]; c?: string; hc?: string; stagger?: number; align?: 'center' | 'left'; x?: number; w?: number; weight?: number}> = ({text, at, out, size, y, hi = [], c = '#fff', hc = '#F5C400', stagger = 0.07, align = 'center', x = 70, w = W - 140, weight = 900}) => {
  const t = useCurrentFrame() / LIGNE_FPS;
  if (t < at - 0.1 || t > out + 0.6) return null;
  const o = 1 - pg(t, out, out + 0.45);
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w, textAlign: align, fontFamily: sansFont, fontWeight: weight, fontSize: size, lineHeight: 1.04, letterSpacing: -1, color: c, opacity: o, transform: `translateY(${-pg(t, out, out + 0.45) * 40}px)`}}>
      {text.split(' ').map((wd, i) => {
        const p = outE(pg(t, at + i * stagger, at + i * stagger + 0.45));
        return <span key={i} style={{display: 'inline-block', marginRight: size * 0.24, opacity: p, filter: `blur(${(1 - p) * 14}px)`, transform: `translateY(${(1 - p) * size * 0.5}px) scale(${0.9 + 0.1 * p})`, color: hi.includes(i) ? hc : c, textShadow: hi.includes(i) ? `0 0 ${size * 0.4}px ${hc}88` : '0 4px 24px rgba(0,0,0,0.6)'}}>{wd}</span>;
      })}
    </div>
  );
};
/** Ligne d'étiquette monospace qui se tape, avec filet qui se trace. */
const Tag: React.FC<{text: string; at: number; out: number; y: number; c?: string; x?: number}> = ({text, at, out, y, c = '#9CC6FF', x = 70}) => {
  const t = useCurrentFrame() / LIGNE_FPS;
  if (t < at || t > out + 0.5) return null;
  const n = Math.floor(pg(t, at, at + text.length * 0.025) * text.length);
  return (
    <div style={{position: 'absolute', left: x, top: y, opacity: 1 - pg(t, out, out + 0.4), display: 'flex', alignItems: 'center', gap: 16}}>
      <div style={{width: 80 * outE(pg(t, at, at + 0.4)), height: 4, background: c}} />
      <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 30, letterSpacing: 6, color: c}}>{text.slice(0, n)}</div>
    </div>
  );
};
/** Grand titre lettre par lettre avec traînée lumineuse. */
const Title: React.FC<{text: string; at: number; out: number; y: number; size: number; c?: string}> = ({text, at, out, y, size, c = '#fff'}) => {
  const t = useCurrentFrame() / LIGNE_FPS;
  if (t < at - 0.1 || t > out + 0.7) return null;
  const o = 1 - pg(t, out, out + 0.6);
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: y, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: size, letterSpacing: size * 0.08, color: c, opacity: o, whiteSpace: 'nowrap'}}>
      {text.split('').map((ch, i) => {
        const a = at + i * 0.045;
        const p = outE(pg(t, a, a + 0.5));
        return <span key={i} style={{display: 'inline-block', opacity: p, transform: `translateY(${(1 - p) * -60}px) scaleY(${1 + (1 - p) * 1.4})`, filter: `blur(${(1 - p) * 10}px)`, textShadow: `0 0 ${30 * (1 - p) + 18}px rgba(255,180,90,${0.4 + 0.4 * (1 - p)})`}}>{ch === ' ' ? ' ' : ch}</span>;
      })}
    </div>
  );
};
/** Ligne horizontale lumineuse — le motif « ligne invisible » qui relie le film. */
const TheLine: React.FC<{at: number; out: number; y: number; c?: string; w?: number}> = ({at, out, y, c = '#FFB347', w = 820}) => {
  const t = useCurrentFrame() / LIGNE_FPS;
  if (t < at || t > out + 0.5) return null;
  const p = ease(pg(t, at, at + 0.9));
  const o = 1 - pg(t, out, out + 0.4);
  return <div style={{position: 'absolute', left: (W - w * p) / 2, top: y, width: w * p, height: 5, borderRadius: 3, background: `linear-gradient(90deg, transparent, ${c}, #fff, ${c}, transparent)`, boxShadow: `0 0 26px ${c}, 0 0 60px ${c}`, opacity: o}} />;
};

/* ═════════════ Post-production : vignette, grain, aberration, lettres-box, flashs ═════════════ */
const Post: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / LIGNE_FPS;
  const flash = [2.2, 33.6, 49.6, 59.6].reduce((a, x) => Math.max(a, Math.max(0, 1 - Math.abs(t - x) * (x === 2.2 ? 4 : 6))), 0);
  const freeze = t > 40.4 && t < 41 ? 1 : 0;
  const rewind = t > 41 && t < 42.4 ? 1 : 0;
  const bars = 1 - ease(pg(t, 66.5, 68)) * 0;
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 45%, transparent 45%, rgba(0,0,0,0.65) 100%)'}} />
      <AbsoluteFill style={{opacity: 0.07, backgroundImage: `repeating-radial-gradient(circle at ${random(`g${f}`) * 100}% ${random(`h${f}`) * 100}%, #fff 0 1px, transparent 1px 3px)`, mixBlendMode: 'overlay'}} />
      {(freeze || rewind) ? <AbsoluteFill style={{background: rewind ? 'repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0 2px, transparent 2px 6px)' : 'transparent', boxShadow: 'inset 0 0 0 8px rgba(255,45,85,0.55)'}} /> : null}
      {(freeze || rewind) ? <div style={{position: 'absolute', left: 0, right: 0, textAlign: 'center', top: 1660, fontFamily: MONO, fontWeight: 700, fontSize: 44, color: '#FF2D55', letterSpacing: 4, opacity: Math.sin(t * 14) > -0.4 ? 1 : 0.2}}>{rewind ? '◀◀ RETOUR' : '❚❚ ARRÊT SUR IMAGE'}</div> : null}
      <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 90 * bars, background: '#000'}} />
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 90 * bars, background: '#000'}} />
      {flash > 0 && <AbsoluteFill style={{background: '#FFF6E8', opacity: flash * 0.9}} />}
    </AbsoluteFill>
  );
};

/* ═════════════ Panneaux 2D synchronisés aux actes ═════════════ */
const RiskGauge: React.FC = () => {
  const t = useCurrentFrame() / LIGNE_FPS;
  if (t < 26.2 || t > 33.4) return null;
  const pA = outE(pg(t, 27.6, 29.0)), gA = outE(pg(t, 28.6, 30.0));
  const o = 1 - pg(t, 32.6, 33.3);
  const bar = (l: string, v: number, c: string, d: number) => (
    <div style={{display: 'flex', alignItems: 'center', gap: 20, marginTop: 18}}>
      <div style={{width: 260, fontFamily: MONO, fontWeight: 700, fontSize: 30, color: '#C9D8EE', letterSpacing: 3}}>{l}</div>
      <div style={{flex: 1, height: 26, borderRadius: 13, background: 'rgba(255,255,255,0.12)', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.25)'}}><div style={{width: `${v * d * 100}%`, height: '100%', background: `linear-gradient(90deg, ${c}88, ${c})`, boxShadow: `0 0 20px ${c}`}} /></div>
    </div>
  );
  return (
    <div style={{position: 'absolute', left: 70, right: 70, top: 1340, opacity: o * pg(t, 26.2, 26.8), padding: '26px 30px', borderRadius: 26, background: 'rgba(6,12,24,0.62)', border: '1px solid rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)'}}>
      {bar('PROBABILITÉ', pA, '#F5C400', 0.82)}
      {bar('GRAVITÉ', gA, '#FF3B30', 0.95)}
      <div style={{marginTop: 22, fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: '#fff', opacity: pg(t, 30.2, 30.8)}}>Niveau de risque : <span style={{color: '#FF3B30', textShadow: '0 0 20px #FF3B30'}}>INACCEPTABLE</span></div>
    </div>
  );
};

/* ═════════════ Film ═════════════ */
export const LigneInvisible: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / LIGNE_FPS;
  const [handle] = useState(() => delayRender('fonts'));
  const [ready, setReady] = useState(false);
  useEffect(() => { document.fonts.load('900 120px Montserrat').then(() => document.fonts.ready).then(() => { setReady(true); continueRender(handle); }); }, [handle]);
  return (
    <AbsoluteFill style={{background: '#03060D'}}>
      {ready && (
        <ThreeCanvas width={W} height={H} camera={{position: [0, 15, 4], fov: 40, near: 0.1, far: 400}} gl={{antialias: true, preserveDrawingBuffer: true}}>
          <Scene3D t={t} />
        </ThreeCanvas>
      )}

      {/* Acte 1 — ouverture */}
      <Tag text="UNIVERSNORMES · FILM QHSE" at={0.4} out={2.0} y={240} c="#FFB347" />
      <Title text="LA LIGNE" at={5.2} out={9.2} y={300} size={150} />
      <Title text="INVISIBLE" at={5.6} out={9.2} y={460} size={150} c="#FFB347" />
      <TheLine at={6.4} out={9.2} y={650} />
      <Words text="Entre un danger et un accident, il y a toujours une ligne." at={6.8} out={9.2} size={46} y={690} hi={[3, 6]} weight={700} />

      {/* Acte 2 — le danger */}
      <Tag text="01 · LE DANGER" at={10.0} out={21.6} y={190} c="#F5C400" />
      <Words text="Ce qui peut causer un dommage." at={10.4} out={21.6} size={74} y={250} hi={[4]} />
      <Words text="ISO 45001 § 3.19 — source pouvant causer un traumatisme ou une pathologie." at={11.6} out={21.6} size={30} y={1560} c="#9FB3CF" weight={700} stagger={0.03} />
      {HAZ.map((h, i) => <Words key={h.name} text={`${i + 1}. ${h.name.toLowerCase()}`} at={h.at} out={21.6} size={40} y={1250 + i * 64} x={90} align="left" c={h.c} weight={800} />)}

      {/* Acte 3 — le risque */}
      <Tag text="02 · LE RISQUE" at={22.8} out={33.0} y={190} c="#FF3B30" />
      <Words text="Le danger devient risque quand quelqu’un s’en approche." at={23.0} out={33.0} size={62} y={250} hi={[5, 6]} hc="#FF3B30" />
      <Words text="RISQUE = PROBABILITÉ × GRAVITÉ" at={26.2} out={33.0} size={50} y={1250} c="#fff" hi={[2, 4]} hc="#F5C400" stagger={0.05} />
      <RiskGauge />

      {/* Acte 4 — le modèle de Reason */}
      <Tag text="03 · LES BARRIÈRES" at={34.0} out={48.4} y={190} c="#F5C400" />
      <Words text="Chaque barrière a ses failles." at={34.3} out={40.2} size={74} y={250} hi={[3]} />
      <Words text="Quand les failles s’alignent, l’accident passe." at={37.2} out={40.2} size={46} y={1560} c="#C9D8EE" weight={700} hi={[5]} hc="#FF3B30" />
      <Words text="Revenons en arrière." at={41.0} out={42.6} size={74} y={250} c="#FF2D55" />
      <Words text="Il suffit qu’une seule tienne." at={43.2} out={48.4} size={78} y={250} hi={[3, 4]} hc="#22B573" />
      <Words text="Modèle du « fromage suisse » — James Reason." at={45.6} out={48.4} size={32} y={1560} c="#9FB3CF" weight={700} stagger={0.03} />

      {/* Acte 5 — hiérarchie des mesures */}
      <Tag text="04 · AGIR DANS LE BON ORDRE" at={49.9} out={58.4} y={190} c="#22B573" />
      <Words text="D’abord supprimer le danger. L’EPI en dernier." at={50.0} out={58.4} size={60} y={250} hi={[1, 3, 5]} hc="#22B573" />
      <Words text="ISO 45001 § 8.1.2 — hiérarchie des mesures de prévention" at={57.0} out={58.4} size={30} y={1560} c="#9FB3CF" weight={700} stagger={0.03} />
      {t > 50.4 && t < 58.6 && <div style={{position: 'absolute', right: 70, top: 470, height: 760, width: 60, opacity: pg(t, 50.4, 51) * (1 - pg(t, 58.2, 58.6))}}>
        <div style={{position: 'absolute', left: 26, top: 40, bottom: 40, width: 8, borderRadius: 4, background: 'linear-gradient(180deg, #22B573, #F5C400, #E04A3F)'}} />
        <div style={{position: 'absolute', left: -20, top: 0, width: 100, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 22, color: '#22B573'}}>+ EFFICACE</div>
        <div style={{position: 'absolute', left: -20, bottom: 0, width: 100, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 22, color: '#E04A3F'}}>− EFFICACE</div>
      </div>}

      {/* Acte 6 — PDCA */}
      <Tag text="05 · NE JAMAIS S’ARRÊTER" at={59.9} out={65.6} y={190} c="#1F6FD1" />
      <Words text="Planifier. Réaliser. Vérifier. Agir. Recommencer." at={60.2} out={65.6} size={62} y={250} hi={[0, 1, 2, 3]} hc="#9CC6FF" stagger={1.3} />
      <Words text="Qualité · Hygiène · Sécurité · Environnement" at={63.6} out={65.6} size={38} y={1560} c="#C9D8EE" weight={800} stagger={0.3} />

      {/* Acte 7 — finale */}
      <TheLine at={66.4} out={71.6} y={760} c="#FFB347" w={900} />
      <Title text="LA LIGNE INVISIBLE" at={66.6} out={71.6} y={610} size={72} />
      <Words text="On la tient. Ensemble." at={67.8} out={71.6} size={76} y={800} hi={[3]} hc="#FFB347" stagger={0.18} />
      {t > 68.8 && <div style={{position: 'absolute', left: 0, right: 0, top: 1120, display: 'flex', justifyContent: 'center', opacity: pg(t, 68.8, 69.6) * (1 - pg(t, 71.5, 72))}}>
        <div style={{background: '#fff', borderRadius: 28, padding: '16px 36px', boxShadow: '0 20px 60px rgba(0,0,0,0.35)', transform: `scale(${0.85 + 0.15 * outE(pg(t, 68.8, 69.6))})`}}><Img src={staticFile(LOGO)} style={{height: 110, display: 'block'}} /></div>
      </div>}
      {t > 69.6 && <div style={{position: 'absolute', left: 0, right: 0, top: 1290, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 28, letterSpacing: 5, color: '#fff', opacity: pg(t, 69.6, 70.4) * (1 - pg(t, 71.5, 72))}}>DES NORMES AUJOURD’HUI · UN AVENIR DURABLE DEMAIN</div>}

      <Post />
      <Audio src={staticFile('ligne-invisible/bande-son.wav')} />
    </AbsoluteFill>
  );
};
export const _li = [clamp01];
