import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { GitHubIcon } from "@/components/brand-icons";
import { TechBadge } from "@/components/tech-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Project } from "@/types";

export function OtherProjects({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <div className="rounded-xl border border-dashed bg-background/50 px-6 py-10 text-center">
        <p className="text-sm font-medium">Próximamente se agregarán proyectos documentados.</p>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
          Esta sección está preparada para proyectos académicos y experimentos cuando exista información verificada sobre ellos.
        </p>
      </div>
    );
  }

  return (
    <div className={projects.length <= 2 ? "grid gap-4 sm:grid-cols-2" : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"}>
      {projects.map((project) => (
        <Card className="group overflow-hidden transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-md" key={project.slug}>
          <Link
            aria-label={`Ver caso de estudio: ${project.title}`}
            className="relative block aspect-[16/9] overflow-hidden border-b bg-muted"
            href={`/proyectos/${project.slug}`}
          >
            <Image
              alt={project.imageAlt}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
              fill
              sizes="(max-width: 640px) 100vw, 640px"
              src={project.image}
            />
          </Link>
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{project.type}</Badge>
                <Badge variant="secondary">{project.year}</Badge>
              </div>
              {project.repositoryUrl ? (
                <a aria-label={`Repositorio de ${project.title}`} className="rounded-sm text-muted-foreground hover:text-foreground" href={project.repositoryUrl} rel="noreferrer" target="_blank">
                  <GitHubIcon className="size-4" />
                </a>
              ) : null}
            </div>
            <CardTitle className="pt-3 text-lg">
              <Link className="underline-offset-4 hover:underline" href={`/proyectos/${project.slug}`}>{project.title}</Link>
            </CardTitle>
            <p className="text-sm leading-6 text-muted-foreground">{project.shortDescription}</p>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {project.stack.slice(0, 3).map((item) => <TechBadge key={item}>{item}</TechBadge>)}
          </CardContent>
          <CardFooter className="mt-auto justify-between gap-4">
            <Link className="inline-flex items-center gap-2 text-sm font-medium hover:underline" href={`/proyectos/${project.slug}`}>
              Ver detalles <ArrowUpRight className="size-4" />
            </Link>
            {project.liveUrl ? (
              <a className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground hover:underline" href={project.liveUrl} rel="noreferrer" target="_blank">
                Ver sitio <ArrowUpRight className="size-4" />
              </a>
            ) : null}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
