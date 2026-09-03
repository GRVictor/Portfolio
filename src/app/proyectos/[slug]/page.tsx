import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { GitHubIcon } from "@/components/brand-icons";
import { TechBadge } from "@/components/tech-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { allProjects, getProjectBySlug } from "@/data/projects";
import { createPageMetadata } from "@/lib/metadata";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return allProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return {};

  return createPageMetadata({
    title: project.title,
    description: project.shortDescription,
    path: `/proyectos/${project.slug}`,
  });
}

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="view-reveal grid gap-4 border-t py-9 sm:grid-cols-[12rem_1fr] sm:gap-10 sm:py-12">
      <h2 className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">{title}</h2>
      <div className="max-w-2xl text-base leading-7 text-muted-foreground">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li className="flex gap-3" key={item}>
          <span aria-hidden="true" className="mt-3 size-1 shrink-0 rounded-full bg-foreground" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <article>
      <header className="container-shell pt-12 pb-10 sm:pt-20 sm:pb-14">
        <Button asChild className="-ml-3" variant="ghost">
          <Link href="/proyectos"><ArrowLeft /> Volver a proyectos</Link>
        </Button>
        <div className="mt-9 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{project.type}</Badge>
              <Badge variant="outline">{project.year}</Badge>
              {project.imageIsMockup ? <Badge variant="secondary">Mockup visual</Badge> : null}
            </div>
            <h1 className="text-balance mt-6 max-w-4xl text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">
              {project.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{project.shortDescription}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {project.liveUrl ? (
              <Button asChild>
                <a href={project.liveUrl} rel="noreferrer" target="_blank">Ver aplicación <ArrowUpRight /></a>
              </Button>
            ) : null}
            {project.repositoryUrl ? (
              <Button asChild variant="outline">
                <a href={project.repositoryUrl} rel="noreferrer" target="_blank"><GitHubIcon /> Repositorio</a>
              </Button>
            ) : null}
          </div>
        </div>
      </header>

      <div className="container-shell">
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border bg-muted shadow-sm">
          <Image alt={project.imageAlt} className="object-cover" fill priority sizes="(max-width: 1200px) 100vw, 1120px" src={project.image} />
        </div>
        {project.imageIsMockup ? <p className="mt-3 text-center font-mono text-xs text-muted-foreground">Representación visual neutra. No corresponde a una captura del sistema privado.</p> : null}
      </div>

      <div className="container-shell max-w-5xl py-12 sm:py-20">
        {project.confidentialNote ? (
          <div className="mb-10 rounded-lg border bg-muted/40 p-4 text-sm leading-6 text-muted-foreground">
            <span className="font-medium text-foreground">Confidencialidad:</span> {project.confidentialNote}
          </div>
        ) : null}
        {project.academicNote ? (
          <div className="mb-10 rounded-lg border bg-muted/40 p-4 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Contexto:</span> {project.academicNote}
          </div>
        ) : null}
        <DetailSection title="Descripción general"><p>{project.overview}</p></DetailSection>
        {project.problem ? <DetailSection title="El problema"><p>{project.problem}</p></DetailSection> : null}
        {project.solution ? <DetailSection title="La solución"><p>{project.solution}</p></DetailSection> : null}
        {project.features?.length ? <DetailSection title="Funcionalidades"><BulletList items={project.features} /></DetailSection> : null}
        {project.architecture ? <DetailSection title="Arquitectura"><p>{project.architecture}</p></DetailSection> : null}
        {project.impact?.length ? <DetailSection title="Impacto"><BulletList items={project.impact} /></DetailSection> : null}
        {project.infrastructure ? <DetailSection title="Infraestructura"><p>{project.infrastructure}</p></DetailSection> : null}
        {project.myRole ? <DetailSection title="Mi participación"><p>{project.myRole}</p></DetailSection> : null}
        {project.versions?.length ? (
          <DetailSection title="Evolución">
            <div className="space-y-4">
              {project.versions.map((version) => (
                <article className="rounded-xl border bg-card p-5 text-card-foreground shadow-xs" key={version.name}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="font-semibold">{version.name}</h3>
                    <Badge variant="secondary">{version.status}</Badge>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{version.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {version.stack.map((item) => <TechBadge key={item}>{item}</TechBadge>)}
                  </div>
                </article>
              ))}
            </div>
          </DetailSection>
        ) : null}
        <DetailSection title="Stack tecnológico">
          <div className="flex flex-wrap gap-2">{project.stack.map((item) => <TechBadge key={item}>{item}</TechBadge>)}</div>
        </DetailSection>
        {project.technicalDecisions?.length ? <DetailSection title="Decisiones técnicas"><BulletList items={project.technicalDecisions} /></DetailSection> : null}
        {project.challenges?.length ? <DetailSection title="Desafíos"><BulletList items={project.challenges} /></DetailSection> : null}
        {project.learnings?.length ? <DetailSection title="Aprendizajes"><BulletList items={project.learnings} /></DetailSection> : null}
      </div>

      {project.gallery?.length ? (
        <section className="border-y bg-muted/25 py-16 sm:py-24">
          <div className="container-shell">
            <h2 className="mb-8 font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">Galería</h2>
            <div className={project.gallery.length === 1 ? "grid gap-5" : "grid gap-5 md:grid-cols-2"}>
              {project.gallery.map((image) => (
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl border bg-muted" key={image.src + image.alt}>
                  <Image alt={image.alt} className="object-cover" fill sizes="(max-width: 768px) 100vw, 50vw" src={image.src} />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <div className="container-shell py-16 sm:py-24">
        <Separator className="mb-10" />
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div><p className="font-mono text-xs text-muted-foreground">FIN DEL CASO DE ESTUDIO</p><p className="mt-2 text-lg font-semibold">Explora el resto del trabajo.</p></div>
          <Button asChild variant="outline"><Link href="/proyectos">Todos los proyectos <ArrowUpRight /></Link></Button>
        </div>
      </div>
    </article>
  );
}
