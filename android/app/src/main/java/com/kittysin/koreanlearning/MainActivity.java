package com.kittysin.koreanlearning;

import android.os.Bundle;
import android.speech.tts.TextToSpeech;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;
import java.util.Locale;

public class MainActivity extends BridgeActivity {
    private TextToSpeech tts;
    private boolean ttsInitialized = false;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // 初始化 Android 系統原生 TextToSpeech (直連三星 TTS / Google TTS)
        tts = new TextToSpeech(this, status -> {
            if (status == TextToSpeech.SUCCESS) {
                int result = tts.setLanguage(Locale.KOREAN);
                if (result != TextToSpeech.LANG_MISSING_DATA && result != TextToSpeech.LANG_NOT_SUPPORTED) {
                    ttsInitialized = true;
                }
            }
        });

        // 注入 JavascriptInterface 到 WebView
        WebView webView = getBridge().getWebView();
        if (webView != null) {
            webView.addJavascriptInterface(new Object() {
                @JavascriptInterface
                public void speak(String text, float rate) {
                    if (tts != null && text != null && !text.isEmpty()) {
                        tts.setSpeechRate(rate <= 0 ? 1.0f : rate);
                        tts.speak(text, TextToSpeech.QUEUE_FLUSH, null, "KITTY_KOREAN_" + System.currentTimeMillis());
                    }
                }

                @JavascriptInterface
                public void stop() {
                    if (tts != null) {
                        tts.stop();
                    }
                }

                @JavascriptInterface
                public boolean isReady() {
                    return ttsInitialized;
                }
            }, "AndroidNativeTTS");
        }
    }

    @Override
    public void onDestroy() {
        if (tts != null) {
            tts.stop();
            tts.shutdown();
        }
        super.onDestroy();
    }
}
