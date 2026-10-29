import React from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap, BookOpen, Cpu, Code2, Briefcase, type LucideIcon
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import GlassCard from '../components/GlassCard';
import { timeline } from '../data/portfolio';

const ICON_MAP: Record<string, LucideIcon> = {
  GraduationCap, BookOpen, Cpu, Code2, Briefcase,
};

export default function Timeline() {
  return (
    <section id="timeline" className="relative section-padding" aria-label="Experience and education timeline">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          tag="// MY JOURNEY"
          title="Experience & Education"
          subtitle="The milestones that shaped my engineering mindset."
        />

        <div className="relative">
          {/* Vertical timeline line */}
          <div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px timeline-line -translate-x-0.5"
            aria-hidden="true"
          />

          <div className="space-y-10">
            {timeline.map((item, i) => {
              const Icon = ICON_MAP[item.icon] || Briefcase;
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className={`relative flex items-start gap-6 pl-12 md:pl-0 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 w-8 h-8 -translate-x-0 md:-translate-x-4 rounded-full glass border-glow-strong flex items-center justify-center shadow-cyan-md z-10">
                    <Icon size={14} className="text-cyan-DEFAULT" />
                  </div>

                  {/* Card */}
                  <div className={`w-full md:w-5/12 ${isLeft ? 'md:pr-8' : 'md:pl-8'}`}>
                    <GlassCard className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <span
                          className={`text-xs font-orbitron tracking-widest px-2 py-0.5 rounded ${
                            item.type === 'education'
                              ? 'text-cyan-DEFAULT bg-cyan-DEFAULT/10'
                              : 'text-hud-purple bg-hud-purple/10'
                          }`}
                        >
                          {item.type === 'education' ? 'EDUCATION' : 'EXPERIENCE'}
                        </span>
                        <span className="text-xs font-orbitron text-white/40">{item.year}</span>
                      </div>

                      <h3 className="font-orbitron text-sm font-semibold text-white mb-1">
                        {item.title}
                      </h3>
                      <p className="text-cyan-DEFAULT text-xs font-space mb-1">{item.org}</p>
                      <p className="text-white/40 text-xs font-space mb-3">{item.location}</p>
                      <p className="text-white/55 text-xs font-sans leading-relaxed">
                        {item.description}
                      </p>
                    </GlassCard>
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block md:w-5/12" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

