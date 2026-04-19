import { Navbar } from "@/components/Navbar";
import { getPortfolioData } from "@/lib/data-fetching";
import { PostsSection } from "@/components/sections/PostsSection";

export default async function PostsPage() {
  const data = await getPortfolioData();

  return (
    <>
      <Navbar cvUrl={data.about.cvUrl} />
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-[#d90429] opacity-5 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-[#00f4fe] opacity-5 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <main className="flex-grow pt-24 pb-32 px-6 md:px-12 max-w-5xl mx-auto w-full relative">
        <header className="mb-16 mt-8 relative z-10">
          <p className="font-body text-[#00f4fe] text-xs uppercase tracking-[0.2em] mb-2 before:content-['//'] before:mr-2">Public Transmissions</p>
          <h1 className="font-headline text-5xl md:text-6xl text-[#e5e2e1] tracking-tighter uppercase mb-2">SYSTEM_BLOG</h1>
          <p className="text-[#e7bcba] font-body text-sm max-w-xl mb-6">Thoughts, architecture decisions, and code snippets transmitted from the terminal.</p>
          <div className="h-px w-full max-w-md bg-gradient-to-r from-[#d90429] to-transparent mt-6 opacity-30"></div>
        </header>

        <PostsSection posts={data.posts} isEditable={false} />
      </main>
    </>
  );
}
