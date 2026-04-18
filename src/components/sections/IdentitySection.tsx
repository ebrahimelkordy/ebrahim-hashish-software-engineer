"use client";

import { useState, useEffect } from "react";
import { EditableText } from "../EditableText";
import { EditableImage } from "../EditableImage";

export const IdentitySection = ({ data, isEditable = false, onUpdate }: { data: any, isEditable?: boolean, onUpdate?: (data: any) => void }) => {
  const [aboutData, setAboutData] = useState(data);

  useEffect(() => {
    setAboutData(data);
  }, [data]);

  const handleChange = (field: string, value: string) => {
    const newData = { ...aboutData, [field]: value };
    setAboutData(newData);
    if (onUpdate) onUpdate(newData);
  };

  return (
    <section className="relative w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-12 py-2 lg:py-10">
      
      {/* PORTRAIT BLOCK - FULL WIDTH MOBILE, FIXED WIDTH DESKTOP */}
      {(aboutData.imageUrl || isEditable) && (
        <div className="w-full lg:w-[480px] max-w-2xl relative group flex-shrink-0 px-4 lg:px-0">
          <div className="aspect-[3/4] relative overflow-hidden tech-border-left-top bg-[#1c1b1b] group-hover:neon-glow-secondary transition-all duration-700 refresh-frames-img shadow-2xl group/img">
            {/* TERMINAL OVERLAYS - TOP LAYERS */}
            <div className="absolute inset-0 scanline-overlay pointer-events-none z-30 opacity-40"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMCwgMjQ0LCAyNTQsIDAuMSkiLz48L3N2Zz4=')] mix-blend-overlay pointer-events-none z-20"></div>

            <EditableImage 
               src={aboutData.imageUrl}
               alt="Entity_Portrait"
               onChange={(src) => handleChange('imageUrl', src)}
               isEditable={isEditable}
               containerClassName="absolute inset-0 w-full h-full z-10"
               className="object-cover transition-transform duration-1000 group-hover/img:scale-110"
            />
            
            <div className="absolute bottom-4 left-4 right-4 p-4 glass-panel border border-white/10 flex justify-between items-end z-40 backdrop-blur-md">
              <div className="space-y-1">
                <p className="font-label text-[8px] uppercase tracking-[0.2em] text-[#00f4fe]">ID_VERIFIED</p>
                <p className="font-headline text-sm font-bold text-white animate-pulse">AUTH__GRANTED</p>
              </div>
              <div className="text-right space-y-1 font-mono">
                <p className="font-label text-[8px] uppercase tracking-[0.2em] text-[#d90429]">SEC_LEVEL</p>
                <p className="font-headline text-sm font-bold text-white uppercase">S_CLASS</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TEXT BLOCK - CENTERED ON MOBILE, LEFT ON DESKTOP */}
      <div className={`w-full ${ (aboutData.imageUrl || isEditable) ? 'lg:flex-1' : 'w-full' } flex flex-col items-center lg:items-start text-center lg:text-left gap-6 lg:gap-8`}>
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#1c1b1b] border border-white/5 tech-border-right-bottom">
          <span className="w-2 h-2 bg-[#d90429] shadow-[0_0_10px_#d90429]"></span>
          <span className="font-label text-[10px] uppercase tracking-[0.3em] text-[#e7bcba] font-bold">
            <EditableText value={aboutData.role} onChange={(v) => handleChange('role', v)} isEditable={isEditable} />
          </span>
        </div>

        <h1 className="font-headline font-bold leading-[0.9] tracking-tighter text-[#e5e2e1] w-full">
          <div className="font-fluid-h1 uppercase mb-2">
            <EditableText value={aboutData.firstName} onChange={(v) => handleChange('firstName', v)} isEditable={isEditable} />
          </div>
          <div className="font-fluid-h1 text-[#d90429] pixel-glitch uppercase" data-text={aboutData.lastName}>
            <EditableText value={aboutData.lastName} onChange={(v) => handleChange('lastName', v)} isEditable={isEditable} />
          </div>
        </h1>

        <div className="font-body text-sm md:text-base lg:text-lg text-[#e7bcba] leading-relaxed max-w-2xl opacity-80 border-l-0 lg:border-l-2 border-[#d90429]/30 pl-0 lg:pl-8">
          <EditableText value={aboutData.bio} onChange={(v) => handleChange('bio', v)} isEditable={isEditable} multiline />
        </div>
        
        {!isEditable && (
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-6">
            <a href="/projects" className="px-8 py-4 bg-[#d90429] text-white font-label text-[10px] uppercase tracking-[0.2em] font-bold hover:shadow-[0_0_20px_rgba(217,4,41,0.4)] transition-all">
              EXECUTE_WORK_MODULE
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="px-8 py-4 border border-white/10 text-white font-label text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white/5 transition-all">
              SOURCE_STREAMS
            </a>
          </div>
        )}
      </div>
    </section>
  );
};
