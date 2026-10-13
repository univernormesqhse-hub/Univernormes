import React from 'react';
import {AbsoluteFill, random} from 'remotion';
import {F} from '../iso/ui';
import {handFont, sansFont} from '../theme';
import {Abs, BLUE, Chip, DIM, easeIn, easeInOut, easeOut, GREEN, Hand, INK, lerp, Mark, PAPER, Photo, pop, prog, PT, RED, Row, Sc, spring, T, Title, useT, VIO, YEL} from './kit';

/* ─────────── INTRO ─────────── */

/** Le texte officiel « aride » : les lignes de la norme s'envolent comme du sable, des dunes montent. */
const Arid: React.FC = () => {
  const t = useT();
  const wind = prog(t, 4.1, 6.4, easeIn);
  return (
    <AbsoluteFill>
      <Title y={330}>Le texte officiel de la norme…</Title>
      <Abs x={170} y={450} w={740} h={880} style={{background: '#fff', borderRadius: 18, boxShadow: '0 30px 60px rgba(20,33,61,0.2)', transform: `rotate(${-2 + wind * 3}deg)`, overflow: 'visible'}}>
        <Abs x={50} y={40}><T size={40}>ISO 9001:2015</T><div style={{fontFamily: sansFont, fontSize: 24, color: DIM, marginTop: 6}}>Systèmes de management de la qualité — Exigences</div></Abs>
        {Array.from({length: 15}, (_, r) => (
          <Abs key={r} x={50} y={170 + r * 44} w={640} h={20} style={{display: 'flex', gap: 10}}>
            {Array.from({length: 7}, (_, k) => {
              const d = random(`a${r}-${k}`);
              const p = Math.max(0, wind * 1.6 - d * 0.6 - (r / 15) * 0.3);
              const w = 40 + random(`w${r}-${k}`) * 70;
              return <div key={k} style={{width: w, height: 18, borderRadius: 9, background: r % 5 === 0 ? '#9AA3B2' : '#C9CED8', transform: `translate(${p * 900}px, ${-p * 140 + Math.sin(p * 6 + d * 9) * 30}px) rotate(${p * 160 * (d - 0.5)}deg)`, opacity: 1 - Math.min(1, p * 0.9)}} />;
            })}
          </Abs>
        ))}
      </Abs>
      <svg width={1080} height={420} style={{position: 'absolute', left: 0, top: 1180}}>
        <path d={`M0 420 L0 ${300 - wind * 160} Q 270 ${170 - wind * 140} 540 ${300 - wind * 120} T 1080 ${260 - wind * 150} L1080 420 Z`} fill="#E9C46A" opacity={0.9} />
        <path d={`M0 420 L0 ${360 - wind * 100} Q 360 ${280 - wind * 110} 720 ${360 - wind * 80} T 1080 ${340 - wind * 90} L1080 420 Z`} fill="#D4A548" />
      </svg>
      {t > 4.0 && <Row y={1240}><div style={{transform: `scale(${spring(t, 4.0)}) rotate(-6deg)`}}><Chip c="#D4A548" size={64}>ARIDE</Chip></div></Row>}
    </AbsoluteFill>
  );
};

/** Plongée : un iris s'ouvre au centre de l'écran sur une vraie photo d'atelier. */
const Dive: React.FC = () => {
  const t = useT();
  const iris = prog(t, 6.6, 7.8, easeInOut);
  return (
    <AbsoluteFill>
      <Abs x={60} y={340} w={960} h={1150} style={{borderRadius: 34, overflow: 'hidden', clipPath: `circle(${iris * 75}% at 50% 50%)`, boxShadow: '0 30px 60px rgba(0,0,0,0.3)'}}>
        <Photo src="induction/briefing-atelier.jpg" x={-8} y={-8} w={976} h={1166} pos="50% 50%" q={1.25 - iris * 0.2} />
      </Abs>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <circle cx={540} cy={915} r={iris * 720} fill="none" stroke={YEL} strokeWidth={14} opacity={1 - iris} />
      </svg>
      {t > 8.8 && <Row y={1190}><div style={{transform: `scale(${spring(t, 8.8)})`}}><Chip c={YEL} size={56}>🌍 LE MONDE RÉEL</Chip></div></Row>}
      {t > 9.7 && <Row y={1310}><div style={{background: '#fff', borderRadius: 20, padding: '6px 24px', opacity: pop(t, 9.7)}}><Hand size={58}>le vrai de vrai</Hand></div></Row>}
    </AbsoluteFill>
  );
};

