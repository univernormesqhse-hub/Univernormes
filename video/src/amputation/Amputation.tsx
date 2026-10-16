import React from 'react';
import {AbsoluteFill, Audio, Img, random, staticFile} from 'remotion';
import {Gate} from '../anim';
import {Captions} from '../components/Captions';
import {Blinds, Board, Center, Cite, Deep, Dust, Kin, Out, Pill, Stamp, Tile} from '../durab/Durab';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {handFont, s, sansFont} from '../theme';
import {Abs, Bg, DIM, easeIn, easeInOut, easeOut, GREEN, INK, lerp, LOGO, PAPER, PH, pop, prog, RED, spring, T, useT} from '../implIso/kit';
import {Brut, HiLine, Mono, Strike} from '../tdbPilot/TdbPilot';
import {captions} from './captions';

/**
 * « Amputation : guide de crise » (5 min 53) — capsule « ultime » : voix d'origine, sous-titres recalés mot à mot,
 * photos réelles, thème « papier quadrillé ». Aucune image choquante : les gestes sont montrés en schémas.
 * Fil rouge inédit : LA FICHE D'INTERVENTION CHRONOMÉTRÉE. L'en-tête est une fiche de secours avec un chrono
 * « T+ » lancé à l'accident et huit cases qui se cochent au fil des gestes (zone, alerte, pression, garrot + heure,
 * choc, membre, transmission, prévention).
 * Transition inédite : LE GYROPHARE — deux faisceaux bleus balaient l'écran, une bande à damier de véhicule de secours
 * traverse en diagonale et dépose le numéro et le titre de l'étape.
 * Techniques de série reprises : texte cinétique, mot surligné jaune, cartes néo-brutalistes et étiquettes monospace,
 * palettes d'affichage, tuiles de bois, store vénitien, photos en profondeur, tampons, poussière, écran partagé.
 * Nouvelles techniques : chrono au centième, double compte à rebours, schéma du bras avec cote 3–5 cm, couverture de
 * survie à reflets dorés, givre qui envahit l'écran, vue éclatée de l'emballage en couches, sablier 4–6 h, clavier
 * qui compose le 15 / 112, script d'appel qui se coche, portes du bloc qui s'ouvrent, inventaire de kit, filet final.
 */
const BLUE = '#1F6FD1';
const NAVY = '#0E2A5C';
const ORANGE = '#F07A12';
const YEL = '#F5C400';
const BURG = '#7A1F2B';
const NIGHT = '#151A26';
const TEAL = '#0F9D8F';
const VIO = '#6D4BD8';
const GOLD = '#E0A100';
const ICE = '#7EC8E3';
const MONO = '"JetBrains Mono", "IBM Plex Mono", "DejaVu Sans Mono", monospace';
const OUTRO_AT = 353.3;
const T0 = 45.8;
export const AMPUTATION_FRAMES = s(OUTRO_AT + 3.8);
const SECT = [
  {at: 45.8, n: '1', title: 'L’urgence absolue', s: 'les enjeux vitaux', c: RED},
  {at: 96.36, n: '2', title: 'Protéger et sauver', s: 'prioriser la victime', c: BLUE},
  {at: 171.07, n: '3', title: 'Préserver le membre', s: 'sécuriser la partie sectionnée', c: TEAL},
  {at: 225.29, n: '4', title: 'Le relais médical', s: 'transmettre aux urgences', c: VIO},
  {at: 297.2, n: '5', title: 'Prévenir le danger', s: 'la sécurité proactive', c: GREEN},
];
const CHECKS = [
  {l: 'ZONE', at: 107.0, ic: 'stop'}, {l: 'ALERTE', at: 115.4, ic: 'telephone'}, {l: 'PRESSION', at: 127.9, ic: 'main-levee'}, {l: 'GARROT', at: 134.2, ic: 'chrono'},
  {l: 'CHOC', at: 162.7, ic: 'coeur'}, {l: 'MEMBRE', at: 204.7, ic: 'froid'}, {l: 'TRANSMIS', at: 266.4, ic: 'ambulance'}, {l: 'PRÉVENTION', at: 306.5, ic: 'bouclier'},
];
const fmt = (sec: number) => `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(Math.floor(sec % 60)).padStart(2, '0')}`;

