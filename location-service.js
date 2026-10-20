/**
 * LocationService for THUNA — Nammude Naad
 * Reusable location service across all modules.
 * Handles GPS geolocation, explicit user permission, non-blocking state,
 * manual Kerala town presets with coordinates, Haversine distance calculations,
 * and privacy-preserving coordinate obfuscation.
 */

// Presets for Kerala towns with real coordinates for manual selection fallback
export const KERALA_LOCATION_PRESETS = [
    { name: 'കണ്ണൂർ (Kannur)', district: 'Kannur', lat: 11.8745, lon: 75.3704 },
    { name: 'തലശ്ശേരി (Thalassery), കണ്ണൂർ', district: 'Kannur', lat: 11.7480, lon: 75.4894 },
    { name: 'പയ്യന്നൂർ (Payyanur), കണ്ണൂർ', district: 'Kannur', lat: 12.1009, lon: 75.2038 },
    { name: 'തളിപ്പറമ്പ് (Taliparamba), കണ്ണൂർ', district: 'Kannur', lat: 12.0437, lon: 75.3585 },
    { name: 'കാസർഗോഡ് (Kasaragod)', district: 'Kasaragod', lat: 12.5102, lon: 74.9852 },
    { name: 'കാഞ്ഞങ്ങാട് (Kanhangad), കാസർഗോഡ്', district: 'Kasaragod', lat: 12.3082, lon: 75.0937 },
    { name: 'കോഴിക്കോട് (Kozhikode)', district: 'Kozhikode', lat: 11.2588, lon: 75.7804 },
    { name: 'വടകര (Vadakara), കോഴിക്കോട്', district: 'Kozhikode', lat: 11.6033, lon: 75.5908 },
    { name: 'കൊയിലാണ്ടി (Koyilandy), കോഴിക്കോട്', district: 'Kozhikode', lat: 11.4428, lon: 75.6961 },
    { name: 'വയനാട് (Wayanad - Kalpetta)', district: 'Wayanad', lat: 11.6103, lon: 76.0827 },
    { name: 'സുൽത്താൻ ബത്തേരി (Sulthan Bathery), വയനാട്', district: 'Wayanad', lat: 11.6644, lon: 76.2571 },
    { name: 'മാനന്തവാടി (Mananthavady), വയനാട്', district: 'Wayanad', lat: 11.8026, lon: 76.0033 },
    { name: 'മലപ്പുറം (Malappuram)', district: 'Malappuram', lat: 11.0732, lon: 76.0740 },
    { name: 'മഞ്ചേരി (Manjeri), മലപ്പുറം', district: 'Malappuram', lat: 11.1189, lon: 76.1227 },
    { name: 'പെരിന്തൽമണ്ണ (Perinthalmanna), മലപ്പുറം', district: 'Malappuram', lat: 10.9760, lon: 76.2254 },
    { name: 'തിരൂർ (Tirur), മലപ്പുറം', district: 'Malappuram', lat: 10.9146, lon: 75.9228 },
    { name: 'പൊന്നാനി (Ponnani), മലപ്പുറം', district: 'Malappuram', lat: 10.7744, lon: 75.9252 },
    { name: 'പാലക്കാട് (Palakkad)', district: 'Palakkad', lat: 10.7867, lon: 76.6548 },
    { name: 'ഒറ്റപ്പാലം (Ottapalam), പാലക്കാട്', district: 'Palakkad', lat: 10.7719, lon: 76.3762 },
    { name: 'ഷൊർണ്ണൂർ (Shornur), പാലക്കാട്', district: 'Palakkad', lat: 10.7618, lon: 76.2736 },
    { name: 'തൃശ്ശൂർ (Thrissur)', district: 'Thrissur', lat: 10.5276, lon: 76.2144 },
    { name: 'ചാലക്കുടി (Chalakudy), തൃശ്ശൂർ', district: 'Thrissur', lat: 10.3070, lon: 76.3338 },
    { name: 'ഗുരുവായൂർ (Guruvayur), തൃശ്ശൂർ', district: 'Thrissur', lat: 10.5947, lon: 76.0409 },
    { name: 'കൊടുങ്ങല്ലൂർ (Kodungallur), തൃശ്ശൂർ', district: 'Thrissur', lat: 10.2227, lon: 76.1951 },
    { name: 'കൊച്ചി (Kochi), എറണാകുളം', district: 'Ernakulam', lat: 9.9816, lon: 76.2999 },
    { name: 'ആലുവ (Aluva), എറണാകുളം', district: 'Ernakulam', lat: 10.1076, lon: 76.3516 },
    { name: 'തൃപ്പൂണിത്തുറ (Tripunithura), എറണാകുളം', district: 'Ernakulam', lat: 9.9507, lon: 76.3526 },
    { name: 'മൂവാറ്റുപുഴ (Muvattupuzha), എറണാകുളം', district: 'Ernakulam', lat: 9.9754, lon: 76.5770 },
    { name: 'അങ്കമാലി (Angamaly), എറണാകുളം', district: 'Ernakulam', lat: 10.1960, lon: 76.3860 },
    { name: 'ഇടുക്കി (Idukki - Thodupuzha)', district: 'Idukki', lat: 9.8959, lon: 76.7184 },
    { name: 'മൂന്നാർ (Munnar), ഇടുക്കി', district: 'Idukki', lat: 10.0889, lon: 77.0595 },
    { name: 'കോട്ടയം (Kottayam)', district: 'Kottayam', lat: 9.5916, lon: 76.5222 },
    { name: 'ചങ്ങനാശ്ശേരി (Changanassery), കോട്ടയം', district: 'Kottayam', lat: 9.4447, lon: 76.5441 },
    { name: 'പാലാ (Pala), കോട്ടയം', district: 'Kottayam', lat: 9.7107, lon: 76.6841 },
    { name: 'ആലപ്പുഴ (Alappuzha)', district: 'Alappuzha', lat: 9.4981, lon: 76.3388 },
    { name: 'ചേർത്തല (Cherthala), ആലപ്പുഴ', district: 'Alappuzha', lat: 9.6845, lon: 76.3323 },
    { name: 'കായംകുളം (Kayamkulam), ആലപ്പുഴ', district: 'Alappuzha', lat: 9.1761, lon: 76.5008 },
    { name: 'മാവേലിക്കര (Mavelikkara), ആലപ്പുഴ', district: 'Alappuzha', lat: 9.2471, lon: 76.5510 },
    { name: 'അടൂർ (Adoor), പത്തനംതിട്ട', district: 'Pathanamthitta', lat: 9.1530, lon: 76.7356 },
    { name: 'പത്തനംതിട്ട (Pathanamthitta)', district: 'Pathanamthitta', lat: 9.2648, lon: 76.7870 },
    { name: 'പന്തളം (Pandalam), പത്തനംതിട്ട', district: 'Pathanamthitta', lat: 9.2319, lon: 76.6806 },
    { name: 'തിരുവല്ല (Thiruvalla), പത്തനംതിട്ട', district: 'Pathanamthitta', lat: 9.3835, lon: 76.5741 },
    { name: 'റാന്നി (Ranni), പത്തനംതിട്ട', district: 'Pathanamthitta', lat: 9.3813, lon: 76.8143 },
    { name: 'കൊല്ലം (Kollam)', district: 'Kollam', lat: 8.8932, lon: 76.6141 },
    { name: 'കരുനാഗപ്പള്ളി (Karunagappally), കൊല്ലം', district: 'Kollam', lat: 9.0560, lon: 76.5367 },
    { name: 'കൊട്ടാരക്കര (Kottarakkara), കൊല്ലം', district: 'Kollam', lat: 8.9989, lon: 76.7709 },
    { name: 'പുനലൂർ (Punalur), കൊല്ലം', district: 'Kollam', lat: 9.0194, lon: 76.9287 },
    { name: 'തിരുവനന്തപുരം (Thiruvananthapuram)', district: 'Thiruvananthapuram', lat: 8.5241, lon: 76.9366 },
    { name: 'ആറ്റിങ്ങൽ (Attingal), തിരുവനന്തപുരം', district: 'Thiruvananthapuram', lat: 8.6960, lon: 76.8140 },
    { name: 'വർക്കല (Varkala), തിരുവനന്തപുരം', district: 'Thiruvananthapuram', lat: 8.7379, lon: 76.7163 },
    { name: 'നെയ്യാറ്റിൻകര (Neyyattinkara), തിരുവനന്തപുരം', district: 'Thiruvananthapuram', lat: 8.4035, lon: 77.0877 },
    { name: 'നെടുമങ്ങാട് (Nedumangad), തിരുവനന്തപുരം', district: 'Thiruvananthapuram', lat: 8.6046, lon: 76.9996 }
];

