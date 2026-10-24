"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { SectionShell } from "@/components/ui/SectionShell";
import { TextReveal } from "@/components/ui/TextReveal";
import { programItems, type ProgramItem } from "@/data/programacao";
import { cn, scrollToSection } from "@/lib/utils";

const dayFacts = [
  {
    id: "inicio",
    title: "Começa às 5h30",
    detail: "Corrida e caiaque abrem o dia. Os shows das 16h fecham a programação.",
  },
  {
    id: "encontro",
    title: "Cada atividade tem seu ponto de encontro",
    detail: "Confira o local, o mapa e como chegar no card de cada uma.",
  },
  {
    id: "documento",
    title: "Leve documento com foto",
    detail: "É obrigatório em todas as atividades. Inscrições até 06/11.",
  },
] as const;

const pillClass =
  "inline-flex min-h-9 items-center rounded-full border border-[#ccd9cf] px-3 font-body text-xs text-primary/80";

function whatsappUrl(phone: string) {
  return `https://wa.me/${phone}`;
}

function CopyCoupon({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    function done() {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
    // Navegadores dentro de apps (Instagram, WhatsApp) costumam bloquear a Clipboard API.
    function fallback() {
      const input = document.createElement("textarea");
      input.value = code;
      input.setAttribute("readonly", "");
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
      done();
    }
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(code).then(done, fallback);
    else fallback();
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex min-h-11 items-center gap-3 rounded-full border border-dashed border-terra/50 bg-terra/5 px-5 transition-colors hover:bg-terra/10"
    >
      <span className="font-mono-label text-[11px] text-terra">{code}</span>
      <span className="font-body text-xs text-terra" aria-live="polite">
        {copied ? "Copiado ✓" : "Copiar cupom"}
      </span>
    </button>
  );
}

function ProgramCard({ item }: { item: ProgramItem }) {
  const [open, setOpen] = useState(false);
  const panelId = `programa-${item.id}`;
  const expandable = Boolean(item.details?.length || item.signup || item.signupNote);
  const scheduleLine = item.schedule?.map((slot) => `${slot.label} ${slot.value}`).join(" · ");

  const header = (
    <>
      <div className="min-w-0 flex-1">
        {item.organizer ? (
          <p className="font-mono-label text-[10px] text-brown/70">{item.organizer}</p>
        ) : null}
        <h3 className="mt-1 font-display text-xl leading-tight text-primary sm:text-2xl">{item.title}</h3>
        <p className="mt-1 font-body text-sm text-primary/70">{item.place}</p>
        {scheduleLine ? (
          <p className="mt-2 font-body text-xs font-semibold text-brown">{scheduleLine}</p>
        ) : null}
        {item.summary ? (
          <p className="mt-2 font-body text-sm leading-relaxed text-primary/80">{item.summary}</p>
        ) : null}
      </div>
      {expandable ? (
        <span
          aria-hidden="true"
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-full border border-[#ccd9cf] text-primary transition-transform duration-300",
            open && "rotate-180 bg-primary/5",
          )}
        >
          ↓
        </span>
      ) : null}
    </>
  );

  return (
    <div
      className={cn(
        "overflow-hidden rounded-3xl border bg-surface-elevated transition-colors",
        open ? "border-brown/30" : "border-[#ccd9cf]",
      )}
    >
      {expandable ? (
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen(!open)}
          className="flex w-full items-start gap-4 rounded-none p-5 text-left transition-colors hover:bg-primary/[0.03] sm:p-6"
        >
          {header}
          <span className="sr-only">{open ? "Fechar detalhes" : "Ver detalhes"}</span>
        </button>
      ) : (
        <div className="flex items-start gap-4 p-5 sm:p-6">{header}</div>
      )}

      <AnimatePresence initial={false}>
        {expandable && open ? (
          <motion.div
            id={panelId}
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-[#ccd9cf] px-5 pb-6 pt-5 sm:px-6">
              {item.highlights?.length ? (
                <div className="flex flex-wrap gap-2">
                  {item.highlights.map((highlight) => (
                    <span key={highlight} className={pillClass}>
                      {highlight}
                    </span>
                  ))}
                </div>
              ) : null}

              {item.details?.length ? (
                <dl className="mt-5 grid gap-x-8 gap-y-4 md:grid-cols-2">
                  {item.details.map((detail, i) => (
                    <div key={`${detail.label}-${i}`}>
                      <dt className="font-mono-label text-[10px] text-brown/70">{detail.label}</dt>
                      <dd className="mt-1 font-body text-sm leading-relaxed text-primary/80">
                        {detail.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : null}

              {item.maps?.length ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.maps.map((map) => (
                    <a
                      key={map.url}
                      href={map.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(pillClass, "gap-1.5 hover:bg-primary/5")}
                    >
                      <span aria-hidden="true">⌖</span>
                      {map.label}
                    </a>
                  ))}
                </div>
              ) : null}

              <div className="mt-6 flex flex-wrap items-center gap-3">
                {item.signup ? (
                  <a
                    href={item.signup.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center rounded-full bg-brown px-5 font-body text-xs font-bold uppercase tracking-wider text-on-accent transition-colors hover:bg-brown-deep"
                  >
                    {item.signup.label}
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                ) : null}
                {item.signupNote ? (
                  <span className="inline-flex min-h-11 items-center rounded-full bg-primary/5 px-5 font-body text-xs font-bold uppercase tracking-wider text-primary/50">
                    {item.signupNote}
                  </span>
                ) : null}
                {item.coupon ? <CopyCoupon code={item.coupon} /> : null}
                {item.contact ? (
                  <a
                    href={whatsappUrl(item.contact.phone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-primary/70 underline underline-offset-4 hover:text-primary"
                  >
                    Dúvidas: {item.contact.name} · {item.contact.phoneLabel}
                  </a>
                ) : null}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function DayGuideSection() {
  return (
    <SectionShell id="programacao" variant="ochre" accentBar className="scroll-mt-28">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <TextReveal as="p" className="section-eyebrow">
            Domingo · 08/11/2026 · Programação
          </TextReveal>
          <TextReveal
            as="h2"
            className="mt-4 font-display text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.02] text-primary"
          >
            Como vai ser o dia
          </TextReveal>
          <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-primary/75 sm:text-lg">
            Da largada da corrida aos shows do fim da tarde. Abra cada atividade para ver o
            horário, o local, como chegar e o que levar.
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-terra/40 bg-terra/10 px-5 py-2 font-mono-label text-xs text-terra">
          <span className="size-2 rounded-full bg-terra" aria-hidden="true" />
          Inscrições até 06/11 · vagas limitadas
        </span>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {dayFacts.map((fact) => (
          <div key={fact.id} className="rounded-3xl border border-[#ccd9cf] bg-surface-elevated p-6">
            <p className="font-display text-xl leading-tight text-primary">{fact.title}</p>
            <p className="mt-2 font-body text-sm leading-relaxed text-primary/70">{fact.detail}</p>
          </div>
        ))}
      </div>

      <ol className="relative mt-14 space-y-4" aria-label="Programação do dia">
        {programItems.map((item, i) => {
          const sameTime = i > 0 && programItems[i - 1].time === item.time;
          return (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-3 sm:grid-cols-[88px_1fr] sm:gap-6"
            >
              <div className="sm:pt-6">
                <span
                  className={cn(
                    "font-countdown text-2xl leading-none text-brown sm:text-3xl",
                    sameTime && "sm:invisible",
                  )}
                >
                  {item.time}
                </span>
              </div>
              <ProgramCard item={item} />
            </motion.li>
          );
        })}
      </ol>

      <div className="mt-12 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={() => scrollToSection("atracoes")}
          className="rounded-full bg-brown px-6 py-3 font-body text-xs font-bold uppercase tracking-[0.12em] text-on-accent transition-transform hover:scale-[1.03]"
        >
          Ver parceiros e fazer inscrições →
        </button>
        <button
          type="button"
          onClick={() => scrollToSection("regras")}
          className="font-body text-sm text-primary/70 underline underline-offset-4 hover:text-primary"
        >
          Regras e dúvidas
        </button>
      </div>
    </SectionShell>
  );
}
