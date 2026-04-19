import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const blogData = [
  {
    "title": "REFACTORING A REAL-WORLD MONOLITH (SOCCER STREET)",
    "slug": "soccer-street-refactoring-case-study",
    "excerpt": "How I transformed a 1500+ line monolithic backend into a scalable modular architecture without breaking production.",
    "content": "In this case study, I walk through a real-world backend transformation.\n\n### The Challenge\nA legacy system built in a single file with tightly coupled logic.\n\n### The Process\n- Extracted Controllers, Services, and Models\n- Decoupled business logic from routing\n- Improved code readability and maintainability\n\n### The Result\n- 50% improvement in maintainability\n- Clean, scalable architecture\n- Zero downtime during migration\n\nThis is what real backend engineering looks like — not just writing code, but restructuring systems for long-term growth.",
    "imageUrl": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop",
    "date": "April 12, 2026",
    "readTime": "8 MIN READ",
    "tags": ["CASE STUDY", "REFACTORING", "ARCHITECTURE"]
  },
  {
    "title": "BUILDING A SCALABLE E-COMMERCE SYSTEM (ZAAD)",
    "slug": "zaad-ecommerce-architecture",
    "excerpt": "A deep dive into building a production-ready e-commerce backend with payments, caching, and performance optimization.",
    "content": "Zaad was built to handle real-world e-commerce challenges.\n\n### Core Features\n- Secure Stripe payment integration\n- Redis caching for sessions\n- Optimized database queries\n\n### Challenges\nHandling performance under load while maintaining security.\n\n### Solutions\n- Introduced caching layer\n- Structured backend with modular architecture\n- Secured payment workflows\n\n### Outcome\nFast, secure, and scalable e-commerce platform ready for growth.",
    "imageUrl": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2670&auto=format&fit=crop",
    "date": "April 11, 2026",
    "readTime": "7 MIN READ",
    "tags": ["E-COMMERCE", "CASE STUDY", "PERFORMANCE"]
  },
  {
    "title": "DESIGNING A MULTI-TENANT LMS SYSTEM",
    "slug": "multi-tenant-lms-architecture",
    "excerpt": "How I architected a flexible LMS platform supporting multiple academies, instructors, and role-based systems.",
    "content": "Modern LMS platforms need flexibility.\n\n### Requirements\n- Multi-tenant architecture\n- Role-Based Access Control\n- Complex relationships between courses and users\n\n### Implementation\n- Designed scalable MongoDB schemas\n- Built RBAC system\n- Created modular backend structure\n\n### Result\nA flexible platform capable of serving multiple institutions with isolated data and scalable performance.",
    "imageUrl": "https://images.unsplash.com/photo-1584697964403-5c76f1a6d7c2?q=80&w=2670&auto=format&fit=crop",
    "date": "April 9, 2026",
    "readTime": "7 MIN READ",
    "tags": ["LMS", "ARCHITECTURE", "MULTI-TENANT"]
  },
  {
    "title": "DESIGNING CLEAN BACKEND ARCHITECTURES",
    "slug": "clean-backend-architecture",
    "excerpt": "Why most backend systems fail at scale, and how proper separation of concerns can save your project.",
    "content": "A well-structured backend is not a luxury — it's a necessity.\n\n### The Problem\nMost projects start simple, but quickly turn into unmaintainable monoliths.\n\n### The Solution\nAdopting a layered architecture:\n- Controllers → handle requests\n- Services → business logic\n- Models/Repositories → data access\n\n### The Outcome\nClean, testable, and scalable systems that survive real-world pressure.",
    "imageUrl": "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=2670&auto=format&fit=crop",
    "date": "April 10, 2026",
    "readTime": "7 MIN READ",
    "tags": ["BACKEND", "ARCHITECTURE", "SCALABILITY"]
  },
  {
    "title": "FROM MONOLITH TO MODULAR SYSTEM",
    "slug": "monolith-to-modular",
    "excerpt": "A practical guide on refactoring large messy codebases into scalable modular systems.",
    "content": "Refactoring isn't just about clean code — it's about survival.\n\n### Step 1\nIdentify tightly coupled logic.\n\n### Step 2\nExtract reusable services.\n\n### Step 3\nSeparate concerns into modules.\n\n### Result\nImproved performance, maintainability, and developer experience.",
    "imageUrl": "https://images.unsplash.com/photo-1581093588401-12b3b1a9a3d6?q=80&w=2670&auto=format&fit=crop",
    "date": "April 8, 2026",
    "readTime": "6 MIN READ",
    "tags": ["REFACTORING", "ARCHITECTURE", "NODEJS"]
  },
  {
    "title": "BUILDING HIGH-PERFORMANCE APIs",
    "slug": "high-performance-apis",
    "excerpt": "Techniques to optimize API performance using caching, indexing, and efficient query design.",
    "content": "Performance is not optional in modern applications.\n\n### Key Techniques\n- Redis caching\n- Database indexing\n- Pagination strategies\n\n### Result\nFaster response times and reduced server load.",
    "imageUrl": "https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=2670&auto=format&fit=crop",
    "date": "April 6, 2026",
    "readTime": "5 MIN READ",
    "tags": ["API", "PERFORMANCE", "REDIS"]
  },
  {
    "title": "SCALING REAL-TIME SYSTEMS",
    "slug": "scaling-realtime-systems",
    "excerpt": "How to design real-time applications that handle thousands of concurrent users efficiently.",
    "content": "Real-time apps require a different mindset.\n\n### Challenges\n- Concurrent connections\n- Event synchronization\n\n### Solutions\n- Redis Pub/Sub\n- Horizontal scaling\n- Efficient event handling\n\n### Outcome\nStable and scalable real-time systems.",
    "imageUrl": "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=2670&auto=format&fit=crop",
    "date": "April 5, 2026",
    "readTime": "6 MIN READ",
    "tags": ["REALTIME", "SOCKET.IO", "SCALING"]
  },
  {
    "title": "SECURING YOUR BACKEND LIKE A PRO",
    "slug": "backend-security-best-practices",
    "excerpt": "Essential security practices every backend engineer must implement.",
    "content": "Security is often ignored — until it's too late.\n\n### Must-Haves\n- JWT authentication\n- HttpOnly cookies\n- CSRF protection\n\n### Advanced\n- Rate limiting\n- Input validation\n\n### Result\nA secure and resilient system.",
    "imageUrl": "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=2670&auto=format&fit=crop",
    "date": "April 3, 2026",
    "readTime": "7 MIN READ",
    "tags": ["SECURITY", "JWT", "BACKEND"]
  },
  {
    "title": "DESIGNING DATABASES FOR SCALE",
    "slug": "database-design-for-scale",
    "excerpt": "How to design MongoDB schemas that handle complex relationships efficiently.",
    "content": "Bad database design kills performance.\n\n### Key Concepts\n- Embedding vs Referencing\n- Indexing strategy\n- Data normalization\n\n### Outcome\nEfficient queries and scalable systems.",
    "imageUrl": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=2670&auto=format&fit=crop",
    "date": "April 2, 2026",
    "readTime": "6 MIN READ",
    "tags": ["DATABASE", "MONGODB", "SCALABILITY"]
  },
  {
    "title": "BUILDING A MODERN AUTH SYSTEM",
    "slug": "modern-auth-system",
    "excerpt": "Implementing secure and scalable authentication using JWT and role-based access control.",
    "content": "Authentication is the gateway to your system.\n\n### Core\n- JWT tokens\n- Refresh tokens\n\n### Access Control\n- RBAC implementation\n\n### Result\nSecure and flexible auth system.",
    "imageUrl": "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=2670&auto=format&fit=crop",
    "date": "April 1, 2026",
    "readTime": "6 MIN READ",
    "tags": ["AUTH", "JWT", "RBAC"]
  },
  {
    "title": "REDIS: THE SECRET WEAPON",
    "slug": "redis-caching-strategies",
    "excerpt": "How Redis can drastically improve performance in high-traffic applications.",
    "content": "Redis is not just a cache — it's a performance engine.\n\n### Use Cases\n- Caching\n- Session storage\n- Rate limiting\n\n### Result\nMassive performance improvements.",
    "imageUrl": "https://images.unsplash.com/photo-1581090700227-4c4d06b6c6b0?q=80&w=2670&auto=format&fit=crop",
    "date": "March 30, 2026",
    "readTime": "5 MIN READ",
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
