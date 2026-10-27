
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

// Formulários de inscrição para o sorteio, um por atividade.
export const PROGRAM_FORMS = {
  banhoDeFloresta: "https://forms.gle/Z5ERhnwmw9Sae8HP8",
  pedal: "https://forms.gle/yqNqLRoeQtjxRuVbA",
  cavalgada: "https://forms.gle/MqrPokGc4wTr2gLm9",
  cursoCervejeiro: "https://forms.gle/wRPKVe1HcqHWTXmr8",
  vianaRestaurante: "https://forms.gle/rR3TfXq13mRmgggT7",
  cantimDiMinas: "https://forms.gle/tviKVj6Y8MRP1P6NA",
  recantoDosLagos: "https://forms.gle/dHVpKs4XgbGMje1PA",
  sitioGava: "https://forms.gle/rd4qRLuMrbi1uvAR7",
  sitioAguaViva: "https://forms.gle/ixS1Kt8MT3E3HZVFA",
  parqueTunelDaAlegria: "https://forms.gle/6246EECshgE7mmBj6",
  piscinasZeMaria: "https://forms.gle/64nMQuQ5fQMbsqkT7",
  cachoeiraAloisio: "https://forms.gle/Zri7zg7Gm3XdyjxA6",
} as const;

const RAFFLE_SIGNUP_LABEL = "Inscrever e concorrer";
const RAFFLE_SIGNUP_DETAIL = "Pelo formulário, até 06/11. Inscreva-se e concorra: sorteio para os inscritos.";

