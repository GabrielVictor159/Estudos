// QA focada nas lacunas: node scripts/verify-code-ui.mjs <playwright/index.mjs>
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createSession } from '../src/engine.js';
const { chromium } = await import(process.argv[2] ? pathToFileURL(resolve(process.argv[2])).href : 'playwright');
const root = resolve(import.meta.dirname, '..');
const bank = JSON.parse(await readFile(resolve(root, 'public/data/questions.json')));
const exam = JSON.parse(await readFile(resolve(root, 'public/data/exam.json')));
const seed = createSession(bank, exam, { count: bank.questions.length, minutes: 240, difficulty: 'hard' });
const browser = await chromium.launch({ headless: true, channel: 'msedge' });
try {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, offline: true });
  const page = await context.newPage();
  await page.goto(pathToFileURL(resolve(root, 'index.html')).href);
  await page.evaluate(s => localStorage.setItem('ai901:v1:session', JSON.stringify(s)), seed);
  await page.reload();
  await page.getByRole('button', { name: 'Retomar sessão em andamento' }).click();
  for (const id of ['AI901-301', 'AI901-344', 'AI901-379']) {
    const index = seed.questions.findIndex(q => q.id === id);
    const q = seed.questions[index];
    await page.locator(`[data-index="${index}"]`).click();
    for (const b of q.blanks) {
      const select = page.locator(`[data-codeblank="${b.id}"]`);
      await select.selectOption(q.answer[b.id]);
      assert.equal(await select.inputValue(), q.answer[b.id]);
      assert.ok(await select.evaluate(el => el === document.activeElement), 'Manter foco após escolher');
      assert.ok(await select.evaluate(el => { const a = el.getBoundingClientRect(); const p = el.closest('pre').getBoundingClientRect(); return a.left >= p.left && a.right <= p.right; }), 'Seletor deve caber no bloco de código');
    }
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Celular sem transbordamento');
    if (id === 'AI901-344') await page.locator('.question-card').screenshot({ path: resolve(root, 'preview-code-mobile.png') });
  }
  await page.reload();
  await page.getByRole('button', { name: 'Retomar sessão em andamento' }).click();
  assert.equal(await page.locator('.code-blank').count(), 1);
  const q = seed.questions.find(q => q.id === 'AI901-379');
  const blank = q.blanks[0];
  assert.equal(await page.locator('.code-blank').inputValue(), q.answer[blank.id]);
  console.log('Seletores Python aprovados: múltiplas lacunas, foco, persistência e largura no celular.');
} finally { await browser.close(); }
