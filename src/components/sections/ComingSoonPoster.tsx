import { PosterActivities } from "@/components/poster/PosterActivities";
import { PosterBackdrop } from "@/components/poster/PosterBackdrop";
import { PosterChrome, PosterInvite } from "@/components/poster/PosterChrome";
import { PosterSeals } from "@/components/poster/PosterSeals";
import { PosterTitle } from "@/components/poster/PosterTitle";

export function ComingSoonPoster() {
  return (
    <section className="relative flex min-h-svh w-full flex-col overflow-x-clip bg-soon-cream font-body text-soon-forest">
      <PosterChrome />
      <div className="relative flex min-h-0 flex-1 flex-col">
        <PosterBackdrop />
        <div className="relative z-10 flex flex-1 flex-col px-0 pt-16 pb-24 sm:pb-28 lg:pt-[clamp(56px,10vh,112px)] lg:pb-16">
        <div className="mx-auto flex w-full min-w-0 max-w-[1120px] flex-1 flex-col items-center">
          <PosterTitle />
          <PosterActivities />
          <p className="mt-6 text-center font-body text-base leading-[1.3] font-medium text-soon-forest lg:mt-8 lg:text-lg">
            E outras experiências
          </p>
          <PosterInvite />
          <PosterSeals />
        </div>
        </div>
      </div>
    </section>
  );
}

export function ComingSoonClose() {
  return (
    <footer className="bg-soon-forest-deep px-6 py-8 text-center">
      <p className="font-body text-sm text-soon-cream/90">Viana Experience · Dia D do Turismo · Viana/ES</p>
      <p className="mt-2 font-body text-xs text-soon-cream/70">desenvolvido por: Vilainfo</p>
    </footer>
  );
}
