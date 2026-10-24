import { ATTRACTION_FORM_URL } from "@/data/attractions";

// Programação oficial do Dia D (documento "Programação Viana Experience", out/2026).

export interface ProgramLink {
  label: string;
  url: string;
}

export interface ProgramContact {
  name: string;
  phone: string;
  phoneLabel: string;
}

export interface ProgramItem {
  id: string;
  /** Primeiro horário do item, usado na linha do tempo. */
  time: string;
  title: string;
  organizer?: string;
  place: string;
  summary?: string;
  /** Horários da atividade (concentração, largada…). */
  schedule?: { label: string; value: string }[];
  /** Destaques curtos mostrados mesmo com o card fechado. */
  highlights?: string[];
  details?: { label: string; value: string }[];
  maps?: ProgramLink[];
  signup?: ProgramLink;
  /** Quando ainda não há link de inscrição. */
  signupNote?: string;
  coupon?: string;
  contact?: ProgramContact;
}

const RADICAL_CONTACT: ProgramContact = {
  name: "Radical",
  phone: "5527995137122",
  phoneLabel: "(27) 99513-7122",
};

const PARQUE_EXPOSICOES_MAPS = "https://maps.app.goo.gl/iVek9YgosNFbnirT6";
const PARQUE_EXPOSICOES_ACESSO =
  "Acesse o Centro de Viana pela BR-262 e siga em direção à região rural, passando em frente à Prefeitura. O Parque de Exposições fica a pouco mais de 1 km da entrada do Centro.";
const INCAPER_ACESSO =
  "Acesse o bairro Jucu, próximo à DAF Caminhões. Atravesse a ponte sobre o Rio Jucu, vire à direita e siga por cerca de 750 m até a Fazenda Experimental do Incaper, em Jucuruaba.";

