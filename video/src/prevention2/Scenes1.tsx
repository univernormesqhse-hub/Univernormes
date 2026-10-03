import {interpolate, useCurrentFrame} from 'remotion';
import {easeIn, easeInOut, easeOut, Enter, Kinetic, prog, useSpring, useT} from '../anim';
import {CharterDoc, RED, Strike, Verdict} from '../charte/ui';
import {F, Pill} from '../iso/ui';
import {colors, handFont, sansFont} from '../theme';
import {CineShot, Highlight} from './Cine';

export const AMBER = '#E39B1F';
export const fade = (t: number, a: number, b: number) => (1 - prog(t, b - 0.3, b, easeIn)) * (t >= a ? 1 : 0);

/** Bloc entreprise (utilisatrice / extérieure). */
export const Company: React.FC<{label: string; sub: string; icon: string; color: string; w?: number}> = ({label, sub, icon, color, w = 400}) => (
  <div style={{width: w, padding: '24px 18px', borderRadius: 34, background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, boxShadow: '0 18px 36px rgba(14,30,60,0.18)', borderTop: `12px solid ${color}`}}>
    <F n={icon} size={w * 0.36} />
    <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: w * 0.085, color: colors.navy, textAlign: 'center', lineHeight: 1.1}}>{label}</div>
    <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: w * 0.065, color, textTransform: 'uppercase', letterSpacing: 2}}>{sub}</div>
  </div>
);