class LocationManager {
    constructor() {
        this.status = 'idle'; // 'idle' | 'requesting' | 'acquired' | 'denied' | 'unavailable' | 'timeout'
        this.error = null;
        this.subscribers = new Set();
        
        // Load initial state from storage or default to Kannur
        const storedLoc = localStorage.getItem('thuna_user_location') || 'കണ്ണൂർ, കേരളം';
        let storedCoords = null;
        try {
            storedCoords = JSON.parse(localStorage.getItem('thuna_user_coordinates') || 'null');
        } catch (_) {}

        if (!storedCoords) {
            const defaultPreset = KERALA_LOCATION_PRESETS[0];
            storedCoords = {
                latitude: defaultPreset.lat,
                longitude: defaultPreset.lon,
                accuracy: 500,
                isManual: true,
                timestamp: Date.now()
            };
        }

        this.current = {
            locationName: storedLoc,
            latitude: storedCoords.latitude,
            longitude: storedCoords.longitude,
            accuracy: storedCoords.accuracy || 100,
            isManual: storedCoords.isManual !== false,
            timestamp: storedCoords.timestamp || Date.now()
        };

        // Automatically detect device location on startup (works anywhere in the world)
        if (typeof window !== 'undefined' && typeof navigator !== 'undefined' && navigator.geolocation) {
            setTimeout(() => this.autoDetectLocation(), 200);
        }
    }

