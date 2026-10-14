import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--hide-scrollbars"],
});

const page = await browser.newPage();
const errors = [];
page.on("pageerror", (err) => errors.push(String(err)));

async function open(width, height) {
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.goto("http://localhost:3456/#atracoes", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForSelector("#atracoes h2");
  await page.evaluate(async () => {
    const section = document.querySelector("#atracoes");
    section?.scrollIntoView();
    const imgs = [...document.querySelectorAll("#atracoes img")];
    for (const img of imgs) img.loading = "eager";
    await new Promise((resolve) => setTimeout(resolve, 1200));
  });
}

await open(1440, 900);
await page.screenshot({ path: "atracoes-desktop.png" });
const loaded = await page.evaluate(() =>
  [...document.querySelectorAll("#atracoes img")].map((img) => ({
    alt: img.alt,
    w: img.naturalWidth,
    h: img.naturalHeight,
    src: img.getAttribute("src"),
  })),
);
console.log("LOADED", JSON.stringify(loaded));
await page.evaluate(() => window.scrollBy(0, 900));
await new Promise((r) => setTimeout(r, 400));
await page.screenshot({ path: "atracoes-desktop-2.png" });

await open(390, 844);
await page.screenshot({ path: "atracoes-mobile.png" });

await open(1440, 900);
await page.evaluate(() => {
  const button = [...document.querySelectorAll("#atracoes button")].find(
    (el) => el.textContent?.trim() === "Gastronomia",
  );
  button?.click();
});
await new Promise((r) => setTimeout(r, 500));
await page.screenshot({ path: "atracoes-gastro.png" });

await page.evaluate(() => {
  const button = [...document.querySelectorAll("#atracoes button")].find(
    (el) => el.textContent?.trim() === "Natureza",
  );
  button?.click();
});
await new Promise((r) => setTimeout(r, 500));
await page.screenshot({ path: "atracoes-natureza.png" });

const report = await page.evaluate(() => {
  const root = document.querySelector("#atracoes");
  return {
    names: [...root.querySelectorAll("h3")].map((n) => n.textContent?.trim()),
    images: [...root.querySelectorAll("img")].map((img) => ({
      alt: img.alt,
      w: img.naturalWidth,
      h: img.naturalHeight,
    })),
    links: [...root.querySelectorAll("a")].map((a) => a.getAttribute("href")),
    pressed: [...root.querySelectorAll("button")].map((b) => ({
      label: b.textContent?.trim(),
      pressed: b.getAttribute("aria-pressed"),
    })),
  };
});

console.log(JSON.stringify({ report, errors }, null, 2));
await browser.close();
