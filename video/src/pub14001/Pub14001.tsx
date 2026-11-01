import React from 'react';
import {AbsoluteFill, Audio, Img, interpolate, staticFile} from 'remotion';
import {easeInOut, easeOut, prog, useT} from '../anim';
import {F} from '../iso/ui';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {s, sansFont} from '../theme';
import {FORMAT, HAS_COVER, PAYMENT, PRICE} from './config';

/**
 * Publicité « Décrypter l'ISO 14001 » (≈ 46 s) — UNIVERSNORMES QHSE. Charte institutionnelle sobre : bleu #082B66,
 * vert #22B573, gris clair #F3F5F7. Voix off ElevenLabs (voix « Isac », grave et posée), nappe musicale discrète,
 * photos de la banque de la marque en travelling lent. Deux formats : 9:16 (TikTok, Reels, statut WhatsApp) et 1:1
 * (fils Facebook, Instagram, WhatsApp). Prix, paiement et couverture réelle se règlent dans config.ts.
 */
export const BLUE = '#082B66';
export const GREEN = '#22B573';
const WHITE = '#FFFFFF';
const LIGHT = '#F3F5F7';
const GREY = '#5A5A5A';
const END = 44.6;
export const PUB14001_FRAMES = s(END + 2.4);

type Fmt = {W: number; H: number};
const FmtCtx = React.createContext<Fmt>({W: 1080, H: 1920});
const useFmt = () => React.useContext(FmtCtx);
/** Position verticale : fraction de la hauteur utile (le carré resserre l'espace). */
const useY = () => {
  const {H} = useFmt();
  return (f: number) => f * H;
};

const fade = (t: number, a: number, b: number, d = 0.35) => prog(t, a, a + d) * (1 - prog(t, b - d, b));
const rise = (t: number, at: number, d = 0.6) => prog(t, at, at + d, easeOut);

const Txt: React.FC<{children: React.ReactNode; size: number; color?: string; weight?: number; style?: React.CSSProperties}> = ({children, size, color = WHITE, weight = 800, style}) => (
  <div style={{fontFamily: sansFont, fontWeight: weight, fontSize: size, color, lineHeight: 1.12, letterSpacing: -0.3, ...style}}>{children}</div>
);
const Center: React.FC<{y: number; children: React.ReactNode; style?: React.CSSProperties}> = ({y, children, style}) => (
  <div style={{position: 'absolute', left: 70, right: 70, top: y, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', ...style}}>{children}</div>
);

/** Photo plein cadre en travelling lent, voilée de bleu. */
const PhotoBg: React.FC<{src: string; a: number; b: number; pos?: string; veil?: number}> = ({src, a, b, pos = 'center', veil = 0.72}) => {
  const t = useT();
  const z = interpolate(t, [a, b], [1.04, 1.14]);
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${z})`}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${BLUE}${Math.round(veil * 255).toString(16)} 0%, ${BLUE}${Math.round(Math.min(1, veil + 0.2) * 255).toString(16)} 100%)`}} />
    </AbsoluteFill>
  );
};

/** Filet vert qui se dessine. */
const Rule: React.FC<{at: number; w?: number}> = ({at, w = 160}) => {
  const t = useT();
  return <div style={{width: w * prog(t, at, at + 0.5, easeInOut), height: 6, borderRadius: 3, background: GREEN, marginTop: 26}} />;
};

