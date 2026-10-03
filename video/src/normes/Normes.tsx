import {Building2, Cloud, FileCheck, Globe, HardHat, Landmark, Leaf, Recycle, ShieldCheck, ShoppingCart, Star, Target, TriangleAlert, UserCheck, Users} from 'lucide-react';
import type {LucideIcon} from 'lucide-react';
import {AbsoluteFill, Audio, interpolate, staticFile} from 'remotion';
import {easeInOut, easeOut, Gate, prog, useT} from '../anim';
import {Cue, SfxTrack} from '../components/Fx';
import {Connector, fadeWin, IconDisc, InfoCard, KaraokeCaptions, KeyTitle, P, PanelWipe, PhotoFrame, PremiumBackground, PremiumFrame, PremiumIntro, PremiumOutro, Reveal} from '../premium/kit';
import {s, sansFont} from '../theme';
import {script} from './script';

const LOGO = 'promo/logo.png';
const OUTRO_AT = 56.8;
export const NORMES_FRAMES = s(61.6);

/** Une couleur par norme, dans la palette de la marque. */
const NORM = {
  q: {num: '9001', c: P.navy2, label: 'Qualité'},
  e: {num: '14001', c: P.green, label: 'Environnement'},
  s: {num: '45001', c: P.ink, label: 'Santé & sécurité'},
};

/** Badge de norme ISO (dessiné). */
const IsoBadge: React.FC<{n: keyof typeof NORM; size?: number}> = ({n, size = 260}) => {
  const d = NORM[n];
  return (
    <div style={{width: size, height: size, borderRadius: size * 0.2, background: d.c, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 44px rgba(14,42,92,0.22)', fontFamily: sansFont, color: '#fff', border: n === 's' ? `${size * 0.025}px solid ${P.green}` : undefined}}>
      <div style={{fontWeight: 700, fontSize: size * 0.13, letterSpacing: size * 0.02, opacity: 0.85}}>ISO</div>
      <div style={{fontWeight: 800, fontSize: size * 0.27, lineHeight: 1, letterSpacing: -size * 0.006}}>{d.num}</div>
      <div style={{width: size * 0.36, height: size * 0.018, background: n === 'e' ? '#fff' : P.green, borderRadius: 4, margin: `${size * 0.05}px 0`}} />
      <div style={{fontWeight: 600, fontSize: size * 0.075, opacity: 0.92}}>{d.label}</div>
    </div>
  );
};

/** Indicateur : barres qui montent (v ↑) ou descendent (v ↓). */
const Trend: React.FC<{label: string; Icon: LucideIcon; dir: 'up' | 'down'; p: number; color: string}> = ({label, Icon, dir, p, color}) => {
  const vals = dir === 'up' ? [0.35, 0.5, 0.68, 0.9] : [0.9, 0.68, 0.48, 0.28];
  return (
    <div style={{width: 430, background: P.white, borderRadius: 26, padding: '22px 24px', boxShadow: '0 14px 34px rgba(14,42,92,0.12)', fontFamily: sansFont}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 12, fontWeight: 800, fontSize: 30, color: P.navy}}>
        <Icon size={38} color={color} strokeWidth={1.8} />
        {label}
        <span style={{marginLeft: 'auto', fontSize: 40, color}}>{dir === 'up' ? '↗' : '↘'}</span>
      </div>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 16, height: 300, marginTop: 22}}>
        {vals.map((v, i) => <div key={i} style={{flex: 1, height: 300 * v * prog(p, i * 0.15, i * 0.15 + 0.5, easeOut), background: i === 3 ? color : P.line, borderRadius: 8}} />)}
      </div>
    </div>
  );
};

