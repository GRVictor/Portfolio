import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import Link from "next/link";

import { GitHubIcon, LinkedInIcon } from "@/components/brand-icons";
import { FooterBackgroundGradient, TextHoverEffect } from "@/components/ui/hover-footer";
import { navigation, personalInfo, siteConfig } from "@/config/site";
import { allProjects } from "@/data/projects";

const socialLinks = [
  { label: "GitHub", href: personalInfo.github, icon: GitHubIcon },
  { label: "LinkedIn", href: personalInfo.linkedin, icon: LinkedInIcon },
];

const footerLinkClass = "group inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-accent-foreground";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t bg-card text-card-foreground sm:m-4 sm:rounded-3xl sm:border" id="site-footer">
      <FooterBackgroundGradient />
      <div aria-hidden="true" className="technical-grid absolute inset-0 opacity-40" />

      <div className="container-shell relative z-10 pt-14 sm:pt-20">
        <div className="grid gap-12 border-b pb-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_1fr_1fr] lg:gap-10 lg:pb-16">
          <div>
            <Link className="inline-flex items-center gap-3" href="/">
              <span className="grid size-10 place-items-center rounded-xl bg-primary font-mono text-xs font-semibold text-primary-foreground">{"</>"}</span>
              <span className="text-xl font-semibold tracking-tight">{personalInfo.brand}</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">{siteConfig.description}</p>
            <Link className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-primary/90" href="/contacto">
              Hablemos de tu proyecto <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <nav aria-label="Navegación del pie de página">
            <h2 className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">Navegación</h2>
            <ul className="mt-5 space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link className={footerLinkClass} href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">Proyectos</h2>
            <ul className="mt-5 space-y-3">
              {allProjects.map((project) => (
                <li key={project.slug}>
                  <Link className={footerLinkClass} href={`/proyectos/${project.slug}`}>
                    <span className="leading-5">{project.title}</span>
                    <ArrowUpRight className="size-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">Contacto</h2>
            <ul className="mt-5 space-y-4">
              <li>
                <a className={footerLinkClass} href={`mailto:${personalInfo.email}`}>
                  <Mail className="size-4 text-accent-foreground" />
                  <span className="break-all">{personalInfo.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm leading-6 text-muted-foreground">
                <MapPin className="mt-1 size-4 shrink-0 text-accent-foreground" />
                {personalInfo.location}
              </li>
            </ul>
          </div>
        </div>

        <Link aria-label={`Volver al inicio de ${personalInfo.brand}`} className="mt-2 hidden h-[clamp(12rem,24vw,22rem)] md:block" href="/">
          <TextHoverEffect className="h-full w-full" text="CODE STROKES" />
        </Link>

        <div className="flex flex-col gap-5 border-t py-7 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {personalInfo.name}. Diseñado y desarrollado con Next.js.</p>
          <div className="flex items-center gap-2">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                aria-label={label}
                className="grid size-9 place-items-center rounded-lg border text-muted-foreground transition-[color,border-color,transform] hover:-translate-y-0.5 hover:border-ring/50 hover:text-accent-foreground"
                href={href}
                key={label}
                rel="noreferrer"
                target="_blank"
              >
                <Icon className="size-4" />
              </a>
            ))}
            <a
              aria-label="Correo"
              className="grid size-9 place-items-center rounded-lg border text-muted-foreground transition-[color,border-color,transform] hover:-translate-y-0.5 hover:border-ring/50 hover:text-accent-foreground"
              href={`mailto:${personalInfo.email}`}
            >
              <Mail className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
