'use client';
import { useState } from 'react';
import Modal from './Modal';

type QuizAnswer = 'correct' | 'wrong' | null;

export default function VoucherSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [answered, setAnswered] = useState<QuizAnswer>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const options = [
    { label: 'Rio Doce', correct: false },
    { label: 'Rio Jucu', correct: true },
    { label: 'Rio São Mateus', correct: false },
    { label: 'Rio Itapemirim', correct: false },
  ];

  const handleAnswer = (index: number, correct: boolean) => {
    if (answered) return;
    setSelected(index);
    setAnswered(correct ? 'correct' : 'wrong');
  };

  return (
    <section className="voucher-section" id="cadastro">
      <div className="voucher-grid">
        <div className="voucher-banner reveal">
          <div className="section-num" style={{ color: 'var(--bone)', marginBottom: 16 }}>SEÇÃO 04 / CADASTRO</div>
          <h2>Cadastre-se<br />e ganhe <em>vouchers.</em></h2>
          <p>Brindes exclusivos, descontos em hospedagem e uma pulseira física que dá acesso ao ônibus do evento.</p>
          <div className="voucher-perks">
            <span className="perk">★ Voucher R$ 50</span>
            <span className="perk">★ Pulseira oficial</span>
            <span className="perk">★ Mapa impresso</span>
            <span className="perk">★ Brinde do evento</span>
          </div>
          <button
            className="btn full"
            style={{ padding: '16px 24px', fontSize: 13 }}
            onClick={() => setModalOpen(true)}
          >
            Quero meu voucher →
          </button>
        </div>

        <div className="quiz-card reveal">
          <div className="quiz-q">Qual rio passa pela Rota das Águas em Viana?</div>
          <div className="quiz-opts">
            {options.map((opt, i) => {
              const keys = ['A', 'B', 'C', 'D'];
              let cls = 'quiz-opt';
              if (answered) {
                if (i === selected && opt.correct) cls += ' correct';
                else if (i === selected && !opt.correct) cls += ' wrong';
                else if (opt.correct) cls += ' correct';
              }
              return (
                <button
                  key={i}
                  className={cls}
                  disabled={!!answered}
                  onClick={() => handleAnswer(i, opt.correct)}
                >
                  <span className="key">{keys[i]}</span> {opt.label}
                </button>
              );
            })}
          </div>
          {answered && (
            <div className={`quiz-result show${answered === 'correct' ? ' win' : ''}`}>
              {answered === 'correct'
                ? '🏆 Acertou! VOUCHER R$50 liberado no seu cadastro.'
                : 'Quase! Era o Rio Jucu. Tente outro quiz no Dia D para ganhar prêmios.'}
            </div>
          )}
        </div>
      </div>

      {modalOpen && (
        <Modal title="Cadastro Geral" cat="CADASTRO" onClose={() => setModalOpen(false)} />
      )}
    </section>
  );
}
