import React from 'react';
import { cn } from '../utils/cn';

interface SectionHeadingProps {
  tag?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}

export default function SectionHeading({
  tag,
  title,
  subtitle,
  center = true,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('mb-14', center && 'text-center', className)}>
      {tag && (
        <span className="inline-block font-orbitron text-xs tracking-[0.3em] text-cyan-DEFAULT uppercase mb-3 opacity-80">
          {tag}
        </span>
      )}
      <h2 className="font-orbitron text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient-cyan leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-white/55 font-space text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      {/* Decorative line */}
      <div className={cn('mt-5 flex gap-1.5', center && 'justify-center')}>
        <div className="h-0.5 w-12 bg-cyan-DEFAULT rounded-full shadow-cyan-sm" />
        <div className="h-0.5 w-4 bg-hud-blue rounded-full" />
        <div className="h-0.5 w-2 bg-hud-purple rounded-full" />
      </div>
    </div>
  );
}