    /**
     * Subscribe to location state updates
     * @param {Function} callback 
     * @returns {Function} unsubscribe function
     */
    subscribe(callback) {
        this.subscribers.add(callback);
        // Immediately notify subscriber with current state
        try {
            callback(this.getState());
        } catch (e) {
            console.error('[LocationService] Subscriber callback error:', e);
        }
        return () => this.subscribers.delete(callback);
    }

    _notify() {
        const state = this.getState();
        for (const cb of this.subscribers) {
            try { cb(state); } catch (e) { console.error('[LocationService] Listener error:', e); }
        }
        window.dispatchEvent(new CustomEvent('thuna-location-updated', { detail: state }));
    }

    getState() {
        return {
            status: this.status,
            error: this.error,
            locationName: this.current.locationName,
            latitude: this.current.latitude,
            longitude: this.current.longitude,
            accuracy: this.current.accuracy,
            isManual: this.current.isManual,
            timestamp: this.current.timestamp
        };
    }

    /**
     * Request device GPS with explicit user permission.
     * Operates non-blockingly and asynchronously.
     */
    /**
     * Resolve a clean, human-friendly city/town name worldwide
     * without technical coordinates or accuracy clutter.
     */
    async resolveCleanPlaceName(lat, lon) {
        // 1. Fast client-side reverse geocoding (works globally: Kerala, GCC, India, US, Europe)
        try {
            const ctrl = new AbortController();
            const timer = setTimeout(() => ctrl.abort(), 3500);
            const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`, {
                signal: ctrl.signal
            });
            clearTimeout(timer);
            if (res.ok) {
                const data = await res.json();
                const city = data.city || data.locality || data.principalSubdivision;
                const state = data.principalSubdivision || data.countryName;
                if (city && state && city !== state) {
                    return `${city}, ${state}`;
                }
                if (city) return city;
                if (state) return state;
            }
        } catch (_) {}

        // 2. OpenStreetMap reverse geocode fallback
        try {
            const ctrl = new AbortController();
            const timer = setTimeout(() => ctrl.abort(), 3000);
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=12`, {
                headers: { 'Accept-Language': 'en' },
                signal: ctrl.signal
            });
            clearTimeout(timer);
            if (res.ok) {
                const data = await res.json();
                const a = data.address || {};
                const place = a.city || a.town || a.village || a.suburb || a.county;
                const state = a.state || a.country;
                if (place && state && place !== state) return `${place}, ${state}`;
                if (place) return place;
                if (state) return state;
            }
        } catch (_) {}

