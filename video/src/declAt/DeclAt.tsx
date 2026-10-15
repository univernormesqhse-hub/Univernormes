import React from 'react';
import {AbsoluteFill, Audio, Img, random, staticFile} from 'remotion';
import {Gate} from '../anim';
import {Captions} from '../components/Captions';
import {Blinds, Board, Card, Center, Cite, Deep, Dust, Kin, Out, Pill, Stamp, Tile, Word} from '../durab/Durab';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {handFont, s, sansFont} from '../theme';
import {Abs, Bg, DIM, easeIn, easeInOut, easeOut, GREEN, INK, lerp, LOGO, PAPER, PH, pop, prog, RED, spring, T, useT} from '../implIso/kit';
import {captions} from './captions';

/**
 * « Le processus de déclaration des accidents du travail » (8 min 10) — capsule « hors normes » : voix d'origine,
 * sous-titres recalés mot à mot, photos réelles, thème « papier quadrillé ».
 * Fil rouge inédit : LE DOSSIER EN TUBE PNEUMATIQUE. L'en-tête est un réseau de tubes de verre entre six guichets
 * (accident → définition → déclaration → indemnisation → litige → checklist) ; la capsule du dossier file de guichet
 * en guichet et un carnet de tampons se remplit.
 * Transition inédite : LE PNEUMATIQUE — une capsule fuse dans un tube qui traverse l'écran, s'arrête net, s'ouvre et
 * déroule un parchemin portant le titre de la section ; le parchemin se réenroule et la capsule repart.
 * Reprend le meilleur de la série : cinétique, tuiles en bois, palettes d'affichage, store vénitien, photos en
 * profondeur 3D, écran partagé, tampons, citations, poussière — et ajoute : planche de BD, cadenas qui se valident,
 * carte du parcours protégé, chrono à rebours, frise des délais, formulaire qui se remplit, tableau qui se coche,
 * histogramme, calculatrice à palettes, escalier des recours, balance qui bascule, cases à cocher.
 */
const BLUE = '#1F6FD1';
const ORANGE = '#F07A12';
const TEAL = '#0F9D8F';
const VIO = '#6D4BD8';
const GOLD = '#E0A100';
const GLASS = '#BFD7EA';
const OUTRO_AT = 490.6;
export const DECLAT_FRAMES = s(OUTRO_AT + 3.8);
const SECT = [
  {at: 51.95, n: '1', title: 'Qu’est-ce qu’un accident du travail ?', s: 'définition légale et cas', c: BLUE},
  {at: 146.2, n: '2', title: 'La déclaration', s: 'les délais à respecter', c: ORANGE},
  {at: 237.15, n: '3', title: 'L’indemnisation', s: 'comment ça marche ?', c: TEAL},
  {at: 330.9, n: '4', title: 'En cas de litige', s: 'vos recours', c: RED},
  {at: 431.1, n: '5', title: 'La checklist essentielle', s: 'les 4 réflexes', c: VIO},
];
const STATIONS = ['accident', 'définition', 'déclaration', 'indemnisation', 'litige', 'checklist'];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);

const Cross: React.FC<{p: number; w?: number; rot?: number}> = ({p, w = 14, rot = -18}) => (
  <div style={{position: 'absolute', left: '-4%', right: '-4%', top: '50%', height: w, marginTop: -w / 2, background: RED, borderRadius: w, transform: `rotate(${rot}deg) scaleX(${p})`, transformOrigin: '0 50%', boxShadow: '0 4px 10px rgba(229,72,77,0.4)'}} />
);
/** Capsule de tube pneumatique (vue de côté). */
const Capsule: React.FC<{w: number; c: string; open?: number}> = ({w, c, open = 0}) => {
  const h = w * 0.36;
  return (
    <div style={{position: 'relative', width: w, height: h}}>
      <div style={{position: 'absolute', left: h * 0.3, right: h * 0.3, top: 0, bottom: 0, background: `linear-gradient(180deg, #fff, ${c} 35%, ${c} 70%, #0003)`, borderRadius: 6}} />
      <div style={{position: 'absolute', left: 0, top: 0, width: h * 0.6, height: h, borderRadius: '50%', background: `linear-gradient(180deg, #EEE, #888)`, transform: `translateX(${-open * h * 0.4}px)`}} />
      <div style={{position: 'absolute', right: 0, top: 0, width: h * 0.6, height: h, borderRadius: '50%', background: `linear-gradient(180deg, #EEE, #888)`, transform: `translateX(${open * h * 0.4}px)`}} />
      <div style={{position: 'absolute', left: '30%', right: '30%', top: '42%', height: '16%', background: 'rgba(255,255,255,0.55)', borderRadius: 4}} />
    </div>
  );
};
/** Tube de verre horizontal. */
const Tube: React.FC<{x: number; y: number; w: number; h: number; o?: number}> = ({x, y, w, h, o = 1}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: h / 2, background: `linear-gradient(180deg, rgba(255,255,255,0.9), ${GLASS}88 40%, ${GLASS}CC 75%, rgba(255,255,255,0.7))`, border: `3px solid ${GLASS}`, boxShadow: 'inset 0 6px 10px rgba(255,255,255,0.8), 0 10px 20px rgba(20,33,61,0.1)', opacity: o}} />
);
const RowIcon: React.FC<{ic: string; label: string; at: number; c: string; sub?: string; size?: number}> = ({ic, label, at, c, sub, size = 30}) => {
  const t = useT();
  const p = Math.max(0, Math.min(1, spring(t, at, 8, 13)));
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 16, background: '#fff', borderRadius: 22, padding: '14px 22px', boxShadow: '0 12px 26px rgba(20,33,61,0.13)', borderLeft: `10px solid ${c}`, transform: `translateX(${(1 - p) * -80}px)`, opacity: t >= at ? 1 : 0}}>
      <F n={ic} size={70} />
      <div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: size, color: INK}}>{label}</div>{sub && <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: size * 0.72, color: DIM}}>{sub}</div>}</div>
    </div>
  );
};

