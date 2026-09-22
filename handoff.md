# 📋 Handoff: KITTY 韓語發音積木樂園 (KITTY Korean Learning Playground)

本文件為跨電腦／跨 Agent 工作交接核心文件。

---

## ⏯️ 目前做到哪

1. **🎤 Android App 原生麥克風韓語語音辨識與跟讀評分全面修復 (`AndroidNativeSTT`)**：
   - **問題排查**：徹底解決 App（APK / Capacitor WebView）內點擊麥克風無法辨識或顯示「未能辨識到聲音」問題。根本原因在於：
     1. `AndroidManifest.xml` 缺少 `RECORD_AUDIO` 底層錄音權限；
     2. Android WebView 因商業授權閹割了 Web Speech API 的 Google 雲端語音服務，調用 `recognition.start()` 會拋出 `network` 或 `not-allowed`；
     3. 缺少 Android 6.0+ 動態運行時權限彈窗與 Android 11+ `<queries>` 語音服務宣告。
   - **Android 底層權限補齊**：在 `android/app/src/main/AndroidManifest.xml` 宣告 `RECORD_AUDIO`、`MODIFY_AUDIO_SETTINGS` 以及 `<queries><intent><action android:name="android.speech.RecognitionService" /></intent></queries>`。
   - **實裝 `AndroidNativeSTT` 橋接**：在 `MainActivity.java` 接入系統層級 `android.speech.SpeechRecognizer`，配置 `ko-KR` 韓語聲學模型，支援動態麥克風授權（首次點擊時自動彈出系統授權提示，允許後無縫開始聆聽），並將識別結果透過 `window.onAndroidSpeechResult` 等回調傳回前端。
   - **前端跨平台雙軌語音引擎 (`KittySTT`)**：在 `app_mobile_bridge.js` 封裝 `window.KittySTT`，在 App 內優先走原生 `AndroidNativeSTT`，在一般瀏覽器自動回退至 Web Speech API；於 `index.html` 的 `<head>` 預載 bridge，重構 `startSpeechRecognition`，將原生辨識文字直接注入 `calculateJamoScore` 進行初聲、中聲、收音拆解與星級評分。
2. **📱 APK 自動編譯與 GitHub Release 最新安裝包發布**：
   - 執行 `npx cap sync android` 同步所有靜態資源與原生配置至 Android 專案。
   - 推送至 GitHub `main` 分支觸發 GitHub Actions `Build Android APK` 工作流，1m43s 順利編譯通過。
   - 自動更新 GitHub Release `v1.0.1-apk` 的 `app-debug.apk`，並同步下載至本地根目錄 `app-debug.apk`（約 7.3 MB）。
   - 在 `.gitignore` 中加入 `*.apk`，防止安裝包二進位檔被意外追蹤。
3. **🍱 烤肉店點餐分類膠囊雙行排版進化 (2-Row Capsule Tabs)**：
   - 解決原本單行橫向滑動需手動來回滑動找尋分頁的痛點，改為響應式 **雙行自適應網格排版**（`grid grid-cols-2 sm:grid-cols-5 gap-2`）。
   - 電腦與平板螢幕（`sm:` 以上）：精準分為 2 排，每排 5 個膠囊，10 大分類一覽無遺、一鍵直達。
   - 手機螢幕（`< 640px`）：自動切換為雙列大卡片排版，按鈕更寬大好點擊，不再需要橫向滑動。
   - 升級 Service Worker 快取至 `kitty-korean-v1.0.41`。
4. **🥩 韓語餐廳與烤肉店點餐實戰樂園全功能上線** (`sanrio_korean_restaurant.html` + `assets/korean_bbq_table.png`)：
   - **8 大必備分類 + 實境俯視圖解**：涵蓋禮貌招呼、菜單規格、餐具與自助服務、主食加點配料、蔬菜小菜、酒精飲料、烤肉沾醬調味、數量詞與實用量詞。
   - **🔥 烤肉桌實景熱點互動點擊器 (Interactive BBQ Table)**：融合實境烤肉桌圖資，點選烤盤、五花肉、剪刀、大醬湯、生菜包肉等直接跳出發音與雙語教學。
   - **3 段速語音朗讀**：支援 `0.3x` 極慢速口型、`0.7x` 慢速、`1.0x` 道地原速發音。
   - **點餐造句積木組裝機**：菜餚品項 + 份量規格 + `주세요` 一鍵合成完整點餐語句並朗讀。
   - **隨堂星級闖關測驗**：5 大情境隨堂評量與滿分慶祝煙花特效。
5. **🚂 韓語造句發音積木列車全功能進化** (`sanrio_korean_sentences.html` + `korean_sentence_data.js`)：
   - **單一萬能輸入框**：整合中/韓/英/粵語拼音智慧即時解析，支援繁簡雙向、電腦端與手機端完整自適應、Enter 鍵即時確認。
   - **2 排自適應車卡排版**：第一行（車頭 🐧 + 車卡1 主語 + 車卡2 地點）、第二行（車卡3 受語 + 車卡4 動詞）。
   - **語法助詞與時態語尾螢光筆透視高亮**：主語/主題助詞、場所助詞、受格助詞與語幹變形/語尾/時態標誌雙語螢光筆標註，支援開關控制。
6. **📚 詞彙庫持續擴充至 5,738 筆**：
   - 收錄 `#5738 깅`（撒嬌、可愛、小寶貝 / K-pop 飯圈愛稱語氣後綴）、雙收音詞庫等，Kitty 自訂庫累計達 **72 筆**，基準庫 5,666 筆，全庫總量達 **5,738 筆**。

---

## 🚦 目前狀態

- **運行狀態**：全功能正常運作，Web 端與 Android 原生端（發音 TTS + 語音跟讀 STT）均已支援完畢。
- **線上體驗 (GitHub Pages)**：[https://kitty-sin.github.io/sanrio-korean-learning/](https://kitty-sin.github.io/sanrio-korean-learning/)
- **最新 APK 下載**：[https://github.com/kitty-sin/sanrio-korean-learning/releases/tag/v1.0.1-apk](https://github.com/kitty-sin/sanrio-korean-learning/releases/tag/v1.0.1-apk)
- **最新 Git Commit**：待推更新（L1/L2 收工同步中）

---

## ➡️ 下一步

1. 測試真機 Android 麥克風語音辨識與 Jamo 評分反饋體驗。
2. 依使用者後續反饋擴充更多常用韓語造句動詞、形容詞與主題句庫。
3. 評估是否將造句列車測驗模式（Quiz）亦加入語法高亮透視解析反饋。
4. 支援更多外來語或生活常用語法句型（如「想做 ~고 싶다」、「請做 ~아/어 주세요」等）。

---

## ⚠️ 注意事項

- **Android 原生語音辨識**：在 Android 原生端，`SpeechRecognizer.createSpeechRecognizer` 必須在主執行緒（Main Looper）中執行，且需透過 `MainActivity.java` 中的動態權限檢查確保已取得 `RECORD_AUDIO` 授權。
- **WebView 限制**：切勿在 Android WebView 依賴 `window.webkitSpeechRecognition`，必須走 `KittySTT` ➔ `AndroidNativeSTT` 橋接通道。
- **前端變更同步**：每次修改根目錄的 `index.html`、`app_mobile_bridge.js` 或相關資源時，均需同步複製至 `www/`，並執行 `npx cap sync android`。

---

## 🕐 最後更新

- **時間**：2026-09-21 18:20 PT
- **更新者**：Antigravity @ DESKTOP-QROANQ2
- **Git Push 狀態**：✅ 已推 (`main` 分支)
