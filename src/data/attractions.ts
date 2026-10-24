export type AttractionCategory = "Aventura" | "Lazer" | "Gastronomia" | "Natureza";

export type AttractionClaim = "whatsapp" | "signup" | "external" | "form";

export const ATTRACTION_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdQauWLtG-8K0gjnoPxzP3LzkDQPnAtdmNITRx4sbqNh6AvDA/viewform";

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
  website?: string;
  websiteLabel?: string;
  externalUrl?: string;
  externalLabel?: string;
  coupon?: string;
  /** Substitui o texto padrão do WhatsApp quando a vaga não é cortesia. */
  whatsappText?: string;
  feature?: boolean;
  sessions?: { time: string; spots: string }[];
  /** whatsapp: o parceiro controla. signup: a vaga fecha aqui. form: sem contato, abre o Google Forms. */
  claim: AttractionClaim;
  slots?: VoucherSlot[];
}

export const ATTRACTION_FILTERS = ["Todas", "Aventura", "Lazer", "Gastronomia", "Natureza"] as const;

export type AttractionFilter = (typeof ATTRACTION_FILTERS)[number];

export const attractions: Attraction[] = [
  {
    id: "sitio-gava",
    name: "Sítio Gava",
    category: "Lazer",
    place: "Piapitangui, Viana",
    summary:
      "Piscinas, churrasco, campo de futebol, trilha ecológica, cama elástica e balanços. O passeio pede agendamento, e o consumo de bebida alcoólica é proibido.",
    offer: "10 cortesias para o Dia D.",
    offerShort: "10 cortesias",
    hours: "Sábados, domingos e feriados · 9h às 17h",
    image: "/images/atracoes/sitio-gava.webp",
    imageAlt: "Vista aérea das piscinas do Sítio Gava entre as pedras.",
    instagram: "sitio_gava_oficial",
    phone: "5527997765791",
    phoneLabel: "(27) 99776 5791",
    claim: "whatsapp",
  },
  {
    id: "piscinas-ze-maria",
    name: "Piscinas Zé Maria",
    category: "Lazer",
    place: "Borbas, Viana",
    summary:
      "Piscinas adulto e infantil, churrasqueiras, área coberta, parquinho e estacionamento. O Rio Santo Agostinho passa ao lado, debaixo das árvores. Não precisa agendar. Outro contato: (27) 99577 7000.",
    offer: "10 cortesias para o Dia D.",
    offerShort: "10 cortesias",
    hours: "Todos os dias · 8h às 17h",
    image: "/images/atracoes/piscinas-ze-maria-banho.jpg",
    imageAlt: "Piscina das Piscinas Zé Maria, cheia, com a mata ao redor.",
    instagram: "piscinaszemaria",
    phone: "5527998384821",
    phoneLabel: "(27) 99838 4821",
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
    hours: "Todos os dias · 7h às 20h",
    image: "/images/atracoes/cachoeira-do-aloisio.jpg",
    imageAlt: "Cachoeira caindo em um poço de areia na Cachoeira do Aloísio.",
    instagram: "cachoeira_doaloisiocosta",
    phone: "5527998118917",
    phoneLabel: "(27) 99811 8917",
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
    hours: "Domingos e feriados · almoço 11h às 15h",
    image: "/images/atracoes/recanto-dos-lagos-fonte.jpg",
    imageAlt: "Lago com fonte e o restaurante do Recanto dos Lagos.",
    instagram: "recanto_dos_lagoses",
    phone: "5527999176919",
    phoneLabel: "(27) 9917 6919",
    claim: "whatsapp",
  },
  {
    id: "cantim-di-minas",
    name: "Cantim di Minas",
    category: "Gastronomia",
    place: "Universal, Viana",
    summary:
      "Bufê no fogão à lenha, buffet de frutos do mar às sextas e domingos, e música ao vivo no almoço de domingo.",
    offer: "2 vouchers de almoço, sem bebidas.",
    offerShort: "2 almoços",
    hours: "Almoço em família, com música ao vivo no domingo",
    image: "/images/atracoes/cantim-di-minas-fachada.jpg",
    imageAlt: "Fachada do Restaurante Cantim di Minas, com mesas na área coberta.",
    instagram: "cantimdiminas",
    maps: "https://maps.app.goo.gl/4rTjQrfrk8LsWLpr8",
    claim: "form",
  },
  {
    id: "sabores-de-perobas",
    name: "Sabores de Perobas",
    category: "Gastronomia",
    place: "Perobas, Viana",
    summary:
      "Doces, pães e compotas feitos com o que a propriedade colhe. Nos fins de semana tem almoço e happy hour. No evento, a experiência é a receita do mangará, o coração do cacho de banana, servida com torrada ou pão caseiro, a mesma base da torta capixaba.",
    offer: "30 experiências do mangará.",
    offerShort: "30 experiências",
    hours: "Fins de semana · almoço e happy hour",
    image: "/images/atracoes/sabores-de-perobas.webp",
    imageAlt: "Compotas e conservas de Sabores de Perobas.",
    instagram: "sabores.de.perobas",
    phone: "5527999198537",
    phoneLabel: "(27) 99919 8537",
    claim: "whatsapp",
  },
  {
    id: "trilha-radical",
    name: "Trilha",
    category: "Aventura",
    place: "Radical Oficial",
    summary:
      "Trilha conduzida pela Radical Oficial no Dia D. A mesma equipe organiza o pêndulo e a descida de caiaque.",
    offer: "Vagas ilimitadas. Os 300 primeiros inscritos ganham brinde.",
    offerShort: "Brinde p/ 300 primeiros",
    hours: "Dia D · concentração 6h30, largada 7h30 no Parque de Exposições",
    image: "/images/atracoes/trilha-radical.png",
    imageAlt: "Trilha na pedra com a equipe da Radical Oficial.",
    phone: "5527995757122",
    phoneLabel: "(27) 99575 7122",
    website: "https://radicaloficial.com.br/",
    websiteLabel: "Site da Radical",
    whatsappText: "Olá! Quero uma vaga no Dia D: Trilha.",
    externalUrl: "https://radicaloficial.com.br/trilha-nos-trilhos-29999",
    externalLabel: "Inscrever no site da Radical",
    claim: "external",
  },
  {
    id: "pendulo-radical",
    name: "Pêndulo",
    category: "Aventura",
    place: "Radical Oficial",
    summary: "Salto de pêndulo do Pontilhão de Viana, com a Radical Oficial. Encontro no Posto Canaã, na Ribeira.",
    offer: "R$ 99, com 10% de desconto no cupom VIANAEXPERIENCE. 60 vagas.",
    offerShort: "10% no cupom",
    hours: "Dia D · concentração 6h, início 7h",
    image: "/images/atracoes/pendulo-radical.png",
    imageAlt: "Salto de pêndulo de cabeça para baixo, sobre o rio.",
    phone: "5527995757122",
    phoneLabel: "(27) 99575 7122",
    website: "https://radicaloficial.com.br/",
    websiteLabel: "Site da Radical",
    whatsappText: "Olá! Quero uma vaga no Dia D: Pêndulo.",
    externalUrl: "https://radicaloficial.com.br/pendulo-8894",
    externalLabel: "Inscrever no site da Radical",
    coupon: "VIANAEXPERIENCE",
    claim: "external",
  },
  {
    id: "descida-rio",
    name: "Descida de caiaque",
    category: "Aventura",
    place: "Radical Oficial",
    summary: "Expedição de caiaque pelo Rio Jucu, da Pedra da Mulata até a fazenda do Incaper, com a Radical Oficial.",
    offer: "R$ 99, com 10% de desconto no cupom VIANAEXPERIENCE. 60 vagas.",
    offerShort: "10% no cupom",
    hours: "Dia D · concentração 5h30, saída 7h",
    image: "/images/atracoes/descida-rio.png",
    imageAlt: "Dupla de caiaque vista de cima, com a Radical Oficial.",
    phone: "5527995757122",
    phoneLabel: "(27) 99575 7122",
    website: "https://radicaloficial.com.br/",
    websiteLabel: "Site da Radical",
    whatsappText: "Olá! Quero uma vaga no Dia D: Descida de caiaque.",
    externalUrl: "https://radicaloficial.com.br/passeio-de-caiaque-no-rio-jucu-com-a-radical-oficial-25103",
    externalLabel: "Inscrever no site da Radical",
    coupon: "VIANAEXPERIENCE",
    claim: "external",
  },
  {
    id: "linear-e-movimento",
    name: "Linear e Movimento",
    category: "Aventura",
    place: "Corrida de 5 km",
    summary:
      "Primeira corrida oficial do Linear e Movimento, no dia 8 de novembro. A inscrição é feita no site da prova.",
    offer: "10% de desconto com o cupom VIANAEXPERIENCE, até 31 de outubro.",
    offerShort: "10% no cupom",
    hours: "8 de novembro · cupom até 31/10",
    image: "/images/atracoes/linear-corrida.webp",
    imageAlt: "Kit da 1ª corrida Linear e Movimento: camiseta, viseira, bolsa e número de peito.",
    website: "https://www.linearemovimento.com.br/",
    externalUrl: "https://www.linearemovimento.com.br/",
    externalLabel: "Inscrever na corrida",
    coupon: "VIANAEXPERIENCE",
    claim: "external",
  },
  {
    id: "sitio-agua-viva",
    name: "Sítio Água Viva",
    category: "Lazer",
    place: "Formate · Piapitangui, Viana",
    summary:
      "Dia de lazer com piscinas de água corrente, cachoeira, represa no rio, churrasqueira, campinho de areia, estacionamento e pousada. Fica na estrada principal, sentido Formate a Piapitangui, a 3,7 km da BR 262. CEP 29139 899.",
    offer: "24 cortesias para o Dia D.",
    offerShort: "24 cortesias",
    hours: "Lazer diurno",
    image: "/images/atracoes/sitio-agua-viva.webp",
    imageAlt: "Piscina natural e casa do Sítio Água Viva, com bananal ao fundo.",
    instagram: "sitioaguaviva.viana",
    phone: "5527988607971",
    phoneLabel: "(27) 98860 7971",
    maps: "https://www.google.com/maps/search/?api=1&query=S%C3%ADtio+%C3%81gua+Viva+Viana+ES+29139-899",
    claim: "whatsapp",
  },
  {
    id: "viana-restaurante",
    name: "Viana Restaurante",
    category: "Gastronomia",
    place: "Estação Ferroviária, Viana",
    summary:
      "Parceiro gastronômico do Viana Experience. A inscrição entra na seleção das cortesias. No dia, a visita inclui a exposição de artesanato na área externa e duas apresentações musicais.",
    offer: "10 cortesias, por inscrição.",
    offerShort: "10 cortesias",
    hours: "Dia D · mesa, artesanato e música",
    image: "/images/atracoes/viana-restaurante.webp",
    imageAlt: "Salão do vagão do Viana Restaurante, com as mesas postas.",
    instagram: "vianarestaurantees",
    maps: "https://www.google.com/maps/search/?api=1&query=Esta%C3%A7%C3%A3o+Ferrovi%C3%A1ria+de+Viana+ES",
    claim: "form",
  },
  {
    id: "parque-tunel-da-alegria",
    name: "Parque Túnel da Alegria",
    category: "Lazer",
    place: "Borbas, Viana",
    summary:
      "Área verde no Vale das Cachoeiras, cercada pelo Rio Santo Agostinho. Tem cachoeira, piscinas, toboágua e área de churrasco. Outro contato: (27) 3226 6805. Acesso pela BR 262, depois da sede de Viana, sentido montanhas, estrada de Formate.",
    offer: "20 cortesias para o Dia D.",
    offerShort: "20 cortesias",
    hours: "Todos os dias · 8h às 17h",
    image: "/images/atracoes/parque-tunel-alegria.jpg",
    imageAlt: "Piscina do Parque Túnel da Alegria, com toboágua e palmeiras.",
    instagram: "parquetuneldaalegria",
    phone: "5527999854799",
    phoneLabel: "(27) 99985 4799",
    maps: "https://www.google.com/maps/search/?api=1&query=Parque+T%C3%BAnel+da+Alegria+Borbas+Viana+ES",
    claim: "whatsapp",
  },
  {
    id: "banho-de-floresta",
    name: "Banho de Floresta",
    category: "Natureza",
    place: "Trilha de Jucuruaba · Incaper",
    summary:
      "Caminhada inspirada no banho de floresta japonês, na trilha do Centro de Pesquisa do Incaper. A proposta é desacelerar na mata, entre saúde, conservação e o território de Viana.",
    offer: "Três sessões de manhã, com 40 vagas em cada uma.",
    offerShort: "120 vagas",
    hours: "Manhã do evento · sessões às 9h, 10h e 11h",
    image: "/images/atracoes/banho-de-floresta.jpg",
    imageAlt: "Pessoa sentada sob as árvores na trilha do banho de floresta.",
    website: "https://incaper.es.gov.br/fazendas",
    websiteLabel: "Sobre a trilha",
    claim: "form",
  },
];

export function whatsappClaimUrl(phone: string, attractionName: string, message?: string) {
  const text = message ?? `Olá! Quero a cortesia do Dia D: ${attractionName}.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
