---
rdq_version: 1
task: KITTY 韓語名曲歌詞練唱樂園全新頁面建置
domain: dev
date: 2026-09-16
status: confirmed
telemetry:
  mode: full
  rounds: 1
  questions: 2
  q4_adopted: 2
  revisions: 0
downstream: self
---

# 🎵 RDQ 需求規格：KITTY 韓語名曲歌詞練唱樂園 (KITTY Korean Song Lyrics Playground)

## 一句話任務
全新打造 **`sanrio_korean_songs.html`（🎵 KITTY 韓語名曲歌詞練唱樂園）**，以「一首歌一個獨立分頁」架構呈現韓語經典名曲歌詞，並深度整合 KittyVoice 逐行語音朗讀、羅馬拼音、粵語諧音口訣、繁體中文翻譯與跨庫生詞即時點擊拆解。

---

## 📌 核心架構與功能亮點

### 1. 頁面名稱與檔案規範
- **正式名稱**：🎵 KITTY 韓語名曲歌詞練唱樂園 (KITTY Korean Song Lyrics Playground)
- **檔案名稱**：[`sanrio_korean_songs.html`](file:///c:/Users/PC/Documents/Google-Antigravity/2026-Miscellaneous/Korean-Learning/sanrio_korean_songs.html)
- **視覺基調**：明亮溫馨 Sanrio 馬卡龍/奶油暖杏淺色風格（Light Mode 第一優先），融入萌趣音樂元素（音符、麥克風、耳機與角色標籤）。

### 2. 歌曲多分頁切換體系 (Tab Switching Engine)
- **獨立分頁**：每首韓文歌曲擁有專屬分頁（支援頂部萌趣藥丸標籤列 / 卡片選歌器快速切換）。
- **歌曲資訊卡**：每首歌展示歌曲韓文名、中文譯名、歌手/出處、風格標籤、學習難度星級與經典介紹。

### 3. 歌詞多層對照與互動展示 (Multi-layer Lyrics View)
- 每句歌詞提供結構化四層對照：
  1. **韓文原詞**：清晰大字排版（支援點擊單音節或單字跳轉積木屋/詞典）。
  2. **標準羅馬拼音**：Revised Romanization 標準拼音。
  3. **粵語諧音口訣**：符合廣東話發音習慣的生動諧音口訣。
  4. **繁體中文翻譯**：道地流暢的中文歌詞對照。

### 4. 🔊 全域發音引擎直連 (KittyVoice Integration)
- **整曲逐行朗讀**：支援整首歌循序播放，當前朗讀行自動高亮並平滑滾動至視線中央。
- **逐行單句播放**：每行歌詞具備獨立播放按鈕，支援 `0.85x`（自然跟唱速度）與 `0.3x`（逐字慢速口型，KittyVoice 逐音節飽滿分解）。

### 5. 🔗 全生態圈無縫互聯 (Ecosystem Connectivity)
- **導航整合**：主站 `index.html`、詞庫大字典 `korean_vocab_dictionary.html`、漢字大辭典 `korean_hanja_dictionary.html` 與美食手札 `sanrio_korean_food_100.html` 全面新增「🎵 韓語歌曲」快捷導航入口。
- **生詞跳轉**：歌詞中的重點單字支援一鍵跳轉至【韓語核心詞庫大字典】或【積木屋】即時拼組拆解。
- **離線快取**：升級 Service Worker 快取列表至最新版本，支援離線學習。

---

## ✔ 驗收條件 (Acceptance Criteria)
- [ ] 成功建立 `sanrio_korean_songs.html`，具備流暢的多歌曲分頁切換體系。
- [ ] 歌詞呈現韓文原詞、羅馬拼音、粵語口訣、繁體中文翻譯完整對照。
- [ ] 逐行發音按鈕與 0.85x / 0.3x 語速正常運作，無縫接入 KittyVoice。
- [ ] 全站頂部導航列全面連動新增「🎵 韓語歌曲」按鈕。
- [ ] 支援手機 Android App / iOS / 桌面瀏覽器 RWD 自適應與離線快取。
