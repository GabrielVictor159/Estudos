import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { validateBank } from '../src/engine.js';
export async function renderProject(root, bankOverride) {
const read = file => readFile(resolve(root, file), 'utf8');
const [css, engine, storage, app, exam, bank] = await Promise.all(['src/styles.css', 'src/engine.js', 'src/storage.js', 'src/app.js', 'public/data/exam.json', 'public/data/questions.json'].map(read));
const parsedBank = bankOverride || JSON.parse(bank);
const errors = validateBank(parsedBank, JSON.parse(exam));
if (errors.length) throw new Error('Banco inválido. O HTML não foi alterado.\n' + errors.join('\n'));
const jsonTag = (id, json) => `<script id="${id}" type="application/json">${JSON.stringify(JSON.parse(json)).replace(/</g, '\\u003c')}</script>`;
const js = [engine, storage, app.replace(/^import .*;\r?\n/gm, '')].join('\n').replace(/^export /gm, '');
const html = `<!doctype html>
<html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#153e32"><meta name="description" content="Laboratório de preparação AI-901. Simulados proporcionais, múltiplas interações e banco JSON independente."><title>AI-901 Lab · Simulador de certificação</title><style>${css}</style></head>
<body><div id="app"><p class="loading">Carregando o laboratório…</p></div>${jsonTag('exam-data', exam)}${jsonTag('bank-data', JSON.stringify(parsedBank))}<script>'use strict';\n(() => {\n${js.replace(/<\/script/gi, '<\\/script')}\n})();</script></body></html>`;
return html;
}
export async function buildProject(root = resolve(import.meta.dirname, '..')) {
await writeFile(resolve(root, 'index.html'), await renderProject(root), 'utf8');
// O mesmo HTML offline alimenta a cópia estática usada na hospedagem.
const siteRoot = resolve(root, 'sites/ai901-lab');
let hosting;
try { hosting = JSON.parse(await readFile(resolve(siteRoot, '.openai/hosting.json'), 'utf8')); }
catch (error) { if (error.code !== 'ENOENT') throw error; }
if (hosting?.project_id && hosting.static?.directory === 'dist') {
await mkdir(resolve(siteRoot, 'dist'), { recursive: true });
await writeFile(resolve(siteRoot, 'dist/index.html'), await readFile(resolve(root, 'index.html'), 'utf8'), 'utf8');
}
console.log('index.html gerado. Abra diretamente no navegador.');
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) buildProject().catch(error => { console.error(error.message); process.exitCode = 1; });
