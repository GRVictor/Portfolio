import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { ExperienceItem } from "@/components/experience-item";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { experiences } from "@/data/experience";

export function ExperienceSection() {
  return (
    <section className="border-t bg-muted/20">
      <div className="container-shell section-spacing grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
        <div>
          <SectionHeader
            description="Experiencia práctica construyendo y evolucionando software para operaciones empresariales reales."
            eyebrow="02 / Experiencia"
            title="Software aplicado al negocio."
          />
          <Button asChild className="mt-7 -ml-4" variant="ghost">
            <Link href="/sobre-mi">Ver trayectoria completa <ArrowRight /></Link>
          </Button>
        </div>
        <div>
          {experiences.map((experience) => (
            <ExperienceItem experience={experience} key={`${experience.company}-${experience.role}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
