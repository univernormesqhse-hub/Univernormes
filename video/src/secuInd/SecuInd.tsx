import React from 'react';
import {AbsoluteFill, Audio, Img, random, staticFile} from 'remotion';
import {Gate} from '../anim';
import {Captions} from '../components/Captions';
import {Blinds, Board, Card, Center, Cite, Deep, Dust, Flap, Kin, Out, Pill, Stamp, Tile, Word} from '../durab/Durab';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {s, sansFont} from '../theme';
import {Abs, Bg, DIM, easeIn, easeInOut, easeOut, GREEN, INK, lerp, LOGO, PAPER, PH, pop, prog, RED, spring, T, useT} from '../implIso/kit';
import {captions} from './captions';

/**
 * « Sécurité au travail vs sécurité industrielle » (3 min 33) — capsule « hors normes » : voix d'origine, sous-titres
 * recalés mot à mot, photos réelles, thème « papier quadrillé ».
 * Fil rouge inédit : LES PUISSANCES DE DIX. Le propos est un voyage du micro au macro : l'en-tête porte une échelle de
 * zoom (travailleur · atelier · site · territoire) dont le curseur suit le niveau du discours, et un filtre des
 * 5 critères (périmètre, échelle, risques, référentiel, réglementation) qui s'allument un à un. La séquence d'ouverture
 * est un zoom arrière continu : le travailleur s'emboîte dans l'usine, qui s'emboîte dans le territoire.
 * Transition inédite : le ZOOM ×10 — la scène se rétracte au centre d'anneaux d'échelle, le critère s'annonce en tuiles,
 * puis la vue suivante s'ouvre.
 * Reprend le meilleur de la série : tuiles en bois, palettes d'affichage, mise en abyme, ondes de choc, store vénitien,
 * photos en profondeur 3D, clé de voûte, écran partagé, mille-feuille, balance, tampons, poussière, cinétique.
 */
const TRAV = '#1F6FD1';
const IND = '#D7263D';
const GOLD = '#F5B700';
const ORANGE = '#F07A12';
const OUTRO_AT = 213.4;
export const SECUIND_FRAMES = s(OUTRO_AT + 3.8);
const CRIT = [
  {at: 47.1, l: 'Périmètre', c: '#5B4FCF'},
  {at: 85.8, l: 'Échelle', c: '#0F9D8F'},
  {at: 105.0, l: 'Risques', c: IND},
  {at: 130.1, l: 'Référentiel', c: ORANGE},
  {at: 171.0, l: 'Réglementation', c: INK},
];
const critIdx = (t: number) => CRIT.reduce((k, c, i) => (t >= c.at ? i : k), -1);
/* niveau de zoom : 0 travailleur · 1 atelier · 2 site · 3 territoire */
const ZK: [number, number][] = [[0, 0], [12.5, 0], [24, 3], [29.6, 1.5], [52.0, 0], [58.5, 2.5], [69.0, 1], [77.0, 2.5], [80.9, 3], [89.0, 0.5], [94.0, 2], [97.8, 3], [109.0, 0], [115.7, 3], [130.0, 0], [149.0, 3], [171.0, 1.5]];
const zoomAt = (t: number) => {
  let i = 0;
  while (i < ZK.length - 1 && t >= ZK[i + 1][0]) i++;
  const prev = i > 0 ? ZK[i - 1][1] : 0;
  return lerp(prev, ZK[i][1], easeInOut(Math.min(1, Math.max(0, (t - ZK[i][0]) / 1.4))));
};
const LEVELS = ['travailleur', 'atelier', 'site', 'territoire'];

