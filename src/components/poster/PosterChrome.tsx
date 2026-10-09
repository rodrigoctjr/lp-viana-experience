const SIGNUP_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdQauWLtG-8K0gjnoPxzP3LzkDQPnAtdmNITRx4sbqNh6AvDA/viewform";

const ctaClassName = [
  "hero-cta inline-flex min-h-12 items-center justify-center rounded-full",
  "cursor-pointer px-8 py-3.5 font-body text-lg leading-none font-bold tracking-[0.01em]",
].join(" ");

export function PosterChrome() {
  return (
    <header className="relative z-20 w-full shrink-0 bg-soon-terra text-on-accent">
      <h1 className="px-4 py-3.5 text-center font-body text-xl leading-tight font-bold sm:py-4 sm:text-2xl lg:text-[1.75rem]">
        Em breve mais detalhes de toda a programação
      </h1>
    </header>
  );
}

export function PosterSignup() {
  return (
    <div className="flex w-full flex-col items-center gap-3 px-4 pt-2 text-center">
      <p className="font-body text-base leading-snug font-semibold text-soon-forest sm:text-lg">
        Domingo, 8 de novembro
        <span className="mt-0.5 block font-medium">Vagas nas atrações</span>
      </p>
      <a
        href={SIGNUP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${ctaClassName} hero-cta-featured min-h-14 w-full max-w-[16.5rem] px-10 text-xl sm:w-auto sm:max-w-none sm:min-w-72`}
      >
        Garantir vaga
        <span className="sr-only"> (abre em nova aba)</span>
      </a>
    </div>
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
