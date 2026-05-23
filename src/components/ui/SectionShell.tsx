import { cn } from "@/lib/utils";
import { BotanicalDecor } from "@/components/ui/BotanicalDecor";

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
      {accentBar ? (
        <div
          className="absolute left-0 top-0 h-1 w-full bg-linear-to-r from-brown via-wheat to-hop"
          aria-hidden="true"
        />
      ) : null}
      {decor ? <BotanicalDecor variant="section" /> : null}
      <div className="container-site relative z-10">{children}</div>
    </section>
  );
}
