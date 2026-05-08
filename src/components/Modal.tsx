'use client';
import { useEffect, useState } from 'react';
import { useRsvp } from '@/context/RsvpContext';

interface Props {
  title: string;
  cat: string;
  onClose: () => void;
}

export default function Modal({ title, cat, onClose }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [confirmNum] = useState(() => String(Math.floor(Math.random() * 9000) + 1000));
  const { bump } = useRsvp();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    bump(1);
  };

  return (
    <div className="modal-back open" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>×</button>

        {submitted ? (
          <div className="modal-success">
            <div className="check">✓</div>
            <h3>Reserva confirmada!</h3>
            <p style={{ margin: '14px 0 8px', fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontSize: 17 }}>
              Você receberá um QR-Code por e-mail e WhatsApp. Apresente na Praça Central para retirar sua pulseira.
            </p>
            <div className="modal-cat" style={{ marginTop: 20 }}>CONFIRMAÇÃO Nº {confirmNum}</div>
            <button className="btn full" style={{ marginTop: 16, padding: '12px 28px' }} onClick={onClose}>Fechar</button>
          </div>
        ) : (
          <>
            <div className="modal-cat">{cat} · Reserva</div>
            <h3>{title}</h3>
            <form onSubmit={handleSubmit}>
              <label>Nome completo</label>
              <input type="text" required placeholder="Seu nome" />
              <div className="modal-row">
                <div>
                  <label>Telefone</label>
                  <input type="tel" required placeholder="(27) 9 9999-0000" />
                </div>
                <div>
                  <label>E-mail</label>
                  <input type="email" required placeholder="seu@email.com" />
                </div>
              </div>
              <div className="modal-row">
                <div>
                  <label>Data</label>
                  <select required>
                    <option>14 Nov · Sex</option>
                    <option>15 Nov · Sáb</option>
                    <option>16 Nov · Dom</option>
                  </select>
                </div>
                <div>
                  <label>Pessoas</label>
                  <select required>
                    <option>1 pessoa</option>
                    <option>2 pessoas</option>
                    <option>3 pessoas</option>
                    <option>4 pessoas</option>
                    <option>5+ pessoas</option>
                  </select>
                </div>
              </div>
              <label>Observações</label>
              <textarea rows={2} placeholder="Restrições alimentares, idade dos participantes, etc." />
              <div className="modal-actions">
                <button type="button" className="btn" onClick={onClose}>Cancelar</button>
                <button type="submit" className="btn full">Confirmar reserva →</button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
