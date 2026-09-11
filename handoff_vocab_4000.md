# 📋 專案交接報告 (handoff.md)

> **專案名稱**：韓語核心常用 4,000 詞彙結構化轉換與雙語對照資料庫 (Korean Core 4,000 Vocabulary Dataset)  
> **更新時間**：2026-08-28  
> **當前狀態**：✅ **4,000 詞全數處理完成，分期檔與全量合併檔皆通過 100% 結構驗證**  
> **目標工作目錄**：[`c:\Users\PC\Documents\Google-Antigravity\2026-Miscellaneous\`](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/) 與 [`Korean-Learning\`](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/Korean-Learning/)

---

## 📌 1. 任務背景與執行概述

本專案將包含 4,000 個韓語高頻核心單字（涵蓋 TOPIK 初級至高級核心詞彙）與其英文解釋的文本資料庫，轉換為規範結構化表格：
- **標準欄位結構**：`編號 , 韓文 , 羅馬拼音 , 中文 , 英文`
- **核心處理歷程**：
  1. **第一期 (#1 ~ #1000)**：處理基礎核心 1,000 詞，建立官方 RR 羅馬拼音音變基準與 38 組多義詞消歧對照。
  2. **第二期 (#1001 ~ #2000)**：處理進階核心 1,000 詞，修正 `#1418 기13` $ightarrow$ `기`、`#1689 농산物` $ightarrow$ `농산물`，深度消歧 46 組多義詞。
  3. **第三期 (#2001 ~ #3000)**：處理高階核心 1,000 詞，校正 `#2776 기기13` $ightarrow$ `기기`、清洗 `#2992` 頁尾殘留字串，深度消歧 20+ 組多義詞。
  4. **第四期 (#3001 ~ #4000)**：處理深造延伸核心 1,000 詞，補正 `#3755` 遺失詞頭為 `안기다`，校正 `#3322 년생80` $ightarrow$ `년생`、`#3439 통路` $ightarrow$ `통로`，修正 `#3043 성실하다`（誠實）、`#3192 도덕`（道德）、`#3010 수없이`（無數地）等英文釋義混淆，並對 20+ 組多義詞進行深度消歧。

---

## 📦 2. 成果交付檔案清單 (Deliverables)

所有交付成果已同步產出於 `Korean-Learning/` 專案目錄與根目錄中，方便各類情境使用：

| 檔案名稱 | 格式 | 詞彙範圍 | 說明與適用場景 | 檔案路徑 |
| :--- | :--- | :--- | :--- | :--- |
| **`korean_vocab_4000.csv`** | CSV (UTF-8 with BOM) | #1 ~ #4000 (4,000 詞) | **全量合併總表**。帶 UTF-8 BOM，Excel / Notion / Sheets 開啟無亂碼，可直接全量匯入 Anki | [korean_vocab_4000.csv](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/Korean-Learning/korean_vocab_4000.csv) |
| **`korean_vocab_4000.md`** | Markdown Table | #1 ~ #4000 (4,000 詞) | **全量合併總表**。適合 GitHub、Obsidian 檢視與全文搜尋 | [korean_vocab_4000.md](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/Korean-Learning/korean_vocab_4000.md) |
| **`korean_vocab_3001_4000.csv`** | CSV (UTF-8 with BOM) | #3001 ~ #4000 (1,000 詞) | 第四期獨立 CSV，適合分階段匯入與學習進度追蹤 | [korean_vocab_3001_4000.csv](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/Korean-Learning/korean_vocab_3001_4000.csv) |
| **`korean_vocab_3001_4000.md`** | Markdown Table | #3001 ~ #4000 (1,000 詞) | 第四期獨立 Markdown 表格 | [korean_vocab_3001_4000.md](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/Korean-Learning/korean_vocab_3001_4000.md) |
| **`korean_vocab_3000.csv`** | CSV (UTF-8 with BOM) | #1 ~ #3000 (3,000 詞) | 前三期合併 CSV | [korean_vocab_3000.csv](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/Korean-Learning/korean_vocab_3000.csv) |
| **`korean_vocab_2001_3000.csv`** | CSV (UTF-8 with BOM) | #2001 ~ #3000 (1,000 詞) | 第三期獨立 CSV | [korean_vocab_2001_3000.csv](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/Korean-Learning/korean_vocab_2001_3000.csv) |
| **`korean_vocab_1001_2000.csv`** | CSV (UTF-8 with BOM) | #1001 ~ #2000 (1,000 詞) | 第二期獨立 CSV | [korean_vocab_1001_2000.csv](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/Korean-Learning/korean_vocab_1001_2000.csv) |
| **`korean_vocab_1000.csv`** | CSV (UTF-8 with BOM) | #1 ~ #1000 (1,000 詞) | 第一期基礎詞彙 CSV | [korean_vocab_1000.csv](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/Korean-Learning/korean_vocab_1000.csv) |

---

## 🗂️ 3. 資料庫欄位結構定義

| 欄位名稱 | 型態 | 範例 | 說明 |
| :--- | :--- | :--- | :--- |
| **編號** | Integer | `1` ~ `4000` | 依詞頻出現順序排序，全量連續遞增無中斷 |
| **韓文** | String | `물러나다`, `안기다`, `통로` | 韓文標準詞彙原形或標準名詞型態 |
| **羅馬拼音** | String | `mulleonada`, `angida`, `tongro` | 韓國官方 Revised Romanization (RR) 音標，完整反映各類連音與音變 |
| **中文** | String | `退下、後退、退位`, `通道、走廊、走道` | 依據英韓語境精準消歧之道地繁體中文教學釋義 |
| **英文** | String | `Fall back, to pull back`, `A passage, a way` | 原始英文定義（已清理跳脫符號、頁尾殘留文字與雜訊空格） |

---

## 🔍 4. 關鍵多義詞精準消歧對照表 (Key Disambiguation)

本次 4,000 詞總表整合中，針對各期重疊之關鍵多義單字進行了極其嚴格的消歧對照：

| 韓文 | 編號與英文定義 | 精準中文釋義 | 羅馬拼音 |
| :--- | :--- | :--- | :--- |
| **안기다** | #3292 `to be embraced by sb`<br>#3754 `To fix on a person, lay the blame`<br>#3755 `To throw onto sb, to pass onto sb...` | 被擁抱、投入懷抱（被動）<br>歸咎、轉嫁、推卸（責任）<br>甩給、推給、託付給他人 | `angida` |
| **차다** | #3094 `cold,chilly`<br>#3215 `Put on, fasten,wear`<br>*(#885 滿 / #1925 踢)* | 寒冷、冰冷（形容詞）<br>佩戴、繫上、掛著（動詞）<br>*(充滿 / 踢)* | `chada` |
| **간** | #3028 `Liver`<br>#3227 `A salty taste or saltiness`<br>*(#159 間隔)* | 肝、肝臟<br>鹹淡、鹹味、鹽分<br>*(期間、之間)* | `gan` |
| **세다** | #3160 `Count`<br>*(#2890 強大)* | 計算、數數（動詞）<br>*(強壯、強烈)* | `seda` |
| **석** | #3158 `A seat,sitting place`<br>#3803 `Three (in 3 months)` | 座位、席位<br>三（三個月份等量詞） | `seok` |
| **내외** | #3787 `Men and woman, husband and wife`<br>#3958 `The interior and exterior` | 夫妻、夫婦、男女<br>內外、內部與外部 | `naewoe` |
| **배** | #3968 `Pear`<br>*(#107 肚子 / #237 船 / #621 倍)* | 梨子、梨<br>*(肚子 / 船 / 倍數)* | `bae` |
| **벌** | #3800 `Set (of clothes)`<br>#3969 `A bee`<br>*(#2885 處罰)* | 套（衣服量詞）<br>蜜蜂<br>*(懲罰)* | `beol` |
| **사과** | #3333 `An apology`<br>*(#2752 蘋果)* | 道歉、謝罪<br>*(蘋果)* | `sagwa` |
| **가리다** | #2003 `Pile up or stack up or heap up`<br>#2504 `Choose or select` | 堆積、堆放、遮蔽<br>挑選、分辨、認生 | `garida` |
| **절** | #2175 `A Buddhist temple`<br>#2824 `Bow in salutation` | 寺院、寺廟<br>行禮、鞠躬、拜年 | `jeol` |
| **차** | #2610 `Tea`<br>#2667 `difference,margin`<br>*(#370 車輛 / #858 次數)* | 茶、茶水<br>差距、差額、差別<br>*(車輛 / 次數)* | `cha` |

---

## 🚀 5. 後續應用與整合指引 (Next Steps)

1. **整合至 Sanrio 韓語發音積木樂園**：
   - 專案路徑：[`Korean-Learning\`](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/Korean-Learning/)
   - 目前資料庫已完整具備 4,000 詞高頻字庫，涵蓋 TOPIK 初級（1-1000）、中級（1001-2500）與高級（2501-4000）詞彙，可分級導入 Firestore 關卡題庫。
2. **Anki / 閃卡批次匯入**：
   - 使用 `korean_vocab_4000.csv` 即可一次匯入全量 4,000 詞卡片，欄位對齊：韓文 $\rightarrow$ 正面；拼音、中文、英文 $\rightarrow$ 背面。
3. **TTS 批次語音合成**：
   - 可利用 Edge-TTS 或相關語音合成工具對 4,000 個詞彙進行標準發音檔批次產出。