/** 0 – 29,5 s : le plan de prévention signé… et après ? */
export const Intro: React.FC = () => {
  const t = useT();
  const write = prog(t, 9.9, 10.6, (v) => v);
  const seal = prog(t, 10.6, 11.0);
  const file = prog(t, 10.9, 11.9, easeInOut);
  const shield = useSpring(22.8, {damping: 11});
  const road = prog(t, 26.5, 29.0, easeInOut);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 1 - prog(t, 29.2, 29.5, easeIn)}}>
      <Kinetic text="Plan de *prévention*" at={0.3} until={6.4} y={420} size={92} maxWidth={1000} />
      <Kinetic text="Un passage *obligé*" at={6.45} until={11.85} y={420} size={84} maxWidth={1000} />
      <Kinetic text="Et une fois *signé* ?" at={11.9} until={18.65} y={420} size={86} maxWidth={1000} />
      <Kinetic text="Un *bouclier* ?" at={18.7} until={24.35} y={420} size={100} />
      <Kinetic text="Seulement le *début*" at={24.4} until={29.4} y={420} size={86} maxWidth={1000} />

      {/* plan large d'usine + duo d'entreprises */}
      <CineShot src="promo/raffinerie.jpg" at={0.2} until={6.45} move="push" pos="50% 45%" y={1010} h={900} label="Site industriel à risques" />
      {t > 2.4 && t < 6.45 && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 2.4, 6.45)}}>
          <Enter at={2.5} x={290} y={1330} from="left" dist={-500}><Company label="Entreprise utilisatrice" sub="donneur d'ordre" icon="usine" color={colors.navy} w={380} /></Enter>
          <Enter at={3.0} x={540} y={1330} bouncy><div style={{width: 100, height: 100, borderRadius: '50%', background: AMBER, color: '#fff', fontFamily: sansFont, fontWeight: 900, fontSize: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '6px solid #fff', boxShadow: '0 10px 20px rgba(0,0,0,0.2)'}}>×</div></Enter>
          <Enter at={3.6} x={790} y={1330} from="right" dist={500}><Company label="Entreprise extérieure" sub="sous-traitant" icon="ouvrier" color={colors.green} w={380} /></Enter>
        </div>
      )}
      {/* la paperasse : préparer, signer, classer */}
      {t >= 6.45 && t < 11.9 && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 6.45, 11.9)}}>
          <div style={{position: 'absolute', left: interpolate(file, [0, 1], [540, 760]), top: interpolate(file, [0, 1], [1000, 1180]), transform: `translate(-50%, -50%) scale(${interpolate(file, [0, 1], [1, 0.3])}) rotate(${file * 8}deg)`, opacity: 1 - prog(t, 11.6, 11.9)}}>
            <Enter at={6.5} x={0} y={0} bouncy><CharterDoc w={430} write={prog(t, 7.0, 9.0, (v) => v)} seal={seal} title="PLAN DE PRÉVENTION" lines={5} /></Enter>
          </div>
          {t > 9.9 && t < 10.9 && (
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
              <path d="M420 1180 C 460 1150, 480 1210, 520 1170 S 580 1150, 610 1185" stroke={colors.navy} strokeWidth={6} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - write} />
            </svg>
          )}
          <Enter at={9.9} until={10.9} x={640} y={1150} bouncy><F n="ecrit" size={150} /></Enter>
          <Enter at={10.6} x={790} y={1220} bouncy><F n="classeur" size={230} /></Enter>
          <Enter at={7.2} x={250} y={1380} bouncy><Pill label="Exigé par la loi" icon="juge" size={32} /></Enter>
        </div>
      )}
      {t >= 11.9 && t < 18.7 && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 11.9, 18.7)}}>
          <Enter at={12.0} x={540} y={1040} bouncy><F n="classeur" size={360} /></Enter>
          <Enter at={14.9} x={800} y={760} bouncy rotate={Math.sin(t * 3) * 8}><F n="question" size={170} /></Enter>
          <Enter at={14.0} x={540} y={1430} bouncy><div style={{fontFamily: handFont, fontSize: 64, color: colors.navy}}>l'encre est sèche…</div></Enter>
        </div>
      )}
      {t >= 18.7 && t < 24.4 && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 18.7, 24.4)}}>
          <Enter at={18.8} x={540} y={1000} bouncy><CharterDoc w={360} write={1} seal={1} title="PLAN DE PRÉVENTION" lines={4} /></Enter>
          {t > 22.8 && (
            <div style={{position: 'absolute', left: 540, top: 1000, transform: `translate(-50%, -50%) scale(${shield})`, opacity: 0.92}}>
              <svg width={560} height={640} viewBox="0 0 100 115"><path d="M50 4 L94 18 V58 C94 88 72 104 50 112 C28 104 6 88 6 58 V18 Z" fill="rgba(46,155,62,0.18)" stroke={colors.green} strokeWidth={4} /></svg>
            </div>
          )}
          <Enter at={23.3} x={540} y={1440} bouncy><Pill label="« On est couvert »" icon="bouclier" size={36} /></Enter>
        </div>
      )}
      {t >= 24.4 && (
        <>
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            <line x1={160} y1={1100} x2={160 + 760 * road} y2={1100} stroke={colors.navy} strokeWidth={10} strokeLinecap="round" />
            {[0.25, 0.5, 0.75, 1].map((k) => (road > k ? <circle key={k} cx={160 + 760 * k} cy={1100} r={18} fill={colors.green} /> : null))}
            <path d={`M${160 + 760 * road - 26} 1076 L${160 + 760 * road + 4} 1100 L${160 + 760 * road - 26} 1124`} stroke={colors.navy} strokeWidth={10} fill="none" strokeLinecap="round" opacity={road > 0.05 ? 1 : 0} />
          </svg>
          <Enter at={24.5} x={160} y={960} bouncy>
            <CharterDoc w={180} write={1} seal={1} title="PLAN" lines={3} />
          </Enter>
          <Enter at={25.4} x={160} y={1220} bouncy><div style={{fontFamily: handFont, fontSize: 48, color: colors.navy}}>signature</div></Enter>
          <Enter at={27.6} x={880} y={1220} bouncy><Pill label="Un processus complet" icon="engrenage" size={30} /></Enter>
        </>
      )}
    </div>
  );
};

const PILLARS = [
  {at: 38.4, l: 'Organisation', s: 'interne', icon: 'engrenage', c: colors.navy},
  {at: 40.4, l: 'Relation', s: 'partenariat', icon: 'poignee', c: AMBER},
  {at: 42.3, l: 'Communication', s: 'explicite', icon: 'bulle', c: colors.green},
];

