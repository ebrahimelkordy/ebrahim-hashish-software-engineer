"use client";

import { EditableText } from "../EditableText";
import { EditableImage } from "../EditableImage";
import Link from "next/link";

export const PostsSection = ({ 
  posts, 
  isEditable = false,
  onTogglePin,
  onUpdateOrder,
  onDelete,
  onUpdate
}: { 
  posts: any[], 
  isEditable?: boolean,
  onTogglePin?: (id: string, pin: boolean) => void,
  onUpdateOrder?: (id: string, order: number) => void,
  onDelete?: (id: string) => void,
  onUpdate?: (id: string, data: any) => void
}) => {
  const handleLocalUpdate = (post: any, field: string, value: string) => {
    onUpdate?.(post.id, { [field]: value });
  };
  return (
    <div className="flex flex-col gap-8 relative z-10">
      {posts.map((post) => (
        <article key={post.id} className="glass-panel border border-[#5d3f3d]/20 p-6 md:p-8 relative group hover:bg-[#201f1f] transition-all duration-300">
          {/* Admin Controls */}
          {isEditable && (
            <div className="absolute top-0 right-0 left-0 bg-[#0e0e0e]/95 p-3 flex justify-between items-center z-50 border-b border-[#d90429]/30">
               <div className="flex gap-2">
                 <button 
                   onClick={() => onTogglePin?.(post.id, !post.isPinned)}
                   className={`p-1 border flex items-center gap-1 text-[9px] uppercase tracking-widest ${post.isPinned ? 'bg-[#00f4fe] text-black border-[#00f4fe]' : 'text-[#e7bcba] border-[#5d3f3d]/30 hover:border-[#00f4fe]'}`}
                 >
                   <span className="material-symbols-outlined text-xs">push_pin</span>
                   {post.isPinned ? 'PINNED' : 'PIN'}
                 </button>
                 <input 
                   type="number" 
                   defaultValue={post.order}
                   onBlur={(e) => onUpdateOrder?.(post.id, parseInt(e.target.value))}
                   className="w-12 bg-black border border-[#5d3f3d]/30 text-[9px] px-1 text-[#00f4fe] outline-none h-6"
                 />
               </div>
               <button 
                 onClick={() => onDelete?.(post.id)}
                 className="p-1 border border-[#d90429]/30 text-[#d90429] hover:bg-[#d90429] hover:text-white transition-all"
               >
                 <span className="material-symbols-outlined text-xs">delete</span>
               </button>
            </div>
          )}

          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-[#d90429] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center mb-6 mt-4">
            <div className="flex items-center gap-4">
              <span className="font-label text-[10px] uppercase tracking-widest text-[#00f4fe] bg-[#00f4fe]/10 px-2 py-1 border border-[#00f4fe]/20">
                DATE: <EditableText value={post.date} onChange={(v) => handleLocalUpdate(post, 'date', v)} isEditable={isEditable} />
              </span>
              <span className="font-label text-[10px] uppercase tracking-widest text-[#e7bcba]">
                <EditableText value={post.readTime} onChange={(v) => handleLocalUpdate(post, 'readTime', v)} isEditable={isEditable} />
              </span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {isEditable ? (
                <div className="flex flex-col gap-1 w-full">
                  <span className="text-[8px] text-[#00f4fe] uppercase font-mono tracking-widest">TAG_STREAM:</span>
                  <EditableText 
                    value={post.tags.join(', ')} 
                    onChange={(v) => {
                      const tagArray = v.split(',').map(t => t.trim()).filter(t => t !== "");
                      handleLocalUpdate(post, 'tags', tagArray as any);
                    }} 
                    isEditable={isEditable} 
                  />
                </div>
              ) : (
                post.tags.map((tag: string) => (
                  <span key={tag} className="px-2 py-1 bg-[#0e0e0e] text-[#e7bcba] font-body text-[10px] border border-[#5d3f3d]/30 tracking-widest">
                    {tag}
                  </span>
                ))
              )}
            </div>
          </div>

          <h2 className="font-headline text-2xl md:text-3xl font-bold text-[#e5e2e1] mb-4 uppercase group-hover:text-[#00f4fe] transition-colors">
            {isEditable ? (
              <EditableText value={post.title} onChange={(v) => handleLocalUpdate(post, 'title', v)} isEditable={isEditable} />
            ) : (
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            )}
          </h2>
          <p className="font-body text-[#e7bcba] text-sm leading-relaxed mb-6">
            <EditableText value={post.excerpt} onChange={(v) => handleLocalUpdate(post, 'excerpt', v)} isEditable={isEditable} multiline />
          </p>

          {isEditable && (
            <div className="mt-4 p-4 bg-black/40 border border-[#5d3f3d]/20 space-y-4">
               <div className="flex flex-col gap-1">
                  <span className="text-[8px] text-[#00f4fe] uppercase font-mono tracking-widest">SLUG_LOCK:</span>
                  <EditableText value={post.slug || ""} onChange={(v) => handleLocalUpdate(post, 'slug', v)} isEditable={isEditable} />
               </div>
               <div className="flex flex-col gap-2">
                  <span className="text-[8px] text-[#00f4fe] uppercase font-mono tracking-widest">POST_ASSET_MANAGER:</span>
                  <div className="w-40 aspect-video relative">
                    <EditableImage 
                      src={post.imageUrl || ""} 
                      alt={post.title} 
                      onChange={(v) => handleLocalUpdate(post, 'imageUrl', v)} 
                      isEditable={isEditable} 
                    />
                  </div>
               </div>
               <div className="flex flex-col gap-1">
                  <span className="text-[8px] text-[#00f4fe] uppercase font-mono tracking-widest">FULL_FILE_CONTENT:</span>
                  <EditableText value={post.content || ""} onChange={(v) => handleLocalUpdate(post, 'content', v)} isEditable={isEditable} multiline />
               </div>
            </div>
          )}

          {!isEditable && (
             <Link href={`/posts/${post.slug}`} className="flex items-center gap-2 text-[#d90429] font-label text-xs uppercase tracking-[0.2em] hover:text-[#00f4fe] transition-colors">
               READ_FILE <span className="material-symbols-outlined text-sm group-hover:translate-x-2 transition-transform">arrow_forward</span>
             </Link>
          )}
        </article>
      ))}
    </div>
  );
};
