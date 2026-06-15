import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { allSlugsForSitemapQuery } from "@/sanity/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL!;
  const data = await client.fetch(allSlugsForSitemapQuery);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/hakkimizda`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/hizmetlerimiz`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/referanslar`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/galeri`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/iletisim`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/projeler`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  ];

  const dynamicRoutes: MetadataRoute.Sitemap = [
    ...(data?.projects?.map((p: any) => ({
      url: `${base}/projeler/${p.slug}`,
      lastModified: new Date(p._updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })) || []),
  ];

  return [...staticRoutes, ...dynamicRoutes];
}
