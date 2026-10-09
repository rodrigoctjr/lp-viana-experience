export type AttractionCategory = "Lazer" | "Gastronomia" | "Natureza";

export type AttractionClaim = "whatsapp" | "signup";

export interface VoucherSlot {
  id: string;
  label: string;
  capacity: number;
}

export interface Attraction {
  id: string;
  name: string;
  category: AttractionCategory;
  place: string;
  summary: string;
  offer: string;
  offerShort: string;
  hours: string;
  image?: string;
  imageAlt?: string;
  instagram?: string;
  phone?: string;
  phoneLabel?: string;
  maps?: string;
  feature?: boolean;
  sessions?: { time: string; spots: string }[];
  /** whatsapp: o parceiro controla. signup: a vaga fecha aqui quando acaba. */
  claim: AttractionClaim;
  slots?: VoucherSlot[];
}

export const ATTRACTION_FILTERS = ["Todas", "Lazer", "Gastronomia", "Natureza"] as const;

export type AttractionFilter = (typeof ATTRACTION_FILTERS)[number];

export const attractions: Attraction[] = [
  {
    id: "sitio-gava",
    name: "Sítio Gava",
    category: "Lazer",
    place: "Piapitangui, Viana",
    summary:
      "Piscinas, churrasco, campo de futebol, trilha ecológica, pula-pula e balanços. O passeio pede agendamento, e o consumo de bebida alcoólica é proibido.",
    offer: "10 cortesias para o Dia D.",
    offerShort: "10 cortesias",
    hours: "Sábados, domingos e feriados · 9h–17h",
    image: "/images/atracoes/sitio-gava.jpg",
    imageAlt: "Piscinas de água clara entre pedras e mata no Sítio Gava, em Piapitangui.",
    instagram: "sitio_gava_oficial",
    phone: "5527997765791",
    phoneLabel: "(27) 99776-5791",
    claim: "whatsapp",
  },
  {
    id: "piscinas-ze-maria",
    name: "Piscinas Zé Maria",
    category: "Lazer",
    place: "Borbas, Viana",
    summary:
      "Piscinas adulto e infantil, churrasqueiras, área coberta, parquinho e estacionamento. O Rio Santo Agostinho passa ao lado, debaixo das árvores. Não precisa agendar. Outro contato: (27) 99577-7000.",
    offer: "10 cortesias para o Dia D.",
    offerShort: "10 cortesias",
    hours: "Todos os dias · 8h–17h",
    image: "/images/atracoes/piscinas-ze-maria.jpg",
    imageAlt: "Piscina e área coberta das Piscinas Zé Maria, em meio às árvores de Borbas.",
    instagram: "piscinaszemaria",
    phone: "5527998384821",
    phoneLabel: "(27) 99838-4821",
    claim: "whatsapp",
  },
  {
    id: "cachoeira-aloisio",
    name: "Cachoeira do Aloísio",
    category: "Lazer",
    place: "Borbas, Viana",
    summary:
      "Camping, cachoeira, trilha, piscina e cerca de 60 churrasqueiras. O passeio sobe o morro, entra no mato e desce a pé pelo leito do rio.",
    offer: "50 cortesias para o Dia D.",
    offerShort: "50 cortesias",
    hours: "Todos os dias · 7h–20h",
    image: "/images/atracoes/cachoeira-aloisio.jpg",
    imageAlt: "Leito de rio entre pedras e mata na Cachoeira do Aloísio, em Viana.",
    instagram: "cachoeira_doaloisiocosta",
    phone: "5527998118917",
    phoneLabel: "(27) 99811-8917",
    claim: "whatsapp",
  },
  {
    id: "recanto-dos-lagos",
    name: "Recanto dos Lagos",
    category: "Gastronomia",
    place: "Universal, Viana",
    summary:
      "Ambiente climatizado, buffet mineiro e moda de viola. O espaço tem piscina, recreação infantil, pescaria esportiva e visita à casinha de estuque.",
    offer: "7 vouchers de R$ 80 e 7 vouchers de pedalinho.",
    offerShort: "7 vouchers + pedalinho",
    hours: "Domingos e feriados · almoço 11h–15h",
    image: "/images/atracoes/recanto-dos-lagos.jpg",
    imageAlt: "Caminho de pedra à beira do lago no Recanto dos Lagos, em Universal.",
    instagram: "recanto_dos_lagoses",
    phone: "5527999176919",
    phoneLabel: "(27) 9917-6919",
    claim: "whatsapp",
  },
  {
    id: "cantim-di-minas",
    name: "Cantim di Minas",
    category: "Gastronomia",
    place: "Universal, Viana",
    summary:
      "Self-service no fogão à lenha, buffet de frutos do mar às sextas e domingos, e música ao vivo no almoço de domingo.",
    offer: "2 vouchers de almoço, sem bebidas.",
    offerShort: "2 almoços",
    hours: "Almoço em família, com música ao vivo no domingo",
    image: "/images/atracoes/cantim-di-minas.jpg",
    imageAlt: "Balanço de madeira no gramado do Cantim di Minas, em Viana.",
    instagram: "cantimdiminas",
    maps: "https://maps.app.goo.gl/4rTjQrfrk8LsWLpr8",
    claim: "signup",
    slots: [{ id: "almoco", label: "Almoço, sem bebidas", capacity: 2 }],
  },
  {
    id: "sabores-de-perobas",
    name: "Sabores de Perobas",
    category: "Gastronomia",
    place: "Perobas, Viana",
    summary:
      "Doces, pães e compotas feitos com o que a propriedade colhe. Nos fins de semana tem almoço e happy hour. No evento, a experiência é a receita do mangará, o coração do cacho de banana, servida com torrada ou pão caseiro — a mesma base da torta capixaba.",
    offer: "30 experiências do mangará.",
    offerShort: "30 experiências",
    hours: "Fins de semana · almoço e happy hour",
    image: "/images/atracoes/sabores-de-perobas.jpg",
    imageAlt: "Compotas, geleias e licores de frutas, no estilo da produção de Sabores de Perobas.",
    instagram: "sabores.de.perobas",
    phone: "5527999198537",
    phoneLabel: "(27) 99919-8537",
    claim: "whatsapp",
  },
  {
    id: "banho-de-floresta",
    name: "Banho de Floresta",
    category: "Natureza",
    place: "Trilha de Jucuruaba · Incaper",
    summary:
      "Caminhada inspirada no shinrin-yoku, o banho de floresta japonês, na trilha do Centro de Pesquisa do Incaper. A proposta é desacelerar na mata, entre saúde, conservação e o território de Viana.",
    offer: "Três sessões de manhã, com 40 vagas em cada uma.",
    offerShort: "120 vagas",
    hours: "Manhã do evento · sessões às 9h, 10h e 11h",
    feature: true,
    sessions: [
      { time: "9h", spots: "40 vagas" },
      { time: "10h", spots: "40 vagas" },
      { time: "11h", spots: "40 vagas" },
    ],
    maps: "https://incaper.es.gov.br/fazendas",
    claim: "signup",
    slots: [
      { id: "9h", label: "Sessão das 9h", capacity: 40 },
      { id: "10h", label: "Sessão das 10h", capacity: 40 },
      { id: "11h", label: "Sessão das 11h", capacity: 40 },
    ],
  },
];

export function whatsappClaimUrl(phone: string, attractionName: string) {
  const text = `Olá! Quero a cortesia do Dia D: ${attractionName}.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
