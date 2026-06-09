import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { THEME } from '../theme';

export const SettingsIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade in app mock with gear highlighted
  const appOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  // Gear pulse — scale + glow
  const pulse = Math.sin(frame * 0.18) * 0.5 + 0.5;
  const gearScale = 1 + pulse * 0.08;
  const gearGlow = pulse * 30;

  // Arrow + label "tap here"
  const arrowOpacity = interpolate(frame, [25, 45], [0, 1], { extrapolateRight: 'clamp' });

  // Two bullet items, staggered
  const item1 = spring({ frame: Math.max(0, frame - 50), fps, from: 0, to: 1, config: { damping: 14, stiffness: 110 } });
  const item2 = spring({ frame: Math.max(0, frame - 80), fps, from: 0, to: 1, config: { damping: 14, stiffness: 110 } });

  const sceneFade = interpolate(frame, [130, 150], [1, 0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: THEME.bg,
        fontFamily: THEME.font,
        opacity: sceneFade,
      }}
    >
      {/* Mini app row at top */}
      <div style={{ paddingTop: 140, opacity: appOpacity }}>
        <div
          style={{
            width: 1100,
            margin: '0 auto',
            display: 'flex',
            gap: 12,
          }}
        >
          <div
            style={{
              flex: 1,
              fontSize: 32,
              padding: '20px 28px',
              border: `3px solid ${THEME.border}`,
              borderRadius: 14,
              background: THEME.card,
              color: THEME.textFaint,
              minHeight: 70,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Type here...
          </div>
          <div
            style={{
              width: 70,
              height: 70,
              borderRadius: 14,
              background: THEME.card,
              border: `3px solid ${THEME.border}`,
              fontSize: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            🎤
          </div>
          {/* Highlighted gear */}
          <div
            style={{
              width: 70,
              height: 70,
              borderRadius: 14,
              background: THEME.card,
              border: `3px solid ${THEME.accent}`,
              fontSize: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `scale(${gearScale})`,
              boxShadow: `0 0 ${gearGlow}px 4px ${THEME.accent}55`,
            }}
          >
            ⚙️
          </div>
        </div>
      </div>

      {/* Arrow pointing to gear */}
      <div
        style={{
          position: 'absolute',
          top: 250,
          right: 280,
          fontSize: 28,
          color: THEME.accent,
          opacity: arrowOpacity,
          fontWeight: 600,
        }}
      >
        ↑ Налаштування
      </div>

      {/* Body text */}
      <div
        style={{
          position: 'absolute',
          top: 400,
          left: 0,
          right: 0,
          textAlign: 'center',
          color: THEME.text,
          fontFamily: THEME.font,
        }}
      >
        <div style={{ fontSize: 48, fontWeight: 500, marginBottom: 60 }}>
          Відкрийте налаштування, щоб:
        </div>
        <div
          style={{
            fontSize: 36,
            color: THEME.text,
            opacity: item1,
            transform: `translateY(${(1 - item1) * 16}px)`,
            marginBottom: 28,
          }}
        >
          🔑  додати свої API-ключі
        </div>
        <div
          style={{
            fontSize: 36,
            color: THEME.text,
            opacity: item2,
            transform: `translateY(${(1 - item2) * 16}px)`,
          }}
        >
          ➕  додати власні команди
        </div>
      </div>
    </AbsoluteFill>
  );
};
