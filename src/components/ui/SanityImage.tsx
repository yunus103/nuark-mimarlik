import Image from "next/image";
import { urlForImage, getImageLqip } from "@/sanity/lib/image";

type SanityImageProps = {
  image: {
    asset: any;
    alt: string;
    hotspot?: { x: number; y: number };
    crop?: { top: number; bottom: number; left: number; right: number };
  };
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  className?: string;
  priority?: boolean;
  fit?: "crop" | "fill" | "fillmax" | "max" | "scale" | "min";
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
};

export function SanityImage({
  image,
  width = 800,
  height = 600,
  fill = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  className,
  priority = false,
  fit = "crop",
  objectFit,
}: SanityImageProps) {
  if (!image?.asset) return null;

  // 1. Sanity URL Builder hazırlığı
  let builder = urlForImage(image)?.auto("format");

  // Eğer fill ise ve fit "max" ise (örn. lightbox), en-boy oranını bozmadan 1600px sınırıyla optimize et
  if (fill && fit === "max" && builder) {
    builder = builder.width(1600).height(1600).fit("max");
  } else if (!fill && builder) {
    // Eğer fill değilse, CDN tarafında görseli tam istediğimiz boyuta çekiyoruz
    builder = builder.width(width).height(height).fit(fit);
  }

  const imageUrl = builder?.url();
  const blurDataURL = getImageLqip(image);

  // 2. Hotspot (Odak Noktası) hesaplama
  const objectPosition = image.hotspot
    ? `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%`
    : "center";

  if (!imageUrl) return null;

  return (
    <Image
      src={imageUrl}
      alt={image.alt || ""}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      sizes={sizes}
      className={className}
      priority={priority}
      style={{ 
        objectPosition,
        objectFit: objectFit || (fill ? "cover" : undefined) 
      }}
      placeholder={blurDataURL ? "blur" : "empty"}
      blurDataURL={blurDataURL}
    />
  );
}
