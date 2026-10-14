"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SectionNext } from "@/components/ui/SectionNext";
import { SectionShell } from "@/components/ui/SectionShell";
import { TextReveal } from "@/components/ui/TextReveal";
import { VoucherDialog } from "@/components/sections/VoucherDialog";
import {
  ATTRACTION_FILTERS,
  attractions,
  ATTRACTION_FORM_URL,
  whatsappClaimUrl,
  type Attraction,
  type AttractionFilter,
} from "@/data/attractions";
import { cn } from "@/lib/utils";

type RemainingMap = Record<string, Record<string, number>>;

function spotsLeft(item: Attraction, remaining: RemainingMap | null, slotId: string) {
  const live = remaining?.[item.id]?.[slotId];
  if (typeof live === "number") return live;
  return item.slots?.find((slot) => slot.id === slotId)?.capacity ?? 0;
}

function soldOut(item: Attraction, remaining: RemainingMap | null) {
  if (item.claim !== "signup" || !item.slots?.length || !remaining?.[item.id]) return false;
  return item.slots.every((slot) => spotsLeft(item, remaining, slot.id) <= 0);
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-3.5 fill-current">
      <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-5 3.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2zm0 1.6A2.2 2.2 0 1 0 14.2 12 2.2 2.2 0 0 0 12 9.8zM17.4 6.4a1 1 0 1 1-1 1 1 1 0 0 1 1-1z" />
    </svg>
  );
}

function AttractionLinks({
  item,
  onDark = false,
  remaining,
  onSignup,
}: {
  item: Attraction;
  onDark?: boolean;
  remaining: RemainingMap | null;
  onSignup: (item: Attraction) => void;
}) {
  const quiet = onDark
    ? "border-on-primary/30 text-on-primary hover:bg-on-primary/10"
    : "border-brown/25 text-brown hover:bg-brown/10";

  const actionClass =
    "inline-flex min-h-11 w-full items-center justify-center rounded-sm px-4 font-body text-xs font-bold uppercase tracking-wider transition-colors";
  const spots = item.claim === "signup" && item.slots?.length === 1 ? spotsLeft(item, remaining, item.slots[0].id) : null;

  return (
    <div className="mt-5 flex flex-col gap-2">
      <div className="flex min-h-11 flex-wrap items-center gap-2">
        {item.instagram ? (
          <a
            href={`https://www.instagram.com/${item.instagram}/`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 font-mono-label text-[10px] transition-colors",
              quiet,
            )}
          >
            <InstagramIcon />@{item.instagram}
          </a>
        ) : null}
        {item.maps ? (
          <a
            href={item.maps}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex min-h-11 items-center rounded-full border px-4 font-mono-label text-[10px] transition-colors",
              quiet,
            )}
          >
            Como chegar
          </a>
        ) : null}
        {item.website && item.claim !== "external" ? (
          <a
            href={item.website}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex min-h-11 items-center rounded-full border px-4 font-mono-label text-[10px] transition-colors",
              quiet,
            )}
          >
            {item.websiteLabel ?? "Site"}
          </a>
        ) : null}
      </div>
      {item.claim === "whatsapp" && item.phone ? (
        <a
          href={whatsappClaimUrl(item.phone, item.name, item.whatsappText)}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(actionClass, "bg-hop text-on-accent hover:bg-hop/90")}
        >
          Reservar no WhatsApp
        </a>
      ) : null}
      {item.claim === "external" && item.externalUrl ? (
        <a
          href={item.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(actionClass, "bg-brown text-on-accent hover:bg-brown-deep")}
        >
          {item.externalLabel ?? "Abrir o site"}
        </a>
      ) : null}
      {item.claim === "form" ? (
        <a
          href={ATTRACTION_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(actionClass, "bg-brown text-on-accent hover:bg-brown-deep")}
        >
          Inscrever
          <span className="sr-only"> (abre o formulário em nova aba)</span>
        </a>
      ) : null}
      {item.claim === "signup" ? (
        <button
          type="button"
          disabled={soldOut(item, remaining)}
          onClick={() => onSignup(item)}
          className={cn(
            actionClass,
            "relative",
            soldOut(item, remaining)
              ? "cursor-not-allowed bg-brown/20 text-primary/40"
              : "bg-brown text-on-accent hover:bg-brown-deep",
          )}
        >
          {soldOut(item, remaining) ? "Esgotado" : "Garantir vaga"}
          {spots !== null ? (
            <span className="absolute right-4 font-mono-label text-[10px] tracking-normal text-on-accent/75">
              {spots} {spots === 1 ? "vaga" : "vagas"}
            </span>
          ) : null}
        </button>
      ) : null}
    </div>
  );
}

