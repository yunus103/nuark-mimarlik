import { defineField, defineType } from "sanity";

export const projectsPageType = defineType({
  name: "projectsPage",
  title: "Projeler Sayfası Ayarları",
  type: "document",
  groups: [
    { name: "hero", title: "Hero Bölümü" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // ── Hero Bölümü ───────────────────────────────────────────────────────────
    defineField({
      name: "heroEyebrow",
      title: "Sayfa Üst Başlığı (Eyebrow)",
      type: "string",
      group: "hero",
      initialValue: "PORTFOLYO",
      description: "Projeler sayfasının en üstündeki küçük etiket.",
    }),
    defineField({
      name: "heroTitle",
      title: "Sayfa Ana Başlığı",
      type: "string",
      group: "hero",
      initialValue: "Projelerimiz",
      description: "Sayfanın en üstünde yer alacak olan ana başlık.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroSubtitle",
      title: "Sayfa Alt Başlığı",
      type: "text",
      rows: 2,
      group: "hero",
      initialValue: "Özgün tasarım anlayışımızla hayat verdiğimiz, fonksiyonellik ve estetiği buluşturan seçkin çalışmalarımız.",
      description: "Başlığın altında yer alacak olan kısa tanıtım veya açıklama metni.",
    }),

    // ── SEO ───────────────────────────────────────────────────────────────────
    defineField({
      name: "seo",
      title: "SEO Ayarları",
      type: "seo",
      group: "seo",
      description: "Projeler sayfasının arama motoru optimizasyonu (Meta başlık ve açıklama) ayarları.",
    }),
  ],
});
