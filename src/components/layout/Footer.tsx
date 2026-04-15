import Link from "next/link";
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaPinterest,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RiMailLine, RiPhoneLine, RiMapPinLine } from "react-icons/ri";

type NavItem = {
  label: string;
  linkType: "internal" | "external";
  internalSlug?: string;
  externalUrl?: string;
  openInNewTab?: boolean;
};

type SocialLink = {
  platform: string;
  url: string;
};

const socialIconMap: Record<string, React.ElementType> = {
  instagram: FaInstagram,
  facebook: FaFacebook,
  twitter: FaXTwitter,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
  tiktok: FaTiktok,
  pinterest: FaPinterest,
  whatsapp: FaWhatsapp,
};

function resolveHref(item: NavItem): string {
  if (item.linkType === "external") return item.externalUrl || "#";
  return item.internalSlug === "home" || !item.internalSlug ? "/" : `/${item.internalSlug}`;
}

export function Footer({ settings, navigation }: { settings: any; navigation: any }) {
  const footerLinks: NavItem[] = navigation?.footerLinks || [];
  const socialLinks: SocialLink[] = (settings?.socialLinks || []).filter((s: SocialLink) => s.url);
  const contact = settings?.contactInfo;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Marka & Sosyal Medya */}
          <div className="space-y-6">
            <div>
              <h3 className="font-brand text-2xl font-bold tracking-tight text-foreground">{settings?.siteName || "NUARK MİMARLIK"}</h3>
              {settings?.siteTagline && (
                <p className="mt-2 text-sm text-muted-foreground max-w-[250px] leading-relaxed">{settings.siteTagline}</p>
              )}
            </div>
            
            {socialLinks.length > 0 && (
              <div className="flex gap-3">
                {socialLinks.map((social, i) => {
                  const Icon = socialIconMap[social.platform];
                  if (!Icon) return null;
                  return (
                    <a
                      key={i}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.platform}
                      className="flex h-10 w-10 items-center justify-center rounded-none border border-border text-muted-foreground hover:bg-brand-accent hover:text-black hover:border-brand-accent transition-all duration-300"
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Linkleri */}
          {footerLinks.length > 0 && (
            <div className="space-y-6">
              <h3 className="font-brand text-sm font-bold tracking-widest text-foreground uppercase">Hızlı Linkler</h3>
              <nav className="flex flex-col space-y-3">
                {footerLinks.map((item, i) => (
                  <Link
                    key={i}
                    href={resolveHref(item)}
                    target={item.openInNewTab ? "_blank" : undefined}
                    rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                    className="text-sm text-muted-foreground hover:text-brand-accent transition-colors w-fit"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          )}

          {/* Hizmetler Özeti (Statik/Sabit) */}
          <div className="space-y-6">
            <h3 className="font-brand text-sm font-bold tracking-widest text-foreground uppercase">Hizmetlerimiz</h3>
            <nav className="flex flex-col space-y-3">
              <Link href="/hizmetlerimiz" className="text-sm text-muted-foreground hover:text-brand-accent transition-colors w-fit">
                Mimari Tasarım
              </Link>
              <Link href="/hizmetlerimiz" className="text-sm text-muted-foreground hover:text-brand-accent transition-colors w-fit">
                İç Mimari
              </Link>
              <Link href="/hizmetlerimiz" className="text-sm text-muted-foreground hover:text-brand-accent transition-colors w-fit">
                Proje Yönetimi
              </Link>
              <Link href="/hizmetlerimiz" className="text-sm text-muted-foreground hover:text-brand-accent transition-colors w-fit">
                İnşaat Uygulama
              </Link>
            </nav>
          </div>

          {/* İletişim */}
          <div className="space-y-6">
            <h3 className="font-brand text-sm font-bold tracking-widest text-foreground uppercase">İletişim</h3>
            <div className="flex flex-col space-y-4">
              {contact?.address && (
                <div className="flex items-start gap-3">
                  <RiMapPinLine className="shrink-0 mt-1 text-brand-accent" size={18} />
                  <span className="text-sm text-muted-foreground leading-relaxed">{contact.address}</span>
                </div>
              )}
              {contact?.phone && (
                <div className="flex items-center gap-3">
                  <RiPhoneLine className="shrink-0 text-brand-accent" size={18} />
                  <a href={`tel:${contact.phone}`} className="text-sm text-muted-foreground hover:text-brand-accent transition-colors">
                    {contact.phone}
                  </a>
                </div>
              )}
              {contact?.email && (
                <div className="flex items-center gap-3">
                  <RiMailLine className="shrink-0 text-brand-accent" size={18} />
                  <a href={`mailto:${contact.email}`} className="text-sm text-muted-foreground hover:text-brand-accent transition-colors">
                    {contact.email}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Alt Bar */}
        <div className="mt-16 border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground tracking-wide uppercase">
            © {currentYear} {settings?.siteName || "NUARK MİMARLIK"}. Tüm hakları saklıdır.
          </p>
          <p className="text-xs text-muted-foreground tracking-wide uppercase">
            Tasarım ve Geliştirme:{" "}
            <a
              href="https://sedminadijital.com/tr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-brand-accent transition-colors font-bold"
            >
              Sedmina Dijital
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
