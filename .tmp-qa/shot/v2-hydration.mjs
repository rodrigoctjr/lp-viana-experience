import puppeteer from 'puppeteer-core';
const browser=await puppeteer.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage();await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:process.argv.includes('--reduced')?'reduce':'no-preference'}]);const errors=[];page.on('pageerror',e=>errors.push(String(e)));
await page.setJavaScriptEnabled(false);await page.goto('http://localhost:3457/',{waitUntil:'domcontentloaded'});const server=await page.$eval('#quiz h3',el=>el.textContent);
await page.setJavaScriptEnabled(true);await page.goto('http://localhost:3457/',{waitUntil:'domcontentloaded',timeout:120000});await new Promise(r=>setTimeout(r,5000));const client=await page.$eval('#quiz h3',el=>el.textContent);
console.log(JSON.stringify({server,client,errors},null,2));await browser.close();if(errors.some(e=>e.includes('418')||e.includes('hydration'))) process.exitCode=1;
