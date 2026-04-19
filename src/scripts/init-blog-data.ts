import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('--- INITIALIZING BLOG DATA ---');

  const posts = await prisma.blogPost.findMany();

  for (const post of posts) {
    if (!post.slug) {
      const slug = post.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
      await prisma.blogPost.update({
        where: { id: post.id },
        data: { 
          slug: slug || `post-${post.id}`,
          content: post.excerpt + "\n\nThis is a sample full content for the post. We will be able to edit this from the admin panel soon.",
          imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2669&auto=format&fit=crop"
        }
      });
      console.log(`Initialized post: ${post.title}`);
    }
  }

  console.log('--- BLOG DATA INITIALIZED ---');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
