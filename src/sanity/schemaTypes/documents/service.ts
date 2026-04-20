import { defineField, defineType } from "sanity";

export const serviceType = defineType({
  name: "service",
  title: "Hizmet",
  type: "document",
  fields: [
    defineField({ 
      name: "title", 
      title: "Başlık", 
      type: "string", 
      description: "Hizmetin tam adı (Örn: Mimari Tasarım)",
      validation: (Rule) => Rule.required() 
    }),
    defineField({ 
      name: "slug", 
      title: "Slug", 
      type: "slug", 
      description: "URL adresi için benzersiz kimlik (Opsiyonel)",
      options: { source: "title" }, 
    }),
    defineField({
      name: "order",
      title: "Sıralama",
      type: "number",
      description: "Hizmetlerin listedeki sırası (Küçük sayı üstte görünür)",
      initialValue: 0,
    }),
    defineField({
      name: "mainImage",
      title: "Ana Görsel",
      type: "image",
      description: "Hizmetler sayfasında görünecek dikey veya kare görsel",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string" })],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Kısa Özet (Ana Sayfa)",
      type: "text",
      rows: 2,
      description: "Ana sayfadaki 4'lü gridde görünecek çok kısa açıklama",
    }),
    defineField({
      name: "description",
      title: "Açıklama (Hizmetler Sayfası)",
      type: "array",
      of: [{ type: "block" }],
      description: "Hizmetler sayfasında görselin yanında görünecek detaylı metin",
    }),
    defineField({
      name: "features",
      title: "Öne Çıkan Özellikler / Maddeler",
      type: "array",
      of: [{ type: "string" }],
      description: "Hizmetin altına madde madde eklenecek özellikler",
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),

  ],
});
