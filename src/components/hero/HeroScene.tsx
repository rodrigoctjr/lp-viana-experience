"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";

export function HeroScene() {
  const reduced = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  const leafX = useTransform(springX, [-1, 1], [-20, 20]);
  const leafY = useTransform(springY, [-1, 1], [-15, 15]);
  const hillY = useTransform(springY, [-1, 1], [8, -8]);

  useEffect(() => {
    if (reduced) return;
    function onMove(e: MouseEvent) {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY, reduced]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Warm sun glow */}
      <motion.div
        style={{ x: leafX, y: leafY }}
        className="absolute -right-[5%] -top-[10%] size-[50vw] max-w-[520px] rounded-full bg-accent-sun/35 blur-[80px] animate-pulse-glow"
      />
      <div className="absolute -left-[8%] bottom-[10%] size-[45vw] max-w-[480px] rounded-full bg-brand-green/20 blur-[90px]" />

      {/* Organic hill silhouettes */}
      <motion.svg
        style={{ y: hillY }}
        className="absolute bottom-0 w-full opacity-[0.18]"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          d="M0 280 Q360 180 720 240 T1440 200 L1440 320 L0 320 Z"
          fill="#1F3A2E"
        />
        <path
          d="M0 300 Q480 220 960 260 T1440 240 L1440 320 L0 320 Z"
          fill="#2D5A3F"
          opacity="0.7"
        />
      </motion.svg>

      {/* Contour lines — Rota das Águas & trilhas */}
      <svg
        className="absolute inset-0 size-full opacity-[0.14]"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <motion.path
          d="M0 500 Q240 420 480 460 Q720 500 960 420 Q1200 340 1440 380"
          fill="none"
          stroke="#1F3A2E"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d="M0 580 Q360 520 720 560 T1440 540"
          fill="none"
          stroke="#4A7C59"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d="M0 640 Q300 600 600 630 T1200 610 L1440 620"
          fill="none"
          stroke="#2E6E7A"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
    </div>
  );
}
