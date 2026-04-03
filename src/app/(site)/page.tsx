import { Metadata } from "next";
import { draftMode } from "next/headers";
import { getClient } from "@/sanity/lib/client";
import { homePageQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { buildMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/ui/FadeIn";
import { SanityImage } from "@/components/ui/SanityImage";
import { Button } from "@/components/ui/button";
import { RichText } from "@/components/ui/RichText";
import { ReferansMarquee } from "@/components/ui/ReferansMarquee";
import Link from "next/link";
import { RiArrowRightLine } from "react-icons/ri";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getClient().fetch(homePageQuery, {}, { next: { tags: ["home"] } });
  return buildMetadata({
    title: data?.seo?.metaTitle || data?.heroTitle || "Ana Sayfa",
    description: data?.seo?.metaDescription || data?.heroSubtitle,
    canonicalPath: "/",
    pageSeo: data?.seo,
  });
}

export default async function HomePage() {
  const isDraft = (await draftMode()).isEnabled;
  const data = await getClient(isDraft).fetch(
    homePageQuery,
    {},
    { next: { tags: ["home"] } }
  );

  // Build marquee refs from homePage.clientLogos
  const marqueeRefs = (data?.clientLogos || []).map((item: any) => ({
    clientName: item.companyName,
    clientLogo: item.logo?.asset
      ? { url: urlForImage(item.logo)?.auto("format").width(256).url() || "", alt: item.logo.alt }
      : undefined,
  })).filter((r: any) => r.clientName);

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[100svh] md:min-h-screen flex items-center justify-center pt-24 overflow-hidden">
        {data?.heroImage && (
          <div className="absolute inset-0 z-0">
            <SanityImage
              image={data.heroImage}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />

          </div>
        )}

        <div className="relative z-10 w-full container mx-auto px-4 py-12 flex flex-col items-center md:items-start md:mt-24">
          <FadeIn direction="up" duration={0.8} className="w-full max-w-4xl">
            {data?.heroEyebrow && (
              <span className="block text-brand-gold font-sans text-sm font-bold tracking-widest uppercase mb-6">
                {data.heroEyebrow}
              </span>
            )}
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-brand-off-white leading-[1.05] tracking-tight mb-8">
              {data?.heroTitle || "Tasarımda Çizgi ve Benzersiz Kimlik"}
            </h1>
            
            {data?.heroSubtitle && (
              <p className="text-lg md:text-xl text-white/80 font-sans max-w-2xl leading-relaxed mb-10">
                {data.heroSubtitle}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start w-full">
              {data?.heroPrimaryCtaLabel && data?.heroPrimaryCtaSlug && (
                <Link href={`/${data.heroPrimaryCtaSlug}`} className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-brand-gold text-brand-black hover:bg-brand-black hover:text-brand-gold rounded-none border-2 border-brand-gold transition-all duration-300 font-bold uppercase tracking-widest text-xs h-16 px-10 shadow-lg shadow-black/20">
                    {data.heroPrimaryCtaLabel}
                  </Button>
                </Link>
              )}
              {data?.heroSecondaryCtaLabel && data?.heroSecondaryCtaSlug && (
                <Link href={`/${data.heroSecondaryCtaSlug}`} className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-white border-white/40 hover:border-brand-gold hover:text-brand-gold bg-black/10 backdrop-blur-sm rounded-none transition-all duration-300 font-bold uppercase tracking-widest text-xs h-16 px-10 shadow-lg shadow-black/20">
                    {data.heroSecondaryCtaLabel}
                  </Button>
                </Link>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      {data?.stats && data.stats.length > 0 && (
        <section className="bg-brand-black border-t border-white/10 py-16 md:py-24 relative z-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-white/10">
              {data.stats.map((stat: any, i: number) => (
                <FadeIn key={i} delay={i * 0.1} direction="up" className="flex flex-col items-center md:items-start md:px-8 text-center md:text-left">
                  <span className="text-4xl md:text-6xl font-serif font-bold text-brand-gold mb-2">{stat.value}</span>
                  <span className="text-sm font-sans text-white/70 uppercase tracking-widest">{stat.label}</span>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. REFERANSLAR MARQUEE */}
      {marqueeRefs.length > 0 && (
        <section className="bg-brand-black border-b border-white/10 pb-16 md:pb-24 pt-4 md:pt-8 overflow-hidden z-20 relative">
          <div className="container mx-auto px-4 mb-10 text-center">
            <FadeIn direction="up">
              <span className="block text-brand-gold font-sans text-xs font-bold tracking-widest uppercase mb-3">Referanslarımız</span>
              <p className="text-white/30 font-sans text-sm tracking-wide">Birlikte çalışmaktan gurur duyduğumuz kurumlar</p>
            </FadeIn>
          </div>
          <ReferansMarquee references={marqueeRefs} />
        </section>
      )}

      {/* 4. ABOUT SUMMARY */}
      {data?.aboutTitle && data?.aboutText && (
        <section className="py-24 md:py-32 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <FadeIn direction="right">
                <div className="space-y-8">
                  <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-foreground">
                    {data.aboutTitle}
                  </h2>
                  <div className="prose prose-lg dark:prose-invert prose-headings:font-serif text-muted-foreground">
                    <RichText value={data.aboutText} />
                  </div>
                  <Link href="/hakkimizda" className="inline-flex items-center gap-2 text-brand-gold font-bold uppercase tracking-wider text-sm hover:gap-4 transition-all duration-300 mt-4 group">
                    <span>Kurumsal Profilimizi İnceleyin</span>
                    <RiArrowRightLine className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </FadeIn>

              {data.aboutImage && (
                <FadeIn direction="left" delay={0.2}>
                  <div className="relative aspect-[4/5] w-full">
                    <SanityImage
                      image={data.aboutImage}
                      fill
                      className="object-cover rounded-none transition-all duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Brutalist Shadow / Offset */}
                    <div className="absolute -bottom-6 -right-6 w-full h-full border border-brand-gold/30 -z-10 hidden md:block" />
                  </div>
                </FadeIn>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 5. FEATURED PROJECTS */}
      <section className="py-24 md:py-32 bg-muted/30 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6 text-center md:text-left">
            <FadeIn>
              <span className="block text-brand-gold font-sans text-xs font-bold tracking-widest uppercase mb-4">PORTFOLYO</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">{data?.featuredProjectsTitle || "Öne Çıkan Projeler"}</h2>
            </FadeIn>
            <FadeIn delay={0.2} className="hidden md:block">
              <Link href="/projeler" className="inline-flex items-center gap-2 text-foreground font-bold uppercase tracking-wider text-sm hover:text-brand-gold transition-colors group">
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

      {/* 6. SERVICES SUMMARY */}
      <section className="py-24 md:py-32 bg-brand-black text-brand-off-white border-y border-white/10">
        <div className="container mx-auto px-4">
          <FadeIn direction="up" className="max-w-3xl mx-auto text-center mb-16">
            <span className="block text-brand-gold font-sans text-xs font-bold tracking-widest uppercase mb-4">UZMANLIK</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-6">{data?.servicesSectionTitle || "Mimari & Tasarım Hizmetleri"}</h2>
            <p className="text-white/70 text-lg leading-relaxed">{data?.servicesIntro || "Tasarım aşamasından inşaatın tamamlanmasına kadar, sürdürülebilir ve estetik çözümler sunarak hayalinizdeki projeleri gerçeğe dönüştürüyoruz."}</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
            {[
              { title: "Mimari Tasarım", desc: "Özgün ve vizyoner yapı tasarımları." },
              { title: "İç Mimari", desc: "Yaşam kalitesini artıran fonksiyonel iç mekanlar." },
              { title: "Proje Yönetimi", desc: "Zamanında ve bütçeye uygun kusursuz yönetim." },
              { title: "İnşaat Uygulama", desc: "Tasarımı hayata geçiren detaylı anahtar teslim uygulamalar." },
            ].map((service, i) => (
              <div key={i} className="bg-brand-black p-10 lg:p-12 group hover:bg-white/5 transition-colors duration-300">
                <span className="text-brand-gold text-3xl font-serif font-bold block mb-6 opacity-50 group-hover:opacity-100 transition-opacity">0{i+1}</span>
                <h3 className="text-xl font-serif font-bold mb-4">{service.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
             <Link href="/hizmetlerimiz">
              <Button className="rounded-none bg-brand-gold text-brand-black hover:bg-white hover:text-black uppercase tracking-widest text-xs h-12 px-8 font-bold border-transparent">
                Hizmetlerimizi İnceleyin
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. CTA / MANIFESTO */}
      {data?.ctaTitle && (
        <section className="relative py-32 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-background z-0" />
          {/* Subtle abstract geometric background element */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 z-0" />
          
          <div className="relative z-10 container mx-auto px-4 text-center">
            <FadeIn>
              <h2 className="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-8 max-w-4xl mx-auto leading-[1.1]">
                {data.ctaTitle}
              </h2>
              {data.ctaSubtitle && (
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
                  {data.ctaSubtitle}
                </p>
              )}
              <Link href="/iletisim">
                <Button size="lg" className="rounded-none bg-foreground text-background hover:bg-primary uppercase tracking-widest text-sm h-16 px-12 font-bold shadow-xl shadow-foreground/5">
                  Projeye Başlayalım
                </Button>
              </Link>
            </FadeIn>
          </div>
        </section>
      )}


    </>
  );
}
