import React from 'react';
import { RotateCcw } from 'lucide-react';
import SocialLinks from '../components/SocialLinks';
import { siteConfig } from '../data/portfolio';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 section-padding pb-10 pt-14" role="contentinfo">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div className="sm:col-span-1">
            <a href="#home" className="font-orbitron font-bold text-2xl text-gradient-cyan tracking-widest block mb-3" aria-label="Back to top">
              RP
            </a>
            <p className="text-white/45 text-sm font-sans leading-relaxed max-w-xs">
              Software Engineer &amp; IoT Specialist building futuristic, scalable solutions from Sri Lanka.
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation" className="sm:col-span-1">
            <h3 className="font-orbitron text-xs tracking-widest text-white/40 uppercase mb-4">Navigation</h3>
            <ul className="space-y-2">
              {['Home', 'About', 'Services', 'Projects', 'Timeline', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-white/50 text-sm font-space hover:text-cyan-DEFAULT transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <div className="sm:col-span-1">
            <h3 className="font-orbitron text-xs tracking-widest text-white/40 uppercase mb-4">Connect</h3>
            <SocialLinks className="flex-col items-start gap-3" size={16} />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs font-space text-center sm:text-left">
            &copy; {year} Rusiru Pramod. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('replay-intro'))}
              className="text-cyan-DEFAULT hover:text-space-950 hover:bg-cyan-DEFAULT text-xs font-orbitron tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 py-1.5 px-3 rounded border border-cyan-DEFAULT/30 hover:border-cyan-DEFAULT shadow-cyan-sm font-semibold"
              title="Watch cinematic intro animation again"
            >
              <RotateCcw size={12} />
              <span>REPLAY INTRO</span>
            </button>
            <p className="text-white/20 text-xs font-orbitron tracking-widest hidden sm:block">
              BUILT WITH REACT + THREE.JS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