/** Le livre : couverture réelle si fournie, sinon maquette typographique sobre. Rotation 3D lente. */
export const Book: React.FC<{w: number; at: number}> = ({w, at}) => {
  const t = useT();
  const h = w * 1.42;
  const q = rise(t, at, 0.9);
  const rot = interpolate(t, [at, at + 12], [-24, -10]);
  const sweep = prog(t, at + 0.8, at + 2.0, easeInOut);
  return (
    <div style={{perspective: 2000, width: w * 1.15, height: h * 1.05, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{position: 'relative', width: w, height: h, transformStyle: 'preserve-3d', transform: `rotateY(${rot}deg) rotateX(4deg) translateY(${(1 - q) * 80}px)`, opacity: q}}>
        {/* tranche */}
        <div style={{position: 'absolute', left: -w * 0.08, top: 0, width: w * 0.08, height: h, background: `linear-gradient(90deg, #04183D, ${BLUE})`, transform: `rotateY(-90deg)`, transformOrigin: '100% 50%'}} />
        <div style={{position: 'absolute', inset: 0, borderRadius: '4px 10px 10px 4px', overflow: 'hidden', boxShadow: '30px 40px 80px rgba(0,0,0,0.45)'}}>
          {HAS_COVER ? (
            <Img src={staticFile('pub14001/couverture.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
          ) : (
            <div style={{width: '100%', height: '100%', background: `linear-gradient(160deg, #0C3A85 0%, ${BLUE} 55%, #04183D 100%)`, display: 'flex', flexDirection: 'column', padding: w * 0.09, boxSizing: 'border-box'}}>
              <div style={{width: w * 0.22, height: 6, background: GREEN}} />
              <Txt size={w * 0.085} weight={700} style={{marginTop: w * 0.12, letterSpacing: 4, color: 'rgba(255,255,255,0.75)'}}>DÉCRYPTER</Txt>
              <Txt size={w * 0.2} weight={900} style={{marginTop: w * 0.02, letterSpacing: -1}}>L’ISO</Txt>
              <Txt size={w * 0.25} weight={900} color={GREEN} style={{letterSpacing: -2}}>14001</Txt>
              <div style={{flex: 1}} />
              <Img src={staticFile('promo/logo.png')} style={{width: w * 0.6, background: WHITE, borderRadius: 10, padding: '6px 10px'}} />
            </div>
          )}
          <div style={{position: 'absolute', inset: 0, background: `linear-gradient(115deg, transparent ${sweep * 150 - 40}%, rgba(255,255,255,0.32) ${sweep * 150 - 22}%, transparent ${sweep * 150 - 4}%)`}} />
          <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: w * 0.035, background: 'linear-gradient(90deg, rgba(0,0,0,0.35), transparent)'}} />
        </div>
      </div>
    </div>
  );
};

/* 1. Accroche (0 → 5,5 s) */
const Hook: React.FC = () => {
  const t = useT();
  const y = useY();
  const o = fade(t, 0, 5.5, 0.3);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      <PhotoBg src="promo/raffinerie.jpg" a={0} b={5.5} veil={0.62} />
      <Center y={y(0.30)}>
        <Txt size={56} weight={700} color="rgba(255,255,255,0.8)" style={{letterSpacing: 8, opacity: rise(t, 0.1)}}>LA NORME</Txt>
        <div style={{display: 'flex', marginTop: 10}}>
          {'ISO 14001'.split('').map((c, i) => {
            const p = rise(t, 0.25 + i * 0.06, 0.5);
            return <span key={i} style={{fontFamily: sansFont, fontWeight: 900, fontSize: 168, color: i > 3 ? GREEN : WHITE, transform: `translateY(${(1 - p) * 60}px)`, opacity: p, whiteSpace: 'pre', letterSpacing: -4}}>{c}</span>;
          })}
        </div>
        <Rule at={1.4} w={220} />
      </Center>
      <Center y={y(0.56)}>
        <Txt size={60} style={{opacity: rise(t, 1.6), transform: `translateY(${(1 - rise(t, 1.6)) * 24}px)`}}>Vous connaissez son nom.</Txt>
        <Txt size={66} color={GREEN} weight={900} style={{marginTop: 22, opacity: rise(t, 3.5), transform: `translateY(${(1 - rise(t, 3.5)) * 24}px)`}}>Savez-vous vraiment la mettre en œuvre ?</Txt>
      </Center>
    </AbsoluteFill>
  );
};

