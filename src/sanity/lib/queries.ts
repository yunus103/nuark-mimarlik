import { groq } from "next-sanity";

// ─── Layout ────────────────────────────────────────────────────────────────────
// Her sayfada bir kez çekilir — header, footer, global ayarlar
export const layoutQuery = groq`{
  "settings": *[_type == "siteSettings"][0] {
    siteName, siteTagline,
    logo { asset->{ _id, url, metadata { lqip, dimensions } }, hotspot, crop },
    logoText,
    logoHeight,
    contactInfo { phone, email, address, whatsappNumber, showWhatsappButton, mapIframe },
    socialLinks[] { platform, url },
    gaId, gtmId, googleSearchConsole
  },
  "navigation": *[_type == "navigation"][0] {
    headerLinks[] { label, linkType, internalSlug, externalUrl, openInNewTab, subLinks[] { label, linkType, internalSlug, externalUrl, openInNewTab } },
    footerLinks[] { label, linkType, internalSlug, externalUrl, openInNewTab, subLinks[] { label, linkType, internalSlug, externalUrl, openInNewTab } }
  }
}`;

// ─── Sayfalar ──────────────────────────────────────────────────────────────────

export const homePageQuery = groq`*[_type == "homePage"][0] {
  heroEyebrow, heroTitle, heroSubtitle, heroPrimaryCtaLabel, heroPrimaryCtaSlug, heroSecondaryCtaLabel, heroSecondaryCtaSlug,
  heroImage { asset->{ _id, url, metadata { lqip, dimensions } }, caption, alt, hotspot, crop },
  stats[] { value, label },
  featuredProjectsTitle,
  "featuredProjects": select(
    defined(featuredProjects) && count(featuredProjects) > 0 => featuredProjects[]->{
      title, slug, category, year, city,
      coverImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop }
    },
    *[_type == "project"] | order(order asc, _createdAt desc) [0..5] {
      title, slug, category, year, city,
      coverImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop }
    }
  ),
  servicesSectionTitle, servicesIntro, servicesEyebrow, servicesCtaLabel,
  aboutTitle, aboutText, aboutCtaLabel,
  aboutImages[] { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop },
  ctaTitle, ctaSubtitle, ctaButtonLabel,
  clientLogos[] {
    companyName,
    logoScale,
    logoFilter,
    logo { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop }
  },
  "services": *[_type == "service"] | order(order asc, _createdAt asc) {
    title, summary, order
  },
  "latestPosts": *[_type == "blogPost"] | order(publishedAt desc)[0..2] {
    title, slug, excerpt, publishedAt,
    mainImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop }
  },
  seo
}`;

export const aboutPageQuery = groq`*[_type == "aboutPage"][0] {
  heroHeadline, heroSubtitle,
  stats[] { value, label },
  storyEyebrow, storyTitle, storyText,
  storyImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop },
  valuesEyebrow, valuesTitle,
  values[] { title, description },
  teamEyebrow, teamTitle,
  team[] {
    name, title, bio,
    photo { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop }
  },
  ctaEyebrow, ctaTitle, ctaDescription, ctaButtonLabel,
  seo
}`;

export const servicesPageQuery = groq`{
  "page": *[_type == "servicesPage"][0] {
    heroTitle, heroSubtitle,
    ctaTitle, ctaDescription, ctaButtonLabel,
    seo
  },
  "services": *[_type == "service"] | order(order asc, _createdAt asc) {
    title, summary, description, features,
    mainImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop }
  }
}`;

export const contactPageQuery = groq`{
  "page": *[_type == "contactPage"][0] {
    heroHeadline, heroSubtitle,
    formTitle, projectTypes, successMessage,
    seo
  },
  "settings": *[_type == "siteSettings"][0] {
    contactInfo { phone, email, address, whatsappNumber, showWhatsappButton, mapIframe },
    socialLinks[] { platform, url }
  }
}`;