/** Deux médaillons reliés : diagnostic + stratégie de déploiement. */
const Duo: React.FC = () => {
  const t = useT();
  const link = prog(t, 13.3, 14.4);
  const M = ({x, at, ic, l, c}: {x: number; at: number; ic: string; l: string; c: string}) => (
    <Abs x={x} y={560} w={420} style={{textAlign: 'center', transform: `scale(${spring(t, at)})`}}>
      <div style={{width: 300, height: 300, margin: '0 auto', borderRadius: 150, background: '#fff', border: `10px solid ${c}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 26px 50px ${c}44`}}><F n={ic} size={170} float={5} /></div>
      <T size={46} style={{marginTop: 26}}>{l}</T>
    </Abs>
  );
  return (
    <AbsoluteFill>
      <Title>Une analyse concrète</Title>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <line x1={380} y1={710} x2={380 + 320 * link} y2={710} stroke={INK} strokeWidth={8} strokeDasharray="22 16" strokeDashoffset={-t * 60} />
      </svg>
      <M x={60} at={12.2} ic="stethoscope" l="Diagnostic" c={GREEN} />
      {t > 13.4 && <M x={600} at={13.4} ic="fusee" l="Stratégie de déploiement" c={BLUE} />}
    </AbsoluteFill>
  );
};

/** La citation (affichée par la vidéo d'origine), tapée à la machine. */
const QUOTE = 'La norme telle qu’elle se vit dans les organisations réelles — avec leurs résistances, leurs raccourcis…';
const Quote: React.FC = () => {
  const t = useT();
  const n = Math.floor(prog(t, 15.2, 17.2, (x) => x) * QUOTE.length);
  return (
    <AbsoluteFill>
      <Abs x={90} y={520} w={900} style={{background: '#fff', borderRadius: 34, padding: '70px 60px 60px', boxSizing: 'border-box', border: `5px solid ${INK}`, boxShadow: `18px 18px 0 ${YEL}`}}>
        <div style={{position: 'absolute', left: 40, top: -70, fontFamily: 'Georgia, serif', fontSize: 220, color: YEL, lineHeight: 1}}>“</div>
        <T size={54} style={{fontWeight: 700, lineHeight: 1.3}}>
          {QUOTE.slice(0, n)}<span style={{opacity: Math.floor(t * 3) % 2 ? 1 : 0}}>|</span>
        </T>
      </Abs>
      <Row y={1170}><div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 26, color: DIM}}>Citation affichée par la vidéo d’origine</div></Row>
    </AbsoluteFill>
  );
};

/** Tableau noir « théorie » effacé à l'éponge, la photo du terrain prend sa place. */
const Theory: React.FC = () => {
  const t = useT();
  const wipe = prog(t, 18.7, 19.9, easeInOut);
  const terr = spring(t, 20.4);
  return (
    <AbsoluteFill>
      <Abs x={70} y={380} w={940} h={560} style={{background: '#22352B', borderRadius: 20, border: '18px solid #8A5A2B', boxSizing: 'border-box', overflow: 'hidden'}}>
        <div style={{position: 'absolute', inset: 0, padding: 40, fontFamily: handFont, color: '#EDEDE0', fontSize: 52, lineHeight: 1.35, clipPath: `inset(0 0 0 ${wipe * 100}%)`}}>
          <div>THÉORIE</div><div>Σ exigences ÷ procédures = ?</div><div>§ 4.1 → § 10.3 …</div>
        </div>
        <div style={{position: 'absolute', top: 120, left: `${wipe * 100 - 10}%`, width: 150, height: 90, borderRadius: 16, background: '#F2C230', border: `5px solid ${INK}`, opacity: wipe > 0 && wipe < 1 ? 1 : 0}} />
      </Abs>
      <Photo src="induction/mine-equipe.jpg" x={150} y={1000} w={780} h={480} q={terr} r={-2} pos="50% 35%">
        <div style={{position: 'absolute', left: 24, bottom: 24}}><Chip c={GREEN} light size={40}>LA RÉALITÉ DU TERRAIN</Chip></div>
      </Photo>
    </AbsoluteFill>
  );
};

