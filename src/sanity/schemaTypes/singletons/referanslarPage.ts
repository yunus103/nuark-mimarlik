import { defineField, defineType } from "sanity";

export const referanslarPageType = defineType({
  name: "referanslarPage",
  title: "Referanslarımız",
  type: "document",
  groups: [
    { name: "hero", title: "Hero Bölümü" },
    { name: "clients", title: "Referanslar" },
    { name: "cta", title: "CTA Bölümü" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // ── Hero ──────────────────────────────────────────────────────────────────
    defineField({
      name: "heroHeadline",
      title: "Sayfa Başlığı",
      type: "string",
      group: "hero",
      description:
        "Sayfanın en üstündeki ana başlık. Örnek: \"Referanslarımız\" veya \"Güvendikleri Markalar\"",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Sayfa Alt Açıklaması",
      type: "text",
      rows: 2,
      group: "hero",
      description:
        "Başlığın altındaki kısa tanıtım cümlesi. Örnek: \"Yıllar içinde birlikte çalıştığımız markalar ve kurumlar.\"",
    }),

    // ── Referanslar ───────────────────────────────────────────────────────────
    defineField({
      name: "sectionTitle",
      title: "Referanslar Bölüm Başlığı",
      type: "string",
      group: "clients",
      description:
        "Referans logoların üzerindeki bölüm başlığı. Örnek: \"Birlikte Çalıştığımız Markalar\"",
    }),
    defineField({
      name: "sectionSubtitle",
      title: "Referanslar Bölüm Açıklaması",
      type: "text",
      rows: 2,
      group: "clients",
      description: "Bölüm başlığının altında kısa bir açıklama cümlesi.",
    }),
    defineField({
      name: "clients",
      title: "Referans Listesi",
      type: "array",
      group: "clients",
      description:
        "Bu sayfada gösterilecek referans markalar. Boş bırakılırsa Ana Sayfa > Referans Markalar listesi otomatik kullanılır.",
      of: [
        {
          type: "object",
          title: "Referans",
          preview: {
            select: { title: "companyName", subtitle: "sector", media: "logo" },
          },
          fields: [
            defineField({
              name: "companyName",
              title: "Şirket / Marka Adı",
              type: "string",
              validation: (Rule) => Rule.required(),
              description: "Örnek: \"ABC İnşaat A.Ş.\"",
            }),
            defineField({
              name: "logo",
              title: "Logo",
              type: "image",
              options: { hotspot: true },
              description:
                "Şeffaf arka planlı PNG veya SVG formatı tercih edilir. En iyi görünüm için yatay logolar önerilir.",
              fields: [
                defineField({
                  name: "alt",
                  title: "Görsel Açıklaması (Alt Metni)",
                  type: "string",
                  description: "Örnek: \"ABC İnşaat logosu\"",
                }),
              ],
            }),
            defineField({
              name: "sector",
              title: "Sektör (Opsiyonel)",
              type: "string",
              description:
                "Şirketin faaliyet alanı. Örnek: \"Konut Geliştirme\", \"Otelcilik\", \"Perakende\"",
            }),
            defineField({
              name: "url",
              title: "Web Site Linki (Opsiyonel)",
              type: "url",
              description: "Logoya tıklandığında açılacak link. Boş bırakılırsa link olmaz.",
            }),
            defineField({
              name: "forceGrayscale",
              title: "Logoyu Her Zaman Gri Göster",
              type: "boolean",
              initialValue: false,
              description:
                "Kapalı (varsayılan): Logo üzerine gelindiğinde orijinal rengine döner. Açık: Logo hover'da da gri kalır — beyaz veya açık renkli logolar için kullanın.",
            }),
          ],
        },
      ],
    }),

    // ── CTA ───────────────────────────────────────────────────────────────────
    defineField({
      name: "ctaTitle",
      title: "CTA Başlığı",
      type: "string",
      group: "cta",
      description:
        "Sayfanın altındaki eylem çağrısı bölümünün başlığı. Örnek: \"Siz de Referanslarımız Arasında Yer Alın\"",
    }),
    defineField({
      name: "ctaDescription",
      title: "CTA Açıklaması",
      type: "text",
      rows: 2,
      group: "cta",
      description: "CTA başlığının altında gösterilecek kısa açıklama cümlesi.",
    }),

    // ── SEO ───────────────────────────────────────────────────────────────────
    defineField({
      name: "seo",
      title: "SEO Ayarları",
      type: "seo",
      group: "seo",
      description:
        "Arama motorları için meta başlık ve açıklama. Doldurulmazsa sayfa başlığı otomatik kullanılır.",
    }),
  ],
});
