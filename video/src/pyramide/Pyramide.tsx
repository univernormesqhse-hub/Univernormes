import {AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {easeIn, easeInOut, easeOut, Enter, Gate, kf, Kinetic, prog, Underline, useSpring, useT} from '../anim';
import {Background} from '../components/Background';
import {Captions} from '../components/Captions';
import {Footer} from '../components/Footer';
import {Camera, Cue, SfxTrack, Wipe} from '../components/Fx';
import {Header} from '../components/Header';
import {Cross} from '../components/Icons';
import {Plate} from '../components/PhotoPerson';
import {F, Pill, Tile} from '../iso/ui';
import {Hero} from '../roles/people';
import {Outro} from '../scenes/Outro';
import {colors, s, sansFont} from '../theme';
import {captions} from './captions';

const OUTRO_AT = 70.55;
export const PYRAMIDE_FRAMES = s(73.4);
const WIPES = [7.9, 55.4];

const INGENIEUR = {src: 'personnages/ingenieur.png', ratio: 891 / 1100, fx: 0.5, fy: 0.2, win: 0.45, color: colors.green, title: 'Ingénieur QHSE'};

const LEVELS = [
  {n: 1, label: 'Politique', q: 'Pourquoi ?', color: '#2F5DA0', at: 16.1},
  {n: 2, label: 'Système', q: 'Qui fait quoi ?', color: '#4A78BF', at: 27.5},
  {n: 3, label: 'Procédures', q: 'Les processus', color: '#7FA6DB', at: 28.3},
  {n: 4, label: 'Instructions', q: 'Comment faire ?', color: colors.ochre, at: 38.2},
  {n: 5, label: 'Enregistrements', q: 'Quelle preuve ?', color: '#1B2638', at: 47.6},
];
const FOCUS: [number, number, number[]][] = [
  [16.1, 26.3, [0]],
  [27.5, 36.0, [1, 2]],
  [38.2, 45.2, [3]],
  [47.6, 55.3, [4]],
];

/** La pyramide documentaire : 5 niveaux qui tombent en place, celui dont on parle est mis en avant. */
const Pyramid: React.FC<{top?: number; h?: number; compact?: boolean}> = ({top = 900, h = 132}) => {
  const t = useT();
  const focus = FOCUS.find(([a, b]) => t >= a && t < b);
  const wAt = (y: number) => interpolate(y, [top, top + h * 5], [190, 980]);
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
      {/* contour pointillé de la pyramide à venir */}
      <path
        d={`M ${540 - wAt(top) / 2} ${top} L ${540 + wAt(top) / 2} ${top} L ${540 + wAt(top + h * 5) / 2} ${top + h * 5} L ${540 - wAt(top + h * 5) / 2} ${top + h * 5} Z`}
        fill="rgba(255,255,255,0.35)"
        stroke={colors.navy}
        strokeOpacity={0.3}
        strokeWidth={4}
        strokeDasharray="10 12"
        opacity={prog(t, 14.8, 15.3)}
      />
      {LEVELS.map((l, i) => {
        if (t < l.at) return null;
        const y0 = top + i * h;
        const drop = interpolate(t, [l.at, l.at + 0.3], [-700, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeIn});
        const sq = interpolate(t, [l.at + 0.3, l.at + 0.38, l.at + 0.5], [1, 0.9, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        const active = focus ? focus[2].includes(i) : true;
        const dim = focus && !active ? 0.45 : 1;
        const lift = focus && active ? -10 : 0;
        const wt = wAt(y0) - 8;
        const wb = wAt(y0 + h) - 8;
        const yy = y0 + drop + lift + 4;
        return (
          <g key={l.n} opacity={dim} transform={`translate(540 ${yy + h / 2}) scale(1 ${sq}) translate(-540 ${-(yy + h / 2)})`}>
            <path d={`M ${540 - wt / 2} ${yy} L ${540 + wt / 2} ${yy} L ${540 + wb / 2} ${yy + h - 8} L ${540 - wb / 2} ${yy + h - 8} Z`} fill={l.color} stroke={focus && active ? '#fff' : 'none'} strokeWidth={6} style={{filter: focus && active ? 'drop-shadow(0 12px 18px rgba(14,42,92,0.35))' : undefined}} />
            <text x={540} y={yy + (i === 0 ? 62 : 56)} textAnchor="middle" fontFamily="Montserrat" fontWeight={900} fontSize={i === 0 ? 24 : 32} fill="#fff" letterSpacing={1}>
              {i === 0 ? 'POLITIQUE' : `NIVEAU ${l.n} · ${l.label.toUpperCase()}`}
            </text>
            <text x={540} y={yy + (i === 0 ? 92 : 94)} textAnchor="middle" fontFamily="Montserrat" fontWeight={600} fontSize={i === 0 ? 20 : 26} fill="#fff" opacity={0.85}>
              {i === 0 ? 'Niveau 1' : l.q}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

/** Carte de détail du niveau mis en avant. */
const Detail: React.FC<{from: number; to: number; icons: {n: string; at: number}[]; title: string; sub: string; color: string}> = ({from, to, icons, title, sub, color}) => {
  const t = useT();
  return (
    <Enter at={from} until={to} x={540} y={720} from="up" dist={120}>
      <div style={{width: 940, height: 250, background: '#fff', borderRadius: 30, boxShadow: '0 16px 32px rgba(30,25,10,0.16)', display: 'flex', alignItems: 'center', gap: 22, padding: '0 28px', borderLeft: `16px solid ${color}`}}>
        <div style={{display: 'flex', gap: 8}}>
          {icons.map((ic) => (
            <div key={ic.n} style={{transform: `scale(${prog(t, ic.at, ic.at + 0.4)}) rotate(${(1 - prog(t, ic.at, ic.at + 0.4)) * -40}deg)`}}>
              <F n={ic.n} size={150} />
            </div>
          ))}
        </div>
        <div style={{fontFamily: sansFont}}>
          <div style={{fontWeight: 900, fontSize: 50, color: colors.navy, lineHeight: 1.05}}>{title}</div>
          <div style={{fontWeight: 600, fontSize: 30, color: '#5B6675', marginTop: 8}}>{sub}</div>
        </div>
      </div>
    </Enter>
  );
};

/** 0 – 7,9 s : la promesse « zéro accident » face à la machine dangereuse. */
const Hook: React.FC = () => {
  const t = useT();
  const crack = prog(t, 6.4, 6.8, easeOut);
  return (
    <div style={{position: 'absolute', inset: 0}}>
      <Kinetic text="La promesse du *zéro accident*" at={0.3} until={2.95} y={420} size={72} maxWidth={1040} />
      <Kinetic text="Mais sur le *terrain*…" at={3.0} until={6.25} y={420} size={92} />
      <Kinetic text="Une promesse ne *protège* personne" at={6.3} until={7.85} y={420} size={64} maxWidth={1040} accent="#D9443A" />
      <Enter at={0.3} until={7.8} x={300} y={1180} from="up" dist={400}>
        <F n="homme-bureau" size={420} float={5} />
      </Enter>
      <Enter at={0.9} until={7.8} x={720} y={820} bouncy spin={-15}>
        <div style={{position: 'relative', width: 380, height: 300, opacity: 1 - crack * 0.4}}>
          <F n="bulle" size={380} />
          <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingBottom: 40, fontFamily: sansFont, fontWeight: 900, color: colors.navy, lineHeight: 1}}>
            <div style={{fontSize: 120}}>0</div>
            <div style={{fontSize: 34}}>ACCIDENT</div>
          </div>
          {t > 6.3 && <div style={{position: 'absolute', left: 40, top: 0}}><Cross size={300} progress={crack} /></div>}
        </div>
      </Enter>
      <Enter at={3.4} until={7.8} x={760} y={1270} bouncy>
        <div style={{position: 'relative', width: 340, height: 300}}>
          <F n="usine" size={300} />
          <div style={{position: 'absolute', left: -40, top: -50, transform: `rotate(${t * 80}deg)`}}><F n="engrenage" size={130} /></div>
        </div>
      </Enter>
      <Enter at={4.5} until={7.8} x={560} y={1430} bouncy rotate={Math.sin(t * 9) * 6}>
        <F n="danger" size={170} />
      </Enter>
    </div>
  );
};

/** 7,9 – 14,7 s : l'ingénieur annonce la mécanique : la pyramide documentaire. */
const Intro: React.FC = () => {
  const t = useT();
  const sp = useSpring(8.0, {damping: 14});
  const out = prog(t, 14.4, 14.75, easeIn);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="De la vision aux *actes*" at={7.95} until={11.45} y={420} size={86} maxWidth={1040} />
      <Kinetic text="La pyramide *documentaire*" at={11.5} until={14.6} y={420} size={76} maxWidth={1040} />
      <Plate x={720} y={900} r={300} p={sp * (1 - out)} color={colors.green} />
      <Hero p={INGENIEUR} cx={700} bottom={1620} h={1020} reveal={prog(t, 8.0, 8.7)} />
      <Enter at={9.5} until={11.4} x={250} y={900} bouncy>
        <Tile n="engrenage" size={220} color={colors.navy} />
      </Enter>
      <Enter at={10.6} until={11.4} x={250} y={1170} bouncy>
        <Tile n="equerre" size={180} color={colors.ochre} />
      </Enter>
      {/* aperçu de la pyramide qui s'assemble */}
      {LEVELS.map((l, i) => {
        const at = 11.6 + i * 0.12;
        const y = interpolate(t, [at, at + 0.25], [-600, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeIn});
        if (t < at) return null;
        const w = 120 + i * 70;
        return <div key={l.n} style={{position: 'absolute', left: 260 - w / 2, top: 820 + i * 74 + y, width: w, height: 66, background: l.color, clipPath: 'polygon(12% 0, 88% 0, 100% 100%, 0 100%)', borderRadius: 6}} />;
      })}
      <Enter at={12.2} until={14.6} x={260} y={1250} from="up" dist={60}>
        <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: colors.navy, letterSpacing: 2}}>QHSE</div>
      </Enter>
    </div>
  );
};

/** 14,7 – 55,4 s : la pyramide se construit, niveau par niveau. */
const Construction: React.FC = () => {
  const t = useT();
  const shake = t > 47.9 && t < 48.2 ? Math.sin(t * 90) * 6 : 0;
  // flèche « on descend »
  const arrow = (from: number, to: number, y0: number, y1: number) => {
    if (t < from || t > to) return null;
    const p = prog(t, from, from + 0.6, easeInOut);
    const o = 1 - prog(t, to - 0.3, to, easeIn);
    return (
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: o}}>
        <path d={`M 990 ${y0} L 990 ${y0 + (y1 - y0) * p}`} stroke={colors.green} strokeWidth={14} strokeLinecap="round" />
        <path d={`M 966 ${y0 + (y1 - y0) * p - 24} L 990 ${y0 + (y1 - y0) * p} L 1014 ${y0 + (y1 - y0) * p - 24}`} fill="none" stroke={colors.green} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  };
  return (
    <div style={{position: 'absolute', inset: 0, transform: `translateX(${shake}px)`}}>
      <Kinetic text="Tout commence au *sommet*" at={14.75} until={16.05} y={420} size={72} maxWidth={1040} />
      <Kinetic text="Niveau 1 · la *Politique*" at={16.1} until={26.25} y={420} size={78} maxWidth={1040} />
      <Kinetic text="On descend d'un *étage*" at={26.3} until={27.45} y={420} size={78} maxWidth={1040} />
      <Kinetic text="Système & *Procédures*" at={27.5} until={36.0} y={420} size={80} maxWidth={1040} />
      <Kinetic text="Au plus près du *terrain*" at={36.05} until={38.15} y={420} size={76} maxWidth={1040} />
      <Kinetic text="Niveau 4 · les *Instructions*" at={38.2} until={45.15} y={420} size={70} maxWidth={1040} />
      <Kinetic text="Tout en bas, la *fondation*" at={45.2} until={47.55} y={420} size={72} maxWidth={1040} />
      <Kinetic text="Niveau 5 · les *Enregistrements*" at={47.6} until={55.3} y={420} size={62} maxWidth={1040} />
      <Pyramid />
      {/* sommet : flèche vers la pointe */}
      <Enter at={14.9} until={16.2} x={540} y={800} from="up" dist={-120} bouncy>
        <svg width={60} height={90}><path d="M30 0 V70 M8 50 L30 80 L52 50" fill="none" stroke={colors.green} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" /></svg>
      </Enter>
      {arrow(24.8, 27.6, 1000, 1180)}
      {arrow(36.0, 38.4, 1250, 1430)}
      {arrow(45.2, 47.8, 1380, 1560)}
      <Detail from={16.2} to={26.25} color="#2F5DA0" title="POURQUOI ?" sub="La boussole : le cap stratégique" icons={[{n: 'boussole', at: 17.3}, {n: 'cible', at: 21.1}]} />
      <Detail from={27.6} to={36.0} color="#4A78BF" title="QUI FAIT QUOI ?" sub="La machine organisationnelle" icons={[{n: 'engrenage', at: 30.7}, {n: 'equipe', at: 32.3}]} />
      <Detail from={38.3} to={45.15} color={colors.ochre} title="COMMENT FAIRE ?" sub="Le mode d'emploi, étape par étape" icons={[{n: 'outils', at: 39.6}, {n: 'cadenas', at: 43.1}]} />
      <Detail from={47.7} to={55.3} color="#1B2638" title="QUELLE PREUVE ?" sub="La check-list signée, irréfutable" icons={[{n: 'clipboard', at: 49.3}, {n: 'check', at: 53.2}]} />
      <Enter at={20.1} until={21.0} x={880} y={560} bouncy>
        <Pill label="Pas de détail technique" icon="stop" size={26} />
      </Enter>
      <Enter at={42.2} until={45.1} x={880} y={560} from="left" dist={-200}>
        <Pill label="Consignation" icon="cadenas" size={28} />
      </Enter>
    </div>
  );
};

const CHAIN = ['Politique', 'Système', 'Procédures', 'Instructions', 'Enregistrements'];

/** 55,4 – 70,4 s : de la parole à la réalité traçable ; la chaîne qui garantit la conformité. */
const Conclusion: React.FC = () => {
  const t = useT();
  const sp = useSpring(55.5, {damping: 14});
  const partOut = prog(t, 62.3, 62.65, easeIn);
  const linkP = prog(t, 65.7, 67.4, easeInOut);
  const shield = useSpring(68.1, {damping: 10});
  return (
    <div style={{position: 'absolute', inset: 0}}>
      <Kinetic text="De la parole à la *réalité*" at={55.45} until={62.55} y={420} size={74} maxWidth={1040} />
      <Kinetic text="ISO : format *libre*…" at={62.6} until={65.65} y={420} size={92} />
      <Kinetic text="…mais une chaîne *ininterrompue*" at={65.7} until={68.05} y={420} size={62} maxWidth={1040} />
      <Kinetic text="Votre *conformité*" at={68.1} until={70.5} y={420} size={84} maxWidth={1060} />
      <Underline at={68.5} until={70.5} x={540} y={490} width={520} />
      {partOut < 1 && (
        <div style={{position: 'absolute', inset: 0, opacity: 1 - partOut}}>
          <Plate x={330} y={900} r={280} p={sp} color={colors.green} />
          <Hero p={INGENIEUR} cx={330} bottom={1620} h={980} reveal={prog(t, 55.5, 56.2)} />
          <div style={{position: 'absolute', left: 836, top: 650, width: 8, height: 640 * prog(t, 59.1, 61.1, easeInOut), background: colors.green, borderRadius: 4}} />
          {CHAIN.map((c, i) => {
            const lit = prog(t, 59.1 + i * 0.4, 59.4 + i * 0.4);
            return (
              <Enter key={c} at={56.0 + i * 0.15} x={840} y={650 + i * 160} from="left" dist={-200}>
                <div style={{display: 'flex', alignItems: 'center', gap: 12, width: 380, background: '#fff', borderRadius: 18, padding: '14px 18px', boxShadow: '0 10px 22px rgba(30,25,10,0.15)', fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: colors.ink, borderLeft: `10px solid ${LEVELS[i].color}`}}>
                  <div style={{width: 48, height: 48}}>{lit > 0 ? <F n="check" size={48} style={{transform: `scale(${lit})`}} /> : <div style={{width: 44, height: 44, borderRadius: 10, border: `4px solid ${colors.grey}`}} />}</div>
                  {c}
                </div>
              </Enter>
            );
          })}
        </div>
      )}
      {/* formats libres */}
      {[
        {n: 'memo', x: 220, y: 820, at: 63.6},
        {n: 'livres', x: 540, y: 760, at: 63.8},
        {n: 'clipboard', x: 860, y: 820, at: 64.0},
      ].map((f, i) => (
        <Enter key={f.n} at={f.at} until={65.6} x={f.x} y={f.y + Math.sin(t * 3 + i) * 12} bouncy spin={i % 2 ? 20 : -20}>
          <Tile n={f.n} size={220} color={colors.ochre} />
        </Enter>
      ))}
      <Enter at={64.5} until={65.6} x={540} y={1120} from="up" dist={80}>
        <Pill label="Papier, numérique, logiciel…" icon="etincelles" />
      </Enter>
      {/* chaîne ininterrompue de la politique à la preuve */}
      {t > 65.7 && (
        <>
          <Enter at={65.75} x={190} y={1000} bouncy><Pill label="Politique" color="#2F5DA0" icon="boussole" size={30} /></Enter>
          <Enter at={67.3} x={890} y={1000} bouncy><Pill label="Preuve" color="#1B2638" icon="clipboard" size={30} /></Enter>
          {[0, 1, 2].map((i) => {
            const show = Math.max(0, Math.min(1, linkP * 3 - i));
            return (
              <div key={i} style={{position: 'absolute', left: 410 + i * 130, top: 1000, transform: `translate(-50%, -50%) scale(${show}) rotate(${i % 2 ? 45 : -45}deg)`}}>
                <F n="maillon" size={140} />
              </div>
            );
          })}
          <div style={{position: 'absolute', left: 540, top: 1350, transform: `translate(-50%, -50%) scale(${shield})`}}>
            <div style={{position: 'relative'}}>
              <F n="bouclier" size={300} />
              <div style={{position: 'absolute', left: 90, top: 80}}><F n="check" size={120} /></div>
              <div style={{position: 'absolute', right: -110, top: 40}}><F n="medaille" size={150} float={6} /></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const CUES: Cue[] = [
  {at: 0.3, sfx: 'whoosh', volume: 0.3},
  {at: 0.9, sfx: 'pop', volume: 0.35},
  {at: 3.4, sfx: 'pop', volume: 0.3},
  {at: 4.5, sfx: 'bell', volume: 0.25},
  {at: 6.4, sfx: 'swish', volume: 0.4},
  {at: 6.5, sfx: 'thud', volume: 0.45},
  ...WIPES.map((at) => ({at: at - 0.35, sfx: 'whoosh', volume: 0.45})),
  {at: 8.0, sfx: 'rise', volume: 0.25},
  {at: 9.5, sfx: 'pop', volume: 0.3},
  {at: 10.6, sfx: 'pop', volume: 0.3},
  ...[0, 1, 2, 3, 4].map((i) => ({at: 11.85 + i * 0.12, sfx: 'click', volume: 0.25})),
  {at: 14.8, sfx: 'whoosh', volume: 0.3},
  ...LEVELS.map((l) => ({at: l.at + 0.3, sfx: 'thud', volume: l.n === 5 ? 0.55 : 0.4})),
  ...[16.2, 27.6, 38.3, 47.7].map((at) => ({at, sfx: 'swish', volume: 0.28})),
  ...[17.3, 21.1, 30.7, 32.3, 39.6, 43.1, 49.3, 53.2].map((at) => ({at, sfx: 'pop', volume: 0.25})),
  {at: 53.2, sfx: 'ding', volume: 0.35},
  ...[24.8, 36.0, 45.2].map((at) => ({at, sfx: 'whoosh', volume: 0.25})),
  {at: 55.5, sfx: 'rise', volume: 0.25},
  ...[0, 1, 2, 3, 4].map((i) => ({at: 59.1 + i * 0.4, sfx: 'ding', volume: 0.18})),
  ...[63.6, 63.8, 64.0].map((at) => ({at, sfx: 'pop', volume: 0.28})),
  ...[0, 1, 2].map((i) => ({at: 65.9 + i * 0.55, sfx: 'click', volume: 0.35})),
  {at: 68.1, sfx: 'thud', volume: 0.45},
  {at: 68.3, sfx: 'ding', volume: 0.4},
  {at: OUTRO_AT - 0.35, sfx: 'whoosh', volume: 0.45},
  {at: OUTRO_AT + 0.4, sfx: 'rise', volume: 0.3},
  {at: OUTRO_AT + 1.4, sfx: 'pop', volume: 0.35},
];

export const PyramideQHSE: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeAudio = interpolate(frame, [PYRAMIDE_FRAMES - s(0.8), PYRAMIDE_FRAMES], [1, 0], {extrapolateLeft: 'clamp'});
  return (
    <AbsoluteFill>
      <Camera shakes={[6.5, 47.9]}>
        <Background />
        <Gate from={0} to={7.9}><Hook /></Gate>
        <Gate from={7.9} to={14.75}><Intro /></Gate>
        <Gate from={14.7} to={55.4}><Construction /></Gate>
        <Gate from={55.4} to={OUTRO_AT}><Conclusion /></Gate>
        <Gate from={OUTRO_AT} to={99}><Outro at={OUTRO_AT} /></Gate>
      </Camera>
      <Header hideAt={OUTRO_AT} />
      <Footer hideAt={OUTRO_AT} />
      {WIPES.map((at) => (
        <Wipe key={at} at={at} />
      ))}
      <Wipe at={OUTRO_AT} />
      <Captions captions={captions} />
      <Audio src={staticFile('voix-off-pyramide.m4a')} volume={fadeAudio} />
      <SfxTrack cues={CUES} />
    </AbsoluteFill>
  );
};
