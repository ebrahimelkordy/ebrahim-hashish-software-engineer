export interface ProjectData {
  id: string;
  slug: string;
  codeName: string;
  title: string;
  tagline: string;
  summary: string;
  description: string[];
  techStack: { category: string; items: string[] }[];
  features: string[];
  screenshots: { src: string; caption: string }[];
  liveUrl?: string;
  repoUrl?: string;
  status: string;
  year: string;
}

export const projects: ProjectData[] = [
  {
    id: "mock-nibras",
    slug: "nibras",
    codeName: "PRJ_NIBRAS",
    title: "NIBRAS_LMS_ENTERPRISE",
    tagline: "Enterprise Learning Management System",
    summary:
      "A premium, scalable Learning Management System featuring real-time Zoom integration, automated certificate generation, and an advanced Parent & Student dashboard. Monolithic Node/Next architecture.",
    description: [
      "Nibras is a full-featured enterprise LMS built from the ground up to serve educational institutions at scale. The platform supports multi-role access (Admin, Teacher, Parent, Student) with granular permission controls.",
      "The system features real-time virtual classrooms via Zoom SDK integration, automated cloud recording, and a robust notification pipeline. Students receive automatic certificates upon course completion, generated server-side as PDFs.",
      "The admin dashboard provides deep analytics into student engagement, course completion rates, and revenue tracking. The entire backend is powered by a Node.js/Express monolith with Prisma ORM connected to a PostgreSQL database.",
    ],
    techStack: [
      { category: "Frontend", items: ["Next.js 15", "React 19", "Tailwind CSS", "Framer Motion"] },
      { category: "Backend", items: ["Node.js", "Express.js", "Prisma ORM", "REST API"] },
      { category: "Database", items: ["PostgreSQL", "Redis (Caching)"] },
      { category: "Services", items: ["Zoom SDK", "Cloudinary", "Resend Email", "Vercel"] },
    ],
    features: [
      "Multi-role authentication (Admin, Teacher, Parent, Student)",
      "Real-time Zoom virtual classrooms with cloud recording",
      "Automated PDF certificate generation on course completion",
      "Parent dashboard for monitoring children's progress",
      "Admin analytics: engagement, revenue, and completion metrics",
      "Course content management with video/document uploads",
    ],
    screenshots: [
      { src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop", caption: "Dashboard Overview" },
      { src: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2574&auto=format&fit=crop", caption: "Course Management" },
    ],
    liveUrl: "https://nibras.vercel.app",
    repoUrl: "https://github.com/ibrahimhashish/nibras",
    status: "DEPLOYED",
    year: "2025-2026",
  },
  {
    id: "mock-soccer",
    slug: "soccer-street",
    codeName: "PRJ_SOCCER",
    title: "SOCCER_STREET",
    tagline: "Premium Multi-Vendor Sports E-Commerce",
    summary:
      "Premium multi-vendor sports e-commerce platform. Features dynamic inventory synchronization and aggressive high-conversion UI.",
    description: [
      "Soccer Street is a multi-vendor e-commerce platform specialized in sports apparel and equipment. The system supports multiple sellers with independent inventory, unified cart experience, and real-time stock synchronization.",
      "The frontend is built with React and Vite for maximum performance, featuring a custom product filtering engine, wishlist system, and a multi-step checkout flow with Stripe integration.",
      "The Node.js/Express backend handles vendor management, order processing, and a notification system for stock alerts. Deployed on Vercel with serverless functions for API routes.",
    ],
    techStack: [
      { category: "Frontend", items: ["React.js", "Vite", "Tailwind CSS", "Redux Toolkit"] },
      { category: "Backend", items: ["Node.js", "Express.js", "Mongoose ODM"] },
      { category: "Database", items: ["MongoDB Atlas"] },
      { category: "Services", items: ["Stripe Payments", "Cloudinary", "Vercel"] },
    ],
    features: [
      "Multi-vendor marketplace with independent inventories",
      "Real-time stock synchronization across vendors",
      "Advanced product filtering and search engine",
      "Wishlist and cart persistence",
      "Multi-step checkout with Stripe integration",
      "Admin panel for vendor & order management",
    ],
    screenshots: [
      { src: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=2574&auto=format&fit=crop", caption: "Product Catalog" },
      { src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=2651&auto=format&fit=crop", caption: "Checkout Flow" },
    ],
    liveUrl: "https://soccer-street.vercel.app",
    repoUrl: "https://github.com/ibrahimhashish/soccer-street",
    status: "DEPLOYED",
    year: "2025",
  },
  {
    id: "mock-zaad",
    slug: "zaad",
    codeName: "PRJ_ZAAD",
    title: "ZAAD_LMS",
    tagline: "Specialized Educational Platform",
    summary:
      "Specialized scalable educational system designed to maximize course delivery efficiency. 10x better UX focused on student retention.",
    description: [
      "Zaad is a streamlined LMS designed with a laser focus on student retention and learning outcomes. The interface prioritizes content consumption with minimal distractions.",
      "Features include adaptive learning paths, progress tracking with milestone notifications, and integrated assessment tools with automatic grading.",
      "Built with a modern full-stack architecture using Next.js for server-rendered pages and a Node.js API layer backed by PostgreSQL through Prisma.",
    ],
    techStack: [
      { category: "Frontend", items: ["Next.js", "React", "Tailwind CSS"] },
      { category: "Backend", items: ["Node.js", "Express.js", "Prisma ORM"] },
      { category: "Database", items: ["PostgreSQL"] },
      { category: "Services", items: ["Vercel", "Resend"] },
    ],
    features: [
      "Adaptive learning paths based on student performance",
      "Progress tracking with milestone notifications",
      "Integrated assessments with auto-grading",
      "Instructor dashboard with engagement analytics",
      "Mobile-first responsive design",
    ],
    screenshots: [
      { src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2670&auto=format&fit=crop", caption: "Student Dashboard" },
    ],
    status: "DEPLOYED",
    year: "2025",
  },
  {
    id: "mock-moatasem",
    slug: "al-moatasem",
    codeName: "PRJ_MOATASEM",
    title: "AL_MOATASEM",
    tagline: "Corporate Digital Presence",
    summary:
      "Corporate digital presence interface. Optimized for extreme performance metrics and SEO visibility.",
    description: [
      "Al Moatasem is a corporate website built for maximum SEO impact and blazing-fast load times. The project prioritizes Core Web Vitals with a perfect Lighthouse score.",
      "The site features a modern, responsive design with smooth scroll animations, an interactive services section, and a contact system with email notifications.",
      "Built as a static Next.js export for CDN deployment, ensuring sub-second load times globally.",
    ],
    techStack: [
      { category: "Frontend", items: ["Next.js (SSG)", "React", "Tailwind CSS", "Framer Motion"] },
      { category: "Services", items: ["Vercel Edge", "Google Analytics", "Resend"] },
    ],
    features: [
      "Perfect Lighthouse performance score (100/100)",
      "SEO-optimized with structured data and meta tags",
      "Smooth scroll animations and micro-interactions",
      "Contact form with email notification pipeline",
      "Fully static export for CDN edge deployment",
    ],
    screenshots: [
      { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop", caption: "Landing Page" },
    ],
    status: "ACTIVE_NODE",
    year: "2024",
  },
];
