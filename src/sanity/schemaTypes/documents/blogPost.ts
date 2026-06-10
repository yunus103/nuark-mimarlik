import { defineField, defineType } from "sanity";

export const blogPostType = defineType({
  name: "blogPost",
  title: "Blog Yazısı",
  type: "document",
  fields: [
    defineField({ 
      name: "title", 
      title: "Yazı Başlığı", 
      type: "string", 
      validation: (Rule) => Rule.required(),
      description: "Blog yazısının ana başlığı."
    }),
    defineField({ 
      name: "slug", 
      title: "Slug", 
      type: "slug", 
      options: { source: "title" }, 
      validation: (Rule) => Rule.required(),
      description: "Yazı için benzersiz URL adresi."
    }),
    defineField({ 
      name: "publishedAt", 
      title: "Yayınlanma Tarihi", 
      type: "datetime", 
      initialValue: () => new Date().toISOString(),
      description: "Yazının sitede hangi tarihte yayınlandığını belirtir. İleri bir tarih seçilirse o tarihte yayına girer."
    }),
    defineField({
      name: "mainImage",
      title: "Kapak Görseli",
      type: "image",
      options: { hotspot: true },
      description: "Blog yazısının kapak fotoğrafı. Önerilen oran: 16:9.",
      fields: [
        defineField({ 
          name: "alt", 
          title: "Görsel Açıklaması (Alt Metin)", 
          type: "string", 
          validation: (Rule) => Rule.required() 
        })
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Kısa Özet",
      type: "text",
      rows: 3,
      description: "Liste sayfalarında görünen kısa metin. Maksimum 200 karakter.",
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "body",
      title: "Yazı İçeriği",
      type: "array",
      description: "Blog yazısının tam metni ve içerik görselleri.",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Görsel Açıklaması (Alt Metin)", type: "string", validation: (Rule) => Rule.required() }),
            defineField({
              name: "alignment",
              title: "Hizalama",
              type: "string",
              options: { list: [{ title: "Sol", value: "left" }, { title: "Orta", value: "center" }, { title: "Sağ", value: "right" }, { title: "Tam Genişlik", value: "full" }] },
              initialValue: "center",
            }),
            defineField({
              name: "size",
              title: "Boyut",
              type: "string",
              options: { 
                list: [
                  { title: "Çok Küçük (%25)", value: "25" },
                  { title: "Küçük (%33)", value: "33" },
                  { title: "Orta (%50)", value: "50" },
                  { title: "Geniş (%75)", value: "75" },
                  { title: "Tam Genişlik (%100)", value: "100" }
                ] 
              },
              initialValue: "100",
            }),
          ],
        },
      ],
    }),
    defineField({ name: "seo", title: "Blog Yazısı SEO Ayarları", type: "seo" }),
  ],
  orderings: [{ title: "Yayın Tarihi (Yeni→Eski)", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
});
