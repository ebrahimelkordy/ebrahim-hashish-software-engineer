"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = ({ cvUrl = "" }: { cvUrl?: string }) => {
  const pathname = usePathname();

  const getLinkClasses = (path: string) => {
    const isActive = pathname === path;
    if (isActive) {
      return "font-headline uppercase tracking-[0.1em] text-xs lg:text-sm text-[#00f4fe] border-b-2 border-[#00f4fe] pb-1 transition-all duration-200";
    }
    return "font-headline uppercase tracking-[0.1em] text-xs lg:text-sm text-white/50 hover:text-[#00f4fe] hover:bg-white/5 pb-1 transition-all duration-200";
  };

  const navItems = [
    { label: "HOME", path: "/", icon: "home" },
    { label: "IDENTITY", path: "/profile", icon: "memory" },
    { label: "WORK", path: "/projects", icon: "database" },
    { label: "POSTS", path: "/posts", icon: "article" },
  ];

  const triggerCommandPalette = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  return (
    <>
      {/* DESKTOP & TABLET TOP HEADER */}
      <header className="fixed top-0 w-full z-50 border-b border-[#d90429]/15 bg-[#0e0e0e]/85 backdrop-blur-2xl">
        <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 w-full max-w-[1920px] mx-auto">
          
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3.5 group cursor-pointer">
            <span className="material-symbols-outlined text-[#00f4fe] text-xl sm:text-2xl font-black group-hover:rotate-12 transition-transform">terminal</span>
            <div className="flex flex-col">
              <span className="font-headline uppercase tracking-[0.15em] sm:tracking-[0.2em] text-xs sm:text-sm text-[#e5e2e1] font-bold group-hover:text-[#00f4fe] transition-colors">ABOHASHISH_SYS</span>
              <span className="hidden sm:block font-mono text-[8px] text-[#00f4fe]/60 tracking-widest">ENGINEERING_CORE // v2.0</span>
            </div>
          </Link>

          {/* Desktop & Laptop Nav Links (Hidden on Mobile) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-10">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path} className={getLinkClasses(item.path)}>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Action Bar */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Command Palette Trigger Button (⌘K) */}
            <button
              onClick={triggerCommandPalette}
              className="font-mono text-[10px] sm:text-[11px] text-[#e5e2e1]/80 bg-black/50 hover:bg-[#00f4fe]/10 hover:text-[#00f4fe] border border-white/10 hover:border-[#00f4fe]/40 px-2.5 sm:px-3 py-1.5 transition-all flex items-center gap-2 cursor-pointer shadow-sm group"
              title="Open Command Palette (Cmd+K)"
            >
              <span className="material-symbols-outlined text-xs sm:text-sm text-[#00f4fe] group-hover:rotate-45 transition-transform">search</span>
              <span className="hidden sm:inline font-mono text-[9px] sm:text-[10px] tracking-wider uppercase opacity-80">COMMANDS</span>
              <kbd className="bg-white/10 px-1 sm:px-1.5 py-0.5 text-[8px] sm:text-[9px] border border-white/10 text-[#00f4fe] font-mono tracking-widest">
                ⌘K
              </kbd>
            </button>

            {/* Export CV Link (Desktop & Tablet) */}
            {cvUrl && (
              <a 
                href={cvUrl} 
                download 
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex font-label text-[9px] sm:text-[10px] tracking-[0.15em] text-[#00f4fe] hover:bg-[#00f4fe]/10 px-2.5 sm:px-3 py-1.5 border border-[#00f4fe]/20 transition-all items-center gap-1.5"
              >
                 <span className="material-symbols-outlined text-xs">download</span>
                 <span>[EXPORT_CV]</span>
              </a>
            )}

            {/* Admin Settings Link */}
            <Link href="/admin" className="text-white/30 hover:text-[#00f4fe] transition-all hover:rotate-90 p-1">
              <span className="material-symbols-outlined text-lg sm:text-xl">settings_input_component</span>
            </Link>
          </div>
        </div>
      </header>

      {/* MOBILE BOTTOM NAVIGATION DOCK (Ultra Sleek, Floating & Tactile) */}
      <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[390px] z-[100] md:hidden">
        <nav className="flex justify-between items-center px-3 py-1.5 bg-[#0e0e0e]/95 backdrop-blur-2xl border border-white/15 rounded-[24px] shadow-[0_12px_35px_rgba(0,0,0,0.85)]">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link 
                key={item.path} 
                href={item.path} 
                className={`flex flex-col items-center justify-center gap-0.5 px-3 py-1 rounded-[16px] transition-all duration-300 ${
                  isActive 
                  ? "bg-[#d90429] text-white shadow-[0_0_12px_rgba(217,4,41,0.5)] scale-105" 
                  : "text-white/40 hover:text-white/70 active:scale-95"
                }`}
              >
                <span className={`material-symbols-outlined text-[19px] ${isActive ? "fill-current" : ""}`}>
                  {item.icon}
                </span>
                <span className={`font-headline uppercase tracking-[0.1em] text-[7.5px] font-bold ${isActive ? "opacity-100" : "opacity-70"}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}

          {/* Mobile Command Palette Trigger Button in Dock */}
          <button
            onClick={triggerCommandPalette}
            className="flex flex-col items-center justify-center gap-0.5 px-3 py-1 rounded-[16px] text-[#00f4fe] bg-[#00f4fe]/10 border border-[#00f4fe]/30 active:scale-95 transition-all shadow-[0_0_8px_rgba(0,244,254,0.15)] cursor-pointer"
            title="Search & Commands"
          >
            <span className="material-symbols-outlined text-[19px]">terminal</span>
            <span className="font-mono text-[7.5px] font-bold uppercase tracking-widest">⌘K</span>
          </button>
        </nav>
      </div>
    </>
  );
};
