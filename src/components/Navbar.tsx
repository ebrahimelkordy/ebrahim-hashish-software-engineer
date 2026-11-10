"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Terminal, 
  Search, 
  Download, 
  Sliders, 
  Home, 
  Cpu, 
  Database, 
  FileText 
} from "lucide-react";

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
    { label: "HOME", path: "/", icon: Home },
    { label: "IDENTITY", path: "/profile", icon: Cpu },
    { label: "WORK", path: "/projects", icon: Database },
    { label: "POSTS", path: "/posts", icon: FileText },
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
            <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-[#00f4fe] group-hover:rotate-12 transition-transform" />
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
              <Search className="w-3.5 h-3.5 text-[#00f4fe] group-hover:rotate-45 transition-transform" />
              <span className="hidden sm:inline font-mono text-[9px] sm:text-[10px] tracking-wider uppercase opacity-80">COMMANDS</span>
              <kbd className="bg-white/10 px-1 sm:px-1.5 py-0.5 text-[8px] sm:text-[9px] border border-white/10 text-[#00f4fe] font-mono tracking-widest">
                ⌘K
              </kbd>
            </button>

            {/* WhatsApp Direct Contact Button (Site Themed Colors) */}
            <a 
              href="https://wa.me/201060899732" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex font-label text-[9px] sm:text-[10px] tracking-[0.15em] text-[#00f4fe] bg-[#00f4fe]/5 hover:bg-[#00f4fe]/15 px-2.5 sm:px-3 py-1.5 border border-[#00f4fe]/30 hover:border-[#00f4fe] hover:shadow-[0_0_15px_rgba(0,244,254,0.25)] transition-all items-center gap-1.5 group"
              title="Direct WhatsApp Communication (+20 106 089 9732)"
            >
              <svg className="w-3.5 h-3.5 fill-current text-[#00f4fe] group-hover:scale-110 transition-transform" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.89 4.44-9.892 9.886-.001 2.125.597 3.702 1.592 5.392l-.999 3.646 3.899-.999zm11.387-4.604c-.12-.201-.441-.321-.922-.561s-2.845-1.403-3.286-1.563-.761-.241-1.082.241-1.243 1.563-1.524 1.883-.561.361-1.042.121c-.481-.241-2.032-.749-3.869-2.389-1.429-1.275-2.394-2.848-2.675-3.328s-.03-.741.211-.981c.216-.216.481-.561.722-.842.241-.281.321-.481.481-.802s.08-.601-.04-.842-.857-2.404-1.178-3.175c-.312-.751-.624-.65-.862-.661-.22-.011-.471-.013-.722-.013s-.661.101-1.002.481c-.341.381-1.303 1.273-1.303 3.105s1.332 3.593 1.517 3.834c.184.243 2.624 4.025 6.357 5.631 3.733 1.606 3.733 1.071 4.407.991.674-.08 2.167-.883 2.473-1.741s.306-1.597.214-1.741z"/>
              </svg>
              <span>[WHATSAPP]</span>
            </a>

            {/* Subtle / Discreet CV Export Button */}
            {cvUrl && (
              <a 
                href={cvUrl} 
                download 
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex font-mono text-[9px] tracking-wider text-white/40 hover:text-[#e5e2e1] hover:border-white/20 px-2 py-1.5 border border-white/5 bg-white/[0.02] transition-all items-center gap-1 opacity-60 hover:opacity-100"
                title="Download Technical CV / Resume"
              >
                 <Download className="w-3 h-3" />
                 <span>CV</span>
              </a>
            )}

            {/* Admin Settings Link */}
            <Link href="/admin" className="text-white/30 hover:text-[#00f4fe] transition-all hover:rotate-90 p-1" title="Admin Settings">
              <Sliders className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>
      </header>

      {/* MOBILE BOTTOM NAVIGATION DOCK (Ultra Sleek, Floating & Tactile) */}
      <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[390px] z-[100] md:hidden">
        <nav className="flex justify-between items-center px-3 py-1.5 bg-[#0e0e0e]/95 backdrop-blur-2xl border border-white/15 rounded-[24px] shadow-[0_12px_35px_rgba(0,0,0,0.85)]">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const IconComponent = item.icon;
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
                <IconComponent className="w-4 h-4" />
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
            <Terminal className="w-4 h-4" />
            <span className="font-mono text-[7.5px] font-bold uppercase tracking-widest">⌘K</span>
          </button>
        </nav>
      </div>
    </>
  );
};
