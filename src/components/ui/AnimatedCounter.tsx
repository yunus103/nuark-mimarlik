"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
}

export function AnimatedCounter({ value }: AnimatedCounterProps) {
  // Nokta veya virgül içeren rakam dizilerini bul (örn: 12.000)
  const match = value.match(/[0-9.,]+/);
  const matchedString = match ? match[0] : "";
  
  // Rakamı ayıkla (hesaplama için nokta ve virgülleri temizle)
  const targetNumber = matchedString ? parseInt(matchedString.replace(/[,.]/g, ""), 10) : 0;
  
  // Önek ve soneki düzgün ayırmak için stringi tespit edilen ifade bazında ikiye böl
  const parts = matchedString ? value.split(matchedString) : [value, ""];
  const prefix = parts[0] || "";
  const suffix = parts[1] || "";

  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: "some" });
  
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (isInView && targetNumber > 0) {
      const controls = animate(0, targetNumber, {
        duration: 2.0,
        ease: "easeOut",
        onUpdate(v) {
          // Sayıları Türkiye formatında noktalarla ayır (örn: 12.500)
          setDisplayValue(new Intl.NumberFormat("tr-TR").format(Math.floor(v)));
        }
      });
      return () => controls.stop();
    }
  }, [isInView, targetNumber]);

  if (targetNumber === 0 && !matchedString) {
    return <span ref={ref}>{value}</span>;
  }

  return (
    <span ref={ref} className="inline-block tabular-nums lining-nums">
      {prefix}
      {targetNumber === 0 ? value : displayValue}
      {suffix}
    </span>
  );
}
