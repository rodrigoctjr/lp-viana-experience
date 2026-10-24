export interface HeroSlide {
  id: string;
  label: string;
  desktop: string;
  /** Recorte em pé para telas estreitas. Sem ele, usa a imagem desktop. */
  mobile?: string;
}

// Frames do vídeo de divulgação do Dia D, recortados sem os textos sobrepostos.
export const heroSlides: HeroSlide[] = [
  { id: "igreja", label: "Viana Sede", desktop: "/images/viana/igreja-matriz-atual.png" },
  { id: "pendulo", label: "Pêndulo", desktop: "/images/hero/pendulo-desktop.jpg", mobile: "/images/hero/pendulo-mobile.jpg" },
  { id: "caiaque", label: "Expedição de caiaque", desktop: "/images/hero/caiaque-desktop.jpg", mobile: "/images/hero/caiaque-mobile.jpg" },
  { id: "pedal", label: "Pedal", desktop: "/images/hero/pedal-desktop.jpg", mobile: "/images/hero/pedal-mobile.jpg" },
  { id: "cavalgada", label: "Cavalgada", desktop: "/images/hero/cavalgada-desktop.jpg", mobile: "/images/hero/cavalgada-mobile.jpg" },
  { id: "corrida", label: "Corrida", desktop: "/images/hero/corrida-desktop.jpg", mobile: "/images/hero/corrida-mobile.jpg" },
  { id: "gastronomia", label: "Gastronomia", desktop: "/images/hero/gastronomia-desktop.jpg", mobile: "/images/hero/gastronomia-mobile.jpg" },
  { id: "artesanato", label: "Artesanato", desktop: "/images/hero/artesanato-desktop.jpg", mobile: "/images/hero/artesanato-mobile.jpg" },
  { id: "cerveja", label: "Cervejas artesanais", desktop: "/images/hero/cerveja-desktop.jpg", mobile: "/images/hero/cerveja-mobile.jpg" },
];
