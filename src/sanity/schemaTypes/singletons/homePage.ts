import { defineField, defineType } from "sanity";

export const homePageType = defineType({
  name: "homePage",
  title: "Ana Sayfa",
  type: "document",
  groups: [
    { name: "hero", title: "Hero Bölümü" },
    { name: "stats", title: "İstatistikler" },
    { name: "about", title: "Hakkımızda Özeti" },
    { name: "projects", title: "Öne Çıkan Projeler" },
    { name: "services", title: "Hizmetler Özeti" },
    { name: "cta", title: "Eylem Çağrısı (CTA)" },
    { name: "clients", title: "Referans Markalar" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // Hero
    defineField({ name: "heroEyebrow", title: "Hero Üst Etiket", type: "string", group: "hero", description: "Ana başlığın üzerinde görünen küçük, vurgulu yazı. Örn: 'GELECEĞİ TASARLIYORUZ'" }),
    defineField({ name: "heroTitle", title: "Hero Başlık", type: "string", validation: (Rule) => Rule.required(), group: "hero", description: "Ana sayfada en üstte görünen büyük başlık." }),
    defineField({ name: "heroSubtitle", title: "Hero Alt Başlık", type: "text", rows: 3, group: "hero", description: "Başlığın altındaki kısa açıklama metni." }),
    defineField({
      name: "heroImage",
      title: "Hero Görseli",
      type: "image",
      options: { hotspot: true },
      group: "hero",
      description: "Giriş bölümü arka plan görseli. Önerilen oran: 16:9 veya 21:9. Minimum genişlik: 1920px.",
      fields: [
        defineField({ name: "caption", title: "Küçük Bilgi Metni", type: "string", description: "Görselin üzerinde veya yanında görünecek ek not." }),
        defineField({ name: "alt", title: "Erişilebilirlik Metni (Alt)", type: "string", validation: (Rule) => Rule.required(), description: "Görselin içeriğini kısaca tanımlayın." }),
      ],
    }),
    defineField({ name: "heroPrimaryCtaLabel", title: "Birincil Buton Metni", type: "string", group: "hero", description: "Örn: 'Projelerimizi İnceleyin'" }),
    defineField({ name: "heroPrimaryCtaSlug", title: "Birincil Buton Linki", type: "string", group: "hero", description: "Yönlendirilecek sayfa (Örn: 'projeler' veya 'iletisim')." }),
    defineField({ name: "heroSecondaryCtaLabel", title: "İkincil Buton Metni", type: "string", group: "hero" }),
    defineField({ name: "heroSecondaryCtaSlug", title: "İkincil Buton Linki", type: "string", group: "hero" }),

    // İstatistikler
    defineField({
      name: "stats",
      title: "Hızlı İstatistikler",
      type: "array",
      group: "stats",
      description: "Rakamlarla başarılarınızı sergileyin (Maksimum 4 adet).",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", title: "Değer", type: "string", description: "Örn: '150+' veya '15 Yıl'" },
            { name: "label", title: "Açıklama", type: "string", description: "Örn: 'Tamamlanan Proje' veya 'Deneyim'" },
          ],
        },
      ],
      validation: (Rule) => Rule.max(4),
    }),

    // Seçkin Projeler
    defineField({ name: "featuredProjectsTitle", title: "Öne Çıkan Projeler Bölüm Başlığı", type: "string", group: "projects", initialValue: "Öne Çıkan Projeler" }),
    defineField({
      name: "featuredProjects",
      title: "Seçili Projeler",
      type: "array",
      group: "projects",
      description: "Ana sayfada listelenecek projeleri seçin. Boş bırakılırsa en güncel projeler otomatik olarak gösterilir. (Maksimum 6 adet).",
      of: [{ type: "reference", to: [{ type: "project" }] }],
      validation: (Rule) => Rule.max(6),
    }),

    defineField({ name: "servicesSectionTitle", title: "Hizmetler Bölüm Başlığı", type: "string", group: "services", initialValue: "Neler Yapıyoruz?" }),
    defineField({ name: "servicesIntro", title: "Hizmetler Kısa Tanıtımı", type: "text", rows: 2, group: "services" }),
    defineField({ name: "servicesEyebrow", title: "Hizmetler Üst Etiketi", type: "string", group: "services", initialValue: "UZMANLIK" }),
    defineField({ name: "servicesCtaLabel", title: "Hizmetler Buton Yazısı", type: "string", group: "services", initialValue: "Hizmetlerimizi İnceleyin" }),

    // Kısa Tanıtım
    defineField({ name: "aboutTitle", title: "Hakkımızda Özet Başlığı", type: "string", group: "about" }),
    defineField({ name: "aboutText", title: "Hakkımızda Özet Metni", type: "array", of: [{ type: "block" }], group: "about" }),
    defineField({
      name: "aboutImages",
      title: "Hakkımızda Tanıtım Görselleri",
      group: "about",
      type: "array",
      description: "Tanıtım metninin yanında kaydırılabilir olarak görünecek fotoğraflar. Sıralama paneldeki gibidir. Önerilen oran: 4:5 veya 1:1.",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Metni (Erişilebilirlik)",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
    }),
    defineField({ name: "aboutCtaLabel", title: "Hakkımızda Buton Yazısı", type: "string", group: "about", initialValue: "Kurumsal Profilimizi İnceleyin" }),

    defineField({ name: "ctaTitle", title: "Eylem Çağrısı (CTA) Başlığı", type: "string", group: "cta", description: "Örn: 'Hayalinizdeki projeyi birlikte hayata geçirelim.'" }),
    defineField({ name: "ctaSubtitle", title: "CTA Alt Başlığı", type: "string", group: "cta" }),
    defineField({ name: "ctaButtonLabel", title: "CTA Buton Yazısı", type: "string", group: "cta", initialValue: "Projeye Başlayalım" }),

    // Referans Markalar (Marquee)
    defineField({
      name: "clientLogos",
      title: "Referans Markalar / Logolar",
      type: "array",
      group: "clients",
      description: "Ana sayfada kayan bant şeklinde gösterilecek marka logoları. Şeffaf PNG veya SVG tercih edilmelidir.",
      of: [
        {
          type: "object",
          title: "Marka",
          preview: {
            select: { title: "companyName", media: "logo" },
          },
          fields: [
            defineField({
              name: "logo",
              title: "Logo Dosyası",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
              fields: [
                defineField({ name: "alt", title: "Alt Metni", type: "string", validation: (Rule) => Rule.required(), description: "Şirket adı (Örn: ABC İnşaat)" }),
              ],
            }),
            defineField({ name: "companyName", title: "Şirket / Marka Adı", type: "string", validation: (Rule) => Rule.required() }),
            defineField({
              name: "logoScale",
              title: "Logo Boyut Ölçeği (%)",
              type: "number",
              description: "Logonun boyutunu diğerlerine göre ayarlamak için (Örn: %120 için 120, varsayılan 100).",
              initialValue: 100,
              validation: (Rule) => Rule.min(50).max(200),
            }),
            defineField({
              name: "logoFilter",
              title: "Karanlık Tema Görünüm Filtresi",
              type: "string",
              description: "Logonun koyu renkli bantta nasıl görüneceğini ayarlar. 'Varsayılan' seçeneği logoyu düz beyaz silüet yapar. Eğer LG gibi logosunda çizgisel/detaylı hatlar olan logolarda kayıp oluyorsa 'Detayları Koru / Çizgisel' veya 'Gri Tonlama' seçeneğini seçiniz.",
              options: {
                list: [
                  { title: "Varsayılan (Düz Beyaz Silüet)", value: "default" },
                  { title: "Detayları Koru (Çizgisel Logolar İçin)", value: "detailed" },
                  { title: "Gri Tonlama (İç Yazılı/Koyu Logolar İçin)", value: "grayscale" },
                  { title: "Canlı Gri (Daire/Yazılı Logolar İçin)", value: "vivid-grayscale" },
                  { title: "Orijinal Renkli (Filtresiz)", value: "original" },
                ],
              },
              initialValue: "default",
            }),
          ],
        },
      ],
    }),

    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
});
