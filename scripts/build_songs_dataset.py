#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
韓語名曲資料集建置管線 (Korean Songs Dataset Builder)
將 Excel 歌詞檔解析為結構化 JS 常數與 Markdown 對照文件
"""

import os
import sys
import json
import openpyxl

sys.stdout.reconfigure(encoding='utf-8')

def build_songs_dataset():
    excel_path = r'C:\Users\PC\Desktop\Dokyeom – Stay With Me (毛骨毛骨悚然的戀愛).xlsx'
    if not os.path.exists(excel_path):
        print(f"錯誤：找不到 Excel 檔案 {excel_path}")
        return

    wb = openpyxl.load_workbook(excel_path)
    sheet = wb.active

    # 解析歌曲 1：李碩珉 DK - Stay With Me
    song_info = {
        "id": "dk_stay_with_me",
        "title": "Stay With Me",
        "artist": "李碩珉 (도겸 / DK - SEVENTEEN)",
        "source": "韓劇《毛骨悚然的戀愛》(괴기맨숀) 插曲 / OST",
        "tags": ["韓劇OST", "抒情", "經典推薦", "情感爆發"],
        "coverEmoji": "🎤",
        "themeColor": "pink",
        "difficulty": 2,
        "description": "SEVENTEEN 主唱李碩珉 (DK) 傾情演唱的影視插曲，以溫暖細膩而富有穿透力的歌聲，唱出在恐懼迷茫中渴望陪伴與救贖的心境。",
        "sections": []
    }

    current_section = None
    lyric_counter = 1

    for row_idx in range(1, sheet.max_row + 1):
        col1 = sheet.cell(row_idx, 1).value
        col2 = sheet.cell(row_idx, 2).value
        col4 = sheet.cell(row_idx, 4).value

        if not col1 and not col2 and not col4:
            continue

        c1 = str(col1).strip() if col1 else ""
        c2 = str(col2).strip() if col2 else ""
        c4 = str(col4).strip() if col4 else ""

        # 檢查是否為歌曲大標題
        if c1.startswith('[도겸') or c1.startswith('[李碩珉'):
            continue

        # 檢查是否為段落標籤 [Verse 1], [Chorus], [Pre-Chorus], [Bridge]
        if c1.startswith('[') and c1.endswith(']'):
            sec_name_en = c1.strip('[]')
            sec_name_zh = c4.strip('[]') if c4 else sec_name_en
            current_section = {
                "tag": sec_name_en,
                "label": f"{c1} {c4}" if c4 else c1,
                "lyrics": []
            }
            song_info["sections"].append(current_section)
            continue

        # 歌詞行
        if current_section is None:
            current_section = {
                "tag": "Intro",
                "label": "[Intro] [前奏/序曲]",
                "lyrics": []
            }
            song_info["sections"].append(current_section)

        lyric_item = {
            "id": lyric_counter,
            "k": c1, # 韓文原詞
            "r": c2, # 羅馬拼音
            "c": c4, # 中文歌詞
            "section": current_section["tag"]
        }
        current_section["lyrics"].append(lyric_item)
        lyric_counter += 1

    # 封裝全量歌曲資料庫列表
    all_songs = [song_info]

    output_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    js_path = os.path.join(output_dir, 'korean_songs_data.js')
    md_path = os.path.join(output_dir, 'korean_songs_data.md')

    # 1. 輸出 JS 常數檔案
    js_content = f"""/**
 * KITTY 韓語名曲歌詞資料集 (Korean Songs Dataset)
 * 自動產生自 build_songs_dataset.py
 * 收錄歌曲總數：{len(all_songs)} 首，總歌詞行數：{lyric_counter - 1} 句
 */
window.KOREAN_SONGS_DATA = {json.dumps(all_songs, ensure_ascii=False, indent=4)};
"""
    with open(js_path, 'w', encoding='utf-8') as f:
        f.write(js_content)
    print(f"✅ 成功產出 JS 資料集：{js_path} (共 {lyric_counter - 1} 句歌詞)")

    # 2. 輸出 Markdown 對照文檔
    md_lines = [
        f"# 🎵 韓語名曲歌詞精讀對照庫",
        f"",
        f"> 本文檔記錄全站收錄之韓語歌曲、演唱者、段落拆解與歌詞對照清單。",
        f"",
        f"---",
        f""
    ]

    for s_idx, song in enumerate(all_songs, 1):
        md_lines.append(f"## {s_idx}. {song['artist']} - 《{song['title']}》")
        md_lines.append(f"- **出處**：{song['source']}")
        md_lines.append(f"- **標籤**：{' • '.join(song['tags'])}")
        md_lines.append(f"- **簡介**：{song['description']}")
        md_lines.append(f"")

        for sec in song["sections"]:
            md_lines.append(f"### {sec['label']}")
            md_lines.append(f"| # | 韓文原詞 | 羅馬拼音 | 繁體中文歌詞 |")
            md_lines.append(f"|---|---|---|---|")
            for item in sec["lyrics"]:
                md_lines.append(f"| {item['id']} | **{item['k']}** | `{item['r']}` | {item['c']} |")
            md_lines.append(f"")
        md_lines.append(f"---")
        md_lines.append(f"")

    with open(md_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(md_lines))
    print(f"✅ 成功產出 Markdown 對照檔：{md_path}")

if __name__ == '__main__':
    build_songs_dataset()
