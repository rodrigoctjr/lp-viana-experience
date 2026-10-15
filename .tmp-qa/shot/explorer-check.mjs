import puppeteer from 'puppeteer-core';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const out = '.impeccable/review';
fs.mkdirSync(out, { recursive: true });
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', error => errors.push(String(error)));
const titles = ['Histórias que permanecem', 'Natureza para aproveitar', 'Sabores para descobrir'];
const heading = () => page.$eval('#destination-explorer-heading', el => el.textContent);
const waitTitle = title => page.waitForFunction(value => document.querySelector('#destination-explorer-heading')?.textContent === value, {}, title);
async function open(selector, index = 0) {
  const element = (await page.$$(selector))[index];
  assert.ok(element, selector);
  await element.click();
  await page.waitForSelector('.destination-explorer-dialog');
  await page.waitForFunction(() => document.querySelector('.destination-explorer-photo img')?.complete && document.querySelector('.destination-explorer-photo img')?.naturalWidth > 0);
  assert.equal(await page.evaluate(() => document.body.style.overflow), 'hidden');
  return element;
}
async function close() {
  await page.keyboard.press('Escape');
  await page.waitForSelector('.destination-explorer-dialog', { hidden: true });
  assert.equal(await page.evaluate(() => document.body.style.overflow), '');
}
try {
  await page.setViewport({ width: 1440, height: 1000 });
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.goto('http://localhost:3457/', { waitUntil: 'networkidle0' });
  const url = page.url();
  const trigger = await open('#conheca-viana .destination-explore-cta');
  const position = await page.evaluate(() => scrollY);
  assert.equal(await heading(), titles[0]);
  await page.keyboard.down('Shift'); await page.keyboard.press('Tab'); await page.keyboard.up('Shift');
  assert.equal(await page.evaluate(() => document.activeElement.classList.contains('destination-explorer-next')), true);
  await page.keyboard.press('Tab');
  assert.equal(await page.evaluate(() => document.activeElement.getAttribute('aria-label')), 'Fechar');
  await page.screenshot({ path: `${out}/explorer-desktop.png` });
  await page.click('.destination-explorer-next'); await waitTitle(titles[1]);
  await page.click('.destination-explorer-next'); await waitTitle(titles[2]);
  await page.keyboard.press('ArrowLeft'); await waitTitle(titles[1]);
  await page.click('.destination-explorer-position button'); await waitTitle(titles[0]);
  await page.click('.destination-explorer-details summary');
  assert.equal(await page.$eval('.destination-explorer-details', el => el.open), true);
  assert.equal(await page.$$eval('.destination-explorer-details section > p', els => els.length), 9);
  await page.$eval('.destination-explorer-content', el => { el.scrollTop = el.scrollHeight; });
  assert.equal(await page.$eval('.destination-explorer-controls', el => { const box = el.getBoundingClientRect(); return box.top >= 0 && box.bottom <= innerHeight; }), true);
  await page.click('.destination-explorer-next'); await waitTitle(titles[1]);
  assert.equal(await page.$eval('.destination-explorer-content', el => el.scrollTop), 0);
  await close();
  assert.equal(await trigger.evaluate(el => document.activeElement === el), true);
  assert.ok(Math.abs(await page.evaluate(() => scrollY) - position) < 2);
  assert.equal(page.url(), url);
  const entries = [];
  for (const selector of ['.destination-intro-link', '.pillar-photo', '.pillar-history-link']) {
    for (let i = 0; i < 3; i++) {
      const element = await open(selector, i);
      assert.equal(await heading(), titles[i]);
      await close();
      assert.equal(await element.evaluate(el => document.activeElement === el), true);
      assert.equal(page.url(), url);
      entries.push(`${selector}:${i}`);
    }
  }
  await open('#pillars .destination-explore-cta');
  assert.equal(await heading(), titles[0]);
  await page.mouse.click(4, 4);
  await page.waitForSelector('.destination-explorer-dialog', { hidden: true });
  assert.equal(await page.evaluate(() => document.body.style.overflow), '');
  await page.setViewport({ width: 375, height: 667, isMobile: true, hasTouch: true });
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }]);
  await page.goto(url, { waitUntil: 'networkidle0' });
  await open('#conheca-viana .destination-explore-cta');
  const session = await page.createCDPSession();
  const image = await page.$eval('.destination-explorer-photo > div', el => { const r = el.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; });
  const y = image.y + image.height / 2;
  await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: image.x + image.width * .8, y }] });
  for (const ratio of [.65, .5, .35, .2]) await session.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: image.x + image.width * ratio, y }] });
  await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await waitTitle(titles[1]);
  await page.waitForFunction(() => document.querySelector('.destination-explorer-photo img').complete && document.querySelector('.destination-explorer-photo img').naturalWidth > 0);
  const mobile = await page.$eval('.destination-explorer-dialog', el => { const r = el.getBoundingClientRect(); return { x: r.x, right: r.right, y: r.y, bottom: r.bottom, width: innerWidth, height: innerHeight, overflow: el.scrollWidth > el.clientWidth }; });
  assert.ok(mobile.x >= 0 && mobile.right <= mobile.width && mobile.y >= 0 && mobile.bottom <= mobile.height && !mobile.overflow);
  await page.screenshot({ path: `${out}/explorer-mobile.png` });
  await close();
  assert.equal(page.url(), url);
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
  assert.deepEqual(errors, []);
  const report = { entries, ctas: 2, keyboard: true, focusRestored: true, historyExpanded: true, fixedControls: true, scrollReset: true, overlayClose: true, touchSwipe: true, sameUrl: true, mobile, errors };
  fs.writeFileSync(`${out}/explorer-qa.json`, JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
} finally { await page.close(); await browser.close(); }
