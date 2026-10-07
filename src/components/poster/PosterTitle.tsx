import Image from "next/image";

export function PosterTitle() {
  return (
    <div className="relative mt-4 w-full min-w-0 pt-2 pb-4">
      <div className="relative z-10 flex flex-col items-center gap-2">
        <Image
          src="/logo/viana-wordmark.png"
          alt="Viana"
          width={480}
          height={115}
          priority
          sizes="(min-width: 1440px) 480px, (min-width: 1024px) 400px, (min-width: 768px) 300px, 240px"
          className="h-auto w-[min(64vw,270px)] md:w-[320px] lg:w-[500px] min-[1440px]:w-[580px]"
        />
        <p className="pl-[0.42em] text-center font-body text-[24px] leading-none font-semibold tracking-[0.42em] text-soon-terra md:pl-[0.46em] md:text-[30px] md:tracking-[0.46em] lg:pl-[0.44em] lg:text-[46px] lg:tracking-[0.44em] min-[1440px]:pl-[0.42em] min-[1440px]:text-[54px] min-[1440px]:tracking-[0.42em]">
          EXPERIENCE
        </p>
        <p className="max-w-[22rem] text-center font-body text-[1.875rem] leading-[1.15] font-bold tracking-[-0.015em] text-soon-forest sm:max-w-none sm:text-4xl lg:text-5xl min-[1440px]:text-[3.5rem]">
          Dia D do Turismo
          <br className="sm:hidden" /> em Viana/ES
        </p>
      </div>
    </div>
  );
}
