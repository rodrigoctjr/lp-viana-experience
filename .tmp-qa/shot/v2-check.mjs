import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
const out = '.impeccable/review';
fs.mkdirSync(out, { recursive: true });
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--hide-scrollbars'] });
const page = await browser.newPage();
const report = { errors: [], consoleErrors: [] };
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
page.on('pageerror', error => report.errors.push(String(error)));
page.on('console', message => { if (message.type() === 'error') report.consoleErrors.push(message.text()); });
async function clickText(selector, text) {
  for (const element of await page.$$(selector)) {
    if ((await element.evaluate(el => el.textContent.trim())).includes(text)) { await element.click(); return; }
  }
  throw new Error('Button missing: ' + text);
}
async function load(width, height, reduced = false) {
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: reduced ? 'reduce' : 'no-preference' }]);
  await page.goto('http://localhost:3457/', { waitUntil: 'networkidle0', timeout: 120000 });
  await page.waitForSelector('.destination-hero');
  await page.evaluate(() => document.fonts.ready);
}
async function settled() {
  await page.waitForFunction(() => document.querySelector('#top')?.dataset.phase === 'centered', { timeout: 20000 });
  await delay(1100);
}
async function measure() {
  return page.evaluate(() => {
    const center = selector => { const box = document.querySelector(selector).getBoundingClientRect(); return box.x + box.width / 2; };
    return {
      width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
      phase: document.querySelector('#top').dataset.phase,
      mapRemoved: !document.querySelector('.destination-map-stage'),
      logoCenter: center('.destination-logo'), headingCenter: center('.destination-copy h2'), dateCenter: center('.destination-date'),
      date: document.querySelector('.destination-date').innerText,
      images: [...document.querySelectorAll('#top img')].map(img => ({ src: img.getAttribute('src'), loaded: img.complete && img.naturalWidth > 0 }))
    };
  });
}
async function inspect(name) {
  if (await page.$('.destination-map-stage')) await page.screenshot({ path: `${out}/${name}-opening.png` });
  await settled(); report[name] = await measure();
  await page.screenshot({ path: `${out}/${name}-hero.png` });
  if (name !== 'desktop') await (await page.$('.destination-copy')).screenshot({ path: `${out}/${name}-copy.png` });
  for (let y = 0; y < await page.evaluate(() => document.body.scrollHeight); y += 650) {
    await page.evaluate(top => scrollTo({ top, behavior: 'instant' }), y); await delay(120);
  }
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' })); await delay(300);
  await page.screenshot({ path: `${out}/${name}.png`, fullPage: true });
}
try {
  await load(1440, 1000); await inspect('desktop');
  await page.evaluate(() => {
    window.__heroPhases = [{ phase: document.querySelector('#top').dataset.phase, time: performance.now() }];
    new MutationObserver(() => window.__heroPhases.push({ phase: document.querySelector('#top').dataset.phase, time: performance.now() })).observe(document.querySelector('#top'), { attributes: true, attributeFilter: ['data-phase'] });
  });
  await page.click('.hero-replay'); await page.waitForSelector('.geographic-map'); await delay(500);
  report.replayStart = await page.$eval('.geographic-map', el => el.getAttribute('viewBox'));
  await page.screenshot({ path: `${out}/map-opening-desktop.png` });
  await page.waitForFunction(() => { const width = Number(document.querySelector('.geographic-map')?.getAttribute('viewBox')?.split(' ')[2]); return width < 120 && width >= 8; }, { timeout: 10000 });
  report.regionalView = await page.$eval('.geographic-map', el => el.getAttribute('viewBox'));
  report.markerOffset = await page.evaluate(() => {
    const origin = new DOMPoint(0, 0);
    const a = origin.matrixTransform(document.querySelector('.map-arrival').getScreenCTM());
    const b = origin.matrixTransform(document.querySelector('.map-marker').getScreenCTM());
    return Math.hypot(a.x - b.x, a.y - b.y);
  });
  await page.screenshot({ path: `${out}/map-state.png` });
  await page.waitForFunction(() => document.querySelector('.geographic-map')?.getAttribute('viewBox') === '858.4 630 8 10', { timeout: 10000 });
  report.finalPinOpacity = await page.$eval('.map-arrival', el => getComputedStyle(el).opacity);
  await page.screenshot({ path: `${out}/map-final.png` });
  await settled();
  report.phases = await page.evaluate(() => window.__heroPhases);
  report.replayEnd = await measure();
  await page.$eval('#atracoes', el => el.scrollIntoView({ behavior: 'instant' })); await delay(800);
  report.attractionsTotal = await page.$$eval('#atracoes article h3', els => els.map(el => el.textContent));
  await clickText('#atracoes button', 'Aventura'); await delay(800);
  report.adventure = await page.$$eval('#atracoes article h3', els => els.map(el => el.textContent));
  await page.screenshot({ path: `${out}/attractions.png` });
  await page.$eval('#quiz', el => el.scrollIntoView({ behavior: 'instant' })); await delay(800);
  report.quizBefore = await page.$eval('#quiz h3', el => el.textContent);
  await page.click('#quiz [aria-label="Opções de resposta"] button'); await delay(500);
  report.quizRevealed = await page.$eval('#quiz [role=status]', el => el.textContent);
  await clickText('#quiz button', 'Próxima pergunta'); await delay(800);
  report.quizAfter = await page.$eval('#quiz h3', el => el.textContent);
  await page.screenshot({ path: `${out}/quiz.png` });
  await page.$eval('#jogo', el => el.scrollIntoView({ behavior: 'instant' })); await delay(800);
  await page.click('#jogo canvas'); await delay(800);
  report.gameAfter = await page.$eval('#jogo', el => el.innerText);
  await page.screenshot({ path: `${out}/game.png` });
  await load(390, 844); await inspect('mobile');
  await page.click('.atlas-menu-toggle'); report.menuOpen = await page.$eval('.atlas-menu-toggle', el => el.getAttribute('aria-expanded'));
  await page.click('#atlas-mobile-nav a[href="#quiz"]');
  await page.waitForFunction(() => Math.abs(document.querySelector('#quiz').getBoundingClientRect().top) < 120, { timeout: 10000 });
  report.menuClosed = await page.$eval('.atlas-menu-toggle', el => el.getAttribute('aria-expanded'));
  await load(698, 900); await inspect('user-698');
  await load(390, 844, true); await settled(); report.reduced = await measure();
  await page.screenshot({ path: `${out}/reduced.png` });
  const centered = q => Math.abs(q.logoCenter - q.width / 2) < 1 && Math.abs(q.headingCenter - q.width / 2) < 1 && Math.abs(q.dateCenter - q.width / 2) < 1;
  const checks = [
    report.errors.length === 0, report.consoleErrors.length === 0,
    ...['desktop', 'mobile', 'user-698', 'reduced', 'replayEnd'].map(name => centered(report[name]) && report[name].mapRemoved && report[name].scrollWidth === report[name].width),
    report.phases.some(p => p.phase === 'mapping'), report.phases.some(p => p.phase === 'fading'), report.phases.at(-1).phase === 'centered',
    report.markerOffset < 1, report.finalPinOpacity === '1', Number(report.regionalView.split(' ')[2]) <= 120,
    report.phases.find(p => p.phase === 'fading').time - report.phases.find(p => p.phase === 'mapping').time >= 1800,
    report.phases.find(p => p.phase === 'fading').time - report.phases.find(p => p.phase === 'mapping').time < 2400,
    report.attractionsTotal.length === 14, report.adventure.length === 4,
    report.quizBefore !== report.quizAfter, report.quizRevealed.length > 0, report.gameAfter.includes('PONTOS:') && report.gameAfter.includes('= PULAR'), report.menuOpen === 'true', report.menuClosed === 'false'
  ];
  fs.writeFileSync(`${out}/qa.json`, JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  if (checks.some(ok => !ok)) { console.error('FAILED CHECKS', checks); process.exitCode = 1; } else console.log('All interaction checks passed.');
} finally { await page.close(); await browser.close(); }
