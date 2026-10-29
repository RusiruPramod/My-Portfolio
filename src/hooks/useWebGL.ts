// useWebGL — checks if WebGL is supported
import { useMemo } from 'react';

export function useWebGL(): boolean {
  return useMemo(() => {
    try {
      const canvas = document.createElement('canvas');
      return !!(
        canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl')
      );
    } catch {
      return false;
    }
  }, []);
}

