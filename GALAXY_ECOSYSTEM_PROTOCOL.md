# 🌌 星際韓語宇宙三站聯邦：統一跨站 URL 深度串聯協議規範
# (Galaxy Korean Ecosystem URL Deep-Linking Protocol)

> **版本**：v1.0.0 (2026-09-23 PT)  
> **核心精神**：**零後端依賴、零資料庫耦合、純前端 URL 意圖驅動、優雅降級容錯、雙向平滑回跳。**  
> **適用站點**：🟢 **Yoda 發音語法積木** ✕ 🔵 **R2-D2 生活圖解百科** ✕ 🟠 **BB-8 觸控書寫樂園**

---

## 🪐 1. 三大站點角色定位與基礎網址

| 代號 | 角色圖標 | 站點名稱 | 核心職能 | 正式線上網址 |
|:---:|:---:|:---|:---|:---|
| **`yoda`** | 🟢 🧩 | **Yoda 韓語發音語法積木樂園** | 40音口訣、3層拼音積木屋、5,744 核心詞庫、6,520 漢字辭典、2,000 例句、SOV 造句列車、四大時態與敬語 | `https://kitty-sin.github.io/sanrio-korean-learning/` |
| **`r2d2`** | 🔵 🖼️ | **R2-D2 韓語生活圖解百科** | 生活實境百科、圖解情境辭典、圖像視覺記憶、主題式單字圖鑑 | `https://korean-learning-1ec2a.web.app/` |
| **`bb8`** | 🟠 ✍️ | **BB-8 韓語觸控書寫樂園** | 觸控筆順手寫、單字十字格、雙字格、4字田字格、15 格經典原稿紙 (원고지)、五方色光暈筆刷、作業簿匯出 | `https://korean-writing-1ec2a.web.app/` |

---

## 🔑 2. 核心 URL 關鍵詞參數字典 (Query Parameters)

所有跨站跳轉統一在網址後方使用標準 Query String 進行通訊。各站接收端根據這套統一命名進行解析：

### 📌 關鍵詞清單表

| 參數名稱 (Key) | 說明 | 適用情境與格式範例 |
|:---|:---|:---|
| **`word`** | **傳遞單一單字或詞彙** | `?word=사랑`、`?word=컴퓨터`、`?word=선생님`<br>（接收端：自動選取該詞、顯示筆順格、帶入字典檢索） |
| **`text`** | **傳遞完整句子或短文** | `?text=저는%20한국어를%20공부합니다`<br>（接收端：自動切換原稿紙模式、按方格排版、帶入造句機） |
| **`q`** | **通用搜尋關鍵字 (word 的別名備援)** | `?q=학교`<br>（當來源站不確定目標類型時，通用搜尋 fallback） |
| **`mode`** | **指定目標站的特定功能分頁／模式** | 詳見下方【各站 mode 關鍵詞枚舉】 |
| **`from`** | **標記發起跳轉的來源站點** | `from=yoda`、`from=r2d2`、`from=bb8`<br>（決定接收端頂部橫幅文案、以及雙向回跳目標） |
| **`ch`** | **章節編號 (適用例句/主題庫)** | `?ch=1` (日常問候 1-200)、`?ch=2` (家庭與朋友) |
| **`cat`** | **分類主題關鍵詞** | `?cat=food` (飲食)、`?cat=travel` (旅遊)、`?cat=hanja` (漢字詞) |

---

### 🎨 各站專屬 `mode` 關鍵詞標準枚舉

#### 1. 前往 🟠 BB-8 書寫樂園時：
- `mode=essay`：**強制切換至 15 格標準原稿紙寫作本**（適合整句造句、長句子臨摹）。
- `mode=practice`：**切換至單字練習簿**（依字數自動匹配 1 字十字格、2 字雙格、4 字田字格）。

#### 2. 前往 🟢 Yoda 積木樂園時：
- `mode=sentences`（或直連 `sanrio_korean_sentences.html`）：**前往造句積木列車**。
- `mode=dict`（或直連 `korean_vocab_dictionary.html`）：**前往 5,744 核心大字典**。
- `mode=hanja`（或直連 `korean_hanja_dictionary.html`）：**前往 6,520 漢字音變辭典**。
- `mode=core2000`（或直連 `korean_core2000_sentences.html`）：**前往 2,000 互動例句樂園**。
- `mode=builder`（或直連 `index.html?builder=강`）：**直接傳送單字進 3 層拼音積木屋**。

#### 3. 前往 🔵 R2-D2 生活圖解百科時：
- `mode=detail`：**直開該單字的生活實境圖解卡片**。
- `mode=gallery`：**依主題瀏覽圖解瀑布流畫廊**。

