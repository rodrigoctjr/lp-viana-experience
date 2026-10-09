"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 80);
  });

  function handleNav(href: string) {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-0 right-0 top-0 z-[100] px-4 pt-4 sm:px-6"
      >
        <div
          className={cn(
            "mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2 transition-all duration-500 sm:px-6 sm:py-3",
            scrolled
              ? "border border-brown/15 bg-brown/95 shadow-[0_8px_32px_rgba(107,61,46,0.25)] backdrop-blur-xl"
              : "bg-ochre/60 backdrop-blur-sm",
          )}
        >
          <a href="#top" aria-label="Início">
            <Logo height={52} mobileHeight={44} priority />
          </a>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Principal">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3 py-2 font-body text-xs font-medium uppercase tracking-wider transition-colors",
                  scrolled
                    ? "text-on-accent/80 hover:bg-on-accent/10 hover:text-on-accent"
                    : "text-primary/70 hover:bg-primary/5 hover:text-primary",
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className={cn(
              "flex size-10 items-center justify-center rounded-full lg:hidden",
              scrolled ? "text-on-accent" : "text-primary",
            )}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </motion.header>

      {menuOpen ? (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-x-4 top-[5.5rem] z-[99] rounded-2xl border border-brown/15 bg-brown/95 p-4 backdrop-blur-xl lg:hidden"
          aria-label="Menu mobile"
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              type="button"
              className="block w-full rounded-xl px-4 py-3 text-left font-body text-sm text-on-accent hover:bg-on-accent/10"
              onClick={() => handleNav(link.href)}
            >
              {link.label}
            </button>
          ))}
        </motion.nav>
      ) : null}
    </>
  );
}
