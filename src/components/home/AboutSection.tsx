"use client";

import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { ImageStackSlider } from "@/components/ui/ImageStackSlider";
import { RichText } from "@/components/ui/RichText";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { RiArrowRightLine } from "react-icons/ri";

interface AboutSectionProps {
  data: any;
}

export function AboutSection({ data }: AboutSectionProps) {
  if (!data?.aboutTitle || !data?.aboutText) return null;

  return (
    <section className="py-24 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <FadeIn direction="right">
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-brand font-bold tracking-tight text-foreground">
                {data.aboutTitle}
              </h2>
              <div className="prose prose-lg dark:prose-invert prose-headings:font-brand text-muted-foreground">
                <RichText value={data.aboutText} />
              </div>
              <Link href="/hakkimizda" className="inline-flex items-center gap-2 text-brand-accent font-brand font-bold uppercase tracking-wider text-sm hover:gap-4 transition-all duration-300 mt-4 group">
                <span>{data.aboutCtaLabel || "Kurumsal Profilimizi İnceleyin"}</span>
                <RiArrowRightLine className="transition-transform group-hover:translate-x-1" />
              </Link>

              {/* Stats inside About Text Column */}
              {data?.stats && data.stats.length > 0 && (
                <div className="grid grid-cols-2 gap-8 pt-8 mt-12 border-t border-border/50">
                  {data.stats.map((stat: any, i: number) => (
                    <FadeIn key={i} delay={i * 0.1} direction="up" className="flex flex-col items-start gap-1">
                      <span className="text-2xl md:text-3xl font-brand font-bold text-brand-accent">
                        <AnimatedCounter value={stat.value} />
                      </span>
                      <span className="text-xs font-brand text-muted-foreground uppercase tracking-widest font-bold">{stat.label}</span>
                    </FadeIn>
                  ))}
                </div>
              )}
            </div>
          </FadeIn>

          {data.aboutImages && data.aboutImages.length > 0 && (
            <FadeIn direction="left" delay={0.2}>
              <div className="w-full max-w-[420px] mx-auto lg:ml-auto lg:mr-0 mt-10 lg:mt-0">
                <ImageStackSlider images={data.aboutImages} />
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </section>
  );
}
