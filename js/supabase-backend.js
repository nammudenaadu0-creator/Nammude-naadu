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
    } catch (e) {
      console.warn('ℹ️ [Supabase Realtime DB Listeners note]:', e.message);
    }
  }

  // Handle incoming real-time chat message from another user
  function handleIncomingChatMessage(payload) {
    if (!payload || !payload.chatKey || !payload.msgObj) return;
    const { chatKey, msgObj, metaObj } = payload;

    if (typeof APP_STATE !== 'undefined' && APP_STATE.currentUser && msgObj.senderId === APP_STATE.currentUser.id) {
      return; // Ignore duplicate of own message
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

        if (APP_STATE.activeChatRecipient && APP_STATE.activeChatRecipient.key === chatKey) {
          if (typeof renderChatMessages === 'function') {
            try { renderChatMessages(); } catch (_) {}
          }
        } else {
          if (typeof showToastNotice === 'function') {
            showToastNotice(`💬 ${msgObj.senderName}: ${String(msgObj.text).substring(0, 35)}...`);
          }
          if (typeof renderChatsScreen === 'function') {
            try { renderChatsScreen(); } catch (_) {}
          }
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
      if (typeof renderCommunityScreen === 'function' && APP_STATE.currentScreen === 'community') {
        renderCommunityScreen();
      }
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
              ? APP_STATE.currentUser.phone.replace(/\D/g, '') : '';

            const mapped = data.map(m => {
              const mPhone = (m.sender_phone ? m.sender_phone.replace(/\D/g, '') : '');
              const isMe = (m.sender_id === myId) || (myPhone && mPhone && mPhone === myPhone);
              return {
                id: m.id,
                sender: isMe ? 'me' : 'them',
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
      const myPhone = (typeof APP_STATE !== 'undefined' && APP_STATE.currentUser && APP_STATE.currentUser.phone)
        ? APP_STATE.currentUser.phone.replace(/\D/g, '') : '';
      const myId = (typeof APP_STATE !== 'undefined' && APP_STATE.currentUser) ? APP_STATE.currentUser.id : '';

      const { data, error } = await client.from('messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (!error && Array.isArray(data) && data.length > 0) {
        data.forEach(row => {
          const key = row.chat_key;
          if (!key) return;
          if (typeof APP_STATE !== 'undefined') {
            if (!APP_STATE.chats) APP_STATE.chats = {};
            if (!APP_STATE.chats[key]) APP_STATE.chats[key] = [];
            const exists = APP_STATE.chats[key].some(m => m.id === row.id);
            if (!exists) {
              const mPhone = (row.sender_phone ? row.sender_phone.replace(/\D/g, '') : '');
              const isMe = (row.sender_id === myId) || (myPhone && mPhone && mPhone === myPhone);
              APP_STATE.chats[key].push({
                id: row.id,
                sender: isMe ? 'me' : 'them',
                senderName: row.sender_name,
                senderAvatar: row.sender_avatar,
                text: row.text,
                time: row.time || 'ഇപ്പോൾ',
                timestamp: Number(row.created_at) || Date.now()
              });
            }
          }
        });
        if (typeof saveChats === 'function') saveChats();
        if (typeof renderChatsScreen === 'function' && APP_STATE.currentScreen === 'chats') {
          renderChatsScreen();
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
          created_at: postObj.createdAt || postObj.timestamp || Date.now()
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
        const mapped = data.map(p => ({
          id: p.id,
          authorName: p.author_name,
          authorPhone: p.author_phone,
          authorAvatar: p.author_avatar,
          authorId: p.user_id,
          content: p.content,
          category: p.category,
          type: p.category || 'announcement',
          image: p.image_url,
          imageUrl: p.image_url,
          locationName: p.location_name,
          authorLocation: p.location_name || 'കേരളം',
          district: p.district,
          lat: p.latitude,
          lon: p.longitude,
          latitude: p.latitude,
          longitude: p.longitude,
          likes: p.likes || 0,
          timestamp: Number(p.created_at) || Date.now(),
          time: 'ക്ലൗഡ്'
        }));

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
          if (typeof renderCommunityScreen === 'function' && APP_STATE.currentScreen === 'community') {
            renderCommunityScreen();
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

  // 6. JOBS & RENTALS
  async function saveJob(jobObj) {
    if (!jobObj) return;
    initSupabase();
    if (client) {
      try {
        await client.from('jobs').upsert({
          id: jobObj.id || ('job_' + Date.now()),
          employer: jobObj.employer || '',
          title: jobObj.title || '',
          category: jobObj.category || 'other',
          salary: jobObj.salary || '',
          phone: jobObj.phone || '',
          location: jobObj.location || '',
          latitude: jobObj.lat || null,
          longitude: jobObj.lon || null,
          description: jobObj.description || '',
          created_at: Date.now()
        });
      } catch (_) {}
    }
  }

  async function saveRental(rentObj) {
    if (!rentObj) return;
    initSupabase();
    if (client) {
      try {
        await client.from('rentals').upsert({
          id: rentObj.id || ('rent_' + Date.now()),
          title: rentObj.title || '',
          owner: rentObj.owner || '',
          type: rentObj.type || 'house',
          category: rentObj.category || 'rent',
          price: rentObj.price || '',
          deposit: rentObj.deposit || '',
          phone: rentObj.phone || '',
          location: rentObj.location || '',
          latitude: rentObj.lat || null,
          longitude: rentObj.lon || null,
          image_url: rentObj.image || '',
          created_at: Date.now()
        });
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

      const payload = {
        id: userId,
        name: userObj.name || 'നാട്ടുകാരൻ',
        phone: rawPhone,
        place: userObj.location || '',
        avatar: userObj.avatar || '',
        blood_group: userObj.bloodGroup || 'O+',
        is_donor: !!userObj.isDonor,
        updated_at: Date.now()
      };

      const { data, error } = await client
        .from('profiles')
        .upsert(payload, { onConflict: 'id' });

      if (error) {
        console.warn('⚠️ [Supabase] Profile upsert warning:', error.message);
        return false;
      }
      console.info('✅ [Supabase] User profile synced to cloud with ID:', userId);
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

  // EXPORT GLOBALLY & PROVIDE TRANSPARENT BACKWARDS COMPATIBILITY
  const api = {
    init: initSupabase,
    get client() { return client; },
    // Profile
    saveUserProfile,
    fetchUserProfile,
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
    // Jobs & Rentals
    saveJob,
    saveRental
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
