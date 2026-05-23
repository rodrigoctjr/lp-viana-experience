"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface FaqAccordionProps {
  items: readonly { id: string; question: string; answer: string }[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="divide-y divide-primary/10">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <article key={item.id} className="py-1">
            <h3>
              <button
                type="button"
                id={`faq-trigger-${item.id}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${item.id}`}
                className={cn(
                  "flex w-full min-h-11 items-center justify-between gap-4 py-4 text-left",
                  "font-body text-base font-medium text-primary",
                  "hover:text-accent transition-colors",
                )}
                onClick={() => setOpenId(isOpen ? null : item.id)}
              >
                {item.question}
                <span
                  className="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-muted text-primary"
                  aria-hidden="true"
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${item.id}`}
              role="region"
              aria-labelledby={`faq-trigger-${item.id}`}
              hidden={!isOpen}
              className="pb-4 font-body text-[15px] leading-relaxed text-ink/80"
            >
              {item.answer}
            </div>
          </article>
        );
      })}
    </div>
  );
}
