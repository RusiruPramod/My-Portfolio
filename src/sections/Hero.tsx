import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowDown } from 'lucide-react';
import TypingAnimation from '../components/TypingAnimation';
import SocialLinks from '../components/SocialLinks';
import { siteConfig } from '../data/portfolio';

export default function Hero() {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden section-padding"
      aria-label="Hero section"
    >
      {/* HUD Grid overlay */}
      <div className="absolute inset-0 hud-grid opacity-30 pointer-events-none" aria-hidden="true" />

      {/* Corner HUD decorations */}
      <HudCorners />

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-6 items-center pt-20">
        {/* Text side */}
        <motion.div
          className="flex flex-col gap-6 text-center lg:text-left order-2 lg:order-1"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Status badge */}
          <motion.div
            className="inline-flex items-center gap-2 self-center lg:self-start px-3 py-1.5 glass border-glow rounded-full text-xs font-orbitron tracking-widest text-cyan-DEFAULT"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="w-2 h-2 rounded-full bg-cyan-DEFAULT animate-pulse-slow shadow-cyan-sm" />
            AVAILABLE FOR WORK
          </motion.div>

          <div>
            <p className="font-space text-white/60 text-lg mb-1">Hello, it&apos;s me</p>
            <h1 className="font-orbitron text-5xl sm:text-6xl lg:text-7xl font-black text-gradient-cyan leading-tight tracking-tight">
              Rusiru<br />Pramod
            </h1>
          </div>

          <div className="font-space text-xl sm:text-2xl text-white/80">
            <span className="text-white/50">I am a </span>
            <TypingAnimation className="text-cyan-DEFAULT font-semibold" />
          </div>

          <p className="text-white/55 font-sans text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
            Innovative Software & IoT Specialist passionate about building
            futuristic, scalable solutions — from full-stack web apps to
            embedded systems and beyond.
          </p>

          {/* CTA buttons */}
          <div className="flex items-center gap-4 flex-wrap justify-center lg:justify-start">
            <a
              href={siteConfig.cvUrl}
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-space font-semibold text-space-900 bg-cyan-DEFAULT hover:bg-cyan-bright transition-all duration-200 shadow-cyan-md hover:shadow-cyan-lg hover:-translate-y-0.5 active:translate-y-0 btn-glow"
              aria-label="Download CV"
            >
              <Download size={17} />
              Download CV
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-space font-semibold text-cyan-DEFAULT glass border-glow hover:border-cyan-DEFAULT/60 transition-all duration-200 hover:-translate-y-0.5"
            >
              Get In Touch
            </a>
          </div>

          {/* Social links */}
          <SocialLinks className="justify-center lg:justify-start" />
        </motion.div>

        {/* Profile image side */}
        <motion.div
          className="flex justify-center lg:justify-end order-1 lg:order-2"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
        >
          <div className="relative">
            {/* Outer glow ring */}
            <div className="absolute -inset-4 rounded-full bg-cyan-DEFAULT/10 animate-pulse-slow" />
            <div className="absolute -inset-1 rounded-full border border-cyan-DEFAULT/30" />

            {/* Rotating orbit decoration */}
            <div className="absolute inset-0 rounded-full border border-dashed border-cyan-DEFAULT/20 animate-spin-slow" style={{ borderRadius: '47%' }} />

            {/* Profile image container */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-glow-strong shadow-cyan-lg">
              <img
                src={siteConfig.profileImage}
                alt="Rusiru Pramod — Software Engineer and IoT Specialist"
                width={320}
                height={320}
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
              />
              {/* Holographic overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-space-900/40 via-transparent to-cyan-DEFAULT/5" />
            </div>

            {/* HUD stat badges */}
            <HudBadge label="Software Eng." value="4+ yrs" className="-left-8 top-1/4" />
            <HudBadge label="IoT Projects" value="20+" className="-right-4 bottom-1/4" />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 hover:text-cyan-DEFAULT transition-colors"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        aria-label="Scroll to about section"
      >
        <span className="text-xs font-orbitron tracking-widest">SCROLL</span>
        <ArrowDown size={16} />
      </motion.button>
    </section>
  );
}

// ── HUD corner decorations ────────────────────────────────────
function HudCorners() {
  return (
    <div aria-hidden="true">
      {(['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'] as const).map(
        (pos, i) => (
          <div key={i} className={`absolute ${pos} w-16 h-16 pointer-events-none opacity-40`}>
            <div className={`absolute ${i % 2 === 0 ? 'left-4' : 'right-4'} ${i < 2 ? 'top-4' : 'bottom-4'} w-6 h-6 border-cyan-DEFAULT/40 ${i % 2 === 0 ? 'border-l' : 'border-r'} ${i < 2 ? 'border-t' : 'border-b'}`} />
          </div>
        )
      )}
    </div>
  );
}

// ── Floating HUD badge ────────────────────────────────────────
function HudBadge({ label, value, className }: { label: string; value: string; className: string }) {
  return (
    <div className={`absolute glass border-glow rounded-xl px-3 py-2 ${className}`}>
      <p className="text-white/50 text-xs font-space">{label}</p>
      <p className="text-cyan-DEFAULT font-orbitron text-sm font-bold">{value}</p>
    </div>
  );
}
