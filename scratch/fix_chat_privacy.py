import re

# 1. Update js/supabase-backend.js
path_backend = "js/supabase-backend.js"
with open(path_backend, "r", encoding="utf-8") as f:
    text = f.read()

target = """    // 2. RECIPIENT VERIFICATION: Ensure the intended recipient receives this message!
    const recPhone = (metaObj && metaObj.recipientPhone ? String(metaObj.recipientPhone).replace(/\\D/g, '').slice(-10) : '') ||
                    (msgObj.recipientPhone ? String(msgObj.recipientPhone).replace(/\\D/g, '').slice(-10) : '');
    const recId = (metaObj && metaObj.recipientId ? metaObj.recipientId : '') || (msgObj.recipientId || '');
    const recEmail = (metaObj && metaObj.recipientEmail ? String(metaObj.recipientEmail).trim().toLowerCase() : '') ||
                     (msgObj.recipientEmail ? String(msgObj.recipientEmail).trim().toLowerCase() : '');

    const phones = String(chatKey).match(/\\d{10}/g) || [];
    const isRecPhoneMatch = Boolean(myPhone && recPhone && myPhone.length === 10 && myPhone === recPhone);
    const isPhoneInKeyMatch = Boolean(myPhone && myPhone.length === 10 && (phones.includes(myPhone) || String(chatKey).includes(myPhone)));
    const isRecIdMatch = Boolean(myId && recId && (myId === recId || myId.replace(/\\D/g, '') === recId.replace(/\\D/g, '')));
    const isRecEmailMatch = Boolean(myEmail && recEmail && myEmail.includes('@') && myEmail === recEmail);

    const cleanMyId = myId ? myId.replace(/[^a-zA-Z0-9]/g, '') : '';
    const isIdInKeyMatch = Boolean(cleanMyId && (String(chatKey).includes(cleanMyId) || (myId && String(chatKey).includes(myId))));

    // Active Chat or Existing Chat thread match: If user currently has this thread open or in chat list
    const activeRecipient = (typeof APP_STATE !== 'undefined') ? APP_STATE.activeChatRecipient : null;
    const activeKey = activeRecipient ? activeRecipient.key : '';
    const activePhone = (activeRecipient && activeRecipient.phone) ? String(activeRecipient.phone).replace(/\\D/g, '').slice(-10) : '';
    const activeId = activeRecipient ? String(activeRecipient.id || '') : '';

    const isActiveThreadMatch = Boolean(
      activeKey && (
        activeKey === chatKey ||
        (phones.length >= 2 && String(activeKey).match(/\\d{10}/g)?.sort().join('_') === phones.sort().join('_')) ||
        (activePhone && senderPhone && activePhone === senderPhone) ||
        (activeId && senderId && activeId === senderId)
      )
    );

    const isMetaThreadMatch = Boolean(
      typeof APP_STATE !== 'undefined' && APP_STATE.chatMeta && (
        APP_STATE.chatMeta[chatKey] ||
        (senderPhone && Object.values(APP_STATE.chatMeta).some(m => m && m.phone && String(m.phone).replace(/\\D/g, '').slice(-10) === senderPhone))
      )
    );

    // Guaranteed Acceptance: If message belongs to user's phone, ID, open thread, or active contact
    const isForMe = isRecPhoneMatch || isPhoneInKeyMatch || isRecIdMatch || isRecEmailMatch || isIdInKeyMatch || isActiveThreadMatch || isMetaThreadMatch;
    if (!isForMe) {
      return;
    }"""

