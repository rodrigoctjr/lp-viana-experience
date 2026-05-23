import type { Metadata } from "next";
import {
  Alfa_Slab_One,
  Bricolage_Grotesque,
  DM_Serif_Display,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const alfaSlab = Alfa_Slab_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-alfa-slab",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Viana Experience — Polo Cervejeiro & Dia D do Turismo · Viana/ES",
  description:
    "Dia D do Turismo em jun/2026. Duas rotas, uma cidade. Natureza, cerveja e aventura no Espírito Santo.",
  openGraph: {
    title: "Viana Experience — Dia D do Turismo",
    description: "Polo Cervejeiro, Rota das Águas e muito mais. Jun/2026 em Viana/ES.",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/images/polo-cervejeiro-poster.png",
        width: 800,
        height: 800,
        alt: "Viana Experience — Polo Cervejeiro Dia D do Turismo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${dmSerif.variable} ${bricolage.variable} ${jetbrains.variable} ${alfaSlab.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
