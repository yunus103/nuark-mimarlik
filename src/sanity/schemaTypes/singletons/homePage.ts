import { defineField, defineType } from "sanity";

export const homePageType = defineType({
  name: "homePage",
  title: "Ana Sayfa",
  type: "document",
  groups: [
    { name: "hero", title: "Hero Bölümü" },
    { name: "stats", title: "İstatistikler" },
    { name: "about", title: "Hakkımızda Özeti" },
    { name: "projects", title: "Öne Çıkan Projeler" },
    { name: "services", title: "Hizmetler Özeti" },
    { name: "cta", title: "Eylem Çağrısı (CTA)" },
    { name: "clients", title: "Referans Markalar" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // Hero
    defineField({ name: "heroEyebrow", title: "Hero Üst Etiket", type: "string", group: "hero" }),
    defineField({ name: "heroTitle", title: "Hero Başlık", type: "string", validation: (Rule) => Rule.required(), group: "hero" }),
    defineField({ name: "heroSubtitle", title: "Hero Alt Başlık", type: "text", rows: 3, group: "hero" }),
    defineField({
      name: "heroImage",
      title: "Hero Görseli",
      type: "image",
      options: { hotspot: true },
      group: "hero",
      fields: [
        defineField({ name: "caption", title: "Küçük Bilgi Metni", type: "string" }),
        defineField({ name: "alt", title: "Alt Metni", type: "string", validation: (Rule) => Rule.required() }),
      ],
    }),
    defineField({ name: "heroPrimaryCtaLabel", title: "Birincil Buton Metni", type: "string", group: "hero" }),
    defineField({ name: "heroPrimaryCtaSlug", title: "Birincil Buton Linki", type: "string", group: "hero" }),
    defineField({ name: "heroSecondaryCtaLabel", title: "İkincil Buton Metni", type: "string", group: "hero" }),
    defineField({ name: "heroSecondaryCtaSlug", title: "İkincil Buton Linki", type: "string", group: "hero" }),

    // İstatistikler
    defineField({
      name: "stats",
      title: "İstatistikler",
      type: "array",
      group: "stats",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", title: "Değer", type: "string" },
            { name: "label", title: "Açıklama", type: "string" },
          ],
        },
      ],
      validation: (Rule) => Rule.max(4),
    }),

    // Seçkin Projeler
    defineField({ name: "featuredProjectsTitle", title: "Öne Çıkan Projeler Başlığı", type: "string", group: "projects" }),
    defineField({
      name: "featuredProjects",
      title: "Öne Çıkan Projeler",
      type: "array",
      group: "projects",
      of: [{ type: "reference", to: [{ type: "project" }] }],
      validation: (Rule) => Rule.max(3),
    }),

    // Hizmetler Özeti
    defineField({ name: "servicesSectionTitle", title: "Hizmetler Başlığı", type: "string", group: "services" }),
    defineField({ name: "servicesIntro", title: "Hizmetler Kısa Açıklaması", type: "text", rows: 2, group: "services" }),

    // Kısa Tanıtım
    defineField({ name: "aboutTitle", title: "Tanıtım Başlığı", type: "string", group: "about" }),
    defineField({ name: "aboutText", title: "Tanıtım Metni", type: "array", of: [{ type: "block" }], group: "about" }),
    defineField({
      name: "aboutImage",
      title: "Tanıtım Görseli",
      group: "about",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string" })],
    }),

    // CTA
    defineField({ name: "ctaTitle", title: "CTA Başlık", type: "string", group: "cta" }),
    defineField({ name: "ctaSubtitle", title: "CTA Alt Başlık", type: "string", group: "cta" }),

    // Referans Markalar (Marquee)
    defineField({
      name: "clientLogos",
      title: "Referans Markalar",
      type: "array",
      group: "clients",
      description: "Ana sayfada kayan bant olarak gösterilir.",
      of: [
        {
          type: "object",
          title: "Marka",
          preview: {
            select: { title: "companyName", media: "logo" },
          },
          fields: [
            defineField({
              name: "logo",
              title: "Logo",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
              fields: [
                defineField({ name: "alt", title: "Alt Metni", type: "string", validation: (Rule) => Rule.required() }),
              ],
            }),
            defineField({ name: "companyName", title: "Şirket / Marka Adı", type: "string", validation: (Rule) => Rule.required() }),
          ],
        },
      ],
    }),

    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
});
