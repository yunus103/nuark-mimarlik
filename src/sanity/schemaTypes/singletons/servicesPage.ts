import { defineField, defineType } from "sanity";

export const servicesPageType = defineType({
  name: "servicesPage",
  title: "Hizmetlerimiz",
  type: "document",
  fields: [
    defineField({
      name: "heroTitle",
      title: "Hero Başlık",
      type: "string",
      description: "Hizmetlerimiz sayfası en üstündeki ana başlık",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Alt Başlık",
      type: "text",
      rows: 2,
      description: "Başlığın altındaki kısa açıklama metni",
    }),
    defineField({
      name: "ctaTitle",
      title: "CTA Başlığı",
      type: "string",
      description: "Sayfanın en altındaki 'Eylem Çağrısı' başlığı",
    }),
    defineField({
      name: "ctaDescription",
      title: "CTA Açıklaması",
      type: "text",
      rows: 2,
      description: "CTA başlığının altındaki açıklama metni",
    }),
    defineField({
      name: "ctaButtonLabel",
      title: "CTA Buton Yazısı",
      type: "string",
      description: "CTA butonunun içindeki metin (Örn: Bizimle İletişime Geçin)",
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});
