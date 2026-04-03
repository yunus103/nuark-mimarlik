import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { projectListQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/ui/FadeIn";
import { SanityImage } from "@/components/ui/SanityImage";
import Link from "next/link";
import { RiArrowRightLine } from "react-icons/ri";

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
            <span className="block text-brand-gold font-sans text-xs font-bold tracking-widest uppercase mb-6">PORTFOLYO</span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-8 leading-[1.1]">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {projects.map((project: any, i: number) => (
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
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                       <span className="text-brand-gold text-xs font-bold tracking-widest uppercase mb-2">
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
