import React from 'react';
import { THEME } from '../theme';

type Props = {
  inputText?: string;
  showCursor?: boolean;
  modeBadge?: string;
  micActive?: boolean;
  children?: React.ReactNode;
  responseScale?: number;
  responseOpacity?: number;
};

export const AppMock: React.FC<Props> = ({
  inputText = '',
  showCursor = false,
  modeBadge = '',
  micActive = false,
  children,
  responseScale = 1,
  responseOpacity = 1,
}) => {
  return (
    <div
      style={{
        width: 1100,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
        fontFamily: THEME.font,
      }}
    >
      {/* Input row */}
      <div style={{ display: 'flex', gap: 12 }}>
        <div
          style={{
            flex: 1,
            fontSize: 32,
            padding: '20px 28px',
            border: `3px solid ${inputText ? THEME.cardAlt : THEME.border}`,
            borderRadius: 14,
            background: THEME.card,
            color: THEME.text,
            minHeight: 70,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {inputText || <span style={{ color: THEME.textFaint }}>Type here...</span>}
          {showCursor && (
            <span
              style={{
                display: 'inline-block',
                width: 3,
                height: 36,
                background: THEME.accent,
                marginLeft: 4,
              }}
            />
          )}
        </div>
        <button
          style={{
            width: 70,
            height: 70,
            borderRadius: 14,
            background: micActive ? THEME.accent : THEME.card,
            border: `3px solid ${micActive ? THEME.accent : THEME.border}`,
            color: '#fff',
            fontSize: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          🎤
        </button>
        <button
          style={{
            width: 70,
            height: 70,
            borderRadius: 14,
            background: THEME.card,
            border: `3px solid ${THEME.border}`,
            color: THEME.text,
            fontSize: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ⚙️
        </button>
      </div>
      {/* Mode badge */}
      <div style={{ fontSize: 18, color: THEME.textDim, paddingLeft: 6, minHeight: 24 }}>
        {modeBadge}
      </div>
      {/* Response */}
      {children && (
        <div
          style={{
            background: THEME.card,
            borderRadius: 14,
            padding: '28px 32px',
            fontSize: 24,
            lineHeight: 1.55,
            color: THEME.text,
            transform: `scale(${responseScale})`,
            opacity: responseOpacity,
            transformOrigin: 'top center',
            minHeight: 100,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export const typedSlice = (full: string, frame: number, startFrame: number, charsPerFrame = 0.6) => {
  const elapsed = Math.max(0, frame - startFrame);
  const chars = Math.min(full.length, Math.floor(elapsed * charsPerFrame));
  return full.slice(0, chars);
};
