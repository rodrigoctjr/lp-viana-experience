'use client';
import { useState, FormEvent } from 'react';
import { FAQ } from '@/data/faq';

export default function Footer() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formSent, setFormSent] = useState(false);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <footer id="faq">
      <div className="foot-grid">
        <div className="foot-brand">
          <h3>VIANA<span className="accent">.</span>EXP</h3>
          <p>Festival de aventura, cervejaria e cultura no interior do Espírito Santo. Quarta edição.</p>
          <div className="foot-incentive">
            <b>// Realização</b>
            Polo de Turismo de Viana com apoio da Lei Municipal de Incentivo ao Turismo nº 4.218/24. Notícias do polo, regulamento e prestação de contas no portal da Prefeitura.
          </div>
        </div>

        <div className="foot-col">
          <h4>Contato</h4>
          <form className="foot-form" onSubmit={handleFormSubmit}>
            <input type="text" placeholder="Seu nome" required />
            <input type="email" placeholder="seu@email.com" required />
            <textarea placeholder="Mensagem" rows={3} />
            <button
              type="submit"
              style={formSent ? { background: '#1F3A2E', color: '#E8A23B' } : {}}
            >
              {formSent ? '✓ Enviado' : 'Enviar mensagem →'}
            </button>
          </form>
        </div>

        <div className="foot-col">
          <h4>Perguntas</h4>
          <div>
            {FAQ.map((f, i) => (
              <div
                key={i}
                className={`faq-item${openFaq === i ? ' open' : ''}`}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="faq-q">
                  <span>{f.q}</span>
                  <span className="arrow">+</span>
                </div>
                <div className="faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="foot-bottom">
        <div className="copy">© 2026 Viana Experience · Edição 04 · Espírito Santo</div>
        <a
          href="#"
          className="foot-whats"
          onClick={(e) => { e.preventDefault(); alert('Abrindo WhatsApp Institucional…'); }}
        >
          <span className="dot" />
          WhatsApp Institucional · (27) 9 9999 0000
        </a>
      </div>
    </footer>
  );
}
