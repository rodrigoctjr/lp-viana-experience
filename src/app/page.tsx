"use client";

import { useState } from "react";
import { RefHandler } from "@/components/RefHandler";
import { DiaDTeaser } from "@/components/sections/DiaDTeaser";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { ImpactCta } from "@/components/sections/ImpactCta";
import { MapSection } from "@/components/sections/MapSection";
import { Pillars } from "@/components/sections/Pillars";
import { PreviewSection } from "@/components/sections/PreviewSection";
import { QuizTotemSection } from "@/components/sections/QuizTotemSection";
import { StatsStrip } from "@/components/sections/StatsStrip";

export default function HomePage() {
  const [refCopy, setRefCopy] = useState<string | undefined>();

  return (
    <>
      <RefHandler onRefCopy={setRefCopy} />
      <Header />
      <main>
        <Hero refCopy={refCopy} />
        <StatsStrip />
        <Pillars />
        <MapSection />
        <DiaDTeaser />
        <PreviewSection />
        <QuizTotemSection />
        <ImpactCta />
      </main>
      <Footer />
    </>
  );
}
