import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { allocateCounts, createSession, validateBank, isAnswered, isCorrect, scoreSession, reviewEntries, reviewStatus } from '../src/engine.js';
const exam = JSON.parse(await readFile(new URL('../public/data/exam.json', import.meta.url)));
const shippedBank = JSON.parse(await readFile(new URL('../public/data/questions.json', import.meta.url)));
const empty = { ...shippedBank, questions: [] };
// Fixtures artificiais para verificar o motor. Não são questões de estudo.
function fixture(id, domainId = 'concepts', extra = {}) {
  return { id, domainId, topicId: domainId === 'concepts' ? 'models' : 'vision', type: 'single', difficulty: 'hard', prompt: 'Fixture de teste', options: [{ id: 'a', text: 'Item A' }, { id: 'b', text: 'Item B' }, { id: 'c', text: 'Item C' }], answer: ['a'], explanation: 'Justificativa artificial para teste.', references: [{ title: 'Referência', url: exam.sourceUrl }], ...extra };
}
const bank = { ...empty, questions: [...Array.from({ length: 24 }, (_, i) => fixture(`c${i}`)), ...Array.from({ length: 32 }, (_, i) => fixture(`f${i}`, 'foundry'))] };
test('contrato também aceita um banco vazio de desenvolvimento', () => { assert.deepEqual(validateBank(empty, exam), []); });
test('banco completo com questões válidas e referências documentadas', async () => {
  assert.deepEqual(validateBank(shippedBank, exam), []);
  assert.ok(shippedBank.questions.length >= 400);
  assert.equal(new Set(shippedBank.questions.map(q => q.id)).size, shippedBank.questions.length);
  assert.equal(new Set(shippedBank.questions.map(q => q.prompt)).size, shippedBank.questions.length);
  assert.equal(shippedBank.questions.slice(0,400).filter(q => q.domainId === 'concepts').length, 170);
  assert.equal(shippedBank.questions.slice(0,400).filter(q => q.domainId === 'foundry').length, 230);
  assert.deepEqual(Object.fromEntries(['single', 'multiple', 'matching', 'case', 'code'].map(t => [t, shippedBank.questions.slice(0,400).filter(q => q.type === t).length])), { single: 130, multiple: 58, matching: 39, case: 37, code: 136 });
  for (const domain of exam.domains) for (const topic of domain.topics) assert.ok(shippedBank.questions.some(q => q.topicId === topic.id));
  const catalog = JSON.parse(await readFile(new URL('../docs/knowledge/sources.json', import.meta.url)));
  for (const q of shippedBank.questions) {
    assert.equal(q.difficulty, 'hard');
    assert.ok(q.references.every(r => {
      const url = new URL(r.url);
      return url.protocol === 'https:' && (catalog.sources.some(s => s.url === r.url) || ['learn.microsoft.com', 'arxiv.org', 'onnxruntime.ai', 'docs.python.org'].includes(url.hostname) || (url.hostname === 'raw.githubusercontent.com' && url.pathname.startsWith('/microsoft/AI-For-Beginners/')));
    }));
    assert.ok(q.explanation.length >= 150, q.id + ': justificativa insuficiente');
    if (q.type === 'case') assert.ok(q.context.split(/\s+/).length >= 150, q.id + ': contexto curto');
    assert.ok(isCorrect(q, q.answer), q.id + ': próprio gabarito precisa ser aceito');
  }
});
test('banco entregue permite sessões difíceis de 40, 100, 200, 300 e 400 questões', () => {
  for (const count of [40, 100, 200, 300, 400]) {
    const session = createSession(shippedBank, exam, { count, minutes: 120, difficulty: 'hard' });
    assert.equal(session.questions.length, count);
    assert.equal(new Set(session.questions.map(q => q.id)).size, count);
    for (const row of allocateCounts(count, exam.domains)) assert.equal(session.questions.filter(q => q.domainId === row.domainId).length, row.count);
    session.answers = Object.fromEntries(session.questions.map(q => [q.id, q.answer]));
    assert.equal(scoreSession(session, exam).percent, 100);
  }
});
test('revisão editorial preserva IDs, temas, formatos e gabaritos das 400 questões', () => {
  const structural = shippedBank.questions.slice(0,400).map(({id, domainId, topicId, type, answer}) => ({id, domainId, topicId, type, answer}));
  const hash = createHash('sha256').update(JSON.stringify(structural)).digest('hex');
  assert.equal(hash, 'a67432f149a1fed4f797dd64a69d28bedf38f7d574f300f37f65e60eacbcfca3');
});
test('lote 301–400 continua com 100 questões de código', () => {
  assert.equal(shippedBank.questions.slice(300,400).length, 100);
  assert.ok(shippedBank.questions.slice(300,400).every(q => q.type === 'code'));
  for (const topic of new Set(shippedBank.questions.map(q => q.topicId))) assert.ok(shippedBank.questions.some(q => q.type === 'code' && q.topicId === topic));
});

