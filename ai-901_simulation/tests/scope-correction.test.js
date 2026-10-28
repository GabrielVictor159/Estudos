import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { beforeScopeCorrection, scopeCorrection, loraCorrection } from './scope-baseline.js';
const bank = JSON.parse(await readFile(new URL('../public/data/questions.json', import.meta.url),'utf8'));

test('LoRA não aparece no conteúdo do simulado; cinco substituições têm objetivos oficiais registrados',()=>{
 assert.equal(loraCorrection.changes.length,5);
 for(const q of bank.questions) assert.doesNotMatch(JSON.stringify(q),/\blora\b|2106\.09685/i,q.id);
 for(const {id} of loraCorrection.changes) {
  const q=bank.questions.find(q=>q.id===id);
  assert.equal(q.coverageLevel,'curriculum');
  assert.ok(q.references.some(r=>r.url.endsWith('/study-guides/ai-901')));
 }
});

test('correção de escopo é rastreável e preserva quantidade, temas, formatos e gabaritos', () => {
  assert.equal(bank.questions.length,702);
  assert.equal(scopeCorrection.count,69);
  assert.equal(new Set(scopeCorrection.changes.map(c=>c.id)).size,69);
  const baseline=beforeScopeCorrection(bank.questions);
  for(let i=0;i<bank.questions.length;i++) {
    const q=bank.questions[i], old=baseline[i];
    for(const field of ['id','domainId','topicId','type','answer']) assert.deepEqual(q[field],old[field],q.id);
  }
  const offending=bank.questions.find(q=>q.id==='AI901-185');
  assert.ok(offending.conceptTags.includes('segmentation'));
  assert.doesNotMatch(offending.prompt,/IoU|pixels em comum/);
});

test('questões revisadas não pedem cálculos nem implementação de fórmulas',()=>{
  for(const {id} of scopeCorrection.changes) {
    const q=bank.questions.find(q=>q.id===id);
    assert.doesNotMatch(q.prompt,/calcule|qual é o (IoU|MAE)|quantos (tokens|patches)|fórmula|produto escalar/i,id);
    assert.ok(q.explanation.length>=150,id);
  }
});
