export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  ariaLabel: string;
}

export interface SkillItem {
  name: string;
  level: number; // 0 to 100
  icon?: string;
  category: 'frontend' | 'backend' | 'iot-embedded' | 'tools-cloud';
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'all' | 'web' | 'iot' | 'automation';
  categoryLabel: string;
  description: string;
  longDescription?: string;
  image: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  institution: string;
  location: string;
  description: string;
  type: 'education' | 'experience' | 'milestone';
  badge?: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    greeting: string;
    typingRoles: string[];
    bioShort: string;
    bioLong: string[];
    location: string;
    university: string;
    email: string;
    phone?: string;
    cvUrl: string;
    profilePhoto: string;
    aboutPhoto: string;
  };
  socials: SocialLink[];
  stats: StatItem[];
  skills: SkillItem[];
  services: ServiceItem[];
  projects: ProjectItem[];
  timeline: TimelineItem[];
}

