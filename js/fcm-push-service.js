// =========================================================================
// NAMMUDE NAADU (നമ്മുടെ നാട്) - NATIVE FCM PUSH NOTIFICATIONS SERVICE
// Complete Android Background, Lock-screen, and System-tray Delivery via FCM
// =========================================================================

(function () {
  'use strict';

  const CHANNEL_MESSAGES = 'nammude_naadu_messages';
  const CHANNEL_ALERTS = 'nammude_naadu_alerts';
  const CHANNEL_FCM_DEFAULT = 'fcm_default_channel';

  window.NN_FCM = {
    isInitialized: false,
    currentToken: null,
    isNative: false,

    // Initialize FCM Push Notifications on App Launch
    init: async function () {
      if (this.isInitialized) return;
      this.isInitialized = true;

      this.isNative = typeof window !== 'undefined' &&
        window.Capacitor &&
        typeof window.Capacitor.isNativePlatform === 'function' &&
        window.Capacitor.isNativePlatform();

      console.info('🔔 [NN_FCM] Initializing FCM Push Service. Native Android:', this.isNative);

      if (this.isNative) {
        await this.initNativeAndroid();
      } else {
        this.initWebFallback();
      }

      // Check and prompt permission UI smoothly if not decided yet
      this.checkAndPromptPermissionModal();

      // Listen for app resume to resync token if needed
      if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App) {
        try {
          window.Capacitor.Plugins.App.addListener('appStateChange', (state) => {
            if (state && state.isActive) {
              console.info('📱 [NN_FCM] App resumed to foreground, verifying token sync...');
              this.syncTokenWithSupabase();
            }
          });
        } catch (_) {}
      }
    },

    // Safe helper: Check if Firebase native SDK has been initialized via google-services.json
    isFirebaseConfigured: function () {
      if (typeof window.AndroidNativeConfig !== 'undefined' && typeof window.AndroidNativeConfig.isFirebaseAvailable === 'function') {
        try {
          return window.AndroidNativeConfig.isFirebaseAvailable();
        } catch (_) {}
      }
      return window.IS_FIREBASE_CONFIGURED === true;
    },

    // 1. NATIVE ANDROID CAPACITOR FCM SETUP
    initNativeAndroid: async function () {
      const PushNotifications = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.PushNotifications;
      if (!PushNotifications) {
        console.warn('⚠️ [NN_FCM] Capacitor PushNotifications plugin not found.');
        return;
      }

      // CRITICAL: Do NOT attempt PushNotifications.register if Firebase is not initialized
      // (e.g. google-services.json not configured), otherwise Android throws a fatal exception and crashes the app.
      if (!this.isFirebaseConfigured()) {
        console.warn('ℹ️ [NN_FCM] Firebase is not initialized (google-services.json missing). FCM registration safely skipped to keep app stable.');
        return;
      }

      try {
        // Register High-Priority Android Notification Channels (Android 8.0 - 15+)
        await this.registerAndroidNotificationChannels(PushNotifications);

        // Listener: Device Token successfully registered
        PushNotifications.addListener('registration', async (tokenObj) => {
          const token = tokenObj && (tokenObj.value || tokenObj.token);
          if (token) {
            this.currentToken = token;
            try {
              localStorage.setItem('nn_fcm_token', token);
              localStorage.setItem('nn_fcm_token_time', Date.now().toString());
            } catch (_) {}
            console.info('✅ [NN_FCM] Native Android FCM Token generated successfully:', token.substring(0, 18) + '...');
            await this.syncTokenWithSupabase(token);
          }
        });

        // Listener: Registration Error
        PushNotifications.addListener('registrationError', (error) => {
          console.warn('⚠️ [NN_FCM] Native Push registration error:', error);
        });

        // Listener: Push Notification Received while app is FOREGROUND
        PushNotifications.addListener('pushNotificationReceived', (notification) => {
          console.info('📥 [NN_FCM] Foreground notification received:', notification);
          this.handleForegroundNotification(notification);
        });

        // Listener: User TAPPED notification in system tray (from background, lock screen, or closed app)
        PushNotifications.addListener('pushNotificationActionPerformed', (action) => {
          console.info('📲 [NN_FCM] Notification tapped in system tray:', action);
          this.handleNotificationTap(action && action.notification ? action.notification : action);
        });

        // Check current notification permission status
        const permStatus = await PushNotifications.checkPermissions();
        console.info('🔔 [NN_FCM] Current notification permission:', permStatus);

        if (permStatus && permStatus.receive === 'granted') {
          await PushNotifications.register();
        }
      } catch (err) {
        console.warn('⚠️ [NN_FCM] Native init exception:', err.message);
      }
    },

    // Register High-Importance Android Notification Channels with Sound & Vibration
    registerAndroidNotificationChannels: async function (PushNotifications) {
      if (!PushNotifications || typeof PushNotifications.createChannel !== 'function') return;

      try {
        // 1. Chat Messages Channel
        await PushNotifications.createChannel({
          id: CHANNEL_MESSAGES,
          name: 'സന്ദേശങ്ങൾ (Chat Messages)',
          description: 'പുതിയ ചാറ്റ് സന്ദേശങ്ങൾക്കുള്ള തത്സമയ അറിയിപ്പുകൾ',
          importance: 5, // High importance (Heads-up alert + sound)
          visibility: 1, // Public on lockscreen
          vibration: true,
          sound: 'notification_sound.wav',
          lights: true,
          lightColor: '#0E7043'
        });

        // 2. Urgent Alerts & Community Blood Channel
        await PushNotifications.createChannel({
          id: CHANNEL_ALERTS,
          name: 'നമ്മുടെ നാട് അറിയിപ്പുകൾ (Alerts & Blood)',
          description: 'അടിയന്തിര അറിയിപ്പുകളും രക്തദാന ആവശ്യങ്ങളും',
          importance: 5,
          visibility: 1,
          vibration: true,
          sound: 'notification_sound.wav',
          lights: true,
          lightColor: '#DC2626'
        });

        // 3. Default FCM fallback channel
        await PushNotifications.createChannel({
          id: CHANNEL_FCM_DEFAULT,
          name: 'പ്രധാന അറിയിപ്പുകൾ (General)',
          description: 'സാധാരണ അപ്‌ഡേറ്റുകളും അറിയിപ്പുകളും',
          importance: 4,
          visibility: 1,
          vibration: true,
          sound: 'notification_sound.wav'
        });

        console.info('🔔 [NN_FCM] High-priority Android notification channels ensured');
      } catch (e) {
        console.warn('ℹ️ [NN_FCM Channel note]:', e.message);
      }
    },

    // Request Android 13+ runtime POST_NOTIFICATIONS permission
    requestPermission: async function () {
      let granted = false;

      if (this.isNative && window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.PushNotifications) {
        try {
          const result = await window.Capacitor.Plugins.PushNotifications.requestPermissions();
          granted = result && (result.receive === 'granted');
          if (granted && this.isFirebaseConfigured()) {
            await window.Capacitor.Plugins.PushNotifications.register();
          }
        } catch (e) {
          console.warn('⚠️ [NN_FCM] Native permission request error:', e);
        }
      } else if (typeof Notification !== 'undefined' && typeof Notification.requestPermission === 'function') {
        try {
          const perm = await Notification.requestPermission();
          granted = (perm === 'granted');
        } catch (_) {}
      }

      try {
        localStorage.setItem('nn_notif_prompt_shown', 'true');
        if (granted) {
          localStorage.setItem('nn_notif_enabled', 'true');
          if (typeof window.showNotificationToast === 'function') {
            window.showNotificationToast('✅ അറിയിപ്പുകൾ ഓണാക്കി! ഇനി തത്സമയ സന്ദേശങ്ങൾ ലഭിക്കും.');
          }
          this.syncTokenWithSupabase();
        }
      } catch (_) {}

      return granted;
    },

    // Synchronize FCM Token with Supabase authenticated user profile
    syncTokenWithSupabase: async function (tokenOverride) {
      const token = tokenOverride || this.currentToken || (typeof localStorage !== 'undefined' ? localStorage.getItem('nn_fcm_token') : null);
      if (!token) return false;

      // Extract current user ID and phone
      let userId = '';
      let userPhone = '';

      try {
        if (typeof APP_STATE !== 'undefined' && APP_STATE.currentUser) {
          if (APP_STATE.currentUser.id) userId = String(APP_STATE.currentUser.id);
          if (APP_STATE.currentUser.phone) userPhone = String(APP_STATE.currentUser.phone).replace(/\D/g, '').slice(-10);
        }
        if (!userId && typeof localStorage !== 'undefined') {
          userId = localStorage.getItem('nn_user_id') || '';
        }
        if (!userPhone && typeof localStorage !== 'undefined') {
          userPhone = (localStorage.getItem('nn_user_phone') || '').replace(/\D/g, '').slice(-10);
        }
      } catch (_) {}

      // If user is not logged in yet, token is cached locally and will sync upon login
      if (!userId && !userPhone) {
        console.info('ℹ️ [NN_FCM] Token stored locally; awaiting user login for Supabase profile sync.');
        return false;
      }

      // Delegate update to Supabase backend service
      if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.updateFcmToken === 'function') {
        return await window.NN_SUPABASE_SERVICES.updateFcmToken(userId || userPhone, token);
      }

      return false;
    },

    // Handle User Logout: clear token from old profile so no unwanted notifications arrive
    handleLogout: async function (oldUserId) {
      const targetId = oldUserId || (typeof APP_STATE !== 'undefined' && APP_STATE.currentUser ? APP_STATE.currentUser.id : null);
      if (targetId && typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.clearFcmToken === 'function') {
        try {
          await window.NN_SUPABASE_SERVICES.clearFcmToken(targetId);
        } catch (_) {}
      }
      try {
        localStorage.removeItem('nn_fcm_token');
        localStorage.removeItem('nn_fcm_token_time');
      } catch (_) {}
      this.currentToken = null;
      console.info('🚪 [NN_FCM] Token detached on logout for user:', targetId);
    },

    // Handle Notification tap when user clicked notification banner or tray item
    handleNotificationTap: function (notification) {
      if (!notification) return;
      const data = notification.data || notification.additionalData || {};
      console.info('🎯 [NN_FCM] Processing notification click action with payload:', data);

      const targetType = data.type || (data.chatKey ? 'chat' : '');

      try {
        // 1. CHAT MESSAGE
        if (targetType === 'chat' || data.chatKey) {
          if (typeof window.openChatModal === 'function') {
            setTimeout(() => {
              window.openChatModal(
                data.senderName || data.name || 'സുഹൃത്ത്',
                data.senderPhone || data.phone || '',
                data.senderAvatar || data.avatar || '',
                '',
                data.senderId || '',
                data.chatKey
              );
            }, 350);
          }
        }
        // 2. BLOOD REQUEST ALERT
        else if (targetType === 'blood') {
          if (typeof window.navTo === 'function') {
            window.navTo('blood');
          }
          if (data.bloodRequestId && typeof window.highlightBloodRequest === 'function') {
            setTimeout(() => window.highlightBloodRequest(data.bloodRequestId), 500);
          }
        }
        // 3. SERVICE REQUEST / UPDATE
        else if (targetType === 'service' || targetType === 'service_request') {
          if (typeof window.navTo === 'function') {
            window.navTo('services');
          }
        }
        // 4. EMERGENCY ALERT
        else if (targetType === 'emergency') {
          if (typeof window.navTo === 'function') {
            window.navTo('emergency');
          }
        }
      } catch (err) {
        console.warn('⚠️ [NN_FCM] Error processing notification tap:', err);
      }
    },

    // Handle incoming notification when app is in FOREGROUND
    handleForegroundNotification: function (notification) {
      const data = notification.data || notification.additionalData || {};

      // If user is actively reading this exact chat conversation, do not show duplicate alert
      if (data.chatKey && window.ACTIVE_CHAT_KEY && window.ACTIVE_CHAT_KEY === data.chatKey) {
        console.info('💬 [NN_FCM] Suppressing heads-up alert because conversation is already open.');
        return;
      }

      // Display native heads-up local alert or custom notification toast
      const title = notification.title || 'നമ്മുടെ നാട് അറിയിപ്പ്';
      const body = notification.body || 'നിങ്ങൾക്ക് ഒരു പുതിയ സന്ദേശം വന്നിട്ടുണ്ട്';

      if (typeof window.showLocalNotification === 'function') {
        window.showLocalNotification(title, body, data);
      } else if (typeof window.toast === 'function') {
        window.toast(`🔔 ${title}: ${body}`);
      }
    },

    // Smooth UI permission prompt modal helper
    checkAndPromptPermissionModal: function (force = false) {
      try {
        const hasAsked = localStorage.getItem('nn_notif_prompt_shown');
        const isGranted = (typeof Notification !== 'undefined' && Notification.permission === 'granted');
        if (isGranted) return;

        if (!hasAsked || force) {
          setTimeout(() => {
            const modal = document.getElementById('modal-notif-permission');
            if (modal) {
              modal.style.display = 'flex';
              modal.classList.add('active');
            }
          }, 2000);
        }
      } catch (_) {}
    },

    // Web browser fallback
    initWebFallback: function () {
      console.info('🌐 [NN_FCM] Running in Web mode. Local storage token checked.');
    }
  };

  // Global bridge helpers for UI modal buttons
  window.confirmEnableNotifications = async function () {
    const modal = document.getElementById('modal-notif-permission');
    if (modal) {
      modal.style.display = 'none';
      modal.classList.remove('active');
    }
    if (window.NN_FCM) {
      await window.NN_FCM.requestPermission();
    }
  };

  window.dismissNotificationPrompt = function () {
    const modal = document.getElementById('modal-notif-permission');
    if (modal) {
      modal.style.display = 'none';
      modal.classList.remove('active');
    }
    try {
      localStorage.setItem('nn_notif_prompt_shown', 'true');
    } catch (_) {}
  };

  // Auto-initialize when DOM is ready
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(() => window.NN_FCM.init(), 1000);
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => window.NN_FCM.init(), 1000);
    });
  }
})();