/** 0 – 10,5 s : paperasse ? Non : à qui rendre des comptes. Puis les 3 règles. */
const Hook: React.FC = () => {
  const t = useT();
  const fan = prog(t, 5.6, 6.6, easeInOut);
  return (
    <AbsoluteFill>
      <KeyTitle at={2.3} until={4.6} kicker="Idée reçue" title="Une montagne de *paperasse* ?" size={80} accent={P.grey} />
      <KeyTitle at={4.65} until={8.3} kicker="En réalité" title="À qui l'entreprise rend des *comptes*" size={74} />
      <KeyTitle at={8.35} until={10.45} kicker="Les règles du jeu" title="*3* grandes normes" size={86} />

      {t < 8.35 && (
        <AbsoluteFill style={{opacity: fadeWin(t, 2.3, 8.35, 0.01)}}>
          {/* pile de documents qui s'éventaille vers les trois destinataires */}
          {Array.from({length: 9}, (_, i) => {
            const st = 2.4 + i * 0.12;
            const y = interpolate(prog(t, st, st + 0.45, easeOut), [0, 1], [700, 1240 - i * 34]);
            const target = i % 3;
            const tx = [240, 540, 840][target];
            const ty = 1240;
            return t > st ? (
              <div key={i} style={{position: 'absolute', left: interpolate(fan, [0, 1], [540 + (i % 2 ? 10 : -10), tx]), top: interpolate(fan, [0, 1], [y, ty - Math.floor(i / 3) * 30]), transform: `translate(-50%, -50%) rotate(${(1 - fan) * ((i % 3) * 3 - 3)}deg)`, width: 360 * (1 - fan * 0.5), height: 52, borderRadius: 8, background: P.white, border: `3px solid #C3CCD8`, borderLeft: `14px solid ${[P.navy2, P.green, P.grey][i % 3]}`, boxShadow: '0 6px 14px rgba(14,42,92,0.12)', opacity: 1 - fan * 0.7}} />
            ) : null;
          })}
          {[
            {Icon: ShoppingCart, l: 'Clients', x: 240, at: 6.4},
            {Icon: Landmark, l: 'Régulateurs', x: 540, at: 6.7},
            {Icon: Users, l: 'Salariés', x: 840, at: 7.0},
          ].map((d) => (
            <Reveal key={d.l} at={d.at} x={d.x} y={1000} scale>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12}}>
                <IconDisc Icon={d.Icon} size={170} ring={P.green} />
                <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 32, color: P.navy}}>{d.l}</div>
              </div>
            </Reveal>
          ))}
        </AbsoluteFill>
      )}
      {t >= 8.35 && (
        <AbsoluteFill style={{opacity: fadeWin(t, 8.35, 10.5)}}>
          {(['q', 'e', 's'] as const).map((n, i) => (
            <Reveal key={n} at={8.8 + i * 0.3} x={[220, 540, 860][i]} y={1050} scale>
              <IsoBadge n={n} size={280} />
            </Reveal>
          ))}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/** 10,5 – 22,7 s : ISO 9001, le client et le produit parfait. */
const Qualite: React.FC = () => {
  const t = useT();
  const sat = prog(t, 17.3, 19.9, easeInOut);
  return (
    <AbsoluteFill>
      <KeyTitle at={10.5} until={12.7} kicker="Règle n°1" title="ISO *9001*" size={110} accent={P.navy2} />
      <KeyTitle at={12.75} until={17.2} kicker="ISO 9001" title="Le produit parfait, pour *le client*" size={76} />
      <KeyTitle at={17.25} until={20.25} kicker="ISO 9001 · mesure" title="La *satisfaction* globale" size={80} />
      <KeyTitle at={20.3} until={22.65} kicker="ISO 9001 · mesure" title="La réduction des *défauts*" size={80} />

      {t < 12.75 && <AbsoluteFill style={{opacity: fadeWin(t, 10.5, 12.75)}}><Reveal at={10.6} x={540} y={1060} scale><IsoBadge n="q" size={460} /></Reveal></AbsoluteFill>}
      {t >= 12.75 && t < 17.25 && (
        <AbsoluteFill style={{opacity: fadeWin(t, 12.75, 17.25)}}>
          <Reveal at={12.8} x={540} y={900} scale>
            <div style={{position: 'relative', width: 480, height: 480}}>
              {[1, 0.72, 0.44].map((r, i) => <div key={r} style={{position: 'absolute', left: 240 - 240 * r, top: 240 - 240 * r, width: 480 * r, height: 480 * r, borderRadius: '50%', border: `${14 - i * 3}px solid ${i === 2 ? P.green : P.navy2}`, opacity: 0.25 + i * 0.25}} />)}
              <div style={{position: 'absolute', left: 240, top: 240, transform: 'translate(-50%, -50%)'}}><IconDisc Icon={UserCheck} size={190} bg={P.navy} fg="#fff" /></div>
            </div>
          </Reveal>
          <Reveal at={13.7} x={540} y={1330}><InfoCard Icon={Target} label="Le produit parfait" w={560} /></Reveal>
          <Reveal at={16.3} x={540} y={1520}><div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 28, color: P.grey, letterSpacing: 3}}>UNE SEULE PERSONNE : LE CLIENT</div></Reveal>
        </AbsoluteFill>
      )}
      {t >= 17.25 && (
        <AbsoluteFill style={{opacity: fadeWin(t, 17.25, 22.7)}}>
          <Reveal at={17.3} x={540} y={760}>
            <div style={{display: 'flex', gap: 10}}>
              {[0, 1, 2, 3, 4].map((i) => <Star key={i} size={78} color={P.green} fill={sat > (i + 0.5) / 5 ? P.green : 'none'} strokeWidth={1.6} />)}
            </div>
          </Reveal>
          <Reveal at={19.4} x={290} y={1200} dx={-60} dy={0}><Trend label="Satisfaction" Icon={UserCheck} dir="up" p={prog(t, 19.4, 21.0)} color={P.green} /></Reveal>
          <Reveal at={20.8} x={790} y={1200} dx={60} dy={0}><Trend label="Défauts" Icon={TriangleAlert} dir="down" p={prog(t, 20.8, 22.4)} color={P.navy2} /></Reveal>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/** 22,7 – 35,1 s : ISO 14001, l'extérieur, le régulateur, CO2 et déchets. */
const Environnement: React.FC = () => {
  const t = useT();
  const wave = (t - 25.0) * 0.8;
  return (
    <AbsoluteFill>
      <KeyTitle at={22.7} until={24.85} kicker="Règle n°2" title="ISO *14001*" size={110} />
      <KeyTitle at={24.9} until={28.05} kicker="ISO 14001" title="Le regard tourné vers *l'extérieur*" size={74} />
      <KeyTitle at={28.1} until={31.5} kicker="ISO 14001" title="Prouver au *régulateur*" size={80} />
      <KeyTitle at={31.55} until={35.05} kicker="ISO 14001 · indicateurs" title="CO2 et *déchets* sous contrôle" size={74} />

      {t < 24.9 && <AbsoluteFill style={{opacity: fadeWin(t, 22.7, 24.9)}}><Reveal at={22.8} x={540} y={1060} scale><IsoBadge n="e" size={460} /></Reveal></AbsoluteFill>}
      {t >= 24.9 && t < 28.1 && (
        <AbsoluteFill style={{opacity: fadeWin(t, 24.9, 28.1)}}>
          {[0, 1, 2].map((i) => {
            const p = (wave + i / 3) % 1;
            return t > 25.3 ? <div key={i} style={{position: 'absolute', left: 540 - 200 - p * 300, top: 1040 - 200 - p * 300, width: 400 + p * 600, height: 400 + p * 600, borderRadius: '50%', border: `5px solid ${P.green}`, opacity: (1 - p) * 0.5}} /> : null;
          })}
          <Reveal at={24.95} x={540} y={1040} scale><IconDisc Icon={Building2} size={240} /></Reveal>
          {[[180, 760, Globe], [900, 760, Leaf], [180, 1330, Cloud], [900, 1330, Recycle]].map(([x, y, Ic], i) => (
            <Reveal key={i} at={26.2 + i * 0.2} x={x as number} y={y as number} scale dy={0}><IconDisc Icon={Ic as LucideIcon} size={130} fg={P.green} /></Reveal>
          ))}
        </AbsoluteFill>
      )}
      {t >= 28.1 && t < 31.55 && (
        <AbsoluteFill style={{opacity: fadeWin(t, 28.1, 31.55)}}>
          <Reveal at={28.15} x={250} y={1050} dx={-60} dy={0}><IconDisc Icon={Building2} size={200} /></Reveal>
          <Reveal at={29.0} x={830} y={1050} dx={60} dy={0}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12}}>
              <IconDisc Icon={Landmark} size={200} bg={P.navy} fg="#fff" />
              <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 32, color: P.navy}}>Régulateur</div>
            </div>
          </Reveal>
          {(() => {
            const p = prog(t, 29.6, 30.8, easeInOut);
            return t > 29.6 ? (
              <div style={{position: 'absolute', left: interpolate(p, [0, 1], [350, 720]), top: 1050 - Math.sin(p * Math.PI) * 120, transform: 'translate(-50%, -50%)', opacity: 1 - prog(t, 30.8, 31.1) * 0.0}}>
                <div style={{background: P.white, borderRadius: 18, padding: 18, boxShadow: '0 12px 26px rgba(14,42,92,0.15)'}}><FileCheck size={70} color={P.green} strokeWidth={1.8} /></div>
              </div>
            ) : null;
          })()}
          <Reveal at={30.2} x={540} y={1400}><InfoCard Icon={Leaf} label="Impact écologique maîtrisé" w={640} /></Reveal>
        </AbsoluteFill>
      )}
      {t >= 31.55 && (
        <AbsoluteFill style={{opacity: fadeWin(t, 31.55, 35.1)}}>
          <Reveal at={31.6} x={540} y={720}><div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 30, color: P.grey, letterSpacing: 3}}>INDICATEURS STRICTS</div></Reveal>
          <Reveal at={33.4} x={290} y={1120} dx={-60} dy={0}><Trend label="CO2" Icon={Cloud} dir="down" p={prog(t, 33.4, 35.0)} color={P.green} /></Reveal>
          <Reveal at={34.1} x={790} y={1120} dx={60} dy={0}><Trend label="Déchets" Icon={Recycle} dir="down" p={prog(t, 34.1, 35.0)} color={P.green} /></Reveal>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/** 35,1 – 48,7 s : ISO 45001, le bouclier des travailleurs. */
const Securite: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <KeyTitle at={35.1} until={37.55} kicker="Règle n°3" title="ISO *45001*" size={110} />
      <KeyTitle at={37.6} until={42.45} kicker="ISO 45001" title="Le *bouclier* des travailleurs" size={78} />
      <KeyTitle at={42.5} until={45.35} kicker="ISO 45001 · objectif" title="Éliminer les *accidents*" size={80} />
      <KeyTitle at={45.4} until={48.65} kicker="Une exigence vitale" title="Les secteurs *à risque*" size={80} />

      {t < 37.6 && <AbsoluteFill style={{opacity: fadeWin(t, 35.1, 37.6)}}><Reveal at={35.2} x={540} y={1060} scale><IsoBadge n="s" size={460} /></Reveal></AbsoluteFill>}
      {t >= 37.6 && t < 42.5 && (
        <AbsoluteFill style={{opacity: fadeWin(t, 37.6, 42.5)}}>
          <Reveal at={37.65} x={540} y={1020}><PhotoFrame src="tirant/harnais-dos.jpg" at={37.65} w={940} h={700} pos="55% 35%" label="Santé et sécurité au travail" /></Reveal>
          <Reveal at={38.0} x={860} y={720} scale><IconDisc Icon={ShieldCheck} size={200} bg={P.green} fg="#fff" /></Reveal>
          <Reveal at={40.3} x={300} y={1450}><InfoCard Icon={HardHat} label="Santé" w={380} /></Reveal>
          <Reveal at={41.1} x={780} y={1450}><InfoCard Icon={ShieldCheck} label="Sécurité" w={380} /></Reveal>
        </AbsoluteFill>
      )}
      {t >= 42.5 && t < 45.4 && (
        <AbsoluteFill style={{opacity: fadeWin(t, 42.5, 45.4)}}>
          <Reveal at={43.7} x={290} y={1100} dx={-60} dy={0}><Trend label="Accidents" Icon={TriangleAlert} dir="down" p={prog(t, 43.7, 45.2)} color={P.navy2} /></Reveal>
          <Reveal at={44.4} x={790} y={1100} dx={60} dy={0}><Trend label="Absentéisme" Icon={Users} dir="down" p={prog(t, 44.4, 45.4)} color={P.navy2} /></Reveal>
        </AbsoluteFill>
      )}
      {t >= 45.4 && (
        <AbsoluteFill style={{opacity: fadeWin(t, 45.4, 48.7)}}>
          <Reveal at={45.45} x={540} y={1040}><PhotoFrame src="promo/raffinerie.jpg" at={45.45} w={940} h={760} pos="50% 45%" label="Industrie à risque" /></Reveal>
          <Reveal at={46.9} x={860} y={730} scale><IconDisc Icon={TriangleAlert} size={160} fg={P.alert} /></Reveal>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/** 48,7 – 56,8 s : l'équilibre parfait d'une entreprise responsable. */
const Equilibre: React.FC = () => {
  const t = useT();
  const nodes = [
    {n: 'q' as const, Icon: ShoppingCart, l: "Satisfaire l'acheteur", at: 52.7, x: 540, y: 700},
    {n: 'e' as const, Icon: Globe, l: 'Protéger la planète', at: 53.9, x: 230, y: 1330},
    {n: 's' as const, Icon: HardHat, l: 'Sécuriser le salarié', at: 54.9, x: 850, y: 1330},
  ];
  return (
    <AbsoluteFill style={{opacity: fadeWin(t, 48.7, OUTRO_AT, 0.01)}}>
      <KeyTitle at={48.7} until={OUTRO_AT} kicker="Au final" title="L'équilibre d'une entreprise *responsable*" size={70} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {[[540, 700, 230, 1330], [230, 1330, 850, 1330], [850, 1330, 540, 700]].map(([a, b, c, d], i) => (
          <Connector key={i} x1={a} y1={b} x2={c} y2={d} p={prog(t, 49.6 + i * 0.3, 50.4 + i * 0.3, easeInOut)} color={P.line} width={8} />
        ))}
      </svg>
      <Reveal at={50.2} x={540} y={1120} scale>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12}}>
          <IconDisc Icon={Building2} size={200} bg={P.navy} fg="#fff" />
          <div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 30, color: P.navy, whiteSpace: 'nowrap'}}>Entreprise responsable</div>
        </div>
      </Reveal>
      {nodes.map((nd) => {
        const lit = prog(t, nd.at, nd.at + 0.4);
        return (
          <Reveal key={nd.n} at={49.6} x={nd.x} y={nd.y} scale>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12}}>
              <div style={{transform: `scale(${0.85 + 0.15 * lit})`, filter: `grayscale(${1 - lit})`, opacity: 0.55 + 0.45 * lit}}><IsoBadge n={nd.n} size={200} /></div>
              <div style={{display: 'flex', alignItems: 'center', gap: 10, fontFamily: sansFont, fontWeight: 800, fontSize: 28, color: P.navy, whiteSpace: 'nowrap', opacity: lit}}>
                <nd.Icon size={34} color={P.green} strokeWidth={2} />
                {nd.l}
              </div>
            </div>
          </Reveal>
        );
      })}
    </AbsoluteFill>
  );
};

