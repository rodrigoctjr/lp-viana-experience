const ctaClassName = [
  "hero-cta inline-flex min-h-12 items-center justify-center rounded-full",
  "cursor-pointer px-8 py-3.5 font-body text-lg leading-none font-bold tracking-[0.01em]",
].join(" ");

export function PosterChrome() {
  return (
    <header className="relative z-20 w-full shrink-0 bg-soon-terra text-on-accent">
      <h1 className="px-4 py-3.5 text-center font-body text-xl leading-tight font-bold sm:py-4 sm:text-2xl lg:text-[1.75rem]">
        Site em construção
      </h1>
    </header>
  );
}

export function PosterInvite() {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center gap-5 px-4 py-8 text-center">
      <p className="max-w-lg font-body text-lg leading-snug font-bold text-soon-forest sm:text-2xl">
        Enquanto isso, o quiz e o jogo já estão abertos.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <a href="#quiz" className={ctaClassName}>
          Quiz
        </a>
        <a href="#jogo" className={ctaClassName}>
          Game
        </a>
      </div>
    </div>
  );
}
