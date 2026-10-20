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

  const chatSubscribers = new Map(); // chatKey -> Set of callbacks

  function initSupabase() {
    if (client) return client;
    if (typeof window === 'undefined' || !window.supabase || typeof window.supabase.createClient !== 'function') {
      console.warn('⚠️ [Supabase SDK] Not loaded yet. Retrying in background...');
      return null;
    }

    try {
      client = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
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

  // Setup broadcast channels for sub-50ms peer-to-peer delivery
  function setupRealtimeChannels() {
    if (!client) return;

    // 1. CHAT CHANNEL
    chatChannel = client.channel('nn_community_chats', {
      config: { broadcast: { self: false } }
    });
    chatChannel.on('broadcast', { event: 'chat_message' }, ({ payload }) => {
      handleIncomingChatMessage(payload);
    });
    chatChannel.subscribe((status) => {
      console.info('💬 [Supabase Realtime Chat] Status:', status);
    });

    // 2. POSTS CHANNEL
    postsChannel = client.channel('nn_community_posts', {
      config: { broadcast: { self: false } }
    });
    postsChannel.on('broadcast', { event: 'new_post' }, ({ payload }) => {
      handleIncomingPost(payload);
    });
    postsChannel.subscribe((status) => {
      console.info('📢 [Supabase Realtime Posts] Status:', status);
    });

    // 3. SERVICES DIRECTORY CHANNEL
    servicesChannel = client.channel('nn_community_services', {
      config: { broadcast: { self: false } }
    });
    servicesChannel.on('broadcast', { event: 'new_service' }, ({ payload }) => {
      handleIncomingService(payload);
    });
    servicesChannel.subscribe((status) => {
      console.info('🛠️ [Supabase Realtime Services] Status:', status);
    });

    // 4. JOBS CHANNEL (Realtime broadcast across phones)
    const jobsChannel = client.channel('nn_community_jobs', {
      config: { broadcast: { self: false } }
    });
    jobsChannel.on('broadcast', { event: 'new_job' }, ({ payload }) => {
      if (payload && payload.job) handleIncomingJob(payload.job);
    });
    jobsChannel.subscribe((status) => {
      console.info('💼 [Supabase Realtime Jobs] Status:', status);
    });

    // 5. RENTALS CHANNEL (Realtime broadcast across phones)
    const rentalsChannel = client.channel('nn_community_rentals', {
      config: { broadcast: { self: false } }
    });
    rentalsChannel.on('broadcast', { event: 'new_rental' }, ({ payload }) => {
      if (payload && payload.rental) handleIncomingRental(payload.rental);
    });
    rentalsChannel.subscribe((status) => {
      console.info('🏠 [Supabase Realtime Rentals] Status:', status);
    });
  }

  // Request Android / Browser notification permissions
  async function requestNotificationPermission() {
    try {
      if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.LocalNotifications) {
        const check = await window.Capacitor.Plugins.LocalNotifications.checkPermissions();
        if (check.display !== 'granted') {
          await window.Capacitor.Plugins.LocalNotifications.requestPermissions();
        }
      } else if (typeof Notification !== 'undefined' && Notification.permission !== 'granted') {
        await Notification.requestPermission();
      }
    } catch (e) {
      console.warn('Notification permission note:', e.message);
    }
  }
  window.requestNotificationPermission = requestNotificationPermission;

  // Synthesized audio chimes for phone alerts
  function playNotificationSound(type) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'blood') {
        // High priority alarm tone
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.setValueAtTime(700, ctx.currentTime + 0.15);
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.35, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.65);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.65);
      } else if (type === 'service') {
        // Pleasant bell chime for service request
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.12);
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.24);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.55);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.55);
      } else {
        // Chat chime
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime);
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.45);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.45);
      }
    } catch (_) {}
  }

  // Native phone notification, audio chime, vibration & in-app banner
  async function sendNativePhoneNotification(title, body, extraData = {}) {
    const type = extraData.type || 'info';

    // 1. Android Native Status-Bar Notification (Capacitor LocalNotifications)
    try {
      if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.LocalNotifications) {
        await window.Capacitor.Plugins.LocalNotifications.schedule({
          notifications: [
            {
              title: title,
              body: body,
              id: Math.floor(Math.random() * 900000) + 100000,
              schedule: { at: new Date(Date.now() + 50) },
              smallIcon: 'ic_launcher',
              sound: 'res://raw/beep.wav',
              extra: extraData
            }
          ]
        });
      } else if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
        new Notification(title, { body: body, icon: 'img/kerala-splash.jpg' });
      }
    } catch (e) {
      console.warn('Native notification trigger note:', e.message);
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

    const phoneLink = extraData.phone ? ('<a href="tel:' + extraData.phone + '" class="inapp-banner-call-btn" onclick="event.stopPropagation()">📞 വിളിക്കുക</a>') : '';

    banner.innerHTML = `
      <div class="inapp-banner-icon">${icon}</div>
      <div class="inapp-banner-content">
        <div class="inapp-banner-title">${escapeHtml(title)}</div>
        <div class="inapp-banner-body">${escapeHtml(body)}</div>
      </div>
      <div class="inapp-banner-actions">
        ${phoneLink}
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
    const body = `📍 ${row.location || 'കണ്ണൂർ'}: "${row.description || row.title || 'സഹായം വേണം'}". കസ്റ്റമർ: ${row.phone}`;

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

  function handleIncomingBloodRequest(row) {
    if (!row) return;
    const myPhone = (typeof APP_STATE !== 'undefined' && APP_STATE.currentUser && APP_STATE.currentUser.phone)
      ? APP_STATE.currentUser.phone.replace(/\D/g, '').slice(-10) : '';
    const reqPhone = (row.contact_phone ? String(row.contact_phone).replace(/\D/g, '').slice(-10) : '');

    // Don't notify requester self
    if (reqPhone && myPhone && reqPhone === myPhone) return;

    const title = '🚨 അടിയന്തര രക്ത ആവശ്യം! (' + (row.blood_group || 'Emergency') + ')';
    const body = '🏥 ' + (row.hospital || 'ആശുപത്രി') + ' (' + (row.location || 'കേരളം') + ') - രോഗിക്ക് ' + (row.blood_group || '') + ' രക്തം അടിയന്തിരമായി വേണം! വിളിക്കുക: ' + row.contact_phone;

    sendNativePhoneNotification(title, body, {
      type: 'blood',
      phone: row.contact_phone,
      patient: row.patient_name,
      group: row.blood_group,
      hospital: row.hospital
    });

    if (typeof APP_STATE !== 'undefined') {
      if (!APP_STATE.bloodRequests) APP_STATE.bloodRequests = [];
      const exists = APP_STATE.bloodRequests.some(r => r.id === row.id);
      if (!exists) {
        APP_STATE.bloodRequests.unshift({
          id: row.id,
          patient: row.patient_name,
          hospital: row.hospital,
          group: row.blood_group,
          units: row.units || '1',
          phone: row.contact_phone,
          location: row.location,
          status: row.status || 'urgent',
          timestamp: Number(row.created_at) || Date.now()
        });
      }
      if (typeof renderBloodScreen === 'function' && APP_STATE.currentScreen === 'blood') {
        renderBloodScreen();
      }
    }
  }

  // Database Row-Level Realtime Subscriptions (PostgreSQL CDC)
  function setupDatabaseListeners() {
    if (!client) return;
    try {
      // Realtime listener for new posts inserted in the posts table
      client.channel('public:posts')
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
        .subscribe();

      // Realtime listener for new services inserted in the services table
      client.channel('public:services')
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
        .subscribe();

      // Realtime listener for new service requests / provider enquiries
      client.channel('public:service_requests')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'service_requests' }, payload => {
          if (payload && payload.new) {
            handleIncomingServiceRequest(payload.new);
          }
        })
        .subscribe();

      // Realtime listener for emergency blood requests
      client.channel('public:blood_requests')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'blood_requests' }, payload => {
          if (payload && payload.new) {
            handleIncomingBloodRequest(payload.new);
          }
        })
        .subscribe();

      // Realtime listener for new chat messages inserted into messages table
      client.channel('public:messages')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
          if (payload && payload.new) {
            const row = payload.new;
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
        .subscribe();

      // Realtime listener for jobs inserted/updated into jobs table
      client.channel('public:jobs')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'jobs' }, payload => {
          if (payload && payload.new) {
            handleIncomingJob(payload.new);
          }
        })
        .subscribe();

      // Realtime listener for rentals inserted/updated into rentals table
      client.channel('public:rentals')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'rentals' }, payload => {
          if (payload && payload.new) {
            handleIncomingRental(payload.new);
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
    const senderPhone = (msgObj.senderPhone ? String(msgObj.senderPhone).replace(/\D/g, '').slice(-10) : '');

    // Ignore duplicate of own message
    if (msgObj.senderId === myId || (myPhone && senderPhone && myPhone === senderPhone)) {
      return;
    }

    // Verify recipient so 1-on-1 chats only go to the intended participant
    const recPhone = (metaObj && metaObj.recipientPhone ? String(metaObj.recipientPhone).replace(/\D/g, '').slice(-10) : '');
    const recId = (metaObj && metaObj.recipientId ? metaObj.recipientId : '');
    const myName = (typeof APP_STATE !== 'undefined' && APP_STATE.currentUser && APP_STATE.currentUser.name)
      ? APP_STATE.currentUser.name.trim().toLowerCase() : '';
    const recName = (metaObj && metaObj.recipientName ? String(metaObj.recipientName).trim().toLowerCase() : '');
    const cleanMyId = myId ? myId.replace(/[^a-zA-Z0-9]/g, '') : '';
    const isForMe = (!metaObj) ||
      (myPhone && recPhone && myPhone === recPhone) ||
      (myId && recId && myId === recId) ||
      (myPhone && chatKey.includes(myPhone)) ||
      (cleanMyId && chatKey.includes(cleanMyId)) ||
      (myName && recName && myName === recName) ||
      (myName && chatKey.toLowerCase().includes(myName));

    if (!isForMe) {
      return;
    }

    console.info('📩 [Supabase] Incoming message for chat:', chatKey, msgObj.text);

    if (typeof APP_STATE !== 'undefined') {
      if (!APP_STATE.chats) APP_STATE.chats = {};
      if (!APP_STATE.chats[chatKey]) APP_STATE.chats[chatKey] = [];

      const exists = APP_STATE.chats[chatKey].some(m => m.id === msgObj.id || (m.timestamp === msgObj.timestamp && m.text === msgObj.text));
      if (!exists) {
        APP_STATE.chats[chatKey].push({
          id: msgObj.id || ('msg_' + Date.now()),
          sender: 'them',
          senderId: msgObj.senderId || '',
          senderPhone: msgObj.senderPhone || '',
          senderName: msgObj.senderName || 'സുഹൃത്ത്',
          senderAvatar: msgObj.senderAvatar || '',
          text: msgObj.text,
          time: msgObj.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          timestamp: msgObj.timestamp || Date.now()
        });

        if (!APP_STATE.chatMeta) APP_STATE.chatMeta = {};
        if (!APP_STATE.chatMeta[chatKey] || metaObj) {
          APP_STATE.chatMeta[chatKey] = {
            name: msgObj.senderName || (metaObj ? metaObj.senderName : 'സുഹൃത്ത്'),
            phone: msgObj.senderPhone || (metaObj ? metaObj.senderPhone : ''),
            avatar: msgObj.senderAvatar || (metaObj ? metaObj.senderAvatar : ''),
            recipientId: msgObj.senderId || ''
          };
        }

        if (typeof saveChats === 'function') {
          try { saveChats(); } catch (_) {}
        }

        // Active chat thread update
        if (APP_STATE.activeChatRecipient && APP_STATE.activeChatRecipient.key === chatKey) {
          if (typeof renderChatMessages === 'function') {
            try { renderChatMessages(); } catch (_) {}
          }
        } else {
          // Update chat list if on chat screen
          if (typeof renderChatListScreen === 'function' && APP_STATE.currentScreen === 'chat') {
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

    if (chatSubscribers.has(chatKey)) {
      const callbacks = chatSubscribers.get(chatKey);
      callbacks.forEach(cb => {
        try {
          if (typeof APP_STATE !== 'undefined' && APP_STATE.chats[chatKey]) {
            cb(APP_STATE.chats[chatKey]);
          }
        } catch (_) {}
      });
    }
  }

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
      district: j.district || (typeof APP_STATE !== 'undefined' && APP_STATE.location ? APP_STATE.location.district : 'കണ്ണൂർ'),
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
      district: r.district || (typeof APP_STATE !== 'undefined' && APP_STATE.location ? APP_STATE.location.district : 'കണ്ണൂർ'),
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

  // =========================================================================
  // PUBLIC SUPABASE SERVICES API
  // =========================================================================

  // 1. CHAT
  async function sendChatMessage(chatKey, msgObj, metaObj) {
    if (!chatKey || !msgObj) return false;
    initSupabase();

    if (chatChannel) {
      try {
        await chatChannel.send({
          type: 'broadcast',
          event: 'chat_message',
          payload: { chatKey, msgObj, metaObj }
        });
      } catch (err) {
        console.warn('⚠️ [Supabase Chat Broadcast]', err.message);
      }
    }

    if (client) {
      try {
        await client.from('messages').insert({
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
        });
        console.info('💾 [Supabase] Message saved to persistent database table');
      } catch (e) {
        console.info('ℹ️ [Supabase Messages Table note]:', e.message);
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

    if (client) {
      client.from('messages')
        .select('*')
        .eq('chat_key', chatKey)
        .order('created_at', { ascending: true })
        .then(({ data, error }) => {
          if (!error && Array.isArray(data) && data.length > 0) {
            console.info('📥 [Supabase] Loaded past thread messages:', data.length);
            const myId = (typeof APP_STATE !== 'undefined' && APP_STATE.currentUser) ? APP_STATE.currentUser.id : '';
            const myPhone = (typeof APP_STATE !== 'undefined' && APP_STATE.currentUser && APP_STATE.currentUser.phone) 
              ? APP_STATE.currentUser.phone.replace(/\D/g, '').slice(-10) : '';

            const mapped = data.map(m => {
              const mPhone = (m.sender_phone ? String(m.sender_phone).replace(/\D/g, '').slice(-10) : '');
              const isMe = (m.sender_id === myId) || (myPhone && mPhone && mPhone === myPhone);
              return {
                id: m.id,
                sender: isMe ? 'me' : 'them',
                senderId: m.sender_id,
                senderPhone: m.sender_phone,
                senderName: m.sender_name,
                senderAvatar: m.sender_avatar,
                text: m.text,
                time: m.time || 'ഇപ്പോൾ',
                timestamp: Number(m.created_at) || Date.now()
              };
            });
            onMessagesUpdate(mapped);
          }
        }).catch(() => {});
    }

    return () => {
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

      const { data, error } = await client.from('messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (!error && Array.isArray(data) && data.length > 0) {
        data.forEach(row => {
          const key = row.chat_key;
          if (!key) return;

          const rowSenderPhone = row.sender_phone ? String(row.sender_phone).replace(/\D/g, '').slice(-10) : '';
          const rowRecipientPhone = row.recipient_phone ? String(row.recipient_phone).replace(/\D/g, '').slice(-10) : '';

          const myName = (typeof APP_STATE !== 'undefined' && APP_STATE.currentUser && APP_STATE.currentUser.name)
            ? APP_STATE.currentUser.name.trim().toLowerCase() : '';
          const rowRecipientName = row.recipient_name ? String(row.recipient_name).trim().toLowerCase() : '';
          const rowSenderName = row.sender_name ? String(row.sender_name).trim().toLowerCase() : '';

          const isForMe = (myId && (row.sender_id === myId || row.recipient_id === myId)) ||
                          (myPhone && (rowSenderPhone === myPhone || rowRecipientPhone === myPhone || key.includes(myPhone))) ||
                          (myName && (rowSenderName === myName || rowRecipientName === myName || key.toLowerCase().includes(myName)));

          if (!isForMe) return;

          if (typeof APP_STATE !== 'undefined') {
            if (!APP_STATE.chats) APP_STATE.chats = {};
            if (!APP_STATE.chats[key]) APP_STATE.chats[key] = [];
            const exists = APP_STATE.chats[key].some(m => m.id === row.id);
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
          mapped.forEach(cloudPost => {
            const idx = APP_STATE.posts.findIndex(p => p.id === cloudPost.id);
            if (idx >= 0) {
              APP_STATE.posts[idx] = { ...APP_STATE.posts[idx], ...cloudPost };
            } else {
              APP_STATE.posts.unshift(cloudPost);
            }
          });
          if (typeof savePosts === 'function') savePosts();
          if (typeof renderCommunityFeed === 'function') renderCommunityFeed();
          if (typeof renderHomeCommunityFeed === 'function') renderHomeCommunityFeed();
          if (typeof renderCommunityScreen === 'function') renderCommunityScreen();
        }

        if (typeof callback === 'function') callback(mapped);
      }
    } catch (_) {}
  }

  // 3. SERVICES DIRECTORY
  async function saveService(serviceObj) {
    if (!serviceObj) return;
    initSupabase();

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
        await client.from('blood_requests').upsert({
          id: reqObj.id || ('breq_' + Date.now()),
          patient_name: reqObj.patientName || '',
          blood_group: reqObj.group || reqObj.bloodGroup,
          units: reqObj.units || '1 Unit',
          hospital: reqObj.hospital || '',
          contact_phone: reqObj.phone || '',
          location: reqObj.location || '',
          latitude: reqObj.lat || null,
          longitude: reqObj.lon || null,
          needed_by: reqObj.neededBy || '',
          status: 'urgent',
          created_at: Date.now()
        });
        console.info('💾 [Supabase] Blood request broadcasted');
      } catch (_) {}
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
          district: jobObj.district || (typeof APP_STATE !== 'undefined' && APP_STATE.location ? APP_STATE.location.district : 'കണ്ണൂർ'),
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
          if (typeof renderJobsScreen === 'function') renderJobsScreen();
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
          if (typeof renderRentalsScreen === 'function') renderRentalsScreen();
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

  // 9. USER PROFILES CLOUD SYNC (Phone-based deterministic ID)
  async function saveUserProfile(userObj) {
    if (!userObj) return false;
    const client = initSupabase();
    if (!client) return false;

    try {
      const rawPhone = userObj.phone || '';
      const cleanPhone = rawPhone.replace(/\D/g, '').slice(-10);
      const userId = userObj.id || (cleanPhone ? ('usr_' + cleanPhone) : ('usr_me_' + Date.now()));
      const lat = (userObj.lat != null) ? userObj.lat : (typeof APP_STATE !== 'undefined' && APP_STATE.location ? APP_STATE.location.lat : null);
      const lon = (userObj.lon != null) ? userObj.lon : (typeof APP_STATE !== 'undefined' && APP_STATE.location ? APP_STATE.location.lon : null);

      const payload = {
        id: userId,
        name: userObj.name || 'നാട്ടുകാരൻ',
        phone: rawPhone,
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
      return true;
    } catch (err) {
      console.error('❌ [Supabase] Profile save error:', err);
      return false;
    }
  }

  async function fetchUserProfile(phoneOrId) {
    if (!phoneOrId) return null;
    const client = initSupabase();
    if (!client) return null;

    try {
      const cleanDigits = String(phoneOrId).replace(/\D/g, '').slice(-10);
      const targetId = String(phoneOrId).startsWith('usr_') ? String(phoneOrId) : (cleanDigits ? ('usr_' + cleanDigits) : phoneOrId);

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
        .limit(60);

      if (error) {
        console.warn('⚠️ [Supabase] Sync profiles error:', error.message);
        return [];
      }

      if (Array.isArray(data) && typeof APP_STATE !== 'undefined') {
        APP_STATE.cloudProfiles = data.map(p => ({
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

        if (APP_STATE.currentScreen === 'nearby' && typeof renderNearbyScreen === 'function') {
          renderNearbyScreen();
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
    syncProfiles,
    // Chat
    sendChatMessage,
    subscribeChatThread,
    syncUserChats,
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
    saveAmbulanceDriver
  };

  window.NN_SUPABASE_SERVICES = api;
  // Seamless fallback alias so any legacy scripts continue without breaking
  window.NN_FIREBASE_SERVICES = api;

  // Auto-init on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(initSupabase, 200));
  } else {
    setTimeout(initSupabase, 200);
  }

})();
