'use client';
import { useCountdown } from '@/hooks/useCountdown';

export default function Hero() {
  const countdown = useCountdown();

  return (
    <section className="hero" id="top">
      <svg className="hero-deco deco-1" viewBox="0 0 200 200">
        <g fill="#E8A23B">
          <ellipse cx="100" cy="100" rx="14" ry="90" transform="rotate(20 100 100)" />
          <ellipse cx="100" cy="100" rx="14" ry="90" transform="rotate(60 100 100)" />
          <ellipse cx="100" cy="100" rx="14" ry="90" transform="rotate(100 100 100)" />
          <ellipse cx="100" cy="100" rx="14" ry="90" transform="rotate(140 100 100)" />
          <ellipse cx="100" cy="100" rx="14" ry="90" transform="rotate(-20 100 100)" />
          <circle cx="100" cy="100" r="18" fill="#B5421C" />
        </g>
      </svg>
      <svg className="hero-deco deco-2" viewBox="0 0 200 200">
        <g fill="#E8A23B" opacity="0.8">
          <path d="M 100 20 Q 60 100 100 180 Q 140 100 100 20 Z" />
          <path d="M 100 20 L 100 180" stroke="#7A2A11" strokeWidth="3" fill="none" />
        </g>
      </svg>

      <div className="hero-grid">
        <div className="reveal">
          <div className="hero-eyebrow">Viana · Espírito Santo · 14·15·16 Nov</div>
          <h1 className="hero-title">
            VIANA<br />
            <span className="line2"><span className="arrow">→</span>EXPERIENCE</span>
          </h1>
          <div className="hero-meta">
            <span>Três dias de aventura</span>
            <span>Duas rotas, uma cidade</span>
            <span>14 experiências, 12 cervejarias, 6 cachoeiras</span>
          </div>
        </div>

        <div className="hero-poster reveal">
          <div>
            <div className="poster-stamp">Contagem<br />Regres-<br />siva</div>
            <div className="poster-divider" />
          </div>
          <div className="poster-big-num">{!countdown.mounted ? '—' : countdown.ended ? '0' : countdown.days}</div>
          <div>
            <div className="poster-tag">dias para o Dia D</div>
            <div className="poster-divider" />
            <div className="poster-row">
              <span>14·NOV·26</span>
              <span>00:00 H</span>
            </div>
            <div className="poster-row" style={{ marginTop: 6 }}>
              <span>SÉRIE A</span>
              <span>Nº 998</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
