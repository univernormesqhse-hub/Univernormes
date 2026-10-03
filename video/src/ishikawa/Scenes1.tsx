import {easeInOut, easeOut, Enter, kf, Kinetic, prog, useSpring, useT} from '../anim';
import {PhotoCard, RED, Strike} from '../charte/ui';
import {Note, Op, Stamp, Win} from '../danger2/ui';
import {F, Pill} from '../iso/ui';
import {Highlight} from '../prevention2/Cine';
import {colors, handFont, sansFont} from '../theme';
import {Fishbone, M_COLORS, TEAL} from './ui';

const PLAN = [
  ['toile', 'Un problème, multiples causes', 39.1],
  ['poisson', "L'outil Ishikawa", 43.3],
  ['loupe2', "L'enquête des 5M", 46.6],
  ['puzzle', 'Au-delà des 5M', 49.1],
  ['balance', 'La vision lean', 51.6],
] as const;

/** 0 – 56,2 s : la mission du détective, symptôme vs cause racine, plan. */
export const Intro: React.FC = () => {
  const t = useT();
  const loop = (t - 23.1) * 2.2;
  return (
    <>
      <Kinetic text="Le diagramme d'*Ishikawa*" at={0.2} until={15.2} y={420} size={84} accent={TEAL} maxWidth={1000} />
      <Kinetic text="Toujours le *même* problème" at={15.25} until={29.6} y={420} size={78} accent={RED} maxWidth={1000} />
      <Kinetic text="Symptôme ≠ *cause racine*" at={29.65} until={36.0} y={420} size={80} accent={TEAL} maxWidth={1000} />
      <Kinetic text="Notre plan d'*attaque*" at={36.05} until={56.1} y={420} size={86} accent={TEAL} maxWidth={1000} />

      <Win a={0.2} b={15.2}>
        <Enter at={0.6} x={540} y={900} bouncy><F n="detective" size={360} float={6} /></Enter>
        <Enter at={4.6} until={12.0} x={540} y={1250} bouncy><Pill label="Problèmes insolubles ?" icon="question" color={RED} size={30} /></Enter>
        <Enter at={9.6} x={820} y={760} bouncy rotate={-14}><F n="loupe2" size={200} /></Enter>
        {t > 12.0 && (
          <div style={{position: 'absolute', inset: 0, opacity: prog(t, 12.0, 12.4)}}>
            <Fishbone at={12.2} y={1330} scale={0.62} head="PROBLÈME" branches={[1, 2, 3, 4].map((i) => ({label: `Cause ${i}`, at: 12.9 + i * 0.25}))} />
          </div>
        )}
      </Win>

      {/* le problème qui revient */}
      <Win a={15.25} b={29.6}>
        {[
          ['bug', 'Un bug qui revient', 19.1, 290, 760],
          ['camion', 'Un projet qui déraille', 17.9, 790, 760],
          ['bulle-colere', 'Un client mécontent', 20.9, 540, 1000],
        ].map(([ic, l, at, x, y]) => (
          <Enter key={l as string} at={at as number} until={23.1} x={x as number} y={y as number} bouncy>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8}}><F n={ic as string} size={170} /><Pill label={l as string} color={RED} size={28} /></div>
          </Enter>
        ))}
        {t >= 23.1 && (
          <>
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
              <circle cx={540} cy={1000} r={300} fill="none" stroke={RED} strokeWidth={10} strokeDasharray="30 22" strokeDashoffset={-loop * 40} opacity={prog(t, 23.2, 23.6)} />
            </svg>
            <Enter at={23.3} x={540} y={1000} bouncy><F n="repeter" size={220} /></Enter>
            <Enter at={25.4} x={540 + Math.cos(loop) * 300} y={1000 + Math.sin(loop) * 300} bouncy><F n="pansement" size={130} /></Enter>
            <Enter at={27.6} x={540} y={1420} bouncy><Note text="quelques semaines plus tard… le retour !" color={RED} size={48} /></Enter>
          </>
        )}
      </Win>

      {/* iceberg : symptôme visible / cause racine cachée */}
      <Win a={29.65} b={36.0}>
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
          <rect x={40} y={900} width={1000} height={600} rx={30} fill="#CFE3F2" opacity={0.7} />
          <line x1={40} y1={900} x2={1040} y2={900} stroke="#5C8FB5" strokeWidth={6} />
          <path d="M440 900 L520 700 L600 760 L660 900 Z" fill="#fff" stroke="#9DB9D2" strokeWidth={4} />
          <path d={`M300 900 L780 900 L860 ${900 + 420 * prog(t, 33.6, 34.6)} L220 ${900 + 420 * prog(t, 33.6, 34.6)} Z`} fill="#E8F1F8" stroke="#9DB9D2" strokeWidth={4} />
        </svg>
        <Enter at={32.5} x={850} y={760} bouncy><Pill label="Symptôme" icon="pansement" color={RED} size={32} /></Enter>
        <Enter at={34.6} x={540} y={1200} bouncy>
          <div style={{background: TEAL, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 52, padding: '14px 34px', borderRadius: 20, boxShadow: '0 12px 26px rgba(31,184,154,0.4)'}}>CAUSE RACINE</div>
        </Enter>
      </Win>

      {/* plan en 5 étapes */}
      <Win a={36.05} b={56.1}>
        {PLAN.map(([ic, l, at], i) => (
          <Enter key={l} at={at} x={540} y={640 + i * 160} from="left" dist={-280}>
            <div style={{width: 900, display: 'flex', alignItems: 'center', gap: 22, background: '#fff', borderRadius: 28, padding: '16px 26px', boxShadow: '0 12px 26px rgba(14,30,60,0.14)', borderLeft: `14px solid ${M_COLORS[i]}`}}>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 60, color: M_COLORS[i], width: 50}}>{i + 1}</div>
              <F n={ic} size={90} />
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: colors.navy}}>{l}</div>
            </div>
          </Enter>
        ))}
        <Enter at={55.2} x={540} y={1460} bouncy><Note text="c'est parti !" color={TEAL} size={64} /></Enter>
      </Win>
    </>
  );
};

