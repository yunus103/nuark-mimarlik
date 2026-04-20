import { Metadata } from "next";
import { getClient } from "@/sanity/lib/client";
import { servicesPageQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/ui/FadeIn";
import { SanityImage } from "@/components/ui/SanityImage";
import { RichText } from "@/components/ui/RichText";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getClient().fetch(servicesPageQuery, {}, { next: { tags: ["services"] } });
  const { page } = data || {};
  
  return buildMetadata({
    title: page?.seo?.metaTitle || page?.heroTitle || "Hizmetlerimiz",
    description: page?.seo?.metaDescription || page?.heroSubtitle,
    canonicalPath: "/hizmetlerimiz",
    pageSeo: page?.seo,
  });
}

export default async function ServicesPage() {
  const data = await getClient().fetch(servicesPageQuery, {}, { next: { tags: ["services"] } });
  const { page, services = [] } = data || {};

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        title={page?.heroTitle || "Hizmetlerimiz"}
        description={page?.heroSubtitle || "Fikirden anahtar teslimine kadar, sürecin her aşamasında kalite ve titizlikle yanınızdayız."}
      />

      {/* Services List Section */}
      <section>
        {services.map((service: any, index: number) => {
          const isEven = index % 2 === 0;
          const serviceNumber = String(index + 1).padStart(2, "0");
          
          return (
            <div 
              key={service._id || index} 
              className={`py-32 md:py-48 border-b last:border-0 overflow-hidden ${
                isEven 
                  ? "bg-brand-off-white border-brand-black/5" 
                  : "bg-brand-black border-white/5"
              }`}
            >
              <div className="container mx-auto px-4">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center`}>
                  
                  {/* Image Column */}
                  <div className={`${isEven ? "lg:order-1" : "lg:order-2"}`}>
                    <FadeIn direction={isEven ? "right" : "left"}>
                      <div className="relative max-w-lg mx-auto">
                        <div className="relative aspect-[4/5] w-full overflow-hidden group">
                          {service.mainImage ? (
                            <SanityImage
                              image={service.mainImage}
                              fill
                              className="object-cover transition-all duration-700 group-hover:scale-105"
                              sizes="(max-width: 1024px) 100vw, 45vw"
                            />
                          ) : (
                            <div className={`w-full h-full flex items-center justify-center ${isEven ? "bg-brand-black/5 text-brand-black/20" : "bg-white/5 text-white/20"}`}>
                              Görsel Seçilmedi
                            </div>
                          )}
                          <div className={`absolute inset-0 transition-colors duration-500 ${isEven ? "bg-brand-black/5 group-hover:bg-transparent" : "bg-brand-black/20 group-hover:bg-transparent"}`} />
                        </div>
                        {/* Decorative background frame */}
                        <div className={`absolute -inset-4 border -z-10 translate-x-8 translate-y-8 hidden lg:block ${isEven ? "border-brand-accent/30" : "border-brand-accent/20"}`} />
                      </div>
                    </FadeIn>
                  </div>

                  {/* Content Column */}
                  <div className={`${isEven ? "lg:order-2" : "lg:order-1"}`}>
                    <FadeIn direction={isEven ? "left" : "right"}>
                      <div className="relative">
                        <span className={`text-[120px] md:text-[180px] font-brand font-bold absolute -top-24 -left-12 pointer-events-none select-none ${isEven ? "text-brand-black/[0.03]" : "text-brand-accent/5"}`}>
                          {serviceNumber}
                        </span>
                        
                        <h2 className={`text-4xl md:text-6xl font-brand font-bold tracking-tight mb-8 relative ${isEven ? "text-brand-black" : "text-brand-off-white"}`}>
                          {service.title}
                        </h2>
                        
                        {service.description && (
                          <div className={`mb-10 leading-relaxed text-lg lg:text-xl ${isEven ? "text-brand-black/80" : "text-brand-off-white/70"}`}>
                            <RichText 
                              value={service.description} 
                              className={`prose-p:mb-4 last:prose-p:mb-0 ${
                                isEven ? "prose-p:text-brand-black/80" : "prose-p:text-brand-off-white/70"
                              }`} 
                            />
                          </div>
                        )}

                        {service.features && service.features.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                            {service.features.map((feature: string, fIdx: number) => (
                              <div key={fIdx} className="flex items-start gap-3">
                                <div className={`mt-1.5 p-0.5 rounded-full shrink-0 ${isEven ? "bg-brand-accent/10 text-brand-accent" : "bg-brand-accent/20 text-brand-accent"}`}>
                                  <Check className="w-3.5 h-3.5" />
                                </div>
                                <span className={`font-medium ${isEven ? "text-brand-black/80" : "text-brand-off-white/80"}`}>
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </FadeIn>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Page CTA Section - Alternating Background */}
      {(() => {
        const isCtaWhite = services.length % 2 === 0;
        return (
          <section className={`py-24 md:py-40 relative overflow-hidden transition-colors duration-500 ${isCtaWhite ? "bg-brand-off-white" : "bg-brand-black"}`}>
            {/* Decorative elements */}
            <div className={`absolute top-0 left-0 w-full h-px ${isCtaWhite ? "bg-gradient-to-r from-transparent via-brand-accent/20 to-transparent" : "bg-gradient-to-r from-transparent via-brand-accent/30 to-transparent"}`} />
            <div className={`absolute bottom-0 right-0 w-1/2 aspect-square rounded-full blur-[120px] translate-x-1/3 translate-y-1/3 ${isCtaWhite ? "bg-brand-accent/5" : "bg-brand-accent/5"}`} />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-5xl mx-auto text-center">
                <FadeIn>
                  <span className={`font-brand text-xs font-bold tracking-[0.3em] uppercase mb-8 block ${isCtaWhite ? "text-brand-accent" : "text-brand-accent"}`}>
                    BİZE ULAŞIN
                  </span>
                  <h2 className={`text-4xl md:text-7xl font-brand font-bold tracking-tighter mb-10 leading-tight ${isCtaWhite ? "text-brand-black" : "text-brand-off-white"}`}>
                    {page?.ctaTitle || "Hayalinizdeki Projeyi Birlikte Tasarlayalım"}
                  </h2>
                  <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-16 ${isCtaWhite ? "text-brand-black/60" : "text-brand-off-white/60"}`}>
                    {page?.ctaDescription || "Sizin için en doğru mimari çözümü üretmek, alanı verimli kullanmak ve estetikle fonksiyonu birleştirmek için buradayız."}
                  </p>
                  <Link href="/iletisim">
                    <Button className={`rounded-none font-brand uppercase tracking-widest text-xs h-16 px-12 font-bold transition-all duration-300 shadow-2xl ${
                      isCtaWhite 
                        ? "bg-brand-black text-brand-off-white hover:bg-brand-accent hover:text-white" 
                        : "bg-brand-off-white text-brand-black hover:bg-brand-accent hover:text-white shadow-brand-accent/10"
                    }`}>
                      BİZİMLE İLETİŞİME GEÇİN
                    </Button>
                  </Link>
                </FadeIn>
              </div>
            </div>
          </section>
        );
      })()}
    </div>
  );
}
