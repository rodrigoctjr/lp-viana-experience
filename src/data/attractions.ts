export type AttractionCategory = "Aventura" | "Lazer" | "Gastronomia" | "Natureza";

export type AttractionClaim = "whatsapp" | "signup" | "external" | "form";

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
  /** Substitui o texto padrão do WhatsApp quando a vaga não é de sorteio. */
  whatsappText?: string;
  feature?: boolean;
  sessions?: { time: string; spots: string }[];
  /** Formulário de inscrição da atração; sem ele, o card mostra "Inscrições em breve". */
  formUrl?: string;
  /** whatsapp: o parceiro controla. signup: a vaga fecha aqui. form: formulário de inscrição para o sorteio. */
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
    offer: "Inscreva-se e concorra.",
    offerShort: "Sorteio para os inscritos",
    hours: "Sábados, domingos e feriados · 9h às 17h",
    image: "/images/atracoes/sitio-gava.webp",
    imageAlt: "Vista aérea das piscinas do Sítio Gava entre as pedras.",
    instagram: "sitio_gava_oficial",
    phone: "5527997765791",
    phoneLabel: "(27) 99776 5791",
    maps: "https://maps.app.goo.gl/jXQh65KU5yFFXf4T7",
    formUrl: "https://forms.gle/rd4qRLuMrbi1uvAR7",
    claim: "form",
  },
  {
    id: "piscinas-ze-maria",
    name: "Piscinas Zé Maria",
    category: "Lazer",
    place: "Borbas, Viana",
    summary:
      "Piscinas adulto e infantil, churrasqueiras, área coberta, parquinho e estacionamento. O Rio Santo Agostinho passa ao lado, debaixo das árvores. Não precisa agendar. Outro contato: (27) 99577-7000.",
    offer: "Inscreva-se e concorra.",
    offerShort: "Sorteio para os inscritos",
    hours: "Todos os dias · 8h às 17h",
    image: "/images/atracoes/piscinas-ze-maria-banho.jpg",
    imageAlt: "Piscina das Piscinas Zé Maria, cheia, com a mata ao redor.",
    instagram: "piscinaszemaria",
    phone: "5527998384821",
    phoneLabel: "(27) 99838 4821",
    maps: "https://maps.app.goo.gl/FQKdWmxyoRNCe4cE9",
    formUrl: "https://forms.gle/64nMQuQ5fQMbsqkT7",
    claim: "form",
  },
  {
    id: "cachoeira-aloisio",
    name: "Cachoeira do Aloísio",
    category: "Lazer",
    place: "Borbas, Viana",
    summary:
      "Camping, cachoeira, trilha, piscina e cerca de 60 churrasqueiras. O passeio sobe o morro, entra no mato e desce a pé pelo leito do rio.",
    offer: "Inscreva-se e concorra.",
    offerShort: "Sorteio para os inscritos",
    hours: "Todos os dias · 7h às 20h",
    image: "/images/atracoes/cachoeira-do-aloisio.jpg",
    imageAlt: "Cachoeira caindo em um poço de areia na Cachoeira do Aloísio.",
    instagram: "cachoeira_doaloisiocosta",
    phone: "5527998118917",
    phoneLabel: "(27) 99811 8917",
    maps: "https://maps.app.goo.gl/MFHfunhBA2cqPkqx8",
    formUrl: "https://forms.gle/Zri7zg7Gm3XdyjxA6",
    claim: "form",
  },
  {
    id: "recanto-dos-lagos",
    name: "Recanto dos Lagos",
    category: "Gastronomia",
    place: "Universal, Viana",
    summary:
      "Ambiente climatizado, bufê mineiro e moda de viola. O espaço tem piscina, recreação infantil, pescaria esportiva e visita à casinha de estuque.",
    offer: "Inscreva-se e concorra a vouchers de almoço e de pedalinho.",
    offerShort: "Sorteio para os inscritos",
    hours: "Domingos e feriados · almoço 11h às 15h",
    image: "/images/atracoes/recanto-dos-lagos-fonte.jpg",
    imageAlt: "Lago com fonte e o restaurante do Recanto dos Lagos.",
    instagram: "recanto_dos_lagoses",
    phone: "5527999176919",
    phoneLabel: "(27) 9917 6919",
    maps: "https://maps.app.goo.gl/NXFkTPxmXCDzripK7",
    formUrl: "https://forms.gle/dHVpKs4XgbGMje1PA",
    claim: "form",
  },
  {
    id: "cantim-di-minas",
    name: "Cantim di Minas",
    category: "Gastronomia",
    place: "Universal, Viana",
    summary:
      "Bufê no fogão a lenha, bufê de frutos do mar às sextas e domingos, e música ao vivo no almoço de domingo.",
    offer: "Inscreva-se e concorra a vouchers de almoço, sem bebidas.",
    offerShort: "Sorteio para os inscritos",
    hours: "Almoço em família, com música ao vivo no domingo",
    image: "/images/atracoes/cantim-di-minas-fachada.jpg",
    imageAlt: "Fachada do Restaurante Cantim di Minas, com mesas na área coberta.",
    instagram: "cantimdiminas",
    maps: "https://maps.app.goo.gl/3zKjWMZAkJCqQqCa8",
    formUrl: "https://forms.gle/tviKVj6Y8MRP1P6NA",
    claim: "form",
  },
  {
    id: "sabores-de-perobas",
    name: "Sabores de Perobas",
    category: "Gastronomia",
    place: "Perobas, Viana",
    summary:
      "Doces, pães e compotas feitos com o que a propriedade colhe. Nos fins de semana tem almoço e happy hour. No evento, a experiência é a receita do mangará, o coração do cacho de banana, servida com torrada ou pão caseiro, a mesma base da torta capixaba.",
    offer: "Inscreva-se e concorra à experiência do mangará.",
    offerShort: "Sorteio para os inscritos",
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
    offer: "Inscreva-se e concorra.",
    offerShort: "Sorteio para os inscritos",
    hours: "Dia D · concentração 6h30, largada 7h30 no Parque de Exposições",
    image: "/images/atracoes/trilha-pontilhao.webp",
    imageAlt: "Grupo caminhando pelos trilhos até o pontilhão de ferro, entre a mata.",
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
    image: "/images/atracoes/caiaque-rio-jucu.webp",
    imageAlt: "Grupo remando caiaques amarelos no Rio Jucu, com a mata ao fundo.",
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
    id: "pedal",
    name: "Pedal · Circuito rural",
    category: "Aventura",
    place: "Grupo Unidos pelo Pedal",
    summary:
      "Pedalada pelo interior de Viana: sai do Parque de Exposições, passa por Peixe Verde, Formate e Perobas e volta ao Centro.",
    offer: "Inscreva-se e concorra.",
    offerShort: "Sorteio para os inscritos",
    hours: "Dia D · concentração 6h30, largada 7h30 no Parque de Exposições",
    image: "/images/hero/pedal-desktop.jpg",
    imageAlt: "Ciclista em trilha de terra no meio da mata.",
    maps: "https://maps.app.goo.gl/iVek9YgosNFbnirT6",
    formUrl: "https://forms.gle/yqNqLRoeQtjxRuVbA",
    claim: "form",
  },
  {
    id: "linear-e-movimento",
    name: "Linear e Movimento",
    category: "Aventura",
    place: "Corrida de 5 km",
    summary:
      "Primeira corrida oficial da Linear e Movimento, no dia 8 de novembro. A inscrição é feita no site da prova.",
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
    id: "curso-cervejeiro",
    name: "Cursos cervejeiros",
    category: "Gastronomia",
    place: "Piabier (Formate) · Indomável (Centro) · Origem (Jucu)",
    summary:
      "Três turmas no Dia D: Cervejeiro Caseiro na Piabier e na Indomável, e Harmonização com Cerveja na Origem. Todas recebem certificado do IFES. No formulário, você escolhe a turma.",
    offer: "Inscreva-se e concorra.",
    offerShort: "Sorteio para os inscritos",
    hours: "Dia D · 9h às 17h",
    image: "/images/hero/cerveja-desktop.jpg",
    imageAlt: "Copo de cerveja artesanal sendo servido.",
    formUrl: "https://forms.gle/wRPKVe1HcqHWTXmr8",
    claim: "form",
  },
  {
    id: "sitio-agua-viva",
    name: "Sítio Água Viva",
    category: "Lazer",
    place: "Formate · Piapitangui, Viana",
    summary:
      "Dia de lazer com piscinas de água corrente, cachoeira, represa no rio, churrasqueira, campinho de areia, estacionamento e pousada. Fica na estrada principal, sentido Formate a Piapitangui, a 3,7 km da BR-262. CEP 29139-899.",
    offer: "Inscreva-se e concorra.",
    offerShort: "Sorteio para os inscritos",
    hours: "Dia D · 8h às 17h",
    image: "/images/atracoes/sitio-agua-viva.webp",
    imageAlt: "Piscina natural e casa do Sítio Água Viva, com bananal ao fundo.",
    instagram: "sitioaguaviva.viana",
    phone: "5527988607971",
    phoneLabel: "(27) 98860 7971",
    maps: "https://maps.app.goo.gl/rChKpVhDww8kiJA19",
    formUrl: "https://forms.gle/ixS1Kt8MT3E3HZVFA",
    claim: "form",
  },
  {
    id: "viana-restaurante",
    name: "Viana Restaurante",
    category: "Gastronomia",
    place: "Estação Ferroviária, Viana",
    summary:
      "Parceiro gastronômico do Viana Experience. No dia, a visita inclui a exposição de artesanato na área externa e duas apresentações musicais.",
    offer: "Inscreva-se e concorra.",
    offerShort: "Sorteio para os inscritos",
    hours: "Dia D · mesa, artesanato e música",
    image: "/images/atracoes/viana-restaurante.webp",
    imageAlt: "Salão do vagão do Viana Restaurante, com as mesas postas.",
    instagram: "vianarestaurantees",
    maps: "https://maps.app.goo.gl/7436G7t3xxzzbR3d8",
    formUrl: "https://forms.gle/rR3TfXq13mRmgggT7",
    claim: "form",
  },
  {
    id: "parque-tunel-da-alegria",
    name: "Parque Túnel da Alegria",
    category: "Lazer",
    place: "Borbas, Viana",
    summary:
      "Área verde no Vale das Cachoeiras, cercada pelo Rio Santo Agostinho. Tem cachoeira, piscinas, toboágua e área de churrasco. Outro contato: (27) 3226-6805. Acesso pela BR-262, depois da sede de Viana, sentido montanhas, estrada de Formate.",
    offer: "Inscreva-se e concorra.",
    offerShort: "Sorteio para os inscritos",
    hours: "Todos os dias · 8h às 17h",
    image: "/images/atracoes/parque-tunel-alegria.jpg",
    imageAlt: "Piscina do Parque Túnel da Alegria, com toboágua e palmeiras.",
    instagram: "parquetuneldaalegria",
    phone: "5527999854799",
    phoneLabel: "(27) 99985 4799",
    maps: "https://maps.app.goo.gl/3AZrGenTYriDaP5ZA",
    formUrl: "https://forms.gle/6246EECshgE7mmBj6",
    claim: "form",
  },
  {
    id: "banho-de-floresta",
    name: "Banho de Floresta",
    category: "Natureza",
    place: "Trilha de Jucuruaba · Incaper",
    summary:
      "Caminhada inspirada no banho de floresta japonês, na trilha do Centro de Pesquisa do Incaper. A proposta é desacelerar na mata, entre saúde, conservação e o território de Viana.",
    offer: "Inscreva-se e concorra. Sessões às 9h, 10h e 11h.",
    offerShort: "Sorteio para os inscritos",
    hours: "Manhã do evento · sessões às 9h, 10h e 11h",
    image: "/images/atracoes/banho-de-floresta.jpg",
    imageAlt: "Pessoa sentada sob as árvores na trilha do banho de floresta.",
    website: "https://incaper.es.gov.br/fazendas",
    websiteLabel: "Sobre a trilha",
    formUrl: "https://forms.gle/Z5ERhnwmw9Sae8HP8",
    claim: "form",
  },
];

export function whatsappClaimUrl(phone: string, attractionName: string, message?: string) {
  const text = message ?? `Olá! Quero participar do sorteio do Dia D: ${attractionName}.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
