export const previewThemes = [
  {
    id: "aventura",
    category: "Esportes de aventura",
    title: "Canoagem, trilhas e mais",
    description: "Experiências ao ar livre na Rota das Águas e nas montanhas de Viana.",
    accent: "jungle" as const,
  },
  {
    id: "cervejeiro",
    category: "Polo cervejeiro",
    title: "Cursos e degustações",
    description: "Conheça cervejarias artesanais e o processo por trás de cada chope.",
    accent: "amber" as const,
  },
  {
    id: "hospedagem",
    category: "Hospedagem",
    title: "Pousadas e chalés",
    description: "Opções para estender sua visita e viver Viana com calma.",
    accent: "terra" as const,
  },
  {
    id: "gastronomia",
    category: "Gastronomia regional",
    title: "Sabores capixabas",
    description: "Restaurantes e experiências que celebram a culinária local.",
    accent: "rio" as const,
  },
] as const;

export type PreviewAccent = (typeof previewThemes)[number]["accent"];
