import { Metadata } from "next";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { getClient, client } from "@/sanity/lib/client";
import { blogPostBySlugQuery, blogListQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { RichText } from "@/components/ui/RichText";
import { SanityImage } from "@/components/ui/SanityImage";
import { FadeIn } from "@/components/ui/FadeIn";
import { JsonLd, articleJsonLd } from "@/components/seo/JsonLd";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RiArrowLeftLine, RiCalendarLine } from "react-icons/ri";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await client.fetch(blogListQuery, {}, { next: { tags: ["blog"] } });
  return (posts || []).map((post: any) => ({ slug: post.slug?.current }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getClient().fetch(blogPostBySlugQuery, { slug }, { next: { tags: ["blog"] } });
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    canonicalPath: `/blog/${slug}`,
    pageSeo: post.seo,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const isDraft = (await draftMode()).isEnabled;
  const post = await getClient(isDraft).fetch(
    blogPostBySlugQuery,
    { slug },
    { next: { tags: ["blog"] } }
  );

  if (!post) notFound();

  return (
    <>
      <JsonLd data={articleJsonLd(post)} />

      <article className="min-h-screen bg-background">
        {/* Top Spacer for fixed Header */}
        <div className="pt-28 md:pt-36 bg-brand-off-white dark:bg-muted/30 border-b">
          <div className="container mx-auto px-4 max-w-4xl pb-12 md:pb-16">
            <FadeIn direction="up">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-foreground/60 hover:text-brand-accent transition-colors duration-300 font-brand text-xs font-bold tracking-widest uppercase mb-8 group"
              >
                <RiArrowLeftLine className="group-hover:-translate-x-1 transition-transform duration-300" />
                Tüm Blog Yazılarına Dön
              </Link>

              {post.publishedAt && (
                <div className="flex items-center gap-2 text-brand-accent font-brand font-bold text-xs uppercase tracking-widest mb-4">
                  <RiCalendarLine size={16} />
                  <time>{formatDate(post.publishedAt)}</time>
                </div>
              )}

              <h1 className="text-3xl md:text-5xl font-brand font-bold tracking-tight text-foreground leading-tight mb-6">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-sans border-l-2 border-brand-accent pl-4">
                  {post.excerpt}
                </p>
              )}
            </FadeIn>
          </div>
        </div>

        {/* Cover Image & Body */}
        <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
          {post.mainImage && (
            <FadeIn delay={0.15} className="mb-12">
              <div className="relative h-64 md:h-[450px] w-full rounded-none overflow-hidden shadow-lg border">
                <SanityImage
                  image={post.mainImage}
                  fill
                  sizes="(max-width: 768px) 100vw, 900px"
                  className="object-cover"
                  priority
                />
              </div>
            </FadeIn>
          )}

          <FadeIn delay={0.25}>
            <div className="bg-card p-6 md:p-10 rounded-none border shadow-xs">
              <RichText value={post.body} />
            </div>
          </FadeIn>
        </div>

        {/* Bottom CTA & Navigation */}
        <div className="border-t bg-muted/20 py-12">
          <div className="container mx-auto px-4 max-w-4xl flex flex-col md:flex-row justify-between items-center gap-6">
            <Link href="/blog">
              <Button
                variant="outline"
                className="rounded-none border-foreground hover:border-brand-accent hover:bg-brand-accent hover:text-white uppercase tracking-widest text-xs h-12 px-8 font-bold transition-all duration-300 cursor-pointer"
              >
                <RiArrowLeftLine className="mr-2" />
                Tüm Blog Yazılarına Dön
              </Button>
            </Link>
            <Link href="/iletisim">
              <Button className="rounded-none bg-brand-accent text-white hover:bg-brand-accent-light uppercase tracking-widest text-xs h-12 px-8 font-bold transition-all duration-300 cursor-pointer">
                Projenizi Görüşelim
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
