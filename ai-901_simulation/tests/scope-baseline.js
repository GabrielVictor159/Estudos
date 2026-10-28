import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';

export const scopeCorrection = JSON.parse(await readFile(new URL('../docs/arithmetic-scope-correction.json', import.meta.url), 'utf8'));
export const loraCorrection = JSON.parse(await readFile(new URL('../docs/lora-scope-correction.json', import.meta.url), 'utf8'));

// Reconstitui somente a comparação histórica; o banco real continua sujeito
// a validação, correção, qualidade editorial e testes dos novos trechos.
export function beforeScopeCorrection(questions) {
  const changed = new Map([...scopeCorrection.changes, ...loraCorrection.changes].map(c => [c.id, c]));
  return questions.map(q => {
    const record = changed.get(q.id);
    if (!record) return q;
    assert.equal(createHash('sha256').update(JSON.stringify(q)).digest('hex'), record.afterSha256, q.id + ': alteração fora da revisão registrada');
    return record.before;
  });
}
