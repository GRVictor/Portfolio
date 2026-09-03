"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

const tiles = [
  {
    eyebrow: "Producto",
    value: "ERP / CRM / POS",
    detail: "Sistema empresarial a medida",
    className: "[grid-area:1/1] lg:[grid-area:1/1]",
  },
  {
    eyebrow: "Plataforma",
    value: "~35",
    detail: "Módulos funcionales",
    className: "[grid-area:1/2] lg:[grid-area:1/5]",
  },
  {
    eyebrow: "Impacto",
    value: "~80%",
    detail: "Reducción en tiempos operativos",
    className: "[grid-area:3/1] lg:[grid-area:3/1]",
  },
  {
    eyebrow: "Integración",
    value: "~50",
    detail: "Endpoints REST",
    className: "[grid-area:3/2] lg:[grid-area:3/5]",
  },
  {
    eyebrow: "Frontend",
    value: "React / Angular",
    detail: "Interfaces de operación",
    className: "hidden lg:flex lg:[grid-area:1/2]",
  },
  {
    eyebrow: "Backend",
    value: "Laravel / MySQL",
    detail: "Aplicación y persistencia",
    className: "hidden lg:flex lg:[grid-area:1/4]",
  },
  {
    eyebrow: "Arquitectura",
    value: "MVC + APIs REST",
    detail: "Base técnica",
    className: "hidden lg:flex lg:[grid-area:3/2]",
  },
  {
    eyebrow: "Infraestructura",
    value: "Linux / DigitalOcean",
    detail: "Despliegue sobre VPS",
    className: "hidden lg:flex lg:[grid-area:3/4]",
  },
] as const;

function StoryTile({
  eyebrow,
  value,
  detail,
  className,
  index,
  progress,
  reduceMotion,
}: (typeof tiles)[number] & {
  index: number;
  progress: MotionValue<number>;
  reduceMotion: boolean | null;
}) {
  const start = 0.24 + index * 0.022;
  const end = 0.58 + index * 0.022;
  const opacity = useTransform(progress, [0, start, end], [0, 0, 1]);
  const scale = useTransform(progress, [0, start, end], [0.55, 0.55, 1]);
  const y = useTransform(progress, [0, start, end], [22, 22, 0]);

  return (
    <motion.div
      className={`project-story-tile relative z-0 flex min-h-28 flex-col overflow-hidden rounded-xl border border-foreground/15 bg-card p-4 shadow-[0_10px_35px_-25px_rgba(0,0,0,0.45)] will-change-transform sm:min-h-32 sm:p-5 lg:min-h-28 lg:p-4 ${className}`}
      style={reduceMotion ? undefined : { opacity, scale, y }}
    >
      <div className="flex items-center justify-between gap-3 border-b pb-3">
        <span className="font-mono text-[10px] tracking-[0.13em] text-muted-foreground uppercase">{eyebrow}</span>
        <span className="font-mono text-[10px] text-accent-foreground">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="mt-auto pt-4">
        <strong className="block text-sm leading-tight font-semibold tracking-[-0.02em] sm:text-lg lg:text-base xl:text-lg">{value}</strong>
        <span className="mt-1.5 block text-[11px] leading-4 text-muted-foreground sm:text-xs">{detail}</span>
      </div>
      <span aria-hidden="true" className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-accent-foreground/45 to-transparent" />
    </motion.div>
  );
}

export function ProjectScrollStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.28,
    restDelta: 0.001,
  });
  const centerScale = useTransform(smoothProgress, [0, 0.08, 0.72], [3.8, 3.8, 1]);
  const introOpacity = useTransform(smoothProgress, [0, 0.06, 0.18], [1, 1, 0]);
  const headingOpacity = useTransform(smoothProgress, [0.54, 0.74], [0, 1]);
  const headingY = useTransform(smoothProgress, [0.54, 0.74], [14, 0]);

  return (
    <section className="project-scroll-story relative border-y bg-muted/20" ref={sectionRef}>
      <h2 className="sr-only">La plataforma empresarial en cifras</h2>
      <div className="project-scroll-sticky sticky top-0 grid h-svh place-items-center overflow-hidden">
        <div aria-hidden="true" className="grid-fade absolute inset-0 opacity-60" />
        <motion.p
          className="absolute bottom-8 z-30 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase sm:bottom-10 sm:text-xs"
          style={reduceMotion ? { opacity: 0 } : { opacity: introOpacity }}
        >
          
        </motion.p>

        <div className="container-shell relative grid h-full place-items-center py-20">
          <div className="grid w-full max-w-6xl grid-cols-2 grid-rows-[auto_minmax(9rem,1fr)_auto] items-stretch gap-3 sm:gap-5 lg:grid-cols-[1fr_1fr_minmax(240px,1.45fr)_1fr_1fr] lg:grid-rows-3">
            {tiles.map((tile, index) => (
              <StoryTile {...tile} index={index} key={tile.eyebrow} progress={smoothProgress} reduceMotion={reduceMotion} />
            ))}

            <motion.div
              className="project-story-center relative z-20 w-[52%] justify-self-center overflow-hidden rounded-xl border bg-card shadow-[0_24px_80px_-32px_rgba(0,0,0,0.5)] will-change-transform [grid-area:2/1/3/3] sm:w-[44%] lg:w-full lg:[grid-area:2/3]"
              style={reduceMotion ? undefined : { scale: centerScale }}
            >
              <div className="relative aspect-[4/5] w-full min-w-0 sm:aspect-[16/10]">
                <Image
                  alt="Mockup neutro de la plataforma empresarial ERP, CRM y POS"
                  className="object-cover"
                  fill
                  priority={false}
                  sizes="(max-width: 1024px) 34vw, 300px"
                  src="/projects/inventory.svg"
                />
              </div>
            </motion.div>
          </div>

          <motion.div
            className="project-story-heading pointer-events-none absolute right-5 bottom-7 left-5 text-center sm:right-8 sm:bottom-10 sm:left-8"
            style={reduceMotion ? undefined : { opacity: headingOpacity, y: headingY }}
          >
            <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase sm:text-xs">Caso principal</p>
            <p className="mt-2 text-balance text-lg font-semibold tracking-tight sm:text-2xl">Una plataforma. Procesos conectados. Evolución continua.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
