import {interpolate} from 'remotion';
import {easeIn, easeInOut, easeOut, Enter, kf, Kinetic, prog, useSpring, useT} from '../anim';
import {CharterDoc, RED, Strike} from '../charte/ui';
import {Gauge, Note, Op, Stamp, Win} from '../danger2/ui';
import {F, IsoCard, Pill} from '../iso/ui';
import {CineShot, Highlight} from '../prevention2/Cine';
import {colors, handFont, sansFont} from '../theme';

const GOLD = '#E3A92B';
const img = (n: string) => `iso26/${n}.jpg`;

/** Bandeau « Évolution n / 4 » sous l'en-tête. */
export const EvoBadge: React.FC<{at: number; until: number; n: number; label: string}> = ({at, until, n, label}) => {
  const t = useT();
  if (t < at || t > until) return null;
  const p = prog(t, at, at + 0.5, easeOut) * (1 - prog(t, until - 0.3, until, easeIn));
  return (
    <div style={{position: 'absolute', left: 40, top: 290, display: 'flex', alignItems: 'center', gap: 16, opacity: p, transform: `translateX(${(1 - p) * -80}px)`}}>
      <div style={{width: 92, height: 92, borderRadius: 24, background: colors.navy, color: GOLD, fontFamily: sansFont, fontWeight: 900, fontSize: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 22px rgba(14,42,92,0.3)'}}>0{n}</div>
      <div style={{fontFamily: sansFont}}>
        <div style={{fontWeight: 800, fontSize: 24, color: colors.green, letterSpacing: 5}}>ÉVOLUTION {n} / 4</div>
        <div style={{fontWeight: 900, fontSize: 36, color: colors.navy, textTransform: 'uppercase', letterSpacing: -0.5}}>{label}</div>
      </div>
    </div>
  );
};

/** Carte de norme ISO générique. */
const Norm: React.FC<{code: string; name: string; icon: string; color: string; w?: number}> = ({code, name, icon, color, w = 290}) => (
  <div style={{width: w, padding: '22px 0', borderRadius: 28, background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, boxShadow: '0 16px 32px rgba(14,30,60,0.18)', borderTop: `12px solid ${color}`}}>
    <F n={icon} size={w * 0.38} />
    <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: w * 0.09, color: colors.ink, letterSpacing: 2}}>ISO</div>
    <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: w * 0.2, color, lineHeight: 1}}>{code}</div>
    <div style={{fontFamily: handFont, fontSize: w * 0.12, color: colors.navy}}>{name}</div>
  </div>
);

