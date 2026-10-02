import {interpolate, random} from 'remotion';
import {easeIn, easeInOut, easeOut, Enter, kf, Kinetic, prog, Underline, useSpring, useT} from '../anim';
import {Cross} from '../components/Icons';
import {colors, sansFont} from '../theme';
import {Bar, F, IsoCard, Pill, Tile} from './ui';

const RED = '#D9443A';

/** 0 – 9 s : la norme évolue ; au-delà des rumeurs, 2015 vs 2026. */
export const Hook: React.FC = () => {
  const t = useT();
  const card = useSpring(0.25, {damping: 13});
  const year = Math.round(kf(t, [1.3, 2.5], [2015, 2026], easeInOut));
  const cardUp = prog(t, 2.6, 3.1, easeInOut);
  const cardOut = prog(t, 4.5, 4.9, easeIn);
  const loupe = prog(t, 4.75, 6.2, easeInOut);
  const out = prog(t, 8.7, 9.0, easeIn);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="La norme *ISO 9001*" at={0.2} until={2.65} y={420} size={92} />
      <Kinetic text="Au-delà des *rumeurs*" at={2.7} until={4.65} y={420} size={86} />
      <Kinetic text="Différences *concrètes*" at={4.7} until={7.2} y={420} size={80} maxWidth={1040} />
      <Kinetic text="2015 → *2026* ?" at={7.3} until={8.85} y={420} size={110} />

      {/* le certificat qui « évolue » */}
      {cardOut < 1 && (
        <div style={{position: 'absolute', left: 540, top: interpolate(cardUp, [0, 1], [1010, 760]), transform: `translate(-50%, -50%) scale(${card * (1 - 0.45 * cardUp) * (1 - cardOut)}) rotate(${(1 - card) * -12}deg)`}}>
          <IsoCard year={String(year)} active={year >= 2026} w={380} />
          {t > 2.4 && t < 3.4 && <div style={{position: 'absolute', right: -60, top: -60}}><F n="etincelles" size={140} /></div>}
        </div>
      )}
      {/* rumeurs */}
      <Enter at={3.1} until={4.7} x={540} y={1260} from="up" dist={400}>
        <F n="haussement" size={360} />
      </Enter>
      {[
        {at: 3.3, x: 230, y: 1050, n: 'bulle', txt: '?'},
        {at: 3.55, x: 850, y: 1000, n: 'bulle-colere', txt: '!'},
        {at: 3.8, x: 860, y: 1330, n: 'bulle', txt: '…'},
        {at: 4.0, x: 210, y: 1360, n: 'bulle-colere', txt: '?!'},
      ].map((b, i) => (
        <Enter key={i} at={b.at} until={4.7} x={b.x} y={b.y + Math.sin(t * 4 + i) * 10} bouncy spin={i % 2 ? 20 : -20}>
          <div style={{position: 'relative', width: 200, height: 200}}>
            <F n={b.n} size={200} />
            <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: colors.navy, paddingBottom: 20}}>{b.txt}</div>
          </div>
        </Enter>
      ))}
      {/* 2015 vs 2026 */}
      <Enter at={5.6} until={8.85} x={290} y={1050} from="left" dist={600} rotate={-4}>
        <IsoCard year="2015" w={330} />
      </Enter>
      <Enter at={7.3} until={8.85} x={790} y={1050} from="right" dist={-600} rotate={4} bouncy>
        <IsoCard year="2026" active w={330} />
      </Enter>
      {t > 7.5 && t < 8.85 && (
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
          <path d="M 470 1050 L 610 1050" stroke={colors.green} strokeWidth={16} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - prog(t, 7.5, 7.9)} />
          <path d="M 585 1020 L 620 1050 L 585 1080" fill="none" stroke={colors.green} strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" opacity={prog(t, 7.8, 7.95)} />
        </svg>
      )}
      {t > 4.75 && t < 7.3 && (
        <div style={{position: 'absolute', left: interpolate(loupe, [0, 1], [180, 820]), top: 1300 - Math.sin(loupe * Math.PI) * 220, transform: `translate(-50%, -50%) rotate(${-15 + loupe * 30}deg)`, opacity: prog(t, 4.75, 5.0) * (1 - prog(t, 7.0, 7.3))}}>
          <F n="loupe" size={220} />
        </div>
      )}
    </div>
  );
};

