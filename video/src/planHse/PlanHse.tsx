import React from 'react';
import {AbsoluteFill, Audio, Img, random, staticFile} from 'remotion';
import {Gate} from '../anim';
import {Captions} from '../components/Captions';
import {Blinds, Board, Card, Center, Cite, Deep, Dust, Flap, Kin, Out, Pill, Stamp, Tile, Word} from '../durab/Durab';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {handFont, s, sansFont} from '../theme';
import {Abs, Bg, DIM, easeIn, easeInOut, easeOut, GREEN, INK, lerp, LOGO, PAPER, PH, pop, prog, RED, spring, T, useT} from '../implIso/kit';
import {captions} from './captions';

/**
 * « Le plan HSE » (3 min 03) — capsule « hors normes » : voix d'origine, sous-titres recalés mot à mot, photos réelles,
 * thème « papier quadrillé ».
 * Fil rouge inédit : LE PLAN DE MATCH. L'expression de la vidéo devient l'identité visuelle : un tableau tactique de
 * coach (tableau blanc, croix et ronds, flèches au feutre) vit dans l'en-tête — un pion aimanté avance de section en
 * section — et les schémas des scènes sont tracés au feutre comme une tactique d'équipe.
 * Transition inédite : LE COUP D'EFFACEUR — une brosse balaie le tableau en laissant une traînée, puis le titre de la
 * section s'écrit au feutre.
 * Reprend le meilleur de la série : tuiles en bois, palettes d'affichage, bouclier à étages (mise en abyme), store
 * vénitien, photos en profondeur 3D, racines et loupe, écran partagé, engrenages, cascade, tampons, poussière, cinétique.
 */
const BLUE = '#1F6FD1';
const ORANGE = '#F07A12';
const TEAL = '#0F9D8F';
const GOLD = '#F5B700';
const MARK = '#2B3A67';
const OUTRO_AT = 183.5;
export const PLANHSE_FRAMES = s(OUTRO_AT + 3.8);
const SECT = [
  {at: 29.3, n: '1', title: 'Qu’est-ce qu’un plan HSE ?', s: 'définition de l’outil', c: BLUE},
  {at: 77.6, n: '2', title: 'Prévention & gestion des risques', s: 'anticipation et action', c: ORANGE},
  {at: 131.7, n: '3', title: 'Les acteurs de la sécurité', s: 'qui élabore le plan ?', c: TEAL},
];
const sectIdx = (t: number) => SECT.reduce((k, x, i) => (t >= x.at ? i : k), -1);
const HAND = handFont;

/* ─── Feutre : trait qui se dessine ─── */
const Stroke: React.FC<{d: string; at: number; dur?: number; c?: string; w?: number; len?: number}> = ({d, at, dur = 0.8, c = MARK, w = 8, len = 1400}) => {
  const t = useT();
  return <path d={d} fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={len} strokeDashoffset={len * (1 - prog(t, at, at + dur, easeInOut))} />;
};
const Marker: React.FC<{children: React.ReactNode; size: number; color?: string; at: number; style?: React.CSSProperties}> = ({children, size, color = MARK, at, style}) => {
  const t = useT();
  const p = prog(t, at, at + 0.6, easeOut);
  return <div style={{fontFamily: HAND, fontWeight: 700, fontSize: size, color, clipPath: `inset(0 ${(1 - p) * 100}% 0 0)`, ...style}}>{children}</div>;
};