/* ═════════════ Fil rouge ═════════════ */
const Header: React.FC = () => {
  const t = useT();
  const z = zoomAt(t);
  const ci = critIdx(t);
  return (
    <AbsoluteFill style={{zIndex: 40, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: '50%', top: 56, transform: 'translateX(-50%)', background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 8px 24px rgba(20,33,61,0.12)'}}><Img src={staticFile(LOGO)} style={{height: 76, display: 'block'}} /></div>
      {t > 2.6 && t < OUTRO_AT && (
        <div style={{position: 'absolute', left: 36, right: 36, top: 182, height: 98, borderRadius: 24, background: '#ffffffEC', boxShadow: '0 8px 20px rgba(20,33,61,0.1)', padding: '10px 22px', boxSizing: 'border-box', opacity: pop(t, 2.6)}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 18, color: TRAV, width: 64}}>MICRO</div>
            <div style={{flex: 1, position: 'relative', height: 30}}>
              <div style={{position: 'absolute', left: 0, right: 0, top: 13, height: 6, borderRadius: 3, background: `linear-gradient(90deg, ${TRAV}, ${IND})`}} />
              {LEVELS.map((l, i) => <div key={i} style={{position: 'absolute', left: `${(i / 3) * 100}%`, top: 0, transform: 'translateX(-50%)', textAlign: 'center'}}><div style={{width: 4, height: 30, background: '#fff', margin: '0 auto'}} /></div>)}
              <div style={{position: 'absolute', left: `calc(${(z / 3) * 100}% - 15px)`, top: 1, width: 30, height: 30, borderRadius: 15, background: '#fff', border: `6px solid ${z < 1.5 ? TRAV : IND}`, boxSizing: 'border-box'}} />
            </div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 18, color: IND, width: 64, textAlign: 'right'}}>MACRO</div>
          </div>
          <div style={{display: 'flex', gap: 6, marginTop: 10}}>
            {CRIT.map((c, i) => <div key={i} style={{flex: 1, textAlign: 'center', padding: '3px 0', borderRadius: 8, background: i === ci ? c.c : i < ci ? `${c.c}33` : '#EEF1F5', color: i === ci ? '#fff' : i < ci ? c.c : '#A9B1BE', fontFamily: sansFont, fontWeight: 900, fontSize: 15}}>{i + 1}·{c.l}</div>)}
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
/** Le zoom ×10 : anneaux d'échelle + critère en tuiles. */
const ZoomX: React.FC<{i: number}> = ({i}) => {
  const t = useT();
  const c = CRIT[i];
  const k = t - c.at;
  if (k < 0 || k > 2.6) return null;
  const inn = prog(t, c.at, c.at + 0.5, easeInOut);
  const out = prog(t, c.at + 2.0, c.at + 2.6, easeInOut);
  const panel = inn * (1 - out);
  return (
    <AbsoluteFill style={{zIndex: 35, pointerEvents: 'none'}}>
      <AbsoluteFill style={{background: `rgba(244,241,232,${0.94 * panel})`}} />
      {[0, 1, 2, 3, 4].map((j) => {
        const r = ((k * 700 + j * 220) % 1100);
        return <div key={j} style={{position: 'absolute', left: 540 - r, top: 960 - r, width: r * 2, height: r * 2, borderRadius: '50%', border: `4px solid ${c.c}`, opacity: panel * (1 - r / 1100)}} />;
      })}
      <Abs x={0} y={640} w={1080} style={{opacity: panel}}>
        <div style={{display: 'flex', justifyContent: 'center', gap: 6}}>{'×10'.split('').map((ch, j) => <Flap key={j} ch={ch} at={c.at + 0.1 + j * 0.05} h={110} c={c.c} n={8} />)}</div>
        <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 34, letterSpacing: 6, color: DIM, textAlign: 'center', marginTop: 26}}>CRITÈRE {i + 1}</div>
        <div style={{marginTop: 18}}><Word text={c.l.toUpperCase()} at={c.at + 0.3} size={c.l.length > 10 ? 74 : 96} c={c.c} variant={i % 3} gap={6} /></div>
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ Couverture ═════════════ */
const Cover: React.FC = () => {
  const t = useT();
  const out = prog(t, 2.0, 2.7, easeIn);
  if (out >= 1) return null;
  return (
    <AbsoluteFill style={{zIndex: 60, background: PAPER, opacity: 1 - out}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 880, overflow: 'hidden', clipPath: 'polygon(0 0, 58% 0, 42% 100%, 0 100%)'}}><Img src={PH('induction/technicien-hse.jpg')} style={{width: 1080, height: 880, objectFit: 'cover', objectPosition: '30% 30%'}} /></div>
      <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 880, overflow: 'hidden', clipPath: 'polygon(58% 0, 100% 0, 100% 100%, 42% 100%)'}}><Img src={PH('smi/raffinerie.jpg')} style={{width: 1080, height: 880, objectFit: 'cover', objectPosition: '70% 40%'}} /></div>
      <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 880, background: 'linear-gradient(100deg, transparent 49.4%, #fff 49.5%, #fff 50.5%, transparent 50.6%)'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 34%, ${PAPER}DD 43%, ${PAPER} 47%)`}} />
      <Abs x={0} y={90} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={50} y={790} w={980} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: INK, color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: 30, letterSpacing: 3}}>DU MICRO AU MACRO</div>
        <T size={84} color={TRAV} style={{marginTop: 20, textTransform: 'uppercase', letterSpacing: -2}}>Sécurité au travail</T>
        <T size={60} color={DIM} style={{margin: '4px 0'}}>vs</T>
        <T size={84} style={{textTransform: 'uppercase', letterSpacing: -2}}><span style={{background: IND, color: '#fff', padding: '0 18px', borderRadius: 16}}>Sécurité industrielle</span></T>
      </Abs>
      <Abs x={0} y={1330} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 8}}>{CRIT.map((c, i) => <div key={i} style={{padding: '8px 16px', borderRadius: 12, background: c.c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 22}}>{c.l}</div>)}</Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ INTRO ═════════════ */
const Demarcation: React.FC = () => {
  const t = useT();
  const cross = prog(t, 7.0, 7.5, easeOut);
  return (
    <Out end={11.6}>
      <Abs x={60} y={360} w={960} style={{display: 'flex', alignItems: 'stretch', gap: 0}}>
        <div style={{flex: 1, padding: 30, borderRadius: '26px 0 0 26px', background: `${TRAV}18`, border: `5px solid ${TRAV}`, textAlign: 'center', opacity: pop(t, 0.2)}}><F n="casque" size={120} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: TRAV, marginTop: 10}}>Sécurité<br />au travail</div></div>
        <div style={{width: 20, background: `repeating-linear-gradient(180deg, ${INK} 0 20px, transparent 20px 32px)`, opacity: pop(t, 4.5)}} />
        <div style={{flex: 1, padding: 30, borderRadius: '0 26px 26px 0', background: `${IND}18`, border: `5px solid ${IND}`, textAlign: 'center', opacity: pop(t, 1.8)}}><F n="usine" size={120} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: IND, marginTop: 10}}>Sécurité<br />industrielle</div></div>
      </Abs>
      <Center y={820}><div style={{position: 'relative', display: 'inline-block', opacity: pop(t, 6.5)}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 48, color: DIM}}>une bataille de mots ?</div><div style={{position: 'absolute', left: -10, right: -10, top: '50%', height: 10, background: RED, transform: `scaleX(${cross})`, transformOrigin: '0 50%'}} /></div></Center>
      <Abs x={0} y={940} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={8.8} c={TRAV} size={34}>échelle</Pill><Pill at={9.5} c={ORANGE} size={34}>impact</Pill><Pill at={10.3} c={IND} size={34}>loi</Pill></Abs>
    </Out>
  );
};
/** Zoom arrière continu (puissances de dix) : travailleur ⊂ usine ⊂ territoire. */
const PowersOfTen: React.FC = () => {
  const t = useT();
  const z = Math.pow(10, Math.min(2, Math.max(0, (t - 13.0) / 5.6)));
  const lvl = z < 3 ? 0 : z < 30 ? 1 : 2;
  return (
    <Out end={29.6}>
      <AbsoluteFill style={{overflow: 'hidden'}}>
        <div style={{position: 'absolute', left: 540, top: 900, width: 0, height: 0, transform: `scale(${9.6 / z})`}}>
          {/* territoire (×100) */}
          <div style={{position: 'absolute', left: -5000, top: -3000, width: 5000, height: 3000, transform: 'scale(2)', transformOrigin: '0 0', borderRadius: 300, background: '#DCEBD2', overflow: 'hidden', boxShadow: '0 0 0 60px #fff'}}>
            <div style={{position: 'absolute', left: 0, right: 0, top: 1300, height: 220, background: '#7FB3E6'}} />
            {Array.from({length: 26}, (_, k) => <div key={k} style={{position: 'absolute', left: 200 + (k % 9) * 520, top: 260 + Math.floor(k / 9) * 900 + (k % 2) * 120, width: 260, height: 200, borderRadius: 20, background: k % 4 === 0 ? '#C9A3A3' : '#B8C4D6'}} />)}
            <div style={{position: 'absolute', left: 0, right: 0, top: 1040, height: 60, background: '#9AA3B2'}} />
            <div style={{position: 'absolute', left: 2420, top: 0, width: 60, bottom: 0, background: '#9AA3B2'}} />
          </div>
          {/* usine (×10) */}
          <div style={{position: 'absolute', left: -500, top: -300, width: 1000, height: 600, borderRadius: 40, overflow: 'hidden', border: '10px solid #fff', boxShadow: '0 20px 60px rgba(0,0,0,0.3)'}}><Img src={PH('smi/raffinerie.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
          {/* travailleur (×1) */}
          <div style={{position: 'absolute', left: -50, top: -30, width: 100, height: 60, borderRadius: 6, overflow: 'hidden', border: '2px solid #fff', boxShadow: '0 4px 10px rgba(0,0,0,0.3)'}}><Img src={PH('induction/technicien-hse.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '40% 30%'}} /></div>
        </div>
      </AbsoluteFill>
      <Abs x={0} y={330} w={1080} style={{display: 'flex', justifyContent: 'center'}}>
        <div style={{padding: '10px 26px', borderRadius: 30, background: lvl === 0 ? TRAV : lvl === 1 ? ORANGE : IND, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 38}}>{['le petit pépin du quotidien', 'la chaîne de montage', 'une ville entière paralysée'][lvl]}</div>
      </Abs>
      {lvl === 2 && <AbsoluteFill style={{background: `rgba(215,38,61,${0.12 * Math.abs(Math.sin(t * 4))})`}} />}
      <Abs x={0} y={1260} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 6}}>
        {['×1', '×10', '×100'].map((x, k) => <div key={k} style={{padding: '8px 22px', borderRadius: 14, background: k === lvl ? INK : '#fff', color: k === lvl ? '#fff' : DIM, fontFamily: sansFont, fontWeight: 900, fontSize: 32, boxShadow: '0 6px 14px rgba(20,33,61,0.1)'}}>{x}</div>)}
      </Abs>
      <Cite y={1350} at={13} text="zoom arrière illustratif : du travailleur au territoire" />
    </Out>
  );
};
const Filtre: React.FC = () => {
  const t = useT();
  const A = [33.7, 34.6, 35.6, 36.3, 37.0];
  return (
    <Out end={47.1}>
      <Center y={320}><Kin text="5 critères fondamentaux" at={31.3} size={60} /></Center>
      <Abs x={140} y={430} w={800} h={700}>
        <svg width={800} height={700} style={{position: 'absolute', inset: 0}}><polygon points="0,0 800,0 520,620 280,620" fill="#E9EEF5" stroke="#C9D2DF" strokeWidth={6} opacity={pop(t, 38.6)} /></svg>
        {CRIT.map((c, i) => {
          const w = 760 - i * 85;
          return <div key={i} style={{position: 'absolute', left: (800 - w) / 2, top: 20 + i * 118, width: w, height: 96, borderRadius: 18, background: c.c, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, fontFamily: sansFont, fontWeight: 900, fontSize: 38, transform: `translateX(${(1 - Math.min(1, spring(t, A[i], 8, 13))) * (i % 2 ? 900 : -900)}px)`, boxShadow: '0 10px 22px rgba(20,33,61,0.2)'}}><span style={{opacity: 0.7}}>{i + 1}</span>{c.l}</div>;
        })}
        {t > 38.6 && Array.from({length: 10}, (_, k) => { const p = ((t - 38.6) * 0.8 + k / 10) % 1; return <div key={k} style={{position: 'absolute', left: 390 + Math.sin(k * 2) * 40, top: lerp(0, 680, p), width: 14, height: 14, borderRadius: 7, background: GOLD, opacity: 1 - p}} />; })}
      </Abs>
      <Abs x={0} y={1160} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16}}><Pill at={42.3} c={TRAV} size={28}>travailleur individuel</Pill><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, opacity: pop(t, 44.0)}}>≠</div><Pill at={44.9} c={IND} size={28}>sécurité globale</Pill></Abs>
    </Out>
  );
};

/* ═════════════ 1 · PÉRIMÈTRE ═════════════ */
const Cibles: React.FC = () => {
  const t = useT();
  const rings = [{l: 'travailleurs', c: TRAV, a: 63.1}, {l: 'riverains', c: ORANGE, a: 65.4}, {l: 'environnement', c: GREEN, a: 66.3}];
  return (
    <Out end={69.0}>
      <Center y={320}><Kin text="Qui protège-t-on ?" at={49.9} size={60} /></Center>
      <Abs x={40} y={430} w={480} h={600} style={{opacity: pop(t, 51.9)}}>
        <div style={{position: 'absolute', left: 90, top: 60, width: 300, height: 300, borderRadius: '50%', background: `${TRAV}30`, border: `8px solid ${TRAV}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n="casque" size={130} /></div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 400, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: TRAV}}>Sécurité au travail</div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 450, textAlign: 'center'}}><Pill at={56.4} c={TRAV} size={26}>vision 100 % interne</Pill></div>
      </Abs>
      <Abs x={560} y={430} w={480} h={600} style={{opacity: pop(t, 58.6)}}>
        {[...rings].reverse().map((r, k) => {
          const R = [220, 160, 95][k];
          const p = Math.min(1, spring(t, r.a, 7, 12));
          return <div key={k} style={{position: 'absolute', left: 240 - R, top: 210 - R, width: R * 2, height: R * 2, borderRadius: '50%', background: `${r.c}30`, border: `6px solid ${r.c}`, transform: `scale(${Math.max(0, p)})`}} />;
        })}
        <div style={{position: 'absolute', left: 190, top: 160}}><F n="usine" size={100} /></div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 450, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: IND}}>Sécurité industrielle</div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 500, display: 'flex', justifyContent: 'center', gap: 6}}>{rings.map((r, k) => <Pill key={k} at={r.a} c={r.c} size={20}>{r.l}</Pill>)}</div>
      </Abs>
      <Stamp at={67.4} c={IND} text="autre terrain de jeu" x={260} y={1120} rot={-5} size={46} />
    </Out>
  );
};
const OndeDeChoc: React.FC = () => {
  const t = useT();
  const k = Math.max(0, t - 73.1);
  const steps = [{l: 'intérieur de l’usine', a: 74.5, r: 120, c: TRAV}, {l: 'par-dessus les grilles', a: 76.8, r: 230, c: ORANGE}, {l: 'les voisins', a: 77.6, r: 330, c: '#B26B00'}, {l: 'l’environnement', a: 80.9, r: 430, c: GREEN}];
  return (
    <Out end={89.0}>
      <Center y={320}><Kin text="Une onde de choc" at={71.0} size={64} color={IND} /></Center>
      <Abs x={90} y={420} w={900} h={900} style={{borderRadius: 40, background: '#E7F1DE', overflow: 'hidden', opacity: pop(t, 72.0)}}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 620, height: 90, background: '#9CC5EE'}} />
        {[[90, 120], [700, 140], [120, 700], [720, 720], [160, 380], [740, 420]].map(([x, y], j) => <div key={j} style={{position: 'absolute', left: x - 40, top: y - 40, opacity: pop(t, 77.6 + j * 0.08)}}><F n="maison" size={80} /></div>)}
        {[[60, 560], [820, 300], [400, 800], [300, 60]].map(([x, y], j) => <div key={j} style={{position: 'absolute', left: x - 40, top: y - 40, opacity: pop(t, 80.9 + j * 0.1)}}><F n="arbre" size={80} /></div>)}
        <div style={{position: 'absolute', left: 450 - 160, top: 450 - 160, width: 320, height: 320, borderRadius: 20, border: `8px dashed ${DIM}`, opacity: pop(t, 76.0)}} />
        <div style={{position: 'absolute', left: 450 - 70, top: 450 - 70}}><F n="usine" size={140} /></div>
        {steps.map((s0, j) => t > s0.a && <div key={j} style={{position: 'absolute', left: 450 - s0.r, top: 450 - s0.r, width: s0.r * 2, height: s0.r * 2, borderRadius: '50%', border: `6px solid ${s0.c}`, transform: `scale(${Math.min(1, spring(t, s0.a, 6, 10))})`, opacity: 0.9}} />)}
        {k > 0 && [0, 1, 2].map((j) => { const r = ((k * 260 + j * 200) % 640); return <div key={j} style={{position: 'absolute', left: 450 - r, top: 450 - r, width: r * 2, height: r * 2, borderRadius: '50%', border: `3px solid ${IND}`, opacity: 0.4 * (1 - r / 640)}} />; })}
      </Abs>
      <Abs x={0} y={1340} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap', padding: '0 40px', boxSizing: 'border-box'}}>{steps.map((s0, j) => <Pill key={j} at={s0.a} c={s0.c} size={22}>{s0.l}</Pill>)}</Abs>
      <Stamp at={82.8} c={IND} text="bien au-delà de la porte" x={200} y={1200} rot={-4} size={40} />
    </Out>
  );
};