/** 9 – 14,1 s : une évolution, pas une rupture. */
export const Evolution: React.FC = () => {
  const t = useT();
  const grow = useSpring(10.6, {damping: 10});
  const out = prog(t, 13.8, 14.1, easeIn);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="Premier *constat*" at={9.05} until={10.55} y={420} size={96} />
      <Kinetic text="*Évolution* ≠ rupture" at={10.6} until={13.85} y={420} size={92} />
      <Enter at={10.6} until={13.9} x={300} y={950} bouncy>
        <div style={{textAlign: 'center'}}>
          <div style={{transform: `scale(${0.4 + 0.6 * grow})`, transformOrigin: '50% 100%'}}>
            <Tile n="pousse" size={300} color={colors.green}>
              <div style={{position: 'absolute', right: -24, top: -24}}><F n="check" size={90} /></div>
            </Tile>
          </div>
          <div style={{marginTop: 22, fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: colors.green}}>ÉVOLUTION</div>
        </div>
      </Enter>
      <Enter at={11.3} until={13.9} x={780} y={950} bouncy>
        <div style={{textAlign: 'center', position: 'relative'}}>
          <Tile n="chaine-cassee" size={300} color={RED} />
          <div style={{position: 'absolute', left: 0, top: 0}}><Cross size={300} progress={prog(t, 11.6, 12.0)} /></div>
          <div style={{marginTop: 22, fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: '#8A94A3', textDecoration: t > 12.0 ? 'line-through' : 'none'}}>RUPTURE</div>
        </div>
      </Enter>
      <Enter at={12.9} until={13.9} x={540} y={1430} from="up" dist={120}>
        <Pill label="Pour votre organisation" icon="batiment" />
      </Enter>
    </div>
  );
};

const BARS = [
  {label: 'Approche processus', n: 'engrenage', color: '#5E8FD0', at: 15.3},
  {label: 'Satisfaction client', n: 'poignee', color: '#2F5DA0', at: 15.65},
  {label: 'Amélioration continue', n: 'courbe', color: colors.navy, at: 16.0},
];
const NEW = [
  {label: 'Climat', n: 'globe', at: 26.8},
  {label: 'Éthique', n: 'balance', at: 27.7},
  {label: 'Culture qualité', n: 'ampoule', at: 28.8},
];