const WEB = Array.from({length: 9}, (_, i) => {
  const a = (i / 9) * Math.PI * 2;
  return {x: 540 + Math.cos(a) * (220 + (i % 3) * 70), y: 1000 + Math.sin(a) * (200 + (i % 2) * 90)};
});
const FACTORS = ['délais', 'outil', 'consigne', 'bruit', 'données', 'formation', 'stock', 'budget', 'fatigue'];

/** 59,5 – 74,5 s : toile d'araignée de causes, la mauvaise herbe. */
export const Causes: React.FC = () => {
  const t = useT();
  const pull = kf(t, [69.6, 71.0], [0, 1]);
  const regrow = prog(t, 72.7, 74.0, easeOut);
  return (
    <>
      <Kinetic text="Une *toile* d'araignée" at={59.5} until={67.1} y={420} size={86} accent={TEAL} maxWidth={1000} />
      <Kinetic text="Arracher… sans la *racine*" at={67.15} until={74.4} y={420} size={78} accent={RED} maxWidth={1000} />

      <Win a={59.5} b={67.1}>
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
          {WEB.map((p, i) => {
            const q = WEB[(i + 1) % WEB.length];
            const k = prog(t, 62.2 + i * 0.15, 62.7 + i * 0.15);
            return (
              <g key={i}>
                <line x1={540} y1={1000} x2={540 + (p.x - 540) * k} y2={1000 + (p.y - 1000) * k} stroke={colors.navy} strokeWidth={4} opacity={0.5} />
                <line x1={p.x} y1={p.y} x2={p.x + (q.x - p.x) * prog(t, 64.0 + i * 0.1, 64.5 + i * 0.1)} y2={p.y + (q.y - p.y) * prog(t, 64.0 + i * 0.1, 64.5 + i * 0.1)} stroke={colors.navy} strokeWidth={3} opacity={0.35} />
              </g>
            );
          })}
        </svg>
        <Enter at={59.8} x={540} y={1000} bouncy>
          <div style={{background: RED, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 40, padding: '16px 28px', borderRadius: 22, boxShadow: '0 12px 26px rgba(217,68,58,0.4)'}}>PROBLÈME</div>
        </Enter>
        {WEB.map((p, i) => (
          <Enter key={i} at={64.7 + i * 0.22} x={p.x} y={p.y} bouncy>
            <div style={{background: '#fff', borderRadius: 16, padding: '6px 16px', fontFamily: handFont, fontSize: 36, color: colors.navy, boxShadow: '0 6px 14px rgba(0,0,0,0.15)', whiteSpace: 'nowrap'}}>{FACTORS[i]}</div>
          </Enter>
        ))}
      </Win>

      <Win a={67.15} b={74.4}>
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
          <rect x={40} y={1040} width={1000} height={420} rx={30} fill="#B99B74" opacity={0.55} />
          <line x1={40} y1={1040} x2={1040} y2={1040} stroke="#6FA35A" strokeWidth={14} />
          {/* racines */}
          <g stroke="#7A5A36" strokeWidth={8} fill="none" strokeLinecap="round" opacity={prog(t, 67.6, 68.2)}>
            <path d="M540 1040 C 540 1150, 500 1220, 470 1330" />
            <path d="M540 1040 C 560 1140, 620 1200, 650 1300" />
            <path d="M540 1080 C 480 1120, 420 1150, 380 1220" />
            <path d="M540 1090 C 600 1120, 680 1140, 720 1200" />
          </g>
        </svg>
        <div style={{position: 'absolute', left: 540, top: 960 - pull * 260, transform: `translate(-50%, -50%) rotate(${pull * 18}deg)`, opacity: 1 - prog(t, 71.0, 71.6)}}>
          <F n="herbe" size={220} />
        </div>
        {t > 72.7 && <div style={{position: 'absolute', left: 540, top: 1040 - 70 * regrow, transform: `translate(-50%, -50%) scale(${regrow})`, transformOrigin: 'bottom center'}}><F n="pousse" size={160} /></div>}
        <Enter at={71.2} x={820} y={1270} bouncy><Pill label="La racine reste" icon="danger" color={RED} size={30} /></Enter>
        <Enter at={72.8} x={540} y={1530} bouncy><Note text="ça repoussera, c'est sûr !" color={RED} size={54} /></Enter>
      </Win>
    </>
  );
};

