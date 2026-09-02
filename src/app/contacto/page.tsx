import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";

import { GitHubIcon, LinkedInIcon } from "@/components/brand-icons";
import { PageIntro } from "@/components/page-intro";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { personalInfo } from "@/config/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Contacto",
  description: `Contacta a ${personalInfo.name} para conversar sobre oportunidades full-stack y proyectos de software empresarial.`,
  path: "/contacto",
});

const contactMethods = [
  { label: "Correo", value: personalInfo.email, href: `mailto:${personalInfo.email}`, icon: Mail, external: false },
  { label: "LinkedIn", value: "Conectar profesionalmente", href: personalInfo.linkedin, icon: LinkedInIcon, external: true },
  { label: "GitHub", value: "Ver perfil y repositorios", href: personalInfo.github, icon: GitHubIcon, external: true },
];

export default function ContactPage() {
  return (
    <>
      <PageIntro
        description="Si tienes una oportunidad, un proyecto o un reto técnico que podamos conversar, puedes contactarme directamente por correo o LinkedIn."
        path="/contacto"
        title="Construyamos una solución útil."
      />
      <section aria-labelledby="opciones-contacto" className="container-shell pb-20 sm:pb-28">
        <h2 className="sr-only" id="opciones-contacto">Opciones de contacto</h2>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <div className="space-y-3">
              {contactMethods.map(({ label, value, href, icon: Icon, external }) => (
                <a href={href} key={label} rel={external ? "noreferrer" : undefined} target={external ? "_blank" : undefined}>
                  <Card className="mb-3 flex-row items-center gap-4 p-4 transition-colors hover:border-foreground/20 hover:bg-muted/30">
                    <span className="grid size-10 shrink-0 place-items-center rounded-lg border bg-background"><Icon className="size-4" /></span>
                    <span><span className="block text-sm font-medium">{label}</span><span className="block text-xs text-muted-foreground">{value}</span></span>
                  </Card>
                </a>
              ))}
            </div>
            <p className="mt-7 flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="size-4" /> {personalInfo.location}</p>
          </div>

          <Card className="relative overflow-hidden p-6 sm:p-10">
            <div aria-hidden="true" className="absolute -top-20 -right-20 size-56 rounded-full bg-accent blur-3xl" />
            <div className="relative flex h-full flex-col justify-between gap-12">
              <div>
                <p className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">Contacto directo</p>
                <h2 className="text-balance mt-4 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">Cuéntame sobre la oportunidad o el proyecto.</h2>
                <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
                  Incluye el contexto, alcance y forma de colaboración para poder responder de manera clara.
                </p>
              </div>
              <Button asChild className="w-fit" size="lg">
                <a href={`mailto:${personalInfo.email}`}>Enviar correo <ArrowUpRight /></a>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}
