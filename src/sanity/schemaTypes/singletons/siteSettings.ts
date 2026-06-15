import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Ayarları",
  type: "document",
  groups: [
    { name: "general", title: "Site Genel Ayarları", default: true },
    { name: "qr", title: "QR Sosyal Ekranı (/sosyal)" },
  ],
  fields: [
    defineField({ name: "siteName", title: "Site Adı", type: "string", validation: (Rule) => Rule.required(), group: "general" }),
    defineField({ name: "siteTagline", title: "Slogan", type: "string", group: "general" }),
    defineField({
      name: "logo",
      title: "Site Logosu",
      type: "image",
      options: { hotspot: true },
      group: "general",
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
      group: "general",
      description: "Logonun hemen sağında görünecek olan marka ismi (Örn: NUARK MİMARLIK).",
    }),
    defineField({ 
      name: "favicon", 
      title: "Favicon", 
      type: "image", 
      group: "general",
      description: "Tarayıcı sekmesinde görünen küçük simge. 512x512px kare, şeffaf arka planlı PNG önerilir." 
    }),
    defineField({ 
      name: "defaultOgImage", 
      title: "Varsayılan Paylaşım Görseli (OG Image)", 
      type: "image", 
      group: "general",
      description: "Web sitesi linki sosyal medyada paylaşıldığında görünen kapak görseli. Önerilen boyut: 1200x630px." 
    }),
    defineField({
      name: "defaultSeo",
      title: "Genel SEO Ayarları",
      type: "object",
      group: "general",
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
      group: "general",
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
    defineField({ name: "socialLinks", title: "Sosyal Medya Hesapları", type: "array", of: [{ type: "socialLink" }], group: "general", description: "Footer ve İletişim sayfasında listelenen sosyal ağ bağlantıları." }),
    defineField({ name: "gaId", title: "Google Analytics ID (GA4)", type: "string", group: "general", description: "G-XXXXXXXXXX formatında ölçüm kimliği." }),
    defineField({ name: "gtmId", title: "Google Tag Manager ID", type: "string", group: "general", description: "GTM-XXXXXXX formatındaki kapsayıcı kimliği." }),
    defineField({ name: "googleSearchConsole", title: "Search Console Doğrulama Kodu", type: "string", group: "general", description: "Sadece içerik (content) kısmındaki kodu giriniz. Örn: _XXXXXXX..." }),

    defineField({
      name: "qrTitle",
      title: "QR Sayfa Başlığı",
      type: "string",
      initialValue: "NUARK MİMARLIK",
      group: "qr",
      description: "Sosyal ekranının en üstündeki ana başlık.",
    }),
    defineField({
      name: "qrSubtitle",
      title: "QR Sayfa Alt Başlığı",
      type: "text",
      rows: 2,
      initialValue: "Tasarımda Çizgi ve Benzersiz Kimlik",
      group: "qr",
      description: "Başlığın altındaki kısa slogan veya açıklama.",
    }),
    defineField({
      name: "qrLogo",
      title: "QR Sayfa Profil Görseli",
      type: "image",
      options: { hotspot: true },
      group: "qr",
      description: "Boş bırakılırsa varsayılan site logosu kullanılır.",
    }),
    defineField({
      name: "qrLinks",
      title: "QR Sosyal Bağlantıları",
      type: "array",
      group: "qr",
      description: "Bu ekranda listelenecek butonları ve linkleri ekleyin.",
      of: [
        {
          type: "object",
          name: "qrLinkItem",
          title: "Sosyal Bağlantı",
          preview: {
            select: { title: "label", subtitle: "platform" },
          },
          fields: [
            defineField({
              name: "platform",
              title: "Sosyal Medya Platformu",
              type: "string",
              options: {
                list: [
                  { title: "Instagram", value: "instagram" },
                  { title: "Facebook", value: "facebook" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "Pinterest", value: "pinterest" },
                  { title: "WhatsApp", value: "whatsapp" },
                  { title: "YouTube", value: "youtube" },
                  { title: "Twitter / X", value: "x" },
                  { title: "Web Sitesi", value: "website" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "label",
              title: "Buton Yazısı",
              type: "string",
              validation: (Rule) => Rule.required(),
              description: "Butonun üzerinde yazacak olan metin (Örn: Bizi Instagram'da Takip Edin).",
            }),
            defineField({
              name: "url",
              title: "Bağlantı Adresi (URL)",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
    }),
  ],
  preview: { select: { title: "siteName" } },
});