/* ═════════════ Fil rouge : la fiche d'intervention chronométrée ═════════════ */
const Header: React.FC = () => {
  const t = useT();
  const run = t >= T0;
  const pose = 145.3;
  return (
    <AbsoluteFill style={{zIndex: 40, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: '50%', top: 56, transform: 'translateX(-50%)', background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 8px 24px rgba(20,33,61,0.12)'}}><Img src={staticFile(LOGO)} style={{height: 76, display: 'block'}} /></div>
      {t > 2.6 && t < OUTRO_AT && (
        <div style={{position: 'absolute', left: 36, right: 36, top: 178, height: 112, borderRadius: 18, background: '#fff', border: `5px solid ${INK}`, boxShadow: `7px 7px 0 ${RED}`, opacity: pop(t, 2.6), overflow: 'hidden'}}>
          <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: 200, background: run ? RED : '#2A3142', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{fontFamily: MONO, fontSize: 13, letterSpacing: 2, color: '#fff', opacity: 0.85}}>FICHE D’INTERVENTION</div>
            <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 38, color: '#fff'}}>T+{run ? fmt(t - T0) : '00:00'}</div>
            {run && <div style={{width: 10, height: 10, borderRadius: 5, background: '#fff', opacity: Math.sin(t * 6) > 0 ? 1 : 0.2, position: 'absolute', right: 12, top: 12}} />}
          </div>
          <div style={{position: 'absolute', left: 214, right: 10, top: 10, bottom: 10, display: 'flex', justifyContent: 'space-between'}}>
            {CHECKS.map((c, k) => {
              const on = t >= c.at;
              const p = Math.max(0, Math.min(1, spring(t, c.at, 9, 12)));
              return (
                <div key={k} style={{width: 92, textAlign: 'center'}}>
                  <div style={{width: 46, height: 46, margin: '0 auto', borderRadius: 10, border: `4px solid ${on ? GREEN : '#C9D2DF'}`, background: on ? `${GREEN}18` : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box', transform: `scale(${on ? 0.8 + 0.2 * p : 1})`}}>
                    {on ? <svg width={30} height={30}><path d="M5 16 L12 23 L26 7" fill="none" stroke={GREEN} strokeWidth={5} strokeLinecap="round" strokeDasharray={40} strokeDashoffset={40 * (1 - p)} /></svg> : <div style={{opacity: 0.35, filter: 'grayscale(1)'}}><F n={c.ic} size={26} /></div>}
                  </div>
                  <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 11, color: on ? INK : '#A9B1BE', marginTop: 6}}>{c.l}</div>
                  {c.l === 'GARROT' && t >= pose && <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 18, color: RED, lineHeight: 1}}>{fmt(pose - T0)}</div>}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

/** Le gyrophare : faisceaux bleus + bande à damier qui traverse. */
const Gyro: React.FC<{i: number}> = ({i}) => {
  const t = useT();
  const S0 = SECT[i];
  const k = t - S0.at;
  if (k < 0 || k > 3.3) return null;
  const inn = prog(t, S0.at, S0.at + 0.25, easeOut) * (1 - prog(t, S0.at + 2.9, S0.at + 3.3, easeIn));
  const band = prog(t, S0.at + 0.3, S0.at + 1.0, easeOut);
  const rot = k * 520;
  return (
    <AbsoluteFill style={{zIndex: 35, opacity: inn, overflow: 'hidden'}}>
      <AbsoluteFill style={{background: PAPER}} />
      <Bg />
      <AbsoluteFill style={{background: `conic-gradient(from ${rot}deg at 540px 300px, rgba(31,111,209,0.38) 0deg, transparent 26deg, transparent 180deg, rgba(31,111,209,0.38) 180deg, transparent 206deg)`, opacity: 1 - prog(t, S0.at + 1.6, S0.at + 2.4)}} />
      <div style={{position: 'absolute', left: 470, top: 250, width: 140, height: 90, borderRadius: '70px 70px 12px 12px', background: `radial-gradient(circle at 50% 40%, #fff, ${BLUE} 60%)`, border: `5px solid ${INK}`, boxShadow: `0 0 ${40 + 30 * Math.abs(Math.sin(k * 9))}px ${BLUE}`}} />
      <div style={{position: 'absolute', left: -400, top: 780, width: 1900, height: 260, transform: `translateX(${lerp(-1900, 0, band)}px) rotate(-8deg)`, background: `repeating-conic-gradient(${NAVY} 0 25%, ${YEL} 0 50%) 0 0 / 130px 130px`, border: `8px solid ${INK}`, boxShadow: '0 20px 40px rgba(20,33,61,0.3)'}} />
      <div style={{position: 'absolute', left: 140, top: 760, width: 800, height: 300, transform: `rotate(-8deg) scale(${Math.max(0, Math.min(1, spring(t, S0.at + 0.9, 8, 12)))})`, background: '#fff', border: `7px solid ${INK}`, borderRadius: 24, boxShadow: `12px 12px 0 ${S0.c}`, display: 'flex', alignItems: 'center', gap: 26, padding: '0 34px', boxSizing: 'border-box'}}>
        <div style={{width: 150, height: 150, borderRadius: 75, background: S0.c, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 96, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{S0.n}</div>
        <div><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 24, color: DIM, letterSpacing: 3}}>ÉTAPE {S0.n} / 5</div><Kin text={S0.title} at={S0.at + 1.1} size={S0.title.length > 18 ? 52 : 60} /></div>
      </div>
      <Abs x={0} y={1140} w={1080} style={{textAlign: 'center'}}><Mono at={S0.at + 1.6} c={S0.c} size={30}>{S0.s}</Mono></Abs>
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
      <Img src={PH('zones/chantier.jpg')} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 820, objectFit: 'cover', objectPosition: '50% 40%'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 30%, ${PAPER}DD 38%, ${PAPER} 43%)`}} />
      <Abs x={0} y={90} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <div style={{position: 'absolute', left: -100, top: 690, width: 1300, height: 90, transform: 'rotate(-4deg)', background: `repeating-conic-gradient(${NAVY} 0 25%, ${YEL} 0 50%) 0 0 / 90px 90px`, border: `6px solid ${INK}`}} />
      <Abs x={0} y={820} w={1080} style={{textAlign: 'center'}}>
        <div style={{display: 'flex', justifyContent: 'center', gap: 8}}>{'AMPUTATION'.split('').map((c, i) => <Tile key={i} ch={c} size={92} c={RED} />)}</div>
        <T size={96} style={{marginTop: 20, textTransform: 'uppercase', letterSpacing: -2}}>Guide de <span style={{backgroundImage: `linear-gradient(${YEL}, ${YEL})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 42%', backgroundPosition: '0 88%'}}>crise</span></T>
        <div style={{display: 'inline-block', marginTop: 14, fontFamily: MONO, fontWeight: 700, fontSize: 28, letterSpacing: 3, color: '#fff', background: RED, padding: '8px 20px', borderRadius: 6}}>LES GESTES QUI SAUVENT</div>
      </Abs>
      <Abs x={140} y={1260} w={800} h={170} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 18, boxShadow: `8px 8px 0 ${RED}`, display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
        {['stop', 'telephone', 'main-levee', 'froid', 'ambulance'].map((ic, k) => <div key={k} style={{textAlign: 'center'}}><F n={ic} size={74} /><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 16, color: INK}}>{k + 1}</div></div>)}
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ INTRO ═════════════ */
const Intro: React.FC = () => {
  const t = useT();
  const cs = Math.floor((t * 100) % 100), sec = Math.floor(t % 60);
  const panic = prog(t, 7.2, 8.0, easeOut);
  return (
    <Out end={31.4}>
      <HiLine words={['Chaque', 'fraction', 'de', 'seconde']} mark={[1]} at={1.4} y={320} size={62} />
      {t < 16.0 && (
        <>
          <Abs x={140} y={450} w={800} h={300} style={{background: NIGHT, borderRadius: 26, border: `6px solid ${INK}`, boxShadow: `10px 10px 0 ${RED}`, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 2.7)}}>
            <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 150, color: RED, textShadow: `0 0 30px ${RED}`}}>{String(sec).padStart(2, '0')}<span style={{fontSize: 90, color: '#fff'}}>.{String(cs).padStart(2, '0')}</span></div>
          </Abs>
          <Abs x={140} y={790} w={800} h={200} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 30, opacity: pop(t, 5.3)}}>
            <div style={{position: 'relative', fontFamily: handFont, fontWeight: 700, fontSize: 70, color: RED, transform: `rotate(${Math.sin(t * 20) * 4 * (1 - panic)}deg)`}}>panique<Strike p={panic} c={INK} /></div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: DIM}}>→</div>
            <div style={{opacity: pop(t, 9.0)}}><Board text="PROTOCOLE" at={9.0} h={62} c={INK} stag={0.04} /></div>
          </Abs>
          <Stamp at={12.6} c={RED} text="éviter le pire" x={300} y={1060} rot={-5} size={54} />
        </>
      )}
      {t >= 16.0 && (
        <>
          <Abs x={70} y={450} w={940} style={{textAlign: 'center', opacity: pop(t, 16.1)}}>
            <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 28, color: DIM, letterSpacing: 3}}>URGENCE MÉDICALE EXTRÊME</div>
            <div style={{marginTop: 20}}><Kin text="L’amputation accidentelle d’un membre" at={19.1} size={70} color={RED} /></div>
          </Abs>
          <Abs x={0} y={800} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 16}}><Pill at={21.7} c={INK} size={32}>pas de théorie</Pill><Pill at={24.3} c={GREEN} size={32}>les gestes qui sauvent</Pill></Abs>
          <Brut x={190} y={920} w={700} h={260} at={27.1} sh={RED} style={{display: 'flex', alignItems: 'center', gap: 22}}>
            <F n="classeur" size={130} /><div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK}}>Guide de gestion de crise</div><div style={{fontFamily: handFont, fontWeight: 700, fontSize: 40, color: RED}}>face à l’impensable</div></div>
          </Brut>
        </>
      )}
    </Out>
  );
};
const Plan: React.FC = () => {
  const t = useT();
  const P = [{l: 'L’urgence absolue', a: 37.4, ic: 'sirene'}, {l: 'Protéger et sauver', a: 39.5, ic: 'bouclier'}, {l: 'Préserver le membre', a: 41.5, ic: 'froid'}, {l: 'Le relais médical', a: 42.8, ic: 'ambulance'}, {l: 'Prévenir le danger', a: 44.0, ic: 'casque'}];
  return (
    <Out end={45.85}>
      <HiLine words={['Une', 'structure', 'infaillible']} mark={[1]} at={32.7} y={320} size={60} />
      {P.map((p, k) => (
        <Brut key={k} x={110 + (k % 2) * 40} y={440 + k * 158} w={820} h={130} at={p.a} sh={SECT[k].c} style={{display: 'flex', alignItems: 'center', gap: 22, padding: '0 26px'}}>
          <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 48, color: SECT[k].c}}>0{k + 1}</div><F n={p.ic} size={70} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 38, color: INK}}>{p.l}</div>
        </Brut>
      ))}
    </Out>
  );
};

