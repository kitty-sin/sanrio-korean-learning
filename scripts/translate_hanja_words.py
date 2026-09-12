#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
韓語漢字詞全量英文翻譯批次生成腳本
"""

import sys
import os
import json
import time
import urllib.request
import urllib.parse

sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE_PATH = os.path.join(BASE_DIR, "scripts", "hanja_translations_cache.json")
SOURCE_MD = r"C:\Users\PC\Desktop\korean-learning\Glossika_韓文漢字對照工具書.md"
VOCAB_5666_JS = os.path.join(BASE_DIR, "korean_vocab_5666_data.js")

def load_existing_vocab():
    vocab_map = {}
    if os.path.exists(VOCAB_5666_JS):
        with open(VOCAB_5666_JS, 'r', encoding='utf-8') as f:
            text = f.read()
        start = text.find('[')
        end = text.rfind(']')
        if start != -1 and end != -1:
            data = json.loads(text[start:end+1])
            for item in data:
                k = item.get('k')
                if k and k not in vocab_map:
                    vocab_map[k] = item
    return vocab_map

def get_hanja_words_needing_translation():
    with open(SOURCE_MD, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    existing_vocab = load_existing_vocab()
    words_to_translate = []
    
    part2 = False
    for line in lines:
        l = line.strip()
        if '## 第二部分' in l:
            part2 = True
            continue
        elif '## 第三部分' in l:
            break
        
        if part2 and l.startswith('|') and not l.startswith('| :') and not l.startswith('| 中文漢字詞'):
            parts = [p.strip() for p in l.split('|')[1:-1]]
            if len(parts) >= 4:
                chinese = parts[0]
                hangul = parts[2].replace('*', '').strip()
                if hangul in existing_vocab:
                    ev = existing_vocab[hangul]
                    e = ev.get('e', '')
                    if e and not e.startswith('Korean expression:'):
                        continue # 已有高質量英文
                words_to_translate.append(chinese)
                
    # 去重
    unique_words = list(dict.fromkeys(words_to_translate))
    return unique_words

def batch_translate(words, batch_size=60):
    cache = {}
    if os.path.exists(CACHE_PATH):
        try:
            with open(CACHE_PATH, 'r', encoding='utf-8') as f:
                cache = json.load(f)
            print(f"📦 已載入現有翻譯快取：{len(cache)} 筆")
        except Exception as e:
            print("讀取快取失敗：", e)
            
    untranslated = [w for w in words if w not in cache]
    print(f"🔄 尚需翻譯漢字詞：{len(untranslated)} 筆")
    
    if not untranslated:
        return cache
        
    total_batches = (len(untranslated) + batch_size - 1) // batch_size
    for i in range(0, len(untranslated), batch_size):
        batch = untranslated[i:i+batch_size]
        batch_idx = (i // batch_size) + 1
        query_text = '\n'.join(batch)
        
        url = f"https://translate.googleapis.com/translate_a/single?client=gtx&sl=zh-TW&tl=en&dt=t&q={urllib.parse.quote(query_text)}"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        
        try:
            with urllib.request.urlopen(req, timeout=15) as resp:
                data = json.loads(resp.read().decode('utf-8'))
                translated_text = ''.join([part[0] for part in data[0] if part[0]])
                translated_lines = [t.strip() for t in translated_text.split('\n')]
                
                # 若數量一致則一一匹配
                if len(translated_lines) == len(batch):
                    for w, tr in zip(batch, translated_lines):
                        cache[w] = tr
                else:
                    # 分開單個重試
                    for w in batch:
                        single_url = f"https://translate.googleapis.com/translate_a/single?client=gtx&sl=zh-TW&tl=en&dt=t&q={urllib.parse.quote(w)}"
                        single_req = urllib.request.Request(single_url, headers={'User-Agent': 'Mozilla/5.0'})
                        with urllib.request.urlopen(single_req, timeout=10) as s_resp:
                            s_data = json.loads(s_resp.read().decode('utf-8'))
                            cache[w] = ''.join([part[0] for part in s_data[0] if part[0]]).strip()
                        time.sleep(0.05)
                        
            print(f"✅ 批次 [{batch_idx}/{total_batches}] 翻譯完成 ({len(batch)} 筆)")
            
            # 定期保存快取
            if batch_idx % 5 == 0 or batch_idx == total_batches:
                with open(CACHE_PATH, 'w', encoding='utf-8') as f:
                    json.dump(cache, f, ensure_ascii=False, indent=2)
                    
            time.sleep(0.3)
        except Exception as e:
            print(f"❌ 批次 {batch_idx} 失敗，逐字重試: {e}")
            for w in batch:
                try:
                    s_url = f"https://translate.googleapis.com/translate_a/single?client=gtx&sl=zh-TW&tl=en&dt=t&q={urllib.parse.quote(w)}"
                    s_req = urllib.request.Request(s_url, headers={'User-Agent': 'Mozilla/5.0'})
                    with urllib.request.urlopen(s_req, timeout=10) as s_resp:
                        s_data = json.loads(s_resp.read().decode('utf-8'))
                        cache[w] = ''.join([part[0] for part in s_data[0] if part[0]]).strip()
                    time.sleep(0.05)
                except Exception as ex:
                    print(f"  個別字詞 {w} 翻譯失敗: {ex}")
                    cache[w] = w
                    
    with open(CACHE_PATH, 'w', encoding='utf-8') as f:
        json.dump(cache, f, ensure_ascii=False, indent=2)
        
    print(f"🎉 全部翻譯快取已保存至：{CACHE_PATH}（共 {len(cache)} 筆）")
    return cache

if __name__ == '__main__':
    print("🚀 啟動漢字詞英文翻譯批次處理...")
    words = get_hanja_words_needing_translation()
    print(f"📝 總計待處理不重複漢字詞彙: {len(words)} 筆")
    cache = batch_translate(words)
