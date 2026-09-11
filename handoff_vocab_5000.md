# 📋 專案交接報告 (handoff.md)

> **專案名稱**：韓語核心常用 5,000 詞彙結構化轉換與雙語對照資料庫 (Korean Core 5,000 Vocabulary Dataset)  
> **更新時間**：2026-08-28  
> **當前狀態**：✅ **5,000 詞全數處理完成，分期檔與全量合併檔皆通過 100% 結構驗證**  
> **目標工作目錄**：[`c:\Users\PC\Documents\Google-Antigravity\2026-Miscellaneous\`](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/) 與 [`Korean-Learning\`](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/Korean-Learning/)

---

## 📌 1. 任務背景與執行概述

本專案將包含 5,000 個韓語高頻核心單字（涵蓋 TOPIK 初級、中級至高級必備核心詞彙）與其英文解釋的文本資料庫，轉換為標準規範結構化表格：
- **標準欄位結構**：`編號 , 韓文 , 羅馬拼音 , 中文 , 英文`
- **核心處理歷程**：
  1. **第一期 (#1 ~ #1000)**：處理基礎核心 1,000 詞，建立官方 RR 羅馬拼音音變基準與 38 組多義詞消歧對照。
  2. **第二期 (#1001 ~ #2000)**：處理進階核心 1,000 詞，修正 `#1418 기13` $ightarrow$ `기`、`#1689 농산物` $ightarrow$ `농산물`，深度消歧 46 組多義詞。
  3. **第三期 (#2001 ~ #3000)**：處理高階核心 1,000 詞，校正 `#2776 기기13` $ightarrow$ `기기`、清洗 `#2992` 頁尾殘留字串，深度消歧 20+ 組多義詞。
  4. **第四期 (#3001 ~ #4000)**：處理深造核心 1,000 詞，補正 `#3755` 遺失詞頭為 `안기다`，校正 `#3322 년생80` $ightarrow$ `년생`、`#3439 통路` $ightarrow$ `통로`，修正 `#3043 성실하다`（誠實）、`#3192 도덕`（道德）、`#3010 수없이`（無數地）等英文釋義混淆。
  5. **第五期 (#4001 ~ #5000)**：處理擴充核心 1,000 詞，清洗字典編號後綴 `#4185 기성08` $ightarrow$ `기성`、`#4255 기23` $ightarrow$ `기`、`#4842 구15` $ightarrow$ `구`；校正英文筆誤 `#4602 왼손`（左手）、`#4877 왼발`（左腳）、`#4021 피디`（節目製作人）、`#4048 보자기`（包袱布）、`#4976 깨어지다`（破碎破裂）；深度消歧 `걷다`（捲起 vs 步行）、`타다`（領薪 vs 沖泡）、`보수`（保守 vs 維修）、`원`（圓形 vs 感嘆詞）、`만`（值得 vs 整整 vs 一萬）、`감`（感受 vs 柿子）、`남`（男子 vs 南方）等。

---

## 📦 2. 成果交付檔案清單 (Deliverables)

所有交付成果已同步產出於 `Korean-Learning/` 專案目錄與根目錄中，方便各類情境使用：

| 檔案名稱 | 格式 | 詞彙範圍 | 說明與適用場景 | 檔案路徑 |
| :--- | :--- | :--- | :--- | :--- |
| **`korean_vocab_5000.csv`** | CSV (UTF-8 with BOM) | #1 ~ #5000 (5,000 詞) | **全量合併總表**。帶 UTF-8 BOM，Excel / Notion / Sheets 開啟無亂碼，可直接全量匯入 Anki | [korean_vocab_5000.csv](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/Korean-Learning/korean_vocab_5000.csv) |
| **`korean_vocab_5000.md`** | Markdown Table | #1 ~ #5000 (5,000 詞) | **全量合併總表**。適合 GitHub、Obsidian 檢視與全文搜尋 | [korean_vocab_5000.md](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/Korean-Learning/korean_vocab_5000.md) |
| **`korean_vocab_4001_5000.csv`** | CSV (UTF-8 with BOM) | #4001 ~ #5000 (1,000 詞) | 第五期獨立 CSV，適合分階段匯入與學習進度追蹤 | [korean_vocab_4001_5000.csv](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/Korean-Learning/korean_vocab_4001_5000.csv) |
| **`korean_vocab_4001_5000.md`** | Markdown Table | #4001 ~ #5000 (1,000 詞) | 第五期獨立 Markdown 表格 | [korean_vocab_4001_5000.md](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/Korean-Learning/korean_vocab_4001_5000.md) |
| **`korean_vocab_4000.csv`** | CSV (UTF-8 with BOM) | #1 ~ #4000 (4,000 詞) | 前四期合併 CSV | [korean_vocab_4000.csv](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/Korean-Learning/korean_vocab_4000.csv) |
| **`korean_vocab_3001_4000.csv`** | CSV (UTF-8 with BOM) | #3001 ~ #4000 (1,000 詞) | 第四期獨立 CSV | [korean_vocab_3001_4000.csv](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/Korean-Learning/korean_vocab_3001_4000.csv) |
| **`korean_vocab_3000.csv`** | CSV (UTF-8 with BOM) | #1 ~ #3000 (3,000 詞) | 前三期合併 CSV | [korean_vocab_3000.csv](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/Korean-Learning/korean_vocab_3000.csv) |
| **`korean_vocab_2001_3000.csv`** | CSV (UTF-8 with BOM) | #2001 ~ #3000 (1,000 詞) | 第三期獨立 CSV | [korean_vocab_2001_3000.csv](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/Korean-Learning/korean_vocab_2001_3000.csv) |
| **`korean_vocab_1001_2000.csv`** | CSV (UTF-8 with BOM) | #1001 ~ #2000 (1,000 詞) | 第二期獨立 CSV | [korean_vocab_1001_2000.csv](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/Korean-Learning/korean_vocab_1001_2000.csv) |
| **`korean_vocab_1000.csv`** | CSV (UTF-8 with BOM) | #1 ~ #1000 (1,000 詞) | 第一期基礎詞彙 CSV | [korean_vocab_1000.csv](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/Korean-Learning/korean_vocab_1000.csv) |

---

## 🗂️ 3. 資料庫欄位結構定義

| 欄位名稱 | 型態 | 範例 | 說明 |
| :--- | :--- | :--- | :--- |
| **編號** | Integer | `1` ~ `5000` | 依詞頻出現順序排序，全量連續遞增無中斷 |
| **韓文** | String | `잡아당기다`, `기성`, `사투리` | 韓文標準詞彙原形或標準名詞型態 |
| **羅馬拼音** | String | `jabadanggida`, `giseong`, `saturi` | 韓國官方 Revised Romanization (RR) 音標，完整反映各類連音與音變 |
| **中文** | String | `拉、拉扯、拽`, `既成、現存的` | 依據英韓語境精準消歧之道地繁體中文教學釋義 |
| **英文** | String | `Pull`, `To be already existing...` | 原始英文定義（已校正筆誤、清理跳脫符號與雜訊空格） |

---

## 🔍 4. 關鍵多義詞精準消歧對照表 (Key Disambiguation)

本次 5,000 詞總表整合中，針對各期重疊之關鍵多義單字進行了極其嚴格的消歧對照：

| 韓文 | 編號與英文定義 | 精準中文釋義 | 羅馬拼音 |
| :--- | :--- | :--- | :--- |
| **걷다** | #4028 `Roll back sleeves / furl / finish work`<br>#4904 `Walk on or tread on`<br>*(#486 走 / 捲起)* | 捲起、收起、結束（工作）<br>步行、走、踏<br>*(走 / 捲起)* | `geotda` |
| **타다** | #4173 `Get salary`<br>#4567 `Put in, mix, dissolve`<br>*(#401 搭乘 / #1835 燃燒)* | 領取、領到（工資/獎金）<br>沖泡、溶解、摻入<br>*(搭乘 / 燃燒)* | `tada` |
| **보수** | #4340 `Conservation`<br>#4587 `mending,repair`<br>*(#712 報酬/工資)* | 保守、守舊<br>修補、維修、修繕<br>*(報酬、酬勞)* | `bosu` |
| **원** | #4155 `A circle`<br>#4645 `Goodness! Gracious!`<br>*(#63 韓元)* | 圓形、圓圈<br>哎呀、天哪（感嘆詞）<br>*(韓元)* | `won` |
| **만** | #4494 `To be of sufficient quantity`<br>#4729 `Just, full`<br>#4985 `10000` | 值得、足以、達到...程度<br>整整、滿、剛好<br>萬（數字 10,000） | `man` |
| **감** | #4026 `Feelings`<br>#4971 `Persimmon` | 感受、感覺、情緒<br>柿子（水果） | `gam` |
| **남** | #4544 `A man`<br>#4977 `The south`<br>*(#395 他人)* | 男子、男人<br>南方、南邊<br>*(別人、他人)* | `nam` |
| **묵다** | #4336 `Get old`<br>#4852 `Stay overnight s.w.` | 陳舊、久放<br>住宿、過夜、投宿 | `mukda` |
| **찌다** | #4771 `chop,hack`<br>#4830 `To put on weight` | 剁、劈、砍<br>發胖、長肉、長胖 | `jjida` |
| **안기다** | #3292 `to be embraced by sb`<br>#3754 `To fix on a person, lay the blame`<br>#3755 `To throw onto sb, to pass onto sb...` | 被擁抱、投入懷抱（被動）<br>歸咎、轉嫁、推卸（責任）<br>甩給、推給、託付給他人 | `angida` |
| **차다** | #3094 `cold,chilly`<br>#3215 `Put on, fasten,wear`<br>*(#885 滿 / #1925 踢)* | 寒冷、冰冷（形容詞）<br>佩戴、繫上、掛著（動詞）<br>*(充滿 / 踢)* | `chada` |
| **간** | #3028 `Liver`<br>#3227 `A salty taste or saltiness`<br>*(#159 間隔)* | 肝、肝臟<br>鹹淡、鹹味、鹽分<br>*(期間、之間)* | `gan` |

---

## 🚀 5. 後續應用與整合指引 (Next Steps)

1. **整合至 Sanrio 韓語發音積木樂園**：
   - 專案路徑：[`Korean-Learning\`](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/Korean-Learning/)
   - 目前資料庫已具備完整的 5,000 詞高頻字庫，涵蓋 TOPIK 初級、中級、高級全階段核心題庫。
2. **Anki / 閃卡批次匯入**：
   - 使用 `korean_vocab_5000.csv` 即可一次匯入全量 5,000 詞卡片。
3. **TTS 批次語音合成**：
   - 可利用 Edge-TTS 或相關語音合成工具對 5,000 個詞彙進行標準發音檔批次產出。
