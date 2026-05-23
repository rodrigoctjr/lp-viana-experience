import { ContactForm } from "@/components/ui/Forms";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const blocks = [
  {
    id: "lei",
    title: "Lei de Incentivo ao Turismo",
    description:
      "Lei Municipal nº 4.218/24 — marco legal que fortalece o turismo sustentável em Viana/ES.",
    link: "https://www.viana.es.gov.br",
    linkLabel: "Prefeitura de Viana",
  },
  {
    id: "realizacao",
    title: "Realização",
    description: "Polo de Turismo de Viana + Secretaria Municipal de Turismo.",
  },
  {
    id: "projeto",
    title: "Projeto",
    description: "Viana Experience — iniciativa de Francisco Cizino para conectar demanda e oferta turística.",
  },
];

export function InstitutionalSection() {
  return (
    <section id="institucional" className="bg-primary py-20 text-on-primary sm:py-24">
      <div className="container-site">
        <ScrollReveal>
          <p className="section-eyebrow text-accent-sun">Institucional</p>
          <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] leading-tight">
            Transparência e parcerias
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {blocks.map((block) => (
            <ScrollReveal key={block.id}>
              <article className="rounded-xl border border-on-primary/10 bg-primary-deep/50 p-6">
                <h3 className="font-display text-xl">{block.title}</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-on-primary/80">
                  {block.description}
                </p>
                {block.link ? (
                  <a
                    href={block.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex min-h-11 items-center font-body text-sm font-medium text-accent-sun underline-offset-4 hover:underline"
                  >
                    {block.linkLabel} →
                  </a>
                ) : null}
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-16">
          <div className="rounded-xl bg-surface-elevated p-6 text-ink sm:p-8">
            <h3 className="font-display text-2xl text-primary">Fale Conosco — Empresas</h3>
            <p className="mt-2 font-body text-sm text-ink/70">
              Sua empresa quer fazer parte do ecossistema turístico de Viana? Preencha o formulário.
            </p>
            <div className="mt-6">
              <ContactForm variant="b2b" />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
