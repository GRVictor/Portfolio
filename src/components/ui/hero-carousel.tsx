"use client";

import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { cn } from "@/lib/utils";

export interface HeroCarouselItem {
  id?: string | number;
  title: string;
  description?: string;
  image: string;
  imageAlt: string;
  href?: string;
  credit?: string;
  meta?: string[];
  accent?: string;
}

export interface HeroCarouselProps {
  items: HeroCarouselItem[];
  index?: number;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  brand?: React.ReactNode;
  autoplay?: boolean;
  autoplayDelay?: number;
  ariaLabel?: string;
  className?: string;
}

const PAGE_GUTTER = 0.055;
const WHEEL_THRESHOLD = 48;
const WHEEL_COOLDOWN = 360;
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function HeroCarousel({
  items,
  index: controlledIndex,
  defaultIndex = 0,
  onIndexChange,
  brand,
  autoplay = false,
  autoplayDelay = 5000,
  ariaLabel = "Proyectos seleccionados",
  className,
}: HeroCarouselProps) {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const draggedRef = React.useRef(false);
  const wheelAccumulatorRef = React.useRef(0);
  const wheelCooldownRef = React.useRef(0);
  const [stageWidth, setStageWidth] = React.useState(1200);
  const [uncontrolledIndex, setUncontrolledIndex] = React.useState(defaultIndex);
  const [dragging, setDragging] = React.useState(false);
  const [paused, setPaused] = React.useState(false);
  const reducedMotion = useReducedMotion();
  const lastIndex = items.length - 1;
  const activeIndex = clamp(controlledIndex ?? uncontrolledIndex, 0, Math.max(0, lastIndex));

  const goTo = React.useCallback((nextIndex: number) => {
    const next = clamp(nextIndex, 0, Math.max(0, lastIndex));
    if (controlledIndex === undefined) setUncontrolledIndex(next);
    if (next !== activeIndex) onIndexChange?.(next);
  }, [activeIndex, controlledIndex, lastIndex, onIndexChange]);

  React.useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const observer = new ResizeObserver(([entry]) => {
      if (entry) setStageWidth(entry.contentRect.width);
    });

    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  function xFor(index: number) {
    return -index * stageWidth;
  }

  const trackX = useMotionValue(xFor(activeIndex));
  const targetX = xFor(activeIndex);
  const gutter = clamp(Math.round(stageWidth * PAGE_GUTTER), 20, 80);

  React.useEffect(() => {
    if (dragging) return;

    const controls = animate(
      trackX,
      targetX,
      reducedMotion
        ? { duration: 0 }
        : { type: "spring", stiffness: 280, damping: 36, mass: 0.82 },
    );
    return () => controls.stop();
  }, [dragging, reducedMotion, targetX, trackX]);

  React.useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    function handleWheel(event: WheelEvent) {
      const horizontalGesture = Math.abs(event.deltaX) > Math.abs(event.deltaY);
      const delta = horizontalGesture ? event.deltaX : event.shiftKey ? event.deltaY : 0;
      if (delta === 0) return;

      const atBoundary = (delta > 0 && activeIndex === lastIndex) || (delta < 0 && activeIndex === 0);
      if (atBoundary) {
        wheelAccumulatorRef.current = 0;
        return;
      }

      event.preventDefault();
      if (event.timeStamp < wheelCooldownRef.current) return;

      wheelAccumulatorRef.current += delta;
      if (Math.abs(wheelAccumulatorRef.current) < WHEEL_THRESHOLD) return;

      goTo(activeIndex + Math.sign(wheelAccumulatorRef.current));
      wheelAccumulatorRef.current = 0;
      wheelCooldownRef.current = event.timeStamp + WHEEL_COOLDOWN;
    }

    stage.addEventListener("wheel", handleWheel, { passive: false });
    return () => stage.removeEventListener("wheel", handleWheel);
  }, [activeIndex, goTo, lastIndex]);

  React.useEffect(() => {
    if (!autoplay || paused || dragging || items.length < 2) return;

    const timeout = window.setTimeout(
      () => goTo(activeIndex === lastIndex ? 0 : activeIndex + 1),
      autoplayDelay,
    );
    return () => window.clearTimeout(timeout);
  }, [activeIndex, autoplay, autoplayDelay, dragging, goTo, items.length, lastIndex, paused]);

  const activeItem = items[activeIndex];
  if (!activeItem) return null;

  const accent = activeItem.accent ?? "#10b981";
  const slideTransition = reducedMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 280, damping: 36, mass: 0.82 };
  const fadeTransition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.6, ease: "easeOut" as const };

  return (
    <div
      aria-label={ariaLabel}
      aria-roledescription="carrusel"
      className={cn(
        "relative h-full min-h-[40rem] w-full touch-pan-y select-none overflow-hidden bg-background text-foreground outline-none focus-visible:ring-1 focus-visible:ring-foreground/40 focus-visible:ring-inset",
        className,
      )}
      onBlur={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onKeyDown={(event) => {
        const destinations: Record<string, number> = {
          ArrowLeft: activeIndex - 1,
          ArrowRight: activeIndex + 1,
          Home: 0,
          End: lastIndex,
        };
        if (!(event.key in destinations)) return;
        event.preventDefault();
        goTo(destinations[event.key]);
      }}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      ref={stageRef}
      role="region"
      tabIndex={0}
    >
      <AnimatePresence initial={false}>
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="editorial-carousel-gradient absolute inset-0"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0, scale: reducedMotion ? 1 : 1.035 }}
          key={activeItem.id ?? activeIndex}
          style={{ "--carousel-accent": accent } as React.CSSProperties}
          transition={fadeTransition}
        />
      </AnimatePresence>

      <div aria-hidden="true" className="editorial-carousel-grid absolute inset-0" />
      <div aria-hidden="true" className="editorial-carousel-vignette absolute inset-0" />
      <div
        aria-hidden="true"
        className="editorial-carousel-grain pointer-events-none absolute inset-0"
        style={{ backgroundImage: GRAIN, backgroundSize: "180px 180px" }}
      />

      <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-center px-5 pt-6 sm:pt-8">
        <div className="flex items-center gap-3 font-mono text-[9px] tracking-[0.14em] text-foreground/65 uppercase sm:text-[11px]">
          <span className="size-1.5 rounded-full bg-emerald-600 shadow-[0_0_12px_rgba(16,185,129,0.65)] dark:bg-emerald-300" />
          {brand ?? "Proyectos seleccionados"}
        </div>
      </div>

      <div className="absolute inset-x-0 top-[11%] bottom-[13%] z-10">
        <motion.div
          className="flex h-full items-stretch"
          drag="x"
          dragConstraints={{ left: xFor(lastIndex), right: xFor(0) }}
          dragElastic={0.08}
          dragMomentum={false}
          onDragEnd={(_, info) => {
            setDragging(false);
            draggedRef.current = true;
            const projectedX = trackX.get() + info.velocity.x * 0.12;
            goTo(Math.round(-projectedX / stageWidth));
            window.setTimeout(() => { draggedRef.current = false; }, 0);
          }}
          onDragStart={() => {
            draggedRef.current = false;
            setDragging(true);
          }}
          style={{ cursor: dragging ? "grabbing" : "grab", x: trackX }}
        >
          {items.map((item, itemIndex) => {
            const active = itemIndex === activeIndex;

            return (
              <article
                aria-hidden={!active}
                className="grid h-full shrink-0 content-center gap-7 md:grid-cols-[0.78fr_1.22fr] md:items-center md:gap-[clamp(2rem,5vw,6rem)]"
                inert={!active}
                key={item.id ?? itemIndex}
                onClickCapture={(event) => {
                  if (draggedRef.current) {
                    event.preventDefault();
                    event.stopPropagation();
                  }
                }}
                style={{ paddingInline: gutter, width: stageWidth }}
              >
                <div className="min-w-0 md:max-w-xl">
                  <div className="flex items-center gap-3 font-mono text-[9px] tracking-[0.13em] text-muted-foreground uppercase sm:text-[10px]">
                    <span>{String(itemIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
                    {item.credit ? <><span aria-hidden="true" className="h-px w-8 bg-foreground/25" /><span>{item.credit}</span></> : null}
                  </div>

                  <div>
                    <h2 className="mt-5 text-balance text-3xl leading-[0.98] font-semibold tracking-[-0.045em] sm:text-5xl lg:text-[3.5rem]">
                      {item.title}
                    </h2>
                    {item.description ? (
                      <p className="mt-5 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                        {item.description}
                      </p>
                    ) : null}
                    {item.meta?.length ? (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {item.meta.map((fact) => (
                          <span className="rounded-md border bg-background/45 px-2.5 py-1 font-mono text-[9px] tracking-[0.08em] text-muted-foreground uppercase backdrop-blur sm:text-[10px]" key={fact}>
                            {fact}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    {item.href ? (
                      <Link className="mt-7 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5" draggable={false} href={item.href}>
                        Ver caso de estudio <ArrowUpRight className="size-4" />
                      </Link>
                    ) : null}
                  </div>
                </div>

                <div className="min-w-0">
                  {item.href ? (
                    <Link
                      aria-label={`Abrir caso de estudio: ${item.title}`}
                      className="group relative block aspect-[16/9] w-full overflow-hidden rounded-xl border bg-muted shadow-[0_28px_80px_-38px_rgba(0,0,0,0.45)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                      draggable={false}
                      href={item.href}
                    >
                      <Image
                        alt={item.imageAlt}
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        draggable={false}
                        fill
                        sizes="(max-width: 768px) 90vw, 62vw"
                        src={item.image}
                      />
                      <span aria-hidden="true" className="absolute inset-0 ring-1 ring-white/10 ring-inset" />
                      <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-md border border-white/20 bg-black/45 px-2.5 py-1 font-mono text-[9px] tracking-[0.1em] text-white/85 uppercase backdrop-blur sm:text-[10px]">
                        Abrir proyecto <ArrowUpRight className="size-3" />
                      </span>
                    </Link>
                  ) : (
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border bg-muted">
                      <Image alt={item.imageAlt} className="object-cover" draggable={false} fill sizes="(max-width: 768px) 90vw, 62vw" src={item.image} />
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </motion.div>
      </div>

      <div className="absolute right-5 bottom-5 left-5 z-20 sm:right-8 sm:bottom-7 sm:left-8">
        <div className="flex items-end justify-between font-mono text-[9px] tabular-nums text-foreground/60 sm:text-[10px]">
          <span>{String(activeIndex + 1).padStart(2, "0")}</span>
          <span className="tracking-[0.12em] uppercase">Desliza / arrastra / flechas</span>
          <span>{String(items.length).padStart(2, "0")}</span>
        </div>
        <div className="relative mt-2 h-px w-full bg-foreground/20">
          <motion.div
            animate={{ left: `${(activeIndex / items.length) * 100}%` }}
            className="absolute inset-y-0 bg-emerald-600 dark:bg-emerald-200"
            initial={false}
            style={{ width: `${100 / items.length}%` }}
            transition={slideTransition}
          />
        </div>
      </div>
    </div>
  );
}