/* ═════════════ Fil rouge : le réseau pneumatique ═════════════ */
const Header: React.FC = () => {
  const t = useT();
  const si = sectIdx(t);
  const x = si + 1;
  const a = si >= 0 ? SECT[si].at : 0;
  const pr = si < 0 ? 0 : prog(t, a, a + 1.4, easeInOut);
  const pos = si < 0 ? 0 : lerp(si, x, pr);
  const sx = (k: number) => 60 + k * 172;
  const c = si < 0 ? INK : SECT[si].c;
  return (
    <AbsoluteFill style={{zIndex: 40, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: '50%', top: 56, transform: 'translateX(-50%)', background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 8px 24px rgba(20,33,61,0.12)'}}><Img src={staticFile(LOGO)} style={{height: 76, display: 'block'}} /></div>
      {t > 2.6 && t < OUTRO_AT && (
        <div style={{position: 'absolute', left: 36, right: 36, top: 182, height: 100, borderRadius: 20, background: '#fff', border: '6px solid #C9D2DF', boxShadow: '0 8px 20px rgba(20,33,61,0.1)', opacity: pop(t, 2.6), overflow: 'hidden'}}>
          <Tube x={40} y={24} w={900} h={26} />
          {STATIONS.map((l, k) => {
            const done = k <= x;
            const col = k === 0 ? INK : SECT[k - 1].c;
            return (
              <div key={k} style={{position: 'absolute', left: sx(k) - 20, top: 16}}>
                <div style={{width: 40, height: 40, borderRadius: 10, background: done ? col : '#fff', border: `4px solid ${done ? '#fff' : '#C9D2DF'}`, boxShadow: done ? `0 0 0 3px ${col}55` : 'none', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 18}}>{done ? '✓' : ''}</div>
                <div style={{position: 'absolute', left: -50, width: 140, top: 46, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 15, color: k === x ? col : '#A9B1BE'}}>{l}</div>
              </div>
            );
          })}
          <div style={{position: 'absolute', left: lerp(sx(Math.floor(pos)), sx(Math.min(5, Math.floor(pos) + 1)), pos - Math.floor(pos)) - 30, top: 26, filter: pr > 0 && pr < 1 ? 'blur(1.5px)' : undefined}}><Capsule w={60} c={c} /></div>
        </div>
      )}
    </AbsoluteFill>
  );
};

/** Le pneumatique : tube, capsule, parchemin qui se déroule. */
const Pneumatique: React.FC<{i: number}> = ({i}) => {
  const t = useT();
  const S0 = SECT[i];
  const k = t - S0.at;
  if (k < 0 || k > 3.7) return null;
  const bg = prog(t, S0.at, S0.at + 0.3, easeOut) * (1 - prog(t, S0.at + 3.35, S0.at + 3.7, easeIn));
  const tube = prog(t, S0.at, S0.at + 0.35, easeOut);
  const arrive = prog(t, S0.at + 0.15, S0.at + 0.75, easeOut);
  const leave = prog(t, S0.at + 3.0, S0.at + 3.5, easeIn);
  const cx = leave > 0 ? lerp(540, 1500, leave) : lerp(-300, 540, arrive);
  const bump = Math.max(0, 1 - Math.abs(k - 0.78) * 8);
  const open = prog(t, S0.at + 0.8, S0.at + 1.0, easeOut) * (1 - prog(t, S0.at + 2.75, S0.at + 2.95, easeIn));
  const unroll = prog(t, S0.at + 0.95, S0.at + 1.6, easeOut) * (1 - prog(t, S0.at + 2.5, S0.at + 2.95, easeInOut));
  const H = 820;
  const long = S0.title.length > 22;
  const mid = S0.title.length > 14;
  return (
    <AbsoluteFill style={{zIndex: 35, opacity: bg}}>
      <AbsoluteFill style={{background: '#F3F7FB'}} />
      <AbsoluteFill style={{backgroundImage: 'linear-gradient(#DDE7F1 2px, transparent 2px), linear-gradient(90deg, #DDE7F1 2px, transparent 2px)', backgroundSize: '60px 60px', opacity: 0.8}} />
      <Tube x={-40} y={560} w={1160} h={120} o={tube} />
      {Array.from({length: 6}, (_, j) => (arrive < 1 || leave > 0) && <div key={j} style={{position: 'absolute', left: cx - 200 - j * 70, top: 590 + (j % 3) * 22, width: 140, height: 6, borderRadius: 3, background: `${S0.c}55`}} />)}
      {unroll > 0 && (
        <div style={{position: 'absolute', left: 140, top: 650, width: 800, height: H * unroll, overflow: 'hidden', background: 'linear-gradient(90deg, #EFE3C2, #FBF4DF 12%, #FBF4DF 88%, #EFE3C2)', boxShadow: '0 30px 60px rgba(20,33,61,0.25)'}}>
          <div style={{position: 'absolute', left: 0, right: 0, top: 70, textAlign: 'center'}}>
            <div style={{display: 'inline-block', padding: '8px 24px', border: `6px solid ${S0.c}`, borderRadius: 12, color: S0.c, fontFamily: sansFont, fontWeight: 900, fontSize: 38, letterSpacing: 3, transform: `rotate(-4deg) scale(${lerp(1.8, 1, prog(t, S0.at + 1.3, S0.at + 1.5, easeIn))})`, opacity: prog(t, S0.at + 1.3, S0.at + 1.45)}}>DOSSIER N°{S0.n}</div>
          </div>
          <div style={{position: 'absolute', left: 50, right: 50, top: 210, textAlign: 'center'}}><Kin text={S0.title} at={S0.at + 1.35} size={long ? 62 : mid ? 72 : 88} /></div>
          <div style={{position: 'absolute', left: 0, right: 0, top: long ? 480 : 410, textAlign: 'center'}}><Pill at={S0.at + 1.8} c={S0.c} size={36}>{S0.s}</Pill></div>
          <div style={{position: 'absolute', left: 0, right: 0, top: 590, display: 'flex', justifyContent: 'center', gap: 10}}>{(STATIONS[i + 1]).toUpperCase().slice(0, 7).split('').map((ch, j) => <div key={j} style={{transform: `scale(${Math.max(0, Math.min(1, spring(t, S0.at + 1.6 + j * 0.06, 8, 12)))})`}}><Tile ch={ch} size={72} c={S0.c} /></div>)}</div>
        </div>
      )}
      {unroll > 0 && <div style={{position: 'absolute', left: 120, top: 650 + H * unroll - 22, width: 840, height: 44, borderRadius: 22, background: 'linear-gradient(180deg, #E6D3A0, #B9995A)', boxShadow: '0 10px 20px rgba(0,0,0,0.25)'}} />}
      <div style={{position: 'absolute', left: cx - 160, top: 562 + 2, transform: `scaleX(${1 + bump * 0.08}) scaleY(${1 - bump * 0.06})`}}><Capsule w={320} c={S0.c} open={open} /></div>
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
      <Img src={PH('incident/blessure-soins.jpg')} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 880, objectFit: 'cover', objectPosition: '45% 40%'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 34%, ${PAPER}DD 42%, ${PAPER} 46%)`}} />
      <Abs x={0} y={90} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={40} y={740} w={1000} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: ORANGE, color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: 30, letterSpacing: 3}}>LE PROCESSUS DE DÉCLARATION</div>
        <T size={92} style={{marginTop: 18, textTransform: 'uppercase', letterSpacing: -2, lineHeight: 1}}>des accidents</T>
        <div style={{display: 'flex', justifyContent: 'center', gap: 10, marginTop: 14}}>{'DU TRAVAIL'.split('').map((c, i) => c === ' ' ? <div key={i} style={{width: 30}} /> : <Tile key={i} ch={c} size={96} c={[BLUE, ORANGE, TEAL, RED, VIO][i % 5]} />)}</div>
      </Abs>
      <Abs x={0} y={1180} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}>
        {[['24 h', 'salarié'], ['48 h', 'employeur'], ['30 j', 'CPAM'], ['2 mois', 'recours']].map(([a, b], k) => (
          <div key={k} style={{background: '#fff', borderRadius: 20, padding: '12px 18px', textAlign: 'center', boxShadow: '0 10px 22px rgba(20,33,61,0.14)', borderTop: `8px solid ${[BLUE, ORANGE, TEAL, RED][k]}`}}>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK}}>{a}</div>
            <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 22, color: DIM}}>{b}</div>
          </div>
        ))}
      </Abs>
      <Abs x={140} y={1400} w={800} h={110}>
        <Tube x={0} y={30} w={800} h={60} />
        <div style={{position: 'absolute', left: 300, top: 30}}><Capsule w={170} c={ORANGE} /></div>
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ INTRO ═════════════ */
const Intro: React.FC = () => {
  const t = useT();
  const calm = prog(t, 11.6, 13.2, easeInOut);
  const path = Array.from({length: 70}, (_, k) => {
    const x = 60 + k * 12.4;
    const chaos = (1 - calm) * (Math.sin(k * 1.7) * 90 + Math.sin(k * 0.55 + 1) * 60) * Math.min(1, k / 8);
    return `${k ? 'L' : 'M'}${x.toFixed(1)} ${(200 + chaos).toFixed(1)}`;
  }).join(' ');
  return (
    <Out end={15.0}>
      <Center y={320}><Kin text="L’accident du travail" at={3.9} size={74} color={ORANGE} /></Center>
      <Abs x={0} y={440} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={5.4} c={INK} size={30}>que faire concrètement ?</Pill><Pill at={7.9} c={BLUE} size={30}>protéger ses droits</Pill></Abs>
      <Abs x={40} y={560} w={1000} h={420} style={{borderRadius: 30, background: '#fff', boxShadow: '0 20px 40px rgba(20,33,61,0.12)', opacity: pop(t, 9.4)}}>
        <svg width={1000} height={420} style={{position: 'absolute', inset: 0}}>
          <path d={path} fill="none" stroke={calm > 0.5 ? GREEN : RED} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={928} cy={200} r={22} fill={calm > 0.5 ? GREEN : '#C9D2DF'} />
        </svg>
        <div style={{position: 'absolute', left: 30, top: 24, fontFamily: handFont, fontWeight: 700, fontSize: 46, color: RED, opacity: 1 - calm}}>panique !</div>
        <div style={{position: 'absolute', right: 30, bottom: 24, fontFamily: handFont, fontWeight: 700, fontSize: 46, color: GREEN, opacity: calm}}>la marche à suivre</div>
      </Abs>
      <Stamp at={13.3} c={GREEN} text="ça change tout" x={300} y={1060} rot={-5} size={54} />
    </Out>
  );
};
/** Planche de BD : le cas d'école. */
const Panel: React.FC<{x: number; y: number; w: number; h: number; at: number; n: string; children: React.ReactNode; grey?: number}> = ({x, y, w, h, at, n, children, grey = 0}) => {
  const t = useT();
  const p = Math.max(0, Math.min(1, spring(t, at, 8, 13)));
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w, height: h, background: '#fff', border: `7px solid ${INK}`, boxShadow: '8px 8px 0 rgba(20,33,61,0.85)', overflow: 'hidden', transform: `scale(${0.7 + 0.3 * p}) rotate(${(1 - p) * 6}deg)`, opacity: t >= at ? 1 : 0, filter: `grayscale(${grey}) opacity(${1 - grey * 0.55})`}}>
      {children}
      <div style={{position: 'absolute', left: 0, top: 0, background: INK, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 24, padding: '4px 12px'}}>{n}</div>
    </div>
  );
};
const CasEcole: React.FC = () => {
  const t = useT();
  const ghost = prog(t, 43.9, 45.2, easeInOut);
  const months = Math.min(6, Math.max(0, Math.floor((t - 28.4) * 4)));
  return (
    <Out end={51.95}>
      <Center y={310}><Kin text="Un cas d’école" at={15.4} size={60} /></Center>
      <Cite y={392} at={16.0} text="histoire racontée dans la vidéo d’origine" />
      <Panel x={60} y={440} w={470} h={400} at={19.9} n="1" grey={ghost}>
        <Img src={PH('incident/chute-entrepot.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '40% 60%'}} />
        <div style={{position: 'absolute', right: 10, bottom: 10, background: '#FFF6C9', border: `4px solid ${INK}`, padding: '6px 12px', fontFamily: handFont, fontWeight: 700, fontSize: 30, color: INK}}>il se cogne la tête</div>
      </Panel>
      <Panel x={550} y={440} w={470} h={400} at={23.8} n="2" grey={ghost}>
        <div style={{position: 'absolute', inset: 0, background: '#EAF3FF'}} />
        <div style={{position: 'absolute', left: 150, top: 180}}><F n="haussement" size={170} /></div>
        <div style={{position: 'absolute', left: 40, top: 50, background: '#fff', border: `4px solid ${INK}`, borderRadius: 40, padding: '16px 26px', fontFamily: handFont, fontWeight: 700, fontSize: 40, color: INK}}>« ça va passer… »</div>
        <div style={{position: 'absolute', left: 30, bottom: 16, fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: RED, opacity: pop(t, 26.4)}}>aucune déclaration</div>
      </Panel>
      <Panel x={60} y={870} w={470} h={400} at={27.9} n="3" grey={ghost}>
        <Img src={PH('verites/heroine.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 35%'}} />
        <div style={{position: 'absolute', right: 14, top: 14, background: '#fff', border: `4px solid ${INK}`, padding: '6px 14px', textAlign: 'center'}}>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 22, color: DIM}}>mois</div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 60, color: RED, lineHeight: 1}}>+{months}</div>
        </div>
        <div style={{position: 'absolute', left: 10, bottom: 10, display: 'flex', gap: 8}}><Pill at={31.1} c={VIO} size={24}>vertiges</Pill><Pill at={31.7} c={VIO} size={24}>maux de tête</Pill></div>
      </Panel>
      <Panel x={550} y={870} w={470} h={400} at={32.5} n="4" grey={ghost}>
        <div style={{position: 'absolute', inset: 0, background: '#FFF1F1'}} />
        <div style={{position: 'absolute', left: 40, top: 60}}><F n="hopital" size={130} /></div>
        <div style={{position: 'absolute', left: 190, top: 70, fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK, width: 250}}>diagnostic :<br /><span style={{color: RED}}>traumatisme crânien</span></div>
        <div style={{position: 'absolute', left: 30, top: 230, right: 30, fontFamily: sansFont, fontWeight: 800, fontSize: 26, color: DIM, opacity: pop(t, 37.8)}}>CPAM : « on ne prend rien en charge »</div>
        <Stamp at={40.8} c={RED} text="refusé" x={120} y={280} rot={-10} size={56} />
      </Panel>
      {t > 43.9 && <Abs x={60} y={1300} w={960} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: RED, opacity: pop(t, 44.0)}}>pour l’administration, il n’a jamais existé</Abs>}
      {t > 46.1 && (
        <Abs x={0} y={0} w={1080} h={1920} style={{background: `rgba(248,245,236,${0.92 * pop(t, 46.2)})`}}>
          <Center y={620}><div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 40}}>
            <div style={{transform: `scale(${Math.min(1, spring(t, 48.1, 7, 12))})`}}><F n="pansement" size={200} /></div>
            <div style={{fontSize: 90, fontWeight: 900, color: DIM, opacity: pop(t, 49.0)}}>→</div>
            <div style={{transform: `scale(${Math.min(1, spring(t, 49.6, 7, 12))})`}}><F n="bouclier" size={240} /></div>
          </div></Center>
          <Center y={920}><Kin text="Même un petit bobo se déclare." at={46.3} size={58} /></Center>
          <Stamp at={50.1} c={ORANGE} text="déterminant" x={330} y={1080} rot={-5} size={56} />
        </Abs>
      )}
    </Out>
  );
};

/* ═════════════ SECTION 1 ═════════════ */
const Criteres: React.FC = () => {
  const t = useT();
  const C = [{l: 'Événement soudain', s: 'un truc qui arrive d’un coup', ic: 'eclair', a: 71.4, c: ORANGE}, {l: 'Une lésion', s: 'physique ou psychologique', ic: 'pansement', a: 75.4, c: RED}, {l: 'Au travail', s: 'pendant le temps de travail, sous l’autorité de l’employeur', ic: 'usine', a: 80.4, c: BLUE}];
  const lock = prog(t, 86.8, 88.6);
  return (
    <Out end={97.65}>
      <Center y={320}><Kin text="Trois critères réunis" at={64.5} size={62} color={BLUE} /></Center>
      <Abs x={0} y={420} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 10, opacity: pop(t, 67.4)}}>{['1', '2', '3'].map((n, k) => <div key={k} style={{transform: `scale(${Math.min(1, spring(t, 67.5 + k * 0.2, 8, 12))})`}}><Tile ch={n} size={70} c={C[k].c} /></div>)}</Abs>
      {C.map((x, k) => {
        const ok = lock * 3 > k + 0.3;
        return (
          <Card key={k} x={70} y={540 + k * 200} w={940} h={176} at={x.a} c={x.c} style={{display: 'flex', alignItems: 'center', gap: 22}}>
            <F n={x.ic} size={100} />
            <div style={{flex: 1}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK}}>{x.l}</div><div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 25, color: DIM}}>{x.s}</div></div>
            <div style={{width: 80, height: 80, borderRadius: 40, background: ok ? GREEN : '#EEF1F5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 48, fontWeight: 900, transform: `scale(${ok ? 1 + 0.2 * Math.max(0, 1 - (lock * 3 - k - 0.3) * 3) : 1})`}}>{ok ? '✓' : <F n="cadenas" size={50} />}</div>
          </Card>
        );
      })}
      {t > 91.0 && (
        <Abs x={60} y={1150} w={960} style={{textAlign: 'center'}}>
          <Board text="PRESOMPTION" at={91.2} h={64} c={INK} stag={0.04} />
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: BLUE, marginTop: 10, opacity: pop(t, 92.4)}}>d’imputabilité</div>
        </Abs>
      )}
      <Stamp at={96.3} c={GREEN} text="la base de tout" x={620} y={1290} rot={-6} size={36} />
    </Out>
  );
};
const Exemples: React.FC = () => {
  const t = useT();
  const cr = prog(t, 102.5, 103.2, easeOut);
  const E = [{l: 'malaise cardiaque', s: 'en pleine réunion', ic: 'coeur', a: 104.8, c: RED}, {l: 'choc psychologique', s: 'après une dispute', ic: 'bulle-colere', a: 108.3, c: VIO}, {l: 'douleur dans le dos', s: 'en soulevant un carton', ic: 'courbe-dos', a: 111.5, c: ORANGE}];
  return (
    <Out end={122.1}>
      <Center y={320}><Kin text="Une lésion, ce n’est pas que ça…" at={97.8} size={56} /></Center>
      <Abs x={70} y={420} w={940} h={300}>
        <div style={{position: 'absolute', left: 0, top: 0, width: 460, height: 280, borderRadius: 24, overflow: 'hidden', opacity: pop(t, 100.9)}}><Img src={PH('causerie/chute-echelle.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', filter: `grayscale(${cr})`}} /></div>
        <div style={{position: 'absolute', right: 0, top: 0, width: 460, height: 280, borderRadius: 24, overflow: 'hidden', opacity: pop(t, 101.6)}}><Img src={PH('incident/blessure-soins.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '20% 70%', filter: `grayscale(${cr})`}} /></div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 230, display: 'flex', justifyContent: 'space-around'}}><Pill at={100.9} c={INK} size={26}>la jambe cassée</Pill><Pill at={101.6} c={INK} size={26}>la coupure</Pill></div>
        <div style={{position: 'absolute', left: 300, top: 70, width: 340, height: 120}}><div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: '#fff', background: RED, borderRadius: 20, transform: `scale(${Math.max(0, Math.min(1, spring(t, 102.6, 8, 12)))})`}}>pas seulement</div></div>
      </Abs>
      <Abs x={70} y={760} w={940} style={{display: 'flex', flexDirection: 'column', gap: 18}}>
        {E.map((e, k) => <RowIcon key={k} ic={e.ic} label={e.l} sub={e.s} at={e.a} c={e.c} size={34} />)}
      </Abs>
      <Abs x={0} y={1290} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, opacity: pop(t, 117.9)}}>
        <Pill at={117.9} c={GREEN} size={34}>soudain ✓</Pill><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: DIM}}>≠</div>
        <div style={{position: 'relative'}}><Pill at={119.9} c="#9AA3B2" size={34}>spectaculaire</Pill><Cross p={prog(t, 120.7, 121.3)} w={8} rot={-8} /></div>
      </Abs>
    </Out>
  );
};
const Trajet: React.FC = () => {
  const t = useT();
  const route = prog(t, 129.5, 133.0, easeInOut);
  const glow = prog(t, 134.8, 135.6);
  const det = prog(t, 136.9, 138.5, easeInOut);
  const brk = prog(t, 138.7, 139.3, easeOut);
  return (
    <Out end={146.2}>
      <Center y={320}><Kin text="Travail ≠ trajet" at={123.7} size={66} /></Center>
      <Abs x={60} y={420} w={960} h={640} style={{borderRadius: 30, background: '#EEF3F0', border: '6px solid #C9D2DF', overflow: 'hidden', opacity: pop(t, 127.6)}}>
        <svg width={960} height={640} style={{position: 'absolute', inset: 0}}>
          {Array.from({length: 9}, (_, k) => <line key={k} x1={0} y1={k * 80} x2={960} y2={k * 80} stroke="#DCE6DF" strokeWidth={2} />)}
          <path d="M140 500 C 300 500, 320 260, 480 260 S 700 160, 820 160" fill="none" stroke="#B9C3CF" strokeWidth={46} strokeLinecap="round" />
          <path d="M480 260 C 520 380, 640 420, 760 470" fill="none" stroke="#B9C3CF" strokeWidth={34} strokeLinecap="round" />
          <path d="M140 500 C 300 500, 320 260, 480 260 S 700 160, 820 160" fill="none" stroke={glow > 0 ? GREEN : BLUE} strokeWidth={14} strokeDasharray="900" strokeDashoffset={900 * (1 - route)} strokeLinecap="round" opacity={0.9} style={{filter: glow > 0 ? `drop-shadow(0 0 ${glow * 14}px ${GREEN})` : undefined}} />
          <path d="M480 260 C 520 380, 640 420, 760 470" fill="none" stroke={BLUE} strokeWidth={10} strokeDasharray="12 10" opacity={pop(t, 131.9)} />
          <path d="M300 420 C 200 300, 140 260, 120 180" fill="none" stroke={RED} strokeWidth={12} strokeDasharray="400" strokeDashoffset={400 * (1 - det)} strokeLinecap="round" />
        </svg>
        <div style={{position: 'absolute', left: 80, top: 470, textAlign: 'center'}}><F n="maison" size={110} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24}}>maison</div></div>
        <div style={{position: 'absolute', left: 760, top: 60, textAlign: 'center'}}><F n="usine" size={110} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24}}>boulot</div></div>
        <div style={{position: 'absolute', left: 720, top: 430, textAlign: 'center', opacity: pop(t, 132.0)}}><F n="assiette" size={90} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 22}}>repas du midi</div></div>
        <div style={{position: 'absolute', left: 60, top: 80, textAlign: 'center', opacity: pop(t, 137.4)}}><F n="emporter" size={90} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 22, color: RED}}>détour courses</div></div>
        <div style={{position: 'absolute', left: 400, top: 120, opacity: pop(t, 134.8) * (1 - brk)}}><Pill at={134.8} c={GREEN} size={28}>le parcours protégé</Pill></div>
        {t > 138.6 && <div style={{position: 'absolute', left: 230, top: 290}}>
          <div style={{transform: `translate(${-brk * 30}px, ${brk * 40}px) rotate(${-brk * 25}deg)`, clipPath: 'polygon(0 0, 55% 0, 45% 100%, 0 100%)'}}><F n="bouclier" size={130} /></div>
          <div style={{position: 'absolute', left: 0, top: 0, transform: `translate(${brk * 30}px, ${brk * 40}px) rotate(${brk * 25}deg)`, clipPath: 'polygon(55% 0, 100% 0, 100% 100%, 45% 100%)'}}><F n="bouclier" size={130} /></div>
        </div>}
      </Abs>
      <Abs x={60} y={1100} w={960} h={200} style={{display: 'flex', alignItems: 'center', gap: 20, background: '#fff', borderRadius: 24, padding: 24, boxSizing: 'border-box', boxShadow: '0 14px 30px rgba(20,33,61,0.12)', opacity: pop(t, 139.9)}}>
        <F n="check" size={90} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: INK}}>Déclaration : <span style={{color: GREEN}}>mêmes règles, mêmes délais</span></div>
      </Abs>
    </Out>
  );
};

/* ═════════════ SECTION 2 ═════════════ */
const Course: React.FC = () => {
  const t = useT();
  const sweep = Math.max(0, t - 152.4) * 140;
  return (
    <Out end={162.3}>
      <Center y={320}><Kin text="Le nerf de la guerre : les délais" at={149.7} size={58} color={ORANGE} /></Center>
      <Abs x={290} y={420} w={500} h={540} style={{opacity: pop(t, 152.3)}}>
        <svg width={500} height={540}>
          <rect x={215} y={10} width={70} height={40} rx={10} fill={INK} />
          <rect x={380} y={70} width={40} height={30} rx={8} fill={INK} transform="rotate(40 400 85)" />
          <circle cx={250} cy={290} r={220} fill="#fff" stroke={INK} strokeWidth={22} />
          <circle cx={250} cy={290} r={190} fill="none" stroke={ORANGE} strokeWidth={22} strokeDasharray={1194} strokeDashoffset={1194 * ((sweep % 360) / 360)} transform="rotate(-90 250 290)" />
          {Array.from({length: 60}, (_, k) => <line key={k} x1={250 + Math.sin((k * Math.PI) / 30) * 160} y1={290 - Math.cos((k * Math.PI) / 30) * 160} x2={250 + Math.sin((k * Math.PI) / 30) * (k % 5 ? 172 : 150)} y2={290 - Math.cos((k * Math.PI) / 30) * (k % 5 ? 172 : 150)} stroke={INK} strokeWidth={k % 5 ? 3 : 7} />)}
          <line x1={250} y1={290} x2={250 + Math.sin((sweep * Math.PI) / 180) * 140} y2={290 - Math.cos((sweep * Math.PI) / 180) * 140} stroke={RED} strokeWidth={10} strokeLinecap="round" />
          <circle cx={250} cy={290} r={16} fill={RED} />
        </svg>
      </Abs>
      <Abs x={0} y={990} w={1080} style={{textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 58, color: RED, opacity: pop(t, 155.0)}}>une course contre la montre</Abs>
      <Abs x={90} y={1110} w={900} style={{display: 'flex', justifyContent: 'space-between'}}>
        {[{l: 'le salarié', ic: 'salarie', a: 157.5, c: BLUE}, {l: 'l’employeur', ic: 'employeur', a: 158.4, c: ORANGE}, {l: 'la CPAM', ic: 'batiment', a: 159.3, c: TEAL}].map((x, k) => (
          <div key={k} style={{textAlign: 'center', transform: `scale(${Math.max(0, Math.min(1, spring(t, x.a, 8, 12)))}) translateY(${-Math.abs(Math.sin(t * 7 + k)) * 8}px)`}}>
            <F n={x.ic} size={120} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: x.c}}>{x.l}</div>
          </div>
        ))}
      </Abs>
    </Out>
  );
};
const Delais: React.FC = () => {
  const t = useT();
  const line = prog(t, 165.0, 185.0);
  const N = [{x: 60, l: 'accident', ic: 'danger', a: 165.0, c: RED}, {x: 380, l: 'employeur informé', ic: 'employeur', a: 171.8, c: BLUE}, {x: 760, l: 'CPAM', ic: 'batiment', a: 184.5, c: TEAL}];
  const wk = prog(t, 180.6, 181.6);
  return (
    <Out end={192.2}>
      <Center y={320}><Kin text="Le schéma des délais" at={162.4} size={58} color={ORANGE} /></Center>
      <Abs x={50} y={430} w={980} h={340}>
        <div style={{position: 'absolute', left: 100, top: 110, width: 780, height: 14, borderRadius: 7, background: '#E3E8EF'}} />
        <div style={{position: 'absolute', left: 100, top: 110, width: 780 * line, height: 14, borderRadius: 7, background: `linear-gradient(90deg, ${RED}, ${BLUE}, ${TEAL})`}} />
        {N.map((n, k) => (
          <div key={k} style={{position: 'absolute', left: n.x, top: 40, width: 200, textAlign: 'center', opacity: pop(t, n.a)}}>
            <div style={{width: 150, height: 150, borderRadius: 75, background: '#fff', border: `8px solid ${n.c}`, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 24px rgba(20,33,61,0.15)', transform: `scale(${Math.max(0, Math.min(1, spring(t, n.a, 8, 12)))})`}}><F n={n.ic} size={90} /></div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: n.c, marginTop: 10}}>{n.l}</div>
          </div>
        ))}
        <div style={{position: 'absolute', left: 230, top: 0, opacity: pop(t, 167.3)}}><div style={{background: BLUE, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 44, padding: '6px 20px', borderRadius: 16, transform: `scale(${Math.max(0, Math.min(1, spring(t, 167.3, 7, 11)))})`}}>24 h</div></div>
        <div style={{position: 'absolute', left: 590, top: 0, opacity: pop(t, 178.6)}}><div style={{background: ORANGE, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 40, padding: '6px 18px', borderRadius: 16, transform: `scale(${Math.max(0, Math.min(1, spring(t, 178.6, 7, 11)))})`}}>48 h ouvrées</div></div>
      </Abs>
      <Abs x={70} y={800} w={940} h={180} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, opacity: pop(t, 172.6) * (1 - prog(t, 176.2, 176.6))}}>
        <RowIcon ic="megaphone" label="à l’oral" at={172.6} c={BLUE} /><RowIcon ic="enveloppe" label="par mail" at={173.9} c={BLUE} /><RowIcon ic="check" label="peu importe" at={174.6} c={GREEN} />
      </Abs>
      {t > 176.4 && (
        <Abs x={70} y={800} w={940} h={220} style={{opacity: pop(t, 176.5)}}>
          <div style={{display: 'flex', gap: 10, justifyContent: 'center'}}>
            {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, k) => {
              const off = k >= 5;
              return <div key={k} style={{width: 110, height: 130, borderRadius: 16, background: off ? '#EEF1F5' : '#fff', border: `4px solid ${off ? '#C9D2DF' : ORANGE}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', boxShadow: '0 8px 18px rgba(20,33,61,0.1)'}}>
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 48, color: off ? '#A9B1BE' : INK}}>{d}</div>
                {off && <div style={{position: 'absolute', left: 6, right: 6, top: '50%', height: 8, background: RED, borderRadius: 4, transform: `rotate(-30deg) scaleX(${wk})`}} />}
              </div>;
            })}
          </div>
          <div style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 28, color: DIM, marginTop: 16, opacity: wk}}>ni le week-end, ni les jours fériés</div>
        </Abs>
      )}
      <Cite y={1100} at={167.3} text="délais cités par la vidéo d’origine" />
      <Stamp at={187.4} c={RED} text="chaque heure compte" x={250} y={1170} rot={-5} size={50} />
    </Out>
  );
};
/** Le formulaire DAT qui se remplit. */
const Flux: React.FC = () => {
  const t = useT();
  const lines = [196.0, 197.6, 199.2, 200.6, 201.8];
  return (
    <Out end={207.15}>
      <Abs x={60} y={320} w={960} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20}}>
        <RowIcon ic="salarie" label="Étape 1" sub="le salarié informe" at={192.3} c={BLUE} />
        <div style={{fontSize: 50, fontWeight: 900, color: DIM, opacity: pop(t, 194.4)}}>→</div>
        <RowIcon ic="employeur" label="Étape 2" sub="l’employeur déclare" at={194.7} c={ORANGE} />
      </Abs>
      <Abs x={180} y={500} w={720} h={720} style={{background: '#fff', borderRadius: 10, boxShadow: '0 30px 60px rgba(20,33,61,0.22)', transform: `rotate(-2deg) translateY(${(1 - pop(t, 195.6, 0.6)) * 200}px)`, opacity: pop(t, 195.6), border: '2px solid #DDE3EC'}}>
        <div style={{background: ORANGE, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 34, padding: '18px 30px'}}>DAT · Déclaration d’accident du travail</div>
        {['Victime', 'Date et heure', 'Lieu', 'Circonstances', 'Témoins'].map((l, k) => (
          <div key={k} style={{margin: '26px 34px 0', position: 'relative'}}>
            <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 24, color: DIM}}>{l}</div>
            <div style={{height: 34, borderBottom: '3px solid #C9D2DF', position: 'relative'}}>
              <div style={{position: 'absolute', left: 0, bottom: 4, height: 16, width: `${lerp(0, 60 + (k * 13) % 30, prog(t, lines[k], lines[k] + 0.9))}%`, background: `repeating-linear-gradient(90deg, ${INK} 0 18px, transparent 18px 26px)`, opacity: 0.55, borderRadius: 4}} />
            </div>
          </div>
        ))}
        <div style={{position: 'absolute', right: 40, bottom: 40, fontFamily: handFont, fontSize: 44, color: BLUE, clipPath: `inset(0 ${(1 - prog(t, 202.6, 203.4)) * 100}% 0 0)`}}>Signé</div>
        <div style={{position: 'absolute', left: 30, bottom: 30, fontFamily: sansFont, fontWeight: 700, fontSize: 18, color: DIM}}>formulaire schématisé (illustration)</div>
      </Abs>
      {t > 203.2 && <Abs x={760} y={1080} style={{zIndex: 4}}><div style={{display: 'flex'}}><div style={{transform: `rotate(${t * 90}deg)`}}><F n="engrenage" size={130} /></div><div style={{transform: `rotate(${-t * 90 + 20}deg)`, marginLeft: -30, marginTop: 60}}><F n="engrenage" size={100} /></div></div></Abs>}
      <Abs x={0} y={1260} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Pill at={204.4} c={TEAL} size={30}>le dossier est ouvert</Pill></Abs>
    </Out>
  );
};
const Tableau: React.FC = () => {
  const t = useT();
  const R = [{a: 'Salarié', d: '24 H', act: 'informer l’employeur', at: 210.0, c: BLUE}, {a: 'Employeur', d: '48 H', act: 'déclarer à la CPAM (heures ouvrées)', at: 212.3, c: ORANGE}, {a: 'CPAM', d: '30 J', act: 'statuer', at: 215.8, c: TEAL}, {a: 'Salarié (si oubli)', d: '2 ANS', act: 'déclarer lui-même', at: 228.4, c: VIO}];
  const late = prog(t, 234.3, 235.4);
  return (
    <Out end={237.15}>
      <Center y={320}><Kin text="Le tableau récapitulatif" at={207.2} size={58} color={ORANGE} /></Center>
      <Abs x={50} y={420} w={980} style={{background: '#fff', borderRadius: 24, overflow: 'hidden', boxShadow: '0 20px 40px rgba(20,33,61,0.14)', opacity: pop(t, 207.6)}}>
        <div style={{display: 'flex', background: INK, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 26}}>{['Acteur', 'Délai', 'Action'].map((h, k) => <div key={k} style={{flex: k === 2 ? 1.4 : 1, padding: '16px 20px'}}>{h}</div>)}</div>
        {R.map((r, k) => (
          <div key={k} style={{display: 'flex', alignItems: 'center', borderTop: '2px solid #EEF1F5', background: t > r.at ? `${r.c}12` : '#fff', fontFamily: sansFont, fontSize: 28, height: 104}}>
            <div style={{flex: 1, padding: '0 20px', fontWeight: 900, color: r.c}}>{r.a}</div>
            <div style={{flex: 1, padding: '0 20px'}}>{t > r.at - 0.2 && <Board text={r.d} at={r.at} h={48} c={INK} stag={0.03} n={4} gap={2} />}</div>
            <div style={{flex: 1.4, padding: '0 20px', fontWeight: 800, color: INK, opacity: pop(t, r.at + 0.4)}}>{r.act}</div>
          </div>
        ))}
      </Abs>
      <Cite y={1000} at={210} text="délais cités par la vidéo d’origine" />
      <Abs x={110} y={1050} w={860} h={240} style={{display: 'flex', alignItems: 'center', gap: 30, opacity: pop(t, 222.9)}}>
        <div style={{transform: `rotate(${Math.sin(t * 2) * 8}deg)`}}><svg width={170} height={170} viewBox="0 0 100 100"><circle cx={50} cy={50} r={38} fill="none" stroke={RED} strokeWidth={20} /><circle cx={50} cy={50} r={38} fill="none" stroke="#fff" strokeWidth={20} strokeDasharray="20 39.7" /></svg></div>
        <div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK}}>le filet de sécurité</div><div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 28, color: DIM}}>le salarié peut déclarer lui-même</div></div>
      </Abs>
      {late > 0 && <Stamp at={234.4} c={RED} text="après 2 ans : trop tard" x={190} y={1300} rot={-5} size={48} />}
    </Out>
  );
};

