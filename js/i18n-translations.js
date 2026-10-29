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
      navCommunity: 'നാട്ടുകൂട്ടം',
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
      bloodNetwork: '🩸 രക്തദാന നെറ്റ്‌വർക്ക്',
      adminConsole: '⚙️ അഡ്മിൻ കൺസോൾ',
      privacyPolicy: '🛡️ സ്വകാര്യതാ നയം',
      verifiedResident: '✓ തദ്ദേശവാസി',
      guestUser: 'അതിഥി',
      fullName: 'പൂർണ്ണ നാമം',
      phoneNumber: 'മൊബൈൽ നമ്പർ',
      locationArea: 'നാട് / ഗ്രാമം / പഞ്ചായത്ത്',
      district: 'ജില്ല',
      bloodGroup: 'രക്തഗ്രൂപ്പ്',
      donorConsent: '🩸 സന്നദ്ധ രക്തദാതാവായി രജിസ്റ്റർ ചെയ്യാം',
      donorConsentSub: 'അടിയന്തിര ഘട്ടത്തിൽ രക്തം ആവശ്യമുള്ളവർക്ക് ആപ്പ് വഴി ബന്ധപ്പെടാം.',
      profession: 'തൊഴിൽ / ജോലി',
      bio: 'ബയോ / ചെറുവിവരണം',
      appLanguage: 'ആപ്പ് ഭാഷ',
      selectLanguage: 'ഭാഷ തിരഞ്ഞെടുക്കുക',
      langMalayalam: 'മലയാളം',
      langEnglish: 'English',
      langHindi: 'हिंदी',
      profileCompletedToast: '🎉 പ്രൊഫൈൽ വിവരങ്ങൾ വിജയകരമായി സേവ് ചെയ്തു!',
      langChangedToast: '🌐 ഭാഷ മലയാളമാക്കി മാറ്റി!',
      chatTitle: 'സന്ദേശങ്ങൾ',
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
      adminConsole: '⚙️ Admin Console',
      privacyPolicy: '🛡️ Privacy Policy',
      verifiedResident: '✓ Verified Citizen',
      guestUser: 'Guest',
      fullName: 'Full Name',
      phoneNumber: 'Mobile Number',
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
      phoneNumber: 'मोबाइल नंबर',
      locationArea: 'स्थान / गांव / वार्ड',
      district: 'जिला',
      bloodGroup: 'रक्त समूह',
      donorConsent: '🩸 स्वयंसेवी रक्तदाता के रूप में जुड़ें',
      donorConsentSub: 'आपात स्थिति में रक्त की आवश्यकता होने पर लोग आपसे संपर्क कर सकते हैं।',
      profession: 'पेशा / व्यवसाय',
      bio: 'परिचय / बायो',
      appLanguage: 'ऐप की भाषा',
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

  let currentLang;
  try {
    if (!localStorage.getItem('nn_app_english_default_v1')) {
      currentLang = 'en';
      localStorage.setItem('nn_app_language', currentLang);
      localStorage.setItem('nn_app_english_default_v1', 'true');
    } else {
      currentLang = localStorage.getItem('nn_app_language') || 'en';
    }
  } catch (_) {
    currentLang = 'en';
  }

  function getTranslation(key, defaultText) {
    const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
    return dict[key] || defaultText || key;
  }

  function setAppLanguage(lang, silent = false) {
    if (!TRANSLATIONS[lang]) lang = 'en';
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
      if (typeof window.renderChatListScreen === 'function' && window.APP_STATE.currentScreen === 'chat') {
        window.renderChatListScreen();
      }
      if (typeof window.renderNearbyScreen === 'function' && window.APP_STATE.currentScreen === 'nearby') {
        window.renderNearbyScreen();
      }
      if (typeof window.renderServicesScreen === 'function' && window.APP_STATE.currentScreen === 'services') {
        window.renderServicesScreen();
      }
      if (typeof window.renderJobsScreen === 'function' && window.APP_STATE.currentScreen === 'jobs') {
        window.renderJobsScreen();
      }
      if (typeof window.renderRentalsScreen === 'function' && window.APP_STATE.currentScreen === 'rentals') {
        window.renderRentalsScreen();
      }
      if (typeof window.renderBloodScreen === 'function' && window.APP_STATE.currentScreen === 'blood') {
        window.renderBloodScreen();
      }
      if (typeof window.renderBloodDonorsList === 'function' && window.APP_STATE.currentScreen === 'blood') {
        window.renderBloodDonorsList();
      }
      if (typeof window.renderSaleScreen === 'function' && window.APP_STATE.currentScreen === 'sale') {
        window.renderSaleScreen();
      }
      if (typeof window.renderCommunityScreen === 'function' && window.APP_STATE.currentScreen === 'community') {
        window.renderCommunityScreen();
      }
      if (typeof window.updateLocationDisplay === 'function' && window.APP_STATE.location) {
        window.updateLocationDisplay(window.APP_STATE.location.name, window.APP_STATE.location.district, window.APP_STATE.location.lat, window.APP_STATE.location.lon, true);
      }
    }

    // Highlight active language chips
    document.querySelectorAll('.lang-select-chip').forEach(chip => {
      const targetLang = chip.getAttribute('data-lang');
      if (targetLang === lang) {
        chip.classList.add('active');
        chip.style.borderColor = '#84CC16';
        chip.style.background = '#F7FEE7';
        chip.style.color = '#3F6212';
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
    const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
    const isEn = currentLang === 'en';

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
    if (navCommunity) navCommunity.textContent = dict.navCommunity || (isEn ? 'Community Posts' : 'നാട്ടുകൂട്ടം');

    // 2. Screen Headers
    const chatHeader = document.querySelector('#screen-chat .chat-screen-header h2');
    if (chatHeader) chatHeader.textContent = isEn ? '💬 Chats' : '💬 സന്ദേശങ്ങൾ';

    const chatRecStatus = document.getElementById('chatRecipientStatus');
    if (chatRecStatus && !chatRecStatus.textContent.includes('✏️')) {
      chatRecStatus.textContent = isEn ? '● Online' : '● ഓൺലൈൻ';
    }

    const servHeader = document.querySelector('#screen-services h1');
    if (servHeader) servHeader.textContent = isEn ? 'Services' : 'സേവനങ്ങൾ';

    const servReqBtn = document.getElementById('serviceTopRequestBtn');
    if (servReqBtn) servReqBtn.innerHTML = isEn ? '<span>⚡</span><span>Request</span>' : '<span>⚡</span><span>ആവശ്യപ്പെടാം</span>';

    const servRegBtn = document.getElementById('serviceTopRegisterBtn');
    if (servRegBtn) servRegBtn.innerHTML = isEn ? '<span>➕</span><span>Register</span>' : '<span>➕</span><span>രജിസ്റ്റർ</span>';

    const jobsHeader = document.querySelector('#screen-jobs h2');
    if (jobsHeader) jobsHeader.textContent = isEn ? '💼 Jobs & Careers' : '💼 തൊഴിൽ അവസരങ്ങൾ';

    const rentHeader = document.querySelector('#screen-rentals h2');
    if (rentHeader) rentHeader.textContent = isEn ? '🏠 Rentals & Marketplace' : '🏠 വാടക & വിൽപന';

    const bloodHeader = document.querySelector('#screen-blood h2');
    if (bloodHeader) bloodHeader.textContent = isEn ? '🩸 Blood Donor Network' : '🩸 രക്തദാന നെറ്റ്‌വർക്ക്';

    const commHeader = document.querySelector('#screen-community h2');
    if (commHeader) commHeader.textContent = isEn ? 'Community Feed' : 'നാട്ടുകൂട്ടം പോസ്റ്റുകൾ';

    const nearbyHeader = document.querySelector('#screen-nearby .nearby-header-title');
    if (nearbyHeader) nearbyHeader.textContent = isEn ? 'Nearby Help' : 'സമീപ സഹായം';

    const addHeader = document.querySelector('#screen-add .header-title-box h1');
    if (addHeader) addHeader.textContent = isEn ? 'Share Community Updates' : 'വിശേഷങ്ങൾ പങ്കുവെക്കാം';

    const addSub = document.querySelector('#screen-add .header-title-box p');
    if (addSub) addSub.textContent = isEn ? 'Village news, local updates and notices' : 'നാടിന്റെ പുതിയ വാർത്തകളും അറിയിപ്പുകളും';

    // 3. Search Bar Placeholders
    const homeSearch = document.getElementById('homeSearchInput');
    if (homeSearch) homeSearch.placeholder = isEn ? 'Search village services and people...' : 'സേവനങ്ങളും കടകളും ആളുകളും തിരയുക...';

    const servSearch = document.getElementById('serviceSearchInput');
    if (servSearch) servSearch.placeholder = isEn ? 'Plumber, driver, electrician, taxi...' : 'പ്ലംബർ, ഡ്രൈവർ, ഇലക്ട്രീഷ്യൻ, ടാക്സി...';

    const nearSearch = document.getElementById('nearbySearchInput');
    if (nearSearch) nearSearch.placeholder = isEn ? 'Search help requests...' : 'സഹായങ്ങൾ തിരയുക...';

    const chatSearch = document.getElementById('chatSearchInput');
    if (chatSearch) chatSearch.placeholder = isEn ? 'Search messages or contacts...' : 'സന്ദേശങ്ങളോ ആളുകളെയോ തിരയുക...';

    const jobSearch = document.getElementById('jobSearchInput');
    if (jobSearch) jobSearch.placeholder = isEn ? 'Search jobs, skills or company...' : 'തൊഴിലുകൾ, കഴിവുകൾ, സ്ഥാപനങ്ങൾ തിരയുക...';

    const rentSearch = document.getElementById('rentalSearchInput');
    if (rentSearch) rentSearch.placeholder = isEn ? 'Search for properties, items or services...' : 'വാടക വീട്, വാഹനം, ഉപകരണങ്ങൾ തിരയുക...';

    const bloodSearch = document.getElementById('bloodSearchInput');
    if (bloodSearch) bloodSearch.placeholder = isEn ? 'Search by blood group, donor name or phone...' : 'രക്തഗ്രൂപ്പ് (O+, A+), ദാതാവിന്റെ പേര്, ഫോൺ...';

    const newChatSearch = document.getElementById('newChatSearchInput');
    if (newChatSearch) newChatSearch.placeholder = isEn ? 'Search by name or mobile number...' : 'പേരോ മൊബൈൽ നമ്പറോ തിരയുക...';

    const postContent = document.getElementById('postContentInput');
    if (postContent) postContent.placeholder = isEn ? 'What is on your mind? Share with community...' : 'നാട്ടുകാരുമായി പങ്കുവെക്കാൻ ആഗ്രഹിക്കുന്ന വിവരങ്ങൾ ഇവിടെ എഴുതുക...';

    // 3.1 Superapp Hero Card Elements
    const heroBecomeDonor = document.getElementById('heroBecomeDonorTxt');
    if (heroBecomeDonor) heroBecomeDonor.textContent = isEn ? 'Become a Donor' : 'രക്തദാതാവാകാം';

    const heroRequestBlood = document.getElementById('heroRequestBloodTxt');
    if (heroRequestBlood) heroRequestBlood.textContent = isEn ? 'Request Blood' : 'രക്തം ആവശ്യപ്പെടാം';

    const bloodDonorsLabel = document.getElementById('bloodDonorsLabelTxt');
    if (bloodDonorsLabel) bloodDonorsLabel.textContent = isEn ? 'Registered Donors' : 'രജിസ്റ്റർ ചെയ്തവർ';

    const bloodNearYouLabel = document.getElementById('bloodNearYouLabelTxt');
    if (bloodNearYouLabel) bloodNearYouLabel.textContent = isEn ? 'Near You' : 'സമീപം';

    const heroPostJob = document.getElementById('heroPostJobTxt');
    if (heroPostJob) heroPostJob.textContent = isEn ? 'Post a Job' : 'തൊഴിൽ നൽകാം';

    const heroSearchJobs = document.getElementById('heroSearchJobsTxt');
    if (heroSearchJobs) heroSearchJobs.textContent = isEn ? 'Search Jobs' : 'തൊഴിൽ തിരയാം';

    const jobsBannerTitle = document.getElementById('jobsBannerTitle');
    if (jobsBannerTitle) jobsBannerTitle.textContent = isEn ? 'Find the right job, in the right place.' : 'ശരിയായ ജോലി, ശരിയായ സ്ഥലത്ത് കണ്ടെത്താം.';

    const jobsBannerSub = document.getElementById('jobsBannerSub');
    if (jobsBannerSub) jobsBannerSub.textContent = isEn ? 'Get connected with local employers and career opportunities near you.' : 'നാട്ടിലെ തൊഴിൽദാതാക്കളുമായും മികച്ച അവസരങ്ങളുമായും ബന്ധപ്പെടാം.';

    const heroAddListing = document.getElementById('heroAddListingTxt');
    if (heroAddListing) heroAddListing.textContent = isEn ? 'Add Listing' : 'ലിസ്റ്റ് ചെയ്യാം';

    const heroMyListings = document.getElementById('heroMyListingsTxt');
    if (heroMyListings) heroMyListings.textContent = isEn ? 'My Listings' : 'എന്റെ ലിസ്റ്റിംഗുകൾ';

    const rentalsBannerTitle = document.getElementById('rentalsBannerTitle');
    if (rentalsBannerTitle) rentalsBannerTitle.textContent = isEn ? 'Local listings. Real people.' : 'നാട്ടിലെ വിൽപന & വാടക ലിസ്റ്റിംഗുകൾ.';

    const rentalsBannerSub = document.getElementById('rentalsBannerSub');
    if (rentalsBannerSub) rentalsBannerSub.textContent = isEn ? 'Find the best deals near you.' : 'യഥാർത്ഥ ആളുകളിൽ നിന്ന് മികച്ച ഡീലുകൾ കണ്ടെത്താം.';

    // 4. Home Screen 6 Category Cards & Business Banner
    const catCards = document.querySelectorAll('.home-kerala-cat-grid .kerala-cat-card');
    if (catCards && catCards.length >= 6) {
      // Card 1: Blood
      const c1Title = catCards[0].querySelector('.kerala-cat-title');
      const c1Sub = catCards[0].querySelector('.kerala-cat-sub');
      if (c1Title) c1Title.textContent = isEn ? 'Blood Donation' : 'രക്തദാനം';
      if (c1Sub) c1Sub.textContent = isEn ? 'Donate blood... Save lives...' : 'രക്തം നൽകാം... ജീവൻ രക്ഷിക്കാം...';

      // Card 2: Emergency
      const c2Title = catCards[1].querySelector('.kerala-cat-title');
      const c2Sub = catCards[1].querySelector('.kerala-cat-sub');
      if (c2Title) c2Title.textContent = isEn ? 'Emergency & Police' : 'അടിയന്തിരം & പോലീസ്';
      if (c2Sub) c2Sub.textContent = isEn ? 'Police, ambulances, hospitals...' : 'പോലീസ്, ആംബുലൻസ്, ഫയർഫോഴ്സ്...';

      // Card 3: Services
      const c3Title = catCards[2].querySelector('.kerala-cat-title');
      const c3Sub = catCards[2].querySelector('.kerala-cat-sub');
      if (c3Title) c3Title.textContent = isEn ? 'Services' : 'സേവനങ്ങൾ';
      if (c3Sub) c3Sub.textContent = isEn ? '18+ services in one place' : '18+ സേവനങ്ങൾ ഒരൊറ്റയിടത്ത്';

      // Card 4: Jobs
      const c4Title = catCards[3].querySelector('.kerala-cat-title');
      const c4Sub = catCards[3].querySelector('.kerala-cat-sub');
      if (c4Title) c4Title.textContent = isEn ? 'Jobs' : 'തൊഴിലുകൾ';
      if (c4Sub) c4Sub.textContent = isEn ? 'Job opportunities near you' : 'നിങ്ങളുടെ നാട്ടിലെ തൊഴിലവസരങ്ങൾ';

      // Card 5: Rentals
      const c5Title = catCards[4].querySelector('.kerala-cat-title');
      const c5Sub = catCards[4].querySelector('.kerala-cat-sub');
      if (c5Title) c5Title.textContent = isEn ? 'Rentals & Marketplace' : 'വാടക & വ്യാപാരം';
      if (c5Sub) c5Sub.textContent = isEn ? 'Homes, rooms, and equipment for rent' : 'വീടുകൾ, മുറികൾ, ഉപകരണങ്ങൾ വാടകയ്ക്ക്';

      // Card 6: Nearby
      const c6Title = catCards[5].querySelector('.kerala-cat-title');
      const c6Sub = catCards[5].querySelector('.kerala-cat-sub');
      if (c6Title) c6Title.textContent = isEn ? 'Nearby Help' : 'സമീപ സഹായം';
      if (c6Sub) c6Sub.textContent = isEn ? 'Get help from people nearby (1–10 km)' : 'നാട്ടുകാരുടെ അടിയന്തിര സഹായം (1-10 km)';
    }

    const bizBanner = document.querySelector('.home-3d-business-banner');
    if (bizBanner) {
      const bTitle = bizBanner.querySelector('span:first-child');
      const bBadge = bizBanner.querySelector('span:last-child');
      const divs = bizBanner.querySelectorAll('div > div > div');
      if (bTitle) bTitle.textContent = isEn ? 'Local Businesses & Shops' : 'പ്രാദേശിക വ്യാപാരങ്ങൾ & കടകൾ';
      if (bBadge) bBadge.textContent = isEn ? 'NEW' : 'പുതിയത്';
      if (divs[1]) divs[1].textContent = isEn ? 'Supermarkets, hotels, bakeries & offers' : 'സൂപ്പർമാർക്കറ്റുകൾ, ഹോട്ടലുകൾ, ബേക്കറികൾ';
      if (divs[2]) divs[2].textContent = isEn ? 'Local shops • Order through chat' : 'നാട്ടിലെ കടകൾ • ചാറ്റ് വഴി ഓർഡർ ചെയ്യാം';
    }

    // 5. Category Filter Chips across screens
    // Chat Filter Chips
    const chatChips = {
      'all': isEn ? 'All' : 'എല്ലാം',
      'business': isEn ? '🏪 Shops' : '🏪 കടകൾ',
      'service': isEn ? '🛠️ Services' : '🛠️ സർവീസുകൾ',
      'blood': isEn ? '🩸 Blood' : '🩸 രക്തം',
      'rental': isEn ? '🏠 Rentals' : '🏠 വാടക',
      'job': isEn ? '💼 Jobs' : '💼 ജോലി',
      'other': isEn ? '👥 Citizens' : '👥 നാട്ടുകാർ'
    };
    document.querySelectorAll('#screen-chat .chat-filter-chip').forEach(btn => {
      const f = btn.getAttribute('data-filter');
      if (chatChips[f]) btn.textContent = chatChips[f];
    });

    // Nearby Help Category Chips
    const nearbyChips = {
      'all': isEn ? '🌟 All Help' : '🌟 എല്ലാ സഹായങ്ങളും',
      'emergency': isEn ? '🚨 Emergency' : '🚨 അടിയന്തിരം',
      'vehicle': isEn ? '🛞 Vehicle' : '🛞 വാഹനം',
      'medicine': isEn ? '💊 Medicine' : '💊 മരുന്ന്',
      'repair': isEn ? '🛠️ Repair' : '🛠️ റിപ്പയർ',
      'home': isEn ? '📦 Home Help' : '📦 വീട്ടുസഹായം'
    };
    document.querySelectorAll('#screen-nearby .nearby-cat-chip').forEach(btn => {
      const c = btn.getAttribute('data-cat');
      if (nearbyChips[c]) btn.textContent = nearbyChips[c];
    });

    // Rentals Category Chips
    const rentalChips = {
      'all': isEn ? '🌟 All' : '🌟 എല്ലാം',
      'rent': isEn ? '🏠 For Rent' : '🏠 വാടകയ്ക്ക്',
      'buysell': isEn ? '🏷️ Buy & Sell' : '🏷️ വിൽപനയ്ക്ക്',
      'house': isEn ? '🏡 Homes & Plots' : '🏡 വീട് & സ്ഥലം',
      'vehicle': isEn ? '🚗 Vehicles' : '🚗 വാഹനങ്ങൾ',
      'tool': isEn ? '🚜 Equipment & Tools' : '🚜 യന്ത്രങ്ങൾ & ടൂളുകൾ'
    };
    document.querySelectorAll('#screen-rentals .rental-cat-chip').forEach(btn => {
      const c = btn.getAttribute('data-cat');
      if (rentalChips[c]) btn.textContent = rentalChips[c];
    });

    // Jobs Category Chips
    const jobChips = {
      'all': isEn ? 'All' : 'എല്ലാം',
      'driver': isEn ? 'Driver' : 'ഡ്രൈവർ',
      'sales': isEn ? 'Sales' : 'സെയിൽസ്',
      'office': isEn ? 'Office' : 'ഓഫീസ്',
      'hotel': isEn ? 'Hotel & Cook' : 'ഹോട്ടൽ & കുക്ക്',
      'delivery': isEn ? 'Delivery' : 'ഡെലിവറി'
    };
    document.querySelectorAll('#screen-jobs .job-cat-chip').forEach(btn => {
      const c = btn.getAttribute('data-cat');
      if (jobChips[c]) btn.textContent = jobChips[c];
    });

    // Post Type Chips
    const postChips = {
      'announcement': isEn ? '📣 Announcement' : '📣 അറിയിപ്പ്',
      'photo': isEn ? '🖼️ Photo' : '🖼️ ഫോട്ടോ',
      'offer': isEn ? '🏷️ Offer' : '🏷️ ഓഫർ'
    };
    document.querySelectorAll('#screen-add .post-type-chip').forEach(btn => {
      const text = btn.textContent.toLowerCase();
      if (text.includes('അറിയിപ്പ്') || text.includes('announcement')) btn.textContent = postChips['announcement'];
      else if (text.includes('ഫോട്ടോ') || text.includes('photo')) btn.textContent = postChips['photo'];
      else if (text.includes('ഓഫർ') || text.includes('offer')) btn.textContent = postChips['offer'];
    });

    // Radius Filter Labels & "All" Chips
    document.querySelectorAll('.radius-filter-label').forEach(el => {
      el.textContent = isEn ? '🎯 Radius:' : '🎯 പരിധി:';
    });
    document.querySelectorAll('.radius-chip').forEach(chip => {
      const onclickAttr = chip.getAttribute('onclick') || '';
      if (onclickAttr.includes('99999') || chip.textContent.includes('All') || chip.textContent.includes('എല്ലാം')) {
        chip.textContent = isEn ? 'All' : 'മുഴുവൻ';
      }
    });

    // 6. Action Button Labels across Screens
    const sRegBtn = document.querySelector('.services-kerala-top-bar button span:last-child');
    if (sRegBtn) sRegBtn.textContent = isEn ? 'Register' : 'രജിസ്റ്റർ';

    const sReqBtn = document.querySelector('.home-kerala-search-action-btn span:first-child');
    if (sReqBtn) sReqBtn.textContent = isEn ? 'Request' : 'ആവശ്യപ്പെടാം';

    const jPostBtn = document.querySelector('#screen-jobs button[onclick*="openPostJobModal"]');
    if (jPostBtn) jPostBtn.textContent = isEn ? '➕ Post Job' : '➕ തൊഴിൽ നൽകാം';

    const rPostBtn = document.querySelector('#screen-rentals button[onclick*="openAddRentalModal"]');
    if (rPostBtn) rPostBtn.textContent = isEn ? '➕ Add Listing' : '➕ ലിസ്റ്റ് ചെയ്യാം';

    const bDonorBtn = document.getElementById('bloodRegisterDonorBtn') || document.querySelector('#screen-blood button[onclick*="openRegisterDonorModal"]');
    if (bDonorBtn) bDonorBtn.textContent = isEn ? '➕ Become Donor' : '➕ ദാതാവാകാം';

    const bReqBtn = document.getElementById('bloodRequestModalBtn') || document.querySelector('#screen-blood button[onclick*="openBloodRequestModal"]');
    if (bReqBtn) bReqBtn.textContent = isEn ? '🚨 Request Blood' : '🚨 റിക്വസ്റ്റ്';

    const cPostBtn = document.querySelector('#screen-community header button:last-child');
    if (cPostBtn) cPostBtn.innerHTML = `<span>➕ ${isEn ? 'Post' : 'പോസ്റ്റ്'}</span>`;

    const addPhotoBtn = document.querySelector('#screen-add button[onclick*="postFileInput"] span');
    if (addPhotoBtn) addPhotoBtn.textContent = isEn ? '📸 Attach Photo' : '📸 ഫോട്ടോ ചേർക്കാം';

    const publishPostBtn = document.querySelector('#screen-add button.primary-action-btn span');
    if (publishPostBtn) publishPostBtn.textContent = isEn ? '✈ Publish Post' : '✈ പോസ്റ്റ് പബ്ലിഷ് ചെയ്യുക';

    // 7. Profile Screen Sub-tabs
    const tabTimeline = document.querySelector('.profile-subtab-btn[data-tab="posts"]');
    if (tabTimeline) tabTimeline.innerHTML = `📝 ${dict.tabTimeline}`;

    const tabPhotos = document.querySelector('.profile-subtab-btn[data-tab="photos"]');
    if (tabPhotos) tabPhotos.innerHTML = `🖼️ ${dict.tabPhotos}`;

    const tabAbout = document.querySelector('.profile-subtab-btn[data-tab="about"]');
    if (tabAbout) tabAbout.innerHTML = `ℹ️ ${dict.tabAbout}`;

    const tabListings = document.querySelector('.profile-subtab-btn[data-tab="services"]');
    if (tabListings) tabListings.innerHTML = `🛠️ ${dict.tabListings}`;

    // 8. District Dropdowns (Kannur, Kozhikode, Wayanad...)
    const districtOptions = [
      { val: 'കണ്ണൂർ', en: 'Kannur' },
      { val: 'കോഴിക്കോട്', en: 'Kozhikode' },
      { val: 'വയനാട്', en: 'Wayanad' },
      { val: 'കാസർഗോഡ്', en: 'Kasaragod' },
      { val: 'മലപ്പുറം', en: 'Malappuram' },
      { val: 'തൃശ്ശൂർ', en: 'Thrissur' },
      { val: 'എറണാകുളം', en: 'Ernakulam' },
      { val: 'ഇടുക്കി', en: 'Idukki' },
      { val: 'കോട്ടയം', en: 'Kottayam' },
      { val: 'ആലപ്പുഴ', en: 'Alappuzha' },
      { val: 'പത്തനംതിട്ട', en: 'Pathanamthitta' },
      { val: 'കൊല്ലം', en: 'Kollam' },
      { val: 'തിരുവനന്തപുരം', en: 'Thiruvananthapuram' },
      { val: 'പാലക്കാട്', en: 'Palakkad' },
      { val: 'മറ്റുള്ളവ', en: 'Other / Outside Kerala' }
    ];
    document.querySelectorAll('select').forEach(sel => {
      const isDistrictSelect = sel.id && (sel.id.toLowerCase().includes('district') || sel.name.toLowerCase().includes('district'));
      if (isDistrictSelect) {
        districtOptions.forEach(opt => {
          const optEl = sel.querySelector(`option[value="${opt.val}"]`);
          if (optEl) {
            optEl.textContent = isEn ? opt.en : opt.val;
          }
        });
      }
    });

    // 9. Any elements marked with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // 10. Placeholders with data-i18n-ph
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.getAttribute('data-i18n-ph');
      if (dict[key]) {
        el.placeholder = dict[key];
      }
    });
  }

  // Comprehensive Trade / Category Dictionaries for complete Malayalam -> English translation
  const TRADE_TRANSLATIONS = {
    'ഇലക്ട്രീഷ്യൻ': 'Electrician',
    'പ്ലംബർ': 'Plumber',
    'എസി & ഫ്രിഡ്ജ്': 'AC & Refrigerator Repair',
    'എസി മെക്കാനിക്': 'AC Mechanic',
    'ഫ്രിഡ്ജ് റിപ്പയർ': 'Refrigerator Repair',
    'ആശാരി': 'Carpenter',
    'കാർപന്റർ': 'Carpenter',
    'പെയിന്റർ': 'Painter',
    'ക്ലീനിംഗ്': 'Cleaning & Deep Clean',
    'മേസൺ & വാർപ്പ്': 'Mason & Concreting',
    'മേസൺ': 'Mason',
    'വെൽഡിങ് & ഗ്രിൽ': 'Welding & Grills',
    'വെൽഡിങ്': 'Welding',
    'കൃഷി & തോട്ടം': 'Gardening & Farming',
    'ബ്യൂട്ടീഷ്യൻ': 'Beautician & Makeup',
    'സിസിടിവി': 'CCTV & Security',
    'കാറ്ററിംഗ്': 'Catering & Cooking',
    'ടൈലറിംഗ്': 'Tailoring & Stitching',
    'ഹോം നഴ്സിംഗ്': 'Home Nursing & Care',
    'ട്യൂഷൻ': 'Tuition & Classes',
    'വാട്ടർ സപ്ലൈ': 'Water Supply & Tanker',
    'വർക്ക്‌ഷോപ്പ്': 'Auto Mechanic & Workshop',
    'മെക്കാനിക്': 'Mechanic',
    'ടിവി & മെഷീൻ': 'TV & Appliances Repair',
    'വാഷിംഗ് മെഷീൻ': 'Washing Machine Repair',
    'ടൈൽ & ഗ്രാനൈറ്റ്': 'Tiles & Granite Work',
    'റൂഫിംഗ് ട്രസ്സ്': 'Roofing & Truss Work',
    'അലുമിനിയം വർക്ക്': 'Aluminium Fabrication',
    'പാക്കേഴ്സ് മൂവേഴ്സ്': 'Packers & Movers',
    'സെപ്റ്റിക് ടാങ്ക്': 'Septic Tank Cleaning',
    'തെങ്ങ് കയറ്റം': 'Coconut Tree Climber',
    'കിണർ പണി': 'Well Digging & Cleaning',
    'സോളാർ സിസ്റ്റം': 'Solar & Inverter Systems',
    'ഫോട്ടോഗ്രാഫി': 'Photography & Video',
    'സൗണ്ട് & ലൈറ്റ്': 'Sound & Lighting',
    'ഗ്യാസ് സ്റ്റൗ': 'Gas Stove Repair',
    'പെസ്റ്റ് കൺട്രോൾ': 'Pest Control',
    'ഓട്ടോറിക്ഷ': 'Auto Rickshaw',
    'ഓട്ടോ ഡ്രൈവർ': 'Auto Driver',
    'ടാക്സി കാർ': 'Taxi Cab',
    'ട്രാവലർ/വാൻ': 'Traveller / Van',
    'ടൂറിസ്റ്റ് ബസ്': 'Tourist Bus',
    'പിക്കപ്പ് വാൻ': 'Pickup Van',
    'ഗുഡ്സ് ഓട്ടോ': 'Goods Auto',
    'ജീപ്പ് 4x4': 'Jeep 4x4',
    'ലോറി/ടിപ്പർ': 'Lorry / Tipper',
    'JCB/ഹിറ്റാച്ചി': 'JCB / Excavator',
    'ക്രെയിൻ/റിക്കവറി': 'Crane / Recovery Tow',
    'ആംബുലൻസ്': 'Ambulance 24x7',
    'ഡ്രൈവർ': 'Driver',
    'വാഹനങ്ങൾ': 'Vehicles & Transport',
    'മുഴുവൻ വാഹനങ്ങളും': 'All Vehicles',
    'എല്ലാം': 'All'
  };

  const PLACE_TRANSLATIONS = {
    'കണ്ണൂർ': 'Kannur',
    'കോഴിക്കോട്': 'Kozhikode',
    'വയനാട്': 'Wayanad',
    'കാസർഗോഡ്': 'Kasaragod',
    'മലപ്പുറം': 'Malappuram',
    'തൃശ്ശൂർ': 'Thrissur',
    'എറണാകുളം': 'Ernakulam',
    'ഇടുക്കി': 'Idukki',
    'കോട്ടയം': 'Kottayam',
    'ആലപ്പുഴ': 'Alappuzha',
    'പത്തനംതിട്ട': 'Pathanamthitta',
    'കൊല്ലം': 'Kollam',
    'തിരുവനന്തപുരം': 'Thiruvananthapuram',
    'പാലക്കാട്': 'Palakkad',
    'കേരളം': 'Kerala',
    'തത്സമയ ലൊക്കേഷൻ': 'Live Location',
    'തത്സമയം': 'Live',
    'ചങ്ങനാശ്ശേരി': 'Changanassery',
    'പാലാ': 'Pala',
    'വൈക്കം': 'Vaikom',
    'തലശ്ശേരി': 'Thalassery',
    'പയ്യന്നൂർ': 'Payyannur',
    'തളിപ്പറമ്പ്': 'Taliparamba',
    'വടകര': 'Vadakara',
    'കൊയിലാണ്ടി': 'Koyilandy',
    'മഞ്ചേരി': 'Manjeri',
    'തിരൂർ': 'Tirur',
    'പൊന്നാനി': 'Ponnani',
    'പെരിന്തൽമണ്ണ': 'Perinthalmanna',
    'ഗുരുവായൂർ': 'Guruvayur',
    'കൊടുങ്ങല്ലൂർ': 'Kodungallur',
    'ആലുവ': 'Aluva',
    'അങ്കമാലി': 'Angamaly',
    'പെരുമ്പാവൂർ': 'Perumbavoor',
    'മൂവാറ്റുപുഴ': 'Muvattupuzha',
    'കോതമംഗലം': 'Kothamangalam',
    'തൊടുപുഴ': 'Thodupuzha',
    'കട്ടപ്പന': 'Kattappana',
    'മൂന്നാർ': 'Munnar',
    'ചേർത്തല': 'Cherthala',
    'കായംകുളം': 'Kayamkulam',
    'മാവേലിക്കര': 'Mavelikkara',
    'തിരുവല്ല': 'Thiruvalla',
    'അടൂർ': 'Adoor',
    'പന്തളം': 'Pandalam',
    'പുനലൂർ': 'Punalur',
    'കൊട്ടാരക്കര': 'Kottarakkara',
    'കരുനാഗപ്പള്ളി': 'Karunagappally',
    'നെയ്യാറ്റിൻകര': 'Neyyattinkara',
    'നെടുമങ്ങാട്': 'Nedumangad',
    'ആറ്റിങ്ങൽ': 'Attingal',
    'വർക്കല': 'Varkala',
    'ഒറ്റപ്പാലം': 'Ottapalam',
    'ഷൊർണൂർ': 'Shoranur',
    'ചിറ്റൂർ': 'Chittur',
    'മണ്ണാർക്കാട്': 'Mannarkkad',
    'കൽപ്പറ്റ': 'Kalpetta',
    'മാനന്തവാടി': 'Mananthavady',
    'സുൽത്താൻ ബത്തേരി': 'Sultan Bathery',
    'കാഞ്ഞങ്ങാട്': 'Kanhangad',
    'നീലേശ്വരം': 'Nileshwaram'
  };

  function translateTrade(val, targetLang) {
    if (!val) return '';
    const lang = targetLang || currentLang;
    if (lang !== 'en') return val;
    const trimmed = String(val).trim();
    if (TRADE_TRANSLATIONS[trimmed]) return TRADE_TRANSLATIONS[trimmed];
    for (const [ml, en] of Object.entries(TRADE_TRANSLATIONS)) {
      if (trimmed.includes(ml)) return en;
    }
    return val;
  }

  function translatePlace(val, targetLang) {
    if (!val) return '';
    const lang = targetLang || currentLang;
    if (lang !== 'en') return val;
    let res = String(val);
    for (const [ml, en] of Object.entries(PLACE_TRANSLATIONS)) {
      if (res.includes(ml)) {
        res = res.split(ml).join(en);
      }
    }
    return res;
  }

  function translateText(val, targetLang) {
    if (!val) return '';
    const lang = targetLang || currentLang;
    if (lang !== 'en') return val;
    let res = String(val);
    for (const [ml, en] of Object.entries(TRADE_TRANSLATIONS)) {
      if (res.includes(ml)) res = res.split(ml).join(en);
    }
    for (const [ml, en] of Object.entries(PLACE_TRANSLATIONS)) {
      if (res.includes(ml)) res = res.split(ml).join(en);
    }
    res = res.replace(/വിസിറ്റിംഗ് നിരക്ക്/g, 'Visiting Fee')
             .replace(/ഇപ്പോൾ ലഭ്യമാണ്/g, 'Available Now')
             .replace(/ബുക്കിംഗ് അനുസരിച്ച്/g, 'By Appointment')
             .replace(/അകലെ/g, 'away')
             .replace(/പരിചയസമ്പന്നൻ/g, 'Experienced')
             .replace(/വർഷത്തെ പരിചയം/g, 'Years Experience')
             .replace(/സ്റ്റാൻഡ്:/g, 'Stand:')
             .replace(/നാട്ടുകാരൻ/g, 'Citizen')
             .replace(/പ്രാദേശിക സുഹൃത്ത്/g, 'Local Friend')
             .replace(/രക്തദാതാവ്/g, 'Blood Donor')
             .replace(/രക്തഗ്രൂപ്പ്/g, 'Blood Group')
             .replace(/വാടകയ്ക്ക്/g, 'For Rent')
             .replace(/വിൽപനയ്ക്ക്/g, 'For Sale')
             .replace(/മാസം/g, 'month')
             .replace(/പ്രതിമാസം/g, 'per month')
             .replace(/വർഷം/g, 'year')
             .replace(/രജിസ്റ്റർ ചെയ്തവർ:/g, 'Registered Donors:')
             .replace(/അടിയന്തിരം/g, 'Urgent')
             .replace(/ലഭ്യമല്ല/g, 'Not available')
             .replace(/സ്വകാര്യ നമ്പർ/g, 'Private Number');
    return res;
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
    TRANSLATIONS: TRANSLATIONS,
    translateTrade,
    translatePlace,
    translateText
  };
  window.setAppLanguage = setAppLanguage;
  window.getTranslation = getTranslation;
})();
