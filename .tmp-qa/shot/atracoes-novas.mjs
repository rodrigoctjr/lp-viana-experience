import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--hide-scrollbars"],
});
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (err) => errors.push(String(err)));
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto("http://localhost:3456/#atracoes", { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForSelector("#atracoes h2");
await new Promise((r) => setTimeout(r, 800));

const names = await page.$$eval("#atracoes h3", (nodes) => nodes.map((n) => n.textContent.trim()));
console.log("CARDS", JSON.stringify(names));

const links = await page.evaluate(() => {
  const articles = [...document.querySelectorAll("#atracoes article")];
  return articles.map((article) => {
    const title = article.querySelector("h3")?.textContent.trim();
    const anchors = [...article.querySelectorAll("a")].map((a) => ({
      text: a.textContent.replace(/\s+/g, " ").trim(),
      href: a.href,
    }));
    return { title, anchors };
  });
});
console.log("LINKS", JSON.stringify(links.filter((item) =>
  ["Trilha", "Pêndulo", "Descida de caiaque", "Linear e Movimento", "Sítio Água Viva", "Viana Restaurante", "Parque Túnel da Alegria"].includes(item.title),
), null, 2));

await page.evaluate(() => {
  const btn = [...document.querySelectorAll("button")].find((b) => b.textContent.includes("Aventura"));
  btn?.click();
});
await new Promise((r) => setTimeout(r, 400));
const aventura = await page.$$eval("#atracoes h3", (nodes) => nodes.map((n) => n.textContent.trim()));
console.log("AVENTURA", JSON.stringify(aventura));

await page.screenshot({ path: "atracoes-aventura.png" });

await page.evaluate(() => {
  const btn = [...document.querySelectorAll("button")].find((b) => b.textContent.trim() === "Todas");
  btn?.click();
});
await new Promise((r) => setTimeout(r, 300));
const restaurante = await page.evaluateHandle(() =>
  [...document.querySelectorAll("#atracoes article")].find((a) => a.textContent.includes("Viana Restaurante")),
);
const box = await restaurante.asElement().boundingBox();
await page.evaluate((y) => window.scrollTo(0, y - 80), box.y + (await page.evaluate(() => window.scrollY)));
await new Promise((r) => setTimeout(r, 300));
await page.screenshot({ path: "atracoes-restaurante.png" });

const coupon = await page.evaluate(() => {
  const button = [...document.querySelectorAll("button")].find((b) => b.textContent.includes("VIANAEXPERIENCE"));
  return button ? button.textContent.trim() : null;
});
console.log("COUPON", coupon);
console.log("ERRORS", JSON.stringify(errors));
await browser.close();
