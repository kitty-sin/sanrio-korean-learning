# 📋 專案交接報告 (handoff.md)

> **專案名稱**：韓語核心常用 2,000 詞彙結構化轉換與雙語對照資料庫 (Korean Core 2,000 Vocabulary Dataset)  
> **更新時間**：2026-08-28  
> **當前狀態**：✅ **2,000 詞全數處理完成，分期檔與全量合併檔皆通過 100% 結構驗證**  
> **目標工作目錄**：[`c:\Users\PC\Documents\Google-Antigravity\2026-Miscellaneous\`](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/) 與 [`Korean-Learning\`](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/Korean-Learning/)

---

## 📌 1. 任務背景與執行概述

本專案將包含 2,000 個韓語高頻核心單字（涵蓋 TOPIK 初中高級核心詞彙）與其英文解釋的文本資料庫，轉換為規範結構化表格：
- **標準欄位結構**：`編號 , 韓文 , 羅馬拼音 , 中文 , 英文`
- **核心處理歷程**：
  1. **第一期 (#1 ~ #1000)**：處理基礎核心 1,000 詞，補正缺漏釋義行，建立官方 RR 羅馬拼音音變基準與 38 組多義詞消歧對照。
  2. **第二期 (#1001 ~ #2000)**：接續處理進階核心 1,000 詞，完成原始雜訊校正（如 `#1418 기13` 校正為 `기`、`#1689 농산物` 轉正為純韓文 `농산물`、清理反斜線逸出字元）、嚴格音變演算法匹配、並對 32 組跨期及 14 組期內多義詞進行深度繁體中文消歧。

---

## 📦 2. 成果交付檔案清單 (Deliverables)

所有交付成果已同步產出於 `Korean-Learning/` 專案目錄與根目錄中，方便各類情境使用：

| 檔案名稱 | 格式 | 詞彙範圍 | 說明與適用場景 | 檔案路徑 |
| :--- | :--- | :--- | :--- | :--- |
| **`korean_vocab_2000.csv`** | CSV (UTF-8 with BOM) | #1 ~ #2000 (2,000 詞) | **全量合併總表**。帶 UTF-8 BOM，Excel / Notion / Sheets 開啟無亂碼，可直接全量匯入 Anki | [korean_vocab_2000.csv](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/Korean-Learning/korean_vocab_2000.csv) |
| **`korean_vocab_2000.md`** | Markdown Table | #1 ~ #2000 (2,000 詞) | **全量合併總表**。適合 GitHub、Obsidian 檢視與全文搜尋 | [korean_vocab_2000.md](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/Korean-Learning/korean_vocab_2000.md) |
| **`korean_vocab_1001_2000.csv`** | CSV (UTF-8 with BOM) | #1001 ~ #2000 (1,000 詞) | 第二期獨立 CSV，適合分階段匯入與學習進度追蹤 | [korean_vocab_1001_2000.csv](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/Korean-Learning/korean_vocab_1001_2000.csv) |
| **`korean_vocab_1001_2000.md`** | Markdown Table | #1001 ~ #2000 (1,000 詞) | 第二期獨立 Markdown 表格 | [korean_vocab_1001_2000.md](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/Korean-Learning/korean_vocab_1001_2000.md) |
| **`korean_vocab_1000.csv`** | CSV (UTF-8 with BOM) | #1 ~ #1000 (1,000 詞) | 第一期基礎詞彙 CSV（已完整保留） | [korean_vocab_1000.csv](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/Korean-Learning/korean_vocab_1000.csv) |
| **`korean_vocab_1000.md`** | Markdown Table | #1 ~ #1000 (1,000 詞) | 第一期基礎詞彙 Markdown 表格 | [korean_vocab_1000.md](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/Korean-Learning/korean_vocab_1000.md) |

---

## 🗂️ 3. 資料庫欄位結構定義

| 欄位名稱 | 型態 | 範例 | 說明 |
| :--- | :--- | :--- | :--- |
| **編號** | Integer | `1` ~ `2000` | 依詞頻出現順序排序，全量連續遞增無中斷 |
| **韓文** | String | `것`, `바르다`, `의사` | 韓文標準詞彙原形或標準名詞型態 |
| **羅馬拼音** | String | `geot`, `bareuda`, `uisa` | 韓國官方 Revised Romanization (RR) 音標，完整反映各類連音與音變 |
| **中文** | String | `東西、事物`, `塗抹、塗刷、敷` | 依據英韓語境精準消歧之道地繁體中文教學釋義 |
| **英文** | String | `Worry`, `Be straight; be honest` | 原始英文定義（已清理跳脫符號與雜訊空格） |

---

## 🔍 4. 關鍵多義詞精準消歧對照表 (Key Disambiguation)

本次擴充特別嚴格校驗了兩期之間的同詞異義項目，確保中文翻譯精確符合該項目的英文語境：

| 韓文 | 編號與英文定義 | 精準中文釋義 | 羅馬拼音 |
| :--- | :--- | :--- | :--- |
| **바르다** | #1004 `Be straight; be honest`<br>#1321 `Spread, apply` | 正直、端正、筆直<br>塗抹、塗刷、敷 | `bareuda` |
| **거리** | #1017 `Distance`<br>#1109 `A road or street` | 距離、間距<br>街道、街頭 | `geori` |
| **의사** | #1140 `A doctor, a physician`<br>#1943 `An intention, a purpose` | 醫生、醫師<br>意思、意圖、意願 | `uisa` |
| **병** | #1151 `Sickness`<br>#1720 `A bottle` | 病、疾病<br>瓶、玻璃瓶 | `byeong` |
| **싸다** | #1818 `Wrap in, bundle`<br>#1942 `Be inexpensive` | 包裝、打包、包（飯糰）<br>便宜、廉價 | `ssada` |
| **초** | #1045 `Initial, in the beginning, first`<br>#1764 `A second` | 初、開頭（如世紀初）<br>秒（時間單位） | `cho` |
| **단지** | #1215 `Simple, merely`<br>#1801 `A public apt complex` | 僅僅、只是、單純<br>社區、園區、大廈群（團地） | `danji` |
| **보통** | #1226 `The normal`<br>#1576 `Usually` | 普通、尋常（名詞）<br>平時、通常（副詞） | `botong` |
| **부족** | #1566 `A tribe`<br>#1632 `lack, want (scarcity, insufficiency)` | 部落、族群（部族）<br>不足、缺乏（不足） | `bujok` |
| **양** | #1260 `quantity,volume`<br>#1390 `Miss ~` | 數量、份量（量）<br>...小姐（對女性稱呼） | `yang` |
| **인사** | #1066 `Greetings`<br>#1312 `People, men of society` | 問候、行禮、打招呼<br>人士、社會名流 | `insa` |
| **자** | #1125 `Well!!`<br>#1471 `A Chinese character`<br>*(#782 `A person`)* | 來吧！好！（感嘆詞）<br>字、漢字、字母<br>*(者、人)* | `ja` |
| **눈** | #1329 `Snow`<br>*(#93 `Eyes`)* | 雪、降雪<br>*(眼睛)* | `nun` |
| **맞다** | #1366 `Be struck, beaten`<br>*(#337 正確 / #718 迎接)* | 挨打、被擊中、遭受<br>*(正確 / 迎接)* | `matda` |
| **쓰다** | #1577 `To wear (a hat)`<br>*(#150 寫 / #156 服藥、苦)* | 戴（帽子/眼鏡）、撐（傘）<br>*(寫 / 服藥、苦)* | `sseuda` |
| **가지** | #1838 `Eggplant`<br>*(#114 種類)* | 茄子<br>*(種、樣)* | `gaji` |
| **감다** | #1839 `Close`<br>*(洗頭 / 纏繞)* | 閉上（眼睛）、合眼<br>*(洗 / 纏)* | `gamda` |
| **묻다** | #1980 `to Stain`<br>*(#261 詢問 / 埋)* | 沾上、沾染（污漬）<br>*(詢問 / 埋)* | `mutda` |
| **차다** | #1925 `to kick`<br>*(#885 滿 / 冷)* | 踢（球）、踹<br>*(滿 / 寒冷)* | `chada` |
| **취하다** | #1927 `To be drunk`<br>*(#988 採取、取得)* | 喝醉、酒醉<br>*(採取、取得)* | `chwihada` |
| **살** | #1936 `flesh,muscle`<br>*(#516 歲)* | 肉、肌肉、肌膚<br>*(歲)* | `sal` |

---

## 🚀 5. 後續應用與整合指引 (Next Steps)

1. **匯入現有專案（Sanrio 韓語發音積木樂園）**：
   - 專案路徑：[`Korean-Learning\`](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/Korean-Learning/)
   - 可將此 2,000 詞依階段（入門 500 / 初級 500 / 中級 500 / 進階 500）批次寫入 Firestore `korean_custom_words` 集合，提供互動查詢與挑戰關卡。
2. **製成 Anki 記憶卡片**：
   - 匯入 `korean_vocab_2000.csv` 或分段匯入 `korean_vocab_1001_2000.csv`。
   - 欄位對應：欄 2 (韓文) $\rightarrow$ 正面；欄 3 (拼音) + 欄 4 (中文) + 欄 5 (英文) $\rightarrow$ 背面。
3. **語音批次合成**：
   - 可透過 Edge-TTS (`ko-KR-SunHiNeural` 或 `ko-KR-InJoonNeural`) 批次合成 2,000 個單字的標準 mp3 發音音檔。

---

## 🛠️ 6. 腳本工具與驗證紀錄
- 原始文字解析：`scratch/parse_raw.py`
- RR 拼音音變庫：`scratch/romanize.py`（對照 1~1000 達成 100% 吻合度）
- 繁體中文模組：`scratch/data_1001_1200.py` ~ `scratch/data_1801_2000.py`
- 整合導出工具：`scratch/compile_and_verify.py`
- 自動化驗證腳本：`scratch/verify_all_exports.py`（通過連續性、UTF-8 BOM、非空與消歧校驗）
