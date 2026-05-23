"use client";

import { cn } from "@/lib/utils";

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: "primary" | "secondary" | "ghost";
  loading?: boolean;
  icon?: React.ReactNode;
}

export function Button({
  variant = "primary",
  loading = false,
  icon,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const base = [
    "inline-flex min-h-11 items-center justify-center gap-2 rounded px-6",
    "font-body text-[13px] font-bold uppercase tracking-[0.08em]",
    "transition-all duration-150 ease-out",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "active:translate-y-px",
  ];

  const variants = {
    primary: [
      "bg-accent text-on-accent",
      "hover:bg-accent-hover hover:-translate-y-px",
    ],
    secondary: [
      "border-2 border-ink bg-transparent text-ink",
      "hover:bg-surface-muted",
    ],
    ghost: [
      "bg-transparent text-on-primary",
      "hover:bg-terra/20",
    ],
  };

  return (
    <button
      type="button"
      className={cn(base, variants[variant], className)}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <span
          className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      ) : null}
      {children}
      {icon && !loading ? icon : null}
    </button>
  );
}
