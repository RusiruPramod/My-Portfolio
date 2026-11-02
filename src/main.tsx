import React from 'react';
import ReactDOM from 'react-dom/client';
import Lenis from 'lenis';
import App from './App';
import './index.css';

// ── Smooth scroll with Lenis ──────────────────────────────────
const lenis = new Lenis({
  duration: 1.1,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  touchMultiplier: 1.5,
  infinite: false,
});

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Expose for GSAP ScrollTrigger integration if needed
(window as unknown as Record<string, unknown>).__lenis__ = lenis;

// ── Scroll progress bar with NaN guard ─────────────────────────
const progressBar = document.createElement('div');
progressBar.id = 'scroll-progress';
document.body.appendChild(progressBar);

let ticking = false;
window.addEventListener(
  'scroll',
  () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const pct = max > 0 ? Math.min(Math.max((window.scrollY / max) * 100, 0), 100) : 0;
        progressBar.style.width = `${pct}%`;
        ticking = false;
      });
      ticking = true;
    }
  },
  { passive: true }
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
