import { ProjectData } from "./projects";

export const mockPortfolioData = {
  hero: {
    title: "IBRAHIM\nCODE\nHASHISH",
    subtitle: "Full-Stack Software Engineering",
    description: "Full-Stack Software Engineer building mission-critical web applications. Specializing in high-performance Node.js backends and pixel-perfect Next.js architectures.",
    imageUrl: "/profile.jpg"
  },
  about: {
    bio: "Building end-to-end web architectures. Specializing in high-performance Node.js REST APIs, database design, and aggressive, state-of-the-art Next.js React frontends. Delivering production-ready products that perform perfectly under load.",
    role: "FULL_STACK"
  },
  skills: [
    { category: "Backend", items: ['Node.js', 'Express.js', 'Nest.js', 'REST APIs', 'GraphQL', 'WebSockets', 'Next.js App Router'] },
    { category: "Frontend", items: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux', 'Zustand', 'Framer Motion', 'HTML/CSS'] },
    { category: "Storage / DB", items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Prisma ORM', 'Mongoose', 'Redis', 'Supabase'] },
    { category: "DevOps / Tools", items: ['Git & GitHub', 'Docker', 'Vercel', 'AWS S3', 'Postman', 'Linux CLI', 'CI/CD Pipelines'] }
  ],
  experiences: [
    {
      id: "exp_1",
      title: "Full Stack Developer",
      company: "Freelance / Remote",
      period: "2023 - PRESENT",
      description: "Architecting and delivering complete web solutions including LMS platforms (Nibras, Zaad) and E-commerce applications (Soccer Street). Focus on scalable Node.js microservices and highly responsive Next.js interfaces.",
      order: 0
    }
  ],
  studies: [
    {
      id: "edu_1",
      degree: "Bachelor of Computer Science",
      institution: "Your University Name Here",
      year: "GRADUATION: 2024",
      description: "Extensive study of core algorithms, data structures, and software engineering principles. Completed graduation project \"System X\" with excellence.",
      order: 0
    }
  ],
  posts: [
    {
      id: "post_1",
      date: "2026.04.18",
      title: "MODERN UI ARCHITECTURE: THE POWER OF CINEMATIC DESIGN",
      excerpt: "Exploring the psychological impact of aggressive, high-contrast dark modes in modern web applications. Why developers are moving away from sterile corporate design towards monolithic, cinematic interfaces.",
      readTime: "5 MIN READ",
      tags: ["UI/UX", "FRONTEND", "DESIGN"],
      order: 0
    },
    {
      id: "post_2",
      date: "2026.03.12",
      title: "STATE MANAGEMENT IN NEXT.JS 15: BEYOND REDUX",
      excerpt: "An analysis of the modern state. How Zustand, Jotai, and native React Server Components are eliminating the need for bulky global state containers in enterprise applications.",
      readTime: "8 MIN READ",
      tags: ["REACT", "NEXT.JS", "ARCHITECTURE"],
      order: 1
    },
    {
      id: "post_3",
      date: "2026.01.05",
      title: "BUILDING RESILIENT APIs WITH NODE & PRISMA",
      excerpt: "A deep dive into database connection pooling, query optimization, and error handling for high-throughput Node.js microservices. Techniques for scaling beyond 10k requests per second.",
      readTime: "12 MIN READ",
      tags: ["BACKEND", "NODE.JS", "DATABASES"],
      order: 2
    }
  ],
  contact: {
    email: "hello@ibrahimhashish.com",
    github: "https://github.com/ibrahimhashish",
    linkedin: "https://linkedin.com/in/ibrahimhashish"
  }
};
