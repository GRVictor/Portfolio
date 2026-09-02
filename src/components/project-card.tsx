import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { GitHubIcon } from "@/components/brand-icons";
import { TechBadge } from "@/components/tech-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Project } from "@/types";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Card className="group overflow-hidden transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-lg md:grid md:grid-cols-[1.1fr_0.9fr]">
      <div className="relative aspect-[16/10] overflow-hidden border-b bg-muted md:aspect-auto md:min-h-[30rem] md:border-r md:border-b-0">
        <Image
          alt={project.imageAlt}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
          fill
          sizes="(max-width: 768px) 100vw, 55vw"
          src={project.image}
        />
        <span className="absolute top-4 left-4 rounded-md border bg-background/85 px-2 py-1 font-mono text-xs text-muted-foreground backdrop-blur">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="flex min-w-0 flex-col">
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{project.type}</Badge>
            {project.imageIsMockup ? <Badge variant="secondary">Mockup visual</Badge> : null}
          </div>
          <CardTitle className="pt-2 text-xl sm:text-2xl">{project.title}</CardTitle>
          <p className="text-sm leading-6 text-muted-foreground">{project.shortDescription}</p>
          {project.impact?.length ? (
            <ul className="mt-3 space-y-2 border-t pt-5">
              {project.impact.slice(0, 3).map((item) => (
                <li className="flex gap-2 text-xs leading-5 text-muted-foreground" key={item}>
                  <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {project.stack.slice(0, 7).map((item) => <TechBadge key={item}>{item}</TechBadge>)}
        </CardContent>
        <CardFooter className="relative z-10 mt-auto justify-between border-t pt-4">
          <Button asChild className="-ml-3" variant="ghost">
            <Link href={`/proyectos/${project.slug}`}>Ver caso de estudio <ArrowUpRight /></Link>
          </Button>
          {project.repositoryUrl ? (
            <Button asChild size="icon" variant="ghost">
              <a aria-label={`Repositorio de ${project.title}`} href={project.repositoryUrl} rel="noreferrer" target="_blank">
                <GitHubIcon />
              </a>
            </Button>
          ) : null}
        </CardFooter>
      </div>
    </Card>
  );
}
