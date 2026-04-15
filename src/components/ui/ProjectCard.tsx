import Link from "next/link";
import { SanityImage } from "./SanityImage";
import { 
  RiHome4Line, 
  RiStore2Line, 
  RiBuilding4Line, 
  RiLayoutGridLine, 
  RiHammerLine, 
  RiPaletteLine, 
  RiBookOpenLine, 
  RiHeartPulseLine, 
  RiStackLine,
  RiFocus2Line
} from "react-icons/ri";

interface ProjectCardProps {
  project: any;
  priority?: boolean;
}

const categoryIcons: Record<string, React.ReactNode> = {
  "Konut": <RiHome4Line size={20} />,
  "Ticari": <RiStore2Line size={20} />,
  "Ofis": <RiBuilding4Line size={20} />,
  "Karma Kullanım": <RiLayoutGridLine size={20} />,
  "Kentsel Dönüşüm": <RiHammerLine size={20} />,
  "Kültür & Sanat": <RiPaletteLine size={20} />,
  "Eğitim": <RiBookOpenLine size={20} />,
  "Sağlık": <RiHeartPulseLine size={20} />,
  "Endüstriyel": <RiStackLine size={20} />,
};

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const Icon = categoryIcons[project.category] || <RiFocus2Line size={20} />;

  return (
    <Link 
      href={`/projeler/${project.slug?.current}`} 
      className="group block w-full mb-8"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted mb-4">
        {project.coverImage ? (
          <SanityImage
            image={project.coverImage}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">Görsel Yok</div>
        )}
      </div>

      <div className="flex items-start gap-3 px-1">
        {/* Black Icon Box */}
        <div className="flex-shrink-0 w-12 h-12 bg-black text-white flex items-center justify-center">
          {Icon}
        </div>

        {/* Text Content */}
        <div className="flex flex-col justify-center min-h-[48px]">
          <h3 className="text-base md:text-lg font-brand leading-tight text-foreground transition-colors group-hover:text-brand-accent">
            {project.title}
          </h3>
          <p className="text-[10px] md:text-xs font-sans font-medium uppercase tracking-widest text-muted-foreground mt-0.5">
            {project.city || "KONUM BELİRTİLMEDİ"}
            {project.country ? `, ${project.country}` : ""}
          </p>
        </div>
      </div>
    </Link>
  );
}
