import Image from "next/image";
import { SectionShell } from "@/components/ui/SectionShell";
import { photoAlbums } from "@/data/event-photos";

export function PhotosSection() {
  return (
    <SectionShell id="fotos" variant="ochre" className="scroll-mt-28">
      <div className="max-w-3xl">
        <h2 className="font-display text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.02] text-primary">
          Nosso evento foi um sucesso!
        </h2>
        <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-primary/75 sm:text-lg">
          Acompanhe aqui algumas fotos do Dia D. Se você participou da corrida, da trilha ou do
          pêndulo, encontre suas fotos e guarde a lembrança desse dia em Viana.
        </p>
      </div>

      <ul className="mt-12 grid gap-6 md:grid-cols-2">
        {photoAlbums.map((album) => (
          <li key={album.id}>
            <a
              href={album.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block h-full overflow-hidden rounded-3xl border border-[#ccd9cf] bg-surface-elevated transition-colors hover:border-brown/40"
            >
              <span className="relative block aspect-[16/10] overflow-hidden">
                <Image
                  src={album.image}
                  alt={album.imageAlt}
                  fill
                  sizes="(max-width: 767px) 90vw, 45vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </span>
              <span className="flex items-center justify-between gap-4 p-6 sm:p-7">
                <span className="font-display text-2xl leading-tight text-primary sm:text-3xl">
                  {album.title}
                </span>
                <span className="inline-flex shrink-0 items-center gap-2 font-body text-xs font-bold uppercase tracking-wider text-brown">
                  Ver fotos
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </span>
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-8 font-body text-base text-primary/80">Marque quem estava com você!</p>
    </SectionShell>
  );
}
