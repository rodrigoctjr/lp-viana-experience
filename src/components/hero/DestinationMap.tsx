"use client";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { mapStates, mapMunicipalities, vianaPin } from "@/data/viana-map";

const finalView = "746 473 230 285";
export function DestinationMap() {
  const reduced = useReducedMotion();
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setCompact(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  const [x, y] = vianaPin;
  return (
    <div className="destination-map" data-reduced={reduced || undefined}>
      <div className="map-compass" aria-hidden="true"><span>N</span><svg viewBox="0 0 24 50"><path d="M12 2L20 38L12 31L4 38Z" fill="currentColor" /><path d="M12 2V31" stroke="#082a34" /></svg></div>
      <motion.svg className="geographic-map" role="img" aria-labelledby="destination-map-title" initial={{ viewBox: reduced ? finalView : "120 10 850 970" }} animate={{ viewBox: reduced ? finalView : ["120 10 850 970", "0 -40 1080 1200", "746 473 230 285"] }} transition={{ duration: reduced ? 0 : compact ? 3 : 4.2, times: [0, 0.24, 1], ease: [0.77, 0, 0.175, 1] }} preserveAspectRatio="xMidYMid meet">
        <title id="destination-map-title">Mapa do Brasil com aproximação ao Espírito Santo e destaque no município de Viana.</title>
        <defs><pattern id="map-grid" width="25" height="25" patternUnits="userSpaceOnUse"><path d="M25 0H0V25" fill="none" stroke="#b9d5d0" strokeWidth="0.18" opacity="0.16" /></pattern></defs>
        <rect x="-1000" y="-1000" width="3000" height="3000" fill="url(#map-grid)" />
        <g fill="#173f47" stroke="#66978e" strokeWidth="0.55" strokeLinejoin="round">{mapStates.map(state => <path key={state.id} d={state.path} fill={state.id === "32" ? "#4b8877" : undefined} />)}</g>
        <g fill="none" stroke="#a8cfc0" strokeWidth="0.22" strokeLinejoin="round" opacity="0.55">{mapMunicipalities.map(city => <path key={city.id} d={city.path} />)}</g>
        <path d={mapMunicipalities.find(city => city.id === "3205101")?.path} fill="#f27b63" fillOpacity="0.85" stroke="#ffc1a4" strokeWidth="0.5" />
        <text x="805" y="525" fill="#d1e5db" fontSize="8" letterSpacing="1.2">ESPÍRITO SANTO</text>
        <text x="948" y="640" fill="#a7c3c4" fontSize="5" letterSpacing="1" transform="rotate(-75 948 640)">OCEANO ATLÂNTICO</text>
        <g className="map-arrival" transform={`translate(${x} ${y})`}>
          <circle r="13" fill="none" stroke="#f27b63" strokeWidth="0.45" className="map-ripple" /><circle r="6" fill="none" stroke="#f27b63" strokeWidth="0.45" />
          <g className="map-pin"><path d="M0 0C-3-4-6-7-6-11a6 6 0 0 1 12 0C6-7 3-4 0 0Z" fill="#f27b63" /><circle cy="-11" r="2" fill="#fff4e8" /></g>
          <text x="12" y="-5" fill="#fff4e8" fontSize="14" fontWeight="600">Viana</text><text x="12" y="4" fill="#d1e5db" fontSize="5">8 de novembro · 2026</text>
        </g>
      </motion.svg>
      <div className="map-event"><span>O encontro está marcado.</span><p>08<span>.11</span><small>2026</small></p><span>Dia D do Turismo</span></div>
    </div>
  );
}
