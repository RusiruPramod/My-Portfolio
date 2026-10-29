import React from 'react';
import {
  Github,
  Linkedin,
  Facebook,
  Instagram,
  Twitter,
  Mail,
  type LucideIcon,
} from 'lucide-react';
import { socialLinks, siteConfig } from '../data/portfolio';

const ICON_MAP: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
};

interface SocialLinksProps {
  showEmail?: boolean;
  size?: number;
  className?: string;
}

export default function SocialLinks({
  showEmail = true,
  size = 20,
  className = '',
}: SocialLinksProps) {
  const allLinks = [
    ...socialLinks,
    ...(showEmail
      ? [{ label: 'Email', icon: 'mail', url: `mailto:${siteConfig.email}` }]
      : []),
  ];

  return (
    <div className={`flex items-center gap-3 flex-wrap ${className}`}>
      {allLinks.map(({ label, icon, url }) => {
        const Icon = icon === 'mail' ? Mail : ICON_MAP[icon];
        if (!Icon) return null;
        return (
          <a
            key={label}
            href={url}
            target={url.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            aria-label={label}
            className="social-icon w-10 h-10 flex items-center justify-center rounded-xl glass border-glow text-white/70 hover:text-cyan-DEFAULT"
          >
            <Icon size={size} />
          </a>
        );
      })}
    </div>
  );
}

