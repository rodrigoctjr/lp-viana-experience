export interface PhotoAlbum {
  id: string;
  title: string;
  url: string;
  image: string;
  imageAlt: string;
}

// Álbuns de fotos do Dia D (08/11/2026) no Banlek. As capas são as mesmas fotos dos cards de atrações.
export const photoAlbums: PhotoAlbum[] = [
  {
    id: "corrida",
    title: "Corrida",
    url: "https://banlek.com/album/2a7a0e",
    image: "/images/atracoes/linear-corrida.webp",
    imageAlt: "Kit da 1ª corrida Linear e Movimento: camiseta, viseira, bolsa e número de peito.",
  },
  {
    id: "trilha-pendulo",
    title: "Trilha e pêndulo",
    url: "https://banlek.com/album/2a4c4b",
    image: "/images/atracoes/pendulo-radical.png",
    imageAlt: "Salto de pêndulo de cabeça para baixo, sobre o rio.",
  },
];
