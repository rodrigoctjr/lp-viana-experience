export const pillars = [
  {
    id: "historia",
    title: "História e Cultura",
    subtitle: "Igreja Matriz de Viana",
    description:
      "Casarios, monumentos e manifestações culturais guardam a memória de Viana, construída por povos indígenas, africanos e imigrantes europeus.",
    accent: "terra" as const,
    icon: "church" as const,
  },
  {
    id: "aventura",
    title: "Aventura Natural",
    subtitle: "A Rota das Águas",
    description:
      "Trilhas, canoagem no Rio Jucu e piscinas naturais convidam a aproveitar o verde. Um passeio entre a tranquilidade do campo e a aventura.",
    accent: "jungle" as const,
    icon: "kayak" as const,
  },
  {
    id: "cervejeiro",
    title: "Sabores de Viana",
    subtitle: "Do fogão a lenha à cerveja artesanal",
    description:
      "Comida caseira, receitas no fogão a lenha e cerveja artesanal produzida no município. Os sabores do campo também fazem parte da viagem.",
    accent: "amber" as const,
    icon: "barrel" as const,
  },
] as const;

export type PillarAccent = (typeof pillars)[number]["accent"];