/* ═════════════ 2 · ÉCHELLE ═════════════ */
const Echelle: React.FC = () => {
  const t = useT();
  const zoomOut = prog(t, 94.0, 99.0, easeInOut);
  return (
    <Out end={105.0}>
      <Center y={320}><Kin text="L’empreinte physique" at={88.2} size={60} color="#0F9D8F" /></Center>
      <Abs x={90} y={420} w={900} h={760} style={{borderRadius: 34, overflow: 'hidden', background: '#E7F1DE', boxShadow: '0 20px 44px rgba(20,33,61,0.15)', opacity: pop(t, 89.0)}}>
        <div style={{position: 'absolute', left: 450, top: 380, width: 0, height: 0, transform: `scale(${lerp(1, 0.32, zoomOut)})`}}>
          <div style={{position: 'absolute', left: -1500, top: -1200, width: 3000, height: 2400}}>
            <div style={{position: 'absolute', left: 0, right: 0, top: 1500, height: 160, background: '#9CC5EE'}} />
            <div style={{position: 'absolute', left: 0, right: 0, top: 1180, height: 70, background: '#A9B1BE'}} />
            <div style={{position: 'absolute', left: 1700, top: 0, width: 70, bottom: 0, background: '#A9B1BE'}} />
            {Array.from({length: 18}, (_, k) => <div key={k} style={{position: 'absolute', left: 150 + (k % 6) * 470, top: 150 + Math.floor(k / 6) * 760 + (k % 2) * 90, width: 210, height: 150, borderRadius: 14, background: '#B8C4D6'}} />)}
          </div>
          <div style={{position: 'absolute', left: -330, top: -230, width: 660, height: 460, borderRadius: 26, background: '#fff', border: `8px solid ${IND}`, opacity: zoomOut}} />
          <div style={{position: 'absolute', left: -200, top: -150, width: 400, height: 300, borderRadius: 20, overflow: 'hidden', border: `8px solid ${TRAV}`}}><Img src={PH('verites/groupe.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
        </div>
        <div style={{position: 'absolute', left: 20, top: 20}}><Pill at={89.2} c={TRAV} size={26}>entreprise : espace isolé et limité</Pill></div>
        {zoomOut > 0.3 && <div style={{position: 'absolute', right: 20, bottom: 20}}><Pill at={94.6} c={IND} size={26}>site complexe + territoire</Pill></div>}
      </Abs>
      <Abs x={0} y={1210} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16}}><Pill at={100.4} c={TRAV} size={28}>un simple bâtiment</Pill><div style={{fontWeight: 900, fontSize: 40, opacity: pop(t, 101.5)}}>→</div><Pill at={102.7} c={IND} size={28}>zone interconnectée</Pill></Abs>
    </Out>
  );
};

