import { defineField, defineType } from "sanity";

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "Hakkımızda",
  type: "document",
  fields: [
    // ── Hero ──────────────────────────────────────────────────────────────────
    defineField({
      name: "heroHeadline",
      title: "Sayfa Ana Başlığı",
      type: "string",
      description:
        "Sayfanın en üstündeki ana başlık. Örnek: \"Mekanlara Kimlik Kazandırıyoruz\"",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroSubtitle",
      title: "Sayfa Alt Başlığı",
      type: "text",
      rows: 2,
      description:
        "Ana başlığın hemen altındaki kısa tanıtım cümlesi.",
    }),

    // ── İstatistikler ─────────────────────────────────────────────────────────
    defineField({
      name: "stats",
      title: "İstatistikler",
      type: "array",
      description:
        "Sayfanın üst kısmındaki koyu şeritte gösterilen rakamsal veriler. Her kart bir değer (örn. \"125+\") ve bir etiket (örn. \"Uygulama\") içerir. Boş bırakılırsa varsayılan değerler gösterilir.",
      of: [
        {
          type: "object",
          title: "İstatistik",
          fields: [
            {
              name: "value",
              title: "Değer",
              type: "string",
              description: "Öne çıkan sayı veya oran. Örnek: \"125+\" veya \"12.500+\"",
            },
            {
              name: "label",
              title: "Etiket",
              type: "string",
              description: "Sayının altındaki açıklama metni. Örnek: \"Uygulama\" veya \"m² Alan\"",
            },
          ],
          preview: {
            select: { title: "value", subtitle: "label" },
          },
        },
      ],
    }),

    // ── Hikayemiz ─────────────────────────────────────────────────────────────
    defineField({
      name: "storyEyebrow",
      title: "Hikayemiz — Üst Başlık",
      type: "string",
      initialValue: "HİKAYEMİZ",
      description: "Hikayemiz başlığının üzerindeki küçük yazı.",
    }),
    defineField({
      name: "storyTitle",
      title: "Hikayemiz — Bölüm Başlığı",
      type: "string",
      description:
        "\"Hikayemiz\" bölümündeki başlık. Örnek: \"On Yılda Bir Vizyonun İnşası\"",
    }),
    defineField({
      name: "storyText",
      title: "Hikayemiz — Metin",
      type: "array",
      of: [{ type: "block" }],
      description:
        "Şirketin kuruluş ve gelişim hikayesini anlatan paragraflar. Kalın, italik, bağlantı gibi zengin metin biçimlendirmelerini destekler.",
    }),
    defineField({
      name: "storyImage",
      title: "Hikayemiz — Görsel",
      type: "image",
      options: { hotspot: true },
      description:
        "Hikaye metninin yanında görünecek fotoğraf. Dikey (4:5) oranında görseller en iyi sonucu verir.",
      fields: [
        defineField({
          name: "alt",
          title: "Görsel Açıklaması (Alt Metni)",
          type: "string",
          description:
            "Erişilebilirlik ve SEO için gereklidir. Görselin içeriğini kısaca tanımlayın. Örnek: \"Nuark Mimarlık ofis içi görünümü\"",
        }),
      ],
    }),

    // ── Değerlerimiz ──────────────────────────────────────────────────────────
    defineField({
      name: "valuesEyebrow",
      title: "Değerlerimiz — Üst Başlık",
      type: "string",
      initialValue: "DEĞERLERİMİZ",
      description: "Değerlerimiz başlığının üzerindeki küçük yazı.",
    }),
    defineField({
      name: "valuesTitle",
      title: "Değerlerimiz — Bölüm Başlığı",
      type: "string",
      description:
        "\"Değerlerimiz\" bölümünün üst başlığı. Örnek: \"Bizi Biz Yapan İlkeler\"",
    }),
    defineField({
      name: "values",
      title: "Değerlerimiz — Kartlar",
      type: "array",
      description:
        "Her kart bir ilkeyi temsil eder (örn. Sürdürülebilirlik, Bütçe Disiplini). Boş bırakılırsa varsayılan 6 ilke gösterilir.",
      of: [
        {
          type: "object",
          title: "İlke",
          fields: [
            {
              name: "title",
              title: "İlke Başlığı",
              type: "string",
              description: "Örnek: \"Sürdürülebilirlik\" veya \"İnsan Odaklı Tasarım\"",
            },
            {
              name: "description",
              title: "İlke Açıklaması",
              type: "text",
              rows: 3,
              description: "Bu ilkenin kısa açıklaması. 1–2 cümle yeterlidir.",
            },
          ],
          preview: {
            select: { title: "title", subtitle: "description" },
          },
        },
      ],
    }),

    // ── Ekibimiz ──────────────────────────────────────────────────────────────
    defineField({
      name: "teamEyebrow",
      title: "Ekibimiz — Üst Başlık",
      type: "string",
      initialValue: "EKİBİMİZ",
      description: "Ekibimiz başlığının üzerindeki küçük yazı.",
    }),
    defineField({
      name: "teamTitle",
      title: "Ekibimiz — Bölüm Başlığı",
      type: "string",
      description:
        "Ekip bölümünün üst başlığı. Örnek: \"Kurucu ve Mimarlar\". Bu bölüm yalnızca aşağıya en az bir ekip üyesi eklendiğinde sayfada görünür.",
    }),
    defineField({
      name: "team",
      title: "Ekibimiz — Üyeler",
      type: "array",
      description:
        "Sayfada tanıtılacak ekip üyeleri. En az bir üye eklendiğinde \"Ekibimiz\" bölümü otomatik olarak sayfada görünür; hiç üye eklenmezse bölüm gizlenir.",
      of: [
        {
          type: "object",
          title: "Ekip Üyesi",
          fields: [
            {
              name: "name",
              title: "Ad Soyad",
              type: "string",
              description: "Örnek: \"Ahmet Yılmaz\"",
            },
            {
              name: "title",
              title: "Unvan / Pozisyon",
              type: "string",
              description: "Örnek: \"Kurucu Mimar\" veya \"Proje Yöneticisi\"",
            },
            {
              name: "bio",
              title: "Kısa Biyografi",
              type: "text",
              rows: 2,
              description: "Kişinin deneyimini ve uzmanlık alanını özetleyen 1–2 cümle.",
            },
            {
              name: "photo",
              title: "Fotoğraf",
              type: "image",
              options: { hotspot: true },
              description: "Kare veya dikey (4:5) oranında, profesyonel fotoğraf önerilir.",
              fields: [
                {
                  name: "alt",
                  title: "Görsel Açıklaması (Alt Metni)",
                  type: "string",
                  description: "Örnek: \"Ahmet Yılmaz portre fotoğrafı\"",
                },
              ],
            },
          ],
          preview: {
            select: { title: "name", subtitle: "title", media: "photo" },
          },
        },
      ],
    }),

    // ── CTA Bölümü ────────────────────────────────────────────────────────────
    defineField({
      name: "ctaEyebrow",
      title: "CTA Üst Başlığı",
      type: "string",
      initialValue: "BİZİMLE ÇALIŞIN",
      description: "CTA bölümündeki küçük etiket.",
    }),
    defineField({
      name: "ctaTitle",
      title: "CTA Başlığı",
      type: "string",
      initialValue: "Projenizi Birlikte\nHayata Geçirelim",
      description: "CTA bölümündeki büyük başlık.",
    }),
    defineField({
      name: "ctaDescription",
      title: "CTA Açıklaması",
      type: "text",
      rows: 3,
      initialValue: "Mimari danışmanlıktan anahtar teslim inşaata kadar tüm süreçlerde yanınızdayız. Projenizi anlatın, sizin için en doğru çözümü birlikte tasarlayalım.",
      description: "CTA başlığının altındaki açıklama metni.",
    }),
    defineField({
      name: "ctaButtonLabel",
      title: "CTA Buton Metni",
      type: "string",
      initialValue: "İLETİŞİME GEÇİN",
      description: "İletişim sayfasına yönlendiren buton metni.",
    }),

    // ── SEO ───────────────────────────────────────────────────────────────────
    defineField({
      name: "seo",
      title: "SEO Ayarları",
      type: "seo",
      description:
        "Arama motorları için meta başlık, açıklama ve sosyal medya önizleme ayarları. Doldurulmazsa sayfa başlığı ve alt açıklama otomatik kullanılır.",
    }),
  ],
});
