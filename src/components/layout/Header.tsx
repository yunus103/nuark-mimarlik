"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SanityImage } from "@/components/ui/SanityImage";
import { RiMenu3Line, RiCloseLine, RiArrowRightLine, RiMapPinLine, RiPhoneLine, RiMailLine } from "react-icons/ri";

type NavItem = {
  label: string;
  linkType: "internal" | "external";
  internalSlug?: string;
  externalUrl?: string;
  openInNewTab?: boolean;
  subLinks?: NavItem[];
};

function resolveHref(item: NavItem): string {
  if (item.linkType === "external") return item.externalUrl || "#";
  return item.internalSlug === "home" || !item.internalSlug ? "/" : `/${item.internalSlug}`;
}

export function Header({ settings, navigation }: { settings: any; navigation: any }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  
  const links: NavItem[] = navigation?.headerLinks || [];
  const contact = settings?.contactInfo;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [menuOpen]);

  const bgClass = (isHome && !scrolled && !menuOpen)
    ? "bg-transparent border-transparent"
    : "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-white/10 dark:border-white/10";

  return (
    <>
      <header className={`fixed top-0 z-40 w-full transition-colors duration-300 ${bgClass}`}>
        <div className="container mx-auto flex h-24 items-center justify-between px-4">
          <Link href="/" className="flex items-center group h-full">
            <div id="nav-logo-target" style={{ opacity: 0 }} className="relative flex items-center justify-start gap-4 transition-all duration-200 group-hover:scale-[1.02] active:scale-95 h-full py-2">
              {settings?.logo ? (
                <div className="flex items-center gap-4 h-full">
                  <div className="h-full w-fit">
                    <SanityImage
                      image={{ ...settings.logo, crop: undefined, hotspot: undefined }}
                      width={600}
                      height={800}
                      fit="max"
                      className="h-full w-auto object-contain transition-all duration-300"
                      priority
                    />
                  </div>
                  {settings?.logoText && (
                    <div className="flex flex-col justify-center border-l border-foreground/20 pl-4 h-12">
                      <span className={`font-brand text-base md:text-lg font-bold tracking-tight leading-none transition-colors duration-300 ${
                        isHome && !scrolled && !menuOpen ? "text-white" : "text-foreground"
                      }`}>
                        {settings.logoText}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <span className={`font-brand font-bold text-lg tracking-tight leading-none transition-colors duration-300 ${
                  isHome && !scrolled && !menuOpen ? "text-white" : "text-foreground"
                }`}>
                  {settings?.siteName || "NUARK"}
                </span>
              )}
            </div>
          </Link>

          {/* Menü Açma Butonu */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setMenuOpen(true)}
              aria-label="Menüyü aç"
              className={`flex items-center gap-3 transition-colors duration-300 group cursor-pointer ${
                isHome && !scrolled ? "text-white hover:text-brand-accent" : "text-foreground hover:text-brand-accent p-2 md:p-0"
              }`}
            >
              <span className="hidden md:block font-brand font-bold uppercase tracking-widest text-xs group-hover:text-brand-accent transition-colors">Menü</span>
              <div className="p-2 border border-current rounded-none">
                <RiMenu3Line size={24} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Kayarak Gelen Tam Ekran / Panel Menü */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Arka Plan Karartma (Backdrop) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm cursor-pointer"
            />

            {/* Sidebar / Tam Ekran (Mobil İçin) Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.5, ease: [0.22, 1, 0.36, 1] }} // Smooth ease-out
              className="fixed top-0 right-0 z-50 h-[100dvh] w-full md:w-[450px] lg:w-[500px] bg-brand-black text-brand-off-white shadow-2xl flex flex-col pointer-events-auto overflow-hidden"
            >
              {/* Menü Kapatma Başlığı */}
              <div className="flex items-center justify-end h-24 px-4 shrink-0 border-b border-white/5">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 text-white/50 hover:text-brand-accent transition-colors duration-300 group cursor-pointer"
                >
                  <span className="hidden md:block font-bold uppercase tracking-widest text-xs group-hover:text-brand-accent transition-colors">Kapat</span>
                  <div className="p-2 border border-current rounded-none">
                    <RiCloseLine size={24} />
                  </div>
                </button>
              </div>

              {/* Linkler - İçerik */}
              <div className="flex-1 flex flex-col items-center md:items-start justify-center px-8 md:px-16 overflow-y-auto w-full py-8 select-none">
                <div className="flex flex-col items-center md:items-start space-y-8 md:space-y-6 w-full">
                  {links.map((item, i) => (
                    <motion.div 
                      key={i} 
                      className="flex flex-col items-center md:items-start w-full text-center md:text-left"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + (i * 0.05), duration: 0.4 }}
                    >
                      <Link
                        href={resolveHref(item)}
                        target={item.openInNewTab ? "_blank" : undefined}
                        onClick={() => setMenuOpen(false)}
                        className="text-4xl md:text-4xl font-brand font-bold hover:text-brand-accent transition-colors duration-300 relative group block"
                      >
                        {item.label}
                      </Link>
                      
                      {/* Sublinks */}
                      {item.subLinks && item.subLinks.length > 0 && (
                        <div className="flex flex-col items-center md:items-start space-y-3 mt-4 w-full">
                          {item.subLinks.map((sub, j) => (
                            <Link
                              key={j}
                              href={resolveHref(sub)}
                              target={sub.openInNewTab ? "_blank" : undefined}
                              onClick={() => setMenuOpen(false)}
                              className="text-base text-white/60 hover:text-brand-accent transition-colors uppercase tracking-widest font-brand font-medium"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                  
                  {/* Ekstra CTA / Aksiyon Butonu */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                    className="mt-8 md:mt-12 pt-8 w-full border-t border-white/10 flex justify-center md:justify-start"
                  >
                     <Link
                        href="/iletisim"
                        onClick={() => setMenuOpen(false)}
                        className="group inline-flex items-center gap-4 text-brand-accent text-sm font-bold uppercase tracking-widest"
                      >
                        <span>İletişime Geç</span>
                        <div className="p-3 border border-brand-accent rounded-none group-hover:bg-brand-accent group-hover:text-black transition-all duration-300">
                          <RiArrowRightLine size={18} />
                        </div>
                      </Link>
                  </motion.div>
                </div>
              </div>

              {/* Alt Bilgi (İletişim Paneli) - Sadece masaüstünde veya scroll yapıldığında */}
              <div className="shrink-0 bg-white/5 p-6 md:p-8 border-t border-white/10 md:pb-12 mt-auto">
                <div className="flex flex-col space-y-4">
                  {contact?.phone && (
                    <div className="flex items-center gap-4">
                      <RiPhoneLine className="shrink-0 text-brand-accent" size={20} />
                      <a href={`tel:${contact.phone}`} className="text-sm font-sans text-white/70 hover:text-brand-accent transition-colors font-medium">
                        {contact.phone}
                      </a>
                    </div>
                  )}
                  {contact?.email && (
                    <div className="flex items-center gap-4">
                      <RiMailLine className="shrink-0 text-brand-accent" size={20} />
                      <a href={`mailto:${contact.email}`} className="text-sm font-sans text-white/70 hover:text-brand-accent transition-colors font-medium break-all text-left">
                        {contact.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
