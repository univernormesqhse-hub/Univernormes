import {AbsoluteFill, Audio, Img, interpolate, staticFile} from 'remotion';
import {easeIn, easeInOut, easeOut, Enter, Gate, Kinetic, prog, useSpring, useT} from '../anim';
import {PhotoCard, RED, Strike, Verdict} from '../charte/ui';
import {Background} from '../components/Background';
import {Captions} from '../components/Captions';
import {Footer} from '../components/Footer';
import {Camera, Cue, SfxTrack, Wipe} from '../components/Fx';
import {Header} from '../components/Header';
import {F, Pill} from '../iso/ui';
import {Outro} from '../scenes/Outro';
import {colors, handFont, s, sansFont} from '../theme';
import {captions} from './captions';

const LOGO = 'promo/logo.png';
const OUTRO_AT = 59.4;
export const INTEGRATION_FRAMES = s(62.6);
const fade = (t: number, a: number, b: number) => (1 - prog(t, b - 0.3, b, easeIn)) * (t >= a ? 1 : 0);

/** Tampon incliné qui s'abat. */
const Stamp: React.FC<{at: number; x: number; y: number; label: string; color: string; size?: number}> = ({at, x, y, label, color, size = 70}) => {
  const t = useT();
  const sp = useSpring(at, {damping: 9});
  if (t < at) return null;
  return (
    <div style={{position: 'absolute', left: x, top: y, transform: `translate(-50%, -50%) rotate(-12deg) scale(${interpolate(sp, [0, 1], [2.4, 1])})`, opacity: Math.min(1, sp * 2), border: `10px solid ${color}`, borderRadius: 20, padding: '8px 30px', fontFamily: sansFont, fontWeight: 900, fontSize: size, color, background: 'rgba(255,255,255,0.88)', whiteSpace: 'nowrap'}}>
      {label}
    </div>
  );
};

