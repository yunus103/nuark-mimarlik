"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";
import { SanityImage } from "@/components/ui/SanityImage";

interface ImageStackSliderProps {
  images: any[];
}

export function ImageStackSlider({ images }: ImageStackSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!images || images.length === 0) return null;

  const total = images.length;
  const offset = isMobile ? 8 : 16;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleDragEnd = (event: any, info: any) => {
    const dragThreshold = 80;
    if (info.offset.x < -dragThreshold) {
      handleNext();
    } else if (info.offset.x > dragThreshold) {
      handlePrev();
    }
  };

  // If there's only one image, render it as a single static image without controls
  if (total === 1) {
    return (
      <div className="relative aspect-[4/5] w-full">
        <div className="absolute inset-0 overflow-hidden border border-border/40 bg-background shadow-lg">
          <SanityImage
            image={images[0]}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        {/* Brutalist Accent Offset Border */}
        <div className="absolute -bottom-6 -right-6 w-full h-full border border-brand-accent/30 -z-10 hidden md:block" />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Cards container with padding for stack offsets */}
      <div className="relative aspect-[4/5] w-full select-none pr-4 pb-4 md:pr-8 md:pb-8">
        {images.map((img, i) => {
          // Calculate stack position relative to activeIndex
          const pos = (i - activeIndex + total) % total;
          
          // Only render the top 3 cards in the stack for performance
          const isVisible = pos < 3;
          if (!isVisible) return null;

          // Compute motion values based on stack position
          const x = pos * offset;
          const y = pos * offset;
          const scale = 1 - pos * 0.04;
          // Apply a subtle rotation alternation for middle and back cards
          const rotate = pos === 0 ? 0 : pos === 1 ? 2.5 : -2;
          const opacity = pos === 0 ? 1 : pos === 1 ? 0.85 : 0.6;
          const zIndex = 30 - pos;

          return (
            <motion.div
              key={img._key || i}
              style={{ zIndex }}
              drag={pos === 0 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragEnd={handleDragEnd}
              animate={{
                x,
                y,
                scale,
                rotate,
                opacity,
              }}
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 28,
              }}
              className={`absolute inset-0 right-4 bottom-4 md:right-8 md:bottom-8 overflow-hidden border border-border/40 bg-card shadow-xl origin-bottom-right ${
                pos === 0 ? "cursor-grab active:cursor-grabbing" : ""
              }`}
            >
              <SanityImage
                image={img}
                fill
                className="pointer-events-none object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          );
        })}
      </div>

      {/* Minimal controls below the stack */}
      <div className="flex items-center justify-between mt-8 pr-4 md:pr-8">
        {/* Monospace/Brand styled counter */}
        <span className="font-brand font-medium tracking-widest text-sm text-muted-foreground">
          {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>

        {/* Action Arrows */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            className="p-3 border border-border/80 text-foreground hover:bg-brand-accent hover:border-brand-accent hover:text-white transition-all duration-300 rounded-none cursor-pointer focus:outline-none"
            aria-label="Önceki görsel"
          >
            <RiArrowLeftLine size={18} />
          </button>
          <button
            onClick={handleNext}
            className="p-3 border border-border/80 text-foreground hover:bg-brand-accent hover:border-brand-accent hover:text-white transition-all duration-300 rounded-none cursor-pointer focus:outline-none"
            aria-label="Sonraki görsel"
          >
            <RiArrowRightLine size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
