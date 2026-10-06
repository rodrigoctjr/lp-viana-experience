const WORDMARK_CROP = {
  width: "123.6715%",
  height: "280.1556%",
  left: "-10.596%",
  top: "-70.1686%",
} as const;

const ACTIVITIES = [
  {
    label: "Descida de caiaque no rio Jucu",
    Icon: IconKayak,
  },
  {
    label: "Pêndulo",
    Icon: IconPendulum,
  },
  {
    label: "Trilha",
    Icon: IconTrail,
  },
  {
    label: "Banho de floresta",
    Icon: IconForest,
  },
] as const;

function activityCellClass(index: number) {
  const parts = ["flex flex-col items-center gap-3 border-soon-forest/15 px-3 py-5 md:border-0"];
  if (index % 2 === 0) parts.push("max-md:border-r");
  if (index < 2) parts.push("max-md:border-b");
  return parts.join(" ");
}

export function ComingSoonPoster() {
  return (
    <section className="relative overflow-hidden bg-soon-cream text-soon-forest" aria-labelledby="viana-experience-title">
      <TopTerrain />
      <BottomTerrain />
      <Horizon />
      <LeafCluster className="pointer-events-none absolute -left-8 top-6 hidden w-40 text-soon-leaf sm:block lg:w-52" />
      <TropicalCluster className="pointer-events-none absolute -right-6 top-0 w-36 text-soon-leaf sm:w-48 lg:-right-2 lg:w-60" />
      <LeafCluster className="pointer-events-none absolute -left-10 bottom-2 w-40 -scale-x-100 text-soon-leaf sm:w-52 lg:w-64" />
      <TropicalCluster className="pointer-events-none absolute -right-8 bottom-0 w-44 rotate-12 text-soon-leaf sm:w-56 lg:w-72" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1200px] flex-col items-center px-5 pb-36 pt-8 sm:px-8 sm:pb-44 sm:pt-10 lg:pb-48 lg:pt-16">
        <p className="rounded-full bg-soon-terra px-5 py-2 font-body text-[11px] font-semibold tracking-[0.16em] text-white uppercase sm:absolute sm:top-7 sm:right-8 lg:top-8 lg:right-10">
          Site em construção
        </p>

        <h1 id="viana-experience-title" className="mt-8 flex w-full flex-col items-center sm:mt-10">
          <span className="sr-only">Viana Experience</span>
          <Wordmark />
          <span
            aria-hidden="true"
            className="mt-3 flex w-full max-w-[40rem] justify-between px-1 font-body text-[clamp(0.8rem,2.4vw,1.55rem)] font-semibold text-soon-terra"
          >
            {"EXPERIENCE".split("").map((letter, index) => (
              <span key={`${letter}-${index}`}>{letter}</span>
            ))}
          </span>
        </h1>

        <p className="mt-5 max-w-[22rem] text-center font-body text-[clamp(1.35rem,2.7vw,2.15rem)] leading-tight font-bold sm:max-w-none">
          Dia D do Turismo <span className="block sm:inline">em Viana/ES</span>
        </p>

        <ul className="mt-10 grid w-full max-w-xl grid-cols-2 md:mt-14 md:max-w-4xl md:grid-cols-4 md:gap-6">
          {ACTIVITIES.map((activity, index) => (
            <li key={activity.label} className={activityCellClass(index)}>
              <span className="flex size-[4.75rem] items-center justify-center rounded-full bg-soon-icon text-soon-forest sm:size-[5.5rem]">
                <activity.Icon />
              </span>
              <span className="max-w-[8.5rem] text-center font-body text-[13px] leading-snug font-medium text-balance sm:max-w-[9.5rem] sm:text-sm">
                {activity.label}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-8 font-body text-lg font-medium sm:mt-10 sm:text-xl">E outras experiências</p>

        <div className="mt-10 flex flex-col items-center gap-8 sm:mt-12 sm:flex-row sm:gap-10">
          <DescubraMark />
          <span className="hidden h-14 w-px bg-soon-forest/25 sm:block" aria-hidden="true" />
          <PrefeituraMark />
        </div>

        <nav aria-label="Conteúdos já disponíveis" className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-body text-sm font-semibold">
          <a href="#quiz" className="underline-offset-4 hover:underline focus-visible:underline">
            Quiz de Viana
          </a>
          <span aria-hidden="true" className="text-soon-terra">
            ·
          </span>
          <a href="#jogo" className="underline-offset-4 hover:underline focus-visible:underline">
            Jogo da bike
          </a>
        </nav>
      </div>
    </section>
  );
}

export function ComingSoonClose() {
  return (
    <footer className="bg-soon-forest-deep px-6 py-8 text-center">
      <p className="font-body text-sm text-soon-cream/90">Viana Experience · Dia D do Turismo · Viana/ES</p>
    </footer>
  );
}

function Wordmark() {
  return (
    <span className="relative block w-full max-w-[52rem] overflow-hidden" style={{ aspectRatio: "6210 / 1542" }} aria-hidden="true">
      <span className="viana-wordmark-mask absolute block" style={WORDMARK_CROP} />
      <span
        className="absolute block aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full bg-soon-dot"
        style={{ left: "36.9907%", top: "15.0246%", width: "6.6%" }}
      />
    </span>
  );
}

function TopTerrain() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-24 sm:h-32 lg:h-40" aria-hidden="true">
      <svg viewBox="0 0 1440 180" preserveAspectRatio="none" className="h-full w-full">
        <path
          className="fill-soon-forest-deep"
          d="M0 0H1440V78C1290 64 1160 108 1020 90C860 70 790 36 640 54C470 74 360 128 210 104C120 90 50 118 0 100Z"
        />
        <path
          className="fill-none stroke-soon-terra"
          strokeWidth="7"
          d="M0 100C50 118 120 90 210 104C360 128 470 74 640 54C790 36 860 70 1020 90C1160 108 1290 64 1440 78"
        />
      </svg>
    </div>
  );
}

