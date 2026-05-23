"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { REF_COPY } from "@/lib/constants";

interface RefHandlerProps {
  onRefCopy: (copy: string | undefined) => void;
}

function RefHandlerInner({ onRefCopy }: RefHandlerProps) {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");

  useEffect(() => {
    onRefCopy(ref ? REF_COPY[ref] : undefined);
  }, [ref, onRefCopy]);

  return null;
}

export function RefHandler(props: RefHandlerProps) {
  return (
    <Suspense fallback={null}>
      <RefHandlerInner {...props} />
    </Suspense>
  );
}
