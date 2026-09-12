import sys, json

sys.stdout.reconfigure(encoding='utf-8')

from build_hanja_dataset import parse_glossika_md
from loanword_translations import LOANWORD_TRANSLATIONS

syllables, hanja_words, loanwords = parse_glossika_md()

missing = []
for item in loanwords:
    k = item['k']
    e = item['e']
    c = item['c']
    if c == e or not c:
        missing.append((k, e))

print(f"Total loanwords: {len(loanwords)}")
print(f"Missing Chinese translations: {len(missing)}")
for idx, (k, e) in enumerate(missing, 1):
    print(f"{idx}: '{k}': '{e}'")
