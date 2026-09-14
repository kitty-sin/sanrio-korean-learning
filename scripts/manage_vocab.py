#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
KITTY 韓語核心詞庫自動化管理工具 (Korean Vocab Manager CLI)
架構約定：
1. 基準 5,666 詞庫 (korean_vocab_5666_data.js / csv / md) 保持純淨固定，不主動寫入。
2. 自訂新增詞彙 (#5667 起) 寫入專屬自訂資料集：
   - korean_vocab_kitty_add_data.js
   - korean_vocab_kitty_add.csv
   - korean_vocab_kitty_add.md
3. 查重 (search) 與 ID 計算跨 5,666 基準庫與自訂庫全量合併比對。
"""

import sys
import os
import json
import argparse
import subprocess

# 解決 Windows 控制台編碼問題
sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
JS_5666_PATH = os.path.join(BASE_DIR, "korean_vocab_5666_data.js")
JS_KITTY_PATH = os.path.join(BASE_DIR, "korean_vocab_kitty_add_data.js")
CSV_KITTY_PATH = os.path.join(BASE_DIR, "korean_vocab_kitty_add.csv")
MD_KITTY_PATH = os.path.join(BASE_DIR, "korean_vocab_kitty_add.md")

# 韓語 Unicode 常數
CHOSEONG = ['g', 'kk', 'n', 'd', 'tt', 'r', 'm', 'b', 'pp', 's', 'ss', '', 'j', 'jj', 'ch', 'k', 't', 'p', 'h']
JUNGSEONG = ['a', 'ae', 'ya', 'yae', 'eo', 'e', 'yeo', 'ye', 'o', 'wa', 'wae', 'oe', 'yo', 'u', 'wo', 'we', 'wi', 'yu', 'eu', 'ui', 'i']
JONGSEONG = ['', 'k', 'k', 'ks', 'n', 'nj', 'nh', 't', 'l', 'lg', 'lm', 'lb', 'ls', 'lt', 'lp', 'lh', 'm', 'p', 'ps', 's', 'ss', 'ng', 'j', 'ch', 'k', 't', 'p', 'h']

POS_DESCRIPTIONS = {
    "名詞": "名詞 (Noun / 명사)，如 사람（人）、집（家）。",
    "專有名詞": "專有名詞 (Proper Noun / 고유명사)，如 대구（大邱）。",
    "動詞": "動詞 (Verb / 동사)，如 하다（做）、가다（去）。",
    "形容詞": "形容詞 (Adjective / 형용사)，如 크다（大）、좋다（好）。",
    "副詞": "副詞 (Adverb / 부사)，如 더（更）、잘（好）。",
    "依存名詞": "依存名詞 / 量詞 (Dependent Noun / 의존명사)，如 것（東西/事情）、개（個）、명（名）。",
    "冠形詞": "冠形詞 (Determiner / 관형사)，如 한（一個）、어떤（某種）。",
    "代名詞": "代名詞 (Pronoun / 대명사)，如 나（我）、우리（我們）、그（他）。",
    "數詞": "數詞 (Numeral / 수사)，如 하나（一）。",
    "補助用言": "補助用言 (Auxiliary / 보조용언)，如 ～버리다、～싶다。",
    "獨立詞": "不變化詞 / 獨立詞 / 未分類詞），用來標記如 그래도（即使那樣/仍然）、걔（那孩子）、그래（是的/那樣） 等",
    "助詞": "補助詞 (Auxiliary Particle / 보조사) 或其他接尾助詞。"
}

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

def load_json_array_from_file(file_path):
    """從 JS 檔案中解析 JSON 陣列"""
    if not os.path.exists(file_path):
        return []
    with open(file_path, 'r', encoding='utf-8') as f:
        text = f.read()
    start = text.find('[')
    end = text.rfind(']')
    if start == -1 or end == -1:
        return []
    try:
        return json.loads(text[start:end+1])
    except Exception as e:
        print(f"Warning: Failed to parse {file_path}: {e}")
        return []

def load_base_5666_data():
    """讀取 5,666 基準詞庫"""
    return load_json_array_from_file(JS_5666_PATH)

def load_kitty_add_data():
    """讀取 Kitty 自訂新增詞庫"""
    return load_json_array_from_file(JS_KITTY_PATH)

def load_all_vocab_data():
    """讀取全量合併詞庫 (基準 5,666 + Kitty 自訂新增)"""
    return load_base_5666_data() + load_kitty_add_data()

def search_vocab(query, exact=False):
    """跨全量詞庫進行檢索"""
    data = load_all_vocab_data()
    q = query.strip().lower()
    matches = []
    for item in data:
        k_val = item.get('k', '').lower()
        c_val = item.get('c', '').lower()
        r_val = item.get('r', '').lower()
        e_val = item.get('e', '').lower()
        
        if exact:
            if k_val == q or c_val == q:
                matches.append(item)
        else:
            if q in k_val or q in c_val or q in r_val or q in e_val:
                matches.append(item)
    return matches

def save_kitty_add_files(kitty_data):
    """原子化寫入 3 大 Kitty 自訂新增詞庫檔案"""
    # 1. 寫入 JS 常數
    js_content = "// 🎀 KITTY 自訂新增韓語核心詞彙資料庫 (#5667 及之後)\nwindow.KOREAN_VOCAB_KITTY_ADD = " + json.dumps(kitty_data, ensure_ascii=False, indent=2) + ";\n"
    with open(JS_KITTY_PATH, "w", encoding="utf-8") as f:
        f.write(js_content)
        
    # 2. 寫入 CSV 總表
    csv_lines = ["序號,韓文單字,羅馬拼音,中文解釋,英文釋義,TOPIK等級,詞性說明\n"]
    for it in kitty_data:
        csv_lines.append(f"{it['id']},{it['k']},{it['r']},{it['c']},{it['e']},{it['l']},{it['pd']}\n")
    with open(CSV_KITTY_PATH, "w", encoding="utf-8") as f:
        f.writelines(csv_lines)
        
    # 3. 寫入 Markdown 總表
    md_lines = [
        "# 🎀 KITTY 自訂新增韓語核心詞彙庫 (Custom Added Korean Vocabulary)\n\n",
        "> 本清單為使用者自訂擴充之韓語常用詞彙（編號 #5667 起），與 TOPIK 基準 5,666 詞庫無縫整合。\n\n",
        "| 序號 | 韓文單字 | 羅馬拼音 | 中文解釋 | 英文釋義 | 等級 | 詞性說明 |\n",
        "| :--- | :--- | :--- | :--- | :--- | :---: | :--- |\n"
    ]
    for it in kitty_data:
        md_lines.append(f"| {it['id']} | {it['k']} | {it['r']} | {it['c']} | {it['e']} | {it['l']} | {it['pd']} |\n")
    with open(MD_KITTY_PATH, "w", encoding="utf-8") as f:
        f.writelines(md_lines)

def add_vocab(korean, chinese, english="", level="A", pos="名詞", pos_desc=None, roman=None, auto_push=True):
    """新增詞彙並寫入 Kitty 自訂新增詞庫 (保持基準 5666 檔案不更動)"""
    korean = korean.strip()
    chinese = chinese.strip()
    english = english.strip() if english else f"Korean expression: {korean}"
    level = level.strip().upper() if level else "A"
    pos = pos.strip() if pos else "名詞"
    
    if not pos_desc:
        pos_desc = POS_DESCRIPTIONS.get(pos, f"{pos} 分類")
    
    if not roman:
        roman = romanize_hangul(korean)
        
    all_data = load_all_vocab_data()
    kitty_data = load_kitty_add_data()
    
    # 查重防呆 (跨全量雙庫比對)
    for item in all_data:
        if item.get('k') == korean:
            return {
                "success": False,
                "reason": "duplicate",
                "message": f"詞彙已存在！ID: #{item['id']} {item['k']} ({item['c']})",
                "existing_item": item
            }
            
    # 計算最新 ID (起始於 5667)
    max_id = max((item['id'] for item in all_data), default=5666)
    new_id = max(5666, max_id) + 1
    
    new_entry = {
        "id": new_id,
        "k": korean,
        "r": roman,
        "c": chinese,
        "e": english,
        "l": level,
        "p": pos,
        "pd": pos_desc
    }
    
    kitty_data.append(new_entry)
    save_kitty_add_files(kitty_data)
        
    git_result = None
    if auto_push:
        try:
            subprocess.run(["git", "add", "korean_vocab_kitty_add_data.js", "korean_vocab_kitty_add.csv", "korean_vocab_kitty_add.md"], cwd=BASE_DIR, check=True)
            commit_msg = f"feat(vocab): add entry #{new_id} {korean} ({chinese}) to kitty_add"
            subprocess.run(["git", "commit", "-m", commit_msg], cwd=BASE_DIR, check=True)
            push_proc = subprocess.run(["git", "push", "origin", "main"], cwd=BASE_DIR, capture_output=True, text=True)
            git_result = "Pushed successfully" if push_proc.returncode == 0 else f"Push failed: {push_proc.stderr}"
        except Exception as e:
            git_result = f"Git operation error: {str(e)}"
            
    return {
        "success": True,
        "new_entry": new_entry,
        "total_count": len(all_data) + 1,
        "kitty_count": len(kitty_data),
        "git_result": git_result
    }

def main():
    parser = argparse.ArgumentParser(description="KITTY 韓語核心詞庫自動化管理工具")
    subparsers = parser.add_subparsers(dest="command", help="子命令")
    
    # search 子命令
    p_search = subparsers.add_parser("search", help="搜尋詞庫")
    p_search.add_argument("query", help="搜尋字串 (韓文/中文/拼音/英文)")
    p_search.add_argument("--exact", action="store_true", help="精確匹配")
    p_search.add_argument("--json", action="store_true", help="輸出 JSON 格式")
    
    # add 子命令
    p_add = subparsers.add_parser("add", help="新增詞彙")
    p_add.add_argument("korean", help="韓文單字 (如 초급)")
    p_add.add_argument("--chinese", "-c", required=True, help="中文/粵語釋義")
    p_add.add_argument("--english", "-e", default="", help="英文釋義")
    p_add.add_argument("--level", "-l", default="A", choices=["A", "B", "C", "D"], help="TOPIK 級別 (預設 A)")
    p_add.add_argument("--pos", "-p", default="名詞", help="詞性 (如 名詞/動詞/形容詞/副詞/獨立詞)")
    p_add.add_argument("--pos-desc", default="", help="詳細詞性說明")
    p_add.add_argument("--roman", "-r", default="", help="自訂羅馬拼音 (若不填則自動生成)")
    p_add.add_argument("--no-push", action="store_true", help="不自動執行 git push")
    p_add.add_argument("--json", action="store_true", help="輸出 JSON 格式")
    
    # check-and-add 智慧模式
    p_check = subparsers.add_parser("check-and-add", help="檢查若無則新增")
    p_check.add_argument("korean", help="韓文單字")
    p_check.add_argument("--chinese", "-c", required=True, help="中文/粵語釋義")
    p_check.add_argument("--english", "-e", default="", help="英文釋義")
    p_check.add_argument("--level", "-l", default="A", help="TOPIK 級別")
    p_check.add_argument("--pos", "-p", default="名詞", help="詞性")
    p_check.add_argument("--no-push", action="store_true", help="不自動執行 git push")
    p_check.add_argument("--json", action="store_true", help="輸出 JSON 格式")
    
    args = parser.parse_args()
    
    if args.command == "search":
        results = search_vocab(args.query, exact=args.exact)
        if args.json:
            print(json.dumps(results, ensure_ascii=False, indent=2))
        else:
            print(f"🔍 搜尋「{args.query}」結果 (共 {len(results)} 筆)：")
            for r in results:
                source_tag = "🌸 基準庫" if r['id'] <= 5666 else "✨ Kitty自訂庫"
                print(f"  • [#{r['id']}] {r['k']} [{r['r']}] - {r['c']} ({r['p']} • {r['l']}級 • {source_tag})")
                
    elif args.command == "add" or args.command == "check-and-add":
        if args.command == "check-and-add":
            existing = search_vocab(args.korean, exact=True)
            if existing:
                res = {
                    "success": False,
                    "reason": "duplicate",
                    "message": f"詞彙已存在！ID: #{existing[0]['id']} {existing[0]['k']} ({existing[0]['c']})",
                    "existing_item": existing[0]
                }
                if args.json:
                    print(json.dumps(res, ensure_ascii=False, indent=2))
                else:
                    print(f"⚠️ {res['message']}")
                return
                
        res = add_vocab(
            korean=args.korean,
            chinese=args.chinese,
            english=args.english,
            level=args.level,
            pos=args.pos,
            pos_desc=getattr(args, 'pos_desc', ''),
            roman=getattr(args, 'roman', ''),
            auto_push=not args.no_push
        )
        
        if args.json:
            print(json.dumps(res, ensure_ascii=False, indent=2))
        else:
            if res["success"]:
                e = res["new_entry"]
                print(f"🎉 成功新增詞彙至 Kitty 自訂庫！")
                print(f"  • 編號：#{e['id']}")
                print(f"  • 韓文：{e['k']}")
                print(f"  • 拼音：[{e['r']}]")
                print(f"  • 釋義：{e['c']}")
                print(f"  • 英文：{e['e']}")
                print(f"  • 級別：{e['l']} 級 • {e['p']}")
                print(f"  • 自訂庫累計：{res['kitty_count']} 筆")
                print(f"  • 全庫總量：{res['total_count']} 筆")
                print(f"  • Git 狀態：{res['git_result']}")
            else:
                print(f"⚠️ 新增失敗：{res['message']}")
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
