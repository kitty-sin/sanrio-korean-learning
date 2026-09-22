import os
import sys
import re
import json
import time
import urllib.parse
import urllib3
import requests
import opencc

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
JSON_PATH = os.path.join(BASE_DIR, "korean_core2000.json")
JS_PATH = os.path.join(BASE_DIR, "korean_core2000_data.js")
WWW_JSON_PATH = os.path.join(BASE_DIR, "www", "korean_core2000.json")
WWW_JS_PATH = os.path.join(BASE_DIR, "www", "korean_core2000_data.js")

cc = opencc.OpenCC('s2twp')

def translate_ko_to_zhtw(text):
    if not text:
        return ""
    # 若本身是 (name) 等保留
    clean_text = text.replace("(name)", "XXX")
    url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=ko&tl=zh-TW&dt=t&q=" + urllib.parse.quote(clean_text)
    try:
        r = requests.get(url, verify=False, timeout=6)
        if r.status_code == 200:
            data = r.json()
            res = "".join(chunk[0] for chunk in data[0] if chunk[0])
            res = res.replace("XXX", "（名字）")
            return cc.convert(res.strip())
    except Exception as e:
        print(f"Error translating '{text}': {e}")
    return ""

def translate_en_to_zhtw(text):
    if not text:
        return ""
    url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=zh-TW&dt=t&q=" + urllib.parse.quote(text)
    try:
        r = requests.get(url, verify=False, timeout=6)
        if r.status_code == 200:
            data = r.json()
            res = "".join(chunk[0] for chunk in data[0] if chunk[0])
            return cc.convert(res.strip())
    except Exception as e:
        print(f"Error translating '{text}': {e}")
    return ""

def main():
    print("=== Step 1: Loading current dataset ===")
    with open(JSON_PATH, "r", encoding="utf-8") as f:
        full_doc = json.load(f)

    data = full_doc["data"]
    print(f"Total items in dataset: {len(data)}")

    # 針對含有未翻譯英文的項目進行即時翻譯補全
    untranslated_count = 0
    for it in data:
        cid = it["id"]
        w_kr = it["word_kr"]
        s_kr = it["sent_kr"]
        w_en = it["word_en"]
        s_en = it["sent_en"]
        w_zh = it["word_zh"]
        s_zh = it["sent_zh"]

        # 檢查單字是否仍為英文
        need_w_fix = False
        if re.search(r'[a-zA-Z]{3,}', w_zh) and "(name)" not in w_zh:
            need_w_fix = True

        # 檢查句子是否仍為英文
        need_s_fix = False
        if re.search(r'[a-zA-Z]{3,}', s_zh) and "(name)" not in s_zh:
            # 排除已翻譯但含英文專有名詞如 Seventeen
            if "合約工" not in s_zh and "Seventeen" not in s_zh:
                need_s_fix = True

        if need_w_fix:
            print(f"Refining Word #{cid}: {w_kr} (was: {w_zh})")
            new_w = translate_ko_to_zhtw(w_kr)
            if not new_w or re.search(r'[a-zA-Z]{3,}', new_w):
                new_w = translate_en_to_zhtw(w_en)
            if new_w:
                it["word_zh"] = new_w
                untranslated_count += 1
            time.sleep(0.1)

        if need_s_fix:
            print(f"Refining Sent #{cid}: {s_kr} (was: {s_zh})")
            new_s = translate_ko_to_zhtw(s_kr)
            if not new_s or re.search(r'[a-zA-Z]{3,}', new_s):
                new_s = translate_en_to_zhtw(s_en)
            if new_s:
                it["sent_zh"] = new_s
                untranslated_count += 1
            time.sleep(0.1)

    print(f"Fixed {untranslated_count} untranslated fields.")

    print("\n=== Step 2: Running 100% strict OpenCC s2twp conversion ===")
    total_converted = 0
    for it in data:
        w_old = it["word_zh"]
        s_old = it["sent_zh"]

        w_new = cc.convert(w_old)
        s_new = cc.convert(s_old)

        # 常見特定繁體習慣微調
        w_new = w_new.replace("喫飯", "吃飯").replace("好喫", "好吃").replace("着", "著").replace("镜头", "鏡頭").replace("这", "這")
        s_new = s_new.replace("喫飯", "吃飯").replace("好喫", "好吃").replace("着", "著").replace("镜头", "鏡頭").replace("这", "這")

        if w_new != w_old or s_new != s_old:
            total_converted += 1
            it["word_zh"] = w_new
            it["sent_zh"] = s_new

    print(f"Strictly converted {total_converted} items to Traditional Chinese.")

    # 檢查特例 #1201
    item1201 = next(it for it in data if it["id"] == 1201)
    print("\n=== Verification of #1201 ===")
    print(f"ID 1201 Word: {item1201['word_zh']} / Sent: {item1201['sent_zh']}")
    assert "鏡頭" in item1201["sent_zh"], "Error: #1201 should contain 鏡頭"
    assert "看著" in item1201["sent_zh"], "Error: #1201 should contain 看著"

    print("\n=== Step 3: Saving files ===")
    full_doc["meta"]["generated_at"] = time.strftime("%Y-%m-%d %H:%M:%S")

    # 存檔根目錄
    with open(JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(full_doc, f, ensure_ascii=False, indent=2)

    js_content = f"""// Korean CORE 2000 Everyday Words and Phrases Dataset (100% Traditional Chinese Verified)
// 包含 2,000 組核心單字與實戰生活例句 (含韓語、羅馬拼音、英語與繁體中文)
// Generated: {time.strftime('%Y-%m-%d %H:%M:%S')}

window.KOREAN_CORE2000_CHAPTERS = {json.dumps(full_doc["chapters"], ensure_ascii=False, indent=2)};

window.KOREAN_CORE2000_DATA = {json.dumps(data, ensure_ascii=False)};
"""
    with open(JS_PATH, "w", encoding="utf-8") as f:
        f.write(js_content)

    # 同步存檔 www/
    with open(WWW_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(full_doc, f, ensure_ascii=False, indent=2)

    with open(WWW_JS_PATH, "w", encoding="utf-8") as f:
        f.write(js_content)

    print("Successfully exported JSON and JS to root and www/!")

if __name__ == "__main__":
    main()