/* ═════════════ SECTION 3 ═════════════ */
const Bonnes: React.FC = () => {
  const t = useT();
  const cr3 = prog(t, 273.6, 274.4, easeOut);
  return (
    <Out end={285.7}>
      <Abs x={60} y={320} w={960} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24}}>
        <div style={{transform: `scale(${Math.min(1, spring(t, 245.1, 7, 12))})`, opacity: t > 245 ? 1 : 0}}><F n="argent" size={120} /></div>
        <Kin text="Et l’argent ?" at={245.1} size={72} color={TEAL} />
      </Abs>
      {t < 264.2 && (
        <Abs x={70} y={500} w={940} h={760} style={{opacity: pop(t, 250.0) * (1 - prog(t, 263.8, 264.2))}}>
          <div style={{textAlign: 'center'}}><Pill at={250.0} c={GREEN} size={34}>bonne nouvelle n°1</Pill></div>
          <div style={{display: 'flex', justifyContent: 'center', gap: 30, marginTop: 40}}>
            {[{ic: 'chrono', l: 'ancienneté'}, {ic: 'argent', l: 'cotisations'}].map((x, k) => (
              <div key={k} style={{position: 'relative', width: 380, height: 240, borderRadius: 24, background: '#fff', boxShadow: '0 14px 28px rgba(20,33,61,0.12)', textAlign: 'center', paddingTop: 26, boxSizing: 'border-box', opacity: pop(t, 257.4 + k * 1.2)}}>
                <div style={{display: 'flex', justifyContent: 'center'}}><F n={x.ic} size={110} /></div>
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: DIM}}>{x.l}</div>
                <Cross p={prog(t, 258.2 + k * 1.2, 258.8 + k * 1.2)} />
              </div>
            ))}
          </div>
          <div style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK, marginTop: 40, opacity: pop(t, 255.8)}}>aucune condition</div>
          <div style={{display: 'flex', justifyContent: 'center', marginTop: 30, opacity: pop(t, 261.3)}}>
            <div style={{width: 200, height: 210, borderRadius: 22, background: '#fff', border: `6px solid ${TEAL}`, overflow: 'hidden', textAlign: 'center', transform: `scale(${Math.min(1, spring(t, 261.3, 7, 12))})`}}>
              <div style={{background: TEAL, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 26, padding: 8}}>contrat</div>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: INK}}>J1</div>
              <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 22, color: TEAL}}>couvert</div>
            </div>
          </div>
        </Abs>
      )}
      {t >= 264.2 && (
        <Abs x={60} y={500} w={960} h={800} style={{opacity: pop(t, 264.2)}}>
          <div style={{textAlign: 'center'}}><Pill at={264.3} c={GREEN} size={34}>une protection en béton</Pill></div>
          <div style={{textAlign: 'center', marginTop: 20}}><Pill at={266.5} c={TEAL} size={30}>bonne nouvelle n°2 : pas de délai de carence</Pill></div>
          <div style={{display: 'flex', justifyContent: 'center', gap: 10, marginTop: 40}}>
            {['J0', 'J1', 'J2', 'J3', 'J4'].map((d, k) => {
              const lost = k >= 1 && k <= 3;
              const paid = t > (k === 0 ? 279.6 : 277.0);
              return (
                <div key={k} style={{position: 'relative', width: 170, height: 200, borderRadius: 18, background: paid ? (k === 0 ? `${ORANGE}22` : `${TEAL}22`) : '#fff', border: `5px solid ${paid ? (k === 0 ? ORANGE : TEAL) : '#C9D2DF'}`, textAlign: 'center', paddingTop: 20, boxSizing: 'border-box', opacity: pop(t, 270.5 + k * 0.1)}}>
                  <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: INK}}>{d}</div>
                  <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 20, color: DIM, marginTop: 6, opacity: paid && k === 0 ? 0 : 1}}>{k === 0 ? 'jour de l’accident' : 'arrêt'}</div>
                  {lost && <div style={{position: 'absolute', left: 8, right: 8, top: 120, fontFamily: sansFont, fontWeight: 900, fontSize: 18, color: RED, opacity: pop(t, 271.3) * (1 - cr3)}}>perdu en maladie</div>}
                  {paid && <div style={{position: 'absolute', left: 4, right: 4, bottom: 12, fontFamily: sansFont, fontWeight: 900, fontSize: k === 0 ? 20 : 24, lineHeight: 1.1, color: k === 0 ? ORANGE : TEAL}}>{k === 0 ? '100 % employeur' : 'Sécu'}</div>}
                </div>
              );
            })}
          </div>
          <div style={{position: 'relative', margin: '30px auto 0', width: 520, height: 60, opacity: pop(t, 271.3)}}>
            <div style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: DIM}}>3 jours de carence</div><Cross p={cr3} w={10} rot={-4} />
          </div>
          <div style={{textAlign: 'center', marginTop: 30}}><Board text="ZERO" at={269.9} h={80} c={TEAL} /></div>
        </Abs>
      )}
    </Out>
  );
};
const Graph: React.FC = () => {
  const t = useT();
  const b1 = prog(t, 290.5, 291.8, easeOut);
  const b2 = prog(t, 297.0, 298.4, easeOut);
  return (
    <Out end={303.2}>
      <Center y={320}><Kin text="Combien on touche ?" at={285.9} size={62} color={TEAL} /></Center>
      <Abs x={110} y={430} w={860} h={760} style={{background: '#fff', borderRadius: 26, boxShadow: '0 20px 40px rgba(20,33,61,0.13)', opacity: pop(t, 288.0)}}>
        <svg width={860} height={760} style={{position: 'absolute', inset: 0}}>
          <line x1={100} y1={640} x2={800} y2={640} stroke={INK} strokeWidth={5} />
          <line x1={100} y1={640} x2={100} y2={60} stroke={INK} strokeWidth={5} />
          {[0, 20, 40, 60, 80, 100].map((v) => <g key={v}><line x1={92} y1={640 - v * 5.6} x2={800} y2={640 - v * 5.6} stroke="#EEF1F5" strokeWidth={2} /><text x={84} y={648 - v * 5.6} textAnchor="end" fontFamily={sansFont} fontWeight={700} fontSize={22} fill={DIM}>{v}%</text></g>)}
          <rect x={190} y={640 - 336 * b1} width={200} height={336 * b1} rx={10} fill={TEAL} />
          <rect x={500} y={640 - 448 * b2} width={200} height={448 * b2} rx={10} fill={ORANGE} />
          <path d="M290 270 C 400 200, 480 170, 600 160" fill="none" stroke={INK} strokeWidth={5} strokeDasharray="12 10" opacity={b2} />
        </svg>
        <div style={{position: 'absolute', left: 190, width: 200, top: 640 - 336 * b1 - 70, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: TEAL, opacity: b1}}>60 %</div>
        <div style={{position: 'absolute', left: 500, width: 200, top: 640 - 448 * b2 - 70, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: ORANGE, opacity: b2}}>80 %</div>
        <div style={{position: 'absolute', left: 170, width: 240, top: 660, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK, opacity: pop(t, 289.2)}}>J1 → J28</div>
        <div style={{position: 'absolute', left: 480, width: 240, top: 660, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK, opacity: pop(t, 295.5)}}>à partir du J29</div>
      </Abs>
      <Abs x={0} y={1210} w={1080} style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 26, color: DIM, opacity: pop(t, 291.0)}}>du salaire journalier de référence · taux cités par la vidéo d’origine</Abs>
      <Abs x={0} y={1270} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Pill at={299.9} c={INK} size={30}>un système progressif</Pill></Abs>
    </Out>
  );
};
const Marie: React.FC = () => {
  const t = useT();
  const step = (a: number) => pop(t, a, 0.5);
  return (
    <Out end={330.9}>
      <Abs x={60} y={320} w={960} h={300}>
        <div style={{position: 'absolute', left: 0, top: 0, width: 260, height: 260, borderRadius: 130, overflow: 'hidden', border: `8px solid ${TEAL}`, opacity: pop(t, 305.0), transform: `scale(${Math.min(1, spring(t, 305.0, 7, 12))})`}}><Img src={PH('induction/operatrice.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 20%'}} /></div>
        <div style={{position: 'absolute', left: 300, top: 30}}><Kin text="Le cas de Marie" at={303.3} size={64} color={TEAL} /></div>
        <div style={{position: 'absolute', left: 300, top: 130, fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: DIM, opacity: pop(t, 308.1)}}>salaire brut du mois précédent,<br />primes comprises</div>
      </Abs>
      <Abs x={60} y={650} w={960} h={620} style={{background: '#1E2A44', borderRadius: 30, boxShadow: '0 30px 60px rgba(20,33,61,0.3)', opacity: pop(t, 309.0), padding: 34, boxSizing: 'border-box'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, opacity: step(309.0)}}>
          <Board text="2000" at={309.1} h={88} c={INK} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 60, color: '#fff'}}>€</div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 60, color: GOLD, marginLeft: 20, opacity: step(318.0)}}>÷</div>
          {t > 318.2 && <Board text="30,42" at={318.3} h={88} c={INK} />}
        </div>
        <div style={{height: 6, background: '#3A4A6B', borderRadius: 3, margin: '30px 0'}} />
        <div style={{display: 'flex', alignItems: 'center', gap: 16, opacity: step(320.1)}}>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: GOLD}}>≈</div>
          {t > 320.2 && <Board text="65,80" at={320.3} h={88} c={TEAL} />}
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: '#fff'}}>€ / jour</div>
        </div>
        <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 24, color: '#9FB0CC', marginTop: 10, opacity: step(320.3)}}>salaire journalier de référence</div>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, marginTop: 34, opacity: step(326.6)}}>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 48, color: '#fff'}}>60 % ×</div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 48, color: '#fff'}}>65,80 =</div>
          {t > 326.8 && <Board text="39,48" at={326.9} h={80} c={ORANGE} />}
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: '#fff'}}>€/j</div>
        </div>
      </Abs>
      <Cite y={1290} at={309.0} text="exemple et calcul affichés dans la vidéo d’origine (J1 → J28)" />
    </Out>
  );
};

