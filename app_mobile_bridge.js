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
    
    speak: function(text, rateOrOptions, onEndCallback) {
      if (!text) {
        if (typeof rateOrOptions === 'function') rateOrOptions();
        if (typeof onEndCallback === 'function') onEndCallback();
        return;
      }
      this.unlock();

      let speechRate = 1.0;
      let onEnd = null;

      if (typeof rateOrOptions === 'object' && rateOrOptions !== null) {
        speechRate = typeof rateOrOptions.rate === 'number' ? rateOrOptions.rate : 1.0;
        onEnd = rateOrOptions.onEnd || rateOrOptions.onComplete || null;
      } else if (typeof rateOrOptions === 'number') {
        speechRate = rateOrOptions;
        onEnd = onEndCallback;
      } else if (typeof rateOrOptions === 'function') {
        onEnd = rateOrOptions;
      }

      // 🦥 0.3x 極慢逐字口型朗讀：自動拆解獨立音節 + 380ms 清晰間隔 + 標準音高
      if (speechRate <= 0.35) {
        this.speakSyllables(text, onEnd);
        return;
      }

      this.speakSingle(text, speechRate, onEnd);
    },

    // 逐字音節朗讀核心 (0.3x 極慢逐字口型)
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
          this.speakSingle(char, 0.65, resolve);
        });
        if (i < targetChars.length - 1) {
          await new Promise(r => setTimeout(r, 450));
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
      const speechRate = typeof rate === 'number' ? rate : 1.0;
      
      // 0. 最高優先級：若處於 Android 原生 App 內，直調系統底層 TextToSpeech (Samsung/Google 原生引擎)
      if (window.AndroidNativeTTS && typeof window.AndroidNativeTTS.speak === 'function') {
        try {
          window.AndroidNativeTTS.speak(text, speechRate);
          if (onEnd) {
            const estTime = Math.max(500, (text.length * 400) / speechRate);
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
          utter.rate = Math.max(0.4, Math.min(1.5, speechRate));
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
        // HTML5 Audio playbackRate 支援 0.4x ~ 1.5x 真實放慢與加速
        const safeRate = Math.max(0.4, Math.min(1.5, typeof rate === 'number' ? rate : 1.0));
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

  // 4. 終極語音辨識與跟讀評分引擎 (KittySTT: 支援 AndroidNativeSTT 原生極速辨識 + 瀏覽器 Web Speech 雙軌)
  window.KittySTT = {
    recognizer: null,
    isListening: false,
    
    start: function(options) {
      const opts = options || {};
      const targetWord = opts.targetWord || '';
      const onStart = opts.onStart || function() {};
      const onResult = opts.onResult || function() {};
      const onError = opts.onError || function() {};
      const onEnd = opts.onEnd || function() {};

      this.stop();

      // 優先級 1：若在 Android 原生 App 內，調用系統級 SpeechRecognizer (直連 Google/Samsung 原生語音引擎)
      if (window.AndroidNativeSTT && typeof window.AndroidNativeSTT.startListening === 'function') {
        window.onAndroidSpeechStart = () => {
          this.isListening = true;
          onStart();
        };
        window.onAndroidSpeechResult = (text) => {
          this.isListening = false;
          onResult(text);
        };
        window.onAndroidSpeechError = (errMsg) => {
          this.isListening = false;
          onError(errMsg);
        };
        window.onAndroidSpeechEnd = () => {
          this.isListening = false;
          onEnd();
        };
        try {
          this.isListening = true;
          window.AndroidNativeSTT.startListening(targetWord);
          return true;
        } catch(e) {
          console.warn('AndroidNativeSTT startListening failed, trying fallback:', e);
        }
      }

      // 優先級 2：瀏覽器環境 Web Speech API (Chrome / Edge / Safari)
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        this.isListening = false;
        onError('您的瀏覽器不支援 Web Speech 麥克風語音辨識，建議使用 Chrome 瀏覽器！');
        onEnd();
        return false;
      }

      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'ko-KR';
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
          this.isListening = true;
          onStart();
        };

        recognition.onresult = (event) => {
          this.isListening = false;
          const transcript = (event.results && event.results[0] && event.results[0][0]) ? event.results[0][0].transcript : '';
          onResult(transcript);
        };

        recognition.onerror = (event) => {
          this.isListening = false;
          console.warn("Speech Error:", event.error);
          let msg = '未能辨識到聲音，請靠近麥克風再試一次！';
          if (event.error === 'not-allowed') {
            msg = '麥克風權限已被拒絕，請在瀏覽器設定中允許使用麥克風！';
          } else if (event.error === 'network') {
            msg = '網絡連線異常，語音服務無法連線，請檢查網絡！';
          }
          onError(msg);
        };

        recognition.onend = () => {
          this.isListening = false;
          onEnd();
        };

        this.recognizer = recognition;
        this.isListening = true;
        recognition.start();
        return true;
      } catch (err) {
        this.isListening = false;
        console.error("Speech Init Error:", err);
        onError('語音辨識啟動失敗，請稍後再試！');
        onEnd();
        return false;
      }
    },

    stop: function() {
      this.isListening = false;
      if (window.AndroidNativeSTT && typeof window.AndroidNativeSTT.stopListening === 'function') {
        try {
          window.AndroidNativeSTT.stopListening();
        } catch(e) {}
      }
      if (this.recognizer) {
        try {
          this.recognizer.stop();
        } catch(e) {}
        this.recognizer = null;
      }
    }
  };

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
