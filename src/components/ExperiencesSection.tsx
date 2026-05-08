'use client';
import { useState } from 'react';
import { EXPERIENCES, spotsClass, spotsLabel } from '@/data/experiences';
import Modal from './Modal';

const TABS = [
  { cat: 'all', label: 'Todas · 14' },
  { cat: 'aventura', label: 'Aventura' },
  { cat: 'cerveja', label: 'Polo Cervejeiro' },
  { cat: 'hospedagem', label: 'Hospedagem' },
  { cat: 'gastronomia', label: 'Gastronomia' },
];

interface ModalState { title: string; cat: string }

export default function ExperiencesSection() {
  const [activeTab, setActiveTab] = useState('all');
  const [modal, setModal] = useState<ModalState | null>(null);

  const filtered = activeTab === 'all' ? EXPERIENCES : EXPERIENCES.filter(e => e.cat === activeTab);

  return (
    <section className="exp-section" id="experiencias">
      <div className="section-head reveal">
        <div>
          <div className="section-num">SEÇÃO 03 / CATÁLOGO</div>
        </div>
        <div>
          <h2 className="section-title">Catálogo de <em>experiências.</em></h2>
          <p className="section-sub">Reserve sua vaga em qualquer atividade. Vagas limitadas — algumas com lista de espera.</p>
        </div>
      </div>

      <div className="exp-tabs reveal">
        {TABS.map(tab => (
          <button
            key={tab.cat}
            className={`tab${activeTab === tab.cat ? ' active' : ''}`}
            onClick={() => setActiveTab(tab.cat)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="exp-grid reveal">
        {filtered.map((e, i) => {
          const sc = spotsClass(e.spots, e.total);
          const sl = spotsLabel(e.spots);
          const sold = e.spots === 0;
          return (
            <article key={i} className={`exp-card ${e.color}`} style={{ animationDelay: `${i * 60}ms` }}>
              <div className="exp-image">
                <span className="exp-tag">{e.tag}</span>
                <span className={`exp-spots${sc ? ` ${sc}` : ''}`}>{sl}</span>
                <div className="placeholder"><span>{e.placeholder}</span></div>
              </div>
              <div className="exp-body">
                <div className="exp-cat">{e.cat_label}</div>
                <h3 className="exp-title">{e.title}</h3>
                <p className="exp-desc">{e.desc}</p>
                <div className="exp-foot">
                  <div className="exp-price">
                    {e.price}
                    <small>por pessoa</small>
                  </div>
                  <button
                    className={`btn${!sold ? ' full' : ''}`}
                    disabled={sold}
                    style={sold ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                    onClick={() => !sold && setModal({ title: e.title, cat: e.cat_label })}
                  >
                    {sold ? 'Lista de espera' : 'Reservar →'}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {modal && (
        <Modal title={modal.title} cat={modal.cat} onClose={() => setModal(null)} />
      )}
    </section>
  );
}
