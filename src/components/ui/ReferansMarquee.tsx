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
  logoScale?: number;
  logoFilter?: "default" | "detailed" | "grayscale" | "vivid-grayscale" | "original";
}

interface ReferansMarqueeProps {
  references: Reference[];
}

function getFilterClass(filter?: "default" | "detailed" | "grayscale" | "vivid-grayscale" | "original") {
  if (filter === "original") {
    return "object-contain transition-opacity duration-500 opacity-60 hover:opacity-100";
  }
  if (filter === "detailed") {
    return "object-contain transition-all duration-500 invert grayscale brightness-[1.5] contrast-[200%] opacity-60 hover:opacity-100";
  }
  if (filter === "grayscale") {
    return "object-contain transition-all duration-500 grayscale brightness-[1.2] contrast-[130%] opacity-70 hover:opacity-100";
  }
  if (filter === "vivid-grayscale") {
    return "object-contain transition-all duration-500 grayscale brightness-[1.6] contrast-[140%] opacity-80 hover:opacity-100";
  }
  // default / undefined
  return "object-contain transition-opacity duration-500 brightness-0 invert opacity-60 hover:opacity-100";
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
      <div className="flex w-max animate-marquee will-change-transform">
        {items.map((ref, i) => (
          <div
            key={i}
            className="flex-none flex flex-col items-center justify-center px-10 md:px-16 group"
          >
             {ref.clientLogo?.url ? (
              <div 
                className="relative w-24 h-12 md:w-32 md:h-16 flex items-center justify-center transition-transform duration-300"
                style={{ transform: `scale(${(ref.logoScale ?? 100) / 100})` }}
              >
                <Image
                  src={ref.clientLogo.url}
                  alt={ref.clientLogo.alt || ref.clientName}
                  fill
                  className={getFilterClass(ref.logoFilter)}
                  sizes="128px"
                />
              </div>
            ) : (
              <span className="text-white/40 font-serif font-bold text-lg md:text-xl group-hover:text-brand-accent transition-colors duration-300 whitespace-nowrap">
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
