import { Metadata } from "next";
import { getClient } from "@/sanity/lib/client";
import { galleryPageQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { ProjectLightbox } from "@/components/ui/ProjectLightbox";
import { FadeIn } from "@/components/ui/FadeIn";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getClient().fetch(galleryPageQuery, {}, { next: { tags: ["galleryPage"] } });
  return buildMetadata({
    title: page?.seo?.metaTitle || page?.heroTitle || "Galeri",
    description:
      page?.seo?.metaDescription ||
      page?.heroSubtitle ||
      "Nuark Mimarlık proje ve uygulama çalışmaları görsel galerisi.",
    canonicalPath: "/galeri",
    pageSeo: page?.seo,
  });
}

export default async function GalleryPage() {
  const page = await getClient().fetch(galleryPageQuery, {}, { next: { tags: ["galleryPage"] } });
  const galleryImages = (page?.gallery || []).filter((img: any) => img?.asset);
  const hasImages = galleryImages.length > 0;

  return (
    <div className="bg-brand-off-white min-h-screen">
      {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
      <PageHero
        eyebrow=""
        title={page?.heroTitle || "Galeri"}
        description={
          page?.heroSubtitle ||
          "Projelerimizden ve şantiye uygulama aşamalarından derlediğimiz en özel kareler."
        }
      />

      {/* ── 2. GALERİ GRİDİ ─────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-brand-off-white">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          {hasImages ? (
            <FadeIn direction="up">
              {/* Limit 12 olarak ayarlanmıştır, desktopta 3'lü, mobilde 2'li grid ile tam bölünür */}
              <ProjectLightbox images={galleryImages} limit={12} />
            </FadeIn>
          ) : (
            <FadeIn className="text-center py-20">
              <p className="text-brand-black/40 font-sans text-sm tracking-wider uppercase">
                Henüz görsel eklenmedi.
              </p>
            </FadeIn>
          )}
        </div>
      </section>
    </div>
  );
}
