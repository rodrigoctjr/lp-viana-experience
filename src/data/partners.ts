export interface Partner {
  id: string;
  name: string;
  logo: string;
  width: number;
  height: number;
}

// Faixa de parceiros no fim da página. Para incluir um novo, basta somar aqui.
export const partners: Partner[] = [
  {
    id: "transmarle",
    name: "TransMarle Transportes",
    logo: "/images/parceiros/transmarle.webp",
    width: 1015,
    height: 303,
  },
  {
    id: "produtos-juju",
    name: "Produtos Juju",
    logo: "/images/parceiros/produtos-juju.webp",
    width: 800,
    height: 603,
  },
];
