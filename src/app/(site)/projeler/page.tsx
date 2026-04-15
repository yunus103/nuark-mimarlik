import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { projectListQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/ui/FadeIn";
import { ProjectCard } from "@/components/ui/ProjectCard";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Projelerimiz",
    description: "Nuark Mimarlık tarafından hayata geçirilen seçkin projeler.",
    canonicalPath: "/projeler",
  });
}

export default async function ProjectsPage() {
  const projects = await client.fetch(projectListQuery, {}, { next: { tags: ["projects"] } });

  return (
    <>
      <section className="bg-brand-black text-brand-off-white pt-32 pb-20 md:pt-48 md:pb-32 px-4 border-b border-white/10">
        <div className="container mx-auto max-w-5xl">
          <FadeIn direction="up">
            <span className="block text-brand-accent font-sans text-xs font-bold tracking-widest uppercase mb-6">PORTFOLYO</span>
            <h1 className="text-5xl md:text-7xl font-brand font-bold tracking-tight mb-8 leading-[1.1]">
              Projelerimiz
            </h1>
            <p className="text-xl md:text-2xl font-sans text-white/70 max-w-2xl leading-relaxed">
              Özgün tasarım anlayışımızla hayat verdiğimiz, fonksiyonellik ve estetiği buluşturan seçkin çalışmalarımız.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-10 md:gap-y-12">
            {projects.map((project: any, i: number) => (
              <FadeIn key={project.slug?.current || i} delay={i * 0.1}>
                <ProjectCard project={project} />
              </FadeIn>
            ))}
            
            {projects.length === 0 && (
              <div className="col-span-full text-center py-24 text-muted-foreground">
                Henüz proje eklenmemiş.
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