/** 0 – 13,4 s : la version 2026 est publiée, 4 évolutions à retenir. */
export const Intro: React.FC = () => {
  const t = useT();
  const year = Math.round(kf(t, [0.4, 2.2], [2015, 2026]));
  const swap = prog(t, 3.6, 4.2, easeInOut);
  const stamp = prog(t, 5.9, 6.2, easeOut);
  return (
    <>
      <Kinetic text="ISO 9001 version *2026*" at={0.2} until={6.85} y={430} size={86} maxWidth={1000} />
      <Kinetic text="Pas tout *réinventer*" at={6.9} until={10.5} y={430} size={88} maxWidth={1000} />
      <Kinetic text="*4* évolutions majeures" at={10.55} until={13.35} y={430} size={84} maxWidth={1000} />

      <Win a={0.2} b={6.85}>
        <CineShot src={img('usine-porte')} at={0.2} until={6.85} move="push" pos="50% 55%" y={940} h={760} label="Plus de dix ans d'attente">
          <div style={{position: 'absolute', right: 30, top: 30, background: 'rgba(14,42,92,0.85)', color: '#fff', borderRadius: 18, padding: '10px 22px', fontFamily: sansFont, fontWeight: 900, fontSize: 64, letterSpacing: -1, opacity: prog(t, 0.4, 0.8)}}>
            {year}
          </div>
        </CineShot>
        {t > 3.4 && (
          <div style={{position: 'absolute', left: 540, top: 1400, transform: 'translate(-50%, -50%)', display: 'flex', alignItems: 'center', gap: 30}}>
            <div style={{opacity: 1 - 0.5 * swap, transform: `scale(${1 - 0.15 * swap})`}}><IsoCard year="2015" w={230} /></div>
            <div style={{opacity: swap, fontFamily: sansFont, fontWeight: 900, fontSize: 70, color: colors.navy}}>→</div>
            <div style={{opacity: swap, transform: `scale(${0.6 + 0.4 * swap})`}}><IsoCard year="2026" active w={260} /></div>
          </div>
        )}
        {t > 5.9 && <div style={{position: 'absolute', left: 800, top: 1230, transform: 'translate(-50%, -50%)'}}><Stamp text="PUBLIÉE" p={stamp} size={56} /></div>}
      </Win>

      <Win a={6.9} b={10.5}>
        <CineShot src={img('analyste-kpi')} at={6.9} until={10.5} move="left" pos="60% 50%" y={960} h={760} grade="cold" />
        <Enter at={7.5} x={540} y={1400} bouncy><Pill label="Entreprises certifiées" icon="diplome" size={34} /></Enter>
        {t > 9.4 && (
          <div style={{position: 'absolute', left: 540, top: 1260, transform: 'translate(-50%, -50%)'}}>
            <div style={{position: 'relative', fontFamily: handFont, fontSize: 70, color: RED, background: 'rgba(255,255,255,0.92)', borderRadius: 16, padding: '0 24px'}}>
              tout réinventer ?
              <div style={{position: 'absolute', left: 0, right: 0, top: '50%'}}><Strike p={prog(t, 9.7, 10.1)} w={460} /></div>
            </div>
          </div>
        )}
      </Win>

      <Win a={10.55} b={13.35}>
        {[
          ['equipe', 'Culture qualité'],
          ['cible', 'Risques & opportunités'],
          ['ampoule', 'Clarification'],
          ['cle', 'Transition sereine'],
        ].map(([ic, l], i) => (
          <Enter key={l} at={11.1 + i * 0.32} x={i % 2 ? 790 : 290} y={i < 2 ? 820 : 1220} bouncy>
            <div style={{width: 430, height: 340, borderRadius: 34, background: '#fff', boxShadow: '0 16px 32px rgba(14,30,60,0.18)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, position: 'relative', borderBottom: `10px solid ${i % 2 ? colors.green : colors.navy}`}}>
              <div style={{position: 'absolute', left: 22, top: 14, fontFamily: sansFont, fontWeight: 900, fontSize: 56, color: GOLD}}>0{i + 1}</div>
              <F n={ic} size={150} />
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 34, color: colors.navy, textAlign: 'center'}}>{l}</div>
            </div>
          </Enter>
        ))}
      </Win>
    </>
  );
};

const RING = ['equipe', 'ouvrier', 'femme-bureau', 'casque', 'engrenage', 'homme-bureau'];

