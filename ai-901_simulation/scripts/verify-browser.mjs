// QA opcional: node scripts/verify-browser.mjs <caminho absoluto de playwright/index.mjs>
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
const { chromium } = await import(process.argv[2] ? pathToFileURL(resolve(process.argv[2])).href : 'playwright');
const root = resolve(import.meta.dirname, '..');
const bank = JSON.parse(await readFile(resolve(root, 'public/data/questions.json')));
const total = bank.questions.length;
const pageUrl = pathToFileURL(resolve(root, 'index.html')).href;
const browser = await chromium.launch({ headless: true, channel: 'msedge' });
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1100 }, offline: true });
  const page = await context.newPage();
  const errors = []; page.on('pageerror', e => errors.push(e.message));
  // O banco vazio salvo pela versão antiga não pode ocultar as questões incluídas.
  await page.addInitScript(() => {
    localStorage.setItem('ai901:v1:bank', JSON.stringify({ schemaVersion: 1, examId: 'AI-901', blueprintVersion: '2026-04-15', questions: [] }));
  });
  await page.goto(pageUrl);
  assert.match(await page.locator('h1').innerText(), /Conhecimento em prática/);
  assert.deepEqual(await page.locator('#bank-data').evaluate(el => JSON.parse(el.textContent)), bank);
  assert.equal(await page.locator('.stats article').first().locator('strong').innerText(), `${total} disponíveis`);
  assert.equal(await page.locator('input[type=file], [data-view=bank], [data-action=export-bank]').count(), 0);
  await page.getByRole('button', { name: 'Temas da prova', exact: true }).click();
  assert.equal(await page.locator('.topic-row').count(), 7);
  await page.getByRole('button', { name: 'Visão geral', exact: true }).click();
  await page.getByLabel('Quantidade de questões').fill(String(total));
  await page.getByLabel('Tempo de sessão').fill('240');
  await page.getByLabel('Dificuldade').selectOption('hard');
  await page.getByRole('button', { name: 'Iniciar simulado', exact: true }).click();
  assert.equal(await page.locator('.question-dots button').count(), total);
  const seenTypes = new Set();
  for (let i = 0; i < total; i++) {
    await page.locator(`[data-index="${i}"]`).click();
    const q = await page.evaluate(i => JSON.parse(localStorage.getItem('ai901:v1:session')).questions[i], i);
    seenTypes.add(q.type);
    if (q.type === 'code') {
      for (const [id, answer] of Object.entries(q.answer)) await page.locator(`[data-codeblank="${id}"]`).selectOption(answer);
    } else if (q.type === 'matching') {
      for (const [id, answer] of Object.entries(q.answer)) await page.locator(`[data-match="${id}"]`).selectOption(answer);
    } else {
      for (const answer of q.answer) await page.locator(`input[name="answer"][value="${answer}"]`).check();
    }
    if (q.type === 'case' && !(await page.locator('.case-context').count())) throw new Error('Contexto ausente: ' + q.id);
  }
  assert.equal(seenTypes.size, 5);
  await page.getByRole('button', { name: 'Marcar para revisão', exact: true }).click();
  await page.reload();
  await page.getByRole('button', { name: 'Retomar sessão em andamento' }).click();
  assert.match(await page.locator('.page-heading p').innerText(), new RegExp(`${total} de ${total} respondidas`));
  await page.getByRole('button', { name: 'Finalizar simulado', exact: true }).click();
  await page.getByRole('button', { name: 'Confirmar encerramento', exact: true }).click();
  assert.match(await page.locator('.results h2').innerText(), new RegExp(`${total} de ${total}`));
  await page.getByRole('button', { name: 'Revisar respostas' }).click();
  for (let i = 0; i < total; i++) {
    await page.locator(`[data-index="${i}"]`).click();
    assert.equal(await page.locator('.explanation > strong').innerText(), 'Resposta correta');
    assert.ok(await page.locator('.explanation a').count());
  }
  await page.getByRole('button', { name: 'Meu histórico', exact: true }).click();
  assert.equal(await page.locator('.history-row').count(), 1);

  // Novo contexto para registrar a experiência real de primeira abertura.
  const clean = await browser.newContext({ viewport: { width: 1440, height: 1100 }, offline: true });
  const desktop = await clean.newPage(); await desktop.goto(pageUrl);
  await desktop.screenshot({ path: resolve(root, 'preview-desktop.png'), fullPage: true });
  await desktop.setViewportSize({ width: 390, height: 844 });
  assert.ok(await desktop.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Não deve haver rolagem horizontal no celular');
  await desktop.screenshot({ path: resolve(root, 'preview-mobile.png'), fullPage: true });
  await desktop.getByRole('button', { name: 'Iniciar simulado', exact: true }).click();
  const questions = await desktop.evaluate(() => JSON.parse(localStorage.getItem('ai901:v1:session')).questions);
  for (const type of ['case', 'multiple', 'matching', 'single', 'code']) {
    const index = questions.findIndex(q => q.type === type);
    if (index < 0) continue;
    await desktop.locator(`[data-index="${index}"]`).click();
    assert.ok(await desktop.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Rolagem horizontal em ${type}`);
    if (type === 'code') await desktop.locator('.question-card').screenshot({ path: resolve(root, 'preview-code-mobile.png') });
    if (type === 'case') await desktop.screenshot({ path: resolve(root, 'preview-question-mobile.png'), fullPage: true });
  }
  assert.deepEqual(errors, []);
  console.log(`QA aprovada: ${total} questões automáticas em file:// offline, sem importação ou página de banco; ${total} respostas, 5 interações, retomada, revisão, histórico e celular.`);
} finally { await browser.close(); }