replacement = """    // 2. RECIPIENT VERIFICATION: STRICT PRIVACY ENFORCEMENT
    const phones = String(chatKey).match(/\\d{10}/g) || [];

    // Rule A: If this is a 2-phone 1-on-1 chat, the current user MUST be one of the two phones!
    if (phones.length >= 2) {
      if (!myPhone || !phones.includes(myPhone)) {
        return; // Strictly between two other people. Never accept or notify!
      }
      if (myPhone === senderPhone) {
        return; // Sent by me (handled in sender echo check)
      }
    }

    const recPhone = (metaObj && metaObj.recipientPhone ? String(metaObj.recipientPhone).replace(/\\D/g, '').slice(-10) : '') ||
                    (msgObj.recipientPhone ? String(msgObj.recipientPhone).replace(/\\D/g, '').slice(-10) : '');
    const recId = (metaObj && metaObj.recipientId ? metaObj.recipientId : '') || (msgObj.recipientId || '');
    const recEmail = (metaObj && metaObj.recipientEmail ? String(metaObj.recipientEmail).trim().toLowerCase() : '') ||
                     (msgObj.recipientEmail ? String(msgObj.recipientEmail).trim().toLowerCase() : '');

    const isRecPhoneMatch = Boolean(myPhone && recPhone && myPhone.length === 10 && myPhone === recPhone);
    const isPhoneInKeyMatch = Boolean(myPhone && myPhone.length === 10 && (phones.includes(myPhone) || String(chatKey).includes(myPhone)) && myPhone !== senderPhone);
    const isRecIdMatch = Boolean(myId && recId && (myId === recId || myId.replace(/\\D/g, '') === recId.replace(/\\D/g, '')) && myId !== senderId);
    const isRecEmailMatch = Boolean(myEmail && recEmail && myEmail.includes('@') && myEmail === recEmail && myEmail !== senderEmail);

    const cleanMyId = myId ? myId.replace(/[^a-zA-Z0-9]/g, '') : '';
    const isIdInKeyMatch = Boolean(cleanMyId && (String(chatKey).includes(cleanMyId) || (myId && String(chatKey).includes(myId))) && myId !== senderId);

    // Active Chat thread match: ONLY if user currently has this EXACT thread open for this specific contact
    const activeRecipient = (typeof APP_STATE !== 'undefined') ? APP_STATE.activeChatRecipient : null;
    const activeKey = activeRecipient ? activeRecipient.key : '';
    const activePhone = (activeRecipient && activeRecipient.phone) ? String(activeRecipient.phone).replace(/\\D/g, '').slice(-10) : '';

    const isActiveThreadMatch = Boolean(
      activeKey && activeKey === chatKey && activePhone && senderPhone && activePhone === senderPhone
    );

    // Guaranteed Acceptance: Message MUST be positively verified as meant for THIS user
    const isForMe = isRecPhoneMatch || isPhoneInKeyMatch || isRecIdMatch || isRecEmailMatch || isIdInKeyMatch || isActiveThreadMatch;
    if (!isForMe) {
      return;
    }"""

if target in text:
    text = text.replace(target, replacement, 1)
    with open(path_backend, "w", encoding="utf-8") as f:
        f.write(text)
    print("Backend updated successfully.")
else:
    print("Target not found in backend.")

# 2. Update js/nammude-naadu-engine.js
path_engine = "js/nammude-naadu-engine.js"
with open(path_engine, "r", encoding="utf-8") as f:
    eng_text = f.read()