function BottomTerrain() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 sm:h-40 lg:h-52" aria-hidden="true">
      <svg viewBox="0 0 1440 220" preserveAspectRatio="none" className="h-full w-full">
        <path
          className="fill-soon-forest-deep"
          d="M0 96C150 48 280 136 470 104C660 72 760 18 980 72C1160 116 1280 42 1440 80V220H0Z"
        />
        <path
          className="fill-none stroke-soon-terra"
          strokeWidth="7"
          d="M0 96C150 48 280 136 470 104C660 72 760 18 980 72C1160 116 1280 42 1440 80"
        />
      </svg>
    </div>
  );
}

function Horizon() {
  return (
    <svg
      viewBox="0 0 1200 460"
      preserveAspectRatio="xMidYMid meet"
      className="pointer-events-none absolute inset-x-0 top-[34%] h-[34%] w-full text-soon-line"
      aria-hidden="true"
    >
      <path d="M-10 250C70 228 130 286 220 262C310 238 350 206 450 230" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M-10 286C90 262 150 322 250 298C340 276 390 250 480 272" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M20 322C110 308 170 352 260 332" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M260 340L390 168L470 236L560 96L650 214L770 132L880 248L1000 156L1140 330"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M320 340L450 214L530 262L620 176L730 286L850 198L980 300"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <circle cx="1008" cy="78" r="26" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M900 108c12-10 24-10 36 0M948 92c10-9 20-9 30 0" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function LeafCluster({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 250" fill="none" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M86 242C80 186 66 132 98 46" />
        <path d="M98 46c18 32 48 42 78 22-26 34-54 42-78 28" />
        <path d="M104 68c22-2 44-12 66 0" />
        <path d="M78 156C46 132 30 96 42 62c14 38 30 64 48 80" />
        <path d="M54 96c12 6 26 16 38 30" />
        <path d="M90 176c30-16 52-8 74-24-28 24-52 32-78 38" />
        <path d="M108 168c14 8 26 6 40-6" />
        <path d="M102 124c26-8 46-2 64-16-24 20-46 24-66 30" />
        <path d="M118 118c8 8 14 10 22 8" />
      </g>
    </svg>
  );
}

function TropicalCluster({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 270" fill="none" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M78 258c8-62-6-112 24-186" />
        <path d="M102 80c36-30 74-18 100 18-28-6-48 16-30 46-28-10-48 12-28 38-30-16-46-34-32-62-20 12-34-12-10-40z" />
        <path d="M128 96l14 20M156 108l10 22M136 140l18 12" />
        <path d="M96 148C52 126 28 82 46 36c14 48 38 78 62 98" />
        <path d="M60 74c16 10 32 24 44 46" />
        <path d="M108 190c34-14 64 2 82-16-28 30-60 34-86 28" />
        <path d="M128 186c12 6 22 4 32-6" />
      </g>
    </svg>
  );
}

function IconKayak() {
  return (
    <svg viewBox="0 0 72 56" className="h-10 w-14 sm:h-12 sm:w-16" aria-hidden="true">
      <path fill="currentColor" d="M10 8c3.4 0 5.6 2.6 5.2 5.4l-4.2.8C10.2 12 9.2 10 8.4 8.6 8.8 8.2 9.4 8 10 8z" />
      <path fill="currentColor" d="M52 30.5c2.8 2.6 2.2 6.4-.8 8l-3.4-2.8c1.8-1.2 2.4-3.2 1.4-5.2z" />
      <rect fill="currentColor" x="16" y="16" width="30" height="3.2" rx="1.6" transform="rotate(28 31 17.6)" />
      <circle cx="33" cy="20" r="4" fill="currentColor" />
      <path fill="currentColor" d="M29 24c.6 5.2-.4 8.4 1.2 10.6h6.2c.8-3.4-.2-6.8-1.2-10.4-1.8 1.2-4.4 1.2-6.2-.2z" />
      <path fill="currentColor" d="M4 38c6-1 12 2 32 2s26-3 32-2c-1 7-14 11-32 11S6 45 4 38z" />
      <path d="M16 39.5c10 2.2 30 2.2 40 0" fill="none" stroke="var(--color-soon-icon)" strokeWidth="1.6" />
    </svg>
  );
}