const NAMES: [string, number, number, number][] = [
  ["Diagramme d'Ishikawa", 134.0, 290, 700],
  ['Arêtes de poisson', 135.3, 790, 700],
  ['Cause et effet', 136.7, 290, 1330],
  ['Diagramme des 5M', 138.4, 790, 1330],
];

/** 77,9 – 143,7 s : l'outil Ishikawa. */
export const Outil: React.FC = () => {
  const t = useT();
  const sixty = Math.round(kf(t, [127.0, 128.6], [0, 60]));
  const flag = useSpring(116.9, {damping: 10});
  return (
    <>
      <Kinetic text="Un outil *visuel*" at={77.95} until={88.9} y={420} size={92} accent={TEAL} />
      <Kinetic text="En arêtes de *poisson*" at={88.95} until={106.0} y={420} size={84} accent={TEAL} maxWidth={1000} />
      <Kinetic text="Pour le *brainstorming*" at={106.05} until={112.35} y={420} size={82} accent={TEAL} maxWidth={1000} />
      <Kinetic text="Japon, *1962*" at={112.4} until={129.9} y={420} size={100} accent={RED} />
      <Kinetic text="Un outil, *4 noms*" at={129.95} until={143.6} y={420} size={92} accent={TEAL} />

      <Win a={77.95} b={88.9}>
        <Enter at={78.2} x={540} y={820} bouncy><F n="poisson" size={300} float={8} /></Enter>
        <Enter at={82.3} x={250} y={1150} bouncy><Pill label="Démêler la toile" icon="toile" size={32} /></Enter>
        <Enter at={84.9} x={790} y={1150} bouncy><Pill label="Toutes les causes à plat" icon="clipboard" size={32} /></Enter>
        <Enter at={87.0} x={540} y={1360} bouncy><Note text="et enfin y voir clair" color={TEAL} size={60} /></Enter>
      </Win>

      {/* image fournie : diagramme en forme de poisson, puis construction animée */}
      <Win a={88.95} b={94.7}>
        <PhotoCard src="ishikawa/ishikawa-6m.jpg" at={89.1} y={1000} w={960} h={690} pos="50% 50%" label="Le « fishbone diagram »" icon="poisson" from="scale" />
      </Win>
      <Win a={94.75} b={112.35}>
        <Fishbone
          at={94.8}
          headAt={95.4}
          head="PROBLÈME (effet)"
          y={1000}
          branches={[0, 1, 2, 3, 4].map((i) => ({label: `Famille ${i + 1}`, at: 99.2 + i * 0.5}))}
        />
        <Highlight at={96.3} until={98.8} x={880} y={1000} r={150} color={RED} label="la tête" />
        {t > 106.0 && (
          <>
            <Enter at={107.0} x={260} y={1500} bouncy><F n="equipe" size={150} /></Enter>
            <Enter at={110.6} x={760} y={1500} bouncy><Pill label="Tout le monde voit la même chose" icon="yeux" size={28} /></Enter>
          </>
        )}
      </Win>

      {/* histoire */}
      <Win a={112.4} b={129.9}>
        <Enter at={113.0} x={540} y={720} bouncy>
          <div style={{background: '#fff', borderRadius: 26, padding: '16px 34px', boxShadow: '0 12px 26px rgba(14,30,60,0.16)', fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: colors.navy}}>
            Diagramme de <span style={{color: TEAL}}>cause</span> et <span style={{color: RED}}>effet</span>
          </div>
        </Enter>
        {t > 116.9 && (
          <div style={{position: 'absolute', left: 290, top: 1010, transform: `translate(-50%, -50%) scale(${flag})`}}>
            <div style={{width: 330, height: 220, background: '#fff', borderRadius: 14, boxShadow: '0 14px 30px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #ddd'}}>
              <div style={{width: 130, height: 130, borderRadius: '50%', background: '#BC002D'}} />
            </div>
            <div style={{textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: colors.navy, marginTop: 10}}>1962</div>
          </div>
        )}
        <Enter at={119.0} x={780} y={1000} bouncy>
          <div style={{width: 380, background: '#fff', borderRadius: 30, padding: '26px 0', textAlign: 'center', boxShadow: '0 14px 30px rgba(14,30,60,0.18)', borderTop: `12px solid ${TEAL}`}}>
            <F n="homme-bureau" size={150} style={{margin: '0 auto'}} />
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: colors.navy}}>Kaoru Ishikawa</div>
            <div style={{fontFamily: handFont, fontSize: 36, color: TEAL}}>pionnier de la qualité</div>
          </div>
        </Enter>
        {t > 123.4 && (
          <div style={{position: 'absolute', left: 540, top: 1350, transform: 'translate(-50%, -50%)', display: 'flex', alignItems: 'center', gap: 20}}>
            <div style={{position: 'relative', fontFamily: handFont, fontSize: 52, color: RED, opacity: prog(t, 123.4, 123.8)}}>
              gadget à la mode
              <div style={{position: 'absolute', left: -6, right: -6, top: '50%'}}><Strike p={prog(t, 124.6, 125.1)} w={360} /></div>
            </div>
            {t > 126.4 && <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 72, color: TEAL}}>+{sixty} ans</div>}
          </div>
        )}
        {t > 128.8 && <div style={{position: 'absolute', left: 540, top: 1500, transform: 'translate(-50%, -50%)'}}><Stamp text="DU SOLIDE" p={prog(t, 128.8, 129.1)} color={TEAL} size={52} /></div>}
      </Win>

      {/* les noms de l'outil */}
      <Win a={129.95} b={143.6}>
        <Enter at={130.4} x={540} y={1010} bouncy>
          <div style={{width: 300, height: 300, borderRadius: '50%', background: TEAL, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 18px 40px rgba(31,184,154,0.4)', border: '10px solid #fff'}}><F n="poisson" size={190} /></div>
        </Enter>
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
          {NAMES.map(([, at, x, y]) => <line key={at} x1={540} y1={1010} x2={540 + (x - 540) * prog(t, at, at + 0.4)} y2={1010 + (y - 1010) * prog(t, at, at + 0.4)} stroke={colors.navy} strokeWidth={5} strokeDasharray="14 10" />)}
        </svg>
        {NAMES.map(([l, at, x, y], i) => (
          <Enter key={l} at={at + 0.2} x={x} y={y} bouncy>
            <div style={{background: '#fff', borderRadius: 22, padding: '14px 24px', fontFamily: sansFont, fontWeight: 900, fontSize: 32, color: colors.navy, boxShadow: '0 10px 22px rgba(14,30,60,0.16)', borderBottom: `8px solid ${M_COLORS[i]}`, whiteSpace: 'nowrap'}}>{l}</div>
          </Enter>
        ))}
        <Enter at={139.9} x={540} y={1490} bouncy>
          <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
            <Op c="=" color={TEAL} size={80} />
            <Note text="c'est la même chose !" color={TEAL} size={56} />
          </div>
        </Enter>
      </Win>
    </>
  );
};

