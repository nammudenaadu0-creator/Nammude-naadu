// ==============================================================
// ONESIGNAL PUSH NOTIFICATIONS SERVICE (CLOSED-APP DELIVERY)
// ==============================================================
(function () {
  'use strict';

  // OneSignal Public App ID (Safe for client-side use)
  const DEFAULT_APP_ID = 'ba99bc43-e77b-4db1-90ac-d3cab11c8e3b';
  // Note: REST API Key must NEVER be stored in public localStorage
  const DEFAULT_REST_KEY = '';

  window.NN_ONESIGNAL = {
    appId: DEFAULT_APP_ID,
    restApiKey: DEFAULT_REST_KEY,
    isInitialized: false,

    // Initialize OneSignal on App Launch
    init: function () {
      const activeAppId = localStorage.getItem('nn_onesignal_app_id') || this.appId;
      if (!activeAppId) {
        console.info('ℹ️ [OneSignal] Waiting for valid OneSignal App ID.');
        return;
      }

      // Ensure Android high-priority Notification Channels exist for background alerts
      this.initNotificationChannels();

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

          // Suppress redundant status bar alert while app is actively in foreground (Supabase Realtime handles in-app delivery)
          try {
            window.plugins.OneSignal.Notifications.addEventListener('foregroundWillDisplay', (event) => {
              if (event && typeof event.preventDefault === 'function') {
                event.preventDefault();
              }
            });
          } catch (_) {}

          // Handle click when user taps notification while app was closed or in background
          window.plugins.OneSignal.Notifications.addEventListener('click', (event) => {
            try {
              const notif = event.notification;
              const data = notif.additionalData || {};
              console.info('📲 [OneSignal] Notification tapped:', data);

              if (data.chatKey && typeof window.openChatModal === 'function') {
                setTimeout(() => {
                  window.openChatModal(
                    data.senderName || data.name || 'Friend',
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
    // Falls back to Supabase Edge Function (FCM HTTP v1) if REST key not available
    sendPush: async function (recipientPhone, title, message, extraData) {
      const cleanTargetPhone = recipientPhone ? String(recipientPhone).replace(/\D/g, '').slice(-10) : '';
      if (!cleanTargetPhone) return false;

      // ── PRIMARY: Supabase Edge Function (FCM HTTP v1) — no secret exposed ──
      // Edge Function looks up recipient FCM token from profiles table and sends via Google FCM
      try {
        const supabaseUrl = (typeof window !== 'undefined' && window.SUPABASE_URL)
          ? window.SUPABASE_URL
          : (localStorage.getItem('nn_supabase_url') || 'https://ocnbtiwrepnnlwbtbzca.supabase.co');
        const supabaseAnonKey = (typeof window !== 'undefined' && (window.SUPABASE_ANON_KEY || window.SUPABASE_PUBLISHABLE_KEY))
          ? (window.SUPABASE_ANON_KEY || window.SUPABASE_PUBLISHABLE_KEY)
          : (localStorage.getItem('nn_supabase_anon_key') || 'sb_publishable_Jw6BWENMoesmYzgvKif2Ow_wF1vnuq0');

        if (supabaseUrl && supabaseAnonKey) {
          const edgePayload = {
            recipientPhone: cleanTargetPhone,
            title: title || 'നമ്മുടെ നാട്',
            body: message || 'നിങ്ങൾക്ക് ഒരു പുതിയ സന്ദേശം വന്നിട്ടുണ്ട്',
            channelId: (extraData && (extraData.type === 'chat' || extraData.chatKey))
              ? 'nammude_naadu_messages' : 'nammude_naadu_alerts',
            type: (extraData && extraData.type) || 'chat',
            data: extraData || {}
          };

          const edgeRes = await fetch(`${supabaseUrl}/functions/v1/send-push-notification`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': supabaseAnonKey,
              'Authorization': `Bearer ${supabaseAnonKey}`
            },
            body: JSON.stringify(edgePayload)
          });

          if (edgeRes.ok) {
            const edgeJson = await edgeRes.json();
            console.info('🚀 [Push] Sent via Edge Function FCM:', cleanTargetPhone, edgeJson);
            return true;
          } else {
            console.warn('⚠️ [Push] Edge Function returned:', edgeRes.status, await edgeRes.text());
          }
        }
      } catch (edgeErr) {
        console.warn('⚠️ [Push] Edge Function fallback:', edgeErr.message);
      }

      // ── FALLBACK: OneSignal REST API (only if admin REST key is available) ──
      const activeAppId = localStorage.getItem('nn_onesignal_app_id') || this.appId;
      const activeRestKey = sessionStorage.getItem('nn_admin_onesignal_rest_key') || this.restApiKey || '';

      if (!activeAppId || activeAppId === 'YOUR_ONESIGNAL_APP_ID' || !activeRestKey) {
        return false;
      }

      try {
        const payload = {
          app_id: activeAppId,
          include_aliases: {
            external_id: [cleanTargetPhone]
          },
          target_channel: 'push',
          headings: { en: title || 'Nammude Naadu' },
          contents: { en: message || 'You have a new message' },
          data: extraData || {},
          small_icon: 'ic_stat_onesignal_default',
          large_icon: 'https://nammudenaadu.web.app/assets/icon-192.png',
          android_channel_id: (extraData && (extraData.type === 'chat' || extraData.chatKey)) ? 'nammude_naadu_messages' : 'nammude_naadu_alerts',
          android_sound: 'notification_sound',
          ios_sound: 'default',
          priority: 10
        };

        const authPrefix = activeRestKey.startsWith('os_') ? 'Key ' : 'Basic ';
        const res = await fetch('https://onesignal.com/api/v1/notifications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authPrefix + activeRestKey
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
      const activeRestKey = sessionStorage.getItem('nn_admin_onesignal_rest_key') || this.restApiKey || '';
      if (!activeAppId || !activeRestKey) return false;

      try {
        const payload = {
          app_id: activeAppId,
          included_segments: ['Subscribed Users'],
          headings: { en: title || '📢 Urgent Alert!' },
          contents: { en: message },
          data: extraData || {},
          android_channel_id: (extraData && (extraData.type === 'chat' || extraData.chatKey)) ? 'nammude_naadu_messages' : 'nammude_naadu_alerts',
          android_sound: 'notification_sound',
          ios_sound: 'default',
          priority: 10
        };

        if (district) {
          payload.filters = [
            { field: 'tag', key: 'district', relation: '=', value: district }
          ];
        }

        const authPrefix = activeRestKey.startsWith('os_') ? 'Key ' : 'Basic ';
        const res = await fetch('https://onesignal.com/api/v1/notifications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authPrefix + activeRestKey
          },
          body: JSON.stringify(payload)
        });
        return await res.json();
      } catch (e) {
        return false;
      }
    },

    // Check & show early notification permission prompt
    checkAndPromptNotificationPermission: function (force = false) {
      try {
        const hasAsked = localStorage.getItem('nn_notif_prompt_shown');
        const isGranted = (typeof Notification !== 'undefined' && Notification.permission === 'granted');

        if (isGranted) return; // Already enabled

        // If not asked yet or forced
        if (!hasAsked || force) {
          setTimeout(() => {
            const modal = document.getElementById('modal-notif-permission');
            if (modal) {
              modal.style.display = 'flex';
              modal.classList.add('active');
            }
          }, 1800);
        }
      } catch (_) {}
    },

    // Request notification permission smoothly
    requestPermission: async function () {
      let granted = false;

      // 1. Native Capacitor OneSignal Plugin
      if (typeof window !== 'undefined' && window.plugins && window.plugins.OneSignal) {
        try {
          const res = await window.plugins.OneSignal.Notifications.requestPermission(true);
          granted = !!res;
        } catch (_) {}
      }

      // 2. Browser / Webview Notification API
      if (typeof Notification !== 'undefined' && typeof Notification.requestPermission === 'function') {
        try {
          const perm = await Notification.requestPermission();
          if (perm === 'granted') granted = true;
        } catch (_) {}
      }

      localStorage.setItem('nn_notif_prompt_shown', 'true');
      if (granted) {
        localStorage.setItem('nn_notif_enabled', 'true');
        if (typeof window.showNotificationToast === 'function') {
          window.showNotificationToast('✅ Notifications enabled! You will now receive messages instantly.');
        }
        this.syncUserIdentity();
      }
      return granted;
    },

    // Register high-priority Android notification channels (Android 8.0 - 15)
    initNotificationChannels: async function () {
      if (typeof window !== 'undefined' && window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.LocalNotifications) {
        try {
          await window.Capacitor.Plugins.LocalNotifications.createChannel({
            id: 'nammude_naadu_messages',
            name: 'Chat Messages',
            description: 'Real-time notifications for new chat messages',
            importance: 5,
            visibility: 1,
            vibration: true,
            sound: 'notification_sound.wav'
          });
          await window.Capacitor.Plugins.LocalNotifications.createChannel({
            id: 'nammude_naadu_alerts',
            name: 'Nammude Naadu Alerts',
            description: 'Urgent alerts and new service requests',
            importance: 5,
            visibility: 1,
            vibration: true,
            sound: 'notification_sound.wav'
          });
          console.info('🔔 [Android] High-priority notification channels registered');
        } catch (e) {
          console.warn('⚠️ [Channel registration note]:', e.message);
        }
      }
    },

    // Show native local notification when a message/event arrives
    showLocalNotification: function (title, body, extraData = {}) {
      if (typeof window !== 'undefined' && typeof window.sendNativePhoneNotification === 'function') {
        return window.sendNativePhoneNotification(title, body, extraData);
      }
      try {
        // Vibrate device if supported
        if (navigator.vibrate) {
          navigator.vibrate([100, 50, 100]);
        }

        // 1. Capacitor Native Local Notification (works on Android with sound & heads-up)
        if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.LocalNotifications) {
          try {
            window.Capacitor.Plugins.LocalNotifications.schedule({
              notifications: [
                {
                  title: title || 'Nammude Naadu Message',
                  body: body || 'You have a new message',
                  id: Math.floor(Math.random() * 900000) + 100000,
                  schedule: { at: new Date(Date.now() + 50) },
                  channelId: 'nammude_naadu_messages',
                  smallIcon: 'ic_stat_onesignal_default',
                  sound: 'notification_sound.wav',
                  extra: extraData
                }
              ]
            });
          } catch (e) {
            console.warn('LocalNotifications schedule error:', e);
          }
        }

        // 2. Standard Web/WebView Notification API
        if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
          const options = {
            body: body || 'You have a new message',
            icon: 'assets/kerala-logo-badge.jpg',
            badge: 'assets/kerala-logo-badge.jpg',
            tag: extraData.chatKey || 'nn-chat-msg',
            renotify: true,
            data: extraData
          };

          const notif = new Notification(title || 'Nammude Naadu Message', options);
          notif.onclick = function () {
            window.focus();
            if (extraData && extraData.chatKey && typeof window.openChatModal === 'function') {
              window.openChatModal(
                extraData.senderName || 'Friend',
                extraData.senderPhone || '',
                extraData.senderAvatar || '',
                '',
                extraData.senderId || '',
                extraData.chatKey
              );
            }
            notif.close();
          };
        }
      } catch (err) {
        console.info('Local notification note:', err.message);
      }
    }
  };

  // Global helper functions for UI modal buttons
  window.confirmEnableNotifications = async function () {
    const modal = document.getElementById('modal-notif-permission');
    if (modal) {
      modal.style.display = 'none';
      modal.classList.remove('active');
    }
    if (window.NN_ONESIGNAL) {
      await window.NN_ONESIGNAL.requestPermission();
    }
  };

  window.dismissNotificationPrompt = function () {
    const modal = document.getElementById('modal-notif-permission');
    if (modal) {
      modal.style.display = 'none';
      modal.classList.remove('active');
    }
    localStorage.setItem('nn_notif_prompt_shown', 'true');
  };

  window.showLocalNotification = function (title, body, extraData) {
    if (window.NN_ONESIGNAL && typeof window.NN_ONESIGNAL.showLocalNotification === 'function') {
      window.NN_ONESIGNAL.showLocalNotification(title, body, extraData);
    }
  };

  // Auto-init on page/app load
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(() => {
      window.NN_ONESIGNAL.init();
      window.NN_ONESIGNAL.checkAndPromptNotificationPermission();
    }, 1200);
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        window.NN_ONESIGNAL.init();
        window.NN_ONESIGNAL.checkAndPromptNotificationPermission();
      }, 1200);
    });
  }

  // Also hook into user profile updates to keep OneSignal ID in sync
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (window.NN_ONESIGNAL) window.NN_ONESIGNAL.syncUserIdentity();
    }, 2500);
  });
})();
