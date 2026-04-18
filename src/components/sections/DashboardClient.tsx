"use client";

import { useState } from "react";
import { HeroSection } from "./HeroSection";
import { IdentitySection } from "./IdentitySection";
import { SkillsSection } from "./SkillsSection";
import { ExperienceSection } from "./ExperienceSection";
import { StudiesSection } from "./StudiesSection";
import { CertificatesSection } from "./CertificatesSection";
import { ProjectsGridSection } from "./ProjectsGridSection";
import { PostsSection } from "./PostsSection";
import { ContactSection } from "./ContactSection";
import { 
  addSkill, deleteSkill, updateSkill,
  addExperience, deleteExperience, updateExperience,
  addStudy, deleteStudy, updateStudy,
  addCertificate, deleteCertificate, updateCertificate,
  toggleProjectPin, togglePostPin,
  updateOrder,
  addProject, deleteProject,
  addBlogPost, deleteBlogPost, updateBlogPost,
  updateHero, updateAbout, updateContact
} from "@/lib/actions";

export function DashboardClient({ initialData }: { initialData: any }) {
  const [data, setData] = useState(initialData);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // --- LOCAL UPDATE HANDLERS ---
  const handleHeroUpdate = (newData: any) => {
    setData((prev: any) => ({ ...prev, hero: newData }));
    setIsDirty(true);
  };

  const handleAboutUpdate = (newData: any) => {
    setData((prev: any) => ({ ...prev, about: newData }));
    setIsDirty(true);
  };

  const handleContactUpdate = (newData: any) => {
    setData((prev: any) => ({ ...prev, contact: newData }));
    setIsDirty(true);
  };

  const handleExperienceUpdate = (id: string, update: any) => {
    setData((prev: any) => ({
      ...prev,
      experiences: prev.experiences.map((ex: any) => ex.id === id ? { ...ex, ...update } : ex)
    }));
    setIsDirty(true);
  };

  const handleStudyUpdate = (id: string, update: any) => {
    setData((prev: any) => ({
      ...prev,
      studies: prev.studies.map((st: any) => st.id === id ? { ...st, ...update } : st)
    }));
    setIsDirty(true);
  };

  const handleCertificateUpdate = (id: string, update: any) => {
    setData((prev: any) => ({
      ...prev,
      certificates: prev.certificates.map((ce: any) => ce.id === id ? { ...ce, ...update } : ce)
    }));
    setIsDirty(true);
  };

  const handlePostUpdate = (id: string, update: any) => {
    setData((prev: any) => ({
      ...prev,
      posts: prev.posts.map((ps: any) => ps.id === id ? { ...ps, ...update } : ps)
    }));
    setIsDirty(true);
  };

  // --- ACTIONS (IMMEDIATE DB OPERATIONS) ---
  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      await updateHero(data.hero);
      await updateAbout(data.about);
      await updateContact(data.contact);
      
      // Bulk update entities
      await Promise.all([
        ...data.experiences.map((ex: any) => updateExperience(ex.id, ex)),
        ...data.studies.map((st: any) => updateStudy(st.id, st)),
        ...data.certificates.map((ce: any) => updateCertificate(ce.id, ce)),
        ...data.posts.map((ps: any) => updateBlogPost(ps.id, ps))
      ]);

      setIsDirty(false);
      window.location.reload();
    } catch (err) {
      alert("Failed to sync some repository nodes. Check logs.");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDiscard = () => {
    if (confirm("Discard all uncommitted buffer data?")) {
      window.location.reload();
    }
  };

  // --- IMMEDIATE DB HELPERS (ADD/DELETE) ---
  const handleAddSkill = async (category: string) => {
    const name = prompt(`Enter skill name for [${category}]:`);
    if (!name) return;
    await addSkill({ name, category, order: 0 });
    window.location.reload(); 
  };

  const handleAddExperience = async () => {
    await addExperience({ title: "New Role", company: "New Company", period: "2024 - Present", description: "...", order: 0 });
    window.location.reload();
  };

  const handleAddStudy = async () => {
    await addStudy({ degree: "New Degree", institution: "New Institution", year: "2024", description: "...", order: 0 });
    window.location.reload();
  };

  const handleAddCertificate = async () => {
    await addCertificate({ title: "New Certificate", issuer: "Issuer", date: "2024", imageUrl: "", order: 0 });
    window.location.reload();
  };

  const handleAddProject = async () => {
    await addProject();
    window.location.reload();
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm("Permanently delete this project?")) {
      await deleteProject(id);
      window.location.reload();
    }
  };

  const handleAddPost = async () => {
    await addBlogPost();
    window.location.reload();
  };

  const handleDeletePost = async (id: string) => {
    if (confirm("Permanently delete this contact entry?")) {
      await deleteBlogPost(id);
      window.location.reload();
    }
  };

  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-32 space-y-32 pt-[100px]">
      {/* HOMEPAGE SECTIONS */}
      <div className="border border-[#d90429]/30 p-8 rounded relative">
         <div className="absolute top-[-10px] left-4 bg-black px-2 text-[#d90429] font-label text-xs uppercase tracking-widest">PAGE: HOME</div>
         <HeroSection data={data.hero} isEditable={true} onUpdate={handleHeroUpdate} />
      </div>

      {/* PROFILE SECTIONS */}
      <div className="border border-[#d90429]/30 p-8 rounded relative space-y-16">
         <div className="absolute top-[-10px] left-4 bg-black px-2 text-[#d90429] font-label text-xs uppercase tracking-widest">PAGE: IDENTITY</div>
         <IdentitySection data={data.about} isEditable={true} onUpdate={handleAboutUpdate} />
         <SkillsSection 
           skills={data.skills} 
           isEditable={true} 
           onAdd={handleAddSkill} 
           onDelete={async (id) => { if(confirm("Delete?")) { await deleteSkill(id); window.location.reload(); } }} 
         />
         <ExperienceSection 
           experiences={data.experiences} 
           isEditable={true} 
           onAdd={handleAddExperience}
           onUpdate={handleExperienceUpdate}
           onDelete={async (id) => { if(confirm("Delete?")) { await deleteExperience(id); window.location.reload(); } }}
         />
         <StudiesSection 
           studies={data.studies} 
           isEditable={true} 
           onAdd={handleAddStudy}
           onUpdate={handleStudyUpdate}
           onDelete={async (id) => { if(confirm("Delete?")) { await deleteStudy(id); window.location.reload(); } }}
         />
         <CertificatesSection 
           certificates={data.certificates} 
           isEditable={true} 
           onAdd={handleAddCertificate}
           onUpdate={handleCertificateUpdate}
           onDelete={async (id) => { if(confirm("Delete?")) { await deleteCertificate(id); window.location.reload(); } }}
         />
      </div>

      {/* PROJECTS SECTION */}
      <div className="border border-[#d90429]/30 p-8 rounded relative">
         <div className="absolute top-[-10px] left-4 bg-black px-2 text-[#d90429] font-label text-xs uppercase tracking-widest">PAGE: PROJECTS</div>
         <div className="mb-8 flex justify-between items-center gap-4">
            <span className="text-[#e7bcba] text-[10px] uppercase font-mono tracking-widest">Control: Pinning enables large display on home page.</span>
            <button 
              onClick={handleAddProject}
              className="px-4 py-2 bg-[#d90429] text-white font-label text-[10px] uppercase tracking-widest hover:bg-[#b00320] transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">add_box</span> NEW_PROJECT_ENTITY
            </button>
         </div>
         <ProjectsGridSection 
           projects={data.projects} 
           isEditable={true} 
           onTogglePin={async (id, pin) => { await toggleProjectPin(id, pin); window.location.reload(); }}
           onUpdateOrder={async (id, order) => { await updateOrder('project', id, order); window.location.reload(); }}
           onDelete={handleDeleteProject}
         />
      </div>

      {/* POSTS SECTION */}
      <div className="border border-[#d90429]/30 p-8 rounded relative w-full mx-auto">
         <div className="absolute top-[-10px] left-4 bg-black px-2 text-[#d90429] font-label text-xs uppercase tracking-widest">PAGE: POSTS</div>
         <div className="mb-8 flex justify-end">
            <button 
              onClick={handleAddPost}
              className="px-4 py-2 bg-[#d90429] text-white font-label text-[10px] uppercase tracking-widest hover:bg-[#b00320] transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">edit_note</span> NEW_POST_LOG
            </button>
         </div>
          <PostsSection 
            posts={data.posts} 
            isEditable={true} 
            onUpdate={handlePostUpdate}
            onTogglePin={async (id, pin) => { await togglePostPin(id, pin); window.location.reload(); }}
            onUpdateOrder={async (id, order) => { await updateOrder('blogPost', id, order); window.location.reload(); }}
            onDelete={handleDeletePost}
          />
      </div>

      {/* CONTACT SECTION */}
      <div className="border border-[#d90429]/30 p-8 rounded relative">
         <div className="absolute top-[-10px] left-4 bg-black px-2 text-[#d90429] font-label text-xs uppercase tracking-widest">PAGE: CONTACT (HERO)</div>
         <ContactSection contact={data.contact} isEditable={true} onUpdate={handleContactUpdate} />
      </div>

      {/* UNIFIED COMMIT BAR */}
      {isDirty && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-4 bg-black/80 backdrop-blur-xl border border-[#d90429] p-4 shadow-[0_0_50px_rgba(217,4,41,0.3)] animate-in fade-in slide-in-from-bottom-8 duration-500">
           <div className="flex flex-col">
              <span className="text-[#d90429] font-label text-[10px] uppercase tracking-[0.2em] font-bold">Uncommitted Changes Detected</span>
              <span className="text-[#e7bcba] font-mono text-[9px] uppercase">Buffer status: DIRTY</span>
           </div>
           <div className="h-8 w-px bg-[#d90429]/20 mx-2"></div>
           <button 
             onClick={handleDiscard}
             disabled={isSaving}
             className="px-6 py-2 bg-transparent border border-[#5d3f3d] text-[#e7bcba] font-label text-xs uppercase tracking-widest hover:bg-[#d90429]/10 transition-all disabled:opacity-50"
           >
              DISCARD_BUFFER
           </button>
           <button 
             onClick={handleSaveAll}
             disabled={isSaving}
             className="px-8 py-2 bg-[#d90429] text-white font-label text-xs uppercase tracking-widest font-bold hover:shadow-[0_0_20px_rgba(217,4,41,0.4)] transition-all disabled:opacity-50 flex items-center gap-2"
           >
              <span className={`material-symbols-outlined text-sm ${isSaving ? 'animate-spin' : ''}`}>
                {isSaving ? 'sync' : 'database'}
              </span>
              {isSaving ? 'SYNCING_NODES...' : 'COMMIT_ALL_CHANGES'}
           </button>
        </div>
      )}
    </main>
  );
}
