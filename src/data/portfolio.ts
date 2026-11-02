// ============================================================
// PORTFOLIO DATA — Rusiru Pramod
// ============================================================

export const siteConfig = {
  name: 'Rusiru Pramod',
  title: 'Software Engineer & IoT Specialist',
  url: 'https://rusirupramod.github.io/My-Portfolio/',
  description:
    'Innovative, results-driven Software and IoT Specialist with expertise in full-stack development, cybersecurity, IoT systems, industrial automation, UI/UX design, and cloud computing.',
  email: 'rusirupramod@gmail.com',
  phone: '+94 41 22 535 12',
  mobile: '0787970764 | 075 543 7148',
  mobileFormatted: '+94 78 797 0764 / +94 75 543 7148',
  cvUrl: '/cv.pdf',
  profileImage: '/profile.jpg',
  degree: 'Bachelor of Information and Communication Technology (Honours)',
  university: 'Uva Wellassa University of Sri Lanka',
};

export const socialLinks = [
  {
    label: 'GitHub',
    icon: 'github',
    url: 'https://github.com/RusiruPramod',
  },
  {
    label: 'LinkedIn',
    icon: 'linkedin',
    url: 'https://linkedin.com/in/rusiru-pramod',
  },
  {
    label: 'Facebook',
    icon: 'facebook',
    url: 'https://facebook.com/rusiru.pramod',
  },
  {
    label: 'Instagram',
    icon: 'instagram',
    url: 'https://instagram.com/rusiru_pramod',
  },
  {
    label: 'Twitter',
    icon: 'twitter',
    url: 'https://twitter.com/RusiruPramod',
  },
];

export const typingStrings = [
  'Software Engineer',
  'IoT Specialist',
  'Full-Stack Developer',
  'Open To Work',
];

export const aboutData = {
  headline: 'Tech Enthusiast & Innovator',
  bio: `I'm Rusiru Pramod Ranasinghe — an innovative and results-driven Software and IoT Specialist 
  based in Colombo, Sri Lanka. Currently pursuing my undergraduate degree at Uva Wellassa University, 
  I'm passionate about bridging the gap between physical and digital worlds through cutting-edge technology.
  
  With deep expertise in full-stack development, cybersecurity, IoT systems, and industrial automation, 
  I continuously explore emerging technologies to deliver high-quality, secure, and scalable solutions. 
  My approach blends theoretical knowledge with hands-on engineering to create meaningful, lasting outcomes.`,
  stats: [
    { label: 'Projects Completed', value: 20, suffix: '+' },
    { label: 'Technologies Mastered', value: 15, suffix: '+' },
    { label: 'GitHub Repos', value: 30, suffix: '+' },
    { label: 'Years of Learning', value: 4, suffix: '+' },
  ],
};

export const skills = [
  // Frontend
  { name: 'React / Next.js', level: 90, category: 'Frontend' },
  { name: 'TypeScript / JavaScript', level: 88, category: 'Frontend' },
  { name: 'Tailwind CSS / UI/UX', level: 92, category: 'Frontend' },
  // Backend
  { name: 'Node.js / Express', level: 88, category: 'Backend' },
  { name: 'Java / C#', level: 82, category: 'Backend' },
  { name: 'Firebase / Supabase / MySQL', level: 85, category: 'Backend' },
  // Embedded / IoT
  { name: 'Arduino / ESP32', level: 94, category: 'IoT' },
  { name: 'C / C++', level: 88, category: 'IoT' },
  { name: 'Sensor Integration & Automation', level: 90, category: 'IoT' },
  // Cloud / Tools
  { name: 'AWS / Vercel Basics', level: 75, category: 'Cloud' },
  { name: 'Cybersecurity', level: 72, category: 'Cloud' },
  { name: 'Git / GitHub', level: 90, category: 'Cloud' },
];

export const skillCategories = ['All', 'Frontend', 'Backend', 'IoT', 'Cloud'];

export const services = [
  {
    icon: 'Monitor',
    title: 'Web Development',
    description:
      'Full-stack web applications built with React, Next.js, Node.js, and modern cloud infrastructure. Pixel-perfect UI with stellar performance.',
    accent: 'cyan',
  },
  {
    icon: 'Cpu',
    title: 'IoT Solutions',
    description:
      'End-to-end IoT systems using ESP32, Arduino, MQTT, and cloud platforms. From sensor firmware to real-time dashboards.',
    accent: 'blue',
  },
  {
    icon: 'Settings2',
    title: 'Industrial Automation',
    description:
      'PLC-based automation systems, SCADA interfaces, and smart machine control for industrial environments.',
    accent: 'purple',
  },
  {
    icon: 'Palette',
    title: 'UI/UX Design',
    description:
      'Research-driven design systems, interactive prototypes in Figma, and front-end implementation that delights users.',
    accent: 'cyan',
  },
  {
    icon: 'Shield',
    title: 'Cybersecurity',
    description:
      'Network security assessments, secure coding practices, vulnerability analysis, and security-hardened architecture.',
    accent: 'blue',
  },
  {
    icon: 'Cloud',
    title: 'Cloud Computing',
    description:
      'Cloud-native deployments on AWS and GCP, serverless functions, CI/CD pipelines, and scalable infrastructure.',
    accent: 'purple',
  },
];

