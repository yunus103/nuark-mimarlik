import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Ayarları",
  type: "document",
  fields: [
    defineField({ name: "siteName", title: "Site Adı", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "siteTagline", title: "Slogan", type: "string" }),
    defineField({
      name: "logo",
      title: "Site Logosu",
      type: "image",
      options: { hotspot: true },
      description: "Ana menü ve footer'da görünecek ana logo. Şeffaf PNG veya SVG tercih edilmelidir. Önerilen dikey logo boyutları: 200x300px veya 150x250px.",
      fields: [
        defineField({
          name: "alt",
          title: "Görsel Açıklaması (Alt Metin)",
          type: "string",
          description: "Ekran okuyucular ve SEO için logo açıklaması (Örn: Nuark Mimarlık Logosu).",
        }),
      ],
    }),
    defineField({
      name: "logoText",
      title: "Logo Yanı Yazısı",
      type: "string",
      description: "Logonun hemen sağında görünecek olan marka ismi (Örn: NUARK MİMARLIK).",
    }),
    defineField({ 
      name: "favicon", 
      title: "Favicon", 
      type: "image", 
      description: "Tarayıcı sekmesinde görünen küçük simge. 512x512px kare, şeffaf arka planlı PNG önerilir." 
    }),
    defineField({ 
      name: "defaultOgImage", 
      title: "Varsayılan Paylaşım Görseli (OG Image)", 
      type: "image", 
      description: "Web sitesi linki sosyal medyada paylaşıldığında görünen kapak görseli. Önerilen boyut: 1200x630px." 
    }),
    defineField({
      name: "defaultSeo",
      title: "Genel SEO Ayarları",
      type: "object",
      description: "Diğer sayfalarda özel SEO ayarı girilmediğinde kullanılacak varsayılan bilgiler.",
      fields: [
        defineField({ name: "metaTitle", title: "Varsayılan Meta Başlık", type: "string", validation: (Rule) => Rule.max(60), description: "Google sonuçlarında görünen ana başlık (Maks 60 krkter)." }),
        defineField({ name: "metaDescription", title: "Varsayılan Meta Açıklama", type: "text", rows: 3, validation: (Rule) => Rule.max(160), description: "Sitenin kısa özeti (Maks 160 karakter)." }),
      ],
    }),
    defineField({
      name: "contactInfo",
      title: "İletişim Bilgileri",
      type: "object",
      description: "Sitenin her yerinde (İletişim sayfası, Footer, vb.) kullanılan ortak iletişim verileri.",
      fields: [
        defineField({ name: "phone", title: "Telefon Numarası", type: "string", description: "Örn: +90 216 XXX XX XX" }),
        defineField({ name: "email", title: "E-posta Adresi", type: "string", description: "Genel iletişim e-posta adresi." }),
        defineField({ name: "address", title: "Ofis Adresi", type: "text", rows: 3, description: "Ofisinizin tam adresi." }),
        defineField({
          name: "whatsappNumber",
          title: "WhatsApp Numarası",
          type: "string",
          description: "Başına '+' koyarak ve boşluk bırakmadan ülke koduyla birlikte giriniz. Örn: +905001234567",
        }),
        defineField({
          name: "showWhatsappButton",
          title: "WhatsApp Butonunu Göster",
          type: "boolean",
          initialValue: true,
          description: "Sitenin sağ alt köşesinde yüzen WhatsApp iletişim butonunu aktifleştirir.",
        }),
        defineField({
          name: "mapIframe",
          title: "Harita iFrame Kodu",
          type: "text",
          rows: 4,
          description: "Google Haritalar > Paylaş > Haritayı Yerleştir > HTML'yi Kopyala diyerek aldığınız kodu buraya yapıştırın.",
        }),
      ],
    }),
    defineField({ name: "socialLinks", title: "Sosyal Medya Hesapları", type: "array", of: [{ type: "socialLink" }], description: "Footer ve İletişim sayfasında listelenen sosyal ağ bağlantıları." }),
    defineField({ name: "gaId", title: "Google Analytics ID (GA4)", type: "string", description: "G-XXXXXXXXXX formatında ölçüm kimliği." }),
    defineField({ name: "gtmId", title: "Google Tag Manager ID", type: "string", description: "GTM-XXXXXXX formatındaki kapsayıcı kimliği." }),
    defineField({ name: "googleSearchConsole", title: "Search Console Doğrulama Kodu", type: "string", description: "Sadece içerik (content) kısmındaki kodu giriniz. Örn: _XXXXXXX..." }),
  ],
  preview: { select: { title: "siteName" } },
});
