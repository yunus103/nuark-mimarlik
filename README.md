<div align="right">
  <img src="https://img.shields.io/badge/English_EN-2563EB?style=for-the-badge" alt="English" />
  <a href="./README.tr.md">
    <img src="https://img.shields.io/badge/Türkçe_TR-374151?style=for-the-badge" alt="Türkçe" />
  </a>
</div>

# Nuark Mimarlık — Digital Architecture & Corporate Platform

A modern, high-performance web platform and digital portfolio engineered for **Nuark Mimarlık** (Nuark Architecture). The application is built with a **Refined Brutalism** design language, blending architectural elegance with cutting-edge web performance, headless content architecture, granular on-demand caching, and automated SEO systems.

---

## 🏛️ Architecture & Tech Stack

| Domain | Technology | Description & Role |
| :--- | :--- | :--- |
| **Framework** | **Next.js 16 (App Router)** | Server Components (RSC), React 19, Turbopack, modular routing |
| **Headless CMS** | **Sanity Studio v3** | Embedded CMS at `/studio`, typed schema definitions, singletons & collections |
| **Styling & UI** | **Tailwind CSS v4** | CSS variables, typography plugin, Base UI primitives & custom design system |
| **Motion & UX** | **Framer Motion** | Scroll-driven animations, interactive Lightbox, smooth transitions |
| **Type Safety & Env** | **TypeScript 5 + Zod** | End-to-end type safety, runtime schema validation via `@t3-oss/env-nextjs` |
| **Caching & ISR** | **Next.js On-Demand ISR** | Webhook-driven tag-based revalidation (`revalidateTag`, `revalidatePath`) |
| **Communications** | **Nodemailer** | Secure SMTP contact form submission with server-side validation |
| **SEO & Structured Data**| **Next.js Metadata + JSON-LD** | Dynamic OpenGraph images, Schema.org entities, dynamic sitemap & robots |

---

## 💎 Core Modules & Functional Features

- **Portfolio & Project Showcase (`/projeler`, `/projeler/[slug]`):** Filterable architectural project directory with metadata (location, surface area, typology, year), rich editorial narratives, and an interactive full-screen image Lightbox.
- **Service Modules (`/hizmetlerimiz`):** Structured architectural service offerings with step-by-step methodologies and contextual accordion FAQs.
- **Corporate Narrative & Team (`/hakkimizda`):** Studio philosophy, architectural values, animated statistics counters, and leadership profiles.
- **Client References & Testimonials (`/referanslar`):** Client logo marquee and verified testimonials fetched dynamically from Sanity CMS.
- **Architectural Journal / Blog (`/blog`, `/blog/[slug]`):** Portable Text rich-text publications with syntax highlighting, custom callouts, and author metadata.
- **Inquiry & Quick Access (`/iletisim`, `/sosyal`):** SMTP-powered contact form with client/server validation, Google Maps integration, floating WhatsApp CTA, and a dedicated social link hub (`/sosyal`).

---

## 🧭 Routing & App Architecture

The project leverages Next.js App Router route groups to cleanly decouple public presentation layers from administrative and API routes:

- `(site)/`: Public layout wrapping navigation, theme providers, floaters, and footer.
- `studio/[[...tool]]/`: Full-featured embedded Sanity Studio directly within the Next.js runtime.
- `sosyal/`: Standalone, distraction-free social media landing page (Bio link tree).
- `api/`:
  - `/api/revalidate`: Webhook handler for instant CMS content invalidation.
  - `/api/contact`: Form processing endpoint with SMTP integration.
  - `/api/draft/*`: Draft Mode activation/deactivation for real-time editorial previews.

---

## ⚡ Caching, ISR & SEO Engine

### Granular On-Demand Revalidation
Content updates in Sanity CMS trigger the `/api/revalidate` endpoint. Payload signatures are validated via HMAC-SHA256 (`@sanity/webhook`). Cache tags are invalidated instantaneously without full-site rebuilds:
- Tag mappings: `siteSettings` & `navigation` → `layout`, `project` → `projects`, `blogPost` → `blog`, etc.
- Granular slug-level invalidation (`project:slug`).

### Search Engine Optimization (SEO) Standards
- **Centralized Metadata Generator (`src/lib/seo.ts`):** Dynamically constructs titles, descriptions, canonical URLs, and OpenGraph/Twitter card assets using the Sanity Image Pipeline (`urlForImage`).
- **Structured Data (`src/components/seo/JsonLd.tsx`):** Injects Schema.org `Organization` and `Article` schemas into page headers.
- **Dynamic XML Sitemap (`src/app/sitemap.ts`):** Automatically discovers static routes and dynamic project/blog slugs with `_updatedAt` timestamps.

---

## 📂 Project Directory Structure

```text
src/
├── app/
│   ├── (site)/               # Public-facing application pages
│   │   ├── blog/             # Editorial listings & [slug] dynamic posts
│   │   ├── galeri/           # Architectural media gallery
│   │   ├── hakkimizda/       # Studio profile, values & team
│   │   ├── hizmetlerimiz/    # Architectural services & process
│   │   ├── iletisim/         # Contact page & interactive form
│   │   ├── projeler/         # Portfolio grid & [slug] project details
│   │   ├── referanslar/      # References & client feedback
│   │   ├── layout.tsx        # Main site shell (Header, Footer, Floaters)
│   │   └── page.tsx          # Homepage with dynamic hero, stats & marquee
│   ├── api/                  # Serverless route handlers (revalidate, contact, draft)
│   ├── sosyal/               # Dedicated social media link gateway
│   ├── studio/               # Embedded Sanity Studio CMS
│   ├── sitemap.ts            # Dynamic XML sitemap generator
│   └── robots.ts             # Dynamic robots.txt
├── components/
│   ├── forms/                # Contact form component & validation
│   ├── home/                 # Modular home page sections
│   ├── layout/               # Header, Footer, Floaters, ThemeProvider
│   ├── seo/                  # JSON-LD Schema.org generators
│   └── ui/                   # ProjectLightbox, SanityImage, RichText, UI primitives
├── lib/
│   ├── env.ts                # Strict runtime environment validation (T3 Env + Zod)
│   ├── seo.ts                # Metadata builder utility
│   └── utils.ts              # Class merging (clsx + tailwind-merge) & formatters
└── sanity/
    ├── lib/                  # Client initialization, queries & image builder
    ├── plugins/              # Singleton page plugins & custom desk controls
    ├── schemaTypes/          # Document, singleton & object schemas
    └── structure.ts          # Studio panel hierarchy & desk structure
```

---

## 🔒 Security & Engineering Standards

- **Environment Isolation:** Zero leakage of secret keys (`SANITY_API_READ_TOKEN`, `SMTP_PASS`, `SANITY_WEBHOOK_SECRET`) enforced via `@t3-oss/env-nextjs` and `zod`.
- **Webhook Authenticity:** Constant-time HMAC cryptographic verification ensures revalidation triggers originate exclusively from Sanity servers.
- **Server-First Execution:** Heavy Sanity GROQ queries execute on the server, serving static/streaming HTML with minimal client-side JavaScript footprint.
- **Accessibility & UX:** Semantic HTML5 markup, WCAG-compliant color contrasts, keyboard-navigable Lightbox, and fluid typography (`clamp()`).
