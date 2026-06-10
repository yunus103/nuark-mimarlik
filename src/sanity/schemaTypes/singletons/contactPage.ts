import { defineField, defineType } from "sanity";

export const contactPageType = defineType({
  name: "contactPage",
  title: "İletişim Sayfası",
  type: "document",
  fields: [
    // Header
    defineField({ name: "heroHeadline", title: "Hero Başlık", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "heroSubtitle", title: "Hero Alt Başlık", type: "text", rows: 3 }),

    // Basit Bilgiler
    defineField({ 
      name: "workingHours", 
      title: "Çalışma Saatleri", 
      type: "string",
      description: "Örn: Pazartesi - Cumartesi: 09:00 - 18:00 (Pazar: Kapalı)"
    }),

    // Form Ayarları
    defineField({ 
      name: "formTitle", 
      title: "Form Başlığı", 
      type: "string", 
      initialValue: "Bize Ulaşın",
      description: "İletişim formunun üzerindeki başlık."
    }),
    defineField({
      name: "projectTypes",
      title: "Proje Tipleri",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "Müşterinin formda seçebileceği proje kategorileri (Örn: Konut, Ofis, Restoran)."
    }),
    defineField({
      name: "successMessage",
      title: "Form Başarı Mesajı",
      type: "text",
      rows: 2,
      initialValue: "Mesajınız alındı. En kısa sürede size dönüş yapacağız.",
      description: "Form başarıyla gönderildiğinde kullanıcıya gösterilecek teşekkür mesajı."
    }),
    defineField({ 
      name: "recipientEmail", 
      title: "Bildirim E-postası", 
      type: "string", 
      description: "Form verilerinin (müşteri taleplerinin) gönderileceği ana e-posta adresi." 
    }),

    defineField({ 
      name: "seo", 
      title: "Sayfa SEO Ayarları", 
      type: "seo",
      description: "Bu sayfa için özel arama motoru ayarları. Boş bırakılırsa genel site ayarları kullanılır."
    }),
  ],
});
