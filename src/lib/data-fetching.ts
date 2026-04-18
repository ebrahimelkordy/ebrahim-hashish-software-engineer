import prisma from './prisma';
import { mockPortfolioData } from '@/data/mock-portfolio';
import { projects as mockProjects } from '@/data/projects';

export interface Skill {
  id: string;
  name: string;
  category: string;
  order: number;
}

export type GroupedSkills = {
  category: string;
  items: { id: string; name: string }[];
}[];

export async function getPortfolioData() {
  try {
    // Attempt to fetch from DB
    const [hero, about, dbSkills, experiences, studies, posts, dbProjects, certificates] = await Promise.all([
      prisma.hero.findFirst(),
      prisma.about.findFirst(),
      prisma.skill.findMany({ orderBy: { order: 'asc' } }),
      prisma.experience.findMany({ orderBy: { order: 'asc' } }),
      prisma.study.findMany({ orderBy: { order: 'asc' } }),
      prisma.blogPost.findMany({ orderBy: [{ isPinned: 'desc' }, { order: 'asc' }] }),
      prisma.project.findMany({ orderBy: [{ isPinned: 'desc' }, { order: 'asc' }] }),
      prisma.certificate.findMany({ orderBy: { order: 'asc' } })
    ]);

    // Group skills locally if they exist in DB
    let groupedSkills: GroupedSkills = [];
    if (dbSkills.length > 0) {
      const categories = Array.from(new Set(dbSkills.map((s: any) => s.category))) as string[];
      groupedSkills = categories.map(cat => ({
        category: cat,
        items: dbSkills.filter((s: any) => s.category === cat).map((s: any) => ({ id: s.id, name: s.name }))
      }));
    }

    // Format DB Projects
    const projects = dbProjects.map((p: any) => ({
      ...p,
      description: JSON.parse(p.description || '[]'),
      techStack: JSON.parse(p.techStack || '[]'),
      features: JSON.parse(p.features || '[]'),
      screenshots: JSON.parse(p.screenshots || '[]'),
    }));

    return {
      hero: hero || mockPortfolioData.hero,
      about: about || mockPortfolioData.about,
      skills: groupedSkills.length > 0 ? groupedSkills : mockPortfolioData.skills,
      experiences: experiences.length > 0 ? experiences : mockPortfolioData.experiences,
      studies: studies.length > 0 ? studies : mockPortfolioData.studies,
      certificates: certificates.length > 0 ? certificates : [],
      posts: posts.length > 0 ? posts.map((p: any) => ({ ...p, tags: JSON.parse(p.tags || '[]') })) : mockPortfolioData.posts,
      projects: projects.length > 0 ? projects : mockProjects,
      contact: mockPortfolioData.contact,
      isUsingMock: !hero && dbSkills.length === 0,
    };
  } catch (error) {
    console.error("Database unavailable. Falling back to mock data:", error);
    return {
      hero: mockPortfolioData.hero,
      about: mockPortfolioData.about,
      skills: mockPortfolioData.skills,
      experiences: mockPortfolioData.experiences,
      studies: mockPortfolioData.studies,
      certificates: [],
      posts: mockPortfolioData.posts,
      projects: mockProjects,
      contact: mockPortfolioData.contact,
      isUsingMock: true,
    };
  }
}
export async function getProjectData(slug: string) {
  try {
    const project = await prisma.project.findFirst({ where: { slug } });
    if (!project) {
      const mock = mockProjects.find(p => p.slug === slug);
      if (!mock) return null;
      return mock;
    }

    return {
      ...project,
      description: JSON.parse(project.description || '[]'),
      techStack: JSON.parse(project.techStack || '[]'),
      features: JSON.parse(project.features || '[]'),
      screenshots: JSON.parse(project.screenshots || '[]'),
    };
  } catch (error) {
    console.error(`Error fetching project ${slug}:`, error);
    return mockProjects.find(p => p.slug === slug) || null;
  }
}
