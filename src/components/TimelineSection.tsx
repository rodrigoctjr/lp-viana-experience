const STOPS = [
  { time: '06:00', name: 'Embarque · Praça Central', loc: 'Centro de Viana', major: false },
  { time: '08:00', name: 'Canoagem no Rio Jucu', loc: 'Margem norte · 3km', major: true },
  { time: '11:00', name: 'Trilha Cachoeira do Sítio', loc: 'Rota das Águas', major: false },
  { time: '14:00', name: 'Almoço c/ música ao vivo', loc: 'Pesque-Pague do Neném', major: true },
  { time: '16:30', name: 'Tour das Cervejarias', loc: 'Polo Bahia Nova', major: false },
  { time: '19:00', name: 'Pôr-do-sol no Mirante', loc: 'Sentido D. Martins', major: false },
  { time: '21:00', name: 'Show de encerramento', loc: 'Praça Central', major: false },
];

export default function TimelineSection() {
  return (
    <section className="timeline-section" id="programacao">
      <div className="section-head reveal">
        <div>
          <div className="section-num">SEÇÃO 02 / DIA D</div>
        </div>
        <div>
          <h2 className="section-title">A linha do tempo<br />do <em>dia inteiro.</em></h2>
          <p className="section-sub">Sábado, 15 de novembro. Saída ao amanhecer, retorno depois do pôr do sol. Cada parada com transporte coletivo entre os pontos.</p>
        </div>
      </div>

      <div className="timeline-wrap reveal">
        <div className="timeline-track">
          <div className="timeline-line" />
          <div className="timeline-stops">
            {STOPS.map((stop, i) => (
              <div key={i} className={`stop${stop.major ? ' major' : ''}`}>
                <div className="stop-content">
                  <div className="stop-time">{stop.time}</div>
                  <div className="stop-name">{stop.name}</div>
                  <div className="stop-loc">{stop.loc}</div>
                </div>
                <div className="stop-dot" />
              </div>
            ))}
          </div>
        </div>

        <div className="bus-banner reveal">
          <div className="bus-icon">⇄</div>
          <div>
            <h4>Ônibus gratuito entre todas as paradas</h4>
            <p>Saídas a cada 30 minutos · 4 linhas circulares · pulseira do evento dá acesso ilimitado</p>
          </div>
          <div className="schedule">
            Próxima saída <b>06:00</b>
            4 linhas · 28 paradas
          </div>
        </div>
      </div>
    </section>
  );
}
