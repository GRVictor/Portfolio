"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { navigation } from "@/config/site";
import { cn } from "@/lib/utils";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function closeMenu(event: KeyboardEvent | MouseEvent) {
      if (event instanceof KeyboardEvent && event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }

      if (event instanceof MouseEvent && !containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", closeMenu);
    document.addEventListener("mousedown", closeMenu);
    return () => {
      document.removeEventListener("keydown", closeMenu);
      document.removeEventListener("mousedown", closeMenu);
    };
  }, [open]);

  return (
    <div className="md:hidden" ref={containerRef}>
      <Button
        aria-controls="mobile-navigation-panel"
        aria-expanded={open}
        aria-label={open ? "Cerrar navegación" : "Abrir navegación"}
        onClick={() => setOpen((current) => !current)}
        ref={triggerRef}
        size="icon"
        type="button"
        variant="ghost"
      >
        {open ? <X /> : <Menu />}
      </Button>
      {open ? (
        <div className="absolute inset-x-0 top-[calc(100%+0.5rem)] rounded-xl border bg-background/95 p-2 shadow-lg backdrop-blur-xl" id="mobile-navigation-panel">
          <nav aria-label="Navegación móvil" className="flex flex-col">
            {navigation.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

              return (
                <Link
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                  active && "bg-secondary text-foreground",
                )}
                href={item.href}
                key={item.href}
                onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