/* ═════════════ ÉTAPE 1 ═════════════ */
const Double: React.FC = () => {
  const t = useT();
  const flash = Math.max(0, 1 - Math.abs(t - 57.3) * 4) + Math.max(0, 1 - Math.abs(t - 58.0) * 4);
  const run = Math.max(0, t - 60.3);
  const decay = prog(t, 64.2, 69.0);
  return (
    <Out end={76.6}>
      <HiLine words={['Une', 'double', 'priorité']} mark={[1]} at={53.4} y={320} size={64} />
      <AbsoluteFill style={{background: `rgba(229,72,77,${0.18 * flash})`}} />
      <Abs x={50} y={440} w={980} h={640} style={{transform: `translate(${Math.sin(t * 70) * 10 * flash}px, 0)`}}>
        <div style={{position: 'absolute', left: 0, top: 0, width: 475, height: 640, background: '#fff', border: `5px solid ${INK}`, borderRadius: 22, boxShadow: `8px 8px 0 ${RED}`, opacity: pop(t, 60.3), overflow: 'hidden'}}>
          <div style={{background: RED, color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 22, padding: '10px 16px'}}>① HÉMORRAGIE MASSIVE</div>
          <div style={{position: 'absolute', left: 0, right: 0, top: 80, display: 'flex', justifyContent: 'center'}}><F n="goutte" size={150} style={{filter: 'hue-rotate(160deg) saturate(3)'}} /></div>
          {Array.from({length: 6}, (_, j) => {const ph = (run * 1.3 + j / 6) % 1; return run > 0 ? <div key={j} style={{position: 'absolute', left: 120 + j * 40, top: 240 + ph * 200, width: 16, height: 24, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', background: RED, opacity: 1 - ph}} /> : null;})}
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 40, textAlign: 'center'}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: RED}}>fatale en</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: INK}}>quelques instants</div></div>
        </div>
        <div style={{position: 'absolute', right: 0, top: 0, width: 475, height: 640, background: '#fff', border: `5px solid ${INK}`, borderRadius: 22, boxShadow: `8px 8px 0 ${TEAL}`, opacity: pop(t, 63.6), overflow: 'hidden'}}>
          <div style={{background: TEAL, color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 22, padding: '10px 16px'}}>② TISSUS AMPUTÉS</div>
          <div style={{position: 'absolute', left: 60, right: 60, top: 100, height: 200, borderRadius: 20, background: `linear-gradient(90deg, ${TEAL} ${(1 - decay) * 100}%, #9AA3B2 ${(1 - decay) * 100}%)`, border: `4px solid ${INK}`}} />
          <div style={{position: 'absolute', left: 0, right: 0, top: 320, textAlign: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 26, color: DIM}}>viabilité des tissus</div>
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 40, textAlign: 'center'}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: TEAL}}>chances de</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK}}>réimplantation</div></div>
        </div>
        {flash > 0.05 && <div style={{position: 'absolute', left: 390, top: 260, fontSize: 120, fontWeight: 900, color: RED, opacity: flash}}>✦✦</div>}
      </Abs>
      <Abs x={0} y={1120} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={70.9} c={INK} size={30}>les premières minutes</Pill><Pill at={75.2} c={RED} size={30}>chaque seconde compte</Pill></Abs>
    </Out>
  );
};
const Lieux: React.FC = () => {
  const t = useT();
  const L = [{l: 'chantiers du BTP', ph: 'zones/chantier.jpg', a: 85.5}, {l: 'ateliers industriels', ph: 'promo/hse-machine.jpg', a: 86.9}, {l: 'machines agricoles', ph: '', a: 89.1}, {l: 'mécanique', ph: 'permisfeu/meuleuse.jpg', a: 91.2}];
  const tip = prog(t, 93.5, 95.0, easeInOut);
  return (
    <Out end={96.4}>
      <HiLine words={['Des', 'environnements', 'à', 'très', 'haut', 'risque']} mark={[1]} at={83.3} y={320} size={50} />
      {L.map((l, k) => (
        <Abs key={k} x={70 + (k % 2) * 480} y={440 + Math.floor(k / 2) * 330} w={460} h={300} style={{borderRadius: 20, overflow: 'hidden', border: `5px solid ${INK}`, boxShadow: `7px 7px 0 ${ORANGE}`, opacity: pop(t, l.a), transform: `scale(${0.9 + 0.1 * Math.max(0, Math.min(1, spring(t, l.a, 8, 12)))})`, background: '#EEF3E6'}}>
          {l.ph ? <Img src={PH(l.ph)} style={{width: '100%', height: '100%', objectFit: 'cover'}} /> : <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}><F n="herbe" size={150} /><F n="engrenage" size={110} /></div>}
          <div style={{position: 'absolute', left: 12, bottom: 12}}><Mono at={l.a} c={INK} size={20}>{l.l}</Mono></div>
        </Abs>
      ))}
      <Abs x={140} y={1110} w={800} h={170} style={{opacity: pop(t, 92.6)}}>
        <svg width={800} height={170} style={{position: 'absolute', inset: 0}}><polygon points="400,160 380,170 420,170" fill={INK} /><g transform={`rotate(${tip * 12} 400 70)`}><line x1={100} y1={70} x2={700} y2={70} stroke={INK} strokeWidth={10} strokeLinecap="round" /></g><line x1={400} y1={70} x2={400} y2={165} stroke={INK} strokeWidth={8} /></svg>
        <div style={{position: 'absolute', left: 30, top: lerp(0, -60, tip), textAlign: 'center'}}><F n="coeur" size={70} /><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 16}}>corps humain</div></div>
        <div style={{position: 'absolute', right: 30, top: lerp(0, 60, tip), textAlign: 'center'}}><F n="engrenage" size={70} /><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 16}}>puissance mécanique</div></div>
      </Abs>
    </Out>
  );
};

