import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';

// Fenêtre sur une compo existante : montre le vrai code à partir de `start` (en frames).
export const Window: React.FC<{start: number; children: React.ReactNode}> = ({start, children}) => (
  <AbsoluteFill>
    <Sequence from={-start}>{children}</Sequence>
  </AbsoluteFill>
);
