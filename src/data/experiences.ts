export interface Experience {
  cat: string;
  color: 'terra' | 'jungle' | 'amber' | 'rio';
  tag: string;
  title: string;
  cat_label: string;
  desc: string;
  spots: number;
  total: number;
  price: string;
  placeholder: string;
}

export const EXPERIENCES: Experience[] = [
  { cat: 'aventura', color: 'terra', tag: 'Adrenalina', title: 'Pêndulo Cachoeira', cat_label: 'Esportes de aventura',
    desc: 'Salto de pêndulo de 18m sobre o vão da Cachoeira do Sítio. Equipamento e instrutor inclusos.',
    spots: 30, total: 30, price: 'R$ 220', placeholder: 'foto: salto de pêndulo' },
  { cat: 'aventura', color: 'jungle', tag: 'Mata fechada', title: 'Rapel · 25m', cat_label: 'Esportes de aventura',
    desc: 'Descida em parede natural na Rota das Águas. Nível iniciante a intermediário, 2h de duração.',
    spots: 12, total: 40, price: 'R$ 180', placeholder: 'foto: rapel parede' },
  { cat: 'aventura', color: 'rio', tag: 'Rio Jucu', title: 'Caiaque Duplo', cat_label: 'Esportes de aventura',
    desc: 'Travessia de 4km em caiaque pelas curvas do Jucu. Saída às 8h. Inclui água e barra de cereal.',
    spots: 48, total: 60, price: 'R$ 140', placeholder: 'foto: caiaque no rio' },

  { cat: 'cerveja', color: 'amber', tag: 'Curso · 4h', title: 'Cerveja Artesanal 101', cat_label: 'Polo Cervejeiro',
    desc: 'Workshop hands-on de produção. Você sai com sua receita, garrafa autografada e diploma.',
    spots: 8, total: 25, price: 'R$ 290', placeholder: 'foto: panela de mosto' },
  { cat: 'cerveja', color: 'terra', tag: 'Tour · 6h', title: 'Tour 5 Cervejarias', cat_label: 'Polo Cervejeiro',
    desc: 'Visita guiada com degustação em 5 galpões do polo. Ônibus do evento entre cada parada.',
    spots: 22, total: 45, price: 'R$ 165', placeholder: 'foto: galpão de cervejaria' },
  { cat: 'cerveja', color: 'jungle', tag: 'Premium', title: 'Maridagem & Lenha', cat_label: 'Polo Cervejeiro',
    desc: 'Jantar harmonizado de cerveja com carne na lenha do Forno do Neném. Jantar de 5 etapas.',
    spots: 4, total: 30, price: 'R$ 380', placeholder: 'foto: jantar harmonizado' },

  { cat: 'hospedagem', color: 'jungle', tag: 'Fim-de-semana', title: 'Chalé · Vista da Mata', cat_label: 'Hospedagem',
    desc: 'Chalé de 2 quartos com vista para a Mata Atlântica. Pacote 3 noites, café da manhã caipira incluso.',
    spots: 3, total: 14, price: 'R$ 1.290', placeholder: 'foto: chalé na mata' },
  { cat: 'hospedagem', color: 'amber', tag: 'Glamping', title: 'Tenda às margens do Jucu', cat_label: 'Hospedagem',
    desc: 'Glamping com cama queen, banheiro privativo e luminária a velas. À beira do rio, 6 unidades.',
    spots: 6, total: 6, price: 'R$ 880', placeholder: 'foto: tenda glamping' },
  { cat: 'hospedagem', color: 'terra', tag: 'Pousada', title: 'Pousada Polo Cervejeiro', cat_label: 'Hospedagem',
    desc: 'Quarto duplo no centro do Polo Cervejeiro. Café da manhã com pão na lenha e cerveja artesanal.',
    spots: 18, total: 30, price: 'R$ 540', placeholder: 'foto: pousada' },

  { cat: 'gastronomia', color: 'terra', tag: 'Música ao vivo', title: 'Almoço Capixaba', cat_label: 'Gastronomia',
    desc: 'Almoço em buffet com moqueca, torta capixaba e sobremesas regionais. Banda de chorinho ao vivo.',
    spots: 80, total: 200, price: 'R$ 95', placeholder: 'foto: moqueca capixaba' },
  { cat: 'gastronomia', color: 'amber', tag: 'Café da roça', title: 'Café Colonial Caipira', cat_label: 'Gastronomia',
    desc: 'Café da manhã com 18 itens, biscoitos de polvilho, pães caseiros e queijo curado da região.',
    spots: 24, total: 40, price: 'R$ 65', placeholder: 'foto: mesa colonial' },
  { cat: 'gastronomia', color: 'jungle', tag: 'Forno a lenha', title: 'Forno do Neném', cat_label: 'Gastronomia',
    desc: 'Costela de chão por 14h em fogo de chão. Acompanha mandioca cozida, vinagrete e farofa de banana.',
    spots: 14, total: 50, price: 'R$ 130', placeholder: 'foto: costela de chão' },

  { cat: 'aventura', color: 'jungle', tag: 'Trilha · 8km', title: 'Trilha do Mirante', cat_label: 'Esportes de aventura',
    desc: 'Trilha de dificuldade média até o mirante de 920m de altitude. Pôr-do-sol garantido.',
    spots: 28, total: 35, price: 'R$ 75', placeholder: 'foto: mirante ao pôr-do-sol' },
  { cat: 'gastronomia', color: 'rio', tag: 'Pesque-pague', title: 'Pesca & Almoço', cat_label: 'Gastronomia',
    desc: 'Pesque-pague do Neném: você pesca, eles preparam. Almoço incluso com tilápia frita e arroz.',
    spots: 16, total: 30, price: 'R$ 110', placeholder: 'foto: pesque-pague' },
];

export function spotsClass(spots: number, total: number): string {
  if (spots === 0 || spots / total < 0.25) return 'few';
  if (spots / total < 0.6) return 'med';
  return '';
}

export function spotsLabel(spots: number): string {
  if (spots === 0) return 'Esgotado';
  if (spots <= 10) return `Apenas ${spots} vagas`;
  return `${spots} vagas`;
}
