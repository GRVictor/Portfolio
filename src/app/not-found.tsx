import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container-shell grid min-h-[65vh] place-items-center py-20 text-center">
      <div>
        <p className="font-mono text-sm text-muted-foreground">404 / NO ENCONTRADO</p>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight">Esta página no existe.</h1>
        <p className="mt-4 text-muted-foreground">La ruta pudo cambiar o el contenido ya no está disponible.</p>
        <Button asChild className="mt-7"><Link href="/">Volver al inicio</Link></Button>
      </div>
    </section>
  );
}
