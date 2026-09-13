// KITTY 韓語積木大冒險 - Mobile & Android 原生橋接與返回鍵防護
(function() {
  // 1. 自動註冊並即時更新 Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('./sw.js').then(function(reg) {
        reg.update(); // 每次開啟 App 強制向雲端檢查是否有最新版本
      }).catch(function(err) {
        console.log('Service Worker 註冊略過:', err);
      });
    });
  }

  // 2. Android 原生返回鍵智慧處理
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
        // 如果在子頁面（例如漢字字典、詞庫字典），按返回鍵回到主站
        window.location.href = 'index.html';
      } else {
        // 如果在主頁，雙擊退出防護
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
