import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { ProjectGrid } from "@/components/project-grid";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { featuredProjects } from "@/data/projects";

export function FeaturedProjects() {
  return (
    <section className="container-shell section-spacing" id="proyecto-destacado">
      <div className="mb-10 flex flex-col gap-6 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeader
          description="Un sistema empresarial construido de extremo a extremo para centralizar operaciones, automatizar procesos y acompañar el crecimiento de la plataforma."
          eyebrow="01 / Proyecto principal"
          title="Ingeniería aplicada a una operación real."
        />
        <Button asChild className="w-fit" variant="outline">
          <Link href="/proyectos">
            Ver todos los proyectos <ArrowRight />
          </Link>
        </Button>
      </div>
      <ProjectGrid projects={featuredProjects} />
    </section>
  );
}
