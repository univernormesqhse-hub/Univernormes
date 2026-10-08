import React from 'react';
import {AbsoluteFill, Audio, Img, random, staticFile} from 'remotion';
import {easeIn, easeInOut, easeOut, Gate, Kinetic, prog, useT} from '../anim';
import {Captions} from '../components/Captions';
import {Backdrop, Check, shadow} from '../identui/IdentUi';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {Outro} from '../scenes/Outro';
import {colors, handFont, s, sansFont} from '../theme';
import {captions} from './captions';

/**
 * « L'induction HSE » — UI motion premium (skill video-promo-diagnostic-qhse), voix d'origine,
 * illustrée par les photos terrain fournies (public/induction, marques retirées).
 * Techniques nouvelles dans la série : lettres-photos (texte rempli d'image), polaroïd qui se développe,
 * barrière levante, badge visiteur imprimé, distribution de cartes, itinéraire GPS, zoom carte → terrain,
 * mallette d'EPI, alerte d'urgence façon smartphone, tri des déchets, panoramique 360°, vision thermique
 * et étincelles, permis de feu, photo découpée en trois volets étalonnés, cartes à balayer (idées reçues),
 * cercles de protection qui s'élargissent, empreintes du premier pas ; transitions pellicule + flash.
 */
const LOGO = 'promo/logo.png';
const RED = '#D9443A';
const ORANGE = '#E8892B';
const BLUE = '#2F6FB5';
const ECO = '#2E9B3E';
const P = (n: string) => staticFile(`induction/${n}.jpg`);
const SCENE = 17.4;
const DEF = 34.9;
const QUI = 64.9;
const OBJ = 81.8;
const CONT = 116.2;
const EX = 169.3;
const IMPACT = 200.3;
const MYTH = 247.4;
const FINAL = 264.5;
const QUESTION = 280.1;
const OUTRO_AT = 288.7;
export const INDUCTIONHSE_FRAMES = s(OUTRO_AT + 3.8);

