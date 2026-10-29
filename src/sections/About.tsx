import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import GlassCard from '../components/GlassCard';
import { aboutData, skills, skillCategories } from '../data/portfolio';

// ── Count-up number ───────────────────────────────────────────
function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = to / 40;
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setVal(to); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, 35);
    return () => clearInterval(timer);
  }, [inView, to]);

  return <span ref={ref}>{val}{suffix}</span>;
}

// ── Skill bar ─────────────────────────────────────────────────
function SkillBar({ name, level, inView }: { name: string; level: number; inView: boolean }) {
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <span className="text-sm font-space text-white/80">{name}</span>
        <span className="text-sm font-orbitron text-cyan-DEFAULT">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className="skill-bar-fill h-full rounded-full"
          style={{ width: inView ? `${level}%` : '0%' }}
        />
      </div>
    </div>
  );
}

export default function About() {
  const [activeCategory, setActiveCategory] = useState('All');
  const skillsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(skillsRef, { once: true, margin: '-100px' });
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true });

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="about" className="relative section-padding" aria-label="About section">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          tag="// ABOUT ME"
          title="Who I Am"
          subtitle="A passionate technologist bridging the gap between physical and digital worlds."
        />

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            <GlassCard className="p-8">
              <h3 className="font-orbitron text-xl text-gradient-blue mb-4">
                {aboutData.headline}
              </h3>
              <div className="space-y-4">
                {aboutData.bio.split('\n\n').map((para, i) => (
                  <p key={i} className="text-white/65 font-sans text-sm leading-relaxed">
                    {para.trim()}
                  </p>
                ))}
              </div>
            </GlassCard>

            {/* Stats grid */}
            <div ref={statsRef} className="grid grid-cols-2 gap-4">
              {aboutData.stats.map((stat) => (
                <GlassCard key={stat.label} className="text-center py-6">
                  <div className="font-orbitron text-3xl font-black text-cyan-DEFAULT mb-1 neon-text">
                    {statsInView ? (
                      <CountUp to={stat.value} suffix={stat.suffix} />
                    ) : (
                      `0${stat.suffix}`
                    )}
                  </div>
                  <p className="text-white/50 text-xs font-space">{stat.label}</p>
                </GlassCard>
              ))}
            </div>
          </motion.div>

          {/* Right: skills */}
          <motion.div
            ref={skillsRef}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            {/* Category filter */}
            <div className="flex flex-wrap gap-2">
              {skillCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-orbitron tracking-widest transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-cyan-DEFAULT text-space-900 shadow-cyan-sm'
                      : 'glass border-glow text-white/60 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <GlassCard className="p-6">
              <div className="space-y-4">
                {filteredSkills.map((skill) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    inView={inView}
                  />
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

