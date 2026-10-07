import Image from "next/image";

const ACTIVITIES = [
  {
    label: "Descida de caiaque no rio Jucu",
    src: "/activities/caiaque.png",
    width: 180,
    height: 152,
    keep: 100,
  },
  {
    label: "Pêndulo",
    src: "/activities/pendulo.png",
    width: 139,
    height: 147,
    keep: 111,
  },
  {
    label: "Trilha",
    src: "/activities/trilha.png",
    width: 151,
    height: 137,
    keep: 106,
  },
  {
    label: "Banho de floresta",
    src: "/activities/floresta.png",
    width: 171,
    height: 140,
    keep: 112,
  },
] as const;

const CELL_BORDER = [
  "border-r border-b border-soon-line lg:border-0",
  "border-b border-soon-line lg:border-0",
  "border-r border-soon-line lg:border-0",
  "",
] as const;

export function PosterActivities() {
  return (
    <ul className="mt-[50px] grid w-full min-w-0 max-w-full grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:max-w-[40rem] lg:max-w-none lg:grid-cols-4 lg:gap-8 min-[1440px]:gap-10">
      {ACTIVITIES.map((activity, index) => (
        <li key={activity.src} className={`min-w-0 px-2 py-3 md:px-4 md:py-4 lg:px-0 lg:py-0 ${CELL_BORDER[index]}`}>
          <div
            className="relative mx-auto w-[104px] max-w-full overflow-hidden md:w-[160px] lg:w-[128px] min-[1440px]:w-[140px]"
            style={{ aspectRatio: `${activity.width} / ${activity.keep}` }}
          >
            <Image
              src={activity.src}
              alt=""
              width={activity.width}
              height={activity.height}
              sizes="(min-width: 1440px) 140px, (min-width: 1024px) 128px, (min-width: 768px) 160px, 104px"
              className="absolute top-0 left-0 h-auto w-full max-w-none"
            />
          </div>
          <p className="mt-2 w-full max-w-full text-center font-body text-sm leading-[1.25] font-semibold wrap-break-word whitespace-normal text-balance text-soon-forest lg:text-[15px] min-[1440px]:text-base">
            {activity.label}
          </p>
        </li>
      ))}
    </ul>
  );
}
