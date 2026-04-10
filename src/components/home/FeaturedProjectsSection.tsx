import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { SanityImage } from "@/components/ui/SanityImage";
import { Button } from "@/components/ui/button";
import { RiArrowRightLine } from "react-icons/ri";

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
            <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">{data?.featuredProjectsTitle || "Öne Çıkan Projeler"}</h2>
          </FadeIn>
          <FadeIn delay={0.2} className="hidden md:block">
            <Link href="/projeler" className="inline-flex items-center gap-2 text-foreground font-bold uppercase tracking-wider text-sm hover:text-brand-accent transition-colors group">
              Tüm Projeleri Gör <RiArrowRightLine className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(data?.featuredProjects && data.featuredProjects.length > 0) ? data.featuredProjects.map((project: any, i: number) => (
            <FadeIn key={project.slug?.current || i} delay={i * 0.1}>
              <Link href={`/projeler/${project.slug?.current}`} className="group block relative overflow-hidden bg-background">
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  {project.coverImage ? (
                    <SanityImage
                      image={project.coverImage}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">Görsel Yok</div>
                  )}
                  
                  {/* Overlay Info */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                    <span className="text-brand-accent text-xs font-bold tracking-widest uppercase mb-2">
                      {project.category || "Proje"} {project.year ? `— ${project.year}` : ""}
                    </span>
                    <h3 className="text-white text-2xl font-serif font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {project.title}
                    </h3>
                    {project.city && (
                      <p className="text-white/70 text-sm mt-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                        {project.city}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </FadeIn>
          )) : (
            <div className="col-span-full text-center py-12 text-muted-foreground">Sanity CMS panelinden "Öne Çıkan Projeler" ekleyebilirsiniz.</div>
          )}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-12 md:hidden flex justify-center">
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
