import { Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { getPortfolioData } from "@/lib/data-fetching";
import { LoginForm } from "@/components/LoginForm";

export default async function LoginPage() {
  const data = await getPortfolioData();

  return (
    <>
      <Navbar cvUrl={data.about.cvUrl} />
      <main className="min-h-screen flex items-center justify-center bg-[#0e0e0e] px-6 relative overflow-hidden">
        {/* BACKGROUND EFFECTS */}
        <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d90429]/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00f4fe]/5 rounded-full blur-[120px] animate-pulse delay-700"></div>

        <Suspense fallback={
          <div className="w-full max-w-md z-10 glass-panel border border-white/10 p-10 flex flex-col items-center gap-4">
            <span className="material-symbols-outlined animate-spin text-[#d90429] text-3xl">sync</span>
            <span className="font-mono text-[10px] text-[#00f4fe] uppercase tracking-widest">INITIALIZING_SECURE_AUTH...</span>
          </div>
        }>
          <LoginForm />
        </Suspense>
      </main>
    </>
  );
}
