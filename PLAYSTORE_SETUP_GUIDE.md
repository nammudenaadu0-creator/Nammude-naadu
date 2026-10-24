# ഗൂഗിൾ പ്ലേസ്റ്റോർ അപ്‌ലോഡ് ഗൈഡ് (Google Play Store Setup Guide)

നമ്മുടെ നാട് (Nammude Naadu) ആപ്പ് ഗൂഗിൾ പ്ലേസ്റ്റോറിൽ വിജയകരമായി പബ്ലിഷ് ചെയ്യാനുള്ള എല്ലാ ഫയലുകളും വിവരങ്ങളും താഴെ നൽകുന്നു.

---

## 1. പ്ലേസ്റ്റോറിൽ അപ്‌ലോഡ് ചെയ്യേണ്ട ഫയൽ (Main File)
* **ഫയൽ:** `NammudeNaadu-release.aab`
* **ലൊക്കേഷൻ:** പ്രൊജക്റ്റ് റൂട്ട് ഫോൾഡറിൽ ലഭ്യമാണ്.
* **സൈസ്:** ~4.4 MB (ഗൂഗിൾ പ്ലേസ്റ്റോറിനായി ഒപ്പിട്ട ഏറ്റവും പുതിയ Android App Bundle).

---

## 2. റിലീസ് കീസ്റ്റോർ സുരക്ഷ (Release Keystore Security)
ഭാവിയിൽ ആപ്പിന്റെ പുതിയ അപ്‌ഡേറ്റുകൾ നൽകുമ്പോഴും ഇതേ കീസ്റ്റോർ തന്നെയാണ് ആവശ്യമായി വരിക. അതിനാൽ ഈ ഫയലും പാസ്‌വേഡും അതീവ രഹസ്യമായി സൂക്ഷിക്കുക:
* **Keystore ഫയൽ:** `android/app/nammudenaadu-release.jks`
* **Key Alias:** `nammudenaadu`
* **Keystore പാസ്‌വേഡ്:** നിങ്ങളുടെ പ്രൈവറ്റ് പാസ്‌വേഡ് സുരക്ഷിതമായി സൂക്ഷിക്കുക. (പബ്ലിക് ഗിറ്റ്ഹബ്ബ് റിപ്പോസിറ്ററിയിൽ പാസ്‌വേഡുകൾ രേഖപ്പെടുത്തരുത്. സിസ്റ്റം എൻവയോൺമെന്റ് വേരിയബിളുകളായ `KEYSTORE_PASSWORD`, `KEY_PASSWORD` എന്നിവ വഴിയോ ലോക്കൽ `keystore.properties` വഴിയോ ഇത് സുരക്ഷിതമായി നൽകാം).
* **Validity:** 10,000 ദിവസങ്ങൾ (~27 വർഷം)

---

## 3. പ്രൈവസി പോളിസി ലിങ്ക് (Privacy Policy URL)
ഗൂഗിൾ പ്ലേസ്റ്റോറിൽ ആപ്പ് സബ്മിറ്റ് ചെയ്യുമ്പോൾ ചോദിക്കുന്ന **Privacy Policy URL** താഴെ പറയുന്ന രീതിയിൽ നൽകാം:

### ഓപ്ഷൻ A: GitHub Pages വഴി (സൗജന്യം & ഏറ്റവും എളുപ്പമുള്ള വഴി)
1. നിങ്ങളുടെ GitHub Repository-ൽ പോകുക: [github.com/nammudenaadu0-creator/Nammude-naadu](https://github.com/nammudenaadu0-creator/Nammude-naadu)
2. **Settings** ➔ **Pages** ക്ലിക്ക് ചെയ്യുക.
3. **Build and deployment** എന്നതിൽ `main` ബ്രാഞ്ചും `/ (root)` ഫോൾഡറും തിരഞ്ഞെടുത്ത് **Save** ചെയ്യുക.
4. നിങ്ങളുടെ പ്രൈവസി പോളിസി ലിങ്ക് താഴെ കാണുന്നത് പോലെ ലൈവ് ആകും:
   `https://nammudenaadu0-creator.github.io/Nammude-naadu/privacy-policy.html`

---

## 4. Google Play Console-ൽ ചെയ്യേണ്ട ഘട്ടങ്ങൾ (Step-by-Step)

1. **Google Play Console തുറക്കുക:** [play.google.com/console](https://play.google.com/console)
2. **Create App** ക്ലിക്ക് ചെയ്യുക:
   - **App Name:** `നമ്മുടെ നാട്`
   - **Default Language:** Malayalam (ml) അല്ലെങ്കിൽ English (en-IN)
   - **App or Game:** App
   - **Free or Paid:** Free
3. **App Content & Policy പൂരിപ്പിക്കുക:**
   - **Privacy Policy:** മുകളിലുള്ള പ്രൈവസി പോളിസി ലിങ്ക് പേസ്റ്റ് ചെയ്യുക.
   - **App Access:** "All functionality is available without restrictions" നൽകുക.
   - **Target Age:** 18 and over (അല്ലെങ്കിൽ 13+) നൽകുക.
   - **Location Data Declaration:** സേവനങ്ങൾ സമീപത്ത് കണ്ടെത്താൻ മാത്രമേ ലൊക്കേഷൻ ഉപയോഗിക്കുന്നുള്ളൂ എന്ന് നൽകുക.
4. **Store Listing (വിവരങ്ങളും ചിത്രങ്ങളും):**
   - **Short description (80 chars):** നമ്മുടെ നാട്ടിലെ പ്രാദേശിക സേവനങ്ങളും വാർത്തകളും ഒരു കുടക്കീഴിൽ.
   - **Full description:** വിശദമായ വിവരണം (പ്ലംബർ, ഇലക്ട്രീഷ്യൻ, ടാക്സി, ബ്ലഡ് ഡൊണേഷൻ, പ്രാദേശിക വാർത്തകൾ തുടങ്ങിയവ).
   - **App Icon:** 512 × 512 px (PNG)
   - **Feature Graphic:** 1024 × 500 px (ബാനർ)
   - **Screenshots:** കുറഞ്ഞത് 2 മുതൽ 4 സ്ക്രീൻഷോട്ടുകൾ.
5. **Create Release:**
   - **Production** (അല്ലെങ്കിൽ **Closed Testing**) ➔ **Create new release** ക്ലിക്ക് ചെയ്യുക.
   - നമ്മുടെ `NammudeNaadu-release.aab` ഫയൽ ഡ്രാഗ് ചെയ്ത് അപ്‌ലോഡ് ചെയ്യുക.
   - **Save** ➔ **Review release** ➔ **Send for review** നൽകുക.
