import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { useActiveSection } from '../hooks/useActiveSection';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = useActiveSection();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    if (mobileOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [mobileOpen]);

  // Close on route change
  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass shadow-lg py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={() => handleNavClick('#home')}
            className="font-orbitron font-bold text-lg text-gradient-cyan tracking-widest hover:opacity-90 transition-opacity"
            aria-label="Rusiru Pramod — Home"
          >
            RP
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(({ label, href }) => {
              const id = href.replace('#', '');
              const isActive = active === id;
              return (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                    className={`relative px-4 py-2 text-sm font-space font-medium tracking-wide transition-colors duration-200 rounded-lg ${
                      isActive
                        ? 'text-cyan-DEFAULT'
                        : 'text-white/70 hover:text-white'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {label}
                    {isActive && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-cyan-DEFAULT rounded-full shadow-cyan-sm" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* CTA */}
          <a
            href="/cv.pdf"
            download
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-space font-semibold text-space-900 bg-cyan-DEFAULT hover:bg-cyan-bright transition-colors duration-200 shadow-cyan-sm"
            aria-label="Download CV"
          >
            Download CV
          </a>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-white/80 hover:text-cyan-DEFAULT transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`fixed inset-x-0 top-0 z-40 mobile-menu-bg transition-all duration-400 md:hidden ${
          mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="pt-20 pb-8 px-6 flex flex-col gap-2">
          {NAV_ITEMS.map(({ label, href }) => {
            const id = href.replace('#', '');
            const isActive = active === id;
            return (
              <a
                key={href}
                href={href}
                onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                className={`py-3 px-4 rounded-lg font-space font-medium text-lg transition-colors ${
                  isActive
                    ? 'text-cyan-DEFAULT glass border-glow'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {label}
              </a>
            );
          })}
          <a
            href="/cv.pdf"
            download
            className="mt-4 py-3 px-4 rounded-lg text-center font-space font-semibold text-space-900 bg-cyan-DEFAULT"
          >
            Download CV
          </a>
        </div>
      </div>
    </>
  );
}

