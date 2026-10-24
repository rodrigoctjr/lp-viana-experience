import puppeteer from 'puppeteer-core';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const browser=await puppeteer.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage(),errors=[],modelRequests=[];
page.on('pageerror',error=>errors.push(String(error)));
page.on('request',request=>{if(request.url().includes('/models/'))modelRequests.push(request.url())});
const out='.impeccable/review';fs.mkdirSync(out,{recursive:true});
const report={views:[],errors,modelRequests};
async function seek(episode,progress){
  await page.evaluate(({episode,progress})=>{
    const starts=['pillars','dia-d','atracoes'].map(id=>document.getElementById(id).getBoundingClientRect().top+scrollY-innerHeight*.6);
    const duration=Math.max(1,Math.min(innerHeight*1.6,(starts[episode+1]??Infinity)-starts[episode]-innerHeight*.12));
    scrollTo({top:starts[episode]+duration*progress,behavior:'instant'});
  },{episode,progress});
  await page.waitForFunction(({episode,progress})=>{
    const el=document.querySelector('.journey-motion');return Number(el.dataset.episode)===episode&&Math.abs(Number(el.dataset.progress)-progress)<.015&&el.dataset.active==='true';
  },{timeout:10000},{episode,progress}).catch(async error=>{
    console.log(JSON.stringify(await page.evaluate(()=>({width:innerWidth,height:innerHeight,y:scrollY,root:{...document.querySelector('.journey-motion').dataset},starts:['pillars','dia-d','atracoes'].map(id=>document.getElementById(id).getBoundingClientRect().top+scrollY-innerHeight*.6)}))));
    throw error;
  });
}
try{
  for(const [width,height] of [[1440,1000],[390,844],[320,568]]){
    await page.setViewport({width,height});
    await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'no-preference'}]);
    await page.goto('http://localhost:3457/',{waitUntil:'networkidle0'});
    assert.equal(await page.$('.adventure-overlay'),null);assert.equal(await page.$('#aventura-em-movimento'),null);
    const states=[];
    for(const episode of [0,1,2]){
      await seek(episode,.5);
      const state=await page.$eval('.journey-motion',el=>({episode:el.dataset.episode,progress:el.dataset.progress,opacity:el.style.opacity,route:el.querySelector('.journey-line').getAttribute('d'),marker:el.querySelector('.journey-marker').getAttribute('transform')}));
      states.push(state);await page.screenshot({path:`${out}/journey-${width}-${episode}.png`});
    }
    assert.equal(new Set(states.map(s=>s.route)).size,3);
    await seek(0,.2);const earlier=await page.$eval('.journey-line',el=>Number(el.style.strokeDashoffset));
    await seek(0,.8);const later=await page.$eval('.journey-line',el=>Number(el.style.strokeDashoffset));assert.ok(later<earlier);
    await seek(0,.2);assert.ok(Math.abs((await page.$eval('.journey-line',el=>Number(el.style.strokeDashoffset)))-earlier)<3);
    const heroStyle=await page.$eval('#top',el=>{
      const previous=el.getAttribute('style');el.style.setProperty('min-height',`${el.getBoundingClientRect().height+120}px`,'important');return previous;
    });
    await seek(1,.5);
    await page.$eval('#top',(el,previous)=>{if(previous===null)el.removeAttribute('style');else el.setAttribute('style',previous)},heroStyle);
    await seek(0,.5);
    const metrics=await page.$eval('.journey-motion',el=>({fixed:getComputedStyle(el).position,pointerEvents:getComputedStyle(el).pointerEvents,overflow:document.documentElement.scrollWidth>innerWidth}));
    assert.equal(metrics.fixed,'fixed');assert.equal(metrics.pointerEvents,'none');assert.equal(metrics.overflow,false);
    await page.click('.destination-explore-cta');await page.waitForSelector('[role="dialog"]',{visible:true});
    assert.ok(await page.$eval('[role="dialog"]',el=>{const r=el.getBoundingClientRect();return el.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2))}));
    await page.keyboard.press('Escape');
    await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
    await page.waitForFunction(()=>getComputedStyle(document.querySelector('.journey-motion')).display==='none');
    await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'no-preference'}]);await seek(1,.5);
    await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForFunction(()=>document.querySelector('.journey-motion').dataset.active==='false');
    report.views.push({width,states,metrics,reversesWithScroll:true,upstreamLayoutChange:true,modalAbove:true,liveReducedMotion:true,hiddenInHero:true});
  }
  assert.deepEqual(modelRequests,[]);assert.deepEqual(errors,[]);
  fs.writeFileSync(`${out}/journey-qa.json`,JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}finally{await browser.close()}