function IconPendulum() {
  return (
    <svg viewBox="0 0 64 64" className="h-11 w-11 sm:h-12 sm:w-12" aria-hidden="true">
      <path fill="currentColor" opacity="0.4" d="M6 56 22 14l7 12-9 30H6z" />
      <path d="M22 15.5 48 30" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
      <g fill="currentColor" transform="rotate(-18 46 38)">
        <circle cx="44" cy="26" r="3.5" />
        <path d="M40.2 29.2h8.2l1.4 9.2h-11z" />
        <path d="M40.6 38.2 37 50h5.2l2.4-11.8zM46.2 38.4l4.2 10.8h5L50.6 38z" />
      </g>
    </svg>
  );
}

function IconTrail() {
  return (
    <svg viewBox="0 0 64 64" className="h-11 w-11 sm:h-12 sm:w-12" aria-hidden="true">
      <path fill="currentColor" opacity="0.32" d="M0 56 16 34l8 10L36 24l12 14 16-20v38H0z" />
      <circle cx="28" cy="20" r="4" fill="currentColor" />
      <path fill="currentColor" d="M24 24h7.2l1.6 12H22.2z" />
      <path fill="currentColor" d="M31.2 25.2h6.2l-.8 8.2h-5.6z" />
      <path fill="currentColor" d="M23.2 35.6 19 52h5.4l3.2-16.4zM30.4 35.8l1.2 16.2h5.4L34.6 36z" />
      <path d="M16 28.5 25.5 38" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path fill="currentColor" d="m14.2 26 5 2.2-1.6 3.4-5-2.2z" />
    </svg>
  );
}

function IconForest() {
  return (
    <svg viewBox="0 0 64 64" className="h-11 w-11 sm:h-12 sm:w-12" aria-hidden="true">
      <path d="M30 58c1-14 2-26 1-38" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path fill="currentColor" d="M28 42C12 38 6 26 12 16c8 4 14 14 16 26z" />
      <path d="M22 36c-1-8 1-14 4-18" fill="none" stroke="var(--color-soon-icon)" strokeWidth="1.3" />
      <path fill="currentColor" d="M34 36c12-6 22-2 24 8-8 4-16 2-24-8z" />
      <path d="M42 38c6 0 12 2 16 5" fill="none" stroke="var(--color-soon-icon)" strokeWidth="1.3" />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M30 8c8-6 20-4 24 6 2 6-1 11-6 13 5 2 8 7 6 13-7 5-16 1-18-6-3 6-12 8-17 3-3-6 2-12 8-14-3-3-5-8-3-13 1-2 4-3 6-2zm8 10.5a2.2 2.2 0 1 0 .1 0zm6 8a2 2 0 1 0 .1 0z"
      />
    </svg>
  );
}

function DescubraMark() {
  return (
    <div className="flex items-center gap-3">
      <svg viewBox="0 0 68 78" className="h-16 w-14 text-soon-forest" aria-hidden="true">
        <path fill="currentColor" d="M10 8 32 70h8L22 8H10z" />
        <path fill="currentColor" d="M58 10 36 70h-8l18-50 4-12h8z" />
        <path fill="currentColor" d="M46 6c8 8 14 12 18 22-10-2-16-10-18-22z" />
        <path fill="currentColor" d="M52 14c2 6 2 10 0 14 4-4 8-6 12-8-4-4-8-6-12-6z" opacity="0.35" />
      </svg>
      <div className="leading-none">
        <p className="font-display text-[1.35rem] text-soon-forest/80 italic">descubra</p>
        <p className="mt-1 font-body text-[1.65rem] font-extrabold tracking-[0.08em]">VIANA</p>
      </div>
    </div>
  );
}

function PrefeituraMark() {
  return (
    <div className="flex items-center gap-3">
      <svg viewBox="0 0 72 86" className="h-[4.25rem] w-14" aria-hidden="true">
        <path fill="currentColor" className="text-soon-forest" d="M36 2 66 14v28c0 18-12 32-30 40C18 74 6 60 6 42V14L36 2z" />
        <path fill="var(--color-soon-cream)" d="M36 10 58 19v23c0 14-9 25-22 31-13-6-22-17-22-31V19L36 10z" />
        <path fill="currentColor" className="text-soon-forest" d="M20 40h32v7H20z" />
        <path fill="currentColor" className="text-soon-forest" d="M24 30h6v10h-6zM33 26h6v14h-6zM42 30h6v10h-6z" />
        <path fill="currentColor" className="text-soon-terra" d="M16 62h40l-4 8H20l-4-8z" />
        <path fill="var(--color-soon-cream)" d="M28 64.2h16v3.2H28z" />
      </svg>
      <div className="leading-tight">
        <p className="font-body text-[10px] font-semibold tracking-[0.22em]">PREFEITURA</p>
        <p className="font-body text-[1.65rem] font-extrabold tracking-[0.08em]">VIANA</p>
      </div>
    </div>
  );
}
