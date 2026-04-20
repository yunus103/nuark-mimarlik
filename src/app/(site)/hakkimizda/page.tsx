import { Metadata } from "next";
import { getClient } from "@/sanity/lib/client";
import { aboutPageQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/ui/FadeIn";
import { SanityImage } from "@/components/ui/SanityImage";
import { RichText } from "@/components/ui/RichText";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getClient().fetch(aboutPageQuery, {}, { next: { tags: ["about"] } });
  return buildMetadata({
    title: data?.seo?.metaTitle || data?.heroHeadline || "Hakkımızda",
    description:
      data?.seo?.metaDescription ||
      data?.heroSubtitle ||
      "Nuark Mimarlık olarak mekanlara estetik ve fonksiyonel kimlik kazandırıyoruz.",
    canonicalPath: "/hakkimizda",
    pageSeo: data?.seo,
  });
}

// ─── Fallback Data ────────────────────────────────────────────────────────────

const FALLBACK_VALUES = [
  {
    title: "Tasarım Mükemmeliyeti",
    description:
      "Her projede estetik ile işlevselliği bir arada sunarız. Malzeme seçiminden biçim kararlarına kadar her detay, mekanın ruhuna hizmet eder.",
  },
  {
    title: "Sürdürülebilirlik",
    description:
      "Ekolojik bilinci tasarım sürecinin merkezine alarak geleceğe karşı sorumluluğumuzu mimari çözümlerimize yansıtıyoruz.",
  },
  {
    title: "Bütçe Disiplini",
    description:
      "Maliyet planlamasından teslimata kadar her aşamada şeffaf ve öngörülebilir bir süreç yönetimiyle yatırımınızı güvence altına alıyoruz.",
  },
  {
    title: "Disiplinler Arası Yaklaşım",
    description:
      "Mimarlık, iç tasarım ve proje yönetimini tek çatı altında birleştirerek koordinasyonu güçlendiriyor, süreci basitleştiriyoruz.",
  },
  {
    title: "İnsan Odaklı Tasarım",
    description:
      "Kullanıcı deneyimini merkeze alarak mekanları; güvenli, erişilebilir ve ilham verici biçimde kurguluyoruz.",
  },
  {
    title: "Zamansız Estetik",
    description:
      "Trend akımlardan beslenerek ancak onlara bağlı kalmadan, on yıllar sonra da değer taşıyacak mekanlar yaratmayı hedefliyoruz.",
  },
];

