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
            <span className="block text-brand-accent font-sans text-sm font-bold tracking-widest uppercase mb-4">PORTFOLYO</span>
            <h2 className="text-4xl md:text-5xl font-brand font-bold tracking-tight">{data?.featuredProjectsTitle || "Öne Çıkan Projeler"}</h2>
          </FadeIn>
          <FadeIn delay={0.2} className="hidden md:block">
            <Link
              href="/projeler"
              className="inline-flex items-center gap-3 font-brand font-bold uppercase tracking-widest text-base hover:text-brand-accent transition-all group border-b-2 border-brand-accent pb-1"
            >
              <span>TÜM PROJELERİ GÖR</span>
              <div className="p-2 bg-brand-accent text-white rounded-full group-hover:translate-x-1.5 transition-transform duration-300">
                <RiArrowRightLine size={18} />
              </div>
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

        {/* View All Projects Button */}
        <div className="mt-12 md:mt-16 flex justify-center">
          <FadeIn delay={0.3}>
            <Link href="/projeler">
              <Button
                variant="outline"
                className="rounded-none border-2 border-foreground hover:border-brand-accent hover:bg-brand-accent hover:text-white font-brand font-bold uppercase tracking-widest text-sm md:text-base h-14 px-10 transition-all duration-300 group shadow-md"
              >
                <span>TÜM PROJELERİ GÖR</span>
                <RiArrowRightLine size={20} className="ml-3 group-hover:translate-x-1.5 transition-transform duration-300" />
              </Button>
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
