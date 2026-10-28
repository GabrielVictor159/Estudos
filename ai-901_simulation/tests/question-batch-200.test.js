import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { beforeScopeCorrection } from './scope-baseline.js';
import { validateBank, isCorrect, createSession } from '../src/engine.js';
const bank=JSON.parse(await readFile(new URL('../public/data/questions.json',import.meta.url),'utf8'));
const exam=JSON.parse(await readFile(new URL('../public/data/exam.json',import.meta.url),'utf8'));
const batch=bank.questions.filter(q=>Number(q.id.slice(6))>=503&&Number(q.id.slice(6))<=702);

test('adição 503–702 preserva integralmente as 502 anteriores e contém 200 itens válidos',()=>{
  assert.equal(createHash('sha256').update(JSON.stringify(beforeScopeCorrection(bank.questions.slice(0,502)))).digest('hex'),'f4ed6b59c1c6251456ef36f548a474a77394ca252f90cfe8c51d13676c57f0da');
  assert.deepEqual(validateBank(bank,exam),[]);assert.equal(batch.length,200);
  assert.deepEqual(batch.map(q=>q.id),Array.from({length:200},(_,i)=>'AI901-'+(503+i)));
  for(const type of ['single','multiple','matching','code','case'])assert.equal(batch.filter(q=>q.type===type).length,40);
  assert.deepEqual(Object.fromEntries(exam.domains.flatMap(d=>d.topics).map(t=>[t.id,batch.filter(q=>q.topicId===t.id).length])),{
    'responsible-ai':28,models:29,workloads:28,'generative-agents':30,'text-speech':29,vision:29,extraction:27});
  assert.equal(batch.filter(q=>q.domainId==='concepts').length,85);
  for(const q of batch){assert.ok(isCorrect(q,q.answer),q.id);assert.ok(q.explanation.length>=150,q.id);assert.ok(q.conceptTags.length);assert.ok(['curriculum','supporting'].includes(q.coverageLevel));}
});

test('casos extensos, alternativas únicas e controle de pistas de extensão no lote de 200',()=>{
  let longest=0;
  for(const q of batch){
    if(q.type==='case')assert.ok(q.context.split(/\s+/).length>=150,q.id);
    for(const group of q.type==='code'?q.blanks.map(b=>b.options):[q.options||q.right]){
      assert.equal(new Set(group.map(o=>o.text.trim())).size,group.length,q.id);
      assert.ok(group.every(o=>!/(todas|nenhuma) (as|das) (anteriores|alternativas)/i.test(o.text)),q.id);
    }
    if(['single','case'].includes(q.type)){
      const correct=q.options.find(o=>q.answer.includes(o.id));
      const maxOther=Math.max(...q.options.filter(o=>!q.answer.includes(o.id)).map(o=>o.text.length));
      if(correct.text.length>maxOther)longest++;
      assert.ok(correct.text.length<=1.22*maxOther,q.id+': possível pista por extensão');
    }
  }
  assert.ok(longest<=24);
});

test('banco de 702 permite sessão completa respeitando proporção dos domínios',()=>{
  const session=createSession(bank,exam,{count:702,minutes:240,difficulty:'hard'});
  assert.equal(session.questions.length,702);assert.equal(new Set(session.questions.map(q=>q.id)).size,702);
  assert.equal(session.questions.filter(q=>q.domainId==='concepts').length,298);
  assert.equal(session.questions.filter(q=>q.domainId==='foundry').length,404);
});
