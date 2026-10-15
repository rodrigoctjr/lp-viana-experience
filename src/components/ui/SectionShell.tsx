import { cn } from "@/lib/utils";
import { NatureTransition } from "@/components/ui/NatureTransition";
import { NatureBackdrop } from "@/components/ui/NatureBackdrop";

type SectionVariant = "ochre" | "cream" | "brown" | "nature";

const variantClasses: Record<SectionVariant, string> = {
  ochre: "section-ochre text-ink",
  cream: "section-cream text-ink",
  brown: "bg-brown text-on-accent",
  nature: "mesh-nature text-on-primary",
};

interface SectionShellProps {
  id: string;
  variant?: SectionVariant;
  children: React.ReactNode;
  className?: string;
  decor?: boolean;
  accentBar?: boolean;
}

export function SectionShell({
  id,
  variant = "ochre",
  children,
  className,
  decor = true,
  accentBar = false,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(
        "grain relative overflow-hidden py-24 sm:py-32",
        variantClasses[variant],
        className,
      )}
    >
      {decor || accentBar ? <NatureTransition /> : null}
      {decor ? <NatureBackdrop /> : null}
      <div className="container-site relative z-10">{children}</div>
    </section>
  );
}