/* ═════════════ Fil rouge : tableau tactique ═════════════ */
const Header: React.FC = () => {
  const t = useT();
  const si = sectIdx(t);
  const x = si < 0 ? 0 : si + 1;
  const px = lerp(0, 1, prog(t, si >= 0 ? SECT[si].at : 0, (si >= 0 ? SECT[si].at : 0) + 1.2, easeInOut));
  const from = Math.max(0, x - 1);
  const pos = lerp(from, x, si < 0 ? 0 : px);
  return (
    <AbsoluteFill style={{zIndex: 40, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: '50%', top: 56, transform: 'translateX(-50%)', background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 8px 24px rgba(20,33,61,0.12)'}}><Img src={staticFile(LOGO)} style={{height: 76, display: 'block'}} /></div>
      {t > 2.6 && t < OUTRO_AT && (
        <div style={{position: 'absolute', left: 36, right: 36, top: 182, height: 96, borderRadius: 20, background: '#fff', border: '6px solid #C9D2DF', boxShadow: '0 8px 20px rgba(20,33,61,0.1)', opacity: pop(t, 2.6), overflow: 'hidden'}}>
          <svg width={996} height={84} style={{position: 'absolute', left: 0, top: 0}}>
            <rect x={8} y={8} width={980} height={68} rx={10} fill="none" stroke="#9CC5A0" strokeWidth={3} />
            {[1, 2, 3].map((k) => <line key={k} x1={8 + k * 245} y1={8} x2={8 + k * 245} y2={76} stroke="#9CC5A0" strokeWidth={3} strokeDasharray="6 6" />)}
            <circle cx={498} cy={42} r={18} fill="none" stroke="#9CC5A0" strokeWidth={3} />
          </svg>
          {['coup d’envoi', ...SECT.map((x2) => x2.n + ' · ' + x2.s)].map((l, k) => <div key={k} style={{position: 'absolute', left: 8 + k * 245, width: 245, top: 52, textAlign: 'center', fontFamily: HAND, fontSize: 16, fontWeight: 700, color: k === x ? (k ? SECT[k - 1].c : MARK) : '#A9B1BE'}}>{l}</div>)}
          {[0, 1, 2, 3].map((k) => <div key={k} style={{position: 'absolute', left: 8 + k * 245 + 40, top: 14, fontFamily: HAND, fontWeight: 700, fontSize: 26, color: k < x ? '#C9D2DF' : '#DDE3EC'}}>{k % 2 ? '✕' : '○'}</div>)}
          <div style={{position: 'absolute', left: 8 + pos * 245 + 122 - 20, top: 10, width: 40, height: 40, borderRadius: 20, background: si < 0 ? MARK : SECT[si].c, boxShadow: '0 4px 10px rgba(0,0,0,0.3)', border: '4px solid #fff', boxSizing: 'border-box'}} />
        </div>
      )}
    </AbsoluteFill>
  );
};
/** Le coup d'effaceur. */
const Eraser: React.FC<{i: number}> = ({i}) => {
  const t = useT();
  const S0 = SECT[i];
  const k = t - S0.at;
  if (k < 0 || k > 3.8) return null;
  const sweep = prog(t, S0.at, S0.at + 0.7, easeInOut);
  const out = prog(t, S0.at + 3.1, S0.at + 3.7, easeInOut);
  const ex = lerp(-300, 1380, sweep);
  return (
    <AbsoluteFill style={{zIndex: 35}}>
      <AbsoluteFill style={{background: '#FBFCFE', clipPath: out > 0 ? `inset(0 0 0 ${out * 100}%)` : `inset(0 ${100 - sweep * 100}% 0 0)`, boxShadow: 'inset 0 0 0 18px #C9D2DF'}}>
        {Array.from({length: 7}, (_, j) => <div key={j} style={{position: 'absolute', left: 0, right: 0, top: 380 + j * 170, height: 60, background: 'rgba(43,58,103,0.035)', transform: `rotate(${(j % 2 ? 1 : -1) * 1.5}deg)`}} />)}
        <Abs x={0} y={560} w={1080} style={{textAlign: 'center'}}>
          <div style={{display: 'inline-flex', gap: 8}}>{['S', 'E', 'C', S0.n].map((ch, j) => <Tile key={j} ch={ch} size={100} c={S0.c} />)}</div>
        </Abs>
        <Abs x={60} y={740} w={960} style={{textAlign: 'center'}}><Marker size={S0.title.length > 26 ? 66 : 84} color={S0.c} at={S0.at + 0.8}>{S0.title}</Marker></Abs>
        <Abs x={70} y={920} w={940} style={{textAlign: 'center'}}><Marker size={46} color={DIM} at={S0.at + 1.5}>{S0.s}</Marker></Abs>
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><Stroke d="M220 1040 C 400 1100, 680 1100, 860 1030" at={S0.at + 1.8} c={S0.c} w={10} /><Stroke d="M840 1010 L870 1032 L836 1050" at={S0.at + 2.4} dur={0.3} c={S0.c} w={10} len={200} /></svg>
      </AbsoluteFill>
      {sweep < 1 && <div style={{position: 'absolute', left: ex - 120, top: 760, width: 240, height: 400, borderRadius: 30, background: 'linear-gradient(90deg, #3A4466 0 30%, #F2E8C9 30%)', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', transform: 'rotate(8deg)'}} />}
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
      <Img src={PH('induction/accueil-groupe.jpg')} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 860, objectFit: 'cover', objectPosition: '50% 40%'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${PAPER}00 32%, ${PAPER}DD 41%, ${PAPER} 45%)`}} />
      <Abs x={0} y={90} w={1080} style={{display: 'flex', justifyContent: 'center'}}><div style={{background: '#fff', borderRadius: 26, padding: '10px 28px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}><Img src={staticFile(LOGO)} style={{height: 84, display: 'block'}} /></div></Abs>
      <Abs x={50} y={740} w={980} style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', padding: '8px 26px', borderRadius: 40, background: INK, color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: 30, letterSpacing: 3}}>LE PLAN DE MATCH DE LA SÉCURITÉ</div>
        <T size={130} style={{marginTop: 18, textTransform: 'uppercase', letterSpacing: -3}}>Le plan</T>
        <div style={{display: 'flex', justifyContent: 'center', gap: 12, marginTop: 10}}>{'HSE'.split('').map((c, i) => <Tile key={i} ch={c} size={150} c={[BLUE, ORANGE, TEAL][i]} />)}</div>
      </Abs>
      <Abs x={140} y={1290} w={800} h={220} style={{borderRadius: 20, background: '#fff', border: '6px solid #C9D2DF'}}>
        <svg width={788} height={208}>
          <rect x={10} y={10} width={768} height={188} rx={12} fill="none" stroke="#9CC5A0" strokeWidth={4} />
          <line x1={394} y1={10} x2={394} y2={198} stroke="#9CC5A0" strokeWidth={4} />
          <text x={120} y={90} fontFamily={HAND} fontSize={50} fill={RED}>✕</text><text x={230} y={160} fontFamily={HAND} fontSize={50} fill={RED}>✕</text>
          <text x={520} y={80} fontFamily={HAND} fontSize={50} fill={BLUE}>○</text><text x={620} y={150} fontFamily={HAND} fontSize={50} fill={BLUE}>○</text>
          <path d="M150 110 C 260 40, 420 40, 560 70" fill="none" stroke={MARK} strokeWidth={6} /><path d="M548 56 L566 72 L544 82" fill="none" stroke={MARK} strokeWidth={6} />
        </svg>
      </Abs>
    </AbsoluteFill>
  );
};

/* ═════════════ INTRO ═════════════ */
const PleinRegime: React.FC = () => {
  const t = useT();
  const needle = lerp(-70, 60, prog(t, 5.5, 6.9, easeOut));
  return (
    <Out end={9.2}>
      <Center y={340}><Kin text="Le fameux plan HSE" at={2.8} size={66} /></Center>
      <Abs x={90} y={480} w={420} h={420} style={{opacity: pop(t, 4.4)}}>
        <svg width={420} height={300} viewBox="0 0 420 300"><path d="M40 260 A170 170 0 0 1 380 260" fill="none" stroke="#DDE3EC" strokeWidth={36} /><path d="M40 260 A170 170 0 0 1 380 260" fill="none" stroke={GREEN} strokeWidth={36} strokeDasharray={540} strokeDashoffset={540 * (1 - prog(t, 5.5, 6.9))} /><line x1={210} y1={260} x2={210 + Math.sin((needle * Math.PI) / 180) * 150} y2={260 - Math.cos((needle * Math.PI) / 180) * 150} stroke={INK} strokeWidth={10} strokeLinecap="round" /></svg>
        <div style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: GREEN}}>à plein régime</div>
      </Abs>
      <Abs x={570} y={500} w={420} h={420} style={{textAlign: 'center', opacity: pop(t, 7.3)}}>
        <div style={{transform: `scale(${1 + 0.05 * Math.sin(t * 4)})`}}><F n="coeur" size={220} /></div>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: RED, marginTop: 20}}>protéger le plus précieux</div>
      </Abs>
    </Out>
  );
};
const PlanDeMatch: React.FC = () => {
  const t = useT();
  const cross = prog(t, 19.6, 20.2, easeOut);
  const col = prog(t, 21.3, 22.5, easeOut);
  return (
    <Out end={29.3}>
      <Center y={320}><Kin text="C’est quoi, exactement ?" at={9.3} size={60} /></Center>
      <Abs x={0} y={410} w={1080}><Word text="HSE" at={11.6} size={130} c={MARK} variant={0} /></Abs>
      <Abs x={0} y={580} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={16.3} c={RED} size={30}>la survie</Pill><Pill at={17.0} c={BLUE} size={30}>le quotidien</Pill></Abs>
      <Abs x={60} y={690} w={420} h={560} style={{opacity: pop(t, 18.4)}}>
        <div style={{position: 'absolute', left: 60, top: 40, width: 300, height: 220, borderRadius: 14, background: '#F2E8C9', border: '4px solid #C9B48A', transform: 'rotate(-4deg)'}}><div style={{padding: 20, fontFamily: HAND, fontSize: 28, color: DIM}}>jargon<br />administratif…</div></div>
        <div style={{position: 'absolute', left: 30, top: 140, width: 360, height: 14, background: RED, borderRadius: 7, transform: `rotate(-20deg) scaleX(${cross})`, transformOrigin: '0 50%'}} />
      </Abs>
      <Abs x={540} y={680} w={480} h={580}>
        <div style={{position: 'absolute', left: 170, bottom: 120, width: 140, height: 360 * col, background: `linear-gradient(90deg, #C9D2DF, #fff, #C9D2DF)`, borderRadius: '8px 8px 0 0', boxShadow: '0 10px 20px rgba(20,33,61,0.15)'}} />
        <div style={{position: 'absolute', left: 140, bottom: 470 * col + 10, width: 200, height: 30, background: '#B8C4D6', borderRadius: 6, opacity: col}} />
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 60, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: MARK, opacity: pop(t, 21.3)}}>le pilier central</div>
      </Abs>
      {t > 24.0 && (
        <Abs x={110} y={680} w={860} h={560} style={{background: '#fff', borderRadius: 26, border: '8px solid #C9D2DF', boxShadow: '0 20px 40px rgba(20,33,61,0.2)', transform: `scale(${Math.min(1, spring(t, 24.1, 8, 13))})`}}>
          <svg width={844} height={544}>
            <rect x={20} y={20} width={804} height={504} rx={16} fill="none" stroke="#9CC5A0" strokeWidth={5} />
            <line x1={422} y1={20} x2={422} y2={524} stroke="#9CC5A0" strokeWidth={5} /><circle cx={422} cy={272} r={70} fill="none" stroke="#9CC5A0" strokeWidth={5} />
            {[[150, 150], [190, 380], [300, 260]].map(([x, y], k) => <text key={k} x={x} y={y} fontFamily={HAND} fontSize={64} fill={RED} opacity={pop(t, 24.6 + k * 0.2)}>✕</text>)}
            {[[560, 170], [620, 360], [700, 250]].map(([x, y], k) => <text key={k} x={x} y={y} fontFamily={HAND} fontSize={64} fill={BLUE} opacity={pop(t, 25.2 + k * 0.2)}>○</text>)}
            <Stroke d="M200 360 C 300 200, 480 180, 600 220" at={25.8} c={MARK} w={8} />
            <Stroke d="M330 240 C 420 320, 560 360, 650 330" at={26.4} c={MARK} w={8} />
          </svg>
          <div style={{position: 'absolute', left: 0, right: 0, bottom: -70, textAlign: 'center'}}><Pill at={24.4} c={MARK} size={34}>le fameux plan de match</Pill></div>
        </Abs>
      )}
    </Out>
  );
};

/* ═════════════ SECTION 1 ═════════════ */
const Outil: React.FC = () => {
  const t = useT();
  const cross = prog(t, 47.4, 48.0, easeOut);
  return (
    <Out end={55.3}>
      <Center y={320}><Kin text="Un outil de gestion des risques" at={36.9} size={54} color={BLUE} /></Center>
      <Abs x={60} y={420} w={960} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14}}>
        <Pill at={37.9} c={BLUE} size={28}>risques</Pill><div style={{fontWeight: 900, fontSize: 40, opacity: pop(t, 39.0)}}>→</div><Pill at={39.6} c={ORANGE} size={28}>mesures concrètes</Pill><div style={{fontWeight: 900, fontSize: 40, opacity: pop(t, 40.4)}}>→</div><Pill at={40.7} c={GREEN} size={28}>accidents évités</Pill>
      </Abs>
      <Center y={530}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 120, color: MARK, transform: `scale(${Math.min(1, spring(t, 43.0, 7, 12))})`, opacity: t > 43 ? 1 : 0}}>l’action</div></Center>
      <Abs x={60} y={740} w={440} h={460} style={{borderRadius: 26, background: '#F1EEE6', overflow: 'hidden', opacity: pop(t, 44.6)}}>
        <Img src={PH('docs5/dossiers.jpg')} style={{width: '100%', height: 300, objectFit: 'cover', filter: 'sepia(0.7) grayscale(0.5)'}} />
        <div style={{position: 'absolute', left: 20, right: 20, top: 320, fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: DIM, textAlign: 'center'}}>document statique<br />au fond d’un tiroir</div>
        <div style={{position: 'absolute', left: -20, top: 200, width: 500, height: 16, background: RED, borderRadius: 8, transform: `rotate(-28deg) scaleX(${cross})`, transformOrigin: '0 50%'}} />
      </Abs>
      <Abs x={540} y={740} w={480} h={460} style={{borderRadius: 26, background: '#EAF3FF', overflow: 'hidden', opacity: pop(t, 48.9)}}>
        <div style={{position: 'absolute', left: 240 - 140, top: 40, width: 280, height: 280, borderRadius: '50%', background: `conic-gradient(from ${t * 200}deg, ${BLUE}66, transparent 30%)`, border: `4px solid ${BLUE}55`}} />
        <div style={{position: 'absolute', left: 190, top: 130}}><F n="yeux" size={100} /></div>
        <div style={{position: 'absolute', left: 20, right: 20, top: 340, fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: BLUE, textAlign: 'center'}}>outil stratégique<br />hyper actif · sur le qui-vive</div>
      </Abs>
      <Abs x={0} y={1230} w={1080} style={{display: 'flex', justifyContent: 'center'}}><Pill at={52.8} c={TEAL} size={30}>s’adapter en permanence au terrain</Pill></Abs>
    </Out>
  );
};
const Bouclier: React.FC = () => {
  const t = useT();
  const L = [{l: 'les employés', a: 61.9, ph: 'causerie/manager.jpg', c: BLUE, r: 150}, {l: 'les clients', a: 64.9, ph: 'zones/client.jpg', c: ORANGE, r: 260}, {l: 'les biens de l’entreprise', a: 65.7, ph: 'promo/hse-machine.jpg', c: TEAL, r: 370}];
  const net = prog(t, 75.3, 76.6, easeInOut);
  return (
    <Out end={77.6}>
      <Center y={320}><Kin text="Ce bouclier protège qui ?" at={55.4} size={58} /></Center>
      <Abs x={140} y={410} w={800} h={820}>
        {[...L].reverse().map((l, k) => {
          const p = Math.min(1, spring(t, l.a, 7, 12));
          return <div key={k} style={{position: 'absolute', left: 400 - l.r, top: 360 - l.r * 1.05, width: l.r * 2, height: l.r * 2.3, background: `${l.c}22`, border: `8px solid ${l.c}`, borderRadius: `${l.r}px ${l.r}px ${l.r * 1.1}px ${l.r * 1.1}px / ${l.r * 0.8}px ${l.r * 0.8}px ${l.r * 1.5}px ${l.r * 1.5}px`, transform: `scale(${Math.max(0, p)})`}} />;
        })}
        {L.map((l, k) => (
          <div key={k} style={{position: 'absolute', left: [330, 120, 560][k], top: [300, 120, 140][k], textAlign: 'center', opacity: pop(t, l.a + 0.2)}}>
            <div style={{width: 140, height: 140, borderRadius: 70, overflow: 'hidden', border: `6px solid ${l.c}`, margin: '0 auto'}}><Img src={PH(l.ph)} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 24, color: l.c, marginTop: 6, width: 160, marginLeft: -10}}>{l.l}</div>
          </div>
        ))}
        <svg width={800} height={820} style={{position: 'absolute', inset: 0}}>
          {Array.from({length: 9}, (_, k) => <line key={k} x1={80 + k * 80} y1={740} x2={80 + k * 80 - 40} y2={lerp(740, 800, net)} stroke={MARK} strokeWidth={3} opacity={net} />)}
          <path d={`M40 740 Q 400 ${lerp(740, 820, net)} 760 740`} fill="none" stroke={MARK} strokeWidth={6} opacity={net} />
        </svg>
      </Abs>
      <Abs x={0} y={1240} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={70.5} c={INK} size={28}>super exhaustif</Pill><Pill at={72.7} c={MARK} size={28}>de l’humain à la machine</Pill></Abs>
      <Cite y={1330} at={75.3} text="filet de sécurité" />
    </Out>
  );
};

