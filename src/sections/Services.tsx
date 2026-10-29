import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Monitor, Cpu, Settings2, Palette, Shield, Cloud, type LucideIcon
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import GlassCard from '../components/GlassCard';
import { services } from '../data/portfolio';

const ICON_MAP: Record<string, LucideIcon> = {
  Monitor, Cpu, Settings2, Palette, Shield, Cloud,
};

const ACCENT_MAP: Record<string, string> = {
  cyan: 'text-cyan-DEFAULT shadow-cyan-sm',
  blue: 'text-hud-blue',
  purple: 'text-hud-purple',
};

export default function Services() {
  return (
    <section id="services" className="relative section-padding" aria-label="Services section">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          tag="// WHAT I DO"
          title="Services"
          subtitle="End-to-end expertise from embedded firmware to cloud-native frontends."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = ICON_MAP[service.icon];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <TiltCard>
                  <GlassCard className="h-full p-7 flex flex-col gap-4 group" hover={false}>
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl glass border-glow flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                      {Icon && (
                        <Icon
                          size={22}
                          className={ACCENT_MAP[service.accent] || 'text-cyan-DEFAULT'}
                        />
                      )}
                    </div>

                    <div>
                      <h3 className="font-orbitron text-base font-semibold text-white mb-2 group-hover:text-cyan-DEFAULT transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-white/55 text-sm font-sans leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Bottom accent line */}
                    <div className="mt-auto pt-4 border-t border-white/5">
                      <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-cyan-DEFAULT to-hud-blue transition-all duration-500 rounded-full" />
                    </div>
                  </GlassCard>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── 3D Tilt wrapper ───────────────────────────────────────────
function TiltCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg)';
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="tilt-card h-full"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
}

