"use client";

import { GroupedSkills } from "@/lib/data-fetching";

export const SkillsSection = ({ skills, isEditable = false, onAdd, onDelete }: { 
  skills: GroupedSkills, 
  isEditable?: boolean,
  onAdd?: (category: string) => void,
  onDelete?: (skillId: string) => void
}) => {

  const getLevel = (idx: number) => {
    const levels = ["98%", "85%", "95%", "90%", "99%", "82%"];
    return levels[idx % levels.length];
  };

  const getWidth = (idx: number) => {
    const widths = ["98%", "85%", "95%", "90%", "99%", "82%"];
    return widths[idx % widths.length];
  };

  return (
    <section className="relative z-10 w-full mt-12 lg:mt-32 flex flex-col gap-8 lg:gap-12">
      {/* HEADER: Fluid & Adaptive */}
      <div className="flex items-center gap-4">
        <span className="material-symbols-outlined text-[#00f4fe] text-2xl lg:text-3xl">memory</span>
        <h2 className="font-headline text-2xl lg:text-4xl font-bold tracking-tight text-white uppercase">SKILL_MATRIX</h2>
        <div className="h-[1px] flex-grow bg-white/5 ml-2 lg:ml-4 relative">
             <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#00f4fe]/10 border-r border-[#00f4fe] border-b border-[#00f4fe] hidden sm:block"></div>
        </div>
      </div>

      {/* DYNAMIC GRID: 1 col on mobile, 2 on tablet, 3 on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {skills.map((category, catIdx) => (
          <div 
            key={category.category} 
            className={`p-5 lg:p-8 bg-[#131313] border border-white/5 relative overflow-hidden group hover:border-[#d90429]/30 transition-all duration-500`}
          >
            {/* Decoration */}
            <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${catIdx % 2 === 0 ? 'from-[#d90429]/5' : 'from-[#00f4fe]/5'} to-transparent`}></div>
            
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-label text-[10px] lg:text-xs uppercase tracking-[0.2em] text-white font-bold">{category.category}</h3>
              <span className={`material-symbols-outlined text-sm lg:text-base ${catIdx % 2 === 0 ? 'text-[#d90429]' : 'text-[#00f4fe]'} opacity-40 group-hover:opacity-100 transition-opacity`}>
                {catIdx % 2 === 0 ? 'settings_input_component' : 'data_object'}
              </span>
            </div>

            <div className="space-y-6 lg:space-y-8">
              {category.items.map((skill, sIdx) => (
                <div key={skill.id} className="relative group/skill">
                  <div className="flex justify-between mb-2">
                    <span className="font-body text-[9px] text-zinc-500 uppercase tracking-widest">{skill.name}</span>
                    <span className={`font-body text-[9px] ${catIdx % 2 === 0 ? 'text-[#d90429]' : 'text-[#00f4fe]'} font-bold opacity-80`}>{getLevel(sIdx + catIdx)}</span>
                  </div>
                  
                  {/* BAR: Original Design Restored */}
                  <div className="w-full h-[1px] bg-white/5 overflow-hidden">
                    <div 
                      className={`h-full ${catIdx % 2 === 0 ? 'bg-[#d90429] shadow-[0_0_8px_rgba(217,4,41,0.4)]' : 'bg-[#00f4fe] shadow-[0_0_8px_rgba(0,244,254,0.4)]'}`} 
                      style={{ width: getWidth(sIdx + catIdx) }}
                    ></div>
                  </div>

                  {isEditable && (
                    <button 
                      onClick={() => onDelete?.(skill.id)}
                      className="absolute -top-1 -right-1 opacity-0 group-hover/skill:opacity-100 text-[#d90429] p-1"
                    >
                      <span className="material-symbols-outlined text-[10px]">close</span>
                    </button>
                  )}
                </div>
              ))}

              {isEditable && (
                <button 
                  onClick={() => onAdd?.(category.category)}
                  className="w-full py-2 border border-dashed border-white/10 text-white/20 hover:text-[#d90429] hover:border-[#d90429] transition-all text-[8px] uppercase tracking-widest font-bold mt-4"
                >
                  (+) ADD_MODULE
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
