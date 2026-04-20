import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { blogListQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { AnimateGroup, fadeUpItem } from "@/components/ui/AnimateGroup";
import { SanityImage } from "@/components/ui/SanityImage";
import { FadeIn } from "@/components/ui/FadeIn";
import { PageHero } from "@/components/ui/PageHero";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Blog",
    canonicalPath: "/blog",
  });
}

export default async function BlogListPage() {
  const posts = await client.fetch(blogListQuery, {}, { next: { tags: ["blog"] } });

  return (
    <>
      <PageHero
        eyebrow="NUARK MİMARLIK"
        title="Blog"
        description="Yazılar, güncellemeler ve haberler."
      />

      <section className="py-24 bg-brand-off-white">
        <div className="container mx-auto px-4">
          {posts?.length > 0 ? (
            <AnimateGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: any) => (
                <Link key={post.slug?.current} href={`/blog/${post.slug?.current}`} className="group block">
                  <article className="border border-brand-black/10 overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300">
                    {post.mainImage && (
                      <div className="relative h-48 overflow-hidden">
                        <SanityImage
                          image={post.mainImage}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      {post.publishedAt && (
                        <time className="text-xs text-brand-accent font-brand font-bold tracking-widest uppercase mb-3 block">
                          {formatDate(post.publishedAt)}
                        </time>
                      )}
                      <h2 className="font-brand font-bold text-lg mb-2 text-brand-black group-hover:text-brand-accent transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-sm text-brand-black/55 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                      )}
                    </div>
                  </article>
                </Link>
              ))}
            </AnimateGroup>
          ) : (
            <FadeIn>
              <p className="text-brand-black/40 text-center py-16 font-sans">Henüz blog yazısı yok.</p>
            </FadeIn>
          )}
        </div>
      </section>
    </>
  );
}
