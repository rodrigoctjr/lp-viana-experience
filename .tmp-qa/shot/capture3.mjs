import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--hide-scrollbars"],
});

async function shot(page, name, hash) {
  await page.goto(`http://localhost:3456/${hash}`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1800));
  await page.screenshot({ path: name });
}

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

await shot(page, "hero-live.png", "#top");

const checks = await page.evaluate(() => ({
  preview: document.body.innerText.includes("O melhor de Viana"),
  quiz: !!document.querySelector("#quiz"),
  dia: !!document.querySelector("#dia-d"),
}));
console.log("presence", JSON.stringify(checks));

await shot(page, "dia-d.png", "#dia-d");
await shot(page, "quiz.png", "#quiz");

const layout = await page.evaluate(() => {
  const quiz = document.querySelector("#quiz");
  const totem = quiz?.querySelector(".border-4");
  const cta = [...quiz.querySelectorAll("button, a")].find((el) =>
    el.textContent?.includes("Entrar na rota"),
  );
  const totemBox = totem?.getBoundingClientRect();
  const ctaBox = cta?.getBoundingClientRect();
  const quizBox = quiz.getBoundingClientRect();
  return {
    quizWidth: Math.round(quizBox.width),
    totem: totemBox && {
      left: Math.round(totemBox.left),
      width: Math.round(totemBox.width),
      center: Math.round(totemBox.left + totemBox.width / 2),
    },
    cta: ctaBox && {
      top: Math.round(ctaBox.top),
      left: Math.round(ctaBox.left),
      width: Math.round(ctaBox.width),
    },
    overlap: totemBox && ctaBox ? ctaBox.top < totemBox.bottom - 8 : null,
    viewportCenter: Math.round(window.innerWidth / 2),
  };
});
console.log("quiz layout", JSON.stringify(layout));

const cards = await page.evaluate(() => {
  const stage = document.querySelector("#dia-d .grid");
  if (!stage) return { missing: true };
  const articles = [...stage.querySelectorAll("article")];
  return {
    count: articles.length,
    titles: articles.map((el) => el.querySelector("h3")?.textContent),
    clipped: articles.some((el) => {
      const box = el.getBoundingClientRect();
      const parent = stage.getBoundingClientRect();
      return box.right > parent.right + 2 || box.left < parent.left - 2;
    }),
  };
});
console.log("dia cards", JSON.stringify(cards));

await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
await shot(page, "hero-mobile-live.png", "#top");
await shot(page, "dia-d-mobile.png", "#dia-d");
await shot(page, "quiz-mobile.png", "#quiz");

const mobile = await page.evaluate(() => {
  const quiz = document.querySelector("#quiz");
  const totem = quiz?.querySelector(".border-4");
  const cta = [...quiz.querySelectorAll("button, a")].find((el) =>
    el.textContent?.includes("Entrar na rota"),
  );
  const totemBox = totem?.getBoundingClientRect();
  const ctaBox = cta?.getBoundingClientRect();
  return {
    totemLeft: totemBox && Math.round(totemBox.left),
    totemWidth: totemBox && Math.round(totemBox.width),
    overlap: totemBox && ctaBox ? ctaBox.top < totemBox.bottom - 8 : null,
    vw: window.innerWidth,
  };
});
console.log("quiz mobile", JSON.stringify(mobile));

await browser.close();
