import React from 'react';
import {AbsoluteFill, Img, random} from 'remotion';
import {F} from '../iso/ui';
import {Abs, BLUE, Chip, CYAN, DIM, easeIn, easeInOut, easeOut, Glow, GREEN, Hud, LINE, Mono, NIGHT, ORANGE, PANEL, PH, pop, prog, PT, RED, Row, Sc, spring, T, Title, useT, YEL} from './kit';

/* ─────────── INTRO ─────────── */

/** Trois piliers J-S-A soutiennent le fronton « Sécurité industrielle », puis l'acronyme se déplie. */
const Pillars: React.FC = () => {
  const t = useT();
  const W = ['Job', 'Safety', 'Analysis'];
  const unfold = prog(t, 8.4, 10.2, easeInOut);
  return (
    <AbsoluteFill>
      <Abs x={110} y={430} w={860} h={120} style={{transform: `translateY(${(1 - spring(t, 5.4, 6, 10)) * -500}px)`, clipPath: 'polygon(6% 100%, 50% 0, 94% 100%)', background: `linear-gradient(180deg, ${CYAN}, ${BLUE})`}} />
      <Abs x={110} y={550} w={860} h={70} style={{background: PANEL, border: `3px solid ${CYAN}`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `translateY(${(1 - spring(t, 5.4, 6, 10)) * -500}px)`}}><T size={38} style={{letterSpacing: 6}}>SÉCURITÉ INDUSTRIELLE</T></Abs>
      {['J', 'S', 'A'].map((l, i) => {
        const rise = spring(t, 3.2 + i * 0.35, 6, 11);
        return (
          <Abs key={l} x={160 + i * 290} y={640} w={180} h={620} style={{transformOrigin: '50% 100%', transform: `scaleY(${rise})`}}>
            <div style={{width: '100%', height: '100%', borderRadius: 10, background: `repeating-linear-gradient(90deg, #1C3260 0 22px, #233D73 22px 44px)`, border: `3px solid ${CYAN}88`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <T size={150} color="#fff" style={{textShadow: `0 0 40px ${CYAN}`}}>{l}</T>
            </div>
          </Abs>
        );
      })}
      <Abs x={110} y={1270} w={860} h={40} style={{background: PANEL, border: `3px solid ${CYAN}`, borderRadius: 8}} />
      <Row y={1350} gap={6}>
        {W.map((w, i) => <T key={w} size={56}><Glow>{w[0]}</Glow><span style={{display: 'inline-block', maxWidth: unfold * 330, overflow: 'hidden', verticalAlign: 'bottom', whiteSpace: 'nowrap'}}>{w.slice(1)}</span>{i < 2 ? ' ' : ''}</T>)}
      </Row>
    </AbsoluteFill>
  );
};

/** Le hasard est interdit : un dé en 3D roule puis se fait barrer ; réagir après coup est refusé. */
const Dice: React.FC = () => {
  const t = useT();
  const roll = prog(t, 14.4, 15.9, easeOut);
  const S = 280;
  const face = (tr: string, dots: number[][]) => (
    <div style={{position: 'absolute', width: S, height: S, background: '#F4F7FF', borderRadius: 34, border: `6px solid ${BLUE}`, transform: tr, backfaceVisibility: 'hidden'}}>
      {dots.map(([x, y], i) => <div key={i} style={{position: 'absolute', left: x * S - 22, top: y * S - 22, width: 44, height: 44, borderRadius: 22, background: NIGHT}} />)}
    </div>
  );
  const cross = prog(t, 16.0, 16.5);
  return (
    <AbsoluteFill>
      <Title>Industries à <Glow c={RED}>haut risque</Glow></Title>
      <Abs x={540 - S / 2 + (1 - roll) * -500} y={560} w={S} h={S} style={{perspective: 1600}}>
        <div style={{position: 'relative', width: S, height: S, transformStyle: 'preserve-3d', transform: `rotateX(${roll * 720 + 20}deg) rotateY(${roll * 540 - 30}deg)`}}>
          {face(`translateZ(${S / 2}px)`, [[0.5, 0.5]])}
          {face(`rotateY(180deg) translateZ(${S / 2}px)`, [[0.25, 0.25], [0.75, 0.25], [0.25, 0.75], [0.75, 0.75], [0.5, 0.5], [0.5, 0.25]])}
          {face(`rotateY(90deg) translateZ(${S / 2}px)`, [[0.25, 0.25], [0.75, 0.75]])}
          {face(`rotateY(-90deg) translateZ(${S / 2}px)`, [[0.25, 0.25], [0.5, 0.5], [0.75, 0.75]])}
          {face(`rotateX(90deg) translateZ(${S / 2}px)`, [[0.25, 0.25], [0.75, 0.25], [0.25, 0.75], [0.75, 0.75]])}
          {face(`rotateX(-90deg) translateZ(${S / 2}px)`, [[0.25, 0.25], [0.75, 0.25], [0.25, 0.75], [0.75, 0.75], [0.5, 0.5]])}
        </div>
      </Abs>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <circle cx={540} cy={700} r={230} fill="none" stroke={RED} strokeWidth={20} strokeDasharray={1446} strokeDashoffset={1446 * (1 - cross)} />
        <line x1={378} y1={862} x2={378 + 324 * cross} y2={862 - 324 * cross} stroke={RED} strokeWidth={20} />
      </svg>
      {t > 16.0 && <Row y={980}><Chip c={RED} size={46}>Pas de place pour le hasard</Chip></Row>}
      {t > 18.1 && (
        <Row y={1140} gap={20}>
          <div style={{opacity: pop(t, 18.1), display: 'flex', alignItems: 'center', gap: 14, padding: '14px 26px', borderRadius: 22, background: PANEL, border: `3px solid ${LINE}`, textDecoration: prog(t, 19.3, 19.6) > 0.5 ? 'line-through' : 'none'}}><F n="ambulance" size={70} /><T size={36} color={DIM}>Réagir après coup</T></div>
        </Row>
      )}
    </AbsoluteFill>
  );
};

/** Anticipation millimétrée : un micromètre se serre jusqu'au réglage parfait. */
const Micro: React.FC = () => {
  const t = useT();
  const sq = prog(t, 20.8, 22.4, easeInOut);
  const val = (12.5 - sq * 12.49).toFixed(2);
  return (
    <AbsoluteFill>
      <Title>Une anticipation <Glow>millimétrée</Glow></Title>
      <svg width={1080} height={700} style={{position: 'absolute', left: 0, top: 520}}>
        <path d="M 160 120 L 160 460 Q 160 560 300 560 L 640 560 Q 760 560 760 440 L 760 400" stroke="#8C9AB8" strokeWidth={60} fill="none" strokeLinecap="round" />
        <rect x={130} y={240} width={60} height={110} fill="#8C9AB8" />
        <rect x={190 + (1 - sq) * 140} y={265} width={420 - (1 - sq) * 140} height={60} fill="#C9D3E6" />
        <rect x={610} y={230} width={240} height={130} rx={14} fill={BLUE} />
        {Array.from({length: 12}, (_, i) => <line key={i} x1={620 + i * 20} y1={230} x2={620 + i * 20} y2={260 + (i % 2) * 14} stroke="#fff" strokeWidth={3} transform={`translate(${(sq * 400) % 20},0)`} />)}
        <rect x={850} y={250} width={110} height={90} rx={12} fill="#1C3260" />
      </svg>
      <Hud x={300} y={1180} w={480} h={150} c={GREEN}><Abs x={0} y={30} w={480} style={{textAlign: 'center'}}><Mono size={70} color={sq > 0.98 ? GREEN : CYAN}>{val} mm</Mono></Abs></Hud>
      {t > 22.6 && <Row y={1380}><div style={{transform: `scale(${spring(t, 22.6)})`}}><Chip c={GREEN} dark size={42}>✓ Méthode infaillible</Chip></div></Row>}
    </AbsoluteFill>
  );
};

/** Radar : le balayage verrouille les dangers, qui sont neutralisés avant de surgir. */
const TGT = [{a: 0.7, r: 0.55, ic: 'eclair'}, {a: 2.2, r: 0.75, ic: 'feu'}, {a: 3.6, r: 0.4, ic: 'danger'}, {a: 5.0, r: 0.65, ic: 'echelle'}];
const Radar: React.FC = () => {
  const t = useT();
  const R = 380, cx = 540, cy = 900;
  const sweep = ((t - 26.3) * 2.2) % (Math.PI * 2);
  const kill = prog(t, 34.0, 35.6, (x) => x);
  return (
    <AbsoluteFill>
      <Title>Une arme <Glow c={GREEN}>proactive</Glow></Title>
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {[1, 0.66, 0.33].map((k) => <circle key={k} cx={cx} cy={cy} r={R * k} fill="none" stroke={`${GREEN}55`} strokeWidth={3} />)}
        <line x1={cx - R} y1={cy} x2={cx + R} y2={cy} stroke={`${GREEN}33`} strokeWidth={2} /><line x1={cx} y1={cy - R} x2={cx} y2={cy + R} stroke={`${GREEN}33`} strokeWidth={2} />
        <path d={`M ${cx} ${cy} L ${cx + Math.cos(sweep) * R} ${cy + Math.sin(sweep) * R} A ${R} ${R} 0 0 0 ${cx + Math.cos(sweep - 0.6) * R} ${cy + Math.sin(sweep - 0.6) * R} Z`} fill={`${GREEN}44`} />
        <line x1={cx} y1={cy} x2={cx + Math.cos(sweep) * R} y2={cy + Math.sin(sweep) * R} stroke={GREEN} strokeWidth={5} />
      </svg>
      {TGT.map((g, i) => {
        const x = cx + Math.cos(g.a) * R * g.r, y = cy + Math.sin(g.a) * R * g.r;
        const seen = t > 27.5 + i * 0.9;
        const locked = t > 29.5 + i * 0.9;
        const dead = prog(t, 34.0 + i * 0.3, 34.5 + i * 0.3);
        return (
          <React.Fragment key={i}>
            <Abs x={x - 50} y={y - 50} style={{opacity: seen ? 1 - dead : 0, transform: `scale(${1 - dead * 0.6})`}}><F n={g.ic} size={100} /></Abs>
            {locked && <Abs x={x - 75} y={y - 75} w={150} h={150} style={{border: `4px solid ${RED}`, borderRadius: 12, opacity: 1 - dead, transform: `scale(${1.4 - pop(t, 29.5 + i * 0.9) * 0.4}) rotate(45deg)`}} />}
            {dead > 0 && <Abs x={x - 40} y={y - 40} style={{opacity: dead * (1 - prog(t, 35.6, 36.4))}}><T size={70} color={GREEN}>✓</T></Abs>}
          </React.Fragment>
        );
      })}
      {kill > 0 && <Row y={1360}><Chip c={GREEN} dark size={40}>Dangers neutralisés… avant</Chip></Row>}
    </AbsoluteFill>
  );
};

/** Le programme en nid d'abeilles : 6 alvéoles s'allument une à une. */
const PROG = [38.1, 40.5, 42.7, 45.4, 47.5, 51.2];
const Hexes: React.FC = () => {
  const t = useT();
  const pos = [[300, 520], [780, 520], [540, 760], [300, 1000], [780, 1000], [540, 1240]];
  return (
    <AbsoluteFill>
      <Title>Au <Glow>programme</Glow></Title>
      {PT.map((p, i) => {
        const on = t > PROG[i] - 0.15;
        const [x, y] = pos[i];
        return (
          <Abs key={i} x={x - 200} y={y - 130} w={400} h={260} style={{clipPath: 'polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%)', background: on ? `linear-gradient(160deg, ${p.c}, ${p.c}99)` : PANEL, opacity: pop(t, 36.7 + i * 0.12), transform: `scale(${on ? 1 + Math.max(0, 1 - (t - PROG[i]) * 3) * 0.1 : 0.92})`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 70px', boxSizing: 'border-box'}}>
            <T size={60} color={on ? '#fff' : DIM}>0{p.n}</T>
            <T size={30} color={on ? '#fff' : DIM}>{p.l}</T>
          </Abs>
        );
      })}
    </AbsoluteFill>
  );
};

export const Intro: React.FC = () => (
  <AbsoluteFill>
    <Sc a={2.5} b={12.7}><Pillars /></Sc>
    <Sc a={12.6} b={20.7}><Dice /></Sc>
    <Sc a={20.6} b={26.4}><Micro /></Sc>
    <Sc a={26.3} b={36.7}><Radar /></Sc>
    <Sc a={36.6} b={53.3}><Hexes /></Sc>
  </AbsoluteFill>
);

/* ─────────── PARTIE 1 : les fondements ─────────── */

/** Deux badges JSA / JHA qui se superposent : même outil, deux noms. */
const Names: React.FC = () => {
  const t = useT();
  const merge = prog(t, 64.8, 65.8, easeInOut);
  const B = ({c, a, b, x}: {c: string; a: string; b: string; x: number}) => (
    <Hud x={x} y={600} w={420} h={300} c={c}>
      <Abs x={0} y={50} w={420} style={{textAlign: 'center'}}><T size={110} color={c}>{a}</T><Mono size={24} color={DIM}>{b}</Mono></Abs>
    </Hud>
  );
  return (
    <AbsoluteFill>
      <Title>Deux noms, un seul outil</Title>
      <B c={CYAN} a="JSA" b="JOB SAFETY ANALYSIS" x={60 - merge * 20} />
      <div style={{opacity: pop(t, 61.3)}}><B c={GREEN} a="JHA" b="JOB HAZARD ANALYSIS" x={600 + merge * 20} /></div>
      {merge > 0.3 && <Abs x={490} y={690} w={100} style={{textAlign: 'center', transform: `scale(${spring(t, 65.0)})`}}><T size={110} color={YEL}>=</T></Abs>}
      {merge > 0.6 && <Row y={1000}><div style={{transform: `scale(${spring(t, 65.6)})`}}><Chip c={BLUE} size={46}>🏆 L’outil de référence en QHSE</Chip></div></Row>}
    </AbsoluteFill>
  );
};

/** Ligne du temps : la JSA se place avant le top départ des travaux. */
const Before: React.FC = () => {
  const t = useT();
  const mk = spring(t, 69.0, 6, 11);
  return (
    <AbsoluteFill>
      <Title>Son super pouvoir : intervenir <Glow c={GREEN}>avant</Glow></Title>
      <div style={{position: 'absolute', left: 80, right: 80, top: 900, height: 8, background: LINE, borderRadius: 4}} />
      <div style={{position: 'absolute', left: 80, top: 900, width: 920 * prog(t, 68.0, 69.0), height: 8, background: CYAN, borderRadius: 4, boxShadow: `0 0 20px ${CYAN}`}} />
      <Abs x={640} y={720} w={260} style={{textAlign: 'center'}}><F n="chantier" size={110} /><div style={{width: 6, height: 70, background: ORANGE, margin: '0 auto'}} /><Mono color={ORANGE} size={26}>T0 · DÉBUT</Mono></Abs>
      <Abs x={190} y={560} w={300} style={{textAlign: 'center', transform: `translateY(${(1 - mk) * -300}px)`}}>
        <Hud x={20} y={0} w={260} h={140} c={GREEN}><Abs x={0} y={34} w={260} style={{textAlign: 'center'}}><T size={64} color={GREEN}>JSA</T></Abs></Hud>
        <div style={{position: 'absolute', left: 147, top: 150, width: 6, height: 190, background: GREEN}} />
        <Mono color={GREEN} size={26} style={{position: 'absolute', top: 400, width: 300}}>T – 1</Mono>
      </Abs>
    </AbsoluteFill>
  );
};

/** Pas un formulaire de plus : la liasse passe au broyeur ; place à l'enquête. */
const Shred: React.FC = () => {
  const t = useT();
  const sh = prog(t, 74.0, 76.0, (x) => x);
  const inv = t > 76.9;
  return (
    <AbsoluteFill>
      <Title>Pas un énième formulaire…</Title>
      <Abs x={290} y={500 + sh * 420} w={500} h={600} style={{clipPath: `inset(0 0 ${sh * 70}% 0)`, background: '#fff', borderRadius: 8, boxShadow: '0 20px 40px rgba(20,33,61,0.2)', padding: 40, boxSizing: 'border-box', opacity: inv ? 0.25 : 1}}>
        <T size={34} color={NIGHT}>FORMULAIRE ADM-47</T>
        {Array.from({length: 9}, (_, i) => <div key={i} style={{marginTop: 30, height: 14, width: `${60 + (i % 3) * 12}%`, background: '#8C9AB8', borderRadius: 7}} />)}
      </Abs>
      <Abs x={240} y={920} w={600} h={180} style={{background: '#33415F', borderRadius: 20, border: `4px solid ${LINE}`, opacity: inv ? 0.25 : 1}}>
        <div style={{margin: '30px 40px', height: 16, borderRadius: 8, background: NIGHT}} />
      </Abs>
      {Array.from({length: 12}, (_, i) => (
        <div key={i} style={{position: 'absolute', left: 300 + i * 40, top: 1100, width: 26, height: sh * 260 * (0.7 + random(`s${i}`) * 0.3), background: '#fff', border: '1px solid #C9D3E6', opacity: inv ? 0.25 : 1}} />
      ))}
      {inv && (
        <AbsoluteFill style={{opacity: pop(t, 76.9)}}>
          <Hud x={160} y={560} w={760} h={500} c={CYAN}>
            <Abs x={0} y={60} w={760} style={{textAlign: 'center'}}><F n="detective" size={200} /><T size={56} style={{marginTop: 20}}>Une démarche</T><T size={56}><Glow>d’investigation</Glow></T></Abs>
          </Hud>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/** La mission globale se fracture en petites étapes, et une étape passe au microscope. */
const Fracture: React.FC = () => {
  const t = useT();
  const br = prog(t, 80.2, 81.4, easeOut);
  const zoom = prog(t, 83.4, 84.6, easeInOut);
  const C = 4, R = 3, W = 920, H = 690;
  return (
    <AbsoluteFill>
      <Title>On fracture la mission en étapes</Title>
      {Array.from({length: C * R}, (_, i) => {
        const cx = i % C, cy = Math.floor(i / C);
        const tw = W / C, th = H / R;
        const sel = i === 6;
        const dx = (cx - 1.5) * 30 * br, dy = (cy - 1) * 30 * br;
        const z = sel ? zoom : 0;
        return (
          <div key={i} style={{position: 'absolute', left: 80 + cx * tw + dx - z * (cx * tw - 80), top: 480 + cy * th + dy - z * (cy * th - 120), width: tw * (1 + z * 2.2), height: th * (1 + z * 2.2), overflow: 'hidden', borderRadius: 10 * br + 4, border: sel && zoom > 0 ? `5px solid ${CYAN}` : `2px solid ${NIGHT}`, opacity: sel ? 1 : 1 - zoom * 0.8, zIndex: sel ? 2 : 1, transform: `rotate(${(random(`f${i}`) - 0.5) * 8 * br * (1 - z)}deg)`}}>
            <Img src={PH('promo/hse-machine.jpg')} style={{position: 'absolute', left: -cx * tw * (1 + z * 2.2), top: -cy * th * (1 + z * 2.2), width: W * (1 + z * 2.2), height: H * (1 + z * 2.2), objectFit: 'cover'}} />
            {sel && zoom > 0.9 && <div style={{position: 'absolute', left: 20, top: 20}}><Chip c={CYAN} dark size={30}>🔬 ÉTAPE 07 · AU MICROSCOPE</Chip></div>}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

/** Dénicher → évaluer → barrière : la barrière levante s'abaisse. */
const Barrier: React.FC = () => {
  const t = useT();
  const down = prog(t, 89.2, 89.9, easeIn);
  const S = [{at: 86.0, ic: 'loupe', l: 'Dénicher le danger caché', c: CYAN}, {at: 87.4, ic: 'thermometre', l: 'Évaluer le risque', c: ORANGE}, {at: 88.8, ic: 'barriere', l: 'Dresser une barrière', c: GREEN}];
  return (
    <AbsoluteFill>
      {S.map((s, i) => (
        <Abs key={i} x={110} y={360 + i * 190} w={860} h={160} style={{opacity: pop(t, s.at), transform: `translateX(${(1 - pop(t, s.at)) * -80}px)`, display: 'flex', alignItems: 'center', gap: 24, background: PANEL, borderRadius: 24, border: `3px solid ${s.c}`, padding: '0 30px', boxSizing: 'border-box'}}>
          <Mono size={40} color={s.c}>0{i + 1}</Mono><F n={s.ic} size={90} /><T size={40}>{s.l}</T>
        </Abs>
      ))}
      <Abs x={140} y={1040} w={40} h={300} style={{background: '#8C9AB8', borderRadius: 8}} />
      <Abs x={160} y={1060} w={760} h={50} style={{transformOrigin: '0 50%', transform: `rotate(${-80 + down * 80}deg)`, background: `repeating-linear-gradient(90deg, ${RED} 0 70px, #fff 70px 140px)`, borderRadius: 12, boxShadow: '0 10px 20px rgba(0,0,0,0.4)'}} />
      {t > 89.9 && <Row y={1180}><div style={{transform: `scale(${spring(t, 89.9)})`}}><Chip c={GREEN} dark size={44}>La proactivité à l’état pur</Chip></div></Row>}
    </AbsoluteFill>
  );
};

export const P1: React.FC = () => (
  <AbsoluteFill>
    <Sc a={56.0} b={67.8}><Names /></Sc>
    <Sc a={67.7} b={71.8}><Before /></Sc>
    <Sc a={71.7} b={78.8}><Shred /></Sc>
    <Sc a={78.7} b={85.3}><Fracture /></Sc>
    <Sc a={85.2} b={92.5}><Barrier /></Sc>
  </AbsoluteFill>
);

