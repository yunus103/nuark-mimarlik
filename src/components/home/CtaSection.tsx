import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/button";

interface CtaSectionProps {
  data: any;
}

export function CtaSection({ data }: CtaSectionProps) {
  if (!data?.ctaTitle) return null;

  return (
    <section className="relative py-32 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-background z-0" />
      {/* Subtle abstract geometric background element */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-accent/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 z-0" />
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <FadeIn>
          <h2 className="text-4xl md:text-6xl font-brand font-bold tracking-tight mb-8 max-w-4xl mx-auto leading-[1.1]">
            {data.ctaTitle}
          </h2>
          {data.ctaSubtitle && (
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
              {data.ctaSubtitle}
            </p>
          )}
          <Link href="/iletisim">
            <Button size="lg" className="rounded-none bg-foreground text-background hover:bg-primary font-brand uppercase tracking-widest text-sm h-16 px-12 font-bold shadow-xl shadow-foreground/5">
              Projeye Başlayalım
            </Button>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
