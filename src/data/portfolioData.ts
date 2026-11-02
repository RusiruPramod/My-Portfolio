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
    email: 'rusirupramod@gmail.com',
    phone: '+94 41 22 535 12 | Mobile: 0787970764 / 075 543 7148',
    cvUrl: '/cv.pdf',
    profilePhoto: '/profile.jpg',
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
      url: 'https://twitter.com/RusiruPramod',
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
      url: 'mailto:rusirupramod@gmail.com',
      icon: 'Mail',
      ariaLabel: 'Send an email to Rusiru Pramod',
    },
  ],

  stats: [
    {
      value: 20,
      suffix: '+',
      label: 'Projects Completed',
      sublabel: 'Web, Mobile & Embedded IoT',
    },
    {
      value: 15,
      suffix: '+',
      label: 'Technologies Mastered',
      sublabel: 'Languages, Frameworks & Cloud',
    },
    {
      value: 30,
      suffix: '+',
      label: 'GitHub Repositories',
      sublabel: 'Open Source & Research',
    },
    {
      value: 4,
      suffix: '+',
      label: 'Years of Learning',
      sublabel: 'Engineering & Development',
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
    { name: 'Node.js', level: 88, category: 'backend' },
    { name: 'Express.js', level: 86, category: 'backend' },
    { name: 'Java / C#', level: 82, category: 'backend' },
    { name: 'MySQL / PostgreSQL', level: 85, category: 'backend' },
    { name: 'Firebase / Supabase', level: 82, category: 'backend' },
    // IoT & Embedded
    { name: 'Arduino (C++)', level: 94, category: 'iot-embedded' },
    { name: 'ESP32 / NodeMCU', level: 92, category: 'iot-embedded' },
    { name: 'Sensor Integration', level: 90, category: 'iot-embedded' },
    { name: 'Automation (CNC/PLC)', level: 85, category: 'iot-embedded' },
    // Tools & Cloud
    { name: 'Git & GitHub', level: 90, category: 'tools-cloud' },
    { name: 'Vercel / Cloud Basics', level: 80, category: 'tools-cloud' },
    { name: 'Linux / Command Line', level: 82, category: 'tools-cloud' },
  ],

  services: [
    {
      id: 'web-dev',
      title: 'Web Development',
      description:
        'Full-stack web applications built with React, Next.js, Node.js, and modern cloud infrastructure. Pixel-perfect UI with stellar performance.',
      icon: 'Monitor',
      features: ['React & Next.js', 'Node.js & Express', 'RESTful API Architecture', 'MySQL & Firebase'],
    },
    {
      id: 'iot-systems',
      title: 'IoT Solutions',
      description:
        'End-to-end IoT systems using ESP32, Arduino, MQTT, and cloud platforms. From sensor firmware to real-time dashboards.',
      icon: 'Cpu',
      features: ['ESP32 & Arduino', 'Sensor Integration', 'Smart Automation', 'Hardware Prototyping'],
    },
    {
      id: 'automation-engineering',
      title: 'Industrial Automation',
      description:
        'PLC-based automation systems, SCADA interfaces, and smart machine control for industrial environments.',
      icon: 'Settings2',
      features: ['CNC & PLC Systems', 'SolidWorks CAD', 'Pneumatic Controls', 'Precision Automation'],
    },
    {
      id: 'ui-ux-design',
      title: 'UI/UX Design',
      description:
        'Research-driven design systems, interactive prototypes in Figma, and front-end implementation that delights users.',
      icon: 'Palette',
      features: ['Figma Prototyping', 'Photoshop & Illustrator', 'Responsive Design', 'Interactive Controls'],
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity',
      description:
        'Network security assessments, secure coding practices, vulnerability analysis, and security-hardened architecture.',
      icon: 'Shield',
      features: ['Vulnerability Assessment', 'Secure Coding', 'Access Control', 'Hardened Infrastructure'],
    },
    {
      id: 'cloud-computing',
      title: 'Cloud Computing',
      description:
        'Cloud-native deployments on AWS and GCP, serverless functions, CI/CD pipelines, and scalable infrastructure.',
      icon: 'Cloud',
      features: ['Vercel & AWS Deployments', 'Serverless Functions', 'CI/CD Pipelines', 'Performance Optimization'],
    },
  ],

  projects: [
    {
      id: 'greenhouse-system',
      title: 'IoT Greenhouse System',
      category: 'iot',
      categoryLabel: 'IoT',
      description:
        'Smart greenhouse using ESP32 sensors to monitor temperature, humidity, soil moisture, and light. Real-time MQTT dashboard with automated irrigation control.',
      image: '/projects/project1.jpg',
      techStack: ['ESP32', 'MQTT', 'Node-RED', 'React', 'Firebase'],
      githubUrl: 'https://github.com/RusiruPramod',
      featured: true,
    },
    {
      id: 'attendance-system',
      title: 'Smart Student Attendance System',
      category: 'web',
      categoryLabel: 'Web',
      description:
        'A real-time web application for attendance, scheduling, and data analysis for educational institutions. Built with React.js, Node.js, and Express.js.',
      image: '/projects/project3.jpg',
      techStack: ['React.js', 'HTML/CSS', 'JavaScript', 'Node.js', 'Express.js'],
      githubUrl: 'https://github.com/RusiruPramod',
      featured: true,
    },
    {
      id: 'autonomous-vehicle',
      title: 'Autonomous Vehicle According to Color Light',
      category: 'automation',
      categoryLabel: 'Automation',
      description:
        'Developed an Arduino-based system using color sensors, IR, and RF signals for traffic light detection and action control. Integrated Front Vehicle Detection (FCR) mode for real-time monitoring and safe driving.',
      image: '/projects/project0.jpg',
      techStack: ['Arduino', 'C++', 'Color Sensors', 'IR & RF Signals', 'FCR Mode'],
      githubUrl: 'https://github.com/RusiruPramod',
      featured: false,
    },
    {
      id: 'hotel-booking',
      title: 'Hotel Booking & Management System',
      category: 'web',
      categoryLabel: 'Web',
      description:
        'Developed a React-based hotel booking system featuring responsive UI, attractive customized designs, room reservations, booking management, customer registration, and availability tracking.',
      image: '/projects/project4.jpg',
      techStack: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'REST APIs'],
      githubUrl: 'https://github.com/RusiruPramod',
      featured: false,
    },
    {
      id: 'gym-management',
      title: 'Gym Management System',
      category: 'web',
      categoryLabel: 'Web',
      description:
        'Developed a web-based gym management system featuring QR code scanning and fingerprint authentication for member identification, attendance tracking, membership management, and fitness data analysis.',
      image: '/projects/project2.png',
      techStack: ['React.js', 'Node.js', 'QR Code Scanning', 'Fingerprint Biometrics', 'MySQL'],
      githubUrl: 'https://github.com/RusiruPramod',
      featured: false,
    },
    {
      id: 'winit-auction',
      title: 'WinIt Auction Platform',
      category: 'web',
      categoryLabel: 'Web',
      description:
        'This Auction web application, developed with NetBeans IDE, uses HTML, CSS, JSP, Servlets, and Bootstrap for responsiveness, MySQL for bid data management, and Figma for design prototyping.',
      image: '/projects/project5.jpg',
      techStack: ['JSP', 'Servlets', 'MySQL', 'Bootstrap', 'Figma'],
      githubUrl: 'https://github.com/RusiruPramod',
      featured: false,
    },
  ],

  timeline: [
    {
      id: 'residue-associate',
      year: 'Nov 2025 – May 2026',
      title: 'Associate Software Engineer (Remote)',
      institution: 'Residue Solution (Pvt) Ltd',
      location: 'Remote, Sri Lanka',
      description:
        'Engineering scalable web systems, backend services, cloud integrations, and remote full-stack architecture.',
      type: 'experience',
      badge: 'Software Engineering',
    },
    {
      id: 'residue-intern',
      year: 'May 2025 – Nov 2025',
      title: 'Intern – Full-Stack Software Engineer',
      institution: 'Residue Solution (Pvt) Ltd',
      location: 'Sri Lanka',
      description:
        'Contributed to full-stack web software, REST API development, frontend component architecture, database operations, and testing.',
      type: 'experience',
      badge: 'Internship',
    },
    {
      id: 'freelance-tech',
      year: '2019 – Present',
      title: 'Lead Technical Specialist & Developer',
      institution: 'Freelance Technical Projects',
      location: 'Sri Lanka / Remote',
      description:
        'IoT & electronic project planning & implementation, graphic design & photography (Photoshop), videography & sound editing, automation machine repair (CNC, PLC systems), electrical and electronics.',
      type: 'experience',
      badge: 'Freelance',
    },
    {
      id: 'uwu-degree',
      year: '2022 – 2026 (Expected)',
      title: 'Bachelor of Information and Communication Technology (Honours)',
      institution: 'Faculty of Technological Studies, Uva Wellassa University of Sri Lanka',
      location: 'Badulla, Sri Lanka',
      description:
        'Specializing in Software Development, IoT & Embedded Systems, Database Management, and Automation Engineering.',
      type: 'education',
      badge: 'Degree (Honours)',
    },
    {
      id: 'siddhartha-college',
      year: '2009 – 2020',
      title: 'Secondary Education (A/L — Technology Stream)',
      institution: 'Siddhartha College, Weligama',
      location: 'Weligama, Sri Lanka',
      description:
        'Completed G.C.E. Advanced Level examinations in Technology Stream (SFT, ET, ICT).',
      type: 'education',
      badge: 'A/L Technology',
    },
  ],
};
