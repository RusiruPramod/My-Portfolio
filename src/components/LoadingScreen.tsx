import React from 'react';

interface LoadingScreenProps {
  progress: number;
}

export default function LoadingScreen({ progress }: LoadingScreenProps) {
  const pct = Math.min(Math.round(progress), 100);
  const circumference = 2 * Math.PI * 54; // r=54
  const dashOffset = circumference - (pct / 100) * circumference;

  return (
    <div className="loading-screen">
      {/* Animated background */}
      <div className="absolute inset-0 hud-grid opacity-40" />
      
      {/* Logo */}
      <div className="flex flex-col items-center gap-6 z-10">
        <div className="relative">
          {/* Spinning ring */}
          <svg width="128" height="128" viewBox="0 0 128 128" aria-hidden="true">
            {/* Track */}
            <circle
              cx="64" cy="64" r="54"
              fill="none"
              stroke="rgba(0,229,255,0.1)"
              strokeWidth="3"
            />
            {/* Progress */}
            <circle
              cx="64" cy="64" r="54"
              fill="none"
              stroke="#00e5ff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              transform="rotate(-90 64 64)"
              style={{
                filter: 'drop-shadow(0 0 6px rgba(0,229,255,0.8))',
                transition: 'stroke-dashoffset 0.3s ease',
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

        <div className="text-center space-y-2">
          <h1 className="font-orbitron text-2xl font-bold text-gradient-cyan tracking-widest">
            RUSIRU PRAMOD
          </h1>
          <p className="text-white/40 text-sm tracking-[0.3em] font-space uppercase">
            Initializing Portfolio...
          </p>
        </div>

        {/* Dots animation */}
        <div className="flex gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-cyan-DEFAULT"
              style={{
                animationDelay: `${i * 0.15}s`,
                animation: 'pulse 1.2s ease-in-out infinite',
                opacity: 0.3 + (i * 0.2),
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

