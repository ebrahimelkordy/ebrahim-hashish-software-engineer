import { Navbar } from "@/components/Navbar";
import { getPortfolioData } from "@/lib/data-fetching";
import { HeroSection } from "@/components/sections/HeroSection";
import { IdentitySection } from "@/components/sections/IdentitySection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { StudiesSection } from "@/components/sections/StudiesSection";
import { ProjectsGridSection } from "@/components/sections/ProjectsGridSection";
import { PostsSection } from "@/components/sections/PostsSection";
import { ContactSection } from "@/components/sections/ContactSection";

import { DashboardClient } from "@/components/sections/DashboardClient";

export default async function AdminDashboard() {
  const data = await getPortfolioData();

  return (
    <>
      <Navbar />
      <div className="fixed top-0 left-0 w-full bg-[#d90429] text-white text-center py-1 font-label text-xs uppercase tracking-[0.2em] z-50 animate-pulse safe-area-top shadow-[0_0_10px_rgba(217,4,41,0.8)]">
        ADMIN_MODE: ACTIVE // CLICK TEXT TO EDIT // AUTO-SAVING TO DB
      </div>

      <DashboardClient initialData={data} />
    </>
  );
}
