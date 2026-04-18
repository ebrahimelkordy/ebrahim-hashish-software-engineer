"use server";

import prisma from './prisma';
import { revalidatePath } from 'next/cache';

export async function updateHero(data: Partial<{ title: string; subtitle: string; description: string; imageUrl: string; firstName: string; lastName: string }>) {
  try {
    const existing = await prisma.hero.findFirst();
    if (existing) {
      const { id: _, updatedAt: __, ...cleanData } = data as any;
      await prisma.hero.update({ 
        where: { id: existing.id }, 
        data: cleanData 
      });
    } else {
      await prisma.hero.create({ data: data as any });
    }
    revalidatePath('/');
    revalidatePath('/profile');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error("Error updating Hero:", error);
    return { success: false, error: "Failed to update db" };
  }
}

export async function updateAbout(data: Partial<{ bio: string; role: string; firstName: string; lastName: string; imageUrl?: string }>) {
  try {
    const existing = await prisma.about.findFirst();
    if (existing) {
      const { id: _, updatedAt: __, ...cleanData } = data as any;
      await prisma.about.update({ 
        where: { id: existing.id }, 
        data: cleanData 
      });
    } else {
      await prisma.about.create({ data: data as any });
    }
    revalidatePath('/');
    revalidatePath('/profile');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error("Error updating About:", error);
    return { success: false, error: "Failed to update db" };
  }
}

// --- SKILLS ---
export async function addSkill(data: { name: string; category: string; order: number }) {
  await prisma.skill.create({ data });
  revalidatePath('/profile');
  revalidatePath('/dashboard');
  return { success: true };
}

export async function updateSkill(id: string, data: { name?: string; category?: string; order?: number }) {
  await prisma.skill.update({ where: { id }, data });
  revalidatePath('/profile');
  revalidatePath('/dashboard');
  return { success: true };
}

export async function deleteSkill(id: string) {
  await prisma.skill.delete({ where: { id } });
  revalidatePath('/profile');
  revalidatePath('/dashboard');
  return { success: true };
}

// --- EXPERIENCE ---
export async function addExperience(data: { title: string; company: string; period: string; description: string; order: number }) {
  await prisma.experience.create({ data });
  revalidatePath('/profile');
  revalidatePath('/dashboard');
  return { success: true };
}

export async function updateExperience(id: string, data: any) {
  await prisma.experience.update({ where: { id }, data });
  revalidatePath('/profile');
  revalidatePath('/dashboard');
  return { success: true };
}

export async function deleteExperience(id: string) {
  await prisma.experience.delete({ where: { id } });
  revalidatePath('/profile');
  revalidatePath('/dashboard');
  return { success: true };
}

// --- STUDIES ---
export async function addStudy(data: { degree: string; institution: string; year: string; description: string; imageUrl?: string; order: number }) {
  await prisma.study.create({ data });
  revalidatePath('/profile');
  revalidatePath('/dashboard');
  return { success: true };
}

export async function updateStudy(id: string, data: any) {
  await prisma.study.update({ where: { id }, data });
  revalidatePath('/profile');
  revalidatePath('/dashboard');
  return { success: true };
}

export async function deleteStudy(id: string) {
  await prisma.study.delete({ where: { id } });
  revalidatePath('/profile');
  revalidatePath('/dashboard');
  return { success: true };
}

// --- CERTIFICATES ---
export async function addCertificate(data: { title: string; issuer: string; date: string; imageUrl: string; order: number }) {
  await prisma.certificate.create({ data });
  revalidatePath('/profile');
  revalidatePath('/dashboard');
  return { success: true };
}

export async function deleteCertificate(id: string) {
  await prisma.certificate.delete({ where: { id } });
  revalidatePath('/profile');
  revalidatePath('/dashboard');
  return { success: true };
}

export async function updateCertificate(id: string, data: any) {
  await prisma.certificate.update({ where: { id }, data });
  revalidatePath('/profile');
  revalidatePath('/dashboard');
  return { success: true };
}

// --- PROJECTS ---
export async function updateProject(id: string | undefined, data: any) {
  const formatted = { 
    ...data,
    id: undefined, // Let prisma handle ID or use where
  };

  // Convert stringified JSONs back to actual objects if needed, 
  // but Prisma expects JSON strings for these fields based on current flow?
  // Actually, in schema.prisma they are Strings. So we keep them as strings.

  try {
    // If id starts with 'mock-' or is undefined, we use slug as unique identifier
    const where = (id && !id.startsWith('mock-')) ? { id } : { slug: data.slug };

    const project = await prisma.project.upsert({
      where,
      update: { ...formatted, id: undefined },
      create: { ...formatted, id: undefined },
    });

    revalidatePath('/');
    revalidatePath('/projects');
    revalidatePath(`/projects/${data.slug}`);
    revalidatePath('/dashboard');
    return { success: true, project };
  } catch (error) {
    console.error("Project update failed:", error);
    return { success: false, error: "Failed to save project" };
  }
}

export async function addProject() {
  const slug = `new-project-${Date.now()}`;
  await prisma.project.create({
    data: {
      slug,
      codeName: "PRJ_NEW",
      title: "NEW_APP_UNIT",
      tagline: "Brief technical tagline",
      summary: "Short overview of the project and its goals.",
      description: JSON.stringify(["Paragraph 1", "Paragraph 2"]),
      techStack: JSON.stringify([{ category: "Frontend", items: ["React"] }]),
      features: JSON.stringify(["Feature 1", "Feature 2"]),
      screenshots: JSON.stringify([]),
      status: "DEVELOPMENT",
      year: new Date().getFullYear().toString(),
    }
  });
  revalidatePath('/projects');
  revalidatePath('/dashboard');
  return { success: true };
}