/* ═════════════ ÉTAPE 2 ═════════════ */
const Gestes: React.FC = () => {
  const t = useT();
  const stop = prog(t, 110.6, 111.6, easeOut);
  const spin = t < 110.6 ? t * 400 : 110.6 * 400 + (1 - Math.pow(1 - Math.min(1, (t - 110.6)), 2)) * 160;
  const typed = (t > 115.4 ? '15' : '') + (t > 116.3 ? ' · 112' : '');
  return (
    <Out end={123.05}>
      <HiLine words={['Deux', 'purs', 'automatismes']} mark={[2]} at={101.9} y={320} size={60} />
      <Brut x={70} y={440} w={940} h={330} at={105.4} sh={RED} style={{display: 'flex', gap: 24, alignItems: 'center'}}>
        <div style={{position: 'relative', width: 330, height: 270, borderRadius: 16, overflow: 'hidden', flexShrink: 0}}>
          <Img src={PH('promo/hse-machine.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', filter: `grayscale(${stop})`}} />
          <div style={{position: 'absolute', right: 10, top: 10, transform: `rotate(${spin}deg)`}}><F n="engrenage" size={80} /></div>
          {stop > 0 && <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${stop})`}}><F n="stop" size={140} /></div>}
        </div>
        <div>
          <Mono at={105.5} c={RED} size={22}>étape 1</Mono>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: INK, marginTop: 8}}>Sécuriser la zone</div>
          <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 26, color: DIM, marginTop: 6, opacity: pop(t, 108.3)}}>jamais si la machine tourne encore</div>
          <div style={{display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap'}}><Pill at={111.3} c={INK} size={22}>neutraliser le danger</Pill><Pill at={112.6} c={BLUE} size={22}>éloigner la victime</Pill></div>
        </div>
      </Brut>
      <Brut x={70} y={800} w={940} h={430} at={114.2} sh={BLUE} style={{display: 'flex', gap: 24, alignItems: 'center'}}>
        <div style={{width: 300, flexShrink: 0, background: NIGHT, borderRadius: 30, border: `5px solid ${INK}`, padding: 18, boxSizing: 'border-box'}}>
          <div style={{height: 70, borderRadius: 12, background: '#0B0F18', color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 40, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{typed}<span style={{opacity: Math.sin(t * 10) > 0 ? 1 : 0}}>|</span></div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 12}}>
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((d, j) => {
              const hit = (d === '1' && (Math.abs(t - 115.4) < 0.15 || Math.abs(t - 116.3) < 0.15 || Math.abs(t - 116.5) < 0.15)) || (d === '5' && Math.abs(t - 115.6) < 0.15) || (d === '2' && Math.abs(t - 116.7) < 0.15);
              return <div key={j} style={{height: 50, borderRadius: 25, background: hit ? BLUE : '#2A3142', color: '#fff', fontFamily: MONO, fontWeight: 700, fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{d}</div>;
            })}
          </div>
        </div>
        <div>
          <Mono at={114.3} c={BLUE} size={22}>étape 2</Mono>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: INK, marginTop: 8}}>Alerter</div>
          <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 64, color: BLUE, opacity: pop(t, 115.4)}}>15 · 112</div>
          <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 26, color: DIM, opacity: pop(t, 116.9)}}>dans les toutes premières secondes</div>
        </div>
      </Brut>
      <Cite y={1250} at={115.4} text="numéros d’urgence cités par la vidéo d’origine" />
    </Out>
  );
};
/** Schéma du bras : pression, garrot, cote 3–5 cm, articulation interdite. */
const Hemorragie: React.FC = () => {
  const t = useT();
  const press = t > 127.9 ? 0.5 + 0.5 * Math.abs(Math.sin((t - 127.9) * 3)) : 0;
  const gar = prog(t, 134.2, 134.9, easeOut);
  const cote = prog(t, 138.7, 139.6, easeInOut);
  const nojoint = prog(t, 141.9, 142.5, easeOut);
  return (
    <Out end={149.85}>
      <HiLine words={['Stopper', 'l’hémorragie']} mark={[1]} at={123.8} y={320} size={64} />
      <Abs x={70} y={440} w={940} h={600} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 24, boxShadow: `9px 9px 0 ${RED}`, overflow: 'hidden', opacity: pop(t, 124.5)}}>
        <svg width={940} height={600} style={{position: 'absolute', inset: 0}}>
          <path d="M60 250 C 200 230, 340 240, 470 255 L 760 275 C 800 278, 800 352, 760 355 L 470 345 C 340 355, 200 365, 60 350 Z" fill="#E9C9A8" stroke={INK} strokeWidth={5} />
          <circle cx={300} cy={300} r={22} fill="none" stroke={INK} strokeWidth={4} strokeDasharray="6 6" />
          <text x={300} y={225} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={20} fill={DIM}>coude</text>
          {nojoint > 0 && <g opacity={nojoint}><line x1={270} y1={270} x2={330} y2={330} stroke={RED} strokeWidth={8} /><line x1={330} y1={270} x2={270} y2={330} stroke={RED} strokeWidth={8} /></g>}
          <rect x={700} y={262} width={64} height={102} rx={10} fill="#fff" stroke={INK} strokeWidth={4} />
          <text x={732} y={392} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={18} fill={RED}>plaie</text>
          {gar > 0 && <rect x={560} y={lerp(300, 240, gar)} width={34} height={lerp(10, 130, gar)} rx={6} fill={ORANGE} stroke={INK} strokeWidth={4} />}
          {cote > 0 && <g opacity={cote}><line x1={594} y1={430} x2={lerp(594, 700, cote)} y2={430} stroke={BLUE} strokeWidth={5} /><line x1={594} y1={410} x2={594} y2={450} stroke={BLUE} strokeWidth={5} /><line x1={700} y1={410} x2={700} y2={450} stroke={BLUE} strokeWidth={5} /><text x={647} y={480} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={30} fill={BLUE}>3 – 5 cm</text></g>}
        </svg>
        {t > 127.9 && t < 134.4 && <div style={{position: 'absolute', left: 660, top: 140, transform: `scale(${1 + 0.08 * press})`}}><F n="main-levee" size={130} style={{transform: 'rotate(180deg)'}} /></div>}
        <div style={{position: 'absolute', left: 24, top: 20, display: 'flex', flexDirection: 'column', gap: 8}}>
          <Mono at={127.9} c={RED} size={20}>① pression directe, forte, constante</Mono>
          <Mono at={130.4} c={INK} size={18}>pansements absorbants stériles</Mono>
          <Mono at={134.2} c={ORANGE} size={20}>② si ça saigne encore : garrot</Mono>
        </div>
        <div style={{position: 'absolute', left: 24, bottom: 20, opacity: pop(t, 141.9)}}><Mono at={141.9} c={RED} size={20}>jamais sur une articulation</Mono></div>
      </Abs>
      {t > 143.5 && (
        <Brut x={190} y={1070} w={700} h={170} at={143.6} sh={ORANGE} style={{display: 'flex', alignItems: 'center', gap: 22}}>
          <F n="chrono" size={100} />
          <div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK}}>Noter l’heure de la pose</div><div style={{fontFamily: handFont, fontWeight: 700, fontSize: 40, color: RED, clipPath: `inset(0 ${(1 - prog(t, 145.3, 146.2)) * 100}% 0 0)`}}>garrot posé à T+{fmt(145.3 - T0)}</div></div>
        </Brut>
      )}
      <Cite y={1265} at={138.7} text="distance citée par la vidéo d’origine · schéma illustratif" />
    </Out>
  );
};
const Choc: React.FC = () => {
  const t = useT();
  const cover = prog(t, 162.7, 164.0, easeInOut);
  return (
    <Out end={171.1}>
      <HiLine words={['Prévenir', 'l’état', 'de', 'choc']} mark={[0, 3]} at={153.6} y={320} size={60} />
      <Abs x={70} y={440} w={940} style={{display: 'flex', justifyContent: 'center', gap: 16}}>
        {[{l: 'consciente', a: 159.0}, {l: 'respire', a: 159.7}].map((x, k) => (
          <div key={k} style={{display: 'flex', alignItems: 'center', gap: 10, background: '#fff', border: `4px solid ${INK}`, borderRadius: 14, padding: '10px 20px', opacity: pop(t, x.a)}}><div style={{width: 34, height: 34, borderRadius: 8, background: GREEN, color: '#fff', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>✓</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: INK}}>{x.l}</div></div>
        ))}
      </Abs>
      <Abs x={70} y={560} w={940} h={520} style={{background: NIGHT, borderRadius: 24, border: `5px solid ${INK}`, boxShadow: `9px 9px 0 ${GOLD}`, overflow: 'hidden', opacity: pop(t, 156.7)}}>
        <svg width={940} height={520} style={{position: 'absolute', inset: 0}}>
          <rect x={120} y={360} width={700} height={24} rx={12} fill="#2A3142" />
          <g opacity={pop(t, 160.5)}><circle cx={200} cy={320} r={38} fill="#E9C9A8" stroke="#fff" strokeWidth={3} /><rect x={240} y={295} width={480} height={56} rx={28} fill="#5A647A" /></g>
        </svg>
        {cover > 0 && (
          <div style={{position: 'absolute', left: 230, top: lerp(-200, 270, cover), width: 520, height: 110, borderRadius: 18, background: `linear-gradient(${110 + Math.sin(t * 2) * 20}deg, #8A6A1A, #F5D77A 30%, #FFF3C4 45%, #C99A2E 60%, #F5D77A 80%, #8A6A1A)`, boxShadow: `0 0 30px rgba(245,215,122,0.6)`, transform: `rotate(${(1 - cover) * -12}deg)`}} />
        )}
        <div style={{position: 'absolute', left: 24, top: 20}}><Mono at={160.5} c={'#5A647A'} size={20}>allonger · oxygéner le cerveau</Mono></div>
        <div style={{position: 'absolute', right: 24, top: 20}}><Mono at={162.7} c={GOLD} size={20} style={{color: INK}}>couverture de survie</Mono></div>
        <div style={{position: 'absolute', left: 24, bottom: 20, display: 'flex', alignItems: 'center', gap: 10, opacity: pop(t, 166.9)}}><F n="thermometre" size={60} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: '#fff'}}>éviter l’hypothermie</div></div>
      </Abs>
      <Abs x={0} y={1120} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={168.9} c={INK} size={30}>calme</Pill><Pill at={169.5} c={GOLD} size={30}>méthode</Pill></Abs>
    </Out>
  );
};

