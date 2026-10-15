import puppeteer from 'puppeteer-core';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--enable-unsafe-swiftshader'] });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', error => errors.push(String(error)));
const out = '.impeccable/review'; fs.mkdirSync(out, { recursive: true });
const report = { views: [], errors };
async function seek(value) {
  await page.evaluate(progress => {
    const section = document.querySelector('#aventura-em-movimento');
    const rect = section.getBoundingClientRect();
    const lead = innerWidth < 768 ? section.querySelector('.adventure-copy').offsetHeight + 32 : 0;
    const top = scrollY + rect.top + lead - innerHeight * .35 + progress * (rect.height - lead - innerHeight * .5);
    scrollTo({ top, behavior: 'instant' });
  }, value);
  await page.waitForFunction(progress => Math.abs(Number(document.querySelector('.adventure-stage canvas').dataset.progress) - progress) < .015, { timeout: 30000 }, value);
}
try {
  for (const [width, height] of [[1440, 1000], [390, 844]]) {
    await page.setViewport({ width, height });
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }]);
    await page.goto('http://localhost:3457/', { waitUntil: 'networkidle0' });
    await page.$eval('#aventura-em-movimento', el => el.scrollIntoView({ behavior: 'instant' }));
    await page.waitForFunction(() => document.querySelector('#aventura-em-movimento').dataset.scene === 'ready', { timeout: 30000 });
    const states = [];
    for (const progress of [.08, .5, .9, .2]) {
      await seek(progress);
      states.push(await page.$eval('.adventure-stage canvas', el => Number(el.dataset.progress)));
      if (progress !== .2) await page.screenshot({ path: `${out}/pendulum-${width}-${progress}.png` });
    }
    const metrics = await page.$eval('.adventure-stage canvas', el => ({ width: el.width, height: el.height, version: el.getContext('webgl2').getParameter(el.getContext('webgl2').VERSION), overflow: document.documentElement.scrollWidth > innerWidth }));
    assert.ok(metrics.width > 0 && metrics.height > 0 && metrics.version.includes('WebGL') && !metrics.overflow);
    report.views.push({ width, states, metrics });
  }
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.$eval('#aventura-em-movimento', el => el.scrollIntoView({ behavior: 'instant' }));
  await page.waitForFunction(() => document.querySelector('.adventure-stage canvas').dataset.progress === '0.640');
  await page.evaluate(() => scrollBy({ top: 150, behavior: 'instant' }));
  assert.equal(await page.$eval('.adventure-stage canvas', el => el.dataset.progress), '0.640');
  assert.equal(await page.$eval('#aventura-em-movimento', el => el.dataset.scene), 'ready');
  report.reducedMotionStatic = true;
  await page.$eval('.adventure-stage canvas', el => el.getContext('webgl2').getExtension('WEBGL_lose_context').loseContext());
  await page.waitForFunction(() => document.querySelector('#aventura-em-movimento').dataset.scene === 'fallback');
  await page.waitForFunction(() => document.querySelector('.adventure-poster img')?.complete && document.querySelector('.adventure-poster img')?.naturalWidth > 0);
  report.contextLossFallback = true;
  assert.deepEqual(errors, []);
  fs.writeFileSync(`${out}/pendulum-qa.json`, JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
} finally { await page.close(); await browser.close(); }
