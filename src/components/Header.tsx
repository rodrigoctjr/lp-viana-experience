'use client';
import { useState } from 'react';
import { useCountdown } from '@/hooks/useCountdown';
import { useRsvp } from '@/context/RsvpContext';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const countdown = useCountdown();
  const { count } = useRsvp();

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="nav">
      <div className="nav-inner">
        <a href="#top" className="logo">
          <div>
            <div className="logo-mark">VIANA<span className="accent">.</span>EXP</div>
            <div className="logo-tag">Festival · ES · Edição 04</div>
          </div>
        </a>

        <div className="counters">
          <div className="counter">
            <div className="counter-icon">⌛</div>
            <div>
              <div className="counter-num">{countdown.ended ? 'AGORA!' : countdown.text}</div>
              <div className="counter-lbl">Faltam para o Dia D</div>
            </div>
          </div>
          <div className="counter">
            <div className="counter-icon">✓</div>
            <div>
              <div className="counter-num">{count.toLocaleString('pt-BR')}</div>
              <div className="counter-lbl">Pessoas Confirmadas</div>
            </div>
          </div>
        </div>

        <nav className={`menu${menuOpen ? ' open' : ''}`} id="main-menu">
          <a href="#mapa" onClick={closeMenu}>Mapa</a>
          <a href="#programacao" onClick={closeMenu}>Programação</a>
          <a href="#experiencias" onClick={closeMenu}>Experiências</a>
          <a href="#faq" onClick={closeMenu}>FAQ</a>
          <a href="#cadastro" className="cta" onClick={closeMenu}>Cadastre-se</a>
        </nav>

        <button
          className={`menu-toggle${menuOpen ? ' open' : ''}`}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setMenuOpen(o => !o)}
        >
          <span /><span /><span />
        </button>
      </div>

      {menuOpen && (
        <div className="menu-back open" onClick={closeMenu} />
      )}
    </header>
  );
}