---

## 🚀 3. 典型跨站串聯場景與跳轉網址範例

### 場景 1：Yoda 造句列車 ➔ BB-8 原稿紙寫作本
- **需求**：學員在 Yoda 拼好了一句話，想在 15 格原稿紙上一筆一劃手寫臨摹。
- **標準網址**：
  ```
  https://korean-writing-1ec2a.web.app/?mode=essay&text=저는%20한국어를%20공부합니다&from=yoda
  ```
- **BB-8 接收效果**：
  1. 自動切換為「📜 標準原稿紙寫作本 (15格)」。
  2. 格子內自動填入淡墨底字（空格精確保留為空格格）。
  3. 頂部展開任務橫幅，提供 `[🔊 聽發音]`、`[👁️ 底字: 開/關]` 與 `[🧩 返回 Yoda 造句列車]`。

---

### 場景 2：Yoda 核心詞庫 ➔ BB-8 單字筆順臨摹格
- **需求**：學員在大字典查到生詞 `컴퓨터 (電腦)`，想練習筆畫。
- **標準網址**：
  ```
  https://korean-writing-1ec2a.web.app/?word=컴퓨터&from=yoda
  ```
- **BB-8 接收效果**：
  1. 自動切換為「🔲 單字筆順練習簿」。
  2. 依字數自動切換為 4 字田字格，並帶入底字。
  3. 提供 `[🧩 返回 Yoda 查例句語法]` 雙向回跳捷徑。

---

### 場景 3：BB-8 書寫樂園 ➔ Yoda 查深度語法與造句 (雙向回跳)
- **需求**：學員在 BB-8 練完字，想回 Yoda 查這個字在句子中怎麼接時態與敬語。
- **標準網址**：
  ```
  https://kitty-sin.github.io/sanrio-korean-learning/korean_vocab_dictionary.html?search=컴퓨터&from=bb8
  ```
- **Yoda 接收效果**：
  1. 大字典自動過濾並高亮 `컴퓨터` 單字卡。
  2. 單字卡上可直接拆解字母、發音、看例句。

---

### 場景 4：Yoda 核心詞庫 ➔ R2-D2 生活圖解百科
- **需求**：學員看到單字 `냉장고 (冰箱)`，想看真實生活場景圖解。
- **標準網址**：
  ```
  https://korean-learning-1ec2a.web.app/?word=냉장고&from=yoda
  ```
- **R2-D2 接收效果**：
  1. 自動定位到「家電/廚房」主題並彈出該單字的圖解卡片。
  2. 卡片下方附帶 `[✍️ 送去 BB-8 臨摹]` 與 `[🧩 回 Yoda 查語法]`。

---

### 場景 5：R2-D2 圖解百科 ➔ BB-8 觸控手寫
- **需求**：學員在 R2-D2 看完圖解，想立刻手寫記憶該單字。
- **標準網址**：
  ```
  https://korean-writing-1ec2a.web.app/?word=사과&from=r2d2
  ```

---

## 💻 4. 接收端標準處理模組 (JavaScript 參考實現)

在您的任何網頁專案中，只需將下方這段通用函式加入主邏輯（`DOMContentLoaded` 或 `useEffect`），即可實現全自動意圖解析與回跳：

```javascript
/**
 * 星際韓語宇宙通用 URL 意圖解析引擎 (Galaxy Intent Receiver)
 */
function handleGalaxyIntent() {
  try {
    const params = new URLSearchParams(window.location.search);
    const word = params.get('word') || params.get('q');
    const text = params.get('text');
    const mode = params.get('mode');
    const from = params.get('from'); // 'yoda' | 'r2d2' | 'bb8'

    if (!word && !text && !mode) return; // 無參數時正常預設載入

    // 1. 來源歡迎浮動提示 (Toast)
    const sourceNames = {
      yoda: '🌿 Yoda 韓語發音積木樂園',
      r2d2: '🤖 R2-D2 韓語生活圖解百科',
      bb8: '✍️ BB-8 韓語觸控書寫樂園'
    };
    if (from && sourceNames[from]) {
      showToast(`已為您載入來自【${sourceNames[from]}】的學習任務！`);
    }

    // 2. 句子 / 文章臨摹處理 (優先級最高)
    if (text || mode === 'essay') {
      const sentence = decodeURIComponent(text || '').trim();
      onReceiveSentence(sentence, from);
      return;
    }

    // 3. 單一單字處理
    if (word) {
      const decodedWord = decodeURIComponent(word).trim();
      onReceiveWord(decodedWord, from);
    }
  } catch (err) {
    console.warn('Galaxy URL intent parse warning:', err);
  }
}

// 範例：收到句子時的處理
function onReceiveSentence(sentence, from) {
  console.log('載入句子臨摹:', sentence);
  // 1. 切換原稿紙模式
  // 2. 填入底字導引
  // 3. 顯示頂部返回按鈕：返回來源站 (yoda / r2d2)
}

// 範例：收到單字時的處理
function onReceiveWord(word, from) {
  console.log('載入單字:', word);
  // 1. 判斷長度切換格子或搜尋大字典
  // 2. 顯示相關資訊
}
```

