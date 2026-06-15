import { Metadata } from "next";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { getClient, client } from "@/sanity/lib/client";
import { projectBySlugQuery, projectListQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { urlForImage } from "@/sanity/lib/image";
import { RichText } from "@/components/ui/RichText";
import { SanityImage } from "@/components/ui/SanityImage";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/button";
import { ProjectLightbox } from "@/components/ui/ProjectLightbox";
import Link from "next/link";
import { RiArrowLeftLine, RiMapPinLine, RiCalendarLine, RiUserLine, RiRuler2Line } from "react-icons/ri";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const projects = await client.fetch(projectListQuery, {}, { next: { tags: ["projects"] } });
  return (projects || []).map((p: any) => ({ slug: p.slug?.current }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getClient().fetch(projectBySlugQuery, { slug }, { next: { tags: ["projects"] } });
  if (!project) return {};
  return buildMetadata({
    title: project.title,
    canonicalPath: `/projeler/${slug}`,
    pageSeo: project.seo,
  });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const isDraft = (await draftMode()).isEnabled;
  const project = await getClient(isDraft).fetch(
    projectBySlugQuery,
    { slug },
    { next: { tags: ["projects"] } }
  );

  if (!project) notFound();

  const finalImages = (project.gallery || []).filter((img: any) => img?.asset);
  const renderImages = (project.galleryRender || []).filter((img: any) => img?.asset);
  const constructionImages = (project.galleryConstruction || []).filter((img: any) => img?.asset);
  const hasGallery = finalImages.length > 0 || renderImages.length > 0 || constructionImages.length > 0;

  return (
    <article className="bg-background min-h-screen">

      {/* ── HERO ── */}
      <div className="relative w-full h-[70vh] md:h-[90vh] bg-brand-black overflow-hidden">
        {project.coverImage && (
          <SanityImage
            image={project.coverImage}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/30 to-transparent" />

        {/* Back */}
        <div className="absolute top-0 left-0 right-0 pt-32 px-6 md:px-12 z-10">
          <Link
            href="/projeler"
            className="inline-flex items-center gap-2 text-white/60 hover:text-brand-accent transition-colors duration-300 font-sans text-xs font-bold tracking-widest uppercase group"
          >
            <RiArrowLeftLine className="group-hover:-translate-x-1 transition-transform duration-300" />
            Tüm Projeler
          </Link>
        </div>

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 lg:px-24 pb-12 md:pb-16 z-10">
          <FadeIn direction="up">
            {project.category && (
              <span className="block text-brand-accent font-sans text-sm font-bold tracking-widest uppercase mb-4">
                {project.category}
              </span>
            )}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-brand-off-white tracking-tight leading-[1.05] max-w-4xl">
              {project.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-6">
              {(project.location || project.city) && (
                <span className="text-white/60 font-sans text-sm flex items-center gap-2">
                  <RiMapPinLine className="text-brand-accent" />
                  {[project.location, project.city].filter(Boolean).join(", ")}
                </span>
              )}
              {project.year && (
                <span className="text-white/60 font-sans text-sm flex items-center gap-2">
                  <RiCalendarLine className="text-brand-accent" />
                  {project.year}
                </span>
              )}
              {project.client && (
                <span className="text-white/60 font-sans text-sm flex items-center gap-2">
                  <RiUserLine className="text-brand-accent" />
                  <span className="text-white/40">Müşteri:</span> {project.client}
                </span>
              )}
              {project.area && (
                <span className="text-white/60 font-sans text-sm flex items-center gap-2">
                  <RiRuler2Line className="text-brand-accent" />
                  <span className="text-white/40">Alan:</span> {project.area}
                </span>
              )}
            </div>
          </FadeIn>
        </div>
      </div>



      {/* ── GALLERY ── */}
      {hasGallery && (
        <section className="bg-brand-black py-16 md:py-24 border-t border-white/10">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <FadeIn direction="up" className="mb-12">
              <span className="block text-brand-accent font-sans text-sm font-bold tracking-widest uppercase mb-2">
                Fotoğraf Galerisi
              </span>
              <p className="text-white/30 font-sans text-xs">
                Görsellere tıklayarak büyütebilirsiniz
              </p>
            </FadeIn>

            <div className="space-y-16">
              {finalImages.length > 0 && (
                <ProjectLightbox images={finalImages} title="Final Görselleri" />
              )}
              {renderImages.length > 0 && (
                <ProjectLightbox images={renderImages} title="Tasarım / Render Görselleri" />
              )}
              {constructionImages.length > 0 && (
                <ProjectLightbox images={constructionImages} title="Uygulama Aşaması Görselleri" />
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── FOOTER NAV ── */}
      <div className="bg-brand-black border-t border-white/10 py-12">
        <div className="container mx-auto px-4 flex justify-center md:justify-between items-center flex-wrap gap-6">
          <Link href="/projeler">
            <Button
              variant="outline"
              className="rounded-none border-brand-accent/60 text-brand-accent hover:border-brand-accent hover:bg-brand-accent hover:text-brand-black uppercase tracking-widest text-xs h-12 px-8 transition-all duration-300"
            >
              <RiArrowLeftLine className="mr-2" />
              Tüm Projelere Dön
            </Button>
          </Link>
          <Link href="/iletisim">
            <Button className="rounded-none bg-brand-accent text-brand-black hover:bg-white hover:text-brand-black uppercase tracking-widest text-xs h-12 px-8 font-bold transition-all duration-300">
              Projenizi Görüşelim
            </Button>
          </Link>
        </div>
      </div>

    </article>
  );
}
