import React from 'react';
import {AbsoluteFill, Img, random} from 'remotion';
import {F} from '../iso/ui';
import {Abs, BLUE, Chip, CYAN, DIM, easeIn, easeInOut, easeOut, Glow, GREEN, Hud, LINE, LotoBoard, Mono, NIGHT, PANEL, PH, Photo, pop, prog, RED, Row, Sc, spring, T, Title, useT, VIO, WHITE, YEL} from './kit';

/* ─────────── PARTIE 4 : les critères de déclenchement ─────────── */

/** La caisse à outils s'ouvre : la fiche JSA en sort. */
const Toolbox: React.FC = () => {
  const t = useT();
  const open = prog(t, 258.4, 259.2, easeOut);
  return (
    <AbsoluteFill>
      <Title>Quand sortir cet outil ?</Title>
      <Abs x={290} y={1000} w={500} h={300} style={{background: `linear-gradient(180deg, ${RED}, #B8323A)`, borderRadius: 24, boxShadow: '0 30px 60px rgba(0,0,0,0.5)'}}><div style={{margin: '120px auto 0', width: 140, height: 40, borderRadius: 10, background: '#C9D3E6'}} /></Abs>
      <Abs x={360} y={1000 - open * 420} w={360} h={440} style={{opacity: open, zIndex: 0}}>
        <Hud x={0} y={0} w={360} h={440} c={YEL}><Abs x={0} y={60} w={360} style={{textAlign: 'center'}}><F n="clipboard" size={150} /><T size={70} color={YEL}>JSA</T></Abs></Hud>
      </Abs>
      <Abs x={270} y={940} w={540} h={80} style={{background: '#D9505B', borderRadius: 18, transformOrigin: '50% 100%', transform: `perspective(800px) rotateX(${open * 70}deg)`}} />
    </AbsoluteFill>
  );
};

/** Panneau d'affichage à volets : les 6 déclencheurs, statut « AVANT ». */
const TRIG = [
  {at: 262.9, l: 'TRAVAUX NON ROUTINIERS'},
  {at: 267.7, l: 'TÂCHES À RISQUE ÉLEVÉ'},
  {at: 269.7, l: 'MAINTENANCE'},
  {at: 271.1, l: 'TRAVAIL EN HAUTEUR'},
  {at: 272.1, l: 'ESPACE CONFINÉ'},
  {at: 275.4, l: 'POINTS CHAUDS'},
];
const CH = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÉÀ ';
const Flap: React.FC<{text: string; at: number; size: number; c: string}> = ({text, at, size, c}) => {
  const t = useT();
  return (
    <div style={{display: 'flex', gap: 3}}>
      {text.split('').map((ch, i) => {
        const done = t > at + i * 0.03 + 0.35;
        const sh = done ? ch : t > at ? CH[Math.floor((t * 30 + i * 7) % CH.length)] : ' ';
        return <div key={i} style={{width: size * 0.66, height: size * 1.2, borderRadius: 4, background: '#05080F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontWeight: 700, fontSize: size, color: done ? c : DIM, borderBottom: '2px solid #1A2440', position: 'relative'}}>{sh}<div style={{position: 'absolute', left: 0, right: 0, top: '50%', height: 2, background: '#000'}} /></div>;
      })}
    </div>
  );
};
const Board: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Title>La JSA est requise <Glow c={YEL}>avant</Glow>…</Title>
      <Hud x={40} y={460} w={1000} h={1080} c={YEL}>
        <Abs x={30} y={24} w={940} style={{display: 'flex', justifyContent: 'space-between'}}><Mono size={26} color={YEL}>DÉCLENCHEURS</Mono><Mono size={26} color={YEL}>STATUT</Mono></Abs>
        {TRIG.map((r, i) => (
          <Abs key={i} x={30} y={90 + i * 160} w={940} h={140} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `2px solid ${LINE}`}}>
            <Flap text={r.l.padEnd(23, ' ')} at={r.at - 0.3} size={30} c={WHITE} />
            <div style={{opacity: pop(t, r.at + 0.5), transform: `scale(${spring(t, r.at + 0.5)})`}}><Chip c={GREEN} dark size={26}>AVANT ✓</Chip></div>
          </Abs>
        ))}
      </Hud>
    </AbsoluteFill>
  );
};

