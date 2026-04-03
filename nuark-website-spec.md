# Nuark Mimarlık — Website Tasarım & İçerik Spesifikasyonu

> Bu doküman Nuark Mimarlık kurumsal websitesinin tüm sayfa yapılarını, içerik alanlarını, tasarım kararlarını ve Sanity CMS entegrasyonunu kapsar. Tüm içerikler Sanity'den gelir; aşağıdaki fallback değerler geliştirme ve demo için kullanılır.

---

## Genel Tasarım Dili

### Estetik Yön
**Refined Brutalism** — Mimari ciddiyetiyle modern zarafeti birleştiren, sade ama güçlü bir görsel dil. Aşırı animasyon yok, gereksiz süs yok. Her element bir amaca hizmet eder.

### Tipografi
- **Display / Başlık:** `Cormorant Garamond` — Serif, editorial, mimari ağırlık taşır. Hero başlıkları, bölüm başlıkları.
- **UI / Gövde:** `DM Sans` — Temiz, modern sans-serif. Navigasyon, butonlar, paragraflar, etiketler.
- **Boyut Hiyerarşisi:**
  - Hero H1: `clamp(52px, 8vw, 96px)` — Cormorant Garamond, font-weight 300 (ince ama güçlü)
  - Sayfa H1: `clamp(36px, 5vw, 64px)` — Cormorant Garamond, 400
  - Bölüm H2: `clamp(28px, 4vw, 48px)` — Cormorant Garamond, 400
  - Alt başlık H3: `20px` — DM Sans, 500
  - Gövde: `16px` — DM Sans, 400, line-height: 1.75
  - Küçük metin / etiket: `12px` — DM Sans, 500, letter-spacing: 0.1em, UPPERCASE

### Renk Paleti
```
--color-black:       #0A0A0A   (Ana metin, koyu arka planlar)
--color-off-white:   #F8F6F2   (Ana sayfa zemini, kırık beyaz)
--color-white:       #FFFFFF   (Kart arka planları)
--color-gold:        #C8A96E   (Vurgu rengi, CTA butonlar, aktif durumlar)
--color-gold-light:  #E8D5B0   (Gold'un açık tonu, hover durumları)
--color-gray-100:    #F0EEE9   (Alternatif bölüm arka planları)
--color-gray-300:    #D4D1CA   (Ayraçlar, border'lar)
--color-gray-500:    #9B9890   (İkincil metin, placeholderlar)
--color-gray-700:    #5C5A55   (İkincil metin koyu)
--color-text:        #2C2C2C   (Ana gövde metni)
```

### Boşluk Sistemi
4px base unit. Bölümler arası: `120px` (desktop) / `80px` (tablet) / `60px` (mobil). Container max-width: `1280px`, padding: `0 40px` (desktop) / `0 24px` (mobil).

### Animasyon Felsefesi
- Scroll tetiklemeli `fadeInUp` — tüm içerik bloklarında, bir kez çalışır.
- Hover geçişleri: `transition: all 0.3s ease` — hızlı, kaygan.
- Sayfa geçişleri: Hafif fade (opacity 0→1, ~300ms).
- Ana sayfa hero bölümündeki ince bir "scroll to explore" puls animasyonu.

### Header
- **Yapı:** Logo (solda) + Nav linkleri (ortada veya sağda) + CTA butonu (sağda en uçta)
- **Davranış:** Sayfa scroll'da `position: fixed`, arka plan `rgba(248, 246, 242, 0.95)` + `backdrop-filter: blur(8px)`. Başlangıçta şeffaf (yalnızca hero sayfasında).
- **Logo:** Sanity'den `siteSettings.logo` — fallback: "NUARK MİMARLIK" yazı logo
- **Nav linkleri:** Sanity'den `navigation.items[]` — fallback aşağıda
- **CTA Butonu:** "İletişime Geç" — `/iletisim` sayfasına yönlendirir, gold border + siyah metin, hover'da gold fill

#### Fallback Navigasyon Linkleri
```
Ana Sayfa       → /
Hakkımızda      → /hakkimizda
Projelerimiz    → /projeler
Hizmetlerimiz   → /hizmetlerimiz
Referanslarımız → /referanslar
İletişim        → /iletisim
```

