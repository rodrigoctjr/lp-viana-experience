"use client";

import { useEffect, useRef } from "react";

const sections = ["pillars", "dia-d", "atracoes"];
const colors = ["#a05b40", "#326650", "#24676e"];
const contour = "M-99-110C-36-151 65-124 105-58S131 69 67 113S-57 147-112 78S-157-64-99-110Z";

/** A decorative cartographic layer. Existing sections provide all scroll distance. */
export function JourneyMotion() {
  const rootRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const trackRef = useRef<SVGPathElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const trailRef = useRef<SVGPathElement>(null);
  const markerRef = useRef<SVGGElement>(null);
  const leftRef = useRef<SVGGElement>(null);
  const rightRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const root = rootRef.current, svg = svgRef.current, track = trackRef.current;
    const line = lineRef.current, trail = trailRef.current, marker = markerRef.current;
    const left = leftRef.current, right = rightRef.current;
    if (!root || !svg || !track || !line || !trail || !marker || !left || !right) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targets = sections.map(id => document.getElementById(id));
    let frame = 0, width = 0, height = 0, episode = -1, length = 1;
    let windows: { start: number; duration: number }[] = [];
    const hide = () => { root.style.opacity = "0"; root.dataset.active = "false"; };
    function measure() {
      width = document.documentElement.clientWidth; height = innerHeight;
      svg!.setAttribute("viewBox", `0 0 ${width} ${height}`);
      const starts = targets.map(element => element ? element.getBoundingClientRect().top + scrollY - height * .6 : Infinity);
      windows = starts.map((start, i) => ({ start, duration: Math.max(1, Math.min(height * 1.6, (starts[i + 1] ?? Infinity) - start - height * .12)) }));
      episode = -1; schedule();
    }
    function draw() {
      frame = 0;
      if (media.matches || document.hidden) { hide(); return; }
      const index = windows.findIndex(window => scrollY >= window.start && scrollY <= window.start + window.duration);
      if (index === -1) { hide(); return; }
      if (episode !== index) {
        episode = index;
        const p = (x: number, y: number) => `${(x * width).toFixed(1)} ${(y * height).toFixed(1)}`;
        const routes = [
          `M${p(-.08, .12)} C${p(.15, .10)} ${p(.17, .82)} ${p(.48, .76)} S${p(.86, .16)} ${p(1.08, .08)}`,
          `M${p(1.06, .94)} C${p(.70, .98)} ${p(.85, .60)} ${p(.56, .62)} S${p(.12, .65)} ${p(.32, .34)} S${p(.20, .10)} ${p(-.06, .06)}`,
          `M${p(-.06, .94)} C${p(.12, .93)} ${p(.12, .70)} ${p(.28, .72)} S${p(.41, .44)} ${p(.55, .48)} S${p(.72, .20)} ${p(.83, .22)} S${p(.96, .08)} ${p(1.06, .05)}`,
        ];
        for (const path of [track!, line!, trail!]) path.setAttribute("d", routes[index]);
        length = line!.getTotalLength();
        root!.style.color = colors[index]; root!.dataset.episode = String(index);
      }
      const progress = Math.max(0, Math.min(1, (scrollY - windows[index].start) / windows[index].duration));
      const fade = Math.min(1, progress / .13, (1 - progress) / .16);
      root!.style.opacity = String(fade); root!.dataset.active = "true"; root!.dataset.progress = progress.toFixed(3);
      // The full route reveals quietly; a short, stronger segment follows its leading point.
      line!.style.strokeDasharray = String(length);
      line!.style.strokeDashoffset = String(length * (1 - progress));
      const tail = Math.min(.16, progress) * length;
      trail!.style.strokeDasharray = `${tail} ${length}`;
      trail!.style.strokeDashoffset = String(-(progress * length - tail));
      const point = line!.getPointAtLength(length * progress);
      marker!.setAttribute("transform", `translate(${point.x} ${point.y})`);
      const compact = width < 768, scale = compact ? .68 : 1.2;
      left!.setAttribute("transform", `translate(${width * -.025} ${height * (.32 + progress * .07)}) rotate(-22) scale(${scale})`);
      right!.setAttribute("transform", `translate(${width * 1.02} ${height * (.78 - progress * .09)}) rotate(18) scale(${scale * 1.12})`);
      left!.style.opacity = String(.12 + Math.sin(progress * Math.PI) * .05);
      right!.style.opacity = String(.12 + Math.sin(progress * Math.PI) * .05);
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(draw); }
    const preference = () => { if (media.matches) { cancelAnimationFrame(frame); frame = 0; hide(); } else measure(); };
    const resize = new ResizeObserver(measure);
    for (const target of targets) if (target) resize.observe(target);
    // The hero can change height after its opening transition on short screens.
    // That shifts every target without changing the targets' own dimensions.
    const main = document.querySelector("main");
    if (main) resize.observe(main);
    media.addEventListener("change", preference);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    document.addEventListener("visibilitychange", preference);
    measure();
    return () => {
      cancelAnimationFrame(frame); resize.disconnect(); media.removeEventListener("change", preference);
      window.removeEventListener("scroll", schedule); window.removeEventListener("resize", measure);
      document.removeEventListener("visibilitychange", preference);
    };
  }, []);

  return <div ref={rootRef} className="journey-motion" aria-hidden="true" data-active="false">
    <svg ref={svgRef} fill="none" focusable="false">
      <g ref={leftRef} className="journey-contours">{[.55, .78, 1.02, 1.28, 1.56, 1.86].map((scale, i) => <path key={scale} d={contour} transform={`scale(${scale})`} vectorEffect="non-scaling-stroke" data-contour={i} />)}</g>
      <g ref={rightRef} className="journey-contours">{[.55, .78, 1.02, 1.28, 1.56, 1.86].map((scale, i) => <path key={scale} d={contour} transform={`scale(${scale})`} vectorEffect="non-scaling-stroke" data-contour={i} />)}</g>
      <path ref={trackRef} className="journey-track" />
      <path ref={lineRef} className="journey-line" />
      <path ref={trailRef} className="journey-trail" />
      <g ref={markerRef} className="journey-marker"><circle r="8" className="journey-marker-ring" /><circle r="2.5" className="journey-marker-point" /></g>
    </svg>
  </div>;
}
