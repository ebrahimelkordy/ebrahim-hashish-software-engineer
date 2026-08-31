import prisma from '../lib/prisma';
import { projects } from '../data/projects';

async function main() {
  console.log('--- SYNCING PORTFOLIO PROJECTS TO DATABASE ---');

  for (const p of projects) {
    const dataToSave = {
      slug: p.slug,
      codeName: p.codeName,
      title: p.title,
      tagline: p.tagline,
      summary: p.summary,
      description: JSON.stringify(p.description),
      techStack: JSON.stringify(p.techStack),
      features: JSON.stringify(p.features),
      screenshots: JSON.stringify(p.screenshots),
      liveUrl: p.liveUrl || "",
      repoUrl: p.repoUrl || "",
      status: p.status,
      year: p.year,
      isPinned: Boolean(p.isPinned),
      order: p.order ?? 0,
    };

    const existing = await prisma.project.findFirst({
      where: {
        OR: [
          { slug: p.slug },
          { codeName: p.codeName },
          { title: p.title }
        ]
      }
    });

    if (existing) {
      console.log(`Updating project: ${p.title} (ID: ${existing.id}) [Pinned: ${p.isPinned}, Order: ${p.order}]`);
      await prisma.project.update({
        where: { id: existing.id },
        data: dataToSave
      });
    } else {
      console.log(`Creating project: ${p.title} [Pinned: ${p.isPinned}, Order: ${p.order}]`);
      await prisma.project.create({
        data: dataToSave
      });
    }
  }

  // Double check all unpinned projects (Nibras, Soccer, Almutasim)
  await prisma.project.updateMany({
    where: {
      slug: {
        in: ['nibras-lms-enterprise', 'soccer-street-backend-refactor', 'new-project-1776615298287', 'zaad-ecommerce-platform']
      }
    },
    data: {
      isPinned: false
    }
  });

  const finalProjects = await prisma.project.findMany({
    orderBy: [{ isPinned: 'desc' }, { order: 'asc' }]
  });

  console.log('\n=== FINAL ORDER IN DB (Top 4 shown) ===');
  finalProjects.forEach((p: any, idx: number) => {
    console.log(`${idx + 1}. [${p.isPinned ? 'PINNED' : 'UNPINNED'}] ${p.title} (order: ${p.order}, liveUrl: "${p.liveUrl}")`);
  });

  console.log('--- PORTFOLIO SYNC COMPLETED ---');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
