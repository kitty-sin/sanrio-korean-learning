import os
import sys
import re
import json
import time
import urllib.parse
import urllib3
import requests
import pymupdf
import opencc

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PDF_PATH = os.path.join(BASE_DIR, "assets", "Korean_CORE2000.pdf")
CACHE_PATH = os.path.join(BASE_DIR, "scripts", "core2000_translations_cache.json")
OUTPUT_JS_PATH = os.path.join(BASE_DIR, "korean_core2000_data.js")
OUTPUT_JSON_PATH = os.path.join(BASE_DIR, "korean_core2000.json")
VOCAB_5666_PATH = os.path.join(BASE_DIR, "korean_vocab_5666_data.js")

CHAPTERS = [
    {
        "ch": 1,
        "title": 'How to Say "Hello", "Thank You" and More!',
        "name_zh": "日常問候與基礎禮貌",
        "range": "Words 1 - 200",
        "main_col": "#FF5E7E",
        "bg_col": "#FFF0F4",
        "bdr_col": "#FFD1DC",
        "badge_icon": "🍓"
    },
    {
        "ch": 2,
        "title": 'How to Say "black", "brown" and More!',
        "name_zh": "顏色與生活常見形容詞",
        "range": "Words 201 - 400",
        "main_col": "#FF8A3D",
        "bg_col": "#FFF5EE",
        "bdr_col": "#FFE0CC",
        "badge_icon": "🍊"
    },
    {
        "ch": 3,
        "title": 'How to Say "outside", "inside" and More!',
        "name_zh": "方向、位置與空間環境",
        "range": "Words 401 - 600",
        "main_col": "#D99B00",
        "bg_col": "#FFFBEB",
        "bdr_col": "#FDE68A",
        "badge_icon": "🍯"
    },
    {
        "ch": 4,
        "title": 'How to Say "restaurant", "cafe" and More!',
        "name_zh": "餐廳、咖啡廳與飲食點餐",
        "range": "Words 601 - 800",
        "main_col": "#10B981",
        "bg_col": "#ECFDF5",
        "bdr_col": "#A7F3D0",
        "badge_icon": "🌱"
    },
    {
        "ch": 5,
        "title": 'How to Say "sneeze", "allergy" and More!',
        "name_zh": "身體狀況、過敏與日常動作",
        "range": "Words 801 - 1000",
        "main_col": "#0284C7",
        "bg_col": "#F0F9FF",
        "bdr_col": "#BAE6FD",
        "badge_icon": "☁️"
    },
    {
        "ch": 6,
        "title": 'How to Say "sew", "knit" and More!',
        "name_zh": "休閒嗜好、日常手工與手作",
        "range": "Words 1001 - 1200",
        "main_col": "#7C3AED",
        "bg_col": "#F5F3FF",
        "bdr_col": "#DDD6FE",
        "badge_icon": "🫐"
    },
    {
        "ch": 7,
        "title": 'How to Say "hungry", "thirsty" and More!',
        "name_zh": "情緒感受、生理需求與心境",
        "range": "Words 1201 - 1400",
        "main_col": "#DB2777",
        "bg_col": "#FDF2F8",
        "bdr_col": "#FBCFE8",
        "badge_icon": "🌸"
    },
    {
        "ch": 8,
        "title": 'How to Say "alligator", "anteater" and More!',
        "name_zh": "大自然生物、動物與環境生態",
        "range": "Words 1401 - 1600",
        "main_col": "#059669",
        "bg_col": "#F0FDF4",
        "bdr_col": "#BBF7D0",
        "badge_icon": "🍈"
    },
    {
        "ch": 9,
        "title": 'How to Say "housewife", "husband" and More!',
        "name_zh": "家庭成員、社會職業與人際關係",
        "range": "Words 1601 - 1800",
        "main_col": "#9333EA",
        "bg_col": "#FAF5FF",
        "bdr_col": "#E9D5FF",
        "badge_icon": "🍇"
    },
    {
        "ch": 10,
        "title": 'How to Say "sports", "stadium" and More!',
        "name_zh": "體育運動、休閒競賽與戶外活動",
        "range": "Words 1801 - 2000",
        "main_col": "#E11D48",
        "bg_col": "#FFF1F2",
        "bdr_col": "#FECDD3",
        "badge_icon": "🎀"
    },
]

