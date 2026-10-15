import puppeteer from 'puppeteer-core';
const browser=await puppeteer.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage();
try {
 await page.goto('http://localhost:3457/',{waitUntil:'domcontentloaded',timeout:120000});
 await page.waitForFunction(()=>document.querySelector('.geographic-map')?.getAttribute('viewBox')==='858.4 630 8 10',{timeout:30000});
 const result=await page.evaluate(()=>{const parent=document.querySelector('.map-arrival');const child=parent.querySelector('g');const p=new DOMPoint(0,0);const expected=p.matrixTransform(parent.getScreenCTM());const actual=p.matrixTransform(child.getScreenCTM());return {expected:{x:expected.x,y:expected.y},actual:{x:actual.x,y:actual.y},distance:Math.hypot(actual.x-expected.x,actual.y-expected.y)}});
 console.log(JSON.stringify(result));if(result.distance>1)process.exitCode=1;
}finally{await page.close();await browser.close();}
