// =========================================================================
// NAMMUDE NAADU (നമ്മുടെ നാട്) - SUPABASE REALTIME & CLOUD BACKEND
// Ultra-fast cross-device synchronization for Posts, Services, Chats,
// Blood Donors, Jobs, Rentals and Profiles. Zero Firebase dependencies.
// =========================================================================

(function () {
  'use strict';

  if (typeof window !== 'undefined' && !window.escapeHtml) {
    window.escapeHtml = function(text) {
      if (text == null) return '';
      const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
      return String(text).replace(/[&<>"']/g, function (m) { return map[m]; });
    };
  }

  const SUPABASE_URL = 'https://ocnbtiwrepnnlwbtbzca.supabase.co';
  const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_Jw6BWENMoesmYzgvKif2Ow_wF1vnuq0';

  let client = null;
  let chatChannel = null;
  let postsChannel = null;
  let servicesChannel = null;
  let jobsChannel = null;
  let rentalsChannel = null;
  let bloodChannel = null;
  let emergencyChannel = null;
  let dbChangesChannel = null;
  let isSettingUpChannels = false;
  let realtimeRetryCount = 0;
  let realtimeRetryTimer = null;

  const chatSubscribers = new Map(); // chatKey -> Set of callbacks
  const SESSION_CLIENT_ID = 'sess_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);

  function getCitizenHeaders() {
    let phone = '';
    let id = '';
    try {
      if (typeof APP_STATE !== 'undefined' && APP_STATE.currentUser) {
        if (APP_STATE.currentUser.phone) {
          phone = String(APP_STATE.currentUser.phone).replace(/\D/g, '').slice(-10);
        }
        if (APP_STATE.currentUser.id) {
          id = String(APP_STATE.currentUser.id);
        }
      }
      if (!phone && typeof localStorage !== 'undefined') {
        phone = (localStorage.getItem('nn_user_phone') || '').replace(/\D/g, '').slice(-10);
      }
      if (!id && typeof localStorage !== 'undefined') {
        id = localStorage.getItem('nn_user_id') || '';
      }
    } catch (_) {}
    return {
      'x-citizen-phone': phone || '',
      'x-citizen-id': id || ''
    };
  }

  function updateClientCitizenHeaders() {
    if (!client) return;
    try {
      const hdrs = getCitizenHeaders();
      if (client.rest && client.rest.headers) {
        if (hdrs['x-citizen-phone']) client.rest.headers['x-citizen-phone'] = hdrs['x-citizen-phone'];
        if (hdrs['x-citizen-id']) client.rest.headers['x-citizen-id'] = hdrs['x-citizen-id'];
      }
    } catch (_) {}
  }
  if (typeof window !== 'undefined') {
    window.updateClientCitizenHeaders = updateClientCitizenHeaders;
  }

  function initSupabase() {
    if (client) {
      updateClientCitizenHeaders();
      return client;
    }
    if (typeof window === 'undefined' || !window.supabase || typeof window.supabase.createClient !== 'function') {
      console.warn('⚠️ [Supabase SDK] Not loaded yet. Retrying in background...');
      return null;
    }

    try {
      const citizenHeaders = getCitizenHeaders();
      client = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
        global: {
          headers: citizenHeaders
        },
        realtime: {
          params: {
            eventsPerSecond: 10
          }
        }
      });
      console.info('🚀 [Supabase] Connected to project:', SUPABASE_URL);

      setupRealtimeChannels();
      setupDatabaseListeners();
      return client;
    } catch (err) {
      console.error('❌ [Supabase] Initialization error:', err);
      return null;
    }
  }

  // Setup broadcast channels for sub-50ms peer-to-peer delivery (Leak-Free & Safe)
  function setupRealtimeChannels() {
    if (!client || isSettingUpChannels) return;
    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      return;
    }
    isSettingUpChannels = true;

    // Unsubscribe and tear down previous channels first
    const previousChannels = [chatChannel, postsChannel, servicesChannel, jobsChannel, rentalsChannel, bloodChannel, emergencyChannel];
    previousChannels.forEach(ch => {
      if (ch) {
        try { ch.unsubscribe(); } catch (_) {}
      }
    });

    try {
      chatChannel = client.channel('nn_community_chats', { config: { broadcast: { self: false } } });
      chatChannel.on('broadcast', { event: 'chat_message' }, ({ payload }) => handleIncomingChatMessage(payload));
      chatChannel.on('broadcast', { event: 'chat_seen' }, ({ payload }) => handleIncomingChatSeen(payload));
      chatChannel.on('broadcast', { event: 'chat_message_deleted' }, ({ payload }) => handleIncomingChatMessageDeleted(payload));
      chatChannel.subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          realtimeRetryCount = 0;
          if (realtimeRetryTimer) { clearTimeout(realtimeRetryTimer); realtimeRetryTimer = null; }
        } else if (status === 'TIMED_OUT' || status === 'CHANNEL_ERROR') {
          if (realtimeRetryCount < 3) {
            realtimeRetryCount++;
            const backoff = Math.min(30000, 3000 * Math.pow(2, realtimeRetryCount));
            if (!realtimeRetryTimer) {
              realtimeRetryTimer = setTimeout(() => {
                realtimeRetryTimer = null;
                setupRealtimeChannels();
              }, backoff);
            }
          }
        }
      });

      if (!window._chatHeartbeatTimer) {
        window._chatHeartbeatTimer = setInterval(() => {
          if (chatChannel && chatChannel.state === 'joined') {
            try { chatChannel.send({ type: 'broadcast', event: 'ping', payload: {} }); } catch (_) {}
          }
        }, 12000);
      }

      postsChannel = client.channel('nn_community_posts', { config: { broadcast: { self: false } } });
      postsChannel.on('broadcast', { event: 'new_post' }, ({ payload }) => handleIncomingPost(payload));
      postsChannel.subscribe();

      servicesChannel = client.channel('nn_community_services', { config: { broadcast: { self: false } } });
      servicesChannel.on('broadcast', { event: 'new_service' }, ({ payload }) => handleIncomingService(payload));
      servicesChannel.subscribe();

      jobsChannel = client.channel('nn_community_jobs', { config: { broadcast: { self: false } } });
      jobsChannel.on('broadcast', { event: 'new_job' }, ({ payload }) => {
        if (payload && payload.job) handleIncomingJob(payload.job);
      });
      jobsChannel.subscribe();

      rentalsChannel = client.channel('nn_community_rentals', { config: { broadcast: { self: false } } });
      rentalsChannel.on('broadcast', { event: 'new_rental' }, ({ payload }) => {
        if (payload && payload.rental) handleIncomingRental(payload.rental);
      });
      rentalsChannel.subscribe();

      bloodChannel = client.channel('nn_community_blood', { config: { broadcast: { self: false } } });
      bloodChannel.on('broadcast', { event: 'emergency_blood' }, ({ payload }) => {
        if (payload && payload.bloodRequest) handleIncomingBloodRequest(payload.bloodRequest);
      });
      bloodChannel.subscribe();

      emergencyChannel = client.channel('nn_community_emergency_contacts', { config: { broadcast: { self: false } } });
      emergencyChannel.on('broadcast', { event: 'new_emergency_contact' }, ({ payload }) => {
        if (payload && payload.contact) handleIncomingEmergencyContact(payload.contact);
      });
      emergencyChannel.subscribe();
    } catch (e) {
      console.warn('⚠️ [Supabase Realtime Setup Note]:', e.message);
    } finally {
      isSettingUpChannels = false;
    }
  }

  // Request Android / Browser notification permissions & initialize Web Push
  async function requestNotificationPermission() {
    try {
      if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.LocalNotifications) {
        const check = await window.Capacitor.Plugins.LocalNotifications.checkPermissions();
        if (check.display !== 'granted') {
          await window.Capacitor.Plugins.LocalNotifications.requestPermissions();
        }

        // INSTANT TAP NAVIGATION (Just like Meesho / Flipkart): Direct deep-dive into the exact chat / order screen
        if (!window._localNotifClickRegistered) {
          window._localNotifClickRegistered = true;
          window.Capacitor.Plugins.LocalNotifications.addListener('localNotificationActionPerformed', (action) => {
            try {
              const data = (action && action.notification && action.notification.extra) || {};
              console.info('📲 [Capacitor LocalNotification Tapped]:', data);
              if (data.chatKey && typeof window.openChatModalByKey === 'function') {
                setTimeout(() => window.openChatModalByKey(data.chatKey), 200);
              } else if (data.chatKey && typeof window.openChatModal === 'function') {
                setTimeout(() => window.openChatModal(data.senderName || 'സുഹൃത്ത്', data.phone || data.senderPhone || '', '', '', data.senderId || '', data.chatKey), 200);
              } else if (data.type === 'chat' && typeof window.navTo === 'function') {
                window.navTo('chat');
              } else if (data.type === 'blood' && typeof window.navTo === 'function') {
                window.navTo('blood');
              } else if (data.type === 'service' && typeof window.navTo === 'function') {
                window.navTo('services');
              }
            } catch (err) {
              console.warn('⚠️ [LocalNotification action error]:', err);
            }
          });
        }
      } else if (typeof Notification !== 'undefined') {
        const perm = await Notification.requestPermission();
        if (perm === 'granted' && 'serviceWorker' in navigator) {
          navigator.serviceWorker.ready.then(reg => {
            console.info('🔔 Web Push & Background Notifications active with ServiceWorker:', reg);
          });
        }
      }
    } catch (e) {
      console.warn('Notification permission note:', e.message);
    }
  }
  window.requestNotificationPermission = requestNotificationPermission;

  // Synthesized audio chimes for phone alerts
  function playNotificationSound(type) {
    try {
      const audio = new Audio('assets/notification.wav');
      audio.volume = 0.85;
      audio.play().catch(() => {});
    } catch (_) {}

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'blood' || type === 'emergency') {
        // High priority alarm tone
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.setValueAtTime(700, ctx.currentTime + 0.15);
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.65);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.65);
      } else {
        // Pleasant bell chime for message / help alert
        osc.type = 'sine';
        osc.frequency.setValueAtTime(783.99, ctx.currentTime);
        osc.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.35, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.55);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.55);
      }
    } catch (_) {}
  }

  // Native phone notification, audio chime, vibration & in-app banner
  async function sendNativePhoneNotification(title, body, extraData = {}) {
    const type = extraData.type || 'info';

    // 1. Android Native Status-Bar / Web Push Notification
    if (!extraData.skipNativeSchedule) {
      try {
        if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.LocalNotifications) {
          await window.Capacitor.Plugins.LocalNotifications.schedule({
            notifications: [
              {
                title: title,
                body: body,
                id: Math.floor(Math.random() * 900000) + 100000,
                schedule: { at: new Date(Date.now() + 50) },
                channelId: 'nammude_naadu_alerts',
                smallIcon: 'ic_launcher',
                sound: 'notification_sound.wav',
                extra: extraData
              }
            ]
          });
        } else if ('serviceWorker' in navigator && typeof Notification !== 'undefined' && Notification.permission === 'granted') {
          // Standard Web Push via ServiceWorker registration (Required for Chrome mobile status bar)
          const reg = await navigator.serviceWorker.ready;
          if (reg && typeof reg.showNotification === 'function') {
            await reg.showNotification(title, {
              body: body,
              icon: 'img/kerala-splash.jpg',
              badge: 'img/kerala-splash.jpg',
              vibrate: type === 'blood' ? [400, 200, 400, 200, 400] : [300, 150, 300],
              data: extraData,
              tag: extraData.tag || ('nn_' + Date.now()),
              renotify: true
            });
          } else {
            new Notification(title, { body: body, icon: 'img/kerala-splash.jpg' });
          }
        } else if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
          new Notification(title, { body: body, icon: 'img/kerala-splash.jpg' });
        }
      } catch (e) {
        console.warn('Native notification trigger note:', e.message);
      }
    }

    // 2. Phone Vibration
    try {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        if (type === 'blood') {
          navigator.vibrate([400, 200, 400, 200, 400]);
        } else if (type === 'service') {
          navigator.vibrate([300, 150, 300]);
        } else {
          navigator.vibrate([200, 100, 200]);
        }
      }
    } catch (_) {}

    // 3. Audio Chime
    playNotificationSound(type);

    // 4. In-App Heads-Up Banner
    showInAppAlertBanner(title, body, extraData);
  }
  window.sendNativePhoneNotification = sendNativePhoneNotification;

  function showInAppAlertBanner(title, body, extraData = {}) {
    const existing = document.getElementById('activeInAppAlertBanner');
    if (existing) existing.remove();

    const banner = document.createElement('div');
    banner.id = 'activeInAppAlertBanner';
    banner.className = 'inapp-notification-banner ' + (extraData.type || '');

    let icon = '🔔';
    if (extraData.type === 'blood') icon = '🩸';
    else if (extraData.type === 'service') icon = '🛠️';
    else if (extraData.type === 'chat') icon = '💬';

    const isEmergencyOrAmbulance = extraData.type === 'emergency' || extraData.type === 'ambulance';
    const phoneLink = (isEmergencyOrAmbulance && extraData.phone) ? ('<a href="tel:' + extraData.phone + '" class="inapp-banner-call-btn" onclick="event.stopPropagation()">📞 വിളിക്കുക</a>') : '';
    const serviceAcceptBtn = (extraData.type === 'service' && extraData.phone)
      ? `<button type="button" class="inapp-banner-accept-btn" onclick="event.stopPropagation(); if(typeof acceptServiceRequestAsWorker==='function'){ acceptServiceRequestAsWorker('${extraData.serviceId || ''}', '${extraData.phone}', '${extraData.trade || ''}'); } this.closest('.inapp-notification-banner')?.remove();" style="background:#16A34A;color:#FFFFFF;border:none;border-radius:10px;padding:6px 12px;font-size:11.5px;font-weight:900;cursor:pointer;white-space:nowrap;box-shadow:0 2px 6px rgba(22,163,74,0.3)">🟢 തയ്യാറാണ്</button>`
      : '';

    banner.innerHTML = `
      <div class="inapp-banner-icon">${icon}</div>
      <div class="inapp-banner-content">
        <div class="inapp-banner-title">${escapeHtml(title)}</div>
        <div class="inapp-banner-body">${escapeHtml(body)}</div>
      </div>
      <div class="inapp-banner-actions">
        ${phoneLink}
        ${serviceAcceptBtn}
        <button class="inapp-banner-close-btn" onclick="event.stopPropagation(); this.closest('.inapp-notification-banner').remove();">✕</button>
      </div>
    `;

    banner.onclick = () => {
      if (extraData.type === 'blood') {
        if (typeof navTo === 'function') navTo('blood');
      } else if (extraData.type === 'chat') {
        if (extraData.chatKey && typeof openChatModal === 'function' && typeof APP_STATE !== 'undefined' && APP_STATE.chatMeta && APP_STATE.chatMeta[extraData.chatKey]) {
          const m = APP_STATE.chatMeta[extraData.chatKey];
          openChatModal(m.name, m.phone, m.avatar, '', m.recipientId, extraData.chatKey);
        } else if (typeof navTo === 'function') {
          navTo('chat');
        }
      } else if (extraData.type === 'service') {
        if (typeof navTo === 'function') navTo('services');
      }
      banner.remove();
    };

    document.body.appendChild(banner);

    setTimeout(() => {
      if (banner && banner.parentNode) {
        banner.style.animation = 'bannerSlideOut 0.3s ease forwards';
        setTimeout(() => banner.remove(), 300);
      }
    }, 8500);
  }
  window.showInAppAlertBanner = showInAppAlertBanner;

  function handleIncomingServiceRequest(row) {
    if (!row) return;
    const myPhone = (typeof APP_STATE !== 'undefined' && APP_STATE.currentUser && APP_STATE.currentUser.phone)
      ? APP_STATE.currentUser.phone.replace(/\D/g, '').slice(-10) : '';
    const reqPhone = (row.phone ? String(row.phone).replace(/\D/g, '').slice(-10) : '');

    // Don't notify self
    if (reqPhone && myPhone && reqPhone === myPhone) return;

    const provPhone = (row.provider_phone ? String(row.provider_phone).replace(/\D/g, '').slice(-10) : '');
    const isDirectEnquiry = provPhone && myPhone && provPhone === myPhone;

    const myServices = (typeof APP_STATE !== 'undefined' && Array.isArray(APP_STATE.services)) ? APP_STATE.services.filter(s => {
      const sp = (s.phone ? String(s.phone).replace(/\D/g, '').slice(-10) : '');
      const sId = s.userId || s.authorId;
      const myId = APP_STATE.currentUser && APP_STATE.currentUser.id;
      return (sp && myPhone && sp === myPhone) || (myId && sId && myId === sId) || s.isUserCreated;
    }) : [];

    const isMatchingService = myServices.some(s => {
      const catMatch = s.category && row.category && (s.category === row.category);
      const sTrade = (s.trade || '').toLowerCase();
      const rTrade = (row.trade || '').toLowerCase();
      const tradeMatch = sTrade && rTrade && (sTrade.includes(rTrade) || rTrade.includes(sTrade));
      return catMatch || tradeMatch;
    });

    // STRICT: Only notify if direct enquiry to current user OR matching registered service!
    if (!isDirectEnquiry && !isMatchingService) {
      return;
    }

    const title = isDirectEnquiry 
      ? '🛠️ നിങ്ങളുടെ സർവീസിന് പുതിയ നേരിട്ടുള്ള അന്വേഷണം!'
      : (`🛠️ പുതിയ ${row.trade || 'സർവീസ്'} ആവശ്യം എത്തിയിട്ടുണ്ട്!`);
    const body = `📍 ${row.location || 'തത്സമയ ലൊക്കേഷൻ'}: "${row.description || row.title || 'സഹായം വേണം'}". കസ്റ്റമർ: ${row.phone}`;

    sendNativePhoneNotification(title, body, {
      type: 'service',
      phone: row.phone,
      trade: row.trade,
      serviceId: row.id
    });

    if (typeof APP_STATE !== 'undefined') {
      if (!APP_STATE.serviceRequests) APP_STATE.serviceRequests = [];
      const exists = APP_STATE.serviceRequests.some(r => r.id === row.id);
      if (!exists) {
        APP_STATE.serviceRequests.unshift({
          id: row.id,
          category: row.category || 'other',
          categoryName: row.trade,
          description: row.description || row.title,
          location: row.location,
          phone: row.phone,
          urgency: row.urgency || 'urgent',
          photo: row.image_url,
          status: row.status || 'broadcasting',
          isReceivedEnquiry: true,
          timestamp: Number(row.created_at) || Date.now()
        });
        if (typeof renderActiveServiceTracker === 'function') {
          renderActiveServiceTracker();
        }
      }
    }
  }

  // Normalize blood group string (e.g. "O +ve", "O+", "O Positive" -> "O+")
  function normalizeBloodGroup(bg) {
    if (!bg) return '';
    let s = String(bg).toUpperCase().trim();
    s = s.replace(/POSITIVE|POS|\+VE/g, '+');
    s = s.replace(/NEGATIVE|NEG|\-VE/g, '-');
    s = s.replace(/\s+/g, '');
    return s;
  }

  // Get current logged-in user's blood group
  function getUserBloodGroup() {
    if (typeof APP_STATE !== 'undefined' && APP_STATE.currentUser) {
      if (APP_STATE.currentUser.bloodGroup) return APP_STATE.currentUser.bloodGroup;
      if (APP_STATE.currentUser.blood) return APP_STATE.currentUser.blood;
      const userPhone = APP_STATE.currentUser.phone ? String(APP_STATE.currentUser.phone).replace(/\D/g, '').slice(-10) : '';
      if (userPhone && Array.isArray(APP_STATE.bloodDonors)) {
        const donor = APP_STATE.bloodDonors.find(d => d.phone && String(d.phone).replace(/\D/g, '').slice(-10) === userPhone);
        if (donor && donor.group) return donor.group;
      }
    }
    try {
      const stored = localStorage.getItem('nn_user_blood');
      if (stored) return stored;
    } catch (_) {}
    return '';
  }

  // Strict check: Only notify users who have THAT exact matching blood group
  function isMatchingBloodGroup(requestedGroup, userGroup) {
    const req = normalizeBloodGroup(requestedGroup);
    const user = normalizeBloodGroup(userGroup);
    if (!req || !user) return false;
    return req === user;
  }

  function handleIncomingBloodRequest(row) {
    if (!row) return;

    const reqId = row.id || ('breq_' + Date.now());
    const reqBloodGroup = row.blood_group || row.bloodGroup || row.group || '';
    const reqPhone = (row.contact_phone || row.phone ? String(row.contact_phone || row.phone).replace(/\D/g, '').slice(-10) : '');
    const hospital = row.hospital || 'ആശുപത്രി';
    const location = row.location || 'കേരളം';
    const patient = row.patient_name || row.patientName || 'രോഗി';
    const units = row.units || '1';

    // 1. Always record in local bloodRequests store so it appears in Blood Requests list
    if (typeof APP_STATE !== 'undefined') {
      if (!APP_STATE.bloodRequests) APP_STATE.bloodRequests = [];
      const exists = APP_STATE.bloodRequests.some(r => r.id === reqId);
      if (!exists) {
        APP_STATE.bloodRequests.unshift({
          id: reqId,
          patient: patient,
          hospital: hospital,
          group: reqBloodGroup,
          units: units,
          phone: row.contact_phone || row.phone || '',
          location: location,
          status: row.status || 'urgent',
          timestamp: Number(row.created_at) || Date.now()
        });
        try {
          localStorage.setItem('nn_blood_requests', JSON.stringify(APP_STATE.bloodRequests));
        } catch (_) {}
      }
      if (typeof renderBloodScreen === 'function' && APP_STATE.currentScreen === 'blood') {
        renderBloodScreen();
      }
    }

    // 2. Don't notify requester self
    const myPhone = (typeof APP_STATE !== 'undefined' && APP_STATE.currentUser && APP_STATE.currentUser.phone)
      ? APP_STATE.currentUser.phone.replace(/\D/g, '').slice(-10) : '';
    if (reqPhone && myPhone && reqPhone === myPhone) return;

    // 3. TARGETED NOTIFICATION: Only users who have THIS exact matching blood group!
    const userBlood = getUserBloodGroup();
    if (!isMatchingBloodGroup(reqBloodGroup, userBlood)) {
      console.info(`ℹ️ [Blood Alert Filtered]: Request is for ${reqBloodGroup}, but current user blood group is '${userBlood || "not set"}'. Notification skipped.`);
      return;
    }

    // 4. PREVENT DUPLICATE SCHEDULING for the same blood request
    const notifDedupeKey = 'nn_blood_notif_done_' + reqId;
    if (sessionStorage.getItem(notifDedupeKey)) return;
    sessionStorage.setItem(notifDedupeKey, String(Date.now()));

    // 5. FIRST NOTIFICATION (Immediate - 1/2)
    const title1 = `🚨 അടിയന്തര ${reqBloodGroup} രക്ത ആവശ്യം! (1/2)`;
    const body1 = `🏥 ${hospital} (${location}) - രോഗി ${patient}ക്ക് ${reqBloodGroup} രക്തം അടിയന്തിരമായി വേണം! വിളിക്കുക: ${row.contact_phone || row.phone}`;

    sendNativePhoneNotification(title1, body1, {
      type: 'blood',
      phone: row.contact_phone || row.phone,
      patient: patient,
      group: reqBloodGroup,
      hospital: hospital,
      attempt: 1
    });

    // 6. SECOND NOTIFICATION (5 Minutes Interval Reminder - 2/2 - 2 തവണ 5 മിനിറ്റ് ഇടവിട്ട്)
    const FIVE_MINUTES_MS = 5 * 60 * 1000;
    const title2 = `🚨 അടിയന്തര ${reqBloodGroup} രക്ത ആവശ്യം (ഓർമ്മപ്പെടുത്തൽ 2/2)!`;
    const body2 = `🏥 ${hospital} - ${reqBloodGroup} രക്തം അടിയന്തിരമായി ആവശ്യമുണ്ട്. ദയവായി രോഗിയെ സഹായിക്കാൻ സാധിക്കുമെങ്കിൽ വിളിക്കുക: ${row.contact_phone || row.phone}`;
    const secondNotifTime = new Date(Date.now() + FIVE_MINUTES_MS);

    // Schedule 2nd notification on Android Native Notification Manager (fires even if app closed)
    try {
      if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.LocalNotifications) {
        const notifId2 = Math.floor(Math.random() * 800000) + 200000;
        window.Capacitor.Plugins.LocalNotifications.schedule({
          notifications: [
            {
              title: title2,
              body: body2,
              id: notifId2,
              schedule: { at: secondNotifTime },
              smallIcon: 'ic_launcher',
              sound: 'res://raw/beep.wav',
              extra: {
                type: 'blood',
                phone: row.contact_phone || row.phone,
                group: reqBloodGroup,
                hospital: hospital,
                attempt: 2,
                isReminder: true
              }
            }
          ]
        });
        console.info(`⏰ [Supabase Blood] 2nd reminder scheduled in 5 mins at ${secondNotifTime.toLocaleTimeString()}`);
      }
    } catch (schedErr) {
      console.warn('Capacitor schedule 2nd reminder error:', schedErr);
    }

    // In-app fallback timer: if app is open after 5 mins, ring sound & vibrate & show banner
    setTimeout(() => {
      const currentBg = getUserBloodGroup();
      if (!isMatchingBloodGroup(reqBloodGroup, currentBg)) return;

      sendNativePhoneNotification(title2, body2, {
        type: 'blood',
        phone: row.contact_phone || row.phone,
        patient: patient,
        group: reqBloodGroup,
        hospital: hospital,
        attempt: 2,
        isReminder: true,
        skipNativeSchedule: true
      });
    }, FIVE_MINUTES_MS);
  }

  // Database Row-Level Realtime Subscriptions (Unified multiplexed channel for sub-second sync)
  function setupDatabaseListeners() {
    if (!client) return;
    try {
      if (dbChangesChannel) {
        try { dbChangesChannel.unsubscribe(); } catch (_) {}
      }
      dbChangesChannel = client.channel('public:db_all_changes')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' }, payload => {
          if (payload && payload.new) {
            const row = payload.new;
            const mappedPost = {
              id: row.id,
              authorName: row.author_name,
              authorPhone: row.author_phone,
              authorAvatar: row.author_avatar,
              authorId: row.user_id,
              content: row.content,
              category: row.category || 'announcement',
              type: row.category || 'announcement',
              image: row.image_url,
              imageUrl: row.image_url,
              locationName: row.location_name,
              district: row.district,
              lat: row.latitude,
              lon: row.longitude,
              latitude: row.latitude,
              longitude: row.longitude,
              timestamp: Number(row.created_at) || Date.now()
            };
            handleIncomingPost({ post: mappedPost });
          }
        })
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'services' }, payload => {
          if (payload && payload.new) {
            const row = payload.new;
            const mappedService = {
              id: row.id,
              name: row.name,
              trade: row.trade,
              category: row.category || 'other',
              phone: row.phone,
              location: row.location,
              district: row.district,
              lat: row.latitude,
              lon: row.longitude,
              latitude: row.latitude,
              longitude: row.longitude,
              avatar: row.avatar,
              experience: row.experience,
              visitingFee: row.visiting_fee,
              availability: row.availability || 'available',
              workHours: row.work_hours,
              rating: Number(row.rating) || 5.0,
              createdAt: Number(row.created_at) || Date.now()
            };
            handleIncomingService({ service: mappedService });
          }
        })
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'service_requests' }, payload => {
          if (payload && payload.new) {
            handleIncomingServiceRequest(payload.new);
          }
        })
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'blood_requests' }, payload => {
          if (payload && payload.new) {
            handleIncomingBloodRequest(payload.new);
          }
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, payload => {
          if (payload.eventType === 'DELETE' && payload.old) {
            handleIncomingChatMessageDeleted({ msgId: payload.old.id });
            return;
          }
          if (payload && payload.new) {
            const row = payload.new;
            if (row.text === '[deleted]') {
              handleIncomingChatMessageDeleted({ chatKey: row.chat_key, msgId: row.id });
              return;
            }
            if (row.text === '[read_receipt]') {
              handleIncomingChatSeen({
                chatKey: row.chat_key,
                readerPhone: row.sender_phone,
                readerId: row.sender_id,
                seenAt: Number(row.created_at) || Date.now()
              });
              return;
            }
            const chatKey = row.chat_key;
            const msgObj = {
              id: row.id,
              senderId: row.sender_id,
              senderName: row.sender_name || 'സുഹൃത്ത്',
              senderPhone: row.sender_phone || '',
              senderAvatar: row.sender_avatar || '',
              text: row.text,
              time: row.time || new Date(Number(row.created_at) || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              timestamp: Number(row.created_at) || Date.now()
            };
            const metaObj = {
              recipientId: row.recipient_id || '',
              recipientName: row.recipient_name || '',
              recipientPhone: row.recipient_phone || '',
              senderId: row.sender_id,
              senderName: row.sender_name || 'സുഹൃത്ത്',
              senderPhone: row.sender_phone || '',
              senderAvatar: row.sender_avatar || ''
            };
            handleIncomingChatMessage({ chatKey, msgObj, metaObj });
          }
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'jobs' }, payload => {
          if (payload && payload.new) {
            handleIncomingJob(payload.new);
          }
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'rentals' }, payload => {
          if (payload && payload.new) {
            handleIncomingRental(payload.new);
          }
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'emergency_contacts' }, payload => {
          if (payload && payload.new) {
            handleIncomingEmergencyContact(payload.new);
          }
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, payload => {
          if (payload && payload.new) {
            handleIncomingProfile(payload.new);
          }
        })
        .subscribe();
    } catch (e) {
      console.warn('ℹ️ [Supabase Realtime DB Listeners note]:', e.message);
    }
  }

  // Handle incoming real-time chat message from another user
  function handleIncomingChatMessage(payload) {
    if (!payload || !payload.chatKey || !payload.msgObj) return;
    const { chatKey, msgObj, metaObj } = payload;

    const myId = (typeof APP_STATE !== 'undefined' && APP_STATE.currentUser) ? APP_STATE.currentUser.id : '';
    const myPhone = (typeof APP_STATE !== 'undefined' && APP_STATE.currentUser && APP_STATE.currentUser.phone)
      ? APP_STATE.currentUser.phone.replace(/\D/g, '').slice(-10) : '';
    const myEmail = (typeof APP_STATE !== 'undefined' && APP_STATE.currentUser && APP_STATE.currentUser.email)
      ? APP_STATE.currentUser.email.trim().toLowerCase() : '';

    const senderPhone = (msgObj.senderPhone ? String(msgObj.senderPhone).replace(/\D/g, '').slice(-10) : '');
    const senderId = msgObj.senderId || '';
    const senderEmail = (msgObj.senderEmail ? String(msgObj.senderEmail).trim().toLowerCase() : '');

    // 1. SENDER ECHO CHECK: If current user sent this, NEVER process as incoming 'them' message!
    const isSenderEcho = Boolean(
      (msgObj.sessionId && msgObj.sessionId === SESSION_CLIENT_ID) ||
      (myId && senderId && myId === senderId) ||
      (myPhone && senderPhone && myPhone === senderPhone) ||
      (myEmail && senderEmail && myEmail === senderEmail)
    );
    if (isSenderEcho) {
      // Message was sent by me - ensure local status is 'sent' / 'delivered' and NEVER insert as 'them'
      if (typeof APP_STATE !== 'undefined' && APP_STATE.chats && APP_STATE.chats[chatKey]) {
        const localMsg = APP_STATE.chats[chatKey].find(m => m.id === msgObj.id || (m.timestamp === msgObj.timestamp && m.text === msgObj.text));
        if (localMsg) {
          localMsg.sender = 'me';
          if (!localMsg.status || localMsg.status === 'sending') localMsg.status = 'sent';
        }
      }
      return;
    }

    // 2. RECIPIENT VERIFICATION: Strictly ensure ONLY the intended recipient receives this message!
    const recPhone = (metaObj && metaObj.recipientPhone ? String(metaObj.recipientPhone).replace(/\D/g, '').slice(-10) : '') ||
                    (msgObj.recipientPhone ? String(msgObj.recipientPhone).replace(/\D/g, '').slice(-10) : '');
    const recId = (metaObj && metaObj.recipientId ? metaObj.recipientId : '') || (msgObj.recipientId || '');
    const recEmail = (metaObj && metaObj.recipientEmail ? String(metaObj.recipientEmail).trim().toLowerCase() : '') ||
                     (msgObj.recipientEmail ? String(msgObj.recipientEmail).trim().toLowerCase() : '');

    const phones = String(chatKey).match(/\d{10}/g) || [];
    const isRecPhoneMatch = Boolean(myPhone && recPhone && myPhone.length === 10 && myPhone === recPhone);
    const isPhoneInKeyMatch = Boolean(myPhone && myPhone.length === 10 && phones.length >= 2 && phones.includes(myPhone));
    const isRecIdMatch = Boolean(myId && recId && myId === recId);
    const isRecEmailMatch = Boolean(myEmail && recEmail && myEmail.includes('@') && myEmail === recEmail);

    const cleanMyId = myId ? myId.replace(/[^a-zA-Z0-9]/g, '') : '';
    const keyParts = String(chatKey).replace(/^chat_/, '').split('_');
    const isIdInKeyMatch = Boolean(cleanMyId && keyParts.some(p => p === cleanMyId || (myId && p === myId)));

    // STRICT PRIVACY: The message MUST be addressed to this user. Otherwise DISCARD completely!
    const isForMe = isRecPhoneMatch || isPhoneInKeyMatch || isRecIdMatch || isRecEmailMatch || isIdInKeyMatch;
    if (!isForMe) {
      return;
    }

    console.info('📩 [Supabase] Incoming 1-on-1 message for chat:', chatKey, msgObj.text);

    if (typeof APP_STATE !== 'undefined') {
      if (!APP_STATE.chats) APP_STATE.chats = {};
      if (!APP_STATE.chats[chatKey]) APP_STATE.chats[chatKey] = [];

      const exists = APP_STATE.chats[chatKey].some(m => m.id === msgObj.id || (m.timestamp === msgObj.timestamp && m.text === msgObj.text));
      if (!exists) {
        const partnerPhone = (msgObj.senderPhone ? String(msgObj.senderPhone).replace(/\D/g, '').slice(-10) : '') ||
                             (metaObj && metaObj.senderPhone ? String(metaObj.senderPhone).replace(/\D/g, '').slice(-10) : '');
        const partnerName = msgObj.senderName || (metaObj ? metaObj.senderName : 'സുഹൃത്ത്');
        const partnerAvatar = msgObj.senderAvatar || (metaObj ? metaObj.senderAvatar : '');
        const partnerId = msgObj.senderId || (metaObj ? metaObj.senderId : '');

        APP_STATE.chats[chatKey].push({
          id: msgObj.id || ('msg_' + Date.now()),
          sender: 'them',
          senderId: partnerId,
          senderPhone: partnerPhone,
          senderName: partnerName,
          senderAvatar: partnerAvatar,
          recipientId: recId || myId || '',
          recipientPhone: recPhone || myPhone || '',
          text: msgObj.text,
          time: msgObj.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          timestamp: msgObj.timestamp || Date.now()
        });
        APP_STATE.chats[chatKey].sort((a, b) => (Number(a.timestamp) || 0) - (Number(b.timestamp) || 0));

        if (!APP_STATE.chatMeta) APP_STATE.chatMeta = {};
        APP_STATE.chatMeta[chatKey] = {
          name: partnerName,
          phone: partnerPhone,
          avatar: partnerAvatar,
          recipientId: partnerId,
          partnerPhone: partnerPhone,
          partnerName: partnerName,
          myPhone: myPhone || recPhone || '',
          myId: myId || recId || '',
          senderPhone: partnerPhone,
          recipientPhone: recPhone || myPhone || '',
          category: (metaObj && metaObj.category) || (APP_STATE.chatMeta[chatKey]?.category) || '',
          type: (metaObj && metaObj.type) || (APP_STATE.chatMeta[chatKey]?.type) || 'other',
          updatedAt: Date.now()
        };

        if (typeof saveChats === 'function') {
          try { saveChats(true); } catch (_) {}
        }

        // Active chat thread update
        if (APP_STATE.activeChatRecipient && isCurrentChatActive) {
          if (activeKey && activeKey !== chatKey) {
            if (!APP_STATE.chats[activeKey]) APP_STATE.chats[activeKey] = [];
            const activeExists = APP_STATE.chats[activeKey].some(m => m.id === msgObj.id || (m.timestamp === msgObj.timestamp && m.text === msgObj.text));
            if (!activeExists) {
              APP_STATE.chats[activeKey].push({ ...APP_STATE.chats[chatKey][APP_STATE.chats[chatKey].length - 1] });
            }
          }
          if (typeof renderChatMessages === 'function') {
            try { renderChatMessages(); } catch (_) {}
          }
          // Recipient is viewing this thread right now: send immediate read receipt!
          markChatSeen(chatKey, myPhone, myId);
        } else {
          // Update chat badge and central inbox list
          if (typeof updateChatBadgeCounter === 'function') {
            try { updateChatBadgeCounter(); } catch (_) {}
          }
          if (typeof renderChatListScreen === 'function') {
            try { renderChatListScreen(); } catch (_) {}
          }
          // Prominent Toast Notification with sender details
          if (typeof toast === 'function') {
            const senderDisplayName = msgObj.senderName || 'സുഹൃത്ത്';
            const shortMsg = String(msgObj.text || '').substring(0, 32);
            toast(`💬 ${senderDisplayName}: "${shortMsg}" (Chat തുറന്ന് മറുപടി നൽകാം)`);
          }

          // Trigger native phone notification, vibration and chime
          const isServiceEnquiry = msgObj.text && (msgObj.text.includes('സേവന') || msgObj.text.includes('അന്വേഷണം') || msgObj.text.includes('സർവീസ്'));
          const notifTitle = isServiceEnquiry
            ? `🛠️ പുതിയ സർവീസ് അന്വേഷണം! (${msgObj.senderName || 'നാട്ടുകാരൻ'})`
            : `💬 സന്ദേശം: ${msgObj.senderName || 'നാട്ടുകാരൻ'}`;
          const notifBody = msgObj.text;

          sendNativePhoneNotification(notifTitle, notifBody, {
            type: isServiceEnquiry ? 'service' : 'chat',
            phone: msgObj.senderPhone,
            chatKey: chatKey
          });
        }
      }
    }

    if (chatSubscribers.size > 0) {
      chatSubscribers.forEach((callbacks, subKey) => {
        let isMatch = (subKey === chatKey);
        if (!isMatch) {
          const subPhones = String(subKey).match(/\d{10}/g) || [];
          const payPhones = String(chatKey).match(/\d{10}/g) || [];
          if (subPhones.length === 2 && payPhones.length === 2) {
            isMatch = subPhones.sort().join('_') === payPhones.sort().join('_');
          }
        }
        if (isMatch) {
          callbacks.forEach(cb => {
            try {
              if (typeof APP_STATE !== 'undefined' && APP_STATE.chats) {
                const targetMsgs = APP_STATE.chats[subKey] || APP_STATE.chats[chatKey] || [];
                cb(targetMsgs);
              }
            } catch (_) {}
          });
        }
      });
    }
  }

  // Handle incoming real-time seen receipt from recipient
  function handleIncomingChatSeen(payload) {
    if (!payload || !payload.chatKey) return;
    const { chatKey, readerPhone, readerId, seenAt } = payload;
    const myPhone = (typeof APP_STATE !== 'undefined' && APP_STATE.currentUser && APP_STATE.currentUser.phone)
      ? APP_STATE.currentUser.phone.replace(/\D/g, '').slice(-10) : '';

    // Ignore self-echo on the exact same client tab
    if (readerPhone && myPhone && readerPhone === myPhone && payload.sessionId === SESSION_CLIENT_ID) {
      return;
    }

    let targetKey = chatKey;
    if (typeof APP_STATE !== 'undefined' && APP_STATE.chats) {
      if (!APP_STATE.chats[targetKey]) {
        const cleanReader = readerPhone ? String(readerPhone).replace(/\D/g, '').slice(-10) : '';
        const match = Object.keys(APP_STATE.chats).find(k => cleanReader && k.includes(cleanReader));
        if (match) targetKey = match;
      }

      const thread = APP_STATE.chats[targetKey];
      if (Array.isArray(thread) && thread.length > 0) {
        let updated = false;
        const effectiveSeenTime = Number(seenAt) || Date.now();
        thread.forEach(m => {
          if (m.sender === 'me' && m.status !== 'seen') {
            m.status = 'seen';
            m.seen = true;
            m.seenAt = effectiveSeenTime;
            updated = true;
          }
        });

        if (updated) {
          if (typeof saveChats === 'function') {
            try { saveChats(); } catch (_) {}
          }
          const activeKey = APP_STATE.activeChatRecipient?.key;
          const activePhone = APP_STATE.activeChatRecipient?.phone ? String(APP_STATE.activeChatRecipient.phone).replace(/\D/g, '').slice(-10) : '';
          const cleanReader = readerPhone ? String(readerPhone).replace(/\D/g, '').slice(-10) : '';
          const isCurrentChatActive = activeKey === targetKey || (activePhone && cleanReader && activePhone === cleanReader);

          if (APP_STATE.activeChatRecipient && isCurrentChatActive) {
            if (typeof renderChatMessages === 'function') {
              try { renderChatMessages(); } catch (_) {}
            }
            const statusEl = document.getElementById('chatRecipientStatus');
            if (statusEl) {
              const timeStr = new Date(effectiveSeenTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              statusEl.innerHTML = `<span style="color:#53BDEB;font-weight:700">✓✓ കണ്ടു (${timeStr})</span>`;
            }
          }
          if (typeof renderChatListScreen === 'function') {
            try { renderChatListScreen(); } catch (_) {}
          }
        }
      }
    }
  }

  // Handle incoming real-time message deletion (Delete for everyone)
  function handleIncomingChatMessageDeleted(payload) {
    if (!payload || !payload.msgId) return;
    const { chatKey, msgId } = payload;
    if (typeof APP_STATE !== 'undefined' && APP_STATE.chats) {
      let updated = false;
      if (chatKey && APP_STATE.chats[chatKey]) {
        const prevLen = APP_STATE.chats[chatKey].length;
        APP_STATE.chats[chatKey] = APP_STATE.chats[chatKey].filter(m => m && m.id !== msgId);
        if (APP_STATE.chats[chatKey].length !== prevLen) updated = true;
      } else {
        Object.keys(APP_STATE.chats).forEach(k => {
          if (Array.isArray(APP_STATE.chats[k])) {
            const prevLen = APP_STATE.chats[k].length;
            APP_STATE.chats[k] = APP_STATE.chats[k].filter(m => m && m.id !== msgId);
            if (APP_STATE.chats[k].length !== prevLen) updated = true;
          }
        });
      }
      if (updated) {
        if (typeof saveChats === 'function') {
          try { saveChats(); } catch (_) {}
        }
        if (typeof renderChatMessages === 'function') {
          try { renderChatMessages(); } catch (_) {}
        }
        if (typeof renderChatListScreen === 'function') {
          try { renderChatListScreen(); } catch (_) {}
        }
      }
    }
  }
  window.handleIncomingChatMessageDeleted = handleIncomingChatMessageDeleted;

  // Handle incoming post from another user
  function handleIncomingPost(payload) {
    if (!payload || !payload.post) return;
    const post = payload.post;
    if (typeof APP_STATE === 'undefined' || !APP_STATE.posts) return;

    const exists = APP_STATE.posts.some(p => p.id === post.id);
    if (!exists) {
      APP_STATE.posts.unshift(post);
      if (typeof savePosts === 'function') savePosts();
      if (typeof renderCommunityFeed === 'function') renderCommunityFeed();
      if (typeof renderHomeCommunityFeed === 'function') renderHomeCommunityFeed();
      if (typeof renderCommunityScreen === 'function') renderCommunityScreen();
    }
  }

  // Handle incoming service from another user
  function handleIncomingService(payload) {
    if (!payload || !payload.service) return;
    const service = payload.service;
    if (typeof APP_STATE === 'undefined' || !APP_STATE.services) return;

    const exists = APP_STATE.services.some(s => s.id === service.id || (s.phone && service.phone && s.phone === service.phone && s.trade === service.trade));
    if (!exists) {
      APP_STATE.services.unshift(service);
      if (typeof saveServices === 'function') saveServices();
      if (typeof renderServicesScreen === 'function' && APP_STATE.currentScreen === 'services') {
        renderServicesScreen();
      }
      if (typeof renderNearbyScreen === 'function' && APP_STATE.currentScreen === 'nearby') {
        renderNearbyScreen();
      }
      if (typeof renderHomeScreen === 'function' && APP_STATE.currentScreen === 'home') {
        renderHomeScreen();
      }
    }
  }

  // Handle incoming job from broadcast or postgres_changes
  function handleIncomingJob(j) {
    if (!j || !j.title) return;
    const mapped = {
      id: j.id || ('job_' + Date.now()),
      title: j.title,
      employer: j.employer || 'തൊഴിൽദാതാവ്',
      employerPhone: j.phone || j.employerPhone || '',
      phone: j.phone || j.employerPhone || '',
      category: j.category || 'other',
      salary: j.salary || 'ശമ്പളം സംസാരിക്കാം',
      type: 'ഫുൾ ടൈം',
      location: j.location || (typeof APP_STATE !== 'undefined' && APP_STATE.location ? APP_STATE.location.name : 'കേരളം'),
      district: j.district || (typeof APP_STATE !== 'undefined' && APP_STATE.location ? APP_STATE.location.district : '') || '',
      lat: j.latitude || j.lat || 11.8745,
      lon: j.longitude || j.lon || 75.3704,
      description: j.description || '',
      createdAt: Number(j.created_at) || Date.now(),
      isCloud: true
    };

    if (typeof APP_STATE !== 'undefined' && Array.isArray(APP_STATE.jobs)) {
      const idx = APP_STATE.jobs.findIndex(jb => jb.id === mapped.id || (jb.title === mapped.title && jb.employerPhone === mapped.employerPhone));
      if (idx >= 0) {
        APP_STATE.jobs[idx] = { ...APP_STATE.jobs[idx], ...mapped };
      } else {
        APP_STATE.jobs.unshift(mapped);
      }
      try {
        localStorage.setItem('nn_jobs', JSON.stringify(APP_STATE.jobs));
      } catch (_) {}
      if (typeof renderJobsScreen === 'function' && APP_STATE.currentScreen === 'jobs') {
        renderJobsScreen();
      }
    }
  }

  // Handle incoming rental from broadcast or postgres_changes
  function handleIncomingRental(r) {
    if (!r || !r.title) return;
    const mapped = {
      id: r.id || ('rent_' + Date.now()),
      title: r.title,
      owner: r.owner || r.authorName || 'നാട്ടുകാരൻ',
      authorName: r.owner || r.authorName || 'നാട്ടുകാരൻ',
      type: r.type || 'house',
      category: r.category || 'rent',
      price: r.price || '',
      deposit: r.deposit || '',
      phone: r.phone || '',
      location: r.location || (typeof APP_STATE !== 'undefined' && APP_STATE.location ? APP_STATE.location.name : 'കേരളം'),
      district: r.district || (typeof APP_STATE !== 'undefined' && APP_STATE.location ? APP_STATE.location.district : '') || '',
      lat: r.latitude || r.lat || 11.8745,
      lon: r.longitude || r.lon || 75.3704,
      imageUrl: r.image_url || r.imageUrl || '',
      image: r.image_url || r.imageUrl || '',
      description: r.description || '',
      createdAt: Number(r.created_at) || Date.now(),
      isCloud: true
    };

    if (typeof APP_STATE !== 'undefined' && Array.isArray(APP_STATE.rentals)) {
      const idx = APP_STATE.rentals.findIndex(item => item.id === mapped.id || (item.title === mapped.title && item.phone === mapped.phone));
      if (idx >= 0) {
        APP_STATE.rentals[idx] = { ...APP_STATE.rentals[idx], ...mapped };
      } else {
        APP_STATE.rentals.unshift(mapped);
      }
      try {
        localStorage.setItem('nn_rentals', JSON.stringify(APP_STATE.rentals));
      } catch (_) {}
      if (typeof renderRentalsScreen === 'function' && APP_STATE.currentScreen === 'rentals') {
        renderRentalsScreen();
      }
    }
  }

  // Handle incoming emergency contact from broadcast or postgres_changes
  function handleIncomingEmergencyContact(c) {
    if (!c) return;
    if (c.id === 'app_setting_splash_bg' || c.name === 'Splash Background Image' || c.category === 'app_setting_splash_bg') {
      const splashUrl = c.description || c.location;
      if (splashUrl) {
        try {
          localStorage.setItem('nn_app_splash_bg', splashUrl);
        } catch (_) {}
        const splashEl = document.getElementById('splashMainBgImage');
        if (splashEl) splashEl.src = splashUrl;
      }
      return;
    }
    if (c.id === 'app_setting_home_banner' || c.category === 'app_setting_home_banner') {
      const art = c.icon || c.description;
      if (art) {
        try { localStorage.setItem('thuna_custom_village_banner_art', art); } catch (_) {}
      }
      if (c.name || c.title) {
        try { localStorage.setItem('thuna_custom_village_banner_title', c.name || c.title); } catch (_) {}
      }
      if (c.badge) {
        try { localStorage.setItem('thuna_custom_village_banner_sub', c.badge); } catch (_) {}
      }
      if (c.phone) {
        try { localStorage.setItem('thuna_custom_village_banner_phone', c.phone); } catch (_) {}
      }
      if (c.location) {
        try { localStorage.setItem('thuna_custom_village_banner_link', c.location); } catch (_) {}
      }
      if (c.description && c.icon) {
        try { localStorage.setItem('thuna_custom_village_banner_desc', c.description); } catch (_) {}
      }
      if (typeof renderAdByIndex === 'function') {
        renderAdByIndex(0);
      }
      return;
    }
    if (!c.title && !c.name) return;
    const mapped = {
      id: c.id || ('emg_' + Date.now()),
      title: c.title || c.name,
      category: c.category || 'അടിയന്തിരം',
      phone: c.phone || '',
      icon: c.icon || '📞',
      badge: c.badge || 'സഹായം',
      location: c.location || (typeof APP_STATE !== 'undefined' && APP_STATE.location ? APP_STATE.location.name : 'കേരളം'),
      district: c.district || (typeof APP_STATE !== 'undefined' && APP_STATE.location ? APP_STATE.location.district : '') || '',
      description: c.description || '',
      createdAt: Number(c.created_at) || Date.now(),
      isCloud: true
    };

    if (typeof APP_STATE !== 'undefined') {
      if (!Array.isArray(APP_STATE.emergencyContacts)) {
        APP_STATE.emergencyContacts = (typeof DEFAULT_EMERGENCY_CONTACTS !== 'undefined') ? [...DEFAULT_EMERGENCY_CONTACTS] : [];
      }
      const idx = APP_STATE.emergencyContacts.findIndex(item => item.id === mapped.id || (item.title === mapped.title && item.phone === mapped.phone));
      if (idx >= 0) {
        APP_STATE.emergencyContacts[idx] = { ...APP_STATE.emergencyContacts[idx], ...mapped };
      } else {
        APP_STATE.emergencyContacts.push(mapped);
      }
      try {
        localStorage.setItem('nn_emergency_contacts', JSON.stringify(APP_STATE.emergencyContacts));
      } catch (_) {}
      if (typeof renderEmergencyModalList === 'function') {
        renderEmergencyModalList();
      }
    }
  }

  // Handle incoming registered citizen profile from realtime postgres_changes
  function handleIncomingProfile(p) {
    if (!p) return;
    const profileObj = {
      id: p.id,
      name: p.name || 'നാട്ടുകാരൻ',
      phone: p.phone || '',
      location: p.place || 'കേരളം',
      avatar: p.avatar || '',
      bloodGroup: p.blood_group || 'O+',
      lat: p.latitude,
      lon: p.longitude,
      latitude: p.latitude,
      longitude: p.longitude,
      isDonor: p.is_donor
    };

    if (typeof APP_STATE !== 'undefined') {
      if (!Array.isArray(APP_STATE.cloudProfiles)) APP_STATE.cloudProfiles = [];
      const cleanPhone = (profileObj.phone || '').replace(/\D/g, '').slice(-10);
      const idx = APP_STATE.cloudProfiles.findIndex(item => 
        (item.id && item.id === profileObj.id) ||
        (cleanPhone && item.phone && item.phone.replace(/\D/g, '').slice(-10) === cleanPhone)
      );

      if (idx >= 0) {
        APP_STATE.cloudProfiles[idx] = { ...APP_STATE.cloudProfiles[idx], ...profileObj };
      } else {
        APP_STATE.cloudProfiles.unshift(profileObj);
      }

      try {
        localStorage.setItem('nn_cloud_profiles', JSON.stringify(APP_STATE.cloudProfiles.slice(0, 100)));
      } catch (_) {}

      // Refresh screens that display registered user photos
      if (APP_STATE.currentScreen === 'nearby' && typeof renderNearbyScreen === 'function') {
        renderNearbyScreen();
      }
      if (APP_STATE.currentScreen === 'blood' && typeof renderBloodDonorsList === 'function') {
        renderBloodDonorsList();
      }
      if (APP_STATE.currentScreen === 'home' && typeof renderHomeCommunityFeed === 'function') {
        renderHomeCommunityFeed();
      }
      if (APP_STATE.currentScreen === 'community' && typeof renderCommunityFeed === 'function') {
        renderCommunityFeed();
      }
    }
  }

  // =========================================================================
  // PUBLIC SUPABASE SERVICES API
  // =========================================================================

  // 1. CHAT
  async function sendChatMessage(chatKey, msgObj, metaObj) {
    if (!chatKey || !msgObj) return false;
    initSupabase();

    if (!msgObj.sessionId) {
      msgObj.sessionId = SESSION_CLIENT_ID;
    }

    // Direct peer thread broadcast (sub-50ms peer-to-peer delivery)
    if (client) {
      try {
        const directThread = client.channel('th_' + chatKey);
        directThread.send({
          type: 'broadcast',
          event: 'chat_message',
          payload: { chatKey, msgObj, metaObj }
        }).catch(() => {});
      } catch (_) {}
    }

    // Ensure main chat channel is active
    if (!chatChannel || chatChannel.state !== 'joined') {
      try { setupRealtimeChannels(); } catch (_) {}
    }

    // Parallel broadcast (sub-50ms) + persistent DB insert
    const broadcastPromise = chatChannel
      ? chatChannel.send({
          type: 'broadcast',
          event: 'chat_message',
          payload: { chatKey, msgObj, metaObj }
        }).catch(err => console.warn('⚠️ [Supabase Chat Broadcast]', err.message))
      : Promise.resolve();

    const dbPromise = client
      ? client.from('messages').insert({
          id: msgObj.id || ('msg_' + Date.now()),
          chat_key: chatKey,
          sender_id: msgObj.senderId || '',
          sender_name: msgObj.senderName || '',
          sender_phone: msgObj.senderPhone || '',
          sender_avatar: msgObj.senderAvatar || '',
          recipient_id: metaObj ? metaObj.recipientId : '',
          recipient_name: metaObj ? metaObj.recipientName : '',
          recipient_phone: metaObj ? metaObj.recipientPhone : '',
          text: msgObj.text || '',
          time: msgObj.time || '',
          created_at: msgObj.timestamp || Date.now()
        }).catch(e => console.info('ℹ️ [Supabase Messages Table note]:', e.message))
      : Promise.resolve();

    await Promise.allSettled([broadcastPromise, dbPromise]);
    return true;
  }

  async function broadcastChatEvent(chatKey, eventName, payload) {
    if (!chatKey || !eventName) return false;
    initSupabase();
    if (chatChannel) {
      try {
        await chatChannel.send({
          type: 'broadcast',
          event: eventName,
          payload: { chatKey, ...payload }
        });
        return true;
      } catch (err) {
        console.warn('⚠️ [Supabase Chat Broadcast Event Error]:', err.message);
      }
    }
    return false;
  }

  async function markChatSeen(chatKey, readerPhone, readerId) {
    if (!chatKey) return false;
    initSupabase();
    const seenAt = Date.now();

    if (chatChannel) {
      try {
        await chatChannel.send({
          type: 'broadcast',
          event: 'chat_seen',
          payload: { chatKey, readerPhone, readerId, seenAt, sessionId: SESSION_CLIENT_ID }
        });
      } catch (err) {
        console.warn('⚠️ [Supabase Chat Seen Broadcast]', err.message);
      }
    }
    return true;
  }

  // Delete message for everyone from Supabase database & notify peer clients in realtime
  async function deleteChatMessageForEveryone(chatKey, msgId) {
    if (!msgId) return false;
    initSupabase();
    updateClientCitizenHeaders();

    const myPhone = (typeof APP_STATE !== 'undefined' && APP_STATE.currentUser && APP_STATE.currentUser.phone)
      ? String(APP_STATE.currentUser.phone).replace(/\D/g, '').slice(-10) : '';
    const myId = (typeof APP_STATE !== 'undefined' && APP_STATE.currentUser) ? String(APP_STATE.currentUser.id) : '';

    if (client) {
      try {
        // 1. Try secure stored procedure with strict sender check
        const { error: rpcErr } = await client.rpc('delete_chat_message', {
          p_msg_id: msgId,
          p_sender_phone: myPhone,
          p_sender_id: myId
        });
        if (rpcErr) {
          // 2. Fallback to direct DELETE (enforced by RLS)
          let delQ = client.from('messages').delete().eq('id', msgId);
          if (myPhone) {
            delQ = delQ.or(`sender_phone.ilike.%${myPhone}%,sender_id.eq.${myId || 'none'}`);
          }
          await delQ;
        }
      } catch (err) {
        console.warn('⚠️ [Supabase Delete Message Error]:', err.message);
      }
    }
    if (chatChannel) {
      try {
        await chatChannel.send({
          type: 'broadcast',
          event: 'chat_message_deleted',
          payload: { chatKey, msgId, sessionId: SESSION_CLIENT_ID }
        });
      } catch (err) {
        console.warn('⚠️ [Supabase Chat Deleted Broadcast Error]:', err.message);
      }
    }
    return true;
  }

  function subscribeChatThread(chatKey, onMessagesUpdate) {
    if (!chatKey) return () => {};
    initSupabase();

    if (!chatSubscribers.has(chatKey)) {
      chatSubscribers.set(chatKey, new Set());
    }
    chatSubscribers.get(chatKey).add(onMessagesUpdate);

    // Direct sub-50ms peer thread channel
    let thChannel = null;
    if (client) {
      try {
        thChannel = client.channel('th_' + chatKey, { config: { broadcast: { self: false } } });
        thChannel.on('broadcast', { event: 'chat_message' }, ({ payload }) => {
          if (payload && payload.msgObj && typeof handleIncomingChatMessage === 'function') {
            handleIncomingChatMessage(payload);
          }
        });
        thChannel.subscribe();
      } catch (_) {}
    }

    function fetchThreadMessages() {
      if (!client) return;
      updateClientCitizenHeaders();

      const phones = String(chatKey).match(/\d{10}/g) || [];
      const myCleanPhone = (typeof APP_STATE !== 'undefined' && APP_STATE.currentUser && APP_STATE.currentUser.phone) 
        ? APP_STATE.currentUser.phone.replace(/\D/g, '').slice(-10) : '';

      let query = client.from('messages').select('*');

      if (phones.length >= 2) {
        const p1 = phones[0];
        const p2 = phones[1];
        query = query.or(`chat_key.eq.${chatKey},chat_key.eq.chat_${p1}_${p2},chat_key.eq.chat_${p2}_${p1}`);
      } else {
        query = query.eq('chat_key', chatKey);
      }
      query.order('created_at', { ascending: false }).limit(35)
        .then(({ data, error }) => {
          if (!error && Array.isArray(data)) {
            // Sort ascending for chronological order
            data.sort((a, b) => (Number(a.created_at) || 0) - (Number(b.created_at) || 0));

            const myId = (typeof APP_STATE !== 'undefined' && APP_STATE.currentUser) ? APP_STATE.currentUser.id : '';

            const validRows = data.filter(m => m && m.text && m.text.trim() && m.text !== '[deleted]' && m.text !== '[read_receipt]' && m.chat_key !== 'purged_archive_cleared');
            if (validRows.length === 0) {
              onMessagesUpdate([]);
              return;
            }

            const mapped = validRows.map(m => {
              const mPhone = (m.sender_phone ? String(m.sender_phone).replace(/\D/g, '').slice(-10) : '');
              const isMe = (m.sender_id === myId) || (myCleanPhone && mPhone && mPhone === myCleanPhone);
              const mTime = Number(m.created_at) || Date.now();

              return {
                id: m.id,
                sender: isMe ? 'me' : 'them',
                senderId: m.sender_id,
                senderPhone: m.sender_phone,
                senderName: m.sender_name,
                senderAvatar: m.sender_avatar,
                text: m.text,
                time: m.time || 'ഇപ്പോൾ',
                timestamp: mTime,
                status: isMe ? 'delivered' : '',
                seen: false
              };
            });
            onMessagesUpdate(mapped);
          } else {
            onMessagesUpdate([]);
          }
        }).catch(() => {
          onMessagesUpdate([]);
        });
    }

    // Fast initial fetch on opening
    fetchThreadMessages();

    // Ultra-fast 400ms micro-polling while the chat modal is actively open
    const pollInterval = setInterval(() => {
      const isChatOpen = typeof document !== 'undefined' && document.getElementById('modal-chat')?.classList.contains('active');
      if (client && !document.hidden && isChatOpen && chatSubscribers.has(chatKey) && chatSubscribers.get(chatKey).size > 0) {
        fetchThreadMessages();
      }
    }, 400);

    const onVisible = () => {
      const isChatOpen = typeof document !== 'undefined' && document.getElementById('modal-chat')?.classList.contains('active');
      if (!document.hidden && isChatOpen && client && chatSubscribers.has(chatKey)) {
        fetchThreadMessages();
      }
    };
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      if (pollInterval) clearInterval(pollInterval);
      if (thChannel) {
        try { thChannel.unsubscribe(); } catch (_) {}
      }
      document.removeEventListener('visibilitychange', onVisible);
      if (chatSubscribers.has(chatKey)) {
        chatSubscribers.get(chatKey).delete(onMessagesUpdate);
      }
    };
  }

  async function syncUserChats() {
    initSupabase();
    if (!client) return;
    try {
      const myPhoneRaw = (typeof APP_STATE !== 'undefined' && APP_STATE.currentUser && APP_STATE.currentUser.phone)
        ? APP_STATE.currentUser.phone.replace(/\D/g, '') : '';
      const myPhone = myPhoneRaw.length >= 10 ? myPhoneRaw.slice(-10) : myPhoneRaw;
      const myId = (typeof APP_STATE !== 'undefined' && APP_STATE.currentUser) ? APP_STATE.currentUser.id : '';

      if (!myPhone && !myId) return;

      let query = client.from('messages').select('*');
      if (myPhone) {
        query = query.or(`sender_phone.eq.${myPhone},recipient_phone.eq.${myPhone},chat_key.ilike.%${myPhone}%`);
      } else if (myId) {
        query = query.or(`sender_id.eq.${myId},recipient_id.eq.${myId}`);
      }
      const { data, error } = await query
        .order('created_at', { ascending: false })
        .limit(80);

      if (!error && Array.isArray(data) && data.length > 0) {
        data.forEach(row => {
          let key = row.chat_key;
          if (!key || !row.text || row.text === '[deleted]' || row.text === '[read_receipt]' || (!row.sender_name && !row.sender_phone)) return;

          const rowSenderPhone = row.sender_phone ? String(row.sender_phone).replace(/\D/g, '').slice(-10) : '';
          const rowRecipientPhone = row.recipient_phone ? String(row.recipient_phone).replace(/\D/g, '').slice(-10) : '';

          // Canonicalize phone-based chat keys
          const phones = String(key).match(/\d{10}/g) || [];
          if (phones.length >= 2) {
            key = 'chat_' + [...phones].sort().join('_');
          } else if (rowSenderPhone && rowRecipientPhone && rowSenderPhone !== rowRecipientPhone) {
            key = 'chat_' + [rowSenderPhone, rowRecipientPhone].sort().join('_');
          }

          const isForMe = Boolean((myId && (row.sender_id === myId || row.recipient_id === myId)) ||
                          (myPhone && (rowSenderPhone === myPhone || rowRecipientPhone === myPhone || key.includes(myPhone))));

          if (!isForMe) return;

          if (typeof APP_STATE !== 'undefined') {
            if (!APP_STATE.chats) APP_STATE.chats = {};
            if (!APP_STATE.chats[key]) APP_STATE.chats[key] = [];
            const exists = APP_STATE.chats[key].some(m => m.id === row.id || (m.timestamp === Number(row.created_at) && m.text === row.text));
            if (!exists) {
              const isMe = (row.sender_id === myId) || (myPhone && rowSenderPhone && myPhone === rowSenderPhone);
              APP_STATE.chats[key].push({
                id: row.id,
                sender: isMe ? 'me' : 'them',
                senderId: row.sender_id,
                senderPhone: row.sender_phone,
                senderName: row.sender_name,
                senderAvatar: row.sender_avatar,
                text: row.text,
                time: row.time || 'ഇപ്പോൾ',
                timestamp: Number(row.created_at) || Date.now()
              });
            }

            // Populate metadata so user can tap and reply immediately
            if (!APP_STATE.chatMeta) APP_STATE.chatMeta = {};
            if (!APP_STATE.chatMeta[key]) {
              const isMe = (row.sender_id === myId) || (myPhone && rowSenderPhone && myPhone === rowSenderPhone);
              APP_STATE.chatMeta[key] = {
                name: isMe ? (row.recipient_name || 'സുഹൃത്ത്') : (row.sender_name || 'സുഹൃത്ത്'),
                phone: isMe ? (row.recipient_phone || '') : (row.sender_phone || ''),
                avatar: isMe ? (row.recipient_avatar || '') : (row.sender_avatar || ''),
                recipientId: isMe ? (row.recipient_id || '') : (row.sender_id || '')
              };
            }
          }
        });
        if (typeof saveChats === 'function') saveChats();
        if (typeof renderChatListScreen === 'function' && APP_STATE.currentScreen === 'chat') {
          renderChatListScreen();
        }
      }
    } catch (_) {}
  }

  // 2. POSTS
  async function savePost(postObj) {
    if (!postObj) return;
    initSupabase();

    if (postsChannel) {
      try {
        await postsChannel.send({
          type: 'broadcast',
          event: 'new_post',
          payload: { post: postObj }
        });
      } catch (_) {}
    }

    if (client) {
      try {
        const createdAtNum = (Number(postObj.createdAt) && !isNaN(Number(postObj.createdAt)))
          ? Number(postObj.createdAt)
          : (typeof postObj.timestamp === 'number' ? postObj.timestamp : Date.now());

        await client.from('posts').upsert({
          id: postObj.id,
          user_id: postObj.authorId || postObj.userId || '',
          author_name: postObj.authorName || '',
          author_phone: postObj.authorPhone || '',
          author_avatar: postObj.authorAvatar || '',
          content: postObj.content || postObj.text || '',
          category: postObj.type || postObj.category || 'announcement',
          image_url: postObj.image || postObj.imageUrl || '',
          location_name: postObj.authorLocation || postObj.locationName || '',
          district: postObj.district || '',
          latitude: postObj.lat != null ? postObj.lat : (postObj.latitude || null),
          longitude: postObj.lon != null ? postObj.lon : (postObj.longitude || null),
          likes: postObj.likes || 0,
          created_at: createdAtNum
        });
        console.info('💾 [Supabase] Post synced to cloud database');
      } catch (err) {
        console.info('ℹ️ [Supabase Posts Note]:', err.message);
      }
    }
  }

  async function deletePost(postId) {
    if (!postId) return;
    initSupabase();
    if (client) {
      try {
        await client.from('posts').delete().eq('id', postId);
        console.info('🗑️ [Supabase] Post deleted from cloud database');
      } catch (_) {}
    }
  }

  async function syncPosts(callback) {
    initSupabase();
    if (!client) return;
    try {
      const { data, error } = await client.from('posts').select('*').order('created_at', { ascending: false }).limit(100);
      if (!error && Array.isArray(data) && data.length > 0) {
        const mapped = data.map(p => {
          const createdAtNum = Number(p.created_at) || (p.created_at_iso ? new Date(p.created_at_iso).getTime() : Date.now());
          return {
            id: p.id,
            authorName: p.author_name || 'നാട്ടുകാരൻ',
            authorPhone: p.author_phone || '',
            authorAvatar: p.author_avatar || '',
            authorId: p.user_id,
            content: p.content || '',
            category: p.category,
            type: p.category || 'announcement',
            image: p.image_url || '',
            imageUrl: p.image_url || '',
            locationName: p.location_name,
            authorLocation: p.location_name || 'കേരളം',
            district: p.district || '',
            lat: p.latitude,
            lon: p.longitude,
            latitude: p.latitude,
            longitude: p.longitude,
            likes: p.likes || 0,
            timestamp: createdAtNum,
            createdAt: createdAtNum,
            time: 'ക്ലൗഡ്'
          };
        });

        if (typeof APP_STATE !== 'undefined' && Array.isArray(APP_STATE.posts)) {
          let hasNewPosts = false;
          mapped.forEach(cloudPost => {
            const idx = APP_STATE.posts.findIndex(p => p.id === cloudPost.id);
            if (idx >= 0) {
              if (APP_STATE.posts[idx].likes !== cloudPost.likes || APP_STATE.posts[idx].content !== cloudPost.content) {
                APP_STATE.posts[idx] = { ...APP_STATE.posts[idx], ...cloudPost };
                hasNewPosts = true;
              }
            } else {
              APP_STATE.posts.unshift(cloudPost);
              hasNewPosts = true;
            }
          });
          if (hasNewPosts) {
            if (typeof savePosts === 'function') savePosts();
            if (APP_STATE.currentScreen === 'community' && typeof renderCommunityFeed === 'function') {
              renderCommunityFeed();
            } else if (APP_STATE.currentScreen === 'home' && typeof renderHomeCommunityFeed === 'function') {
              renderHomeCommunityFeed();
            }
          }
        }

        if (typeof callback === 'function') callback(mapped);
      }
    } catch (_) {}
  }

  // 3. SERVICES DIRECTORY
  async function saveService(serviceObj) {
    if (!serviceObj) return;
    initSupabase();

    if (typeof window !== 'undefined' && typeof window.resolveItemLocation === 'function') {
      serviceObj.location = window.resolveItemLocation(serviceObj);
    }

    if (servicesChannel) {
      try {
        await servicesChannel.send({
          type: 'broadcast',
          event: 'new_service',
          payload: { service: serviceObj }
        });
      } catch (_) {}
    }

    if (client) {
      try {
        await client.from('services').upsert({
          id: serviceObj.id,
          name: serviceObj.name,
          trade: serviceObj.trade,
          category: serviceObj.category || 'other',
          phone: serviceObj.phone,
          location: serviceObj.location,
          district: serviceObj.district || '',
          latitude: serviceObj.lat != null ? serviceObj.lat : (serviceObj.latitude || null),
          longitude: serviceObj.lon != null ? serviceObj.lon : (serviceObj.longitude || null),
          avatar: serviceObj.avatar || '',
          experience: serviceObj.experience || '',
          visiting_fee: serviceObj.visitingFee || '',
          availability: serviceObj.availability || 'available',
          work_hours: serviceObj.workHours || '',
          bio: serviceObj.bio || '',
          rating: Number(serviceObj.rating) || 5.0,
          created_at: serviceObj.createdAt || Date.now()
        });
        console.info('💾 [Supabase] Service provider synced to cloud database');
      } catch (err) {
        console.info('ℹ️ [Supabase Services Note]:', err.message);
      }
    }
  }

  async function syncServices(callback) {
    initSupabase();
    if (!client) return;
    try {
      const { data, error } = await client.from('services').select('*').order('created_at', { ascending: false }).limit(300);
      if (!error && Array.isArray(data) && data.length > 0) {
        const mapped = data.map(s => ({
          id: s.id,
          name: s.name,
          trade: s.trade,
          category: s.category || 'other',
          phone: s.phone,
          location: s.location,
          district: s.district,
          lat: s.latitude,
          lon: s.longitude,
          latitude: s.latitude,
          longitude: s.longitude,
          avatar: s.avatar,
          experience: s.experience,
          visitingFee: s.visiting_fee,
          availability: s.availability || 'available',
          workHours: s.work_hours,
          bio: s.bio,
          rating: Number(s.rating) || 5.0,
          createdAt: Number(s.created_at) || Date.now()
        }));

        if (typeof APP_STATE !== 'undefined' && Array.isArray(APP_STATE.services)) {
          mapped.forEach(cloudSrv => {
            const idx = APP_STATE.services.findIndex(s => s.id === cloudSrv.id || (s.phone && cloudSrv.phone && s.phone === cloudSrv.phone && s.trade === cloudSrv.trade));
            if (idx >= 0) {
              APP_STATE.services[idx] = { ...APP_STATE.services[idx], ...cloudSrv, isCloud: true };
            } else {
              APP_STATE.services.unshift({ ...cloudSrv, isCloud: true });
            }
          });
          if (typeof saveServices === 'function') saveServices();
          if (typeof renderServicesScreen === 'function' && APP_STATE.currentScreen === 'services') renderServicesScreen();
          if (typeof renderNearbyScreen === 'function' && APP_STATE.currentScreen === 'nearby') renderNearbyScreen();
          if (typeof renderHomeScreen === 'function' && APP_STATE.currentScreen === 'home') renderHomeScreen();
        }

        if (typeof callback === 'function') callback(mapped);
      }
    } catch (_) {}
  }

  // 4. REVIEWS
  async function saveReview(serviceId, reviewObj, newRating) {
    if (!serviceId || !reviewObj) return;
    initSupabase();
    if (client) {
      try {
        await client.from('service_reviews').insert({
          id: reviewObj.id || ('rev_' + Date.now()),
          service_id: serviceId,
          user_id: reviewObj.userId || '',
          author_name: reviewObj.authorName || 'നാട്ടുകാരൻ',
          rating: reviewObj.rating || 5,
          text: reviewObj.text || '',
          time: reviewObj.time || 'ഇപ്പോൾ',
          created_at: Date.now()
        });

        if (newRating) {
          await client.from('services').update({ rating: newRating }).eq('id', serviceId);
        }
        console.info('💾 [Supabase] Review saved to cloud');
      } catch (_) {}
    }
  }

  // 5. BLOOD DONORS & REQUESTS
  async function saveBloodDonor(donorObj) {
    if (!donorObj) return;
    initSupabase();
    if (client) {
      try {
        await client.from('blood_donors').upsert({
          id: donorObj.id || ('donor_' + (donorObj.phone ? donorObj.phone.replace(/\D/g, '') : Date.now())),
          name: donorObj.name,
          phone: donorObj.phone,
          blood_group: donorObj.group || donorObj.bloodGroup,
          location: donorObj.location,
          latitude: donorObj.lat != null ? donorObj.lat : (donorObj.latitude || null),
          longitude: donorObj.lon != null ? donorObj.lon : (donorObj.longitude || null),
          ready_to_donate: donorObj.readyToDonate !== false,
          created_at: Date.now()
        });
        console.info('💾 [Supabase] Blood donor saved');
      } catch (_) {}
    }
  }

  async function syncBloodDonors() {
    initSupabase();
    if (!client) return;
    try {
      const { data, error } = await client.from('blood_donors').select('*').limit(200);
      if (!error && Array.isArray(data) && data.length > 0) {
        if (typeof APP_STATE !== 'undefined' && Array.isArray(APP_STATE.bloodDonors)) {
          data.forEach(d => {
            if (!d.name || !d.phone || d.ready_to_donate === false) return;
            const mapped = {
              id: d.id,
              name: d.name,
              phone: d.phone,
              group: d.blood_group,
              location: d.location,
              lat: d.latitude,
              lon: d.longitude
            };
            const idx = APP_STATE.bloodDonors.findIndex(item => item.phone === mapped.phone || item.id === mapped.id);
            if (idx >= 0) APP_STATE.bloodDonors[idx] = { ...APP_STATE.bloodDonors[idx], ...mapped };
            else APP_STATE.bloodDonors.unshift(mapped);
          });
          if (typeof saveDonors === 'function') saveDonors();
          if (typeof renderBloodScreen === 'function' && APP_STATE.currentScreen === 'blood') renderBloodScreen();
        }
      }
    } catch (_) {}
  }

  async function saveBloodRequest(reqObj) {
    if (!reqObj) return;
    initSupabase();
    if (client) {
      try {
        const payload = {
          id: reqObj.id || ('breq_' + Date.now()),
          patient_name: reqObj.patientName || reqObj.patient || '',
          blood_group: reqObj.group || reqObj.bloodGroup || '',
          units: reqObj.units || '1 Unit',
          hospital: reqObj.hospital || '',
          contact_phone: reqObj.phone || '',
          location: reqObj.location || '',
          latitude: reqObj.lat || null,
          longitude: reqObj.lon || null,
          needed_by: reqObj.neededBy || 'അടിയന്തിരം',
          status: 'urgent',
          created_at: Date.now()
        };

        await client.from('blood_requests').upsert(payload);
        console.info('💾 [Supabase] Blood request saved to Cloud:', payload.id);

        // Sub-50ms peer-to-peer realtime broadcast to all online phones
        const channel = client.channel('nn_community_blood');
        channel.send({
          type: 'broadcast',
          event: 'emergency_blood',
          payload: { bloodRequest: payload }
        }).catch(() => {});
      } catch (err) {
        console.warn('Save blood request error:', err);
      }
    }
  }

  // 5B. SERVICE REQUESTS (BROADCAST & PROVIDER ENQUIRIES)
  async function saveServiceRequest(reqObj) {
    if (!reqObj) return;
    initSupabase();
    if (client) {
      try {
        await client.from('service_requests').upsert({
          id: reqObj.id || ('sreq_' + Date.now()),
          user_id: reqObj.userId || (typeof APP_STATE !== 'undefined' ? APP_STATE.currentUser.id : ''),
          title: reqObj.title || reqObj.trade || 'സേവന ആവശ്യം',
          trade: reqObj.trade || reqObj.categoryName || 'സർവീസ്',
          category: reqObj.category || 'other',
          description: reqObj.description || '',
          urgency: reqObj.urgency || 'urgent',
          location: reqObj.location || '',
          phone: reqObj.phone || '',
          provider_phone: reqObj.providerPhone || '',
          provider_name: reqObj.providerName || '',
          image_url: reqObj.photo || reqObj.imageUrl || '',
          status: reqObj.status || 'pending',
          created_at: Date.now()
        });
        console.info('💾 [Supabase] Service request saved successfully');
      } catch (e) {
        console.warn('⚠️ [Supabase] saveServiceRequest error:', e.message);
      }
    }
  }

  // 6. JOBS & RENTALS
  async function saveJob(jobObj) {
    if (!jobObj) return;
    initSupabase();
    if (client) {
      try {
        const payload = {
          id: jobObj.id || ('job_' + Date.now()),
          employer: jobObj.employer || (typeof APP_STATE !== 'undefined' && APP_STATE.currentUser ? APP_STATE.currentUser.name : 'തൊഴിൽദാതാവ്'),
          title: jobObj.title || '',
          category: jobObj.category || 'other',
          salary: jobObj.salary || 'ശമ്പളം സംസാരിക്കാം',
          phone: jobObj.phone || jobObj.employerPhone || (typeof APP_STATE !== 'undefined' && APP_STATE.currentUser ? APP_STATE.currentUser.phone : '') || '9447000000',
          location: jobObj.location || (typeof APP_STATE !== 'undefined' && APP_STATE.location ? APP_STATE.location.name : 'കേരളം'),
          district: jobObj.district || (typeof APP_STATE !== 'undefined' && APP_STATE.location ? APP_STATE.location.district : '') || '',
          latitude: jobObj.lat || (typeof APP_STATE !== 'undefined' && APP_STATE.location ? APP_STATE.location.lat : null),
          longitude: jobObj.lon || (typeof APP_STATE !== 'undefined' && APP_STATE.location ? APP_STATE.location.lon : null),
          description: jobObj.description || '',
          created_at: Number(jobObj.createdAt) || Date.now()
        };

        const { error } = await client.from('jobs').upsert(payload);
        if (error) {
          console.warn('⚠️ [Supabase Jobs Upsert Error]:', error.message);
        } else {
          console.info('✅ [Supabase] Job saved successfully to Cloud:', payload.id);
        }

        // Realtime broadcast to other devices
        const channel = client.channel('nn_community_jobs');
        channel.send({
          type: 'broadcast',
          event: 'new_job',
          payload: { job: payload }
        }).catch(() => {});
      } catch (err) {
        console.warn('Save job exception:', err);
      }
    }
  }

  async function syncJobs(callback) {
    initSupabase();
    if (!client) return;
    try {
      const { data, error } = await client.from('jobs').select('*').order('created_at', { ascending: false }).limit(200);
      if (!error && Array.isArray(data) && data.length > 0) {
        const mapped = data.map(j => ({
          id: j.id,
          title: j.title,
          employer: j.employer || 'തൊഴിൽദാതാവ്',
          employerPhone: j.phone || '',
          phone: j.phone || '',
          category: j.category || 'other',
          salary: j.salary || 'ശമ്പളം സംസാരിക്കാം',
          type: 'ഫുൾ ടൈം',
          location: j.location || '',
          district: j.district || '',
          lat: j.latitude,
          lon: j.longitude,
          description: j.description || '',
          createdAt: Number(j.created_at) || Date.now(),
          isCloud: true
        }));

        if (typeof APP_STATE !== 'undefined' && Array.isArray(APP_STATE.jobs)) {
          mapped.forEach(cloudJob => {
            const idx = APP_STATE.jobs.findIndex(jb => jb.id === cloudJob.id || (jb.title === cloudJob.title && jb.employerPhone === cloudJob.employerPhone));
            if (idx >= 0) {
              APP_STATE.jobs[idx] = { ...APP_STATE.jobs[idx], ...cloudJob };
            } else {
              APP_STATE.jobs.unshift(cloudJob);
            }
          });
          try {
            localStorage.setItem('nn_jobs', JSON.stringify(APP_STATE.jobs));
          } catch (_) {}
          if (APP_STATE.currentScreen === 'jobs' && typeof renderJobsScreen === 'function') {
            renderJobsScreen();
          }
        }

        if (typeof callback === 'function') callback(mapped);
      }
    } catch (err) {
      console.warn('Sync jobs exception:', err);
    }
  }

  async function saveRental(rentObj) {
    if (!rentObj) return;
    initSupabase();
    if (client) {
      try {
        const payload = {
          id: rentObj.id || ('rent_' + Date.now()),
          title: rentObj.title || '',
          owner: rentObj.owner || rentObj.authorName || 'നാട്ടുകാരൻ',
          type: rentObj.type || 'house',
          category: rentObj.category || 'rent',
          price: rentObj.price || rentObj.rate || '',
          deposit: rentObj.deposit || '',
          phone: rentObj.phone || rentObj.ownerPhone || rentObj.authorPhone || (typeof APP_STATE !== 'undefined' && APP_STATE.currentUser ? APP_STATE.currentUser.phone : '') || '9847000000',
          location: rentObj.location || (typeof APP_STATE !== 'undefined' && APP_STATE.location ? APP_STATE.location.name : 'കേരളം'),
          latitude: rentObj.lat || (typeof APP_STATE !== 'undefined' && APP_STATE.location ? APP_STATE.location.lat : null),
          longitude: rentObj.lon || (typeof APP_STATE !== 'undefined' && APP_STATE.location ? APP_STATE.location.lon : null),
          image_url: rentObj.image || '',
          created_at: Number(rentObj.createdAt) || Date.now()
        };

        const { error } = await client.from('rentals').upsert(payload);
        if (error) {
          console.warn('⚠️ [Supabase Rentals Upsert Error]:', error.message);
        } else {
          console.info('✅ [Supabase] Rental saved successfully to Cloud:', payload.id);
        }

        // Realtime broadcast to other phones
        const channel = client.channel('nn_community_rentals');
        channel.send({
          type: 'broadcast',
          event: 'new_rental',
          payload: { rental: rentObj }
        }).catch(() => {});
      } catch (err) {
        console.warn('Save rental exception:', err);
      }
    }
  }

  async function syncRentals(callback) {
    initSupabase();
    if (!client) return;
    try {
      const { data, error } = await client.from('rentals').select('*').order('created_at', { ascending: false }).limit(200);
      if (!error && Array.isArray(data) && data.length > 0) {
        const mapped = data.map(r => ({
          id: r.id,
          title: r.title,
          type: r.type || 'വാടക',
          rate: r.price || '',
          price: r.price || '',
          owner: r.owner || 'നാട്ടുകാരൻ',
          ownerPhone: r.phone || '',
          phone: r.phone || '',
          location: r.location || '',
          lat: r.latitude,
          lon: r.longitude,
          image: r.image_url || 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=400&q=80',
          createdAt: Number(r.created_at) || Date.now(),
          isCloud: true
        }));

        if (typeof APP_STATE !== 'undefined' && Array.isArray(APP_STATE.rentals)) {
          mapped.forEach(cloudRent => {
            const idx = APP_STATE.rentals.findIndex(rn => rn.id === cloudRent.id || (rn.title === cloudRent.title && rn.ownerPhone === cloudRent.ownerPhone));
            if (idx >= 0) {
              APP_STATE.rentals[idx] = { ...APP_STATE.rentals[idx], ...cloudRent };
            } else {
              APP_STATE.rentals.unshift(cloudRent);
            }
          });
          try {
            localStorage.setItem('nn_rentals', JSON.stringify(APP_STATE.rentals));
          } catch (_) {}
          if (APP_STATE.currentScreen === 'rentals' && typeof renderRentalsScreen === 'function') {
            renderRentalsScreen();
          }
        }

        if (typeof callback === 'function') callback(mapped);
      }
    } catch (err) {
      console.warn('Sync rentals exception:', err);
    }
  }

  async function saveAmbulanceDriver(ambObj) {
    if (!ambObj) return;
    initSupabase();
    if (client) {
      try {
        const payload = {
          id: ambObj.id || ('amb_' + Date.now()),
          name: ambObj.name || '',
          phone: ambObj.phone || '',
          trade: 'ആംബുലൻസ് സർവീസ്',
          category: 'driver',
          location: ambObj.location || '',
          district: ambObj.district || '',
          latitude: ambObj.lat || null,
          longitude: ambObj.lon || null,
          visiting_fee: ambObj.vehicle || '',
          work_hours: ambObj.availability || '24x7 ലഭ്യമാണ്',
          bio: `${ambObj.type || 'Ambulance'} · വാഹനം: ${ambObj.vehicle || ''} · വിളിക്കാം: ${ambObj.phone || ''}`,
          rating: 5.0,
          created_at: Date.now()
        };
        await client.from('services').upsert(payload);
        console.info('🚑 [Supabase] Ambulance driver synced to cloud:', payload.id);
      } catch (_) {}
    }
  }

  // 8B. EMERGENCY DIRECTORY CONTACTS
  async function saveEmergencyContact(contactObj) {
    if (!contactObj) return;
    initSupabase();
    if (client) {
      try {
        const payload = {
          id: contactObj.id || ('emg_' + Date.now()),
          title: contactObj.title || '',
          category: contactObj.category || 'അടിയന്തിരം',
          phone: contactObj.phone || '',
          icon: contactObj.icon || '📞',
          badge: contactObj.badge || 'സഹായം',
          location: contactObj.location || (typeof APP_STATE !== 'undefined' && APP_STATE.location ? APP_STATE.location.name : 'കേരളം'),
          district: contactObj.district || (typeof APP_STATE !== 'undefined' && APP_STATE.location ? APP_STATE.location.district : '') || '',
          description: contactObj.description || '',
          created_at: Number(contactObj.createdAt) || Date.now()
        };

        const { error } = await client.from('emergency_contacts').upsert(payload);
        if (error) {
          console.warn('⚠️ [Supabase Emergency Contact Upsert Error]:', error.message);
        } else {
          console.info('✅ [Supabase] Emergency contact saved:', payload.id);
        }

        const channel = client.channel('nn_community_emergency_contacts');
        channel.send({
          type: 'broadcast',
          event: 'new_emergency_contact',
          payload: { contact: payload }
        }).catch(() => {});
      } catch (err) {
        console.warn('Save emergency contact exception:', err);
      }
    }
  }

  async function syncEmergencyContacts(callback) {
    initSupabase();
    if (!client) return;
    try {
      const { data, error } = await client.from('emergency_contacts').select('*').order('created_at', { ascending: false });
      if (!error && Array.isArray(data) && data.length > 0) {
        // Sync Home Banner if saved in cloud
        const bannerItem = data.find(c => c.id === 'app_setting_home_banner' || c.category === 'app_setting_home_banner');
        if (bannerItem) {
          const art = bannerItem.icon || bannerItem.description;
          if (art) {
            try { localStorage.setItem('thuna_custom_village_banner_art', art); } catch (_) {}
          }
          if (bannerItem.title || bannerItem.name) {
            try { localStorage.setItem('thuna_custom_village_banner_title', bannerItem.title || bannerItem.name); } catch (_) {}
          }
          if (bannerItem.badge) {
            try { localStorage.setItem('thuna_custom_village_banner_sub', bannerItem.badge); } catch (_) {}
          }
          if (bannerItem.phone) {
            try { localStorage.setItem('thuna_custom_village_banner_phone', bannerItem.phone); } catch (_) {}
          }
          if (bannerItem.location) {
            try { localStorage.setItem('thuna_custom_village_banner_link', bannerItem.location); } catch (_) {}
          }
          if (bannerItem.description && bannerItem.icon) {
            try { localStorage.setItem('thuna_custom_village_banner_desc', bannerItem.description); } catch (_) {}
          }
          if (typeof renderAdByIndex === 'function') {
            renderAdByIndex(0);
          }
        }

        const realContacts = data.filter(c => 
          c.id !== 'app_setting_splash_bg' && c.category !== 'app_setting_splash_bg' && 
          c.id !== 'app_setting_home_banner' && c.category !== 'app_setting_home_banner'
        );

        const mapped = realContacts.map(c => ({
          id: c.id,
          title: c.title || c.name,
          category: c.category || 'അടിയന്തിരം',
          phone: c.phone || '',
          icon: c.icon || '📞',
          badge: c.badge || 'സഹായം',
          location: c.location || 'കേരളം',
          district: c.district || '',
          description: c.description || '',
          createdAt: Number(c.created_at) || Date.now(),
          isCloud: true
        }));

        if (typeof APP_STATE !== 'undefined') {
          if (!Array.isArray(APP_STATE.emergencyContacts)) {
            APP_STATE.emergencyContacts = (typeof DEFAULT_EMERGENCY_CONTACTS !== 'undefined') ? [...DEFAULT_EMERGENCY_CONTACTS] : [];
          }
          mapped.forEach(cloudItem => {
            const idx = APP_STATE.emergencyContacts.findIndex(item => item.id === cloudItem.id || (item.title === cloudItem.title && item.phone === cloudItem.phone));
            if (idx >= 0) {
              APP_STATE.emergencyContacts[idx] = { ...APP_STATE.emergencyContacts[idx], ...cloudItem };
            } else {
              APP_STATE.emergencyContacts.push(cloudItem);
            }
          });
          try {
            localStorage.setItem('nn_emergency_contacts', JSON.stringify(APP_STATE.emergencyContacts));
          } catch (_) {}
          if (typeof renderEmergencyModalList === 'function') {
            renderEmergencyModalList();
          }
        }

        if (typeof callback === 'function') callback(mapped);
      }
    } catch (err) {
      console.warn('Sync emergency contacts error:', err);
    }
  }

  // 9. USER PROFILES CLOUD SYNC (Phone-based deterministic ID)
  async function saveUserProfile(userObj) {
    if (!userObj) return false;
    const client = initSupabase();
    if (!client) return false;

    try {
      const rawPhone = userObj.phone || '';
      const cleanPhone = rawPhone.replace(/\D/g, '').slice(-10);
      const cleanEmail = (userObj.email ? String(userObj.email).trim().toLowerCase() : '');
      const userId = userObj.id || (cleanPhone ? ('usr_' + cleanPhone) : ('usr_me_' + Date.now()));
      const lat = (userObj.lat != null) ? userObj.lat : (typeof APP_STATE !== 'undefined' && APP_STATE.location ? APP_STATE.location.lat : null);
      const lon = (userObj.lon != null) ? userObj.lon : (typeof APP_STATE !== 'undefined' && APP_STATE.location ? APP_STATE.location.lon : null);

      // SINGLE ACCOUNT ENFORCEMENT: Only ONE account allowed per phone number & email ID
      if (cleanPhone && cleanPhone.length >= 10) {
        const { data: existingByPhone } = await client
          .from('profiles')
          .select('id, name, phone, email, place, avatar, blood_group')
          .ilike('phone', `%${cleanPhone}%`)
          .limit(1);
        if (existingByPhone && existingByPhone.length > 0 && existingByPhone[0].id !== userId) {
          console.warn('⚠️ [Supabase] Account already registered with phone:', cleanPhone);
          return { duplicate: true, field: 'phone', profile: existingByPhone[0] };
        }
      }

      if (cleanEmail) {
        const { data: existingByEmail } = await client
          .from('profiles')
          .select('id, name, phone, email, place, avatar, blood_group')
          .eq('email', cleanEmail)
          .limit(1);
        if (existingByEmail && existingByEmail.length > 0 && existingByEmail[0].id !== userId) {
          console.warn('⚠️ [Supabase] Account already registered with email:', cleanEmail);
          return { duplicate: true, field: 'email', profile: existingByEmail[0] };
        }
      }

      const payload = {
        id: userId,
        name: userObj.name || 'നാട്ടുകാരൻ',
        phone: rawPhone,
        email: cleanEmail,
        place: userObj.location || '',
        avatar: userObj.avatar || '',
        blood_group: userObj.bloodGroup || 'O+',
        is_donor: !!userObj.isDonor,
        latitude: lat,
        longitude: lon,
        updated_at: Date.now()
      };

      const { data, error } = await client
        .from('profiles')
        .upsert(payload, { onConflict: 'id' });

      if (error) {
        console.warn('⚠️ [Supabase] Profile upsert warning:', error.message);
        return false;
      }
      console.info('✅ [Supabase] User profile synced to cloud with ID and coordinates:', userId, lat, lon);
      return { success: true, id: userId };
    } catch (err) {
      console.error('❌ [Supabase] Profile save error:', err);
      return false;
    }
  }

  // 10. COMPLETE ACCOUNT & DATA PURGE FROM SUPABASE CLOUD
  async function deleteEntireUserAccount(userId, phone, email) {
    const client = initSupabase();
    if (!client) return false;

    try {
      const cleanPhone = phone ? String(phone).replace(/\D/g, '').slice(-10) : '';
      const cleanEmail = email ? String(email).trim().toLowerCase() : '';
      console.info('🗑️ [Supabase] Initiating COMPLETE Account Deletion for:', { userId, cleanPhone, cleanEmail });

      const delPromises = [];

      // A. Delete Profile Record
      if (userId) delPromises.push(client.from('profiles').delete().eq('id', userId));
      if (cleanPhone) delPromises.push(client.from('profiles').delete().ilike('phone', `%${cleanPhone}%`));
      if (cleanEmail) delPromises.push(client.from('profiles').delete().eq('email', cleanEmail));

      // B. Delete Community Posts
      if (userId) delPromises.push(client.from('posts').delete().eq('user_id', userId));
      if (cleanPhone) delPromises.push(client.from('posts').delete().ilike('author_phone', `%${cleanPhone}%`));

      // C. Delete Services / Listings
      if (userId) delPromises.push(client.from('services').delete().eq('user_id', userId));
      if (cleanPhone) delPromises.push(client.from('services').delete().ilike('phone', `%${cleanPhone}%`));

      // D. Delete Jobs Posted
      if (cleanPhone) delPromises.push(client.from('jobs').delete().ilike('phone', `%${cleanPhone}%`));

      // E. Delete Rentals & Classifieds
      if (cleanPhone) delPromises.push(client.from('rentals').delete().ilike('phone', `%${cleanPhone}%`));

      // F. Delete Blood Donor Registry & Emergency Requests
      if (cleanPhone) {
        delPromises.push(client.from('blood_donors').delete().ilike('phone', `%${cleanPhone}%`));
        delPromises.push(client.from('blood_requests').delete().ilike('contact_phone', `%${cleanPhone}%`));
        delPromises.push(client.from('service_requests').delete().ilike('phone', `%${cleanPhone}%`));
      }

      // G. Delete Chat Messages
      if (userId) delPromises.push(client.from('messages').delete().eq('sender_id', userId));
      if (cleanPhone) delPromises.push(client.from('messages').delete().ilike('sender_phone', `%${cleanPhone}%`));

      const results = await Promise.allSettled(delPromises);
      console.info('✅ [Supabase] Account and all related data purged completely from database.', results);
      return true;
    } catch (err) {
      console.error('❌ [Supabase] Account purge error:', err);
      return false;
    }
  }

  async function fetchUserProfile(phoneOrId) {
    if (!phoneOrId) return null;
    const client = initSupabase();
    if (!client) return null;

    try {
      const cleanDigits = String(phoneOrId).replace(/\D/g, '').slice(-10);
      const isEmail = String(phoneOrId).includes('@');
      const targetId = String(phoneOrId).startsWith('usr_') ? String(phoneOrId) : (cleanDigits ? ('usr_' + cleanDigits) : phoneOrId);

      if (isEmail) {
        const { data } = await client.from('profiles').select('*').eq('email', String(phoneOrId).trim().toLowerCase()).maybeSingle();
        if (data) return data;
      }

      // Search by ID first
      let { data, error } = await client
        .from('profiles')
        .select('*')
        .eq('id', targetId)
        .maybeSingle();

      // If not found and we have 10 digits, search by phone number substring
      if (!data && cleanDigits && cleanDigits.length >= 10) {
        const res = await client
          .from('profiles')
          .select('*')
          .ilike('phone', `%${cleanDigits}%`)
          .limit(1);
        if (res.data && res.data.length > 0) {
          data = res.data[0];
        }
      }

      if (data) {
        console.info('👤 [Supabase] Found user profile in cloud:', data.name, data.id);
        return data;
      }
      return null;
    } catch (err) {
      console.warn('⚠️ [Supabase] Fetch profile error:', err);
      return null;
    }
  }

  async function syncProfiles() {
    const client = initSupabase();
    if (!client) return [];

    try {
      const { data, error } = await client
        .from('profiles')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(120);

      if (error) {
        console.warn('⚠️ [Supabase] Sync profiles error:', error.message);
        return [];
      }

      if (Array.isArray(data) && typeof APP_STATE !== 'undefined') {
        APP_STATE.cloudProfiles = data.filter(p => p && p.name && p.phone).map(p => ({
          id: p.id,
          name: p.name || 'നാട്ടുകാരൻ',
          phone: p.phone || '',
          location: p.place || 'കേരളം',
          avatar: p.avatar || '',
          bloodGroup: p.blood_group || 'O+',
          lat: p.latitude,
          lon: p.longitude,
          latitude: p.latitude,
          longitude: p.longitude,
          isDonor: p.is_donor
        }));

        try {
          localStorage.setItem('nn_cloud_profiles', JSON.stringify(APP_STATE.cloudProfiles));
        } catch (_) {}

        if (APP_STATE.currentScreen === 'nearby' && typeof renderNearbyScreen === 'function') {
          renderNearbyScreen();
        } else if (APP_STATE.currentScreen === 'blood' && typeof renderBloodDonorsList === 'function') {
          renderBloodDonorsList();
        } else if (APP_STATE.currentScreen === 'chat' && typeof renderChatListScreen === 'function') {
          renderChatListScreen();
        }
      }
      return data || [];
    } catch (err) {
      console.warn('⚠️ [Supabase] syncProfiles caught error:', err);
      return [];
    }
  }

  // EXPORT GLOBALLY & PROVIDE TRANSPARENT BACKWARDS COMPATIBILITY
  const api = {
    init: initSupabase,
    get client() { return client; },
    // Profile
    saveUserProfile,
    fetchUserProfile,
    deleteEntireUserAccount,
    syncProfiles,
    // Chat
    sendChatMessage,
    markChatSeen,
    broadcastChatEvent,
    subscribeChatThread,
    syncUserChats,
    deleteChatMessageForEveryone,
    deleteChatMessage: deleteChatMessageForEveryone,
    // Posts
    savePost,
    deletePost,
    syncPosts,
    broadcastPost: savePost,
    // Services
    saveService,
    syncServices,
    saveReview,
    broadcastService: saveService,
    // Blood
    saveBloodDonor,
    syncBloodDonors,
    saveBloodRequest,
    // Service Requests & Notifications
    saveServiceRequest,
    sendNativePhoneNotification,
    requestNotificationPermission,
    // Jobs & Rentals
    saveJob,
    syncJobs,
    saveRental,
    syncRentals,
    saveAmbulanceDriver,
    // Emergency & Helpline Directory
    saveEmergencyContact,
    syncEmergencyContacts
  };

  window.NN_SUPABASE_SERVICES = api;
  // Seamless fallback alias so any legacy scripts continue without breaking
  window.NN_FIREBASE_SERVICES = api;

  // Foreground Resume & Online Reconnection Trigger
  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        if (!chatChannel || chatChannel.state !== 'joined') {
          console.info('🔄 [Supabase] App active, re-ensuring Realtime Chat Channel...');
          setupRealtimeChannels();
        }
      }
    });
    window.addEventListener('online', () => {
      console.info('🌐 [Supabase] Network reconnected, re-establishing Realtime Channels...');
      setupRealtimeChannels();
    });
  }

  // Auto-init on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(initSupabase, 200));
  } else {
    setTimeout(initSupabase, 200);
  }

})();
