import type { Metadata } from "next";

import { OtherProjects } from "@/components/other-projects";
import { PageIntro } from "@/components/page-intro";
import { ProjectGrid } from "@/components/project-grid";
import { SectionHeader } from "@/components/section-header";
import { featuredProjects, otherProjects } from "@/data/projects";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Proyectos",
  description: "Proyectos full-stack documentados por el problema resuelto, la arquitectura, la implementación y el impacto.",
  path: "/proyectos",
});

export default function ProjectsPage() {
  return (
    <>
      <PageIntro
        description="Cada caso presenta el problema operativo, la solución construida y mi participación técnica, sin exponer información privada ni atribuir resultados no verificados."
        path="/proyectos"
        title="Software explicado más allá de la interfaz."
      />
      <section className="container-shell pb-20 sm:pb-24">
        <h2 className="sr-only">Proyecto profesional destacado</h2>
        <ProjectGrid projects={featuredProjects} />
      </section>
      <section className="border-t bg-muted/25">
        <div className="container-shell section-spacing">
          <SectionHeader
            className="mb-10"
            description="Espacio preparado para documentar proyectos académicos, experimentos y pruebas de concepto a partir de información real."
            eyebrow="Archivo"
            title="Otros proyectos"
          />
          <OtherProjects projects={otherProjects} />
        </div>
      </section>
    </>
  );
}
