export interface AttractionPrize {
  id: string;
  label: string;
  icon: string;
  points: number;
  color: string;
}

export interface ObstacleType {
  id: string;
  width: number;
  height: number;
  label: string;
}

export const ATTRACTION_PRIZES: AttractionPrize[] = [
  { id: "cervejaria", label: "Cervejaria", icon: "🍺", points: 50, color: "#C4A035" },
  { id: "caiaque", label: "Caiaque", icon: "🛶", points: 50, color: "#2E6E7A" },
  { id: "pousada", label: "Pousada", icon: "🏡", points: 40, color: "#6B3D2E" },
  { id: "trilha", label: "Trilha", icon: "🥾", points: 40, color: "#4A7C59" },
  { id: "gastronomia", label: "Gastronomia", icon: "🍽️", points: 40, color: "#B5421C" },
  { id: "rio", label: "Rio Jucu", icon: "💧", points: 45, color: "#2E6E7A" },
  { id: "degustacao", label: "Degustação", icon: "🍻", points: 45, color: "#E5C76B" },
  { id: "pendulo", label: "Pêndulo", icon: "🪂", points: 55, color: "#E85D04" },
];

export const OBSTACLE_TYPES: ObstacleType[] = [
  { id: "hop", width: 26, height: 50, label: "Lúpulo" },
  { id: "rock", width: 34, height: 28, label: "Pedra" },
  { id: "stump", width: 38, height: 36, label: "Tronco" },
  { id: "fence", width: 22, height: 44, label: "Cerca" },
];

export const BIKE_SPRITE = "/images/bike-viana-experience.png";

export const GAME_COLORS = {
  sky: "#F2DB8A",
  ground: "#E5C76B",
  groundLine: "#6B3D2E",
  groundDetail: "#C9A83E",
  bike: "#C05A35",
  bikeDark: "#8B3A22",
  bikeCream: "#F5F0E4",
  wheel: "#1A1410",
  text: "#1F3A2E",
};
