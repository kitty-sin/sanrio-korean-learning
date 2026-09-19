# 📋 Handoff: KITTY 韓語發音積木樂園 (KITTY Korean Learning Playground)

本文件為跨電腦／跨 Agent 工作交接核心文件。

---

## ⏯️ 目前做到哪

1. **🍔 自訂詞庫擴充**：
   - 新增外來語名詞 `#5694 패스트푸드 (速食、快餐、Fast Food)` 與 `#5695 패스트 (快速、Fast（外來語借詞，如 패스트 패션 快時尚、패스트 트랙 快速通道） / Fast)` 至 Kitty 自訂詞庫與核心大字典。
   - 全量同步 `korean_vocab_kitty_add_data.js`、`korean_vocab_kitty_add.csv`、`korean_vocab_kitty_add.md`，Kitty 自訂庫累計達 **29 筆**，全庫總量達到 **5,695 筆**；並同步重構漢字辭典資料集 `korean_hanja_data.js/csv/md`。
2. **🚂 韓語造句發音積木列車全功能進化** (`sanrio_korean_sentences.html` + `korean_sentence_data.js`)：
   - **單一萬能輸入框**：整合中/韓/英/粵語拼音智慧即時解析，支援繁簡雙向、電腦端與手機端完整自適應、Enter 鍵即時確認。
   - **2 排自適應車卡排版**：第一行（車頭 🐧 + 車卡1 主語 + 車卡2 地點）、第二行（車卡3 受語 + 車卡4 動詞），解決手機與平板空間擠壓問題。
   - **語法助詞與時態語尾螢光筆透視高亮 (Grammar Highlight)**：全量上線！將主語/主題助詞（`은/는/이/가`）、場所助詞（`에서`）、受格助詞（`을/를`）與語幹變形/語尾/時態標誌（`ㅂ니다/습니다`、`아/어요`、`았/었`、`ㄹ 거예요`、`고 있어요` 等）以溫潤奶黃螢光底色標註，羅馬拼音同步高亮對應。
   - **螢光筆開關控制**：時態標籤列支援「`🎨 語法螢光筆 [✨ 開啟中 / 關閉]`」一鍵切換模式。
   - **語音與複製純淨度**：朗讀與複製功能保持 100% 純文字，不受 HTML 標籤干擾。
3. **📱 離線快取升級**：`sw.js` 與 `www/sw.js` 升級至快取版本 `kitty-korean-v1.0.37`，全站程式碼已推播至 GitHub Pages。

---

## 🚦 目前狀態

- **運行狀態**：全功能正常運作，無報錯，可直接於瀏覽器與 Capacitor 移動端離線體驗。
- **線上體驗 (GitHub Pages)**：[https://kitty-sin.github.io/sanrio-korean-learning/korean_vocab_dictionary.html](https://kitty-sin.github.io/sanrio-korean-learning/korean_vocab_dictionary.html)
- **最新 Git Commit**：`da92d7e` (`feat(vocab): add entry #5695 패스트`)

---

## ➡️ 下一步

1. 依使用者後續反饋擴充更多常用韓語造句動詞、形容詞與主題句庫。
2. 評估是否將造句列車測驗模式（Quiz）亦加入語法高亮透視解析反饋。
3. 支援更多外來語或生活常用語法句型（如「想做 ~고 싶다」、「請做 ~아/어 주세요」等）。

---

## ⚠️ 注意事項

- 本專案所有發音 API 使用 Web Speech API (`ko-KR`)，輸入句子時會自動剝離 HTML 與標點確保發音正確。
- 修改 `korean_sentence_data.js` 或 `sanrio_korean_sentences.html` 後，必須同步複製至 `www/` 並升級 `sw.js` 快取版本。

---

## 🕐 最後更新

- **時間**：2026-09-19 12:33 PT
- **更新者**：Antigravity @ DESKTOP-QROANQ2
- **Git Push 狀態**：✅ 已推 (`main` 分支)
