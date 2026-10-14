import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--hide-scrollbars"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto("http://localhost:3456/", { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForSelector("#top img");
await new Promise((r) => setTimeout(r, 1500));
await page.screenshot({ path: "hero.png" });

const missing = await page.evaluate(() => ({
  stats: document.body.innerText.includes("Rotas turísticas"),
  map: document.body.innerText.includes("Duas rotas. Uma cidade."),
  date: document.body.innerText.includes("07.11"),
  postcard: !!document.querySelector('img[alt*="Estação ferroviária"]'),
}));
console.log("checks", JSON.stringify(missing));

await page.evaluate(() => {
  const button = [...document.querySelectorAll("button")].find((el) =>
    el.textContent?.includes("Ver os três mundos"),
  );
  button?.click();
});
await new Promise((r) => setTimeout(r, 900));
const pillarsTop = await page.evaluate(() => {
  const el = document.querySelector("#pillars");
  const rect = el.getBoundingClientRect();
  return { top: Math.round(rect.top), title: el.querySelector("h2")?.textContent };
});
console.log("after cta", JSON.stringify(pillarsTop));
await page.screenshot({ path: "pillars.png" });

await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
await page.goto("http://localhost:3456/", { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForSelector("#top img");
await new Promise((r) => setTimeout(r, 800));
await page.screenshot({ path: "hero-mobile.png" });

await browser.close();
