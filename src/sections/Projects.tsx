import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import GlassCard from '../components/GlassCard';
import { projects, projectCategories } from '../data/portfolio';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="relative section-padding" aria-label="Projects section">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          tag="// MY WORK"
          title="Featured Projects"
          subtitle="A selection of projects spanning web, IoT, automation, and mobile."
        />

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-orbitron tracking-wider transition-all duration-200 ${
                activeFilter === cat
                  ? 'bg-cyan-DEFAULT text-space-900 shadow-cyan-md'
                  : 'glass border-glow text-white/60 hover:text-cyan-DEFAULT'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Project card ──────────────────────────────────────────────
function ProjectCard({ project }: { project: typeof projects[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = 'none';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="project-card group h-full"
    >
      <GlassCard className="h-full p-0 overflow-hidden flex flex-col" hover={false}>
        {/* Image */}
        <div className="relative h-44 overflow-hidden bg-space-800">
          <img
            src={project.image}
            alt={project.title}
            width={400}
            height={176}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://placehold.co/400x176/020617/00e5ff?text=${encodeURIComponent(project.title)}`;
            }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-space-900/80 to-transparent" />
          
          {/* Category badge */}
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-orbitron tracking-wider bg-cyan-DEFAULT/20 border border-cyan-DEFAULT/30 text-cyan-DEFAULT backdrop-blur-sm">
            {project.category}
          </span>

          {/* Featured star */}
          {project.featured && (
            <span className="absolute top-3 right-3 text-xs font-orbitron text-hud-amber">★ Featured</span>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-3 flex-1">
          <h3 className="font-orbitron text-sm font-semibold text-white group-hover:text-cyan-DEFAULT transition-colors">
            {project.title}
          </h3>
          <p className="text-white/55 text-xs font-sans leading-relaxed flex-1">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded text-xs font-orbitron tracking-wide bg-white/5 border border-white/10 text-white/60"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-3 pt-2 border-t border-white/5">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} GitHub repository`}
                className="flex items-center gap-1.5 text-xs text-white/50 hover:text-cyan-DEFAULT transition-colors font-space"
              >
                <Github size={13} /> Code
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live demo`}
                className="flex items-center gap-1.5 text-xs text-white/50 hover:text-cyan-DEFAULT transition-colors font-space"
              >
                <ExternalLink size={13} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

