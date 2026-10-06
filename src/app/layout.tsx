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
  title: "Viana Experience — Site em construção",
  description:
    "Dia D do Turismo em Viana/ES. Em breve: caiaque no rio Jucu, pêndulo, trilha, banho de floresta e outras experiências.",
  openGraph: {
    title: "Viana Experience — Dia D do Turismo",
    description: "Site em construção. Dia D do Turismo em Viana/ES.",
    locale: "pt_BR",
    type: "website",
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
