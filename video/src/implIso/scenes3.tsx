import React from 'react';
import {AbsoluteFill, Img, random} from 'remotion';
import {F} from '../iso/ui';
import {handFont, sansFont} from '../theme';
import {Abs, BLUE, Chip, Cite, DIM, easeIn, easeInOut, easeOut, GREEN, Hand, INK, lerp, Mark, PH, Photo, pop, prog, RED, Row, Sc, spring, T, Title, useT, VIO, YEL} from './kit';

/* ─────────── PARTIE 3 : le diagnostic honnête ─────────── */

/** Polaroïd : flash, la photo sort de l'appareil et se développe — « instant T, sans filtre ». */
const Polaroid: React.FC = () => {
  const t = useT();
  const flash = Math.max(0, 1 - Math.abs(t - 138.5) * 5);
  const out = prog(t, 138.7, 140.2, easeOut);
  const dev = prog(t, 141.9, 144.6, (x) => x);
  const gap = prog(t, 146.9, 148.2, easeInOut);
  return (
    <AbsoluteFill>
      <Title y={330}>Le <Mark c={GREEN} p={prog(t, 138.3, 139.0)}>diagnostic</Mark> = l'analyse des écarts</Title>
      <Abs x={230} y={470} w={620} h={260} style={{borderRadius: 40, background: '#2A2F3A', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', zIndex: 2}}>
        <div style={{position: 'absolute', left: 230, top: 40, width: 180, height: 180, borderRadius: 90, background: 'radial-gradient(circle at 40% 40%, #6C8BC0, #0B1630 60%)', border: '12px solid #555C6B'}} />
        <div style={{position: 'absolute', left: 60, top: 40, width: 110, height: 60, borderRadius: 12, background: '#FFF6D0', boxShadow: `0 0 ${flash * 80}px ${flash * 40}px #fff`}} />
        <div style={{position: 'absolute', left: 480, top: 50, width: 70, height: 70, borderRadius: 35, background: RED}} />
        <div style={{position: 'absolute', left: 80, right: 80, bottom: 18, height: 14, borderRadius: 7, background: '#111'}} />
      </Abs>
      <Abs x={300} y={690 + out * 40} w={480} h={560} style={{background: '#fff', padding: '28px 28px 100px', boxSizing: 'border-box', boxShadow: '0 20px 40px rgba(0,0,0,0.25)', transform: `translateY(${(out - 1) * 500}px) rotate(${out * -4}deg)`, zIndex: 1}}>
        <div style={{position: 'relative', width: '100%', height: '100%', background: '#2B2F38', overflow: 'hidden'}}>
          <Img src={PH('promo/hse-machine.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', opacity: dev, filter: `saturate(${dev}) brightness(${0.6 + dev * 0.4})`}} />
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 22, textAlign: 'center', fontFamily: handFont, fontSize: 46, color: INK}}>Instant T</div>
      </Abs>
      {t > 145.9 && <Abs x={720} y={1080} style={{transform: `rotate(8deg) scale(${spring(t, 145.9)})`, zIndex: 3}}><Chip c={INK} light size={34}>FILTRE : AUCUN</Chip></Abs>}
      {t > 146.8 && (
        <Abs x={110} y={1330} w={860} style={{opacity: pop(t, 146.8), zIndex: 3}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 16}}><div style={{width: 230, fontFamily: sansFont, fontWeight: 800, fontSize: 26}}>La norme demande</div><div style={{height: 34, width: 600, borderRadius: 17, background: BLUE}} /></div>
          <div style={{display: 'flex', alignItems: 'center', gap: 16, marginTop: 14}}><div style={{width: 230, fontFamily: sansFont, fontWeight: 800, fontSize: 26}}>Où on en est</div><div style={{height: 34, width: 600 - gap * 230, borderRadius: 17, background: YEL}} /></div>
          <div style={{position: 'absolute', left: 246 + 600 - gap * 230, top: -14, width: gap * 230, height: 110, borderLeft: `4px dashed ${RED}`, borderRight: `4px dashed ${RED}`, boxSizing: 'border-box', display: 'flex', alignItems: 'flex-end', justifyContent: 'center'}}>
            {gap > 0.6 && <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: RED, transform: 'translateY(34px)'}}>ÉCART</div>}
          </div>
        </Abs>
      )}
    </AbsoluteFill>
  );
};

