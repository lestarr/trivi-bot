import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { THEME } from '../theme';

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, from: 0.85, to: 1, config: { damping: 30, stiffness: 40, mass: 1.5 } });
  const titleOpacity = interpolate(frame, [0, 60], [0, 1], { extrapolateRight: 'clamp' });
  const taglineOpacity = interpolate(frame, [50, 100], [0, 1], { extrapolateRight: 'clamp' });
  const taglineY = interpolate(frame, [50, 105], [20, 0], { extrapolateRight: 'clamp' });
  const fadeOut = interpolate(frame, [130, 150], [1, 0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: THEME.bg,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: THEME.font,
        opacity: fadeOut,
      }}
    >
      <div
        style={{
          fontSize: 200,
          fontWeight: 800,
          color: THEME.text,
          letterSpacing: -4,
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
        }}
      >
        Triv<span style={{ color: THEME.accent }}>i</span>
      </div>
      <div
        style={{
          fontSize: 36,
          color: THEME.textDim,
          marginTop: 24,
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          fontWeight: 300,
        }}
      >
        Швидкі відповіді. Без зайвого чату.
      </div>
    </AbsoluteFill>
  );
};
