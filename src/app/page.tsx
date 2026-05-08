import Header from '@/components/Header';
import Hero from '@/components/Hero';
import MapSection from '@/components/MapSection';
import TimelineSection from '@/components/TimelineSection';
import ExperiencesSection from '@/components/ExperiencesSection';
import VoucherSection from '@/components/VoucherSection';
import Footer from '@/components/Footer';
import RevealInit from '@/components/RevealInit';

export default function Home() {
  return (
    <>
      <RevealInit />
      <Header />
      <main>
        <Hero />
        <MapSection />
        <TimelineSection />
        <ExperiencesSection />
        <VoucherSection />
      </main>
      <Footer />
    </>
  );
}