const At: React.FC<{x: number; y: number; children: React.ReactNode; style?: React.CSSProperties}> = ({x, y, children, style}) => (
  <div style={{position: 'absolute', left: x, top: y, transform: 'translate(-50%, -50%)', ...style}}>{children}</div>
);
const Label: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 34, color = colors.navy, style}) => (
  <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: size, color, textTransform: 'uppercase', letterSpacing: -0.5, textAlign: 'center', lineHeight: 1.05, ...style}}>{children}</div>
);
const pop = (t: number, at: number, d = 0.35) => prog(t, at, at + d, easeOut);
const Card: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <div style={{borderRadius: 30, background: '#fff', boxShadow: shadow, ...style}}>{children}</div>
);
/** Photo en cadre arrondi, avec léger travelling (Ken Burns). */
const Photo: React.FC<{n: string; w: number; h: number; at: number; zoom?: number; pos?: string; style?: React.CSSProperties; filter?: string}> = ({n, w, h, at, zoom = 0.12, pos = '50% 50%', style, filter}) => {
  const t = useT();
  const k = 1 + zoom * Math.min(1, Math.max(0, (t - at) / 8));
  return (
    <div style={{width: w, height: h, borderRadius: 28, overflow: 'hidden', boxShadow: shadow, position: 'relative', ...style}}>
      <Img src={P(n)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${k})`, filter}} />
    </div>
  );
};

/* ─────────── Transition : pellicule + flash ─────────── */
const Film: React.FC<{at: number}> = ({at}) => {
  const t = useT();
  if (t < at - 0.45 || t > at + 0.35) return null;
  const p = prog(t, at - 0.45, at + 0.2, easeInOut);
  const flash = t >= at - 0.05 ? 1 - prog(t, at - 0.05, at + 0.35) : 0;
  return (
    <AbsoluteFill style={{zIndex: 70, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: -1920 + p * 3840, height: 1920, background: '#15181E'}}>
        {[0, 1].map((side) => <div key={side} style={{position: 'absolute', top: 0, bottom: 0, [side ? 'right' : 'left']: 20, width: 50, backgroundImage: 'repeating-linear-gradient(180deg, transparent 0 30px, #F1EDE3 30px 70px, transparent 70px 100px)'}} />)}
        <div style={{position: 'absolute', left: 110, right: 110, top: 200, bottom: 200, border: '6px solid #2A2F38', borderRadius: 20}} />
      </div>
      {flash > 0 && <AbsoluteFill style={{background: '#fff', opacity: flash}} />}
    </AbsoluteFill>
  );
};

/* ─────────── Accroche : lettres-photos H S E ─────────── */
const Hook: React.FC = () => {
  const t = useT();
  const letters: [string, string, number, string][] = [['H', 'operatrice', 8.6, 'Santé'], ['S', 'technicien-hse', 9.24, 'Sécurité'], ['E', 'mine-equipe', 10.02, 'Environnement']];
  const stamp = pop(t, 12.6, 0.25);
  const stone = prog(t, 14.0, 14.6, easeIn);
  return (
    <AbsoluteFill>
      <Kinetic text="Une étape *non négociable*" at={0.3} until={7.1} y={360} size={84} accent={RED} />
      {t < 7.4 && <At x={540} y={950} style={{opacity: pop(t, 0.4, 0.6) * (1 - prog(t, 6.9, 7.3)), transform: `translate(-50%, -50%) rotate(${-2 + t * 0.4}deg)`}}><Photo n="mine-equipe" w={940} h={760} at={0.4} zoom={0.18} /></At>}
      {t >= 7.2 && t < 13.9 && (
        <AbsoluteFill style={{opacity: 1 - prog(t, 13.5, 13.9)}}>
          <Kinetic text="L'induction" at={7.3} y={420} size={90} />
          <div style={{position: 'absolute', left: 0, right: 0, top: 560, display: 'flex', justifyContent: 'center', gap: 10}}>
            {letters.map(([l, n, at, w]) => {
              const p = pop(t, at - 0.15, 0.4);
              return (
                <div key={l} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: p, transform: `translateY(${(1 - p) * 120}px) scale(${0.8 + 0.2 * p})`}}>
                  <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 430, lineHeight: 0.95, letterSpacing: -10, backgroundImage: `url(${P(n)})`, backgroundSize: 'cover', backgroundPosition: `${50 + Math.sin(t + at) * 20}% 40%`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextStroke: `4px ${colors.navy}`}}>{l}</div>
                  <Label size={34}>{w}</Label>
                </div>
              );
            })}
          </div>
          {stamp > 0 && <At x={540} y={1300} style={{transform: `translate(-50%, -50%) scale(${2 - stamp}) rotate(-7deg)`, opacity: stamp}}><div style={{border: `8px solid ${RED}`, color: RED, borderRadius: 16, padding: '6px 26px', fontFamily: sansFont, fontWeight: 900, fontSize: 58, background: 'rgba(255,255,255,0.9)', textDecoration: 'line-through'}}>SIMPLE FORMALITÉ</div></At>}
        </AbsoluteFill>
      )}
      {t >= 13.9 && (
        <AbsoluteFill>
          <Kinetic text="La *première pierre* de la sécurité" at={13.96} y={420} size={78} />
          <At x={540} y={1050 - (1 - stone) * 900}>
            <div style={{width: 520, height: 300, borderRadius: 18, background: 'linear-gradient(160deg, #B9B3A6, #8E877A)', boxShadow: '0 30px 50px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '6px solid #7B7468'}}>
              <Label size={60} color="#fff" style={{textShadow: '0 3px 6px rgba(0,0,0,0.3)'}}>Induction HSE</Label>
            </div>
          </At>
          {stone >= 1 && Array.from({length: 10}, (_, k) => {
            const q = prog(t, 14.6, 15.4, easeOut);
            return <div key={k} style={{position: 'absolute', left: 540 + (k - 4.5) * 70 * q, top: 1200 - Math.sin((k / 9) * Math.PI) * 40 * q, width: 40 * (1 - q) + 10, height: 40 * (1 - q) + 10, borderRadius: '50%', background: 'rgba(160,150,135,0.6)', opacity: 1 - q}} />;
          })}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Scène : polaroïd qui se développe + barrière ─────────── */
const Scene: React.FC = () => {
  const t = useT();
  const dev = prog(t, 19.3, 22.4, easeInOut);
  const team = pop(t, 23.0, 0.5);
  const bar = prog(t, 25.0, 25.8, easeOut);
  const gate = t >= 24.3;
  return (
    <AbsoluteFill>
      <Kinetic text="Imaginez la *scène*" at={SCENE + 0.1} until={24.2} y={360} size={84} />
      {!gate && (
        <>
          <At x={400} y={880} style={{transform: `translate(-50%, -50%) rotate(${-4 + Math.sin(t * 6) * (1 - dev) * 3}deg)`, opacity: pop(t, 17.8, 0.4)}}>
            <div style={{background: '#fff', padding: '26px 26px 110px', boxShadow: shadow}}>
              <div style={{width: 520, height: 520, overflow: 'hidden', position: 'relative'}}>
                <Img src={P('ingenieur-chantier')} style={{width: '100%', height: '100%', objectFit: 'cover', filter: `saturate(${dev}) brightness(${1 + (1 - dev) * 0.9}) contrast(${0.6 + 0.4 * dev}) sepia(${(1 - dev) * 0.6})`}} />
              </div>
              <div style={{position: 'absolute', left: 0, right: 0, bottom: 30, textAlign: 'center', fontFamily: handFont, fontSize: 44, color: colors.ink}}>1er jour sur le site</div>
            </div>
          </At>
          <At x={780} y={1180} style={{transform: `translate(-50%, -50%) rotate(6deg) scale(${team})`, opacity: team}}>
            <div style={{background: '#fff', padding: '18px 18px 70px', boxShadow: shadow}}>
              <Img src={P('briefing-atelier')} style={{width: 400, height: 300, objectFit: 'cover'}} />
              <div style={{position: 'absolute', left: 0, right: 0, bottom: 16, textAlign: 'center', fontFamily: handFont, fontSize: 36, color: colors.ink}}>L'équipe est en place</div>
            </div>
          </At>
        </>
      )}
      {gate && (
        <AbsoluteFill style={{opacity: pop(t, 24.4)}}>
          <Kinetic text="Avant le *premier pas*…" at={24.5} until={28.4} y={360} size={84} />
          <Kinetic text="Une étape *obligatoire*" at={28.6} until={31.7} y={360} size={84} accent={RED} />
          <Kinetic text="Mais *laquelle* ?" at={31.8} y={360} size={96} accent={ORANGE} />
          <At x={540} y={880}>
            <div style={{position: 'relative', width: 940, height: 700}}>
              <Img src={P('mine-equipe')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: 28, filter: 'brightness(0.75)'}} />
              <div style={{position: 'absolute', left: 260, top: 40, padding: '12px 28px', background: '#F8D44A', borderRadius: 10, border: '6px solid #222'}}><Label size={36} color="#222">Zone d'activité</Label></div>
              {/* poteau + barrière levante qui se ferme */}
              <div style={{position: 'absolute', left: 60, top: 380, width: 70, height: 320, background: '#333', borderRadius: 10}} />
              <div style={{position: 'absolute', left: 95, top: 400, width: 860, height: 44, borderRadius: 22, background: 'repeating-linear-gradient(90deg, #D9443A 0 70px, #fff 70px 140px)', transformOrigin: '0 50%', transform: `rotate(${-80 + bar * 80}deg)`, boxShadow: '0 8px 16px rgba(0,0,0,0.3)'}} />
              <div style={{position: 'absolute', left: 70, top: 330, width: 50, height: 50, borderRadius: 25, background: bar >= 1 && Math.floor(t * 3) % 2 ? '#FF3B30' : '#661A15', boxShadow: bar >= 1 ? '0 0 30px #FF3B30' : 'none'}} />
            </div>
          </At>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Définition : badge visiteur imprimé ─────────── */
const Definition: React.FC = () => {
  const t = useT();
  const print = prog(t, 47.9, 50.4, easeInOut);
  const shield = t >= 55.8;
  return (
    <AbsoluteFill>
      <Kinetic text="L'induction HSE, c'est *quoi* ?" at={DEF + 0.2} until={47.6} y={360} size={78} />
      <Kinetic text="Une *formation initiale*" at={47.86} until={51.5} y={360} size={84} />
      <Kinetic text="Les *règles du jeu* pour tous" at={51.68} until={55.6} y={360} size={80} />
      {!shield && (
        <At x={540} y={900}>
          <div style={{position: 'relative', width: 760, height: 900}}>
            {/* imprimante */}
            <div style={{position: 'absolute', left: 40, top: 0, width: 680, height: 220, borderRadius: 36, background: 'linear-gradient(180deg, #3A4352, #232A35)', boxShadow: shadow}}>
              <div style={{position: 'absolute', left: 80, right: 80, bottom: 40, height: 16, borderRadius: 8, background: '#0E1116'}} />
              <div style={{position: 'absolute', right: 40, top: 40, width: 20, height: 20, borderRadius: 10, background: print > 0 && print < 1 ? '#7CC576' : '#555'}} />
            </div>
            {/* badge qui sort */}
            <div style={{position: 'absolute', left: 160, top: 190, width: 440, height: 640, overflow: 'hidden'}}>
              <div style={{position: 'absolute', left: 0, top: -640 + print * 640, width: 440, height: 620, borderRadius: 26, background: '#fff', boxShadow: shadow, overflow: 'hidden'}}>
                <div style={{height: 110, background: colors.navy, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Label size={36} color="#fff">Badge d'accès site</Label></div>
                <Img src={P('operatrice')} style={{width: 220, height: 260, objectFit: 'cover', objectPosition: '50% 20%', borderRadius: 16, margin: '30px auto 0', display: 'block'}} />
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 24}}><Check p={prog(t, 50.6, 51.2)} size={56} /><Label size={34} color={ECO}>Induction HSE</Label></div>
                <div style={{margin: '18px 40px 0', height: 50, backgroundImage: 'repeating-linear-gradient(90deg, #222 0 4px, transparent 4px 9px, #222 9px 11px, transparent 11px 16px)'}} />
              </div>
            </div>
          </div>
        </At>
      )}
      {shield && (
        <AbsoluteFill style={{opacity: pop(t, 55.9)}}>
          <Kinetic text="Le mot-clé : *prévention*" at={55.9} y={360} size={84} accent={ECO} />
          <At x={540} y={900}><div style={{transform: `scale(${pop(t, 56.0, 0.5)})`}}><F n="bouclier" size={380} /></div></At>
          {[['Accidents', 'collision', 59.0, -1], ['Incidents', 'danger', 60.5, 1], ['Environnement', 'feuille', 63.0, -1]].map(([l, n, at, side], k) => {
            const p = prog(t, at as number, (at as number) + 0.6, easeIn);
            const bounce = prog(t, (at as number) + 0.6, (at as number) + 1.4, easeOut);
            const x = 540 + (side as number) * (360 - 170 * p) + (side as number) * bounce * 260;
            const y = 700 + k * 200 - bounce * 300;
            return (
              <At key={l as string} x={x} y={y} style={{opacity: 1 - bounce * 0.8, transform: `translate(-50%, -50%) rotate(${bounce * 90 * (side as number)}deg)`}}>
                <Card style={{padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 10}}><F n={n as string} size={70} /><Label size={30}>{l}</Label></Card>
              </At>
            );
          })}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Qui ? Distribution de cartes ─────────── */
const PEOPLE: [string, string, number, boolean][] = [['Nouvel employé', 'ingenieur-chantier', 71.4, true], ['Sous-traitant', 'technicien-hse', 73.38, true], ['Visiteur', 'homme-bureau', 76.24, false], ['Stagiaire', 'salariee', 77.38, false]];
const Who: React.FC = () => {
  const t = useT();
  const all = pop(t, 79.3, 0.5);
  return (
    <AbsoluteFill>
      <Kinetic text="Qui est *concerné* ?" at={QUI + 0.2} until={67.6} y={360} size={88} />
      <Kinetic text="*Absolument* tout le monde" at={67.72} until={79.1} y={360} size={80} accent={ORANGE} />
      <Kinetic text="L'affaire *de tous*" at={79.3} y={360} size={92} accent={ECO} />
      {/* paquet */}
      <At x={540} y={1450} style={{opacity: 1 - all}}>
        {[0, 1, 2].map((k) => <div key={k} style={{position: 'absolute', left: -150 + k * 4, top: -100 - k * 4, width: 300, height: 200, borderRadius: 20, background: colors.navy, border: '6px solid #fff', boxShadow: shadow}} />)}
      </At>
      {PEOPLE.map(([l, n, at, photo], k) => {
        const p = prog(t, at - 0.5, at + 0.1, easeOut);
        const flip = prog(t, at, at + 0.4, easeInOut);
        const tx = 300 + (k % 2) * 480, ty = 700 + Math.floor(k / 2) * 500;
        const x = 540 + (tx - 540) * p, y = 1450 + (ty - 1450) * p;
        const gather = prog(t, 79.3, 80.0, easeInOut);
        return (
          <At key={l} x={x + (540 - x) * gather * 0} y={y} style={{transform: `translate(-50%, -50%) rotate(${(1 - p) * 30 + (k % 2 ? 3 : -3)}deg) scale(${1 - gather * 0.08})`, opacity: p > 0 ? 1 : 0}}>
            <div style={{width: 420, height: 460, perspective: 1400}}>
              <div style={{position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d', transform: `rotateY(${180 - flip * 180}deg)`}}>
                <div style={{position: 'absolute', inset: 0, borderRadius: 26, background: colors.navy, border: '8px solid #fff', boxShadow: shadow, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Label size={60} color="rgba(255,255,255,0.4)">HSE</Label></div>
                <div style={{position: 'absolute', inset: 0, borderRadius: 26, background: '#fff', boxShadow: shadow, backfaceVisibility: 'hidden', overflow: 'hidden', display: 'flex', flexDirection: 'column'}}>
                  {photo ? <Img src={P(n)} style={{width: '100%', height: 340, objectFit: 'cover', objectPosition: '60% 30%'}} /> : <div style={{height: 340, background: '#EEF2F7', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={n} size={240} /></div>}
                  <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10}}>{all > 0 && <Check p={prog(t, 79.6 + k * 0.1, 80.0 + k * 0.1)} size={44} />}<Label size={36}>{l}</Label></div>
                </div>
              </div>
            </div>
          </At>
        );
      })}
    </AbsoluteFill>
  );
};

/* ─────────── 5 objectifs : itinéraire GPS ─────────── */
const STOPS: [string, string, number][] = [['Informer', 'Les risques du site', 98.34], ['Expliquer', 'Les règles', 100.78], ['Présenter', 'Les équipements', 103.96], ['Décrire', 'Les urgences', 105.4], ['Responsabiliser', 'Chaque personne', 107.22]];
const ROUTE = 'M150 1500 C 150 1300, 500 1350, 520 1180 S 880 1060, 860 900 S 300 820, 260 660 S 640 520, 900 480';
const PTS: [number, number][] = [[150, 1500], [520, 1180], [860, 900], [260, 660], [900, 480]];
const Gps: React.FC = () => {
  const t = useT();
  const idx = STOPS.reduce((a, st, i) => (t >= st[2] ? i : a), -1);
  const prog01 = idx < 0 ? 0 : Math.min(1, (idx + prog(t, STOPS[idx][2], STOPS[idx][2] + 1.2, easeInOut)) / 4);
  const [cx, cy] = (() => {
    const f = prog01 * 4; const i = Math.min(3, Math.floor(f)); const u = f - i;
    return [PTS[i][0] + (PTS[i + 1][0] - PTS[i][0]) * u, PTS[i][1] + (PTS[i + 1][1] - PTS[i][1]) * u];
  })();
  return (
    <AbsoluteFill>
      <Kinetic text="Pas une liste d'*interdictions*" at={OBJ + 0.2} until={89.7} y={300} size={74} accent={RED} />
      <Kinetic text="De l'information *à l'action*" at={89.88} until={98.2} y={300} size={78} accent={ECO} />
      <Kinetic text="*Acteur* de sa sécurité" at={111.48} y={300} size={84} accent={ECO} />
      <AbsoluteFill style={{opacity: pop(t, 90.0)}}>
        <div style={{position: 'absolute', left: 40, right: 40, top: 400, bottom: 260, borderRadius: 36, background: '#E9EEE6', overflow: 'hidden', boxShadow: shadow}}>
          {Array.from({length: 9}, (_, k) => <div key={k} style={{position: 'absolute', left: 0, right: 0, top: 80 + k * 140, height: 22, background: '#fff', transform: `rotate(${(random(`r${k}`) - 0.5) * 12}deg)`}} />)}
          {Array.from({length: 6}, (_, k) => <div key={k} style={{position: 'absolute', top: 0, bottom: 0, left: 60 + k * 190, width: 18, background: '#fff', transform: `rotate(${(random(`c${k}`) - 0.5) * 10}deg)`}} />)}
          <div style={{position: 'absolute', left: 620, top: 700, width: 300, height: 200, borderRadius: 30, background: '#CFE3C7'}} />
        </div>
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
          <path d={ROUTE} fill="none" stroke="#9BB8E6" strokeWidth={30} strokeLinecap="round" transform="translate(0 -40)" />
          <path d={ROUTE} fill="none" stroke={BLUE} strokeWidth={30} strokeLinecap="round" pathLength={1} strokeDasharray={`${prog01} 1`} transform="translate(0 -40)" />
        </svg>
        {PTS.map(([x, y], k) => (
          <At key={k} x={x} y={y - 40} style={{zIndex: 5}}>
            <div style={{width: 64, height: 64, borderRadius: 32, background: idx >= k ? ECO : '#fff', border: `6px solid ${idx >= k ? '#fff' : BLUE}`, boxShadow: shadow, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: idx >= k ? '#fff' : BLUE}}>{k + 1}</div>
          </At>
        ))}
        <At x={cx} y={cy - 40} style={{zIndex: 6}}><div style={{width: 44, height: 44, borderRadius: 22, background: BLUE, border: '8px solid #fff', boxShadow: '0 0 0 14px rgba(47,111,181,0.25)'}} /></At>
        {/* bandeau de navigation */}
        <div style={{position: 'absolute', left: 60, right: 60, top: 1470, height: 150, borderRadius: 28, background: ECO, boxShadow: shadow, display: 'flex', alignItems: 'center', gap: 26, padding: '0 34px', zIndex: 7, opacity: idx >= 0 ? 1 : 0.6}}>
          <div style={{fontSize: 80, color: '#fff', fontWeight: 900, fontFamily: sansFont}}>{idx >= 4 ? '⚑' : '↱'}</div>
          <div>
            <div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 48, color: '#fff', textTransform: 'uppercase'}}>{idx >= 0 ? `${idx + 1}. ${STOPS[idx][0]}` : 'Itinéraire : 5 étapes'}</div>
            <div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 30, color: 'rgba(255,255,255,0.85)'}}>{idx >= 0 ? STOPS[idx][1] : "De l'information à l'action"}</div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ─────────── Contenu : zoom terrain, mallette EPI, alerte, déchets, 360° ─────────── */
const Content: React.FC = () => {
  const t = useT();
  const zoom = prog(t, 129.3, 131.0, easeInOut);
  const kit = t >= 139.9 && t < 146.76;
  const alert = t >= 146.76 && t < 155.7;
  const waste = t >= 155.7 && t < 166.5;
  const pano = t >= 166.5;
  const lid = prog(t, 140.4, 141.4, easeOut);
  return (
    <AbsoluteFill>
      <Kinetic text="Qu'est-ce qu'on *apprend* ?" at={CONT + 0.6} until={122.2} y={300} size={80} />
      <Kinetic text="D'abord les *fondamentaux*" at={122.34} until={139.7} y={300} size={80} />
      {t < 139.9 && (
        <AbsoluteFill style={{opacity: pop(t, 122.4) * (1 - prog(t, 139.5, 139.9))}}>
          <At x={540} y={880}>
            <div style={{width: 940, height: 760, borderRadius: 34, overflow: 'hidden', position: 'relative', boxShadow: shadow, background: '#E9EEE6'}}>
              {/* vue d'ensemble (plan) qui zoome sur la photo terrain */}
              <div style={{position: 'absolute', inset: 0, transform: `scale(${1 + zoom * 2.6})`, transformOrigin: '62% 58%', opacity: 1 - zoom}}>
                {Array.from({length: 8}, (_, k) => <div key={k} style={{position: 'absolute', left: 0, right: 0, top: 60 + k * 95, height: 16, background: '#fff'}} />)}
                <div style={{position: 'absolute', left: 520, top: 380, width: 140, height: 120, background: ORANGE, borderRadius: 12}} />
                <div style={{position: 'absolute', left: 60, top: 60, padding: '14px 24px', background: '#fff', borderRadius: 16, boxShadow: shadow}}><Label size={34}>Politique HSE</Label></div>
              </div>
              <div style={{position: 'absolute', inset: 0, opacity: zoom}}><Img src={P('briefing-atelier')} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${1.3 - 0.3 * zoom})`}} /></div>
              {[['Risques du site', 'danger', 131.1, 80, 120], ['Règles de base', 'clipboard', 133.3, 520, 260], ['Signalisation', 'sens-interdit', 135.6, 140, 520]].map(([l, n, at, x, y]) => (
                <div key={l as string} style={{position: 'absolute', left: x as number, top: y as number, display: 'flex', alignItems: 'center', gap: 10, background: '#fff', borderRadius: 40, padding: '10px 22px 10px 12px', boxShadow: shadow, transform: `scale(${pop(t, at as number, 0.35)})`}}><F n={n as string} size={60} /><Label size={28}>{l}</Label></div>
              ))}
            </div>
          </At>
        </AbsoluteFill>
      )}
      {kit && (
        <AbsoluteFill style={{opacity: pop(t, 140.0)}}>
          <Kinetic text="Les *EPI*, bien utilisés" at={140.1} y={300} size={84} accent={ORANGE} />
          <At x={540} y={1050}>
            <div style={{position: 'relative', width: 820, height: 600, perspective: 1600}}>
              <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 300, borderRadius: '0 0 40px 40px', background: 'linear-gradient(180deg, #E8892B, #C96E18)', boxShadow: shadow}} />
              <div style={{position: 'absolute', left: 0, right: 0, top: 300, height: 300, borderRadius: '40px 40px 0 0', background: 'linear-gradient(180deg, #F29B45, #E8892B)', transformOrigin: '50% 0%', transform: `translateY(-300px) rotateX(${-lid * 110}deg)`, boxShadow: '0 -6px 14px rgba(0,0,0,0.15)'}} />
              {['casque', 'lunettes', 'gants', 'chaussure', 'gilet'].map((n, k) => {
                const p = prog(t, 141.2 + k * 0.25, 141.8 + k * 0.25, easeOut);
                const a = (-150 + k * 30) * (Math.PI / 180) * -1;
                return <div key={n} style={{position: 'absolute', left: 410 - 75 + Math.cos(a + Math.PI) * 360 * p * -1, top: 360 - Math.abs(Math.sin(a)) * 420 * p - 75, transform: `scale(${0.4 + 0.6 * p})`, opacity: p}}><F n={n} size={150} /></div>;
              })}
            </div>
          </At>
        </AbsoluteFill>
      )}
      {alert && (
        <AbsoluteFill style={{opacity: pop(t, 146.8)}}>
          <AbsoluteFill style={{background: `rgba(217,68,58,${t < 149.5 && Math.floor(t * 4) % 2 ? 0.12 : 0})`}} />
          <Kinetic text="Alarme, évacuation, *incident*" at={146.9} y={300} size={74} accent={RED} />
          <At x={540} y={880}>
            <div style={{width: 560, height: 980, borderRadius: 70, background: '#111', padding: 22, boxSizing: 'border-box', boxShadow: shadow}}>
              <div style={{width: '100%', height: '100%', borderRadius: 52, overflow: 'hidden', position: 'relative'}}>
                <Img src={P('mine-equipe')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '70% 50%', filter: 'blur(6px) brightness(0.6)'}} />
                {[['ALARME', 'Alerte : évacuez par la sortie B', 147.0, RED], ['ÉVACUATION', "Point de rassemblement : parking nord (exemple)", 148.4, ORANGE], ['INCIDENT', 'Signalez même un incident anodin', 149.7, BLUE]].map(([h, b, at, c], k) => {
                  const p = pop(t, at as number, 0.4);
                  return (
                    <div key={k} style={{position: 'absolute', left: 20, right: 20, top: 60 + k * 190, borderRadius: 30, background: 'rgba(255,255,255,0.95)', padding: '18px 22px', transform: `translateY(${(1 - p) * -200}px)`, opacity: p, boxShadow: '0 10px 20px rgba(0,0,0,0.25)'}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: 12}}><div style={{width: 46, height: 46, borderRadius: 12, background: c as string}} /><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 30, color: c as string}}>{h}</div><div style={{marginLeft: 'auto', fontFamily: sansFont, fontSize: 22, color: '#8A93A0'}}>maintenant</div></div>
                      <div style={{marginTop: 8, fontFamily: sansFont, fontWeight: 700, fontSize: 28, color: colors.ink}}>{b}</div>
                    </div>
                  );
                })}
                <div style={{position: 'absolute', left: 40, right: 40, bottom: 60, height: 120, borderRadius: 60, background: ECO, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: pop(t, 152.4), transform: `scale(${pop(t, 152.4, 0.3)})`}}><Label size={32} color="#fff">Pour qu'il ne se reproduise pas en pire</Label></div>
              </div>
            </div>
          </At>
        </AbsoluteFill>
      )}
      {waste && (
        <AbsoluteFill style={{opacity: pop(t, 155.8)}}>
          <Kinetic text="Et le *E* de HSE" at={155.8} until={160.8} y={300} size={90} accent={ECO} />
          <Kinetic text="Tri des *déchets*, environnement" at={160.9} y={300} size={70} accent={ECO} />
          {[['Recyclable', '#F2C230'], ['Déchets dangereux', RED], ['Tout-venant', '#7B8594']].map(([l, c], k) => (
            <div key={l} style={{position: 'absolute', left: 70 + k * 330, top: 1080, width: 280, height: 360, borderRadius: '16px 16px 40px 40px', background: c, boxShadow: shadow, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 30, boxSizing: 'border-box'}}>
              <div style={{position: 'absolute', left: -10, right: -10, top: -30, height: 44, borderRadius: 14, background: c, filter: 'brightness(0.85)'}} />
              <Label size={28} color="#fff">{l}</Label>
            </div>
          ))}
          {[['colis', 0, 161.4], ['eprouvette', 1, 162.2], ['poubelle', 2, 163.0], ['feuille', 0, 163.8]].map(([n, bin, at], k) => {
            const p = prog(t, at as number, (at as number) + 0.9, easeIn);
            const x0 = 540, x1 = 210 + (bin as number) * 330;
            return p > 0 && p < 1 ? <At key={k} x={x0 + (x1 - x0) * p} y={560 + Math.sin(p * Math.PI) * -120 + p * 500}><div style={{transform: `rotate(${p * 360}deg)`}}><F n={n as string} size={120} /></div></At> : null;
          })}
        </AbsoluteFill>
      )}
      {pano && (
        <AbsoluteFill style={{opacity: pop(t, 166.6)}}>
          <Kinetic text="Une vision à *360°*" at={166.6} y={300} size={92} />
          <At x={540} y={900}>
            <div style={{width: 960, height: 700, borderRadius: 34, overflow: 'hidden', position: 'relative', boxShadow: shadow}}>
              <div style={{position: 'absolute', top: 0, bottom: 0, left: -((t - 166.5) * 320) % 1600, width: 3200, display: 'flex'}}>
                {['mine-equipe', 'briefing-atelier', 'mine-equipe', 'briefing-atelier'].map((n, k) => <Img key={k} src={P(n)} style={{width: 800, height: 700, objectFit: 'cover'}} />)}
              </div>
              <div style={{position: 'absolute', right: 30, bottom: 30, width: 130, height: 130, borderRadius: 65, background: 'rgba(14,42,92,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Label size={40} color="#fff">360°</Label></div>
            </div>
          </At>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Exemple : soudure, vision thermique, permis de feu ─────────── */
const Example: React.FC = () => {
  const t = useT();
  const heat = prog(t, 177.9, 183.3, easeInOut);
  const permit = t >= 189.2;
  return (
    <AbsoluteFill>
      <Kinetic text="Un *exemple* concret" at={EX + 0.2} until={174.2} y={300} size={86} />
      <Kinetic text="Soudure : *travail à chaud*" at={174.3} until={183.6} y={300} size={80} accent={RED} />
      <Kinetic text="L'induction prend *tout son sens*" at={183.7} until={189.1} y={300} size={70} />
      {!permit && (
        <At x={540} y={900} style={{opacity: pop(t, EX + 0.4)}}>
          <div style={{position: 'relative', width: 960, height: 820, borderRadius: 34, overflow: 'hidden', boxShadow: shadow}}>
            <Img src={P('technicien-hse')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '55% 50%'}} />
            {/* vision thermique */}
            <div style={{position: 'absolute', inset: 0, opacity: heat * 0.85, mixBlendMode: 'hard-light', background: 'radial-gradient(circle at 22% 55%, #FFF7B0 0%, #FFB300 14%, #FF4D00 28%, #B3006B 48%, #2A0B6B 75%)'}} />
            {heat > 0.2 && Array.from({length: 28}, (_, k) => {
              const q = ((t * 1.6 + random(`sp${k}`)) % 1);
              const a = random(`a${k}`) * Math.PI * 1.4 - Math.PI * 0.2;
              return <div key={k} style={{position: 'absolute', left: 210 + Math.cos(a) * 260 * q, top: 450 - Math.sin(a) * 220 * q + q * q * 200, width: 8, height: 8, borderRadius: 4, background: '#FFE27A', boxShadow: '0 0 12px #FFB300', opacity: 1 - q}} />;
            })}
            <div style={{position: 'absolute', left: 30, top: 30, padding: '10px 20px', borderRadius: 14, background: 'rgba(0,0,0,0.6)', fontFamily: 'monospace', fontSize: 34, color: '#fff', opacity: heat}}>{Math.round(25 + heat * 1475)} °C · RISQUE ÉLEVÉ</div>
          </div>
        </At>
      )}
      {permit && (
        <AbsoluteFill style={{opacity: pop(t, 189.3)}}>
          <Kinetic text="Il saura *exactement* quoi faire" at={189.3} until={196.4} y={300} size={72} />
          <Kinetic text="Une *catastrophe* évitée" at={196.6} y={300} size={86} accent={ECO} />
          <At x={540} y={940}>
            <div style={{width: 860, borderRadius: 24, background: '#FFFDF6', boxShadow: shadow, padding: '40px 50px', boxSizing: 'border-box', position: 'relative'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 16}}><F n="feu" size={90} /><div><Label size={46} style={{textAlign: 'left'}}>Permis de travail</Label><div style={{fontFamily: sansFont, fontWeight: 700, fontSize: 28, color: '#8A93A0'}}>Travaux par point chaud (soudure)</div></div></div>
              {[['Risques d’incendie identifiés', 190.6], ['Procédure d’alerte connue', 193.4], ['Permis spécifique obtenu', 195.4]].map(([l, at]) => (
                <div key={l as string} style={{display: 'flex', alignItems: 'center', gap: 16, marginTop: 28, opacity: pop(t, at as number)}}><Check p={prog(t, (at as number) + 0.1, (at as number) + 0.5)} size={56} /><div style={{fontFamily: sansFont, fontWeight: 800, fontSize: 36, color: colors.ink}}>{l}</div></div>
              ))}
              {t >= 196.0 && <div style={{position: 'absolute', right: 30, bottom: 30, transform: `scale(${2 - pop(t, 196.0, 0.25)}) rotate(-10deg)`, opacity: pop(t, 196.0, 0.25), border: `8px solid ${ECO}`, color: ECO, borderRadius: 16, padding: '4px 20px', fontFamily: sansFont, fontWeight: 900, fontSize: 52, background: 'rgba(255,255,255,0.9)'}}>VALIDÉ</div>}
            </div>
          </At>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Impact : photo en trois volets étalonnés ─────────── */
const Impact: React.FC = () => {
  const t = useT();
  const panels: [string, string, number, string][] = [['Moins d’accidents', 'baisse', 217.0, ECO], ['Culture sécurité', 'equipe', 220.62, BLUE], ['Conformité légale', 'balance', 227.12, ORANGE]];
  const iso = t >= 230.8;
  return (
    <AbsoluteFill>
      <Kinetic text="Prenons de la *hauteur*" at={IMPACT + 0.2} until={205.0} y={300} size={84} />
      <Kinetic text="Pas une case *à cocher*" at={205.14} until={209.0} y={300} size={84} accent={RED} />
      <Kinetic text="Un *pilier* de la culture" at={209.1} until={215.4} y={300} size={84} />
      <Kinetic text="Un impact *triple*" at={215.5} until={230.6} y={300} size={90} accent={ORANGE} />
      {!iso && (
        <At x={540} y={950} style={{opacity: pop(t, IMPACT + 0.5)}}>
          <div style={{display: 'flex', gap: 14}}>
            {panels.map(([l, n, at, c], k) => {
              const on = t >= at - 0.2;
              const slide = prog(t, IMPACT + 0.5 + k * 0.2, IMPACT + 1.3 + k * 0.2, easeOut);
              return (
                <div key={l} style={{width: 300, height: 860, borderRadius: 26, overflow: 'hidden', position: 'relative', boxShadow: shadow, transform: `translateY(${(1 - slide) * (k % 2 ? -300 : 300)}px)`}}>
                  <Img src={P('mine-equipe')} style={{position: 'absolute', top: 0, left: -k * 314, width: 942, height: 860, objectFit: 'cover', filter: on ? 'none' : 'grayscale(1) brightness(0.8)'}} />
                  <div style={{position: 'absolute', inset: 0, background: c, mixBlendMode: 'multiply', opacity: on ? 0.55 : 0.15}} />
                  {on && (
                    <div style={{position: 'absolute', left: 16, right: 16, bottom: 30, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, transform: `translateY(${(1 - pop(t, at - 0.2, 0.4)) * 60}px)`}}>
                      <div style={{width: 120, height: 120, borderRadius: 60, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n={n} size={80} /></div>
                      <Label size={30} color="#fff" style={{textShadow: '0 2px 8px rgba(0,0,0,0.5)'}}>{l}</Label>
                    </div>
                  )}
                  <div style={{position: 'absolute', left: 20, top: 20, fontFamily: sansFont, fontWeight: 900, fontSize: 80, color: 'rgba(255,255,255,0.85)'}}>{k + 1}</div>
                </div>
              );
            })}
          </div>
        </At>
      )}
      {iso && (
        <AbsoluteFill style={{opacity: pop(t, 230.9)}}>
          <Kinetic text="Exigée par les *standards internationaux*" at={231.0} y={300} size={66} />
          <At x={540} y={760}><Photo n="reunion-audit" w={960} h={560} at={231} /></At>
          {[['ISO 45001', 'Santé-sécurité au travail', 238.2, BLUE], ['ISO 14001', 'Management environnemental', 241.6, ECO]].map(([n, l, at, c], k) => (
            <At key={n as string} x={290 + k * 500} y={1230} style={{transform: `translate(-50%, -50%) scale(${pop(t, at as number, 0.4)}) rotate(${(k ? 4 : -4)}deg)`}}>
              <div style={{width: 400, height: 260, borderRadius: 30, background: '#fff', border: `10px solid ${c}`, boxShadow: shadow, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box'}}><Label size={56} color={c as string}>{n}</Label><Label size={24} color="#8A93A0" style={{marginTop: 8}}>{l}</Label></div>
            </At>
          ))}
          <At x={540} y={1440} style={{opacity: pop(t, 244.5)}}><Label size={36} color={colors.green}>Un gage de sérieux reconnu partout</Label></At>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Idées reçues : cartes à balayer ─────────── */
const SwipeCard: React.FC<{myth: string; truth: string; at: number; swipe: number; truthAt: number; icon: string}> = ({myth, truth, at, swipe, truthAt, icon}) => {
  const t = useT();
  const sw = prog(t, swipe, swipe + 0.5, easeIn);
  const tr = pop(t, truthAt, 0.4);
  return (
    <div style={{position: 'relative', width: 820, height: 560}}>
      <div style={{position: 'absolute', inset: 0, borderRadius: 40, background: ECO, boxShadow: shadow, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, transform: `scale(${0.92 + 0.08 * tr})`, opacity: 0.6 + 0.4 * tr}}>
        <F n={icon} size={170} />
        <Label size={50} color="#fff" style={{padding: '0 40px'}}>{truth}</Label>
        <div style={{fontSize: 70, color: '#fff'}}>✓</div>
      </div>
      <div style={{position: 'absolute', inset: 0, borderRadius: 40, background: '#fff', boxShadow: shadow, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, transform: `translateX(${-sw * 1300}px) rotate(${-sw * 30}deg)`, opacity: pop(t, at)}}>
        <Label size={30} color="#8A93A0">Idée reçue</Label>
        <Label size={64} style={{padding: '0 40px'}}>{myth}</Label>
        <div style={{position: 'absolute', left: 50, top: 50, border: `8px solid ${RED}`, borderRadius: 14, padding: '2px 18px', color: RED, fontFamily: sansFont, fontWeight: 900, fontSize: 52, transform: 'rotate(-14deg)', opacity: prog(t, swipe - 0.4, swipe)}}>NON</div>
      </div>
    </div>
  );
};
const Myths: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <Kinetic text="Dépasser les *idées reçues*" at={MYTH + 0.2} until={262.3} y={300} size={80} />
      <Kinetic text="Sa *culture de la sécurité*" at={262.5} y={300} size={80} accent={ECO} />
      <At x={540} y={760}><SwipeCard myth="Une simple formalité" truth="Un outil qui réduit les accidents" icon="baisse" at={MYTH + 0.4} swipe={251.2} truthAt={253.9} /></At>
      <At x={540} y={1380} style={{opacity: pop(t, 256.4)}}><SwipeCard myth="Une perte de temps" truth="Un investissement" icon="pousse" at={256.4} swipe={257.6} truthAt={258.5} /></At>
    </AbsoluteFill>
  );
};

/* ─────────── Définition finale : cercles de protection ─────────── */
const Final: React.FC = () => {
  const t = useT();
  const rings: [string, string, number, string][] = [['Se protéger', 'operatrice', 275.4, ECO], ['Les autres', 'equipe', 277.9, BLUE], ['La planète', 'globe', 279.3, '#1F8A70']];
  const quest = t >= QUESTION;
  return (
    <AbsoluteFill>
      <Kinetic text="En une *définition*" at={FINAL + 0.2} until={268.0} y={300} size={86} />
      {!quest && (
        <>
          <At x={540} y={640} style={{opacity: pop(t, 268.1)}}>
            <div style={{width: 940, borderRadius: 26, background: '#FFFDF6', boxShadow: shadow, padding: '34px 44px', boxSizing: 'border-box', fontFamily: handFont, fontSize: 46, color: colors.ink, lineHeight: 1.25}}>
              {(() => {
                const txt = "L'induction HSE : la formation d'accueil obligatoire qui informe toute personne des règles de santé, de sécurité et d'environnement.";
                const n = Math.floor(prog(t, 268.1, 275.0, (v) => v) * txt.length);
                return <>{txt.slice(0, n)}<span style={{opacity: Math.floor(t * 3) % 2}}>▍</span></>;
              })()}
            </div>
          </At>
          <At x={540} y={1250}>
            <div style={{position: 'relative', width: 760, height: 760}}>
              {rings.map(([l, n, at, c], k) => {
                const p = pop(t, at, 0.6);
                const r = 140 + k * 120;
                return (
                  <div key={l} style={{position: 'absolute', left: 380 - r, top: 380 - r, width: r * 2, height: r * 2, borderRadius: '50%', border: `8px solid ${c}`, transform: `scale(${p})`, opacity: p, background: k === 0 ? '#fff' : 'transparent', overflow: k === 0 ? 'hidden' : 'visible', zIndex: 3 - k}}>
                    {k === 0 ? <Img src={P(n)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 20%'}} /> : <div style={{position: 'absolute', left: '50%', top: -36, transform: 'translateX(-50%)', background: c, borderRadius: 30, padding: '8px 22px', display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap'}}><F n={n} size={44} /><Label size={28} color="#fff">{l}</Label></div>}
                  </div>
                );
              })}
              {pop(t, 275.4) > 0 && <div style={{position: 'absolute', left: 380, top: 640, transform: 'translateX(-50%)', background: ECO, borderRadius: 30, padding: '8px 22px', zIndex: 5}}><Label size={28} color="#fff">Se protéger</Label></div>}
            </div>
          </At>
        </>
      )}
      {quest && (
        <AbsoluteFill style={{opacity: pop(t, QUESTION + 0.1)}}>
          <Kinetic text="Le *premier pas*, toujours avec sérieux ?" at={QUESTION + 0.2} y={300} size={70} />
          {Array.from({length: 6}, (_, k) => {
            const at = 281.0 + k * 0.6;
            const p = pop(t, at, 0.25);
            return <div key={k} style={{position: 'absolute', left: 430 + (k % 2) * 150, top: 1480 - k * 160, opacity: p, transform: `scale(${1.6 - 0.6 * p}) rotate(${k % 2 ? 8 : -8}deg)`}}><div style={{width: 110, height: 110, borderRadius: 55, background: BLUE, border: '6px solid #fff', boxShadow: shadow, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><F n="pas" size={70} /></div></div>;
          })}
          <At x={540} y={560} style={{transform: `translate(-50%, -50%) scale(${pop(t, 284.6, 0.4)})`}}><div style={{fontFamily: sansFont, fontWeight: 900, fontSize: 200, color: ORANGE}}>?</div></At>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ─────────── Son ─────────── */
const CUTS = [SCENE, DEF, QUI, OBJ, CONT, EX, IMPACT, MYTH, FINAL];
const CUES: Sfx[] = [
  {at: 0.05, s: 'bass-hit', v: 0.45},
  {at: 4.2, s: 'deep-hit', v: 0.4},
  ...[8.45, 9.1, 9.87].map((at) => ({at, s: 'sfx/pop', v: 0.45})),
  {at: 12.6, s: 'tampon', v: 0.65},
  {at: 14.0, s: 'sfx/whoosh', v: 0.45},
  {at: 14.6, s: 'bass-hit', v: 0.55},
  ...CUTS.flatMap((at) => [{at: at - 0.45, s: 'sfx/swish', v: 0.4}, {at: at - 0.05, s: 'sfx/click', v: 0.55}]),
  {at: 19.3, s: 'tension', v: 0.2, dur: 3},
  {at: 23.0, s: 'sfx/pop', v: 0.4},
  {at: 25.0, s: 'cadenas', v: 0.5},
  {at: 25.8, s: 'alarme', v: 0.14, dur: 0.8},
  {at: 31.8, s: 'deep-hit', v: 0.45},
  {at: 47.9, s: 'riser', v: 0.22, dur: 2.5},
  {at: 50.6, s: 'validation', v: 0.45},
  {at: 56.0, s: 'bass-hit', v: 0.45},
  ...[59.6, 61.1, 63.6].map((at) => ({at, s: 'sfx/whoosh', v: 0.4})),
  ...PEOPLE.flatMap(([, , at]) => [{at: at - 0.5, s: 'sfx/swish', v: 0.4}, {at, s: 'page', v: 0.45}]),
  {at: 79.4, s: 'validation', v: 0.45},
  ...STOPS.map(([, , at]) => ({at, s: 'notification', v: 0.35})),
  {at: 111.5, s: 'validation', v: 0.45},
  ...[131.1, 133.3, 135.6].map((at) => ({at, s: 'sfx/pop', v: 0.4})),
  {at: 129.3, s: 'soft-whoosh', v: 0.5},
  {at: 140.4, s: 'cadenas', v: 0.45},
  ...[0, 1, 2, 3, 4].map((k) => ({at: 141.2 + k * 0.25, s: 'sfx/pop', v: 0.35})),
  {at: 146.9, s: 'alarme', v: 0.18, dur: 1.6},
  ...[147.0, 148.4, 149.7].map((at) => ({at, s: 'notification', v: 0.4})),
  {at: 152.4, s: 'validation', v: 0.4},
  ...[161.4, 162.2, 163.0, 163.8].map((at) => ({at: at + 0.85, s: 'sfx/thud', v: 0.4})),
  {at: 166.6, s: 'soft-whoosh', v: 0.45, dur: 3},
  {at: 177.9, s: 'tension', v: 0.25, dur: 5},
  {at: 189.3, s: 'page', v: 0.5},
  ...[190.6, 193.4, 195.4].map((at) => ({at: at + 0.1, s: 'tick', v: 0.45})),
  {at: 196.0, s: 'tampon', v: 0.65},
  ...[217.0, 220.62, 227.12].map((at) => ({at: at - 0.2, s: 'deep-hit', v: 0.4})),
  ...[238.2, 241.6].map((at) => ({at, s: 'sfx/pop', v: 0.45})),
  {at: 244.5, s: 'validation', v: 0.4},
  {at: 251.2, s: 'sfx/whoosh', v: 0.5},
  {at: 253.9, s: 'sfx/ding', v: 0.35},
  {at: 257.6, s: 'sfx/whoosh', v: 0.5},
  {at: 258.5, s: 'sfx/ding', v: 0.35},
  ...Array.from({length: 18}, (_, k) => ({at: 268.2 + k * 0.38, s: 'sfx/click', v: 0.15})),
  ...[275.4, 277.9, 279.3].map((at) => ({at, s: 'sfx/pop', v: 0.4})),
  ...Array.from({length: 6}, (_, k) => ({at: 281.0 + k * 0.6, s: 'sfx/thud', v: 0.3})),
  {at: 284.6, s: 'deep-hit', v: 0.45},
  {at: OUTRO_AT + 0.2, s: 'signature-marque', v: 0.6, dur: 3.2},
];

export const InductionHse: React.FC = () => (
  <AbsoluteFill>
    <Backdrop />
    <Gate from={0} to={SCENE}><Hook /></Gate>
    <Gate from={SCENE} to={DEF}><Scene /></Gate>
    <Gate from={DEF} to={QUI}><Definition /></Gate>
    <Gate from={QUI} to={OBJ}><Who /></Gate>
    <Gate from={OBJ} to={CONT}><Gps /></Gate>
    <Gate from={CONT} to={EX}><Content /></Gate>
    <Gate from={EX} to={IMPACT}><Example /></Gate>
    <Gate from={IMPACT} to={MYTH}><Impact /></Gate>
    <Gate from={MYTH} to={FINAL}><Myths /></Gate>
    <Gate from={FINAL} to={OUTRO_AT}><Final /></Gate>
    <Gate from={OUTRO_AT} to={999}><Outro at={OUTRO_AT} logo={LOGO} /></Gate>
    {[...CUTS, OUTRO_AT].map((at) => <Film key={at} at={at} />)}
    <AbsoluteFill style={{zIndex: 100}}><Gate from={0} to={OUTRO_AT}><Captions captions={captions} /></Gate></AbsoluteFill>
    <Audio src={staticFile('voix-induction-hse-origine.m4a')} />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);
