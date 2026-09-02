import { BookOpen, BriefcaseBusiness, MapPin } from "lucide-react";
import type { Metadata } from "next";

import { ExperienceItem } from "@/components/experience-item";
import { PageIntro } from "@/components/page-intro";
import { SectionHeader } from "@/components/section-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { personalInfo, siteConfig } from "@/config/site";
import { education, experiences, languages, professionalStrengths } from "@/data/experience";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Sobre mí",
  description: `${personalInfo.name}, ${personalInfo.role} con experiencia en aplicaciones empresariales, ERP, CRM, POS y APIs REST.`,
  path: "/sobre-mi",
});

export default function AboutPage() {
  return (
    <>
      <PageIntro
        description={siteConfig.about}
        path="/sobre-mi"
        title="Ingeniería de software con contexto de negocio."
      />

      <section className="container-shell pb-20 sm:pb-24">
        <h2 className="sr-only">Datos profesionales</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader><MapPin className="size-4 text-muted-foreground" /><CardTitle className="pt-2 text-sm">Ubicación</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground">{personalInfo.location}</CardContent>
          </Card>
          <Card>
            <CardHeader><BriefcaseBusiness className="size-4 text-muted-foreground" /><CardTitle className="pt-2 text-sm">Especialidad</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground">Aplicaciones empresariales full-stack</CardContent>
          </Card>
          <Card>
            <CardHeader><BookOpen className="size-4 text-muted-foreground" /><CardTitle className="pt-2 text-sm">Enfoque actual</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground">Desarrollo web moderno y arquitectura de software</CardContent>
          </Card>
        </div>
      </section>

      <section className="border-t">
        <div className="container-shell section-spacing grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
          <SectionHeader
            description="Experiencia práctica en desarrollo, automatización, arquitectura e infraestructura para sistemas empresariales."
            eyebrow="Experiencia"
            title="Trayectoria profesional"
          />
          <div>{experiences.map((experience) => <ExperienceItem experience={experience} key={`${experience.company}-${experience.role}`} />)}</div>
        </div>
      </section>

      <section className="border-t bg-muted/25">
        <div className="container-shell section-spacing grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
          <SectionHeader description="Formación académica en desarrollo y gestión de software." eyebrow="Formación" title="Educación" />
          <div className="space-y-4">
            {education.map((item) => (
              <Card key={`${item.institution}-${item.program}`}>
                <CardHeader>
                  <CardTitle className="text-lg">{item.program}</CardTitle>
                  <p className="text-sm text-muted-foreground">{item.institution} / {item.period}</p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t">
        <div className="container-shell section-spacing grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
          <SectionHeader eyebrow="Comunicación" title="Idiomas y fortalezas" />
          <div className="space-y-8">
            <div className="grid gap-3 sm:grid-cols-2">
              {languages.map((language) => (
                <Card className="p-5" key={language.name}>
                  <p className="font-medium">{language.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{language.level}</p>
                  {language.reference ? <p className="mt-2 font-mono text-xs text-muted-foreground">{language.reference}</p> : null}
                </Card>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {professionalStrengths.map((strength) => <Badge key={strength} variant="outline">{strength}</Badge>)}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
