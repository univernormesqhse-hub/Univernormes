import {Award, BadgeCheck, Building2, Factory, Gauge as GaugeIcon, Handshake, HardHat, Leaf, Network, Scale, ScrollText, ShieldCheck, SprayCan, Stethoscope, TriangleAlert, Users, Wrench} from 'lucide-react';
import {AbsoluteFill, Audio, Img, interpolate, staticFile} from 'remotion';
import {easeIn, easeInOut, easeOut, Gate, prog, useT} from '../anim';
import {Cue, SfxTrack} from '../components/Fx';
import {Connector, fadeWin, IconDisc, InfoCard, KaraokeCaptions, KeyTitle, P, PanelWipe, PhotoFrame, PremiumBackground, PremiumFrame, PremiumIntro, PremiumOutro, Reveal} from '../premium/kit';
import {s, sansFont} from '../theme';
import {script} from './script';

const LOGO = 'promo/logo.png';
const OUTRO_AT = 68.6;
export const RESPONSABLE_FRAMES = s(73.4);

/** Intégrale de la vitesse de la chaîne (px parcourus depuis le début de la scène). */
const travel = (t: number, from: number, speed: (x: number) => number) => {
  let d = 0;
  for (let x = from; x < t; x += 1 / 30) d += speed(x) * (240 / 30);
  return d;
};

/** Chaîne de production agroalimentaire stylisée (bocaux sur convoyeur). */
const ProductionLine: React.FC<{d: number; stopped?: number; w?: number}> = ({d, stopped = 0, w = 940}) => {
  const n = 7;
  const gap = w / 5;
  return (
    <svg width={w} height={360} viewBox={`0 0 ${w} 360`} style={{overflow: 'visible'}}>
      {/* machine de remplissage */}
      <rect x={w * 0.36} y={0} width={w * 0.2} height={120} rx={14} fill={P.navy} />
      <rect x={w * 0.43} y={120} width={w * 0.06} height={50} fill={P.navy2} />
      <circle cx={w * 0.46} cy={50} r={22} fill={stopped > 0.5 ? P.alert : P.green} />
      {/* produits */}
      {Array.from({length: n}, (_, i) => {
        const x = ((i * gap + d) % (gap * n)) - gap;
        const filled = x > w * 0.46;
        return (
          <g key={i} transform={`translate(${x} 0)`}>
            <rect x={-34} y={190} width={68} height={92} rx={14} fill="#fff" stroke={P.navy} strokeWidth={4} />
            <rect x={-30} y={220} width={60} height={58} rx={10} fill={filled ? '#F2B84B' : '#EEF1F5'} />
            <rect x={-38} y={176} width={76} height={18} rx={6} fill={P.green} />
          </g>
        );
      })}
      {/* convoyeur */}
      <rect x={0} y={284} width={w} height={26} rx={13} fill={P.ink} />
      {Array.from({length: 12}, (_, i) => (
        <g key={i} transform={`translate(${40 + i * ((w - 80) / 11)} 297) rotate(${d * 2})`}>
          <circle r={9} fill="#9AA6B5" />
          <line x1={-9} y1={0} x2={9} y2={0} stroke={P.ink} strokeWidth={3} />
        </g>
      ))}
      <rect x={40} y={310} width={16} height={46} fill={P.ink} />
      <rect x={w - 56} y={310} width={16} height={46} fill={P.ink} />
    </svg>
  );
};

/** Jauge de cadence (0 → 1). */
const Gauge: React.FC<{v: number; label: string; color?: string}> = ({v, label, color = P.green}) => {
  const a = -180 + 180 * v;
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: sansFont}}>
      <svg width={240} height={140} viewBox="0 0 240 140">
        <path d="M20 120 A100 100 0 0 1 220 120" stroke={P.line} strokeWidth={18} fill="none" strokeLinecap="round" />
        <path d="M20 120 A100 100 0 0 1 220 120" stroke={color} strokeWidth={18} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={`${v} 1`} />
        <g transform={`translate(120 120) rotate(${a})`}>
          <line x1={0} y1={0} x2={82} y2={0} stroke={P.navy} strokeWidth={6} strokeLinecap="round" />
        </g>
        <circle cx={120} cy={120} r={12} fill={P.navy} />
      </svg>
      <div style={{fontWeight: 700, fontSize: 26, color: P.navy, letterSpacing: 2, textTransform: 'uppercase'}}>{label}</div>
    </div>
  );
};

