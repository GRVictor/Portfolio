import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { DesktopNavigation } from "@/components/desktop-navigation";
import { MobileNavigation } from "@/components/mobile-navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { personalInfo } from "@/config/site";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 py-3">
      <div className="container-shell">
        <div className="nav-enter relative flex h-14 items-center justify-between rounded-xl border bg-background/80 px-3 shadow-sm backdrop-blur-xl sm:px-4">
          <Link className="flex min-w-0 items-center gap-2.5" href="/" aria-label={`Inicio de ${personalInfo.brand}`}>
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary font-mono text-xs font-semibold text-primary-foreground">
              {"</>"}
            </span>
            <span className="max-w-40 truncate text-sm font-semibold tracking-tight sm:max-w-none">
              {personalInfo.brand}
            </span>
          </Link>

          <DesktopNavigation />

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Button asChild className="hidden sm:inline-flex" size="sm">
              <Link href="/contacto">
                Hablemos <ArrowUpRight />
              </Link>
            </Button>
            <MobileNavigation />
          </div>
        </div>
      </div>
    </header>
  );
}
