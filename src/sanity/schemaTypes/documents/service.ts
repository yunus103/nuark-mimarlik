import { defineField, defineType } from "sanity";

export const serviceType = defineType({
  name: "service",
  title: "Hizmet",
  type: "document",
  fields: [
    defineField({ 
      name: "title", 
      title: "Hizmet Başlığı", 
      type: "string", 
      description: "Sunulan hizmetin tam adı (Örn: İç Mimari Tasarım)",
      validation: (Rule) => Rule.required() 
    }),
    defineField({ 
      name: "slug", 
      title: "Slug", 
      type: "slug", 
      description: "URL adresi için benzersiz kimlik (Otomatik oluşturulabilir).",
      options: { source: "title" }, 
    }),
    defineField({
      name: "order",
      title: "Görüntüleme Sırası",
      type: "number",
      description: "Hizmetlerin listelendiği bölümlerde hangi sırada görüneceği (Küçük sayı üstte yer alır).",
      initialValue: 0,
    }),
    defineField({
      name: "mainImage",
      title: "Hizmet Görseli",
      type: "image",
      description: "Hizmet sayfasında ve listelerde görünecek olan fotoğraf. Önerilen oran: 4:5 (Dikey) veya 1:1 (Kare).",
      options: { hotspot: true },
      fields: [
        defineField({ 
          name: "alt", 
          title: "Görsel Açıklaması (Alt Metin)", 
          type: "string",
          description: "SEO ve erişilebilirlik için kısa açıklama."
        })
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Kısa Özet (Ana Sayfa Görünümü)",
      type: "text",
      rows: 2,
      description: "Ana sayfadaki 4'lü hizmet gridinde görünecek çok kısa tanıtım cümlesi.",
    }),
    defineField({
      name: "description",
      title: "Hizmet Detaylı Açıklaması",
      type: "array",
      of: [{ type: "block" }],
      description: "Hizmet sayfasında görselin yanında yer alan geniş anlatım metni.",
    }),
    defineField({
      name: "features",
      title: "Sunulan Detaylar / Hizmet Maddeleri",
      type: "array",
      of: [{ type: "string" }],
      description: "Hizmet kapsamında sunulan alt kalemler (Örn: Konsept Tasarım, Uygulama Projesi).",
    }),
    defineField({ name: "seo", title: "Hizmet SEO Ayarları", type: "seo" }),

  ],
});
