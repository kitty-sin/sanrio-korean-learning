#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
批次新增韓國餐廳/烤肉店點餐必備生詞至 Kitty 自訂詞庫
"""

import sys
import os
import json

sys.stdout.reconfigure(encoding='utf-8')
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from manage_vocab import load_kitty_add_data, save_kitty_add_files, POS_DESCRIPTIONS

items_to_add = [
    {
        'k': '저기요',
        'r': 'jeogiyo',
        'c': '不好意思、這裡請（餐廳/公共場合呼叫服務生或路人）',
        'e': 'Excuse me (used to get attention, call a server in a restaurant)',
        'l': 'A',
        'p': '獨立詞',
    },
    {
        'k': '주세요',
        'r': 'juseyo',
        'c': '請給我…（日常常用禮貌命令敬語）',
        'e': 'Please give me... (polite request/imperative)',
        'l': 'A',
        'p': '獨立詞',
    },
    {
        'k': '하나 주세요',
        'r': 'hana juseyo',
        'c': '請給我一個（餐廳點餐最常用實用句）',
        'e': 'Please give me one (common restaurant ordering phrase)',
        'l': 'A',
        'p': '獨立詞',
    },
    {
        'k': '두 개',
        'r': 'du gae',
        'c': '兩個（數量詞組，純韓語數詞 두 + 量詞 개）',
        'e': 'Two items, two pieces (number + counter)',
        'l': 'A',
        'p': '依存名詞',
    },
    {
        'k': '1인분',
        'r': 'il-inbun',
        'c': '一人份（餐點/烤肉份數單位）',
        'e': 'One serving, portion for 1 person',
        'l': 'A',
        'p': '依存名詞',
    },
    {
        'k': '2인분',
        'r': 'i-inbun',
        'c': '兩人份（餐點/烤肉份數單位）',
        'e': 'Two servings, portion for 2 people',
        'l': 'A',
        'p': '依存名詞',
    },
    {
        'k': '소자로 주세요',
        'r': 'sojaro juseyo',
        'c': '請給我小份的（餐廳點餐規格句）',
        'e': 'Please give me the small size',
        'l': 'A',
        'p': '獨立詞',
    },
    {
        'k': '중자로 주세요',
        'r': 'jungjaro juseyo',
        'c': '請給我中份的（餐廳點餐規格句）',
        'e': 'Please give me the medium size',
        'l': 'A',
        'p': '獨立詞',
    },
    {
        'k': '대자로 주세요',
        'r': 'daejaro juseyo',
        'c': '請給我大份的（餐廳點餐規格句）',
        'e': 'Please give me the large size',
        'l': 'A',
        'p': '獨立詞',
    },
    {
        'k': '메뉴판',
        'r': 'menyupan',
        'c': '菜單、價目表（外來語 메뉴 + 漢字 板）',
        'e': 'Menu, menu board',
        'l': 'A',
        'p': '名詞',
    },
    {
        'k': '모듬',
        'r': 'modeum',
        'c': '綜合拼盤（烤肉/生魚片拼盤；標準語亦寫作 모둠）',
        'e': 'Assorted combo / platter (standard: 모둠)',
        'l': 'A',
        'p': '名詞',
    },
    {
        'k': '셀프',
        'r': 'selpeu',
        'c': '自助（Self，如開水自取 물은 셀프、小菜自取）',
        'e': 'Self-service (water, side dishes)',
        'l': 'A',
        'p': '名詞',
    },
    {
        'k': '단무지',
        'r': 'danmuji',
        'c': '黃色醃蘿蔔片（炸醬麵、紫菜包飯必備解膩配菜）',
        'e': 'Pickled yellow radish (danmuji)',
        'l': 'A',
        'p': '名詞',
    },
    {
        'k': '깻잎',
        'r': 'kkaennip',
        'c': '芝麻葉、紫蘇葉（烤肉包肉靈魂，發音音變為 [깬닙]）',
        'e': 'Perilla leaf, sesame leaf (for Korean BBQ wraps; pronounced kkaennip)',
        'l': 'A',
        'p': '名詞',
    },
    {
        'k': '쌈장',
        'r': 'ssamjang',
        'c': '包飯醬、包肉醬（大醬+辣醬+蒜泥麻油調配之烤肉靈魂沾醬）',
        'e': 'Ssamjang (Korean BBQ dipping paste)',
        'l': 'A',
        'p': '名詞',
    },
    {
        'k': '기름장',
        'r': 'gireumjang',
        'c': '麻油鹽沾醬（香油+鹽巴+胡椒，沾烤五花肉、橫膈膜或生牛肉必備）',
        'e': 'Sesame oil and salt dip (for grilled pork belly / beef)',
        'l': 'A',
        'p': '名詞',
    },
    {
        'k': '멜젓',
        'r': 'meljeot',
        'c': '濟州滾煮醃鯷魚沾醬（濟州黑豬肉烤肉專屬熱沾醬）',
        'e': 'Meljeot (Jeju salted anchovy sauce boiled for grilled black pork)',
        'l': 'B',
        'p': '名詞',
    },
    {
        'k': '사리',
        'r': 'sari',
        'c': '加點配料（火鍋、部隊鍋、辣炒雞等加點麵條或年糕配料）',
        'e': 'Food add-ins / extra noodle toppings (ramen, udon, etc.)',
        'l': 'A',
        'p': '名詞',
    },
    {
        'k': '떡',
        'r': 'tteok',
        'c': '年糕、韓式年糕（如辣炒年糕 떡볶이、年糕湯 떡국）',
        'e': 'Tteok, Korean rice cake',
        'l': 'A',
        'p': '名詞',
    },
    {
        'k': '수제비',
        'r': 'sujebi',
        'c': '韓式麵疙瘩（傳統湯麵疙瘩料理）',
        'e': 'Sujebi, hand-pulled dough flake soup',
        'l': 'A',
        'p': '名詞',
    },
    {
        'k': '밤 막걸리',
        'r': 'bam makgeolri',
        'c': '栗子馬格利米酒（香甜順口微氣泡人氣韓國米酒）',
        'e': 'Chestnut makgeolli (popular sweet chestnut rice wine)',
        'l': 'A',
        'p': '名詞',
    },
    {
        'k': '밤 먹걸리',
        'r': 'bam meokgeolri',
        'c': '栗子馬格利米酒（⚠️ 此為常見筆誤/諧音寫法，標準拼法為 밤 막걸리）',
        'e': 'Chestnut makgeolli (spelling variant / common typo for 밤 막걸리)',
        'l': 'A',
        'p': '名詞',
    },
    {
        'k': '처음처럼',
        'r': 'cheoeumcheoreom',
        'c': '初飲初樂燒酒（樂天旗下國民人氣綠瓶燒酒，意為「如初」）',
        'e': 'Chum-Churum (popular Korean soju brand by Lotte)',
        'l': 'B',
        'p': '專有名詞',
    },
    {
        'k': '후레쉬',
        'r': 'hureswi',
        'c': '真露 Fresh 燒酒（참이슬 후레쉬，韓國銷量常勝軍經典原味燒酒）',
        'e': 'Chamisul Fresh (Korea\'s best-selling classic soju by HiteJinro)',
        'l': 'B',
        'p': '專有名詞',
    },
    {
        'k': '진로',
        'r': 'jinro',
        'c': '真露燒酒、金露復古藍瓶燒酒（百年招牌蟾蜍標誌燒酒）',
        'e': 'Jinro Soju (iconic retro blue bottle soju by HiteJinro)',
        'l': 'B',
        'p': '專有名詞',
    },
    {
        'k': '새로',
        'r': 'saero',
        'c': '初露零糖燒酒（樂天旗下超人氣無糖九尾狐燒酒）',
        'e': 'Saero Zero Sugar Soju (popular zero-sugar soju by Lotte)',
        'l': 'B',
        'p': '專有名詞',
    },
    {
        'k': '테라',
        'r': 'tera',
        'c': 'TERRA 啤酒（HiteJinro 綠瓶人氣拉格啤酒，濃郁清爽）',
        'e': 'TERRA beer (popular green bottle lager beer by HiteJinro)',
        'l': 'B',
        'p': '專有名詞',
    },
    {
        'k': '카스',
        'r': 'kaseu',
        'c': 'Cass 啤酒（OB 啤酒出品，韓國國民市佔第一透明藍瓶拉格啤酒）',
        'e': 'Cass beer (Korea\'s iconic #1 best-selling crisp lager by OB)',
        'l': 'B',
        'p': '專有名詞',
    },
    {
        'k': '켈리',
        'r': 'kelri',
        'c': 'Kelly 啤酒（HiteJinro 雙重熟成 100% 全麥琥珀金啤酒）',
        'e': 'Kelly beer (all-malt double-fermented amber lager by HiteJinro)',
        'l': 'B',
        'p': '專有名詞',
    }
]

def run():
    kitty_data = load_kitty_add_data()
    max_id = max((item['id'] for item in kitty_data), default=5708)
    print(f"Current count: {len(kitty_data)}, max ID: {max_id}")
    
    added_entries = []
    current_id = max_id
    for item in items_to_add:
        current_id += 1
        pd = POS_DESCRIPTIONS.get(item['p'], f"{item['p']} 分類")
        entry = {
            'id': current_id,
            'k': item['k'],
            'r': item['r'],
            'c': item['c'],
            'e': item['e'],
            'l': item['l'],
            'p': item['p'],
            'pd': pd
        }
        kitty_data.append(entry)
        added_entries.append(entry)
        
    save_kitty_add_files(kitty_data)
    print(f"Successfully added {len(added_entries)} entries to Kitty add dataset!")
    print(f"New Kitty add count: {len(kitty_data)} (IDs: #{added_entries[0]['id']} ~ #{added_entries[-1]['id']})")

if __name__ == '__main__':
    run()
