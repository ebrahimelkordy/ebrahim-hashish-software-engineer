import { Navbar } from "@/components/Navbar";
import { getPortfolioData } from "@/lib/data-fetching";
import { IdentitySection } from "@/components/sections/IdentitySection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { StudiesSection } from "@/components/sections/StudiesSection";
import { CertificatesSection } from "@/components/sections/CertificatesSection";
import { TerminalImage } from "@/components/TerminalImage";

export default async function ProfilePage() {
  const data = await getPortfolioData();

  return (
    <>
      <Navbar />
      <div className="fixed inset-0 scanline-overlay z-0 mix-blend-screen pointer-events-none"></div>

      <main className="pt-24 pb-40 px-6 lg:px-12 max-w-7xl mx-auto relative min-h-screen flex flex-col gap-[var(--section-gap)]">
        <IdentitySection data={data.about} isEditable={false} />

        <SkillsSection skills={data.skills} isEditable={false} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
          <ExperienceSection experiences={data.experiences} isEditable={false} />
          <StudiesSection studies={data.studies} isEditable={false} />
        </div>

        <CertificatesSection certificates={data.certificates} isEditable={false} />
      </main>
    </>
  );
}
