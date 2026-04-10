import { FadeIn } from "@/components/ui/FadeIn";
import { ReferansMarquee } from "@/components/ui/ReferansMarquee";

interface MarqueeSectionProps {
  marqueeRefs: any[];
}

export function MarqueeSection({ marqueeRefs }: MarqueeSectionProps) {
  if (!marqueeRefs || marqueeRefs.length === 0) return null;

  return (
    <section className="bg-brand-black border-b border-white/10 pb-16 md:pb-24 pt-4 md:pt-8 overflow-hidden z-20 relative">
      <div className="container mx-auto px-4 mb-10 text-center">
        <FadeIn direction="up">
          <span className="block text-brand-accent font-sans text-xs font-bold tracking-widest uppercase mb-3">
            Referanslarımız
          </span>
          <p className="text-white/30 font-sans text-sm tracking-wide">
            Birlikte çalışmaktan gurur duyduğumuz kurumlar
          </p>
        </FadeIn>
      </div>
      <ReferansMarquee references={marqueeRefs} />
    </section>
  );
}
