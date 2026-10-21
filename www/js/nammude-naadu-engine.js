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
  // Clean Default Kerala Citizen Avatar (SVG gradient)
  // Clean Default Kerala Citizen Avatar (SVG gradient)
  const DEFAULT_USER_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'%3E%3Cdefs%3E%3ClinearGradient id='avatarGrad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%2310B981'/%3E%3Cstop offset='100%25' stop-color='%23047857'/%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='64' cy='64' r='64' fill='url(%23avatarGrad)'/%3E%3Ccircle cx='64' cy='48' r='24' fill='%23ffffff'/%3E%3Cpath d='M24 108c0-22.1 17.9-40 40-40s40 17.9 40 40v4H24v-4z' fill='%23ffffff'/%3E%3C/svg%3E";
  window.DEFAULT_USER_AVATAR = DEFAULT_USER_AVATAR;

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

  let savedUserPhone = localStorage.getItem('nn_user_phone') || '';
  if (savedUserPhone === '+91 94471 98765') {
    savedUserPhone = '';
    try { localStorage.removeItem('nn_user_phone'); } catch (_) {}
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
  function generateUserIdFromPhone(rawPhone) {
    if (!rawPhone) return null;
    const digits = String(rawPhone).replace(/\D/g, '').slice(-10);
    return (digits && digits.length >= 10) ? ('usr_' + digits) : null;
  }
  window.generateUserIdFromPhone = generateUserIdFromPhone;
  const phoneBasedId = generateUserIdFromPhone(savedUserPhone);
  if (phoneBasedId && !localStorage.getItem('nn_user_id')) {
    try { localStorage.setItem('nn_user_id', phoneBasedId.replace('usr_', '')); } catch (_) {}
  }
  const APP_STATE = {
    currentScreen: 'splash',
    previousScreen: 'home',
    currentUser: {
      id: phoneBasedId || (localStorage.getItem('nn_user_id') ? ('usr_' + localStorage.getItem('nn_user_id')) : ('usr_me_' + Math.random().toString(36).substring(2, 9))),
      name: savedUserName || 'നാട്ടുകാരൻ',
      phone: savedUserPhone || '',
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
    emergencyContacts: []
  };

  // Expose APP_STATE globally for Firebase cloud synchronization
  window.APP_STATE = APP_STATE;

  // Save user ID permanently
  if (!localStorage.getItem('nn_user_id')) {
    localStorage.setItem('nn_user_id', APP_STATE.currentUser.id.replace('usr_me_', ''));
  }

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
      (typeof APP_STATE !== 'undefined' && APP_STATE.currentUser && item.phone && item.phone === APP_STATE.currentUser.phone);

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
          if (typeof window.NN_SUPABASE_SERVICES.syncPosts === 'function') window.NN_SUPABASE_SERVICES.syncPosts();
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
          APP_STATE.chats[k] = APP_STATE.chats[k].filter(m => !m.id || !String(m.id).startsWith('msg_ctx_'));
        }
      });
      try {
        localStorage.setItem('nn_chats_store', JSON.stringify(APP_STATE.chats));
        localStorage.setItem('nn_chats_meta', JSON.stringify(APP_STATE.chatMeta));
      } catch (_) {}

      const storedServiceReqs = localStorage.getItem('nn_service_requests');
      APP_STATE.serviceRequests = storedServiceReqs ? JSON.parse(storedServiceReqs) : [];

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
      localStorage.setItem('nn_posts', JSON.stringify(APP_STATE.posts));
    } catch (_) {}
  }
  window.savePosts = savePosts;

  function saveServices() {
    try {
      localStorage.setItem('nn_services', JSON.stringify(APP_STATE.services));
    } catch (_) {}
  }
  window.saveServices = saveServices;

  function saveChats() {
    try {
      localStorage.setItem('nn_chats_store', JSON.stringify(APP_STATE.chats));
      if (APP_STATE.chatMeta) {
        localStorage.setItem('nn_chats_meta', JSON.stringify(APP_STATE.chatMeta));
      }
    } catch (_) {}
    if (typeof updateChatBadgeCounter === 'function') {
      updateChatBadgeCounter();
    }
  }

  function updateChatBadgeCounter() {
    const keys = Object.keys(APP_STATE.chats || {}).filter(k => APP_STATE.chats[k] && APP_STATE.chats[k].length > 0);
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
  // 5. NAVIGATION & SCREEN SWITCHING ENGINE (Globally Exposed)
  // ==============================================================
  function navTo(screenId) {
    if (!screenId) return;
    APP_STATE.previousScreen = APP_STATE.currentScreen;
    APP_STATE.currentScreen = screenId;

    // Toggle screen DOM classes
    document.querySelectorAll('.screen').forEach(el => {
      el.classList.remove('active');
    });

    const target = document.getElementById('screen-' + screenId);
    if (target) {
      target.classList.add('active');
    }

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

    // Screen specific triggers
    if (screenId === 'home') {
      renderHomeScreen();
    } else if (screenId === 'nearby') {
      renderNearbyScreen();
    } else if (screenId === 'community') {
      renderCommunityFeed();
      if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.syncPosts === 'function') {
        window.NN_SUPABASE_SERVICES.syncPosts();
      }
    } else if (screenId === 'services') {
      renderServicesScreen();
    } else if (screenId === 'jobs') {
      renderJobsScreen();
      if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.syncJobs === 'function') {
        window.NN_SUPABASE_SERVICES.syncJobs();
      }
    } else if (screenId === 'rentals') {
      renderRentalsScreen();
      if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.syncRentals === 'function') {
        window.NN_SUPABASE_SERVICES.syncRentals();
      }
    } else if (screenId === 'blood') {
      renderBloodScreen();
    } else if (screenId === 'add') {
      updatePostingProfileBar();
    } else if (screenId === 'chat') {
      renderChatListScreen();
      if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.syncUserChats === 'function') {
        window.NN_SUPABASE_SERVICES.syncUserChats();
      }
    } else if (screenId === 'profile') {
      renderProfileScreen();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      splash.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      splash.style.opacity = '0';
      splash.style.transform = 'scale(0.98)';
      setTimeout(() => {
        splash.classList.remove('active');
        splash.style.opacity = '';
        splash.style.transform = '';
        navTo('home');

        // PROMPT ONBOARDING PROFILE SETUP: If user hasn't completed their profile yet (especially name, phone & blood group)
        const profileDone = localStorage.getItem('nn_profile_completed');
        const userPhone = APP_STATE.currentUser.phone ? APP_STATE.currentUser.phone.replace(/\D/g, '') : '';
        const isDefaultName = !APP_STATE.currentUser.name || APP_STATE.currentUser.name === 'നാട്ടുകാരൻ';
        if (!profileDone || !userPhone || isDefaultName) {
          setTimeout(() => {
            openEditProfileModal(true);
          }, 350);
        }

        // Auto-detect GPS non-blockingly upon first launch ONLY if no saved location exists
        const hasSavedLoc = localStorage.getItem('nn_curr_loc_name');
        if (!hasSavedLoc || hasSavedLoc === 'തത്സമയ ലൊക്കേഷൻ') {
          setTimeout(() => detectLiveGpsLocation(false), 800);
        }
      }, 300);
    } else {
      navTo('home');
      const profileDone = localStorage.getItem('nn_profile_completed');
      const userPhone = APP_STATE.currentUser.phone ? APP_STATE.currentUser.phone.replace(/\D/g, '') : '';
      const isDefaultName = !APP_STATE.currentUser.name || APP_STATE.currentUser.name === 'നാട്ടുകാരൻ';
      if (!profileDone || !userPhone || isDefaultName) {
        setTimeout(() => {
          openEditProfileModal(true);
        }, 350);
      }
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

  function renderPresetLocationsList(itemsToRender = null) {
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

  function handlePostPhotoUpload(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (evt) {
      // Compress with canvas
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement('canvas');
        const maxW = 900;
        const maxH = 900;
        let w = img.width;
        let h = img.height;
        if (w > maxW || h > maxH) {
          if (w > h) {
            h = Math.round((h * maxW) / w);
            w = maxW;
          } else {
            w = Math.round((w * maxH) / h);
            h = maxH;
          }
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        pendingPostPhotoBase64 = canvas.toDataURL('image/jpeg', 0.8);

        const previewBox = document.getElementById('mediaPreviewBox');
        const previewImg = document.getElementById('mediaPreviewImg');
        if (previewBox && previewImg) {
          previewImg.src = pendingPostPhotoBase64;
          previewBox.style.display = 'block';
        }
      };
      img.src = evt.target.result;
    };
    reader.readAsDataURL(file);
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

    const reader = new FileReader();
    reader.onload = function(evt) {
      const img = new Image();
      img.onload = function() {
        const canvas = document.createElement('canvas');
        const maxDim = 800;
        let w = img.width;
        let h = img.height;
        if (w > h && w > maxDim) {
          h = Math.round((h * maxDim) / w);
          w = maxDim;
        } else if (h > maxDim) {
          w = Math.round((w * maxDim) / h);
          h = maxDim;
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.75);

        APP_STATE.tempEditPostImage = compressedBase64;
        const previewImg = document.getElementById('editPostPhotoPreviewImg');
        const previewWrap = document.getElementById('editPostPhotoPreviewWrap');
        const placeholder = document.getElementById('editPostPhotoPlaceholder');
        if (previewImg) previewImg.src = compressedBase64;
        if (previewWrap) previewWrap.style.display = 'block';
        if (placeholder) placeholder.style.display = 'none';
      };
      img.src = evt.target.result;
    };
    reader.readAsDataURL(file);
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
    const authorNameSafe = (post.authorName || 'നാട്ടുകാരൻ').replace(/'/g, "\\'").replace(/"/g, '&quot;');
    const timeFormatted = formatMalayalamTime(post.timestamp || post.createdAt);
    const locationSafe = post.authorLocation || post.locationName || 'കേരളം';
    const avatarSafe = post.authorAvatar || window.DEFAULT_USER_AVATAR || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80';

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
            <img src="${post.image}" alt="Post attachment" class="fb-post-image" loading="lazy" style="width:100%;border-radius:10px;max-height:240px;object-fit:cover;display:block" onerror="this.parentElement.style.display='none'">
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

  // ==============================================================
  // 9. DEDICATED USER PROFILE PREVIEW MODAL
  // ==============================================================
  function openAuthorProfile(nameEnc, phoneEnc, avatarEnc, locEnc, bloodEnc, authorId) {
    const name = decodeURIComponent(nameEnc);
    const phone = decodeURIComponent(phoneEnc);
    const avatar = decodeURIComponent(avatarEnc);
    const loc = decodeURIComponent(locEnc);
    const blood = decodeURIComponent(bloodEnc);

    const sheet = document.getElementById('authorProfileSheetContent');
    if (!sheet) return;

    // Filter all posts published by this specific author
    const authorPosts = APP_STATE.posts.filter(p => p.authorId === authorId || p.authorName === name);

    sheet.innerHTML = `
      <div class="profile-preview-hero">
        <button onclick="closeModal('modal-author-profile')" style="position:absolute;top:16px;right:16px;background:rgba(255,255,255,0.25);border:none;color:#fff;width:32px;height:32px;border-radius:50%;cursor:pointer;font-size:16px">✕</button>
        <img src="${avatar}" alt="${name}" class="profile-preview-avatar">
        <div class="profile-preview-name">${name}</div>
        <div style="font-size:13px;opacity:0.9">📍 ${loc}</div>
        <div class="profile-preview-badges">
          <span class="profile-badge">🩸 രക്തഗ്രൂപ്പ്: ${blood}</span>
          <span class="profile-badge">തദ്ദേശവാസി (Verified)</span>
        </div>
      </div>

      <div class="profile-preview-actions" style="grid-template-columns:1fr">
        <button onclick="closeModal('modal-author-profile'); openChatModal('${name.replace(/'/g, "\\'")}', '${phone}', '${avatar}', 'ഹലോ ${name.replace(/'/g, "\\'")}', '${authorId}')" class="profile-action-cta chat" style="width:100%;justify-content:center">
          <span>💬</span>
          <span>ആപ്പ് വഴി ചാറ്റ് ചെയ്യാം</span>
        </button>
      </div>

      <div style="padding:16px 20px">
        <h4 style="margin:0 0 12px;font-size:15px;color:#111827">ഇവരുടെ പോസ്റ്റുകൾ (${authorPosts.length})</h4>
        <div style="display:flex;flex-direction:column;gap:10px">
          ${authorPosts.length === 0 ? `
            <div style="text-align:center;padding:20px;color:#6B7280;font-size:13px">ഇതുവരെ പോസ്റ്റുകളൊന്നും പബ്ലിഷ് ചെയ്തിട്ടില്ല.</div>
          ` : authorPosts.map(p => `
            <div style="background:#F9FAFB;padding:12px;border-radius:12px;border:1px solid #E5E7EB">
              <div style="font-size:11px;color:#6B7280;margin-bottom:4px">${p.timestamp} • 📍 ${p.authorLocation}</div>
              <div style="font-size:13px;color:#111827">${p.content}</div>
              ${p.image ? `<img src="${p.image}" style="width:100%;max-height:160px;object-fit:cover;border-radius:8px;margin-top:8px">` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;

    openModal('modal-author-profile');
  }
  window.openAuthorProfile = openAuthorProfile;

  // ==============================================================
  // 10. REALTIME 1-ON-1 IN-APP CLOUD CHAT ENGINE (SUPABASE REALTIME)
  // ==============================================================
  function normalizePhone(p) {
    if (!p) return '';
    const digits = String(p).replace(/\D/g, '');
    return digits.length >= 10 ? digits.slice(-10) : digits;
  }
  window.normalizePhone = normalizePhone;

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
    navTo('chat');
  }
  window.goToAllChatsInbox = goToAllChatsInbox;

  function openChatModal(recipientName, recipientPhone, recipientAvatar, initialContext, recipientId, explicitChatKey, chatType) {
    const safeName = recipientName || 'പ്രാദേശിക സുഹൃത്ത്';
    const safePhone = recipientPhone || '';
    const safeAvatar = recipientAvatar || DEFAULT_USER_AVATAR;

    // Use explicit chat key if passed directly from chat list, or compute symmetric key
    const chatKey = explicitChatKey || computeChatKey(
      APP_STATE.currentUser.id,
      APP_STATE.currentUser.phone,
      APP_STATE.currentUser.name,
      recipientId,
      safePhone,
      safeName
    );

    APP_STATE.activeChatRecipient = {
      name: safeName,
      phone: safePhone,
      avatar: safeAvatar,
      id: recipientId || '',
      key: chatKey
    };

    if (!APP_STATE.chatMeta) APP_STATE.chatMeta = {};
    APP_STATE.chatMeta[chatKey] = {
      name: safeName,
      phone: safePhone,
      avatar: safeAvatar,
      recipientId: recipientId || '',
      type: chatType || (APP_STATE.chatMeta[chatKey]?.type) || 'other',
      category: initialContext || (APP_STATE.chatMeta[chatKey]?.category) || '',
      updatedAt: Date.now()
    };

    const headerName = document.getElementById('chatRecipientName');
    const headerAvatar = document.getElementById('chatRecipientAvatar');
    const callBtn = document.getElementById('chatRecipientCallBtn');
    if (headerName) headerName.textContent = safeName;
    if (headerAvatar) {
      headerAvatar.src = safeAvatar;
      headerAvatar.onerror = function () { this.src = DEFAULT_USER_AVATAR; };
    }
    if (callBtn) {
      if (safePhone) {
        callBtn.href = 'tel:' + safePhone;
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

    // Initialize thread in memory (real user-sent messages only, no auto-injected messages)
    if (!APP_STATE.chats[chatKey]) {
      APP_STATE.chats[chatKey] = [];
    }

    const input = document.getElementById('chatInputMessage');
    if (input) {
      input.value = '';
    }

    renderChatMessages();
    openModal('modal-chat');

    setTimeout(() => {
      const box = document.getElementById('chatMessagesBox');
      if (box) box.scrollTop = box.scrollHeight;
      const inp = document.getElementById('chatInputMessage');
      if (inp) inp.focus();
    }, 200);

    // Subscribe to live Supabase Cloud messages for this thread
    if (typeof window._activeChatUnsubscribe === 'function') {
      try { window._activeChatUnsubscribe(); } catch (_) {}
      window._activeChatUnsubscribe = null;
    }

    if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.subscribeChatThread === 'function') {
      window._activeChatUnsubscribe = window.NN_SUPABASE_SERVICES.subscribeChatThread(chatKey, (cloudMsgs) => {
        if (Array.isArray(cloudMsgs) && cloudMsgs.length > 0) {
          const myId = APP_STATE.currentUser.id;
          const myCleanPhone = normalizePhone(APP_STATE.currentUser.phone);

          if (!APP_STATE.chats[chatKey]) APP_STATE.chats[chatKey] = [];

          cloudMsgs.forEach(m => {
            const mPhone = normalizePhone(m.senderPhone || m.sender_phone);
            const isMe = m.sender === 'me' || (m.senderId && m.senderId === myId) || (myCleanPhone && mPhone && mPhone === myCleanPhone);
            const exists = APP_STATE.chats[chatKey].some(local => local.id === m.id || (local.timestamp === m.timestamp && local.text === m.text));
            if (!exists) {
              APP_STATE.chats[chatKey].push({
                id: m.id || ('msg_' + Date.now()),
                sender: isMe ? 'me' : 'them',
                senderId: m.senderId,
                senderPhone: m.senderPhone,
                senderName: m.senderName || '',
                text: m.text,
                time: m.time || 'ഇപ്പോൾ',
                timestamp: m.timestamp || Date.now()
              });
            } else {
              const localMsg = APP_STATE.chats[chatKey].find(local => local.id === m.id || (local.timestamp === m.timestamp && local.text === m.text));
              if (localMsg && isMe) {
                localMsg.sender = 'me';
              }
            }
          });

          APP_STATE.chats[chatKey].sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
          saveChats();
          renderChatMessages();
        }
      });
    }

    setTimeout(() => {
      const box = document.getElementById('chatMessagesBox');
      if (box) box.scrollTop = box.scrollHeight;
    }, 150);
  }
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

  function renderChatMessages() {
    const box = document.getElementById('chatMessagesBox');
    if (!box || !APP_STATE.activeChatRecipient) return;

    const chatKey = APP_STATE.activeChatRecipient.key;
    const thread = APP_STATE.chats[chatKey] || [];

    if (thread.length === 0) {
      box.innerHTML = `
        <div style="text-align:center;padding:26px 18px;background:rgba(255,255,255,0.92);backdrop-filter:blur(8px);border-radius:20px;margin:24px auto;max-width:320px;box-shadow:0 4px 16px rgba(0,0,0,0.06);border:1px solid rgba(0,0,0,0.04)">
          <div style="width:58px;height:58px;border-radius:50%;background:#DCF8C6;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;font-size:28px;box-shadow:0 3px 8px rgba(0,0,0,0.08)">💬</div>
          <div style="font-weight:800;font-size:15px;color:#111B21">${escapeHtml(APP_STATE.activeChatRecipient.name)}</div>
          <p style="font-size:12px;color:#667781;margin:6px 0 0;line-height:1.5">നേരിട്ടുള്ള തത്സമയ സംഭാഷണം ആരംഭിക്കൂ. സന്ദേശങ്ങൾ ഇൻസ്റ്റന്റായി കൈമാറുന്നു.</p>
          <div style="margin-top:14px;font-size:11px;font-weight:700;color:#075E54;background:#DCF8C6;display:inline-flex;align-items:center;gap:4px;padding:5px 12px;border-radius:12px">
            <span>🔒 എൻഡ്-ടു-എൻഡ് സുരക്ഷിത ചാറ്റ്</span>
          </div>
        </div>
      `;
      return;
    }

    let lastDateStr = '';
    const messagesHtml = thread.map(msg => {
      const isMe = msg.sender === 'me';
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

      const recipientAvatar = (APP_STATE.activeChatRecipient && APP_STATE.activeChatRecipient.avatar) || DEFAULT_USER_AVATAR;

      return `
        ${dateDivider}
        <div class="chat-message-row ${isMe ? 'outgoing-row' : 'incoming-row'}">
          ${!isMe ? `
            <img src="${escapeHtml(recipientAvatar)}" class="chat-bubble-avatar" alt="Avatar" onerror="this.src=window.DEFAULT_USER_AVATAR||''">
          ` : ''}
          <div class="chat-bubble ${isMe ? 'outgoing' : 'incoming'}">
            <div class="chat-bubble-content">${escapeHtml(msg.text)}</div>
            <div class="chat-bubble-meta">
              <span class="chat-time-text">${escapeHtml(msg.time || '')}</span>
              ${isMe ? '<span class="chat-ticks">✓✓</span>' : ''}
            </div>
          </div>
        </div>
      `;
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

    const msgObj = {
      id: msgId,
      senderId: APP_STATE.currentUser.id,
      senderName: senderName,
      senderPhone: APP_STATE.currentUser.phone || '',
      senderAvatar: senderAvatar,
      text: text,
      time: timeStr,
      timestamp: Date.now()
    };

    // Instant local echo
    APP_STATE.chats[chatKey].push({
      id: msgId,
      sender: 'me',
      senderId: APP_STATE.currentUser.id,
      senderPhone: APP_STATE.currentUser.phone || '',
      senderName: senderName,
      text: text,
      time: timeStr,
      timestamp: Date.now()
    });

    if (input) input.value = '';
    if (APP_STATE.chatMeta && APP_STATE.chatMeta[chatKey]) {
      APP_STATE.chatMeta[chatKey].updatedAt = Date.now();
    }
    saveChats();
    updateChatBadgeCounter();
    if (typeof renderChatListScreen === 'function') {
      renderChatListScreen();
    }
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
  }
  window.sendChatMessage = sendChatMessage;

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
    openChatModal(j.employer, j.employerPhone, DEFAULT_USER_AVATAR, `തൊഴിൽ അന്വേഷണം: ${j.title} (${j.salary})`, j.id, null, 'job');
  }
  window.openChatForJob = openChatForJob;

  function openChatForRental(rentId) {
    const r = (APP_STATE.rentals || []).find(item => item.id === rentId);
    if (!r) return;
    openChatModal(r.owner, r.ownerPhone, r.image || DEFAULT_USER_AVATAR, `വാടക അന്വേഷണം: ${r.title} (${r.rate})`, r.id, null, 'rental');
  }
  window.openChatForRental = openChatForRental;

  function openChatForDonor(name, phone, group) {
    openChatModal(name, phone, DEFAULT_USER_AVATAR, `രക്തദാന അന്വേഷണം: ${group}`, 'donor_' + (phone ? phone.replace(/\D/g, '') : name), null, 'blood');
  }
  window.openChatForDonor = openChatForDonor;

  function openChatForAmbulance(name, phone) {
    openChatModal(name, phone, DEFAULT_USER_AVATAR, `അടിയന്തിര ആംബുലൻസ് ആവശ്യം`, 'amb_' + (phone ? phone.replace(/\D/g, '') : name), null, 'ambulance');
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

  function getAllCommunityContacts(filterCategory) {
    const list = [];
    const seen = new Set();
    const myPhone = normalizePhone(APP_STATE.currentUser.phone);
    const myId = APP_STATE.currentUser.id;

    // 1. Community Post Authors (നാട്ടുകാർ & പോസ്റ്റ് ചെയ്തവർ)
    (APP_STATE.posts || []).forEach(p => {
      const pPhone = normalizePhone(p.authorPhone);
      const pKey = pPhone || p.authorId || p.authorName;
      if (pKey && pKey !== myPhone && pKey !== myId && !seen.has(pKey)) {
        seen.add(pKey);
        list.push({
          type: 'citizen',
          id: p.authorId || ('usr_' + (pPhone || p.authorName)),
          name: p.authorName || 'നാട്ടുകാരൻ',
          phone: p.authorPhone || '',
          avatar: p.authorAvatar || DEFAULT_USER_AVATAR,
          sub: `📢 കമ്മ്യൂണിറ്റി പോസ്റ്റ് • 📍 ${p.authorLocation || 'കേരളം'}`
        });
      }
    });

    // 2. Service Providers (സേവനദാതാക്കൾ)
    (APP_STATE.services || []).forEach(s => {
      const sPhone = normalizePhone(s.phone);
      const sKey = sPhone || s.id;
      if (sKey && sKey !== myPhone && sKey !== myId && !seen.has(sKey)) {
        seen.add(sKey);
        list.push({
          type: 'service',
          id: s.id,
          name: s.name,
          phone: s.phone || '',
          avatar: s.avatar || DEFAULT_USER_AVATAR,
          sub: `🛠️ ${s.trade} • 📍 ${resolveItemLocation(s) || 'തത്സമയ ലൊക്കേഷൻ'}`
        });
      }
    });
    // 3. Blood Donors (രക്തദാതാക്കൾ)
    (APP_STATE.bloodDonors || []).forEach(d => {
      const dPhone = normalizePhone(d.phone);
      const dKey = dPhone || d.name;
      if (dKey && dKey !== myPhone && !seen.has(dKey)) {
        seen.add(dKey);
        list.push({
          type: 'donor',
          id: 'donor_' + (dPhone || d.name),
          name: d.name,
          phone: d.phone || '',
          avatar: DEFAULT_USER_AVATAR,
          sub: `🩸 ${d.group || 'O+'} രക്തദാതാവ് • 📍 ${resolveItemLocation(d) || 'തത്സമയ ലൊക്കേഷൻ'}`
        });
      }
    });
    // 4. Job Employers (തൊഴിൽ ദാതാക്കൾ)
    (APP_STATE.jobs || []).forEach(j => {
      const jPhone = normalizePhone(j.employerPhone);
      const jKey = jPhone || j.employer;
      if (jKey && jKey !== myPhone && !seen.has(jKey)) {
        seen.add(jKey);
        list.push({
          type: 'citizen',
          id: j.id,
          name: j.employer || 'തൊഴിൽ ദാതാവ്',
          phone: j.employerPhone || '',
          avatar: DEFAULT_USER_AVATAR,
          sub: `💼 ${j.title} • 📍 ${resolveItemLocation(j) || 'തത്സമയ ലൊക്കേഷൻ'}`
        });
      }
    });
    // 5. Rentals Owners (വാടക & വസ്തു)
    (APP_STATE.rentals || []).forEach(r => {
      const rPhone = normalizePhone(r.ownerPhone);
      const rKey = rPhone || r.owner;
      if (rKey && rKey !== myPhone && !seen.has(rKey)) {
        seen.add(rKey);
        list.push({
          type: 'citizen',
          id: r.id,
          name: r.owner || 'കെട്ടിട ഉടമ',
          phone: r.ownerPhone || '',
          avatar: DEFAULT_USER_AVATAR,
          sub: `🏠 ${r.title} • 📍 ${resolveItemLocation(r) || 'തത്സമയ ലൊക്കേഷൻ'}`
        });
      }
    });

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

    // 3. Open chat directly with this person's name
    closeModal('modal-new-chat');
    openChatModal(rawVal, '', DEFAULT_USER_AVATAR, '', 'usr_' + Date.now());
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

  function renderChatListScreen() {
    const container = document.getElementById('chatThreadsList');
    if (!container) return;

    // Gather all chat keys from APP_STATE.chats and APP_STATE.chatMeta
    const allKeys = Array.from(new Set([
      ...Object.keys(APP_STATE.chats || {}),
      ...Object.keys(APP_STATE.chatMeta || {})
    ])).filter(k => {
      const msgs = (APP_STATE.chats && APP_STATE.chats[k]) || [];
      const meta = (APP_STATE.chatMeta && APP_STATE.chatMeta[k]);
      return msgs.length > 0 || meta;
    });

    // Sort active threads by latest message / timestamp descending
    allKeys.sort((a, b) => {
      const threadA = (APP_STATE.chats && APP_STATE.chats[a]) || [];
      const threadB = (APP_STATE.chats && APP_STATE.chats[b]) || [];
      const timeA = threadA.length ? (threadA[threadA.length - 1].timestamp || 0) : ((APP_STATE.chatMeta && APP_STATE.chatMeta[a]?.updatedAt) || 0);
      const timeB = threadB.length ? (threadB[threadB.length - 1].timestamp || 0) : ((APP_STATE.chatMeta && APP_STATE.chatMeta[b]?.updatedAt) || 0);
      return timeB - timeA;
    });

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
          <div onclick="openChatModal('${escapeHtml(c.name).replace(/'/g, "\\'")}', '${c.phone || ''}', '${c.avatar || DEFAULT_USER_AVATAR}', '', '${c.id}')"
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
      const directTargetName = cleanDigits.length >= 10 ? `മൊബൈൽ (${cleanDigits.slice(-10)})` : activeChatSearchQuery;
      const directPhone = cleanDigits.length >= 10 ? cleanDigits.slice(-10) : '';
      html += `
        <div onclick="openChatModal('${escapeHtml(directTargetName).replace(/'/g, "\\'")}', '${directPhone}', window.DEFAULT_USER_AVATAR||'', '', 'usr_${Date.now()}')"
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
          <div onclick="openChatModal('${escapeHtml(c.name).replace(/'/g, "\\'")}', '${c.phone || ''}', '${c.avatar || DEFAULT_USER_AVATAR}', '', '${c.id}')"
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
            <div onclick="openChatModal('${escapeHtml(c.name).replace(/'/g, "\\'")}', '${c.phone || ''}', '${c.avatar || DEFAULT_USER_AVATAR}', '', '${c.id}')"
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
      <div onclick="openChatModal('${escapeHtml(meta.name).replace(/'/g, "\\'")}', '${meta.phone || ''}', '${meta.avatar || DEFAULT_USER_AVATAR}', '', '${meta.recipientId || ''}', '${k}')"
           style="display:flex;align-items:center;gap:12px;padding:12px 14px;background:#fff;border-radius:16px;border:1px solid #E2E8F0;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,0.03);transition:all 0.15s ease;margin-bottom:6px">
        <div style="position:relative;flex-shrink:0">
          <img src="${meta.avatar || DEFAULT_USER_AVATAR}" style="width:48px;height:48px;border-radius:50%;object-fit:cover;border:2px solid #E2E8F0" onerror="this.src=window.DEFAULT_USER_AVATAR||''">
          <span style="position:absolute;bottom:1px;right:1px;width:12px;height:12px;border-radius:50%;background:#10B981;border:2px solid #fff"></span>
        </div>
        <div style="flex:1;min-width:0">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2px">
            <span style="font-weight:800;font-size:14.5px;color:#0F172A;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(meta.name)}</span>
            <span style="font-size:11px;color:#64748B;font-weight:600;flex-shrink:0">${lastMsg.time}</span>
          </div>
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:2px">
            <span style="font-size:10px;font-weight:800;background:${badgeBg};color:${badgeColor};padding:1px 6px;border-radius:6px">${badgeLabel}</span>
            ${meta.phone ? `<span style="font-size:11px;color:#94A3B8">📞 ${meta.phone}</span>` : ''}
          </div>
          <div style="font-size:12.5px;color:#64748B;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center">
            ${lastMsg.sender === 'me' ? '<span style="color:#53BDEB;font-weight:900;margin-right:4px;letter-spacing:-1.5px;font-size:11px">✓✓</span>' : ''}
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
    { id: 'plumber', name: 'പ്ലംബർ', icon: '🚰' },
    { id: 'electrician', name: 'ഇലക്ട്രീഷ്യൻ', icon: '⚡' },
    { id: 'driver', name: 'ഡ്രൈവർ / ടാക്സി', icon: '🛺' },
    { id: 'carpenter', name: 'ആശാരി', icon: '🪚' },
    { id: 'painter', name: 'പെയിന്റർ', icon: '🎨' },
    { id: 'acrepair', name: 'എസി & ഫ്രിഡ്ജ്', icon: '❄️' },
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
    { id: 'thekku', name: 'തെങ്ങ് കയറ്റം', icon: '🥥' },
    { id: 'kinar', name: 'കിണർ പണി', icon: '🪣' },
    { id: 'mechanic', name: 'മെക്കാനിക്', icon: '🔧' },
    { id: 'electronics', name: 'ടിവി & മെഷീൻ', icon: '📺' },
    { id: 'tiles', name: 'ടൈൽ & ഗ്രാനൈറ്റ്', icon: '📐' },
    { id: 'roofing', name: 'റൂഫിംഗ് ട്രസ്സ്', icon: '🏠' },
    { id: 'aluminium', name: 'അലുമിനിയം വർക്ക്', icon: '🪟' },
    { id: 'waste', name: 'സെപ്റ്റിക് ടാങ്ക്', icon: '🚛' },
    { id: 'packers', name: 'പാക്കേഴ്സ് മൂവേഴ്സ്', icon: '📦' },
    { id: 'solar', name: 'സോളാർ സിസ്റ്റം', icon: '☀️' },
    { id: 'photography', name: 'ഫോട്ടോഗ്രാഫി', icon: '📷' },
    { id: 'sound', name: 'സൗണ്ട് & ലൈറ്റ്', icon: '🔊' },
    { id: 'gas', name: 'ഗ്യാസ് സ്റ്റൗ', icon: '🍳' },
    { id: 'pestcontrol', name: 'പെസ്റ്റ് കൺട്രോൾ', icon: '🐜' }
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
    APP_STATE.activeServiceCategory = catId;
    renderServicesCategoriesGrid();
    renderServicesScreen();
    setTimeout(() => {
      const activePill = document.querySelector(`.cat-pill-btn[onclick*="${catId}"]`);
      if (activePill) activePill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }, 50);
  }
  window.filterServiceCategory = filterServiceCategory;

  function filterServiceAndOpen(catId) {
    APP_STATE.activeServiceCategory = catId;
    const searchInput = document.getElementById('serviceSearchInput');
    if (searchInput) searchInput.value = '';
    navTo('services');
    setTimeout(() => {
      const activePill = document.querySelector(`.cat-pill-btn[onclick*="${catId}"]`);
      if (activePill) activePill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }, 100);
  }
  window.filterServiceAndOpen = filterServiceAndOpen;

  function renderServicesScreen() {
    renderServicesCategoriesGrid();
    const container = document.getElementById('servicesListContainer');
    if (!container) return;

    const searchInput = document.getElementById('serviceSearchInput');
    const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
    const maxRadius = APP_STATE.radiusFilters.services;

    // Filter services by category and query
    let allMatching = APP_STATE.services.filter(srv => {
      const matchesCategory = (APP_STATE.activeServiceCategory === 'all') || (srv.category === APP_STATE.activeServiceCategory);
      const matchesQuery = !query || srv.name.toLowerCase().includes(query) || srv.trade.toLowerCase().includes(query) || (srv.category && srv.category.toLowerCase().includes(query));
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
            <img src="${srv.avatar}" alt="${srv.name}" class="service-prov-avatar" onerror="this.src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'">
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

          <div style="display:flex;flex-wrap:wrap;gap:6px;margin:2px 0">
            <span class="provider-fee-pill">💰 ${srv.visitingFee || '₹200 വിസിറ്റിംഗ് നിരക്ക്'}</span>
            ${(srv.specializations || []).slice(0, 3).map(sp => `<span class="provider-spec-tag">${sp}</span>`).join('')}
          </div>

          <div style="font-size:11.5px;color:#6B7280;display:flex;justify-content:space-between;border-top:1px dashed #E5E7EB;padding-top:8px">
            <span>🛠️ ${srv.experience}</span>
            <span style="color:#059669;font-weight:700">വിശദാംശങ്ങൾ & റേറ്റിംഗ് ➔</span>
          </div>

          <!-- DIRECT ACTION: IN-APP CHAT ONLY -->
          <div class="service-actions-row" onclick="event.stopPropagation()">
            <button class="prov-btn-chat" onclick="openChatForService('${srv.id}')" title="ആപ്പ് ചാറ്റ്" style="flex:1;justify-content:center">
              <span>💬</span>
              <span>ആപ്പ് വഴി ചാറ്റ് ചെയ്യാം</span>
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
          <img src="${srv.avatar}" alt="${srv.name}" style="width:68px;height:68px;border-radius:50%;border:3px solid #fff;object-fit:cover;box-shadow:0 4px 12px rgba(0,0,0,0.15)" onerror="this.src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'">
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
            <div style="font-size:0.86rem;font-weight:800;color:#0F766E;margin-top:2px">${srv.visitingFee || '₹200 വിസിറ്റിംഗ് നിരക്ക്'}</div>
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
            <span>ആപ്പ് വഴി ചാറ്റ് ചെയ്യാം</span>
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
            <input type="text" id="serviceReviewTextInput" placeholder="അഭിപ്രായം രേഖപ്പെടുത്താം (ഉദാ: നല്ല സർവീസ്, ന്യായമായ കൂലി)..." style="width:100%;padding:8px 12px;border:1px solid #CBD5E1;border-radius:10px;font-size:0.8rem;outline:none;margin-bottom:8px">
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
      '⚡', '🚰', '🛺', '❄️', '🪚', '🎨', '🧹', '🧱', '🔥', '🌴',
      '💄', '📹', '🍲', '🧵', '🩺', '📚', '💧', '📱', '🚗', '🚲',
      '🍳', '🌿', '✂️', '🚚', '📸', '🪟', '🔑', '🛠️', '💻', '🧺',
      '🪓', '🌾', '🔋', '🛵', '🏛️', '🚪'
    ];
    const combined = [...base];
    customIcons.forEach(item => {
      const icon = (typeof item === 'string' ? item : (item && item.icon ? item.icon : '')).trim();
      if (icon && !combined.includes(icon)) combined.push(icon);
    });
    return combined;
  }
  window.getMiniIconsList = getMiniIconsList;

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
    const fee = (document.getElementById('regServiceFee') ? document.getElementById('regServiceFee').value.trim() : '') || '₹200 വിസിറ്റിംഗ് നിരക്ക്';
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
    const specsList = rawSpecs ? rawSpecs.split(',').map(s => s.trim()).filter(Boolean) : ['ജനറൽ സർവീസ്', 'ദ്രുത സഹായം'];
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
      availability: avail,
      rating: '5.0 (New)',
      experience: exp,
      location: loc,
      district: resolvedDistrict,
      lat: APP_STATE.location.lat,
      lon: APP_STATE.location.lon,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      badge: 'തദ്ദേശവാസി രജിസ്ട്രേഷൻ',
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

    const reader = new FileReader();
    reader.onload = function(e) {
      const img = new Image();
      img.onload = function() {
        const canvas = document.createElement('canvas');
        const maxDim = 800;
        let w = img.width;
        let h = img.height;
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          } else {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
        window._quickReqPhotoBase64 = compressedBase64;

        const previewBox = document.getElementById('quickReqPhotoPreviewBox');
        const previewImg = document.getElementById('quickReqPhotoPreview');
        if (previewBox && previewImg) {
          previewImg.src = compressedBase64;
          previewBox.style.display = 'block';
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
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

    container.innerHTML = bloodExtendedNotice + inRadius.map(d => `
      <div style="background:#fff;border-radius:16px;padding:14px;border:1px solid #FECACA;display:flex;align-items:center;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.03)">
        <div style="display:flex;align-items:center;gap:12px">
          <div style="width:44px;height:44px;border-radius:50%;background:#FEF2F2;color:#DC2626;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:15px;border:2px solid #FCA5A5">
            ${d.group || 'O+'}
          </div>
          <div>
            <div style="font-weight:800;font-size:14px;color:#111827">${escapeHtml(d.name || 'രക്തദാതാവ്')}</div>
            <div style="font-size:11px;color:#6B7280">📍 ${escapeHtml(resolveItemLocation(d) || APP_STATE.location.name || 'തത്സമയ ലൊക്കേഷൻ')} • <span style="color:#059669;font-weight:800">${d._calculatedDist} km അകലെ</span>${d.status ? ` • <span style="color:#10B981;font-weight:700">${escapeHtml(d.status)}</span>` : ''}</div>
          </div>
        </div>
        <div>
          <button onclick="openChatForDonor('${(d.name || 'രക്തദാതാവ്').replace(/'/g, "\\'")}', '${d.phone || ''}', '${d.group || 'O+'}')" style="background:linear-gradient(135deg, #DC2626 0%, #B91C1C 100%);color:#fff;border:none;padding:9px 14px;border-radius:10px;cursor:pointer;font-size:12.5px;font-weight:800;display:flex;align-items:center;gap:6px;box-shadow:0 2px 6px rgba(220,38,38,0.25)">
            <span>💬 ആപ്പ് ചാറ്റ്</span>
          </button>
        </div>
      </div>
    `).join('');
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

    const contactDisplay = showPhone ? `${phone} (ആപ്പ് വഴി ചാറ്റ് ചെയ്യാം)` : '🔒 നമ്പർ രഹസ്യമാണ് (താഴെയുള്ള "ആപ്പ് ചാറ്റ്" വഴി സന്ദേശമയക്കുക)';

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
    }
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
    const map = new Map();
    [...custom, ...DEFAULT_EMERGENCY_CONTACTS].forEach(c => {
      const k = c.id || (c.phone ? c.phone.replace(/\D/g, '') : c.name);
      if (!map.has(k)) {
        map.set(k, c);
      }
    });
    return Array.from(map.values());
  }

  let activeEmergencyCategory = 'all';

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
    if (cat !== 'all') {
      contacts = contacts.filter(c => c.category === cat);
    }

    const q = (query || '').toLowerCase().trim();
    if (q) {
      contacts = contacts.filter(c => 
        (c.name && c.name.toLowerCase().includes(q)) ||
        (c.phone && c.phone.includes(q)) ||
        (c.categoryName && c.categoryName.toLowerCase().includes(q)) ||
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
          <div style="font-size:12px;color:#64748B;margin-top:4px">തിരഞ്ഞ പദം മാറ്റി നോക്കുക അല്ലെങ്കിൽ പുതിയ നമ്പർ ചേർക്കുക</div>
          <button type="button" onclick="openAdminPortal('emergency')" style="margin-top:12px;background:#0E7043;color:#fff;border:none;padding:7px 16px;border-radius:20px;font-size:12px;font-weight:800;cursor:pointer">
            ➕ അഡ്മിൻ നമ്പർ ചേർക്കുക
          </button>
        </div>
      `;
      return;
    }

    listEl.innerHTML = contacts.map(c => {
      const cleanPhone = (c.phone || '').replace(/\D/g, '');
      const icon = c.icon || getEmergencyCategoryIcon(c.category);
      const catName = c.categoryName || getEmergencyCategoryNameMalayalam(c.category);

      return `
        <div style="background:#FFFFFF;border:1px solid #E2E8F0;border-radius:14px;padding:12px 14px;box-shadow:0 1px 3px rgba(0,0,0,0.04);display:flex;flex-direction:column;gap:8px">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px">
            <div style="display:flex;align-items:center;gap:10px">
              <div style="width:42px;height:42px;border-radius:12px;background:#FEF2F2;border:1px solid #FECACA;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">
                ${icon}
              </div>
              <div>
                <div style="font-weight:800;font-size:14px;color:#0F172A">${escapeHtml(c.name)}</div>
                <div style="display:flex;align-items:center;gap:6px;margin-top:2px">
                  <span style="font-size:11px;font-weight:800;color:#DC2626;background:#FEF2F2;border:1px solid #FCA5A5;padding:1px 6px;border-radius:6px">
                    ${escapeHtml(catName)}
                  </span>
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
    renderEmergencyModalList();
    openModal('modal-emergency');
  }
  window.openEmergencyModal = openEmergencyModal;

  // ==============================================================
  // 11C. ADMIN PORTAL (SERVICES & EMERGENCY DIRECTORY MANAGEMENT)
  // ==============================================================
  function checkIsAdmin() {
    const userPhone = (APP_STATE.currentUser.phone || '').replace(/\D/g, '').slice(-10);
    return userPhone === '9605406699' || localStorage.getItem('nn_is_admin') === 'true';
  }
  window.checkIsAdmin = checkIsAdmin;

  function promptAdminAuth(callback) {
    if (checkIsAdmin()) {
      if (typeof callback === 'function') callback();
      return;
    }
    const pin = prompt('🔐 അഡ്മിൻ ആക്സസ് PIN നൽകുക:');
    if (pin === '2026') {
      localStorage.setItem('nn_is_admin', 'true');
      toast('✅ അഡ്മിൻ തിരിച്ചറിഞ്ഞു!');
      if (typeof callback === 'function') callback();
    } else if (pin !== null) {
      toast('❌ തെറ്റായ PIN! ആക്സസ് നിരസിച്ചു.');
    }
  }
  window.promptAdminAuth = promptAdminAuth;

  function openAdminPortal(tab = 'services') {
    promptAdminAuth(() => {
      openModal('modal-admin-hub');
      switchAdminHubTab(tab);
    });
  }
  window.openAdminPortal = openAdminPortal;

  function switchAdminHubTab(tab) {
    const btnSrv = document.getElementById('adminTabBtnServices');
    const btnNum = document.getElementById('adminTabBtnNumbers') || document.getElementById('adminTabBtnEmergency');
    const btnHome = document.getElementById('adminTabBtnHomeBanner');
    const btnSpl = document.getElementById('adminTabBtnSplash');

    const formSrv = document.getElementById('adminAddServiceForm') || document.getElementById('adminTabContentServices');
    const formNum = document.getElementById('adminAddNumberForm') || document.getElementById('adminTabContentEmergency');
    const secHome = document.getElementById('adminHomeBannerSection');
    const secSpl = document.getElementById('adminSplashPhotoSection');

    // Reset buttons
    [btnSrv, btnNum, btnHome, btnSpl].forEach(b => {
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

  let tempAdminHomeBannerBase64 = null;

  function compressImageToDataUrl(file, maxWidth, quality, callback) {
    if (!file) return;
    if (!file.type || !file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = ev => callback(ev.target.result);
      reader.readAsDataURL(file);
      return;
    }
    const reader = new FileReader();
    reader.onload = ev => {
      const img = new Image();
      img.onload = () => {
        let w = img.width;
        let h = img.height;
        const max = maxWidth || 1200;
        if (w > max || h > max) {
          if (w > h) {
            h = Math.round((h * max) / w);
            w = max;
          } else {
            w = Math.round((w * max) / h);
            h = max;
          }
        }
        try {
          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          const compressed = canvas.toDataURL('image/jpeg', quality || 0.85);
          callback(compressed);
        } catch (_) {
          callback(ev.target.result);
        }
      };
      img.onerror = () => callback(ev.target.result);
      img.src = ev.target.result;
    };
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
    const reader = new FileReader();
    reader.onload = function(e) {
      tempAdminSplashBase64 = e.target.result;
      const preview = document.getElementById('adminSplashPreview');
      if (preview) preview.src = tempAdminSplashBase64;
      toast('📸 ഫോട്ടോ തിരഞ്ഞെടുത്തു! സേവ് ചെയ്യാൻ താഴെയുള്ള ബട്ടൺ അമർത്തുക.');
    };
    reader.readAsDataURL(file);
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

    localStorage.setItem('nn_app_splash_bg', targetSrc);
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
    const fee = (document.getElementById('adminSvcFee')?.value || document.getElementById('admSrvFee')?.value || '').trim();
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
      visitingFee: fee || 'മിതമായ നിരക്ക്',
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
    localStorage.setItem('nn_emergency_contacts', JSON.stringify(APP_STATE.emergencyContacts));

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
              <button onclick="openChatForAmbulance('${(d.name || 'ആംബുലൻസ്').replace(/'/g, "\\'")}', '${d.phone || ''}')" style="flex:1;background:#0E7043;color:#fff;border:none;padding:10px;border-radius:10px;font-size:13px;font-weight:800;display:flex;align-items:center;justify-content:center;gap:6px;cursor:pointer">
                <span>💬 ആപ്പ് വഴി ചാറ്റ് ചെയ്യാം</span>
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
  function openAmbulanceModal() {
    renderAmbulanceDrivers();
    openModal('modal-ambulance');
  }
  window.openAmbulanceModal = openAmbulanceModal;
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
            <span class="job-salary-badge">${j.salary}</span>
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
              💬 ആപ്പ് ചാറ്റ്
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

    const maxRadius = APP_STATE.radiusFilters.rentals;
    const searchInput = document.getElementById('rentalSearchInput');
    const query = (searchInput ? searchInput.value : '').toLowerCase().trim();

    let allMatchingRentals = APP_STATE.rentals.filter(r => {
      let matchesCat = true;
      if (APP_STATE.activeRentalCategory === 'house') {
        matchesCat = (r.type && (r.type.includes('വീട്') || r.type.includes('മുറി') || r.type.includes('ഹോസ്റ്റൽ'))) || r.title.includes('വീട്') || r.title.includes('റൂം');
      } else if (APP_STATE.activeRentalCategory === 'vehicle') {
        matchesCat = (r.type && (r.type.includes('വാഹന') || r.type.includes('കാർ') || r.type.includes('ജീപ്പ്') || r.type.includes('സ്കൂട്ടർ'))) || r.title.includes('പിക്കപ്പ്') || r.title.includes('ഓട്ടോ') || r.title.includes('കാർ') || r.title.includes('സ്കൂട്ടർ');
      } else if (APP_STATE.activeRentalCategory === 'tool') {
        matchesCat = (r.type && (r.type.includes('ടൂള') || r.type.includes('യന്ത്ര') || r.type.includes('ട്രാക്ടർ'))) || r.title.includes('മിക്സർ') || r.title.includes('യന്ത്ര') || r.title.includes('ട്രാക്ടർ');
      } else if (APP_STATE.activeRentalCategory === 'buysell') {
        matchesCat = (r.type && (r.type.includes('വിൽപന') || r.type.includes('ഇലക്ട്രോണിക്സ്'))) || r.title.includes('വിൽപന');
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
          <h3 style="margin:0 0 6px;color:#111827">ഈ പ്രദേശത്ത് വാടക ഇനങ്ങൾ ലഭ്യമല്ല</h3>
          <p style="color:#6B7280;margin:0 0 14px;font-size:13px"><b>${escapeHtml(APP_STATE.location.name)}</b> പരിസരത്ത്${radiusLabel} വാടക ഇനങ്ങൾ കണ്ടെത്തിയില്ല.</p>
          <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
            <button onclick="setGlobalRadius(25, null)" style="background:#ECFDF5;color:#0E7043;border:1px solid #A7F3D0;border-radius:10px;padding:8px 14px;font-weight:700;font-size:12px;cursor:pointer">25 km പരിധി</button>
            <button onclick="setGlobalRadius(1000, null)" style="background:#EFF6FF;color:#2563EB;border:1px solid #BFDBFE;border-radius:10px;padding:8px 14px;font-weight:700;font-size:12px;cursor:pointer">മുഴുവൻ കാണുക</button>
            <button onclick="openAddRentalModal()" style="background:#0E7043;color:#fff;border:none;border-radius:10px;padding:8px 16px;font-weight:800;font-size:12px;cursor:pointer">➕ ലിസ്റ്റ് ചെയ്യാം</button>
          </div>
        </div>
      `;
    } else {
      rentalsListEl.innerHTML = filteredRentals.map(r => `
        <div class="job-card">
          ${r.image ? `<img src="${r.image}" style="width:100%;height:160px;object-fit:cover;border-radius:12px;margin-bottom:8px">` : ''}
          <div style="display:flex;justify-content:space-between;align-items:flex-start">
            <h3 style="margin:0 0 4px;font-size:15px;color:#111827">${r.title}</h3>
            <span style="background:#FEF3C7;color:#B45309;padding:4px 8px;border-radius:8px;font-size:12px;font-weight:800">${r.rate}</span>
          </div>
          <div style="font-size:11px;background:#F0FDF4;color:#166534;padding:3px 8px;border-radius:6px;align-self:flex-start;font-weight:700">${r.type || 'വാടക & വിൽപന'}</div>
          <div style="font-size:12px;color:#6B7280">ഉടമസ്ഥൻ: ${r.owner} • 📍 ${r.location} • <span style="color:#0E7043;font-weight:700">${r._calculatedDist || 1.2} km അകലെ</span></div>
          <div style="margin-top:6px">
            <button onclick="openChatForRental('${r.id}')" style="width:100%;background:#0E7043;color:#fff;border:none;padding:10px;border-radius:10px;font-weight:800;font-size:13px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px">💬 ആപ്പ് വഴി ചാറ്റ് ചെയ്യാം</button>
          </div>
        </div>
      `).join('');
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
    const salary = salaryEl && salaryEl.value.trim() ? salaryEl.value.trim() : 'ശമ്പളം സംസാരിക്കാം';
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

    // 1. SERVICES & WORKERS (Exclude own service)
    (APP_STATE.services || []).forEach(s => {
      if (isCurrentUserEntity(s.userId || s.id, s.phone, s.name, s.isCurrentUser)) return;
      const dist = getItemDistanceKm(s, APP_STATE.location.lat, APP_STATE.location.lon);
      s._calculatedDist = dist;
      rawItems.push({
        type: 'service',
        id: s.id,
        name: s.name,
        subtitle: s.trade,
        icon: s.icon || '🛠️',
        avatar: s.avatar || DEFAULT_USER_AVATAR,
        phone: s.phone || '',
        location: resolveItemLocation(s),
        badge: s.rating ? `★ ${s.rating}` : 'വെരിഫൈഡ്',
        dist: dist
      });
    });

    // 2. CITIZENS & POST AUTHORS (Exclude self)
    const seenAuthors = new Set();
    (APP_STATE.posts || []).forEach(p => {
      if (isCurrentUserEntity(p.authorId, p.authorPhone, p.authorName, p.isCurrentUser)) return;
      const authorKey = p.authorName || p.authorId;
      if (authorKey && !seenAuthors.has(authorKey)) {
        seenAuthors.add(authorKey);
        const dist = getItemDistanceKm(p, APP_STATE.location.lat, APP_STATE.location.lon);
        p._calculatedDist = dist;
        rawItems.push({
          type: 'citizen',
          id: p.authorId || ('citizen_' + p.id),
          name: p.authorName || 'നാട്ടുകാരൻ',
          subtitle: p.content ? (p.content.slice(0, 32) + '...') : 'കമ്മ്യൂണിറ്റി പോസ്റ്റ്',
          icon: '👥',
          avatar: p.authorAvatar || DEFAULT_USER_AVATAR,
          phone: p.authorPhone || '',
          location: resolveItemLocation(p),
          badge: 'നാട്ടുകാരൻ',
          dist: dist
        });
      }
    });

    // 3. BLOOD DONORS (Exclude self)
    (APP_STATE.bloodDonors || []).forEach(d => {
      if (isCurrentUserEntity(d.id, d.phone, d.name, false)) return;
      const dist = getItemDistanceKm(d, APP_STATE.location.lat, APP_STATE.location.lon);
      d._calculatedDist = dist;
      rawItems.push({
        type: 'donor',
        id: 'donor_' + (d.phone ? d.phone.replace(/\D/g, '') : d.name),
        name: d.name,
        subtitle: `രക്തദാതാവ് (${d.group || 'All'})`,
        icon: '🩸',
        avatar: DEFAULT_USER_AVATAR,
        phone: d.phone || '',
        location: resolveItemLocation(d),
        badge: d.group || 'O+',
        dist: dist
      });
    });

    // 4. RENTALS & LOCAL BUSINESSES (Exclude self)
    (APP_STATE.rentals || []).forEach(r => {
      if (isCurrentUserEntity(r.userId || r.id, r.ownerPhone, r.owner, false)) return;
      const dist = getItemDistanceKm(r, APP_STATE.location.lat, APP_STATE.location.lon);
      r._calculatedDist = dist;
      rawItems.push({
        type: 'rental',
        id: r.id,
        name: r.owner || r.title,
        subtitle: r.title,
        icon: '🏠',
        avatar: r.image || DEFAULT_USER_AVATAR,
        phone: r.ownerPhone || '',
        location: resolveItemLocation(r),
        badge: r.rate || 'വാടകയ്ക്ക്',
        dist: dist
      });
    });

    // Step A: Apply Category Filtering
    let filtered = rawItems.filter(item => {
      if (catFilter === 'all') return true;
      return item.type === catFilter;
    });

    // Step B: Apply Text Search Query
    if (query) {
      filtered = filtered.filter(item => {
        return (item.name && item.name.toLowerCase().includes(query)) ||
               (item.subtitle && item.subtitle.toLowerCase().includes(query)) ||
               (item.location && item.location.toLowerCase().includes(query));
      });
    }

    // Step C: Sort by Distance Ascending
    filtered.sort((a, b) => a.dist - b.dist);

    // Step D: Apply Strict Radius Filter
    let inRadiusItems = (maxRadius >= 1000) ? filtered : filtered.filter(item => item.dist <= maxRadius);

    // Update Counter Stat Pill
    const countBadge = document.getElementById('nearbyFoundCountText');
    if (countBadge) {
      const radiusLabel = maxRadius >= 1000 ? 'മുഴുവൻ' : (maxRadius + ' km പരിധിയിൽ');
      countBadge.textContent = `📍 ${inRadiusItems.length} പേരെ സമീപത്ത് കണ്ടെത്തി (${radiusLabel})`;
    }

    if (inRadiusItems.length === 0) {
      const radiusLabel = maxRadius >= 1000 ? '' : ` (${maxRadius} km)`;
      container.innerHTML = `
        <div style="text-align:center;padding:40px 16px;background:#fff;border-radius:16px;border:1px solid #E2E8F0">
          <div style="font-size:42px;margin-bottom:10px">📍</div>
          <h3 style="margin:0 0 6px;font-size:16px;font-weight:800;color:#0F172A">ഈ പ്രദേശത്ത് ആരെയും കണ്ടെത്തിയില്ല</h3>
          <p style="color:#64748B;margin:0 0 16px;font-size:12.5px"><b>${escapeHtml(userTown)}</b> പരിസരത്ത്${radiusLabel} ആരെയും കണ്ടെത്തിയില്ല.</p>
          <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
            <button onclick="setGlobalRadius(25, null)" style="background:#ECFDF5;color:#0E7043;border:1px solid #A7F3D0;padding:9px 14px;border-radius:10px;font-weight:700;font-size:12px;cursor:pointer">25 km പരിധി</button>
            <button onclick="setGlobalRadius(1000, null)" style="background:#EFF6FF;color:#2563EB;border:1px solid #BFDBFE;padding:9px 14px;border-radius:10px;font-weight:700;font-size:12px;cursor:pointer">മുഴുവൻ കാണുക</button>
            <button onclick="setNearbyCategory('all', document.querySelector('.nearby-cat-chip:first-child'))" style="background:#F1F5F9;color:#334155;border:1px solid #CBD5E1;padding:9px 14px;border-radius:10px;font-weight:700;font-size:12px;cursor:pointer">എല്ലാ വിഭാഗങ്ങളും</button>
          </div>
        </div>
      `;
      return;
    }

    container.innerHTML = inRadiusItems.map(item => {
      const isOnline = true;
      const typeBadgeColor = item.type === 'service' ? '#059669' : (item.type === 'donor' ? '#DC2626' : (item.type === 'citizen' ? '#2563EB' : '#D97706'));
      const typeBadgeBg = item.type === 'service' ? '#ECFDF5' : (item.type === 'donor' ? '#FEF2F2' : (item.type === 'citizen' ? '#EFF6FF' : '#FFFBEB'));
      const cardClickAction = item.type === 'service' ? `openServiceDetailModal('${item.id}')` : `openChatModal('${item.name.replace(/'/g, "\\'")}', '${item.phone}', '${item.avatar}', '${item.subtitle.replace(/'/g, "\\'")}', '${item.id}')`;

      return `
        <div class="nearby-person-card" onclick="${cardClickAction}" style="background:#ffffff;border-radius:16px;padding:14px;border:1px solid #E2E8F0;display:flex;align-items:center;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.03);cursor:pointer;transition:transform 0.15s ease,box-shadow 0.15s ease">
          <div style="display:flex;align-items:center;gap:12px;min-width:0;flex:1">
            <div style="position:relative;flex-shrink:0">
              <img src="${item.avatar}" style="width:48px;height:48px;border-radius:50%;object-fit:cover;border:2px solid #E2E8F0" onerror="this.src=window.DEFAULT_USER_AVATAR||''" alt="${escapeHtml(item.name)}">
              ${isOnline ? '<span style="position:absolute;bottom:1px;right:1px;width:12px;height:12px;border-radius:50%;background:#10B981;border:2px solid #fff"></span>' : ''}
            </div>

            <div style="min-width:0;flex:1">
              <div style="display:flex;align-items:center;gap:6px">
                <span style="font-weight:800;font-size:14.5px;color:#0F172A;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(item.name)}</span>
                <span style="font-size:10px;font-weight:800;color:${typeBadgeColor};background:${typeBadgeBg};padding:2px 7px;border-radius:8px;flex-shrink:0">${escapeHtml(item.badge)}</span>
              </div>
              <div style="font-size:12px;color:#0F766E;font-weight:700;margin-top:2px;display:flex;align-items:center;gap:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
                <span>${item.icon}</span>
                <span>${escapeHtml(item.subtitle)}</span>
              </div>
              <div style="font-size:11.5px;color:#64748B;margin-top:2px;display:flex;align-items:center;gap:6px">
                <span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">📍 ${escapeHtml(item.location)}</span>
                <span>•</span>
                <span style="font-weight:800;color:#059669;white-space:nowrap;background:#ECFDF5;padding:1px 6px;border-radius:6px">${item.dist} km അകലെ</span>
              </div>
            </div>
          </div>

          <div style="display:flex;gap:6px;flex-shrink:0;margin-left:8px" onclick="event.stopPropagation()">
            <button type="button" onclick="openChatModal('${item.name.replace(/'/g, "\\'")}', '${item.phone}', '${item.avatar}', '${item.subtitle.replace(/'/g, "\\'")}', '${item.id}')" style="background:#0E7043;color:#fff;border:none;padding:8px 12px;border-radius:12px;display:flex;align-items:center;justify-content:center;gap:4px;font-size:12px;font-weight:800;cursor:pointer;box-shadow:0 2px 6px rgba(14,112,67,0.25)" title="ചാറ്റ് ചെയ്യാം">💬 ചാറ്റ്</button>
          </div>
        </div>
      `;
    }).join('');
  }
  window.renderNearbyScreen = renderNearbyScreen;

  // ==============================================================
  // 15. PROFILE SCREEN & PERSONAL DASHBOARD (FACEBOOK STYLE)
  // ==============================================================
  function switchProfileSubTab(tabName, btn) {
    APP_STATE.activeProfileSubTab = tabName;
    document.querySelectorAll('.profile-subtab-btn').forEach(b => {
      b.classList.remove('active');
      b.style.background = 'none';
      b.style.fontWeight = '700';
      b.style.color = '#65676B';
      b.style.boxShadow = 'none';
    });
    if (btn) {
      btn.classList.add('active');
      btn.style.background = '#FFFFFF';
      btn.style.fontWeight = '800';
      btn.style.color = '#1877F2';
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

    if (tab === 'posts') {
      const myPosts = APP_STATE.posts.filter(p => p.isCurrentUser || p.authorId === APP_STATE.currentUser.id || p.authorName === APP_STATE.currentUser.name);
      if (myPosts.length === 0) {
        container.innerHTML = `
          <div style="text-align:center;padding:32px 16px;background:#fff;border-radius:16px;border:1px solid #E5E7EB;box-shadow:0 1px 3px rgba(0,0,0,0.03)">
            <div style="font-size:38px;margin-bottom:8px">📝</div>
            <div style="font-size:14px;font-weight:800;color:#1E293B;margin-bottom:4px">പോസ്റ്റുകളൊന്നും ഇല്ല</div>
            <div style="font-size:12px;color:#64748B;margin-bottom:14px">നിങ്ങളുടെ നാട്ടിലെ വാർത്തകളും വിശേഷങ്ങളും ആദ്യമായി പങ്കുവെക്കൂ!</div>
            <button onclick="navTo('add')" style="background:#1877F2;color:#fff;border:none;padding:10px 20px;border-radius:12px;font-weight:800;font-size:12.5px;cursor:pointer;box-shadow:0 2px 8px rgba(24,119,242,0.3)">➕ പുതിയ പോസ്റ്റ് ഇടാം</button>
          </div>
        `;
      } else {
        container.innerHTML = `
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
            <span style="font-size:13px;font-weight:800;color:#1E293B">എന്റെ പോസ്റ്റുകൾ (${myPosts.length})</span>
            <button onclick="navTo('add')" style="background:#EFF6FF;color:#1877F2;border:1px solid #BFDBFE;padding:5px 12px;border-radius:10px;font-weight:800;font-size:11.5px;cursor:pointer">➕ പുതിയ പോസ്റ്റ്</button>
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
                  <button onclick="openEditPostModal('${p.id}')" style="background:#EFF6FF;color:#2563EB;border:1px solid #BFDBFE;border-radius:8px;padding:4px 9px;font-size:11px;font-weight:800;cursor:pointer">✏️ എഡിറ്റ്</button>
                  <button onclick="deletePost('${p.id}', event)" style="background:#FEF2F2;color:#DC2626;border:1px solid #FECACA;border-radius:8px;padding:4px 9px;font-size:11px;font-weight:800;cursor:pointer">🗑️</button>
                </div>
              </div>
              <div style="font-size:13.5px;color:#1E293B;line-height:1.55;word-break:break-word">${escapeHtml(p.content)}</div>
              ${p.image ? `<img src="${p.image}" alt="Post image" onclick="viewFullImage('${p.image}')" style="width:100%;max-height:260px;object-fit:cover;border-radius:12px;border:1px solid #F1F5F9;cursor:pointer">` : ''}
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
            <button onclick="navTo('add')" style="background:#1877F2;color:#fff;border:none;padding:10px 20px;border-radius:12px;font-weight:800;font-size:12.5px;cursor:pointer">📷 ഫോട്ടോ പോസ്റ്റ് ചെയ്യാം</button>
          </div>
        `;
      } else {
        container.innerHTML = `
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <span style="font-size:13px;font-weight:800;color:#1E293B">ഫോട്ടോ ഗാലറി (${myPostsWithPhotos.length})</span>
            <button onclick="navTo('add')" style="background:#EFF6FF;color:#1877F2;border:1px solid #BFDBFE;padding:5px 12px;border-radius:10px;font-weight:800;font-size:11.5px;cursor:pointer">➕ ഫോട്ടോ ചേർക്കാം</button>
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
              <div class="fb-about-label">മൊബൈൽ നമ്പർ (Unique ID)</div>
              <div class="fb-about-val">${APP_STATE.currentUser.phone ? escapeHtml(APP_STATE.currentUser.phone) : 'ഫോൺ ചേർത്തിട്ടില്ല'}</div>
            </div>
          </div>
          <div class="fb-about-item">
            <span class="fb-about-icon">🆔</span>
            <div>
              <div class="fb-about-label">നമ്മുടെ നാട് സിറ്റിസൺ ID</div>
              <div class="fb-about-val" style="font-family:monospace;color:#1877F2;font-weight:800">${escapeHtml(APP_STATE.currentUser.id || ('usr_' + cleanId) || 'usr_citizen')}</div>
            </div>
          </div>
          <div class="fb-about-item">
            <span class="fb-about-icon">📍</span>
            <div>
              <div class="fb-about-label">വാസസ്ഥലം / ഗ്രാമം</div>
              <div class="fb-about-val">${escapeHtml(APP_STATE.currentUser.location || APP_STATE.location.name || 'തത്സമയ ലൊക്കേഷൻ')}</div>
            </div>
          </div>

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
            <button onclick="openEditProfileModal()" style="background:#1877F2;color:#fff;border:none;padding:8px 16px;border-radius:10px;font-weight:800;font-size:12px;cursor:pointer">✏️ വിവരങ്ങൾ തിരുത്താം</button>
          </div>
        </div>
      `;
    } else if (tab === 'services') {
      const myServices = APP_STATE.services.filter(s => s.phone === APP_STATE.currentUser.phone || s.name === APP_STATE.currentUser.name || s.isUserCreated);
      const myJobs = APP_STATE.jobs.filter(j => j.employerPhone === APP_STATE.currentUser.phone || j.employer === APP_STATE.currentUser.name || j.isUserCreated);
      const myRentals = APP_STATE.rentals.filter(r => r.ownerPhone === APP_STATE.currentUser.phone || r.owner === APP_STATE.currentUser.name || r.isUserCreated);

      container.innerHTML = `
        <div style="display:flex;flex-direction:column;gap:12px">
          <!-- MY SERVICES -->
          <div style="background:#fff;border:1px solid #E5E7EB;border-radius:16px;padding:14px;box-shadow:0 1px 3px rgba(0,0,0,0.03)">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
              <span style="font-size:13px;font-weight:800;color:#1E293B">🛠️ എന്റെ സർവീസുകൾ (${myServices.length})</span>
              <button onclick="openAddServiceModal()" style="background:#EFF6FF;color:#1877F2;border:1px solid #BFDBFE;padding:4px 10px;border-radius:8px;font-weight:800;font-size:11px;cursor:pointer">➕ ചേർക്കാം</button>
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
              <button onclick="openPostJobModal()" style="background:#EFF6FF;color:#1877F2;border:1px solid #BFDBFE;padding:4px 10px;border-radius:8px;font-weight:800;font-size:11px;cursor:pointer">➕ തൊഴിൽ നൽകാം</button>
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
              <button onclick="openAddRentalModal()" style="background:#EFF6FF;color:#1877F2;border:1px solid #BFDBFE;padding:4px 10px;border-radius:8px;font-weight:800;font-size:11px;cursor:pointer">➕ ലിസ്റ്റ് ചെയ്യാം</button>
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
    const homeAvatar = document.getElementById('homeHeaderAvatar');

    const displayName = APP_STATE.currentUser.name || 'നാട്ടുകാരൻ';
    const displayPhone = APP_STATE.currentUser.phone ? `📞 ${APP_STATE.currentUser.phone}` : 'ഫോൺ ചേർത്തിട്ടില്ല';
    const currentAvatar = APP_STATE.currentUser.avatar || DEFAULT_USER_AVATAR;
    const currentCover = APP_STATE.currentUser.cover || 'img/kerala-splash.jpg';

    if (nameEl) {
      if (APP_STATE.currentUser.name && APP_STATE.currentUser.name !== 'നാട്ടുകാരൻ') {
        nameEl.innerHTML = `${escapeHtml(displayName)} <span style="font-size:11px;background:#ECFDF5;color:#047857;padding:2px 8px;border-radius:10px;font-weight:700">✓ അംഗം</span>`;
      } else {
        nameEl.innerHTML = `${escapeHtml(displayName)} <span onclick="openEditProfileModal()" style="font-size:11px;background:#FEF3C7;color:#B45309;padding:2px 8px;border-radius:10px;font-weight:700;cursor:pointer">✏️ പേര് നൽകുക</span>`;
      }
    }
    if (phoneEl) phoneEl.textContent = displayPhone;

    if (idBadgeEl) {
      const cleanId = (APP_STATE.currentUser.id || '').replace(/^usr_me_/, '').replace(/^usr_/, '');
      if (cleanId) {
        idBadgeEl.textContent = `ID: ${cleanId}`;
        idBadgeEl.style.display = 'inline-block';
      } else {
        idBadgeEl.style.display = 'none';
      }
    }

    if (bioEl) {
      bioEl.textContent = APP_STATE.currentUser.bio || 'നമ്മുടെ നാട് കൂട്ടായ്മ 🌿';
    }

    if (locEl) {
      const myLoc = APP_STATE.currentUser.location || APP_STATE.location.name || 'കേരളം';
      locEl.textContent = `📍 ${myLoc}`;
    }

    if (bloodEl) {
      bloodEl.textContent = `🩸 രക്തഗ്രൂപ്പ്: ${APP_STATE.currentUser.bloodGroup || 'O+'}`;
    }

    if (verifiedBadge) {
      const isVerified = !!(APP_STATE.currentUser.phone && APP_STATE.currentUser.name && APP_STATE.currentUser.name !== 'നാട്ടുകാരൻ');
      if (isVerified) {
        verifiedBadge.textContent = 'തദ്ദേശവാസി (Verified ✓)';
        verifiedBadge.style.background = '#E0F2FE';
        verifiedBadge.style.color = '#0284C7';
      } else {
        verifiedBadge.textContent = 'അതിഥി (Guest)';
        verifiedBadge.style.background = '#F3F4F6';
        verifiedBadge.style.color = '#6B7280';
      }
    }

    if (avatarEl) avatarEl.src = currentAvatar;
    if (coverEl) coverEl.src = currentCover;
    if (composerAvatar) composerAvatar.src = currentAvatar;
    if (homeAvatar) homeAvatar.src = currentAvatar;

    // Synchronize Desktop Topbar and Sidebar Profile Elements
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
      const myLoc = APP_STATE.currentUser.location || APP_STATE.location.name || 'കേരളം';
      sidebarSub.textContent = `📍 ${myLoc} · പ്രൊഫൈൽ`;
    }

    // Calculate Facebook-style Stats: Posts count, Total likes, Citizens count
    const myPosts = APP_STATE.posts.filter(p => p.isCurrentUser || p.authorId === APP_STATE.currentUser.id || p.authorName === APP_STATE.currentUser.name);
    const postCountEl = document.getElementById('profStatPosts');
    const likesCountEl = document.getElementById('profStatLikes');
    const networkCountEl = document.getElementById('profStatNetwork');

    if (postCountEl) postCountEl.textContent = myPosts.length;
    if (likesCountEl) {
      const totalLikes = myPosts.reduce((acc, p) => acc + (p.likes || 0), 0);
      likesCountEl.textContent = totalLikes;
    }
    if (networkCountEl) {
      const cloudCount = (APP_STATE.cloudProfiles && APP_STATE.cloudProfiles.length) ? APP_STATE.cloudProfiles.length + 80 : 120;
      networkCountEl.textContent = `${cloudCount}+`;
    }

    renderProfileDashboard(APP_STATE.activeProfileSubTab || 'posts');
  }
  window.renderProfileScreen = renderProfileScreen;

  function handleCoverPhotoUpload(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(evt) {
      const img = new Image();
      img.onload = function() {
        const canvas = document.createElement('canvas');
        const maxW = 900;
        let w = img.width;
        let h = img.height;
        if (w > maxW) {
          h = Math.round((h * maxW) / w);
          w = maxW;
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.85);

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
      };
      img.src = evt.target.result;
    };
    reader.readAsDataURL(file);
  }
  window.handleCoverPhotoUpload = handleCoverPhotoUpload;

  function handleProfilePhotoUpload(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(evt) {
      const img = new Image();
      img.onload = function() {
        const canvas = document.createElement('canvas');
        const maxDim = 400;
        let w = img.width;
        let h = img.height;
        if (w > maxDim) {
          h = Math.round((h * maxDim) / w);
          w = maxDim;
        } else if (h > maxDim) {
          w = Math.round((w * maxDim) / h);
          h = maxDim;
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.82);

        APP_STATE.currentUser.avatar = compressedBase64;
        try {
          localStorage.setItem('nn_user_avatar', compressedBase64);
        } catch (_) {}

        // Update all profile avatars in UI immediately
        const profAvatar = document.getElementById('profileAvatarImg');
        const homeHeaderAvatar = document.getElementById('homeHeaderAvatar');
        const editPreview = document.getElementById('editProfAvatarPreview');
        const composerAvatar = document.getElementById('profComposerMiniAvatar');
        if (profAvatar) profAvatar.src = compressedBase64;
        if (homeHeaderAvatar) homeHeaderAvatar.src = compressedBase64;
        if (editPreview) editPreview.src = compressedBase64;
        if (composerAvatar) composerAvatar.src = compressedBase64;

        // Sync photo to Supabase Cloud profile
        if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.saveUserProfile === 'function') {
          window.NN_SUPABASE_SERVICES.saveUserProfile(APP_STATE.currentUser);
        }

        toast('📸 നിങ്ങളുടെ പ്രൊഫൈൽ ഫോട്ടോ വിജയകരമായി മാറ്റം വരുത്തി!');
      };
      img.src = evt.target.result;
    };
    reader.readAsDataURL(file);
  }
  window.handleProfilePhotoUpload = handleProfilePhotoUpload;

  // 15B. ADDITIONAL FORM HANDLERS (DONOR, RENTAL PHOTO UPLOAD, PROFILE EDIT)
  // ==============================================================
  function handleRentalPhotoUpload(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(evt) {
      const img = new Image();
      img.onload = function() {
        const canvas = document.createElement('canvas');
        const maxDim = 800;
        let w = img.width;
        let h = img.height;
        if (w > h && w > maxDim) {
          h = Math.round((h * maxDim) / w);
          w = maxDim;
        } else if (h > maxDim) {
          w = Math.round((w * maxDim) / h);
          h = maxDim;
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.75);

        APP_STATE.tempRentalImage = compressedBase64;
        const previewImg = document.getElementById('rentPhotoPreviewImg');
        const previewWrap = document.getElementById('rentPhotoPreviewWrap');
        const placeholder = document.getElementById('rentPhotoPlaceholder');
        if (previewImg) previewImg.src = compressedBase64;
        if (previewWrap) previewWrap.style.display = 'block';
        if (placeholder) placeholder.style.display = 'none';
      };
      img.src = evt.target.result;
    };
    reader.readAsDataURL(file);
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

    const newDonor = {
      name: name,
      group: group,
      phone: phone,
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

  function openAddRentalModal() {
    const ownerEl = document.getElementById('rentOwner');
    const phoneEl = document.getElementById('rentPhone');
    const locEl = document.getElementById('rentLoc');
    if (ownerEl) ownerEl.value = APP_STATE.currentUser.name;
    if (phoneEl) phoneEl.value = APP_STATE.currentUser.phone;
    if (locEl) locEl.value = APP_STATE.location.name;
    removeRentalPhoto();
    openModal('modal-add-rental');
  }
  window.openAddRentalModal = openAddRentalModal;

  function submitRentalPosting(e) {
    if (e) e.preventDefault();
    const title = document.getElementById('rentTitle').value.trim();
    const type = document.getElementById('rentType').value;
    const rate = document.getElementById('rentRate').value.trim();
    const owner = document.getElementById('rentOwner').value.trim() || APP_STATE.currentUser.name;
    const phone = document.getElementById('rentPhone').value.trim() || APP_STATE.currentUser.phone;
    const loc = document.getElementById('rentLoc').value.trim() || APP_STATE.location.name;

    if (!title || !rate) {
      toast('⚠️ തലക്കെട്ടും വാടകയും നൽകുക.');
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
    } else if (type.includes('ഇലക്ട്രോണിക്സ്')) {
      defaultImg = 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80';
    }

    const newRental = {
      id: 'rent_' + Date.now(),
      title: title,
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
    toast('🏠 വാടക ഇനം വിജയകരമായി ലിസ്റ്റ് ചെയ്തു! ക്ലൗഡിലേക്ക് സേവ് ചെയ്തു.');
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

  function openEditProfileModal(isOnboarding = false) {
    const nameEl = document.getElementById('editProfName');
    const phoneEl = document.getElementById('editProfPhone');
    const locEl = document.getElementById('editProfLoc');
    const bloodEl = document.getElementById('editProfBlood');
    const previewEl = document.getElementById('editProfAvatarPreview');
    const statusEl = document.getElementById('phoneLookupStatus');
    const noticeEl = document.getElementById('profileOnboardingNotice');

    if (noticeEl) {
      noticeEl.style.display = isOnboarding ? 'block' : 'none';
    }
    if (statusEl) statusEl.style.display = 'none';

    if (nameEl) nameEl.value = (APP_STATE.currentUser.name && APP_STATE.currentUser.name !== 'നാട്ടുകാരൻ') ? APP_STATE.currentUser.name : '';
    if (phoneEl) phoneEl.value = APP_STATE.currentUser.phone || '';
    if (locEl) locEl.value = APP_STATE.currentUser.location || APP_STATE.location.name || '';
    if (bloodEl) bloodEl.value = APP_STATE.currentUser.bloodGroup || localStorage.getItem('nn_user_blood') || 'O+';
    const bioEl = document.getElementById('editProfBio');
    if (bioEl) bioEl.value = (APP_STATE.currentUser.bio && APP_STATE.currentUser.bio !== 'നമ്മുടെ നാട് കൂട്ടായ്മ 🌿' && !APP_STATE.currentUser.bio.includes('കണ്ണൂർ')) ? APP_STATE.currentUser.bio : '';
    if (previewEl) previewEl.src = APP_STATE.currentUser.avatar || DEFAULT_USER_AVATAR;

    openModal('modal-edit-profile');
  }
  window.openEditProfileModal = openEditProfileModal;

  let phoneLookupDebounce = null;
  async function checkPhoneProfileLookup(rawPhone) {
    if (phoneLookupDebounce) clearTimeout(phoneLookupDebounce);
    const statusEl = document.getElementById('phoneLookupStatus');

    const digits = String(rawPhone || '').replace(/\D/g, '').slice(-10);
    if (!digits || digits.length < 10) {
      if (statusEl) statusEl.style.display = 'none';
      return;
    }

    phoneLookupDebounce = setTimeout(async () => {
      if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.fetchUserProfile === 'function') {
        if (statusEl) {
          statusEl.textContent = '🔍 ക്ലൗഡ് പ്രൊഫൈൽ പരിശോധിക്കുന്നു...';
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
          if (bloodEl && cloud.blood_group) bloodEl.value = cloud.blood_group;
          const bioEl = document.getElementById('editProfBio');
          if (bioEl && !bioEl.value && cloud.bio) bioEl.value = cloud.bio;
          if (cloud.bio) {
            APP_STATE.currentUser.bio = cloud.bio;
            try { localStorage.setItem('nn_user_bio', cloud.bio); } catch (_) {}
          }
          if (previewEl && cloud.avatar) {
            previewEl.src = cloud.avatar;
            APP_STATE.currentUser.avatar = cloud.avatar;
            try { localStorage.setItem('nn_user_avatar', cloud.avatar); } catch (_) {}
          }

          if (statusEl) {
            statusEl.textContent = `✨ "${cloud.name || 'സുഹൃത്ത്'}" എന്ന പേരിലുള്ള പ്രൊഫൈൽ കണ്ടെത്തി!`;
            statusEl.style.color = '#0E7043';
            statusEl.style.display = 'block';
          }
        } else {
          if (statusEl) {
            statusEl.textContent = '🆕 പുതിയ പ്രൊഫൈൽ ID: usr_' + digits;
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
    const loc = (document.getElementById('editProfLoc').value || '').trim() || APP_STATE.location.name || 'കേരളം';
    const blood = document.getElementById('editProfBlood').value;
    const bio = (document.getElementById('editProfBio')?.value || '').trim() || 'നമ്മുടെ നാട് കൂട്ടായ്മ 🌿';
    const isDonor = document.getElementById('editProfIsDonor')?.checked !== false;

    if (!name) {
      toast('⚠️ ദയവായി നിങ്ങളുടെ പേര് നൽകുക.');
      return;
    }
    if (!phone) {
      toast('⚠️ ദയവായി നിങ്ങളുടെ ഫോൺ നമ്പർ നൽകുക.');
      return;
    }

    // Generate deterministic User ID based on 10-digit phone number
    const phoneDigits = phone ? phone.replace(/\D/g, '').slice(-10) : '';
    if (phoneDigits && phoneDigits.length >= 10) {
      APP_STATE.currentUser.id = 'usr_' + phoneDigits;
      try {
        localStorage.setItem('nn_user_id', phoneDigits);
      } catch (_) {}
    }

    APP_STATE.currentUser.name = name;
    APP_STATE.currentUser.phone = phone;
    APP_STATE.currentUser.location = loc;
    APP_STATE.currentUser.bloodGroup = blood;
    APP_STATE.currentUser.bio = bio;
    APP_STATE.currentUser.isCustomized = true;

    try {
      localStorage.setItem('nn_user_name', name);
      localStorage.setItem('nn_user_phone', phone);
      localStorage.setItem('nn_user_loc', loc);
      localStorage.setItem('nn_user_blood', blood);
      localStorage.setItem('nn_user_bio', bio);
      localStorage.setItem('nn_profile_completed', 'true');
    } catch (_) {}

    // Register user as Blood Donor if opted in
    if (isDonor && blood) {
      if (!Array.isArray(APP_STATE.bloodDonors)) APP_STATE.bloodDonors = [];
      const cleanP = phone.replace(/\D/g, '');
      const existingIdx = APP_STATE.bloodDonors.findIndex(d => (d.phone && d.phone.replace(/\D/g, '') === cleanP) || d.name === name);
      const donorObj = {
        id: 'donor_' + (cleanP || Date.now()),
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

    // Synchronize to Supabase Cloud Profiles
    if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.saveUserProfile === 'function') {
      window.NN_SUPABASE_SERVICES.saveUserProfile(APP_STATE.currentUser);
    }

    closeModal('modal-edit-profile');
    renderProfileScreen();
    updatePostingProfileBar();
    renderHomeScreen();
    toast(`🎉 സ്വാഗതം ${name}! നിങ്ങളുടെ പ്രൊഫൈലും രക്തഗ്രൂപ്പും (${blood}) വിജയകരമായി സേവ് ചെയ്തു.`);
  }
  window.submitProfileUpdate = submitProfileUpdate;

  function handleProfileLogout() {
    if (confirm('നിങ്ങളുടെ പ്രൊഫൈലിൽ നിന്ന് ലോഗ് ഔട്ട് ചെയ്യണോ? (പുതിയ ഫോൺ നമ്പർ നൽകി ഏതുസമയത്തും തിരികെ ലോഗിൻ ചെയ്യാം)')) {
      try {
        localStorage.removeItem('nn_user_name');
        localStorage.removeItem('nn_user_phone');
        localStorage.removeItem('nn_user_id');
        localStorage.removeItem('nn_user_avatar');
        localStorage.removeItem('nn_user_loc');
        localStorage.removeItem('nn_user_blood');
        localStorage.removeItem('nn_user_is_donor');
        localStorage.removeItem('nn_user_cover');
        localStorage.removeItem('nn_user_bio');
      } catch (_) {}

      APP_STATE.currentUser = {
        id: 'usr_me_' + Math.random().toString(36).substring(2, 9),
        name: 'നാട്ടുകാരൻ',
        phone: '',
        location: 'തത്സമയ ലൊക്കേഷൻ',
        bloodGroup: 'O+',
        avatar: DEFAULT_USER_AVATAR,
        isDonor: false,
        isCustomized: false
      };

      renderProfileScreen();
      updatePostingProfileBar();
      renderHomeScreen();
      toast('🚪 വിജയകരമായി ലോഗ് ഔട്ട് ചെയ്തു.');
      openEditProfileModal();
    }
  }
  window.handleProfileLogout = handleProfileLogout;

  // ==============================================================
  // 16. MODAL UTILITIES (OPEN & CLOSE)
  // ==============================================================
  function openModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) {
      el.style.display = 'flex';
      // Trigger transition
      setTimeout(() => el.classList.add('active'), 10);
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
      setTimeout(() => {
        el.style.display = 'none';
      }, 250);
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

    if (fullImg) {
      fullImg.style.transition = 'opacity 0.35s ease';
      fullImg.style.opacity = '0.5';
      setTimeout(() => {
        fullImg.src = ad.art;
        fullImg.style.opacity = '1';
      }, 100);
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
    // Every 4 seconds, rotate smoothly to next ad
    adRotateInterval = setInterval(() => {
      renderAdByIndex(currentAdIndex + 1);
    }, 4000);
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
            <button class="prov-btn-chat" onclick="openChatForService('${srv.id}')" title="ആപ്പ് ചാറ്റ്" style="flex:1;justify-content:center">
              <span>💬</span>
              <span>ആപ്പ് വഴി ചാറ്റ് ചെയ്യാം</span>
            </button>
          </div>
        </div>
      `;
    }).join('');

    renderHomeCommunityFeed();
  }
  window.renderHomeScreen = renderHomeScreen;

  document.addEventListener('DOMContentLoaded', () => {
    initData();
    updateChatBadgeCounter();
    renderHomeScreen();
    renderCommunityFeed();

    // Auto-prompt notification permission for real-time service enquiries & blood alerts
    setTimeout(() => {
      if (typeof requestNotificationPermission === 'function') {
        requestNotificationPermission();
      }
    }, 1200);

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
              if (cloud.name && (!APP_STATE.currentUser.name || APP_STATE.currentUser.name === 'നാട്ടുകാരൻ')) {
                APP_STATE.currentUser.name = cloud.name;
                localStorage.setItem('nn_user_name', cloud.name);
                changed = true;
              }
              if (cloud.avatar && (!APP_STATE.currentUser.avatar || APP_STATE.currentUser.avatar === DEFAULT_USER_AVATAR)) {
                APP_STATE.currentUser.avatar = cloud.avatar;
                localStorage.setItem('nn_user_avatar', cloud.avatar);
                changed = true;
              }
              if (cloud.blood_group && !localStorage.getItem('nn_user_blood')) {
                APP_STATE.currentUser.bloodGroup = cloud.blood_group;
                localStorage.setItem('nn_user_blood', cloud.blood_group);
                changed = true;
              }
              if (cloud.place && !localStorage.getItem('nn_user_loc')) {
                APP_STATE.currentUser.location = cloud.place;
                localStorage.setItem('nn_user_loc', cloud.place);
                changed = true;
              }
              if (changed) {
                renderProfileScreen();
                updatePostingProfileBar();
                renderHomeScreen();
              }
            }
          }
        }
      } catch (_) {}
    }, 1500);

    // Auto-dismiss splash screen after 2.5 seconds if user didn't tap
    setTimeout(() => {
      if (APP_STATE.currentScreen === 'splash') {
        enterAppFromSplash();
      }
    }, 2800);
  });

})();
