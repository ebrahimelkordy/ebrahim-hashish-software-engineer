import prisma from "@/lib/prisma";
import { updateSiteConfig, addProject, deleteProject } from "@/app/actions";
import { Settings, Plus, Trash2, Save, LogOut, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { logout } from "@/lib/auth-actions";

export default async function DashboardPage() {
  const hero = await prisma.hero.findUnique({ where: { id: 1 } });
  const about = await prisma.about.findUnique({ where: { id: 1 } });
  
  const config = {
    heroTitle: hero?.title,
    aboutText: about?.bio
  };

  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Mini Nav */}
      <nav className="p-6 border-b border-[#111111] flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-md z-50">
        <Link href="/" className="flex items-center gap-2 text-[10px] font-bold uppercase text-zinc-500 hover:text-white transition-all">
          <ChevronLeft className="w-3 h-3" /> Exit_System
        </Link>
        <div className="flex items-center gap-6">
          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Control_Center_v1</span>
          <form action={logout}>
            <button type="submit" className="text-[10px] font-bold text-zinc-600 hover:text-red-500 uppercase transition-all flex items-center gap-1">
              <LogOut className="w-3 h-3" /> Logout
            </button>
          </form>
        </div>
      </nav>

      <main className="p-6 flex flex-col gap-12">
        {/* Global Config */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Settings className="w-4 h-4 text-indigo-500" />
            <h2 className="text-[10px] font-bold uppercase tracking-widest">Global Configuration</h2>
          </div>
          
          <form action={async (formData) => {
            "use server";
            await updateSiteConfig({
              heroTitle: formData.get("heroTitle") as string,
              aboutText: formData.get("aboutText") as string,
            });
          }} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[8px] font-bold text-zinc-500 uppercase">System Identity (Title)</label>
              <input name="heroTitle" defaultValue={config?.heroTitle} className="bg-[#080808] border border-[#111111] p-3 text-xs font-mono outline-none focus:border-indigo-600 transition-all" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[8px] font-bold text-zinc-500 uppercase">System Narrative (About)</label>
              <textarea name="aboutText" defaultValue={config?.aboutText} className="bg-[#080808] border border-[#111111] p-3 text-xs font-mono outline-none focus:border-indigo-600 transition-all h-24" />
            </div>
            <button type="submit" className="px-4 py-3 bg-indigo-600 text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
              <Save className="w-3 h-3" /> Commit_Changes
            </button>
          </form>
        </section>

        {/* Project Manager */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4 text-indigo-500" />
              <h2 className="text-[10px] font-bold uppercase tracking-widest">Project Registry</h2>
            </div>
          </div>

          {/* Add Project Form */}
          <form action={async (formData) => {
            "use server";
            await addProject({
              title: formData.get("title") as string,
              description: formData.get("description") as string,
              techStack: formData.get("techStack") as string,
              projectUrl: formData.get("projectUrl") as string,
            });
          }} className="system-card mb-8 flex flex-col gap-4 border-dashed">
            <input name="title" placeholder="Project Title" required className="bg-transparent border-b border-[#111111] py-2 text-xs font-mono outline-none focus:border-indigo-600" />
            <textarea name="description" placeholder="Short description..." required className="bg-transparent border-b border-[#111111] py-2 text-xs font-mono outline-none focus:border-indigo-600" />
            <input name="techStack" placeholder="React, Next.js, etc." required className="bg-transparent border-b border-[#111111] py-2 text-xs font-mono outline-none focus:border-indigo-600" />
            <button type="submit" className="w-full py-3 bg-white text-black text-[10px] font-bold uppercase tracking-widest">
              Add_Entry
            </button>
          </form>

          {/* Current Projects */}
          <div className="flex flex-col gap-4">
            {projects.map((project: any) => (
              <div key={project.id} className="p-4 border border-[#111111] rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold">{project.title}</p>
                  <p className="text-[9px] text-zinc-500 font-mono mt-1 uppercase">{project.id.slice(0, 8)}</p>
                </div>
                <form action={async () => {
                  "use server";
                  await deleteProject(project.id);
                }}>
                  <button type="submit" className="p-2 text-red-900 hover:text-red-500 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </form>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="p-8 mt-auto border-t border-[#111111] flex justify-center">
        <form action={logout}>
          <button type="submit" className="flex items-center gap-2 text-zinc-800 text-[10px] font-bold uppercase hover:text-red-900 transition-all">
            <LogOut className="w-3 h-3" /> Terminate_Session
          </button>
        </form>
      </footer>
    </div>
  );
}
