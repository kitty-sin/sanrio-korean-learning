import sys, os, json, re

sys.stdout.reconfigure(encoding='utf-8')

SOURCE_MD = r"C:\Users\PC\Desktop\korean-learning\Glossika_韓文漢字對照工具書.md"

with open(SOURCE_MD, 'r', encoding='utf-8') as f:
    lines = f.readlines()

part3_lines = []
cur_part = 0
for line in lines:
    l = line.strip()
    if '## 第三部分' in l:
        cur_part = 3
        continue
    if cur_part == 3:
        part3_lines.append(l)

loans = []
for l in part3_lines:
    if l.startswith('|') and not l.startswith('| :') and not l.startswith('| 英文'):
        parts = [p.strip() for p in l.split('|')[1:-1]]
        if len(parts) >= 3:
            eng = parts[0]
            k = re.sub(r'\*+', '', parts[1]).strip()
            ipa = parts[2]
            loans.append((k, eng, ipa))

print(f"Total loanwords extracted: {len(loans)}")
for idx, (k, eng, ipa) in enumerate(loans, 1):
    print(f"{idx}: {k} | {eng} | {ipa}")