/** Nœud central « Responsable QHSE » (photo ronde + titre). */
const Hub: React.FC<{size?: number}> = ({size = 300}) => (
  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14}}>
    <div style={{width: size, height: size, borderRadius: '50%', overflow: 'hidden', border: `8px solid ${P.white}`, boxShadow: `0 0 0 6px ${P.green}, 0 24px 50px rgba(14,42,92,0.25)`}}>
      <Img src={staticFile('integration/responsable.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '45% 30%'}} />
    </div>
    <div style={{background: P.navy, color: '#fff', fontFamily: sansFont, fontWeight: 800, fontSize: 30, padding: '10px 24px', borderRadius: 14, letterSpacing: 1, whiteSpace: 'nowrap'}}>Responsable QHSE</div>
  </div>
);

/** 4,2 – 16,3 s : autant de fronts, fonction pivot, cas agroalimentaire. */
const Role: React.FC = () => {
  const t = useT();
  const fronts = [Scale, HardHat, Leaf, Award, Factory, Users];
  const tilt = interpolate(prog(t, 10.4, 11.8, easeInOut), [0, 1], [0, -9]);
  const pivotGone = prog(t, 7.6, 8.3);
  return (
    <AbsoluteFill>
      <KeyTitle at={4.2} until={6.95} kicker="La question" title="Autant de *fronts* à la fois ?" />
      <KeyTitle at={7.0} until={13.25} kicker="Fonction pivot" title="Sans elle, la pérennité est *menacée*" size={74} accent={P.alert} />
      <KeyTitle at={13.3} until={16.25} kicker="Cas concret" title="Industrie *agroalimentaire*" />

      {t < 7.0 && (
        <AbsoluteFill style={{opacity: fadeWin(t, 4.2, 7.0)}}>
          <Reveal at={4.3} x={540} y={1060} scale><Hub size={300} /></Reveal>
          {fronts.map((Ic, i) => {
            const a = -Math.PI / 2 + (i * 2 * Math.PI) / 6 + (t - 4.2) * 0.15;
            return (
              <Reveal key={i} at={4.6 + i * 0.12} x={540 + 360 * Math.cos(a)} y={1040 + 340 * Math.sin(a)} scale dy={0}>
                <IconDisc Icon={Ic} size={140} />
              </Reveal>
            );
          })}
        </AbsoluteFill>
      )}
      {t >= 7.0 && t < 13.3 && (
        <AbsoluteFill style={{opacity: fadeWin(t, 7.0, 13.3)}}>
          {/* l'entreprise posée sur le pivot */}
          <div style={{position: 'absolute', left: 540, top: 840, transform: `translate(-50%, -50%) rotate(${tilt}deg)`, transformOrigin: '50% 100%'}}>
            <Reveal at={7.1} x={0} y={0}>
              <div style={{width: 560, padding: '28px 0', borderRadius: 28, background: P.white, boxShadow: '0 20px 44px rgba(14,42,92,0.16)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, border: `4px solid ${tilt < -2 ? P.alert : P.white}`}}>
                <Building2 size={110} color={P.navy} strokeWidth={1.5} />
                <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 36, color: P.navy}}>Pérennité de l'entreprise</div>
              </div>
            </Reveal>
          </div>
          <div style={{position: 'absolute', left: 540, top: 1150, transform: 'translate(-50%, -50%)', opacity: prog(t, 7.2, 7.6)}}>
            <div style={{width: 200, height: 300, borderRadius: 18, background: pivotGone > 0.5 ? 'transparent' : P.navy, border: `5px ${pivotGone > 0.5 ? 'dashed' : 'solid'} ${pivotGone > 0.5 ? P.grey : P.navy}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 26, color: pivotGone > 0.5 ? P.grey : '#fff', textAlign: 'center', padding: 10}}>Fonction QHSE</div>
          </div>
          <Reveal at={8.8} x={250} y={1420} dx={-120} dy={0}><InfoCard Icon={Wrench} label="Panne technique" w={420} accent={P.alert} /></Reveal>
          <Reveal at={9.8} x={830} y={1420} dx={120} dy={0}><InfoCard Icon={ScrollText} label="Nouvelle norme" w={420} accent={P.alert} /></Reveal>
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            <Connector x1={250} y1={1360} x2={460} y2={960} p={prog(t, 9.2, 9.8, easeOut)} color={P.alert} dashed />
            <Connector x1={830} y1={1360} x2={620} y2={960} p={prog(t, 10.2, 10.8, easeOut)} color={P.alert} dashed />
          </svg>
        </AbsoluteFill>
      )}
      {t >= 13.3 && (
        <AbsoluteFill style={{opacity: fadeWin(t, 13.3, 16.3)}}>
          <Reveal at={13.4} x={540} y={1060}><ProductionLine d={travel(t, 13.3, () => 1)} /></Reveal>
          <Reveal at={14.4} x={540} y={1380}>
            <div style={{display: 'flex', gap: 20}}>
              {['Production', 'Conditionnement', 'Expédition'].map((l, i) => (
                <div key={l} style={{fontFamily: sansFont, fontWeight: 700, fontSize: 26, color: P.navy, background: P.white, borderRadius: 40, padding: '10px 20px', boxShadow: '0 6px 16px rgba(14,42,92,0.08)', opacity: prog(t, 14.4 + i * 0.2, 14.7 + i * 0.2)}}>{l}</div>
              ))}
            </div>
          </Reveal>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

const PILLARS = [
  {at: 20.1, Icon: Award, l: 'Qualité', x: 260, y: 820},
  {at: 21.1, Icon: SprayCan, l: 'Hygiène', x: 820, y: 820},
  {at: 22.6, Icon: HardHat, l: 'Sécurité', x: 260, y: 1340},
  {at: 23.9, Icon: Leaf, l: 'Environnement', x: 820, y: 1340},
];

/** 16,3 – 25,3 s : le bureau central et les quatre piliers. */
const Piliers: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill style={{opacity: fadeWin(t, 16.3, 25.3, 0.01)}}>
      <KeyTitle at={16.3} until={25.25} kicker="Bureau central" title="Il supervise *4 piliers*" />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {PILLARS.map((p) => <Connector key={p.l} x1={540} y1={1060} x2={p.x} y2={p.y} p={prog(t, p.at - 0.2, p.at + 0.4, easeOut)} color={P.green} width={5} />)}
      </svg>
      <Reveal at={16.4} x={540} y={1070} scale><Hub size={280} /></Reveal>
      {PILLARS.map((p) => (
        <Reveal key={p.l} at={p.at} x={p.x} y={p.y} scale>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14}}>
            <IconDisc Icon={p.Icon} size={170} ring={P.green} />
            <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 34, color: P.navy}}>{p.l}</div>
          </div>
        </Reveal>
      ))}
      <Reveal at={18.4} until={20.0} x={540} y={1420}><div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 30, color: P.grey, letterSpacing: 3}}>QUALITÉ · HYGIÈNE · SÉCURITÉ · ENVIRONNEMENT</div></Reveal>
    </AbsoluteFill>
  );
};

/** 25,3 – 40,7 s : anticipation, audits internes, risque de paralysie. */
const Missions: React.FC = () => {
  const t = useT();
  const sweep = (t - 25.3) * 120;
  const stop = prog(t, 38.4, 39.6, easeInOut);
  return (
    <AbsoluteFill>
      <KeyTitle at={25.3} until={29.55} kicker="Mission 1" title="*Anticiper* les réglementations" size={76} />
      <KeyTitle at={29.6} until={34.45} kicker="Mission 2" title="Mener des audits *internes*" size={76} />
      <KeyTitle at={34.5} until={36.8} kicker="Attention" title="Des textes stricts et *théoriques*" size={74} accent={P.alert} />
      <KeyTitle at={36.85} until={40.65} kicker="Le risque" title="Paralyser la *production*" size={78} accent={P.alert} />

      {t < 29.6 && (
        <AbsoluteFill style={{opacity: fadeWin(t, 25.3, 29.6)}}>
          <Reveal at={25.4} x={540} y={1000} scale>
            <div style={{position: 'relative', width: 560, height: 560}}>
              {[1, 0.7, 0.4].map((r) => <div key={r} style={{position: 'absolute', left: 280 - 280 * r, top: 280 - 280 * r, width: 560 * r, height: 560 * r, borderRadius: '50%', border: `3px solid ${P.line}`}} />)}
              <div style={{position: 'absolute', inset: 0, borderRadius: '50%', background: `conic-gradient(from ${sweep}deg, rgba(46,155,62,0.35), transparent 70deg)`}} />
              <div style={{position: 'absolute', left: 280, top: 280, transform: 'translate(-50%, -50%)'}}><IconDisc Icon={ScrollText} size={170} /></div>
            </div>
          </Reveal>
          {['Nouveau décret', 'Norme révisée', 'Exigence client'].map((l, i) => {
            const st = 26.3 + i * 0.9;
            const x = interpolate(prog(t, st, st + 2.6, (v) => v), [0, 1], [1200, -200]);
            return t > st ? (
              <div key={l} style={{position: 'absolute', left: x, top: 1400 + (i % 2) * 90, transform: 'translate(-50%, -50%)', fontFamily: sansFont, fontWeight: 700, fontSize: 28, color: P.navy, background: P.white, borderRadius: 14, padding: '12px 20px', boxShadow: '0 8px 20px rgba(14,42,92,0.1)', borderLeft: `6px solid ${P.green}`, whiteSpace: 'nowrap'}}>{l}</div>
            ) : null;
          })}
          <Reveal at={27.5} x={540} y={1610}><div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 28, color: P.grey, letterSpacing: 3}}>VEILLE RÉGLEMENTAIRE CONSTANTE</div></Reveal>
        </AbsoluteFill>
      )}
      {t >= 29.6 && t < 34.5 && (
        <AbsoluteFill style={{opacity: fadeWin(t, 29.6, 34.5)}}>
          <Reveal at={29.7} x={540} y={1040}><PhotoFrame src="promo/terrain-controle.jpg" at={29.7} w={940} h={760} pos="55% 35%" label="Audit sur le terrain" /></Reveal>
          {/* viseur */}
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: prog(t, 31.2, 31.6)}}>
            {[[180, 760], [900, 760], [180, 1320], [900, 1320]].map(([x, y], i) => {
              const sx = x < 540 ? 1 : -1;
              const sy = y < 1000 ? 1 : -1;
              const k = interpolate(prog(t, 31.2, 31.9, easeOut), [0, 1], [60, 0]);
              return <path key={i} d={`M${x - sx * k} ${y + sy * 60 - sy * k} V${y - sy * k} H${x + sx * 60 - sx * k}`} stroke="#fff" strokeWidth={8} fill="none" strokeLinecap="round" />;
            })}
          </svg>
          {[[380, 920], [700, 1150], [460, 1240]].map(([x, y], i) => (
            <Reveal key={i} at={32.8 + i * 0.25} x={x} y={y} scale dy={0}>
              <div style={{width: 84, height: 84, borderRadius: '50%', background: 'rgba(255,255,255,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 0 ${6 + Math.sin(t * 6 + i) * 4}px rgba(200,64,47,0.35)`}}>
                <TriangleAlert size={46} color={P.alert} strokeWidth={2} />
              </div>
            </Reveal>
          ))}
        </AbsoluteFill>
      )}
      {t >= 34.5 && (
        <AbsoluteFill style={{opacity: fadeWin(t, 34.5, 40.7)}}>
          {[0, 1, 2].map((i) => {
            const st = 35.0 + i * 0.4;
            const y = interpolate(prog(t, st, st + 0.6, easeIn), [0, 1], [560, 860 - i * 86]);
            return t > st ? (
              <div key={i} style={{position: 'absolute', left: 540 + (i - 1) * 16, top: y, transform: 'translate(-50%, -50%)', width: 520, height: 80, borderRadius: 12, background: i === 2 ? P.navy : P.white, border: `4px solid ${P.navy}`, display: 'flex', alignItems: 'center', gap: 16, padding: '0 22px', fontFamily: sansFont, fontWeight: 800, fontSize: 28, color: i === 2 ? '#fff' : P.navy}}>
                <Scale size={40} strokeWidth={1.8} />
                {['Code du travail', 'Normes', 'Textes de loi'][i]}
              </div>
            ) : null;
          })}
          <Reveal at={34.6} x={540} y={1180}><ProductionLine d={travel(t, 34.5, (x) => 1 - prog(x, 38.4, 39.6, easeInOut))} stopped={stop} /></Reveal>
          <Reveal at={36.9} x={300} y={1470} dx={-60} dy={0}><Gauge v={0.8 * (1 - stop) + 0.03} label="Cadence" color={stop > 0.5 ? P.alert : P.green} /></Reveal>
          <Reveal at={39.0} x={760} y={1480} dx={60} dy={0}>
            <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 34, color: '#fff', background: P.alert, borderRadius: 14, padding: '14px 24px', whiteSpace: 'nowrap'}}>Production à l'arrêt</div>
          </Reveal>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/** 40,7 – 59,4 s : l'arbitre traduit, transmet, forme et coordonne. */