target_eng = """  // STRICT PRIVACY FILTER: Verify if a chat thread strictly belongs to the currently logged in user / account
  function isThreadBelongingToCurrentUser(k) {
    if (!k) return false;
    const curUser = (typeof APP_STATE !== 'undefined' && APP_STATE.currentUser) ? APP_STATE.currentUser : null;
    if (!curUser) return true;

    const myCleanPhone = normalizePhone(curUser.phone);
    const myId = String(curUser.id || '').trim();
    const myEmail = String(curUser.email || '').trim().toLowerCase();

    // 1. If user has neither phone nor id nor email (guest/fresh session):
    // Never hide incoming chats that were successfully delivered to this device!
    if (!myCleanPhone && !myId && !myEmail) return true;

    // 2. Extract phone numbers from key
    const keyPhones = String(k).match(/\\d{10}/g) || [];

    // If key has 2 or more phone numbers, check if current user is one of them:
    if (keyPhones.length >= 2) {
      if (myCleanPhone && keyPhones.includes(myCleanPhone)) return true;
      // If neither phone in this 2-phone key is current user, this belongs strictly to another pair of users!
      if (myCleanPhone && !keyPhones.includes(myCleanPhone)) return false;
    }

    // 3. Direct match in key
    if (myCleanPhone && k.includes(myCleanPhone)) return true;
    if (myId && k.includes(myId)) return true;

    // 4. Check services, jobs or rentals owned by this user (e.g. srv_xxx or usr_xxx)
    const myOwnedIds = new Set();
    if (typeof APP_STATE !== 'undefined') {
      if (Array.isArray(APP_STATE.services)) {
        APP_STATE.services.forEach(s => {
          if (s && (s.isUserCreated || (myCleanPhone && normalizePhone(s.phone) === myCleanPhone) || (myId && (s.userId === myId || s.authorId === myId)))) {
            myOwnedIds.add(String(s.id).replace(/[^a-zA-Z0-9]/g, ''));
          }
        });
      }
      if (Array.isArray(APP_STATE.jobs)) {
        APP_STATE.jobs.forEach(j => {
          if (j && (j.isUserCreated || (myCleanPhone && normalizePhone(j.phone) === myCleanPhone) || (myId && j.userId === myId))) {
            myOwnedIds.add(String(j.id).replace(/[^a-zA-Z0-9]/g, ''));
          }
        });
      }
      if (Array.isArray(APP_STATE.rentals)) {
        APP_STATE.rentals.forEach(r => {
          if (r && (r.isUserCreated || (myCleanPhone && normalizePhone(r.phone) === myCleanPhone) || (myId && r.userId === myId))) {
            myOwnedIds.add(String(r.id).replace(/[^a-zA-Z0-9]/g, ''));
          }
        });
      }
    }
    const cleanKey = String(k).replace(/[^a-zA-Z0-9]/g, '');
    for (const ownedId of myOwnedIds) {
      if (ownedId && cleanKey.includes(ownedId)) return true;
    }

    // 5. Check metadata
    const meta = (APP_STATE.chatMeta && APP_STATE.chatMeta[k]) || {};
    const metaMyPhone = normalizePhone(meta.myPhone);
    const metaRecPhone = normalizePhone(meta.recipientPhone);
    const metaSendPhone = normalizePhone(meta.senderPhone);
    const partnerPhone = normalizePhone(meta.phone || meta.partnerPhone);

    if (myCleanPhone) {
      if (metaMyPhone && metaMyPhone === myCleanPhone) return true;
      if (metaRecPhone && metaRecPhone === myCleanPhone) return true;
      if (metaSendPhone && metaSendPhone === myCleanPhone) return true;
      if (partnerPhone && partnerPhone !== myCleanPhone) {
        if (metaRecPhone && metaRecPhone !== myCleanPhone) return false;
        return true;
      }
    }

    if (myId) {
      if (meta.myId && meta.myId === myId) return true;
      if (meta.recipientId && meta.recipientId === myId) return true;
      if (meta.senderId && meta.senderId === myId) return true;
    }

    // 6. Check individual messages inside thread
    const msgs = (APP_STATE.chats && APP_STATE.chats[k]) || [];
    for (let i = 0; i < msgs.length; i++) {
      const m = msgs[i];
      if (!m) continue;
      if (m.sender === 'me') return true;
      const sPhone = normalizePhone(m.senderPhone);
      const rPhone = normalizePhone(m.recipientPhone);
      if (myCleanPhone) {
        if (sPhone && sPhone === myCleanPhone) return true;
        if (rPhone && rPhone === myCleanPhone) return true;
      }
      if (myId) {
        if (m.senderId && m.senderId === myId) return true;
        if (m.recipientId && m.recipientId === myId) return true;
      }
      if (m.sender === 'them') {
        if (rPhone && myCleanPhone && rPhone !== myCleanPhone) {
          continue;
        }
        if (sPhone && myCleanPhone && sPhone === myCleanPhone) {
          return true;
        }
        if (sPhone && (!myCleanPhone || sPhone !== myCleanPhone)) {
          return true;
        }
      }
    }

    return false;
  }"""

