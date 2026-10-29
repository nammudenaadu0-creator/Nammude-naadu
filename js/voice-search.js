/**
 * Nammude Naadu — Universal Voice Search Engine
 * Supports Malayalam (ml-IN) & English (en-IN) Speech Recognition
 * Works on Mobile WebView, Chrome, Edge, Safari (Capacitor & Web)
 */

(function (window, document) {
  'use strict';

  var activeRecognition = null;
  var currentTargetInputId = null;
  var currentActiveBtn = null;

  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;

  /**
   * Check if speech recognition is available in current environment
   */
  function isVoiceSearchSupported() {
    return !!SpeechRecognition;
  }

  /**
   * Universal trigger for voice search on any input element
   * @param {string} inputId - ID of input element
   * @param {HTMLElement|string} btnElementOrId - Mic button triggering the voice search
   * @param {Function} [customCallback] - Optional callback function to execute on result
   */
  function toggleVoiceSearch(inputId, btnElementOrId, customCallback) {
    var inputEl = document.getElementById(inputId);
    var btnEl = typeof btnElementOrId === 'string' ? document.getElementById(btnElementOrId) : btnElementOrId;

    if (!inputEl) {
      console.warn('[VoiceSearch] Target input element not found:', inputId);
      return;
    }

    // If already listening on this input, stop it
    if (activeRecognition && currentTargetInputId === inputId) {
      stopVoiceSearch();
      return;
    }

    // If listening on another input, stop that one first
    if (activeRecognition) {
      stopVoiceSearch();
    }

    if (!isVoiceSearchSupported()) {
      showToast('⚠️ ഈ ബ്രൗസറിൽ വോയ്‌സ് സെർച്ച് ലഭ്യമല്ല (Voice search not supported)');
      return;
    }

    try {
      var recognition = new SpeechRecognition();
      activeRecognition = recognition;
      currentTargetInputId = inputId;
      currentActiveBtn = btnEl;

      // Prefer Malayalam (ml-IN), fallback to en-IN if preferred
      var lang = 'ml-IN';
      if (window.CURRENT_LANG === 'en') {
        lang = 'en-IN';
      }
      recognition.lang = lang;
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 3;

      // Visual state: Start listening
      setListeningUI(inputEl, btnEl, true);

      // Light haptic feedback if supported
      if (navigator.vibrate) {
        try { navigator.vibrate(60); } catch (e) {}
      }

      showToast('🎙️ കേൾക്കുന്നു... പറയൂ (Listening... speak now)', 3000);

      recognition.onstart = function () {
        setListeningUI(inputEl, btnEl, true);
      };

      recognition.onresult = function (event) {
        if (!event.results || !event.results[0] || !event.results[0][0]) return;
        var transcript = event.results[0][0].transcript.trim();
        if (transcript) {
          // Set value into input field
          inputEl.value = transcript;
          inputEl.focus();

          // Dispatch input & change events for live listeners
          inputEl.dispatchEvent(new Event('input', { bubbles: true }));
          inputEl.dispatchEvent(new Event('change', { bubbles: true }));

          showToast('🎤 "' + transcript + '" എന്ന് തിരയുന്നു...', 2500);

          // Execute custom callback if provided
          if (typeof customCallback === 'function') {
            customCallback(transcript);
          } else {
            // Smart auto-trigger based on input ID
            triggerAutoSearch(inputId, transcript);
          }
        }
      };

      recognition.onerror = function (event) {
        console.warn('[VoiceSearch] Recognition error:', event.error);
        if (event.error === 'not-allowed') {
          showToast('⚠️ മൈക്രോഫോൺ അനുമതി നൽകുക (Microphone permission denied)', 3500);
        } else if (event.error === 'no-speech') {
          showToast('ശബ്ദം കേട്ടില്ല, വീണ്ടും ശ്രമിക്കുക (No speech detected)', 2500);
        } else {
          showToast('വോയ്‌സ് സെർച്ചിൽ പിശക് (' + event.error + ')', 2500);
        }
        stopVoiceSearch();
      };

      recognition.onend = function () {
        stopVoiceSearch();
      };

      recognition.start();
    } catch (err) {
      console.error('[VoiceSearch] Start failed:', err);
      showToast('വോയ്‌സ് സെർച്ച് ആരംഭിക്കാൻ കഴിഞ്ഞില്ല', 2500);
      stopVoiceSearch();
    }
  }

  /**
   * Stop active speech recognition and reset UI
   */
  function stopVoiceSearch() {
    if (activeRecognition) {
      try {
        activeRecognition.stop();
      } catch (e) {}
      activeRecognition = null;
    }

    if (currentTargetInputId) {
      var inputEl = document.getElementById(currentTargetInputId);
      setListeningUI(inputEl, currentActiveBtn, false);
      currentTargetInputId = null;
      currentActiveBtn = null;
    }
  }

  /**
   * Update UI styling when listening starts/stops
   */
  function setListeningUI(inputEl, btnEl, isListening) {
    if (btnEl) {
      if (isListening) {
        btnEl.classList.add('voice-mic-listening');
        btnEl.setAttribute('title', 'കേൾക്കുന്നു... ക്ലിക്ക് ചെയ്താൽ നിർത്താം');
      } else {
        btnEl.classList.remove('voice-mic-listening');
        btnEl.setAttribute('title', 'വോയ്‌സ് വഴി തിരയാൻ ക്ലിക്ക് ചെയ്യുക (Voice Search)');
      }
    }

    if (inputEl) {
      if (isListening) {
        inputEl.dataset.origPlaceholder = inputEl.placeholder || '';
        inputEl.placeholder = '🎙️ കേൾക്കുന്നു... സംസാരിക്കൂ (Listening...)';
        inputEl.classList.add('voice-input-listening');
      } else {
        if (inputEl.dataset.origPlaceholder !== undefined) {
          inputEl.placeholder = inputEl.dataset.origPlaceholder;
          delete inputEl.dataset.origPlaceholder;
        }
        inputEl.classList.remove('voice-input-listening');
      }
    }
  }

  /**
   * Smart auto-trigger for specific known search inputs with Malayalam Voice Intent Intelligence
   */
  function triggerAutoSearch(inputId, query) {
    var q = (query || '').toLowerCase().trim();

    // 1. Smart Malayalam Voice Intent Router on Home Search
    if (inputId === 'homeSearchInput') {
      if (q.includes('രക്ത') || q.includes('blood') || q.includes('ബ്ലഡ്') || q.includes('ഡോണർ') || q.includes('donor')) {
        showToast('🩸 രക്തദാന വിഭാഗം തുറക്കുന്നു...', 2000);
        if (typeof window.openBloodModal === 'function') {
          setTimeout(window.openBloodModal, 300);
          return;
        }
      }
      if (q.includes('ആംബുലൻസ്') || q.includes('ambulance') || q.includes('പോലീസ്') || q.includes('police') || q.includes('അപകടം') || q.includes('emergency')) {
        showToast('🚨 അത്യാഹിത വിഭാഗം തുറക്കുന്നു...', 2000);
        if (typeof window.openAmbulanceModal === 'function') {
          setTimeout(window.openAmbulanceModal, 300);
          return;
        }
      }
      if (q.includes('ജോലി') || q.includes('job') || q.includes('തൊഴിൽ') || q.includes('വേക്കൻസി')) {
        showToast('💼 തൊഴിൽ അവസരങ്ങളിലേക്ക് പോകുന്നു...', 2000);
        if (typeof window.navTo === 'function') {
          setTimeout(function() { window.navTo('jobs'); }, 300);
          return;
        }
      }
      if (q.includes('വാടക') || q.includes('rent') || q.includes('റന്റൽ') || q.includes('റൂം')) {
        showToast('🏡 റെന്റൽ & വീടുകളിലേക്ക് പോകുന്നു...', 2000);
        if (typeof window.navTo === 'function') {
          setTimeout(function() { window.navTo('rentals'); }, 300);
          return;
        }
      }
      if (q.includes('പോസ്റ്റ്') || q.includes('നാട്ടുകൂട്ടം') || q.includes('വാർത്ത') || q.includes('വിശേഷങ്ങൾ')) {
        showToast('📢 നാട്ടുകൂട്ടം പോസ്റ്റുകളിലേക്ക് പോകുന്നു...', 2000);
        if (typeof window.navTo === 'function') {
          setTimeout(function() { window.navTo('community'); }, 300);
          return;
        }
      }

      // Direct Services Routing: Plumber, Electrician, Carpenter, Driver, Painter, Tailor, AC Mech, etc.
      var tradesMap = {
        'പ്ലംബർ': 'plumber', 'plumber': 'plumber',
        'ഇലക്ട്രീഷ്യൻ': 'electrician', 'electrician': 'electrician',
        'ഡ്രൈവർ': 'driver', 'driver': 'driver',
        'പെയിന്റർ': 'painter', 'painter': 'painter',
        'തയ്യൽ': 'tailor', 'tailor': 'tailor',
        'ഓട്ടോ': 'driver', 'auto': 'driver',
        'മെക്കാനിക്': 'mechanic', 'mechanic': 'mechanic',
        'കൂലിപ്പണി': 'labour', 'മരപ്പണി': 'carpenter', 'carpenter': 'carpenter'
      };
      for (var key in tradesMap) {
        if (q.includes(key)) {
          showToast('⚡ ' + key + ' സർവീസുകളിലേക്ക് പോകുന്നു...', 2000);
          if (typeof window.navTo === 'function') {
            window.navTo('services');
            setTimeout(function() {
              if (typeof window.selectServiceCategoryChip === 'function') {
                window.selectServiceCategoryChip(tradesMap[key]);
              }
            }, 350);
            return;
          }
        }
      }

      // Default home search execution
      if (typeof window.triggerHomeSearch === 'function') {
        window.triggerHomeSearch();
      }
      return;
    }

    if (inputId === 'nearbySearchInput' && typeof window.filterNearbyPeople === 'function') {
      window.filterNearbyPeople(query);
    } else if (inputId === 'serviceSearchInput' && typeof window.handleServicesSearchInput === 'function') {
      window.handleServicesSearchInput(query);
    } else if (inputId === 'businessSearchInput' && typeof window.handleBusinessSearchInput === 'function') {
      window.handleBusinessSearchInput(query);
    } else if (inputId === 'chatSearchInput' && typeof window.filterChatList === 'function') {
      window.filterChatList(query);
    } else if (inputId === 'newChatSearchInput' && typeof window.filterNewChatList === 'function') {
      window.filterNewChatList(query);
    } else if (inputId === 'jobSearchInput' && typeof window.filterJobs === 'function') {
      window.filterJobs(query);
    } else if (inputId === 'rentalSearchInput' && typeof window.filterRentals === 'function') {
      window.filterRentals(query);
    }
  }

  /**
   * Helper to show temporary toast message
   */
  function showToast(msg, duration) {
    if (typeof window.showToast === 'function') {
      window.showToast(msg, duration || 2500);
      return;
    }
    // Fallback lightweight toast
    var toast = document.createElement('div');
    toast.className = 'voice-search-toast';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(function () {
      toast.classList.add('fade-out');
      setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, duration || 2500);
  }

  // Export functions to global scope
  window.isVoiceSearchSupported = isVoiceSearchSupported;
  window.toggleVoiceSearch = toggleVoiceSearch;
  window.stopVoiceSearch = stopVoiceSearch;

})(window, document);
