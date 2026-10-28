import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { beforeScopeCorrection } from './scope-baseline.js';
import { validateBank, isCorrect, createSession } from '../src/engine.js';
const bank=JSON.parse(await readFile(new URL('../public/data/questions.json',import.meta.url),'utf8'));
const exam=JSON.parse(await readFile(new URL('../public/data/exam.json',import.meta.url),'utf8'));
const batch=bank.questions.filter(q=>Number(q.id.slice(6))>=403 && Number(q.id.slice(6))<=502);

test('adição contém 100 questões, cinco formatos e sete temas, sem alterar as 402 anteriores',()=>{
  assert.equal(createHash('sha256').update(JSON.stringify(beforeScopeCorrection(bank.questions.slice(0,402)))).digest('hex'),'975cc6aecfd874edb3b5616ca39ababb0252a564757f1913fe9775697efa955d');
  assert.deepEqual(validateBank(bank,exam),[]);
  assert.equal(batch.length,100);
  assert.deepEqual(batch.map(q=>q.id),Array.from({length:100},(_,i)=>'AI901-'+(403+i)));
  for(const type of ['single','multiple','matching','case','code'])assert.equal(batch.filter(q=>q.type===type).length,20);
  assert.deepEqual(Object.fromEntries(exam.domains.flatMap(d=>d.topics).map(t=>[t.id,batch.filter(q=>q.topicId===t.id).length])),{
    'responsible-ai':15,models:14,workloads:13,'generative-agents':15,'text-speech':14,vision:15,extraction:14});
  assert.equal(batch.filter(q=>q.domainId==='concepts').length,42);
  for(const q of batch){assert.ok(isCorrect(q,q.answer),q.id);assert.ok(q.explanation.length>=150,q.id);assert.ok(q.conceptTags.length);assert.ok(['curriculum','supporting'].includes(q.coverageLevel));}
});

test('casos são substanciais e alternativas não usam preenchimento nem duplicatas',()=>{
  let longest=0;
  for(const q of batch){
    if(q.type==='case')assert.ok(q.context.split(/\s+/).length>=150,q.id);
    const groups=q.type==='code'?q.blanks.map(b=>b.options):[q.options||q.right];
    for(const options of groups){
      assert.equal(new Set(options.map(o=>o.text.trim())).size,options.length,q.id);
      assert.ok(options.every(o=>!/(todas|nenhuma) (as|das) (anteriores|alternativas)/i.test(o.text)),q.id);
    }
    if(['single','case'].includes(q.type)){
      const correct=q.options.find(o=>q.answer.includes(o.id));
      const maxOther=Math.max(...q.options.filter(o=>!q.answer.includes(o.id)).map(o=>o.text.length));
      if(correct.text.length>maxOther)longest++;
      assert.ok(correct.text.length<=maxOther*1.22,q.id+': conferir pista de extensão');
    }
  }
  assert.ok(longest<=12,'Resposta correta excessivamente associada à maior alternativa.');
});

test('banco ampliado mantém sorteio proporcional para sessões de 400, 500 e todas as questões',()=>{
  for(const count of [400,500,bank.questions.length]){
    const s=createSession(bank,exam,{count,minutes:120,difficulty:'hard'});
    assert.equal(s.questions.length,count);assert.equal(new Set(s.questions.map(q=>q.id)).size,count);
  }
});
