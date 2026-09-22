package com.kittysin.koreanlearning;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.speech.RecognitionListener;
import android.speech.RecognizerIntent;
import android.speech.SpeechRecognizer;
import android.speech.tts.TextToSpeech;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import com.getcapacitor.BridgeActivity;
import java.util.ArrayList;
import java.util.Locale;

public class MainActivity extends BridgeActivity {
    private static final int PERMISSION_REQUEST_RECORD_AUDIO = 2001;
    private TextToSpeech tts;
    private boolean ttsInitialized = false;
    private SpeechRecognizer speechRecognizer;
    private boolean isListening = false;

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

        // 初始化語音辨識器
        initSpeechRecognizer();

        // 注入 JavascriptInterface 到 WebView
        WebView webView = getBridge().getWebView();
        if (webView != null) {
            // 原生 TTS 語音發音橋接
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

            // 原生 STT 語音辨識橋接 (支援韓語跟讀與發音評分)
            webView.addJavascriptInterface(new Object() {
                @JavascriptInterface
                public void startListening(String targetWord) {
                    runOnUiThread(() -> {
                        if (ContextCompat.checkSelfPermission(MainActivity.this, Manifest.permission.RECORD_AUDIO)
                                != PackageManager.PERMISSION_GRANTED) {
                            ActivityCompat.requestPermissions(MainActivity.this,
                                    new String[]{Manifest.permission.RECORD_AUDIO},
                                    PERMISSION_REQUEST_RECORD_AUDIO);
                        } else {
                            startSpeechRecognitionInternal();
                        }
                    });
                }

                @JavascriptInterface
                public void stopListening() {
                    runOnUiThread(() -> stopSpeechRecognitionInternal());
                }

                @JavascriptInterface
                public boolean isAvailable() {
                    return SpeechRecognizer.isRecognitionAvailable(MainActivity.this);
                }
            }, "AndroidNativeSTT");
        }
    }

    private void initSpeechRecognizer() {
        runOnUiThread(() -> {
            if (speechRecognizer != null) {
                try {
                    speechRecognizer.destroy();
                } catch (Exception ignored) {}
                speechRecognizer = null;
            }

            if (SpeechRecognizer.isRecognitionAvailable(this)) {
                speechRecognizer = SpeechRecognizer.createSpeechRecognizer(this);
                speechRecognizer.setRecognitionListener(new RecognitionListener() {
                    @Override
                    public void onReadyForSpeech(Bundle params) {
                        notifyWeb("window.onAndroidSpeechStart && window.onAndroidSpeechStart();");
                    }

                    @Override
                    public void onBeginningOfSpeech() {}

                    @Override
                    public void onRmsChanged(float rmsdB) {}

                    @Override
                    public void onBufferReceived(byte[] buffer) {}

                    @Override
                    public void onEndOfSpeech() {
                        isListening = false;
                        notifyWeb("window.onAndroidSpeechEnd && window.onAndroidSpeechEnd();");
                    }

                    @Override
                    public void onError(int error) {
                        isListening = false;
                        String errorMsg = getSpeechErrorMsg(error);
                        notifyWeb("window.onAndroidSpeechError && window.onAndroidSpeechError('" + escapeJs(errorMsg) + "');");
                    }

                    @Override
                    public void onResults(Bundle results) {
                        isListening = false;
                        ArrayList<String> matches = results.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
                        String text = (matches != null && !matches.isEmpty()) ? matches.get(0) : "";
                        notifyWeb("window.onAndroidSpeechResult && window.onAndroidSpeechResult('" + escapeJs(text) + "');");
                    }

                    @Override
                    public void onPartialResults(Bundle partialResults) {}

                    @Override
                    public void onEvent(int eventType, Bundle params) {}
                });
            }
        });
    }

    private void startSpeechRecognitionInternal() {
        if (speechRecognizer == null) {
            initSpeechRecognizer();
        }
        if (speechRecognizer == null) {
            notifyWeb("window.onAndroidSpeechError && window.onAndroidSpeechError('裝置不支援語音辨識服務');");
            return;
        }

        try {
            Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
            intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
            intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, "ko-KR");
            intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_PREFERENCE, "ko-KR");
            intent.putExtra(RecognizerIntent.EXTRA_ONLY_RETURN_LANGUAGE_PREFERENCE, "ko-KR");
            intent.putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 3);
            intent.putExtra(RecognizerIntent.EXTRA_CALLING_PACKAGE, getPackageName());

            speechRecognizer.cancel();
            speechRecognizer.startListening(intent);
            isListening = true;
        } catch (Exception e) {
            isListening = false;
            notifyWeb("window.onAndroidSpeechError && window.onAndroidSpeechError('" + escapeJs(e.getMessage()) + "');");
        }
    }

    private void stopSpeechRecognitionInternal() {
        if (speechRecognizer != null && isListening) {
            try {
                speechRecognizer.stopListening();
            } catch (Exception ignored) {}
            isListening = false;
        }
    }

    private void notifyWeb(String script) {
        WebView webView = getBridge().getWebView();
        if (webView != null) {
            webView.post(() -> webView.evaluateJavascript(script, null));
        }
    }

    private String escapeJs(String text) {
        if (text == null) return "";
        return text.replace("\\", "\\\\").replace("'", "\\'").replace("\n", " ").replace("\r", "");
    }

    private String getSpeechErrorMsg(int error) {
        switch (error) {
            case SpeechRecognizer.ERROR_AUDIO:
                return "音訊錄製錯誤，請檢查麥克風！";
            case SpeechRecognizer.ERROR_CLIENT:
                return "辨識未完成或已取消，請再試一次！";
            case SpeechRecognizer.ERROR_INSUFFICIENT_PERMISSIONS:
                return "未取得麥克風權限，請在手機系統設定中開啟！";
            case SpeechRecognizer.ERROR_NETWORK:
            case SpeechRecognizer.ERROR_NETWORK_TIMEOUT:
                return "網絡連線逾時，請檢查網絡連線！";
            case SpeechRecognizer.ERROR_NO_MATCH:
                return "未能清晰辨識發音，請靠近麥克風再朗讀一次！";
            case SpeechRecognizer.ERROR_RECOGNIZER_BUSY:
                return "語音辨識服務正忙，請稍後再試！";
            case SpeechRecognizer.ERROR_SERVER:
                return "語音辨識伺服器發生錯誤！";
            case SpeechRecognizer.ERROR_SPEECH_TIMEOUT:
                return "未聽見聲音，請靠近麥克風並清晰朗讀！";
            default:
                return "未能辨識到聲音，請靠近麥克風再試一次！";
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == PERMISSION_REQUEST_RECORD_AUDIO) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                startSpeechRecognitionInternal();
            } else {
                notifyWeb("window.onAndroidSpeechError && window.onAndroidSpeechError('需要麥克風權限才能進行語音跟讀與發音評分！');");
            }
        }
    }

    @Override
    public void onDestroy() {
        if (tts != null) {
            tts.stop();
            tts.shutdown();
        }
        if (speechRecognizer != null) {
            speechRecognizer.destroy();
        }
        super.onDestroy();
    }
}
