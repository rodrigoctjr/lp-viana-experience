import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { attractions, type VoucherSlot } from "@/data/attractions";

export interface VoucherEntry {
  attractionId: string;
  slotId: string;
  name: string;
  phone: string;
  at: string;
}

type ClaimReason = "full" | "duplicate" | "invalid" | "unavailable";

export type ClaimResult =
  | { ok: true; remaining: number }
  | { ok: false; reason: ClaimReason };

export type RemainingMap = Record<string, Record<string, number>>;

const ledgerPath = path.join(process.cwd(), ".data", "voucher-ledger.json");

let chain: Promise<unknown> = Promise.resolve();

function exclusive<T>(task: () => Promise<T>): Promise<T> {
  const run = chain.then(task, task);
  chain = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

export function normalizePhone(value: string) {
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("55") && digits.length > 11) digits = digits.slice(2);
  return digits;
}

export function signupSlots() {
  return attractions.flatMap((item) =>
    item.claim === "signup" && item.slots
      ? item.slots.map((slot) => ({ attractionId: item.id, slot }))
      : [],
  );
}

function slotOf(attractionId: string, slotId: string): VoucherSlot | undefined {
  return attractions.find((item) => item.id === attractionId && item.claim === "signup")?.slots?.find((slot) => slot.id === slotId);
}

async function readEntries(): Promise<VoucherEntry[]> {
  try {
    const raw = await readFile(ledgerPath, "utf8");
    const parsed = JSON.parse(raw) as { entries?: VoucherEntry[] };
    return Array.isArray(parsed.entries) ? parsed.entries : [];
  } catch {
    return [];
  }
}

async function writeEntries(entries: VoucherEntry[]) {
  await mkdir(path.dirname(ledgerPath), { recursive: true });
  await writeFile(ledgerPath, JSON.stringify({ entries }, null, 2), "utf8");
}

function remainingFrom(entries: VoucherEntry[], capacities: { attractionId: string; slot: VoucherSlot }[]): RemainingMap {
  const remaining: RemainingMap = {};
  for (const { attractionId, slot } of capacities) {
    const taken = entries.filter((entry) => entry.attractionId === attractionId && entry.slotId === slot.id).length;
    remaining[attractionId] ??= {};
    remaining[attractionId][slot.id] = Math.max(0, slot.capacity - taken);
  }
  return remaining;
}

async function scriptCall(body: Record<string, unknown>) {
  const url = process.env.VOUCHER_SCRIPT_URL;
  const secret = process.env.VOUCHER_SCRIPT_SECRET;
  if (!url || !secret) return null;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, ...body }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Planilha indisponível");
  return response.json() as Promise<{ ok?: boolean; reason?: ClaimReason; remaining?: number | RemainingMap }>;
}

export async function getRemaining(): Promise<RemainingMap> {
  const remote = await scriptCall({ action: "status" });
  if (remote?.remaining && typeof remote.remaining === "object") return remote.remaining;
  const entries = await readEntries();
  return remainingFrom(entries, signupSlots());
}

export async function claimVoucher(input: {
  attractionId: string;
  slotId: string;
  name: string;
  phone: string;
}): Promise<ClaimResult> {
  const name = input.name.trim();
  const phone = normalizePhone(input.phone);
  const slot = slotOf(input.attractionId, input.slotId);
  if (!slot || name.length < 2 || (phone.length !== 10 && phone.length !== 11)) {
    return { ok: false, reason: "invalid" };
  }

  try {
    const remote = await scriptCall({
      action: "claim",
      attractionId: input.attractionId,
      slotId: input.slotId,
      name,
      phone,
    });
    if (remote) {
      if (remote.ok && typeof remote.remaining === "number") return { ok: true, remaining: remote.remaining };
      if (remote.reason === "full" || remote.reason === "duplicate" || remote.reason === "invalid") {
        return { ok: false, reason: remote.reason };
      }
      return { ok: false, reason: "unavailable" };
    }
  } catch {
    return { ok: false, reason: "unavailable" };
  }

  return exclusive(async () => {
    const entries = await readEntries();
    if (entries.some((entry) => entry.attractionId === input.attractionId && entry.slotId === input.slotId && entry.phone === phone)) {
      return { ok: false, reason: "duplicate" as const };
    }
    const taken = entries.filter((entry) => entry.attractionId === input.attractionId && entry.slotId === input.slotId).length;
    if (taken >= slot.capacity) return { ok: false, reason: "full" as const };
    entries.push({
      attractionId: input.attractionId,
      slotId: input.slotId,
      name,
      phone,
      at: new Date().toISOString(),
    });
    await writeEntries(entries);
    return { ok: true as const, remaining: slot.capacity - taken - 1 };
  });
}
