"use client";

import { motion, useReducedMotion } from "motion/react";
import { useId, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export function TextHoverEffect({ text, duration = 0.08, className }: { text: string; duration?: number; className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });
  const id = useId().replaceAll(":", "");
  const gradientId = `footer-text-gradient-${id}`;
  const revealId = `footer-text-reveal-${id}`;
  const maskId = `footer-text-mask-${id}`;

  function handlePointerMove(event: React.PointerEvent<SVGSVGElement>) {
    const bounds = svgRef.current?.getBoundingClientRect();
    if (!bounds) return;

    setMaskPosition({
      cx: `${((event.clientX - bounds.left) / bounds.width) * 100}%`,
      cy: `${((event.clientY - bounds.top) / bounds.height) * 100}%`,
    });
  }

  return (
    <svg
      aria-hidden="true"
      className={cn("select-none", className)}
      height="100%"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => {
        setHovered(false);
        setMaskPosition({ cx: "50%", cy: "50%" });
      }}
      onPointerMove={handlePointerMove}
      ref={svgRef}
      viewBox="0 0 1000 220"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" x2="100%" y1="50%" y2="50%">
          <stop offset="0%" stopColor="var(--ring)" />
          <stop offset="38%" stopColor="#22d3ee" />
          <stop offset="70%" stopColor="var(--accent-foreground)" />
          <stop offset="100%" stopColor="var(--foreground)" />
        </linearGradient>
        <motion.radialGradient
          animate={maskPosition}
          cx="50%"
          cy="50%"
          id={revealId}
          r="20%"
          transition={{ duration: reduceMotion ? 0 : duration, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="75%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id={maskId}>
          <rect fill={`url(#${revealId})`} height="100%" width="100%" x="0" y="0" />
        </mask>
      </defs>

      <text
        dominantBaseline="middle"
        fill="transparent"
        fontFamily="var(--font-geist-sans), sans-serif"
        fontSize="118"
        fontWeight="700"
        letterSpacing="-6"
        stroke="color-mix(in oklab, var(--foreground) 14%, transparent)"
        strokeWidth="1"
        textAnchor="middle"
        x="50%"
        y="50%"
      >
        {text}
      </text>
      <motion.text
        animate={{ strokeDashoffset: 0 }}
        dominantBaseline="middle"
        fill="transparent"
        fontFamily="var(--font-geist-sans), sans-serif"
        fontSize="118"
        fontWeight="700"
        initial={reduceMotion ? false : { strokeDashoffset: 1500 }}
        letterSpacing="-6"
        stroke="var(--ring)"
        strokeDasharray="1500"
        strokeWidth="1"
        textAnchor="middle"
        transition={{ duration: reduceMotion ? 0 : 3.5, ease: "easeInOut" }}
        x="50%"
        y="50%"
      >
        {text}
      </motion.text>
      <text
        dominantBaseline="middle"
        fill="transparent"
        fontFamily="var(--font-geist-sans), sans-serif"
        fontSize="118"
        fontWeight="700"
        letterSpacing="-6"
        mask={`url(#${maskId})`}
        opacity={hovered ? 1 : 0}
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
        textAnchor="middle"
        x="50%"
        y="50%"
      >
        {text}
      </text>
    </svg>
  );
}

export function FooterBackgroundGradient() {
  return (
    <div
      aria-hidden="true"
      className="footer-background-gradient pointer-events-none absolute inset-0 z-0"
    />
  );
}
