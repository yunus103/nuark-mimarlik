import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { AnimateGroup } from "@/components/ui/AnimateGroup";
import { SanityImage } from "@/components/ui/SanityImage";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { RiArrowRightLine, RiCalendarLine } from "react-icons/ri";

interface HomeBlogSectionProps {
  posts?: any[];
}

export function HomeBlogSection({ posts }: HomeBlogSectionProps) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="py-24 md:py-32 bg-brand-off-white dark:bg-muted/20 border-t">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <FadeIn>
            <span className="block text-brand-accent font-brand text-xs md:text-sm font-bold tracking-widest uppercase mb-3">
              YAZILAR & GÜNCELLEMELER
            </span>
            <h2 className="text-3xl md:text-5xl font-brand font-bold tracking-tight text-foreground">
              Son Blog Yazıları
            </h2>
          </FadeIn>
          <FadeIn delay={0.2} className="hidden md:block">
            <Link
              href="/blog"
              className="inline-flex items-center gap-3 font-brand font-bold uppercase tracking-widest text-sm md:text-base text-foreground hover:text-brand-accent transition-all group border-b-2 border-brand-accent pb-1 cursor-pointer"
            >
              <span>TÜM YAZILARI GÖR</span>
              <div className="p-2 bg-brand-accent text-white rounded-full group-hover:translate-x-1.5 transition-transform duration-300">
                <RiArrowRightLine size={18} />
              </div>
            </Link>
          </FadeIn>
        </div>

        {/* Posts Grid */}
        <AnimateGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {posts.map((post: any) => (
            <Link
              key={post.slug?.current || post.title}
              href={`/blog/${post.slug?.current}`}
              className="group block cursor-pointer"
            >
              <article className="border border-border bg-card overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
                {post.mainImage && (
                  <div className="relative h-56 md:h-60 w-full overflow-hidden border-b border-border">
                    <SanityImage
                      image={post.mainImage}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  {post.publishedAt && (
                    <div className="flex items-center gap-2 text-xs font-brand font-bold text-brand-accent tracking-widest uppercase mb-3">
                      <RiCalendarLine size={14} />
                      <time>{formatDate(post.publishedAt)}</time>
                    </div>
                  )}
                  <h3 className="font-brand font-bold text-xl mb-3 text-foreground group-hover:text-brand-accent transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-6 font-sans flex-1">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="inline-flex items-center gap-2 text-xs font-brand font-bold uppercase tracking-widest text-brand-accent group-hover:translate-x-1 transition-transform duration-300 mt-auto">
                    <span>Devamını Oku</span>
                    <RiArrowRightLine size={14} />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </AnimateGroup>

        {/* View All Button */}
        <div className="mt-12 md:mt-16 flex justify-center">
          <FadeIn delay={0.3}>
            <Link href="/blog">
              <Button
                variant="outline"
                className="rounded-none border-2 border-foreground hover:border-brand-accent hover:bg-brand-accent hover:text-white font-brand font-bold uppercase tracking-widest text-sm md:text-base h-14 px-10 transition-all duration-300 group shadow-xs cursor-pointer"
              >
                <span>TÜM BLOG YAZILARINI İNCELEYİN</span>
                <RiArrowRightLine size={20} className="ml-3 group-hover:translate-x-1.5 transition-transform duration-300" />
              </Button>
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
