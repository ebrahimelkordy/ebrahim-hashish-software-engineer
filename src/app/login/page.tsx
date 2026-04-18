"use client";

import { useState } from "react";
import { login } from "@/lib/auth-actions";
import { useRouter, useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/admin";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await login(formData);

    if (result.success) {
      router.push(from);
      router.refresh();
    } else {
      setError(result.error || "Authentication Failed");
      setIsPending(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center bg-[#0e0e0e] px-6 relative overflow-hidden">
        {/* BACKGROUND EFFECTS */}
        <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d90429]/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00f4fe]/5 rounded-full blur-[120px] animate-pulse delay-700"></div>

        <div className="w-full max-w-md z-10">
          <div className="glass-panel border border-white/10 p-8 md:p-10 relative overflow-hidden group">
            {/* CORNER ACCENTS */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#d90429] opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#00f4fe] opacity-50"></div>

            <div className="text-center space-y-4 mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1c1b1b] border border-[#d90429]/30 mb-2">
                <span className="material-symbols-outlined text-[#d90429] text-3xl animate-pulse">lock_person</span>
              </div>
              <h1 className="font-headline text-2xl font-black text-white tracking-widest uppercase">
                RESTRICTED_ACCESS
              </h1>
              <div className="py-3 px-4 bg-[#d90429]/10 border-l-4 border-[#d90429]">
                <p className="font-label text-[10px] text-[#d90429] font-bold leading-relaxed text-left uppercase tracking-wider">
                  SYSTEM ADMINISTRATOR LOGIN ONLY. 
                  UNAUTHORIZED ATTEMPTS ARE DETECTED AND LOGGED.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="font-label text-[10px] text-white/50 uppercase tracking-widest pl-1">Ident_Code</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-white/20 text-xl">person_2</span>
                  <input 
                    name="username"
                    type="text" 
                    required 
                    placeholder="USERNAME"
                    className="w-full bg-black/40 border border-white/5 px-12 py-4 text-white font-mono text-sm focus:outline-none focus:border-[#d90429]/50 transition-all placeholder:text-white/10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-label text-[10px] text-white/50 uppercase tracking-widest pl-1">Access_key</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-white/20 text-xl">key</span>
                  <input 
                    name="password"
                    type="password" 
                    required 
                    placeholder="••••••••"
                    className="w-full bg-black/40 border border-white/5 px-12 py-4 text-white font-mono text-sm focus:outline-none focus:border-[#00f4fe]/50 transition-all placeholder:text-white/10"
                  />
                </div>
              </div>

              {error && (
                <div className="animate-in fade-in slide-in-from-top-2">
                   <p className="text-[10px] font-mono text-[#d90429] bg-[#d90429]/5 p-3 border border-[#d90429]/20 text-center uppercase tracking-wider">
                     {error}
                   </p>
                </div>
              )}

              <button 
                type="submit" 
                disabled={isPending}
                className="w-full py-5 bg-[#d90429] text-white font-headline text-xs font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50 disabled:cursor-wait"
              >
                {isPending ? (
                   <>
                     <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                     VERIFYING...
                   </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-sm">shield_person</span>
                    ESTABLISH_SESSION
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="font-label text-[9px] text-white/20 uppercase tracking-[0.2em]">
                Secure Protocol v1.4.2 // Encrypted Connection
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
