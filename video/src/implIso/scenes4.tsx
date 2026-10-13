import React from 'react';
import {AbsoluteFill} from 'remotion';
import {F} from '../iso/ui';
import {sansFont} from '../theme';
import {Abs, Chip, DIM, easeInOut, easeOut, GREEN, Hand, INK, lerp, Mark, pop, prog, RED, Row, Sc, spring, T, Title, Tower, useT} from './kit';

/* ─────────── PARTIE 5 : contrainte ou opportunité ? ─────────── */

/** Le carrefour : un panneau à deux flèches qui pivotent, l'état d'esprit au pied du poteau. */
const Fork: React.FC = () => {
  const t = useT();
  const a1 = spring(t, 263.5, 5, 9), a2 = spring(t, 265.0, 5, 9);
  return (
    <AbsoluteFill>
      <Title y={330}>Une question d'<Mark p={prog(t, 263.5, 264.2)}>état d'esprit</Mark></Title>
      <svg width={1080} height={1200} style={{position: 'absolute', left: 0, top: 500}}>
        <path d="M 540 1100 L 540 760 Q 540 640 300 520 L 60 400" stroke="#C9CED8" strokeWidth={90} fill="none" />
        <path d="M 540 760 Q 540 640 780 520 L 1020 400" stroke="#C9CED8" strokeWidth={90} fill="none" />
        <path d="M 540 1100 L 540 760" stroke="#fff" strokeWidth={8} strokeDasharray="30 30" />
      </svg>
      <Abs x={525} y={560} w={30} h={720} style={{background: '#7A5A3A', borderRadius: 8}} />
      <Abs x={540} y={620} w={430} h={130} style={{transformOrigin: '0 50%', transform: `rotate(${(1 - a1) * 80 - 8}deg)`, background: RED, clipPath: 'polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%)', display: 'flex', alignItems: 'center', paddingLeft: 30, boxSizing: 'border-box', opacity: a1 > 0.01 ? 1 : 0}}><T size={44} color="#fff">CONTRAINTE</T></Abs>
      <Abs x={110} y={790} w={430} h={130} style={{transformOrigin: '100% 50%', transform: `rotate(${-(1 - a2) * 80 + 8}deg)`, background: GREEN, clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 15% 100%, 0 50%)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 30, boxSizing: 'border-box', opacity: a2 > 0.01 ? 1 : 0}}><T size={44} color="#fff">OPPORTUNITÉ</T></Abs>
      {t > 265.0 && <Row y={1360}><div style={{transform: `scale(${spring(t, 265.0)})`, display: 'flex', alignItems: 'center', gap: 14, background: '#fff', padding: '10px 26px', borderRadius: 24, boxShadow: '0 10px 24px rgba(0,0,0,0.12)'}}><F n="cerveau" size={70} /><T size={40}>un choix stratégique, dès le départ</T></div></Row>}
    </AbsoluteFill>
  );
};