/** 0 – 21,8 s : le nouveau responsable HSE, l'erreur classique et le blocage. */
const Erreur: React.FC = () => {
  const t = useT();
  const out = prog(t, 21.5, 21.8, easeIn);
  const count = Math.round(interpolate(prog(t, 7.9, 10.6, easeInOut), [0, 1], [0, 27]));
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="Nommé *responsable HSE* ?" at={0.05} until={3.05} y={420} size={82} maxWidth={1000} />
      <Kinetic text="L'erreur *classique*" at={3.1} until={11.15} y={420} size={92} accent={RED} />
      <Kinetic text="Résultat : *blocage*" at={11.2} until={16.55} y={420} size={92} accent={RED} />
      <Kinetic text="Les équipes se *braquent*" at={16.6} until={21.7} y={420} size={78} maxWidth={1000} accent={RED} />

      {t < 3.1 && (
        <>
          <PhotoCard src="integration/responsable.jpg" at={0.1} until={3.05} x={540} y={960} w={940} h={760} pos="45% 35%" label="Nouveau responsable HSE" icon="medaille" />
          <Enter at={1.3} until={3.05} x={540} y={1430} bouncy><Pill label="Premier jour" icon="calendrier" size={40} /></Enter>
        </>
      )}
      {t >= 3.1 && t < 11.2 && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 3.1, 11.2)}}>
          <Enter at={3.2} x={540} y={1000} bouncy><F n="homme-bureau" size={260} /></Enter>
          <Enter at={5.8} x={540} y={700} bouncy><Pill label="Tout révolutionner !" icon="eclair" color={RED} size={40} /></Enter>
          {Array.from({length: 14}, (_, i) => {
            const st = 7.9 + i * 0.18;
            const p = prog(t, st, st + 0.6, easeOut);
            if (t < st) return null;
            const x = 160 + ((i * 263) % 760);
            const y = interpolate(p, [0, 1], [500, 1180 + (i % 4) * 70]);
            return (
              <div key={i} style={{position: 'absolute', left: x, top: y, width: 150, height: 190, borderRadius: 10, background: '#FFFDF7', border: '3px solid #D6CDB5', boxShadow: '0 8px 16px rgba(0,0,0,0.15)', transform: `translate(-50%, -50%) rotate(${(i % 5) * 9 - 18}deg)`, padding: 14}}>
                <div style={{height: 14, borderRadius: 4, background: colors.navy, marginBottom: 12}} />
                {[0, 1, 2, 3].map((k) => <div key={k} style={{height: 8, borderRadius: 4, background: '#B9C1CC', marginBottom: 10, width: `${90 - k * 12}%`}} />)}
              </div>
            );
          })}
          {t > 7.9 && (
            <div style={{position: 'absolute', left: 800, top: 820, transform: 'translate(-50%, -50%)', background: RED, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 64, padding: '10px 30px', borderRadius: 24, boxShadow: '0 14px 30px rgba(217,68,58,0.4)'}}>+{count}</div>
          )}
          <Enter at={9.8} x={300} y={820} bouncy><Pill label="Nouvelles procédures" icon="memo" size={30} /></Enter>
        </div>
      )}
      {t >= 11.2 && (
        <>
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            {Array.from({length: 4}, (_, row) =>
              Array.from({length: 5}, (_, col) => {
                const i = row * 5 + col;
                const p = prog(t, 14.4 + i * 0.04, 14.8 + i * 0.04, easeOut);
                return <rect key={i} x={110 + col * 176 + (row % 2) * 44} y={1240 - row * 92 - (1 - p) * 300} width={168} height={84} rx={8} fill={row % 2 ? '#B5513F' : '#C9634F'} stroke="#8E3B2C" strokeWidth={4} opacity={p} />;
              }),
            )}
          </svg>
          <Enter at={11.3} until={15.3} x={540} y={850} from="left" dist={-500}><F n="homme-bureau" size={220} /></Enter>
          <Stamp at={15.6} x={540} y={720} label="BLOCAGE" color={RED} size={84} />
          {t >= 16.6 && (
            <>
              {[0, 1, 2].map((i) => (
                <Enter key={i} at={16.7 + i * 0.15} x={240 + i * 300} y={1440} bouncy>
                  <F n={['haussement', 'bulle-colere', 'haussement'][i]} size={170} />
                </Enter>
              ))}
              <Enter at={18.4} x={540} y={1620} bouncy><Pill label="Règles hors-sol : histoire et réalité ignorées" icon="usine" color={RED} size={28} /></Enter>
            </>
          )}
        </>
      )}
    </div>
  );
};