/** 13,4 – 26,2 s : la culture qualité. */
export const Culture: React.FC = () => {
  const t = useT();
  return (
    <>
      <EvoBadge at={13.45} until={26.1} n={1} label="Culture qualité" />
      <Kinetic text="La *culture* qualité" at={13.45} until={17.1} y={515} size={86} maxWidth={1000} />
      <Kinetic text="Plus l'affaire d'*un seul*" at={17.15} until={20.5} y={515} size={80} accent={RED} maxWidth={1000} />
      <Kinetic text="Une démarche *globale*" at={20.55} until={26.1} y={515} size={82} maxWidth={1000} />

      <Win a={13.45} b={17.1}>
        <CineShot src={img('direction-equipe')} at={13.45} until={17.1} move="push" pos="55% 45%" y={1080} h={820} label="La direction s'engage" />
        <Highlight at={15.6} until={17.1} x={760} y={950} r={120} color={GOLD} />
      </Win>

      <Win a={17.15} b={20.5}>
        <Enter at={17.3} x={540} y={930} bouncy><F n="homme-bureau" size={340} /></Enter>
        <Enter at={18.0} x={540} y={1180} bouncy><Pill label="Responsable QHSE" icon="badge" size={36} /></Enter>
        <Enter at={18.4} x={540} y={1340} bouncy>
          <div style={{position: 'relative', fontFamily: handFont, fontSize: 62, color: RED}}>
            seul responsable
            <div style={{position: 'absolute', left: -10, right: -10, top: '50%'}}><Strike p={prog(t, 18.9, 19.4)} w={430} /></div>
          </div>
        </Enter>
      </Win>

      <Win a={20.55} b={26.1}>
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
          {RING.map((_, i) => {
            const a = (i / RING.length) * Math.PI * 2 - Math.PI / 2;
            const p = prog(t, 21.3 + i * 0.18, 21.8 + i * 0.18);
            return <line key={i} x1={540} y1={1040} x2={540 + Math.cos(a) * 330 * p} y2={1040 + Math.sin(a) * 330 * p} stroke={colors.green} strokeWidth={6} strokeDasharray="14 10" />;
          })}
          <circle cx={540} cy={1040} r={330 * prog(t, 23.0, 24.0)} fill="none" stroke={colors.navy} strokeWidth={4} opacity={0.25} />
        </svg>
        <Enter at={20.8} x={540} y={1040} bouncy>
          <div style={{width: 230, height: 230, borderRadius: '50%', background: colors.navy, color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 16px 36px rgba(14,42,92,0.4)', border: `8px solid ${GOLD}`}}>
            <F n="trophee" size={100} />
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, letterSpacing: 1}}>QUALITÉ</div>
          </div>
        </Enter>
        {RING.map((ic, i) => {
          const a = (i / RING.length) * Math.PI * 2 - Math.PI / 2;
          return (
            <Enter key={ic} at={21.6 + i * 0.18} x={540 + Math.cos(a) * 330} y={1040 + Math.sin(a) * 330} bouncy>
              <div style={{width: 150, height: 150, borderRadius: 40, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 24px rgba(14,30,60,0.18)'}}><F n={ic} size={104} /></div>
            </Enter>
          );
        })}
        <Enter at={24.9} x={540} y={1440} bouncy><Pill label="Portée par toute la direction" icon="poignee" size={34} /></Enter>
      </Win>
    </>
  );
};

/** 26,2 – 38,8 s : l'approche par les risques pilote la stratégie. */
export const Risques: React.FC = () => {
  const t = useT();
    return (
    <>
      <EvoBadge at={26.2} until={38.75} n={2} label="Risques & opportunités" />
      <Kinetic text="Une nouvelle *dimension*" at={26.2} until={31.5} y={515} size={82} maxWidth={1000} />
      <Kinetic text="Piloter la *stratégie*" at={31.55} until={38.75} y={515} size={84} maxWidth={1000} />

      <Win a={26.2} b={31.5}>
        <CineShot src={img('tablette-matrice')} at={26.2} until={31.5} move="push" pos="55% 50%" y={1060} h={800} label="Analyse des risques" />
        {t > 28.9 && (
          <div style={{position: 'absolute', left: 540, top: 1350, transform: 'translate(-50%, -50%)'}}>
            <Enter at={29.0} x={0} y={0} bouncy>
              <div style={{position: 'relative', display: 'flex', alignItems: 'center', gap: 16, background: '#fff', borderRadius: 22, padding: '12px 26px', boxShadow: '0 12px 26px rgba(0,0,0,0.25)'}}>
                <F n="classeur" size={80} />
                <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 34, color: colors.navy, whiteSpace: 'nowrap'}}>Simple outil documentaire</div>
                <div style={{position: 'absolute', left: 10, right: 10, top: '50%'}}><Strike p={prog(t, 30.4, 30.9)} w={560} /></div>
              </div>
            </Enter>
          </div>
        )}
      </Win>

      <Win a={31.55} b={38.75}>
        <CineShot src={img('courbe-strategie')} at={31.55} until={38.75} move="right" pos="40% 50%" y={950} h={600} grade="none" />
        <Enter at={32.1} x={290} y={1300} from="left" dist={-260}><Pill label="Risques" icon="danger" color={RED} size={36} /></Enter>
        <Enter at={32.7} x={790} y={1300} from="right" dist={260}><Pill label="Opportunités" icon="ampoule" color={colors.green} size={36} /></Enter>
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
          <path d={`M290 1350 Q 290 1440 ${540 - 10} 1450`} stroke={colors.navy} strokeWidth={6} fill="none" opacity={prog(t, 33.9, 34.3)} />
          <path d={`M790 1350 Q 790 1440 ${540 + 10} 1450`} stroke={colors.navy} strokeWidth={6} fill="none" opacity={prog(t, 33.9, 34.3)} />
        </svg>
        <Enter at={34.4} x={540} y={1470} bouncy><Pill label="Décisions stratégiques" icon="cible" color={GOLD} size={36} /></Enter>
        <Enter at={37.0} x={790} y={700} bouncy><Note text="performance ↗" color={colors.green} size={58} /></Enter>
      </Win>
    </>
  );
};

