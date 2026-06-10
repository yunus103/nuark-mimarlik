import { defineField, defineType } from "sanity";

export const seoType = defineType({
  name: "seo",
  title: "SEO Ayarları",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Başlık",
      type: "string",
      description: "Arama sonuçlarında görünen mavi başlık. Boş bırakılırsa sayfa adı kullanılır. Önerilen: 50-60 karakter.",
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Açıklama",
      type: "text",
      rows: 3,
      description: "Arama sonuçlarında başlığın altında görünen özet metin. Önerilen: 150-160 karakter.",
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "ogImage",
      title: "Sosyal Medya Görseli (OG Image)",
      type: "image",
      description: "Paylaşımlarda görünecek özel görsel. Önerilen boyut: 1200x630px. Boş bırakılırsa genel site ayarlarındaki görsel kullanılır.",
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      description: "Yalnızca bu sayfa başka bir sayfanın kopyasıysa veya özel bir yönlendirme gerekiyorsa doldurunuz.",
    }),
    defineField({
      name: "noIndex",
      title: "Arama Motorlarından Gizle",
      type: "boolean",
      description: "Bu sayfanın Google arama sonuçlarında çıkmasını istemiyorsanız işaretleyin.",
      initialValue: false,
    }),
  ],
});