        // 3. Fallback to nearest Kerala town preset if within reasonable distance
        const nearest = this.findNearestPreset(lat, lon);
        if (nearest && nearest.distanceKm < 120) {
            return nearest.preset.name;
        }

        return nearest ? nearest.preset.name : 'കേരളം';
    }

    /**
     * Request device GPS with clean automatic place resolution.
     * Operates non-blockingly and asynchronously.
     */
    requestGpsLocation(options = {}) {
        const isLocalhost = typeof window !== 'undefined' && (
            window.location.hostname === 'localhost' || 
            window.location.hostname === '127.0.0.1' || 
            window.location.hostname === '[::1]'
        );
        const isHttps = typeof window !== 'undefined' && window.location.protocol === 'https:';
        const isApp = typeof window !== 'undefined' && (
            window.location.protocol === 'capacitor:' || 
            window.location.protocol === 'file:'
        );
        const isSecure = Boolean((typeof window !== 'undefined' && window.isSecureContext) || isLocalhost || isHttps || isApp);

        if (!isSecure) {
            this.status = 'unavailable';
            this.error = 'സുരക്ഷിതമല്ലാത്ത കണക്ഷൻ (Non-HTTPS / IP). ലൊക്കേഷനായി HTTPS അല്ലെങ്കിൽ localhost ആവശ്യമാണ്.';
            console.warn('[LocationService] Insecure context: Geolocation requires HTTPS or localhost on modern browsers.');
            this._notify();
            return Promise.reject(new Error(this.error));
        }

        if (!navigator.geolocation) {
            this.status = 'unavailable';
            this.error = 'ലൊക്കേഷൻ ലഭ്യമല്ല (Geolocation not supported).';
            this._notify();
            return Promise.reject(new Error(this.error));
        }

        this.status = 'requesting';
        this.error = null;
        this._notify();

        const geoOptions = {
            enableHighAccuracy: true,
            timeout: options.timeout || 10000,
            maximumAge: options.maximumAge || 60000
        };

        return new Promise((resolve, reject) => {
            const onPositionSuccess = async (pos) => {
                const lat = pos.coords.latitude;
                const lon = pos.coords.longitude;
                const accuracy = Math.round(pos.coords.accuracy || 10);

                let cleanName = await this.resolveCleanPlaceName(lat, lon);

                this.status = 'acquired';
                this.error = null;
                this.current = {
                    locationName: cleanName,
                    latitude: lat,
                    longitude: lon,
                    accuracy: accuracy,
                    isManual: false,
                    timestamp: pos.timestamp || Date.now()
                };

                this._saveToStorage();
                this._notify();
                resolve(this.getState());
            };

            const onPositionError = (err, isHighAccuracy = true) => {
                if (isHighAccuracy && err && err.code === 3 && navigator.geolocation) {
                    console.info('[LocationService] High accuracy timed out, retrying with network/wifi location...');
                    navigator.geolocation.getCurrentPosition(
                        onPositionSuccess,
                        (fallbackErr) => onPositionError(fallbackErr, false),
                        { timeout: 7000, enableHighAccuracy: false, maximumAge: 90000 }
                    );
                    return;
                }

                let userMsg = 'ലൊക്കേഷൻ ലഭിച്ചില്ല.';
                if (err.code === 1) { // PERMISSION_DENIED
                    this.status = 'denied';
                    userMsg = 'ലൊക്കേഷൻ അനുമതി നിഷേധിച്ചു (Permission denied).';
                } else if (err.code === 2) { // POSITION_UNAVAILABLE
                    this.status = 'unavailable';
                    userMsg = 'GPS സിഗ്നൽ ലഭ്യമല്ല (Position unavailable).';
                } else if (err.code === 3) { // TIMEOUT
                    this.status = 'timeout';
                    userMsg = 'സമയം കഴിഞ്ഞു (Timeout). വീണ്ടും ശ്രമിക്കുക.';
                } else {
                    this.status = 'unavailable';
                    userMsg = err.message || 'ലൊക്കേഷൻ കണ്ടെത്താനായില്ല.';
                }

                this.error = userMsg;
                this._notify();
                reject(new Error(userMsg));
            };

            navigator.geolocation.getCurrentPosition(
                onPositionSuccess,
                (err) => onPositionError(err, true),
                geoOptions
            );
        });
    }

    /**
     * Automatically detect GPS on app startup
     */
    autoDetectLocation() {
        if (!navigator.geolocation) return;
        this.requestGpsLocation({ timeout: 8000 }).catch(() => {
            // Silently retain cached location if GPS is unavailable on launch
        });
    }

    /**
     * Set manual location from Kerala town presets or custom input
     */
    setManualLocation(placeName, coords = null) {
        let lat = 9.1530;
        let lon = 76.7356;
        let accuracy = 500;

        if (coords && typeof coords.latitude === 'number' && typeof coords.longitude === 'number') {
            lat = coords.latitude;
            lon = coords.longitude;
            accuracy = coords.accuracy || 500;
        } else {
            // Match from presets
            const matched = KERALA_LOCATION_PRESETS.find(p => 
                p.name.toLowerCase().includes(placeName.toLowerCase()) ||
                placeName.toLowerCase().includes(p.name.toLowerCase().split(',')[0])
            );
            if (matched) {
                lat = matched.lat;
                lon = matched.lon;
            }
        }

        this.status = 'acquired';
        this.error = null;
        this.current = {
            locationName: placeName,
            latitude: lat,
            longitude: lon,
            accuracy: accuracy,
            isManual: true,
            timestamp: Date.now()
        };

        this._saveToStorage();
        this._notify();
        return this.getState();
    }

    _saveToStorage() {
        try {
            localStorage.setItem('thuna_user_location', this.current.locationName);
            localStorage.setItem('thuna_user_coordinates', JSON.stringify({
                latitude: this.current.latitude,
                longitude: this.current.longitude,
                accuracy: this.current.accuracy,
                isManual: this.current.isManual,
                timestamp: this.current.timestamp
            }));
        } catch (_) {}
    }

    /**
     * Find nearest town preset to given coordinates
     */
    findNearestPreset(lat, lon) {
        let closest = null;
        let minDistance = Infinity;

        for (const preset of KERALA_LOCATION_PRESETS) {
            const d = this.calculateDistance(lat, lon, preset.lat, preset.lon);
            if (d < minDistance) {
                minDistance = d;
                closest = { preset, distanceKm: d };
            }
        }
        return closest;
    }

    /**
     * Calculate geodesic distance using the Haversine formula
     * @returns distance in kilometers
     */
    calculateDistance(lat1, lon1, lat2, lon2) {
        const pLat1 = typeof lat1 === 'number' ? lat1 : parseFloat(lat1);
        const pLon1 = typeof lon1 === 'number' ? lon1 : parseFloat(lon1);
        const pLat2 = typeof lat2 === 'number' ? lat2 : parseFloat(lat2);
        const pLon2 = typeof lon2 === 'number' ? lon2 : parseFloat(lon2);

        if (!Number.isFinite(pLat1) || !Number.isFinite(pLon1) || !Number.isFinite(pLat2) || !Number.isFinite(pLon2)) {
            return Infinity;
        }

        const R = 6371; // Earth's mean radius in km
        const dLat = (pLat2 - pLat1) * Math.PI / 180;
        const dLon = (pLon2 - pLon1) * Math.PI / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(pLat1 * Math.PI / 180) * Math.cos(pLat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const res = R * c;
        return Number.isFinite(res) ? res : Infinity;
    }

    /**
     * Parse any radius string ('200m', '500m', '5km', 'all') to distance in kilometers
     */
    parseRadiusKm(rad) {
        if (!rad || rad === 'all') return Infinity;
        const str = String(rad).trim().toLowerCase();
        if (str.endsWith('m') && !str.endsWith('km')) {
            const val = parseFloat(str);
            return Number.isFinite(val) ? val / 1000 : Infinity; // e.g. 200m -> 0.2 km
        }
        const val = parseFloat(str);
        return Number.isFinite(val) ? val : Infinity;
    }

    /**
     * Format distance in a human-friendly Malayalam / English format
     */
    formatDistance(km) {
        if (km == null || !Number.isFinite(km) || km === Infinity) return '';
        if (km < 0.05) return '< 50 m';
        if (km < 1) return `${Math.round(km * 1000)} m`;
        if (km < 10) return `${km.toFixed(1)} km`;
        return `${Math.round(km)} km`;
    }

    /**
     * Privacy Obfuscator:
     * Never store or broadcast raw micro-precision GPS coordinates publicly.
     * Rounds coordinates to 2 decimal places (~1.1 km area / neighborhood level)
     * preserving privacy while allowing reliable nearby distance computation.
     */
    obfuscateCoordinates(lat, lon) {
        if (typeof lat !== 'number' || typeof lon !== 'number') return null;
        return {
            latitude: Number(lat.toFixed(2)),
            longitude: Number(lon.toFixed(2)),
            isObfuscated: true
        };
    }

    /**
     * Sort an array of items by proximity to current user location
     * Gracefully falls back to Kerala presets if items in DB have missing coordinates.
     */
    sortByProximity(items, getCoordsFn = (item) => ({ lat: item.latitude || item.lat, lon: item.longitude || item.lon })) {
        if (!Array.isArray(items)) return [];
        const { latitude: userLat, longitude: userLon } = this.current;
        if (userLat == null || userLon == null) return items;

        return [...items].map(item => {
            const rawCoords = getCoordsFn(item) || {};
            let lat = rawCoords.lat != null ? rawCoords.lat : (item.latitude != null ? item.latitude : item.lat);
            let lon = rawCoords.lon != null ? rawCoords.lon : (item.longitude != null ? item.longitude : item.lon);

            if (typeof lat === 'string') lat = parseFloat(lat);
            if (typeof lon === 'string') lon = parseFloat(lon);

            // If coordinates missing in DB, try matching location name to Kerala town presets
            if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
                const place = String(item.location || item.locationName || item.place || item.district || item.town || '').toLowerCase().trim();
                if (place) {
                    const matched = KERALA_LOCATION_PRESETS.find(p => {
                        const pName = p.name.toLowerCase();
                        const pDist = p.district.toLowerCase();
                        return place.includes(pDist) || pName.includes(place) || place.includes(pName.split(' ')[0]);
                    });
                    if (matched) {
                        lat = matched.lat;
                        lon = matched.lon;
                    }
                }
            }

            const dist = (Number.isFinite(lat) && Number.isFinite(lon))
                ? this.calculateDistance(userLat, userLon, lat, lon)
                : 2.5; // Graceful default distance instead of Infinity so items are not discarded

            return {
                ...item,
                _calculatedDistanceKm: dist,
                _distanceFormatted: this.formatDistance(dist)
            };
        }).sort((a, b) => a._calculatedDistanceKm - b._calculatedDistanceKm);
    }
}

export const locationService = new LocationManager();

// Expose globally for both module scripts and classic scripts
if (typeof window !== 'undefined') {
    window.LocationService = locationService;
    window.KERALA_LOCATION_PRESETS = KERALA_LOCATION_PRESETS;
    try {
        window.dispatchEvent(new CustomEvent('thuna-location-service-ready', { detail: locationService }));
        window.dispatchEvent(new CustomEvent('thuna-location-updated', { detail: locationService.getState() }));
    } catch (_) {}
}

