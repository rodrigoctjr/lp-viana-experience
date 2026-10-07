function TopWave() {
  return (
    <svg
      viewBox="0 0 1440 112"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-x-0 top-0 h-14 w-full lg:h-[clamp(48px,10vh,112px)]"
    >
      <path
        fill="var(--color-soon-forest-deep)"
        d="M0 0H1440V108C1420 104 1380 100 1320 94C1220 82 1100 66 980 54C860 42 760 38 620 42C480 46 360 54 240 74C160 88 80 100 0 104Z"
      />
      <path
        fill="var(--color-soon-forest)"
        d="M0 30C90 24 180 16 300 12C460 6 600 4 740 8C900 12 1040 20 1180 28C1300 34 1380 38 1440 42C1380 54 1300 50 1180 44C1040 36 900 28 740 24C600 20 460 22 300 30C180 38 90 50 0 62Z"
      />
      <path
        className="hero-fillet"
        fill="none"
        stroke="var(--color-soon-terra)"
        vectorEffect="non-scaling-stroke"
        d="M0 104C80 100 160 88 240 74C360 54 480 46 620 42C760 38 860 42 980 54C1100 66 1220 82 1320 94C1380 100 1420 104 1440 108"
      />
    </svg>
  );
}

function BottomWave() {
  return (
    <svg
      viewBox="0 0 1440 240"
      preserveAspectRatio="none"
      className="absolute inset-x-0 bottom-0 h-[168px] w-full sm:h-[200px] lg:h-[240px]"
    >
      <path
        fill="var(--color-soon-forest-deep)"
        d="M0 18C36 6 70 12 110 52C150 96 175 160 200 214C230 242 1210 242 1240 214C1265 160 1290 96 1330 52C1370 12 1404 6 1440 18V240H0Z"
      />
      <path
        fill="var(--color-soon-forest)"
        d="M0 48C48 28 90 40 140 88C185 132 210 186 240 224C275 244 1165 244 1200 224C1230 186 1255 132 1300 88C1350 40 1392 28 1440 48V240H0Z"
      />
      <path
        className="hero-fillet"
        fill="none"
        stroke="var(--color-soon-terra)"
        vectorEffect="non-scaling-stroke"
        d="M0 18C36 6 70 12 110 52C150 96 175 160 200 214C230 242 1210 242 1240 214C1265 160 1290 96 1330 52C1370 12 1404 6 1440 18"
      />
    </svg>
  );
}

export function PosterBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      <TopWave />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/poster/art/leaves-cluster.png"
        alt=""
        className="absolute top-0 right-0 h-auto w-[104px] lg:w-[148px]"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/poster/art/wind.png"
        alt=""
        className="absolute top-[8%] left-2 hidden h-auto w-[450px] max-w-none object-contain object-left lg:block"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/poster/art/mountains.png"
        alt=""
        className="absolute top-[6%] right-2 hidden h-auto max-h-[260px] w-auto max-w-[min(26rem,calc(50%-16rem))] object-contain object-right lg:block min-[1440px]:max-h-[300px] min-[1440px]:max-w-[min(32rem,calc(50%-18rem))]"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/poster/art/grove-side.svg"
        alt=""
        className="absolute top-[14%] left-0 h-[200px] w-[88px] -translate-x-[28px] sm:h-[240px] sm:w-[110px] lg:h-[280px] lg:w-[148px]"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/poster/art/grove-side.svg"
        alt=""
        className="absolute top-[14%] right-0 h-[200px] w-[88px] translate-x-[28px] -scale-x-100 sm:h-[240px] sm:w-[110px] lg:h-[280px] lg:w-[148px]"
      />
      <BottomWave />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/poster/art/grove-bottom-left.svg"
        alt=""
        className="absolute bottom-0 left-0 h-[180px] w-[120px] sm:h-[230px] sm:w-[180px] lg:h-[300px] lg:w-[260px]"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/poster/art/leaves-branch.png"
        alt=""
        className="absolute top-0 left-0 h-auto w-[88px] sm:w-[110px] lg:hidden"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/poster/art/grove-bottom-right.svg"
        alt=""
        className="absolute right-0 bottom-0 h-[172px] w-[116px] sm:h-[220px] sm:w-[172px] lg:h-[280px] lg:w-[250px]"
      />
    </div>
  );
}