const ROTA_DAS_AGUAS = "Rota das Águas · Vale das Cachoeiras";
const ROTA_DAS_AGUAS_DESPESAS =
  "O que você consumir no local é por sua conta. Confira com o espaço valores de entrada, disponibilidade e condições de acesso.";

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
      { label: "Kit", value: "As orientações chegam pelo e-mail informado na inscrição." },
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
    highlights: ["Sorteio para os inscritos"],
    details: [
      {
        label: "Percurso",
        value: "Sai do Parque de Exposições e passa por Peixe Verde, Formate e Perobas, voltando ao Centro de Viana.",
      },
      { label: "Como chegar", value: PARQUE_EXPOSICOES_ACESSO },
      { label: "Estacionamento", value: "Gratuito, com bastante espaço no Parque de Exposições." },
      { label: "Inscrição", value: "Pelo formulário, até 06/11. Inscreva-se e concorra: sorteio para os inscritos." },
      { label: "Idade", value: "Menores de idade só com os pais." },
      {
        label: "O que levar",
        value: "Roupa de ciclismo, capacete, garrafa de água e bicicleta revisada.",
      },
      { label: "Documento", value: "Identificação com foto." },
    ],
    maps: [{ label: "Parque de Exposições", url: PARQUE_EXPOSICOES_MAPS }],
    signup: { label: RAFFLE_SIGNUP_LABEL, url: PROGRAM_FORMS.pedal },
    contact: { name: "Layzzane", phone: "5527999559955", phoneLabel: "(27) 99955-9955" },
  },
  {
    id: "cavalgada",
    time: "6h30",
    title: "Cavalgada",
    place: "Parque de Exposições de Viana (Pavilhão de Eventos)",
    schedule: [
      { label: "Concentração", value: "6h30" },
      { label: "Largada", value: "7h30" },
    ],
    highlights: ["Vagas ilimitadas"],
    details: [
      { label: "Percurso", value: "Saída do Parque de Exposições." },
      { label: "Como chegar", value: PARQUE_EXPOSICOES_ACESSO },
      { label: "Estacionamento", value: "Gratuito, com bastante espaço no Parque de Exposições." },
      { label: "Inscrição", value: "Pelo formulário, até 06/11." },
      { label: "Idade", value: "Menores de idade só com os pais." },
      { label: "O que levar", value: "Roupa adequada para cavalgada e garrafa de água." },
      { label: "Documento", value: "Identificação com foto." },
    ],
    maps: [{ label: "Parque de Exposições", url: PARQUE_EXPOSICOES_MAPS }],
    signup: { label: "Inscrever na cavalgada", url: PROGRAM_FORMS.cavalgada },
    contact: { name: "Samira", phone: "5527992810373", phoneLabel: "(27) 99281-0373" },
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
    highlights: ["Vagas ilimitadas", "Sorteio para os inscritos"],
    details: [
      {
        label: "Percurso",
        value: "Sai do Parque de Exposições e passa por Peixe Verde até a divisa com Domingos Martins.",
      },
      { label: "Como chegar", value: PARQUE_EXPOSICOES_ACESSO },
      { label: "Estacionamento", value: "Gratuito, com bastante espaço no Parque de Exposições." },
      { label: "Inscrição", value: "No site da Radical, até 06/11. Inscreva-se e concorra: sorteio para os inscritos." },
      { label: "Idade", value: "Acima de 8 anos, com os pais." },
      { label: "O que levar", value: "Roupa de trilha e garrafa de água." },
      { label: "Documento", value: "Identificação com foto." },
    ],
    maps: [{ label: "Parque de Exposições", url: PARQUE_EXPOSICOES_MAPS }],
    signup: { label: "Inscrever no site da Radical", url: "https://radicaloficial.com.br/trilha-nos-trilhos-29999" },
    contact: RADICAL_CONTACT,
  },
  {
    id: "sitio-gava",
    time: "8h",
    title: "Sítio Gava",
    organizer: ROTA_DAS_AGUAS,
    place: "Piapitangui, Viana",
    schedule: [{ label: "Funcionamento", value: "9h às 17h" }],
    highlights: ["Sorteio para os inscritos"],
    details: [
      {
        label: "Atrações",
        value: "Piscinas, churrasqueiras, campo de futebol, trilha ecológica, cama elástica e balanços.",
      },
      { label: "Atenção", value: "É proibido o consumo de bebidas alcoólicas no sítio." },
      { label: "Inscrição", value: RAFFLE_SIGNUP_DETAIL },
      { label: "Despesas", value: ROTA_DAS_AGUAS_DESPESAS },
    ],
    maps: [{ label: "Sítio Gava", url: "https://maps.app.goo.gl/jXQh65KU5yFFXf4T7" }],
    signup: { label: RAFFLE_SIGNUP_LABEL, url: PROGRAM_FORMS.sitioGava },
  },
  {
    id: "sitio-agua-viva",
    time: "8h",
    title: "Sítio Água Viva",
    organizer: ROTA_DAS_AGUAS,
    place: "Estrada de Formate a Piapitangui, Viana",
    schedule: [{ label: "Funcionamento", value: "8h às 17h" }],
    highlights: ["Sorteio para os inscritos"],
    details: [
      {
        label: "Atrações",
        value:
          "Piscinas de água corrente, cachoeira, represa no rio, churrasqueiras, campo de areia, estacionamento e pousada.",
      },
      {
        label: "Como chegar",
        value: "Na estrada principal que liga Formate a Piapitangui, a cerca de 3,7 km da BR-262. CEP 29139-899.",
      },
      { label: "Inscrição", value: RAFFLE_SIGNUP_DETAIL },
      { label: "Despesas", value: ROTA_DAS_AGUAS_DESPESAS },
    ],
    maps: [{ label: "Sítio Água Viva", url: "https://maps.app.goo.gl/rChKpVhDww8kiJA19" }],
    signup: { label: RAFFLE_SIGNUP_LABEL, url: PROGRAM_FORMS.sitioAguaViva },
  },
  {
    id: "parque-tunel-da-alegria",
    time: "8h",
    title: "Parque Túnel da Alegria",
    organizer: ROTA_DAS_AGUAS,
    place: "Vale das Cachoeiras, estrada de Formate",
    schedule: [{ label: "Funcionamento", value: "8h às 17h" }],
    highlights: ["Sorteio para os inscritos"],
    details: [
      { label: "Atrações", value: "Cachoeira, piscinas, toboágua e área de churrasco." },
      {
        label: "Destaque",
        value: "Lazer no meio da natureza, cercado pelo Rio Santo Agostinho, no Vale das Cachoeiras.",
      },
      {
        label: "Como chegar",
        value: "Pela BR-262, depois da Sede de Viana, sentido Domingos Martins, seguindo pela estrada de Formate.",
      },
      { label: "Inscrição", value: RAFFLE_SIGNUP_DETAIL },
      { label: "Despesas", value: ROTA_DAS_AGUAS_DESPESAS },
    ],
    maps: [{ label: "Parque Túnel da Alegria", url: "https://maps.app.goo.gl/3AZrGenTYriDaP5ZA" }],
    signup: { label: RAFFLE_SIGNUP_LABEL, url: PROGRAM_FORMS.parqueTunelDaAlegria },
  },
  {
    id: "piscinas-ze-maria",
    time: "8h",
    title: "Piscinas Zé Maria",
    organizer: ROTA_DAS_AGUAS,
    place: "Borbas, Viana",
    schedule: [{ label: "Funcionamento", value: "8h às 17h" }],
    highlights: ["Sorteio para os inscritos"],
    details: [
      {
        label: "Atrações",
        value: "Piscinas para adultos e crianças, churrasqueiras, área coberta, parquinho infantil e estacionamento.",
      },
      {
        label: "Destaque",
        value: "Área arborizada às margens do Rio Santo Agostinho, boa para descansar perto da natureza.",
      },
      { label: "Inscrição", value: RAFFLE_SIGNUP_DETAIL },
      { label: "Despesas", value: ROTA_DAS_AGUAS_DESPESAS },
    ],
    maps: [{ label: "Piscinas Zé Maria", url: "https://maps.app.goo.gl/FQKdWmxyoRNCe4cE9" }],
    signup: { label: RAFFLE_SIGNUP_LABEL, url: PROGRAM_FORMS.piscinasZeMaria },
  },
  {
    id: "cachoeira-aloisio",
    time: "8h",
    title: "Cachoeira do Aloísio",
    organizer: ROTA_DAS_AGUAS,
    place: "Borbas, Viana",
    schedule: [{ label: "Funcionamento", value: "7h às 20h" }],
    highlights: ["Sorteio para os inscritos"],
    details: [
      {
        label: "Atrações",
        value: "Cachoeira, trilhas, piscina, área de camping e cerca de 60 churrasqueiras.",
      },
      {
        label: "Destaque",
        value: "O passeio sobe o morro, passa pela mata e segue a pé pelo leito do rio.",
      },
      { label: "Inscrição", value: RAFFLE_SIGNUP_DETAIL },
      { label: "Despesas", value: ROTA_DAS_AGUAS_DESPESAS },
    ],
    maps: [{ label: "Cachoeira do Aloísio", url: "https://maps.app.goo.gl/MFHfunhBA2cqPkqx8" }],
    signup: { label: RAFFLE_SIGNUP_LABEL, url: PROGRAM_FORMS.cachoeiraAloisio },
  },
  {
    id: "banho-de-floresta",
    time: "9h",
    title: "Banho de Floresta",
    organizer: "Equipe do Incaper · Jucuruaba",
    place: "Fazenda Experimental Reginaldo Conde (Incaper), Jucuruaba",
    schedule: [{ label: "Sessões", value: "9h, 10h e 11h" }],
    highlights: ["Sorteio para os inscritos", "De 8 a 80 anos"],
    details: [
      { label: "Como chegar", value: `De carro ou aplicativo. ${INCAPER_ACESSO}` },
      { label: "Estacionamento", value: "Gratuito, no local." },
      {
        label: "Transporte",
        value: "Não há transporte gratuito. Quem precisar de apoio deve falar com a organização até 06/11.",
      },
      { label: "Inscrição", value: "Pelo formulário, até 06/11. Inscreva-se e concorra: sorteio para os inscritos." },
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
    signup: { label: RAFFLE_SIGNUP_LABEL, url: PROGRAM_FORMS.banhoDeFloresta },
    contact: { name: "Incaper Jucuruaba", phone: "5527995831368", phoneLabel: "(27) 99583-1368" },
  },
  {
    id: "cursos-cervejeiros",
    time: "9h",
    title: "Cursos cervejeiros",
    place: "Cervejarias Piabier (Formate), Indomável (Centro) e Origem (Jucu)",
    schedule: [{ label: "Horário", value: "9h às 17h" }],
    highlights: ["Sorteio para os inscritos", "Certificado do IFES"],
    details: [
      { label: "Cervejeiro Caseiro", value: "Cervejaria Piabier, em Formate." },
      { label: "Cervejeiro Caseiro", value: "Cervejaria Indomável, no Centro de Viana." },
      { label: "Harmonização com Cerveja", value: "Cervejaria Origem, no Jucu." },
      {
        label: "Inscrição",
        value: "Um formulário só, em que você escolhe a turma. Inscreva-se e concorra: sorteio para os inscritos.",
      },
    ],
    maps: [
      { label: "Piabier", url: "https://maps.app.goo.gl/Vx1Fpd728ZZS6LLy9" },
      { label: "Indomável", url: "https://maps.app.goo.gl/AtFUwSauL2SMZzkQ9" },
      { label: "Origem", url: "https://maps.app.goo.gl/QoGzDSfSDLXrhGDb9" },
    ],
    signup: { label: RAFFLE_SIGNUP_LABEL, url: PROGRAM_FORMS.cursoCervejeiro },
  },
  {
    id: "brinde-artesanato",
    time: "11h",
    title: "Brinde e exposição de artesanato",
    place: "Viana Restaurante (Estação)",
    schedule: [{ label: "Artesanato", value: "11h às 18h" }],
    summary: "A partir das 11h, os participantes retiram o brinde. No mesmo horário abre a exposição de artesanato.",
  },
  {
    id: "viana-restaurante",
    time: "11h",
    title: "Viana Restaurante · almoço",
    place: "Estação Ferroviária de Viana",
    schedule: [
      { label: "Almoço", value: "a partir das 11h" },
      { label: "Espaço", value: "9h às 18h" },
    ],
    highlights: ["Sorteio para os inscritos"],
    details: [{ label: "Inscrição", value: RAFFLE_SIGNUP_DETAIL }],
    maps: [{ label: "Viana Restaurante", url: "https://maps.app.goo.gl/7436G7t3xxzzbR3d8" }],
    signup: { label: RAFFLE_SIGNUP_LABEL, url: PROGRAM_FORMS.vianaRestaurante },
  },
  {
    id: "cantim-di-minas",
    time: "11h",
    title: "Cantim di Minas · almoço",
    place: "Universal, Viana",
    schedule: [{ label: "Almoço", value: "11h às 15h" }],
    highlights: ["Sorteio para os inscritos"],
    details: [{ label: "Inscrição", value: RAFFLE_SIGNUP_DETAIL }],
    maps: [{ label: "Cantim di Minas", url: "https://maps.app.goo.gl/3zKjWMZAkJCqQqCa8" }],
    signup: { label: RAFFLE_SIGNUP_LABEL, url: PROGRAM_FORMS.cantimDiMinas },
  },
  {
    id: "recanto-dos-lagos",
    time: "11h",
    title: "Recanto dos Lagos · almoço e pedalinho",
    place: "Universal, Viana",
    schedule: [
      { label: "Almoço", value: "11h às 15h" },
      { label: "Espaço", value: "9h às 17h" },
    ],
    highlights: ["Sorteio para os inscritos"],
    details: [{ label: "Inscrição", value: RAFFLE_SIGNUP_DETAIL }],
    maps: [{ label: "Recanto dos Lagos", url: "https://maps.app.goo.gl/NXFkTPxmXCDzripK7" }],
    signup: { label: RAFFLE_SIGNUP_LABEL, url: PROGRAM_FORMS.recantoDosLagos },
  },
  {
    id: "pesque-e-pague-do-nenem",
    time: "11h",
    title: "Pesque e Pague do Neném",
    place: "Viana",
    schedule: [
      { label: "Espaço e porções", value: "8h às 18h" },
      { label: "Self-service", value: "11h30 às 14h30" },
    ],
    summary: "Entrada gratuita, sem reserva. Música ao vivo a partir das 12h.",
    highlights: ["Entrada gratuita", "Sem reserva", "Música ao vivo"],
    details: [
      { label: "Música ao vivo", value: "A partir das 12h, com Max & André e Jobson Mayer." },
      {
        label: "Gastronomia",
        value:
          "Almoço self-service com churrasco a R$ 99,99/kg. Porções de tilápia, camarão, carne de sol, frango e outras, além de bebidas, sucos e drinks.",
      },
      {
        label: "Lazer",
        value:
          "Pesca esportiva R$ 30 (com equipamento próprio), pesca comum R$ 10 (com vara e isca) e piscina R$ 20 para adultos e R$ 10 para crianças até 12 anos. Ambiente familiar, com mais de 20 espécies de peixes.",
      },
      { label: "Couvert artístico", value: "R$ 10." },
    ],
    maps: [{ label: "Pesque e Pague do Neném", url: "https://maps.app.goo.gl/F3Hhf55F7Zzt4AGA8" }],
  },
  {
    id: "shows",
    time: "16h",
    title: "Shows musicais",
    place: "Viana Restaurante (Estação)",
    summary: "Com a dupla João Pedro e Miguel e o Samba DM.",
  },
];

export const vianaExperienceContacts: ProgramContact[] = [
  { name: "Júlio", phone: "5527999130746", phoneLabel: "(27) 99913-0746" },
  { name: "Gleydiston", phone: "5527998320072", phoneLabel: "(27) 99832-0072" },
];
