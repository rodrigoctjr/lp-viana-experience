import puppeteer from 'puppeteer-core';
const browser=await puppeteer.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage();
try {
 await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'no-preference'}]);
 await page.goto('http://localhost:3457/',{waitUntil:'domcontentloaded',timeout:120000});
 await page.waitForFunction(()=>document.querySelector('#top .nature-backdrop')?.dataset.active==='true');
 const sample=()=>page.$eval('#top .nature-bough-left',el=>({name:getComputedStyle(el).animationName,state:getComputedStyle(el).animationPlayState,time:Number(el.getAnimations()[0]?.currentTime??0)}));
 const first=await sample();await new Promise(r=>setTimeout(r,400));const second=await sample();
 await page.evaluate(()=>scrollTo({top:document.body.scrollHeight,behavior:'instant'}));
 await page.waitForFunction(()=>document.querySelector('#top .nature-backdrop')?.dataset.active==='false');
 const offscreen=await sample();await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);const reduced=await sample();
 console.log(JSON.stringify({first,second,offscreen,reduced}));
 if(first.state!=='running'||second.time<=first.time||offscreen.state!=='paused'||reduced.name!=='none')process.exitCode=1;
}finally{await page.close();await browser.close();}