/* ═════════════ SECTION 2 ═════════════ */
const Racines: React.FC = () => {
  const t = useT();
  const zoom = prog(t, 95.4, 97.0, easeInOut);
  const cut = prog(t, 103.4, 104.1, easeIn);
  return (
    <Out end={106.3}>
      <Center y={320}><Kin text="Identifier les causes" at={86.6} size={60} color={ORANGE} /></Center>
      <Abs x={140} y={420} w={800} h={560} style={{borderRadius: 30, overflow: 'hidden', background: 'linear-gradient(180deg, #EAF3FF 0 45%, #D9C4A3 45%)', boxShadow: '0 20px 40px rgba(20,33,61,0.15)', opacity: pop(t, 85.0)}}>
        <div style={{position: 'absolute', left: 320, top: 60}}><F n="arbre" size={170} /></div>
        <svg width={800} height={560} style={{position: 'absolute', inset: 0}}>
          <Stroke d="M405 252 L405 320 M405 290 L340 360 M405 300 L470 380 M405 320 L395 460 M340 360 L300 430 M470 380 L520 470" at={95.4} c="#7A5230" w={8} dur={1.2} len={900} />
        </svg>
        <div style={{position: 'absolute', left: lerp(560, 360, zoom), top: lerp(80, 330, zoom), opacity: pop(t, 95.4), transform: `scale(${1 + zoom * 0.2})`}}><F n="loupe" size={150} /></div>
        <div style={{position: 'absolute', left: 20, top: 20}}><Pill at={90.1} c={ORANGE} size={24}>l’anticipation</Pill></div>
        <div style={{position: 'absolute', right: 20, bottom: 20}}><Pill at={96.9} c="#7A5230" size={24}>la racine du problème</Pill></div>
      </Abs>
      <Abs x={60} y={1020} w={960} h={180} style={{opacity: pop(t, 101.3)}}>
        <div style={{position: 'absolute', left: 0, top: 50, width: 300, height: 90, borderRadius: 20, background: `${GOLD}33`, border: `5px solid ${GOLD}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 28}}>risque potentiel</div>
        <div style={{position: 'absolute', right: 0, top: 50, width: 300, height: 90, borderRadius: 20, background: `${RED}22`, border: `5px solid ${RED}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: RED, opacity: 1 - cut * 0.6}}>accident</div>
        <div style={{position: 'absolute', left: 310, right: 310, top: 90, height: 12, background: INK, borderRadius: 6, clipPath: `inset(0 ${cut * 50}% 0 0)`}} />
        {t > 103.0 && <div style={{position: 'absolute', left: 430, top: 30, transform: `rotate(${-30 + cut * 40}deg)`}}><F n="ciseaux" size={100} /></div>}
      </Abs>
      <Stamp at={104.8} c={GREEN} text="la vraie prévention" x={290} y={1240} rot={-5} size={48} />
    </Out>
  );
};
const DeuxAxes: React.FC = () => {
  const t = useT();
  const wipe = prog(t, 115.3, 116.3, easeInOut);
  const zero = prog(t, 118.2, 118.8, easeOut);
  return (
    <Out end={131.7}>
      <Center y={300}><Kin text="Deux axes de frappe" at={106.4} size={60} color={ORANGE} /></Center>
      <Abs x={30} y={400} w={500} h={780} style={{borderRadius: 28, background: `${BLUE}14`, border: `5px solid ${BLUE}`, overflow: 'hidden', opacity: pop(t, 109.5)}}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 30, textAlign: 'center'}}><F n="bouclier" size={150} /></div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 200, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: BLUE}}>Préventives</div>
        <div style={{position: 'absolute', left: 30, right: 30, top: 270, display: 'flex', flexDirection: 'column', gap: 14, fontFamily: sansFont, fontWeight: 800, fontSize: 28, color: INK}}>
          <div style={{opacity: pop(t, 111.2)}}>✓ procédures à la lettre</div><div style={{opacity: pop(t, 113.4)}}>✓ esquiver les dangers</div><div style={{opacity: pop(t, 114.3)}}>✓ proactif</div>
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 30, textAlign: 'center'}}><Pill at={126.5} c={BLUE} size={28}>proactivité</Pill></div>
      </Abs>
      <Abs x={550} y={400} w={500} h={780} style={{borderRadius: 28, background: `${RED}10`, border: `5px solid ${RED}`, overflow: 'hidden', clipPath: `inset(0 ${(1 - wipe) * 100}% 0 0 round 28px)`}}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 30, textAlign: 'center'}}><F n="boite-outils" size={150} /></div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 200, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: RED}}>Correctives</div>
        <div style={{position: 'absolute', left: 30, right: 30, top: 270, display: 'flex', flexDirection: 'column', gap: 14, fontFamily: sansFont, fontWeight: 800, fontSize: 28, color: INK}}>
          <div style={{opacity: pop(t, 120.8)}}>⚡ actions précises</div><div style={{opacity: pop(t, 122.1)}}>⚡ réagir efficacement</div><div style={{opacity: pop(t, 124.7)}}>⚡ quand l’accident survient</div>
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 30, textAlign: 'center'}}><Pill at={128.1} c={RED} size={28}>réactivité</Pill></div>
      </Abs>
      {t > 118 && t < 121 && (
        <Abs x={340} y={620} w={400} h={300} style={{opacity: pop(t, 118.2) * (1 - prog(t, 120.4, 121)), zIndex: 6}}>
          <div style={{width: 260, height: 260, margin: '0 auto', borderRadius: 130, background: '#fff', border: `12px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 150, color: INK, position: 'relative'}}>0<div style={{position: 'absolute', left: -20, right: -20, top: '50%', height: 18, background: RED, transform: `rotate(-35deg) scaleX(${zero})`}} /></div>
          <div style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: RED, marginTop: 10}}>le risque zéro n’existe pas</div>
        </Abs>
      )}
      {t > 129 && <Abs x={430} y={1080} style={{zIndex: 6}}><div style={{display: 'flex'}}><div style={{transform: `rotate(${t * 80}deg)`}}><F n="engrenage" size={110} /></div><div style={{transform: `rotate(${-t * 80 + 18}deg)`, marginLeft: -20, marginTop: 40}}><F n="engrenage" size={90} /></div></div></Abs>}
    </Out>
  );
};

/* ═════════════ SECTION 3 ═════════════ */
const Cascade: React.FC = () => {
  const t = useT();
  const L = [{k: 'DST', l: 'rattachée au ministère du Travail', s: 'initiation', a: 142.9, c: INK, ic: 'juge'}, {k: 'CCNSS', l: 'Comité consultatif national', s: 'consultation', a: 146.9, c: '#5B4FCF', ic: 'bulle'}, {k: 'TERRAIN', l: 'employeurs + employés', s: 'élaboration collaborative', a: 154.1, c: TEAL, ic: 'equipe'}];
  const fall = prog(t, 158.4, 159.6, easeIn);
  return (
    <Out end={163.0}>
      <Center y={320}><Kin text="Une hiérarchie très précise" at={140.1} size={56} color={TEAL} /></Center>
      {L.map((l, k) => (
        <Card key={k} x={80 + k * 60} y={420 + k * 250} w={800} h={210} at={l.a} c={l.c} style={{display: 'flex', alignItems: 'center', gap: 22, transform: k === 2 ? `scale(${1 + 0.04 * Math.sin(t * 3)})` : undefined}}>
          <F n={l.ic} size={100} />
          <div style={{flex: 1}}>
            <div style={{display: 'flex', gap: 3}}>{l.k.split('').map((ch, j) => <Flap key={j} ch={ch} at={l.a + j * 0.05} h={56} c={l.c} n={5} />)}</div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 28, color: INK, marginTop: 8}}>{l.l}</div>
            <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 22, color: DIM}}>{l.s}</div>
          </div>
          {k === 2 && <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 22, color: '#fff', background: TEAL, padding: '6px 12px', borderRadius: 10, opacity: pop(t, 150.9)}}>décisive</div>}
        </Card>
      ))}
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}><Stroke d="M200 640 C 160 680, 180 700, 240 690" at={145.5} c={MARK} w={6} len={200} /><Stroke d="M260 890 C 220 930, 240 950, 300 940" at={153.2} c={MARK} w={6} len={200} /></svg>
      {t > 158.3 && (
        <Abs x={760} y={lerp(300, 1100, fall)} style={{opacity: 1 - prog(t, 159.6, 160.2), zIndex: 6}}><div style={{position: 'relative'}}><F n="parchemin" size={90} /><div style={{position: 'absolute', left: -10, top: 40, width: 110, height: 10, background: RED, transform: 'rotate(-35deg)'}} /></div></Abs>
      )}
      <Cite y={1180} at={142.9} text="sigles tels qu’énoncés dans la vidéo d’origine" />
      <Stamp at={160.0} c={TEAL} text="un travail d'équipe" x={280} y={1240} rot={-5} size={48} />
    </Out>
  );
};
const Humain: React.FC = () => {
  const t = useT();
  const day = prog(t, 177.6, 181.0, easeInOut);
  const sunA = Math.PI * (1 - day);
  return (
    <Out end={OUTRO_AT}>
      <Card x={70} y={320} w={940} at={163.1} c={RED}>
        <div style={{fontFamily: 'Georgia, serif', fontSize: 120, color: RED, lineHeight: 0.6, opacity: 0.8}}>“</div>
        <Kin text="Un outil essentiel pour la sécurité des travailleurs." at={164.4} size={50} />
      </Card>
      <Abs x={0} y={640} w={1080} style={{display: 'flex', justifyContent: 'center', gap: 14}}><Pill at={170.7} c={MARK} size={30}>un effort profondément humain</Pill><Pill at={174.8} c={RED} size={30}>préserver la santé</Pill></Abs>
      <Abs x={90} y={760} w={900} h={460} style={{borderRadius: 30, overflow: 'hidden', background: `linear-gradient(180deg, ${day < 0.5 ? '#FFF4D6' : '#E7EAF6'}, #F7F3EA)`, boxShadow: '0 20px 40px rgba(20,33,61,0.15)', opacity: pop(t, 176.2)}}>
        <svg width={900} height={460} style={{position: 'absolute', inset: 0}}><path d="M80 380 A370 300 0 0 1 820 380" fill="none" stroke="#DDE3EC" strokeWidth={6} strokeDasharray="10 14" /></svg>
        <div style={{position: 'absolute', left: 450 + Math.cos(sunA) * 370 - 50, top: 380 - Math.sin(sunA) * 300 - 50}}>{day < 0.75 ? <F n="soleil" size={100} /> : <div style={{width: 80, height: 80, borderRadius: 40, background: '#3A4466', boxShadow: 'inset -22px -4px 0 0 #F2E8C9'}} />}</div>
        <div style={{position: 'absolute', left: 40, bottom: 30, textAlign: 'center'}}><F n="usine" size={110} /><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 22}}>le matin</div></div>
        <div style={{position: 'absolute', right: 40, bottom: 30, textAlign: 'center'}}><F n="maison" size={110} /><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 22}}>le soir</div></div>
        <div style={{position: 'absolute', left: lerp(150, 690, day), bottom: 40, transform: `translateY(${-Math.abs(Math.sin(day * 30)) * 8}px)`}}><F n="ouvrier" size={100} /></div>
      </Abs>
      {t > 180.5 && <Center y={1250}><Kin text="rentrer chez soi sain et sauf" at={180.6} size={56} color={GREEN} /></Center>}
      {t > 181 && <Dust n={22} />}
    </Out>
  );
};

