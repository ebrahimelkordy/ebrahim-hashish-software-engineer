import { getProjectData, getPortfolioData } from "@/lib/data-fetching";
import { notFound } from "next/navigation";
import { ProjectDetailClient } from "@/components/sections/ProjectDetailClient";
import { projects as mockProjects } from "@/data/projects";

export function generateStaticParams() {
  return mockProjects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({ params, searchParams }: { 
  params: Promise<{ slug: string }>,
  searchParams: Promise<{ edit?: string }>
}) {
  const { slug } = await params;
  const { edit } = await searchParams;
  const data = await getPortfolioData();
  const project = await getProjectData(slug);
  
  if (!project) return notFound();

  const isEditable = edit === "true";

  return <ProjectDetailClient project={project} isEditable={isEditable} cvUrl={data.about.cvUrl} />;
}
