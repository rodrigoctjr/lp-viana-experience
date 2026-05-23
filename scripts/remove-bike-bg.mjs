import sharp from "sharp";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const input = join(__dirname, "../public/images/bike-viana-experience.png");
const output = join(__dirname, "../public/images/bike-viana-experience-transparent.png");

function isStudioBackground(r, g, b, a, x, y, width, height) {
  if (a < 10) return true;

  const nx = x / width;
  const ny = y / height;

  // Chão terracota
  if (r > 130 && g > 65 && g < 155 && b > 45 && b < 135 && r > g + 10) {
    return true;
  }

  // Parede / piso claro
  if (r > 198 && g > 193 && b > 168 && r - b < 50) {
    return true;
  }

  // Branco do piso
  if (r > 228 && g > 228 && b > 222) {
    return true;
  }

  // Preto
  if (r < 24 && g < 24 && b < 24) {
    return true;
  }

  // Poste metálico central (atrás da bike)
  const inPoleZone = nx > 0.42 && nx < 0.58 && ny > 0.05 && ny < 0.55;
  const isMetal = Math.abs(r - g) < 18 && Math.abs(g - b) < 18 && r > 150 && r < 235;
  if (inPoleZone && isMetal) return true;

  // Banner / parede esquerda — remove tudo exceto partes escuras da roda
  if (nx < 0.165) {
    const isDarkBike = r < 95 && g < 95 && b < 95;
    const isTerracottaPart = r > 115 && r > g + 8 && g > 55 && b < 120;
    const isSilver = isMetal;
    if (!isDarkBike && !isTerracottaPart && !isSilver) return true;
  }

  // Faixa de chão residual embaixo
  if (ny > 0.78 && r > 95 && g > 65 && b > 45 && r >= g - 8) return true;

  // Mesa / parede direita
  if (nx > 0.88 && r > 160 && g > 140 && b > 120) return true;

  // Faixa inferior residual
  if (ny > 0.88 && r > 120 && g > 100 && b > 80) return true;

  return false;
}

async function main() {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const total = width * height;
  const bg = new Uint8Array(total);
  const queue = [];

  function push(x, y) {
    if (x < 0 || x >= width || y < 0 || y >= height) return;
    const pi = y * width + x;
    if (bg[pi]) return;
    const i = pi * channels;
    if (!isStudioBackground(data[i], data[i + 1], data[i + 2], data[i + 3], x, y, width, height)) {
      return;
    }
    bg[pi] = 1;
    queue.push([x, y]);
  }

  for (let x = 0; x < width; x++) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    push(0, y);
    push(width - 1, y);
  }

  while (queue.length) {
    const [x, y] = queue.pop();
    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
  }

  // Pixels de estúdio cercados por fundo
  for (let pass = 0; pass < 2; pass++) {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const pi = y * width + x;
        if (bg[pi]) continue;
        const i = pi * channels;
        if (!isStudioBackground(data[i], data[i + 1], data[i + 2], data[i + 3], x, y, width, height)) {
          continue;
        }
        let bgNeighbors = 0;
        for (const [dx, dy] of [
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1],
        ]) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
          if (bg[ny * width + nx]) bgNeighbors++;
        }
        if (bgNeighbors >= 2) bg[pi] = 1;
      }
    }
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pi = y * width + x;
      const i = pi * channels;
      if (bg[pi]) {
        data[i + 3] = 0;
        continue;
      }
      let nearBg = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (!dx && !dy) continue;
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
          if (bg[ny * width + nx]) nearBg++;
        }
      }
      if (nearBg >= 4) data[i + 3] = Math.min(data[i + 3], 160);
      else if (nearBg >= 2) data[i + 3] = Math.min(data[i + 3], 210);
    }
  }

  // Pós-processamento: limpa borda inferior
  for (let y = Math.floor(height * 0.86); y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pi = y * width + x;
      const i = pi * channels;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const isFloor =
        (r > 90 && g > 60 && b > 40 && r >= g - 10) ||
        (r > 210 && g > 205 && b > 195);
      if (isFloor) {
        data[i + 3] = 0;
        bg[pi] = 1;
      }
    }
  }

  await sharp(data, { raw: { width, height, channels } }).png().toFile(output);

  // Recorta margens transparentes
  const trimmed = await sharp(output).trim().toBuffer();
  await sharp(trimmed).png().toFile(output);

  const meta = await sharp(output).metadata();
  console.log(`Saved ${output} (${meta.width}x${meta.height}, hasAlpha=${meta.hasAlpha})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
