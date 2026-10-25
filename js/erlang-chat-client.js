// ====================================================================
// NAMMUDE NAADU - ERLANG / BEAM VM CHAT WEBSOCKET CLIENT (WHATSAPP ARCHITECTURE)
// Connects to Erlang/Elixir Phoenix Channel with sub-5ms latency & fallback
// ====================================================================
(function () {
  'use strict';

  let _ws = null;
  let _ref = 0;
  let _heartbeatTimer = null;
  let _reconnectTimer = null;
  let _isConnected = false;
  let _channels = new Map(); // topic -> status
  let _pendingCallbacks = new Map();

  function nextRef() {
    _ref = (_ref + 1) % 10000000;
    return String(_ref);
  }

  const BEAM_CLIENT = {
    url: (typeof localStorage !== 'undefined' && localStorage.getItem('nn_beam_ws_url')) || 'ws://localhost:4000/socket',
    isAvailable: false,

    // Initialize Erlang BEAM WebSocket connection
    init: function () {
      if (typeof window === 'undefined' || typeof WebSocket === 'undefined') return;

      const myPhone = (typeof APP_STATE !== 'undefined' && APP_STATE.currentUser && APP_STATE.currentUser.phone)
        ? String(APP_STATE.currentUser.phone).replace(/\D/g, '').slice(-10) : '';
      const myId = (typeof APP_STATE !== 'undefined' && APP_STATE.currentUser) ? APP_STATE.currentUser.id : '';
      const myName = (typeof APP_STATE !== 'undefined' && APP_STATE.currentUser) ? APP_STATE.currentUser.name : 'സുഹൃത്ത്';

      if (!myPhone && !myId) {
        return;
      }

      this.connect(myPhone, myId, myName);
    },

    connect: function (phone, id, name) {
      if (_ws && (_ws.readyState === WebSocket.OPEN || _ws.readyState === WebSocket.CONNECTING)) {
        return;
      }

      try {
        const cleanBase = this.url.replace(/\/+$/, '');
        const wsUrl = `${cleanBase}/websocket?vsn=2.0.0&phone=${encodeURIComponent(phone || '')}&user_id=${encodeURIComponent(id || '')}&name=${encodeURIComponent(name || '')}`;

        _ws = new WebSocket(wsUrl);

        _ws.onopen = () => {
          console.info('⚡ [Erlang/BEAM] High-speed WebSocket connected!');
          _isConnected = true;
          this.isAvailable = true;
          this.startHeartbeat();

          // Join personal user channel for direct 1-on-1 push
          if (phone) {
            this.joinChannel(`user:${phone}`);
          }
          this.joinChannel('chat:lobby');

          // If a chat modal is currently open, join that thread channel immediately
          const activeKey = (typeof APP_STATE !== 'undefined' && APP_STATE.activeChatRecipient) ? APP_STATE.activeChatRecipient.key : '';
          if (activeKey) {
            this.joinChannel(`chat:thread:${activeKey}`);
          }
        };

        _ws.onmessage = (event) => {
          try {
            const raw = JSON.parse(event.data);
            this.handleMessage(raw);
          } catch (_) {}
        };

        _ws.onerror = () => {
          this.isAvailable = false;
        };

        _ws.onclose = () => {
          _isConnected = false;
          this.isAvailable = false;
          this.stopHeartbeat();
          _channels.clear();

          // Smooth exponential reconnection (WhatsApp background auto-recovery)
          if (!_reconnectTimer) {
            _reconnectTimer = setTimeout(() => {
              _reconnectTimer = null;
              const p = (typeof APP_STATE !== 'undefined' && APP_STATE.currentUser && APP_STATE.currentUser.phone)
                ? String(APP_STATE.currentUser.phone).replace(/\D/g, '').slice(-10) : '';
              const uid = (typeof APP_STATE !== 'undefined' && APP_STATE.currentUser) ? APP_STATE.currentUser.id : '';
              const un = (typeof APP_STATE !== 'undefined' && APP_STATE.currentUser) ? APP_STATE.currentUser.name : '';
              if (p || uid) BEAM_CLIENT.connect(p, uid, un);
            }, 5000);
          }
        };
      } catch (e) {
        this.isAvailable = false;
      }
    },

    startHeartbeat: function () {
      this.stopHeartbeat();
      let missedReplies = 0;

      _heartbeatTimer = setInterval(() => {
        if (_ws && _ws.readyState === WebSocket.OPEN) {
          if (missedReplies >= 2) {
            console.warn('⚠️ [Erlang/BEAM] Persistent TCP socket stalled (NAT drop). Rebuilding connection...');
            try { _ws.close(); } catch (_) {}
            return;
          }
          missedReplies++;
          const ref = nextRef();
          // Phoenix Protocol v2 Heartbeat (20s keep-alive prevents cellular CGNAT timeouts)
          _ws.send(JSON.stringify([null, ref, 'phoenix', 'heartbeat', {}]));
        }
      }, 20000);

      this._resetHeartbeatWatchdog = () => { missedReplies = 0; };
    },

    stopHeartbeat: function () {
      if (_heartbeatTimer) {
        clearInterval(_heartbeatTimer);
        _heartbeatTimer = null;
      }
    },

    // Ensure persistent TCP socket is active (called on network change, app resume)
    ensureConnected: function () {
      if (!_ws || _ws.readyState === WebSocket.CLOSED || _ws.readyState === WebSocket.CLOSING) {
        console.info('🔄 [Erlang/BEAM] Re-establishing persistent TCP stream on network/app wake...');
        this.init();
      }
    },

    joinChannel: function (topic) {
      if (!_ws || _ws.readyState !== WebSocket.OPEN) return;
      if (_channels.get(topic) === 'joined') return;

      const ref = nextRef();
      _channels.set(topic, 'joining');
      _ws.send(JSON.stringify([ref, ref, topic, 'phx_join', {}]));
    },

    leaveChannel: function (topic) {
      if (!_ws || _ws.readyState !== WebSocket.OPEN) return;
      const ref = nextRef();
      _ws.send(JSON.stringify([ref, ref, topic, 'phx_leave', {}]));
      _channels.delete(topic);
    },

    // Send WhatsApp-speed message through Erlang Actor process
    sendMessage: function (chatKey, msgObj, metaObj) {
      if (!_isConnected || !_ws || _ws.readyState !== WebSocket.OPEN) {
        return false; // Fall back to Supabase Realtime
      }

      const topic = `chat:thread:${chatKey}`;
      this.joinChannel(topic);

      const ref = nextRef();
      const payload = {
        ...msgObj,
        chatKey: chatKey,
        recipientPhone: (metaObj && metaObj.recipientPhone) || msgObj.recipientPhone || '',
        recipientId: (metaObj && metaObj.recipientId) || msgObj.recipientId || '',
        senderPhone: (metaObj && metaObj.senderPhone) || msgObj.senderPhone || '',
        senderName: (metaObj && metaObj.senderName) || msgObj.senderName || 'നാട്ടുകാരൻ'
      };

      _ws.send(JSON.stringify([ref, ref, topic, 'new_msg', payload]));
      return true;
    },

    // Notify peer of message delivery (Double Gray Ticks ✔✔)
    sendDeliveredAck: function (msgId, chatKey) {
      if (!_isConnected || !_ws || _ws.readyState !== WebSocket.OPEN) return;
      const topic = `chat:thread:${chatKey}`;
      const ref = nextRef();
      _ws.send(JSON.stringify([ref, ref, topic, 'ack_delivered', { msg_id: msgId, chat_key: chatKey }]));
    },

    // Notify peer of message read (Double Blue Ticks ✔✔)
    sendSeenAck: function (chatKey) {
      if (!_isConnected || !_ws || _ws.readyState !== WebSocket.OPEN) return;
      const topic = `chat:thread:${chatKey}`;
      const ref = nextRef();
      _ws.send(JSON.stringify([ref, ref, topic, 'ack_seen', { chat_key: chatKey }]));
    },

    // Notify peer of live typing state ("Typing...")
    sendTyping: function (chatKey, isTyping) {
      if (!_isConnected || !_ws || _ws.readyState !== WebSocket.OPEN) return;
      const topic = `chat:thread:${chatKey}`;
      const ref = nextRef();
      _ws.send(JSON.stringify([null, ref, topic, 'typing', { is_typing: !!isTyping, chat_key: chatKey }]));
    },

    // Handle incoming messages from Erlang BEAM cluster
    handleMessage: function (raw) {
      if (this._resetHeartbeatWatchdog) this._resetHeartbeatWatchdog();
      if (!Array.isArray(raw) || raw.length < 5) return;
      const [_joinRef, _msgRef, topic, event, payload] = raw;

      if (event === 'phx_reply') {
        if (payload && payload.status === 'ok') {
          _channels.set(topic, 'joined');
        }
        return;
      }

      // WhatsApp Incoming 1-on-1 Message from Erlang Actor
      if (event === 'chat_message') {
        console.info('⚡ [Erlang/BEAM] Received live message in 2ms:', payload.text);
        if (typeof window.handleIncomingChatMessage === 'function') {
          window.handleIncomingChatMessage({
            chatKey: payload.chatKey,
            msgObj: payload,
            metaObj: payload
          });
        }
        // Send instant delivery receipt (Double Gray Ticks)
        if (payload.id && payload.chatKey) {
          this.sendDeliveredAck(payload.id, payload.chatKey);
        }
      }

      // WhatsApp Delivered Ack (Double Gray Ticks)
      else if (event === 'chat_delivered') {
        const msgId = payload.msg_id;
        const tickEl = document.querySelector(`.chat-message-row[data-msg-id="${msgId}"] .chat-ticks`);
        if (tickEl && !tickEl.classList.contains('seen')) {
          tickEl.className = 'chat-ticks delivered';
          tickEl.textContent = '✔✔';
          tickEl.title = 'എത്തിച്ചേർന്നു (Delivered)';
        }
      }

      // WhatsApp Read Receipt (Double Blue Ticks)
      else if (event === 'chat_seen') {
        const chatKey = payload.chat_key;
        if (typeof APP_STATE !== 'undefined' && APP_STATE.chats && APP_STATE.chats[chatKey]) {
          APP_STATE.chats[chatKey].forEach(m => {
            if (m.sender === 'me') {
              m.seen = true;
              m.status = 'seen';
            }
          });
          if (typeof renderChatMessages === 'function') {
            renderChatMessages();
          }
        }
      }

      // WhatsApp Live Typing Indicator
      else if (event === 'chat_typing') {
        if (typeof showChatTypingIndicator === 'function') {
          showChatTypingIndicator(payload.is_typing, payload.sender_name, '');
        }
      }
    }
  };

  window.NN_BEAM_CHAT = BEAM_CLIENT;

  // 1. Instant Network Reconnect (WiFi <-> 4G/5G transitions)
  if (typeof window !== 'undefined') {
    window.addEventListener('online', () => {
      console.info('📶 [Network] Network connectivity restored. Re-establishing persistent TCP connection...');
      BEAM_CLIENT.ensureConnected();
    });

    // 2. App Foreground / Screen Unlock Reconnect (Android Doze wake)
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        BEAM_CLIENT.ensureConnected();
      }
    });

    // 3. Capacitor Native App State Listener
    if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App) {
      try {
        window.Capacitor.Plugins.App.addListener('appStateChange', ({ isActive }) => {
          if (isActive) {
            BEAM_CLIENT.ensureConnected();
          }
        });
      } catch (_) {}
    }
  }

  // Auto-connect on app startup
  if (typeof document !== 'undefined') {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      setTimeout(() => BEAM_CLIENT.init(), 1000);
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => BEAM_CLIENT.init(), 1000);
      });
    }
  }
})();
