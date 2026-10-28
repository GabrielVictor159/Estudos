// QA offline da adição 503–702; não gera nem modifica questões.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createSession } from '../src/engine.js';
const {chromium}=await import(pathToFileURL(resolve(process.argv[2])).href);
const root=resolve(import.meta.dirname,'..');
const bank=JSON.parse(await readFile(resolve(root,'public/data/questions.json'),'utf8'));
const exam=JSON.parse(await readFile(resolve(root,'public/data/exam.json'),'utf8'));
const batch={...bank,questions:bank.questions.filter(q=>Number(q.id.slice(6))>=503&&Number(q.id.slice(6))<=702)};
assert.equal(batch.questions.length,200);
const seed=createSession(batch,exam,{count:200,minutes:240,difficulty:'hard'});
const browser=await chromium.launch({headless:true,channel:'msedge'});
try {
  const context=await browser.newContext({viewport:{width:1440,height:1100},offline:true});
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(pathToFileURL(resolve(root,'index.html')).href);
  assert.deepEqual(await page.locator('#bank-data').evaluate(el=>JSON.parse(el.textContent)),bank);
  assert.equal(await page.locator('.stats article').first().locator('strong').innerText(),`${bank.questions.length} disponíveis`);
  assert.equal(await page.locator('input[type=file], [data-view=bank]').count(),0);
  await page.evaluate(s=>localStorage.setItem('ai901:v1:session',JSON.stringify(s)),seed);
  await page.reload();await page.getByRole('button',{name:'Retomar sessão em andamento'}).click();
  const seen=new Set();
  for(let i=0;i<seed.questions.length;i++) {
    const q=seed.questions[i];seen.add(q.type);await page.locator(`[data-index="${i}"]`).click();
    if(q.type==='code')for(const [id,value] of Object.entries(q.answer))await page.locator(`[data-codeblank="${id}"]`).selectOption(value);
    else if(q.type==='matching')for(const [id,value] of Object.entries(q.answer))await page.locator(`[data-match="${id}"]`).selectOption(value);
    else for(const value of q.answer)await page.locator(`input[name="answer"][value="${value}"]`).check();
    if(q.type==='case')assert.ok(await page.locator('.case-context').count(),q.id);
    if((i+1)%50===0)console.log(`${i+1}/200 novas questões respondidas no navegador.`);
  }
  assert.equal(seen.size,5);
  await page.reload();await page.getByRole('button',{name:'Retomar sessão em andamento'}).click();
  assert.match(await page.locator('.page-heading p').innerText(),/200 de 200 respondidas/);
  await page.getByRole('button',{name:'Finalizar simulado',exact:true}).click();
  await page.getByRole('button',{name:'Confirmar encerramento',exact:true}).click();
  assert.match(await page.locator('.results h2').innerText(),/200 de 200/);
  await page.getByRole('button',{name:'Revisar respostas'}).click();
  for(let i=0;i<200;i++) {
    await page.locator(`[data-index="${i}"]`).click();
    assert.equal(await page.locator('.explanation > strong').innerText(),'Resposta correta');
    assert.ok(await page.locator('.explanation a').count());
  }
  await page.setViewportSize({width:390,height:844});
  for(const type of seen) {
    const i=seed.questions.findIndex(q=>q.type===type);await page.locator(`[data-index="${i}"]`).click();
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),type);
  }
  assert.deepEqual(errors,[]);
  console.log('QA aprovada: banco de 702 embutido; 200 novas questões, 5 formatos, respostas, retomada, correção, fontes e celular em file:// offline.');
}finally{await browser.close();}