const rep = (a: number, n: number, d: number, s0: string, v: number): Sfx[] => Array.from({length: n}, (_, k) => ({at: a + k * d, s: s0, v, dur: 0.6}));
const flaps = (a: number, n: number): Sfx[] => rep(a, n, 0.06, 'tick', 0.16);
const CUES: Sfx[] = [
  {at: 0.05, s: 'sfx/pop', v: 0.35}, {at: 2.0, s: 'soft-whoosh', v: 0.5, dur: 2},
  ...SECT.flatMap((x) => [{at: x.at, s: 'sfx/swish', v: 0.45}, {at: x.at + 0.25, s: 'soft-whoosh', v: 0.35, dur: 1}, ...rep(x.at + 0.4, 4, 0.07, 'sfx/thud', 0.22), {at: x.at + 0.8, s: 'stylo', v: 0.4}, {at: x.at + 1.8, s: 'stylo', v: 0.3}, {at: x.at + 3.1, s: 'sfx/swish', v: 0.35}]),
  {at: 4.4, s: 'sfx/pop', v: 0.22}, {at: 5.5, s: 'sfx/rise', v: 0.25}, {at: 7.3, s: 'sfx/pop', v: 0.22},
  ...rep(11.95, 3, 0.07, 'sfx/thud', 0.28), {at: 16.3, s: 'sfx/pop', v: 0.2}, {at: 17.0, s: 'sfx/pop', v: 0.2}, {at: 19.6, s: 'sfx/swish', v: 0.3}, {at: 21.3, s: 'sfx/rise', v: 0.25}, {at: 24.1, s: 'sfx/whoosh', v: 0.3}, {at: 25.8, s: 'stylo', v: 0.35}, {at: 26.4, s: 'stylo', v: 0.35},
  {at: 37.9, s: 'sfx/pop', v: 0.2}, {at: 39.6, s: 'sfx/pop', v: 0.2}, {at: 40.7, s: 'sfx/pop', v: 0.2}, {at: 43.0, s: 'bass-hit', v: 0.4}, {at: 47.4, s: 'sfx/swish', v: 0.3}, {at: 48.9, s: 'soft-whoosh', v: 0.3}, {at: 52.8, s: 'sfx/ding', v: 0.22},
  ...[61.9, 64.9, 65.7].map((a) => ({at: a, s: 'sfx/thud', v: 0.3})), {at: 75.3, s: 'sfx/swish', v: 0.3},
  {at: 85.0, s: 'soft-whoosh', v: 0.3}, {at: 95.4, s: 'stylo', v: 0.35}, {at: 96.9, s: 'sfx/ding', v: 0.22}, {at: 103.4, s: 'sfx/swish', v: 0.35}, {at: 104.1, s: 'sfx/thud', v: 0.3}, {at: 104.8, s: 'tampon', v: 0.45},
  {at: 109.5, s: 'sfx/whoosh', v: 0.3}, {at: 115.3, s: 'sfx/whoosh', v: 0.3}, {at: 118.2, s: 'deep-hit', v: 0.4}, {at: 118.6, s: 'sfx/swish', v: 0.3}, {at: 126.5, s: 'sfx/pop', v: 0.22}, {at: 128.1, s: 'sfx/pop', v: 0.22}, {at: 129.0, s: 'sfx/rise', v: 0.25},
  ...[142.9, 146.9, 154.1].flatMap((a) => [{at: a, s: 'sfx/whoosh', v: 0.25}, ...flaps(a, 8)]), {at: 158.4, s: 'sfx/whoosh', v: 0.25}, {at: 160.0, s: 'tampon', v: 0.45},
  {at: 163.1, s: 'soft-whoosh', v: 0.3}, {at: 170.7, s: 'sfx/pop', v: 0.22}, {at: 174.8, s: 'sfx/pop', v: 0.22}, {at: 177.6, s: 'riser', v: 0.25, dur: 3.5}, {at: 181.0, s: 'validation', v: 0.4},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const PlanHse: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <Bg />
    <Gate from={2.6} to={9.3}><PleinRegime /></Gate>
    <Gate from={9.2} to={29.4}><PlanDeMatch /></Gate>
    <Gate from={32.9} to={55.4}><Outil /></Gate>
    <Gate from={55.3} to={77.7}><Bouclier /></Gate>
    <Gate from={81.2} to={106.4}><Racines /></Gate>
    <Gate from={106.3} to={131.8}><DeuxAxes /></Gate>
    <Gate from={135.3} to={163.1}><Cascade /></Gate>
    <Gate from={163.0} to={OUTRO_AT}><Humain /></Gate>
    {SECT.map((x, i) => <Gate key={x.n} from={x.at} to={x.at + 3.9}><Eraser i={i} /></Gate>)}
    <Gate from={0} to={OUTRO_AT}><Header /></Gate>
    <Gate from={0} to={2.8}><Cover /></Gate>
    <Gate from={OUTRO_AT} to={9999}><AbsoluteFill style={{zIndex: 81}}><Outro at={OUTRO_AT} logo={LOGO} /></AbsoluteFill></Gate>
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0.05} to={183.2}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-plan-hse-origine.m4a')} trimAfter={s(183.4)} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);

export const _u = [Blinds, Deep, random, Board];
