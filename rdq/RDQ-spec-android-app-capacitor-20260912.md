---
title: "RDQ 需求規格卡：KITTY 韓語積木大冒險 Android App"
task_slug: "android-app-capacitor"
created_at: "2026-09-12 22:44 PT"
status: "confirmed"
revisions: 0
domain: "dev"
---

# 📱 RDQ 需求規格卡：KITTY 韓語積木大冒險 🌟 (Android App)

## 📌 一段式需求規格
將現有「KITTY 韓語發音積木樂園」Web 生態圈，透過 **Capacitor 現代架構** 封裝為 Android 原生 App（命名為 **《KITTY 韓語積木大冒險 🌟》**），採用「**雲端即時熱更新 + 本地 Service Worker 離線快取**」模式，實現**「一次安裝 APK、未來增詞改版 0 重複打包、0 Token 浪費」**；桌面圖標採用使用者提供的**拼豆 Baby Yoda** 進行精緻去背與柔和淺色馬卡龍漸層底色適配，並深度優化 Android 原生返回鍵與直屏單手操作體驗。

---

## 🎯 規格矩陣 (Specification Matrix)

| 維度 | 規格內容 | 備註 / 決策依據 |
| :--- | :--- | :--- |
| **App 名稱** | **KITTY 韓語積木大冒險 🌟** (KITTY Korean Adventure) | 活潑、充滿積木拼組與探索活力 |
| **Package ID** | com.kittysin.koreanlearning | 標準 Android 唯一識別碼 |
| **技術架構** | **Capacitor 6.x / Android WebView** | 支援原生物理返回鍵與全域硬體加速 |
| **同步模式** | **雲端 Live Server + Service Worker 離線快取** | 連線直通 GitHub Pages，斷網秒開 1.2 萬筆詞庫 |
| **桌面圖標 (Icon)** | **拼豆 Baby Yoda 精修去背 + 柔和馬卡龍漸層圓角** | 生成 Android Adaptive Icon (48x48 ~ 512x512) |
| **螢幕方向** | **鎖定直屏 (Portrait Only)** | 最適合單手滑動詞庫、點擊發音與單字卡翻卡 |
| **導航防護** | **Android 原生返回鍵智慧攔截** | 子頁面返回上一頁，主頁面「連按兩次退出」防誤觸 |
| **產出標的** | **1. 完整 Android 專案代碼**<br>**2. Debug 可安裝測試 APK 檔**<br>**3. GitHub Actions 自動編譯工作流 (可選)** | 手機下載即可直接安裝運行 |

---

## ❓ 假設清單 (Assumptions)
1. **TTS 語音**：優先使用 Android WebView 內建的 Google TTS 韓語發音引擎，與現有網頁端發音表現完全一致。
2. **啟動畫面 (Splash Screen)**：使用與桌面圖標一致的拼豆 Yoda 寶寶與粉彩漸層背景，展示 1 秒後平滑進入首頁。

---

## ❌ 排除項 (Out of Scope)
1. **React Native / Flutter 全量重寫**：排除，保留 100% 現有 Web 資產與毫秒級響應。
2. **每次增字重新打包 APK**：排除，採用雲端動態同步架構。

