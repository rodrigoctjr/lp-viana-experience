"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { heroSlides } from "@/data/hero-slides";

const SLIDE_MS = 3500;
const FADE_S = 0.6;

/** Índice do slide ativo. Avança sozinho enquanto `playing`; um clique reinicia a contagem. */
export function useHeroRotation(playing: boolean) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const rotating = playing && !reduced;

  useEffect(() => {
    if (!rotating) return;
    const timer = window.setTimeout(() => {
      setActive((i) => (i + 1) % heroSlides.length);
    }, SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [rotating, active]);

  useEffect(() => {
    if (!playing) setActive(0);
  }, [playing]);

  const goTo = useCallback((index: number) => setActive(index), []);

  return { active, goTo, rotating };
}

export function HeroCarousel({ active, rotating }: { active: number; rotating: boolean }) {
  const reduced = useReducedMotion();

  return (
    <>
      {heroSlides.map((slide, i) => {
        const isActive = i === active;
        return (
          <motion.div
            key={slide.id}
            className="hero-slide"
            initial={false}
            animate={{ opacity: isActive ? 1 : 0, scale: isActive && rotating ? 1.06 : 1 }}
            transition={{
              opacity: { duration: reduced ? 0 : FADE_S, ease: "easeInOut" },
              scale: isActive
                ? { duration: SLIDE_MS / 1000 + FADE_S, ease: "linear" }
                : { duration: 0, delay: FADE_S },
            }}
          >
            <Image
              src={slide.desktop}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className={`hero-city-image${slide.mobile ? " hero-slide-desktop" : ""}`}
            />
            {slide.mobile ? (
              <Image
                src={slide.mobile}
                alt=""
                fill
                sizes="100vw"
                className="hero-city-image hero-slide-mobile"
              />
            ) : null}
          </motion.div>
        );
      })}
    </>
  );
}

export function HeroFilmstrip({
  active,
  rotating,
  onSelect,
}: {
  active: number;
  rotating: boolean;
  onSelect: (index: number) => void;
}) {
  const listRef = useRef<HTMLUListElement>(null);

  // Mantém a miniatura ativa visível quando a fita rola na horizontal, sem mexer no scroll da página.
  useEffect(() => {
    const list = listRef.current;
    const item = list?.children[active] as HTMLElement | undefined;
    if (!list || !item) return;
    const left = item.offsetLeft - (list.clientWidth - item.offsetWidth) / 2;
    list.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  return (
    <motion.nav
      className="hero-filmstrip"
      aria-label="Atividades do Dia D"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <ul ref={listRef}>
        {heroSlides.map((slide, i) => {
          const isActive = i === active;
          return (
            <li key={slide.id}>
              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-pressed={isActive}
                aria-label={`Ver ${slide.label}`}
                data-active={isActive || undefined}
              >
                <Image src={slide.desktop} alt="" fill sizes="120px" />
                <span>{slide.label}</span>
                {isActive && rotating ? (
                  <i
                    key={`progress-${active}`}
                    className="hero-filmstrip-progress"
                    style={{ animationDuration: `${SLIDE_MS}ms` }}
                  />
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
