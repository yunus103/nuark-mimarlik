import { FadeIn } from "@/components/ui/FadeIn";

interface PageHeroProps {
  /** Küçük üst etiket (örn. "NUARK MİMARLIK") */
  eyebrow?: string;
  /** Sayfa başlığı — h1 */
  title: string;
  /** Opsiyonel kısa açıklama */
  description?: string;
}

/**
 * Tüm iç sayfalar için ortak hero bölümü.
 * Off-white zemin, sol hizalı, tutarlı padding.
 */
export function PageHero({ eyebrow = "NUARK MİMARLIK", title, description }: PageHeroProps) {
  return (
    <section className="pt-36 pb-16 md:pt-48 md:pb-20 px-4 bg-brand-off-white border-b border-brand-black/10">
      <div className="container mx-auto max-w-5xl">
        <FadeIn direction="up">
          <span className="inline-block text-brand-accent font-brand text-xs font-bold tracking-[0.3em] uppercase mb-5">
            {eyebrow}
          </span>
          <h1 className="text-4xl md:text-6xl font-brand font-bold tracking-tight mb-0 leading-[1.1] text-brand-black">
            {title}
          </h1>
          {description && (
            <p className="mt-5 text-lg md:text-xl font-sans text-brand-black/55 max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
