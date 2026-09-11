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
- **🕒 最近更新紀錄 (2026-09-11 15:15 PT)**：
  - 成功建置獨立新頁面 `korean_vocab_dictionary.html`，整合 5,666 筆 TOPIK 全量核心詞庫。
  - 實作「速查字典」與「Sanrio 萌趣單字卡」雙視圖切換，提供翻卡、遮中文/遮韓文記憶自測與隨機抽考。
  - 研發 Unicode 音節結構分解演算法，點擊任何詞彙可彈窗拆解為「初聲 + 中聲 + 終聲收音」，並智能匹配 7 大代表收音口訣。
  - 實現生詞收藏夾（LocalStorage + Firebase Firestore 雙層同步）與 3 段速（1.0x / 0.7x / 0.3x）語音播放。
  - 完成主站與附屬頁面的雙向導航串接與 URL 參數連動（支援 `?builder=...` 直達積木屋）。
- **➡️ 下一步**：
  1. 待使用者有空時，依其自訂的拼音規則批次修改 `hangul_sanrio_deck.html` 中的諧音標籤，並重新匯出覆蓋 `hangul_sanrio_deck_20p.pdf`。
  2. 依學習進度持續擴充進階文法句型或主題練習題庫。

---

## 🕐 最後更新資訊
- **更新時間**：2026-09-11 14:15 PT
- **更新者**：Antigravity Assistant @ PC (DESKTOP-QROANQ2)
- **Git Push 狀態**：✅ 已部署推播至 GitHub Pages (main 分支)
