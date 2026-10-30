import React, { Suspense, useState, useEffect, lazy } from 'react';
import { useReducedMotion } from './hooks/useReducedMotion';
import { useWebGL } from './hooks/useWebGL';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Projects from './sections/Projects';
import Timeline from './sections/Timeline';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import WaveBackground from './three/WaveBackground';

// Lazy-load heavy 3D intro scene
const IntroScene = lazy(() => import('./three/IntroScene'));

type AppState = 'loading' | 'intro' | 'main';

export default function App() {
  const reducedMotion = useReducedMotion();
  const webGL = useWebGL();

  // Session-based intro: show once per session
  const hasSeenIntro =
    reducedMotion || sessionStorage.getItem('introSeen') === 'true';

  const [appState, setAppState] = useState<AppState>(
    hasSeenIntro ? 'main' : 'loading'
  );

  const [loadingProgress, setLoadingProgress] = useState(0);

  // Simulate asset loading progress
  useEffect(() => {
    if (appState !== 'loading') return;
    const interval = setInterval(() => {
      setLoadingProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setAppState('intro'), 300);
          return 100;
        }
        return p + Math.random() * 12;
      });
    }, 120);
    return () => clearInterval(interval);
  }, [appState]);

  useEffect(() => {
    const handleReplay = () => {
      sessionStorage.removeItem('introSeen');
      setAppState('intro');
    };
    window.addEventListener('replay-intro', handleReplay);
    return () => window.removeEventListener('replay-intro', handleReplay);
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem('introSeen', 'true');
    setAppState('main');
  };

  const handleSkipIntro = () => {
    sessionStorage.setItem('introSeen', 'true');
    setAppState('main');
  };

  if (appState === 'loading') {
    return <LoadingScreen progress={loadingProgress} />;
  }

  if (appState === 'intro') {
    return (
      <Suspense fallback={<LoadingScreen progress={100} />}>
        <IntroScene
          onComplete={handleIntroComplete}
          onSkip={handleSkipIntro}
        />
      </Suspense>
    );
  }

  return (
    <>
      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      {/* Persistent 3D wave background - loads immediately */}
      {webGL && !reducedMotion && (
        <div className="canvas-bg">
          <WaveBackground />
        </div>
      )}

      {/* ── App shell ── */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Services />
          <Projects />
          <Timeline />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
