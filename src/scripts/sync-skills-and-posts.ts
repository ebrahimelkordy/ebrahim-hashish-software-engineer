import prisma from '../lib/prisma';

const skillsData = [
  // Backend & Architecture
  { name: 'Node.js (v20+)', category: 'Backend', order: 0 },
  { name: 'NestJS 11 (4-Tier Architecture)', category: 'Backend', order: 1 },
  { name: 'Express.js 5.0', category: 'Backend', order: 2 },
  { name: 'TypeScript 5.5+', category: 'Backend', order: 3 },
  { name: 'RESTful APIs & Swagger OpenAPI', category: 'Backend', order: 4 },
  { name: 'WebSocket & Socket.IO (Real-Time)', category: 'Backend', order: 5 },
  { name: 'BullMQ & Redis (Job Queues & Caching)', category: 'Backend', order: 6 },
  { name: 'Transactional Outbox & Domain Events', category: 'Backend', order: 7 },
  { name: 'RBAC & Security Hardening (JWT/Helmet)', category: 'Backend', order: 8 },

  // Databases & Storage
  { name: 'PostgreSQL 16', category: 'Storage / DB', order: 9 },
  { name: 'MongoDB & Mongoose', category: 'Storage / DB', order: 10 },
  { name: 'Prisma ORM (v5/v6)', category: 'Storage / DB', order: 11 },
  { name: 'Supabase (Postgres, RLS & Realtime)', category: 'Storage / DB', order: 12 },
  { name: 'Atomic Append-Only Ledger Design', category: 'Storage / DB', order: 13 },
  { name: 'Idempotent ETL & Migration Pipelines', category: 'Storage / DB', order: 14 },
  { name: 'Hierarchical Materialized Path Trees', category: 'Storage / DB', order: 15 },

  // Frontend & UI Engineering
  { name: 'Next.js 16 (App Router & RSC)', category: 'Frontend', order: 16 },
  { name: 'React 19 & React 18.3', category: 'Frontend', order: 17 },
  { name: 'Remix & React Router v7 (SSR Loaders)', category: 'Frontend', order: 18 },
  { name: 'Vite & Turbopack', category: 'Frontend', order: 19 },
  { name: 'Tailwind CSS v4 & Custom Design Systems', category: 'Frontend', order: 20 },
  { name: 'Radix UI Primitives', category: 'Frontend', order: 21 },
  { name: 'Framer Motion (60fps Scroll Physics)', category: 'Frontend', order: 22 },
  { name: 'Bilingual RTL / LTR Localization Engines', category: 'Frontend', order: 23 },

  // AI, DevOps & Cloud
  { name: 'Multi-Provider AI (Gemini, OpenAI, Groq)', category: 'DevOps / Tools', order: 24 },
  { name: 'WhatsApp Gateway (@whiskeysockets/baileys)', category: 'DevOps / Tools', order: 25 },
  { name: 'Docker & Docker Compose', category: 'DevOps / Tools', order: 26 },
  { name: 'Fly.io, Koyeb & Vercel Edge Serverless', category: 'DevOps / Tools', order: 27 },
  { name: 'Jest & Supertest (Idempotency Test Suites)', category: 'DevOps / Tools', order: 28 },
  { name: 'Stripe API & Payment Webhooks', category: 'DevOps / Tools', order: 29 },
  { name: 'Git & GitHub Actions CI/CD', category: 'DevOps / Tools', order: 30 }
];

