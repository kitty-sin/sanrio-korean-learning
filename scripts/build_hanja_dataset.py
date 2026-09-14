#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
韓語漢字大辭典數據集建置腳本 (Build Korean Hanja Dataset)
解析 Glossika_韓文漢字對照工具書.md 並生成：
1. korean_hanja_data.js (前端全量常數)
2. korean_hanja.csv (標準試算表)
3. korean_hanja.md (Markdown 對照字典)
"""

import sys
import os
import re
import json
import csv

sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SOURCE_MD = r"C:\Users\PC\Desktop\korean-learning\Glossika_韓文漢字對照工具書.md"
VOCAB_5666_JS = os.path.join(BASE_DIR, "korean_vocab_5666_data.js")

OUT_JS = os.path.join(BASE_DIR, "korean_hanja_data.js")
OUT_CSV = os.path.join(BASE_DIR, "korean_hanja.csv")
OUT_MD = os.path.join(BASE_DIR, "korean_hanja.md")

# 韓語 Unicode 常數
CHOSEONG = ['g', 'kk', 'n', 'd', 'tt', 'r', 'm', 'b', 'pp', 's', 'ss', '', 'j', 'jj', 'ch', 'k', 't', 'p', 'h']
JUNGSEONG = ['a', 'ae', 'ya', 'yae', 'eo', 'e', 'yeo', 'ye', 'o', 'wa', 'wae', 'oe', 'yo', 'u', 'wo', 'we', 'wi', 'yu', 'eu', 'ui', 'i']
JONGSEONG = ['', 'k', 'k', 'ks', 'n', 'nj', 'nh', 't', 'l', 'lg', 'lm', 'lb', 'ls', 'lt', 'lp', 'lh', 'm', 'p', 'ps', 's', 'ss', 'ng', 'j', 'ch', 'k', 't', 'p', 'h']

def romanize_hangul(text):
    """將韓文字串轉換為標準 Revised Romanization"""
    res = []
    for char in text:
        code = ord(char)
        if 0xAC00 <= code <= 0xD7A3:
            s_idx = code - 0xAC00
            jong = s_idx % 28
            jung = (s_idx - jong) // 28 % 21
            cho = (s_idx - jong) // (28 * 21)
            
            c = CHOSEONG[cho]
            v = JUNGSEONG[jung]
            t = JONGSEONG[jong]
            
            rom = c + v + t
            res.append(rom)
        elif char == ' ':
            res.append(' ')
        else:
            res.append(char)
    return ''.join(res).strip()

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

def parse_glossika_md():
    if not os.path.exists(SOURCE_MD):
        print(f"Error: Source file {SOURCE_MD} not found.")
        return [], [], []

    with open(SOURCE_MD, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    part1_lines = []
    part2_lines = []
    part3_lines = []
    cur_part = 0

    for line in lines:
        l = line.strip()
        if '## 第一部分' in l:
            cur_part = 1
            continue
        elif '## 第二部分' in l:
            cur_part = 2
            continue
        elif '## 第三部分' in l:
            cur_part = 3
            continue

        if cur_part == 1:
            part1_lines.append(l)
        elif cur_part == 2:
            part2_lines.append(l)
        elif cur_part == 3:
            part3_lines.append(l)

    # 1. 解析第一部分 (單音節 ↔ 漢字群)
    syllables = []
    for l in part1_lines:
        if l.startswith('|') and not l.startswith('| :') and not l.startswith('| 韓文音節'):
            parts = [p.strip() for p in l.split('|')[1:-1]]
            if len(parts) >= 3:
                hangul = re.sub(r'\*+', '', parts[0]).strip()
                roman = parts[1]
                hanjas = parts[2].split()
                if hangul:
                    syllables.append({
                        "id": len(syllables) + 1,
                        "k": hangul,
                        "r": roman or romanize_hangul(hangul),
                        "hanjas": hanjas,
                        "count": len(hanjas),
                        "hanja_str": ' '.join(hanjas)
                    })

    # 2. 解析第二部分 (漢字詞對照)
    existing_vocab = load_existing_vocab()
    hanja_cache = {}
    cache_file = os.path.join(BASE_DIR, "scripts", "hanja_translations_cache.json")
    if os.path.exists(cache_file):
        try:
            with open(cache_file, 'r', encoding='utf-8') as f:
                hanja_cache = json.load(f)
        except Exception:
            hanja_cache = {}

    CUSTOM_HANJA_OVERRIDES = {
        "애칭": {"c": "暱稱、愛稱", "e": "Nickname, pet name"},
        "애착": {"c": "依戀、依附、愛著", "e": "Attachment, deep affection"},
        "애교": {"c": "撒嬌、愛嬌", "e": "Cuteness, charm, aegyo"},
        "안주": {"c": "下酒菜、按酒", "e": "Side dish for drinks, snacks"},
        "안내": {"c": "引導、接待、介紹、案內", "e": "Guidance, information, guide"},
        "안부": {"c": "問候、安好、安否", "e": "Regards, greetings, inquiry"},
    }

    hanja_words = []
    word_id = 1

    for l in part2_lines:
        if l.startswith('|') and not l.startswith('| :') and not l.startswith('| 中文漢字詞'):
            parts = [p.strip() for p in l.split('|')[1:-1]]
            if len(parts) >= 4:
                chinese = parts[0]
                pinyin = parts[1]
                hangul = re.sub(r'\*+', '', parts[2]).strip()
                ipa = parts[3]

                if not hangul:
                    continue

                roman = romanize_hangul(hangul)
                
                # 取得英文與詞性
                english = ""
                pos = "名詞"
                if hangul in existing_vocab:
                    ev = existing_vocab[hangul]
                    e_val = ev.get('e', '')
                    if e_val and not e_val.startswith('Korean expression:'):
                        english = e_val
                    pos = ev.get('p', '名詞')
                
                if not english:
                    english = hanja_cache.get(chinese, "")
                if not english:
                    english = chinese

                # 套用自訂高精確度校正
                if hangul in CUSTOM_HANJA_OVERRIDES:
                    ov = CUSTOM_HANJA_OVERRIDES[hangul]
                    if "c" in ov:
                        chinese = ov["c"]
                    if "e" in ov:
                        english = ov["e"]

                hanja_words.append({
                    "id": word_id,
                    "k": hangul,
                    "r": roman,
                    "c": chinese,
                    "e": english,
                    "py": pinyin,
                    "ipa": ipa,
                    "l": "Hanja",
                    "p": pos
                })
                word_id += 1

    # 3. 解析第三部分 (外來語對照)
    try:
        from loanword_translations import LOANWORD_TRANSLATIONS
    except ImportError:
        LOANWORD_TRANSLATIONS = {}

    loanwords = []
    loan_id = 1
    for l in part3_lines:
        if l.startswith('|') and not l.startswith('| :') and not l.startswith('| 英文'):
            parts = [p.strip() for p in l.split('|')[1:-1]]
            if len(parts) >= 3:
                eng_word = parts[0]
                hangul = re.sub(r'\*+', '', parts[1]).strip()
                ipa = parts[2]

                if not hangul:
                    continue

                roman = romanize_hangul(hangul)
                
                # 優先使用完整翻譯字典
                chinese = LOANWORD_TRANSLATIONS.get(hangul, "")
                pos = "外來語"
                if not chinese and hangul in existing_vocab:
                    ev = existing_vocab[hangul]
                    chinese = ev.get('c', '')
                    pos = ev.get('p', '外來語')
                
                if not chinese:
                    chinese = eng_word

                loanwords.append({
                    "id": loan_id,
                    "k": hangul,
                    "r": roman,
                    "c": chinese,
                    "e": eng_word,
                    "ipa": ipa,
                    "l": "Loan",
                    "p": pos
                })
                loan_id += 1

    return syllables, hanja_words, loanwords

def extract_all_syllables(glossika_syllables, hanja_words, loanwords):
    """
    匯總所有來源中的韓語單音節，生成包含 471 漢字音節 + 566 固有/常用音節的 1,037 全量矩陣
    """
    vocab_kitty_js = os.path.join(BASE_DIR, "korean_vocab_kitty_add_data.js")
    
    existing_vocab = []
    if os.path.exists(VOCAB_5666_JS):
        try:
            with open(VOCAB_5666_JS, 'r', encoding='utf-8') as f:
                t = f.read()
            start = t.find('[')
            end = t.rfind(']')
            if start != -1 and end != -1:
                existing_vocab.extend(json.loads(t[start:end+1]))
        except Exception as e:
            print("Error loading 5666 vocab:", e)

    if os.path.exists(vocab_kitty_js):
        try:
            with open(vocab_kitty_js, 'r', encoding='utf-8') as f:
                t = f.read()
            start = t.find('[')
            end = t.rfind(']')
            if start != -1 and end != -1:
                existing_vocab.extend(json.loads(t[start:end+1]))
        except Exception as e:
            print("Error loading kitty add vocab:", e)

    # 彙整所有詞彙以提取例詞
    all_vocab_pool = []
    seen_k = set()
    for item in existing_vocab:
        k = item.get('k', '')
        if k and k not in seen_k:
            all_vocab_pool.append({'k': k, 'c': item.get('c', ''), 'e': item.get('e', '')})
            seen_k.add(k)
            
    for item in hanja_words:
        k = item.get('k', '')
        if k and k not in seen_k:
            all_vocab_pool.append({'k': k, 'c': item.get('c', ''), 'e': item.get('e', '')})
            seen_k.add(k)

    for item in loanwords:
        k = item.get('k', '')
        if k and k not in seen_k:
            all_vocab_pool.append({'k': k, 'c': item.get('c', ''), 'e': item.get('e', '')})
            seen_k.add(k)

    # 建立每個音節的例詞索引
    char_to_samples = {}
    all_chars_in_vocab = set()

    for w in all_vocab_pool:
        word_k = w['k']
        raw_c = w['c']
        # 簡化中文釋義，保留前 1~2 個主要意思
        clean_c = raw_c.split('、')[0].split('/')[0].split('(')[0].split('（')[0].strip()
        
        for ch in word_k:
            if 0xAC00 <= ord(ch) <= 0xD7A3:
                all_chars_in_vocab.add(ch)
                if ch not in char_to_samples:
                    char_to_samples[ch] = []
                
                # 若該詞尚未加入且長度未達上限
                if not any(x['k'] == word_k for x in char_to_samples[ch]):
                    if len(char_to_samples[ch]) < 6:
                        # 優先將單音節本身的詞排在最前
                        if word_k == ch:
                            char_to_samples[ch].insert(0, {'k': word_k, 'c': clean_c})
                        else:
                            char_to_samples[ch].append({'k': word_k, 'c': clean_c})

    # 1. 處理 471 個漢字音節
    final_syllables = []
    hanja_syl_chars = set()

    for idx, syl in enumerate(glossika_syllables, start=1):
        k = syl['k']
        hanja_syl_chars.add(k)
        samples = char_to_samples.get(k, [])
        final_syllables.append({
            "id": idx,
            "k": k,
            "r": syl.get('r') or romanize_hangul(k),
            "type": "hanja",
            "hanjas": syl.get('hanjas', []),
            "count": len(syl.get('hanjas', [])),
            "hanja_str": syl.get('hanja_str', ''),
            "sample_words": samples[:5]
        })

    # 2. 處理新增的固有 / 常用音節 (566 個)
    native_chars = sorted(list(all_chars_in_vocab - hanja_syl_chars))
    print(f"📌 發現固有/常用新音節: {len(native_chars)} 個")

    start_native_id = len(final_syllables) + 1
    for idx, k in enumerate(native_chars, start=start_native_id):
        samples = char_to_samples.get(k, [])
        final_syllables.append({
            "id": idx,
            "k": k,
            "r": romanize_hangul(k),
            "type": "native",
            "hanjas": [],
            "count": len(samples),
            "hanja_str": "",
            "sample_words": samples[:6]
        })

    return final_syllables

def main():
    print("🚀 開始解析 Glossika 韓文漢字對照工具書...")
    glossika_syllables, hanja_words, loanwords = parse_glossika_md()
    
    print(f"✅ 第一部分 Glossika 漢字音節數: {len(glossika_syllables)}")
    print(f"✅ 第二部分 漢字詞數: {len(hanja_words)}")
    print(f"✅ 第三部分 外來語數: {len(loanwords)}")

    # 擴充全量音節矩陣
    all_syllables = extract_all_syllables(glossika_syllables, hanja_words, loanwords)
    print(f"🌟 全量擴充後音節總數: {len(all_syllables)} (漢字音節: 471, 固有/常用音節: {len(all_syllables) - 471})")

    # 1. 寫入 JS 檔案
    print(f"📦 寫入 JS 常數檔: {OUT_JS}")
    with open(OUT_JS, 'w', encoding='utf-8') as f:
        f.write("// KITTY 韓語漢字大辭典與外來語常數數據集 (含 1,037 全量音節矩陣)\n")
        f.write(f"window.HANJA_SYLLABLE_LIST = {json.dumps(all_syllables, ensure_ascii=False)};\n")
        f.write(f"window.HANJA_VOCAB_LIST = {json.dumps(hanja_words, ensure_ascii=False)};\n")
        f.write(f"window.LOANWORD_LIST = {json.dumps(loanwords, ensure_ascii=False)};\n")

    # 2. 寫入 CSV 檔案 (編號, 韓文, 羅馬拼音, 中文, 英文)
    print(f"📊 寫入 CSV 試算表: {OUT_CSV}")
    with open(OUT_CSV, 'w', encoding='utf-8-sig', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(["編號", "韓文", "羅馬拼音", "中文", "英文", "漢語拼音", "IPA音標", "類別", "詞性"])
        for item in hanja_words:
            writer.writerow([item["id"], item["k"], item["r"], item["c"], item["e"], item["py"], item["ipa"], item["l"], item["p"]])
        for item in loanwords:
            writer.writerow([item["id"] + len(hanja_words), item["k"], item["r"], item["c"], item["e"], "", item["ipa"], item["l"], item["p"]])

    # 3. 寫入 Markdown 字典
    print(f"📝 寫入 Markdown 字典: {OUT_MD}")
    with open(OUT_MD, 'w', encoding='utf-8') as f:
        f.write("# 🎀 韓語漢字詞與外來語大辭典 (Hanja & Loanwords Dictionary)\n\n")
        f.write(f"> 收錄 **{len(hanja_words):,} 筆** 核心漢字詞、**{len(all_syllables):,} 組** 全量單音節矩陣 (471 漢字音節 + {len(all_syllables)-471} 固有音節) 與 **{len(loanwords)} 筆** 常用外來語。\n\n")
        f.write("## 🧸 核心漢字詞列表\n\n")
        f.write("| 編號 | 韓文 | 羅馬拼音 | 中文 | 英文 | 漢語拼音 | IPA 音標 |\n")
        f.write("| :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n")
        for item in hanja_words[:500]:
            f.write(f"| {item['id']} | **{item['k']}** | `{item['r']}` | {item['c']} | *{item['e']}* | {item['py']} | `{item['ipa']}` |\n")
        f.write(f"\n*(其餘 {len(hanja_words)-500} 筆請參閱完整資料集 `korean_hanja_data.js` 與 `korean_hanja.csv`)*\n\n")

    print("🎉 全量資料集建置圓滿完成！")

if __name__ == '__main__':
    main()

