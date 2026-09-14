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
      
      // 0. 最高優先級：若處於 Android 原生 App 內，直調系統底層 TextToSpeech (Samsung/Google 原生引擎)
      if (window.AndroidNativeTTS && typeof window.AndroidNativeTTS.speak === 'function') {
        try {
          window.AndroidNativeTTS.speak(text, speechRate);
          if (onEnd) {
            const estTime = Math.max(500, (text.length * 320) / speechRate);
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
      
      // 若系統明確裝有韓語語音包且不是極慢速
      if (hasKoreanVoice && window.speechSynthesis && speechRate > 0.35) {
        try {
          window.speechSynthesis.resume();
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
          
          // 保護定時器：如果 400ms 內沒在播放且未完成，自動換雲端發音
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
      
      // 直接使用極速真人雲端發音 (Samsung S26 / S24 / WebView 100% 響亮)
      this.playCloud(text, speechRate, onEnd);
    },
    
    playCloud: function(text, rate, onEnd) {
      try {
        const clean = encodeURIComponent(text.trim());
        const googleUrl = 'https://translate.google.com/translate_tts?ie=UTF-8&tl=ko&client=tw-ob&q=' + clean;
        const audio = new Audio(googleUrl);
        audio.playbackRate = rate || 1.0;
        audio.onended = () => { if (onEnd) onEnd(); };
        audio.onerror = () => {
          // 二級備援：Baidu TTS 韓語頻道
          const baiduUrl = 'https://tts.baidu.com/text2audio?tex=' + clean + '&cuid=baike&lan=kor&ctp=1&pdt=301&vol=9&rate=32';
          const audio2 = new Audio(baiduUrl);
          audio2.playbackRate = rate || 1.0;
          audio2.onended = () => { if (onEnd) onEnd(); };
          audio2.onerror = () => { if (onEnd) onEnd(); };
          audio2.play().catch(() => { if (onEnd) onEnd(); });
        };
        audio.play().catch(err => {
          console.warn('Audio play blocked, retry unlock:', err);
          if (onEnd) onEnd();
        });
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
