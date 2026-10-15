"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { DirectionArrow } from "@/components/ui/DirectionArrow";
import type { mountPendulum } from "@/components/adventure/pendulum-scene";

const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeToMotionPreference(update: () => void) {
  const media = window.matchMedia(motionQuery);
  media.addEventListener("change", update);
  return () => media.removeEventListener("change", update);
}
const readMotionPreference = () => window.matchMedia(motionQuery).matches;
const serverMotionPreference = () => true;

export function AdventureScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "fallback">("loading");
  const reduced = useSyncExternalStore(subscribeToMotionPreference, readMotionPreference, serverMotionPreference);
  const reducedRef = useRef(reduced);
  const updateRef = useRef<(() => void) | null>(null);
  useEffect(() => { reducedRef.current = reduced; updateRef.current?.(); }, [reduced]);
  useEffect(() => {
    const canvas = canvasRef.current, section = sectionRef.current;
    if (!canvas || !section) return;
    let scene: ReturnType<typeof mountPendulum> | undefined, cancelled = false, started = false;
    let visible = false;
    const update = () => {
      if (!scene) return;
      const rect = section.getBoundingClientRect();
      const lead = innerWidth < 768 ? (section.querySelector<HTMLElement>(".adventure-copy")?.offsetHeight ?? 0) + 32 : 0;
      scene.setProgress(reducedRef.current ? .64 : (innerHeight * .35 - rect.top - lead) / Math.max(1, rect.height - lead - innerHeight * .5), !!reducedRef.current);
    };
    updateRef.current = update;
    const visibility = () => scene?.setActive(visible && !document.hidden);
    const observer = new IntersectionObserver(async entries => {
      visible = entries[0].isIntersecting;
      visibility();
      if (!visible || started) return;
      started = true;
      try {
        const { mountPendulum } = await import("@/components/adventure/pendulum-scene");
        if (cancelled) return;
        scene = mountPendulum(canvas);
        update(); visibility(); setStatus("ready");
      } catch { if (!cancelled) setStatus("fallback"); }
    }, { rootMargin: "200px 0px" });
    const lost = (event: Event) => { event.preventDefault(); if (!cancelled) { setStatus("fallback"); scene?.setActive(false); } };
    canvas.addEventListener("webglcontextlost", lost);
    observer.observe(section);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      cancelled = true; observer.disconnect();
      updateRef.current = null;
      window.removeEventListener("scroll", update); window.removeEventListener("resize", update);
      document.removeEventListener("visibilitychange", visibility); canvas.removeEventListener("webglcontextlost", lost);
      scene?.dispose();
    };
  }, []);
  return (
    <section id="aventura-em-movimento" ref={sectionRef} className="adventure-chapter" data-scene={status} data-reduced={reduced || undefined} aria-labelledby="adventure-title">
      <div className="container-site adventure-layout">
        <div className="adventure-copy"><h2 id="adventure-title">A aventura<br />começa no <em>salto.</em></h2><p>Um instante de coragem. Um novo jeito de ver Viana. Entre o verde e o rio, descubra o pêndulo e as experiências de aventura do Dia D.</p><span className="adventure-scroll-cue">{reduced || status === "fallback" ? "Um convite para viver a aventura." : "Role a página e acompanhe o salto."}</span><a href="#atracoes" className="destination-primary">Conhecer as aventuras <DirectionArrow diagonal /></a></div>
        <div className="adventure-stage">
          {status !== "ready" ? <div className="adventure-poster"><Image src="/images/atracoes/pendulo-radical.png" alt="Pessoa praticando pêndulo sobre o rio em Viana" fill sizes="(max-width: 767px) 90vw, 60vw" /></div> : null}
          <canvas ref={canvasRef} role="img" aria-label="Personagem tridimensional de capacete e equipamentos de proteção fazendo um salto de pêndulo sobre um rio. O movimento acompanha a rolagem da página." style={{ visibility: status === "ready" ? "visible" : "hidden" }} />
          <p className="adventure-scene-caption">Pêndulo · Viana, Espírito Santo</p>
        </div>
      </div>
    </section>
  );
}
