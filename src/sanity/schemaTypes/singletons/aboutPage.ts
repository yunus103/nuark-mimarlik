import { defineField, defineType } from "sanity";

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "Hakkımızda",
  type: "document",
  fields: [
    // Hero
    defineField({ name: "heroHeadline", title: "Hero Başlık", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "heroSubtitle", title: "Hero Alt Başlık", type: "text", rows: 2 }),
    
    // Hikaye
    defineField({ name: "storyTitle", title: "Hikaye Başlık", type: "string" }),
    defineField({ name: "storyText", title: "Hikaye Metni", type: "array", of: [{ type: "block" }] }),
    defineField({
      name: "storyImage",
      title: "Hikaye Görseli",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string" })],
    }),

    // Değerlerimiz
    defineField({ name: "valuesTitle", title: "Değerlerimiz Başlık", type: "string" }),
    defineField({
      name: "values",
      title: "Değerlerimiz",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Başlık", type: "string" },
            { name: "description", title: "Açıklama", type: "text", rows: 3 }
          ]
        }
      ]
    }),

    // Ekibimiz
    defineField({ name: "teamTitle", title: "Ekibimiz Başlık", type: "string" }),
    defineField({
      name: "team",
      title: "Ekibimiz",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "İsim", type: "string" },
            { name: "title", title: "Unvan", type: "string" },
            { name: "bio", title: "Kısa Biyografi", type: "text", rows: 2 },
            { 
              name: "photo", 
              title: "Fotoğraf", 
              type: "image", 
              options: { hotspot: true },
              fields: [{ name: "alt", title: "Alt Metni", type: "string" }] 
            }
          ]
        }
      ]
    }),

    // Kilometre Taşları
    defineField({
      name: "milestones",
      title: "Kilometre Taşları (Opsiyonel)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "year", title: "Yıl", type: "string" },
            { name: "event", title: "Olay", type: "string" }
          ]
        }
      ]
    }),

    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});