/** 38,8 – 52,1 s : clarification, annexe A, alignement des référentiels. */
export const Clarification: React.FC = () => {
  const t = useT();
  const align = prog(t, 47.6, 48.6, easeInOut);
  return (
    <>
      <EvoBadge at={38.85} until={52.0} n={3} label="Clarification" />
      <Kinetic text="Un effort *inédit*" at={38.85} until={41.8} y={515} size={88} maxWidth={1000} />
      <Kinetic text="Une nouvelle *annexe A*" at={41.85} until={46.0} y={515} size={82} maxWidth={1000} />
      <Kinetic text="Alignée sur les *autres ISO*" at={46.05} until={52.0} y={515} size={78} maxWidth={1000} />

      <Win a={38.85} b={41.8}>
        <CineShot src={img('rapport-audit')} at={38.85} until={41.8} move="push" pos="45% 50%" y={1060} h={800} label="Des exigences plus lisibles" />
      </Win>

      <Win a={41.85} b={46.0}>
        <Enter at={42.0} x={540} y={980} bouncy>
          <CharterDoc w={430} write={prog(t, 42.4, 45.0, (v) => v)} seal={prog(t, 45.1, 45.5)} title="ANNEXE A" lines={6} />
        </Enter>
        <Enter at={43.0} x={850} y={760} bouncy><F n="ampoule" size={170} float={6} /></Enter>
        <Enter at={44.4} x={540} y={1420} bouncy><Pill label="Explique concrètement les exigences" icon="loupe" size={32} /></Enter>
      </Win>

      <Win a={46.05} b={52.0}>
        {[
          ['9001', 'Qualité', 'trophee', colors.navy, -1],
          ['14001', 'Environnement', 'feuille', colors.green, 0],
          ['45001', 'Santé-sécurité', 'casque', GOLD, 1],
        ].map(([c, n, ic, col, k], i) => {
          const kk = k as number;
          const y0 = 1000 + [-120, 140, -60][i];
          return (
            <div key={c as string} style={{position: 'absolute', left: 540 + kk * 330, top: interpolate(align, [0, 1], [y0, 980]), transform: `translate(-50%, -50%) rotate(${(1 - align) * kk * 8}deg)`}}>
              <Enter at={46.3 + i * 0.35} x={0} y={0} bouncy><Norm code={c as string} name={n as string} icon={ic as string} color={col as string} /></Enter>
            </div>
          );
        })}
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
          <line x1={100} y1={1220} x2={100 + 880 * prog(t, 48.4, 49.0)} y2={1220} stroke={colors.green} strokeWidth={8} strokeLinecap="round" />
        </svg>
        <Enter at={49.6} x={540} y={1360} bouncy><Pill label="Multi-certification facilitée" icon="check" size={36} /></Enter>
      </Win>
    </>
  );
};

/** 52,1 – 64,4 s : pas de reconstruction, analyser les écarts. */
export const Transition: React.FC = () => {
  const t = useT();
  const items = [61.3, 62.1, 62.9];
  const done = items.filter((a) => t > a).length;
  return (
    <>
      <EvoBadge at={52.1} until={64.35} n={4} label="Transition sereine" />
      <Kinetic text="Rassurez-*vous*" at={52.1} until={57.5} y={515} size={92} />
      <Kinetic text="L'architecture reste *intacte*" at={57.55} until={60.05} y={515} size={74} maxWidth={1000} />
      <Kinetic text="Analyser vos *écarts*" at={60.1} until={64.35} y={515} size={86} maxWidth={1000} />

      <Win a={52.1} b={57.5}>
        <CineShot src={img('labo-manuel')} at={52.1} until={57.5} move="up" pos="45% 50%" y={1010} h={720} label="Votre système actuel" />
        {t > 55.6 && (
          <div style={{position: 'absolute', left: 540, top: 1420, transform: 'translate(-50%, -50%)'}}>
            <div style={{position: 'relative', fontFamily: handFont, fontSize: 64, color: RED, background: 'rgba(255,255,255,0.92)', borderRadius: 16, padding: '0 24px', whiteSpace: 'nowrap', opacity: prog(t, 55.6, 55.9)}}>
              rebâtir de zéro
              <div style={{position: 'absolute', left: 0, right: 0, top: '50%'}}><Strike p={prog(t, 56.9, 57.3)} w={440} /></div>
            </div>
          </div>
        )}
      </Win>

      <Win a={57.55} b={60.05}>
        <Enter at={57.7} x={540} y={980} bouncy><F n="temple" size={420} /></Enter>
        {t > 59.2 && <div style={{position: 'absolute', left: 540, top: 1300, transform: 'translate(-50%, -50%)'}}><Stamp text="INTACTE" p={prog(t, 59.2, 59.5)} size={60} /></div>}
      </Win>

      <Win a={60.1} b={64.35}>
        <CineShot src={img('audit-checklist')} at={60.1} until={64.35} move="push" pos="45% 50%" y={980} h={640} grade="none" />
        <Enter at={60.9} x={540} y={1400} from="down" dist={160}>
          <div style={{background: '#fff', borderRadius: 26, padding: '22px 30px', boxShadow: '0 14px 28px rgba(14,30,60,0.18)'}}>
            <Gauge v={done / 3} label="Écarts analysés" w={760} color={colors.green} />
          </div>
        </Enter>
      </Win>
    </>
  );
};

