import { client } from "@/sanity/lib/client";
import { layoutQuery } from "@/sanity/lib/queries";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Floaters } from "@/components/layout/Floaters";
import { Analytics, GtmNoscript } from "@/components/layout/Analytics";
import { JsonLd, organizationJsonLd } from "@/components/seo/JsonLd";
import IntroAnimation from "@/components/ui/IntroAnimation";
import { draftMode } from "next/headers";
import Link from "next/link";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const data = await client.fetch(layoutQuery, {}, { next: { tags: ["layout"] } });
  const isDraft = (await draftMode()).isEnabled;

  return (
    <>
      <IntroAnimation
        logo={data?.settings?.logo}
        logoText={data?.settings?.logoText}
        siteName={data?.settings?.siteName}
      />
      {isDraft && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-400 text-yellow-900 text-center text-sm py-2 font-medium">
          Önizleme modu aktif.{" "}
          <Link href="/api/draft/disable" className="underline font-bold">
            Çıkmak için tıkla
          </Link>
        </div>
      )}
      <JsonLd data={organizationJsonLd(data?.settings)} />
      <Header settings={data?.settings} navigation={data?.navigation} />
      <Analytics gaId={data?.settings?.gaId} gtmId={data?.settings?.gtmId} />
      <GtmNoscript gtmId={data?.settings?.gtmId} />
      <main>{children}</main>
      <Footer settings={data?.settings} navigation={data?.navigation} />
      <Floaters 
        whatsappNumber={data?.settings?.contactInfo?.whatsappNumber} 
        showWhatsappButton={data?.settings?.contactInfo?.showWhatsappButton}
      />
    </>
  );
}
