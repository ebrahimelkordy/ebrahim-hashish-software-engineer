"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
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

  return (
    <>
      {/* DESKTOP NAV: SOLID & TECHNICAL */}
      <header className="fixed top-0 w-full z-50 border-b border-[#D90429]/15 bg-[#0e0e0e]/80 backdrop-blur-xl hidden md:block">
        <div className="flex justify-between items-center px-8 py-5 w-full max-w-[1920px] mx-auto">
          <div className="flex items-center gap-4 group">
            <span className="material-symbols-outlined text-[#D90429] text-2xl font-black group-hover:rotate-12 transition-transform">terminal</span>
            <span className="font-headline uppercase tracking-[0.2em] text-sm text-[#D90429] font-bold">ABOHASHISH_SYS</span>
          </div>

          <nav className="flex gap-10">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path} className={getLinkClasses(item.path)}>
                {item.label}
              </Link>
            ))}
          </nav>

          <Link href="/admin" className="text-white/30 hover:text-[#00F5FF] transition-all hover:rotate-90">
            <span className="material-symbols-outlined text-xl">settings_input_component</span>
          </Link>
        </div>
      </header>

      {/* MOBILE NAV: PREMIUM FLOATING PILL - ULTRA COMPACT */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[85%] max-w-[360px] z-[100] md:hidden">
        <nav className="flex justify-around items-center px-2 py-1 bg-[#131313]/90 backdrop-blur-3xl border border-white/10 rounded-[28px] shadow-[0_10px_30px_rgba(0,0,0,0.7)]">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link 
                key={item.path} 
                href={item.path} 
                className={`flex flex-col items-center justify-center gap-0 px-2 py-0.5 rounded-[18px] transition-all duration-500 ${
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
        </nav>
      </div>
    </>
  );
};
