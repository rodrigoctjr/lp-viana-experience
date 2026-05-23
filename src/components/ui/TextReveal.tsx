"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  splitBy?: "words" | "chars";
}

export function TextReveal({
  children,
  className,
  as: Tag = "h2",
  delay = 0,
  splitBy = "words",
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const reduced = useReducedMotion();

  const parts =
    splitBy === "chars" ? children.split("") : children.split(" ");

  if (reduced) {
    return (
      <Tag ref={ref as never} className={className}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag ref={ref as never} className={cn("overflow-hidden", className)} aria-label={children}>
      <span className="sr-only">{children}</span>
      <span aria-hidden="true" className="inline-flex flex-wrap">
        {parts.map((part, i) => (
          <motion.span
            key={`${part}-${i}`}
            className="inline-block"
            initial={{ y: "110%", opacity: 0, rotateX: 40 }}
            animate={inView ? { y: 0, opacity: 1, rotateX: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: delay + i * 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ transformPerspective: 800 }}
          >
            {part}
            {splitBy === "words" && i < parts.length - 1 ? "\u00A0" : ""}
          </motion.span>
        ))}
      </span>
    </Tag>
  );
}

interface SplitHeadlineProps {
  lines: string[];
  className?: string;
  outlineIndex?: number;
}

export function SplitHeadline({ lines, className, outlineIndex = 1 }: SplitHeadlineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  const reduced = useReducedMotion();

  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => (
        <div key={line} className="overflow-hidden">
          <motion.div
            initial={reduced ? false : { y: "100%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{
              duration: 0.9,
              delay: i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={cn(
              "font-display leading-[0.92] tracking-tight",
              i === outlineIndex && "text-outline",
            )}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
