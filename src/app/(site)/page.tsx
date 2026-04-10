import { Metadata } from "next";
import { draftMode } from "next/headers";
import { getClient } from "@/sanity/lib/client";
import { homePageQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { buildMetadata } from "@/lib/seo";

import { HeroSection } from "@/components/home/HeroSection";
import { MarqueeSection } from "@/components/home/MarqueeSection";
import { AboutSection } from "@/components/home/AboutSection";
import { FeaturedProjectsSection } from "@/components/home/FeaturedProjectsSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { CtaSection } from "@/components/home/CtaSection";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getClient().fetch(homePageQuery, {}, { next: { tags: ["home"] } });
  return buildMetadata({
    title: data?.seo?.metaTitle || data?.heroTitle || "Ana Sayfa",
    description: data?.seo?.metaDescription || data?.heroSubtitle,
    canonicalPath: "/",
    pageSeo: data?.seo,
  });
}

export default async function HomePage() {
  const isDraft = (await draftMode()).isEnabled;
  const data = await getClient(isDraft).fetch(
    homePageQuery,
    {},
    { next: { tags: ["home"] } }
  );

  // Build marquee refs from homePage.clientLogos
  const marqueeRefs = (data?.clientLogos || []).map((item: any) => ({
    clientName: item.companyName,
    clientLogo: item.logo?.asset
      ? { url: urlForImage(item.logo)?.auto("format").width(256).url() || "", alt: item.logo.alt }
      : undefined,
  })).filter((r: any) => r.clientName);

  return (
    <>
      <HeroSection data={data} />
      <MarqueeSection marqueeRefs={marqueeRefs} />
      <AboutSection data={data} />
      <FeaturedProjectsSection data={data} />
      <ServicesSection data={data} />
      <CtaSection data={data} />
    </>
  );
}
