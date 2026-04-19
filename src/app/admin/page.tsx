import { Navbar } from "@/components/Navbar";
import { getPortfolioData } from "@/lib/data-fetching";
import { DashboardClient } from "@/components/sections/DashboardClient";
import { logout } from "@/lib/auth-actions";

export default async function AdminDashboard() {
  const data = await getPortfolioData();

  return (
    <>
      <Navbar cvUrl={data.about.cvUrl} />
      <div className="fixed top-0 left-0 w-full bg-[#d90429] text-white py-1 px-4 font-label text-[10px] uppercase tracking-[0.2em] z-50 flex justify-between items-center shadow-[0_0_10px_rgba(217,4,41,0.8)]">
        <div className="animate-pulse">ADMIN_MODE: ACTIVE // AUTO-SAVING</div>
        <form action={logout}>
          <button type="submit" className="flex items-center gap-2 hover:bg-white hover:text-[#d90429] px-2 py-0.5 transition-all">
            <span>TERMINATE_SESSION</span>
            <span className="material-symbols-outlined text-[14px]">logout</span>
          </button>
        </form>
      </div>

      <DashboardClient initialData={data} />
    </>
  );
}