/** Deux panneaux : la plaque au mur qui s'étiole (contrainte) / le moteur qui transforme (opportunité). */
const Two: React.FC = () => {
  const t = useT();
  const fade = prog(t, 277.1, 278.8, easeInOut);
  const hang = spring(t, 274.6, 6, 12);
  const opp = prog(t, 279.7, 280.3);
  const rpm = 1 + prog(t, 287.8, 289.0) * 3;
  const gear = (t - 279.7) * 90 * rpm;
  return (
    <AbsoluteFill>
      <Abs x={50} y={330} w={980} h={590} style={{borderRadius: 30, background: '#FDECEC', border: `5px solid ${RED}`, overflow: 'hidden', opacity: 1 - opp * 0.45, transform: `scale(${1 - opp * 0.04})`}}>
        <Abs x={30} y={24}><Chip c={RED} light size={34}>CONTRAINTE</Chip></Abs>
        <Abs x={40} y={130} w={400}>
          <T size={34}>Le minimum syndical</T>
          <div style={{marginTop: 20, width: 360, height: 34, borderRadius: 17, background: '#fff', border: `3px solid ${INK}`, overflow: 'hidden'}}><div style={{width: `${8 + prog(t, 273.3, 274.0) * 6}%`, height: '100%', background: RED}} /></div>
          <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 24, color: DIM, marginTop: 8}}>effort : MIN</div>
          {t > 277.0 && <T size={34} color={RED} style={{marginTop: 30, opacity: pop(t, 277.0)}}>…s'étiole dès l'audit passé</T>}
        </Abs>
        <Abs x={560} y={110} w={360} h={440} style={{transformOrigin: '50% 0', transform: `translateY(${(1 - hang) * -500}px) rotate(${Math.sin(t * 2) * 1.5 + fade * 9}deg)`, filter: `grayscale(${fade}) brightness(${1 - fade * 0.15})`}}>
          <svg width={360} height={60} style={{position: 'absolute', top: -50}}><path d="M 60 60 L 180 0 L 300 60" stroke={INK} strokeWidth={4} fill="none" /></svg>
          <div style={{position: 'absolute', inset: 0, background: '#C8A15A', borderRadius: 12, padding: 18, boxSizing: 'border-box'}}>
            <div style={{width: '100%', height: '100%', background: '#FFFDF4', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, textAlign: 'center'}}>
              <F n="diplome" size={110} /><T size={46}>ISO 9001</T><T size={26} color={DIM}>CERTIFIÉ</T>
            </div>
          </div>
          {fade > 0 && <svg width={360} height={440} style={{position: 'absolute', inset: 0, opacity: fade}}><path d="M 0 0 Q 90 70 60 160 M 0 0 Q 120 30 170 110 M 0 0 L 110 80 M 30 30 Q 70 20 90 50 M 20 70 Q 60 60 80 90" stroke="#888" strokeWidth={2} fill="none" /><path d="M 360 300 L 250 360 L 300 440" stroke="#555" strokeWidth={4} fill="none" /></svg>}
        </Abs>
      </Abs>
      {opp > 0 && (
        <Abs x={50} y={960} w={980} h={600} style={{borderRadius: 30, background: '#E6F6EF', border: `5px solid ${GREEN}`, overflow: 'hidden', opacity: opp, transform: `translateY(${(1 - opp) * 80}px)`}}>
          <Abs x={30} y={24}><Chip c={GREEN} light size={34}>OPPORTUNITÉ</Chip></Abs>
          <Abs x={40} y={130} w={460} style={{display: 'flex', flexDirection: 'column', gap: 18}}>
            {[{at: 282.3, ic: 'eprouvette', l: 'Catalyseur de changement'}, {at: 284.0, ic: 'coeur', l: 'Par conviction'}, {at: 289.3, ic: 'repeter', l: 'Durablement'}].map((x) => (
              <div key={x.l} style={{display: 'flex', alignItems: 'center', gap: 14, opacity: pop(t, x.at), transform: `translateX(${(1 - pop(t, x.at)) * -50}px)`}}><F n={x.ic} size={70} /><T size={36}>{x.l}</T></div>
            ))}
          </Abs>
          <Abs x={560} y={90} w={380} h={460}>
            {[{x: 150, y: 140, r: 110, d: 1}, {x: 290, y: 300, r: 80, d: -1.375}, {x: 110, y: 340, r: 60, d: -1.83}].map((g, i) => (
              <svg key={i} width={g.r * 2} height={g.r * 2} style={{position: 'absolute', left: g.x - g.r, top: g.y - g.r, transform: `rotate(${gear * g.d}deg)`}}>
                <g transform={`translate(${g.r},${g.r})`}>{Array.from({length: 10}, (_, k) => <rect key={k} x={-g.r * 0.14} y={-g.r} width={g.r * 0.28} height={g.r * 0.4} rx={4} fill={GREEN} transform={`rotate(${k * 36})`} />)}<circle r={g.r * 0.72} fill={GREEN} /><circle r={g.r * 0.28} fill="#E6F6EF" /></g>
              </svg>
            ))}
            {t > 287.8 && <div style={{position: 'absolute', left: 120, top: -10, transform: `scale(${spring(t, 287.8)})`}}><Chip c={INK} light size={30}>MOTEUR</Chip></div>}
          </Abs>
        </Abs>
      )}
    </AbsoluteFill>
  );
};