CH_PAGE_RANGES = [
    (1, 3, 27),
    (2, 29, 53),
    (3, 55, 79),
    (4, 81, 105),
    (5, 107, 131),
    (6, 133, 157),
    (7, 159, 183),
    (8, 185, 209),
    (9, 211, 235),
    (10, 237, 261),
]

def is_korean(text):
    return any('\uac00' <= char <= '\ud7a3' for char in text)

def load_vocab_dict():
    """載入既有 5,666 詞庫的繁中字典作為優先對照"""
    v_dict = {}
    if os.path.exists(VOCAB_5666_PATH):
        try:
            with open(VOCAB_5666_PATH, "r", encoding="utf-8") as f:
                content = f.read()
            m = re.search(r'window\.KOREAN_VOCAB_5666\s*=\s*(\[.*?\]);?\s*$', content, re.DOTALL)
            if m:
                raw_list = json.loads(m.group(1))
                for item in raw_list:
                    k = item.get("k", "").strip()
                    c = item.get("c", "").strip()
                    if k and c:
                        # 若已有則保留最簡明的第一個定義
                        if k not in v_dict:
                            v_dict[k] = c.split("、")[0].split("，")[0].split("/")[0].strip()
            print(f"Loaded {len(v_dict)} vocabulary definitions from 5666 vocab dictionary.")
        except Exception as e:
            print(f"Warning loading vocab dictionary: {e}")
    return v_dict

