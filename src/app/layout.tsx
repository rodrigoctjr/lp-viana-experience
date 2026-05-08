import type { Metadata } from 'next';
import { Alfa_Slab_One, DM_Serif_Display, Bricolage_Grotesque, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { RsvpProvider } from '@/context/RsvpContext';

const alfaSlabOne = Alfa_Slab_One({
  weight: '400',
  variable: '--font-display',
  subsets: ['latin'],
});

const dmSerifDisplay = DM_Serif_Display({
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-editorial',
  subsets: ['latin'],
});

const bricolageGrotesque = Bricolage_Grotesque({
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-body',
  subsets: ['latin'],
});

const jetbrainsMono = JetBrains_Mono({
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Viana Experience — Festival de Aventura · Espírito Santo',
  description: 'Festival de aventura, cervejaria e cultura no interior do Espírito Santo. Três dias, duas rotas, 14 experiências.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${alfaSlabOne.variable} ${dmSerifDisplay.variable} ${bricolageGrotesque.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <RsvpProvider>
          {children}
        </RsvpProvider>
      </body>
    </html>
  );
}