export const programItems: ProgramItem[] = [
  {
    id: "corrida",
    time: "5h30",
    title: "Corrida oficial · 5 km",
    organizer: "Linear e Movimento",
    place: "Parque Linear de Canaã, entre Marcílio de Noronha e Universal",
    schedule: [
      { label: "Concentração", value: "5h30" },
      { label: "Largada", value: "6h" },
    ],
    highlights: ["60 vagas", "A partir de 14 anos", "Cupom até 31/10"],
    details: [
      {
        label: "Como chegar",
        value:
          "Pela marginal da BR-101/BR-262. Sentido Domingos Martins: depois da Real Café, siga pela marginal e vire à direita no semáforo após a DEFRAGO. Sentido Cariacica: use a marginal depois da passarela de pedestres do Canaã.",
      },
      { label: "Estacionamento", value: "Gratuito, no Parque Linear de Canaã." },
      {
        label: "Transporte",
        value:
          "A organização não oferece transporte. Dá para ir de ônibus pela linha 911 da Ceturb (Canaã / Terminal Campo Grande via Primavera).",
      },
      { label: "Inscrição", value: "No site da Linear e Movimento, até 06/11." },
      {
        label: "O que vestir",
        value:
          "Short, bermuda ou legging, meias apropriadas e tênis de corrida. Leve boné, protetor solar e óculos de sol.",
      },
      { label: "Kit", value: "As orientações chegam no e-mail da inscrição." },
      { label: "Documento", value: "Identificação com foto." },
    ],
    maps: [{ label: "Parque Linear de Canaã", url: "https://maps.app.goo.gl/ZkaMXUnVto9V6FHD6" }],
    signup: { label: "Inscrever na corrida", url: "https://www.linearemovimento.com.br/" },
    coupon: "VIANAEXPERIENCE",
    contact: { name: "Sandrinho", phone: "5527998116525", phoneLabel: "(27) 99811-6525" },
  },
  {
    id: "caiaque",
    time: "5h30",
    title: "Expedição de caiaque no Rio Jucu",
    organizer: "Radical",
    place: "Fazenda Experimental do Incaper, Jucuruaba (ponto de encontro e chegada)",
    schedule: [
      { label: "Concentração", value: "5h30" },
      { label: "Saída do transporte", value: "6h" },
      { label: "Saída da expedição", value: "7h" },
    ],
    highlights: ["R$ 99 · 10% no cupom", "60 vagas", "A partir de 8 anos"],
    details: [
      {
        label: "Como funciona",
        value:
          "Você estaciona no ponto de chegada, no Incaper, e um transporte leva o grupo até a Pedra da Mulata, onde começa a descida pelo Rio Jucu.",
      },
      { label: "Como chegar", value: INCAPER_ACESSO },
      { label: "Valor", value: "R$ 99 por pessoa, com 10% de desconto no cupom VIANAEXPERIENCE." },
      { label: "Inscrição", value: "No site da Radical, até 06/11." },
      { label: "Idade", value: "A partir de 8 anos, com os pais." },
      {
        label: "O que vestir",
        value:
          "Camisa leve, de preferência de manga longa, bermuda ou calça de secagem rápida e calçado firme.",
      },
      { label: "Documento", value: "Identificação com foto." },
    ],
    maps: [
      { label: "Ponto de encontro e chegada", url: "https://maps.app.goo.gl/HWS9wsB3SeL3zNEy8" },
      { label: "Saída da expedição", url: "https://maps.app.goo.gl/T8xX8umR2t285gju8" },
    ],
    signup: {
      label: "Inscrever no site da Radical",
      url: "https://radicaloficial.com.br/passeio-de-caiaque-no-rio-jucu-com-a-radical-oficial-25103",
    },
    coupon: "VIANAEXPERIENCE",
    contact: RADICAL_CONTACT,
  },
  {
    id: "pendulo",
    time: "6h",
    title: "Pêndulo do Pontilhão de Viana",
    organizer: "Radical",
    place: "Encontro no Posto Canaã, Ribeira, às margens da BR-101/BR-262",
    schedule: [
      { label: "Concentração", value: "6h" },
      { label: "Início", value: "7h" },
    ],
    highlights: ["R$ 99 · 10% no cupom", "60 vagas", "A partir de 6 anos"],
    details: [
      {
        label: "Local do salto",
        value:
          "Pontilhão de Viana, na BR-262, cerca de 600 m depois da Biquinha de Viana, sentido Domingos Martins. Fica a uns 7,5 km da entrada do Centro.",
      },
      {
        label: "Acesso",
        value:
          "Não dá para chegar de carro até o pontilhão: o trecho final é uma caminhada de cerca de 700 m. Confirme com a organização onde estacionar com segurança.",
      },
      {
        label: "Transporte",
        value: "Não há transporte gratuito. Quem precisar de apoio deve falar com a organização até 06/11.",
      },
      { label: "Valor", value: "R$ 99 por pessoa, com 10% de desconto no cupom VIANAEXPERIENCE." },
      { label: "Inscrição", value: "No site da Radical, até 06/11." },
      { label: "Idade", value: "A partir de 6 anos, com os pais." },
      {
        label: "O que vestir",
        value:
          "Camisa de manga longa e tecido leve, calça esportiva resistente e tênis fechado bem ajustado ou bota de trilha.",
      },
      { label: "Documento", value: "Identificação com foto." },
    ],
    maps: [
      { label: "Posto Canaã (encontro)", url: "https://maps.app.goo.gl/DAzeJQAtFXmcjBGL6" },
      { label: "Biquinha de Viana", url: "https://maps.app.goo.gl/Gcq5sqJUCZ8q52CU8" },
      { label: "Último acesso de carro", url: "https://maps.app.goo.gl/HMef2z1ib6xG9Wif8" },
    ],
    signup: { label: "Inscrever no site da Radical", url: "https://radicaloficial.com.br/pendulo-8894" },
    coupon: "VIANAEXPERIENCE",
    contact: RADICAL_CONTACT,
  },
  {
    id: "pedal",
    time: "6h30",
    title: "Pedal · Circuito rural",
    organizer: "Grupo Unidos pelo Pedal",
    place: "Parque de Exposições de Viana (Pavilhão de Eventos)",
    schedule: [
      { label: "Concentração", value: "6h30" },
      { label: "Largada", value: "7h30" },
    ],
    highlights: ["Gratuito", "Vagas ilimitadas"],
    details: [
      {
        label: "Percurso",
        value: "Sai do Parque de Exposições e passa por Peixe Verde, Formate e Perobas, voltando ao Centro de Viana.",
      },
      { label: "Como chegar", value: PARQUE_EXPOSICOES_ACESSO },
      { label: "Estacionamento", value: "Gratuito, com bastante espaço no Parque de Exposições." },
      { label: "Inscrição", value: "Gratuita, pelo formulário oficial, até 06/11." },
      { label: "Idade", value: "Menores de idade só com os pais." },
      {
        label: "O que levar",
        value: "Roupa de ciclismo, capacete, garrafa de água e bicicleta revisada.",
      },
      { label: "Documento", value: "Identificação com foto." },
    ],
    maps: [{ label: "Parque de Exposições", url: PARQUE_EXPOSICOES_MAPS }],
    signup: { label: "Inscrever no formulário", url: ATTRACTION_FORM_URL },
    contact: { name: "Layzzane", phone: "5527999559955", phoneLabel: "(27) 99955-9955" },
  },
  {
    id: "trilha",
    time: "6h30",
    title: "Trilha até o Pontilhão do Rio Jucu",
    organizer: "Radical",
    place: "Parque de Exposições de Viana (Pavilhão de Eventos)",
    schedule: [
      { label: "Concentração", value: "6h30" },
      { label: "Largada", value: "7h30" },
    ],
    highlights: ["Vagas ilimitadas", "Brinde para os 300 primeiros"],
    details: [
      {
        label: "Percurso",
        value: "Sai do Parque de Exposições e passa por Peixe Verde até a divisa com Domingos Martins.",
      },
      { label: "Como chegar", value: PARQUE_EXPOSICOES_ACESSO },
      { label: "Estacionamento", value: "Gratuito, com bastante espaço no Parque de Exposições." },
      { label: "Inscrição", value: "No site da Radical, até 06/11." },
      { label: "Idade", value: "Acima de 8 anos, com os pais." },
      { label: "O que levar", value: "Roupa de trilha e garrafa de água." },
      { label: "Documento", value: "Identificação com foto." },
    ],
    maps: [{ label: "Parque de Exposições", url: PARQUE_EXPOSICOES_MAPS }],
    signup: { label: "Inscrever no site da Radical", url: "https://radicaloficial.com.br/trilha-nos-trilhos-29999" },
    contact: RADICAL_CONTACT,
  },
  {
    id: "vale-das-cachoeiras",
    time: "8h",
    title: "Vale das Cachoeiras e sítios",
    place: "Cachoeira do Aloísio, Piscinas Zé Maria, Parque Túnel da Alegria, Sítio Gava e Sítio Água Viva",
    summary: "Dia de lazer nos parceiros, com cortesias reservadas direto com cada um.",
  },
  {
    id: "banho-de-floresta",
    time: "9h",
    title: "Banho de Floresta",
    organizer: "Equipe do Incaper · Jucuruaba",
    place: "Fazenda Experimental Reginaldo Conde (Incaper), Jucuruaba",
    schedule: [{ label: "Sessões", value: "9h, 10h e 11h" }],
    highlights: ["Gratuito", "40 vagas por sessão", "De 8 a 80 anos"],
    details: [
      { label: "Como chegar", value: `De carro ou aplicativo. ${INCAPER_ACESSO}` },
      { label: "Estacionamento", value: "Gratuito, no local." },
      {
        label: "Transporte",
        value: "Não há transporte gratuito. Quem precisar de apoio deve falar com a organização até 06/11.",
      },
      { label: "Inscrição", value: "Gratuita, até 06/11." },
      {
        label: "O que vestir",
        value:
          "Calça comprida, camisa confortável, boné ou chapéu e calçado fechado (obrigatório: não entra de chinelo ou sandália).",
      },
      { label: "O que levar", value: "Água, protetor solar, repelente e uma toalhinha de rosto." },
      {
        label: "Recomendações",
        value:
          "Cabelo preso, sem perfume forte e sem acessórios que enrosquem na mata. Siga os condutores o tempo todo.",
      },
      { label: "Documento", value: "Identificação oficial com foto." },
    ],
    maps: [{ label: "Fazenda Experimental", url: "https://maps.app.goo.gl/HWS9wsB3SeL3zNEy8" }],
    signup: { label: "Inscrever no formulário", url: ATTRACTION_FORM_URL },
    contact: { name: "Incaper Jucuruaba", phone: "5527995831368", phoneLabel: "(27) 99583-1368" },
  },
  {
    id: "cursos-cervejeiros",
    time: "9h",
    title: "Cursos cervejeiros",
    place: "Cervejarias Piabier (Formate), Indomável (Centro) e Origem (Jucu)",
    schedule: [{ label: "Horário", value: "9h às 17h" }],
    highlights: ["30 vagas por turma", "Certificado do IFES"],
    details: [
      { label: "Cervejeiro Caseiro", value: "Cervejaria Piabier, em Formate. 30 vagas." },
      { label: "Cervejeiro Caseiro", value: "Cervejaria Indomável, no Centro de Viana. 30 vagas." },
      { label: "Harmonização com Cerveja", value: "Cervejaria Origem, no Jucu. 30 vagas." },
    ],
    maps: [
      { label: "Piabier", url: "https://maps.app.goo.gl/Vx1Fpd728ZZS6LLy9" },
      { label: "Indomável", url: "https://maps.app.goo.gl/AtFUwSauL2SMZzkQ9" },
      { label: "Origem", url: "https://maps.app.goo.gl/QoGzDSfSDLXrhGDb9" },
    ],
    signupNote: "Inscrições em breve",
  },
  {
    id: "brinde-artesanato",
    time: "11h",
    title: "Brinde e exposição de artesanato",
    place: "Viana Restaurante (Estação)",
    summary: "A partir das 11h, os participantes retiram o brinde. No mesmo horário abre a exposição de artesanato.",
  },
  {
    id: "almoco",
    time: "12h",
    title: "Almoço",
    place: "Viana Restaurante (Estação), Cantim di Minas e Recanto dos Lagos",
    summary: "No Recanto dos Lagos, o almoço tem pedalinho.",
  },
  {
    id: "shows",
    time: "16h",
    title: "Shows musicais",
    place: "Viana Restaurante (Estação)",
    summary: "Dupla João Pedro e Miguel e Samba DM.",
  },
];

export const vianaExperienceContacts: ProgramContact[] = [
  { name: "Júlio", phone: "5527999130746", phoneLabel: "(27) 99913-0746" },
  { name: "Gleydiston", phone: "5527998320072", phoneLabel: "(27) 99832-0072" },
];
