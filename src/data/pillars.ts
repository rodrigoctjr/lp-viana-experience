export const pillars = [
  {
    id: "historia",
    title: "História e Cultura",
    subtitle: "O Berço de Araçatiba",
    description:
      "Patrimônio colonial, tradições capixabas e a memória viva de uma cidade que guarda séculos de história.",
    accent: "terra" as const,
    icon: "church" as const,
  },
  {
    id: "aventura",
    title: "Aventura Natural",
    subtitle: "A Rota das Águas",
    description:
      "Rio Jucu, trilhas, canoagem e esportes de aventura em meio à natureza exuberante do interior capixaba.",
    accent: "jungle" as const,
    icon: "kayak" as const,
  },
  {
    id: "cervejeiro",
    title: "Inovação Econômica",
    subtitle: "O Novo Polo Cervejeiro",
    description:
      "Cervejarias artesanais, degustações e o novo polo cervejeiro que transforma Viana em destino gastronômico.",
    accent: "amber" as const,
    icon: "barrel" as const,
  },
] as const;

export type PillarAccent = (typeof pillars)[number]["accent"];