/** 14,1 – 32,8 s : les fondements conservés, puis les nouveaux points de contrôle (climat, éthique, culture). */
export const Maison: React.FC = () => {
  const t = useT();
  const out = prog(t, 32.5, 32.8, easeIn);
  // la pile descend pour laisser la place aux nouveaux enjeux
  const shift = kf(t, [25.6, 26.6], [0, 1]);
  const stackY = interpolate(shift, [0, 1], [880, 1080]);
  const stackScale = interpolate(shift, [0, 1], [1, 0.86]);
  const key = prog(t, 18.75, 19.6, easeOut);
  const globeBig = useSpring(23.3, {damping: 12});
  const globeIn = prog(t, 26.4, 26.9, easeInOut);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="La version *2026*" at={14.15} until={16.25} y={420} size={96} />
      <Kinetic text="conserve les *fondements*" at={16.3} until={18.65} y={420} size={74} maxWidth={1040} />
      <Kinetic text="et clarifie les *exigences clés*" at={18.7} until={21.35} y={420} size={70} maxWidth={1040} />
      <Kinetic text="Les défis de *notre époque*" at={21.4} until={25.85} y={420} size={74} maxWidth={1040} />
      <Kinetic text="De nouveaux *points de contrôle*" at={25.9} until={32.6} y={420} size={66} maxWidth={1040} />

      <Enter at={14.15} until={15.35} x={540} y={980} bouncy to="up">
        <IsoCard year="2026" active w={360} />
      </Enter>
      {/* toit « QUALITÉ » */}
      <div style={{position: 'absolute', left: 540, top: stackY - 160 * stackScale, transform: `translate(-50%, -50%) scale(${stackScale * prog(t, 16.3, 16.7)})`, opacity: t < 21.4 ? 1 : 1 - prog(t, 21.4, 21.9)}}>
        <svg width={820} height={170} viewBox="0 0 820 170" overflow="visible">
          <path d="M 20 160 L 410 20 L 800 160 Z" fill={colors.green} stroke="#fff" strokeWidth={8} strokeLinejoin="round" />
          <text x={410} y={130} textAnchor="middle" fontFamily="Montserrat" fontWeight={900} fontSize={56} fill="#fff">QUALITÉ</text>
        </svg>
      </div>
      {BARS.map((b, i) => {
        const d = interpolate(t, [b.at, b.at + 0.3], [-900, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeIn});
        if (t < b.at) return null;
        const glow = i === 0 ? prog(t, 17.3, 17.6) * (1 - prog(t, 18.6, 19.0)) : 0;
        return (
          <div key={b.label} style={{position: 'absolute', left: 540, top: stackY + i * 136 * stackScale + d, transform: `translate(-50%, 0) scale(${stackScale})`}}>
            <Bar label={b.label} n={b.n} color={b.color} glow={glow} />
          </div>
        );
      })}
      {/* exigences clés */}
      {t > 18.7 && t < 21.5 && (
        <div style={{position: 'absolute', left: interpolate(key, [0, 1], [1200, 860]), top: 585, transform: `translate(-50%, -50%) rotate(${(1 - key) * 180 - 20}deg)`, opacity: 1 - prog(t, 21.1, 21.4)}}>
          <F n="cle" size={200} />
        </div>
      )}
      {[0, 1, 2].map((i) => (
        <Enter key={i} at={20.1 + i * 0.15} until={21.4} x={200 + i * 140} y={585} bouncy>
          <Tile n="memo" size={110} />
        </Enter>
      ))}
      {/* enjeux climatiques */}
      {t > 23.2 && t < 26.9 && (
        <div style={{position: 'absolute', left: interpolate(globeIn, [0, 1], [540, 240]), top: interpolate(globeIn, [0, 1], [700, 720]), transform: `translate(-50%, -50%) scale(${globeBig * (1 - 0.55 * globeIn)}) rotate(${Math.sin(t * 2) * 6}deg)`}}>
          <F n="globe" size={340} />
          <div style={{position: 'absolute', right: -40, top: 10}}><F n="thermometre" size={150} float={8} /></div>
        </div>
      )}
      <Enter at={24.2} until={25.85} x={830} y={760} bouncy>
        <F n="eclair" size={150} float={8} />
      </Enter>
      {/* nouveaux enjeux : tuiles au-dessus de la pile */}
      {NEW.map((nw, i) => {
        const ok = prog(t, 30.9 + i * 0.25, 31.3 + i * 0.25);
        return (
          <Enter key={nw.label} at={nw.at} until={32.6} x={240 + i * 300} y={760} bouncy>
            <div style={{textAlign: 'center', width: 260}}>
              <div style={{display: 'inline-block'}}>
                <Tile n={nw.n} size={190} color={colors.ochre}>
                  {ok > 0 && <div style={{position: 'absolute', right: -26, top: -26, transform: `scale(${ok})`}}><F n="check" size={86} /></div>}
                </Tile>
              </div>
              <div style={{marginTop: 14, fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: colors.navy, textTransform: 'uppercase'}}>{nw.label}</div>
            </div>
          </Enter>
        );
      })}
      <Enter at={30.0} until={32.6} x={930} y={1630 - 120} from="up" dist={200} rotate={8}>
        <F n="clipboard" size={170} />
      </Enter>
    </div>
  );
};