/* 2. Les exigences (5,5 → 12,2 s) */
const REQ: [string, string, number][] = [['feuille', 'Aspects environnementaux', 5.56], ['balance', 'Obligations de conformité', 7.12], ['cible', 'Risques et opportunités', 8.96], ['graphique', 'Indicateurs de performance', 10.56]];
const Requirements: React.FC = () => {
  const t = useT();
  const y = useY();
  const {H} = useFmt();
  const o = fade(t, 5.4, 12.25);
  if (o <= 0) return null;
  const gap = H > 1500 ? 250 : 128;
  return (
    <AbsoluteFill style={{opacity: o, background: LIGHT}}>
      <Center y={y(H > 1500 ? 0.15 : 0.13)}>
        <Txt size={44} weight={800} color={BLUE} style={{letterSpacing: 4}}>CE QUE DEMANDE LA NORME</Txt>
        <Rule at={5.7} />
      </Center>
      {REQ.map(([ic, l, at], i) => {
        const p = rise(t, at - 0.1, 0.5);
        return (
          <div key={l} style={{position: 'absolute', left: 90, right: 90, top: y(H > 1500 ? 0.25 : 0.26) + i * gap, height: gap - 30, display: 'flex', alignItems: 'center', gap: 30, padding: '0 36px', background: WHITE, borderRadius: 22, boxShadow: '0 14px 30px rgba(8,43,102,0.10)', borderLeft: `10px solid ${GREEN}`, opacity: p, transform: `translateX(${(1 - p) * 120}px)`}}>
            <F n={ic} size={gap - 70} />
            <Txt size={H > 1500 ? 58 : 40} color={BLUE}>{l}</Txt>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

/* 3. Seul face au texte (12,2 → 19,1 s) */
const Alone: React.FC = () => {
  const t = useT();
  const y = useY();
  const {H} = useFmt();
  const o = fade(t, 12.1, 19.15);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o}}>
      <PhotoBg src="promo/terrain-controle.jpg" a={12.1} b={19.2} pos="60% 40%" veil={0.55} />
      {/* page de texte dense qui défile */}
      <div style={{position: 'absolute', left: 120, right: 120, top: y(H > 1500 ? 0.16 : 0.10), height: y(0.30), borderRadius: 18, background: 'rgba(255,255,255,0.94)', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.4)', opacity: rise(t, 12.3)}}>
        <div style={{transform: `translateY(${-(t - 12.2) * 40}px)`, padding: 34}}>
          {Array.from({length: 40}, (_, k) => <div key={k} style={{height: 14, borderRadius: 7, background: '#C9D0DA', width: `${60 + ((k * 37) % 40)}%`, marginBottom: 18, filter: 'blur(1px)'}} />)}
        </div>
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(255,255,255,0) 60%, rgba(255,255,255,0.95) 100%)'}} />
      </div>
      <Center y={y(H > 1500 ? 0.56 : 0.50)}>
        <Txt size={52} weight={700} style={{opacity: rise(t, 12.4)}}>Sur le terrain,</Txt>
        <Txt size={72} weight={900} style={{marginTop: 12, opacity: rise(t, 15.3)}}>seul face à un texte dense…</Txt>
        <Txt size={58} weight={800} color={GREEN} style={{marginTop: 24, opacity: rise(t, 17.4)}}>difficile à traduire en actions.</Txt>
      </Center>
    </AbsoluteFill>
  );
};

/* 4. La bascule (19,1 → 23,4 s) */
const Turn: React.FC = () => {
  const t = useT();
  const y = useY();
  const o = fade(t, 19.05, 23.45, 0.3);
  if (o <= 0) return null;
  const strike = prog(t, 20.8, 21.2, easeInOut);
  return (
    <AbsoluteFill style={{opacity: o, background: WHITE}}>
      <Center y={y(0.30)}>
        <Txt size={48} weight={700} color={GREY} style={{opacity: rise(t, 19.3)}}>Le problème n’est pas…</Txt>
        <div style={{position: 'relative', marginTop: 18, opacity: rise(t, 20.0)}}>
          <Txt size={110} weight={900} color={BLUE}>la norme</Txt>
          <div style={{position: 'absolute', left: -10, top: '52%', height: 10, borderRadius: 5, width: `${strike * 104}%`, background: '#D9443A'}} />
        </div>
        <Txt size={48} weight={700} color={GREY} style={{marginTop: 50, opacity: rise(t, 20.85)}}>c’est la manière de</Txt>
        <div style={{display: 'flex', gap: 26, marginTop: 20}}>
          {[['la lire', 21.85], ['l’appliquer', 22.5]].map(([l, at]) => (
            <div key={l as string} style={{padding: '14px 34px', borderRadius: 50, background: GREEN, opacity: rise(t, at as number, 0.4), transform: `scale(${0.8 + 0.2 * rise(t, at as number, 0.4)})`}}>
              <Txt size={56} weight={900}>{l}</Txt>
            </div>
          ))}
        </div>
      </Center>
    </AbsoluteFill>
  );
};

/* 5. L'ouvrage (23,4 → 36,2 s) */
const AUD: [string, number][] = [['Responsables QHSE', 28.5], ['Auditeurs', 30.1], ['Consultants', 30.95], ['Étudiants', 31.8]];
const Offer: React.FC = () => {
  const t = useT();
  const y = useY();
  const {H} = useFmt();
  const o = fade(t, 23.35, 36.25);
  if (o <= 0) return null;
  const tall = H > 1500;
  return (
    <AbsoluteFill style={{opacity: o, background: `radial-gradient(80% 55% at 50% 35%, #0E3B86 0%, ${BLUE} 70%)`}}>
      <div style={{position: 'absolute', left: tall ? 0 : 60, right: tall ? 0 : 'auto', top: tall ? y(0.07) : y(0.12), display: 'flex', justifyContent: 'center'}}>
        <Book w={tall ? 470 : 360} at={23.5} />
      </div>
      <div style={{position: 'absolute', left: tall ? 90 : 520, right: tall ? 90 : 50, top: tall ? y(0.48) : y(0.13), display: 'flex', flexDirection: 'column', alignItems: tall ? 'center' : 'flex-start', textAlign: tall ? 'center' : 'left'}}>
        <Txt size={tall ? 40 : 30} weight={700} color="rgba(255,255,255,0.75)" style={{letterSpacing: 5, opacity: rise(t, 23.6)}}>UNIVERSNORMES QHSE</Txt>
        <Txt size={tall ? 74 : 56} weight={900} style={{marginTop: 10, opacity: rise(t, 23.9)}}>Décrypter <span style={{color: GREEN}}>l’ISO 14001</span></Txt>
        <Txt size={tall ? 36 : 28} weight={600} color="rgba(255,255,255,0.8)" style={{marginTop: 16, opacity: rise(t, 27.3)}}>Un ouvrage pensé pour :</Txt>
        <div style={{display: 'grid', gridTemplateColumns: tall ? '1fr 1fr' : '1fr', gap: tall ? 18 : 12, marginTop: 20, width: tall ? '100%' : 'auto'}}>
          {AUD.map(([l, at]) => {
            const p = rise(t, at, 0.4);
            return (
              <div key={l} style={{display: 'flex', alignItems: 'center', gap: 14, padding: tall ? '16px 22px' : '10px 18px', borderRadius: 16, background: 'rgba(255,255,255,0.08)', border: '2px solid rgba(255,255,255,0.18)', opacity: p, transform: `translateY(${(1 - p) * 20}px)`}}>
                <svg width={tall ? 40 : 30} height={tall ? 40 : 30} viewBox="0 0 24 24"><circle cx={12} cy={12} r={11} fill={GREEN} /><path d="M6.5 12.5 L10.5 16 L17.5 8.5" fill="none" stroke={WHITE} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={`${prog(t, at + 0.1, at + 0.4)} 1`} /></svg>
                <Txt size={tall ? 36 : 28} weight={700}>{l}</Txt>
              </div>
            );
          })}
        </div>
        <Txt size={tall ? 40 : 30} weight={800} color={GREEN} style={{marginTop: tall ? 34 : 20, opacity: rise(t, 32.7)}}>Comprendre la norme · Bâtir un SME</Txt>
      </div>
    </AbsoluteFill>
  );
};

/* 6. Appel à l'action (36,2 → 41 s) */
const Cta: React.FC = () => {
  const t = useT();
  const y = useY();
  const {H} = useFmt();
  const o = fade(t, 36.15, 41.05, 0.3);
  if (o <= 0) return null;
  const tall = H > 1500;
  const typed = '14001'.slice(0, Math.floor(prog(t, 38.2, 38.9) * 5.99));
  const extra = [FORMAT, PRICE, PAYMENT].filter(Boolean).join('  ·  ');
  return (
    <AbsoluteFill style={{opacity: o, background: LIGHT}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: tall ? y(0.06) : y(0.05), display: 'flex', justifyContent: 'center', transform: `scale(${tall ? 0.75 : 0.5})`, transformOrigin: '50% 0'}}>
        <Book w={420} at={36.2} />
      </div>
      <Center y={tall ? y(0.47) : y(0.50)}>
        <div style={{display: 'flex', alignItems: 'center', gap: 18, padding: tall ? '26px 54px' : '18px 40px', borderRadius: 60, background: BLUE, boxShadow: '0 20px 40px rgba(8,43,102,0.3)', opacity: rise(t, 36.5, 0.4), transform: `scale(${0.85 + 0.15 * rise(t, 36.5, 0.4)})`}}>
          <F n="epingle" size={tall ? 64 : 48} />
          <Txt size={tall ? 62 : 46} weight={900}>Lien en bio</Txt>
        </div>
        <Txt size={tall ? 40 : 30} weight={700} color={GREY} style={{marginTop: tall ? 34 : 20, opacity: rise(t, 37.5)}}>ou écrivez en commentaire</Txt>
        <div style={{marginTop: tall ? 20 : 14, display: 'flex', alignItems: 'center', gap: 16, padding: tall ? '20px 30px' : '14px 24px', borderRadius: 24, background: WHITE, border: `3px solid ${GREEN}`, boxShadow: '0 12px 26px rgba(8,43,102,0.12)', minWidth: tall ? 420 : 340, opacity: rise(t, 37.8, 0.3)}}>
          <F n="bulle" size={tall ? 56 : 42} />
          <Txt size={tall ? 64 : 48} weight={900} color={BLUE} style={{letterSpacing: 4}}>{typed}<span style={{opacity: Math.floor(t * 3) % 2 ? 1 : 0, color: GREEN}}>|</span></Txt>
        </div>
        <Txt size={tall ? 34 : 26} weight={600} color={GREY} style={{marginTop: tall ? 22 : 14, opacity: rise(t, 39.9)}}>… et nous vous l’envoyons.</Txt>
        {extra && <Txt size={tall ? 36 : 28} weight={800} color={GREEN} style={{marginTop: tall ? 26 : 16, opacity: rise(t, 37.0)}}>{extra}</Txt>}
      </Center>
    </AbsoluteFill>
  );
};

/* 7. Signature (41 s → fin) */
const Signature: React.FC = () => {
  const t = useT();
  const y = useY();
  const o = prog(t, 40.9, 41.3);
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: o, background: WHITE}}>
      <Center y={y(0.36)}>
        <Img src={staticFile('promo/logo.png')} style={{width: 720, opacity: rise(t, 41.0, 0.8), transform: `scale(${0.92 + 0.08 * rise(t, 41.0, 0.8)})`}} />
        <Rule at={41.6} w={260} />
        <Txt size={46} weight={700} color={BLUE} style={{marginTop: 30, fontStyle: 'italic', opacity: rise(t, 42.2)}}>Des normes aujourd’hui,</Txt>
        <Txt size={46} weight={700} color={GREEN} style={{fontStyle: 'italic', opacity: rise(t, 43.2)}}>un avenir durable demain</Txt>
      </Center>
    </AbsoluteFill>
  );
};

