"use client";

import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { BotanicalDecor } from "@/components/ui/BotanicalDecor";
import { TextReveal } from "@/components/ui/TextReveal";

export function MapSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mapRef = useRef<SVGSVGElement>(null);
  const inView = useInView(mapRef, { once: true, margin: "-15%" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const mapY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      id="mapa"
      ref={sectionRef}
      className="grain section-ochre relative overflow-hidden py-24 sm:py-32"
    >
      <BotanicalDecor variant="section" />
      <div
        className="pointer-events-none absolute left-0 top-0 h-1 w-full bg-linear-to-r from-hop via-brand-green to-rio"
        aria-hidden="true"
      />

      <div className="container-site relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <TextReveal as="p" className="section-eyebrow">
              Mapa & rotas
            </TextReveal>
            <TextReveal
              as="h2"
              className="mt-4 font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] text-primary"
            >
              Duas rotas. Uma cidade.
            </TextReveal>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-6 font-body text-base leading-relaxed text-primary/70"
            >
              Do Rio Jucu às cervejarias artesanais — a Rota das Águas encontra o Polo
              Cervejeiro no coração capixaba.
            </motion.p>

            <div className="mt-10 space-y-4">
              {[
                { color: "#2E6E7A", label: "Rota das Águas", desc: "Rio Jucu · trilhas · canoagem" },
                { color: "#6B3D2E", label: "Polo Cervejeiro", desc: "Cervejarias · degustações · cultura" },
              ].map((route, i) => (
                <motion.a
                  key={route.label}
                  href="#o-que-vem"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.15 }}
                  whileHover={{ x: 8 }}
                  className="group flex items-center gap-4 rounded-sm border-2 border-brown/15 bg-paper p-4 shadow-sm transition-shadow hover:shadow-[0_8px_32px_-8px_rgba(107,61,46,0.25)]"
                >
                  <div
                    className="size-3 rounded-full shadow-[0_0_12px_currentColor]"
                    style={{ backgroundColor: route.color, color: route.color }}
                  />
                  <div>
                    <p className="font-body font-bold text-primary">{route.label}</p>
                    <p className="font-mono-label text-[10px] text-primary/50">{route.desc}</p>
                  </div>
                  <span className="ml-auto text-brown opacity-0 transition-opacity group-hover:opacity-100">
                    →
                  </span>
                </motion.a>
              ))}
            </div>
          </div>

          <motion.div style={{ y: mapY }} className="relative">
            <div className="absolute -inset-4 rounded-sm bg-linear-to-br from-brown/20 via-transparent to-hop/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-sm border-4 border-brown/25 bg-ochre-light p-4 shadow-[0_24px_64px_-16px_rgba(107,61,46,0.4)] ring-2 ring-brown/10">
              <svg
                ref={mapRef}
                viewBox="0 0 600 400"
                className="w-full rounded-sm"
                role="img"
                aria-label="Mapa das duas rotas turísticas de Viana"
              >
                <rect width="600" height="400" fill="#F2DB8A" rx="4" />

                <g opacity="0.12">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <path
                      key={`c${i}`}
                      d={`M0 ${60 + i * 35} Q300 ${40 + i * 35} 600 ${60 + i * 35}`}
                      fill="none"
                      stroke="#1F3A2E"
                      strokeWidth="0.8"
                    />
                  ))}
                </g>

                <motion.path
                  d="M80 320 Q180 220 280 260 Q380 300 480 180 Q540 120 520 80"
                  fill="none"
                  stroke="#2E6E7A"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : {}}
                  transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.path
                  d="M100 100 Q220 180 340 160 Q460 140 500 280"
                  fill="none"
                  stroke="#6B3D2E"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : {}}
                  transition={{ duration: 2.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />

                {inView &&
                  [
                    { cx: 80, cy: 320, c: "#2E6E7A" },
                    { cx: 520, cy: 80, c: "#2E6E7A" },
                    { cx: 100, cy: 100, c: "#6B3D2E" },
                    { cx: 500, cy: 280, c: "#6B3D2E" },
                  ].map((dot, i) => (
                    <motion.circle
                      key={i}
                      cx={dot.cx}
                      cy={dot.cy}
                      r="7"
                      fill={dot.c}
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.3, 1] }}
                      transition={{ delay: 1.5 + i * 0.15, duration: 0.5 }}
                    />
                  ))}
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
