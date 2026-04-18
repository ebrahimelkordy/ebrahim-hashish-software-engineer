"use client";

import { useState, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { EditableText } from "@/components/EditableText";
import { EditableImage } from "@/components/EditableImage";
import { EditableList } from "@/components/EditableList";
import { TechManifestEditor } from "@/components/TechManifestEditor";
import Link from "next/link";
import { updateProject, deleteProject } from "@/lib/actions";
import { useRouter } from "next/navigation";

export function ProjectDetailClient({ project: initialProject, isEditable }: { project: any, isEditable: boolean }) {
  const [project, setProject] = useState(initialProject);
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [isBulkUploading, setIsBulkUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleLocalUpdate = (field: string, value: any) => {
     setProject((prev: any) => ({ ...prev, [field]: value }));
     setIsDirty(true);
  };

  const handleSave = async () => {
     setIsSaving(true);
     try {
       const res = await updateProject(project.id, {
         ...project,
         description: JSON.stringify(project.description),
         techStack: JSON.stringify(project.techStack),
         features: JSON.stringify(project.features),
         screenshots: JSON.stringify(project.screenshots),
       });
       
       if (res.success && res.project) {
          setProject((prev: any) => ({ ...prev, id: (res as any).project.id }));
          setIsDirty(false);
          alert("PROJECT_ENTITY_SYNC_COMPLETE");
       }
     } catch (err) {
       console.error("Save failed", err);
       alert("SYNC_FAILURE: check terminal logs");
     } finally {
       setIsSaving(false);
     }
  };

  const handleDelete = async () => {
    if (confirm("DANGER: Permanently delete this project entity?")) {
      await deleteProject(project.id);
      router.push("/dashboard");
    }
  };

  const addScreenshot = () => {
    const next = [...project.screenshots, { src: "", caption: "New Screenshot" }];
    handleLocalUpdate('screenshots', next);
  };

  const removeScreenshot = (index: number) => {
    const next = project.screenshots.filter((_: any, i: number) => i !== index);
    handleLocalUpdate('screenshots', next);
  };

  const setAsBackground = (index: number) => {
    const next = [...project.screenshots];
    const target = next.splice(index, 1)[0];
    next.unshift(target);
    handleLocalUpdate('screenshots', next);
  };

  const handleBulkUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      alert("Cloudinary config missing.");
      return;
    }

    setIsBulkUploading(true);
    const newScreenshots = [...project.screenshots];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          const data = await res.json();
          newScreenshots.push({ src: data.secure_url, caption: file.name.split('.')[0] });
        }
      }
      handleLocalUpdate('screenshots', newScreenshots);
    } catch (err) {
      console.error("Bulk upload failed", err);
      alert("Some files failed to upload.");
    } finally {
      setIsBulkUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <Navbar />
      
      {/* Background Glows */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-[#d90429] opacity-5 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-[#00f4fe] opacity-5 blur-[150px] rounded-full pointer-events-none z-0"></div>

      {/* Manual Save Floating Bar */}
      {isEditable && isDirty && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-4 bg-[#0e0e0e] border border-[#00f4fe] p-4 shadow-[0_0_30px_rgba(0,245,255,0.2)] animate-in fade-in slide-in-from-bottom-4">
           <div className="flex flex-col">
              <span className="text-[#00f4fe] font-mono text-[10px] uppercase font-bold tracking-widest">UNSAVED_CHANGES_DETECTED</span>
              <span className="text-[#e7bcba] font-body text-[10px]">Buffer contains modified project entity data.</span>
           </div>
           <div className="h-8 w-px bg-[#5d3f3d]/30 mx-2"></div>
           <button 
             onClick={handleSave}
             disabled={isSaving}
             className="px-6 py-2 bg-[#00f4fe] text-black font-label text-xs uppercase font-bold tracking-widest hover:bg-white transition-all flex items-center gap-2 group"
           >
             {isSaving ? (
               <span className="material-symbols-outlined animate-spin text-sm">sync</span>
             ) : (
               <span className="material-symbols-outlined text-sm group-hover:scale-125 transition-transform">save</span>
             )}
             COMMIT_CHANGES
           </button>
           <button 
             onClick={() => { if(confirm("Discard all changes?")) { setProject(initialProject); setIsDirty(false); } }}
             className="px-4 py-2 border border-[#d90429]/30 text-[#d90429] font-label text-xs uppercase tracking-widest hover:bg-[#d90429]/5 transition-colors"
           >
             DISCARD
           </button>
        </div>
      )}

      {(isSaving || isBulkUploading) && (
        <div className="fixed top-4 right-4 z-[100] flex items-center gap-2 bg-[#00f4fe] text-black px-4 py-2 font-mono text-xs font-bold animate-pulse">
           <span className="material-symbols-outlined text-sm">sync</span> {isBulkUploading ? 'UPLOADING_BATCH...' : 'SYNCING_CHANGES...'}
        </div>
      )}

      <main className="flex-grow pt-24 pb-32 px-6 md:px-12 max-w-5xl mx-auto w-full relative">
        <div className="flex items-center justify-between mb-8 mt-8 relative z-10">
          <div className="flex items-center gap-2 text-[#e7bcba] font-body text-xs uppercase tracking-widest">
            <Link href="/projects" className="hover:text-[#00f4fe] transition-colors">WORK</Link>
            <span className="text-[#5d3f3d]">/</span>
            <span className="text-[#00f4fe]">{project.codeName}</span>
          </div>

          {isEditable && (
            <button 
              onClick={handleDelete}
              className="flex items-center gap-2 px-3 py-1 text-[#d90429] border border-[#d90429]/30 font-label text-[10px] uppercase tracking-widest hover:bg-[#d90429]/5 transition-all"
            >
              <span className="material-symbols-outlined text-sm">delete_forever</span>
              PURGE_ENTITY
            </button>
          )}
        </div>

        {/* Header */}
        <header className="mb-12 relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <span className="px-3 py-1 bg-[#d90429]/10 border border-[#d90429]/30 text-[#d90429] font-label text-[10px] uppercase tracking-widest">
               <EditableText value={project.status} onChange={(v) => handleLocalUpdate('status', v)} isEditable={isEditable} />
            </span>
            <span className="text-[#e7bcba] font-label text-[10px] uppercase tracking-widest">
               <EditableText value={project.year} onChange={(v) => handleLocalUpdate('year', v)} isEditable={isEditable} />
            </span>
          </div>
          <h1 className="font-headline text-4xl md:text-6xl text-[#e5e2e1] tracking-tighter uppercase mb-3">
             <EditableText value={project.title} onChange={(v) => handleLocalUpdate('title', v)} isEditable={isEditable} />
          </h1>
          <p className="font-body text-lg text-[#e7bcba] leading-relaxed max-w-2xl border-l-2 border-[#00f4fe] pl-4">
             <EditableText value={project.tagline} onChange={(v) => handleLocalUpdate('tagline', v)} isEditable={isEditable} />
          </p>
        </header>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-16 relative z-10">
          <div className="flex items-center gap-2">
            <a href={project.liveUrl || "#"} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 px-6 py-3 bg-[#d90429] text-white font-label text-sm uppercase tracking-widest font-bold hover:shadow-[0_0_20px_rgba(217,4,41,0.4)] transition-all active:scale-95">
              <span className="material-symbols-outlined text-sm">rocket_launch</span>
              LIVE_DEMO
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">open_in_new</span>
            </a>
            {isEditable && (
              <div className="bg-[#1c1b1b] p-2 border border-[#5d3f3d]/30 text-xs">
                 <EditableText value={project.liveUrl} placeholder="Enter Live URL" onChange={(v) => handleLocalUpdate('liveUrl', v)} isEditable={isEditable} />
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <a href={project.repoUrl || "#"} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 px-6 py-3 border border-[#5d3f3d]/30 text-[#e7bcba] font-label text-sm uppercase tracking-widest hover:border-[#e7bcba] transition-all active:scale-95">
              <span className="material-symbols-outlined text-sm group-hover:scale-110 transition-transform">code</span>
              SOURCE_REPOSITORY
            </a>
            {isEditable && (
              <div className="bg-[#1c1b1b] p-2 border border-[#5d3f3d]/30 text-xs text-[#00f4fe]">
                 <EditableText value={project.repoUrl} placeholder="Enter Repo URL" onChange={(v) => handleLocalUpdate('repoUrl', v)} isEditable={isEditable} />
              </div>
            )}
          </div>
        </div>

        {/* Summary Section */}
        <section className="mb-16 relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <span className="material-symbols-outlined text-[#00f4fe]">description</span>
            <h2 className="font-headline text-2xl font-bold text-[#e5e2e1] uppercase tracking-tight">PROJECT_SUMMARY</h2>
            <div className="h-px flex-grow bg-[#2a2a2a]"></div>
          </div>
          <div className="space-y-4">
             <EditableList 
                items={project.description} 
                onChange={(v) => handleLocalUpdate('description', v)} 
                isEditable={isEditable} 
                label="DESCRIPTION_PARA"
             />
          </div>
        </section>

        {/* Screenshots */}
        <section className="mb-16 relative z-10">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-[#d90429]">screenshot_monitor</span>
              <h2 className="font-headline text-2xl font-bold text-[#e5e2e1] uppercase tracking-tight">SCREEN_CAPTURES</h2>
            </div>
            <div className="h-px flex-grow bg-[#2a2a2a]"></div>
            {isEditable && (
              <div className="flex gap-2">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  multiple 
                  onChange={handleBulkUpload} 
                  className="hidden" 
                  accept="image/*"
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-[#00f4fe] text-black font-label text-[10px] uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">library_add</span> BATCH_UPLOAD
                </button>
                <button 
                  onClick={addScreenshot}
                  className="px-4 py-2 bg-[#d90429] text-white font-label text-[10px] uppercase tracking-widest hover:bg-[#b00320] transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">add</span> ADD_NODE
                </button>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.screenshots.map((shot: any, i: number) => (
              <div key={i} className="relative group">
                {i === 0 && (
                  <div className="absolute top-2 left-2 z-20 px-2 py-1 bg-[#00f4fe] text-black font-label text-[8px] font-bold uppercase tracking-widest shadow-lg">
                    [SITE_BACKGROUND_IMAGE]
                  </div>
                )}
                <div className="aspect-video relative overflow-hidden border border-[#5d3f3d]/20 bg-[#1c1b1b]">
                  <EditableImage 
                    src={shot.src} 
                    alt={shot.caption}
                    onChange={(v) => {
                      const next = [...project.screenshots];
                      next[i] = { ...next[i], src: v };
                      handleLocalUpdate('screenshots', next);
                    }}
                    isEditable={isEditable}
                    containerClassName="absolute inset-0 w-full h-full"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-30 z-10"></div>
                  
                  {isEditable && (
                    <div className="absolute top-2 right-2 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {i !== 0 && (
                        <button 
                          onClick={() => setAsBackground(i)}
                          title="Set as Main Background"
                          className="p-2 bg-black/80 text-[#00f4fe] border border-[#00f4fe]/30 hover:bg-[#00f4fe] hover:text-black transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">wallpaper</span>
                        </button>
                      )}
                      <button 
                        onClick={() => removeScreenshot(i)}
                        className="p-2 bg-black/80 text-[#d90429] border border-[#d90429]/30 hover:bg-[#d90429] hover:text-white transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  )}
                </div>
                <div className="mt-2 text-center">
                   <EditableText value={shot.caption} onChange={(v) => {
                      const next = [...project.screenshots];
                      next[i] = { ...next[i], caption: v };
                      handleLocalUpdate('screenshots', next);
                   }} isEditable={isEditable} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-16 relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <span className="material-symbols-outlined text-[#00f4fe]">memory</span>
            <h2 className="font-headline text-2xl font-bold text-[#e5e2e1] uppercase tracking-tight">TECH_MANIFEST</h2>
            <div className="h-px flex-grow bg-[#2a2a2a]"></div>
          </div>
          
          <TechManifestEditor 
             data={project.techStack} 
             onChange={(v) => handleLocalUpdate('techStack', v)} 
             isEditable={isEditable} 
          />
        </section>

        {/* Features */}
        <section className="mb-16 relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <span className="material-symbols-outlined text-[#d90429]">checklist</span>
            <h2 className="font-headline text-2xl font-bold text-[#e5e2e1] uppercase tracking-tight">FEATURE_LOG</h2>
            <div className="h-px flex-grow bg-[#2a2a2a]"></div>
          </div>
          <div className="bg-[#0e0e0e] border border-[#5d3f3d]/20 p-6 font-mono text-sm relative overflow-hidden">
             <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-20"></div>
             <EditableList 
               items={project.features} 
               onChange={(v) => handleLocalUpdate('features', v)} 
               isEditable={isEditable} 
               label="FEATURES"
             />
             <div className="mt-4 pt-3 border-t border-[#5d3f3d]/20">
              <span className="text-[#00f4fe] animate-pulse">█</span>
              <span className="text-[#5d3f3d] ml-2">END_OF_LOG</span>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