/** 32,8 – 43,3 s : structure technique pour les auditeurs ; risques et opportunités scindés. */
export const Structure: React.FC = () => {
  const t = useT();
  const out = prog(t, 43.0, 43.3, easeIn);
  const split = prog(t, 40.45, 40.95, easeOut);
  const cutX = prog(t, 40.1, 40.6, easeInOut);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="Une avancée *majeure*" at={32.85} until={34.45} y={420} size={92} />
      <Kinetic text="Une *structure* plus claire" at={34.5} until={38.05} y={420} size={78} maxWidth={1040} />
      <Kinetic text="Risques ≠ *opportunités*" at={38.1} until={43.1} y={420} size={78} maxWidth={1040} />
      {/* l'auditeur et ses outils */}
      <Enter at={35.4} until={38.0} x={330} y={1020} from="left" dist={500}>
        <F n="auditeur" size={400} float={6} />
      </Enter>
      <Enter at={34.6} until={38.0} x={790} y={820} bouncy>
        <Tile n="equerre" size={170} color={colors.navy} />
      </Enter>
      <Enter at={35.0} until={38.0} x={790} y={1060} bouncy>
        <Tile n="outils" size={170} color={colors.navy} />
      </Enter>
      <Enter at={36.7} until={38.0} x={790} y={1300} bouncy>
        <Tile n="clipboard" size={170} color={colors.green}>
          <div style={{position: 'absolute', right: -22, top: -22}}><F n="check" size={76} /></div>
        </Tile>
      </Enter>
      {/* risques & opportunités : une carte qui se scinde */}
      {t > 38.1 && (
        <>
          {[0, 1].map((side) => {
            const sp = prog(t, 38.15, 38.6, easeOut);
            const dx = (side === 0 ? -1 : 1) * split * 230;
            const label = split < 0.5 ? (side === 0 ? 'RISQUES &' : 'OPPORTUNITÉS') : side === 0 ? 'RISQUES' : 'OPPORTUNITÉS';
            return (
              <div
                key={side}
                style={{
                  position: 'absolute',
                  left: 540 + (side === 0 ? -210 : 210) * (1 - split) + dx * (1 - split * 0.0) + (side === 0 ? -0 : 0),
                  top: 1000,
                  width: 420,
                  height: 520,
                  transform: `translate(-50%, -50%) scale(${sp}) rotate(${(side === 0 ? -1 : 1) * split * 4}deg)`,
                  borderRadius: side === 0 ? (split > 0 ? 30 : '30px 0 0 30px') : split > 0 ? 30 : '0 30px 30px 0',
                  background: split < 0.5 ? colors.navy : side === 0 ? colors.navy : colors.green,
                  boxShadow: '0 18px 36px rgba(14,42,92,0.28)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 24,
                  fontFamily: sansFont,
                  fontWeight: 900,
                  fontSize: 42,
                  color: '#fff',
                }}
              >
                <F n={side === 0 ? 'danger' : 'fusee'} size={190} float={6} />
                {label}
              </div>
            );
          })}
          {t > 40.0 && t < 40.9 && (
            <div style={{position: 'absolute', left: 540, top: interpolate(cutX, [0, 1], [700, 1300]), transform: 'translate(-50%, -50%) rotate(90deg)'}}>
              <F n="ciseaux" size={200} />
            </div>
          )}
          <Enter at={41.9} until={43.1} x={540} y={1440} from="up" dist={100}>
            <Pill label="Zéro ambiguïté" icon="check" />
          </Enter>
        </>
      )}
    </div>
  );
};

const STEPS = [
  {at: 45.7, n: 'loupe', title: 'Analyser', sub: "le système actuel et les écarts"},
  {at: 49.1, n: 'engrenage', title: 'Adapter', sub: 'vos processus'},
  {at: 50.9, n: 'formatrice', title: 'Sensibiliser', sub: 'vos équipes'},
  {at: 52.5, n: 'calendrier', title: 'Planifier', sub: 'la transition'},
];

/** 43,3 – 55,7 s : la feuille de route pour réussir. */
export const Plan: React.FC = () => {
  const t = useT();
  const out = prog(t, 55.4, 55.7, easeIn);
  const line = prog(t, 45.5, 53.2, easeInOut);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
      <Kinetic text="Pour *réussir*" at={43.35} until={45.6} y={420} size={110} />
      <Kinetic text="Votre *feuille de route*" at={45.65} until={55.5} y={420} size={80} maxWidth={1040} />
      <Enter at={43.6} until={45.6} x={540} y={1000} bouncy>
        <F n="cible" size={340} float={6} />
      </Enter>
      <div style={{position: 'absolute', left: 196, top: 640, width: 8, height: 690 * line, borderRadius: 4, background: colors.green, opacity: t > 45.5 ? 1 : 0}} />
      {STEPS.map((s, i) => {
        const y = 640 + i * 230;
        const done = prog(t, 54.2 + i * 0.2, 54.5 + i * 0.2);
        return (
          <Enter key={s.title} at={s.at} until={55.5} x={540} y={y} from="left" dist={-200}>
            <div style={{width: 900, display: 'flex', alignItems: 'center', gap: 34}}>
              <Tile n={s.n} size={170} color={done > 0.5 ? colors.green : colors.navy}>
                {done > 0 && <div style={{position: 'absolute', right: -24, top: -24, transform: `scale(${done})`}}><F n="check" size={76} /></div>}
              </Tile>
              <div style={{fontFamily: sansFont}}>
                <div style={{fontWeight: 900, fontSize: 30, color: colors.green, letterSpacing: 2}}>ÉTAPE {i + 1}</div>
                <div style={{fontWeight: 900, fontSize: 58, color: colors.navy, textTransform: 'uppercase', lineHeight: 1.05}}>{s.title}</div>
                <div style={{fontWeight: 600, fontSize: 30, color: '#5B6675'}}>{s.sub}</div>
              </div>
            </div>
          </Enter>
        );
      })}
      <Enter at={54.25} until={55.5} x={880} y={1520} bouncy rotate={-8}>
        <div style={{display: 'flex', alignItems: 'center', gap: 10, background: colors.green, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 30, padding: '10px 22px', borderRadius: 40}}>
          <F n="equerre" size={50} /> MÉTHODE
        </div>
      </Enter>
    </div>
  );
};

