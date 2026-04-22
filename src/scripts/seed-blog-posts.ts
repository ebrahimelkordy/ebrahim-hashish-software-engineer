import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const blogData = [
  {
    "title": "REFACTORING A REAL-WORLD MONOLITH (SOCCER STREET)",
    "slug": "soccer-street-refactoring-case-study",
    "excerpt": "A deep dive into transforming a 1500+ line monolithic Express.js backend into a modular, highly scalable Hexagonal architecture.",
    "content": "Monoliths often start as pragmatic choices but gradually mutate into unmaintainable bottlenecks. In this technical deep dive, I dissect my approach to refactoring the **Soccer Street** platform—an enterprise sports reservation system that was tightly coupled within a massive 1500-line Express file.\n\n### The Problem: Technical Debt & Coupling\nThe initial architecture suffered from extreme coupling. Routing, validation, authorization, and business logic were all intertwined. A single modification to the booking schema risked breaking the authentication workflows. This 'Big Ball of Mud' pattern made scaling the platform to accommodate new sports academies nearly impossible.\n\n### The Strategy: Hexagonal Architecture\nInstead of a risky complete rewrite, I adopted the Strangler Fig pattern to surgically decouple the application. \n\n1.  **Domain Isolation**: I isolated the core entity logic into Domain Models, ensuring that `Booking` and `User` entities managed their own state invariants without knowing about the database or HTTP layers.\n2.  **Service Layer Injection**: Extracted business cases into pure `Services`, injecting repositories via interfaces (Dependency Inversion), allowing for isolated unit testing.\n3.  **Controller Delegation**: Routes became extremely thin wrappers, solely responsible for DTO parsing and triggering the injected services.\n\n### The Engineering Impact\nBy segregating the layers, the endpoint response time delta decreased, and the defect rate dropped exponentially. The codebase transitioned from a monolithic nightmare into a predictable, testable, and robust enterprise solution. True backend engineering isn't just about making systems work—it's about building systems that endure.",
    "imageUrl": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop",
    "date": "April 12, 2026",
    "readTime": "8 MIN READ",
    "tags": ["CASE STUDY", "REFACTORING", "ARCHITECTURE"]
  },
  {
    "title": "BUILDING A SCALABLE E-COMMERCE SYSTEM (ZAAD)",
    "slug": "zaad-ecommerce-architecture",
    "excerpt": "Architecting a production-ready e-commerce back-end with transactional integrity, PCI compliance caching, and massive concurrency optimization.",
    "content": "Designing an e-commerce platform goes far beyond standard CRUD operations. It fundamentally revolves around absolute transactional integrity and high-throughput concurrency. This is a look into the core architecture of the **Zaad** Platform.\n\n### Race Conditions in Inventory Management\nWhen hundreds of users attempt to purchase highly-demanded items simultaneously, standard document updates fail catastrophically. To solve this, I leveraged **Optimistic Concurrency Control (OCC)** combined with database-level locking mechanisms in Prisma/Mongoose, ensuring that a product's stock count can never drop below zero, isolating transactions perfectly.\n\n### Stateless Auth & Caching at the Edge\nSession bottlenecks were eliminated by moving to a pure stateless JWT strategy stored in HttpOnly, SameSite cookies to mitigate XSS and CSRF attacks. However, querying user privileges continuously introduced latency. I introduced **Redis** as a distributed caching layer, establishing an in-memory session proxy that delivered authorization checks in <2ms.\n\n### Secure Payment Webhooks\nThe integration with Stripe wasn't limited to front-end checkout. I engineered robust endpoints to handle asynchronous Stripe Webhooks securely. By implementing cryptographic signature verification (`stripe.webhooks.constructEvent`), the system became resilient against payload spoofing, ensuring fulfillment only occurs on guaranteed cryptographically signed financial events.",
    "imageUrl": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2670&auto=format&fit=crop",
    "date": "April 11, 2026",
    "readTime": "7 MIN READ",
    "tags": ["E-COMMERCE", "CASE STUDY", "PERFORMANCE"]
  },
  {
    "title": "DESIGNING A MULTI-TENANT LMS SYSTEM (NIBRAS)",
    "slug": "multi-tenant-lms-architecture",
    "excerpt": "How to engineer a multi-tenant SaaS architecture to isolate instructor data, scale globally, and enforce strict Role-Based Access Controls.",
    "content": "Enterprise-grade Learning Management Systems (LMS) mandate strict data isolation. **Nibras** was designed as a robust Multi-Tenant platform capable of isolating different academies while running on a unified infrastructure.\n\n### The Multi-Tenant Approach\nI utilized a **Logical Isolation Strategy**, where every critical entity—Courses, Students, and Quizzes—holds a mandatory `tenantId` reference. At the middleware level, an enforcement proxy ensures that every query is automatically scoped to the authenticated user's `tenantId`, making cross-tenant data bleed virtually impossible.\n\n### Dynamic RBAC Pipeline\nA rigid authentication structure was insufficient. I engineered a highly granular **Role-Based Access Control (RBAC)** pipeline. The middleware parses deeply nested JWT claims, mapping them against an in-memory bitmask representation of system permissions. This allowed instructors to assign sub-roles dynamically (e.g., 'Grade Assistant' or 'Content Creator') without altering the core backend authorization logic.\n\n### Architectural Resilience\nThrough polymorphic relationships in the database, the platform can flexibly attach media, exams, and live-session parameters to completely different node types, enabling an LMS engine that adapts to any educational model rather than forcing one.",
    "imageUrl": "https://images.unsplash.com/photo-1584697964403-5c76f1a6d7c2?q=80&w=2670&auto=format&fit=crop",
    "date": "April 9, 2026",
    "readTime": "7 MIN READ",
    "tags": ["LMS", "ARCHITECTURE", "MULTI-TENANT"]
  },
  {
    "title": "THE PITFALLS OF THE ACTIVE RECORD PATTERN AND WHY REPOSITORIES WIN",
    "slug": "clean-backend-architecture",
    "excerpt": "A low-level analysis of why mixing business logic with database access layers leads to severe technical debt in Node.js applications.",
    "content": "The Active Record pattern—where the database model is directly infused with business logic (`User.find().doSomething()`)—is the default standard for many ORMs. While fast for prototyping, it becomes a structural vulnerability as a product scales.\n\n### The Active Record Trap\nBy binding logic directly to the ORM, your domain logic becomes completely inseparable from your infrastructure. If you decide to migrate from MongoDB to PostgreSQL, the migration will shatter your entire application because the business constraints were inextricably bound to Mongoose documents.\n\n### The Repository Pattern Salvation\nBy abstracting the data layer behind a **Repository Interface**, I decouple the application's domain from the storage mechanism. A `UserRepository` acts as an in-memory collection from the perspective of the application. The service layer merely calls `Repository.getByEmail()`, remaining completely ignorant of whether the data is coming from Postgres, Oracle, or completely mocked in a unit test.\n\nThis level of Separation of Concerns isn't theoretical overhead—it's the defining hallmark of an engineered, bulletproof enterprise backend.",
    "imageUrl": "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=2670&auto=format&fit=crop",
    "date": "April 10, 2026",
    "readTime": "7 MIN READ",
    "tags": ["BACKEND", "ARCHITECTURE", "SCALABILITY"]
  },
  {
    "title": "OVERCOMING CORS AND SECURITY POLICIES IN PRODUCTION",
    "slug": "monolith-to-modular",
    "excerpt": "Solving advanced cross-origin tracking, Preflight cache management, and strict security headers for complex Node APIs.",
    "content": "Cross-Origin Resource Sharing (CORS) is typically treated as a nuisance, often 'solved' by blindly adding `*` via a wildcard. In an enterprise system, this is a catastrophic security vulnerability.\n\n### Strict Whitelisting & Reverse Proxies\nInstead of exposing endpoints to the globe, strict origin whitelisting using dynamic Regex parsing was implemented in the Node layer, tied precisely to staging and production subdomains. Preflight `OPTIONS` requests were aggressively cached using `Access-Control-Max-Age` headers, which reduced superfluous network latency drastically, optimizing performance for remote clients.\n\n### The Content Security Policy (CSP) Mesh\nGoing a step beyond CORS, HTTP headers were hardened utilizing `Helmet.js`, implementing a robust Content Security Policy that mitigates clickjacking and XSS vectors. We enforced stringent directives requiring nonces for inline execution and completely banished unsafe evals, securing the pipeline entirely.",
    "imageUrl": "https://images.unsplash.com/photo-1581093588401-12b3b1a9a3d6?q=80&w=2670&auto=format&fit=crop",
    "date": "April 8, 2026",
    "readTime": "6 MIN READ",
    "tags": ["SECURITY", "CORS", "NODEJS"]
  },
  {
    "title": "BUILDING HIGH-PERFORMANCE APIs: INDEXING AND B-TREES",
    "slug": "high-performance-apis",
    "excerpt": "How to optimize raw SQL and NoSQL queries, leveraging Compound Indexes and understanding database execution paradigms.",
    "content": "API Response time is 90% dictated by database query efficiency. Writing a simple `find` command is insufficient when querying tables with millions of records.\n\n### Query Execution Plans & Traversal\nWithout indexing, databases perform a Collection Scan (`COLLSCAN` in Mongo, `Seq Scan` in Postgres)—inspecting every single document. By strategically implementing B-Tree indexes based heavily on the `Execution Plan` analyzer (`.explain()`), I transformed O(N) linear scans into O(log N) operations.\n\n### Compound Index Stratification\nIt's not just about indexing individual fields. Taking advantage of ESR (Equality-Sort-Range) rules, I optimized complex multi-filter queries by creating strictly ordered compound indexes. This ensured that the database engine could resolve complex queries directly entirely from index memory without loading full document nodes into RAM. The result? Queries that previously took 1.2s now execute in 8ms.",
    "imageUrl": "https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=2670&auto=format&fit=crop",
    "date": "April 6, 2026",
    "readTime": "8 MIN READ",
    "tags": ["DATABASE", "PERFORMANCE", "ALGORITHMS"]
  },
  {
    "title": "SCALING WEBSOCKETS FOR REAL-TIME STREAMING",
    "slug": "scaling-realtime-systems",
    "excerpt": "Architecting horizontally scalable Socket.io instances using Redis Pub/Sub adapters.",
    "content": "When websockets scale past a single Node.js instance, traditional event emission fails. If User A connects to Server 1 and User B connects to Server 2, a standard local broadcast event will never reach User B.\n\n### The Horizontal Scaling Dilemma\nTo solve the persistent connections across stateless load-balancers, a centralized Pub/Sub mechanism is required. I utilized **Redis Pub/Sub** combined with the Socket.io Redis Adapter.\n\n### The Flow\nWhen an event fires from a Node instance, it publishes the payload down the Redis pipeline. All running instances subscribe to these channels, intercept the messages, and relay them to exactly the target sockets connected to their local process.\n\nThis transforms Websockets from a brittle, stateful bottleneck into an infinitely horizontally scalable engine capable of handling tens of thousands of concurrent connections smoothly.",
    "imageUrl": "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=2670&auto=format&fit=crop",
    "date": "April 5, 2026",
    "readTime": "6 MIN READ",
    "tags": ["REALTIME", "SOCKET.IO", "SCALING"]
  },
  {
    "title": "SECURING YOUR BACKEND LIKE A PRO: A DEEP DIVE",
    "slug": "backend-security-best-practices",
    "excerpt": "Beyond JWTs: Implementing payload sanitization, Brute-Force limiters, and secure HttpOnly cookie architectures.",
    "content": "A system is only as secure as its most vulnerable endpoint. Storing JWTs in `localStorage` makes them immediately accessible via Javascript, creating massive Cross-Site Scripting (XSS) attack vectors.\n\n### The Dual-Token Strategy\nThe secure standard for JWT is utilizing a short-lived `AccessToken` and a highly secure rotating `RefreshToken`. The AccessToken must exist purely in memory during the app lifecycle, while the RefreshToken holds fort deeply secured within an `HttpOnly, Secure, SameSite=Strict` cookie mechanism, utterly invisible to any client-side script.\n\n### Defensive Rate Limiting\nWe don't just apply global rate limits. Modern systems need target-specific throttling. Using Redis-backed burst limiters, authentication endpoints automatically aggressively throttle IPs based on consecutive failed attempts, shutting down automated credential-stuffing scripts dead in their tracks.",
    "imageUrl": "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=2670&auto=format&fit=crop",
    "date": "April 3, 2026",
    "readTime": "7 MIN READ",
    "tags": ["SECURITY", "JWT", "BACKEND"]
  },
  {
    "title": "DESIGNING DATABASES FOR SCALE (NOSQL vs SQL)",
    "slug": "database-design-for-scale",
    "excerpt": "When to deeply embed documents, when to normalize relations, and dissecting the CAP theorem in production.",
    "content": "Choosing the database isn't a holy war between SQL and NoSQL—it's a calculated decision heavily influenced by query access patterns.\n\n### The Embedding Spectrum\nIn MongoDB systems, the classic mistake is porting SQL normalization strategies identically. If an entity is inherently bound to its parent (like comments to a post), embedding is vastly superior, drastically reducing disk traversal. However, if the array undergoes unbounded growth, utilizing `virtual populates` and reference object IDs becomes mandatory to avoid hitting the 16MB document size limit.\n\n### Data Consistency Matrices\nHandling relationships effectively requires deep understanding of CAP constraints. By utilizing advanced Aggregation pipelines (e.g., `$lookup`, `$unwind`) we can replicate Joins aggressively at the hardware layer, maintaining the horizontal scalability of NoSQL without sacrificing the query complexity expected from traditional relational tables.",
    "imageUrl": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=2670&auto=format&fit=crop",
    "date": "April 2, 2026",
    "readTime": "8 MIN READ",
    "tags": ["DATABASE", "MONGODB", "SCALABILITY"]
  },
  {
    "title": "REDIS: THE SECRET CACHE WEAPON",
    "slug": "redis-caching-strategies",
    "excerpt": "A masterclass in memory profiling, TTL eviction policies, and cache invalidation strategies for pure speed.",
    "content": "Redis is phenomenally fast since it relies entirely on physical RAM, but unstructured caching architectures simply create highly stale, corrupted data pools.\n\n### The Cache Invalidation Paradox\nPhil Karlton famously said, _'There are only two hard things in Computer Science: cache invalidation and naming things'_. Instead of manual cache wipes, I advocate for deterministic LRU (Least Recently Used) eviction mechanisms bounded strictly by robust TTL (Time-To-Live) constraints to guarantee data freshness.\n\n### The Cache Aside Pattern\nWe ensure high-availability via the Cache-Aside architecture. Data is demanded from Redis. On a Cache Miss, the Node backend fetches it securely from the primary database, populates the Redis key with an optimized Stringified JSON payload, and returns the response. Subsequent identical fetches bypass the database altogether, slashing average API transit times from 350ms to <10ms.",
    "imageUrl": "https://images.unsplash.com/photo-1581090700227-4c4d06b6c6b0?q=80&w=2670&auto=format&fit=crop",
    "date": "March 30, 2026",
    "readTime": "7 MIN READ",
    "tags": ["REDIS", "CACHING", "PERFORMANCE"]
  }
];

async function main() {
  console.log('--- RESETTING AND SEEDING BLOG POSTS ---');
  
  // 1. Delete all existing posts
  await prisma.blogPost.deleteMany();
  
  // 2. Insert new posts
  for (const post of blogData) {
    await prisma.blogPost.create({
      data: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        imageUrl: post.imageUrl,
        date: post.date,
        readTime: post.readTime,
        tags: JSON.stringify(post.tags)
      }
    });
    console.log(`Uploaded: ${post.title}`);
  }
  
  console.log('--- SEEDING COMPLETE ---');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
