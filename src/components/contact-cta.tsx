import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { personalInfo } from "@/config/site";

export function ContactCta() {
  return (
    <section className="container-shell pb-20 sm:pb-24 lg:pb-32">
      <div className="relative overflow-hidden rounded-2xl border bg-card px-6 py-12 shadow-xs sm:px-10 sm:py-16 lg:px-16">
        <div aria-hidden="true" className="absolute -top-28 -right-28 size-72 rounded-full bg-accent blur-3xl" />
        <div className="relative max-w-2xl">
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">05 / Contacto</p>
          <h2 className="text-balance mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Construyamos una solución útil.
          </h2>
          <p className="mt-5 max-w-xl leading-7 text-muted-foreground">
            Podemos conversar sobre oportunidades full-stack y proyectos de software empresarial.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg">
              <Link href="/contacto">Iniciar una conversación <ArrowRight /></Link>
            </Button>
            <a className="text-sm text-muted-foreground hover:text-foreground hover:underline" href={`mailto:${personalInfo.email}`}>
              {personalInfo.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