const blogPostsData = [
  {
    slug: "immutable-atomic-ledger-financial-erp",
    title: "Designing an Immutable Atomic Append-Only Ledger in Multi-Tenant Financial ERPs",
    excerpt: "Why eliminating UPDATE and DELETE operations on financial journal entries guarantees mathematical auditability, solves concurrency race conditions, and powers autonomous AI auditing.",
    content: `## The Core Problem: Why Traditional CRUD Fails in Fintech & Accounting

In conventional web applications, updating a balance looks deceivingly simple: \`UPDATE accounts SET balance = balance + 100 WHERE id = 1\`. In enterprise financial systems and multi-tenant ERPs, this pattern is an architectural catastrophe.

When records are updated or deleted in place:
1. **Mathematical History is Destroyed:** You lose the point-in-time state of the ledger.
2. **Audit Trails are Corrupted:** Forensic auditors cannot mathematically verify how a balance evolved.
3. **Concurrency Race Conditions:** Simultaneous writes create phantom reads and double-spend vulnerabilities.

---

## Architectural Solution: Atomic Append-Only Ledger

In SANAD ERP, we implemented an **Immutable Atomic Append-Only Ledger** where:
- **Zero UPDATE / DELETE Operations:** Database triggers and Prisma middleware strictly reject any mutation or deletion on journal tables.
- **Double-Entry Equilibrium:** Every transaction consists of balanced DEBIT and CREDIT lines (\`Σ Debits == Σ Credits\`) verified inside isolated database transactions (\`SERIALIZABLE\` isolation level).
- **Corrective Entries (Reversals):** To cancel or correct an erroneous transaction, an equal-and-opposite offsetting journal entry is appended with cryptographically linked reference IDs.

\`\`\`typescript
// Idempotent Append-Only Journal Entry Creation
export async function appendJournalEntry(
  prisma: PrismaClient,
  tenantId: string,
  entry: CreateJournalEntryDto
): Promise<JournalEntry> {
  return await prisma.$transaction(async (tx) => {
    // 1. Verify mathematical balance
    const totalDebit = entry.lines.reduce((sum, l) => sum + (l.type === 'DEBIT' ? l.amount : 0), 0);
    const totalCredit = entry.lines.reduce((sum, l) => sum + (l.type === 'CREDIT' ? l.amount : 0), 0);

    if (totalDebit !== totalCredit) {
      throw new UnprocessableEntityException('LEDGER_UNBALANCED: Debits must strictly equal Credits');
    }

    // 2. Append immutable record (No update/delete allowed)
    return await tx.journalEntry.create({
      data: {
        tenantId,
        idempotencyKey: entry.idempotencyKey,
        description: entry.description,
        lines: { create: entry.lines }
      }
    });
  });
}
\`\`\`

---

## Result: Autonomous AI Auditing & Real-Time Balance Projections

By treating the ledger as an append-only stream of immutable events, calculating an account's balance becomes a deterministic fold over its journal lines. Furthermore, our AI Audit Inspector can continuously scan the stream in real-time to detect anomalous transaction patterns, duplicate invoices, and VAT reconciliation discrepancies.`,
    imageUrl: "https://res.cloudinary.com/drcfpswre/image/upload/f_auto,q_auto,w_1200/v1788206790/wvo3rkedoywjgxbspm9u.jpg",
    date: "2026.04.28",
    readTime: "8 MIN READ",
    tags: JSON.stringify(["FINTECH", "DISTRIBUTED_SYSTEMS", "POSTGRESQL", "NESTJS"]),
    isPinned: true,
    order: 0
  },
  {
    slug: "whatsapp-ai-multi-provider-orchestration",
    title: "Solving WhatsApp AI Latency & Dialect Parsing with Multi-Provider Orchestration",
    excerpt: "Architecting a multi-provider fallback matrix (Gemini 2.0, OpenAI, Groq) with deterministic JSON Schema guards to process conversational Arabic voice notes and messages into validated accounting entries.",
    content: `## Transforming Conversational Chaos into Structured Accounting

When building SANAD's WhatsApp Accounting Agent, our core challenge was converting free-form Arabic and Egyptian dialect voice messages into strict, double-entry financial transactions without latency timeouts.

Example User Input:
> *"سجل بيع ٥ كراتين زيت الواحة بسعر ٤٥٠ للكارتونة واستلمنا كاش 1000 والباقي آجل على حساب سوبرماركت الأمانة"*

---

## The 3-Tier Multi-Provider Pipeline

To guarantee 99.99% availability and sub-second parsing:
1. **Deterministic Preprocessing:** Audio transcribing via local Whisper models + regex token extraction for currency symbols, dates, and account codes.
2. **Multi-Provider Fallback Matrix:**
   - **Primary Engine:** Google Gemini 2.0 Flash via \`@google/genai\` for rapid Arabic dialect comprehension and structured JSON output.
   - **Secondary Fallback:** OpenAI GPT-4o-mini with strict JSON Schema function calling.
   - **Ultra-Fast Fallback:** Groq Llama 3 70B for zero-latency spikes.
3. **Deterministic Guardrails & Zod Validation:** The AI payload is validated against strict accounting schemas before reaching the database boundary.

\`\`\`typescript
const AccountingActionSchema = z.object({
  action: z.enum(['RECORD_SALE', 'RECORD_EXPENSE', 'COLLECT_RECEIVABLE', 'PAY_SUPPLIER']),
  customerName: z.string().optional(),
  cashAmount: z.number().nonnegative(),
  creditAmount: z.number().nonnegative(),
  items: z.array(z.object({
    name: z.string(),
    quantity: z.number().positive(),
    unitPrice: z.number().positive()
  }))
});
\`\`\`

---

## Role-Separated WhatsApp Gateway Architecture

To eliminate security risks, we isolated WhatsApp phone numbers into two distinct gateways:
- \`PUBLIC_SALES\` Gateway: Accessible by store customers to browse products, check prices, and place provisional orders.
- \`AUTHORIZED_FINANCE\` Gateway: Whitelisted strictly to authenticated company managers with two-factor cryptographic confirmation codes.`,
    imageUrl: "https://res.cloudinary.com/drcfpswre/image/upload/f_auto,q_auto,w_1200/v1788206799/alcqsfyuxajcwjnf6pa3.jpg",
    date: "2026.04.22",
    readTime: "6 MIN READ",
    tags: JSON.stringify(["AI_ENGINEERING", "WHATSAPP_API", "NODEJS", "LLM"]),
    isPinned: true,
    order: 1
  },
  {
    slug: "ssr-route-loaders-zero-latency-commerce",
    title: "Eliminating Client-Side Waterfalls: SSR Route Loaders vs Client SPAs in High-Conversion Commerce",
    excerpt: "A deep-dive into how migrating from client-side data fetching waterfalls to unified Server Route Loaders reduced FCP to 0.4s and unlocked a zero-latency optimistic cart lifecycle.",
    content: `## The Waterfall Dilemma in Modern E-Commerce

Traditional single-page application (SPA) architectures frequently suffer from nested network waterfalls:
1. Download HTML document.
2. Download and execute JavaScript bundle.
3. Fetch user session.
4. Fetch product details.
5. Fetch inventory availability and pricing rules.

Each hop introduces round-trip network latency, hurting mobile conversion rates and causing cumulative layout shifts (CLS).

---

## The Unified Server Route Loader Pattern

In **Mashtool Atelier** and **Maison Manie**, we replaced client-side waterfalls with unified Server Route Loaders running directly on edge infrastructure.

\`\`\`typescript
// Server Loader: Executes parallel database queries before HTML generation
export async function loader({ request, params }: LoaderFunctionArgs) {
  const { slug } = params;
  
  // Parallel execution on edge server
  const [product, inventory, relatedProducts] = await Promise.all([
    db.product.findUniqueOrThrow({ where: { slug } }),
    db.inventory.findFirst({ where: { productSlug: slug } }),
    db.product.findMany({ where: { category: product.category }, take: 4 })
  ]);

  return json(
    { product, inventory, relatedProducts },
    { headers: { 'Cache-Control': 'public, max-age=60, s-maxage=3600, stale-while-revalidate=86400' } }
  );
}
\`\`\`

---

## Measured Performance Gains:
- **First Contentful Paint (FCP):** Dropped from 1.8s to **0.4s**.
- **Cumulative Layout Shift (CLS):** Stable **0.00**.
- **Lighthouse Performance Score:** Consistent **98 - 100/100**.`,
    imageUrl: "https://res.cloudinary.com/drcfpswre/image/upload/f_auto,q_auto,w_1200/v1788206741/txota9razfdql6j5rzrx.png",
    date: "2026.04.15",
    readTime: "7 MIN READ",
    tags: JSON.stringify(["PERFORMANCE", "REMIX", "REACT", "FULLSTACK"]),
    isPinned: false,
    order: 2
  },
  {
    slug: "bullmq-redis-transactional-outbox-resilience",
    title: "Asynchronous Task Resilience with BullMQ, Redis, and the Transactional Outbox Pattern",
    excerpt: "Guaranteeing at-least-once delivery for invoice notifications, WhatsApp webhooks, and heavy PDF generations without blocking HTTP request lifecycles.",
    content: `## Preventing Data Loss in Distributed Event Pipelines

When a user completes a checkout or an accounting manager approves a journal entry, several asynchronous secondary tasks must trigger:
1. Sending WhatsApp notifications to the client.
2. Generating a cryptographic PDF invoice.
3. Updating real-time dashboard websockets.
4. Syncing inventory across third-party fulfillment centers.

Executing these inline inside the HTTP request lifecycle invites timeout failures, double submissions, and unrecoverable state when third-party APIs experience downtime.

---

## Implementing the Transactional Outbox Pattern with BullMQ

Instead of publishing events directly to external queues inside the database transaction:
1. **Write to Local Outbox:** An \`OutboxEvent\` record is written to PostgreSQL within the exact same atomic transaction as the business entity.
2. **Dedicated Dispatch Worker:** A lightweight background worker polls/listens for unprocessed outbox events and pushes them to **BullMQ** with exponential backoff retry strategies.
3. **Idempotent Consumers:** Each BullMQ job consumer tracks processed message IDs to guarantee strict idempotency.

\`\`\`typescript
@Processor('FINANCIAL_EVENTS_QUEUE')
export class FinancialEventProcessor extends WorkerHost {
  async process(job: Job<FinancialEventPayload>): Promise<void> {
    const { eventType, entityId, tenantId } = job.data;
    
    switch (eventType) {
      case 'JOURNAL_ENTRY_SETTLED':
        await this.pdfGeneratorService.generateInvoicePdf(entityId);
        await this.whatsappGateway.notifyApprover(tenantId, entityId);
        break;
      // Additional event handlers...
    }
  }
}
\`\`\`

---

## Result: Zero Data Loss & Resilient Backpressure

This architecture ensures that even during full external API outages (e.g., WhatsApp server rate limits or PDF render spikes), system writes never fail, and messages automatically drain once downstream services recover.`,
    imageUrl: "https://res.cloudinary.com/drcfpswre/image/upload/f_auto,q_auto,w_1200/v1788206763/lts8njlg0ywwzsoqquq8.png",
    date: "2026.04.10",
    readTime: "5 MIN READ",
    tags: JSON.stringify(["QUEUES", "REDIS", "BULLMQ", "BACKEND_SYSTEMS"]),
    isPinned: false,
    order: 3
  }
];

