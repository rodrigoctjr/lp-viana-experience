import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
const out = '.impeccable/review';
fs.mkdirSync(out,{recursive:true});
const browser = await puppeteer.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--hide-scrollbars']});
const page = await browser.newPage();
const errors=[];
page.on('pageerror',err=>errors.push(String(err)));
const delay = ms=>new Promise(r=>setTimeout(r,ms));
const report={errors,consoleErrors:[]};
page.on('console',msg=>{if(msg.type()==='error') report.consoleErrors.push(msg.text())});
async function clickText(selector,text){for(const el of await page.$$(selector)){if((await el.evaluate(e=>e.textContent.trim())).includes(text)){await el.click();return;}}throw new Error('Button missing: '+text);}
async function load(width,height,reduced=false){
 await page.setViewport({width,height,deviceScaleFactor:1});
 await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:reduced?'reduce':'no-preference'}]);
 await page.goto('http://localhost:3457/',{waitUntil:'networkidle0',timeout:120000});
 await page.waitForSelector('.geographic-map');
 await page.evaluate(()=>document.fonts.ready);
}
async function inspect(name){
 await delay(5000);
 report[name]=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,viewBox:document.querySelector('.geographic-map').getAttribute('viewBox'),arrival:getComputedStyle(document.querySelector('.map-arrival')).opacity,date:document.querySelector('.destination-date').innerText,images:[...document.querySelectorAll('#top img')].map(i=>({src:i.getAttribute('src'),loaded:i.complete&&i.naturalWidth>0}))}));
 await page.screenshot({path:`${out}/${name}-hero.png`});
 for(let y=0;y<await page.evaluate(()=>document.body.scrollHeight);y+=650){await page.evaluate(top=>scrollTo({top,behavior:'instant'}),y);await delay(120);}
 await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await delay(300);
 await page.screenshot({path:`${out}/${name}.png`,fullPage:true});
}
await load(1440,1000);await inspect('desktop');
await page.click('.map-caption button');await delay(700);
report.replayStart=await page.$eval('.geographic-map',el=>el.getAttribute('viewBox'));
await page.screenshot({path:`${out}/map-brazil.png`});await delay(4500);
report.replayEnd=await page.$eval('.geographic-map',el=>el.getAttribute('viewBox'));
await page.$eval('#atracoes',el=>el.scrollIntoView({behavior:'instant'}));await delay(800);
report.attractionsTotal=await page.$$eval('#atracoes article h3',els=>els.map(el=>el.textContent));
await clickText('#atracoes button','Aventura');await delay(1000);
report.adventure=await page.$$eval('#atracoes article h3',els=>els.map(el=>el.textContent));
await page.screenshot({path:`${out}/attractions.png`});
await page.$eval('#quiz',el=>el.scrollIntoView({behavior:'instant'}));await delay(1000);
report.quizBefore=await page.$eval('#quiz h3',el=>el.textContent);
await page.click('#quiz [aria-label="Opções de resposta"] button');await delay(500);
report.quizRevealed=await page.$eval('#quiz [role=status]',el=>el.textContent);
await clickText('#quiz button','Próxima pergunta');await delay(800);
report.quizAfter=await page.$eval('#quiz h3',el=>el.textContent);
await page.screenshot({path:`${out}/quiz.png`});
await page.$eval('#jogo',el=>el.scrollIntoView({behavior:'instant'}));await delay(1000);
report.gameBefore=await page.$eval('#jogo canvas',el=>({width:el.width,height:el.height}));await page.click('#jogo canvas');await delay(1000);
report.gameAfter=await page.$eval('#jogo',el=>el.innerText);await page.screenshot({path:`${out}/game.png`});
await load(390,844);await inspect('mobile');
await page.click('.atlas-menu-toggle');report.menuOpen=await page.$eval('.atlas-menu-toggle',el=>el.getAttribute('aria-expanded'));
await page.click('#atlas-mobile-nav a[href="#quiz"]');await page.waitForFunction(()=>Math.abs(document.querySelector('#quiz').getBoundingClientRect().top)<120,{timeout:10000});report.menuClosed=await page.$eval('.atlas-menu-toggle',el=>el.getAttribute('aria-expanded'));
report.navQuiz=await page.evaluate(()=>Math.abs(document.querySelector('#quiz').getBoundingClientRect().top)<120);
await load(390,844,true);await delay(200);
report.reduced=await page.evaluate(()=>({viewBox:document.querySelector('.geographic-map').getAttribute('viewBox'),arrival:getComputedStyle(document.querySelector('.map-arrival')).opacity}));await page.screenshot({path:`${out}/reduced.png`});
fs.writeFileSync(`${out}/qa.json`,JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));await browser.close();
const checks=[errors.length===0,report.desktop.scrollWidth===1440,report.mobile.scrollWidth===390,report.replayEnd==='746 473 230 285',report.replayStart!==report.replayEnd,report.attractionsTotal.length===14,report.adventure.length>0,report.quizBefore!==report.quizAfter,report.quizRevealed.length>0,report.gameBefore.width>0,report.gameAfter.includes('PONTOS:')&&report.gameAfter.includes('= PULAR'),report.menuOpen==='true',report.menuClosed==='false',report.navQuiz,report.reduced.viewBox==='746 473 230 285',report.reduced.arrival==='1'];
if(checks.some(ok=>!ok)){console.error('FAILED CHECKS',checks);process.exitCode=1;}else console.log('All interaction checks passed.');
