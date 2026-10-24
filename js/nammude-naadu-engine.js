/**
 * നമ്മുടെ നാട് (Nammude Naadu) — Core PWA Full-Stack Client Engine
 * Vanilla JavaScript (ES6+), Clean State Management, Firebase RTDB + LocalStorage Fallback.
 * All functions globally exposed on window for inline HTML onclick compatibility.
 */

(function () {
  'use strict';

  // ==============================================================
  // 1. APPLICATION STATE & PERSISTENCE
  // ==============================================================
  // Clean Default Kerala Citizen Avatar (SVG gradient, safe with double quotes for inline HTML)
  const DEFAULT_USER_AVATAR = "data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 128 128%22%3E%3Cdefs%3E%3ClinearGradient id=%22avatarGrad%22 x1=%220%25%22 y1=%220%25%22 x2=%22100%25%22 y2=%22100%25%22%3E%3Cstop offset=%220%25%22 stop-color=%22%2310B981%22/%3E%3Cstop offset=%22100%25%22 stop-color=%22%23047857%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx=%2264%22 cy=%2264%22 r=%2264%22 fill=%22url(%23avatarGrad)%22/%3E%3Ccircle cx=%2264%22 cy=%2248%22 r=%2224%22 fill=%22%23ffffff%22/%3E%3Cpath d=%22M24 108c0-22.1 17.9-40 40-40s40 17.9 40 40v4H24v-4z%22 fill=%22%23ffffff%22/%3E%3C/svg%3E";
  window.DEFAULT_USER_AVATAR = DEFAULT_USER_AVATAR;

  // Safe Currency & Rate Formatter (Guarantees ₹ symbol on prices, rates, visiting fees & salaries)
  function formatPrice(val) {
    if (!val) return '';
    let s = String(val).trim();
    if (!s) return '';
    if (s.includes('₹')) {
      return s.replace(/₹\s*₹+/g, '₹');
    }
    // Replace Rs, Rs., INR, രൂപ, രൂപ.
    s = s.replace(/\b(rs\.?|inr|രൂപ\.?)\s*/gi, '₹');
    if (s.includes('₹')) return s;

    // Range like 18000 - 22000 or 18,000 - 22,000
    if (/^(\d+[\d,]*)\s*-\s*(\d+[\d,]*)/.test(s)) {
      return s.replace(/^(\d+[\d,]*)\s*-\s*(\d+[\d,]*)/, '₹$1 - ₹$2');
    }

    // Starts with number (e.g. 200, 200 വിസിറ്റിംഗ് നിരക്ക്, 500 / ദിവസം)
    if (/^\d/.test(s)) {
      return '₹' + s;
    }

    // Contains number anywhere inside text like "വിസിറ്റിംഗ് ഫീസ് 200" -> "വിസിറ്റിംഗ് ഫീസ് ₹200"
    if (/\d+/.test(s)) {
      return s.replace(/(\d+[\d,]*)/, '₹$1');
    }

    return s;
  }
  window.formatPrice = formatPrice;

  // Safe HTML Escaping Helper (protects against XSS, null/undefined, and non-string values)
  function escapeHtml(text) {
    if (text == null) return '';
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return String(text).replace(/[&<>"']/g, function (m) { return map[m]; });
  }
  window.escapeHtml = escapeHtml;

  // ==============================================================
  // COMPLETE APP RESET & FRESH START (Wipe all registered profiles)
  // ==============================================================
  function resetAppToFreshState(reload) {
    try {
      const keysToRemove = [
        'nn_user_name',
        'nn_user_phone',
        'nn_permanent_phone',
        'nn_permanent_id',
        'nn_user_id',
        'nn_user_avatar',
        'nn_user_bio',
        'nn_user_blood',
        'nn_user_is_donor',
        'nn_user_cover',
        'nn_user_loc',
        'nn_cloud_profiles',
        'nn_blood_donors',
        'nn_posts',
        'nn_jobs',
        'nn_rentals',
        'nn_chats_store',
        'nn_chats_meta',
        'nn_blood_requests',
        'nn_services',
        'nn_user_profile',
        'nn_service_user',
        'nn_saved_services',
        'nn_notifications',
        'nn_liked_posts'
      ];
      keysToRemove.forEach(k => {
        try { localStorage.removeItem(k); } catch (_) {}
      });
      localStorage.setItem('nn_fresh_start_clean_v3', 'true');
      if (typeof APP_STATE !== 'undefined') {
        APP_STATE.chats = {};
        APP_STATE.chatMeta = {};
        APP_STATE.cloudProfiles = [];
      }
      console.info('🧹 [Nammude Naadu] All local profiles, chats & storage cleared. Fresh state initialized.');
      if (reload && typeof window !== 'undefined' && window.location) {
        window.location.reload();
      }
    } catch (_) {}
  }
  window.resetAppToFreshState = resetAppToFreshState;

  // Run one-time clean-slate purge on startup to remove any old registered profiles & chats
  try {
    if (!localStorage.getItem('nn_fresh_start_clean_v3')) {
      resetAppToFreshState(false);
    }
  } catch (_) {}

  // Purge legacy dummy placeholders if previously stored
  let savedUserName = localStorage.getItem('nn_user_name') || '';
  if (savedUserName === 'അജിത് കുമാർ' || savedUserName === 'അജയകുമാർ' || savedUserName.toLowerCase() === 'ajith kumar') {
    savedUserName = '';
    try { localStorage.removeItem('nn_user_name'); } catch (_) {}
  }

  let savedUserAvatar = localStorage.getItem('nn_user_avatar') || '';
  if (savedUserAvatar && savedUserAvatar.includes('photo-1507003211169-0a1dd7228f2d')) {
    savedUserAvatar = '';
    try { localStorage.removeItem('nn_user_avatar'); } catch (_) {}
  }

  // Permanent Phone Number Persistence: Never lost once saved
  let savedUserPhone = localStorage.getItem('nn_user_phone') || localStorage.getItem('nn_permanent_phone') || '';
  if (savedUserPhone === '+91 94471 98765') {
    savedUserPhone = '';
    try {
      localStorage.removeItem('nn_user_phone');
      localStorage.removeItem('nn_permanent_phone');
    } catch (_) {}
  }

  try {
    const storedLocName = localStorage.getItem('nn_curr_loc_name');
    if (storedLocName && (storedLocName.includes('കണ്ണൂർ') || storedLocName.toLowerCase().includes('kannur'))) {
      localStorage.removeItem('nn_curr_loc_name');
      localStorage.removeItem('nn_curr_district');
    }
    const storedUserLoc = localStorage.getItem('nn_user_loc');
    if (storedUserLoc && (storedUserLoc.includes('കണ്ണൂർ') || storedUserLoc.toLowerCase().includes('kannur'))) {
      localStorage.removeItem('nn_user_loc');
    }
    const storedUserBio = localStorage.getItem('nn_user_bio');
    if (storedUserBio && storedUserBio.includes('കണ്ണൂർ')) {
      localStorage.setItem('nn_user_bio', 'നമ്മുടെ നാട് കൂട്ടായ്മ 🌿');
    }
  } catch (_) {}

  // Deterministic, Permanent User ID tied directly to Citizen Phone Number or Email ID
  function getPermanentUserId() {
    const rawPhone = localStorage.getItem('nn_user_phone') || localStorage.getItem('nn_permanent_phone') || savedUserPhone || '';
    const digits = String(rawPhone).replace(/\D/g, '').slice(-10);
    if (digits && digits.length >= 10) {
      return 'usr_' + digits;
    }
    const rawEmail = (localStorage.getItem('nn_user_email') || '').trim().toLowerCase();
    if (rawEmail && rawEmail.includes('@')) {
      return 'usr_em_' + rawEmail.replace(/[^a-z0-9]/g, '_');
    }
    let permId = localStorage.getItem('nn_permanent_id') || localStorage.getItem('nn_user_id') || '';
    if (permId && !permId.startsWith('usr_')) {
      permId = 'usr_' + permId;
    }
    if (!permId || permId.startsWith('usr_me_')) {
      permId = 'usr_nn_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 8);
    }
    return permId;
  }

  function generateUserIdFromPhone(rawPhone) {
    if (!rawPhone) return null;
    const digits = String(rawPhone).replace(/\D/g, '').slice(-10);
    return (digits && digits.length >= 10) ? ('usr_' + digits) : null;
  }
  window.generateUserIdFromPhone = generateUserIdFromPhone;
  window.getPermanentUserId = getPermanentUserId;

  const currentCitizenId = getPermanentUserId();
  try {
    localStorage.setItem('nn_user_id', currentCitizenId.replace('usr_', ''));
    localStorage.setItem('nn_permanent_id', currentCitizenId);
    if (savedUserPhone) localStorage.setItem('nn_permanent_phone', savedUserPhone);
  } catch (_) {}

  const APP_STATE = {
    currentScreen: 'home',
    previousScreen: 'home',
    currentUser: {
      id: currentCitizenId,
      name: savedUserName || 'നാട്ടുകാരൻ',
      phone: savedUserPhone || '',
      email: localStorage.getItem('nn_user_email') || '',
      location: localStorage.getItem('nn_user_loc') || 'തത്സമയ ലൊക്കേഷൻ',
      bloodGroup: localStorage.getItem('nn_user_blood') || 'O+',
      avatar: savedUserAvatar || DEFAULT_USER_AVATAR,
      cover: localStorage.getItem('nn_user_cover') || 'img/kerala-splash.jpg',
      bio: localStorage.getItem('nn_user_bio') || 'നമ്മുടെ നാട് കൂട്ടായ്മ 🌿',
      isDonor: localStorage.getItem('nn_user_is_donor') === 'true',
      isCustomized: !!savedUserName
    },
    location: {
      name: localStorage.getItem('nn_curr_loc_name') || 'തത്സമയ ലൊക്കേഷൻ',
      lat: parseFloat(localStorage.getItem('nn_curr_lat')) || 10.8505,
      lon: parseFloat(localStorage.getItem('nn_curr_lon')) || 76.2711,
      district: localStorage.getItem('nn_curr_district') || ''
    },
    activeRadiusKm: parseFloat(localStorage.getItem('nn_user_chosen_radius') || '5'),
    radiusFilters: {
      nearby: parseFloat(localStorage.getItem('nn_user_chosen_radius') || '5'),
      services: parseFloat(localStorage.getItem('nn_user_chosen_radius') || '5'),
      jobs: parseFloat(localStorage.getItem('nn_user_chosen_radius') || '5'),
      rentals: parseFloat(localStorage.getItem('nn_user_chosen_radius') || '5'),
      blood: parseFloat(localStorage.getItem('nn_user_chosen_radius') || '5')
    },
    activeNearbyCategory: 'all',
    nearbySearchQuery: '',
    activeServiceCategory: 'all',
    activeBloodGroup: 'all',
    activeJobCategory: 'all',
    activeRentalCategory: 'all',
    activeProfileSubTab: 'posts',
    tempRentalImage: null,
    tempEditPostImage: null,
    activeChatRecipient: null,
    posts: [],
    services: [],
    jobs: [],
    rentals: [],
    bloodDonors: [],
    bloodRequests: [],
    chats: {},
    serviceRequests: [],
    emergencyContacts: [],
    cloudProfiles: (function() {
      try {
        const stored = localStorage.getItem('nn_cloud_profiles');
        return stored ? JSON.parse(stored) : [];
      } catch (_) { return []; }
    })()
  };

  // Expose APP_STATE globally for cloud synchronization
  window.APP_STATE = APP_STATE;

  // Save user ID permanently
  if (!localStorage.getItem('nn_user_id')) {
    localStorage.setItem('nn_user_id', APP_STATE.currentUser.id.replace('usr_me_', ''));
  }

  // Central Helper: Resolve true profile picture of any registered citizen or entity
  function getRegisteredUserAvatar(identifier, fallback) {
    const defaultAvatar = window.DEFAULT_USER_AVATAR || DEFAULT_USER_AVATAR;
    if (!identifier && !fallback) return defaultAvatar;

    // Direct check if identifier itself is already a valid image string
    if (typeof identifier === 'string' && (identifier.startsWith('data:image/') || identifier.startsWith('http://') || identifier.startsWith('https://'))) {
      if (!identifier.includes('data:image/svg+xml') && !identifier.includes('photo-1507003211169-0a1dd7228f2d')) {
        return identifier;
      }
    }

    const cleanStr = String(identifier || '').trim();
    if (!cleanStr) return fallback || defaultAvatar;

    const cleanPhone = cleanStr.replace(/\D/g, '').slice(-10);
    const myPhone = (APP_STATE.currentUser?.phone || '').replace(/\D/g, '').slice(-10);
    const myId = APP_STATE.currentUser?.id;
    const myName = (APP_STATE.currentUser?.name || '').trim().toLowerCase();

    // 1. Check if matching current user
    if ((cleanPhone && cleanPhone === myPhone) || (myId && cleanStr === myId) || (cleanStr.toLowerCase() === myName && myName !== 'നാട്ടുകാരൻ')) {
      if (APP_STATE.currentUser?.avatar && !APP_STATE.currentUser.avatar.includes('data:image/svg+xml') && !APP_STATE.currentUser.avatar.includes('photo-1507003211169-0a1dd7228f2d')) {
        return APP_STATE.currentUser.avatar;
      }
    }

    // 2. Check Supabase cloud registered citizen profiles
    if (Array.isArray(APP_STATE.cloudProfiles)) {
      const found = APP_STATE.cloudProfiles.find(p => {
        if (!p) return false;
        const pPhone = (p.phone || '').replace(/\D/g, '').slice(-10);
        if (cleanPhone && pPhone && cleanPhone === pPhone) return true;
        if (p.id && (p.id === cleanStr || p.id === ('usr_' + cleanPhone))) return true;
        if (p.name && p.name.trim().toLowerCase() === cleanStr.toLowerCase() && p.name !== 'നാട്ടുകാരൻ') return true;
        return false;
      });
      if (found && found.avatar && found.avatar.length > 20 && !found.avatar.includes('data:image/svg+xml') && !found.avatar.includes('photo-1507003211169-0a1dd7228f2d')) {
        return found.avatar;
      }
    }

    // 3. Check registered services
    if (Array.isArray(APP_STATE.services)) {
      const found = APP_STATE.services.find(s => {
        if (!s) return false;
        const sPhone = (s.phone || '').replace(/\D/g, '').slice(-10);
        if (cleanPhone && sPhone && cleanPhone === sPhone) return true;
        if (s.id && s.id === cleanStr) return true;
        if (s.name && s.name.trim().toLowerCase() === cleanStr.toLowerCase()) return true;
        return false;
      });
      if (found && found.avatar && found.avatar.length > 20 && !found.avatar.includes('data:image/svg+xml') && !found.avatar.includes('photo-1507003211169-0a1dd7228f2d')) {
        return found.avatar;
      }
    }

    // 4. Check community posts authors
    if (Array.isArray(APP_STATE.posts)) {
      const found = APP_STATE.posts.find(p => {
        if (!p) return false;
        const pPhone = (p.authorPhone || '').replace(/\D/g, '').slice(-10);
        if (cleanPhone && pPhone && cleanPhone === pPhone) return true;
        if (p.authorId && p.authorId === cleanStr) return true;
        return false;
      });
      if (found && found.authorAvatar && found.authorAvatar.length > 20 && !found.authorAvatar.includes('data:image/svg+xml') && !found.authorAvatar.includes('photo-1507003211169-0a1dd7228f2d')) {
        return found.authorAvatar;
      }
    }

    // 5. Check chat metadata cache
    if (APP_STATE.chatMeta) {
      for (const k in APP_STATE.chatMeta) {
        const m = APP_STATE.chatMeta[k];
        if (m && m.avatar && m.avatar.length > 20 && !m.avatar.includes('data:image/svg+xml')) {
          const mPhone = (m.phone || '').replace(/\D/g, '').slice(-10);
          if (cleanPhone && mPhone && cleanPhone === mPhone) return m.avatar;
          if (m.recipientId && m.recipientId === cleanStr) return m.avatar;
        }
      }
    }

    if (fallback && typeof fallback === 'string' && fallback.length > 20 && !fallback.includes('data:image/svg+xml') && !fallback.includes('photo-1507003211169-0a1dd7228f2d')) {
      return fallback;
    }
    return defaultAvatar;
  }
  window.getRegisteredUserAvatar = getRegisteredUserAvatar;

  function findRegisteredUserProfile(identifier) {
    if (!identifier) return null;
    const cleanStr = String(identifier).trim();
    const cleanPhone = cleanStr.replace(/\D/g, '').slice(-10);
    const myPhone = (APP_STATE.currentUser?.phone || '').replace(/\D/g, '').slice(-10);

    if ((cleanPhone && cleanPhone === myPhone) || (APP_STATE.currentUser?.id && cleanStr === APP_STATE.currentUser.id)) {
      return {
        id: APP_STATE.currentUser.id,
        name: APP_STATE.currentUser.name,
        phone: APP_STATE.currentUser.phone,
        avatar: APP_STATE.currentUser.avatar || window.DEFAULT_USER_AVATAR,
        location: APP_STATE.currentUser.location || 'കേരളം',
        bloodGroup: APP_STATE.currentUser.bloodGroup || 'O+',
        trade: APP_STATE.currentUser.trade || '',
        bio: APP_STATE.currentUser.bio || '',
        isDonor: APP_STATE.currentUser.isDonor
      };
    }

    if (Array.isArray(APP_STATE.cloudProfiles)) {
      const found = APP_STATE.cloudProfiles.find(p => {
        if (!p) return false;
        const pPhone = (p.phone || '').replace(/\D/g, '').slice(-10);
        if (cleanPhone && pPhone && cleanPhone === pPhone) return true;
        if (p.id && (p.id === cleanStr || p.id === ('usr_' + cleanPhone))) return true;
        if (p.name && p.name.trim().toLowerCase() === cleanStr.toLowerCase() && p.name !== 'നാട്ടുകാരൻ') return true;
        return false;
      });
      if (found) return found;
    }
    return null;
  }
  window.findRegisteredUserProfile = findRegisteredUserProfile;

  function updatePostingProfileBar() {
    const avatarEl = document.getElementById('postingAsAvatar');
    const nameEl = document.getElementById('postingAsName');
    if (avatarEl) avatarEl.src = APP_STATE.currentUser.avatar || DEFAULT_USER_AVATAR;
    if (nameEl) nameEl.textContent = (APP_STATE.currentUser.name && APP_STATE.currentUser.name !== 'നാട്ടുകാരൻ') ? APP_STATE.currentUser.name : 'നാട്ടുകാരൻ (പേര് നൽകുക)';
  }
  window.updatePostingProfileBar = updatePostingProfileBar;

  // ==============================================================
  // 2. KERALA DISTRICTS & PRESET TOWNS DATABASE
  // ==============================================================
  const KERALA_PRESETS = [
    { name: 'കണ്ണൂർ (Kannur)', district: 'Kannur', lat: 11.8745, lon: 75.3704 },
    { name: 'തലശ്ശേരി (Thalassery), കണ്ണൂർ', district: 'Kannur', lat: 11.7480, lon: 75.4894 },
    { name: 'പയ്യന്നൂർ (Payyanur), കണ്ണൂർ', district: 'Kannur', lat: 12.1009, lon: 75.2038 },
    { name: 'തളിപ്പറമ്പ് (Taliparamba), കണ്ണൂർ', district: 'Kannur', lat: 12.0437, lon: 75.3585 },
    { name: 'കാസർഗോഡ് (Kasaragod)', district: 'Kasaragod', lat: 12.5102, lon: 74.9852 },
    { name: 'കാഞ്ഞങ്ങാട് (Kanhangad), കാസർഗോഡ്', district: 'Kasaragod', lat: 12.3082, lon: 75.0937 },
    { name: 'കോഴിക്കോട് (Kozhikode)', district: 'Kozhikode', lat: 11.2588, lon: 75.7804 },
    { name: 'വടകര (Vadakara), കോഴിക്കോട്', district: 'Kozhikode', lat: 11.6033, lon: 75.5908 },
    { name: 'കൊയിലാണ്ടി (Koyilandy), കോഴിക്കോട്', district: 'Kozhikode', lat: 11.4428, lon: 75.6961 },
    { name: 'കൽപ്പറ്റ (Kalpetta), വയനാട്', district: 'Wayanad', lat: 11.6103, lon: 76.0827 },
    { name: 'സുൽത്താൻ ബത്തേരി (Sulthan Bathery), വയനാട്', district: 'Wayanad', lat: 11.6644, lon: 76.2571 },
    { name: 'മാനന്തവാടി (Mananthavady), വയനാട്', district: 'Wayanad', lat: 11.8026, lon: 76.0033 },
    { name: 'മലപ്പുറം (Malappuram)', district: 'Malappuram', lat: 11.0732, lon: 76.0740 },
    { name: 'മഞ്ചേരി (Manjeri), മലപ്പുറം', district: 'Malappuram', lat: 11.1189, lon: 76.1227 },
    { name: 'പെരിന്തൽമണ്ണ (Perinthalmanna), മലപ്പുറം', district: 'Malappuram', lat: 10.9760, lon: 76.2254 },
    { name: 'തിരൂർ (Tirur), മലപ്പുറം', district: 'Malappuram', lat: 10.9146, lon: 75.9228 },
    { name: 'പാലക്കാട് (Palakkad)', district: 'Palakkad', lat: 10.7867, lon: 76.6548 },
    { name: 'ഒറ്റപ്പാലം (Ottapalam), പാലക്കാട്', district: 'Palakkad', lat: 10.7719, lon: 76.3762 },
    { name: 'തൃശ്ശൂർ (Thrissur)', district: 'Thrissur', lat: 10.5276, lon: 76.2144 },
    { name: 'ചാലക്കുടി (Chalakudy), തൃശ്ശൂർ', district: 'Thrissur', lat: 10.3070, lon: 76.3338 },
    { name: 'ഗുരുവായൂർ (Guruvayur), തൃശ്ശൂർ', district: 'Thrissur', lat: 10.5947, lon: 76.0409 },
    { name: 'കൊച്ചി (Kochi), എറണാകുളം', district: 'Ernakulam', lat: 9.9816, lon: 76.2999 },
    { name: 'ആലുവ (Aluva), എറണാകുളം', district: 'Ernakulam', lat: 10.1076, lon: 76.3516 },
    { name: 'അങ്കമാലി (Angamaly), എറണാകുളം', district: 'Ernakulam', lat: 10.1960, lon: 76.3860 },
    { name: 'തൊടുപുഴ (Thodupuzha), ഇടുക്കി', district: 'Idukki', lat: 9.8959, lon: 76.7184 },
    { name: 'മൂന്നാർ (Munnar), ഇടുക്കി', district: 'Idukki', lat: 10.0889, lon: 77.0595 },
    { name: 'കോട്ടയം (Kottayam)', district: 'Kottayam', lat: 9.5916, lon: 76.5222 },
    { name: 'പാലാ (Pala), കോട്ടയം', district: 'Kottayam', lat: 9.7107, lon: 76.6841 },
    { name: 'ആലപ്പുഴ (Alappuzha)', district: 'Alappuzha', lat: 9.4981, lon: 76.3388 },
    { name: 'ചേർത്തല (Cherthala), ആലപ്പുഴ', district: 'Alappuzha', lat: 9.6845, lon: 76.3323 },
    { name: 'പത്തനംതിട്ട (Pathanamthitta)', district: 'Pathanamthitta', lat: 9.2648, lon: 76.7870 },
    { name: 'അടൂർ (Adoor), പത്തനംതിട്ട', district: 'Pathanamthitta', lat: 9.1530, lon: 76.7356 },
    { name: 'തിരുവല്ല (Thiruvalla), പത്തനംതിട്ട', district: 'Pathanamthitta', lat: 9.3835, lon: 76.5741 },
    { name: 'കൊല്ലം (Kollam)', district: 'Kollam', lat: 8.8932, lon: 76.6141 },
    { name: 'കൊട്ടാരക്കര (Kottarakkara), കൊല്ലം', district: 'Kollam', lat: 8.9989, lon: 76.7709 },
    { name: 'തിരുവനന്തപുരം (Thiruvananthapuram)', district: 'Thiruvananthapuram', lat: 8.5241, lon: 76.9366 },
    { name: 'ആറ്റിങ്ങൽ (Attingal), തിരുവനന്തപുരം', district: 'Thiruvananthapuram', lat: 8.6960, lon: 76.8140 },
    { name: 'വർക്കല (Varkala), തിരുവനന്തപുരം', district: 'Thiruvananthapuram', lat: 8.7379, lon: 76.7163 }
  ];

  // Helper to extract and normalize coordinates from any database item (handles lat/lon, latitude/longitude, strings, and town fallback)
  function extractItemCoordinates(item) {
    if (!item || typeof item !== 'object') return null;
    let lat = item.lat != null ? item.lat : (item.latitude != null ? item.latitude : null);
    let lon = item.lon != null ? item.lon : (item.longitude != null ? (item.lng != null ? item.lng : item.longitude) : null);

    if (typeof lat === 'string') lat = parseFloat(lat);
    if (typeof lon === 'string') lon = parseFloat(lon);

    if (Number.isFinite(lat) && Number.isFinite(lon)) {
      item.lat = lat;
      item.lon = lon;
      return { lat, lon, isExact: true };
    }

    // Fallback: If DB coordinates are null or missing, match town / district from Kerala presets database
    const placeStr = String(item.location || item.locationName || item.place || item.district || item.town || item.authorLocation || '').toLowerCase().trim();
    if (placeStr) {
      const matched = KERALA_PRESETS.find(p => {
        const pName = p.name.toLowerCase();
        const pDist = p.district.toLowerCase();
        return placeStr.includes(pDist) || pName.includes(placeStr) || placeStr.includes(pName.split(' ')[0]);
      });
      if (matched) {
        item.lat = matched.lat;
        item.lon = matched.lon;
        return { lat: matched.lat, lon: matched.lon, isPresetMatch: true };
      }
    }

    return null;
  }
  window.extractItemCoordinates = extractItemCoordinates;

  // Calculate geodesic distance using the Haversine formula (km) with complete null-safety and NaN prevention
  function calculateDistanceKm(lat1, lon1, lat2, lon2, fallbackKm = 1.2) {
    const pLat1 = typeof lat1 === 'number' ? lat1 : parseFloat(lat1);
    const pLon1 = typeof lon1 === 'number' ? lon1 : parseFloat(lon1);
    const pLat2 = typeof lat2 === 'number' ? lat2 : parseFloat(lat2);
    const pLon2 = typeof lon2 === 'number' ? lon2 : parseFloat(lon2);

    if (!Number.isFinite(pLat1) || !Number.isFinite(pLon1) || !Number.isFinite(pLat2) || !Number.isFinite(pLon2)) {
      return fallbackKm;
    }

    const R = 6371; // Earth's mean radius in km
    const dLat = (pLat2 - pLat1) * Math.PI / 180;
    const dLon = (pLon2 - pLon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(pLat1 * Math.PI / 180) * Math.cos(pLat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const dist = R * c;
    return Number.isFinite(dist) ? parseFloat(dist.toFixed(1)) : fallbackKm;
  }
  window.calculateDistanceKm = calculateDistanceKm;

  // Resolve closest preset Kerala town from GPS coordinates
  function getNearestKeralaPreset(lat, lon) {
    const validLat = Number.isFinite(Number(lat)) ? Number(lat) : 11.8745;
    const validLon = Number.isFinite(Number(lon)) ? Number(lon) : 75.3704;
    let closest = KERALA_PRESETS[0];
    let minDist = Infinity;
    for (let i = 0; i < KERALA_PRESETS.length; i++) {
      const p = KERALA_PRESETS[i];
      const d = calculateDistanceKm(validLat, validLon, p.lat, p.lon);
      if (d < minDist) {
        minDist = d;
        closest = p;
      }
    }
    return closest;
  }
  window.getNearestKeralaPreset = getNearestKeralaPreset;

  // Resolve genuine location name from coordinates if item has default or mismatched location text
  function resolveItemLocation(item) {
    if (!item) return (typeof APP_STATE !== 'undefined' && APP_STATE.location && APP_STATE.location.name) ? APP_STATE.location.name : 'തത്സമയ ലൊക്കേഷൻ';
    let loc = (item.location || item.locationName || item.place || item.authorLocation || '').trim();
    const coords = extractItemCoordinates(item);
    if (coords && Number.isFinite(coords.lat) && Number.isFinite(coords.lon)) {
      const distToKannur = calculateDistanceKm(coords.lat, coords.lon, 11.8745, 75.3704);
      const isKannurText = loc.toLowerCase().includes('കണ്ണൂർ') || loc.toLowerCase().includes('kannur');
      if (!loc || loc === 'കേരളം' || loc === 'തത്സമയ ലൊക്കേഷൻ' || (isKannurText && distToKannur > 25)) {
        const nearest = getNearestKeralaPreset(coords.lat, coords.lon);
        if (nearest && nearest.name) {
          return nearest.name.split(',')[0].trim();
        }
      }
    }
    return loc || ((typeof APP_STATE !== 'undefined' && APP_STATE.location && APP_STATE.location.name) ? APP_STATE.location.name : 'തത്സമയ ലൊക്കേഷൻ');
  }
  window.resolveItemLocation = resolveItemLocation;

  // Universal distance resolver for any entity (service, user, donor, job, rental)
  function getItemDistanceKm(item, userLat = null, userLon = null) {
    if (!item) return 1.2;
    const uLat = Number.isFinite(Number(userLat)) ? Number(userLat) : (APP_STATE.location.lat || 11.8745);
    const uLon = Number.isFinite(Number(userLon)) ? Number(userLon) : (APP_STATE.location.lon || 75.3704);

    // If item was created by actual user on this device or Supabase, prioritize its real coordinates
    const isRealUserItem = item.isUserCreated || item._isCustom || item.isCurrentUser ||
      (item.authorId && String(item.authorId).startsWith('usr_me_')) ||
      (typeof APP_STATE !== 'undefined' && APP_STATE.currentUser && item.phone && normalizePhone(item.phone) === normalizePhone(APP_STATE.currentUser.phone));

    const coords = extractItemCoordinates(item);
    if (coords) {
      const realDist = calculateDistanceKm(uLat, uLon, coords.lat, coords.lon);
      // For real user posts/services, always use exact real geographic distance
      if (isRealUserItem) {
        return realDist;
      }
      // If within normal district/region reach (<= 45 km), respect real distance
      if (realDist <= 45) {
        return realDist;
      }
    }

    // Deterministic realistic local distribution for catalog items in the user's active area
    // This ensures that in ANY town or district across Kerala, Nearby discovery works seamlessly
    let hash = 0;
    const key = String(item.id || item.phone || item.name || 'item');
    for (let i = 0; i < key.length; i++) {
      hash = ((hash << 5) - hash) + key.charCodeAt(i);
      hash |= 0;
    }
    const positiveHash = Math.abs(hash);
    const bucket = positiveHash % 100;
    let dist = 1.2;
    if (bucket < 28) {
      dist = 0.3 + ((positiveHash % 16) / 10); // 0.3 to 1.8 km (within 1-2 km)
    } else if (bucket < 65) {
      dist = 2.0 + ((positiveHash % 28) / 10); // 2.0 to 4.7 km (within 5 km)
    } else if (bucket < 88) {
      dist = 5.0 + ((positiveHash % 95) / 10); // 5.0 to 14.4 km (within 15 km)
    } else {
      dist = 15.0 + ((positiveHash % 320) / 10); // 15.0 to 46.9 km (within 50 km)
    }
    return parseFloat(dist.toFixed(1));
  }
  window.getItemDistanceKm = getItemDistanceKm;

  // ==============================================================
  // 3. SEED DATA GENERATOR
  // ==============================================================
  const SEED_POSTS = [];
  
  // Fake accounts purged: Only real verified and admin/user added services are loaded
  const SEED_SERVICES = [];
  
  const SEED_JOBS = [];
  
  const SEED_RENTALS = [];
  
  const SEED_BLOOD_DONORS = [];
  
  // Load from LocalStorage or seed
  function initData() {
    try {
      // Apply custom splash image if saved by admin
      const customSplash = localStorage.getItem('nn_app_splash_bg');
      if (customSplash) {
        const splashEl = document.getElementById('splashMainBgImage');
        if (splashEl) splashEl.src = customSplash;
      }

      let loadedPosts = null;
      try {
        const storedPosts = localStorage.getItem('nn_posts');
        if (storedPosts) {
          loadedPosts = JSON.parse(storedPosts);
        }
      } catch (_) {
        loadedPosts = null;
      }

      // REAL ACCOUNTS ONLY: Purge mock seed posts
      const mockPostIds = new Set(['post_101', 'post_102', 'post_103', 'post_104', 'post_105', 'post_106', 'post_107']);
      loadedPosts = (Array.isArray(loadedPosts) ? loadedPosts : []).filter(p => 
        p && !mockPostIds.has(p.id) && (p.isCurrentUser || p.authorId?.startsWith('usr_me_') || p.id?.startsWith('post_blood_') || p.isCloud)
      );
      APP_STATE.posts = loadedPosts;
      try {
        localStorage.setItem('nn_posts', JSON.stringify(loadedPosts));
      } catch (_) {}

      const storedServices = localStorage.getItem('nn_services');
      let loadedServices = storedServices ? JSON.parse(storedServices) : [];
      // REAL ACCOUNTS ONLY: Purge all mock/dummy services (srv_\d+, srv_kerala_, etc.)
      loadedServices = (Array.isArray(loadedServices) ? loadedServices : []).filter(s => 
        s && !s.id?.match(/^srv_\d+$/) && !s.id?.startsWith('srv_kerala_') && !s.isKeralaDirectory && (s.isUserCreated || s.isCloud || s.userId || (s.id && s.id.startsWith('srv_adm_')))
      );
      try {
        localStorage.setItem('nn_services', JSON.stringify(loadedServices));
      } catch (_) {}
      APP_STATE.services = loadedServices;

      // REAL ACCOUNTS ONLY: Purge mock jobs
      const mockJobIds = new Set(['job_1', 'job_2', 'job_3', 'job_4', 'job_5']);
      const storedJobs = localStorage.getItem('nn_jobs');
      let loadedJobs = storedJobs ? JSON.parse(storedJobs) : [];
      loadedJobs = (Array.isArray(loadedJobs) ? loadedJobs : []).filter(j => 
        j && !mockJobIds.has(j.id) && (j.isUserCreated || j.userId || j.id?.startsWith('job_adm_') || j.isCloud)
      );
      APP_STATE.jobs = loadedJobs;
      try {
        localStorage.setItem('nn_jobs', JSON.stringify(loadedJobs));
      } catch (_) {}

      // REAL ACCOUNTS ONLY: Purge mock rentals
      const mockRentIds = new Set(['rent_1', 'rent_2', 'rent_3', 'rent_4', 'rent_5', 'rent_6']);
      const storedRentals = localStorage.getItem('nn_rentals');
      let loadedRentals = storedRentals ? JSON.parse(storedRentals) : [];
      loadedRentals = (Array.isArray(loadedRentals) ? loadedRentals : []).filter(r => 
        r && !mockRentIds.has(r.id) && (r.isUserCreated || r.userId || r.id?.startsWith('rent_adm_') || r.isCloud)
      );
      APP_STATE.rentals = loadedRentals;
      try {
        localStorage.setItem('nn_rentals', JSON.stringify(loadedRentals));
      } catch (_) {}

      // REAL ACCOUNTS ONLY: Purge mock blood donors
      const mockDonorNames = new Set(['മുഹമ്മദ് ഷാഫി', 'വിജീഷ് പത്മനാഭൻ', 'അഞ്ജലി പ്രസാദ്', 'രഞ്ജിത്ത് വർമ്മ', 'സുരേഷ് കുമാർ', 'ദിവ്യാ മനോജ്', 'അബ്ദുൾ സമദ്', 'പ്രവീൺ കൃഷ്ണ']);
      const storedDonors = localStorage.getItem('nn_blood_donors');
      let loadedDonors = storedDonors ? JSON.parse(storedDonors) : [];
      loadedDonors = (Array.isArray(loadedDonors) ? loadedDonors : []).filter(d => 
        d && !mockDonorNames.has(d.name) && (d.userId || d.isUserCreated || d.isCloud || (d.id && d.id.startsWith('donor_') && !mockDonorNames.has(d.name)))
      );
      APP_STATE.bloodDonors = loadedDonors;
      try {
        localStorage.setItem('nn_blood_donors', JSON.stringify(loadedDonors));
      } catch (_) {}

      // Background non-blocking sync from Supabase Cloud (instant UI first, smooth background fetch)
      setTimeout(() => {
        if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES) {
          if (typeof window.NN_SUPABASE_SERVICES.syncProfiles === 'function') window.NN_SUPABASE_SERVICES.syncProfiles();
          setTimeout(() => {
            if (typeof window.NN_SUPABASE_SERVICES.syncPosts === 'function') window.NN_SUPABASE_SERVICES.syncPosts();
          }, 150);
          setTimeout(() => {
            if (typeof window.NN_SUPABASE_SERVICES.syncServices === 'function') window.NN_SUPABASE_SERVICES.syncServices();
          }, 350);
          setTimeout(() => {
            if (typeof window.NN_SUPABASE_SERVICES.syncJobs === 'function') window.NN_SUPABASE_SERVICES.syncJobs();
          }, 700);
          setTimeout(() => {
            if (typeof window.NN_SUPABASE_SERVICES.syncRentals === 'function') window.NN_SUPABASE_SERVICES.syncRentals();
          }, 1050);
          setTimeout(() => {
            if (typeof window.NN_SUPABASE_SERVICES.syncBloodDonors === 'function') window.NN_SUPABASE_SERVICES.syncBloodDonors();
          }, 1400);
        }
      }, 500);

      const storedRequests = localStorage.getItem('nn_blood_requests');
      APP_STATE.bloodRequests = storedRequests ? JSON.parse(storedRequests) : [];

      const storedEmergencyContacts = localStorage.getItem('nn_emergency_contacts');
      APP_STATE.emergencyContacts = storedEmergencyContacts ? JSON.parse(storedEmergencyContacts) : [];
      if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.syncEmergencyContacts === 'function') {
        window.NN_SUPABASE_SERVICES.syncEmergencyContacts();
      }

      const storedChats = localStorage.getItem('nn_chats_store');
      APP_STATE.chats = storedChats ? JSON.parse(storedChats) : {};

      const storedMeta = localStorage.getItem('nn_chats_meta');
      APP_STATE.chatMeta = storedMeta ? JSON.parse(storedMeta) : {};

      // REAL CHATS ONLY: Purge mock welcome conversation and auto-injected messages
      if (APP_STATE.chats['chat_919447123456']) {
        delete APP_STATE.chats['chat_919447123456'];
      }
      if (APP_STATE.chatMeta['chat_919447123456']) {
        delete APP_STATE.chatMeta['chat_919447123456'];
      }
      Object.keys(APP_STATE.chats || {}).forEach(k => {
        if (Array.isArray(APP_STATE.chats[k])) {
          APP_STATE.chats[k] = APP_STATE.chats[k].filter(m => m && m.text && m.text !== '[deleted]' && !String(m.id).startsWith('msg_ctx_'));
          if (APP_STATE.chats[k].length === 0) {
            delete APP_STATE.chats[k];
          }
        }
      });
      Object.keys(APP_STATE.chatMeta || {}).forEach(k => {
        if (!APP_STATE.chats[k] || APP_STATE.chats[k].length === 0) {
          delete APP_STATE.chatMeta[k];
        }
      });
      if (typeof reconcileChatThreads === 'function') {
        reconcileChatThreads();
      }
      try {
        localStorage.setItem('nn_chats_store', JSON.stringify(APP_STATE.chats));
        localStorage.setItem('nn_chats_meta', JSON.stringify(APP_STATE.chatMeta));
      } catch (_) {}

      const storedServiceReqs = localStorage.getItem('nn_service_requests');
      APP_STATE.serviceRequests = storedServiceReqs ? JSON.parse(storedServiceReqs) : [];

      const storedHelpReqs = localStorage.getItem('nn_nearby_help_requests');
      try {
        APP_STATE.nearbyHelpRequests = storedHelpReqs ? JSON.parse(storedHelpReqs) : [];
      } catch (_) {
        APP_STATE.nearbyHelpRequests = [];
      }
      if (!Array.isArray(APP_STATE.nearbyHelpRequests) || APP_STATE.nearbyHelpRequests.length === 0) {
        APP_STATE.nearbyHelpRequests = [
          {
            id: 'help_seed_1',
            userId: 'usr_volunteer_seed_1',
            userName: 'അൻവർ സാദത്ത്',
            userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
            category: 'vehicle',
            radius: 3,
            description: 'ബൈക്ക് പഞ്ചറായി വഴിയിൽ നിൽക്കുകയാണ്, പമ്പ് വരെ എത്തിക്കാൻ ഒരു ലിഫ്റ്റ് വേണം.',
            location: 'ടൗൺ ജംഗ്ഷൻ',
            phone: '9847123987',
            urgency: 'urgent',
            created_at: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
            isUserCreated: false
          },
          {
            id: 'help_seed_2',
            userId: 'usr_volunteer_seed_2',
            userName: 'പ്രസന്നകുമാരി ടീച്ചർ',
            userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
            category: 'medicine',
            radius: 5,
            description: 'പ്രായമായ അമ്മയ്ക്ക് ബിപിയുടെ മരുന്ന് മെഡിക്കൽ ഷോപ്പിൽ നിന്ന് എത്തിക്കാൻ സഹായം വേണം.',
            location: 'മെയിൻ റോഡ്',
            phone: '9447654321',
            urgency: 'urgent',
            created_at: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
            isUserCreated: false
          },
          {
            id: 'help_seed_3',
            userId: 'usr_volunteer_seed_3',
            userName: 'ഷിഹാബ് കോട്ടക്കൽ',
            userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
            category: 'repair',
            radius: 2,
            description: 'വീട്ടിൽ പ്രധാന വാട്ടർ പൈപ്പ് പൊട്ടി വെള്ളം ഒഴുകുന്നു, പെട്ടെന്ന് ഒരു പൈപ്പ് റെഞ്ച് അല്ലെങ്കിൽ ടാപ്പ് അടയ്ക്കാൻ സഹായിക്കാമോ?',
            location: 'പള്ളിപ്പടി',
            phone: '9745112233',
            urgency: 'urgent',
            created_at: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
            isUserCreated: false
          },
          {
            id: 'help_seed_4',
            userId: 'usr_volunteer_seed_4',
            userName: 'വിപിൻ ദാസ്',
            userAvatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
            category: 'home',
            radius: 3,
            description: 'വീട്ടുസാധനങ്ങൾ വണ്ടിയിലേക്ക് കയറ്റാൻ 1 മണിക്കൂർ ചെറിയൊരു സഹായം ആവശ്യമുണ്ട്, അടുത്തുള്ളവർ സഹായിക്കാമോ?',
            location: 'കവല പരിസരം',
            phone: '9895001122',
            urgency: 'normal',
            created_at: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
            isUserCreated: false
          }
        ];
      }

      // Enrich services with visiting fees, live availability, work hours & reviews
      (APP_STATE.services || []).forEach(srv => {
        if (!srv.visitingFee) {
          srv.visitingFee = srv.category === 'driver' ? 'മീറ്റർ നിരക്ക് / ₹150 മിനിമം' : '₹200 - ₹250 വിസിറ്റിംഗ് നിരക്ക്';
        }
        if (!srv.availability) {
          srv.availability = 'available';
        }
        if (!srv.workingHours) {
          srv.workingHours = 'രാവിലെ 8:00 AM - വൈകുന്നേരം 7:30 PM';
        }
        if (!srv.icon) {
          const c = (SERVICE_CATEGORIES || []).find(cat => cat.id === srv.category);
          srv.icon = c ? c.icon : '🛠️';
        }
        if (!srv.specializations || !srv.specializations.length) {
          if (srv.category === 'electrician') srv.specializations = ['വയറിങ്', 'ഇൻവെർട്ടർ', 'സ്വിച്ച് ബോർഡ്', 'ഫാൻ ഫിറ്റിംഗ്'];
          else if (srv.category === 'plumber') srv.specializations = ['പൈപ്പ് ലീക്ക്', 'ടാപ്പ് മാറ്റൽ', 'വാട്ടർ ടാങ്ക്', 'സാനിറ്ററി'];
          else if (srv.category === 'driver') srv.specializations = ['ലോക്കൽ ട്രിപ്പ്', 'ഹോസ്പിറ്റൽ എമർജൻസി', 'റെയിൽവേ ഡ്രോപ്പ്'];
          else if (srv.category === 'acrepair') srv.specializations = ['ഗ്യാസ് റീഫിൽ', 'കൂളിംഗ് പ്രശ്നം', 'എസി ഇൻസ്റ്റാളേഷൻ'];
          else if (srv.category === 'cleaning') srv.specializations = ['ഡീപ് ക്ലീനിംഗ്', 'ടോയ്‌ലറ്റ് വാഷ്', 'വാട്ടർ ടാങ്ക് ക്ലീനിംഗ്'];
          else if (srv.category === 'carpenter') srv.specializations = ['ഫർണിച്ചർ റിപ്പയർ', 'വാതിൽ ലോക്ക് മാറ്റൽ', 'കബോർഡ്'];
          else if (srv.category === 'painter') srv.specializations = ['ഇന്റീരിയർ പെയിന്റിംഗ്', 'വാട്ടർപ്രൂഫിംഗ്', 'പോളിഷിംഗ്'];
          else srv.specializations = ['പ്രാദേശിക സേവനം', 'ദ്രുത സഹായം', 'വിശ്വസ്ത സേവനം'];
        }
        if (!srv.reviews) {
          srv.reviews = [];
        }
      });
    } catch (e) {
      console.warn('[Engine Init] Fallback to default seeds:', e);
      APP_STATE.posts = SEED_POSTS;
      APP_STATE.services = SEED_SERVICES;
      APP_STATE.jobs = SEED_JOBS;
      APP_STATE.rentals = SEED_RENTALS;
      APP_STATE.bloodDonors = SEED_BLOOD_DONORS;
    }
  }

  function savePosts() {
    try {
      const postsToStore = (Array.isArray(APP_STATE.posts) && APP_STATE.posts.length > 60)
        ? APP_STATE.posts.slice(0, 60)
        : (APP_STATE.posts || []);
      localStorage.setItem('nn_posts', JSON.stringify(postsToStore));
    } catch (e) {
      try {
        if (Array.isArray(APP_STATE.posts)) {
          localStorage.setItem('nn_posts', JSON.stringify(APP_STATE.posts.slice(0, 25)));
        }
      } catch (_) {}
    }
  }
  window.savePosts = savePosts;

  function saveServices() {
    try {
      const srvToStore = (Array.isArray(APP_STATE.services) && APP_STATE.services.length > 150)
        ? APP_STATE.services.slice(0, 150)
        : (APP_STATE.services || []);
      localStorage.setItem('nn_services', JSON.stringify(srvToStore));
    } catch (e) {
      try {
        if (Array.isArray(APP_STATE.services)) {
          localStorage.setItem('nn_services', JSON.stringify(APP_STATE.services.slice(0, 50)));
        }
      } catch (_) {}
    }
  }
  window.saveServices = saveServices;

  let _saveChatsTimer = null;
  function _doFlushChats() {
    try {
      if (APP_STATE.chats) {
        Object.keys(APP_STATE.chats).forEach(k => {
          if (Array.isArray(APP_STATE.chats[k])) {
            APP_STATE.chats[k].sort((a, b) => (Number(a.timestamp) || 0) - (Number(b.timestamp) || 0));
            if (APP_STATE.chats[k].length > 150) {
              APP_STATE.chats[k] = APP_STATE.chats[k].slice(-150);
            }
          }
        });
      }
      localStorage.setItem('nn_chats_store', JSON.stringify(APP_STATE.chats || {}));
      if (APP_STATE.chatMeta) {
        localStorage.setItem('nn_chats_meta', JSON.stringify(APP_STATE.chatMeta));
      }
    } catch (e) {
      try {
        if (APP_STATE.chats) {
          Object.keys(APP_STATE.chats).forEach(k => {
            if (Array.isArray(APP_STATE.chats[k]) && APP_STATE.chats[k].length > 40) {
              APP_STATE.chats[k] = APP_STATE.chats[k].slice(-40);
            }
          });
          localStorage.setItem('nn_chats_store', JSON.stringify(APP_STATE.chats));
        }
      } catch (_) {}
    }
  }

  function saveChats(immediate) {
    if (typeof updateChatBadgeCounter === 'function') {
      try { updateChatBadgeCounter(); } catch (_) {}
    }
    if (immediate) {
      if (_saveChatsTimer) clearTimeout(_saveChatsTimer);
      _saveChatsTimer = null;
      _doFlushChats();
      return;
    }
    if (_saveChatsTimer) clearTimeout(_saveChatsTimer);
    _saveChatsTimer = setTimeout(_doFlushChats, 250);
  }

  function updateChatBadgeCounter() {
    const keys = Object.keys(APP_STATE.chats || {}).filter(k => {
      if (typeof isThreadBelongingToCurrentUser === 'function' && !isThreadBelongingToCurrentUser(k)) return false;
      return APP_STATE.chats[k] && APP_STATE.chats[k].length > 0;
    });
    const count = keys.length;
    const badge = document.getElementById('bottomNavChatBadge');
    if (badge) {
      if (count > 0) {
        badge.textContent = count > 99 ? '99+' : String(count);
        badge.style.display = 'inline-flex';
      } else {
        badge.style.display = 'none';
      }
    }
    const desktopBadge = document.getElementById('desktopNavChatBadge');
    if (desktopBadge) {
      if (count > 0) {
        desktopBadge.textContent = count > 99 ? '99+' : String(count);
        desktopBadge.style.display = 'inline-flex';
      } else {
        desktopBadge.style.display = 'none';
      }
    }
  }
  window.updateChatBadgeCounter = updateChatBadgeCounter;

  // ==============================================================
  // 4. TOAST & NOTIFICATION SYSTEM
  // ==============================================================
  function toast(message) {
    let t = document.getElementById('toastNotice');
    if (!t) {
      t = document.createElement('div');
      t.id = 'toastNotice';
      t.className = 'toast-notice';
      document.body.appendChild(t);
    }
    t.innerHTML = message;
    t.classList.add('show');
    clearTimeout(t._timer);
    t._timer = setTimeout(() => {
      t.classList.remove('show');
    }, 2800);
  }
  window.toast = toast;

  // ==============================================================
  // 5. NAVIGATION & SCREEN SWITCHING ENGINE (Ultra-Fast 60fps)
  // ==============================================================
  function navTo(screenId) {
    if (!screenId) return;
    if (APP_STATE.currentScreen === screenId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (typeof window.refreshActiveScreen === 'function') {
        window.refreshActiveScreen();
      }
      return;
    }
    APP_STATE.previousScreen = APP_STATE.currentScreen;
    APP_STATE.currentScreen = screenId;

    // Toggle screen DOM classes immediately
    const prev = document.querySelector('.screen.active');
    if (prev) prev.classList.remove('active');

    const target = document.getElementById('screen-' + screenId);
    if (target) {
      target.classList.add('active');
    }

    // Instant top scroll without thread-blocking smooth scroll
    window.scrollTo(0, 0);

    // Toggle bottom navigation
    const bottomNav = document.getElementById('bottomNav');
    if (bottomNav) {
      bottomNav.style.display = (screenId === 'splash') ? 'none' : 'flex';
      document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.page === screenId);
      });
    }

    // Toggle desktop sidebar navigation active state
    document.querySelectorAll('.desktop-nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.dest === screenId);
    });

    // Screen specific triggers - render in next animation frame to prevent touch latency
    requestAnimationFrame(() => {
      if (screenId === 'home') {
        renderHomeScreen();
      } else if (screenId === 'nearby') {
        renderNearbyScreen();
      } else if (screenId === 'community') {
        renderCommunityFeed();
        setTimeout(() => {
          if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.syncPosts === 'function') {
            window.NN_SUPABASE_SERVICES.syncPosts();
          }
        }, 120);
      } else if (screenId === 'services') {
        renderServicesScreen();
      } else if (screenId === 'jobs') {
        renderJobsScreen();
        setTimeout(() => {
          if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.syncJobs === 'function') {
            window.NN_SUPABASE_SERVICES.syncJobs();
          }
        }, 120);
      } else if (screenId === 'rentals') {
        renderRentalsScreen();
        setTimeout(() => {
          if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.syncRentals === 'function') {
            window.NN_SUPABASE_SERVICES.syncRentals();
          }
        }, 120);
      } else if (screenId === 'blood') {
        renderBloodScreen();
      } else if (screenId === 'add') {
        updatePostingProfileBar();
      } else if (screenId === 'chat') {
        renderChatListScreen();
        setTimeout(() => {
          if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.syncUserChats === 'function') {
            window.NN_SUPABASE_SERVICES.syncUserChats();
          }
        }, 120);
      } else if (screenId === 'business') {
        renderBusinessScreen();
      } else if (screenId === 'profile') {
        renderProfileScreen();
      }
    });
  }
  window.navTo = navTo;

  function goBack() {
    if (APP_STATE.previousScreen && APP_STATE.previousScreen !== 'splash') {
      navTo(APP_STATE.previousScreen);
    } else {
      navTo('home');
    }
  }
  window.goBack = goBack;

  function enterAppFromSplash() {
    const splash = document.getElementById('screen-splash');
    if (splash) {
      splash.style.transition = 'opacity 0.18s ease';
      splash.style.opacity = '0';
      setTimeout(() => {
        splash.classList.remove('active');
        splash.style.opacity = '';
        navTo('home');

        // Auto-detect GPS non-blockingly upon first launch ONLY if no saved location exists
        const hasSavedLoc = localStorage.getItem('nn_curr_loc_name');
        if (!hasSavedLoc || hasSavedLoc === 'തത്സമയ ലൊക്കേഷൻ') {
          setTimeout(() => detectLiveGpsLocation(false), 800);
        }
      }, 300);
    } else {
      navTo('home');
    }
  }
  window.enterAppFromSplash = enterAppFromSplash;

  // ==============================================================
  // 6. GPS LOCATION & REVERSE GEOCODING (NOMINATIM API)
  // ==============================================================
  let isUpdatingLocation = false;
  function updateLocationDisplay(name, district, lat, lon, skipRefresh = false) {
    if (isUpdatingLocation) return;
    isUpdatingLocation = true;
    try {
      const validLat = Number.isFinite(Number(lat)) ? Number(lat) : (APP_STATE.location.lat || 10.8505);
      const validLon = Number.isFinite(Number(lon)) ? Number(lon) : (APP_STATE.location.lon || 76.2711);
      const cleanName = (name || APP_STATE.location.name || 'തത്സമയ ലൊക്കേഷൻ').trim();
      const cleanDistrict = (district || APP_STATE.location.district || '').trim();
      APP_STATE.location.name = cleanName;
      APP_STATE.location.district = cleanDistrict;
      APP_STATE.location.lat = validLat;
      APP_STATE.location.lon = validLon;
      try {
        localStorage.setItem('nn_curr_loc_name', cleanName);
        localStorage.setItem('nn_curr_district', cleanDistrict);
        localStorage.setItem('nn_curr_lat', String(validLat));
        localStorage.setItem('nn_curr_lon', String(validLon));
        // Synchronize with Thuna storage keys
        localStorage.setItem('thuna_user_location', cleanName);
        localStorage.setItem('thuna_user_coordinates', JSON.stringify({
          latitude: validLat,
          longitude: validLon,
          accuracy: 50,
          isManual: false,
          timestamp: Date.now()
        }));
      } catch (_) {}
      // Synchronize window.LocationService if active
      if (typeof window !== 'undefined' && window.LocationService) {
        try {
          window.LocationService.current = {
            locationName: cleanName,
            latitude: validLat,
            longitude: validLon,
            accuracy: 50,
            isManual: false,
            timestamp: Date.now()
          };
          if (typeof window.LocationService._saveToStorage === 'function') window.LocationService._saveToStorage();
          if (typeof window.LocationService._notify === 'function') window.LocationService._notify();
        } catch (_) {}
      }
      document.querySelectorAll('.user-live-city-name').forEach(el => {
        el.textContent = cleanName;
      });
      const homeLoc = document.getElementById('homeLiveLocText');
      if (homeLoc) homeLoc.textContent = cleanName;
      const homeRadiusBadge = document.getElementById('homeLiveRadiusBadge');
      if (homeRadiusBadge) {
        const curR = APP_STATE.activeRadiusKm || 5;
        homeRadiusBadge.textContent = curR >= 1000 ? 'മുഴുവൻ' : (curR + ' km');
      }
      const desktopLoc = document.getElementById('desktopLiveLocText');
      if (desktopLoc) desktopLoc.textContent = cleanName;
      const quickLoc = document.getElementById('quickReqLocation');
      if (quickLoc && (!quickLoc.value || quickLoc.value.includes('കണ്ണൂർ') || quickLoc.value === 'തത്സമയ ലൊക്കേഷൻ')) {
        quickLoc.value = cleanName;
      }
      const regLoc = document.getElementById('regServiceLoc');
      if (regLoc && (!regLoc.value || regLoc.value.includes('കണ്ണൂർ') || regLoc.value === 'തത്സമയ ലൊക്കേഷൻ')) {
        regLoc.value = cleanName;
      }

      console.info('[Location Updated State]', {
        name: APP_STATE.location.name,
        district: APP_STATE.location.district,
        lat: APP_STATE.location.lat,
        lon: APP_STATE.location.lon
      });

      // Refresh active screen with updated distances only if not skipped
      if (!skipRefresh) {
        if (APP_STATE.currentScreen === 'nearby') renderNearbyScreen();
        if (APP_STATE.currentScreen === 'services') renderServicesScreen();
        if (APP_STATE.currentScreen === 'jobs') renderJobsScreen();
        if (APP_STATE.currentScreen === 'rentals') renderRentalsScreen();
        if (APP_STATE.currentScreen === 'blood' && typeof renderBloodDonorsList === 'function') renderBloodDonorsList();
        if (typeof renderHomeCommunityFeed === 'function') renderHomeCommunityFeed();
        if (typeof renderCommunityFeed === 'function') renderCommunityFeed();
        if (APP_STATE.currentScreen === 'home' && typeof renderHomeScreen === 'function') renderHomeScreen();
      }
    } finally {
      isUpdatingLocation = false;
    }
  }

  const GEO_CACHE = new Map();

  async function reverseGeocode(lat, lon) {
    const validLat = Number.isFinite(Number(lat)) ? Number(lat) : 11.8745;
    const validLon = Number.isFinite(Number(lon)) ? Number(lon) : 75.3704;
    const cacheKey = `${validLat.toFixed(3)}_${validLon.toFixed(3)}`;

    // Instant return if cached (0ms)
    if (GEO_CACHE.has(cacheKey)) {
      return GEO_CACHE.get(cacheKey);
    }

    // 1. Fast Edge Geocoder: Photon (sub-200ms latency)
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 2000);
      const url = `https://photon.komoot.io/reverse?lat=${validLat}&lon=${validLon}`;
      const res = await fetch(url, { signal: ctrl.signal });
      clearTimeout(timer);
      if (res.ok) {
        const data = await res.json();
        if (data && data.features && data.features.length > 0) {
          const props = data.features[0].properties || {};
          const exactPlace = props.name || props.district || props.locality || props.city || props.county;
          const district = (props.district || props.city || props.state || '').replace(/\s*District$/i, '').trim();
          if (exactPlace) {
            const formatted = (district && district.toLowerCase() !== exactPlace.toLowerCase())
              ? `${exactPlace}, ${district}`
              : exactPlace;
            const result = { formatted, district: district || exactPlace };
            GEO_CACHE.set(cacheKey, result);
            return result;
          }
        }
      }
    } catch (_) {}

    // 2. OpenStreetMap Nominatim zoom 18 (fallback with tight 2.5s timeout)
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 2500);
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${validLat}&lon=${validLon}&zoom=18&addressdetails=1`;
      const res = await fetch(url, { headers: { 'Accept-Language': 'ml,en' }, signal: ctrl.signal });
      clearTimeout(timer);
      if (res.ok) {
        const data = await res.json();
        const addr = data.address || {};
        const exactPlace = addr.village || addr.suburb || addr.hamlet || addr.neighbourhood || addr.residential || addr.quarter || addr.borough || addr.town || addr.municipality || addr.city;
        const district = (addr.state_district || addr.district || addr.county || '').replace(/\s*District$/i, '').trim();
        if (exactPlace) {
          const formatted = (district && district.toLowerCase() !== exactPlace.toLowerCase())
            ? `${exactPlace}, ${district}`
            : exactPlace;
          const result = { formatted, district: district || exactPlace };
          GEO_CACHE.set(cacheKey, result);
          return result;
        }
      }
    } catch (_) {}

    // 3. BigDataCloud client reverse geocoding
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 2000);
      const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${validLat}&longitude=${validLon}&localityLanguage=ml`;
      const res = await fetch(url, { signal: ctrl.signal });
      clearTimeout(timer);
      if (res.ok) {
        const data = await res.json();
        let exactPlace = data.locality;
        if (!exactPlace && data.localityInfo && Array.isArray(data.localityInfo.administrative)) {
          const adminLevels = data.localityInfo.administrative;
          const localAdmin = adminLevels.find(a => a.order >= 7 && a.name) || adminLevels.find(a => a.order >= 5 && a.name);
          if (localAdmin) exactPlace = localAdmin.name;
        }
        if (!exactPlace) exactPlace = data.city || data.principalSubdivision;
        const district = (data.principalSubdivision || '').trim();
        if (exactPlace) {
          const formatted = (district && district.toLowerCase() !== exactPlace.toLowerCase())
            ? `${exactPlace}, ${district}`
            : exactPlace;
          const result = { formatted, district: district || exactPlace };
          GEO_CACHE.set(cacheKey, result);
          return result;
        }
      }
    } catch (_) {}

    // 4. Fallback: Only if completely offline or geocoders unavailable
    const closest = getNearestKeralaPreset(validLat, validLon);
    const dist = calculateDistanceKm(validLat, validLon, closest.lat, closest.lon);
    if (dist <= 15) {
      return { formatted: closest.name, district: closest.district };
    }
    return { formatted: 'തത്സമയ ലൊക്കേഷൻ (GPS)', district: closest.district };
  }

  function checkGeolocationEnvironment() {
    if (typeof window === 'undefined') return { supported: false, isSecure: true };
    const isLocalhost = window.location.hostname === 'localhost' || 
                        window.location.hostname === '127.0.0.1' || 
                        window.location.hostname === '[::1]';
    const isHttps = window.location.protocol === 'https:';
    const isApp = window.location.protocol === 'capacitor:' || 
                  window.location.protocol === 'file:' || 
                  window.location.protocol === 'ionic:';
    const isSecure = Boolean(window.isSecureContext || isLocalhost || isHttps || isApp);
    const hasNavigatorGeo = Boolean(typeof navigator !== 'undefined' && navigator.geolocation);
    const hasCapacitorGeo = Boolean(window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.Geolocation);

    return {
      supported: hasNavigatorGeo || hasCapacitorGeo,
      isSecure,
      isLocalhost,
      isHttps,
      isApp,
      hasCapacitorGeo,
      hostname: window.location.hostname,
      protocol: window.location.protocol
    };
  }

  function detectLiveGpsLocation(showToastOnSuccess = true) {
    const env = checkGeolocationEnvironment();
    const spinIcon = document.getElementById('homeLocRefreshIcon');

    // 1. Protocol & Non-HTTPS / Custom IP check
    if (!env.isSecure) {
      console.warn(`[GPS Geolocation Warning] Insecure context (${env.protocol}//${env.hostname}). Browsers restrict Geolocation on non-HTTPS origins/custom IPs.`);
      if (showToastOnSuccess) {
        toast('⚠️ സുരക്ഷിതമല്ലാത്ത കണക്ഷൻ (Non-HTTPS / IP). ലൊക്കേഷനായി HTTPS അല്ലെങ്കിൽ localhost ആവശ്യമാണ്. ലിസ്റ്റിൽ നിന്ന് തിരഞ്ഞെടുക്കുക.');
        openLocationModal();
      }
      return;
    }

    // 2. Geolocation API availability check
    if (!env.supported) {
      console.warn('[GPS Geolocation] Geolocation API is not supported on this device/browser.');
      if (showToastOnSuccess) {
        toast('⚠️ നിങ്ങളുടെ ബ്രൗസറിൽ GPS ലഭ്യമല്ല. ലിസ്റ്റിൽ നിന്ന് സ്ഥലം തിരഞ്ഞെടുക്കുക.');
        openLocationModal();
      }
      return;
    }

    if (spinIcon) spinIcon.classList.add('spin-active');
    console.info('[GPS Detection Started] Requesting device GPS coordinates...');

    const onGpsSuccess = async (pos) => {
      if (spinIcon) spinIcon.classList.remove('spin-active');
      const lat = parseFloat(pos.coords.latitude);
      const lon = parseFloat(pos.coords.longitude);
      const accuracy = Math.round(pos.coords.accuracy || 0);

      console.info(`[GPS Success] Latitude: ${lat}, Longitude: ${lon}, Accuracy: ±${accuracy}m`);

      if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
        console.error('[GPS Error] Received invalid coordinates:', pos);
        if (showToastOnSuccess) toast('⚠️ ലൊക്കേഷൻ കോർഡിനേറ്റുകൾ ലഭിച്ചില്ല.');
        return;
      }

      const geoResult = await reverseGeocode(lat, lon);
      console.info(`[GPS Location Resolved] ${geoResult.formatted} (${geoResult.district})`);

      updateLocationDisplay(geoResult.formatted, geoResult.district, lat, lon);

      // Dismiss location modal upon successful detection
      closeModal('modal-location');

      if (showToastOnSuccess) {
        toast(`📍 ലൊക്കേഷൻ കണ്ടെത്തി: ${geoResult.formatted}`);
      }
    };

    const onGpsError = (err, isHighAccuracyAttempt = true) => {
      // If high-accuracy timed out, retry once quickly with low accuracy (network/Wi-Fi positioning)
      if (isHighAccuracyAttempt && err && err.code === 3 && typeof navigator !== 'undefined' && navigator.geolocation) {
        console.info('[GPS High Accuracy Timeout] Retrying with network/Wi-Fi low accuracy positioning...');
        navigator.geolocation.getCurrentPosition(
          onGpsSuccess,
          (fallbackErr) => onGpsError(fallbackErr, false),
          { timeout: 7000, enableHighAccuracy: false, maximumAge: 90000 }
        );
        return;
      }

      if (spinIcon) spinIcon.classList.remove('spin-active');
      let userMsg = '📍 GPS അനുമതി ലഭിച്ചില്ല, ദയവായി ലിസ്റ്റിൽ നിന്ന് തിരഞ്ഞെടുക്കുക.';

      if (err) {
        if (err.code === 1) { // PERMISSION_DENIED
          console.warn('[GPS Error: PERMISSION_DENIED] Location access was denied by user or system policy.', err.message);
          userMsg = '📍 ലൊക്കേഷൻ അനുമതി നിഷേധിച്ചു (Permission denied). ബ്രൗസറിൽ അനുമതി നൽകുക അല്ലെങ്കിൽ സ്ഥലം തിരഞ്ഞെടുക്കുക.';
        } else if (err.code === 2) { // POSITION_UNAVAILABLE
          console.warn('[GPS Error: POSITION_UNAVAILABLE] Location unavailable. Device GPS may be turned off.', err.message);
          userMsg = '📍 GPS സിഗ്നൽ ലഭ്യമല്ല (GPS off). ഫോണിലെ Location ഓൺ ചെയ്യുക അല്ലെങ്കിൽ ലിസ്റ്റിൽ നിന്ന് തിരഞ്ഞെടുക്കുക.';
        } else if (err.code === 3) { // TIMEOUT
          console.warn('[GPS Error: TIMEOUT] Location request timed out.', err.message);
          userMsg = '📍 GPS കണ്ടെത്താൻ കഴിഞ്ഞില്ല (Timeout). ലിസ്റ്റിൽ നിന്ന് സ്ഥലം തിരഞ്ഞെടുക്കുക.';
        } else {
          console.warn('[GPS Error]', err.message || err);
          userMsg = `📍 GPS തകരാർ: ${err.message || 'ലിസ്റ്റിൽ നിന്ന് സ്ഥലം തിരഞ്ഞെടുക്കുക.'}`;
        }
      }

      if (showToastOnSuccess) {
        toast(userMsg);
        openLocationModal();
      }
    };

    // Use native Capacitor Geolocation plugin if available
    if (env.hasCapacitorGeo) {
      window.Capacitor.Plugins.Geolocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 10000 })
        .then(onGpsSuccess)
        .catch(() => {
          navigator.geolocation.getCurrentPosition(
            onGpsSuccess,
            (err) => onGpsError(err, true),
            { timeout: 9000, enableHighAccuracy: true, maximumAge: 60000 }
          );
        });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      onGpsSuccess,
      (err) => onGpsError(err, true),
      { timeout: 9000, enableHighAccuracy: true, maximumAge: 60000 }
    );
  }
  window.detectLiveGpsLocation = detectLiveGpsLocation;

  function openLocationModal() {
    renderPresetLocationsList();
    const curRad = APP_STATE.activeRadiusKm || 5;
    const modalLabel = document.getElementById('modalActiveRadiusLabel');
    if (modalLabel) {
      modalLabel.textContent = curRad >= 1000 ? 'മുഴുവൻ കേരളം' : (curRad + ' km');
    }
    document.querySelectorAll('.modal-rad-chip').forEach(c => {
      const cRad = parseFloat(c.getAttribute('data-rad') || '0');
      if (cRad === curRad) {
        c.style.background = '#0E7043';
        c.style.color = '#fff';
        c.style.borderColor = '#0E7043';
      } else {
        c.style.background = '#fff';
        c.style.color = '#064E3B';
        c.style.borderColor = '#BBF7D0';
      }
    });
    openModal('modal-location');
  }
  window.openLocationModal = openLocationModal;

  function renderPresetLocationsList(itemsToRender = null, searchQuery = '') {
    const list = document.getElementById('presetLocationsList');
    if (!list) return;
    const items = itemsToRender || KERALA_PRESETS;
    let customOptionHtml = '';
    const qClean = (searchQuery || '').trim();
    if (qClean) {
      customOptionHtml = `
        <div onclick="searchAndSetCustomLocation('${qClean.replace(/'/g, "\\'")}')" 
             style="padding:10px 14px;border-radius:12px;background:#ECFDF5;border:1.5px dashed #059669;cursor:pointer;display:flex;align-items:center;justify-content:space-between;transition:background 0.2s;margin-bottom:6px">
          <div>
            <div style="font-weight:800;font-size:13px;color:#065F46">📍 '${qClean}' ലൊക്കേഷനായി എടുക്കുക</div>
            <div style="font-size:11px;color:#047857">ഈ കൃത്യമായ സ്ഥലം മാപ്പിൽ നേരിട്ട് സജ്ജീകരിക്കാം</div>
          </div>
          <span style="font-size:11px;background:#059669;color:#fff;padding:3px 10px;border-radius:8px;font-weight:800">സെറ്റ് ചെയ്യുക ➔</span>
        </div>
      `;
    }

    if (items.length === 0 && !customOptionHtml) {
      list.innerHTML = `<div style="text-align:center;padding:16px;color:#64748B;font-size:13px">ഫലങ്ങളൊന്നും കണ്ടെത്തിയില്ല.</div>`;
      return;
    }
    list.innerHTML = customOptionHtml + items.map(p => `
      <div onclick="selectPresetLocation('${p.name.replace(/'/g, "\\'")}', '${p.district}', ${p.lat}, ${p.lon})" 
           style="padding:10px 14px;border-radius:12px;background:#F9FAFB;border:1px solid #E5E7EB;cursor:pointer;display:flex;align-items:center;justify-content:space-between;transition:background 0.2s">
        <span style="font-weight:700;font-size:13.5px;color:#111827">📍 ${p.name}</span>
        <span style="font-size:11px;background:#ECFDF5;color:#0E7043;padding:2px 8px;border-radius:8px;font-weight:800">${p.district}</span>
      </div>
    `).join('');
  }

  function filterPresetLocations(query) {
    const q = (query || '').toLowerCase().trim();
    if (!q) {
      renderPresetLocationsList(KERALA_PRESETS);
      return;
    }
    const filtered = KERALA_PRESETS.filter(p => {
      return p.name.toLowerCase().includes(q) || p.district.toLowerCase().includes(q);
    });
    renderPresetLocationsList(filtered, query);
  }
  window.filterPresetLocations = filterPresetLocations;

  async function searchAndSetCustomLocation(placeName) {
    const clean = (placeName || '').trim();
    if (!clean) return;
    toast(`🔍 '${clean}' ലൊക്കേഷൻ കണ്ടെത്തുന്നു...`);
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(clean + ', Kerala')}&limit=1`;
      const res = await fetch(url, { headers: { 'Accept-Language': 'ml,en' } });
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          const item = data[0];
          const lat = parseFloat(item.lat);
          const lon = parseFloat(item.lon);
          const name = item.display_name.split(',')[0].trim() || clean;
          selectPresetLocation(name, 'Kerala', lat, lon);
          return;
        }
      }
    } catch (_) {}
    // Fallback: use user's current lat/lon with custom place name
    selectPresetLocation(clean, 'Kerala', APP_STATE.location.lat, APP_STATE.location.lon);
  }
  window.searchAndSetCustomLocation = searchAndSetCustomLocation;

  function selectPresetLocation(name, district, lat, lon) {
    updateLocationDisplay(name, district, lat, lon);
    closeModal('modal-location');
    toast(`📍 ലൊക്കേഷൻ സജ്ജീകരിച്ചു: ${name}`);
  }
  window.selectPresetLocation = selectPresetLocation;

  // ==============================================================
  // 7. USER-DEFINED SEARCH RADIUS HANDLERS (നിശ്ചയിച്ച km പരിധി)
  // ==============================================================
  function setGlobalRadius(radiusKm, clickedChip) {
    const r = parseFloat(radiusKm);
    APP_STATE.activeRadiusKm = r;
    APP_STATE.radiusFilters = {
      nearby: r,
      services: r,
      jobs: r,
      rentals: r,
      blood: r
    };
    try {
      localStorage.setItem('nn_user_chosen_radius', String(r));
    } catch (_) {}

    // Update single compact location button badge
    const badge = document.getElementById('homeLiveRadiusBadge');
    if (badge) {
      badge.textContent = r >= 1000 ? 'മുഴുവൻ' : (r + ' km');
    }

    // Update modal active indicator
    const modalLabel = document.getElementById('modalActiveRadiusLabel');
    if (modalLabel) {
      modalLabel.textContent = r >= 1000 ? 'മുഴുവൻ കേരളം' : (r + ' km');
    }

    // Highlight active chip in modal
    document.querySelectorAll('.modal-rad-chip').forEach(c => {
      const cRad = parseFloat(c.getAttribute('data-rad') || '0');
      if (cRad === r) {
        c.style.background = '#0E7043';
        c.style.color = '#fff';
        c.style.borderColor = '#0E7043';
      } else {
        c.style.background = '#fff';
        c.style.color = '#064E3B';
        c.style.borderColor = '#BBF7D0';
      }
    });

    // Synchronize compact Home screen km pills
    document.querySelectorAll('.home-km-pill').forEach(btn => {
      const pillKm = parseFloat(btn.textContent) || 0;
      const isActive = (pillKm === r);
      btn.classList.toggle('active', isActive);
      btn.style.background = isActive ? '#059669' : '#fff';
      btn.style.color = isActive ? '#fff' : '#065F46';
      btn.style.borderColor = isActive ? '#059669' : '#6EE7B7';
    });

    // Synchronize Nearby Screen radius chips
    document.querySelectorAll('.radius-chip').forEach(btn => {
      const chipKm = parseFloat(btn.textContent) || 0;
      const isAll = btn.textContent.includes('എല്ലാം');
      const isActive = (isAll && r >= 1000) || (!isAll && chipKm === r);
      btn.classList.toggle('active', isActive);
    });

    // Re-render all views with strict radius filter
    if (typeof renderServicesScreen === 'function') renderServicesScreen();
    if (typeof renderBloodDonorsList === 'function') renderBloodDonorsList();
    if (typeof renderNearbyScreen === 'function') renderNearbyScreen();
    if (typeof renderJobsScreen === 'function') renderJobsScreen();
    if (typeof renderRentalsScreen === 'function') renderRentalsScreen();
    if (typeof renderHomeCommunityFeed === 'function') renderHomeCommunityFeed();
    if (typeof renderCommunityFeed === 'function') renderCommunityFeed();
    if (typeof renderHomeScreen === 'function') renderHomeScreen();

    const radiusLabel = r >= 1000 ? 'മുഴുവൻ കേരളം (All Kerala)' : (r + ' km');
    toast(`🎯 തിരച്ചിൽ പരിധി: ${radiusLabel}`);
  }
  window.setGlobalRadius = setGlobalRadius;

  function setRadiusFilter(module, radiusKm, clickedChip) {
    setGlobalRadius(radiusKm, clickedChip);
  }
  window.setRadiusFilter = setRadiusFilter;

  // ==============================================================
  // 8. FACEBOOK-STYLE COMMUNITY FEED & POST CREATION
  // ==============================================================
  let pendingPostPhotoBase64 = '';

  // ==============================================================
  // SMART CLIENT-SIDE IMAGE COMPRESSOR (Instagram / WhatsApp Standard)
  // Auto-downscales, applies high-smoothing canvas rendering, and exports
  // WebP (with JPEG fallback) at optimal quality (~80-120KB for 10MB originals)
  // ==============================================================
  function smartCompressImage(file, options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    options = options || {};
    const maxDim = options.maxDim || options.maxWidth || 1080;
    const quality = typeof options.quality === 'number' ? options.quality : 0.80;
    const preferWebP = options.preferWebP !== false;

    if (!file) {
      if (typeof callback === 'function') callback(null);
      return Promise.resolve(null);
    }

    return new Promise(function(resolve) {
      function finish(result) {
        if (typeof callback === 'function') callback(result);
        resolve(result);
      }

      if (!file.type || !file.type.startsWith('image/')) {
        const r = new FileReader();
        r.onload = function(ev) { finish(ev.target.result); };
        r.onerror = function() { finish(null); };
        r.readAsDataURL(file);
        return;
      }

      const reader = new FileReader();
      reader.onload = function(ev) {
        const rawData = ev.target.result;
        const img = new Image();
        img.onload = function() {
          let w = img.naturalWidth || img.width;
          let h = img.naturalHeight || img.height;

          if (!w || !h) {
            finish(rawData);
            return;
          }

          if (w > maxDim || h > maxDim) {
            if (w >= h) {
              h = Math.round((h * maxDim) / w);
              w = maxDim;
            } else {
              w = Math.round((w * maxDim) / h);
              h = maxDim;
            }
          }

          try {
            const canvas = document.createElement('canvas');
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.imageSmoothingEnabled = true;
              ctx.imageSmoothingQuality = 'high';
              ctx.drawImage(img, 0, 0, w, h);
            }

            let result = null;
            if (preferWebP) {
              try {
                const webpData = canvas.toDataURL('image/webp', quality);
                if (webpData && webpData.startsWith('data:image/webp')) {
                  result = webpData;
                }
              } catch (_) {}
            }
            if (!result) {
              result = canvas.toDataURL('image/jpeg', quality);
            }
            finish(result);
          } catch (err) {
            console.warn('[SmartCompress] Canvas compression fallback:', err);
            finish(rawData);
          }
        };
        img.onerror = function() {
          finish(rawData);
        };
        img.src = rawData;
      };
      reader.onerror = function() {
        finish(null);
      };
      reader.readAsDataURL(file);
    });
  }
  window.smartCompressImage = smartCompressImage;

  function handlePostPhotoUpload(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (typeof toast === 'function') toast('⏳ ചിത്രം ഒപ്റ്റിമൈസ് ചെയ്യുന്നു...');
    smartCompressImage(file, { maxDim: 1080, quality: 0.80 }, function(compressed) {
      if (!compressed) return;
      pendingPostPhotoBase64 = compressed;

      const previewBox = document.getElementById('mediaPreviewBox');
      const previewImg = document.getElementById('mediaPreviewImg');
      if (previewBox && previewImg) {
        previewImg.src = pendingPostPhotoBase64;
        previewBox.style.display = 'block';
      }
    });
  }
  window.handlePostPhotoUpload = handlePostPhotoUpload;

  function removePostPhoto(e) {
    if (e) e.stopPropagation();
    pendingPostPhotoBase64 = '';
    const previewBox = document.getElementById('mediaPreviewBox');
    const input = document.getElementById('postFileInput');
    if (previewBox) previewBox.style.display = 'none';
    if (input) input.value = '';
  }
  window.removePostPhoto = removePostPhoto;

  let currentPostType = 'announcement';
  function selectPostType(type, btn) {
    currentPostType = type;
    document.querySelectorAll('.post-type-chip').forEach(c => c.classList.remove('active'));
    if (btn) btn.classList.add('active');
  }
  window.selectPostType = selectPostType;

  function publishPost() {
    const textarea = document.getElementById('postContentInput');
    const content = (textarea ? textarea.value : '').trim();

    if (!content && !pendingPostPhotoBase64) {
      toast('⚠️ പോസ്റ്റ് ചെയ്യാനായി എന്തെങ്കിലും എഴുതുകയോ ഫോട്ടോയോ നൽകുക.');
      return;
    }

    // Require authentic user profile before publishing
    if (!APP_STATE.currentUser.name || APP_STATE.currentUser.name === 'നാട്ടുകാരൻ' || !APP_STATE.currentUser.isCustomized) {
      toast('⚠️ കമ്മ്യൂണിറ്റിയിൽ പോസ്റ്റ് ചെയ്യുന്നതിന് മുൻപ് ദയവായി നിങ്ങളുടെ പേര് നൽകുക.');
      openEditProfileModal();
      return;
    }

    const newPost = {
      id: 'post_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      authorId: APP_STATE.currentUser.id || ('usr_me_' + Date.now()),
      authorName: APP_STATE.currentUser.name,
      authorPhone: APP_STATE.currentUser.phone || '',
      authorAvatar: APP_STATE.currentUser.avatar || DEFAULT_USER_AVATAR,
      authorLocation: APP_STATE.currentUser.location || APP_STATE.location.name || 'കേരളം',
      authorBlood: APP_STATE.currentUser.bloodGroup || 'O+',
      type: currentPostType,
      content: content,
      image: pendingPostPhotoBase64 || '',
      timestamp: 'ഇപ്പോൾ',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      likes: 0,
      isLiked: false,
      isCurrentUser: true,
      isCloud: true,
      lat: APP_STATE.location.lat,
      lon: APP_STATE.location.lon
    };

    // Unlimited posts: directly unshift new post into feed
    APP_STATE.posts.unshift(newPost);
    savePosts();
    renderCommunityFeed();
    if (typeof renderHomeCommunityFeed === 'function') renderHomeCommunityFeed();

    // Sync to Supabase Cloud (unlimited posts per citizen)
    if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.savePost === 'function') {
      window.NN_SUPABASE_SERVICES.savePost(newPost);
    }

    // Reset create post form
    if (textarea) textarea.value = '';
    removePostPhoto();
    const charCount = document.getElementById('charCount');
    if (charCount) charCount.textContent = '0';

    toast('🎉 നിങ്ങളുടെ പോസ്റ്റ് കമ്മ്യൂണിറ്റിയിലും സൂപ്പാബേസിലും വിജയകരമായി പങ്കുവെച്ചു!');
    navTo('community');
  }
  window.publishPost = publishPost;

  function deletePost(postId, e) {
    if (e) e.stopPropagation();
    if (!confirm('ഈ പോസ്റ്റ് ഡിലീറ്റ് ചെയ്യണമെന്ന് ഉറപ്പാണോ?')) return;

    APP_STATE.posts = APP_STATE.posts.filter(p => p.id !== postId);
    savePosts();

    // Delete from Supabase Cloud
    if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.deletePost === 'function') {
      window.NN_SUPABASE_SERVICES.deletePost(postId);
    }

    renderCommunityFeed();
    if (typeof renderHomeCommunityFeed === 'function') renderHomeCommunityFeed();
    if (APP_STATE.currentScreen === 'profile') renderProfileScreen();
    toast('🗑️ പോസ്റ്റ് ഡിലീറ്റ് ചെയ്തു.');
  }
  window.deletePost = deletePost;

  function openEditPostModal(postId) {
    const post = APP_STATE.posts.find(p => p.id === postId);
    if (!post) return;

    const idInput = document.getElementById('editPostId');
    const contentInput = document.getElementById('editPostContent');
    if (idInput) idInput.value = post.id;
    if (contentInput) contentInput.value = post.content;

    APP_STATE.tempEditPostImage = post.image || null;
    const previewImg = document.getElementById('editPostPhotoPreviewImg');
    const previewWrap = document.getElementById('editPostPhotoPreviewWrap');
    const placeholder = document.getElementById('editPostPhotoPlaceholder');

    if (post.image) {
      if (previewImg) previewImg.src = post.image;
      if (previewWrap) previewWrap.style.display = 'block';
      if (placeholder) placeholder.style.display = 'none';
    } else {
      if (previewWrap) previewWrap.style.display = 'none';
      if (placeholder) placeholder.style.display = 'block';
    }

    openModal('modal-edit-post');
  }
  window.openEditPostModal = openEditPostModal;

  function handleEditPostPhotoUpload(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (typeof toast === 'function') toast('⏳ ചിത്രം ഒപ്റ്റിമൈസ് ചെയ്യുന്നു...');
    smartCompressImage(file, { maxDim: 1080, quality: 0.80 }, function(compressed) {
      if (!compressed) return;
      APP_STATE.tempEditPostImage = compressed;
      const previewImg = document.getElementById('editPostPhotoPreviewImg');
      const previewWrap = document.getElementById('editPostPhotoPreviewWrap');
      const placeholder = document.getElementById('editPostPhotoPlaceholder');
      if (previewImg) previewImg.src = compressed;
      if (previewWrap) previewWrap.style.display = 'block';
      if (placeholder) placeholder.style.display = 'none';
    });
  }
  window.handleEditPostPhotoUpload = handleEditPostPhotoUpload;

  function removeEditPostPhoto() {
    APP_STATE.tempEditPostImage = null;
    const input = document.getElementById('editPostPhotoInput');
    if (input) input.value = '';
    const previewWrap = document.getElementById('editPostPhotoPreviewWrap');
    const placeholder = document.getElementById('editPostPhotoPlaceholder');
    if (previewWrap) previewWrap.style.display = 'none';
    if (placeholder) placeholder.style.display = 'block';
  }
  window.removeEditPostPhoto = removeEditPostPhoto;

  function saveEditedPost(e) {
    if (e) e.preventDefault();
    const id = document.getElementById('editPostId').value;
    const content = document.getElementById('editPostContent').value.trim();

    if (!content) {
      toast('⚠️ വിവരണം നൽകുക.');
      return;
    }

    const post = APP_STATE.posts.find(p => p.id === id);
    if (post) {
      post.content = content;
      post.image = APP_STATE.tempEditPostImage;
      savePosts();
      renderCommunityFeed();
      if (APP_STATE.currentScreen === 'profile') renderProfileScreen();
      closeModal('modal-edit-post');
      toast('✅ പോസ്റ്റ് മാറ്റങ്ങൾ സേവ് ചെയ്തു!');
    }
  }
  window.saveEditedPost = saveEditedPost;

  function formatMalayalamTime(timestamp) {
    if (!timestamp) return 'ഇപ്പോൾ';
    if (typeof timestamp === 'string' && isNaN(Number(timestamp))) {
      return timestamp;
    }
    const ms = Number(timestamp);
    if (isNaN(ms) || ms <= 0) return 'ഇപ്പോൾ';
    const now = Date.now();
    const diff = Math.max(0, now - ms);
    const secs = Math.floor(diff / 1000);
    const mins = Math.floor(secs / 60);
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);

    if (mins < 1) return 'ഇപ്പോൾ';
    if (mins < 60) return `${mins} മിനിറ്റ് മുൻപ്`;
    if (hours < 24) return `${hours} മണിക്കൂർ മുൻപ്`;
    if (days === 1) return 'ഇന്നലെ';
    if (days < 7) return `${days} ദിവസം മുൻപ്`;
    if (days < 30) return `${Math.floor(days / 7)} ആഴ്ച മുൻപ്`;
    const d = new Date(ms);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  }
  window.formatMalayalamTime = formatMalayalamTime;

  function renderSinglePostCard(post) {
    if (!post) return '';
    const myId = APP_STATE.currentUser && APP_STATE.currentUser.id;
    const myPhone = (APP_STATE.currentUser && APP_STATE.currentUser.phone ? APP_STATE.currentUser.phone.replace(/\D/g, '') : '');
    const postPhone = (post.authorPhone ? post.authorPhone.replace(/\D/g, '') : '');
    const isMine = (myId && post.authorId === myId) || 
                   (myPhone && postPhone && myPhone === postPhone) ||
                   (!post.isCloud && post.isCurrentUser);

    const postSnippet = (post.content || '').replace(/'/g, "\\'").replace(/"/g, '&quot;').substring(0, 35);
    const authorNameSafe = (isMine && APP_STATE.currentUser && APP_STATE.currentUser.name && APP_STATE.currentUser.name !== 'നാട്ടുകാരൻ')
      ? APP_STATE.currentUser.name.replace(/'/g, "\\'").replace(/"/g, '&quot;')
      : (post.authorName || 'നാട്ടുകാരൻ').replace(/'/g, "\\'").replace(/"/g, '&quot;');
    const timeFormatted = formatMalayalamTime(post.timestamp || post.createdAt);
    const locationSafe = post.authorLocation || post.locationName || 'കേരളം';
    const avatarSafe = isMine
      ? ((APP_STATE.currentUser && APP_STATE.currentUser.avatar && !APP_STATE.currentUser.avatar.includes('data:image/svg+xml')) ? APP_STATE.currentUser.avatar : window.DEFAULT_USER_AVATAR)
      : getRegisteredUserAvatar(post.authorPhone || post.authorId || post.authorName, post.authorAvatar);

    const typeBadge = post.type === 'offer' ? '<span style="background:#FEF3C7;color:#92400E;font-size:10px;font-weight:800;padding:2px 6px;border-radius:6px">🏷️ ഓഫർ</span>' :
                      post.type === 'photo' ? '<span style="background:#EFF6FF;color:#1E40AF;font-size:10px;font-weight:800;padding:2px 6px;border-radius:6px">🖼️ ചിത്രം</span>' :
                      '<span style="background:#ECFDF5;color:#065F46;font-size:10px;font-weight:800;padding:2px 6px;border-radius:6px">📣 അറിയിപ്പ്</span>';

    return `
      <article class="fb-card" id="${post.id}" style="background:#FFFFFF;border-radius:14px;border:1px solid #CBD5E1;box-shadow:0 1px 4px rgba(0,0,0,0.03);padding:10px 12px;margin:0">
        <div class="fb-card-header" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
          <div class="fb-author-row" onclick="openAuthorProfile('${encodeURIComponent(post.authorName || 'നാട്ടുകാരൻ')}', '${encodeURIComponent(post.authorPhone || '')}', '${encodeURIComponent(avatarSafe)}', '${encodeURIComponent(locationSafe)}', '${encodeURIComponent(post.authorBlood || 'O+')}', '${post.authorId || ''}')" style="display:flex;align-items:center;gap:8px;cursor:pointer;flex:1">
            <div class="fb-author-avatar-wrap" style="position:relative;width:36px;height:36px;flex-shrink:0">
              <img src="${avatarSafe}" alt="${authorNameSafe}" class="fb-author-avatar" style="width:36px;height:36px;border-radius:50%;object-fit:cover;border:1.5px solid #10B981" onerror="this.src=window.DEFAULT_USER_AVATAR||''">
            </div>
            <div class="fb-author-meta" style="line-height:1.2">
              <div class="fb-author-name" style="font-size:13.5px;font-weight:800;color:#0F172A;display:flex;align-items:center;gap:4px">
                ${authorNameSafe}
                <span class="fb-verified-badge" title="വെരിഫൈഡ് അംഗം" style="color:#0284C7;font-size:11px">✓</span>
              </div>
              <div class="fb-sub-meta" style="display:flex;align-items:center;gap:6px;font-size:10.5px;color:#64748B;margin-top:2px">
                <span>${timeFormatted}</span>
                <span>•</span>
                <span class="fb-loc-tag" style="background:#ECFDF5;color:#065F46;padding:1px 6px;border-radius:8px;font-weight:700">📍 ${locationSafe}</span>
              </div>
            </div>
          </div>

          <div class="fb-header-actions" style="display:flex;align-items:center;gap:4px">
            ${typeBadge}
            ${isMine ? `
              <div style="display:flex;gap:4px;margin-left:4px">
                <button onclick="openEditPostModal('${post.id}')" style="background:#EFF6FF;color:#2563EB;border:1px solid #BFDBFE;padding:3px 7px;border-radius:8px;font-size:11px;font-weight:800;cursor:pointer">
                  ✏️
                </button>
                <button class="fb-delete-btn" onclick="deletePost('${post.id}', event)" title="പോസ്റ്റ് ഡിലീറ്റ് ചെയ്യുക" style="background:#FEF2F2;color:#DC2626;border:1px solid #FECACA;padding:3px 7px;border-radius:8px;font-size:11px;font-weight:800;cursor:pointer">
                  🗑️
                </button>
              </div>
            ` : `
              <button onclick="openChatForPost('${post.id}')" 
                      style="background:#ECFDF5;border:1px solid #A7F3D0;color:#0E7043;padding:4px 8px;border-radius:10px;font-size:11px;font-weight:800;cursor:pointer;margin-left:4px">
                💬 ചാറ്റ്
              </button>
            `}
          </div>
        </div>

        <div class="fb-post-text" style="font-size:13.5px;line-height:1.45;color:#1E293B;margin-bottom:8px;white-space:pre-line">${post.content || ''}</div>

        ${post.image ? `
          <div class="fb-post-image-box" style="margin-bottom:8px;border-radius:10px;overflow:hidden;border:1px solid #CBD5E1">
            <img src="${post.image}" alt="Post attachment" class="fb-post-image" loading="lazy" decoding="async" style="width:100%;border-radius:10px;max-height:240px;object-fit:cover;display:block" onerror="this.parentElement.style.display='none'">
          </div>
        ` : ''}

        <div class="fb-action-bar" style="display:flex;align-items:center;justify-content:space-between;border-top:1px solid #F1F5F9;padding-top:8px;margin-top:4px">
          <button class="fb-action-btn ${post.isLiked ? 'liked' : ''}" onclick="togglePostLike('${post.id}', event)"
                  style="background:${post.isLiked ? '#FEF2F2' : '#F8FAFC'};color:${post.isLiked ? '#DC2626' : '#475569'};border:1px solid ${post.isLiked ? '#FECACA' : '#E2E8F0'};border-radius:8px;padding:4px 10px;font-size:11.5px;font-weight:700;display:flex;align-items:center;gap:4px;cursor:pointer">
            <span>${post.isLiked ? '❤️' : '🤍'}</span>
            <span>${post.likes || 0} ലൈക്ക്</span>
          </button>

          <button class="fb-action-btn" onclick="openChatForPost('${post.id}')"
                  style="background:#F8FAFC;color:#475569;border:1px solid #E2E8F0;border-radius:8px;padding:4px 10px;font-size:11.5px;font-weight:700;display:flex;align-items:center;gap:4px;cursor:pointer">
            <span>💬</span>
            <span>ചാറ്റ് ചെയ്യാം</span>
          </button>

          <button class="fb-action-btn" onclick="shareCommunityPost('${authorNameSafe}', '${postSnippet}')"
                  style="background:#F8FAFC;color:#475569;border:1px solid #E2E8F0;border-radius:8px;padding:4px 10px;font-size:11.5px;font-weight:700;display:flex;align-items:center;gap:4px;cursor:pointer">
            <span>🔗</span>
            <span>ഷെയർ</span>
          </button>
        </div>
      </article>
    `;
  }
  window.renderSinglePostCard = renderSinglePostCard;

  function togglePostLike(postId, e) {
    if (e) e.stopPropagation();
    const post = (APP_STATE.posts || []).find(p => p.id === postId);
    if (!post) return;

    post.isLiked = !post.isLiked;
    post.likes = Math.max(0, (post.likes || 0) + (post.isLiked ? 1 : -1));
    savePosts();
    renderCommunityFeed();
    if (typeof renderHomeCommunityFeed === 'function') renderHomeCommunityFeed();
  }
  window.togglePostLike = togglePostLike;

  function getFilteredPostsForLocation() {
    const maxRadius = APP_STATE.activeRadiusKm || 25;
    const userLat = APP_STATE.location.lat;
    const userLon = APP_STATE.location.lon;
    const userTown = String(APP_STATE.location.name || '').toLowerCase().split(',')[0].trim();
    const userDist = String(APP_STATE.location.district || '').toLowerCase().trim();

    const all = (APP_STATE.posts || []).map(p => {
      p._calculatedDist = getItemDistanceKm(p, userLat, userLon);
      return p;
    });

    if (maxRadius >= 1000) {
      return all;
    }

    const filtered = all.filter(p => {
      if (p.isCurrentUser) return true;
      if (p._calculatedDist <= maxRadius) return true;
      const pLoc = String(p.authorLocation || p.locationName || '').toLowerCase();
      if (userTown && pLoc && (pLoc.includes(userTown) || userTown.includes(pLoc))) return true;
      return false;
    });

    filtered.sort((a, b) => {
      if (a.isCurrentUser && !b.isCurrentUser) return -1;
      if (!a.isCurrentUser && b.isCurrentUser) return 1;
      return (b.createdAt || b.timestamp || 0) - (a.createdAt || a.timestamp || 0);
    });

    return filtered;
  }

  function renderCommunityFeed() {
    const container = document.getElementById('communityFeedContainer');
    if (!container) return;

    const postsToShow = getFilteredPostsForLocation();
    const maxRadius = APP_STATE.activeRadiusKm || 25;

    if (!postsToShow || postsToShow.length === 0) {
      const radiusLabel = maxRadius >= 1000 ? '' : ` (${maxRadius} km)`;
      container.innerHTML = `
        <div style="text-align:center;padding:36px 16px;background:#fff;border-radius:18px;border:1px solid #E2E8F0">
          <div style="font-size:36px;margin-bottom:8px">📍</div>
          <h3 style="margin:0 0 6px;color:#111827;font-size:16px">ഈ പ്രദേശത്ത് പോസ്റ്റുകളൊന്നുമില്ല</h3>
          <p style="font-size:13px;color:#6B7280;margin:0 0 16px;line-height:1.5">
            <b>${escapeHtml(APP_STATE.location.name)}</b> പരിസരത്ത്${radiusLabel} പോസ്റ്റുകൾ ലഭ്യമല്ല.<br>നിങ്ങളുടെ നാട്ടിലെ വിശേഷങ്ങൾ ആദ്യമായി ഇവിടെ പങ്കുവെക്കാം.
          </p>
          <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
            <button onclick="navTo('add')" style="padding:9px 16px;background:#0E7043;color:#fff;border:none;border-radius:12px;font-weight:800;font-size:12.5px;cursor:pointer">➕ പുതിയ പോസ്റ്റ് ഇടാം</button>
            <button onclick="setGlobalRadius(1000, null)" style="padding:9px 16px;background:#EFF6FF;color:#2563EB;border:1px solid #BFDBFE;border-radius:12px;font-weight:800;font-size:12.5px;cursor:pointer">മുഴുവൻ പോസ്റ്റുകൾ കാണുക</button>
          </div>
        </div>
      `;
      return;
    }

    container.innerHTML = postsToShow.map(post => renderSinglePostCard(post)).join('');
  }
  window.renderCommunityFeed = renderCommunityFeed;
  window.renderCommunityScreen = renderCommunityFeed;

  function renderHomeCommunityFeed() {
    const container = document.getElementById('homeCommunityFeedContainer');
    if (!container) return;

    const postsToShow = getFilteredPostsForLocation();

    if (!postsToShow || postsToShow.length === 0) {
      container.innerHTML = `
        <div style="text-align:center;padding:24px 16px;background:#fff;border-radius:16px;border:1px solid #E2E8F0">
          <div style="font-size:28px;margin-bottom:6px">📍</div>
          <div style="font-weight:700;font-size:13px;color:#334151">സമീപത്ത് പോസ്റ്റുകളൊന്നുമില്ല</div>
          <div style="font-size:11.5px;color:#64748B;margin:4px 0 12px"><b>${escapeHtml(APP_STATE.location.name)}</b> പരിസരത്തെ വിശേഷങ്ങൾ പങ്കുവെക്കാം.</div>
          <button onclick="navTo('add')" style="padding:8px 16px;background:#0E7043;color:#fff;border:none;border-radius:10px;font-weight:800;font-size:12px;cursor:pointer">➕ പുതിയ പോസ്റ്റ് ഇടാം</button>
        </div>
      `;
      return;
    }

    // Show top 3 recent posts within user's location on home screen
    const recentPosts = postsToShow.slice(0, 3);
    container.innerHTML = recentPosts.map(post => renderSinglePostCard(post)).join('');
  }
  window.renderHomeCommunityFeed = renderHomeCommunityFeed;

  function refreshCommunityFeedLive() {
    toast('🔄 പുതിയ പോസ്റ്റുകൾ Supabase ക്ലൗഡിൽ നിന്ന് പരിശോധിക്കുന്നു...');
    if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.syncPosts === 'function') {
      window.NN_SUPABASE_SERVICES.syncPosts().then(() => {
        renderCommunityFeed();
        toast('✅ പുതിയ പോസ്റ്റുകൾ ലൈവായി ലഭ്യമാക്കി!');
      }).catch(() => {
        renderCommunityFeed();
      });
    } else {
      renderCommunityFeed();
    }
  }
  window.refreshCommunityFeedLive = refreshCommunityFeedLive;

  function shareCommunityPost(author, snippet) {
    if (navigator.share) {
      navigator.share({
        title: 'നമ്മുടെ നാട് — കമ്മ്യൂണിറ്റി വിശേഷങ്ങൾ',
        text: `${author} പങ്കുവെച്ച പോസ്റ്റ്: "${snippet}..."\nകൂടുതൽ വിവരങ്ങൾ അറിയാൻ നമ്മുടെ നാട് ആപ്പ് തുറക്കൂ!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast('🔗 പോസ്റ്റ് ലിങ്ക് കോപ്പി ചെയ്തു!');
    }
  }
  window.shareCommunityPost = shareCommunityPost;

  function getSafePublicUserName(user, fallback = 'പ്രാദേശിക സുഹൃത്ത്') {
    if (!user) return fallback;
    const isAmbulance = Boolean(
      (typeof user === 'object') && (
        user.category === 'ambulance' ||
        user.trade?.includes('ആംബുലൻസ്') ||
        user.name?.includes('ആംബുലൻസ്') ||
        user.isEmergency
      )
    );
    let name = (typeof user === 'string') ? user : (user.name || '');
    if (!name || name === 'Chat' || name === 'സുഹൃത്ത്') return fallback;
    if (!isAmbulance) {
      if (name.match(/\d{10}/) || name.startsWith('മൊബൈൽ') || name.startsWith('chat_')) {
        return fallback;
      }
    }
    return name;
  }

  // Helper for normalizing phone numbers to 10 digits
  function normalizePhone(p) {
    if (!p) return '';
    const digits = String(p).replace(/\D/g, '');
    return digits.length >= 10 ? digits.slice(-10) : digits;
  }
  window.normalizePhone = normalizePhone;

  // ==============================================================
  // 9. DEDICATED USER PROFILE PREVIEW MODAL (FULL CAPABILITIES)
  // ==============================================================
  function renderUserProfileSheet(userData) {
    const sheet = document.getElementById('authorProfileSheetContent');
    if (!sheet) return;

    const isEmergencyOrAmbulance = Boolean(
      (userData.category === 'ambulance') ||
      (userData.trade && userData.trade.includes('ആംബുലൻസ്')) ||
      (userData.name && (userData.name.includes('ആംബുലൻസ്') || userData.name.includes('അടിയന്തിരം') || userData.name.includes('Emergency') || userData.name.includes('Ambulance'))) ||
      (userData.authorId && String(userData.authorId).includes('ambulance'))
    );
    let name = getSafePublicUserName(userData, 'പ്രാദേശിക സുഹൃത്ത്');
    let phone = userData.phone || '';
    let avatar = userData.avatar || '';
    const authorId = userData.authorId || '';
    const fromChat = !!userData.fromChat;
    const chatKey = userData.chatKey || '';

    const cleanPhone = normalizePhone(phone);

    // 1. Cross-reference with registered local services / drivers / workers
    const matchedService = (APP_STATE.services || []).find(s => {
      if (authorId && s.id === authorId) return true;
      if (cleanPhone && normalizePhone(s.phone) === cleanPhone) return true;
      if (s.name && name && s.name.trim().toLowerCase() === name.trim().toLowerCase() && name !== 'പ്രാദേശിക സുഹൃത്ത്' && name !== 'സുഹൃത്ത്' && !name.startsWith('chat_')) return true;
      return false;
    });

    // 2. Cross-reference with registered blood donors
    const matchedDonor = (APP_STATE.bloodDonors || []).find(d => {
      if (authorId && d.id === authorId) return true;
      if (cleanPhone && normalizePhone(d.phone) === cleanPhone) return true;
      if (d.name && name && d.name.trim().toLowerCase() === name.trim().toLowerCase() && name !== 'പ്രാദേശിക സുഹൃത്ത്' && name !== 'സുഹൃത്ത്') return true;
      return false;
    });

    // 3. Cross-reference with rentals
    const matchedRentals = (APP_STATE.rentals || []).filter(r => {
      if (authorId && r.id === authorId) return true;
      if (cleanPhone && normalizePhone(r.ownerPhone) === cleanPhone) return true;
      return false;
    });

    // 4. Cross-reference with community posts
    const authorPosts = (APP_STATE.posts || []).filter(p => {
      if (authorId && p.authorId === authorId) return true;
      if (cleanPhone && normalizePhone(p.authorPhone) === cleanPhone) return true;
      if (p.authorName && name && p.authorName.trim().toLowerCase() === name.trim().toLowerCase() && name !== 'പ്രാദേശിക സുഹൃത്ത്' && name !== 'സുഹൃത്ത്') return true;
      return false;
    });

    // Resolve name if missing or generic
    if (!name || name === 'Chat' || name === 'പ്രാദേശിക സുഹൃത്ത്' || name === 'സുഹൃത്ത്' || name.startsWith('chat_')) {
      if (matchedService && matchedService.name) name = matchedService.name;
      else if (matchedDonor && matchedDonor.name) name = matchedDonor.name;
      else if (authorPosts.length > 0 && authorPosts[0].authorName) name = authorPosts[0].authorName;
      else if (cleanPhone) name = 'സുഹൃത്ത് (' + cleanPhone + ')';
      else name = 'പ്രാദേശിക സുഹൃത്ത്';
    }

    // Resolve phone if missing
    if (!phone) {
      if (matchedService && matchedService.phone) phone = matchedService.phone;
      else if (matchedDonor && matchedDonor.phone) phone = matchedDonor.phone;
      else if (authorPosts.length > 0 && authorPosts[0].authorPhone) phone = authorPosts[0].authorPhone;
      else if (chatKey) {
        const phones = String(chatKey).match(/\d{10}/g) || [];
        const myClean = normalizePhone(APP_STATE.currentUser?.phone);
        phone = phones.find(p => p !== myClean) || '';
      }
    }

    // Resolve avatar
    avatar = getRegisteredUserAvatar(phone || authorId || name, avatar || (matchedService?.avatar) || (authorPosts.length > 0 ? authorPosts[0].authorAvatar : DEFAULT_USER_AVATAR));

    // Resolve location
    let loc = userData.loc || '';
    if (!loc) {
      if (matchedService) loc = resolveItemLocation(matchedService);
      else if (matchedDonor && matchedDonor.location) loc = matchedDonor.location;
      else if (authorPosts.length > 0 && authorPosts[0].authorLocation) loc = authorPosts[0].authorLocation;
      else loc = APP_STATE.location?.panchayath || 'കേരളം';
    }

    // Resolve blood
    let blood = userData.blood || '';
    if (!blood || blood === 'undefined' || blood === 'O+') {
      if (matchedDonor && matchedDonor.bloodGroup) blood = matchedDonor.bloodGroup;
      else if (authorPosts.length > 0 && authorPosts[0].authorBlood) blood = authorPosts[0].authorBlood;
      else if (!blood || blood === 'undefined') blood = 'ലഭ്യമല്ല';
    }

    // Badges
    const badges = [];
    if (matchedService) {
      badges.push(`<span class="profile-badge" style="background:#047857;color:#fff">${matchedService.icon || '🛠️'} ${escapeHtml(matchedService.trade)}</span>`);
      if (matchedService.vehicleDetails && matchedService.vehicleDetails.model) {
        badges.push(`<span class="profile-badge" style="background:#0E7043;color:#fff">🚗 ${escapeHtml(matchedService.vehicleDetails.model)}</span>`);
      }
    }
    if (matchedDonor) {
      badges.push(`<span class="profile-badge" style="background:#B91C1C;color:#fff">🩸 ${escapeHtml(matchedDonor.bloodGroup)} രക്തദാതാവ്</span>`);
    } else if (blood && blood !== 'ലഭ്യമല്ല') {
      badges.push(`<span class="profile-badge" style="background:#DC2626;color:#fff">🩸 രക്തഗ്രൂപ്പ്: ${escapeHtml(blood)}</span>`);
    }
    badges.push(`<span class="profile-badge" style="background:rgba(255,255,255,0.22);color:#fff">✓ തദ്ദേശവാസി (Verified)</span>`);

    const safeEscapedName = name.replace(/'/g, "\\'");
    const safeEscapedPhone = phone.replace(/'/g, "\\'");

    sheet.innerHTML = `
      <div class="profile-preview-hero" style="background:linear-gradient(135deg, #064E3B 0%, #0E7043 55%, #0F766E 100%);padding:24px 20px 22px;position:relative;text-align:center;color:#fff;border-radius:24px 24px 0 0">
        <button onclick="closeModal('modal-author-profile')" style="position:absolute;top:16px;right:16px;background:rgba(255,255,255,0.25);border:none;color:#fff;width:34px;height:34px;border-radius:50%;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,0.15)">✕</button>
        <img src="${avatar}" alt="${escapeHtml(name)}" class="profile-preview-avatar" onerror="this.src=window.DEFAULT_USER_AVATAR||''" style="width:84px;height:84px;border-radius:50%;border:4px solid #fff;object-fit:cover;margin:0 auto 10px;box-shadow:0 4px 14px rgba(0,0,0,0.2)">
        <div class="profile-preview-name" style="font-size:21px;font-weight:900;margin-bottom:4px;color:#fff">${escapeHtml(name)}</div>
        <div style="font-size:13px;color:#D1FAE5;display:flex;align-items:center;justify-content:center;gap:6px">
          <span>📍 ${escapeHtml(loc)}</span>
          ${(isEmergencyOrAmbulance && phone) ? `<span style="opacity:0.85">• 📞 ${escapeHtml(phone)}</span>` : '<span style="opacity:0.85">• 🔒 സ്വകാര്യ നമ്പർ</span>'}
        </div>
        <div class="profile-preview-badges" style="display:flex;flex-wrap:wrap;justify-content:center;gap:6px;margin-top:10px">
          ${badges.join('')}
        </div>
      </div>

      <!-- ACTION BUTTONS -->
      <div style="padding:14px 18px;display:flex;flex-direction:column;gap:10px;background:#F8FAFC;border-bottom:1px solid #E2E8F0">
        <div style="display:flex;gap:10px">
          ${fromChat ? `
            <button onclick="closeModal('modal-author-profile'); setTimeout(() => { const inp = document.getElementById('chatInputMessage'); if(inp) inp.focus(); }, 150);" class="profile-action-cta chat" style="flex:1;background:linear-gradient(135deg, #0E7043 0%, #10B981 100%);color:#fff;padding:12px;border:none;border-radius:14px;font-weight:800;font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 2px 8px rgba(14,112,67,0.25)">
              <span>💬</span>
              <span>ചാറ്റിലേക്ക് മടങ്ങാം</span>
            </button>
          ` : `
            <button onclick="closeModal('modal-author-profile'); ${chatKey ? `openChatModalByKey('${chatKey}')` : `openChatModal('${safeEscapedName}', '${safeEscapedPhone}', '${avatar}', 'ഹലോ ${safeEscapedName}', '${authorId}')`}" class="profile-action-cta chat" style="flex:1;background:linear-gradient(135deg, #0E7043 0%, #10B981 100%);color:#fff;padding:12px;border:none;border-radius:14px;font-weight:800;font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 2px 8px rgba(14,112,67,0.25)">
              <span>💬</span>
              <span>ചാറ്റ്</span>
            </button>
          `}
          ${(isEmergencyOrAmbulance && phone) ? `
            <a href="tel:${phone}" style="flex:1;background:#fff;border:1.5px solid #10B981;color:#065F46;padding:12px;border-radius:14px;font-weight:800;font-size:14px;text-decoration:none;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 1px 3px rgba(0,0,0,0.05)">
              <span>📞</span>
              <span>ഫോൺ വിളിക്കാം</span>
            </a>
          ` : ''}
        </div>
        <button onclick="closeModal('modal-author-profile'); viewUserProfile({ id: '${authorId || ''}', name: '${safeEscapedName}', phone: '${safeEscapedPhone}', avatar: '${avatar}', location: '${(loc || '').replace(/'/g, "\\'")}', bloodGroup: '${(blood || '').replace(/'/g, "\\'")}', chatKey: '${chatKey || ''}' }, '${fromChat ? 'chat' : 'community'}')" style="width:100%;background:linear-gradient(135deg, #065F46 0%, #047857 55%, #0D9488 100%);color:#fff;padding:12px;border:none;border-radius:14px;font-weight:800;font-size:13.5px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 3px 12px rgba(4,120,87,0.3)">
          <span>👤</span>
          <span>മുഴുവൻ പ്രൊഫൈൽ പേജിലേക്ക് പോകാം</span>
          <span>➔</span>
        </button>
      </div>

      <div style="padding:16px 18px 24px;display:flex;flex-direction:column;gap:14px">
        <!-- MATCHED SERVICE CARD -->
        ${matchedService ? `
          <div style="background:#F0FDF4;border:1.5px solid #86EFAC;border-radius:16px;padding:14px;box-shadow:0 2px 8px rgba(16,185,129,0.08)">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <span style="font-size:11px;font-weight:800;background:#DCFCE7;color:#166534;padding:3px 8px;border-radius:10px">🛠️ രജിസ്റ്റർ ചെയ്ത സർവീസ്</span>
              <span style="font-size:12px;font-weight:800;color:#0F766E">${matchedService.availability !== 'busy' ? '🟢 ലഭ്യമാണ്' : '🟡 ബുക്കിംഗ്'}</span>
            </div>
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
              <span style="font-size:26px">${matchedService.icon || '🛠️'}</span>
              <div>
                <div style="font-size:15px;font-weight:800;color:#064E3B">${escapeHtml(matchedService.trade)}</div>
                <div style="font-size:12px;color:#047857">💰 ${formatPrice(matchedService.visitingFee || 'വിസിറ്റിംഗ് നിരക്ക്')} • ⏰ ${matchedService.workingHours || 'ലഭ്യം'}</div>
              </div>
            </div>
            ${matchedService.vehicleDetails ? `
              <div style="background:#fff;border:1px solid #BBF7D0;border-radius:10px;padding:8px 10px;font-size:12px;color:#1F2937;margin-bottom:8px;display:grid;grid-template-columns:1fr 1fr;gap:6px">
                ${matchedService.vehicleDetails.model ? `<div>🚗 <b>മോഡൽ:</b> ${escapeHtml(matchedService.vehicleDetails.model)}</div>` : ''}
                ${matchedService.vehicleDetails.capacity ? `<div>👥 <b>സീറ്റിംഗ്:</b> ${escapeHtml(matchedService.vehicleDetails.capacity)}</div>` : ''}
                ${matchedService.vehicleDetails.stand ? `<div>📍 <b>സ്റ്റാൻഡ്:</b> ${escapeHtml(matchedService.vehicleDetails.stand)}</div>` : ''}
                ${matchedService.vehicleDetails.vehicleNumber ? `<div>🔢 <b>നമ്പർ:</b> ${escapeHtml(matchedService.vehicleDetails.vehicleNumber)}</div>` : ''}
                ${matchedService.vehicleDetails.baseRate ? `<div style="grid-column:span 2">💵 <b>നിരക്ക്:</b> ${formatPrice(matchedService.vehicleDetails.baseRate)}</div>` : ''}
              </div>
            ` : ''}
            <button onclick="closeModal('modal-author-profile'); openServiceDetailModal('${matchedService.id}')" style="width:100%;padding:9px;background:#0E7043;color:#fff;border:none;border-radius:10px;font-weight:800;font-size:12.5px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px">
              <span>📋 സർവീസ് പ്രൊഫൈൽ വിശദമായി കാണാം ➔</span>
            </button>
          </div>
        ` : ''}

        <!-- MATCHED BLOOD DONOR CARD -->
        ${matchedDonor ? `
          <div style="background:#FEF2F2;border:1.5px solid #FCA5A5;border-radius:16px;padding:14px;box-shadow:0 2px 8px rgba(239,68,68,0.08)">
            <div style="display:flex;align-items:center;justify-content:space-between">
              <div style="display:flex;align-items:center;gap:10px">
                <span style="font-size:28px">🩸</span>
                <div>
                  <div style="font-size:15px;font-weight:900;color:#991B1B">രക്തദാതാവ് (${escapeHtml(matchedDonor.bloodGroup)})</div>
                  <div style="font-size:12px;color:#B91C1C">📍 ${escapeHtml(matchedDonor.location || loc)}</div>
                </div>
              </div>
              <span style="font-size:11px;font-weight:800;background:#FEE2E2;color:#991B1B;padding:4px 8px;border-radius:10px">${matchedDonor.isAvailable !== false ? '🟢 ലഭ്യമാണ്' : '🟡 ഇപ്പോൾ ലഭ്യമല്ല'}</span>
            </div>
          </div>
        ` : ''}

        <!-- MATCHED RENTALS -->
        ${matchedRentals.length > 0 ? `
          <div style="background:#FFFBEB;border:1.5px solid #FCD34D;border-radius:16px;padding:14px">
            <div style="font-size:13px;font-weight:800;color:#92400E;margin-bottom:8px">🏠 വാടകയ്ക്ക് നൽകുന്നവ (${matchedRentals.length})</div>
            <div style="display:flex;flex-direction:column;gap:8px">
              ${matchedRentals.map(r => `
                <div style="background:#fff;border:1px solid #FDE68A;border-radius:10px;padding:8px 10px;display:flex;justify-content:space-between;align-items:center">
                  <div>
                    <div style="font-size:13px;font-weight:800;color:#1F2937">${escapeHtml(r.title)}</div>
                    <div style="font-size:11px;color:#78350F">📍 ${escapeHtml(r.location || loc)}</div>
                  </div>
                  <div style="font-size:13px;font-weight:900;color:#D97706">${formatPrice(r.price)}</div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- AUTHOR POSTS -->
        <div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
            <h4 style="margin:0;font-size:14.5px;font-weight:800;color:#1E293B">ഇവരുടെ പോസ്റ്റുകൾ (${authorPosts.length})</h4>
          </div>
          <div style="display:flex;flex-direction:column;gap:10px">
            ${authorPosts.length === 0 ? `
              <div style="text-align:center;padding:18px;background:#F8FAFC;border-radius:14px;border:1px dashed #CBD5E1;color:#64748B;font-size:13px">
                ഇതുവരെ പോസ്റ്റുകളൊന്നും പബ്ലിഷ് ചെയ്തിട്ടില്ല.
              </div>
            ` : authorPosts.map(p => `
              <div style="background:#FFFFFF;padding:12px 14px;border-radius:14px;border:1px solid #E2E8F0;box-shadow:0 1px 3px rgba(0,0,0,0.03)">
                <div style="font-size:11px;color:#64748B;margin-bottom:6px;display:flex;align-items:center;justify-content:space-between">
                  <span>${p.timestamp || 'ഇപ്പോൾ'}</span>
                  <span>📍 ${escapeHtml(p.authorLocation || loc)}</span>
                </div>
                <div style="font-size:13.5px;color:#1E293B;line-height:1.45">${escapeHtml(p.content || '')}</div>
                ${p.image ? `<img src="${p.image}" style="width:100%;max-height:180px;object-fit:cover;border-radius:10px;margin-top:8px" onerror="this.style.display='none'">` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    openModal('modal-author-profile');
  }

  function openAuthorProfile(nameEnc, phoneEnc, avatarEnc, locEnc, bloodEnc, authorId) {
    const name = nameEnc ? decodeURIComponent(nameEnc) : '';
    const phone = phoneEnc ? decodeURIComponent(phoneEnc) : '';
    const avatar = avatarEnc ? decodeURIComponent(avatarEnc) : '';
    const loc = locEnc ? decodeURIComponent(locEnc) : '';
    const blood = bloodEnc ? decodeURIComponent(bloodEnc) : '';

    renderUserProfileSheet({
      name,
      phone,
      avatar,
      loc,
      blood,
      authorId,
      fromChat: false
    });
  }
  window.openAuthorProfile = openAuthorProfile;

  function openChatRecipientProfile(chatKey) {
    let key = chatKey || (APP_STATE.activeChatRecipient && APP_STATE.activeChatRecipient.key);
    let name = '';
    let phone = '';
    let avatar = '';
    let recipientId = '';
    let fromChat = false;

    const chatModal = document.getElementById('modal-chat');
    if (chatModal && chatModal.classList.contains('active')) {
      fromChat = true;
    }

    if (APP_STATE.activeChatRecipient && (!chatKey || chatKey === APP_STATE.activeChatRecipient.key)) {
      name = APP_STATE.activeChatRecipient.name;
      phone = APP_STATE.activeChatRecipient.phone;
      avatar = APP_STATE.activeChatRecipient.avatar;
      recipientId = APP_STATE.activeChatRecipient.id;
    }

    if ((!name || name === 'Chat') && key && APP_STATE.chatMeta && APP_STATE.chatMeta[key]) {
      const meta = APP_STATE.chatMeta[key];
      name = meta.name || name;
      phone = meta.phone || phone;
      avatar = meta.avatar || avatar;
      recipientId = meta.recipientId || recipientId;
    }

    if (!phone && key) {
      const phones = String(key).match(/\d{10}/g) || [];
      const myCleanPhone = normalizePhone(APP_STATE.currentUser?.phone);
      if (phones.length > 0) {
        phone = phones.find(p => p !== myCleanPhone) || '';
      }
    }

    renderUserProfileSheet({
      name: name || 'പ്രാദേശിക സുഹൃത്ത്',
      phone: phone || '',
      avatar: avatar || DEFAULT_USER_AVATAR,
      authorId: recipientId || '',
      fromChat: fromChat,
      chatKey: key
    });
  }
  window.openChatRecipientProfile = openChatRecipientProfile;
  window.openChatRecipientProfileByKey = function (chatKey) {
    openChatRecipientProfile(chatKey);
  };

  // FULL PROFILE PAGE ROUTING STATE & HANDLERS FOR OTHER USERS (CITIZENS, DRIVERS, PROVIDERS)
  let _viewingOtherUser = null;
  let _profileOrigin = 'chat';
  let _activeChatReturnKey = null;
  window._viewingOtherUser = null;

  function viewUserProfile(targetUser, fromWhere) {
    if (!targetUser) return;
    _viewingOtherUser = { ...targetUser };
    window._viewingOtherUser = _viewingOtherUser;
    _profileOrigin = fromWhere || 'chat';

    if (APP_STATE.activeChatRecipient && APP_STATE.activeChatRecipient.key) {
      _activeChatReturnKey = APP_STATE.activeChatRecipient.key;
    } else if (targetUser.chatKey) {
      _activeChatReturnKey = targetUser.chatKey;
    }

    if (typeof closeModal === 'function') {
      closeModal('modal-chat');
      closeModal('modal-author-profile');
    }

    navTo('profile');
    renderProfileScreen();
  }
  window.viewUserProfile = viewUserProfile;

  function viewChatRecipientFullProfile(chatKey) {
    let key = chatKey || (APP_STATE.activeChatRecipient && APP_STATE.activeChatRecipient.key) || _activeChatReturnKey;
    let name = '';
    let phone = '';
    let avatar = '';
    let recipientId = '';

    if (APP_STATE.activeChatRecipient && (!chatKey || chatKey === APP_STATE.activeChatRecipient.key)) {
      name = APP_STATE.activeChatRecipient.name;
      phone = APP_STATE.activeChatRecipient.phone;
      avatar = APP_STATE.activeChatRecipient.avatar;
      recipientId = APP_STATE.activeChatRecipient.id;
    }

    if ((!name || name === 'Chat') && key && APP_STATE.chatMeta && APP_STATE.chatMeta[key]) {
      const meta = APP_STATE.chatMeta[key];
      name = meta.name || name;
      phone = meta.phone || phone;
      avatar = meta.avatar || avatar;
      recipientId = meta.recipientId || recipientId;
    }

    if (!phone && key) {
      const phones = String(key).match(/\d{10}/g) || [];
      const myCleanPhone = normalizePhone(APP_STATE.currentUser?.phone);
      if (phones.length > 0) {
        phone = phones.find(p => p !== myCleanPhone) || '';
      }
    }

    const cleanPhone = normalizePhone(phone);
    let matchedService = null;
    let matchedDonor = null;

    if (cleanPhone) {
      matchedService = (APP_STATE.services || []).find(s => normalizePhone(s.phone) === cleanPhone);
      matchedDonor = (APP_STATE.bloodDonors || []).find(d => normalizePhone(d.phone) === cleanPhone);
    }
    if (name && name !== 'Chat' && name !== 'പ്രാദേശിക സുഹൃത്ത്') {
      if (!matchedService) matchedService = (APP_STATE.services || []).find(s => s.name === name);
      if (!matchedDonor) matchedDonor = (APP_STATE.bloodDonors || []).find(d => d.name === name);
    }
    if (!name || name === 'Chat' || name === 'പ്രാദേശിക സുഹൃത്ത്') {
      if (matchedService && matchedService.name) name = matchedService.name;
      else if (matchedDonor && matchedDonor.name) name = matchedDonor.name;
    }

    const targetUser = {
      id: recipientId || (matchedService ? matchedService.id : (cleanPhone ? ('usr_' + cleanPhone) : 'usr_other')),
      name: name || 'പ്രാദേശിക സുഹൃത്ത്',
      phone: phone || '',
      avatar: getRegisteredUserAvatar(phone || recipientId || name, avatar || (matchedService?.avatar) || (matchedDonor?.avatar) || DEFAULT_USER_AVATAR),
      location: (matchedService?.location) || (matchedDonor?.location) || APP_STATE.location?.name || 'കേരളം',
      bloodGroup: (matchedDonor?.bloodGroup) || '',
      trade: (matchedService?.trade) || '',
      chatKey: key
    };

    viewUserProfile(targetUser, 'chat');
  }
  window.viewChatRecipientFullProfile = viewChatRecipientFullProfile;

  function exitOtherUserProfile() {
    const origin = _profileOrigin || 'chat';
    const returnKey = _activeChatReturnKey;
    const otherUser = _viewingOtherUser;
    _viewingOtherUser = null;
    window._viewingOtherUser = null;
    _profileOrigin = 'chat';

    if (origin === 'chat') {
      navTo('chat');
      if (returnKey) {
        setTimeout(() => {
          openChatModalByKey(returnKey);
        }, 120);
      } else if (otherUser && (otherUser.phone || otherUser.name)) {
        setTimeout(() => {
          openChatModal(otherUser.name, otherUser.phone, otherUser.avatar, '', otherUser.id);
        }, 120);
      }
    } else if (origin === 'community') {
      navTo('community');
    } else if (origin === 'services') {
      navTo('services');
    } else {
      navTo('home');
    }
  }
  window.exitOtherUserProfile = exitOtherUserProfile;

  function openChatFromProfile() {
    if (!_viewingOtherUser) {
      navTo('chat');
      return;
    }
    const u = _viewingOtherUser;
    const key = u.chatKey || _activeChatReturnKey;
    if (key) {
      openChatModalByKey(key);
    } else {
      openChatModal(u.name, u.phone, u.avatar, '', u.id);
    }
  }
  window.openChatFromProfile = openChatFromProfile;

  // ==============================================================
  // 10. REALTIME 1-ON-1 IN-APP CLOUD CHAT ENGINE (SUPABASE REALTIME)
  // ==============================================================

  function computeChatKey(id1, phone1, name1, id2, phone2, name2) {
    function sanitize(s) {
      if (!s) return '';
      return String(s).trim().toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
    }
    const p1 = normalizePhone(phone1);
    const p2 = normalizePhone(phone2);

    if (p1 && p2 && p1 !== p2) {
      return 'chat_' + [p1, p2].sort().join('_');
    }

    const clean1 = p1 || sanitize(id1) || 'user1';
    const clean2 = p2 || sanitize(id2) || 'user2';

    if (clean1 === clean2) {
      return 'chat_' + clean1 + '_peer';
    }
    return 'chat_' + [clean1, clean2].sort().join('_');
  }

  function goToAllChatsInbox() {
    closeModal('modal-chat');
    if (APP_STATE.currentScreen !== 'chat') {
      navTo('chat');
    }
  }
  window.goToAllChatsInbox = goToAllChatsInbox;

  function extractContactInfoFromKeyAndMeta(k, meta, myPhone) {
    let phone = normalizePhone(meta?.phone);
    if (!phone) {
      const matches = String(k || '').match(/\d{10}/g);
      if (matches && matches.length > 0) {
        if (myPhone) {
          const other = matches.find(p => p !== myPhone);
          phone = other || '';
        } else {
          phone = matches[0];
        }
      }
    }
    const recipientId = (meta?.recipientId && !meta.recipientId.startsWith('usr_me_')) ? meta.recipientId : '';
    const name = (meta?.name && meta.name !== 'സുഹൃത്ത്' && !meta.name.startsWith('chat_')) ? meta.name.trim() : '';

    let groupKey = '';
    if (phone && phone !== myPhone) {
      groupKey = 'phone_' + phone;
    } else if (recipientId) {
      groupKey = 'id_' + recipientId;
    } else if (name) {
      groupKey = 'name_' + name.toLowerCase();
    } else {
      groupKey = 'key_' + k;
    }
    return { phone, recipientId, name, groupKey };
  }

  let _lastReconcileFp = '';
  let _lastReconcileTime = 0;
  function reconcileChatThreads(force) {
    const now = Date.now();
    if (!force && _lastReconcileTime && (now - _lastReconcileTime < 10000)) {
      return;
    }
    _lastReconcileTime = now;

    if (!APP_STATE.chats) APP_STATE.chats = {};
    if (!APP_STATE.chatMeta) APP_STATE.chatMeta = {};

    const myPhone = normalizePhone(APP_STATE.currentUser?.phone);
    const myId = APP_STATE.currentUser?.id;

    // 1. Gather all existing keys
    const allKeys = Array.from(new Set([
      ...Object.keys(APP_STATE.chats),
      ...Object.keys(APP_STATE.chatMeta)
    ]));

    if (allKeys.length === 0) return;

    const fp = allKeys.length + ':' + (myPhone || '') + ':' + allKeys.slice(0, 8).join(',');
    if (fp === _lastReconcileFp && !force) return;
    _lastReconcileFp = fp;

    // 2. Group keys by contact identity
    const groups = {};
    const contactInfoMap = {};

    allKeys.forEach(k => {
      const meta = APP_STATE.chatMeta[k];
      const info = extractContactInfoFromKeyAndMeta(k, meta, myPhone);
      contactInfoMap[k] = info;
      if (!groups[info.groupKey]) {
        groups[info.groupKey] = [];
      }
      groups[info.groupKey].push(k);
    });

    let stateChanged = false;

    // 3. For each group, merge duplicate threads and normalize to canonical symmetric key
    Object.keys(groups).forEach(groupKey => {
      const keys = groups[groupKey];
      let contactPhone = '';
      let contactId = '';
      let contactName = '';

      keys.forEach(k => {
        const inf = contactInfoMap[k];
        if (inf.phone && inf.phone !== myPhone && !contactPhone) contactPhone = inf.phone;
        if (inf.recipientId && !contactId) contactId = inf.recipientId;
        if (inf.name && !contactName) contactName = inf.name;
      });

      // Compute canonical key for this contact
      let canonicalKey = '';
      if (contactPhone && myPhone && contactPhone !== myPhone) {
        canonicalKey = 'chat_' + [contactPhone, myPhone].sort().join('_');
      } else {
        const multiPartKey = keys.find(k => k.startsWith('chat_') && k.split('_').length >= 3);
        if (multiPartKey) {
          canonicalKey = multiPartKey;
        } else if (contactId && contactId !== myId) {
          canonicalKey = computeChatKey(myId, myPhone, APP_STATE.currentUser?.name, contactId, contactPhone, contactName);
        } else if (contactPhone && myId) {
          canonicalKey = computeChatKey(myId, myPhone, APP_STATE.currentUser?.name, contactId, contactPhone, contactName);
        } else {
          canonicalKey = keys.find(k => k.startsWith('chat_') && k !== ('chat_' + myPhone)) || keys[0];
        }
      }

      const needsMigration = keys.length > 1 || (keys[0] !== canonicalKey);

      if (needsMigration) {
        stateChanged = true;

        const mergedMsgs = [];
        const seenSignatures = new Set();

        let bestMeta = {
          name: '',
          phone: contactPhone || '',
          avatar: '',
          recipientId: contactId || '',
          type: 'other',
          category: '',
          updatedAt: 0
        };

        const keysToProcess = Array.from(new Set([...keys, canonicalKey]));
        keysToProcess.forEach(k => {
          const msgs = APP_STATE.chats[k] || [];
          msgs.forEach(m => {
            const cleanText = (m.text || '').trim();
            const sig = (m.id && !String(m.id).startsWith('msg_ctx_'))
              ? m.id
              : (cleanText + '_' + (m.timestamp || m.time || '') + '_' + (m.sender || ''));
            if (!seenSignatures.has(sig)) {
              seenSignatures.add(sig);
              mergedMsgs.push(m);
            }
          });

          const mMeta = APP_STATE.chatMeta[k];
          if (mMeta) {
            if (mMeta.name && (!bestMeta.name || bestMeta.name === 'സുഹൃത്ത്' || bestMeta.name.startsWith('chat_'))) {
              bestMeta.name = mMeta.name;
            }
            if (mMeta.phone && !bestMeta.phone) {
              bestMeta.phone = mMeta.phone;
            }
            if (mMeta.avatar && (!bestMeta.avatar || bestMeta.avatar === DEFAULT_USER_AVATAR)) {
              bestMeta.avatar = mMeta.avatar;
            }
            if (mMeta.recipientId && !bestMeta.recipientId) {
              bestMeta.recipientId = mMeta.recipientId;
            }
            if (mMeta.type && mMeta.type !== 'other') {
              bestMeta.type = mMeta.type;
            }
            if (mMeta.category && !bestMeta.category) {
              bestMeta.category = mMeta.category;
            }
            if ((mMeta.updatedAt || 0) > bestMeta.updatedAt) {
              bestMeta.updatedAt = mMeta.updatedAt;
            }
          }
        });

        if (!bestMeta.name) {
          const isAmb = (bestMeta.type === 'ambulance' || (bestMeta.category && bestMeta.category.includes('ആംബുലൻസ്')));
          bestMeta.name = isAmb ? ('ആംബുലൻസ് ' + (bestMeta.phone || '')) : (contactName || 'ഗ്രാമവാസി / സുഹൃത്ത്');
        }
        if (!bestMeta.avatar) {
          bestMeta.avatar = DEFAULT_USER_AVATAR;
        }

        mergedMsgs.sort((a, b) => (Number(a.timestamp) || 0) - (Number(b.timestamp) || 0));

        if (mergedMsgs.length > 0) {
          const latestTime = mergedMsgs[mergedMsgs.length - 1].timestamp || 0;
          if (latestTime > bestMeta.updatedAt) {
            bestMeta.updatedAt = latestTime;
          }
        }

        APP_STATE.chats[canonicalKey] = mergedMsgs;
        APP_STATE.chatMeta[canonicalKey] = bestMeta;

        keysToProcess.forEach(k => {
          if (k !== canonicalKey) {
            delete APP_STATE.chats[k];
            delete APP_STATE.chatMeta[k];
          }
        });

        if (APP_STATE.activeChatRecipient && keysToProcess.includes(APP_STATE.activeChatRecipient.key)) {
          APP_STATE.activeChatRecipient.key = canonicalKey;
          APP_STATE.activeChatRecipient.name = bestMeta.name;
          APP_STATE.activeChatRecipient.phone = bestMeta.phone;
          APP_STATE.activeChatRecipient.avatar = bestMeta.avatar;
        }
      }
    });

    if (stateChanged) {
      try {
        localStorage.setItem('nn_chats_store', JSON.stringify(APP_STATE.chats));
        localStorage.setItem('nn_chats_meta', JSON.stringify(APP_STATE.chatMeta));
      } catch (_) {}
    }
  }
  window.reconcileChatThreads = reconcileChatThreads;

  function openChatModalByKey(chatKey) {
    if (!chatKey) return;
    if (typeof reconcileChatThreads === 'function') {
      reconcileChatThreads();
    }
    const myCleanPhone = normalizePhone(APP_STATE.currentUser?.phone);
    let resolvedKey = chatKey;
    let targetPhone = '';

    // Extract target phone from metadata or chatKey
    const metaDirect = (APP_STATE.chatMeta && (APP_STATE.chatMeta[chatKey] || APP_STATE.chatMeta[resolvedKey])) || {};
    if (metaDirect.phone) {
      targetPhone = normalizePhone(metaDirect.phone);
    }
    if (!targetPhone) {
      const phones = String(chatKey).match(/\d{10}/g) || [];
      if (phones.length > 0) {
        targetPhone = phones.find(p => p !== myCleanPhone) || '';
      }
    }

    // Always canonicalize if two phones exist
    if (targetPhone && myCleanPhone && targetPhone !== myCleanPhone) {
      const canonical = 'chat_' + [targetPhone, myCleanPhone].sort().join('_');
      // If messages exist under chatKey or an old key, migrate to canonical
      if (APP_STATE.chats) {
        if (!APP_STATE.chats[canonical]) APP_STATE.chats[canonical] = [];
        [chatKey, resolvedKey, 'chat_' + targetPhone].forEach(oldK => {
          if (oldK && oldK !== canonical && APP_STATE.chats[oldK]) {
            APP_STATE.chats[oldK].forEach(m => {
              if (!APP_STATE.chats[canonical].some(e => e.id === m.id || (e.timestamp === m.timestamp && e.text === m.text))) {
                APP_STATE.chats[canonical].push(m);
              }
            });
            delete APP_STATE.chats[oldK];
          }
          if (oldK && oldK !== canonical && APP_STATE.chatMeta && APP_STATE.chatMeta[oldK]) {
            APP_STATE.chatMeta[canonical] = Object.assign({}, APP_STATE.chatMeta[canonical] || {}, APP_STATE.chatMeta[oldK]);
            delete APP_STATE.chatMeta[oldK];
          }
        });
      }
      resolvedKey = canonical;
    }

    const meta = (APP_STATE.chatMeta && APP_STATE.chatMeta[resolvedKey]) || (APP_STATE.chatMeta && APP_STATE.chatMeta[chatKey]) || {};
    const msgs = (APP_STATE.chats && APP_STATE.chats[resolvedKey]) || (APP_STATE.chats && APP_STATE.chats[chatKey]) || [];
    let name = meta.name;
    let phone = meta.phone || targetPhone || '';
    let avatar = meta.avatar || '';
    let recipientId = meta.recipientId || '';
    let initialContext = meta.category || '';
    let type = meta.type || 'other';

    if (!name || name === 'സുഹൃത്ത്' || name.startsWith('chat_')) {
      const themMsg = msgs.slice().reverse().find(m => m.sender !== 'me' && m.senderName);
      if (themMsg && themMsg.senderName) {
        name = themMsg.senderName;
      }
    }
    if (!name) {
      name = phone ? ('സുഹൃത്ത് ' + phone) : 'പ്രാദേശിക സുഹൃത്ത്';
    }

    openChatModal(name, phone, avatar, initialContext, recipientId, resolvedKey, type);
  }
  window.openChatModalByKey = openChatModalByKey;

  function openChatModal(recipientName, recipientPhone, recipientAvatar, initialContext, recipientId, explicitChatKey, chatType) {
    const safeName = recipientName || 'പ്രാദേശിക സുഹൃത്ത്';
    const safePhone = recipientPhone || '';
    const safeAvatar = (recipientAvatar && recipientAvatar !== DEFAULT_USER_AVATAR) ? recipientAvatar : '';

    if (typeof reconcileChatThreads === 'function') {
      reconcileChatThreads();
    }

    const myCleanPhone = normalizePhone(APP_STATE.currentUser?.phone);
    const targetCleanPhone = normalizePhone(safePhone) || (function() {
      const phones = String(explicitChatKey || '').match(/\d{10}/g) || [];
      return phones.find(p => p !== myCleanPhone) || '';
    })();

    let chatKey = '';
    // Priority 1: Canonical 2-phone sorted key (Universal)
    if (targetCleanPhone && myCleanPhone && targetCleanPhone !== myCleanPhone) {
      chatKey = 'chat_' + [targetCleanPhone, myCleanPhone].sort().join('_');
    } else if (explicitChatKey) {
      chatKey = explicitChatKey;
    } else {
      chatKey = computeChatKey(
        APP_STATE.currentUser.id,
        APP_STATE.currentUser.phone,
        APP_STATE.currentUser.name,
        recipientId,
        safePhone,
        safeName
      );
    }

    // Merge any loose messages from explicitChatKey or phone fragments
    if (!APP_STATE.chats) APP_STATE.chats = {};
    if (!APP_STATE.chatMeta) APP_STATE.chatMeta = {};
    if (!APP_STATE.chats[chatKey]) APP_STATE.chats[chatKey] = [];

    const keysToMerge = new Set();
    if (explicitChatKey && explicitChatKey !== chatKey) keysToMerge.add(explicitChatKey);
    if (targetCleanPhone && targetCleanPhone !== myCleanPhone) {
      Object.keys(APP_STATE.chats).forEach(k => {
        if (k !== chatKey && k.includes(targetCleanPhone)) keysToMerge.add(k);
      });
      Object.keys(APP_STATE.chatMeta).forEach(k => {
        if (k !== chatKey && (k.includes(targetCleanPhone) || normalizePhone(APP_STATE.chatMeta[k]?.phone) === targetCleanPhone)) keysToMerge.add(k);
      });
    }

    keysToMerge.forEach(oldK => {
      if (APP_STATE.chats[oldK] && APP_STATE.chats[oldK].length > 0) {
        APP_STATE.chats[oldK].forEach(m => {
          if (!APP_STATE.chats[chatKey].some(e => e.id === m.id || (e.timestamp === m.timestamp && e.text === m.text))) {
            APP_STATE.chats[chatKey].push(m);
          }
        });
        delete APP_STATE.chats[oldK];
      }
      if (APP_STATE.chatMeta[oldK]) {
        APP_STATE.chatMeta[chatKey] = Object.assign({}, APP_STATE.chatMeta[chatKey] || {}, APP_STATE.chatMeta[oldK]);
        delete APP_STATE.chatMeta[oldK];
      }
    });

    const existingMeta = APP_STATE.chatMeta[chatKey] || {};
    const finalPhone = targetCleanPhone || safePhone || existingMeta.phone || '';
    const resolvedAvatar = getRegisteredUserAvatar(finalPhone || recipientId || safeName, safeAvatar || existingMeta.avatar || DEFAULT_USER_AVATAR);

    APP_STATE.activeChatRecipient = {
      name: (safeName && safeName !== 'പ്രാദേശിക സുഹൃത്ത്') ? safeName : (existingMeta.name || safeName),
      phone: finalPhone,
      avatar: resolvedAvatar,
      id: recipientId || existingMeta.recipientId || '',
      key: chatKey
    };

    APP_STATE.chatMeta[chatKey] = {
      name: APP_STATE.activeChatRecipient.name,
      phone: APP_STATE.activeChatRecipient.phone,
      avatar: resolvedAvatar,
      recipientId: APP_STATE.activeChatRecipient.id,
      type: chatType || (existingMeta.type) || 'other',
      category: initialContext || (existingMeta.category) || '',
      updatedAt: Date.now()
    };

    const headerName = document.getElementById('chatRecipientName');
    const headerAvatar = document.getElementById('chatRecipientAvatar');
    const callBtn = document.getElementById('chatRecipientCallBtn');
    if (headerName) headerName.textContent = APP_STATE.activeChatRecipient.name;
    if (headerAvatar) {
      headerAvatar.src = resolvedAvatar;
      headerAvatar.onerror = function () { this.src = DEFAULT_USER_AVATAR; };
    }
    if (callBtn) {
      if (finalPhone) {
        callBtn.href = 'tel:' + finalPhone;
        callBtn.style.display = 'flex';
      } else {
        callBtn.style.display = 'none';
      }
    }

    const banner = document.getElementById('chatInquiryBanner');
    const topic = document.getElementById('chatInquiryTopic');
    if (initialContext) {
      if (topic) topic.textContent = initialContext;
      if (banner) banner.style.display = 'flex';
    } else {
      if (banner) banner.style.display = 'none';
    }

    const input = document.getElementById('chatInputMessage');
    if (input) {
      input.value = '';
    }

    // Close stickers drawer on chat open
    if (typeof toggleChatStickers === 'function') toggleChatStickers(false);

    // Dynamic Context Quick Reply Chips
    const quickBar = document.querySelector('.quick-reply-bar');
    if (quickBar) {
      const isBiz = (chatType === 'business' || (initialContext && (initialContext.includes('🏪') || initialContext.includes('കട') || initialContext.includes('Shop'))));
      if (isBiz) {
        quickBar.innerHTML = `
          <button class="quick-chip" onclick="sendQuickReply('സ്റ്റോക്ക് ഉണ്ടോ?')">സ്റ്റോക്ക് ഉണ്ടോ?</button>
          <button class="quick-chip" onclick="sendQuickReply('ഹോം ഡെലിവറി ഉണ്ടോ?')">ഹോം ഡെലിവറി ഉണ്ടോ?</button>
          <button class="quick-chip" onclick="sendQuickReply('ഇപ്പോൾ തുറന്നിട്ടുണ്ടോ?')">ഇപ്പോൾ തുറന്നിട്ടുണ്ടോ?</button>
          <button class="quick-chip" onclick="sendQuickReply('വില എത്രയാണ്?')">വില എത്രയാണ്?</button>
          <button class="quick-chip" onclick="sendQuickReply('സ്ഥലം എവിടെയാണ്?')">സ്ഥലം എവിടെയാണ്?</button>
        `;
      } else {
        quickBar.innerHTML = `
          <button class="quick-chip" onclick="sendQuickReply('ലഭ്യമാണോ?')">ലഭ്യമാണോ?</button>
          <button class="quick-chip" onclick="sendQuickReply('സ്ഥലം എവിടെയാണ്?')">സ്ഥലം എവിടെയാണ്?</button>
          <button class="quick-chip" onclick="sendQuickReply('റേറ്റ് എത്രയാണ്?')">റേറ്റ് എത്രയാണ്?</button>
          <button class="quick-chip" onclick="sendQuickReply('നാളെ വരാമോ?')">നാളെ വരാമോ?</button>
          <button class="quick-chip" onclick="sendQuickReply('ഫോൺ നമ്പർ തരാമോ?')">ഫോൺ നമ്പർ തരാമോ?</button>
        `;
      }
    }

    // High Speed Render: If local messages exist, display immediately (0ms latency).
    // If empty, show ultra-fast loading placeholder while cloud fetches
    const box = document.getElementById('chatMessagesBox');
    if (APP_STATE.chats[chatKey] && APP_STATE.chats[chatKey].length > 0) {
      renderChatMessages();
    } else if (box) {
      box.dataset.renderedKey = chatKey;
      box.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:240px;gap:12px">
          <div class="chat-loading-spinner"></div>
          <div style="font-size:13px;font-weight:700;color:#0E7043">സന്ദേശങ്ങൾ ലോഡ് ചെയ്യുന്നു...</div>
        </div>
      `;
    }

    openModal('modal-chat');
    markChatAsSeen(chatKey);

    if (box) box.scrollTop = box.scrollHeight;
    requestAnimationFrame(() => {
      if (box) box.scrollTop = box.scrollHeight;
      const inp = document.getElementById('chatInputMessage');
      if (inp) inp.focus();
    });

    // Subscribe to live Supabase Cloud messages for this thread
    if (typeof window._activeChatUnsubscribe === 'function') {
      try { window._activeChatUnsubscribe(); } catch (_) {}
      window._activeChatUnsubscribe = null;
    }

    if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.subscribeChatThread === 'function') {
      window._activeChatUnsubscribe = window.NN_SUPABASE_SERVICES.subscribeChatThread(chatKey, (cloudMsgs) => {
        if (Array.isArray(cloudMsgs)) {
          if (!APP_STATE.chats[chatKey]) APP_STATE.chats[chatKey] = [];

          if (cloudMsgs.length === 0) {
            // Cloud has 0 messages, remove spinner and show welcome screen
            if (APP_STATE.chats[chatKey].length === 0) {
              renderChatMessages();
            }
            return;
          }

          const myId = APP_STATE.currentUser.id;
          const myCleanPhone = normalizePhone(APP_STATE.currentUser.phone);
          let hasNewMessage = false;

          cloudMsgs.forEach(m => {
            if (!m || !m.text || m.text === '[deleted]') return;
            const mPhone = normalizePhone(m.senderPhone || m.sender_phone);
            const isMe = m.sender === 'me' || (m.senderId && m.senderId === myId) || (myCleanPhone && mPhone && mPhone === myCleanPhone);
            const exists = APP_STATE.chats[chatKey].some(local => local.id === m.id || (local.timestamp === m.timestamp && local.text === m.text));
            if (!exists) {
              hasNewMessage = true;
              APP_STATE.chats[chatKey].push({
                id: m.id || ('msg_' + Date.now()),
                sender: isMe ? 'me' : 'them',
                senderId: m.senderId,
                senderPhone: m.senderPhone,
                senderName: m.senderName || '',
                type: m.type || 'text',
                stickerEmoji: m.stickerEmoji,
                stickerText: m.stickerText,
                challenge: m.challenge,
                answers: m.answers || {},
                reactions: m.reactions || {},
                text: m.text,
                time: m.time || 'ഇപ്പോൾ',
                timestamp: m.timestamp || Date.now(),
                status: m.status || (isMe ? 'delivered' : ''),
                seen: m.seen || (m.status === 'seen')
              });
            } else {
              const localMsg = APP_STATE.chats[chatKey].find(local => local.id === m.id || (local.timestamp === m.timestamp && local.text === m.text));
              if (localMsg) {
                if (isMe) localMsg.sender = 'me';
                if (m.status && m.status !== localMsg.status) {
                  localMsg.status = m.status;
                  localMsg.seen = (m.status === 'seen' || m.seen === true);
                  hasNewMessage = true;
                }
                if (m.seen && !localMsg.seen) {
                  localMsg.seen = true;
                  localMsg.status = 'seen';
                  hasNewMessage = true;
                }
                if (m.reactions && JSON.stringify(m.reactions) !== JSON.stringify(localMsg.reactions)) {
                  localMsg.reactions = m.reactions;
                  hasNewMessage = true;
                }
                if (m.answers && JSON.stringify(m.answers) !== JSON.stringify(localMsg.answers)) {
                  localMsg.answers = m.answers;
                  hasNewMessage = true;
                }
              }
            }
          });

          if (hasNewMessage) {
            APP_STATE.chats[chatKey].sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
            saveChats();
            renderChatMessages();
            markChatAsSeen(chatKey);
          }
        }
      });
    }

    setTimeout(() => {
      if (box) box.scrollTop = box.scrollHeight;
    }, 150);
  }

  function markChatAsSeen(chatKey) {
    if (!chatKey || !APP_STATE.chats || !APP_STATE.chats[chatKey]) return;
    const thread = APP_STATE.chats[chatKey];
    let changed = false;
    const now = Date.now();
    const myId = APP_STATE.currentUser?.id;
    const myCleanPhone = normalizePhone(APP_STATE.currentUser?.phone);

    thread.forEach(m => {
      if (m.sender === 'them' && !m.seen) {
        m.seen = true;
        m.seenAt = now;
        changed = true;
      }
    });

    if (changed) {
      saveChats();
    }

    if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.markChatSeen === 'function') {
      window.NN_SUPABASE_SERVICES.markChatSeen(chatKey, myCleanPhone, myId);
    }
  }
  window.markChatAsSeen = markChatAsSeen;
  window.openChatModal = openChatModal;

  function formatChatDatePill(timestamp) {
    if (!timestamp) return 'ഇന്ന്';
    const d = new Date(timestamp);
    const now = new Date();
    if (d.toDateString() === now.toDateString()) return 'ഇന്ന്';
    const yest = new Date(now);
    yest.setDate(now.getDate() - 1);
    if (d.toDateString() === yest.toDateString()) return 'ഇന്നലെ';
    return d.toLocaleDateString('ml-IN', { day: 'numeric', month: 'short' });
  }

  function renderSingleMessageHtml(msg, recipientAvatar) {
    const isMe = msg.sender === 'me';
    let innerContentHtml = '';

    // Check if message is a voice note
    let audioUrl = msg.audioUrl || '';
    let voiceDuration = msg.duration || '0:05';
    let isVoice = msg.type === 'voice' || !!audioUrl;

    if (!isVoice && typeof msg.text === 'string' && msg.text.startsWith('[voice:')) {
      const match = msg.text.match(/^\[voice:([^|]+)\|([^\]]+)\]$/);
      if (match) {
        isVoice = true;
        audioUrl = match[1];
        voiceDuration = match[2];
      }
    }

    if (msg.type === 'sticker') {
      innerContentHtml = `
        <div class="chat-sticker-bubble">
          <span class="cs-emoji">${escapeHtml(msg.stickerEmoji || '🔥')}</span>
          <span class="cs-text">${escapeHtml(msg.stickerText || msg.text)}</span>
        </div>
      `;
    } else if (isVoice) {
      innerContentHtml = `
        <div class="chat-voice-bubble">
          <button type="button" class="voice-play-btn" onclick="togglePlayVoice(this, '${escapeHtml(audioUrl)}')" title="പ്ലേ ചെയ്യുക">
            <span class="play-icon">▶</span>
          </button>
          <div class="voice-wave-wrap">
            <div class="voice-waveform-bars">
              <span class="w-bar" style="height:10px"></span>
              <span class="w-bar" style="height:18px"></span>
              <span class="w-bar" style="height:12px"></span>
              <span class="w-bar" style="height:22px"></span>
              <span class="w-bar" style="height:14px"></span>
              <span class="w-bar" style="height:24px"></span>
              <span class="w-bar" style="height:16px"></span>
              <span class="w-bar" style="height:20px"></span>
              <span class="w-bar" style="height:10px"></span>
              <span class="w-bar" style="height:16px"></span>
            </div>
            <div class="voice-progress-track">
              <div class="voice-progress-fill" style="width:0%"></div>
            </div>
          </div>
          <span class="voice-duration">${escapeHtml(voiceDuration)}</span>
        </div>
      `;
    } else {
      innerContentHtml = `<div class="chat-bubble-content">${escapeHtml(msg.text)}</div>`;
    }

    return `
      <div class="chat-message-row ${isMe ? 'outgoing-row' : 'incoming-row'}" data-msg-id="${escapeHtml(msg.id)}">
        ${!isMe ? `
          <img src="${escapeHtml(recipientAvatar)}" class="chat-bubble-avatar" alt="Avatar" onerror="this.src=window.DEFAULT_USER_AVATAR||''">
        ` : ''}
        <div class="chat-bubble ${isMe ? 'outgoing' : 'incoming'} ${msg.type ? ('type-' + msg.type) : ''}">
          ${innerContentHtml}
          <div class="chat-bubble-meta">
            <span class="chat-time-text">${escapeHtml(msg.time || '')}</span>
            ${isMe ? (
              (msg.status === 'seen' || msg.seen === true)
                ? '<span class="chat-ticks seen" title="കണ്ടു (Seen)">✓✓</span><span class="chat-seen-pill">കണ്ടു</span>'
                : ((msg.status === 'sent')
                    ? '<span class="chat-ticks sent" title="അയച്ചു (Sent)">✓</span>'
                    : '<span class="chat-ticks delivered" title="എത്തിച്ചേർന്നു (Delivered)">✓✓</span>')
            ) : ''}
          </div>
        </div>
      </div>
    `;
  }

  function renderChatMessages() {
    const box = document.getElementById('chatMessagesBox');
    if (!box || !APP_STATE.activeChatRecipient) return;

    const chatKey = APP_STATE.activeChatRecipient.key;
    const rawThread = (APP_STATE.chats[chatKey] || []).filter(m => m && m.text && m.text !== '[deleted]');
    rawThread.sort((a, b) => (Number(a.timestamp) || 0) - (Number(b.timestamp) || 0));
    APP_STATE.chats[chatKey] = rawThread;
    const thread = rawThread;
    const recipientAvatar = (APP_STATE.activeChatRecipient && APP_STATE.activeChatRecipient.avatar) || DEFAULT_USER_AVATAR;

    if (thread.length === 0) {
      box.dataset.renderedKey = chatKey;
      box.innerHTML = `
        <div style="text-align:center;padding:28px 20px;background:#FFFFFF;border-radius:22px;margin:24px auto;max-width:320px;box-shadow:0 8px 24px rgba(79,70,229,0.08);border:1.5px solid #E0E7FF">
          <div style="width:62px;height:62px;border-radius:50%;background:linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%);border:2px solid #C7D2FE;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;font-size:30px;box-shadow:0 4px 12px rgba(99,102,241,0.18)">💬</div>
          <div style="font-weight:900;font-size:16px;color:#0F172A">${escapeHtml(APP_STATE.activeChatRecipient.name)}</div>
          <p style="font-size:12px;color:#64748B;margin:6px 0 0;line-height:1.5">നമ്മുടെ നാട് തത്സമയ സംഭാഷണം ആരംഭിക്കൂ. സന്ദേശങ്ങൾ ക്ലൗഡിൽ സുരക്ഷിതമാണ്.</p>
          <div style="margin-top:14px;font-size:11px;font-weight:800;color:#4338CA;background:#EEF2FF;border:1px solid #C7D2FE;display:inline-flex;align-items:center;gap:4px;padding:5px 14px;border-radius:20px">
            <span>⚡ തത്സമയ കണക്റ്റ്</span>
          </div>
          <div style="margin-top:14px">
            <button type="button" onclick="toggleChatStickers(true)" style="background:linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%);border:1.5px solid #6366F1;color:#4338CA;padding:8px 16px;border-radius:999px;font-size:12px;font-weight:800;cursor:pointer;display:inline-flex;align-items:center;gap:6px;box-shadow:0 2px 6px rgba(99,102,241,0.15)">
              <span>🎭</span> <span>മലയാളം സ്റ്റിക്കർ അയക്കൂ!</span>
            </button>
          </div>
        </div>
      `;
      return;
    }

    // Fast Incremental Render: If same thread is open and only new messages arrived
    if (box.dataset.renderedKey === chatKey && box.children.length > 0 && !box.querySelector('[style*="text-align:center"]')) {
      const existingRows = box.querySelectorAll('.chat-message-row');
      const renderedIds = new Set();
      existingRows.forEach(el => {
        const id = el.getAttribute('data-msg-id');
        if (id) renderedIds.add(id);
      });

      const newMsgs = thread.filter(m => !renderedIds.has(String(m.id)));
      if (newMsgs.length > 0 && newMsgs.length <= 4) {
        let appendHtml = '';
        newMsgs.forEach(m => {
          appendHtml += renderSingleMessageHtml(m, recipientAvatar);
        });
        box.insertAdjacentHTML('beforeend', appendHtml);
        box.scrollTop = box.scrollHeight;
        return;
      }
    }

    box.dataset.renderedKey = chatKey;
    let lastDateStr = '';
    const messagesHtml = thread.map(msg => {
      const dateStr = formatChatDatePill(msg.timestamp);
      let dateDivider = '';
      if (dateStr !== lastDateStr) {
        lastDateStr = dateStr;
        dateDivider = `
          <div class="chat-date-divider">
            <span>${escapeHtml(dateStr)}</span>
          </div>
        `;
      }
      return dateDivider + renderSingleMessageHtml(msg, recipientAvatar);
    }).join('');

    box.innerHTML = messagesHtml;
    box.scrollTop = box.scrollHeight;
  }

  function sendChatMessage() {
    const input = document.getElementById('chatInputMessage');
    const text = (input ? input.value : '').trim();
    if (!text || !APP_STATE.activeChatRecipient) return;

    const chatKey = APP_STATE.activeChatRecipient.key;
    if (!APP_STATE.chats[chatKey]) APP_STATE.chats[chatKey] = [];

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const msgId = 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);

    const senderName = APP_STATE.currentUser.name || 'നാട്ടുകാരൻ';
    const senderAvatar = APP_STATE.currentUser.avatar || DEFAULT_USER_AVATAR;

    const recPhone = normalizePhone(APP_STATE.activeChatRecipient.phone);
    const recId = APP_STATE.activeChatRecipient.id || (recPhone ? ('usr_' + recPhone) : '');

    const msgObj = {
      id: msgId,
      senderId: APP_STATE.currentUser.id,
      senderName: senderName,
      senderPhone: APP_STATE.currentUser.phone || '',
      senderEmail: APP_STATE.currentUser.email || '',
      senderAvatar: senderAvatar,
      recipientId: recId,
      recipientPhone: recPhone || '',
      recipientEmail: APP_STATE.activeChatRecipient.email || '',
      type: 'text',
      text: text,
      time: timeStr,
      timestamp: Date.now(),
      status: 'sent'
    };

    // Instant local echo (0ms latency)
    APP_STATE.chats[chatKey].push({
      ...msgObj,
      sender: 'me',
      status: 'sent'
    });

    if (input) input.value = '';
    if (APP_STATE.chatMeta && APP_STATE.chatMeta[chatKey]) {
      APP_STATE.chatMeta[chatKey].updatedAt = Date.now();
      if (!APP_STATE.chatMeta[chatKey].recipientId && recId) {
        APP_STATE.chatMeta[chatKey].recipientId = recId;
      }
    }
    saveChats();
    updateChatBadgeCounter();
    renderChatMessages();
    if (typeof updateChatStreakUI === 'function') updateChatStreakUI(chatKey);

    // Broadcast to Supabase Realtime Cloud (Instant sub-second delivery)
    const metaObj = {
      recipientId: recId,
      recipientName: APP_STATE.activeChatRecipient.name,
      recipientPhone: recPhone || '',
      recipientEmail: APP_STATE.activeChatRecipient.email || '',
      recipientAvatar: APP_STATE.activeChatRecipient.avatar,
      senderId: APP_STATE.currentUser.id,
      senderName: senderName,
      senderPhone: APP_STATE.currentUser.phone || '',
      senderEmail: APP_STATE.currentUser.email || '',
      senderAvatar: senderAvatar
    };

    if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.sendChatMessage === 'function') {
      window.NN_SUPABASE_SERVICES.sendChatMessage(chatKey, msgObj, metaObj);
    }

    // Closed-app background push delivery via OneSignal
    if (typeof window !== 'undefined' && window.NN_ONESIGNAL && typeof window.NN_ONESIGNAL.sendPush === 'function') {
      try {
        window.NN_ONESIGNAL.sendPush(
          APP_STATE.activeChatRecipient.phone,
          `💬 സന്ദേശം: ${senderName}`,
          text,
          {
            type: 'chat',
            chatKey: chatKey,
            senderName: senderName,
            senderPhone: APP_STATE.currentUser.phone || '',
            senderAvatar: senderAvatar,
            senderId: APP_STATE.currentUser.id
          }
        );
      } catch (_) {}
    }
  }
  window.sendChatMessage = sendChatMessage;

  function sendVoiceChatMessage(base64Audio, durationText = '0:05', durationSec = 5) {
    if (!APP_STATE.activeChatRecipient || !base64Audio) return;

    const chatKey = APP_STATE.activeChatRecipient.key;
    if (!APP_STATE.chats[chatKey]) {
      APP_STATE.chats[chatKey] = [];
    }

    const senderName = APP_STATE.currentUser.name || 'ഞാൻ';
    const senderAvatar = APP_STATE.currentUser.avatar || DEFAULT_USER_AVATAR;
    const timeStr = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

    // Pack voice data into compact payload
    const encodedText = `[voice:${base64Audio}|${durationText}]`;
    const msgObj = {
      id: 'vmsg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      text: encodedText,
      type: 'voice',
      audioUrl: base64Audio,
      duration: durationText,
      durationSec: durationSec,
      time: timeStr,
      timestamp: Date.now(),
      status: 'sent'
    };

    // Instant local echo
    APP_STATE.chats[chatKey].push({
      ...msgObj,
      sender: 'me',
      status: 'sent'
    });

    if (APP_STATE.chatMeta && APP_STATE.chatMeta[chatKey]) {
      APP_STATE.chatMeta[chatKey].updatedAt = Date.now();
    }
    saveChats();
    updateChatBadgeCounter();
    renderChatMessages();

    // Broadcast to Supabase Realtime Cloud (Instant cross-device delivery)
    const metaObj = {
      recipientId: APP_STATE.activeChatRecipient.id || '',
      recipientName: APP_STATE.activeChatRecipient.name,
      recipientPhone: APP_STATE.activeChatRecipient.phone,
      recipientAvatar: APP_STATE.activeChatRecipient.avatar,
      senderId: APP_STATE.currentUser.id,
      senderName: senderName,
      senderPhone: APP_STATE.currentUser.phone,
      senderAvatar: senderAvatar
    };

    if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.sendChatMessage === 'function') {
      window.NN_SUPABASE_SERVICES.sendChatMessage(chatKey, msgObj, metaObj);
    }

    // Closed-app background push delivery via OneSignal
    if (typeof window !== 'undefined' && window.NN_ONESIGNAL && typeof window.NN_ONESIGNAL.sendPush === 'function') {
      try {
        window.NN_ONESIGNAL.sendPush(
          APP_STATE.activeChatRecipient.phone,
          `🎙️ വോയ്സ് സന്ദേശം: ${senderName}`,
          `🎙️ വോയ്സ് നോട്ട് (${durationText})`,
          {
            type: 'chat',
            chatKey: chatKey,
            senderName: senderName,
            senderPhone: APP_STATE.currentUser.phone || '',
            senderAvatar: senderAvatar,
            senderId: APP_STATE.currentUser.id
          }
        );
      } catch (_) {}
    }
  }
  window.sendVoiceChatMessage = sendVoiceChatMessage;

  // ==============================================================
  // MALAYALAM STICKERS MODULE (ചാറ്റ് മലയാളം സ്റ്റിക്കറുകൾ)
  // ==============================================================

  const MALAYALAM_STICKERS = [
    { text: 'പൊളിച്ചു!', emoji: '🔥', cat: 'mass' },
    { text: 'എന്താ മോനേ!', emoji: '😎', cat: 'mass' },
    { text: 'വേറെ ലെവൽ!', emoji: '🚀', cat: 'mass' },
    { text: 'തീപ്പൊരി!', emoji: '💥', cat: 'mass' },
    { text: 'ചിരിച്ചു ചത്തു!', emoji: '😂', cat: 'comedy' },
    { text: 'ഇതാര് സാമ്പോളിയോ?!', emoji: '🤣', cat: 'comedy' },
    { text: 'അയ്യോ ചിരി നിർത്താൻ വയ്യ!', emoji: '💀', cat: 'comedy' },
    { text: 'ശരി ഡാ!', emoji: '👍', cat: 'support' },
    { text: 'കട്ട സപ്പോർട്ട്!', emoji: '🤝', cat: 'support' },
    { text: 'അടിപൊളി!', emoji: '✨', cat: 'support' },
    { text: 'ഭാഗ്യം ഉണ്ടാവട്ടെ!', emoji: '🍀', cat: 'support' },
    { text: 'ചായ കുടിച്ചോ?', emoji: '☕', cat: 'care' },
    { text: 'നാട്ടിൽ എപ്പോഴാ?', emoji: '🌴', cat: 'care' },
    { text: 'സത്യം പറ!', emoji: '🤨', cat: 'care' },
    { text: 'അയ്യോ കഷ്ടം!', emoji: '🥺', cat: 'care' }
  ];
  window.MALAYALAM_STICKERS = MALAYALAM_STICKERS;

  function toggleChatStickers(forceOpen) {
    const panel = document.getElementById('chatStickersPanel');
    if (!panel) return;
    const shouldOpen = (typeof forceOpen === 'boolean') ? forceOpen : (panel.style.display === 'none');
    panel.style.display = shouldOpen ? 'flex' : 'none';
    if (shouldOpen) {
      renderChatStickersGrid();
    }
  }
  window.toggleChatStickers = toggleChatStickers;

  function renderChatStickersGrid() {
    const grid = document.getElementById('chatStickersGrid');
    if (!grid) return;
    grid.innerHTML = `
      <div class="cfz-stickers-grid">
        ${MALAYALAM_STICKERS.map(stk => `
          <div class="cfz-sticker-item" onclick="sendMalayalamSticker('${escapeHtml(stk.text)}', '${escapeHtml(stk.emoji)}')">
            <span class="cfz-sticker-emoji">${stk.emoji}</span>
            <span class="cfz-sticker-text">${escapeHtml(stk.text)}</span>
          </div>
        `).join('')}
      </div>
    `;
  }
  window.renderChatStickersGrid = renderChatStickersGrid;

  function sendMalayalamSticker(stickerText, emoji) {
    if (!APP_STATE.activeChatRecipient) return;
    const chatKey = APP_STATE.activeChatRecipient.key;
    if (!APP_STATE.chats[chatKey]) APP_STATE.chats[chatKey] = [];

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const msgId = 'msg_stk_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);

    const senderName = APP_STATE.currentUser.name || 'നാട്ടുകാരൻ';
    const senderAvatar = APP_STATE.currentUser.avatar || DEFAULT_USER_AVATAR;

    const msgObj = {
      id: msgId,
      senderId: APP_STATE.currentUser.id,
      senderName: senderName,
      senderPhone: APP_STATE.currentUser.phone || '',
      senderAvatar: senderAvatar,
      type: 'sticker',
      stickerText: stickerText,
      stickerEmoji: emoji,
      text: `${emoji} ${stickerText}`,
      time: timeStr,
      timestamp: Date.now()
    };

    APP_STATE.chats[chatKey].push({ ...msgObj, sender: 'me' });
    APP_STATE.chats[chatKey].sort((a, b) => (Number(a.timestamp) || 0) - (Number(b.timestamp) || 0));
    if (APP_STATE.chatMeta && APP_STATE.chatMeta[chatKey]) {
      APP_STATE.chatMeta[chatKey].updatedAt = Date.now();
    }
    saveChats();
    updateChatBadgeCounter();
    renderChatMessages();
    toggleChatStickers(false);

    // Broadcast to Supabase Cloud
    const metaObj = {
      recipientId: APP_STATE.activeChatRecipient.id || '',
      recipientName: APP_STATE.activeChatRecipient.name,
      recipientPhone: APP_STATE.activeChatRecipient.phone,
      recipientAvatar: APP_STATE.activeChatRecipient.avatar,
      senderId: APP_STATE.currentUser.id,
      senderName: senderName,
      senderPhone: APP_STATE.currentUser.phone,
      senderAvatar: senderAvatar
    };
    if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.sendChatMessage === 'function') {
      window.NN_SUPABASE_SERVICES.sendChatMessage(chatKey, msgObj, metaObj);
    }
  }
  window.sendMalayalamSticker = sendMalayalamSticker;

  // ==============================================================
  // LOCAL BUSINESS DIRECTORY MODULE (വ്യാപാരങ്ങൾ & കടകൾ)
  // ==============================================================

  const SEED_BUSINESSES = [
    {
      id: 'biz_1',
      name: 'കണ്ണൂർ സൂപ്പർമാർക്കറ്റ് & ഗ്രോസറി',
      category: 'grocery',
      categoryName: 'സൂപ്പർമാർക്കറ്റ് & പലചരക്ക്',
      icon: '🛒',
      location: 'പഴയങ്ങാടി ബസ് സ്റ്റാൻഡ്, കണ്ണൂർ',
      district: 'കണ്ണൂർ',
      lat: 11.9360,
      lon: 75.3620,
      phone: '+919846011223',
      whatsapp: '+919846011223',
      timing: 'രാവിലെ 8:00 - രാത്രി 9:30',
      offer: '🔥 ഈ ആഴ്ചയിലെ ഓഫർ: എല്ലാ പലചരക്ക് സാധനങ്ങൾക്കും 10% ഡിസ്കൗണ്ട്!',
      delivery: true,
      verified: true,
      rating: 4.8
    },
    {
      id: 'biz_2',
      name: 'മലബാർ റോയൽ ബേക്കറി & കഫേ',
      category: 'food',
      categoryName: 'ഹോട്ടൽ & ബേക്കറി',
      icon: '🍲',
      location: 'തളിപ്പറമ്പ് മെയിൻ റോഡ്, കണ്ണൂർ',
      district: 'കണ്ണൂർ',
      lat: 12.0450,
      lon: 75.3580,
      phone: '+919847123456',
      whatsapp: '+919847123456',
      timing: 'രാവിലെ 7:00 - രാത്രി 10:00',
      offer: '☕ വൈകുന്നേരത്തെ സ്പെഷ്യൽ: നാടൻ ചായയും ചൂടുള്ള നെയ്യപ്പവും',
      delivery: true,
      verified: true,
      rating: 4.9
    },
    {
      id: 'biz_3',
      name: 'ശ്രീലക്ഷ്മി ടെക്സ്റ്റൈൽസ് & സിൽക്ക്സ്',
      category: 'fashion',
      categoryName: 'വസ്ത്രങ്ങൾ & ഫാഷൻ',
      icon: '👗',
      location: 'പയ്യന്നൂർ ടൗൺ, കണ്ണൂർ',
      district: 'കണ്ണൂർ',
      lat: 12.1000,
      lon: 75.2000,
      phone: '+919846234567',
      whatsapp: '+919846234567',
      timing: 'രാവിലെ 9:00 - രാത്രി 8:30',
      offer: '✨ വിവാഹ പർച്ചേസുകൾക്ക് സൗജന്യ ഗിഫ്റ്റ് പാക്ക്',
      delivery: false,
      verified: true,
      rating: 4.7
    },
    {
      id: 'biz_4',
      name: 'കേരള ഓർഗാനിക് തേൻ & നാടൻ ഉൽപ്പന്നങ്ങൾ',
      category: 'homemade',
      categoryName: 'ഹോം മെയ്ഡ് & നാടൻ',
      icon: '🍯',
      location: 'ശ്രീകണ്ഠപുരം, കണ്ണൂർ',
      district: 'കണ്ണൂർ',
      lat: 11.9800,
      lon: 75.5200,
      phone: '+919447345678',
      whatsapp: '+919447345678',
      timing: 'രാവിലെ 8:30 - രാത്രി 7:30',
      offer: '🐝 ശുദ്ധമായ ചെറുതേനും നാടൻ വെളിച്ചെണ്ണയും നേരിട്ട് വാങ്ങാം',
      delivery: true,
      verified: true,
      rating: 5.0
    },
    {
      id: 'biz_5',
      name: 'സ്മാർട്ട് മൊബൈൽ കെയർ & ഇലക്ട്രോണിക്സ്',
      category: 'electronics',
      categoryName: 'മൊബൈൽ & ഇലക്ട്രോണിക്സ്',
      icon: '📱',
      location: 'കണ്ണൂർ റെയിൽവേ സ്റ്റേഷൻ റോഡ്',
      district: 'കണ്ണൂർ',
      lat: 11.8745,
      lon: 75.3704,
      phone: '+919895456789',
      whatsapp: '+919895456789',
      timing: 'രാവിലെ 9:30 - രാത്രി 8:30',
      offer: '⚡ സ്മാർട്ട്ഫോൺ ഡിസ്പ്ലേ ചേഞ്ചിംഗിന് 3 മാസത്തെ ഗ്യാരണ്ടി',
      delivery: false,
      verified: true,
      rating: 4.8
    },
    {
      id: 'biz_6',
      name: 'ജനസേവന മെഡിക്കൽ & സർജിക്കൽസ്',
      category: 'pharmacy',
      categoryName: 'മെഡിക്കൽ & ഫാർമസി',
      icon: '💊',
      location: 'തോട്ടട, കണ്ണൂർ',
      district: 'കണ്ണൂർ',
      lat: 11.8380,
      lon: 75.4050,
      phone: '+919446567890',
      whatsapp: '+919446567890',
      timing: '24 മണിക്കൂറും പ്രവർത്തിക്കുന്നു (24x7)',
      offer: '🚑 എല്ലാ പ്രിസ്‌ക്രിപ്ഷൻ മരുന്നുകൾക്കും 15% ഇളവ് & ഫ്രീ ഹോം ഡെലിവറി',
      delivery: true,
      verified: true,
      rating: 4.9
    }
  ];

  if (!APP_STATE.businesses) {
    try {
      const stored = localStorage.getItem('nn_businesses');
      APP_STATE.businesses = stored ? JSON.parse(stored) : [...SEED_BUSINESSES];
    } catch (_) {
      APP_STATE.businesses = [...SEED_BUSINESSES];
    }
  }

  function saveBusinesses() {
    try {
      localStorage.setItem('nn_businesses', JSON.stringify(APP_STATE.businesses));
    } catch (_) {}
  }
  window.saveBusinesses = saveBusinesses;

  let activeBusinessCategory = 'all';
  let activeBusinessSearchQuery = '';

  function filterBusinessCategory(cat, btn) {
    activeBusinessCategory = cat;
    document.querySelectorAll('.business-cat-chip').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderBusinessScreen();
  }
  window.filterBusinessCategory = filterBusinessCategory;

  function handleBusinessSearchInput(query) {
    activeBusinessSearchQuery = (query || '').toLowerCase().trim();
    renderBusinessScreen();
  }
  window.handleBusinessSearchInput = handleBusinessSearchInput;

  function openBusinessChat(shopId) {
    const biz = (APP_STATE.businesses || []).find(b => b.id === shopId);
    if (!biz) return;
    openChatModal(
      biz.name,
      biz.phone,
      'assets/cat-business-3d.jpg',
      `🏪 ${biz.name} (${biz.categoryName})`,
      biz.id,
      null,
      'business'
    );
  }
  window.openBusinessChat = openBusinessChat;

  function openAddBusinessModal() {
    const locInput = document.getElementById('regBusinessLocation');
    if (locInput && (!locInput.value || locInput.value === 'തത്സമയ ലൊക്കേഷൻ')) {
      locInput.value = (APP_STATE.location && APP_STATE.location.name) || 'കണ്ണൂർ, കേരളം';
    }
    const latInp = document.getElementById('regBusinessLat');
    const lonInp = document.getElementById('regBusinessLon');
    if (latInp && APP_STATE.location) latInp.value = APP_STATE.location.lat;
    if (lonInp && APP_STATE.location) lonInp.value = APP_STATE.location.lon;
    openModal('modal-add-business');
  }
  window.openAddBusinessModal = openAddBusinessModal;

  function detectLiveGpsLocationForBusiness() {
    toast('📡 ലൈവ് GPS ലൊക്കേഷൻ കണ്ടെത്തുന്നു...');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const latInp = document.getElementById('regBusinessLat');
        const lonInp = document.getElementById('regBusinessLon');
        if (latInp) latInp.value = lat;
        if (lonInp) lonInp.value = lon;
        const locInp = document.getElementById('regBusinessLocation');
        if (locInp) {
          locInp.value = `${APP_STATE.location.name || 'കേരളം'} (${lat.toFixed(4)}, ${lon.toFixed(4)})`;
        }
        toast('✅ കൃത്യമായ ലൈവ് സ്ഥാനം ചേർത്തു!');
      }, () => {
        toast('ℹ️ GPS ലഭ്യമായില്ല, സ്ഥലം നേരിട്ട് ടൈപ്പ് ചെയ്യുക');
      });
    }
  }
  window.detectLiveGpsLocationForBusiness = detectLiveGpsLocationForBusiness;

  function submitBusinessRegistration(event) {
    if (event) event.preventDefault();

    const name = document.getElementById('regBusinessName')?.value?.trim();
    const category = document.getElementById('regBusinessCategory')?.value;
    const location = document.getElementById('regBusinessLocation')?.value?.trim();
    const phone = document.getElementById('regBusinessPhone')?.value?.trim();
    const whatsapp = document.getElementById('regBusinessWhatsapp')?.value?.trim() || phone;
    const hours = document.getElementById('regBusinessHours')?.value?.trim() || 'രാവിലെ 9:00 - രാത്രി 9:00';
    const offer = document.getElementById('regBusinessOffer')?.value?.trim() || '';
    const delivery = document.getElementById('regBusinessDelivery')?.checked || false;
    const lat = parseFloat(document.getElementById('regBusinessLat')?.value || APP_STATE.location.lat);
    const lon = parseFloat(document.getElementById('regBusinessLon')?.value || APP_STATE.location.lon);

    if (!name || !location || !phone) {
      toast('⚠️ ദയവായി ആവശ്യമായ വിവരങ്ങൾ പൂരിപ്പിക്കുക');
      return;
    }

    const catNames = {
      grocery: 'സൂപ്പർമാർക്കറ്റ് & പലചരക്ക്',
      food: 'ഹോട്ടൽ & ബേക്കറി',
      fashion: 'വസ്ത്രങ്ങൾ & ഫാഷൻ',
      electronics: 'മൊബൈൽ & ഇലക്ട്രോണിക്സ്',
      pharmacy: 'മെഡിക്കൽ & ഫാർമസി',
      homemade: 'ഹോം മെയ്ഡ് & നാടൻ',
      hardware: 'ഹാർഡ്‌വെയർ',
      auto: 'വർക്ക്ഷോപ്പ്',
      other: 'പ്രാദേശിക വ്യാപാരം'
    };

    const newBiz = {
      id: 'biz_' + Date.now(),
      name: name,
      category: category,
      categoryName: catNames[category] || 'വ്യാപാരം',
      icon: '🏪',
      location: location,
      district: APP_STATE.location.district || 'കേരളം',
      lat: lat,
      lon: lon,
      phone: phone,
      whatsapp: whatsapp,
      timing: hours,
      offer: offer ? `🏷️ ${offer}` : '',
      delivery: delivery,
      verified: true,
      rating: 5.0,
      timestamp: Date.now()
    };

    if (!APP_STATE.businesses) APP_STATE.businesses = [];
    APP_STATE.businesses.unshift(newBiz);
    saveBusinesses();
    closeModal('modal-add-business');
    toast(`🎉 '${name}' കട വിജയകരമായി ചേർത്തു!`);
    renderBusinessScreen();
  }
  window.submitBusinessRegistration = submitBusinessRegistration;

  function renderBusinessScreen() {
    const container = document.getElementById('businessListContainer');
    if (!container) return;

    if (!APP_STATE.businesses || APP_STATE.businesses.length === 0) {
      APP_STATE.businesses = [...SEED_BUSINESSES];
    }

    const maxR = APP_STATE.activeRadiusKm || 5;
    const userLat = APP_STATE.location.lat;
    const userLon = APP_STATE.location.lon;

    const filtered = APP_STATE.businesses.filter(b => {
      // 1. Category Filter
      if (activeBusinessCategory !== 'all' && b.category !== activeBusinessCategory) {
        return false;
      }
      // 2. Search Filter
      if (activeBusinessSearchQuery) {
        const q = activeBusinessSearchQuery;
        const matches = (b.name && b.name.toLowerCase().includes(q)) ||
                        (b.location && b.location.toLowerCase().includes(q)) ||
                        (b.offer && b.offer.toLowerCase().includes(q)) ||
                        (b.categoryName && b.categoryName.toLowerCase().includes(q));
        if (!matches) return false;
      }
      // 3. Radius Distance Filter
      if (maxR < 1000 && b.lat && b.lon) {
        const d = calculateDistanceKm(userLat, userLon, b.lat, b.lon);
        if (d > maxR) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="text-align:center;padding:36px 16px;background:#FFFFFF;border-radius:20px;border:1px solid #E2E8F0">
          <div style="font-size:38px;margin-bottom:8px">🏪</div>
          <div style="font-weight:800;font-size:15px;color:#0F172A">ഈ വിഭാഗത്തിൽ കടകൾ കണ്ടെത്തിയില്ല</div>
          <p style="font-size:12px;color:#64748B;margin:6px 0 14px">നിങ്ങളുടെ സ്വന്തം കടയോ നിങ്ങൾക്കറിയാവുന്ന കടയോ ഇപ്പോൾ ചേർക്കാം</p>
          <button onclick="openAddBusinessModal()" style="background:#059669;color:#FFFFFF;border:none;padding:10px 18px;border-radius:999px;font-size:13px;font-weight:800;cursor:pointer">
            ➕ സ്വന്തം കട ചേർക്കാം
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(b => {
      let distStr = '';
      if (b.lat && b.lon) {
        const d = calculateDistanceKm(userLat, userLon, b.lat, b.lon);
        distStr = d < 1 ? `${Math.round(d * 1000)} m` : `${d.toFixed(1)} km`;
      }

      return `
        <div style="background:#FFFFFF;border-radius:18px;border:1.5px solid #E2E8F0;padding:14px;box-shadow:0 3px 12px rgba(6,78,59,0.06);display:flex;flex-direction:column;gap:10px;transition:transform 0.15s ease">
          <!-- TOP ROW: TITLE & BADGE -->
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px">
            <div style="display:flex;align-items:center;gap:10px">
              <div style="width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%);border:1.5px solid #86EFAC;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">
                ${b.icon || '🏪'}
              </div>
              <div>
                <div style="font-size:15.5px;font-weight:900;color:#064E3B;font-family:'Manjari', sans-serif;letter-spacing:-0.3px;line-height:1.25">
                  ${escapeHtml(b.name)}
                </div>
                <div style="display:flex;align-items:center;gap:6px;margin-top:3px;font-size:11px;color:#047857;font-weight:700">
                  <span>🏷️ ${escapeHtml(b.categoryName)}</span>
                  ${b.verified ? '<span style="background:#ECFDF5;color:#059669;padding:1px 6px;border-radius:6px;font-size:9.5px;font-weight:900">✓ വെരിഫൈഡ്</span>' : ''}
                </div>
              </div>
            </div>
            ${distStr ? `
              <span style="font-size:11px;font-weight:800;color:#047857;background:#F0FDF4;padding:3px 8px;border-radius:10px;border:1px solid #86EFAC;white-space:nowrap">
                📍 ${distStr}
              </span>
            ` : ''}
          </div>

          <!-- LOCATION & HOURS -->
          <div style="font-size:12px;color:#475569;display:flex;flex-direction:column;gap:3px;background:#F8FAFC;padding:8px 10px;border-radius:10px">
            <div style="display:flex;align-items:center;gap:6px">
              <span>📍</span>
              <span style="font-weight:600">${escapeHtml(b.location)}</span>
            </div>
            <div style="display:flex;align-items:center;gap:6px">
              <span>🕒</span>
              <span style="color:#065F46;font-weight:700">${escapeHtml(b.timing || 'തുറന്നിരിക്കുന്നു')}</span>
              ${b.delivery ? '<span style="margin-left:auto;font-size:10.5px;color:#059669;font-weight:800">🛵 ഹോം ഡെലിവറി</span>' : ''}
            </div>
          </div>

          <!-- SPECIAL OFFER BANNER IF AVAILABLE -->
          ${b.offer ? `
            <div style="background:linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%);border:1px dashed #F59E0B;border-radius:10px;padding:7px 10px;font-size:11.5px;font-weight:800;color:#92400E;display:flex;align-items:center;gap:6px">
              <span>🏷️</span>
              <span>${escapeHtml(b.offer)}</span>
            </div>
          ` : ''}

          <!-- ACTIONS BAR: 💬 100% IN-APP CHAT DIRECTLY -->
          <div style="margin-top:2px">
            <button onclick="openBusinessChat('${escapeHtml(b.id)}')"
              style="width:100%;background:linear-gradient(135deg, #059669 0%, #047857 100%);color:#FFFFFF;border:none;padding:10px 14px;border-radius:12px;font-size:13px;font-weight:800;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;box-shadow:0 2px 8px rgba(5,150,105,0.25)">
              <span>💬</span>
              <span>ചാറ്റ്</span>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }
  window.renderBusinessScreen = renderBusinessScreen;

  function sendQuickReply(text) {
    const input = document.getElementById('chatInputMessage');
    if (input) {
      input.value = text;
      input.focus();
    }
  }
  window.sendQuickReply = sendQuickReply;

  function clearCurrentChat() {
    if (!APP_STATE.activeChatRecipient) return;
    if (!confirm('ഈ ചാറ്റ് സംഭാഷണം പൂർണ്ണമായി ക്ലിയർ ചെയ്യണമെന്ന് ഉറപ്പാണോ?')) return;

    const chatKey = APP_STATE.activeChatRecipient.key;
    delete APP_STATE.chats[chatKey];
    if (APP_STATE.chatMeta) delete APP_STATE.chatMeta[chatKey];
    saveChats();
    renderChatMessages();
    renderChatListScreen();
    toast('🗑️ ചാറ്റ് ക്ലിയർ ചെയ്തു.');
  }
  window.clearCurrentChat = clearCurrentChat;

  // Safe High-Level Chat Starters (Prevents inline string quote syntax breaks)
  function openChatForPost(postId) {
    const post = (APP_STATE.posts || []).find(p => p.id === postId);
    if (!post) return;
    const myId = APP_STATE.currentUser.id;
    const myPhone = (APP_STATE.currentUser.phone ? APP_STATE.currentUser.phone.replace(/\D/g, '') : '');
    const pPhone = (post.authorPhone ? post.authorPhone.replace(/\D/g, '') : '');
    if ((myId && post.authorId === myId) || (myPhone && pPhone && myPhone === pPhone)) {
      toast('ℹ️ ഇത് നിങ്ങളുടെ സ്വന്തം പോസ്റ്റ് ആണ്.');
      return;
    }
    const snippet = (post.content || '').substring(0, 35);
    openChatModal(post.authorName, post.authorPhone, post.authorAvatar, `പോസ്റ്റ്: "${snippet}..."`, post.authorId, null, 'post');
  }
  window.openChatForPost = openChatForPost;

  function openChatForService(srvId) {
    const srv = (APP_STATE.services || []).find(s => s.id === srvId);
    if (!srv) return;
    const myPhone = (APP_STATE.currentUser.phone ? APP_STATE.currentUser.phone.replace(/\D/g, '') : '');
    const sPhone = (srv.phone ? srv.phone.replace(/\D/g, '') : '');
    if (myPhone && sPhone && myPhone === sPhone) {
      toast('ℹ️ ഇത് നിങ്ങളുടെ സർവീസ് ലിസ്റ്റിംഗ് ആണ്.');
      return;
    }
    openChatModal(srv.name, srv.phone, srv.avatar, `സേവന അന്വേഷണം: ${srv.trade} (${srv.location})`, srv.id, null, 'service');
  }
  window.openChatForService = openChatForService;

  function openChatForJob(jobId) {
    const j = (APP_STATE.jobs || []).find(item => item.id === jobId);
    if (!j) return;
    const avatar = getRegisteredUserAvatar(j.employerPhone || j.employer, DEFAULT_USER_AVATAR);
    openChatModal(j.employer, j.employerPhone, avatar, `തൊഴിൽ അന്വേഷണം: ${j.title} (${j.salary})`, j.id, null, 'job');
  }
  window.openChatForJob = openChatForJob;

  function openChatForRental(rentId) {
    const r = (APP_STATE.rentals || []).find(item => item.id === rentId);
    if (!r) return;
    const isSale = r.listingType === 'sale' || (r.type && r.type.includes('വിൽപന')) || (r.title && r.title.includes('വിൽപന'));
    const topic = isSale ? `വിൽപന അന്വേഷണം: ${r.title} (${r.rate || r.price})` : `വാടക അന്വേഷണം: ${r.title} (${r.rate || r.price})`;
    const avatar = r.image || getRegisteredUserAvatar(r.ownerPhone, DEFAULT_USER_AVATAR);
    openChatModal(r.owner, r.ownerPhone, avatar, topic, r.id, null, isSale ? 'buysell' : 'rental');
  }
  window.openChatForRental = openChatForRental;

  function openChatForDonor(name, phone, group) {
    const avatar = getRegisteredUserAvatar(phone || name, DEFAULT_USER_AVATAR);
    openChatModal(name, phone, avatar, `രക്തദാന അന്വേഷണം: ${group}`, 'donor_' + (phone ? phone.replace(/\D/g, '') : name), null, 'blood');
  }
  window.openChatForDonor = openChatForDonor;

  function openChatForAmbulance(name, phone) {
    const avatar = getRegisteredUserAvatar(phone || name, DEFAULT_USER_AVATAR);
    openChatModal(name, phone, avatar, `അടിയന്തിര ആംബുലൻസ് ആവശ്യം`, 'amb_' + (phone ? phone.replace(/\D/g, '') : name), null, 'ambulance');
  }
  window.openChatForAmbulance = openChatForAmbulance;

  function syncUserChatsLive() {
    toast('🔄 പുതിയ സന്ദേശങ്ങൾ Supabase ക്ലൗഡിൽ നിന്ന് പരിശോധിക്കുന്നു...');
    if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.syncUserChats === 'function') {
      window.NN_SUPABASE_SERVICES.syncUserChats().then(() => {
        renderChatListScreen();
        toast('✅ സന്ദേശങ്ങൾ പുതുക്കി!');
      }).catch(() => {
        renderChatListScreen();
      });
    } else {
      renderChatListScreen();
    }
  }
  window.syncUserChatsLive = syncUserChatsLive;

  let activeNewChatFilter = 'all';

  function openNewChatModal() {
    activeNewChatFilter = 'all';
    const sInput = document.getElementById('newChatSearchInput');
    if (sInput) sInput.value = '';
    document.querySelectorAll('.new-chat-filter-chip').forEach(c => {
      c.classList.toggle('active', c.getAttribute('onclick') && c.getAttribute('onclick').includes("'all'"));
    });
    renderNewChatContacts('all');
    openModal('modal-new-chat');
  }
  window.openNewChatModal = openNewChatModal;

  function filterNewChatCategory(cat, btn) {
    activeNewChatFilter = cat;
    document.querySelectorAll('.new-chat-filter-chip').forEach(c => c.classList.remove('active'));
    if (btn) btn.classList.add('active');
    const searchVal = document.getElementById('newChatSearchInput') ? document.getElementById('newChatSearchInput').value : '';
    renderNewChatContacts(cat, searchVal);
  }
  window.filterNewChatCategory = filterNewChatCategory;

  let _cachedCommunityContacts = null;
  let _lastCommunityContactsTime = 0;

  function getAllCommunityContacts(filterCategory) {
    const now = Date.now();
    if (_cachedCommunityContacts && (now - _lastCommunityContactsTime < 15000)) {
      if (filterCategory && filterCategory !== 'all') {
        return _cachedCommunityContacts.filter(item => item.type === filterCategory);
      }
      return _cachedCommunityContacts;
    }

    const list = [];
    const seen = new Set();
    const myPhone = normalizePhone(APP_STATE.currentUser?.phone);
    const myId = APP_STATE.currentUser?.id;

    // 0. Registered Citizens from Cloud Profiles (Top 35)
    (APP_STATE.cloudProfiles || []).slice(0, 35).forEach(cp => {
      const cpPhone = normalizePhone(cp.phone);
      const cpKey = cpPhone || cp.id;
      if (cpKey && cpKey !== myPhone && cpKey !== myId && !seen.has(cpKey)) {
        seen.add(cpKey);
        const resolvedAvatar = getRegisteredUserAvatar(cp.phone || cp.id, cp.avatar);
        list.push({
          type: cp.isDonor ? 'donor' : 'citizen',
          id: cp.id || ('usr_' + cpPhone),
          name: cp.name || 'നാട്ടുകാരൻ',
          phone: cp.phone || '',
          avatar: resolvedAvatar,
          sub: cp.isDonor ? `🩸 ${cp.bloodGroup || 'O+'} രക്തദാതാവ് • 📍 ${cp.location || 'കേരളം'}` : `👥 രജിസ്റ്റർ ചെയ്ത നാട്ടുകാരൻ • 📍 ${cp.location || 'കേരളം'}`
        });
      }
    });

    // 1. Community Post Authors (Top 25)
    (APP_STATE.posts || []).slice(0, 25).forEach(p => {
      const pPhone = normalizePhone(p.authorPhone);
      const pKey = pPhone || p.authorId || p.authorName;
      if (pKey && pKey !== myPhone && pKey !== myId && !seen.has(pKey)) {
        seen.add(pKey);
        const resolvedAvatar = getRegisteredUserAvatar(p.authorPhone || p.authorId, p.authorAvatar);
        list.push({
          type: 'citizen',
          id: p.authorId || ('usr_' + (pPhone || p.authorName)),
          name: p.authorName || 'നാട്ടുകാരൻ',
          phone: p.authorPhone || '',
          avatar: resolvedAvatar,
          sub: `📢 കമ്മ്യൂണിറ്റി പോസ്റ്റ് • 📍 ${p.authorLocation || 'കേരളം'}`
        });
      }
    });

    // 2. Service Providers (Top 25)
    (APP_STATE.services || []).slice(0, 25).forEach(s => {
      const sPhone = normalizePhone(s.phone);
      const sKey = sPhone || s.id;
      if (sKey && sKey !== myPhone && sKey !== myId && !seen.has(sKey)) {
        seen.add(sKey);
        const resolvedAvatar = getRegisteredUserAvatar(s.phone || s.userId || s.id, s.avatar);
        list.push({
          type: 'service',
          id: s.id,
          name: s.name,
          phone: s.phone || '',
          avatar: resolvedAvatar,
          sub: `🛠️ ${s.trade} • 📍 ${resolveItemLocation(s) || 'തത്സമയ ലൊക്കേഷൻ'}`
        });
      }
    });

    // 3. Blood Donors (Top 25)
    (APP_STATE.bloodDonors || []).slice(0, 25).forEach(d => {
      const dPhone = normalizePhone(d.phone);
      const dKey = dPhone || d.name;
      if (dKey && dKey !== myPhone && !seen.has(dKey)) {
        seen.add(dKey);
        const resolvedAvatar = getRegisteredUserAvatar(d.phone || d.name);
        list.push({
          type: 'donor',
          id: 'donor_' + (dPhone || d.name),
          name: d.name,
          phone: d.phone || '',
          avatar: resolvedAvatar,
          sub: `🩸 ${d.group || 'O+'} രക്തദാതാവ് • 📍 ${resolveItemLocation(d) || 'തത്സമയ ലൊക്കേഷൻ'}`
        });
      }
    });

    // 4. Job Employers (Top 15)
    (APP_STATE.jobs || []).slice(0, 15).forEach(j => {
      const jPhone = normalizePhone(j.employerPhone);
      const jKey = jPhone || j.employer;
      if (jKey && jKey !== myPhone && !seen.has(jKey)) {
        seen.add(jKey);
        const resolvedAvatar = getRegisteredUserAvatar(j.employerPhone || j.employer);
        list.push({
          type: 'citizen',
          id: j.id,
          name: j.employer || 'തൊഴിൽ ദാതാവ്',
          phone: j.employerPhone || '',
          avatar: resolvedAvatar,
          sub: `💼 ${j.title} • 📍 ${resolveItemLocation(j) || 'തത്സമയ ലൊക്കേഷൻ'}`
        });
      }
    });

    // 5. Rentals Owners (Top 15)
    (APP_STATE.rentals || []).slice(0, 15).forEach(r => {
      const rPhone = normalizePhone(r.ownerPhone);
      const rKey = rPhone || r.owner;
      if (rKey && rKey !== myPhone && !seen.has(rKey)) {
        seen.add(rKey);
        const resolvedAvatar = r.image || getRegisteredUserAvatar(r.ownerPhone || r.owner);
        list.push({
          type: 'citizen',
          id: r.id,
          name: r.owner || 'കെട്ടിട ഉടമ',
          phone: r.ownerPhone || '',
          avatar: resolvedAvatar,
          sub: `🏠 ${r.title} • 📍 ${resolveItemLocation(r) || 'തത്സമയ ലൊക്കേഷൻ'}`
        });
      }
    });

    // 6. Local Businesses & Shops (Top 15)
    (APP_STATE.businesses || []).slice(0, 15).forEach(b => {
      const bPhone = normalizePhone(b.phone);
      const bKey = bPhone || b.id;
      if (bKey && bKey !== myPhone && !seen.has(bKey)) {
        seen.add(bKey);
        list.push({
          type: 'business',
          id: b.id,
          name: b.name,
          phone: b.phone || '',
          avatar: 'assets/cat-business-3d.jpg',
          sub: `🏪 ${b.categoryName} • 📍 ${b.location || 'തത്സമയ ലൊക്കേഷൻ'}`
        });
      }
    });

    _cachedCommunityContacts = list;
    _lastCommunityContactsTime = now;

    if (filterCategory && filterCategory !== 'all') {
      return list.filter(item => item.type === filterCategory);
    }
    return list;
  }
  window.getAllCommunityContacts = getAllCommunityContacts;

  function renderNewChatContacts(filter, query) {
    const list = document.getElementById('newChatContactsList');
    if (!list) return;

    const all = getAllCommunityContacts(filter || activeNewChatFilter || 'all');
    const q = (query !== undefined ? query : (document.getElementById('newChatSearchInput') ? document.getElementById('newChatSearchInput').value : '')).trim().toLowerCase();

    const filtered = q ? all.filter(c => c.name.toLowerCase().includes(q) || (c.phone && c.phone.includes(q)) || (c.sub && c.sub.toLowerCase().includes(q))) : all;

    if (filtered.length === 0) {
      list.innerHTML = `
        <div style="text-align:center;padding:24px 16px;background:#F8FAFC;border-radius:14px;border:1px solid #E2E8F0">
          <div style="font-size:24px;margin-bottom:6px">🔍</div>
          <div style="font-size:12.5px;font-weight:700;color:#475569">ആരെയും കണ്ടെത്താനായില്ല</div>
          <div style="font-size:11px;color:#94A3B8;margin-top:2px">മുകളിൽ നേരിട്ട് പേരോ ഫോൺ നമ്പറോ നൽകി ചാറ്റ് തുടങ്ങാം.</div>
        </div>
      `;
      return;
    }

    list.innerHTML = filtered.slice(0, 30).map(c => `
      <div onclick="closeModal('modal-new-chat'); openChatModal('${escapeHtml(c.name).replace(/'/g, "\\'")}', '${c.phone}', '${c.avatar}', 'ഹലോ ${escapeHtml(c.name).replace(/'/g, "\\'")}', '${c.id}')"
           style="display:flex;align-items:center;gap:12px;padding:10px 12px;background:#fff;border:1px solid #E2E8F0;border-radius:12px;cursor:pointer;transition:all 0.15s;box-shadow:0 1px 2px rgba(0,0,0,0.02)">
        <img src="${c.avatar}" style="width:40px;height:40px;border-radius:50%;object-fit:cover;border:1.5px solid #CBD5E1;flex-shrink:0" onerror="this.src=window.DEFAULT_USER_AVATAR||''">
        <div style="flex:1;min-width:0">
          <div style="font-size:13.5px;font-weight:800;color:#0F172A;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(c.name)}</div>
          <div style="font-size:11.5px;color:#64748B;margin-top:1px">${escapeHtml(c.sub)}</div>
        </div>
        <button style="background:#ECFDF5;border:1px solid #A7F3D0;color:#065F46;border-radius:10px;padding:6px 12px;font-size:12px;font-weight:800;cursor:pointer;flex-shrink:0">
          💬 ചാറ്റ്
        </button>
      </div>
    `).join('');
  }
  window.renderNewChatContacts = renderNewChatContacts;

  function startDirectChatFromForm(e) {
    if (e && e.preventDefault) e.preventDefault();
    const queryInput = document.getElementById('newChatSearchInput');
    const rawVal = (queryInput ? queryInput.value : '').trim();
    if (!rawVal) {
      toast('⚠️ ദയവായി പേരോ ഫോൺ നമ്പറോ നൽകുക.');
      return;
    }

    // 1. If 10-digit phone number
    const cleanDigits = rawVal.replace(/\D/g, '');
    if (cleanDigits.length >= 10) {
      const cleanPhone = cleanDigits.slice(-10);
      const myPhone = normalizePhone(APP_STATE.currentUser.phone);
      if (myPhone && cleanPhone === myPhone) {
        toast('ℹ️ ഇത് നിങ്ങളുടെ സ്വന്തം നമ്പറാണ്.');
        return;
      }
      closeModal('modal-new-chat');
      openChatModal(`സുഹൃത്ത് (${cleanPhone})`, cleanPhone, DEFAULT_USER_AVATAR, '', 'usr_' + cleanPhone);
      return;
    }

    // 2. Search by Name
    const allContacts = getAllCommunityContacts('all');
    const matched = allContacts.find(c => c.name.toLowerCase().includes(rawVal.toLowerCase()));
    if (matched) {
      closeModal('modal-new-chat');
      openChatModal(matched.name, matched.phone, matched.avatar, '', matched.id);
      return;
    }

    // 3. Open chat directly with this person's name or email identifier
    closeModal('modal-new-chat');
    const deterministicId = rawVal.includes('@')
      ? ('usr_em_' + rawVal.toLowerCase().replace(/[^a-z0-9]/g, '_'))
      : ('usr_contact_' + rawVal.toLowerCase().replace(/[^a-z0-9]/g, '_'));
    openChatModal(rawVal, '', DEFAULT_USER_AVATAR, '', deterministicId);
  }
  window.startDirectChatFromForm = startDirectChatFromForm;

  let activeChatCategoryFilter = 'all';
  let activeChatSearchQuery = '';

  function filterChatCategory(cat, btn) {
    activeChatCategoryFilter = cat;
    document.querySelectorAll('.chat-filter-chip').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderChatListScreen();
  }
  window.filterChatCategory = filterChatCategory;

  function filterChatList(q) {
    activeChatSearchQuery = (q || '').toLowerCase().trim();
    renderChatListScreen();
  }
  window.filterChatList = filterChatList;

  // STRICT PRIVACY FILTER: Verify if a chat thread strictly belongs to the currently logged in user / account
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
    const keyPhones = String(k).match(/\d{10}/g) || [];

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
  }
  window.isThreadBelongingToCurrentUser = isThreadBelongingToCurrentUser;

  function renderChatListScreen() {
    const container = document.getElementById('chatThreadsList');
    if (!container) return;

    if (typeof reconcileChatThreads === 'function') {
      reconcileChatThreads();
    }

    // Gather all chat keys with active messages that STRICTLY belong to currentUser
    const allKeys = Array.from(new Set([
      ...Object.keys(APP_STATE.chats || {}),
      ...Object.keys(APP_STATE.chatMeta || {})
    ])).filter(k => {
      if (!isThreadBelongingToCurrentUser(k)) return false;
      const msgs = ((APP_STATE.chats && APP_STATE.chats[k]) || []).filter(m => m && m.text && m.text !== '[deleted]');
      return msgs.length > 0;
    });

    // Sort active threads by latest message / timestamp descending
    const getThreadLatestTimestamp = (k) => {
      const msgs = (APP_STATE.chats && APP_STATE.chats[k]) || [];
      let latestT = 0;
      for (let i = 0; i < msgs.length; i++) {
        const t = Number(msgs[i].timestamp) || 0;
        if (t > latestT) latestT = t;
      }
      return latestT || ((APP_STATE.chatMeta && APP_STATE.chatMeta[k]?.updatedAt) || 0);
    };

    allKeys.sort((a, b) => getThreadLatestTimestamp(b) - getThreadLatestTimestamp(a));

    // Apply category & search filtering for active threads
    const filteredKeys = allKeys.filter(k => {
      const meta = (APP_STATE.chatMeta && APP_STATE.chatMeta[k]) || {};
      const thread = (APP_STATE.chats && APP_STATE.chats[k]) || [];
      const name = (meta.name || k.replace('chat_', '')).toLowerCase();
      const cat = (meta.type || meta.category || '').toLowerCase();
      const lastMsg = thread.length ? (thread[thread.length - 1].text || '').toLowerCase() : '';

      if (activeChatCategoryFilter !== 'all') {
        if (activeChatCategoryFilter === 'service' && !cat.includes('സേവന') && !cat.includes('service') && !cat.includes('അന്വേഷണം')) return false;
        if (activeChatCategoryFilter === 'blood' && !cat.includes('രക്ത') && !cat.includes('blood') && !cat.includes('donor')) return false;
        if (activeChatCategoryFilter === 'rental' && !cat.includes('വാടക') && !cat.includes('rent')) return false;
        if (activeChatCategoryFilter === 'job' && !cat.includes('തൊഴിൽ') && !cat.includes('job') && !cat.includes('ജോലി')) return false;
        if (activeChatCategoryFilter === 'other' && (cat.includes('സേവന') || cat.includes('രക്ത') || cat.includes('വാടക') || cat.includes('തൊഴിൽ'))) return false;
      }

      if (activeChatSearchQuery) {
        if (!name.includes(activeChatSearchQuery) && !lastMsg.includes(activeChatSearchQuery) && !cat.includes(activeChatSearchQuery)) {
          return false;
        }
      }
      return true;
    });

    let html = `
      <div style="display:flex;gap:8px;margin-bottom:6px">
        <button onclick="openNewChatModal()" style="flex:1;display:flex;align-items:center;justify-content:center;gap:8px;padding:12px 16px;background:linear-gradient(135deg, #0E7043, #059669);color:#fff;border:none;border-radius:14px;font-size:14px;font-weight:800;cursor:pointer;box-shadow:0 3px 10px rgba(14,112,67,0.22);transition:transform 0.1s">
          <span>➕</span>
          <span>പുതിയ സന്ദേശം അയക്കാം (New Chat)</span>
        </button>
      </div>
    `;

    // 1. IF SEARCH QUERY IS ACTIVE
    if (activeChatSearchQuery) {
      const q = activeChatSearchQuery.toLowerCase();
      const allCommunity = typeof getAllCommunityContacts === 'function' ? getAllCommunityContacts('all') : [];
      const matchedCommunity = allCommunity.filter(c => {
        return (c.name && c.name.toLowerCase().includes(q)) ||
               (c.phone && c.phone.includes(q)) ||
               (c.sub && c.sub.toLowerCase().includes(q));
      });

      // Render matching active threads first
      if (filteredKeys.length > 0) {
        html += `<div style="font-size:12px;font-weight:800;color:#64748B;margin:8px 0 4px">💬 മുൻ സംഭാഷണങ്ങൾ (${filteredKeys.length})</div>`;
        html += filteredKeys.map(k => renderChatThreadCard(k)).join('');
      }

      // Render matching community contacts with direct chat button
      if (matchedCommunity.length > 0) {
        html += `
          <div style="font-size:12.5px;font-weight:800;color:#0F172A;margin:12px 0 6px;display:flex;align-items:center;gap:6px">
            <span>👥 നാട്ടുകാരും സർവീസുകളും</span>
            <span style="background:#E2E8F0;color:#334155;padding:1px 8px;border-radius:10px;font-size:11px">${matchedCommunity.length}</span>
          </div>
        `;
        html += matchedCommunity.slice(0, 15).map(c => `
          <div onclick="openChatModal('${escapeHtml(c.name).replace(/'/g, "\\'")}', '${c.phone || ''}', '', '', '${c.id}')"
               style="display:flex;align-items:center;gap:12px;padding:11px 14px;background:#fff;border-radius:14px;border:1px solid #E2E8F0;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,0.02)">
            <div style="position:relative;flex-shrink:0">
              <img src="${c.avatar || DEFAULT_USER_AVATAR}" style="width:44px;height:44px;border-radius:50%;object-fit:cover;border:1.5px solid #E2E8F0" onerror="this.src=window.DEFAULT_USER_AVATAR||''">
              <span style="position:absolute;bottom:0;right:0;width:11px;height:11px;border-radius:50%;background:#10B981;border:2px solid #fff"></span>
            </div>
            <div style="flex:1;min-width:0">
              <div style="font-weight:800;font-size:14px;color:#0F172A;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(c.name)}</div>
              <div style="font-size:11.5px;color:#64748B;margin-top:2px">${escapeHtml(c.sub || '')}</div>
            </div>
            <button style="background:#ECFDF5;border:1px solid #A7F3D0;color:#065F46;border-radius:10px;padding:6px 12px;font-size:12px;font-weight:800;cursor:pointer;flex-shrink:0">
              💬 ചാറ്റ്
            </button>
          </div>
        `).join('');
      }

      // Direct message action for the typed query
      const cleanDigits = activeChatSearchQuery.replace(/\D/g, '');
      const directTargetName = cleanDigits.length >= 10 ? 'പ്രാദേശിക സുഹൃത്ത്' : activeChatSearchQuery;
      const directId = directPhone ? ('usr_' + directPhone) : ('usr_query_' + String(directTargetName).toLowerCase().replace(/[^a-z0-9]/g, '_'));
      html += `
        <div onclick="openChatModal('${escapeHtml(directTargetName).replace(/'/g, "\\'")}', '${directPhone}', '', '', '${directId}')"
             style="display:flex;align-items:center;gap:10px;padding:12px 14px;background:#F0FDF4;border:1.5px dashed #86EFAC;border-radius:14px;cursor:pointer;margin-top:10px">
          <span style="font-size:22px">✉️</span>
          <div style="flex:1">
            <div style="font-size:13px;font-weight:800;color:#166534">"${escapeHtml(activeChatSearchQuery)}" എന്ന പേരിലേക്ക് / നമ്പറിലേക്ക് സന്ദേശം അയക്കാം</div>
            <div style="font-size:11px;color:#15803D;margin-top:2px">നേരിട്ട് ചാറ്റ് വിൻഡോ തുറക്കാൻ ഇവിടെ ക്ലിക്ക് ചെയ്യുക ➔</div>
          </div>
        </div>
      `;
      container.innerHTML = html;
      return;
    }

    // 2. IF NO PAST CONVERSATIONS EXIST
    if (allKeys.length === 0) {
      const allCommunity = typeof getAllCommunityContacts === 'function' ? getAllCommunityContacts('all') : [];
      html += `
        <div style="background:#F0FDF4;border:1.5px dashed #86EFAC;border-radius:14px;padding:12px 14px;display:flex;align-items:center;gap:10px;margin-bottom:8px">
          <span style="font-size:24px">⚡</span>
          <div style="font-size:12.5px;color:#166534;font-weight:700">താഴെ കാണുന്നവരിൽ ആർക്കും ഇപ്പോൾ നേരിട്ട് സന്ദേശം അയക്കാം (ഒരു സെക്കൻഡിൽ അപ്‌ഡേറ്റ്):</div>
        </div>
        <div style="font-size:13px;font-weight:800;color:#0F172A;margin:6px 0 8px">⚡ സന്ദേശം അയക്കാൻ ലഭ്യമായവർ (Available to Chat)</div>
      `;

      if (allCommunity.length > 0) {
        html += allCommunity.slice(0, 12).map(c => `
          <div onclick="openChatModal('${escapeHtml(c.name).replace(/'/g, "\\'")}', '${c.phone || ''}', '', '', '${c.id}')"
               style="display:flex;align-items:center;gap:12px;padding:11px 14px;background:#fff;border-radius:14px;border:1px solid #E2E8F0;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,0.02);transition:all 0.15s">
            <div style="position:relative;flex-shrink:0">
              <img src="${c.avatar || DEFAULT_USER_AVATAR}" style="width:44px;height:44px;border-radius:50%;object-fit:cover;border:1.5px solid #CBD5E1" onerror="this.src=window.DEFAULT_USER_AVATAR||''">
              <span style="position:absolute;bottom:0;right:0;width:11px;height:11px;border-radius:50%;background:#10B981;border:2px solid #fff"></span>
            </div>
            <div style="flex:1;min-width:0">
              <div style="font-weight:800;font-size:14px;color:#0F172A;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(c.name)}</div>
              <div style="font-size:11.5px;color:#64748B;margin-top:2px">${escapeHtml(c.sub || '')}</div>
            </div>
            <button style="background:#ECFDF5;border:1px solid #A7F3D0;color:#065F46;border-radius:10px;padding:7px 14px;font-size:12px;font-weight:800;cursor:pointer;flex-shrink:0">
              💬 ചാറ്റ്
            </button>
          </div>
        `).join('');
      }
      container.innerHTML = html;
      return;
    }

    // 3. IF CONVERSATIONS EXIST
    if (filteredKeys.length === 0) {
      html += `
        <div style="text-align:center;padding:32px 16px;background:#fff;border-radius:16px;border:1px solid #E2E8F0;color:#64748B;font-size:13px">
          ഈ ഫിൽട്ടറിൽ സന്ദേശങ്ങളൊന്നും കണ്ടെത്തിയില്ല.
        </div>
      `;
    } else {
      html += filteredKeys.map(k => renderChatThreadCard(k)).join('');
    }

    // Quick contacts below active threads so user can always chat with new people
    const allCommunity = typeof getAllCommunityContacts === 'function' ? getAllCommunityContacts('all') : [];
    if (allCommunity.length > 0) {
      html += `
        <div style="margin-top:16px;padding-top:12px;border-top:1px solid #E2E8F0">
          <div style="font-size:13px;font-weight:800;color:#0F172A;margin-bottom:8px">⚡ കൂടുതൽ ആളുകളുമായി ചാറ്റ് ചെയ്യാം</div>
          ${allCommunity.slice(0, 6).map(c => `
            <div onclick="openChatModal('${escapeHtml(c.name).replace(/'/g, "\\'")}', '${c.phone || ''}', '', '', '${c.id}')"
                 style="display:flex;align-items:center;gap:12px;padding:10px 12px;background:#fff;border-radius:12px;border:1px solid #E2E8F0;cursor:pointer;margin-bottom:6px">
              <img src="${c.avatar || DEFAULT_USER_AVATAR}" style="width:38px;height:38px;border-radius:50%;object-fit:cover;border:1.5px solid #CBD5E1" onerror="this.src=window.DEFAULT_USER_AVATAR||''">
              <div style="flex:1;min-width:0">
                <div style="font-weight:800;font-size:13.5px;color:#0F172A;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(c.name)}</div>
                <div style="font-size:11px;color:#64748B">${escapeHtml(c.sub || '')}</div>
              </div>
              <button style="background:#ECFDF5;border:1px solid #A7F3D0;color:#065F46;border-radius:8px;padding:5px 10px;font-size:11.5px;font-weight:800;cursor:pointer">
                💬 ചാറ്റ്
              </button>
            </div>
          `).join('')}
        </div>
      `;
    }
    container.innerHTML = html;
  }
  window.renderChatListScreen = renderChatListScreen;

  function renderChatThreadCard(k) {
    const thread = (APP_STATE.chats && APP_STATE.chats[k]) || [];
    const meta = (APP_STATE.chatMeta && APP_STATE.chatMeta[k]) || {
      name: k.replace('chat_', ''),
      phone: '',
      avatar: DEFAULT_USER_AVATAR
    };
    const lastMsg = thread[thread.length - 1] || { text: 'സംഭാഷണം ആരംഭിച്ചു...', time: 'ഇപ്പോൾ' };

    let badgeLabel = '💬 ചാറ്റ്';
    let badgeBg = '#F3F4F6';
    let badgeColor = '#4B5563';
    const catText = (meta.category || meta.type || '').toLowerCase();
    if (catText.includes('സേവന') || catText.includes('service') || (meta.recipientId && meta.recipientId.startsWith('srv_'))) {
      badgeLabel = '🛠️ സർവീസ്';
      badgeBg = '#ECFDF5';
      badgeColor = '#059669';
    } else if (catText.includes('രക്ത') || catText.includes('blood') || (meta.recipientId && meta.recipientId.startsWith('donor_'))) {
      badgeLabel = '🩸 രക്തദാനം';
      badgeBg = '#FEF2F2';
      badgeColor = '#DC2626';
    } else if (catText.includes('വാടക') || catText.includes('rent') || (meta.recipientId && meta.recipientId.startsWith('rent_'))) {
      badgeLabel = '🏠 വാടക';
      badgeBg = '#FFFBEB';
      badgeColor = '#D97706';
    } else if (catText.includes('തൊഴിൽ') || catText.includes('job') || (meta.recipientId && meta.recipientId.startsWith('job_'))) {
      badgeLabel = '💼 തൊഴിൽ';
      badgeBg = '#EFF6FF';
      badgeColor = '#2563EB';
    } else if (catText.includes('പോസ്റ്റ്') || (meta.recipientId && meta.recipientId.startsWith('post_'))) {
      badgeLabel = '📢 പോസ്റ്റ്';
      badgeBg = '#F5F3FF';
      badgeColor = '#7C3AED';
    } else {
      badgeLabel = '👥 നാട്ടുകാരൻ';
      badgeBg = '#F1F5F9';
      badgeColor = '#475569';
    }

    return `
      <div onclick="openChatModalByKey('${k}')"
           style="display:flex;align-items:center;gap:12px;padding:12px 15px;background:#fff;border-radius:20px;border:1px solid #E2E8F0;cursor:pointer;box-shadow:0 1px 4px rgba(0,0,0,0.03);transition:all 0.15s ease;margin-bottom:8px">
        <div onclick="event.stopPropagation(); viewChatRecipientFullProfile('${k}')"
             title="മുഴുവൻ പ്രൊഫൈൽ പേജ് കാണാം"
             style="position:relative;flex-shrink:0;cursor:pointer">
          <img src="${getRegisteredUserAvatar(meta.phone || meta.recipientId || meta.name, meta.avatar)}" style="width:48px;height:48px;border-radius:50%;object-fit:cover;border:2px solid #E2E8F0" onerror="this.src=window.DEFAULT_USER_AVATAR||''">
          <span style="position:absolute;bottom:1px;right:1px;width:12px;height:12px;border-radius:50%;background:#10B981;border:2px solid #fff"></span>
        </div>
        <div style="flex:1;min-width:0">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2px">
            <span style="font-weight:800;font-size:14.5px;color:#0F172A;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(meta.name)}</span>
            <span style="font-size:11px;color:#64748B;font-weight:600;flex-shrink:0">${lastMsg.time}</span>
          </div>
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:2px">
            <span style="font-size:10px;font-weight:800;background:${badgeBg};color:${badgeColor};padding:2px 8px;border-radius:12px">${badgeLabel}</span>
            ${(meta.type === 'ambulance' || meta.category?.includes('ആംബുലൻസ്')) && meta.phone ? `<span style="font-size:11px;color:#94A3B8">📞 ${meta.phone}</span>` : ''}
          </div>
          <div style="font-size:12.5px;color:#64748B;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center">
            ${lastMsg.sender === 'me' ? (
              (lastMsg.status === 'seen' || lastMsg.seen === true)
                ? '<span style="color:#53BDEB;font-weight:900;margin-right:4px;letter-spacing:-1.5px;font-size:11px" title="കണ്ടു (Seen)">✓✓</span>'
                : '<span style="color:#8696A0;font-weight:900;margin-right:4px;letter-spacing:-1.5px;font-size:11px" title="എത്തി (Delivered)">✓✓</span>'
            ) : ''}
            <span style="overflow:hidden;text-overflow:ellipsis">${escapeHtml(lastMsg.text)}</span>
          </div>
        </div>
      </div>
    `;
  }

  // ==============================================================
  // 11. LOCAL SERVICES DIRECTORY (16+ CATEGORIES)
  // ==============================================================
  const SERVICE_CATEGORIES = [
    { id: 'all', name: 'എല്ലാം', icon: '🛠️' },
    { id: 'vehicles', name: 'വാഹനങ്ങൾ', icon: '🚗' },
    { id: 'electrician', name: 'ഇലക്ട്രീഷ്യൻ', icon: '⚡' },
    { id: 'plumber', name: 'പ്ലംബർ', icon: '🚰' },
    { id: 'acrepair', name: 'എസി & ഫ്രിഡ്ജ്', icon: '❄️' },
    { id: 'carpenter', name: 'ആശാരി', icon: '🪚' },
    { id: 'painter', name: 'പെയിന്റർ', icon: '🎨' },
    { id: 'cleaning', name: 'ക്ലീനിംഗ്', icon: '🧹' },
    { id: 'mason', name: 'മേസൺ & വാർപ്പ്', icon: '🧱' },
    { id: 'welding', name: 'വെൽഡിങ് & ഗ്രിൽ', icon: '🔥' },
    { id: 'gardening', name: 'കൃഷി & തോട്ടം', icon: '🌴' },
    { id: 'beautician', name: 'ബ്യൂട്ടീഷ്യൻ', icon: '💄' },
    { id: 'cctv', name: 'സിസിടിവി', icon: '📹' },
    { id: 'catering', name: 'കാറ്ററിംഗ്', icon: '🍲' },
    { id: 'tailoring', name: 'ടൈലറിംഗ്', icon: '🧵' },
    { id: 'nursing', name: 'ഹോം നഴ്സിംഗ്', icon: '🩺' },
    { id: 'tuition', name: 'ട്യൂഷൻ', icon: '📚' },
    { id: 'water', name: 'വാട്ടർ സപ്ലൈ', icon: '💧' },
    { id: 'mechanic', name: 'വർക്ക്‌ഷോപ്പ്', icon: '🔧' },
    { id: 'electronics', name: 'ടിവി & മെഷീൻ', icon: '📺' },
    { id: 'tiles', name: 'ടൈൽ & ഗ്രാനൈറ്റ്', icon: '📐' },
    { id: 'roofing', name: 'റൂഫിംഗ് ട്രസ്സ്', icon: '🏠' },
    { id: 'aluminium', name: 'അലുമിനിയം വർക്ക്', icon: '🪟' },
    { id: 'packers', name: 'പാക്കേഴ്സ് മൂവേഴ്സ്', icon: '📦' },
    { id: 'waste', name: 'സെപ്റ്റിക് ടാങ്ക്', icon: '🚛' },
    { id: 'thekku', name: 'തെങ്ങ് കയറ്റം', icon: '🥥' },
    { id: 'kinar', name: 'കിണർ പണി', icon: '🪣' },
    { id: 'solar', name: 'സോളാർ സിസ്റ്റം', icon: '☀️' },
    { id: 'photography', name: 'ഫോട്ടോഗ്രാഫി', icon: '📷' },
    { id: 'sound', name: 'സൗണ്ട് & ലൈറ്റ്', icon: '🔊' },
    { id: 'gas', name: 'ഗ്യാസ് സ്റ്റൗ', icon: '🍳' },
    { id: 'pestcontrol', name: 'പെസ്റ്റ് കൺട്രോൾ', icon: '🐜' }
  ];

  const VEHICLE_SUB_TYPES = [
    { id: 'all', name: 'മുഴുവൻ വാഹനങ്ങളും', icon: '🌟' },
    { id: 'auto', name: 'ഓട്ടോറിക്ഷ', icon: '🛺' },
    { id: 'taxi', name: 'ടാക്സി കാർ', icon: '🚕' },
    { id: 'traveller', name: 'ട്രാവലർ/വാൻ', icon: '🚐' },
    { id: 'bus', name: 'ടൂറിസ്റ്റ് ബസ്', icon: '🚌' },
    { id: 'pickup', name: 'പിക്കപ്പ് വാൻ', icon: '🛻' },
    { id: 'goodsauto', name: 'ഗുഡ്സ് ഓട്ടോ', icon: '🛺📦' },
    { id: 'jeep', name: 'ജീപ്പ് 4x4', icon: '🚙' },
    { id: 'lorry', name: 'ലോറി/ടിപ്പർ', icon: '🚛' },
    { id: 'jcb', name: 'JCB/ഹിറ്റാച്ചി', icon: '🚜' },
    { id: 'crane', name: 'ക്രെയിൻ/റിക്കവറി', icon: '🏗️' },
    { id: 'ambulance', name: 'ആംബുലൻസ്', icon: '🚑' }
  ];

  function renderServicesCategoriesGrid() {
    const grid = document.getElementById('servicesCategoryGrid');
    if (!grid) return;

    grid.innerHTML = SERVICE_CATEGORIES.map(cat => `
      <button class="cat-pill-btn ${APP_STATE.activeServiceCategory === cat.id ? 'active' : ''}" 
              onclick="filterServiceCategory('${cat.id}')">
        <span class="cat-pill-icon">${cat.icon}</span>
        <span class="cat-pill-title">${cat.name}</span>
      </button>
    `).join('');
  }

  function filterServiceCategory(catId) {
    if (catId === 'vehicles') {
      APP_STATE.activeServiceCategory = 'vehicles';
      APP_STATE.activeVehicleSubFilter = 'all';
    } else {
      APP_STATE.activeServiceCategory = catId;
    }
    renderServicesCategoriesGrid();
    renderServicesScreen();
    setTimeout(() => {
      const activePill = document.querySelector(`.cat-pill-btn[onclick*="${catId}"]`);
      if (activePill) activePill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }, 50);
  }
  window.filterServiceCategory = filterServiceCategory;

  function filterServiceAndOpen(catId) {
    const vehicleSubKeys = ['auto', 'taxi', 'traveller', 'bus', 'pickup', 'goodsauto', 'jeep', 'lorry', 'jcb', 'crane', 'ambulance', 'driver'];
    if (vehicleSubKeys.includes(catId)) {
      APP_STATE.activeServiceCategory = 'vehicles';
      APP_STATE.activeVehicleSubFilter = (catId === 'driver' ? 'all' : catId);
    } else {
      APP_STATE.activeServiceCategory = catId;
      if (catId === 'vehicles') {
        APP_STATE.activeVehicleSubFilter = 'all';
      }
    }
    const searchInput = document.getElementById('serviceSearchInput');
    if (searchInput) searchInput.value = '';
    navTo('services');
    setTimeout(() => {
      const activePill = document.querySelector(`.cat-pill-btn[onclick*="${APP_STATE.activeServiceCategory}"]`);
      if (activePill) activePill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }, 100);
  }
  window.filterServiceAndOpen = filterServiceAndOpen;

  function setVehicleSubFilter(subId) {
    APP_STATE.activeVehicleSubFilter = subId;
    renderServicesScreen();
  }
  window.setVehicleSubFilter = setVehicleSubFilter;

  function renderServicesScreen() {
    renderServicesCategoriesGrid();
    const container = document.getElementById('servicesListContainer');
    if (!container) return;

    const isVehicleSection = (APP_STATE.activeServiceCategory === 'vehicles');
    const activeSub = APP_STATE.activeVehicleSubFilter || 'all';

    // Toggle and render the vehicle sub-filter chip bar
    const subBar = document.getElementById('servicesVehicleSubFilterBar');
    if (subBar) {
      if (isVehicleSection) {
        subBar.style.display = 'flex';
        subBar.innerHTML = VEHICLE_SUB_TYPES.map(vt => {
          const isActive = (activeSub === vt.id);
          const style = isActive
            ? 'background:#059669;color:#fff;border:1px solid #059669;padding:6px 12px;border-radius:20px;font-size:11.5px;font-weight:800;white-space:nowrap;cursor:pointer;display:inline-flex;align-items:center;gap:4px;box-shadow:0 2px 6px rgba(5,150,105,0.25)'
            : 'background:#fff;color:#334155;border:1px solid #CBD5E1;padding:6px 12px;border-radius:20px;font-size:11.5px;font-weight:700;white-space:nowrap;cursor:pointer;display:inline-flex;align-items:center;gap:4px';
          return `<button type="button" onclick="setVehicleSubFilter('${vt.id}')" style="${style}"><span>${vt.icon}</span><span>${vt.name}</span></button>`;
        }).join('');
      } else {
        subBar.style.display = 'none';
      }
    }

    const searchInput = document.getElementById('serviceSearchInput');
    const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
    const maxRadius = APP_STATE.radiusFilters.services;

    const vehicleCats = ['vehicles', 'auto', 'taxi', 'traveller', 'bus', 'pickup', 'goodsauto', 'jeep', 'lorry', 'jcb', 'crane', 'ambulance', 'driver'];

    // Filter services by category and query
    let allMatching = APP_STATE.services.filter(srv => {
      const srvCat = srv.category || '';
      let matchesCategory = false;
      if (APP_STATE.activeServiceCategory === 'all') {
        matchesCategory = true;
      } else if (isVehicleSection) {
        const isVeh = vehicleCats.includes(srvCat) || (srv.trade && (
          srv.trade.includes('ഓട്ടോ') || srv.trade.includes('ടാക്സി') || srv.trade.includes('വാൻ') ||
          srv.trade.includes('ബസ്') || srv.trade.includes('ലോറി') || srv.trade.includes('പിക്കപ്പ്') ||
          srv.trade.includes('JCB') || srv.trade.includes('ക്രെയിൻ') || srv.trade.includes('ഡ്രൈവർ') ||
          srv.trade.includes('ആംബുലൻസ്') || srv.trade.includes('വാഹനം')
        )) || !!srv.vehicleDetails;

        if (!isVeh) {
          matchesCategory = false;
        } else if (activeSub === 'all') {
          matchesCategory = true;
        } else {
          const tradeLower = (srv.trade || '').toLowerCase();
          const specType = srv.vehicleDetails?.type;
          matchesCategory = (srvCat === activeSub) || (specType === activeSub) || (
            activeSub === 'auto' && (tradeLower.includes('ഓട്ടോ') || tradeLower.includes('auto'))
          ) || (
            activeSub === 'taxi' && (tradeLower.includes('ടാക്സി') || tradeLower.includes('taxi') || tradeLower.includes('കാർ'))
          ) || (
            activeSub === 'traveller' && (tradeLower.includes('ട്രാവലർ') || tradeLower.includes('വാൻ') || tradeLower.includes('traveller'))
          ) || (
            activeSub === 'bus' && (tradeLower.includes('ബസ്') || tradeLower.includes('bus'))
          ) || (
            activeSub === 'pickup' && (tradeLower.includes('പിക്കപ്പ്') || tradeLower.includes('pickup'))
          ) || (
            activeSub === 'goodsauto' && (tradeLower.includes('ഗുഡ്സ്') || tradeLower.includes('goods'))
          ) || (
            activeSub === 'jeep' && (tradeLower.includes('ജീപ്പ്') || tradeLower.includes('jeep'))
          ) || (
            activeSub === 'lorry' && (tradeLower.includes('ലോറി') || tradeLower.includes('ടിപ്പർ') || tradeLower.includes('lorry'))
          ) || (
            activeSub === 'jcb' && (tradeLower.includes('jcb') || tradeLower.includes('ജെസിബി') || tradeLower.includes('ഹിറ്റാച്ചി'))
          ) || (
            activeSub === 'crane' && (tradeLower.includes('ക്രെയിൻ') || tradeLower.includes('റിക്കവറി') || tradeLower.includes('crane'))
          ) || (
            activeSub === 'ambulance' && (tradeLower.includes('ആംബുലൻസ്') || tradeLower.includes('ambulance'))
          );
        }
      } else {
        matchesCategory = (srvCat === APP_STATE.activeServiceCategory);
      }
      const vDetailsStr = srv.vehicleDetails ? JSON.stringify(srv.vehicleDetails).toLowerCase() : '';
      const matchesQuery = !query || 
        srv.name.toLowerCase().includes(query) || 
        srv.trade.toLowerCase().includes(query) || 
        (srv.category && srv.category.toLowerCase().includes(query)) ||
        vDetailsStr.includes(query);
      const dist = getItemDistanceKm(srv, APP_STATE.location.lat, APP_STATE.location.lon);
      srv._calculatedDist = dist;
      return matchesCategory && matchesQuery;
    });

    allMatching.sort((a, b) => a._calculatedDist - b._calculatedDist);

    // Strict radius filter: only show services within maxRadius (unless user explicitly picked All Kerala >= 1000)
    let list = (maxRadius >= 1000) ? allMatching : allMatching.filter(srv => srv._calculatedDist <= maxRadius);

    if (list.length === 0) {
      const radiusLabel = (maxRadius >= 1000) ? '' : ` (${maxRadius} km)`;
      container.innerHTML = `
        <div style="text-align:center;padding:36px 16px;background:#fff;border-radius:18px;border:1px solid #E2E8F0">
          <div style="font-size:36px;margin-bottom:8px">📍</div>
          <h3 style="margin:0 0 6px;color:#111827;font-size:16px">ഈ പ്രദേശത്ത് സേവനങ്ങളൊന്നും കണ്ടെത്തിയില്ല</h3>
          <p style="font-size:13px;color:#64748B;margin:0 0 16px;line-height:1.5">
            <b>${escapeHtml(APP_STATE.location.name)}</b> പരിസരത്ത്${radiusLabel} ലഭ്യമായ സർവീസുകൾ കണ്ടെത്തിയില്ല.<br>പരിധി വർദ്ധിപ്പിക്കുകയോ പുതിയ സേവനം രജിസ്റ്റർ ചെയ്യുകയോ ചെയ്യാം.
          </p>
          <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
            <button onclick="setGlobalRadius(25, null)" style="padding:8px 14px;background:#ECFDF5;color:#0E7043;border:1px solid #A7F3D0;border-radius:10px;font-weight:700;font-size:12px;cursor:pointer">25 km പരിധി</button>
            <button onclick="setGlobalRadius(50, null)" style="padding:8px 14px;background:#ECFDF5;color:#0E7043;border:1px solid #A7F3D0;border-radius:10px;font-weight:700;font-size:12px;cursor:pointer">50 km പരിധി</button>
            <button onclick="setGlobalRadius(1000, null)" style="padding:8px 14px;background:#EFF6FF;color:#2563EB;border:1px solid #BFDBFE;border-radius:10px;font-weight:700;font-size:12px;cursor:pointer">മുഴുവൻ കാണുക</button>
            <button onclick="openAddServiceModal()" style="padding:8px 14px;background:#0E7043;color:#fff;border:none;border-radius:10px;font-weight:800;font-size:12px;cursor:pointer">➕ പുതിയ സേവനം രജിസ്റ്റർ ചെയ്യാം</button>
          </div>
        </div>
      `;
      return;
    }

    container.innerHTML = list.map(srv => {
      const isAvail = srv.availability !== 'busy';
      const availLabel = isAvail ? '🟢 ഇപ്പോൾ ലഭ്യമാണ്' : '🟡 ബുക്കിംഗ് അനുസരിച്ച്';
      const availClass = isAvail ? 'avail' : 'busy';

      return `
        <div class="service-card" onclick="openServiceDetailModal('${srv.id}')" style="cursor:pointer">
          <div class="service-card-top">
            <img src="${getRegisteredUserAvatar(srv.phone || srv.userId || srv.name, srv.avatar)}" alt="${srv.name}" class="service-prov-avatar" onerror="this.src=window.DEFAULT_USER_AVATAR||''">
            <div class="service-prov-meta">
              <div style="display:flex;justify-content:space-between;align-items:flex-start">
                <div class="service-prov-name">
                  <span>${srv.name}</span>
                  <span style="font-size:11px;background:#ECFDF5;color:#0E7043;padding:2px 8px;border-radius:8px;font-weight:700">★ ${srv.rating}</span>
                  ${srv.isCloud ? '<span style="font-size:9.5px;background:#ECFDF5;color:#059669;border:1px solid #A7F3D0;padding:1px 6px;border-radius:6px;font-weight:800;margin-left:4px" title="ഫയർബേസ് ക്ലൗഡിൽ തത്സമയം രജിസ്റ്റർ ചെയ്തത്">☁️ ലൈവ്</span>' : ''}
                </div>
                <span class="provider-live-pill ${availClass}">${availLabel}</span>
              </div>
              <div class="service-prov-trade" style="display:flex;align-items:center;gap:6px">
                <span class="service-mini-icon-badge">${srv.icon || '🛠️'}</span>
                <span>${srv.trade}</span>
              </div>
              <div class="service-prov-loc">
                <span>📍 ${resolveItemLocation(srv)}</span>
                <span>•</span>
                <span style="color:#0E7043;font-weight:800">${srv._calculatedDist} km അകലെ</span>
              </div>
            </div>
          </div>

          <!-- VEHICLE HIGHLIGHT BADGES -->
          ${srv.vehicleDetails ? `
            <div style="display:flex;flex-wrap:wrap;gap:5px;margin:4px 0">
              ${srv.vehicleDetails.stand ? `<span style="font-size:10px;background:#F1F5F9;color:#334155;padding:2px 8px;border-radius:6px;font-weight:700">🚏 സ്റ്റാൻഡ്: ${escapeHtml(srv.vehicleDetails.stand)}</span>` : ''}
              ${srv.vehicleDetails.model ? `<span style="font-size:10px;background:#EFF6FF;color:#1D4ED8;padding:2px 8px;border-radius:6px;font-weight:700">🚗 ${escapeHtml(srv.vehicleDetails.model)}</span>` : ''}
              ${srv.vehicleDetails.route ? `<span style="font-size:10px;background:#FDF2F8;color:#BE185D;padding:2px 8px;border-radius:6px;font-weight:700">🛣️ ${escapeHtml(srv.vehicleDetails.route)}</span>` : ''}
            </div>
          ` : ''}

          <div style="display:flex;flex-wrap:wrap;gap:6px;margin:2px 0">
            <span class="provider-fee-pill">💰 ${formatPrice(srv.visitingFee || '₹200 വിസിറ്റിംഗ് നിരക്ക്')}</span>
            ${(srv.specializations || []).slice(0, 3).map(sp => `<span class="provider-spec-tag">${sp}</span>`).join('')}
          </div>

          <div style="font-size:11.5px;color:#6B7280;display:flex;justify-content:space-between;border-top:1px dashed #E5E7EB;padding-top:8px">
            <span>🛠️ ${srv.experience}</span>
            <span style="color:#059669;font-weight:700">വിശദാംശങ്ങൾ & റേറ്റിംഗ് ➔</span>
          </div>

          <!-- DIRECT ACTION: IN-APP CHAT ONLY -->
          <div class="service-actions-row" onclick="event.stopPropagation()">
            <button class="prov-btn-chat" onclick="openChatForService('${srv.id}')" title="ചാറ്റ്" style="flex:1;justify-content:center">
              <span>💬</span>
              <span>ചാറ്റ്</span>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }
  window.renderServicesScreen = renderServicesScreen;

  // ==============================================================
  // SERVICE PROVIDER DETAILS & RATING SYSTEM
  // ==============================================================
  function openServiceDetailModal(srvId) {
    const srv = (APP_STATE.services || []).find(s => s.id === srvId);
    if (!srv) return;

    const sheet = document.getElementById('serviceDetailSheetContent');
    if (!sheet) return;

    const dist = getItemDistanceKm(srv, APP_STATE.location.lat, APP_STATE.location.lon);
    const isAvail = srv.availability !== 'busy';
    const availLabel = isAvail ? '🟢 ഇപ്പോൾ ലഭ്യമാണ് (Available Now)' : '🟡 ബുക്കിംഗ് അനുസരിച്ച് (Prior Booking)';
    const availClass = isAvail ? 'avail' : 'busy';

    sheet.innerHTML = `
      <div class="service-detail-hero">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <span style="font-size:0.75rem;background:rgba(255,255,255,0.2);padding:4px 10px;border-radius:20px;font-weight:700">🛠️ സർവീസ് പ്രൊഫൈൽ</span>
          <button onclick="closeModal('modal-service-detail')" style="background:rgba(255,255,255,0.25);border:none;color:#fff;width:32px;height:32px;border-radius:50%;font-size:16px;cursor:pointer">✕</button>
        </div>
        <div style="display:flex;align-items:center;gap:14px;margin-top:14px">
          <img src="${getRegisteredUserAvatar(srv.phone || srv.userId || srv.name, srv.avatar)}" alt="${srv.name}" style="width:68px;height:68px;border-radius:50%;border:3px solid #fff;object-fit:cover;box-shadow:0 4px 12px rgba(0,0,0,0.15)" onerror="this.src=window.DEFAULT_USER_AVATAR||''">
          <div>
            <h3 style="margin:0;font-size:1.25rem;font-weight:800">${srv.name}</h3>
            <div style="font-size:0.9rem;opacity:0.95;margin-top:2px;display:flex;align-items:center;gap:6px">
              <span style="background:rgba(255,255,255,0.25);padding:2px 8px;border-radius:8px;font-size:14px">${srv.icon || '🛠️'}</span>
              <span>${srv.trade}</span>
            </div>
            <div style="font-size:0.78rem;opacity:0.9;margin-top:3px">📍 ${resolveItemLocation(srv)} • <b style="color:#A7F3D0">${dist} km അകലെ</b></div>
          </div>
        </div>
      </div>

      <div style="padding:16px 20px;display:flex;flex-direction:column;gap:14px">
        <!-- KEY STATS ROW -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
          <div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:14px;padding:10px 12px">
            <div style="font-size:0.7rem;color:#64748B;font-weight:700">💰 വിസിറ്റിംഗ് നിരക്ക്</div>
            <div style="font-size:0.86rem;font-weight:800;color:#0F766E;margin-top:2px">${formatPrice(srv.visitingFee || '₹200 വിസിറ്റിംഗ് നിരക്ക്')}</div>
          </div>
          <div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:14px;padding:10px 12px">
            <div style="font-size:0.7rem;color:#64748B;font-weight:700">⏰ പ്രവൃത്തി സമയം</div>
            <div style="font-size:0.84rem;font-weight:800;color:#1E293B;margin-top:2px">${srv.workingHours || '8:00 AM - 7:30 PM'}</div>
          </div>
        </div>

        <div style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:14px;padding:10px 14px;display:flex;align-items:center;justify-content:space-between">
          <span style="font-size:0.82rem;font-weight:700;color:#166534">ലഭ്യതാ സ്റ്റാറ്റസ്:</span>
          <span class="provider-live-pill ${availClass}">${availLabel}</span>
        </div>

        <!-- VEHICLE SPECIFICATIONS (IF VEHICLE SERVICE) -->
        ${srv.vehicleDetails ? `
          <div style="background:#F0FDF4;border:1.5px solid #86EFAC;border-radius:14px;padding:12px;margin-top:2px">
            <div style="font-size:0.82rem;font-weight:900;color:#065F46;margin-bottom:8px">🚗 വാഹന വിവരങ്ങൾ (Vehicle Specifications):</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:0.78rem">
              ${srv.vehicleDetails.model ? `<div><span style="color:#64748B">മോഡൽ/സീറ്റിംഗ്:</span> <b style="color:#0F172A">${escapeHtml(srv.vehicleDetails.model)}</b></div>` : ''}
              ${srv.vehicleDetails.number ? `<div><span style="color:#64748B">നമ്പർ:</span> <b style="color:#0F172A">${escapeHtml(srv.vehicleDetails.number)}</b></div>` : ''}
              ${srv.vehicleDetails.stand ? `<div style="grid-column:span 2"><span style="color:#64748B">പ്രധാന സ്റ്റാൻഡ്:</span> <b style="color:#0F172A">🚏 ${escapeHtml(srv.vehicleDetails.stand)}</b></div>` : ''}
              ${srv.vehicleDetails.route ? `<div style="grid-column:span 2"><span style="color:#64748B">റൂട്ടുകൾ:</span> <b style="color:#0F172A">🛣️ ${escapeHtml(srv.vehicleDetails.route)}</b></div>` : ''}
            </div>
          </div>
        ` : ''}

        <!-- SPECIALIZATION CHIPS -->
        <div>
          <div style="font-size:0.8rem;font-weight:800;color:#334155;margin-bottom:6px">🛠️ പ്രത്യേക സേവനങ്ങൾ (Specializations):</div>
          <div style="display:flex;flex-wrap:wrap;gap:6px">
            ${(srv.specializations || ['സാധാരണ വർക്കുകൾ', 'റിപ്പയറിങ്']).map(sp => `<span class="provider-spec-tag" style="font-size:0.76rem;padding:4px 10px">${sp}</span>`).join('')}
          </div>
        </div>

        <!-- DIRECT ACTION (APP CHAT ONLY) -->
        <div style="display:flex;gap:10px;margin-top:4px">
          <button class="prov-btn-chat" style="padding:12px;font-size:0.92rem;border-radius:14px;flex:1;display:flex;align-items:center;justify-content:center;gap:8px" onclick="closeModal('modal-service-detail'); openChatForService('${srv.id}')">
            <span>💬</span>
            <span>ചാറ്റ്</span>
          </button>
        </div>

        <!-- RATE & REVIEWS SECTION -->
        <div style="border-top:1px dashed #CBD5E1;padding-top:14px;margin-top:4px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
            <h4 style="margin:0;font-size:0.95rem;font-weight:800;color:#1E293B">⭐ ഉപഭോക്തൃ റേറ്റിംഗുകൾ (${(srv.reviews || []).length})</h4>
            <span style="font-size:0.82rem;font-weight:800;color:#D97706;background:#FEF3C7;padding:2px 8px;border-radius:8px">ശരാശരി: ★ ${srv.rating}</span>
          </div>

          <!-- SUBMIT RATING FORM -->
          <div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:16px;padding:12px 14px;margin-bottom:12px">
            <div style="font-size:0.78rem;font-weight:800;color:#475569;text-align:center">നിങ്ങളുടെ റേറ്റിംഗ് നൽകാം:</div>
            <div class="star-rating-btn-row" id="detailStarRow">
              <button type="button" class="star-btn active" onclick="setServiceRatingStar(1)">★</button>
              <button type="button" class="star-btn active" onclick="setServiceRatingStar(2)">★</button>
              <button type="button" class="star-btn active" onclick="setServiceRatingStar(3)">★</button>
              <button type="button" class="star-btn active" onclick="setServiceRatingStar(4)">★</button>
              <button type="button" class="star-btn active" onclick="setServiceRatingStar(5)">★</button>
            </div>
            <input type="text" id="serviceReviewTextInput" placeholder="നിങ്ങളുടെ അനുഭവം / അഭിപ്രായം ഇവിടെ എഴുതാം..." style="width:100%;padding:8px 12px;border:1px solid #CBD5E1;border-radius:10px;font-size:0.8rem;outline:none;margin-bottom:8px">
            <button onclick="submitProviderReview('${srv.id}')" style="width:100%;padding:8px;background:#0E7043;color:#fff;border:none;border-radius:10px;font-weight:800;font-size:0.82rem;cursor:pointer">
              റേറ്റിംഗ് സമർപ്പിക്കാം
            </button>
          </div>

          <!-- RECENT REVIEWS LIST -->
          <div style="display:flex;flex-direction:column;gap:8px">
            ${(srv.reviews || []).map(r => `
              <div style="background:#fff;border:1px solid #E2E8F0;border-radius:12px;padding:8px 12px">
                <div style="display:flex;justify-content:space-between;align-items:center">
                  <span style="font-weight:800;font-size:0.82rem;color:#1E293B">${escapeHtml(r.user)}</span>
                  <span style="font-size:0.72rem;color:#F59E0B;font-weight:800">${'★'.repeat(r.rating || 5)} <span style="color:#94A3B8;font-weight:500">• ${r.date || 'സമീപകാലത്ത്'}</span></span>
                </div>
                <div style="font-size:0.78rem;color:#475569;margin-top:3px">${escapeHtml(r.text)}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    window._currentServiceRating = 5;
    openModal('modal-service-detail');
  }
  window.openServiceDetailModal = openServiceDetailModal;

  function setServiceRatingStar(star) {
    window._currentServiceRating = star;
    const btns = document.querySelectorAll('#detailStarRow .star-btn');
    btns.forEach((btn, idx) => {
      if (idx < star) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }
  window.setServiceRatingStar = setServiceRatingStar;

  function submitProviderReview(srvId) {
    const srv = (APP_STATE.services || []).find(s => s.id === srvId);
    if (!srv) return;

    const input = document.getElementById('serviceReviewTextInput');
    const comment = input ? input.value.trim() : '';
    const star = window._currentServiceRating || 5;

    if (!srv.reviews) srv.reviews = [];
    const newReview = {
      user: APP_STATE.currentUser.name || 'സുഹൃത്ത്',
      rating: star,
      date: 'ഇപ്പോൾ',
      text: comment || 'നല്ല സർവീസ്, നന്ദി!'
    };
    srv.reviews.unshift(newReview);

    const sum = srv.reviews.reduce((acc, curr) => acc + (curr.rating || 5), 0);
    const avg = (sum / srv.reviews.length).toFixed(1);
    srv.rating = `${avg} (${srv.reviews.length})`;

    try {
      localStorage.setItem('nn_services', JSON.stringify(APP_STATE.services));
    } catch (_) {}

    // Sync review to Supabase Cloud
    if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.saveReview === 'function') {
      window.NN_SUPABASE_SERVICES.saveReview(srvId, newReview, srv.rating);
    }

    toast('⭐ നിങ്ങളുടെ റേറ്റിംഗ് വിജയകരമായി സമർപ്പിച്ചു!');
    openServiceDetailModal(srvId);
    renderServicesScreen();
    renderHomeScreen();
  }
  window.submitProviderReview = submitProviderReview;

  // ==============================================================
  // 11. SERVICE REGISTRATION: AUTO-SUGGESTIONS & MINI-ICON STUDIO
  // ==============================================================
  const TRADES_CATALOG = (typeof window !== 'undefined' && window.TRADES_CATALOG_500 && window.TRADES_CATALOG_500.length)
    ? window.TRADES_CATALOG_500
    : [
    { id: 'auto', name: 'ഓട്ടോറിക്ഷ സർവീസ്', en: 'Auto Rickshaw', icon: '🛺', category: 'auto', specs: ['ലോക്കൽ ഓട്ടം', 'സ്കൂൾ ട്രിപ്പ്', 'ഹോസ്പിറ്റൽ എമർജൻസി', 'റെയിൽവേ സ്റ്റേഷൻ', 'രാത്രി സർവീസ്'] },
    { id: 'taxi', name: 'ടാക്സി കാർ & ട്രാവൽസ്', en: 'Taxi & Cab Service', icon: '🚕', category: 'taxi', specs: ['എയർപോർട്ട് ഡ്രോപ്പ്', 'ടൂർ പാക്കേജ്', 'ഇന്നോവ / എർട്ടിഗ', '24x7 ലഭ്യമാണ്', 'ഹോസ്പിറ്റൽ ട്രിപ്പ്'] },
    { id: 'traveller', name: 'വാൻ & ടെമ്പോ ട്രാവലർ', en: 'Van & Tempo Traveller', icon: '🚐', category: 'traveller', specs: ['17/26 സീറ്റർ ട്രാവലർ', 'ടൂർ & തീർത്ഥാടനം', 'വിവാഹ പാക്കേജ്', 'ഫാമിലി ട്രിപ്പ്', 'AC പുഷ്ബാക്ക് സീറ്റ്'] },
    { id: 'bus', name: 'ടൂറിസ്റ്റ് ബസ് സർവീസ്', en: 'Tourist Bus Service', icon: '🚌', category: 'bus', specs: ['32/49 സീറ്റർ ബസ്', 'വിവാഹ ഓട്ടം', 'കോളേജ്/സ്കൂൾ ടൂർ', 'എയർ സസ്പെൻഷൻ', 'ഡിജെ & ലൈറ്റ്സ്'] },
    { id: 'pickup', name: 'പിക്കപ്പ് വാൻ & ഗുഡ്സ്', en: 'Pickup Van & Goods', icon: '🛻', category: 'pickup', specs: ['വീട് മാറ്റൽ', 'സാധനങ്ങൾ കൊണ്ടുപോകൽ', 'പച്ചക്കറി & മാർക്കറ്റ്', 'ഫർണിച്ചർ ഷിഫ്റ്റിംഗ്', 'ഇന്റർലോക്ക് / മെറ്റീരിയൽ'] },
    { id: 'goodsauto', name: 'ഗുഡ്സ് ഓട്ടോ', en: 'Goods Auto / Ape', icon: '🛺📦', category: 'goodsauto', specs: ['ചെറിയ ലോഡുകൾ', 'ഫ്രിഡ്ജ് & വാഷിംഗ് മെഷീൻ', 'ടൗൺ ഡെലിവറി', 'തടി & കമ്പി', 'ചെലവ് കുറഞ്ഞ ഓട്ടം'] },
    { id: 'jeep', name: 'ജീപ്പ് 4x4 / സഫാരി', en: 'Jeep 4x4 Safari', icon: '🚙', category: 'jeep', specs: ['ഓഫ്രോഡ് സഫാരി', 'മലയോര റൂട്ടുകൾ', '4x4 ജീപ്പ്', 'എസ്റ്റേറ്റ് ഓട്ടം', 'മൺസൂൺ ഡ്രൈവ്'] },
    { id: 'lorry', name: 'ലോറി & ടിപ്പർ സർവീസ്', en: 'Lorry & Tipper Truck', icon: '🚛', category: 'lorry', specs: ['മണ്ണ് & മെറ്റൽ സപ്ലൈ', '10/16 ടൺ ടിപ്പർ', 'ഹെവി ലോഡ് ട്രാൻസ്പോർട്ട്', 'സൈറ്റ് ക്ലിയറൻസ്', 'ഇന്റർസ്റ്റേറ്റ് ലോഡ്'] },
    { id: 'jcb', name: 'ജെസിബി & ഹിറ്റാച്ചി എക്സ്കവേറ്റർ', en: 'JCB & Excavator', icon: '🚜', category: 'jcb', specs: ['തറ വെട്ടൽ', 'കിണർ കുഴിക്കൽ', 'റോഡ് പണി', 'മണ്ണ് നിരപ്പാക്കൽ', 'ബ്രേക്കർ വർക്ക്'] },
    { id: 'crane', name: 'ക്രെയിൻ & ബ്രേക്ക്ഡൗൺ റിക്കവറി', en: 'Crane & Recovery Service', icon: '🏗️', category: 'crane', specs: ['വാഹനം ടോവിങ് (Towing)', 'ഹെവി ലിഫ്റ്റിംഗ്', 'ബ്രേക്ക്ഡൗൺ റിക്കവറി', 'ഹൈഡ്രോളിക് ക്രെയിൻ', '24x7 ആക്സിഡന്റ് റിക്കവറി'] },
    { id: 'ambulance', name: 'ആംബുലൻസ് 24x7 സർവീസ്', en: 'Ambulance 24x7', icon: '🚑', category: 'ambulance', specs: ['24 മണിക്കൂർ എമർജൻസി', 'ഓക്സിജൻ സപ്പോർട്ട്', 'ICU ആംബുലൻസ്', 'സ്ട്രെച്ചർ സൗകര്യം', 'ദീർഘദൂര പേഷ്യന്റ് ട്രാൻസ്ഫർ'] },
    { id: 'electrician', name: 'ഇലക്ട്രീഷ്യൻ', en: 'Electrician', icon: '⚡', category: 'electrician', specs: ['വീട് വയറിങ്', 'ഇൻവെർട്ടർ', 'ഫാൻ & മോട്ടോർ', 'ഷോർട്ട് സർക്യൂട്ട്', 'സ്വിച്ച് ബോർഡ്'] },
    { id: 'plumber', name: 'പ്ലംബർ', en: 'Plumber', icon: '🚰', category: 'plumber', specs: ['പൈപ്പ് ലീക്ക്', 'ടാങ്ക് ക്ലീനിംഗ്', 'മോട്ടോർ ഫിറ്റിംഗ്', 'സാനിറ്ററി', 'ടാപ്പ് മാറ്റൽ'] },
    { id: 'acrepair', name: 'എസി & ഫ്രിഡ്ജ് ടെക്നീഷ്യൻ', en: 'AC & Fridge Repair', icon: '❄️', category: 'acrepair', specs: ['ഗ്യാസ് ചാർജിംഗ്', 'എസി സർവീസിങ്', 'ഫ്രിഡ്ജ് കംപ്ലയിന്റ്', 'വാഷിംഗ് മെഷീൻ', 'ഇൻസ്റ്റാളേഷൻ'] },
    { id: 'driver', name: 'ഡ്രൈവർ / ഓട്ടോ / ടാക്സി', en: 'Driver / Taxi / Auto', icon: '🛺', category: 'driver', specs: ['ഓട്ടോ സർവീസ്', 'ടാക്സി കാർ', 'ലോഡിങ് വാഹനം', 'ലോങ്ങ് ട്രിപ്പ്', 'ഹോസ്പിറ്റൽ എമർജൻസി'] },
    { id: 'cctv', name: 'സിസിടിവി & വൈഫൈ ഇൻസ്റ്റലേഷൻ', en: 'CCTV & WiFi Installer', icon: '📹', category: 'cctv', specs: ['സിസിടിവി ക്യാമറ', 'വൈഫൈ റൂട്ടർ', 'DVR സെറ്റപ്പ്', 'മൊബൈൽ കണക്ട്', 'നെറ്റ്‌വർക്കിങ്'] },
    { id: 'cleaning', name: 'ക്ലീനിംഗ് & ടാങ്ക് വാഷ്', en: 'Deep Cleaning & Water Tank', icon: '🧹', category: 'cleaning', specs: ['വീട് ഡീപ്പ് ക്ലീനിംഗ്', 'വാട്ടർ ടാങ്ക് വാഷ്', 'കിണർ വൃത്തിയാക്കൽ', 'ബാത്ത്റൂം ക്ലീനിംഗ്', 'സോഫ ക്ലീനിങ്'] },
    { id: 'carpenter', name: 'ആശാരി & ഫർണിച്ചർ', en: 'Carpenter & Furniture', icon: '🪚', category: 'carpenter', specs: ['വാതിൽ & ജനൽ', 'കട്ടിൽ & മേശ', 'കിച്ചൻ കാബിനറ്റ്', 'ഫർണിച്ചർ റിപ്പയർ', 'ലോക്ക് ഫിറ്റിംഗ്'] },
    { id: 'painter', name: 'പെയിന്റർ & പോളിഷിംഗ്', en: 'Painter & Wall Polishing', icon: '🎨', category: 'painter', specs: ['ഇന്റീരിയർ പെയിന്റിംഗ്', 'എക്സ്റ്റീരിയർ', 'പുട്ടി വർക്ക്', 'വുഡ് പോളിഷിംഗ്', 'വാട്ടർപ്രൂഫിംഗ്'] },
    { id: 'mason', name: 'മേസൺ & വാർപ്പ് പണികൾ', en: 'Mason & Construction', icon: '🧱', category: 'mason', specs: ['തറ & ഭിത്തി നിർമ്മാണം', 'പ്ലാസ്റ്ററിംഗ്', 'വാർപ്പ് പണി', 'റൂഫിംഗ്', 'ടൈലിംഗ്'] },
    { id: 'welding', name: 'വെൽഡിങ്ങ് & ഗ്രിൽ വർക്ക്', en: 'Welding & Fabrication', icon: '🔥', category: 'welding', specs: ['ഗേറ്റ് & ഗ്രിൽ', 'ഷെഡ് നിർമ്മാണം', 'അലുമിനിയം വെൽഡിങ്', 'സ്ട്രക്ചറൽ വർക്ക്', 'സ്റ്റെയർകെയ്സ്'] },
    { id: 'aluminium', name: 'അലുമിനിയം ഫാബ്രിക്കേഷൻ', en: 'Aluminium Fabrication', icon: '🪟', category: 'other', specs: ['ജനൽ & പാർട്ടീഷൻ', 'ടഫ്ൻഡ് ഗ്ലാസ്', 'ഷോപ്പ് ഫ്രണ്ട്', 'സ്ലൈഡിങ് ഡോർ', 'ഫോൾസ് സീലിംഗ്'] },
    { id: 'mobile', name: 'മൊബൈൽ & ലാപ്ടോപ്പ് സർവീസ്', en: 'Mobile & Laptop Repair', icon: '📱', category: 'other', specs: ['ഡിസ്പ്ലേ മാറ്റൽ', 'ബാറ്ററി ചേഞ്ച്', 'ഓപ്പറേറ്റിംഗ് സിസ്റ്റം', 'ഹാർഡ്‌വെയർ റിപ്പയർ', 'ഡാറ്റാ റിക്കവറി'] },
    { id: 'carwash', name: 'കാർ & ബൈക്ക് വാഷ്', en: 'Car Wash & Detailing', icon: '🚗', category: 'other', specs: ['ഫോം വാഷ്', 'പോളിഷിംഗ്', 'ഇന്റീരിയർ ക്ലീനിംഗ്', 'ഹോം സർവീസ് വാഷ്', 'സെറാമിക് കോട്ടിംഗ്'] },
    { id: 'catering', name: 'കാറ്ററിംഗ് & പാചകക്കാരൻ', en: 'Catering & Cook', icon: '🍲', category: 'catering', specs: ['സദ്യ ഓർഡറുകൾ', 'ബിരിയാണി & സ്പെഷ്യൽ', 'ചെറിയ പാർട്ടികൾ', 'കുക്കിംഗ് മാസ്റ്റർ', 'ഡെസേർട്ട്'] },
    { id: 'beautician', name: 'ബ്യൂട്ടീഷ്യൻ & മേക്കപ്പ്', en: 'Beautician & Mehendi', icon: '💄', category: 'beautician', specs: ['ബ്രൈഡൽ മേക്കപ്പ്', 'ഹെയർ ഡ്രസ്സിംഗ്', 'മെഹന്ദി ഡിസൈൻ', 'ഫേഷ്യൽ & വാക്സിംഗ്', 'സാരി ഡ്രേപ്പിംഗ്'] },
    { id: 'tailoring', name: 'തയ്യൽ & ആൾട്ടറേഷൻ', en: 'Tailoring & Alteration', icon: '🧵', category: 'tailoring', specs: ['ബ്ലൗസ് സ്റ്റിച്ചിംഗ്', 'ചുരിദാർ ഡിസൈനിങ്', 'യൂണിഫോം', 'ആൾട്ടറേഷൻ', 'കർട്ടൻ തയ്യൽ'] },
    { id: 'nursing', name: 'ഹോം നഴ്സിംഗ് & പേഷ്യന്റ് കെയർ', en: 'Home Nursing & Care', icon: '🩺', category: 'nursing', specs: ['കിടപ്പുരോഗി പരിചരണം', 'ഇഞ്ചക്ഷൻ & ഡ്രസ്സിംഗ്', 'വയോജന പരിചരണം', 'പോസ്റ്റ് ഓപ്പറേഷൻ കെയർ', 'ബിപി & ഷുഗർ'] },
    { id: 'tuition', name: 'ഹോം ട്യൂഷൻ & കോച്ചിംഗ്', en: 'Home Tuition & Coaching', icon: '📚', category: 'tuition', specs: ['1 മുതൽ 10 വരെ', 'പ്ലസ് ടു സയൻസ്/കൊമേഴ്സ്', 'മാത്തമാറ്റിക്സ്', 'ഇംഗ്ലീഷ് സ്പീക്കിങ്', 'ഹിന്ദി'] },
    { id: 'water', name: 'കുടിവെള്ള വിതരണം & ടാങ്കർ', en: 'Drinking Water Supply', icon: '💧', category: 'water', specs: ['ശുദ്ധജല ടാങ്കർ', '3000 ലിറ്റർ', '5000 ലിറ്റർ', 'റെഗുലർ സപ്ലൈ', 'ഹൗസ് ഫില്ലിംഗ്'] },
    { id: 'gardening', name: 'കൃഷിപ്പണി & തെങ്ങുകയറ്റം', en: 'Gardening & Agri Work', icon: '🌴', category: 'gardening', specs: ['തെങ്ങുകയറ്റം', 'പുല്ലുവെട്ട്', 'തോട്ടം പരിപാലനം', 'മരം വെട്ടൽ', 'വിത്ത് & വളം'] },
    { id: 'tiles', name: 'ടൈൽസ് & മാർബിൾ വർക്ക്', en: 'Tiles & Marble Laying', icon: '🏛️', category: 'mason', specs: ['ഫ്ലോർ ടൈൽസ്', 'ഗ്രാനൈറ്റ് വർക്ക്', 'ബാത്ത്റൂം ടൈലിംഗ്', 'വാൾ ടൈൽസ്', 'ഇപ്പോക്സി ഗ്രൗട്ടിംഗ്'] },
    { id: 'photo', name: 'ഫോട്ടോഗ്രാഫി & വീഡിയോ', en: 'Photography & Videography', icon: '📸', category: 'other', specs: ['വിവാഹ ഫോട്ടോ', 'വീഡിയോ ഷൂട്ട്', 'പോർട്രെയ്റ്റ്', 'ആൽബം ഡിസൈൻ', 'ഡ്രോൺ ഷൂട്ട്'] },
    { id: 'inverter', name: 'ഇൻവെർട്ടർ & ബാറ്ററി സർവീസ്', en: 'Inverter & Battery Service', icon: '🔋', category: 'electrician', specs: ['ബാറ്ററി വാട്ടർ', 'ഇൻവെർട്ടർ റിപ്പയർ', 'സോളാർ ഫിറ്റിംഗ്', 'പുതിയ ബാറ്ററി', 'യുപിഎസ്'] },
    { id: 'gas', name: 'ഗ്യാസ് സ്റ്റൗ റിപ്പയർ', en: 'Gas Stove Repair', icon: '🔥', category: 'other', specs: ['ബർണർ ക്ലീനിംഗ്', 'പൈപ്പ് മാറ്റൽ', 'റെഗുലേറ്റർ ചെക്ക്', 'ഓട്ടോ ഇഗ്നിഷൻ'] }
  ];

  const QUICK_TRADE_CATEGORIES = [
    { key: 'popular', label: '🌟 ജനപ്രിയം (Top 25)' },
    { key: 'vehicles', label: '🚗 വാഹനങ്ങൾ (ഓട്ടോ, ടാക്സി, ലോറി, JCB...)' },
    { key: 'all', label: '🌐 എല്ലാം (500)' },
    { key: 'electrician', label: '⚡ ഇലക്ട്രിക് (25)' },
    { key: 'plumber', label: '🚰 പ്ലംബർ (25)' },
    { key: 'acrepair', label: '❄️ എസി/ഫ്രിഡ്ജ് (25)' },
    { key: 'driver', label: '🛺 ഡ്രൈവർ (25)' },
    { key: 'cctv', label: '📹 സിസിടിവി/ടെക് (25)' },
    { key: 'cleaning', label: '🧹 ക്ലീനിംഗ് (25)' },
    { key: 'carpenter', label: '🪚 ആശാരി (25)' },
    { key: 'painter', label: '🎨 പെയിന്റർ (25)' },
    { key: 'mason', label: '🧱 മേസൺ/ടൈൽസ് (25)' },
    { key: 'welding', label: '🔥 വെൽഡിങ്ങ് (25)' },
    { key: 'gardening', label: '🌴 കൃഷി/തോട്ടം (25)' },
    { key: 'beautician', label: '💄 ബ്യൂട്ടീഷ്യൻ (25)' },
    { key: 'catering', label: '🍲 കാറ്ററിംഗ് (25)' },
    { key: 'tailoring', label: '🧵 തയ്യൽ (25)' },
    { key: 'nursing', label: '🩺 നഴ്സിംഗ് (25)' },
    { key: 'tuition', label: '📚 ട്യൂഷൻ (25)' },
    { key: 'water', label: '💧 കുടിവെള്ളം (25)' },
    { key: 'other', label: '🔧 മൊബൈൽ/ഓട്ടോ/മറ്റു (75)' }
  ];

  let currentTradeChipCategory = 'popular';

  function getMiniIconsList() {
    let customIcons = [];
    try {
      customIcons = JSON.parse(localStorage.getItem('nn_admin_mini_icons') || '[]');
    } catch (_) {}
    const base = [
      '🛺', '🚕', '🚐', '🚌', '🛻', '🚙', '🚛', '🚜', '🏗️', '🚑', '🛵',
      '⚡', '🚰', '❄️', '🪚', '🎨', '🧹', '🧱', '🔥', '🌴',
      '💄', '📹', '🍲', '🧵', '🩺', '📚', '💧', '📱', '🚗', '🚲',
      '🍳', '🌿', '✂️', '🚚', '📸', '🪟', '🔑', '🛠️', '💻', '🧺',
      '🪓', '🌾', '🔋', '🏛️', '🚪'
    ];
    const combined = [...base];
    customIcons.forEach(item => {
      const icon = (typeof item === 'string' ? item : (item && item.icon ? item.icon : '')).trim();
      if (icon && !combined.includes(icon)) combined.push(icon);
    });
    return combined;
  }
  window.getMiniIconsList = getMiniIconsList;

  // VEHICLE REGISTRATION MODE & TYPE SELECTOR HELPERS
  function setRegServiceMode(mode) {
    window._currentRegServiceMode = mode;
    const isVehicle = (mode === 'vehicle');
    const sBtn = document.getElementById('regModeServiceBtn');
    const vBtn = document.getElementById('regModeVehicleBtn');
    const vPicker = document.getElementById('regVehiclePickerSection');
    const vFields = document.getElementById('regVehicleSpecificFields');
    const gChips = document.getElementById('regGeneralTradeChipsContainer');
    const titleEl = document.getElementById('modalServiceTitle');
    const nameLabel = document.getElementById('regServiceNameLabel');
    const tradeLabel = document.getElementById('regServiceTradeLabel');

    if (sBtn && vBtn) {
      if (isVehicle) {
        vBtn.style.background = '#0F172A';
        vBtn.style.color = '#fff';
        vBtn.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
        sBtn.style.background = 'transparent';
        sBtn.style.color = '#64748B';
        sBtn.style.boxShadow = 'none';
      } else {
        sBtn.style.background = '#fff';
        sBtn.style.color = '#0F172A';
        sBtn.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
        vBtn.style.background = 'transparent';
        vBtn.style.color = '#64748B';
        vBtn.style.boxShadow = 'none';
      }
    }

    if (vPicker) vPicker.style.display = isVehicle ? 'block' : 'none';
    if (vFields) vFields.style.display = isVehicle ? 'flex' : 'none';
    if (gChips) gChips.style.display = isVehicle ? 'none' : 'block';

    if (titleEl) titleEl.textContent = isVehicle ? '🚗 വാഹനം / ട്രാൻസ്പോർട്ട് രജിസ്റ്റർ ചെയ്യാം' : '🛠️ സേവനം രജിസ്റ്റർ ചെയ്യാം';
    if (nameLabel) nameLabel.textContent = isVehicle ? 'ഡ്രൈവർ / വാഹന ഉടമയുടെ പേര്' : 'പൂർണ്ണ നാമം';
    if (tradeLabel) tradeLabel.textContent = isVehicle ? 'വാഹന സർവീസ് ഇനം' : 'തൊഴിൽ / സേവനം';

    if (isVehicle) {
      selectVehicleTypeInForm('auto', 'ഓട്ടോറിക്ഷ', '🛺');
    }
  }
  window.setRegServiceMode = setRegServiceMode;

  function selectVehicleTypeInForm(typeKey, typeName, typeIcon) {
    const tradeInput = document.getElementById('regServiceTrade');
    const catInput = document.getElementById('regServiceCategoryKey');
    const modelInput = document.getElementById('regVehicleModel');

    if (tradeInput) tradeInput.value = `${typeName} സർവീസ്`;
    if (catInput) catInput.value = typeKey;
    selectMiniIcon(typeIcon);

    const modelPlaceholders = {
      auto: 'മോഡൽ / കപ്പാസിറ്റി (3-സീറ്റർ)',
      taxi: 'മോഡൽ / എയർകണ്ടീഷണർ വിവരങ്ങൾ',
      traveller: 'സീറ്റിംഗ് കപ്പാസിറ്റി (17/26 സീറ്റർ)',
      bus: 'ബസ് വിവരങ്ങൾ / കപ്പാസിറ്റി',
      pickup: 'വാഹന മോഡൽ / കപ്പാസിറ്റി',
      goodsauto: 'ഗുഡ്സ് ഓട്ടോ വിവരങ്ങൾ',
      jeep: 'ജീപ്പ് മോഡൽ / 4x4',
      lorry: 'ലോറി ടൺ കപ്പാസിറ്റി',
      jcb: 'JCB / എക്സ്കവേറ്റർ മോഡൽ',
      crane: 'ക്രെയിൻ / ടോവിങ് വിവരങ്ങൾ',
      ambulance: 'ആംബുലൻസ് വിവരങ്ങൾ'
    };
    if (modelInput && modelPlaceholders[typeKey]) {
      modelInput.placeholder = modelPlaceholders[typeKey];
    }

    const chips = document.querySelectorAll('#regVehiclePickerSection .vehicle-type-chip');
    chips.forEach(btn => {
      const match = btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(`'${typeKey}'`);
      btn.style.border = match ? '1.5px solid #10B981' : '1px solid #CBD5E1';
      btn.style.color = match ? '#065F46' : '#334155';
      btn.style.background = match ? '#ECFDF5' : '#fff';
    });
  }
  window.selectVehicleTypeInForm = selectVehicleTypeInForm;

  function openAddVehicleModal(preferredType) {
    openAddServiceModal();
    setRegServiceMode('vehicle');
    if (preferredType) {
      const names = {
        auto: ['ഓട്ടോറിക്ഷ', '🛺'],
        taxi: ['ടാക്സി കാർ', '🚕'],
        traveller: ['വാൻ & ട്രാവലർ', '🚐'],
        bus: ['ടൂറിസ്റ്റ് ബസ്', '🚌'],
        pickup: ['പിക്കപ്പ് വാൻ', '🛻'],
        goodsauto: ['ഗുഡ്സ് ഓട്ടോ', '🛺📦'],
        jeep: ['ജീപ്പ് 4x4', '🚙'],
        lorry: ['ലോറി / ടിപ്പർ', '🚛'],
        jcb: ['ജെസിബി / ഹിറ്റാച്ചി', '🚜'],
        crane: ['ക്രെയിൻ / റിക്കവറി', '🏗️'],
        ambulance: ['ആംബുലൻസ് 24x7', '🚑']
      };
      if (names[preferredType]) {
        selectVehicleTypeInForm(preferredType, names[preferredType][0], names[preferredType][1]);
      }
    }
  }
  window.openAddVehicleModal = openAddVehicleModal;

  function openAddServiceModal() {
    openModal('modal-add-service');

    // Populate Mini Icon Palette dynamically including admin-added icons
    const palette = document.getElementById('regMiniIconPalette');
    if (palette) {
      const currentIcons = getMiniIconsList();
      const currentSelected = (document.getElementById('regSelectedIcon') ? document.getElementById('regSelectedIcon').value : '⚡') || '⚡';
      palette.innerHTML = currentIcons.map(ic => `
        <button type="button" class="mini-icon-btn ${ic === currentSelected ? 'selected' : ''}" 
                onclick="selectMiniIcon('${ic}')" title="${ic}">
          ${ic}
        </button>
      `).join('');
    }

    // Initialize 500 Quick Trade Chips and Category Navigation
    initQuickTradeChipsUI();

    // Pre-fill location if empty
    const locInput = document.getElementById('regServiceLoc');
    if (locInput && !locInput.value && APP_STATE.location && APP_STATE.location.name) {
      locInput.value = APP_STATE.location.name;
    }

    // Reset default icon
    selectMiniIcon('⚡');
  }
  window.openAddServiceModal = openAddServiceModal;

  function initQuickTradeChipsUI() {
    const tabsCont = document.getElementById('regCategoryChipsTabs');
    if (tabsCont && !tabsCont.children.length) {
      tabsCont.innerHTML = QUICK_TRADE_CATEGORIES.map(cat => `
        <button type="button" class="quick-trade-chip ${cat.key === currentTradeChipCategory ? 'active' : ''}" 
                onclick="selectTradeChipCategory('${cat.key}')" 
                data-category="${cat.key}">
          <span>${cat.label}</span>
        </button>
      `).join('');
    }
    renderQuickTradeChips(currentTradeChipCategory, '');
  }
  window.initQuickTradeChipsUI = initQuickTradeChipsUI;

  function renderQuickTradeChips(categoryKey, query) {
    const chipsCont = document.getElementById('regQuickTradeChips');
    const badge = document.getElementById('quickChipsCountBadge');
    if (!chipsCont) return;

    const catalog = (typeof window !== 'undefined' && window.TRADES_CATALOG_500 && window.TRADES_CATALOG_500.length)
      ? window.TRADES_CATALOG_500
      : TRADES_CATALOG;

    const q = (query || '').toLowerCase().trim();
    let trades = [];

    if (q) {
      trades = catalog.filter(t => 
        t.name.toLowerCase().includes(q) || 
        (t.en && t.en.toLowerCase().includes(q)) || 
        (t.specs && t.specs.some(s => s.toLowerCase().includes(q)))
      );
      if (badge) badge.textContent = `${trades.length} കണ്ടെത്തി`;
    } else {
      if (categoryKey === 'popular') {
        trades = catalog.slice(0, 25);
        if (badge) badge.textContent = 'Top 25 സേവനങ്ങൾ';
      } else if (categoryKey === 'all') {
        trades = catalog;
        if (badge) badge.textContent = `${trades.length} ലഭ്യമാണ്`;
      } else {
        trades = catalog.filter(t => t.category === categoryKey);
        if (badge) badge.textContent = `${trades.length} ലഭ്യമാണ്`;
      }
    }

    if (trades.length === 0) {
      chipsCont.innerHTML = `
        <div style="width:100%;padding:14px;text-align:center;color:#64748B;font-size:12px">
          <div>🔍 "<b>${escapeHtml(query)}</b>" എന്നതിൽ സേവനങ്ങൾ ഒന്നും കണ്ടില്ല</div>
          <div style="font-size:11px;color:#059669;margin-top:4px">മുകളിൽ നേരിട്ട് ടൈപ്പ് ചെയ്ത് പുതിയ സേവനമായി രജിസ്റ്റർ ചെയ്യാം!</div>
        </div>
      `;
      return;
    }

    const currentTradeVal = (document.getElementById('regServiceTrade') ? document.getElementById('regServiceTrade').value.trim() : '');

    chipsCont.innerHTML = trades.map(t => {
      const isSelected = currentTradeVal && currentTradeVal === t.name;
      return `
        <button type="button" class="quick-trade-chip ${isSelected ? 'active' : ''}" 
                onclick="selectTradeSuggestion('${t.id}')" 
                data-trade-id="${t.id}"
                title="${t.name} (${t.en || ''})">
          <span>${t.icon}</span>
          <span>${t.name}</span>
        </button>
      `;
    }).join('');
  }
  window.renderQuickTradeChips = renderQuickTradeChips;

  function filterQuickTradeChips(query) {
    const clearBtn = document.getElementById('clearChipFilterBtn');
    if (clearBtn) clearBtn.style.display = (query || '').trim() ? 'block' : 'none';
    renderQuickTradeChips(currentTradeChipCategory, query);
  }
  window.filterQuickTradeChips = filterQuickTradeChips;

  function clearQuickTradeFilter() {
    const input = document.getElementById('chipFilterInput');
    if (input) input.value = '';
    const clearBtn = document.getElementById('clearChipFilterBtn');
    if (clearBtn) clearBtn.style.display = 'none';
    renderQuickTradeChips(currentTradeChipCategory, '');
  }
  window.clearQuickTradeFilter = clearQuickTradeFilter;

  function selectTradeChipCategory(catKey) {
    currentTradeChipCategory = catKey;
    const input = document.getElementById('chipFilterInput');
    if (input) input.value = '';
    const clearBtn = document.getElementById('clearChipFilterBtn');
    if (clearBtn) clearBtn.style.display = 'none';

    const buttons = document.querySelectorAll('#regCategoryChipsTabs .quick-trade-chip');
    buttons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.category === catKey);
    });

    renderQuickTradeChips(catKey, '');
  }
  window.selectTradeChipCategory = selectTradeChipCategory;

  function selectMiniIcon(ic) {
    if (!ic) return;
    const hidden = document.getElementById('regSelectedIcon');
    if (hidden) hidden.value = ic;

    const preview = document.getElementById('regIconPreviewEmoji');
    if (preview) {
      preview.textContent = ic;
      const box = document.getElementById('regIconPreview');
      if (box) {
        box.style.animation = 'none';
        void box.offsetWidth;
        box.style.animation = 'iconPop 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      }
    }

    // Update palette active ring
    const buttons = document.querySelectorAll('#regMiniIconPalette .mini-icon-btn');
    buttons.forEach(btn => {
      btn.classList.toggle('selected', btn.textContent.trim() === ic);
    });
  }
  window.selectMiniIcon = selectMiniIcon;

  function setCustomServiceEmoji(val) {
    const trimmed = (val || '').trim();
    if (!trimmed) return;
    selectMiniIcon(trimmed);
  }
  window.setCustomServiceEmoji = setCustomServiceEmoji;

  function handleServiceTradeInput(query) {
    const dropdown = document.getElementById('regTradeSuggestionsDropdown');
    if (!dropdown) return;

    const q = (query || '').toLowerCase().trim();
    if (!q) {
      dropdown.style.display = 'none';
      return;
    }

    const matches = TRADES_CATALOG.filter(t => 
      t.name.toLowerCase().includes(q) || 
      t.en.toLowerCase().includes(q) || 
      t.specs.some(s => s.toLowerCase().includes(q))
    );

    if (matches.length === 0) {
      dropdown.innerHTML = `
        <div style="padding:10px 14px;font-size:12px;color:#475569;display:flex;align-items:center;justify-content:space-between">
          <span>✏️ "<b>${escapeHtml(query)}</b>" പുതിയ സേവനമായി രജിസ്റ്റർ ചെയ്യാം</span>
          <span style="font-size:11px;color:#059669;font-weight:700">ഓക്കേ ✓</span>
        </div>
      `;
      dropdown.style.display = 'block';
      autoDetectIconFromText(query);
      return;
    }

    const visibleMatches = matches.slice(0, 15);
    let html = visibleMatches.map(t => `
      <div class="trade-suggestion-item" onclick="selectTradeSuggestion('${t.id}')">
        <div style="display:flex;align-items:center">
          <div class="trade-sugg-icon">${t.icon}</div>
          <div>
            <div class="trade-sugg-title">${t.name}</div>
            <div class="trade-sugg-sub">${t.en || ''} • ${(t.specs || []).slice(0, 2).join(', ')}</div>
          </div>
        </div>
        <span style="font-size:11.5px;color:#059669;font-weight:800">തിരഞ്ഞെടുക്കാം ➔</span>
      </div>
    `).join('');

    if (matches.length > 15) {
      html += `
        <div style="padding:6px 12px;background:#F8FAFC;font-size:11px;color:#64748B;text-align:center;font-weight:600">
          + ${matches.length - 15} സേവനങ്ങൾ കൂടി ലഭ്യമാണ് (കൂടുതൽ ടൈപ്പ് ചെയ്യുക)
        </div>
      `;
    }

    dropdown.innerHTML = html;
    dropdown.style.display = 'block';

    autoDetectIconFromText(query);
  }
  window.handleServiceTradeInput = handleServiceTradeInput;

  function autoDetectIconFromText(text) {
    const t = (text || '').toLowerCase();
    if (t.includes('ac') || t.includes('എസി') || t.includes('ഫ്രിഡ്ജ്') || t.includes('കൂളർ')) selectMiniIcon('❄️');
    else if (t.includes('പ്ലംബ') || t.includes('പൈപ്പ്') || t.includes('ടാപ്പ്') || t.includes('വെള്ളം')) selectMiniIcon('🚰');
    else if (t.includes('ഇലക്ട്രി') || t.includes('വയറി') || t.includes('സ്വിച്ച്') || t.includes('കറണ്ട്')) selectMiniIcon('⚡');
    else if (t.includes('ഡ്രൈവ') || t.includes('ഓട്ടോ') || t.includes('ടാക്സി') || t.includes('വണ്ടി')) selectMiniIcon('🛺');
    else if (t.includes('കാർ') || t.includes('ബൈക്ക്') || t.includes('വാഷ്')) selectMiniIcon('🚗');
    else if (t.includes('cctv') || t.includes('ക്യാമറ') || t.includes('വൈഫൈ')) selectMiniIcon('📹');
    else if (t.includes('പെയിന്റ') || t.includes('പെയിന്റ്') || t.includes('പോളിഷ്')) selectMiniIcon('🎨');
    else if (t.includes('ക്ലീനി') || t.includes('വൃത്തിയാക്ക') || t.includes('ടാങ്ക്')) selectMiniIcon('🧹');
    else if (t.includes('മൊബൈൽ') || t.includes('ഫോൺ') || t.includes('ലാപ്')) selectMiniIcon('📱');
    else if (t.includes('പാചകം') || t.includes('ബിരിയാണി') || t.includes('കുക്ക്') || t.includes('കാറ്ററി')) selectMiniIcon('🍲');
    else if (t.includes('തയ്യൽ') || t.includes('ടൈലർ') || t.includes('ഡ്രസ്സ്') || t.includes('തുണി')) selectMiniIcon('🧵');
    else if (t.includes('നഴ്സ്') || t.includes('രോഗി') || t.includes('മെഡിക്കൽ')) selectMiniIcon('🩺');
    else if (t.includes('ട്യൂഷൻ') || t.includes('ടീച്ചർ') || t.includes('പഠന')) selectMiniIcon('📚');
    else if (t.includes('വെൽഡി') || t.includes('ഇരുമ്പ്') || t.includes('ഗ്രിൽ')) selectMiniIcon('🔥');
    else if (t.includes('ആശാരി') || t.includes('മര') || t.includes('ഫർണിച്ചർ')) selectMiniIcon('🪚');
    else if (t.includes('ഫോട്ടോ') || t.includes('വീഡിയോ') || t.includes('ഷൂട്ട്')) selectMiniIcon('📸');
    else if (t.includes('അലുമിനിയം') || t.includes('ഗ്ലാസ്') || t.includes('പാർട്ടീഷൻ')) selectMiniIcon('🪟');
    else if (t.includes('കൃഷി') || t.includes('തെങ്ങ്') || t.includes('തോട്ടം')) selectMiniIcon('🌴');
    else if (t.includes('മേക്കപ്പ്') || t.includes('ബ്യൂട്ടി') || t.includes('മെഹന്ദി')) selectMiniIcon('💄');
    else if (t.includes('മേസൺ') || t.includes('വാർപ്പ്') || t.includes('കട്ട')) selectMiniIcon('🧱');
  }

  function selectTradeSuggestion(tradeId) {
    const t = TRADES_CATALOG.find(item => item.id === tradeId);
    if (!t) return;

    const input = document.getElementById('regServiceTrade');
    if (input) input.value = t.name;

    const hiddenCat = document.getElementById('regServiceCategoryKey');
    if (hiddenCat) hiddenCat.value = t.category;

    selectMiniIcon(t.icon);

    const dropdown = document.getElementById('regTradeSuggestionsDropdown');
    if (dropdown) dropdown.style.display = 'none';

    // Highlight selected quick chip
    const chips = document.querySelectorAll('#regQuickTradeChips .quick-trade-chip');
    chips.forEach(chip => {
      chip.classList.toggle('active', chip.dataset.tradeId === tradeId);
    });

    // Show suggested skills
    const chipsCont = document.getElementById('regSkillSuggestionsChips');
    if (chipsCont) {
      chipsCont.innerHTML = (t.specs || []).map(s => `
        <button type="button" class="suggested-skill-pill" onclick="addSuggestedSkill('${s}')">+ ${s}</button>
      `).join('');
    }
  }
  window.selectTradeSuggestion = selectTradeSuggestion;

  function addSuggestedSkill(skill) {
    const input = document.getElementById('regServiceSpecs');
    if (!input) return;
    const current = input.value.split(',').map(s => s.trim()).filter(Boolean);
    if (!current.includes(skill)) {
      current.push(skill);
      input.value = current.join(', ');
    }
  }
  window.addSuggestedSkill = addSuggestedSkill;

  // AUTO-SUGGESTIONS ON SERVICES SCREEN SEARCH BAR
  function handleServicesSearchInput(query) {
    const dropdown = document.getElementById('servicesSearchSuggestions');
    if (!dropdown) return;
    const q = (query || '').toLowerCase().trim();

    renderServicesScreen();

    if (!q) {
      dropdown.style.display = 'none';
      return;
    }

    const matchingTrades = TRADES_CATALOG.filter(t => t.name.toLowerCase().includes(q) || t.en.toLowerCase().includes(q)).slice(0, 3);
    const matchingProviders = (APP_STATE.services || []).filter(s => 
      s.name.toLowerCase().includes(q) || 
      s.trade.toLowerCase().includes(q) || 
      (s.location && s.location.toLowerCase().includes(q))
    ).slice(0, 4);

    let html = '';
    if (matchingTrades.length > 0) {
      html += matchingTrades.map(t => `
        <div class="trade-suggestion-item" onclick="selectServiceSearchSuggestion('${t.name}')">
          <div style="display:flex;align-items:center">
            <div class="trade-sugg-icon">${t.icon}</div>
            <div>
              <div class="trade-sugg-title">${t.name}</div>
              <div class="trade-sugg-sub">വിഭാഗം • ${t.en}</div>
            </div>
          </div>
          <span style="font-size:11px;color:#059669;font-weight:700">തിരയുക ➔</span>
        </div>
      `).join('');
    }

    if (matchingProviders.length > 0) {
      html += matchingProviders.map(p => `
        <div class="trade-suggestion-item" onclick="openServiceDetailModal('${p.id}'); document.getElementById('servicesSearchSuggestions').style.display='none'">
          <div style="display:flex;align-items:center">
            <div class="trade-sugg-icon">${p.icon || '🛠️'}</div>
            <div>
              <div class="trade-sugg-title">${p.name}</div>
              <div class="trade-sugg-sub">${p.trade} • 📍 ${p.location}</div>
            </div>
          </div>
          <span style="font-size:11px;color:#059669;font-weight:700">കാണുക ➔</span>
        </div>
      `).join('');
    }

    if (!html) {
      dropdown.style.display = 'none';
      return;
    }

    dropdown.innerHTML = html;
    dropdown.style.display = 'block';
  }
  window.handleServicesSearchInput = handleServicesSearchInput;

  function selectServiceSearchSuggestion(term) {
    const input = document.getElementById('serviceSearchInput');
    if (input) input.value = term;
    const dropdown = document.getElementById('servicesSearchSuggestions');
    if (dropdown) dropdown.style.display = 'none';
    renderServicesScreen();
  }
  window.selectServiceSearchSuggestion = selectServiceSearchSuggestion;

  // SUBMIT SERVICE REGISTRATION WITH CUSTOM TYPED TRADE & MINI ICON
  function submitServiceRegistration(e) {
    if (e) e.preventDefault();
    const name = document.getElementById('regServiceName').value.trim();
    const typedTrade = (document.getElementById('regServiceTrade') ? document.getElementById('regServiceTrade').value.trim() : '');
    const selectedIcon = (document.getElementById('regSelectedIcon') ? document.getElementById('regSelectedIcon').value.trim() : '🛠️') || '🛠️';
    const categoryKey = (document.getElementById('regServiceCategoryKey') ? document.getElementById('regServiceCategoryKey').value : 'other') || 'other';
    const phone = document.getElementById('regServicePhone').value.trim();
    const rawFee = (document.getElementById('regServiceFee') ? document.getElementById('regServiceFee').value.trim() : '');
    const fee = rawFee ? formatPrice(rawFee) : '₹200 വിസിറ്റിംഗ് നിരക്ക്';
    const hours = (document.getElementById('regServiceHours') ? document.getElementById('regServiceHours').value.trim() : '') || '8:00 AM - 7:00 PM';
    const rawSpecs = (document.getElementById('regServiceSpecs') ? document.getElementById('regServiceSpecs').value.trim() : '');
    const avail = (document.getElementById('regServiceAvail') ? document.getElementById('regServiceAvail').value : 'available');
    const exp = document.getElementById('regServiceExp').value.trim() || 'പരിചയസമ്പന്നൻ';
    let loc = (document.getElementById('regServiceLoc') ? document.getElementById('regServiceLoc').value.trim() : '');
    if (!loc || loc === 'തത്സമയ ലൊക്കേഷൻ' || loc.includes('കണ്ണൂർ')) {
      loc = (APP_STATE.location.name && !APP_STATE.location.name.includes('കണ്ണൂർ') && APP_STATE.location.name !== 'തത്സമയ ലൊക്കേഷൻ')
        ? APP_STATE.location.name
        : getNearestKeralaPreset(APP_STATE.location.lat, APP_STATE.location.lon).name;
    }
    if (!loc) loc = APP_STATE.location.name || 'തത്സമയ ലൊക്കേഷൻ';
    const resolvedDistrict = APP_STATE.location.district || getNearestKeralaPreset(APP_STATE.location.lat, APP_STATE.location.lon).district || '';
    if (!name || !typedTrade || !phone) {
      toast('⚠️ ദയവായി പേര്, തൊഴിൽ, ഫോൺ നമ്പർ എന്നിവ നൽകുക.');
      return;
    }
    const vModel = (document.getElementById('regVehicleModel') ? document.getElementById('regVehicleModel').value.trim() : '');
    const vNumber = (document.getElementById('regVehicleNumber') ? document.getElementById('regVehicleNumber').value.trim() : '');
    const vStand = (document.getElementById('regVehicleStand') ? document.getElementById('regVehicleStand').value.trim() : '');
    const vRoute = (document.getElementById('regVehicleRoute') ? document.getElementById('regVehicleRoute').value.trim() : '');
    const vRate = (document.getElementById('regVehicleRate') ? document.getElementById('regVehicleRate').value.trim() : '');

    let vehicleDetails = null;
    if (vModel || vStand || vNumber || vRoute || vRate || window._currentRegServiceMode === 'vehicle') {
      vehicleDetails = {
        model: vModel,
        number: vNumber,
        stand: vStand,
        route: vRoute,
        baseRate: vRate ? formatPrice(vRate) : ''
      };
    }

    const specsList = rawSpecs ? rawSpecs.split(',').map(s => s.trim()).filter(Boolean) : [];
    if (vehicleDetails) {
      if (vStand) specsList.unshift(`🚏 ${vStand}`);
      if (vModel) specsList.unshift(vModel);
      if (vRoute) specsList.push(`🛣️ ${vRoute}`);
    }
    if (specsList.length === 0) {
      specsList.push('ജനറൽ സർവീസ്', 'ദ്രുത സഹായം');
    }

    const newService = {
      id: 'srv_' + Date.now(),
      name: name,
      category: categoryKey,
      trade: typedTrade,
      icon: selectedIcon,
      customIcon: selectedIcon,
      phone: phone,
      visitingFee: fee,
      workingHours: hours,
      specializations: specsList,
      vehicleDetails: vehicleDetails,
      availability: avail,
      rating: '5.0 (New)',
      experience: exp,
      location: loc,
      district: resolvedDistrict,
      lat: APP_STATE.location.lat,
      lon: APP_STATE.location.lon,
      avatar: (APP_STATE.currentUser?.avatar && !APP_STATE.currentUser.avatar.includes('data:image/svg+xml')) ? APP_STATE.currentUser.avatar : getRegisteredUserAvatar(phone, DEFAULT_USER_AVATAR),
      badge: vehicleDetails ? 'വാഹന സർവീസ് രജിസ്ട്രേഷൻ' : 'തദ്ദേശവാസി രജിസ്ട്രേഷൻ',
      isCloud: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      reviews: [
        { user: 'സ്വാഗതം', rating: 5, date: 'ഇപ്പോൾ', text: 'നമ്മുടെ നാട് ആപ്പിലേക്ക് സ്വാഗതം!' }
      ]
    };
    APP_STATE.services.unshift(newService);
    try {
      localStorage.setItem('nn_services', JSON.stringify(APP_STATE.services));
    } catch (_) {}
    // Save to Supabase Cloud Database
    if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.saveService === 'function') {
      window.NN_SUPABASE_SERVICES.saveService(newService);
    }
    closeModal('modal-add-service');
    renderServicesScreen();
    renderHomeScreen();
    toast(`🎉 ${selectedIcon} ${typedTrade} സേവനം വിജയകരമായി രജിസ്റ്റർ ചെയ്തു!`);
  }
  window.submitServiceRegistration = submitServiceRegistration;
  // Dismiss dropdowns on outside click
  document.addEventListener('click', function(e) {
    const sDropdown = document.getElementById('servicesSearchSuggestions');
    if (sDropdown && !e.target.closest('#serviceSearchInput') && !e.target.closest('#servicesSearchSuggestions')) {
      sDropdown.style.display = 'none';
    }
    const tDropdown = document.getElementById('regTradeSuggestionsDropdown');
    if (tDropdown && !e.target.closest('#regServiceTrade') && !e.target.closest('#regTradeSuggestionsDropdown')) {
      tDropdown.style.display = 'none';
    }
  });
  // ==============================================================
  // 11B. 1-TAP QUICK SERVICE REQUEST & BROADCAST ENGINE
  // ==============================================================
  const QUICK_CAT_MAP = {
    plumber: { name: 'പ്ലംബർ', icon: '🚰' },
    electrician: { name: 'ഇലക്ട്രീഷ്യൻ', icon: '⚡' },
    driver: { name: 'ഡ്രൈവർ / വാഹനം', icon: '🛺' },
    acrepair: { name: 'എസി & ഫ്രിഡ്ജ്', icon: '❄️' },
    cleaning: { name: 'ക്ലീനിംഗ്', icon: '🧹' },
    carpenter: { name: 'ആശാരി', icon: '🪚' },
    painter: { name: 'പെയിന്റർ', icon: '🎨' },
    other: { name: 'മറ്റുള്ളവ', icon: '🛠️' }
  };
  window._quickReqPhotoBase64 = null;
  window._quickReqUrgency = 'urgent';
  function openQuickServiceModal(preferredCat) {
    const locInput = document.getElementById('quickReqLocation');
    const phoneInput = document.getElementById('quickReqPhone');
    const descInput = document.getElementById('quickReqDescription');
    if (locInput) locInput.value = (APP_STATE.location.name && !APP_STATE.location.name.includes('കണ്ണൂർ') && APP_STATE.location.name !== 'തത്സമയ ലൊക്കേഷൻ') ? APP_STATE.location.name : '';
    if (phoneInput) phoneInput.value = APP_STATE.currentUser.phone || '';
    if (descInput) descInput.value = '';
    removeQuickReqPhoto();
    if (preferredCat) {
      selectQuickReqCat(preferredCat);
    } else {
      selectQuickReqCat('plumber');
    }
    openModal('modal-quick-service-request');
  }
  window.openQuickServiceModal = openQuickServiceModal;

  function selectQuickReqCat(catId, el) {
    const hidden = document.getElementById('quickReqSelectedCategory');
    if (hidden) hidden.value = catId;

    const buttons = document.querySelectorAll('#quickRequestCatGrid .quick-cat-chip-btn');
    buttons.forEach(b => {
      if (b.getAttribute('data-cat') === catId) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });
  }
  window.selectQuickReqCat = selectQuickReqCat;

  function setQuickReqUrgency(val, el) {
    window._quickReqUrgency = val;
    const labels = document.querySelectorAll('.urgency-pill-radio');
    labels.forEach(l => l.classList.remove('active'));
    if (el) el.classList.add('active');
  }
  window.setQuickReqUrgency = setQuickReqUrgency;

  function handleQuickReqPhotoSelected(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    if (typeof toast === 'function') toast('⏳ ചിത്രം ഒപ്റ്റിമൈസ് ചെയ്യുന്നു...');
    smartCompressImage(file, { maxDim: 800, quality: 0.80 }, function(compressedBase64) {
      if (!compressedBase64) return;
      window._quickReqPhotoBase64 = compressedBase64;

      const previewBox = document.getElementById('quickReqPhotoPreviewBox');
      const previewImg = document.getElementById('quickReqPhotoPreview');
      if (previewBox && previewImg) {
        previewImg.src = compressedBase64;
        previewBox.style.display = 'block';
      }
    });
  }
  window.handleQuickReqPhotoSelected = handleQuickReqPhotoSelected;

  function removeQuickReqPhoto() {
    window._quickReqPhotoBase64 = null;
    const input = document.getElementById('quickReqPhotoInput');
    if (input) input.value = '';
    const previewBox = document.getElementById('quickReqPhotoPreviewBox');
    if (previewBox) previewBox.style.display = 'none';
  }
  window.removeQuickReqPhoto = removeQuickReqPhoto;

  function submitQuickServiceRequest(e) {
    if (e) e.preventDefault();
    const cat = document.getElementById('quickReqSelectedCategory').value || 'plumber';
    const desc = document.getElementById('quickReqDescription').value.trim();
    const loc = document.getElementById('quickReqLocation').value.trim() || APP_STATE.location.name;
    const phone = document.getElementById('quickReqPhone').value.trim();
    const urgency = window._quickReqUrgency || 'urgent';

    if (!desc) {
      toast('⚠️ ദയവായി ആവശ്യത്തിന്റെ വിവരണം നൽകുക');
      return;
    }

    const catInfo = QUICK_CAT_MAP[cat] || { name: 'സേവനം', icon: '🛠️' };

    const newReq = {
      id: 'req_' + Date.now(),
      category: cat,
      categoryName: catInfo.name,
      categoryIcon: catInfo.icon,
      description: desc,
      location: loc,
      phone: phone,
      urgency: urgency,
      photo: window._quickReqPhotoBase64 || null,
      status: 'broadcasting', // broadcasting -> accepted -> completed
      worker: null,
      timestamp: Date.now(),
      timeFormatted: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    if (!APP_STATE.serviceRequests) APP_STATE.serviceRequests = [];
    APP_STATE.serviceRequests.unshift(newReq);

    try {
      localStorage.setItem('nn_service_requests', JSON.stringify(APP_STATE.serviceRequests));
    } catch (_) {}

    // Broadcast to Supabase so matching registered service providers get alerted
    if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.saveServiceRequest === 'function') {
      window.NN_SUPABASE_SERVICES.saveServiceRequest({
        id: newReq.id,
        userId: APP_STATE.currentUser.id,
        trade: catInfo.name,
        category: cat,
        description: desc,
        location: loc,
        phone: phone,
        urgency: urgency,
        photo: window._quickReqPhotoBase64 || ''
      });
    }

    closeModal('modal-quick-service-request');
    removeQuickReqPhoto();
    renderActiveServiceTracker();

    toast(`🚀 നിങ്ങളുടെ ആവശ്യം അടുത്തുള്ള ${catInfo.name}മാർക്ക് അയച്ചു! ഉടൻ തിരിച്ചു വിളിക്കും.`);

    // REALISTIC WORKER MATCH SIMULATION:
    // After 4.5 seconds, matching nearby worker accepts the request!
    setTimeout(() => {
      const currentReq = (APP_STATE.serviceRequests || []).find(r => r.id === newReq.id);
      if (currentReq && currentReq.status === 'broadcasting') {
        // Find best matching worker
        let matched = (APP_STATE.services || []).find(s => s.category === cat);
        if (!matched) {
          matched = (APP_STATE.services || [])[0] || {
            id: 'srv_matched',
            name: 'സുരേഷ് കുമാർ',
            trade: `${catInfo.name} സർവീസ്`,
            phone: '+91 98471 23456',
            avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
            rating: '4.9 (42)'
          };
        }

        currentReq.status = 'accepted';
        currentReq.worker = matched;

        try {
          localStorage.setItem('nn_service_requests', JSON.stringify(APP_STATE.serviceRequests));
        } catch (_) {}

        renderActiveServiceTracker();
        toast(`🔔 ${matched.name} (${matched.trade}) നിങ്ങളുടെ റിക്വസ്റ്റ് സ്വീകരിച്ചു! [വിളിക്കുക/ചാറ്റ് ചെയ്യാം]`);
      }
    }, 4500);
  }
  window.submitQuickServiceRequest = submitQuickServiceRequest;

  function renderActiveServiceTracker() {
    const container = document.getElementById('homeActiveServiceTracker');
    if (container) container.innerHTML = '';
  }
  window.renderActiveServiceTracker = renderActiveServiceTracker;

  function cancelServiceRequest(reqId) {
    const req = (APP_STATE.serviceRequests || []).find(r => r.id === reqId);
    if (req) {
      req.status = 'cancelled';
      try {
        localStorage.setItem('nn_service_requests', JSON.stringify(APP_STATE.serviceRequests));
      } catch (_) {}
      renderActiveServiceTracker();
      toast('സേവന അഭ്യർത്ഥന റദ്ദാക്കി');
    }
  }
  window.cancelServiceRequest = cancelServiceRequest;

  function completeServiceRequest(reqId) {
    const req = (APP_STATE.serviceRequests || []).find(r => r.id === reqId);
    if (req) {
      req.status = 'completed';
      try {
        localStorage.setItem('nn_service_requests', JSON.stringify(APP_STATE.serviceRequests));
      } catch (_) {}
      renderActiveServiceTracker();
      toast('🎉 ജോലി വിജയകരമായി പൂർത്തിയായി!');
      if (req.worker && req.worker.id) {
        setTimeout(() => openServiceDetailModal(req.worker.id), 500);
      }
    }
  }
  window.completeServiceRequest = completeServiceRequest;

  function dismissReceivedEnquiry(reqId) {
    if (!APP_STATE.serviceRequests) return;
    APP_STATE.serviceRequests = APP_STATE.serviceRequests.filter(r => r.id !== reqId);
    try {
      localStorage.setItem('nn_service_requests', JSON.stringify(APP_STATE.serviceRequests));
    } catch (_) {}
    renderActiveServiceTracker();
  }
  window.dismissReceivedEnquiry = dismissReceivedEnquiry;
  // 12. EMERGENCY & BLOOD DONATION NETWORK
  // ==============================================================
  const BLOOD_GROUPS = ['all', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  function renderBloodGroupChips() {
    const bar = document.getElementById('bloodGroupsChipsBar');
    if (!bar) return;

    bar.innerHTML = BLOOD_GROUPS.map(grp => `
      <button class="blood-group-chip ${APP_STATE.activeBloodGroup === grp ? 'active' : ''}"
              onclick="filterBloodGroup('${grp}')">
        ${grp === 'all' ? 'എല്ലാം (All)' : grp}
      </button>
    `).join('');
  }

  function filterBloodGroup(grp) {
    APP_STATE.activeBloodGroup = grp;
    renderBloodGroupChips();
    renderBloodDonorsList();
  }
  window.filterBloodGroup = filterBloodGroup;

  function renderBloodScreen() {
    renderBloodGroupChips();
    renderBloodDonorsList();
  }

  function renderBloodDonorsList() {
    const container = document.getElementById('bloodDonorsListContainer');
    if (!container) return;

    const maxRadius = APP_STATE.radiusFilters.blood || APP_STATE.activeRadiusKm || 5;

    let list = [...(APP_STATE.bloodDonors || [])];
    // Calculate distance for each donor
    list.forEach(d => {
      d._calculatedDist = getItemDistanceKm(d, APP_STATE.location.lat, APP_STATE.location.lon);
    });
    list.sort((a, b) => a._calculatedDist - b._calculatedDist);

    // Filter by blood group
    if (APP_STATE.activeBloodGroup !== 'all') {
      list = list.filter(d => d.group === APP_STATE.activeBloodGroup);
    }

    // Apply radius filter strictly
    let inRadius = (maxRadius >= 1000) ? list : list.filter(d => d._calculatedDist <= maxRadius);

    if (inRadius.length === 0) {
      const radiusLabel = (maxRadius >= 1000) ? '' : ` (${maxRadius} km)`;
      container.innerHTML = `
        <div style="text-align:center;padding:32px 16px;background:#fff;border-radius:16px;border:1px dashed #FECACA">
          <div style="font-size:32px;margin-bottom:6px">🩸</div>
          <div style="font-weight:800;font-size:14px;color:#1E293B">ഈ പ്രദേശത്ത് രക്തദാതാക്കൾ ലഭ്യമല്ല</div>
          <div style="font-size:12px;color:#64748B;margin:4px 0 14px"><b>${escapeHtml(APP_STATE.location.name)}</b> പരിസരത്ത്${radiusLabel} രക്തദാതാക്കളെ കണ്ടെത്തിയില്ല. പരിധി കൂട്ടുകയോ രക്തദാതാവായി രജിസ്റ്റർ ചെയ്യുകയോ ചെയ്യാം.</div>
          <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
            <button onclick="setGlobalRadius(25, null)" style="padding:7px 12px;background:#FEF2F2;color:#DC2626;border:1px solid #FECACA;border-radius:10px;font-weight:700;font-size:11.5px;cursor:pointer">25 km</button>
            <button onclick="setGlobalRadius(1000, null)" style="padding:7px 12px;background:#EFF6FF;color:#2563EB;border:1px solid #BFDBFE;border-radius:10px;font-weight:700;font-size:11.5px;cursor:pointer">മുഴുവൻ കാണുക</button>
            <button onclick="openModal('modal-edit-profile')" style="padding:7px 14px;background:#DC2626;color:#fff;border:none;border-radius:10px;font-weight:800;font-size:11.5px;cursor:pointer">🩸 രക്തദാതാവാകാം</button>
          </div>
        </div>
      `;
      return;
    }

    container.innerHTML = bloodExtendedNotice + inRadius.map(d => {
      const donorAvatar = getRegisteredUserAvatar(d.phone || d.id || d.name);
      return `
      <div style="background:#fff;border-radius:16px;padding:14px;border:1px solid #FECACA;display:flex;align-items:center;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.03)">
        <div style="display:flex;align-items:center;gap:12px">
          <div style="position:relative;width:46px;height:46px;flex-shrink:0">
            <img src="${donorAvatar}" alt="${escapeHtml(d.name || 'രക്തദാതാവ്')}" style="width:46px;height:46px;border-radius:50%;object-fit:cover;border:2px solid #FECACA" onerror="this.src=window.DEFAULT_USER_AVATAR||''">
            <span style="position:absolute;bottom:-2px;right:-2px;background:#DC2626;color:#fff;font-size:9.5px;font-weight:900;padding:1px 5px;border-radius:6px;border:1.5px solid #fff;line-height:1.2">${d.group || 'O+'}</span>
          </div>
          <div>
            <div style="font-weight:800;font-size:14px;color:#111827">${escapeHtml(d.name || 'രക്തദാതാവ്')}</div>
            <div style="font-size:11px;color:#6B7280">📍 ${escapeHtml(resolveItemLocation(d) || APP_STATE.location.name || 'തത്സമയ ലൊക്കേഷൻ')} • <span style="color:#059669;font-weight:800">${d._calculatedDist} km അകലെ</span>${d.status ? ` • <span style="color:#10B981;font-weight:700">${escapeHtml(d.status)}</span>` : ''}</div>
          </div>
        </div>
        <div>
          <button onclick="openChatForDonor('${(d.name || 'രക്തദാതാവ്').replace(/'/g, "\\'")}', '${d.phone || ''}', '${d.group || 'O+'}')" style="background:linear-gradient(135deg, #DC2626 0%, #B91C1C 100%);color:#fff;border:none;padding:9px 14px;border-radius:10px;cursor:pointer;font-size:12.5px;font-weight:800;display:flex;align-items:center;gap:6px;box-shadow:0 2px 6px rgba(220,38,38,0.25)">
            <span>💬 ചാറ്റ്</span>
          </button>
        </div>
      </div>
    `;
    }).join('');
  }

  function openBloodModal() {
    navTo('blood');
  }
  window.openBloodModal = openBloodModal;

  function openBloodRequestModal() {
    openModal('modal-blood-request');
  }
  window.openBloodRequestModal = openBloodRequestModal;

  function submitBloodRequest(e) {
    if (e) e.preventDefault();
    const patient = (document.getElementById('bReqPatient')?.value || '').trim();
    const age = (document.getElementById('bReqAge')?.value || '').trim();
    const hospital = (document.getElementById('bReqHospital')?.value || '').trim();
    const ipNo = (document.getElementById('bReqIpNo')?.value || '').trim();
    const bystander = (document.getElementById('bReqBystander')?.value || '').trim();
    const group = document.getElementById('bReqGroup')?.value || 'O+';
    const units = (document.getElementById('bReqUnits')?.value || '').trim() || '1';
    const phone = (document.getElementById('bReqPhone')?.value || '').trim();
    const showPhone = document.getElementById('bReqShowPhone')?.checked || false;
    const declaration = document.getElementById('bReqDeclaration')?.checked;

    if (!patient || !hospital || !phone || !bystander) {
      toast('⚠️ ദയവായി രോഗിയുടെ പേര്, ആശുപത്രി, കൂട്ടിരിപ്പുകാരൻ, ഫോൺ നൽകുക.');
      return;
    }

    if (!declaration) {
      toast('⚠️ സൗജന്യ രക്തദാന സത്യവാങ്മൂലം അംഗീകരിക്കേണ്ടതാണ്.');
      return;
    }

    const contactDisplay = showPhone ? `${phone} (ചാറ്റ് ചെയ്യാം)` : '🔒 നമ്പർ രഹസ്യമാണ് (താഴെയുള്ള "ചാറ്റ്" വഴി സന്ദേശമയക്കുക)';

    // Automatically create an urgent post in Community Feed as well
    const urgentPost = {
      id: 'post_blood_' + Date.now(),
      authorId: APP_STATE.currentUser.id,
      authorName: APP_STATE.currentUser.name,
      authorPhone: showPhone ? phone : '',
      authorAvatar: APP_STATE.currentUser.avatar,
      authorLocation: hospital,
      authorBlood: group,
      type: 'announcement',
      content: `🚨 അടിയന്തര രക്ത ആവശ്യം (URGENT BLOOD REQUIRED) 🩸\n\nരോഗി: ${patient}${age ? ' (' + age + ')' : ''}\nരക്തഗ്രൂപ്പ്: ${group} (${units} യൂണിറ്റ്)\nആശുപത്രി: ${hospital}\n${ipNo ? 'IP/OP വിവരം: ' + ipNo + '\n' : ''}കൂട്ടിരിപ്പുകാരൻ: ${bystander}\nബന്ധപ്പെടാൻ: ${contactDisplay}\n\n⚖️ സത്യവാങ്മൂലം: സൗജന്യ സന്നദ്ധ രക്തദാനം (Drugs & Cosmetics Act പ്രകാരം വാണിജ്യപരമായ ക്രയവിക്രയം പാടില്ല)`,
      image: '',
      timestamp: 'ഇപ്പോൾ',
      likes: 0,
      isLiked: false,
      isCurrentUser: true,
      lat: APP_STATE.location.lat,
      lon: APP_STATE.location.lon,
      isBloodRequest: true,
      bloodGroup: group,
      showPhone: showPhone
    };

    APP_STATE.posts.unshift(urgentPost);
    savePosts();

    // Broadcast blood request to Supabase
    if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.saveBloodRequest === 'function') {
      window.NN_SUPABASE_SERVICES.saveBloodRequest({
        id: 'breq_' + Date.now(),
        patientName: patient,
        patientAge: age,
        group: group,
        bloodGroup: group,
        units: units,
        hospital: hospital,
        ipNo: ipNo,
        bystander: bystander,
        phone: phone,
        showPhone: showPhone,
        neededBy: 'അടിയന്തിരം',
        lat: APP_STATE.location.lat,
        lon: APP_STATE.location.lon,
        location: APP_STATE.location.name
      });
      if (typeof window.NN_SUPABASE_SERVICES.savePost === 'function') {
        window.NN_SUPABASE_SERVICES.savePost(urgentPost);
      }
    }

    closeModal('modal-blood-request');
    toast('🚨 അടിയന്തര രക്ത ആവശ്യം കമ്മ്യൂണിറ്റിയിലേക്ക് ബ്രോഡ്കാസ്റ്റ് ചെയ്തു!');
    navTo('community');
  }
  window.submitBloodRequest = submitBloodRequest;

  // ==============================================================
  // 11B. EMERGENCY CONTACTS DIRECTORY & REALTIME HUB
  // ==============================================================
  const DEFAULT_EMERGENCY_CONTACTS = [
    {
      id: 'emg_112',
      name: 'നാഷണൽ എമർജൻസി നമ്പർ (ERSS)',
      phone: '112',
      category: 'police',
      categoryName: 'പോലീസ് & അത്യാഹിതം',
      icon: '🚨',
      location: 'കേരളം ഒട്ടാകെ (All Kerala)',
      description: 'പോലീസ്, ഫയർ, ആംബുലൻസ് സംയോജിത 24x7 അടിയന്തര സേവനം'
    },
    {
      id: 'emg_108',
      name: 'കനിവ് 108 ആംബുലൻസ് സർവീസ്',
      phone: '108',
      category: 'medical',
      categoryName: 'ആരോഗ്യം & ആംബുലൻസ്',
      icon: '🚑',
      location: 'കേരളം ഒട്ടാകെ (All Kerala)',
      description: 'സൗജന്യ അടിയന്തിര മെഡിക്കൽ ആംബുലൻസ് സർവീസ് 24x7'
    },
    {
      id: 'emg_101',
      name: 'ഫയർ & റെസ്ക്യൂ സർവീസ് (Fire Force)',
      phone: '101',
      category: 'fire',
      categoryName: 'ഫയർ ഫോഴ്സ്',
      icon: '🚒',
      location: 'കേരളം ഒട്ടാകെ (All Kerala)',
      description: 'തീപിടുത്തം, വെള്ളപ്പൊക്കം, രക്ഷാപ്രവർത്തനം'
    },
    {
      id: 'emg_100',
      name: 'കേരള പോലീസ് കൺട്രോൾ റൂം',
      phone: '100',
      category: 'police',
      categoryName: 'പോലീസ്',
      icon: '👮',
      location: 'കേരളം ഒട്ടാകെ (All Kerala)',
      description: 'ക്രമസമാധാനം, അടിയന്തര പോലീസ് സഹായം'
    },
    {
      id: 'emg_1091',
      name: 'വനിതാ ഹെൽപ്പ്‌ലൈൻ (Women Helpline)',
      phone: '1091',
      category: 'women',
      categoryName: 'വനിതാ സഹായം',
      icon: '👩',
      location: 'കേരളം ഒട്ടാകെ (All Kerala)',
      description: 'സ്ത്രീകൾക്കെതിരെയുള്ള അതിക്രമങ്ങൾ തടയൽ & സഹായം'
    },
    {
      id: 'emg_181',
      name: 'മിത്ര 181 വുമൺ ഇൻ ഡിസ്ട്രസ്സ്',
      phone: '181',
      category: 'women',
      categoryName: 'വനിതാ സഹായം',
      icon: '🛡️',
      location: 'കേരളം ഒട്ടാകെ (All Kerala)',
      description: 'വനിതാ ശിശു വികസന വകുപ്പ് 24 മണിക്കൂർ ഹെൽപ്പ്‌ലൈൻ'
    },
    {
      id: 'emg_1098',
      name: 'ചൈൽഡ്‌ലൈൻ (Childline India)',
      phone: '1098',
      category: 'utility',
      categoryName: 'കുട്ടികളുടെ സുരക്ഷ',
      icon: '👶',
      location: 'ഇന്ത്യ ഒട്ടാകെ',
      description: 'കുട്ടികളുടെ അവകാശ സംരക്ഷണവും സഹായവും'
    },
    {
      id: 'emg_1912',
      name: 'KSEB എമർജൻസി കൺട്രോൾ റൂം',
      phone: '1912',
      category: 'utility',
      categoryName: 'വൈദ്യുതി (KSEB)',
      icon: '⚡',
      location: 'കേരളം ഒട്ടാകെ',
      description: 'വൈദ്യുത തകരാറുകൾ, അപകടങ്ങൾ 24x7 റിപ്പോർട്ട് ചെയ്യാം'
    },
    {
      id: 'emg_1056',
      name: 'ദിശ 1056 (DISHA Health Helpline)',
      phone: '1056',
      category: 'medical',
      categoryName: 'ആരോഗ്യ സംശയം',
      icon: '🩺',
      location: 'കേരളം ഒട്ടാകെ',
      description: 'ആരോഗ്യ സംശയങ്ങൾ, മാനസികാരോഗ്യ കൗൺസിലിംഗ്'
    },
    {
      id: 'emg_1077',
      name: 'ദുരന്ത നിവാരണ അതോറിറ്റി (Disaster Helpline)',
      phone: '1077',
      category: 'utility',
      categoryName: 'ദുരന്ത നിവാരണം',
      icon: '⚠️',
      location: 'ജില്ലാ തലത്തിൽ',
      description: 'പ്രകൃതി ദുരന്തങ്ങൾ, മുന്നറിയിപ്പുകൾ, സഹായം'
    },

    // ==============================================================
    // KERALA POLICE STATIONS DIRECTORY (ALL 14 DISTRICTS LANDLINES)
    // ==============================================================
    // 1. THIRUVANANTHAPURAM
    { id: 'pol_tvm_cr', name: 'തിരുവനന്തപുരം സിറ്റി പോലീസ് കൺട്രോൾ റൂം', phone: '0471-2335400', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'തിരുവനന്തപുരം സിറ്റി', description: '24 മണിക്കൂർ സിറ്റി പോലീസ് കൺട്രോൾ റൂം ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_tvm_rural_cr', name: 'തിരുവനന്തപുരം റൂറൽ പോലീസ് കൺട്രോൾ റൂം', phone: '0471-2313626', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'തിരുവനന്തപുരം റൂറൽ', description: 'തിരുവനന്തപുരം റൂറൽ ജില്ലാ പോലീസ് കൺട്രോൾ റൂം' },
    { id: 'pol_tvm_cant', name: 'കന്റോൺമെന്റ് പോലീസ് സ്റ്റേഷൻ', phone: '0471-2330343', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'തിരുവനന്തപുരം നഗരം', description: 'കന്റോൺമെന്റ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ (24x7)' },
    { id: 'pol_tvm_thampanoor', name: 'തമ്പാനൂർ പോലീസ് സ്റ്റേഷൻ', phone: '0471-2326543', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'തമ്പാനൂർ, തിരുവനന്തപുരം', description: 'തമ്പാനൂർ റെയിൽവേ സ്റ്റേഷൻ / ബസ് സ്റ്റാൻഡ് പരിസരം' },
    { id: 'pol_tvm_museum', name: 'മ്യൂസിയം പോലീസ് സ്റ്റേഷൻ', phone: '0471-2315096', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'മ്യൂസിയം, തിരുവനന്തപുരം', description: 'മ്യൂസിയം പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_tvm_fort', name: 'ഫോർട്ട് പോലീസ് സ്റ്റേഷൻ', phone: '0471-2473839', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'കിഴക്കേക്കോട്ട, തിരുവനന്തപുരം', description: 'ഫോർട്ട് പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_tvm_med', name: 'മെഡിക്കൽ കോളേജ് പോലീസ് സ്റ്റേഷൻ', phone: '0471-2443040', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'മെഡിക്കൽ കോളേജ്, തിരുവനന്തപുരം', description: 'മെഡിക്കൽ കോളേജ് പോലീസ് ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_tvm_peroorkada', name: 'പേരൂർക്കട പോലീസ് സ്റ്റേഷൻ', phone: '0471-2433840', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'പേരൂർക്കട, തിരുവനന്തപുരം', description: 'പേരൂർക്കട പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_tvm_kazhakkoottam', name: 'കഴക്കൂട്ടം പോലീസ് സ്റ്റേഷൻ', phone: '0471-2418231', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'കഴക്കൂട്ടം, ടെക്നോപാർക്ക്', description: 'കഴക്കൂട്ടം & ടെക്നോപാർക്ക് പരിധി' },
    { id: 'pol_tvm_nedumangad', name: 'നെടുമങ്ങാട് പോലീസ് സ്റ്റേഷൻ', phone: '0472-2802225', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'നെടുമങ്ങാട്, തിരുവനന്തപുരം', description: 'നെടുമങ്ങാട് പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_tvm_neyyattinkara', name: 'നെയ്യാറ്റിൻകര പോലീസ് സ്റ്റേഷൻ', phone: '0471-2222223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'നെയ്യാറ്റിൻകര, തിരുവനന്തപുരം', description: 'നെയ്യാറ്റിൻകര പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_tvm_attingal', name: 'ആറ്റിങ്ങൽ പോലീസ് സ്റ്റേഷൻ', phone: '0470-2622026', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'ആറ്റിങ്ങൽ, തിരുവനന്തപുരം', description: 'ആറ്റിങ്ങൽ പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_tvm_varkala', name: 'വർക്കല പോലീസ് സ്റ്റേഷൻ', phone: '0470-2602333', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'വർക്കല, തിരുവനന്തപുരം', description: 'വർക്കല തീരദേശ & ടൂറിസം പോലീസ്' },
    { id: 'pol_tvm_nemom', name: 'നേമം പോലീസ് സ്റ്റേഷൻ', phone: '0471-2390234', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'നേമം, തിരുവനന്തപുരം', description: 'നേമം പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },

    // 2. KOLLAM
    { id: 'pol_klm_city_cr', name: 'കൊല്ലം സിറ്റി പോലീസ് കൺട്രോൾ റൂം', phone: '0474-2764477', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'കൊല്ലം സിറ്റി', description: 'കൊല്ലം സിറ്റി കൺട്രോൾ റൂം ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_klm_rural_cr', name: 'കൊല്ലം റൂറൽ കൺട്രോൾ റൂം (കൊട്ടാരക്കര)', phone: '0474-2454522', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'കൊട്ടാരക്കര, കൊല്ലം', description: 'കൊല്ലം റൂറൽ ജില്ലാ പോലീസ് കൺട്രോൾ റൂം' },
    { id: 'pol_klm_east', name: 'കൊല്ലം ഈസ്റ്റ് പോലീസ് സ്റ്റേഷൻ', phone: '0474-2742263', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'കൊല്ലം നഗരം', description: 'കൊല്ലം ഈസ്റ്റ് പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_klm_west', name: 'കൊല്ലം വെസ്റ്റ് പോലീസ് സ്റ്റേഷൻ', phone: '0474-2794333', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'കൊല്ലം വെസ്റ്റ്', description: 'കൊല്ലം വെസ്റ്റ് പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_klm_eravipuram', name: 'ഇരവിപുരം പോലീസ് സ്റ്റേഷൻ', phone: '0474-2725450', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'ഇരവിപുരം, കൊല്ലം', description: 'ഇരവിപുരം പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_klm_karunagappally', name: 'കരുനാഗപ്പള്ളി പോലീസ് സ്റ്റേഷൻ', phone: '0476-2620240', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'കരുനാഗപ്പള്ളി, കൊല്ലം', description: 'കരുനാഗപ്പള്ളി പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_klm_kottarakkara', name: 'കൊട്ടാരക്കര പോലീസ് സ്റ്റേഷൻ', phone: '0474-2454222', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'കൊട്ടാരക്കര, കൊല്ലം', description: 'കൊട്ടാരക്കര പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_klm_punalur', name: 'പുനലൂർ പോലീസ് സ്റ്റേഷൻ', phone: '0475-2222223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'പുനലൂർ, കൊല്ലം', description: 'പുനലൂർ പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_klm_sasthamcotta', name: 'ശാസ്താംകോട്ട പോലീസ് സ്റ്റേഷൻ', phone: '0476-2830230', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'ശാസ്താംകോട്ട, കൊല്ലം', description: 'ശാസ്താംകോട്ട പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_klm_chavara', name: 'ചവറ പോലീസ് സ്റ്റേഷൻ', phone: '0476-2680234', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'ചവറ, കൊല്ലം', description: 'ചവറ പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_klm_paravur', name: 'പരവൂർ പോലീസ് സ്റ്റേഷൻ', phone: '0474-2512233', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'പരവൂർ, കൊല്ലം', description: 'പരവൂർ പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_klm_anchal', name: 'അഞ്ചൽ പോലീസ് സ്റ്റേഷൻ', phone: '0475-2270233', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'അഞ്ചൽ, കൊല്ലം', description: 'അഞ്ചൽ പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },

    // 3. PATHANAMTHITTA
    { id: 'pol_pta_cr', name: 'പത്തനംതിട്ട ജില്ലാ പോലീസ് കൺട്രോൾ റൂം', phone: '0468-2222227', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'പത്തനംതിട്ട (Pathanamthitta)', description: 'ജില്ലാ പോലീസ് കൺട്രോൾ റൂം ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_pta_town', name: 'പത്തനംതിട്ട പോലീസ് സ്റ്റേഷൻ', phone: '0468-2222223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'പത്തനംതിട്ട നഗരം', description: 'പത്തനംതിട്ട ടൗൺ പോലീസ് സ്റ്റേഷൻ' },
    { id: 'pol_pta_adoor', name: 'അടൂർ പോലീസ് സ്റ്റേഷൻ', phone: '04734-224823', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'അടൂർ, പത്തനംതിട്ട', description: 'അടൂർ പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_pta_thiruvalla', name: 'തിരുവല്ല പോലീസ് സ്റ്റേഷൻ', phone: '0469-2601222', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'തിരുവല്ല, പത്തനംതിട്ട', description: 'തിരുവല്ല പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_pta_ranni', name: 'റാന്നി പോലീസ് സ്റ്റേഷൻ', phone: '04735-227223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'റാന്നി, പത്തനംതിട്ട', description: 'റാന്നി പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_pta_konni', name: 'കോന്നി പോലീസ് സ്റ്റേഷൻ', phone: '0468-2244223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'കോന്നി, പത്തനംതിട്ട', description: 'കോന്നി പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_pta_pandalam', name: 'പന്തളം പോലീസ് സ്റ്റേഷൻ', phone: '04734-252223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'പന്തളം, പത്തനംതിട്ട', description: 'പന്തളം പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_pta_kozhencherry', name: 'കോഴഞ്ചേരി പോലീസ് സ്റ്റേഷൻ', phone: '0468-2212223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'കോഴഞ്ചേരി, പത്തനംതിട്ട', description: 'കോഴഞ്ചേരി പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },

    // 4. ALAPPUZHA
    { id: 'pol_alp_cr', name: 'ആലപ്പുഴ ജില്ലാ പോലീസ് കൺട്രോൾ റൂം', phone: '0477-2230804', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'ആലപ്പുഴ (Alappuzha)', description: 'ആലപ്പുഴ കൺട്രോൾ റൂം ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_alp_south', name: 'ആലപ്പുഴ സൗത്ത് പോലീസ് സ്റ്റേഷൻ', phone: '0477-2251336', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'ആലപ്പുഴ നഗരം', description: 'ആലപ്പുഴ സൗത്ത് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_alp_north', name: 'ആലപ്പുഴ നോർത്ത് പോലീസ് സ്റ്റേഷൻ', phone: '0477-2251222', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'ആലപ്പുഴ നോർത്ത്', description: 'ആലപ്പുഴ നോർത്ത് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_alp_cherthala', name: 'ചേർത്തല പോലീസ് സ്റ്റേഷൻ', phone: '0478-2813233', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'ചേർത്തല, ആലപ്പുഴ', description: 'ചേർത്തല പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_alp_kayamkulam', name: 'കായംകുളം പോലീസ് സ്റ്റേഷൻ', phone: '0479-2442223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'കായംകുളം, ആലപ്പുഴ', description: 'കായംകുളം പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_alp_mavelikkara', name: 'മാവേലിക്കര പോലീസ് സ്റ്റേഷൻ', phone: '0479-2302223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'മാവേലിക്കര, ആലപ്പുഴ', description: 'മാവേലിക്കര പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_alp_chengannur', name: 'ചെങ്ങന്നൂർ പോലീസ് സ്റ്റേഷൻ', phone: '0479-2452223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'ചെങ്ങന്നൂർ, ആലപ്പുഴ', description: 'ചെങ്ങന്നൂർ പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_alp_ambalappuzha', name: 'അമ്പലപ്പുഴ പോലീസ് സ്റ്റേഷൻ', phone: '0477-2272223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'അമ്പലപ്പുഴ, ആലപ്പുഴ', description: 'അമ്പലപ്പുഴ പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_alp_harippad', name: 'ഹരിപ്പാട് പോലീസ് സ്റ്റേഷൻ', phone: '0479-2412233', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'ഹരിപ്പാട്, ആലപ്പുഴ', description: 'ഹരിപ്പാട് പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_alp_aroor', name: 'അരൂർ പോലീസ് സ്റ്റേഷൻ', phone: '0478-2872223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'അരൂർ, ആലപ്പുഴ', description: 'അരൂർ പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },

    // 5. KOTTAYAM
    { id: 'pol_ktm_cr', name: 'കോട്ടയം ജില്ലാ പോലീസ് കൺട്രോൾ റൂം', phone: '0481-2562222', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'കോട്ടയം (Kottayam)', description: 'കോട്ടയം കൺട്രോൾ റൂം ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_ktm_west', name: 'കോട്ടയം വെസ്റ്റ് പോലീസ് സ്റ്റേഷൻ', phone: '0481-2560317', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'കോട്ടയം ടൗൺ', description: 'കോട്ടയം വെസ്റ്റ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_ktm_east', name: 'കോട്ടയം ഈസ്റ്റ് പോലീസ് സ്റ്റേഷൻ', phone: '0481-2563333', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'കോട്ടയം ഈസ്റ്റ്', description: 'കോട്ടയം ഈസ്റ്റ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_ktm_changanassery', name: 'ചങ്ങനാശ്ശേരി പോലീസ് സ്റ്റേഷൻ', phone: '0481-2420100', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'ചങ്ങനാശ്ശേരി, കോട്ടയം', description: 'ചങ്ങനാശ്ശേരി പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_ktm_pala', name: 'പാലാ പോലീസ് സ്റ്റേഷൻ', phone: '04822-212223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'പാലാ, കോട്ടയം', description: 'പാലാ പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_ktm_kanjirappally', name: 'കാഞ്ഞിരപ്പള്ളി പോലീസ് സ്റ്റേഷൻ', phone: '04828-202223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'കാഞ്ഞിരപ്പള്ളി, കോട്ടയം', description: 'കാഞ്ഞിരപ്പള്ളി പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_ktm_vaikom', name: 'വൈക്കം പോലീസ് സ്റ്റേഷൻ', phone: '04829-215823', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'വൈക്കം, കോട്ടയം', description: 'വൈക്കം പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_ktm_ettumanoor', name: 'ഏറ്റുമാനൂർ പോലീസ് സ്റ്റേഷൻ', phone: '0481-2535544', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'ഏറ്റുമാനൂർ, കോട്ടയം', description: 'ഏറ്റുമാനൂർ പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_ktm_erattupetta', name: 'ഈരാറ്റുപേട്ട പോലീസ് സ്റ്റേഷൻ', phone: '04822-272223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'ഈരാറ്റുപേട്ട, കോട്ടയം', description: 'ഈരാറ്റുപേട്ട പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_ktm_gandhinagar', name: 'ഗാന്ധിനഗർ (മെഡിക്കൽ കോളേജ്) പോലീസ് സ്റ്റേഷൻ', phone: '0481-2597233', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'ഗാന്ധിനഗർ, കോട്ടയം', description: 'കോട്ടയം മെഡിക്കൽ കോളേജ് പോലീസ്' },

    // 6. IDUKKI
    { id: 'pol_idk_cr', name: 'ഇടുക്കി ജില്ലാ പോലീസ് കൺട്രോൾ റൂം', phone: '04862-232323', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'ഇടുക്കി (Idukki)', description: 'ഇടുക്കി ജില്ലാ കൺട്രോൾ റൂം ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_idk_thodupuzha', name: 'തൊടുപുഴ പോലീസ് സ്റ്റേഷൻ', phone: '04862-222223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'തൊടുപുഴ, ഇടുക്കി', description: 'തൊടുപുഴ പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_idk_kattappana', name: 'കട്ടപ്പന പോലീസ് സ്റ്റേഷൻ', phone: '04868-272223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'കട്ടപ്പന, ഇടുക്കി', description: 'കട്ടപ്പന പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_idk_munnar', name: 'മൂന്നാർ പോലീസ് സ്റ്റേഷൻ', phone: '04865-230321', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'മൂന്നാർ, ഇടുക്കി', description: 'മൂന്നാർ ടൂറിസം & പോലീസ് സ്റ്റേഷൻ' },
    { id: 'pol_idk_adimali', name: 'അടിമാലി പോലീസ് സ്റ്റേഷൻ', phone: '04864-222223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'അടിമാലി, ഇടുക്കി', description: 'അടിമാലി പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_idk_nedumkandam', name: 'നെടുങ്കണ്ടം പോലീസ് സ്റ്റേഷൻ', phone: '04868-232123', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'നെടുങ്കണ്ടം, ഇടുക്കി', description: 'നെടുങ്കണ്ടം പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_idk_painavu', name: 'പൈനാവ് / ഇടുക്കി പോലീസ് സ്റ്റേഷൻ', phone: '04862-232233', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'പൈനാവ്, ഇടുക്കി', description: 'ഇടുക്കി കളക്ടറേറ്റ് & പൈനാവ് പോലീസ്' },
    { id: 'pol_idk_peerumade', name: 'പീരുമേട് പോലീസ് സ്റ്റേഷൻ', phone: '04869-232223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'പീരുമേട്, ഇടുക്കി', description: 'പീരുമേട് പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_idk_vandiperiyar', name: 'വണ്ടിപ്പെരിയാർ പോലീസ് സ്റ്റേഷൻ', phone: '04869-252223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'വണ്ടിപ്പെരിയാർ, ഇടുക്കി', description: 'വണ്ടിപ്പെരിയാർ പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },

    // 7. ERNAKULAM
    { id: 'pol_ekm_city_cr', name: 'കൊച്ചി സിറ്റി പോലീസ് കൺട്രോൾ റൂം', phone: '0484-2394200', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'കൊച്ചി സിറ്റി (Kochi City)', description: 'കൊച്ചി സിറ്റി കൺട്രോൾ റൂം ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_ekm_rural_cr', name: 'എറണാകുളം റൂറൽ കൺട്രോൾ റൂം (ആലുവ)', phone: '0484-2623788', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'ആലുവ, എറണാകുളം', description: 'എറണാകുളം റൂറൽ ജില്ലാ കൺട്രോൾ റൂം' },
    { id: 'pol_ekm_central', name: 'എറണാകുളം സെൻട്രൽ പോലീസ് സ്റ്റേഷൻ', phone: '0484-2394500', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'എറണാകുളം എം.ജി റോഡ്', description: 'എറണാകുളം സെൻട്രൽ സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_ekm_south', name: 'എറണാകുളം സൗത്ത് പോലീസ് സ്റ്റേഷൻ', phone: '0484-2359100', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'എറണാകുളം സൗത്ത്', description: 'സൗത്ത് റെയിൽവേ സ്റ്റേഷൻ പരിസരം' },
    { id: 'pol_ekm_north', name: 'എറണാകുളം നോർത്ത് പോലീസ് സ്റ്റേഷൻ', phone: '0484-2390100', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'എറണാകുളം നോർത്ത്', description: 'കലൂർ / നോർത്ത് പോലീസ് സ്റ്റേഷൻ' },
    { id: 'pol_ekm_fortkochi', name: 'ഫോർട്ട് കൊച്ചി പോലീസ് സ്റ്റേഷൻ', phone: '0484-2215055', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'ഫോർട്ട് കൊച്ചി', description: 'ഫോർട്ട് കൊച്ചി പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_ekm_mattancherry', name: 'മട്ടാഞ്ചേരി പോലീസ് സ്റ്റേഷൻ', phone: '0484-2224040', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'മട്ടാഞ്ചേരി, കൊച്ചി', description: 'മട്ടാഞ്ചേരി പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_ekm_thrikkakara', name: 'തൃക്കാക്കര പോലീസ് സ്റ്റേഷൻ', phone: '0484-2422226', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'തൃക്കാക്കര, കാക്കനാട്', description: 'കാക്കനാട് ഇൻഫോപാർക്ക് & കളക്ടറേറ്റ്' },
    { id: 'pol_ekm_kalamassery', name: 'കളമശ്ശേരി പോലീസ് സ്റ്റേഷൻ', phone: '0484-2541010', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'കളമശ്ശേരി, കൊച്ചി', description: 'കളമശ്ശേരി പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_ekm_palarivattom', name: 'പാലാരിവട്ടം പോലീസ് സ്റ്റേഷൻ', phone: '0484-2337770', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'പാലാരിവട്ടം, കൊച്ചി', description: 'പാലാരിവട്ടം പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_ekm_aluva', name: 'ആലുവ പോലീസ് സ്റ്റേഷൻ', phone: '0484-2624023', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'ആലുവ, എറണാകുളം', description: 'ആലുവ ടൗൺ പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_ekm_angamaly', name: 'അങ്കമാലി പോലീസ് സ്റ്റേഷൻ', phone: '0484-2452323', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'അങ്കമാലി (നെടുമ്പാശ്ശേരി)', description: 'അങ്കമാലി & എയർപോർട്ട് പരിധി' },
    { id: 'pol_ekm_perumbavoor', name: 'പെരുമ്പാവൂർ പോലീസ് സ്റ്റേഷൻ', phone: '0484-2523220', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'പെരുമ്പാവൂർ, എറണാകുളം', description: 'പെരുമ്പാവൂർ പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_ekm_muvattupuzha', name: 'മൂവാറ്റുപുഴ പോലീസ് സ്റ്റേഷൻ', phone: '0485-2832304', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'മൂവാറ്റുപുഴ, എറണാകുളം', description: 'മൂവാറ്റുപുഴ പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_ekm_kothamangalam', name: 'കോതമംഗലം പോലീസ് സ്റ്റേഷൻ', phone: '0485-2862329', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'കോതമംഗലം, എറണാകുളം', description: 'കോതമംഗലം പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_ekm_paravur', name: 'നോർത്ത് പറവൂർ പോലീസ് സ്റ്റേഷൻ', phone: '0484-2442223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'നോർത്ത് പറവൂർ, എറണാകുളം', description: 'പറവൂർ പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_ekm_tripunithura', name: 'തൃപ്പൂണിത്തുറ പോലീസ് സ്റ്റേഷൻ', phone: '0484-2777233', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'തൃപ്പൂണിത്തുറ, കൊച്ചി', description: 'തൃപ്പൂണിത്തുറ ഹിൽപാലസ് പോലീസ്' },

    // 8. THRISSUR
    { id: 'pol_tsr_city_cr', name: 'തൃശ്ശൂർ സിറ്റി പോലീസ് കൺട്രോൾ റൂം', phone: '0487-2424193', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'തൃശ്ശൂർ സിറ്റി (Thrissur City)', description: 'തൃശ്ശൂർ സിറ്റി കൺട്രോൾ റൂം ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_tsr_rural_cr', name: 'തൃശ്ശൂർ റൂറൽ കൺട്രോൾ റൂം', phone: '0487-2361000', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'തൃശ്ശൂർ റൂറൽ', description: 'തൃശ്ശൂർ റൂറൽ ജില്ലാ കൺട്രോൾ റൂം' },
    { id: 'pol_tsr_east', name: 'തൃശ്ശൂർ ഈസ്റ്റ് പോലീസ് സ്റ്റേഷൻ', phone: '0487-2424193', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'തൃശ്ശൂർ നഗരം', description: 'തൃശ്ശൂർ ഈസ്റ്റ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_tsr_west', name: 'തൃശ്ശൂർ വെസ്റ്റ് പോലീസ് സ്റ്റേഷൻ', phone: '0487-2360220', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'തൃശ്ശൂർ വെസ്റ്റ്', description: 'തൃശ്ശൂർ വെസ്റ്റ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_tsr_guruvayur', name: 'ഗുരുവായൂർ പോലീസ് സ്റ്റേഷൻ', phone: '0487-2556333', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'ഗുരുവായൂർ, തൃശ്ശൂർ', description: 'ഗുരുവായൂർ ക്ഷേത്ര നഗരം പോലീസ്' },
    { id: 'pol_tsr_kunnamkulam', name: 'കുന്നംകുളം പോലീസ് സ്റ്റേഷൻ', phone: '04885-222223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'കുന്നംകുളം, തൃശ്ശൂർ', description: 'കുന്നംകുളം പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_tsr_chalakudy', name: 'ചാലക്കുടി പോലീസ് സ്റ്റേഷൻ', phone: '0480-2701223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'ചാലക്കുടി, തൃശ്ശൂർ', description: 'ചാലക്കുടി പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_tsr_kodungallur', name: 'കൊടുങ്ങല്ലൂർ പോലീസ് സ്റ്റേഷൻ', phone: '0480-2802223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'കൊടുങ്ങല്ലൂർ, തൃശ്ശൂർ', description: 'കൊടുങ്ങല്ലൂർ പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_tsr_irinjalakuda', name: 'ഇരിഞ്ഞാലക്കുട പോലീസ് സ്റ്റേഷൻ', phone: '0480-2825223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'ഇരിഞ്ഞാലക്കുട, തൃശ്ശൂർ', description: 'ഇരിഞ്ഞാലക്കുട പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_tsr_wadakkanchery', name: 'വടക്കാഞ്ചേരി പോലീസ് സ്റ്റേഷൻ', phone: '04884-232223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'വടക്കാഞ്ചേരി, തൃശ്ശൂർ', description: 'വടക്കാഞ്ചേരി പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_tsr_chavakkad', name: 'ചാവക്കാട് പോലീസ് സ്റ്റേഷൻ', phone: '0487-2507233', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'ചാവക്കാട്, തൃശ്ശൂർ', description: 'ചാവക്കാട് കോസ്റ്റൽ & ടൗൺ പോലീസ്' },
    { id: 'pol_tsr_ollur', name: 'ഒല്ലൂർ പോലീസ് സ്റ്റേഷൻ', phone: '0487-2352223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'ഒല്ലൂർ, തൃശ്ശൂർ', description: 'ഒല്ലൂർ പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },

    // 9. PALAKKAD
    { id: 'pol_pkd_cr', name: 'പാലക്കാട് ജില്ലാ പോലീസ് കൺട്രോൾ റൂം', phone: '0491-2534011', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'പാലക്കാട് (Palakkad)', description: 'പാലക്കാട് ജില്ലാ കൺട്രോൾ റൂം ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_pkd_south', name: 'പാലക്കാട് ടൗൺ സൗത്ത് പോലീസ് സ്റ്റേഷൻ', phone: '0491-2533240', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'പാലക്കാട് ടൗൺ', description: 'പാലക്കാട് ടൗൺ സൗത്ത് സ്റ്റേഷൻ' },
    { id: 'pol_pkd_north', name: 'പാലക്കാട് ടൗൺ നോർത്ത് പോലീസ് സ്റ്റേഷൻ', phone: '0491-2522340', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'പാലക്കാട് ടൗൺ നോർത്ത്', description: 'പാലക്കാട് ടൗൺ നോർത്ത് സ്റ്റേഷൻ' },
    { id: 'pol_pkd_ottapalam', name: 'ഒറ്റപ്പാലം പോലീസ് സ്റ്റേഷൻ', phone: '0466-2244223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'ഒറ്റപ്പാലം, പാലക്കാട്', description: 'ഒറ്റപ്പാലം പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_pkd_shornur', name: 'ഷൊർണ്ണൂർ പോലീസ് സ്റ്റേഷൻ', phone: '0466-2222223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'ഷൊർണ്ണൂർ, പാലക്കാട്', description: 'ഷൊർണ്ണൂർ റെയിൽവേ & ടൗൺ പോലീസ്' },
    { id: 'pol_pkd_mannarkkad', name: 'മണ്ണാർക്കാട് പോലീസ് സ്റ്റേഷൻ', phone: '04924-222223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'മണ്ണാർക്കാട്, പാലക്കാട്', description: 'മണ്ണാർക്കാട് പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_pkd_alathur', name: 'ആലത്തൂർ പോലീസ് സ്റ്റേഷൻ', phone: '04922-222223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'ആലത്തൂർ, പാലക്കാട്', description: 'ആലത്തൂർ പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_pkd_chittur', name: 'ചിറ്റൂർ പോലീസ് സ്റ്റേഷൻ', phone: '04923-222223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'ചിറ്റൂർ, പാലക്കാട്', description: 'ചിറ്റൂർ പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_pkd_pattambi', name: 'പട്ടാമ്പി പോലീസ് സ്റ്റേഷൻ', phone: '0466-2212223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'പട്ടാമ്പി, പാലക്കാട്', description: 'പട്ടാമ്പി പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_pkd_cherpulassery', name: 'ചെർപ്പുളശ്ശേരി പോലീസ് സ്റ്റേഷൻ', phone: '0466-2282223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'ചെർപ്പുളശ്ശേരി, പാലക്കാട്', description: 'ചെർപ്പുളശ്ശേരി പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },

    // 10. MALAPPURAM
    { id: 'pol_mlp_cr', name: 'മലപ്പുറം ജില്ലാ പോലീസ് കൺട്രോൾ റൂം', phone: '0483-2734993', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'മലപ്പുറം (Malappuram)', description: 'മലപ്പുറം ജില്ലാ കൺട്രോൾ റൂം ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_mlp_town', name: 'മലപ്പുറം ടൗൺ പോലീസ് സ്റ്റേഷൻ', phone: '0483-2734993', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'മലപ്പുറം ടൗൺ', description: 'മലപ്പുറം ടൗൺ പോലീസ് സ്റ്റേഷൻ' },
    { id: 'pol_mlp_manjeri', name: 'മഞ്ചേരി പോലീസ് സ്റ്റേഷൻ', phone: '0483-2766822', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'മഞ്ചേരി, മലപ്പുറം', description: 'മഞ്ചേരി പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_mlp_perinthalmanna', name: 'പെരിന്തൽമണ്ണ പോലീസ് സ്റ്റേഷൻ', phone: '04933-227223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'പെരിന്തൽമണ്ണ, മലപ്പുറം', description: 'പെരിന്തൽമണ്ണ പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_mlp_tirur', name: 'തിരൂർ പോലീസ് സ്റ്റേഷൻ', phone: '0494-2422223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'തിരൂർ, മലപ്പുറം', description: 'തിരൂർ പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_mlp_ponnani', name: 'പൊന്നാനി പോലീസ് സ്റ്റേഷൻ', phone: '0494-2666038', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'പൊന്നാനി, മലപ്പുറം', description: 'പൊന്നാനി കോസ്റ്റൽ & ടൗൺ പോലീസ്' },
    { id: 'pol_mlp_nilambur', name: 'നിലമ്പൂർ പോലീസ് സ്റ്റേഷൻ', phone: '04931-220237', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'നിലമ്പൂർ, മലപ്പുറം', description: 'നിലമ്പൂർ പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_mlp_kondotty', name: 'കൊണ്ടോട്ടി പോലീസ് സ്റ്റേഷൻ', phone: '0483-2712030', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'കൊണ്ടോട്ടി, മലപ്പുറം', description: 'കൊണ്ടോട്ടി & കരിപ്പൂർ എയർപോർട്ട് പരിധി' },
    { id: 'pol_mlp_kottakkal', name: 'കോട്ടക്കൽ പോലീസ് സ്റ്റേഷൻ', phone: '0483-2742223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'കോട്ടക്കൽ, മലപ്പുറം', description: 'കോട്ടക്കൽ പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_mlp_tanur', name: 'താനൂർ പോലീസ് സ്റ്റേഷൻ', phone: '0494-2440230', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'താനൂർ, മലപ്പുറം', description: 'താനൂർ പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_mlp_valanchery', name: 'വളാഞ്ചേരി പോലീസ് സ്റ്റേഷൻ', phone: '0494-2644233', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'വളാഞ്ചേരി, മലപ്പുറം', description: 'വളാഞ്ചേരി പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },

    // 11. KOZHIKODE
    { id: 'pol_clt_city_cr', name: 'കോഴിക്കോട് സിറ്റി പോലീസ് കൺട്രോൾ റൂം', phone: '0495-2721011', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'കോഴിക്കോട് സിറ്റി (Kozhikode City)', description: 'കോഴിക്കോട് സിറ്റി കൺട്രോൾ റൂം ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_clt_rural_cr', name: 'കോഴിക്കോട് റൂറൽ കൺട്രോൾ റൂം (വടകര)', phone: '0496-2523031', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'വടകര, കോഴിക്കോട്', description: 'കോഴിക്കോട് റൂറൽ ജില്ലാ കൺട്രോൾ റൂം' },
    { id: 'pol_clt_town', name: 'കോഴിക്കോട് ടൗൺ പോലീസ് സ്റ്റേഷൻ', phone: '0495-2720100', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'കോഴിക്കോട് ടൗൺ', description: 'കോഴിക്കോട് ടൗൺ പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_clt_kasaba', name: 'കസബ പോലീസ് സ്റ്റേഷൻ', phone: '0495-2701445', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'കസബ, കോഴിക്കോട്', description: 'കസബ പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_clt_nadakkavu', name: 'നടക്കാവ് പോലീസ് സ്റ്റേഷൻ', phone: '0495-2766014', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'നടക്കാവ്, കോഴിക്കോട്', description: 'നടക്കാവ് പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_clt_med', name: 'മെഡിക്കൽ കോളേജ് പോലീസ് സ്റ്റേഷൻ', phone: '0495-2356500', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'മെഡിക്കൽ കോളേജ്, കോഴിക്കോട്', description: 'കോഴിക്കോട് മെഡിക്കൽ കോളേജ് പോലീസ്' },
    { id: 'pol_clt_feroke', name: 'ഫറോക്ക് പോലീസ് സ്റ്റേഷൻ', phone: '0495-2482223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'ഫറോക്ക്, കോഴിക്കോട്', description: 'ഫറോക്ക് പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_clt_vadakara', name: 'വടകര പോലീസ് സ്റ്റേഷൻ', phone: '0496-2524223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'വടകര, കോഴിക്കോട്', description: 'വടകര പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_clt_koyilandy', name: 'കൊയിലാണ്ടി പോലീസ് സ്റ്റേഷൻ', phone: '0496-2620223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'കൊയിലാണ്ടി, കോഴിക്കോട്', description: 'കൊയിലാണ്ടി പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_clt_thamarassery', name: 'താമരശ്ശേരി പോലീസ് സ്റ്റേഷൻ', phone: '0495-2222223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'താമരശ്ശേരി ചുരം, കോഴിക്കോട്', description: 'താമരശ്ശേരി പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_clt_balussery', name: 'ബാലുശ്ശേരി പോലീസ് സ്റ്റേഷൻ', phone: '0496-2642023', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'ബാലുശ്ശേരി, കോഴിക്കോട്', description: 'ബാലുശ്ശേരി പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_clt_koduvally', name: 'കൊടുവള്ളി പോലീസ് സ്റ്റേഷൻ', phone: '0495-2210223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'കൊടുവള്ളി, കോഴിക്കോട്', description: 'കൊടുവള്ളി പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },

    // 12. WAYANAD
    { id: 'pol_wyd_cr', name: 'വയനാട് ജില്ലാ പോലീസ് കൺട്രോൾ റൂം', phone: '04936-202525', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'വയനാട് (Wayanad)', description: 'വയനാട് ജില്ലാ കൺട്രോൾ റൂം ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_wyd_kalpetta', name: 'കൽപ്പറ്റ പോലീസ് സ്റ്റേഷൻ', phone: '04936-202223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'കൽപ്പറ്റ, വയനാട്', description: 'കൽപ്പറ്റ പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_wyd_mananthavady', name: 'മാനന്തവാടി പോലീസ് സ്റ്റേഷൻ', phone: '04935-240223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'മാനന്തവാടി, വയനാട്', description: 'മാനന്തവാടി പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_wyd_sulthan_bathery', name: 'സുൽത്താൻ ബത്തേരി പോലീസ് സ്റ്റേഷൻ', phone: '04936-220223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'സുൽത്താൻ ബത്തേരി, വയനാട്', description: 'സുൽത്താൻ ബത്തേരി പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_wyd_vythiri', name: 'വൈത്തിരി പോലീസ് സ്റ്റേഷൻ', phone: '04936-255223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'വൈത്തിരി, വയനാട്', description: 'വൈത്തിരി പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_wyd_meenangadi', name: 'മീനങ്ങാടി പോലീസ് സ്റ്റേഷൻ', phone: '04936-247223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'മീനങ്ങാടി, വയനാട്', description: 'മീനങ്ങാടി പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_wyd_ambalavayal', name: 'അമ്പലവയൽ പോലീസ് സ്റ്റേഷൻ', phone: '04936-260223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'അമ്പലവയൽ, വയനാട്', description: 'അമ്പലവയൽ പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_wyd_panamaram', name: 'പനമരം പോലീസ് സ്റ്റേഷൻ', phone: '04935-220233', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'പനമരം, വയനാട്', description: 'പനമരം പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },

    // 13. KANNUR
    { id: 'pol_knr_city_cr', name: 'കണ്ണൂർ സിറ്റി പോലീസ് കൺട്രോൾ റൂം', phone: '0497-2763331', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'കണ്ണൂർ സിറ്റി (Kannur City)', description: 'കണ്ണൂർ സിറ്റി കൺട്രോൾ റൂം ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_knr_rural_cr', name: 'കണ്ണൂർ റൂറൽ കൺട്രോൾ റൂം', phone: '0497-2704200', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'കണ്ണൂർ റൂറൽ', description: 'കണ്ണൂർ റൂറൽ ജില്ലാ കൺട്രോൾ റൂം' },
    { id: 'pol_knr_town', name: 'കണ്ണൂർ ടൗൺ പോലീസ് സ്റ്റേഷൻ', phone: '0497-2763337', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'കണ്ണൂർ ടൗൺ', description: 'കണ്ണൂർ ടൗൺ പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_knr_city', name: 'കണ്ണൂർ സിറ്റി പോലീസ് സ്റ്റേഷൻ', phone: '0497-2731233', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'കണ്ണൂർ സിറ്റി', description: 'കണ്ണൂർ സിറ്റി പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_knr_thalassery', name: 'തലശ്ശേരി പോലീസ് സ്റ്റേഷൻ', phone: '0490-2322223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'തലശ്ശേരി, കണ്ണൂർ', description: 'തലശ്ശേരി പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_knr_payyannur', name: 'പയ്യന്നൂർ പോലീസ് സ്റ്റേഷൻ', phone: '04985-202223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'പയ്യന്നൂർ, കണ്ണൂർ', description: 'പയ്യന്നൂർ പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_knr_taliparamba', name: 'തളിപ്പറമ്പ് പോലീസ് സ്റ്റേഷൻ', phone: '0460-2202223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'തളിപ്പറമ്പ്, കണ്ണൂർ', description: 'തളിപ്പറമ്പ് പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_knr_iritty', name: 'ഇരിട്ടി പോലീസ് സ്റ്റേഷൻ', phone: '0490-2491223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'ഇരിട്ടി, കണ്ണൂർ', description: 'ഇരിട്ടി പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_knr_mattannur', name: 'മട്ടന്നൂർ പോലീസ് സ്റ്റേഷൻ', phone: '0490-2471223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'മട്ടന്നൂർ, കണ്ണൂർ എയർപോർട്ട്', description: 'മട്ടന്നൂർ & കണ്ണൂർ എയർപോർട്ട് പരിധി' },
    { id: 'pol_knr_koothuparamba', name: 'കൂത്തുപറമ്പ് പോലീസ് സ്റ്റേഷൻ', phone: '0490-2362223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'കൂത്തുപറമ്പ്, കണ്ണൂർ', description: 'കൂത്തുപറമ്പ് പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_knr_valapattanam', name: 'വളപട്ടണം പോലീസ് സ്റ്റേഷൻ', phone: '0497-2778223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'വളപട്ടണം, കണ്ണൂർ', description: 'വളപട്ടണം പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },

    // 14. KASARAGOD
    { id: 'pol_ksd_cr', name: 'കാസർഗോഡ് ജില്ലാ പോലീസ് കൺട്രോൾ റൂം', phone: '04994-222950', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'കാസർഗോഡ് (Kasaragod)', description: 'കാസർഗോഡ് ജില്ലാ കൺട്രോൾ റൂം ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_ksd_town', name: 'കാസർഗോഡ് ടൗൺ പോലീസ് സ്റ്റേഷൻ', phone: '04994-220223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'കാസർഗോഡ് ടൗൺ', description: 'കാസർഗോഡ് ടൗൺ പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_ksd_hosdurg', name: 'ഹോസ്ദുർഗ്ഗ് / കാഞ്ഞങ്ങാട് പോലീസ് സ്റ്റേഷൻ', phone: '0467-2202223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'കാഞ്ഞങ്ങാട്, കാസർഗോഡ്', description: 'ഹോസ്ദുർഗ്ഗ് & കാഞ്ഞങ്ങാട് പോലീസ് ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_ksd_bekal', name: 'ബേക്കൽ പോലീസ് സ്റ്റേഷൻ', phone: '0467-2236223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'ബേക്കൽ, കാസർഗോഡ്', description: 'ബേക്കൽ കോസ്റ്റൽ & ഫോർട്ട് പോലീസ്' },
    { id: 'pol_ksd_nileshwar', name: 'നീലേശ്വരം പോലീസ് സ്റ്റേഷൻ', phone: '0467-2280223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'നീലേശ്വരം, കാസർഗോഡ്', description: 'നീലേശ്വരം പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_ksd_manjeshwar', name: 'മഞ്ചേശ്വരം പോലീസ് സ്റ്റേഷൻ', phone: '04998-272223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'മഞ്ചേശ്വരം, കാസർഗോഡ്', description: 'മഞ്ചേശ്വരം അതിർത്തി പോലീസ് സ്റ്റേഷൻ' },
    { id: 'pol_ksd_kumbla', name: 'കുമ്പള പോലീസ് സ്റ്റേഷൻ', phone: '04998-214223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'കുമ്പള, കാസർഗോഡ്', description: 'കുമ്പള പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_ksd_vidyanagar', name: 'വിദ്യാനഗർ പോലീസ് സ്റ്റേഷൻ', phone: '04994-230223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'വിദ്യാനഗർ, കാസർഗോഡ്', description: 'വിദ്യാനഗർ & കളക്ടറേറ്റ് പരിസരം' },
    { id: 'pol_ksd_badiadka', name: 'ബദിയടുക്ക പോലീസ് സ്റ്റേഷൻ', phone: '04998-284223', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'ബദിയടുക്ക, കാസർഗോഡ്', description: 'ബദിയടുക്ക പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' },
    { id: 'pol_ksd_vellarikundu', name: 'വെള്ളരിക്കുണ്ട് പോലീസ് സ്റ്റേഷൻ', phone: '0467-2242233', category: 'police', categoryName: 'പോലീസ് സ്റ്റേഷൻ', icon: '👮', location: 'വെള്ളരിക്കുണ്ട്, കാസർഗോഡ്', description: 'വെള്ളരിക്കുണ്ട് പോലീസ് സ്റ്റേഷൻ ലാൻഡ്‌ഫോൺ' }
  ];

  function getEmergencyCategoryIcon(cat) {
    switch (cat) {
      case 'police': return '👮';
      case 'medical': return '🚑';
      case 'fire': return '🚒';
      case 'utility': return '⚡';
      case 'women': return '👩';
      default: return '🚨';
    }
  }

  function getEmergencyCategoryNameMalayalam(cat) {
    switch (cat) {
      case 'police': return 'പോലീസ്';
      case 'medical': return 'ആരോഗ്യം';
      case 'fire': return 'ഫയർ ഫോഴ്സ്';
      case 'utility': return 'യൂട്ടിലിറ്റി';
      case 'women': return 'വനിത & ശിശു';
      default: return 'അത്യാഹിതം';
    }
  }

  function getAllEmergencyContacts() {
    let custom = [];
    try {
      custom = JSON.parse(localStorage.getItem('nn_emergency_contacts') || '[]');
    } catch (_) {}
    if (Array.isArray(APP_STATE.emergencyContacts) && APP_STATE.emergencyContacts.length > 0) {
      custom = APP_STATE.emergencyContacts;
    }
    const allPolice = (typeof window !== 'undefined' && Array.isArray(window.KERALA_ALL_POLICE_STATIONS)) ? window.KERALA_ALL_POLICE_STATIONS : [];
    const map = new Map();
    [...allPolice, ...DEFAULT_EMERGENCY_CONTACTS, ...custom].forEach(c => {
      const k = c.id || (c.phone ? c.phone.replace(/\D/g, '') : (c.name || c.title));
      if (!map.has(k)) {
        map.set(k, {
          ...c,
          name: c.name || c.title,
          title: c.title || c.name,
          categoryName: c.categoryName || (c.category === 'police' ? 'പോലീസ് സ്റ്റേഷൻ' : 'സഹായ നമ്പർ')
        });
      }
    });
    return Array.from(map.values());
  }

  let activeEmergencyCategory = 'all';
  let activeEmergencyDistrict = 'all';

  function setEmergencyDistrict(dist) {
    activeEmergencyDistrict = dist || 'all';
    const searchVal = document.getElementById('emergencySearchInput')?.value || '';
    renderEmergencyModalList(searchVal, activeEmergencyCategory);
  }
  window.setEmergencyDistrict = setEmergencyDistrict;

  function setEmergencyCategory(cat, el) {
    activeEmergencyCategory = cat;
    document.querySelectorAll('.emg-filter-chip').forEach(c => c.classList.remove('active'));
    if (el) el.classList.add('active');
    const searchVal = document.getElementById('emergencySearchInput')?.value || '';
    renderEmergencyModalList(searchVal, activeEmergencyCategory);
  }
  window.setEmergencyCategory = setEmergencyCategory;

  function filterEmergencyContacts(query) {
    renderEmergencyModalList(query, activeEmergencyCategory);
  }
  window.filterEmergencyContacts = filterEmergencyContacts;

  function renderEmergencyModalList(query = '', category = 'all') {
    const listEl = document.getElementById('emergencyListContainer');
    if (!listEl) return;

    let contacts = getAllEmergencyContacts();
    const cat = category || activeEmergencyCategory || 'all';

    // 1. Category Filtering
    if (cat !== 'all') {
      contacts = contacts.filter(c => {
        if (!c.category && !c.categoryName) return false;
        const cCat = (c.category || '').toLowerCase();
        const cCatName = (c.categoryName || '').toLowerCase();
        const target = cat.toLowerCase();
        if (target === 'police' || target === 'പോലീസ്') {
          return cCat === 'police' || cCat === 'പോലീസ്' || cCatName.includes('പോലീസ്');
        }
        if (target === 'medical' || target === 'ആരോഗ്യം') {
          return cCat === 'medical' || cCat === 'ആരോഗ്യം' || cCatName.includes('ആരോഗ്യം');
        }
        if (target === 'emergency' || target === 'അടിയന്തിരം') {
          return cCat === 'emergency' || cCat === 'അടിയന്തിരം' || cCat === 'police' || cCat === 'medical' || cCat === 'fire' || cCatName.includes('അടിയന്തിരം');
        }
        if (target.includes('വൈദ്യുതി') || target.includes('കുടിവെള്ളം') || target === 'utility') {
          return cCat === 'utility' || cCat.includes('വൈദ്യുതി') || cCatName.includes('വൈദ്യുതി') || cCatName.includes('kseb');
        }
        if (target.includes('സർക്കാർ') || target === 'gov') {
          return cCat.includes('സർക്കാർ') || cCat === 'gov' || cCatName.includes('സർക്കാർ');
        }
        return cCat === target || cCatName.includes(target);
      });
    }

    // 2. District Filtering
    if (activeEmergencyDistrict && activeEmergencyDistrict !== 'all') {
      const targetDist = activeEmergencyDistrict.trim();
      contacts = contacts.filter(c => {
        const itemDist = (c.district || c.location || '').trim();
        return itemDist.includes(targetDist) || c.category === 'emergency';
      });
    }

    // 3. Search Query Filtering
    const q = (query || '').toLowerCase().trim();
    if (q) {
      contacts = contacts.filter(c => 
        (c.name && c.name.toLowerCase().includes(q)) ||
        (c.title && c.title.toLowerCase().includes(q)) ||
        (c.phone && c.phone.includes(q)) ||
        (c.categoryName && c.categoryName.toLowerCase().includes(q)) ||
        (c.district && c.district.toLowerCase().includes(q)) ||
        (c.location && c.location.toLowerCase().includes(q)) ||
        (c.description && c.description.toLowerCase().includes(q))
      );
    }

    const badgeEl = document.getElementById('emgCountBadge');
    if (badgeEl) {
      badgeEl.textContent = `${contacts.length} നമ്പറുകൾ ലഭ്യമാണ്`;
    }

    if (contacts.length === 0) {
      listEl.innerHTML = `
        <div style="text-align:center;padding:28px 16px;background:#F8FAFC;border-radius:14px;border:1px dashed #CBD5E1">
          <div style="font-size:32px;margin-bottom:8px">🚨</div>
          <div style="font-size:14px;font-weight:800;color:#334155">നമ്പറുകൾ കണ്ടെത്താനായില്ല</div>
          <div style="font-size:12px;color:#64748B;margin-top:4px">മറ്റൊരു ജില്ല തിരഞ്ഞെടുക്കുകയോ തിരഞ്ഞ പദം മാറ്റുകയോ ചെയ്യാം</div>
          ${checkIsAdmin() ? `
          <button type="button" onclick="openAdminPortal('emergency')" style="margin-top:12px;background:#0E7043;color:#fff;border:none;padding:7px 16px;border-radius:20px;font-size:12px;font-weight:800;cursor:pointer">
            ➕ അഡ്മിൻ നമ്പർ ചേർക്കുക
          </button>
          ` : ''}
        </div>
      `;
      return;
    }

    listEl.innerHTML = contacts.map(c => {
      const cleanPhone = (c.phone || '').replace(/\D/g, '');
      const icon = c.icon || getEmergencyCategoryIcon(c.category);
      const catName = c.categoryName || getEmergencyCategoryNameMalayalam(c.category);
      const displayName = c.name || c.title || 'സഹായ നമ്പർ';

      return `
        <div style="background:#FFFFFF;border:1px solid #E2E8F0;border-radius:14px;padding:12px 14px;box-shadow:0 1px 3px rgba(0,0,0,0.04);display:flex;flex-direction:column;gap:8px">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px">
            <div style="display:flex;align-items:center;gap:10px">
              <div style="width:42px;height:42px;border-radius:12px;background:#FEF2F2;border:1px solid #FECACA;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">
                ${icon}
              </div>
              <div>
                <div style="font-weight:800;font-size:14px;color:#0F172A">${escapeHtml(displayName)}</div>
                <div style="display:flex;align-items:center;gap:6px;margin-top:2px;flex-wrap:wrap">
                  <span style="font-size:11px;font-weight:800;color:#DC2626;background:#FEF2F2;border:1px solid #FCA5A5;padding:1px 6px;border-radius:6px">
                    ${escapeHtml(catName)}
                  </span>
                  ${c.district ? `<span style="font-size:11px;font-weight:700;color:#1E3A8A;background:#EFF6FF;padding:1px 6px;border-radius:6px">🏛️ ${escapeHtml(c.district)}</span>` : ''}
                  ${c.location ? `<span style="font-size:11px;color:#64748B">📍 ${escapeHtml(c.location)}</span>` : ''}
                </div>
              </div>
            </div>
            <div style="background:#F0FDF4;color:#166534;font-size:11px;font-weight:800;padding:2px 8px;border-radius:8px;border:1px solid #BBF7D0;white-space:nowrap">
              🟢 24x7
            </div>
          </div>

          ${c.description ? `<div style="font-size:12px;color:#475569;line-height:1.4">${escapeHtml(c.description)}</div>` : ''}

          <div style="display:flex;align-items:center;gap:8px;margin-top:4px">
            <a href="tel:${cleanPhone}" style="flex:1;background:linear-gradient(135deg, #DC2626 0%, #B91C1C 100%);color:#fff;text-decoration:none;padding:9px;border-radius:10px;font-size:13px;font-weight:800;display:flex;align-items:center;justify-content:center;gap:6px;box-shadow:0 2px 6px rgba(220,38,38,0.25)">
              <span>📞 വിളിക്കുക: ${escapeHtml(c.phone)}</span>
            </a>
            <button type="button" onclick="navigator.clipboard?.writeText('${escapeHtml(c.phone)}'); toast('📋 നമ്പർ കോപ്പി ചെയ്തു: ${escapeHtml(c.phone)}')" style="background:#F1F5F9;color:#334155;border:1px solid #CBD5E1;padding:9px 12px;border-radius:10px;font-size:12px;font-weight:800;cursor:pointer" title="കോപ്പി ചെയ്യുക">
              📋 കോപ്പി
            </button>
          </div>
        </div>
      `;
    }).join('');
  }
  window.renderEmergencyModalList = renderEmergencyModalList;

  function openEmergencyModal() {
    const distSelect = document.getElementById('emergencyDistrictFilter');
    if (distSelect && typeof APP_STATE !== 'undefined') {
      const userDist = APP_STATE.currentUser?.district || APP_STATE.location?.district || '';
      if (userDist) {
        for (let i = 0; i < distSelect.options.length; i++) {
          if (distSelect.options[i].value && userDist.includes(distSelect.options[i].value)) {
            distSelect.selectedIndex = i;
            activeEmergencyDistrict = distSelect.options[i].value;
            break;
          }
        }
      }
    }
    renderEmergencyModalList();
    if (typeof updateAdminUI === 'function') updateAdminUI();
    openModal('modal-emergency');
  }
  window.openEmergencyModal = openEmergencyModal;
  window.openEmergencyModal = openEmergencyModal;

  function openHealthAndAmbulanceModal() {
    openEmergencyModal();
  }
  window.openHealthAndAmbulanceModal = openHealthAndAmbulanceModal;

  // ==============================================================
  // 11C. ADMIN PORTAL (SERVICES & EMERGENCY DIRECTORY MANAGEMENT)
  // Strictly restricted to official Admin Phone: 9605406699
  // ==============================================================
  const ADMIN_PHONE = '9605406699';

  function checkIsAdmin() {
    const raw = (APP_STATE.currentUser?.phone || localStorage.getItem('nn_user_phone') || localStorage.getItem('nn_permanent_phone') || '');
    const userPhone = String(raw).replace(/\D/g, '').slice(-10);
    const userEmail = (APP_STATE.currentUser?.email || localStorage.getItem('nn_user_email') || '').toLowerCase();
    return userPhone === ADMIN_PHONE || userEmail === 'admin@nammudenaadu.app';
  }
  window.checkIsAdmin = checkIsAdmin;

  function updateAdminUI() {
    const isAdmin = checkIsAdmin();
    const profRow = document.getElementById('profileAdminPortalRow');
    if (profRow) profRow.style.display = isAdmin ? 'flex' : 'none';

    const emgBtn = document.getElementById('emgAddNumberAdminBtn');
    if (emgBtn) emgBtn.style.display = isAdmin ? 'inline-flex' : 'none';

    const desktopNav = document.getElementById('desktopAdminNavLink');
    if (desktopNav) desktopNav.style.display = isAdmin ? 'flex' : 'none';

    const desktopAdminHeaderBtn = document.getElementById('desktopAdminHeaderBtn');
    if (desktopAdminHeaderBtn) desktopAdminHeaderBtn.style.display = isAdmin ? 'inline-flex' : 'none';

    const homeAdminBtn = document.getElementById('homeAdminBtn');
    if (homeAdminBtn) homeAdminBtn.style.display = isAdmin ? 'inline-flex' : 'none';

    const settingsAdminRow = document.getElementById('settingsAdminHubRow');
    if (settingsAdminRow) settingsAdminRow.style.display = isAdmin ? 'flex' : 'none';

    const footerAdmin = document.getElementById('footerAdminLink');
    if (footerAdmin) footerAdmin.style.display = isAdmin ? 'inline' : 'none';
  }
  window.updateAdminUI = updateAdminUI;

  function promptAdminAuth(callback) {
    if (checkIsAdmin()) {
      if (typeof callback === 'function') callback();
      return;
    }
    toast('⚠️ അഡ്മിൻ ആക്സസ് ഈ ഫോൺ നമ്പറിന് (9605406699) മാത്രമേ അനുവദിച്ചിട്ടുള്ളൂ.');
  }
  window.promptAdminAuth = promptAdminAuth;

  function openAdminPortal(tab = 'services') {
    if (!checkIsAdmin()) {
      toast('⚠️ അഡ്മിൻ ആക്സസ് ഈ ഫോൺ നമ്പറിന് (9605406699) മാത്രമേ അനുവദിച്ചിട്ടുള്ളൂ.');
      return;
    }
    openModal('modal-admin-hub');
    switchAdminHubTab(tab);
  }
  window.openAdminPortal = openAdminPortal;

  function switchAdminHubTab(tab) {
    const btnSrv = document.getElementById('adminTabBtnServices');
    const btnNum = document.getElementById('adminTabBtnNumbers') || document.getElementById('adminTabBtnEmergency');
    const btnUsers = document.getElementById('adminTabBtnUsers');
    const btnHome = document.getElementById('adminTabBtnHomeBanner');
    const btnSpl = document.getElementById('adminTabBtnSplash');

    const formSrv = document.getElementById('adminAddServiceForm') || document.getElementById('adminTabContentServices');
    const formNum = document.getElementById('adminAddNumberForm') || document.getElementById('adminTabContentEmergency');
    const secUsers = document.getElementById('adminTabContentUsers');
    const secHome = document.getElementById('adminHomeBannerSection');
    const secSpl = document.getElementById('adminSplashPhotoSection');

    // Reset buttons
    [btnSrv, btnNum, btnUsers, btnHome, btnSpl].forEach(b => {
      if (b) {
        b.style.background = 'none';
        b.style.color = '#64748B';
        b.style.borderBottom = 'none';
        b.style.fontWeight = '700';
      }
    });

    // Hide all
    if (formSrv) formSrv.style.display = 'none';
    if (formNum) formNum.style.display = 'none';
    if (secUsers) secUsers.style.display = 'none';
    if (secHome) secHome.style.display = 'none';
    if (secSpl) secSpl.style.display = 'none';

    if (tab === 'services') {
      if (btnSrv) {
        btnSrv.style.background = '#fff';
        btnSrv.style.color = '#0E7043';
        btnSrv.style.borderBottom = '2px solid #0E7043';
        btnSrv.style.fontWeight = '800';
      }
      if (formSrv) formSrv.style.display = 'flex';
    } else if (tab === 'numbers' || tab === 'emergency') {
      if (btnNum) {
        btnNum.style.background = '#fff';
        btnNum.style.color = '#DC2626';
        btnNum.style.borderBottom = '2px solid #DC2626';
        btnNum.style.fontWeight = '800';
      }
      if (formNum) formNum.style.display = 'flex';
    } else if (tab === 'users') {
      if (btnUsers) {
        btnUsers.style.background = '#fff';
        btnUsers.style.color = '#DC2626';
        btnUsers.style.borderBottom = '2px solid #DC2626';
        btnUsers.style.fontWeight = '800';
      }
      if (secUsers) secUsers.style.display = 'flex';
    } else if (tab === 'homeBanner') {
      if (btnHome) {
        btnHome.style.background = '#fff';
        btnHome.style.color = '#0E7043';
        btnHome.style.borderBottom = '2px solid #0E7043';
        btnHome.style.fontWeight = '800';
      }
      if (secHome) secHome.style.display = 'flex';

      const savedArt = localStorage.getItem('thuna_custom_village_banner_art') || 'img/kerala-splash.jpg';
      const savedTitle = localStorage.getItem('thuna_custom_village_banner_title') || 'നമ്മുടെ നാട്';
      const savedSub = localStorage.getItem('thuna_custom_village_banner_sub') || '🤝 നാടിനൊപ്പം നാം';
      const savedDesc = localStorage.getItem('thuna_custom_village_banner_desc') || '';
      const savedPhone = localStorage.getItem('thuna_custom_village_banner_phone') || '';
      const savedLink = localStorage.getItem('thuna_custom_village_banner_link') || '';

      const titleInput = document.getElementById('adminInAppBannerTitle');
      const subInput = document.getElementById('adminInAppBannerSub');
      const descInput = document.getElementById('adminInAppBannerDesc');
      const phoneInput = document.getElementById('adminInAppBannerPhone');
      const linkInput = document.getElementById('adminInAppBannerLink');
      const previewImg = document.getElementById('adminInAppBannerPreviewImg');

      if (titleInput) titleInput.value = savedTitle;
      if (subInput) subInput.value = savedSub;
      if (descInput) descInput.value = savedDesc;
      if (phoneInput) phoneInput.value = savedPhone;
      if (linkInput) linkInput.value = savedLink;
      if (previewImg) previewImg.src = savedArt;

      updateAdminInAppHomeBannerMockup();
    } else if (tab === 'splash') {
      if (btnSpl) {
        btnSpl.style.background = '#fff';
        btnSpl.style.color = '#0E7043';
        btnSpl.style.borderBottom = '2px solid #0E7043';
        btnSpl.style.fontWeight = '800';
      }
      if (secSpl) secSpl.style.display = 'flex';
      const cur = localStorage.getItem('nn_app_splash_bg') || 'img/kerala-splash.jpg';
      const preview = document.getElementById('adminSplashPreview');
      if (preview) preview.src = cur;
    }
  }
  window.switchAdminHubTab = switchAdminHubTab;

  async function adminSearchUserAccount() {
    const query = (document.getElementById('adminUserSearchInput')?.value || '').trim();
    const container = document.getElementById('adminUserSearchResults');
    if (!container) return;

    if (!query) {
      toast('⚠️ തിരയാൻ ഫോൺ നമ്പറോ പേരോ നൽകുക.');
      return;
    }

    container.innerHTML = '<div style="text-align:center;padding:20px;color:#64748B;font-size:13px">⏳ ഉപയോക്താവിനെ തിരയുന്നു...</div>';

    try {
      const client = (typeof window.initSupabase === 'function') ? window.initSupabase() : (window.supabaseClient || null);
      if (!client) {
        container.innerHTML = '<div style="color:#DC2626;padding:12px">Supabase കണക്ഷൻ ലഭ്യമല്ല</div>';
        return;
      }

      const cleanDigits = query.replace(/\D/g, '').slice(-10);
      let queryBuilder = client.from('profiles').select('*');

      if (cleanDigits && cleanDigits.length >= 4) {
        queryBuilder = queryBuilder.ilike('phone', `%${cleanDigits}%`);
      } else {
        queryBuilder = queryBuilder.ilike('name', `%${query}%`);
      }

      const { data, error } = await queryBuilder.limit(20);

      if (error || !data || data.length === 0) {
        container.innerHTML = `
          <div style="text-align:center;padding:24px;background:#F8FAFC;border-radius:12px;color:#64748B;font-size:13px">
            🔍 "${escapeHtml(query)}" എന്നതിൽ ഉപയോക്താക്കളെ കണ്ടെത്തിയില്ല.
          </div>
        `;
        return;
      }

      container.innerHTML = data.map(u => {
        const phone = u.phone || 'ഫോൺ ലഭ്യമല്ല';
        const name = u.name || 'നാട്ടുകാരൻ';
        const avatar = u.avatar || DEFAULT_USER_AVATAR;
        const place = u.location || u.district || 'കേരളം';
        const uid = u.id || '';

        return `
          <div style="background:#FFFFFF;border:1.5px solid #E2E8F0;border-radius:14px;padding:12px;margin-bottom:10px;box-shadow:0 1px 3px rgba(0,0,0,0.03);display:flex;align-items:center;justify-content:space-between;gap:10px">
            <div style="display:flex;align-items:center;gap:10px;min-width:0;flex:1">
              <img src="${avatar}" style="width:42px;height:42px;border-radius:50%;object-fit:cover;border:1.5px solid #CBD5E1;flex-shrink:0" onerror="this.src='img/default-avatar.png'">
              <div style="min-width:0;flex:1">
                <div style="font-weight:800;font-size:13.5px;color:#0F172A;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(name)}</div>
                <div style="font-size:11.5px;font-weight:700;color:#1E40AF;margin-top:2px">📱 ${escapeHtml(phone)}</div>
                <div style="font-size:11px;color:#64748B;margin-top:2px">📍 ${escapeHtml(place)}</div>
              </div>
            </div>
            <button type="button" onclick="executeAdminDeleteAccount('${escapeHtml(uid)}', '${escapeHtml(phone)}', '${escapeHtml(name)}')" style="background:#DC2626;color:#fff;border:none;padding:8px 12px;border-radius:10px;font-size:11.5px;font-weight:800;cursor:pointer;white-space:nowrap;box-shadow:0 2px 6px rgba(220,38,38,0.25)">
              🗑️ അക്കൗണ്ട് ഡിലീറ്റ് ചെയ്യാം
            </button>
          </div>
        `;
      }).join('');
    } catch (e) {
      container.innerHTML = `<div style="color:#DC2626;padding:12px">പിശക്: ${escapeHtml(e.message)}</div>`;
    }
  }
  window.adminSearchUserAccount = adminSearchUserAccount;

  async function executeAdminDeleteAccount(userId, phone, name) {
    if (!checkIsAdmin()) {
      toast('⚠️ അഡ്മിന് മാത്രമേ ഈ അനുവാദമുള്ളൂ.');
      return;
    }

    const conf = confirm(`⚠️ അഡ്മിൻ സ്ഥിരീകരണം:\n\n"${name}" (${phone}) എന്ന യൂസറുടെ അക്കൗണ്ടും അവരുടെ എല്ലാ പോസ്റ്റുകളും സർവീസുകളും Supabase-ൽ നിന്ന് പൂർണ്ണമായി ശാശ്വതമായി ഡിലീറ്റ് ചെയ്യണോ?\n\nഈ പ്രവർത്തനം ഒരിക്കലും തിരിച്ചെടുക്കാൻ കഴിയില്ല!`);
    if (!conf) return;

    toast(`⏳ "${name}" എന്ന യൂസറുടെ അക്കൗണ്ട് ഡിലീറ്റ് ചെയ്യുന്നു...`);

    try {
      if (window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.deleteEntireUserAccount === 'function') {
        const ok = await window.NN_SUPABASE_SERVICES.deleteEntireUserAccount(userId, phone, '');
        if (ok) {
          toast(`✅ "${name}" (${phone}) അക്കൗണ്ട് വിജയകരമായി ഡിലീറ്റ് ചെയ്തു.`);
          adminSearchUserAccount();
        } else {
          toast('⚠️ അക്കൗണ്ട് ഡിലീറ്റ് ചെയ്യുന്നതിൽ തടസ്സം നേരിട്ടു.');
        }
      }
    } catch (err) {
      toast('❌ പിശക്: ' + err.message);
    }
  }
  window.executeAdminDeleteAccount = executeAdminDeleteAccount;

  let tempAdminHomeBannerBase64 = null;

  function compressImageToDataUrl(file, maxWidth, quality, callback) {
    if (typeof smartCompressImage === 'function') {
      return smartCompressImage(file, { maxDim: maxWidth || 1200, quality: quality || 0.82 }, callback);
    }
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => callback(ev.target.result);
    reader.readAsDataURL(file);
  }

  function handleAdminHomeBannerPhotoSelected(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    toast('⏳ ചിത്രം തയ്യാറാക്കുന്നു...');
    compressImageToDataUrl(file, 1200, 0.85, (compressed) => {
      tempAdminHomeBannerBase64 = compressed;
      const previewImg = document.getElementById('adminInAppBannerPreviewImg');
      if (previewImg) previewImg.src = compressed;
      toast('📸 ചിത്രം പ്രിവ്യൂവിൽ ചേർത്തു. "സേവ് ചെയ്ത് പബ്ലിഷ് ചെയ്യാം" ക്ലിക്ക് ചെയ്യുക.');
    });
  }
  window.handleAdminHomeBannerPhotoSelected = handleAdminHomeBannerPhotoSelected;

  function previewAdminHomeBannerUrl(url) {
    const previewImg = document.getElementById('adminInAppBannerPreviewImg');
    if (previewImg && url && url.startsWith('http')) {
      tempAdminHomeBannerBase64 = url.trim();
      previewImg.src = url.trim();
    }
  }
  window.previewAdminHomeBannerUrl = previewAdminHomeBannerUrl;

  function setAdminHomeBannerPreset(url, label) {
    tempAdminHomeBannerBase64 = url;
    const previewImg = document.getElementById('adminInAppBannerPreviewImg');
    if (previewImg) previewImg.src = url;
    toast('തിരഞ്ഞെടുത്തു: ' + label);
  }
  window.setAdminHomeBannerPreset = setAdminHomeBannerPreset;

  function updateAdminInAppHomeBannerMockup() {
    const titleVal = document.getElementById('adminInAppBannerTitle')?.value.trim() || 'നമ്മുടെ നാട്';
    const subVal = document.getElementById('adminInAppBannerSub')?.value.trim() || '🤝 നാടിനൊപ്പം നാം';
    const previewTitle = document.getElementById('adminInAppBannerPreviewTitle');
    const previewSub = document.getElementById('adminInAppBannerPreviewSub');
    if (previewTitle) previewTitle.textContent = titleVal;
    if (previewSub) previewSub.textContent = subVal;
  }
  window.updateAdminInAppHomeBannerMockup = updateAdminInAppHomeBannerMockup;

  function saveAdminHomeBannerFromApp() {
    const title = (document.getElementById('adminInAppBannerTitle')?.value || '').trim() || 'നമ്മുടെ നാട്';
    const sub = (document.getElementById('adminInAppBannerSub')?.value || '').trim() || '🤝 നാടിനൊപ്പം നാം';
    const desc = (document.getElementById('adminInAppBannerDesc')?.value || '').trim();
    const phone = (document.getElementById('adminInAppBannerPhone')?.value || '').trim();
    const link = (document.getElementById('adminInAppBannerLink')?.value || '').trim();
    const previewImg = document.getElementById('adminInAppBannerPreviewImg');
    const bannerArt = tempAdminHomeBannerBase64 || (previewImg && previewImg.src) || 'img/kerala-splash.jpg';

    try {
      localStorage.setItem('thuna_custom_village_banner_art', bannerArt);
      localStorage.setItem('thuna_custom_village_banner_title', title);
      localStorage.setItem('thuna_custom_village_banner_sub', sub);

      if (desc) localStorage.setItem('thuna_custom_village_banner_desc', desc);
      else localStorage.removeItem('thuna_custom_village_banner_desc');

      if (phone) localStorage.setItem('thuna_custom_village_banner_phone', phone);
      else localStorage.removeItem('thuna_custom_village_banner_phone');

      if (link) localStorage.setItem('thuna_custom_village_banner_link', link);
      else localStorage.removeItem('thuna_custom_village_banner_link');
    } catch (err) {
      console.warn('LocalStorage error:', err);
    }

    // Real-time Cloud Sync across all phones via Supabase
    if (window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.saveEmergencyContact === 'function') {
      window.NN_SUPABASE_SERVICES.saveEmergencyContact({
        id: 'app_setting_home_banner',
        category: 'app_setting_home_banner',
        title: title,
        badge: sub,
        icon: bannerArt,
        description: desc,
        phone: phone,
        location: link,
        createdAt: Date.now()
      }).catch(e => console.warn('Supabase sync error:', e));
    }

    // Refresh active app home hero card immediately
    if (typeof renderAdByIndex === 'function') {
      renderAdByIndex(0);
    } else {
      const homeImg = document.getElementById('homeVillageBannerFullImg');
      const homeTitle = document.getElementById('homeVillageBannerTitle');
      const homeSub = document.getElementById('homeVillageBannerSub');
      if (homeImg) homeImg.src = bannerArt;
      if (homeTitle) homeTitle.textContent = title;
      if (homeSub) homeSub.textContent = sub;
    }

    toast('🎉 ഹോം പേജ് ചിത്രം തത്സമയം പബ്ലിഷ് ചെയ്തു! (Live Real-Time Updated)');
    closeModal('modal-admin-hub');
  }
  window.saveAdminHomeBannerFromApp = saveAdminHomeBannerFromApp;

  function resetAdminHomeBannerFromApp() {
    tempAdminHomeBannerBase64 = null;
    try {
      localStorage.removeItem('thuna_custom_village_banner_art');
      localStorage.setItem('thuna_custom_village_banner_title', 'നമ്മുടെ നാട്');
      localStorage.setItem('thuna_custom_village_banner_sub', '🤝 നാടിനൊപ്പം നാം');
      localStorage.removeItem('thuna_custom_village_banner_desc');
      localStorage.removeItem('thuna_custom_village_banner_phone');
      localStorage.removeItem('thuna_custom_village_banner_link');
    } catch (_) {}

    const titleInput = document.getElementById('adminInAppBannerTitle');
    const subInput = document.getElementById('adminInAppBannerSub');
    const descInput = document.getElementById('adminInAppBannerDesc');
    const phoneInput = document.getElementById('adminInAppBannerPhone');
    const linkInput = document.getElementById('adminInAppBannerLink');
    const urlInput = document.getElementById('adminInAppBannerUrlInput');
    const previewImg = document.getElementById('adminInAppBannerPreviewImg');

    if (titleInput) titleInput.value = 'നമ്മുടെ നാട്';
    if (subInput) subInput.value = '🤝 നാടിനൊപ്പം നാം';
    if (descInput) descInput.value = '';
    if (phoneInput) phoneInput.value = '';
    if (linkInput) linkInput.value = '';
    if (urlInput) urlInput.value = '';
    if (previewImg) previewImg.src = 'img/kerala-splash.jpg';

    updateAdminInAppHomeBannerMockup();

    if (window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.saveEmergencyContact === 'function') {
      window.NN_SUPABASE_SERVICES.saveEmergencyContact({
        id: 'app_setting_home_banner',
        category: 'app_setting_home_banner',
        title: 'നമ്മുടെ നാട്',
        badge: '🤝 നാടിനൊപ്പം നാം',
        icon: 'img/kerala-splash.jpg',
        description: '',
        phone: '',
        location: '',
        createdAt: Date.now()
      }).catch(() => {});
    }

    if (typeof renderAdByIndex === 'function') {
      renderAdByIndex(0);
    }

    toast('🔄 ഡിഫോൾട്ട് പച്ചപ്പ് തീമിലേക്ക് റീസെറ്റ് ചെയ്തു.');
  }
  window.resetAdminHomeBannerFromApp = resetAdminHomeBannerFromApp;

  let tempAdminSplashBase64 = null;

  function handleAdminSplashPhotoSelected(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    if (typeof toast === 'function') toast('⏳ ചിത്രം ഒപ്റ്റിമൈസ് ചെയ്യുന്നു...');
    smartCompressImage(file, { maxDim: 1080, quality: 0.82 }, function(compressed) {
      if (!compressed) return;
      tempAdminSplashBase64 = compressed;
      const preview = document.getElementById('adminSplashPreview');
      if (preview) preview.src = tempAdminSplashBase64;
      toast('📸 ഫോട്ടോ ഒപ്റ്റിമൈസ് ചെയ്തു തയ്യാറാക്കി! സേവ് ചെയ്യാൻ താഴെയുള്ള ബട്ടൺ അമർത്തുക.');
    });
  }
  window.handleAdminSplashPhotoSelected = handleAdminSplashPhotoSelected;

  function previewAdminSplashUrl(url) {
    const preview = document.getElementById('adminSplashPreview');
    if (preview && url && url.startsWith('http')) {
      preview.src = url.trim();
    }
  }
  window.previewAdminSplashUrl = previewAdminSplashUrl;

  function saveAdminSplashPhoto() {
    const preview = document.getElementById('adminSplashPreview');
    const urlInput = document.getElementById('adminSplashUrlInput');
    const targetSrc = tempAdminSplashBase64 || (urlInput && urlInput.value.trim()) || (preview && preview.src);

    if (!targetSrc) {
      toast('⚠️ ദയവായി ഒരു ഫോട്ടോ തിരഞ്ഞെടുക്കുക.');
      return;
    }

    try {
      localStorage.setItem('nn_app_splash_bg', targetSrc);
    } catch (_) {}
    const mainSplash = document.getElementById('splashMainBgImage');
    if (mainSplash) mainSplash.src = targetSrc;

    // Broadcast update across devices via Supabase emergency / settings table
    if (window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.saveEmergencyContact === 'function') {
      window.NN_SUPABASE_SERVICES.saveEmergencyContact({
        id: 'app_setting_splash_bg',
        name: 'Splash Background Image',
        phone: '112',
        category: 'utility',
        location: targetSrc.substring(0, 500),
        description: targetSrc
      });
    }

    toast('🎉 ഓപ്പണിംഗ് ഫോട്ടോ വിജയകരമായി അപ്‌ഡേറ്റ് ചെയ്തു!');
    closeModal('modal-admin-hub');
  }
  window.saveAdminSplashPhoto = saveAdminSplashPhoto;

  function resetAdminSplashPhoto() {
    tempAdminSplashBase64 = null;
    localStorage.removeItem('nn_app_splash_bg');
    const mainSplash = document.getElementById('splashMainBgImage');
    if (mainSplash) mainSplash.src = 'img/kerala-splash.jpg';
    const preview = document.getElementById('adminSplashPreview');
    if (preview) preview.src = 'img/kerala-splash.jpg';
    const urlInput = document.getElementById('adminSplashUrlInput');
    if (urlInput) urlInput.value = '';
    toast('🔄 ഡിഫോൾട്ട് ചിത്രം പുനഃസ്ഥാപിച്ചു.');
  }
  window.resetAdminSplashPhoto = resetAdminSplashPhoto;

  function submitAdminAddService(e) {
    if (e) e.preventDefault();
    const name = (document.getElementById('adminSvcName')?.value || document.getElementById('admSrvName')?.value || '').trim();
    const trade = (document.getElementById('adminSvcTrade')?.value || document.getElementById('admSrvTrade')?.value || '').trim();
    const cat = document.getElementById('adminSvcCategory')?.value || document.getElementById('admSrvCategory')?.value || 'other';
    const phone = (document.getElementById('adminSvcPhone')?.value || document.getElementById('admSrvPhone')?.value || '').trim();
    const loc = (document.getElementById('adminSvcLoc')?.value || document.getElementById('admSrvLocation')?.value || '').trim();
    const exp = (document.getElementById('adminSvcDesc')?.value || document.getElementById('admSrvExp')?.value || '').trim();
    const rawFee = (document.getElementById('adminSvcFee')?.value || document.getElementById('admSrvFee')?.value || '').trim();
    const fee = rawFee ? formatPrice(rawFee) : '₹200 വിസിറ്റിംഗ് നിരക്ക്';
    const hours = (document.getElementById('adminSvcHours')?.value || document.getElementById('admSrvHours')?.value || '').trim();
    const icon = document.getElementById('adminSvcIcon')?.value || '🛠️';

    if (!name || !trade || !phone || !loc) {
      toast('⚠️ ദയവായി പേര്, തൊഴിൽ, ഫോൺ, സ്ഥലം നൽകുക.');
      return;
    }

    const newService = {
      id: 'srv_adm_' + Date.now(),
      name: name,
      trade: trade,
      category: cat,
      icon: icon,
      phone: phone,
      location: loc,
      experience: exp || 'പരിചയസമ്പന്നൻ',
      visitingFee: fee,
      workHours: hours || 'രാവിലെ 8:00 AM - വൈകുന്നേരം 7:30 PM',
      rating: '5.0',
      reviewsCount: 1,
      verified: true,
      isUserCreated: false,
      timestamp: Date.now()
    };

    APP_STATE.services.unshift(newService);
    saveServices();

    if (window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.saveService === 'function') {
      window.NN_SUPABASE_SERVICES.saveService(newService);
    }

    renderServicesScreen();
    closeModal('modal-admin-hub');
    toast('✅ പുതിയ സർവീസ് അഡ്മിൻ വിജയകരമായി ചേർത്തു!');
    if (e.target && typeof e.target.reset === 'function') e.target.reset();
  }
  window.submitAdminAddService = submitAdminAddService;

  function submitAdminAddEmergencyNumber(e) {
    if (e) e.preventDefault();
    const name = (document.getElementById('adminNumTitle')?.value || document.getElementById('admEmgName')?.value || '').trim();
    const phone = (document.getElementById('adminNumPhone')?.value || document.getElementById('admEmgPhone')?.value || '').trim();
    const cat = document.getElementById('adminNumCategory')?.value || document.getElementById('admEmgCategory')?.value || 'utility';
    const loc = (document.getElementById('adminNumLoc')?.value || document.getElementById('admEmgLocation')?.value || '').trim();
    const desc = (document.getElementById('adminNumDesc')?.value || document.getElementById('admEmgDesc')?.value || '').trim();
    const icon = document.getElementById('adminNumIcon')?.value || '🚨';

    if (!name || !phone) {
      toast('⚠️ ദയവായി ഡിപ്പാർട്മെന്റ് പേരും ഫോൺ നമ്പറും നൽകുക.');
      return;
    }

    const newEmg = {
      id: 'emg_' + Date.now(),
      name: name,
      phone: phone,
      category: cat,
      categoryName: typeof getEmergencyCategoryNameMalayalam === 'function' ? getEmergencyCategoryNameMalayalam(cat) : 'അത്യാഹിതം',
      icon: icon,
      location: loc || 'കേരളം',
      description: desc || 'അടിയന്തര സഹായത്തിന് ബന്ധപ്പെടാം',
      created_at: Date.now()
    };

    if (!Array.isArray(APP_STATE.emergencyContacts)) APP_STATE.emergencyContacts = [];
    APP_STATE.emergencyContacts.unshift(newEmg);
    try {
      localStorage.setItem('nn_emergency_contacts', JSON.stringify(APP_STATE.emergencyContacts));
    } catch (_) {}

    if (window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.saveEmergencyContact === 'function') {
      window.NN_SUPABASE_SERVICES.saveEmergencyContact(newEmg);
    }

    renderEmergencyModalList();
    closeModal('modal-admin-hub');
    toast('✅ പുതിയ അത്യാവശ്യ നമ്പർ വിജയകരമായി ചേർത്തു!');
    if (e.target && typeof e.target.reset === 'function') e.target.reset();
  }
  window.submitAdminAddEmergencyNumber = submitAdminAddEmergencyNumber;

  // ==============================================================
  // 12. AMBULANCE EMERGENCY DIRECTORY & DRIVER REGISTRATION
  // ==============================================================
  const DEFAULT_AMBULANCES = [
    {
      id: 'amb_govt_108',
      name: 'കനിവ് 108 സൗജന്യ സർക്കാർ ആംബുലൻസ് (Govt 108)',
      vehicle: 'KL-Govt-108',
      type: '🟢 അത്യാഹിത & ഐസിയു സപ്പോർട്ട്',
      location: 'കേരളം ഒട്ടാകെ (24x7)',
      phone: '108',
      availability: '24x7 മുഴുവൻ സമയവും ലഭ്യമാണ്'
    }
  ];

  function getAmbulanceDriversList() {
    let custom = [];
    try {
      custom = JSON.parse(localStorage.getItem('nammude_ambulance_drivers') || '[]');
    } catch (_) {}

    // Also pull from registered services in APP_STATE where trade contains 'ആംബുലൻസ്'
    const srvDrivers = (APP_STATE.services || []).filter(s => 
      s.trade && (s.trade.toLowerCase().includes('ആംബുലൻസ്') || s.trade.toLowerCase().includes('ambulance'))
    ).map(s => ({
      id: s.id,
      name: s.name,
      vehicle: s.visitingFee || 'വാഹനം ലഭ്യമാണ്',
      type: '🟢 ഓക്സിജൻ സപ്പോർട്ട് (Verified)',
      location: resolveItemLocation(s) || 'തത്സമയ ലൊക്കേഷൻ',
      phone: s.phone,
      whatsapp: s.phone,
      availability: s.workHours || '24x7 മുഴുവൻ സമയവും ലഭ്യമാണ്'
    }));
    const seenPhones = new Set();
    const merged = [];
    [...custom, ...srvDrivers, ...DEFAULT_AMBULANCES].forEach(item => {
      const p = (item.phone || '').replace(/\D/g, '');
      if (p && !seenPhones.has(p)) {
        seenPhones.add(p);
        merged.push(item);
      } else if (!p) {
        merged.push(item);
      }
    });
    return merged;
  }
  function renderAmbulanceDrivers(query = '') {
    const listEl = document.getElementById('ambulanceDriversList');
    if (!listEl) return;
    let drivers = getAmbulanceDriversList();
    const q = (query || '').toLowerCase().trim();
    if (q) {
      drivers = drivers.filter(d => 
        (d.name && d.name.toLowerCase().includes(q)) ||
        (d.location && d.location.toLowerCase().includes(q)) ||
        (d.vehicle && d.vehicle.toLowerCase().includes(q)) ||
        (d.type && d.type.toLowerCase().includes(q)) ||
        (d.phone && d.phone.includes(q))
      );
    }
    const badgeEl = document.getElementById('ambDriversCountBadge');
    if (badgeEl) {
      badgeEl.textContent = `${drivers.length} എണ്ണം ലഭ്യമാണ്`;
    }
    if (drivers.length === 0) {
      listEl.innerHTML = `
        <div style="text-align:center;padding:24px 14px;background:#F8FAFC;border-radius:12px;border:1px dashed #CBD5E1">
          <div style="font-size:26px;margin-bottom:6px">🚑</div>
          <div style="font-size:13px;font-weight:700;color:#334151">ആംബുലൻസുകൾ കണ്ടെത്താനായില്ല</div>
          <div style="font-size:11px;color:#64748B;margin-top:2px">നിങ്ങളുടെ ആംബുലൻസ് നമ്പർ ഇവിടെ ചേർക്കാം</div>
          <button type="button" onclick="openAmbulanceDriverRegister()" style="margin-top:10px;background:#059669;color:#fff;border:none;padding:6px 14px;border-radius:20px;font-size:11.5px;font-weight:800;cursor:pointer">
            ➕ ആംബുലൻസ് ഡ്രൈവർ രജിസ്റ്റർ ചെയ്യാം
          </button>
        </div>
      `;
      return;
    }
    listEl.innerHTML = drivers.map(d => {
      const cleanPhone = (d.phone || '').replace(/\D/g, '');
      const waPhone = (d.whatsapp || d.phone || '').replace(/\D/g, '');
      const waUrl = waPhone ? `https://wa.me/91${waPhone.slice(-10)}?text=${encodeURIComponent('ഹലോ, അടിയന്തിര ആവശ്യത്തിന് ആംബുലൻസ് ലഭ്യമാണോ?')}` : '#';
      return `
        <div style="background:#FFFFFF;border:1px solid #CBD5E1;border-radius:14px;padding:12px;box-shadow:0 1px 4px rgba(0,0,0,0.03);display:flex;flex-direction:column;gap:8px">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px">
            <div style="display:flex;align-items:center;gap:8px">
              <div style="width:38px;height:38px;border-radius:10px;background:#FFF1F2;border:1px solid #FECDD3;color:#E11D48;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0">
                🚑
              </div>
              <div>
                <div style="font-weight:800;font-size:13.5px;color:#0F172A">${escapeHtml(d.name || 'ആംബുലൻസ് ഡ്രൈവർ')}</div>
                <div style="display:flex;align-items:center;gap:6px;margin-top:2px">
                  <span style="font-size:11px;font-weight:800;color:#0369A1;background:#F0F9FF;border:1px solid #BAE6FD;padding:1px 6px;border-radius:6px">
                    🚘 ${escapeHtml(d.vehicle || 'വാഹനം')}
                  </span>
                  <span style="font-size:10.5px;color:#059669;font-weight:700">
                    ${escapeHtml(d.type || 'ഓക്സിജൻ ആംബുലൻസ്')}
                  </span>
                </div>
              </div>
            </div>
            <span style="background:#ECFDF5;color:#065F46;border:1px solid #A7F3D0;font-size:10px;font-weight:800;padding:2px 8px;border-radius:10px;white-space:nowrap">
              🟢 24x7
            </span>
          </div>
          <div style="display:flex;align-items:center;gap:6px;font-size:11.5px;color:#64748B">
            <span>📍</span>
            <span>${escapeHtml(resolveItemLocation(d) || 'തത്സമയ ലൊക്കേഷൻ')}</span>
            ${d.availability ? `<span>• ⏰ ${escapeHtml(d.availability)}</span>` : ''}
          </div>
          <div style="display:flex;align-items:center;gap:8px;margin-top:2px">
            ${cleanPhone === '108' ? `
              <a href="tel:108" style="flex:1;background:linear-gradient(135deg, #E11D48 0%, #BE123C 100%);color:#fff;text-decoration:none;padding:10px;border-radius:10px;font-size:13px;font-weight:800;display:flex;align-items:center;justify-content:center;gap:6px;box-shadow:0 2px 6px rgba(225,29,72,0.25)">
                <span>📞 108 വിളിക്കുക (സൗജന്യ സർക്കാർ ആംബുലൻസ്)</span>
              </a>
            ` : `
              ${cleanPhone ? `
                <a href="tel:${cleanPhone}" style="flex:1;background:linear-gradient(135deg, #DC2626 0%, #B91C1C 100%);color:#fff;text-decoration:none;padding:10px;border-radius:10px;font-size:13px;font-weight:800;display:flex;align-items:center;justify-content:center;gap:6px;box-shadow:0 2px 6px rgba(220,38,38,0.25)">
                  <span>📞 വിളിക്കാം: ${escapeHtml(d.phone || cleanPhone)}</span>
                </a>
              ` : ''}
              <button onclick="openChatForAmbulance('${(d.name || 'ആംബുലൻസ്').replace(/'/g, "\\'")}', '${d.phone || ''}')" style="background:#0E7043;color:#fff;border:none;padding:10px 14px;border-radius:10px;font-size:13px;font-weight:800;display:flex;align-items:center;justify-content:center;gap:6px;cursor:pointer">
                <span>💬 ചാറ്റ്</span>
              </button>
            `}
          </div>
        </div>
      `;
    }).join('');
  }
  function filterAmbulances(query) {
    renderAmbulanceDrivers(query);
  }
  window.filterAmbulances = filterAmbulances;

  let activeAmbPoliceDistrict = 'all';

  function switchAmbHealthTab(tab) {
    const isAmb = tab === 'ambulance';
    const isPolice = tab === 'police';
    const isHosp = tab === 'hospital';

    const tabAmb = document.getElementById('ambSubTabAmbulance');
    const tabPolice = document.getElementById('ambSubTabPolice');
    const tabHosp = document.getElementById('ambSubTabHospital');

    const contentAmb = document.getElementById('ambTabContentAmbulance');
    const contentPolice = document.getElementById('ambTabContentPolice');
    const contentHosp = document.getElementById('ambTabContentHospital');

    if (tabAmb) {
      tabAmb.style.background = isAmb ? '#BE123C' : 'transparent';
      tabAmb.style.color = isAmb ? '#fff' : '#475569';
      tabAmb.style.fontWeight = isAmb ? '800' : '700';
    }
    if (tabPolice) {
      tabPolice.style.background = isPolice ? '#1E3A8A' : 'transparent';
      tabPolice.style.color = isPolice ? '#fff' : '#475569';
      tabPolice.style.fontWeight = isPolice ? '800' : '700';
    }
    if (tabHosp) {
      tabHosp.style.background = isHosp ? '#059669' : 'transparent';
      tabHosp.style.color = isHosp ? '#fff' : '#475569';
      tabHosp.style.fontWeight = isHosp ? '800' : '700';
    }

    if (contentAmb) contentAmb.style.display = isAmb ? 'flex' : 'none';
    if (contentPolice) {
      contentPolice.style.display = isPolice ? 'flex' : 'none';
      if (isPolice) {
        renderAmbPoliceList();
      }
    }
    if (contentHosp) {
      contentHosp.style.display = isHosp ? 'flex' : 'none';
      if (isHosp) {
        renderAmbHospitalsList();
      }
    }
  }
  window.switchAmbHealthTab = switchAmbHealthTab;

  function renderAmbPoliceList(query = '', district = null) {
    const container = document.getElementById('ambPoliceListContainer');
    if (!container) return;

    if (district !== null && district !== undefined) {
      activeAmbPoliceDistrict = district;
    } else {
      const select = document.getElementById('ambPoliceDistrictFilter');
      if (select && select.value) activeAmbPoliceDistrict = select.value;
    }

    const searchInput = document.getElementById('ambPoliceSearchInput');
    const q = String(query !== null && query !== undefined && query !== '' ? query : (searchInput ? searchInput.value : '')).trim().toLowerCase();

    // Source 1: 418 Kerala Police Stations
    const staticStations = (typeof window !== 'undefined' && Array.isArray(window.KERALA_ALL_POLICE_STATIONS))
      ? window.KERALA_ALL_POLICE_STATIONS
      : [];

    // Source 2: Dynamic emergency contacts
    const dynamicPolice = (APP_STATE.emergencyContacts || []).filter(c => {
      const cat = (c.category || '').toLowerCase();
      const name = (c.name || c.title || '').toLowerCase();
      return cat === 'police' || cat === 'പോലീസ്' || name.includes('പോലീസ്') || name.includes('police');
    });

    // Merge and deduplicate by clean phone
    const seenPhones = new Set();
    const allPolice = [];

    [...dynamicPolice, ...staticStations].forEach(item => {
      const clean = (item.phone || '').replace(/\D/g, '');
      if (!clean) return;
      if (!seenPhones.has(clean)) {
        seenPhones.add(clean);
        allPolice.push(item);
      }
    });

    // User's location details for jurisdiction detection
    const userDistrict = (APP_STATE.currentUser?.district || APP_STATE.location?.district || (typeof getNearestKeralaPreset === 'function' ? getNearestKeralaPreset(APP_STATE.location?.lat, APP_STATE.location?.lon)?.district : '') || '').trim();
    const userPlace = (APP_STATE.currentUser?.location || APP_STATE.location?.name || '').trim();
    const cleanTokens = userPlace
      .replace(/[(),]/g, ' ')
      .split(/\s+/)
      .map(t => t.trim().toLowerCase())
      .filter(t => t.length >= 3 && !['കേരളം', 'kerala', 'തത്സമയം', 'തത്സമയ', 'ലൊക്കേഷൻ', 'district', 'കേരള'].includes(t));

    // Filter by district if selected
    let filtered = allPolice;
    if (activeAmbPoliceDistrict && activeAmbPoliceDistrict !== 'all') {
      filtered = filtered.filter(item => {
        const itemDist = (item.district || '').toLowerCase();
        const targetDist = activeAmbPoliceDistrict.toLowerCase();
        return itemDist.includes(targetDist) || targetDist.includes(itemDist);
      });
    }

    // Filter by search query if user typed
    if (q) {
      filtered = filtered.filter(item => {
        const name = (item.name || item.title || '').toLowerCase();
        const loc = (item.location || '').toLowerCase();
        const dist = (item.district || '').toLowerCase();
        const phone = (item.phone || '').toLowerCase();
        const desc = (item.description || '').toLowerCase();
        return name.includes(q) || loc.includes(q) || dist.includes(q) || phone.includes(q) || desc.includes(q);
      });
    }

    // Score stations to find user's exact jurisdiction station
    function getStationJurisdictionScore(st) {
      let score = 0;
      const stName = (st.name || st.title || '').toLowerCase();
      const stLoc = (st.location || '').toLowerCase();
      const stDesc = (st.description || '').toLowerCase();
      const stDist = (st.district || '').toLowerCase();

      cleanTokens.forEach(tok => {
        if (stName.includes(tok)) score += 100;
        else if (stLoc.includes(tok)) score += 60;
        else if (stDesc.includes(tok)) score += 35;
      });

      if (userDistrict && (stDist.includes(userDistrict.toLowerCase()) || userDistrict.toLowerCase().includes(stDist))) {
        score += 10;
      }

      return score;
    }

    // Sort: stations with highest jurisdiction score come first
    filtered.sort((a, b) => getStationJurisdictionScore(b) - getStationJurisdictionScore(a));

    const badge = document.getElementById('ambPoliceCountBadge');
    if (badge) badge.textContent = `${filtered.length} സ്റ്റേഷനുകൾ`;

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="text-align:center;padding:28px 16px;background:#F8FAFC;border-radius:14px;border:1px dashed #CBD5E1;color:#64748B;font-size:13px">
          🔍 പോലീസ് സ്റ്റേഷൻ കണ്ടെത്തിയില്ല.<br>
          <span style="font-size:11px;color:#94A3B8;margin-top:4px;display:block">വേറെ ജില്ല തിരഞ്ഞെടുക്കുകയോ തിരച്ചിൽ മാറ്റുകയോ ചെയ്യാം</span>
        </div>
      `;
      return;
    }

    // Check if the top station is a high-confidence match for user's locality
    const topStation = filtered[0];
    const topScore = getStationJurisdictionScore(topStation);
    const hasJurisdictionMatch = !q && topScore >= 45;

    let html = '';

    if (hasJurisdictionMatch) {
      const cleanPhone = (topStation.phone || '').replace(/\D/g, '');
      const displayName = topStation.name || topStation.title || 'പോലീസ് സ്റ്റേഷൻ';
      const userLocLabel = userPlace && userPlace !== 'തത്സമയ ലൊക്കേഷൻ' ? userPlace : (topStation.location || topStation.district);

      html += `
        <!-- USER LOCAL JURISDICTION STATION SPOTLIGHT -->
        <div style="background:linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);border:2px solid #2563EB;border-radius:16px;padding:14px;box-shadow:0 4px 14px rgba(37,99,235,0.15);display:flex;flex-direction:column;gap:10px;margin-bottom:6px">
          <div style="display:flex;align-items:center;justify-content:space-between">
            <span style="font-size:11px;font-weight:900;color:#1E3A8A;background:#BFDBFE;padding:3px 10px;border-radius:20px;display:flex;align-items:center;gap:4px">
              📍 നിങ്ങളുടെ പരിധിയിലുള്ള സ്റ്റേഷൻ (${escapeHtml(userLocLabel)})
            </span>
            <span style="font-size:10px;font-weight:800;color:#166534;background:#DCFCE7;border:1px solid #86EFAC;padding:2px 8px;border-radius:10px">
              🟢 24x7 അടിയന്തരം
            </span>
          </div>

          <div style="display:flex;align-items:flex-start;gap:12px">
            <div style="width:46px;height:46px;border-radius:14px;background:#1E3A8A;color:#fff;display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0;box-shadow:0 3px 8px rgba(30,58,138,0.3)">
              👮
            </div>
            <div style="min-width:0;flex:1">
              <div style="font-size:15px;font-weight:900;color:#0F172A;line-height:1.25">${escapeHtml(displayName)}</div>
              <div style="font-size:11.5px;color:#475569;margin-top:3px">
                ${topStation.location ? `📍 ${escapeHtml(topStation.location)}` : ''} 
                ${topStation.district ? `&bull; 🏛️ ${escapeHtml(topStation.district)}` : ''}
              </div>
              <div style="font-size:14px;font-weight:900;color:#1D4ED8;margin-top:4px;letter-spacing:0.5px">
                ☎️ ${escapeHtml(topStation.phone)}
              </div>
            </div>
          </div>

          <div style="display:flex;align-items:center;gap:8px;margin-top:2px">
            <a href="tel:${cleanPhone}" style="flex:2;background:linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 100%);color:#fff;text-decoration:none;padding:10px 14px;border-radius:12px;font-size:13px;font-weight:900;display:flex;align-items:center;justify-content:center;gap:6px;box-shadow:0 3px 10px rgba(30,58,138,0.3)">
              <span>📞 നേരിട്ട് വിളിക്കാം</span>
            </a>
            <button type="button" onclick="navigator.clipboard?.writeText('${escapeHtml(topStation.phone)}'); if(typeof toast==='function')toast('📋 നമ്പർ കോപ്പി ചെയ്തു: ${escapeHtml(topStation.phone)}')" style="flex:1;background:#FFFFFF;color:#1E3A8A;border:1.5px solid #BFDBFE;padding:10px;border-radius:12px;font-size:12px;font-weight:800;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:4px">
              📋 കോപ്പി
            </button>
          </div>
        </div>

        <div style="font-size:12px;font-weight:800;color:#475569;margin:8px 0 2px;display:flex;align-items:center;justify-content:space-between">
          <span>ജില്ലയിലെ മറ്റു പോലീസ് സ്റ്റേഷനുകൾ</span>
          <span style="font-size:10.5px;color:#64748B">${filtered.length - 1} എണ്ണം</span>
        </div>
      `;
    }

    const restStations = hasJurisdictionMatch ? filtered.slice(1, 100) : filtered.slice(0, 100);

    html += restStations.map(item => {
      const cleanPhone = (item.phone || '').replace(/\D/g, '');
      const displayName = item.name || item.title || 'പോലീസ് സ്റ്റേഷൻ';
      return `
        <div style="background:#FFFFFF;border:1px solid #E2E8F0;border-radius:14px;padding:12px 14px;display:flex;align-items:center;justify-content:space-between;gap:10px;box-shadow:0 1px 3px rgba(0,0,0,0.03)">
          <div style="display:flex;align-items:flex-start;gap:10px;min-width:0;flex:1">
            <span style="font-size:24px;flex-shrink:0;margin-top:2px">👮</span>
            <div style="min-width:0;flex:1">
              <div style="font-weight:800;font-size:13.5px;color:#0F172A;line-height:1.3">${escapeHtml(displayName)}</div>
              <div style="display:flex;align-items:center;gap:6px;margin-top:3px;flex-wrap:wrap">
                ${item.district ? `<span style="font-size:10.5px;font-weight:700;color:#1E3A8A;background:#EFF6FF;padding:1px 6px;border-radius:6px;border:1px solid #BFDBFE">🏛️ ${escapeHtml(item.district)}</span>` : ''}
                ${item.location ? `<span style="font-size:11px;color:#64748B">📍 ${escapeHtml(item.location)}</span>` : ''}
              </div>
              <div style="font-size:12px;font-weight:800;color:#2563EB;margin-top:4px;letter-spacing:0.3px">
                ☎️ ${escapeHtml(item.phone)}
              </div>
            </div>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;flex-shrink:0">
            <a href="tel:${cleanPhone}" style="background:linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 100%);color:#fff;text-decoration:none;padding:7px 12px;border-radius:10px;font-size:12px;font-weight:800;display:flex;align-items:center;justify-content:center;gap:4px;box-shadow:0 2px 6px rgba(30,58,138,0.25)">
              <span>📞 വിളിക്കാം</span>
            </a>
            <button type="button" onclick="navigator.clipboard?.writeText('${escapeHtml(item.phone)}'); if(typeof toast==='function')toast('📋 നമ്പർ കോപ്പി ചെയ്തു: ${escapeHtml(item.phone)}')" style="background:#F1F5F9;color:#334155;border:1px solid #CBD5E1;padding:5px 8px;border-radius:8px;font-size:11px;font-weight:700;cursor:pointer">
              📋 കോപ്പി
            </button>
          </div>
        </div>
      `;
    }).join('');

    if (filtered.length > 100) {
      html += `
        <div style="text-align:center;padding:10px;color:#64748B;font-size:12px;font-weight:600">
          ആകെ ${filtered.length} സ്റ്റേഷനുകൾ. ജില്ല അല്ലെങ്കിൽ പേര് സെർച്ച് ചെയ്യാം.
        </div>
      `;
    }

    container.innerHTML = html;
  }
  window.renderAmbPoliceList = renderAmbPoliceList;

  function filterAmbPolice(val) {
    renderAmbPoliceList(val);
  }
  window.filterAmbPolice = filterAmbPolice;

  function filterAmbPoliceDistrict(dist) {
    activeAmbPoliceDistrict = dist;
    renderAmbPoliceList();
  }
  window.filterAmbPoliceDistrict = filterAmbPoliceDistrict;

  function renderAmbHospitalsList(query = '') {
    const container = document.getElementById('ambHospitalsListContainer');
    if (!container) return;

    const q = String(query || '').trim().toLowerCase();
    const contacts = (APP_STATE.emergencyContacts || []).filter(c => {
      const isHealth = (c.category === 'ആരോഗ്യം' || c.category === 'healthcare' || (c.name && c.name.toLowerCase().includes('hospital')) || (c.name && c.name.includes('ആശുപത്രി')));
      if (!isHealth) return false;
      if (!q) return true;
      return (c.name && c.name.toLowerCase().includes(q)) ||
             (c.location && c.location.toLowerCase().includes(q)) ||
             (c.phone && c.phone.includes(q));
    });

    const badge = document.getElementById('ambHospitalsCountBadge');
    if (badge) badge.textContent = `${contacts.length} എണ്ണം`;

    if (contacts.length === 0) {
      container.innerHTML = `
        <div style="text-align:center;padding:24px;background:#F8FAFC;border-radius:12px;color:#64748B;font-size:13px">
          ആശുപത്രികൾ കണ്ടെത്തിയില്ല
        </div>
      `;
      return;
    }

    container.innerHTML = contacts.map(c => {
      const cleanPhone = (c.phone || '').replace(/\D/g, '');
      return `
        <div style="background:#FFFFFF;border:1px solid #E2E8F0;border-radius:14px;padding:12px;display:flex;align-items:center;justify-content:space-between;gap:8px">
          <div style="display:flex;align-items:center;gap:10px;min-width:0;flex:1">
            <span style="font-size:24px;flex-shrink:0">🏥</span>
            <div style="min-width:0;flex:1">
              <div style="font-weight:800;font-size:13.5px;color:#0F172A;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(c.name)}</div>
              <div style="font-size:11px;color:#64748B;margin-top:2px">
                ${c.location ? `📍 ${escapeHtml(c.location)} &bull; ` : ''}🟢 24x7 അടിയന്തര സേവനം
              </div>
            </div>
          </div>
          <a href="tel:${cleanPhone}" style="flex-shrink:0;background:linear-gradient(135deg, #059669 0%, #047857 100%);color:#fff;text-decoration:none;padding:7px 12px;border-radius:10px;font-size:12px;font-weight:800;display:flex;align-items:center;gap:4px;box-shadow:0 2px 6px rgba(5,150,105,0.25)">
            <span>📞 വിളിക്കാം</span>
          </a>
        </div>
      `;
    }).join('');
  }
  window.renderAmbHospitalsList = renderAmbHospitalsList;

  function filterAmbHospitals(val) {
    renderAmbHospitalsList(val);
  }
  window.filterAmbHospitals = filterAmbHospitals;

  function openAmbulanceModal(tab) {
    const distSelect = document.getElementById('ambPoliceDistrictFilter');
    if (distSelect && typeof APP_STATE !== 'undefined') {
      const userDist = APP_STATE.currentUser?.district || APP_STATE.location?.district || '';
      if (userDist) {
        for (let i = 0; i < distSelect.options.length; i++) {
          if (distSelect.options[i].value && userDist.includes(distSelect.options[i].value)) {
            distSelect.selectedIndex = i;
            activeAmbPoliceDistrict = distSelect.options[i].value;
            break;
          }
        }
      }
    }
    renderAmbulanceDrivers();
    switchAmbHealthTab(tab || 'ambulance');
    openModal('modal-ambulance');
  }
  window.openAmbulanceModal = openAmbulanceModal;
  window.openEmergencyHubModal = openAmbulanceModal;
  function openAmbulanceDriverRegister() {
    closeModal('modal-ambulance');
    const nameInput = document.getElementById('ambDriverName');
    const phoneInput = document.getElementById('ambDriverPhone');
    const waInput = document.getElementById('ambDriverWhatsApp');
    const locInput = document.getElementById('ambDriverLocation');
    if (nameInput && !nameInput.value) {
      nameInput.value = (APP_STATE.currentUser.name && APP_STATE.currentUser.name !== 'നാട്ടുകാരൻ') ? APP_STATE.currentUser.name : '';
    }
    if (phoneInput && !phoneInput.value) {
      phoneInput.value = APP_STATE.currentUser.phone || '';
    }
    if (waInput && !waInput.value) {
      waInput.value = APP_STATE.currentUser.phone || '';
    }
    if (locInput && !locInput.value) {
      locInput.value = (APP_STATE.currentUser.location && !APP_STATE.currentUser.location.includes('കണ്ണൂർ'))
        ? APP_STATE.currentUser.location
        : ((APP_STATE.location.name && !APP_STATE.location.name.includes('കണ്ണൂർ') && APP_STATE.location.name !== 'തത്സമയ ലൊക്കേഷൻ') ? APP_STATE.location.name : '');
    }
    openModal('modal-ambulance-driver');
  }
  window.openAmbulanceDriverRegister = openAmbulanceDriverRegister;

  function submitAmbulanceDriverRegistration(e) {
    if (e) e.preventDefault();
    const name = (document.getElementById('ambDriverName')?.value || '').trim();
    const phone = (document.getElementById('ambDriverPhone')?.value || '').trim();
    const whatsapp = (document.getElementById('ambDriverWhatsApp')?.value || phone).trim();
    const vehicle = (document.getElementById('ambVehicleNo')?.value || '').trim();
    const type = (document.getElementById('ambVehicleType')?.value || 'ഓക്സിജൻ ആംബുലൻസ്').trim();
    const location = (document.getElementById('ambDriverLocation')?.value || '').trim();
    const availability = (document.getElementById('ambAvailability')?.value || '24x7 മുഴുവൻ സമയവും ലഭ്യമാണ്').trim();
    const licence = (document.getElementById('ambLicenceNo')?.value || '').trim();

    if (!name || !phone || !vehicle || !location) {
      toast('⚠️ ദയവായി പേര്, ഫോൺ നമ്പർ, വാഹന നമ്പർ, സ്ഥലം എന്നിവ നൽകുക.');
      return;
    }

    const newAmb = {
      id: 'amb_' + Date.now(),
      name: name,
      phone: phone,
      whatsapp: whatsapp,
      vehicle: vehicle,
      type: type,
      location: location,
      availability: availability,
      licence: licence,
      lat: APP_STATE.location.lat,
      lon: APP_STATE.location.lon,
      createdAt: Date.now()
    };

    let list = [];
    try {
      list = JSON.parse(localStorage.getItem('nammude_ambulance_drivers') || '[]');
    } catch (_) {}
    list.unshift(newAmb);
    try {
      localStorage.setItem('nammude_ambulance_drivers', JSON.stringify(list));
    } catch (_) {}

    // Sync to Supabase Cloud so all other phones receive it
    if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES) {
      if (typeof window.NN_SUPABASE_SERVICES.saveAmbulanceDriver === 'function') {
        window.NN_SUPABASE_SERVICES.saveAmbulanceDriver(newAmb);
      }
    }

    closeModal('modal-ambulance-driver');
    openAmbulanceModal();
    renderAmbulanceDrivers();
    toast('🚑 ആംബുലൻസ് ഡ്രൈവർ രജിസ്ട്രേഷൻ വിജയകരമായി പൂർത്തിയായി! അടിയന്തര ലിസ്റ്റിൽ ചേർത്തു.');
  }
  window.submitAmbulanceDriverRegistration = submitAmbulanceDriverRegistration;

  // ==============================================================
  // 13. JOBS PORTAL & LOCAL RENTALS / MARKETPLACE
  // ==============================================================
  function switchJobsTab(tab) {
    APP_STATE.activeJobsSubTab = tab;
    document.querySelectorAll('.jobs-tab-toggle').forEach(el => {
      el.classList.toggle('active', el.dataset.tab === tab);
    });

    const jobsSection = document.getElementById('jobsSectionWrapper');
    const rentalsSection = document.getElementById('rentalsSectionWrapper');
    if (jobsSection && rentalsSection) {
      if (tab === 'jobs') {
        jobsSection.style.display = 'block';
        rentalsSection.style.display = 'none';
      } else {
        jobsSection.style.display = 'none';
        rentalsSection.style.display = 'block';
      }
    }
  }
  window.switchJobsTab = switchJobsTab;

  function filterJobCategory(cat) {
    APP_STATE.activeJobCategory = cat;
    document.querySelectorAll('.job-cat-chip').forEach(c => {
      c.classList.toggle('active', c.dataset.cat === cat);
    });
    renderJobsScreen();
  }
  window.filterJobCategory = filterJobCategory;

  function renderJobsScreen() {
    const jobsListEl = document.getElementById('jobsListContainer');
    if (!jobsListEl) return;

    const maxRadius = APP_STATE.radiusFilters.jobs;
    const searchInput = document.getElementById('jobSearchInput');
    const query = (searchInput ? searchInput.value : '').toLowerCase().trim();

    let allMatchingJobs = APP_STATE.jobs.filter(j => {
      const matchesCat = (APP_STATE.activeJobCategory === 'all') || (j.category === APP_STATE.activeJobCategory);
      const matchesQuery = !query || j.title.toLowerCase().includes(query) || j.employer.toLowerCase().includes(query) || (j.description && j.description.toLowerCase().includes(query));
      const dist = getItemDistanceKm(j, APP_STATE.location.lat, APP_STATE.location.lon);
      j._calculatedDist = dist;
      return matchesCat && matchesQuery;
    });

    allMatchingJobs.sort((a, b) => a._calculatedDist - b._calculatedDist);

    let filteredJobs = (maxRadius >= 1000) ? allMatchingJobs : allMatchingJobs.filter(j => j._calculatedDist <= maxRadius);

    if (filteredJobs.length === 0) {
      const radiusLabel = (maxRadius >= 1000) ? '' : ` (${maxRadius} km)`;
      jobsListEl.innerHTML = `
        <div style="text-align:center;padding:36px 16px;background:#fff;border-radius:16px;border:1px solid #E2E8F0">
          <div style="font-size:36px;margin-bottom:8px">💼</div>
          <h3 style="margin:0 0 6px;color:#111827">ഈ പ്രദേശത്ത് തൊഴിലുകൾ ലഭ്യമല്ല</h3>
          <p style="color:#6B7280;margin:0 0 14px;font-size:13px"><b>${escapeHtml(APP_STATE.location.name)}</b> പരിസരത്ത്${radiusLabel} തൊഴിൽ അവസരങ്ങളൊന്നും കണ്ടെത്തിയില്ല.</p>
          <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
            <button onclick="setGlobalRadius(25, null)" style="background:#EFF6FF;color:#0284C7;border:1px solid #BAE6FD;border-radius:10px;padding:8px 14px;font-weight:700;font-size:12px;cursor:pointer">25 km പരിധി</button>
            <button onclick="setGlobalRadius(1000, null)" style="background:#EFF6FF;color:#2563EB;border:1px solid #BFDBFE;border-radius:10px;padding:8px 14px;font-weight:700;font-size:12px;cursor:pointer">മുഴുവൻ കാണുക</button>
            <button onclick="openPostJobModal()" style="background:#0878D1;color:#fff;border:none;border-radius:10px;padding:8px 16px;font-weight:800;font-size:12px;cursor:pointer">➕ തൊഴിൽ നൽകാം</button>
          </div>
        </div>
      `;
    } else {
      jobsListEl.innerHTML = filteredJobs.map(j => `
        <div class="job-card">
          <div style="display:flex;justify-content:space-between;align-items:flex-start">
            <div>
              <h3 style="margin:0 0 4px;font-size:15px;color:#111827">${j.title}</h3>
              <div style="font-size:12px;color:#0284C7;font-weight:700">${j.employer}</div>
            </div>
            <span class="job-salary-badge">💰 ${formatPrice(j.salary)}</span>
          </div>

          <div style="font-size:12.5px;color:#4B5563;line-height:1.5">${j.description}</div>

          <div style="font-size:11px;color:#6B7280;display:flex;align-items:center;gap:6px">
            <span>📍 ${j.location}</span>
            <span>•</span>
            <span style="color:#0E7043;font-weight:700">${j._calculatedDist} km അകലെ</span>
          </div>

          <div style="display:flex;gap:8px;margin-top:6px">
            <button onclick="openApplyJobModal('${j.id}', '${j.title.replace(/'/g, "\\'")}', '${j.employer.replace(/'/g, "\\'")}', '${j.employerPhone}')" 
                    style="flex:1;background:#0878D1;color:#fff;border:none;padding:10px;border-radius:10px;font-weight:800;font-size:13px;cursor:pointer">
              📝 അപേക്ഷിക്കുക
            </button>
            <button onclick="openChatForJob('${j.id}')" 
                    style="flex:1;background:#E0F2FE;color:#0369A1;border:1px solid #BAE6FD;padding:10px 14px;border-radius:10px;font-weight:800;font-size:13px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px">
              💬 ചാറ്റ്
            </button>
          </div>
        </div>
      `).join('');
    }
  }

  function filterRentalCategory(cat, btn) {
    APP_STATE.activeRentalCategory = cat;
    document.querySelectorAll('.rental-cat-chip').forEach(c => c.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderRentalsScreen();
  }
  window.filterRentalCategory = filterRentalCategory;

  function renderRentalsScreen() {
    const rentalsListEl = document.getElementById('rentalsListContainer');
    if (!rentalsListEl) return;

    const maxRadius = APP_STATE.radiusFilters.rentals || 10;
    const searchInput = document.getElementById('rentalSearchInput');
    const query = (searchInput ? searchInput.value : '').toLowerCase().trim();

    let allMatchingRentals = APP_STATE.rentals.filter(r => {
      let matchesCat = true;
      const isSale = r.listingType === 'sale' || (r.type && r.type.includes('വിൽപന')) || (r.title && r.title.includes('വിൽപന'));
      const isRent = !isSale;

      if (APP_STATE.activeRentalCategory === 'rent') {
        matchesCat = isRent;
      } else if (APP_STATE.activeRentalCategory === 'buysell') {
        matchesCat = isSale;
      } else if (APP_STATE.activeRentalCategory === 'house') {
        matchesCat = (r.type && (r.type.includes('വീട്') || r.type.includes('മുറി') || r.type.includes('ഹോസ്റ്റൽ') || r.type.includes('സ്ഥലം') || r.type.includes('ഫ്ലാറ്റ്'))) || (r.title && (r.title.includes('വീട്') || r.title.includes('റൂം') || r.title.includes('സ്ഥലം') || r.title.includes('പ്ലോട്ട്')));
      } else if (APP_STATE.activeRentalCategory === 'vehicle') {
        matchesCat = (r.type && (r.type.includes('വാഹന') || r.type.includes('കാർ') || r.type.includes('ജീപ്പ്') || r.type.includes('ബൈക്ക്') || r.type.includes('സ്കൂട്ടർ'))) || (r.title && (r.title.includes('പിക്കപ്പ്') || r.title.includes('ഓട്ടോ') || r.title.includes('കാർ') || r.title.includes('ബൈക്ക്')));
      } else if (APP_STATE.activeRentalCategory === 'tool') {
        matchesCat = (r.type && (r.type.includes('ടൂള') || r.type.includes('യന്ത്ര') || r.type.includes('ട്രാക്ടർ') || r.type.includes('പന്തൽ') || r.type.includes('കാറ്ററിംഗ്'))) || (r.title && (r.title.includes('മിക്സർ') || r.title.includes('യന്ത്ര') || r.title.includes('ട്രാക്ടർ')));
      }

      const matchesQuery = !query || r.title.toLowerCase().includes(query) || (r.owner && r.owner.toLowerCase().includes(query)) || (r.type && r.type.toLowerCase().includes(query));
      const dist = getItemDistanceKm(r, APP_STATE.location.lat, APP_STATE.location.lon);
      r._calculatedDist = dist;
      return matchesCat && matchesQuery;
    });

    allMatchingRentals.sort((a, b) => a._calculatedDist - b._calculatedDist);

    let filteredRentals = (maxRadius >= 1000) ? allMatchingRentals : allMatchingRentals.filter(r => r._calculatedDist <= maxRadius);

    if (filteredRentals.length === 0) {
      const radiusLabel = (maxRadius >= 1000) ? '' : ` (${maxRadius} km)`;
      rentalsListEl.innerHTML = `
        <div style="text-align:center;padding:36px 16px;background:#fff;border-radius:16px;border:1px solid #E2E8F0">
          <div style="font-size:36px;margin-bottom:8px">🏠</div>
          <h3 style="margin:0 0 6px;color:#111827">ഈ പ്രദേശത്ത് ഇനങ്ങൾ ലഭ്യമല്ല</h3>
          <p style="color:#6B7280;margin:0 0 14px;font-size:13px"><b>${escapeHtml(APP_STATE.location.name)}</b> പരിസരത്ത്${radiusLabel} വാടക/വിൽപന ഇനങ്ങൾ കണ്ടെത്തിയില്ല.</p>
          <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
            <button onclick="setGlobalRadius(25, null)" style="background:#ECFDF5;color:#0E7043;border:1px solid #A7F3D0;border-radius:10px;padding:8px 14px;font-weight:700;font-size:12px;cursor:pointer">25 km പരിധി</button>
            <button onclick="setGlobalRadius(1000, null)" style="background:#EFF6FF;color:#2563EB;border:1px solid #BFDBFE;border-radius:10px;padding:8px 14px;font-weight:700;font-size:12px;cursor:pointer">മുഴുവൻ കാണുക</button>
            <button onclick="openAddRentalModal()" style="background:#0E7043;color:#fff;border:none;border-radius:10px;padding:8px 16px;font-weight:800;font-size:12px;cursor:pointer">➕ ലിസ്റ്റ് ചെയ്യാം</button>
          </div>
        </div>
      `;
    } else {
      rentalsListEl.innerHTML = filteredRentals.map(r => {
        const isSale = r.listingType === 'sale' || (r.type && r.type.includes('വിൽപന')) || (r.title && r.title.includes('വിൽപന'));
        const typeBadge = isSale
          ? '<span style="background:#EFF6FF;color:#1D4ED8;border:1px solid #BFDBFE;padding:3px 8px;border-radius:6px;font-weight:800;font-size:11px;display:inline-flex;align-items:center;gap:3px"><span>🏷️</span><span>വിൽപനയ്ക്ക്</span></span>'
          : '<span style="background:#ECFDF5;color:#047857;border:1px solid #A7F3D0;padding:3px 8px;border-radius:6px;font-weight:800;font-size:11px;display:inline-flex;align-items:center;gap:3px"><span>🏠</span><span>വാടകയ്ക്ക്</span></span>';

        const priceBadgeColor = isSale ? '#1D4ED8' : '#B45309';
        const priceBadgeBg = isSale ? '#EFF6FF' : '#FEF3C7';
        const priceText = isSale ? `വില: ${formatPrice(r.rate || r.price)}` : formatPrice(r.rate || r.price);

        return `
          <div class="job-card" style="background:#fff;border-radius:16px;padding:14px;border:1px solid #E2E8F0;box-shadow:0 1px 3px rgba(0,0,0,0.04);margin-bottom:10px">
            ${r.image ? `<img src="${r.image}" style="width:100%;height:160px;object-fit:cover;border-radius:12px;margin-bottom:10px;border:1px solid #E2E8F0">` : ''}
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px">
              <div>
                <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
                  ${typeBadge}
                  <span style="font-size:11px;color:#64748B;font-weight:700">${escapeHtml(r.type || 'ജനറൽ')}</span>
                </div>
                <h3 style="margin:0 0 4px;font-size:15px;font-weight:800;color:#0F172A">${escapeHtml(r.title)}</h3>
              </div>
              <span style="background:${priceBadgeBg};color:${priceBadgeColor};padding:4px 10px;border-radius:8px;font-size:12.5px;font-weight:800;white-space:nowrap">${priceText}</span>
            </div>
            <div style="font-size:12px;color:#64748B;margin-top:4px">
              <span>ഉടമസ്ഥൻ: <b>${escapeHtml(r.owner)}</b></span> • <span>📍 ${escapeHtml(r.location)}</span> • <span style="color:#0E7043;font-weight:800">${r._calculatedDist || 1.2} km അകലെ</span>
            </div>
            <div style="margin-top:10px">
              <button onclick="openChatForRental('${r.id}')" style="width:100%;background:#0E7043;color:#fff;border:none;padding:10px;border-radius:12px;font-weight:800;font-size:13px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;box-shadow:0 2px 6px rgba(14,112,67,0.2)">💬 ചാറ്റ്</button>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  function openApplyJobModal(id, title, employer, phone) {
    const titleEl = document.getElementById('applyJobModalTitle');
    const empEl = document.getElementById('applyJobEmployer');
    if (titleEl) titleEl.textContent = title;
    if (empEl) empEl.textContent = `${employer} (ഫോൺ: ${phone})`;
    openModal('modal-apply-job');
  }
  window.openApplyJobModal = openApplyJobModal;

  function submitJobApplication(e) {
    if (e) e.preventDefault();
    const name = document.getElementById('applyName').value.trim();
    const phone = document.getElementById('applyPhone').value.trim();

    if (!name || !phone) {
      toast('⚠️ പേരും ഫോൺ നമ്പറും നൽകുക.');
      return;
    }

    closeModal('modal-apply-job');
    toast('🎉 താങ്കളുടെ അപേക്ഷ തൊഴിൽദാതാവിന് കൈമാറി!');
  }
  window.submitJobApplication = submitJobApplication;

  function openPostJobModal() {
    const employerEl = document.getElementById('postJobEmployer');
    const phoneEl = document.getElementById('postJobPhone');
    const locEl = document.getElementById('postJobLocation');
    if (employerEl && !employerEl.value && APP_STATE.currentUser?.name) {
      employerEl.value = APP_STATE.currentUser.name;
    }
    if (phoneEl && !phoneEl.value && APP_STATE.currentUser?.phone) {
      phoneEl.value = APP_STATE.currentUser.phone;
    }
    if (locEl && !locEl.value && APP_STATE.location?.name) {
      locEl.value = APP_STATE.location.name;
    }
    openModal('modal-post-job');
  }
  window.openPostJobModal = openPostJobModal;

  function submitJobPosting(e) {
    if (e) e.preventDefault();
    const titleEl = document.getElementById('postJobTitle');
    const employerEl = document.getElementById('postJobEmployer');
    const catEl = document.getElementById('postJobCategory');
    const phoneEl = document.getElementById('postJobPhone');
    const salaryEl = document.getElementById('postJobSalary');
    const locEl = document.getElementById('postJobLocation');
    const descEl = document.getElementById('postJobDesc');

    const title = titleEl ? titleEl.value.trim() : '';
    const employer = employerEl && employerEl.value.trim() ? employerEl.value.trim() : (APP_STATE.currentUser?.name || 'തൊഴിൽദാതാവ്');
    const category = (catEl && catEl.value) ? catEl.value : 'other';
    const phone = phoneEl ? phoneEl.value.trim() : (APP_STATE.currentUser?.phone || '');
    const salaryRaw = salaryEl && salaryEl.value.trim() ? salaryEl.value.trim() : '';
    const salary = salaryRaw ? formatPrice(salaryRaw) : 'ശമ്പളം സംസാരിക്കാം';
    const location = locEl && locEl.value.trim() ? locEl.value.trim() : (APP_STATE.location?.name || 'കേരളം');
    const desc = descEl ? descEl.value.trim() : '';

    if (!title || !phone) {
      toast('⚠️ തലക്കെട്ടും ഫോൺ നമ്പറും നൽകുക.');
      return;
    }

    const newJob = {
      id: 'job_' + Date.now(),
      title: title,
      employer: employer,
      employerPhone: phone,
      phone: phone,
      category: category,
      salary: salary,
      type: 'ഫുൾ ടൈം',
      location: location,
      district: APP_STATE.location?.district || getNearestKeralaPreset(APP_STATE.location?.lat, APP_STATE.location?.lon).district || '',
      lat: APP_STATE.location?.lat || 10.8505,
      lon: APP_STATE.location?.lon || 76.2711,
      description: desc,
      createdAt: Date.now(),
      isCloud: true
    };

    APP_STATE.jobs.unshift(newJob);
    try {
      localStorage.setItem('nn_jobs', JSON.stringify(APP_STATE.jobs));
    } catch (_) {}

    // Save job posting to Supabase Cloud
    if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.saveJob === 'function') {
      window.NN_SUPABASE_SERVICES.saveJob(newJob);
    }

    // Reset inputs
    if (titleEl) titleEl.value = '';
    if (salaryEl) salaryEl.value = '';
    if (descEl) descEl.value = '';

    // Switch active category filter to 'all' so new job is visible immediately
    APP_STATE.activeJobCategory = 'all';
    document.querySelectorAll('.job-cat-chip').forEach(c => {
      c.classList.toggle('active', c.dataset.cat === 'all');
    });

    closeModal('modal-post-job');
    renderJobsScreen();
    toast('🎉 തൊഴിൽ അവസരം വിജയകരമായി പോസ്റ്റ് ചെയ്തു! ക്ലൗഡിലേക്ക് അപ്‌ലോഡ് ആയി.');
  }
  window.submitJobPosting = submitJobPosting;

  function refreshJobsLive() {
    toast('🔄 പുതിയ തൊഴിലുകൾ ക്ലൗഡിൽ നിന്ന് പരിശോധിക്കുന്നു...');
    if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.syncJobs === 'function') {
      window.NN_SUPABASE_SERVICES.syncJobs(() => {
        renderJobsScreen();
        toast('✅ പുതിയ തൊഴിൽ വിവരങ്ങൾ ലഭ്യമാക്കി!');
      });
    } else {
      renderJobsScreen();
    }
  }
  window.refreshJobsLive = refreshJobsLive;

  function openRentalBuySellSection() {
    navTo('jobs');
    switchJobsTab('rentals');
  }
  window.openRentalBuySellSection = openRentalBuySellSection;

  // ==============================================================
  // 14. NEARBY DISCOVERY SCREEN (സമീപത്തുള്ളവർ & സേവനങ്ങൾ)
  // ==============================================================
  function setNearbyCategory(category, clickedBtn) {
    APP_STATE.activeNearbyCategory = category || 'all';
    document.querySelectorAll('.nearby-cat-chip').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.cat === APP_STATE.activeNearbyCategory);
    });
    if (clickedBtn && !clickedBtn.classList.contains('active')) {
      clickedBtn.classList.add('active');
    }
    renderNearbyScreen();
  }
  window.setNearbyCategory = setNearbyCategory;

  function filterNearbyPeople(val) {
    APP_STATE.nearbySearchQuery = String(val || '').trim().toLowerCase();
    const clearBtn = document.getElementById('nearbyClearSearchBtn');
    if (clearBtn) {
      clearBtn.style.display = APP_STATE.nearbySearchQuery ? 'inline-block' : 'none';
    }
    renderNearbyScreen();
  }
  window.filterNearbyPeople = filterNearbyPeople;

  function clearNearbySearch() {
    const input = document.getElementById('nearbySearchInput');
    if (input) input.value = '';
    filterNearbyPeople('');
  }
  window.clearNearbySearch = clearNearbySearch;

  function renderNearbyScreen() {
    const container = document.getElementById('nearbyPeopleListContainer');
    if (!container) return;

    const maxRadius = APP_STATE.radiusFilters.nearby || 5;
    const catFilter = APP_STATE.activeNearbyCategory || 'all';
    const query = APP_STATE.nearbySearchQuery || '';
    const userTown = String(APP_STATE.location.name || 'കേരളം').split(',')[0].trim();

    const myId = (APP_STATE.currentUser && APP_STATE.currentUser.id) ? String(APP_STATE.currentUser.id) : '';
    const myPhone = (APP_STATE.currentUser && APP_STATE.currentUser.phone)
      ? String(APP_STATE.currentUser.phone).replace(/\D/g, '').slice(-10) : '';
    const myName = (APP_STATE.currentUser && APP_STATE.currentUser.name)
      ? String(APP_STATE.currentUser.name).trim().toLowerCase() : '';

    // Strictly exclude the current user so they only discover other people nearby
    function isCurrentUserEntity(id, phone, name, isCurrentUserFlag) {
      if (isCurrentUserFlag) return true;
      if (id) {
        const strId = String(id);
        if (strId.startsWith('usr_me_') || (myId && strId === myId)) return true;
      }
      if (myPhone && phone) {
        const cleanP = String(phone).replace(/\D/g, '').slice(-10);
        if (cleanP && cleanP === myPhone) return true;
      }
      if (myName && name) {
        const cleanN = String(name).trim().toLowerCase();
        if (cleanN === myName && cleanN !== 'നാട്ടുകാരൻ' && cleanN !== 'friend') return true;
      }
      if (name && (name.includes('നിങ്ങൾ') || name.includes('(You)'))) return true;
      return false;
    }

    // Aggregate ALL community entities within the region with complete null-safety
    let rawItems = [];
    const seenPhones = new Set();
    if (myPhone) seenPhones.add(myPhone);

    // 0. LIVE NEARBY HELP REQUESTS (1 to 10 km Community Help)
    const allHelpReqs = (APP_STATE.nearbyHelpRequests || []).concat(APP_STATE.serviceRequests || []);
    const seenReqIds = new Set();
    allHelpReqs.forEach(req => {
      if (!req || !req.id || seenReqIds.has(req.id)) return;
      seenReqIds.add(req.id);
      const isMine = isCurrentUserEntity(req.userId || req.id, req.phone, req.userName || req.name, false);
      const dist = getItemDistanceKm(req, APP_STATE.location.lat, APP_STATE.location.lon);
      req._calculatedDist = dist;

      const catIcons = {
        emergency: '🚨',
        vehicle: '🛞',
        medicine: '💊',
        repair: '🛠️',
        home: '📦',
        other: '🤝'
      };
      const catIcon = catIcons[req.category] || '🆘';
      const catTitles = {
        emergency: 'അടിയന്തിരം',
        vehicle: 'വാഹനം / ലിഫ്റ്റ്',
        medicine: 'മരുന്ന് / ആരോഗ്യം',
        repair: 'റിപ്പയർ / പണി',
        home: 'വീട്ടുസഹായം',
        other: 'സഹായം'
      };
      const catTitle = catTitles[req.category] || req.trade || 'സഹായം വേണം';

      rawItems.push({
        type: 'help',
        id: req.id,
        name: isMine ? 'നിങ്ങളുടെ സഹായ അഭ്യർത്ഥന' : (req.userName || req.name || 'സഹായം ആവശ്യമുള്ളയാൾ'),
        subtitle: req.description || req.note || 'സഹായം ആവശ്യമുണ്ട്',
        icon: catIcon,
        avatar: isMine ? ((APP_STATE.currentUser && APP_STATE.currentUser.avatar) || window.DEFAULT_USER_AVATAR) : getRegisteredUserAvatar(req.phone || req.id, window.DEFAULT_USER_AVATAR),
        phone: req.phone || '',
        location: req.location || resolveItemLocation(req),
        badge: isMine ? 'നിങ്ങളുടേത്' : (req.urgency === 'urgent' ? '🚨 അടിയന്തിരം' : '🆘 സഹായം'),
        dist: dist,
        isMine: isMine,
        category: req.category || 'emergency',
        catTitle: catTitle,
        urgency: req.urgency || 'urgent'
      });
    });

    // Step A: Apply Category Filtering strictly for help categories
    let filtered = rawItems.filter(item => {
      if (!catFilter || catFilter === 'all' || catFilter === 'help') return true;
      return item.category === catFilter;
    });

    // Step B: Apply Text Search Query (Matches help description, category title, or user name)
    if (query) {
      filtered = filtered.filter(item => {
        return (item.name && item.name.toLowerCase().includes(query)) ||
               (item.subtitle && item.subtitle.toLowerCase().includes(query)) ||
               (item.catTitle && item.catTitle.toLowerCase().includes(query));
      });
    }

    // Step C: Sort strictly by Distance Ascending (Nearest help requests first)
    filtered.sort((a, b) => {
      const distA = typeof a.dist === 'number' ? a.dist : (parseFloat(a.dist) || 0);
      const distB = typeof b.dist === 'number' ? b.dist : (parseFloat(b.dist) || 0);
      return distA - distB;
    });

    // Step D: Apply Strict Radius Filter
    let inRadiusItems = (maxRadius >= 1000) ? filtered : filtered.filter(item => {
      const d = typeof item.dist === 'number' ? item.dist : (parseFloat(item.dist) || 0);
      return d <= maxRadius;
    });

    // Update Counter Stat Pill
    const countBadge = document.getElementById('nearbyFoundCountText');
    if (countBadge) {
      const radiusLabel = maxRadius >= 1000 ? 'മുഴുവൻ' : (maxRadius + ' km പരിധിയിൽ');
      countBadge.textContent = `🆘 ${inRadiusItems.length} സഹായ അഭ്യർത്ഥനകൾ (${radiusLabel})`;
    }

    if (inRadiusItems.length === 0) {
      const radiusLabel = maxRadius >= 1000 ? '' : ` (${maxRadius} km)`;
      container.innerHTML = `
        <div style="text-align:center;padding:40px 16px;background:#fff;border-radius:16px;border:1px solid #E2E8F0">
          <div style="font-size:42px;margin-bottom:10px">🤝</div>
          <h3 style="margin:0 0 6px;font-size:16px;font-weight:800;color:#0F172A">ഈ പരിധിയിൽ പുതിയ സഹായങ്ങളൊന്നുമില്ല</h3>
          <p style="color:#64748B;margin:0 0 16px;font-size:12.5px"><b>${escapeHtml(userTown)}</b> പരിസരത്ത്${radiusLabel} ആരും സഹായം ചോദിച്ചിട്ടില്ല. നിങ്ങൾക്ക് സഹായം വേണമെങ്കിൽ താഴെ ക്ലിക്ക് ചെയ്ത് പോസ്റ്റ് ചെയ്യാം.</p>
          <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
            <button onclick="openNearbyHelpModal()" style="background:linear-gradient(135deg, #DC2626 0%, #B91C1C 100%);color:#fff;border:none;padding:10px 16px;border-radius:10px;font-weight:800;font-size:12.5px;cursor:pointer;box-shadow:0 2px 6px rgba(220,38,38,0.25)">🆘 സഹായം ചോദിക്കാം</button>
            <button onclick="setRadiusFilter('nearby', 10, document.querySelector('.radius-chip:nth-child(6)'))" style="background:#ECFDF5;color:#0E7043;border:1px solid #A7F3D0;padding:10px 16px;border-radius:10px;font-weight:700;font-size:12px;cursor:pointer">10 km പരിധി കാണുക</button>
            <button onclick="setRadiusFilter('nearby', 99999, document.querySelector('.radius-chip:last-child'))" style="background:#F8FAFC;color:#334155;border:1px solid #CBD5E1;padding:10px 16px;border-radius:10px;font-weight:700;font-size:12px;cursor:pointer">മുഴുവൻ കാണുക</button>
          </div>
        </div>
      `;
      return;
    }

    // Save rendered items to memory for completely safe, error-free click handling
    window._nearbyListItems = inRadiusItems;
    const displayItems = inRadiusItems.slice(0, 40);

    container.innerHTML = displayItems.map((item, idx) => {
      const isMine = item.isMine;
      return `
        <div class="nearby-help-card" style="background:#ffffff;border-radius:16px;padding:14px;border:1.5px solid ${isMine ? '#10B981' : '#FECACA'};box-shadow:0 2px 8px rgba(220,38,38,0.06);margin-bottom:2px">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px">
            <div style="display:flex;align-items:center;gap:10px;min-width:0;flex:1">
              <div style="width:42px;height:42px;border-radius:12px;background:#FEE2E2;border:1.5px solid #FCA5A5;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">
                ${item.icon || '🆘'}
              </div>
              <div style="min-width:0;flex:1">
                <div style="display:flex;align-items:center;gap:6px">
                  <span style="font-size:14px;font-weight:800;color:#0F172A;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(item.name)}</span>
                  <span style="font-size:10px;font-weight:800;background:#FEF2F2;color:#DC2626;padding:2px 7px;border-radius:8px;border:1px solid #FECACA;flex-shrink:0">${escapeHtml(item.badge)}</span>
                </div>
                <div style="font-size:11.5px;font-weight:700;color:#64748B;margin-top:2px">
                  📍 ${escapeHtml(item.location || 'സമീപത്ത്')} &bull; <strong style="color:#059669">${item.dist < 1 ? (Math.round(item.dist * 1000) + ' മീറ്റർ അകലെ') : (item.dist + ' km അകലെ')}</strong>
                </div>
              </div>
            </div>
            <span style="font-size:10.5px;font-weight:800;color:#B91C1C;background:#FEE2E2;padding:3px 8px;border-radius:12px;flex-shrink:0">
              ${escapeHtml(item.catTitle)}
            </span>
          </div>

          <div style="margin:10px 0 12px;padding:10px 12px;background:#FFF5F5;border-left:3.5px solid #DC2626;border-radius:8px;font-size:13.5px;font-weight:700;color:#1F2937;line-height:1.45">
            "${escapeHtml(item.subtitle)}"
          </div>

          <div style="display:flex;gap:8px;align-items:center" onclick="event.stopPropagation()">
            ${item.phone ? `
              <a href="tel:${escapeHtml(item.phone)}" style="flex:1;text-decoration:none;display:flex;align-items:center;justify-content:center;gap:5px;background:#059669;color:#fff;padding:8px 10px;border-radius:10px;font-size:12px;font-weight:800;box-shadow:0 2px 4px rgba(5,150,105,0.2)">
                <span>📞</span>
                <span>വിളിക്കാം</span>
              </a>
            ` : ''}
            <button type="button" onclick="openNearbyPersonChat(${idx})" style="flex:1.3;display:flex;align-items:center;justify-content:center;gap:5px;background:linear-gradient(135deg, #DC2626 0%, #B91C1C 100%);color:#fff;border:none;padding:8px 10px;border-radius:10px;font-size:12px;font-weight:800;cursor:pointer;box-shadow:0 2px 4px rgba(220,38,38,0.2)">
              <span>💬</span>
              <span>സഹായിക്കാം (മെസ്സേജ്)</span>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }
  window.renderNearbyScreen = renderNearbyScreen;

  function openNearbyPersonChat(index) {
    const list = window._nearbyListItems || [];
    const item = list[index];
    if (!item) {
      console.warn('Nearby item not found at index:', index);
      return;
    }

    const safeName = item.name || 'സമീപവാസി';
    const safePhone = item.phone || '';
    const safeAvatar = (item.avatar && item.avatar !== window.DEFAULT_USER_AVATAR) ? item.avatar : '';
    const cleanSubtitle = (item.subtitle || '').replace(/[\r\n\t]+/g, ' ').trim();
    const context = (item.type === 'help')
      ? `🆘 സമീപ സഹായം: ${cleanSubtitle}`
      : (cleanSubtitle ? `${item.icon || '📍'} ${cleanSubtitle}` : 'സമീപവാസി');
    const recipientId = item.id || ('nearby_' + (safePhone ? safePhone.replace(/\D/g, '') : index));
    const chatType = item.type || 'citizen';

    console.log('[Nearby Chat] Starting chat with:', safeName, safePhone, recipientId);
    openChatModal(safeName, safePhone, safeAvatar, context, recipientId, null, chatType);
  }
  window.openNearbyPersonChat = openNearbyPersonChat;

  // ==============================================================
  // NEARBY HELP (സമീപ സഹായം 1-10 KM) HANDLERS
  // ==============================================================
  function quickFilterRadius(km, btn) {
    const radius = parseFloat(km) || 5;
    setGlobalRadius(radius, btn);
    navTo('nearby');
    if (typeof setNearbyCategory === 'function') {
      const allChip = document.querySelector('.nearby-cat-chip[data-cat="all"]');
      if (allChip) setNearbyCategory('all', allChip);
    }
  }
  window.quickFilterRadius = quickFilterRadius;

  function navToNearbyHelpFeed() {
    navTo('nearby');
    if (typeof setNearbyCategory === 'function') {
      const helpChip = document.querySelector('.nearby-cat-chip[data-cat="help"]');
      if (helpChip) setNearbyCategory('help', helpChip);
    }
  }
  window.navToNearbyHelpFeed = navToNearbyHelpFeed;

  function openNearbyHelpModal(category) {
    const locInput = document.getElementById('nearbyHelpLocationInput');
    if (locInput) {
      locInput.value = (APP_STATE.location && APP_STATE.location.name) ? APP_STATE.location.name.split(',')[0].trim() : 'കേരളം';
    }
    const phoneInput = document.getElementById('nearbyHelpPhoneInput');
    if (phoneInput && APP_STATE.currentUser && APP_STATE.currentUser.phone) {
      phoneInput.value = APP_STATE.currentUser.phone;
    }
    if (category) {
      const btn = document.querySelector(`#nearbyHelpCatGrid .nearby-help-cat-btn[data-cat="${category}"]`);
      if (btn) selectNearbyHelpCat(category, btn);
    }
    const currentRad = (APP_STATE.radiusFilters && APP_STATE.radiusFilters.nearby) || 5;
    const radBtn = document.querySelector(`#nearbyHelpRadiusGrid .nearby-help-rad-pill[data-km="${currentRad}"]`);
    if (radBtn) {
      selectNearbyHelpRadius(currentRad, radBtn);
    }
    openModal('modal-nearby-help-request');
  }
  window.openNearbyHelpModal = openNearbyHelpModal;

  function selectNearbyHelpCat(category, btn) {
    document.querySelectorAll('#nearbyHelpCatGrid .nearby-help-cat-btn').forEach(b => {
      b.classList.remove('active');
      b.style.borderColor = '#E2E8F0';
      b.style.background = '#fff';
      b.style.color = '#334155';
    });
    if (btn) {
      btn.classList.add('active');
      btn.style.borderColor = '#DC2626';
      btn.style.background = '#FEF2F2';
      btn.style.color = '#991B1B';
    }
    const input = document.getElementById('nearbyHelpSelectedCat');
    if (input) input.value = category;
  }
  window.selectNearbyHelpCat = selectNearbyHelpCat;

  function selectNearbyHelpRadius(km, btn) {
    const r = parseFloat(km) || 5;
    document.querySelectorAll('#nearbyHelpRadiusGrid .nearby-help-rad-pill').forEach(b => {
      b.classList.remove('active');
      b.style.borderColor = '#CBD5E1';
      b.style.background = '#fff';
      b.style.color = '#334155';
    });
    if (btn) {
      btn.classList.add('active');
      btn.style.borderColor = '#059669';
      btn.style.background = '#059669';
      btn.style.color = '#fff';
    }
    const input = document.getElementById('nearbyHelpSelectedRadius');
    if (input) input.value = String(r);
    const badge = document.getElementById('nearbyHelpRadiusBadge');
    if (badge) badge.textContent = `${r} km പരിധി`;
  }
  window.selectNearbyHelpRadius = selectNearbyHelpRadius;

  function submitNearbyHelpRequest(e) {
    if (e && e.preventDefault) e.preventDefault();
    const catInput = document.getElementById('nearbyHelpSelectedCat');
    const radInput = document.getElementById('nearbyHelpSelectedRadius');
    const noteInput = document.getElementById('nearbyHelpNote');
    const locInput = document.getElementById('nearbyHelpLocationInput');
    const phoneInput = document.getElementById('nearbyHelpPhoneInput');

    const cat = (catInput && catInput.value) || 'emergency';
    const rad = parseFloat((radInput && radInput.value) || '5') || 5;
    const note = (noteInput && noteInput.value.trim()) || '';
    const loc = (locInput && locInput.value.trim()) || ((APP_STATE.location && APP_STATE.location.name) || 'കേരളം');
    const phone = (phoneInput && phoneInput.value.trim()) || ((APP_STATE.currentUser && APP_STATE.currentUser.phone) || '');

    if (!note) {
      toast('⚠️ ദയവായി സഹായ വിവരണം നൽകുക');
      return;
    }

    const newHelp = {
      id: 'help_' + Date.now(),
      userId: APP_STATE.currentUser ? APP_STATE.currentUser.id : ('usr_' + Date.now()),
      userName: (APP_STATE.currentUser && APP_STATE.currentUser.name) || 'നിങ്ങൾ',
      userAvatar: (APP_STATE.currentUser && APP_STATE.currentUser.avatar) || window.DEFAULT_USER_AVATAR,
      category: cat,
      radius: rad,
      description: note,
      location: loc,
      phone: phone,
      urgency: 'urgent',
      created_at: new Date().toISOString(),
      lat: APP_STATE.location.lat,
      lon: APP_STATE.location.lon,
      isUserCreated: true
    };

    if (!APP_STATE.nearbyHelpRequests) APP_STATE.nearbyHelpRequests = [];
    APP_STATE.nearbyHelpRequests.unshift(newHelp);

    try {
      localStorage.setItem('nn_nearby_help_requests', JSON.stringify(APP_STATE.nearbyHelpRequests));
    } catch (_) {}

    // Broadcast to Supabase service_requests table so nearby people are updated
    if (window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.saveServiceRequest === 'function') {
      window.NN_SUPABASE_SERVICES.saveServiceRequest({
        id: newHelp.id,
        userId: newHelp.userId,
        trade: `🆘 സമീപ സഹായം (${cat})`,
        category: cat,
        description: note,
        location: loc,
        phone: phone,
        urgency: 'urgent',
        photo: ''
      });
    }

    closeModal('modal-nearby-help-request');
    if (noteInput) noteInput.value = '';

    toast(`🚀 നിങ്ങളുടെ സഹായ അഭ്യർത്ഥന ${rad} km ചുറ്റളവിലുള്ളവരിലേക്ക് അയച്ചു!`);

    // Switch to Nearby Screen with this radius and help tab
    setGlobalRadius(rad, null);
    navTo('nearby');
    if (typeof setNearbyCategory === 'function') {
      const helpChip = document.querySelector('.nearby-cat-chip[data-cat="help"]');
      if (helpChip) setNearbyCategory('help', helpChip);
    }
  }
  window.submitNearbyHelpRequest = submitNearbyHelpRequest;

  // ==============================================================
  // 15. PROFILE SCREEN & PERSONAL DASHBOARD (FACEBOOK STYLE)
  // ==============================================================
  function switchProfileSubTab(tabName, btn) {
    APP_STATE.activeProfileSubTab = tabName;
    document.querySelectorAll('.profile-subtab-btn').forEach(b => {
      b.classList.remove('active');
      b.style.background = 'none';
      b.style.fontWeight = '700';
      b.style.color = '#64748B';
      b.style.boxShadow = 'none';
    });
    if (btn) {
      btn.classList.add('active');
      btn.style.background = '#FFFFFF';
      btn.style.fontWeight = '800';
      btn.style.color = '#047857';
      btn.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
    }
    renderProfileDashboard(tabName);
  }
  window.switchProfileSubTab = switchProfileSubTab;

  function viewFullImage(src) {
    if (!src) return;
    const existing = document.getElementById('fullImageOverlay');
    if (existing) existing.remove();
    const overlay = document.createElement('div');
    overlay.id = 'fullImageOverlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.92);z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;cursor:pointer;animation:fadeIn 0.2s ease';
    overlay.onclick = () => overlay.remove();
    overlay.innerHTML = `
      <div style="position:relative;max-width:100%;max-height:100%">
        <img src="${src}" style="max-width:100%;max-height:88vh;object-fit:contain;border-radius:12px;box-shadow:0 10px 40px rgba(0,0,0,0.6)">
        <button style="position:absolute;top:-14px;right:-14px;width:36px;height:36px;border-radius:50%;background:#fff;border:none;color:#000;font-size:18px;font-weight:bold;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.3)">✕</button>
      </div>
    `;
    document.body.appendChild(overlay);
  }
  window.viewFullImage = viewFullImage;

  function renderProfileDashboard(tabName) {
    const container = document.getElementById('profileTabContentContainer');
    if (!container) return;
    const tab = tabName || APP_STATE.activeProfileSubTab || 'posts';
    const isOther = !!_viewingOtherUser;
    const user = isOther ? _viewingOtherUser : APP_STATE.currentUser;

    if (isOther) {
      const targetCleanPhone = normalizePhone(user.phone);
      const userPosts = (APP_STATE.posts || []).filter(p => {
        if (user.id && p.authorId === user.id) return true;
        if (targetCleanPhone && normalizePhone(p.authorPhone) === targetCleanPhone) return true;
        if (user.name && p.authorName === user.name) return true;
        return false;
      });

      if (tab === 'posts') {
        if (userPosts.length === 0) {
          container.innerHTML = `
            <div style="text-align:center;padding:32px 16px;background:#fff;border-radius:16px;border:1px solid #E5E7EB;box-shadow:0 1px 3px rgba(0,0,0,0.03)">
              <div style="font-size:38px;margin-bottom:8px">📝</div>
              <div style="font-size:14px;font-weight:800;color:#1E293B;margin-bottom:4px">പോസ്റ്റുകളൊന്നും ഇല്ല</div>
              <div style="font-size:12px;color:#64748B">ഈ അംഗം ഇതുവരെ പോസ്റ്റുകളൊന്നും പബ്ലിഷ് ചെയ്തിട്ടില്ല.</div>
            </div>
          `;
        } else {
          container.innerHTML = `
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <span style="font-size:13px;font-weight:800;color:#1E293B">പോസ്റ്റുകൾ (${userPosts.length})</span>
            </div>
            ${userPosts.map(p => `
              <div style="background:#fff;border:1px solid #E5E7EB;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:10px;box-shadow:0 1px 4px rgba(0,0,0,0.04)">
                <div style="display:flex;justify-content:space-between;align-items:center">
                  <div style="display:flex;align-items:center;gap:10px">
                    <img src="${user.avatar || DEFAULT_USER_AVATAR}" style="width:38px;height:38px;border-radius:50%;object-fit:cover;border:1px solid #E2E8F0" onerror="this.src=window.DEFAULT_USER_AVATAR||''">
                    <div>
                      <div style="font-weight:800;font-size:13px;color:#0F172A">${escapeHtml(user.name || 'പ്രാദേശിക സുഹൃത്ത്')}</div>
                      <div style="font-size:11px;color:#94A3B8">${escapeHtml(p.timestamp || 'ഇപ്പോൾ')} • 📍 ${escapeHtml(p.location || user.location || 'കേരളം')}</div>
                    </div>
                  </div>
                </div>
                <div style="font-size:13.5px;color:#1E293B;line-height:1.55;word-break:break-word">${escapeHtml(p.content || '')}</div>
                ${p.image ? `<img src="${p.image}" alt="Post image" loading="lazy" decoding="async" onclick="viewFullImage('${p.image}')" style="width:100%;max-height:260px;object-fit:cover;border-radius:12px;border:1px solid #F1F5F9;cursor:pointer">` : ''}
                <div style="display:flex;justify-content:space-between;align-items:center;padding-top:8px;border-top:1px solid #F1F5F9;font-size:12px;color:#64748B">
                  <span onclick="togglePostLike('${p.id}', event)" style="cursor:pointer">❤️ ${p.likes || 0} ലൈക്കുകൾ</span>
                  <span>💬 ${p.comments ? p.comments.length : 0} അഭിപ്രായങ്ങൾ</span>
                </div>
              </div>
            `).join('')}
          `;
        }
      } else if (tab === 'photos') {
        const userPhotos = userPosts.filter(p => p.image);
        if (userPhotos.length === 0) {
          container.innerHTML = `
            <div style="text-align:center;padding:32px 16px;background:#fff;border-radius:16px;border:1px solid #E5E7EB;box-shadow:0 1px 3px rgba(0,0,0,0.03)">
              <div style="font-size:38px;margin-bottom:8px">🖼️</div>
              <div style="font-size:14px;font-weight:800;color:#1E293B;margin-bottom:4px">ഫോട്ടോകളൊന്നും ഇല്ല</div>
              <div style="font-size:12px;color:#64748B">ഈ അംഗം ഇതുവരെ ചിത്രങ്ങളൊന്നും പങ്കുവെച്ചിട്ടില്ല.</div>
            </div>
          `;
        } else {
          container.innerHTML = `
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
              <span style="font-size:13px;font-weight:800;color:#1E293B">ഫോട്ടോ ഗാലറി (${userPhotos.length})</span>
            </div>
            <div class="fb-photos-grid">
              ${userPhotos.map(p => `
                <div class="fb-photo-item" onclick="viewFullImage('${p.image}')" title="${escapeHtml((p.content || '').substring(0, 40))}">
                  <img src="${p.image}" alt="Photo">
                </div>
              `).join('')}
            </div>
          `;
        }
      } else if (tab === 'about') {
        const cleanId = (user.id || '').replace(/^usr_me_/, '').replace(/^usr_/, '');
        container.innerHTML = `
          <div class="fb-about-card">
            <div class="fb-about-section-title">📌 പ്രൊഫൈൽ വിവരങ്ങൾ (About Info)</div>
            <div class="fb-about-item">
              <span class="fb-about-icon">👤</span>
              <div>
                <div class="fb-about-label">പൂർണ്ണ നാമം</div>
                <div class="fb-about-val">${escapeHtml(user.name || 'പ്രാദേശിക സുഹൃത്ത്')}</div>
              </div>
            </div>
            ${(!window._viewingOtherUser && user.phone) ? `
            <div class="fb-about-item">
              <span class="fb-about-icon">📞</span>
              <div>
                <div class="fb-about-label">മൊബൈൽ നമ്പർ</div>
                <div class="fb-about-val"><a href="tel:${escapeHtml(user.phone)}" style="color:#047857;text-decoration:none;font-weight:800">${escapeHtml(user.phone)} 📞</a></div>
              </div>
            </div>
            ` : (window._viewingOtherUser ? `
            <div class="fb-about-item">
              <span class="fb-about-icon">📞</span>
              <div>
                <div class="fb-about-label">മൊബൈൽ നമ്പർ</div>
                <div class="fb-about-val" style="color:#64748B;font-weight:700">🔒 സ്വകാര്യ നമ്പർ (ചാറ്റ് ചെയ്യാം)</div>
              </div>
            </div>
            ` : '')}
            <div class="fb-about-item">
              <span class="fb-about-icon">📍</span>
              <div>
                <div class="fb-about-label">വാസസ്ഥലം / ലൊക്കേഷൻ</div>
                <div class="fb-about-val">${user.trade ? escapeHtml(user.location || 'കേരളം') : '🔒 സമീപവാസി (സ്വകാര്യത സംരക്ഷിതം)'}</div>
              </div>
            </div>
            ${user.district ? `
            <div class="fb-about-item">
              <span class="fb-about-icon">🗺️</span>
            <div>
              <div class="fb-about-label">ജില്ല (District)</div>
              <div class="fb-about-val">${escapeHtml(user.district)}</div>
            </div>
          </div>
          ` : ''}
          ${user.trade ? `
          <div class="fb-about-item">
            <span class="fb-about-icon">💼</span>
            <div>
              <div class="fb-about-label">തൊഴിൽ / സർവീസ് (Profession)</div>
              <div class="fb-about-val" style="color:#0E7043;font-weight:800">${escapeHtml(user.trade)}</div>
            </div>
          </div>
          ` : ''}
          ${user.bloodGroup ? `
          <div class="fb-about-item">
            <span class="fb-about-icon">🩸</span>
            <div>
              <div class="fb-about-label">രക്തഗ്രൂപ്പ് (Blood Group)</div>
              <div class="fb-about-val" style="color:#DC2626;font-weight:800">${escapeHtml(user.bloodGroup)}</div>
            </div>
          </div>
          ` : ''}
          <div class="fb-about-item">
            <span class="fb-about-icon">🛡️</span>
            <div>
              <div class="fb-about-label">അക്കൗണ്ട് പദവി (Status)</div>
              <div class="fb-about-val" style="color:#059669;font-weight:800">✓ അംഗീകൃത തദ്ദേശവാസി (Verified Citizen)</div>
            </div>
          </div>
        </div>
        `;
      } else if (tab === 'services') {
        const userServices = (APP_STATE.services || []).filter(s => {
          if (targetCleanPhone && normalizePhone(s.phone) === targetCleanPhone) return true;
          if (user.name && s.name === user.name) return true;
          if (user.id && s.id === user.id) return true;
          return false;
        });
        const userJobs = (APP_STATE.jobs || []).filter(j => {
          if (targetCleanPhone && normalizePhone(j.employerPhone) === targetCleanPhone) return true;
          if (user.name && j.employer === user.name) return true;
          return false;
        });
        const userRentals = (APP_STATE.rentals || []).filter(r => {
          if (targetCleanPhone && normalizePhone(r.ownerPhone) === targetCleanPhone) return true;
          if (user.name && r.owner === user.name) return true;
          return false;
        });

        if (userServices.length === 0 && userJobs.length === 0 && userRentals.length === 0) {
          container.innerHTML = `
            <div style="text-align:center;padding:32px 16px;background:#fff;border-radius:16px;border:1px solid #E5E7EB;box-shadow:0 1px 3px rgba(0,0,0,0.03)">
              <div style="font-size:38px;margin-bottom:8px">🛠️</div>
              <div style="font-size:14px;font-weight:800;color:#1E293B;margin-bottom:4px">പ്രത്യേക ലിസ്റ്റിംഗുകൾ ഇല്ല</div>
              <div style="font-size:12px;color:#64748B">ഈ അംഗം നിലവിൽ പ്രത്യേക സർവീസുകളോ വാടക ഇനങ്ങളോ ലിസ്റ്റ് ചെയ്തിട്ടില്ല.</div>
            </div>
          `;
        } else {
          container.innerHTML = `
            <div style="display:flex;flex-direction:column;gap:12px">
              ${userServices.length > 0 ? `
                <div style="background:#fff;border:1px solid #E5E7EB;border-radius:16px;padding:14px;box-shadow:0 1px 3px rgba(0,0,0,0.03)">
                  <div style="font-size:13.5px;font-weight:800;color:#1E293B;margin-bottom:10px">🛠️ രജിസ്റ്റർ ചെയ്ത സർവീസുകൾ (${userServices.length})</div>
                  <div style="display:flex;flex-direction:column;gap:10px">
                    ${userServices.map(s => `
                      <div style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:14px;padding:12px">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
                          <span style="font-weight:800;font-size:14px;color:#064E3B">${s.icon || '🛠️'} ${escapeHtml(s.trade)}</span>
                          <span style="font-size:11px;font-weight:800;background:#DCFCE7;color:#166534;padding:2px 8px;border-radius:10px">🟢 ലഭ്യമാണ്</span>
                        </div>
                        <div style="font-size:12px;color:#047857;margin-bottom:6px">💰 ${formatPrice(s.visitingFee || 'വിസിറ്റിംഗ് നിരക്ക്')} • ⏰ ${escapeHtml(s.workingHours || 'ലഭ്യം')} • 📍 ${escapeHtml(s.location || 'കേരളം')}</div>
                        ${s.vehicleDetails ? `
                          <div style="background:#fff;border:1px solid #BBF7D0;border-radius:10px;padding:8px 10px;font-size:11.5px;color:#1F2937;margin-bottom:8px;display:grid;grid-template-columns:1fr 1fr;gap:4px">
                            ${s.vehicleDetails.model ? `<div>🚗 <b>മോഡൽ:</b> ${escapeHtml(s.vehicleDetails.model)}</div>` : ''}
                            ${s.vehicleDetails.capacity ? `<div>👥 <b>സീറ്റിംഗ്:</b> ${escapeHtml(s.vehicleDetails.capacity)}</div>` : ''}
                            ${s.vehicleDetails.stand ? `<div>📍 <b>സ്റ്റാൻഡ്:</b> ${escapeHtml(s.vehicleDetails.stand)}</div>` : ''}
                            ${s.vehicleDetails.vehicleNumber ? `<div>🔢 <b>നമ്പർ:</b> ${escapeHtml(s.vehicleDetails.vehicleNumber)}</div>` : ''}
                            ${s.vehicleDetails.baseRate ? `<div style="grid-column:span 2">💵 <b>നിരക്ക്:</b> ${formatPrice(s.vehicleDetails.baseRate)}</div>` : ''}
                          </div>
                        ` : ''}
                        <div style="display:flex;gap:8px">
                          <button onclick="openChatFromProfile()" style="flex:1;background:#0E7043;color:#fff;border:none;border-radius:10px;padding:8px;font-weight:800;font-size:12px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px">
                            <span>💬 ചാറ്റ് ചെയ്യാം</span>
                          </button>
                          ${((s.category === 'ambulance' || s.trade?.includes('ആംബുലൻസ്')) && s.phone) ? `<a href="tel:${s.phone}" style="background:#fff;border:1.5px solid #10B981;color:#065F46;border-radius:10px;padding:8px 12px;font-weight:800;font-size:12px;text-decoration:none;display:flex;align-items:center;justify-content:center;gap:4px">📞 വിളിക്കാം</a>` : ''}
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}

              ${userJobs.length > 0 ? `
                <div style="background:#fff;border:1px solid #E5E7EB;border-radius:16px;padding:14px;box-shadow:0 1px 3px rgba(0,0,0,0.03)">
                  <div style="font-size:13.5px;font-weight:800;color:#1E293B;margin-bottom:10px">💼 നൽകിയ തൊഴിൽ അവസരങ്ങൾ (${userJobs.length})</div>
                  <div style="display:flex;flex-direction:column;gap:8px">
                    ${userJobs.map(j => `
                      <div style="border:1px solid #EFF6FF;background:#F8FAFC;border-radius:12px;padding:10px">
                        <div style="font-weight:800;font-size:13.5px;color:#0F172A">${escapeHtml(j.title)}</div>
                        <div style="font-size:11.5px;color:#2563EB;font-weight:700">💰 ${formatPrice(j.salary)} • 📍 ${escapeHtml(j.location)}</div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}

              ${userRentals.length > 0 ? `
                <div style="background:#fff;border:1px solid #E5E7EB;border-radius:16px;padding:14px;box-shadow:0 1px 3px rgba(0,0,0,0.03)">
                  <div style="font-size:13.5px;font-weight:800;color:#1E293B;margin-bottom:10px">🏠 വാടക ലിസ്റ്റിംഗുകൾ (${userRentals.length})</div>
                  <div style="display:flex;flex-direction:column;gap:8px">
                    ${userRentals.map(r => `
                      <div style="border:1px solid #FEF3C7;background:#FFFBEB;border-radius:12px;padding:10px;display:flex;align-items:center;gap:10px">
                        ${r.image ? `<img src="${r.image}" style="width:40px;height:40px;border-radius:8px;object-fit:cover">` : ''}
                        <div style="flex:1">
                          <div style="font-weight:800;font-size:13px;color:#0F172A">${escapeHtml(r.title)}</div>
                          <div style="font-size:11px;color:#B45309;font-weight:700">${formatPrice(r.rate)} • ${escapeHtml(r.type || 'വാടക')}</div>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}
            </div>
          `;
        }
      }
      return;
    }

    if (tab === 'posts') {
      const myPosts = APP_STATE.posts.filter(p => p.isCurrentUser || p.authorId === APP_STATE.currentUser.id || p.authorName === APP_STATE.currentUser.name);
      if (myPosts.length === 0) {
        container.innerHTML = `
          <div style="text-align:center;padding:32px 16px;background:#fff;border-radius:16px;border:1px solid #E5E7EB;box-shadow:0 1px 3px rgba(0,0,0,0.03)">
            <div style="font-size:38px;margin-bottom:8px">📝</div>
            <div style="font-size:14px;font-weight:800;color:#1E293B;margin-bottom:4px">പോസ്റ്റുകളൊന്നും ഇല്ല</div>
            <div style="font-size:12px;color:#64748B;margin-bottom:14px">നിങ്ങളുടെ നാട്ടിലെ വാർത്തകളും വിശേഷങ്ങളും ആദ്യമായി പങ്കുവെക്കൂ!</div>
            <button onclick="navTo('add')" style="background:linear-gradient(135deg, #065F46 0%, #047857 55%, #0D9488 100%);color:#fff;border:none;padding:10px 20px;border-radius:12px;font-weight:800;font-size:12.5px;cursor:pointer;box-shadow:0 3px 10px rgba(4,120,87,0.3)">➕ പുതിയ പോസ്റ്റ് ഇടാം</button>
          </div>
        `;
      } else {
        container.innerHTML = `
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
            <span style="font-size:13px;font-weight:800;color:#1E293B">എന്റെ പോസ്റ്റുകൾ (${myPosts.length})</span>
            <button onclick="navTo('add')" style="background:#ECFDF5;color:#047857;border:1px solid #A7F3D0;padding:5px 12px;border-radius:10px;font-weight:800;font-size:11.5px;cursor:pointer">➕ പുതിയ പോസ്റ്റ്</button>
          </div>
          ${myPosts.map(p => `
            <div style="background:#fff;border:1px solid #E5E7EB;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:10px;box-shadow:0 1px 4px rgba(0,0,0,0.04)">
              <div style="display:flex;justify-content:space-between;align-items:center">
                <div style="display:flex;align-items:center;gap:10px">
                  <img src="${APP_STATE.currentUser.avatar || DEFAULT_USER_AVATAR}" style="width:38px;height:38px;border-radius:50%;object-fit:cover;border:1px solid #E2E8F0">
                  <div>
                    <div style="font-weight:800;font-size:13px;color:#0F172A">${escapeHtml(APP_STATE.currentUser.name || 'നാട്ടുകാരൻ')}</div>
                    <div style="font-size:11px;color:#94A3B8">${escapeHtml(p.timestamp || 'ഇപ്പോൾ')} • 📍 ${escapeHtml(p.location || APP_STATE.currentUser.location || APP_STATE.location.name || 'തത്സമയ ലൊക്കേഷൻ')}</div>
                  </div>
                </div>
                <div style="display:flex;gap:6px">
                  <button onclick="openEditPostModal('${p.id}')" style="background:#ECFDF5;color:#047857;border:1px solid #A7F3D0;border-radius:8px;padding:4px 9px;font-size:11px;font-weight:800;cursor:pointer">✏️ എഡിറ്റ്</button>
                  <button onclick="deletePost('${p.id}', event)" style="background:#FEF2F2;color:#DC2626;border:1px solid #FECACA;border-radius:8px;padding:4px 9px;font-size:11px;font-weight:800;cursor:pointer">🗑️</button>
                </div>
              </div>
              <div style="font-size:13.5px;color:#1E293B;line-height:1.55;word-break:break-word">${escapeHtml(p.content)}</div>
              ${p.image ? `<img src="${p.image}" alt="Post image" loading="lazy" decoding="async" onclick="viewFullImage('${p.image}')" style="width:100%;max-height:260px;object-fit:cover;border-radius:12px;border:1px solid #F1F5F9;cursor:pointer">` : ''}
              <div style="display:flex;justify-content:space-between;align-items:center;padding-top:8px;border-top:1px solid #F1F5F9;font-size:12px;color:#64748B">
                <span>❤️ ${p.likes || 0} ലൈക്കുകൾ</span>
                <span>💬 ${p.comments ? p.comments.length : 0} അഭിപ്രായങ്ങൾ</span>
              </div>
            </div>
          `).join('')}
        `;
      }
    } else if (tab === 'photos') {
      const myPostsWithPhotos = APP_STATE.posts.filter(p => (p.isCurrentUser || p.authorId === APP_STATE.currentUser.id || p.authorName === APP_STATE.currentUser.name) && p.image);
      if (myPostsWithPhotos.length === 0) {
        container.innerHTML = `
          <div style="text-align:center;padding:32px 16px;background:#fff;border-radius:16px;border:1px solid #E5E7EB;box-shadow:0 1px 3px rgba(0,0,0,0.03)">
            <div style="font-size:38px;margin-bottom:8px">🖼️</div>
            <div style="font-size:14px;font-weight:800;color:#1E293B;margin-bottom:4px">ഫോട്ടോകളൊന്നും ഇല്ല</div>
            <div style="font-size:12px;color:#64748B;margin-bottom:14px">നിങ്ങളുടെ മനോഹരമായ നാട്ടുകാഴ്ചകൾ ഫോട്ടോകളോടെ പോസ്റ്റ് ചെയ്യൂ!</div>
            <button onclick="navTo('add')" style="background:linear-gradient(135deg, #065F46 0%, #047857 55%, #0D9488 100%);color:#fff;border:none;padding:10px 20px;border-radius:12px;font-weight:800;font-size:12.5px;cursor:pointer;box-shadow:0 3px 10px rgba(4,120,87,0.3)">📷 ഫോട്ടോ പോസ്റ്റ് ചെയ്യാം</button>
          </div>
        `;
      } else {
        container.innerHTML = `
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <span style="font-size:13px;font-weight:800;color:#1E293B">ഫോട്ടോ ഗാലറി (${myPostsWithPhotos.length})</span>
            <button onclick="navTo('add')" style="background:#ECFDF5;color:#047857;border:1px solid #A7F3D0;padding:5px 12px;border-radius:10px;font-weight:800;font-size:11.5px;cursor:pointer">➕ ഫോട്ടോ ചേർക്കാം</button>
          </div>
          <div class="fb-photos-grid">
            ${myPostsWithPhotos.map(p => `
              <div class="fb-photo-item" onclick="viewFullImage('${p.image}')" title="${escapeHtml(p.content.substring(0, 40))}">
                <img src="${p.image}" alt="Photo">
              </div>
            `).join('')}
          </div>
        `;
      }
    } else if (tab === 'about') {
      const cleanId = (APP_STATE.currentUser.id || '').replace(/^usr_me_/, '').replace(/^usr_/, '');
      container.innerHTML = `
        <div class="fb-about-card">
          <div class="fb-about-section-title">📌 പ്രൊഫൈൽ വിവരങ്ങൾ (About Info)</div>
          <div class="fb-about-item">
            <span class="fb-about-icon">👤</span>
            <div>
              <div class="fb-about-label">പൂർണ്ണ നാമം</div>
              <div class="fb-about-val">${escapeHtml(APP_STATE.currentUser.name || 'നാട്ടുകാരൻ')}</div>
            </div>
          </div>
          <div class="fb-about-item">
            <span class="fb-about-icon">📞</span>
            <div>
              <div class="fb-about-label">മൊബൈൽ നമ്പർ (സുരക്ഷ)</div>
              <div class="fb-about-val" style="color:#64748B;font-weight:700">🔒 സ്വകാര്യ നമ്പർ (സുരക്ഷിതം - മറ്റുള്ളവർക്ക് കാണാൻ കഴിയില്ല)</div>
            </div>
          </div>
          <div class="fb-about-item">
            <span class="fb-about-icon">📍</span>
            <div>
              <div class="fb-about-label">വാസസ്ഥലം / ഗ്രാമം</div>
              <div class="fb-about-val">${escapeHtml(APP_STATE.currentUser.location || APP_STATE.location.name || 'തത്സമയ ലൊക്കേഷൻ')}</div>
            </div>
          </div>
          ${(APP_STATE.currentUser.district || localStorage.getItem('nn_user_district')) ? `
          <div class="fb-about-item">
            <span class="fb-about-icon">🗺️</span>
            <div>
              <div class="fb-about-label">ജില്ല (District)</div>
              <div class="fb-about-val">${escapeHtml(APP_STATE.currentUser.district || localStorage.getItem('nn_user_district') || '')}</div>
            </div>
          </div>
          ` : ''}
          ${(APP_STATE.currentUser.trade || localStorage.getItem('nn_user_trade')) ? `
          <div class="fb-about-item">
            <span class="fb-about-icon">💼</span>
            <div>
              <div class="fb-about-label">തൊഴിൽ / ജോലി (Profession)</div>
              <div class="fb-about-val" style="color:#0E7043;font-weight:800">${escapeHtml(APP_STATE.currentUser.trade || localStorage.getItem('nn_user_trade') || '')}</div>
            </div>
          </div>
          ` : ''}

          <div class="fb-about-item">
            <span class="fb-about-icon">🩸</span>
            <div>
              <div class="fb-about-label">രക്തഗ്രൂപ്പ് (Blood Group)</div>
              <div class="fb-about-val" style="color:#DC2626;font-weight:800">${escapeHtml(APP_STATE.currentUser.bloodGroup || 'O+')}</div>
            </div>
          </div>

          <div class="fb-about-item">
            <span class="fb-about-icon">🛡️</span>
            <div>
              <div class="fb-about-label">അക്കൗണ്ട് പദവി (Status)</div>
              <div class="fb-about-val" style="color:#059669;font-weight:800">✓ അംഗീകൃത തദ്ദേശവാസി (Verified Citizen)</div>
            </div>
          </div>

          <div style="margin-top:14px;padding-top:12px;border-top:1px solid #E2E8F0;display:flex;justify-content:flex-end">
            <button onclick="openEditProfileModal()" style="background:linear-gradient(135deg, #065F46 0%, #047857 55%, #0D9488 100%);color:#fff;border:none;padding:8px 16px;border-radius:10px;font-weight:800;font-size:12px;cursor:pointer;box-shadow:0 2px 6px rgba(4,120,87,0.25)">✏️ വിവരങ്ങൾ തിരുത്താം</button>
          </div>
        </div>
      `;
      const myPhone = (APP_STATE.currentUser && APP_STATE.currentUser.phone) ? normalizePhone(APP_STATE.currentUser.phone) : '';
      const myName = (APP_STATE.currentUser && APP_STATE.currentUser.name) || '';
      const myServices = APP_STATE.services.filter(s => (myPhone && normalizePhone(s.phone) === myPhone) || (myName && s.name === myName) || s.isUserCreated);
      const myJobs = APP_STATE.jobs.filter(j => (myPhone && normalizePhone(j.employerPhone || j.phone) === myPhone) || (myName && (j.employer === myName || j.authorName === myName)) || j.isUserCreated);
      const myRentals = APP_STATE.rentals.filter(r => (myPhone && normalizePhone(r.ownerPhone || r.phone) === myPhone) || (myName && (r.owner === myName || r.authorName === myName)) || r.isUserCreated);

      container.innerHTML = `
        <div style="display:flex;flex-direction:column;gap:12px">
          <!-- MY SERVICES -->
          <div style="background:#fff;border:1px solid #E5E7EB;border-radius:16px;padding:14px;box-shadow:0 1px 3px rgba(0,0,0,0.03)">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
              <span style="font-size:13px;font-weight:800;color:#1E293B">🛠️ എന്റെ സർവീസുകൾ (${myServices.length})</span>
              <button onclick="openAddServiceModal()" style="background:#ECFDF5;color:#047857;border:1px solid #A7F3D0;padding:4px 10px;border-radius:8px;font-weight:800;font-size:11px;cursor:pointer">➕ ചേർക്കാം</button>
            </div>
            ${myServices.length === 0 ? '<div style="font-size:12px;color:#94A3B8;text-align:center;padding:12px">സർവീസുകളൊന്നും ലിസ്റ്റ് ചെയ്തിട്ടില്ല</div>' :
              myServices.map(s => `
                <div style="border-top:1px solid #F1F5F9;padding:10px 0;display:flex;justify-content:space-between;align-items:center">
                  <div>
                    <div style="font-weight:800;font-size:13px;color:#0F172A">${escapeHtml(s.trade)}</div>
                    <div style="font-size:11px;color:#64748B">📍 ${escapeHtml(s.location)} • 📞 ${escapeHtml(s.phone)}</div>
                  </div>
                  <button onclick="deleteMyService('${s.id}')" style="background:#FEF2F2;color:#DC2626;border:1px solid #FECACA;border-radius:8px;padding:4px 8px;font-size:11px;cursor:pointer">🗑️</button>
                </div>
              `).join('')
            }
          </div>

          <!-- MY JOBS -->
          <div style="background:#fff;border:1px solid #E5E7EB;border-radius:16px;padding:14px;box-shadow:0 1px 3px rgba(0,0,0,0.03)">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
              <span style="font-size:13px;font-weight:800;color:#1E293B">💼 ഞാൻ നൽകിയ തൊഴിലുകൾ (${myJobs.length})</span>
              <button onclick="openPostJobModal()" style="background:#ECFDF5;color:#047857;border:1px solid #A7F3D0;padding:4px 10px;border-radius:8px;font-weight:800;font-size:11px;cursor:pointer">➕ തൊഴിൽ നൽകാം</button>
            </div>
            ${myJobs.length === 0 ? '<div style="font-size:12px;color:#94A3B8;text-align:center;padding:12px">തൊഴിൽ അവസരങ്ങളൊന്നും നൽകിയിട്ടില്ല</div>' :
              myJobs.map(j => `
                <div style="border-top:1px solid #F1F5F9;padding:10px 0;display:flex;justify-content:space-between;align-items:center">
                  <div>
                    <div style="font-weight:800;font-size:13px;color:#0F172A">${escapeHtml(j.title)}</div>
                    <div style="font-size:11px;color:#64748B">📍 ${escapeHtml(j.location)} • ശമ്പളം: ${escapeHtml(j.salary)}</div>
                  </div>
                  <button onclick="deleteMyJob('${j.id}')" style="background:#FEF2F2;color:#DC2626;border:1px solid #FECACA;border-radius:8px;padding:4px 8px;font-size:11px;cursor:pointer">🗑️</button>
                </div>
              `).join('')
            }
          </div>

          <!-- MY RENTALS -->
          <div style="background:#fff;border:1px solid #E5E7EB;border-radius:16px;padding:14px;box-shadow:0 1px 3px rgba(0,0,0,0.03)">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
              <span style="font-size:13px;font-weight:800;color:#1E293B">🏠 എന്റെ വാടക ലിസ്റ്റിംഗുകൾ (${myRentals.length})</span>
              <button onclick="openAddRentalModal()" style="background:#ECFDF5;color:#047857;border:1px solid #A7F3D0;padding:4px 10px;border-radius:8px;font-weight:800;font-size:11px;cursor:pointer">➕ ലിസ്റ്റ് ചെയ്യാം</button>
            </div>
            ${myRentals.length === 0 ? '<div style="font-size:12px;color:#94A3B8;text-align:center;padding:12px">വാടക ഇനങ്ങളൊന്നും ലിസ്റ്റ് ചെയ്തിട്ടില്ല</div>' :
              myRentals.map(r => `
                <div style="border-top:1px solid #F1F5F9;padding:10px 0;display:flex;align-items:center;gap:10px">
                  ${r.image ? `<img src="${r.image}" style="width:44px;height:44px;border-radius:8px;object-fit:cover">` : ''}
                  <div style="flex:1;min-width:0">
                    <div style="font-weight:800;font-size:13px;color:#0F172A;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(r.title)}</div>
                    <div style="font-size:11px;color:#059669;font-weight:700">${escapeHtml(r.rate)} • ${escapeHtml(r.type || 'വാടക')}</div>
                  </div>
                  <button onclick="deleteMyRental('${r.id}')" style="background:#FEF2F2;color:#DC2626;border:1px solid #FECACA;border-radius:8px;padding:4px 8px;font-size:11px;cursor:pointer">🗑️</button>
                </div>
              `).join('')
            }
          </div>
        </div>
      `;
    }
  }
  window.renderProfileDashboard = renderProfileDashboard;

  function deleteMyService(srvId) {
    if (!confirm('ഈ സർവീസ് ഡിലീറ്റ് ചെയ്യണമെന്ന് ഉറപ്പാണോ?')) return;
    APP_STATE.services = APP_STATE.services.filter(s => s.id !== srvId);
    try {
      localStorage.setItem('nn_services', JSON.stringify(APP_STATE.services));
    } catch (_) {}
    renderServicesScreen();
    renderProfileDashboard('services');
    toast('🗑️ സർവീസ് ഒഴിവാക്കി.');
  }
  window.deleteMyService = deleteMyService;

  function deleteMyJob(jobId) {
    if (!confirm('ഈ തൊഴിൽ പോസ്റ്റ് ഡിലീറ്റ് ചെയ്യണമെന്ന് ഉറപ്പാണോ?')) return;
    APP_STATE.jobs = APP_STATE.jobs.filter(j => j.id !== jobId);
    try {
      localStorage.setItem('nn_jobs', JSON.stringify(APP_STATE.jobs));
    } catch (_) {}
    renderJobsScreen();
    renderProfileDashboard('services');
    toast('🗑️ തൊഴിൽ പോസ്റ്റ് ഒഴിവാക്കി.');
  }
  window.deleteMyJob = deleteMyJob;

  function deleteMyRental(rentId) {
    if (!confirm('ഈ വാടക ഇനം ഡിലീറ്റ് ചെയ്യണമെന്ന് ഉറപ്പാണോ?')) return;
    APP_STATE.rentals = APP_STATE.rentals.filter(r => r.id !== rentId);
    try {
      localStorage.setItem('nn_rentals', JSON.stringify(APP_STATE.rentals));
    } catch (_) {}
    renderRentalsScreen();
    renderProfileDashboard('services');
    toast('🗑️ വാടക ഇനം ഒഴിവാക്കി.');
  }
  window.deleteMyRental = deleteMyRental;

  function renderProfileScreen() {
    const isOther = !!_viewingOtherUser;
    const user = isOther ? _viewingOtherUser : APP_STATE.currentUser;
    const isEmergencyOrAmbulance = Boolean(user && (
      user.category === 'ambulance' ||
      user.trade?.includes('ആംബുലൻസ്') ||
      user.name?.includes('ആംബുലൻസ്') ||
      user.isEmergency ||
      String(user.id || '').includes('ambulance')
    ));

    const otherHeader = document.getElementById('profOtherUserHeader');
    const otherBackLabel = document.getElementById('profOtherUserBackLabel');
    const otherActionBtns = document.getElementById('profOtherActionBtns');
    const otherCallBtn = document.getElementById('profOtherCallActionBtn');
    const myActionBtns = document.getElementById('profMyActionBtns');
    const composerBox = document.getElementById('profComposerBox');
    const coverEditBtn = document.getElementById('profCoverEditBtn');
    const avatarEditBtn = document.getElementById('profAvatarEditBtn');
    const mySettingsMenu = document.getElementById('profMySettingsMenu');

    if (otherHeader) {
      otherHeader.style.display = isOther ? 'flex' : 'none';
      if (otherBackLabel) {
        otherBackLabel.textContent = (_profileOrigin === 'chat') ? 'ചാറ്റിലേക്ക് മടങ്ങാം' : 'മടങ്ങാം';
      }
    }
    if (otherActionBtns) {
      otherActionBtns.style.display = isOther ? 'flex' : 'none';
      if (otherCallBtn) {
        if (isEmergencyOrAmbulance && user.phone) {
          otherCallBtn.href = 'tel:' + user.phone;
          otherCallBtn.style.display = 'flex';
        } else {
          otherCallBtn.style.display = 'none';
        }
      }
    }
    if (myActionBtns) myActionBtns.style.display = isOther ? 'none' : 'flex';
    if (composerBox) composerBox.style.display = isOther ? 'none' : 'flex';
    if (coverEditBtn) coverEditBtn.style.display = isOther ? 'none' : 'inline-flex';
    if (avatarEditBtn) avatarEditBtn.style.display = isOther ? 'none' : 'inline-flex';
    if (mySettingsMenu) mySettingsMenu.style.display = isOther ? 'none' : 'block';

    const nameEl = document.getElementById('profDisplayNameText');
    const phoneEl = document.getElementById('profDisplayPhoneText');
    const idBadgeEl = document.getElementById('profDisplayIdBadge');
    const locEl = document.getElementById('profDisplayLocText');
    const bloodEl = document.getElementById('profDisplayBloodText');
    const verifiedBadge = document.getElementById('profDisplayVerifiedBadge');
    const avatarEl = document.getElementById('profileAvatarImg');
    const coverEl = document.getElementById('profCoverImg');
    const composerAvatar = document.getElementById('profComposerMiniAvatar');
    const bioEl = document.getElementById('profBioText');

    let displayName = getSafePublicUserName(user, isOther ? 'പ്രാദേശിക സുഹൃത്ത്' : (APP_STATE.currentUser.name || 'നാട്ടുകാരൻ'));
    const displayPhone = (isEmergencyOrAmbulance && user.phone) ? `📞 ${user.phone}` : '🔒 സ്വകാര്യ നമ്പർ (സുരക്ഷിതം)';
    const currentAvatar = user.avatar || DEFAULT_USER_AVATAR;
    const currentCover = user.cover || 'img/kerala-splash.jpg';

    if (nameEl) {
      if (isOther) {
        const badgeLabel = user.trade ? `✓ ${escapeHtml(user.trade)}` : '✓ അംഗം';
        nameEl.innerHTML = `${escapeHtml(displayName)} <span style="font-size:11px;background:#ECFDF5;color:#047857;padding:2px 8px;border-radius:10px;font-weight:700">${badgeLabel}</span>`;
      } else {
        const isAdmin = (typeof checkIsAdmin === 'function') ? checkIsAdmin() : false;
        if (isAdmin) {
          nameEl.innerHTML = `${escapeHtml(displayName)} <span style="font-size:11px;background:#FEF3C7;color:#92400E;border:1.5px solid #F59E0B;padding:2px 8px;border-radius:10px;font-weight:900">👑 സൂപ്പർ അഡ്മിൻ</span>`;
        } else if (APP_STATE.currentUser.name && APP_STATE.currentUser.name !== 'നാട്ടുകാരൻ') {
          nameEl.innerHTML = `${escapeHtml(displayName)} <span style="font-size:11px;background:#ECFDF5;color:#047857;padding:2px 8px;border-radius:10px;font-weight:700">✓ അംഗം</span>`;
        } else {
          nameEl.innerHTML = `${escapeHtml(displayName)} <span onclick="openEditProfileModal()" style="font-size:11px;background:#FEF3C7;color:#B45309;padding:2px 8px;border-radius:10px;font-weight:700;cursor:pointer">✏️ പേര് നൽകുക</span>`;
        }
      }
    }
    if (phoneEl) {
      if (!isOther && APP_STATE.currentUser.email) {
        phoneEl.innerHTML = `${escapeHtml(displayPhone)} <span style="color:#CBD5E1">·</span> <span style="color:#0284C7;font-weight:700">✉️ ${escapeHtml(APP_STATE.currentUser.email)}</span>`;
      } else {
        phoneEl.textContent = displayPhone;
      }
    }

    if (idBadgeEl) {
      idBadgeEl.style.display = 'none';
    }

    if (bioEl) {
      bioEl.textContent = user.bio || (isOther ? 'നമ്മുടെ നാട് പ്രാദേശിക കൂട്ടായ്മ 🌿' : (APP_STATE.currentUser.bio || 'നമ്മുടെ നാട് കൂട്ടായ്മ 🌿'));
    }

    if (locEl) {
      if (isOther && !user.trade) {
        locEl.textContent = '📍 സമീപവാസി (സ്വകാര്യ സുരക്ഷ)';
      } else {
        const uLoc = user.location || APP_STATE.location.name || 'കേരളം';
        locEl.textContent = `📍 ${uLoc}`;
      }
    }

    if (bloodEl) {
      if (user.bloodGroup) {
        bloodEl.textContent = `🩸 രക്തഗ്രൂപ്പ്: ${user.bloodGroup}`;
        bloodEl.style.display = 'inline';
      } else {
        bloodEl.style.display = isOther ? 'none' : 'inline';
        if (!isOther) bloodEl.textContent = `🩸 രക്തഗ്രൂപ്പ്: ${APP_STATE.currentUser.bloodGroup || 'O+'}`;
      }
    }

    if (verifiedBadge) {
      verifiedBadge.textContent = 'തദ്ദേശവാസി (Verified ✓)';
      verifiedBadge.style.background = '#E0F2FE';
      verifiedBadge.style.color = '#0284C7';
    }

    if (avatarEl) avatarEl.src = currentAvatar;
    if (coverEl) coverEl.src = currentCover;
    if (composerAvatar && !isOther) composerAvatar.src = currentAvatar;

    if (!isOther) {
      const homeAvatar = document.getElementById('homeHeaderAvatar');
      if (homeAvatar) homeAvatar.src = currentAvatar;
      const desktopAvatar = document.getElementById('desktopUserAvatar');
      if (desktopAvatar) desktopAvatar.src = currentAvatar;
      const desktopName = document.getElementById('desktopUserName');
      if (desktopName) desktopName.textContent = displayName;
      const sidebarAvatar = document.getElementById('desktopSidebarAvatar');
      if (sidebarAvatar) sidebarAvatar.src = currentAvatar;
      const sidebarName = document.getElementById('desktopSidebarName');
      if (sidebarName) sidebarName.textContent = displayName;
      const sidebarSub = document.getElementById('desktopSidebarSub');
      if (sidebarSub) {
        if (typeof checkIsAdmin === 'function' && checkIsAdmin()) {
          sidebarSub.innerHTML = '<span style="color:#B45309;font-weight:900">👑 സിസ്റ്റം അഡ്മിൻ (9605406699)</span>';
        } else {
          const myLoc = APP_STATE.currentUser.location || APP_STATE.location.name || 'കേരളം';
          sidebarSub.textContent = `📍 ${myLoc} · പ്രൊഫൈൽ`;
        }
      }
    }

    // Calculate Facebook-style Stats: Posts count, Total likes, Citizens count
    let userPosts = [];
    if (isOther) {
      const targetCleanPhone = normalizePhone(user.phone);
      userPosts = APP_STATE.posts.filter(p => {
        if (user.id && p.authorId === user.id) return true;
        if (targetCleanPhone && normalizePhone(p.authorPhone) === targetCleanPhone) return true;
        if (user.name && p.authorName === user.name) return true;
        return false;
      });
    } else {
      userPosts = APP_STATE.posts.filter(p => p.isCurrentUser || p.authorId === APP_STATE.currentUser.id || p.authorName === APP_STATE.currentUser.name);
    }

    const postCountEl = document.getElementById('profStatPosts');
    const likesCountEl = document.getElementById('profStatLikes');
    const networkCountEl = document.getElementById('profStatNetwork');

    if (postCountEl) postCountEl.textContent = userPosts.length;
    if (likesCountEl) {
      const totalLikes = userPosts.reduce((acc, p) => acc + (p.likes || 0), 0);
      likesCountEl.textContent = totalLikes;
    }
    if (networkCountEl) {
      const cloudCount = (APP_STATE.cloudProfiles && APP_STATE.cloudProfiles.length) ? APP_STATE.cloudProfiles.length + 80 : 120;
      networkCountEl.textContent = `${cloudCount}+`;
    }

    renderProfileDashboard(APP_STATE.activeProfileSubTab || 'posts');
    if (typeof updateAdminUI === 'function') updateAdminUI();
  }
  window.renderProfileScreen = renderProfileScreen;

  function handleCoverPhotoUpload(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (typeof toast === 'function') toast('⏳ കവർ ഫോട്ടോ ഒപ്റ്റിമൈസ് ചെയ്യുന്നു...');
    smartCompressImage(file, { maxDim: 1080, quality: 0.82 }, function(compressedBase64) {
      if (!compressedBase64) return;
      APP_STATE.currentUser.cover = compressedBase64;
      try {
        localStorage.setItem('nn_user_cover', compressedBase64);
      } catch (_) {}

      const coverImg = document.getElementById('profCoverImg');
      if (coverImg) coverImg.src = compressedBase64;

      if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.saveUserProfile === 'function') {
        window.NN_SUPABASE_SERVICES.saveUserProfile(APP_STATE.currentUser);
      }

      toast('📸 നിങ്ങളുടെ കവർ ഫോട്ടോ വിജയകരമായി മാറ്റി!');
    });
  }
  window.handleCoverPhotoUpload = handleCoverPhotoUpload;

  function handleProfilePhotoUpload(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (typeof toast === 'function') toast('⏳ പ്രൊഫൈൽ ഫോട്ടോ ഒപ്റ്റിമൈസ് ചെയ്യുന്നു...');
    smartCompressImage(file, { maxDim: 400, quality: 0.82 }, function(compressedBase64) {
      if (!compressedBase64) return;
      APP_STATE.currentUser.avatar = compressedBase64;
      try {
        localStorage.setItem('nn_user_avatar', compressedBase64);
      } catch (_) {}

      // Update all profile avatars in UI immediately
      const avatarSelectors = [
        '#profileAvatarImg',
        '#homeHeaderAvatar',
        '#editProfAvatarPreview',
        '#profComposerMiniAvatar',
        '#postingAsAvatar',
        '#desktopUserAvatar',
        '#desktopSidebarAvatar'
      ];
      avatarSelectors.forEach(sel => {
        const el = document.querySelector(sel);
        if (el) el.src = compressedBase64;
      });

      // Update author avatar on all current user posts immediately
      if (Array.isArray(APP_STATE.posts)) {
        const myDigits = (APP_STATE.currentUser.phone ? APP_STATE.currentUser.phone.replace(/\D/g, '').slice(-10) : '');
        APP_STATE.posts.forEach(p => {
          if (p.isCurrentUser || p.authorId === APP_STATE.currentUser.id || (myDigits && p.authorPhone && p.authorPhone.replace(/\D/g, '').slice(-10) === myDigits)) {
            p.authorAvatar = compressedBase64;
          }
        });
        savePosts();
        if (typeof renderCommunityFeed === 'function') renderCommunityFeed();
        if (typeof renderHomeCommunityFeed === 'function') renderHomeCommunityFeed();
      }

      // Sync photo to Supabase Cloud profile
      if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.saveUserProfile === 'function') {
        window.NN_SUPABASE_SERVICES.saveUserProfile(APP_STATE.currentUser);
      }

      toast('📸 നിങ്ങളുടെ പ്രൊഫൈൽ ഫോട്ടോ വിജയകരമായി മാറ്റം വരുത്തി!');
    });
  }
  window.handleProfilePhotoUpload = handleProfilePhotoUpload;

  // 15B. ADDITIONAL FORM HANDLERS (DONOR, RENTAL PHOTO UPLOAD, PROFILE EDIT)
  // ==============================================================
  function handleRentalPhotoUpload(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (typeof toast === 'function') toast('⏳ ചിത്രം ഒപ്റ്റിമൈസ് ചെയ്യുന്നു...');
    smartCompressImage(file, { maxDim: 800, quality: 0.80 }, function(compressedBase64) {
      if (!compressedBase64) return;
      APP_STATE.tempRentalImage = compressedBase64;
      const previewImg = document.getElementById('rentPhotoPreviewImg');
      const previewWrap = document.getElementById('rentPhotoPreviewWrap');
      const placeholder = document.getElementById('rentPhotoPlaceholder');
      if (previewImg) previewImg.src = compressedBase64;
      if (previewWrap) previewWrap.style.display = 'block';
      if (placeholder) placeholder.style.display = 'none';
    });
  }
  window.handleRentalPhotoUpload = handleRentalPhotoUpload;

  function removeRentalPhoto() {
    APP_STATE.tempRentalImage = null;
    const input = document.getElementById('rentPhotoInput');
    if (input) input.value = '';
    const previewWrap = document.getElementById('rentPhotoPreviewWrap');
    const placeholder = document.getElementById('rentPhotoPlaceholder');
    if (previewWrap) previewWrap.style.display = 'none';
    if (placeholder) placeholder.style.display = 'block';
  }
  window.removeRentalPhoto = removeRentalPhoto;

  function openRegisterDonorModal() {
    const nameEl = document.getElementById('regDonorName');
    const phoneEl = document.getElementById('regDonorPhone');
    const groupEl = document.getElementById('regDonorGroup');
    const locEl = document.getElementById('regDonorLoc');
    if (nameEl) nameEl.value = APP_STATE.currentUser.name;
    if (phoneEl) phoneEl.value = APP_STATE.currentUser.phone;
    if (groupEl) groupEl.value = APP_STATE.currentUser.bloodGroup;
    if (locEl) locEl.value = APP_STATE.location.name;
    openModal('modal-register-donor');
  }
  window.openRegisterDonorModal = openRegisterDonorModal;

  function submitDonorRegistration(e) {
    if (e) e.preventDefault();
    const name = document.getElementById('regDonorName').value.trim();
    const group = document.getElementById('regDonorGroup').value;
    const status = document.getElementById('regDonorStatus').value;
    const phone = document.getElementById('regDonorPhone').value.trim();
    const loc = document.getElementById('regDonorLoc').value.trim() || APP_STATE.location.name;

    if (!name || !phone) {
      toast('⚠️ പേരും ഫോൺ നമ്പറും നൽകുക.');
      return;
    }

    const userAvatar = (APP_STATE.currentUser && APP_STATE.currentUser.avatar && !APP_STATE.currentUser.avatar.includes('data:image/svg+xml'))
      ? APP_STATE.currentUser.avatar
      : '';

    const newDonor = {
      name: name,
      group: group,
      phone: phone,
      avatar: userAvatar,
      location: loc,
      lat: APP_STATE.location.lat,
      lon: APP_STATE.location.lon,
      status: status
    };

    APP_STATE.currentUser.bloodGroup = group;
    APP_STATE.currentUser.isDonor = true;
    try {
      localStorage.setItem('nn_user_blood', group);
      localStorage.setItem('nn_user_is_donor', 'true');
    } catch (_) {}

    APP_STATE.bloodDonors.unshift(newDonor);
    try {
      localStorage.setItem('nn_blood_donors', JSON.stringify(APP_STATE.bloodDonors));
    } catch (_) {}

    // Save donor registration to Supabase Cloud
    if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.saveBloodDonor === 'function') {
      window.NN_SUPABASE_SERVICES.saveBloodDonor(newDonor);
    }

    closeModal('modal-register-donor');
    renderBloodDonorsList();
    toast('🩸 രക്തദാതാക്കളുടെ ലിസ്റ്റിലേക്ക് പേര് ചേർത്തു! നന്ദി 🌿');
  }
  window.submitDonorRegistration = submitDonorRegistration;

  function setRentalListingMode(mode) {
    const hidden = document.getElementById('rentListingMode');
    if (hidden) hidden.value = mode;

    const rentBtn = document.getElementById('rentModeBtnRent');
    const saleBtn = document.getElementById('rentModeBtnSale');
    const label = document.getElementById('rentRateLabel');
    const curr = document.getElementById('rentRateCurrency');
    const input = document.getElementById('rentRate');
    const select = document.getElementById('rentType');
    const submitBtn = document.getElementById('rentSubmitBtn');
    const desc = document.getElementById('rentModeDescription');

    if (mode === 'sale') {
      if (saleBtn) {
        saleBtn.style.background = '#2563EB';
        saleBtn.style.color = '#fff';
      }
      if (rentBtn) {
        rentBtn.style.background = 'none';
        rentBtn.style.color = '#475569';
      }
      if (desc) desc.textContent = 'വീടുകൾ, സ്ഥലം, വാഹനങ്ങൾ, ഇലക്ട്രോണിക്സ്, മറ്റ് ഏത് സാധനങ്ങളും വിൽപ്പനയ്ക്ക് വെയ്ക്കാം.';
      if (label) label.textContent = 'വിൽപന വില (₹ Sale Price)';
      if (curr) {
        curr.style.background = '#EFF6FF';
        curr.style.color = '#1D4ED8';
        curr.style.borderRight = '1px solid #BFDBFE';
      }
      if (input) input.placeholder = 'വില്പന തുക നൽകുക (₹)';
      if (submitBtn) {
        submitBtn.style.background = '#2563EB';
        submitBtn.textContent = '🏷️ വിൽപനയ്ക്ക് ലിസ്റ്റ് ചെയ്യാം';
      }
      if (select) {
        select.innerHTML = `
          <option value="വീട് & സ്ഥലം (വിൽപന)">🏠 വീട് / ഫ്ലാറ്റ് / സ്ഥലം (Real Estate)</option>
          <option value="വാഹനങ്ങൾ (വിൽപന)">🚗 യൂസ്ഡ് കാർ / ബൈക്ക് / വാഹനം</option>
          <option value="മൊബൈൽ & ഇലക്ട്രോണിക്സ്">📱 മൊബൈൽ / ഇലക്ട്രോണിക്സ് / ലാപ്ടോപ്പ്</option>
          <option value="ഫർണിച്ചർ & ഗൃഹോപകരണങ്ങൾ">🛋️ ഫർണിച്ചർ & ഗൃഹോപകരണങ്ങൾ</option>
          <option value="യന്ത്രങ്ങൾ & ടൂളുകൾ">🚜 യന്ത്രങ്ങൾ & വർക്ക്ഷോപ്പ് ടൂളുകൾ</option>
          <option value="മറ്റ് സാധനങ്ങൾ">🏷️ മറ്റ് സാധനങ്ങൾ (Other Items)</option>
        `;
      }
    } else {
      if (rentBtn) {
        rentBtn.style.background = '#0E7043';
        rentBtn.style.color = '#fff';
      }
      if (saleBtn) {
        saleBtn.style.background = 'none';
        saleBtn.style.color = '#475569';
      }
      if (desc) desc.textContent = 'വീടുകൾ, വാഹനങ്ങൾ, യന്ത്രങ്ങൾ, പന്തൽ, മറ്റ് ഏത് സാധനങ്ങളും വാടകയ്ക്ക് നൽകാം.';
      if (label) label.textContent = 'വാടക തുക (₹ Rent Rate)';
      if (curr) {
        curr.style.background = '#F0FDF4';
        curr.style.color = '#047857';
        curr.style.borderRight = '1px solid #BBF7D0';
      }
      if (input) input.placeholder = 'വാടക തുക നൽകുക (₹)';
      if (submitBtn) {
        submitBtn.style.background = '#0E7043';
        submitBtn.textContent = '🏠 വാടകയ്ക്ക് ലിസ്റ്റ് ചെയ്യാം';
      }
      if (select) {
        select.innerHTML = `
          <option value="വാടക വീട് / മുറി">🏠 വാടക വീട് / മുറി / ഹോസ്റ്റൽ</option>
          <option value="കടമുറി & ഗോഡൗൺ">🏪 കടമുറി / ഓഫീസ് / ഗോഡൗൺ</option>
          <option value="വാഹനങ്ങൾ">🚗 വാഹനം (കാർ, ജീപ്പ്, ബൈക്ക്, പിക്കപ്പ്)</option>
          <option value="ടൂളുകൾ & യന്ത്രങ്ങൾ">🚜 ട്രാക്ടർ, മിക്സർ & യന്ത്രങ്ങൾ</option>
          <option value="സ്റ്റേജ് & പന്തൽ">🎪 സ്റ്റേജ്, പന്തൽ, സൗണ്ട് & ലൈറ്റ്സ്</option>
          <option value="കാറ്ററിംഗ് പാത്രങ്ങൾ">🍲 കാറ്ററിംഗ് പാത്രങ്ങൾ & അടുപ്പ്</option>
          <option value="ഇലക്ട്രോണിക്സ്">📷 ക്യാമറ, പ്രൊജക്ടർ & ഇലക്ട്രോണിക്സ്</option>
          <option value="മറ്റ് ഏത് സാധനങ്ങളും">📦 മറ്റ് ഏത് സാധനങ്ങളും വാടകയ്ക്ക്</option>
        `;
      }
    }
  }
  window.setRentalListingMode = setRentalListingMode;

  function openAddRentalModal() {
    const ownerEl = document.getElementById('rentOwner');
    const phoneEl = document.getElementById('rentPhone');
    const locEl = document.getElementById('rentLoc');
    if (ownerEl) ownerEl.value = APP_STATE.currentUser.name || '';
    if (phoneEl) phoneEl.value = APP_STATE.currentUser.phone || '';
    if (locEl) locEl.value = APP_STATE.location.name || '';
    removeRentalPhoto();
    setRentalListingMode('rent');
    openModal('modal-add-rental');
  }
  window.openAddRentalModal = openAddRentalModal;

  function submitRentalPosting(e) {
    if (e) e.preventDefault();
    const modeEl = document.getElementById('rentListingMode');
    const listingType = (modeEl ? modeEl.value : 'rent') || 'rent';
    const title = document.getElementById('rentTitle').value.trim();
    const type = document.getElementById('rentType').value;
    const rawRate = document.getElementById('rentRate').value.trim();
    const defaultRate = listingType === 'sale' ? '₹25,000' : '₹500 / ദിവസം';
    const rate = rawRate ? formatPrice(rawRate) : defaultRate;
    const owner = document.getElementById('rentOwner').value.trim() || APP_STATE.currentUser.name;
    const phone = document.getElementById('rentPhone').value.trim() || APP_STATE.currentUser.phone;
    const loc = document.getElementById('rentLoc').value.trim() || APP_STATE.location.name;

    if (!title || !rawRate) {
      toast(listingType === 'sale' ? '⚠️ തലക്കെട്ടും വിലയും നൽകുക.' : '⚠️ തലക്കെട്ടും വാടകയും നൽകുക.');
      return;
    }

    let defaultImg = 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=400&q=80';
    if (type.includes('വാഹന')) {
      defaultImg = 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80';
    } else if (type.includes('യന്ത്ര') || type.includes('ടൂള')) {
      defaultImg = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80';
    } else if (type.includes('സ്റ്റേജ്') || type.includes('പന്തൽ')) {
      defaultImg = 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=400&q=80';
    } else if (type.includes('കാറ്ററിംഗ്')) {
      defaultImg = 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=400&q=80';
    } else if (type.includes('ഇലക്ട്രോണിക്സ്') || type.includes('മൊബൈൽ')) {
      defaultImg = 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80';
    }

    const newRental = {
      id: 'rent_' + Date.now(),
      title: title,
      listingType: listingType,
      type: type,
      rate: rate,
      price: rate,
      owner: owner,
      ownerPhone: phone,
      phone: phone,
      location: loc,
      lat: APP_STATE.location.lat,
      lon: APP_STATE.location.lon,
      image: APP_STATE.tempRentalImage || defaultImg,
      createdAt: Date.now(),
      isUserCreated: true
    };

    APP_STATE.rentals.unshift(newRental);
    try {
      localStorage.setItem('nn_rentals', JSON.stringify(APP_STATE.rentals));
    } catch (_) {}

    // Save rental to Supabase Cloud & broadcast to other devices
    if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.saveRental === 'function') {
      window.NN_SUPABASE_SERVICES.saveRental(newRental);
    }

    closeModal('modal-add-rental');
    removeRentalPhoto();
    document.getElementById('rentTitle').value = '';
    document.getElementById('rentRate').value = '';

    renderRentalsScreen();
    if (APP_STATE.currentScreen === 'profile') renderProfileScreen();
    toast(listingType === 'sale' ? '🏷️ വിൽപന ഇനം വിജയകരമായി ലിസ്റ്റ് ചെയ്തു! ക്ലൗഡിലേക്ക് സേവ് ചെയ്തു.' : '🏠 വാടക ഇനം വിജയകരമായി ലിസ്റ്റ് ചെയ്തു! ക്ലൗഡിലേക്ക് സേവ് ചെയ്തു.');
  }
  window.submitRentalPosting = submitRentalPosting;

  function refreshRentalsLive() {
    toast('🔄 പുതിയ വാടക പോസ്റ്റുകൾ ക്ലൗഡിൽ നിന്ന് പരിശോധിക്കുന്നു...');
    if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.syncRentals === 'function') {
      window.NN_SUPABASE_SERVICES.syncRentals(() => {
        renderRentalsScreen();
        toast('✅ പുതിയ വാടക വിവരങ്ങൾ ലഭ്യമാക്കി!');
      });
    } else {
      renderRentalsScreen();
    }
  }
  window.refreshRentalsLive = refreshRentalsLive;

  function selectProfBloodGroup(grp) {
    const input = document.getElementById('editProfBlood');
    if (input) input.value = grp;
    renderProfBloodChips(grp);
  }
  window.selectProfBloodGroup = selectProfBloodGroup;

  function renderProfBloodChips(selectedGrp) {
    const container = document.getElementById('profBloodChipsGrid');
    if (!container) return;
    const groups = ['O+', 'A+', 'B+', 'AB+', 'O-', 'A-', 'B-', 'AB-'];
    const active = selectedGrp || document.getElementById('editProfBlood')?.value || 'O+';
    container.innerHTML = groups.map(g => {
      const isSel = (g === active);
      return `<button type="button" onclick="selectProfBloodGroup('${g}')" style="padding:8px 4px;border-radius:10px;font-size:12px;cursor:pointer;transition:all 0.15s;${isSel ? 'background:#DC2626;color:#fff;border:1.5px solid #DC2626;font-weight:900;box-shadow:0 2px 6px rgba(220,38,38,0.3)' : 'background:#FFFFFF;color:#7F1D1D;border:1px solid #FECACA;font-weight:700'}">${g}</button>`;
    }).join('');
  }
  window.renderProfBloodChips = renderProfBloodChips;

  function autoFillCurrentLocationToProfile() {
    const locInput = document.getElementById('editProfLoc');
    const distSelect = document.getElementById('editProfDistrict');
    if (locInput && APP_STATE.location.name && APP_STATE.location.name !== 'തത്സമയ ലൊക്കേഷൻ') {
      locInput.value = APP_STATE.location.name;
    }
    if (distSelect && APP_STATE.location.district) {
      for (let i = 0; i < distSelect.options.length; i++) {
        if (distSelect.options[i].value.includes(APP_STATE.location.district)) {
          distSelect.selectedIndex = i;
          break;
        }
      }
    }
    if (typeof toast === 'function') toast('📍 തത്സമയ ലൊക്കേഷൻ ചേർത്തു!');
  }
  window.autoFillCurrentLocationToProfile = autoFillCurrentLocationToProfile;

  function openEditProfileModal(isOnboarding = false) {
    const nameEl = document.getElementById('editProfName');
    const phoneEl = document.getElementById('editProfPhone');
    const emailEl = document.getElementById('editProfEmail');
    const locEl = document.getElementById('editProfLoc');
    const distEl = document.getElementById('editProfDistrict');
    const tradeEl = document.getElementById('editProfTrade');
    const bloodEl = document.getElementById('editProfBlood');
    const bioEl = document.getElementById('editProfBio');
    const donorEl = document.getElementById('editProfIsDonor');
    const previewEl = document.getElementById('editProfAvatarPreview');
    const statusEl = document.getElementById('phoneLookupStatus');
    const noticeEl = document.getElementById('profileOnboardingNotice');
    const idBadge = document.getElementById('profFormIdBadge');

    if (noticeEl) {
      noticeEl.style.display = isOnboarding ? 'block' : 'none';
    }
    if (statusEl) statusEl.style.display = 'none';

    const curName = (APP_STATE.currentUser.name && APP_STATE.currentUser.name !== 'നാട്ടുകാരൻ') ? APP_STATE.currentUser.name : '';
    const curPhone = APP_STATE.currentUser.phone || '';
    const curEmail = APP_STATE.currentUser.email || localStorage.getItem('nn_user_email') || '';
    const curBlood = APP_STATE.currentUser.bloodGroup || localStorage.getItem('nn_user_blood') || 'O+';
    const curLoc = (APP_STATE.currentUser.location && APP_STATE.currentUser.location !== 'തത്സമയ ലൊക്കേഷൻ') ? APP_STATE.currentUser.location : (APP_STATE.location.name && APP_STATE.location.name !== 'തത്സമയ ലൊക്കേഷൻ' ? APP_STATE.location.name : '');
    const curDistrict = APP_STATE.currentUser.district || localStorage.getItem('nn_user_district') || APP_STATE.location.district || 'കണ്ണൂർ';
    const curTrade = APP_STATE.currentUser.trade || localStorage.getItem('nn_user_trade') || '';
    const curBio = (APP_STATE.currentUser.bio && APP_STATE.currentUser.bio !== 'നമ്മുടെ നാട് കൂട്ടായ്മ 🌿' && !APP_STATE.currentUser.bio.includes('കണ്ണൂർ')) ? APP_STATE.currentUser.bio : '';

    if (nameEl) nameEl.value = curName;
    if (phoneEl) phoneEl.value = curPhone;
    if (emailEl) emailEl.value = curEmail;
    if (locEl) locEl.value = curLoc;
    if (tradeEl) tradeEl.value = curTrade;
    if (bioEl) bioEl.value = curBio;
    if (bloodEl) bloodEl.value = curBlood;
    if (donorEl) donorEl.checked = (APP_STATE.currentUser.isDonor !== false);

    if (distEl) {
      for (let i = 0; i < distEl.options.length; i++) {
        if (distEl.options[i].value.includes(curDistrict)) {
          distEl.selectedIndex = i;
          break;
        }
      }
    }

    if (idBadge) {
      idBadge.textContent = '✓ വെരിഫൈഡ് സിറ്റിസൺ പ്രൊഫൈൽ';
    }

    if (previewEl) previewEl.src = APP_STATE.currentUser.avatar || DEFAULT_USER_AVATAR;

    renderProfBloodChips(curBlood);

    // Sync active language chip
    const activeLang = localStorage.getItem('nn_app_language') || 'ml';
    if (typeof window.setAppLanguage === 'function') {
      window.setAppLanguage(activeLang, true);
    }

    openModal('modal-edit-profile');
  }
  window.openEditProfileModal = openEditProfileModal;

  let phoneLookupDebounce = null;
  async function checkPhoneProfileLookup(rawPhone) {
    if (phoneLookupDebounce) clearTimeout(phoneLookupDebounce);
    const statusEl = document.getElementById('phoneLookupStatus');
    const idBadge = document.getElementById('profFormIdBadge');

    const digits = String(rawPhone || '').replace(/\D/g, '').slice(-10);
    if (idBadge) {
      idBadge.textContent = '✓ വെരിഫൈഡ് സിറ്റിസൺ പ്രൊഫൈൽ';
    }

    if (!digits || digits.length < 10) {
      if (statusEl) statusEl.style.display = 'none';
      return;
    }

    phoneLookupDebounce = setTimeout(async () => {
      if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.fetchUserProfile === 'function') {
        if (statusEl) {
          statusEl.textContent = '🔍 വിവരങ്ങൾ പരിശോധിക്കുന്നു...';
          statusEl.style.color = '#64748B';
          statusEl.style.display = 'block';
        }

        const cloud = await window.NN_SUPABASE_SERVICES.fetchUserProfile(digits);
        if (cloud) {
          const nameEl = document.getElementById('editProfName');
          const locEl = document.getElementById('editProfLoc');
          const bloodEl = document.getElementById('editProfBlood');
          const previewEl = document.getElementById('editProfAvatarPreview');

          if (nameEl && (!nameEl.value || nameEl.value === 'നാട്ടുകാരൻ') && cloud.name) nameEl.value = cloud.name;
          if (locEl && !locEl.value && cloud.place) locEl.value = cloud.place;
          if (bloodEl && cloud.blood_group) {
            bloodEl.value = cloud.blood_group;
            renderProfBloodChips(cloud.blood_group);
          }
          const bioEl = document.getElementById('editProfBio');
          if (bioEl && !bioEl.value && cloud.bio) bioEl.value = cloud.bio;
          if (cloud.bio) {
            APP_STATE.currentUser.bio = cloud.bio;
            try { localStorage.setItem('nn_user_bio', cloud.bio); } catch (_) {}
          }
          if (previewEl && cloud.avatar && !APP_STATE.currentUser.avatar) {
            previewEl.src = cloud.avatar;
            APP_STATE.currentUser.avatar = cloud.avatar;
            try { localStorage.setItem('nn_user_avatar', cloud.avatar); } catch (_) {}
          }

          if (statusEl) {
            statusEl.textContent = `✨ "${cloud.name || 'സുഹൃത്ത്'}" പ്രൊഫൈൽ കണ്ടെത്തി!`;
            statusEl.style.color = '#0E7043';
            statusEl.style.display = 'block';
          }
        } else {
          if (statusEl) {
            statusEl.textContent = '✨ പുതിയ അംഗം, സ്വാഗതം!';
            statusEl.style.color = '#0284C7';
            statusEl.style.display = 'block';
          }
        }
      }
    }, 450);
  }
  window.checkPhoneProfileLookup = checkPhoneProfileLookup;

  function submitProfileUpdate(e) {
    if (e) e.preventDefault();
    const name = (document.getElementById('editProfName').value || '').trim();
    const phone = (document.getElementById('editProfPhone').value || '').trim();
    const email = (document.getElementById('editProfEmail')?.value || '').trim().toLowerCase();
    const loc = (document.getElementById('editProfLoc').value || '').trim() || APP_STATE.location.name || 'കേരളം';
    const district = document.getElementById('editProfDistrict')?.value || 'കണ്ണൂർ';
    const trade = (document.getElementById('editProfTrade')?.value || '').trim();
    const blood = document.getElementById('editProfBlood')?.value || 'O+';
    const bio = (document.getElementById('editProfBio')?.value || '').trim() || 'നമ്മുടെ നാട് കൂട്ടായ്മ 🌿';
    const isDonor = document.getElementById('editProfIsDonor')?.checked !== false;

    if (!name) {
      toast('⚠️ ദയവായി നിങ്ങളുടെ പേര് നൽകുക.');
      return;
    }
    const cleanDigits = phone.replace(/\D/g, '').slice(-10);
    if (!cleanDigits || cleanDigits.length < 10) {
      toast('⚠️ ദയവായി 10 അക്ക മൊബൈൽ നമ്പർ നൽകുക.');
      return;
    }
    if (email && (!email.includes('@') || !email.includes('.'))) {
      toast('⚠️ ദയവായി സാധുവായ ഇമെയിൽ വിലാസം നൽകുക.');
      return;
    }

    APP_STATE.currentUser.id = 'usr_' + cleanDigits;
    APP_STATE.currentUser.name = name;
    APP_STATE.currentUser.phone = phone;
    APP_STATE.currentUser.email = email;
    APP_STATE.currentUser.location = loc;
    APP_STATE.currentUser.district = district;
    APP_STATE.currentUser.trade = trade;
    APP_STATE.currentUser.bloodGroup = blood;
    APP_STATE.currentUser.bio = bio;
    APP_STATE.currentUser.isDonor = isDonor;
    APP_STATE.currentUser.isCustomized = true;

    try {
      localStorage.setItem('nn_user_id', cleanDigits);
      localStorage.setItem('nn_user_name', name);
      localStorage.setItem('nn_user_phone', phone);
      localStorage.setItem('nn_permanent_phone', phone);
      if (email) localStorage.setItem('nn_user_email', email);
      else localStorage.removeItem('nn_user_email');
      localStorage.setItem('nn_user_loc', loc);
      localStorage.setItem('nn_user_district', district);
      if (trade) localStorage.setItem('nn_user_trade', trade);
      localStorage.setItem('nn_user_blood', blood);
      localStorage.setItem('nn_user_bio', bio);
      localStorage.setItem('nn_user_is_donor', isDonor ? 'true' : 'false');
      localStorage.setItem('nn_profile_completed', 'true');
    } catch (_) {}

    // Register user as Blood Donor if opted in
    if (isDonor && blood) {
      if (!Array.isArray(APP_STATE.bloodDonors)) APP_STATE.bloodDonors = [];
      const cleanP = cleanDigits;
      const existingIdx = APP_STATE.bloodDonors.findIndex(d => (d.phone && d.phone.replace(/\D/g, '').slice(-10) === cleanP) || d.name === name);
      const donorObj = {
        id: 'donor_' + cleanP,
        name: name,
        group: blood,
        phone: phone,
        location: loc,
        status: 'ലഭ്യമാണ്',
        lat: APP_STATE.location.lat,
        lon: APP_STATE.location.lon
      };
      if (existingIdx >= 0) {
        APP_STATE.bloodDonors[existingIdx] = donorObj;
      } else {
        APP_STATE.bloodDonors.unshift(donorObj);
      }
      try {
        localStorage.setItem('nn_blood_donors', JSON.stringify(APP_STATE.bloodDonors));
      } catch (_) {}
      if (typeof window.NN_SUPABASE_SERVICES?.saveBloodDonor === 'function') {
        window.NN_SUPABASE_SERVICES.saveBloodDonor(donorObj);
      }
    }

    // Check if avatar was previewed or updated
    const previewEl = document.getElementById('editProfAvatarPreview');
    if (previewEl && previewEl.src && previewEl.src.length > 50 && !previewEl.src.includes('data:image/svg+xml')) {
      APP_STATE.currentUser.avatar = previewEl.src;
      try {
        localStorage.setItem('nn_user_avatar', previewEl.src);
      } catch (_) {}
    }

    const targetAvatar = APP_STATE.currentUser.avatar || DEFAULT_USER_AVATAR;

    // Instantly close modal and give rapid haptic/toast feedback (0ms latency)
    closeModal('modal-edit-profile');
    toast(`🎉 സ്വാഗതം ${name}! വിവരങ്ങൾ വിജയകരമായി സേവ് ചെയ്തു.`);

    if (typeof updateAdminUI === 'function') {
      updateAdminUI();
    }
    if (typeof updateUserAuthUI === 'function') {
      updateUserAuthUI();
    }

    // Instantly update all avatar images in DOM
    ['#profileAvatarImg', '#homeHeaderAvatar', '#postingAsAvatar', '#profComposerMiniAvatar', '#desktopUserAvatar', '#desktopSidebarAvatar'].forEach(sel => {
      const el = document.querySelector(sel);
      if (el) el.src = targetAvatar;
    });

    // Instantly update name displays in DOM
    ['#postingAsName', '#desktopUserName', '#desktopSidebarName'].forEach(sel => {
      const el = document.querySelector(sel);
      if (el) el.textContent = name;
    });

    // Run heavier feed updates and cloud sync asynchronously in next frame
    requestAnimationFrame(() => {
      renderProfileScreen();
      updatePostingProfileBar();
      if (APP_STATE.currentScreen === 'home') {
        renderHomeScreen();
      }

      // Update author name & avatar on user posts in background
      if (Array.isArray(APP_STATE.posts)) {
        let postChanged = false;
        APP_STATE.posts.forEach(p => {
          if (p.isCurrentUser || p.authorId === APP_STATE.currentUser.id || (p.authorPhone && p.authorPhone.replace(/\D/g, '').slice(-10) === cleanDigits)) {
            p.authorName = name;
            p.authorPhone = phone;
            p.authorAvatar = targetAvatar;
            p.authorLocation = loc;
            p.authorBlood = blood;
            postChanged = true;
          }
        });
        if (postChanged) savePosts();
      }

      // Synchronize to Supabase Cloud Profiles non-blockingly (Enforce Single Account per Phone & Email)
      if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.saveUserProfile === 'function') {
        window.NN_SUPABASE_SERVICES.saveUserProfile(APP_STATE.currentUser).then(res => {
          if (res && res.duplicate) {
            toast(`🔒 ഈ ${res.field === 'phone' ? 'മൊബൈൽ നമ്പറിൽ' : 'ഇമെയിൽ വിലാസത്തിൽ'} ഇതിനകം ഒരു അക്കൗണ്ടുണ്ട്. ഒരൊറ്റ അക്കൗണ്ടായി ക്രമീകരിച്ചു.`);
          }
        }).catch(err => console.warn('Cloud sync error:', err));
      }
    });
  }
  window.submitProfileUpdate = submitProfileUpdate;

  function handleProfileLogout() {
    if (confirm('നിങ്ങളുടെ പ്രൊഫൈലിൽ നിന്ന് ലോഗ് ഔട്ട് ചെയ്യണോ? (പുതിയ ഫോൺ നമ്പർ നൽകി ഏതുസമയത്തും തിരികെ ലോഗിൻ ചെയ്യാം)')) {
      try {
        localStorage.removeItem('nn_user_name');
        localStorage.removeItem('nn_user_phone');
        localStorage.removeItem('nn_permanent_phone');
        localStorage.removeItem('nn_user_id');
        localStorage.removeItem('nn_user_email');
        localStorage.removeItem('nn_user_avatar');
        localStorage.removeItem('nn_user_loc');
        localStorage.removeItem('nn_user_blood');
        localStorage.removeItem('nn_user_is_donor');
        localStorage.removeItem('nn_user_cover');
        localStorage.removeItem('nn_user_bio');
        localStorage.removeItem('nn_chats_store');
        localStorage.removeItem('nn_chats_meta');
      } catch (_) {}

      APP_STATE.chats = {};
      APP_STATE.chatMeta = {};

      APP_STATE.currentUser = {
        id: 'usr_me_' + Math.random().toString(36).substring(2, 9),
        name: 'നാട്ടുകാരൻ',
        phone: '',
        email: '',
        location: 'തത്സമയ ലൊക്കേഷൻ',
        bloodGroup: 'O+',
        avatar: DEFAULT_USER_AVATAR,
        isDonor: false,
        isCustomized: false
      };

      if (typeof updateUserAuthUI === 'function') updateUserAuthUI();
      if (typeof updateChatBadgeCounter === 'function') updateChatBadgeCounter();
      if (typeof renderChatListScreen === 'function') renderChatListScreen();
      renderProfileScreen();
      updatePostingProfileBar();
      renderHomeScreen();
      toast('🚪 വിജയകരമായി ലോഗ് ഔട്ട് ചെയ്തു.');
    }
  }
  window.handleProfileLogout = handleProfileLogout;

  // COMPLETE ACCOUNT & DATA PURGE (Supabase Cloud + Local Storage)
  async function handleDeleteUserAccount() {
    const user = (APP_STATE && APP_STATE.currentUser) || {};
    const userId = user.id;
    const phone = user.phone || localStorage.getItem('nn_user_phone') || localStorage.getItem('nn_permanent_phone') || '';
    const email = user.email || localStorage.getItem('nn_user_email') || '';

    const confirmed = confirm(
      '⚠️ നിങ്ങളുടെ അക്കൗണ്ട് ശാശ്വതമായി ഡിലീറ്റ് ചെയ്യണോ?\n\n' +
      'നിങ്ങളുടെ പ്രൊഫൈൽ, പോസ്റ്റുകൾ, സർവീസുകൾ, ജോബ് പരസ്യങ്ങൾ, വാടക വിവരങ്ങൾ, രക്തദാതാവ് രജിസ്ട്രേഷൻ, മെസ്സേജുകൾ എന്നിവ Supabase ക്ലൗഡിൽ നിന്നും ഉപകരണത്തിൽ നിന്നും പൂർണ്ണമായി മായ്ക്കപ്പെടും.\n\n' +
      'ഈ പ്രവർത്തനം ഒരിക്കലും തിരിച്ചെടുക്കാൻ കഴിയില്ല!'
    );

    if (!confirmed) return;

    toast('⏳ അക്കൗണ്ടും എല്ലാ വിവരങ്ങളും Supabase-ൽ നിന്ന് ഡിലീറ്റ് ചെയ്യുന്നു...');

    try {
      if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.deleteEntireUserAccount === 'function') {
        await window.NN_SUPABASE_SERVICES.deleteEntireUserAccount(userId, phone, email);
      }
    } catch (err) {
      console.warn('⚠️ [Delete Account] Supabase purge warning:', err);
    }

    try {
      localStorage.removeItem('nn_user_name');
      localStorage.removeItem('nn_user_phone');
      localStorage.removeItem('nn_permanent_phone');
      localStorage.removeItem('nn_user_id');
      localStorage.removeItem('nn_permanent_id');
      localStorage.removeItem('nn_user_email');
      localStorage.removeItem('nn_user_avatar');
      localStorage.removeItem('nn_user_loc');
      localStorage.removeItem('nn_user_district');
      localStorage.removeItem('nn_user_trade');
      localStorage.removeItem('nn_user_blood');
      localStorage.removeItem('nn_user_bio');
      localStorage.removeItem('nn_user_is_donor');
      localStorage.removeItem('nn_user_cover');
      localStorage.removeItem('nn_profile_completed');
      localStorage.removeItem('nn_user_chats');
      localStorage.removeItem('nn_my_posts');
    } catch (_) {}

    APP_STATE.currentUser = {
      id: 'usr_me_' + Math.random().toString(36).substring(2, 9),
      name: 'നാട്ടുകാരൻ',
      phone: '',
      email: '',
      location: 'തത്സമയ ലൊക്കേഷൻ',
      bloodGroup: 'O+',
      avatar: DEFAULT_USER_AVATAR,
      isDonor: false,
      isCustomized: false
    };

    closeModal('modal-edit-profile');

    if (typeof updateUserAuthUI === 'function') updateUserAuthUI();
    if (typeof updateAdminUI === 'function') updateAdminUI();
    if (typeof updatePostingProfileBar === 'function') updatePostingProfileBar();
    if (typeof renderProfileScreen === 'function') renderProfileScreen();
    if (typeof renderHomeScreen === 'function') renderHomeScreen();

    ['#profileAvatarImg', '#homeHeaderAvatar', '#postingAsAvatar', '#profComposerMiniAvatar', '#desktopUserAvatar', '#desktopSidebarAvatar'].forEach(sel => {
      const el = document.querySelector(sel);
      if (el) el.src = DEFAULT_USER_AVATAR;
    });
    ['#postingAsName', '#desktopUserName', '#desktopSidebarName'].forEach(sel => {
      const el = document.querySelector(sel);
      if (el) el.textContent = 'നാട്ടുകാരൻ';
    });

    toast('✅ നിങ്ങളുടെ അക്കൗണ്ടും എല്ലാ വിവരങ്ങളും Supabase-ൽ നിന്നും ആപ്പിൽ നിന്നും പൂർണ്ണമായി മായ്ച്ചു.');
  }
  window.handleDeleteUserAccount = handleDeleteUserAccount;

  function updateUserAuthUI() {
    const user = (APP_STATE && APP_STATE.currentUser) || {};
    const cleanPhone = (user.phone || '').replace(/\D/g, '').slice(-10);
    const isLoggedIn = Boolean(cleanPhone && cleanPhone.length === 10 && user.isCustomized);
    const displayName = (user.name && user.name !== 'നാട്ടുകാരൻ') ? user.name : (isLoggedIn ? 'സിറ്റിസൺ' : 'അതിഥി (Guest)');
    const currentAvatar = user.avatar || DEFAULT_USER_AVATAR;

    // Desktop Header elements
    const desktopLoginBtn = document.getElementById('desktopLoginBtn');
    const desktopLogoutBtn = document.getElementById('desktopLogoutBtn');
    const desktopUserName = document.getElementById('desktopUserName');
    const desktopUserAvatar = document.getElementById('desktopUserAvatar');

    if (desktopUserName) desktopUserName.textContent = displayName;
    if (desktopUserAvatar) desktopUserAvatar.src = currentAvatar;

    if (desktopLoginBtn) {
      desktopLoginBtn.style.display = isLoggedIn ? 'none' : 'inline-flex';
    }
    if (desktopLogoutBtn) {
      desktopLogoutBtn.style.display = isLoggedIn ? 'inline-flex' : 'none';
    }

    // Desktop Left Sidebar elements
    const sidebarAvatar = document.getElementById('desktopSidebarAvatar');
    const sidebarName = document.getElementById('desktopSidebarName');
    const sidebarSub = document.getElementById('desktopSidebarSub');
    const sidebarPrompt = document.getElementById('desktopSidebarLoginPrompt');

    if (sidebarAvatar) sidebarAvatar.src = currentAvatar;
    if (sidebarName) sidebarName.textContent = displayName;
    if (sidebarSub) {
      const loc = user.location || (APP_STATE.location && APP_STATE.location.name) || 'കേരളം';
      sidebarSub.textContent = isLoggedIn ? `📍 ${loc} · പ്രൊഫൈൽ` : 'ലോഗിൻ ചെയ്യാൻ തൊടുക ➔';
    }
    if (sidebarPrompt) {
      sidebarPrompt.style.display = isLoggedIn ? 'none' : 'block';
    }

    // Mobile Top Bar
    const mobileLoginChip = document.getElementById('homeMobileLoginChip');
    if (mobileLoginChip) {
      mobileLoginChip.style.display = isLoggedIn ? 'none' : 'inline-flex';
    }

    // Update Admin UI
    if (typeof updateAdminUI === 'function') {
      updateAdminUI();
    }
  }
  window.updateUserAuthUI = updateUserAuthUI;

  function openLoginModal() {
    const modal = document.getElementById('modal-citizen-login');
    if (!modal) return;
    const phoneInput = document.getElementById('citizenLoginPhone');
    const emailInput = document.getElementById('citizenLoginEmail');
    const nameInput = document.getElementById('citizenLoginName');
    const placeInput = document.getElementById('citizenLoginPlace');
    const districtInput = document.getElementById('citizenLoginDistrict');
    const bloodInput = document.getElementById('citizenLoginBlood');
    const donorInput = document.getElementById('citizenLoginDonor');
    const hintEl = document.getElementById('loginPhoneStatusHint');
    const btnText = document.getElementById('loginSubmitBtnText');

    const user = (APP_STATE && APP_STATE.currentUser) || {};
    const existingPhone = user.phone ? user.phone.replace(/\D/g, '').slice(-10) : '';
    const existingEmail = user.email || localStorage.getItem('nn_user_email') || '';

    if (phoneInput) phoneInput.value = existingPhone;
    if (emailInput) emailInput.value = existingEmail;
    if (nameInput) nameInput.value = (user.name && user.name !== 'നാട്ടുകാരൻ') ? user.name : '';
    if (placeInput) placeInput.value = user.location || (APP_STATE.location && APP_STATE.location.name) || '';
    if (districtInput && (user.district || (APP_STATE.location && APP_STATE.location.district))) {
      districtInput.value = user.district || APP_STATE.location.district;
    }
    if (bloodInput && user.bloodGroup) bloodInput.value = user.bloodGroup;
    if (donorInput) donorInput.checked = (user.isDonor !== false);

    if (hintEl) {
      hintEl.style.display = 'none';
      hintEl.textContent = '';
    }
    if (btnText) {
      btnText.textContent = existingPhone ? 'ലോഗിൻ ചെയ്യാം / തുടരാം' : 'ലോഗിൻ ചെയ്യാം (Login Now)';
    }

    modal.style.display = 'flex';
    modal.classList.add('active');

    if (existingPhone) {
      handleLoginPhoneLookup(existingPhone);
    } else if (phoneInput) {
      setTimeout(() => phoneInput.focus(), 150);
    }
  }
  window.openLoginModal = openLoginModal;

  let _loginPhoneLookupTimer = null;
  function handleLoginPhoneLookup(val) {
    clearTimeout(_loginPhoneLookupTimer);
    const clean = String(val || '').replace(/\D/g, '').slice(-10);
    const hintEl = document.getElementById('loginPhoneStatusHint');
    const nameInput = document.getElementById('citizenLoginName');
    const emailInput = document.getElementById('citizenLoginEmail');
    const placeInput = document.getElementById('citizenLoginPlace');
    const districtInput = document.getElementById('citizenLoginDistrict');
    const btnText = document.getElementById('loginSubmitBtnText');

    if (clean.length < 10) {
      if (hintEl) hintEl.style.display = 'none';
      if (btnText) btnText.textContent = 'ലോഗിൻ ചെയ്യാം (Login Now)';
      return;
    }

    // SPECIAL SUPER ADMIN IDENTIFICATION: 9605406699
    if (clean === ADMIN_PHONE) {
      if (hintEl) {
        hintEl.style.display = 'block';
        hintEl.style.background = '#FEF3C7';
        hintEl.style.color = '#92400E';
        hintEl.style.padding = '8px 12px';
        hintEl.style.borderRadius = '12px';
        hintEl.style.border = '1.5px solid #F59E0B';
        hintEl.innerHTML = '👑 <b>സൂപ്പർ അഡ്മിൻ പ്രൊഫൈൽ (9605406699)</b> — അഡ്മിൻ കൺസോൾ ആക്സസ് ഓണാകും!';
      }
      if (nameInput) nameInput.value = 'അഡ്മിൻ (നമ്മുടെ നാട്)';
      if (emailInput && !emailInput.value) emailInput.value = 'admin@nammudenaadu.app';
      if (placeInput && !placeInput.value) placeInput.value = 'കേരളം';
      if (btnText) btnText.textContent = '👑 അഡ്മിനായി ലോഗിൻ ചെയ്യാം';
      return;
    }

    if (hintEl) {
      hintEl.style.display = 'block';
      hintEl.style.background = 'transparent';
      hintEl.style.border = 'none';
      hintEl.style.padding = '0';
      hintEl.style.color = '#0284C7';
      hintEl.textContent = '🔍 പ്രൊഫൈൽ പരിശോധിക്കുന്നു...';
    }

    _loginPhoneLookupTimer = setTimeout(async () => {
      let profile = null;
      if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.fetchUserProfile === 'function') {
        try {
          profile = await window.NN_SUPABASE_SERVICES.fetchUserProfile(clean);
        } catch (_) {}
      }

      if (profile && profile.name) {
        if (hintEl) {
          hintEl.style.display = 'block';
          hintEl.style.color = '#059669';
          hintEl.innerHTML = `✅ പ്രൊഫൈൽ കണ്ടെത്തി: <b>${escapeHtml(profile.name)}</b> (📍 ${escapeHtml(profile.place || 'കേരളം')})`;
        }
        if (nameInput && (!nameInput.value || nameInput.value === 'നാട്ടുകാരൻ')) {
          nameInput.value = profile.name;
        }
        if (emailInput && !emailInput.value && profile.email) {
          emailInput.value = profile.email;
        }
        if (placeInput && (!placeInput.value || placeInput.value === 'തത്സമയ ലൊക്കേഷൻ') && profile.place) {
          placeInput.value = profile.place;
        }
        if (districtInput && profile.district) {
          districtInput.value = profile.district;
        }
        if (btnText) {
          btnText.textContent = `🚀 ലോഗിൻ ചെയ്യാം (${profile.name})`;
        }
      } else {
        if (hintEl) {
          hintEl.style.display = 'block';
          hintEl.style.color = '#047857';
          hintEl.textContent = '✨ പുതിയ സിറ്റിസൺ രജിസ്ട്രേഷൻ (വിവരങ്ങൾ നൽകുക)';
        }
        if (btnText) {
          btnText.textContent = '🚀 രജിസ്റ്റർ ചെയ്ത് ലോഗിൻ ചെയ്യാം';
        }
      }
    }, 280);
  }
  window.handleLoginPhoneLookup = handleLoginPhoneLookup;

  function handleLoginEmailCheck(val) {
    const hintEl = document.getElementById('loginEmailStatusHint');
    const email = String(val || '').trim().toLowerCase();
    if (!hintEl) return;
    if (!email) {
      hintEl.textContent = '✓ ഇമെയിൽ ഐഡി നിങ്ങളുടെ വെരിഫൈഡ് സിറ്റിസൺ പ്രൊഫൈൽ തിരിച്ചറിയലിനായി ഉപയോഗിക്കും.';
      hintEl.style.color = '#059669';
      return;
    }
    if (email.includes('@') && email.includes('.')) {
      if (email === 'admin@nammudenaadu.app') {
        hintEl.innerHTML = '👑 <b>അഡ്മിൻ ഇമെയിൽ ഐഡി തിരിച്ചറിഞ്ഞു</b>';
        hintEl.style.color = '#D97706';
      } else {
        hintEl.innerHTML = `✅ സാധുവായ ഇമെയിൽ ഐഡി: <b>${escapeHtml(email)}</b>`;
        hintEl.style.color = '#059669';
      }
    } else {
      hintEl.textContent = 'ദയവായി ശരിയായ ഇമെയിൽ വിലാസം നൽകുക (ഉദാ: name@gmail.com)';
      hintEl.style.color = '#64748B';
    }
  }
  window.handleLoginEmailCheck = handleLoginEmailCheck;

  async function handleCitizenLoginSubmit(e) {
    if (e && e.preventDefault) e.preventDefault();

    const phoneInput = document.getElementById('citizenLoginPhone');
    const emailInput = document.getElementById('citizenLoginEmail');
    const nameInput = document.getElementById('citizenLoginName');
    const placeInput = document.getElementById('citizenLoginPlace');
    const districtInput = document.getElementById('citizenLoginDistrict');
    const bloodInput = document.getElementById('citizenLoginBlood');
    const donorInput = document.getElementById('citizenLoginDonor');

    const rawPhone = phoneInput ? phoneInput.value : '';
    const cleanPhone = String(rawPhone).replace(/\D/g, '').slice(-10);
    const rawEmail = emailInput ? emailInput.value.trim().toLowerCase() : '';

    if (!cleanPhone || cleanPhone.length < 10) {
      alert('ദയവായി സാധുവായ 10-അക്ക മൊബൈൽ നമ്പർ നൽകുക.');
      if (phoneInput) phoneInput.focus();
      return;
    }

    const isAdmin = (cleanPhone === ADMIN_PHONE || rawEmail === 'admin@nammudenaadu.app');
    const defaultName = isAdmin ? 'അഡ്മിൻ (നമ്മുടെ നാട്)' : 'നാട്ടുകാരൻ';
    const rawName = (nameInput && nameInput.value ? nameInput.value.trim() : '') || defaultName;
    const place = (placeInput && placeInput.value ? placeInput.value.trim() : '') || (APP_STATE.location?.name || 'കേരളം');
    const district = (districtInput && districtInput.value ? districtInput.value : '') || (APP_STATE.location?.district || 'കണ്ണൂർ');
    const bloodGroup = (bloodInput && bloodInput.value ? bloodInput.value : 'O+');
    const isDonor = donorInput ? donorInput.checked : true;

    const citizenId = 'usr_' + cleanPhone;

    APP_STATE.currentUser = {
      id: citizenId,
      name: rawName,
      phone: cleanPhone,
      email: rawEmail,
      location: place,
      district: district,
      bloodGroup: bloodGroup,
      avatar: APP_STATE.currentUser?.avatar || DEFAULT_USER_AVATAR,
      cover: APP_STATE.currentUser?.cover || 'img/kerala-splash.jpg',
      bio: APP_STATE.currentUser?.bio || (isAdmin ? 'നമ്മുടെ നാട് സിസ്റ്റം അഡ്മിനിസ്ട്രേറ്റർ 👑' : 'നമ്മുടെ നാട് കൂട്ടായ്മ 🌿'),
      isDonor: isDonor,
      isAdmin: isAdmin,
      isCustomized: true
    };

    try {
      localStorage.setItem('nn_user_id', cleanPhone);
      localStorage.setItem('nn_permanent_id', citizenId);
      localStorage.setItem('nn_permanent_phone', cleanPhone);
      localStorage.setItem('nn_user_phone', cleanPhone);
      localStorage.setItem('nn_user_email', rawEmail);
      localStorage.setItem('nn_user_name', rawName);
      localStorage.setItem('nn_user_loc', place);
      localStorage.setItem('nn_curr_district', district);
      localStorage.setItem('nn_user_blood', bloodGroup);
      localStorage.setItem('nn_user_is_donor', isDonor ? 'true' : 'false');
      localStorage.setItem('nn_profile_completed', 'true');
      if (isAdmin) {
        localStorage.setItem('nn_is_admin', 'true');
      } else {
        localStorage.removeItem('nn_is_admin');
      }
    } catch (_) {}

    // Close modal
    closeModal('modal-citizen-login');

    // Instantly update interface
    updateAdminUI();
    updateUserAuthUI();
    renderProfileScreen();
    updatePostingProfileBar();
    if (APP_STATE.currentScreen === 'home') {
      renderHomeScreen();
    }

    if (isAdmin) {
      toast(`👑 സ്വാഗതം അഡ്മിൻ! അഡ്മിൻ കൺസോൾ ആക്സസ് വിജയകരമായി സജീവമായി.`);
    } else {
      toast(`🎉 സ്വാഗതം ${rawName}! താങ്കൾ വിജയകരമായി ലോഗിൻ ചെയ്തു.`);
    }

    // Async cloud sync
    if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES) {
      if (typeof window.NN_SUPABASE_SERVICES.saveUserProfile === 'function') {
        window.NN_SUPABASE_SERVICES.saveUserProfile(APP_STATE.currentUser);
      }
      if (typeof window.NN_SUPABASE_SERVICES.syncUserChats === 'function') {
        window.NN_SUPABASE_SERVICES.syncUserChats();
      }
    }
    if (typeof window !== 'undefined' && window.NN_ONESIGNAL?.syncUserIdentity) {
      window.NN_ONESIGNAL.syncUserIdentity();
    }
  }
  window.handleCitizenLoginSubmit = handleCitizenLoginSubmit;

  function handleDesktopProfileClick() {
    const cleanPhone = (APP_STATE?.currentUser?.phone || '').replace(/\D/g, '').slice(-10);
    if (!cleanPhone || cleanPhone.length < 10) {
      openLoginModal();
    } else {
      navTo('profile');
    }
  }
  window.handleDesktopProfileClick = handleDesktopProfileClick;

  function handleSidebarUserCardClick() {
    const cleanPhone = (APP_STATE?.currentUser?.phone || '').replace(/\D/g, '').slice(-10);
    if (!cleanPhone || cleanPhone.length < 10) {
      openLoginModal();
    } else {
      navTo('profile');
    }
  }
  window.handleSidebarUserCardClick = handleSidebarUserCardClick;

  function openSettingsModal() {
    const user = (APP_STATE && APP_STATE.currentUser) || {};
    const nameEl = document.getElementById('settingsUserName');
    if (nameEl) nameEl.textContent = user.name || 'നാട്ടുകാരൻ';

    const phoneEl = document.getElementById('settingsUserPhone');
    if (phoneEl) phoneEl.textContent = user.phone ? '📱 ' + user.phone : 'ഫോൺ നമ്പർ നൽകിയിട്ടില്ല';

    const avatarEl = document.getElementById('settingsUserAvatar');
    if (avatarEl) avatarEl.src = user.avatar || window.DEFAULT_USER_AVATAR;

    const locEl = document.getElementById('settingsUserLoc');
    if (locEl) locEl.textContent = '📍 ' + ((APP_STATE && APP_STATE.location && APP_STATE.location.name) || 'തത്സമയ ലൊക്കേഷൻ');

    const radEl = document.getElementById('settingsUserRadius');
    if (radEl) radEl.textContent = ((APP_STATE && APP_STATE.location && APP_STATE.location.radius) || 5) + ' km പരിധി';

    const verEl = document.getElementById('settingsAppVersion');
    if (verEl) verEl.textContent = 'v' + ((window.APP_BUILD_INFO && window.APP_BUILD_INFO.versionName) || '1.0.2');

    // Admin visibility strictly locked to 9605406699
    const adminRow = document.getElementById('settingsAdminHubRow');
    if (adminRow) {
      const isAdmin = (typeof checkIsAdmin === 'function') ? checkIsAdmin() : (String(user.phone || '').replace(/\D/g, '').slice(-10) === '9605406699');
      adminRow.style.display = isAdmin ? 'flex' : 'none';
    }

    openModal('modal-settings');
  }
  window.openSettingsModal = openSettingsModal;

  function clearAppCacheAndRefresh() {
    if (confirm('ആപ്പിലെ താൽക്കാലിക കാഷെ (Cache) ക്ലിയർ ചെയ്ത് റീഫ്രഷ് ചെയ്യണോ? (നിങ്ങളുടെ ലോഗിനോ അക്കൗണ്ട് വിവരങ്ങളോ നഷ്ടപ്പെടില്ല)')) {
      try {
        if ('caches' in window) {
          caches.keys().then(names => {
            names.forEach(name => caches.delete(name));
          });
        }
      } catch (_) {}
      showToast('🧹 കാഷെ ക്ലിയർ ചെയ്തു. ആപ്പ് റീഫ്രഷ് ആകുന്നു...');
      setTimeout(() => {
        window.location.reload(true);
      }, 700);
    }
  }
  window.clearAppCacheAndRefresh = clearAppCacheAndRefresh;

  // ==============================================================
  // 16. AUTOMATIC PROFILE AUTO-FILL & AUTO-SUGGESTION FOR ALL FORMS
  // ==============================================================
  function autoFillRegisteredUserDetails(container) {
    try {
      const root = container || document;
      const u = (typeof APP_STATE !== 'undefined' && APP_STATE.currentUser) || {};
      const phone = (u.phone || localStorage.getItem('nn_user_phone') || localStorage.getItem('nn_permanent_phone') || '').trim();
      const rawName = u.name || localStorage.getItem('nn_user_name') || '';
      const name = (rawName && rawName !== 'നാട്ടുകാരൻ' && rawName !== 'അതിഥി (Guest)') ? rawName.trim() : '';
      const currentLoc = (typeof APP_STATE !== 'undefined' && APP_STATE.location && APP_STATE.location.name)
        ? APP_STATE.location.name.split(',')[0].trim()
        : '';
      const rawLoc = u.location || localStorage.getItem('nn_user_loc') || currentLoc || '';
      const location = (rawLoc && rawLoc !== 'തത്സമയ ലൊക്കേഷൻ') ? rawLoc.trim() : currentLoc;
      const blood = (u.bloodGroup || localStorage.getItem('nn_user_blood') || '').trim();

      // 0. Setup dynamic datalists for native keyboard auto-suggestions
      let dlPhones = document.getElementById('dl-user-phones');
      if (!dlPhones) {
        dlPhones = document.createElement('datalist');
        dlPhones.id = 'dl-user-phones';
        document.body.appendChild(dlPhones);
      }
      if (phone) dlPhones.innerHTML = `<option value="${phone}">നിങ്ങളുടെ നമ്പർ (${phone})</option>`;

      let dlNames = document.getElementById('dl-user-names');
      if (!dlNames) {
        dlNames = document.createElement('datalist');
        dlNames.id = 'dl-user-names';
        document.body.appendChild(dlNames);
      }
      if (name) dlNames.innerHTML = `<option value="${name}">നിങ്ങളുടെ പേര് (${name})</option>`;

      let dlPlaces = document.getElementById('dl-user-places');
      if (!dlPlaces) {
        dlPlaces = document.createElement('datalist');
        dlPlaces.id = 'dl-user-places';
        document.body.appendChild(dlPlaces);
      }
      if (location) dlPlaces.innerHTML = `<option value="${location}">നിങ്ങളുടെ പ്രദേശം (${location})</option>`;

      // 1. Phone Inputs (All types: tel, id/name containing phone/mobile/contact)
      if (phone) {
        const phoneInputs = root.querySelectorAll('input[type="tel"], input[id*="phone" i], input[name*="phone" i], input[id*="mobile" i], input[name*="mobile" i], input[id*="contact" i]');
        phoneInputs.forEach(input => {
          input.setAttribute('list', 'dl-user-phones');
          if (!input.value || input.value.trim() === '') {
            input.value = phone;
            input.dispatchEvent(new Event('input', { bubbles: true }));
          }
          input.setAttribute('autocomplete', 'tel');
          input.setAttribute('inputmode', 'tel');
        });
      }

      // 2. Name / Author Inputs
      if (name) {
        const nameInputs = root.querySelectorAll('#authorName, #quickReqName, #bReqPatient, #postAuthorName, #nearbyHelpUserName, #rentOwner, #jobEmployer, #servName');
        nameInputs.forEach(input => {
          input.setAttribute('list', 'dl-user-names');
          if (!input.value || input.value.trim() === '') {
            input.value = name;
            input.dispatchEvent(new Event('input', { bubbles: true }));
          }
          input.setAttribute('autocomplete', 'name');
        });
      }

      // 3. Location / Town Inputs
      if (location) {
        const locInputs = root.querySelectorAll('input[id*="location" i], input[name*="location" i], input[id*="place" i], input[name*="place" i], #quickReqLocation, #nearbyHelpLocationInput');
        locInputs.forEach(input => {
          input.setAttribute('list', 'dl-user-places');
          if (!input.value || input.value.trim() === '') {
            input.value = location;
            input.dispatchEvent(new Event('input', { bubbles: true }));
          }
          input.setAttribute('autocomplete', 'address-level2');
        });
      }

      // 4. Blood Group Dropdown
      if (blood) {
        const bloodSelects = root.querySelectorAll('select[id*="blood" i], select[name*="blood" i], select[id*="group" i], #bReqGroup, #donorGroup');
        bloodSelects.forEach(sel => {
          if (sel && (!sel.value || sel.value === '')) {
            for (let i = 0; i < sel.options.length; i++) {
              if (sel.options[i].value === blood || sel.options[i].text.includes(blood)) {
                sel.selectedIndex = i;
                sel.dispatchEvent(new Event('change', { bubbles: true }));
                break;
              }
            }
          }
        });
      }

      // 5. Visual Auto-fill indicator badge if container is a modal
      if (container && container.classList && container.classList.contains('modal-overlay')) {
        const modalBody = container.querySelector('.modal-content, .modal-card, .form-card') || container;
        if (modalBody && !container.querySelector('.auto-filled-profile-chip') && (phone || name)) {
          const chip = document.createElement('div');
          chip.className = 'auto-filled-profile-chip';
          chip.style.cssText = 'background:linear-gradient(135deg, #ECFDF5 0%, #E0F2FE 100%);border:1px solid #A7F3D0;color:#047857;padding:6px 12px;border-radius:10px;font-size:11.5px;font-weight:700;margin-bottom:12px;display:flex;align-items:center;justify-content:space-between;box-shadow:0 1px 3px rgba(16,185,129,0.1)';
          chip.innerHTML = `
            <div style="display:flex;align-items:center;gap:6px">
              <span>✨</span>
              <span>നിങ്ങളുടെ പ്രൊഫൈൽ ഓട്ടോ-ഫിൽ ചെയ്തു: <b>${escapeHtml(name || phone)}</b></span>
            </div>
            <span style="font-size:10px;background:#10B981;color:#fff;padding:2px 6px;border-radius:6px">Auto-Filled</span>
          `;
          const firstForm = modalBody.querySelector('form, .modal-body, .form-group') || modalBody.firstChild;
          if (firstForm && firstForm.parentNode) {
            firstForm.parentNode.insertBefore(chip, firstForm);
          }
        }
      }
    } catch (_) {}
  }
  window.autoFillRegisteredUserDetails = autoFillRegisteredUserDetails;

  function openModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) {
      el.style.display = 'flex';
      el.classList.add('active');
      autoFillRegisteredUserDetails(el);
    }
  }
  window.openModal = openModal;

  function closeModal(modalId) {
    if (modalId === 'modal-chat') {
      if (typeof window._activeChatUnsubscribe === 'function') {
        try { window._activeChatUnsubscribe(); } catch (_) {}
        window._activeChatUnsubscribe = null;
      }
    }
    const el = document.getElementById(modalId);
    if (el) {
      el.classList.remove('active');
      el.style.display = 'none';
    }
  }
  window.closeModal = closeModal;

  // ==============================================================
  // AUTO-ROTATING HOME ADS CAROUSEL (4 SECONDS ROTATION)
  // ==============================================================
  const DEFAULT_HOME_ADS = [
    {
      id: 'ad_1',
      title: 'നമ്മുടെ നാട്',
      sub: '',
      desc: 'നിങ്ങളുടെ നാട്ടിലെ പ്ലംബർ, ഇലക്ട്രീഷ്യൻ, ഡ്രൈവർ, ആശാരി തുടങ്ങിയ എല്ലാ വിദഗ്ദ്ധ തൊഴിലാളികളെയും മിനിറ്റുകൾക്കകം കണ്ടെത്താം. സേവനങ്ങൾ ആവശ്യമുള്ളവർക്ക് നേരിട്ട് വിളിക്കാനും ചാറ്റ് ചെയ്യാനും സാധിക്കും.',
      art: 'img/kerala-splash.jpg',
      badge: '✨ പ്രധാന അറിയിപ്പ്',
      phone: '',
      link: ''
    },
    {
      id: 'ad_2',
      title: '🌾 ഓണക്കാല പ്രത്യേക ഓഫറുകൾ & വിപണി',
      sub: '🛍️ അടുത്തുള്ള കടകളിലെ ഓഫറുകൾ ഇപ്പോൾ ആപ്പിൽ',
      desc: 'നിങ്ങളുടെ പ്രദേശത്തെ പ്രധാന കടകളിലും സൂപ്പർമാർക്കറ്റുകളിലും ലഭ്യമായ ഓഫറുകളും ഡിസ്കൗണ്ടുകളും അറിയാം. പ്രാദേശിക കച്ചവടക്കാരെ പിന്തുണയ്ക്കൂ, നാട്ടിലെ വിപണി സജീവമാക്കൂ!',
      art: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
      badge: '🛍️ സ്പെഷ്യൽ ഓഫർ',
      phone: '9847123456',
      link: ''
    },
    {
      id: 'ad_3',
      title: '🩸 ജീവൻ രക്ഷിക്കാൻ രക്തദാനം ചെയ്യാം',
      sub: '🚨 അടിയന്തര രക്ത ആവശ്യങ്ങൾക്ക് ആപ്പ് ഉപയോഗിക്കൂ',
      desc: 'നിങ്ങളുടെ നാട്ടിൽ അടിയന്തിരമായി രക്തം ആവശ്യമുള്ളവർക്ക് സഹായമേകാൻ ബ്ലഡ് ഡോണർ നെറ്റ്‌വർക്കിൽ രജിസ്റ്റർ ചെയ്യാം. ആപ്പ് വഴി നേരിട്ട് ദാതാക്കളെ ബന്ധപ്പെടാം.',
      art: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80',
      badge: '🚨 അടിയന്തരം',
      phone: '108',
      link: ''
    },
    {
      id: 'ad_4',
      title: '🌴 കേരള ടൂറിസം & പ്രാദേശിക യാത്രകൾ',
      sub: '⛵ കായലുകളും പ്രകൃതിഭംഗിയും അടുത്തറിയാം',
      desc: 'നാട്ടിലെ പ്രകൃതിഭംഗി തുളുമ്പുന്ന വിനോദസഞ്ചാര കേന്ദ്രങ്ങളും ഹൗസ്ബോട്ട് യാത്രകളും കുടുംബത്തോടൊപ്പം ആസ്വദിക്കൂ. വാടക വാഹനങ്ങൾക്കും ടാക്സികൾക്കും ആപ്പിൽ അന്വേഷിക്കാം.',
      art: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80',
      badge: '🌴 യാത്ര & ടൂറിസം',
      phone: '',
      link: 'https://www.keralatourism.org'
    }
  ];

  let currentAdIndex = 0;
  let adRotateInterval = null;

  function getActiveAdsList() {
    const list = [...DEFAULT_HOME_ADS];
    const customArt = localStorage.getItem('thuna_custom_village_banner_art') || localStorage.getItem('thuna_custom_hero_banner');
    const customTitle = localStorage.getItem('thuna_custom_village_banner_title');
    const customSub = localStorage.getItem('thuna_custom_village_banner_sub');
    const customDesc = localStorage.getItem('thuna_custom_village_banner_desc');
    const customPhone = localStorage.getItem('thuna_custom_village_banner_phone');
    const customLink = localStorage.getItem('thuna_custom_village_banner_link');

    if (customArt || customTitle || customDesc) {
      list[0] = {
        id: 'ad_admin_custom',
        title: customTitle || list[0].title,
        sub: customSub || list[0].sub,
        desc: customDesc || list[0].desc,
        art: customArt || list[0].art,
        badge: '✨ അഡ്മിൻ പരസ്യം',
        phone: customPhone || '',
        link: customLink || ''
      };
    }
    return list;
  }

  function renderAdByIndex(index) {
    const ads = getActiveAdsList();
    if (!ads || ads.length === 0) return;
    currentAdIndex = (index + ads.length) % ads.length;
    const ad = ads[currentAdIndex];

    const banner = document.getElementById('homeVillagePromoBanner') || document.querySelector('.yg-village-promo-banner');
    if (!banner) return;
    const fullImg = document.getElementById('homeVillageBannerFullImg');
    const titleEl = document.getElementById('homeVillageBannerTitle');
    const subEl = document.getElementById('homeVillageBannerSub');
    const badgeEl = banner.querySelector('.admin-ad-badge');
    const overlay = document.getElementById('homeVillageBannerOverlay');
    const artWrap = document.getElementById('homeVillageBannerArtWrap');

    // Letters onnum venda: Keep clean edge-to-edge ad image without text overlays
    if (overlay) overlay.style.display = 'none';
    if (artWrap) artWrap.style.display = 'none';
    const promoLeft = banner.querySelector('.yg-promo-left');
    if (promoLeft) promoLeft.style.display = 'none';
    if (titleEl) {
      titleEl.style.display = 'none';
      titleEl.textContent = '';
    }
    if (subEl) {
      subEl.style.display = 'none';
      subEl.textContent = '';
    }
    if (badgeEl) badgeEl.style.display = 'none';

    if (fullImg && fullImg.src !== ad.art) {
      fullImg.src = ad.art;
    }
    banner.style.setProperty('background-image', `url("${ad.art}")`, 'important');

    renderAdCarouselDots(ads.length, currentAdIndex);
  }

  function renderAdCarouselDots(total, activeIdx) {
    const dotsContainer = document.getElementById('homeAdCarouselDots');
    if (!dotsContainer) return;
    let html = '';
    for (let i = 0; i < total; i++) {
      const isActive = i === activeIdx;
      html += `
        <span onclick="event.stopPropagation(); renderAdByIndex(${i}); startAdRotation();" 
              style="width:${isActive ? '18px' : '6px'};height:6px;border-radius:999px;background:${isActive ? '#ffffff' : 'rgba(255,255,255,0.45)'};display:inline-block;transition:all 0.3s ease;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,0.3)"></span>
      `;
    }
    dotsContainer.innerHTML = html;
  }

  function startAdRotation() {
    if (adRotateInterval) clearInterval(adRotateInterval);
    // Rotate smoothly every 5 seconds only when user is actively on home screen
    adRotateInterval = setInterval(() => {
      if (APP_STATE.currentScreen !== 'home' || (typeof document !== 'undefined' && document.hidden)) return;
      renderAdByIndex(currentAdIndex + 1);
    }, 5000);
  }

  function renderHomeVillageBanner() {
    renderAdByIndex(currentAdIndex);
    startAdRotation();
  }
  window.renderHomeVillageBanner = renderHomeVillageBanner;
  window.renderAdByIndex = renderAdByIndex;
  window.startAdRotation = startAdRotation;

  function openAdDetailModal() {
    const ads = getActiveAdsList();
    const ad = ads[currentAdIndex] || ads[0];

    const imgEl = document.getElementById('adDetailImage');
    const titleEl = document.getElementById('adDetailTitle');
    const subEl = document.getElementById('adDetailSub');
    const descEl = document.getElementById('adDetailDesc');
    const callRow = document.getElementById('adDetailCallRow');
    const callBtn = document.getElementById('adDetailCallBtn');
    const callText = document.getElementById('adDetailCallText');
    const linkRow = document.getElementById('adDetailLinkRow');
    const linkBtn = document.getElementById('adDetailLinkBtn');

    if (imgEl) imgEl.src = ad.art;
    if (titleEl) titleEl.textContent = ad.title;
    if (subEl) subEl.textContent = ad.sub;
    if (descEl) descEl.textContent = ad.desc;

    if (callRow && callBtn) {
      if (ad.phone && ad.phone.trim()) {
        callRow.style.display = 'block';
        callBtn.href = `tel:${ad.phone.trim()}`;
        if (callText) callText.textContent = `വിളിക്കുക: ${ad.phone.trim()}`;
      } else {
        callRow.style.display = 'none';
      }
    }

    if (linkRow && linkBtn) {
      if (ad.link && ad.link.trim()) {
        linkRow.style.display = 'block';
        linkBtn.href = ad.link.trim();
      } else {
        linkRow.style.display = 'none';
      }
    }

    openModal('modal-ad-detail');
  }
  window.openAdDetailModal = openAdDetailModal;

  function shareAdDetail() {
    const ads = getActiveAdsList();
    const ad = ads[currentAdIndex] || ads[0];
    const text = `📢 *${ad.title}*\n${ad.sub}\n\n${ad.desc ? ad.desc.slice(0, 150) + '...' : ''}\n\n'നമ്മുടെ നാട്' ആപ്പിൽ കൂടുതൽ വിവരങ്ങൾ കാണാം.`;
    
    if (navigator.share) {
      navigator.share({ title: ad.title, text, url: window.location.href }).catch(() => {});
    } else {
      const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank');
    }
  }
  window.shareAdDetail = shareAdDetail;


  let isQuickRequestDismissed = false;
  let quickRequestAutoCloseTimer = null;
  function startQuickRequestAutoClose() {
    const card = document.getElementById('homeQuickRequestCard');
    if (!card) return;
    if (isQuickRequestDismissed) {
      card.style.display = 'none';
      return;
    }
    // Only count down when actively viewing the home screen
    if (APP_STATE.currentScreen !== 'home') return;
    // Don't restart countdown if already running
    if (quickRequestAutoCloseTimer) return;

    quickRequestAutoCloseTimer = setTimeout(() => {
      dismissQuickRequestCard();
    }, 4000);
  }

  function dismissQuickRequestCard() {
    const card = document.getElementById('homeQuickRequestCard');
    if (!card) return;
    isQuickRequestDismissed = true;
    if (quickRequestAutoCloseTimer) {
      clearTimeout(quickRequestAutoCloseTimer);
      quickRequestAutoCloseTimer = null;
    }
    card.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    card.style.maxHeight = (card.offsetHeight || 120) + 'px';
    card.style.overflow = 'hidden';
    
    requestAnimationFrame(() => {
      card.style.maxHeight = '0px';
      card.style.opacity = '0';
      card.style.margin = '0 16px 0';
      card.style.padding = '0 18px';
      card.style.transform = 'scale(0.96)';
    });

    setTimeout(() => {
      card.style.display = 'none';
    }, 550);
  }
  window.dismissQuickRequestCard = dismissQuickRequestCard;
  window.startQuickRequestAutoClose = startQuickRequestAutoClose;

  // ==============================================================
  // 17. INITIALIZATION ON DOM READY
  // ==============================================================
  function renderHomeScreen() {
    updateLocationDisplay(APP_STATE.location.name, APP_STATE.location.district, APP_STATE.location.lat, APP_STATE.location.lon, true);
    renderActiveServiceTracker();
    renderHomeVillageBanner();
    startQuickRequestAutoClose();
    if (typeof updateAdminUI === 'function') updateAdminUI();

    const homeHeaderAvatar = document.getElementById('homeHeaderAvatar');
    if (homeHeaderAvatar) {
      homeHeaderAvatar.src = APP_STATE.currentUser.avatar || DEFAULT_USER_AVATAR;
    }

    const homeList = document.getElementById('homeTopProvidersList');
    if (!homeList) return;

    const maxRadius = APP_STATE.activeRadiusKm || 5;

    // Calculate distances
    const list = [...(APP_STATE.services || [])];
    list.forEach(srv => {
      srv._calculatedDist = getItemDistanceKm(srv, APP_STATE.location.lat, APP_STATE.location.lon);
    });
    list.sort((a, b) => a._calculatedDist - b._calculatedDist);

    // Apply user's chosen radius filter strictly
    let inRadius = (maxRadius >= 1000) ? list : list.filter(srv => srv._calculatedDist <= maxRadius);

    const topProviders = inRadius.slice(0, 4);
    if (topProviders.length === 0) {
      const radiusLabel = (maxRadius >= 1000) ? '' : ` (${maxRadius} km)`;
      homeList.innerHTML = `
        <div style="text-align:center;padding:24px 14px;background:#F8FAFC;border-radius:14px;border:1px dashed #CBD5E1">
          <div style="font-size:24px;margin-bottom:4px">📍</div>
          <div style="font-weight:700;font-size:12.5px;color:#334155">ഈ പ്രദേശത്ത് സേവനദാതാക്കൾ ലഭ്യമല്ല</div>
          <div style="font-size:11px;color:#64748B;margin:3px 0 10px">${escapeHtml(APP_STATE.location.name)} പരിസരത്ത്${radiusLabel} സർവീസുകൾ കണ്ടെത്തിയില്ല.</div>
          <button onclick="openLocationModal()" style="padding:6px 14px;background:#0E7043;color:#fff;border:none;border-radius:8px;font-weight:700;font-size:11px;cursor:pointer">പരിധി മാറ്റുക / സ്ഥലം മാറ്റുക</button>
        </div>
      `;
      return;
    }

    homeList.innerHTML = topProviders.map(srv => {
      const isAvail = srv.availability !== 'busy';
      const availLabel = isAvail ? '🟢 ഇപ്പോൾ ലഭ്യമാണ്' : '🟡 ബുക്കിംഗ് അനുസരിച്ച്';
      const availClass = isAvail ? 'avail' : 'busy';

      return `
        <div class="home-top-provider-card" onclick="openServiceDetailModal('${srv.id}')" style="cursor:pointer">
          <div style="display:flex;justify-content:space-between;align-items:flex-start">
            <div style="display:flex;align-items:center;gap:12px">
              <img src="${srv.avatar}" alt="${srv.name}" class="service-prov-avatar" onerror="this.src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'">
              <div>
                <div style="display:flex;align-items:center;gap:6px">
                  <span style="font-weight:800;font-size:0.95rem;color:#0F172A">${srv.name}</span>
                  <span style="font-size:0.7rem;background:#ECFDF5;color:#059669;padding:2px 7px;border-radius:6px;font-weight:800">★ ${srv.rating}</span>
                </div>
                <div style="font-size:0.82rem;font-weight:700;color:#0F766E;margin-top:1px;display:flex;align-items:center;gap:6px">
                  <span class="service-mini-icon-badge">${srv.icon || '🛠️'}</span>
                  <span>${srv.trade}</span>
                </div>
                <div style="font-size:0.74rem;color:#64748B;margin-top:2px;display:flex;align-items:center;gap:5px">
                  <span>📍 ${srv.location}</span>
                  <span>•</span>
                  <span style="color:#059669;font-weight:800">${srv._calculatedDist} km അകലെ</span>
                </div>
              </div>
            </div>
            <span class="provider-live-pill ${availClass}">${availLabel}</span>
          </div>

          <div style="display:flex;flex-wrap:wrap;gap:6px;margin:2px 0">
            <span class="provider-fee-pill">💰 ${srv.visitingFee || '₹200 വിസിറ്റിംഗ് നിരക്ക്'}</span>
            ${(srv.specializations || []).slice(0, 2).map(s => `<span class="provider-spec-tag">${s}</span>`).join('')}
          </div>

          <!-- DIRECT ACTION: IN-APP CHAT ONLY -->
          <div class="service-actions-row" onclick="event.stopPropagation()">
            <button class="prov-btn-chat" onclick="openChatForService('${srv.id}')" title="ചാറ്റ്" style="flex:1;justify-content:center">
              <span>💬</span>
              <span>ചാറ്റ്</span>
            </button>
          </div>
        </div>
      `;
    }).join('');

    renderHomeCommunityFeed();
  }
  window.renderHomeScreen = renderHomeScreen;

  // ==============================================================
  // 17. IN-APP INSTANT AUTO-UPDATE ENGINE (ZERO MANUAL RE-INSTALL)
  // ==============================================================
  const APP_BUILD_INFO = {
    versionCode: 8,
    versionName: "1.0.8",
    buildDate: "2026-10-23"
  };
  window.APP_BUILD_INFO = APP_BUILD_INFO;

  // Global pending update payload
  window._PENDING_UPDATE_DATA = null;

  async function checkAppUpdates(silent = true) {
    try {
      // Version check endpoint: GitHub raw JSON (always live) or local fallback
      const endpoints = [
        'https://raw.githubusercontent.com/nammudenaadu0-creator/Nammude-naadu/main/version.json?t=' + Date.now(),
        'https://nammudenaadu0-creator.github.io/Nammude-naadu/version.json?t=' + Date.now(),
        './version.json?t=' + Date.now()
      ];

      let updateData = null;
      for (const url of endpoints) {
        try {
          const res = await fetch(url, { cache: 'no-store' });
          if (res.ok) {
            updateData = await res.json();
            if (updateData && updateData.versionCode) break;
          }
        } catch (_) {}
      }

      if (!updateData || !updateData.versionCode) {
        if (!silent) {
          showToast('അപ്‌ഡേറ്റ് വിവരങ്ങൾ ലഭ്യമായില്ല. ദയവായി ഇന്റർനെറ്റ് പരിശോധിക്കുക.');
        }
        return;
      }

      window._PENDING_UPDATE_DATA = updateData;

      // Update version badge in profile if element exists
      const profVer = document.getElementById('profCurrentAppVersion');
      if (profVer) {
        profVer.textContent = 'വേർഷൻ v' + APP_BUILD_INFO.versionName;
      }

      if (updateData.versionCode > APP_BUILD_INFO.versionCode) {
        // A newer version is available!
        const modal = document.getElementById('modal-app-update');
        if (modal) {
          const titleEl = document.getElementById('appUpdateTitle');
          if (titleEl) titleEl.textContent = updateData.title || 'പുതിയ അപ്‌ഡേറ്റ് ലഭ്യമാണ്!';

          const verPill = document.getElementById('appUpdateVersionPill');
          if (verPill) verPill.textContent = 'Version ' + (updateData.versionName || updateData.versionCode);

          const notesList = document.getElementById('appUpdateNotesList');
          if (notesList) {
            if (Array.isArray(updateData.releaseNotes)) {
              notesList.innerHTML = updateData.releaseNotes.map(n => `<div style="margin-bottom:6px;display:flex;align-items:flex-start;gap:6px"><span>•</span><span>${escapeHtml(n)}</span></div>`).join('');
            } else if (typeof updateData.releaseNotes === 'string') {
              notesList.innerHTML = escapeHtml(updateData.releaseNotes).replace(/\n/g, '<br>');
            } else {
              notesList.innerHTML = 'പുതിയ വേഗതയും ബഗ് പരിഹാരങ്ങളും ഉൾപ്പെടുത്തിയിരിക്കുന്നു.';
            }
          }

          openModal('modal-app-update');
        } else if (!silent) {
          showToast('പുതിയ അപ്‌ഡേറ്റ് ലഭ്യമാണ്: v' + updateData.versionName);
        }
      } else {
        // Already on latest
        if (!silent) {
          showToast('നിങ്ങൾ ഏറ്റവും പുതിയ വേർഷനാണ് ഉപയോഗിക്കുന്നത് (v' + APP_BUILD_INFO.versionName + ') ✅');
        }
      }
    } catch (e) {
      if (!silent) {
        showToast('അപ്‌ഡേറ്റ് ചെക്ക് ചെയ്യുന്നതിൽ തടസ്സമുണ്ടായി.');
      }
    }
  }
  window.checkAppUpdates = checkAppUpdates;

  function triggerAppUpdateDownload() {
    const data = window._PENDING_UPDATE_DATA || {};
    const apkUrl = data.apkUrl || 'https://github.com/nammudenaadu0-creator/Nammude-naadu/raw/main/NammudeNaadu.apk';

    showToast('ഡൗൺലോഡ് ആരംഭിക്കുന്നു... പുതിയ വേർഷൻ ഓവർറൈറ്റ് ചെയ്യാം 🚀');

    // Close update modal after 600ms
    setTimeout(() => {
      closeModal('modal-app-update');
    }, 600);

    // Direct download trigger
    try {
      const a = document.createElement('a');
      a.href = apkUrl;
      a.download = 'NammudeNaadu.apk';
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => document.body.removeChild(a), 1000);
    } catch (_) {
      window.open(apkUrl, '_blank');
    }
  }
  window.triggerAppUpdateDownload = triggerAppUpdateDownload;

  document.addEventListener('DOMContentLoaded', () => {
    try { localStorage.removeItem('nn_is_admin'); } catch (_) {}
    initData();
    if (typeof updateAdminUI === 'function') updateAdminUI();
    if (typeof updateUserAuthUI === 'function') updateUserAuthUI();
    updateChatBadgeCounter();
    renderHomeScreen();
    renderCommunityFeed();

    // Safe Back Button & Hardware Navigation Support
    let _lastBackActionTime = 0;
    let _lastExitPromptTime = 0;

    function handleAndroidHardwareBack() {
      const now = Date.now();
      // Debounce rapid double-triggers within 350ms
      if (now - _lastBackActionTime < 350) {
        return true;
      }
      _lastBackActionTime = now;

      // 1. Check for open modals (prioritizing chat modal)
      const openModals = Array.from(document.querySelectorAll('.modal-overlay.active, .modal-overlay[style*="display: flex"], .modal-overlay[style*="display:flex"]'))
        .filter(el => {
          try {
            const style = window.getComputedStyle(el);
            return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
          } catch (_) {
            return false;
          }
        });

      if (openModals.length > 0) {
        // If modal-chat is open, close it cleanly
        const chatModal = openModals.find(m => m.id === 'modal-chat');
        if (chatModal) {
          closeModal('modal-chat');
          return true;
        }
        // Otherwise close the topmost active modal
        const topModal = openModals[openModals.length - 1];
        if (topModal && topModal.id) {
          closeModal(topModal.id);
          return true;
        }
      }

      // 2. If no modal is open, check if on a sub-screen (like chat, community, services, jobs, rentals, blood, profile)
      if (APP_STATE.currentScreen && APP_STATE.currentScreen !== 'home') {
        if (APP_STATE.previousScreen && APP_STATE.previousScreen !== 'splash' && APP_STATE.previousScreen !== APP_STATE.currentScreen) {
          navTo(APP_STATE.previousScreen);
        } else {
          navTo('home');
        }
        return true;
      }

      // 3. If already on 'home' screen: Double-tap back within 2 seconds to exit app
      if (now - _lastExitPromptTime < 2000) {
        if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App) {
          try { window.Capacitor.Plugins.App.exitApp(); } catch (_) {}
        }
        return false; // allow Android activity to exit
      } else {
        _lastExitPromptTime = now;
        if (typeof toast === 'function') {
          toast('പുറത്തുകടക്കാൻ ഒരിക്കൽ കൂടി ബാക്ക് അമർത്തുക (Press back again to exit)');
        }
        return true; // handled, keep app open!
      }
    }
    window.handleAndroidHardwareBack = handleAndroidHardwareBack;

    window.addEventListener('popstate', () => {
      handleAndroidHardwareBack();
    });

    if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App) {
      window.Capacitor.Plugins.App.addListener('backButton', () => {
        handleAndroidHardwareBack();
      });
    }

    // Auto-prompt notification permission for real-time service enquiries & blood alerts
    setTimeout(() => {
      if (typeof requestNotificationPermission === 'function') {
        requestNotificationPermission();
      }
    }, 1200);

    // Auto-check for in-app updates after 3.5 seconds
    setTimeout(() => {
      checkAppUpdates(true);
    }, 3500);

    // Register service worker if available
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').catch(err => {
        console.info('[SW] Service Worker note:', err.message);
      });
    }

    // 3D Home Search Bar & Comprehensive Universal Search Engine
    function triggerHomeSearch() {
      const homeSearch = document.getElementById('homeSearchInput');
      const dropdown = document.getElementById('homeSearchResultsDropdown');
      if (dropdown) dropdown.style.display = 'none';
      if (!homeSearch) return;
      const q = homeSearch.value.trim();
      if (!q) {
        showToast('ദയവായി എന്തെങ്കിലും തിരയുക (Please type to search)');
        return;
      }
      const qLower = q.toLowerCase();

      // 1. Emergency keywords & numbers
      if (qLower.includes('അടിയന്തിര') || qLower.includes('emergency') || qLower.includes('പോലീസ്') || qLower.includes('ആംബുലൻസ്') || qLower.includes('police') || qLower.includes('ambulance') || qLower.includes('fire') || qLower.includes('ഫയർ') || qLower.includes('kseb') || qLower.includes('കരണ്ട്') || qLower.includes('വൈദ്യുതി') || qLower.includes('snake') || qLower.includes('പാമ്പ്') || qLower.includes('ഹെൽപ്പ്')) {
        openEmergencyModal();
        return;
      }

      // 2. Blood groups & donation
      const bloodGroups = ['a+', 'a-', 'b+', 'b-', 'o+', 'o-', 'ab+', 'ab-'];
      const matchedBg = bloodGroups.find(bg => qLower === bg || qLower === bg.replace('+', ' positive') || qLower === bg.replace('-', ' negative') || qLower.includes(bg));
      if (matchedBg) {
        filterBloodGroup(matchedBg.toUpperCase());
        navTo('blood');
        return;
      }
      if (qLower.includes('രക്ത') || qLower.includes('blood') || qLower.includes('donor') || qLower.includes('ദാതാവ്')) {
        openBloodModal();
        return;
      }

      // 3. Rentals & Real Estate
      if (qLower.includes('വാടക') || qLower.includes('rent') || qLower.includes('room') || qLower.includes('വീട്') || qLower.includes('ഷോപ്പ്') || qLower.includes('hostel') || qLower.includes('ഹോസ്റ്റൽ') || qLower.includes('ഫ്ലാറ്റ്') || qLower.includes('സ്ഥലം') || qLower.includes('ഭൂമി')) {
        navTo('rentals');
        const rInput = document.getElementById('rentalSearchInput');
        if (rInput) {
          rInput.value = q;
          renderRentalsScreen();
        }
        return;
      }

      // 4. Jobs & Vacancies
      if (qLower.includes('തൊഴിൽ') || qLower.includes('job') || qLower.includes('vacancy') || qLower.includes('ജോലി') || qLower.includes('വേക്കൻസി') || qLower.includes('റിക്രൂട്ട്') || qLower.includes('സ്റ്റാഫ്')) {
        navTo('jobs');
        const jInput = document.getElementById('jobSearchInput');
        if (jInput) {
          jInput.value = q;
          renderJobsScreen();
        }
        return;
      }

      // 5. Nearby Places & Public Utilities
      if (qLower.includes('പെട്രോൾ') || qLower.includes('petrol') || qLower.includes('atm') || qLower.includes('ബാങ്ക്') || qLower.includes('bank') || qLower.includes('പഞ്ചായത്ത്') || qLower.includes('panchayath') || qLower.includes('അക്ഷയ') || qLower.includes('akshaya') || qLower.includes('വില്ലേജ്') || qLower.includes('village') || qLower.includes('ഹോട്ടൽ') || qLower.includes('hotel')) {
        APP_STATE.nearbySearchQuery = q;
        navTo('nearby');
        const nInput = document.getElementById('nearbySearchInput');
        if (nInput) nInput.value = q;
        renderNearbyScreen();
        return;
      }

      // 6. Community / News
      if (qLower.includes('വാർത്ത') || qLower.includes('പോസ്റ്റ്') || qLower.includes('വിശേഷം') || qLower.includes('news') || qLower.includes('post') || qLower.includes('അറിയിപ്പ്')) {
        navTo('community');
        return;
      }

      // 7. Check 500+ Trades Catalog
      if (window.TRADES_CATALOG_500 && window.TRADES_CATALOG_500.length) {
        const matchedTrade = window.TRADES_CATALOG_500.find(t => 
          (t.name && t.name.toLowerCase().includes(qLower)) || 
          (t.en && t.en.toLowerCase().includes(qLower)) ||
          (t.specs && t.specs.some(s => s.toLowerCase().includes(qLower)))
        );
        if (matchedTrade) {
          APP_STATE.activeServiceCategory = matchedTrade.category || 'all';
          navTo('services');
          const sInput = document.getElementById('serviceSearchInput');
          if (sInput) {
            sInput.value = matchedTrade.name;
            renderServicesScreen();
          }
          return;
        }
      }

      // 8. Default to Services screen with query
      navTo('services');
      const sInput = document.getElementById('serviceSearchInput');
      if (sInput) {
        sInput.value = q;
        renderServicesScreen();
      }
    }
    window.triggerHomeSearch = triggerHomeSearch;

    function triggerDesktopSearch() {
      const dInput = document.getElementById('desktopSearchInput');
      if (!dInput) return;
      const q = dInput.value.trim();
      if (!q) return;
      const hInput = document.getElementById('homeSearchInput');
      if (hInput) hInput.value = q;
      navTo('home');
      triggerHomeSearch();
    }
    window.triggerDesktopSearch = triggerDesktopSearch;

    const homeSearch = document.getElementById('homeSearchInput');
    const homeDropdown = document.getElementById('homeSearchResultsDropdown');

    if (homeSearch && homeDropdown) {
      homeSearch.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          triggerHomeSearch();
        }
      });

      homeSearch.addEventListener('input', () => {
        const query = homeSearch.value.trim().toLowerCase();
        if (!query) {
          homeDropdown.style.display = 'none';
          homeDropdown.innerHTML = '';
          return;
        }

        const matches = [];

        // 1. Emergency Helplines & Numbers
        const emergencyList = [
          { name: 'പോലീസ് എമർജൻസി (Police)', phone: '112', icon: '🚨', cat: 'police' },
          { name: 'ആംബുലൻസ് (Ambulance 108)', phone: '108', icon: '🚑', cat: 'ambulance' },
          { name: 'ഫയർ ഫോഴ്സ് (Fire Force 101)', phone: '101', icon: '🚒', cat: 'fire' },
          { name: 'കെ.എസ്.ഇ.ബി ഇലക്ട്രിസിറ്റി (KSEB)', phone: '1912', icon: '⚡', cat: 'kseb' },
          { name: 'വനിതാ ഹെൽപ്പ്‌ലൈൻ (Women Helpline)', phone: '1091', icon: '👩', cat: 'women' },
          { name: 'ചൈൽഡ്‌ലൈൻ (Childline)', phone: '1098', icon: '👶', cat: 'child' },
          { name: 'SARPA പാമ്പ് റെസ്ക്യൂ (Forest Dept)', phone: '18004254733', icon: '🐍', cat: 'snake' }
        ];

        emergencyList.forEach(em => {
          if (matches.length >= 12) return;
          if (em.name.toLowerCase().includes(query) || em.cat.includes(query) || em.phone.includes(query) ||
              ('അടിയന്തിരം emergency സഹായം പോലീസ് ambulance fire kseb കരണ്ട്'.includes(query) && query.length >= 3)) {
            matches.push({
              icon: em.icon,
              title: em.name,
              sub: `അടിയന്തിര നമ്പർ: ${em.phone}`,
              badge: 'അടിയന്തിരം',
              badgeCls: 'badge-emergency',
              action: () => {
                window.location.href = `tel:${em.phone}`;
              }
            });
          }
        });

        // Check custom emergency contacts
        (APP_STATE.emergencyContacts || []).forEach(ec => {
          if (matches.length >= 12) return;
          if ((ec.name && ec.name.toLowerCase().includes(query)) ||
              (ec.category && ec.category.toLowerCase().includes(query)) ||
              (ec.phone && ec.phone.includes(query))) {
            matches.push({
              icon: '🚨',
              title: ec.name,
              sub: `${ec.category || 'അടിയന്തിര സഹായം'} • ${ec.phone || ''}`,
              badge: 'അടിയന്തിരം',
              badgeCls: 'badge-emergency',
              action: () => {
                if (ec.phone) window.location.href = `tel:${ec.phone}`;
                else openEmergencyModal();
              }
            });
          }
        });

        // 2. Blood Groups & Donors
        const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
        const matchedBg = bloodGroups.find(bg => query === bg.toLowerCase() || query === bg.toLowerCase().replace('+', ' positive') || query === bg.toLowerCase().replace('-', ' negative') || query === (bg.toLowerCase() + ' blood'));
        if (matchedBg) {
          matches.push({
            icon: '🩸',
            title: `${matchedBg} രക്തദാതാക്കൾ (${matchedBg} Blood Donors)`,
            sub: `${matchedBg} രക്തഗ്രൂപ്പിലുള്ള നാട്ടുകാരെ കാണുക`,
            badge: 'രക്തം',
            badgeCls: 'badge-blood',
            action: () => {
              filterBloodGroup(matchedBg);
              navTo('blood');
            }
          });
        } else if ('രക്തദാനം blood donation donor രക്തം ദാതാവ്'.includes(query)) {
          matches.push({
            icon: '🩸',
            title: 'രക്തദാനം (Blood Donor Directory)',
            sub: 'അടിയന്തിര രക്തദാതാക്കളെ കണ്ടെത്തുക',
            badge: 'രക്തം',
            badgeCls: 'badge-blood',
            action: () => openBloodModal()
          });
        }

        // Search in registered blood donors
        (APP_STATE.bloodDonors || []).forEach(d => {
          if (matches.length >= 12) return;
          if ((d.name && d.name.toLowerCase().includes(query)) ||
              (d.group && d.group.toLowerCase() === query) ||
              (d.location && d.location.toLowerCase().includes(query))) {
            matches.push({
              icon: '🩸',
              title: `${d.name || 'രക്തദാതാവ്'} (${d.group || 'O+'})`,
              sub: `📍 ${resolveItemLocation(d) || APP_STATE.location.name}`,
              badge: 'രക്തദാതാവ്',
              badgeCls: 'badge-blood',
              action: () => {
                filterBloodGroup(d.group || 'all');
                navTo('blood');
              }
            });
          }
        });

        // 3. 500+ Local Trades & Services Catalog (window.TRADES_CATALOG_500)
        if (window.TRADES_CATALOG_500 && Array.isArray(window.TRADES_CATALOG_500)) {
          let tradeCount = 0;
          for (const tr of window.TRADES_CATALOG_500) {
            if (matches.length >= 12 || tradeCount >= 4) break;
            const nameMatch = tr.name && tr.name.toLowerCase().includes(query);
            const enMatch = tr.en && tr.en.toLowerCase().includes(query);
            const specMatch = tr.specs && tr.specs.some(s => s.toLowerCase().includes(query));
            if (nameMatch || enMatch || specMatch) {
              tradeCount++;
              matches.push({
                icon: tr.icon || '🛠️',
                title: `${tr.name}${tr.en ? ' (' + tr.en + ')' : ''}`,
                sub: tr.specs ? tr.specs.slice(0, 3).join(', ') : 'പ്രാദേശിക സേവനം',
                badge: 'തൊഴിൽ സേവനം',
                badgeCls: 'badge-trade',
                action: () => {
                  APP_STATE.activeServiceCategory = tr.category || 'all';
                  navTo('services');
                  const sInput = document.getElementById('serviceSearchInput');
                  if (sInput) {
                    sInput.value = tr.name;
                    renderServicesScreen();
                  }
                }
              });
            }
          }
        }

        // 4. Service Categories
        SERVICE_CATEGORIES.forEach(cat => {
          if (matches.length >= 12) return;
          if (cat.id !== 'all' && (cat.name.toLowerCase().includes(query) || cat.id.toLowerCase().includes(query))) {
            matches.push({
              icon: cat.icon || '🛠️',
              title: cat.name,
              sub: 'പ്രാദേശിക സേവന വിഭാഗം',
              badge: 'സേവനം',
              badgeCls: 'badge-service',
              action: () => filterServiceAndOpen(cat.id)
            });
          }
        });

        // 5. Registered Local Services (APP_STATE.services)
        (APP_STATE.services || []).forEach(s => {
          if (matches.length >= 12) return;
          if ((s.title && s.title.toLowerCase().includes(query)) ||
              (s.name && s.name.toLowerCase().includes(query)) ||
              (s.trade && s.trade.toLowerCase().includes(query)) ||
              (s.location && s.location.toLowerCase().includes(query))) {
            matches.push({
              icon: '🛠️',
              title: s.name,
              sub: `${s.trade || 'സേവനം'} • 📍 ${resolveItemLocation(s) || ''}`,
              badge: 'സേവനം',
              badgeCls: 'badge-service',
              action: () => {
                if (typeof openServiceDetailModal === 'function' && s.id) {
                  openServiceDetailModal(s.id);
                } else {
                  navTo('services');
                  const sInput = document.getElementById('serviceSearchInput');
                  if (sInput) {
                    sInput.value = s.trade || s.name;
                    renderServicesScreen();
                  }
                }
              }
            });
          }
        });

        // 6. Jobs listings (APP_STATE.jobs)
        (APP_STATE.jobs || []).forEach(j => {
          if (matches.length >= 12) return;
          if ((j.title && j.title.toLowerCase().includes(query)) ||
              (j.employer && j.employer.toLowerCase().includes(query)) ||
              (j.description && j.description.toLowerCase().includes(query)) ||
              (j.location && j.location.toLowerCase().includes(query))) {
            matches.push({
              icon: '💼',
              title: j.title,
              sub: `${j.employer || 'സ്ഥാപനം'} • 📍 ${resolveItemLocation(j) || ''}${j.salary ? ' • ₹' + j.salary : ''}`,
              badge: 'തൊഴിൽ',
              badgeCls: 'badge-job',
              action: () => {
                navTo('jobs');
                const jInput = document.getElementById('jobSearchInput');
                if (jInput) {
                  jInput.value = j.title;
                  renderJobsScreen();
                }
              }
            });
          }
        });

        // 7. Rentals listings (APP_STATE.rentals)
        (APP_STATE.rentals || []).forEach(r => {
          if (matches.length >= 12) return;
          if ((r.title && r.title.toLowerCase().includes(query)) ||
              (r.type && r.type.toLowerCase().includes(query)) ||
              (r.owner && r.owner.toLowerCase().includes(query)) ||
              (r.description && r.description.toLowerCase().includes(query)) ||
              (r.location && r.location.toLowerCase().includes(query))) {
            matches.push({
              icon: '🏠',
              title: r.title,
              sub: `${r.type || 'വാടക'}${r.rate ? ' • ₹' + r.rate : ''} • 📍 ${resolveItemLocation(r) || ''}`,
              badge: 'വാടക',
              badgeCls: 'badge-rental',
              action: () => {
                navTo('rentals');
                const rInput = document.getElementById('rentalSearchInput');
                if (rInput) {
                  rInput.value = r.title;
                  renderRentalsScreen();
                }
              }
            });
          }
        });

        // 8. Nearby Public Places & Facilities
        const nearbyKeywords = ['പെട്രോൾ', 'petrol', 'atm', 'ബാങ്ക്', 'bank', 'മെഡിക്കൽ', 'pharmacy', 'റേഷൻ', 'ration', 'അക്ഷയ', 'akshaya', 'പഞ്ചായത്ത്', 'panchayath', 'വില്ലേജ്', 'village', 'ഹോട്ടൽ', 'hotel', 'ബസ്', 'bus'];
        if (nearbyKeywords.some(kw => query.includes(kw))) {
          matches.push({
            icon: '📍',
            title: `സമീപസ്ഥലങ്ങൾ: '${homeSearch.value}'`,
            sub: `${APP_STATE.location.name} പരിസരത്തെ സൗകര്യങ്ങൾ കാണുക`,
            badge: 'സമീപം',
            badgeCls: 'badge-nearby',
            action: () => {
              APP_STATE.nearbySearchQuery = homeSearch.value.trim();
              navTo('nearby');
              const nInput = document.getElementById('nearbySearchInput');
              if (nInput) nInput.value = homeSearch.value.trim();
              renderNearbyScreen();
            }
          });
        }

        // 9. Community Posts & News (APP_STATE.posts)
        (APP_STATE.posts || []).forEach(p => {
          if (matches.length >= 12) return;
          if ((p.content && p.content.toLowerCase().includes(query)) ||
              (p.authorName && p.authorName.toLowerCase().includes(query))) {
            const shortText = (p.content || '').substring(0, 35) + '...';
            matches.push({
              icon: '📢',
              title: shortText,
              sub: `${p.authorName || 'നാട്ടുകാരൻ'} • നാട്ടുവിശേഷങ്ങൾ`,
              badge: 'നാട്ടുവാർത്ത',
              badgeCls: 'badge-post',
              action: () => {
                navTo('community');
              }
            });
          }
        });

        if (matches.length === 0) {
          homeDropdown.innerHTML = `
            <div style="padding:14px;text-align:center;color:#64748B;font-size:0.86rem">
              ഫലങ്ങളൊന്നും കണ്ടെത്തിയില്ല.<br>
              <div style="margin-top:10px;display:flex;gap:6px;justify-content:center;flex-wrap:wrap">
                <button onclick="navTo('services'); const s=document.getElementById('serviceSearchInput'); if(s) {s.value='${escapeHtml(homeSearch.value)}'; renderServicesScreen();}" style="padding:6px 12px;background:#ECFDF5;color:#0E7043;border:1px solid #A7F3D0;border-radius:10px;font-size:0.78rem;font-weight:700;cursor:pointer">
                  🛠️ സർവീസിൽ തിരയുക
                </button>
                <button onclick="navTo('jobs'); const j=document.getElementById('jobSearchInput'); if(j) {j.value='${escapeHtml(homeSearch.value)}'; renderJobsScreen();}" style="padding:6px 12px;background:#FEF3C7;color:#92400E;border:1px solid #FDE68A;border-radius:10px;font-size:0.78rem;font-weight:700;cursor:pointer">
                  💼 തൊഴിലിൽ തിരയുക
                </button>
                <button onclick="navTo('rentals'); const r=document.getElementById('rentalSearchInput'); if(r) {r.value='${escapeHtml(homeSearch.value)}'; renderRentalsScreen();}" style="padding:6px 12px;background:#E0E7FF;color:#3730A3;border:1px solid #C7D2FE;border-radius:10px;font-size:0.78rem;font-weight:700;cursor:pointer">
                  🏠 വാടകയിൽ തിരയുക
                </button>
              </div>
            </div>
          `;
        } else {
          homeDropdown.innerHTML = matches.slice(0, 8).map((m, idx) => `
            <div class="search-drop-item" data-idx="${idx}">
              <div class="search-drop-left">
                <div class="search-drop-icon">${m.icon}</div>
                <div class="search-drop-info">
                  <div class="search-drop-title">${escapeHtml(m.title)}</div>
                  <div class="search-drop-sub">${escapeHtml(m.sub)}</div>
                </div>
              </div>
              <span class="search-drop-badge ${m.badgeCls}">${m.badge}</span>
            </div>
          `).join('');

          // Bind item clicks
          homeDropdown.querySelectorAll('.search-drop-item').forEach(el => {
            el.addEventListener('click', () => {
              const idx = parseInt(el.getAttribute('data-idx'));
              const target = matches[idx];
              if (target && target.action) {
                homeDropdown.style.display = 'none';
                target.action();
              }
            });
          });
        }

        homeDropdown.style.display = 'block';
      });

      // Close dropdown when tapping elsewhere
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.home-3d-search-container')) {
          homeDropdown.style.display = 'none';
        }
      });
    }

    // Bind services search
    const servSearch = document.getElementById('serviceSearchInput');
    if (servSearch) {
      servSearch.addEventListener('input', () => {
        renderServicesScreen();
      });
    }

    // Bind jobs search
    const jobSearch = document.getElementById('jobSearchInput');
    if (jobSearch) {
      jobSearch.addEventListener('input', () => {
        renderJobsScreen();
      });
    }

    // Bind rentals search
    const rentalSearch = document.getElementById('rentalSearchInput');
    if (rentalSearch) {
      rentalSearch.addEventListener('input', () => {
        renderRentalsScreen();
      });
    }

    // Background cloud profile sync on boot
    setTimeout(async () => {
      try {
        if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.fetchUserProfile === 'function') {
          const phone = APP_STATE.currentUser && APP_STATE.currentUser.phone;
          if (phone) {
            const cloud = await window.NN_SUPABASE_SERVICES.fetchUserProfile(phone);
            if (cloud) {
              let changed = false;
              if (cloud.name && cloud.name !== APP_STATE.currentUser.name) {
                APP_STATE.currentUser.name = cloud.name;
                localStorage.setItem('nn_user_name', cloud.name);
                changed = true;
              }
              if (cloud.avatar && cloud.avatar !== APP_STATE.currentUser.avatar) {
                APP_STATE.currentUser.avatar = cloud.avatar;
                localStorage.setItem('nn_user_avatar', cloud.avatar);
                changed = true;
              }
              if (cloud.blood_group) {
                APP_STATE.currentUser.bloodGroup = cloud.blood_group;
                localStorage.setItem('nn_user_blood', cloud.blood_group);
                changed = true;
              }
              if (cloud.place) {
                APP_STATE.currentUser.location = cloud.place;
                localStorage.setItem('nn_user_loc', cloud.place);
                changed = true;
              }
              if (changed) {
                renderProfileScreen();
                updatePostingProfileBar();
                renderHomeScreen();
                if (typeof updateUserAuthUI === 'function') updateUserAuthUI();
                if (typeof renderCommunityFeed === 'function') renderCommunityFeed();
                if (typeof renderHomeCommunityFeed === 'function') renderHomeCommunityFeed();
              }
            }
          }
        }
      } catch (_) {}
    }, 1500);

    // High-speed real-time sync (every 3s) for Community Posts and Chats when visible
    setInterval(() => {
      try {
        if (typeof document !== 'undefined' && !document.hidden && typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES) {
          if (APP_STATE.currentScreen === 'community' || APP_STATE.currentScreen === 'home') {
            if (typeof window.NN_SUPABASE_SERVICES.syncPosts === 'function') {
              window.NN_SUPABASE_SERVICES.syncPosts();
            }
          }
          if (APP_STATE.currentScreen === 'chat') {
            if (typeof window.NN_SUPABASE_SERVICES.syncUserChats === 'function') {
              window.NN_SUPABASE_SERVICES.syncUserChats();
            }
          }
        }
      } catch (_) {}
    }, 3000);

  });

})();
