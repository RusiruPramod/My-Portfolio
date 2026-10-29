import React from 'react';
import { cn } from '../utils/cn';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  as?: React.ElementType;
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className,
  hover = true,
  as: Tag = 'div',
  onClick,
}: GlassCardProps) {
  return (
    <Tag
      className={cn(
        'glass rounded-2xl p-6',
        hover && 'glass-hover cursor-default',
        className
      )}
      onClick={onClick}
    >
      {children}
    </Tag>
  );
}

