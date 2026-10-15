"use client";

import Image from "next/image";
import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Modal } from "@/components/ui/Modal";
import { DirectionArrow } from "@/components/ui/DirectionArrow";
import { destinationStories } from "@/data/destination-stories";

const ExplorerContext = createContext<((index?: number) => void) | null>(null);

export function useDestinationExplorer() {
  const open = useContext(ExplorerContext);
  if (!open) throw new Error("DestinationExplorerProvider is required");
  return open;
}

export function DestinationExplorerProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const reduced = useReducedMotion();
  const show = useCallback((start = 0) => {
    setIndex(Math.max(0, Math.min(destinationStories.length - 1, start)));
    setDirection(1);
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);
  const go = (next: number) => {
    const target = (next + destinationStories.length) % destinationStories.length;
    if (target === index) return;
    setDirection(next > index ? 1 : -1);
    setIndex(target);
    scrollRef.current?.scrollTo({ top: 0, behavior: "instant" });
  };
  const story = destinationStories[index];

  return (
    <ExplorerContext.Provider value={show}>
      {children}
      <div onKeyDown={event => {
        if (!open || event.altKey || event.ctrlKey || event.metaKey) return;
        if (event.key === "ArrowRight") { event.preventDefault(); go(index + 1); }
        if (event.key === "ArrowLeft") { event.preventDefault(); go(index - 1); }
      }}>
        <Modal open={open} onClose={close} title="Explore Viana" className="destination-explorer-dialog">
          <div ref={scrollRef} className="destination-explorer-content" onTouchStart={event => {
            if (event.touches.length !== 1) { touchStart.current = null; return; }
            const touch = event.touches[0];
            touchStart.current = { x: touch.clientX, y: touch.clientY };
          }} onTouchEnd={event => {
            const start = touchStart.current;
            touchStart.current = null;
            if (!start) return;
            const touch = event.changedTouches[0];
            const x = touch.clientX - start.x;
            const y = touch.clientY - start.y;
            if (Math.abs(x) > 60 && Math.abs(x) > Math.abs(y) * 1.5) go(index + (x < 0 ? 1 : -1));
          }} onTouchCancel={() => { touchStart.current = null; }}>
            <motion.div key={story.id} initial={reduced ? false : { opacity: .5, x: direction * 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: reduced ? 0 : .22, ease: [.23, 1, .32, 1] }}>
              <figure className="destination-explorer-photo"><div><Image src={story.image} alt={story.alt} fill sizes="(max-width: 767px) 95vw, 700px" /></div><figcaption>{story.caption}</figcaption></figure>
              <article className="destination-explorer-text" aria-labelledby="destination-explorer-heading">
                <h3 id="destination-explorer-heading">{story.title}</h3>
                {story.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                {story.details.length ? <details className="destination-explorer-details"><summary>Ler história completa</summary>{story.details.map(section => <section key={section.title}><h4>{section.title}</h4>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</section>)}</details> : null}
              </article>
            </motion.div>
          </div>
          <div className="destination-explorer-controls" aria-label="Navegar entre os temas">
            <button type="button" className="destination-explorer-previous" onClick={() => go(index - 1)} aria-label="Tema anterior"><DirectionArrow /> Anterior</button>
            <div className="destination-explorer-position"><span role="status" aria-live="polite" aria-atomic="true"><span className="sr-only">{story.title}. </span>{index + 1} de {destinationStories.length}</span><div>{destinationStories.map((item, i) => <button key={item.id} type="button" onClick={() => go(i)} aria-label={`Ir para ${item.title}`} aria-current={i === index ? "step" : undefined}><span /></button>)}</div></div>
            <button type="button" className="destination-explorer-next" onClick={() => go(index + 1)} aria-label="Próximo tema">Próximo <DirectionArrow /></button>
          </div>
        </Modal>
      </div>
    </ExplorerContext.Provider>
  );
}
