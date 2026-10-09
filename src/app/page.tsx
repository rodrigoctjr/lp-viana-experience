"use client";

import { useState } from "react";
import { RefHandler } from "@/components/RefHandler";
import { AttractionsSection } from "@/components/sections/AttractionsSection";
import { DiaDTeaser } from "@/components/sections/DiaDTeaser";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { ImpactCta } from "@/components/sections/ImpactCta";
import { Pillars } from "@/components/sections/Pillars";
import { QuizTotemSection } from "@/components/sections/QuizTotemSection";
import { RunnerGameSection } from "@/components/sections/RunnerGameSection";

export default function HomePage() {
  const [refCopy, setRefCopy] = useState<string | undefined>();

  return (
    <>
      <RefHandler onRefCopy={setRefCopy} />
      <Header />
      <main>
        <Hero refCopy={refCopy} />
        <Pillars />
        <DiaDTeaser />
        <AttractionsSection />
        <QuizTotemSection />
        <RunnerGameSection />
        <ImpactCta />
      </main>
      <Footer />
    </>
  );
}