/* ═════════════ SECTION 4 ═════════════ */
const Refus: React.FC = () => {
  const t = useT();
  return (
    <Out end={355.4}>
      <Abs x={60} y={320} w={960} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={335.4} c={ORANGE} size={30}>l’employeur conteste</Pill><Pill at={336.8} c={RED} size={30}>la CPAM dit non</Pill></Abs>
      <Blinds src="verites/telephone.jpg" x={110} y={430} w={860} h={480} at={334.6} pos="50% 30%">
        <div style={{position: 'absolute', left: 20, bottom: 20}}><Pill at={338.7} c={GREEN} size={30}>il y a des recours</Pill></div>
      </Blinds>
      <Center y={950}><Kin text="Et si c’est refusé ?" at={341.0} size={66} color={RED} /></Center>
      <Abs x={0} y={1060} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={345.5} c={INK} size={30}>pas la fin du monde</Pill><Pill at={346.5} c={RED} size={30}>réagir vite et bien</Pill></Abs>
      <Stamp at={351.7} c={RED} text="ne pas rater le coche" x={210} y={1180} rot={-5} size={50} />
    </Out>
  );
};
const Recours: React.FC = () => {
  const t = useT();
  const S = [{n: '1', l: 'Commission de recours amiable', k: 'CRA', s: 'obligatoire', a: 360.7, d: 365.5, c: ORANGE}, {n: '2', l: 'Pôle social du tribunal judiciaire', k: 'TRIBUNAL', s: 'si la CRA confirme le refus', a: 370.3, d: 372.7, c: RED}];
  return (
    <Out end={382.9}>
      <Center y={320}><Kin text="Une procédure en deux étapes" at={355.6} size={58} color={RED} /></Center>
      {S.map((x, k) => (
        <Abs key={k} x={60 + k * 140} y={760 - k * 330} w={800} h={300} style={{opacity: pop(t, x.a), transform: `translateY(${(1 - pop(t, x.a, 0.6)) * 80}px)`}}>
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 220, background: '#fff', borderRadius: 24, boxShadow: '0 20px 40px rgba(20,33,61,0.15)', borderTop: `12px solid ${x.c}`, padding: 22, boxSizing: 'border-box'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
              <Tile ch={x.n} size={64} c={x.c} />
              <Board text={x.k} at={x.a + 0.2} h={52} c={x.c} stag={0.04} />
            </div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK, marginTop: 12}}>{x.l}</div>
            <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 22, color: DIM}}>{x.s}</div>
          </div>
          <div style={{position: 'absolute', right: 20, top: 0, display: 'flex', alignItems: 'center', gap: 10, opacity: pop(t, x.d)}}>
            <div style={{transform: `rotate(${Math.min(180, Math.max(0, (t - x.d) * 180))}deg)`}}><F n="sablier" size={90} /></div>
            <div style={{background: INK, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 36, padding: '6px 16px', borderRadius: 14}}>2 mois</div>
          </div>
        </Abs>
      ))}
      <Cite y={1090} at={365.5} text="délais cités par la vidéo d’origine" />
      <Abs x={0} y={1150} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Pill at={366.7} c={INK} size={30}>pas un jour de plus</Pill></Abs>
      <Stamp at={380.0} c={RED} text="délai loupé = terminé" x={220} y={1240} rot={-5} size={50} />
    </Out>
  );
};
const Faute: React.FC = () => {
  const t = useT();
  const up = prog(t, 402.0, 403.8, easeOut);
  return (
    <Out end={405.0}>
      <Center y={320}><Kin text="La faute inexcusable" at={386.9} size={64} color={RED} /></Center>
      <Deep src="promo/hse-machine.jpg" x={70} y={430} w={560} h={520} at={384.0} pos="50% 40%" />
      <Abs x={650} y={430} w={370} h={520} style={{display: 'flex', flexDirection: 'column', gap: 16}}>
        {[{l: 'savait qu’il y avait un danger', a: 391.7, ic: 'danger'}, {l: 'en avait conscience', a: 394.2, ic: 'cerveau'}, {l: 'n’a pas pris les mesures', a: 395.6, ic: 'sens-interdit'}].map((x, k) => (
          <div key={k} style={{background: '#fff', borderRadius: 20, padding: 16, display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 10px 22px rgba(20,33,61,0.12)', borderLeft: `8px solid ${RED}`, opacity: pop(t, x.a), transform: `translateX(${(1 - pop(t, x.a)) * 60}px)`}}><F n={x.ic} size={60} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 25, color: INK}}>{x.l}</div></div>
        ))}
        <div style={{opacity: pop(t, 399.3)}}><Pill at={399.3} c={RED} size={26}>faute reconnue</Pill></div>
      </Abs>
      <Abs x={110} y={990} w={860} h={300} style={{opacity: pop(t, 401.0)}}>
        <div style={{position: 'absolute', left: 0, bottom: 0, width: 300, textAlign: 'center'}}><div style={{width: 200, height: 120, margin: '0 auto', background: '#DDE3EC', borderRadius: 14}} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: DIM}}>indemnisation normale</div></div>
        <div style={{position: 'absolute', right: 0, bottom: 0, width: 400, textAlign: 'center'}}><div style={{width: 240, height: 120 + 140 * up, margin: '0 auto', background: `linear-gradient(180deg, ${GREEN}, ${TEAL})`, borderRadius: 14}} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: GREEN}}>beaucoup plus élevée</div></div>
        <div style={{position: 'absolute', left: 330, top: 120, fontSize: 80, fontWeight: 900, color: GREEN, opacity: up}}>➚</div>
      </Abs>
    </Out>
  );
};
const Temporaires: React.FC = () => {
  const t = useT();
  const flip = prog(t, 427.0, 428.4, easeInOut);
  return (
    <Out end={431.1}>
      <Center y={320}><Kin text="Un point méconnu" at={405.1} size={64} color={RED} /></Center>
      <Abs x={0} y={420} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={411.3} c={BLUE} size={30}>intérimaires</Pill><Pill at={412.1} c={TEAL} size={30}>CDD</Pill><Pill at={412.8} c={VIO} size={30}>stagiaires</Pill></Abs>
      <Deep src="personnages/equipe.jpg" x={110} y={520} w={860} h={360} at={409.8} pos="50% 25%">
        <div style={{position: 'absolute', right: 20, top: 20}}><Pill at={413.7} c={RED} size={28}>poste dangereux</Pill></div>
      </Deep>
      <Abs x={110} y={920} w={860} h={360} style={{opacity: pop(t, 418.5)}}>
        <div style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: RED}}>faute de l’employeur présumée</div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 80, height: 260, perspective: 1200}}>
          <div style={{position: 'absolute', inset: 0, transform: `rotateY(${flip * 180}deg)`, transformStyle: 'preserve-3d'}}>
            <div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden', background: '#fff', borderRadius: 24, boxShadow: '0 16px 30px rgba(20,33,61,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20}}>
              <F n="salarie" size={110} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: DIM}}>d’habitude : la victime prouve</div>
            </div>
            <div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: `${RED}12`, border: `6px solid ${RED}`, borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20}}>
              <F n="employeur" size={110} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: RED}}>ici : l’employeur doit prouver<br /><span style={{color: INK, fontSize: 26}}>la formation à la sécurité</span></div>
            </div>
          </div>
        </div>
      </Abs>
      <Stamp at={428.6} c={RED} text="charge de la preuve inversée" x={130} y={1300} rot={-4} size={44} />
    </Out>
  );
};

