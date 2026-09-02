import { TechBadge } from "@/components/tech-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { technologies } from "@/data/stack";
import type { TechnologyCategory } from "@/types";

const categories: TechnologyCategory[] = [
  "Frontend",
  "Backend",
  "Bases de datos",
  "Arquitectura y desarrollo",
  "DevOps e infraestructura",
  "Herramientas",
];

export function StackSection() {
  return (
    <section className="container-shell section-spacing border-t" id="stack">
      <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
        <div>
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">03 / Stack</p>
          <h2 className="text-balance mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
            Tecnologías para construir soluciones completas.
          </h2>
          <p className="mt-4 max-w-md leading-7 text-muted-foreground">
            Herramientas que utilizo en frontend, backend, datos, arquitectura y despliegue de aplicaciones empresariales.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {categories.map((category) => (
            <Card className="bg-card/65" key={category}>
              <CardHeader className="pb-4">
                <CardTitle className="text-sm">{category}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {technologies
                  .filter((technology) => technology.category === category)
                  .map((technology) => (
                    <TechBadge key={technology.name}>{technology.name}</TechBadge>
                  ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
