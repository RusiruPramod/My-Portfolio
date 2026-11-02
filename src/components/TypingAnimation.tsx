import React, { useEffect, useState, useRef } from 'react';
import { typingStrings } from '../data/portfolio';

interface TypingAnimationProps {
  className?: string;
}

/**
 * Bulletproof Typing Animation:
 * Uses a single timer loop with internal refs so re-renders (from hover, scroll, etc.)
 * NEVER cancel the timer or freeze the text.
 */
export default function TypingAnimation({ className = '' }: TypingAnimationProps) {
  const [displayed, setDisplayed] = useState('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let strIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let isMounted = true;

    const tick = () => {
      if (!isMounted) return;
      const currentStr = typingStrings[strIdx] || '';

      if (!isDeleting) {
        if (charIdx < currentStr.length) {
          charIdx++;
          setDisplayed(currentStr.slice(0, charIdx));
          timeoutRef.current = setTimeout(tick, 75);
        } else {
          // Finished typing word, pause before deleting
          timeoutRef.current = setTimeout(() => {
            isDeleting = true;
            tick();
          }, 1800);
        }
      } else {
        if (charIdx > 0) {
          charIdx--;
          setDisplayed(currentStr.slice(0, charIdx));
          timeoutRef.current = setTimeout(tick, 40);
        } else {
          // Finished deleting, move to next string
          isDeleting = false;
          strIdx = (strIdx + 1) % typingStrings.length;
          timeoutRef.current = setTimeout(tick, 300);
        }
      }
    };

    timeoutRef.current = setTimeout(tick, 150);

    return () => {
      isMounted = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <span className={className} aria-live="polite">
      {displayed}
      <span className="typing-cursor" aria-hidden="true" />
    </span>
  );
}
