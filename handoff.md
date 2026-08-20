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
  1. `korean_custom_words`：
     - 欄位：`kr (string)`, `sound (string)`, `meaning (string)`, `createdAt (timestamp)`
     - 查詢方式：`orderBy('createdAt', 'desc').limit(50)`
- **容錯設計**：具備本機離線 Fallback 機制，當 Firebase 離線或無網路時，會自動切換為本地模式運行，介面右上角具備連線狀態燈號。

---

## 🧮 3. 韓語拼音演算法 (Hangul Syllable Formula)

在「🧩 拼音積木屋」中，韓文字母組合係根據 Unicode 韓文拼音規範計算：
```javascript
const combineSyllable = (c, v) => {
    const cMap = { 'ㄱ': 0, 'ㄴ': 2, 'ㄷ': 3, 'ㅁ': 6, 'ㅇ': 11 };
    const vMap = { 'ㅏ': 0, 'ㅓ': 4, 'ㅗ': 8, 'ㅜ': 13, 'ㅡ': 18, 'ㅣ': 20 };
    const cIdx = cMap[c] !== undefined ? cMap[c] : 11;
    const vIdx = vMap[v] !== undefined ? vMap[v] : 0;
    
    // Unicode 韓文字母計算公式：44032 + (子音索引 * 588) + (母音索引 * 28)
    const code = 44032 + (cIdx * 588) + (vIdx * 28);
    return String.fromCharCode(code);
};
```

---

## ✅ 4. 已完成功能清單 (Completed Features)

1. [x] **🐱 6 大基礎母音教學**（Hello Kitty `ㅏ`、布甸狗 `ㅓ`、美樂蒂 `ㅗ`、玉桂狗 `ㅜ`、Kuromi `ㅡ`、雙子星 `ㅣ`，支援海報大圖預覽）
2. [x] **🐶 基礎子音積木**（`ㅇ`, `ㄱ`, `ㄴ`, `ㄷ`, `ㅁ`）
3. [x] **🧩 拼音積木屋**（聲母韻母任意切換、實時拼出韓文字並發音）
4. [x] **☁️ Firebase 雲端自學單字庫（獨立分頁）**（支援即時搜尋、卡片語音朗讀、學員新增單字並即時同步）
5. [x] **⭐ Sanrio 星級挑戰測驗**（5 題隨堂測驗評量學習成效）
6. [x] **📦 GitHub 託管與 GitHub Pages 自動部署上線**

---

## 🔮 5. 後續擴充建議 (Roadmap & Next Steps)

若接手的 Agent / 開發者需要進一步升級專案，可參考以下方向：

1. **擴充雙母音與雙子音**：
   - 擴充母音：`ㅐ`, `ㅔ`, `ㅘ`, `ㅙ`, `ㅚ`, `ㅝ`, `ㅞ`, `ㅟ`, `ㅢ`
   - 擴充硬音/激音子音：`ㅋ`, `ㅌ`, `ㅍ`, `ㅎ`, `ㄲ`, `ㄸ`, `ㅃ`, `ㅆ`, `ㅉ`
2. **支援尾音 / 收音 (받침 Batchim)**：
   - 升級拼音算式支援三層積木（初聲 + 中聲 + 終聲/尾音）：`44032 + (初聲 * 588) + (中聲 * 28) + 終聲`。
3. **語音發音評分 (Speech Recognition)**：
   - 引入 Web Speech Recognition API 讓使用者對著麥克風朗讀，進行發音準確度評分。
4. **單字庫分類篩選**：
   - 為單字增加標籤（例如：食物、問候、日常、旅遊），並支援分類篩選。
