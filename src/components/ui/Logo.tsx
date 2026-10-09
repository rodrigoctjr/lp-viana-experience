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
      <span
        className={cn("relative block w-[min(92vw,36rem)] overflow-hidden", className)}
        style={{ aspectRatio: "2.85 / 1" }}
      >
        <Image
          src="/logo/logo-desktop.png"
          alt="Viana Experience"
          fill
          className="hidden object-cover object-center sm:block"
          priority={priority}
          sizes="(min-width: 640px) 576px"
        />
        <Image
          src="/logo/logo-mobile.png"
          alt="Viana Experience"
          fill
          className="object-cover object-center sm:hidden"
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
