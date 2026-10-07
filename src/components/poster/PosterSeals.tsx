import Image from "next/image";

const sealClassName =
  "h-auto w-[46%] max-w-[9.5rem] object-contain sm:w-auto sm:max-h-[4.5rem] sm:max-w-[16rem] lg:max-h-24 lg:max-w-none";

export function PosterSeals() {
  return (
    <div className="mx-auto flex w-full max-w-[20rem] items-center justify-center gap-2 px-3 pt-4 sm:max-w-3xl sm:gap-6 sm:px-0">
      <Image
        src="/brands/descubra-viana.png"
        alt="Descubra Viana"
        width={208}
        height={62}
        className={sealClassName}
      />
      <span className="h-8 w-px shrink-0 bg-soon-forest sm:h-14 lg:h-16" aria-hidden="true" />
      <Image
        src="/brands/prefeitura-viana.png"
        alt="Prefeitura de Viana"
        width={240}
        height={101}
        className={sealClassName}
      />
    </div>
  );
}