const FALLBACK_STATS = [
  { value: "125+", label: "Uygulama" },
  { value: "60+",  label: "Müşteri" },
  { value: "12.500+", label: "m²" },
  { value: "180+", label: "Mimari Proje" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function AboutPage() {
  const data = await getClient().fetch(aboutPageQuery, {}, { next: { tags: ["about"] } });

  const values: { title: string; description: string }[] =
    data?.values && data.values.length > 0 ? data.values : FALLBACK_VALUES;

  const stats: { value: string; label: string }[] =
    data?.stats && data.stats.length > 0 ? data.stats : FALLBACK_STATS;

  return (
    <div className="bg-brand-off-white min-h-screen overflow-x-hidden">

      {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
      <PageHero
        title={data?.heroHeadline || "Hakkımızda"}
        description={data?.heroSubtitle || "Mimarlık, iç tasarım ve proje yönetimini tek çatı altında buluşturarak fikir aşamasından anahtar teslimine kadar her adımda kalite ve titizlikle yanınızdayız."}
      />

      {/* ── 2. STATS BAND ───────────────────────────────────────────────── */}
      <section className="bg-brand-black border-b border-white/5">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {stats.map((stat, i) => (
              <FadeIn key={i} delay={i * 0.08} className="px-4 py-8 md:px-8 md:py-12 text-center">
                <span className="block text-2xl md:text-5xl font-brand font-bold text-brand-off-white tracking-tight mb-1 md:mb-2">
                  <AnimatedCounter value={stat.value} />
                </span>
                <span className="text-[10px] md:text-xs font-brand font-bold text-brand-accent tracking-widest uppercase">
                  {stat.label}
                </span>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. HİKAYEMİZ ────────────────────────────────────────────────── */}
      <section className="py-28 md:py-40 bg-brand-off-white border-b border-brand-black/8 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">

            {/* Image */}
            <FadeIn direction="right">
              <div className="relative max-w-lg mx-auto">
                <div className="relative aspect-[4/5] w-full overflow-hidden group">
                  {data?.storyImage ? (
                    <SanityImage
                      image={data.storyImage}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105 grayscale hover:grayscale-0"
                      sizes="(max-width: 1024px) 100vw, 45vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-brand-black/5 flex flex-col items-center justify-center gap-4">
                      <div className="w-16 h-px bg-brand-accent" />
                      <span className="text-brand-black/20 text-sm font-brand tracking-widest uppercase">Görsel</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-brand-black/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                {/* Decorative frame */}
                <div className="absolute -inset-4 border border-brand-accent/25 -z-10 translate-x-6 translate-y-6 hidden lg:block" />
              </div>
            </FadeIn>

            {/* Text */}
            <FadeIn direction="left" delay={0.15}>
              <span className="inline-block text-brand-accent font-brand text-xs font-bold tracking-[0.3em] uppercase mb-6">
                HİKAYEMİZ
              </span>
              <h2 className="text-3xl md:text-5xl font-brand font-bold tracking-tight mb-8 text-brand-black leading-[1.1]">
                {data?.storyTitle || "On Yılda Bir Vizyonun İnşası"}
              </h2>
              <div className="text-brand-black/65 text-lg leading-relaxed space-y-5">
                {data?.storyText ? (
                  <RichText
                    value={data.storyText}
                    className="prose-p:text-brand-black/65 prose-p:leading-relaxed prose-p:text-lg"
                  />
                ) : (
                  <>
                    <p>
                      Nuark Mimarlık, 2014 yılında estetikle mühendisliğin kesiştiği noktada doğdu. Kurucularımızın
                      ortak vizyonu; yalnızca bina değil, yaşantılarla dolu mekanlar yaratmaktı.
                    </p>
                    <p>
                      Bugün mimari tasarım, iç mimari, proje yönetimi ve inşaat uygulama hizmetlerini tek çatı altında
                      sunuyoruz. Her projede arazi analizinden ruhsat sürecine, detay projelerinden anahtar teslimine
                      kadar uzanan bütünleşik bir hizmet anlayışını benimsiyoruz.
                    </p>
                    <p>
                      Sürdürülebilir tasarım ilkeleri ve bütçe disipliniyle şekillenen çalışma metodolojimiz; işveren,
                      teknik ekipler ve kullanıcılar arasında şeffaf ve güvenilir bir köprü kurmamızı sağlıyor.
                    </p>
                  </>
                )}
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ── 4. DEĞERLERİMİZ ─────────────────────────────────────────────── */}
      <section className="bg-brand-gray-100 border-b border-brand-black/8">
        <div className="container mx-auto">

          {/* Header */}
          <div className="px-4 py-16 md:py-24 border-b border-brand-black/8">
            <FadeIn className="max-w-2xl">
              <span className="inline-block text-brand-accent font-brand text-xs font-bold tracking-[0.3em] uppercase mb-5">
                DEĞERLERİMİZ
              </span>
              <h2 className="text-3xl md:text-5xl font-brand font-bold tracking-tight text-brand-black leading-[1.1]">
                {data?.valuesTitle || "Bizi Biz Yapan İlkeler"}
              </h2>
            </FadeIn>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-brand-black/8">
            {values.map((value, i) => (
              <FadeIn
                key={i}
                delay={i * 0.08}
                className="p-10 md:p-14 group hover:bg-brand-black transition-colors duration-500 border-b border-brand-black/8 last:border-b-0"
              >
                <span className="block text-brand-accent text-2xl font-brand font-bold mb-5">
                  0{i + 1}
                </span>
                <h3 className="text-lg font-brand font-bold mb-3 text-brand-black group-hover:text-brand-off-white transition-colors duration-500">
                  {value.title}
                </h3>
                <p className="text-brand-black/55 text-sm leading-relaxed group-hover:text-brand-off-white/60 transition-colors duration-500">
                  {value.description}
                </p>
              </FadeIn>
            ))}
          </div>

        </div>
      </section>

      {/* ── 5. EKİBİMİZ ─────────────────────────────────────────────────── */}
      {data?.team && data.team.length > 0 && (
        <section className="py-28 md:py-40 bg-brand-off-white border-b border-brand-black/8">
          <div className="container mx-auto px-4">

            <FadeIn className="mb-16">
              <span className="inline-block text-brand-accent font-brand text-xs font-bold tracking-[0.3em] uppercase mb-5">
                EKİBİMİZ
              </span>
              <h2 className="text-3xl md:text-5xl font-brand font-bold tracking-tight text-brand-black leading-[1.1]">
                {data?.teamTitle || "Kurucu ve Mimarlar"}
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
              {data.team.map((member: any, i: number) => (
                <FadeIn key={i} delay={i * 0.1} className="group">
                  <div className="relative aspect-[4/5] w-full mb-6 overflow-hidden bg-brand-black/5">
                    {member.photo ? (
                      <SanityImage
                        image={member.photo}
                        fill
                        className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-brand-black/10 font-brand text-7xl font-bold">
                          {member.name?.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-brand font-bold mb-1 text-brand-black">{member.name}</h3>
                  <p className="text-brand-accent font-brand text-xs font-bold tracking-widest uppercase mb-3">
                    {member.title}
                  </p>
                  {member.bio && (
                    <p className="text-brand-black/55 text-sm leading-relaxed">{member.bio}</p>
                  )}
                </FadeIn>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* ── 6. CTA ──────────────────────────────────────────────────────── */}
      <section className="relative py-28 md:py-40 bg-brand-black overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-accent/30 to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/2 aspect-square rounded-full blur-[140px] translate-x-1/3 translate-y-1/3 bg-brand-accent/8" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <span className="font-brand text-xs font-bold tracking-[0.3em] uppercase mb-7 block text-brand-accent">
                BİZİMLE ÇALIŞIN
              </span>
              <h2 className="text-4xl md:text-6xl font-brand font-bold tracking-tighter mb-8 leading-tight text-brand-off-white break-words">
                Projenizi Birlikte<br />Hayata Geçirelim
              </h2>
              <p className="text-lg max-w-xl mx-auto mb-14 text-brand-off-white/55">
                Mimari danışmanlıktan anahtar teslim inşaata kadar tüm süreçlerde yanınızdayız.
                Projenizi anlatın, sizin için en doğru çözümü birlikte tasarlayalım.
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