/* ═════════════ 3 · RISQUES ═════════════ */
const Risques: React.FC = () => {
  const t = useT();
  const wipe = prog(t, 115.6, 116.6, easeInOut);
  const leak = prog(t, 120.0, 122.5, easeInOut);
  const boom = t > 124.1 ? Math.max(0, 1 - (t - 124.1) * 1.5) : 0;
  return (
    <Out end={130.0}>
      <Center y={300}><Kin text="La gravité des scénarios" at={106.0} size={58} color={IND} /></Center>
      <Abs x={30} y={400} w={500} h={860} style={{borderRadius: 28, background: `${TRAV}14`, overflow: 'hidden', opacity: pop(t, 109.2)}}>
        <Img src={PH('ident/glissade.jpg')} style={{position: 'absolute', left: 100, top: 20, width: 300, height: 260, objectFit: 'contain'}} />
        <div style={{position: 'absolute', left: 0, right: 0, top: 290, textAlign: 'center'}}><span style={{padding: '8px 20px', borderRadius: 30, background: TRAV, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 28}}>risques courants</span></div>
        <div style={{position: 'absolute', left: 30, right: 20, top: 380, display: 'flex', flexDirection: 'column', gap: 18, fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: TRAV}}>
          <div style={{opacity: pop(t, 111.8)}}>• sol glissant</div><div style={{opacity: pop(t, 112.8)}}>• mauvaise posture</div><div style={{opacity: pop(t, 113.7)}}>• petite coupure</div>
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 30, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: INK, opacity: pop(t, 114.7)}}>le quotidien</div>
      </Abs>
      <Abs x={550} y={400} w={500} h={860} style={{borderRadius: 28, background: `${IND}14`, overflow: 'hidden', clipPath: `inset(0 ${(1 - wipe) * 100}% 0 0 round 28px)`}}>
        <div style={{position: 'absolute', left: 0, top: 0, width: 500, height: 330, overflow: 'hidden'}}>
          <Img src={PH('smi/raffinerie.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', filter: `brightness(${1 + boom * 1.5})`}} />
          {boom > 0 && <div style={{position: 'absolute', left: 250 - 300 * (1 - boom), top: 160 - 300 * (1 - boom), width: 600 * (1 - boom), height: 600 * (1 - boom), borderRadius: '50%', background: `radial-gradient(circle, #FFF2B0, ${ORANGE}AA 50%, transparent 70%)`}} />}
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 290, textAlign: 'center'}}><span style={{padding: '8px 20px', borderRadius: 30, background: IND, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 28}}>défaillances catastrophiques</span></div>
        <div style={{position: 'absolute', left: 20, right: 20, top: 380, height: 260, borderRadius: 18, overflow: 'hidden', background: '#D9C4A3', opacity: pop(t, 119.9)}}>
          <div style={{position: 'absolute', left: 0, right: 0, top: 170, height: 90, background: '#7FB3E6'}} />
          <div style={{position: 'absolute', left: 170, top: 10, width: 120, height: 90, borderRadius: 14, background: '#8D96A6'}} />
          <div style={{position: 'absolute', left: 215, top: 100, width: 30, height: lerp(0, 90, leak), background: '#7A9A3A', borderRadius: 10}} />
          <div style={{position: 'absolute', left: 230 - leak * 200, top: 170, width: leak * 400, height: 90, background: '#7A9A3ACC'}} />
          <div style={{position: 'absolute', left: 10, top: 10, fontFamily: sansFont, fontWeight: 900, fontSize: 20, color: INK}}>nappe phréatique</div>
        </div>
        <div style={{position: 'absolute', left: 20, right: 20, top: 670, display: 'flex', flexDirection: 'column', gap: 12, fontFamily: sansFont, fontWeight: 800, fontSize: 28, color: IND}}>
          <div style={{opacity: pop(t, 120.9)}}>• fuite de cuve chimique</div><div style={{opacity: pop(t, 123.0)}}>• nuage toxique</div><div style={{opacity: pop(t, 124.1)}}>• explosion massive</div>
        </div>
      </Abs>
      <Stamp at={127.1} c={IND} text="gestion de crise à grande échelle" x={90} y={1280} rot={-3} size={34} />
    </Out>
  );
};

