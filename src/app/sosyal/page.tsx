import { Metadata } from "next";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import Link from "next/link";
import { getClient } from "@/sanity/lib/client";
import { qrPageQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { SanityImage } from "@/components/ui/SanityImage";
import { FadeIn } from "@/components/ui/FadeIn";
import { AnimateGroup } from "@/components/ui/AnimateGroup";
import { 
  RiInstagramLine, 
  RiFacebookBoxLine, 
  RiLinkedinLine, 
  RiPinterestLine, 
  RiWhatsappLine, 
  RiYoutubeLine, 
  RiTwitterXLine, 
  RiGlobalLine, 
  RiLink 
} from "react-icons/ri";
import { FaTiktok } from "react-icons/fa";

type Props = {};

export async function generateMetadata(): Promise<Metadata> {
  const data = await getClient().fetch(qrPageQuery, {}, { next: { tags: ["layout"] } });
  return buildMetadata({
    title: `${data?.qrTitle || data?.siteName || "Nuark Mimarlık"} | Bağlantılar`,
    description: data?.qrSubtitle || "Sosyal medya bağlantılarımız.",
    canonicalPath: "/sosyal",
    noIndex: true, // Google aramada listelenmesine gerek yok
  });
}

const platformIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  instagram: RiInstagramLine,
  facebook: RiFacebookBoxLine,
  linkedin: RiLinkedinLine,
  pinterest: RiPinterestLine,
  whatsapp: RiWhatsappLine,
  youtube: RiYoutubeLine,
  x: RiTwitterXLine,
  tiktok: FaTiktok,
  website: RiGlobalLine,
};

export default async function SosyalPage() {
  const isDraft = (await draftMode()).isEnabled;
  const data = await getClient(isDraft).fetch(qrPageQuery, {}, { next: { tags: ["layout"] } });

  if (!data) notFound();

  const links = data?.qrLinks || [];
  const profileImage = data?.qrLogo || data?.logo;

  return (
    <div className="min-h-screen bg-brand-black flex flex-col items-center justify-center relative overflow-hidden py-16 px-4">
      {/* Arka plan süslemeleri (Sade ve premium degrade) */}
      <div className="absolute inset-0 bg-radial-[at_top_right] from-brand-accent/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      <div className="w-full max-w-[440px] flex flex-col items-center relative z-10 text-center">
        {/* Profil Görseli / Logo */}
        <FadeIn direction="up" className="mb-6">
          <div className="h-24 md:h-28 w-fit flex items-center justify-center relative select-none">
            {profileImage ? (
              <SanityImage
                image={{ ...profileImage, crop: undefined, hotspot: undefined }}
                width={600}
                height={800}
                fit="max"
                className="h-full w-auto object-contain transition-all duration-300"
                sizes="240px"
                priority
              />
            ) : (
              <span className="font-brand font-bold text-2xl text-brand-accent">
                N
              </span>
            )}
          </div>
        </FadeIn>

        {/* Başlık ve Açıklama */}
        <FadeIn direction="up" delay={0.1} className="mb-10 space-y-3">
          <h1 className="text-xl md:text-2xl font-brand font-bold text-brand-off-white tracking-wide uppercase">
            {data?.qrTitle || data?.siteName || "NUARK MİMARLIK"}
          </h1>
          {data?.qrSubtitle && (
            <p className="text-sm text-white/50 font-sans max-w-[320px] mx-auto leading-relaxed">
              {data.qrSubtitle}
            </p>
          )}
        </FadeIn>

        {/* Link Butonları */}
        {links.length > 0 ? (
          <AnimateGroup className="w-full space-y-4">
            {links.map((link: any, i: number) => {
              const Icon = platformIcons[link.platform?.toLowerCase()] || RiLink;
              return (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full group select-none"
                >
                  <div className="w-full flex items-center justify-between py-5 px-7 rounded-none bg-zinc-900/80 hover:bg-brand-accent border border-white/5 hover:border-brand-accent text-white/80 hover:text-brand-black transition-all duration-300 shadow-md group-active:scale-[0.98]">
                    <div className="flex items-center gap-5">
                      <Icon className="text-2xl md:text-3xl text-brand-accent group-hover:text-brand-black transition-colors shrink-0" />
                      <span className="font-sans text-base md:text-lg font-semibold tracking-wide text-left">
                        {link.label}
                      </span>
                    </div>
                    {/* Small visual indicator arrow */}
                    <span className="text-white/20 group-hover:text-brand-black/40 transition-colors font-sans text-sm md:text-base">
                      ➔
                    </span>
                  </div>
                </a>
              );
            })}
          </AnimateGroup>
        ) : (
          <FadeIn delay={0.2}>
            <p className="text-white/30 text-sm font-sans italic">
              Henüz bağlantı eklenmemiş.
            </p>
          </FadeIn>
        )}

        {/* Footer Marka */}
        <FadeIn direction="up" delay={0.4} className="mt-16">
          <Link href="/">
            <span className="font-brand text-[10px] text-white/20 hover:text-brand-accent tracking-[0.2em] transition-colors uppercase">
              {data?.siteName || "NUARK MİMARLIK"}
            </span>
          </Link>
        </FadeIn>
      </div>
    </div>
  );
}
