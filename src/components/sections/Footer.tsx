import { Logo } from "@/components/ui/Logo";
import { InstitutionalLogos } from "@/components/ui/InstitutionalLogos";
import { vianaExperienceContacts } from "@/data/programacao";
import { NAV_LINKS } from "@/lib/constants";

export function Footer({ homePath = "" }: { homePath?: string }) {
  return (
    <footer className="border-t border-brown/20 bg-brown-deep pb-12 text-on-accent">
      <InstitutionalLogos className="page-institutional" />
      <div className="container-site flex flex-col items-center gap-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <Logo height={48} mobileHeight={40} />
          <p className="mt-3 font-body text-xs text-on-accent/50">
            © 2026 Viana Experience · Dia D 08.11.2026 · Viana/ES
          </p>
        </div>

        <nav aria-label="Rodapé">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={`${homePath}${link.href}`}
                  className="font-mono-label text-[10px] text-on-accent/50 transition-colors hover:text-accent-sun"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 flex-col items-center gap-3 whitespace-nowrap sm:items-end sm:text-right">
          <p className="font-mono-label text-[10px] text-accent-sun">Informações Viana Experience</p>
          <ul className="flex flex-col gap-1">
            {vianaExperienceContacts.map((contact) => (
              <li key={contact.phone}>
                <a
                  href={`https://wa.me/${contact.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-on-accent underline-offset-4 hover:underline"
                >
                  {contact.name} · {contact.phoneLabel}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
