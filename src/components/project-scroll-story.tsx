"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";

import { allProjects } from "@/data/projects";
import type { Project } from "@/types";

function ProjectBeamCard({ project, index, processed = false }: { project: Project; index: number; processed?: boolean }) {
  const projectHref = `/proyectos/${project.slug}`;
  const codeTexture = Array.from({ length: 4 }, (_, pass) => [
    `// PROJECT_${String(index + 1).padStart(2, "0")} / PASS_${pass + 1}`,
    `route("/${project.slug}");`,
    `type: "${project.type}";`,
    ...project.stack.slice(0, 5).map((item) => `load("${item.toLowerCase().replaceAll(" ", "-")}");`),
    `status: "${project.year}";`,
  ].join("\n")).join("\n\n");

  if (processed) {
    return (
      <article aria-hidden="true" className="project-beam-card project-beam-card-processed relative shrink-0 overflow-hidden rounded-2xl border">
        <Image alt="" className="object-cover" fill sizes="(max-width: 768px) 82vw, 704px" src={project.image} />
        <pre className="project-beam-code absolute inset-0 overflow-hidden p-5 font-mono text-[9px] leading-[1.35] whitespace-pre-wrap sm:p-7 sm:text-[11px]">
          {codeTexture}
        </pre>
      </article>
    );
  }

  return (
    <Link
      aria-label={`Ver caso de estudio: ${project.title}`}
      className="project-beam-card group/card relative block shrink-0 overflow-hidden rounded-2xl border border-white/15 bg-[#111714] shadow-[0_30px_90px_-35px_rgba(0,0,0,0.9)] focus-visible:ring-white"
      draggable={false}
      href={projectHref}
    >
      <Image
        alt={project.imageAlt}
        className="object-cover transition-transform duration-500 group-hover/card:scale-[1.025]"
        draggable={false}
        fill
        sizes="(max-width: 768px) 82vw, 704px"
        src={project.image}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/35" />
      <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-4 p-4 sm:p-6">
        <span className="rounded-md border border-white/20 bg-black/35 px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] text-white/75 uppercase backdrop-blur">
          {String(index + 1).padStart(2, "0")} / {String(allProjects.length).padStart(2, "0")}
        </span>
        <span className="rounded-md border border-white/20 bg-black/35 px-2.5 py-1 text-[10px] text-white/75 backdrop-blur sm:text-xs">
          {project.type}
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
        <h3 className="max-w-2xl text-balance text-xl font-semibold tracking-[-0.035em] text-white sm:text-3xl">{project.title}</h3>
        <p className="mt-2 hidden max-w-xl text-sm leading-6 text-white/65 sm:line-clamp-2">{project.shortDescription}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.slice(0, 4).map((item) => (
            <span className="rounded-md border border-white/15 bg-black/30 px-2 py-1 font-mono text-[9px] text-white/70 backdrop-blur sm:text-[10px]" key={item}>
              {item}
            </span>
          ))}
        </div>
      </div>
      <span className="absolute right-4 bottom-4 hidden size-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur transition-transform group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5 sm:flex">
        <ArrowUpRight className="size-4" />
      </span>
    </Link>
  );
}