---

## 🎨 5. 頂部三站聯邦角色膠囊 (Galaxy Ecosystem Dock)

三大站點的網頁頂部統一放置這組精緻小巧的角色膠囊，讓學員無論在何時都能新分頁一秒穿梭：

### HTML 結構 (可直接複製使用)

```html
<!-- 星際韓語宇宙跨站導航膠囊 (Galaxy Ecosystem Dock) -->
<div class="galaxy-ecosystem-dock">
  <!-- Yoda 發音語法積木 -->
  <a href="https://kitty-sin.github.io/sanrio-korean-learning/" 
     target="_blank" rel="noopener noreferrer"
     class="galaxy-chip chip-yoda active" title="前往 Yoda 韓語發音語法積木樂園">
    <span class="chip-avatar">🟢</span>
    <span class="chip-label">🧩 Yoda積木</span>
  </a>

  <!-- R2-D2 生活圖解百科 -->
  <a href="https://korean-learning-1ec2a.web.app/" 
     target="_blank" rel="noopener noreferrer"
     class="galaxy-chip chip-r2d2" title="前往 R2-D2 韓語生活圖解百科">
    <span class="chip-avatar">🔵</span>
    <span class="chip-label">🖼️ 圖解百科</span>
  </a>

  <!-- BB-8 觸控手寫樂園 -->
  <a href="https://korean-writing-1ec2a.web.app/" 
     target="_blank" rel="noopener noreferrer"
     class="galaxy-chip chip-bb8" title="前往 BB-8 韓語觸控書寫樂園">
    <span class="chip-avatar">🟠</span>
    <span class="chip-label">✍️ 觸控手寫</span>
  </a>
</div>
```

### CSS 配套樣式 (淺色主題 + 馬卡龍色票)

```css
.galaxy-ecosystem-dock {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.9);
  padding: 4px 6px;
  border-radius: 9999px;
  border: 1px solid rgba(226, 232, 240, 0.9);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.galaxy-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 800;
  text-decoration: none;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  border: 1px solid transparent;
}

/* Yoda 綠意/草莓粉 */
.galaxy-chip.chip-yoda {
  background: #FDF2F8;
  color: #9D174D;
  border-color: #FBCFE8;
}
.galaxy-chip.chip-yoda.active {
  background: #BE185D;
  color: #FFFFFF;
}

/* R2-D2 晴空藍 */
.galaxy-chip.chip-r2d2 {
  background: #F0F9FF;
  color: #0369A1;
  border-color: #BAE6FD;
}
.galaxy-chip.chip-r2d2.active {
  background: #0284C7;
  color: #FFFFFF;
}

/* BB-8 活力暖杏橘 */
.galaxy-chip.chip-bb8 {
  background: #FFF7ED;
  color: #C2410C;
  border-color: #FDBA74;
}
.galaxy-chip.chip-bb8.active {
  background: #EA580C;
  color: #FFFFFF;
}

.galaxy-chip:hover {
  transform: translateY(-1px) scale(1.04);
  box-shadow: 0 3px 6px rgba(0,0,0,0.08);
}
```

---

## 🛡️ 6. 安全、編碼與多端兼容規範

1. **強制 URL 編碼**：所有傳遞之韓文字元或中文，發起端**必須使用 `encodeURIComponent()`**，避免因空格、換行或標點符號造成網址斷裂。
   - 正確：`?text=${encodeURIComponent(sentence)}`
2. **新分頁開啟**：跨站跳轉一律加上 `target="_blank" rel="noopener noreferrer"`，保留學員原本的頁面進度，杜絕操作中斷。
3. **優雅降級**：接收端若收到無法識別的詞彙或參數，**絕不拋錯**，一律降級為「正常預設首頁」，保證網站 100% 穩定。
4. **繁體中文標準**：全生態圈所有介面、引導與提示字串一律嚴格遵循 **臺灣正體（OpenCC `s2twp`）**。

---

*本文件為星際韓語宇宙全生態圈唯一指定跨站協議。所有網頁工程與維護工作均請嚴格對齊本規範。*
