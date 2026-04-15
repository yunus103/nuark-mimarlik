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
            <span className="block text-brand-accent font-brand text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {data.heroEyebrow}
            </span>
          )}
          
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-brand font-bold text-brand-off-white leading-[1.1] tracking-tight mb-8">
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
                <Button size="lg" className="w-full sm:w-auto bg-brand-accent text-brand-black hover:bg-brand-black hover:text-brand-accent rounded-none border-2 border-brand-accent transition-all duration-300 font-brand font-bold uppercase tracking-widest text-xs h-16 px-10 shadow-lg shadow-black/20">
                  {data.heroPrimaryCtaLabel}
                </Button>
              </Link>
            )}
            {data?.heroSecondaryCtaLabel && data?.heroSecondaryCtaSlug && (
              <Link href={`/${data.heroSecondaryCtaSlug}`} className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-white border-white/40 hover:border-brand-accent hover:text-brand-accent bg-black/10 backdrop-blur-sm rounded-none transition-all duration-300 font-brand font-bold uppercase tracking-widest text-xs h-16 px-10 shadow-lg shadow-black/20">
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
