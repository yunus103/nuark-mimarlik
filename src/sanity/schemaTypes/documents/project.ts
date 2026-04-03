import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Proje",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Proje Adı", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (Rule) => Rule.required() }),

    defineField({ name: "category", title: "Kategori", type: "string", options: { list: ["Konut", "Ticari", "Ofis", "Karma Kullanım", "Kentsel Dönüşüm", "Kültür & Sanat", "Eğitim", "Sağlık", "Endüstriyel"] } }),
    defineField({ name: "city", title: "Şehir", type: "string" }),
    defineField({ name: "location", title: "Konum / Adres", type: "string" }),
    defineField({ name: "year", title: "Yıl", type: "string" }),

    defineField({
      name: "coverImage",
      title: "Kapak Görseli",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string", validation: (Rule) => Rule.required() })],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Proje Açıklaması",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt Metni", type: "string", validation: (Rule) => Rule.required() }),
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
              options: { list: [{ title: "Çok Küçük (%25)", value: "25" }, { title: "Küçük (%33)", value: "33" }, { title: "Orta (%50)", value: "50" }, { title: "Geniş (%75)", value: "75" }, { title: "Tam Genişlik (%100)", value: "100" }] },
              initialValue: "100",
            }),
          ],
        },
      ],
    }),

    defineField({
      name: "gallery",
      title: "Fotoğraf Galerisi",
      type: "array",
      of: [{ type: "image", options: { hotspot: true }, fields: [{ name: "alt", title: "Alt Metni", type: "string" }] }],
      options: { layout: "grid" },
    }),

    defineField({ name: "featured", title: "Öne Çıkarılsın mı?", type: "boolean", initialValue: false }),
    defineField({ name: "order", title: "Sıralama", type: "number" }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  orderings: [
    { title: "Sıralama", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
    { title: "Yıl (Yeniden Eskiye)", name: "yearDesc", by: [{ field: "year", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "city", media: "coverImage" },
  },
});