def load_translation_cache():
    if os.path.exists(CACHE_PATH):
        try:
            with open(CACHE_PATH, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return {}
    return {}

def save_translation_cache(cache):
    with open(CACHE_PATH, "w", encoding="utf-8") as f:
        json.dump(cache, f, ensure_ascii=False, indent=2)

def translate_batch_gtx(texts, sl="en", tl="zh-TW", batch_size=30):
    """使用 Google Translate 批次快速翻譯成繁體中文"""
    results = {}
    missing = [t for t in texts if t]
    
    total = len(missing)
    print(f"Batch translating {total} unique texts ({sl} -> {tl})...")
    
    for i in range(0, total, batch_size):
        chunk = missing[i:i + batch_size]
        joined = "\n".join(chunk)
        url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + sl + "&tl=" + tl + "&dt=t&q=" + urllib.parse.quote(joined)
        try:
            r = requests.get(url, verify=False, timeout=10)
            if r.status_code == 200:
                data = r.json()
                translated_full = "".join(seg[0] for seg in data[0] if seg[0])
                lines = translated_full.splitlines()
                # 若行數對應得上
                if len(lines) == len(chunk):
                    for src, tgt in zip(chunk, lines):
                        results[src] = tgt.strip()
                else:
                    # 個別回退翻譯
                    for src in chunk:
                        sub_url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + sl + "&tl=" + tl + "&dt=t&q=" + urllib.parse.quote(src)
                        sr = requests.get(sub_url, verify=False, timeout=5)
                        if sr.status_code == 200:
                            sdata = sr.json()
                            results[src] = "".join(seg[0] for seg in sdata[0] if seg[0]).strip()
            else:
                print(f"Status {r.status_code} at batch {i}")
        except Exception as e:
            print(f"Error at batch {i}: {e}")
            for src in chunk:
                try:
                    sub_url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + sl + "&tl=" + tl + "&dt=t&q=" + urllib.parse.quote(src)
                    sr = requests.get(sub_url, verify=False, timeout=5)
                    if sr.status_code == 200:
                        sdata = sr.json()
                        results[src] = "".join(seg[0] for seg in sdata[0] if seg[0]).strip()
                except Exception:
                    results[src] = ""
        
        if (i // batch_size) % 10 == 0:
            print(f"  Processed {min(i + batch_size, total)} / {total}...")
        time.sleep(0.2)
        
    return results

def extract_pdf_entries(pdf_path):
    print(f"Opening PDF: {pdf_path}")
    doc = pymupdf.open(pdf_path)
    entries = []
    
    for ch, p_start, p_end in CH_PAGE_RANGES:
        for pno in range(p_start, p_end + 1):
            blocks = doc[pno].get_text("blocks")
            cleaned_blocks = []
            for b in blocks:
                t = b[4].strip()
                if not t:
                    continue
                if t.startswith("PAGE ") and len(t) < 15:
                    continue
                if "★ CORE WORDS" in t:
                    continue
                t = re.sub(r"^(?:PAGE \d+\s*)?(?:Vocabulary\s*Sample Sentence\s*)?", "", t).strip()
                if not t or t == "Vocabulary" or t == "Sample Sentence":
                    continue
                cleaned_blocks.append(t)
            
            idx = 0
            while idx < len(cleaned_blocks):
                t = cleaned_blocks[idx]
                cur_id = None
                k_first = None
                if t.isdigit() and 1 <= int(t) <= 2000:
                    cur_id = int(t)
                    idx += 1
                    if idx >= len(cleaned_blocks):
                        break
                    k_first = cleaned_blocks[idx]
                    idx += 1
                else:
                    m = re.match(r"^(\d+)\n(.*)", t, re.DOTALL)
                    if m and 1 <= int(m.group(1)) <= 2000:
                        cur_id = int(m.group(1))
                        k_first = m.group(2).strip()
                        idx += 1
                    else:
                        idx += 1
                        continue
                
                next_b = cleaned_blocks[idx] if idx < len(cleaned_blocks) else ""
                if is_korean(next_b):
                    word_kr = k_first
                    sent_kr = next_b
                    idx += 1
                    rom_b = cleaned_blocks[idx] if idx < len(cleaned_blocks) else ""
                    idx += 1
                    eng_b = cleaned_blocks[idx] if idx < len(cleaned_blocks) else ""
                    idx += 1
                else:
                    klines = [l.strip() for l in k_first.splitlines() if l.strip()]
                    if len(klines) >= 2:
                        word_kr = klines[0]
                        sent_kr = " ".join(klines[1:])
                    else:
                        word_kr = klines[0] if klines else ""
                        sent_kr = ""
                    rom_b = next_b
                    idx += 1
                    eng_b = cleaned_blocks[idx] if idx < len(cleaned_blocks) else ""
                    idx += 1
                
                rlines = [l.strip() for l in rom_b.splitlines() if l.strip()]
                word_rom = rlines[0] if len(rlines) >= 1 else ""
                sent_rom = " ".join(rlines[1:]) if len(rlines) >= 2 else ""
                
                elines = [l.strip() for l in eng_b.splitlines() if l.strip()]
                word_en = elines[0] if len(elines) >= 1 else ""
                sent_en = " ".join(elines[1:]) if len(elines) >= 2 else ""
                
                # 特殊修正：ID 10
                if cur_id == 10:
                    word_kr = "저는 (name)입니다."
                    sent_kr = "저는 존입니다."
                
                # 規範化空白與換行
                word_kr = re.sub(r"\s+", " ", word_kr).strip()
                sent_kr = re.sub(r"\s+", " ", sent_kr).strip()
                word_rom = re.sub(r"\s+", " ", word_rom).strip()
                sent_rom = re.sub(r"\s+", " ", sent_rom).strip()
                word_en = re.sub(r"\s+", " ", word_en).strip()
                sent_en = re.sub(r"\s+", " ", sent_en).strip()
                
                entries.append({
                    "id": cur_id,
                    "ch": ch,
                    "page": pno + 1,
                    "word_kr": word_kr,
                    "word_rom": word_rom,
                    "word_en": word_en,
                    "sent_kr": sent_kr,
                    "sent_rom": sent_rom,
                    "sent_en": sent_en,
                })
                
    entries.sort(key=lambda x: x["id"])
    print(f"Extracted {len(entries)} items from PDF.")
    return entries

def main():
    print("=== Step 1: Extracting entries from PDF ===")
    entries = extract_pdf_entries(PDF_PATH)
    assert len(entries) == 2000, f"Expected 2000 entries, got {len(entries)}"
    
    print("\n=== Step 2: Loading vocab dictionary & cache ===")
    vocab_dict = load_vocab_dict()
    trans_cache = load_translation_cache()
    print(f"Existing translation cache entries: {len(trans_cache)}")
    
    # 收集需要翻譯的文字
    need_translate = set()
    for e in entries:
        wen = e["word_en"]
        sen = e["sent_en"]
        if wen and wen not in trans_cache:
            need_translate.add(wen)
        if sen and sen not in trans_cache:
            need_translate.add(sen)
            
    print(f"Texts needing translation: {len(need_translate)}")
    if need_translate:
        new_translations = translate_batch_gtx(list(need_translate), sl="en", tl="zh-TW")
        trans_cache.update(new_translations)
        save_translation_cache(trans_cache)
        print("Updated translation cache.")
    
    print("\n=== Step 3: Enriching entries with Traditional Chinese (OpenCC s2twp) ===")
    cc = opencc.OpenCC('s2twp')
    
    # 嚴謹校正翻譯快取中的所有繁簡字詞
    for k, v in list(trans_cache.items()):
        trans_cache[k] = cc.convert(v)
    save_translation_cache(trans_cache)

    enriched_entries = []
    for e in entries:
        w_kr = e["word_kr"]
        w_en = e["word_en"]
        s_en = e["sent_en"]
        
        # 單字繁中優先順序：5666詞典 > 翻譯快取 > 英文原文
        w_zh = ""
        clean_w_kr = re.sub(r"[.?!~]+$", "", w_kr).strip()
        if clean_w_kr in vocab_dict:
            w_zh = vocab_dict[clean_w_kr]
        elif w_kr in vocab_dict:
            w_zh = vocab_dict[w_kr]
        elif w_en in trans_cache:
            w_zh = trans_cache[w_en]
        else:
            w_zh = w_en
            
        # 例句繁中：翻譯快取 > 英文原文
        s_zh = trans_cache.get(s_en, s_en)
        
        # 嚴格繁體中文標準轉換 (台灣/香港正體標準，消除所有簡體殘留)
        w_zh = cc.convert(w_zh)
        s_zh = cc.convert(s_zh)
        
        # 尋找章節主題資訊
        ch_info = next((c for c in CHAPTERS if c["ch"] == e["ch"]), {})
        
        item = {
            "id": e["id"],
            "ch": e["ch"],
            "page": e["page"],
            "chName": ch_info.get("name_zh", f"第 {e['ch']} 單元"),
            "chColor": ch_info.get("main_col", "#FF5E7E"),
            "chBg": ch_info.get("bg_col", "#FFF0F4"),
            "badgeIcon": ch_info.get("badge_icon", "🌸"),
            "word_kr": w_kr,
            "word_rom": e["word_rom"],
            "word_en": w_en,
            "word_zh": w_zh,
            "sent_kr": e["sent_kr"],
            "sent_rom": e["sent_rom"],
            "sent_en": s_en,
            "sent_zh": s_zh,
        }
        enriched_entries.append(item)
    
    print("\n=== Step 4: Exporting dataset files ===")
    # 輸出 JSON
    with open(OUTPUT_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump({
            "meta": {
                "title": "Korean CORE 2000 Everyday Words and Phrases",
                "total": len(enriched_entries),
                "generated_at": time.strftime("%Y-%m-%d %H:%M:%S")
            },
            "chapters": CHAPTERS,
            "data": enriched_entries
        }, f, ensure_ascii=False, indent=2)
    print(f"Exported JSON: {OUTPUT_JSON_PATH} ({os.path.getsize(OUTPUT_JSON_PATH)} bytes)")
    
    # 輸出 JS
    js_content = f"""// Korean CORE 2000 Everyday Words and Phrases Dataset
// 包含 2,000 組核心單字與實戰生活例句 (含韓語、羅馬拼音、英語與繁體中文)
// Generated automatically: {time.strftime('%Y-%m-%d %H:%M:%S')}

window.KOREAN_CORE2000_CHAPTERS = {json.dumps(CHAPTERS, ensure_ascii=False, indent=2)};

window.KOREAN_CORE2000_DATA = {json.dumps(enriched_entries, ensure_ascii=False)};
"""
    with open(OUTPUT_JS_PATH, "w", encoding="utf-8") as f:
        f.write(js_content)
    print(f"Exported JS: {OUTPUT_JS_PATH} ({os.path.getsize(OUTPUT_JS_PATH)} bytes)")
    
    print("\n=== Sample Enriched Entries ===")
    for idx in [0, 9, 94, 496, 1999]:
        item = enriched_entries[idx]
        print(f"#{item['id']} [CH {item['ch']} - {item['chName']}]")
        print(f"  Word: {item['word_kr']} ({item['word_rom']}) => {item['word_zh']} / {item['word_en']}")
        print(f"  Sent: {item['sent_kr']} ({item['sent_rom']}) => {item['sent_zh']} / {item['sent_en']}")

if __name__ == "__main__":
    main()
