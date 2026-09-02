import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { personalInfo, siteConfig } from "@/config/site";

export function AboutPreview() {
  return (
    <section className="container-shell section-spacing border-t">
      <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <div>
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">04 / Sobre mí</p>
          <p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="size-4" /> {personalInfo.location}</p>
        </div>
        <div>
          <h2 className="text-balance max-w-3xl text-3xl leading-tight font-semibold tracking-[-0.035em] sm:text-4xl">
            Construyo soluciones de extremo a extremo con contexto de negocio.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground">{siteConfig.about}</p>
          <Button asChild className="mt-7 -ml-4" variant="ghost">
            <Link href="/sobre-mi">Conocer más sobre mi perfil <ArrowRight /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
