import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Proje",
  type: "document",
  fields: [
    defineField({ 
      name: "title", 
      title: "Proje Adı", 
      type: "string", 
      validation: (Rule) => Rule.required(),
      description: "Projenin tam adı (Örn: Nuark Rezidans)."
    }),
    defineField({ 
      name: "slug", 
      title: "Slug", 
      type: "slug", 
      options: { source: "title" }, 
      validation: (Rule) => Rule.required(),
      description: "URL adresi için benzersiz kimlik. Genellikle otomatik oluşturulur."
    }),

    defineField({ 
      name: "category", 
      title: "Kategori", 
      type: "string", 
      options: { list: ["Konut", "Ticari", "Ofis", "Karma Kullanım", "Kentsel Dönüşüm", "Kültür & Sanat", "Eğitim", "Sağlık", "Endüstriyel"] },
      description: "Projenin ait olduğu yapı türü."
    }),
    defineField({ name: "city", title: "Şehir", type: "string" }),
    defineField({ name: "location", title: "Konum / Adres", type: "string" }),
    defineField({ name: "year", title: "Proje Yılı", type: "string", description: "Örn: 2024" }),
    defineField({ name: "client", title: "Müşteri", type: "string", description: "Proje sahibi kişi veya kurum (Örn: Ahmet Yılmaz veya Nuark A.Ş.)" }),
    defineField({ name: "area", title: "Proje Alanı (m²)", type: "string", description: "Metrekare cinsinden alan (Örn: 450 m²)" }),

    defineField({
      name: "coverImage",
      title: "Ana Kapak Görseli",
      type: "image",
      options: { hotspot: true },
      description: "Listeleme sayfalarında görünecek olan ana fotoğraf. Geniş (16:9) veya kare (1:1) olması tasarımda daha iyi durur.",
      fields: [
        defineField({ 
          name: "alt", 
          title: "Görsel Açıklaması (Alt Metin)", 
          type: "string", 
          validation: (Rule) => Rule.required(),
          description: "SEO için kısa bir açıklama (Örn: Nuark Rezidans dış cephe görünümü)."
        })
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Proje Detayları",
      type: "array",
      description: "NOT: Bu alan şu an web sitesinde gösterilmemektedir. Projenin tasarım hikayesi ve detaylı bilgilerini buraya giriniz.",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Görsel Açıklaması (Alt Metin)", type: "string", validation: (Rule) => Rule.required() }),
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
      title: "Proje Fotoğrafları",
      type: "array",
      description: "Proje detay sayfasında alt kısımda yer alan görsel galerisi.",
      of: [
        { 
          type: "image", 
          options: { hotspot: true }, 
          fields: [{ name: "alt", title: "Alt Metni", type: "string", description: "Fotoğrafın içeriği." }]
        }
      ],
      options: { layout: "grid" },
    }),

    defineField({ name: "featured", title: "Ana Sayfada Öne Çıkarsın mı?", type: "boolean", initialValue: false, description: "Açılırsa ana sayfadaki 'Öne Çıkan Projeler' arasında gösterilebilir." }),
    defineField({ name: "order", title: "Görüntüleme Sırası", type: "number", description: "Küçük sayı daha önce gösterilir." }),
    defineField({ name: "seo", title: "Proje SEO Ayarları", type: "seo" }),
  ],
  orderings: [
    { title: "Sıralama", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
    { title: "Yıl (Yeniden Eskiye)", name: "yearDesc", by: [{ field: "year", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "city", media: "coverImage" },
  },
});
