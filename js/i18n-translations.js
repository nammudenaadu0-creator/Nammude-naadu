/**
 * NAMMUDE NAADU - MULTILINGUAL (i18n) TRANSLATION ENGINE
 * Supports: Malayalam (ml), English (en), and Hindi (hi)
 * Enables global and nationwide accessibility
 */

(function () {
  'use strict';

  const TRANSLATIONS = {
    ml: {
      appName: 'നമ്മുടെ നാട്',
      appTagline: 'നാടിനൊപ്പം നാം 🌿',
      navHome: 'ഹോം',
      navServices: 'സേവനങ്ങൾ',
      navAdd: 'പോസ്റ്റ്',
      navChat: 'ചാറ്റ്',
      navCommunity: 'കമ്മ്യൂണിറ്റി പോസ്റ്റ്',
      searchPlaceholder: 'നാട്ടിലെ സേവനങ്ങളും ആളുകളും തിരയുക...',
      radiusNearby: 'സമീപം',
      liveLocation: 'തത്സമയ ലൊക്കേഷൻ',
      tabTimeline: 'ടൈംലൈൻ',
      tabPhotos: 'ഫോട്ടോകൾ',
      tabAbout: 'വിവരങ്ങൾ',
      tabListings: 'ലിസ്റ്റിംഗുകൾ',
      editProfile: 'എഡിറ്റ്',
      changeCover: 'കവർ മാറ്റാം',
      changeAvatar: 'ഫോട്ടോ മാറ്റാം',
      postsCount: 'പോസ്റ്റുകൾ',
      likesCount: 'ലൈക്കുകൾ',
      citizensCount: 'നാട്ടുകാർ',
      whatsOnYourMind: 'നിങ്ങളുടെ മനസ്സിൽ എന്താണ്? ഇവിടെ പോസ്റ്റ് ചെയ്യാം...',
      sharePost: 'പോസ്റ്റ് ചെയ്യാം',
      saveProfile: '💾 മാറ്റങ്ങൾ സേവ് ചെയ്യാം',
      cancel: 'റദ്ദാക്കുക',
      logout: '🚪 ലോഗ് ഔട്ട് / അക്കൗണ്ട് മാറ്റാം',
      bloodNetwork: '🩸 ബ്ലഡ് ഡോണർ നെറ്റ്‌വർക്ക്',
      adminConsole: '⚙️ അഡ്മിൻ കൺസോൾ (Admin Hub)',
      privacyPolicy: '🛡️ പ്രൈവസി പോളിസി',
      verifiedResident: '✓ തദ്ദേശവാസി',
      guestUser: 'അതിഥി',
      fullName: 'പൂർണ്ണ നാമം',
      phoneNumber: 'മൊബൈൽ നമ്പർ (Unique Citizen ID)',
      locationArea: 'നാട് / ഗ്രാമം / പഞ്ചായത്ത്',
      district: 'ജില്ല',
      bloodGroup: 'രക്തഗ്രൂപ്പ്',
      donorConsent: '🩸 സന്നദ്ധ രക്തദാതാവായി രജിസ്റ്റർ ചെയ്യാം',
      donorConsentSub: 'അടിയന്തിര ഘട്ടത്തിൽ രക്തം ആവശ്യമുള്ളവർക്ക് ആപ്പ് വഴി ബന്ധപ്പെടാം.',
      profession: 'തൊഴിൽ / ജോലി',
      bio: 'ബയോ / ചെറുവിവരണം',
      appLanguage: 'ആപ്പ് ഭാഷ (App Language)',
      selectLanguage: 'ഭാഷ തിരഞ്ഞെടുക്കുക',
      langMalayalam: 'മലയാളം',
      langEnglish: 'English',
      langHindi: 'हिंदी',
      profileCompletedToast: '🎉 പ്രൊഫൈൽ വിവരങ്ങൾ വിജയകരമായി സേവ് ചെയ്തു!',
      langChangedToast: '🌐 ഭാഷ വിജയകരമായി മാറ്റി!',
      chatTitle: 'ചാറ്റ്',
      servicesTitle: 'നാട്ടിലെ സേവനങ്ങൾ',
      quickServiceReq: '⚡ 1-ടാപ്പ് ക്വിക്ക് സർവീസ്'
    },
    en: {
      appName: 'Nammude Naadu',
      appTagline: 'Together with our community 🌿',
      navHome: 'Home',
      navServices: 'Services',
      navAdd: 'Post',
      navChat: 'Chat',
      navCommunity: 'Community Posts',
      searchPlaceholder: 'Search village services and people...',
      radiusNearby: 'Nearby',
      liveLocation: 'Live Location',
      tabTimeline: 'Timeline',
      tabPhotos: 'Photos',
      tabAbout: 'About',
      tabListings: 'Listings',
      editProfile: 'Edit',
      changeCover: 'Change Cover',
      changeAvatar: 'Change Photo',
      postsCount: 'Posts',
      likesCount: 'Likes',
      citizensCount: 'Citizens',
      whatsOnYourMind: "What's on your mind? Share with community...",
      sharePost: 'Create Post',
      saveProfile: '💾 Save Profile Changes',
      cancel: 'Cancel',
      logout: '🚪 Logout / Switch Account',
      bloodNetwork: '🩸 Blood Donor Network',
      adminConsole: '⚙️ Admin Console (Admin Hub)',
      privacyPolicy: '🛡️ Privacy Policy',
      verifiedResident: '✓ Verified Citizen',
      guestUser: 'Guest',
      fullName: 'Full Name',
      phoneNumber: 'Mobile Number (Unique Citizen ID)',
      locationArea: 'Place / Village / Town',
      district: 'District',
      bloodGroup: 'Blood Group',
      donorConsent: '🩸 Register as Volunteer Blood Donor',
      donorConsentSub: 'People needing urgent blood in your area can reach out to you.',
      profession: 'Occupation / Profession',
      bio: 'Bio / Short Description',
      appLanguage: 'App Language',
      selectLanguage: 'Choose Language',
      langMalayalam: 'മലയാളം',
      langEnglish: 'English',
      langHindi: 'हिंदी',
      profileCompletedToast: '🎉 Profile updated successfully!',
      langChangedToast: '🌐 Language changed to English!',
      chatTitle: 'Chats',
      servicesTitle: 'Community Services',
      quickServiceReq: '⚡ 1-Tap Quick Service'
    },
    hi: {
      appName: 'नम्मुडे नाडु (हमारा गांव)',
      appTagline: 'गांव के साथ, हम सब 🌿',
      navHome: 'होम',
      navServices: 'सेवाएं',
      navAdd: 'पोस्ट',
      navChat: 'चैट',
      navCommunity: 'कम्युनिटी पोस्ट',
      searchPlaceholder: 'गांव की सेवाएं और लोगों को खोजें...',
      radiusNearby: 'आस-पास',
      liveLocation: 'लाइव लोकेशन',
      tabTimeline: 'टाइमलाइन',
      tabPhotos: 'तस्वीरें',
      tabAbout: 'जानकारी',
      tabListings: 'लिस्टिंग',
      editProfile: 'संपादित करें',
      changeCover: 'कवर बदलें',
      changeAvatar: 'फोटो बदलें',
      postsCount: 'पोस्ट',
      likesCount: 'लाइक',
      citizensCount: 'नागरिक',
      whatsOnYourMind: 'आपके मन में क्या है? यहां शेयर करें...',
      sharePost: 'पोस्ट बनाएं',
      saveProfile: '💾 प्रोफ़ाइल सेव करें',
      cancel: 'रद्द करें',
      logout: '🚪 लॉग आउट / खाता बदलें',
      bloodNetwork: '🩸 रक्तदाता नेटवर्क',
      adminConsole: '⚙️ एडमिन कंसोल',
      privacyPolicy: '🛡️ गोपनीयता नीति',
      verifiedResident: '✓ सत्यापित नागरिक',
      guestUser: 'अतिथि',
      fullName: 'पूरा नाम',
      phoneNumber: 'मोबाइल नंबर (यूनिक आईडी)',
      locationArea: 'स्थान / गांव / वार्ड',
      district: 'जिला',
      bloodGroup: 'रक्त समूह (Blood Group)',
      donorConsent: '🩸 स्वयंसेवी रक्तदाता के रूप में जुड़ें',
      donorConsentSub: 'आपात स्थिति में रक्त की आवश्यकता होने पर लोग आपसे संपर्क कर सकते हैं।',
      profession: 'पेशा / व्यवसाय',
      bio: 'परिचय / बायो',
      appLanguage: 'ऐप की भाषा (App Language)',
      selectLanguage: 'भाषा चुनें',
      langMalayalam: 'മലയാളം',
      langEnglish: 'English',
      langHindi: 'हिंदी',
      profileCompletedToast: '🎉 प्रोफ़ाइल सफलतापूर्वक अपडेट हो गई!',
      langChangedToast: '🌐 भाषा हिंदी में बदल दी गई है!',
      chatTitle: 'चैट',
      servicesTitle: 'स्थानीय सेवाएं',
      quickServiceReq: '⚡ 1-टैप त्वरित सेवा'
    }
  };

  let currentLang = localStorage.getItem('nn_app_language') || 'ml';

  function getTranslation(key, defaultText) {
    const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.ml;
    return dict[key] || defaultText || key;
  }

  function setAppLanguage(lang, silent = false) {
    if (!TRANSLATIONS[lang]) lang = 'ml';
    currentLang = lang;
    try {
      localStorage.setItem('nn_app_language', lang);
    } catch (_) {}

    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Apply translations across DOM elements
    applyTranslationsToDOM();

    // Re-render active screens if engine is ready
    if (typeof window.APP_STATE !== 'undefined') {
      window.APP_STATE.appLanguage = lang;
      if (typeof window.renderProfileScreen === 'function' && window.APP_STATE.currentScreen === 'profile') {
        window.renderProfileScreen();
      }
      if (typeof window.renderHomeScreen === 'function' && window.APP_STATE.currentScreen === 'home') {
        window.renderHomeScreen();
      }
    }

    // Highlight active language chips
    document.querySelectorAll('.lang-select-chip').forEach(chip => {
      const targetLang = chip.getAttribute('data-lang');
      if (targetLang === lang) {
        chip.classList.add('active');
        chip.style.borderColor = '#10B981';
        chip.style.background = '#ECFDF5';
        chip.style.color = '#065F46';
        chip.style.fontWeight = '800';
      } else {
        chip.classList.remove('active');
        chip.style.borderColor = '#E2E8F0';
        chip.style.background = '#FFFFFF';
        chip.style.color = '#475569';
        chip.style.fontWeight = '600';
      }
    });

    if (!silent && typeof window.toast === 'function') {
      window.toast(getTranslation('langChangedToast'));
    }
  }

  function applyTranslationsToDOM() {
    const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.ml;

    // 1. Bottom Navigation Bar items
    const navHome = document.querySelector('.nav-item[data-page="home"] span:last-child');
    if (navHome) navHome.textContent = dict.navHome;

    const navServices = document.querySelector('.nav-item[data-page="services"] span:last-child');
    if (navServices) navServices.textContent = dict.navServices;

    const navAdd = document.querySelector('.nav-item[data-page="add"] span:last-child');
    if (navAdd) navAdd.textContent = dict.navAdd;

    const navChat = document.querySelector('.nav-item[data-page="chat"] span:last-child');
    if (navChat) navChat.textContent = dict.navChat;

    const navCommunity = document.querySelector('.nav-item[data-page="community"] span:last-child');
    if (navCommunity) navCommunity.textContent = dict.navCommunity || 'കമ്മ്യൂണിറ്റി പോസ്റ്റ്';

    // 2. Search Bar placeholder
    const searchInput = document.getElementById('homeGlobalSearchInput');
    if (searchInput) searchInput.placeholder = dict.searchPlaceholder;

    // 3. Profile Screen Sub-tabs
    const tabTimeline = document.querySelector('.profile-subtab-btn[data-tab="posts"]');
    if (tabTimeline) tabTimeline.innerHTML = `📝 ${dict.tabTimeline}`;

    const tabPhotos = document.querySelector('.profile-subtab-btn[data-tab="photos"]');
    if (tabPhotos) tabPhotos.innerHTML = `🖼️ ${dict.tabPhotos}`;

    const tabAbout = document.querySelector('.profile-subtab-btn[data-tab="about"]');
    if (tabAbout) tabAbout.innerHTML = `ℹ️ ${dict.tabAbout}`;

    const tabListings = document.querySelector('.profile-subtab-btn[data-tab="services"]');
    if (tabListings) tabListings.innerHTML = `🛠️ ${dict.tabListings}`;

    // 4. Any elements marked with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // 5. Placeholders with data-i18n-ph
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.getAttribute('data-i18n-ph');
      if (dict[key]) {
        el.placeholder = dict[key];
      }
    });
  }

  // Initialize on load
  document.addEventListener('DOMContentLoaded', () => {
    setAppLanguage(currentLang, true);
  });

  // Global exposure
  window.NN_I18N = {
    t: getTranslation,
    setLanguage: setAppLanguage,
    getCurrentLanguage: () => currentLang,
    TRANSLATIONS: TRANSLATIONS
  };
  window.setAppLanguage = setAppLanguage;
  window.getTranslation = getTranslation;
})();
