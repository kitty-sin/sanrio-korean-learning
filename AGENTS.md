# 🤖 AGENTS.md: KITTY 韓語發音積木樂園 (KITTY Korean Learning Playground)

本文件為專案長期藍圖與多 Agent 協同規範，記錄專案全景、架構約定與功能清單。

---

## 📌 專案基本資訊

- **專案名稱**：KITTY 韓語發音積木樂園 (KITTY Korean Learning Playground)
- **副標題**：Sanrio 萌趣圖像記憶 • 粵語口訣秒懂發音 • 輕鬆玩轉動詞與音變 ✨
- **線上體驗 (GitHub Pages)**：[https://kitty-sin.github.io/sanrio-korean-learning/](https://kitty-sin.github.io/sanrio-korean-learning/)
- **GitHub 倉庫**：[https://github.com/kitty-sin/sanrio-korean-learning](https://github.com/kitty-sin/sanrio-korean-learning)
- **Obsidian 關聯筆記**：創作庫/Sanrio 韓語發音積木樂園專案.md

---

## 🏗️ 資料夾結構與核心檔案

```
Korean-Learning/
├── _archive/                    # 本地歷史存檔目錄 (20 個歷史分期詞庫 + 5 個早期交接檔，不推播至 GitHub)
├── .github/workflows/
│   └── build-apk.yml            # GitHub Actions Android APK 自動編譯與 Release 工作流
├── android/                     # Android 原生專案代碼 (Capacitor 6.x Gradle 專案)
├── assets/                      # 拼豆 Yoda 寶寶 App Icon、Splash、韓語拼音總表與 40 音變速查總表圖資
├── rdq/
│   ├── RDQ-spec-android-app-capacitor-20260912.md # RDQ 規格卡 (Android 原生 App 封裝)
│   ├── RDQ-spec-hanja-theme-redesign-20260911.md # RDQ 規格卡 (漢字大辭典暖杏視覺改版)
│   ├── RDQ-spec-korean-songs-page-20260916.md    # RDQ 規格卡 (韓語名曲歌詞練唱樂園)
│   ├── RDQ-spec-top-banner-copy-20260916.md      # RDQ 規格卡 (頂部導航站橫幅文案優化)
│   ├── RDQ-spec-hangul-master-tab-20260918.md    # RDQ 規格卡 (首頁 40音發音積木 大分頁與子分頁階層整合)
│   └── RDQ-spec-sentence-train-builder-20260919.md # RDQ 規格卡 (韓語造句發音積木列車與語法變形引擎)
├── scripts/
│   ├── manage_vocab.py          # 韓語核心詞庫自動化管理 CLI (查重+拼音+5檔同步+Git部署)
│   ├── build_hanja_dataset.py   # 韓語漢字大辭典資料集建置管線
│   ├── build_songs_dataset.py   # 韓語歌詞 Excel 解析與資料集建置腳本
│   ├── build_honorifics_page.py # 韓語兩大敬語樂園頁面建置腳本
│   ├── build_tenses_page.py     # 韓語四大時態樂園頁面建置腳本
│   ├── build_particles_page.py  # 韓語兩大助詞樂園頁面建置腳本
│   ├── build_core2000_dataset.py # 韓語 CORE 2000 例句資料集抽取與建置管線
│   ├── refine_traditional_chinese.py # OpenCC s2twp 繁體中文嚴謹正字與缺漏翻譯修復腳本
│   ├── generate_app_assets.py   # 拼豆 Yoda 圖標精修與 Adaptive Icon 生成器
│   ├── deploy_android_icons.py  # Android mipmap 各尺寸圖標部署腳本
│   └── loanword_translations.py # 242 筆外來語繁體中文對照字典
├── index.html                   # 主應用 SPA (React 18 + Tailwind + Firebase + Web Speech)
├── korean_vocab_dictionary.html # 韓語核心詞庫大字典 (TOPIK 全量速查 + 萌趣單字卡 + 結構拆解)
├── korean_core2000_sentences.html # 韓國核心互動例句朗讀樂園 (Korean CORE 2000 • 韓系粉彩應援插畫風 • 偶像拍立得小卡 • 10大應援色票 • 2,000組單字例句 • 3段速朗讀 • 3D翻卡)
├── korean_core2000_data.js      # 2,000 組核心單字與生活例句結構化常數數據集 (含繁中翻譯對照)
├── korean_core2000.json         # 2,000 組核心單字與生活例句結構化 JSON 檔案
├── korean_hanja_dictionary.html # 韓語漢字音變大辭典 (Glossika 6,277 漢字詞 + 1,037 全量音節矩陣 + 外來語 + 暖杏風)
├── sanrio_korean_sentences.html # 韓語造句發音積木列車 (SOV 語序 • 4大時態 ✕ 3大敬語全自動發車 • 暖木手繪小雞火車)
├── sanrio_korean_songs.html     # 韓語名曲歌詞練唱樂園 (李碩珉 DK《Stay With Me》+ 北極光淺色系 + 一句一框框)
├── sanrio_korean_honorifics.html # 韓語兩大敬語發音積木樂園 (最高敬語 습니다 ✕ 日常敬語 해요 + 5大分頁 + 闖關測驗)
├── sanrio_korean_tenses.html    # 韓語四大時態發音積木樂園 (雙子星時光機 • 原形/現在/過去/未來 + 5大分頁 + 闖關測驗)
├── sanrio_korean_particles.html  # 韓語兩大核心助詞發音積木樂園 (主格 이/가 ✕ 受格 을/를 + 5大分頁 + 闖關測驗)
├── korean_sentence_data.js      # 韓語造句火車核心語料庫與語幹變形引擎
├── korean_songs_data.js         # 韓語歌曲結構化常數數據集
├── korean_songs_data.md         # 韓語歌曲 Markdown 對照清單
├── korean_hanja_data.js         # 6,520 筆漢字詞與 1,044 音節常數數據集
├── korean_hanja.csv             # 6,520 筆漢字詞與外來語 CSV 總表
├── korean_hanja.md              # 漢字詞對照 Markdown 字典
├── korean_vocab_5666_data.js    # 5,666 筆基準高壓縮常數數據集 (#1 ~ #5666)
├── korean_vocab_5666.csv        # 5,666 筆 TOPIK 基準詞庫總表
├── korean_vocab_kitty_add_data.js # Kitty 自訂新增詞庫常數數據集 (#5667 ~ #5744)
├── korean_vocab_kitty_add.csv   # Kitty 自訂新增詞庫 CSV 總表 (78 筆)
├── korean_vocab_kitty_add.md    # Kitty 自訂新增詞庫 Markdown 字典 (78 筆)
├── kitty_search_engine.js       # 全域智慧多語言搜尋引擎 (繁簡雙向通搜 + 韓語 NFC/初聲 + 英文拼音)
├── hangul_sanrio_deck_20p.pdf   # 20 頁超大字 Sanrio 拼音總表 (PDF 直連瀏覽)
├── 韓語語序・敬語・時態大解密.pdf # 韓語語序・敬語・時態大解密精美講義 (PDF 直連瀏覽)
├── pdf_viewer.html          # 韓語教材線上互動閱讀器 (Mozilla PDF.js + 免下載直讀 + 手勢翻頁 + 縮放)
├── sanrio_korean_food_100.html  # 100 種常見食物發音打卡學習手札 (含 0.3x 口型)
├── sanrio_korean_food_100.md    # 100 種常見食物 Markdown 清單
├── sanrio_korean_restaurant.html # 韓語餐廳與烤肉店點餐實戰樂園 (8大分類 ✕ 烤肉桌實境圖解 ✕ 點餐造句機 ✕ 0.3x發音)
├── capacitor.config.json        # Capacitor 雲端熱更新與 Android 原生設定
├── app_mobile_bridge.js         # 行動端 Service Worker 註冊與返回鍵智慧防誤觸橋接
├── sw.js                        # Service Worker 離線快取核心 (v1.0.46)
├── package.json                 # 專案套件管理與 Capacitor 依賴
├── AGENTS.md                    # 專案藍圖與協同規範
├── handoff.md                   # 跨工作階段交接檔
└── README.md                    # 專案公開說明文件
```

---

## 🗺️ 功能模組與進度 Checklist

- [x] **🔤 40 音發音積木大分頁與子分頁階層架構** (整合 10 基礎母音、11 複合母音、10 基礎平音、4 激音、5 硬音、7 大收音為統一母分頁，支援二級膠囊導航與 URL 參數直達)
- [x] **10 大基礎母音與 11 大複合母音教學** (Sanrio 圖像聯想 + 粵語諧音)
- [x] **10 大基礎平音、4 大激音、5 大硬音教學**
- [x] **7 大代表收音 (Batchim) 教學** (整合「呃/壓/鴨/硬/眼/岩/捲舌頂上顎」口訣)
- [x] **3 層收音拼音積木屋** (初聲+中聲+終聲自由拼組，支援 11,172 韓文字合成與發音對比)
- [x] **Kitty 60 核心生活動詞與 4 大實用時態** (6 大主題、15 組反義詞對、原形/現在/過去/敬語/想做切換、3段速發音、拆解與跟讀)
- [x] **6 大核心音變透視鏡** (連音化、鼻音化、流音化、激音化、硬音化、口蓋音化，含黃金公式與書寫/發音對照)
- [x] **Firebase 雲端自學單字庫** (Firestore 即時同步、0.3x 極慢速高亮發音、字母拆解、AI 跟讀評分)
- [x] **随堂星級自我挑戰測驗** (7 大題隨堂評量與分數結算)
- [x] **100 種常見食物學習手札與 20 頁大字 PDF 講義**
- [x] **🥩 韓語餐廳與烤肉店點餐實戰樂園** (`sanrio_korean_restaurant.html`，8 大必備分類 ✕ 雙行自適應膠囊導航 ✕ 烤肉桌實境圖解 17 大熱點 ✕ 連音化/硬音化透視 ✕ 點餐造句積木組裝機 ✕ 5 大情境隨堂星級闖關測驗 ✕ 0.3x/0.7x/1.0x 三段速真人發音)
- [x] **📖 韓國核心互動例句朗讀樂園** (`korean_core2000_sentences.html`，Korean CORE 2000 Everyday Words and Phrases • 韓系粉彩應援插畫風 • 偶像拍立得小卡 • 10 大粉彩應援主題色票 • 2,000 組單字與生活實戰例句 • 萬能全域智慧搜尋 kitty_search_engine 繁簡雙向通搜 • 0.3x/0.7x/1.0x 三段速真人語音朗讀 • 單字例句連播 • 💖 我的追星收藏生詞本 • 3D 偶像拍立得翻卡記憶模式 • 🎤 麥克風跟讀評分 • 262頁原書手帳 PDF 免下載線上直讀)
- [x] **韓語核心詞庫大字典** (korean_vocab_dictionary.html，含 TOPIK 全量即時檢索、12大詞性篩選、3D 單字卡翻卡記憶測驗、Unicode 音節結構即時拆解、❤️ 生詞本與 3 段速語音)
- [x] **韓語漢字音變大辭典** (korean_hanja_dictionary.html，收錄 Glossika 6,277 漢字詞、1,044 組全量音節矩陣與 242 外來語，支援以字查音/以音查字、單字卡、3段速語音、字母結構拆解、🧸 泰迪熊代表圖標與柔和奶茶暖杏風視覺設計)
- [x] **🚂 KITTY 韓語造句發音積木列車** (`sanrio_korean_sentences.html`，暖杏原木手繪列車風 ✕ 酷企鵝車長 🐧 ✕ 4 車卡 2 排自適應大卡排版：S 主語 + P 地點 + O 受語 + V 動詞，萬能單一多語言輸入框、繁簡中文智慧翻譯與複合動詞拆解，全自動生成詞典原形、現在式一般/獨立現在進行式、過去式、未來式、否定疑問句、3大敬語階層、語法助詞與時態語尾螢光筆透視高亮、0.3x/0.7x/1.0x 三段速語音與隨堂星級闖關測驗)
- [x] **🎵 韓語名曲歌詞練唱樂園** (sanrio_korean_songs.html，李碩珉 DK《Stay With Me》+ 北極光淺色典雅系 + 一句一框框)
- [x] **👑 韓語兩大敬語發音積木樂園** (`sanrio_korean_honorifics.html`，最高敬語 `습니다` ✕ 日常敬語 `해요` + 5大分頁 + 母音四大家族拼盤含 `ㅐ, ㅖ, ㅢ` 歸屬 + 名詞四大接法 + 職場/咖啡廳 PK 模擬器 + 隨堂星級闖關測驗 + 3段速發音)
- [x] **⏳ 韓語四大時態發音積木樂園** (`sanrio_korean_tenses.html`，雙子星時光機 • 原形 ➔ 現在式 ➔ 過去式 ➔ 未來式 + 5大分頁 + 動詞/形容詞/名詞四大時態矩陣 + 隨堂星級闖關測驗 + 3段速發音)
- [x] **🌸 韓語兩大核心助詞發音積木樂園** (`sanrio_korean_particles.html`，主格 `이/가` ✕ 受格 `을/를` + 美樂蒂 ✕ 大耳狗 + 4大代名詞變形 `내가/제가/네가/누가` + 5大口語縮合 `날/절/널/뭘/이걸` + `좋다 vs 좋아하다` 魔王對決 + 隨堂星級闖關測驗 + 3段速發音)
- [x] **📑 韓語教材線上互動閱讀器** (`pdf_viewer.html`，Mozilla PDF.js 向量高清晰渲染、免下載直讀、單頁翻閱與連續捲動、手勢滑動翻頁與全功能分頁導航列)
- [x] **大字典全功能極速導航分頁列** (自由跳頁下拉選單、⏮ 頁首、頁尾 ⏭、自適應頁數與平滑置頂)
- [x] **全生態圈雙向無縫互聯** (主站、核心大字典、漢字大辭典、名曲樂園、美食清單、烤肉點餐樂園、PDF 講義與積木屋跨頁參數傳遞)
- [x] **自動化詞庫管理管線** (`scripts/manage_vocab.py` + `scripts/build_hanja_dataset.py` + `korean-vocab-manager` Agent Skill，支援「查加 XX」全自動秒級查重、拼音生成、5 檔同步與 Git 自動部署)
- [x] **RDQ Method 需求探索規格卡體系** (完成韓語漢字辭典視覺改版、名曲練唱樂園、頂部導航站、烤肉點餐樂園規格卡落地與執行驗證)
- [x] **📱 Android 原生 App 封裝《KITTY 韓語積木大冒險 🌟》** (Capacitor 6.x + 雲端即時熱更新 + Service Worker 離線快取 + 拼豆 Yoda 寶寶萌趣 Adaptive 圖示 + 原生返回鍵防護 + GitHub Actions 自動編譯 APK 工作流)
- [x] **🎤 Android 原生語音辨識橋接 (AndroidNativeSTT)** (解決 Android WebView 限制，接入系統底層 `android.speech.SpeechRecognizer` 支援 `ko-KR` 韓語聲學模型 + `RECORD_AUDIO` 動態權限申請 + `KittySTT` 雙軌適配 + Jamo 初聲/中聲/收音即時精確度評分)

---

## 🚦 用戶專屬偏好、習慣與風格規範總則（強制遵循）

本規範為最高優先級原則，在所有對話、開發、規劃與文檔協同中均應主動嚴格執行，無需用戶重複叮嚀：

### 1. 全球通用三大基準（Global Baseline - 最高優先）
1. **時區基準**：一律以 **美國時間（洛杉磯 / 太平洋時間 PT，PST/PDT）** 為準（涵蓋所有日誌、交接檔、時間戳記與專案排程）。
2. **貨幣單位**：所有涉及價格、費用、成本或財務數據，一律以 **美金（USD / $）** 為預設單位。
3. **視覺主題**：UI 界面、視覺化圖表與筆記排版，一律以 **淺色背景（Light Theme）** 為第一優先（嚴禁未經同意切換深色模式）。

### 2. 語言文字與正字標準（Language & Typography）
- **繁體中文優先**：所有回應、介面文字、教學內容與文檔一律使用 **繁體中文（臺灣正體）**。
- **OpenCC s2twp 規範**：中文字串清洗、繁簡轉換或資料集處理，**嚴格強制使用 OpenCC `s2twp`（臺灣正體詞彙）** 標準，嚴禁使用 `s2t` 以杜絕異體字、生僻字偏差與簡體殘留。
- **杜絕半成品**：中英韓三語對照欄位必須完整無遺漏，排查譯名需準確符合官方標準繁體名。

### 3. 視覺設計與美學風格（Visual & Aesthetics）
- **核心風格**：以 **Sanrio 萌趣、韓系粉彩/馬卡龍（Macaron Pastel）、暖杏原木手繪、偶像拍立得小卡風** 為主視覺基調。
- **精緻色票搭配**：重視視覺和諧與階層感，使用具質感的指定馬卡龍色票（草莓粉 `#FF5E7E`、甜杏橘 `#FF8A3D`、抹茶薄荷 `#10B981`、藍莓香芋 `#7C3AED` 等）。
- **富互動動效**：熱愛 **3D 翻轉卡片、拍立得相紙質感陰影、雙行自適應膠囊導航列、自適應響應式大卡片、螢光筆語法透視高亮**。

### 4. 語音、音訊與 AI 辨識標準（Audio & Speech）
- **三段速播放機制**：所有朗讀發音元件必備 `0.3x`（逐音節口型拆解）、`0.7x`（慢速跟讀）、`1.0x`（自然正常）三段速。
- **四級高可用發音引擎（KittyVoice）**：
  `Android 原生 TTS ➔ Web Speech API ➔ Google 雲端高清晰真人語音 ➔ Baidu 韓語備援`，杜絕任何無聲、爆音或手機缺離線包之問題。
- **雙軌語音辨識（KittySTT）**：
  Android 原生端必須走 `AndroidNativeSTT` 原生橋接（`SpeechRecognizer` + 主執行緒 + `RECORD_AUDIO` 動態授權），嚴禁在 Android WebView 直接調用 `webkitSpeechRecognition`。

### 5. 專案架構與多端同步規範（Architecture & Sync）
- **雙軌架構守則**：同時維護 Web PWA（GitHub Pages）與 Android 原生（Capacitor 6.x）。
- **前端變更同步**：任何修改根目錄靜態資源（HTML/JS/CSS/圖資）時，**必須同步複製至 `www/`** 並執行 `npx cap sync android`。
- **快取版本遞增**：每次更新資源主動升級 Service Worker 快取版本號（如 `v1.0.45` ➔ `v1.0.46`），避免使用者載入舊版快取。

### 6. 三層級自動化收工／開工（Three-Tier Sync）
- **L1 本地**：嚴格維護 `AGENTS.md`（藍圖與 Checklist）與 `handoff.md`（包含目前進度、狀態、下一步、注意事項、更新時間與 Git Push 狀態）。
- **L2 GitHub**：及時 commit 與 push 至 GitHub main 分支，維護乾淨的 git commit message。
- **L3 Obsidian 第二大腦**：同步至 `G:\My Drive\2ndbrain-Obsidian\`（依性質寫入 `創作庫/`、`知識庫/` 或 `專案工作流程/`）。

### 7. 第二大腦（Obsidian Vault）維護慣例
- **目錄結構用途**：
  - `Clippings/`：原始外部素材，絕不竄改。
  - `知識庫/`：AI 整理消化之結構化知識，同步維護 `index.md` 與 `log.md`。
  - `創作庫/`：個人原創專案規劃、產品企劃與架構藍圖。
  - `每日筆記/`：時間管理與日常筆記，檔名與 frontmatter 遵循洛杉磯時間（`YYYY-MM-DD`）。
- **筆記標頭**：新增筆記必附帶 YAML frontmatter（`title`, `date`, `tags`, `type`）。

### 8. 溝通與交付風格（Communication Style）
- **結構化與高效**：回答直擊核心、條列清晰，善用 Emoji 結構化小標題，拒絕無意義的冗言廢話。
- **主動與完整**：不留尾巴、不製造半成品，全面預判跨端兼容性與邊界情況。