export function ProjectScrollStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startScrollY: number;
    targetScrollY: number;
    dragRatio: number;
    moved: boolean;
    previousScrollBehavior: string;
  } | null>(null);
  const dragFrameRef = useRef<number | null>(null);
  const suppressClickRef = useRef(false);
  const reduceMotion = useReducedMotion();
  const staticMode = Boolean(reduceMotion);
  const [activeIndex, setActiveIndex] = useState(0);
  const horizontalTravel = useMotionValue(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 38,
    mass: 0.18,
    restDelta: 0.001,
  });
  const trackX = useTransform(() => -smoothProgress.get() * horizontalTravel.get());

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => horizontalTravel.set(Math.max(0, track.scrollWidth - window.innerWidth));
    const observer = new ResizeObserver(measure);

    measure();
    observer.observe(track);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      if (dragFrameRef.current !== null) cancelAnimationFrame(dragFrameRef.current);
      if (dragRef.current) document.documentElement.style.scrollBehavior = dragRef.current.previousScrollBehavior;
    };
  }, [horizontalTravel]);

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const nextIndex = Math.min(allProjects.length - 1, Math.round(latest * (allProjects.length - 1)));
    setActiveIndex((current) => current === nextIndex ? current : nextIndex);
  });

  function scrollToProject(index: number) {
    const section = sectionRef.current;
    if (!section) return;

    const sectionTop = window.scrollY + section.getBoundingClientRect().top;
    const verticalTravel = section.offsetHeight - window.innerHeight;
    const targetProgress = allProjects.length > 1 ? index / (allProjects.length - 1) : 0;

    window.scrollTo({
      top: sectionTop + verticalTravel * targetProgress,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  function handleKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Home" && event.key !== "End") return;

    event.preventDefault();
    if (event.key === "Home") scrollToProject(0);
    else if (event.key === "End") scrollToProject(allProjects.length - 1);
    else if (event.key === "ArrowLeft") scrollToProject(Math.max(0, activeIndex - 1));
    else scrollToProject(Math.min(allProjects.length - 1, activeIndex + 1));
  }

  function handleWheel(event: ReactWheelEvent<HTMLDivElement>) {
    if (staticMode || Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;

    event.preventDefault();
    const section = sectionRef.current;
    if (!section) return;

    const verticalTravel = section.offsetHeight - window.innerHeight;
    const wheelRatio = horizontalTravel.get() > 0 ? verticalTravel / horizontalTravel.get() : 1;
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;

    root.style.scrollBehavior = "auto";
    window.scrollBy(0, event.deltaX * wheelRatio);
    root.style.scrollBehavior = previousScrollBehavior;
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (staticMode || event.button !== 0) return;

    const section = sectionRef.current;
    if (!section) return;

    const verticalTravel = section.offsetHeight - window.innerHeight;
    const dragRatio = horizontalTravel.get() > 0 ? verticalTravel / horizontalTravel.get() : 1;
    const root = document.documentElement;

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollY: window.scrollY,
      targetScrollY: window.scrollY,
      dragRatio,
      moved: false,
      previousScrollBehavior: root.style.scrollBehavior,
    };
    root.style.scrollBehavior = "auto";
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    const section = sectionRef.current;
    if (!drag || !section || drag.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - drag.startX;
    if (Math.abs(deltaX) > 5) drag.moved = true;
    if (!drag.moved) return;

    drag.targetScrollY = drag.startScrollY - deltaX * drag.dragRatio;
    if (dragFrameRef.current !== null) return;

    dragFrameRef.current = requestAnimationFrame(() => {
      if (dragRef.current) window.scrollTo(0, dragRef.current.targetScrollY);
      dragFrameRef.current = null;
    });
  }

  function handlePointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    suppressClickRef.current = drag.moved;
    dragRef.current = null;
    document.documentElement.style.scrollBehavior = drag.previousScrollBehavior;
    if (dragFrameRef.current !== null) {
      cancelAnimationFrame(dragFrameRef.current);
      dragFrameRef.current = null;
    }
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    window.setTimeout(() => { suppressClickRef.current = false; }, 0);
  }

  const sectionStyle = {
    "--project-scroll-height": `${allProjects.length * 100 + 40}svh`,
  } as CSSProperties;

  if (staticMode) {
    return (
      <section className="project-scroll-story border-y border-white/10 bg-[#070a09] py-16 text-white" id="proyectos" ref={sectionRef} style={sectionStyle}>
        <div className="container-shell">
          <p className="font-mono text-xs tracking-[0.16em] text-white/50 uppercase">01 / Proyectos</p>
          <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight sm:text-3xl">Proyectos construidos para contextos reales.</h2>
        </div>
        <div className="mt-10 overflow-x-auto pb-5">
          <div className="project-beam-track">
            {allProjects.map((project, index) => <ProjectBeamCard index={index} key={project.slug} project={project} />)}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="project-scroll-story relative border-y border-white/10 bg-[#070a09] text-white" id="proyectos" ref={sectionRef} style={sectionStyle}>
      <div
        aria-label="Galería horizontal de proyectos. Usa el scroll vertical, arrastra lateralmente o presiona las flechas izquierda y derecha."
        className="project-beam-viewport project-scroll-sticky sticky top-0 h-svh cursor-grab touch-pan-y select-none overflow-hidden focus-visible:ring-inset active:cursor-grabbing"
        onClickCapture={(event) => {
          if (suppressClickRef.current) {
            event.preventDefault();
            event.stopPropagation();
          }
        }}
        onKeyDown={handleKeyDown}
        onPointerCancel={handlePointerUp}
        onPointerDown={handlePointerDown}
        onPointerLeave={(event) => {
          if (dragRef.current?.pointerId === event.pointerId && !event.currentTarget.hasPointerCapture(event.pointerId)) handlePointerUp(event);
        }}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onWheel={handleWheel}
        role="region"
        tabIndex={0}
      >
        <div aria-hidden="true" className="project-beam-grid absolute inset-0" />

        <header className="container-shell absolute inset-x-0 top-0 z-40 flex items-end justify-between gap-6 py-6 sm:py-9">
          <div>
            <p className="font-mono text-[10px] tracking-[0.16em] text-white/45 uppercase sm:text-xs">01 / Proyectos</p>
            <h2 className="mt-2 text-balance text-lg font-semibold tracking-tight sm:text-2xl">Del producto visual a su estructura técnica.</h2>
          </div>
          <Link className="hidden shrink-0 items-center gap-2 text-sm font-medium text-white/75 hover:text-white hover:underline sm:inline-flex" href="/proyectos">
            Ver todos <ArrowUpRight className="size-4" />
          </Link>
        </header>

        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
          <motion.div className="project-beam-track" ref={trackRef} style={{ x: trackX }}>
            {allProjects.map((project, index) => <ProjectBeamCard index={index} key={project.slug} project={project} />)}
          </motion.div>
        </div>

        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 overflow-hidden [clip-path:inset(0_50%_0_0)]">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
            <motion.div className="project-beam-track" style={{ x: trackX }}>
              {allProjects.map((project, index) => <ProjectBeamCard index={index} key={project.slug} processed project={project} />)}
            </motion.div>
          </div>
        </div>

        <div aria-hidden="true" className="project-beam-scanner absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2" />

        <footer className="container-shell absolute inset-x-0 bottom-0 z-40 py-6 sm:py-9">
          <div className="flex items-center gap-4 border-t border-white/10 pt-4">
            <span className="hidden shrink-0 font-mono text-[10px] tracking-[0.12em] text-white/45 uppercase sm:block">Scroll vertical / arrastra horizontal</span>
            <div aria-hidden="true" className="h-px flex-1 overflow-hidden bg-white/15">
              <motion.div className="h-full origin-left bg-emerald-300" style={{ scaleX: smoothProgress }} />
            </div>
            <span className="max-w-[52vw] truncate text-xs font-medium text-white/70 sm:max-w-none sm:text-sm">{allProjects[activeIndex]?.title}</span>
            <span className="shrink-0 font-mono text-[10px] text-white/45">
              {String(activeIndex + 1).padStart(2, "0")} / {String(allProjects.length).padStart(2, "0")}
            </span>
          </div>
        </footer>
      </div>
    </section>
  );
}
