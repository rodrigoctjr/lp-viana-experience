import Image from "next/image";
import { partners } from "@/data/partners";
import { cn } from "@/lib/utils";

// Logos suficientes por metade da faixa para cobrir telas largas, mesmo com poucos parceiros.
const MIN_LOGOS_PER_HALF = 8;
// Área visual igual para todos os logos: um logo largo fica mais baixo, um compacto fica mais alto.
const LOGO_AREA = 14000;

function logoHeight(width: number, height: number) {
  return Math.round(Math.sqrt(LOGO_AREA / (width / height)));
}

export function PartnersSection() {
  const repeat = Math.max(1, Math.ceil(MIN_LOGOS_PER_HALF / partners.length));
  const half = Array.from({ length: repeat }, () => partners).flat();

  return (
    <section id="parceiros" aria-labelledby="parceiros-titulo" className="section-cream py-16 sm:py-20">
      <div className="container-site">
        <h2
          id="parceiros-titulo"
          className="text-center font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-tight text-primary"
        >
          Parceiros do Viana Experience
        </h2>
      </div>

      <div className="group relative mt-10 [--logo-scale:0.75] sm:[--logo-scale:1] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <ul className="animate-marquee flex w-max items-center group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center">
          {[0, 1].map((copy) =>
            half.map((partner, i) => {
              const original = copy === 0 && i < partners.length;
              return (
                <li
                  key={`${copy}-${i}`}
                  aria-hidden={original ? undefined : true}
                  className={cn("shrink-0 px-8 sm:px-12", !original && "motion-reduce:hidden")}
                >
                  <Image
                    src={partner.logo}
                    alt={original ? partner.name : ""}
                    width={partner.width}
                    height={partner.height}
                    style={{ height: `calc(${logoHeight(partner.width, partner.height)}px * var(--logo-scale))` }}
                    className="w-auto object-contain"
                    sizes="240px"
                    loading="eager"
                  />
                </li>
              );
            }),
          )}
        </ul>
      </div>
    </section>
  );
}
