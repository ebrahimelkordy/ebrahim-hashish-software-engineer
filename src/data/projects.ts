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
  isPinned?: boolean;
  order?: number;
}

export const projects: ProjectData[] = [
  {
    id: "mock-nibras",
    slug: "nibras-lms-enterprise",
    codeName: "PROJ_NIBRAS",
    title: "Nibras LMS",
    tagline: "Enterprise-Grade Multi-Tenant Learning Management System",
    summary: "A high-performance educational platform designed for large-scale institutions with real-time capabilities.",
    description: [
      "Architected a scalable multi-tenant system using Next.js 14 and Node.js.",
      "Integrated Bull and Redis for asynchronous job processing and system stability.",
      "Implemented real-time classroom interactions using Socket.IO."
    ],
    techStack: [
      { "category": "Backend", "items": ["Node.js", "Express", "MongoDB", "Socket.IO", "Bull/Redis"] },
      { "category": "Frontend", "items": ["Next.js 14", "TypeScript", "Tailwind CSS"] }
    ],
    features: ["Multi-tenancy Support", "Real-time Notifications", "Heavy File Upload Handling", "Detailed Analytics Dashboard"],
    screenshots: [
      { "src": "/projects/nibras-main.jpg", "caption": "LMS Student Portal" },
      { "src": "/projects/nibras-admin.jpg", "caption": "Institutional Dashboard" }
    ],
    liveUrl: "https://nibras-lms.com",
    repoUrl: "",
    status: "DEPLOYED",
    year: "2026",
    isPinned: true,
    order: 0
  },
  {
    id: "mock-zaad",
    slug: "zaad-ecommerce-platform",
    codeName: "PROJ_ZAAD",
    title: "Zaad E-Commerce",
    tagline: "Production-Ready Full-Stack Commerce Engine",
    summary: "A complete e-commerce solution featuring secure payments, inventory management, and high-speed performance.",
    description: [
      "Built a seamless shopping experience with end-to-end payment integration via Stripe.",
      "Optimized database queries and session management using Redis caching.",
      "Engineered a robust vendor-side management system for full product control."
    ],
    techStack: [
      { "category": "Backend", "items": ["Node.js", "Mongoose", "Stripe API", "Redis"] },
      { "category": "Frontend", "items": ["React.js", "Zustand", "Tailwind"] }
    ],
    features: ["Secure Stripe Payments", "Real-time Inventory Tracking", "Advanced Search & Filtering", "Automated Email Invoicing"],
    screenshots: [
      { "src": "/projects/zaad-store.jpg", "caption": "Storefront Interface" }
    ],
    liveUrl: "https://zaad-store.com",
    repoUrl: "",
    status: "DEPLOYED",
    year: "2026",
    isPinned: true,
    order: 1
  },
  {
    id: "mock-soccer",
    slug: "soccer-street-backend-refactor",
    codeName: "PROJ_SOCCER",
    title: "Soccer Street Backend",
    tagline: "Architectural Refactoring & Tournament Management",
    summary: "Full overhaul of a legacy backend into a modern layered architecture with strict security standards.",
    description: [
      "Transformed a monolithic server into a clean Controller-Service-Model architecture.",
      "Engineered a sophisticated RBAC system with SuperAdmin, Admin, and Client roles.",
      "Developed a custom automated auditing suite covering 20+ critical edge cases."
    ],
    techStack: [
      { "category": "Backend", "items": ["Node.js", "Express", "JWT", "Bcrypt"] },
      { "category": "Audit & DevOps", "items": ["Custom Audit Scripts", "Morgan", "Helmet", "Docker"] }
    ],
    features: ["Granular Role-Based Access Control", "Automated Security Auditing", "Tournament & Team Lifecycle Management", "Cloud Data Migration"],
    screenshots: [
      { "src": "/projects/soccer-api.jpg", "caption": "API Documentation & Architecture" }
    ],
    liveUrl: "",
    repoUrl: "",
    status: "COMPLETED",
    year: "2026",
    isPinned: true,
    order: 2
  }
];