/* ═════════════ ÉTAPE 3 ═════════════ */
const Interdit: React.FC = () => {
  const t = useT();
  const frost = prog(t, 185.9, 190.0, easeInOut);
  return (
    <Out end={193.1}>
      <HiLine words={['L’erreur', 'la', 'plus', 'destructrice']} mark={[3]} at={177.7} y={320} size={56} />
      <Abs x={70} y={440} w={940} style={{display: 'flex', gap: 24}}>
        {[{l: 'laver le membre', ic: 'goutte', a: 180.3}, {l: 'le jeter dans la glace', ic: 'froid', a: 182.0}].map((x, k) => (
          <div key={k} style={{flex: 1, position: 'relative', height: 380, background: '#fff', border: `5px solid ${INK}`, borderRadius: 22, boxShadow: `8px 8px 0 ${RED}`, textAlign: 'center', paddingTop: 50, boxSizing: 'border-box', opacity: pop(t, x.a)}}>
            <div style={{display: 'flex', justifyContent: 'center'}}><F n={x.ic} size={150} /></div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK, marginTop: 20}}>{x.l}</div>
            <svg width={430} height={380} style={{position: 'absolute', left: 0, top: 0}}><line x1={40} y1={40} x2={390} y2={340} stroke={RED} strokeWidth={16} strokeLinecap="round" strokeDasharray={480} strokeDashoffset={480 * (1 - prog(t, 184.2, 184.8))} /></svg>
          </div>
        ))}
      </Abs>
      <Stamp at={184.3} c={RED} text="formellement interdit" x={180} y={860} rot={-5} size={56} />
      <AbsoluteFill style={{pointerEvents: 'none', background: `radial-gradient(circle at 50% 50%, transparent ${lerp(100, 45, frost)}%, rgba(126,200,227,${0.55 * frost}) 100%)`}} />
      {frost > 0 && Array.from({length: 18}, (_, j) => <div key={j} style={{position: 'absolute', left: random(`fx${j}`) < 0.5 ? random(`fa${j}`) * 160 : 920 + random(`fa${j}`) * 160, top: 300 + random(`fy${j}`) * 1200, fontSize: 40 + random(`fs${j}`) * 50, color: '#fff', opacity: frost * 0.9, transform: `rotate(${random(`fr${j}`) * 60}deg)`, textShadow: `0 0 10px ${ICE}`}}>❄</div>)}
      <Abs x={110} y={1000} w={860} h={200} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, opacity: pop(t, 187.3)}}>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 36, color: INK}}>brûlures tissulaires irréversibles</div>
      </Abs>
      <Stamp at={191.0} c={INK} text="greffe impossible" x={300} y={1150} rot={-6} size={48} />
    </Out>
  );
};
/** Vue éclatée de l'emballage + sablier 4–6 h. */
const Methode: React.FC = () => {
  const t = useT();
  const ex = prog(t, 194.2, 196.5, easeOut) * (1 - prog(t, 205.2, 206.4, easeInOut));
  const layers = [{l: 'compresse stérile humidifiée (sérum physiologique)', c: '#fff', a: 194.2, b: INK}, {l: 'sac plastique hermétique', c: '#DDEFFF', a: 200.5, b: BLUE}, {l: 'emballage isotherme + poches de froid', c: '#E6F7F3', a: 202.7, b: TEAL}];
  const sand = prog(t, 207.0, 216.8);
  return (
    <Out end={225.35}>
      <HiLine words={['La', 'bonne', 'méthode']} mark={[1]} at={193.3} y={320} size={64} />
      {t < 206.8 && (
        <Abs x={70} y={440} w={940} h={780}>
          {layers.map((L, k) => {
            const y = 120 + k * 70 * (1 - ex) + k * 210 * ex;
            return (
              <div key={k} style={{position: 'absolute', left: 140 - k * 30, top: y, width: 600 + k * 60, height: 170, transform: `perspective(1200px) rotateX(${50 * (1 - ex * 0.4)}deg)`, background: L.c, border: `5px solid ${L.b}`, borderRadius: 24, opacity: pop(t, L.a), boxShadow: '0 20px 40px rgba(20,33,61,0.18)', zIndex: 3 - k}}>
                {k === 2 && [0, 1, 2].map((j) => <div key={j} style={{position: 'absolute', left: 40 + j * 200, top: 50, width: 120, height: 60, borderRadius: 12, background: ICE, border: `3px solid ${BLUE}`}} />)}
              </div>
            );
          })}
          {layers.map((L, k) => <div key={`l${k}`} style={{position: 'absolute', right: 0, top: 150 + k * 280, width: 300, opacity: pop(t, L.a + 0.3) * ex}}><Mono at={L.a + 0.3} c={L.b} size={18}>{`${k + 1} · ${L.l}`}</Mono></div>)}
          <div style={{position: 'absolute', left: 290, top: 140 - 20, opacity: pop(t, 195.0) * (1 - ex * 0.3)}}><F n="pansement" size={110} /></div>
        </Abs>
      )}
      {t >= 206.8 && (
        <Abs x={70} y={440} w={940} h={780} style={{opacity: pop(t, 206.9)}}>
          <svg width={300} height={440} style={{position: 'absolute', left: 60, top: 60}}>
            <path d="M40 20 L260 20 L170 220 L260 420 L40 420 L130 220 Z" fill="#fff" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
            <path d={`M${60 + sand * 60} ${30 + sand * 160} L${240 - sand * 60} ${30 + sand * 160} L150 210 Z`} fill={GOLD} />
            <path d={`M150 ${410 - sand * 150} L${150 + 70 * sand + 20} 410 L${150 - 70 * sand - 20} 410 Z`} fill={GOLD} />
            <line x1={150} y1={210} x2={150} y2={410} stroke={GOLD} strokeWidth={4} opacity={sand < 1 ? 1 : 0} />
          </svg>
          <div style={{position: 'absolute', left: 400, top: 80}}>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 170, color: TEAL, lineHeight: 1, transform: `scale(${Math.min(1, spring(t, 207.0, 7, 11))})`}}>4–6 h</div>
            <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 44, color: INK}}>un chiffre à graver</div>
            <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 28, color: DIM, marginTop: 12, opacity: pop(t, 210.2)}}>durée maximale pour de vraies chances<br />de réimplantation (membre bien conditionné)</div>
          </div>
          <div style={{position: 'absolute', left: 400, top: 470, opacity: pop(t, 216.9)}}><Mono at={216.9} c={RED} size={24}>au-delà : dégradation à vitesse grand V</Mono></div>
          <div style={{position: 'absolute', left: 60, bottom: 40, right: 60, textAlign: 'center', opacity: pop(t, 220.3)}}><div style={{display: 'inline-flex', alignItems: 'center', gap: 16, background: `linear-gradient(90deg, #F5D77A, #FFF3C4, #E0A100)`, border: `4px solid ${INK}`, borderRadius: 16, padding: '14px 26px'}}><F n="telephone" size={60} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK}}>alerter vite vaut de l’or</div></div></div>
        </Abs>
      )}
      <Cite y={1240} at={207.0} text="durée citée par la vidéo d’origine" />
    </Out>
  );
};