test('lacunas exigem respostas completas, corretas e compatíveis com o contrato', () => {
  const q = structuredClone(shippedBank.questions.find(q => q.type === 'code' && q.blanks.length === 2));
  const [a, b] = q.blanks;
  assert.ok(!isAnswered(q, undefined));
  assert.ok(!isAnswered(q, { [a.id]: q.answer[a.id] }));
  assert.ok(!isAnswered(q, { ...q.answer, [b.id]: '' }));
  assert.ok(!isAnswered(q, { ...q.answer, [b.id]: 'inexistente' }));
  const wrong = { ...q.answer, [b.id]: b.options.find(o => o.id !== q.answer[b.id]).id };
  assert.ok(isAnswered(q, wrong));
  assert.ok(!isCorrect(q, wrong));
  assert.ok(isCorrect(q, q.answer));
  for (const mutate of [
    q => q.code += '\n{{extra}}',
    q => q.code = q.code.replace(`{{${a.id}}}`, 'texto'),
    q => q.code += `\n{{${a.id}}}`,
    q => q.answer[b.id] = 'inexistente',
    q => q.blanks[1].id = a.id,
    q => q.blanks[0].options = {},
    q => q.blanks[0] = null,
    q => q.blanks[0].label = ''
  ]) {
    const invalid = structuredClone(q); mutate(invalid);
    assert.ok(validateBank({ ...empty, questions: [invalid] }, exam).length);
  }
});

test('sorteio embaralha alternativas das lacunas sem mudar IDs ou banco', () => {
  const before = JSON.stringify(shippedBank);
  const session = createSession(shippedBank, exam, { count: 400, minutes: 240, difficulty: 'hard' }, () => 0);
  for (const q of session.questions.filter(q => q.type === 'code')) {
    const source = shippedBank.questions.find(s => s.id === q.id);
    assert.notStrictEqual(q.blanks, source.blanks);
    assert.notStrictEqual(q.blanks[0].options, source.blanks[0].options);
    assert.deepEqual(q.answer, source.answer);
    assert.ok(isCorrect(q, source.answer));
  }
  assert.equal(JSON.stringify(shippedBank), before);
});
test('novo lote documenta fundamentos, arquiteturas e aplicações', () => {
  const added = shippedBank.questions.slice(100);
  for (const q of added) {
    assert.ok(Array.isArray(q.conceptTags) && q.conceptTags.length > 0, q.id);
    assert.ok(['curriculum', 'supporting'].includes(q.coverageLevel), q.id);
  }
  const tags = new Set(added.flatMap(q => q.conceptTags));
  for (const tag of ['tokens', 'embeddings', 'attention', 'multi-head-attention', 'queries-keys-values', 'causal-mask', 'positional-encoding', 'encoder', 'decoder', 'cnn', 'rnn', 'lstm', 'gru', 'vit', 'diffusion', 'gan', 'vae', 'moe', 'quantization', 'distillation', 'activation-functions', 'foundry-iq', 'tf-idf', 'vocoder', 'mfcc', 'python-sdk', 'azure-cli', 'structured-extraction', 'video-generation']) assert.ok(tags.has(tag), 'Conceito ausente: ' + tag);
});
test('distribuição proporcional e arredondamento conservam o total', () => {
  assert.deepEqual(allocateCounts(40, exam.domains).map(r => r.count), [17, 23]);
  for (let i = 1; i <= 400; i++) assert.equal(allocateCounts(i, exam.domains).reduce((n, r) => n + r.count, 0), i);
  assert.throws(() => allocateCounts(0, exam.domains)); assert.throws(() => allocateCounts(2.5, exam.domains));
});
test('sorteio sem reposição, respeitando domínio e preservando o banco', () => {
  const original = JSON.stringify(bank);
  const session = createSession(bank, exam, { count: 40, minutes: 45, difficulty: 'hard' });
  assert.equal(session.questions.length, 40); assert.equal(new Set(session.questions.map(q => q.id)).size, 40);
  assert.equal(session.questions.filter(q => q.domainId === 'concepts').length, 17);
  assert.equal(JSON.stringify(bank), original); assert.equal(session.deadline - session.startedAt, 2700000);
});
test('não preenche domínio insuficiente com questões de outro', () => {
  assert.throws(() => createSession({ ...bank, questions: bank.questions.filter(q => q.domainId === 'foundry') }, exam, { count: 40, minutes: 45, difficulty: 'all' }), /Banco insuficiente/);
  assert.throws(() => createSession(bank, exam, { count: 40, minutes: 45, difficulty: 'easy' }), /Banco insuficiente/);
  assert.throws(() => createSession(bank, exam, { count: 3, minutes: 45, difficulty: 'all' }), /faixas oficiais/);
  assert.throws(() => createSession(bank, exam, { count: 40, minutes: 0, difficulty: 'all' }), /minutos/);
});
test('rejeita IDs duplicados, referências, tema e gabarito inválidos', () => {
  assert.ok(validateBank({ ...empty, questions: [fixture('x'), fixture('x')] }, exam).some(e => e.includes('duplicado')));
  for (const change of [{ answer: ['missing'] }, { topicId: 'vision' }, { references: [] }, { options: [{ id: 'x', text: 'X' }, { id: 'x', text: 'Y' }] }, { type: 'multiple', answer: ['a', 'b'], selectCount: 3 }, { type: 'case' }]) assert.ok(validateBank({ ...empty, questions: [fixture('x', 'concepts', change)] }, exam).length);
  assert.ok(validateBank({ ...empty, questions: [null, 4] }, exam).length);
});
test('valida todas as interações e corrige pelo conjunto exato de respostas', () => {
  const multi = fixture('m', 'concepts', { type: 'multiple', answer: ['a', 'b'], selectCount: 2 });
  const match = fixture('r', 'concepts', { type: 'matching', left: [{ id: 'x', text: 'X' }, { id: 'y', text: 'Y' }], right: [{ id: 'a', text: 'A' }, { id: 'b', text: 'B' }], answer: { x: 'a', y: 'a' } });
  const caseQ = fixture('k', 'concepts', { type: 'case', context: 'Contexto extenso artificial.' });
  assert.deepEqual(validateBank({ ...empty, questions: [multi, match, caseQ] }, exam), []);
  assert.ok(isCorrect(multi, ['b', 'a'])); assert.ok(!isCorrect(multi, ['a'])); assert.ok(!isCorrect(multi, ['a', 'b', 'c']));
  assert.ok(isCorrect(match, { x: 'a', y: 'a' })); assert.ok(!isCorrect(match, { x: 'a', y: 'b' }));
  assert.ok(!isAnswered(match, { x: 'a' })); assert.ok(!isAnswered(multi, ['a'])); assert.ok(isAnswered(caseQ, ['a']));
  const result = scoreSession({ questions: [multi, match, caseQ], answers: { m: ['a', 'b'], r: { x: 'a', y: 'a' } } }, exam);
  assert.equal(result.correct, 2); assert.equal(result.percent, 67);
});

