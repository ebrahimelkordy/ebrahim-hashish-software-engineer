"use client";

import Link from "next/link";
import { EditableText } from "../EditableText";
import { EditableImage } from "../EditableImage";
import { updateProject } from "@/lib/actions";
import { SpotlightCard } from "../animations/SpotlightCard";

export const ProjectsGridSection = ({ 
  projects, 
  isEditable = false,
  onTogglePin,
  onUpdateOrder,
  onDelete
}: { 
  projects: any[], 
  isEditable?: boolean,
  onTogglePin?: (id: string, pin: boolean) => void,
  onUpdateOrder?: (id: string, order: number) => void,
  onDelete?: (id: string) => void
}) => {

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
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 relative z-10 pb-12 w-full max-w-full overflow-hidden px-1 sm:px-0">
      {projects.map((project, idx) => {
        const spanClass = idx === 0 ? "md:col-span-8" : "md:col-span-4";
        const minHeight = idx === 0 ? "min-h-[320px] md:min-h-[450px]" : "min-h-[260px] md:min-h-[350px]";

        return (
          <SpotlightCard spotlightColor={idx % 2 === 0 ? "rgba(0, 244, 254, 0.1)" : "rgba(217, 4, 41, 0.1)"} key={project.id} className={`${spanClass} ${minHeight} glass-panel border border-white/5 relative group overflow-hidden transition-all duration-300 p-0 flex flex-col justify-end w-full group/card`}>
            
            <div className="absolute inset-0 z-0 overflow-hidden">
              {/* TERMINAL LAYERS FOR PROJECTS */}
              <div className="absolute inset-0 scanline-overlay pointer-events-none z-20 opacity-30 group-hover/card:opacity-50 transition-opacity"></div>
              
              <EditableImage 
                src={project.screenshots?.[0]?.src || ""}
                alt={project.title}
                onChange={(src) => handleImageChange(project, src)}
                isEditable={isEditable}
                containerClassName="absolute inset-0 w-full h-full z-0"
                className="object-cover opacity-50 mix-blend-luminosity group-hover/card:scale-105 group-hover/card:mix-blend-normal group-hover/card:opacity-80 transition-all duration-1000 ease-out z-10"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/70 to-transparent z-[15]"></div>

              {/* HUD OVERLAY */}
              <div className="absolute top-4 right-4 z-30 font-label text-[8px] text-[#00f4fe] tracking-widest bg-black/40 px-2 py-1 border border-white/5 opacity-0 group-hover/card:opacity-100 transition-opacity truncate max-w-[60%]">
                [LINK_ESTABLISHED]
              </div>
            </div>
            
            <div className="relative z-30 p-5 lg:p-8 flex flex-col gap-3 lg:gap-4 mt-auto">
              <div className="flex justify-between items-start">
                <span className="text-[#00f4fe] font-label text-[10px] lg:text-xs uppercase tracking-[0.1em] border-l-2 border-[#00f4fe] pl-2 truncate max-w-[80%]">
                   <EditableText value={project.codeName} onChange={()=>{}} isEditable={isEditable} />
                </span>
                {project.isPinned && !isEditable && (
                  <span className="material-symbols-outlined text-[#00f4fe] text-sm animate-pulse">push_pin</span>
                )}
              </div>
              <h2 className="font-headline text-xl lg:text-3xl text-[#e5e2e1] tracking-tighter uppercase mb-1">
                 <EditableText value={project.title} onChange={()=>{}} isEditable={isEditable} />
              </h2>
              <p className="text-[#e7bcba] font-body text-xs lg:text-sm max-w-lg leading-relaxed border-l border-white/10 pl-4 mb-2 lg:mb-4 line-clamp-2 opacity-70">
                 <EditableText value={project.summary} onChange={()=>{}} isEditable={isEditable} multiline />
              </p>
              <div className="flex flex-wrap gap-4 mt-auto border-t border-white/5 pt-4 items-center">
                <Link href={`/projects/${project.slug}`} className="group/btn flex items-center gap-2 px-5 py-2.5 bg-[#d90429] text-white font-label text-[10px] uppercase tracking-widest font-bold hover:shadow-[0_0_20px_rgba(217,4,41,0.5)] transition-all active:scale-95">
                  <span className="material-symbols-outlined text-xs">terminal</span>
                  <span>OPEN_PROJECT</span>
                  <span className="material-symbols-outlined text-xs group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* Admin Controls - Floating at top */}
            {isEditable && (
              <div className="absolute top-2 left-2 right-2 flex justify-between z-50">
                  <div className="flex gap-1">
                    <button onClick={() => onTogglePin?.(project.id, !project.isPinned)} className={`p-1.5 border text-[8px] uppercase tracking-widest ${project.isPinned ? 'bg-[#00f4fe] text-black border-[#00f4fe]' : 'bg-black/80 text-white/50 border-white/10'}`}>
                      {project.isPinned ? 'PINNED' : 'PIN'}
                    </button>
                    {/* NEW EDIT BUTTON */}
                    <Link 
                      href={`/projects/${project.slug}?edit=true`}
                      className="p-1.5 bg-[#00f4fe]/10 border border-[#00f4fe]/30 text-[#00f4fe] hover:bg-[#00f4fe] hover:text-black transition-all flex items-center gap-1 text-[8px] font-bold uppercase tracking-widest"
                    >
                      <span className="material-symbols-outlined text-[10px]">edit</span>
                      EDIT_DETAILS
                    </Link>
                  </div>
                  <button onClick={() => onDelete?.(project.id)} className="p-1.5 bg-black/80 border border-white/10 text-[#d90429] hover:bg-[#d90429] hover:text-white transition-all">
                    <span className="material-symbols-outlined text-xs">delete</span>
                  </button>
              </div>
            )}
          </SpotlightCard>
        );
      })}
    </div>
  );
};
