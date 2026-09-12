# 📋 Project Handover: KITTY 韓語發音積木樂園 (KITTY Korean Learning Playground)

本文件旨在為後續接手或協作的 AI Agent / 開發者提供完整的專案狀態、架構設計、自訂拼音指引與後續擴充方向。

---

## 📌 1. 專案基本資訊 (Project Summary)

- **專案名稱**：KITTY 韓語發音積木樂園 (KITTY Korean Learning Playground)
- **副標題**：Sanrio 萌趣圖像記憶 • 粵語口訣秒懂發音 • 輕鬆玩轉動詞與音變 ✨
- **核心目標**：透過 Sanrio 人氣角色視覺聯想、廣東話諧音口訣與動態積木拼音，搭配 Firebase 即時雲端自學單字庫與 20 頁超大字拼音總表，提供無痛有趣的韓語學習體驗。
- **線上體驗網址 (GitHub Pages)**：[https://kitty-sin.github.io/sanrio-korean-learning/](https://kitty-sin.github.io/sanrio-korean-learning/)
- **GitHub 倉庫**：[https://github.com/kitty-sin/sanrio-korean-learning](https://github.com/kitty-sin/sanrio-korean-learning)
- **核心工作目錄**：
  - Repo 路徑：[`c:\Users\PC\Documents\Google-Antigravity\2026-Miscellaneous\Korean-Learning\`](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/Korean-Learning/)
  - 20頁拼音總表母檔：[`c:\Users\PC\Documents\Google-Antigravity\2026-Miscellaneous\hangul_sanrio_deck.html`](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/hangul_sanrio_deck.html)
  - 20頁拼音總表 PDF：[`hangul_sanrio_deck_20p.pdf`](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/Korean-Learning/hangul_sanrio_deck_20p.pdf)

---

## 🏗️ 2. 技術架構與模組 (Technical Architecture)

### 前端技術棧
- **核心框架**：React 18 (CDN UMD) + Babel Standalone
- **樣式庫**：Tailwind CSS (CDN) + 自訂 Sanrio 配色與 CSS 動畫
- **語音朗讀**：Web Speech API (`window.speechSynthesis`)，語言代碼 `ko-KR`，語速 `0.85x`（食物單字表與卡片支援 `0.3x` 逐字口型）。

### 雲端與資料庫
- **Firebase v10.8.0**：Firestore 集合 `korean_custom_words`，具備匿名登入與離線 Fallback 機制。
- **核心資料庫**：全量 5,666 詞彙資料庫（`korean_vocab_5666.csv` / `korean_vocab_5666.md`）。

---

## 🎨 3. 20 頁拼音總表 PDF 與粵語拼音自訂指引

`hangul_sanrio_deck_20p.pdf` 由 HTML 母檔排版渲染而成。若需客製化修改拼音諧音：
1. **母檔路徑**：[`hangul_sanrio_deck.html`](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/hangul_sanrio_deck.html)
2. **標籤結構**：
   - 頂部母音諧音：`<div class="th-cant">[柯]</div>`
   - 左側子音諧音：`<div class="c-cant">[哥/家]</div>`
   - 拼音格內容：`<div class="cell-cant">[加]</div>`、`<div class="cell-cant">[居]</div>`
3. **重新匯出 PDF**：
   - 可直接使用瀏覽器列印為 PDF（A4 橫向、無邊界、勾選背景圖形）
   - 或透過 Edge/Chrome CLI 自動匯出：
     `msedge --headless --disable-gpu --print-to-pdf="hangul_sanrio_deck_20p.pdf" --no-pdf-header-footer "hangul_sanrio_deck.html"`

---

## ✅ 4. 已完成功能清單 (Completed Features)

1. [x] **🐱 10 大基礎母音與 11 大複合母音教學專頁**
2. [x] **🐶 10 大基礎平音、4 大激音、5 大硬音專頁**
3. [x] **🧱 7 大代表收音（Batchim）與生活例詞**（整合廣東話入聲與鼻音諧音口訣：呃/壓/鴨/硬/眼/岩/捲舌頂上顎）
4. [x] **🧩 3 層收音拼音積木屋**（初聲+中聲+終聲立體積木，支援 11,172 韓文字合成、即時發音與粵語口訣即時提示卡）
5. [x] **🏃 60 核心生活動詞與 4 大實用時態 (Kitty 精選指引)**（涵蓋 6 大主題、15 組必背反義詞對，支援原形/現在式/過去式/敬語/想做時態切換、3段速發音、拆解與跟讀）
6. [x] **🪄 6 大核心音變透視鏡 (40音變精華)**（連音化、鼻音化、流音化、激音化、硬音化、口蓋音化，含黃金核心公式、規律解說、經典例字「書寫 vs 實際發音」對照與語音聽讀）
7. [x] **☁️ Firebase 雲端自學單字庫**（自訂新增單字、即時同步、語音跟讀與拼音拆解）
8. [x] **🍲 10 頁 Sanrio 主題 100 常見食物發音學習手札**（`sanrio_korean_food_100.html`，含 0.3x 逐字慢速口型）
9. [x] **📚 韓語核心高頻 5,666 詞彙全量結構化資料庫**（各期 CSV/MD 與終極總表 `korean_vocab_5666.csv/md`）
10. [x] **📄 20 頁超大字 Sanrio 拼音總表 PDF 與 HTML 母檔**
11. [x] **🎀 Sanrio 5,666 韓語核心詞庫大字典與萌趣單字卡**（`korean_vocab_dictionary.html` + `korean_vocab_5666_data.js`，支援 TOPIK A/B/C 全量毫秒級檢索、3D 翻轉單字卡、遮字測驗、Unicode 音節結構即時拆解、生詞本與 3 段速語音朗讀）
12. [x] **🌐 全站生態圈雙向無縫互聯**（主站 `index.html`、大字典 `korean_vocab_dictionary.html`、美食清單 `sanrio_korean_food_100.html` 互聯導航與積木屋跨頁參數傳遞）

---

## 🚦 5. 目前狀態與下一步 (Status & Roadmap)

- **🚦 目前狀態**：已成功推出 5,666 核心詞庫大字典與全站生態圈互聯，並同步部署至 GitHub Pages。
- **2026-09-11 15:56 PT**：
  - **RDQ 活力化背景與視覺體驗升級**：導入柔和動態極光光斑（Ambient Glow）、精緻階層卡片漸層與微動態，全面提升視覺活力且不干擾文字辨識。
  - **修復白屏問題**：補齊外層容器閉合標籤 `</div>`，透過 Node.js 完整校驗 JSX 標籤對稱性（全部 81 組 div 標籤嚴格平衡）。
  - **Git 部署**：最新版本已推送至 GitHub Pages（Commit `4043001`）。
- **2026-09-11 16:03 PT**：
  - **新增常用地名與國名**：已將 `#5667 홍콩 (香港 / Hong Kong)`、`#5668 대만 (台灣 / Taiwan)`、`#5669 로스앤젤레스 (洛杉磯 / Los Angeles)` 新增至 `[🗺️ 專有名詞 (地名/國名)]`（Level D）。
  - **同步檔案**：`korean_vocab_5666.csv`、`korean_vocab_5666.md`、`korean_vocab_5001_5666.csv`、`korean_vocab_5001_5666.md`、`korean_vocab_5666_data.js`。
  - **專有名詞總量**：由 59 筆提升至 62 筆，詞庫總量由 5,666 筆擴充至 5,669 筆。
- **2026-09-11 16:06 PT**：
  - **全站標題優化**：因詞庫已持續動態擴充超過 5,666 筆（目前為 5,669 筆），正式將大字典頂部標題、副標題與頁腳全面更名為「**韓語核心詞庫大字典**」，並同步更新主站 `index.html` 與美食手札 `sanrio_korean_food_100.html` 之導航按鈕文案。
  - **2026-09-11 16:08 PT**：
  - **背景視覺升級（淡紫色系）**：將大字典背景底色調整為典雅柔和的薰衣草淡紫色（Lavender Mist `#F6F0FA`），並同步調校三層動態極光光斑為夢幻粉紫、丁香紫與柔霧紫漸層，維持明亮淺色護眼風格與高質感。
- **2026-09-11 17:09 PT**：
  - **新增「早唞 / 晚安」系列核心生活問候語**：
    - `#5670 잘자`（平語/非敬語：早唞、晚安）
    - `#5671 잘 자요`（日常敬語/해요體：晚安、早唞）
    - `#5672 안녕히 주무세요`（長輩/上司最高敬語：祝您晚安安睡、早唞）
  - **全量同步**：`korean_vocab_5666.csv/md`、`korean_vocab_5001_5666.csv/md`、`korean_vocab_5666_data.js`，詞庫總量擴充至 **5,672 筆**。
- **2026-09-11 17:20 PT**：
  - **結構拆解彈窗 (Modal) 自適應排版與滾動條重構**：
    - 解決長詞彙（如 7 個音節的 `안녕히 주무세요`）在電腦螢幕超出上下視窗無法看完全的問題。
    - 導入固定 Header（含發音速控按鈕與關閉鍵）與固定 Footer（關閉與跳轉積木屋），中間主體採用 `max-h-[90vh] overflow-y-auto` 專屬滾動條。
    - 音節數 >= 3 時，桌面端自動啟用自適應雙欄網格（2-column grid），節省 50% 垂直空間。
    - 修復音節序號計算（過濾空格，保證 1..N 連續正確編號）。
- **2026-09-11 17:32 PT**：
  - **新增常用分級詞彙**：已將 `#5673 초급 (初級 / Beginner Level)`（Level A 名詞）新增至核心詞庫與大字典中。
  - **全量同步**：`korean_vocab_5666.csv/md`、`korean_vocab_5001_5666.csv/md`、`korean_vocab_5666_data.js`，詞庫總量擴充至 **5,673 筆**。
- **2026-09-11 17:48 PT**：
  - **建立「韓語詞庫自動化管理管線」**：
    1. **方案 B 核心 CLI 腳本**：[`scripts/manage_vocab.py`](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/Korean-Learning/scripts/manage_vocab.py)，支援秒級查重、Unicode 標準拼音生成、5 檔同步原子寫入與 Git 自動部署。
    2. **方案 A 專屬 Agent 技能**：[`korean-vocab-manager`](file:///C:/Users/PC/.gemini/config/skills/korean-vocab-manager/SKILL.md)，使用者在對話框只要說「`查加 XX`」或「`搜索有沒有 XX，沒有就新增`」，即可全自動觸發管線並輸出精美單字卡片。
- **2026-09-11 21:30 PT**：
  - **全新推出「韓語漢字音變大辭典 (Korean Hanja Dictionary)」**：
    - **資料來源**：完整轉換《Glossika 韓文漢字對照工具書》，包含 **6,277 筆** 核心漢字詞、**471 組** 單音節 ↔ 漢字群矩陣與 **242 筆** 外來語借詞庫。
    - **標準五大欄位**：嚴格依指定格式 `(編號, 韓文, 羅馬拼音, 中文, 英文)` 轉換並自動生成標準 Revised Romanization。
    - **產出檔案矩陣**：`korean_hanja_dictionary.html`（主應用 SPA）、`korean_hanja_data.js`（6,519 筆資料常數）、`korean_hanja.csv`（完整試算表）、`korean_hanja.md`（對照字典）與 `scripts/build_hanja_dataset.py`（自動化建置管線）。
    - **四大功能模式**：【📋 漢字詞速查字典】+【🎴 3D 萌趣單字卡翻卡測驗】+【🔤 單音節 ↔ 漢字矩陣（支援以字查音與漢字反向檢索）】+【🌐 常用外來語庫】。
    - **全生態圈無縫互聯**：於主站 `index.html`、大詞庫 `korean_vocab_dictionary.html`、美食手札 `sanrio_korean_food_100.html` 頂部導航列全面新增「🈴 韓語漢字辭典」快捷入口，並支援 `index.html?block=XX` 積木屋跨頁直達。
- **➡️ 下一步**：
  1. 持續豐富漢字詞庫之生活例句與成語聯想。
  2. 依學習反饋擴充更多漢字部首與音變口訣。
  3. 待使用者有空時，依其自訂的拼音規則批次修改 `hangul_sanrio_deck.html` 中的諧音標籤，並重新匯出覆蓋 `hangul_sanrio_deck_20p.pdf`。
  4. 依學習進度持續擴充進階文法句型或主題練習題庫。

---

## 🕐 最後更新資訊
- **更新時間**：2026-09-11 21:30 PT
- **更新者**：Antigravity Assistant @ PC (DESKTOP-QROANQ2)
- **Git Push 狀態**：✅ 已部署推播至 GitHub Pages (main 分支)
