export const TYPES = { single: 'Escolha única', multiple: 'Múltiplas respostas', matching: 'Associação de itens', case: 'Estudo de caso', code: 'Complete o código Python' };
const nonempty = value => typeof value === 'string' && value.trim().length > 0;
const uniqueIds = items => Array.isArray(items) && items.length >= 2 && items.every(i => i && nonempty(i.id) && nonempty(i.text)) && new Set(items.map(i => i.id)).size === items.length;

export function validateBank(bank, exam) {
  const errors = [];
  if (!bank || bank.schemaVersion !== 1 || bank.examId !== exam.id || bank.blueprintVersion !== exam.blueprintVersion || !Array.isArray(bank.questions)) return ['Banco incompatível: confira schemaVersion, examId, blueprintVersion e questions.'];
  const ids = new Set();
  bank.questions.forEach((q, index) => {
    const prefix = `Questão ${index + 1}`;
    if (!q || typeof q !== 'object') { errors.push(`${prefix}: objeto inválido.`); return; }
    const fail = message => errors.push(`${prefix} (${q.id || 'sem ID'}): ${message}`);
    if (!nonempty(q.id) || ids.has(q.id)) fail('ID ausente ou duplicado.'); ids.add(q.id);
    const domain = exam.domains.find(d => d.id === q.domainId);
    if (!domain?.topics.some(t => t.id === q.topicId)) fail('domínio ou tema inválido.');
    if (!Object.hasOwn(TYPES, q.type)) fail('tipo de interação inválido.');
    if (!['easy', 'medium', 'hard'].includes(q.difficulty)) fail('dificuldade inválida.');
    if (!nonempty(q.prompt) || !nonempty(q.explanation)) fail('enunciado e justificativa são obrigatórios.');
    if (!Array.isArray(q.references) || !q.references.length || q.references.some(r => !r || !nonempty(r.title) || !/^https:\/\//.test(r.url))) fail('informe referências HTTPS com título.');
    if (q.context !== undefined && !nonempty(q.context)) fail('contexto deve ser um texto não vazio.');
    if (q.type === 'code') {
      const blanks = q.blanks;
      if (!nonempty(q.code) || !Array.isArray(blanks) || !blanks.length) { fail('código e lacunas são obrigatórios.'); return; }
      const ids = blanks.map(b => b?.id);
      const slots = [...q.code.matchAll(/\{\{([a-z][a-z0-9_]*)\}\}/g)].map(m => m[1]);
      if (new Set(ids).size !== ids.length || blanks.some(b => !b || !/^[a-z][a-z0-9_]*$/.test(b.id) || !nonempty(b.label) || !uniqueIds(b.options))) fail('lacunas exigem IDs únicos, rótulo e alternativas válidas.');
      if (slots.length !== ids.length || ids.some(id => slots.filter(s => s === id).length !== 1) || /\{\{/.test(q.code.replace(/\{\{([a-z][a-z0-9_]*)\}\}/g, ''))) fail('cada lacuna deve aparecer uma vez no código, sem marcadores extras.');
      if (!q.answer || typeof q.answer !== 'object' || Array.isArray(q.answer) || Object.keys(q.answer).length !== ids.length || blanks.some(b => !Array.isArray(b?.options) || !b.options.some(o => o?.id === q.answer[b.id]))) fail('gabarito das lacunas inválido.');
    } else if (q.type === 'matching') {
      if (!uniqueIds(q.left) || !uniqueIds(q.right)) fail('associação exige listas com ao menos dois itens e IDs únicos.');
      if (!q.answer || typeof q.answer !== 'object' || Array.isArray(q.answer) || !q.left?.every(i => q.right?.some(r => r.id === q.answer[i.id])) || Object.keys(q.answer).length !== q.left?.length) fail('mapeamento de respostas inválido.');
    } else if (Object.hasOwn(TYPES, q.type)) {
      if (!uniqueIds(q.options)) fail('informe ao menos duas alternativas com IDs únicos.');
      if (!Array.isArray(q.answer) || !q.answer.length || new Set(q.answer).size !== q.answer.length || !q.answer.every(id => q.options?.some(o => o.id === id))) fail('respostas inválidas.');
      if (q.type !== 'multiple' && q.answer?.length !== 1) fail('este tipo exige uma resposta.');
      if (q.type === 'multiple' && (!Number.isInteger(q.selectCount) || q.selectCount < 2 || q.selectCount !== q.answer?.length || q.selectCount >= (q.options?.length || 0))) fail('selectCount deve corresponder às respostas e deixar ao menos um distrator.');
      if (q.type === 'case' && !nonempty(q.context)) fail('estudo de caso exige contexto.');
    }
  });
  return errors;
}

export function allocateCounts(total, domains) {
  if (!Number.isSafeInteger(total) || total < 1) throw new Error('Escolha uma quantidade inteira positiva de questões.');
  const sum = domains.reduce((n, d) => n + d.weight, 0);
  const rows = domains.map(d => { const raw = total * d.weight / sum; return { domainId: d.id, count: Math.floor(raw), fraction: raw % 1 }; });
  let remainder = total - rows.reduce((n, d) => n + d.count, 0);
  for (const row of [...rows].sort((a, b) => b.fraction - a.fraction)) if (remainder-- > 0) row.count++;
  return rows.map(({ domainId, count }) => ({ domainId, count }));
}

export function shuffle(items, random = Math.random) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [result[i], result[j]] = [result[j], result[i]]; }
  return result;
}

export function createSession(bank, exam, settings, random = Math.random) {
  const errors = validateBank(bank, exam);
  if (errors.length) throw new Error(errors.join('\n'));
  if (!Number.isInteger(settings.minutes) || settings.minutes < 1 || settings.minutes > 240) throw new Error('Escolha de 1 a 240 minutos.');
  if (!['all', 'easy', 'medium', 'hard'].includes(settings.difficulty)) throw new Error('Dificuldade inválida.');
  const allocation = allocateCounts(settings.count, exam.domains);
  for (const row of allocation) {
    const d = exam.domains.find(d => d.id === row.domainId);
    const percent = row.count * 100 / settings.count;
    if (percent < d.minPercent || percent > d.maxPercent) throw new Error('Essa quantidade não permite respeitar as faixas oficiais. Escolha outra quantidade (por exemplo, 20 ou 40).');
  }
  const selected = allocation.flatMap(({ domainId, count }) => {
    const pool = bank.questions.filter(q => q.domainId === domainId && (settings.difficulty === 'all' || q.difficulty === settings.difficulty));
    if (pool.length < count) throw new Error(`Banco insuficiente em ${exam.domains.find(d => d.id === domainId).title}: ${pool.length} disponíveis de ${count} necessárias. Escolha uma quantidade menor ou outra dificuldade.`);
    return shuffle(pool, random).slice(0, count).map(q => ({ ...q, ...(q.options ? { options: shuffle(q.options, random) } : {}), ...(q.right ? { right: shuffle(q.right, random) } : {}), ...(q.blanks ? { blanks: q.blanks.map(b => ({ ...b, options: shuffle(b.options, random) })) } : {}) }));
  });
  const now = Date.now();
  return { id: globalThis.crypto.randomUUID(), examId: exam.id, blueprintVersion: exam.blueprintVersion, startedAt: now, deadline: now + settings.minutes * 60000, settings, questions: shuffle(selected, random), answers: {}, flagged: [], index: 0, status: 'active' };
}

export function isCorrect(question, answer) {
  if (question.type === 'code') return !!answer && question.blanks.every(b => answer[b.id] === question.answer[b.id]);
  if (question.type === 'matching') return !!answer && question.left.every(i => answer[i.id] === question.answer[i.id]);
  return Array.isArray(answer) && answer.length === question.answer.length && question.answer.every(id => answer.includes(id));
}

export function isTimerPaused(session) {
  return session?.status === 'active' && Number.isFinite(session.pausedAt);
}
export function remainingTime(session, now = Date.now()) {
  return Math.max(0, session.deadline - (isTimerPaused(session) ? session.pausedAt : now));
}
export function isSessionExpired(session, now = Date.now()) {
  return session?.status === 'active' && remainingTime(session, now) <= 0;
}
export function pauseTimer(session, now = Date.now()) {
  if (session?.status !== 'active' || isTimerPaused(session) || isSessionExpired(session, now)) return false;
  session.pausedAt = now;
  return true;
}
export function resumeTimer(session, now = Date.now()) {
  if (!isTimerPaused(session)) return false;
  session.deadline += Math.max(0, now - session.pausedAt);
  session.pausedAt = null;
  return true;
}
export function isAnswered(question, answer) {
  if (question.type === 'code') return !!answer && question.blanks.every(b => b.options.some(o => o.id === answer[b.id]));
  return question.type === 'matching' ? !!answer && question.left.every(i => !!answer[i.id]) : Array.isArray(answer) && answer.length === (question.type === 'multiple' ? question.selectCount : 1);
}
export function scoreSession(session, exam) {
  const correct = session.questions.filter(q => isCorrect(q, session.answers[q.id])).length;
  return { correct, total: session.questions.length, percent: Math.round(correct / session.questions.length * 100), domains: exam.domains.map(d => { const qs = session.questions.filter(q => q.domainId === d.id); return { ...d, total: qs.length, correct: qs.filter(q => isCorrect(q, session.answers[q.id])).length }; }) };
}

export function reviewStatus(question, answer) {
  if (isCorrect(question, answer)) return 'correct';
  const attempted = Array.isArray(answer) ? answer.length > 0 : answer && Object.values(answer).some(Boolean);
  return attempted ? 'incorrect' : 'unanswered';
}
export function reviewEntries(session, filter = 'all', query = '', topic = 'all') {
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
  const term = normalize(query.trim());
  const number = /^\d+$/.test(term) ? Number(term) : null;
  return session.questions.map((q, index) => ({ q, index, status: reviewStatus(q, session.answers[q.id]) })).filter(entry => {
    const { q, index, status } = entry;
    return (filter === 'all' || (filter === 'errors' ? status !== 'correct' : filter === 'flagged' ? session.flagged.includes(q.id) : status === filter)) &&
      (topic === 'all' || q.topicId === topic) && (!term || (number !== null ? index + 1 === number : normalize(`${q.id} ${q.prompt} ${q.context || ''}`).includes(term)));
  });
}
