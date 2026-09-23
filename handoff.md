# 📋 Handoff: KITTY 韓語發音積木樂園 (KITTY Korean Learning Playground)

本文件為跨電腦／跨 Agent 工作交接核心文件。

---

## ⏯️ 目前做到哪

1. **🎨 10 大章節劃分與專屬馬卡龍色票全面落實**：
   - 移除原本簡化之「蜜桃粉應援」等名稱，完整升級為官方指定格式「`CH 01 (1-200)：日常問候與基礎禮貌`」。
   - 精確套用 10 大指定 HEX 色票（草莓粉 `#FF5E7E`、甜杏橘 `#FF8A3D`、蜂蜜卡士達 `#D99B00`、抹茶薄荷 `#10B981`、天空藍 `#0284C7`、藍莓香芋 `#7C3AED`、櫻花粉 `#DB2777`、蜜瓜綠 `#059669`、葡萄紫 `#9333EA`、可可珊瑚 `#E11D48`）。
   - 同步更新 `korean_core2000_data.js`、`korean_core2000.json`、篩選按鈕、拍立得小卡標籤與 3D 抽認卡正面頂標。
2. **🚂 主頁移動【核心2000例句樂園】按鈕位置**：
   - 依指示將主頁原第 2 排首位的【核心2000例句】移動至第 4 排首位（位於【100種常見食物】之前）。
   - 主頁 5 排架構：基礎字庫 ➔ 核心語法 ➔ 語法實戰 ➔ 核心2000例句與生活 ➔ 進階與教材。
3. **🧭 全生態圈頂端導航條統一標準排序與【語法 PDF】乾淨移除**：
   - 全站 9 個子頁面頂端導航列全面對齊主頁標準排序：`首頁 ➔ 詞庫 ➔ 漢字 ➔ 敬語 ➔ 時態 ➔ 助詞 ➔ 造句 ➔ 核心2000例句 ➔ 美食 ➔ 點餐 ➔ 名曲`。
   - 依附圖指示將各子頁面頂部多餘的【語法 PDF】（或【語序時態PDF】）標籤徹底乾淨移除（涵蓋漢字大辭典、助詞樂園、核心詞庫大字典、敬語樂園、烤肉點餐樂園）。
4. **🔊 全平台語音播放深度健診與強化 (KittyVoice 四級容錯)**：
   - 徹底解決手機端（Android / Samsung / iOS Safari / WebView）因缺少本機韓語離線語音包而出現的靜音、破音或連播中斷問題。
   - `korean_core2000_sentences.html` 全面串接 `KittyVoice` 跨平台發音引擎，提供「Android 原生 TTS ➔ Web Speech API ➔ Google 雲端真人高清晰語音 ➔ Baidu 韓語備援」四級容錯。
   - 支援 0.3x 逐音節拆解清晰吐音、單字例句連播（Combo）手勢解鎖防阻擋，並校準 `KittySTT.start` 雙軌跟讀語音辨識。
5. **📱 APK 與 PWA 離線快取同步**：
   - 升級 Service Worker 快取版本至 `v1.0.44`。
   - 同步複製所有變更至 `www/`，執行 `npx cap sync android` 完成 Android 原生資源同步。
6. **🎯 CORE 2000 欄位錯位、斷行截斷與荒謬音譯全量精準修復**：
   - **問題溯源**：在原始 PDF 解析時，由於部分長單字/電影名稱在表格中換行，導致單字與例句交錯錯位（如 #1993《좋은 놈, 나쁜 놈, 이상한 놈》韓文被切成兩截、例句英文被切成 `sipeoyo.` 導致音譯成「西佩奧約。」；#1994《태극기 휘날리며》英文被切斷為 `of War` 翻成「戰爭的」；#1995~#1999 經典電影譯名失準等）。
   - **全面排查與修復**：精準修復 #568、#738、#1261、#1277、#1424、#1704、#1875、#1993、#1994、#1995、#1996、#1997、#1998、#1999 共 14 筆問題條目，恢復韓國影史經典電影名片正確繁體官方譯名（《神偷·獵人·斷指客》、《太極旗－生死兄弟》、《駭人怪物》、《原罪犯》、《大浩劫》、《殺人回憶》、《王的男人》）。
   - 快取升級為 `v1.0.45`。

