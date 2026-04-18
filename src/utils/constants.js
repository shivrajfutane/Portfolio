export const PERSONAL_DETAILS = {
  name: "Shivraj Futane",
  title: "Full Stack | Cyber Security",
  tagline: "I build things for the web",
  email: "mr.shivrajfutane@gmail.com",
  github: "https://github.com/shivrajfutane",
  linkedin: "https://www.linkedin.com/in/shivrajfutane/",
  resume: "https://drive.google.com/file/d/1C6gJdpToM4te9QoEhRaw7Apr8kbxUKgo/view?usp=sharing", // Add your resume link here (e.g., Google Drive link or /resume.pdf)
  profileImage: "/imgs/profile.jpeg", // Add your profile image path here
  funFact: "I Just Vibecoded Spotify Clone In 1hr",
  stats: {
    projects: 4,
    experience: 3,
    coffees: 4
  }
};

export const CONTACT_CONFIG = {
  web3FormsAccessKey: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "" // Get your free key at https://web3forms.com/
};

export const SKILLS = {
  frontend: [
    { name: "React", level: 10 },
    { name: "Three.js", level: 8 },
    { name: "Tailwind CSS", level: 85 },
    { name: "Next.js", level: 35 },
    { name: "Gsap", level: 24 },
    { name: "Anime JS", level: 13 }
  ],
  backend: [
    { name: "Node.js", level: 70 },
    { name: "Python", level: 85 },
    { name: "MongoDB", level: 80 }
  ],
  tools: [
    { name: "Docker", level: 85 },
    { name: "Git", level: 80 },
    { name: "Figma", level: 70 },
    { name: "Canva", level: 90 },
    { name: "Linux", level: 85 }
  ]
};

export const PROJECTS = [
  {
    id: 1,
    title: "LuxeVoyage",
    description: "An AI-powered trip planning application that helps users create personalized travel itineraries based on their interests and preferences.",
    tech: ["React", "Node.js", "MongoDB", "Grok API"],
    category: "Fullstack",
    github: "https://github.com/shivrajfutane/LuxeVoyage",
    live: "https://luxevoyageaiplanner.vercel.app/",
    image: "imgs/luxevoyage.png" // Add your project screenshot here
  },
  {
    id: 2,
    title: "Expense Tracker",
    description: "A comprehensive expense tracking application that helps users manage their personal finances and track their spending habits.",
    tech: ["React", "Node.js", "MongoDB"],
    category: "Fullstack",
    github: "https://github.com/shivrajfutane/ExpenseTracker",
    live: "https://expenseplannerai.vercel.app/",
    image: "imgs/quickbill.png"
  },
  {
    id: 3,
    title: "SoundWave",
    description: "Music Streaming Platform",
    tech: ["Next.js", "Jamendo", "Prisma", "PostgreSQL"],
    category: "Backend",
    github: "https://github.com/shivrajfutane/SoundWave",
    live: "https://soundwaveai.vercel.app/",
    image: "imgs/soundwave.png"
  },
  {
    id: 4,
    title: "AniTrackt",
    description: "Anime Tracking Platform",
    tech: ["Next.js", "Jikan API", ""],
    category: "Backend",
    github: "https://github.com/shivrajfutane/AniTrack",
    live: "https://anitrackai.vercel.app/",
    image: "imgs/anitrack.png"
  }
];

export const CERTIFICATES = [
  {
    id: 1,
    title: " Cyber Security Course",
    issuer: "Daksh Gurukul IIT Ghuwati",
    date: "2025",
    image: "/imgs/Screenshot 2026-04-04 003147.png"
  },
  {
    id: 2,
    title: " HackVerse",
    issuer: "TechnoRex",
    date: "2025",
    image: "/imgs/Screenshot 2026-04-04 003127.png"
  },
  {
    id: 3,
    title: "Git Github",
    issuer: "Lets Upgrade",
    date: "2025",
    image: "/imgs/Screenshot 2026-04-04 003505.png"
  },
  {
    id: 4,
    title: " Figma",
    issuer: "Lets Upgrade",
    date: "2025",
    image: "/imgs/Screenshot 2026-04-04 003059.png"
  }
];
