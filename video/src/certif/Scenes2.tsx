import {easeInOut, easeOut, Enter, kf, Kinetic, prog, useSpring, useT} from '../anim';
import {RED} from '../charte/ui';
import {Note, Op, Stamp, Win} from '../danger2/ui';
import {F, Pill} from '../iso/ui';
import {colors, handFont, sansFont} from '../theme';
import {ACCR, AGR, Badge, CERT} from './Scenes1';

const ROWS: [string, string, string, number, number][] = [
  ['Pour qui ?', 'Entreprise, produit, personne', 'Organisme de contrôle', 147.9, 152.3],
  ['Délivrée par', 'Organisme certificateur (ex. AFNOR)', 'Autorité nationale (COFRAC)', 155.3, 159.5],
  ['La question', '« Êtes-vous conforme ? »', '« Êtes-vous compétent ? »', 163.7, 166.1],
];

const CHAIN = [
  {l: 'COFRAC', s: 'autorité nationale', icon: 'temple', c: ACCR, at: 173.6, verb: 'accrédite', vAt: 176.6},
  {l: 'Organismes certificateurs', s: 'ex. AFNOR', icon: 'loupe2', c: CERT, at: 177.6, verb: 'certifient', vAt: 181.6},
  {l: 'Entreprise certifiée', s: 'le terrain', icon: 'usine', c: colors.navy, at: 184.8, verb: '', vAt: 0},
];