/** Les 4 temps du diagnostic distribués comme des cartes à jouer. */
const CARDS = [
  {at: 152.0, n: 1, l: 'Les documents', s: 'Le papier = la réalité ?', ph: 'docs5/dossiers.jpg', ic: 'classeur'},
  {at: 156.3, n: 2, l: 'Les managers', s: 'Comment ça marche vraiment', ph: 'iso26/direction-equipe.jpg', ic: 'bulle'},
  {at: 163.4, n: 3, l: 'Le terrain', s: 'Ateliers, bureaux', ph: 'promo/terrain-controle.jpg', ic: 'casque'},
  {at: 168.1, n: 4, l: 'Les chiffres', s: 'Réclamations, non-qualité', ph: 'iso26/analyste-kpi.jpg', ic: 'graphique'},
];
const Deal: React.FC = () => {
  const t = useT();
  const act = CARDS.filter((c) => t >= c.at - 0.4).length - 1;
  return (
    <AbsoluteFill>
      <Title y={330}>Le diagnostic en <Mark c={GREEN} p={prog(t, 150.7, 151.4)}>4 temps</Mark></Title>
      <Abs x={470} y={1520} w={140} h={60} style={{borderRadius: 10, background: INK, boxShadow: '0 6px 0 #33415F, 0 12px 0 #2A3550'}} />
      {CARDS.map((c, i) => {
        const p = prog(t, c.at - 0.45, c.at + 0.15, easeOut);
        if (p <= 0) return null;
        const tx = 60 + (i % 2) * 490, ty = 440 + Math.floor(i / 2) * 560;
        const x = lerp(470, tx, p), y = lerp(1500, ty, p);
        const on = i === act;
        return (
          <Abs key={i} x={x} y={y} w={470} h={530} style={{transform: `rotate(${(1 - p) * 200 + (i % 2 ? 2 : -2)}deg) scale(${on ? 1.03 : 0.97})`, borderRadius: 26, background: '#fff', boxShadow: on ? `0 26px 50px ${GREEN}66` : '0 14px 30px rgba(0,0,0,0.15)', border: `6px solid ${on ? GREEN : '#fff'}`, overflow: 'hidden', opacity: on || t > 171 ? 1 : 0.75}}>
            <Img src={PH(c.ph)} style={{width: '100%', height: 300, objectFit: 'cover'}} />
            <div style={{position: 'absolute', left: 20, top: 240, width: 90, height: 90, borderRadius: 45, background: GREEN, border: '6px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: '#fff'}}>{c.n}</div>
            <div style={{position: 'absolute', right: 20, top: 250}}><F n={c.ic} size={74} /></div>
            <div style={{padding: '50px 26px 0'}}><T size={42}>{c.l}</T><div style={{fontFamily: sansFont, fontWeight: 600, fontSize: 28, color: DIM, marginTop: 8}}>{c.s}</div></div>
          </Abs>
        );
      })}
      {t > 171.6 && <Abs x={640} y={1260} style={{transform: `rotate(-10deg) scale(${spring(t, 171.6)})`, border: `6px solid ${GREEN}`, borderRadius: 14, padding: '6px 20px', background: '#ffffffee'}}><T size={40} color={GREEN}>NE MENTENT PAS</T></Abs>}
    </AbsoluteFill>
  );
};

/** L'iceberg : la technique émerge, la culture est immense sous la surface. */
const Iceberg: React.FC = () => {
  const t = useT();
  const dive = prog(t, 179.3, 180.6, easeInOut);
  const water = 900 - dive * 500;
  return (
    <AbsoluteFill>
      <Title y={330} o={1 - dive}>Le point sous-estimé</Title>
      <div style={{position: 'absolute', left: 0, right: 0, top: water, bottom: 0, background: 'linear-gradient(180deg, #4C9BE0CC, #123F7ACC)'}} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <path d={`M 400 ${water} L 470 ${water - 230} L 540 ${water - 300} L 620 ${water - 210} L 680 ${water} Z`} fill="#F2F7FF" stroke={INK} strokeWidth={5} />
        <path d={`M 400 ${water} L 680 ${water} L 900 ${water + 380} L 820 ${water + 780} L 540 ${water + 900} L 230 ${water + 700} L 170 ${water + 330} Z`} fill="#CFE3F7" opacity={0.85} stroke="#ffffff" strokeWidth={4} />
        {Array.from({length: 6}, (_, i) => <path key={i} d={`M ${i * 200 - (t * 40) % 200} ${water} q 50 -18 100 0 t 100 0`} fill="none" stroke="#fff" strokeWidth={4} opacity={0.7} />)}
      </svg>
      <Abs x={0} y={water - 380} w={1080} style={{textAlign: 'center', opacity: pop(t, 177.2) * (1 - prog(t, 179.3, 179.8))}}><Chip c="#fff" size={34} style={{border: `4px solid ${INK}`}}>Technique · Papiers</Chip></Abs>
      {t > 179.6 && <Abs x={0} y={water + 300} w={1080} style={{textAlign: 'center', transform: `scale(${spring(t, 179.6)})`}}><T size={110} color={INK}>CULTURE</T></Abs>}
      {t > 181.8 && <Abs x={0} y={water + 500} w={1080} style={{textAlign: 'center', opacity: pop(t, 181.8)}}><Chip c={YEL} size={36}>⛵ La direction est-elle à bord ?</Chip></Abs>}
    </AbsoluteFill>
  );
};

/** Le tapis : ose-t-on parler des problèmes, ou les cache-t-on dessous ? */
const Rug: React.FC = () => {
  const t = useT();
  const lift = prog(t, 185.3, 185.9, easeOut) * (1 - prog(t, 186.4, 186.8, easeIn));
  return (
    <AbsoluteFill>
      <Title y={330} size={52}>Ose-t-on <Mark c={GREEN} p={prog(t, 184.2, 184.8)}>en parler</Mark> ?</Title>
      <Row y={540} gap={30}>
        {['bug', 'danger', 'bris'].map((ic, i) => (
          <div key={ic} style={{transform: `translate(${prog(t, 185.4 + i * 0.12, 186.2 + i * 0.12, easeIn) * (160 - i * 160)}px, ${prog(t, 185.4 + i * 0.12, 186.2 + i * 0.12, easeIn) * 520}px) scale(${1 - prog(t, 185.4, 186.4) * 0.5})`}}><F n={ic} size={130} /></div>
        ))}
      </Row>
      <Abs x={120} y={1000} w={840} h={360} style={{perspective: 1600}}>
        <div style={{position: 'absolute', inset: 0, borderRadius: 18, transformOrigin: '50% 100%', transform: `rotateX(${lift * 55}deg)`, background: 'repeating-linear-gradient(45deg, #B23A48 0 30px, #8E2C38 30px 60px)', border: '16px solid #E8C26A', boxSizing: 'border-box', boxShadow: '0 20px 40px rgba(0,0,0,0.3)'}} />
      </Abs>
      {t > 185.7 && <Row y={1420}><div style={{transform: `scale(${spring(t, 185.7)})`}}><Chip c={RED} light size={40}>…ou sous le tapis ?</Chip></div></Row>}
    </AbsoluteFill>
  );
};

/** La balance : la culture pèse autant que les procédures. */
const Balance: React.FC = () => {
  const t = useT();
  const tilt = 14 * (1 - spring(t, 188.6, 4, 8));
  return (
    <AbsoluteFill>
      <Title y={330}>Aussi important que n'importe quelle procédure</Title>
      <Abs x={530} y={620} w={20} h={720} style={{background: INK, borderRadius: 10}} />
      <Abs x={400} y={1320} w={280} h={40} style={{background: INK, borderRadius: 20}} />
      <Abs x={140} y={600} w={800} h={30} style={{transform: `rotate(${-tilt}deg)`, transformOrigin: '50% 50%'}}>
        <div style={{position: 'absolute', inset: 0, background: INK, borderRadius: 15}} />
        {[{x: -30, l: 'Culture', ic: 'coeur', c: GREEN}, {x: 590, l: 'Procédures', ic: 'classeur', c: BLUE}].map((p) => (
          <div key={p.l} style={{position: 'absolute', left: p.x, top: 20, width: 240, transform: `rotate(${tilt}deg)`, transformOrigin: '50% 0'}}>
            <svg width={240} height={260}><line x1={120} y1={0} x2={20} y2={240} stroke={INK} strokeWidth={4} /><line x1={120} y1={0} x2={220} y2={240} stroke={INK} strokeWidth={4} /></svg>
            <div style={{width: 240, height: 200, marginTop: -30, borderRadius: '0 0 120px 120px', background: p.c, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6}}><F n={p.ic} size={86} /><T size={34} color="#fff">{p.l}</T></div>
          </div>
        ))}
      </Abs>
      {t > 190.8 && <Row y={1420}><div style={{transform: `scale(${spring(t, 190.8)})`}}><Chip c={GREEN} light size={42}>= la réussite du projet</Chip></div></Row>}
    </AbsoluteFill>
  );
};

export const P3: React.FC = () => (
  <AbsoluteFill>
    <Sc a={136.5} b={149.6}><Polaroid /></Sc>
    <Sc a={149.5} b={172.9}><Deal /></Sc>
    <Sc a={172.8} b={183.8}><Iceberg /></Sc>
    <Sc a={183.7} b={187.0}><Rug /></Sc>
    <Sc a={186.9} b={193.1}><Balance /></Sc>
  </AbsoluteFill>
);

/* ─────────── PARTIE 4 : bâtir un plan réaliste ─────────── */

/** La carte se déplie en accordéon, une dalle de béton se coule dessous, le plan Quoi/Qui/Quand se trace. */
const MapPlan: React.FC = () => {
  const t = useT();
  const unf = prog(t, 195.6, 196.8, easeInOut);
  const slab = prog(t, 197.9, 198.4, easeIn);
  return (
    <AbsoluteFill>
      <Title y={330}>Une <Mark c={VIO} p={prog(t, 194.8, 195.6)}>carte précise</Mark>, une base solide</Title>
      <Abs x={90} y={470} w={900} h={560} style={{perspective: 2400, display: 'flex'}}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{width: 300, height: 560, transformOrigin: i === 0 ? '100% 50%' : '0% 50%', transform: i === 1 ? 'none' : `rotateY(${(1 - unf) * (i === 0 ? 92 : -92)}deg)`, background: '#EAF1E2', borderLeft: i ? '2px solid #C9D6BC' : 'none', overflow: 'hidden', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.15)'}}>
            <svg width={300} height={560} style={{position: 'absolute', inset: 0}}>
              <path d={`M ${-i * 300} 300 C ${200 - i * 300} 120, ${420 - i * 300} 480, ${900 - i * 300} 200`} stroke="#8DB3E0" strokeWidth={26} fill="none" />
              <path d={`M ${100 - i * 300} 560 L ${380 - i * 300} 0 M ${600 - i * 300} 560 L ${700 - i * 300} 0`} stroke="#fff" strokeWidth={14} fill="none" />
              <path d={`M ${120 - i * 300} 460 Q ${450 - i * 300} 260 ${780 - i * 300} 130`} stroke={VIO} strokeWidth={8} fill="none" strokeDasharray="20 14" strokeDashoffset={(1 - prog(t, 200.3, 201.6)) * 900} />
            </svg>
            {i === 2 && t > 201 && <div style={{position: 'absolute', left: 150, top: 90, transform: `scale(${spring(t, 201)})`}}><F n="epingle" size={90} /></div>}
          </div>
        ))}
      </Abs>
      <Abs x={70} y={1040 - (1 - slab) * 400} w={940} h={90} style={{background: 'repeating-linear-gradient(90deg, #9BA1AB 0 6px, #A9AFB8 6px 40px)', borderRadius: 12, opacity: slab, boxShadow: '0 16px 30px rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={36} color="#fff">BASE SOLIDE</T></Abs>
      <Row y={1190} gap={20}>
        {[['Quoi ?', 'clipboard'], ['Qui ?', 'equipe'], ['Quand ?', 'calendrier']].map(([l, ic], i) => (
          <div key={l} style={{opacity: pop(t, 201.4 + i * 0.35), transform: `translateY(${(1 - pop(t, 201.4 + i * 0.35)) * 40}px)`, width: 290, height: 240, borderRadius: 24, background: '#fff', border: `5px solid ${VIO}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10}}><F n={ic} size={90} /><T size={42}>{l}</T></div>
        ))}
      </Row>
      {t > 203.0 && <Abs x={620} y={1120} style={{transform: `rotate(-12deg) scale(${spring(t, 203.0)})`, border: `6px solid ${GREEN}`, borderRadius: 12, padding: '4px 18px', background: '#ffffffee'}}><T size={44} color={GREEN}>RÉALISTE</T></Abs>}
    </AbsoluteFill>
  );
};

/** Éphéméride qu'on effeuille jusqu'à 18 mois, puis règle avec la fourchette 12–18 et la coquille qui se remplit. */
const Months: React.FC = () => {
  const t = useT();
  const cnt = Math.min(18, Math.floor(prog(t, 206.0, 210.6, (x) => x) * 18));
  const tear = (prog(t, 206.0, 210.6, (x) => x) * 18) % 1;
  const ruler = prog(t, 210.5, 211.4);
  const live = prog(t, 217.2, 218.2, easeInOut);
  return (
    <AbsoluteFill>
      <Title y={330}>La durée réaliste dans une PME</Title>
      <Abs x={330} y={440} w={420} h={440}>
        <div style={{position: 'absolute', inset: 0, borderRadius: 24, background: '#fff', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', overflow: 'hidden'}}>
          <div style={{height: 100, background: VIO, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={40} color="#fff">MOIS</T></div>
          <div style={{height: 340, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={200}>{cnt}</T></div>
        </div>
        {t > 206.0 && t < 210.6 && <div style={{position: 'absolute', left: 0, right: 0, top: 100, height: 340, background: '#fff', borderTop: '3px dashed #ccc', transformOrigin: '50% 0', transform: `rotateX(${tear * 110}deg) translateY(${tear * 60}px)`, opacity: 1 - tear, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={200} color={DIM}>{Math.max(0, cnt - 1)}</T></div>}
      </Abs>
      <Abs x={90} y={940} w={900} h={160} style={{opacity: ruler}}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 60, height: 50, background: '#fff', border: `4px solid ${INK}`, borderRadius: 10}} />
        {Array.from({length: 25}, (_, i) => <div key={i} style={{position: 'absolute', left: (i / 24) * 892, top: 60, width: 3, height: i % 6 === 0 ? 50 : 22, background: INK}} />)}
        {[0, 6, 12, 18, 24].map((m) => <div key={m} style={{position: 'absolute', left: (m / 24) * 892 - 30, top: 118, width: 60, textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 26}}>{m}</div>)}
        <div style={{position: 'absolute', left: (12 / 24) * 892, top: 40, width: (6 / 24) * 892 * prog(t, 211.0, 211.8), height: 90, background: `${GREEN}AA`, borderRadius: 10, border: `4px solid ${GREEN}`}} />
        {t > 211.4 && <div style={{position: 'absolute', left: (12 / 24) * 892 - 40, top: -36, fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: GREEN, opacity: pop(t, 211.4)}}>12 à 18 mois</div>}
      </Abs>
      <Cite y={1130} o={ruler}>Durée citée par la vidéo d’origine</Cite>
      {t > 214.6 && (
        <Abs x={300} y={1210} w={480} h={340} style={{opacity: pop(t, 214.6)}}>
          <svg width={480} height={340} style={{position: 'absolute', inset: 0}}>
            <defs><clipPath id="house"><path d="M 40 150 L 240 20 L 440 150 L 440 330 L 40 330 Z" /></clipPath></defs>
            <g clipPath="url(#house)"><image href={PH('induction/accueil-groupe.jpg')} x={0} y={0} width={480} height={340} preserveAspectRatio="xMidYMid slice" opacity={live} /></g>
            <path d="M 40 150 L 240 20 L 440 150 L 440 330 L 40 330 Z" fill="none" stroke={live > 0.5 ? GREEN : DIM} strokeWidth={8} strokeDasharray={live > 0.5 ? 'none' : '18 12'} />
          </svg>
          <div style={{position: 'absolute', right: -170, top: 120}}><Chip c={live > 0.5 ? GREEN : '#fff'} light={live > 0.5} size={32} style={{border: `3px solid ${live > 0.5 ? GREEN : DIM}`}}>{live > 0.5 ? 'il vit !' : 'coquille vide'}</Chip></div>
        </Abs>
      )}
    </AbsoluteFill>
  );
};

/** Le piège des 6 mois : une tour de Jenga montée trop vite s'effondre quand le consultant tourne les talons. */
const Jenga: React.FC = () => {
  const t = useT();
  const fall = prog(t, 228.1, 229.6, easeIn);
  const away = prog(t, 229.0, 230.6, (x) => x);
  return (
    <AbsoluteFill>
      <Row y={330}><div style={{transform: `scale(${spring(t, 220.6)})`}}><Chip c={RED} light size={46}>⚠ LE PIÈGE CLASSIQUE</Chip></div></Row>
      {t > 223.6 && <Row y={450}><div style={{opacity: pop(t, 223.6), background: '#fff', borderRadius: 20, padding: '10px 26px', border: `4px dashed ${RED}`}}><T size={46}>« Certifié en <span style={{color: RED}}>6 mois</span> ! »</T></div></Row>}
      {Array.from({length: 12}, (_, i) => {
        const at = 221.8 + i * 0.16;
        const inn = prog(t, at, at + 0.2);
        const d = random(`j${i}`);
        const row = i;
        const horiz = row % 2 === 0;
        const fx = fall * (d - 0.5) * 900 * (1 + row * 0.08);
        const fy = fall * fall * (1500 - (1520 - row * 70)) + fall * (row * 40);
        const fr = fall * (d - 0.5) * 220;
        return (
          <div key={i} style={{position: 'absolute', left: 340, top: 1450 - row * 70 - (1 - inn) * 300, width: 400, height: 66, display: 'flex', gap: 6, opacity: inn, transform: `translate(${fx}px, ${Math.min(fy, 1460 - (1450 - row * 70))}px) rotate(${fr}deg)`}}>
            {horiz ? <div style={{flex: 1, borderRadius: 8, background: '#E7C38F', border: `4px solid ${INK}`, opacity: i % 3 === 1 ? 0.35 : 1}} /> : [0, 1, 2].map((k) => <div key={k} style={{flex: 1, borderRadius: 8, background: '#D9AE73', border: `4px solid ${INK}`, opacity: k === 1 && i % 4 === 1 ? 0.2 : 1}} />)}
          </div>
        );
      })}
      {t > 226.8 && <Abs x={80} y={640} style={{opacity: pop(t, 226.8) * (1 - fall)}}><Chip c="#fff" size={32} style={{border: `3px solid ${INK}`}}>système superficiel</Chip></Abs>}
      {t > 228.9 && <Abs x={700 + away * 300} y={740} style={{opacity: 1 - prog(t, 230.2, 230.7), display: 'flex', alignItems: 'center', gap: 6}}><F n="homme-bureau" size={130} /><F n="pas" size={70} style={{transform: 'rotate(90deg)'}} /></Abs>}
      {t > 228.2 && <Row y={760}><div style={{transform: `scale(${spring(t, 228.2)})`}}><Chip c={RED} light size={50}>💥 ÇA S’ÉCROULE</Chip></div></Row>}
    </AbsoluteFill>
  );
};

/** Sablier + étapes cochées : testé, rodé, prêt pour le grand oral de l'audit. */
const Hourglass: React.FC = () => {
  const t = useT();
  const sand = prog(t, 231.0, 237.0, (x) => x);
  const ITEMS = [{at: 232.9, l: 'Testé', ic: 'eprouvette'}, {at: 233.5, l: 'Rodé par les équipes', ic: 'engrenage'}, {at: 235.7, l: 'Prêt pour le grand oral de l’audit', ic: 'auditeur'}];
  return (
    <AbsoluteFill>
      <Title y={330}>Un bon système a besoin de <Mark c={VIO} p={prog(t, 232.0, 232.6)}>temps</Mark></Title>
      <svg width={360} height={620} style={{position: 'absolute', left: 60, top: 520}}>
        <path d="M 30 10 L 330 10 L 330 40 Q 330 200 190 300 L 190 320 Q 330 420 330 580 L 330 610 L 30 610 L 30 580 Q 30 420 170 320 L 170 300 Q 30 200 30 40 Z" fill="#ffffffcc" stroke={INK} strokeWidth={8} />
        <clipPath id="top"><path d="M 40 40 Q 40 200 180 300 Q 320 200 320 40 Z" /></clipPath>
        <rect x={0} y={40 + sand * 260} width={360} height={300} fill={YEL} clipPath="url(#top)" />
        <clipPath id="bot"><path d="M 180 320 Q 40 420 40 580 L 320 580 Q 320 420 180 320 Z" /></clipPath>
        <rect x={0} y={580 - sand * 250} width={360} height={300} fill={YEL} clipPath="url(#bot)" />
        {sand < 1 && <line x1={180} y1={300} x2={180} y2={580 - sand * 250} stroke={YEL} strokeWidth={6} />}
      </svg>
      {ITEMS.map((it, i) => (
        <Abs key={i} x={460} y={560 + i * 200} w={570} h={170} style={{opacity: pop(t, it.at), transform: `translateX(${(1 - pop(t, it.at)) * 60}px)`, background: '#fff', borderRadius: 24, display: 'flex', alignItems: 'center', gap: 18, padding: '0 22px', boxSizing: 'border-box', boxShadow: '0 12px 26px rgba(0,0,0,0.1)'}}>
          <F n={it.ic} size={84} />
          <T size={i === 2 ? 32 : 38} style={{flex: 1}}>{it.l}</T>
          <div style={{width: 60, height: 60, borderRadius: 30, background: GREEN, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 38, fontWeight: 900, transform: `scale(${spring(t, it.at + 0.3)})`}}>✓</div>
        </Abs>
      ))}
    </AbsoluteFill>
  );
};

/** Les ressources : surtout du temps — pilote, managers, équipes ; puis le mur. */
const RES = [
  {at: 246.2, l: 'Pilote interne', s: 'une bonne partie de son agenda', ph: 'integration/responsable.jpg'},
  {at: 250.4, l: 'Managers', s: 'du temps de leur côté', ph: 'iso26/direction-equipe.jpg'},
  {at: 252.0, l: 'Équipes terrain', s: 'du temps aussi', ph: 'induction/mine-equipe.jpg'},
];
const Resources: React.FC = () => {
  const t = useT();
  const coin = spring(t, 239.9);
  return (
    <AbsoluteFill>
      <Title y={330}>Les <Mark c={VIO} p={prog(t, 238.7, 239.4)}>ressources</Mark> : surtout du temps</Title>
      <Abs x={70} y={440} w={940} h={150} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 26}}>
        <div style={{transform: `scale(${coin})`, display: 'flex', alignItems: 'center', gap: 12, opacity: t > 243.8 ? 0.45 : 1}}><F n="argent" size={100} /><T size={34}>Budget consultant</T></div>
        {t > 243.8 && <T size={60} color={DIM} style={{opacity: pop(t, 243.8)}}>≪</T>}
        {t > 243.8 && <div style={{transform: `scale(${spring(t, 243.8)})`, display: 'flex', alignItems: 'center', gap: 12}}><F n="chrono" size={120} /><T size={48} color={VIO}>TEMPS</T></div>}
      </Abs>
      {RES.map((r, i) => {
        const on = t > r.at - 0.2;
        const g = prog(t, r.at + 0.2, r.at + 1.6);
        return (
          <Abs key={i} x={70} y={640 + i * 300} w={940} h={270} style={{opacity: on ? 1 : 0, transform: `translateX(${(1 - pop(t, r.at - 0.2)) * -80}px)`, background: '#fff', borderRadius: 26, overflow: 'hidden', boxShadow: '0 14px 30px rgba(0,0,0,0.12)', display: 'flex'}}>
            <Img src={PH(r.ph)} style={{width: 330, height: 270, objectFit: 'cover'}} />
            <div style={{flex: 1, padding: '34px 30px'}}>
              <T size={44}>{r.l}</T>
              <div style={{fontFamily: sansFont, fontWeight: 600, fontSize: 28, color: DIM, marginTop: 6}}>{r.s}</div>
              <div style={{marginTop: 26, display: 'flex', alignItems: 'center', gap: 12, opacity: g, transform: `scale(${0.8 + g * 0.2})`, transformOrigin: '0 50%'}}><F n="sablier" size={56} /><Chip c={VIO} light size={28}>+ du temps</Chip></div>
            </div>
          </Abs>
        );
      })}
      {t > 254.0 && <Abs x={680} y={1430} style={{transformOrigin: '50% 0', transform: `rotate(${Math.sin((t - 254) * 4) * 10 * (1 - prog(t, 254, 256))}deg) scale(${spring(t, 254.0)})`}}><Chip c={RED} light size={36}>🏷 Coût bien réel</Chip></Abs>}
    </AbsoluteFill>
  );
};
const Wall: React.FC = () => {
  const t = useT();
  const hit = 257.5;
  const run = prog(t, 256.2, hit, easeIn);
  const sh = t > hit ? Math.sin(t * 80) * 14 * (1 - prog(t, hit, hit + 0.6)) : 0;
  return (
    <AbsoluteFill style={{transform: `translate(${sh}px, ${sh * 0.6}px)`}}>
      <Title y={330}>L'ignorer ? Droit dans le mur</Title>
      <Abs x={700} y={520} w={320} h={900} style={{display: 'flex', flexWrap: 'wrap', alignContent: 'flex-start'}}>
        {Array.from({length: 36}, (_, i) => <div key={i} style={{width: 156, height: 70, margin: 2, marginLeft: Math.floor(i / 2) % 2 && i % 2 === 0 ? -76 : 2, background: '#B5532E', borderRadius: 6, boxShadow: 'inset 0 -6px 0 #8E3D20', transform: t > hit && random(`b${i}`) > 0.7 ? `rotate(${(random(`r${i}`) - 0.5) * 20}deg)` : 'none'}} />)}
      </Abs>
      <Abs x={lerp(-300, 380, run)} y={880} style={{display: 'flex', alignItems: 'center', gap: 10, transform: t > hit ? 'scaleX(0.8)' : 'none', transformOrigin: '100% 50%'}}>
        <Chip c={VIO} light size={38}>Projet sans temps prévu ➜</Chip>
      </Abs>
      {t > hit && <Abs x={640} y={820} style={{transform: `scale(${spring(t, hit)})`}}><F n="collision" size={200} /></Abs>}
    </AbsoluteFill>
  );
};

export const P4: React.FC = () => (
  <AbsoluteFill>
    <Sc a={195.5} b={204.5}><MapPlan /></Sc>
    <Sc a={204.4} b={219.7}><Months /></Sc>
    <Sc a={219.6} b={230.9}><Jenga /></Sc>
    <Sc a={230.8} b={237.3}><Hourglass /></Sc>
    <Sc a={237.2} b={255.9}><Resources /></Sc>
    <Sc a={255.8} b={258.6}><Wall /></Sc>
  </AbsoluteFill>
);
