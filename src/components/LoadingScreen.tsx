import React from 'react';
import { ArrowRight } from 'lucide-react';

interface LoadingScreenProps {
  progress: number;
  onSkip?: () => void;
}

export default function LoadingScreen({ progress, onSkip }: LoadingScreenProps) {
  const pct = Math.min(Math.max(Math.round(progress), 0), 100);
  const circumference = 2 * Math.PI * 54; // r=54
  const dashOffset = circumference - (pct / 100) * circumference;

  return (
    <div className="loading-screen" role="status" aria-live="polite">
      {/* Animated background */}
      <div className="absolute inset-0 hud-grid opacity-40 pointer-events-none" />

      {/* Main card */}
      <div className="flex flex-col items-center gap-6 z-10 px-4 text-center max-w-sm">
        <div className="relative">
          {/* Spinning ring */}
          <svg width="128" height="128" viewBox="0 0 128 128" aria-hidden="true">
            {/* Track */}
            <circle
              cx="64"
              cy="64"
              r="54"
              fill="none"
              stroke="rgba(0,229,255,0.12)"
              strokeWidth="3"
            />
            {/* Progress */}
            <circle
              cx="64"
              cy="64"
              r="54"
              fill="none"
              stroke="#00e5ff"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              transform="rotate(-90 64 64)"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(0,229,255,0.85))',
                transition: 'stroke-dashoffset 0.2s ease-out',
              }}
            />
          </svg>

          {/* Percentage */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-orbitron text-cyan-DEFAULT text-xl font-bold neon-text">
              {pct}%
            </span>
          </div>
        </div>

        <div className="space-y-1.5">
          <h1 className="font-orbitron text-xl sm:text-2xl font-black text-gradient-cyan tracking-widest">
            RUSIRU PRAMOD
          </h1>
          <p className="text-white/50 text-xs sm:text-sm tracking-[0.25em] font-space uppercase">
            Initializing Portfolio...
          </p>
        </div>

        {/* Pulse dots */}
        <div className="flex gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-cyan-DEFAULT animate-pulse"
              style={{
                animationDelay: `${i * 0.15}s`,
                opacity: 0.4 + i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Skip button so user NEVER gets stuck */}
        {onSkip && (
          <button
            type="button"
            onClick={onSkip}
            className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-orbitron font-semibold tracking-wider text-cyan-DEFAULT/90 hover:text-space-950 hover:bg-cyan-DEFAULT glass border-glow transition-all duration-200 cursor-pointer shadow-cyan-sm hover:scale-105 active:scale-95"
            aria-label="Skip to portfolio"
          >
            <span>ENTER DIRECTLY</span>
            <ArrowRight size={13} />
          </button>
        )}
      </div>
    </div>
  );
}
