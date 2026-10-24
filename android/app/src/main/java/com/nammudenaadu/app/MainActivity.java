package com.nammudenaadu.app;

import android.os.Bundle;
import android.os.Build;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.media.AudioAttributes;
import android.media.RingtoneManager;
import android.net.Uri;
import android.graphics.Color;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        createNotificationChannels();
    }

    private void createNotificationChannels() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            if (notificationManager == null) return;

            // 1. High-importance Channel for Alerts & Help Notifications
            String channelId = "nammude_naadu_alerts";
            CharSequence name = "നമ്മുടെ നാട് അറിയിപ്പുകൾ";
            String description = "സന്ദേശങ്ങളും തത്സമയ സഹായ അറിയിപ്പുകളും";
            int importance = NotificationManager.IMPORTANCE_HIGH;

            NotificationChannel channel = new NotificationChannel(channelId, name, importance);
            channel.setDescription(description);
            channel.enableLights(true);
            channel.setLightColor(Color.GREEN);
            channel.enableVibration(true);
            channel.setVibrationPattern(new long[]{100, 200, 100, 200});

            AudioAttributes audioAttributes = new AudioAttributes.Builder()
                .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
                .setUsage(AudioAttributes.USAGE_NOTIFICATION)
                .build();

            Uri soundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
            channel.setSound(soundUri, audioAttributes);
            notificationManager.createNotificationChannel(channel);

            // 2. Default FCM channel used by OneSignal / Google Play Services
            NotificationChannel fcmChannel = new NotificationChannel("fcm_default_channel", "പ്രധാന അറിയിപ്പുകൾ", NotificationManager.IMPORTANCE_HIGH);
            fcmChannel.enableVibration(true);
            fcmChannel.setSound(soundUri, audioAttributes);
            notificationManager.createNotificationChannel(fcmChannel);
        }
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
