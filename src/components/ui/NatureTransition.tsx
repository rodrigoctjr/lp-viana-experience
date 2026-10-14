"use client";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
export function NatureTransition() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  return <div ref={ref} className="nature-transition" aria-hidden="true"><motion.svg style={reduced ? undefined : { x }} viewBox="0 0 1440 90" preserveAspectRatio="none"><path d="M-120 55Q150 5 380 45T850 35T1550 55" fill="none" stroke="currentColor" strokeWidth="1" /><path d="M-120 70Q180 20 410 60T880 50T1550 70" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.45" /><path d="M-120 84Q160 34 390 74T870 64T1550 84" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.25" /></motion.svg></div>;
}