/** 21,8 – 44,2 s : approche mesurée, plan 30 jours, immersion et filtre de priorisation. */
const Plan: React.FC = () => {
  const t = useT();
  const out = prog(t, 43.9, 44.2, easeIn);
  const days = Math.round(interpolate(prog(t, 24.6, 27.0, easeInOut), [0, 1], [0, 30]));
  const imm = t >= 29.2 && t < 34.3;
  const filt = t >= 34.3;
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="Une approche *mesurée*" at={21.85} until={24.45} y={420} size={82} maxWidth={1000} />
      <Kinetic text="Plan *30 jours* : immersion" at={24.5} until={29.15} y={420} size={74} maxWidth={1000} />
      <Kinetic text="Observer, *écouter*, lire" at={29.2} until={34.25} y={420} size={80} maxWidth={1000} />
      <Kinetic text="Le filtre de *priorisation*" at={34.3} until={44.1} y={420} size={74} maxWidth={1000} />

      {t < 29.2 && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 21.8, 29.2)}}>
          {t < 24.5 ? (
            <Enter at={21.9} x={540} y={1000} bouncy>
              <svg width={700} height={500} viewBox="0 0 700 500">
                <rect x={335} y={140} width={30} height={330} rx={10} fill={colors.ink} />
                <rect x={220} y={460} width={260} height={30} rx={12} fill={colors.ink} />
                <rect x={60} y={130} width={580} height={24} rx={12} fill={colors.green} />
                <circle cx={350} cy={130} r={26} fill={colors.navy} />
                <ellipse cx={120} cy={300} rx={90} ry={18} fill={colors.green} opacity={0.8} />
                <ellipse cx={580} cy={300} rx={90} ry={18} fill={colors.green} opacity={0.8} />
              </svg>
            </Enter>
          ) : (
            <>
              <Enter at={24.55} x={540} y={960} bouncy>
                <div style={{width: 760, borderRadius: 40, background: '#fff', boxShadow: '0 20px 40px rgba(30,25,10,0.18)', overflow: 'hidden'}}>
                  <div style={{background: colors.navy, padding: '18px 0', textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 46, color: '#fff'}}>PLAN D'INTÉGRATION</div>
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10, padding: 24}}>
                    {Array.from({length: 30}, (_, i) => (
                      <div key={i} style={{height: 80, borderRadius: 14, background: i < days ? (i < 10 ? colors.green : '#9FD39A') : '#EEF0F3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 28, color: i < days ? '#fff' : '#9AA3AE'}}>{i + 1}</div>
                    ))}
                  </div>
                </div>
              </Enter>
              <Enter at={28.2} x={540} y={1460} bouncy><Pill label="Phase 1 : immersion" icon="loupe" size={40} /></Enter>
            </>
          )}
        </div>
      )}
      {imm && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 29.2, 34.3)}}>
          <PhotoCard src="promo/hse-machine.jpg" at={30.3} x={540} y={720} w={940} h={330} pos="60% 40%" label="Arpenter les ateliers" icon="usine" />
          <PhotoCard src="promo/terrain-controle.jpg" at={31.06} x={540} y={1080} w={940} h={330} pos="55% 35%" label="Écouter les travailleurs" icon="bulle" />
          <PhotoCard src="promo/audit-reunion.jpg" at={33.0} x={540} y={1440} w={940} h={330} pos="50% 50%" label="Lire les anciens rapports" icon="memo" />
        </div>
      )}
      {filt && (
        <>
          {/* entonnoir */}
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: prog(t, 34.4, 34.9)}}>
            <path d="M200 760 L880 760 L620 1060 L620 1220 L460 1220 L460 1060 Z" fill="rgba(14,42,92,0.08)" stroke={colors.navy} strokeWidth={12} strokeLinejoin="round" />
          </svg>
          {Array.from({length: 24}, (_, i) => {
            const st = 34.6 + i * 0.12;
            const p = prog(t, st, st + 1.1, (v) => v);
            if (t < st) return null;
            const keep = i % 6 === 0 && i < 24;
            const x0 = 240 + ((i * 137) % 600);
            const x = interpolate(p, [0, 0.55, 1], [x0, 540 + ((i % 3) - 1) * 40, keep ? 540 : x0]);
            const y = interpolate(p, [0, 0.55, 1], [560, 1040, keep ? 1300 : 1040]);
            return <div key={i} style={{position: 'absolute', left: x, top: y, width: 34, height: 34, borderRadius: 17, background: keep ? RED : '#9AA3AE', transform: 'translate(-50%, -50%)', opacity: keep ? (p < 1 ? 1 : 0) : 1 - Math.max(0, p - 0.55) * 2.2}} />;
          })}
          <Enter at={36.2} x={540} y={910} bouncy><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: colors.navy}}>FILTRE</div></Enter>
          <Enter at={37.6} until={39.7} x={540} y={1460} bouncy>
            <div style={{position: 'relative'}}><Pill label="Tout corriger d'un coup" color={RED} size={36} /><div style={{position: 'absolute', left: 10, right: 10, top: '50%'}}><Strike p={prog(t, 38.6, 39.2)} w={400} /></div></div>
          </Enter>
          {t >= 40.9 && (
            <div style={{position: 'absolute', left: 0, right: 0, top: 1300, display: 'flex', justifyContent: 'center', gap: 22}}>
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} style={{transform: `scale(${prog(t, 40.95 + i * 0.15, 41.3 + i * 0.15)})`, opacity: i > 2 ? 0.55 : 1}}>
                  <div style={{width: 150, height: 150, borderRadius: 30, background: i > 2 ? '#F3D5D1' : RED, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 24px rgba(217,68,58,0.3)'}}>
                    <F n="danger" size={96} />
                  </div>
                </div>
              ))}
            </div>
          )}
          <Enter at={42.0} x={540} y={1550} bouncy><Pill label="3 à 5 risques critiques" icon="cible" color={RED} size={38} /></Enter>
        </>
      )}
    </div>
  );
};

