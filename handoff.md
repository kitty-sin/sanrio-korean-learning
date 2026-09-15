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
- **2026-09-11 21:42 PT**：
  - **全新推出「韓語漢字音變大辭典 (Korean Hanja Dictionary)」**：
    - **資料來源**：完整轉換《Glossika 韓文漢字對照工具書》，包含 **6,277 筆** 核心漢字詞、**471 組** 單音節 ↔ 漢字群矩陣與 **242 筆** 外來語借詞庫。
    - **標準五大欄位**：嚴格依指定格式 `(編號, 韓文, 羅馬拼音, 中文, 英文)` 轉換並自動生成標準 Revised Romanization。
    - **100% 中文翻譯補齊**：為全部 242 筆外來語逐一建立繁體中文對照庫（`scripts/loanword_translations.py`），單字卡中英雙語清晰排版。
    - **產出檔案矩陣**：`korean_hanja_dictionary.html`（主應用 SPA）、`korean_hanja_data.js`（6,519 筆資料常數）、`korean_hanja.csv`（完整試算表）、`korean_hanja.md`（對照字典）與 `scripts/build_hanja_dataset.py`（自動化建置管線）。
    - **四大功能模式**：【📋 漢字詞速查字典】+【🎴 3D 萌趣單字卡翻卡測驗】+【🔤 單音節 ↔ 漢字矩陣（支援以字查音與漢字反向檢索）】+【🌐 常用外來語庫】。
    - **全生態圈無縫互聯**：於主站 `index.html`、大詞庫 `korean_vocab_dictionary.html`、美食手札 `sanrio_korean_food_100.html` 頂部導航列全面新增「🧸 韓語漢字辭典」快捷入口，並支援 `index.html?block=XX` 積木屋跨頁直達。
- **2026-09-11 22:10 PT**：
  - **RDQ 需求探索與視覺升級**：
    - 依使用者需求透過 **RDQ Method** 完成結構化訪談與規格卡確認（[`rdq/RDQ-spec-hanja-theme-redesign-20260911.md`](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/Korean-Learning/rdq/RDQ-spec-hanja-theme-redesign-20260911.md)）。
    - 將 `korean_hanja_dictionary.html` 視覺背景全面升級為「**柔和奶茶暖杏風**」（`linear-gradient(180deg, #FBF4EC 0%, #FAF6F0 100%)`）。
    - 頂部導航列與搜尋區注入 `backdrop-blur-md` 柔光毛玻璃與暖琥珀邊框（`border-amber-200/50`）。
    - 6,277 筆單字卡、3D 翻卡測驗、471 單音節矩陣及外來語卡片邊框/標籤全面調和為溫潤護眼的琥珀暖木棕色調。
    - 專屬圖標全面升級為泰迪熊 `🧸`，變更已成功推播至 GitHub Pages。
