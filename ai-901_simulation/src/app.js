import { TYPES, validateBank, allocateCounts, createSession, isAnswered, isCorrect, scoreSession, reviewStatus, reviewEntries, isTimerPaused, remainingTime, isSessionExpired, pauseTimer, resumeTimer } from './engine.js';
import { read, write } from './storage.js';

const exam = JSON.parse(document.getElementById('exam-data').textContent);
const bank = JSON.parse(document.getElementById('bank-data').textContent);
let history = read('history', []);
if (!Array.isArray(history)) history = [];
let session = read('session', null);
if (session && (validateBank({ ...bank, questions: session.questions }, exam).length || !session.answers || !Array.isArray(session.flagged) || !Number.isFinite(session.deadline) || (session.pausedAt != null && !Number.isFinite(session.pausedAt)) || !Number.isInteger(session.index) || session.index < 0 || session.index >= session.questions.length || !session.questions.length)) session = null;
let view = 'overview';
let settings = { count: 40, minutes: 45, difficulty: 'all' };
let notice = '';
let reviewing = false;
let finalizeRequested = false;
let reviewFilter = 'all';
let reviewQuery = '';
let reviewTopic = 'all';
const root = document.getElementById('app');
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const icon = (name, size = 20) => {
  const paths = { grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>', layers: '<path d="m12 3 10 5-10 5L2 8l10-5Zm-9 9 9 5 9-5M3 17l9 5 9-5"/>', book: '<path d="M4 3h12a3 3 0 0 1 3 3v15H6a3 3 0 0 1 0-6h13M4 3v15M8 7h7M8 11h5"/>', clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>', upload: '<path d="M12 16V3m-5 5 5-5 5 5M4 15v6h16v-6"/>', check: '<path d="m5 12 4 4L19 6"/>', flag: '<path d="M5 22V3h14l-3 5 3 5H5"/>', code: '<path d="m8 6-6 6 6 6m8-12 6 6-6 6m-5 3 2-18"/>', bolt: '<path d="m13 2-9 12h7l-1 8 10-13h-7l1-7Z"/>' };
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.grid}</svg>`;
};
function persist() { if (!write('session', session)) notice = 'O navegador não conseguiu salvar a sessão. Mantenha a página aberta.'; }
function download(name, value) {
  const url = URL.createObjectURL(new Blob([JSON.stringify(value, null, 2)], { type: 'application/json' }));
  const a = document.createElement('a'); a.href = url; a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function shell(content) {
  const navigation = [['overview', 'grid', 'Visão geral'], ['topics', 'layers', 'Temas da prova'], ['history', 'clock', 'Meu histórico']];
  root.innerHTML = `<aside class="sidebar"><a href="#" class="brand" data-view="overview"><span class="brand-icon">${icon('layers', 25)}</span><span>AI-901<span class="brand-lab"> LAB</span><small>SEU PRÓXIMO NÍVEL</small></span></a><div class="workspace-label">ÁREA DE ESTUDOS</div><nav aria-label="Menu principal">${navigation.map(([id, glyph, label]) => `<button data-view="${id}" aria-label="${label}" class="nav-item ${view === id ? 'active' : ''}">${icon(glyph)}<span>${label}</span></button>`).join('')}</nav><div class="sidebar-bottom"><div class="study-note">${icon('bolt')}<strong>Um passo de cada vez.</strong><p>Pratique com intenção.<br>Entenda cada decisão.</p></div><span class="local-dot"></span> Ambiente local <span class="version">v0.1</span></div></aside><div class="main-wrap"><header class="topbar"><span>Workspace <span class="slash">/</span> <strong>Azure AI Fundamentals</strong></span><span class="top-status"><span class="local-dot"></span> Preparação AI-901</span></header><main>${notice ? `<div role="status" class="notice">${esc(notice)}<button data-action="dismiss" aria-label="Fechar aviso">×</button></div>` : ''}${content}</main><footer>Feito para aprender, uma questão por vez.<span>Simulador independente · Sem vínculo com a Microsoft</span></footer></div>`;
}
const heading = (eyebrow, title, subtitle, aside = '') => `<div class="page-heading"><div><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><p>${subtitle}</p></div>${aside}</div>`;
function domainCards() {
  return exam.domains.map((d, i) => `<article class="domain-card"><div class="domain-top"><span class="domain-number">0${i + 1}</span><span class="pill">${d.minPercent}–${d.maxPercent}% da prova</span></div><h3>${esc(d.title)}</h3><p>${d.topics.length} temas · ${bank.questions.filter(q => q.domainId === d.id).length} questões disponíveis</p><div class="weight-track"><span style="width:${d.weight}%"></span></div><div class="domain-bottom"><span>Referência de sorteio</span><strong>${String(d.weight).replace('.', ',')}%</strong></div></article>`).join('');
}
function plan() { try { return allocateCounts(settings.count, exam.domains); } catch { return []; } }
function overview() {
  const allocations = plan();
  const ready = bank.questions.length > 0;
  const hasActiveSession = read('session', null)?.status === 'active';
  shell(heading('SEU LABORATÓRIO DE PREPARAÇÃO', 'Conhecimento em prática<span class="green">.</span>', 'Prepare sua próxima sessão e avance com foco nos objetivos da AI-901.', '<span class="outline-badge">BLUEPRINT · ABR 2026</span>') +
    `<section class="hero"><div class="hero-content"><div class="hero-kicker"><span class="hero-dot"></span> MICROSOFT AZURE AI FUNDAMENTALS</div><h2>Treine o raciocínio.<br>Construa sua confiança.</h2><p>Uma experiência de estudo com distribuição por domínio,<br class="desktop"> diferentes interações e espaço para revisar suas decisões.</p><button class="light-button" data-action="configure">Preparar meu simulado ${icon('arrow', 18)}</button></div><div class="hero-art" aria-hidden="true"><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="orbit orbit-three"></div><div class="art-center">AI<span>901</span></div><span class="art-node n1">✧</span><span class="art-node n2">{ }</span><span class="art-node n3">⌘</span></div><div class="hero-caption">CONCEITO → APLICAÇÃO → DOMÍNIO</div></section>` +
    `<section class="stats"><article><span class="stat-icon">${icon('book')}</span><div><span>Questões incluídas</span><strong>${bank.questions.length}<small> disponíveis</small></strong></div></article><article><span class="stat-icon">${icon('layers')}</span><div><span>Cobertura da prova</span><strong>2<small> domínios · 7 temas</small></strong></div></article><article><span class="stat-icon">${icon('check')}</span><div><span>Sessões concluídas</span><strong>${history.length}<small> no seu navegador</small></strong></div></article></section>` +
    `<div class="content-grid"><section><div class="section-title"><h2>O que cai na prova</h2><button class="text-button" data-view="topics">Explorar temas ${icon('arrow', 16)}</button></div><div class="domains">${domainCards()}</div><div class="info-line">${icon('layers', 16)} Pesos alinhados ao guia oficial. Subtemas sem peso individual publicado.</div><section class="formats"><div class="section-title"><h2>Mais de uma forma de pensar</h2><span class="muted">5 interações preparadas</span></div><div class="format-grid">${[['A', 'Escolha única', 'Uma alternativa correta'], ['☑', 'Múltiplas respostas', 'Seleção de várias opções'], ['↔', 'Associação de itens', 'Conecte cada conceito'], ['≡', 'Estudo de caso', 'Analise um contexto extenso'], ['Py', 'Complete o código', 'Python com lacunas e seletores']].map(([symbol, name, text]) => `<div><span class="format-icon">${symbol}</span><strong>${name}</strong><small>${text}</small></div>`).join('')}</div></section></section><section class="config-card" id="configure"><div class="config-heading">${icon('bolt')}<h2>Seu próximo simulado</h2></div><p>Defina o ritmo da sua preparação.</p><form id="settings-form"><label for="count">Quantidade de questões</label><input id="count" name="count" type="number" min="1" max="${bank.questions.length}" required value="${settings.count}"><label for="minutes">Tempo de sessão <span>em minutos</span></label><input id="minutes" name="minutes" type="number" min="1" max="240" required value="${settings.minutes}"><label for="difficulty">Dificuldade</label><select name="difficulty" id="difficulty">${[['all', 'Todas as dificuldades'], ['hard', 'Difícil'], ['medium', 'Intermediária'], ['easy', 'Fácil']].map(([v, title]) => `<option value="${v}" ${settings.difficulty === v ? 'selected' : ''}>${title}</option>`).join('')}</select><div class="allocation"><span>DISTRIBUIÇÃO PREVISTA</span>${allocations.map((r, i) => `<div><span><i class="allocation-dot d${i}"></i>${i === 0 ? 'Conceitos de IA' : 'Microsoft Foundry'}</span><strong>${r.count}</strong></div>`).join('')}</div>${!ready ? '<div class="empty-note"><span class="small-dot"></span> As questões desta versão estão indisponíveis.</div>' : ''}<button class="primary-button" type="submit">${ready ? 'Iniciar simulado' : 'Verificar disponibilidade'} ${icon('arrow', 18)}</button><p class="fine-print">Questões autorais incluídas nesta versão.</p></form>${hasActiveSession ? '<button class="resume-button" data-action="resume">Retomar sessão em andamento →</button>' : ''}</section></div>`);
}
function topics() {
  shell(heading('MAPA DE CONHECIMENTO', 'Os temas da sua preparação<span class="green">.</span>', 'Organização baseada nos objetivos oficiais vigentes desde 15 de abril de 2026.') + `<div class="topic-domains">${exam.domains.map((d, i) => `<section class="panel"><div class="topic-header"><span class="domain-number">0${i + 1}</span><h2>${esc(d.title)}</h2><span class="pill">${d.minPercent}–${d.maxPercent}%</span></div>${d.topics.map(t => `<article class="topic-row"><span>${icon('check', 17)}</span><div><h3>${esc(t.title)}</h3><p>${esc(t.description)}</p></div><span class="topic-count">${bank.questions.filter(q => q.topicId === t.id).length} questões</span></article>`).join('')}</section>`).join('')}</div><div class="source-note">Os percentuais são oficiais por domínio. A aplicação usa os pontos médios para distribuir questões inteiras. <a href="${exam.sourceUrl}" target="_blank" rel="noopener noreferrer">Consultar Microsoft Learn ↗</a></div>`);
}
function historyView() {
  shell(heading('SUA JORNADA', 'Cada sessão deixa um aprendizado<span class="green">.</span>', 'Resultados salvos localmente. O percentual de acertos é uma métrica de estudo.') + (history.length ? `<div class="history-list">${history.map((s, i) => { const result = scoreSession(s, exam); return `<article class="history-row"><div class="stat-icon">${icon('clock')}</div><div><h3>Simulado ${new Date(s.finishedAt).toLocaleDateString('pt-BR')}</h3><p>${result.total} questões · ${result.correct} acertos</p></div><strong>${result.percent}%</strong><button class="secondary-button" data-history="${i}">Revisar sessão</button></article>`; }).join('')}</div><button class="text-button" data-action="export-history">Exportar histórico JSON</button>` : `<section class="upload-panel"><span class="big-icon">${icon('clock', 34)}</span><h2>Seu primeiro simulado começa aqui.</h2><p>As sessões concluídas aparecerão aqui, com resultados e revisão das respostas.</p><button class="primary-button" data-view="overview">Preparar uma sessão ${icon('arrow', 18)}</button></section>`));
}
function answerLabel(q, a) { if (q.type === 'code') return q.blanks.map(b => `${b.label}: ${b.options.find(o => o.id === a?.[b.id])?.text || 'Sem resposta'}`).join(' · '); return q.type === 'matching' ? q.left.map(l => `${l.text} → ${q.right.find(r => r.id === a?.[l.id])?.text || 'Sem resposta'}`).join('\n') : (a || []).map(id => q.options.find(o => o.id === id)?.text || '').join('; ') || 'Sem resposta'; }
const statusLabels = { correct: 'Correta', incorrect: 'Incorreta', unanswered: 'Sem resposta' };
const statusMarks = { correct: '✓', incorrect: '×', unanswered: '—' };
function statusBadge(status) { return `<span class="review-status ${status}">${statusMarks[status]} ${statusLabels[status]}</span>`; }
function comparison(q, answer) {
  if (q.type === 'code' || q.type === 'matching') {
    const items = q.type === 'code' ? q.blanks : q.left;
    return `<div class="review-pairs">${items.map(item => {
      const options = q.type === 'code' ? item.options : q.right;
      const mine = options.find(o => o.id === answer?.[item.id])?.text || 'Sem resposta';
      const correct = options.find(o => o.id === q.answer[item.id]).text;
      const ok = answer?.[item.id] === q.answer[item.id];
      return `<div class="review-pair"><strong>${esc(q.type === 'code' ? item.label : item.text)}</strong><div class="answer-comparison"><div class="your-answer ${ok ? 'correct' : 'incorrect'}"><small>Sua resposta ${ok ? '✓' : '×'}</small><span>${esc(mine)}</span></div><div class="correct-answer"><small>Gabarito ✓</small><span>${esc(correct)}</span></div></div></div>`;
    }).join('')}</div>`;
  }
  return `<div class="answer-comparison"><div class="your-answer ${isCorrect(q, answer) ? 'correct' : 'incorrect'}"><small>Sua resposta</small><span>${esc(answerLabel(q, answer))}</span></div><div class="correct-answer"><small>Gabarito ✓</small><span>${esc(answerLabel(q, q.answer))}</span></div></div>`;
}
function codeQuestion(q, answer, completed) {
  const code = esc(q.code).replace(/\{\{([a-z][a-z0-9_]*)\}\}/g, (_, id) => {
    const blank = q.blanks.find(b => b.id === id);
    const state = completed ? (answer?.[id] === q.answer[id] ? 'correct' : 'incorrect') : '';
    return `<select class="code-blank ${state}" data-codeblank="${esc(id)}" aria-label="${esc(blank.label)}" ${completed ? 'disabled' : ''}><option value="">[ ${esc(blank.label)} ]</option>${blank.options.map(o => `<option value="${esc(o.id)}" ${answer?.[id] === o.id ? 'selected' : ''}>${esc(o.text)}</option>`).join('')}</select>`;
  });
  const correct = q.code.replace(/\{\{([a-z][a-z0-9_]*)\}\}/g, (_, id) => q.blanks.find(b => b.id === id).options.find(o => o.id === q.answer[id]).text);
  return `<div class="code-question"><p class="muted">${completed ? 'Suas escolhas nas lacunas aparecem abaixo.' : 'Complete todas as lacunas. O código é apresentado para leitura.'}</p><div class="code-heading">Python · ${q.blanks.length} lacuna(s)</div><pre class="code-editor"><code>${code}</code></pre>${completed ? `${comparison(q, answer)}<details class="correct-code" ${isCorrect(q, answer) ? '' : 'open'}><summary>Ver código completo do gabarito</summary><pre class="code-editor"><code>${esc(correct)}</code></pre></details>` : ''}</div>`;
}
function filteredReview() { return reviewEntries(session, reviewFilter, reviewQuery, reviewTopic); }
function openReview(filter = 'all') {
  reviewFilter = filter; reviewQuery = ''; reviewTopic = 'all'; view = 'review'; reviewView();
}
function reviewToolbar() {
  const counts = Object.fromEntries(['correct', 'incorrect', 'unanswered'].map(key => [key, reviewEntries(session, key).length]));
  const filters = [['errors', 'Erros e pendentes', counts.incorrect + counts.unanswered], ['incorrect', 'Incorretas', counts.incorrect], ['unanswered', 'Sem resposta', counts.unanswered], ['correct', 'Corretas', counts.correct], ['flagged', 'Marcadas', session.flagged.length], ['all', 'Todas', session.questions.length]];
  return `<section class="panel review-toolbar"><div class="review-filters" role="group" aria-label="Filtrar revisão">${filters.map(([id, label, count]) => `<button data-reviewfilter="${id}" class="review-filter ${reviewFilter === id ? 'active' : ''}" aria-pressed="${reviewFilter === id}">${label} <strong>${count}</strong></button>`).join('')}</div><div class="review-controls"><label>Buscar questão<input type="search" id="review-query" aria-label="Buscar questão" placeholder="Número, ID ou trecho do enunciado" value="${esc(reviewQuery)}"></label><label>Tema<select id="review-topic" aria-label="Tema"><option value="all">Todos os temas</option>${exam.domains.flatMap(d => d.topics).map(t => `<option value="${esc(t.id)}" ${reviewTopic === t.id ? 'selected' : ''}>${esc(t.title)}</option>`).join('')}</select></label></div></section>`;
}
function reviewView() {
  if (!session || session.status !== 'completed') { view = 'overview'; overview(); return; }
  const entries = filteredReview();
  shell(heading('REVISÃO DA SESSÃO', 'Encontre o que precisa revisar.', 'Filtre os erros e compare suas escolhas com o gabarito, sem abrir cada questão.', '<button class="secondary-button" data-action="results">Ver resultado</button>') + reviewToolbar() + `<p class="review-total" role="status">${entries.length} questão(ões) nesta seleção</p><div class="review-list">${entries.map(({q, index, status}) => `<article class="panel review-card" data-reviewcard="${esc(q.id)}"><div class="review-card-meta"><strong>Questão ${index + 1} <small>${esc(q.id)}</small></strong>${statusBadge(status)}</div><p class="eyebrow">${esc(TYPES[q.type])} · ${esc(exam.domains.flatMap(d => d.topics).find(t => t.id === q.topicId)?.title)}</p><h2>${esc(q.prompt)}</h2>${comparison(q, session.answers[q.id])}<div class="review-card-actions"><details><summary>Entender a resposta</summary><p>${esc(q.explanation)}</p>${q.references.map(r => `<a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">${esc(r.title)} ↗</a>`).join(' · ')}</details><button class="secondary-button" data-index="${index}">Abrir questão ${index + 1} →</button></div></article>`).join('') || '<section class="panel review-empty"><h2>Nenhuma questão nesta seleção.</h2><p>Troque o filtro, o tema ou o termo de busca.</p><button class="secondary-button" data-action="review-all">Mostrar todas</button></section>'}</div>`);
}
function questionOptions(q, answer, completed) {
  return `<div class="options">${q.options.map((o, i) => {
    const chosen = answer?.includes(o.id);
    const correct = completed && q.answer.includes(o.id);
    const wrong = completed && chosen && !correct;
    const badge = completed && (correct || chosen) ? `<span class="option-feedback">${correct ? '✓ Correta' : '× Sua resposta'}${correct && chosen ? ' · Você marcou' : correct && q.type === 'multiple' ? ' · Não marcada' : ''}</span>` : '';
    return `<label class="option ${chosen ? 'selected' : ''} ${correct ? 'answer-correct' : ''} ${wrong ? 'answer-wrong' : ''}"><input type="${q.type === 'multiple' ? 'checkbox' : 'radio'}" name="answer" value="${esc(o.id)}" ${chosen ? 'checked' : ''} ${completed ? 'disabled' : ''}><span class="option-letter">${String.fromCharCode(65 + i)}</span><span class="option-content">${esc(o.text)}${badge}</span></label>`;
  }).join('')}</div>`;
}
function sessionView() {
  if (!session) { view = 'overview'; overview(); return; }
  const q = session.questions[session.index];
  const completed = session.status === 'completed';
  const paused = isTimerPaused(session);
  const timerControls = `<div class="timer-controls"><span class="timer ${paused ? 'timer-paused' : ''}" id="timer">${completed ? 'Concluído' : remaining()}</span>${completed ? '' : `<button class="secondary-button timer-toggle" data-action="toggle-timer" aria-pressed="${paused}">${paused ? 'Retomar tempo' : 'Pausar tempo'}</button>`}</div>`;
  const answered = session.questions.filter(q => isAnswered(q, session.answers[q.id])).length;
  const answer = session.answers[q.id];
  const domain = exam.domains.find(d => d.id === q.domainId);
  const entries = completed ? filteredReview() : session.questions.map((q, index) => ({q, index}));
  const position = entries.findIndex(e => e.index === session.index);
  const state = reviewStatus(q, answer);
  const interaction = q.type === 'code' ? codeQuestion(q, answer, completed) : q.type === 'matching' ? `<p class="muted">Associe cada item. Os destinos podem se repetir.</p><div class="matching">${q.left.map(l => `<label><span>${esc(l.text)}</span><select data-match="${esc(l.id)}" ${completed ? 'disabled' : ''}><option value="">Selecione um destino</option>${q.right.map(r => `<option value="${esc(r.id)}" ${answer?.[l.id] === r.id ? 'selected' : ''}>${esc(r.text)}</option>`).join('')}</select></label>`).join('')}</div>${completed ? comparison(q, answer) : ''}` : questionOptions(q, answer, completed);
  shell(heading(completed ? 'REVISÃO DA SESSÃO' : 'SESSÃO EM ANDAMENTO', completed ? 'Entenda cada decisão.' : 'Uma questão de cada vez.', completed ? `${position + 1} de ${entries.length} nesta seleção` : `${answered} de ${session.questions.length} respondidas`, timerControls) + (completed ? '<button class="text-button review-back" data-action="review-list">← Voltar à lista de revisão</button>' : '') + (paused ? '<div class="pause-notice" role="status">Tempo pausado. Use “Retomar tempo” para continuar a contagem. Suas respostas continuam salvas.</div>' : '') + `<div class="exam-layout"><section class="panel question-card"><div class="question-meta"><span class="pill">${esc(TYPES[q.type])}</span><span>${session.index + 1} / ${session.questions.length}</span>${completed ? statusBadge(state) : ''}</div><p class="eyebrow">${esc(domain.title)} · ${esc(q.id)}</p>${q.context ? `<details class="case-context" ${completed ? '' : 'open'}><summary>Contexto do cenário</summary><div>${esc(q.context)}</div></details>` : ''}<h2 class="question-prompt">${esc(q.prompt)}</h2>${q.type === 'multiple' ? `<p class="muted">Selecione ${q.selectCount} alternativas.</p>` : ''}${interaction}${completed ? `<div class="explanation"><strong>${state === 'correct' ? 'Resposta correta' : state === 'unanswered' ? 'Sem resposta' : 'Resposta incorreta'}</strong><p>${esc(q.explanation)}</p><div>${q.references.map(r => `<a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">${esc(r.title)} ↗</a>`).join(' · ')}</div></div>` : `<button class="text-button flag-button" data-action="flag">${icon('flag', 17)} ${session.flagged.includes(q.id) ? 'Marcada para revisão' : 'Marcar para revisão'}</button>`}<div class="question-navigation"><button class="secondary-button" data-action="previous" ${position <= 0 ? 'disabled' : ''}>← Anterior</button><button class="primary-button" data-action="next" ${position === entries.length - 1 ? 'disabled' : ''}>Próxima ${icon('arrow', 18)}</button></div></section><aside class="panel question-map"><h2>${completed ? 'Mapa desta seleção' : 'Mapa de questões'}</h2><div class="question-dots">${entries.map(({q: item, index: i}) => {
    const status = completed ? reviewStatus(item, session.answers[item.id]) : '';
    return `<button aria-label="Questão ${i + 1}${completed ? ', ' + statusLabels[status] : ''}${session.flagged.includes(item.id) ? ', marcada' : ''}" title="${completed ? statusLabels[status] : 'Questão ' + (i + 1)}" class="${i === session.index ? 'current' : ''} ${!completed && isAnswered(item, session.answers[item.id]) ? 'answered' : ''} ${completed ? 'review-' + status : ''} ${session.flagged.includes(item.id) ? 'flagged' : ''}" data-index="${i}">${i + 1}${completed ? `<small>${statusMarks[status]}</small>` : ''}</button>`;
  }).join('')}</div><p class="fine-print">${completed ? '✓ Correta · × Incorreta · — Sem resposta' : 'Verde: respondida · Ponto: marcada'}</p>${completed ? '<button class="secondary-button" data-action="review-list">Lista de revisão</button><button class="primary-button" data-action="results">Ver resultado</button>' : `<p class="fine-print">Pause o tempo antes de sair para interromper a contagem. A pausa é mantida ao fechar ou recarregar a página.</p>${finalizeRequested ? `<div class="empty-note">${session.questions.length - answered} questão(ões) sem resposta completa. Encerrar agora?</div><button class="primary-button" data-action="confirm-finish">Confirmar encerramento</button><button class="text-button" data-action="cancel-finish">Continuar respondendo</button>` : '<button class="primary-button" data-action="finish">Finalizar simulado</button>'}`}</aside></div>`);
}
function moveQuestion(delta) {
  const indices = session.status === 'completed' ? filteredReview().map(e => e.index) : session.questions.map((_, i) => i);
  const next = indices[indices.indexOf(session.index) + delta];
  if (next === undefined) return;
  session.index = next; if (!reviewing) persist(); sessionView();
}
function results() {
  const score = scoreSession(session, exam);
  const errors = reviewEntries(session, 'incorrect').length;
  const unanswered = reviewEntries(session, 'unanswered').length;
  shell(heading('SESSÃO CONCLUÍDA', 'Um novo ponto de partida<span class="green">.</span>', 'Use os resultados para orientar sua próxima sessão de estudos.') + `<section class="panel results"><div class="score-circle">${score.percent}<small>% de acertos</small></div><h2>${score.correct} de ${score.total} questões corretas</h2><div class="result-breakdown"><span>✓ ${score.correct} corretas</span><span>× ${errors} incorretas</span><span>— ${unanswered} sem resposta</span></div><p>Meta de estudo: ${exam.practiceTargetPercent}%. ${score.percent >= exam.practiceTargetPercent ? 'Meta atingida nesta sessão.' : 'Revise as justificativas para avançar.'}</p><p class="fine-print">Este percentual não equivale à nota escalonada ou à aprovação no exame Microsoft.</p><div class="results-domains">${score.domains.map(d => `<div><span>${esc(d.title)}</span><strong>${d.correct}/${d.total}</strong></div>`).join('')}</div><div class="button-row">${errors + unanswered ? `<button class="primary-button" data-action="review-errors">Revisar erros e pendentes (${errors + unanswered}) ${icon('arrow', 18)}</button>` : ''}<button class="${errors + unanswered ? 'secondary-button' : 'primary-button'}" data-action="review">Revisar respostas ${icon('arrow', 18)}</button><button class="text-button" data-view="overview">Voltar ao início</button></div></section>`);
}
function remaining() { const seconds = Math.max(0, Math.ceil(remainingTime(session) / 1000)); return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`; }
function finish() {
  session.status = 'completed'; session.pausedAt = null; session.finishedAt = Date.now();
  if (!history.some(h => h.id === session.id)) history = [structuredClone(session), ...history].slice(0, 30);
  if (!write('history', history)) notice = 'Não foi possível salvar o histórico. Você ainda pode revisar esta sessão.';
  persist(); finalizeRequested = false; view = 'results'; results();
}
function render() {
  if (isSessionExpired(session)) { finish(); return; }
  ({ overview, topics, history: historyView, session: sessionView, review: reviewView, results })[view]();
}
root.addEventListener('click', e => {
  const target = e.target.closest('button, a[data-view]');
  if (!target) return;
  if (target.dataset.view) { e.preventDefault(); view = target.dataset.view; notice = ''; render(); return; }
  if (target.dataset.reviewfilter) { reviewFilter = target.dataset.reviewfilter; view = 'review'; reviewView(); return; }
  if (target.dataset.index !== undefined) { session.index = Number(target.dataset.index); view = 'session'; if (!reviewing) persist(); sessionView(); return; }
  if (target.dataset.history !== undefined) { session = structuredClone(history[Number(target.dataset.history)]); reviewing = true; view = 'results'; results(); return; }
  const actions = {
    dismiss: () => { notice = ''; render(); }, configure: () => { document.getElementById('configure')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); document.getElementById('count')?.focus({ preventScroll: true }); },
    'export-history': () => download('ai901-history.json', history),
    resume: () => { session = read('session', session); reviewing = false; view = 'session'; render(); },
    'toggle-timer': () => {
      if (isSessionExpired(session)) { finish(); return; }
      const changed = isTimerPaused(session) ? resumeTimer(session) : pauseTimer(session);
      if (!changed) return;
      persist(); sessionView(); root.querySelector('[data-action="toggle-timer"]')?.focus({ preventScroll: true });
    },
    previous: () => moveQuestion(-1), next: () => moveQuestion(1),
    flag: () => { const id = session.questions[session.index].id; session.flagged = session.flagged.includes(id) ? session.flagged.filter(i => i !== id) : [...session.flagged, id]; persist(); sessionView(); },
    finish: () => { finalizeRequested = true; sessionView(); }, 'cancel-finish': () => { finalizeRequested = false; sessionView(); }, 'confirm-finish': finish,
    results: () => { view = 'results'; results(); }, review: () => openReview('all'), 'review-errors': () => openReview('errors'), 'review-all': () => openReview('all'), 'review-list': () => { view = 'review'; reviewView(); }
  };
  actions[target.dataset.action]?.();
});
root.addEventListener('submit', e => {
  if (e.target.id !== 'settings-form') return; e.preventDefault();
  const data = new FormData(e.target); settings = { count: Number(data.get('count')), minutes: Number(data.get('minutes')), difficulty: data.get('difficulty') };
  try {
    const existing = read('session', null);
    if (existing?.status === 'active' && !isSessionExpired(existing)) { session = existing; notice = 'Há uma sessão em andamento. Retome e finalize antes de iniciar outra.'; overview(); return; }
    session = createSession(bank, exam, settings); reviewing = false; persist(); view = 'session'; render();
  } catch (error) { notice = error.message; overview(); }
});
root.addEventListener('change', e => {
  if (e.target.id === 'review-topic') { reviewTopic = e.target.value; reviewView(); return; }
  if (e.target.closest('#settings-form')) {
    const form = document.getElementById('settings-form'); const data = new FormData(form);
    settings = { count: Number(data.get('count')), minutes: Number(data.get('minutes')), difficulty: data.get('difficulty') };
    const allocation = root.querySelector('.allocation');
    allocation.innerHTML = `<span>DISTRIBUIÇÃO PREVISTA</span>${plan().map((r, i) => `<div><span><i class="allocation-dot d${i}"></i>${i === 0 ? 'Conceitos de IA' : 'Microsoft Foundry'}</span><strong>${r.count}</strong></div>`).join('')}`;
  } else if (session?.status === 'active' && (e.target.name === 'answer' || e.target.dataset.match || e.target.dataset.codeblank)) {
    if (isSessionExpired(session)) { finish(); return; }
    const q = session.questions[session.index];
    const codeblank = e.target.dataset.codeblank;
    if (codeblank) session.answers[q.id] = { ...session.answers[q.id], [codeblank]: e.target.value };
    else if (e.target.dataset.match) session.answers[q.id] = { ...session.answers[q.id], [e.target.dataset.match]: e.target.value };
    else {
      const selected = [...root.querySelectorAll('input[name="answer"]:checked')].map(i => i.value);
      if (q.type === 'multiple' && selected.length > q.selectCount) { e.target.checked = false; notice = `Selecione apenas ${q.selectCount} alternativas.`; sessionView(); return; }
      session.answers[q.id] = selected;
    }
    persist(); sessionView();
    if (codeblank) root.querySelector(`[data-codeblank="${codeblank}"]`)?.focus({ preventScroll: true });
  }
});
setInterval(() => {
  if (session?.status !== 'active' || reviewing) return;
  if (isSessionExpired(session)) { finish(); return; }
  const timer = document.getElementById('timer'); if (timer) timer.textContent = remaining();
}, 1000);
render();

root.addEventListener('input', e => {
  if (e.target.id !== 'review-query') return;
  reviewQuery = e.target.value;
  const position = e.target.selectionStart;
  reviewView();
  const search = document.getElementById('review-query');
  search.focus({ preventScroll: true }); search.setSelectionRange(position, position);
});
