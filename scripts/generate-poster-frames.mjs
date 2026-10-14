import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const REF = process.env.POSTER_REF ?? "public/images/poster-reference.jpg";
const OUT = "public/poster";

const layouts = {
  desktop: {
    w: 1440,
    h: 900,
    zones: [
      { left: 0.14, top: 0.02, width: 0.72, height: 0.84 },
      { left: 0.58, top: 0.0, width: 0.4, height: 0.09 },
    ],
  },
  tablet: {
    w: 768,
    h: 1024,
    zones: [
      { left: 0.1, top: 0.02, width: 0.8, height: 0.86 },
      { left: 0.55, top: 0.0, width: 0.42, height: 0.08 },
    ],
  },
  mobile: {
    w: 390,
    h: 720,
    zones: [
      { left: 0.06, top: 0.02, width: 0.88, height: 0.88 },
      { left: 0.5, top: 0.0, width: 0.48, height: 0.07 },
    ],
  },
};

async function sampleCream() {
  const { data, info } = await sharp(REF).raw().toBuffer({ resolveWithObject: true });
  const w = info.width;
  const c = info.channels;
  let r = 0;
  let g = 0;
  let b = 0;
  let n = 0;

  for (let y = Math.floor(info.height * 0.45); y < Math.floor(info.height * 0.55); y += 3) {
    for (let x = Math.floor(w * 0.4); x < Math.floor(w * 0.6); x += 3) {
      const i = (y * w + x) * c;
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
      n++;
    }
  }

  return { r: Math.round(r / n), g: Math.round(g / n), b: Math.round(b / n), alpha: 255 };
}

async function makeFrame({ w, h, zones }, name, cream) {
  const composites = zones.map((z) => ({
    input: {
      create: {
        width: Math.round(z.width * w),
        height: Math.round(z.height * h),
        channels: 4,
        background: cream,
      },
    },
    left: Math.round(z.left * w),
    top: Math.round(z.top * h),
  }));

  await sharp(REF)
    .resize(w, h, { fit: "cover", position: "centre" })
    .composite(composites)
    .webp({ quality: 90 })
    .toFile(path.join(OUT, name));

  console.log(`${name} → ${(fs.statSync(path.join(OUT, name)).size / 1024).toFixed(1)}KB`);
}

const cream = await sampleCream();
console.log("cream", cream);
fs.mkdirSync(OUT, { recursive: true });
await makeFrame(layouts.desktop, "frame-desktop.webp", cream);
await makeFrame(layouts.tablet, "frame-tablet.webp", cream);
await makeFrame(layouts.mobile, "frame-mobile.webp", cream);
