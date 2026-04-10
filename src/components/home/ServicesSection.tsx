import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/button";

interface ServicesSectionProps {
  data: any;
}

export function ServicesSection({ data }: ServicesSectionProps) {
  return (
    <section className="py-24 md:py-32 bg-brand-black text-brand-off-white border-y border-white/10">
      <div className="container mx-auto px-4">
        <FadeIn direction="up" className="max-w-3xl mx-auto text-center mb-16">
          <span className="block text-brand-accent font-sans text-xs font-bold tracking-widest uppercase mb-4">UZMANLIK</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-6">{data?.servicesSectionTitle || "Mimari & Tasarım Hizmetleri"}</h2>
          <p className="text-white/70 text-lg leading-relaxed">{data?.servicesIntro || "Tasarım aşamasından inşaatın tamamlanmasına kadar, sürdürülebilir ve estetik çözümler sunarak hayalinizdeki projeleri gerçeğe dönüştürüyoruz."}</p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
          {[
            { title: "Mimari Tasarım", desc: "Özgün ve vizyoner yapı tasarımları." },
            { title: "İç Mimari", desc: "Yaşam kalitesini artıran fonksiyonel iç mekanlar." },
            { title: "Proje Yönetimi", desc: "Zamanında ve bütçeye uygun kusursuz yönetim." },
            { title: "İnşaat Uygulama", desc: "Tasarımı hayata geçiren detaylı anahtar teslim uygulamalar." },
          ].map((service, i) => (
            <div key={i} className="bg-brand-black p-10 lg:p-12 group hover:bg-white/5 transition-colors duration-300">
              <span className="text-brand-accent text-3xl font-serif font-bold block mb-6 opacity-50 group-hover:opacity-100 transition-opacity">0{i+1}</span>
              <h3 className="text-xl font-serif font-bold mb-4">{service.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
           <Link href="/hizmetlerimiz">
            <Button className="rounded-none bg-brand-accent text-brand-black hover:bg-white hover:text-black uppercase tracking-widest text-xs h-12 px-8 font-bold border-transparent">
              Hizmetlerimizi İnceleyin
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
