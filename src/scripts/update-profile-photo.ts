import fs from 'fs';
import path from 'path';
import prisma from '../lib/prisma';

async function main() {
  const cdnUrl = "https://res.cloudinary.com/drcfpswre/image/upload/v1788211139/zz6ychzibw7jrihuuwdw.jpg";
  console.log('Setting all Hero and About records in DB to:', cdnUrl);

  const heroCount = await prisma.hero.updateMany({
    data: { imageUrl: cdnUrl }
  });
  console.log(`Updated ${heroCount.count} Hero records.`);

  const aboutCount = await prisma.about.updateMany({
    data: { imageUrl: cdnUrl }
  });
  console.log(`Updated ${aboutCount.count} About records.`);

  const currentHero = await prisma.hero.findFirst();
  console.log('Current Hero record in DB:', currentHero);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
