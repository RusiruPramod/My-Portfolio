// useFPSMonitor — detects low-end devices by measuring FPS
import { useState, useEffect, useRef } from 'react';

type Quality = 'high' | 'medium' | 'low';

export function useFPSMonitor(): Quality {
  const [quality, setQuality] = useState<Quality>(() => {
    // Pre-classify by hardware concurrency
    const cores = navigator.hardwareConcurrency ?? 4;
    if (cores <= 2) return 'low';
    if (cores <= 4) return 'medium';
    return 'high';
  });

  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const rafId = useRef<number>(0);
  const settled = useRef(false);

  useEffect(() => {
    if (settled.current) return;

    const measure = (now: number) => {
      frameCount.current++;
      const elapsed = now - lastTime.current;
      if (elapsed >= 2000) {
        const fps = (frameCount.current / elapsed) * 1000;
        settled.current = true;
        cancelAnimationFrame(rafId.current);
        if (fps < 20) setQuality('low');
        else if (fps < 40) setQuality('medium');
        else setQuality('high');
        return;
      }
      rafId.current = requestAnimationFrame(measure);
    };

    rafId.current = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  return quality;
}

