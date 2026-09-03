import { HeroCarousel, type HeroCarouselItem } from "@/components/ui/hero-carousel";
import { allProjects } from "@/data/projects";

const presentation: Record<string, { accent: string }> = {
  "plataforma-empresarial-erp-crm-pos": {
    accent: "#10b981",
  },
  "sitio-corporativo-catalogo-jorial": {
    accent: "#06b6d4",
  },
  "metal-festival-landing-page": {
    accent: "#d97706",
  },
};

const carouselItems: HeroCarouselItem[] = allProjects.map((project) => ({
  id: project.slug,
  title: project.title,
  description: project.shortDescription,
  image: project.image,
  imageAlt: project.imageAlt,
  href: `/proyectos/${project.slug}`,
  credit: project.type,
  meta: [project.year, ...project.stack.slice(0, 2)],
  accent: presentation[project.slug]?.accent,
}));

export function ProjectScrollStory() {
  return (
    <section className="border-y" id="proyectos">
      <div className="h-[calc(100svh-5rem)] min-h-[40rem] max-h-[58rem]">
        <HeroCarousel
          ariaLabel="Carrusel editorial de proyectos. Desliza horizontalmente, arrastra o presiona las flechas izquierda y derecha."
          brand="Code Strokes / Trabajo seleccionado"
          items={carouselItems}
        />
      </div>
    </section>
  );
}
