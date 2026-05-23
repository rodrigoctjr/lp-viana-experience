"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

function HopCluster({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 160" className={cn("h-24 w-auto sm:h-32", className)} aria-hidden="true">
      <path
        d="M60 150 L60 80 M45 95 Q30 70 35 50 Q40 30 50 25 M75 95 Q90 70 85 50 Q80 30 70 25"
        stroke="#4A7C59"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="38" cy="48" rx="10" ry="14" fill="#3D6B4F" opacity="0.9" />
      <ellipse cx="52" cy="32" rx="9" ry="13" fill="#4A7C59" />
      <ellipse cx="82" cy="48" rx="10" ry="14" fill="#3D6B4F" opacity="0.9" />
      <ellipse cx="68" cy="32" rx="9" ry="13" fill="#4A7C59" />
      <ellipse cx="60" cy="22" rx="8" ry="12" fill="#5C9A6E" />
    </svg>
  );
}

function WheatStalk({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 160" className={cn("h-28 w-auto sm:h-36", className)} aria-hidden="true">
      <path d="M40 155 L40 40" stroke="#B8892E" strokeWidth="2" fill="none" strokeLinecap="round" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i} transform={`translate(40, ${45 + i * 16})`}>
          <ellipse cx="-8" cy="0" rx="6" ry="10" fill="#C4A035" transform="rotate(-30)" />
          <ellipse cx="8" cy="0" rx="6" ry="10" fill="#D4AF37" transform="rotate(30)" />
        </g>
      ))}
    </svg>
  );
}

interface BotanicalDecorProps {
  variant?: "hero" | "section";
}

export function BotanicalDecor({ variant = "hero" }: BotanicalDecorProps) {
  const reduced = useReducedMotion();
  const float = reduced
    ? {}
    : {
        animate: { y: [0, -10, 0], rotate: [0, 2, 0] },
        transition: { duration: 5, repeat: Infinity, ease: "easeInOut" as const },
      };

  if (variant === "section") {
    return (
      <>
        <motion.div {...float} className="pointer-events-none absolute -left-4 top-8 opacity-40">
          <HopCluster />
        </motion.div>
        <motion.div
          {...float}
          transition={{ ...float.transition, delay: 1 }}
          className="pointer-events-none absolute -right-2 bottom-8 opacity-40"
        >
          <WheatStalk />
        </motion.div>
      </>
    );
  }

  return (
    <>
      <motion.div
        {...float}
        className="pointer-events-none absolute left-0 top-16 opacity-70 sm:left-4 sm:top-12"
      >
        <HopCluster className="h-32 sm:h-44" />
      </motion.div>
      <motion.div
        {...float}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        className="pointer-events-none absolute right-0 top-8 opacity-70 sm:right-4"
      >
        <WheatStalk className="h-36 sm:h-48" />
      </motion.div>
      <motion.div
        {...float}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="pointer-events-none absolute bottom-24 left-[8%] hidden opacity-50 lg:block"
      >
        <WheatStalk className="h-28 rotate-12" />
      </motion.div>
      <motion.div
        {...float}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        className="pointer-events-none absolute bottom-32 right-[10%] hidden opacity-50 lg:block"
      >
        <HopCluster className="h-28 -scale-x-100 rotate-6" />
      </motion.div>
    </>
  );
}

export function PosterStrip({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "inline-block bg-brown px-5 py-2.5 font-body text-sm font-semibold tracking-wide text-on-accent sm:px-7 sm:py-3 sm:text-base",
        className,
      )}
    >
      Polo Cervejeiro – Dia D do Turismo
    </div>
  );
}
