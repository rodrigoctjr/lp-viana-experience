"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function PromoVideo({ className }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  function toggleSound() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
    if (!video.muted) void video.play();
  }

  return (
    <div
      className={cn(
        "relative mx-auto aspect-[9/16] w-full max-w-[340px] overflow-hidden rounded-3xl bg-brown-deep",
        className,
      )}
    >
      <video
        ref={videoRef}
        className="size-full object-cover"
        src="/video/viana-dia-8.mp4"
        poster="/video/viana-dia-8-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Vídeo de divulgação do Dia D do Turismo em Viana, 8 de novembro"
      />
      <button
        type="button"
        onClick={toggleSound}
        aria-pressed={!muted}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-brown-deep/80 px-4 py-2 font-mono-label text-[10px] text-on-accent backdrop-blur-sm transition-colors hover:bg-brown"
      >
        {muted ? "Ativar som" : "Silenciar"}
      </button>
    </div>
  );
}
