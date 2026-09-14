// KITTY 韓語積木大冒險 - Mobile & Android 原生橋接與返回鍵防護 + 終極發音引擎
(function() {
  // 1. 自動註冊並即時更新 Service Worker 與快取自動重整
  if ('serviceWorker' in navigator) {
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', function() {
      if (!refreshing) {
        refreshing = true;
        window.location.reload();
      }
    });

    window.addEventListener('load', function() {
      navigator.serviceWorker.register('./sw.js').then(function(reg) {
        reg.update();
        if (reg.waiting) {
          reg.waiting.postMessage({ action: 'skipWaiting' });
        }
      }).catch(function(err) {
        console.log('Service Worker 註冊略過:', err);
      });
    });
  }

  // 2. 終極韓語發音引擎 (專為 Samsung One UI / Android WebView / iOS 設計)
  window.KittyVoice = {
    unlocked: false,
    unlock: function() {
      if (this.unlocked) return;
      this.unlocked = true;
      try {
        const dummy = new Audio();
        dummy.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';
        dummy.play().catch(() => {});
      } catch(e) {}
    },
    
    speak: function(text, rate, onEnd) {
      if (!text) {
        if (onEnd) onEnd();
        return;
      }
      this.unlock();
      const speechRate = rate || 1.0;

      // 🦥 0.3x 極慢逐字口型朗讀：自動拆解獨立音節 + 380ms 清晰間隔 + 標準音高
      if (speechRate <= 0.35) {
        this.speakSyllables(text, onEnd);
        return;
      }

      this.speakSingle(text, speechRate, onEnd);
    },

    // 逐字音節朗讀核心
    speakSyllables: async function(text, onEnd) {
      const raw = text.split(/[\(\/]/)[0].trim();
      const chars = Array.from(raw).filter(ch => ch.trim().length > 0 && /[\uac00-\ud7a3\u1100-\u11ff\u3130-\u318f]/.test(ch));
      const targetChars = chars.length > 0 ? chars : Array.from(text.trim()).filter(ch => ch.trim().length > 0);
      if (targetChars.length === 0) {
        if (onEnd) onEnd();
        return;
      }
      for (let i = 0; i < targetChars.length; i++) {
        const char = targetChars[i];
        await new Promise((resolve) => {
          this.speakSingle(char, 0.9, resolve);
        });
        if (i < targetChars.length - 1) {
          await new Promise(r => setTimeout(r, 380));
        }
      }
      if (onEnd) onEnd();
    },

    // 單音節 / 單詞發音核心
    speakSingle: function(text, rate, onEnd) {
      if (!text) {
        if (onEnd) onEnd();
        return;
      }
      const speechRate = rate || 1.0;
      
      // 0. 最高優先級：若處於 Android 原生 App 內，直調系統底層 TextToSpeech (Samsung/Google 原生引擎)
      if (window.AndroidNativeTTS && typeof window.AndroidNativeTTS.speak === 'function') {
        try {
          window.AndroidNativeTTS.speak(text, speechRate);
          if (onEnd) {
            const estTime = Math.max(450, (text.length * 350) / speechRate);
            setTimeout(onEnd, estTime);
          }
          return;
        } catch(e) {
          console.warn('AndroidNativeTTS invocation failed, trying fallback:', e);
        }
      }

      // 1. 檢查瀏覽器 Web Speech 是否有韓語語音包
      let hasKoreanVoice = false;
      if (window.speechSynthesis) {
        const voices = window.speechSynthesis.getVoices();
        hasKoreanVoice = voices.some(v => v.lang && (v.lang.toLowerCase().startsWith('ko') || v.lang.toLowerCase().includes('korean')));
      }
      
      // 若系統明確裝有韓語語音包
      if (hasKoreanVoice && window.speechSynthesis) {
        try {
          window.speechSynthesis.resume();
          window.speechSynthesis.cancel();
          const utter = new SpeechSynthesisUtterance(text);
          utter.lang = 'ko-KR';
          utter.rate = speechRate;
          utter.pitch = 1.05;
          let finished = false;
          utter.onend = () => {
            if (!finished) {
              finished = true;
              if (onEnd) onEnd();
            }
          };
          utter.onerror = () => {
            if (!finished) {
              finished = true;
              this.playCloud(text, speechRate, onEnd);
            }
          };
          window.speechSynthesis.speak(utter);
          
          // 保護定時器：如果 450ms 內沒在播放且未完成，自動換雲端發音
          setTimeout(() => {
            if (!window.speechSynthesis.speaking && !finished) {
              finished = true;
              this.playCloud(text, speechRate, onEnd);
            }
          }, 450);
          return;
        } catch(e) {
          console.warn('WebSpeech error, fallback:', e);
        }
      }
      
      // 2. 極速真人雲端發音 (Samsung S26 / S24 / WebView 100% 響亮)
      this.playCloud(text, speechRate, onEnd);
    },
    
    playCloud: function(text, rate, onEnd) {
      try {
        const clean = encodeURIComponent(text.trim());
        const googleUrl = 'https://translate.google.com/translate_tts?ie=UTF-8&tl=ko&client=tw-ob&q=' + clean;
        const audio = new Audio(googleUrl);
        // HTML5 Audio playbackRate 限制安全範圍 (0.75 ~ 1.25)，防止底層解碼器崩潰
        const safeRate = Math.max(0.75, Math.min(1.25, rate || 1.0));
        audio.playbackRate = safeRate;
        let ended = false;
        const triggerEnd = () => {
          if (!ended) {
            ended = true;
            if (onEnd) onEnd();
          }
        };
        audio.onended = triggerEnd;
        audio.onerror = () => {
          // 二級備援：Baidu TTS 韓語頻道
          try {
            const baiduUrl = 'https://tts.baidu.com/text2audio?tex=' + clean + '&cuid=baike&lan=kor&ctp=1&pdt=301&vol=9&rate=32';
            const audio2 = new Audio(baiduUrl);
            audio2.playbackRate = safeRate;
            audio2.onended = triggerEnd;
            audio2.onerror = triggerEnd;
            audio2.play().catch(triggerEnd);
          } catch(e) {
            triggerEnd();
          }
        };
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.warn('Audio play blocked or error, trying fallback:', err);
            if (audio.onerror) audio.onerror();
          });
        }
      } catch(err) {
        if (onEnd) onEnd();
      }
    }
  };

  // 第一次手勢解鎖
  document.addEventListener('touchstart', () => window.KittyVoice.unlock(), { once: true, passive: true });
  document.addEventListener('click', () => window.KittyVoice.unlock(), { once: true, passive: true });

  // 3. Android 原生返回鍵智慧處理
  let lastBackPressTime = 0;
  function showToast(msg) {
    let toast = document.getElementById('kitty-back-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'kitty-back-toast';
      toast.className = 'fixed bottom-12 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-2xl backdrop-blur-md z-[9999] transition-all duration-300 pointer-events-none opacity-0 translate-y-4';
      document.body.appendChild(toast);
    }
    toast.innerText = msg;
    toast.classList.remove('opacity-0', 'translate-y-4');
    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-4');
    }, 2000);
  }

  // 若載入 Capacitor 原生環境
  if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App) {
    const App = window.Capacitor.Plugins.App;
    App.addListener('backButton', function(data) {
      const isRootPage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/') || window.location.pathname === '';
      
      if (!isRootPage) {
        window.location.href = 'index.html';
      } else {
        const now = Date.now();
        if (now - lastBackPressTime < 2000) {
          App.exitApp();
        } else {
          lastBackPressTime = now;
          showToast('🌟 再按一次返回鍵退出樂園');
        }
      }
    });
  }
})();