/** Sous-titres sobres (bandeau blanc), calés sur la voix. */
const SUBS: [string, number, number][] = [
  ['ISO 14001… Vous connaissez son nom.', 0.2, 3.4], ['Mais savez-vous vraiment la mettre en œuvre ?', 3.4, 5.5],
  ['Aspects environnementaux.', 5.5, 7.0], ['Obligations de conformité.', 7.0, 8.9], ['Risques et opportunités.', 8.9, 10.5], ['Indicateurs de performance.', 10.5, 12.2],
  ['Sur le terrain, beaucoup de professionnels QHSE', 12.2, 14.9], ['se retrouvent seuls face à un texte dense…', 14.9, 17.3], ['… et difficile à traduire en actions.', 17.3, 19.1],
  ['Le problème n’est pas la norme.', 19.1, 20.8], ['C’est la manière de la lire… et de l’appliquer.', 20.8, 23.4],
  ['« Décrypter l’ISO 14001 », par UNIVERSNORMES QHSE.', 23.4, 27.2], ['Un ouvrage pensé pour les responsables QHSE,', 27.2, 30.0], ['les auditeurs, les consultants et les étudiants', 30.0, 32.3],
  ['qui veulent comprendre la norme', 32.3, 33.7], ['et bâtir un système de management environnemental.', 33.7, 36.2],
  ['Le lien est en bio.', 36.2, 37.5], ['Ou écrivez « 14001 » en commentaire :', 37.5, 39.8], ['nous vous l’envoyons.', 39.8, 40.9],
];
const Subtitles: React.FC = () => {
  const t = useT();
  const {H} = useFmt();
  const cur = SUBS.find(([, a, b]) => t >= a && t < b);
  if (!cur || t > 40.9 || t < 5.5 || (t >= 19.1 && t < 23.4)) return null;
  const p = prog(t, cur[1], cur[1] + 0.18);
  return (
    <div style={{position: 'absolute', left: 50, right: 50, bottom: H > 1500 ? 230 : 46, display: 'flex', justifyContent: 'center', opacity: p}}>
      <div style={{background: 'rgba(255,255,255,0.96)', borderRadius: 14, padding: '12px 26px', boxShadow: '0 8px 20px rgba(0,0,0,0.18)', borderBottom: `5px solid ${GREEN}`}}>
        <Txt size={H > 1500 ? 40 : 32} weight={700} color={BLUE} style={{textAlign: 'center'}}>{cur[0]}</Txt>
      </div>
    </div>
  );
};