/* ═════════════ ÉTAPE 4 ═════════════ */
const Appel: React.FC = () => {
  const t = useT();
  const L = [{l: 'Identité', s: 'état : conscience, respiration', a: 252.6}, {l: 'Circonstances exactes', s: 'coupure nette ou écrasement ?', a: 256.8}, {l: 'Soins déjà faits', s: 'heure du garrot · membre emballé', a: 263.1}];
  const bloc = prog(t, 241.4, 248.0);
  const doors = prog(t, 269.9, 270.9, easeInOut);
  const tog = t > 258.3 ? (Math.sin((t - 258.3) * 3) > 0 ? 0 : 1) : -1;
  return (
    <Out end={271.6}>
      <HiLine words={['Que', 'dire', 'exactement', '?']} mark={[2]} at={234.1} y={320} size={62} />
      <Abs x={70} y={440} w={540} h={800} style={{background: NIGHT, borderRadius: 34, border: `6px solid ${INK}`, boxShadow: `9px 9px 0 ${VIO}`, overflow: 'hidden', opacity: pop(t, 234.5)}}>
        <div style={{padding: '22px 26px', borderBottom: '2px solid #2A3142', display: 'flex', alignItems: 'center', gap: 14}}><div style={{width: 18, height: 18, borderRadius: 9, background: GREEN, opacity: Math.sin(t * 5) > 0 ? 1 : 0.4}} /><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 28, color: '#fff'}}>15 / 112 · en ligne</div></div>
        <div style={{padding: 22, display: 'flex', flexDirection: 'column', gap: 18}}>
          {L.map((x, k) => {
            const on = t > x.a + 1.5;
            return (
              <div key={k} style={{background: '#1D2433', borderRadius: 16, padding: 18, borderLeft: `8px solid ${on ? GREEN : VIO}`, opacity: pop(t, x.a), transform: `translateX(${(1 - pop(t, x.a)) * 40}px)`}}>
                <div style={{display: 'flex', alignItems: 'center', gap: 10}}><div style={{width: 30, height: 30, borderRadius: 8, border: `3px solid ${on ? GREEN : '#5A647A'}`, color: GREEN, fontWeight: 900, textAlign: 'center', lineHeight: '26px'}}>{on ? '✓' : ''}</div><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: '#fff'}}>{x.l}</div></div>
                <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 22, color: '#9FB0CC', marginTop: 6}}>{x.s}</div>
                {k === 1 && tog >= 0 && <div style={{display: 'flex', gap: 8, marginTop: 10}}>{['coupure nette', 'écrasement'].map((o, j) => <div key={j} style={{padding: '4px 12px', borderRadius: 20, background: tog === j ? VIO : '#2A3142', color: '#fff', fontFamily: MONO, fontSize: 16}}>{o}</div>)}</div>}
              </div>
            );
          })}
        </div>
      </Abs>
      <Abs x={640} y={440} w={370} h={800} style={{background: '#fff', border: `5px solid ${INK}`, borderRadius: 24, boxShadow: `8px 8px 0 ${TEAL}`, overflow: 'hidden', opacity: pop(t, 238.0)}}>
        <div style={{padding: 18, textAlign: 'center'}}><F n="hopital" size={110} style={{margin: '0 auto'}} /><div style={{fontFamily: MONO, fontWeight: 700, fontSize: 20, color: INK, marginTop: 6}}>le régulateur prépare</div></div>
        {['bloc opératoire', 'chirurgie reconstructrice'].map((l, k) => <div key={k} style={{margin: '10px 18px'}}><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 20, color: INK}}>{l}</div><div style={{height: 14, borderRadius: 7, background: '#EEF1F5', overflow: 'hidden', marginTop: 6}}><div style={{width: `${Math.min(100, bloc * 100 * (k ? 0.85 : 1) + (t > 266 ? 20 : 0))}%`, height: '100%', background: TEAL}} /></div></div>)}
        <div style={{position: 'absolute', left: 30, right: 30, bottom: 30, height: 300, border: `5px solid ${INK}`, borderRadius: 10, overflow: 'hidden', background: '#FFF6C9'}}>
          <div style={{position: 'absolute', left: 0, top: 0, width: '50%', height: '100%', background: '#C9D2DF', borderRight: `3px solid ${INK}`, transform: `translateX(${-doors * 100}%)`}} />
          <div style={{position: 'absolute', right: 0, top: 0, width: '50%', height: '100%', background: '#C9D2DF', borderLeft: `3px solid ${INK}`, transform: `translateX(${doors * 100}%)`}} />
          <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: GREEN, opacity: doors}}>prêt à opérer</div>
        </div>
      </Abs>
    </Out>
  );
};
const Kit: React.FC = () => {
  const t = useT();
  const I = [{l: 'pansements ultra-absorbants', ic: 'pansement', a: 283.3}, {l: 'couverture de survie', ic: 'etoile', a: 285.0}, {l: 'poches de froid instantanées', ic: 'froid', a: 286.2}, {l: 'sac isotherme compartimenté', ic: 'colis', a: 288.8}];
  return (
    <Out end={297.25}>
      <HiLine words={['Le', 'bon', 'équipement']} mark={[1, 2]} at={271.7} y={320} size={60} />
      <Abs x={70} y={440} w={940} h={200} style={{display: 'flex', alignItems: 'center', gap: 24, background: '#fff', border: `4px dashed #B9B4AA`, borderRadius: 20, padding: '0 26px', boxSizing: 'border-box', opacity: pop(t, 273.0)}}>
        <F n="boite-outils" size={110} style={{filter: 'grayscale(0.6)'}} />
        <div style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: DIM}}>petite trousse de bureau<Strike p={prog(t, 275.4, 276.0)} c={RED} /></div>
      </Abs>
      <Brut x={70} y={680} w={940} h={560} at={276.9} sh={RED}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}><Mono at={277.0} c={RED} size={22}>kit spécialisé · arsenal de survie</Mono><Mono at={281.0} c={INK} size={18}>inventaire</Mono></div>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 24}}>
          {I.map((x, k) => (
            <div key={k} style={{display: 'flex', alignItems: 'center', gap: 14, background: '#FAF8F2', border: `3px solid ${INK}`, borderRadius: 14, padding: 14, opacity: pop(t, x.a), transform: `translateY(${(1 - pop(t, x.a)) * 30}px)`}}>
              <F n={x.ic} size={70} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: INK}}>{x.l}</div>
              <div style={{marginLeft: 'auto', width: 30, height: 30, borderRadius: 8, background: GREEN, color: '#fff', fontWeight: 900, textAlign: 'center', lineHeight: '30px', opacity: pop(t, x.a + 0.5)}}>✓</div>
            </div>
          ))}
        </div>
        <div style={{position: 'absolute', left: 30, bottom: 26, fontFamily: handFont, fontWeight: 700, fontSize: 38, color: TEAL, opacity: pop(t, 291.0)}}>le membre ne touche jamais le froid direct</div>
      </Brut>
    </Out>
  );
};

