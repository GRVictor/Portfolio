import { ArrowRight, ArrowUpRight, Check, Circle } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { personalInfo, siteConfig } from "@/config/site";
import { featuredProjects } from "@/data/projects";

export function Hero() {
  const primaryProjectHref = featuredProjects[0] ? `/proyectos/${featuredProjects[0].slug}` : "/proyectos";

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="grid-fade absolute inset-x-0 top-0 -z-10 h-[38rem] opacity-70" />
      <div className="container-shell grid min-h-[calc(100svh-5rem)] items-center gap-14 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
        <div>
          {personalInfo.availableForOpportunities ? (
            <Badge className="mb-7 rounded-full py-1 pr-3 pl-2" variant="outline">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-50" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              {personalInfo.availabilityLabel}
            </Badge>
          ) : null}

          <p className="hero-enter mb-4 font-mono text-sm text-muted-foreground">{personalInfo.name} / {personalInfo.role} / {personalInfo.secondaryRole}</p>
          <h1 className="hero-enter hero-delay-1 text-balance max-w-4xl text-5xl leading-[0.98] font-semibold tracking-[-0.055em] sm:text-6xl lg:text-7xl">
            Software escalable para operaciones reales.
          </h1>
          <p className="hero-enter hero-delay-2 mt-7 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl sm:leading-9">
            {siteConfig.heroStatement}
          </p>
          <div className="hero-enter hero-delay-3 mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href={primaryProjectHref}>
                Ver proyecto principal <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={personalInfo.github} rel="noreferrer" target="_blank">
                Ver GitHub <ArrowUpRight />
              </a>
            </Button>
          </div>
        </div>

        <div className="hero-enter hero-delay-2 mx-auto w-full max-w-lg lg:mx-0">
          <div className="hero-code-card overflow-hidden rounded-2xl border bg-card/85 shadow-[0_20px_70px_-35px_rgba(0,0,0,0.35)] backdrop-blur">
            <div className="flex h-11 items-center gap-2 border-b px-4">
              <Circle className="size-2.5 fill-current text-red-400" />
              <Circle className="size-2.5 fill-current text-amber-400" />
              <Circle className="size-2.5 fill-current text-emerald-400" />
              <span className="ml-2 font-mono text-[11px] text-muted-foreground">solucion.ts</span>
            </div>
            <div className="p-5 font-mono text-xs leading-6 sm:p-7 sm:text-sm sm:leading-7">
              <p><span className="text-violet-500 dark:text-violet-400">type</span> Solucion = {"{"}</p>
              <p className="pl-5"><span className="text-muted-foreground">interfaz:</span> <span className="text-emerald-600 dark:text-emerald-400">&quot;clara&quot;</span>,</p>
              <p className="pl-5"><span className="text-muted-foreground">backend:</span> <span className="text-emerald-600 dark:text-emerald-400">&quot;robusto&quot;</span>,</p>
              <p className="pl-5"><span className="text-muted-foreground">datos:</span> <span className="text-emerald-600 dark:text-emerald-400">&quot;estructurados&quot;</span>,</p>
              <p className="pl-5"><span className="text-muted-foreground">escalable:</span> <span className="text-amber-600 dark:text-amber-400">true</span>,</p>
              <p>{"}"};</p>
            </div>
            <div className="grid grid-cols-3 border-t bg-muted/35">
              {[
                ["UI", "Funcional"],
                ["API", "Escalable"],
                ["Datos", "Consistentes"],
              ].map(([label, value]) => (
                <div className="min-w-0 border-r px-2 py-4 last:border-r-0 sm:px-5" key={label}>
                  <p className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">{label}</p>
                  <p className="mt-1.5 flex flex-col gap-1 text-[11px] font-medium min-[380px]:flex-row min-[380px]:items-center sm:text-sm">
                    <Check className="size-3.5 text-emerald-600 dark:text-emerald-400" /> {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-3 text-center font-mono text-[11px] tracking-wider text-muted-foreground uppercase lg:text-right">
            Del requerimiento a producción
          </p>
        </div>
      </div>
    </section>
  );
}