/** Moniteur cardiaque : la norme « prend vie »… ou fait un arrêt. */
const Pulse: React.FC = () => {
  const t = useT();
  const fail = t > 24.4;
  const pts: string[] = [];
  for (let i = 0; i <= 160; i++) {
    const x = i * 5.5;
    const tt = t * 2.2 - i * 0.03;
    const ph = ((tt % 1) + 1) % 1;
    const beat = ph < 0.08 ? -Math.sin((ph / 0.08) * Math.PI) * 150 : ph < 0.14 ? Math.sin(((ph - 0.08) / 0.06) * Math.PI) * 60 : 0;
    const age = t - 24.4 - (160 - i) * 0.006;
    pts.push(`${x},${170 + (fail && age > 0 ? 0 : beat)}`);
  }
  const c = fail ? RED : '#39E58C';
  return (
    <AbsoluteFill>
      <Abs x={100} y={420} w={880} h={420} style={{background: '#0E1726', borderRadius: 30, border: '10px solid #2A3550', overflow: 'hidden'}}>
        <div style={{position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(57,229,140,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(57,229,140,0.08) 1px, transparent 1px)', backgroundSize: '40px 40px'}} />
        <svg width={880} height={340} style={{position: 'absolute', top: 30}}><polyline points={pts.join(' ')} fill="none" stroke={c} strokeWidth={7} strokeLinejoin="round" style={{filter: `drop-shadow(0 0 10px ${c})`}} /></svg>
        <div style={{position: 'absolute', right: 30, top: 20, fontFamily: 'monospace', fontSize: 40, color: c, fontWeight: 700}}>{fail ? '— —' : '♥ 72'}</div>
      </Abs>
      <Row y={900}>
        <div style={{opacity: pop(t, 22.6), transform: `scale(${fail ? 0.85 : 1})`}}><Chip c={GREEN} light size={44}>Prendre vie</Chip></div>
        {t > 24.3 && <div style={{transform: `scale(${spring(t, 24.3)})`}}><Chip c={RED} light size={44}>…ou échouer</Chip></div>}
      </Row>
      <Row y={1080} gap={30}>
        {t > 26.0 && <div style={{transform: `scale(${spring(t, 26.0)})`, display: 'flex', alignItems: 'center', gap: 14, background: '#fff', padding: '14px 28px', borderRadius: 24, boxShadow: '0 12px 30px rgba(0,0,0,0.12)'}}><F n="repeter" size={80} /><T size={42}>Ses habitudes</T></div>}
        {t > 27.0 && <div style={{transform: `scale(${spring(t, 27.0)})`, display: 'flex', alignItems: 'center', gap: 14, background: '#fff', padding: '14px 28px', borderRadius: 24, boxShadow: '0 12px 30px rgba(0,0,0,0.12)'}}><F n="montagne" size={80} /><T size={42}>Ses défis</T></div>}
      </Row>
    </AbsoluteFill>
  );
};

/** Le programme en plan de métro : une rame descend de station en station. */
const STA = [
  {at: 30.4, l: 'Implémenter vraiment', ic: 'chantier'},
  {at: 34.5, l: 'La question qui change tout', ic: 'question'},
  {at: 37.8, l: 'Un diagnostic sans se voiler la face', ic: 'loupe'},
  {at: 40.5, l: 'Un plan qui tient la route', ic: 'carte'},
  {at: 45.3, l: 'Contrainte ou opportunité ?', ic: 'balance'},
];
const Metro: React.FC = () => {
  const t = useT();
  const y0 = 470, dy = 230;
  const pos = STA.slice(1).reduce((acc, s) => acc + prog(t, s.at - 0.7, s.at, easeInOut), 0);
  const ty = y0 + pos * dy;
  return (
    <AbsoluteFill>
      <Title y={330}>Le <Mark p={prog(t, 28.6, 29.4)}>programme</Mark></Title>
      <div style={{position: 'absolute', left: 168, top: y0, width: 24, height: dy * 4, borderRadius: 12, background: `linear-gradient(180deg, ${PT.map((p) => p.c).join(',')})`, transformOrigin: '50% 0', transform: `scaleY(${prog(t, 28.5, 30.0)})`}} />
      {STA.map((s, i) => {
        const on = t > s.at - 0.2;
        return (
          <React.Fragment key={i}>
            <div style={{position: 'absolute', left: 140, top: y0 + i * dy - 30, width: 80, height: 80, borderRadius: 40, background: '#fff', border: `10px solid ${PT[i].c}`, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: INK, opacity: prog(t, 28.6 + i * 0.25, 29.0 + i * 0.25)}}>{i + 1}</div>
            <Abs x={260} y={y0 + i * dy - 62} w={760} h={145} style={{display: 'flex', alignItems: 'center', gap: 22, background: on ? '#fff' : '#ffffff66', borderRadius: 26, padding: '0 28px', boxSizing: 'border-box', boxShadow: on ? `0 16px 34px ${PT[i].c}44` : 'none', border: `4px solid ${on ? PT[i].c : 'transparent'}`, transform: `translateX(${(1 - pop(t, s.at - 0.2, 0.5)) * 80}px)`, opacity: 0.25 + 0.75 * pop(t, s.at - 0.2, 0.5)}}>
              <F n={s.ic} size={90} />
              <T size={i === 2 ? 38 : 42}>{s.l}</T>
            </Abs>
          </React.Fragment>
        );
      })}
      <div style={{position: 'absolute', left: 150, top: ty - 70, width: 60, height: 110, borderRadius: 22, background: INK, border: '5px solid #fff', boxShadow: '0 10px 24px rgba(0,0,0,0.35)', opacity: prog(t, 29.4, 29.9)}}>
        <div style={{margin: '14px 10px', height: 30, borderRadius: 8, background: YEL}} />
        <div style={{margin: '0 18px', height: 12, borderRadius: 6, background: '#fff'}} />
      </div>
      {t > 46.2 && <Row y={1550}><Hand size={48} color={VIO} style={{opacity: pop(t, 46.2)}}>Terminus : à vous de choisir</Hand></Row>}
    </AbsoluteFill>
  );
};

export const Intro: React.FC = () => (
  <AbsoluteFill>
    <Sc a={2.4} b={6.7}><Arid /></Sc>
    <Sc a={6.5} b={10.9}><Dive /></Sc>
    <Sc a={10.8} b={15.1}><Duo /></Sc>
    <Sc a={15.0} b={18.0}><Quote /></Sc>
    <Sc a={17.9} b={21.7}><Theory /></Sc>
    <Sc a={21.6} b={28.4}><Pulse /></Sc>
    <Sc a={28.3} b={47.8}><Metro /></Sc>
  </AbsoluteFill>
);

/* ─────────── PARTIE 1 : l'implémentation vraie ─────────── */

/** Le manuel se referme et file dans un tiroir. */
const Manual: React.FC = () => {
  const t = useT();
  const close = prog(t, 51.6, 52.4, easeInOut);
  const slide = prog(t, 52.6, 53.3, easeIn);
  const shut = prog(t, 53.2, 53.6);
  return (
    <AbsoluteFill>
      <Title>Oublier le <Mark p={prog(t, 51.8, 52.5)}>manuel</Mark>…</Title>
      <Abs x={140} y={1030} w={800} h={380} style={{background: '#B9824A', borderRadius: 20, boxShadow: '0 30px 50px rgba(0,0,0,0.3)'}}>
        <Abs x={40} y={40} w={720} h={300} style={{background: '#9A6A3A', borderRadius: 14, transform: `translateY(${-(1 - shut) * 220}px)`, boxShadow: 'inset 0 10px 20px rgba(0,0,0,0.3)'}}>
          <div style={{position: 'absolute', left: 300, top: 120, width: 120, height: 40, borderRadius: 20, background: '#E0C090'}} />
        </Abs>
      </Abs>
      <Abs x={290} y={480} w={500} h={640} style={{perspective: 2000, transform: `translateY(${slide * 640}px) scale(${1 - slide * 0.25})`, opacity: 1 - shut}}>
        <div style={{position: 'absolute', inset: 0, background: '#14306B', borderRadius: 18, boxShadow: '0 20px 40px rgba(0,0,0,0.35)'}} />
        <div style={{position: 'absolute', left: 20, top: 20, right: 20, bottom: 20, background: '#fff', borderRadius: 8, padding: 30, boxSizing: 'border-box', fontFamily: sansFont, fontSize: 22, color: DIM, lineHeight: 1.6}}>§ 4.4 Système de management de la qualité et ses processus… § 5.1 Leadership et engagement… § 6.1 Actions à mettre en œuvre face aux risques…</div>
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #1E4FA8, #14306B)', borderRadius: 18, transformOrigin: '0% 50%', transform: `rotateY(${-160 + close * 160}deg)`, backfaceVisibility: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16}}>
          <T size={44} color="#fff">MANUEL</T><T size={64} color={YEL}>ISO 9001</T>
        </div>
      </Abs>
      {t > 53.6 && <Abs x={640} y={980} style={{transform: `rotate(8deg) scale(${spring(t, 53.6)})`, background: '#FFE27A', padding: '16px 26px', boxShadow: '0 10px 20px rgba(0,0,0,0.2)'}}><Hand size={50}>Rangé !</Hand></Abs>}
    </AbsoluteFill>
  );
};

/** « En vrai » : une photo de terrain se retourne comme une carte. */
const EnVrai: React.FC = () => {
  const t = useT();
  const flip = prog(t, 55.0, 55.8, easeInOut);
  return (
    <AbsoluteFill>
      <Title>Comment ça se passe <Mark c={GREEN} p={prog(t, 55.9, 56.4)}>en vrai</Mark></Title>
      <Abs x={110} y={470} w={860} h={980} style={{perspective: 2400}}>
        <div style={{position: 'absolute', inset: 0, transform: `rotateY(${(1 - flip) * 180}deg)`, transformStyle: 'preserve-3d'}}>
          <div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden'}}>
            <Photo src="promo/hse-machine.jpg" x={0} y={0} w={860} h={980} pos="45% 40%" />
          </div>
          <div style={{position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: BLUE, borderRadius: 28, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={70} color="#fff">SUR LE PAPIER</T></div>
        </div>
      </Abs>
    </AbsoluteFill>
  );
};

/** La machine de l'organisation : un engrenage « principes ISO » s'engrène… ou coince. */
const Gear: React.FC<{x: number; y: number; r: number; teeth: number; a: number; c: string; label?: string; ic?: string}> = ({x, y, r, teeth, a, c, label, ic}) => {
  const pts: string[] = [];
  for (let i = 0; i < teeth * 2; i++) {
    const rr = i % 2 ? r * 0.84 : r;
    const a0 = (i / (teeth * 2)) * Math.PI * 2;
    const a1 = ((i + 1) / (teeth * 2)) * Math.PI * 2;
    pts.push(`${Math.cos(a0) * rr},${Math.sin(a0) * rr}`, `${Math.cos(a1 - 0.04) * rr},${Math.sin(a1 - 0.04) * rr}`);
  }
  return (
    <div style={{position: 'absolute', left: x - r, top: y - r, width: r * 2, height: r * 2}}>
      <svg width={r * 2} height={r * 2} style={{position: 'absolute', inset: 0, transform: `rotate(${a}deg)`}}>
        <g transform={`translate(${r},${r})`}><polygon points={pts.join(' ')} fill={c} stroke={INK} strokeWidth={5} /><circle r={r * 0.55} fill="#fff" stroke={INK} strokeWidth={5} /></g>
      </svg>
      <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        {ic && <F n={ic} size={r * 0.5} />}
        {label && <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: Math.max(22, r * 0.18), color: INK, textAlign: 'center', maxWidth: r, lineHeight: 1.05}}>{label}</div>}
      </div>
    </div>
  );
};
const Machine: React.FC = () => {
  const t = useT();
  const w = t * 40;
  const inA = spring(t, 57.6, 6, 10);
  const jam = t > 58.6;
  const shake = jam ? Math.sin(t * 70) * 6 * (1 - prog(t, 59.6, 60.4)) : 0;
  return (
    <AbsoluteFill>
      <Title>La machine de l'organisation</Title>
      <Gear x={430} y={820} r={210} teeth={14} a={w} c="#C9D3E6" label="Quotidien" ic="usine" />
      <Gear x={740} y={1130} r={170} teeth={12} a={-w * (210 / 170) + 10} c="#C9D3E6" label="Organisation" ic="equipe" />
      <div style={{opacity: inA}}><Gear x={lerp(1300, 760, inA)} y={600} r={130} teeth={9} a={-w * (210 / 130) + 6} c={YEL} label="Principe ISO" /></div>
      {t > 58.4 && (
        <div style={{transform: `translateX(${shake}px)`}}>
          <Gear x={lerp(-300, 250, spring(t, 58.4, 6, 10))} y={1220} r={130} teeth={7} a={jam ? 8 : 0} c={RED} label="Principe ISO" />
          {jam && <Abs x={330} y={1100} style={{opacity: 1 - prog(t, 60.0, 60.6)}}><F n="etincelles" size={140} /></Abs>}
        </div>
      )}
      <Abs x={680} y={760} style={{opacity: pop(t, 58.0)}}><Chip c={GREEN} light size={34}>✓ s'intègre</Chip></Abs>
      {jam && <Abs x={80} y={1420} style={{transform: `scale(${spring(t, 58.6)})`}}><Chip c={RED} light size={34}>✗ …ou pas !</Chip></Abs>}
    </AbsoluteFill>
  );
};

export const P1: React.FC = () => (
  <AbsoluteFill>
    <Sc a={50.2} b={54.7}><Manual /></Sc>
    <Sc a={54.6} b={56.7}><EnVrai /></Sc>
    <Sc a={56.6} b={62.6}><Machine /></Sc>
  </AbsoluteFill>
);