/** 55,7 – 62,6 s : une transition maîtrisée, levier de performance. */
export const Levier: React.FC = () => {
  const t = useT();
  const rocket = prog(t, 60.8, 62.4, easeIn);
  const chart = prog(t, 58.6, 60.4, easeInOut);
  return (
    <div style={{position: 'absolute', inset: 0}}>
      <Kinetic text="Comprendre ces *évolutions*" at={55.75} until={57.45} y={420} size={74} maxWidth={1040} />
      <Kinetic text="Une transition *maîtrisée*" at={57.5} until={60.75} y={420} size={78} maxWidth={1040} />
      <Kinetic text="Levier de *performance*" at={60.8} until={62.6} y={420} size={86} maxWidth={1040} />
      <Underline at={61.2} until={62.6} x={540} y={540} width={560} />
      <Enter at={55.9} until={58.5} x={330} y={1070} from="left" dist={400}>
        <F n="femme-bureau" size={340} float={5} />
      </Enter>
      <Enter at={56.1} until={58.5} x={750} y={1070} from="right" dist={-400}>
        <F n="homme-bureau" size={340} float={5} />
      </Enter>
      <Enter at={56.9} until={58.5} x={540} y={760} bouncy>
        <F n="poignee" size={200} />
      </Enter>
      {/* courbe de performance qui monte */}
      <Enter at={58.55} until={62.6} x={540} y={1150} bouncy>
        <div style={{width: 820, height: 560, background: '#fff', borderRadius: 34, boxShadow: '0 18px 36px rgba(30,25,10,0.16)', position: 'relative', overflow: 'hidden'}}>
          <svg width={820} height={560} viewBox="0 0 820 560">
            {[0, 1, 2, 3].map((i) => (
              <line key={i} x1={60} x2={780} y1={120 + i * 110} y2={120 + i * 110} stroke="#E7EAEE" strokeWidth={3} />
            ))}
            {[0, 1, 2, 3, 4].map((i) => {
              const h = 70 + i * 70;
              const p = Math.max(0, Math.min(1, chart * 5 - i));
              return <rect key={i} x={90 + i * 140} y={480 - h * p} width={80} height={h * p} rx={12} fill={i === 4 ? colors.green : '#5E8FD0'} />;
            })}
            <path d="M 110 420 C 260 380, 380 330, 500 250 S 690 120, 760 80" fill="none" stroke={colors.ochre} strokeWidth={10} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - chart} />
          </svg>
          <div style={{position: 'absolute', right: 30, top: 24}}><F n="trophee" size={130} /></div>
        </div>
      </Enter>
      {t > 60.6 && (
        <div style={{position: 'absolute', left: 540 + rocket * 300, top: 1500 - rocket * 1300, transform: `translate(-50%, -50%) rotate(${-10}deg) scale(${0.6 + 0.4 * prog(t, 60.6, 61.0)})`}}>
          <F n="fusee" size={240} />
          {[0, 1, 2, 3, 4].map((k) => (
            <div key={k} style={{position: 'absolute', left: 30 - k * 14, top: 190 + k * 26, width: 50 - k * 6, height: 50 - k * 6, borderRadius: '50%', background: k % 2 ? colors.ochre : '#F6CF5B', opacity: 0.8 - k * 0.15}} />
          ))}
        </div>
      )}
      {t > 61.0 &&
        Array.from({length: 14}).map((_, i) => {
          const p = prog(t, 61.0 + (i % 5) * 0.08, 62.2, easeOut);
          const a = random(`s${i}`) * Math.PI * 2;
          return <div key={i} style={{position: 'absolute', left: 540 + Math.cos(a) * p * 480, top: 1150 + Math.sin(a) * p * 420, width: 20, height: 20, background: i % 2 ? colors.green : colors.ochre, transform: `rotate(45deg) scale(${1 - p})`}} />;
        })}
    </div>
  );
};
