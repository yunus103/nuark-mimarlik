"use client";
import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export function Floaters({ whatsappNumber }: { whatsappNumber?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const cleanNumber = whatsappNumber ? whatsappNumber.replace(/\D/g, "") : "";

  return (
    <>
      {/* Scroll Progress Bar - İnce Altın Sarısı Çizgi */}
      <motion.div
        className="fixed top-0 right-0 w-[3px] bg-brand-gold z-50 origin-top"
        style={{ scaleY, height: "100vh" }}
      />

      {/* WhatsApp Butonu */}
      {cleanNumber && (
        <motion.a
          href={`https://wa.me/${cleanNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp ile iletişime geç"
          className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-none bg-brand-black border border-brand-gold text-brand-gold shadow-lg hover:bg-brand-gold hover:text-black transition-colors duration-300"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: "spring" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaWhatsapp size={28} className="relative z-10" />
        </motion.a>
      )}
    </>
  );
}
