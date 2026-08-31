import fs from 'fs';
import path from 'path';
import prisma from '../lib/prisma';
import { projects } from '../data/projects';

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "drcfpswre";
const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ml_default";

async function uploadLocalImage(localPath: string): Promise<string> {
  const fullPath = path.join(process.cwd(), 'public', localPath.replace(/^\//, ''));
  if (!fs.existsSync(fullPath)) {
    console.error(`File not found: ${fullPath}`);
    return localPath;
  }

  const fileBuffer = fs.readFileSync(fullPath);
  const base64Data = fileBuffer.toString('base64');
  const ext = path.extname(fullPath).toLowerCase();
  const mimeType = ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : 'image/jpeg';
  const dataUri = `data:${mimeType};base64,${base64Data}`;

  const formData = new FormData();
  formData.append('file', dataUri);
  formData.append('upload_preset', uploadPreset);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Cloudinary upload failed for ${localPath}: ${errText}`);
  }

  const data = await res.json();
  console.log(`✓ Uploaded ${localPath} -> ${data.secure_url}`);
  return data.secure_url;
}

async function main() {
  console.log('--- UPLOADING LOCAL ASSETS TO CLOUDINARY ---');
  
  const urlMap: Record<string, string> = {};

  // Find all local image paths in projects
  for (const project of projects) {
    for (const shot of project.screenshots) {
      if (shot.src.startsWith('/projects/') && !urlMap[shot.src]) {
        try {
          const cloudUrl = await uploadLocalImage(shot.src);
          urlMap[shot.src] = cloudUrl;
        } catch (e) {
          console.error(e);
        }
      }
    }
  }

  console.log('\n--- UPLOAD MAPPING SUMMARY ---');
  console.log(JSON.stringify(urlMap, null, 2));

  // Replace screenshot URLs in projects and update database
  for (const project of projects) {
    const updatedScreenshots = project.screenshots.map((s: any) => ({
      ...s,
      src: urlMap[s.src] || s.src
    }));

    // Update in data/projects.ts structure
    project.screenshots = updatedScreenshots;

    const dataToSave = {
      slug: project.slug,
      codeName: project.codeName,
      title: project.title,
      tagline: project.tagline,
      summary: project.summary,
      description: JSON.stringify(project.description),
      techStack: JSON.stringify(project.techStack),
      features: JSON.stringify(project.features),
      screenshots: JSON.stringify(updatedScreenshots),
      liveUrl: project.liveUrl || "",
      repoUrl: project.repoUrl || "",
      status: project.status,
      year: project.year,
      isPinned: Boolean(project.isPinned),
      order: project.order ?? 0,
    };

    const existing = await prisma.project.findFirst({
      where: {
        OR: [
          { slug: project.slug },
          { codeName: project.codeName },
          { title: project.title }
        ]
      }
    });

    if (existing) {
      console.log(`Updating DB project: ${project.title} (${existing.id})`);
      await prisma.project.update({
        where: { id: existing.id },
        data: dataToSave
      });
    } else {
      console.log(`Creating DB project: ${project.title}`);
      await prisma.project.create({
        data: dataToSave
      });
    }
  }

  console.log('--- ALL ASSETS UPLOADED AND DB SYNCHRONIZED ---');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
