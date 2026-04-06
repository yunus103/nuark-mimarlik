import { revalidateTag, revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get(SIGNATURE_HEADER_NAME);
    if (!signature) {
      return NextResponse.json({ message: "No signature provided" }, { status: 401 });
    }

    const body = await request.text();
    const secret = process.env.SANITY_WEBHOOK_SECRET;

    if (!secret) {
      console.error("SANITY_WEBHOOK_SECRET is not set");
      return NextResponse.json({ message: "Secret not configured" }, { status: 500 });
    }

    // Doğrulama işlemi
    if (!isValidSignature(body, signature, secret)) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    const payload = JSON.parse(body);
    const type = payload._type;
    const slug = payload.slug?.current;

    console.log(`[Sanity Revalidate] Type: ${type}, Slug: ${slug || "none"}`);

    // Projenizdeki Tag (Etiket) Map'i
    const tagMap: Record<string, string[]> = {
      siteSettings: ["layout"],
      navigation: ["layout"],
      homePage: ["home"],
      aboutPage: ["about"],
      contactPage: ["contact"],
      blogPost: ["blog"],
      service: ["services"],
      project: ["projects"],
      legalPage: ["legal"],
    };

    const tags = tagMap[type] || ["layout"];

    // Etiketlere göre yenile (Granular)
    tags.forEach((tag) => {
      // @ts-ignore
      revalidateTag(tag, { expire: 0 });
      console.log(`Revalidated tag: ${tag}`);
    });

    // Eğer dökümanın kendine has bir slug'ı varsa onu da yenileyebiliriz (Opsiyonel)
    if (type && slug) {
      // @ts-ignore
      revalidateTag(`${type}:${slug}`, { expire: 0 });
      console.log(`Revalidated slug tag: ${type}:${slug}`);
    }


    // Global ayarlar değiştiyse path bazlı da yenileyelim
    if (type === "siteSettings" || type === "navigation") {
      revalidatePath("/", "layout");
      console.log("Revalidated path: / (layout)");
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err: any) {
    console.error("Revalidation error:", err);
    return NextResponse.json(
      { message: "Hata oluştu", error: err.message },
      { status: 500 },
    );
  }
}


