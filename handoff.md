# 📋 Project Handover: Sanrio 韓語發音積木樂園 (Sanrio Korean Learning Playground)

本文件旨在為後續接手或協作的 AI Agent / 開發者提供完整的專案狀態、架構設計、Firebase 整合配置與後續擴充指引。

---

## 📌 1. 專案基本資訊 (Project Summary)

- **專案名稱**：Sanrio 韓語發音積木樂園 (Sanrio Korean Learning Playground)
- **核心目標**：透過 Sanrio 人氣角色視覺聯想、廣東話諧音口訣與動態積木拼音，搭配 Firebase 即時雲端互動（榮譽榜、集氣讚、自學單字庫），提供無痛有趣的韓語入門學習體驗。
- **線上體驗網址 (GitHub Pages)**：[https://kitty-sin.github.io/sanrio-korean-learning/](https://kitty-sin.github.io/sanrio-korean-learning/)
- **GitHub 倉庫**：[https://github.com/kitty-sin/sanrio-korean-learning](https://github.com/kitty-sin/sanrio-korean-learning)
- **本地工作目錄**：
  - Repo 路徑：`c:\Users\PC\Documents\Google-Antigravity\sanrio-korean-learning\`
  - 桌面單檔路徑：`C:\Users\PC\Desktop\sanrio_korean_flashcards_pronunciation_tool.html`

---

## 🏗️ 2. 技術架構 (Technical Architecture)

本專案採用**零打包工具鏈 (No-build Toolchain)** 的純單檔 SPA 設計，極度輕量、易維護、可直接由瀏覽器或靜態伺服器開啟。

### 前端技術棧
- **核心框架**：React 18 (CDN UMD) + Babel Standalone
- **樣式庫**：Tailwind CSS (CDN) + 自訂 Sanrio 配色與 CSS 關鍵影格動畫
- **圖示庫**：Font Awesome 6.4.0
- **字型**：Google Fonts (`Fredoka`, `Noto Sans TC`, `Noto Sans KR`)
- **語音朗讀**：瀏覽器原生 `window.speechSynthesis` (Web Speech API)，語言代碼設為 `ko-KR`，語速調校為 `0.85x`。

### 雲端與後端 (Firebase Integration)
- **SDK 版本**：Firebase v10.8.0 (Compat 模組：`firebase-app`, `firebase-auth`, `firebase-firestore`)
- **專案 ID**：`korean-learning-1ec2a`
- **身份驗證 (Auth)**：啟用 `signInAnonymously()` 匿名驗證，免登入即可存取雲端功能。
- **Firestore 集合架構**：
  1. `korean_app_stats/cheers`：
     - 欄位：`count (number)`（透過 `FieldValue.increment(1)` 進行原子累加）
  2. `korean_custom_words`：
     - 欄位：`kr (string)`, `sound (string)`, `meaning (string)`, `createdAt (timestamp)`
     - 查詢方式：`orderBy('createdAt', 'desc').limit(30)`
- **容錯設計**：具備本機離線 Fallback 機制，當 Firebase 離線或無網路時，會自動切換為本地模式運行，介面右上角具備連線狀態燈號。

---

## 🧮 3. 韓語三層拼音演算法 (Hangul 3-Layer Batchim Formula)

在「🧩 3 層拼音積木屋」中，韓文字母組合係根據完整 Unicode 韓文拼音規範計算：
```javascript
const CHOSEONG = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
const JUNGSEONG = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];
const JONGSEONG = ['', 'ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];

const combineHangul = (c, v, t = '') => {
    const cIdx = CHOSEONG.indexOf(c);
    const vIdx = JUNGSEONG.indexOf(v);
    const tIdx = JONGSEONG.indexOf(t);
    
    if (cIdx === -1 || vIdx === -1) return c + v + t;
    
    // Unicode 韓文字母計算公式：44032 + (初聲 * 588) + (中聲 * 28) + 終聲
    const code = 44032 + (cIdx * 588) + (vIdx * 28) + (tIdx !== -1 ? tIdx : 0);
    return String.fromCharCode(code);
};
```

---

## ✅ 4. 已完成功能清單 (Completed Features)

1. [x] **🐱 基礎母音專頁**（10 個基礎母音 + Kitty/布甸狗/美樂蒂/玉桂狗/Kuromi/雙子星口訣）
2. [x] **🐰 11 大複合母音專頁**（`ㅐ, ㅔ, ㅒ, ㅖ, ㅘ, ㅙ, ㅚ, ㅝ, ㅞ, ㅟ, ㅢ` 雙母音調色盤）
3. [x] **🐶 10 大基礎平音專頁**（`ㄱ, ㄴ, ㄷ, ㄹ, ㅁ, ㅂ, ㅅ, ㅇ, ㅈ, ㅎ`）
4. [x] **⚡ 4 大激音（送氣音）專頁**（`ㅊ, ㅋ, ㅌ, ㅍ` 爆破噴氣音教學）
5. [x] **💥 5 大硬音（雙子音）專頁**（`ㄲ, ㄸ, ㅃ, ㅆ, ㅉ` 緊喉硬音教學）
6. [x] **🧱 7 大代表收音（Batchim）專頁**（`ㅇ, ㅁ, ㄴ, ㄹ, ㅂ, ㄱ, ㄷ` 尾音規則與生活例詞）
7. [x] **🧩 3 層收音拼音積木屋**（初聲+中聲+終聲立體積木，支援 11,172 韓文字合成與發音對比）
8. [x] **☁️ Firebase 雲端自學單字庫**（支援學員新增單字並即時同步 Firestore）
9. [x] **⭐ 隨堂星級自我挑戰測驗**（隨堂測驗評量學習成效，純自我評量）
10. [x] **💖 即時集氣加油互動按鈕**（實時跳動累加）
11. [x] **📦 GitHub 託管與 GitHub Pages 自動部署上線**

---

## 🔮 5. 後續擴充建議 (Roadmap & Next Steps)

若接手的 Agent / 開發者需要進一步升級專案，可參考以下方向：

1. **語音發音評分 (Speech Recognition)**：
   - 引入 Web Speech Recognition API 讓使用者對著麥克風朗讀，進行發音準確度評分。
2. **單字庫分類篩選**：
   - 為單字增加標籤（例如：食物、問候、日常、旅遊），並支援分類篩選。