/** 64,4 s – outro : évolution, pas révolution ; diagnostic ; appel à commenter. */
export const Conclusion: React.FC<{end: number}> = ({end}) => {
  const t = useT();
  const typed = 'ISO 2026'.slice(0, Math.max(0, Math.floor((t - 75.7) * 8)));
  const heart = useSpring(76.9, {damping: 8});
  return (
    <>
      <Kinetic text="Pas une *révolution*" at={64.45} until={69.3} y={430} size={88} accent={RED} maxWidth={1000} />
      <Kinetic text="Une évolution *stratégique*" at={69.35} until={71.2} y={430} size={78} maxWidth={1000} />
      <Kinetic text="Votre *diagnostic*" at={71.25} until={74.1} y={430} size={92} />
      <Kinetic text="Prêts pour la *transition* ?" at={74.15} until={end} y={430} size={78} maxWidth={1000} />

      <Win a={64.45} b={71.2}>
        <CineShot src={img('archives-couloir')} at={64.45} until={71.2} move="push" pos="50% 50%" y={960} h={760} />
        {t > 67.8 && (
          <div style={{position: 'absolute', left: 540, top: 1400, transform: 'translate(-50%, -50%)', display: 'flex', alignItems: 'center', gap: 26}}>
            <div style={{position: 'relative', fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: RED, opacity: 1 - 0.4 * prog(t, 69.4, 69.8)}}>
              RÉVOLUTION
              <div style={{position: 'absolute', left: -6, right: -6, top: '50%'}}><Strike p={prog(t, 68.6, 69.0)} w={340} /></div>
            </div>
            {t > 69.5 && <Op c="→" size={80} color={colors.navy} />}
            {t > 69.5 && <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: colors.green, transform: `scale(${prog(t, 69.6, 70.0)})`}}>ÉVOLUTION</div>}
          </div>
        )}
      </Win>

      <Win a={71.25} b={74.1}>
        {[
          ['loupe', 'Diagnostic', 71.5],
          ['clipboard', 'Écarts', 72.2],
          ['check', 'Actions', 72.9],
        ].map(([ic, l, at], i) => (
          <Enter key={l as string} at={at as number} x={540} y={760 + i * 230} from="left" dist={-260}>
            <div style={{width: 760, display: 'flex', alignItems: 'center', gap: 24, background: '#fff', borderRadius: 30, padding: '18px 26px', boxShadow: '0 14px 30px rgba(30,25,10,0.15)', borderLeft: `14px solid ${[colors.navy, GOLD, colors.green][i]}`}}>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 64, color: [colors.navy, GOLD, colors.green][i], width: 60}}>{i + 1}</div>
              <F n={ic as string} size={100} />
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 52, color: colors.navy, textTransform: 'uppercase'}}>{l}</div>
            </div>
          </Enter>
        ))}
        <Enter at={73.3} x={540} y={1440} bouncy><Note text="dès aujourd'hui !" color={colors.green} size={64} /></Enter>
      </Win>

      <Win a={74.15} b={end + 0.3}>
        <Enter at={74.4} x={540} y={830} bouncy><F n="fusee" size={260} float={10} /></Enter>
        <Enter at={75.4} x={540} y={1180} from="down" dist={160}>
          <div style={{width: 820, background: '#fff', borderRadius: 34, padding: '26px 30px', boxShadow: '0 18px 40px rgba(14,30,60,0.22)', display: 'flex', alignItems: 'center', gap: 22, position: 'relative'}}>
            <div style={{width: 96, height: 96, borderRadius: '50%', background: colors.navy, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n="bulle" size={64} /></div>
            <div style={{flex: 1}}>
              <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 26, color: '#7A8594'}}>Votre commentaire</div>
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 62, color: colors.navy, minHeight: 72}}>
                {typed}
                <span style={{opacity: Math.sin(t * 12) > 0 ? 1 : 0, color: colors.green}}>|</span>
              </div>
            </div>
            <div style={{transform: `scale(${heart})`}}><F n="pouce" size={100} /></div>
          </div>
        </Enter>
      </Win>
    </>
  );
};
