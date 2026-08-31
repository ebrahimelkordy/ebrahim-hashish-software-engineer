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
    id: "proj-manie",
    slug: "maison-manie-luxury-menswear",
    codeName: "PROJ_MANIE",
    title: "Maison Manie (دار المَنِيع)",
    tagline: "Flagship Luxury Arabian Menswear E-Commerce & Interactive Coordination Engine",
    summary: "High-fashion luxury Arabian menswear digital flagship combining editorial aesthetics, real-time interactive outfit coordination studio, and zero-flicker bilingual RTL/LTR engine.",
    description: [
      "Architected a luxury digital flagship for bespoke Arabian menswear (Thobes, Bishts, Shemaghs, and Fragrances) combining high-end editorial aesthetics with sub-second performance.",
      "Engineered an Interactive Outfit Coordination Studio (Mix & Match) featuring a real-time Color Harmony Algorithm and automated bundle discount mathematics.",
      "Designed a zero-flicker bilingual localization engine (Arabic/English) orchestrating root DOM directionality and typography (Playfair Display & Noto Naskh Arabic/Amiri).",
      "Built a lightweight client-side Canvas image pre-compression pipeline in the administration portal, reducing high-res uploads by up to 70% before cloud transmission."
    ],
    techStack: [
      { category: "Frontend", items: ["React 18.3", "TypeScript 5.5", "Vite", "TailwindCSS"] },
      { category: "Backend", items: ["Node.js Serverless Functions", "Express 5.0 (REST API)"] },
      { category: "Database & ORM", items: ["PostgreSQL 16", "Prisma 6.4 ORM"] },
      { category: "Performance", items: ["Client-Side Canvas Optimization", "Vercel Edge CDN"] }
    ],
    features: [
      "Interactive Outfit Coordination Studio (Mix & Match Engine)",
      "Real-Time Color Harmony Algorithm for Luxury Arab Attire",
      "Zero-Flicker Bilingual Localization Engine (RTL / LTR Fluent)",
      "Client-Side Canvas Media Optimizer (70% Payload Reduction)",
      "98% Google Lighthouse Performance Score (0.4s FCP | 0.00 CLS)",
      "Ultra-Lightweight SPA Bundle Footprint (391 KB Compressed)"
    ],
    screenshots: [
      { src: "https://res.cloudinary.com/drcfpswre/image/upload/v1788206763/lts8njlg0ywwzsoqquq8.png", caption: "Maison Manie — Luxury Arabian Menswear Flagship" },
      { src: "https://res.cloudinary.com/drcfpswre/image/upload/v1788206772/mppikfjubx63xpq9qyn7.png", caption: "Royal Collection & Bespoke Attire Catalog" },
      { src: "https://res.cloudinary.com/drcfpswre/image/upload/v1788206782/e0kbsi9grrnl0accrqlb.png", caption: "Interactive Outfit Coordination Studio" }
    ],
    liveUrl: "https://project-self-omega-65.vercel.app/#/",
    repoUrl: "",
    status: "DEPLOYED",
    year: "2026",
    isPinned: true,
    order: 0
  },
  {
    id: "proj-mashtool",
    slug: "mashtool-handcrafted-atelier",
    codeName: "PROJ_MASHTOOL",
    title: "Mashtool Atelier",
    tagline: "High-Performance Artisanal E-Commerce & Legacy Data Migration Pipeline",
    summary: "High-speed, conversion-optimized retail store and inventory management dashboard built with Remix / React Router v7 and an automated idempotent PostgreSQL data migration pipeline.",
    description: [
      "Engineered a high-speed, conversion-optimized retail storefront and inventory management system with full-stack SSR architecture.",
      "Replaced conventional client-side waterfalls with unified Server Route Loaders and Actions directly at the server boundary utilizing native Web Fetch APIs.",
      "Engineered an automated, idempotent data migration pipeline (migrate-mash-data.js) with data sanitization and deduplication running inside isolated PostgreSQL transactions.",
      "Constructed an end-to-end type-safe pipeline using Prisma ORM and TypeScript with 0ms optimistic UI cart updates, real-time inventory controls, and frictionless checkout."
    ],
    techStack: [
      { category: "Framework", items: ["Remix / React Router v7", "React", "TypeScript"] },
      { category: "Runtime & Build", items: ["Vite", "Bun / Node.js"] },
      { category: "Database & ORM", items: ["PostgreSQL", "Prisma ORM"] },
      { category: "Styling", items: ["TailwindCSS", "Custom Design System"] },
      { category: "Deployment", items: ["Vercel Edge Serverless"] }
    ],
    features: [
      "Automated Idempotent Data Migration Pipeline with Zero Data Loss",
      "Unified Server Route Loaders & Actions (SSR Architecture)",
      "Zero-Latency Optimistic UI & Interactive Cart Lifecycle",
      "End-to-End Type Safety from Database to UI Components",
      "Mobile-First Frictionless Checkout Flow & Order Processing",
      "Real-Time Admin Atelier Inventory & Product Management"
    ],
    screenshots: [
      { src: "https://res.cloudinary.com/drcfpswre/image/upload/v1788206741/txota9razfdql6j5rzrx.png", caption: "Mashtool Storefront — Artisanal Showcase" },
      { src: "https://res.cloudinary.com/drcfpswre/image/upload/v1788206750/ds5aippnyjfos4uekmcy.png", caption: "Bespoke Handcrafted Products & Catalog" },
      { src: "https://res.cloudinary.com/drcfpswre/image/upload/v1788206752/qz0rypz3ndzmoutwj37b.png", caption: "Admin Atelier Control Dashboard" },
      { src: "https://res.cloudinary.com/drcfpswre/image/upload/v1788206755/m4dp4zmugpiowixof3pp.jpg", caption: "Product Craft Detail & Custom Options" }
    ],
    liveUrl: "https://mashtool.vercel.app",
    repoUrl: "https://github.com/ebrahimelkordy/mashtool",
    status: "DEPLOYED",
    year: "2026",
    isPinned: true,
    order: 1
  },
  {
    id: "proj-sanad",
    slug: "sanad-financial-erp-ai",
    codeName: "PROJ_SANAD",
    title: "SANAD — Atomic Ledger & AI-Driven Financial ERP",
    tagline: "Multi-Tenant ERP with Atomic Append-Only Ledger, Multi-Provider AI & WhatsApp Gateway",
    summary: "Enterprise multi-tenant financial ERP engineered with Next.js 16, NestJS 11 (4-layer architecture), BullMQ, and PostgreSQL. Features an immutable atomic append-only ledger, 2-step settlements, FIFO inventory, and Arabic WhatsApp AI accounting gateway.",
    description: [
      "Architected an Enterprise Multi-Tenant Financial ERP (Sanad) with an immutable Atomic Append-Only Ledger, completely eliminating UPDATE and DELETE operations on financial journal entries to guarantee mathematical auditability.",
      "Constructed a high-performance 4-tier backend architecture in NestJS 11 (Schema → Repository → Service → Controller) backed by PostgreSQL and Prisma ORM 5.22, with BullMQ & Redis managing asynchronous jobs and Outbox event dispatching.",
      "Built an intelligent Multi-Provider AI Orchestration layer (Google Gemini 2.0, OpenAI, Groq, and Local Models) with deterministic preprocessing to parse complex Arabic and dialect WhatsApp messages into validated accounting transactions.",
      "Integrated a dedicated WhatsApp Gateway using Baileys with role-based numbers (PUBLIC_SALES for customer storefront orders vs. AUTHORIZED_FINANCE for accounting approvals), featuring 2-Step Settlement with strict Idempotency and FIFO inventory costing."
    ],
    techStack: [
      { category: "Frontend", items: ["Next.js 16 (App Router)", "React 19", "TypeScript", "Tailwind CSS v4", "Radix UI Primitives", "React Hook Form + Zod", "Recharts", "Lucide React"] },
      { category: "Backend & Architecture", items: ["NestJS 11 (4-Tier: Schema→Repo→Service→Controller)", "Node.js", "TypeScript", "Passport.js / JWT", "Helmet & Throttler Rate Limiting", "Swagger / OpenAPI"] },
      { category: "Database & Queues", items: ["PostgreSQL", "Prisma ORM 5.22", "BullMQ", "Redis / ioredis", "Atomic Append-Only Ledger", "Chart of Accounts (Path Tree)"] },
      { category: "AI & WhatsApp Orchestrator", items: ["Google Gemini API (@google/genai)", "OpenAI API", "Groq API", "Baileys WhatsApp Gateway (@whiskeysockets/baileys)", "Deterministic Preprocessor"] },
      { category: "DevOps & Infrastructure", items: ["Docker & Docker Compose", "Fly.io & Koyeb Configs", "Jest & Supertest (Idempotency & Multi-Tenancy Tests)", "PowerShell Automation"] }
    ],
    features: [
      "Atomic Append-Only Ledger (Zero UPDATE/DELETE on Journal Entries)",
      "Interactive Hierarchical Chart of Accounts (Materialized Path Tree)",
      "2-Step Settlement Flow (PENDING → Approval) with Strict Idempotency",
      "Multi-Provider AI Orchestration (Gemini 2.0, OpenAI, Groq) with Dialect Parsing",
      "Role-Separated WhatsApp Gateway (Baileys: Sales vs Authorized Finance)",
      "FIFO Batch Costing, Expiration Date Tracking & Real-Time COGS Engine",
      "Strict Multi-Tenant Isolation (tenant_id) & Granular Dynamic RBAC",
      "Transactional Outbox Pattern for Zero-Loss Domain Event Messaging"
    ],
    screenshots: [
      { src: "https://res.cloudinary.com/drcfpswre/image/upload/v1788206790/wvo3rkedoywjgxbspm9u.jpg", caption: "SANAD Financial ERP — Autonomous Audit Command Center" },
      { src: "https://res.cloudinary.com/drcfpswre/image/upload/v1788206799/alcqsfyuxajcwjnf6pa3.jpg", caption: "AI Transaction Verification Stream & JSON Schema Validator" }
    ],
    liveUrl: "",
    repoUrl: "",
    status: "ENTERPRISE",
    year: "2026",
    isPinned: true,
    order: 2
  },
  {
    id: "proj-kordy",
    slug: "al-kordy-contracting-platform",
    codeName: "PROJ_KORDY",
    title: "Al-Kordy Contracting",
    tagline: "Metal Construction & Steel Fabrication Digital Platform",
    summary: "Custom industrial engineering web platform featuring an Industrial Brutalist CAD aesthetic, Next.js Server Components, and a dynamic Supabase Headless CMS.",
    description: [
      "Designed and engineered a custom, high-performance web platform for heavy structural steel fabrication and metal construction.",
      "Leveraged Next.js App Router and React Server Components (RSC) to minimize client-side JavaScript execution, achieving a 98+ Lighthouse performance score and 0.00 CLS.",
      "Built a secure custom administration suite powered by Supabase and Row Level Security (RLS), allowing dynamic reordering of engineering processes and project case studies.",
      "Implemented an Industrial Brutalist design language with technical CAD grid overlays, interactive technical annotations (Fig.01), and fluid Framer Motion scroll parallax."
    ],
    techStack: [
      { category: "Framework", items: ["Next.js (App Router, Server Components, TypeScript)"] },
      { category: "Styling & Motion", items: ["TailwindCSS", "Framer Motion", "Lucide Icons"] },
      { category: "Database & Auth", items: ["Supabase (PostgreSQL, Realtime, Row Level Security)"] },
      { category: "Fonts & Assets", items: ["Google Fonts Cascade", "Next/Image Optimization"] },
      { category: "Deployment", items: ["Vercel Edge Network"] }
    ],
    features: [
      "Industrial Brutalist CAD UI with Interactive Technical Annotations",
      "Dynamic Headless CMS with Fine-Grained Hierarchy & Section Ordering",
      "Fluid 60fps Scroll-Linked Parallax Micro-Interactions (Framer Motion)",
      "Zero Cumulative Layout Shift (CLS: 0.00) & 98+ Lighthouse Performance",
      "Server-Side Fallback Matrices (DEFAULT_SETTINGS) for 100% High Availability",
      "Bespoke Typography Cascade (Space Grotesk, JetBrains Mono, Noto Kufi Arabic)"
    ],
    screenshots: [
      { src: "https://res.cloudinary.com/drcfpswre/image/upload/v1788206804/cjnzv6bawcob7wmn1c5w.png", caption: "Al-Kordy Contracting — Industrial Steel Fabrication Platform" },
      { src: "https://res.cloudinary.com/drcfpswre/image/upload/v1788206805/li1sdaa9qblfvp2a1av8.png", caption: "Heavy Structural Steel Projects & Engineering Capabilities" },
      { src: "https://res.cloudinary.com/drcfpswre/image/upload/v1788206808/idbdvoldcwwjvgrqqwfg.png", caption: "Technical CAD Specifications & Execution Pipeline" }
    ],
    liveUrl: "https://kordy-contracting.vercel.app/",
    repoUrl: "https://github.com/ebrahimelkordy/kordy-contracting",
    status: "DEPLOYED",
    year: "2026",
    isPinned: true,
    order: 3
  },
  {
    id: "proj-zaad",
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
      { category: "Backend", items: ["Node.js", "Mongoose", "Stripe API", "Redis"] },
      { category: "Frontend", items: ["React.js", "Zustand", "Tailwind CSS"] }
    ],
    features: ["Secure Stripe Payments", "Real-time Inventory Tracking", "Advanced Search & Filtering", "Automated Email Invoicing"],
    screenshots: [
      { src: "https://res.cloudinary.com/drcfpswre/image/upload/v1776613722/Screenshot_2025-12-28_162845_fpjzvo.png", caption: "Storefront Interface" }
    ],
    liveUrl: "https://zaad-zeta.vercel.app/",
    repoUrl: "https://github.com/ebrahimelkordy/Zaad-store/",
    status: "DEPLOYED",
    year: "2026",
    isPinned: false,
    order: 4
  },
  {
    id: "proj-nibras",
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
      { category: "Backend", items: ["Node.js", "Express", "MongoDB", "Socket.IO", "Bull/Redis"] },
      { category: "Frontend", items: ["Next.js 14", "TypeScript", "Tailwind CSS"] }
    ],
    features: ["Multi-tenancy Support", "Real-time Notifications", "Heavy File Upload Handling", "Detailed Analytics Dashboard"],
    screenshots: [
      { src: "https://res.cloudinary.com/drcfpswre/image/upload/v1776536356/course_catalog_desktop_220db_wodmca.png", caption: "LMS Student Portal" }
    ],
    liveUrl: "https://nibras-lms.com",
    repoUrl: "",
    status: "DEPLOYED",
    year: "2026",
    isPinned: false,
    order: 5
  },
  {
    id: "proj-soccer",
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
      { category: "Backend", items: ["Node.js", "Express", "JWT", "Bcrypt"] },
      { category: "Audit & DevOps", items: ["Custom Audit Scripts", "Morgan", "Helmet", "Docker"] }
    ],
    features: ["Granular Role-Based Access Control", "Automated Security Auditing", "Tournament & Team Lifecycle Management", "Cloud Data Migration"],
    screenshots: [
      { src: "https://res.cloudinary.com/drcfpswre/image/upload/v1776614993/Screenshot_2026-04-19_180723_pv4lxz.png", caption: "API Documentation & Architecture" }
    ],
    liveUrl: "https://soccer-street.vercel.app/",
    repoUrl: "https://github.com/ebrahimelkordy/soccer-street",
    status: "COMPLETED",
    year: "2026",
    isPinned: false,
    order: 6
  },
  {
    id: "proj-almutasim",
    slug: "new-project-1776615298287",
    codeName: "PRJ_AL_MUETASIM",
    title: "ALMUTASIM_FOR_WATER_SOLUTIONS",
    tagline: "A high-performance e-commerce engine engineered with PHP 8.4 and Laravel 12",
    summary: "A high-performance e-commerce engine engineered with PHP 8.4 and Laravel 12, showcasing architectural adaptability and modern full-stack scalability.",
    description: [
      "Built a production-ready e-commerce solution for the Arabic market using Laravel 12 and PHP 8.4.",
      "Implemented complex bidirectional relationships and JSON-casting for dynamic product attributes.",
      "Designed a lightweight, lightning-fast interface with Tailwind CSS v4 and Alpine.js handling native RTL layout."
    ],
    techStack: [
      { category: "Backend", items: ["PHP 8.4", "Laravel 12", "Eloquent ORM", "MySQL"] },
      { category: "Frontend", items: ["Alpine.js", "Tailwind CSS v4", "Blade Templating"] }
    ],
    features: ["Multi-Role Authentication", "High-Performance AJAX Search", "Administrative Command Center", "Dynamic Product Management"],
    screenshots: [
      { src: "https://res.cloudinary.com/drcfpswre/image/upload/v1776616707/Screenshot_2025-12-01_225126_quhssi.png", caption: "Al-Muetasim Storefront" }
    ],
    liveUrl: "https://almuetasim.com/",
    repoUrl: "",
    status: "DEVELOPMENT",
    year: "2025",
    isPinned: false,
    order: 7
  }
];
