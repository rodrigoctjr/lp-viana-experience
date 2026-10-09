import { NextResponse } from "next/server";
import { claimVoucher, getRemaining } from "@/lib/voucher-store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const remaining = await getRemaining();
    return NextResponse.json({ remaining });
  } catch {
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }
}

export async function POST(request: Request) {
  let body: { attractionId?: string; slotId?: string; name?: string; phone?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid" }, { status: 400 });
  }

  const result = await claimVoucher({
    attractionId: body.attractionId ?? "",
    slotId: body.slotId ?? "",
    name: body.name ?? "",
    phone: body.phone ?? "",
  });

  if (!result.ok && result.reason === "unavailable") {
    return NextResponse.json(result, { status: 503 });
  }
  if (!result.ok && result.reason === "invalid") {
    return NextResponse.json(result, { status: 400 });
  }
  if (!result.ok) return NextResponse.json(result, { status: 409 });
  return NextResponse.json(result);
}
