import { GroupedSkills } from "@/lib/data-fetching";

export const mockPortfolioData = {
  hero: {
    firstName: "EBRAHIM",
    lastName: "HASHISH",
    title: "EBRAHIM\nCODE\nHASHISH",
    subtitle: "Full-Stack & Autonomous AI Systems Engineer",
    description: "Full-Stack & AI Systems Software Engineer building mission-critical web applications. Specializing in autonomous multi-provider AI agents (Gemini/OpenAI), high-performance NestJS/Node.js backends, distributed queues, and pixel-perfect Next.js architectures.",
    imageUrl: "https://res.cloudinary.com/drcfpswre/image/upload/v1788211139/zz6ychzibw7jrihuuwdw.jpg"
  },
  about: {
    firstName: "EBRAHIM",
    lastName: "HASHISH",
    bio: "Senior Software Engineer specializing in Distributed Backend Systems, Database Optimization, and Autonomous AI Agent Pipelines. Expert in building multi-provider AI orchestration layers (Google Gemini 2.0, OpenAI, Groq), WhatsApp automated accounting gateways, immutable atomic ledgers in NestJS/PostgreSQL, and high-conversion Next.js / Remix frontends. Engineered for zero-data-loss resilience, rigorous auditability, and sub-second execution under enterprise load.",
    role: "Senior Full-Stack & AI Systems Architect",
    imageUrl: "https://res.cloudinary.com/drcfpswre/image/upload/v1788211139/zz6ychzibw7jrihuuwdw.jpg",
    cvUrl: "/cv.pdf"
  },
  skills: [
    { 
      category: "AI & Agentic Systems", 
      items: [
        { id: 'ai1', name: 'Google Gemini API (@google/genai & 2.0 Flash)' }, 
        { id: 'ai2', name: 'Multi-Provider AI Orchestration (Gemini, OpenAI, Groq)' }, 
        { id: 'ai3', name: 'Autonomous Financial Audit Agents (Anomaly & VAT Detection)' }, 
        { id: 'ai4', name: 'WhatsApp AI Automation Gateway (Baileys Engine)' },
        { id: 'ai5', name: 'Deterministic JSON Schema Output & Zod Guardrails' },
        { id: 'ai6', name: 'Conversational Arabic & Dialect NLP Preprocessing' },
        { id: 'ai7', name: 'Vector Embeddings & Semantic Search Pipelines' },
        { id: 'ai8', name: 'LLM Tool Execution & Function Calling Orchestrator' }
      ]
    },
    { 
      category: "Backend", 
      items: [
        { id: 'b1', name: 'Node.js (v20+)' }, 
        { id: 'b2', name: 'NestJS 11 (4-Tier Architecture)' }, 
        { id: 'b3', name: 'Express.js 5.0' }, 
        { id: 'b4', name: 'TypeScript 5.5+' }, 
        { id: 'b5', name: 'RESTful APIs & Swagger OpenAPI' },
        { id: 'b6', name: 'WebSocket & Socket.IO (Real-Time)' },
        { id: 'b7', name: 'BullMQ & Redis (Job Queues & Caching)' },
        { id: 'b8', name: 'Transactional Outbox & Domain Events' },
        { id: 'b9', name: 'RBAC & Security Hardening (JWT/Helmet)' }
      ]
    },
    { 
      category: "Storage / DB", 
      items: [
        { id: 's1', name: 'PostgreSQL 16' }, 
        { id: 's2', name: 'MongoDB & Mongoose' }, 
        { id: 's3', name: 'Prisma ORM (v5/v6)' }, 
        { id: 's4', name: 'Supabase (Postgres, RLS & Realtime)' },
        { id: 's5', name: 'Atomic Append-Only Ledger Design' },
        { id: 's6', name: 'Idempotent ETL & Migration Pipelines' },
        { id: 's7', name: 'Hierarchical Materialized Path Trees' }
      ]
    },
    { 
      category: "Frontend", 
      items: [
        { id: 'f1', name: 'Next.js 16 (App Router & RSC)' }, 
        { id: 'f2', name: 'React 19 & React 18.3' }, 
        { id: 'f3', name: 'Remix & React Router v7 (SSR Loaders)' }, 
        { id: 'f4', name: 'Vite & Turbopack' },
        { id: 'f5', name: 'Tailwind CSS v4 & Custom Design Systems' },
        { id: 'f6', name: 'Radix UI Primitives' },
        { id: 'f7', name: 'Framer Motion (60fps Scroll Physics)' },
        { id: 'f8', name: 'Bilingual RTL / LTR Localization Engines' }
      ]
    },
    { 
      category: "DevOps / Tools", 
      items: [
        { id: 'd1', name: 'Docker & Docker Compose' }, 
        { id: 'd2', name: 'Fly.io, Koyeb & Vercel Edge Serverless' }, 
        { id: 'd3', name: 'Jest & Supertest (Idempotency Test Suites)' }, 
        { id: 'd4', name: 'Stripe API & Payment Webhooks' },
        { id: 'd5', name: 'Git & GitHub Actions CI/CD' }
      ]
    }
  ] as unknown as GroupedSkills,
  experiences: [
    {
      title: "Senior Full-Stack Engineer & AI Systems Architect",
      company: "Enterprise Projects & High-Ticket Ventures",
      period: "2024 - PRESENT",
      description: "Architecting and delivering mission-critical web platforms, autonomous AI accounting agents, atomic financial ERPs, high-traffic e-commerce flagships, and idempotent data migration pipelines.",
      order: 0
    }
  ],
  studies: [
    {
      degree: "Bachelor of Usul Al-Din (Student)",
      institution: "Al-Azhar University",
      year: "In Progress",
      description: "Developing deep analytical, classical logic, and philosophical reasoning skills while concurrently mastering distributed systems engineering, AI agent orchestration, and modern full-stack web architectures.",
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
      id: "p-atomic-ledger",
      slug: "immutable-atomic-ledger-financial-erp",
      title: "Designing an Immutable Atomic Append-Only Ledger in Multi-Tenant Financial ERPs",
      excerpt: "Why eliminating UPDATE and DELETE operations on financial journal entries guarantees mathematical auditability, solves concurrency race conditions, and powers autonomous AI auditing.",
      date: "2026.04.28",
      readTime: "8 MIN READ",
      tags: ["FINTECH", "DISTRIBUTED_SYSTEMS", "POSTGRESQL", "NESTJS"],
      isPinned: true,
      order: 0
    },
    {
      id: "p-whatsapp-ai",
      slug: "whatsapp-ai-multi-provider-orchestration",
      title: "Solving WhatsApp AI Latency & Dialect Parsing with Multi-Provider Orchestration",
      excerpt: "Architecting a multi-provider fallback matrix (Gemini 2.0, OpenAI, Groq) with deterministic JSON Schema guards to process conversational Arabic voice notes and messages into validated accounting entries.",
      date: "2026.04.22",
      readTime: "6 MIN READ",
      tags: ["AI_ENGINEERING", "WHATSAPP_API", "NODEJS", "LLM"],
      isPinned: true,
      order: 1
    },
    {
      id: "p-ssr-loaders",
      slug: "ssr-route-loaders-zero-latency-commerce",
      title: "Eliminating Client-Side Waterfalls: SSR Route Loaders vs Client SPAs in High-Conversion Commerce",
      excerpt: "A deep-dive into how migrating from client-side data fetching waterfalls to unified Server Route Loaders reduced FCP to 0.4s and unlocked a zero-latency optimistic cart lifecycle.",
      date: "2026.04.15",
      readTime: "7 MIN READ",
      tags: ["PERFORMANCE", "REMIX", "REACT", "FULLSTACK"],
      isPinned: false,
      order: 2
    },
    {
      id: "p-bullmq-resilience",
      slug: "bullmq-redis-transactional-outbox-resilience",
      title: "Asynchronous Task Resilience with BullMQ, Redis, and the Transactional Outbox Pattern",
      excerpt: "Guaranteeing at-least-once delivery for invoice notifications, WhatsApp webhooks, and heavy PDF generations without blocking HTTP request lifecycles.",
      date: "2026.04.10",
      readTime: "5 MIN READ",
      tags: ["QUEUES", "REDIS", "BULLMQ", "BACKEND_SYSTEMS"],
      isPinned: false,
      order: 3
    }
  ],
  contact: {
    email: "ebrahimelkordy@gmail.com",
    github: "https://github.com/ebrahimelkordy",
    linkedin: "https://www.linkedin.com/in/ebrahim-elkordy",
    whatsapp: "+201026040854"
  }
};
