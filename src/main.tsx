import React from 'react';
import ReactDOM from 'react-dom/client';
import Lenis from 'lenis';
import App from './App';
import './index.css';

// ── Smooth scroll with Lenis ──────────────────────────────────
const lenis = new Lenis({
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  touchMultiplier: 2,
  infinite: false,
});

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Expose for GSAP ScrollTrigger integration
(window as unknown as Record<string, unknown>).__lenis__ = lenis;

// ── Scroll progress bar ───────────────────────────────────────
const progressBar = document.createElement('div');
progressBar.id = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener(
  'scroll',
  () => {
    const pct =
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = `${Math.min(pct, 100)}%`;
  },
  { passive: true }
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

