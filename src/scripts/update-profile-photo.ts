import fs from 'fs';
import path from 'path';
import prisma from '../lib/prisma';
import { mockPortfolioData } from '../data/mock-portfolio';

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "drcfpswre";
const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ml_default";

async function main() {
  console.log('--- UPDATING PROFILE PHOTO ---');

  const uploadedPath = "C:\\Users\\DANTECH\\.gemini\\antigravity-ide\\brain\\0bd8c0d9-8773-465d-aaf2-ed13eaf1bc6e\\.user_uploaded\\media_1788210424818.jpg";

  if (!fs.existsSync(uploadedPath)) {
    throw new Error(`Uploaded file not found at: ${uploadedPath}`);
  }

  // 1. Copy locally to public/profile.jpg and public/about-portrait.jpg
  const publicProfile = path.join(process.cwd(), 'public', 'profile.jpg');
  const publicAbout = path.join(process.cwd(), 'public', 'about-portrait.jpg');

  fs.copyFileSync(uploadedPath, publicProfile);
  fs.copyFileSync(uploadedPath, publicAbout);
  console.log('✓ Copied to public/profile.jpg and public/about-portrait.jpg');

  // 2. Upload to Cloudinary
  const fileBuffer = fs.readFileSync(uploadedPath);
  const base64Data = fileBuffer.toString('base64');
  const dataUri = `data:image/jpeg;base64,${base64Data}`;

  const formData = new FormData();
  formData.append('file', dataUri);
  formData.append('upload_preset', uploadPreset);

  console.log('Uploading new photo to Cloudinary...');
  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Cloudinary upload failed: ${errText}`);
  }

  const cldData = await res.json();
  const cdnUrl = cldData.secure_url;
  console.log(`✓ Cloudinary Uploaded successfully: ${cdnUrl}`);

  // 3. Update Database (Hero & About)
  const hero = await prisma.hero.findFirst();
  if (hero) {
    await prisma.hero.update({
      where: { id: hero.id },
      data: { imageUrl: cdnUrl }
    });
    console.log(`✓ Updated Hero imageUrl in DB to: ${cdnUrl}`);
  } else {
    await prisma.hero.create({
      data: {
        firstName: "EBRAHIM",
        lastName: "HASHISH",
        title: "EBRAHIM\nCODE\nHASHISH",
        subtitle: "Full-Stack Identity Initiated",
        description: "Full-Stack Software Engineer building mission-critical web applications. Specializing in high-performance Node.js backends and pixel-perfect Next.js architectures.",
        imageUrl: cdnUrl
      }
    });
    console.log(`✓ Created Hero record in DB with imageUrl: ${cdnUrl}`);
  }

  const about = await prisma.about.findFirst();
  if (about) {
    await prisma.about.update({
      where: { id: about.id },
      data: { imageUrl: cdnUrl }
    });
    console.log(`✓ Updated About imageUrl in DB to: ${cdnUrl}`);
  } else {
    await prisma.about.create({
      data: {
        firstName: "EBRAHIM",
        lastName: "HASHISH",
        bio: "Building end-to-end web architectures. Specializing in high-performance Node.js REST APIs, database design, and aggressive, state-of-the-art Next.js React frontends. Delivering production-ready products that perform perfectly under load.",
        role: "FULL_STACK",
        imageUrl: cdnUrl,
        cvUrl: "/cv.pdf"
      }
    });
    console.log(`✓ Created About record in DB with imageUrl: ${cdnUrl}`);
  }

  console.log('--- PROFILE PHOTO UPDATE COMPLETE ---');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
