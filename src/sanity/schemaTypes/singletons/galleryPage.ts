import { defineField, defineType } from "sanity";

export const galleryPageType = defineType({
  name: "galleryPage",
  title: "Galeri Sayfası",
  type: "document",
  groups: [
    { name: "hero", title: "Hero Bölümü" },
    { name: "gallery", title: "Galeri" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // ── Hero Bölümü ───────────────────────────────────────────────────────────
    defineField({
      name: "heroTitle",
      title: "Sayfa Ana Başlığı",
      type: "string",
      group: "hero",
      description: "Galeri sayfasının en üstünde yer alacak olan ana başlık (Örn: Galeri).",
      validation: (Rule) => Rule.required(),
      initialValue: "Galeri",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Sayfa Alt Başlığı",
      type: "text",
      rows: 2,
      group: "hero",
      description: "Başlığın altında yer alacak olan kısa tanıtım veya açıklama metni.",
    }),

    // ── Galeri ─────────────────────────────────────────────────────────────────
    defineField({
      name: "gallery",
      title: "Galeri Fotoğrafları",
      description: "Galeri sayfasında sergilenecek görseller. Sürükleyip bırakarak toplu yükleme yapabilir ve sıralayabilirsiniz.",
      type: "array",
      group: "gallery",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Görsel Açıklaması (Alt Metin)",
              type: "string",
              description: "SEO (Arama motoru optimizasyonu) ve ekran okuyucular için kısa açıklama.",
            }),
          ],
        },
      ],
      options: { layout: "grid" },
    }),

    // ── SEO ───────────────────────────────────────────────────────────────────
    defineField({
      name: "seo",
      title: "SEO Ayarları",
      type: "seo",
      group: "seo",
      description: "Galeri sayfasının arama motoru optimizasyonu (Meta başlık ve açıklama) ayarları.",
    }),
  ],
});
