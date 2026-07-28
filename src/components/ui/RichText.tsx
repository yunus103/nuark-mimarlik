import { PortableText, PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { urlForImage, getImageLqip } from "@/sanity/lib/image";

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl md:text-4xl font-brand font-bold mt-12 mb-6 text-foreground tracking-tight leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-brand font-bold mt-10 mb-4 text-foreground tracking-tight leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-brand font-semibold mt-8 mb-3 text-foreground tracking-tight">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg md:text-xl font-brand font-semibold mt-6 mb-2 text-foreground">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-base md:text-lg leading-relaxed text-foreground/80 mb-6 font-sans">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-brand-accent bg-muted/30 pl-6 py-4 my-8 rounded-none italic text-foreground/90 font-serif text-lg md:text-xl">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-6 pl-2 text-base md:text-lg text-foreground/80 font-sans">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-6 pl-2 text-base md:text-lg text-foreground/80 font-sans">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const imageUrl = urlForImage(value)?.auto("format").url();
      const blurDataURL = getImageLqip(value);

      const sizeMap: Record<string, string> = {
        "25": "w-full md:w-1/4",
        "33": "w-full md:w-1/3",
        "50": "w-full md:w-1/2",
        "75": "w-full md:w-3/4",
        "100": "w-full",
        half: "w-full md:w-1/2",
        large: "w-full md:w-3/4",
        full: "w-full",
      };

      let containerClasses = "relative my-8 ";

      if (value.alignment === "left") {
        containerClasses += "md:float-left md:mr-8 mb-6 ";
      } else if (value.alignment === "right") {
        containerClasses += "md:float-right md:ml-8 mb-6 ";
      } else if (value.alignment === "center") {
        containerClasses += "mx-auto flex flex-col items-center ";
      } else {
        containerClasses += "w-full ";
      }

      containerClasses += sizeMap[value.size] || "w-full";

      return (
        <figure className={containerClasses.trim()}>
          <div className="overflow-hidden rounded-none border border-border shadow-sm">
            <Image
              src={imageUrl || ""}
              alt={value.alt || ""}
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
              placeholder={blurDataURL ? "blur" : "empty"}
              blurDataURL={blurDataURL}
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-xs md:text-sm text-center text-muted-foreground italic font-sans">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const href = value?.href || "#";
      const isInternal = href.startsWith("/") || href.startsWith("#");
      return isInternal ? (
        <Link href={href} className="text-brand-accent underline underline-offset-4 font-medium hover:opacity-80 transition-opacity">
          {children}
        </Link>
      ) : (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-brand-accent underline underline-offset-4 font-medium hover:opacity-80 transition-opacity">
          {children}
        </a>
      );
    },
  },
};

export function RichText({ value, className = "" }: { value: any[]; className?: string }) {
  if (!value) return null;
  return (
    <div className={`prose-container max-w-none break-words flow-root ${className}`}>
      <PortableText value={value} components={components} />
    </div>
  );
}
