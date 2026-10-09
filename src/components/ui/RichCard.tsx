"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedStatProps {
  value: number;
  suffix?: string;
  label: string;
  className?: string;
}

export function AnimatedStat({ value, suffix = "", label, className }: AnimatedStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [display, setDisplay] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    const duration = 1800;
    const start = performance.now();
    let frame: number;
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, reduced]);

  return (
    <div ref={ref} className={cn("text-center", className)}>
      <p className="font-countdown text-5xl leading-none text-accent-sun sm:text-7xl">
        {display}
        {suffix}
      </p>
      <p className="mt-2 font-mono-label text-[10px] text-on-accent/60">{label}</p>
    </div>
  );
}

interface RichCardProps {
  index: string;
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  imageAlt?: string;
  gradient?: string;
  className?: string;
  size?: "default" | "large" | "wide";
  href?: string;
}

export function RichCard({
  index,
  title,
  subtitle,
  description,
  image,
  imageAlt = "",
  gradient = "from-primary via-brand-green/80 to-rio/60",
  className,
  size = "default",
  href,
}: RichCardProps) {
  const Tag = href ? "a" : "article";

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={cn(
        size === "large" && "sm:col-span-2 sm:row-span-2",
        size === "wide" && "sm:col-span-2",
        className,
      )}
    >
      <Tag
        href={href}
        className={cn(
          "group relative flex h-full min-h-[280px] flex-col justify-end overflow-hidden rounded-sm p-6 sm:min-h-[320px] sm:p-8",
        "border-2 border-brown/20 transition-shadow duration-500 hover:shadow-[0_24px_80px_-12px_rgba(107,61,46,0.35)]",
        )}
      >
        {image ? (
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className={cn("absolute inset-0 bg-linear-to-br", gradient)} aria-hidden="true" />
        )}

        <div
          className="absolute inset-0 bg-linear-to-t from-brown-deep/95 via-brown/45 to-brown/10"
          aria-hidden="true"
        />

        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(circle at 50% 100%, color-mix(in srgb, var(--color-accent) 30%, transparent), transparent 60%)",
          }}
        />

        <span className="relative font-countdown text-6xl leading-none text-on-primary/15 sm:text-8xl">
          {index}
        </span>
        <div className="relative mt-auto">
          <p className="font-mono-label text-[10px] text-accent-sun">{subtitle}</p>
          <h3 className="mt-2 font-display text-2xl text-on-primary sm:text-3xl">{title}</h3>
          <p className="mt-3 max-w-sm font-body text-sm leading-relaxed text-on-primary/75 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 translate-y-2">
            {description}
          </p>
        </div>
      </Tag>
    </motion.div>
  );
}