/* ═════════════ 4 · RÉFÉRENTIEL ═════════════ */
const OutilsMicro: React.FC = () => {
  const t = useT();
  const key = Math.min(1, spring(t, 138.4, 7, 12));
  return (
    <Out end={149.0}>
      <Center y={320}><Kin text="Au niveau micro" at={130.3} size={60} color={TRAV} /></Center>
      <Abs x={110} y={430} w={860} h={420} style={{perspective: 1600}}>
        <div style={{position: 'absolute', inset: 0, borderRadius: 26, background: 'linear-gradient(135deg, #1F3B73, #2C5AA0)', boxShadow: '0 30px 60px rgba(20,33,61,0.3)', transformOrigin: 'left center', transform: `rotateY(${(1 - prog(t, 134.9, 135.8, easeOut)) * -80}deg)`, padding: 30, boxSizing: 'border-box', color: '#fff', fontFamily: sansFont}}>
          <div style={{fontSize: 22, fontWeight: 800, letterSpacing: 4, opacity: 0.7}}>DOCUMENT UNIQUE</div>
          <div style={{display: 'flex', gap: 6, marginTop: 14}}>{'DUERP'.split('').map((c, i) => <Flap key={i} ch={c} at={135.2 + i * 0.06} h={96} c={TRAV} />)}</div>
          <div style={{fontSize: 28, fontWeight: 700, marginTop: 18, opacity: 0.85}}>d’évaluation des risques professionnels</div>
          <div style={{position: 'absolute', right: 30, top: 30, width: 150, height: 150, borderRadius: 75, background: '#fff', color: TRAV, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `scale(${Math.min(1, spring(t, 141.9, 8, 12))})`, fontWeight: 900}}><div style={{fontSize: 26}}>ISO</div><div style={{fontSize: 40}}>45001</div></div>
        </div>
      </Abs>
      <Abs x={290} y={900} w={500} h={240}>
        <svg width={500} height={240} viewBox="0 0 500 240">{Array.from({length: 9}, (_, i) => { if (i === 4) return null; const a0 = Math.PI - (i / 9) * Math.PI, a1 = Math.PI - ((i + 1) / 9) * Math.PI; const p = (r: number, a: number) => `${250 + Math.cos(a) * r},${240 - Math.sin(a) * r}`; return <polygon key={i} points={`${p(150, a0)} ${p(230, a0)} ${p(230, a1)} ${p(150, a1)}`} fill="#E6EAF1" stroke="#fff" strokeWidth={5} opacity={pop(t, 137.8 + i * 0.06)} />; })}</svg>
        <div style={{position: 'absolute', left: 250 - 50, top: 10 - (1 - key) * 300, width: 100, height: 80, background: TRAV, clipPath: 'polygon(0 0, 100% 0, 80% 100%, 20% 100%)', opacity: t > 138.4 ? 1 : 0}} />
        <div style={{position: 'absolute', left: 0, right: 0, top: 170, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: TRAV, opacity: pop(t, 138.6)}}>la clé de voûte</div>
      </Abs>
      <Abs x={0} y={1180} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, opacity: pop(t, 143.5)}}><F n="bouclier" size={90} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: TRAV, maxWidth: 760}}>cartographier & neutraliser le risque, à l’échelle du travailleur</div></Abs>
    </Out>
  );
};
const ArsenalMacro: React.FC = () => {
  const t = useT();
  const scen = prog(t, 155.9, 158.0, easeOut);
  return (
    <Out end={171.0}>
      <Center y={320}><Kin text="Un arsenal qui change de dimension" at={149.2} size={48} color={IND} /></Center>
      <Abs x={60} y={420} w={960} h={460} style={{borderRadius: 30, overflow: 'hidden', background: '#E7F1DE', boxShadow: '0 20px 44px rgba(20,33,61,0.15)', opacity: pop(t, 154.8)}}>
        {[0, 1, 2].map((k) => <div key={k} style={{position: 'absolute', left: 480 - (110 + k * 110) * scen, top: 230 - (110 + k * 110) * scen, width: (220 + k * 220) * scen, height: (220 + k * 220) * scen, borderRadius: '50%', background: [`${IND}66`, `${ORANGE}55`, `${GOLD}44`][k]}} />)}
        {t > 162.9 && [{c: IND, r: 120}, {c: ORANGE, r: 230}, {c: GOLD, r: 340}].map((z, k) => <div key={k} style={{position: 'absolute', left: 480 - z.r, top: 230 - z.r, width: z.r * 2, height: z.r * 2, borderRadius: 40, border: `6px dashed ${z.c}`, opacity: pop(t, 163.9 + k * 0.2)}} />)}
        <div style={{position: 'absolute', left: 430, top: 180}}><F n="usine" size={100} /></div>
        {[[120, 80], [820, 100], [160, 360], [800, 360]].map(([x, y], k) => <div key={k} style={{position: 'absolute', left: x, top: y}}><F n="maison" size={60} /></div>)}
        <div style={{position: 'absolute', left: 16, top: 16}}><Pill at={155.9} c={IND} size={22}>étude de dangers : pires scénarios</Pill></div>
        {t > 163.8 && <div style={{position: 'absolute', right: 16, bottom: 16}}><Pill at={163.9} c={ORANGE} size={22}>PPRT : zones du territoire</Pill></div>}
      </Abs>
      <Abs x={60} y={920} w={960} style={{display: 'flex', gap: 16}}>
        {[{k: 'EDD', l: 'étude de dangers', a: 155.0, c: IND}, {k: 'SGS', l: 'système de gestion de la sécurité', a: 158.9, c: '#5B4FCF'}, {k: 'PPRT', l: 'prévention des risques technologiques', a: 163.9, c: ORANGE}].map((x, k) => (
          <div key={k} style={{flex: 1, height: 230, borderRadius: 22, background: '#fff', boxShadow: '0 14px 30px rgba(20,33,61,0.12)', borderTop: `10px solid ${x.c}`, padding: 18, boxSizing: 'border-box', textAlign: 'center', transform: `scale(${Math.min(1, spring(t, x.a, 8, 13))})`}}>
            <div style={{display: 'flex', justifyContent: 'center', gap: 4}}>{x.k.split('').map((c, i) => <Tile key={i} ch={c} size={50} c={x.c} />)}</div>
            <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 24, color: INK, marginTop: 14}}>{x.l}</div>
          </div>
        ))}
      </Abs>
      <Cite y={1170} at={155.0} text="« EDD » : abréviation ajoutée pour l’étude de dangers" />
      <Stamp at={168.5} c={IND} text="empêcher la catastrophe" x={220} y={1220} rot={-4} size={44} />
    </Out>
  );
};

