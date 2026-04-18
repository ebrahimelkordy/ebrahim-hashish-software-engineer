import { GroupedSkills } from "@/lib/data-fetching";

export const mockPortfolioData = {
  hero: {
    firstName: "EBRAHIM",
    lastName: "HASHISH",
    title: "EBRAHIM\nCODE\nHASHISH",
    subtitle: "Full-Stack Identity Initiated",
    description: "Software Engineer specializing in building high-performance MERN stack applications, architecting scalable systems, and transforming legacy codebases into modern modular structures.",
    imageUrl: "/profile.jpg"
  },
  about: {
    firstName: "EBRAHIM",
    lastName: "HASHISH",
    bio: "A dedicated Full-Stack Developer with a deep focus on Backend Architecture and User Experience. I specialize in the MERN stack, crafting enterprise-grade solutions like multi-tenant LMS platforms and production-ready e-commerce engines. My philosophy revolves around clean code, robust security (RBAC), and high-efficiency system design.",
    role: "FULL_STACK Software Engineer",
    imageUrl: "/about-portrait.jpg" 
  },
  skills: [
    { category: "Backend", items: [
      { id: 'b1', name: 'Node.js' }, 
      { id: 'b2', name: 'Express.js' }, 
      { id: 'b3', name: 'Nest.js' },
      { id: 'b4', name: 'Socket.IO' },
      { id: 'b5', name: 'Stripe / Payment Integration' }
    ]},
    { category: "Frontend", items: [
      { id: 'f1', name: 'Next.js 14' }, 
      { id: 'f2', name: 'React.js' }, 
      { id: 'f3', name: 'TypeScript' }, 
      { id: 'f4', name: 'Tailwind CSS' }
    ]},
    { category: "Storage / DB", items: [
      { id: 's1', name: 'MongoDB / Mongoose' }, 
      { id: 's2', name: 'Redis / Bull Queues' }, 
      { id: 's3', name: 'PostgreSQL / Prisma' }
    ]},
    { category: "DevOps / Tools", items: [
      { id: 'd1', name: 'Docker' }, 
      { id: 'd2', name: 'Git / GitHub' }
    ]}
  ] as unknown as GroupedSkills,
  experiences: [
    {
      title: "Full-Stack Freelance Developer",
      company: "Self-Employed",
      period: "2024 - PRESENT",
      description: "Leading the development of complex web applications for international clients, focusing on MERN stack efficiency, database optimization, and secure API design.",
      order: 0
    }
  ],
  studies: [
    {
      degree: "Bachelor of Usul Al-Din (Student)",
      institution: "Al-Azhar University",
      year: "In Progress",
      description: "Developing deep analytical and philosophical skills while simultaneously mastering modern software engineering through intensive self-study and professional projects.",
      imageUrl: "/edu-azhar.png",
      order: 0
    }
  ],
  certificates: [
    {
      title: "Frontend React Developer",
      issuer: "IT Sharks",
      date: "2026.04",
      imageUrl: "/certs/it-sharks-react.jpg",
      order: 0
    },
    {
      title: "Node.js Professional Developer",
      issuer: "Self-Paced / Advanced Engineering",
      date: "In Progress",
      imageUrl: "/certs/node-cert.jpg",
      order: 1
    }
  ],
  posts: [
    {
      id: "p1",
      title: "Why Layered Architecture is a Must for Node.js Applications",
      excerpt: "Diving into the benefits of separating Controllers, Services, and Models for cleaner code.",
      date: "2026.04.18",
      readTime: "6 MIN READ",
      tags: ["BACKEND", "ARCHITECTURE"],
      isPinned: true,
      order: 0
    }
  ],
  contact: {
    email: "ebrahimkordy0@gmail.com",
    github: "https://github.com/ebrahimelkordy",
    linkedin: "https://linkedin.com/in/ebrahim-hashish",
    whatsapp: "+201060899732"
  }
};