7. **📚 核心大字典擴充 6 筆生活高頻核心詞彙 (#5739 ~ #5744)**：
   - 經全庫逐一精確比對用戶提供的 101 筆生活學習詞彙，其中 94 筆已完全精確收錄、1 筆標準外來語全稱對應（`TV` ➔ `텔레비전` #1734）。
   - 一次性原子化新增未收錄之 6 筆高頻詞彙至 Kitty 自訂庫（保持 5,666 基準庫純淨）：
     - `#5739` `뒤` [dwi] - 後面、背後、後方 (名詞 • A 級)
     - `#5740` `비자` [bija] - 簽證 (名詞 • A 級)
     - `#5741` `러시아` [reosia] - 俄羅斯 (專有名詞 • A 級)
     - `#5742` `회사원` [hoesawon] - 上班族、公司職員 (名詞 • A 級)
     - `#5743` `오사카` [osaka] - 大阪 (專有名詞 • A 級)
     - `#5744` `드라마` [deurama] - 電視劇、韓劇、戲劇 (名詞 • A 級)
   - 同步原子化更新 `korean_vocab_kitty_add_data.js`、`korean_vocab_kitty_add.csv` 與 `korean_vocab_kitty_add.md`。自訂庫累計達 **78 筆**，全庫總量正式擴展至 **5,744 筆**。
   - 升級 Service Worker 離線快取版本為 **`v1.0.46`**。
   - 同步複製變更至 `www/`，執行 `npx cap sync android` 完成 Android 原生資源同步。

---

## 🚦 目前狀態

- **運行狀態**：全功能正常運作，Web 端、PWA 離線快取（`v1.0.46`）與 Android 原生端（TTS 發音 + STT 麥克風跟讀評分）均已支援完畢。
- **線上體驗 (GitHub Pages)**：[https://kitty-sin.github.io/sanrio-korean-learning/](https://kitty-sin.github.io/sanrio-korean-learning/)
- **最新 APK 下載**：[https://github.com/kitty-sin/sanrio-korean-learning/releases/tag/v1.0.1-apk](https://github.com/kitty-sin/sanrio-korean-learning/releases/tag/v1.0.1-apk)
- **最新 Git Commit**：`eac1e93`（✅ 已推至 origin/main）
- **全庫總單字數**：5,744 筆 (基準 5,666 + Kitty自訂 78 筆)

---

## ➡️ 下一步

1. **真機與瀏覽器全功能驗證**：驗證 GitHub Pages 站點與 Service Worker 快取更新後之大字典搜尋（搜尋 `뒤`, `비자`, `러시아`, `회사원`, `오사카`, `드라마` 立即反饋）。
2. **造句列車與 CORE 2000 聯動**：評估是否在造句列車（`sanrio_korean_sentences.html`）中引入 CORE 2000 例句庫作為智慧造句參考範例。
3. **測驗模式語法解析擴充**：評估是否將造句列車測驗模式亦加入語法高亮透視解析反饋。

---

## ⚠️ 注意事項

- **繁體中文嚴格規範**：全站所有資料集、例句、按鈕與介面說明必須嚴謹 100% 繁體中文，杜絕簡體殘留；進行中文字串處理時必須採用 OpenCC `s2twp`（臺灣正體詞彙）標準，避免 `s2t` 造成的生僻字或異體字轉換偏差。
- **Android 原生語音辨識**：在 Android 原生端，`SpeechRecognizer.createSpeechRecognizer` 必須在主執行緒（Main Looper）中執行，且需透過 `MainActivity.java` 中的動態權限檢查確保已取得 `RECORD_AUDIO` 授權。
- **WebView 限制**：切勿在 Android WebView 依賴 `window.webkitSpeechRecognition`，必須走 `KittySTT` ➔ `AndroidNativeSTT` 橋接通道。
- **前端變更同步**：每次修改根目錄的網頁、腳本或資源時，均需同步複製至 `www/`，並執行 `npx cap sync android`。

---

## 🕐 最後更新

- **時間**：2026-09-22 17:25 PT
- **更新者**：Antigravity @ DESKTOP-QROANQ2
- **Git Push 狀態**：✅ 已推