export async function deleteProject(id: string) {
  // If it's a mock project, it's not in the DB, so we just return success
  if (id.startsWith('mock-')) return { success: true };
  
  await prisma.project.delete({ where: { id } });
  revalidatePath('/projects');
  revalidatePath('/admin');
  return { success: true };
}

export async function toggleProjectPin(id: string, isPinned: boolean) {
  await prisma.project.update({ where: { id }, data: { isPinned } });
  revalidatePath('/');
  revalidatePath('/dashboard');
  return { success: true };
}

// --- POSTS ---
export async function addBlogPost() {
  await prisma.blogPost.create({
    data: {
      title: "NEW_TECHNICAL_LOG",
      excerpt: "Technical overview of the subject matter discussed in this entry.",
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: "5 MIN READ",
      tags: JSON.stringify(["TECH", "UNTAGGED"]),
      isPinned: false,
      order: 0
    }
  });
  revalidatePath('/');
  revalidatePath('/dashboard');
  return { success: true };
}

export async function deleteBlogPost(id: string) {
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath('/');
  revalidatePath('/dashboard');
  return { success: true };
}

export async function updateBlogPost(id: string, data: any) {
  const formatted = { ...data };
  if (data.tags && Array.isArray(data.tags)) {
    formatted.tags = JSON.stringify(data.tags);
  }
  
  await prisma.blogPost.update({ where: { id }, data: formatted });
  revalidatePath('/');
  revalidatePath('/dashboard');
  return { success: true };
}

export async function togglePostPin(id: string, isPinned: boolean) {
  await prisma.blogPost.update({ where: { id }, data: { isPinned } });
  revalidatePath('/');
  revalidatePath('/dashboard');
  return { success: true };
}

// --- CONTACT & SOCIALS ---
export async function updateContact(data: { email: string; github: string; linkedin: string; whatsapp: string }) {
  try {
    const existing = await prisma.contact.findFirst();
    if (existing) {
      await prisma.contact.update({ where: { id: existing.id }, data });
    } else {
      await prisma.contact.create({ data });
    }
    revalidatePath('/');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error("Error updating Contact:", error);
    return { success: false, error: "Failed to update db" };
  }
}

// --- EMAIL DELIVERY (RESEND) ---
import { Resend } from 'resend';

export async function sendEmail(formData: { name: string; email: string; message: string }) {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey || resendApiKey === 're_...') {
    return { success: false, error: "Email provider not configured. Please add RESEND_API_KEY to .env" };
  }

  try {
    const resend = new Resend(resendApiKey);
    // Fetch recipient from DB, fallback to env or default
    const contact = await prisma.contact.findFirst();
    const toEmail = contact?.email || process.env.ADMIN_EMAIL || "hello@example.com";

    const { error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [toEmail],
      subject: `[SIGNAL] New Message from ${formData.name}`,
      replyTo: formData.email,
      html: `
        <div style="background-color: #0e0e0e; color: #e5e2e1; font-family: 'JetBrains Mono', monospace; padding: 40px; border: 1px solid #1c1b1b; max-width: 600px; margin: 0 auto;">
          <div style="border-bottom: 2px solid #d90429; padding-bottom: 20px; margin-bottom: 30px;">
            <h1 style="color: #d90429; font-size: 24px; text-transform: uppercase; margin: 0; letter-spacing: 2px;">INCOMING_SIGNAL_DETECTION</h1>
            <p style="color: #666; font-size: 10px; margin-top: 5px;">SOURCE_PORT: ${formData.email}</p>
          </div>
          
          <div style="margin-bottom: 30px;">
            <p style="color: #00f4fe; font-size: 12px; text-transform: uppercase;">// TRANSMITTER_ID</p>
            <p style="font-size: 18px; margin: 5px 0 0 20px; color: #fff;">${formData.name}</p>
          </div>

          <div style="margin-bottom: 30px;">
            <p style="color: #00f4fe; font-size: 12px; text-transform: uppercase;">// DATA_PACKET_CONTENT</p>
            <div style="background: #151515; padding: 20px; border-left: 3px solid #d90429; font-size: 14px; line-height: 1.6; color: #e7bcba;">
              ${formData.message.replace(/\n/g, '<br/>')}
            </div>
          </div>

          <div style="border-top: 1px solid #1c1b1b; padding-top: 20px; font-size: 10px; color: #555;">
            <p>END_OF_TRANSMISSION</p>
            <p>System v1.0.42 // Secure Connection Active</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error("Email send failed:", err);
    return { success: false, error: "Internal Server Error" };
  }
}

// --- GENERIC ORDERING ---
export async function updateOrder(model: 'skill' | 'experience' | 'study' | 'certificate' | 'project' | 'blogPost', id: string, order: number) {
  // @ts-ignore
  await prisma[model].update({ where: { id }, data: { order } });
  revalidatePath('/');
  revalidatePath('/profile');
  revalidatePath('/projects');
  revalidatePath('/dashboard');
  return { success: true };
}
