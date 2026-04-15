import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/button";
import { RiArrowRightLine } from "react-icons/ri";
import { ProjectCard } from "@/components/ui/ProjectCard";

interface FeaturedProjectsSectionProps {
  data: any;
}

export function FeaturedProjectsSection({ data }: FeaturedProjectsSectionProps) {
  return (
    <section className="py-24 md:py-32 bg-muted/30 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6 text-center md:text-left">
          <FadeIn>
            <span className="block text-brand-accent font-sans text-xs font-bold tracking-widest uppercase mb-4">PORTFOLYO</span>
            <h2 className="text-4xl md:text-5xl font-brand font-bold tracking-tight">{data?.featuredProjectsTitle || "Öne Çıkan Projeler"}</h2>
          </FadeIn>
          <FadeIn delay={0.2} className="hidden md:block">
            <Link href="/projeler" className="inline-flex items-center gap-2 text-foreground font-bold uppercase tracking-wider text-sm hover:text-brand-accent transition-colors group">
              Tüm Projeleri Gör <RiArrowRightLine className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {(data?.featuredProjects && data.featuredProjects.length > 0) ? data.featuredProjects.map((project: any, i: number) => (
            <FadeIn key={project.slug?.current || i} delay={i * 0.1}>
              <ProjectCard project={project} />
            </FadeIn>
          )) : (
            <div className="col-span-full text-center py-12 text-muted-foreground">Sanity CMS panelinden "Öne Çıkan Projeler" ekleyebilirsiniz.</div>
          )}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 md:hidden flex justify-center">
          <Link href="/projeler">
            <Button variant="outline" className="rounded-none border-foreground uppercase tracking-widest text-xs h-12 px-8">
              Tüm Projeleri Gör
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
