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
├── scripts/
│   ├── manage_vocab.py          # 韓語核心詞庫自動化管理 CLI (查重+拼音+5檔同步+Git部署)
│   └── build_hanja_dataset.py   # 韓語漢字大辭典資料集建置管線
├── index.html                   # 主應用 SPA (React 18 + Tailwind + Firebase + Web Speech)
├── korean_vocab_dictionary.html # 韓語核心詞庫大字典 (TOPIK 全量速查 + 萌趣單字卡 + 結構拆解)
├── korean_hanja_dictionary.html # 韓語漢字音變大辭典 (Glossika 6,277 漢字詞 + 471 音節矩陣 + 外來語)
├── korean_hanja_data.js         # 6,519 筆漢字詞與音節常數數據集
├── korean_hanja.csv             # 6,519 筆漢字詞與外來語 CSV 總表
├── korean_hanja.md              # 漢字詞對照 Markdown 字典
├── korean_vocab_5666_data.js    # 5,673 筆高壓縮常數數據集
├── hangul_sanrio_deck_20p.pdf   # 20 頁超大字 Sanrio 拼音總表 (PDF 直連瀏覽)
├── sanrio_korean_food_100.html  # 100 種常見食物發音打卡學習手札 (含 0.3x 口型)
├── sanrio_korean_food_100.md    # 100 種常見食物 Markdown 清單
├── korean_vocab_5666.csv        # 5,673 筆 TOPIK 核心詞庫總表
├── korean_vocab_5666.md         # 5,673 筆核心詞庫 Markdown 字典
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
- [x] **韓語漢字音變大辭典** (korean_hanja_dictionary.html，收錄 Glossika 6,277 筆漢字詞、471 組單音節矩陣與 242 筆外來語，支援以字查音/以音查字、單字卡、3段速語音、字母結構拆解與全生態圈雙向互聯)
- [x] **全生態圈雙向無縫互聯** (主站、核心大字典、漢字大辭典、美食清單、PDF 講義與積木屋跨頁參數傳遞)
- [x] **自動化詞庫管理管線** (`scripts/manage_vocab.py` + `scripts/build_hanja_dataset.py` + `korean-vocab-manager` Agent Skill，支援「查加 XX」全自動秒級查重、拼音生成、5 檔同步與 Git 自動部署)

---

## 🚦 全球通用預設規範

1. **時區**：一律以**美國時間（洛杉磯，Pacific Time / PT）**為準。
2. **貨幣**：一律以**美金（USD / $）**為預設單位。
3. **視覺**：一律以**淺色背景（Light Theme）**為第一優先。
