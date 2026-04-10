import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { SanityImage } from "@/components/ui/SanityImage";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  data: any;
}

export function HeroSection({ data }: HeroSectionProps) {
  return (
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
            <span className="block text-brand-accent font-sans text-sm font-bold tracking-widest uppercase mb-6">
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
                <Button size="lg" className="w-full sm:w-auto bg-brand-accent text-brand-black hover:bg-brand-black hover:text-brand-accent rounded-none border-2 border-brand-accent transition-all duration-300 font-bold uppercase tracking-widest text-xs h-16 px-10 shadow-lg shadow-black/20">
                  {data.heroPrimaryCtaLabel}
                </Button>
              </Link>
            )}
            {data?.heroSecondaryCtaLabel && data?.heroSecondaryCtaSlug && (
              <Link href={`/${data.heroSecondaryCtaSlug}`} className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-white border-white/40 hover:border-brand-accent hover:text-brand-accent bg-black/10 backdrop-blur-sm rounded-none transition-all duration-300 font-bold uppercase tracking-widest text-xs h-16 px-10 shadow-lg shadow-black/20">
                  {data.heroSecondaryCtaLabel}
                </Button>
              </Link>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
