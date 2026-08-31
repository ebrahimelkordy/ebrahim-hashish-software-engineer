"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = ({ cvUrl = "" }: { cvUrl?: string }) => {
  const pathname = usePathname();

  const getLinkClasses = (path: string) => {
    const isActive = pathname === path;
    if (isActive) {
      return "font-headline uppercase tracking-[0.1em] text-sm text-[#00F5FF] border-b-2 border-[#00F5FF] pb-1 transition-all duration-200";
    }
    return "font-headline uppercase tracking-[0.1em] text-sm text-white/50 hover:text-[#00F5FF] hover:bg-white/5 pb-1 transition-all duration-200";
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
      {/* DESKTOP NAV: SOLID & TECHNICAL */}
      <header className="fixed top-0 w-full z-50 border-b border-[#D90429]/15 bg-[#0e0e0e]/85 backdrop-blur-2xl hidden md:block">
        <div className="flex justify-between items-center px-8 py-4 w-full max-w-[1920px] mx-auto">
          <Link href="/" className="flex items-center gap-3.5 group cursor-pointer">
            <span className="material-symbols-outlined text-[#00f4fe] text-2xl font-black group-hover:rotate-12 transition-transform">terminal</span>
            <div className="flex flex-col">
              <span className="font-headline uppercase tracking-[0.2em] text-sm text-[#e5e2e1] font-bold group-hover:text-[#00f4fe] transition-colors">ABOHASHISH_SYS</span>
              <span className="font-mono text-[8px] text-[#00f4fe]/60 tracking-widest">ENGINEERING_CORE</span>
            </div>
          </Link>

          <nav className="flex gap-10">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path} className={getLinkClasses(item.path)}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {/* Command Palette Trigger Button (⌘K) */}
            <button
              onClick={triggerCommandPalette}
              className="font-mono text-[11px] text-[#e5e2e1]/70 bg-black/40 hover:bg-[#00f4fe]/10 hover:text-[#00f4fe] border border-white/10 hover:border-[#00f4fe]/40 px-3 py-1.5 transition-all flex items-center gap-2.5 cursor-pointer shadow-sm group"
              title="Open Command Palette (Cmd+K)"
            >
              <span className="material-symbols-outlined text-xs text-[#00f4fe] group-hover:rotate-45 transition-transform">search</span>
              <span className="font-mono text-[10px] tracking-wider uppercase opacity-80">COMMANDS</span>
              <kbd className="bg-white/10 px-1.5 py-0.5 text-[9px] border border-white/10 text-[#00f4fe] font-mono tracking-widest">
                ⌘K
              </kbd>
            </button>

            {cvUrl && (
              <a 
                href={cvUrl} 
                download 
                target="_blank"
                rel="noopener noreferrer"
                className="font-label text-[10px] tracking-[0.2em] text-[#00F5FF] hover:bg-[#00F5FF]/10 px-3 py-1.5 border border-[#00F5FF]/20 transition-all flex items-center gap-2"
              >
                 <span className="material-symbols-outlined text-xs">download</span>
                 [EXPORT_CV]
              </a>
            )}

            <Link href="/admin" className="text-white/30 hover:text-[#00F5FF] transition-all hover:rotate-90">
              <span className="material-symbols-outlined text-xl">settings_input_component</span>
            </Link>
          </div>
        </div>
      </header>

      {/* MOBILE NAV: PREMIUM FLOATING PILL - ULTRA COMPACT WITH COMMAND TRIGGER */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-[390px] z-[100] md:hidden">
        <nav className="flex justify-around items-center px-3 py-1.5 bg-[#131313]/95 backdrop-blur-3xl border border-white/10 rounded-[28px] shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link 
                key={item.path} 
                href={item.path} 
                className={`flex flex-col items-center justify-center gap-0 px-2.5 py-1 rounded-[18px] transition-all duration-500 ${
                  isActive 
                  ? "bg-[#D90429] text-white shadow-[0_0_10px_rgba(217,4,41,0.4)] scale-105" 
                  : "text-white/40 active:scale-95"
                }`}
              >
                <span className={`material-symbols-outlined text-[18px] ${isActive ? "fill-current" : ""}`}>
                  {item.icon}
                </span>
                <span className={`font-headline uppercase tracking-[0.1em] text-[7px] font-bold ${isActive ? "opacity-100" : "opacity-0 invisible h-0"}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}

          {/* Mobile Command Palette Trigger */}
          <button
            onClick={triggerCommandPalette}
            className="flex flex-col items-center justify-center gap-0 px-2.5 py-1 rounded-[18px] text-[#00f4fe] bg-[#00f4fe]/10 border border-[#00f4fe]/20 active:scale-95 transition-all"
            title="Search & Commands"
          >
            <span className="material-symbols-outlined text-[18px]">terminal</span>
            <span className="font-mono text-[7px] font-bold uppercase tracking-widest">⌘K</span>
          </button>
        </nav>
      </div>
    </>
  );
};
