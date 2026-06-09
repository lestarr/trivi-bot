import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { THEME } from '../theme';

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, from: 0.7, to: 1, config: { damping: 12, stiffness: 110 } });
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const ctaOpacity = interpolate(frame, [20, 45], [0, 1], { extrapolateRight: 'clamp' });
  const ctaY = interpolate(frame, [20, 50], [16, 0], { extrapolateRight: 'clamp' });
  const footerOpacity = interpolate(frame, [50, 80], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: THEME.bg,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: THEME.font,
      }}
    >
      <div
        style={{
          fontSize: 140,
          fontWeight: 800,
          color: THEME.text,
          letterSpacing: -3,
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
        }}
      >
        Triv<span style={{ color: THEME.accent }}>i</span>
      </div>
      <a
        href="https://halyna4.gumroad.com/l/trivi"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          marginTop: 40,
          padding: '20px 48px',
          background: THEME.accent,
          color: '#fff',
          borderRadius: 14,
          fontSize: 42,
          fontWeight: 600,
          opacity: ctaOpacity,
          transform: `translateY(${ctaY}px)`,
          textDecoration: 'none',
          display: 'inline-block',
        }}
      >
        Завантажити на Gumroad →
      </a>
      <div
        style={{
          marginTop: 18,
          fontSize: 26,
          color: THEME.textDim,
          opacity: ctaOpacity,
          transform: `translateY(${ctaY}px)`,
          letterSpacing: 0.5,
        }}
      >
        halyna4.gumroad.com/l/trivi
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 50,
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          opacity: footerOpacity,
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: '#ffffff',
            fontWeight: 500,
            letterSpacing: 1,
          }}
        >
          made by litai
        </div>
        <Img
          src={staticFile('litai-logo.png')}
          style={{ width: 160, height: 160 }}
        />
      </div>
    </AbsoluteFill>
  );
};
