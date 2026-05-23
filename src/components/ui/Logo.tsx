import Image from "next/image";
import { cn } from "@/lib/utils";

const LOGO_ASPECT = 7680 / 4320;

interface LogoProps {
  height?: number;
  mobileHeight?: number;
  className?: string;
  priority?: boolean;
  /** Hero: largura dominante, bem maior que height */
  variant?: "default" | "hero";
}

export function Logo({
  height = 56,
  mobileHeight = 44,
  className,
  priority = false,
  variant = "default",
}: LogoProps) {
  if (variant === "hero") {
    return (
      <span className={cn("inline-flex w-full max-w-none shrink-0 justify-center lg:justify-start", className)}>
        <Image
          src="/logo/logo-desktop.png"
          alt="Viana Experience"
          width={Math.round(180 * LOGO_ASPECT)}
          height={180}
          className="hidden w-[min(92vw,36rem)] max-w-none sm:block"
          style={{ width: "min(92vw, 36rem)", height: "auto" }}
          priority={priority}
          sizes="(min-width: 640px) 576px"
        />
        <Image
          src="/logo/logo-mobile.png"
          alt="Viana Experience"
          width={Math.round(140 * LOGO_ASPECT)}
          height={140}
          className="w-[min(94vw,22rem)] max-w-none sm:hidden"
          style={{ width: "min(94vw, 22rem)", height: "auto" }}
          priority={priority}
          sizes="(max-width: 639px) 352px"
        />
      </span>
    );
  }

  const mobileWidth = Math.round(mobileHeight * LOGO_ASPECT);
  const desktopWidth = Math.round(height * LOGO_ASPECT);

  return (
    <span className={cn("inline-flex shrink-0", className)}>
      <Image
        src="/logo/logo-mobile.png"
        alt="Viana Experience"
        width={mobileWidth}
        height={mobileHeight}
        className="w-auto sm:hidden"
        style={{ height: mobileHeight, width: "auto" }}
        priority={priority}
        sizes="(max-width: 639px) 320px"
      />
      <Image
        src="/logo/logo-desktop.png"
        alt="Viana Experience"
        width={desktopWidth}
        height={height}
        className="hidden w-auto sm:block"
        style={{ height, width: "auto" }}
        priority={priority}
        sizes="480px"
      />
    </span>
  );
}