/** Logo discret en haut (sauf écran de signature). */
const Corner: React.FC = () => {
  const t = useT();
  const {H} = useFmt();
  if (t > 40.9) return null;
  return (
    <div style={{position: 'absolute', top: H > 1500 ? 70 : 30, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: prog(t, 0.3, 0.8)}}>
      <div style={{background: WHITE, borderRadius: 18, padding: '8px 20px', boxShadow: '0 8px 20px rgba(0,0,0,0.15)'}}><Img src={staticFile('promo/logo.png')} style={{height: H > 1500 ? 64 : 46, display: 'block'}} /></div>
    </div>
  );
};

const CUES: Sfx[] = [
  {at: 0.2, s: 'bass-hit', v: 0.3},
  ...REQ.map(([, , at]) => ({at: at - 0.05, s: 'sfx/pop', v: 0.18})),
  {at: 12.2, s: 'soft-whoosh', v: 0.25}, {at: 19.1, s: 'soft-whoosh', v: 0.25}, {at: 20.8, s: 'stylo', v: 0.3, dur: 0.5},
  {at: 23.45, s: 'soft-whoosh', v: 0.3}, ...AUD.map(([, at]) => ({at, s: 'tick', v: 0.18})),
  {at: 36.25, s: 'soft-whoosh', v: 0.25}, {at: 36.5, s: 'sfx/pop', v: 0.2}, ...[0, 1, 2, 3, 4].map((k) => ({at: 38.25 + k * 0.14, s: 'sfx/click', v: 0.18})),
  {at: 41.0, s: 'signature-marque', v: 0.45, dur: 3.2},
];

export const Pub14001: React.FC<{W: number; H: number}> = ({W, H}) => (
  <FmtCtx.Provider value={{W, H}}>
    <AbsoluteFill style={{background: BLUE}}>
      <Hook />
      <Requirements />
      <Alone />
      <Turn />
      <Offer />
      <Cta />
      <Signature />
      <Corner />
      <Subtitles />
      <Audio src={staticFile('pub14001/voix-pub14001.mp3')} />
      <Audio src={staticFile('musique-promo.m4a')} volume={(f) => 0.07 * Math.min(1, f / 30) * Math.max(0, Math.min(1, (s(END + 2.2) - f) / 45))} />
      <SoundDesign cues={CUES} />
    </AbsoluteFill>
  </FmtCtx.Provider>
);
export const Pub14001Vertical: React.FC = () => <Pub14001 W={1080} H={1920} />;
export const Pub14001Carre: React.FC = () => <Pub14001 W={1080} H={1080} />;
