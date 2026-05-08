export interface FaqItem {
  q: string;
  a: string;
}

export const FAQ: FaqItem[] = [
  { q: 'Como retiro minha pulseira?', a: 'Na Praça Central de Viana, das 6h às 22h durante os 3 dias do evento. Apresente o QR-Code do cadastro.' },
  { q: 'Os ônibus são gratuitos?', a: 'Sim, com a pulseira oficial. 4 linhas circulares com 28 paradas e saídas a cada 30 minutos.' },
  { q: 'Posso cancelar minha reserva?', a: 'Reservas pagas têm reembolso integral até 72h antes do evento, e 50% até 24h antes.' },
  { q: 'Tem estrutura para crianças?', a: 'Sim. Algumas atividades de aventura têm idade mínima (12+); o catálogo indica em cada card.' },
  { q: 'O evento acontece em caso de chuva?', a: 'Sim. Atividades aquáticas podem ser remarcadas em caso de chuva forte; demais seguem normalmente.' },
];