- **2026-09-12 23:13 PT**：
  - **📱 Android 原生 App 升級封裝《KITTY 韓語積木大冒險 🌟》**：
    - **RDQ 規格確立**：完成 RDQ 需求訪談與規格卡簽核（[`rdq/RDQ-spec-android-app-capacitor-20260912.md`](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/Korean-Learning/rdq/RDQ-spec-android-app-capacitor-20260912.md)）。
    - **App 活潑命名**：正式命名為 **《KITTY 韓語積木大冒險 🌟》** (`KITTY Korean Adventure`，Package ID: `com.kittysin.koreanlearning`)。
    - **零重複打包架構**：採用 **Capacitor 6.x 雲端熱更新 + 本地 Service Worker 離線快取 (`sw.js` v1.0.2)**，實現一次安裝 APK、未來增詞改版手機自動靜默同步、0 Token 浪費。
    - **拼豆 Yoda 寶寶圖標適配**：透過 PIL 自動去背並生成 48x48 ~ 512x512 Android Adaptive Icons 與啟動 Splash Screen，搭配柔和馬卡龍漸層底色與微圓角。
    - **Android 原生返回鍵與直屏優化**：鎖定 `portrait` 直屏單手體驗，注入 `app_mobile_bridge.js` 實現子頁面返回與主頁雙擊防誤觸退出。
    - **GitHub Actions 自動編譯工作流**：建立 `.github/workflows/build-apk.yml`，推送到 GitHub 雲端自動編譯產出 `app-debug.apk` 與成功發布至 GitHub Releases ([v1.0.0-apk](https://github.com/kitty-sin/sanrio-korean-learning/releases/tag/v1.0.0-apk))。
- **2026-09-13 00:09 PT**：
  - **🔊 終極全域發音引擎 `KittyVoice` 部署（徹底解決 Samsung Galaxy / S26 Ultra 系統靜音問題）**：
    - **問題根因**：Samsung One UI 預設使用「三星文字轉語音 (Samsung TTS)」，因未預裝韓語包產生「靜默無聲（不發音也不拋錯）」假死現象，且鎖定手勢前音訊通道。
    - **發音引擎重構**：於 `app_mobile_bridge.js` 開發全域 `window.KittyVoice` 發音模組，注入手勢自動解鎖、韓語語音包真實存在性偵測、450ms 假死超時切換，以及 **Google & Baidu 雙線路雲端極速真人發音 Fallback**。
    - **全生態圈對接**：主站 `index.html`（含 0.3x 逐字朗讀）、詞庫大字典 `korean_vocab_dictionary.html`、漢字大辭典 `korean_hanja_dictionary.html`、美食手札 `sanrio_korean_food_100.html` 全面接入 `KittyVoice`，保證 100% 響亮發音。
    - **Toast 提示視覺優化**：所有頁面操作 Toast 全面移至螢幕底部居中 (`bottom-16`)，徹底消除遮擋頂部文字與篩選器的問題。
- **2026-09-13 21:20 PT**：
  - **🚀 Android 原生 `TextToSpeech` 底層直連成功 (v1.0.1-apk 驗證通過)**：
    - 在 `MainActivity.java` 成功注入 Android 官方原生 `TextToSpeech` JavascriptInterface。
    - 成功直連 Samsung S26 Ultra 系統底層 Samsung TTS 韓語語音引擎，使用者實機測試發音響亮、清晰、零延遲，全量 5,673 詞庫與 6,519 漢字辭典完美發音！
- **2026-09-13 22:42 PT**：
  - **🔍 全域智慧多語言搜尋引擎 `KittySearch` 研發與全站部署 (`kitty_search_engine.js`)**：
    - **問題根因**：
      1. **簡繁體中文失配**：詞庫資料集均以繁體中文建立，當使用者輸入簡體字（如「时间」、「买」、「书」、「鸡」）時，字元編碼不同導致 0 筆匹配；而英文（如 "time"、"buy"、"chicken"）因英文字串精確匹配而正常。
      2. **韓語 Unicode 編碼差異**：手機輸入法（Samsung / Gboard / iOS）輸出之韓語可能帶有 NFD 拆解形式，與資料庫之 NFC 預組字元無法直接 `includes`。
      3. **美食清單缺乏自動跳轉與折疊**：搜尋時未自動將畫面平滑滾動至匹配卡片，且整頁空白未隱藏。
    - **架構升級**：
      - 開發 `kitty_search_engine.js`，內建 3,882 組完整簡繁雙向對照字典、韓語 Unicode NFC 正規化比對、韓語初聲（Choseong，如 `ㅅㄹ` 搜 `사람`）比對演算法。
      - `korean_vocab_dictionary.html`、`korean_hanja_dictionary.html`、`sanrio_korean_food_100.html` 全面接入 `KittySearch`，支援繁體、簡體、韓文全字、韓文初聲、羅馬拼音、英文全方位秒級通搜！
      - 美食清單新增實體「🔍 搜尋」按鈕與 Enter 送出、無結果頁面自動折疊、搜尋後自動平滑滾動定位至第一筆結果。
      - Service Worker 升級至 `v1.0.9`，全面同步快取。
- **2026-09-14 12:47 PT**：
  - **🔊 韓語辭典 0.3x 極慢口型發音與結構拆解單音節發音全面修復升級**：
    - **問題根因**：
      1. `korean_vocab_dictionary.html` 與 `korean_hanja_dictionary.html` 的 `<head>` 原先遺漏引入 `app_mobile_bridge.js`，導致發音回退至純 HTML5 `<audio>` 直連。
      2. 瀏覽器 HTML5 Audio 解碼器在設定極端慢速 `playbackRate = 0.3` 時會拋錯或掛起，觸發 `audio.onerror` 導致按鈕僅閃動一下而沒有聲音。
      3. 在「結構拆解」彈窗中，單音節發音按鈕未明確傳入 `1.0x` 語速，若頂部導航欄預設選中 0.3x，拆解彈窗的單音節發音也會繼承 0.3x 進而引發靜音。
    - **修復方案**：
      - `<head>` 頂部正式引入 `app_mobile_bridge.js`。
      - `window.KittyVoice` 全面升級：當語速 `<= 0.35x` 時，自動觸發「**逐音節分解朗讀核心 (`speakSyllables`)**」，以飽滿清晰的 `0.9x` 音質逐字朗讀，字與字之間加入 `380ms` 舒適停頓。
      - HTML5 Audio `playbackRate` 安全鉗制在 `0.75x ~ 1.25x`，防止音訊引擎崩潰。
      - 結構拆解彈窗內的所有單音節發音按鈕明確鎖定 `1.0x` 標準發音。
      - Service Worker 快取版本升級至 `kitty-korean-v1.0.10`，自動清除舊快取並即時生效。
- **2026-09-14 14:02 PT**：
  - **📝 韓語核心詞庫大字典詞彙釋義更新**：
    - 已將 **#5616 회사 (hoesa)** 的中文解釋正式由「公司」擴充更新為「**公司、會社**」。
    - 全面原子化同步更新 5 大資料集檔案：`korean_vocab_5666_data.js`、`korean_vocab_5666.csv`、`korean_vocab_5666.md`、`korean_vocab_5001_5666.csv`、`korean_vocab_5001_5666.md`。
    - Service Worker 升級至 `kitty-korean-v1.0.11`，確保使用者端離線快取立即自動刷新生效。
- **2026-09-14 14:24 PT**：
  - **🗂️ 韓語核心詞庫架構重大重構：基準 5,666 庫封裝與 Kitty 自訂新增庫模組化分離**：
    - **架構調整**：
      1. **基準 5,666 詞庫完全封裝**：`korean_vocab_5666_data.js`、`korean_vocab_5666.csv/md`、`korean_vocab_5001_5666.csv/md` 精準鎖定保留 **#1 ~ #5666** 筆資料。
      2. **自訂新增詞庫專屬資料集**：新增 `korean_vocab_kitty_add_data.js`（`window.KOREAN_VOCAB_KITTY_ADD`）、`korean_vocab_kitty_add.csv`、`korean_vocab_kitty_add.md`，獨立收錄使用者新增的詞彙（初始收錄 #5667 ~ #5673 共 7 筆）。
      3. **前端雙庫無縫合併**：`korean_vocab_dictionary.html` 同步加載兩份數據常數並於 React 初始化時自動合併，全量 5,673 筆即時檢索、3D 單字卡、發音完全無縫。
      4. **管理工具升級**：`scripts/manage_vocab.py` 與 `korean-vocab-manager` 技能自動將未來所有新詞彙寫入 `korean_vocab_kitty_add.*`，保持 5,666 基準檔穩定純淨。
      5. **Service Worker 升級**：將 `korean_vocab_kitty_add_data.js` 加入靜態資源快取列表，版本升級至 `kitty-korean-v1.0.12`。
- **2026-09-14 14:44 PT**：
  - **🔤 韓語漢字音變大辭典「單音節 ↔ 漢字矩陣」全量擴充 (1,037 音節)**：
    - **問題根因**：原矩陣僅收錄源自 Glossika 的 471 個漢字音節，導致學習者搜尋「잘」（出自 `잘자`、`잘하다`）等高頻固有語音節時查無結果。
    - **全量矩陣擴充**：
      1. 萃取全站 6,277 漢字詞、242 外來語、5,666 基準詞與 Kitty 自訂新增詞，擴充收錄 **566 個純韓語固有/常用音節**（矩陣總數由 471 提升至 **1,037 個音節**）。
      2. 每個固有音節（如 `잘 [jal]`、`꽃 [kkoch]`、`눈 [nun]`）均完整關聯標準拼音、高頻代表詞（如 `[잘 (好)]`、`[잘자 (早唞)]`）與釋義。
      3. 矩陣新增「🌟 全部音節 (1,037)」、「🌸 漢字音節 (471)」、「🇰🇷 固有/常用音節 (566)」次級分類篩選器。
      4. 點擊任一固有音節例詞標籤可一鍵反向檢索該詞彙；點擊發音支援 3 段速朗讀；點擊積木屋直達拼組。
    - **同步檔案**：`korean_hanja_data.js`、`korean_hanja.csv`、`korean_hanja.md`、`korean_hanja_dictionary.html`、`scripts/build_hanja_dataset.py`，Service Worker 升級至 `kitty-korean-v1.0.13`。
- **2026-09-14 14:58 PT**：
  - **🔗 音節矩陣代表詞「智慧跨庫跳轉」與搜尋框同步修復 (`handleSampleWordClick`)**：
    - **問題根因**：
      1. 使用者在「單音節矩陣」點擊純韓語固有詞例詞（如 `곧`、`잘자`）時，原邏輯僅切換至本地漢字詞速查頁籤，但因 `HANJA_VOCAB_LIST` 僅含漢字詞，導致畫面顯示「共檢索到 0 筆漢字詞」。
      2. 點擊例詞或漢字標籤時未同步更新搜尋輸入框之 `inputVal`，導致輸入框仍殘留舊搜尋字詞。
    - **修復方案**：
      1. 開發 `handleSampleWordClick` 智慧分流函數：若為漢字詞/外來語則在本地漢字辭典檢索並同步 `inputVal`；若為純韓語固有詞（如 `곧`、`잘`、`꽃`、`눈`）則**自動智慧跳轉至【韓語核心詞庫大字典 (`korean_vocab_dictionary.html?search=XX`)】**，立即呈現完整單字卡、發音與拆解。
      2. 常用例詞按鈕加入視覺圖標區分：`🧸`（本地漢字詞）與 `📚`（核心大詞庫），並優化 Tooltip 提示文字。
      3. Service Worker 升級至 `kitty-korean-v1.0.14`。
- **2026-09-14 17:13 PT**：
  - **新增生活運動休閒詞彙**：已將 `#5674 요가 (瑜珈 / Yoga)`（Level A 名詞）透過自動化管線新增至 Kitty 自訂詞庫與大字典中。
  - **全量同步**：`korean_vocab_kitty_add_data.js`、`korean_vocab_kitty_add.csv`、`korean_vocab_kitty_add.md`，Kitty 自訂庫擴充至 **8 筆**，全庫總量達到 **5,674 筆**。
  - **Git 部署**：已推播至 GitHub Pages（Commit `624deb5`）。
- **2026-09-14 17:53 PT**：
  - **🔤 漢字大辭典「요」音節漢字擴充「瑜」與「요가」對照收錄**：
    - **背景原因**：傳統韓語漢字字典中「瑜」字主要標音為 `유 (yu)`（如傳統佛經「瑜伽」讀 `유가`）；但在現代韓語日常生活中，「Yoga / 瑜伽 / 瑜珈」讀作 **`요가 (yoga)`**。因此學習者在矩陣「요」下搜尋「瑜」時容易撲空。
    - **升級改進**：
      1. 在音節 **`요`**（音節 #278）的漢字庫中，正式擴充補入漢字 **「瑜」**（使「요」對應漢字數提升至 38 個，同時保留「유」下的傳統對照）。
      2. 在 `HANJA_VOCAB_LIST` 漢字詞庫中正式收錄 **`#6278 요가 (瑜伽、瑜珈 / Yoga)`**。
      3. 重新執行 `build_hanja_dataset.py` 全量建置管線，同步更新 `korean_hanja_data.js`、`korean_hanja.csv`、`korean_hanja.md`。
      4. Service Worker 快取升級至 `v1.0.15`。
- **2026-09-15 14:41 PT**：
  - **新增日常核心高頻口語動詞**：已將 `#5675 봐 (睇下、睇睇、看、看吧 / Look, see)`（Level A 動詞，動詞 `보다` 之平語/現在式/命令形口語）透過自動化管線新增至 Kitty 自訂詞庫與大字典中。
  - **全量同步**：`korean_vocab_kitty_add_data.js`、`korean_vocab_kitty_add.csv`、`korean_vocab_kitty_add.md`，Kitty 自訂庫擴充至 **9 筆**，全庫總量達到 **5,675 筆**。
  - **Git 部署**：已推播至 GitHub Pages（Commit `425a4d5`）。
- **➡️ 下一步**：
  1. 持續豐富漢字詞庫之生活例句與成語聯想。
  2. 依學習反饋擴充更多漢字部首與音變口訣。
  3. 待使用者有空時，依其自訂的拼音規則批次修改 `hangul_sanrio_deck.html` 中的諧音標籤，並重新匯出覆蓋 `hangul_sanrio_deck_20p.pdf`。
  4. 依學習進度持續擴充進階文法句型或主題練習題庫。

---

## 🕐 最後更新資訊
- **更新時間**：2026-09-15 14:41 PT
- **更新者**：Antigravity Assistant @ PC (DESKTOP-QROANQ2)
- **Git Push 狀態**：✅ 已部署推播至 GitHub Pages (main 分支)