const Arbitre: React.FC = () => {
  const t = useT();
  const bars = [0.35, 0.55, 0.7, 0.9];
  return (
    <AbsoluteFill>
      <KeyTitle at={40.7} until={46.85} kicker="Son rôle" title="L'*arbitre* entre loi et terrain" size={76} />
      <KeyTitle at={46.9} until={51.15} kicker="Mise en œuvre" title="Appliqué *sans freiner* l'usine" size={74} />
      <KeyTitle at={51.2} until={53.85} kicker="Former" title="Les équipes aux *nouveaux processus*" size={70} />
      <KeyTitle at={53.9} until={59.35} kicker="Coordonner" title="Un réseau de *partenaires externes*" size={70} />

      {t < 46.9 && (
        <AbsoluteFill style={{opacity: fadeWin(t, 40.7, 46.9)}}>
          <Reveal at={42.6} x={540} y={720} dy={-40}>
            <div style={{width: 640, borderRadius: 24, background: P.white, padding: '22px 28px', boxShadow: '0 14px 30px rgba(14,42,92,0.1)', fontFamily: sansFont}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 14, fontWeight: 800, fontSize: 32, color: P.navy}}><ScrollText size={44} strokeWidth={1.8} />Jargon juridique</div>
              {[0.95, 0.8, 0.9, 0.7].map((w, i) => <div key={i} style={{height: 10, width: `${w * 100}%`, background: P.line, borderRadius: 5, marginTop: 14}} />)}
            </div>
          </Reveal>
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            <Connector x1={540} y1={830} x2={540} y2={940} p={prog(t, 43.2, 43.6)} width={5} />
            <Connector x1={540} y1={1130} x2={290} y2={1290} p={prog(t, 43.9, 44.3)} color={P.green} width={5} />
            <Connector x1={540} y1={1130} x2={790} y2={1290} p={prog(t, 45.5, 45.9)} color={P.green} width={5} />
          </svg>
          <Reveal at={40.8} x={540} y={1035} scale><IconDisc Icon={Scale} size={190} bg={P.navy} fg="#fff" /></Reveal>
          <Reveal at={44.1} x={290} y={1430}>
            <div style={{width: 440, borderRadius: 24, background: P.white, padding: '24px 22px', boxShadow: '0 14px 30px rgba(14,42,92,0.12)', borderTop: `8px solid ${P.green}`, textAlign: 'center', fontFamily: sansFont}}>
              <Wrench size={64} color={P.navy} strokeWidth={1.6} />
              <div style={{fontWeight: 800, fontSize: 32, color: P.navy, marginTop: 10}}>Solutions techniques précises</div>
            </div>
          </Reveal>
          <Reveal at={45.8} x={790} y={1430}>
            <div style={{width: 440, borderRadius: 24, background: P.white, padding: '24px 22px', boxShadow: '0 14px 30px rgba(14,42,92,0.12)', borderTop: `8px solid ${P.green}`, textAlign: 'center', fontFamily: sansFont}}>
              <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 10, height: 64}}>
                {bars.map((b, i) => <div key={i} style={{width: 26, height: 64 * b * prog(t, 46.0 + i * 0.1, 46.4 + i * 0.1, easeOut), background: i === 3 ? P.green : P.navy2, borderRadius: 4}} />)}
              </div>
              <div style={{fontWeight: 800, fontSize: 32, color: P.navy, marginTop: 10}}>Indicateurs mesurables</div>
            </div>
          </Reveal>
        </AbsoluteFill>
      )}
      {t >= 46.9 && t < 51.2 && (
        <AbsoluteFill style={{opacity: fadeWin(t, 46.9, 51.2)}}>
          <Reveal at={47.0} x={540} y={700}><InfoCard Icon={GaugeIcon} label="Outils & indicateurs" w={560} /></Reveal>
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            <Connector x1={540} y1={770} x2={540} y2={860} p={prog(t, 47.7, 48.1)} width={5} />
          </svg>
          <Reveal at={48.3} x={540} y={930}><InfoCard Icon={Building2} label="Direction technique" w={560} dark /></Reveal>
          <Reveal at={49.4} x={540} y={1250}><ProductionLine d={travel(t, 46.9, () => 1)} /></Reveal>
          <Reveal at={50.0} x={540} y={1530}><Gauge v={0.82} label="Cadence maintenue" /></Reveal>
        </AbsoluteFill>
      )}
      {t >= 51.2 && t < 53.9 && (
        <AbsoluteFill style={{opacity: fadeWin(t, 51.2, 53.9)}}>
          <Reveal at={51.3} x={540} y={1040}><PhotoFrame src="promo/formation-incendie.jpg" at={51.3} w={940} h={760} pos="50% 40%" label="Formation des équipes" /></Reveal>
        </AbsoluteFill>
      )}
      {t >= 53.9 && (
        <AbsoluteFill style={{opacity: fadeWin(t, 53.9, 59.4)}}>
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            <Connector x1={540} y1={1080} x2={540} y2={700} p={prog(t, 55.3, 55.8, easeOut)} color={P.navy} dashed />
            <Connector x1={540} y1={1080} x2={230} y2={1420} p={prog(t, 56.6, 57.1, easeOut)} color={P.navy} dashed />
            <Connector x1={540} y1={1080} x2={850} y2={1420} p={prog(t, 57.8, 58.3, easeOut)} color={P.green} dashed />
          </svg>
          <Reveal at={54.0} x={540} y={1080} scale><Hub size={240} /></Reveal>
          <Reveal at={55.5} x={540} y={680} scale><InfoCard Icon={Handshake} label="Partenaires externes" w={520} /></Reveal>
          <Reveal at={56.8} x={260} y={1450} scale><InfoCard Icon={Stethoscope} label="Médecine du travail" w={460} /></Reveal>
          <Reveal at={58.0} x={820} y={1450} scale><InfoCard Icon={BadgeCheck} label="Certifications validées" w={460} /></Reveal>
          <Reveal at={54.6} until={55.4} x={540} y={680} scale><IconDisc Icon={Network} size={130} /></Reveal>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/** 59,4 – 68,6 s : traduction permanente, plein régime, sécurité absolue. */
const Resultat: React.FC = () => {
  const t = useT();
  const bal = Math.sin((t - 59.4) * 1.4) * 4 * (1 - prog(t, 61.5, 62.8));
  return (
    <AbsoluteFill>
      <KeyTitle at={59.4} until={63.6} kicker="La clé" title="Contrainte légale ⇄ *réalité du terrain*" size={66} />
      <KeyTitle at={63.65} until={65.75} kicker="Résultat" title="La chaîne à *plein régime*" size={78} />
      <KeyTitle at={65.8} until={68.55} kicker="Et surtout" title="Une sécurité *absolue*" size={82} />

      {t < 63.65 && (
        <AbsoluteFill style={{opacity: fadeWin(t, 59.4, 63.65)}}>
          <Reveal at={59.5} x={540} y={1100}>
            <svg width={900} height={520} viewBox="0 0 900 520" style={{overflow: 'visible'}}>
              <rect x={435} y={180} width={30} height={300} rx={10} fill={P.navy} />
              <rect x={330} y={470} width={240} height={30} rx={12} fill={P.navy} />
              <g transform={`rotate(${bal} 450 180)`}>
                <rect x={40} y={168} width={820} height={24} rx={12} fill={P.green} />
              </g>
              <circle cx={450} cy={180} r={26} fill={P.navy} />
            </svg>
          </Reveal>
          <div style={{position: 'absolute', left: 200, top: 960 + bal * 6, transform: 'translate(-50%, -50%)'}}>
            <Reveal at={60.6} x={0} y={0} scale><div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}><IconDisc Icon={Scale} size={160} /><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: P.navy, whiteSpace: 'nowrap'}}>Contrainte légale</div></div></Reveal>
          </div>
          <div style={{position: 'absolute', left: 880, top: 960 - bal * 6, transform: 'translate(-50%, -50%)'}}>
            <Reveal at={62.3} x={0} y={0} scale><div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}><IconDisc Icon={Factory} size={160} /><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: P.navy, whiteSpace: 'nowrap'}}>Réalité du terrain</div></div></Reveal>
          </div>
          <Reveal at={60.3} x={540} y={1500}><div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 28, color: P.grey, letterSpacing: 3}}>TRADUCTION PERMANENTE</div></Reveal>
        </AbsoluteFill>
      )}
      {t >= 63.65 && t < 65.8 && (
        <AbsoluteFill style={{opacity: fadeWin(t, 63.65, 65.8)}}>
          <Reveal at={63.7} x={540} y={1050}><ProductionLine d={travel(t, 63.65, () => 2.2)} /></Reveal>
          <Reveal at={64.2} x={540} y={1400}><Gauge v={0.96} label="Plein régime" /></Reveal>
        </AbsoluteFill>
      )}
      {t >= 65.8 && (
        <AbsoluteFill style={{opacity: fadeWin(t, 65.8, 68.6)}}>
          <Reveal at={65.85} x={540} y={1050}><PhotoFrame src="promo/hse-machine.jpg" at={65.85} w={940} h={780} pos="65% 40%" label="Opérateurs protégés" /></Reveal>
          <Reveal at={66.6} x={860} y={720} scale><IconDisc Icon={ShieldCheck} size={190} bg={P.green} fg="#fff" /></Reveal>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

const WIPES = [16.3, 25.3, 40.7, 59.4];

const CUES: Cue[] = [
  ...WIPES.map((at) => ({at: at - 0.4, sfx: 'whoosh', volume: 0.16})),
  {at: OUTRO_AT - 0.3, sfx: 'whoosh', volume: 0.18},
  {at: 0.1, sfx: 'rise', volume: 0.12},
];

export const ResponsableQHSE: React.FC = () => {
  const end = RESPONSABLE_FRAMES / 30;
  const music = (f: number) => interpolate(f / 30, [0, 1.2, 1.8, OUTRO_AT - 0.2, OUTRO_AT + 0.4, end - 1, end], [0.2, 0.2, 0.06, 0.06, 0.24, 0.24, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{fontFamily: sansFont}}>
      <PremiumBackground />
      <Gate from={0} to={4.2}><PremiumIntro logo={LOGO} kicker="Fonction QHSE" title="Comment le responsable QHSE *protège l'entreprise*" end={4.2} /></Gate>
      <Gate from={4.2} to={16.3}><Role /></Gate>
      <Gate from={16.3} to={25.3}><Piliers /></Gate>
      <Gate from={25.3} to={40.7}><Missions /></Gate>
      <Gate from={40.7} to={59.4}><Arbitre /></Gate>
      <Gate from={59.4} to={OUTRO_AT}><Resultat /></Gate>
      <Gate from={OUTRO_AT} to={999}><PremiumOutro at={OUTRO_AT} logo={LOGO} /></Gate>
      <PremiumFrame logo={LOGO} chapters={[[4.2, 'Le rôle'], [16.3, 'Les piliers'], [25.3, 'Les missions'], [40.7, "L'arbitrage"], [59.4, 'Le résultat']]} total={OUTRO_AT} hideAt={OUTRO_AT} />
      {WIPES.map((at) => <PanelWipe key={at} at={at} />)}
      <PanelWipe at={OUTRO_AT} />
      <KaraokeCaptions script={script} until={OUTRO_AT} />
      <Audio src={staticFile('voix-off-responsable.m4a')} />
      <Audio src={staticFile('musique-promo.m4a')} volume={music} />
      <SfxTrack cues={CUES} />
    </AbsoluteFill>
  );
};