replacement_eng = """  // STRICT PRIVACY FILTER: Verify if a chat thread strictly belongs to the currently logged in user / account
  function isThreadBelongingToCurrentUser(k) {
    if (!k) return false;
    const curUser = (typeof APP_STATE !== 'undefined' && APP_STATE.currentUser) ? APP_STATE.currentUser : null;
    if (!curUser) return false;

    const myCleanPhone = normalizePhone(curUser.phone);
    const myId = String(curUser.id || '').trim();

    // 1. Extract phone numbers from key
    const keyPhones = String(k).match(/\\d{10}/g) || [];

    // If key has 2 or more phone numbers, check if current user is one of them:
    if (keyPhones.length >= 2) {
      if (myCleanPhone && keyPhones.includes(myCleanPhone)) return true;
      return false; // Not one of the 2 participants, strictly belongs to someone else
    }

    // 2. Direct match in key
    if (myCleanPhone && k.includes(myCleanPhone)) return true;
    if (myId && k.includes(myId)) return true;

    // 3. Check services, jobs or rentals owned by this user
    const myOwnedIds = new Set();
    if (typeof APP_STATE !== 'undefined') {
      if (Array.isArray(APP_STATE.services)) {
        APP_STATE.services.forEach(s => {
          if (s && (s.isUserCreated || (myCleanPhone && normalizePhone(s.phone) === myCleanPhone) || (myId && (s.userId === myId || s.authorId === myId)))) {
            myOwnedIds.add(String(s.id).replace(/[^a-zA-Z0-9]/g, ''));
          }
        });
      }
      if (Array.isArray(APP_STATE.jobs)) {
        APP_STATE.jobs.forEach(j => {
          if (j && (j.isUserCreated || (myCleanPhone && normalizePhone(j.phone) === myCleanPhone) || (myId && j.userId === myId))) {
            myOwnedIds.add(String(j.id).replace(/[^a-zA-Z0-9]/g, ''));
          }
        });
      }
      if (Array.isArray(APP_STATE.rentals)) {
        APP_STATE.rentals.forEach(r => {
          if (r && (r.isUserCreated || (myCleanPhone && normalizePhone(r.phone) === myCleanPhone) || (myId && r.userId === myId))) {
            myOwnedIds.add(String(r.id).replace(/[^a-zA-Z0-9]/g, ''));
          }
        });
      }
    }
    const cleanKey = String(k).replace(/[^a-zA-Z0-9]/g, '');
    for (const ownedId of myOwnedIds) {
      if (ownedId && cleanKey.includes(ownedId)) return true;
    }

    // 4. Check metadata
    const meta = (APP_STATE.chatMeta && APP_STATE.chatMeta[k]) || {};
    const metaMyPhone = normalizePhone(meta.myPhone);
    const metaRecPhone = normalizePhone(meta.recipientPhone);
    const metaSendPhone = normalizePhone(meta.senderPhone);

    if (myCleanPhone) {
      if (metaMyPhone && metaMyPhone === myCleanPhone) return true;
      if (metaRecPhone && metaRecPhone === myCleanPhone) return true;
      if (metaSendPhone && metaSendPhone === myCleanPhone) return true;
    }

    if (myId) {
      if (meta.myId && meta.myId === myId) return true;
      if (meta.recipientId && meta.recipientId === myId) return true;
      if (meta.senderId && meta.senderId === myId) return true;
    }

    // 5. Check individual messages inside thread
    const msgs = (APP_STATE.chats && APP_STATE.chats[k]) || [];
    for (let i = 0; i < msgs.length; i++) {
      const m = msgs[i];
      if (!m) continue;
      if (m.sender === 'me') return true;
      const sPhone = normalizePhone(m.senderPhone);
      const rPhone = normalizePhone(m.recipientPhone);
      if (myCleanPhone) {
        if (sPhone && sPhone === myCleanPhone) return true;
        if (rPhone && rPhone === myCleanPhone) return true;
      }
      if (myId) {
        if (m.senderId && m.senderId === myId) return true;
        if (m.recipientId && m.recipientId === myId) return true;
      }
      if (m.sender === 'them') {
        if (rPhone && myCleanPhone && rPhone === myCleanPhone) return true;
        if (m.recipientId && myId && m.recipientId === myId) return true;
      }
    }

    return false;
  }"""

if target_eng in eng_text:
    eng_text = eng_text.replace(target_eng, replacement_eng, 1)
    with open(path_engine, "w", encoding="utf-8") as f:
        f.write(eng_text)
    print("Engine updated successfully.")
else:
    print("Target not found in engine.")
