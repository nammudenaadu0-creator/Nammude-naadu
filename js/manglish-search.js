/**
 * Nammude Naadu — Manglish-to-Malayalam Transliteration & Phonetic Search Engine
 * Enables searching Malayalam content by typing in Manglish (e.g. 'plumber', 'vadaka', 'veedu', 'joli', 'chora')
 */

(function (window) {
  'use strict';

  // 1. Comprehensive Malayalam-Manglish Dictionary of Common Community & Service Terms
  var DICTIONARY = {
    // Housing / Rentals / Properties
    'vadaka': ['വാടക', 'വാടകയ്ക്ക്'],
    'vaadaka': ['വാടക', 'വാടകയ്ക്ക്'],
    'rent': ['വാടക', 'വാടകയ്ക്ക്'],
    'rental': ['വാടക', 'വാടകയ്ക്ക്'],
    'veedu': ['വീട്', 'ഭവനം'],
    'veed': ['വീട്'],
    'house': ['വീട്'],
    'home': ['വീട്'],
    'room': ['റൂം', 'മുറി'],
    'muri': ['മുറി'],
    'parambu': ['പറമ്പ്', 'ഭൂമി'],
    'sthalam': ['സ്ഥലം'],
    'flat': ['ഫ്ലാറ്റ്'],
    'villa': ['വില്ല'],
    'shop': ['കട', 'കടകൾ'],
    'kada': ['കട', 'കടകൾ'],
    'kadakal': ['കടകൾ'],

    // Jobs / Work
    'joli': ['ജോലി', 'തൊഴിൽ'],
    'thozhil': ['തൊഴിൽ', 'ജോലി'],
    'pani': ['പണി', 'ജോലി'],
    'job': ['ജോലി', 'തൊഴിൽ'],
    'jobs': ['തൊഴിലുകൾ', 'ജോലി'],
    'work': ['ജോലി', 'പണി'],
    'driver': ['ഡ്രൈവർ'],
    'driving': ['ഡ്രൈവിംഗ്'],
    'sales': ['സെയിൽസ്'],
    'delivery': ['ഡെലിവറി'],
    'office': ['ഓഫീസ്'],
    'teacher': ['അധ്യാപകൻ', 'ടീച്ചർ'],
    'accountant': ['അക്കൗണ്ടന്റ്'],
    'cook': ['പാചകക്കാരൻ', 'കുക്ക്'],

    // Health / Blood / Emergency
    'raktham': ['രക്തം', 'രക്തദാനം'],
    'chora': ['രക്തം', 'രക്തദാനം'],
    'blood': ['രക്തം', 'രക്തദാനം'],
    'donor': ['രക്തദാതാവ്', 'ദാതാവ്', 'രക്തദാതാക്കൾ'],
    'donors': ['രക്തദാതാക്കൾ', 'ദാതാക്കൾ'],
    'hospital': ['ആശുപത്രി'],
    'aashupathri': ['ആശുപത്രി'],
    'doctor': ['ഡോക്ടർ'],
    'marunnu': ['മരുന്ന്'],
    'medicine': ['മരുന്ന്'],
    'ambulance': ['ആംബുലൻസ്'],
    'police': ['പോലീസ്'],
    'fire': ['ഫയർഫോഴ്സ്', 'ഫയർ'],
    'thee': ['ഫയർ', 'തീപിടുത്തം'],
    'theeppidutham': ['തീപിടുത്തം'],
    'kseb': ['കെഎസ്ഇബി', 'കെ.എസ്.ഇ.ബി', 'വൈദ്യുതി', 'കരണ്ട്'],
    'current': ['വൈദ്യുതി', 'കരണ്ട്'],
    'karandu': ['കരണ്ട്', 'വൈദ്യുതി'],
    'snake': ['പാമ്പ്', 'സർപ്പ', 'SARPA'],
    'paambu': ['പാമ്പ്', 'സർപ്പ'],
    'pambu': ['പാമ്പ്', 'സർപ്പ'],
    'sahayam': ['സഹായം', 'സഹായങ്ങൾ'],
    'help': ['സഹായം', 'സഹായങ്ങൾ'],
    'vanitha': ['വനിത', 'വനിതാ'],
    'women': ['വനിത', 'വനിതാ'],
    'child': ['ചൈൽഡ്', 'കുട്ടികൾ'],
    'kuttikal': ['കുട്ടികൾ', 'ചൈൽഡ്'],

    // Services / Trades
    'plumber': ['പ്ലംബർ', 'പ്ലംബിംഗ്'],
    'plumbing': ['പ്ലംബിംഗ്'],
    'electrician': ['ഇലക്ട്രീഷ്യൻ', 'വയറിംഗ്'],
    'wiring': ['വയറിംഗ്'],
    'carpenter': ['ആശാരി', 'തച്ചൻ', 'കാർപെന്റർ'],
    'ashari': ['ആശാരി'],
    'thachan': ['തച്ചൻ'],
    'painter': ['പെയിന്റർ'],
    'painting': ['പെയിന്റിംഗ്'],
    'mason': ['മേസ്തിരി'],
    'mesthiri': ['മേസ്തിരി'],
    'cleaning': ['ക്ലീനിംഗ്'],
    'clean': ['ക്ലീനിംഗ്'],
    'mechanic': ['മെക്കാനിക്'],
    'ac': ['എസി മെക്കാനിക്', 'എസി'],
    'beautician': ['ബ്യൂട്ടീഷ്യൻ'],
    'catering': ['കാറ്ററിംഗ്'],
    'tailor': ['തയ്യൽക്കാരൻ', 'ടെയ്‌ലർ'],
    'thayyal': ['തയ്യൽ'],
    'welding': ['വെൽഡിങ്'],
    'cctv': ['സിസിടിവി'],
    'taxi': ['ടാക്സി', 'വാഹനം'],
    'auto': ['ഓട്ടോ', 'ഓട്ടോറിക്ഷ'],
    'autorickshaw': ['ഓട്ടോറിക്ഷ'],
    'vandi': ['വാഹനം', 'വണ്ടി'],
    'vahana': ['വാഹനം'],
    'car': ['കാർ'],
    'bike': ['ബൈക്ക്'],

    // Chat / Messages
    'sandesham': ['സന്ദേശം', 'സന്ദേശങ്ങൾ'],
    'sandeshangal': ['സന്ദേശങ്ങൾ'],
    'chat': ['ചാറ്റ്', 'സന്ദേശം'],
    'message': ['സന്ദേശം', 'സന്ദേശങ്ങൾ'],
    'aalkkar': ['ആളുകൾ', 'നാട്ടുകാർ'],
    'nattukar': ['നാട്ടുകാർ', 'നാട്ടുകാരും'],
    'suhruthu': ['സുഹൃത്ത്'],
    'friend': ['സുഹൃത്ത്'],

    // Districts of Kerala
    'kannur': ['കണ്ണൂർ'],
    'kozhikode': ['കോഴിക്കോട്'],
    'calicut': ['കോഴിക്കോട്'],
    'malappuram': ['മലപ്പുറം'],
    'wayanad': ['വയനാട്'],
    'kasaragod': ['കാസർഗോഡ്'],
    'palakkad': ['പാലക്കാട്'],
    'thrissur': ['തൃശ്ശൂർ'],
    'trichur': ['തൃശ്ശൂർ'],
    'ernakulam': ['എറണാകുളം'],
    'kochi': ['കൊച്ചി', 'എറണാകുളം'],
    'cochin': ['കൊച്ചി'],
    'idukki': ['ഇടുക്കി'],
    'kottayam': ['കോട്ടയം'],
    'alappuzha': ['ആലപ്പുഴ'],
    'alleppey': ['ആലപ്പുഴ'],
    'pathanamthitta': ['പത്തനംതിട്ട'],
    'kollam': ['കൊല്ലം'],
    'quilon': ['കൊല്ലം'],
    'thiruvananthapuram': ['തിരുവനന്തപുരം'],
    'trivandrum': ['തിരുവനന്തപുരം']
  };

  // 2. Phonetic Substring Transliteration Map
  var CONSONANTS = {
    'kkh': 'ഖ', 'k': 'ക', 'kh': 'ഖ', 'g': 'ഗ', 'gh': 'ഘ', 'ng': 'ങ',
    'ch': 'ച', 'chh': 'ഛ', 'j': 'ജ', 'jh': 'ഝ', 'nj': 'ഞ',
    'th': 'ത', 't': 'ട', 'thh': 'ഥ', 'd': 'ഡ', 'dh': 'ദ', 'n': 'ന',
    'p': 'പ', 'ph': 'ഫ', 'f': 'ഫ', 'b': 'ബ', 'bh': 'ഭ', 'm': 'മ',
    'y': 'യ', 'r': 'ര', 'l': 'ല', 'v': 'വ', 'w': 'വ',
    'sh': 'ശ', 's': 'സ', 'h': 'ഹ', 'zh': 'ഴ', 'll': 'ള', 'rr': 'റ'
  };

  /**
   * Transliterate simple Manglish string into approximate Malayalam letters
   */
  function transliterate(text) {
    if (!text || typeof text !== 'string') return '';
    var lower = text.toLowerCase().trim();
    var out = '';
    var i = 0;
    while (i < lower.length) {
      // Check 3-letter consonant combos
      var c3 = lower.substr(i, 3);
      if (CONSONANTS[c3]) {
        out += CONSONANTS[c3];
        i += 3;
        continue;
      }
      // Check 2-letter combos
      var c2 = lower.substr(i, 2);
      if (CONSONANTS[c2]) {
        out += CONSONANTS[c2];
        i += 2;
        continue;
      }
      // Check 1-letter combos
      var c1 = lower.substr(i, 1);
      if (CONSONANTS[c1]) {
        out += CONSONANTS[c1];
        i += 1;
        continue;
      }
      i++;
    }
    return out;
  }

  /**
   * Get all expanded search tokens (original + Malayalam synonyms + phonetic transliteration)
   * @param {string} query
   * @returns {string[]}
   */
  function getSearchVariants(query) {
    if (!query || typeof query !== 'string') return [];
    var q = query.toLowerCase().trim();
    var variants = [q];

    // Check direct dictionary matches
    if (DICTIONARY[q]) {
      DICTIONARY[q].forEach(function (v) {
        variants.push(v.toLowerCase());
      });
    }

    // Check if query contains known dictionary keys as words
    var words = q.split(/\s+/);
    words.forEach(function (w) {
      if (DICTIONARY[w]) {
        DICTIONARY[w].forEach(function (v) {
          variants.push(v.toLowerCase());
        });
      }
    });

    // Add phonetic transliteration variant
    var trans = transliterate(q);
    if (trans && trans.length >= 2) {
      variants.push(trans);
    }

    // For all Malayalam variants, also generate root stems (e.g. 'രക്തം' -> 'രക്ത')
    var stems = [];
    variants.forEach(function (v) {
      if (v.length >= 3 && v.endsWith('ം')) {
        stems.push(v.slice(0, -1));
      } else if (v.length >= 3 && v.endsWith('്')) {
        stems.push(v.slice(0, -1));
      }
    });
    stems.forEach(function (s) { variants.push(s); });

    // Remove duplicates
    return Array.from(new Set(variants));
  }

  /**
   * Check if targetText matches query across English, Malayalam, or Manglish
   * @param {string} targetText
   * @param {string} query
   * @returns {boolean}
   */
  function matches(targetText, query) {
    if (!query || !query.trim()) return true;
    if (!targetText) return false;

    var targetLower = String(targetText).toLowerCase();
    var variants = getSearchVariants(query);

    for (var i = 0; i < variants.length; i++) {
      if (targetLower.indexOf(variants[i]) !== -1) {
        return true;
      }
    }
    return false;
  }

  // Export Manglish global API
  window.Manglish = {
    matches: matches,
    getSearchVariants: getSearchVariants,
    transliterate: transliterate,
    DICTIONARY: DICTIONARY
  };

})(window);
