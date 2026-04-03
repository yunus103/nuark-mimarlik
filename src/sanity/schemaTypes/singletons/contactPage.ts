import { defineField, defineType } from "sanity";

export const contactPageType = defineType({
  name: "contactPage",
  title: "İletişim Sayfası",
  type: "document",
  fields: [
    // Header
    defineField({ name: "heroHeadline", title: "Hero Başlık", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "heroSubtitle", title: "Hero Alt Başlık", type: "text", rows: 3 }),

    // Bilgiler
    defineField({ name: "address", title: "Adres", type: "text", rows: 3 }),
    defineField({ name: "phone", title: "Telefon", type: "string" }),
    defineField({ name: "email", title: "E-posta", type: "string" }),
    defineField({ name: "workingHours", title: "Çalışma Saatleri", type: "string" }),
    defineField({ name: "whatsappNumber", title: "WhatsApp Numarası", type: "string", description: "Başında artı işareti ve ülke koduyla, boşluksuz giriniz. Örn: +905551234567" }),

    // Form
    defineField({ name: "formTitle", title: "Form Başlığı", type: "string", initialValue: "Bize Ulaşın" }),
    defineField({
      name: "projectTypes",
      title: "Proje Tipleri",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" }
    }),
    defineField({
      name: "successMessage",
      title: "Form Başarı Mesajı",
      type: "text",
      rows: 2,
      initialValue: "Mesajınız alındı. En kısa sürede size dönüş yapacağız.",
    }),
    defineField({ name: "recipientEmail", title: "Bildirim E-postası", type: "string", description: "Form verilerinin gönderileceği e-posta adresi." }),

    // Harita
    defineField({ name: "mapEmbedUrl", title: "Harita iFrame URL", type: "text", rows: 4, description: "Google Maps üzerinden alınan iframe HTML kodunu yapıştırın." }),

    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});
