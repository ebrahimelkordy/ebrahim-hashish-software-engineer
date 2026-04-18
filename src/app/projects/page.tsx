import { Navbar } from "@/components/Navbar";
import { getPortfolioData } from "@/lib/data-fetching";
import { ProjectsGridSection } from "@/components/sections/ProjectsGridSection";

export default async function ProjectsPage() {
  const data = await getPortfolioData();

  return (
    <>
      <Navbar />
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-[#d90429] opacity-5 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-[#00f4fe] opacity-5 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <main className="flex-grow pt-24 pb-40 px-6 lg:px-12 max-w-7xl mx-auto w-full relative space-y-[var(--section-gap)]">
        <div className="mb-12 relative z-10 w-full overflow-hidden">
          <h1 className="font-headline text-[4.8vw] md:text-6xl text-[#e5e2e1] tracking-tighter uppercase mb-2 mt-8 whitespace-nowrap max-w-full leading-[0.9]">DEPLOYED_PROJECTS</h1>
          <div className="flex items-center gap-4 text-[#00f4fe] font-label text-sm uppercase tracking-widest">
            <span className="material-symbols-outlined text-sm">memory</span>
            <span>PORTFOLIO_SYSTEM: ONLINE // HIGHLIGHTING {data.projects.length} ACTIVE NODES</span>
          </div>
          <div className="h-px w-full max-w-md bg-gradient-to-r from-[#d90429] to-transparent mt-6 opacity-30"></div>
        </div>

        <ProjectsGridSection projects={data.projects} isEditable={false} />
      </main>
    </>
  );
}
