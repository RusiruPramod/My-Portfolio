// ============================================================
// PORTFOLIO DATA — edit this file to update all content!
// ============================================================

export const siteConfig = {
  name: 'Rusiru Pramod',
  title: 'Software Engineer & IoT Specialist',
  url: 'https://rusirupramod.github.io/My-Portfolio/',
  description:
    'Innovative, results-driven Software and IoT Specialist with expertise in full-stack development, cybersecurity, IoT systems, industrial automation, UI/UX design, and cloud computing.',
  email: 'rusirupramod@gmail.com',
  cvUrl: '/cv.pdf',
  profileImage: '/profile.jpg',
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
  { name: 'React / Next.js', level: 88, category: 'Frontend' },
  { name: 'TypeScript', level: 82, category: 'Frontend' },
  { name: 'Tailwind CSS / UI/UX', level: 90, category: 'Frontend' },
  // Backend
  { name: 'Node.js / Express', level: 80, category: 'Backend' },
  { name: 'Python / Django', level: 78, category: 'Backend' },
  { name: 'Firebase / Supabase', level: 75, category: 'Backend' },
  // Embedded / IoT
  { name: 'Arduino / ESP32', level: 92, category: 'IoT' },
  { name: 'C / C++', level: 85, category: 'IoT' },
  { name: 'MQTT / Node-RED', level: 80, category: 'IoT' },
  // Cloud / Security
  { name: 'AWS / GCP Basics', level: 65, category: 'Cloud' },
  { name: 'Cybersecurity', level: 72, category: 'Cloud' },
  { name: 'Linux / Bash', level: 78, category: 'Cloud' },
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
      'Real-time attendance tracking web app with facial recognition integration. Built with React.js, Firebase, and a Node.js backend.',
    tech: ['React', 'Firebase', 'Node.js', 'Face API'],
    category: 'Web',
    github: 'https://github.com/RusiruPramod',
    live: '',
    image: '/projects/project3.jpg',
    featured: true,
  },
  {
    id: 3,
    title: 'Industrial Automation Solutions',
    description:
      'PLC-based automation system for smart machines with SCADA dashboard, real-time monitoring, and predictive maintenance alerts.',
    tech: ['PLC', 'SCADA', 'C++', 'Modbus', 'HMI'],
    category: 'Automation',
    github: 'https://github.com/RusiruPramod',
    live: '',
    image: '/projects/project0.jpg',
    featured: false,
  },
  {
    id: 4,
    title: 'Fitness Tracking App',
    description:
      'Mobile-first fitness application with workout plans, exercise tracking, progress charts, and nutritional guidance powered by a custom Node.js API.',
    tech: ['React Native', 'Node.js', 'MongoDB', 'Chart.js'],
    category: 'Mobile',
    github: 'https://github.com/RusiruPramod',
    live: '',
    image: '/projects/project2.jpg',
    featured: false,
  },
  {
    id: 5,
    title: 'Community Management System',
    description:
      'Full-featured community platform for event planning, member communication, and resource allocation. Built with React.js and Firebase.',
    tech: ['React', 'Firebase', 'Tailwind', 'Firestore'],
    category: 'Web',
    github: 'https://github.com/RusiruPramod',
    live: '',
    image: '/projects/project4.jpg',
    featured: false,
  },
  {
    id: 6,
    title: 'WinIt Auction Platform',
    description:
      'Full auction system with live bidding, user authentication, payment integration, and admin dashboard. Developed with HTML, JSP, and MySQL.',
    tech: ['JSP', 'MySQL', 'HTML/CSS', 'JavaScript'],
    category: 'Web',
    github: 'https://github.com/RusiruPramod',
    live: '',
    image: '/projects/project5.jpg',
    featured: false,
  },
];

export const projectCategories = ['All', 'Web', 'IoT', 'Mobile', 'Automation'];

export const timeline = [
  {
    type: 'education',
    year: '2021 – Present',
    title: 'BSc in Industrial Information Technology',
    org: 'Uva Wellassa University of Sri Lanka',
    location: 'Badulla, Sri Lanka',
    description:
      'Specializing in software engineering, IoT systems, industrial automation, and cybersecurity. Active member of the IEEE Student Branch and Tech Club.',
    icon: 'GraduationCap',
  },
  {
    type: 'education',
    year: '2009 – 2020',
    title: 'Secondary Education (A/L — Physical Science)',
    org: 'Nalanda College, Colombo',
    location: 'Colombo, Sri Lanka',
    description:
      'Completed Advanced Level examinations in Combined Mathematics, Physics, and ICT. School IT Club vice-president.',
    icon: 'BookOpen',
  },
  {
    type: 'experience',
    year: '2024',
    title: 'IoT Systems Developer (Intern)',
    org: 'Tech Startup — Sri Lanka',
    location: 'Remote',
    description:
      'Developed ESP32-based sensor nodes and MQTT pipelines. Built real-time monitoring dashboards with React and Firebase.',
    icon: 'Cpu',
  },
  {
    type: 'experience',
    year: '2023',
    title: 'Full-Stack Web Developer (Freelance)',
    org: 'Multiple Clients',
    location: 'Remote',
    description:
      'Delivered 5+ client projects including e-commerce sites, management systems, and landing pages using React, Node.js, and Firebase.',
    icon: 'Code2',
  },
];
