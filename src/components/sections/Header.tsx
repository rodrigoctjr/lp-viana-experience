"use client";
import { DirectionArrow } from "@/components/ui/DirectionArrow";

import { useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { NAV_LINKS } from "@/lib/constants";
export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="atlas-header"><a href="#top" className="atlas-header-logo" aria-label="Viana Experience, início"><Logo height={48} mobileHeight={40} priority /></a><nav className="atlas-desktop-nav" aria-label="Principal">{NAV_LINKS.map(link => <a href={link.href} key={link.href}>{link.label}</a>)}</nav><a href="#atracoes" className="atlas-header-cta">Encontre sua experiência <DirectionArrow diagonal /></a><button className="atlas-menu-toggle" type="button" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} aria-controls="atlas-mobile-nav" onClick={() => setOpen(!open)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{open ? <path d="M5 5l14 14M5 19L19 5" /> : <path d="M3 7h18M3 12h18M3 17h18" />}</svg></button>{open ? <nav id="atlas-mobile-nav" className="atlas-mobile-nav" aria-label="Menu mobile" onKeyDown={event => { if (event.key === "Escape") setOpen(false); }}>{NAV_LINKS.map(link => <a href={link.href} key={link.href} onClick={() => setOpen(false)}>{link.label}<DirectionArrow diagonal /></a>)}</nav> : null}</header>;
}
