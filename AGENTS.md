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
├── .github/workflows/
│   └── build-apk.yml            # GitHub Actions Android APK 自動編譯與 Release 工作流
├── android/                     # Android 原生專案代碼 (Capacitor 6.x Gradle 專案)
├── assets/                      # 拼豆 Yoda 寶寶 App Icon、Splash、韓語拼音總表與 40 音變速查總表圖資
├── rdq/
│   ├── RDQ-spec-android-app-capacitor-20260912.md # RDQ 規格卡 (Android 原生 App 封裝)
│   ├── RDQ-spec-hanja-theme-redesign-20260911.md # RDQ 規格卡 (漢字大辭典暖杏視覺改版)
│   ├── RDQ-spec-korean-songs-page-20260916.md    # RDQ 規格卡 (韓語名曲歌詞練唱樂園)
│   └── RDQ-spec-top-banner-copy-20260916.md      # RDQ 規格卡 (頂部導航站橫幅文案優化)
├── scripts/
│   ├── manage_vocab.py          # 韓語核心詞庫自動化管理 CLI (查重+拼音+5檔同步+Git部署)
│   ├── build_hanja_dataset.py   # 韓語漢字大辭典資料集建置管線
│   ├── build_songs_dataset.py   # 韓語歌詞 Excel 解析與資料集建置腳本
│   ├── generate_app_assets.py   # 拼豆 Yoda 圖標精修與 Adaptive Icon 生成器
│   ├── deploy_android_icons.py  # Android mipmap 各尺寸圖標部署腳本
│   └── loanword_translations.py # 242 筆外來語繁體中文對照字典
├── index.html                   # 主應用 SPA (React 18 + Tailwind + Firebase + Web Speech)
├── korean_vocab_dictionary.html # 韓語核心詞庫大字典 (TOPIK 全量速查 + 萌趣單字卡 + 結構拆解)
├── korean_hanja_dictionary.html # 韓語漢字音變大辭典 (Glossika 6,277 漢字詞 + 1,037 全量音節矩陣 + 外來語 + 暖杏風)
├── sanrio_korean_songs.html     # 韓語名曲歌詞練唱樂園 (李碩珉 DK《Stay With Me》+ 北極光淺色系 + 一句一框框)
├── korean_songs_data.js         # 韓語歌曲結構化常數數據集
├── korean_songs_data.md         # 韓語歌曲 Markdown 對照清單
├── korean_hanja_data.js         # 6,520 筆漢字詞與 1,040 音節常數數據集
├── korean_hanja.csv             # 6,520 筆漢字詞與外來語 CSV 總表
├── korean_hanja.md              # 漢字詞對照 Markdown 字典
├── korean_vocab_5666_data.js    # 5,666 筆基準高壓縮常數數據集 (#1 ~ #5666)
├── korean_vocab_5666.csv        # 5,666 筆 TOPIK 基準詞庫總表
├── korean_vocab_5666.md         # 5,666 筆基準詞庫 Markdown 字典
├── korean_vocab_kitty_add_data.js # Kitty 自訂新增詞庫常數數據集 (#5667 ~ #5689)
├── korean_vocab_kitty_add.csv   # Kitty 自訂新增詞庫 CSV 總表 (23 筆)
├── korean_vocab_kitty_add.md    # Kitty 自訂新增詞庫 Markdown 字典 (23 筆)
├── kitty_search_engine.js       # 全域智慧多語言搜尋引擎 (繁簡雙向通搜 + 韓語 NFC/初聲 + 英文拼音)
├── hangul_sanrio_deck_20p.pdf   # 20 頁超大字 Sanrio 拼音總表 (PDF 直連瀏覽)
├── sanrio_korean_food_100.html  # 100 種常見食物發音打卡學習手札 (含 0.3x 口型)
├── sanrio_korean_food_100.md    # 100 種常見食物 Markdown 清單
├── capacitor.config.json        # Capacitor 雲端熱更新與 Android 原生設定
├── app_mobile_bridge.js         # 行動端 Service Worker 註冊與返回鍵智慧防誤觸橋接
├── sw.js                        # Service Worker 離線快取核心 (v1.0.22)
├── package.json                 # 專案套件管理與 Capacitor 依賴
├── AGENTS.md                    # 專案藍圖與協同規範
├── handoff.md                   # 跨工作階段交接檔
└── README.md                    # 專案公開說明文件
```

---

## 🗺️ 功能模組與進度 Checklist

- [x] **10 大基礎母音與 11 大複合母音教學** (Sanrio 圖像聯想 + 粵語諧音)
- [x] **10 大基礎平音、4 大激音、5 大硬音教學**
- [x] **7 大代表收音 (Batchim) 教學** (整合「呃/壓/鴨/硬/眼/岩/捲舌頂上顎」口訣)
- [x] **3 層收音拼音積木屋** (初聲+中聲+終聲自由拼組，支援 11,172 韓文字合成與發音對比)
- [x] **Kitty 60 核心生活動詞與 4 大實用時態** (6 大主題、15 組反義詞對、原形/現在/過去/敬語/想做切換、3段速發音、拆解與跟讀)
- [x] **6 大核心音變透視鏡** (連音化、鼻音化、流音化、激音化、硬音化、口蓋音化，含黃金公式與書寫/發音對照)
- [x] **Firebase 雲端自學單字庫** (Firestore 即時同步、0.3x 極慢速高亮發音、字母拆解、AI 跟讀評分)
- [x] **隨堂星級自我挑戰測驗** (7 大題隨堂評量與分數結算)
- [x] **100 種常見食物學習手札與 20 頁大字 PDF 講義**
- [x] **韓語核心詞庫大字典** (korean_vocab_dictionary.html，含 TOPIK 全量即時檢索、12大詞性篩選、3D 單字卡翻卡記憶測驗、Unicode 音節結構即時拆解、❤️ 生詞本與 3 段速語音)
- [x] **韓語漢字音變大辭典** (korean_hanja_dictionary.html，收錄 Glossika 6,277 漢字詞、1,040 組全量音節矩陣與 242 外來語，支援以字查音/以音查字、單字卡、3段速語音、字母結構拆解、🧸 泰迪熊代表圖標與柔和奶茶暖杏風視覺設計)
- [x] **🎵 韓語名曲歌詞練唱樂園** (sanrio_korean_songs.html，李碩珉 DK《Stay With Me》一句一框框卡片、北極光淺色典雅系、1.0x/0.7x/0.3x 真放慢速控、整曲循序跟唱、音節初中終聲拆解與全站生態圈互聯)
- [x] **大字典全功能極速導航分頁列** (自由跳頁下拉選單、⏮ 頁首、頁尾 ⏭、自適應頁數與平滑置頂)
- [x] **全生態圈雙向無縫互聯** (主站、核心大字典、漢字大辭典、名曲樂園、美食清單、PDF 講義與積木屋跨頁參數傳遞)
- [x] **自動化詞庫管理管線** (`scripts/manage_vocab.py` + `scripts/build_hanja_dataset.py` + `korean-vocab-manager` Agent Skill，支援「查加 XX」全自動秒級查重、拼音生成、5 檔同步與 Git 自動部署)
- [x] **RDQ Method 需求探索規格卡體系** (完成韓語漢字辭典視覺改版、名曲練唱樂園、頂部導航站規格卡落地與執行驗證)
- [x] **📱 Android 原生 App 封裝《KITTY 韓語積木大冒險 🌟》** (Capacitor 6.x + 雲端即時熱更新 + Service Worker 離線快取 + 拼豆 Yoda 寶寶萌趣 Adaptive 圖示 + 原生返回鍵防護 + GitHub Actions 自動編譯 APK 工作流)

---

## 🚦 全球通用預設規範

1. **時區**：一律以**美國時間（洛杉磯，Pacific Time / PT）**為準。
2. **貨幣**：一律以**美金（USD / $）**為預設單位。
3. **視覺**：一律以**淺色背景（Light Theme）**為第一優先。