const WIPES = [10.5, 22.7, 35.1, 48.7];
const CUES: Cue[] = [...WIPES.map((at) => ({at: at - 0.4, sfx: 'whoosh', volume: 0.16})), {at: OUTRO_AT - 0.3, sfx: 'whoosh', volume: 0.18}, {at: 0.1, sfx: 'rise', volume: 0.12}];

export const NormesISO: React.FC = () => {
  const end = NORMES_FRAMES / 30;
  const music = (f: number) => interpolate(f / 30, [0, 1.2, 1.8, OUTRO_AT - 0.2, OUTRO_AT + 0.4, end - 1, end], [0.2, 0.2, 0.06, 0.06, 0.24, 0.24, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{fontFamily: sansFont}}>
      <PremiumBackground />
      <Gate from={0} to={2.3}><PremiumIntro logo={LOGO} kicker="Normes ISO" title="Le vrai rôle des *grandes normes*" end={2.3} /></Gate>
      <Gate from={2.3} to={10.5}><Hook /></Gate>
      <Gate from={10.5} to={22.7}><Qualite /></Gate>
      <Gate from={22.7} to={35.1}><Environnement /></Gate>
      <Gate from={35.1} to={48.7}><Securite /></Gate>
      <Gate from={48.7} to={OUTRO_AT}><Equilibre /></Gate>
      <Gate from={OUTRO_AT} to={999}><PremiumOutro at={OUTRO_AT} logo={LOGO} /></Gate>
      <PremiumFrame logo={LOGO} chapters={[[2.3, 'Les normes'], [10.5, 'ISO 9001'], [22.7, 'ISO 14001'], [35.1, 'ISO 45001'], [48.7, 'Synthèse']]} total={OUTRO_AT} hideAt={OUTRO_AT} />
      {WIPES.map((at) => <PanelWipe key={at} at={at} />)}
      <PanelWipe at={OUTRO_AT} />
      <KaraokeCaptions script={script} until={OUTRO_AT} />
      <Audio src={staticFile('voix-off-normes-iso.m4a')} />
      <Audio src={staticFile('musique-promo.m4a')} volume={music} />
      <SfxTrack cues={CUES} />
    </AbsoluteFill>
  );
};
