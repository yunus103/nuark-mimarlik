import { Metadata } from "next";
import { getClient } from "@/sanity/lib/client";
import { referanslarPageQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/ui/FadeIn";
import { SanityImage } from "@/components/ui/SanityImage";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getClient().fetch(referanslarPageQuery, {}, { next: { tags: ["referanslar"] } });
  const { page } = data || {};
  return buildMetadata({
    title: page?.seo?.metaTitle || page?.heroHeadline || "Referanslarımız",
    description:
      page?.seo?.metaDescription ||
      page?.heroSubtitle ||
      "Nuark Mimarlık olarak birlikte çalıştığımız markalar ve kurumlar.",
    canonicalPath: "/referanslar",
    pageSeo: page?.seo,
  });
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface Client {
  companyName: string;
  sector?: string;
  url?: string;
  forceGrayscale?: boolean;
  logo?: any;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ReferanslarPage() {
  const data = await getClient().fetch(referanslarPageQuery, {}, { next: { tags: ["referanslar"] } });
  const { page, fallbackClients = [] } = data || {};

  // Sayfaya özgü clients varsa onlar, yoksa homePage'den gelen fallback
  const clients: Client[] =
    page?.clients && page.clients.length > 0 ? page.clients : fallbackClients;

  const hasClients = clients.length > 0;

  return (
    <div className="bg-brand-off-white min-h-screen">

      {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
      <PageHero
        eyebrow="REFERANSLARIMIZ"
        title={page?.heroHeadline || "Güvendikleri Markalar"}
        description={
          page?.heroSubtitle ||
          "Yıllar içinde birlikte çalıştığımız kurumlar ve markalarla inşa ettiğimiz güven, en değerli referansımızdır."
        }
      />

      {/* ── 2. REFERANSLAR GRID ──────────────────────────────────────────── */}
      {hasClients && (
        <section className="py-24 md:py-36 bg-brand-off-white border-b border-brand-black/8">
          <div className="container mx-auto px-4">

            {/* Bölüm başlığı */}
            <FadeIn className="mb-16 max-w-2xl">
              <span className="inline-block text-brand-accent font-brand text-xs font-bold tracking-[0.3em] uppercase mb-4">
                MARKALAR
              </span>
              <h2 className="text-3xl md:text-4xl font-brand font-bold tracking-tight text-brand-black leading-[1.1]">
                {page?.sectionTitle || "Birlikte Çalıştığımız Markalar"}
              </h2>
              {(page?.sectionSubtitle) && (
                <p className="mt-4 text-brand-black/55 text-lg leading-relaxed">
                  {page.sectionSubtitle}
                </p>
              )}
            </FadeIn>

            {/* Logo Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-px bg-brand-black/8 border border-brand-black/8">
              {clients.map((client, i) => {
                const inner = (
                  <FadeIn
                    delay={i * 0.04}
                    className="group bg-brand-off-white flex flex-col items-center justify-center gap-3 px-6 py-10 hover:bg-white transition-colors duration-300 min-h-[140px]"
                  >
                    {client.logo ? (
                      <div className="relative w-full h-14 mx-auto">
                        <SanityImage
                          image={client.logo}
                          fill
                          objectFit="contain"
                          className={
                            client.forceGrayscale
                              ? // Toggle açık: grayscale + brightness düşür → beyaz logolar da gri görünür
                                "grayscale brightness-[0.4] transition-all duration-500"
                              : // Toggle kapalı (default): gri → hover'da orijinal renk
                                "grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100"
                          }
                          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw"
                        />
                      </div>
                    ) : (
                      /* Logo yoksa sadece isim göster */
                      <span className="font-brand font-bold text-sm text-brand-black/40 group-hover:text-brand-black transition-colors duration-300 text-center leading-tight">
                        {client.companyName}
                      </span>
                    )}
                    {client.logo && client.sector && (
                      <span className="text-[10px] font-brand font-bold tracking-widest uppercase text-brand-black/30 group-hover:text-brand-accent transition-colors duration-300">
                        {client.sector}
                      </span>
                    )}
                  </FadeIn>
                );

                return client.url ? (
                  <a
                    key={i}
                    href={client.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${client.companyName} web sitesi`}
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={i}>{inner}</div>
                );
              })}
            </div>

          </div>
        </section>
      )}

      {/* ── 3. GÜVEN METRİKLERİ ─────────────────────────────────────────── */}
      <section className="bg-brand-gray-100 border-b border-brand-black/8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-brand-black/8">
            {[
              {
                icon: "◈",
                title: "Uzun Vadeli İlişkiler",
                desc: "Müşterilerimizin büyük çoğunluğu birden fazla proje için bize tekrar başvurmaktadır.",
              },
              {
                icon: "◉",
                title: "Geniş Sektör Yelpazesi",
                desc: "Konut, ticari, otelcilik ve endüstriyel alanlarda farklı sektörlerden markalara hizmet veriyoruz.",
              },
              {
                icon: "◎",
                title: "Şeffaf Süreç Yönetimi",
                desc: "Her projede işveren ile kurduğumuz şeffaf iletişim, güvenilir bir iş birliğinin temelini oluşturuyor.",
              },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1} className="px-10 py-14 md:px-12 md:py-16">
                <span className="block text-brand-accent text-2xl mb-5 font-brand">{item.icon}</span>
                <h3 className="font-brand font-bold text-lg text-brand-black mb-3">{item.title}</h3>
                <p className="text-brand-black/55 text-sm leading-relaxed">{item.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. CTA ──────────────────────────────────────────────────────── */}
      <section className="relative py-28 md:py-40 bg-brand-black overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-accent/30 to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/2 aspect-square rounded-full blur-[140px] translate-x-1/3 translate-y-1/3 bg-brand-accent/8" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <span className="font-brand text-xs font-bold tracking-[0.3em] uppercase mb-7 block text-brand-accent">
                BİZİMLE ÇALIŞIN
              </span>
              <h2 className="text-4xl md:text-6xl font-brand font-bold tracking-tighter mb-8 leading-tight text-brand-off-white">
                {page?.ctaTitle || "Siz de Referanslarımız\nArasında Yer Alın"}
              </h2>
              <p className="text-lg max-w-xl mx-auto mb-14 text-brand-off-white/55">
                {page?.ctaDescription ||
                  "Projenizi birlikte hayata geçirelim. Mimari danışmanlıktan anahtar teslim inşaata kadar tüm süreçlerde yanınızdayız."}
              </p>
              <Link href="/iletisim">
                <Button
                  className="rounded-none font-brand uppercase tracking-widest text-xs h-14 px-10 font-bold
                             bg-brand-off-white text-brand-black hover:bg-brand-accent hover:text-white
                             transition-all duration-300"
                >
                  İLETİŞİME GEÇİN
                </Button>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

    </div>
  );
}
