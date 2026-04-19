import { Navbar } from "@/components/Navbar";
import { getPortfolioData } from "@/lib/data-fetching";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsPreview } from "@/components/sections/ProjectsPreview";
import { PostsPreview } from "@/components/sections/PostsPreview";
import { ContactSection } from "@/components/sections/ContactSection";

export default async function Home() {
  const data = await getPortfolioData();

  return (
    <>
      <Navbar cvUrl={data.about.cvUrl} />
      <main className="flex-grow w-full max-w-7xl mx-auto px-6 lg:px-12 py-12 space-y-[var(--section-gap)] pt-[60px] pb-12">
        <HeroSection data={data.hero} isEditable={false} />
        <ProjectsPreview projects={data.projects.slice(0, 4)} isEditable={false} />
        <PostsPreview posts={data.posts.slice(0, 2)} />
        <ContactSection contact={data.contact} isEditable={false} />
      </main>
    </>
  );
}
