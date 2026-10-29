// useActiveSection — tracks which section is in viewport for navbar highlight
import { useState, useEffect, useCallback } from 'react';

const SECTIONS = ['home', 'about', 'services', 'projects', 'timeline', 'contact'];

export function useActiveSection(): string {
  const [active, setActive] = useState('home');

  const onScroll = useCallback(() => {
    const scrollY = window.scrollY + 100;
    let current = 'home';
    for (const id of SECTIONS) {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) {
        current = id;
      }
    }
    setActive(current);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  return active;
}