#### Mobil Menü
Hamburger ikonu (3 ince çizgi, DM Sans rengi). Tıklandığında tam ekran overlay — siyah arka plan, merkezlenmiş büyük nav linkleri (Cormorant Garamond, beyaz, 48px), üstte X butonu.

### Footer
- **Arka plan:** `#0A0A0A` (siyah)
- **Metin:** Beyaz / gri tonları
- **Yapı:** 4 kolon (desktop) / 2 kolon (tablet) / 1 kolon (mobil)
  - **Kolon 1 — Marka:** Logo (beyaz versiyon), kısa slogan (1 cümle), sosyal medya ikonları (LinkedIn, Instagram)
  - **Kolon 2 — Sayfalar:** Tüm ana navigasyon linkleri
  - **Kolon 3 — Hizmetler:** Hizmet linkleri (Mimari Tasarım, Proje Yönetimi, İnşaat Denetimi)
  - **Kolon 4 — İletişim:** Adres, telefon, e-posta (Sanity: `siteSettings.contact`)
- **Alt şerit:** "© 2025 Nuark Mimarlık. Tüm hakları saklıdır." — solda. Sağda gizlilik politikası linki (opsiyonel).
- Tüm footer içeriği Sanity `siteSettings` ve `navigation` dökümanlarından gelir.

