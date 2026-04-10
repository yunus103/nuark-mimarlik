import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { serviceListQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/ui/FadeIn";
import { SanityImage } from "@/components/ui/SanityImage";
import { RichText } from "@/components/ui/RichText";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Hizmetlerimiz",
    description: "Nuark Mimarlık'ın sunduğu mimari ve tasarım hizmetleri.",
    canonicalPath: "/hizmetlerimiz",
  });
}

export default async function ServicesPage() {
  const services = await client.fetch(serviceListQuery, {}, { next: { tags: ["services"] } });

  return (
    <>
      <section className="bg-brand-black text-brand-off-white pt-32 pb-20 md:pt-48 md:pb-32 px-4 border-b border-white/10">
        <div className="container mx-auto max-w-5xl text-center md:text-left">
          <FadeIn direction="up">
            <span className="block text-brand-accent font-sans text-xs font-bold tracking-widest uppercase mb-6">UZMANLIK ALANLARIMIZ</span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-8 leading-[1.1]">
              Hizmetlerimiz
            </h1>
            <p className="text-xl md:text-2xl font-sans text-white/70 max-w-3xl leading-relaxed">
              Fikirden anahtar teslimine kadar, sürecin her aşamasında kalite ve titizlikle yanınızdayız.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-background">
        {services.map((service: any, index: number) => {
          const isEven = index % 2 === 0;
          return (
             <div key={service.slug?.current || index} id={service.slug?.current} className="py-24 md:py-32 border-b border-foreground/10 last:border-0 scroll-mt-24">
                <div className="container mx-auto px-4">
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center ${isEven ? "" : "lg:flex-row-reverse"}`}>
                    
                    {/* Görsel Sütunu */}
                    <FadeIn direction={isEven ? "right" : "left"} className={`${isEven ? "order-1" : "order-1 lg:order-2"}`}>
                      {service.mainImage ? (
                        <div className="relative aspect-[4/5] w-full">
                          <SanityImage
                            image={service.mainImage}
                            fill
                            className="object-cover grayscale filter transition-all duration-700 hover:grayscale-0"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                           <div className={`absolute -bottom-6 ${isEven ? "-right-6" : "-left-6"} w-full h-full border border-brand-accent/30 -z-10 hidden md:block`} />
                        </div>
                      ) : (
                        <div className="w-full aspect-[4/5] bg-muted flex items-center justify-center">Görsel Yok</div>
                      )}
                    </FadeIn>

                    {/* Metin Sütunu */}
                    <FadeIn direction={isEven ? "left" : "right"} className={`${isEven ? "order-2" : "order-2 lg:order-1"}`}>
                      <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-8">{service.title}</h2>
                      
                      {service.longDescription && (
                        <div className="prose prose-lg dark:prose-invert prose-headings:font-serif text-muted-foreground leading-relaxed mb-12">
                          <RichText value={service.longDescription} />
                        </div>
                      )}

                      {service.steps && service.steps.length > 0 && (
                        <div>
                          <h3 className="font-sans text-sm font-bold tracking-widest uppercase mb-6 text-brand-accent">Hizmet Süreci</h3>
                          <ul className="space-y-6">
                            {service.steps.map((step: any, stepIdx: number) => (
                              <li key={stepIdx} className="flex items-start gap-4">
                                <span className="bg-muted text-foreground font-bold font-serif w-8 h-8 flex items-center justify-center shrink-0">
                                  {stepIdx + 1}
                                </span>
                                <div>
                                  <h4 className="font-bold text-foreground mb-1">{step.title}</h4>
                                  <p className="text-sm text-muted-foreground">{step.description}</p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </FadeIn>

                  </div>
                </div>
             </div>
          );
        })}
      </section>
    </>
  );
}