/** Double hélice : « AVANT » est l'ADN de la JSA. */
const Dna: React.FC = () => {
  const t = useT();
  const N = 14;
  const L = 'AVANT';
  return (
    <AbsoluteFill>
      <Title>L’<Glow c={YEL}>ADN</Glow> de la JSA</Title>
      {Array.from({length: N}, (_, i) => {
        const y = 470 + i * 70;
        const ph = t * 2.4 + i * 0.55;
        const xa = 540 + Math.sin(ph) * 250, xb = 540 - Math.sin(ph) * 250;
        const za = Math.cos(ph);
        const li = i - 4;
        const letter = li >= 0 && li < L.length;
        const lit = t > 278.0 + li * 0.12;
        return (
          <React.Fragment key={i}>
            <div style={{position: 'absolute', left: Math.min(xa, xb), top: y + 10, width: Math.abs(xa - xb), height: 6, background: letter && lit ? YEL : LINE, opacity: 0.8}} />
            <div style={{position: 'absolute', left: xa - 20, top: y - 7, width: 40, height: 40, borderRadius: 20, background: CYAN, opacity: 0.5 + za * 0.5, transform: `scale(${0.8 + za * 0.25})`}} />
            <div style={{position: 'absolute', left: xb - 20, top: y - 7, width: 40, height: 40, borderRadius: 20, background: GREEN, opacity: 0.5 - za * 0.5, transform: `scale(${0.8 - za * 0.25})`}} />
            {letter && lit && <Abs x={500} y={y - 30} w={80} style={{textAlign: 'center', transform: `scale(${spring(t, 278.0 + li * 0.12)})`}}><T size={70} color={YEL} style={{textShadow: `0 0 30px ${YEL}`}}>{L[li]}</T></Abs>}
          </React.Fragment>
        );
      })}
      {t > 280.6 && <Row y={1480}><Chip c={YEL} dark size={36} style={{opacity: pop(t, 280.6)}}>Anticipation totale · on n’improvise jamais</Chip></Row>}
    </AbsoluteFill>
  );
};

export const P4: React.FC = () => (
  <AbsoluteFill>
    <Sc a={255.3} b={261.2}><Toolbox /></Sc>
    <Sc a={261.1} b={276.3}><Board /></Sc>
    <Sc a={276.2} b={284.5}><Dna /></Sc>
  </AbsoluteFill>
);

/* ─────────── PARTIE 5 : JSA contre évaluation des risques ─────────── */

