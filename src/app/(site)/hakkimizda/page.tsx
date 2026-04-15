import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { aboutPageQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/ui/FadeIn";
import { SanityImage } from "@/components/ui/SanityImage";
import { RichText } from "@/components/ui/RichText";

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(aboutPageQuery, {}, { next: { tags: ["about"] } });
  return buildMetadata({
    title: data?.seo?.metaTitle || data?.heroHeadline || "Hakkımızda",
    description: data?.seo?.metaDescription || data?.heroSubtitle,
    canonicalPath: "/hakkimizda",
    pageSeo: data?.seo,
  });
}

export default async function AboutPage() {
  const data = await client.fetch(aboutPageQuery, {}, { next: { tags: ["about"] } });

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="bg-brand-black text-brand-off-white pt-32 pb-20 md:pt-48 md:pb-32 px-4 border-b border-white/10">
        <div className="container mx-auto max-w-5xl">
          <FadeIn direction="up">
            <span className="block text-brand-accent font-brand text-xs font-bold tracking-widest uppercase mb-6">MİMARİ VİZYONUMUZ</span>
            <h1 className="text-4xl md:text-5xl font-brand font-bold tracking-tight mb-8 leading-[1.1]">
              {data?.heroHeadline || "Tasarımda Kalite ve Benzersizlik"}
            </h1>
            {data?.heroSubtitle && (
              <p className="text-xl md:text-2xl font-sans text-white/70 max-w-3xl leading-relaxed">
                {data.heroSubtitle}
              </p>
            )}
          </FadeIn>
        </div>
      </section>

      {/* 2. HİKAYE (STORY) */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <FadeIn direction="right">
              <h2 className="text-3xl md:text-4xl font-brand font-bold tracking-tight mb-8 text-foreground">
                {data?.storyTitle || "Hikayemiz"}
              </h2>
              <div className="prose prose-lg dark:prose-invert prose-headings:font-serif text-muted-foreground leading-relaxed">
                {data?.storyText ? (
                  <RichText value={data.storyText} />
                ) : (
                  <p>Nuark Mimarlık olarak, yılların getirdiği tecrübe ile mekanlara ruh katıyoruz. Estetik ve fonksiyonelliği birleştiren yaklaşımımızla müşteri memnuniyetini en üst düzeyde tutuyoruz.</p>
                )}
              </div>
            </FadeIn>
            
            <FadeIn direction="left" delay={0.2} className="relative aspect-[4/5] w-full">
              {data?.storyImage ? (
                <SanityImage
                  image={data.storyImage}
                  fill
                  className="object-cover grayscale filter transition-all duration-700 hover:grayscale-0"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">Görsel Bekleniyor</div>
              )}
              <div className="absolute -bottom-6 -right-6 w-full h-full border border-brand-accent/30 -z-10 hidden md:block" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 3. DEĞERLERİMİZ */}
      {data?.values && data.values.length > 0 && (
        <section className="bg-brand-black text-brand-off-white border-y border-white/10">
          <div className="container mx-auto">
            {data?.valuesTitle && (
              <div className="px-4 py-16 md:py-24 border-b border-white/10 text-center">
                <FadeIn>
                   <span className="block text-brand-accent font-brand text-xs font-bold tracking-widest uppercase mb-4">DEĞERLERİMİZ</span>
                   <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">{data.valuesTitle}</h2>
                </FadeIn>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 border-b border-white/10">
              {data.values.map((value: any, i: number) => (
                <FadeIn key={i} delay={i * 0.1} className="p-12 md:p-16 hover:bg-white/5 transition-colors duration-300">
                  <span className="text-brand-accent text-2xl font-serif font-bold block mb-4">0{i+1}</span>
                  <h3 className="text-xl font-serif font-bold mb-4">{value.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{value.description}</p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. EKİBİMİZ */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <FadeIn className="mb-16">
            <span className="block text-brand-accent font-brand text-xs font-bold tracking-widest uppercase mb-4">EKİBİMİZ</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">{data?.teamTitle || "Kurucu ve Mimarlar"}</h2>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {data?.team && data.team.length > 0 ? data.team.map((member: any, i: number) => (
              <FadeIn key={i} delay={i * 0.1} className="group">
                <div className="relative aspect-square w-full mb-6 overflow-hidden bg-muted">
                  {member.photo && (
                    <SanityImage
                      image={member.photo}
                      fill
                      className="object-cover grayscale filter transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}
                </div>
                <h3 className="text-2xl font-serif font-bold mb-1">{member.name}</h3>
                <p className="text-brand-accent font-brand text-xs font-bold tracking-widest uppercase mb-4">{member.title}</p>
                {member.bio && <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>}
              </FadeIn>
            )) : (
              <div className="col-span-full py-8 text-muted-foreground">Sanity CMS panelinden ekip üyeleri eklediğinizde burada listelenecektir.</div>
            )}
          </div>
        </div>
      </section>

      {/* 5. KİLOMETRE TAŞLARI */}
      {data?.milestones && data.milestones.length > 0 && (
        <section className="py-24 md:py-32 bg-muted/30 border-t">
          <div className="container mx-auto px-4 max-w-4xl">
            <FadeIn className="text-center mb-16">
              <span className="block text-brand-accent font-brand text-xs font-bold tracking-widest uppercase mb-4">ZAMAN ÇİZELGESİ</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">Kilometre Taşları</h2>
            </FadeIn>

            <div className="space-y-0">
              {data.milestones.map((milestone: any, i: number) => (
                <FadeIn key={i} delay={i * 0.1} className="flex flex-col md:flex-row border-b border-foreground/10 last:border-0 p-8 hover:bg-background transition-colors duration-300">
                  <div className="md:w-1/4 mb-4 md:mb-0">
                    <span className="text-3xl font-serif font-bold text-brand-accent">{milestone.year}</span>
                  </div>
                  <div className="md:w-3/4 flex items-center">
                    <p className="text-lg font-sans text-foreground">{milestone.event}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