function CouponButton({ code, onDark = false }: { code: string; onDark?: boolean }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(code).then(() => {
          setCopied(true);
          window.setTimeout(() => setCopied(false), 2000);
        });
      }}
      className={cn(
        "mt-3 inline-flex min-h-11 items-center self-start rounded-full border px-4 font-mono-label text-[10px] transition-colors",
        onDark
          ? "border-on-primary/30 text-on-primary hover:bg-on-primary/10"
          : "border-brown/25 bg-ochre/50 text-primary hover:bg-ochre",
      )}
    >
      {copied ? "Cupom copiado" : `Copiar cupom ${code}`}
    </button>
  );
}

function AttractionCard({
  item,
  index,
  remaining,
  onSignup,
}: {
  item: Attraction;
  index: number;
  remaining: RemainingMap | null;
  onSignup: (item: Attraction) => void;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ delay: Math.min(index * 0.06, 0.24), duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="flex h-full flex-col overflow-hidden rounded-sm border-4 border-brown/15 bg-surface-elevated shadow-[0_16px_40px_-20px_rgba(107,61,46,0.45)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.image!}
          alt={item.imageAlt ?? ""}
          fill
          className="object-cover transition-transform duration-700 ease-out hover:scale-105"
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-brown-deep/50 via-transparent to-brown-deep/10" />
        <span className="absolute left-4 top-4 rounded-sm bg-ochre px-3 py-1.5 font-mono-label text-[10px] text-primary">
          {item.category}
        </span>
        <span className="absolute bottom-4 right-4 rounded-sm bg-brown/90 px-3 py-1.5 font-mono-label text-[10px] text-on-accent">
          {item.offerShort}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="font-mono-label text-[10px] text-brown">{item.place}</p>
        <h3 className="mt-2 font-display text-[1.75rem] leading-none text-primary">{item.name}</h3>
        <p className="mt-3 font-body text-sm leading-relaxed text-primary/70">{item.summary}</p>
        <p className="mt-4 font-body text-sm text-primary">
          <span className="font-mono-label text-[10px] text-terra">No evento · </span>
          {item.offer}
        </p>
        <p className="mt-2 font-body text-xs text-primary/55">{item.hours}</p>
        {item.coupon ? <CouponButton code={item.coupon} /> : null}
        <div className="mt-auto">
          <AttractionLinks item={item} remaining={remaining} onSignup={onSignup} />
        </div>
      </div>
    </motion.article>
  );
}

export function AttractionsSection() {
  const [filter, setFilter] = useState<AttractionFilter>("Todas");
  const [remaining, setRemaining] = useState<RemainingMap | null>(null);
  const [signupItem, setSignupItem] = useState<Attraction | null>(null);
  const visible = attractions.filter((item) => filter === "Todas" || item.category === filter);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/vouchers")
      .then((response) => response.json())
      .then((data: { remaining?: RemainingMap }) => {
        if (!cancelled && data.remaining) setRemaining(data.remaining);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);
  const cards = visible;

  return (
    <SectionShell id="atracoes" variant="cream" accentBar className="scroll-mt-28">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <TextReveal as="p" className="section-eyebrow">
            Parceiros do Dia D
          </TextReveal>
          <TextReveal
            as="h2"
            className="mt-4 font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.02] text-primary"
          >
            Quem vai estar no Viana Experience.
          </TextReveal>
          <p className="mt-4 max-w-2xl font-body text-primary/65">
            Aventura com a Radical Oficial, corrida de rua, sítios, cachoeira, parque e restaurantes.
            Cada parceiro separou vagas ou cortesias para o dia 8 de novembro.
          </p>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar atrações">
          {ATTRACTION_FILTERS.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
              className={cn(
                "min-h-11 rounded-full px-4 font-mono-label text-[10px] transition-colors",
                filter === item
                  ? "bg-brown text-on-accent"
                  : "bg-brown/10 text-brown hover:bg-brown/20",
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {cards.length > 0 ? (
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((item, index) => (
            <AttractionCard
              key={item.id}
              item={item}
              index={index}
              remaining={remaining}
              onSignup={setSignupItem}
            />
          ))}
        </div>
      ) : null}

      {signupItem ? (
        <VoucherDialog
          item={signupItem}
          onClose={() => setSignupItem(null)}
          onClaimed={(slotId, left) => {
            setRemaining((current) => ({
              ...current,
              [signupItem.id]: { ...current?.[signupItem.id], [slotId]: left },
            }));
          }}
        />
      ) : null}

      <SectionNext
        copy="A lista está na mesa. A cidade ainda guarda uma pergunta com o seu nome."
        label="Responder o quiz"
        target="quiz"
      />
    </SectionShell>
  );
}
