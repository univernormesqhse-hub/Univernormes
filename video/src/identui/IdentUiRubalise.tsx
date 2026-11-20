import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Sfx, SoundDesign} from '../prevention2/Cine';
import {TapeFX, TapeKind} from '../rubalise/Rubalise';
import {IdentUi, IDENTUI_FRAMES} from './IdentUi';

/**
 * « Identifier ou évaluer ? » — version rubalise : la capsule UI motion d'origine, inchangée, plus le kit rubalise.
 * Bandeaux de référence normative (ISO 45001:2018 § 6.1.2.1 identification des dangers, § 6.1.2.2 évaluation des
 * risques — libellés ajoutés, non prononcés), ruban diagonal / barrière / rubans qui se déroulent à chaque changement
 * de plan, zones délimitées au ruban (photo du terrain, jauge de criticité).
 */
export const IDENTUI_RUBALISE_FRAMES = IDENTUI_FRAMES;
const CUTS: [number, TapeKind][] = [[5.64, 'ribbon'], [11.88, 'barrier'], [26.72, 'tape'], [35.44, 'ribbon'], [43.8, 'barrier'], [52.58, 'tape']];
const CUES: Sfx[] = [
  ...CUTS.map(([at]) => ({at: at - 0.45, s: 'sfx/whoosh', v: 0.22})),
  {at: 6.0, s: 'sfx/pop', v: 0.22}, {at: 27.1, s: 'sfx/pop', v: 0.22},
  {at: 14.8, s: 'sfx/swish', v: 0.2}, {at: 41.5, s: 'sfx/swish', v: 0.2},
];

export const IdentUiRubalise: React.FC = () => (
  <AbsoluteFill>
    <IdentUi />
    <TapeFX
      paper="#F6F3EA"
      refY={1528}
      events={CUTS}
      zones={[[240, 515, 600, 1060, 14.8, 16.1], [330, 1025, 420, 455, 41.5, 43.4]]}
      refs={[[6.0, 'ISO 45001 § 6.1.2.1', 'IDENTIFICATION DES DANGERS', 5.0], [27.1, 'ISO 45001 § 6.1.2.2', 'ÉVALUATION DES RISQUES', 6.5]]}
    />
    <SoundDesign cues={CUES} />
  </AbsoluteFill>
);
