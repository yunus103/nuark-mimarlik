"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { RiCloseLine, RiArrowLeftLine, RiArrowRightLine, RiFullscreenLine } from "react-icons/ri";

interface LightboxImage {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

interface ProjectLightboxProps {
  images: LightboxImage[];
}

export function ProjectLightbox({ images }: ProjectLightboxProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const open = (index: number) => setActiveIndex(index);
  const close = () => setActiveIndex(null);

  const prev = useCallback(() => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex - 1 + images.length) % images.length);
  }, [activeIndex, images.length]);

  const next = useCallback(() => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % images.length);
  }, [activeIndex, images.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [activeIndex, prev, next]);

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => open(i)}
            className="group relative overflow-hidden bg-brand-black focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
            aria-label={`Galeri görseli ${i + 1}: ${img.alt || ""}`}
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={img.url}
                alt={img.alt || `Proje görseli ${i + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-all duration-700 group-hover:scale-105"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-brand-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <RiFullscreenLine className="text-white text-3xl drop-shadow-lg" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Overlay */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Proje galeri görünümü"
        >
          {/* Close Button */}
          <button
            onClick={close}
            className="absolute top-4 right-4 z-10 text-white/80 hover:text-white p-3 hover:bg-white/10 transition-colors duration-200 rounded-none"
            aria-label="Kapat"
          >
            <RiCloseLine className="text-3xl" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/70 font-sans text-xs tracking-widest uppercase z-10">
            {activeIndex + 1} / {images.length}
          </div>

          {/* Prev Button */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 z-10 text-white/80 hover:text-white p-3 hover:bg-white/10 transition-colors duration-200 rounded-none"
              aria-label="Önceki görsel"
            >
              <RiArrowLeftLine className="text-3xl" />
            </button>
          )}

          {/* Main Image */}
          <div
            className="relative max-w-[90vw] max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[activeIndex].url}
              alt={images[activeIndex].alt || `Görsel ${activeIndex + 1}`}
              width={1920}
              height={1080}
              className="object-contain max-h-[85vh] w-auto max-w-full"
              priority
            />
          </div>

          {/* Next Button */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 z-10 text-white/80 hover:text-white p-3 hover:bg-white/10 transition-colors duration-200 rounded-none"
              aria-label="Sonraki görsel"
            >
              <RiArrowRightLine className="text-3xl" />
            </button>
          )}

          {/* Alt text */}
          {images[activeIndex].alt && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 font-sans text-xs tracking-wider text-center max-w-md px-4">
              {images[activeIndex].alt}
            </div>
          )}
        </div>
      )}
    </>
  );
}
