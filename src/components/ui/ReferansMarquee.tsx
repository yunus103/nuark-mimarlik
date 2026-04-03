"use client";

import { useRef } from "react";
import Image from "next/image";

interface Reference {
  clientName: string;
  sector?: string;
  clientLogo?: {
    url: string;
    alt?: string;
  };
}

interface ReferansMarqueeProps {
  references: Reference[];
}

export function ReferansMarquee({ references }: ReferansMarqueeProps) {
  if (!references || references.length === 0) return null;

  // Duplicate items for seamless infinite scroll
  const items = [...references, ...references, ...references];

  return (
    <div className="relative overflow-hidden">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 z-10 bg-gradient-to-r from-brand-black to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 z-10 bg-gradient-to-l from-brand-black to-transparent pointer-events-none" />

      {/* Marquee track */}
      <div className="flex animate-marquee will-change-transform">
        {items.map((ref, i) => (
          <div
            key={i}
            className="flex-none flex flex-col items-center justify-center px-10 md:px-16 group"
          >
            {ref.clientLogo?.url ? (
              <div className="relative w-24 h-12 md:w-32 md:h-16 flex items-center justify-center">
                <Image
                  src={ref.clientLogo.url}
                  alt={ref.clientLogo.alt || ref.clientName}
                  fill
                  className="object-contain transition-opacity duration-500 brightness-0 invert opacity-60 hover:opacity-100"
                  sizes="128px"
                />
              </div>
            ) : (
              <span className="text-white/40 font-serif font-bold text-lg md:text-xl group-hover:text-brand-gold transition-colors duration-300 whitespace-nowrap">
                {ref.clientName}
              </span>
            )}
            {ref.sector && (
              <span className="text-white/25 font-sans text-[10px] tracking-widest uppercase mt-2 group-hover:text-white/60 transition-colors duration-300">
                {ref.sector}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
