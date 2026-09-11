# 📋 專案交接報告 (handoff.md)

> **專案名稱**：韓語核心常用 3,000 詞彙結構化轉換與雙語對照資料庫 (Korean Core 3,000 Vocabulary Dataset)  
> **更新時間**：2026-08-28  
> **當前狀態**：✅ **3,000 詞全數處理完成，分期檔與全量合併檔皆通過 100% 結構驗證**  
> **目標工作目錄**：[`c:\Users\PC\Documents\Google-Antigravity\2026-Miscellaneous\`](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/) 與 [`Korean-Learning\`](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/Korean-Learning/)

---

## 📌 1. 任務背景與執行概述

本專案將包含 3,000 個韓語高頻核心單字（涵蓋 TOPIK 初級、中級至進階核心詞彙）與其英文解釋的文本資料庫，轉換為規範結構化表格：
- **標準欄位結構**：`編號 , 韓文 , 羅馬拼音 , 中文 , 英文`
- **核心處理歷程**：
  1. **第一期 (#1 ~ #1000)**：處理基礎核心 1,000 詞，建立官方 RR 羅馬拼音音變基準與 38 組多義詞消歧對照。
  2. **第二期 (#1001 ~ #2000)**：接續處理進階核心 1,000 詞，修正 `#1418 기13` $ightarrow$ `기`、`#1689 농산物` $ightarrow$ `농산물`，深度消歧 46 組多義詞。
  3. **第三期 (#2001 ~ #3000)**：處理高階延伸核心 1,000 詞，精準解析單行製表符格式，校正 `#2776 기기13` $ightarrow$ `기기`、清洗 `#2992` 頁尾殘留字串 `Insist on6000 Most Common Korean Words – 2` $ightarrow$ `Insist on, demand, force`、校正 `#2816 불행하다` 英文混淆，並深度消歧 20+ 組多義詞（如 `가리다`、`절`、`차`、`묻다`、`깨다`、`굳이`）。

---

## 📦 2. 成果交付檔案清單 (Deliverables)

所有交付成果已同步產出於 `Korean-Learning/` 專案目錄與根目錄中，方便各類情境使用：

| 檔案名稱 | 格式 | 詞彙範圍 | 說明與適用場景 | 檔案路徑 |
| :--- | :--- | :--- | :--- | :--- |
| **`korean_vocab_3000.csv`** | CSV (UTF-8 with BOM) | #1 ~ #3000 (3,000 詞) | **全量合併總表**。帶 UTF-8 BOM，Excel / Notion / Sheets 開啟無亂碼，可直接全量匯入 Anki | [korean_vocab_3000.csv](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/Korean-Learning/korean_vocab_3000.csv) |
| **`korean_vocab_3000.md`** | Markdown Table | #1 ~ #3000 (3,000 詞) | **全量合併總表**。適合 GitHub、Obsidian 檢視與全文搜尋 | [korean_vocab_3000.md](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/Korean-Learning/korean_vocab_3000.md) |
| **`korean_vocab_2001_3000.csv`** | CSV (UTF-8 with BOM) | #2001 ~ #3000 (1,000 詞) | 第三期獨立 CSV，適合分階段匯入與學習進度追蹤 | [korean_vocab_2001_3000.csv](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/Korean-Learning/korean_vocab_2001_3000.csv) |
| **`korean_vocab_2001_3000.md`** | Markdown Table | #2001 ~ #3000 (1,000 詞) | 第三期獨立 Markdown 表格 | [korean_vocab_2001_3000.md](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/Korean-Learning/korean_vocab_2001_3000.md) |
| **`korean_vocab_1001_2000.csv`** | CSV (UTF-8 with BOM) | #1001 ~ #2000 (1,000 詞) | 第二期獨立 CSV | [korean_vocab_1001_2000.csv](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/Korean-Learning/korean_vocab_1001_2000.csv) |
| **`korean_vocab_1001_2000.md`** | Markdown Table | #1001 ~ #2000 (1,000 詞) | 第二期獨立 Markdown 表格 | [korean_vocab_1001_2000.md](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/Korean-Learning/korean_vocab_1001_2000.md) |
| **`korean_vocab_1000.csv`** | CSV (UTF-8 with BOM) | #1 ~ #1000 (1,000 詞) | 第一期基礎詞彙 CSV | [korean_vocab_1000.csv](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/Korean-Learning/korean_vocab_1000.csv) |
| **`korean_vocab_1000.md`** | Markdown Table | #1 ~ #1000 (1,000 詞) | 第一期基礎詞彙 Markdown 表格 | [korean_vocab_1000.md](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/Korean-Learning/korean_vocab_1000.md) |

---

## 🗂️ 3. 資料庫欄位結構定義

| 欄位名稱 | 型態 | 範例 | 說明 |
| :--- | :--- | :--- | :--- |
| **編號** | Integer | `1` ~ `3000` | 依詞頻出現順序排序，全量連續遞增無中斷 |
| **韓文** | String | `화학`, `가리다`, `굳이` | 韓文標準詞彙原形或標準名詞型態 |
| **羅馬拼音** | String | `hwahak`, `garida`, `guji` | 韓國官方 Revised Romanization (RR) 音標，完整反映各類連音與音變 |
| **中文** | String | `堆積、堆放、遮蔽`, `挑選、分辨、認生` | 依據英韓語境精準消歧之道地繁體中文教學釋義 |
| **英文** | String | `Chemistry`, `Insist on, demand, force` | 原始英文定義（已清理跳脫符號、頁尾殘留文字與雜訊空格） |

---

## 🔍 4. 關鍵多義詞精準消歧對照表 (Key Disambiguation)

本次 3,000 詞總表整合中，針對多期重疊之關鍵多義單字進行了極其嚴格的消歧對照：

| 韓文 | 編號與英文定義 | 精準中文釋義 | 羅馬拼音 |
| :--- | :--- | :--- | :--- |
| **가리다** | #2003 `Pile up or stack up or heap up`<br>#2504 `Choose or select` | 堆積、堆放、遮蔽<br>挑選、分辨、認生 | `garida` |
| **절** | #2175 `A Buddhist temple`<br>#2824 `Bow in salutation` | 寺院、寺廟<br>行禮、鞠躬、拜年 | `jeol` |
| **차** | #2610 `Tea`<br>#2667 `difference,margin`<br>*(#370 車輛 / #858 次數)* | 茶、茶水<br>差距、差額、差別<br>*(車輛 / 次數)* | `cha` |
| **신** | #2031 `joy,delight`<br>*(#1010 神 / 鞋子)* | 興致、興奮、興頭<br>*(神明 / 鞋)* | `sin` |
| **연기** | #2050 `Smoke, fume`<br>*(#1519 表演/演技)* | 煙、煙霧<br>*(演技 / 延期)* | `yeon-gi` |
| **치다** | #2057 `to count, reckon, calculate`<br>*(打/彈奏/颳風)* | 算作、計算、當作<br>*(打 / 彈)* | `chida` |
| **쉬다** | #2069 `to breathe`<br>*(休息 / 嘶啞)* | 呼吸、喘氣（숨을 쉬다）<br>*(休息)* | `swida` |
| **갈다** | #2078 `1) sharpen 2) rub 3) make juice...`<br>*(換/更換)* | 磨（刀）、研磨、榨（汁）<br>*(更換)* | `galda` |
| **수입** | #2190 `Income`<br>*(#1044 進口)* | 收入、收益<br>*(進口、輸入)* | `suip` |
| **경기** | #2202 `The business market’s state`<br>*(比賽/球賽)* | 景氣、經濟狀況<br>*(比賽)* | `gyeonggi` |
| **이르다** | #2213 `Be early, premature`<br>#2447 `Inform, report, tell` | 早、過早、尚早<br>告訴、告知、告發 | `ireuda` |
| **다리** | #2139 `Bridge`<br>*(腿、腳)* | 橋、橋樑<br>*(腿)* | `dari` |
| **말** | #2270 `Horse`<br>*(話語 / 結尾)* | 馬、駿馬<br>*(話 / 末)* | `mal` |
| **풀** | #2198 `Grass (cut the ~)`<br>*(膠水)* | 草、雜草、草坪<br>*(漿糊)* | `pul` |
| **주** | #2238 `One week`<br>#2376 `one's master, ones employer` | 週、星期<br>主人、雇主 | `ju` |
| **이** | #2329 `A tooth`<br>*(#24 這個人 / #943 這個)* | 牙齒、齒<br>*(人 / 這)* | `i` |
| **이상** | #2330 `An ideal, a goal`<br>*(#173 以上 / #1831 異常)* | 理想、目標<br>*(以上 / 異常)* | `isang` |
| **깨다** | #2874 `Break or crack`<br>*(#1976 醒來)* | 打碎、摔破、打破<br>*(清醒)* | `kkaeda` |
| **묻다** | #2786 `to Bury`<br>*(#261 詢問 / #1980 沾染)* | 埋、掩埋、埋藏<br>*(問 / 沾上)* | `mutda` |
| **굳이** | #2111 `Firmly or admanantly` | 硬要、非得、執意 | `guji` (口蓋音化) |

---

## 🚀 5. 後續應用與整合指引 (Next Steps)

1. **整合至 Sanrio 韓語發音積木樂園**：
   - 專案路徑：[`Korean-Learning\`](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/Korean-Learning/)
   - 目前資料庫已完整具備 3,000 詞高頻字庫，可按等級分群（初級 1-1000、中級 1001-2000、進階 2001-3000）導入 Firestore 關卡題庫。
2. **Anki / 閃卡批次匯入**：
   - 使用 `korean_vocab_3000.csv` 即可一次匯入全量詞彙卡片，欄位對齊：韓文 $\rightarrow$ 正面；拼音、中文、英文 $\rightarrow$ 背面。
3. **TTS 批次語音合成**：
   - 可利用 Edge-TTS 或相關語音合成工具對 3,000 個詞彙進行標準發音檔批次產出。
