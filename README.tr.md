<div align="right">
  <a href="./README.md">
    <img src="https://img.shields.io/badge/English_EN-374151?style=for-the-badge" alt="English" />
  </a>
  <img src="https://img.shields.io/badge/Türkçe_TR-2563EB?style=for-the-badge" alt="Türkçe" />
</div>

# Nuark Mimarlık — Dijital Mimarlık ve Kurumsal Platform

**Nuark Mimarlık** için özel olarak geliştirilmiş, yüksek performanslı kurumsal web platformu ve dijital portfolyo uygulamasıdır. Sistem; mimari zarafeti modern web teknolojileriyle birleştiren **Refined Brutalism** tasarım felsefesi, headless içerik mimarisi, anlık ISR önbellekleme ve otomatik SEO altyapısı üzerine inşa edilmiştir.

---

## 🏛️ Mimari ve Teknoloji Yığını

| Alan | Teknoloji | Açıklama ve Rol |
| :--- | :--- | :--- |
| **Framework** | **Next.js 16 (App Router)** | Server Components (RSC), React 19, Turbopack, modüler routing |
| **Headless CMS** | **Sanity Studio v3** | `/studio` üzerinde gömülü CMS, tip güvenli şemalar, singleton ve koleksiyonlar |
| **Tasarım & UI** | **Tailwind CSS v4** | CSS değişkenleri, tipografi eklentisi, Base UI bileşenleri ve özel tasarım sistemi |
| **Animasyon & UX**| **Framer Motion** | Scroll tetiklemeli animasyonlar, interaktif Lightbox, akıcı sayfa geçişleri |
| **Tip Güvenliği & Env** | **TypeScript 5 + Zod** | Uçtan uca tip güvenliği, `@t3-oss/env-nextjs` ile çalışma zamanı doğrulama |
| **Önbellek & ISR** | **Next.js On-Demand ISR** | Webhook güdümlü etiket bazlı anlık revalidation (`revalidateTag`, `revalidatePath`) |
| **İletişim** | **Nodemailer** | Sunucu taraflı doğrulamalı güvenli SMTP iletişim formu |
| **SEO & Veri Yapısı** | **Next.js Metadata + JSON-LD** | Dinamik OpenGraph görselleri, Schema.org varlıkları, dinamik sitemap & robots |

---

## 💎 Temel Modüller ve Fonksiyonel Özellikler

- **Portfolyo ve Proje Kataloğu (`/projeler`, `/projeler/[slug]`):** Filtrelenebilir mimari proje dizini, detaylı proje künyesi (konum, m² alanı, kategori, yıl), zengin editoryal içerik ve tam ekran interaktif Project Lightbox galerisi.
- **Hizmet Modülleri (`/hizmetlerimiz`):** Adım adım metodoloji ve süreç açıklamaları içeren mimari hizmet blokları ile interaktif akordeon SSS (FAQ) yapısı.
- **Kurumsal Hikaye ve Ekip (`/hakkimizda`):** Stüdyo felsefesi, mimari ilkeler, dinamik sayaç animasyonları ve liderlik/ekip profilleri.
- **Müşteri Referansları ve Yorumlar (`/referanslar`):** Sanity CMS üzerinden dinamik yönetilen müşteri logoları kayan şeridi (marquee) ve doğrulanmış müşteri geri bildirimleri.
- **Mimarlık Dergisi / Blog (`/blog`, `/blog/[slug]`):** Tipografik Portable Text formatında zengin editoryal yayınlar, özel vurgu kutuları ve yazar bilgisi.
- **İletişim ve Hızlı Erişim (`/iletisim`, `/sosyal`):** SMTP entegrasyonlu doğrulanmış iletişim formu, Google Haritalar entegrasyonu, sabit WhatsApp CTA butonu ve özel sosyal medya bağlantı merkezi (`/sosyal`).

---

## 🧭 Yönlendirme ve Sayfa Mimarisi

Uygulama, Next.js App Router rota grupları (Route Groups) kullanarak sunum katmanını yönetim ve servis uç noktalarından izole eder:

- `(site)/`: Navigasyon, tema sağlayıcı, yüzen butonlar ve footer'ı kapsayan ana kullanıcı arayüzü.
- `studio/[[...tool]]/`: Next.js çalışma zamanı içerisine gömülü, tam yetkili Sanity Studio yönetim paneli.
- `sosyal/`: Dikkat dağıtmayan, optimize edilmiş doğrudan sosyal medya biyografi sayfası (Link hub).
- `api/`:
  - `/api/revalidate`: CMS içerik değişikliklerinde çalışan anlık önbellek temizleme webhook'u.
  - `/api/contact`: SMTP üzerinden e-posta gönderen güvenli form işleme servisi.
  - `/api/draft/*`: Sanity üzerinden canlı taslak önizlemeyi (Draft Mode) açıp kapatan rotalar.

---

