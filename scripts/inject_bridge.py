import re

files = [
    'index.html',
    'korean_vocab_dictionary.html',
    'korean_hanja_dictionary.html',
    'sanrio_korean_food_100.html'
]

bridge_tag = '<script src="./app_mobile_bridge.js"></script>'

for f in files:
    with open(f, 'r', encoding='utf-8') as fp:
        content = fp.read()
    if 'app_mobile_bridge.js' not in content:
        if '</body>' in content:
            new_content = content.replace('</body>', f'  {bridge_tag}\n</body>')
            with open(f, 'w', encoding='utf-8') as fp:
                fp.write(new_content)
            print(f'Injected bridge script into {f}')
        else:
            print(f'Warning: </body> not found in {f}')
    else:
        print(f'{f} already has bridge script')
