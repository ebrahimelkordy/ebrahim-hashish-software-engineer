"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface CommandItem {
  id: string;
  category: "PROJECTS" | "ACTIONS" | "NAVIGATION" | "TERMINAL";
  title: string;
  subtitle?: string;
  icon: string;
  badge?: string;
  action: () => void;
  keywords?: string;
}

export const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K or / (when not inside inputs)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "/" && !["INPUT", "TEXTAREA"].includes((document.activeElement?.tagName || ""))) {
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => setIsOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const commands: CommandItem[] = [
    // Featured Projects
    {
      id: "p-manie",
      category: "PROJECTS",
      title: "Maison Manie (دار المَنِيع)",
      subtitle: "Luxury Arabian Menswear Flagship & Coordination Studio",
      icon: "rocket_launch",
      badge: "REACT 18 // REST API",
      action: () => {
        router.push("/projects/maison-manie-luxury-menswear");
        setIsOpen(false);
      },
      keywords: "manie maison luxury e-commerce fashion clothes rtl",
    },
    {
      id: "p-mashtool",
      category: "PROJECTS",
      title: "Mashtool Atelier (مشتول)",
      subtitle: "High-Performance Artisanal Commerce & Data Migration",
      icon: "deployed_code",
      badge: "REMIX // POSTGRESQL",
      action: () => {
        router.push("/projects/mashtool-handcrafted-atelier");
        setIsOpen(false);
      },
      keywords: "mashtool remix react router atelier store migration",
    },
    {
      id: "p-sanad",
      category: "PROJECTS",
      title: "SANAD — Financial ERP & AI Audit",
      subtitle: "Atomic Append-Only Ledger, BullMQ & WhatsApp Gateway",
      icon: "account_balance",
      badge: "NEXT 16 // NESTJS 11",
      action: () => {
        router.push("/projects/sanad-financial-erp-ai");
        setIsOpen(false);
      },
      keywords: "sanad erp fintech ledger accounting whatsapp ai nestjs bullmq",
    },
    {
      id: "p-kordy",
      category: "PROJECTS",
      title: "Al-Kordy Contracting (الكردي)",
      subtitle: "Industrial CAD Steel Fabrication Digital Platform",
      icon: "precision_manufacturing",
      badge: "NEXT.JS // SUPABASE",
      action: () => {
        router.push("/projects/al-kordy-contracting-platform");
        setIsOpen(false);
      },
      keywords: "kordy contracting steel industrial cad fabrication",
    },
    {
      id: "p-zaad",
      category: "PROJECTS",
      title: "Zaad E-Commerce Platform",
      subtitle: "Full-Stack Commerce Engine with Stripe & Redis",
      icon: "shopping_cart",
      badge: "NODE.JS // REDIS",
      action: () => {
        router.push("/projects/zaad-ecommerce-platform");
        setIsOpen(false);
      },
      keywords: "zaad store shop stripe redis",
    },
    {
      id: "p-nibras",
      category: "PROJECTS",
      title: "Nibras LMS Enterprise",
      subtitle: "Multi-Tenant Educational Platform with Socket.IO",
      icon: "school",
      badge: "NEXT.JS // MONGODB",
      action: () => {
        router.push("/projects/nibras-lms-enterprise");
        setIsOpen(false);
      },
      keywords: "nibras lms school education multi-tenant",
    },

    // Quick Actions
    {
      id: "a-cv",
      category: "ACTIONS",
      title: "Download Technical Resume / CV",
      subtitle: "Get the latest official Curriculum Vitae in PDF format",
      icon: "download",
      badge: "PDF",
      action: () => {
        window.open("/cv.pdf", "_blank");
        showToast("⚡ INITIATING_CV_DOWNLOAD: File stream active.");
        setIsOpen(false);
      },
      keywords: "cv resume pdf download hire profile experience",
    },
    {
      id: "a-email",
      category: "ACTIONS",
      title: "Copy Direct Email Address",
      subtitle: "ebrahimelkordy@gmail.com",
      icon: "mail",
      badge: "CLIPBOARD",
      action: () => {
        navigator.clipboard.writeText("ebrahimelkordy@gmail.com");
        showToast("✓ EMAIL_COPIED_TO_CLIPBOARD: ebrahimelkordy@gmail.com");
        setIsOpen(false);
      },
      keywords: "email contact message mail copy ebrahim",
    },
    {
      id: "a-github",
      category: "ACTIONS",
      title: "Open GitHub Profile",
      subtitle: "Explore open-source repositories and system commits",
      icon: "code",
      badge: "GITHUB",
      action: () => {
        window.open("https://github.com/ebrahimelkordy", "_blank");
        setIsOpen(false);
      },
      keywords: "github repo source code git ebrahimelkordy",
    },
    {
      id: "a-linkedin",
      category: "ACTIONS",
      title: "Connect on LinkedIn",
      subtitle: "Professional network and career credentials",
      icon: "share",
      badge: "LINKEDIN",
      action: () => {
        window.open("https://www.linkedin.com/in/ebrahim-elkordy", "_blank");
        setIsOpen(false);
      },
      keywords: "linkedin profile career network connect",
    },
    {
      id: "a-whatsapp",
      category: "ACTIONS",
      title: "Direct WhatsApp Message",
      subtitle: "Instant priority engineering consultation",
      icon: "chat",
      badge: "+20 102 604 0854",
      action: () => {
        window.open("https://wa.me/201026040854", "_blank");
        setIsOpen(false);
      },
      keywords: "whatsapp chat call message phone direct",
    },

    // Navigation
    {
      id: "n-home",
      category: "NAVIGATION",
      title: "Home Terminal Overview",
      subtitle: "Executive summary, featured work & metrics",
      icon: "home",
      action: () => {
        router.push("/");
        setIsOpen(false);
      },
      keywords: "home main landing root overview",
    },
    {
      id: "n-projects",
      category: "NAVIGATION",
      title: "All Deployed Projects Archive",
      subtitle: "Full catalog of 8+ production systems and case studies",
      icon: "folder_open",
      action: () => {
        router.push("/projects");
        setIsOpen(false);
      },
      keywords: "projects work catalog archive systems case studies",
    },
    {
      id: "n-profile",
      category: "NAVIGATION",
      title: "Identity & Architecture Philosophy",
      subtitle: "In-depth technical bio, skills matrix & verified credentials",
      icon: "fingerprint",
      action: () => {
        router.push("/profile");
        setIsOpen(false);
      },
      keywords: "identity profile about me bio skills experience education",
    },
    {
      id: "n-posts",
      category: "NAVIGATION",
      title: "Engineering Articles & Case Studies",
      subtitle: "Deep-dives into backend architecture, queuing & optimizations",
      icon: "article",
      action: () => {
        router.push("/posts");
        setIsOpen(false);
      },
      keywords: "posts blog articles architectural writeups research",
    },
    {
      id: "n-contact",
      category: "NAVIGATION",
      title: "Jump to Secure Contact Terminal",
      subtitle: "Direct encrypted message transmission form",
      icon: "send",
      action: () => {
        router.push("/#contact");
        setIsOpen(false);
      },
      keywords: "contact message form hire talk send",
    },

    // System Utilities
    {
      id: "t-ping",
      category: "TERMINAL",
      title: "sys:ping // Cairo HQ Telemetry",
      subtitle: "Check round-trip latency to edge gateway",
      icon: "wifi_tethering",
      badge: "TELEMETRY",
      action: () => {
        showToast("⚡ PONG // RTT: 14ms // EDGE_NODE: CAIRO_HQ [OPERATIONAL]");
        setIsOpen(false);
      },
      keywords: "ping status connection latency test telemetry",
    },
    {
      id: "t-status",
      category: "TERMINAL",
      title: "sys:status // Availability Protocol",
      subtitle: "Query current engineering availability status",
      icon: "verified",
      badge: "AVAILABLE",
      action: () => {
        showToast("🟢 STATUS: OPEN_FOR_ENTERPRISE_CONTRACTS & HIGH-IMPACT_ROLES");
        setIsOpen(false);
      },
      keywords: "status available hiring contract work open",
    },
  ];

  // Filter commands
  const filteredCommands = commands.filter((cmd) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      cmd.title.toLowerCase().includes(q) ||
      (cmd.subtitle && cmd.subtitle.toLowerCase().includes(q)) ||
      (cmd.keywords && cmd.keywords.toLowerCase().includes(q)) ||
      cmd.category.toLowerCase().includes(q)
    );
  });

  // Handle keyboard list navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
    } else if (e.key === "Enter" && filteredCommands.length > 0) {
      e.preventDefault();
      filteredCommands[selectedIndex]?.action();
    }
  };

  if (!isOpen) {
    return toastMessage ? (
      <div className="fixed bottom-6 right-6 z-[200] font-mono text-xs text-[#00f4fe] bg-black/90 border border-[#00f4fe]/50 px-4 py-3 shadow-[0_0_25px_rgba(0,244,254,0.3)] backdrop-blur-xl animate-in slide-in-from-bottom-5 duration-300 flex items-center gap-3">
        <span className="material-symbols-outlined text-sm text-[#00f4fe] animate-pulse">check_circle</span>
        <span>{toastMessage}</span>
      </div>
    ) : null;
  }

  return (
    <>
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[300] font-mono text-xs text-[#00f4fe] bg-black/90 border border-[#00f4fe]/50 px-4 py-3 shadow-[0_0_25px_rgba(0,244,254,0.3)] backdrop-blur-xl animate-in slide-in-from-top-5 duration-300 flex items-center gap-3">
          <span className="material-symbols-outlined text-sm text-[#00f4fe]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md z-[150] animate-in fade-in duration-200"
        onClick={() => setIsOpen(false)}
      />

      {/* Command Dialog */}
      <div className="fixed top-[15%] md:top-[20%] left-1/2 -translate-x-1/2 w-[92%] max-w-2xl bg-[#0e0e0e]/95 border border-[#00f4fe]/30 shadow-[0_0_50px_rgba(0,244,254,0.2)] z-[160] overflow-hidden flex flex-col max-h-[70vh] animate-in zoom-in-95 duration-200 neon-border-tl">
        {/* Top Header & Search Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-black/40">
          <span className="material-symbols-outlined text-[#00f4fe] text-xl animate-pulse">terminal</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or search (e.g. 'sanad', 'cv', 'contact')..."
            className="w-full bg-transparent text-[#e5e2e1] font-mono text-sm md:text-base outline-none placeholder:text-white/30"
          />
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-white/40 bg-white/5 px-2 py-1 border border-white/10">
            <span>ESC</span>
          </div>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 divide-y divide-white/5 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="p-8 text-center space-y-2 font-mono">
              <span className="material-symbols-outlined text-[#d90429] text-3xl">search_off</span>
              <p className="text-xs text-white/50 uppercase tracking-widest">NO_MATCHING_COMMANDS_FOUND</p>
              <p className="text-[10px] text-white/30">Try searching for &quot;cv&quot;, &quot;sanad&quot;, &quot;email&quot;, or &quot;projects&quot;</p>
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  onClick={() => cmd.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 cursor-pointer transition-all duration-150 group ${
                    isSelected
                      ? "bg-[#00f4fe]/10 border-l-2 border-[#00f4fe] pl-4 text-white shadow-[inset_0_0_20px_rgba(0,244,254,0.05)]"
                      : "hover:bg-white/5 text-[#e5e2e1]/80 border-l-2 border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span
                      className={`material-symbols-outlined text-lg transition-colors ${
                        isSelected ? "text-[#00f4fe]" : "text-[#d90429] opacity-70 group-hover:opacity-100"
                      }`}
                    >
                      {cmd.icon}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-headline font-bold text-xs md:text-sm tracking-tight truncate">
                          {cmd.title}
                        </span>
                        <span className="font-mono text-[8px] text-white/30 uppercase tracking-widest">
                          [{cmd.category}]
                        </span>
                      </div>
                      {cmd.subtitle && (
                        <p className="font-body text-[11px] text-[#e7bcba]/60 truncate mt-0.5">
                          {cmd.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  {cmd.badge && (
                    <span
                      className={`font-mono text-[9px] px-2 py-0.5 border flex-shrink-0 ml-2 uppercase tracking-widest ${
                        isSelected
                          ? "bg-[#00f4fe]/20 text-[#00f4fe] border-[#00f4fe]/40"
                          : "bg-black/40 text-white/40 border-white/10"
                      }`}
                    >
                      {cmd.badge}
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Status Footer */}
        <div className="px-4 py-2 bg-black/60 border-t border-white/10 flex items-center justify-between font-mono text-[9px] text-white/40">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="bg-white/10 px-1 py-0.5 text-white/60">↑</kbd>
              <kbd className="bg-white/10 px-1 py-0.5 text-white/60">↓</kbd> Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="bg-white/10 px-1.5 py-0.5 text-white/60">↵</kbd> Execute
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[#00f4fe]/70">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f4fe] animate-pulse"></span>
            <span>SYSTEM COMMAND HUD v2.0</span>
          </div>
        </div>
      </div>
    </>
  );
};
