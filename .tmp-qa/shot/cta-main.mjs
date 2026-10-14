import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--hide-scrollbars"],
});

const page = await browser.newPage();

async function shot(width, height, name) {
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.goto("http://localhost:3456/", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForSelector("a.hero-cta-featured");
  await new Promise((r) => setTimeout(r, 800));
  const box = await page.evaluate(() => {
    const link = document.querySelector("a.hero-cta-featured");
    const rect = link.getBoundingClientRect();
    return {
      text: link.textContent.replace(/\s+/g, " ").trim(),
      href: link.href,
      target: link.target,
      top: Math.round(rect.top),
      bottom: Math.round(rect.bottom),
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      bg: getComputedStyle(link).backgroundColor,
      color: getComputedStyle(link).color,
      vh: window.innerHeight,
    };
  });
  console.log(name, JSON.stringify(box));
  await page.screenshot({ path: `${name}.png` });
}

await shot(1440, 900, "cta-desktop");
await shot(390, 844, "cta-mobile");
await browser.close();
