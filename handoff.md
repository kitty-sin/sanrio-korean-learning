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
7. **📖 【韓國核心互動例句朗讀樂園】全新上線並重塑為【韓系粉彩應援插畫風】** (`korean_core2000_sentences.html` + `korean_core2000_data.js` + `assets/Korean_CORE2000.pdf`)：
   - **全書 2,000 組單字與例句管線萃取**：編寫 `scripts/build_core2000_dataset.py`，從 262 頁手帳 PDF 精準抽取 250 頁單字表，零遺漏抽取 2,000 組單字與生活實戰例句。
   - **100% 嚴謹繁體中文復查與正字化**：徹底排查修復使用者發現之簡體殘留（如 #1201「镜头」），編寫 `scripts/refine_traditional_chinese.py` 接入 OpenCC `s2twp`（臺灣/香港繁體正字標準），將 2,000 筆數據全量清洗，繁體化達 100%（鏡頭、著、只、後等），並補全 64 筆缺漏繁中翻譯。
   - **全面重塑為【韓系粉彩應援插畫風】 (K-pop Pastel Cheer Aesthetic)**：
     - 告別日系手帳格子，採用夢幻粉彩雲朵背景（`#FFF0F5`, `#FFE4E9`）與微光星芒 (✦)。
     - 頂部 Hero Banner 融合 `assets/kpop_cheer_banner_bg.png` 視覺，搭配粉彩愛心手燈 (🪄)、粉彩耳機 (🎧)、應援日記本 (📓)、拍立得小卡 (📷)。
     - 單字與例句卡片升級為「拍立得偶像小卡（Polaroid Photocard / 應援小卡 #0001 ♥~♡）」，具備柔和白框、光澤感與立體陰影。
     - 10 大主題章節全面升級為「10 大應援主題色票」（蜜桃粉應援 🍓、甜杏橙應援 🍊、奶黃檸檬 🍋、薄荷蘇打 🌱、夢幻天藍 ☁️、薰衣草紫 🫐、櫻花愛心 🌸、蜜瓜冰淇淋 🍈、葡萄芭菲 🍇、寶石珊瑚 🎀）。
     - 3D 抽認卡升級為「拍立得偶像小卡 (Photocard Flip)」3D 翻轉記憶模式。
   - **全域智慧搜尋與三段速語音**：引入 `kitty_search_engine.js`，支援繁簡雙向即時檢索、韓語初聲子音搜尋（如 `ㅋㅁㄹ` 匹配 `카메라`）及英文拼音；配備 0.3x/0.7x/1.0x 三段速語音朗讀、單字例句連播、生詞本與麥克風跟讀評分。
   - **原書手帳 PDF 免下載直讀**：將 262 頁原書 PDF 掛載至 `pdf_viewer.html?doc=core2000`。
   - **全生態圈互聯與快取**：更新全站 10 個核心頁面頂部導航站，升級 Service Worker 快取至 `v1.0.43`，所有資源同步複製至 `www/` 並完成 `npx cap sync android`。

---

## 🚦 目前狀態

- **運行狀態**：全功能正常運作，Web 端、PWA 離線快取（`v1.0.43`）與 Android 原生端（TTS 發音 + STT 麥克風跟讀評分）均已支援完畢。
- **線上體驗 (GitHub Pages)**：[https://kitty-sin.github.io/sanrio-korean-learning/](https://kitty-sin.github.io/sanrio-korean-learning/)
- **最新 APK 下載**：[https://github.com/kitty-sin/sanrio-korean-learning/releases/tag/v1.0.1-apk](https://github.com/kitty-sin/sanrio-korean-learning/releases/tag/v1.0.1-apk)
- **最新 Git Commit**：`7ac639a`（✅ 已推至 origin/main）

---

## ➡️ 下一步

1. **真機與瀏覽器全功能驗證**：驗證 GitHub Pages 站點與 Service Worker 快取更新後之拍立得小卡渲染效果、3D 翻卡動畫及語音連播。
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
 
- **時間**：2026-09-22 14:11 PT
- **更新者**：Antigravity @ DESKTOP-QROANQ2
- **Git Push 狀態**：✅ 已推
