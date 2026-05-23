import sharp from "sharp";
import { statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const input = join(__dirname, "../public/images/bike-viana-source.png");
const output = join(__dirname, "../public/images/bike-viana-experience.png");

const MAX_WIDTH = 320;

async function main() {
  const before = statSync(input).size;
  const meta = await sharp(input).metadata();

  const { data, info } = await sharp(input)
    .ensureAlpha()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const isChecker =
      (Math.abs(r - g) < 8 && Math.abs(g - b) < 8 && r > 175 && r < 245) ||
      (r > 200 && g > 200 && b > 200);
    if (isChecker) data[i + 3] = 0;
  }

  await sharp(data, { raw: { width, height, channels } })
    .trim({ threshold: 10 })
    .png({ compressionLevel: 9, effort: 10 })
    .toFile(output);

  const afterMeta = await sharp(output).metadata();
  const after = statSync(output).size;

  console.log(
    `${meta.width}x${meta.height} → ${afterMeta.width}x${afterMeta.height} · ${Math.round(before / 1024)}KB → ${Math.round(after / 1024)}KB`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
