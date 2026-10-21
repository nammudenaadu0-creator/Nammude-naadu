// ==============================================================
// ONESIGNAL PUSH NOTIFICATIONS SERVICE (CLOSED-APP DELIVERY)
// ==============================================================
(function () {
  'use strict';

  // Configurable App ID: Stored in localStorage or fallback constant
  const DEFAULT_APP_ID = localStorage.getItem('nn_onesignal_app_id') || 'YOUR_ONESIGNAL_APP_ID';
  const DEFAULT_REST_KEY = localStorage.getItem('nn_onesignal_rest_key') || '';

  window.NN_ONESIGNAL = {
    appId: DEFAULT_APP_ID,
    restApiKey: DEFAULT_REST_KEY,
    isInitialized: false,

    // Initialize OneSignal on App Launch
    init: function () {
      const activeAppId = localStorage.getItem('nn_onesignal_app_id') || this.appId;
      if (!activeAppId || activeAppId === 'YOUR_ONESIGNAL_APP_ID') {
        console.info('ℹ️ [OneSignal] Waiting for valid OneSignal App ID. Configure in Admin panel.');
        return;
      }

      // 1. CAPACITOR ANDROID / IOS NATIVE MODE
      if (typeof window !== 'undefined' && window.plugins && window.plugins.OneSignal) {
        try {
          window.plugins.OneSignal.initialize(activeAppId);
          this.isInitialized = true;
          console.info('🔔 [OneSignal] Native Android Push initialized with App ID:', activeAppId);

          // Request notification permission smoothly
          window.plugins.OneSignal.Notifications.requestPermission(true).then((accepted) => {
            console.info('🔔 [OneSignal] User notification permission status:', accepted);
          });

          // Set user alias / external ID so direct messages can target their phone number
          this.syncUserIdentity();

          // Handle click when user taps notification while app was closed or in background
          window.plugins.OneSignal.Notifications.addEventListener('click', (event) => {
            try {
              const notif = event.notification;
              const data = notif.additionalData || {};
              console.info('📲 [OneSignal] Notification tapped:', data);

              if (data.chatKey && typeof window.openChatModal === 'function') {
                setTimeout(() => {
                  window.openChatModal(
                    data.senderName || data.name || 'സുഹൃത്ത്',
                    data.senderPhone || data.phone || '',
                    data.senderAvatar || data.avatar || '',
                    '',
                    data.senderId || '',
                    data.chatKey
                  );
                }, 400);
              } else if (data.type === 'service' && typeof window.navTo === 'function') {
                window.navTo('services');
              } else if (data.type === 'blood' && typeof window.navTo === 'function') {
                window.navTo('blood');
              }
            } catch (e) {
              console.warn('⚠️ [OneSignal click error]:', e);
            }
          });
        } catch (e) {
          console.warn('⚠️ [OneSignal native init error]:', e.message);
        }
        return;
      }

      // 2. WEB PWA BROWSER MODE
      if (typeof window !== 'undefined' && typeof window.document !== 'undefined') {
        window.OneSignalDeferred = window.OneSignalDeferred || [];
        window.OneSignalDeferred.push(async function (OneSignal) {
          try {
            await OneSignal.init({
              appId: activeAppId,
              notifyButton: { enable: false },
              allowLocalhostAsSecureOrigin: true
            });
            window.NN_ONESIGNAL.isInitialized = true;
            console.info('🔔 [OneSignal] Web Push initialized');
            window.NN_ONESIGNAL.syncUserIdentity();
          } catch (err) {
            console.warn('ℹ️ [OneSignal Web note]:', err.message);
          }
        });

        // Load OneSignal Web SDK script if not already present
        if (!document.getElementById('onesignal-web-sdk')) {
          const script = document.createElement('script');
          script.id = 'onesignal-web-sdk';
          script.src = 'https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js';
          script.defer = true;
          document.head.appendChild(script);
        }
      }
    },

    // Sync current logged-in citizen's phone / name with OneSignal
    syncUserIdentity: function () {
      try {
        const phone = (typeof APP_STATE !== 'undefined' && APP_STATE.currentUser && APP_STATE.currentUser.phone)
          ? String(APP_STATE.currentUser.phone).replace(/\D/g, '').slice(-10)
          : '';
        const name = (typeof APP_STATE !== 'undefined' && APP_STATE.currentUser && APP_STATE.currentUser.name)
          ? APP_STATE.currentUser.name
          : '';
        const district = (typeof APP_STATE !== 'undefined' && APP_STATE.location && APP_STATE.location.district)
          ? APP_STATE.location.district
          : '';

        if (!phone) return;

        // Native Capacitor plugin identity
        if (window.plugins && window.plugins.OneSignal && window.plugins.OneSignal.login) {
          window.plugins.OneSignal.login(phone);
          if (window.plugins.OneSignal.User && window.plugins.OneSignal.User.addTags) {
            window.plugins.OneSignal.User.addTags({
              phone: phone,
              name: name,
              district: district
            });
          }
          console.info('👤 [OneSignal] Native user registered with phone:', phone);
        }

        // Web PWA identity
        if (window.OneSignalDeferred) {
          window.OneSignalDeferred.push(function (OneSignal) {
            if (typeof OneSignal.login === 'function') {
              OneSignal.login(phone);
            }
          });
        }
      } catch (_) {}
    },

    // Send instant push notification to recipient's phone via OneSignal REST API
    sendPush: async function (recipientPhone, title, message, extraData) {
      const activeAppId = localStorage.getItem('nn_onesignal_app_id') || this.appId;
      const activeRestKey = localStorage.getItem('nn_onesignal_rest_key') || this.restApiKey;

      if (!activeAppId || activeAppId === 'YOUR_ONESIGNAL_APP_ID' || !activeRestKey) {
        return false;
      }

      const cleanTargetPhone = recipientPhone ? String(recipientPhone).replace(/\D/g, '').slice(-10) : '';
      if (!cleanTargetPhone) return false;

      try {
        const payload = {
          app_id: activeAppId,
          include_aliases: {
            external_id: [cleanTargetPhone]
          },
          target_channel: 'push',
          headings: { en: title || 'നമ്മുടെ നാട്' },
          contents: { en: message || 'നിങ്ങൾക്ക് ഒരു പുതിയ സന്ദേശം വന്നിട്ടുണ്ട്' },
          data: extraData || {},
          small_icon: 'ic_stat_onesignal_default',
          large_icon: 'https://nammudenaadu.web.app/assets/icon-192.png',
          priority: 10
        };

        const res = await fetch('https://onesignal.com/api/v1/notifications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + activeRestKey
          },
          body: JSON.stringify(payload)
        });

        const json = await res.json();
        console.info('🚀 [OneSignal] Push sent to:', cleanTargetPhone, json);
        return true;
      } catch (err) {
        console.warn('⚠️ [OneSignal Push Error]:', err.message);
        return false;
      }
    },

    // Broadcast emergency/news notification to all app users in a district
    broadcastDistrictAlert: async function (title, message, district, extraData) {
      const activeAppId = localStorage.getItem('nn_onesignal_app_id') || this.appId;
      const activeRestKey = localStorage.getItem('nn_onesignal_rest_key') || this.restApiKey;
      if (!activeAppId || !activeRestKey) return false;

      try {
        const payload = {
          app_id: activeAppId,
          included_segments: ['Subscribed Users'],
          headings: { en: title || '📢 അടിയന്തിര അറിയിപ്പ്!' },
          contents: { en: message },
          data: extraData || {},
          priority: 10
        };

        if (district) {
          payload.filters = [
            { field: 'tag', key: 'district', relation: '=', value: district }
          ];
        }

        const res = await fetch('https://onesignal.com/api/v1/notifications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + activeRestKey
          },
          body: JSON.stringify(payload)
        });
        return await res.json();
      } catch (e) {
        return false;
      }
    }
  };

  // Auto-init on page/app load
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(() => window.NN_ONESIGNAL.init(), 1000);
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => window.NN_ONESIGNAL.init(), 1000);
    });
  }

  // Also hook into user profile updates to keep OneSignal ID in sync
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (window.NN_ONESIGNAL) window.NN_ONESIGNAL.syncUserIdentity();
    }, 2500);
  });
})();
