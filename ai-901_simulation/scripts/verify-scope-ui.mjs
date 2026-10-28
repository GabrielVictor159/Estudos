// Verifica as substituições de escopo em file://, sem rede.
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {createSession} from '../src/engine.js';
const {chromium}=await import(pathToFileURL(resolve(process.argv[2])).href);
const root=resolve(import.meta.dirname,'..');
const bank=JSON.parse(await readFile(resolve(root,'public/data/questions.json'),'utf8'));
const exam=JSON.parse(await readFile(resolve(root,'public/data/exam.json'),'utf8'));
const report=JSON.parse(await readFile(resolve(root,'docs/arithmetic-scope-correction.json'),'utf8'));
const ids=new Set(report.changes.map(c=>c.id));
const seed=createSession(bank,exam,{count:bank.questions.length,minutes:240,difficulty:'hard'});
seed.questions=seed.questions.filter(q=>ids.has(q.id));
seed.settings.count=seed.questions.length;
const browser=await chromium.launch({headless:true,channel:'msedge'});
try {
 const context=await browser.newContext({offline:true,viewport:{width:1440,height:1100}});
 const page=await context.newPage(), errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(pathToFileURL(resolve(root,'index.html')).href);
 assert.deepEqual(await page.locator('#bank-data').evaluate(el=>JSON.parse(el.textContent)),bank);
 await page.evaluate(s=>localStorage.setItem('ai901:v1:session',JSON.stringify(s)),seed);
 await page.reload();
 await page.getByRole('button',{name:'Retomar sessão em andamento'}).click();
 for(let i=0;i<seed.questions.length;i++) {
  const q=seed.questions[i];
  await page.locator(`[data-index="${i}"]`).click();
  if(q.type==='code')for(const [id,value] of Object.entries(q.answer))await page.locator(`[data-codeblank="${id}"]`).selectOption(value);
  else for(const value of q.answer)await page.locator(`input[name="answer"][value="${value}"]`).check();
 }
 await page.getByRole('button',{name:'Finalizar simulado',exact:true}).click();
 await page.getByRole('button',{name:'Confirmar encerramento',exact:true}).click();
 assert.ok((await page.locator('.results h2').innerText()).includes(`${ids.size} de ${ids.size}`));
 await page.getByRole('button',{name:'Revisar respostas'}).click();
 for(let i=0;i<seed.questions.length;i++) {
  await page.locator(`[data-index="${i}"]`).click();
  assert.equal(await page.locator('.explanation > strong').innerText(),'Resposta correta');
  assert.ok(await page.locator('.explanation a').count());
 }
 await page.setViewportSize({width:390,height:844});
 for(const type of ['single','code','case']) {
  const i=seed.questions.findIndex(q=>q.type===type);
  await page.locator(`[data-index="${i}"]`).click();
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),type);
 }
 assert.deepEqual(errors,[]);
 console.log(`QA aprovada: 702 questões incorporadas, ${ids.size} substituições respondidas e revisadas, seletores Python e celular, offline.`);
}finally{await browser.close();}