/** 134 – 203,9 s : la hiérarchie de confiance. */
export const Hierarchie: React.FC = () => {
  const t = useT();
  return (
    <>
      <Kinetic text="Une *pyramide* de confiance" at={134.0} until={137.6} y={420} size={80} accent={ACCR} maxWidth={1000} />
      <Kinetic text="Face à *face*" at={137.65} until={169.75} y={420} size={96} accent={ACCR} />
      <Kinetic text="La chaîne de *confiance*" at={169.8} until={190.3} y={420} size={84} accent={ACCR} maxWidth={1000} />
      <Kinetic text="Beaucoup plus *exigeante*" at={190.35} until={203.85} y={420} size={80} accent={ACCR} maxWidth={1000} />

      <Win a={134.0} b={137.6}>
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
          {[0, 1, 2].map((i) => {
            const p = prog(t, 134.3 + i * 0.35, 134.9 + i * 0.35, easeOut);
            const y = 1300 - i * 230;
            const w = 860 - i * 260;
            return <polygon key={i} points={`${540 - w / 2},${y} ${540 + w / 2},${y} ${540 + (w - 260) / 2},${y - 210} ${540 - (w - 260) / 2},${y - 210}`} fill={[colors.navy, CERT, ACCR][i]} opacity={p} transform={`translate(0 ${(1 - p) * -60})`} />;
          })}
        </svg>
        <Enter at={135.6} x={540} y={700} bouncy><F n="couronne" size={150} /></Enter>
      </Win>

      {/* tableau comparatif */}
      <Win a={137.65} b={169.75}>
        <Enter at={144.2} x={540} y={640} from="up" dist={-200}>
          <div style={{width: 1000, display: 'flex', gap: 10}}>
            <div style={{width: 220}} />
            <div style={{flex: 1, background: CERT, color: '#fff', borderRadius: 20, padding: '14px 0', textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 32}}>CERTIFICATION</div>
            <div style={{flex: 1, background: ACCR, color: '#fff', borderRadius: 20, padding: '14px 0', textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 32}}>ACCRÉDITATION</div>
          </div>
        </Enter>
        {t < 144.2 && <Enter at={138.6} x={540} y={980} bouncy><F n="balance" size={300} /></Enter>}
        {ROWS.map(([q, a, b, at1, at2], i) => (
          <div key={q}>
            <Enter at={at1 - 0.3} x={150} y={830 + i * 220} from="left" dist={-200}>
              <div style={{width: 220, background: AGR, color: colors.ink, borderRadius: 16, padding: '12px 10px', textAlign: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 28}}>{q}</div>
            </Enter>
            <Enter at={at1} x={440} y={830 + i * 220} bouncy>
              <div style={{width: 375, minHeight: 150, background: '#fff', borderRadius: 22, padding: '16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: colors.navy, boxShadow: '0 10px 22px rgba(14,30,60,0.14)', borderBottom: `8px solid ${CERT}`}}>{a}</div>
            </Enter>
            <Enter at={at2} x={830} y={830 + i * 220} bouncy>
              <div style={{width: 375, minHeight: 150, background: '#fff', borderRadius: 22, padding: '16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: colors.navy, boxShadow: '0 10px 22px rgba(14,30,60,0.14)', borderBottom: `8px solid ${ACCR}`}}>{b}</div>
            </Enter>
          </div>
        ))}
        <Enter at={168.2} x={540} y={1500} bouncy><Note text="pas du tout le même plan !" color={RED} size={54} /></Enter>
      </Win>

      {/* cascade de confiance */}
      <Win a={169.8} b={190.3}>
        {CHAIN.map((c, i) => (
          <div key={c.l}>
            <Enter at={c.at} x={540} y={680 + i * 330} from="up" dist={-200}>
              <div style={{width: 760, display: 'flex', alignItems: 'center', gap: 24, background: '#fff', borderRadius: 30, padding: '20px 30px', boxShadow: '0 14px 30px rgba(14,30,60,0.16)', borderLeft: `16px solid ${c.c}`}}>
                <div style={{width: 110, height: 110, borderRadius: 30, background: c.c, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={c.icon} size={80} /></div>
                <div>
                  <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 42, color: colors.navy, lineHeight: 1.05}}>{c.l}</div>
                  <div style={{fontFamily: handFont, fontSize: 36, color: c.c}}>{c.s}</div>
                </div>
              </div>
            </Enter>
            {c.verb && (
              <>
                <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
                  <line x1={540} y1={780 + i * 330} x2={540} y2={780 + i * 330 + 130 * prog(t, c.vAt - 0.4, c.vAt + 0.2, easeInOut)} stroke={c.c} strokeWidth={10} strokeLinecap="round" />
                  {t > c.vAt + 0.2 && <path d={`M520 ${900 + i * 330} L540 ${925 + i * 330} L560 ${900 + i * 330}`} stroke={c.c} strokeWidth={10} fill="none" strokeLinecap="round" />}
                </svg>
                <Enter at={c.vAt} x={720} y={850 + i * 330} bouncy><Note text={c.verb} color={c.c} size={46} /></Enter>
              </>
            )}
          </div>
        ))}
        <Enter at={187.1} x={850} y={1500} bouncy><Pill label="Une cascade de confiance" icon="trinome" color={ACCR} size={28} /></Enter>
      </Win>

      {/* exigences de l'accréditation */}
      <Win a={190.35} b={203.85}>
        <Enter at={192.6} x={540} y={760} bouncy><F n="microscope" size={260} /></Enter>
        {[
          ['outils', 'Expertise technique', 197.6],
          ['juge', 'Déontologie', 198.8],
          ['balance', 'Impartialité', 199.8],
        ].map(([ic, l, at], i) => (
          <Enter key={l} at={at as number} x={200 + i * 340} y={1130} bouncy>
            <div style={{width: 300, height: 260, borderRadius: 36, background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: '0 14px 30px rgba(14,30,60,0.16)', borderBottom: `10px solid ${ACCR}`}}>
              <F n={ic as string} size={120} />
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: colors.navy, textAlign: 'center'}}>{l}</div>
            </div>
          </Enter>
        ))}
        <Enter at={201.6} x={540} y={1440} bouncy><Note text="la crédibilité de celui qui juge" color={ACCR} size={54} /></Enter>
      </Win>
    </>
  );
};

/** 211,1 – 247,3 s : l'agrément, puis le triangle de conformité. */
export const Agrement: React.FC = () => {
  const t = useT();
  const light = t > 225.0 ? 2 : t > 222.4 ? 1 : 0;
  const tri = (k: number) => prog(t, [230.7, 234.6, 239.8][k], [230.7, 234.6, 239.8][k] + 0.6, easeOut);
  return (
    <>
      <Kinetic text="L'agrément : autre *registre*" at={211.1} until={228.2} y={420} size={78} accent={AGR} maxWidth={1000} />
      <Kinetic text="Le triangle de *conformité*" at={228.25} until={247.2} y={420} size={78} accent={AGR} maxWidth={1000} />

      <Win a={211.1} b={228.2}>
        {t > 213.4 && (
          <div style={{position: 'absolute', left: 540, top: 720, transform: 'translate(-50%, -50%)', display: 'flex', gap: 20, opacity: prog(t, 213.4, 213.8) * (1 - 0.5 * prog(t, 217.4, 217.8))}}>
            <Pill label="Démarche volontaire" icon="check" color="#9AA4B2" size={28} />
            <Pill label="Validé par des pairs" icon="equipe" color="#9AA4B2" size={28} />
          </div>
        )}
        <Enter at={218.2} x={330} y={1040} bouncy>
          <div style={{textAlign: 'center'}}>
            <F n="temple" size={260} />
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 44, color: colors.navy}}>L'ÉTAT</div>
            <div style={{fontFamily: handFont, fontSize: 38, color: AGR}}>pouvoirs publics</div>
          </div>
        </Enter>
        {/* feu tricolore */}
        <Enter at={219.0} x={790} y={1040} bouncy>
          <div style={{width: 170, height: 440, borderRadius: 40, background: colors.navy, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', padding: '20px 0', boxShadow: '0 16px 32px rgba(14,42,92,0.4)'}}>
            {[RED, '#F2C230', '#2ECC71'].map((c, i) => (
              <div key={c} style={{width: 110, height: 110, borderRadius: '50%', background: c, opacity: light === i ? 1 : 0.2, boxShadow: light === i ? `0 0 40px ${c}` : 'none'}} />
            ))}
          </div>
        </Enter>
        <Enter at={221.6} x={330} y={1430} bouncy><Pill label="Souvent obligatoire" icon="parchemin" color={AGR} size={30} /></Enter>
        <Enter at={225.1} x={790} y={1360} bouncy><Note text="feu vert pour exercer" color={colors.green} size={46} /></Enter>
      </Win>

      <Win a={228.25} b={247.2}>
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
          <polygon points="540,800 230,1300 850,1300" fill="rgba(227,169,43,0.08)" stroke={colors.navy} strokeWidth={6} strokeDasharray="1400" strokeDashoffset={1400 * (1 - prog(t, 228.5, 229.8, easeInOut))} />
        </svg>
        <div style={{position: 'absolute', left: 540, top: 800, transform: `translate(-50%, -50%) scale(${tri(0)})`}}>
          <Badge label="Agrément" sub="autorisation de l'État" icon="temple" color={AGR} size={250} />
        </div>
        <div style={{position: 'absolute', left: 230, top: 1300, transform: `translate(-50%, -50%) scale(${tri(1)})`}}>
          <Badge label="Accréditation" sub="compétence technique" icon="loupe2" color={ACCR} size={250} />
        </div>
        <div style={{position: 'absolute', left: 850, top: 1300, transform: `translate(-50%, -50%) scale(${tri(2)})`}}>
          <Badge label="Certification" sub="conformité à une norme" icon="check" color={CERT} size={250} />
        </div>
        <Enter at={233.4} x={850} y={760} bouncy><Pill label="Obligatoire" icon="parchemin" color={AGR} size={26} /></Enter>
        <Enter at={244.6} x={850} y={1540} bouncy><Pill label="Volontaire" icon="check" color={CERT} size={26} /></Enter>
        <Enter at={245.5} x={300} y={1540} bouncy><Note text="3 logiques distinctes" size={50} /></Enter>
      </Win>
    </>
  );
};

/** 251,6 s – outro : l'astuce C = Client, A = Arbitre. */
export const Astuce: React.FC<{end: number}> = ({end}) => {
  const t = useT();
  const c = useSpring(258.0, {damping: 9});
  const a = useSpring(263.8, {damping: 9});
  return (
    <>
      <Kinetic text="L'astuce *mémoire*" at={251.65} until={269.1} y={420} size={92} accent={RED} />
      <Kinetic text="L'architecture de la *confiance*" at={269.15} until={end} y={420} size={74} accent={ACCR} maxWidth={1000} />

      <Win a={251.65} b={269.1}>
        {t < 257.9 && <Enter at={252.0} x={540} y={980} bouncy><F n="ampoule" size={320} float={8} /></Enter>}
        {t >= 257.9 && (
          <>
            <div style={{position: 'absolute', left: 290, top: 980, transform: `translate(-50%, -50%) scale(${c})`}}>
              <div style={{width: 440, height: 760, borderRadius: 40, background: CERT, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: '0 20px 40px rgba(46,155,62,0.4)', position: 'relative', overflow: 'hidden'}}>
                <div style={{position: 'absolute', fontFamily: sansFont, fontWeight: 900, fontSize: 560, color: 'rgba(255,255,255,0.15)', lineHeight: 1}}>C</div>
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: '#fff'}}>CERTIFICATION</div>
                <F n="poignee" size={190} />
                <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 84, color: '#fff', lineHeight: 1}}><span style={{color: '#F2C230'}}>C</span>lient</div>
                <div style={{fontFamily: handFont, fontSize: 36, color: '#fff', textAlign: 'center', padding: '0 24px', opacity: prog(t, 260.6, 261.0)}}>prouver sa conformité</div>
              </div>
            </div>
            {t >= 263.8 && (
              <div style={{position: 'absolute', left: 790, top: 980, transform: `translate(-50%, -50%) scale(${a})`}}>
                <div style={{width: 440, height: 760, borderRadius: 40, background: ACCR, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: '0 20px 40px rgba(61,125,216,0.4)', position: 'relative', overflow: 'hidden'}}>
                  <div style={{position: 'absolute', fontFamily: sansFont, fontWeight: 900, fontSize: 560, color: 'rgba(255,255,255,0.15)', lineHeight: 1}}>A</div>
                  <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 40, color: '#fff'}}>ACCRÉDITATION</div>
                  <F n="arbitre" size={190} />
                  <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 84, color: '#fff', lineHeight: 1}}><span style={{color: '#F2C230'}}>A</span>rbitre</div>
                  <div style={{fontFamily: handFont, fontSize: 36, color: '#fff', textAlign: 'center', padding: '0 24px', opacity: prog(t, 266.6, 267.0)}}>prouver sa compétence à juger</div>
                </div>
              </div>
            )}
          </>
        )}
      </Win>

      <Win a={269.15} b={end + 0.3}>
        {[
          ['Agrément', 'temple', AGR],
          ['Accréditation', 'loupe2', ACCR],
          ['Certification', 'check', CERT],
        ].map(([l, ic, col], i) => (
          <Enter key={l} at={270.0 + i * 0.5} x={540} y={760 + i * 210} from="up" dist={-300}>
            <div style={{width: 520 + i * 160, height: 170, borderRadius: 24, background: col, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, boxShadow: '0 14px 28px rgba(14,42,92,0.3)'}}>
              <F n={ic} size={90} />
              <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 48, color: '#fff', textTransform: 'uppercase'}}>{l}</div>
            </div>
          </Enter>
        ))}
        {t > 276.6 && <div style={{position: 'absolute', left: 540, top: 1440, transform: 'translate(-50%, -50%)'}}><Stamp text="FIABILITÉ GARANTIE" p={prog(t, 276.6, 276.9)} color={CERT} size={48} /></div>}
      </Win>
    </>
  );
};

