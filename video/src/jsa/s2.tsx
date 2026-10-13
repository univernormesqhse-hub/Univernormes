import React from 'react';
import {AbsoluteFill, random} from 'remotion';
import {F} from '../iso/ui';
import {sansFont} from '../theme';
import {Abs, BLUE, Chip, CYAN, DIM, easeInOut, easeOut, Glow, GREEN, Hud, LINE, Mono, NIGHT, ORANGE, PANEL, Photo, pop, prog, RED, Row, Sc, spring, T, Title, useT, VIO, WHITE, YEL} from './kit';

/* ─────────── PARTIE 2 : la méthode en 4 étapes ─────────── */

/** Chaîne de montage : la tâche passe par les 4 postes Choisir → Décomposer → Identifier → Contrôler. */
const ST = [
  {at: 101.0, l: 'Choisir', ic: 'cible', c: CYAN},
  {at: 102.9, l: 'Décomposer', ic: 'ciseaux', c: BLUE},
  {at: 104.6, l: 'Identifier', ic: 'danger', c: ORANGE},
  {at: 107.0, l: 'Contrôler', ic: 'bouclier', c: GREEN},
];
const Conveyor: React.FC = () => {
  const t = useT();
  const xs = [190, 420, 650, 880];
  const pos = [-200, ...xs];
  const x = ST.reduce((acc, st, k) => acc + prog(t, st.at - 0.7, st.at - 0.1, easeInOut) * (pos[k + 1] - pos[k]), -200);
  const split = t > 102.9;
  const marked = t > 104.6;
  const safe = t > 107.0;
  return (
    <AbsoluteFill>
      <Title>La méthode repose sur <Glow c={GREEN}>4 piliers</Glow></Title>
      {ST.map((s, i) => {
        const on = t > s.at - 0.2;
        return (
          <Abs key={i} x={xs[i] - 105} y={520} w={210} h={420} style={{opacity: pop(t, 97.0 + i * 0.2)}}>
            <div style={{height: 300, borderRadius: 20, background: on ? `${s.c}33` : PANEL, border: `4px solid ${on ? s.c : LINE}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, boxShadow: on ? `0 0 30px ${s.c}66` : 'none'}}>
              <Mono size={34} color={on ? s.c : DIM}>0{i + 1}</Mono><F n={s.ic} size={84} /><T size={28} color={on ? WHITE : DIM}>{s.l}</T>
            </div>
            <div style={{width: 12, height: 120, margin: '0 auto', background: on ? s.c : LINE, transform: `scaleY(${on ? 1 - Math.max(0, 1 - Math.abs(t - s.at) * 3) * 0.4 : 1})`, transformOrigin: '50% 0'}} />
          </Abs>
        );
      })}
      <Abs x={40} y={1120} w={1000} h={60} style={{borderRadius: 30, background: `repeating-linear-gradient(90deg, #8C9AB8 0 40px, #A9B4CC 40px 80px)`, backgroundPosition: `${t * 120}px 0`, border: `4px solid ${LINE}`}} />
      <Abs x={Math.max(-200, x) - 80} y={960} w={160} h={160} style={{display: 'flex', gap: split ? 8 : 0, alignItems: 'flex-end', justifyContent: 'center', opacity: pop(t, 99.5)}}>
        {(split ? [0, 1, 2] : [0]).map((k) => (
          <div key={k} style={{width: split ? 46 : 150, height: split ? 70 + k * 15 : 140, borderRadius: 10, background: safe ? GREEN : '#C08A4A', border: `4px solid ${marked && !safe ? RED : NIGHT}`, boxShadow: safe ? `0 0 30px ${GREEN}` : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: 30}}>{marked && !safe ? '!' : safe ? '✓' : split ? '' : 'TÂCHE'}</div>
        ))}
      </Abs>
    </AbsoluteFill>
  );
};

/** « Zéro accident » s'assemble pixel par pixel : de petites actions microscopiques. */
const ZERO = ['01110', '10001', '10011', '10101', '11001', '10001', '01110'];
const Mosaic: React.FC = () => {
  const t = useT();
  const px: [number, number][] = [];
  ZERO.forEach((r, y) => r.split('').forEach((c, x) => c === '1' && px.push([x, y])));
  const P = 74;
  return (
    <AbsoluteFill>
      <Title>Un processus presque <Glow>mécanique</Glow></Title>
      {px.map(([x, y], i) => {
        const d = random(`p${i}`);
        const at = 112.6 + d * 3.6;
        const p = prog(t, at, at + 0.5, easeOut);
        const tx = 540 - 2.5 * P + x * P, ty = 480 + y * P;
        const sx = random(`x${i}`) * 1080, sy = 1700 + random(`y${i}`) * 200;
        return <div key={i} style={{position: 'absolute', left: sx + (tx - sx) * p, top: sy + (ty - sy) * p, width: P - 8, height: P - 8, borderRadius: 10, background: GREEN, opacity: p, boxShadow: `0 0 18px ${GREEN}AA`, transform: `rotate(${(1 - p) * 200}deg)`}} />;
      })}
      <Row y={1040}><T size={80} style={{opacity: pop(t, 113.0), letterSpacing: 12}}>ACCIDENT</T></Row>
      <Row y={1170}><Mono size={30} color={DIM} style={{opacity: pop(t, 115.6)}}>= des actions microscopiques × méthode</Mono></Row>
      {t > 119.6 && <Row y={1290}><div style={{transform: `scale(${spring(t, 119.6)})`}}><Chip c={GREEN} dark size={42}>Rien au hasard</Chip></div></Row>}
    </AbsoluteFill>
  );
};

/** Étape 1 : choisir la tâche — pas le café, mais les activités critiques. */
const CRIT = [
  {at: 131.1, l: 'Travaux en hauteur', ph: 'tirant/echafaudage.jpg'},
  {at: 132.6, l: 'Soudage', ph: 'soudage/soudeur-etincelles.jpg'},
  {at: 133.3, l: 'Chargements complexes', ph: 'septm/entrepot.jpg'},
  {at: 134.3, l: 'Grosse maintenance', ph: 'promo/hse-machine.jpg'},
];
const Choose: React.FC = () => {
  const t = useT();
  const no = prog(t, 126.6, 127.0);
  return (
    <AbsoluteFill>
      <Title>Étape 1 : <Glow>choisir la tâche</Glow></Title>
      <Abs x={390} y={440} w={300} h={220} style={{opacity: pop(t, 125.2) * (1 - prog(t, 128.4, 128.9)), display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{fontSize: 150}}>☕</div>
        <svg width={300} height={220} style={{position: 'absolute', inset: 0}}><line x1={40} y1={200} x2={40 + 220 * no} y2={200 - 180 * no} stroke={RED} strokeWidth={16} strokeLinecap="round" /></svg>
      </Abs>
      {t > 127.8 && <Row y={470}><Chip c={RED} size={40} style={{opacity: pop(t, 129.0)}}>Enjeux critiques uniquement</Chip></Row>}
      {CRIT.map((c, i) => {
        const p = pop(t, c.at - 0.2);
        return (
          <Photo key={i} src={c.ph} x={60 + (i % 2) * 490} y={600 + Math.floor(i / 2) * 470} w={470} h={440} q={0.6 + p * 0.4} o={p} c={ORANGE}>
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, padding: '50px 20px 18px', background: 'linear-gradient(180deg, transparent, rgba(10,19,36,0.92))'}}><T size={34} color="#fff">{c.l}</T></div>
          </Photo>
        );
      })}
    </AbsoluteFill>
  );
};

/** La moindre seconde d'inattention se paie : chronomètre au dixième, flash rouge. */
const Second: React.FC = () => {
  const t = useT();
  const s = Math.min(1, Math.max(0, (t - 137.4) / 1.4));
  const flash = Math.max(0, 1 - Math.abs(t - 138.9) * 4);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: RED, opacity: flash * 0.35}} />
      <Title>La moindre seconde d’<Glow c={RED}>inattention</Glow>…</Title>
      <svg width={600} height={600} style={{position: 'absolute', left: 240, top: 480}}>
        <circle cx={300} cy={320} r={240} fill={PANEL} stroke={s >= 1 ? RED : CYAN} strokeWidth={14} />
        <rect x={270} y={40} width={60} height={50} rx={10} fill={s >= 1 ? RED : CYAN} />
        <circle cx={300} cy={320} r={200} fill="none" stroke={s >= 1 ? RED : CYAN} strokeWidth={22} strokeDasharray={1257} strokeDashoffset={1257 * (1 - s)} transform="rotate(-90 300 320)" />
      </svg>
      <Abs x={0} y={740} w={1080} style={{textAlign: 'center'}}><Mono size={90} color={s >= 1 ? RED : WHITE}>{s.toFixed(1)} s</Mono></Abs>
      {t > 138.9 && <Row y={1120}><Chip c={RED} size={46}>…se paie</Chip></Row>}
      {t > 142.6 && <Row y={1250}><div style={{transform: `scale(${spring(t, 142.6)})`}}><Chip c={GREEN} dark size={42}>❤ Une question de survie</Chip></div></Row>}
    </AbsoluteFill>
  );
};

export const P2: React.FC = () => (
  <AbsoluteFill>
    <Sc a={95.0} b={108.6}><Conveyor /></Sc>
    <Sc a={108.5} b={120.8}><Mosaic /></Sc>
    <Sc a={120.7} b={136.2}><Choose /></Sc>
    <Sc a={136.1} b={144.6}><Second /></Sc>
  </AbsoluteFill>
);

/* ─────────── PARTIE 3 : applications pratiques ─────────── */

/** L'ampoule : combien d'étapes ? Réponse de l'expert : 5. */
const Bulb: React.FC = () => {
  const t = useT();
  const five = spring(t, 156.5, 6, 12);
  const glow = 0.5 + Math.sin(t * 4) * 0.2;
  return (
    <AbsoluteFill>
      <Title>Combien d’étapes pour <Glow c={YEL}>changer une ampoule</Glow> ?</Title>
      <svg width={500} height={700} style={{position: 'absolute', left: 290, top: 520}}>
        <defs><radialGradient id="bg1"><stop offset="0%" stopColor="#FFF6C8" /><stop offset="100%" stopColor={YEL} /></radialGradient></defs>
        <circle cx={250} cy={230} r={230} fill={YEL} opacity={glow * 0.3} />
        <path d="M 250 30 C 120 30 60 130 70 220 C 80 300 160 340 170 420 L 330 420 C 340 340 420 300 430 220 C 440 130 380 30 250 30 Z" fill="url(#bg1)" stroke="#fff" strokeWidth={8} />
        <path d="M 200 420 L 200 300 Q 250 250 300 300 L 300 420" fill="none" stroke="#C08A00" strokeWidth={8} />
        {[0, 1, 2, 3].map((i) => <rect key={i} x={170} y={430 + i * 40} width={160} height={30} rx={12} fill="#9AA8C4" />)}
      </svg>
      {t > 151.8 && <Abs x={720} y={600} style={{opacity: pop(t, 151.8), transform: 'rotate(10deg)'}}><Chip c={PANEL} dark size={30} style={{border: `3px solid ${YEL}`}}>😏 une blague ?</Chip></Abs>}
      {t > 156.4 && <Abs x={680} y={860} style={{transform: `scale(${five})`}}><div style={{width: 260, height: 260, borderRadius: 130, background: ORANGE, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 60px ${ORANGE}`}}><T size={190} color="#fff">5</T></div></Abs>}
    </AbsoluteFill>
  );
};

/** L'échelle à 5 barreaux : le casque grimpe d'étape en étape. */
const STEP = [
  {at: 158.3, l: 'Installer l’échelle'},
  {at: 160.1, l: 'Monter'},
  {at: 161.2, l: 'Retirer l’ancienne ampoule'},
  {at: 163.7, l: 'Remettre la nouvelle'},
  {at: 165.0, l: 'Descendre'},
];
const Ladder: React.FC = () => {
  const t = useT();
  const cur = STEP.filter((s) => t >= s.at - 0.2).length - 1;
  const lvl = [0, 2, 4, 4, 0][Math.max(0, cur)];
  const prev = [0, 0, 2, 4, 4][Math.max(0, cur)];
  const k = cur >= 0 ? prog(t, STEP[cur].at - 0.2, STEP[cur].at + 0.5, easeInOut) : 0;
  const y = 1330 - (prev + (lvl - prev) * k) * 150;
  return (
    <AbsoluteFill>
      <Title>L’expert JSA répond : <Glow c={ORANGE}>5 étapes</Glow></Title>
      <svg width={360} height={1000} style={{position: 'absolute', left: 60, top: 470}}>
        <line x1={60} y1={980} x2={130} y2={20} stroke="#8C9AB8" strokeWidth={18} />
        <line x1={300} y1={980} x2={230} y2={20} stroke="#8C9AB8" strokeWidth={18} />
        {Array.from({length: 6}, (_, i) => <line key={i} x1={68 + i * 11} y1={890 - i * 150} x2={292 - i * 11} y2={890 - i * 150} stroke="#8C9AB8" strokeWidth={14} />)}
      </svg>
      <Abs x={180} y={y - 120} style={{opacity: pop(t, 158.2)}}><F n="casque" size={120} /></Abs>
      {STEP.map((s, i) => {
        const on = i <= cur;
        return (
          <Abs key={i} x={440} y={480 + i * 190} w={580} h={160} style={{opacity: on ? 1 : 0.25, transform: `translateX(${(1 - pop(t, s.at - 0.2)) * 60}px)`, display: 'flex', alignItems: 'center', gap: 20, background: i === cur ? `${ORANGE}33` : PANEL, border: `3px solid ${i === cur ? ORANGE : LINE}`, borderRadius: 22, padding: '0 24px', boxSizing: 'border-box'}}>
            <div style={{width: 80, height: 80, borderRadius: 40, background: on ? ORANGE : LINE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: '#fff', flex: '0 0 auto'}}>{i + 1}</div>
            <T size={36}>{s.l}</T>
          </Abs>
        );
      })}
    </AbsoluteFill>
  );
};

/** Pellicule de film : une multitude de gestes, un piège caché dans chaque image. */
const Film: React.FC = () => {
  const t = useT();
  const IC = ['echelle', 'pas', 'main-levee', 'ampoule', 'tournevis', 'pas', 'echelle', 'main-levee', 'ampoule', 'pas'];
  const off = (t - 166.3) * 160;
  return (
    <AbsoluteFill>
      <Title>Une tâche toute bête… une <Glow c={ORANGE}>multitude de gestes</Glow></Title>
      <Abs x={0} y={620} w={1080} h={460} style={{background: '#05080F', overflow: 'hidden', transform: 'rotate(-4deg) scale(1.1)'}}>
        {[0, 420].map((y) => <div key={y} style={{position: 'absolute', left: -(off % 80), top: y + 6, width: 2400, height: 28, backgroundImage: 'linear-gradient(90deg, #E8EDF7 0 40px, transparent 40px 80px)', backgroundSize: '80px 28px'}} />)}
        {IC.map((ic, i) => {
          const x = i * 330 - off;
          const trap = t > 174.2 + (i % 4) * 0.25;
          return (
            <div key={i} style={{position: 'absolute', left: x, top: 50, width: 300, height: 360, borderRadius: 10, background: '#fff', border: `3px solid ${trap ? RED : '#33415F'}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <F n={ic} size={150} />
              {trap && <div style={{position: 'absolute', right: 16, top: 16, transform: `scale(${spring(t, 174.2 + (i % 4) * 0.25)})`}}><F n="danger" size={80} /></div>}
            </div>
          );
        })}
      </Abs>
      {t > 174.2 && <Row y={1230}><Chip c={RED} size={42}>À chaque fraction de seconde, un piège différent</Chip></Row>}
    </AbsoluteFill>
  );
};

/** Lampe UV : le faisceau balaie le tableau et révèle le danger invisible de chaque étape. */
const UVR = [
  {at: 186.2, e: 'Installer l’échelle', d: 'L’échelle bascule'},
  {at: 188.2, e: 'Monter', d: 'Chute de hauteur'},
  {at: 192.3, e: 'Remplacer l’ampoule', d: 'Électrocution'},
  {at: 194.7, e: 'Descendre', d: 'Perte d’équilibre'},
];
const UV: React.FC = () => {
  const t = useT();
  const cur = UVR.filter((r) => t >= r.at - 0.6).length - 1;
  const ty = cur < 0 ? 560 : 600 + cur * 170 + Math.sin(t * 3) * 10;
  const tx = 760 + Math.sin(t * 1.7) * 60;
  return (
    <AbsoluteFill>
      <Title>Révéler les <Glow c={VIO}>dangers invisibles</Glow></Title>
      <Hud x={60} y={470} w={960} h={830} c={VIO}>
        <Abs x={30} y={30} w={900} h={70} style={{display: 'flex', borderBottom: `3px solid ${LINE}`}}><Mono size={28} color={DIM} style={{flex: 1}}>ÉTAPE</Mono><Mono size={28} color={VIO} style={{flex: 1}}>DANGER</Mono></Abs>
        {UVR.map((r, i) => {
          const rev = prog(t, r.at - 0.3, r.at + 0.3);
          const tgt = t > 199.4;
          return (
            <Abs key={i} x={30} y={120 + i * 170} w={900} h={150} style={{display: 'flex', alignItems: 'center', borderBottom: `2px solid ${LINE}`}}>
              <T size={36} style={{flex: 1}}>{r.e}</T>
              <div style={{flex: 1, position: 'relative'}}>
                <T size={36} color={VIO} style={{opacity: 0.08 + rev * 0.92, textShadow: `0 0 ${rev * 30}px ${VIO}`}}>{r.d}</T>
                {tgt && <div style={{position: 'absolute', left: -20, top: -20, width: 120, height: 100, border: `4px solid ${RED}`, borderRadius: 50, transform: `scale(${spring(t, 199.4 + i * 0.15)})`}} />}
              </div>
            </Abs>
          );
        })}
      </Hud>
      <div style={{position: 'absolute', left: tx - 170, top: ty - 140, width: 340, height: 280, borderRadius: '50%', background: `radial-gradient(ellipse, ${VIO}33 0%, ${VIO}14 50%, transparent 70%)`, opacity: cur >= 0 && t < 199 ? 1 : 0}} />
      <Photo src="incident/chute-echelle.jpg" x={640} y={1330} w={380} h={240} c={RED} o={pop(t, 188.4)} pos="50% 60%" />
      {t > 196.0 && <Abs x={60} y={1360} w={540} style={{opacity: pop(t, 196.0)}}><T size={38}>Le risque devient une <Glow c={RED}>cible claire</Glow></T></Abs>}
    </AbsoluteFill>
  );
};

/** Puzzle : chaque danger trouve sa pièce de parade, qui s'emboîte. */
const PZ = [
  {at: 210.7, d: 'Chute de l’échelle', m: 'Vérifier la stabilité', ic: 'echelle'},
  {at: 214.7, d: 'Électrocution', m: 'Consigner : couper le courant', ic: 'cadenas'},
  {at: 218.2, d: 'Chute de hauteur', m: 'EPI adaptés', ic: 'casque'},
  {at: 222.3, d: 'Chute d’objet', m: 'Délimiter la zone', ic: 'barriere'},
];
const Puzzle: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Title>On boucle la boucle : une <Glow c={GREEN}>parade chirurgicale</Glow></Title>
      {PZ.map((p, i) => {
        const inn = pop(t, 204.2 + i * 0.3);
        const join = prog(t, p.at - 0.4, p.at, easeOut);
        const y = 500 + i * 250;
        return (
          <React.Fragment key={i}>
            <Abs x={60 + (1 - join) * -20} y={y} w={500} h={200} style={{opacity: inn, clipPath: 'polygon(0 0, 100% 0, 100% 35%, 92% 35%, 92% 65%, 100% 65%, 100% 100%, 0 100%)', background: `linear-gradient(160deg, ${RED}, #B8323A)`, display: 'flex', alignItems: 'center', gap: 16, padding: '0 30px', boxSizing: 'border-box'}}>
              <F n={p.ic} size={80} /><T size={34} color="#fff">{p.d}</T>
            </Abs>
            <Abs x={520 + (1 - join) * 500} y={y} w={500} h={200} style={{opacity: join, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 65%, 8% 65%, 8% 35%, 0 35%)', background: `linear-gradient(160deg, ${GREEN}, #1A9C63)`, display: 'flex', alignItems: 'center', padding: '0 30px 0 60px', boxSizing: 'border-box', boxShadow: join > 0.99 ? `0 0 30px ${GREEN}` : 'none'}}>
              <T size={34} color={NIGHT}>{p.m}</T>
            </Abs>
          </React.Fragment>
        );
      })}
      {t > 225.6 && <Row y={1520}><div style={{transform: `scale(${spring(t, 225.6)})`}}><Chip c={GREEN} dark size={36}>Chaque problème → sa solution préventive</Chip></div></Row>}
    </AbsoluteFill>
  );
};

/** Machine à sous : trois rouleaux Danger | Risque | Mesure s'arrêtent sur chaque ligne du soudage. */
const SLOT = [
  {stop: [232.1, 233.5, 235.6], v: ['Étincelles', 'Brûlure', 'Masque + gants']},
  {stop: [238.1, 238.6, 239.2], v: ['Fumées', 'Intoxication', 'Ventilation']},
  {stop: [241.2, 241.7, 242.7], v: ['Incendie', 'Feu', 'Extincteur']},
];
const POOL = ['Étincelles', 'Brûlure', 'Fumées', 'Bruit', 'Feu', 'Coupure', 'Incendie', 'Chute', 'Masque + gants', 'Ventilation', 'Extincteur', 'Intoxication'];
const Reel: React.FC<{start: number; stop: number; target: string; c: string}> = ({start, stop, target, c}) => {
  const t = useT();
  const H = 140;
  const spin = t < start ? 0 : t < stop - 0.5 ? (t - start) * 22 : (stop - 0.5 - start) * 22 + prog(t, stop - 0.5, stop, easeOut) * 3;
  const settled = t >= stop;
  const idx = Math.floor(spin);
  const frac = spin - idx;
  const words = [0, 1, 2].map((k) => (settled && k === 1 ? target : POOL[(idx + k + Math.floor(start)) % POOL.length]));
  return (
    <div style={{position: 'relative', flex: 1, height: H * 1.6, overflow: 'hidden', background: '#05080F', borderRadius: 14, border: `3px solid ${settled ? c : LINE}`}}>
      {words.map((w, k) => (
        <div key={k} style={{position: 'absolute', left: 0, right: 0, top: (k - 1) * H + H * 0.3 + (settled ? 0 : frac * H), height: H, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', filter: settled ? 'none' : 'blur(3px)'}}>
          <T size={32} color={settled ? c : '#fff'}>{w}</T>
        </div>
      ))}
    </div>
  );
};
const Slots: React.FC = () => {
  const t = useT();
  const lead = (i: number) => (i === 0 ? 1.6 : 0.9);
  const row = SLOT.filter((r, i) => t >= r.stop[0] - lead(i)).length - 1;
  const r = SLOT[Math.max(0, row)];
  const az = prog(t, 245.4, 249.6, (x) => x);
  return (
    <AbsoluteFill>
      <Photo src="soudage/soudeur-fumees.jpg" x={60} y={330} w={960} h={340} c={ORANGE} pos="50% 40%">
        <div style={{position: 'absolute', left: 24, bottom: 20}}><Chip c={ORANGE} dark size={34}>Industrie lourde : le soudage</Chip></div>
      </Photo>
      <Hud x={60} y={710} w={960} h={330} c={ORANGE}>
        <Abs x={30} y={18} w={900} style={{display: 'flex'}}>{['DANGER', 'RISQUE', 'MESURE'].map((h, i) => <Mono key={h} size={24} color={[RED, YEL, GREEN][i]} style={{flex: 1, textAlign: 'center'}}>{h}</Mono>)}</Abs>
        <Abs x={30} y={60} w={900} style={{display: 'flex', gap: 16}}>
          {[0, 1, 2].map((k) => <Reel key={`${row}-${k}`} start={r.stop[0] - lead(Math.max(0, row))} stop={r.stop[k]} target={r.v[k]} c={[RED, YEL, GREEN][k]} />)}
        </Abs>
      </Hud>
      <Abs x={60} y={1070} w={960}>
        {SLOT.map((s, i) => (
          <div key={i} style={{display: 'flex', gap: 10, marginTop: 10, opacity: t > s.stop[2] ? pop(t, s.stop[2]) : 0}}>
            {s.v.map((v, k) => <div key={k} style={{flex: 1, padding: '12px 14px', borderRadius: 12, background: PANEL, borderLeft: `6px solid ${[RED, YEL, GREEN][k]}`, fontFamily: sansFont, fontWeight: 800, fontSize: 26, color: WHITE}}>{v}</div>)}
          </div>
        ))}
      </Abs>
      {t > 245.4 && (
        <Abs x={60} y={1340} w={960} h={60} style={{display: 'flex', alignItems: 'center', gap: 4}}>
          {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((l, i) => <div key={l} style={{flex: 1, textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 26, color: i / 25 <= az ? GREEN : LINE}}>{l}</div>)}
        </Abs>
      )}
      {t > 251.6 && <Abs x={600} y={1240} style={{transform: `rotate(-8deg) scale(${spring(t, 251.6)})`, border: `6px solid ${GREEN}`, borderRadius: 14, padding: '4px 18px', background: `#ffffffee`}}><T size={40} color={GREEN}>ON ANTICIPE TOUT</T></Abs>}
    </AbsoluteFill>
  );
};

export const P3: React.FC = () => (
  <AbsoluteFill>
    <Sc a={147.1} b={158.2}><Bulb /></Sc>
    <Sc a={158.1} b={166.3}><Ladder /></Sc>
    <Sc a={166.2} b={176.7}><Film /></Sc>
    <Sc a={176.6} b={202.0}><UV /></Sc>
    <Sc a={201.9} b={227.9}><Puzzle /></Sc>
    <Sc a={227.8} b={252.9}><Slots /></Sc>
  </AbsoluteFill>
);

