"use client";

import Link from "next/link";
import { EditableText } from "../EditableText";
import { EditableImage } from "../EditableImage";
import { updateProject } from "@/lib/actions";
import { SpotlightCard } from "../animations/SpotlightCard";
import { ScrambleText } from "../animations/ScrambleText";

export const ProjectsPreview = ({ projects, isEditable = false }: { projects: any[], isEditable?: boolean }) => {
  // Take up to 4 projects for the brick pattern preview (Big-Small, Small-Big)
  const featuredProjects = projects.slice(0, 4);

  const handleImageChange = async (project: any, newSrc: string) => {
     const nextScreenshots = [...project.screenshots];
     if (nextScreenshots.length > 0) {
       nextScreenshots[0] = { ...nextScreenshots[0], src: newSrc };
     } else {
       nextScreenshots.push({ src: newSrc, caption: "Main Screenshot" });
     }
     
     await updateProject(project.id, {
       ...project,
       description: JSON.stringify(project.description),
       techStack: JSON.stringify(project.techStack),
       features: JSON.stringify(project.features),
       screenshots: JSON.stringify(nextScreenshots),
     });
     window.location.reload();
  };

  return (
    <section className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#353534] pb-6 gap-4">
        <div>
          <p className="font-body text-[#00f4fe] text-xs uppercase tracking-[0.2em] mb-2 before:content-['//'] before:mr-2">Featured Work</p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-[#e5e2e1]">
            <ScrambleText text="DEPLOYED_APPLICATIONS" />
          </h2>
        </div>
        <Link href="/projects" className="font-label text-sm uppercase tracking-widest text-[#e7bcba] hover:text-[#00f4fe] transition-colors flex items-center gap-2 group">
          VIEW ALL <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {featuredProjects.map((project, idx) => {
          // Brick pattern: Row 1 = Big (8) + Small (4), Row 2 = Small (4) + Big (8)
          const isBig = idx === 0 || idx === 3;
          const spanClass = isBig ? "md:col-span-8" : "md:col-span-4";
          const spotlightColor = idx % 2 === 0 ? "rgba(0, 244, 254, 0.15)" : "rgba(217, 4, 41, 0.15)";
          const borderClass = isBig 
            ? "border-[#00f4fe]/20 hover:border-[#00f4fe]/50 neon-border-tl" 
            : "border-[#5d3f3d]/20 hover:border-[#d90429]/50";

          if (isBig) {
            return (
              <SpotlightCard 
                key={project.id || idx}
                spotlightColor={spotlightColor} 
                className={`${spanClass} h-[450px] glass-panel border ${borderClass} p-8 flex flex-col justify-end relative group transition-colors duration-500`}
              >
                <EditableImage 
                  src={project.screenshots?.[0]?.src || ""}
                  alt={project.title}
                  onChange={(src) => handleImageChange(project, src)}
                  isEditable={isEditable}
                  containerClassName="absolute inset-0 w-full h-full z-0"
                  className="object-cover opacity-30 mix-blend-overlay group-hover:opacity-50 transition-opacity duration-700"
                  priority={true}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/90 to-transparent z-10"></div>
                
                <div className="relative z-20 space-y-4 max-w-3xl">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-[#00f4fe] bg-[#00f4fe]/10 p-2 border border-[#00f4fe]/20">
                      {idx === 0 ? "rocket_launch" : "precision_manufacturing"}
                    </span>
                    <span className="font-body text-xs text-[#00f4fe] uppercase tracking-widest truncate">{project.tagline}</span>
                  </div>
                  <h3 className="font-headline text-2xl md:text-4xl font-bold text-[#e5e2e1] tracking-tighter uppercase">{project.title}</h3>
                  <p className="text-[#e7bcba] text-sm line-clamp-2">{project.summary}</p>
                  <Link href={`/projects/${project.slug}`} className="inline-block mt-4 font-label text-[10px] text-[#00f4fe] border-b border-[#00f4fe] hover:text-white hover:border-white transition-all uppercase tracking-[0.2em]">View Details</Link>
                </div>
              </SpotlightCard>
            );
          }

          // Small Card (4 cols)
          return (
            <SpotlightCard 
              key={project.id || idx}
              spotlightColor={spotlightColor} 
              className={`${spanClass} glass-panel border ${borderClass} p-8 flex flex-col justify-between relative group transition-colors duration-500 h-[450px]`}
            >
              <EditableImage 
                src={project.screenshots?.[0]?.src || ""}
                alt={project.title}
                onChange={(src) => handleImageChange(project, src)}
                isEditable={isEditable}
                containerClassName="absolute inset-0 w-full h-full z-0"
                className="object-cover opacity-20 mix-blend-multiply group-hover:opacity-40 transition-opacity duration-700"
                priority={true}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0e0e0e]/20 to-[#0e0e0e]/90 z-10"></div>
              
              <div className="relative z-20 flex justify-between items-start mb-12">
                <span className="material-symbols-outlined text-[#d90429] text-3xl">
                  {idx === 1 ? "shopping_bag" : "account_balance"}
                </span>
                {project.codeName && (
                  <span className="font-mono text-[9px] text-[#00f4fe] bg-black/40 px-2 py-0.5 border border-white/5 uppercase tracking-widest">
                    {project.codeName}
                  </span>
                )}
              </div>

              <div className="relative z-20">
                <h3 className="font-headline text-xl font-bold text-[#e5e2e1] tracking-tight mb-2 truncate uppercase">{project.title}</h3>
                <p className="font-body text-xs text-[#e7bcba] opacity-80 leading-relaxed mb-6 line-clamp-3">{project.summary}</p>
                <Link href={`/projects/${project.slug}`} className="font-label text-xs uppercase tracking-widest text-[#00f4fe] hover:text-white flex items-center gap-2 group/btn">
                  EXPLORE <span className="material-symbols-outlined text-xs group-hover/btn:translate-x-1 transition-all">arrow_forward</span>
                </Link>
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </section>
  );
};
