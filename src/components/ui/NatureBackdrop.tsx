"use client";

import { useInView } from "motion/react";
import { useRef } from "react";

function LeafBranch({ className }: { className: string }) {
  return <svg className={className} viewBox="0 0 240 360" fill="none" aria-hidden="true">
    <path d="M128 352C107 253 141 156 112 23" stroke="currentColor" strokeWidth="1.5" />
    {[0, 1, 2, 3].map(i => <g key={i} transform={`translate(0 ${i * 66})`}>
      <path d="M120 100C62 99 28 66 35 31C79 31 111 53 120 100Z" fill="currentColor" fillOpacity=".4" />
      <path d="M123 127C177 128 214 95 208 58C162 61 135 85 123 127Z" fill="currentColor" fillOpacity=".32" />
      <path d="M120 100L49 43M123 127L195 72" stroke="currentColor" strokeWidth="1" />
    </g>)}
  </svg>;
}

export function NatureBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: .05 });
  return <div ref={ref} className="nature-backdrop" data-active={visible} aria-hidden="true">
    <LeafBranch className="nature-bough nature-bough-left" />
    <LeafBranch className="nature-bough nature-bough-right" />
    <svg className="nature-water" viewBox="0 0 1440 240" preserveAspectRatio="none" fill="none">
      <path d="M-150 150C120 15 370 225 720 105S1260 30 1600 135M-150 175C150 40 400 250 750 130S1290 55 1600 160M-150 200C180 65 430 275 780 155S1320 80 1600 185" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  </div>;
}