/* ═════════════ 5 · RÉGLEMENTATION ═════════════ */
const MilleFeuille: React.FC = () => {
  const t = useT();
  const jug = Math.max(0, t - 183.5);
  return (
    <Out end={190.9}>
      <Center y={320}><Kin text="Un mille-feuille juridique" at={171.9} size={58} /></Center>
      <Abs x={190} y={440} w={700} h={600}>
        {[{l: 'Code du travail', c: TRAV, a: 175.0}, {l: 'Code de l’environnement', c: GREEN, a: 178.0}].map((b, k) => {
          const p = Math.min(1, spring(t, b.a, 8, 12));
          const jx = jug > 0 ? Math.sin(jug * 3 + k * Math.PI) * 60 : 0;
          const jy = jug > 0 ? -Math.abs(Math.cos(jug * 3 + k * Math.PI)) * 80 : 0;
          return (
            <div key={k} style={{position: 'absolute', left: 50 + jx, top: 340 - k * 190 + jy - (1 - Math.max(0, p)) * 500, width: 600, height: 170, borderRadius: 18, background: `linear-gradient(180deg, ${b.c}, ${b.c}CC)`, boxShadow: '0 16px 30px rgba(20,33,61,0.25)', display: 'flex', alignItems: 'center', gap: 18, padding: '0 26px', boxSizing: 'border-box', opacity: t > b.a ? 1 : 0}}>
              <F n="parchemin" size={90} />
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: '#fff'}}>{b.l}</div>
              {Array.from({length: 6}, (_, j) => <div key={j} style={{position: 'absolute', right: 16, top: 14 + j * 24, width: 70, height: 6, borderRadius: 3, background: '#ffffff55'}} />)}
            </div>
          );
        })}
      </Abs>
      <Abs x={0} y={1060} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={175.8} c={IND} size={28}>ne remplace pas</Pill><Pill at={177.9} c={GOLD} size={28}>s’empile dessus</Pill></Abs>
      <Abs x={0} y={1160} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Pill at={183.5} c={INK} size={30}>jongler avec deux blocs législatifs</Pill></Abs>
    </Out>
  );
};
const Bascule: React.FC = () => {
  const t = useT();
  const slide = prog(t, 194.8, 197.0, easeInOut);
  const both = prog(t, 210.8, 212.4, easeInOut);
  return (
    <Out end={OUTRO_AT}>
      <Center y={320}><Kin text="À quel moment bascule-t-on ?" at={192.9} size={56} /></Center>
      <Abs x={60} y={440} w={960} h={260}>
        <div style={{position: 'absolute', left: 0, top: 60, width: 440, height: 160, borderRadius: 24, background: `${TRAV}18`, border: `6px solid ${TRAV}`, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: TRAV, opacity: pop(t, 194.8)}}>infraction au<br />Code du travail</div>
        <div style={{position: 'absolute', right: 0, top: 60, width: 440, height: 160, borderRadius: 24, background: slide > 0.6 ? IND : `${IND}18`, border: `6px solid ${IND}`, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: slide > 0.6 ? '#fff' : IND, opacity: pop(t, 196.1)}}>violation du Code<br />de l’environnement</div>
        <div style={{position: 'absolute', left: 476, top: 30, width: 8, height: 220, background: `repeating-linear-gradient(180deg, ${INK} 0 16px, transparent 16px 26px)`}} />
        <div style={{position: 'absolute', left: lerp(190, 690, slide), top: 0, width: 60, height: 60, borderRadius: 30, background: GOLD, boxShadow: '0 6px 14px rgba(0,0,0,0.3)'}} />
      </Abs>
      <Abs x={140} y={740} w={800} h={300}>
        {Array.from({length: 5}, (_, k) => <div key={k} style={{position: 'absolute', left: k * 18, top: 200 - k * 44 - (1 - Math.min(1, spring(t, 200.8 + k * 0.12, 9, 14))) * 300, width: 760 - k * 36, height: 40, borderRadius: 10, background: ['#C9D2DF', '#B8C4D6', '#A9B1BE', '#98A2B3', '#8792A4'][k], opacity: t > 200.8 + k * 0.12 ? 1 : 0}} />)}
        <div style={{position: 'absolute', left: 0, right: 0, top: 250, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK, opacity: pop(t, 201.6)}}>protocoles superposés : un défi monumental</div>
      </Abs>
      <Abs x={0} y={1080} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20}}>
        <div style={{transform: `translateX(${lerp(-200, 0, both)}px)`, opacity: pop(t, 205.0)}}><Pill at={205.0} c={TRAV} size={34}>micro</Pill></div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 50, color: GOLD, opacity: both}}>+</div>
        <div style={{transform: `translateX(${lerp(200, 0, both)}px)`, opacity: pop(t, 205.6)}}><Pill at={205.6} c={IND} size={34}>macro</Pill></div>
      </Abs>
      {t > 209 && <Center y={1200}><Kin text="prêtes pour les deux en même temps ?" at={209.5} size={44} color={INK} /></Center>}
      {t > 210.8 && <Dust n={20} />}
    </Out>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const flaps = (a: number, n: number): Sfx[] => rep(a, n, 0.06, 'tick', 0.16);
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...CRIT.flatMap((c) => [{at: c.at, s: 'sfx/whoosh', v: 0.4}, {at: c.at + 0.05, s: 'deep-hit', v: 0.25}, ...flaps(c.at + 0.1, 10), ...rep(c.at + 0.65, Math.min(8, c.l.length), 0.07, 'sfx/thud', 0.18), {at: c.at + 2.0, s: 'sfx/swish', v: 0.35}]),
  {at: 4.5, s: 'sfx/swish', v: 0.25}, {at: 7.0, s: 'sfx/swish', v: 0.3}, ...[8.8, 9.5, 10.3].map((a) => ({at: a, s: 'sfx/pop', v: 0.25})),
  {at: 13.0, s: 'riser', v: 0.3, dur: 11}, {at: 18.6, s: 'sfx/whoosh', v: 0.3}, {at: 24.2, s: 'deep-hit', v: 0.4}, {at: 24.4, s: 'tension', v: 0.2, dur: 4},
  ...[33.7, 34.6, 35.6, 36.3, 37.0].map((a) => ({at: a, s: 'sfx/swish', v: 0.28})), {at: 38.6, s: 'soft-whoosh', v: 0.3, dur: 2}, {at: 44.9, s: 'sfx/ding', v: 0.25},
  {at: 51.9, s: 'sfx/pop', v: 0.25}, {at: 58.6, s: 'sfx/whoosh', v: 0.25}, ...[63.1, 65.4, 66.3].map((a) => ({at: a, s: 'sfx/thud', v: 0.25})), {at: 67.4, s: 'tampon', v: 0.4},
  {at: 73.1, s: 'deep-hit', v: 0.4}, ...[74.5, 76.8, 77.6, 80.9].map((a) => ({at: a, s: 'sfx/thud', v: 0.25})), {at: 82.8, s: 'tampon', v: 0.4},
  {at: 89.0, s: 'soft-whoosh', v: 0.3}, {at: 94.0, s: 'riser', v: 0.25, dur: 5}, {at: 99.0, s: 'sfx/ding', v: 0.25},
  {at: 109.2, s: 'sfx/pop', v: 0.22}, ...[111.8, 112.8, 113.7].map((a) => ({at: a, s: 'sfx/click', v: 0.2})), {at: 115.6, s: 'sfx/whoosh', v: 0.35}, {at: 120.0, s: 'tension', v: 0.25, dur: 4}, {at: 124.1, s: 'deep-hit', v: 0.55}, {at: 124.2, s: 'bass-hit', v: 0.4}, {at: 127.1, s: 'tampon', v: 0.4},
  {at: 134.9, s: 'page', v: 0.3}, ...flaps(135.2, 12), {at: 138.4, s: 'deep-hit', v: 0.4}, {at: 141.9, s: 'sfx/ding', v: 0.25}, {at: 143.5, s: 'validation', v: 0.25},
  {at: 154.8, s: 'soft-whoosh', v: 0.3}, {at: 155.9, s: 'sfx/rise', v: 0.25}, ...[155.0, 158.9, 163.9].map((a) => ({at: a, s: 'sfx/pop', v: 0.25})), {at: 168.5, s: 'tampon', v: 0.4},
  {at: 175.0, s: 'sfx/thud', v: 0.35}, {at: 178.0, s: 'sfx/thud', v: 0.35}, ...rep(183.5, 6, 0.5, 'sfx/swish', 0.15),
  {at: 194.8, s: 'sfx/whoosh', v: 0.3}, {at: 197.0, s: 'deep-hit', v: 0.35}, ...rep(200.8, 5, 0.12, 'sfx/thud', 0.2), {at: 205.0, s: 'sfx/pop', v: 0.22}, {at: 205.6, s: 'sfx/pop', v: 0.22}, {at: 210.8, s: 'riser', v: 0.3, dur: 2}, {at: 212.4, s: 'bass-hit', v: 0.35},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const SecuInd: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={0} to={11.7}><Demarcation /></Gate>
    <Gate from={11.6} to={29.7}><PowersOfTen /></Gate>
    <Gate from={29.6} to={47.2}><Filtre /></Gate>
    <Gate from={48.8} to={69.1}><Cibles /></Gate>
    <Gate from={69.0} to={89.1}><OndeDeChoc /></Gate>
    <Gate from={88.0} to={105.1}><Echelle /></Gate>
    <Gate from={106.6} to={130.1}><Risques /></Gate>
    <Gate from={131.6} to={149.1}><OutilsMicro /></Gate>
    <Gate from={149.0} to={171.1}><ArsenalMacro /></Gate>
    <Gate from={172.4} to={191.0}><MilleFeuille /></Gate>
    <Gate from={190.9} to={OUTRO_AT}><Bascule /></Gate>
    {CRIT.map((c, i) => <Gate key={c.l} from={c.at} to={c.at + 2.7}><ZoomX i={i} /></Gate>)}
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={213.1}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-secu-travail-industrielle-origine.m4a')} trimAfter={s(213.3)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Blinds, Card, Deep, random, easeOut];
