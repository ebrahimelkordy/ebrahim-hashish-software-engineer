"use client";

import Link from "next/link";

export const PostsPreview = ({ posts }: { posts: any[] }) => {
  // Take up to 2 posts for the home page preview
  const featuredPosts = posts.slice(0, 2);

  return (
    <section className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#353534] pb-6 gap-4">
        <div>
          <p className="font-body text-[#d90429] text-xs uppercase tracking-[0.2em] mb-2 before:content-['//'] before:mr-2">Intellectual Assets</p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-[#e5e2e1]">TECHNICAL_LOGS</h2>
        </div>
        <Link href="/posts" className="font-label text-sm uppercase tracking-widest text-[#e7bcba] hover:text-[#d90429] transition-colors flex items-center gap-2 group">
          READ ALL <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {featuredPosts.map((post, idx) => (
          <article key={post.id} className="relative group border border-[#5d3f3d]/20 p-6 hover:border-[#d90429]/50 transition-all duration-500 overflow-hidden bg-[#0e0e0e]">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#d90429] opacity-[0.03] blur-2xl group-hover:opacity-10 transition-opacity"></div>
            
            <div className="flex justify-between items-start mb-6">
               <div className="space-y-1">
                 <p className="font-label text-[10px] text-[#00f4fe] uppercase tracking-widest">{post.date}</p>
                 <p className="font-label text-[10px] text-[#e7bcba] uppercase tracking-[0.2em] opacity-50">{post.readTime}</p>
               </div>
               {post.isPinned && (
                  <span className="material-symbols-outlined text-[#d90429] text-sm animate-pulse">push_pin</span>
               )}
            </div>

            <h3 className="font-headline text-xl font-bold text-[#e5e2e1] mb-3 group-hover:text-[#d90429] transition-colors line-clamp-2 uppercase leading-tight">
              {post.title}
            </h3>
            
            <p className="font-body text-sm text-[#e7bcba] opacity-70 mb-6 line-clamp-3 leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.slice(0, 3).map((tag: string) => (
                <span key={tag} className="text-[9px] uppercase tracking-widest text-[#e7bcba] border border-[#5d3f3d]/30 px-2 py-0.5 bg-black/40">
                  {tag}
                </span>
              ))}
            </div>

            <Link href="/posts" className="inline-flex items-center gap-2 font-label text-[10px] text-[#d90429] uppercase tracking-[0.3em] font-bold group/link">
              ACCESS_FILE <span className="material-symbols-outlined text-xs group-hover/link:translate-x-2 transition-transform">chevron_right</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};