export const referanslarPageQuery = groq`{
  "page": *[_type == "referanslarPage"][0] {
    heroHeadline, heroSubtitle, heroEyebrow,
    sectionTitle, sectionSubtitle, sectionEyebrow,
    clients[] {
      companyName, sector, url, forceGrayscale,
      logo { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop }
    },
    metrics[] { icon, title, desc },
    ctaTitle, ctaDescription, ctaEyebrow, ctaButtonLabel,
    seo
  },
  "fallbackClients": *[_type == "homePage"][0].clientLogos[] {
    companyName,
    logo { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop }
  }
}`;

// ─── Blog ──────────────────────────────────────────────────────────────────────

export const blogListQuery = groq`*[_type == "blogPost"] | order(publishedAt desc) {
  title, slug, excerpt, publishedAt,
  mainImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop }
}`;

export const blogPostBySlugQuery = groq`*[_type == "blogPost" && slug.current == $slug][0] {
  title, slug, publishedAt, excerpt,
  mainImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop },
  body[] {
    ...,
    _type == "image" => {
      asset->{ _id, url, metadata { lqip, dimensions } },
      alt, alignment, size, hotspot, crop, caption
    }
  },
  seo
}`;

// ─── Hizmetler ─────────────────────────────────────────────────────────────────

export const serviceListQuery = groq`*[_type == "service"] | order(order asc, _createdAt asc) {
  title, slug,
  mainImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop },
  description[] {
    ...,
    _type == "image" => { asset->{ _id, url, metadata { lqip, dimensions } }, alt, alignment, size, hotspot, crop }
  },
  features
}`;

export const serviceBySlugQuery = groq`*[_type == "service" && slug.current == $slug][0] {
  title, slug,
  mainImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop },
  description[] {
    ...,
    _type == "image" => { asset->{ _id, url, metadata { lqip, dimensions } }, alt, alignment, size, hotspot, crop }
  },
  features,
  seo
}`;


// ─── Projeler ──────────────────────────────────────────────────────────────────

export const projectsPageQuery = groq`*[_type == "projectsPage"][0] {
  heroEyebrow, heroTitle, heroSubtitle, seo
}`;

export const projectListQuery = groq`*[_type == "project"] | order(order asc, _createdAt desc) {
  title, slug, category, city, year,
  coverImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop }
}`;

export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0] {
  title, slug, category, city, location, year, client, area,
  coverImage { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop },
  description[] {
    ...,
    _type == "image" => { asset->{ _id, url, metadata { lqip, dimensions } }, alt, alignment, size, hotspot, crop }
  },
  gallery[] { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop },
  galleryRender[] { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop },
  galleryConstruction[] { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop },
  seo
}`;

// ─── Sitemap ───────────────────────────────────────────────────────────────────

export const allSlugsForSitemapQuery = groq`{
  "projects": *[_type == "project" && defined(slug.current)] { "slug": slug.current, _updatedAt },
  "blogs": *[_type == "blogPost" && defined(slug.current)] { "slug": slug.current, _updatedAt }
}`;

// ─── Galeri ────────────────────────────────────────────────────────────────────

export const galleryPageQuery = groq`*[_type == "galleryPage"][0] {
  heroTitle, heroSubtitle,
  gallery[] { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop },
  seo
}`;

// ─── Varsayılan SEO ────────────────────────────────────────────────────────────

export const defaultSeoQuery = groq`*[_type == "siteSettings"][0] {
  "title": defaultSeo.metaTitle,
  "description": defaultSeo.metaDescription,
  "ogImage": defaultOgImage { asset->{ _id, url, metadata { lqip, dimensions } }, hotspot, crop },
  siteName,
  siteTagline,
  favicon { asset->{ url } },
  googleSearchConsole
}`;

export const qrPageQuery = groq`*[_type == "siteSettings"][0] {
  siteName,
  logo { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop },
  qrTitle,
  qrSubtitle,
  qrLogo { asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop },
  qrLinks[] { platform, label, url }
}`;
