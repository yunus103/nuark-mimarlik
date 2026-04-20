import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { projectListQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/ui/FadeIn";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { PageHero } from "@/components/ui/PageHero";

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
      <PageHero
        eyebrow="PORTFOLYO"
        title="Projelerimiz"
        description="Özgün tasarım anlayışımızla hayat verdiğimiz, fonksiyonellik ve estetiği buluşturan seçkin çalışmalarımız."
      />

      <section className="py-24 bg-brand-off-white">
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
