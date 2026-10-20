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

  const APP_STATE = {
    currentScreen: 'splash',
    previousScreen: 'home',
    currentUser: {
      id: 'usr_me_' + (localStorage.getItem('nn_user_id') || Math.random().toString(36).substring(2, 9)),
      name: savedUserName || 'നാട്ടുകാരൻ',
      phone: savedUserPhone || '',
      location: localStorage.getItem('nn_user_loc') || 'കണ്ണൂർ, കേരളം',
      bloodGroup: localStorage.getItem('nn_user_blood') || 'O+',
      avatar: savedUserAvatar || DEFAULT_USER_AVATAR,
      isDonor: localStorage.getItem('nn_user_is_donor') === 'true',
      isCustomized: !!savedUserName
    },
    location: {
      name: localStorage.getItem('nn_curr_loc_name') || 'കണ്ണൂർ, കേരളം',
      lat: parseFloat(localStorage.getItem('nn_curr_lat')) || 11.8745,
      lon: parseFloat(localStorage.getItem('nn_curr_lon')) || 75.3704,
      district: localStorage.getItem('nn_curr_district') || 'Kannur'
    },
    radiusFilters: {
      nearby: 5,
      services: 5,
      jobs: 10,
      rentals: 10
    },
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
    serviceRequests: []
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

  // Universal distance resolver for any entity (service, user, donor, job, rental)
  function getItemDistanceKm(item, userLat = null, userLon = null) {
    if (!item) return 1.2;
    const uLat = Number.isFinite(Number(userLat)) ? Number(userLat) : (APP_STATE.location.lat || 11.8745);
    const uLon = Number.isFinite(Number(userLon)) ? Number(userLon) : (APP_STATE.location.lon || 75.3704);
    const coords = extractItemCoordinates(item);
    if (coords) {
      return calculateDistanceKm(uLat, uLon, coords.lat, coords.lon);
    }
    // Safe default distance if coordinates cannot be resolved, preventing NaN or empty query results
    return 2.5;
  }
  window.getItemDistanceKm = getItemDistanceKm;

  // ==============================================================
  // 3. SEED DATA GENERATOR
  // ==============================================================
  const SEED_POSTS = [
    {
      id: 'post_101',
      authorId: 'usr_me_' + (localStorage.getItem('nn_user_id') || 'local'),
      authorName: APP_STATE.currentUser.name,
      authorPhone: APP_STATE.currentUser.phone,
      authorAvatar: APP_STATE.currentUser.avatar,
      authorLocation: 'കണ്ണൂർ ടൗൺ, കണ്ണൂർ',
      authorBlood: 'O+',
      type: 'announcement',
      content: 'നമ്മുടെ നാട്ടിലെ എല്ലാ സുഹൃത്തുക്കൾക്കും നമസ്കാരം! കമ്മ്യൂണിറ്റി ക്ലീനിംഗ് ഡ്രൈവ് അടുത്ത ഞായറാഴ്ച രാവിലെ 7 മണിക്ക് സംഘടിപ്പിക്കുന്നു. എല്ലാവരും പങ്കെടുക്കുമല്ലോ 🌿',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
      timestamp: '5 മിനിറ്റ് മുൻപ്',
      likes: 12,
      isLiked: false,
      isCurrentUser: true,
      lat: 11.8745,
      lon: 75.3704
    },
    {
      id: 'post_102',
      authorId: 'usr_raghavan',
      authorName: 'രാഘവൻ മേനോൻ',
      authorPhone: '+91 98470 12345',
      authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      authorLocation: 'പയ്യാമ്പലം, കണ്ണൂർ',
      authorBlood: 'A+',
      type: 'photo',
      content: 'ഇന്നത്തെ പയ്യാമ്പലം ബീച്ചിലെ അതിമനോഹരമായ സൂര്യാസ്തമയം. നമ്മുടെ കേരളത്തിന്റെ പ്രകൃതിഭംഗി അവാച്യമാണ്! 🌅🌊',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      timestamp: '25 മിനിറ്റ് മുൻപ്',
      likes: 28,
      isLiked: true,
      isCurrentUser: false,
      lat: 11.8720,
      lon: 75.3620
    },
    {
      id: 'post_103',
      authorId: 'usr_deepa',
      authorName: 'ദീപാ കൃഷ്ണൻ',
      authorPhone: '+91 97455 67890',
      authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      authorLocation: 'തോട്ടട, കണ്ണൂർ',
      authorBlood: 'B+',
      type: 'offer',
      content: 'വീട്ടിൽ ഉണ്ടാക്കിയ നല്ല നാടൻ മാങ്ങയച്ചാറും പായസവും ഓർഡർ അനുസരിച്ച് ലഭിക്കുന്നതാണ്. ആവശ്യമുള്ളവർ ബന്ധപ്പെടുക 🥭🍯',
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
      timestamp: '1 മണിക്കൂർ മുൻപ്',
      likes: 19,
      isLiked: false,
      isCurrentUser: false,
      lat: 11.8340,
      lon: 75.4050
    }
  ];

  const SEED_SERVICES = (typeof window !== 'undefined' && ((window.SEED_SERVICES_500 && window.SEED_SERVICES_500.length) || (window.SEED_SERVICES_200 && window.SEED_SERVICES_200.length)))
    ? (window.SEED_SERVICES_500 || window.SEED_SERVICES_200)
    : [
    {
      id: 'srv_1',
      name: 'സന്തോഷ് കുമാർ',
      category: 'electrician',
      trade: 'ഇലക്ട്രീഷ്യൻ & വയറിംഗ്',
      phone: '+91 94471 23456',
      rating: '4.9 (42)',
      experience: '12 വർഷം പ്രവൃത്തിപരിചയം',
      location: 'കണ്ണൂർ സിറ്റി',
      lat: 11.8750,
      lon: 75.3710,
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
      badge: 'വെരിഫൈഡ് പ്രൊവൈഡർ'
    },
    {
      id: 'srv_2',
      name: 'വിനോദ് അലക്സ്',
      category: 'plumber',
      trade: 'പ്ലംബർ & പൈപ്പ് ഫിറ്റിംഗ്',
      phone: '+91 98472 34567',
      rating: '4.8 (38)',
      experience: '9 വർഷം പ്രവൃത്തിപരിചയം',
      location: 'തളാപ്പ്, കണ്ണൂർ',
      lat: 11.8810,
      lon: 75.3650,
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
      badge: '24x7 ലഭ്യമാണ്'
    },
    {
      id: 'srv_3',
      name: 'രമേഷ് ബാബു',
      category: 'driver',
      trade: 'ഓട്ടോ & ടാക്സി ഡ്രൈവർ',
      phone: '+91 97443 45678',
      rating: '4.9 (65)',
      experience: '15 വർഷം ഡ്രൈവിംഗ്',
      location: 'റെയിൽവേ സ്റ്റേഷൻ പരിസരം',
      lat: 11.8710,
      lon: 75.3725,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      badge: 'ഓട്ടോ & ഇനോവ'
    },
    {
      id: 'srv_4',
      name: 'മനോജ് ആശാരി',
      category: 'carpenter',
      trade: 'ആശാരി & ഫർണിച്ചർ വർക്ക്',
      phone: '+91 94004 56789',
      rating: '4.7 (29)',
      experience: '14 വർഷം പ്രവൃത്തിപരിചയം',
      location: 'ചാല, കണ്ണൂർ',
      lat: 11.8520,
      lon: 75.4120,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      badge: 'ഇന്റീരിയർ വർക്ക്സ്'
    },
    {
      id: 'srv_5',
      name: 'ബാബുരാജ് കെ.',
      category: 'painter',
      trade: 'പെയിന്റിംഗ് & പോളിഷിംഗ്',
      phone: '+91 98955 67890',
      rating: '4.8 (34)',
      experience: '8 വർഷം പരിചയം',
      location: 'ചിറക്കൽ, കണ്ണൂർ',
      lat: 11.9050,
      lon: 75.3650,
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
      badge: 'റോയൽ & പ്രീമിയം'
    },
    {
      id: 'srv_6',
      name: 'അനീഷ് എയർകൂൾ',
      category: 'acrepair',
      trade: 'എസി & ഫ്രിഡ്ജ് റിപ്പയർ',
      phone: '+91 96056 78901',
      rating: '4.9 (51)',
      experience: '7 വർഷം സർവീസ്',
      location: 'കണ്ണൂർ ടൗൺ',
      lat: 11.8730,
      lon: 75.3680,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      badge: 'ഡ്രോപ്പ് ഇൻ സർവീസ്'
    },
    {
      id: 'srv_7',
      name: 'ഗ്രീൻ ക്ലീൻ സർവീസ്',
      category: 'cleaning',
      trade: 'ഡീപ് ക്ലീനിംഗ് & മാലിന്യ നിർമാർജനം',
      phone: '+91 94467 89012',
      rating: '4.8 (27)',
      experience: 'ടീം വർക്ക്',
      location: 'കണ്ണൂർ',
      lat: 11.8700,
      lon: 75.3750,
      avatar: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=200&q=80',
      badge: 'സമ്പൂർണ്ണ ക്ലീനിംഗ്'
    },
    {
      id: 'srv_8',
      name: 'മുരളി മേസൺ',
      category: 'mason',
      trade: 'മേസൺ & വാർപ്പ് പണികൾ',
      phone: '+91 98468 90123',
      rating: '4.9 (44)',
      experience: '18 വർഷം കൺസ്ട്രക്ഷൻ',
      location: 'വളപട്ടണം, കണ്ണൂർ',
      lat: 11.9280,
      lon: 75.3620,
      avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=200&q=80',
      badge: 'വീട് നിർമ്മാണം'
    },
    {
      id: 'srv_9',
      name: 'ഷമീർ ഫാബ്രിക്കേഷൻ',
      category: 'welding',
      trade: 'വെൽഡിങ്ങ് & ഗേറ്റ് നിർമ്മാണം',
      phone: '+91 97479 01234',
      rating: '4.7 (31)',
      experience: '10 വർഷം വർക്ക്ഷോപ്പ്',
      location: 'ചൊവ്വ, കണ്ണൂർ',
      lat: 11.8610,
      lon: 75.3950,
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
      badge: 'റൂഫിംഗ് & ഷട്ടർ'
    },
    {
      id: 'srv_10',
      name: 'ശങ്കരൻ കൃഷിക്കാരൻ',
      category: 'gardening',
      trade: 'തോട്ടം പണികൾ & തെങ്ങുകയറ്റം',
      phone: '+91 94950 12345',
      rating: '4.9 (60)',
      experience: 'പരമ്പരാഗത കർഷകൻ',
      location: 'എടക്കാട്, കണ്ണൂർ',
      lat: 11.8150,
      lon: 75.4410,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      badge: 'വിശ്വസ്ത സേവനം'
    },
    {
      id: 'srv_11',
      name: 'രേവതി ബ്യൂട്ടി പാർലർ',
      category: 'beautician',
      trade: 'ബ്രൈഡൽ മേക്കപ്പ് & ബ്യൂട്ടീഷ്യൻ',
      phone: '+91 98471 12399',
      rating: '4.9 (53)',
      experience: 'ഹോം സർവീസ് ലഭ്യമാണ്',
      location: 'കണ്ണൂർ',
      lat: 11.8740,
      lon: 75.3690,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      badge: 'സർട്ടിഫൈഡ്'
    },
    {
      id: 'srv_12',
      name: 'സെക്യൂർ സിസിടിവി വേൾഡ്',
      category: 'cctv',
      trade: 'സിസിടിവി ക്യാമറ & സെക്യൂരിറ്റി ഫിറ്റിംഗ്',
      phone: '+91 94473 34455',
      rating: '4.8 (39)',
      experience: '6 വർഷം ഇൻസ്റ്റലേഷൻ',
      location: 'കണ്ണൂർ സിറ്റി',
      lat: 11.8760,
      lon: 75.3720,
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
      badge: '2 വർഷ വാറന്റി'
    },
    {
      id: 'srv_13',
      name: 'മാലിക കാറ്ററിംഗ്',
      category: 'catering',
      trade: 'സദ്യ, ബിരിയാണി & ഇവന്റ് കുക്കിംഗ്',
      phone: '+91 98462 23344',
      rating: '5.0 (82)',
      experience: '20 വർഷം കാറ്ററിംഗ്',
      location: 'കണ്ണൂർ',
      lat: 11.8720,
      lon: 75.3700,
      avatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=200&q=80',
      badge: 'രുചികരം & ശുചിത്വം'
    },
    {
      id: 'srv_14',
      name: 'ശ്രീ ലക്ഷ്മി ടൈലേഴ്സ്',
      category: 'tailoring',
      trade: 'ലേഡീസ് & ജെന്റ്സ് ടൈലറിംഗ്',
      phone: '+91 97451 98765',
      rating: '4.8 (40)',
      experience: 'കുർത്ത & ബ്ലൗസ് സ്പെഷ്യലിസ്റ്റ്',
      location: 'തളാപ്പ്, കണ്ണൂർ',
      lat: 11.8820,
      lon: 75.3640,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      badge: 'ഫാസ്റ്റ് ഡെലിവറി'
    },
    {
      id: 'srv_15',
      name: 'കെയർ ഹോം നഴ്സിംഗ്',
      category: 'nursing',
      trade: 'ഹോം നഴ്സിംഗ് & വയോജന പരിചരണം',
      phone: '+91 94002 88776',
      rating: '4.9 (47)',
      experience: 'സർട്ടിഫൈഡ് നഴ്സുമാർ',
      location: 'കണ്ണൂർ',
      lat: 11.8780,
      lon: 75.3670,
      avatar: 'https://images.unsplash.com/photo-1594824813586-455b88c227e7?auto=format&fit=crop&w=200&q=80',
      badge: '24 മണിക്കൂർ ഷിഫ്റ്റ്'
    },
    {
      id: 'srv_16',
      name: 'പ്രൊഫ. സുരേഷ് ട്യൂഷൻസ്',
      category: 'tuition',
      trade: 'കണക്ക് & സയൻസ് (8 മുതൽ 12 വരെ)',
      phone: '+91 98950 44332',
      rating: '4.9 (61)',
      experience: '15 വർഷം അധ്യാപകൻ',
      location: 'കണ്ണൂർ ടൗൺ',
      lat: 11.8745,
      lon: 75.3704,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      badge: 'ഓൺലൈൻ & ഓഫ്‌ലൈൻ'
    },
    {
      id: 'srv_17',
      name: 'ശുദ്ധജലം വാട്ടർ സപ്ലൈ',
      category: 'water',
      trade: 'വാട്ടർ ടാങ്കർ സപ്ലൈ (3000L - 6000L)',
      phone: '+91 94474 11223',
      rating: '4.8 (35)',
      experience: 'തൽക്ഷണ ഡെലിവറി',
      location: 'കണ്ണൂർ & പരിസരങ്ങൾ',
      lat: 11.8700,
      lon: 75.3680,
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
      badge: 'ക്ലീൻ ആർഒ വാട്ടർ'
    }
  ];

  const SEED_JOBS = [
    {
      id: 'job_1',
      title: 'ഹെവി ഡ്രൈവർ ആവശ്യം (ടിപ്പർ & ലോറി)',
      employer: 'റോയൽ ട്രാൻസ്പോർട്ട്സ്',
      employerPhone: '+91 94471 99887',
      category: 'driver',
      salary: '₹22,000 - ₹28,000 / മാസം',
      type: 'ഫുൾ ടൈം',
      location: 'കണ്ണൂർ ബൈപ്പാസ്',
      lat: 11.8740,
      lon: 75.3710,
      description: 'ടിപ്പർ ഓടിക്കാൻ പരിചയസമ്പന്നരായ ഹെവി ഡ്രൈവർമാരെ ഉടൻ ആവശ്യമുണ്ട്. താമസം സൗജന്യം.'
    },
    {
      id: 'job_2',
      title: 'ഷോറൂം സെയിൽസ് എക്സിക്യൂട്ടീവ്',
      employer: 'സ്റ്റാർ ഇലക്ട്രോണിക്സ്',
      employerPhone: '+91 98472 88776',
      category: 'sales',
      salary: '₹15,000 - ₹20,000 + ഇൻസെന്റീവ്',
      type: 'ഫുൾ ടൈം',
      location: 'ഫോർട്ട് റോഡ്, കണ്ണൂർ',
      lat: 11.8710,
      lon: 75.3740,
      description: 'ഇലക്ട്രോണിക്സ് ഷോറൂമിൽ കസ്റ്റമർ മാനേജ്മെന്റിനായി സ്ത്രീ/പുരുഷ സെയിൽസ് എക്സിക്യൂട്ടീവ്സ്.'
    },
    {
      id: 'job_3',
      title: 'ഓഫീസ് അക്കൗണ്ടന്റ് (ടാലി പരിചയം)',
      employer: 'ഗ്രീൻവാലി ട്രേഡേഴ്സ്',
      employerPhone: '+91 97453 77665',
      category: 'office',
      salary: '₹18,000 - ₹24,000 / മാസം',
      type: 'ഫുൾ ടൈം',
      location: 'കണ്ണൂർ സിറ്റി',
      lat: 11.8755,
      lon: 75.3695,
      description: 'B.Com ബിരുദവും Tally Prime, GST ഫയലിംഗ് പരിജ്ഞാനവും ഉള്ളവരെ ആവശ്യമുണ്ട്.'
    },
    {
      id: 'job_4',
      title: 'ചൈനീസ് & സൗത്ത് ഇന്ത്യൻ കുക്ക്',
      employer: 'മലബാർ സ്പൈസ് റെസ്റ്റോറന്റ്',
      employerPhone: '+91 94005 66554',
      category: 'hotel',
      salary: '₹25,000 - ₹32,000 / മാസം',
      type: 'ഫുൾ ടൈം (ഭക്ഷണം & താമസം)',
      location: 'സൗത്ത് ബസാർ, കണ്ണൂർ',
      lat: 11.8680,
      lon: 75.3780,
      description: 'പ്രമുഖ റെസ്റ്റോറന്റിലേക്ക് വിദഗ്ദ്ധനായ ചീഫ് കുക്കിനെ അടിയന്തിരമായി ആവശ്യമുണ്ട്.'
    },
    {
      id: 'job_5',
      title: 'ഫുഡ് & പാർസൽ ഡെലിവറി ബോയ്സ്',
      employer: 'ക്വിക്ക്ഡ്രോപ്പ് കണ്ണൂർ',
      employerPhone: '+91 98956 55443',
      category: 'delivery',
      salary: '₹18,000 - ₹25,000 (പ്രതിവാര പേയ്മെന്റ്)',
      type: 'ഫ്ലെക്സിബിൾ ഷിഫ്റ്റ്',
      location: 'കണ്ണൂർ ടൗൺ',
      lat: 11.8745,
      lon: 75.3704,
      description: 'സ്വന്തമായി ഇരുചക്രവാഹനവും ലൈസൻസും ഉള്ളവർക്ക് കണ്ണൂർ സിറ്റിയിൽ പാർട്ട് ടൈം/ഫുൾ ടൈം ജോലി.'
    }
  ];

  const SEED_RENTALS = [
    {
      id: 'rent_me_1',
      title: 'ഹോണ്ട ആക്റ്റീവ 6G സ്കൂട്ടർ വാടകയ്ക്ക് (പ്രതിദിനം)',
      type: 'വാഹനങ്ങൾ',
      rate: '₹350 / ദിവസം',
      owner: APP_STATE.currentUser.name,
      ownerPhone: APP_STATE.currentUser.phone,
      location: 'കണ്ണൂർ സിറ്റി',
      lat: 11.8745,
      lon: 75.3704,
      image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=400&q=80',
      isUserCreated: true
    },
    {
      id: 'rent_1',
      title: 'കോൺക്രീറ്റ് മിക്സർ & വൈബ്രേറ്റർ വാടകയ്ക്ക്',
      type: 'ടൂളുകൾ & യന്ത്രങ്ങൾ',
      rate: '₹800 / ദിവസം',
      owner: 'സുധീർ കൺസ്ട്രക്ഷൻ ഇക്വിപ്മെന്റ്സ്',
      ownerPhone: '+91 94472 11000',
      location: 'കണ്ണൂർ',
      lat: 11.8740,
      lon: 75.3700,
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'rent_2',
      title: 'മഹീന്ദ്ര പിക്കപ്പ് വാഹനം വാടകയ്ക്ക് (വിത്ത് ഡ്രൈവർ)',
      type: 'വാഹനങ്ങൾ',
      rate: '₹1,500 / ട്രിപ്പ്',
      owner: 'ജയൻ ഗുഡ്സ് ട്രാൻസ്പോർട്ട്',
      ownerPhone: '+91 98473 22111',
      location: 'തളാപ്പ്, കണ്ണൂർ',
      lat: 11.8810,
      lon: 75.3650,
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'rent_3',
      title: '3 BHK ആധുനിക വീട് വാടകയ്ക്ക് (കുടുംബങ്ങൾക്ക്)',
      type: 'വാടക വീട് / മുറി',
      rate: '₹14,000 / മാസം',
      owner: 'പ്രഭാകരൻ കെ.',
      ownerPhone: '+91 97454 33222',
      location: 'പയ്യാമ്പലം പരിസരം, കണ്ണൂർ',
      lat: 11.8720,
      lon: 75.3620,
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'rent_4',
      title: 'മഹീന്ദ്ര ട്രാക്ടർ & റോട്ടവേറ്റർ വാടകയ്ക്ക്',
      type: 'ടൂളുകൾ & യന്ത്രങ്ങൾ',
      rate: '₹900 / മണിക്കൂർ',
      owner: 'ഹരിദാസൻ അഗ്രി',
      ownerPhone: '+91 94475 77889',
      location: 'ചിറക്കൽ, കണ്ണൂർ',
      lat: 11.9050,
      lon: 75.3650,
      image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'rent_5',
      title: 'വിവാഹ പന്തൽ, സ്റ്റേജ്, സൗണ്ട് & എൽഇഡി ലൈറ്റ്സ് സെറ്റ്',
      type: 'സ്റ്റേജ് & പന്തൽ',
      rate: '₹12,000 / ദിവസം',
      owner: 'ശ്രീ മൂകാംബിക സൗണ്ട്സ് & ഇവന്റ്സ്',
      ownerPhone: '+91 98478 66778',
      location: 'കണ്ണൂർ ടൗൺ',
      lat: 11.8745,
      lon: 75.3704,
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'rent_6',
      title: 'സോണി A7III 4K ക്യാമറ & ലെൻസുകൾ ഷൂട്ടിംഗിന്',
      type: 'ഇലക്ട്രോണിക്സ്',
      rate: '₹1,500 / ദിവസം',
      owner: 'റോണി മീഡിയ',
      ownerPhone: '+91 97459 55443',
      location: 'തളാപ്പ്, കണ്ണൂർ',
      lat: 11.8810,
      lon: 75.3650,
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80'
    }
  ];

  const SEED_BLOOD_DONORS = [
    { name: 'മുഹമ്മദ് ഷാഫി', group: 'O+', phone: '+91 94471 55443', location: 'കണ്ണൂർ സിറ്റി', lat: 11.8745, lon: 75.3704, status: 'ലഭ്യമാണ്' },
    { name: 'വിജീഷ് പത്മനാഭൻ', group: 'A+', phone: '+91 98472 66554', location: 'തലശ്ശേരി, കണ്ണൂർ', lat: 11.7480, lon: 75.4894, status: 'ലഭ്യമാണ്' },
    { name: 'അഞ്ജലി പ്രസാദ്', group: 'B+', phone: '+91 97453 77665', location: 'പയ്യന്നൂർ, കണ്ണൂർ', lat: 12.1009, lon: 75.2038, status: 'ലഭ്യമാണ്' },
    { name: 'രഞ്ജിത്ത് വർമ്മ', group: 'AB+', phone: '+91 94004 88776', location: 'തളിപ്പറമ്പ്, കണ്ണൂർ', lat: 12.0437, lon: 75.3585, status: 'ലഭ്യമാണ്' },
    { name: 'സുരേഷ് കുമാർ', group: 'O-', phone: '+91 98955 99887', location: 'കണ്ണൂർ ടൗൺ', lat: 11.8745, lon: 75.3704, status: 'അടിയന്തരം' },
    { name: 'ദിവ്യാ മനോജ്', group: 'A-', phone: '+91 96056 11223', location: 'തോട്ടട, കണ്ണൂർ', lat: 11.8340, lon: 75.4050, status: 'ലഭ്യമാണ്' },
    { name: 'അബ്ദുൾ സമദ്', group: 'B-', phone: '+91 94467 22334', location: 'ചൊവ്വ, കണ്ണൂർ', lat: 11.8610, lon: 75.3950, status: 'ലഭ്യമാണ്' },
    { name: 'പ്രവീൺ കൃഷ്ണ', group: 'AB-', phone: '+91 98468 33445', location: 'ചിറക്കൽ, കണ്ണൂർ', lat: 11.9050, lon: 75.3650, status: 'ലഭ്യമാണ്' }
  ];

  // Load from LocalStorage or seed
  function initData() {
    try {
      const storedPosts = localStorage.getItem('nn_posts');
      APP_STATE.posts = storedPosts ? JSON.parse(storedPosts) : SEED_POSTS;

      // Sync community posts from Supabase Cloud (Unlimited posts)
      if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.syncPosts === 'function') {
        window.NN_SUPABASE_SERVICES.syncPosts();
      }

      const storedServices = localStorage.getItem('nn_services');
      let loadedServices = storedServices ? JSON.parse(storedServices) : null;
      const fullCatalog = (typeof window !== 'undefined' && ((window.SEED_SERVICES_500 && window.SEED_SERVICES_500.length) || (window.SEED_SERVICES_200 && window.SEED_SERVICES_200.length)))
        ? (window.SEED_SERVICES_500 || window.SEED_SERVICES_200)
        : SEED_SERVICES;

      if (!loadedServices || loadedServices.length < 450) {
        loadedServices = fullCatalog;
        try {
          localStorage.setItem('nn_services', JSON.stringify(loadedServices));
        } catch (_) {}
      }
      APP_STATE.services = loadedServices;

      // Sync community registered services from Supabase Cloud
      if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.syncServices === 'function') {
        window.NN_SUPABASE_SERVICES.syncServices();
      }
      // Sync blood donors from Supabase Cloud
      if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.syncBloodDonors === 'function') {
        window.NN_SUPABASE_SERVICES.syncBloodDonors();
      }

      const storedJobs = localStorage.getItem('nn_jobs');
      APP_STATE.jobs = storedJobs ? JSON.parse(storedJobs) : SEED_JOBS;

      const storedRentals = localStorage.getItem('nn_rentals');
      APP_STATE.rentals = storedRentals ? JSON.parse(storedRentals) : SEED_RENTALS;

      const storedDonors = localStorage.getItem('nn_blood_donors');
      APP_STATE.bloodDonors = storedDonors ? JSON.parse(storedDonors) : SEED_BLOOD_DONORS;

      const storedRequests = localStorage.getItem('nn_blood_requests');
      APP_STATE.bloodRequests = storedRequests ? JSON.parse(storedRequests) : [];

      const storedChats = localStorage.getItem('nn_chats_store');
      APP_STATE.chats = storedChats ? JSON.parse(storedChats) : {};

      const storedMeta = localStorage.getItem('nn_chats_meta');
      APP_STATE.chatMeta = storedMeta ? JSON.parse(storedMeta) : {};

      // Seed a welcome conversation if no chats exist
      if (Object.keys(APP_STATE.chats).length === 0) {
        const sampleKey = 'chat_919447123456';
        APP_STATE.chats[sampleKey] = [
          {
            id: 'msg_welcome_1',
            sender: 'them',
            text: 'നമസ്കാരം! ഞാൻ സന്തോഷ് കുമാർ (ഇലക്ട്രീഷ്യൻ). എന്തെങ്കിലും സഹായം ആവശ്യമുണ്ടോ? 🌿',
            time: 'ഇന്ന് 10:30 AM'
          }
        ];
        APP_STATE.chatMeta[sampleKey] = {
          name: 'സന്തോഷ് കുമാർ (ഇലക്ട്രീഷ്യൻ)',
          phone: '+91 94471 23456',
          avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80'
        };
        saveChats();
      }

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
        if (!srv.reviews || !srv.reviews.length) {
          srv.reviews = [
            { user: 'രതീഷ് കണ്ണൂർ', rating: 5, date: '2 ദിവസം മുൻപ്', text: 'വളരെ നല്ല സർവീസ്! കൃത്യസമയത്ത് എത്തി പണി പൂർത്തിയാക്കി.' },
            { user: 'സുധീർ കെ.', rating: 5, date: 'കഴിഞ്ഞ ആഴ്ച', text: 'ന്യായമായ കൂലി മാത്രം വാങ്ങി, വളരെ സംതൃപ്തനാണ്.' }
          ];
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

  function saveChats() {
    try {
      localStorage.setItem('nn_chats_store', JSON.stringify(APP_STATE.chats));
      if (APP_STATE.chatMeta) {
        localStorage.setItem('nn_chats_meta', JSON.stringify(APP_STATE.chatMeta));
      }
    } catch (_) {}
  }

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
    } else if (screenId === 'rentals') {
      renderRentalsScreen();
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
        // Auto-detect GPS non-blockingly upon first launch
        setTimeout(() => detectLiveGpsLocation(false), 400);
      }, 300);
    } else {
      navTo('home');
    }
  }
  window.enterAppFromSplash = enterAppFromSplash;

  // ==============================================================
  // 6. GPS LOCATION & REVERSE GEOCODING (NOMINATIM API)
  // ==============================================================
  function updateLocationDisplay(name, district, lat, lon) {
    const validLat = Number.isFinite(Number(lat)) ? Number(lat) : (APP_STATE.location.lat || 11.8745);
    const validLon = Number.isFinite(Number(lon)) ? Number(lon) : (APP_STATE.location.lon || 75.3704);
    const cleanName = (name || APP_STATE.location.name || 'കണ്ണൂർ, കേരളം').trim();
    const cleanDistrict = (district || APP_STATE.location.district || 'Kannur').trim();

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

    const quickLoc = document.getElementById('quickReqLocation');
    if (quickLoc && (!quickLoc.value || quickLoc.value === 'കണ്ണൂർ, കേരളം')) {
      quickLoc.value = cleanName;
    }

    console.info('[Location Updated State]', {
      name: APP_STATE.location.name,
      district: APP_STATE.location.district,
      lat: APP_STATE.location.lat,
      lon: APP_STATE.location.lon
    });

    // Refresh active screen with updated distances
    if (APP_STATE.currentScreen === 'nearby') renderNearbyScreen();
    if (APP_STATE.currentScreen === 'services') renderServicesScreen();
    if (APP_STATE.currentScreen === 'jobs') renderJobsScreen();
    if (APP_STATE.currentScreen === 'rentals') renderRentalsScreen();
  }

  async function reverseGeocode(lat, lon) {
    const validLat = Number.isFinite(Number(lat)) ? Number(lat) : 11.8745;
    const validLon = Number.isFinite(Number(lon)) ? Number(lon) : 75.3704;

    // 1. Try BigDataCloud reverse geocode (fast, CORS-friendly)
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 3200);
      const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${validLat}&longitude=${validLon}&localityLanguage=ml`;
      const res = await fetch(url, { signal: ctrl.signal });
      clearTimeout(timer);
      if (res.ok) {
        const data = await res.json();
        const town = data.locality || data.city || data.principalSubdivision;
        const district = data.principalSubdivision || data.countryName || 'Kerala';
        if (town) {
          const formatted = district && district !== town ? `${town}, ${district}` : town;
          return { formatted, district };
        }
      }
    } catch (_) {}

    // 2. Try OpenStreetMap Nominatim with timeout
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 3500);
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${validLat}&lon=${validLon}&addressdetails=1`;
      const res = await fetch(url, { headers: { 'Accept-Language': 'ml,en' }, signal: ctrl.signal });
      clearTimeout(timer);
      if (res.ok) {
        const data = await res.json();
        const addr = data.address || {};
        const town = addr.suburb || addr.town || addr.village || addr.municipality || addr.city || addr.county || 'കണ്ണൂർ';
        const district = (addr.state_district || addr.district || 'Kerala').replace(' District', '');
        const formatted = `${town}, ${district}`;
        return { formatted, district };
      }
    } catch (err) {
      console.warn('[Nominatim Geocode Error] fallback to nearest Kerala preset:', err.message);
    }

    // 3. Fallback: Find closest Kerala preset by lat/lon
    let closest = KERALA_PRESETS[0];
    let minDist = Infinity;
    KERALA_PRESETS.forEach(p => {
      const d = calculateDistanceKm(validLat, validLon, p.lat, p.lon);
      if (d < minDist) {
        minDist = d;
        closest = p;
      }
    });
    return { formatted: closest.name, district: closest.district };
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
    openModal('modal-location');
  }
  window.openLocationModal = openLocationModal;

  function renderPresetLocationsList() {
    const list = document.getElementById('presetLocationsList');
    if (!list) return;
    list.innerHTML = KERALA_PRESETS.map(p => `
      <div onclick="selectPresetLocation('${p.name.replace(/'/g, "\\'")}', '${p.district}', ${p.lat}, ${p.lon})" 
           style="padding:12px 14px;border-radius:12px;background:#F9FAFB;border:1px solid #E5E7EB;cursor:pointer;display:flex;align-items:center;justify-content:space-between;transition:background 0.2s">
        <span style="font-weight:700;font-size:14px;color:#111827">📍 ${p.name}</span>
        <span style="font-size:11px;background:#ECFDF5;color:#0E7043;padding:3px 8px;border-radius:8px;font-weight:800">${p.district}</span>
      </div>
    `).join('');
  }

  function selectPresetLocation(name, district, lat, lon) {
    updateLocationDisplay(name, district, lat, lon);
    closeModal('modal-location');
    toast(`📍 ലൊക്കേഷൻ സജ്ജീകരിച്ചു: ${name}`);
  }
  window.selectPresetLocation = selectPresetLocation;

  // ==============================================================
  // 7. RADIUS FILTER CHIP HANDLERS
  // ==============================================================
  function setRadiusFilter(module, radiusKm, clickedChip) {
    APP_STATE.radiusFilters[module] = parseFloat(radiusKm);
    const container = clickedChip.parentElement;
    if (container) {
      container.querySelectorAll('.radius-chip').forEach(c => c.classList.remove('active'));
      clickedChip.classList.add('active');
    }

    if (module === 'nearby') renderNearbyScreen();
    if (module === 'services') renderServicesScreen();
    if (module === 'jobs') renderJobsScreen();
    const radiusLabel = radiusKm >= 1000 ? 'മുഴുവൻ കേരളം (All Kerala)' : (radiusKm >= 1 ? radiusKm + ' km' : (radiusKm * 1000) + ' m');
    toast(`🎯 തിരച്ചിൽ പരിധി: ${radiusLabel}`);
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

  function togglePostLike(postId, e) {
    if (e) e.stopPropagation();
    const post = APP_STATE.posts.find(p => p.id === postId);
    if (!post) return;

    post.isLiked = !post.isLiked;
    post.likes += post.isLiked ? 1 : -1;
    savePosts();
    renderCommunityFeed();
  }
  window.togglePostLike = togglePostLike;

  function renderCommunityFeed() {
    const container = document.getElementById('communityFeedContainer');
    if (!container) return;

    if (APP_STATE.posts.length === 0) {
      container.innerHTML = `
        <div style="text-align:center;padding:40px 20px;background:#fff;border-radius:18px;">
          <div style="font-size:36px;margin-bottom:10px">📣</div>
          <h3 style="margin:0 0 6px">ഇതുവരെ പോസ്റ്റുകളൊന്നുമില്ല</h3>
          <p style="font-size:13px;color:#6B7280;margin-bottom:16px">നിങ്ങളുടെ നാട്ടിലെ വിശേഷങ്ങൾ ആദ്യമായി ഇവിടെ പങ്കുവെക്കാം.</p>
          <button onclick="navTo('add')" style="padding:10px 20px;background:#0E7043;color:#fff;border:none;border-radius:12px;font-weight:800;cursor:pointer">➕ പുതിയ പോസ്റ്റ് ഇടാം</button>
        </div>
      `;
      return;
    }

    container.innerHTML = APP_STATE.posts.map(post => {
      const myId = APP_STATE.currentUser && APP_STATE.currentUser.id;
      const myPhone = (APP_STATE.currentUser && APP_STATE.currentUser.phone ? APP_STATE.currentUser.phone.replace(/\D/g, '') : '');
      const postPhone = (post.authorPhone ? post.authorPhone.replace(/\D/g, '') : '');
      const isMine = (myId && post.authorId === myId) || 
                     (myPhone && postPhone && myPhone === postPhone) ||
                     (!post.isCloud && post.isCurrentUser);

      const postSnippet = (post.content || '').replace(/'/g, "\\'").replace(/"/g, '&quot;').substring(0, 35);
      return `
        <article class="fb-card" id="${post.id}">
          <div class="fb-card-header">
            <div class="fb-author-row" onclick="openAuthorProfile('${encodeURIComponent(post.authorName)}', '${encodeURIComponent(post.authorPhone)}', '${encodeURIComponent(post.authorAvatar)}', '${encodeURIComponent(post.authorLocation)}', '${encodeURIComponent(post.authorBlood || 'O+')}', '${post.authorId}')">
              <div class="fb-author-avatar-wrap">
                <img src="${post.authorAvatar || window.DEFAULT_USER_AVATAR}" alt="${post.authorName}" class="fb-author-avatar" onerror="this.src=window.DEFAULT_USER_AVATAR||''">
                <span class="fb-author-online"></span>
              </div>
              <div class="fb-author-meta">
                <div class="fb-author-name">
                  ${post.authorName}
                  <span class="fb-verified-badge" title="വെരിഫൈഡ് അംഗം">✓</span>
                </div>
                <div class="fb-sub-meta">
                  <span>${post.timestamp}</span>
                  <span>•</span>
                  <span class="fb-loc-tag">📍 ${post.authorLocation}</span>
                </div>
              </div>
            </div>

            <div class="fb-header-actions">
              ${isMine ? `
                <div style="display:flex;gap:4px">
                  <button onclick="openEditPostModal('${post.id}')" style="background:#EFF6FF;color:#2563EB;border:1px solid #BFDBFE;padding:5px 8px;border-radius:10px;font-size:11.5px;font-weight:800;cursor:pointer">
                    ✏️ എഡിറ്റ്
                  </button>
                  <button class="fb-delete-btn" onclick="deletePost('${post.id}', event)" title="പോസ്റ്റ് ഡിലീറ്റ് ചെയ്യുക">
                    <span>🗑️</span>
                  </button>
                </div>
              ` : `
                <button onclick="openChatForPost('${post.id}')" 
                        style="background:#ECFDF5;border:1px solid #A7F3D0;color:#0E7043;padding:5px 10px;border-radius:12px;font-size:12px;font-weight:800;cursor:pointer">
                  💬 ചാറ്റ്
                </button>
              `}
            </div>
          </div>

          <div class="fb-post-text">${post.content}</div>

          ${post.image ? `
            <div class="fb-post-image-box">
              <img src="${post.image}" alt="Post attachment" class="fb-post-image" loading="lazy">
            </div>
          ` : ''}

          <div class="fb-action-bar">
            <button class="fb-action-btn ${post.isLiked ? 'liked' : ''}" onclick="togglePostLike('${post.id}', event)">
              <span>${post.isLiked ? '❤️' : '🤍'}</span>
              <span>${post.likes || 0} ലൈക്ക്</span>
            </button>

            <button class="fb-action-btn" onclick="openChatForPost('${post.id}')">
              <span>💬</span>
              <span>ചാറ്റ് ചെയ്യാം</span>
            </button>

            <button class="fb-action-btn" onclick="shareCommunityPost('${post.authorName.replace(/'/g, "\\'")}', '${postSnippet}')">
              <span>🔗</span>
              <span>ഷെയർ</span>
            </button>
          </div>
        </article>
      `;
    }).join('');
  }
  window.renderCommunityFeed = renderCommunityFeed;

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

      <div class="profile-preview-actions">
        <a href="tel:${phone}" class="profile-action-cta call">
          <span>📞</span>
          <span>വിളിക്കുക</span>
        </a>
        <button onclick="closeModal('modal-author-profile'); openChatModal('${name.replace(/'/g, "\\'")}', '${phone}', '${avatar}', 'ഹലോ ${name.replace(/'/g, "\\'")}', '${authorId}')" class="profile-action-cta chat">
          <span>💬</span>
          <span>ചാറ്റ് ചെയ്യാം</span>
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
  // 10. REALTIME 1-ON-1 IN-APP CLOUD CHAT ENGINE (FIREBASE RTDB)
  // ==============================================================
  function computeChatKey(id1, phone1, name1, id2, phone2, name2) {
    function sanitize(s) {
      if (!s) return '';
      return String(s).replace(/[^a-zA-Z0-9]/g, '');
    }
    const clean1 = (phone1 ? phone1.replace(/\D/g, '') : '') || sanitize(id1) || sanitize(name1) || 'user1';
    const clean2 = (phone2 ? phone2.replace(/\D/g, '') : '') || sanitize(id2) || sanitize(name2) || 'user2';
    return 'chat_' + [clean1, clean2].sort().join('_');
  }

  function openChatModal(recipientName, recipientPhone, recipientAvatar, initialContext, recipientId) {
    const safeName = recipientName || 'പ്രാദേശിക സുഹൃത്ത്';
    const safePhone = recipientPhone || '';
    const safeAvatar = recipientAvatar || DEFAULT_USER_AVATAR;

    // Compute symmetric chat key so both users land in the identical Firebase conversation
    const chatKey = computeChatKey(
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
      recipientId: recipientId || ''
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

    // Initialize thread in memory
    if (!APP_STATE.chats[chatKey]) {
      APP_STATE.chats[chatKey] = [];
    }

    // Attach inquiry context if not already present
    if (initialContext) {
      const thread = APP_STATE.chats[chatKey];
      const hasCtx = thread.some(m => m.text && m.text.includes(initialContext));
      if (!hasCtx) {
        thread.push({
          id: 'msg_ctx_' + Date.now(),
          sender: 'me',
          senderName: APP_STATE.currentUser.name,
          text: `📌 അന്വേഷണം: ${initialContext}`,
          time: 'ഇപ്പോൾ',
          timestamp: Date.now()
        });
        saveChats();
      }
    }

    renderChatMessages();
    openModal('modal-chat');

    // Subscribe to live Supabase Cloud messages for this thread
    if (typeof window._activeChatUnsubscribe === 'function') {
      try { window._activeChatUnsubscribe(); } catch (_) {}
      window._activeChatUnsubscribe = null;
    }

    if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.subscribeChatThread === 'function') {
      window._activeChatUnsubscribe = window.NN_SUPABASE_SERVICES.subscribeChatThread(chatKey, (cloudMsgs) => {
        if (Array.isArray(cloudMsgs) && cloudMsgs.length > 0) {
          const myId = APP_STATE.currentUser.id;
          const myCleanPhone = (APP_STATE.currentUser.phone ? APP_STATE.currentUser.phone.replace(/\D/g, '') : '');
          APP_STATE.chats[chatKey] = cloudMsgs.map(m => {
            const mPhone = (m.senderPhone ? m.senderPhone.replace(/\D/g, '') : '');
            const isMe = (m.senderId === myId) || (myCleanPhone && mPhone && mPhone === myCleanPhone);
            return {
              id: m.id || ('msg_' + Date.now()),
              sender: isMe ? 'me' : 'them',
              senderName: m.senderName || '',
              text: m.text,
              time: m.time || 'ഇപ്പോൾ',
              timestamp: m.timestamp || Date.now()
            };
          });
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

  function renderChatMessages() {
    const box = document.getElementById('chatMessagesBox');
    if (!box || !APP_STATE.activeChatRecipient) return;

    const chatKey = APP_STATE.activeChatRecipient.key;
    const thread = APP_STATE.chats[chatKey] || [];

    if (thread.length === 0) {
      box.innerHTML = `
        <div style="text-align:center;padding:30px 16px;background:#F9FAFB;border-radius:14px;margin:12px 0">
          <div style="font-size:32px;margin-bottom:8px">🌿</div>
          <div style="font-weight:800;font-size:14px;color:#111827">${escapeHtml(APP_STATE.activeChatRecipient.name)}</div>
          <p style="font-size:12px;color:#6B7280;margin:6px 0 0">നേരിട്ടുള്ള തത്സമയ സംഭാഷണം ആരംഭിക്കൂ. സന്ദേശങ്ങൾ ഫയർബേസ് ക്ലൗഡിലൂടെ കൈമാറുന്നു.</p>
        </div>
      `;
      return;
    }

    box.innerHTML = thread.map(msg => `
      <div class="chat-bubble ${msg.sender === 'me' ? 'outgoing' : 'incoming'}">
        <div style="word-break:break-word">${escapeHtml(msg.text)}</div>
        <span class="chat-time-text">${msg.time}</span>
      </div>
    `).join('');

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
      senderName: senderName,
      text: text,
      time: timeStr,
      timestamp: Date.now()
    });

    if (input) input.value = '';
    saveChats();
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

    // Realistic responsive service provider handling for catalog listings
    const recipient = APP_STATE.activeChatRecipient;
    const isCatalogService = recipient && (
      (APP_STATE.services || []).some(s => (s.phone && recipient.phone && s.phone === recipient.phone) || (s.id && recipient.id && s.id === recipient.id)) ||
      (APP_STATE.bloodDonors || []).some(d => (d.phone && recipient.phone && d.phone === recipient.phone))
    );

    if (isCatalogService) {
      setTimeout(() => {
        if (APP_STATE.activeChatRecipient && APP_STATE.activeChatRecipient.key === chatKey) {
          let reply = 'ശരി, തീർച്ചയായും! ഉടൻ തന്നെ കൂടുതൽ വിവരങ്ങൾ അറിയിക്കാം.';
          const lower = text.toLowerCase();
          if (lower.includes('ലഭ്യമാണോ') || lower.includes('free') || lower.includes('ഒഴിവ്')) {
            reply = 'അതെ, ഇപ്പോൾ ഒഴിവുണ്ട്. എന്താണ് ചെയ്യേണ്ടത് എന്ന് പറയാമോ?';
          } else if (lower.includes('റേറ്റ്') || lower.includes('കൂലി') || lower.includes('ചാർജ്') || lower.includes('രൂപ') || lower.includes('എത്ര')) {
            reply = 'സാധാരണ ₹200 വിസിറ്റിംഗ് ചാർജ് ആണ്. പണി കണ്ട ശേഷം ന്യായമായ കൂലി പറയാം.';
          } else if (lower.includes('സ്ഥലം') || lower.includes('എവിടെ') || lower.includes('ലൊക്കേഷൻ')) {
            reply = `ഞാൻ ${recipient.location || 'സമീപത്ത്'} ഉണ്ട്. നിങ്ങളുടെ ലൊക്കേഷൻ പറയാമോ?`;
          } else if (lower.includes('നാളെ') || lower.includes('സമയം') || lower.includes('ഇന്ന്')) {
            reply = 'ശരി, കൃത്യസമയത്ത് വരാൻ സാധിക്കും. വിലാസം അയച്ചു തരൂ.';
          } else if (lower.includes('ഫോൺ') || lower.includes('നമ്പർ') || lower.includes('വിളിക്ക')) {
            reply = recipient.phone ? `എന്റെ നമ്പർ: ${recipient.phone} ആണ്. നേരിട്ട് വിളിക്കാം 📞` : 'തീർച്ചയായും, ഉടൻ ബന്ധപ്പെടാം!';
          } else {
            const generalReplies = [
              'ശരി, തീർച്ചയായും സഹായിക്കാം!',
              'നന്ദി, ഉടൻ തന്നെ വിശദാംശങ്ങൾ അയക്കാം.',
              'തീർച്ചയായും! ഇതിനായി ഞാൻ തയ്യാറാണ്.',
              'ശരി സുഹൃത്തേ, ഉടൻ ബന്ധപ്പെടാം.'
            ];
            reply = generalReplies[Math.floor(Math.random() * generalReplies.length)];
          }

          const replyId = 'msg_reply_' + Date.now();
          const replyObj = {
            id: replyId,
            senderId: recipient.id || recipient.phone,
            senderName: recipient.name,
            senderPhone: recipient.phone,
            senderAvatar: recipient.avatar,
            text: reply,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            timestamp: Date.now()
          };

          APP_STATE.chats[chatKey].push({
            id: replyId,
            sender: 'them',
            senderName: recipient.name,
            text: reply,
            time: replyObj.time,
            timestamp: Date.now()
          });

          saveChats();
          renderChatMessages();

          if (typeof window !== 'undefined' && window.NN_FIREBASE_SERVICES && typeof window.NN_FIREBASE_SERVICES.sendChatMessage === 'function') {
            window.NN_FIREBASE_SERVICES.sendChatMessage(chatKey, replyObj, null);
          }
        }
      }, 900);
    }
  }
  window.sendChatMessage = sendChatMessage;

  function sendQuickReply(text) {
    const input = document.getElementById('chatInputMessage');
    if (input) input.value = text;
    sendChatMessage();
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
    openChatModal(post.authorName, post.authorPhone, post.authorAvatar, `പോസ്റ്റ്: "${snippet}..."`, post.authorId);
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
    openChatModal(srv.name, srv.phone, srv.avatar, `സേവന അന്വേഷണം: ${srv.trade} (${srv.location})`, srv.id);
  }
  window.openChatForService = openChatForService;

  function openChatForJob(jobId) {
    const j = (APP_STATE.jobs || []).find(item => item.id === jobId);
    if (!j) return;
    openChatModal(j.employer, j.employerPhone, DEFAULT_USER_AVATAR, `തൊഴിൽ അന്വേഷണം: ${j.title} (${j.salary})`, j.id);
  }
  window.openChatForJob = openChatForJob;

  function openChatForRental(rentId) {
    const r = (APP_STATE.rentals || []).find(item => item.id === rentId);
    if (!r) return;
    openChatModal(r.owner, r.ownerPhone, r.image || DEFAULT_USER_AVATAR, `വാടക അന്വേഷണം: ${r.title} (${r.rate})`, r.id);
  }
  window.openChatForRental = openChatForRental;

  function openChatForDonor(name, phone, group) {
    openChatModal(name, phone, DEFAULT_USER_AVATAR, `രക്തദാന അന്വേഷണം: ${group}`, 'donor_' + (phone ? phone.replace(/\D/g, '') : name));
  }
  window.openChatForDonor = openChatForDonor;

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

  function renderChatListScreen() {
    const container = document.getElementById('chatThreadsList');
    if (!container) return;

    const keys = Object.keys(APP_STATE.chats).filter(k => APP_STATE.chats[k] && APP_STATE.chats[k].length > 0);
    if (keys.length === 0) {
      container.innerHTML = `
        <div style="text-align:center;padding:50px 20px;background:#fff;border-radius:18px;">
          <div style="font-size:40px;margin-bottom:10px">💬</div>
          <h3 style="margin:0 0 6px">സന്ദേശങ്ങളൊന്നുമില്ല</h3>
          <p style="font-size:13px;color:#6B7280;margin-bottom:16px">നാട്ടുകാരുമായോ സേവനദാതാക്കളുമായോ ലൈവ് ചാറ്റ് ആരംഭിക്കൂ.</p>
          <button onclick="navTo('services')" style="padding:10px 20px;background:#0E7043;color:#fff;border:none;border-radius:12px;font-weight:800;cursor:pointer">പ്രാദേശിക സേവനങ്ങൾ കാണുക</button>
        </div>
      `;
      return;
    }

    container.innerHTML = keys.map(k => {
      const thread = APP_STATE.chats[k] || [];
      const meta = (APP_STATE.chatMeta && APP_STATE.chatMeta[k]) || {
        name: k.replace('chat_', ''),
        phone: '',
        avatar: DEFAULT_USER_AVATAR
      };
      const lastMsg = thread[thread.length - 1] || { text: 'No messages', time: '' };
      return `
        <div onclick="openChatModal('${meta.name.replace(/'/g, "\\'")}', '${meta.phone}', '${meta.avatar || DEFAULT_USER_AVATAR}', '', '${meta.recipientId || ''}')"
             style="display:flex;align-items:center;gap:12px;padding:12px 14px;background:#fff;border-radius:16px;border:1px solid #E2E8F0;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,0.03);margin-bottom:8px;transition:background 0.15s ease">
          <img src="${meta.avatar || DEFAULT_USER_AVATAR}" style="width:48px;height:48px;border-radius:50%;object-fit:cover;border:2px solid #E2E8F0;flex-shrink:0" onerror="this.src=window.DEFAULT_USER_AVATAR||''">
          <div style="flex:1;min-width:0">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px">
              <span style="font-weight:800;font-size:14px;color:#0F172A">${escapeHtml(meta.name)}</span>
              <span style="font-size:11px;color:#64748B">${lastMsg.time}</span>
            </div>
            <div style="font-size:12px;color:#475569;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(lastMsg.text)}</div>
          </div>
        </div>
      `;
    }).join('');
  }
  window.renderChatListScreen = renderChatListScreen;

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
    { id: 'acrepair', name: 'എസി റിപ്പയർ', icon: '❄️' },
    { id: 'cleaning', name: 'ക്ലീനിംഗ്', icon: '🧹' },
    { id: 'mason', name: 'മേസൺ & വാർപ്പ്', icon: '🧱' },
    { id: 'welding', name: 'വെൽഡിങ്ങ്', icon: '🔥' },
    { id: 'gardening', name: 'കൃഷി & തോട്ടം', icon: '🌴' },
    { id: 'beautician', name: 'ബ്യൂട്ടീഷ്യൻ', icon: '💄' },
    { id: 'cctv', name: 'സിസിടിവി', icon: '📹' },
    { id: 'catering', name: 'കാറ്ററിംഗ്', icon: '🍲' },
    { id: 'tailoring', name: 'ടൈലറിംഗ്', icon: '🧵' },
    { id: 'nursing', name: 'ഹോം നഴ്സിംഗ്', icon: '🩺' },
    { id: 'tuition', name: 'ട്യൂഷൻ', icon: '📚' },
    { id: 'water', name: 'വാട്ടർ സപ്ലൈ', icon: '💧' }
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

    // Try within active radius
    let list = allMatching.filter(srv => srv._calculatedDist <= maxRadius);
    let extendedNotice = '';

    // If active category or query has results but outside strict radius, display them nearest-first so icons never break!
    if (list.length === 0 && allMatching.length > 0) {
      list = allMatching;
      extendedNotice = `
        <div style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:12px;padding:8px 12px;font-size:12px;color:#166534;font-weight:700;display:flex;align-items:center;gap:6px;margin-bottom:6px">
          <span>📍</span>
          <span>നിങ്ങളുടെ നിലവിലെ ${maxRadius}km പരിധിക്ക് പുറത്തുള്ള ലഭ്യമായ പ്രൊവൈഡർമാരെ താഴെ കാണിക്കുന്നു:</span>
        </div>
      `;
    }

    if (list.length === 0) {
      container.innerHTML = `
        <div style="text-align:center;padding:40px 20px;background:#fff;border-radius:18px;">
          <div style="font-size:36px;margin-bottom:10px">🔍</div>
          <h3 style="margin:0 0 6px">ഈ വിഭാഗത്തിൽ സേവനങ്ങളൊന്നും കണ്ടെത്തിയില്ല</h3>
          <p style="font-size:13px;color:#6B7280;margin-bottom:16px">പുതിയ സർവീസ് പ്രൊവൈഡറായി ഇപ്പോൾ തന്നെ രജിസ്റ്റർ ചെയ്യാം.</p>
          <button onclick="openAddServiceModal()" style="padding:10px 20px;background:#0E7043;color:#fff;border:none;border-radius:12px;font-weight:800;cursor:pointer">➕ പുതിയ സേവനം രജിസ്റ്റർ ചെയ്യാം</button>
        </div>
      `;
      return;
    }

    container.innerHTML = extendedNotice + list.map(srv => {
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
                <span>📍 ${srv.location}</span>
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

          <!-- DIRECT ACTIONS: PHONE CALL & IN-APP CHAT (NO WHATSAPP) -->
          <div class="service-actions-row" onclick="event.stopPropagation()">
            <a href="tel:${srv.phone}" class="prov-btn-call" title="നേരിട്ട് വിളിക്കുക">
              <span>📞</span>
              <span>വിളിക്കുക</span>
            </a>
            <button class="prov-btn-chat" onclick="openChatForService('${srv.id}')" title="ആപ്പ് ചാറ്റ്">
              <span>💬</span>
              <span>ആപ്പ് ചാറ്റ്</span>
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
            <div style="font-size:0.78rem;opacity:0.9;margin-top:3px">📍 ${srv.location} • <b style="color:#A7F3D0">${dist} km അകലെ</b></div>
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

        <!-- DIRECT ACTIONS (CALL & APP CHAT ONLY - NO WHATSAPP) -->
        <div style="display:flex;gap:10px;margin-top:4px">
          <a href="tel:${srv.phone}" class="prov-btn-call" style="padding:12px;font-size:0.92rem;border-radius:14px">
            <span>📞</span>
            <span>നേരിട്ട് വിളിക്കുക</span>
          </a>
          <button class="prov-btn-chat" style="padding:12px;font-size:0.92rem;border-radius:14px" onclick="closeModal('modal-service-detail'); openChatForService('${srv.id}')">
            <span>💬</span>
            <span>ആപ്പ് ചാറ്റ് ചെയ്യാം</span>
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
    const loc = document.getElementById('regServiceLoc').value.trim() || APP_STATE.location.name;

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

    if (locInput) locInput.value = APP_STATE.location.name || 'കണ്ണൂർ, കേരളം';
    if (phoneInput) phoneInput.value = APP_STATE.currentUser.phone || '+91 98470 00000';
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
    if (!container) return;

    const activeReq = (APP_STATE.serviceRequests || []).find(r => r.status === 'broadcasting' || r.status === 'accepted');

    if (!activeReq) {
      container.innerHTML = '';
      return;
    }

    if (activeReq.status === 'broadcasting') {
      container.innerHTML = `
        <div class="home-service-tracker-card" style="border-color:#FCD34D;background:#FFFBEB">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span class="tracker-status-badge broadcasting">
              <span class="loc-spin-icon" style="display:inline-block">⚡</span>
              <span>വർക്കർമാരെ അറിയിച്ചു...</span>
            </span>
            <button onclick="cancelServiceRequest('${activeReq.id}')" style="background:none;border:none;color:#92400E;font-size:0.75rem;font-weight:700;cursor:pointer">
              ❌ റദ്ദാക്കാം
            </button>
          </div>
          <div style="display:flex;align-items:flex-start;gap:10px">
            <div style="font-size:26px;line-height:1">${activeReq.categoryIcon}</div>
            <div>
              <div style="font-weight:800;font-size:0.95rem;color:#78350F">${activeReq.categoryName} ആവശ്യം</div>
              <div style="font-size:0.8rem;color:#92400E;margin-top:2px">${escapeHtml(activeReq.description)}</div>
              <div style="font-size:0.72rem;color:#B45309;margin-top:4px">📍 ${activeReq.location} • സമയം: ${activeReq.timeFormatted}</div>
            </div>
          </div>
          <div style="background:#FEF3C7;border-radius:10px;padding:8px 12px;font-size:0.75rem;color:#92400E;font-weight:700;text-align:center">
            🕒 അടുത്തുള്ള വർക്കർമാർ ഉടൻ ബന്ധപ്പെടും. ദയവായി കാത്തിരിക്കുക...
          </div>
        </div>
      `;
    } else if (activeReq.status === 'accepted' && activeReq.worker) {
      const w = activeReq.worker;
      container.innerHTML = `
        <div class="home-service-tracker-card">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span class="tracker-status-badge accepted">
              <span>✅</span>
              <span>വർക്ക് സ്വീകരിച്ചു!</span>
            </span>
            <button onclick="completeServiceRequest('${activeReq.id}')" style="background:#059669;color:#fff;border:none;border-radius:8px;padding:4px 10px;font-size:0.72rem;font-weight:800;cursor:pointer">
              ✅ പൂർത്തിയായി
            </button>
          </div>
          <div style="display:flex;align-items:center;gap:12px">
            <img src="${w.avatar}" alt="${w.name}" style="width:52px;height:52px;border-radius:50%;object-fit:cover;border:2px solid #059669" onerror="this.src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'">
            <div style="flex:1">
              <div style="display:flex;align-items:center;gap:6px">
                <span style="font-weight:800;font-size:0.95rem;color:#0F172A">${w.name}</span>
                <span style="font-size:0.7rem;background:#ECFDF5;color:#059669;padding:1px 6px;border-radius:6px;font-weight:800">★ ${w.rating}</span>
              </div>
              <div style="font-size:0.8rem;color:#0F766E;font-weight:700">${w.trade}</div>
              <div style="font-size:0.72rem;color:#64748B;margin-top:2px">ആവശ്യം: ${escapeHtml(activeReq.description)}</div>
            </div>
          </div>
          <!-- DIRECT ACTIONS (NO WHATSAPP - CALL & APP CHAT ONLY) -->
          <div class="service-actions-row">
            <a href="tel:${w.phone}" class="prov-btn-call" title="വിളിക്കുക">
              <span>📞</span>
              <span>നേരിട്ട് വിളിക്കുക</span>
            </a>
            <button class="prov-btn-chat" onclick="openChatModal('${w.name.replace(/'/g, "\\'")}', '${w.phone}', '${w.avatar}', 'സേവന അഭ്യർത്ഥന: ${escapeHtml(activeReq.description)}')">
              <span>💬</span>
              <span>ആപ്പ് ചാറ്റ്</span>
            </button>
          </div>
        </div>
      `;
    }
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

    let list = APP_STATE.bloodDonors;
    if (APP_STATE.activeBloodGroup !== 'all') {
      list = list.filter(d => d.group === APP_STATE.activeBloodGroup);
    }

    container.innerHTML = list.map(d => `
      <div style="background:#fff;border-radius:16px;padding:14px;border:1px solid #FECACA;display:flex;align-items:center;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.03)">
        <div style="display:flex;align-items:center;gap:12px">
          <div style="width:44px;height:44px;border-radius:50%;background:#FEF2F2;color:#DC2626;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:15px;border:2px solid #FCA5A5">
            ${d.group}
          </div>
          <div>
            <div style="font-weight:800;font-size:14px;color:#111827">${d.name}</div>
            <div style="font-size:11px;color:#6B7280">📍 ${d.location} • <span style="color:#10B981;font-weight:700">${d.status}</span></div>
          </div>
        </div>

        <div style="display:flex;gap:6px">
          <a href="tel:${d.phone}" style="background:#10B981;color:#fff;padding:8px 12px;border-radius:10px;text-decoration:none;font-size:12px;font-weight:800">📞 Call</a>
          <button onclick="openChatForDonor('${d.name.replace(/'/g, "\\'")}', '${d.phone}', '${d.group}')" style="background:#DC2626;color:#fff;border:none;padding:8px 12px;border-radius:10px;cursor:pointer;font-size:12px;font-weight:800">💬 Chat</button>
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
    const patient = document.getElementById('bReqPatient').value.trim();
    const hospital = document.getElementById('bReqHospital').value.trim();
    const group = document.getElementById('bReqGroup').value;
    const units = document.getElementById('bReqUnits').value.trim() || '1';
    const phone = document.getElementById('bReqPhone').value.trim();

    if (!patient || !hospital || !phone) {
      toast('⚠️ ദയവായി രോഗിയുടെ പേര്, ഹോസ്പിറ്റൽ, ഫോൺ നൽകുക.');
      return;
    }

    // Automatically create an urgent post in Community Feed as well
    const urgentPost = {
      id: 'post_blood_' + Date.now(),
      authorId: APP_STATE.currentUser.id,
      authorName: APP_STATE.currentUser.name,
      authorPhone: phone,
      authorAvatar: APP_STATE.currentUser.avatar,
      authorLocation: hospital,
      authorBlood: group,
      type: 'announcement',
      content: `🚨 അടിയന്തര രക്ത ആവശ്യം (URGENT BLOOD REQUIRED) 🩸\n\nരോഗി: ${patient}\nരക്തഗ്രൂപ്പ്: ${group} (${units} യൂണിറ്റ്)\nആശുപത്രി: ${hospital}\nബന്ധപ്പെടേണ്ട നമ്പർ: ${phone}\n\nദയവായി ആർക്കെങ്കിലും നൽകാൻ സാധിക്കുമെങ്കിൽ ഉടൻ ബന്ധപ്പെടുക!`,
      image: '',
      timestamp: 'ഇപ്പോൾ',
      likes: 0,
      isLiked: false,
      isCurrentUser: true,
      lat: APP_STATE.location.lat,
      lon: APP_STATE.location.lon
    };

    APP_STATE.posts.unshift(urgentPost);
    savePosts();

    // Broadcast blood request to Supabase
    if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.saveBloodRequest === 'function') {
      window.NN_SUPABASE_SERVICES.saveBloodRequest({
        patientName: patient,
        group: grp,
        units: units,
        hospital: hospital,
        phone: phone,
        neededBy: date,
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

  function openEmergencyModal() {
    openModal('modal-emergency');
  }
  window.openEmergencyModal = openEmergencyModal;

  function openAmbulanceModal() {
    openModal('modal-ambulance');
  }
  window.openAmbulanceModal = openAmbulanceModal;

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

    let filteredJobs = allMatchingJobs.filter(j => j._calculatedDist <= maxRadius);
    let extendedNotice = '';

    if (filteredJobs.length === 0 && allMatchingJobs.length > 0) {
      filteredJobs = allMatchingJobs;
      extendedNotice = `
        <div style="background:#EFF6FF;border:1px solid #BFDBFE;border-radius:12px;padding:8px 12px;font-size:12px;color:#1E40AF;font-weight:700;display:flex;align-items:center;gap:6px">
          <span>📍</span>
          <span>നിങ്ങളുടെ ${maxRadius}km പരിധിക്ക് പുറത്തുള്ള ലഭ്യമായ തൊഴിലുകൾ താഴെ കാണിക്കുന്നു:</span>
        </div>
      `;
    }

    if (filteredJobs.length === 0) {
      jobsListEl.innerHTML = `
        <div style="text-align:center;padding:36px 16px;background:#fff;border-radius:16px;">
          <div style="font-size:36px;margin-bottom:8px">💼</div>
          <h3 style="margin:0 0 6px;color:#111827">തൊഴിൽ അവസരങ്ങളൊന്നും കണ്ടെത്തിയില്ല</h3>
          <p style="color:#6B7280;margin:0 0 14px;font-size:13px">പുതിയ തൊഴിൽ പോസ്റ്റ് ചെയ്യുകയോ വിഭാഗം മാറ്റി നോക്കുകയോ ചെയ്യാം.</p>
          <button onclick="openPostJobModal()" style="background:#0878D1;color:#fff;border:none;border-radius:10px;padding:8px 16px;font-weight:800;font-size:12px;cursor:pointer">➕ തൊഴിൽ നൽകാം</button>
        </div>
      `;
    } else {
      jobsListEl.innerHTML = extendedNotice + filteredJobs.map(j => `
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
                    style="background:#E0F2FE;color:#0369A1;border:1px solid #BAE6FD;padding:10px 14px;border-radius:10px;font-weight:800;font-size:13px;cursor:pointer">
              💬 Chat
            </button>
            <a href="tel:${j.employerPhone}" style="background:#F0FDF4;color:#15803D;border:1px solid #BBF7D0;padding:10px 14px;border-radius:10px;font-weight:800;font-size:13px;text-decoration:none;display:flex;align-items:center">
              📞 Call
            </a>
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

    let filteredRentals = allMatchingRentals.filter(r => r._calculatedDist <= maxRadius);
    let extendedNotice = '';

    if (filteredRentals.length === 0 && allMatchingRentals.length > 0) {
      filteredRentals = allMatchingRentals;
      extendedNotice = `
        <div style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:12px;padding:8px 12px;font-size:12px;color:#166534;font-weight:700;display:flex;align-items:center;gap:6px">
          <span>📍</span>
          <span>നിങ്ങളുടെ ${maxRadius}km പരിധിക്ക് പുറത്തുള്ള ലഭ്യമായ വാടക ഇനങ്ങൾ താഴെ കാണിക്കുന്നു:</span>
        </div>
      `;
    }

    if (filteredRentals.length === 0) {
      rentalsListEl.innerHTML = `
        <div style="text-align:center;padding:36px 16px;background:#fff;border-radius:16px;">
          <div style="font-size:36px;margin-bottom:8px">🏠</div>
          <h3 style="margin:0 0 6px;color:#111827">വാടക / വിൽപന ഇനങ്ങൾ കണ്ടെത്തിയില്ല</h3>
          <p style="color:#6B7280;margin:0 0 14px;font-size:13px">റേഡിയസ് ഫിൽട്ടർ കൂട്ടി നോക്കുകയോ നിങ്ങളുടെ വസ്തുക്കൾ ഇവിടെ ലിസ്റ്റ് ചെയ്യുകയോ ചെയ്യാം.</p>
          <button onclick="openAddRentalModal()" style="background:#0E7043;color:#fff;border:none;border-radius:10px;padding:8px 16px;font-weight:800;font-size:12px;cursor:pointer">➕ ലിസ്റ്റ് ചെയ്യാം</button>
        </div>
      `;
    } else {
      rentalsListEl.innerHTML = extendedNotice + filteredRentals.map(r => `
        <div class="job-card">
          ${r.image ? `<img src="${r.image}" style="width:100%;height:160px;object-fit:cover;border-radius:12px;margin-bottom:8px">` : ''}
          <div style="display:flex;justify-content:space-between;align-items:flex-start">
            <h3 style="margin:0 0 4px;font-size:15px;color:#111827">${r.title}</h3>
            <span style="background:#FEF3C7;color:#B45309;padding:4px 8px;border-radius:8px;font-size:12px;font-weight:800">${r.rate}</span>
          </div>
          <div style="font-size:11px;background:#F0FDF4;color:#166534;padding:3px 8px;border-radius:6px;align-self:flex-start;font-weight:700">${r.type || 'വാടക & വിൽപന'}</div>
          <div style="font-size:12px;color:#6B7280">ഉടമസ്ഥൻ: ${r.owner} • 📍 ${r.location} • <span style="color:#0E7043;font-weight:700">${r._calculatedDist || 1.2} km അകലെ</span></div>
          <div style="display:flex;gap:8px;margin-top:6px">
            <a href="tel:${r.ownerPhone}" style="flex:1;background:#10B981;color:#fff;padding:10px;border-radius:10px;text-align:center;text-decoration:none;font-weight:800;font-size:13px">📞 Call</a>
            <button onclick="openChatForRental('${r.id}')" style="flex:1;background:#0E7043;color:#fff;border:none;padding:10px;border-radius:10px;font-weight:800;font-size:13px;cursor:pointer">💬 Chat</button>
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
    openModal('modal-post-job');
  }
  window.openPostJobModal = openPostJobModal;

  function submitJobPosting(e) {
    if (e) e.preventDefault();
    const title = document.getElementById('postJobTitle').value.trim();
    const employer = document.getElementById('postJobEmployer').value.trim();
    const phone = document.getElementById('postJobPhone').value.trim();
    const salary = document.getElementById('postJobSalary').value.trim() || 'ശമ്പളം സംസാരിക്കാം';
    const desc = document.getElementById('postJobDesc').value.trim() || '';

    if (!title || !phone) {
      toast('⚠️ തലക്കെട്ടും ഫോൺ നമ്പറും നൽകുക.');
      return;
    }

    const newJob = {
      id: 'job_' + Date.now(),
      title: title,
      employer: employer || APP_STATE.currentUser.name,
      employerPhone: phone,
      category: 'other',
      salary: salary,
      type: 'ഫുൾ ടൈം',
      location: APP_STATE.location.name,
      lat: APP_STATE.location.lat,
      lon: APP_STATE.location.lon,
      description: desc
    };

    APP_STATE.jobs.unshift(newJob);
    try {
      localStorage.setItem('nn_jobs', JSON.stringify(APP_STATE.jobs));
    } catch (_) {}

    // Save job posting to Supabase Cloud
    if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.saveJob === 'function') {
      window.NN_SUPABASE_SERVICES.saveJob(newJob);
    }

    closeModal('modal-post-job');
    renderJobsScreen();
    toast('🎉 തൊഴിൽ അവസരം വിജയകരമായി പോസ്റ്റ് ചെയ്തു!');
  }
  window.submitJobPosting = submitJobPosting;

  function openRentalBuySellSection() {
    navTo('jobs');
    switchJobsTab('rentals');
  }
  window.openRentalBuySellSection = openRentalBuySellSection;

  // ==============================================================
  // 14. NEARBY DISCOVERY SCREEN
  // ==============================================================
  function renderNearbyScreen() {
    const container = document.getElementById('nearbyPeopleListContainer');
    if (!container) return;

    const maxRadius = APP_STATE.radiusFilters.nearby || 5;

    // Combine nearby citizens and service providers within radius with full null-safety
    let nearbyItems = [];

    (APP_STATE.services || []).forEach(s => {
      const dist = getItemDistanceKm(s, APP_STATE.location.lat, APP_STATE.location.lon);
      s._calculatedDist = dist;
      if (maxRadius >= 1000 || dist <= maxRadius) {
        nearbyItems.push({
          type: 'service',
          id: s.id,
          name: s.name,
          subtitle: s.trade,
          avatar: s.avatar || DEFAULT_USER_AVATAR,
          phone: s.phone,
          location: s.location || (s.district ? s.district + ', Kerala' : 'കേരളം'),
          dist: dist
        });
      }
    });

    (APP_STATE.bloodDonors || []).forEach(d => {
      const dist = getItemDistanceKm(d, APP_STATE.location.lat, APP_STATE.location.lon);
      d._calculatedDist = dist;
      if (maxRadius >= 1000 || dist <= maxRadius) {
        nearbyItems.push({
          type: 'donor',
          id: 'donor_' + (d.phone ? d.phone.replace(/\D/g, '') : d.name),
          name: d.name,
          subtitle: `രക്തദാതാവ് (${d.group || 'All'})`,
          avatar: DEFAULT_USER_AVATAR,
          phone: d.phone,
          location: d.location || 'കേരളം',
          dist: dist
        });
      }
    });

    nearbyItems.sort((a, b) => a.dist - b.dist);

    let adaptiveNotice = '';
    // If no provider strictly within user radius, show closest available providers in Kerala
    if (nearbyItems.length === 0) {
      const allAvailable = [];
      (APP_STATE.services || []).forEach(s => {
        allAvailable.push({
          type: 'service',
          id: s.id,
          name: s.name,
          subtitle: s.trade,
          avatar: s.avatar || DEFAULT_USER_AVATAR,
          phone: s.phone,
          location: s.location || (s.district ? s.district + ', Kerala' : 'കേരളം'),
          dist: getItemDistanceKm(s, APP_STATE.location.lat, APP_STATE.location.lon)
        });
      });
      (APP_STATE.bloodDonors || []).forEach(d => {
        allAvailable.push({
          type: 'donor',
          id: 'donor_' + (d.phone ? d.phone.replace(/\D/g, '') : d.name),
          name: d.name,
          subtitle: `രക്തദാതാവ് (${d.group || 'All'})`,
          avatar: DEFAULT_USER_AVATAR,
          phone: d.phone,
          location: d.location || 'കേരളം',
          dist: getItemDistanceKm(d, APP_STATE.location.lat, APP_STATE.location.lon)
        });
      });
      allAvailable.sort((a, b) => a.dist - b.dist);
      nearbyItems = allAvailable.slice(0, 15);

      adaptiveNotice = `
        <div style="background:#FFFBEB;border:1px solid #FDE68A;border-radius:14px;padding:12px 14px;margin-bottom:6px">
          <div style="font-weight:800;font-size:12.5px;color:#92400E;display:flex;align-items:center;gap:6px">
            <span>📍</span>
            <span>${escapeHtml(APP_STATE.location.name)} പരിസരത്തെ അടുത്തുള്ളവർ:</span>
          </div>
          <div style="font-size:11.5px;color:#B45309;margin-top:2px">തിരഞ്ഞെടുത്ത ${maxRadius} km പരിധിക്ക് ഏറ്റവും അടുത്തുള്ള ലഭ്യമായ സേവനദാതാക്കളെ താഴെ നൽകുന്നു:</div>
        </div>
      `;
    }

    if (nearbyItems.length === 0) {
      container.innerHTML = `
        <div style="text-align:center;padding:40px 16px;background:#fff;border-radius:16px;">
          <div style="font-size:36px;margin-bottom:8px">📍</div>
          <p style="color:#6B7280;margin:0 0 10px;font-size:13px">സേവനദാതാക്കളെ കണ്ടെത്താനായില്ല. മുകളിലെ "എല്ലാം (All)" ചിപ്പ് തിരഞ്ഞെടുക്കുക.</p>
          <button onclick="setRadiusFilter('nearby', 99999, document.querySelector('.radius-chip:last-child'))" style="background:#0E7043;color:#fff;border:none;padding:10px 16px;border-radius:12px;font-weight:800;cursor:pointer">മുഴുവൻ കാണുക</button>
        </div>
      `;
      return;
    }

    container.innerHTML = adaptiveNotice + nearbyItems.map(item => `
      <div style="background:#fff;border-radius:14px;padding:12px 14px;border:1px solid #E5E7EB;display:flex;align-items:center;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.03)">
        <div style="display:flex;align-items:center;gap:12px;min-width:0;flex:1">
          <img src="${item.avatar}" style="width:44px;height:44px;border-radius:50%;object-fit:cover;flex-shrink:0" onerror="this.src=window.DEFAULT_USER_AVATAR||''">
          <div style="min-width:0;flex:1">
            <div style="font-weight:800;font-size:14px;color:#111827;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(item.name)}</div>
            <div style="font-size:12px;color:#0E7043;font-weight:700">${escapeHtml(item.subtitle)}</div>
            <div style="font-size:11px;color:#6B7280">📍 ${escapeHtml(item.location)} • <span style="font-weight:800;color:#059669">${item.dist} km അകലെ</span></div>
          </div>
        </div>

        <div style="display:flex;gap:6px;flex-shrink:0">
          <a href="tel:${item.phone}" style="background:#10B981;color:#fff;padding:8px 12px;border-radius:10px;text-decoration:none;font-size:11.5px;font-weight:800;display:flex;align-items:center;gap:4px">📞</a>
          <button onclick="openChatModal('${item.name.replace(/'/g, "\\'")}', '${item.phone}', '${item.avatar}', '${item.subtitle}', '${item.id}')" style="background:#0E7043;color:#fff;border:none;padding:8px 12px;border-radius:10px;font-weight:800;font-size:11.5px;cursor:pointer;display:flex;align-items:center;gap:4px">💬</button>
        </div>
      </div>
    `).join('');
  }

  // ==============================================================
  // 15. PROFILE SCREEN & PERSONAL DASHBOARD (POSTS, SERVICES, JOBS, RENTALS)
  // ==============================================================
  function switchProfileSubTab(tabName, btn) {
    APP_STATE.activeProfileSubTab = tabName;
    document.querySelectorAll('.profile-subtab-btn').forEach(b => {
      b.classList.remove('active');
      b.style.background = 'none';
      b.style.fontWeight = '700';
      b.style.color = '#6B7280';
      b.style.boxShadow = 'none';
    });
    if (btn) {
      btn.classList.add('active');
      btn.style.background = '#FFFFFF';
      btn.style.fontWeight = '800';
      btn.style.color = '#111827';
      btn.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
    }
    renderProfileDashboard(tabName);
  }
  window.switchProfileSubTab = switchProfileSubTab;

  function renderProfileDashboard(tabName) {
    const container = document.getElementById('profileTabContentContainer');
    if (!container) return;
    const tab = tabName || APP_STATE.activeProfileSubTab || 'posts';

    if (tab === 'posts') {
      const myPosts = APP_STATE.posts.filter(p => p.isCurrentUser || p.authorId === APP_STATE.currentUser.id || p.authorName === APP_STATE.currentUser.name);
      if (myPosts.length === 0) {
        container.innerHTML = `
          <div style="text-align:center;padding:24px 16px;background:#fff;border-radius:14px;border:1px solid #E5E7EB">
            <div style="font-size:32px;margin-bottom:6px">📝</div>
            <div style="font-size:13px;color:#6B7280;margin-bottom:12px">നിങ്ങൾ ഇതുവരെ പോസ്റ്റുകളൊന്നും പങ്കുവെച്ചിട്ടില്ല.</div>
            <button onclick="navTo('add')" style="background:#0E7043;color:#fff;border:none;padding:8px 16px;border-radius:10px;font-weight:800;font-size:12px;cursor:pointer">➕ പുതിയ പോസ്റ്റ് ഇടാം</button>
          </div>
        `;
      } else {
        container.innerHTML = `
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
            <span style="font-size:12px;font-weight:800;color:#374151">എന്റെ പോസ്റ്റുകൾ (${myPosts.length})</span>
            <button onclick="navTo('add')" style="background:#F0FDF4;color:#0E7043;border:1px solid #BBF7D0;padding:4px 10px;border-radius:8px;font-weight:800;font-size:11px;cursor:pointer">➕ പുതിയ പോസ്റ്റ്</button>
          </div>
          ${myPosts.map(p => `
            <div style="background:#fff;border:1px solid #E5E7EB;border-radius:14px;padding:12px;display:flex;flex-direction:column;gap:8px;box-shadow:0 1px 3px rgba(0,0,0,0.03)">
              <div style="display:flex;justify-content:space-between;align-items:center">
                <span style="font-size:11px;color:#6B7280">${p.timestamp} • ❤️ ${p.likes || 0} ലൈക്കുകൾ</span>
                <div style="display:flex;gap:6px">
                  <button onclick="openEditPostModal('${p.id}')" style="background:#EFF6FF;color:#2563EB;border:1px solid #BFDBFE;border-radius:8px;padding:4px 10px;font-size:11.5px;font-weight:800;cursor:pointer">✏️ എഡിറ്റ്</button>
                  <button onclick="deletePost('${p.id}', event)" style="background:#FEF2F2;color:#DC2626;border:1px solid #FECACA;border-radius:8px;padding:4px 10px;font-size:11.5px;font-weight:800;cursor:pointer">🗑️ ഡിലീറ്റ്</button>
                </div>
              </div>
              <div style="font-size:13px;color:#111827;line-height:1.5">${p.content}</div>
              ${p.image ? `<img src="${p.image}" style="width:100%;max-height:160px;object-fit:cover;border-radius:10px">` : ''}
            </div>
          `).join('')}
        `;
      }
    } else if (tab === 'services') {
      const myServices = APP_STATE.services.filter(s => s.phone === APP_STATE.currentUser.phone || s.name === APP_STATE.currentUser.name || s.isUserCreated);
      if (myServices.length === 0) {
        container.innerHTML = `
          <div style="text-align:center;padding:24px 16px;background:#fff;border-radius:14px;border:1px solid #E5E7EB">
            <div style="font-size:32px;margin-bottom:6px">🛠️</div>
            <div style="font-size:13px;color:#6B7280;margin-bottom:12px">താങ്കൾ ഇതുവരെ സർവീസ് പ്രൊവൈഡറായി രജിസ്റ്റർ ചെയ്തിട്ടില്ല.</div>
            <button onclick="openAddServiceModal()" style="background:#0E7043;color:#fff;border:none;padding:8px 16px;border-radius:10px;font-weight:800;font-size:12px;cursor:pointer">➕ സർവീസ് രജിസ്റ്റർ ചെയ്യാം</button>
          </div>
        `;
      } else {
        container.innerHTML = `
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
            <span style="font-size:12px;font-weight:800;color:#374151">എന്റെ സർവീസുകൾ (${myServices.length})</span>
            <button onclick="openAddServiceModal()" style="background:#F0FDF4;color:#0E7043;border:1px solid #BBF7D0;padding:4px 10px;border-radius:8px;font-weight:800;font-size:11px;cursor:pointer">➕ പുതിയത് ചേർക്കാം</button>
          </div>
          ${myServices.map(s => `
            <div style="background:#fff;border:1px solid #E5E7EB;border-radius:14px;padding:12px;display:flex;align-items:center;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.03)">
              <div>
                <div style="font-weight:800;font-size:14px;color:#111827">${s.trade}</div>
                <div style="font-size:11.5px;color:#6B7280">📍 ${s.location} • 📞 ${s.phone}</div>
                <div style="font-size:11px;color:#0E7043;font-weight:700;margin-top:2px">★ ${s.rating} • ${s.badge || 'വെരിഫൈഡ്'}</div>
              </div>
              <button onclick="deleteMyService('${s.id}')" style="background:#FEF2F2;color:#DC2626;border:1px solid #FECACA;border-radius:8px;padding:6px 10px;font-size:11.5px;font-weight:800;cursor:pointer">🗑️ ഡിലീറ്റ്</button>
            </div>
          `).join('')}
        `;
      }
    } else if (tab === 'jobs') {
      const myJobs = APP_STATE.jobs.filter(j => j.employerPhone === APP_STATE.currentUser.phone || j.employer === APP_STATE.currentUser.name || j.isUserCreated);
      if (myJobs.length === 0) {
        container.innerHTML = `
          <div style="text-align:center;padding:24px 16px;background:#fff;border-radius:14px;border:1px solid #E5E7EB">
            <div style="font-size:32px;margin-bottom:6px">💼</div>
            <div style="font-size:13px;color:#6B7280;margin-bottom:12px">നിങ്ങൾ ഇതുവരെ തൊഴിൽ അവസരങ്ങളൊന്നും നൽകിയിട്ടില്ല.</div>
            <button onclick="openPostJobModal()" style="background:#0878D1;color:#fff;border:none;padding:8px 16px;border-radius:10px;font-weight:800;font-size:12px;cursor:pointer">➕ തൊഴിൽ നൽകാം</button>
          </div>
        `;
      } else {
        container.innerHTML = `
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
            <span style="font-size:12px;font-weight:800;color:#374151">ഞാൻ നൽകിയ തൊഴിലുകൾ (${myJobs.length})</span>
            <button onclick="openPostJobModal()" style="background:#EFF6FF;color:#0878D1;border:1px solid #BFDBFE;padding:4px 10px;border-radius:8px;font-weight:800;font-size:11px;cursor:pointer">➕ പുതിയത് നൽകാം</button>
          </div>
          ${myJobs.map(j => `
            <div style="background:#fff;border:1px solid #E5E7EB;border-radius:14px;padding:12px;display:flex;flex-direction:column;gap:6px;box-shadow:0 1px 3px rgba(0,0,0,0.03)">
              <div style="display:flex;justify-content:space-between;align-items:flex-start">
                <div>
                  <div style="font-weight:800;font-size:14px;color:#111827">${j.title}</div>
                  <div style="font-size:11.5px;color:#6B7280">📍 ${j.location} • ശമ്പളം: ${j.salary}</div>
                </div>
                <button onclick="deleteMyJob('${j.id}')" style="background:#FEF2F2;color:#DC2626;border:1px solid #FECACA;border-radius:8px;padding:4px 10px;font-size:11.5px;font-weight:800;cursor:pointer">🗑️ ഡിലീറ്റ്</button>
              </div>
            </div>
          `).join('')}
        `;
      }
    } else if (tab === 'rentals') {
      const myRentals = APP_STATE.rentals.filter(r => r.ownerPhone === APP_STATE.currentUser.phone || r.owner === APP_STATE.currentUser.name || r.isUserCreated);
      if (myRentals.length === 0) {
        container.innerHTML = `
          <div style="text-align:center;padding:24px 16px;background:#fff;border-radius:14px;border:1px solid #E5E7EB">
            <div style="font-size:32px;margin-bottom:6px">🏠</div>
            <div style="font-size:13px;color:#6B7280;margin-bottom:12px">നിങ്ങൾ ഇതുവരെ വാടക ഇനങ്ങളൊന്നും ലിസ്റ്റ് ചെയ്തിട്ടില്ല.</div>
            <button onclick="openAddRentalModal()" style="background:#0E7043;color:#fff;border:none;padding:8px 16px;border-radius:10px;font-weight:800;font-size:12px;cursor:pointer">➕ വാടകയ്ക്ക് ലിസ്റ്റ് ചെയ്യാം</button>
          </div>
        `;
      } else {
        container.innerHTML = `
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
            <span style="font-size:12px;font-weight:800;color:#374151">എന്റെ വാടക ലിസ്റ്റിംഗുകൾ (${myRentals.length})</span>
            <button onclick="openAddRentalModal()" style="background:#F0FDF4;color:#0E7043;border:1px solid #BBF7D0;padding:4px 10px;border-radius:8px;font-weight:800;font-size:11px;cursor:pointer">➕ പുതിയത് ലിസ്റ്റ് ചെയ്യാം</button>
          </div>
          ${myRentals.map(r => `
            <div style="background:#fff;border:1px solid #E5E7EB;border-radius:14px;padding:12px;display:flex;align-items:center;gap:12px;box-shadow:0 1px 3px rgba(0,0,0,0.03)">
              ${r.image ? `<img src="${r.image}" style="width:54px;height:54px;border-radius:10px;object-fit:cover">` : ''}
              <div style="flex:1;min-width:0">
                <div style="font-weight:800;font-size:13.5px;color:#111827;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${r.title}</div>
                <div style="font-size:11.5px;color:#0E7043;font-weight:700">${r.rate} • ${r.type || 'വാടക'}</div>
                <div style="font-size:11px;color:#6B7280">📍 ${r.location}</div>
              </div>
              <button onclick="deleteMyRental('${r.id}')" style="background:#FEF2F2;color:#DC2626;border:1px solid #FECACA;border-radius:8px;padding:6px 10px;font-size:11.5px;font-weight:800;cursor:pointer">🗑️</button>
            </div>
          `).join('')}
        `;
      }
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
    renderProfileDashboard('jobs');
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
    renderProfileDashboard('rentals');
    toast('🗑️ വാടക ഇനം ഒഴിവാക്കി.');
  }
  window.deleteMyRental = deleteMyRental;

  function renderProfileScreen() {
    const nameEl = document.getElementById('profDisplayNameText');
    const phoneEl = document.getElementById('profDisplayPhoneText');
    const avatarEl = document.getElementById('profileAvatarImg');
    const homeAvatar = document.getElementById('homeHeaderAvatar');

    const displayName = APP_STATE.currentUser.name || 'നാട്ടുകാരൻ';
    const displayPhone = APP_STATE.currentUser.phone ? `📞 ${APP_STATE.currentUser.phone}` : 'ഫോൺ നമ്പർ നൽകിയിട്ടില്ല';
    const currentAvatar = APP_STATE.currentUser.avatar || DEFAULT_USER_AVATAR;

    if (nameEl) {
      if (APP_STATE.currentUser.name && APP_STATE.currentUser.name !== 'നാട്ടുകാരൻ') {
        nameEl.innerHTML = `${escapeHtml(displayName)} <span style="font-size:11px;background:#ECFDF5;color:#047857;padding:2px 8px;border-radius:10px;font-weight:700">✓ അംഗം</span>`;
      } else {
        nameEl.innerHTML = `${escapeHtml(displayName)} <span onclick="openEditProfileModal()" style="font-size:11px;background:#FEF3C7;color:#B45309;padding:2px 8px;border-radius:10px;font-weight:700;cursor:pointer">✏️ പേര് നൽകുക</span>`;
      }
    }
    if (phoneEl) phoneEl.textContent = displayPhone;
    if (avatarEl) avatarEl.src = currentAvatar;
    if (homeAvatar) homeAvatar.src = currentAvatar;

    renderProfileDashboard(APP_STATE.activeProfileSubTab || 'posts');
  }
  window.renderProfileScreen = renderProfileScreen;

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
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.82);

        APP_STATE.currentUser.avatar = compressedBase64;
        try {
          localStorage.setItem('nn_user_avatar', compressedBase64);
        } catch (_) {}

        // Update all profile avatars in UI immediately
        const profAvatar = document.getElementById('profileAvatarImg');
        const homeHeaderAvatar = document.getElementById('homeHeaderAvatar');
        const editPreview = document.getElementById('editProfAvatarPreview');
        if (profAvatar) profAvatar.src = compressedBase64;
        if (homeHeaderAvatar) homeHeaderAvatar.src = compressedBase64;
        if (editPreview) editPreview.src = compressedBase64;

        toast('📸 നിങ്ങളുടെ പ്രൊഫൈൽ ഫോട്ടോ വിജയകരമായി മാറ്റം വരുത്തി!');
      };
      img.src = evt.target.result;
    };
    reader.readAsDataURL(file);
  }
  window.handleProfilePhotoUpload = handleProfilePhotoUpload;

  // ==============================================================
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
      owner: owner,
      ownerPhone: phone,
      location: loc,
      lat: APP_STATE.location.lat,
      lon: APP_STATE.location.lon,
      image: APP_STATE.tempRentalImage || defaultImg,
      isUserCreated: true
    };

    APP_STATE.rentals.unshift(newRental);
    try {
      localStorage.setItem('nn_rentals', JSON.stringify(APP_STATE.rentals));
    } catch (_) {}

    // Save rental to Supabase Cloud
    if (typeof window !== 'undefined' && window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.saveRental === 'function') {
      window.NN_SUPABASE_SERVICES.saveRental(newRental);
    }

    closeModal('modal-add-rental');
    removeRentalPhoto();
    document.getElementById('rentTitle').value = '';
    document.getElementById('rentRate').value = '';

    renderRentalsScreen();
    if (APP_STATE.currentScreen === 'profile') renderProfileScreen();
    toast('🏠 വാടക ഇനം വിജയകരമായി ലിസ്റ്റ് ചെയ്തു!');
  }
  window.submitRentalPosting = submitRentalPosting;

  function openEditProfileModal() {
    const nameEl = document.getElementById('editProfName');
    const phoneEl = document.getElementById('editProfPhone');
    const locEl = document.getElementById('editProfLoc');
    const bloodEl = document.getElementById('editProfBlood');
    const previewEl = document.getElementById('editProfAvatarPreview');

    if (nameEl) nameEl.value = (APP_STATE.currentUser.name && APP_STATE.currentUser.name !== 'നാട്ടുകാരൻ') ? APP_STATE.currentUser.name : '';
    if (phoneEl) phoneEl.value = APP_STATE.currentUser.phone || '';
    if (locEl) locEl.value = APP_STATE.currentUser.location || APP_STATE.location.name || '';
    if (bloodEl) bloodEl.value = APP_STATE.currentUser.bloodGroup || 'O+';
    if (previewEl) previewEl.src = APP_STATE.currentUser.avatar || DEFAULT_USER_AVATAR;

    openModal('modal-edit-profile');
  }
  window.openEditProfileModal = openEditProfileModal;

  function submitProfileUpdate(e) {
    if (e) e.preventDefault();
    const name = (document.getElementById('editProfName').value || '').trim();
    const phone = (document.getElementById('editProfPhone').value || '').trim();
    const loc = (document.getElementById('editProfLoc').value || '').trim() || APP_STATE.location.name || 'കേരളം';
    const blood = document.getElementById('editProfBlood').value;

    if (!name) {
      toast('⚠️ ദയവായി നിങ്ങളുടെ പേര് നൽകുക.');
      return;
    }

    APP_STATE.currentUser.name = name;
    APP_STATE.currentUser.phone = phone;
    APP_STATE.currentUser.location = loc;
    APP_STATE.currentUser.bloodGroup = blood;
    APP_STATE.currentUser.isCustomized = true;

    try {
      localStorage.setItem('nn_user_name', name);
      localStorage.setItem('nn_user_phone', phone);
      localStorage.setItem('nn_user_loc', loc);
      localStorage.setItem('nn_user_blood', blood);
    } catch (_) {}

    closeModal('modal-edit-profile');
    renderProfileScreen();
    updatePostingProfileBar();
    renderHomeScreen();
    toast(`🎉 സ്വാഗതം ${name}! നിങ്ങളുടെ പ്രൊഫൈൽ വിജയകരമായി സേവ് ചെയ്തു.`);
  }
  window.submitProfileUpdate = submitProfileUpdate;

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
  // 17. INITIALIZATION ON DOM READY
  // ==============================================================
  function renderHomeScreen() {
    updateLocationDisplay(APP_STATE.location.name, APP_STATE.location.district, APP_STATE.location.lat, APP_STATE.location.lon);
    renderActiveServiceTracker();

    const homeHeaderAvatar = document.getElementById('homeHeaderAvatar');
    if (homeHeaderAvatar) {
      homeHeaderAvatar.src = APP_STATE.currentUser.avatar || DEFAULT_USER_AVATAR;
    }

    const homeList = document.getElementById('homeTopProvidersList');
    if (!homeList) return;

    // Calculate distances
    const list = [...(APP_STATE.services || [])];
    list.forEach(srv => {
      srv._calculatedDist = getItemDistanceKm(srv, APP_STATE.location.lat, APP_STATE.location.lon);
    });
    list.sort((a, b) => a._calculatedDist - b._calculatedDist);

    const topProviders = list.slice(0, 4);
    if (topProviders.length === 0) {
      homeList.innerHTML = `<div style="text-align:center;padding:16px;color:#64748B;font-size:0.85rem">സേവനദാതാക്കളെ കണ്ടെത്താനായില്ല</div>`;
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

          <!-- DIRECT ACTIONS: PHONE CALL & IN-APP CHAT (NO WHATSAPP) -->
          <div class="service-actions-row" onclick="event.stopPropagation()">
            <a href="tel:${srv.phone}" class="prov-btn-call" title="നേരിട്ട് വിളിക്കുക">
              <span>📞</span>
              <span>വിളിക്കുക</span>
            </a>
            <button class="prov-btn-chat" onclick="openChatForService('${srv.id}')" title="ആപ്പ് ചാറ്റ്">
              <span>💬</span>
              <span>ആപ്പ് ചാറ്റ്</span>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }
  window.renderHomeScreen = renderHomeScreen;

  document.addEventListener('DOMContentLoaded', () => {
    initData();
    renderHomeScreen();

    // Register service worker if available
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').catch(err => {
        console.info('[SW] Service Worker note:', err.message);
      });
    }

    // 3D Home Search Bar & Realtime Suggestions Engine
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
      if (qLower.includes('രക്ത') || qLower.includes('blood') || qLower.includes('donor')) {
        openBloodModal();
        return;
      }
      if (qLower.includes('അടിയന്തിര') || qLower.includes('emergency') || qLower.includes('പോലീസ്') || qLower.includes('ആംബുലൻസ്') || qLower.includes('police') || qLower.includes('ambulance') || qLower.includes('fire')) {
        openEmergencyModal();
        return;
      }
      if (qLower.includes('വാടക') || qLower.includes('rent') || qLower.includes('room') || qLower.includes('വീട്') || qLower.includes('ഷോപ്പ്')) {
        navTo('rentals');
        const rInput = document.getElementById('rentalSearchInput');
        if (rInput) {
          rInput.value = q;
          renderRentalsScreen();
        }
        return;
      }
      if (qLower.includes('തൊഴിൽ') || qLower.includes('job') || qLower.includes('vacancy') || qLower.includes('ജോലി')) {
        navTo('jobs');
        const jInput = document.getElementById('jobSearchInput');
        if (jInput) {
          jInput.value = q;
          renderJobsScreen();
        }
        return;
      }

      // Default to services
      navTo('services');
      const sInput = document.getElementById('serviceSearchInput');
      if (sInput) {
        sInput.value = q;
        renderServicesScreen();
      }
    }
    window.triggerHomeSearch = triggerHomeSearch;

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

        // Check emergency keywords
        if ('രക്തദാനം blood donation'.includes(query)) {
          matches.push({
            icon: '🩸',
            title: 'രക്തദാനം (Blood Donor Directory)',
            sub: 'അടിയന്തിര രക്തദാതാക്കളെ കണ്ടെത്തുക',
            badge: 'അടിയന്തിരം',
            badgeCls: 'badge-service',
            action: () => openBloodModal()
          });
        }
        if ('അടിയന്തിരം emergency police ആംബുലൻസ് ambulance fire ഫയർഫോഴ്സ്'.includes(query)) {
          matches.push({
            icon: '🚨',
            title: 'അടിയന്തിര സഹായം (24x7 Emergency)',
            sub: 'പോലീസ്, ആംബുലൻസ്, ഫയർഫോഴ്സ് നമ്പറുകൾ',
            badge: 'സഹായം',
            badgeCls: 'badge-service',
            action: () => openEmergencyModal()
          });
        }

        // Check service categories
        SERVICE_CATEGORIES.forEach(cat => {
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

        // Check services listings
        (APP_STATE.services || []).forEach(s => {
          if (matches.length >= 7) return;
          if ((s.title && s.title.toLowerCase().includes(query)) ||
              (s.name && s.name.toLowerCase().includes(query)) ||
              (s.location && s.location.toLowerCase().includes(query))) {
            matches.push({
              icon: '🛠️',
              title: s.title || s.name,
              sub: `${s.name} • ${s.location || ''}`,
              badge: 'സേവനം',
              badgeCls: 'badge-service',
              action: () => {
                navTo('services');
                const sInput = document.getElementById('serviceSearchInput');
                if (sInput) {
                  sInput.value = s.title || s.name;
                  renderServicesScreen();
                }
              }
            });
          }
        });

        // Check jobs listings
        (APP_STATE.jobs || []).forEach(j => {
          if (matches.length >= 7) return;
          if ((j.title && j.title.toLowerCase().includes(query)) ||
              (j.company && j.company.toLowerCase().includes(query)) ||
              (j.location && j.location.toLowerCase().includes(query))) {
            matches.push({
              icon: '💼',
              title: j.title,
              sub: `${j.company || 'കമ്പനി'} • ${j.location || ''}`,
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

        // Check rentals listings
        (APP_STATE.rentals || []).forEach(r => {
          if (matches.length >= 7) return;
          if ((r.title && r.title.toLowerCase().includes(query)) ||
              (r.propertyType && r.propertyType.toLowerCase().includes(query)) ||
              (r.location && r.location.toLowerCase().includes(query))) {
            matches.push({
              icon: '🏠',
              title: r.title,
              sub: `${r.rentAmount ? '₹' + r.rentAmount + '/മാസം' : 'വാടക'} • ${r.location || ''}`,
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

        if (matches.length === 0) {
          homeDropdown.innerHTML = `
            <div style="padding:14px;text-align:center;color:#64748B;font-size:0.86rem">
              ഫലങ്ങളൊന്നും കണ്ടെത്തിയില്ല.<br>
              <button onclick="triggerHomeSearch()" style="margin-top:8px;padding:6px 14px;background:#059669;color:#fff;border:none;border-radius:10px;font-size:0.8rem;font-weight:700;cursor:pointer">
                🔍 '${escapeHtml(homeSearch.value)}' സർവീസുകളിൽ തിരയുക
              </button>
            </div>
          `;
        } else {
          homeDropdown.innerHTML = matches.slice(0, 6).map((m, idx) => `
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

    // Auto-dismiss splash screen after 2.5 seconds if user didn't tap
    setTimeout(() => {
      if (APP_STATE.currentScreen === 'splash') {
        enterAppFromSplash();
      }
    }, 2800);
  });

})();