async function main() {
  console.log('--- SYNCING SKILLS AND BLOG POSTS TO DATABASE ---');

  // 1. Clear and re-populate Skills
  await prisma.skill.deleteMany();
  console.log('Cleared existing skills.');

  for (const skill of skillsData) {
    await prisma.skill.create({
      data: skill
    });
  }
  console.log(`✓ Inserted ${skillsData.length} modern skills into DB.`);

  // 2. Sync Blog Posts (Upsert by slug)
  for (const post of blogPostsData) {
    const existing = await prisma.blogPost.findFirst({
      where: { slug: post.slug }
    });

    if (existing) {
      await prisma.blogPost.update({
        where: { id: existing.id },
        data: post
      });
      console.log(`✓ Updated blog post: "${post.title}"`);
    } else {
      await prisma.blogPost.create({
        data: post
      });
      console.log(`✓ Created blog post: "${post.title}"`);
    }
  }

  const allPosts = await prisma.blogPost.findMany({
    orderBy: [{ isPinned: 'desc' }, { order: 'asc' }]
  });
  console.log(`\n=== FINAL BLOG POSTS IN DB (${allPosts.length} posts) ===`);
  allPosts.forEach((p: any, idx: number) => {
    console.log(`${idx + 1}. [${p.isPinned ? 'PINNED' : 'UNPINNED'}] ${p.title} (${p.slug})`);
  });

  console.log('--- SYNC COMPLETED SUCCESSFULLY ---');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