test('revisão distingue erros, pendências e tentativas incompletas sem mudar a sessão', () => {
  const single = fixture('s');
  const multi = fixture('m', 'concepts', { type: 'multiple', answer: ['a', 'b'], selectCount: 2 });
  const code = structuredClone(shippedBank.questions.find(q => q.type === 'code' && q.blanks.length === 2));
  const partial = { [code.blanks[0].id]: code.answer[code.blanks[0].id] };
  const session = { questions: [single, multi, fixture('blank'), code], answers: { s: ['a'], m: ['a'], [code.id]: partial }, flagged: ['blank', code.id] };
  const original = JSON.stringify(session);
  assert.equal(reviewStatus(single, ['a']), 'correct');
  assert.equal(reviewStatus(single, []), 'unanswered');
  assert.equal(reviewStatus(multi, ['a']), 'incorrect');
  assert.equal(reviewStatus(code, partial), 'incorrect');
  assert.deepEqual(reviewEntries(session, 'errors').map(e => e.index), [1, 2, 3]);
  assert.deepEqual(reviewEntries(session, 'incorrect').map(e => e.index), [1, 3]);
  assert.deepEqual(reviewEntries(session, 'unanswered').map(e => e.index), [2]);
  assert.deepEqual(reviewEntries(session, 'correct').map(e => e.index), [0]);
  assert.deepEqual(reviewEntries(session, 'flagged').map(e => e.index), [2, 3]);
  assert.equal(reviewEntries(session, 'all', 'fixture de TESTE').length, 3);
  assert.deepEqual(reviewEntries(session, 'all', '2').map(e => e.index), [1]);
  assert.equal(reviewEntries(session, 'all', 'não existe').length, 0);
  assert.equal(reviewEntries(session, 'all', '', 'models').length, 3);
  assert.equal(JSON.stringify(session), original);
});

test('revisão editorial cobre o banco, com alternativas distintas e sem pista dominante de extensão', async () => {
  const report = JSON.parse(await readFile(new URL('../docs/editorial-review.json', import.meta.url)));
  assert.deepEqual(report.questions.map(q => q.id), shippedBank.questions.slice(0,400).map(q => q.id));
  assert.ok(report.questions.every(q => q.reviewed));
  assert.ok(report.after.correctIsSoleLongest < report.before.correctIsSoleLongest / 2);
  for (const q of shippedBank.questions) {
    for (const options of q.type === 'code' ? q.blanks.map(b => b.options) : [q.options || q.right]) {
      assert.equal(new Set(options.map(o => q.type === 'code' ? o.text.trim() : o.text.trim().toLowerCase())).size, options.length, q.id);
    }
  }
});
