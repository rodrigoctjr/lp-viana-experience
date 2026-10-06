import { ComingSoonClose, ComingSoonPoster } from "@/components/sections/ComingSoonPoster";
import { QuizTotemSection } from "@/components/sections/QuizTotemSection";
import { RunnerGameSection } from "@/components/sections/RunnerGameSection";

export default function HomePage() {
  return (
    <>
      <main>
        <ComingSoonPoster />
        <QuizTotemSection />
        <RunnerGameSection />
      </main>
      <ComingSoonClose />
    </>
  );
}
