"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Site Config Actions
export async function updateSiteConfig(data: {
  heroTitle?: string;
  aboutText?: string;
  footerText?: string;
}) {
  const updated = await prisma.siteConfig.update({
    where: { id: 1 },
    data,
  });
  revalidatePath("/");
  return updated;
}

// Project Actions
export async function addProject(data: {
  title: string;
  description: string;
  techStack: string;
  imageUrl?: string;
  projectUrl?: string;
  repoUrl?: string;
}) {
  const project = await prisma.project.create({ data });
  revalidatePath("/projects");
  revalidatePath("/");
  return project;
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
  revalidatePath("/projects");
  revalidatePath("/");
}

// Skill Actions
export async function addSkill(data: {
  name: string;
  category: string;
  level: number;
}) {
  const skill = await prisma.skill.create({ data });
  revalidatePath("/profile");
  return skill;
}