/* ═════════════ SECTION 5 ═════════════ */
const Reflexes: React.FC = () => {
  const t = useT();
  const R = [{n: '1', l: 'Toujours déclarer', s: 'même le plus petit bobo', ic: 'megaphone', a: 443.1, ck: 446.0, c: BLUE}, {n: '2', l: 'Voir le médecin', s: 'certificat médical = preuve n°1', ic: 'medecin', a: 449.1, ck: 453.2, c: TEAL}, {n: '3', l: 'Prévenir sous 24 h', s: 'une alarme s’il le faut', ic: 'chrono', a: 455.7, ck: 459.2, c: ORANGE}, {n: '4', l: 'Vérifier', s: 'DAT envoyée à la CPAM sous 48 h', ic: 'loupe', a: 461.9, ck: 466.0, c: VIO}];
  return (
    <Out end={470.1}>
      <Center y={320}><Kin text="Les 4 réflexes qui sauvent la mise" at={439.8} size={56} color={VIO} /></Center>
      {R.map((r, k) => {
        const ck = prog(t, r.ck, r.ck + 0.35, easeOut);
        return (
          <Card key={k} x={70} y={430 + k * 215} w={940} h={190} at={r.a} c={r.c} style={{display: 'flex', alignItems: 'center', gap: 22}}>
            <Tile ch={r.n} size={80} c={r.c} />
            <F n={r.ic} size={90} />
            <div style={{flex: 1}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: INK}}>{r.l}</div><div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 25, color: DIM}}>{r.s}</div></div>
            <div style={{width: 84, height: 84, borderRadius: 16, border: `6px solid ${ck > 0 ? GREEN : '#C9D2DF'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box'}}>
              <svg width={60} height={60}><path d="M10 32 L25 46 L52 14" fill="none" stroke={GREEN} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={70} strokeDashoffset={70 * (1 - ck)} /></svg>
            </div>
          </Card>
        );
      })}
    </Out>
  );
};
const Final: React.FC = () => {
  const t = useT();
  const hit1 = Math.max(0, 1 - Math.abs(t - 477.6) * 4);
  const hit2 = Math.max(0, 1 - Math.abs(t - 479.9) * 4);
  return (
    <Out end={OUTRO_AT}>
      <Card x={70} y={320} w={940} at={470.2} c={RED}>
        <div style={{fontFamily: 'Georgia, serif', fontSize: 110, color: RED, lineHeight: 0.6, opacity: 0.8}}>“</div>
        <Kin text="Un accident mal déclaré, c’est le subir deux fois." at={472.7} size={50} />
      </Card>
      <Abs x={70} y={640} w={940} h={420} style={{transform: `translateX(${Math.sin(t * 60) * 12 * (hit1 + hit2)}px)`}}>
        <div style={{position: 'absolute', left: 0, top: 0, width: 455, height: 400, borderRadius: 24, overflow: 'hidden', opacity: pop(t, 476.8), boxShadow: '0 16px 30px rgba(20,33,61,0.2)'}}>
          <Img src={PH('causerie/chute-escalier.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
          <div style={{position: 'absolute', left: 14, top: 14}}><Tile ch="1" size={60} c={RED} /></div>
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, background: 'rgba(20,33,61,0.75)', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 30, padding: 14, textAlign: 'center'}}>la blessure</div>
        </div>
        <div style={{position: 'absolute', right: 0, top: 0, width: 455, height: 400, borderRadius: 24, overflow: 'hidden', opacity: pop(t, 479.0), boxShadow: '0 16px 30px rgba(20,33,61,0.2)'}}>
          <Img src={PH('docs5/dossiers.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(0.4)'}} />
          <div style={{position: 'absolute', left: 14, top: 14}}><Tile ch="2" size={60} c={RED} /></div>
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, background: 'rgba(20,33,61,0.75)', color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 26, padding: 14, textAlign: 'center'}}>les galères administratives et financières</div>
        </div>
      </Abs>
      <Abs x={70} y={1090} w={940} h={220} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 30, opacity: pop(t, 483.2)}}>
        <div style={{transform: `scale(${Math.min(1, spring(t, 483.3, 7, 12))})`}}><F n="bouclier" size={150} /></div>
        <div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: DIM}}>la meilleure armure :</div>
          <div style={{display: 'flex', gap: 12, marginTop: 10}}><Pill at={485.9} c={BLUE} size={30}>connaître ses droits</Pill><Pill at={487.5} c={ORANGE} size={30}>agir vite</Pill></div>
        </div>
      </Abs>
      {t > 489.0 && <Center y={1320}><div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, transform: `scale(${Math.min(1, spring(t, 489.1, 7, 11))})`}}><F n="cle" size={90} /><div style={{fontFamily: handFont, fontWeight: 700, fontSize: 60, color: GREEN}}>c’est ça, la clé</div></div></Center>}
      {t > 489.1 && <Dust n={22} c={ORANGE} />}
    </Out>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const flaps = (a: number, n: number): Sfx[] => rep(a, n, 0.06, 'tick', 0.16);
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...SECT.flatMap((x) => [{at: x.at + 0.05, s: 'sfx/whoosh', v: 0.5}, {at: x.at + 0.75, s: 'sfx/thud', v: 0.4}, {at: x.at + 0.85, s: 'cadenas', v: 0.35}, {at: x.at + 1.0, s: 'page', v: 0.45}, {at: x.at + 1.32, s: 'tampon', v: 0.4}, {at: x.at + 2.6, s: 'page', v: 0.3}, {at: x.at + 3.0, s: 'sfx/whoosh', v: 0.45}]),
  {at: 3.9, s: 'sfx/thud', v: 0.25}, {at: 5.4, s: 'sfx/pop', v: 0.2}, {at: 7.9, s: 'sfx/pop', v: 0.2}, {at: 9.4, s: 'tension', v: 0.2, dur: 2.5}, {at: 11.6, s: 'sfx/rise', v: 0.25}, {at: 13.3, s: 'tampon', v: 0.45},
  ...[19.9, 23.8, 27.9, 32.5].map((a) => ({at: a, s: 'sfx/thud', v: 0.3})), ...rep(28.4, 6, 0.25, 'page', 0.18), {at: 32.7, s: 'deep-hit', v: 0.35}, {at: 40.8, s: 'tampon', v: 0.5}, {at: 43.9, s: 'soft-whoosh', v: 0.3}, {at: 46.2, s: 'sfx/whoosh', v: 0.25}, {at: 48.1, s: 'sfx/pop', v: 0.22}, {at: 49.6, s: 'sfx/pop', v: 0.22}, {at: 50.1, s: 'tampon', v: 0.45},
  ...[67.5, 67.7, 67.9].map((a) => ({at: a, s: 'sfx/thud', v: 0.22})), {at: 71.4, s: 'sfx/whoosh', v: 0.25}, {at: 75.4, s: 'sfx/whoosh', v: 0.25}, {at: 80.4, s: 'sfx/whoosh', v: 0.25}, ...[87.2, 87.8, 88.4].map((a) => ({at: a, s: 'cadenas', v: 0.3})), ...flaps(91.2, 14), {at: 96.3, s: 'tampon', v: 0.4},
  {at: 100.9, s: 'sfx/pop', v: 0.2}, {at: 101.6, s: 'sfx/pop', v: 0.2}, {at: 102.6, s: 'bass-hit', v: 0.35}, ...[104.8, 108.3, 111.5].map((a) => ({at: a, s: 'sfx/swish', v: 0.25})), {at: 117.9, s: 'sfx/ding', v: 0.22}, {at: 120.7, s: 'sfx/swish', v: 0.3},
  {at: 127.6, s: 'soft-whoosh', v: 0.3}, {at: 129.5, s: 'stylo', v: 0.35}, {at: 134.8, s: 'validation', v: 0.3}, {at: 136.9, s: 'stylo', v: 0.3}, {at: 138.7, s: 'sfx/thud', v: 0.35}, {at: 139.9, s: 'sfx/ding', v: 0.22},
  {at: 152.3, s: 'tick', v: 0.3}, ...rep(152.8, 16, 0.6, 'tick', 0.12), {at: 155.0, s: 'riser', v: 0.2, dur: 3}, ...[157.5, 158.4, 159.3].map((a) => ({at: a, s: 'sfx/pop', v: 0.2})),
  {at: 165.0, s: 'sfx/thud', v: 0.3}, {at: 167.3, s: 'bass-hit', v: 0.35}, {at: 171.8, s: 'sfx/pop', v: 0.22}, ...[172.6, 173.9, 174.6].map((a) => ({at: a, s: 'sfx/pop', v: 0.18})), {at: 178.6, s: 'bass-hit', v: 0.35}, {at: 180.6, s: 'sfx/swish', v: 0.25}, {at: 184.5, s: 'sfx/pop', v: 0.22}, {at: 187.4, s: 'tampon', v: 0.45},
  {at: 192.3, s: 'sfx/whoosh', v: 0.25}, {at: 194.7, s: 'sfx/whoosh', v: 0.25}, {at: 195.6, s: 'page', v: 0.4}, ...[196.0, 197.6, 199.2, 200.6, 201.8].map((a) => ({at: a, s: 'stylo', v: 0.22})), {at: 202.6, s: 'stylo', v: 0.35}, {at: 203.2, s: 'sfx/rise', v: 0.2}, {at: 204.4, s: 'sfx/ding', v: 0.22},
  ...[210.0, 212.3, 215.8, 228.4].flatMap((a) => flaps(a, 8)), {at: 222.9, s: 'soft-whoosh', v: 0.3}, {at: 234.4, s: 'tampon', v: 0.5},
  {at: 245.1, s: 'sfx/ding', v: 0.25}, {at: 250.0, s: 'validation', v: 0.3}, {at: 258.2, s: 'sfx/swish', v: 0.25}, {at: 259.4, s: 'sfx/swish', v: 0.25}, {at: 261.3, s: 'tampon', v: 0.4}, {at: 264.3, s: 'sfx/thud', v: 0.3}, {at: 266.5, s: 'validation', v: 0.3}, ...flaps(269.9, 8), {at: 273.6, s: 'sfx/swish', v: 0.3}, {at: 277.0, s: 'sfx/pop', v: 0.22}, {at: 279.6, s: 'sfx/pop', v: 0.22},
  {at: 290.5, s: 'sfx/rise', v: 0.25}, {at: 297.0, s: 'sfx/rise', v: 0.25}, {at: 299.9, s: 'sfx/ding', v: 0.22},
  {at: 305.0, s: 'sfx/pop', v: 0.25}, ...flaps(309.1, 8), ...flaps(318.3, 9), ...flaps(320.3, 9), ...flaps(326.9, 9), {at: 327.6, s: 'validation', v: 0.3},
  {at: 334.6, s: 'soft-whoosh', v: 0.3}, {at: 335.4, s: 'sfx/pop', v: 0.2}, {at: 336.8, s: 'sfx/pop', v: 0.2}, {at: 341.0, s: 'deep-hit', v: 0.35}, {at: 345.5, s: 'sfx/pop', v: 0.2}, {at: 346.5, s: 'sfx/pop', v: 0.2}, {at: 351.7, s: 'tampon', v: 0.45},
  {at: 360.7, s: 'sfx/whoosh', v: 0.3}, ...flaps(360.9, 6), {at: 365.5, s: 'sfx/swish', v: 0.25}, {at: 370.3, s: 'sfx/whoosh', v: 0.3}, ...flaps(370.5, 10), {at: 372.7, s: 'sfx/swish', v: 0.25}, {at: 380.0, s: 'tampon', v: 0.5},
  {at: 384.0, s: 'soft-whoosh', v: 0.3}, ...[391.7, 394.2, 395.6].map((a) => ({at: a, s: 'sfx/pop', v: 0.2})), {at: 399.3, s: 'bass-hit', v: 0.35}, {at: 402.0, s: 'sfx/rise', v: 0.25},
  {at: 409.8, s: 'soft-whoosh', v: 0.3}, ...[411.3, 412.1, 412.8].map((a) => ({at: a, s: 'sfx/pop', v: 0.2})), {at: 418.5, s: 'deep-hit', v: 0.35}, {at: 427.0, s: 'sfx/whoosh', v: 0.35}, {at: 428.6, s: 'tampon', v: 0.45},
  ...[443.1, 449.1, 455.7, 461.9].map((a) => ({at: a, s: 'sfx/whoosh', v: 0.25})), ...[446.0, 453.2, 459.2, 466.0].map((a) => ({at: a, s: 'validation', v: 0.3})),
  {at: 470.2, s: 'soft-whoosh', v: 0.3}, {at: 477.6, s: 'deep-hit', v: 0.4}, {at: 479.9, s: 'deep-hit', v: 0.4}, {at: 483.3, s: 'sfx/rise', v: 0.25}, {at: 489.1, s: 'validation', v: 0.4},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const DeclAt: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.6} to={15.1}><Intro /></Gate>
    <Gate from={15.0} to={52.0}><CasEcole /></Gate>
    <Gate from={55.5} to={97.7}><Criteres /></Gate>
    <Gate from={97.6} to={122.2}><Exemples /></Gate>
    <Gate from={122.1} to={146.3}><Trajet /></Gate>
    <Gate from={149.7} to={162.4}><Course /></Gate>
    <Gate from={162.3} to={192.3}><Delais /></Gate>
    <Gate from={192.2} to={207.2}><Flux /></Gate>
    <Gate from={207.1} to={237.2}><Tableau /></Gate>
    <Gate from={240.7} to={285.8}><Bonnes /></Gate>
    <Gate from={285.7} to={303.3}><Graph /></Gate>
    <Gate from={303.2} to={331.0}><Marie /></Gate>
    <Gate from={334.5} to={355.5}><Refus /></Gate>
    <Gate from={355.4} to={383.0}><Recours /></Gate>
    <Gate from={382.9} to={405.1}><Faute /></Gate>
    <Gate from={405.0} to={431.2}><Temporaires /></Gate>
    <Gate from={434.7} to={470.2}><Reflexes /></Gate>
    <Gate from={470.1} to={OUTRO_AT}><Final /></Gate>
    {SECT.map((x, i) => <Gate key={x.n} from={x.at} to={x.at + 3.8}><Pneumatique i={i} /></Gate>)}
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={490.3}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-declaration-at-origine.m4a')} trimAfter={s(490.5)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [random, Word];