/** Affiche de match : JSA contre évaluation des risques. */
const Versus: React.FC = () => {
  const t = useT();
  const l = spring(t, 287.2, 5, 9), r = spring(t, 287.5, 5, 9);
  const vs = spring(t, 287.9, 6, 12);
  return (
    <AbsoluteFill>
      <Abs x={0} y={420} w={540} h={1000} style={{transform: `translateX(${(1 - l) * -540}px)`, background: `linear-gradient(160deg, ${BLUE}, #123A8A)`, clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20}}>
        <F n="loupe" size={200} /><T size={110}>JSA</T><Mono size={26} color="#CFE0FF">LA LOUPE</Mono>
      </Abs>
      <Abs x={540} y={420} w={540} h={1000} style={{transform: `translateX(${(1 - r) * 540}px)`, background: `linear-gradient(200deg, ${VIO}, #4B2FA8)`, clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, paddingLeft: 60, boxSizing: 'border-box'}}>
        <F n="globe" size={200} /><T size={50} style={{textAlign: 'center'}}>ÉVALUATION<br />DES RISQUES</T><Mono size={26} color="#E3D9FF">LE GRAND ANGLE</Mono>
      </Abs>
      <Abs x={390} y={770} w={300} h={300} style={{transform: `scale(${vs}) rotate(${(1 - vs) * 90}deg)`, borderRadius: 150, background: YEL, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 80px ${YEL}`}}><T size={140} color={NIGHT}>VS</T></Abs>
      {t > 289.9 && <Row y={1460}><Chip c={PANEL} size={36} style={{opacity: pop(t, 289.9), border: `3px solid ${YEL}`}}>Un truc qui bloque même les pros</Chip></Row>}
    </AbsoluteFill>
  );
};

/** Objectif photo : du grand angle (16 mm) au microscope (200 mm). */
const Lens: React.FC = () => {
  const t = useT();
  const z = prog(t, 302.8, 304.8, easeInOut);
  const mm = Math.round(16 + z * 184);
  const split = t > 310.4;
  const macro = !split ? 1 : 0;
  return (
    <AbsoluteFill>
      <Abs x={60} y={340} w={960} h={1060} style={{borderRadius: 30, overflow: 'hidden', border: `4px solid ${z > 0.5 ? CYAN : VIO}`, opacity: macro || !split ? 1 : 0}}>
        <Img src={PH('smi/raffinerie.jpg')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 1 - z, transform: `scale(${1 + z * 2.5})`, filter: 'contrast(1.1)'}} />
        <Img src={PH('promo/hse-machine.jpg')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '62% 40%', opacity: z, transform: `scale(${0.6 + z * 0.55})`}} />
        <div style={{position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 50%, transparent ${lerpN(70, 34, z)}%, ${NIGHT} ${lerpN(71, 36, z)}%)`}} />
        {[0.25, 0.5, 0.75].map((k) => <div key={k} style={{position: 'absolute', left: `${k * 100}%`, top: 0, bottom: 0, width: 1, background: '#ffffff22', opacity: 1 - z}} />)}
        <div style={{position: 'absolute', left: 30, top: 24}}><Mono size={34} color={z > 0.5 ? CYAN : VIO}>● REC  {mm} mm</Mono></div>
        <div style={{position: 'absolute', left: 30, bottom: 30}}><Chip c={z > 0.5 ? CYAN : VIO} dark={z > 0.5} size={34}>{z > 0.5 ? 'JSA · une loupe, un microscope' : 'Évaluation des risques · grand angle'}</Chip></div>
        {z > 0.9 && t > 305.9 && <div style={{position: 'absolute', right: 30, top: 90, opacity: pop(t, 305.9)}}><Chip c={PANEL} size={28} style={{border: `3px solid ${CYAN}`}}>1 tâche · juste avant l’intervention</Chip></div>}
      </Abs>
      {split && (
        <AbsoluteFill style={{opacity: pop(t, 310.4)}}>
          <Photo src="smi/raffinerie.jpg" x={60} y={460} w={460} h={720} c={VIO}><div style={{position: 'absolute', left: 0, right: 0, bottom: 20, textAlign: 'center'}}><Chip c={VIO} size={36}>MACRO</Chip></div></Photo>
          {t > 312.3 && <Photo src="promo/hse-machine.jpg" x={560} y={460} w={460} h={720} c={CYAN} pos="62% 40%" q={pop(t, 312.3)}><div style={{position: 'absolute', left: 0, right: 0, bottom: 20, textAlign: 'center'}}><Chip c={CYAN} dark size={36}>MICRO</Chip></div></Photo>}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
const lerpN = (a: number, b: number, p: number) => a + (b - a) * p;

export const P5: React.FC = () => (
  <AbsoluteFill>
    <Sc a={286.8} b={295.3}><Versus /></Sc>
    <Sc a={295.2} b={314.6}><Lens /></Sc>
  </AbsoluteFill>
);

/* ─────────── PARTIE 6 : l'atout entretien ─────────── */

/** La scène d'entretien : le recruteur pose LA question. */
const Q = '« Comment préparez-vous un travail en hauteur ? »';
const Interview: React.FC = () => {
  const t = useT();
  const n = Math.floor(prog(t, 330.0, 331.9, (x) => x) * Q.length);
  return (
    <AbsoluteFill>
      <Title>Vous êtes en <Glow c={RED}>entretien</Glow>…</Title>
      <Photo src="induction/reunion-audit.jpg" x={60} y={450} w={960} h={620} c={RED} pos="50% 40%" />
      {t > 325.6 && <Abs x={80} y={1110} w={920} style={{opacity: pop(t, 325.6)}}><Hud x={0} y={0} w={920} h={260} c={RED}><Abs x={40} y={30} w={840}><Mono size={24} color={RED}>LE RECRUTEUR</Mono><T size={46} style={{marginTop: 14}}>{t > 330.0 ? Q.slice(0, n) : '…'}</T></Abs></Hud></Abs>}
    </AbsoluteFill>
  );
};

/** Le piège : harnais, longes, casque… listés en vrac, ils tombent en tas. */
const PILE = ['epiepc/harnais-d.png', 'epiepc/longes-d.png', 'epiepc/casque-d.png', 'epiepc/gants-d.png', 'epiepc/kit-epi2-d.png'];
const Trap: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Row y={330}><div style={{transform: `scale(${spring(t, 333.2)})`}}><Chip c={RED} size={50}>⚠ C’EST UN PIÈGE</Chip></div></Row>
      {PILE.map((src, i) => {
        const at = 335.9 + i * 0.35;
        const p = prog(t, at, at + 0.7, easeIn);
        const fx = 220 + random(`px${i}`) * 520, fy = 1000 + random(`py${i}`) * 180;
        return <Img key={i} src={PH(src)} style={{position: 'absolute', left: fx - 140, top: -400 + p * (fy + 400) - 140, width: 280, height: 280, objectFit: 'contain', transform: `rotate(${p * (random(`pr${i}`) - 0.5) * 120}deg)`, opacity: t > at ? 1 : 0, filter: 'drop-shadow(0 20px 20px rgba(0,0,0,0.5))'}} />;
      })}
      {t > 337.0 && <Abs x={80} y={520} style={{opacity: pop(t, 337.0)}}><Chip c={PANEL} size={36} style={{border: `3px dashed ${DIM}`}}>harnais, lignes de vie… en vrac</Chip></Abs>}
      {t > 339.0 && <Row y={700}><T size={44} color={DIM} style={{opacity: pop(t, 339.0)}}>Le recruteur attend <Glow c={YEL}>tout autre chose</Glow></T></Row>}
    </AbsoluteFill>
  );
};

/** La réponse parfaite, tapée sur une carte dorée, ponctuée d'un « BAM ! ». */
const ANS = '« Je commence par réaliser une JSA pour identifier les dangers de chaque étape, puis je définis les mesures de maîtrise avant le démarrage. »';
const Answer: React.FC = () => {
  const t = useT();
  const n = Math.floor(prog(t, 344.4, 351.4, (x) => x) * ANS.length);
  return (
    <AbsoluteFill>
      <Title>La <Glow c={YEL}>réponse parfaite</Glow></Title>
      <Abs x={70} y={470} w={940} h={760} style={{borderRadius: 34, padding: 4, background: `linear-gradient(135deg, #FFE38A, ${YEL}, #C99A1A, #FFE38A)`, boxShadow: `0 0 60px ${YEL}55`}}>
        <div style={{width: '100%', height: '100%', borderRadius: 30, background: PANEL, padding: '60px 56px', boxSizing: 'border-box'}}>
          <T size={50} style={{fontWeight: 700, lineHeight: 1.35}}>{ANS.slice(0, n)}<span style={{opacity: Math.floor(t * 3) % 2 && n < ANS.length ? 1 : 0}}>|</span></T>
        </div>
      </Abs>
      {t > 351.5 && <Abs x={640} y={1180} style={{transform: `rotate(-12deg) scale(${spring(t, 351.5, 8, 18)})`}}><div style={{padding: '24px 46px', background: RED, clipPath: 'polygon(0 20%, 15% 0, 30% 15%, 50% 0, 65% 18%, 85% 2%, 100% 25%, 92% 50%, 100% 78%, 80% 100%, 60% 85%, 40% 100%, 22% 84%, 0 95%, 8% 55%)'}}><T size={90}>BAM !</T></div></Abs>}
    </AbsoluteFill>
  );
};

/** Accessoire posé à la fin vs socle préalable : la sécurité est la fondation. */
const Socle: React.FC = () => {
  const t = useT();
  const cross = prog(t, 359.6, 360.2);
  const base = spring(t, 362.0, 6, 11);
  return (
    <AbsoluteFill>
      <Title>Votre <Glow>état d’esprit</Glow></Title>
      <Abs x={60} y={480} w={460} h={760} style={{opacity: 1 - cross * 0.5}}>
        <Hud x={0} y={0} w={460} h={760} c={RED}>
          <Abs x={130} y={260} w={200} h={360} style={{background: '#33415F', borderRadius: 10}} />
          <Abs x={170} y={140 + (1 - pop(t, 358.6)) * -200} style={{fontSize: 110}}>🎩</Abs>
          <Abs x={0} y={650} w={460} style={{textAlign: 'center'}}><T size={30} color={DIM}>Accessoire ajouté à la fin</T></Abs>
          <svg width={460} height={760} style={{position: 'absolute', inset: 0}}><line x1={60} y1={700} x2={60 + 340 * cross} y2={700 - 600 * cross} stroke={RED} strokeWidth={14} strokeLinecap="round" /></svg>
        </Hud>
      </Abs>
      <Abs x={560} y={480} w={460} h={760}>
        <Hud x={0} y={0} w={460} h={760} c={GREEN}>
          <Abs x={130} y={160} w={200} h={360} style={{background: '#33415F', borderRadius: 10}} />
          <Abs x={60} y={520} w={340} h={110} style={{background: `linear-gradient(180deg, ${GREEN}, #1A9C63)`, borderRadius: 12, transform: `scaleX(${base})`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 30px ${GREEN}88`}}><T size={30} color={NIGHT}>SÉCURITÉ</T></Abs>
          <Abs x={0} y={650} w={460} style={{textAlign: 'center'}}><T size={30} color={GREEN}>Le socle préalable</T></Abs>
        </Hud>
      </Abs>
      {t > 364.8 && <Row y={1300}><div style={{transform: `scale(${spring(t, 364.8)})`}}><Chip c={YEL} dark size={42}>👑 La réponse d’un leader en prévention</Chip></div></Row>}
    </AbsoluteFill>
  );
};

export const P6: React.FC = () => (
  <AbsoluteFill>
    <Sc a={317.0} b={332.6}><Interview /></Sc>
    <Sc a={332.5} b={342.8}><Trap /></Sc>
    <Sc a={342.7} b={352.9}><Answer /></Sc>
    <Sc a={352.8} b={366.5}><Socle /></Sc>
  </AbsoluteFill>
);

/* ─────────── CONCLUSION ─────────── */

/** Pendule entre prévention absolue et attente de l'incident. */
const Pendulum: React.FC = () => {
  const t = useT();
  const amp = 32 * (1 - prog(t, 377.0, 378.6) * 0.3);
  const a = Math.sin((t - 366.6) * 1.9) * amp;
  return (
    <AbsoluteFill>
      <Title>Une réflexion de fond</Title>
      <Abs x={538} y={460} w={4} h={4} style={{transformOrigin: '2px 2px', transform: `rotate(${a}deg)`}}>
        <div style={{position: 'absolute', left: 0, top: 0, width: 4, height: 600, background: '#C9D3E6'}} />
        <div style={{position: 'absolute', left: -60, top: 590, width: 124, height: 124, borderRadius: 62, background: `radial-gradient(circle at 35% 35%, #fff, ${CYAN})`, boxShadow: `0 0 40px ${CYAN}`}} />
      </Abs>
      <Abs x={50} y={1200} w={440} style={{opacity: pop(t, 372.5), textAlign: 'center', transform: `scale(${a < -10 ? 1.08 : 1})`}}><Chip c={GREEN} dark size={34}>Prévention absolue ?</Chip></Abs>
      <Abs x={590} y={1200} w={440} style={{opacity: pop(t, 375.8), textAlign: 'center', transform: `scale(${a > 10 ? 1.08 : 1})`}}><Chip c={RED} size={34}>Attendre l’incident ?</Chip></Abs>
    </AbsoluteFill>
  );
};

/** « Fatalité » vole en éclats. */
const Fatal: React.FC = () => {
  const t = useT();
  const br = prog(t, 380.9, 382.3, easeOut);
  return (
    <AbsoluteFill>
      <Title>Refuser que l’accident soit une…</Title>
      {Array.from({length: 18}, (_, i) => {
        const cx = i % 6, cy = Math.floor(i / 6);
        const d = random(`g${i}`);
        return (
          <div key={i} style={{position: 'absolute', left: 90 + cx * 150, top: 760 + cy * 80, width: 150, height: 80, overflow: 'hidden', transform: `translate(${br * (cx - 2.5) * 120 * (0.6 + d)}px, ${br * br * 700 * (0.5 + d)}px) rotate(${br * (d - 0.5) * 160}deg)`, opacity: 1 - prog(t, 382.4, 383.6)}}>
            <div style={{position: 'absolute', left: -cx * 150, top: -cy * 80, width: 900, height: 240, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><T size={150} color={RED} style={{letterSpacing: 2}}>FATALITÉ</T></div>
          </div>
        );
      })}
      {br > 0 && <Row y={1300}><Chip c={GREEN} dark size={44} style={{opacity: br}}>Ce n’est pas une fatalité</Chip></Row>}
    </AbsoluteFill>
  );
};

/** Réagir → éliminer avant ; les 6 cadenas sont verrouillés. */
const End: React.FC = () => {
  const t = useT();
  const cross = prog(t, 386.4, 386.9);
  return (
    <AbsoluteFill>
      <Row y={420}><T size={84} color={DIM} style={{position: 'relative', opacity: pop(t, 385.0)}}>RÉAGIR<span style={{position: 'absolute', left: -10, right: -10, top: '50%', height: 12, background: RED, transform: `scaleX(${cross})`, transformOrigin: '0 50%'}} /></T></Row>
      {t > 388.5 && <Row y={560}><div style={{transform: `scale(${spring(t, 388.5)})`}}><T size={92}><Glow c={GREEN}>ÉLIMINER AVANT</Glow></T></div></Row>}
      <Row y={820}><div style={{opacity: pop(t, 389.6)}}><LotoBoard size={120} locked={prog(t, 389.6, 391.2, (x) => x) * 6} nums /></div></Row>
      {t > 391.2 && <Row y={1180}><div style={{transform: `scale(${spring(t, 391.2)})`}}><Chip c={CYAN} dark size={50}>Et ça, ça change tout.</Chip></div></Row>}
    </AbsoluteFill>
  );
};

export const Final: React.FC = () => (
  <AbsoluteFill>
    <Sc a={366.6} b={378.8}><Pendulum /></Sc>
    <Sc a={378.7} b={383.9}><Fatal /></Sc>
    <Sc a={383.8} b={392.8}><End /></Sc>
  </AbsoluteFill>
);

