import test from 'node:test';
import assert from 'node:assert/strict';
import {isTimerPaused, remainingTime, isSessionExpired, pauseTimer, resumeTimer} from '../src/engine.js';

test('sessões antigas continuam contando e expiram no prazo',()=>{
 const s={status:'active',deadline:60000};
 assert.equal(isTimerPaused(s),false);
 assert.equal(remainingTime(s,15000),45000);
 assert.equal(isSessionExpired(s,59999),false);
 assert.equal(isSessionExpired(s,60000),true);
 assert.equal(remainingTime(s,70000),0);
});
test('pausa congela o saldo, persiste em JSON e retoma descontando somente tempo ativo',()=>{
 let s={status:'active',deadline:60000};
 assert.equal(pauseTimer(s,15000),true);
 assert.equal(pauseTimer(s,25000),false);
 s=JSON.parse(JSON.stringify(s));
 assert.equal(isTimerPaused(s),true);
 assert.equal(remainingTime(s,135000),45000);
 assert.equal(isSessionExpired(s,135000),false);
 assert.equal(resumeTimer(s,135000),true);
 assert.equal(s.deadline,180000);
 assert.equal(resumeTimer(s,140000),false);
 assert.equal(remainingTime(s,150000),30000);
 assert.equal(pauseTimer(s,150000),true);
 assert.equal(resumeTimer(s,160000),true);
 assert.equal(s.deadline,190000);
 assert.equal(isSessionExpired(s,190000),true);
});
test('não pausa sessão encerrada ou esgotada e não revive um prazo vencido',()=>{
 for(const s of [{status:'completed',deadline:60000},{status:'active',deadline:15000}]) {
  assert.equal(pauseTimer(s,15000),false);
  assert.equal(resumeTimer(s,15000),false);
  assert.equal(s.deadline,s.status==='completed'?60000:15000);
 }
 assert.equal(isSessionExpired({status:'completed',deadline:1},10000),false);
});
