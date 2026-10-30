/**
 * NAMMUDE NAADU - COMPREHENSIVE MULTILINGUAL (i18n) TRANSLATION ENGINE
 * Supports: Malayalam (ml), English (en), and Hindi (hi)
 * Guarantees 100% Pure Language Isolation (Zero Malayalam in English, Zero English in Malayalam)
 */

(function () {
  'use strict';

  const TRANSLATIONS = {
    ml: {
      appName: 'നമ്മുടെ നാട്',
      appTagline: 'നാടിനൊപ്പം നാം 🌿',
      brandSubtitle: 'നാടിനൊപ്പം നാം 🌿',
      chatBrandSubtitle: 'സന്ദേശങ്ങൾ • സംഭാഷണം • കൂട്ടായ്മ',
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
      servicesTitle: 'സേവനങ്ങൾ',
      businessTitle: 'വ്യാപാരങ്ങൾ & കടകൾ',
      quickServiceReq: '⚡ ആവശ്യപ്പെടാം',
      registerService: 'രജിസ്റ്റർ',
      addShop: 'കട ചേർക്കാം',
      categoriesTitle: 'വിഭാഗങ്ങൾ',
      jobsTitle: 'തൊഴിൽ അവസരങ്ങൾ',
      jobsSubtitle: 'നിങ്ങളുടെ ഭാവി രൂപപ്പെടുത്താം',
      postJob: 'തൊഴിൽ നൽകാം',
      searchJobs: 'തൊഴിൽ തിരയാം',
      jobsBannerTitle: 'ശരിയായ ജോലി, ശരിയായ സ്ഥലത്ത് കണ്ടെത്താം.',
      jobsBannerSub: 'നാട്ടിലെ തൊഴിൽദാതാക്കളുമായും മികച്ച അവസരങ്ങളുമായും ബന്ധപ്പെടാം.',
      rentalsTitle: 'വാടക & വ്യാപാരം',
      rentalsSubtitle: 'വാങ്ങാം • വിൽക്കാം • വാടകയ്ക്ക്',
      addListing: 'ലിസ്റ്റ് ചെയ്യാം',
      myListings: 'എന്റെ ലിസ്റ്റിംഗുകൾ',
      rentalsBannerTitle: 'നാട്ടിലെ വിൽപന & വാടക ലിസ്റ്റിംഗുകൾ.',
      rentalsBannerSub: 'യഥാർത്ഥ ആളുകളിൽ നിന്ന് മികച്ച ഡീലുകൾ കണ്ടെത്താം.',
      bloodHeroTitle: 'രക്തം നൽകാം ജീവൻ രക്ഷിക്കാം',
      bloodHeroSub: 'ഒരു രക്തദാതാവാകൂ. ഒരു ജീവൻ രക്ഷിക്കൂ.',
      becomeDonor: 'രക്തദാതാവാകാം',
      requestBlood: 'രക്തം ആവശ്യപ്പെടാം',
      registeredDonors: 'രജിസ്റ്റർ ചെയ്തവർ',
      nearYou: 'സമീപം',
      newChat: 'പുതിയ ചാറ്റ്',
      settingsTitle: 'ക്രമീകരണങ്ങൾ',
      settingsSubtitle: 'നമ്മുടെ നാട് ആപ്പ് മുൻഗണനകൾ & നിയന്ത്രണങ്ങൾ',
      settingsLangSection: 'ആപ്പ് ഭാഷ',
      settingsLangSub: 'ആപ്പിൽ ഉപയോഗിക്കേണ്ട ഭാഷ തിരഞ്ഞെടുക്കാം',
      settingsLocSection: 'ലൊക്കേഷൻ & പരിധി',
      settingsVersionSection: 'ആപ്പ് വേർഷൻ & അപ്‌ഡേറ്റുകൾ',
      settingsNotifSection: 'അറിയിപ്പുകൾ',
      settingsNotifSub: 'തത്സമയ അറിയിപ്പുകൾ & അലർട്ടുകൾ',
      settingsPrivacySection: 'സ്വകാര്യത & നിയമപരമായ വിവരങ്ങൾ',
      settingsPrivacyPolicy: 'പ്രൈവസി പോളിസി',
      settingsTerms: 'നിബന്ധനകളും പെരുമാറ്റച്ചട്ടവും',
      settingsDataSecurity: 'ഡാറ്റാ സംരക്ഷണവും സുരക്ഷയും',
      settingsExportData: 'എന്റെ ഡാറ്റ ഡൗൺലോഡ് ചെയ്യാം',
      settingsClearCache: 'ആപ്പ് കാഷെ ക്ലിയർ ചെയ്യാം',
      settingsLogout: 'ലോഗ് ഔട്ട് / അക്കൗണ്ട് മാറ്റാം',
      settingsDeleteAccount: 'അക്കൗണ്ട് ശാശ്വതമായി ഡിലീറ്റ് ചെയ്യാം',
      settingsDeleteWarning: 'ഡിലീറ്റ് ചെയ്താൽ നിങ്ങളുടെ പ്രൊഫൈൽ, സർവീസുകൾ, മെസ്സേജുകൾ എന്നിവ ക്ലൗഡിൽ നിന്നും പൂർണ്ണമായി മായ്ക്കപ്പെടും.',
      changeBtn: 'മാറ്റാം',
      checkBtn: 'പരിശോധിക്കാം',
      setupBtn: 'സജ്ജീകരിക്കാം',
      editBtn: 'എഡിറ്റ്',
      langPickerTitle: 'ഭാഷ തിരഞ്ഞെടുക്കുക',
      langPickerSub: 'ആപ്പിൽ ഉപയോഗിക്കാൻ ആഗ്രഹിക്കുന്ന ഭാഷ തിരഞ്ഞെടുക്കൂ',
      langPickerMalayalam: 'മലയാളം',
      langPickerMalayalamSub: 'കേരളത്തിന്റെ സ്വന്തം ഭാഷ (ഡിഫോൾട്ട്)',
      langPickerEnglish: 'English',
      langPickerEnglishSub: 'Universal & Global Language',
      continueBtn: 'തുടങ്ങാം ➔',
    },
    en: {
      appName: 'Nammude Naadu',
      appTagline: 'Together with our community 🌿',
      brandSubtitle: 'People • Support • Community',
      chatBrandSubtitle: 'Messages • Conversations • Community',
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
      servicesTitle: 'Services',
      businessTitle: 'Businesses & Shops',
      quickServiceReq: '⚡ Request',
      registerService: 'Register',
      addShop: 'Add Shop',
      categoriesTitle: 'Categories',
      jobsTitle: 'Jobs & Careers',
      jobsSubtitle: 'Build your future',
      postJob: 'Post a Job',
      searchJobs: 'Search Jobs',
      jobsBannerTitle: 'Find the right job, in the right place.',
      jobsBannerSub: 'Get connected with local employers and career opportunities near you.',
      rentalsTitle: 'Rentals & Marketplace',
      rentalsSubtitle: 'Buy • Sell • Rent • Trade',
      addListing: 'Add Listing',
      myListings: 'My Listings',
      rentalsBannerTitle: 'Local listings. Real people.',
      rentalsBannerSub: 'Find the best deals near you.',
      bloodHeroTitle: 'Give Blood Save Lives',
      bloodHeroSub: 'Be a donor. Be a hero.',
      becomeDonor: 'Become a Donor',
      requestBlood: 'Request Blood',
      registeredDonors: 'Registered Donors',
      nearYou: 'Near You',
      newChat: 'New Chat',
      settingsTitle: 'Settings',
      settingsSubtitle: 'App Preferences & Controls',
      settingsLangSection: 'App Language',
      settingsLangSub: 'Choose language to use in the app',
      settingsLocSection: 'Location & Radius',
      settingsVersionSection: 'App Version & Updates',
      settingsNotifSection: 'Notifications',
      settingsNotifSub: 'Real-time alerts & messaging notifications',
      settingsPrivacySection: 'Privacy & Legal Compliance',
      settingsPrivacyPolicy: 'Privacy Policy',
      settingsTerms: 'Terms of Service & Guidelines',
      settingsDataSecurity: 'Data Security & Protection',
      settingsExportData: 'Export / Download My Data',
      settingsClearCache: 'Clear App Cache & Refresh',
      settingsLogout: 'Logout / Switch Account',
      settingsDeleteAccount: 'Delete Account Permanently',
      settingsDeleteWarning: 'Permanently removes your profile, listings, services and chat messages from cloud servers.',
      changeBtn: 'Change',
      checkBtn: 'Check',
      setupBtn: 'Configure',
      editBtn: 'Edit',
      langPickerTitle: 'Select Language',
      langPickerSub: 'Choose your preferred language to continue',
      langPickerMalayalam: 'മലയാളം',
      langPickerMalayalamSub: 'Kerala Native Language (Default)',
      langPickerEnglish: 'English',
      langPickerEnglishSub: 'Universal & Global Language',
      continueBtn: 'Continue ➔',
    },
    hi: {
      appName: 'नम्मुडे नाडु (हमारा गांव)',
      appTagline: 'गांव के साथ, हम सब 🌿',
      brandSubtitle: 'लोग • सहायता • समुदाय',
      chatBrandSubtitle: 'संदेश • बातचीत • समुदाय',
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
      whatsOnYourMind: 'आपके मन में क्या है? यहां साझा करें...',
      sharePost: 'पोस्ट करें',
      saveProfile: '💾 बदलाव सेव करें',
      cancel: 'रद्द करें',
      logout: '🚪 लॉग आउट',
      bloodNetwork: '🩸 रक्तदान नेटवर्क',
      adminConsole: '⚙️ एडमिन कंसोल',
      privacyPolicy: '🛡️ गोपनीयता नीति',
      verifiedResident: '✓ सत्यापित निवासी',
      guestUser: 'अतिथि',
      fullName: 'पूरा नाम',
      phoneNumber: 'मोबाइल नंबर',
      locationArea: 'स्थान / गांव / शहर',
      district: 'जिला',
      bloodGroup: 'रक्त समूह',
      donorConsent: '🩸 रक्तदान करने के लिए रजिस्टर करें',
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
      businessTitle: 'व्यापार और दुकानें',
      quickServiceReq: '⚡ 1-टैप सेवा',
      registerService: 'रजिस्टर करें',
      addShop: 'दुकान जोड़ें',
      categoriesTitle: 'श्रेणियां',
      jobsTitle: 'नौकरियां और करियर',
      jobsSubtitle: 'अपना भविष्य बनाएं',
      postJob: 'नौकरी पोस्ट करें',
      searchJobs: 'नौकरियां खोजें',
      jobsBannerTitle: 'सही जगह पर, सही नौकरी पाएं।',
      jobsBannerSub: 'स्थानीय नियोक्ताओं और करियर के अवसरों से जुड़ें।',
      rentalsTitle: 'किराया और बाज़ार',
      rentalsSubtitle: 'खरीदें • बेचें • किराए पर लें',
      addListing: 'लिस्टिंग जोड़ें',
      myListings: 'मेरी लिस्टिंग',
      rentalsBannerTitle: 'स्थानीय लिस्टिंग। वास्तविक लोग।',
      rentalsBannerSub: 'अपने आस-पास सबसे अच्छे सौदे पाएं।',
      bloodHeroTitle: 'रक्तदान करें जीवन बचाएं',
      bloodHeroSub: 'रक्तदाता बनें। नायक बनें।',
      becomeDonor: 'रक्तदाता बनें',
      requestBlood: 'रक्त का अनुरोध करें',
      registeredDonors: 'पंजीकृत रक्तदाता',
      nearYou: 'आस-पास',
      newChat: 'नई चैट'
    }
  };

  let currentLang = localStorage.getItem('nn_app_language') || 'ml';

  function getTranslation(key, defaultText) {
    const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.ml;
    return dict[key] || defaultText || key;
  }

  function setAppLanguage(lang, silent) {
    if (!TRANSLATIONS[lang]) lang = 'ml';
    currentLang = lang;
    try {
      localStorage.setItem('nn_app_language', lang);
    } catch (_) {}

    document.documentElement.lang = lang;

    // Synchronize trades catalog names
    if (window.TRADES_CATALOG_500 && Array.isArray(window.TRADES_CATALOG_500)) {
      const isEn = lang === 'en';
      window.TRADES_CATALOG_500.forEach(t => {
        t.name = isEn ? (t.en || t.name_en || t.name) : (t.ml || t.name_ml || t.name);
      });
    }

    applyTranslationsToDOM();

    // Re-render screens
    if (typeof window.APP_STATE !== 'undefined') {
      window.APP_STATE.appLanguage = lang;
    }
    if (typeof window.renderServicesCategoriesGrid === 'function') {
      window.renderServicesCategoriesGrid();
    }
    if (typeof window.renderServicesScreen === 'function') {
      window.renderServicesScreen();
    }
    if (typeof window.renderJobsScreen === 'function') {
      window.renderJobsScreen();
    }
    if (typeof window.renderRentalsScreen === 'function') {
      window.renderRentalsScreen();
    }
    if (typeof window.renderBloodScreen === 'function') {
      window.renderBloodScreen();
    }
    if (typeof window.renderChatListScreen === 'function') {
      window.renderChatListScreen();
    }
    if (typeof window.renderProfileScreen === 'function' && window.APP_STATE && window.APP_STATE.currentScreen === 'profile') {
      window.renderProfileScreen();
    }
    if (typeof window.renderHomeScreen === 'function' && window.APP_STATE && window.APP_STATE.currentScreen === 'home') {
      window.renderHomeScreen();
    }

    // Update language switcher chips
    document.querySelectorAll('.lang-select-chip').forEach(chip => {
      const targetLang = chip.getAttribute('data-lang');
      if (targetLang === lang) {
        chip.classList.add('active');
        chip.style.borderColor = '#0C2B59';
        chip.style.background = '#EFF6FF';
        chip.style.color = '#0C2B59';
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
    const isEn = currentLang === 'en';

    // 1. Home Header & Search
    const homeBrand = document.getElementById('homeBrandTitle');
    if (homeBrand) homeBrand.textContent = isEn ? 'Nammude Naadu' : 'നമ്മുടെ നാട്';

    const homeSearchInput = document.getElementById('homeSearchInput');
    if (homeSearchInput) homeSearchInput.placeholder = isEn ? 'Search village services and people...' : 'സേവനങ്ങളും കടകളും ആളുകളും തിരയുക...';

    const homeSearchBtn = document.getElementById('homeSearchBtnTxt');
    if (homeSearchBtn) homeSearchBtn.textContent = isEn ? 'Search' : 'തിരയുക';

    const homeGlobalSearch = document.getElementById('homeGlobalSearchInput');
    if (homeGlobalSearch) homeGlobalSearch.placeholder = isEn ? 'Search village services and people...' : 'സേവനങ്ങളും കടകളും ആളുകളും തിരയുക...';

    const desktopSearch = document.getElementById('desktopSearchInput');
    if (desktopSearch) desktopSearch.placeholder = isEn ? 'Search village services and people...' : 'സേവനങ്ങളും കടകളും ആളുകളും തിരയുക...';

    const homeSecCat = document.getElementById('homeSecCategoriesTitle');
    if (homeSecCat) homeSecCat.textContent = isEn ? 'Categories' : 'വിഭാഗങ്ങൾ';

    const homeSecViewAll = document.getElementById('homeSecCategoriesViewAll');
    if (homeSecViewAll) homeSecViewAll.textContent = isEn ? 'View All' : 'എല്ലാം കാണുക';

    // 2. Home Screen 6 Category Cards (Strictly 100% Pure in both languages)
    const catCards = document.querySelectorAll('.home-kerala-cat-grid .kerala-cat-card');
    if (catCards && catCards.length >= 6) {
      const c1Title = catCards[0].querySelector('.kerala-cat-title');
      const c1Sub = catCards[0].querySelector('.kerala-cat-sub');
      if (c1Title) c1Title.textContent = isEn ? 'Blood Donation' : 'രക്തദാനം';
      if (c1Sub) c1Sub.textContent = isEn ? 'Donate blood... Save lives...' : 'രക്തം നൽകൂ... ജീവൻ രക്ഷിക്കൂ...';

      const c2Title = catCards[1].querySelector('.kerala-cat-title');
      const c2Sub = catCards[1].querySelector('.kerala-cat-sub');
      if (c2Title) c2Title.textContent = isEn ? 'Emergency & Police' : 'അടിയന്തിരം & പോലീസ്';
      if (c2Sub) c2Sub.textContent = isEn ? 'Police, ambulances, hospitals...' : 'പോലീസ്, ആംബുലൻസ്, ആശുപത്രികൾ...';

      const c3Title = catCards[2].querySelector('.kerala-cat-title');
      const c3Sub = catCards[2].querySelector('.kerala-cat-sub');
      if (c3Title) c3Title.textContent = isEn ? 'Services' : 'സേവനങ്ങൾ';
      if (c3Sub) c3Sub.textContent = isEn ? '18+ services in one place' : '18+ സേവനങ്ങൾ ഒരു കുടക്കീഴിൽ';

      const c4Title = catCards[3].querySelector('.kerala-cat-title');
      const c4Sub = catCards[3].querySelector('.kerala-cat-sub');
      if (c4Title) c4Title.textContent = isEn ? 'Jobs' : 'തൊഴിലുകൾ';
      if (c4Sub) c4Sub.textContent = isEn ? 'Job opportunities near you' : 'തൊഴിൽ അവസരങ്ങൾ നിങ്ങൾക്ക് സമീപം';

      const c5Title = catCards[4].querySelector('.kerala-cat-title');
      const c5Sub = catCards[4].querySelector('.kerala-cat-sub');
      if (c5Title) c5Title.textContent = isEn ? 'Rentals & Marketplace' : 'വാടക & വിൽപന';
      if (c5Sub) c5Sub.textContent = isEn ? 'Homes, rooms, and equipment for rent' : 'വാടക വീടുകൾ, റൂമുകൾ, ഉപകരണങ്ങൾ';

      const c6Title = catCards[5].querySelector('.kerala-cat-title');
      const c6Sub = catCards[5].querySelector('.kerala-cat-sub');
      if (c6Title) c6Title.textContent = isEn ? 'Nearby Help' : 'സമീപ സഹായം';
      if (c6Sub) c6Sub.textContent = isEn ? 'Get help from people nearby (1–10 km)' : 'അടുത്തുള്ളവരിൽ നിന്ന് (1-10 km)';
    }

    // 3. Home Business Showcase Banner & Community Feed
    const hbTitle = document.getElementById('homeBizTitle');
    if (hbTitle) hbTitle.textContent = isEn ? 'Businesses & Shops' : 'വ്യാപാരങ്ങൾ & കടകൾ';

    const hbBadge = document.getElementById('homeBizBadge');
    if (hbBadge) hbBadge.textContent = isEn ? 'NEW' : 'പുതിയത്';

    const hbSub1 = document.getElementById('homeBizSub1');
    if (hbSub1) hbSub1.textContent = isEn ? 'Supermarkets, hotels, bakeries & offers' : 'സൂപ്പർമാർക്കറ്റ്, ഹോട്ടൽ, ബേക്കറി & ഓഫറുകൾ';

    const hbSub2 = document.getElementById('homeBizSub2');
    if (hbSub2) hbSub2.textContent = isEn ? 'Local shops • Order through chat' : 'നാട്ടിലെ കടകൾ • ഒരൊറ്റ ചാറ്റ് ബോക്സ് ഓർഡർ';

    const hcTitle = document.getElementById('homeCommTitle');
    if (hcTitle) hcTitle.textContent = isEn ? 'Community Updates' : 'കമ്മ്യൂണിറ്റി വിശേഷങ്ങൾ';

    const hcSub = document.getElementById('homeCommSub');
    if (hcSub) hcSub.textContent = isEn ? 'See recent posts from neighbors' : 'നാട്ടുകാർ പങ്കുവെച്ച പുതിയ പോസ്റ്റുകൾ കാണാം';

    const hNearLbl = document.getElementById('homeTopNearLabel');
    if (hNearLbl) hNearLbl.textContent = isEn ? '🔥 Nearby' : '🔥 അടുത്തുള്ളവർ';

    const hTopProv = document.getElementById('homeTopProvidersTitle');
    if (hTopProv) hTopProv.textContent = isEn ? 'Top Service Providers' : 'പ്രമുഖ സേവനദാതാക്കൾ';

    const hNearBtn = document.getElementById('homeNearbyHelpBtn');
    if (hNearBtn) hNearBtn.textContent = isEn ? '🤝 Help Requests ›' : '🤝 സഹായങ്ങൾ ›';

    const nearTitle = document.getElementById('nearbyScreenHeaderTitle');
    if (nearTitle) nearTitle.textContent = isEn ? 'Nearby Help' : 'ഒരു ഹെൽപ്പ് വേണം';

    // 4. Bottom Navigation Bar Items (Precise ID-based selection)
    const nh = document.getElementById('navHomeLabel');
    if (nh) nh.textContent = isEn ? 'Home' : 'ഹോം';

    const ns = document.getElementById('navServicesLabel');
    if (ns) ns.textContent = isEn ? 'Services' : 'സേവനങ്ങൾ';

    const na = document.getElementById('navAddLabel');
    if (na) na.textContent = isEn ? 'Post' : 'പോസ്റ്റ്';

    const nc = document.getElementById('navChatLabel');
    if (nc) nc.textContent = isEn ? 'Chat' : 'ചാറ്റ്';

    const ncomm = document.getElementById('navCommunityLabel');
    if (ncomm) ncomm.textContent = isEn ? 'Community' : 'നാട്ടുകൂട്ടം';

    // 5. Desktop Navigation Items
    const desktopNavMap = {
      home: isEn ? 'Home' : 'ഹോം',
      community: isEn ? 'Community' : 'നാട്ടുകൂട്ടം',
      services: isEn ? 'Services' : 'സേവനങ്ങൾ',
      jobs: isEn ? 'Jobs' : 'തൊഴിൽ അവസരങ്ങൾ',
      rentals: isEn ? 'Rentals & Marketplace' : 'വാടക & വിൽപന',
      blood: isEn ? 'Blood Network' : 'രക്തദാനം',
      nearby: isEn ? 'Nearby Help' : 'സമീപ സഹായം',
      chat: isEn ? 'Chat' : 'ചാറ്റ്',
      profile: isEn ? 'My Profile' : 'എന്റെ പ്രൊഫൈൽ',
      settings: isEn ? 'Settings' : 'ക്രമീകരണങ്ങൾ',
      admin: isEn ? 'Admin Console' : 'അഡ്മിൻ കൺസോൾ'
    };
    document.querySelectorAll('.desktop-nav-label').forEach(el => {
      const k = el.getAttribute('data-nav');
      if (desktopNavMap[k]) el.textContent = desktopNavMap[k];
    });

    // 6. Superapp Brand Titles & Subtitles across screens
    document.querySelectorAll('.superapp-brand-title').forEach(el => {
      el.textContent = isEn ? 'Nammude Naadu' : 'നമ്മുടെ നാട്';
    });

    document.querySelectorAll('#screen-jobs .superapp-brand-sub, #screen-rentals .superapp-brand-sub, #screen-blood .superapp-brand-sub').forEach(el => {
      el.textContent = isEn ? 'People • Support • Community' : 'നാടിനൊപ്പം നാം 🌿';
    });

    const chatSub = document.querySelector('#screen-chat .superapp-brand-sub');
    if (chatSub) chatSub.textContent = isEn ? 'Messages • Conversations • Community' : 'സന്ദേശങ്ങൾ • സംഭാഷണം • കൂട്ടായ്മ';

    document.querySelectorAll('.user-live-city-name').forEach(el => {
      if (el.textContent.trim() === 'Live Location' || el.textContent.trim() === 'തത്സമയ ലൊക്കേഷൻ') {
        el.textContent = isEn ? 'Live Location' : 'തത്സമയ ലൊക്കേഷൻ';
      }
    });

    // 7. Services Screen
    const servHeader = document.querySelector('#screen-services h1');
    if (servHeader) servHeader.textContent = isEn ? 'Services' : 'സേവനങ്ങൾ';

    const servRegBtn = document.querySelector('#screen-services .services-kerala-top-bar button span:last-child');
    if (servRegBtn) servRegBtn.textContent = isEn ? 'Register' : 'രജിസ്റ്റർ';

    const servReqBtn = document.querySelector('#screen-services .home-kerala-search-action-btn span:first-child');
    if (servReqBtn) servReqBtn.textContent = isEn ? 'Request' : 'ആവശ്യപ്പെടാം';

    const servSecTitle = document.querySelector('#screen-services .home-kerala-sec-title');
    if (servSecTitle) servSecTitle.textContent = isEn ? 'Categories' : 'വിഭാഗങ്ങൾ';

    const servSearch = document.getElementById('serviceSearchInput');
    if (servSearch) servSearch.placeholder = isEn ? 'Plumber, driver, electrician, taxi...' : 'പ്ലംബർ, ഡ്രൈവർ, ഇലക്ട്രീഷ്യൻ, ടാക്സി...';

    // 8. Business Screen
    const bizHeader = document.querySelector('#screen-business h1');
    if (bizHeader) bizHeader.textContent = isEn ? 'Businesses & Shops' : 'വ്യാപാരങ്ങൾ & കടകൾ';

    const bizAddBtn = document.querySelector('#screen-business .services-kerala-top-bar button span:last-child');
    if (bizAddBtn) bizAddBtn.textContent = isEn ? 'Add Shop' : 'കട ചേർക്കാം';

    const bizSecTitle = document.querySelector('#screen-business .home-kerala-sec-title');
    if (bizSecTitle) bizSecTitle.textContent = isEn ? 'Categories' : 'വിഭാഗങ്ങൾ';

    // 9. Jobs Screen
    const jobsHeroTitle = document.querySelector('#screen-jobs .superapp-hero-title');
    if (jobsHeroTitle) jobsHeroTitle.textContent = isEn ? 'Jobs & Careers' : 'തൊഴിൽ അവസരങ്ങൾ';

    const jobsHeroSub = document.querySelector('#screen-jobs .superapp-hero-sub');
    if (jobsHeroSub) jobsHeroSub.textContent = isEn ? 'Build your future' : 'നിങ്ങളുടെ ഭാവി രൂപപ്പെടുത്താം';

    const heroPostJobTxt = document.getElementById('heroPostJobTxt');
    if (heroPostJobTxt) heroPostJobTxt.textContent = isEn ? 'Post a Job' : 'തൊഴിൽ നൽകാം';

    const heroSearchJobsTxt = document.getElementById('heroSearchJobsTxt');
    if (heroSearchJobsTxt) heroSearchJobsTxt.textContent = isEn ? 'Search Jobs' : 'തൊഴിൽ തിരയാം';

    const jobsBannerTitle = document.getElementById('jobsBannerTitle');
    if (jobsBannerTitle) jobsBannerTitle.textContent = isEn ? 'Find the right job, in the right place.' : 'ശരിയായ ജോലി, ശരിയായ സ്ഥലത്ത് കണ്ടെത്താം.';

    const jobsBannerSub = document.getElementById('jobsBannerSub');
    if (jobsBannerSub) jobsBannerSub.textContent = isEn ? 'Get connected with local employers and career opportunities near you.' : 'നാട്ടിലെ തൊഴിൽദാതാക്കളുമായും മികച്ച അവസരങ്ങളുമായും ബന്ധപ്പെടാം.';

    const jobSearch = document.getElementById('jobSearchInput');
    if (jobSearch) jobSearch.placeholder = isEn ? 'Search jobs, skills or company...' : 'തൊഴിലുകൾ, കഴിവുകൾ, സ്ഥാപനങ്ങൾ തിരയുക...';

    // 10. Rentals Screen
    const rentHeroTitle = document.querySelector('#screen-rentals .superapp-hero-title');
    if (rentHeroTitle) rentHeroTitle.textContent = isEn ? 'Rentals & Marketplace' : 'വാടക & വ്യാപാരം';

    const rentHeroSub = document.querySelector('#screen-rentals .superapp-hero-sub');
    if (rentHeroSub) rentHeroSub.textContent = isEn ? 'Buy • Sell • Rent • Trade' : 'വാങ്ങാം • വിൽക്കാം • വാടകയ്ക്ക്';

    const heroAddListingTxt = document.getElementById('heroAddListingTxt');
    if (heroAddListingTxt) heroAddListingTxt.textContent = isEn ? 'Add Listing' : 'ലിസ്റ്റ് ചെയ്യാം';

    const heroMyListingsTxt = document.getElementById('heroMyListingsTxt');
    if (heroMyListingsTxt) heroMyListingsTxt.textContent = isEn ? 'My Listings' : 'എന്റെ ലിസ്റ്റിംഗുകൾ';

    const rentalsBannerTitle = document.getElementById('rentalsBannerTitle');
    if (rentalsBannerTitle) rentalsBannerTitle.textContent = isEn ? 'Local listings. Real people.' : 'നാട്ടിലെ വിൽപന & വാടക ലിസ്റ്റിംഗുകൾ.';

    const rentalsBannerSub = document.getElementById('rentalsBannerSub');
    if (rentalsBannerSub) rentalsBannerSub.textContent = isEn ? 'Find the best deals near you.' : 'യഥാർത്ഥ ആളുകളിൽ നിന്ന് മികച്ച ഡീലുകൾ കണ്ടെത്താം.';

    const rentSearch = document.getElementById('rentalSearchInput');
    if (rentSearch) rentSearch.placeholder = isEn ? 'Search for properties, items or services...' : 'വാടക വീട്, വാഹനം, ഉപകരണങ്ങൾ തിരയുക...';

    // 11. Blood Screen
    const bloodHeroTitle = document.querySelector('#screen-blood .superapp-hero-title');
    if (bloodHeroTitle) bloodHeroTitle.textContent = isEn ? 'Give Blood Save Lives' : 'രക്തം നൽകാം ജീവൻ രക്ഷിക്കാം';

    const bloodHeroSub = document.querySelector('#screen-blood .superapp-hero-sub');
    if (bloodHeroSub) bloodHeroSub.textContent = isEn ? 'Be a donor. Be a hero.' : 'ഒരു രക്തദാതാവാകൂ. ഒരു ജീവൻ രക്ഷിക്കൂ.';

    const heroBecomeDonorTxt = document.getElementById('heroBecomeDonorTxt');
    if (heroBecomeDonorTxt) heroBecomeDonorTxt.textContent = isEn ? 'Become a Donor' : 'രക്തദാതാവാകാം';

    const heroRequestBloodTxt = document.getElementById('heroRequestBloodTxt');
    if (heroRequestBloodTxt) heroRequestBloodTxt.textContent = isEn ? 'Request Blood' : 'രക്തം ആവശ്യപ്പെടാം';

    const bloodDonorsLabelTxt = document.getElementById('bloodDonorsLabelTxt');
    if (bloodDonorsLabelTxt) bloodDonorsLabelTxt.textContent = isEn ? 'Registered Donors' : 'രജിസ്റ്റർ ചെയ്തവർ';

    const bloodNearYouLabelTxt = document.getElementById('bloodNearYouLabelTxt');
    if (bloodNearYouLabelTxt) bloodNearYouLabelTxt.textContent = isEn ? 'Near You' : 'സമീപം';

    const bloodSearch = document.getElementById('bloodSearchInput');
    if (bloodSearch) bloodSearch.placeholder = isEn ? 'Search by blood group, donor name or phone...' : 'രക്തഗ്രൂപ്പ് (O+, A+), ദാതാവിന്റെ പേര്, ഫോൺ...';

    // 12. Chat Screen & Chat Modal
    const chatSearch = document.getElementById('chatSearchInput');
    if (chatSearch) chatSearch.placeholder = isEn ? 'Search messages or contacts...' : 'സന്ദേശങ്ങളോ ആളുകളെയോ തിരയുക...';

    const newChatBtn = document.querySelector('#screen-chat button[onclick*="openNewChatModal"] span:last-child');
    if (newChatBtn) newChatBtn.textContent = isEn ? 'New Chat' : 'പുതിയ ചാറ്റ്';

    const chatReplySender = document.getElementById('chatReplyPreviewSender');
    if (chatReplySender && (!window.APP_STATE || !window.APP_STATE.activeChatReply)) {
      chatReplySender.textContent = isEn ? '↩️ Reply' : '↩️ മറുപടി';
    }

    const chatReplyCancel = document.getElementById('chatReplyCancelBtn');
    if (chatReplyCancel) chatReplyCancel.title = isEn ? 'Cancel Reply' : 'മറുപടി ഒഴിവാക്കുക';

    const chatMenuReply = document.getElementById('chatMenuReplyLabel');
    if (chatMenuReply) chatMenuReply.textContent = isEn ? 'Reply' : 'മറുപടി നൽകുക';

    const chatMenuForward = document.getElementById('chatMenuForwardLabel');
    if (chatMenuForward) chatMenuForward.textContent = isEn ? 'Forward' : 'ഫോർവേഡ് ചെയ്യുക';

    const chatMenuCopy = document.getElementById('chatMenuCopyLabel');
    if (chatMenuCopy) chatMenuCopy.textContent = isEn ? 'Copy' : 'കോപ്പി ചെയ്യുക';

    const chatMenuDelete = document.getElementById('chatMenuDeleteLabel');
    if (chatMenuDelete) chatMenuDelete.textContent = isEn ? 'Delete' : 'ഡിലീറ്റ് ചെയ്യുക';

    const chatInputMsg = document.getElementById('chatInputMessage');
    if (chatInputMsg) chatInputMsg.placeholder = isEn ? 'Type a message...' : 'സന്ദേശം ടൈപ്പ് ചെയ്യുക...';

    const chatSend = document.getElementById('chatSendBtn');
    if (chatSend) chatSend.title = isEn ? 'Send message' : 'സന്ദേശം അയക്കാം';

    const chatPhoto = document.getElementById('chatPhotoBtn');
    if (chatPhoto) chatPhoto.title = isEn ? 'Send Photo' : 'ഫോട്ടോ അയക്കാം';

    const chatSticker = document.getElementById('chatStickerBtn');
    if (chatSticker) chatSticker.title = isEn ? 'Send Stickers' : 'സ്റ്റിക്കറുകൾ അയക്കാം';

    const chatVoice = document.getElementById('chatVoiceBtn');
    if (chatVoice) chatVoice.title = isEn ? 'Record Voice Message' : 'വോയ്സ് മെസ്സേജ് റെക്കോർഡ് ചെയ്യാം';

    // 13. Chips across screens
    const chatChipMap = {
      'all': isEn ? 'All' : 'എല്ലാം',
      'business': isEn ? 'Shops' : 'കടകൾ',
      'service': isEn ? 'Services' : 'സർവീസുകൾ',
      'blood': isEn ? 'Blood' : 'രക്തം',
      'rental': isEn ? 'Rentals' : 'വാടക',
      'job': isEn ? 'Jobs' : 'ജോലി',
      'other': isEn ? 'Citizens' : 'നാട്ടുകാർ'
    };
    const chatIcons = {
      'business': '🏪 ',
      'service': '🛠️ ',
      'blood': '🩸 ',
      'rental': '🏠 ',
      'job': '💼 ',
      'other': '👥 '
    };
    document.querySelectorAll('#screen-chat .chat-filter-chip').forEach(btn => {
      const f = btn.getAttribute('data-filter');
      if (chatChipMap[f]) btn.textContent = (chatIcons[f] || '') + chatChipMap[f];
    });

    const jobChipMap = {
      'all': isEn ? 'All' : 'എല്ലാം',
      'it': isEn ? 'IT & Software' : 'ഐടി & സോഫ്റ്റ്‌വെയർ',
      'education': isEn ? 'Education' : 'വിദ്യാഭ്യാസം',
      'healthcare': isEn ? 'Healthcare' : 'ആരോഗ്യം',
      'sales': isEn ? 'Sales & Marketing' : 'സെയിൽസ് & മാർക്കറ്റിംഗ്',
      'finance': isEn ? 'Finance' : 'ഫിനാൻസ്',
      'driver': isEn ? 'Driver' : 'ഡ്രൈവർ',
      'other': isEn ? 'Others' : 'മറ്റുള്ളവ'
    };
    document.querySelectorAll('#jobsCategoriesChipsBar .superapp-chip').forEach(btn => {
      const cat = btn.getAttribute('data-cat');
      if (jobChipMap[cat]) btn.textContent = jobChipMap[cat];
    });

    const rentalChipMap = {
      'all': isEn ? 'All' : 'എല്ലാം',
      'rent': isEn ? 'For Rent' : 'വാടകയ്ക്ക്',
      'buysell': isEn ? 'Buy & Sell' : 'വിൽപനയ്ക്ക്',
      'house': isEn ? 'Homes & Plots' : 'വീട് & സ്ഥലം',
      'vehicle': isEn ? 'Vehicles' : 'വാഹനങ്ങൾ',
      'electronics': isEn ? 'Electronics' : 'ഇലക്ട്രോണിക്സ്',
      'furniture': isEn ? 'Furniture' : 'ഫർണിച്ചർ',
      'other': isEn ? 'Other' : 'മറ്റുള്ളവ'
    };
    document.querySelectorAll('#rentalsCategoriesChipsBar .superapp-chip').forEach(btn => {
      const cat = btn.getAttribute('data-cat');
      if (rentalChipMap[cat]) btn.textContent = rentalChipMap[cat];
    });

    const bloodAllChip = document.querySelector('#bloodGroupChipsBar button[data-group="all"]');
    if (bloodAllChip) bloodAllChip.textContent = isEn ? 'All' : 'എല്ലാം';

    // 14. Settings Modal Elements (100% Pure Language Isolation)
    const setHeader = document.querySelector('#modal-settings h3');
    if (setHeader) setHeader.textContent = isEn ? 'Settings' : 'ക്രമീകരണങ്ങൾ';

    const setSub = document.querySelector('#modal-settings .settings-header-sub');
    if (setSub) setSub.textContent = isEn ? 'App Preferences & Controls' : 'നമ്മുടെ നാട് ആപ്പ് മുൻഗണനകൾ & നിയന്ത്രണങ്ങൾ';

    const setLangSec = document.getElementById('settingsLangSecTitle');
    if (setLangSec) setLangSec.textContent = isEn ? 'App Language' : 'ആപ്പ് ഭാഷ';

    const setLangSub = document.getElementById('settingsLangSecSub');
    if (setLangSub) setLangSub.textContent = isEn ? 'Choose language to use in the app' : 'ആപ്പിൽ ഉപയോഗിക്കേണ്ട ഭാഷ തിരഞ്ഞെടുക്കാം';

    const setLocSec = document.getElementById('settingsLocSecTitle');
    if (setLocSec) setLocSec.textContent = isEn ? 'Location & Radius' : 'ലൊക്കേഷൻ & പരിധി';

    const setNotifSec = document.getElementById('settingsNotifSecTitle');
    if (setNotifSec) setNotifSec.textContent = isEn ? 'Notifications' : 'അറിയിപ്പുകൾ';

    const setNotifSub = document.getElementById('settingsNotifSecSub');
    if (setNotifSub) setNotifSub.textContent = isEn ? 'Real-time alerts & messaging notifications' : 'തത്സമയ അറിയിപ്പുകൾ & അലർട്ടുകൾ';

    const setPrivSec = document.getElementById('settingsPrivacySecTitle');
    if (setPrivSec) setPrivSec.textContent = isEn ? 'Privacy & Legal Compliance' : 'സ്വകാര്യത & നിയമപരമായ വിവരങ്ങൾ';

    const setPrivLink = document.getElementById('settingsPrivacyPolicyTxt');
    if (setPrivLink) setPrivLink.textContent = isEn ? 'Privacy Policy' : 'പ്രൈവസി പോളിസി';

    const setTermsLink = document.getElementById('settingsTermsTxt');
    if (setTermsLink) setTermsLink.textContent = isEn ? 'Terms of Service & Guidelines' : 'നിബന്ധനകളും പെരുമാറ്റച്ചട്ടവും';

    const setSecLink = document.getElementById('settingsDataSecurityTxt');
    if (setSecLink) setSecLink.textContent = isEn ? 'Data Security & Protection' : 'ഡാറ്റാ സംരക്ഷണവും സുരക്ഷയും';

    const setExportLink = document.getElementById('settingsExportDataTxt');
    if (setExportLink) setExportLink.textContent = isEn ? 'Export / Download My Data' : 'എന്റെ ഡാറ്റ ഡൗൺലോഡ് ചെയ്യാം';

    const setCacheLink = document.getElementById('settingsClearCacheTxt');
    if (setCacheLink) setCacheLink.textContent = isEn ? 'Clear App Cache & Refresh' : 'ആപ്പ് കാഷെ ക്ലിയർ ചെയ്യാം';

    const setLogoutLink = document.getElementById('settingsLogoutTxt');
    if (setLogoutLink) setLogoutLink.textContent = isEn ? 'Logout / Switch Account' : 'ലോഗ് ഔട്ട് / അക്കൗണ്ട് മാറ്റാം';

    const setDelBtn = document.getElementById('settingsDeleteAccountTxt');
    if (setDelBtn) setDelBtn.textContent = isEn ? 'Delete Account Permanently' : 'അക്കൗണ്ട് ശാശ്വതമായി ഡിലീറ്റ് ചെയ്യാം';

    const setDelBtnAlt = document.getElementById('settingsDeleteAccountBtnTxt');
    if (setDelBtnAlt) setDelBtnAlt.textContent = isEn ? 'Delete Account Permanently' : 'അക്കൗണ്ട് ശാശ്വതമായി ഒഴിവാക്കാം';

    const setDelWarn = document.getElementById('settingsDeleteWarningTxt');
    if (setDelWarn) setDelWarn.textContent = isEn ? 'Permanently removes your profile, listings, services and chat messages from cloud servers.' : 'ഡിലീറ്റ് ചെയ്താൽ നിങ്ങളുടെ പ്രൊഫൈൽ, സർവീസുകൾ, മെസ്സേജുകൾ എന്നിവ ക്ലൗഡിൽ നിന്നും പൂർണ്ണമായി മായ്ക്കപ്പെടും.';

    const setDelWarnAlt = document.getElementById('settingsDeleteAccountWarningTxt');
    if (setDelWarnAlt) setDelWarnAlt.textContent = isEn ? 'Deleting your account will permanently remove your profile, posts, services, and chat messages from cloud.' : 'അക്കൗണ്ട് ഡിലീറ്റ് ചെയ്താൽ നിങ്ങളുടെ പ്രൊഫൈൽ, പോസ്റ്റുകൾ, സർവീസുകൾ, മെസ്സേജുകൾ എന്നിവ Supabase ക്ലൗഡിൽ നിന്നും പൂർണ്ണമായി മായ്ക്കപ്പെടും.';

    const setUserName = document.getElementById('settingsUserName');
    if (setUserName && (setUserName.textContent.trim() === 'Citizen' || setUserName.textContent.trim() === 'നാട്ടുകാരൻ')) {
      setUserName.textContent = isEn ? 'Citizen' : 'നാട്ടുകാരൻ';
    }

    const setUserPhone = document.getElementById('settingsUserPhone');
    if (setUserPhone) {
      const curTxt = setUserPhone.textContent.trim();
      if (curTxt.includes('ഫോൺ നമ്പർ') || curTxt.includes('Phone Number') || curTxt === '📱') {
        const phone = (window.APP_STATE && window.APP_STATE.currentUser && window.APP_STATE.currentUser.phone) || '';
        setUserPhone.textContent = phone ? ('📱 ' + phone) : (isEn ? '📱 Phone Number' : '📱 ഫോൺ നമ്പർ');
      }
    }

    const setLangSecTitle = document.getElementById('settingsLangSecTitle');
    if (setLangSecTitle) setLangSecTitle.textContent = isEn ? 'App Language' : 'ആപ്പ് ഭാഷ';

    const setLangMoreBtn = document.getElementById('settingsLangMoreBtn');
    if (setLangMoreBtn) setLangMoreBtn.textContent = isEn ? 'Details ›' : 'വിശദമായി ›';

    const setLangSecSub = document.getElementById('settingsLangSecSub');
    if (setLangSecSub) setLangSecSub.textContent = isEn ? 'Choose preferred app language' : 'ആപ്പിൽ ഉപയോഗിക്കേണ്ട ഭാഷ തിരഞ്ഞെടുക്കാം';

    const setLocSecTitle = document.getElementById('settingsLocSecTitle');
    if (setLocSecTitle) setLocSecTitle.textContent = isEn ? 'Location & Radius' : 'ലൊക്കേഷൻ & പരിധി';

    const setUserLoc = document.getElementById('settingsUserLoc');
    if (setUserLoc) {
      const curT = setUserLoc.textContent.trim();
      if (curT.includes('തത്സമയ') || curT.includes('Live')) {
        setUserLoc.textContent = isEn ? '📍 Live Location' : '📍 തത്സമയ ലൊക്കേഷൻ';
      }
    }

    const setUserRad = document.getElementById('settingsUserRadius');
    if (setUserRad) {
      const curR = (window.APP_STATE && window.APP_STATE.activeRadiusKm) || 5;
      setUserRad.textContent = curR >= 1000 ? (isEn ? 'All Kerala' : 'മുഴുവൻ') : (curR + (isEn ? ' km Radius' : ' km പരിധി'));
    }

    const setVerSec = document.getElementById('settingsVerSecTitle');
    if (setVerSec) setVerSec.textContent = isEn ? 'App Version & Updates' : 'ആപ്പ് വേർഷൻ & അപ്ഡേറ്റുകൾ';

    const setVerSub = document.getElementById('settingsVerSecSub');
    if (setVerSub) setVerSub.textContent = isEn ? 'Latest Version' : 'ഏറ്റവും പുതിയ വേർഷൻ';

    const setCheckUp = document.getElementById('settingsCheckUpdatesBtn');
    if (setCheckUp) setCheckUp.textContent = isEn ? 'Check' : 'പരിശോധിക്കാം';

    const setLocBtn = document.getElementById('settingsLocChangeBtn');
    if (setLocBtn) setLocBtn.textContent = isEn ? 'Change' : 'മാറ്റാം';

    const setNotifBtn = document.getElementById('settingsNotifSetupBtn');
    if (setNotifBtn) setNotifBtn.textContent = isEn ? 'Setup' : 'സജ്ജീകരിക്കാം';

    const setEditBtn = document.getElementById('settingsEditBtnTxt');
    if (setEditBtn) setEditBtn.textContent = isEn ? 'Edit' : 'എഡിറ്റ്';

    const setAdminTitle = document.getElementById('settingsAdminHubTitle');
    if (setAdminTitle) setAdminTitle.textContent = isEn ? 'Admin Console' : 'അഡ്മിൻ കൺസോൾ';

    const setAdminSub = document.getElementById('settingsAdminHubSub');
    if (setAdminSub) setAdminSub.textContent = isEn ? 'Manage services and helpline contacts' : 'സർവീസുകളും ഹെൽപ്പ്‌ലൈൻ നമ്പറുകളും കൈകാര്യം ചെയ്യാം';

    const setAdminBtn = document.getElementById('settingsAdminHubBtn');
    if (setAdminBtn) setAdminBtn.textContent = isEn ? 'Open ›' : 'തുറക്കുക ›';

    // Synchronize settings language chips
    document.querySelectorAll('.settings-lang-chip').forEach(btn => {
      const l = btn.getAttribute('data-lang');
      if (l === currentLang) {
        btn.style.background = '#0C2B59';
        btn.style.color = '#FFFFFF';
        btn.style.borderColor = '#0C2B59';
        btn.style.fontWeight = '800';
      } else {
        btn.style.background = '#FFFFFF';
        btn.style.color = '#334155';
        btn.style.borderColor = '#CBD5E1';
        btn.style.fontWeight = '600';
      }
    });

    // 15. Location Modal Elements
    const locTitle = document.getElementById('modalLocationTitle');
    if (locTitle) locTitle.textContent = isEn ? 'Location & Radius' : 'ലൊക്കേഷൻ & പരിധി';

    const locGpsBtn = document.getElementById('modalLocationGpsBtnTxt');
    if (locGpsBtn) locGpsBtn.textContent = isEn ? 'Live GPS Location' : 'തത്സമയ GPS ലൊക്കേഷൻ';

    const locRadSec = document.getElementById('modalLocationRadiusSecTitle');
    if (locRadSec) locRadSec.textContent = isEn ? 'Search Radius' : 'തിരച്ചിൽ പരിധി';

    const locRadAll = document.getElementById('modalRadChipAll');
    if (locRadAll) locRadAll.textContent = isEn ? 'All Kerala' : 'മുഴുവൻ';

    const locSearchLbl = document.getElementById('modalLocationSearchLabel');
    if (locSearchLbl) locSearchLbl.textContent = isEn ? 'Search / Select Place:' : 'സ്ഥലം തിരയുക / തിരഞ്ഞെടുക്കുക:';

    const locSearchInp = document.getElementById('presetTownSearchInput');
    if (locSearchInp) locSearchInp.placeholder = isEn ? 'Search city or panchayat...' : 'നഗരം അല്ലെങ്കിൽ പഞ്ചായത്ത് തിരയുക...';

    if (typeof window.renderPresetLocationsList === 'function' && document.getElementById('presetLocationsList')) {
      const q = locSearchInp ? locSearchInp.value : '';
      window.renderPresetLocationsList(null, q);
    }

    const fPriv = document.getElementById('footerPrivacyLink');
    if (fPriv) fPriv.textContent = isEn ? 'Privacy Policy' : 'സ്വകാര്യതാ നയം';

    // 15. Language Picker Modal
    const lpTitle = document.getElementById('langPickerModalTitle');
    if (lpTitle) lpTitle.textContent = isEn ? 'Select Language' : 'ഭാഷ തിരഞ്ഞെടുക്കുക';

    const lpSub = document.getElementById('langPickerModalSub');
    if (lpSub) lpSub.textContent = isEn ? 'Choose your preferred language to continue' : 'ആപ്പിൽ ഉപയോഗിക്കാൻ ആഗ്രഹിക്കുന്ന ഭാഷ തിരഞ്ഞെടുക്കൂ';

    const lpConf = document.getElementById('langConfirmBtn');
    if (lpConf) lpConf.textContent = isEn ? 'Continue ➔' : 'തുടങ്ങാം ➔';
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
    'എല്ലാം': 'All',
    'വീട് & സ്ഥലം': 'Homes & Plots',
    'ഉപകരണങ്ങൾ & ടൂളുകൾ': 'Equipment & Tools',
    'ജനറൽ': 'General',
    'വാടകയ്ക്ക്': 'For Rent',
    'വിൽപനയ്ക്ക്': 'For Sale',
    'ഐടി & സോഫ്റ്റ്‌വെയർ': 'IT & Software',
    'വിദ്യാഭ്യാസം': 'Education',
    'ആരോഗ്യം': 'Healthcare',
    'സെയിൽസ് & മാർക്കറ്റിംഗ്': 'Sales & Marketing',
    'ഫിനാൻസ്': 'Finance',
    'മറ്റുള്ളവ': 'Others'
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
  const _initI18n = () => {
    setAppLanguage(currentLang, true);
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _initI18n);
  } else {
    _initI18n();
  }

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
  window.getCurrentLanguage = () => currentLang;
})();
