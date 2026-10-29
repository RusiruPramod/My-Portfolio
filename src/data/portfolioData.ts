import { PortfolioData } from '../types';

export const portfolioData: PortfolioData = {
  personal: {
    name: 'Rusiru Pramod',
    greeting: "Hello, it's me",
    typingRoles: [
      'Software Engineer',
      'IoT Specialist',
      'Full-Stack Developer',
      'Open To Work',
    ],
    bioShort:
      'Innovative, results-driven Software and IoT Specialist with a strong passion for critical thinking and creativity. Expertise in software development, full-stack development, cybersecurity, IoT systems, industrial automation, UI/UX design, and cloud computing.',
    bioLong: [
      "I'm Rusiru Pramod Ranasinghe — Tech Enthusiast, Software Engineer, and IoT Specialist based in Colombo, Western Province, Sri Lanka.",
      'Currently pursuing my undergraduate degree at Uva Wellassa University of Sri Lanka, I specialize in architecting resilient software systems, connected IoT devices, and intuitive user experiences.',
      'With a disciplined balance between theoretical foundations and hands-on hardware/software engineering, I build secure, scalable solutions spanning smart agriculture, industrial telemetry, modern web architectures, and cloud platforms.',
    ],
    location: 'Colombo, Western Province, Sri Lanka',
    university: 'Uva Wellassa University of Sri Lanka',
    email: 'rusirupramod99@gmail.com',
    cvUrl: '/cv.pdf',
    profilePhoto: '/img/photo.jpg',
    aboutPhoto: '/img/photo1.jpg',
  },

  socials: [
    {
      name: 'GitHub',
      url: 'https://github.com/RusiruPramod',
      icon: 'Github',
      ariaLabel: 'Visit Rusiru Pramod GitHub profile',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/rusiru-pramod',
      icon: 'Linkedin',
      ariaLabel: 'Connect with Rusiru Pramod on LinkedIn',
    },
    {
      name: 'Twitter / X',
      url: 'https://twitter.com/rusiru_pramod',
      icon: 'Twitter',
      ariaLabel: 'Follow Rusiru Pramod on Twitter/X',
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/rusiru_pramod',
      icon: 'Instagram',
      ariaLabel: 'Follow Rusiru Pramod on Instagram',
    },
    {
      name: 'Facebook',
      url: 'https://facebook.com/rusiru.pramod',
      icon: 'Facebook',
      ariaLabel: 'Connect with Rusiru Pramod on Facebook',
    },
    {
      name: 'Email',
      url: 'mailto:rusirupramod99@gmail.com',
      icon: 'Mail',
      ariaLabel: 'Send an email to Rusiru Pramod',
    },
  ],

  stats: [
    {
      value: 15,
      suffix: '+',
      label: 'Projects Completed',
      sublabel: 'Web, Mobile & Embedded IoT',
    },
    {
      value: 50,
      suffix: 'k+',
      label: 'Lines of Code',
      sublabel: 'Clean, Tested & Documented',
    },
    {
      value: 10,
      suffix: '+',
      label: 'IoT Hardware Nodes',
      sublabel: 'Sensors, ESP32, PLC & MQTT',
    },
    {
      value: 100,
      suffix: '%',
      label: 'Commitment to Quality',
      sublabel: 'Performance & Security Driven',
    },
  ],

  skills: [
    // Frontend
    { name: 'React.js', level: 92, category: 'frontend' },
    { name: 'TypeScript', level: 88, category: 'frontend' },
    { name: 'Tailwind CSS', level: 94, category: 'frontend' },
    { name: 'HTML5 / Modern JS', level: 95, category: 'frontend' },
    { name: 'UI / UX (Figma)', level: 85, category: 'frontend' },

    // Backend
    { name: 'Node.js & Express', level: 89, category: 'backend' },
    { name: 'Python', level: 86, category: 'backend' },
    { name: 'REST APIs & GraphQL', level: 88, category: 'backend' },
    { name: 'MySQL / PostgreSQL', level: 84, category: 'backend' },
    { name: 'Firebase & Supabase', level: 90, category: 'backend' },

    // IoT & Embedded
    { name: 'Arduino / ESP32', level: 93, category: 'iot-embedded' },
    { name: 'C / C++', level: 87, category: 'iot-embedded' },
    { name: 'MQTT / Telemetry', level: 91, category: 'iot-embedded' },
    { name: 'Industrial PLC Automation', level: 82, category: 'iot-embedded' },
    { name: 'Sensors & Actuators', level: 90, category: 'iot-embedded' },

    // Tools & Cloud
    { name: 'Git & GitHub', level: 92, category: 'tools-cloud' },
    { name: 'Linux / Shell Scripting', level: 86, category: 'tools-cloud' },
    { name: 'Cloud Computing (AWS / Vercel)', level: 84, category: 'tools-cloud' },
    { name: 'Cybersecurity Fundamentals', level: 82, category: 'tools-cloud' },
    { name: 'Docker / Containers', level: 78, category: 'tools-cloud' },
  ],

  services: [
    {
      id: 'web-dev',
      title: 'Web & Full-Stack Development',
      description:
        'Architecting reactive, ultra-fast, responsive web applications utilizing React, TypeScript, modern CSS, and performant backend APIs.',
      icon: 'Code',
      features: [
        'Single Page & Multi-Page Web Apps',
        'Interactive 3D / WebGL Integration',
        'State Management & Optimistic UI',
        'Full REST & Realtime Data Streams',
      ],
    },
    {
      id: 'iot-solutions',
      title: 'IoT & Smart Hardware Solutions',
      description:
        'End-to-end telemetry systems linking sensors, microcontrollers (ESP32/Arduino), and wireless protocols to real-time cloud dashboards.',
      icon: 'Cpu',
      features: [
        'MQTT & WebSocket Live Telemetry',
        'Smart Agriculture & Climate Monitoring',
        'Remote Device Control Systems',
        'Low-Power Microcontroller Firmware',
      ],
    },
    {
      id: 'automation',
      title: 'Industrial Automation',
      description:
        'Robust industrial PLC logic, smart machinery monitoring, relay control, and deterministic sensor arrays for manufacturing environments.',
      icon: 'Cog',
      features: [
        'PLC-Based Control Pipelines',
        'Industrial Sensor Interfacing',
        'Real-time Machine Health Monitoring',
        'Safety & Automated Relay Triggers',
      ],
    },
    {
      id: 'ui-ux',
      title: 'UI/UX & Creative Engineering',
      description:
        'Transforming conceptual workflows into pixel-perfect, accessible, and futuristic visual interfaces with high aesthetic fidelity.',
      icon: 'Palette',
      features: [
        'Design Systems & Wireframing in Figma',
        'Cyberpunk & Space-Tech Visual Themes',
        'Fluid Micro-interactions & Physics',
        'WCAG AA Accessibility Compliance',
      ],
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity & Hardening',
      description:
        'Security auditing, data encryption, role-based access controls, and defense against OWASP top vulnerabilities in web and IoT topologies.',
      icon: 'Shield',
      features: [
        'Payload Validation & Sanitization',
        'Secure MQTT & SSL/TLS Telemetry',
        'Auth & JWT Session Architecture',
        'Vulnerability Assessments',
      ],
    },
    {
      id: 'cloud',
      title: 'Cloud & DevOps Infrastructure',
      description:
        'Deploying scalable distributed microservices, serverless functions, database hosting, and continuous deployment pipelines.',
      icon: 'Cloud',
      features: [
        'Vercel & AWS Cloud Deployments',
        'CI/CD Pipeline Automation',
        'Serverless Functions & Edge Routing',
        'Database Optimization & Caching',
      ],
    },
  ],

  projects: [
    {
      id: 'industrial-automation',
      title: 'Industrial Automation Solutions',
      category: 'automation',
      categoryLabel: 'Automation & Robotics',
      description:
        'PLC-based automation architecture for precision machinery control, real-time telemetry, and automated industrial failsafe mechanisms.',
      longDescription:
        'Engineered an industrial-grade machine control system integrating Programmable Logic Controllers (PLCs), high-speed optical and inductive sensor inputs, and pneumatic actuators. Designed with a custom supervisory control dashboard for instantaneous operator alerts, downtime analytics, and remote override capabilities.',
      image: '/img/project0.jpg',
      techStack: ['PLC', 'C/C++', 'Sensors', 'Relay Logic', 'Industrial IoT'],
      githubUrl: 'https://github.com/RusiruPramod',
      liveUrl: 'https://github.com/RusiruPramod',
      featured: true,
    },
    {
      id: 'iot-greenhouse',
      title: 'IoT Smart Greenhouse System',
      category: 'iot',
      categoryLabel: 'IoT & Telemetry',
      description:
        'Autonomous microclimate regulation system using soil moisture, DHT sensors, and automated irrigation relays to optimize crop yield.',
      longDescription:
        'A full-loop closed agricultural IoT station powered by ESP32 microcontrollers. Continually measures ambient temperature, humidity, luminosity, and soil moisture levels. Implements MQTT telemetry forwarding to a cloud console, triggering automated water valves and ventilation blinds based on predictive threshold heuristics.',
      image: '/img/project1.jpg',
      techStack: ['ESP32', 'Arduino', 'MQTT', 'C++', 'Firebase', 'IoT Sensors'],
      githubUrl: 'https://github.com/RusiruPramod',
      liveUrl: 'https://github.com/RusiruPramod',
      featured: true,
    },
    {
      id: 'fitness-tracker',
      title: 'CyberPulse Fitness Application',
      category: 'web',
      categoryLabel: 'Mobile & Web App',
      description:
        'Feature-rich fitness tracking application with customized workout regimes, real-time calorie calculation, and progress telemetry.',
      longDescription:
        'Crafted a high-performance fitness telemetry app that allows users to monitor biometric trends, schedule personalized multi-split training regimens, and visualize strength progress curves over time with fluid glassmorphic charts and real-time synchronization.',
      image: '/img/project2.png',
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Chart.js', 'Firebase'],
      githubUrl: 'https://github.com/RusiruPramod',
      liveUrl: 'https://rusirupramod.github.io/My-Portfolio/',
      featured: true,
    },
    {
      id: 'student-attendance',
      title: 'Smart Attendance System',
      category: 'web',
      categoryLabel: 'Web Platform',
      description:
        'Real-time student attendance tracking and institutional analytics platform engineered with React.js and Firebase Cloud Firestore.',
      longDescription:
        'A digital campus attendance management system providing instant student check-ins, automated absentee alerts, teacher roster dashboards, and exportable administrative audit logs with encrypted identity verification.',
      image: '/img/project3.jpg',
      techStack: ['React.js', 'Firebase', 'Cloud Firestore', 'Tailwind CSS', 'REST API'],
      githubUrl: 'https://github.com/RusiruPramod',
      liveUrl: 'https://github.com/RusiruPramod',
      featured: false,
    },
    {
      id: 'community-management',
      title: 'Community Management Hub',
      category: 'web',
      categoryLabel: 'Web Platform',
      description:
        'Collaborative digital platform for neighborhood and organization event planning, communication streams, and community polling.',
      longDescription:
        'Facilitates structured community engagement through announcement broadcasts, interactive voting polls, shared facility reservation calendars, and direct resident discussion channels with role-based moderation privileges.',
      image: '/img/project4.jpg',
      techStack: ['React.js', 'Node.js', 'Firebase Auth', 'CSS3', 'Realtime DB'],
      githubUrl: 'https://github.com/RusiruPramod',
      liveUrl: 'https://github.com/RusiruPramod',
      featured: false,
    },
    {
      id: 'winit-auction',
      title: 'WinIt Real-Time Auction System',
      category: 'web',
      categoryLabel: 'Full-Stack Platform',
      description:
        'Full-scale online bidding and auction management portal with live countdown timers, transaction validation, and bid history.',
      longDescription:
        'Built a complete e-auction marketplace architecture featuring concurrent bidding protection, automated winning bid reconciliation, user account escrow verification, and relational database schema optimizations in MySQL.',
      image: '/img/project5.jpg',
      techStack: ['Java / JSP', 'MySQL', 'JavaScript', 'HTML5', 'Bootstrap'],
      githubUrl: 'https://github.com/RusiruPramod',
      liveUrl: 'https://github.com/RusiruPramod',
      featured: false,
    },
  ],

  timeline: [
    {
      id: 'edu-uwu',
      year: '2022 - Present',
      title: 'Undergraduate in Science & Technology',
      institution: 'Uva Wellassa University of Sri Lanka',
      location: 'Badulla / Colombo, Sri Lanka',
      description:
        'Focusing on Software Engineering, Embedded Systems, IoT Topologies, Industrial Electronics, Data Structures, and Cloud Computing.',
      type: 'education',
      badge: 'Academic Distinction',
    },
    {
      id: 'milestone-iot',
      year: '2023 - 2024',
      title: 'IoT & Telemetry Systems Engineer',
      institution: 'Research & Autonomous Projects',
      location: 'Sri Lanka',
      description:
        'Designed and deployed automated climate-controlled greenhouse prototypes, sensor arrays, and wireless MQTT brokers for remote telemetric data collection.',
      type: 'experience',
      badge: 'Hardware & IoT',
    },
    {
      id: 'milestone-web',
      year: '2024 - 2025',
      title: 'Full-Stack & Creative Frontend Developer',
      institution: 'Freelance & Open Source',
      location: 'Remote',
      description:
        'Architecting modern reactive web applications, interactive 3D WebGL interfaces, REST APIs, and digital platforms with emphasis on speed and sleek UX.',
      type: 'experience',
      badge: 'Full-Stack Web',
    },
    {
      id: 'milestone-cyber',
      year: '2025 - Present',
      title: 'Cybersecurity & Industrial Automation Initiatives',
      institution: 'Innovation Lab',
      location: 'Sri Lanka',
      description:
        'Researching PLC network defenses, encrypted telemetry protocols, containerized microservices, and high-reliability machine controls.',
      type: 'milestone',
      badge: 'Cyber & Automation',
    },
  ],
};

