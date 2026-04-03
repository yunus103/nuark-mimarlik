"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SanityImage } from "@/components/ui/SanityImage";
import { Button } from "@/components/ui/button";
import { RiMenu3Line, RiCloseLine, RiArrowDownSLine } from "react-icons/ri";

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ana sayfada ve en üstte isek şeffaf, değilse bulanık/beyaz(veya koyu) arka plan
  const bgClass = (isHome && !scrolled && !menuOpen)
    ? "bg-transparent border-transparent"
    : "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b";

  return (
    <header className={`fixed top-0 z-40 w-full transition-colors duration-300 ${bgClass}`}>
      <div className="container mx-auto flex h-24 items-center justify-between px-4">
        <Link href="/" className="flex items-center group h-full">
          <div className="relative flex items-center justify-start gap-4 transition-all duration-200 group-hover:scale-[1.02] active:scale-95 h-full py-2">
            {settings?.logo ? (
              <div className="flex items-center gap-4 h-full">
                <div className="h-full w-auto max-w-[120px] md:max-w-[150px]">
                  <SanityImage
                    image={settings.logo}
                    width={400}
                    height={600}
                    fit="max"
                    className="h-full w-auto object-contain object-left transition-all duration-300"
                    priority
                  />
                </div>
                {settings?.logoText && (
                  <div className="flex flex-col justify-center border-l border-foreground/20 pl-4 h-12">
                    <span className={`font-serif text-lg md:text-xl font-bold tracking-tight leading-none transition-colors duration-300 ${
                      isHome && !scrolled && !menuOpen ? "text-white" : "text-foreground"
                    }`}>
                      {settings.logoText}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <span className={`font-bold text-xl tracking-tight leading-none transition-colors duration-300 ${
                isHome && !scrolled && !menuOpen ? "text-white" : "text-foreground"
              }`}>
                {settings?.siteName || "NUARK"}
              </span>
            )}
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 xl:gap-8">
          {links.map((item, i) => (
            <DesktopNavItem key={i} item={item} isHomeTop={isHome && !scrolled} />
          ))}
          <div className="flex items-center gap-4 ml-4">
            <Link href="/iletisim">
              <Button 
                variant="outline" 
                className={`rounded-none border-2 font-bold px-8 transition-all duration-300 hover:bg-brand-gold hover:text-black hover:border-brand-gold cursor-pointer ${
                  isHome && !scrolled && !menuOpen 
                    ? "text-brand-gold border-brand-gold bg-black/20" 
                    : "text-foreground border-brand-gold"
                }`}
              >
                İletişime Geç
              </Button>
            </Link>
          </div>
        </nav>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMenuOpen(!menuOpen)} 
            aria-label="Menüyü aç/kapat"
            className={isHome && !scrolled && !menuOpen ? "text-white" : "text-foreground"}
          >
            {menuOpen ? <RiCloseLine size={24} /> : <RiMenu3Line size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t md:hidden overflow-hidden"
          >
            <nav className="container mx-auto flex flex-col gap-2 px-4 py-6">
              {links.map((item, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <Link
                      href={resolveHref(item)}
                      onClick={() => !item.subLinks && setMenuOpen(false)}
                      className="text-base font-medium py-2 transition-colors hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  </div>
                  {item.subLinks && (
                    <div className="flex flex-col gap-1 pl-4 border-l ml-1 mt-1">
                      {item.subLinks.map((sub, j) => (
                        <Link
                          key={j}
                          href={resolveHref(sub)}
                          onClick={() => setMenuOpen(false)}
                          className="text-sm font-medium py-2 text-muted-foreground hover:text-primary transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function DesktopNavItem({ item, isHomeTop }: { item: NavItem, isHomeTop?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  const textClass = isHomeTop ? "text-white/90 hover:text-white" : "text-foreground/80 hover:text-foreground";

  if (!item.subLinks || item.subLinks.length === 0) {
    return (
      <Link
        href={resolveHref(item)}
        target={item.openInNewTab ? "_blank" : undefined}
        rel={item.openInNewTab ? "noopener noreferrer" : undefined}
        className={`text-sm font-medium tracking-wide uppercase transition-colors ${textClass}`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href={resolveHref(item)}
        className={`flex items-center gap-1 text-sm font-medium tracking-wide uppercase transition-colors ${textClass}`}
      >
        {item.label}
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <RiArrowDownSLine size={16} />
        </motion.span>
      </Link>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-full pt-4 min-w-[200px]"
          >
            <div className="bg-popover border rounded-xl shadow-xl p-2 overflow-hidden">
              {item.subLinks.map((sub, j) => (
                <Link
                  key={j}
                  href={resolveHref(sub)}
                  target={sub.openInNewTab ? "_blank" : undefined}
                  rel={sub.openInNewTab ? "noopener noreferrer" : undefined}
                  className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-muted transition-colors"
                >
                  {sub.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