export const projects = [
  {
    id: 1,
    title: 'IoT Greenhouse System',
    description:
      'Smart greenhouse using ESP32 sensors to monitor temperature, humidity, soil moisture, and light. Real-time MQTT dashboard with automated irrigation control.',
    tech: ['ESP32', 'MQTT', 'Node-RED', 'React', 'Firebase'],
    category: 'IoT',
    github: 'https://github.com/RusiruPramod',
    live: '',
    image: '/projects/project1.jpg',
    featured: true,
  },
  {
    id: 2,
    title: 'Smart Student Attendance System',
    description:
      'A real-time web application for attendance, scheduling, and data analysis for educational institutions. Built with React.js, Node.js, and Express.js.',
    tech: ['React.js', 'Node.js', 'Express.js', 'JavaScript', 'HTML5/CSS3'],
    category: 'Web',
    github: 'https://github.com/RusiruPramod',
    live: '',
    image: '/projects/project3.jpg',
    featured: true,
  },
  {
    id: 3,
    title: 'Autonomous Vehicle According to Color Light',
    description:
      'Developed an Arduino-based system using color sensors, IR, and RF signals for traffic light detection and action control. Integrated Front Vehicle Detection (FCR) mode for real-time monitoring and safe driving.',
    tech: ['Arduino', 'C++', 'Color Sensors', 'IR & RF Signals', 'FCR Mode'],
    category: 'Automation',
    github: 'https://github.com/RusiruPramod',
    live: '',
    image: '/projects/project0.jpg',
    featured: false,
  },
  {
    id: 4,
    title: 'Hotel Booking & Management System',
    description:
      'Developed a React-based hotel booking system featuring responsive UI, attractive customized designs, room reservations, booking management, customer registration, and availability tracking.',
    tech: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'REST APIs'],
    category: 'Web',
    github: 'https://github.com/RusiruPramod',
    live: '',
    image: '/projects/project4.jpg',
    featured: false,
  },
  {
    id: 5,
    title: 'Gym Management System',
    description:
      'Developed a web-based gym management system featuring QR code scanning and fingerprint authentication for member identification, attendance tracking, membership management, and fitness data analysis.',
    tech: ['React.js', 'Node.js', 'QR Code Scanning', 'Fingerprint Biometrics', 'MySQL'],
    category: 'Web',
    github: 'https://github.com/RusiruPramod',
    live: '',
    image: '/projects/project2.png',
    featured: false,
  },
  {
    id: 6,
    title: 'WinIt Auction Platform',
    description:
      'This Auction web application, developed with NetBeans IDE, uses HTML, CSS, JSP, Servlets, and Bootstrap for responsiveness, MySQL for bid data management, and Figma for design prototyping.',
    tech: ['JSP', 'Servlets', 'MySQL', 'Bootstrap', 'Figma'],
    category: 'Web',
    github: 'https://github.com/RusiruPramod',
    live: '',
    image: '/projects/project5.jpg',
    featured: false,
  },
];

export const projectCategories = ['All', 'Web', 'IoT', 'Automation'];

export const timeline = [
  {
    type: 'experience',
    year: 'Nov 2025 – May 2026',
    title: 'Associate Software Engineer (Remote)',
    org: 'Residue Solution (Pvt) Ltd',
    location: 'Remote, Sri Lanka',
    description:
      'Engineering scalable web systems, backend services, cloud integrations, and remote full-stack architecture.',
    icon: 'Briefcase',
  },
  {
    type: 'experience',
    year: 'May 2025 – Nov 2025',
    title: 'Intern – Full-Stack Software Engineer',
    org: 'Residue Solution (Pvt) Ltd',
    location: 'Sri Lanka',
    description:
      'Contributed to full-stack web software, REST API development, frontend component architecture, database operations, and testing.',
    icon: 'Code2',
  },
  {
    type: 'experience',
    year: '2019 – Present',
    title: 'Lead Technical Specialist & Developer',
    org: 'Freelance Technical Projects',
    location: 'Sri Lanka / Remote',
    description:
      'IoT & electronic project planning & implementation, graphic design & photography (Photoshop), videography & sound editing, automation machine repair (CNC, PLC systems), electrical and electronics.',
    icon: 'Cpu',
  },
  {
    type: 'education',
    year: '2022 – 2026 (Expected)',
    title: 'Bachelor of Information and Communication Technology (Honours)',
    org: 'Faculty of Technological Studies, Uva Wellassa University of Sri Lanka',
    location: 'Badulla, Sri Lanka',
    description:
      'Specializing in Software Development, IoT & Embedded Systems, Database Management, and Automation Engineering.',
    icon: 'GraduationCap',
  },
  {
    type: 'education',
    year: '2009 – 2020',
    title: 'Secondary Education (A/L — Technology Stream)',
    org: 'Siddhartha College, Weligama',
    location: 'Weligama, Sri Lanka',
    description:
      'Completed G.C.E. Advanced Level examinations in Technology Stream (SFT, ET, ICT).',
    icon: 'BookOpen',
  },
];
