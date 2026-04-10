import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { contactPageQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/ui/FadeIn";
import { ContactForm } from "@/components/forms/ContactForm";
import {
  RiPhoneLine,
  RiMailLine,
  RiMapPinLine,
  RiWhatsappLine,
  RiInstagramLine,
  RiLinkedinLine,
  RiFacebookBoxLine,
  RiTwitterXLine,
  RiYoutubeLine,
  RiGlobalLine,
  RiArrowRightUpLine,
} from "react-icons/ri";

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(contactPageQuery, {}, { next: { tags: ["contact"] } });
  return buildMetadata({
    title: data?.page?.pageTitle || "İletişim",
    canonicalPath: "/iletisim",
    pageSeo: data?.page?.seo,
  });
}

const SOCIAL_ICONS: Record<string, React.ElementType> = {
  instagram: RiInstagramLine,
  linkedin: RiLinkedinLine,
  facebook: RiFacebookBoxLine,
  twitter: RiTwitterXLine,
  x: RiTwitterXLine,
  youtube: RiYoutubeLine,
  website: RiGlobalLine,
};

const SOCIAL_LABELS: Record<string, string> = {
  instagram: "Instagram",
  linkedin: "LinkedIn",
  facebook: "Facebook",
  twitter: "Twitter / X",
  x: "X",
  youtube: "YouTube",
  website: "Web Site",
};

export default async function ContactPage() {
  const data = await client.fetch(contactPageQuery, {}, { next: { tags: ["contact"] } });

  const page = data?.page;
  const settings = data?.settings;
  const contact = settings?.contactInfo;
  const socials = (settings?.socialLinks || []).filter((s: any) => s?.url);

  return (
    <>
      {/* HERO */}
      <section className="bg-brand-black text-brand-off-white pt-32 pb-20 md:pt-48 md:pb-32 px-4 border-b border-white/10">
        <div className="container mx-auto max-w-5xl text-center">
          <FadeIn direction="up">
            <span className="block text-brand-accent font-sans text-xs font-bold tracking-widest uppercase mb-6">İLETİŞİM</span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-8 leading-[1.1]">
              {page?.heroHeadline || "Bizimle İletişime Geçin"}
            </h1>
            <p className="text-xl md:text-2xl font-sans text-white/70 max-w-2xl mx-auto leading-relaxed">
              {page?.heroSubtitle || "Yeni bir proje, ortaklık veya detaylı bilgi için yanınızdayız."}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

            {/* Sol — İletişim Bilgileri */}
            <div className="space-y-12">
              <FadeIn>
                <h2 className="text-3xl font-serif font-bold mb-10">İletişim Bilgileri</h2>

                <div className="space-y-8">
                  {/* Telefon */}
                  {contact?.phone && (
                    <div className="flex gap-5 items-start group">
                      <div className="shrink-0 w-10 h-10 border border-brand-accent/30 flex items-center justify-center group-hover:bg-brand-accent group-hover:border-brand-accent transition-all duration-300">
                        <RiPhoneLine className="text-brand-accent group-hover:text-brand-black transition-colors duration-300 text-lg" />
                      </div>
                      <div>
                        <p className="text-brand-accent text-[11px] font-bold tracking-widest uppercase mb-1">Telefon</p>
                        <a href={`tel:${contact.phone}`} className="text-base font-sans font-bold text-foreground hover:text-brand-accent transition-colors duration-300">
                          {contact.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* WhatsApp */}
                  {contact?.whatsappNumber && contact?.showWhatsappButton !== false && (
                    <div className="flex gap-5 items-start group">
                      <div className="shrink-0 w-10 h-10 border border-brand-accent/30 flex items-center justify-center group-hover:bg-brand-accent group-hover:border-brand-accent transition-all duration-300">
                        <RiWhatsappLine className="text-brand-accent group-hover:text-brand-black transition-colors duration-300 text-lg" />
                      </div>
                      <div>
                        <p className="text-brand-accent text-[11px] font-bold tracking-widest uppercase mb-1">WhatsApp</p>
                        <a
                          href={`https://wa.me/${contact.whatsappNumber.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base font-sans font-bold text-foreground hover:text-brand-accent transition-colors duration-300"
                        >
                          {contact.whatsappNumber}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* E-posta */}
                  {contact?.email && (
                    <div className="flex gap-5 items-start group">
                      <div className="shrink-0 w-10 h-10 border border-brand-accent/30 flex items-center justify-center group-hover:bg-brand-accent group-hover:border-brand-accent transition-all duration-300">
                        <RiMailLine className="text-brand-accent group-hover:text-brand-black transition-colors duration-300 text-lg" />
                      </div>
                      <div>
                        <p className="text-brand-accent text-[11px] font-bold tracking-widest uppercase mb-1">E-Posta</p>
                        <a href={`mailto:${contact.email}`} className="text-base font-sans font-bold text-foreground hover:text-brand-accent transition-colors duration-300 break-all">
                          {contact.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Adres */}
                  {contact?.address && (
                    <div className="flex gap-5 items-start group">
                      <div className="shrink-0 w-10 h-10 border border-brand-accent/30 flex items-center justify-center group-hover:bg-brand-accent group-hover:border-brand-accent transition-all duration-300">
                        <RiMapPinLine className="text-brand-accent group-hover:text-brand-black transition-colors duration-300 text-lg" />
                      </div>
                      <div>
                        <p className="text-brand-accent text-[11px] font-bold tracking-widest uppercase mb-1">Adres</p>
                        <p className="text-base font-sans text-foreground leading-relaxed whitespace-pre-line">
                          {contact.address}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Sosyal Medya */}
                {socials.length > 0 && (
                  <div className="pt-10 border-t border-foreground/10">
                    <p className="text-brand-accent text-[11px] font-bold tracking-widest uppercase mb-6">Sosyal Medya</p>
                    <div className="flex flex-col gap-3">
                      {socials.map((social: any, i: number) => {
                        const Icon = SOCIAL_ICONS[social.platform?.toLowerCase()] || RiGlobalLine;
                        const label = SOCIAL_LABELS[social.platform?.toLowerCase()] || social.platform;
                        return (
                          <a
                            key={i}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 text-foreground/70 hover:text-brand-accent transition-colors duration-300 group"
                          >
                            <Icon className="text-xl shrink-0" />
                            <span className="font-sans text-sm font-medium">{label}</span>
                            <RiArrowRightUpLine className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-auto" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </FadeIn>
            </div>

            {/* Sağ — Form */}
            <FadeIn delay={0.2}>
              <div className="bg-muted p-8 md:p-12 border border-foreground/10">
                <ContactForm
                  formTitle={page?.formTitle}
                  successMessage={page?.successMessage}
                  projectTypes={page?.projectTypes}
                />
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* Harita */}
      {contact?.mapIframe && (
        <section className="h-[50vh] min-h-[400px] w-full relative z-10 border-t border-foreground/10">
          <div
            dangerouslySetInnerHTML={{ __html: contact.mapIframe }}
            className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0"
          />
        </section>
      )}
    </>
  );
}
