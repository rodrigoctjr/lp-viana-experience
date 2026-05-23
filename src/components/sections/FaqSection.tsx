import { ContactForm } from "@/components/ui/Forms";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { faqItems } from "@/data/faq";

export function FaqSection() {
  return (
    <section id="faq" className="bg-surface py-20 sm:py-24">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-2">
          <ScrollReveal>
            <p className="section-eyebrow">FAQ</p>
            <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] leading-tight text-primary">
              Perguntas frequentes
            </h2>
            <div className="mt-8">
              <FaqAccordion items={faqItems} />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="rounded-xl border border-primary/10 bg-surface-elevated p-6 sm:p-8">
              <h3 className="font-display text-2xl text-primary">Fale Conosco</h3>
              <p className="mt-2 font-body text-sm text-ink/70">
                Tem dúvidas? Envie sua mensagem.
              </p>
              <div className="mt-6">
                <ContactForm variant="b2c" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
