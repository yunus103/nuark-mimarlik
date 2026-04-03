import { defineField, defineType } from "sanity";

export const testimonialType = defineType({
  name: "testimonial",
  title: "Referans",
  type: "document",
  fields: [
    defineField({ name: "clientName", title: "Müşteri / Kurum Adı", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "sector", title: "Sektör", type: "string" }),
    defineField({
      name: "clientLogo",
      title: "Müşteri Logosu",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string", validation: (Rule) => Rule.required() })],
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "quote", title: "Alıntı / Yorum", type: "text", rows: 4 }),
    defineField({ name: "quotePerson", title: "Alıntı Sahibi (Ad Soyad, Unvan)", type: "string" }),
  ],
  preview: {
    select: {
      title: "clientName",
      subtitle: "sector",
      media: "clientLogo",
    },
  },
});
