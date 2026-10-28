"""Exercita trechos locais/didáticos usando casos de referência explícitos.

Sem serviços externos, credenciais, SDKs Azure ou execução no navegador.
Padrão: tests/fixtures/code-403-502.json. Use --fixtures para outro lote.
"""
import ast
import argparse
import builtins
import itertools
import json
import math
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
parser = argparse.ArgumentParser()
parser.add_argument('--fixtures',type=Path,default=ROOT/'tests/fixtures/code-403-502.json')
parser.add_argument('--bank',type=Path,default=ROOT/'public/data/questions.json')
args = parser.parse_args()
bank = json.loads(args.bank.read_text(encoding='utf-8'))
checks = json.loads(args.fixtures.read_text(encoding='utf-8'))
questions = {q['id']: q for q in bank['questions']}

def equivalent(a, b):
    if isinstance(a, (int, float)) and not isinstance(a, bool) and isinstance(b, (int, float)) and not isinstance(b, bool):
        return math.isclose(a, b, rel_tol=1e-10, abs_tol=1e-10)
    if isinstance(a, dict) and isinstance(b, dict):
        return a.keys() == b.keys() and all(equivalent(a[k], b[k]) for k in a)
    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):
        return len(a) == len(b) and all(equivalent(x, y) for x, y in zip(a, b))
    return type(a) is type(b) and a == b

def restricted_import(name, globals=None, locals=None, fromlist=(), level=0):
    if name not in {'math', 'xml.sax.saxutils'} or level:
        raise ValueError('Importação não permitida neste teste local: ' + name)
    return builtins.__import__(name, globals, locals, fromlist, level)

safe_builtins = {name: getattr(builtins, name) for name in
    ['bool', 'dict', 'enumerate', 'int', 'len', 'list', 'max', 'min', 'range', 'set', 'sorted', 'sum', 'zip', 'any', 'all', 'abs', 'round', 'next', 'iter', 'tuple']}
safe_builtins['__import__'] = restricted_import
combinations = executions = 0
assert len(checks) > 0
for qid, (function, cases) in checks.items():
    question = questions[qid]
    assert question['type'] == 'code'
    survivors = []
    for selected in itertools.product(*(b['options'] for b in question['blanks'])):
        snippet = question['code']
        for blank, option in zip(question['blanks'], selected):
            snippet = snippet.replace('{{' + blank['id'] + '}}', option['text'])
        tree = ast.parse(snippet, filename=qid)
        for node in ast.walk(tree):
            assert not isinstance(node, ast.Attribute) or not node.attr.startswith('__'), 'Acesso privado não permitido.'
        combinations += 1
        namespace = {'__builtins__': safe_builtins}
        exec(compile(tree, '<local:' + qid + '>', 'exec'), namespace)
        valid = True
        for args, expected in cases:
            executions += 1
            try:
                actual = namespace[function](*args)
                valid = equivalent(actual, expected) and valid
            except Exception:
                valid = False
        if valid:
            survivors.append({b['id']: o['id'] for b, o in zip(question['blanks'], selected)})
    assert survivors == [question['answer']], (qid, 'gabarito não é a única combinação aprovada', survivors)

print(f'{len(checks)} exercícios: {combinations} combinações sintaticamente válidas e {executions} execuções locais; gabaritos únicos nos casos de teste.')
