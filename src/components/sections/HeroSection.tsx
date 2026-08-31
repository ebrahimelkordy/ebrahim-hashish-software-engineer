"use client";

import Link from "next/link";
import { EditableText } from "../EditableText";
import { EditableImage } from "../EditableImage";
import { useState, useEffect } from "react";
import { ScrambleText } from "../animations/ScrambleText";

export const HeroSection = ({ data, isEditable = false, onUpdate }: { data: any, isEditable?: boolean, onUpdate?: (data: any) => void }) => {
  const [heroData, setHeroData] = useState(data);

  useEffect(() => {
    setHeroData(data);
  }, [data]);

  const handleChange = (field: string, value: string) => {
    const newData = { ...heroData, [field]: value };
    setHeroData(newData);
    if (onUpdate) onUpdate(newData);
  };

  return (
    <section className="relative w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 py-2 lg:py-10 overflow-hidden">
      {/* BACKGROUND DECO FOR MOBILE */}
      <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-10 lg:opacity-20 -z-10"></div>
      
      {/* CONTENT BLOCK - CENTERED ON MOBILE, LEFT ON DESKTOP */}
      <div className={`w-full ${ (heroData.imageUrl || isEditable) ? 'lg:flex-1' : 'w-full' } flex flex-col items-center lg:items-start text-center lg:text-left z-10 space-y-4 lg:space-y-6 relative`}>
        
        <div className="space-y-4 w-full">
          <p className="font-body text-[#00f4fe] text-[10px] md:text-sm uppercase tracking-[0.2em] font-medium opacity-80 before:content-['//'] before:mr-2">
            <EditableText
              value={heroData.subtitle}
              onChange={(val) => handleChange('subtitle', val)}
              isEditable={isEditable}
            />
          </p>
          
          <div className="font-headline font-bold tracking-tighter text-[#e5e2e1] lag-frames-text w-full">
            <h1 className="font-fluid-h1 opacity-90 mb-1 lg:mb-2 uppercase">
              <EditableText 
                 value={heroData.firstName} 
                 onChange={(val) => handleChange('firstName', val)} 
                 isEditable={isEditable} 
              />
            </h1>
            <div className="font-fluid-h1 pixel-glitch uppercase" data-text={heroData.lastName}>
              <EditableText 
                 value={heroData.lastName} 
                 onChange={(val) => handleChange('lastName', val)} 
                 isEditable={isEditable} 
              />
            </div>
          </div>
        </div>

        <div className="font-body text-sm md:text-base lg:text-lg text-[#e7bcba] leading-relaxed max-w-xl border-l-0 lg:border-l-2 border-[#d90429] pl-0 lg:pl-6 opacity-80">
          <EditableText
            value={heroData.description}
            onChange={(val) => handleChange('description', val)}
            isEditable={isEditable}
            multiline
          />
        </div>

        {/* QUICK SPECS / SKILLS SNAPSHOT - RESTORED */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2">
          {['React', 'Next.js', 'Node.js', 'Express', 'Prisma', 'MongoDB', 'PostgreSQL', 'Tailwind', 'TypeScript'].map(tech => (
            <span key={tech} className="px-3 py-1 bg-[#1c1b1b] border border-[#5d3f3d]/30 text-[9px] lg:text-[10px] font-body text-[#e7bcba] uppercase tracking-widest hover:border-[#00f4fe]/50 hover:text-[#00f4fe] transition-colors cursor-default">
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons: Stack on Mobile, Row on Desktop */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-max pt-4">
          <Link href="/profile" className="group relative w-full sm:w-max px-10 py-5 bg-[#d90429] text-white font-headline uppercase tracking-[0.1em] text-sm font-bold overflow-hidden transition-all hover:shadow-[0_0_25px_rgba(217,4,41,0.5)] active:scale-95 flex items-center justify-center gap-2">
            <span className="relative z-10"><ScrambleText text="VIEW_SYSTEM_ID" delay={500} /></span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-[#d90429] translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </Link>
          <Link href="/#contact" className="w-full sm:w-max px-10 py-5 border border-white/10 text-white font-headline uppercase tracking-[0.1em] text-sm font-bold hover:bg-white/5 transition-all text-center">
            <ScrambleText text="ENGAGE_NOW" delay={700} />
          </Link>
        </div>

        {/* Meta Stats: Horizontal Always */}
        <div className="flex justify-center lg:justify-start gap-8 pt-6 font-label text-[10px] text-[#e7bcba] uppercase tracking-[0.2em] opacity-50">
          <div className="flex flex-col gap-1">
            <span className="text-[#00f4fe]">SPECIALTY</span>
            <span>MERN_STACK</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[#00f4fe]">LOCATION</span>
            <span>EGYPT_HQ</span>
          </div>
        </div>
      </div>

      {/* IMAGE BLOCK - FULL WIDTH ON MOBILE, 480PX ON DESKTOP */}
      {(heroData.imageUrl || isEditable) && (
        <div className="w-full lg:w-[460px] max-w-2xl relative group order-first lg:order-last px-4 lg:px-0 flex-shrink-0">
          {/* Cyberpunk Ambient Glow Behind */}
          <div className="absolute -inset-2 bg-gradient-to-tr from-[#d90429]/25 via-transparent to-[#00f4fe]/25 blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>
          <div className="absolute inset-0 bg-[#d90429]/10 neon-border-tl transform translate-x-2 translate-y-2 lg:translate-x-3 lg:translate-y-3 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-700 -z-10"></div>
          
          <div id="core-heart" className="relative aspect-[3/4] z-10 glass-panel border border-[#00f4fe]/30 overflow-hidden shadow-[0_0_30px_rgba(0,244,254,0.15)] group-hover:border-[#00f4fe]/60 group-hover:shadow-[0_0_45px_rgba(0,244,254,0.3)] transition-all duration-700 group/img">
            {/* TERMINAL SCANLINE OVERLAYS */}
            <div className="absolute inset-0 scanline-overlay pointer-events-none z-[61] opacity-25"></div>
            
            {/* Atmospheric Cinematic Gradient (dissolves bottom seamlessly into dark page) */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/25 to-transparent pointer-events-none z-[58] opacity-85"></div>
            
            {/* Subtle Dual Cyan & Crimson Rim Glow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#00f4fe]/15 via-transparent to-[#d90429]/20 mix-blend-color-dodge pointer-events-none z-[59] opacity-75 group-hover/img:opacity-100 transition-opacity duration-700"></div>

            {/* Corner Tech Brackets */}
            <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-[#00f4fe] z-[63]"></div>
            <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-[#00f4fe]/60 z-[63]"></div>
            <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-[#d90429]/60 z-[63]"></div>
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-[#d90429] z-[63]"></div>

            {/* HUD Status Badges */}
            <div className="absolute top-4 left-4 z-[62] flex items-center gap-2 font-mono text-[9px] text-[#00f4fe] tracking-widest bg-black/75 px-2.5 py-1 backdrop-blur-md border border-[#00f4fe]/30 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f4fe] animate-ping"></span>
              <ScrambleText text="OPERATOR: IDENTIFIED" delay={300} />
            </div>

            <div className="absolute top-4 right-4 z-[62] font-mono text-[8px] text-[#e7bcba] bg-black/70 px-2 py-1 backdrop-blur-md border border-white/10 uppercase tracking-widest">
              SYS // ONLINE
            </div>

            <div className="absolute bottom-4 left-4 z-[62] font-mono text-[8px] text-[#00f4fe]/90 bg-black/70 px-2 py-0.5 border border-white/10 uppercase tracking-widest backdrop-blur-sm">
              [HQ: CAIRO_EGY]
            </div>

            <div className="absolute bottom-4 right-4 z-[62] flex items-center gap-1.5 bg-black/70 px-2.5 py-1 border border-[#d90429]/40 backdrop-blur-sm shadow-md">
              <span className="material-symbols-outlined text-[#d90429] text-sm animate-pulse">fingerprint</span>
              <span className="font-mono text-[8px] text-[#d90429] uppercase tracking-widest font-bold">VERIFIED</span>
            </div>

            <EditableImage
              src={heroData.imageUrl}
              alt="Subject_01"
              onChange={(val) => handleChange('imageUrl', val)}
              className="object-cover w-full h-full filter contrast-[1.08] brightness-[0.97] saturate-[0.95] transition-all duration-700 group-hover/img:scale-105 group-hover/img:contrast-[1.12]"
              containerClassName="w-full h-full relative z-50"
              isEditable={isEditable}
              priority={true}
            />
          </div>
        </div>
      )}
    </section>
  );
};
