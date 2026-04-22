import { getPostData, getPortfolioData } from "@/lib/data-fetching";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TerminalImage } from "@/components/TerminalImage";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const data = await getPortfolioData();
  return data.posts.map((post: any) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const portfolioData = await getPortfolioData();
  const post = await getPostData(slug);

  if (!post) {
    notFound();
  }

  const cvUrl = portfolioData.about.cvUrl;


  return (
    <main className="min-h-screen bg-[#0e0e0e] text-[#e5e2e1] font-body selection:bg-[#d90429] selection:text-white">
      {/* NAVIGATION OVERLAY */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0e0e0e]/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <Link href="/" className="font-headline font-bold text-lg tracking-tighter hover:text-[#d90429] transition-colors">
          EBRAHIM<span className="text-[#d90429]">.</span>HASHISH
        </Link>
        <div className="flex items-center gap-6">
          {cvUrl && (
            <a 
              href={cvUrl} 
              download
              target="_blank"
              rel="noopener noreferrer"
              className="font-label text-[10px] tracking-[0.2em] text-[#00F5FF] hover:bg-[#00F5FF]/10 px-3 py-1.5 border border-[#00F5FF]/20 transition-all flex items-center gap-2"
            >
               <span className="material-symbols-outlined text-xs">download</span>
               [EXPORT_CV]
            </a>
          )}
          <Link href="/#posts" className="font-label text-xs uppercase tracking-[0.2em] text-[#e7bcba] hover:text-[#00f4fe] transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">arrow_back</span> BACK_TO_LOGS
          </Link>
        </div>
      </nav>

      <article className="pt-32 pb-24 px-6 md:px-0 max-w-4xl mx-auto">
        {/* HEADER SECTION */}
        <header className="space-y-6 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-wrap gap-3">
            {post.tags.map((tag: string) => (
              <span key={tag} className="px-2 py-1 bg-[#d90429]/10 text-[#d90429] text-[10px] font-label uppercase tracking-widest border border-[#d90429]/20">
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="font-headline text-4xl md:text-6xl font-black tracking-tighter leading-none uppercase">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 text-[9px] font-label uppercase tracking-[0.2em] text-[#e7bcba] opacity-50 bg-white/5 w-max px-4 py-2 border border-white/10">
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-xs text-[#d90429]">event</span> {post.date}
            </span>
            <span className="h-3 w-[1px] bg-white/20 mx-1"></span>
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-xs text-[#00f4fe]">speed</span> {post.readTime}
            </span>
          </div>
        </header>

        {/* FEATURED IMAGE - RENDERS ONLY IF EXISTS */}
        {post.imageUrl && (post.imageUrl.startsWith('/') || post.imageUrl.startsWith('http')) ? (
          <div className="relative aspect-video w-full mb-16 glass-panel border border-white/10 overflow-hidden animate-in fade-in zoom-in duration-1000 delay-200 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <TerminalImage 
              src={post.imageUrl} 
              alt={post.title} 
              className="object-cover transition-transform duration-1000 hover:scale-105"
              priority
            />
          </div>
        ) : (
          <div className="mb-0"></div> // No margin if no image
        )}

        {/* POST CONTENT */}
        <div className={`prose prose-invert prose-red max-w-none animate-in fade-in duration-1000 ${post.imageUrl ? 'delay-500' : 'delay-300'}`}>
          {/* Excerpt as intro */}
          <div className="text-xl md:text-2xl font-body text-[#e7bcba] leading-relaxed mb-16 border-l-2 border-[#d90429] pl-8 italic opacity-90 relative">
            <div className="absolute top-0 left-[-2px] w-[2px] h-full bg-[#d90429] shadow-[0_0_15px_#d90429]"></div>
            {post.excerpt}
          </div>

          {/* Main Body */}
          <div className="text-lg md:text-xl text-[#e5e2e1]/90 leading-relaxed font-body space-y-10 whitespace-pre-wrap tracking-wide">
            {post.content || "CONT_STREAM_EMPTY: This post has no detailed content yet."}
          </div>
        </div>

        {/* FOOTER DECORATION */}
        <footer className="mt-24 pt-12 border-t border-white/5 flex flex-col items-center text-center space-y-6">
          <div className="w-12 h-1 bg-[#d90429]"></div>
          <p className="font-label text-xs uppercase tracking-[0.3em] text-[#e7bcba] opacity-40">
            END_OF_TRANSMISSION
          </p>
          <Link href="/" className="group flex items-center gap-2 text-[#00f4fe] font-headline font-bold uppercase tracking-widest hover:text-[#d90429] transition-colors">
            RETURN_TO_BASE <span className="material-symbols-outlined group-hover:-translate-x-2 transition-transform">home</span>
          </Link>
        </footer>
      </article>

      {/* DECORATIVE BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d90429]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00f4fe]/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2"></div>
      </div>
    </main>
  );
}