/* ═════════════ ÉTAPE 5 ═════════════ */
const Prevention: React.FC = () => {
  const t = useT();
  const P = [{l: 'Secouristes formés (SST)', ph: 'promo/formation-incendie.jpg', a: 306.5, c: GREEN}, {l: 'Consignes strictes machines', ph: 'promo/formation-consignation.jpg', a: 310.4, c: BLUE}, {l: 'Port des EPI', ph: 'epiepc/kit-epi2.jpg', a: 313.4, c: ORANGE}, {l: 'Trousses vérifiées', ph: '', a: 315.9, c: VIO}];
  return (
    <Out end={323.7}>
      <HiLine words={['Avant', 'l’accident']} mark={[0]} at={303.0} y={320} size={64} />
      {P.map((p, k) => (
        <Abs key={k} x={70 + (k % 2) * 480} y={440 + Math.floor(k / 2) * 360} w={460} h={330} style={{borderRadius: 20, overflow: 'hidden', border: `5px solid ${INK}`, boxShadow: `7px 7px 0 ${p.c}`, background: '#fff', opacity: pop(t, p.a), transform: `scale(${0.9 + 0.1 * Math.max(0, Math.min(1, spring(t, p.a, 8, 12)))})`}}>
          {p.ph ? <Img src={PH(p.ph)} style={{width: '100%', height: 240, objectFit: 'cover'}} /> : <div style={{height: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10}}><F n="clipboard" size={130} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 60, color: GREEN}}>✓</div></div>}
          <div style={{padding: '14px 16px', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: INK}}>{p.l}</div>
        </Abs>
      ))}
      <Stamp at={321.5} c={GREEN} text="souvent une obligation" x={220} y={1180} rot={-5} size={46} />
    </Out>
  );
};
const Resume: React.FC = () => {
  const t = useT();
  const net = prog(t, 334.5, 336.0, easeOut);
  return (
    <Out end={336.95}>
      <HiLine words={['Rien', 'à', 'la', 'chance']} mark={[3]} at={325.4} y={320} size={64} />
      <Abs x={0} y={440} w={1080} style={{display: 'flex', justifyContent: 'center', opacity: pop(t, 326.4)}}><div style={{position: 'relative'}}><F n="de" size={150} /><svg width={150} height={150} style={{position: 'absolute', inset: 0}}><line x1={10} y1={10} x2={140} y2={140} stroke={RED} strokeWidth={12} strokeDasharray={190} strokeDashoffset={190 * (1 - prog(t, 326.6, 327.1))} /></svg></div></Abs>
      <Abs x={70} y={640} w={940} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20}}>
        <Brut x={0} y={0} w={400} h={230} at={328.3} sh={BLUE} style={{position: 'relative', textAlign: 'center'}}><F n="cerveau" size={100} style={{margin: '0 auto'}} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK, marginTop: 8}}>connaissances répétées</div></Brut>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: INK, opacity: pop(t, 331.7)}}>+</div>
        <Brut x={0} y={0} w={400} h={230} at={331.7} sh={RED} style={{position: 'relative', textAlign: 'center'}}><F n="boite-outils" size={100} style={{margin: '0 auto'}} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK, marginTop: 8}}>bon équipement</div></Brut>
      </Abs>
      <Abs x={90} y={940} w={900} h={260} style={{opacity: net}}>
        <svg width={900} height={260}>
          <path d={`M20 40 Q 450 ${lerp(40, 230, net)} 880 40`} fill="none" stroke={INK} strokeWidth={6} />
          {Array.from({length: 12}, (_, k) => {const x = 20 + k * 78; const y = 40 + Math.sin((k / 11) * Math.PI) * lerp(0, 190, net); return <line key={k} x1={x} y1={40} x2={x} y2={y} stroke={INK} strokeWidth={3} />;})}
          {Array.from({length: 4}, (_, k) => <path key={k} d={`M20 ${70 + k * 40} Q 450 ${lerp(70, 210, net) + k * 10} 880 ${70 + k * 40}`} fill="none" stroke={INK} strokeWidth={2} opacity={0.6} />)}
        </svg>
        <div style={{position: 'absolute', left: 0, right: 0, top: 200, textAlign: 'center', fontFamily: handFont, fontWeight: 700, fontSize: 48, color: GREEN}}>l’ultime filet de sécurité</div>
      </Abs>
    </Out>
  );
};
const Final: React.FC = () => {
  const t = useT();
  const beat = Math.abs(Math.sin(t * 3.6));
  return (
    <Out end={OUTRO_AT}>
      <Center y={330}><Kin text="La question à se poser" at={337.0} size={58} /></Center>
      <Deep src="induction/mine-equipe.jpg" x={150} y={440} w={780} h={380} at={337.4} pos="40% 40%" />
      <Brut x={90} y={860} w={900} at={341.4} sh={RED}>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK, lineHeight: 1.2}}>Si l’accident survenait <span style={{backgroundImage: `linear-gradient(${YEL}, ${YEL})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 42%', backgroundPosition: '0 88%'}}>aujourd’hui</span>, votre lieu de travail serait-il prêt ?</div>
        <div style={{display: 'flex', gap: 20, marginTop: 20}}>
          {[{l: 'équipé ?', a: 344.7}, {l: 'formé ?', a: 345.4}].map((x, k) => <div key={k} style={{display: 'flex', alignItems: 'center', gap: 10, opacity: pop(t, x.a)}}><div style={{width: 40, height: 40, borderRadius: 10, border: `4px solid ${INK}`, background: Math.sin(t * 4 + k) > 0 ? YEL : '#fff'}} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK}}>{x.l}</div></div>)}
        </div>
      </Brut>
      <Abs x={0} y={1180} w={1080} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, opacity: pop(t, 347.4)}}>
        <div style={{transform: `scale(${1 + 0.12 * beat})`}}><F n="coeur" size={90} /></div>
        <div style={{fontFamily: handFont, fontWeight: 700, fontSize: 52, color: RED}}>sauver un membre… surtout une vie</div>
      </Abs>
      {t > 348.8 && <Dust n={20} c={GOLD} />}
    </Out>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const flaps = (a: number, n: number): Sfx[] => rep(a, n, 0.06, 'tick', 0.16);
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...SECT.flatMap((x) => [{at: x.at, s: 'sfx/whoosh', v: 0.4}, ...rep(x.at + 0.1, 4, 0.18, 'sfx/ding', 0.12), {at: x.at + 0.45, s: 'soft-whoosh', v: 0.45, dur: 1}, {at: x.at + 0.95, s: 'sfx/thud', v: 0.4}, {at: x.at + 1.6, s: 'sfx/pop', v: 0.22}, {at: x.at + 2.9, s: 'sfx/whoosh', v: 0.3}]),
  ...CHECKS.map((c) => ({at: c.at, s: 'validation', v: 0.22})),
  ...rep(2.7, 18, 0.5, 'tick', 0.1), {at: 7.2, s: 'sfx/swish', v: 0.3}, ...flaps(9.0, 12), {at: 12.6, s: 'tampon', v: 0.45}, {at: 16.1, s: 'deep-hit', v: 0.35}, {at: 21.7, s: 'sfx/pop', v: 0.2}, {at: 24.3, s: 'sfx/pop', v: 0.2}, {at: 27.1, s: 'sfx/thud', v: 0.3},
  ...[37.4, 39.5, 41.5, 42.8, 44.0].map((a) => ({at: a, s: 'sfx/thud', v: 0.3})),
  {at: 57.3, s: 'deep-hit', v: 0.45}, {at: 58.0, s: 'bass-hit', v: 0.45}, {at: 60.3, s: 'sfx/whoosh', v: 0.25}, {at: 63.6, s: 'sfx/whoosh', v: 0.25}, {at: 64.2, s: 'tension', v: 0.2, dur: 4}, {at: 75.2, s: 'sfx/ding', v: 0.22},
  ...[85.5, 86.9, 89.1, 91.2].map((a) => ({at: a, s: 'sfx/pop', v: 0.2})), {at: 93.5, s: 'sfx/thud', v: 0.35},
  {at: 105.4, s: 'sfx/thud', v: 0.3}, {at: 110.6, s: 'cadenas', v: 0.4}, {at: 114.2, s: 'sfx/thud', v: 0.3}, ...[115.4, 115.6, 116.3, 116.5, 116.7].map((a) => ({at: a, s: 'sfx/click', v: 0.3})),
  {at: 124.5, s: 'soft-whoosh', v: 0.3}, ...rep(127.9, 10, 0.6, 'sfx/thud', 0.12), {at: 134.2, s: 'sfx/swish', v: 0.35}, {at: 138.7, s: 'stylo', v: 0.3}, {at: 141.9, s: 'sfx/swish', v: 0.3}, {at: 143.6, s: 'sfx/thud', v: 0.3}, {at: 145.3, s: 'stylo', v: 0.4},
  {at: 156.7, s: 'soft-whoosh', v: 0.3}, {at: 159.0, s: 'sfx/ding', v: 0.18}, {at: 159.7, s: 'sfx/ding', v: 0.18}, {at: 162.7, s: 'page', v: 0.45}, {at: 166.9, s: 'sfx/pop', v: 0.2},
  {at: 180.3, s: 'sfx/thud', v: 0.3}, {at: 182.0, s: 'sfx/thud', v: 0.3}, {at: 184.2, s: 'sfx/swish', v: 0.35}, {at: 184.3, s: 'tampon', v: 0.5}, {at: 185.9, s: 'tension', v: 0.2, dur: 4}, {at: 191.0, s: 'tampon', v: 0.45},
  {at: 194.2, s: 'soft-whoosh', v: 0.35}, {at: 200.5, s: 'sfx/pop', v: 0.22}, {at: 202.7, s: 'sfx/pop', v: 0.22}, {at: 207.0, s: 'bass-hit', v: 0.4}, ...rep(207.5, 9, 1.0, 'tick', 0.12), {at: 216.9, s: 'deep-hit', v: 0.3}, {at: 220.3, s: 'validation', v: 0.3},
  {at: 234.5, s: 'soft-whoosh', v: 0.3}, ...[252.6, 256.8, 263.1].map((a) => ({at: a, s: 'sfx/pop', v: 0.22})), {at: 269.9, s: 'sfx/whoosh', v: 0.35},
  {at: 273.0, s: 'sfx/pop', v: 0.2}, {at: 275.4, s: 'sfx/swish', v: 0.3}, {at: 276.9, s: 'sfx/thud', v: 0.3}, ...[283.3, 285.0, 286.2, 288.8].map((a) => ({at: a, s: 'sfx/pop', v: 0.2})),
  ...[306.5, 310.4, 313.4, 315.9].map((a) => ({at: a, s: 'sfx/thud', v: 0.3})), {at: 321.5, s: 'tampon', v: 0.45},
  {at: 326.6, s: 'sfx/swish', v: 0.3}, {at: 328.3, s: 'sfx/thud', v: 0.3}, {at: 331.7, s: 'sfx/thud', v: 0.3}, {at: 334.5, s: 'sfx/rise', v: 0.3},
  {at: 337.4, s: 'soft-whoosh', v: 0.3}, {at: 341.4, s: 'sfx/thud', v: 0.3}, {at: 347.4, s: 'deep-hit', v: 0.3}, {at: 348.8, s: 'validation', v: 0.35},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const Amputation: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.6} to={31.5}><Intro /></Gate>
    <Gate from={31.4} to={45.9}><Plan /></Gate>
    <Gate from={49.0} to={76.7}><Double /></Gate>
    <Gate from={76.6} to={96.45}><Lieux /></Gate>
    <Gate from={99.6} to={123.1}><Gestes /></Gate>
    <Gate from={123.0} to={149.9}><Hemorragie /></Gate>
    <Gate from={149.8} to={171.15}><Choc /></Gate>
    <Gate from={174.3} to={193.15}><Interdit /></Gate>
    <Gate from={193.05} to={225.4}><Methode /></Gate>
    <Gate from={228.5} to={271.65}><Appel /></Gate>
    <Gate from={271.55} to={297.3}><Kit /></Gate>
    <Gate from={300.4} to={323.75}><Prevention /></Gate>
    <Gate from={323.65} to={337.0}><Resume /></Gate>
    <Gate from={336.9} to={OUTRO_AT}><Final /></Gate>
    {SECT.map((x, i) => <Gate key={x.n} from={x.at} to={x.at + 3.35}><Gyro i={i} /></Gate>)}
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={353.0}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-amputation-origine.m4a')} trimAfter={s(353.2)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Blinds, Board, BURG, easeInOut];
