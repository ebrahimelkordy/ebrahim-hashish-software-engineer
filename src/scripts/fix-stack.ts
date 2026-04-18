import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('--- STARTING TARGETED STACK FIX ---');

  // 1. Fix Skills categorization
  const skillsToBackend = ['Socket.IO', 'Stripe / Payment Integration', 'Stripe'];
  const skillsToDevOps = ['Docker'];

  console.log('Updating Skill table...');
  await prisma.skill.updateMany({
    where: { name: { in: skillsToBackend } },
    data: { category: 'Backend' }
  });

  await prisma.skill.updateMany({
    where: { name: { in: skillsToDevOps } },
    data: { category: 'DevOps / Tools' }
  });

  // 2. Fix Project TechStack JSONs
  console.log('Updating Project techStack JSONs...');
  const projects = await prisma.project.findMany();

  for (const project of projects) {
    try {
      let techStack = JSON.parse(project.techStack || '[]');
      let modified = false;

      // Logic to move items between categories in the JSON
      // This is more complex since it's nested JSON. 
      // We will ensure Socket.IO and Stripe are in Backend if they exist in the techStack.
      
      const backendCategory = techStack.find((c: any) => c.category === 'Backend');
      const devOpsCategory = techStack.find((c: any) => c.category === 'DevOps / Tools' || c.category === 'DevOps');

      // Move Socket.IO/Stripe to Backend across all projects
      const itemsToMoveToBackend = ['Socket.IO', 'Stripe', 'Stripe API', 'Stripe / Payment Integration'];
      
      // Remove from other categories and collect found items
      let foundItems: string[] = [];
      techStack = techStack.map((cat: any) => {
        const initialCount = cat.items.length;
        cat.items = cat.items.filter((item: string) => {
          if (itemsToMoveToBackend.includes(item)) {
            if (!foundItems.includes(item)) foundItems.push(item);
            return false;
          }
          return true;
        });
        if (cat.items.length !== initialCount) modified = true;
        return cat;
      });

      if (foundItems.length > 0) {
        if (backendCategory) {
          backendCategory.items = Array.from(new Set([...backendCategory.items, ...foundItems]));
        } else {
          techStack.push({ category: 'Backend', items: foundItems });
        }
        modified = true;
      }

      if (modified) {
        await prisma.project.update({
          where: { id: project.id },
          data: { techStack: JSON.stringify(techStack) }
        });
        console.log(`Updated project: ${project.title}`);
      }
    } catch (e) {
      console.error(`Error processing techStack for project ${project.title}:`, e);
    }
  }

  console.log('--- STACK FIX COMPLETED ---');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
