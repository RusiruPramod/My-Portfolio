import React, { useEffect, useRef, useState } from 'react';
import { typingStrings } from '../data/portfolio';

interface TypingAnimationProps {
  className?: string;
}

export default function TypingAnimation({ className = '' }: TypingAnimationProps) {
  const [displayed, setDisplayed] = useState('');
  const [strIndex, setStrIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const current = typingStrings[strIndex];

    const tick = () => {
      if (!deleting) {
        // Typing
        if (charIndex < current.length) {
          setDisplayed(current.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
          timeoutRef.current = setTimeout(tick, 80);
        } else {
          // Pause, then delete
          timeoutRef.current = setTimeout(() => setDeleting(true), 1800);
        }
      } else {
        // Deleting
        if (charIndex > 0) {
          setDisplayed(current.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
          timeoutRef.current = setTimeout(tick, 45);
        } else {
          setDeleting(false);
          setStrIndex((s) => (s + 1) % typingStrings.length);
          timeoutRef.current = setTimeout(tick, 300);
        }
      }
    };

    timeoutRef.current = setTimeout(tick, 100);
    return () => clearTimeout(timeoutRef.current);
  }, [charIndex, deleting, strIndex]);

  return (
    <span className={className} aria-live="polite" aria-label={`I am a ${displayed}`}>
      {displayed}
      <span className="typing-cursor" aria-hidden="true" />
    </span>
  );
}

