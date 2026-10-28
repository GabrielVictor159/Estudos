"""Valida sintaxe dos gabaritos Python sem executar os trechos nem chamar serviços."""
import ast
import json
import re
import argparse
from pathlib import Path

parser = argparse.ArgumentParser()
parser.add_argument('--bank', type=Path, default=Path(__file__).resolve().parent.parent / 'public/data/questions.json')
parser.add_argument('--allow-small', action='store_true')
args = parser.parse_args()
bank = json.loads(args.bank.read_text(encoding='utf-8'))
count = 0
distractors = 0
for question in bank['questions']:
    if question['type'] != 'code':
        continue
    choices = {b['id']: next(o['text'] for o in b['options'] if o['id'] == question['answer'][b['id']]) for b in question['blanks']}
    code = re.sub(r'\{\{([a-z][a-z0-9_]*)\}\}', lambda m: choices[m[1]], question['code'])
    ast.parse(code, filename=question['id'])
    # Um distrator não deve poder ser eliminado apenas por quebrar a sintaxe.
    for blank in question['blanks']:
        for option in blank['options']:
            if option['id'] == question['answer'][blank['id']]:
                continue
            trial = {**choices, blank['id']: option['text']}
            candidate = re.sub(r'\{\{([a-z][a-z0-9_]*)\}\}', lambda m: trial[m[1]], question['code'])
            ast.parse(candidate, filename=f"{question['id']}/{blank['id']}/{option['id']}")
            distractors += 1
    count += 1
assert args.allow_small or count >= 100, 'São necessárias pelo menos 100 questões Python no banco distribuído.'
print(f'{count} gabaritos e {distractors} distratores Python com sintaxe válida; nenhum trecho foi executado.')
