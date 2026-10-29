package com.nammudenaadu.app;

import android.os.Bundle;
import android.os.Build;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.ContentResolver;
import android.media.AudioAttributes;
import android.media.RingtoneManager;
import android.net.Uri;
import android.graphics.Color;
import android.webkit.WebView;
import android.webkit.WebSettings;
import android.view.View;
import androidx.activity.OnBackPressedCallback;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        createNotificationChannels();
        configureWebViewPerformance();
        setupHardwareBackButtonHandler();
    }

    private void setupHardwareBackButtonHandler() {
        try {
            getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
                @Override
                public void handleOnBackPressed() {
                    WebView webView = getBridge() != null ? getBridge().getWebView() : null;
                    if (webView != null) {
                        webView.evaluateJavascript(
                            "(function() { return window.handleAndroidHardwareBack ? window.handleAndroidHardwareBack() : false; })()",
                            result -> {
                                if ("false".equals(result)) {
                                    setEnabled(false);
                                    getOnBackPressedDispatcher().onBackPressed();
                                    setEnabled(true);
                                }
                            }
                        );
                    } else {
                        setEnabled(false);
                        getOnBackPressedDispatcher().onBackPressed();
                        setEnabled(true);
                    }
                }
            });
        } catch (Exception ignored) {}
    }

    @Override
    public void onResume() {
        super.onResume();
        configureWebViewPerformance();
    }

    private void configureWebViewPerformance() {
        try {
            if (getBridge() != null && getBridge().getWebView() != null) {
                WebView webView = getBridge().getWebView();
                WebSettings settings = webView.getSettings();
                settings.setDomStorageEnabled(true);
                settings.setDatabaseEnabled(true);
                settings.setGeolocationEnabled(true);
                settings.setCacheMode(WebSettings.LOAD_DEFAULT);
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                    settings.setOffscreenPreRaster(true);
                }
                webView.setLayerType(View.LAYER_TYPE_HARDWARE, null);
                webView.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);
                webView.setOverScrollMode(View.OVER_SCROLL_NEVER);
            }
        } catch (Exception ignored) {}
    }

    private void createNotificationChannels() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            if (notificationManager == null) return;

            AudioAttributes audioAttributes = new AudioAttributes.Builder()
                .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
                .setUsage(AudioAttributes.USAGE_NOTIFICATION)
                .build();

            // Resolve sound URI from res/raw/notification_sound or fallback to default
            Uri soundUri;
            int soundResId = getResources().getIdentifier("notification_sound", "raw", getPackageName());
            if (soundResId != 0) {
                soundUri = Uri.parse(ContentResolver.SCHEME_ANDROID_RESOURCE + "://" + getPackageName() + "/" + soundResId);
            } else {
                soundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
            }

            // 1. High-importance Channel for Chat Messages (Plays sound & vibrates in background)
            String msgChannelId = "nammude_naadu_messages";
            NotificationChannel existingMsgChannel = notificationManager.getNotificationChannel(msgChannelId);
            if (existingMsgChannel != null && (existingMsgChannel.getSound() == null || existingMsgChannel.getImportance() < NotificationManager.IMPORTANCE_HIGH)) {
                try {
                    notificationManager.deleteNotificationChannel(msgChannelId);
                } catch (Exception ignored) {}
            }

            NotificationChannel msgChannel = new NotificationChannel(
                msgChannelId,
                "സന്ദേശങ്ങൾ (Chat Messages)",
                NotificationManager.IMPORTANCE_HIGH
            );
            msgChannel.setDescription("പുതിയ ചാറ്റ് സന്ദേശങ്ങൾക്കുള്ള തത്സമയ അറിയിപ്പുകൾ");
            msgChannel.enableLights(true);
            msgChannel.setLightColor(Color.GREEN);
            msgChannel.enableVibration(true);
            msgChannel.setVibrationPattern(new long[]{0, 250, 150, 250});
            msgChannel.setLockscreenVisibility(Notification.VISIBILITY_PUBLIC);
            msgChannel.setSound(soundUri, audioAttributes);
            notificationManager.createNotificationChannel(msgChannel);

            // 2. High-importance Channel for Alerts & Help Notifications
            String alertChannelId = "nammude_naadu_alerts";
            NotificationChannel existingAlertChannel = notificationManager.getNotificationChannel(alertChannelId);
            if (existingAlertChannel != null && (existingAlertChannel.getSound() == null || existingAlertChannel.getImportance() < NotificationManager.IMPORTANCE_HIGH)) {
                try {
                    notificationManager.deleteNotificationChannel(alertChannelId);
                } catch (Exception ignored) {}
            }

            NotificationChannel alertChannel = new NotificationChannel(
                alertChannelId,
                "നമ്മുടെ നാട് അറിയിപ്പുകൾ (Alerts)",
                NotificationManager.IMPORTANCE_HIGH
            );
            alertChannel.setDescription("സന്ദേശങ്ങളും തത്സമയ സഹായ അറിയിപ്പുകളും");
            alertChannel.enableLights(true);
            alertChannel.setLightColor(Color.GREEN);
            alertChannel.enableVibration(true);
            alertChannel.setVibrationPattern(new long[]{0, 300, 200, 300});
            alertChannel.setLockscreenVisibility(Notification.VISIBILITY_PUBLIC);
            alertChannel.setSound(soundUri, audioAttributes);
            notificationManager.createNotificationChannel(alertChannel);

            // 3. Default FCM channel used by OneSignal / Google Play Services
            NotificationChannel fcmChannel = new NotificationChannel(
                "fcm_default_channel",
                "പ്രധാന അറിയിപ്പുകൾ",
                NotificationManager.IMPORTANCE_HIGH
            );
            fcmChannel.enableVibration(true);
            fcmChannel.setLockscreenVisibility(Notification.VISIBILITY_PUBLIC);
            fcmChannel.setSound(soundUri, audioAttributes);
            notificationManager.createNotificationChannel(fcmChannel);
        }
    }

    @Override
    protected void onNewIntent(android.content.Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
    }

    @Override
    public void onBackPressed() {
        WebView webView = getBridge() != null ? getBridge().getWebView() : null;
        if (webView != null) {
            webView.evaluateJavascript(
                "(function() { return window.handleAndroidHardwareBack ? window.handleAndroidHardwareBack() : false; })()",
                result -> {
                    if ("false".equals(result)) {
                        MainActivity.super.onBackPressed();
                    }
                }
            );
        } else {
            super.onBackPressed();
        }
    }
}