/** 29,5 – 43,9 s : le succès ne dépend pas du papier, mais de trois piliers. */
export const Piliers: React.FC = () => {
  const t = useT();
  const paper = prog(t, 34.6, 35.4, easeOut);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: prog(t, 29.5, 29.8) * (1 - prog(t, 43.6, 43.9, easeIn))}}>
      <Kinetic text="Une opération *sûre*" at={29.55} until={34.6} y={420} size={86} maxWidth={1000} />
      <Kinetic text="Pas que du *papier*" at={34.65} until={38.35} y={420} size={86} maxWidth={1000} accent={RED} />
      <Kinetic text="*3* piliers essentiels" at={38.4} until={43.8} y={420} size={86} maxWidth={1000} />

      {t < 38.4 && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 29.5, 38.4)}}>
          <Enter at={29.7} x={540} y={1000} bouncy>
            <div style={{position: 'relative'}}>
              <CharterDoc w={380} write={1} seal={1} title="PLAN DE PRÉVENTION" lines={4} />
              <div style={{position: 'absolute', left: -20, right: -20, top: '50%'}}><Strike p={paper} w={420} /></div>
            </div>
          </Enter>
          <Enter at={31.5} x={850} y={1350} bouncy><F n="check" size={120} /></Enter>
          <Enter at={35.2} x={540} y={1460} bouncy><Pill label="Le document seul ne suffit pas" icon="memo" color={RED} size={32} /></Enter>
        </div>
      )}
      {t >= 38.4 && (
        <>
          {/* fronton + colonnes */}
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: prog(t, 38.4, 38.8)}}>
            <polygon points={`120,700 540,${560} 960,700`} fill={colors.navy} />
            <rect x={110} y={700} width={860} height={30} rx={6} fill={colors.navy} />
            <rect x={90} y={1390} width={900} height={40} rx={8} fill={colors.navy} opacity={prog(t, 38.4, 38.8)} />
          </svg>
          {PILLARS.map((p, i) => {
            const h = prog(t, p.at, p.at + 0.8, easeOut);
            const x = 250 + i * 290;
            return (
              <div key={p.l}>
                <div style={{position: 'absolute', left: x - 70, top: 1390 - 650 * h, width: 140, height: 650 * h, background: `linear-gradient(90deg, #E9E2D0, #fff 45%, #E0D7C2)`, borderLeft: `4px solid ${p.c}`, borderRight: `4px solid ${p.c}`}} />
                <Enter at={p.at + 0.5} x={x} y={900} bouncy><div style={{width: 150, height: 150, borderRadius: '50%', background: '#fff', border: `8px solid ${p.c}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 22px rgba(0,0,0,0.15)'}}><F n={p.icon} size={100} /></div></Enter>
                <Enter at={p.at + 0.7} x={x} y={1180} bouncy>
                  <div style={{textAlign: 'center', fontFamily: sansFont}}>
                    <div style={{fontWeight: 900, fontSize: 34, color: p.c}}>{p.l}</div>
                    <div style={{fontWeight: 700, fontSize: 24, color: colors.navy}}>{p.s}</div>
                  </div>
                </Enter>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

const STEPS = [
  {at: 62.1, l: 'Définir', s: 'la mission & ses dangers', icon: 'loupe'},
  {at: 65.9, l: 'Contracter', s: 'compétences attendues', icon: 'memo'},
  {at: 69.4, l: 'Choisir', s: 'le bon partenaire', icon: 'cible'},
  {at: 71.7, l: 'Accueillir', s: '1ʳᵉ brique de la sécurité', icon: 'poignee'},
  {at: 76.5, l: 'Suivre', s: 'en permanence', icon: 'recyclage'},
];

/** 47 – 82,1 s : pilier 1, l'organisation interne et la feuille de route en 5 étapes. */
export const Organisation: React.FC = () => {
  const t = useT();
  const f = useCurrentFrame();
  const shake = t > 51.5 && t < 55.5 ? Math.sin(f * 1.3) * 6 * (1 - prog(t, 54.5, 55.5)) : 0;
  const cur = STEPS.filter((st) => t >= st.at).length - 1;
  return (
    <div style={{position: 'absolute', inset: 0, opacity: prog(t, 47.0, 47.3) * (1 - prog(t, 81.8, 82.1, easeIn))}}>
      <Kinetic text="Plus que des *bras*" at={47.05} until={51.5} y={420} size={90} maxWidth={1000} />
      <Kinetic text="L'organisation *bousculée*" at={51.55} until={57.3} y={420} size={74} maxWidth={1000} accent={AMBER} />
      <Kinetic text="Une feuille de route en *5 étapes*" at={57.35} until={62.05} y={420} size={66} maxWidth={1000} />
      <Kinetic text="La *feuille de route*" at={62.1} until={81.9} y={420} size={82} maxWidth={1000} />

      {t < 51.55 && <CineShot src="promo/mine-terrain.jpg" at={47.1} until={51.55} move="right" pos="65% 40%" y={1020} h={920} label="Une équipe extérieure arrive" />}
      {t >= 51.55 && t < 57.35 && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 51.55, 57.35)}}>
          {/* organigramme bousculé */}
          <div style={{position: 'absolute', inset: 0, transform: `translateX(${shake}px) rotate(${shake * 0.15}deg)`, transformOrigin: '540px 1000px'}}>
            <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
              {[[540, 760, 300, 1000], [540, 760, 780, 1000], [300, 1000, 200, 1240], [300, 1000, 400, 1240], [780, 1000, 680, 1240], [780, 1000, 880, 1240]].map(([a, b, c, d], i) => (
                <line key={i} x1={a} y1={b} x2={c} y2={d} stroke={colors.navy} strokeWidth={5} opacity={prog(t, 51.7 + i * 0.05, 52.1 + i * 0.05)} />
              ))}
            </svg>
            {[[540, 760, 'homme-bureau'], [300, 1000, 'femme-bureau'], [780, 1000, 'homme-bureau'], [200, 1240, 'ouvrier'], [400, 1240, 'ouvrier'], [680, 1240, 'ouvrier'], [880, 1240, 'ouvrier']].map(([x, y, n], i) => (
              <Enter key={i} at={51.6 + i * 0.06} x={x as number} y={y as number} bouncy><div style={{width: 120, height: 120, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 18px rgba(0,0,0,0.12)', border: `5px solid ${colors.navy}`}}><F n={n as string} size={86} /></div></Enter>
            ))}
          </div>
          <Enter at={52.4} x={540} y={1480} from="right" dist={600}><Company label="Entreprise extérieure" sub="nouvel arrivant" icon="ouvrier" color={colors.green} w={360} /></Enter>
          <Highlight at={53.0} until={57.2} x={540} y={1000} r={430} color={AMBER} />
        </div>
      )}
      {t >= 57.35 && t < 62.1 && (
        <div style={{position: 'absolute', inset: 0, opacity: fade(t, 57.35, 62.1)}}>
          <Enter at={57.4} x={540} y={1020} bouncy><F n="carte" size={360} float={8} /></Enter>
          <Enter at={59.4} x={540} y={1400} bouncy>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 260, color: AMBER, lineHeight: 1, textShadow: '0 14px 30px rgba(227,155,31,0.35)'}}>5</div>
          </Enter>
        </div>
      )}
      {t >= 62.1 && (
        <>
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            <line x1={150} y1={640} x2={150} y2={640 + 880 * prog(t, 62.1, 77.0, (v) => v)} stroke={colors.green} strokeWidth={8} strokeDasharray="14 12" />
          </svg>
          {STEPS.map((st, i) => (
            <Enter key={st.l} at={st.at} x={600} y={660 + i * 210} from="left" dist={-300}>
              <div style={{width: 860, display: 'flex', alignItems: 'center', gap: 22, background: i === cur ? colors.navy : '#fff', borderRadius: 28, padding: '14px 22px', boxShadow: '0 12px 26px rgba(30,25,10,0.15)', borderLeft: `14px solid ${i === 4 ? colors.green : AMBER}`}}>
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: i === cur ? AMBER : colors.navy, width: 50, textAlign: 'center'}}>{i + 1}</div>
                <F n={st.icon} size={86} />
                <div style={{fontFamily: sansFont}}>
                  <div style={{fontWeight: 900, fontSize: 44, color: i === cur ? '#fff' : colors.navy}}>{st.l}</div>
                  <div style={{fontWeight: 600, fontSize: 28, color: i === cur ? '#C9D6EA' : '#5B6675'}}>{st.s}</div>
                </div>
                {i < cur && <div style={{marginLeft: 'auto'}}><Verdict ok size={60} /></div>}
              </div>
            </Enter>
          ))}
          <Enter at={79.8} x={760} y={1500} bouncy>
            <div style={{position: 'relative'}}><Pill label="On signe et on oublie" color={RED} size={30} /><div style={{position: 'absolute', left: 10, right: 10, top: '50%'}}><Strike p={prog(t, 80.6, 81.1)} w={330} /></div></div>
          </Enter>
        </>
      )}
    </div>
  );
};
