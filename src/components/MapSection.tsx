export default function MapSection() {
  return (
    <section className="map-section" id="mapa">
      <div className="section-head reveal">
        <div>
          <div className="section-num">SEÇÃO 01 / MAPA</div>
        </div>
        <div>
          <h2 className="section-title">Duas rotas. <em>Uma cidade.</em></h2>
          <p className="section-sub">A cidade de Viana se desenrola em dois sentidos — para cima das águas e do verde, para baixo do lúpulo e da fumaça das churrasqueiras.</p>
        </div>
      </div>

      <div className="map-frame reveal">
        <div className="map-canvas">
          <svg className="map-svg" viewBox="0 0 1600 900" preserveAspectRatio="none">
            <path d="M 1600 200 Q 1300 280 1100 250 Q 850 210 700 320 Q 580 410 500 380 Q 350 340 200 480 Q 80 590 0 560"
              stroke="#2E6E7A" strokeWidth="22" fill="none" opacity="0.85" strokeLinecap="round" />
            <path d="M 1600 200 Q 1300 280 1100 250 Q 850 210 700 320 Q 580 410 500 380 Q 350 340 200 480 Q 80 590 0 560"
              stroke="#F1E7D0" strokeWidth="2" fill="none" strokeDasharray="8 8" />
            <path d="M 0 700 Q 200 650 380 690 Q 560 730 740 670 Q 920 610 1100 660 Q 1280 720 1600 680"
              stroke="#1A1410" strokeWidth="6" fill="none" strokeDasharray="2 14" strokeLinecap="round" />
            <path d="M 0 700 Q 200 650 380 690 Q 560 730 740 670 Q 920 610 1100 660 Q 1280 720 1600 680"
              stroke="#B5421C" strokeWidth="14" fill="none" opacity="0.4" />
            <g fill="#1F3A2E" opacity="0.85">
              <polygon points="1300,260 1380,160 1460,260" />
              <polygon points="1230,290 1290,210 1350,290" />
              <polygon points="980,250 1050,170 1120,250" />
              <polygon points="800,330 870,230 940,330" />
            </g>
            <g fill="#11231C" opacity="0.7">
              <polygon points="1340,260 1380,200 1420,260" />
              <polygon points="1010,250 1050,200 1090,250" />
              <polygon points="830,330 870,270 910,330" />
            </g>
            <g fill="#1F3A2E">
              <circle cx="600" cy="370" r="14" /><rect x="597" y="380" width="6" height="14" fill="#7A2A11" />
              <circle cx="380" cy="430" r="16" /><rect x="377" y="442" width="6" height="14" fill="#7A2A11" />
              <circle cx="260" cy="510" r="13" /><rect x="257" y="520" width="6" height="14" fill="#7A2A11" />
              <circle cx="900" cy="290" r="15" /><rect x="897" y="302" width="6" height="14" fill="#7A2A11" />
            </g>
            <g fill="#B5421C">
              <rect x="300" y="650" width="22" height="32" rx="2" />
              <rect x="540" y="640" width="22" height="32" rx="2" />
              <rect x="820" y="630" width="22" height="32" rx="2" />
              <rect x="1080" y="640" width="22" height="32" rx="2" />
              <rect x="1330" y="660" width="22" height="32" rx="2" />
            </g>
            <g fill="#7A2A11">
              <rect x="300" y="648" width="22" height="4" />
              <rect x="540" y="638" width="22" height="4" />
              <rect x="820" y="628" width="22" height="4" />
              <rect x="1080" y="638" width="22" height="4" />
              <rect x="1330" y="658" width="22" height="4" />
            </g>
            <g>
              <circle cx="700" cy="520" r="44" fill="#1A1410" />
              <circle cx="700" cy="520" r="34" fill="#E8A23B" />
              <text x="700" y="528" textAnchor="middle" fontFamily="Alfa Slab One, serif" fontSize="22" fill="#1A1410">VIANA</text>
            </g>
            <path d="M 700 480 Q 720 420 780 380" stroke="#1A1410" strokeWidth="2" fill="none" strokeDasharray="4 4" />
            <path d="M 700 560 Q 700 620 720 660" stroke="#1A1410" strokeWidth="2" fill="none" strokeDasharray="4 4" />
            <g fill="#B5421C">
              <polygon points="1200,250 1206,266 1222,266 1209,276 1215,292 1200,283 1185,292 1191,276 1178,266 1194,266" />
              <polygon points="450,400 456,416 472,416 459,426 465,442 450,433 435,442 441,426 428,416 444,416" />
              <polygon points="980,650 986,666 1002,666 989,676 995,692 980,683 965,692 971,676 958,666 974,666" />
            </g>
            <g stroke="#11231C" strokeWidth="1.5" fill="none" opacity="0.6">
              <path d="M 250 470 q 6 -6 12 0 q 6 6 12 0" />
              <path d="M 600 350 q 6 -6 12 0 q 6 6 12 0" />
              <path d="M 1000 240 q 6 -6 12 0 q 6 6 12 0" />
            </g>
          </svg>

          <div className="route-banner left">
            ROTA DAS ÁGUAS
            <small>↑ sentido domingos martins</small>
          </div>
          <div className="route-banner right">
            POLO CERVEJEIRO
            <small>↓ sentido bahia nova</small>
          </div>

          <div className="map-label" style={{ top: '28%', left: '18%' }}><span className="num">01</span>Cachoeira do Sítio</div>
          <div className="map-label" style={{ top: '36%', left: '38%' }}><span className="num">02</span>Rio Jucu</div>
          <div className="map-label green" style={{ top: '22%', left: '62%' }}><span className="num">03</span>Mata Atlântica</div>
          <div className="map-label green" style={{ top: '30%', left: '80%' }}><span className="num">04</span>Mirante</div>
          <div className="map-label amber" style={{ bottom: '22%', left: '18%' }}><span className="num">A</span>Lúpulo Capixaba</div>
          <div className="map-label amber" style={{ bottom: '28%', left: '50%' }}><span className="num">B</span>Galpão Bahia Nova</div>
          <div className="map-label amber" style={{ bottom: '18%', right: '18%' }}><span className="num">C</span>Forno do Neném</div>

          <svg className="compass" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="#F6EFDC" stroke="#1A1410" strokeWidth="2" />
            <circle cx="50" cy="50" r="42" fill="none" stroke="#1A1410" strokeWidth="0.5" strokeDasharray="2 4" />
            <polygon points="50,12 56,50 50,42 44,50" fill="#B5421C" />
            <polygon points="50,88 56,50 50,58 44,50" fill="#1A1410" />
            <text x="50" y="9" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fontWeight="700" fill="#1A1410">N</text>
            <text x="50" y="98" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fontWeight="700" fill="#1A1410">S</text>
            <circle cx="50" cy="50" r="3" fill="#E8A23B" />
          </svg>
        </div>

        <div className="map-legend">
          <div className="legend-card green">
            <h3>↑ Rota das Águas</h3>
            <p>Cachoeiras, canoas, mata fechada e mirantes — rumo ao planalto de Domingos Martins.</p>
            <div className="stops">
              <span>Cachoeira do Sítio</span><span>Rio Jucu</span><span>Mata Atlântica</span><span>Mirante</span>
            </div>
          </div>
          <div className="legend-card amber">
            <h3>↓ Polo Cervejeiro</h3>
            <p>Galpões, lúpulo nacional e fornos a lenha — pelo eixo de Bahia Nova.</p>
            <div className="stops">
              <span>Lúpulo Capixaba</span><span>Galpão Bahia Nova</span><span>Forno do Neném</span><span>+ 9 cervejarias</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