/** Pile ou face en 3D : la pièce tourne… et retombe sur la tranche — la norme est neutre. */
const Coin: React.FC = () => {
  const t = useT();
  const toss = prog(t, 292.6, 297.3, (x) => x);
  const h = Math.sin(toss * Math.PI) * 520;
  const spin = toss * 360 * 5 + prog(t, 296.6, 297.3, easeOut) * 90;
  const land = t > 297.3;
  const wob = land ? Math.sin((t - 297.3) * 14) * 6 * Math.exp(-(t - 297.3) * 2.2) : 0;
  const ang = land ? 90 + wob : spin;
  const R = 230;
  return (
    <AbsoluteFill>
      <Title y={330}><span style={{color: RED}}>Contrainte</span> ou <span style={{color: GREEN}}>opportunité</span> ?</Title>
      <div style={{position: 'absolute', left: 540 - 300, top: 1340, width: 600, height: 60, borderRadius: '50%', background: 'rgba(20,33,61,0.15)', transform: `scale(${1 - h / 1000})`}} />
      <div style={{position: 'absolute', left: 540 - R, top: 1080 - R - h, width: R * 2, height: R * 2, perspective: 1800}}>
        <div style={{position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d', transform: `rotateX(${ang}deg)`}}>
          <div style={{position: 'absolute', inset: 0, borderRadius: '50%', background: `radial-gradient(circle at 35% 35%, #FF8A8E, ${RED})`, border: '14px solid #B8323A', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', backfaceVisibility: 'hidden', transform: 'translateZ(30px)'}}><T size={46} color="#fff">CONTRAINTE</T></div>
          <div style={{position: 'absolute', inset: 0, borderRadius: '50%', background: `radial-gradient(circle at 35% 35%, #6FE0B5, ${GREEN})`, border: '14px solid #168060', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', backfaceVisibility: 'hidden', transform: 'rotateX(180deg) translateZ(30px)'}}><T size={44} color="#fff">OPPORTUNITÉ</T></div>
          <div style={{position: 'absolute', left: 0, top: R - 30, width: R * 2, height: 60, background: `linear-gradient(90deg, #8A8F99, #D9DCE2, #8A8F99)`, transform: 'rotateX(-90deg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: INK, letterSpacing: 12}}>NEUTRE</div>
        </div>
      </div>
      {land && <Row y={1430}><div style={{transform: `scale(${spring(t, 297.4)})`}}><Chip c={INK} light size={48}>La norme est neutre</Chip></div></Row>}
      {t > 298.2 && <Abs x={760} y={820} style={{transform: `rotate(-20deg) scale(${spring(t, 298.2)})`}}><F n="cle" size={150} /><Hand size={44} style={{textAlign: 'center'}}>un outil</Hand></Abs>}
      {t > 299.3 && <Abs x={70} y={820} style={{transform: `scale(${spring(t, 299.3)})`, textAlign: 'center'}}><F n="usine" size={150} /><Hand size={44}>l'organisation décide</Hand></Abs>}
    </AbsoluteFill>
  );
};

/** Case à cocher contre aventure d'amélioration ; l'immeuble s'achève, drapeau planté. */
const Choice: React.FC = () => {
  const t = useT();
  const climb = prog(t, 304.8, 306.6, easeInOut);
  const end = prog(t, 306.8, 307.6, easeInOut);
  return (
    <AbsoluteFill>
      <Abs x={0} y={0} w={1080} h={1920} style={{opacity: 1 - end}}>
        <Abs x={60} y={420} w={420} h={560} style={{borderRadius: 30, background: '#fff', boxShadow: '0 16px 34px rgba(0,0,0,0.12)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 26, opacity: pop(t, 303.2)}}>
          <div style={{width: 110, height: 110, borderRadius: 14, border: `8px solid ${DIM}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80, color: DIM, fontWeight: 900}}>{t > 303.8 ? '✓' : ''}</div>
          <T size={40} color={DIM}>Une case à cocher</T>
        </Abs>
        <Abs x={520} y={420} w={500} h={560} style={{borderRadius: 30, background: '#fff', boxShadow: `0 16px 34px ${GREEN}44`, border: `5px solid ${GREEN}`, overflow: 'hidden', opacity: pop(t, 304.6)}}>
          <svg width={500} height={420}>
            <path d="M 0 420 L 170 180 L 250 260 L 360 70 L 500 420 Z" fill="#DDEFE6" />
            <path d="M 40 400 Q 160 380 200 300 T 300 230 T 360 80" stroke={GREEN} strokeWidth={8} fill="none" strokeDasharray="16 12" strokeDashoffset={(1 - climb) * 600} />
            <g transform={`translate(${lerp(40, 360, climb)},${lerp(400, 80, climb)})`}><line x1={0} y1={0} x2={0} y2={-70} stroke={INK} strokeWidth={6} /><path d="M 0 -70 L 50 -55 L 0 -40 Z" fill={RED} /></g>
          </svg>
          <Abs x={0} y={420} w={500} style={{textAlign: 'center'}}><T size={36} color={GREEN}>Une aventure d'amélioration</T></Abs>
        </Abs>
      </Abs>
      {end > 0 && (
        <AbsoluteFill style={{opacity: end}}>
          <Abs x={340} y={420} style={{transform: `scale(${0.9 + end * 0.1})`}}><Tower w={400} floors={5} labels flag={prog(t, 307.6, 308.4)} /></Abs>
          <Row y={1420}><T size={56}>Le choix appartient <span style={{color: GREEN}}>entièrement</span> à l'entreprise</T></Row>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

export const P5: React.FC = () => (
  <AbsoluteFill>
    <Sc a={260.9} b={267.7}><Fork /></Sc>
    <Sc a={267.6} b={290.3}><Two /></Sc>
    <Sc a={290.2} b={302.3}><Coin /></Sc>
    <Sc a={302.2} b={311.7}><Choice /></Sc>
  </AbsoluteFill>
);

