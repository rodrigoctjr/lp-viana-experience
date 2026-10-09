"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import type { Attraction } from "@/data/attractions";

interface VoucherDialogProps {
  item: Attraction;
  onClose: () => void;
  onClaimed: (slotId: string, remaining: number) => void;
}

const reasons: Record<string, string> = {
  full: "Essa vaga esgotou.",
  duplicate: "Este telefone já garantiu essa vaga.",
  invalid: "Confira o nome e o telefone. O telefone precisa ter DDD.",
  unavailable: "Não foi possível confirmar agora. Tente de novo.",
};

export function VoucherDialog({ item, onClose, onClaimed }: VoucherDialogProps) {
  const titleId = useId();
  const slots = item.slots ?? [];
  const [slotId, setSlotId] = useState(slots[0]?.id ?? "");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState<number | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setPending(true);
    try {
      const response = await fetch("/api/vouchers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attractionId: item.id, slotId, name, phone }),
      });
      const result = (await response.json()) as { ok?: boolean; reason?: string; remaining?: number };
      if (result.ok && typeof result.remaining === "number") {
        setDone(result.remaining);
        onClaimed(slotId, result.remaining);
        return;
      }
      setError(reasons[result.reason ?? ""] ?? reasons.unavailable);
    } catch {
      setError(reasons.unavailable);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[120] flex items-end justify-center p-4 sm:items-center" role="presentation">
      <button type="button" aria-label="Fechar" className="absolute inset-0 bg-brown-deep/55" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-md rounded-sm border-4 border-brown bg-[#f4efe2] p-6 shadow-[0_24px_64px_-12px_rgba(74,42,31,0.5)] sm:p-8"
      >
        <p className="font-mono-label text-[10px] text-brown">{item.place}</p>
        <h3 id={titleId} className="mt-2 font-display text-3xl leading-none text-primary">
          {item.name}
        </h3>
        {done !== null ? (
          <div className="mt-6">
            <p className="font-body text-base text-primary">Vaga confirmada.</p>
            <p className="mt-2 font-body text-sm text-primary/70">
              {done === 0 ? "Esta opção acabou de esgotar." : `Ainda restam ${done}.`}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 min-h-11 rounded-sm bg-brown px-6 font-body text-sm font-bold uppercase tracking-widest text-on-accent"
            >
              Fechar
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6 flex flex-col gap-4">
            {slots.length > 1 ? (
              <label className="flex flex-col gap-1.5 font-body text-sm text-primary">
                Sessão
                <select
                  value={slotId}
                  onChange={(event) => setSlotId(event.target.value)}
                  className="min-h-11 rounded-sm border border-brown/20 bg-ochre-light px-3"
                >
                  {slots.map((slot) => (
                    <option key={slot.id} value={slot.id}>
                      {slot.label}
                    </option>
                  ))}
                </select>
              </label>
            ) : (
              <p className="font-body text-sm text-primary/70">{slots[0]?.label}</p>
            )}
            <label className="flex flex-col gap-1.5 font-body text-sm text-primary">
              Nome
              <input
                required
                name="nome"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="min-h-11 rounded-sm border border-brown/20 bg-ochre-light px-3"
              />
            </label>
            <label className="flex flex-col gap-1.5 font-body text-sm text-primary">
              Telefone
              <input
                required
                name="telefone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="(27) 99999-0000"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="min-h-11 rounded-sm border border-brown/20 bg-ochre-light px-3"
              />
            </label>
            {error ? (
              <p className="font-body text-sm text-terra" role="alert">
                {error}
              </p>
            ) : null}
            <div className="mt-2 flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={pending}
                className="min-h-11 rounded-sm bg-brown px-6 font-body text-sm font-bold uppercase tracking-widest text-on-accent disabled:opacity-60"
              >
                {pending ? "Confirmando…" : "Confirmar vaga"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="min-h-11 rounded-sm border-2 border-brown/25 px-6 font-body text-sm font-bold uppercase tracking-widest text-primary"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
