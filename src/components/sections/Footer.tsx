import { Logo } from "@/components/ui/Logo";
import { NAV_LINKS, WHATSAPP_INSTITUTIONAL } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-brown/20 bg-brown-deep py-12 text-on-accent">
      <div className="container-site flex flex-col items-center gap-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <Logo height={48} mobileHeight={40} />
          <p className="mt-3 font-body text-xs text-on-accent/50">
            © 2026 Viana Experience · Dia D 07.11.2026 · Viana/ES
          </p>
        </div>

        <nav aria-label="Rodapé">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-mono-label text-[10px] text-on-accent/50 transition-colors hover:text-accent-sun"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={`https://wa.me/${WHATSAPP_INSTITUTIONAL}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono-label text-[10px] text-accent-sun hover:underline"
        >
          WhatsApp
        </a>
      </div>
    </footer>
  );
}
