import React, { Suspense, useState, useEffect, lazy, Component, ErrorInfo, ReactNode } from 'react';
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

// ── Error Boundary to prevent 3D WebGL crashes from breaking the UI ────────
interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class SafeErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn('Recovered from 3D/Canvas rendering issue:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default function App() {
  const reducedMotion = useReducedMotion();
  const webGL = useWebGL();

  // Session-based intro: show once per session; bypass directly if no WebGL or reduced motion
  const hasSeenIntro =
    reducedMotion || !webGL || sessionStorage.getItem('introSeen') === 'true';

  const [appState, setAppState] = useState<AppState>(
    hasSeenIntro ? 'main' : 'loading'
  );

  const [loadingProgress, setLoadingProgress] = useState(0);

  // Eagerly preload critical profile image during initial boot
  useEffect(() => {
    const img = new Image();
    img.src = '/profile.jpg';
  }, []);

  // Asset loading progress: Smooth 3-second sci-fi loading sequence
  useEffect(() => {
    if (appState !== 'loading') return;

    // Safety watchdog timer: Never stuck on loading
    const failsafeTimer = setTimeout(() => {
      setAppState('intro');
    }, 3800);

    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        // Average ~2.2% per 65ms tick => ~2.7s to reach 100%
        const increment = Math.random() * 1.8 + 1.4;
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(interval);
          clearTimeout(failsafeTimer);
          // Hold at 100% for 350ms so user clearly sees completed 100% (~3s total)
          setTimeout(() => setAppState('intro'), 350);
          return 100;
        }
        return next;
      });
    }, 65);

    return () => {
      clearInterval(interval);
      clearTimeout(failsafeTimer);
    };
  }, [appState]);

  useEffect(() => {
    const handleReplay = () => {
      sessionStorage.removeItem('introSeen');
      if (webGL && !reducedMotion) {
        setAppState('intro');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('replay-intro', handleReplay);
    return () => window.removeEventListener('replay-intro', handleReplay);
  }, [webGL, reducedMotion]);

  const handleIntroComplete = () => {
    sessionStorage.setItem('introSeen', 'true');
    setAppState('main');
  };

  const handleSkipIntro = () => {
    sessionStorage.setItem('introSeen', 'true');
    setAppState('main');
  };

  return (
    <>
      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      {/* Persistent 3D wave background - starts rendering immediately on initial page boot */}
      {webGL && !reducedMotion && (
        <SafeErrorBoundary fallback={null}>
          <div className="canvas-bg">
            <WaveBackground />
          </div>
        </SafeErrorBoundary>
      )}

      {/* Loading Screen Overlay */}
      {appState === 'loading' && (
        <LoadingScreen progress={loadingProgress} />
      )}

      {/* Cinematic 3D Intro Scene Overlay */}
      {appState === 'intro' && (
        <SafeErrorBoundary fallback={null}>
          <Suspense fallback={<LoadingScreen progress={100} />}>
            <IntroScene
              onComplete={handleIntroComplete}
              onSkip={handleSkipIntro}
            />
          </Suspense>
        </SafeErrorBoundary>
      )}

      {/* ── Main App Shell ── */}
      <div className={`relative z-10 transition-opacity duration-500 ${appState === 'main' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
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
