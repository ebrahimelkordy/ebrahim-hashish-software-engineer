"use client";

import { EditableText } from "../EditableText";

export const StudiesSection = ({ studies, isEditable = false, onAdd, onDelete, onUpdate }: { 
  studies: any[], 
  isEditable?: boolean,
  onAdd?: () => void,
  onDelete?: (id: string) => void,
  onUpdate?: (id: string, data: any) => void
}) => {
  return (
    <section className="relative z-10 w-full flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#353534] pb-6 gap-4">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-[#00f4fe] text-3xl">school</span>
          <h2 className="font-headline text-3xl md:text-3xl font-bold tracking-tight text-[#e5e2e1] uppercase">DATA_SOURCES [STUDIES]</h2>
        </div>
        
        {isEditable && (
          <button 
            onClick={onAdd}
            className="px-4 py-2 bg-[#00f4fe] text-black font-label text-[10px] uppercase tracking-widest hover:bg-[#00d0d8] transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">add</span> ADD_NEW_STUDY
          </button>
        )}
      </div>

      <div className="flex flex-col gap-6 pl-4 border-l-2 border-[#00f4fe]/30 relative">
        <div className="absolute top-0 left-[-7px] w-3 h-3 bg-[#00f4fe] rounded-full shadow-[0_0_10px_rgba(0,245,255,0.8)]"></div>
        
        {studies.map(study => (
           <article key={study.id} className="relative bg-[#201f1f]/60 backdrop-blur-[20px] rounded-none border border-[#5d3f3d]/15 p-6 hover:bg-[#201f1f] transition-all ml-4 group">
             <div className="absolute top-1/2 left-[-26px] w-6 h-px bg-[#00f4fe]/50"></div>
             
             <div className="flex justify-between items-start mb-2">
               <div className="flex items-center gap-4">
                 <span className="font-label text-[10px] uppercase tracking-widest text-[#00f4fe] bg-[#00f4fe]/10 px-2 py-1">
                    <EditableText value={study.year} onChange={(v) => onUpdate?.(study.id, { year: v })} isEditable={isEditable} />
                 </span>
               </div>
               
               {isEditable && (
                 <button 
                   onClick={() => onDelete?.(study.id)}
                   className="text-[#d90429] opacity-0 group-hover:opacity-100 transition-opacity hover:scale-125"
                 >
                   <span className="material-symbols-outlined text-sm">delete</span>
                 </button>
               )}
             </div>

             <h3 className="font-headline text-xl font-bold tracking-tight text-[#e5e2e1] mb-1">
                <EditableText value={study.degree} onChange={(v) => onUpdate?.(study.id, { degree: v })} isEditable={isEditable} />
             </h3>
             <h4 className="font-body text-sm text-[#d90429] mb-3">
                <EditableText value={study.institution} onChange={(v) => onUpdate?.(study.id, { institution: v })} isEditable={isEditable} />
             </h4>
             <p className="font-body text-[#e7bcba] text-sm leading-relaxed font-mono">
                <EditableText value={study.description} onChange={(v) => onUpdate?.(study.id, { description: v })} isEditable={isEditable} multiline />
             </p>
           </article>
        ))}

        <div className="absolute bottom-0 left-[-7px] w-3 h-3 bg-[#5d3f3d] rounded-full"></div>
      </div>
    </section>
  );
};