### Floating Elemanlar
- **WhatsApp Butonu:** Sağ alt köşe, `position: fixed`, yeşil (#25D366) yuvarlak buton, WhatsApp ikonu. Sanity `siteSettings.whatsappNumber` ile link oluşturulur.
- **Scroll Progress Bar:** Sayfa üstünde ince (3px) gold çizgi, okuma ilerlemesini gösterir.

---

## Sanity Şema Özeti

Aşağıdaki Sanity döküman tipleri kullanılır. Agent bu tipleri boilerplate'e uygun şekilde implement eder.

```
siteSettings        → Logo, iletişim bilgileri, WhatsApp no, sosyal medya, SEO defaults
navigation          → Header nav items (label, href, isExternal)
homePage            → Hero, stats, featured projects (ref), services summary, CTA
page (hakkimizda)   → Hero başlığı, intro metni, values[], team[]
project             → Başlık, slug, kapak görseli, kategori, şehir, yıl, açıklama, galeri[], alan m²
service             → Başlık, ikon adı, kısa açıklama, detay metni, süreç adımları[]
reference           → Müşteri adı, logo, sektör, alıntı metni, alıntı sahibi
contactPage         → Adres, telefon, e-posta, harita embed URL, form başlığı
```

---

## Sayfa 1: Ana Sayfa (`/`)

### Sanity Dökümanı: `homePage`

---

### Bölüm 1 — Hero

**Layout:** Tam ekran (`100vh`). İki kolon: Sol %55 içerik, Sağ %45 görsel.

**Sol Taraf (İçerik):**
- Küçük üst etiket (12px, uppercase, letter-spacing, gold rengi):
  Sanity: `homePage.hero.eyebrow` → Fallback: `"MİMARLIK · TASARIM · İNŞAAT"`
- Ana başlık (H1, Cormorant Garamond, ince ama büyük):
  Sanity: `homePage.hero.headline` → Fallback: `"Mekânı tasarlamak,\ngeleceği inşa etmek."`
  Not: Başlık iki satır olarak gösterilir. İkinci satır hafif sağa kayık (text-indent: 2rem) — mimari bir çizgi hissi verir.
- Alt metin (16px, DM Sans, gray-700, max-width: 420px):
  Sanity: `homePage.hero.subtitle` → Fallback: `"Tasarım, proje ve inşaat süreçlerini bütüncül bir bakış açısıyla yönetiyor; yaşanabilir, estetik ve kalıcı mekânlar üretiyoruz."`
- İki CTA butonu yan yana:
  - **Birincil:** "Projelerimizi İnceleyin" → `/projeler`, solid gold arka plan, siyah metin
  - **İkincil:** "Bizimle Çalışın" → `/iletisim`, sadece gold border, şeffaf arka plan
  Sanity: `homePage.hero.primaryCTA`, `homePage.hero.secondaryCTA`

**Sağ Taraf (Görsel):**
- Sanity: `homePage.hero.image` — `next/image`, object-fit: cover, hafif aspect ratio 4/5 (dikey dikdörtgen). Görsel alt köşelerden taşıyor gibi görünür (overflow: visible hafifçe).
- Görselin üzerine sol-alt köşeye ince bir bilgi kiti overlay: Proje adı + yıl (küçük, yarı şeffaf siyah arka plan). Sanity: `homePage.hero.imageCaption`.

**Scroll İndikatör:**
Sayfanın en altında, ortalanmış: ince dikey çizgi (40px, gold) + altında "Keşfet" yazısı (12px, uppercase). Puls animasyonu (opacity 1→0.3→1, 2s infinite).

---

### Bölüm 2 — İstatistik Şeridi

**Layout:** Tam genişlik, `#0A0A0A` arka plan, beyaz metin. 4 sütun.

Her istatistik:
- Büyük sayı (Cormorant Garamond, 64px, gold rengi): `homePage.stats[].value` → Fallback: `"150+"`, `"18"`, `"250K"`, `"12"`
- Alt açıklama (DM Sans, 14px, gray-300): `homePage.stats[].label` → Fallback: `"Tamamlanan Proje"`, `"Yıl Deneyim"`, `"m² Tasarım Alanı"`, `"Şehir"`

**Animasyon:** Scroll görünüme girdiğinde sayaç animasyonu (0'dan hedefe, 1.5s, easeOut). Bir kez çalışır.

---

### Bölüm 3 — Öne Çıkan Projeler

**Layout:** Asimetrik grid.
- Sol: 1 büyük proje kartı (grid-row: span 2) — `55%` genişlik
- Sağ: 2 küçük proje kartı alt alta — `45%` genişlik

**Her proje kartı:**
- Görsel (Sanity `project.coverImage`, `next/image`, object-fit: cover)
- Hover'da overlay: yarı şeffaf siyah arka plan, üstte kategori etiketi (gold), ortada proje adı (beyaz, Cormorant Garamond, 24px), altta "İncele →" linki
- Kart tıklandığında: `/projeler/[slug]`

**Başlık bloğu** (gridden önce):
- Küçük etiket: `"SEÇKİN PROJELERİMİZ"`
- H2: Sanity `homePage.featuredProjectsTitle` → Fallback: `"Hayata geçirdiğimiz mekânlar"`
- Sağda: "Tüm Projeler →" linki (`/projeler`)

Projeler: Sanity `homePage.featuredProjects[]` — `project` referansları, max 3 adet.

---

### Bölüm 4 — Hizmetler Özeti

**Layout:** `--color-gray-100` arka plan. Solda başlık bloğu, sağda 3 hizmet satırı.

**Sol (sticky veya top-aligned):**
- Küçük etiket: `"HİZMETLERİMİZ"`
- H2: Sanity `homePage.servicesSectionTitle` → Fallback: `"Baştan sona\nbütüncül yaklaşım"`
- Paragraf: Sanity `homePage.servicesIntro` → Fallback: `"Her projeyi kavramsal tasarımdan teslimata kadar tek bir çatı altında yönetiyoruz."`
- Link: "Tüm Hizmetlerimiz →" → `/hizmetlerimiz`

**Sağ — Hizmet Satırları (3 adet):**
Kaynak: Sanity `service[]` dökümanlarından ilk 3, veya `homePage.services[]` referansları.

Her satır:
- İnce bir top border (1px, gray-300)
- Sol: İki basamaklı sıra numarası (Cormorant Garamond, 48px, çok açık gray, dekoratif)
- Orta: Başlık (H3, DM Sans, 20px) + tek satır açıklama (gray-700)
- Sağ: Ok ikonu (→), hover'da gold renge döner
- Tüm satır tıklanabilir → `/hizmetlerimiz#[hizmet-slug]`

Fallback hizmetler:
1. `"Mimari Tasarım"` — `"Konseptten detay projeye, her ölçekte tasarım hizmeti"`
2. `"Proje Yönetimi"` — `"Süreç planlaması, ihale, takip ve koordinasyon"`
3. `"İnşaat Denetimi"` — `"Saha denetimi, kalite kontrol ve hakediş yönetimi"`

---

### Bölüm 5 — Kısa Tanıtım / Manifesto

**Layout:** İki kolon. Sol: metin. Sağ: görsel (ofis, çalışma masası, takım).

**Sol:**
- Küçük etiket: `"NEDEN NUARK"`
- H2 (Cormorant Garamond): Sanity `homePage.aboutTitle` → Fallback: `"Her detayda iz bırakan bir mimarlık anlayışı"`
- 2 paragraf metin: Sanity `homePage.aboutText` (portable text) → Fallback: `"Nuark Mimarlık olarak mimariyi salt bir teknik disiplin olarak değil, insanı ve mekânı buluşturan bir yaratım süreci olarak görüyoruz. Her projeye özgün bir bakış açısı, her müşteriye kişiselleştirilmiş bir deneyim getiriyoruz."`
- Link: "Bizi Daha Yakından Tanıyın →" → `/hakkimizda`

**Sağ:**
- Sanity: `homePage.aboutImage` — Dikey dikdörtgen görsel, hafif grayscale filter (mimari ciddiyet).

---

### Bölüm 6 — Referans Logoları

**Layout:** Tam genişlik, `#0A0A0A` arka plan.

- Üstte küçük metin: `"GÜVEN DUYAN MÜŞTERİLERİMİZ"` (beyaz, uppercase, ortalı)
- Logo scroll şeridi: Otomatik hareket eden logo carousel (sonsuz loop, `CSS animation: scroll linear`). Hover'da durur. Logolar beyaz/gri tonda gösterilir (mix-blend-mode veya filter).
- Sanity: `reference[].clientLogo` — tüm referans kayıtlarının logoları
- Fallback: Placeholder metin logoları (firma isimleri tipografik olarak)

---

### Bölüm 7 — CTA Bandı

**Layout:** Tam genişlik, `--color-gold` arka plan (altın sarısı). Siyah metin.

- H2 (Cormorant Garamond): Sanity `homePage.ctaTitle` → Fallback: `"Projenizi birlikte konuşalım"`
- Alt metin: Sanity `homePage.ctaSubtitle` → Fallback: `"Ücretsiz ön görüşme için bugün iletişime geçin."`
- Buton: "İletişime Geçin" → `/iletisim` — siyah arka plan, beyaz metin (gold zemin üzerinde kontrast)

---

## Sayfa 2: Hakkımızda (`/hakkimizda`)

### Sanity Dökümanı: `page` (slug: `hakkimizda`)

---

### Bölüm 1 — Sayfa Hero

**Layout:** Tam genişlik, `#0A0A0A` arka plan, beyaz metin. Yükseklik: `60vh`.

- Küçük etiket (gold): `"HAKKIMIZDA"`
- H1 (Cormorant Garamond, beyaz): Sanity `page.heroHeadline` → Fallback: `"İnsanı merkeze alan bir mimarlık firması"`
- Alt metin (gray-300, max-width: 600px): Sanity `page.heroSubtitle` → Fallback: `"2007'den bu yana tasarım, proje ve inşaat süreçlerinde bütüncül çözümler üretiyoruz."`

Alt köşede: Kuruluş yılı büyük dekoratif yazı (Cormorant Garamond, çok büyük, düşük opacity, `"2007"` gibi).

---

### Bölüm 2 — Firma Hikayesi

**Layout:** İki kolon, `--color-off-white` arka plan.

**Sol (görsel):**
- Sanity: `page.storyImage` — Ofis veya proje görseli, dikey format

**Sağ (metin):**
- Küçük etiket: `"HİKAYEMİZ"`
- H2: Sanity `page.storyTitle` → Fallback: `"Mimarlıkta 18 yıllık birikim"`
- 3–4 paragraf hikaye metni: Sanity `page.storyText` (portable text) → Fallback: Firma kuruluşu, büyümesi, bugünkü konumu anlatan metin.

---

### Bölüm 3 — Değerlerimiz / Felsefemiz

**Layout:** `--color-gray-100` arka plan. Üstte ortalı başlık, altında 3 değer kartı yan yana.

**Üst başlık:**
- Küçük etiket: `"FELSEFEMİZ"`
- H2: Sanity `page.valuesTitle` → Fallback: `"Tasarımımıza rehberlik eden ilkeler"`

**3 Değer Kartı:**
Her kart: beyaz arka plan, ince border, padding. İçerik:
- Dekoratif büyük numara (01, 02, 03) — gold, Cormorant Garamond, 72px, düşük opacity
- Başlık (H3): Sanity `page.values[].title` → Fallback: `"Fonksiyon"`, `"Estetik"`, `"Sürdürülebilirlik"`
- Açıklama (DM Sans, 16px): Sanity `page.values[].description` → Fallback: Kısa açıklama paragrafı

---

### Bölüm 4 — Ekibimiz

**Layout:** `--color-off-white` arka plan.

**Üst:**
- Küçük etiket: `"EKİBİMİZ"`
- H2: Sanity `page.teamTitle` → Fallback: `"Projenizin arkasındaki isimler"`

**Ekip Grid:** 3 veya 4 kolon (kişi sayısına göre responsive).

**Her Ekip Üyesi Kartı:** Sanity `page.team[]`
- `team[].photo` — Siyah-beyaz fotoğraf (CSS filter: grayscale(100%)), hover'da renklenme (filter: grayscale(0%), transition 0.4s)
- `team[].name` — İsim (H3, DM Sans, 18px)
- `team[].title` — Unvan (DM Sans, 14px, gold rengi)
- `team[].bio` — Kısa bio (14px, gray-700, max 2 satır)

Fallback örnek:
```
Ad: "Ahmet Yılmaz"    | Unvan: "Kurucu Ortak / Mimar"
Ad: "Zeynep Kaya"     | Unvan: "Proje Mimarı"
Ad: "Mehmet Demir"    | Unvan: "İnşaat Mühendisi"
```

---

### Bölüm 5 — Kilometre Taşları (Opsiyonel / Toggle edilebilir)

**Layout:** `#0A0A0A` arka plan, beyaz/gold metin. Dikey timeline.

Kaynak: Sanity `page.milestones[]`
Her milestone: `year` (gold, Cormorant Garamond, 32px) + `event` (DM Sans, beyaz, 16px)

Fallback:
```
2007 → Firma kuruluşu, ilk ofis projesi
2012 → İlk büyük konut projesi (120 daire)
2016 → Ticari mimarlık alanına genişleme
2020 → 100. proje tamamlandı
2024 → Yeni ofis, 12 kişilik ekip
```

---

## Sayfa 3: Projelerimiz (`/projeler`)

### Sanity Dökümanı: `project` (liste)

---

### Bölüm 1 — Sayfa Hero

**Layout:** Tam genişlik, `#0A0A0A` arka plan, beyaz metin. `50vh`.

- Küçük etiket (gold): `"PROJELERİMİZ"`
- H1 (Cormorant Garamond, beyaz): `"Hayata geçirdiğimiz mekânlar"`

---

### Bölüm 2 — Filtre Barı

**Layout:** Sticky, scroll'da header'ın hemen altında sabitlenir. `--color-off-white` arka plan + ince alt border.

Filtre butonları (pill şeklinde): "Tümü" aktifken gold background. Seçili değilken şeffaf + gray border.

Sanity: `project.category` değerlerinden dinamik olarak oluşturulur.

Fallback kategoriler:
```
Tümü | Konut | Ticari | Ofis | Karma Kullanım | Kentsel Dönüşüm
```

**Davranış:** Filtre seçildiğinde URL güncellenir (`?kategori=konut`), sayfa yenilenmez. Seçilen kategoriye uymayan kartlar fade out olur.

---

### Bölüm 3 — Proje Grid

**Layout:** 3 kolon grid (desktop) / 2 kolon (tablet) / 1 kolon (mobil). `--color-off-white` arka plan.

**Her Proje Kartı:** Sanity `project` dökümanı
- `project.coverImage` — `next/image`, aspect-ratio: 4/3, object-fit: cover
- `project.category` — Küçük etiket (gold, 12px, uppercase), görselin üzerinde sol-üst köşe
- `project.title` — Proje adı (DM Sans, 18px, font-weight 500), görselin altında
- `project.city` + `project.year` — Yan yana, gri, 14px
- Hover: Kart hafifçe yukarı kayar (`transform: translateY(-4px)`), görsel hafifçe yakınlaşır (scale: 1.03)
- Tıklandığında: `/projeler/[project.slug]`

---

## Sayfa 4: Proje Detay (`/projeler/[slug]`)

### Sanity Dökümanı: `project` (tekil)

---

### Bölüm 1 — Kapak Görseli

Tam genişlik, `80vh` yüksekliğinde kapak görseli. `next/image`, object-fit: cover. Üzerinde hafif siyah gradient overlay (alttan). Sol-altta proje adı (beyaz, Cormorant Garamond, büyük) ve etiket (gold, category).

Kaynak: `project.coverImage`, `project.title`, `project.category`

---

### Bölüm 2 — Proje Bilgileri

**Layout:** İki kolon. Sol %65 metin, Sağ %35 teknik bilgiler.

**Sol:**
- H2: `"Proje Hakkında"` (veya Sanity `project.aboutTitle`)
- Uzun açıklama metni: `project.description` (portable text)

**Sağ — Teknik Bilgi Listesi:**
Beyaz kart, ince border.
- `project.location` — **Konum**
- `project.year` — **Yıl**
- `project.area` — **Alan** (örn. `"4.500 m²"`)
- `project.duration` — **Süre** (örn. `"18 ay"`)
- `project.services[]` — **Verilen Hizmetler** (etiketler olarak)

Fallback değerler yukarıdaki format ile.

---

### Bölüm 3 — Fotoğraf Galerisi

**Layout:** Masonry veya eşit grid (2-3 kolon). Görseller tıklandığında lightbox açılır (klavye navigasyonlu, ESC ile kapanır).

Kaynak: `project.gallery[]` — her biri `image` tipinde, `next/image` ile.

---

### Bölüm 4 — Önceki / Sonraki Proje Navigasyonu

Alt bölüm: İki kolon, solda önceki proje, sağda sonraki proje.
Her biri: Küçük görsel thumbnail + "← Önceki Proje" veya "Sonraki Proje →" + proje adı.

---

### Bölüm 5 — CTA

Basit bir bant: `"Bu projeye benzer bir mekân hayal ediyorsunuz?"` + `"İletişime Geçin"` butonu.

---

## Sayfa 5: Hizmetlerimiz (`/hizmetlerimiz`)

### Sanity Dökümanı: `service[]`

---

### Bölüm 1 — Sayfa Hero

**Layout:** `--color-off-white` arka plan. Asimetrik. Sol: metin. Sağ: büyük Cormorant Garamond dekoratif sözcük `"Hizmetler"` ghost text (outline only, çok büyük, low opacity).

- Küçük etiket (gold): `"HİZMETLERİMİZ"`
- H1: `"Konseptten teslimata bütüncül mimarlık hizmeti"`
- Alt metin: `"Her projeyi kendi uzmanlık alanımız dahilinde, başından sonuna kadar yönetiyoruz."`

Sanity: `page.heroHeadline`, `page.heroSubtitle` (slug: `hizmetlerimiz`)

---

### Bölüm 2 — Sayfa İçi Navigasyon

Sticky bar (header altında). Hizmetlerin kısa adlarını gösteren anchor linkler. Tıklandığında smooth scroll.

Kaynak: `service[].title` ve `service[].slug`

---

### Bölüm 3 — Hizmet Bölümleri (Her Hizmet İçin)

Her hizmet için ayrı bir tam bölüm, sırayla. Tek sayfalık scroll deneyimi.

**Hizmet Bölümü Yapısı:**
- Bölüm arka planı: Tek-çift sıra almaşık (`--color-off-white` ve `--color-gray-100`)
- **Sol (veya üst):** Numara + Başlık + Açıklama
  - Büyük dekoratif numara (01, 02, 03) — gold, Cormorant Garamond, 120px, düşük opacity
  - H2: `service.title` → Fallback: `"Mimari Tasarım"`
  - Açıklama (portable text): `service.longDescription` → Fallback detay paragrafları
- **Sağ:** Süreç adımları listesi veya görsel

**Süreç Adımları:**
Her hizmetin alt kısmında `service.steps[]` → numaralı adımlar:
- Adım numarası (gold, küçük)
- Adım başlığı (DM Sans, 16px, bold)
- Kısa açıklama (14px, gray-700)

Fallback Hizmet 1 — Mimari Tasarım:
```
Adım 1: Ön Görüşme ve İhtiyaç Analizi
Adım 2: Konsept Tasarım Alternatifleri
Adım 3: Şematik Tasarım
Adım 4: Avan Proje
Adım 5: Uygulama Projesi
```

Fallback Hizmet 2 — Proje Yönetimi:
```
Adım 1: Proje Takvimi ve Bütçe Planlaması
Adım 2: İhale Süreci ve Yüklenici Seçimi
Adım 3: Koordinasyon Toplantıları
Adım 4: İlerleme Raporlaması
Adım 5: Teslim ve Kapanış
```

Fallback Hizmet 3 — İnşaat Denetimi:
```
Adım 1: Şantiye Kurulumu ve Kontrol Planı
Adım 2: Haftalık Saha Ziyaretleri
Adım 3: Kalite Kontrol Tutanakları
Adım 4: Hakediş İncelemesi
Adım 5: Kesin Kabul
```

---

### Bölüm 4 — Süreç Özeti (Tüm Hizmetleri Kapsayan)

**Layout:** `#0A0A0A` arka plan. Yatay adım zinciri (desktop) / dikey (mobil).

Başlık: `"Bir projenin anatomisi"` (Cormorant Garamond, beyaz)

5 evrensel adım:
```
1. İlk Görüşme  →  2. Konsept  →  3. Proje  →  4. İnşaat  →  5. Teslim
```
Her adım arası ince gold çizgi. Her adımda: numara (gold, büyük) + adım adı (beyaz) + kısa açıklama (gray-300, 13px).

---

## Sayfa 6: Referanslarımız (`/referanslar`)

### Sanity Dökümanı: `reference[]`

---

### Bölüm 1 — Sayfa Hero

`#0A0A0A` arka plan, `50vh`.
- Küçük etiket (gold): `"REFERANSLARIMIZ"`
- H1 (beyaz, Cormorant Garamond): `"Güvendikleri için teşekkür ediyoruz"`

---

### Bölüm 2 — Müşteri Logoları

**Layout:** `--color-off-white` arka plan.

Opsiyonel kategori filtreleme (Kurumsal / Bireysel / Tümü).

Logo grid: 4–5 kolon (desktop), 3 kolon (tablet), 2 kolon (mobil).

**Her Logo Kartı:**
- Beyaz kart, ince border, padding
- `reference.clientLogo` — `next/image`, object-fit: contain, grayscale filter (hover'da renkli)
- `reference.clientName` — İsim (14px, gray-700, altında ortalı)
- Hover: logo renkli + kart hafif yükselir

Kaynak: `reference[].clientLogo`, `reference[].clientName`, `reference[].sector`

---

### Bölüm 3 — Müşteri Yorumları

**Layout:** `--color-gray-100` arka plan. 3 kart yan yana (desktop), 1 kart (mobil).

**Her Yorum Kartı:**
- Üstte büyük tırnak işareti (Cormorant Garamond, 80px, gold, dekoratif)
- Alıntı metni: `reference.quote` (italic, Cormorant Garamond, 20px) → Fallback: `"Nuark ekibi projenin her aşamasında profesyonelliği ve iletişim kalitesiyle beklentilerimizin ötesine geçti."`
- Alt: `reference.quotePerson` + `reference.clientName` — Ad Soyad, Firma (DM Sans, 14px, gray-700)
- Opsiyonel: `reference.quotePerson.photo` — Küçük yuvarlak fotoğraf

---

### Bölüm 4 — Rakamlarla Nuark

**Layout:** Tam genişlik, `#0A0A0A` arka plan. 3 büyük metrik yan yana (istatistik şeridine benzer ama daha az sayıda, daha büyük).

Kaynak: Sanity `siteSettings.stats[]` veya sabit değerler.

Fallback:
- `%94` → `"Müşteri Memnuniyeti"`
- `%60` → `"Tekrarlayan Müşteri Oranı"`
- `150+` → `"Tamamlanan Proje"`

---

## Sayfa 7: İletişim (`/iletisim`)

### Sanity Dökümanı: `contactPage`

---

### Bölüm 1 — Sayfa Hero

**Layout:** Sade, `--color-off-white`. `40vh`. Ortalı veya sol hizalı.

- Küçük etiket (gold): `"İLETİŞİM"`
- H1: `contactPage.heroHeadline` → Fallback: `"Projenizi konuşalım"`
- Alt metin: `contactPage.heroSubtitle` → Fallback: `"İlk görüşme ücretsiz. Bize ulaşın, size en kısa sürede dönelim."`

---

### Bölüm 2 — İletişim Formu + Bilgiler

**Layout:** İki kolon. Sol %40 iletişim bilgileri, Sağ %60 form.

---

**Sol — Bilgiler:**

Her bilgi satırı: İnce SVG ikon (mimari/minimal) + metin.

- **Adres:** `contactPage.address` → Fallback: `"Örnek Mah. Mimarlık Cad. No:1, Kat:3, Kadıköy / İstanbul"`
- **Telefon:** `contactPage.phone` → Fallback: `"+90 (216) 000 00 00"`
- **E-posta:** `contactPage.email` → Fallback: `"info@nuarkmimarlik.com"`
- **Çalışma Saatleri:** `contactPage.workingHours` → Fallback: `"Pazartesi–Cuma: 09:00–18:00"`

WhatsApp CTA butonu (yeşil, tam genişlik): `"WhatsApp ile Yazın"` → `https://wa.me/[contactPage.whatsappNumber]`

Sosyal medya ikonları (LinkedIn, Instagram): `siteSettings.social`

---

**Sağ — İletişim Formu:**

Form başlığı: `contactPage.formTitle` → Fallback: `"Mesaj Gönderin"`

Form alanları:
```
Ad Soyad        → text input, gerekli
E-posta         → email input, gerekli
Telefon         → tel input, opsiyonel
Proje Tipi      → select dropdown
                  Seçenekler: Konut | Ticari | Ofis | Karma | Diğer
                  Sanity: contactPage.projectTypes[]
Mesajınız       → textarea, min 4 satır, gerekli
```

Gönder butonu: `"Mesajı Gönder"` — solid gold, tam genişlik, hover'da koyu gold.

**Validasyon:** Boş gerekli alanlar için kırmızı border + hata mesajı (DM Sans, 13px, red). Başarılı gönderimde form gizlenir, yeşil başarı mesajı gösterilir: `"Mesajınız alındı. En kısa sürede size döneceğiz."`

Form gönderimi: Next.js API route (`/api/contact`) üzerinden. Mail servisi (Resend veya Nodemailer). `contactPage.recipientEmail` alıcı adresi olarak kullanılır.

---

### Bölüm 3 — Harita

Tam genişlik, `400px` yükseklik.

`contactPage.mapEmbedUrl` — Google Maps embed URL (iframe). Özelleştirilmiş: mümkünse koyu/monokromatik harita stili. Fallback: Standart Google Maps embed.

---

## Genel Notlar (Agent için)

### Görsel Fallback Stratejisi
Sanity'den görsel gelmediğinde `next/image` yerine placeholder div kullanılır:
- Arka plan: `--color-gray-100`
- İçinde: "Görsel Yükleniyor" veya Nuark logosu

### Sanity Query Stratejisi
- Ana sayfa için: tek bir GROQ query ile tüm `homePage` dökümanı ve referanslar çekilir
- Proje listesi için: `_type == "project"` sorgusu, filtre için `category` alanı kullanılır
- Proje detayı için: `slug.current == $slug` ile tekil sorgu

### SEO
Her sayfa için:
- `title`: Sanity `page.seoTitle` || `page.title + " | Nuark Mimarlık"`
- `description`: Sanity `page.seoDescription` → sayfa özetinden türetilir
- `og:image`: Sanity `page.ogImage` || `page.heroImage` || `siteSettings.defaultOgImage`

### Responsive Breakpoints
```
Mobile:  < 768px
Tablet:  768px – 1024px
Desktop: > 1024px
```

### Erişilebilirlik
- Tüm görsellerde `alt` text: Sanity `image.alt` alanından
- Butonlarda `aria-label`
- Renk kontrastı WCAG AA standardına uygun
- Klavye navigasyonu (lightbox, menü)