## ⚡ Önbellek, ISR ve SEO Standartları

### Granüler İsteğe Bağlı Yenileme (On-Demand ISR)
Sanity CMS üzerinde yapılan içerik güncellemeleri `/api/revalidate` uç noktasını tetikler. İstek gövdesi HMAC-SHA256 (`@sanity/webhook`) ile kriptografik olarak doğrulanır ve yalnızca ilgili etiketler anında geçersiz kılınır:
- Etiket eşleştirmeleri: `siteSettings` & `navigation` → `layout`, `project` → `projects`, `blogPost` → `blog` vb.
- Tekil doküman bazlı hedefli yenileme (`project:slug`).

### Arama Motoru Optimizasyonu (SEO) Standartları
- **Merkezi Metadata Üretici (`src/lib/seo.ts`):** Sanity SEO ayarlarını dinamik olarak okuyarak başlık şablonları, açıklamalar, kanonik (canonical) URL'ler ve Sanity görsel boru hattı (`urlForImage`) ile dinamik OpenGraph/Twitter kartları oluşturur.
- **Yapısal Veri Entegrasyonu (`src/components/seo/JsonLd.tsx`):** Sayfa başlıklarına Schema.org uyumlu `Organization` ve `Article` JSON-LD formatında yapısal veri enjekte eder.
- **Dinamik XML Sitemap (`src/app/sitemap.ts`):** Statik rotaları ve Sanity'den çekilen dinamik proje/blog linklerini `_updatedAt` zaman damgalarıyla otomatik indeksler.

---

## 📂 Proje Dizin Yapısı

```text
src/
├── app/
│   ├── (site)/               # Ziyaretçilere açık web sayfaları
│   │   ├── blog/             # Blog listesi ve dinamik [slug] yazıları
│   │   ├── galeri/           # Mimari medya ve görsel galerisi
│   │   ├── hakkimizda/       # Stüdyo profili, değerler ve ekip
│   │   ├── hizmetlerimiz/    # Mimari hizmetler ve çalışma süreci
│   │   ├── iletisim/         # İletişim formu ve harita
│   │   ├── projeler/         # Portfolyo ızgarası ve [slug] proje detayları
│   │   ├── referanslar/      # Referanslar ve müşteri yorumları
│   │   ├── layout.tsx        # Ana site iskeleti (Header, Footer, Yüzen butonlar)
│   │   └── page.tsx          # Dinamik hero, istatistikler ve kayan logolu ana sayfa
│   ├── api/                  # Serverless API rotaları (revalidate, contact, draft)
│   ├── sosyal/               # Bağımsız sosyal medya bio sayfası
│   ├── studio/               # Gömülü Sanity Studio CMS
│   ├── sitemap.ts            # Dinamik XML sitemap üretici
│   └── robots.ts             # Dinamik robots.txt
├── components/
│   ├── forms/                # İletişim formu bileşeni ve doğrulaması
│   ├── home/                 # Modüler ana sayfa bölümleri
│   ├── layout/               # Header, Footer, Floaters, ThemeProvider
│   ├── seo/                  # JSON-LD Schema.org bileşenleri
│   └── ui/                   # ProjectLightbox, SanityImage, RichText ve temel UI elemanları
├── lib/
│   ├── env.ts                # T3 Env ve Zod ile sıkı ortam değişkeni doğrulaması
│   ├── seo.ts                # Metadata üretim motoru
│   └── utils.ts              # CSS sınıf birleştirme (clsx + tailwind-merge) ve formatlayıcılar
└── sanity/
    ├── lib/                  # İstemci yapılandırması, sorgular ve görsel oluşturucu
    ├── plugins/              # Singleton sayfa eklentileri ve panel kontrolleri
    ├── schemaTypes/          # Döküman, singleton ve nesne şemaları
    └── structure.ts          # Studio sol panel yapısı ve hiyerarşisi
```

---

## 🔒 Güvenlik ve Mühendislik Standartları

- **Ortam Değişkeni İzolasyonu:** Hassas anahtarlar (`SANITY_API_READ_TOKEN`, `SMTP_PASS`, `SANITY_WEBHOOK_SECRET`) `@t3-oss/env-nextjs` ve `zod` ile korunur, istemci tarafına sızması derleme aşamasında engellenir.
- **Webhook Kriptografik Doğrulama:** HMAC imzası kontrol edilerek revalidation isteklerinin yalnızca yetkili Sanity sunucularından geldiği teyit edilir.
- **Server-First Execution (RSC):** Ağır Sanity GROQ sorguları sunucuda işlenir; istemciye yalnızca gerekli etkileşimli JavaScript parçaları (Framer Motion, Lightbox, Mobil Menü) iletilir.
- **Erişilebilirlik ve Semantik Yapı:** Tam semantik HTML5 etiketleri, WCAG uyumlu renk kontrastları, klavye ile kontrol edilebilen Lightbox ve akıcı tipografi (`clamp()`).