/** 44,2 – 59,4 s : plan d'action ciblé, validé par le terrain, légitime et adopté. */
const Action: React.FC = () => {
  const t = useT();
  const out = prog(t, 59.1, 59.4, easeIn);
  const plan = t < 53.3;
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="Votre premier *plan d'action*" at={44.25} until={50.75} y={420} size={72} maxWidth={1000} />
      <Kinetic text="Validé par le *terrain*" at={50.8} until={53.25} y={420} size={86} maxWidth={1000} />
      <Kinetic text="Des directives *légitimes*" at={53.3} until={55.45} y={420} size={78} maxWidth={1000} />
      <Kinetic text="Une culture de *prévention*" at={55.5} until={59.3} y={420} size={74} maxWidth={1000} />

      {plan && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 44.2, 53.3)}}>
          {t < 50.8 ? (
            <>
              <div style={{position: 'absolute', left: 0, right: 0, top: 1300, display: 'flex', justifyContent: 'center', gap: 26}}>
                {[0, 1, 2].map((i) => (
                  <div key={i} style={{opacity: prog(t, 44.3 + i * 0.15, 44.6 + i * 0.15), transform: `translateY(${(1 - prog(t, 44.3 + i * 0.15, 44.7 + i * 0.15, easeOut)) * 200}px)`}}>
                    <div style={{width: 260, height: 150, borderRadius: 26, background: RED, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: '#fff', boxShadow: '0 12px 24px rgba(217,68,58,0.3)'}}>
                      <F n="danger" size={70} />#{i + 1}
                    </div>
                  </div>
                ))}
              </div>
              <Enter at={45.5} x={540} y={1150} bouncy><div style={{fontFamily: handFont, fontSize: 54, color: colors.navy}}>le socle ↓</div></Enter>
              <Enter at={46.0} x={540} y={780} from="up" dist={-400}>
                <div style={{width: 820, borderRadius: 36, background: colors.navy, padding: '28px 36px', boxShadow: '0 20px 40px rgba(14,42,92,0.35)'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: 18, fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: '#fff'}}><F n="clipboard" size={90} />Plan d'action</div>
                  {['Risque critique n°1', 'Risque critique n°2', 'Risque critique n°3'].map((r, i) => (
                    <div key={r} style={{display: 'flex', alignItems: 'center', gap: 16, marginTop: 18, fontFamily: sansFont, fontWeight: 800, fontSize: 36, color: '#DCE4F0', opacity: prog(t, 47.0 + i * 0.4, 47.4 + i * 0.4)}}>
                      <div style={{transform: `scale(${prog(t, 48.4 + i * 0.5, 48.8 + i * 0.5)})`}}><Verdict ok size={54} /></div>
                      {r}
                    </div>
                  ))}
                </div>
              </Enter>
            </>
          ) : (
            <>
              <PhotoCard src="integration/agent-terrain.jpg" at={50.85} x={540} y={960} w={940} h={700} pos="40% 35%" label="L'expérience du terrain" icon="ouvrier" />
              <Stamp at={51.6} x={760} y={1340} label="VALIDÉ" color={colors.green} size={70} />
            </>
          )}
        </div>
      )}
      {t >= 53.3 && t < 55.5 && (
        <>
          <Enter at={53.35} x={540} y={1000} bouncy>
            <div style={{width: 440, height: 440, borderRadius: '50%', background: colors.green, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 24px rgba(46,155,62,0.18), 0 22px 44px rgba(46,155,62,0.35)'}}>
              <F n="poignee" size={260} />
            </div>
          </Enter>
          <Enter at={54.3} x={540} y={1440} bouncy><Pill label="Écoutées et respectées" icon="check" size={38} /></Enter>
        </>
      )}
      {t >= 55.5 && (
        <>
          <PhotoCard src="induction/accueil-groupe.jpg" at={55.55} x={540} y={900} w={940} h={640} pos="50% 50%" label="Les équipes adhèrent" icon="equipe" />
          <Enter at={57.4} x={540} y={1380} bouncy>
            <div style={{width: 320, height: 320, borderRadius: 30, overflow: 'hidden', border: '8px solid #fff', boxShadow: '0 16px 32px rgba(0,0,0,0.2)'}}>
              <Img src={staticFile('integration/cubes-hse.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            </div>
          </Enter>
        </>
      )}
    </div>
  );
};

const CUES: Cue[] = [
  {at: 0.1, sfx: 'whoosh', volume: 0.3},
  {at: 1.3, sfx: 'pop', volume: 0.3},
  {at: 3.2, sfx: 'pop', volume: 0.3},
  {at: 5.8, sfx: 'bell', volume: 0.3},
  ...Array.from({length: 7}, (_, i) => ({at: 7.9 + i * 0.36, sfx: 'swish', volume: 0.22})),
  {at: 11.2, sfx: 'whoosh', volume: 0.35},
  {at: 14.4, sfx: 'rise', volume: 0.25},
  {at: 15.6, sfx: 'thud', volume: 0.55},
  {at: 16.7, sfx: 'pop', volume: 0.3},
  {at: 21.5, sfx: 'whoosh', volume: 0.45},
  {at: 24.55, sfx: 'pop', volume: 0.3},
  {at: 24.6, sfx: 'rise', volume: 0.3},
  {at: 28.2, sfx: 'ding', volume: 0.3},
  ...[30.3, 31.06, 33.0].map((at) => ({at, sfx: 'whoosh', volume: 0.3})),
  {at: 34.0, sfx: 'whoosh', volume: 0.45},
  {at: 35.0, sfx: 'rise', volume: 0.25},
  {at: 38.6, sfx: 'swish', volume: 0.35},
  ...[40.95, 41.1, 41.25].map((at) => ({at, sfx: 'pop', volume: 0.3})),
  {at: 43.9, sfx: 'whoosh', volume: 0.45},
  {at: 46.0, sfx: 'thud', volume: 0.4},
  ...[48.4, 48.9, 49.4].map((at) => ({at, sfx: 'ding', volume: 0.25})),
  {at: 50.85, sfx: 'whoosh', volume: 0.3},
  {at: 51.6, sfx: 'thud', volume: 0.5},
  {at: 53.35, sfx: 'rise', volume: 0.3},
  {at: 55.55, sfx: 'whoosh', volume: 0.3},
  {at: 57.4, sfx: 'pop', volume: 0.3},
  {at: OUTRO_AT - 0.35, sfx: 'whoosh', volume: 0.45},
  {at: OUTRO_AT + 0.4, sfx: 'rise', volume: 0.3},
  {at: OUTRO_AT + 1.4, sfx: 'pop', volume: 0.35},
];

export const IntegrationHSE: React.FC = () => {
  const end = INTEGRATION_FRAMES / 30;
  const music = (f: number) => interpolate(f / 30, [0, 0.3, OUTRO_AT - 0.2, OUTRO_AT + 0.4, end - 1, end], [0.26, 0.08, 0.08, 0.32, 0.32, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill>
      <Camera shakes={[15.6, 51.6]}>
        <Background />
        <Gate from={0} to={21.8}><Erreur /></Gate>
        <Gate from={21.8} to={44.2}><Plan /></Gate>
        <Gate from={44.2} to={OUTRO_AT}><Action /></Gate>
        <Gate from={OUTRO_AT} to={999}><Outro at={OUTRO_AT} logo={LOGO} /></Gate>
      </Camera>
      <Header hideAt={OUTRO_AT} logo={LOGO} />
      <Footer hideAt={OUTRO_AT} />
      {[21.8, 34.3, 44.2, OUTRO_AT].map((at) => (
        <Wipe key={at} at={at} />
      ))}
      <Captions captions={captions} />
      <Audio src={staticFile('voix-off-integration.m4a')} />
      <Audio src={staticFile('musique-promo.m4a')} volume={music} />
      <SfxTrack cues={CUES} />
    </AbsoluteFill>
  );
};
