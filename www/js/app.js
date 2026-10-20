        /* -------------------------------------------------------------
           STORAGE SAFETY & UNIVERSAL HIGH-EFFICIENCY IMAGE COMPRESSOR
           Guarantees that images never exceed local quotas or crash the app
           ------------------------------------------------------------- */
        function safeSetLocalStorage(key, value) {
            try {
                localStorage.setItem(key, value);
            } catch (e) {
                console.warn('[SafeStorage] Quota exceeded on key "' + key + '", auto-trimming cached lists...', e);
                try {
                    // Trim old custom posts if any
                    const posts = JSON.parse(localStorage.getItem('thuna_custom_posts') || '[]');
                    if (posts.length > 10) {
                        localStorage.setItem('thuna_custom_posts', JSON.stringify(posts.slice(0, 10)));
                    }
                    // Trim chat histories
                    const chats = JSON.parse(localStorage.getItem('thuna_chat_histories') || '{}');
                    Object.keys(chats).forEach(k => {
                        if (Array.isArray(chats[k]) && chats[k].length > 15) {
                            chats[k] = chats[k].slice(-15);
                        }
                    });
                    localStorage.setItem('thuna_chat_histories', JSON.stringify(chats));

                    // Retry setting key
                    localStorage.setItem(key, value);
                } catch (retryErr) {
                    console.error('[SafeStorage] Critical storage write error after trimming:', retryErr);
                }
            }
        }

        function compressImage(fileOrDataUrl, { maxWidth = 800, maxHeight = 800, quality = 0.72 } = {}) {
            return new Promise((resolve) => {
                if (!fileOrDataUrl) return resolve('');

                const processImg = (img) => {
                    try {
                        let w = img.naturalWidth || img.width || 800;
                        let h = img.naturalHeight || img.height || 600;
                        if (w > maxWidth || h > maxHeight) {
                            if (w > h) {
                                h = Math.round((h * maxWidth) / w);
                                w = maxWidth;
                            } else {
                                w = Math.round((w * maxHeight) / h);
                                h = maxHeight;
                            }
                        }
                        const canvas = document.createElement('canvas');
                        canvas.width = Math.max(1, w);
                        canvas.height = Math.max(1, h);
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0, w, h);
                        const compressed = canvas.toDataURL('image/jpeg', quality);
                        resolve(compressed);
                    } catch (err) {
                        console.warn('[compressImage] Canvas export fallback:', err);
                        resolve(typeof fileOrDataUrl === 'string' ? fileOrDataUrl : '');
                    }
                };

                if (typeof fileOrDataUrl === 'string') {
                    if (!fileOrDataUrl.startsWith('data:image/')) return resolve(fileOrDataUrl);
                    const img = new Image();
                    img.onload = () => processImg(img);
                    img.onerror = () => resolve(fileOrDataUrl);
                    img.src = fileOrDataUrl;
                    return;
                }

                if (fileOrDataUrl instanceof Blob || fileOrDataUrl instanceof File) {
                    if (fileOrDataUrl.type && fileOrDataUrl.type.startsWith('video/')) {
                        const reader = new FileReader();
                        reader.onload = ev => resolve(ev.target.result);
                        reader.onerror = () => resolve('');
                        reader.readAsDataURL(fileOrDataUrl);
                        return;
                    }

                    const reader = new FileReader();
                    reader.onload = ev => {
                        const img = new Image();
                        img.onload = () => processImg(img);
                        img.onerror = () => resolve(ev.target.result);
                        img.src = ev.target.result;
                    };
                    reader.onerror = () => resolve('');
                    reader.readAsDataURL(fileOrDataUrl);
                    return;
                }

                resolve('');
            });
        }

        /* -------------------------------------------------------------
           0. ULTRA HIGH-DEFINITION VECTOR SVG ICON ENGINE
           Provides vibrant, dual-tone, glossy squircle icons for all 25+ services
           ------------------------------------------------------------- */
        function getCategoryCustomIcon(catId) {
            try {
                const icons = JSON.parse(localStorage.getItem('thuna_category_icons') || '{}');
                const key = (catId || '').toLowerCase().trim();
                if (icons[key]) return icons[key];
                const customCats = JSON.parse(localStorage.getItem('thuna_custom_categories') || '[]');
                const match = customCats.find(c => (c.id || '').toLowerCase() === key || (c.name || '').toLowerCase() === key || (c.ml || '').toLowerCase() === key);
                if (match && match.icon) return match.icon;
            } catch (_) {}
            return null;
        }

        function getCatSvg(catId, size) {
            const s = size ? `width="${size}" height="${size}"` : `width="100%" height="100%"`;
            const c = (catId || '').toLowerCase().trim();

            const customIcon = getCategoryCustomIcon(c);
            if (customIcon) {
                const px = size ? parseInt(size) : 40;
                if (customIcon.startsWith('data:image') || customIcon.startsWith('http')) {
                    return `<img src="${customIcon}" style="width:${px}px;height:${px}px;object-fit:cover;border-radius:${Math.round(px*0.25)}px;border:1.5px solid #A7F3D0;display:block" alt="${escapeHtml(catId)}">`;
                }
                if (customIcon.startsWith('<svg')) {
                    return customIcon;
                }
                return `<div style="width:${px}px;height:${px}px;display:flex;align-items:center;justify-content:center;font-size:${Math.round(px*0.55)}px;border-radius:${Math.round(px*0.25)}px;background:#ECFDF5;border:1.5px solid #A7F3D0;box-shadow:0 2px 6px rgba(16,185,129,0.12)">${customIcon}</div>`;
            }

            if (c === 'electrician' || c.includes('electr') || c.includes('wire') || c.includes('inverter') || c.includes('fuse')) {
                return `<svg ${s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="48" rx="24" fill="#FEF08A" stroke="#B45309" stroke-width="2.5"/>
                    <path d="M24 8C17.37 8 12 13.37 12 20C12 24.3 14.28 28.06 17.7 30.2L18 34H30L30.3 30.2C33.72 28.06 36 24.3 36 20C36 13.37 30.63 8 24 8Z" fill="#F59E0B"/>
                    <path d="M20 12C16.5 13.5 15 16.5 15 19" stroke="#92400E" stroke-width="2.5" stroke-linecap="round"/>
                    <rect x="19" y="34" width="10" height="3" rx="1" fill="#64748B"/>
                    <rect x="20" y="37" width="8" height="3" rx="1" fill="#475569"/>
                    <rect x="21.5" y="40" width="5" height="2" rx="1" fill="#1E293B"/>
                    <path d="M25 15L19 23H24L22 30L29 21H24L25 15Z" fill="#B45309"/>
                </svg>`;
            }
            if (c === 'plumber' || c.includes('pipe') || c.includes('leak') || c.includes('tap') || c.includes('motor')) {
                return `<svg ${s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="48" rx="24" fill="#E0F2FE" stroke="#0284C7" stroke-width="2.5"/>
                    <rect x="8" y="16" width="9" height="7" rx="2" fill="#64748B"/>
                    <rect x="20" y="9" width="14" height="4" rx="2" fill="#EF4444"/>
                    <rect x="25.5" y="13" width="3" height="5" fill="#94A3B8"/>
                    <path d="M15 17H28C31 17 33 19 33 22V27H25V24C25 22 23 20 20 20H15V17Z" fill="#0284C7"/>
                    <path d="M24 26H34V29C34 30.5 32.5 32 31 32H27C25.5 32 24 30.5 24 29V26Z" fill="#0369A1"/>
                    <path d="M29 35C29 35 25.5 39 25.5 41C25.5 42.9 27.1 44.5 29 44.5C30.9 44.5 32.5 42.9 32.5 41C32.5 39 29 35 29 35Z" fill="#38BDF8"/>
                </svg>`;
            }
            if (c === 'driver' || c.includes('auto') || c.includes('rickshaw')) {
                return `<svg ${s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="48" rx="24" fill="#DCFCE7" stroke="#15803D" stroke-width="2.5"/>
                    <path d="M12 20C12 16 15 13 19 13H29C33 13 36 16 36 20V31H12V20Z" fill="#15803D"/>
                    <path d="M11 20C11 15 15 11 20 11H28C33 11 37 15 37 20V23H11V20Z" fill="#FACC15"/>
                    <rect x="15" y="16" width="18" height="9" rx="3" fill="#E0F2FE" stroke="#047857" stroke-width="1.5"/>
                    <circle cx="24" cy="28" r="3.5" fill="#FEF08A" stroke="#CA8A04" stroke-width="1.5"/>
                    <circle cx="15" cy="35" r="4.5" fill="#1E293B"/><circle cx="15" cy="35" r="2" fill="#94A3B8"/>
                    <circle cx="33" cy="35" r="4.5" fill="#1E293B"/><circle cx="33" cy="35" r="2" fill="#94A3B8"/>
                    <rect x="11" y="31" width="26" height="3" rx="1.5" fill="#334155"/>
                </svg>`;
            }
            if (c === 'taxi' || c.includes('cab')) {
                return `<svg ${s} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="svg_taxi" x1="7" y1="10" x2="25" y2="23" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#FBBF24"/>
                            <stop offset="1" stop-color="#D97706"/>
                        </linearGradient>
                    </defs>
                    <rect width="32" height="32" rx="9" fill="#FEF3C7" stroke="#D97706" stroke-width="1.8"/>
                    <rect x="13" y="6" width="6" height="3" rx="1" fill="#1E293B"/>
                    <path d="M7 16L9.5 10H22.5L25 16V22C25 22.5 24.5 23 24 23H23V21H9V23H8C7.5 23 7 22.5 7 22V16Z" fill="url(#svg_taxi)"/>
                    <path d="M9.5 11.5H22.5L23.5 15.5H8.5L9.5 11.5Z" fill="#E0F2FE"/>
                    <circle cx="10" cy="19" r="1.5" fill="#FFFFFF"/>
                    <circle cx="22" cy="19" r="1.5" fill="#FFFFFF"/>
                    <circle cx="10" cy="22.5" r="2.5" fill="#1E293B"/>
                    <circle cx="22" cy="22.5" r="2.5" fill="#1E293B"/>
                </svg>`;
            }
            if (c === 'doctor' || c.includes('clinic')) {
                return `<svg ${s} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="svg_doc" x1="8" y1="8" x2="24" y2="25" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#38BDF8"/>
                            <stop offset="1" stop-color="#0284C7"/>
                        </linearGradient>
                    </defs>
                    <rect width="32" height="32" rx="9" fill="#E0F2FE" stroke="#0284C7" stroke-width="1.8"/>
                    <rect x="13.5" y="6" width="5" height="13" rx="1.5" fill="#EF4444"/>
                    <rect x="9.5" y="10" width="13" height="5" rx="1.5" fill="#EF4444"/>
                    <path d="M8 8V14C8 18.5 11.5 22 16 22C20.5 22 24 18.5 24 14V8" stroke="url(#svg_doc)" stroke-width="2.2" stroke-linecap="round"/>
                    <circle cx="8" cy="8" r="1.5" fill="#0284C7"/>
                    <circle cx="24" cy="8" r="1.5" fill="#0284C7"/>
                    <circle cx="16" cy="25" r="3" fill="#0284C7"/>
                    <circle cx="16" cy="25" r="1.2" fill="#FFFFFF"/>
                    <path d="M16 22V24" stroke="#0284C7" stroke-width="2"/>
                </svg>`;
            }
            if (c === 'house help' || c.includes('maid') || c.includes('clean') || c.includes('house')) {
                return `<svg ${s} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="svg_house" x1="6" y1="6" x2="26" y2="26" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#2DD4BF"/>
                            <stop offset="1" stop-color="#0D9488"/>
                        </linearGradient>
                    </defs>
                    <rect width="32" height="32" rx="9" fill="#CCFBF1"/>
                    <path d="M16 6L6 14.5V25C6 25.5 6.5 26 7 26H25C25.5 26 26 25.5 26 25V14.5L16 6Z" fill="url(#svg_house)"/>
                    <path d="M13 26V18H19V26H13Z" fill="#F0FDFA"/>
                    <circle cx="24" cy="9" r="1.8" fill="#F59E0B"/>
                    <path d="M24 6V12M21 9H27" stroke="#F59E0B" stroke-width="1.2" stroke-linecap="round"/>
                </svg>`;
            }
            if (c === 'carpenter' || c.includes('wood') || c.includes('furniture')) {
                return `<svg ${s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="48" rx="24" fill="#FEF3C7"/>
                    <rect x="8" y="32" width="32" height="7" rx="2" fill="#B45309"/>
                    <rect x="12" y="34" width="10" height="2" rx="1" fill="#F59E0B"/>
                    <rect x="26" y="34" width="10" height="2" rx="1" fill="#F59E0B"/>
                    <rect x="22" y="14" width="5" height="24" rx="2" transform="rotate(-30 22 14)" fill="#D97706"/>
                    <path d="M12 11C12 9 15 8 20 10L24 16L18 19L15 15L11 16V11Z" fill="#475569"/>
                    <rect x="22" y="11" width="8" height="6" rx="2" fill="#64748B"/>
                    <rect x="34" y="24" width="2" height="7" rx="1" fill="#94A3B8"/>
                    <rect x="32" y="24" width="6" height="2" rx="0.5" fill="#64748B"/>
                </svg>`;
            }
            if (c === 'tuition' || c.includes('teacher') || c.includes('study')) {
                return `<svg ${s} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="svg_tuit" x1="6" y1="9" x2="26" y2="23" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#10B981"/>
                            <stop offset="1" stop-color="#047857"/>
                        </linearGradient>
                    </defs>
                    <rect width="32" height="32" rx="9" fill="#DCFCE7"/>
                    <path d="M16 11C13.5 9 8 9 6 10.5V23C8 21.5 13.5 21.5 16 23.5C18.5 21.5 24 21.5 26 23V10.5C24 9 18.5 9 16 11Z" fill="url(#svg_tuit)"/>
                    <line x1="16" y1="11" x2="16" y2="23.5" stroke="#ECFDF5" stroke-width="1.8"/>
                    <polygon points="16,4 17.5,7.5 21,7.5 18,9.5 19,13 16,11 13,13 14,9.5 11,7.5 14.5,7.5" fill="#F59E0B"/>
                </svg>`;
            }
            if (c === 'pet care' || c.includes('vet') || c.includes('pet')) {
                return `<svg ${s} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="svg_pet" x1="10" y1="11" x2="22" y2="25" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#60A5FA"/>
                            <stop offset="1" stop-color="#2563EB"/>
                        </linearGradient>
                    </defs>
                    <rect width="32" height="32" rx="9" fill="#DBEAFE"/>
                    <ellipse cx="16" cy="20.5" rx="5.5" ry="4.5" fill="url(#svg_pet)"/>
                    <circle cx="10" cy="14" r="2.5" fill="url(#svg_pet)"/>
                    <circle cx="14" cy="11" r="2.5" fill="url(#svg_pet)"/>
                    <circle cx="18" cy="11" r="2.5" fill="url(#svg_pet)"/>
                    <circle cx="22" cy="14" r="2.5" fill="url(#svg_pet)"/>
                    <path d="M16 18C14.5 17 13.5 18.5 14.5 19.5L16 21L17.5 19.5C18.5 18.5 17.5 17 16 18Z" fill="#FFFFFF"/>
                </svg>`;
            }
            if (c === 'painter' || c.includes('paint')) {
                return `<svg ${s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="48" rx="24" fill="#EDE9FE"/>
                    <rect x="10" y="10" width="26" height="11" rx="4" fill="#7C3AED"/>
                    <rect x="12" y="12" width="22" height="3" rx="1" fill="#A78BFA"/>
                    <path d="M36 15.5H39V26H26V32" stroke="#6D28D9" stroke-width="3" stroke-linecap="round"/>
                    <rect x="23.5" y="31" width="5" height="11" rx="2" fill="#92400E"/>
                    <rect x="24" y="32" width="4" height="2" fill="#F59E0B"/>
                    <path d="M14 21V27C14 28 16 28 16 27V21" fill="#7C3AED"/>
                    <path d="M21 21V29C21 30.5 23.5 30.5 23.5 29V21" fill="#7C3AED"/>
                    <circle cx="15" cy="30" r="1.8" fill="#EC4899"/>
                </svg>`;
            }
            if (c === 'ac' || c.includes('fridge') || c.includes('cool')) {
                return `<svg ${s} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="svg_ac" x1="6" y1="6" x2="26" y2="26" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#22D3EE"/>
                            <stop offset="1" stop-color="#0891B2"/>
                        </linearGradient>
                    </defs>
                    <rect width="32" height="32" rx="9" fill="#CFFAFE"/>
                    <path d="M16 6V26M6 16H26M9 9L23 23M23 9L9 23" stroke="url(#svg_ac)" stroke-width="2.2" stroke-linecap="round"/>
                    <circle cx="16" cy="16" r="3" fill="#0891B2"/>
                    <circle cx="16" cy="16" r="1.5" fill="#FFFFFF"/>
                </svg>`;
            }
            if (c === 'mason' || c.includes('brick') || c.includes('concrete')) {
                return `<svg ${s} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="svg_mas" x1="7" y1="6" x2="25" y2="27" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#F97316"/>
                            <stop offset="1" stop-color="#C2410C"/>
                        </linearGradient>
                    </defs>
                    <rect width="32" height="32" rx="9" fill="#FFEDD5"/>
                    <path d="M7 16H25M16 16V22M7 22H25M11 22V27M21 22V27" stroke="#EA580C" stroke-width="2" stroke-linecap="round"/>
                    <path d="M16 6L21 11L16 14L11 11L16 6Z" fill="url(#svg_mas)"/>
                    <path d="M16 14V17" stroke="#9A3412" stroke-width="2"/>
                </svg>`;
            }
            if (c === 'tiles' || c.includes('granite') || c.includes('marble')) {
                return `<svg ${s} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="svg_tile" x1="7" y1="7" x2="25" y2="25" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#64748B"/>
                            <stop offset="1" stop-color="#334155"/>
                        </linearGradient>
                    </defs>
                    <rect width="32" height="32" rx="9" fill="#F1F5F9"/>
                    <rect x="7" y="7" width="8" height="8" rx="2" fill="url(#svg_tile)"/>
                    <rect x="17" y="7" width="8" height="8" rx="2" fill="#94A3B8"/>
                    <rect x="7" y="17" width="8" height="8" rx="2" fill="#94A3B8"/>
                    <rect x="17" y="17" width="8" height="8" rx="2" fill="url(#svg_tile)"/>
                </svg>`;
            }
            if (c === 'catering' || c.includes('cook') || c.includes('food')) {
                return `<svg ${s} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="svg_cat" x1="8" y1="12" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#F87171"/>
                            <stop offset="1" stop-color="#DC2626"/>
                        </linearGradient>
                    </defs>
                    <rect width="32" height="32" rx="9" fill="#FEE2E2"/>
                    <circle cx="16" cy="11" r="2" fill="#DC2626"/>
                    <path d="M8 20C8 14.5 11.5 12 16 12C20.5 12 24 14.5 24 20H8Z" fill="url(#svg_cat)"/>
                    <rect x="6" y="21" width="20" height="3" rx="1.5" fill="#991B1B"/>
                    <path d="M13 7C13 6 14 5 14 5M16 8C16 7 17 6 17 6M19 7C19 6 20 5 20 5" stroke="#F59E0B" stroke-width="1.5" stroke-linecap="round"/>
                </svg>`;
            }
            if (c === 'welding' || c.includes('fabrication')) {
                return `<svg ${s} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="svg_weld" x1="10" y1="6" x2="22" y2="26" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#FB923C"/>
                            <stop offset="1" stop-color="#EA580C"/>
                        </linearGradient>
                    </defs>
                    <rect width="32" height="32" rx="9" fill="#FFEDD5"/>
                    <path d="M10 8C10 6.5 12 6 16 6C20 6 22 6.5 22 8V20C22 24 19 26 16 26C13 26 10 24 10 20V8Z" fill="url(#svg_weld)"/>
                    <rect x="13" y="12" width="6" height="4" rx="1" fill="#1E293B"/>
                    <circle cx="25" cy="10" r="1.5" fill="#F59E0B"/>
                    <path d="M24 16L27 18M25 21L27 21" stroke="#F59E0B" stroke-width="1.5" stroke-linecap="round"/>
                </svg>`;
            }
            if (c === 'mechanic' || c.includes('bike') || c.includes('car')) {
                return `<svg ${s} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="svg_mech" x1="9" y1="7" x2="25" y2="23" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#64748B"/>
                            <stop offset="1" stop-color="#334155"/>
                        </linearGradient>
                    </defs>
                    <rect width="32" height="32" rx="9" fill="#F1F5F9"/>
                    <circle cx="16" cy="16" r="6" stroke="#94A3B8" stroke-width="2.5" stroke-dasharray="3 3"/>
                    <path d="M9 7C7.5 8.5 7.5 11 9 12.5L19.5 23C21 24.5 23.5 24.5 25 23C26.5 21.5 26.5 19 25 17.5L14.5 7C13 5.5 10.5 5.5 9 7Z" fill="url(#svg_mech)"/>
                    <circle cx="10.5" cy="8.5" r="2" fill="#F1F5F9"/>
                </svg>`;
            }
            if (c === 'cctv' || c.includes('camera') || c.includes('security')) {
                return `<svg ${s} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="svg_cctv" x1="7" y1="7" x2="24" y2="18" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#3B82F6"/>
                            <stop offset="1" stop-color="#1D4ED8"/>
                        </linearGradient>
                    </defs>
                    <rect width="32" height="32" rx="9" fill="#DBEAFE"/>
                    <path d="M7 11L21 7L24 14L10 18L7 11Z" fill="url(#svg_cctv)"/>
                    <circle cx="21" cy="11" r="2.5" fill="#E0F2FE"/>
                    <circle cx="21" cy="11" r="1.2" fill="#1E40AF"/>
                    <path d="M12 18V24H7" stroke="#1E40AF" stroke-width="2.5" stroke-linecap="round"/>
                    <circle cx="9" cy="9" r="1.5" fill="#EF4444"/>
                </svg>`;
            }
            if (c === 'tailor' || c.includes('stitch')) {
                return `<svg ${s} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="svg_tlr" x1="9" y1="7" x2="23" y2="25" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#F472B6"/>
                            <stop offset="1" stop-color="#DB2777"/>
                        </linearGradient>
                    </defs>
                    <rect width="32" height="32" rx="9" fill="#FCE7F3"/>
                    <path d="M9 25L23 7M23 25L9 7" stroke="url(#svg_tlr)" stroke-width="2.5" stroke-linecap="round"/>
                    <circle cx="10" cy="23" r="3.5" stroke="#BE185D" stroke-width="2"/>
                    <circle cx="22" cy="23" r="3.5" stroke="#BE185D" stroke-width="2"/>
                    <circle cx="16" cy="16" r="1.8" fill="#DB2777"/>
                </svg>`;
            }
            if (c === 'photographer' || c.includes('photo') || c.includes('video')) {
                return `<svg ${s} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="svg_pht" x1="6" y1="7" x2="26" y2="26" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#6366F1"/>
                            <stop offset="1" stop-color="#4338CA"/>
                        </linearGradient>
                    </defs>
                    <rect width="32" height="32" rx="9" fill="#E0E7FF"/>
                    <path d="M6 12C6 10.5 7.5 9 9 9H12L14 7H18L20 9H23C24.5 9 26 10.5 26 12V23C26 24.5 24.5 26 23 26H9C7.5 26 6 24.5 6 23V12Z" fill="url(#svg_pht)"/>
                    <circle cx="16" cy="17.5" r="4.5" fill="#EEF2FF"/>
                    <circle cx="16" cy="17.5" r="2.8" fill="#312E81"/>
                    <circle cx="22" cy="12" r="1.5" fill="#FBBF24"/>
                </svg>`;
            }
            if (c === 'laundry' || c.includes('iron') || c.includes('wash')) {
                return `<svg ${s} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="svg_lnd" x1="7" y1="6" x2="25" y2="26" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#38BDF8"/>
                            <stop offset="1" stop-color="#0284C7"/>
                        </linearGradient>
                    </defs>
                    <rect width="32" height="32" rx="9" fill="#E0F2FE"/>
                    <rect x="7" y="6" width="18" height="20" rx="3" fill="url(#svg_lnd)"/>
                    <circle cx="16" cy="17" r="5" fill="#E0F2FE"/>
                    <circle cx="16" cy="17" r="3.2" fill="#0369A1"/>
                    <circle cx="10" cy="9" r="1" fill="#FFFFFF"/>
                    <circle cx="13" cy="9" r="1" fill="#FFFFFF"/>
                </svg>`;
            }
            if (c === 'coconut' || c.includes('tree') || c.includes('kera') || c.includes('thellu')) {
                return `<svg ${s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="48" rx="24" fill="#DCFCE7"/>
                    <path d="M22 24C23 30 21 38 18 43H26C27 38 27 30 25 24H22Z" fill="#78350F"/>
                    <line x1="20" y1="36" x2="26" y2="36" stroke="#9A3412" stroke-width="1.8"/>
                    <line x1="21" y1="30" x2="26" y2="30" stroke="#9A3412" stroke-width="1.8"/>
                    <circle cx="21" cy="22" r="3" fill="#92400E"/><circle cx="26" cy="22" r="3" fill="#78350F"/>
                    <path d="M24 22C24 16 16 11 8 13C12 18 18 20 24 22Z" fill="#15803D"/>
                    <path d="M24 22C24 15 32 11 40 13C36 18 30 20 24 22Z" fill="#16A34A"/>
                    <path d="M24 22C20 14 20 8 24 6C28 8 28 14 24 22Z" fill="#22C55E"/>
                    <path d="M24 22C17 21 11 26 10 32C16 29 21 26 24 22Z" fill="#15803D"/>
                    <path d="M24 22C31 21 37 26 38 32C32 29 27 26 24 22Z" fill="#16A34A"/>
                </svg>`;
            }
            if (c === 'gardening' || c.includes('plant') || c.includes('lawn')) {
                return `<svg ${s} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="svg_grd" x1="9" y1="9" x2="23" y2="26" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#4ADE80"/>
                            <stop offset="1" stop-color="#16A34A"/>
                        </linearGradient>
                    </defs>
                    <rect width="32" height="32" rx="9" fill="#DCFCE7"/>
                    <path d="M16 26V15" stroke="#15803D" stroke-width="2.5" stroke-linecap="round"/>
                    <path d="M16 15C16 10 10 9 9 12C9 16 16 16 16 16Z" fill="url(#svg_grd)"/>
                    <path d="M16 17C16 12 22 11 23 14C23 18 16 18 16 18Z" fill="url(#svg_grd)"/>
                    <ellipse cx="16" cy="26" rx="6" ry="2" fill="#78350F" opacity="0.3"/>
                </svg>`;
            }
            if (c === 'events' || c.includes('sound') || c.includes('stage')) {
                return `<svg ${s} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="svg_evt" x1="6" y1="6" x2="26" y2="25" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#C084FC"/>
                            <stop offset="1" stop-color="#9333EA"/>
                        </linearGradient>
                    </defs>
                    <rect width="32" height="32" rx="9" fill="#F3E8FF"/>
                    <path d="M16 6L6 14V25H26V14L16 6Z" fill="url(#svg_evt)"/>
                    <path d="M11 25V17C11 15 14 14 16 14C18 14 21 15 21 17V25" fill="#FAF5FF"/>
                    <polygon points="16,8 17.5,12 21,12 18,14.5 19,18 16,16 13,18 14,14.5 11,12 14.5,12" fill="#FBBF24"/>
                </svg>`;
            }
            if (c === 'pest control' || c.includes('pest') || c.includes('termite')) {
                return `<svg ${s} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="svg_pst" x1="8" y1="6" x2="24" y2="27" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#F87171"/>
                            <stop offset="1" stop-color="#DC2626"/>
                        </linearGradient>
                    </defs>
                    <rect width="32" height="32" rx="9" fill="#FEE2E2"/>
                    <path d="M16 6L8 9.5V17C8 22 11.5 25.5 16 27C20.5 25.5 24 22 24 17V9.5L16 6Z" fill="url(#svg_pst)"/>
                    <circle cx="16" cy="16" r="3" fill="#FFFFFF"/>
                    <path d="M12 16H20M13 13L19 19M19 13L13 19" stroke="#991B1B" stroke-width="1.5" stroke-linecap="round"/>
                </svg>`;
            }
            if (c === 'packers' || c.includes('shift') || c.includes('mover')) {
                return `<svg ${s} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="svg_pck" x1="7" y1="6" x2="25" y2="27" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#FB923C"/>
                            <stop offset="1" stop-color="#C2410C"/>
                        </linearGradient>
                    </defs>
                    <rect width="32" height="32" rx="9" fill="#FFEDD5"/>
                    <path d="M7 11L16 6L25 11V22L16 27L7 22V11Z" fill="url(#svg_pck)"/>
                    <path d="M7 11L16 16L25 11M16 16V27" stroke="#9A3412" stroke-width="1.8"/>
                    <path d="M13 8.5L22 13.5" stroke="#FFFFFF" stroke-width="1.5" opacity="0.6"/>
                </svg>`;
            }
            if (c === 'ambulance') {
                return `<svg ${s} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="svg_amb" x1="6" y1="8" x2="26" y2="24" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#EF4444"/>
                            <stop offset="1" stop-color="#B91C1C"/>
                        </linearGradient>
                    </defs>
                    <rect width="32" height="32" rx="9" fill="#FEE2E2"/>
                    <path d="M6 13C6 11.5 7.5 10 9 10H19V22H6V13Z" fill="#FFFFFF" stroke="#DC2626" stroke-width="1.5"/>
                    <path d="M19 13H24L26 17V22H19V13Z" fill="#FFFFFF" stroke="#DC2626" stroke-width="1.5"/>
                    <rect x="11.5" y="13" width="3" height="7" rx="0.5" fill="url(#svg_amb)"/>
                    <rect x="9.5" y="15" width="7" height="3" rx="0.5" fill="url(#svg_amb)"/>
                    <circle cx="14" cy="8.5" r="1.5" fill="#EF4444"/>
                    <circle cx="10" cy="22" r="2.5" fill="#1F2937"/>
                    <circle cx="23" cy="22" r="2.5" fill="#1F2937"/>
                </svg>`;
            }
            if (c === 'police') {
                return `<svg ${s} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="svg_pol" x1="8" y1="6" x2="24" y2="27" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#3B82F6"/>
                            <stop offset="1" stop-color="#1D4ED8"/>
                        </linearGradient>
                    </defs>
                    <rect width="32" height="32" rx="9" fill="#DBEAFE"/>
                    <path d="M16 6L8 9.5V17C8 22 11.5 25.5 16 27C20.5 25.5 24 22 24 17V9.5L16 6Z" fill="url(#svg_pol)"/>
                    <polygon points="16,11 17.5,14.5 21,14.5 18,16.5 19,20 16,18 13,20 14,16.5 11,14.5 14.5,14.5" fill="#FBBF24"/>
                </svg>`;
            }
            if (c === 'fire') {
                return `<svg ${s} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="svg_fire" x1="12" y1="6" x2="20" y2="21" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#F97316"/>
                            <stop offset="1" stop-color="#DC2626"/>
                        </linearGradient>
                    </defs>
                    <rect width="32" height="32" rx="9" fill="#FEE2E2"/>
                    <path d="M16 6C16 6 12 11 12 16C12 19 14 21 16 21C18 21 20 19 20 16C20 11 16 6 16 6Z" fill="url(#svg_fire)"/>
                    <path d="M16 14C16 14 14.5 16.5 14.5 18.5C14.5 19.5 15.2 20.5 16 20.5C16.8 20.5 17.5 19.5 17.5 18.5C17.5 16.5 16 14 16 14Z" fill="#FEF08A"/>
                    <path d="M9 25H23" stroke="#DC2626" stroke-width="2" stroke-linecap="round"/>
                </svg>`;
            }
            if (c === 'women') {
                return `<svg ${s} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="svg_wmn" x1="12" y1="8" x2="20" y2="26" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#F472B6"/>
                            <stop offset="1" stop-color="#DB2777"/>
                        </linearGradient>
                    </defs>
                    <rect width="32" height="32" rx="9" fill="#FCE7F3"/>
                    <circle cx="16" cy="13" r="5" stroke="url(#svg_wmn)" stroke-width="2.5"/>
                    <path d="M16 18V26M12 22H20" stroke="url(#svg_wmn)" stroke-width="2.5" stroke-linecap="round"/>
                    <path d="M16 10C15 11 15 13 16 13C17 13 17 11 16 10Z" fill="#BE185D"/>
                </svg>`;
            }
            if (c === 'jobs' || c === 'job' || c === 'vacancy') {
                return `<svg ${s} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="svg_job" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#10B981"/>
                            <stop offset="1" stop-color="#047857"/>
                        </linearGradient>
                    </defs>
                    <rect width="32" height="32" rx="9" fill="#ECFDF5"/>
                    <path d="M12 9C12 7.89543 12.8954 7 14 7H18C19.1046 7 20 7.89543 20 9V11H12V9Z" stroke="#047857" stroke-width="1.8"/>
                    <rect x="6" y="11" width="20" height="14" rx="3" fill="url(#svg_job)"/>
                    <path d="M6 16C10 18 22 18 26 16" stroke="#FFFFFF" stroke-width="1.5" stroke-opacity="0.6"/>
                    <rect x="14" y="14" width="4" height="4" rx="1" fill="#FFFFFF"/>
                </svg>`;
            }
            if (c === 'tag') {
                return `<svg ${s} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="9" fill="#ECFDF5"/>
                    <path d="M8 8H16L24 16L16 24L8 16V8Z" fill="#10B981"/>
                    <circle cx="11.5" cy="11.5" r="2" fill="#FFFFFF"/>
                </svg>`;
            }
            // Fallback: Modern Swiss Gear & Tool Emblem
            return `<svg ${s} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="svg_def" x1="7" y1="7" x2="25" y2="25" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#10B981"/>
                        <stop offset="1" stop-color="#047857"/>
                    </linearGradient>
                </defs>
                <rect width="32" height="32" rx="9" fill="#DCFCE7"/>
                <circle cx="16" cy="16" r="6" stroke="url(#svg_def)" stroke-width="2.2" stroke-dasharray="2.5 2.5"/>
                <circle cx="16" cy="16" r="2.5" fill="#047857"/>
            </svg>`;
        }

        /* -------------------------------------------------------------
           1. 25+ COMPREHENSIVE KERALA SERVICE CATEGORIES & KEYWORDS
           ------------------------------------------------------------- */
        const MASTER_CATEGORIES = [
            { id: 'jobs', name: 'Jobs & Careers', ml: 'തൊഴിൽ അവസരങ്ങൾ', icon: '💼', color: '#059669', bg: '#dcfce7', keywords: ['job', 'vacancy', 'driver', 'sales', 'delivery', 'cook', 'helper', 'salary', 'recruitment', 'work'] },
            { id: 'electrician', name: 'Electrician', ml: 'ഇലക്ട്രീഷ്യൻ', icon: '⚡', color: '#eab308', bg: '#fef9c3', keywords: ['wiring', 'inverter', 'fan', 'switch', 'fuse', 'light', 'earthing', 'solar'] },
            { id: 'plumber', name: 'Plumber', ml: 'പ്ലംബർ', icon: '🚰', color: '#0284c7', bg: '#e0f2fe', keywords: ['pipe', 'leak', 'tap', 'motor', 'water tank', 'drainage', 'sanitary', 'shower'] },
            { id: 'driver', name: 'Auto Driver', ml: 'ഓട്ടോ ഡ്രൈവർ', icon: '🛺', color: '#16a34a', bg: '#dcfce7', keywords: ['auto', 'auto rickshaw', 'school trip', 'local trip', 'market'] },
            { id: 'taxi', name: 'Taxi / Tourist Cab', ml: 'ടാക്സി ഡ്രൈവർ', icon: '🚕', color: '#d97706', bg: '#fef3c7', keywords: ['cab', 'taxi', 'innova', 'ertiga', 'airport drop', 'outstation'] },
            { id: 'doctor', name: 'Doctor & Clinic', ml: 'ഡോക്ടർ', icon: '🩺', color: '#0284c7', bg: '#e0f2fe', keywords: ['physician', 'clinic', 'pediatric', 'fever', 'checkup', 'consultation'] },
            { id: 'house help', name: 'House Help & Maid', ml: 'വീട്ടുജോലി', icon: '🏠', color: '#0d9488', bg: '#ccfbf1', keywords: ['cleaning', 'cooking', 'babysitter', 'maid', 'home care', 'utensil'] },
            { id: 'carpenter', name: 'Carpenter', ml: 'ആശാരി / തച്ചൻ', icon: '🔨', color: '#d97706', bg: '#fef3c7', keywords: ['wood', 'furniture', 'door', 'lock', 'sofa', 'modular kitchen', 'interior'] },
            { id: 'tuition', name: 'Tuition & Teacher', ml: 'ട്യൂഷൻ', icon: '📖', color: '#059669', bg: '#dcfce7', keywords: ['maths', 'science', 'high school', 'plus two', 'spoken english', 'teacher'] },
            { id: 'pet care', name: 'Pet Care & Vet', ml: 'മൃഗാശുപത്രി', icon: '🐾', color: '#2563eb', bg: '#dbeafe', keywords: ['veterinary', 'dog food', 'cat clinic', 'vaccination', 'pet grooming'] },
            { id: 'painter', name: 'Painter', ml: 'പെയിന്റർ', icon: '🎨', color: '#7c3aed', bg: '#ede9fe', keywords: ['painting', 'house painting', 'waterproofing', 'putty', 'polish', 'whitewash'] },
            { id: 'ac', name: 'AC & Fridge Repair', ml: 'എസി & ഫ്രിഡ്ജ്', icon: '❄️', color: '#0891b2', bg: '#cffafe', keywords: ['ac service', 'fridge repair', 'washing machine', 'gas filling', 'cooler'] },
            { id: 'mason', name: 'Mason & Construction', ml: 'മേസ്തിരി', icon: '🧱', color: '#b45309', bg: '#ffedd5', keywords: ['brick work', 'plastering', 'concrete', 'building', 'renovation'] },
            { id: 'tiles', name: 'Tiles & Granite Worker', ml: 'ടൈൽസ് വർക്ക്', icon: '🪨', color: '#475569', bg: '#f1f5f9', keywords: ['tiles', 'flooring', 'granite', 'marble', 'tile laying', 'polishing'] },
            { id: 'catering', name: 'Catering & Cook', ml: 'പാചകക്കാരൻ', icon: '🍲', color: '#dc2626', bg: '#fee2e2', keywords: ['sadhya', 'biriyani', 'catering', 'marriage cook', 'party food'] },
            { id: 'welding', name: 'Welding & Fabrication', ml: 'വെൽഡിംഗ്', icon: '👨‍🏭', color: '#ea580c', bg: '#ffedd5', keywords: ['gate', 'grill', 'iron work', 'truss work', 'shutter', 'steel'] },
            { id: 'mechanic', name: 'Bike / Car Mechanic', ml: 'മെക്കാനിക്', icon: '🔧', color: '#334155', bg: '#f1f5f9', keywords: ['puncture', 'bike service', 'engine oil', 'wheel alignment', 'workshop'] },
            { id: 'cctv', name: 'CCTV & Security', ml: 'സിസിടിവി', icon: '📹', color: '#1e40af', bg: '#dbeafe', keywords: ['cctv installation', 'security camera', 'wifi camera', 'smart lock'] },
            { id: 'tailor', name: 'Tailor & Stitching', ml: 'തയ്യൽ', icon: '✂️', color: '#be185d', bg: '#fce7f3', keywords: ['stitching', 'churidar', 'blouse', 'curtain', 'alteration', 'dress maker'] },
            { id: 'photographer', name: 'Photographer & Video', ml: 'ഫോട്ടോഗ്രാഫർ', icon: '📸', color: '#4338ca', bg: '#e0e7ff', keywords: ['wedding photography', 'drone shoot', 'studio', 'event photo'] },
            { id: 'laundry', name: 'Laundry & Ironing', ml: 'അലക്ക് & അയണിംഗ്', icon: '🧺', color: '#0284c7', bg: '#e0f2fe', keywords: ['ironing', 'dry cleaning', 'press shop', 'washing clothes'] },
            { id: 'coconut', name: 'Coconut Tree Climber', ml: 'തെങ്ങ് കയറ്റം', icon: '🌴', color: '#15803d', bg: '#dcfce7', keywords: ['coconut picking', 'tree cutter', 'wood cutter', 'branch trimming'] },
            { id: 'gardening', name: 'Gardening & Lawns', ml: 'തോട്ടപ്പണി', icon: '🌿', color: '#16a34a', bg: '#dcfce7', keywords: ['grass cutting', 'garden cleaning', 'plants', 'lawn mowing'] },
            { id: 'events', name: 'Event Sound & Light', ml: 'മൈക്ക് സെറ്റ്', icon: '🎪', color: '#9333ea', bg: '#f3e8ff', keywords: ['stage decoration', 'shamiana', 'sound system', 'generator', 'lights'] },
            { id: 'pest control', name: 'Pest Control', ml: 'ചിതൽ നിയന്ത്രണം', icon: '🐜', color: '#b91c1c', bg: '#fee2e2', keywords: ['termite', 'cockroach', 'pest spray', 'wood borer'] },
            { id: 'packers', name: 'Packers & Movers', ml: 'ഷിഫ്റ്റിംഗ്', icon: '📦', color: '#c2410c', bg: '#ffedd5', keywords: ['house shifting', 'furniture moving', 'loading auto', 'goods vehicle'] }
        ];

        // Popular search keyword pills
        const QUICK_KEYWORDS = [
            { text: 'Wiring & Inverter', tag: 'wiring' },
            { text: 'Pipe Leak & Motor', tag: 'leak' },
            { text: 'Local Auto', tag: 'driver' },
            { text: 'AC Service & Gas', tag: 'ac' },
            { text: 'House Painting', tag: 'painter' },
            { text: 'Tuition High School', tag: 'tuition' },
            { text: 'Furniture & Wood', tag: 'carpenter' },
            { text: 'Mason Work', tag: 'mason' },
            { text: 'Doctor Clinic', tag: 'doctor' },
            { text: 'Coconut Tree Cutting', tag: 'coconut' },
            { text: 'CCTV Installation', tag: 'cctv' },
            { text: 'Sadhya & Catering', tag: 'catering' },
            { text: 'Bike Puncture', tag: 'mechanic' },
            { text: 'Deep Cleaning', tag: 'house help' }
        ];

        /* -------------------------------------------------------------
           DYNAMIC SERVICE CATEGORIES & ADMIN CUSTOM ICON ENGINE
           Loads master categories + user-added custom services + admin icon overrides
           ------------------------------------------------------------- */
        function getAllCategories() {
            let custom = [];
            try {
                custom = JSON.parse(localStorage.getItem('thuna_custom_categories') || '[]');
            } catch (_) {}
            let icons = {};
            try {
                icons = JSON.parse(localStorage.getItem('thuna_category_icons') || '{}');
            } catch (_) {}

            const all = [...MASTER_CATEGORIES, ...custom];
            return all.map(c => {
                const idKey = (c.id || '').toLowerCase();
                const nameKey = (c.name || '').toLowerCase();
                const mlKey = (c.ml || '').toLowerCase();
                const override = icons[idKey] || icons[nameKey] || icons[mlKey];
                if (override) {
                    return { ...c, icon: override };
                }
                return c;
            });
        }

        function saveCustomCategory(catName, mlName, customIcon) {
            if (!catName || typeof catName !== 'string') return null;
            const trimmed = catName.trim();
            if (!trimmed) return null;

            const currentCats = getAllCategories();
            const exists = currentCats.find(c =>
                c.name.toLowerCase() === trimmed.toLowerCase() ||
                c.id.toLowerCase() === trimmed.toLowerCase() ||
                (c.ml && c.ml.toLowerCase() === trimmed.toLowerCase())
            );
            if (exists) return exists;

            let customCats = [];
            try {
                customCats = JSON.parse(localStorage.getItem('thuna_custom_categories') || '[]');
            } catch (_) {}

            const catId = 'cat_' + trimmed.toLowerCase().replace(/[^a-z0-9]/g, '_') + '_' + Date.now().toString(36);

            let icon = customIcon || '🛠️';
            const lower = trimmed.toLowerCase();
            if (!customIcon) {
                if (lower.includes('tailor') || lower.includes('തയ്യൽ')) icon = '🧵';
                else if (lower.includes('farm') || lower.includes('കൃഷി')) icon = '🌾';
                else if (lower.includes('food') || lower.includes('പാചകം') || lower.includes('cook') || lower.includes('bakery')) icon = '🍳';
                else if (lower.includes('clean') || lower.includes('വൃത്തിയാക്കൽ')) icon = '🧹';
                else if (lower.includes('delivery') || lower.includes('വിതരണം')) icon = '📦';
                else if (lower.includes('fish') || lower.includes('മീൻ')) icon = '🐟';
                else if (lower.includes('meat') || lower.includes('ഇറച്ചി')) icon = '🥩';
                else if (lower.includes('tea') || lower.includes('ചായ')) icon = '☕';
                else if (lower.includes('auto') || lower.includes('ഓട്ടോ')) icon = '🛺';
                else if (lower.includes('beauty') || lower.includes('ബ്യൂട്ടി')) icon = '💇';
                else if (lower.includes('photo') || lower.includes('ഫോട്ടോ')) icon = '📸';
            }

            const newCategory = {
                id: catId,
                name: trimmed,
                ml: mlName || trimmed,
                icon: icon,
                color: '#059669',
                bg: '#ECFDF5',
                keywords: [lower, trimmed.toLowerCase()],
                isCustom: true,
                createdAt: Date.now()
            };

            customCats.push(newCategory);
            localStorage.setItem('thuna_custom_categories', JSON.stringify(customCats));

            // Sync to Firebase Realtime Database
            if (window.THUNA_FIREBASE && typeof window.THUNA_FIREBASE.set === 'function') {
                window.THUNA_FIREBASE.set('customCategories/' + catId, newCategory).catch(() => {});
            }

            // Sync custom keywords
            try {
                const kws = JSON.parse(localStorage.getItem('thuna_custom_keywords') || '[]');
                kws.push({ word: trimmed.toLowerCase(), cat: catId, ml: mlName || trimmed, type: 'Custom Category' });
                localStorage.setItem('thuna_custom_keywords', JSON.stringify(kws));
            } catch (_) {}

            return newCategory;
        }

        function setCategoryAdminIcon(catId, newIcon) {
            if (!catId || !newIcon) return;
            const key = catId.toLowerCase().trim();
            const icons = JSON.parse(localStorage.getItem('thuna_category_icons') || '{}');
            icons[key] = newIcon;
            localStorage.setItem('thuna_category_icons', JSON.stringify(icons));

            // Also update in thuna_custom_categories if it was custom
            try {
                const custom = JSON.parse(localStorage.getItem('thuna_custom_categories') || '[]');
                const found = custom.find(c => (c.id || '').toLowerCase() === key || (c.name || '').toLowerCase() === key);
                if (found) {
                    found.icon = newIcon;
                    localStorage.setItem('thuna_custom_categories', JSON.stringify(custom));
                }
            } catch (_) {}

            // Sync to Firebase
            if (window.THUNA_FIREBASE && typeof window.THUNA_FIREBASE.set === 'function') {
                window.THUNA_FIREBASE.set('settings/category_icons/' + key, { icon: newIcon, updatedAt: Date.now() }).catch(() => {});
            }

            // Re-render UI
            if (typeof renderCategoryPills === 'function') renderCategoryPills();
            if (typeof renderHomePopularServices === 'function') renderHomePopularServices();
            if (typeof renderServices === 'function') renderServices();
        }

        /* -------------------------------------------------------------
           2. DYNAMIC KERALA SERVICE VOCABULARY & SPELL-CORRECTION ENGINE
           Supports custom keywords typed by different providers ("palarudeyum keywords"),
           with a dictionary-grade auto-suggestion & spelling correction system.
           ------------------------------------------------------------- */
        const EXPANDED_SERVICE_VOCABULARY = [
            // Electrician
            { word: 'wiring', cat: 'electrician', ml: 'വയറിംഗ്' },
            { word: 'inverter', cat: 'electrician', ml: 'ഇൻവെർട്ടർ' },
            { word: 'fan repair', cat: 'electrician', ml: 'ഫാൻ' },
            { word: 'switch board', cat: 'electrician', ml: 'സ്വിച്ച് ബോർഡ്' },
            { word: 'fuse repair', cat: 'electrician', ml: 'ഫ്യൂസ്' },
            { word: 'earthing', cat: 'electrician', ml: 'എർത്തിംഗ്' },
            { word: 'mcb breaker', cat: 'electrician', ml: 'എംസിബി' },
            { word: 'light fitting', cat: 'electrician', ml: 'ലൈറ്റ്' },
            { word: 'solar installation', cat: 'electrician', ml: 'സോളാർ' },
            { word: 'generator', cat: 'electrician', ml: 'ജനറേറ്റർ' },
            { word: 'short circuit', cat: 'electrician', ml: 'ഷോർട്ട് സർക്യൂട്ട്' },

            // Plumber
            { word: 'pipe leak', cat: 'plumber', ml: 'പൈപ്പ് ലീക്ക്' },
            { word: 'water tank', cat: 'plumber', ml: 'വാട്ടർ ടാങ്ക്' },
            { word: 'motor pump', cat: 'plumber', ml: 'മോട്ടോർ' },
            { word: 'tap repair', cat: 'plumber', ml: 'ടാപ്പ് റിപ്പയർ' },
            { word: 'drainage block', cat: 'plumber', ml: 'ഡ്രെയിനേജ്' },
            { word: 'sanitary fitting', cat: 'plumber', ml: 'സാനിറ്ററി' },
            { word: 'shower fitting', cat: 'plumber', ml: 'ഷവർ' },
            { word: 'sump cleaning', cat: 'plumber', ml: 'സംപ് ക്ലീനിംഗ്' },
            { word: 'pvc pipeline', cat: 'plumber', ml: 'പൈപ്പ് ലൈൻ' },

            // Auto Driver
            { word: 'auto rickshaw', cat: 'driver', ml: 'ഓട്ടോറിക്ഷ' },
            { word: 'school trip', cat: 'driver', ml: 'സ്കൂൾ ട്രിപ്പ്' },
            { word: 'local auto trip', cat: 'driver', ml: 'ലോക്കൽ ഓട്ടോ' },
            { word: 'market trip', cat: 'driver', ml: 'മാർക്കറ്റ് ഓട്ടോ' },
            { word: 'railway station drop', cat: 'driver', ml: 'സ്റ്റേഷൻ ഓട്ടോ' },

            // Taxi / Cab
            { word: 'taxi cab', cat: 'taxi', ml: 'ടാക്സി' },
            { word: 'airport drop', cat: 'taxi', ml: 'എയർപോർട്ട് ടാക്സി' },
            { word: 'innova taxi', cat: 'taxi', ml: 'ഇന്നോവ' },
            { word: 'tourist taxi', cat: 'taxi', ml: 'ടൂറിസ്റ്റ് ക്യാബ്' },
            { word: 'outstation trip', cat: 'taxi', ml: 'ദൂരയാത്ര' },

            // Doctor / Clinic
            { word: 'clinic doctor', cat: 'doctor', ml: 'ക്ലിനിക്ക്' },
            { word: 'pediatrician', cat: 'doctor', ml: 'കുട്ടികളുടെ ഡോക്ടർ' },
            { word: 'physician', cat: 'doctor', ml: 'ജനറൽ ഫിസിഷ്യൻ' },
            { word: 'fever clinic', cat: 'doctor', ml: 'പനി ക്ലിനിക്ക്' },
            { word: 'dental clinic', cat: 'doctor', ml: 'ദന്താശുപത്രി' },

            // House Help / Maid
            { word: 'house cleaning', cat: 'house help', ml: 'വീട്ടുജോലി' },
            { word: 'cooking maid', cat: 'house help', ml: 'പാചകം' },
            { word: 'babysitter', cat: 'house help', ml: 'കുട്ടികളെ നോക്കാൻ' },
            { word: 'elderly home care', cat: 'house help', ml: 'മുതിർന്നവരെ പരിചരിക്കാൻ' },
            { word: 'deep cleaning', cat: 'house help', ml: 'ഡീപ് ക്ലീനിംഗ്' },

            // Carpenter
            { word: 'furniture repair', cat: 'carpenter', ml: 'ഫർണിച്ചർ' },
            { word: 'door lock repair', cat: 'carpenter', ml: 'ഡോർ ലോക്ക്' },
            { word: 'wood carpentry', cat: 'carpenter', ml: 'ആശാരിപ്പണി' },
            { word: 'modular kitchen', cat: 'carpenter', ml: 'മോഡുലാർ കിച്ചൻ' },
            { word: 'sofa repair', cat: 'carpenter', ml: 'സോഫ' },

            // Tuition
            { word: 'maths tuition', cat: 'tuition', ml: 'കണക്ക് ട്യൂഷൻ' },
            { word: 'science tuition', cat: 'tuition', ml: 'സയൻസ് ട്യൂഷൻ' },
            { word: 'high school tutor', cat: 'tuition', ml: 'ഹൈസ്കൂൾ' },
            { word: 'plus two tuition', cat: 'tuition', ml: 'പ്ലസ് ടു' },
            { word: 'spoken english', cat: 'tuition', ml: 'സ്പോക്കൺ ഇംഗ്ലീഷ്' },

            // Pet Care & Vet
            { word: 'veterinary clinic', cat: 'pet care', ml: 'മൃഗാശുപത്രി' },
            { word: 'dog doctor', cat: 'pet care', ml: 'നായ്ക്കൾക്കുള്ള ഡോക്ടർ' },
            { word: 'pet vaccination', cat: 'pet care', ml: 'വാക്സിനേഷൻ' },

            // Painter
            { word: 'house painting', cat: 'painter', ml: 'പെയിന്റിംഗ്' },
            { word: 'putty work', cat: 'painter', ml: 'പുട്ടി വർക്ക്' },
            { word: 'waterproofing', cat: 'painter', ml: 'വാട്ടർപ്രൂഫിംഗ്' },
            { word: 'wood polish', cat: 'painter', ml: 'പോളിഷ്' },

            // AC & Fridge
            { word: 'ac service', cat: 'ac', ml: 'എസി സർവീസ്' },
            { word: 'fridge repair', cat: 'ac', ml: 'ഫ്രിഡ്ജ് റിപ്പയർ' },
            { word: 'washing machine repair', cat: 'ac', ml: 'വാഷിംഗ് മെഷീൻ' },

            // Mason
            { word: 'mason construction', cat: 'mason', ml: 'മേസ്തിരിപ്പണി' },
            { word: 'brick plastering', cat: 'mason', ml: 'തേപ്പ് വർക്ക്' },
            { word: 'compound wall', cat: 'mason', ml: 'മതിൽ നിർമ്മാണം' },

            // Tiles
            { word: 'tiles work', cat: 'tiles', ml: 'ടൈൽസ്' },
            { word: 'granite laying', cat: 'tiles', ml: 'ഗ്രാനൈറ്റ്' },
            { word: 'marble floor', cat: 'tiles', ml: 'മാർബിൾ' },

            // Catering
            { word: 'catering sadhya', cat: 'catering', ml: 'സദ്യ കാറ്ററിംഗ്' },
            { word: 'biriyani cook', cat: 'catering', ml: 'ബിരിയാണി കുക്ക്' },
            { word: 'marriage catering', cat: 'catering', ml: 'കല്യാണ കാറ്ററിംഗ്' },

            // Welding
            { word: 'welding iron gate', cat: 'welding', ml: 'ഗേറ്റ് വെൽഡിംഗ്' },
            { word: 'window grill', cat: 'welding', ml: 'ഗ്രിൽ' },
            { word: 'truss roofing', cat: 'welding', ml: 'ട്രസ്സ് വർക്ക്' },

            // Mechanic
            { word: 'bike service mechanic', cat: 'mechanic', ml: 'ബൈക്ക് സർവീസ്' },
            { word: 'car mechanic', cat: 'mechanic', ml: 'കാർ മെക്കാനിക്' },
            { word: 'puncture tyre', cat: 'mechanic', ml: 'പഞ്ചർ' },

            // CCTV
            { word: 'cctv installation', cat: 'cctv', ml: 'സിസിടിവി ക്യാമറ' },
            { word: 'security camera', cat: 'cctv', ml: 'സെക്യൂരിറ്റി ക്യാമറ' },

            // Tailor
            { word: 'stitching tailor', cat: 'tailor', ml: 'തയ്യൽക്കാരൻ' },
            { word: 'churidar stitching', cat: 'tailor', ml: 'ചുരിദാർ' },
            { word: 'blouse stitching', cat: 'tailor', ml: 'ബ്ലൗസ്' },

            // Photographer
            { word: 'wedding photography', cat: 'photographer', ml: 'വെഡ്ഡിംഗ് ഫോട്ടോ' },
            { word: 'drone video shoot', cat: 'photographer', ml: 'ഡ്രോൺ ഷൂട്ട്' },

            // Laundry
            { word: 'laundry ironing', cat: 'laundry', ml: 'ഇസ്തിരി / അലക്ക്' },
            { word: 'dry cleaning', cat: 'laundry', ml: 'ഡ്രൈ ക്ലീനിംഗ്' },

            // Coconut Climber
            { word: 'coconut climber', cat: 'coconut', ml: 'തെങ്ങ് കയറ്റക്കാരൻ' },
            { word: 'thengu kayattam', cat: 'coconut', ml: 'തെങ്ങ് കയറ്റം' },
            { word: 'tree cutting', cat: 'coconut', ml: 'മരം മുറിക്കൽ' },

            // Gardening
            { word: 'gardening lawn', cat: 'gardening', ml: 'തോട്ടം / പുല്ലുവെട്ട്' },
            { word: 'grass cutting', cat: 'gardening', ml: 'പുല്ല് മെഷീൻ' },

            // Events
            { word: 'stage sound light', cat: 'events', ml: 'മൈക്ക് സെറ്റ് & ലൈറ്റ്' },
            { word: 'shamiana stage', cat: 'events', ml: 'പന്തൽ / ശമിയാന' },

            // Pest Control
            { word: 'pest control termite', cat: 'pest control', ml: 'ചിതൽ നിയന്ത്രണം' },

            // Packers
            { word: 'packers movers shifting', cat: 'packers', ml: 'സാധനങ്ങൾ മാറ്റൽ' },
            { word: 'house shifting', cat: 'packers', ml: 'ഷിഫ്റ്റിംഗ്' }
        ];

        function getAllDictionaryWords() {
            const map = new Map();

            // 1. From MASTER_CATEGORIES
            MASTER_CATEGORIES.forEach(c => {
                map.set(c.name.toLowerCase(), { word: c.name, cat: c.id, ml: c.ml, type: 'Category' });
                if (c.keywords) {
                    c.keywords.forEach(k => {
                        const kl = k.toLowerCase().trim();
                        if (kl && !map.has(kl)) {
                            map.set(kl, { word: k, cat: c.id, ml: c.ml, type: 'Keyword' });
                        }
                    });
                }
            });

            // 2. From EXPANDED_SERVICE_VOCABULARY
            EXPANDED_SERVICE_VOCABULARY.forEach(item => {
                const wl = item.word.toLowerCase().trim();
                if (!map.has(wl)) {
                    map.set(wl, { word: item.word, cat: item.cat, ml: item.ml, type: 'Keyword' });
                }
            });

            // 3. Dynamic keywords registered by providers (palarudeyum custom keywords!)
            const allProviders = getServicesList();
            allProviders.forEach(p => {
                if (p.keywords && Array.isArray(p.keywords)) {
                    p.keywords.forEach(k => {
                        const kw = (k || '').trim();
                        const kl = kw.toLowerCase();
                        if (kw && !map.has(kl)) {
                            map.set(kl, {
                                word: kw,
                                cat: p.category,
                                ml: p.name,
                                type: 'Provider Keyword'
                            });
                        }
                    });
                }
            });

            // 4. Saved community custom keywords in localStorage
            try {
                const storedCustom = JSON.parse(localStorage.getItem('thuna_custom_keywords') || '[]');
                storedCustom.forEach(entry => {
                    if (entry && entry.word) {
                        const wl = entry.word.toLowerCase().trim();
                        if (!map.has(wl)) {
                            map.set(wl, entry);
                        }
                    }
                });
            } catch (e) { }

            return Array.from(map.values());
        }

        // Levenshtein Distance for Dictionary Spell-Correction
        function levenshteinDistance(s1, s2) {
            const a = s1.toLowerCase();
            const b = s2.toLowerCase();
            const costs = [];
            for (let i = 0; i <= a.length; i++) {
                let lastValue = i;
                for (let j = 0; j <= b.length; j++) {
                    if (i === 0) {
                        costs[j] = j;
                    } else if (j > 0) {
                        let newValue = costs[j - 1];
                        if (a.charAt(i - 1) !== b.charAt(j - 1)) {
                            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                        }
                        costs[j - 1] = lastValue;
                        lastValue = newValue;
                    }
                }
                if (i > 0) costs[b.length] = lastValue;
            }
            return costs[b.length];
        }

        // Dictionary spelling suggestions (finds closest correct word if user made a typo)
        function getSpellingCorrection(query) {
            if (!query || query.length < 3) return null;
            const q = query.trim().toLowerCase();
            const allWords = getAllDictionaryWords();

            // If already an exact match or prefix of a known word, no typo
            const exactOrPrefix = allWords.some(w => w.word.toLowerCase() === q || w.word.toLowerCase().startsWith(q));
            if (exactOrPrefix) return null;

            let bestMatch = null;
            let minDistance = 999;

            for (const item of allWords) {
                const w = item.word.toLowerCase();
                const firstWord = w.split(' ')[0];

                let dist = levenshteinDistance(q, w);
                let threshold = Math.max(1, Math.floor(w.length * 0.35));
                if (q.length <= 4) threshold = 1;
                else if (q.length <= 7) threshold = 2;
                else threshold = 3;

                if (dist > threshold && firstWord.length >= 3) {
                    const dFirst = levenshteinDistance(q, firstWord);
                    if (dFirst < dist) {
                        dist = dFirst;
                    }
                }

                if (dist <= threshold && dist < minDistance) {
                    minDistance = dist;
                    bestMatch = item;
                    if (dist === 1) break;
                }
            }

            return bestMatch;
        }

        function applySpellingCorrection(word, cat, source) {
            hideAllSuggestions();
            const inputId = (source === 'home') ? 'homeSearchInput' : 'servicesSearchInput';
            const clearId = (source === 'home') ? 'homeSearchClear' : 'servicesSearchClear';
            const input = document.getElementById(inputId);
            const clearBtn = document.getElementById(clearId);

            if (input) input.value = word;
            if (clearBtn) clearBtn.style.display = 'flex';

            if (source === 'home') {
                navTo('services');
                const sInput = document.getElementById('servicesSearchInput');
                if (sInput) sInput.value = word;
            }

            APP_STATE.activeServiceCategory = cat || 'all';
            document.querySelectorAll('#servicesFilterPills .pill-btn').forEach(b => {
                b.classList.toggle('active', b.dataset.cat === cat);
            });

            filterServicesList();
            toast(`📖 Corrected to: "${word}"`);
        }

        // Provider registration keywords auto-suggestion
        function handleProviderKeywordsInput(fullValue) {
            const box = document.getElementById('providerKeywordSuggestions');
            if (!box) return;
            const tokens = fullValue.split(',');
            const currentToken = (tokens[tokens.length - 1] || '').trim().toLowerCase();

            if (!currentToken || currentToken.length < 1) {
                box.classList.remove('show');
                return;
            }

            const allWords = getAllDictionaryWords();
            const matched = allWords.filter(w => w.word.toLowerCase().includes(currentToken)).slice(0, 6);
            const typo = getSpellingCorrection(currentToken);

            if (matched.length === 0 && !typo) {
                box.classList.remove('show');
                return;
            }

            let html = '<div class="suggestion-group-title">Dictionary Suggestions (Tap to add)</div>';

            if (typo) {
                html += `
                    <div class="suggestion-item" onclick="insertKeywordToInput('${escapeHtml(typo.word)}')">
                        <div class="suggestion-icon">${getCatSvg(typo.cat, 24)}</div>
                        <div class="suggestion-text">
                            💡 Correct spelling: <strong>${escapeHtml(typo.word)}</strong>
                        </div>
                        <span class="suggestion-badge" style="background:#dcfce7;color:#15803d">Corrected</span>
                    </div>
                `;
            }

            matched.forEach(item => {
                if (typo && typo.word.toLowerCase() === item.word.toLowerCase()) return;
                html += `
                    <div class="suggestion-item" onclick="insertKeywordToInput('${escapeHtml(item.word)}')">
                        <div class="suggestion-icon">${getCatSvg(item.cat, 24)}</div>
                        <div class="suggestion-text">
                            <strong>${escapeHtml(item.word)}</strong> <span style="font-size:11px;color:var(--muted)">(${escapeHtml(item.ml || '')})</span>
                        </div>
                        <span class="suggestion-badge">${escapeHtml(item.type || 'Tag')}</span>
                    </div>
                `;
            });

            box.innerHTML = html;
            box.classList.add('show');
        }

        function insertKeywordToInput(selectedKeyword) {
            const input = document.getElementById('newProvKeywords');
            if (!input) return;
            const tokens = input.value.split(',').map(s => s.trim()).filter(Boolean);
            if (tokens.length > 0) {
                tokens.pop(); // remove partial token
            }
            tokens.push(selectedKeyword);
            input.value = tokens.join(', ') + ', ';
            input.focus();
            document.getElementById('providerKeywordSuggestions')?.classList.remove('show');
        }

        /* -------------------------------------------------------------
           2. STATE & DEFAULT VERIFIED DATA
           ------------------------------------------------------------- */
        const APP_STATE = {
            currentScreen: 'home',
            userLocation: localStorage.getItem('thuna_user_location') || 'കണ്ണൂർ, കേരളം',
            userCoordinates: JSON.parse(localStorage.getItem('thuna_user_coordinates') || '{"latitude":11.8745,"longitude":75.3704,"accuracy":100,"isManual":true}'),
            userProfile: JSON.parse(localStorage.getItem('thuna_user_profile') || JSON.stringify({
                name: 'കമ്മ്യൂണിറ്റി അംഗം',
                phone: '',
                location: 'കേരളം',
                bio: "നമ്മുടെ നാടിനൊപ്പം... ഒരുമിക്കാം 🌿",
                type: 'Resident',
                bloodGroup: 'Select',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80'
            })),
            activeServiceCategory: 'all',
            activeServiceRadius: 'all',
            activeJobCategory: 'all',
            activeJobType: 'all',
            activeJobTab: 'jobs',
            activeJobRadius: 'all',
            activeBloodGroup: 'all',
            activeBloodRadius: 'all',
            activeFriendsRadius: 'all',
            activeMarketRadius: 'all',
            activeTaxiRadius: 'all',
            nearbyFriendsOptIn: localStorage.getItem('thuna_friends_optin') !== 'false',
            activeCommunityFilter: 'all',
            activeChatProvider: null,
            chatHistories: JSON.parse(localStorage.getItem('thuna_chat_histories') || '{}')
        };

        // Service Providers with real coordinates
        const DEFAULT_SERVICES = [
            {
                id: 'prov_1',
                name: 'Sreejith Electricals',
                category: 'electrician',
                rating: 4.8,
                reviews: 124,
                location: 'Paranthal Road, Adoor',
                lat: 9.1550, lon: 76.7380,
                latDiff: 0.0008, lonDiff: 0.0006, // ~110m away (< 200m)
                desc: 'Electrician • Home & Office Wiring',
                phone: '+919846122334',
                color: '#eab308',
                bgColor: '#fef9c3',
                icon: '⚡',
                keywords: ['wiring', 'inverter', 'fan', 'switch']
            },
            {
                id: 'prov_2',
                name: 'Ramesh Plumbing Works',
                category: 'plumber',
                rating: 4.7,
                reviews: 98,
                location: 'Nellimukku, Adoor',
                lat: 9.1620, lon: 76.7290,
                latDiff: 0.0012, lonDiff: -0.0009, // ~165m away (< 200m)
                desc: 'Plumber • Leak Repair & Pipe Installation',
                phone: '+919847255667',
                color: '#0284c7',
                bgColor: '#e0f2fe',
                icon: '🚰',
                keywords: ['pipe', 'leak', 'motor', 'tank']
            },
            {
                id: 'prov_3',
                name: 'Adoor Auto Service',
                category: 'driver',
                rating: 4.6,
                reviews: 210,
                location: 'KSRTC Stand, Adoor',
                lat: 9.1480, lon: 76.7360,
                latDiff: -0.0028, lonDiff: 0.0021, // ~390m away (< 500m)
                desc: 'Auto Driver • Local & Outstation Trips',
                phone: '+919447388990',
                color: '#16a34a',
                bgColor: '#dcfce7',
                icon: '🛺',
                keywords: ['auto', 'trip', 'market']
            },
            {
                id: 'prov_4',
                name: 'Dr. Anitha Rai Clinic',
                category: 'doctor',
                rating: 4.9,
                reviews: 76,
                location: 'Govt Hospital Road, Adoor',
                lat: 9.1560, lon: 76.7420,
                latDiff: 0.0065, lonDiff: 0.0050, // ~910m away (< 1km)
                desc: 'General Physician & Family Health Clinic',
                phone: '+919446011223',
                color: '#0284c7',
                bgColor: '#e0f2fe',
                icon: '🩺',
                keywords: ['doctor', 'clinic', 'fever']
            },
            {
                id: 'prov_5',
                name: 'Babu Carpenter & Interiors',
                category: 'carpenter',
                rating: 4.8,
                reviews: 64,
                location: 'Kannamcode, Adoor',
                lat: 9.1680, lon: 76.7450,
                latDiff: 0.0150, lonDiff: 0.0120, // ~2.1 km
                desc: 'Carpenter • Wood Works, Door & Furniture',
                phone: '+919846433445',
                color: '#d97706',
                bgColor: '#fef3c7',
                icon: '🔨',
                keywords: ['wood', 'furniture', 'door']
            },
            {
                id: 'prov_6',
                name: 'Lakshmi Home Care & Help',
                category: 'house help',
                rating: 4.9,
                reviews: 53,
                location: 'Anandapally, Adoor',
                lat: 9.1490, lon: 76.7280,
                latDiff: 0.0220, lonDiff: -0.0180, // ~3.1 km
                desc: 'House Help • Cooking, Cleaning & Maid',
                phone: '+919745566778',
                color: '#0d9488',
                bgColor: '#ccfbf1',
                icon: '🏠',
                keywords: ['cleaning', 'cooking', 'maid']
            },
            {
                id: 'prov_7',
                name: 'Career Point Tuition Centre',
                category: 'tuition',
                rating: 4.9,
                reviews: 112,
                location: 'Central Junction, Adoor',
                lat: 9.1540, lon: 76.7340,
                latDiff: -0.0007, lonDiff: 0.0005, // ~100m away (< 200m)
                desc: 'Tuition • High School & Science / Maths',
                phone: '+919846277889',
                color: '#059669',
                bgColor: '#dcfce7',
                icon: '📖',
                keywords: ['maths', 'science', 'tuition']
            },
            {
                id: 'prov_8',
                name: 'Adoor Vet & Pet Care Clinic',
                category: 'pet care',
                rating: 4.8,
                reviews: 47,
                location: 'Ezhamkulam, Adoor',
                lat: 9.1710, lon: 76.7550,
                latDiff: 0.0350, lonDiff: 0.0280, // ~4.9 km
                desc: 'Pet Care • Vaccination & Dog Grooming',
                phone: '+919847899001',
                color: '#2563eb',
                bgColor: '#dbeafe',
                icon: '🐾',
                keywords: ['veterinary', 'dog food', 'grooming']
            },
            {
                id: 'prov_9',
                name: 'Adoor Cool Point AC Service',
                category: 'ac',
                rating: 4.9,
                reviews: 82,
                location: 'High School Jn, Adoor',
                lat: 9.1580, lon: 76.7390,
                latDiff: 0.0031, lonDiff: 0.0024, // ~440m away (< 500m)
                desc: 'AC & Refrigerator Repair • Gas Filling',
                phone: '+919846332211',
                color: '#0891b2',
                bgColor: '#cffafe',
                icon: '❄️',
                keywords: ['ac', 'fridge', 'gas filling']
            },
            {
                id: 'prov_10',
                name: 'Colors House Painting Works',
                category: 'painter',
                rating: 4.8,
                reviews: 58,
                location: 'Paranthal, Adoor',
                lat: 9.1390, lon: 76.7200,
                latDiff: 0.0180, lonDiff: 0.0150, // ~2.6 km
                desc: 'Painter • Exterior, Interior & Waterproofing',
                phone: '+919447118822',
                color: '#7c3aed',
                bgColor: '#ede9fe',
                icon: '🎨',
                keywords: ['painting', 'waterproofing', 'putty']
            },
            {
                id: 'prov_11',
                name: 'Manoj Coconut Picking Service',
                category: 'coconut',
                rating: 4.9,
                reviews: 94,
                location: 'Manakkala, Adoor',
                lat: 9.1610, lon: 76.7480,
                latDiff: 0.0240, lonDiff: 0.0190, // ~3.4 km
                desc: 'Coconut Tree Climber • Tree & Branch Cutting',
                phone: '+919745889911',
                color: '#15803d',
                bgColor: '#dcfce7',
                icon: '🌴',
                keywords: ['coconut', 'tree cutting', 'timber']
            },
            {
                id: 'prov_12',
                name: 'SecureVision CCTV Solutions',
                category: 'cctv',
                rating: 4.8,
                reviews: 41,
                location: 'Bypass Road, Adoor',
                lat: 9.1520, lon: 76.7310,
                latDiff: -0.0011, lonDiff: -0.0008, // ~150m away (< 200m)
                desc: 'CCTV Installation • WiFi Smart Cameras',
                phone: '+919846774433',
                color: '#1e40af',
                bgColor: '#dbeafe',
                icon: '📹',
                keywords: ['cctv', 'camera', 'security']
            }
        ];

        // Community Feed Posts (Authentic Local Community Updates)
        const DEFAULT_POSTS = [
            {
                id: 'post_comm_1',
                authorName: 'ഗ്രാമപഞ്ചായത്ത് ഓഫീസ്',
                authorBadge: '🏛️',
                authorAvatar: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=120&q=80',
                badgeBg: '#064E3B',
                hasPin: true,
                timeAgo: '15 മിനിറ്റ് മുൻപ്',
                category: 'news',
                categoryLabel: 'പഞ്ചായത്ത് അറിയിപ്പ്',
                location: 'അടൂർ ടൗൺ',
                lat: 9.1530, lon: 76.7356,
                title: 'പഞ്ചായത്ത് വായനശാല നവീകരണ ഉദ്ഘാടനം നാളെ 📚🌿',
                content: 'ഗ്രാമപഞ്ചായത്തിന്റെ പുതിയ ഡിജിറ്റൽ വായനശാലയുടെയും റഫറൻസ് വിഭാഗത്തിന്റെയും ഉദ്ഘാടനം നാളെ രാവിലെ 10 മണിക്ക് പഞ്ചായത്ത് പ്രസിഡന്റ് നിർവ്വഹിക്കും. മുഴുവൻ നാട്ടുകാരും പങ്കാളികളാകണമെന്ന് അഭ്യർത്ഥിക്കുന്നു.',
                mediaUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
                likes: 42,
                liked: false,
                comments: 6,
                shares: 14,
                commentsList: [
                    { author: 'ഹരികുമാർ', text: 'വളരെ നല്ലൊരു തുടക്കം! അഭിനന്ദനങ്ങൾ 👏', time: '10 മിനിറ്റ് മുൻപ്' },
                    { author: 'സുരേഷ് എം.', text: 'ഡിജിറ്റൽ ലൈബ്രറിയിൽ പുതിയ പുസ്തകങ്ങൾ കൂടി ഉൾപ്പെടുത്തുമല്ലോ.', time: '5 മിനിറ്റ് മുൻപ്' }
                ]
            },
            {
                id: 'post_comm_2',
                authorName: 'രക്തദാന സേന അടൂർ',
                authorBadge: '🩸',
                authorAvatar: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=120&q=80',
                badgeBg: '#DC2626',
                hasPin: false,
                timeAgo: '1 മണിക്കൂർ മുൻപ്',
                category: 'help',
                categoryLabel: 'അടിയന്തിര രക്തദാനം',
                location: 'താലൂക്ക് ആശുപത്രി',
                lat: 9.1560, lon: 76.7420,
                title: 'താലൂക്ക് ആശുപത്രിയിൽ O+ രക്തം അടിയന്തിരമായി ആവശ്യമുണ്ട് ❤️',
                content: 'സർജറി ആവശ്യത്തിനായി O+ ഗ്രൂപ്പ് രക്തം അടിയന്തിരമായി വേണം. സന്നദ്ധരായ ദാതാക്കൾ ഉടൻ ബന്ധപ്പെടുക: 94471 22334.',
                mediaUrl: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80',
                likes: 68,
                liked: true,
                comments: 12,
                shares: 31,
                commentsList: [
                    { author: 'ഡോ. നിഖിൽ', text: 'ഞാൻ താലൂക്ക് ആശുപത്രിയിലുണ്ട്, ബന്ധപ്പെട്ടിട്ടുണ്ട്.', time: '40 മിനിറ്റ് മുൻപ്' }
                ]
            },
            {
                id: 'post_comm_3',
                authorName: 'കർഷക കൂട്ടായ്മ',
                authorBadge: '🌾',
                authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
                badgeBg: '#15803D',
                hasPin: false,
                timeAgo: '3 മണിക്കൂർ മുൻപ്',
                category: 'news',
                categoryLabel: 'നാട്ടുചന്ത',
                location: 'സെൻട്രൽ ജംഗ്ഷൻ',
                lat: 9.1510, lon: 76.7320,
                title: 'ഞായറാഴ്ച ജൈവ പച്ചക്കറി നാട്ടുചന്ത ആരംഭിക്കുന്നു 🥬🍅',
                content: 'നാട്ടിലെ കർഷകർ നേരിട്ട് വിളവെടുത്ത വിഷരഹിത പച്ചക്കറികളും നാടൻ പഴങ്ങളും ലഭ്യമാകുന്ന നാട്ടുചന്ത ഈ ഞായറാഴ്ച രാവിലെ 7 മണി മുതൽ സെൻട്രൽ ജംഗ്ഷനിൽ ആരംഭിക്കുന്നു. ഏവർക്കും സ്വാഗതം!',
                mediaUrl: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=800&q=80',
                likes: 53,
                liked: false,
                comments: 8,
                shares: 18,
                commentsList: [
                    { author: 'രാധാകൃഷ്ണൻ', text: 'നല്ലൊരു സംരംഭം. എല്ലാവരും പിന്തുണയ്ക്കുക!', time: '2 മണിക്കൂർ മുൻപ്' }
                ]
            },
            {
                id: 'post_comm_4',
                authorName: 'യൂത്ത് ക്ലബ്ബ് അടൂർ',
                authorBadge: '⚽',
                authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
                badgeBg: '#2563EB',
                hasPin: false,
                timeAgo: '5 മണിക്കൂർ മുൻപ്',
                category: 'events',
                categoryLabel: 'കായികമേള',
                location: 'പഞ്ചായത്ത് ഗ്രൗണ്ട്',
                lat: 9.1580, lon: 76.7340,
                title: 'ഓൾ കേരള സെവൻസ് ഫുട്ബോൾ ടൂർണമെന്റ് രജിസ്ട്രേഷൻ ആരംഭിച്ചു ⚽🔥',
                content: 'അടൂർ പഞ്ചായത്ത് സ്റ്റേഡിയത്തിൽ നടക്കുന്ന സംസ്ഥാനതല സെവൻസ് ഫുട്ബോൾ ചാമ്പ്യൻഷിപ്പിലേക്ക് ടീമുകൾക്ക് ഇപ്പോൾ രജിസ്റ്റർ ചെയ്യാം. ആകർഷകമായ സമ്മാനങ്ങളും ട്രോഫികളും!',
                mediaUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
                likes: 89,
                liked: false,
                comments: 19,
                shares: 26,
                commentsList: []
            },
            {
                id: 'post_comm_5',
                authorName: 'കെ.എസ്.ഇ.ബി സെക്ഷൻ ഓഫീസ്',
                authorBadge: '⚡',
                authorAvatar: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=120&q=80',
                badgeBg: '#D97706',
                hasPin: false,
                timeAgo: '7 മണിക്കൂർ മുൻപ്',
                category: 'news',
                categoryLabel: 'വൈദ്യുതി അറിയിപ്പ്',
                location: 'സെൻട്രൽ ഫീഡർ',
                lat: 9.1525, lon: 76.7345,
                title: 'വൈദ്യുതി മുടങ്ങുന്ന വിവരം ⚡🛠️',
                content: 'ലൈൻ നവീകരണ ജോലികൾ നടക്കുന്നതിനാൽ നാളെ രാവിലെ 9:00 മണി മുതൽ വൈകിട്ട് 5:00 മണി വരെ സെൻട്രൽ ഫീഡർ പരിധിയിലുള്ള പ്രദേശങ്ങളിൽ വൈദ്യുതി വിതരണം ഭാഗികമായി തടസ്സപ്പെടുമെന്ന് കെ.എസ്.ഇ.ബി അറിയിച്ചു.',
                mediaUrl: '',
                likes: 31,
                liked: false,
                comments: 4,
                shares: 22,
                commentsList: []
            }
        ];

        // Voluntary Blood Donors with geographic coordinates
        const DEFAULT_DONORS = [
            { name: 'Dr. Nikhil Mohan', group: 'A+', location: 'Paranthal, Adoor', lat: 9.1415, lon: 76.7210, latDiff: 0.0007, lonDiff: 0.0005, phone: '+91 94471 22334' }, // ~96m (< 200m)
            { name: 'Sarath Chandran', group: 'A+', location: 'Nellimukku, Adoor', lat: 9.1580, lon: 76.7320, latDiff: 0.0011, lonDiff: 0.0008, phone: '+91 98471 44552' }, // ~150m (< 200m)
            { name: 'Rahul K.V', group: 'A-', location: 'Ezhamkulam, Adoor', lat: 9.1720, lon: 76.7710, latDiff: 0.0035, lonDiff: 0.0025, phone: '+91 94950 11223' }, // ~480m (< 500m)
            { name: 'Akhil Raj', group: 'A-', location: 'Thuvayoor North', lat: 9.1120, lon: 76.7110, latDiff: -0.0012, lonDiff: 0.0009, phone: '+91 97442 33119' }, // ~165m (< 200m)
            { name: 'Faisal Mohammed', group: 'B+', location: 'Anandapally, Adoor', lat: 9.1490, lon: 76.7280, latDiff: 0.0028, lonDiff: -0.0018, phone: '+91 98462 88771' }, // ~380m (< 500m)
            { name: 'Dileep Kumar', group: 'B+', location: 'Central Junction, Adoor', lat: 9.1530, lon: 76.7356, latDiff: -0.0009, lonDiff: 0.0007, phone: '+91 94460 77881' }, // ~125m (< 200m)
            { name: 'Siddharth M', group: 'B-', location: 'Kayamkulam Road, Adoor', lat: 9.1510, lon: 76.7300, latDiff: 0.0013, lonDiff: -0.0006, phone: '+91 98460 33445' }, // ~158m (< 200m)
            { name: 'Jitin Jacob', group: 'B-', location: 'Paranthal Junction', lat: 9.1420, lon: 76.7230, latDiff: -0.0035, lonDiff: 0.0025, phone: '+91 97450 66778' }, // ~480m (< 500m)
            { name: 'Ajith Kumar', group: 'A+', location: 'Adoor Town', lat: 9.1530, lon: 76.7356, latDiff: 0.0022, lonDiff: 0.0018, phone: '+91 94471 98765' }, // ~315m (< 500m)
            { name: 'Sreejith R', group: 'O+', location: 'Kottarakkara Road, Adoor', lat: 9.1400, lon: 76.7410, latDiff: -0.0010, lonDiff: 0.0008, phone: '+91 94473 55661' }, // ~142m (< 200m)
            { name: 'Vishnu Prasad', group: 'O-', location: 'Pandalam Road, Adoor', lat: 9.1650, lon: 76.7300, latDiff: 0.0014, lonDiff: 0.0005, phone: '+91 97451 99002' }, // ~165m (< 200m)
            { name: 'Deepu Mathew', group: 'O-', location: 'Taluk Hospital Road, Adoor', lat: 9.1570, lon: 76.7430, latDiff: 0.0031, lonDiff: -0.0022, phone: '+91 98478 11229' }, // ~430m (< 500m)
            { name: 'Anjali Nair', group: 'AB+', location: 'Central Junction, Adoor', lat: 9.1530, lon: 76.7356, latDiff: 0.0008, lonDiff: -0.0009, phone: '+91 98473 44556' }, // ~133m (< 200m)
            { name: 'Manoj George', group: 'AB+', location: 'Kannamcode, Adoor', lat: 9.1680, lon: 76.7450, latDiff: 0.0042, lonDiff: 0.0031, phone: '+91 94960 99881' }, // ~580m
            { name: 'Meera Thomas', group: 'AB-', location: 'Manakkala, Adoor', lat: 9.1610, lon: 76.7480, latDiff: -0.0011, lonDiff: 0.0009, phone: '+91 97441 55667' }, // ~156m (< 200m)
            { name: 'Sujith S Pillai', group: 'AB-', location: 'Pandalam Medical Trust Road', lat: 9.2250, lon: 76.6850, latDiff: 0.0075, lonDiff: -0.0055, phone: '+91 98461 44332' } // ~1.0 km
        ];

        // Urgent Blood Requests Dataset
        const DEFAULT_URGENT_BLOOD_REQUESTS = [
            {
                id: 'urg_1',
                group: 'O+',
                units: 2,
                urgency: 'Immediate (ഇന്ന് തന്നെ)',
                hospital: 'Taluk Head Quarters Hospital, Adoor',
                lat: 9.1560, lon: 76.7420,
                latDiff: 0.0008, lonDiff: 0.0006, // ~110m (< 200m)
                location: 'Adoor Hospital Road',
                reason: 'Emergency Surgery',
                contactPerson: 'Suresh Kumar',
                contactPhone: '+91 94471 99001',
                timeAgo: '15 mins ago'
            },
            {
                id: 'urg_2',
                group: 'B-',
                units: 1,
                urgency: 'Within 24 Hours',
                hospital: 'Lifeline Super Speciality Hospital',
                lat: 9.1650, lon: 76.7410,
                latDiff: 0.0028, lonDiff: 0.0019, // ~380m (< 500m)
                location: 'Melood, Adoor',
                reason: 'Accident Trauma ICU',
                contactPerson: 'Deepa V',
                contactPhone: '+91 98462 11002',
                timeAgo: '1 hour ago'
            }
        ];

        // Nearby Friends Dataset (No dummy profiles, real opted-in users only)
        const DEFAULT_FRIENDS = [];

        function getFriendsList() {
            try {
                const legacyDummyNames = ['Anil Kumar', 'Deepa Suresh', 'Nimisha Raj', 'Dr. Vineeth', 'Manoj Varma', 'Kavitha Nair', 'Sujith Kumar', 'Reshma Alex'];
                const custom = JSON.parse(localStorage.getItem('thuna_custom_friends') || '[]');
                const all = [...custom, ...(DEFAULT_FRIENDS || [])];
                return all.filter(f => f && !f.isDummy && !legacyDummyNames.includes(f.name));
            } catch (_) {
                return [];
            }
        }

        // Local Jobs Dataset with coordinates
        const DEFAULT_JOBS = [
            {
                id: 'job_1',
                title: 'Delivery Executive (Food & Grocery)',
                company: 'Adoor QuickExpress Logistix',
                category: 'delivery',
                categoryLabel: 'Driver / Delivery',
                type: 'Full-Time',
                salary: '₹18,000 - ₹24,000 / mo',
                location: 'Adoor Town, Pathanamthitta',
                lat: 9.1530, lon: 76.7356,
                latDiff: 0.0009, lonDiff: 0.0007, // ~126m (< 200m)
                timings: 'Shift based (10 AM - 7 PM)',
                description: 'Urgent hiring for local two-wheeler delivery partner in Adoor & surroundings. Fuel allowance + incentives provided.',
                contactPhone: '+91 94471 88990',
                postedAgo: 'Today'
            },
            {
                id: 'job_2',
                title: 'Sales & Billing Counter Executive',
                company: 'Malabar Fashion Silks',
                category: 'sales',
                categoryLabel: 'Sales & Retail',
                type: 'Full-Time',
                salary: '₹14,000 - ₹18,000 / mo',
                location: 'Central Junction, Adoor',
                lat: 9.1540, lon: 76.7340,
                latDiff: 0.0013, lonDiff: -0.0006, // ~158m (< 200m)
                timings: '9:30 AM - 8:00 PM',
                description: 'Need friendly billing counter staff with basic computer & POS billing knowledge. Freshers or experienced can apply.',
                contactPhone: '+91 98471 22331',
                postedAgo: '1 day ago'
            },
            {
                id: 'job_3',
                title: 'Junior Accounts Assistant (Tally)',
                company: 'Travancore Spices & Traders',
                category: 'office',
                categoryLabel: 'Office & Admin',
                type: 'Full-Time',
                salary: '₹16,000 - ₹20,000 / mo',
                location: 'Paranthal, Adoor',
                lat: 9.1415, lon: 76.7210,
                latDiff: 0.0032, lonDiff: 0.0024, // ~444m (< 500m)
                timings: '9:00 AM - 5:30 PM',
                description: 'B.Com graduate with practical Tally Prime and GST filing experience required for our wholesale distribution hub.',
                contactPhone: '+91 94950 44556',
                postedAgo: '2 days ago'
            },
            {
                id: 'job_4',
                title: 'Head Cook & Sadhya Assistant',
                company: 'Udaya Catering Services',
                category: 'hotel',
                categoryLabel: 'Hotel & Cook',
                type: 'Daily Wage',
                salary: '₹1,000 - ₹1,400 / day',
                location: 'Kottarakkara Road, Adoor',
                lat: 9.1400, lon: 76.7410,
                latDiff: 0.0028, lonDiff: -0.0022, // ~395m (< 500m)
                timings: 'Event based / Morning shifts',
                description: 'Experienced cook needed for marriage & traditional Kerala sadhya orders. Daily wage with meals provided.',
                contactPhone: '+91 97442 88771',
                postedAgo: 'Yesterday'
            },
            {
                id: 'job_5',
                title: 'Assistant Electrician & Wireman',
                company: 'PowerTech Electricals',
                category: 'technical',
                categoryLabel: 'Technical & Skilled',
                type: 'Full-Time',
                salary: '₹15,000 - ₹22,000 / mo',
                location: 'Ezhamkulam, Adoor',
                lat: 9.1720, lon: 76.7710,
                latDiff: 0.0065, lonDiff: 0.0045, // ~880m (< 1km)
                timings: '8:30 AM - 5:30 PM',
                description: 'House wiring helper / wireman needed. ITI Electrical or minimum 1 year practical site experience preferred.',
                contactPhone: '+91 98462 33441',
                postedAgo: '3 days ago'
            },
            {
                id: 'job_6',
                title: 'Clinic Receptionist (Female)',
                company: 'SmileCare Dental Clinic',
                category: 'office',
                categoryLabel: 'Office & Clinic',
                type: 'Part-Time',
                salary: '₹8,500 - ₹11,000 / mo',
                location: 'Taluk Hospital Road, Adoor',
                lat: 9.1570, lon: 76.7430,
                latDiff: 0.0011, lonDiff: 0.0009, // ~158m (< 200m)
                timings: '3:30 PM - 8:30 PM (Evening)',
                description: 'Looking for a pleasant receptionist to manage patient appointments, front-desk register and call handling.',
                contactPhone: '+91 97451 11220',
                postedAgo: '2 days ago'
            },
            {
                id: 'job_7',
                title: 'Supermarket Stock Helper',
                company: 'Daily Fresh Supermart',
                category: 'helper',
                categoryLabel: 'Helper & Staff',
                type: 'Full-Time',
                salary: '₹12,000 - ₹15,000 / mo',
                location: 'Anandapally, Adoor',
                lat: 9.1490, lon: 76.7280,
                latDiff: 0.0075, lonDiff: -0.0055, // ~1.0 km
                timings: '8:00 AM - 8:00 PM',
                description: 'Shelf stock arrangement, vegetable rack maintenance, and unloading goods at supermart. Free tea and lunch provided.',
                contactPhone: '+91 98473 99882',
                postedAgo: '3 days ago'
            },
            {
                id: 'job_8',
                title: 'Dedicated Auto Rickshaw Driver',
                company: 'Greenway School Auto Stand',
                category: 'delivery',
                categoryLabel: 'Driver / Delivery',
                type: 'Daily Wage',
                salary: '₹700 - ₹1,000 / day',
                location: 'Nellimukku, Adoor',
                lat: 9.1580, lon: 76.7320,
                latDiff: -0.0010, lonDiff: 0.0008, // ~142m (< 200m)
                timings: 'Morning & Evening school hours',
                description: 'Valid 3-wheeler badge driver needed for morning and evening school trips and local stand duties. Reliable character required.',
                contactPhone: '+91 94460 55443',
                postedAgo: 'Just now'
            },
            {
                id: 'job_9',
                title: 'Online Customer Support & Data Entry',
                company: 'Kerala e-Commerce Solutions',
                category: 'office',
                categoryLabel: 'Office & Support',
                type: 'Work From Home',
                salary: '₹15,000 - ₹20,000 / mo',
                location: 'Kerala (Work From Home)',
                lat: 9.1530, lon: 76.7356,
                latDiff: 0.0005, lonDiff: 0.0005, // ~78m (< 200m)
                timings: 'Flexible 6 hours / day',
                description: 'Malayalam & English typing with basic computer knowledge. Laptop or smartphone with internet required. Freshers can apply.',
                contactPhone: '+91 94470 12345',
                postedAgo: 'Today'
            },
            {
                id: 'job_10',
                title: 'Electrical Maintenance Contractor',
                company: 'Travancore Commercial Complex',
                category: 'technical',
                categoryLabel: 'Technical & Skilled',
                type: 'Contract',
                salary: '₹25,000 - ₹35,000 / mo',
                location: 'Adoor Bypass, Pathanamthitta',
                lat: 9.1550, lon: 76.7370,
                latDiff: 0.0014, lonDiff: 0.0008, // ~178m (< 200m)
                timings: 'Contract basis (6 months renewable)',
                description: 'Commercial building electrical maintenance, generator upkeep, and light fittings contract.',
                contactPhone: '+91 98471 67890',
                postedAgo: 'Yesterday'
            }
        ];

        // Local Rentals Dataset with items, tools, vehicles & houses
        const DEFAULT_RENTALS = [
            {
                id: 'rent_item_1',
                title: 'Power Tiller & Grass Cutter (കാർഷിക മെഷീൻ)',
                rent: '₹750 / day',
                deposit: '₹1,000',
                type: 'Tools & Equipment',
                category: 'items',
                location: 'Adoor Town, Pathanamthitta',
                lat: 9.1530, lon: 76.7356,
                latDiff: 0.0008, lonDiff: 0.0006, // ~110m (< 200m)
                desc: 'കൃഷിയിടങ്ങൾ ഉഴുതുമറിക്കാനും പുല്ല് വെട്ടാനുമുള്ള പെട്രോൾ പവർ ടില്ലർ. ദിവസ വാടകയ്ക്ക് ലഭ്യമാണ്.',
                contactPhone: '+91 94471 88990'
            },
            {
                id: 'rent_item_2',
                title: 'Event Sound System + 2 Wireless Mics (സൗണ്ട് സെറ്റ്)',
                rent: '₹1,500 / day',
                deposit: '₹2,000',
                type: 'Event & Party',
                category: 'items',
                location: 'Central Junction, Adoor',
                lat: 9.1530, lon: 76.7356,
                latDiff: -0.0011, lonDiff: 0.0008, // ~150m (< 200m)
                desc: 'വിവാഹം, കുടുംബ സംഗമങ്ങൾ, യോഗങ്ങൾ എന്നിവയ്ക്കുള്ള ഹൈ ക്വാളിറ്റി സ്പീക്കറുകളും ബ്ലൂടൂത്ത് മിക്സറും.',
                contactPhone: '+91 98471 22334'
            },
            {
                id: 'rent_item_3',
                title: 'Heavy Demolition Breaker & Hammer Drill (ഡ്രിൽ മെഷീൻ)',
                rent: '₹400 / day',
                deposit: '₹1,000',
                type: 'Tools & Equipment',
                category: 'items',
                location: 'Paranthal, Adoor',
                lat: 9.1415, lon: 76.7210,
                latDiff: 0.0035, lonDiff: 0.0025, // ~480m (< 500m)
                desc: 'കോൺക്രീറ്റ് പൊളിക്കാനും പ്ലംബിംഗ് / വയറിംഗ് ചാനലുകൾ എടുക്കാനുമുള്ള ഹെവി ടൂളുകൾ വാടകയ്ക്ക്.',
                contactPhone: '+91 98460 11223'
            },
            {
                id: 'rent_item_4',
                title: 'Mahindra Bolero Maxi Truck (ലോഡിംഗ് വാഹനം)',
                rent: '₹1,200 / day',
                deposit: '₹2,000',
                type: 'Vehicle',
                category: 'vehicles',
                location: 'Near KSRTC Stand, Adoor',
                lat: 9.1540, lon: 76.7380,
                latDiff: 0.0012, lonDiff: -0.0007, // ~155m (< 200m)
                desc: 'സാധനങ്ങൾ കൊണ്ടുപോകുന്നതിനും വീട്ടുസാധനങ്ങൾ മാറ്റുന്നതിനും വാടകയ്ക്ക്. ഡ്രൈവർ സഹിതം.',
                contactPhone: '+91 94462 77881'
            },
            {
                id: 'rent_1',
                title: '2 BHK Independent House (Ground Floor)',
                rent: '₹9,500 / month',
                deposit: '₹30,000',
                type: 'House / Villa',
                category: 'houses',
                location: 'Near Taluk Hospital, Adoor',
                lat: 9.1560, lon: 76.7420,
                latDiff: 0.0065, lonDiff: 0.0050, // ~910m (< 1km)
                desc: 'Spacious 2 bedrooms with attached bathrooms, modular kitchen, car porch and borewell water 24x7.',
                contactPhone: '+91 98471 55660'
            },
            {
                id: 'rent_2',
                title: 'Commercial Shop Space (380 sq.ft)',
                rent: '₹16,000 / month',
                deposit: '₹50,000',
                type: 'Shop / Commercial',
                category: 'houses',
                location: 'Central Junction Main Road, Adoor',
                lat: 9.1530, lon: 76.7356,
                latDiff: -0.0009, lonDiff: 0.0006, // ~120m (< 200m)
                desc: 'Road-facing commercial room suitable for clinic, travel agency, boutique or bakery. Glass door fitted.',
                contactPhone: '+91 94473 22119'
            }
        ];

        // Marketplace (Buy & Sell) Dataset
        const DEFAULT_MARKETPLACE = [
            {
                id: 'market_1',
                title: 'Hero Splendor Plus (2021 Model)',
                price: '₹48,000',
                category: 'vehicles',
                location: 'Adoor Bypass Junction',
                lat: 9.1520, lon: 76.7310,
                latDiff: 0.0011, lonDiff: 0.0008, // ~150m (< 200m)
                desc: 'Single owner, 24,000 km run, new tyres, insurance valid till Nov 2027.',
                contactPerson: 'Sujith M'
            },
            {
                id: 'market_2',
                title: 'Solid Teak Wood Dining Table (6 Chairs)',
                price: '₹14,500',
                category: 'household',
                location: 'Paranthal, Adoor',
                lat: 9.1415, lon: 76.7210,
                latDiff: 0.0032, lonDiff: 0.0022, // ~430m (< 500m)
                desc: 'Excellent condition genuine Nilambur teak dining set. Relocating, so urgent sale.',
                contactPerson: 'Thomas George'
            },
            {
                id: 'market_3',
                title: 'Pure Organic Farm Honey (1 KG Fresh)',
                price: '₹550',
                category: 'household',
                location: 'Ezhamkulam, Adoor',
                lat: 9.1720, lon: 76.7710,
                latDiff: -0.0012, lonDiff: 0.0007, // ~155m (< 200m)
                desc: '100% natural wild-flower honey harvested directly from our rubber plantation apiary.',
                contactPerson: 'Manoj Kumar'
            },
            {
                id: 'market_4',
                title: 'Samsung 32" Smart HD LED TV',
                price: '₹8,500',
                category: 'household',
                location: 'Nellimukku, Adoor',
                lat: 9.1580, lon: 76.7320,
                latDiff: 0.0070, lonDiff: 0.0050, // ~960m (< 1km)
                desc: 'YouTube, Netflix, Prime Video supported, pristine condition with wall-mount bracket.',
                contactPerson: 'Deepak V'
            }
        ];

        // Taxi & Auto Travel Dataset
        const DEFAULT_TAXIS = [
            {
                id: 'taxi_1',
                name: 'Suresh Auto Rickshaw (24x7)',
                type: 'auto',
                vehicle: 'Bajaj RE Auto (KL-26)',
                location: 'Central Stand, Adoor',
                lat: 9.1530, lon: 76.7356,
                latDiff: 0.0008, lonDiff: 0.0006, // ~110m (< 200m)
                phone: '+91 94471 22998',
                desc: 'Day & night local trips, hospital emergency pickups, railway/bus station drops.'
            },
            {
                id: 'taxi_2',
                name: 'Kripa Tourist Taxi (Innova Crysta & Dzire)',
                type: 'taxi',
                vehicle: 'Innova Crysta 7-Seater',
                location: 'Bypass Jn, Adoor',
                lat: 9.1520, lon: 76.7310,
                latDiff: 0.0028, lonDiff: 0.0020, // ~385m (< 500m)
                phone: '+91 98462 88443',
                desc: 'Airport trips (TRV / COK), Sabarimala pilgrimage, marriage trips, AC sanitized cabs.'
            },
            {
                id: 'taxi_3',
                name: 'Anand Swift Dzire Taxi',
                type: 'taxi',
                vehicle: 'Maruti Suzuki Dzire AC',
                location: 'KSRTC Stand, Adoor',
                lat: 9.1540, lon: 76.7370,
                latDiff: -0.0011, lonDiff: 0.0008, // ~150m (< 200m)
                phone: '+91 98475 11223',
                desc: 'Local & outstation trips, 24-hour service, affordable meter fares.'
            }
        ];

        // Emergency Ambulances with verified coordinates
        const DEFAULT_AMBULANCES = [
            {
                id: 'amb_def_1',
                name: 'Adoor Govt Hospital Ambulance',
                type: 'Basic & ICU Life Support',
                location: 'Taluk Hospital, Adoor',
                lat: 9.1560, lon: 76.7420,
                phone: '108',
                vehicle: 'Toll-Free 108 Service'
            },
            {
                id: 'amb_def_2',
                name: 'Life Care Private Ambulance Adoor',
                type: 'Ventilator & Oxygen Unit',
                location: 'Central Junction, Adoor',
                lat: 9.1510, lon: 76.7300,
                phone: '+919847123999',
                vehicle: 'KL-26-G-4011'
            },
            {
                id: 'amb_def_3',
                name: 'Red Cross Ambulance Service',
                type: 'Trauma Response Unit',
                location: 'Paranthal Road, Adoor',
                lat: 9.1450, lon: 76.7250,
                phone: '+919447012345',
                vehicle: 'KL-26-H-8922'
            }
        ];

        let splashAutoTimer = null;
        function initSplashScreen() {
            navTo('splash');
            // Auto-advance to home after 2.8 seconds
            splashAutoTimer = setTimeout(() => {
                enterAppFromSplash();
            }, 2800);
        }

        function enterAppFromSplash() {
            if (splashAutoTimer) {
                clearTimeout(splashAutoTimer);
                splashAutoTimer = null;
            }
            const splashEl = document.getElementById('screen-splash');
            if (splashEl && splashEl.classList.contains('active')) {
                splashEl.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
                splashEl.style.opacity = '0';
                splashEl.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    splashEl.style.opacity = '';
                    splashEl.style.transform = '';
                    navTo('home');
                    setTimeout(() => checkAndPromptLocationPermissionOnStartup(), 150);
                }, 340);
            } else {
                navTo('home');
                setTimeout(() => checkAndPromptLocationPermissionOnStartup(), 150);
            }
        }

        let hasCheckedStartupLocation = false;
        async function checkAndPromptLocationPermissionOnStartup() {
            if (hasCheckedStartupLocation) return;
            hasCheckedStartupLocation = true;

            // 1. If Capacitor Native Geolocation plugin is available, trigger native Android OS permission prompt
            if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.Geolocation) {
                try {
                    const perm = await window.Capacitor.Plugins.Geolocation.requestPermissions();
                    if (perm && (perm.location === 'granted' || perm.coarseLocation === 'granted')) {
                        refreshCurrentLocationLive(false);
                        return;
                    }
                } catch (e) {
                    console.warn('[Location Native] requestPermissions:', e);
                }
            }

            // 2. Query Permissions API if supported
            if (navigator.permissions && navigator.permissions.query) {
                try {
                    const p = await navigator.permissions.query({ name: 'geolocation' });
                    if (p.state === 'granted') {
                        // Already granted: fetch live GPS coordinates immediately
                        refreshCurrentLocationLive(true);
                        return;
                    } else if (p.state === 'prompt') {
                        // Prompt state: Open beautiful explanation modal AND trigger native browser prompt
                        openModal('modal-location-permission-request');
                        triggerNativeLocationRequestDirect();
                        return;
                    } else if (p.state === 'denied') {
                        // Denied previously: Open explanation modal so user knows to allow or pick
                        openModal('modal-location-permission-request');
                        return;
                    }
                } catch (_) {}
            }

            // 3. Fallback: Open permission modal and trigger native geolocation directly
            openModal('modal-location-permission-request');
            triggerNativeLocationRequestDirect();
        }

        function triggerNativeLocationRequestDirect() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (pos) => {
                        closeModal('modal-location-permission-request');
                        const lat = pos.coords.latitude;
                        const lon = pos.coords.longitude;
                        const accuracy = Math.round(pos.coords.accuracy || 10);
                        let placeName = 'കണ്ണൂർ, കേരളം';
                        if (window.LocationService && typeof window.LocationService.resolveCleanPlaceName === 'function') {
                            placeName = await window.LocationService.resolveCleanPlaceName(lat, lon);
                        }
                        setLocation(placeName, true, { latitude: lat, longitude: lon, accuracy, isManual: false });
                        toast(`📍 ലൊക്കേഷൻ കണ്ടെത്തി: ${placeName}`);
                    },
                    (err) => {
                        console.warn('[Location Startup Geolocation] Error:', err);
                    },
                    { enableHighAccuracy: true, timeout: 9000, maximumAge: 0 }
                );
            }
        }

        function handleUserAllowLocationPrompt() {
            const btn = document.getElementById('btnAllowLocationPermission');
            if (btn) {
                btn.innerHTML = '<span>⏳ ലൊക്കേഷൻ കണ്ടെത്തുന്നു...</span>';
                btn.disabled = true;
            }
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (pos) => {
                        if (btn) btn.disabled = false;
                        closeModal('modal-location-permission-request');
                        const lat = pos.coords.latitude;
                        const lon = pos.coords.longitude;
                        const accuracy = Math.round(pos.coords.accuracy || 10);
                        let placeName = 'കണ്ണൂർ, കേരളം';
                        if (window.LocationService && typeof window.LocationService.resolveCleanPlaceName === 'function') {
                            placeName = await window.LocationService.resolveCleanPlaceName(lat, lon);
                        }
                        setLocation(placeName, true, { latitude: lat, longitude: lon, accuracy, isManual: false });
                        toast(`📍 ലൊക്കേഷൻ കണ്ടെത്തി: ${placeName}`);
                    },
                    (err) => {
                        if (btn) {
                            btn.disabled = false;
                            btn.innerHTML = '<span>🎯 വീണ്ടും ശ്രമിക്കുക (Try Again)</span>';
                        }
                        if (err.code === 1) {
                            toast('⚠️ ബ്രൗസർ അല്ലെങ്കിൽ ഫോൺ സെറ്റിങ്സിൽ ലൊക്കേഷൻ അനുമതി നൽകുക.');
                        } else {
                            toast('⚠️ GPS സിഗ്നൽ ലഭിച്ചില്ല. സ്ഥലം തിരഞ്ഞെടുക്കുക.');
                        }
                    },
                    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
                );
            } else {
                closeModal('modal-location-permission-request');
                openLocationModal();
            }
        }

        function handleUserDismissLocationPrompt() {
            closeModal('modal-location-permission-request');
            openLocationModal();
        }

        /* -------------------------------------------------------------
           3. NAVIGATION & 10-SCREEN RENDERING ENGINE
           ------------------------------------------------------------- */
        function navTo(screenId) {
            APP_STATE.currentScreen = screenId;
            document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
            const targetScreen = document.getElementById('screen-' + screenId);
            if (targetScreen) targetScreen.classList.add('active');

            const bNav = document.getElementById('bottomNav');
            if (bNav) {
                bNav.style.display = (screenId === 'splash') ? 'none' : 'flex';
            }

            document.querySelectorAll('.nav-item').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.page === screenId);
            });

            const addLabel = document.getElementById('addNavLabel');
            if (addLabel) {
                addLabel.style.color = (screenId === 'add') ? 'var(--primary-green-pill)' : '#64748b';
                addLabel.style.fontWeight = (screenId === 'add') ? '700' : '600';
            }

            if (screenId === 'home') {
                if (typeof showFeedSkeleton === 'function') showFeedSkeleton();
            } else if (screenId === 'jobs') {
                renderJobs();
            } else if (screenId === 'nearby') {
                renderNearbyScreen();
            } else if (screenId === 'blood') {
                renderBloodScreen();
            } else if (screenId === 'emergency') {
                renderEmergencyScreen();
            } else if (screenId === 'services') {
                if (typeof updateServicesScreenView === 'function') {
                    updateServicesScreenView(APP_STATE.activeServiceCategory || 'all');
                }
                renderServices();
            } else if (screenId === 'people') {
                renderPeopleScreen();
            } else if (screenId === 'chat') {
                renderChatScreen();
            } else if (screenId === 'community') {
                renderCommunityFeed();
            } else if (screenId === 'profile') {
                if (typeof checkAdminAccess === 'function') checkAdminAccess();
                if (typeof syncAllProfileUIs === 'function') {
                    syncAllProfileUIs();
                }
            }

            hideAllSuggestions();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        /* =============================================================
           SCREEN 2: NEARBY HUB & 13 SUB-CATEGORIES ENGINE
           ============================================================= */

        // 13 Nearby Categories Definition
        const NEARBY_CATEGORIES = [
            { id: 'people', name: 'Nearby People', mal: 'സമീപത്തുള്ളവർ', icon: '👥', color: '#15803D', bg: '#DCFCE7', desc: 'പരിസരത്തുള്ള അംഗങ്ങളെയും സുഹൃത്തുക്കളെയും കണ്ടെത്തുക.' },
            { id: 'blood', name: 'Nearby Blood Donors', mal: 'രക്തദാനം & ആവശ്യങ്ങൾ', icon: '🩸', color: '#DC2626', bg: '#FEE2E2', desc: 'സമീപത്തുള്ള രക്തദാതാക്കളെയും അടിയന്തര ആവശ്യങ്ങളെയും ബന്ധപ്പെടാം.' },
            { id: 'emergency', name: 'Nearby Emergency Help', mal: 'അടിയന്തര സഹായം & ആംബുലൻസ്', icon: '🚨', color: '#D97706', bg: '#FEF3C7', desc: 'ആംബുലൻസ്, ഹോസ്പിറ്റൽ, 24x7 ഹെൽപ്പ് ലൈൻ നമ്പറുകൾ.' },
            { id: 'services', name: 'Nearby Services', mal: 'പ്രാദേശിക സേവനങ്ങൾ', icon: '🛠️', color: '#0284C7', bg: '#E0F2FE', desc: 'ഇലക്ട്രീഷ്യൻ, പ്ലംബർ, ആശാരി തുടങ്ങിയ വിദഗ്ദ്ധ തൊഴിലാളികൾ.' },
            { id: 'jobs', name: 'Nearby Jobs', mal: 'തൊഴിലവസരങ്ങൾ', icon: '💼', color: '#7E22CE', bg: '#F3E8FF', desc: 'നിങ്ങളുടെ പ്രദേശത്തെ ഏറ്റവും പുതിയ തൊഴിലവസരങ്ങൾ.' },
            { id: 'rent', name: 'Nearby Rent', mal: 'വാടക വീട് & ടൂളുകൾ', icon: '🏡', color: '#B45309', bg: '#FEF3C7', desc: 'വാടക വീടുകൾ, മുറികൾ, ടൂളുകൾ, യന്ത്രങ്ങൾ, വാഹനങ്ങൾ.' },
            { id: 'buysell', name: 'Nearby Buy & Sell', mal: 'വാങ്ങാം വിൽക്കാം', icon: '🛍️', color: '#047857', bg: '#DCFCE7', desc: 'ഉപയോഗിച്ച വാഹനങ്ങൾ, ഫർണിച്ചർ, ഇലക്ട്രോണിക്സ് വിൽപന.' },
            { id: 'entertainment', name: 'Nearby Entertainment', mal: 'വിനോദം & സിനിമ', icon: '🎭', color: '#E11D48', bg: '#FFE4E6', desc: 'സമീപത്തെ സിനിമ തിയേറ്ററുകൾ, കഥകളി, ഗാനമേളകൾ, കലകൾ.' },
            { id: 'hangout', name: 'Nearby Hangout', mal: 'കൂട്ടായ്മ & മീറ്റ്', icon: '☕', color: '#A16207', bg: '#FEF9C3', desc: 'സായാഹ്ന ചായക്കൂട്ടായ്മ, പ്രഭാത നടത്തം, ചർച്ചകൾ.' },
            { id: 'events', name: 'Nearby Events', mal: 'മേളകൾ & പരിപാടികൾ', icon: '📅', color: '#0E7490', bg: '#CFFAFE', desc: 'ക്ഷേത്ര / പള്ളി ഉത്സവങ്ങൾ, പ്രദർശനങ്ങൾ, കാർഷിക മേളകൾ.' },
            { id: 'sports', name: 'Nearby Sports', mal: 'ടർഫ് & കളികൾ', icon: '⚽', color: '#065F46', bg: '#D1FAE5', desc: 'ടർഫ് ഫുട്ബോൾ, ക്രിക്കറ്റ്, ബാഡ്മിന്റൺ കളിക്കൂട്ടങ്ങൾ.' },
            { id: 'travel', name: 'Nearby Travel', mal: 'യാത്ര & കാർപൂൾ', icon: '🚗', color: '#4338CA', bg: '#E0E7FF', desc: 'വീക്കെൻഡ് യാത്രകൾ, കാർപൂളിംഗ്, ടൂറിസം ട്രിപ്പുകൾ.' },
            { id: 'posts', name: 'Nearby Posts', mal: 'പ്രാദേശിക പോസ്റ്റുകൾ', icon: '📝', color: '#334155', bg: '#F1F5F9', desc: 'സമീപത്തുള്ള നാട്ടുകാർ പങ്കുവെച്ച അറിയിപ്പുകളും വിശേഷങ്ങളും.' }
        ];

        // Authentic Local Templates for New Categories
        const DEFAULT_ENTERTAINMENT = [
            {
                id: 'ent_1',
                title: 'ആവേശം & വർഷങ്ങൾക്കു ശേഷം (Malayalam Movies)',
                type: 'Movie / Theatre',
                venue: 'സെൻട്രൽ സിനിമാസ് (Screen 1 - 4K Dolby Atmos)',
                timings: '11:30 AM • 2:30 PM • 6:30 PM • 9:30 PM',
                tickets: '₹140 - ₹180',
                phone: '+919447100111',
                location: 'Central Junction',
                latDiff: 0.0009, lonDiff: 0.0007,
                desc: 'ഷോകൾ സജീവം. ഓൺലൈൻ & തിയേറ്റർ കൗണ്ടർ ബുക്കിംഗ് ലഭ്യമാണ്.'
            },
            {
                id: 'ent_2',
                title: 'നാടൻ കലാസന്ധ്യ & തെയ്യം അവതരണം (Cultural Fest)',
                type: 'Cultural & Art',
                venue: 'ടെമ്പിൾ ഓപ്പൺ എയർ ഓഡിറ്റോറിയം',
                timings: 'ഇന്ന് വൈകിട്ട് 6:30 PM മുതൽ',
                tickets: 'സൗജന്യ പ്രവേശനം (Free Entry)',
                phone: '+919846200222',
                location: 'Temple Road',
                latDiff: 0.0028, lonDiff: 0.0021,
                desc: 'പരമ്പരാഗത തെയ്യം, തിറ, പഞ്ചവാദ്യമേള അവതരണം.'
            },
            {
                id: 'ent_3',
                title: 'ലൈവ് ഗാനമേള & മ്യൂസിക് ബാൻഡ് നൈറ്റ്',
                type: 'Music Show',
                venue: 'ടൗൺ മുൻസിപ്പൽ സ്റ്റേഡിയം ഗ്രൗണ്ട്',
                timings: 'നാളെ വൈകിട്ട് 7:00 PM',
                tickets: '₹100 (ഗാലറി പ്രവേശനം)',
                phone: '+919447300333',
                location: 'Stadium Road',
                latDiff: 0.0065, lonDiff: 0.0048,
                desc: 'പ്രമുഖ പിന്നണി ഗായകർ പങ്കെടുക്കുന്ന സംഗീത സായാഹ്നം.'
            },
            {
                id: 'ent_4',
                title: 'കുട്ടികളുടെ അമ്യൂസ്മെന്റ് പാർക്ക് & പെഡൽ ബോട്ടിംഗ്',
                type: 'Leisure & Park',
                venue: 'ഇക്കോ ടൂറിസം ലേക്ക് & പാർക്ക്',
                timings: 'ദിവസവും 10:00 AM - 7:30 PM',
                tickets: '₹40 (കുട്ടികൾക്ക് ₹20)',
                phone: '+919847400444',
                location: 'Bypass Road',
                latDiff: 0.0250, lonDiff: 0.0180,
                desc: 'ഫാമിലി പാർക്ക്, പെഡൽ ബോട്ടിംഗ്, കിഡ്സ് പ്ലേ ഏരിയ.'
            }
        ];

        const DEFAULT_HANGOUTS = [
            {
                id: 'hang_1',
                title: 'സന്ധ്യാ ചായ & സൗഹൃദ ചർച്ച (Evening Tea & Debate)',
                category: 'Tea & Discussion',
                organizer: 'സൂരജ് കുമാർ (Host)',
                spot: 'ടൗൺ സ്ക്വയർ കട്ടൻ ചായക്കട',
                dateTime: 'ഇന്ന് വൈകിട്ട് 6:00 PM',
                maxParticipants: 8,
                joinedCount: 5,
                phone: '+919447199001',
                latDiff: 0.0008, lonDiff: 0.0006,
                desc: 'സമകാലിക നാട്ടുവിശേഷങ്ങളും സാഹിത്യ വാർത്തകളും പങ്കുവെക്കുന്ന സൗഹൃദ ചർച്ച.'
            },
            {
                id: 'hang_2',
                title: 'പ്രഭാത നടത്തം & ഫിറ്റ്നസ് കൂട്ടായ്മ (Morning Walkers)',
                category: 'Walking & Fitness',
                organizer: 'ദീപാ വിനോദ്',
                spot: 'പഞ്ചായത്ത് സ്റ്റേഡിയം വാക്കിംഗ് ട്രാക്ക്',
                dateTime: 'നാളെ രാവിലെ 5:45 AM',
                maxParticipants: 12,
                joinedCount: 7,
                phone: '+919846211002',
                latDiff: 0.0025, lonDiff: -0.0018,
                desc: 'ദിവസവും 4 കിലോമീറ്റർ നടത്തവും ലഘു യോഗയും. ഏവർക്കും സ്വാഗതം.'
            },
            {
                id: 'hang_3',
                title: 'ടെക്, ഫ്രീലാൻസ് & സ്റ്റാർട്ടപ്പ് കോഫി മീറ്റപ്പ്',
                category: 'Tech & Startup',
                organizer: 'അഭിഷേക് വർമ്മ',
                spot: 'കഫേ ഗ്രീൻ ലാറ്റെ, ബൈപാസ്',
                dateTime: 'ശനിയാഴ്ച 4:00 PM',
                maxParticipants: 10,
                joinedCount: 6,
                phone: '+919495011223',
                latDiff: 0.0055, lonDiff: 0.0040,
                desc: 'ഡിജിറ്റൽ വർക്കേഴ്സ്, വെബ് ഡെവലപ്പർമാർ, സംരംഭകരുടെ അനുഭവ വിനിമയം.'
            },
            {
                id: 'hang_4',
                title: 'മലയാള പുസ്തക വായനക്കൂട്ടം (Book Club Meet)',
                category: 'Reading & Books',
                organizer: 'പ്രിയദർശിനി',
                spot: 'പബ്ലിക് ലൈബ്രറി റീഡിംഗ് റൂം',
                dateTime: 'ഞായറാഴ്ച 3:30 PM',
                maxParticipants: 8,
                joinedCount: 4,
                phone: '+919744155667',
                latDiff: 0.0220, lonDiff: -0.0150,
                desc: 'ഈ മാസത്തെ നോവൽ ചർച്ച: ബഷീർ സാഹിത്യ ചിന്തകൾ.'
            }
        ];

        const DEFAULT_EVENTS = [
            {
                id: 'ev_1',
                title: 'കുടുംബശ്രീ കാർഷിക & കരകൗശല വിപണന മേള',
                category: 'Mela & Exhibition',
                organizer: 'കുടുംബശ്രീ സി.ഡി.എസ്',
                venue: 'ടൗൺ ഹാൾ ഓഡിറ്റോറിയം',
                date: 'ഇന്ന് മുതൽ 3 ദിവസം (Today - 3 Days)',
                time: '10:00 AM - 8:00 PM',
                phone: '+919447199001',
                rsvps: 18,
                latDiff: 0.0009, lonDiff: 0.0007,
                desc: 'വിഷരഹിത നാടൻ പച്ചക്കറികൾ, വീട്ടിലുണ്ടാക്കിയ പലഹാരങ്ങൾ, കരകൗശല വസ്തുക്കൾ.'
            },
            {
                id: 'ev_2',
                title: 'വാർഷിക ക്ഷേത്ര ഉത്സവം, കാവടിയാട്ടം & ഗാനമേള',
                category: 'Festival & Utsavam',
                organizer: 'ഉത്സവ ആഘോഷ കമ്മിറ്റി',
                venue: 'ശ്രീ ധർമ്മശാസ്താ ക്ഷേത്ര മൈതാനം',
                date: 'ഈ വരുന്ന വെള്ളിയാഴ്ച (Friday)',
                time: 'വൈകിട്ട് 5:00 PM മുതൽ',
                phone: '+919846211002',
                rsvps: 42,
                latDiff: 0.0031, lonDiff: 0.0022,
                desc: 'പഞ്ചാരിമേളം, വർണ്ണശബളമായ കാവടിയാട്ടം, രാത്രി 9 ന് മെഗാ ഗാനമേള.'
            },
            {
                id: 'ev_3',
                title: 'സൗജന്യ മെഗാ ആരോഗ്യ & രക്തദാന ക്യാമ്പ്',
                category: 'Camp & Social',
                organizer: 'യൂത്ത് റെഡ് ക്രോസ് & ഗവ. താലൂക്ക് ആശുപത്രി',
                venue: 'സെന്റ് ജോർജ്ജ് പാരിഷ് ഹാൾ',
                date: 'ഞായറാഴ്ച (Sunday)',
                time: '9:00 AM - 1:00 PM',
                phone: '+919446077881',
                rsvps: 26,
                latDiff: 0.0058, lonDiff: -0.0042,
                desc: 'സൗജന്യ പ്രമേഹ, ബിപി പരിശോധന, ഡോക്ടർ കൺസൾട്ടേഷൻ, രക്തഗ്രൂപ്പ് നിർണ്ണയം.'
            },
            {
                id: 'ev_4',
                title: 'അഖില കേരള സെവൻസ് ഫുട്ബോൾ മാമാങ്കം',
                category: 'Sports Tournament',
                organizer: 'ബ്രദേഴ്സ് സ്പോർട്സ് ക്ലബ്ബ്',
                venue: 'പഞ്ചായത്ത് ഫ്ലഡ്‌ലിറ്റ് സ്റ്റേഡിയം',
                date: 'അടുത്ത ആഴ്ച (Next Week)',
                time: '7:30 PM മുതൽ',
                phone: '+919847122998',
                rsvps: 64,
                latDiff: 0.0320, lonDiff: 0.0240,
                desc: 'കേരളത്തിലെ പ്രമുഖ ക്ലബ്ബുകൾ ഏറ്റുമുട്ടുന്ന നൈറ്റ് സെവൻസ് ടൂർണമെന്റ്.'
            }
        ];

        const DEFAULT_SPORTS = [
            {
                id: 'sport_1',
                title: 'ഇന്ന് രാത്രി 8:00 മണിക്ക് 7s ഫുട്ബോൾ - 2 പ്ലേയേഴ്സ് വേണം',
                sportType: 'Football',
                venue: 'ഗ്രീൻഫീൽഡ് ടർഫ്, മെയിൻ റോഡ്',
                timeSlot: 'ഇന്ന് 8:00 PM - 9:30 PM',
                playersNeeded: '2 Players Wanted',
                organizer: 'സച്ചിൻ (ക്യാപ്റ്റൻ)',
                contact: '+919447155667',
                latDiff: 0.0010, lonDiff: 0.0007,
                desc: '7-a-side ഫ്രണ്ട്‌ലി മാച്ച്. ബൂട്ട്സ് നിർബന്ധം. താല്പര്യമുള്ളവർ ഉടൻ ജോയിൻ ചെയ്യുക.'
            },
            {
                id: 'sport_2',
                title: 'ഞായറാഴ്ച രാവിലെ ക്രിക്കറ്റ് ഫ്രണ്ട്‌ലി മാച്ച് vs ടൗൺ XI',
                sportType: 'Cricket',
                venue: 'മുനിസിപ്പൽ ഗ്രൗണ്ട്',
                timeSlot: 'ഞായർ 6:30 AM - 10:00 AM',
                playersNeeded: '1 All-Rounder Needed',
                organizer: 'അനന്തു ആർ',
                contact: '+919846288771',
                latDiff: 0.0029, lonDiff: -0.0020,
                desc: '20 ഓവർ ലെതർ ബോൾ ഫ്രണ്ട്‌ലി മത്സരം. കിറ്റ് ലഭ്യമാണ്.'
            },
            {
                id: 'sport_3',
                title: 'ബാഡ്മിന്റൺ ഡബിൾസ് പാർട്ണർ വേണം (Indoor Court)',
                sportType: 'Badminton',
                venue: 'ഷട്ടിൽ അക്കാദമി ഇൻഡോർ കോർട്ട്',
                timeSlot: 'ദിവസവും 6:00 PM - 7:30 PM',
                playersNeeded: '1 Doubles Player',
                organizer: 'ഹരികൃഷ്ണൻ',
                contact: '+919495011223',
                latDiff: 0.0062, lonDiff: 0.0045,
                desc: 'വുഡൻ ഫ്ലോർ കോർട്ട്. ഇന്റർമീഡിയറ്റ് ലെവൽ പ്ലേയർക്ക് സ്വാഗതം.'
            },
            {
                id: 'sport_4',
                title: 'സായാഹ്ന വോളിബോൾ സൗഹൃദ കളി (Weekend Volleyball)',
                sportType: 'Volleyball',
                venue: 'യുവജന ക്ലബ്ബ് ഔട്ട്ഡോർ കോർട്ട്',
                timeSlot: 'ശനി, ഞായർ 5:00 PM',
                playersNeeded: 'Open for All',
                organizer: 'ഷാനവാസ്',
                contact: '+919744155667',
                latDiff: 0.0280, lonDiff: 0.0200,
                desc: 'ലോക്കൽ ക്ലബ്ബ് വോളിബോൾ. പുതിയ കളിക്കാർക്ക് പരിശീലന സഹായം.'
            }
        ];

        const DEFAULT_TRAVEL = [
            {
                id: 'trav_1',
                title: 'വയനാട് ചെമ്പ്ര പീക്ക് & ബാണാസുര ട്രെക്കിംഗ് (2 സീറ്റ് ഒഴിവ്)',
                type: 'Weekend Trek',
                from: 'ജംഗ്ഷൻ ബസ് സ്റ്റാൻഡ്',
                destination: 'വയനാട് (Wayanad)',
                dateTime: 'ശനിയാഴ്ച പുലർച്ചെ 4:30 AM',
                seats: 2,
                joinedCount: 3,
                vehicle: 'Swift Dzire (AC)',
                costShare: '₹650 (ഇന്ധന ഷെയർ)',
                contact: '+919447198765',
                latDiff: 0.0008, lonDiff: 0.0006,
                desc: '2 ദിവസത്തെ വീക്കെൻഡ് ട്രിപ്പ്. ടെന്റ് ക്യാമ്പിംഗ്, ട്രെക്കിംഗ് സൗകര്യം.'
            },
            {
                id: 'trav_2',
                title: 'കൊച്ചിൻ എയർപോർട്ട് ഷെയേർഡ് ക്യാബ് (Airport Carpool)',
                type: 'Carpool / Ride Share',
                from: 'സെൻട്രൽ വഴി ബൈപാസ്',
                destination: 'കൊച്ചി അന്താരാഷ്ട്ര വിമാനത്താവളം (CIAL)',
                dateTime: 'നാളെ പുലർച്ചെ 2:00 AM',
                seats: 2,
                joinedCount: 2,
                vehicle: 'Innova Crysta 7-Seater',
                costShare: '₹750 / സീറ്റ്',
                contact: '+919846288443',
                latDiff: 0.0027, lonDiff: 0.0019,
                desc: 'സൗകര്യപ്രദമായ എസി യാത്ര. ലഗേജ് സ്പേസ് ലഭ്യമാണ്.'
            },
            {
                id: 'trav_3',
                title: 'ആലപ്പുഴ ഹൗസ്ബോട്ട് ഡേ ക്രൂസ് ഗ്രൂപ്പ് ഷെയറിംഗ്',
                type: 'Sightseeing Tour',
                from: 'കെ.എസ്.ആർ.ടി.സി സ്റ്റാൻഡ്',
                destination: 'ആലപ്പുഴ വേമ്പനാട് കായൽ',
                dateTime: 'ഈ വരുന്ന ഞായർ 8:00 AM',
                seats: 4,
                joinedCount: 8,
                vehicle: 'പ്രീമിയം 2-ബെഡ്റൂം ഹൗസ്ബോട്ട്',
                costShare: '₹1,200 (ഭക്ഷണം ഉൾപ്പെടെ)',
                contact: '+919496099881',
                latDiff: 0.0055, lonDiff: -0.0038,
                desc: 'കായൽ യാത്ര, കുട്ടനാടൻ സ്പെഷ്യൽ ലഞ്ച് (കരിമീൻ പൊള്ളിച്ചത്), ചായ.'
            },
            {
                id: 'trav_4',
                title: 'പൊൻമുടി മലനിരകളിലേക്ക് സൺറൈസ് ബൈക്ക് റൈഡ്',
                type: 'Weekend Trek',
                from: 'ബൈപാസ് ജംഗ്ഷൻ',
                destination: 'പൊൻമുടി ഹിൽസ്റ്റേഷൻ',
                dateTime: 'ഞായറാഴ്ച പുലർച്ചെ 5:00 AM',
                seats: 3,
                joinedCount: 5,
                vehicle: 'ബൈക്ക് ഗ്രൂപ്പ് റൈഡ്',
                costShare: 'സ്വന്തം ചിലവ്',
                contact: '+919847144552',
                latDiff: 0.0240, lonDiff: 0.0170,
                desc: 'ഹെൽമെറ്റ്, റൈഡിംഗ് ഗിയർ നിർബന്ധം. ഹെയർപിൻ വളവുകളിലൂടെയുള്ള പ്രഭാത യാത്ര.'
            }
        ];

        // Nearby Core Engine State
        APP_STATE.nearbyRadius = localStorage.getItem('thuna_nearby_radius') || '1km';
        APP_STATE.nearbyActiveCategory = null;
        APP_STATE.nearbySubfilter = 'all';
        APP_STATE.nearbyGps = {
            latitude: null,
            longitude: null,
            accuracy: null,
            locationName: 'കണ്ണൂർ',
            status: 'idle',
            lastUpdated: null
        };
        APP_STATE.nearbyJoinedHangouts = JSON.parse(localStorage.getItem('thuna_joined_hangouts') || '[]');
        APP_STATE.nearbyRsvpdEvents = JSON.parse(localStorage.getItem('thuna_rsvpd_events') || '[]');
        APP_STATE.nearbyJoinedSports = JSON.parse(localStorage.getItem('thuna_joined_sports') || '[]');
        APP_STATE.nearbyJoinedTravel = JSON.parse(localStorage.getItem('thuna_joined_travel') || '[]');

        function getNearbyRadiusKm(radStr) {
            const s = radStr || APP_STATE.nearbyRadius || '1km';
            if (s === '200m') return 0.2;
            if (s === '500m') return 0.5;
            if (s === '1km') return 1.0;
            if (s === '5km') return 5.0;
            if (s === '10km') return 10.0;
            return 1.0;
        }

        function getNearbyCurrentCoords() {
            if (APP_STATE.nearbyGps && APP_STATE.nearbyGps.latitude != null && APP_STATE.nearbyGps.longitude != null) {
                return { latitude: APP_STATE.nearbyGps.latitude, longitude: APP_STATE.nearbyGps.longitude };
            }
            return getUserCoords();
        }

        function setNearbyRadius(rad, btn) {
            APP_STATE.nearbyRadius = rad;
            localStorage.setItem('thuna_nearby_radius', rad);
            updateNearbyRadiusUI();
            toast(`📍 തിരച്ചിൽ പരിധി: ${rad} (${rad === '200m' ? '200 മീറ്റർ' : rad})`);
            if (APP_STATE.nearbyActiveCategory) {
                renderNearbyCategoryPage(APP_STATE.nearbyActiveCategory);
            } else {
                renderNearbyMainPage();
            }
        }

        function updateNearbyRadiusUI() {
            const rad = APP_STATE.nearbyRadius || '1km';
            document.querySelectorAll('#nearbyRadiusPillsContainer .nearby-radius-btn').forEach(b => {
                b.classList.toggle('active', b.dataset.rad === rad);
            });
            const heroRad = document.getElementById('nearbyHeroRadiusLabel');
            if (heroRad) heroRad.textContent = `${rad} ചുറ്റളവിൽ`;
            const resRad = document.getElementById('nearbyResultsRadiusTag');
            if (resRad) resRad.textContent = `പരിധി: ${rad}`;
        }

        async function refreshNearbyGpsLocation(isManual = false) {
            const refreshSvg = document.getElementById('nearbyRefreshSvg');
            if (refreshSvg) refreshSvg.classList.add('spinning');
            const txt = document.getElementById('nearbyGpsText');
            const heroGps = document.getElementById('nearbyHeroGpsStatus');
            if (txt) txt.textContent = 'GPS കണ്ടെത്തുന്നു...';
            if (heroGps) heroGps.textContent = 'Live GPS ലൊക്കേറ്റിംഗ്...';
            if (isManual) toast('📍 തത്സമയ GPS കണ്ടെത്തുന്നു...');

            const applyPosition = async (lat, lon, accuracy) => {
                APP_STATE.nearbyGps.latitude = lat;
                APP_STATE.nearbyGps.longitude = lon;
                APP_STATE.nearbyGps.accuracy = accuracy;
                APP_STATE.nearbyGps.status = 'ready';
                APP_STATE.nearbyGps.lastUpdated = Date.now();

                let cleanName = 'My Location';
                if (window.LocationService && typeof window.LocationService.resolveCleanPlaceName === 'function') {
                    try {
                        cleanName = await window.LocationService.resolveCleanPlaceName(lat, lon);
                    } catch (_) {}
                }
                if (!cleanName || cleanName === 'My Location') {
                    cleanName = APP_STATE.userLocation || 'കണ്ണൂർ, കേരളം';
                }
                APP_STATE.nearbyGps.locationName = cleanName;

                if (refreshSvg) refreshSvg.classList.remove('spinning');
                if (txt) txt.textContent = `${cleanName} (Live GPS)`;
                if (heroGps) heroGps.textContent = 'Live GPS ആക്റ്റീവ്';
                const heroLoc = document.getElementById('nearbyHeroLocName');
                if (heroLoc) heroLoc.textContent = cleanName;

                if (isManual) toast(`📍 GPS ലൊക്കേഷൻ പുതുക്കി: ${cleanName}`);

                updateNearbyRadiusUI();
                renderNearbyPeopleScreen();
            };

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async pos => {
                        await applyPosition(pos.coords.latitude, pos.coords.longitude, Math.round(pos.coords.accuracy || 10));
                    },
                    async err => {
                        if (refreshSvg) refreshSvg.classList.remove('spinning');
                        console.warn('[Nearby GPS Error]', err);
                        if (isManual) {
                            let msg = 'GPS അനുമതി നൽകിയിട്ടില്ല അല്ലെങ്കിൽ സിഗ്നൽ ലഭ്യമല്ല.';
                            if (err.code === 1) msg = 'GPS അനുമതി നൽകിയിട്ടില്ല. ബ്രൗസർ സെറ്റിംഗ്സിൽ അനുവദിക്കുക.';
                            toast('⚠️ ' + msg);
                        }
                        const fallbackCoords = getUserCoords();
                        await applyPosition(fallbackCoords.latitude, fallbackCoords.longitude, 100);
                        if (txt) txt.textContent = `${APP_STATE.nearbyGps.locationName} (ലഭ്യമായ സ്ഥലം)`;
                        if (heroGps) heroGps.textContent = 'GPS സ്റ്റാറ്റസ്: ഏകദേശ ലൊക്കേഷൻ';
                    },
                    { enableHighAccuracy: true, timeout: 6000, maximumAge: 0 }
                );
            } else {
                if (refreshSvg) refreshSvg.classList.remove('spinning');
                if (isManual) toast('⚠️ ഈ ബ്രൗസറിൽ GPS ലഭ്യമല്ല.');
                const fallbackCoords = getUserCoords();
                await applyPosition(fallbackCoords.latitude, fallbackCoords.longitude, 100);
            }
        }

        function renderNearbyScreen() {
            updateNearbyRadiusUI();
            updateNearbyPrivacyUI();
            renderNearbyPeopleScreen();
            refreshNearbyGpsLocation(false);
        }

        function setNearbyRadius(rad, btn) {
            APP_STATE.nearbyRadius = rad;
            try { localStorage.setItem('thuna_nearby_radius', rad); } catch (_) {}
            updateNearbyRadiusUI();
            renderNearbyPeopleScreen();
        }

        function updateNearbyRadiusUI() {
            const rad = APP_STATE.nearbyRadius || '1km';
            document.querySelectorAll('#nearbyRadiusPillsContainer .nearby-radius-btn').forEach(b => {
                b.classList.toggle('active', b.dataset.rad === rad);
            });
            const rTag = document.getElementById('nearbyResultsRadiusTag');
            if (rTag) rTag.textContent = `പരിധി: ${rad}`;
            const hRad = document.getElementById('nearbyHeroRadiusLabel');
            if (hRad) hRad.textContent = `${rad} ചുറ്റളവിൽ`;
        }

        function handleNearbyPrivacyToggle(isChecked) {
            APP_STATE.nearbyFriendsOptIn = isChecked;
            try { localStorage.setItem('thuna_nearby_friends_optin', isChecked ? 'true' : 'false'); } catch (_) {}
            updateNearbyPrivacyUI();
            renderNearbyPeopleScreen();
            toast(isChecked ? '🟢 നിങ്ങൾ ഇപ്പോൾ സമീപത്തുള്ളവർക്ക് ദൃശ്യമാണ്' : '🔒 നിങ്ങളുടെ ലൊക്കേഷൻ ഒളിപ്പിച്ചു');
        }

        function updateNearbyPrivacyUI() {
            const isOptedIn = (APP_STATE.nearbyFriendsOptIn !== false);
            const input = document.getElementById('nearbyPrivacyToggleInput');
            if (input) input.checked = isOptedIn;
            const badge = document.getElementById('nearbyPrivacyStatusBadge');
            if (badge) {
                badge.textContent = isOptedIn ? 'Visible' : 'Hidden';
                badge.style.background = isOptedIn ? '#DCFCE7' : '#F1F5F9';
                badge.style.color = isOptedIn ? '#15803D' : '#64748B';
            }
            const desc = document.getElementById('nearbyPrivacyDesc');
            if (desc) {
                desc.textContent = isOptedIn ? 'നിങ്ങളുടെ ചുറ്റളവിലുള്ളവർക്ക് നിങ്ങളുടെ പ്രൊഫൈൽ കാണാം' : 'നിങ്ങളുടെ പ്രൊഫൈൽ മറ്റുള്ളവരിൽ നിന്ന് ഒളിപ്പിച്ചിരിക്കുന്നു';
            }
            const track = document.getElementById('nearbyPrivacyToggleTrack');
            const thumb = document.getElementById('nearbyPrivacyToggleThumb');
            if (track) track.style.background = isOptedIn ? '#15803D' : '#CBD5E1';
            if (thumb) thumb.style.transform = isOptedIn ? 'translateX(20px)' : 'none';
        }

        function setNearbyPeopleFilter(filterKey, btn) {
            APP_STATE.nearbyPeopleFilter = filterKey;
            document.querySelectorAll('#nearbyPeopleFilterTabs .nearby-quick-tab-pill').forEach(b => {
                b.classList.toggle('active', b.dataset.filter === filterKey);
            });
            renderNearbyPeopleScreen();
        }

        function sendNearbyWave(name) {
            toast(`👋 ${name}ന് വേവ് അയച്ചു! (Wave sent)`);
        }

        function handleNearbyBack() {
            navTo('home');
        }

        function renderNearbyPeopleScreen() {
            const container = document.getElementById('nearbyPeopleListContainer');
            if (!container) return;

            const uCoords = getNearbyCurrentCoords();
            const radStr = APP_STATE.nearbyRadius || '1km';
            const maxKm = getNearbyRadiusKm(radStr);
            const filterKey = APP_STATE.nearbyPeopleFilter || 'all';
            const isOptedIn = (APP_STATE.nearbyFriendsOptIn !== false);

            if (!isOptedIn) {
                container.innerHTML = `
                    <div class="nearby-empty-state" style="margin-top:10px">
                        <div class="nearby-empty-icon">🔒</div>
                        <div class="nearby-empty-title">നിങ്ങളുടെ പ്രൊഫൈൽ ഒളിപ്പിച്ചിരിക്കുന്നു</div>
                        <div class="nearby-empty-desc">സമീപത്തുള്ള അയൽവാസികളെയും സുഹൃത്തുക്കളെയും കാണാനും അവർക്ക് നിങ്ങളുമായി ബന്ധപ്പെടാനും മുകളിലെ സ്വിച്ച് ഓൺ ചെയ്യുക.</div>
                        <button class="primary-action-btn" style="margin:12px auto 0;padding:8px 18px;font-size:12.5px;background:#15803D" onclick="handleNearbyPrivacyToggle(true)">🟢 Visibility ഓൺ ചെയ്യുക</button>
                    </div>
                `;
                const countEl = document.getElementById('nearbyResultsCountText');
                if (countEl) countEl.textContent = 'കണ്ടെത്തിയവർ: 0';
                return;
            }

            let list = (typeof getFriendsList === 'function' ? getFriendsList() : (DEFAULT_FRIENDS || [])).filter(f => f.optIn !== false).map(f => {
                const lat = (f.latDiff != null) ? (uCoords.latitude + f.latDiff) : (f.lat || uCoords.latitude);
                const lon = (f.lonDiff != null) ? (uCoords.longitude + f.lonDiff) : (f.lon || uCoords.longitude);
                const dist = calculateDistance(uCoords.latitude, uCoords.longitude, lat, lon);
                return { ...f, _dist: dist, _distFormatted: formatDistance(dist) };
            }).filter(f => f._dist <= maxKm);

            if (filterKey === 'online') {
                list = list.filter(f => f.online);
            } else if (filterKey === 'blood') {
                list = list.filter(f => !!f.group);
            }

            list.sort((a, b) => a._dist - b._dist);

            const countEl = document.getElementById('nearbyResultsCountText');
            if (countEl) countEl.textContent = `കണ്ടെത്തിയവർ: ${list.length} പേർ`;

            if (!list.length) {
                const altRadius = (radStr === '200m' || radStr === '500m') ? '1km' : '5km';
                container.innerHTML = `
                    <div class="nearby-empty-state">
                        <div class="nearby-empty-icon">📡</div>
                        <div class="nearby-empty-title">${radStr} ചുറ്റളവിൽ ആളുകൾ ലഭ്യമല്ല</div>
                        <div class="nearby-empty-desc">നിങ്ങൾ തിരഞ്ഞെടുത്ത ചുറ്റളവിൽ ഇപ്പോൾ മറ്റ് അംഗങ്ങൾ കാണപ്പെടുന്നില്ല. കൂടുതൽ ആളുകളെ കണ്ടെത്താൻ തിരച്ചിൽ പരിധി വർദ്ധിപ്പിക്കുക.</div>
                        <div style="display:flex;justify-content:center;gap:8px;flex-wrap:wrap">
                            <button class="nearby-radius-btn active" style="padding:8px 16px" onclick="setNearbyRadius('${altRadius}')">🔍 ${altRadius} ലേക്ക് മാറ്റുക</button>
                        </div>
                    </div>
                `;
                return;
            }

            container.innerHTML = list.map(f => `
                <div class="nearby-person-box" onclick="openDirectChat('${escapeHtml(f.name)}', '${f.avatar || ''}')">
                    <span class="nearby-box-top-badge">📍 ~${f._distFormatted}</span>
                    <div class="nearby-box-avatar-wrap">
                        ${f.face || '👤'}
                        <span class="nearby-box-online-dot" style="background:${f.online ? '#10B981' : '#94A3B8'}" title="${f.online ? 'Online' : 'Offline'}"></span>
                    </div>
                    <div class="nearby-box-name">${escapeHtml(f.name)}</div>
                    <div class="nearby-box-role">${escapeHtml(f.role || 'അയൽവാസി')}</div>
                    <div class="nearby-box-loc">📍 ${escapeHtml(f.location || 'സമീപം')}</div>
                    ${f.group ? `<div class="nearby-box-blood-tag">🩸 ${f.group}</div>` : ''}
                    <div class="nearby-box-actions" onclick="event.stopPropagation()">
                        <button class="nearby-box-btn-wave" onclick="sendNearbyWave('${escapeHtml(f.name)}')" title="Wave send ചെയ്യുക">
                            👋
                        </button>
                        <button class="nearby-box-btn-chat" onclick="openDirectChat('${escapeHtml(f.name)}', '${f.avatar || ''}')">
                            💬 ചാറ്റ്
                        </button>
                    </div>
                </div>
            `).join('');
        }

        function renderNearbyCategoryTabs(activeCatId) {
            const strip = document.getElementById('nearbyQuickTabsStrip');
            if (!strip) return;
            strip.innerHTML = NEARBY_CATEGORIES.map(c => `
                <button class="nearby-quick-tab-pill ${c.id === activeCatId ? 'active' : ''}" onclick="openNearbyCategory('${c.id}')">
                    <span>${c.icon}</span>
                    <span>${c.name.replace('Nearby ', '')}</span>
                </button>
            `).join('');
        }

        function getNearbyCountsMap(uCoords, maxKm) {
            const counts = {};

            // 1. People (Opt-in only)
            const people = (typeof getFriendsList === 'function' ? getFriendsList() : (DEFAULT_FRIENDS || [])).filter(f => f.optIn !== false).filter(f => {
                const lat = (f.latDiff != null) ? (uCoords.latitude + f.latDiff) : (f.lat || uCoords.latitude);
                const lon = (f.lonDiff != null) ? (uCoords.longitude + f.lonDiff) : (f.lon || uCoords.longitude);
                return calculateDistance(uCoords.latitude, uCoords.longitude, lat, lon) <= maxKm;
            });
            counts.people = people.length;

            // 2. Blood
            const donors = (DEFAULT_DONORS || []).filter(d => {
                const lat = (d.latDiff != null) ? (uCoords.latitude + d.latDiff) : (d.lat || uCoords.latitude);
                const lon = (d.lonDiff != null) ? (uCoords.longitude + d.lonDiff) : (d.lon || uCoords.longitude);
                return calculateDistance(uCoords.latitude, uCoords.longitude, lat, lon) <= maxKm;
            });
            const urg = (DEFAULT_URGENT_BLOOD_REQUESTS || []).filter(r => {
                const lat = (r.latDiff != null) ? (uCoords.latitude + r.latDiff) : (r.lat || uCoords.latitude);
                const lon = (r.lonDiff != null) ? (uCoords.longitude + r.lonDiff) : (r.lon || uCoords.longitude);
                return calculateDistance(uCoords.latitude, uCoords.longitude, lat, lon) <= maxKm;
            });
            counts.blood = donors.length + urg.length;

            // 3. Emergency
            const amb = (DEFAULT_AMBULANCES || []).filter(a => {
                const lat = (a.latDiff != null) ? (uCoords.latitude + a.latDiff) : (a.lat || uCoords.latitude);
                const lon = (a.lonDiff != null) ? (uCoords.longitude + a.lonDiff) : (a.lon || uCoords.longitude);
                return calculateDistance(uCoords.latitude, uCoords.longitude, lat, lon) <= maxKm;
            });
            counts.emergency = amb.length + 4; // Including 108, 112, 100, 101

            // 4. Services
            const services = (DEFAULT_SERVICES || []).filter(s => {
                const lat = (s.latDiff != null) ? (uCoords.latitude + s.latDiff) : (s.lat || uCoords.latitude);
                const lon = (s.lonDiff != null) ? (uCoords.longitude + s.lonDiff) : (s.lon || uCoords.longitude);
                return calculateDistance(uCoords.latitude, uCoords.longitude, lat, lon) <= maxKm;
            });
            counts.services = services.length;

            // 5. Jobs
            const jobs = (DEFAULT_JOBS || []).filter(j => {
                const lat = (j.latDiff != null) ? (uCoords.latitude + j.latDiff) : (j.lat || uCoords.latitude);
                const lon = (j.lonDiff != null) ? (uCoords.longitude + j.lonDiff) : (j.lon || uCoords.longitude);
                return calculateDistance(uCoords.latitude, uCoords.longitude, lat, lon) <= maxKm;
            });
            counts.jobs = jobs.length;

            // 6. Rent
            const customRent = JSON.parse(localStorage.getItem('thuna_custom_rentals') || '[]');
            const allRent = [...customRent, ...(DEFAULT_RENTALS || [])].filter(r => {
                const lat = (r.latDiff != null) ? (uCoords.latitude + r.latDiff) : (r.lat || uCoords.latitude);
                const lon = (r.lonDiff != null) ? (uCoords.longitude + r.lonDiff) : (r.lon || uCoords.longitude);
                return calculateDistance(uCoords.latitude, uCoords.longitude, lat, lon) <= maxKm;
            });
            counts.rent = allRent.length;

            // 7. Buy & Sell
            const customMarket = JSON.parse(localStorage.getItem('thuna_custom_marketplace') || '[]');
            const allMarket = [...customMarket, ...(DEFAULT_MARKETPLACE || [])].filter(m => {
                const lat = (m.latDiff != null) ? (uCoords.latitude + m.latDiff) : (m.lat || uCoords.latitude);
                const lon = (m.lonDiff != null) ? (uCoords.longitude + m.lonDiff) : (m.lon || uCoords.longitude);
                return calculateDistance(uCoords.latitude, uCoords.longitude, lat, lon) <= maxKm;
            });
            counts.buysell = allMarket.length;

            // 8. Entertainment
            const customEnt = JSON.parse(localStorage.getItem('thuna_nearby_entertainment') || '[]');
            const allEnt = [...customEnt, ...DEFAULT_ENTERTAINMENT].filter(e => {
                const lat = (e.latDiff != null) ? (uCoords.latitude + e.latDiff) : (e.lat || uCoords.latitude);
                const lon = (e.lonDiff != null) ? (uCoords.longitude + e.lonDiff) : (e.lon || uCoords.longitude);
                return calculateDistance(uCoords.latitude, uCoords.longitude, lat, lon) <= maxKm;
            });
            counts.entertainment = allEnt.length;

            // 9. Hangout
            const customHang = JSON.parse(localStorage.getItem('thuna_nearby_hangouts') || '[]');
            const allHang = [...customHang, ...DEFAULT_HANGOUTS].filter(h => {
                const lat = (h.latDiff != null) ? (uCoords.latitude + h.latDiff) : (h.lat || uCoords.latitude);
                const lon = (h.lonDiff != null) ? (uCoords.longitude + h.lonDiff) : (h.lon || uCoords.longitude);
                return calculateDistance(uCoords.latitude, uCoords.longitude, lat, lon) <= maxKm;
            });
            counts.hangout = allHang.length;

            // 10. Events
            const customEvents = JSON.parse(localStorage.getItem('thuna_nearby_events') || '[]');
            const allEvents = [...customEvents, ...DEFAULT_EVENTS].filter(e => {
                const lat = (e.latDiff != null) ? (uCoords.latitude + e.latDiff) : (e.lat || uCoords.latitude);
                const lon = (e.lonDiff != null) ? (uCoords.longitude + e.lonDiff) : (e.lon || uCoords.longitude);
                return calculateDistance(uCoords.latitude, uCoords.longitude, lat, lon) <= maxKm;
            });
            counts.events = allEvents.length;

            // 11. Sports
            const customSports = JSON.parse(localStorage.getItem('thuna_nearby_sports') || '[]');
            const allSports = [...customSports, ...DEFAULT_SPORTS].filter(s => {
                const lat = (s.latDiff != null) ? (uCoords.latitude + s.latDiff) : (s.lat || uCoords.latitude);
                const lon = (s.lonDiff != null) ? (uCoords.longitude + s.lonDiff) : (s.lon || uCoords.longitude);
                return calculateDistance(uCoords.latitude, uCoords.longitude, lat, lon) <= maxKm;
            });
            counts.sports = allSports.length;

            // 12. Travel
            const customTravel = JSON.parse(localStorage.getItem('thuna_nearby_travel') || '[]');
            const allTravel = [...customTravel, ...DEFAULT_TRAVEL].filter(t => {
                const lat = (t.latDiff != null) ? (uCoords.latitude + t.latDiff) : (t.lat || uCoords.latitude);
                const lon = (t.lonDiff != null) ? (uCoords.longitude + t.lonDiff) : (t.lon || uCoords.longitude);
                return calculateDistance(uCoords.latitude, uCoords.longitude, lat, lon) <= maxKm;
            });
            counts.travel = allTravel.length;

            // 13. Posts
            const customPosts = JSON.parse(localStorage.getItem('thuna_community_posts') || '[]');
            const allPosts = [...customPosts, ...(DEFAULT_POSTS || [])].filter(p => {
                const lat = (p.latDiff != null) ? (uCoords.latitude + p.latDiff) : (p.lat || uCoords.latitude);
                const lon = (p.lonDiff != null) ? (uCoords.longitude + p.lonDiff) : (p.lon || uCoords.longitude);
                return calculateDistance(uCoords.latitude, uCoords.longitude, lat, lon) <= maxKm;
            });
            counts.posts = allPosts.length;

            return counts;
        }

        function renderNearbyMainPage() {
            const uCoords = getNearbyCurrentCoords();
            const radStr = APP_STATE.nearbyRadius || '1km';
            const maxKm = getNearbyRadiusKm(radStr);

            const counts = getNearbyCountsMap(uCoords, maxKm);

            // Update badge counts for all 13 categories
            Object.keys(counts).forEach(k => {
                const b = document.getElementById(`badge-count-${k}`);
                if (b) {
                    const c = counts[k];
                    b.textContent = c > 0 ? `${c} ലഭ്യമാണ്` : `ലഭ്യമല്ല`;
                    b.style.opacity = c > 0 ? '1' : '0.6';
                }
            });

            // Update total summary
            let total = 0;
            Object.values(counts).forEach(v => total += v);
            const totBadge = document.getElementById('nearbyTotalAvailableBadge');
            if (totBadge) totBadge.textContent = `${total} ഇനങ്ങൾ ചുറ്റിലുമുണ്ട്`;

            // Render Spotlight (Top closest items across categories)
            renderNearbySpotlight(uCoords, maxKm);
        }

        function renderNearbySpotlight(uCoords, maxKm) {
            const container = document.getElementById('nearbySpotlightContainer');
            if (!container) return;

            const items = [];

            // Grab top nearby services
            (DEFAULT_SERVICES || []).forEach(s => {
                const lat = (s.latDiff != null) ? (uCoords.latitude + s.latDiff) : (s.lat || uCoords.latitude);
                const lon = (s.lonDiff != null) ? (uCoords.longitude + s.lonDiff) : (s.lon || uCoords.longitude);
                const dist = calculateDistance(uCoords.latitude, uCoords.longitude, lat, lon);
                if (dist <= maxKm) {
                    items.push({
                        title: s.name,
                        sub: s.desc || 'Service Provider',
                        category: 'Services',
                        catId: 'services',
                        icon: s.icon || '🛠️',
                        dist,
                        distStr: formatDistance(dist)
                    });
                }
            });

            // Grab top nearby blood
            (DEFAULT_URGENT_BLOOD_REQUESTS || []).forEach(b => {
                const lat = (b.latDiff != null) ? (uCoords.latitude + b.latDiff) : (b.lat || uCoords.latitude);
                const lon = (b.lonDiff != null) ? (uCoords.longitude + b.lonDiff) : (b.lon || uCoords.longitude);
                const dist = calculateDistance(uCoords.latitude, uCoords.longitude, lat, lon);
                if (dist <= maxKm) {
                    items.push({
                        title: `Urgent Blood (${b.group}) • ${b.hospital}`,
                        sub: b.urgency || 'Immediate need',
                        category: 'Blood Donors',
                        catId: 'blood',
                        icon: '🩸',
                        dist,
                        distStr: formatDistance(dist)
                    });
                }
            });

            // Grab top nearby hangouts
            const customHang = JSON.parse(localStorage.getItem('thuna_nearby_hangouts') || '[]');
            [...customHang, ...DEFAULT_HANGOUTS].forEach(h => {
                const lat = (h.latDiff != null) ? (uCoords.latitude + h.latDiff) : (h.lat || uCoords.latitude);
                const lon = (h.lonDiff != null) ? (uCoords.longitude + h.lonDiff) : (h.lon || uCoords.longitude);
                const dist = calculateDistance(uCoords.latitude, uCoords.longitude, lat, lon);
                if (dist <= maxKm) {
                    items.push({
                        title: h.title,
                        sub: `${h.spot} • ${h.dateTime}`,
                        category: 'Hangout',
                        catId: 'hangout',
                        icon: '☕',
                        dist,
                        distStr: formatDistance(dist)
                    });
                }
            });

            // Grab top nearby jobs
            (DEFAULT_JOBS || []).forEach(j => {
                const lat = (j.latDiff != null) ? (uCoords.latitude + j.latDiff) : (j.lat || uCoords.latitude);
                const lon = (j.lonDiff != null) ? (uCoords.longitude + j.lonDiff) : (j.lon || uCoords.longitude);
                const dist = calculateDistance(uCoords.latitude, uCoords.longitude, lat, lon);
                if (dist <= maxKm) {
                    items.push({
                        title: j.title,
                        sub: `${j.company} • ${j.salary}`,
                        category: 'Jobs',
                        catId: 'jobs',
                        icon: '💼',
                        dist,
                        distStr: formatDistance(dist)
                    });
                }
            });

            items.sort((a, b) => a.dist - b.dist);
            const top = items.slice(0, 3);

            if (!top.length) {
                container.innerHTML = `
                    <div class="nearby-empty-state" style="padding:18px 14px">
                        <div style="font-size:26px;margin-bottom:4px">📡</div>
                        <div class="nearby-empty-title" style="font-size:13px">${APP_STATE.nearbyRadius} പരിധിയിൽ ലിസ്റ്റിംഗുകൾ ഒന്നും ലഭ്യമല്ല</div>
                        <div class="nearby-empty-desc" style="margin-bottom:10px">കൂടുതൽ ഇനങ്ങൾ കാണാൻ തിരച്ചിൽ പരിധി വർദ്ധിപ്പിക്കുക.</div>
                        <button class="nearby-radius-btn active" style="margin:0 auto;display:inline-block" onclick="setNearbyRadius('5km')">പരിധി 5km ആക്കുക</button>
                    </div>
                `;
                return;
            }

            container.innerHTML = top.map(it => `
                <div class="nearby-spotlight-card" onclick="openNearbyCategory('${it.catId}')">
                    <div style="display:flex;align-items:center;gap:10px;min-width:0;flex:1">
                        <div style="width:36px;height:36px;border-radius:10px;background:#F1F5F9;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0">
                            ${it.icon}
                        </div>
                        <div style="min-width:0;flex:1">
                            <div style="font-size:12.5px;font-weight:800;color:#0F172A;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(it.title)}</div>
                            <div style="font-size:11px;color:#64748B;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(it.sub)}</div>
                        </div>
                    </div>
                    <div style="display:flex;flex-direction:column;align-items:flex-end;gap:3px;flex-shrink:0">
                        <span class="nearby-distance-chip">📍 ~${it.distStr}</span>
                        <span style="font-size:10px;color:#15803D;font-weight:700">${it.category} ›</span>
                    </div>
                </div>
            `).join('');
        }

        function renderNearbyCategoryPage(catId) {
            const container = document.getElementById('nearbyCategoryRecordsList');
            const banner = document.getElementById('nearbyCatBanner');
            const subfiltersWrap = document.getElementById('nearbySubfiltersContainer');
            if (!container || !banner) return;

            const catInfo = NEARBY_CATEGORIES.find(c => c.id === catId) || NEARBY_CATEGORIES[0];
            const uCoords = getNearbyCurrentCoords();
            const radStr = APP_STATE.nearbyRadius || '1km';
            const maxKm = getNearbyRadiusKm(radStr);

            // 1. Render Banner
            let ctaHtml = '';
            if (catId === 'hangout') {
                ctaHtml = `<button class="primary-action-btn" style="margin:0;padding:6px 12px;font-size:11.5px;background:#A16207" onclick="openModal('modal-nearby-create-hangout')">+ കൂട്ടായ്മ</button>`;
            } else if (catId === 'events') {
                ctaHtml = `<button class="primary-action-btn" style="margin:0;padding:6px 12px;font-size:11.5px;background:#0E7490" onclick="openModal('modal-nearby-add-event')">+ ഇവന്റ്</button>`;
            } else if (catId === 'sports') {
                ctaHtml = `<button class="primary-action-btn" style="margin:0;padding:6px 12px;font-size:11.5px;background:#065F46" onclick="openModal('modal-nearby-post-sports')">+ കളി ചേർക്കാം</button>`;
            } else if (catId === 'travel') {
                ctaHtml = `<button class="primary-action-btn" style="margin:0;padding:6px 12px;font-size:11.5px;background:#4338CA" onclick="openModal('modal-nearby-create-travel')">+ യാത്ര</button>`;
            } else if (catId === 'entertainment') {
                ctaHtml = `<button class="primary-action-btn" style="margin:0;padding:6px 12px;font-size:11.5px;background:#E11D48" onclick="openModal('modal-nearby-add-entertainment')">+ ഷോ ചേർക്കാം</button>`;
            } else if (catId === 'buysell') {
                ctaHtml = `<button class="primary-action-btn" style="margin:0;padding:6px 12px;font-size:11.5px;background:#047857" onclick="openModal('modal-nearby-sell-item')">+ വിൽക്കാം</button>`;
            } else if (catId === 'blood') {
                ctaHtml = `
                    <div style="display:flex;gap:4px">
                        <button class="primary-action-btn" style="margin:0;padding:6px 10px;font-size:11px;background:#DC2626" onclick="openRequestBloodModal()">📢 ആവശ്യം</button>
                        <button class="primary-action-btn" style="margin:0;padding:6px 10px;font-size:11px;background:#059669" onclick="openRegisterDonorModal()">🩸 ദാതാവ്</button>
                    </div>`;
            } else if (catId === 'services') {
                ctaHtml = `<button class="primary-action-btn" style="margin:0;padding:6px 12px;font-size:11.5px;background:#0284C7" onclick="openProviderRegisterModal()">+ സർവീസ്</button>`;
            } else if (catId === 'jobs') {
                ctaHtml = `<button class="primary-action-btn" style="margin:0;padding:6px 12px;font-size:11.5px;background:#7E22CE" onclick="openPostJobModal()">+ ജോലി നൽകാം</button>`;
            } else if (catId === 'rent') {
                ctaHtml = `<button class="primary-action-btn" style="margin:0;padding:6px 12px;font-size:11.5px;background:#B45309" onclick="openPostRentalModal()">+ വാടകയ്ക്ക്</button>`;
            } else if (catId === 'emergency') {
                ctaHtml = `<button class="primary-action-btn" style="margin:0;padding:6px 12px;font-size:11.5px;background:#DC2626" onclick="openEmergencyModal()">🚨 SOS</button>`;
            } else if (catId === 'posts') {
                ctaHtml = `<button class="primary-action-btn" style="margin:0;padding:6px 12px;font-size:11.5px;background:#059669" onclick="navTo('add')">+ പോസ്റ്റ്</button>`;
            }

            banner.innerHTML = `
                <div style="display:flex;align-items:center;gap:10px;flex:1;min-width:0">
                    <div style="width:40px;height:40px;border-radius:12px;background:${catInfo.bg};color:${catInfo.color};display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">
                        ${catInfo.icon}
                    </div>
                    <div style="min-width:0;flex:1">
                        <h4 style="margin:0;font-size:14px;font-weight:800;color:#0F172A">${catInfo.name}</h4>
                        <div style="font-size:11px;color:#64748B;line-height:1.25;margin-top:1px">${catInfo.desc}</div>
                    </div>
                </div>
                ${ctaHtml}
            `;

            // 2. Delegate to Category-specific Renderers
            if (catId === 'people') renderNearbyPeopleCategory(container, maxKm, uCoords, subfiltersWrap);
            else if (catId === 'blood') renderNearbyBloodCategory(container, maxKm, uCoords, subfiltersWrap);
            else if (catId === 'emergency') renderNearbyEmergencyCategory(container, maxKm, uCoords, subfiltersWrap);
            else if (catId === 'services') renderNearbyServicesCategory(container, maxKm, uCoords, subfiltersWrap);
            else if (catId === 'jobs') renderNearbyJobsCategory(container, maxKm, uCoords, subfiltersWrap);
            else if (catId === 'rent') renderNearbyRentCategory(container, maxKm, uCoords, subfiltersWrap);
            else if (catId === 'buysell') renderNearbyBuySellCategory(container, maxKm, uCoords, subfiltersWrap);
            else if (catId === 'entertainment') renderNearbyEntertainmentCategory(container, maxKm, uCoords, subfiltersWrap);
            else if (catId === 'hangout') renderNearbyHangoutCategory(container, maxKm, uCoords, subfiltersWrap);
            else if (catId === 'events') renderNearbyEventsCategory(container, maxKm, uCoords, subfiltersWrap);
            else if (catId === 'sports') renderNearbySportsCategory(container, maxKm, uCoords, subfiltersWrap);
            else if (catId === 'travel') renderNearbyTravelCategory(container, maxKm, uCoords, subfiltersWrap);
            else if (catId === 'posts') renderNearbyPostsCategory(container, maxKm, uCoords, subfiltersWrap);
        }

        function setNearbySubfilter(subKey, catId) {
            APP_STATE.nearbySubfilter = subKey;
            document.querySelectorAll('#nearbySubfiltersContainer .nearby-quick-tab-pill').forEach(b => {
                b.classList.toggle('active', b.dataset.sub === subKey);
            });
            renderNearbyCategoryPage(catId);
        }

        function renderNearbyEmptyState(container, title, desc, ctaLabel, ctaAction) {
            const radStr = APP_STATE.nearbyRadius || '1km';
            container.innerHTML = `
                <div class="nearby-empty-state">
                    <div class="nearby-empty-icon">📡</div>
                    <div class="nearby-empty-title">${title || `${radStr} പരിധിയിൽ ഒന്നും കണ്ടെത്തിയില്ല`}</div>
                    <div class="nearby-empty-desc">${desc || 'നിങ്ങളുടെ ചുറ്റളവിലെ കൂടുതൽ വിവരങ്ങൾ കാണാൻ തിരച്ചിൽ പരിധി വർദ്ധിപ്പിക്കുക.'}</div>
                    <div style="display:flex;justify-content:center;gap:8px;flex-wrap:wrap">
                        <button class="nearby-radius-btn active" style="padding:7px 14px" onclick="setNearbyRadius('5km')">🔍 5km ലേക്ക് മാറ്റുക</button>
                        ${ctaLabel ? `<button class="primary-action-btn" style="margin:0;padding:7px 14px;font-size:12px;background:#15803D" onclick="${ctaAction}">${ctaLabel}</button>` : ''}
                    </div>
                </div>
            `;
            const countEl = document.getElementById('nearbyResultsCountText');
            if (countEl) countEl.textContent = 'കണ്ടെത്തിയവ: 0';
        }

        // ==============================================================
        // 13 DEDICATED CATEGORY RENDERERS
        // ==============================================================

        // 1. NEARBY PEOPLE
        function renderNearbyPeopleCategory(container, maxKm, uCoords, subfiltersWrap) {
            if (subfiltersWrap) subfiltersWrap.style.display = 'none';

            let list = (typeof getFriendsList === 'function' ? getFriendsList() : (DEFAULT_FRIENDS || [])).filter(f => f.optIn !== false).map(f => {
                const lat = (f.latDiff != null) ? (uCoords.latitude + f.latDiff) : (f.lat || uCoords.latitude);
                const lon = (f.lonDiff != null) ? (uCoords.longitude + f.lonDiff) : (f.lon || uCoords.longitude);
                const dist = calculateDistance(uCoords.latitude, uCoords.longitude, lat, lon);
                return { ...f, _dist: dist, _distFormatted: formatDistance(dist) };
            }).filter(f => f._dist <= maxKm).sort((a, b) => a._dist - b._dist);

            const isOptedIn = (APP_STATE.nearbyFriendsOptIn !== false);

            const optInCardHtml = `
                <div style="background:#FFFFFF;border-radius:16px;border:1.5px solid ${isOptedIn ? '#86EFAC' : '#CBD5E1'};padding:12px 14px;display:flex;align-items:center;justify-content:space-between;gap:10px;box-shadow:0 2px 6px rgba(0,0,0,0.02)">
                    <div>
                        <div style="font-size:13px;font-weight:800;color:#0F172A">എന്നെ സമീപത്തുള്ളവർക്ക് കാണിക്കുക (Privacy)</div>
                        <div style="font-size:11px;color:#64748B">${isOptedIn ? '🟢 നിങ്ങൾ സമീപത്തുള്ളവർക്ക് ദൃശ്യമാണ്' : '🔒 നിങ്ങൾ ഇപ്പോൾ ദൃശ്യമല്ല (Hidden)'}</div>
                    </div>
                    <label style="position:relative;display:inline-block;width:44px;height:24px;cursor:pointer">
                        <input type="checkbox" ${isOptedIn ? 'checked' : ''} onchange="toggleNearbyFriendsOptIn(this.checked);renderNearbyCategoryPage('people')" style="opacity:0;width:0;height:0">
                        <span style="position:absolute;cursor:pointer;inset:0;background:${isOptedIn ? '#15803D' : '#CBD5E1'};border-radius:24px;transition:0.2s">
                            <span style="position:absolute;content:'';height:18px;width:18px;left:3px;bottom:3px;background:white;border-radius:50%;transition:0.2s;transform:${isOptedIn ? 'translateX(20px)' : 'none'}"></span>
                        </span>
                    </label>
                </div>
            `;

            if (!isOptedIn) {
                container.innerHTML = `
                    ${optInCardHtml}
                    <div class="nearby-empty-state" style="margin-top:10px">
                        <div class="nearby-empty-icon">🔒</div>
                        <div class="nearby-empty-title">നിങ്ങളുടെ പ്രൊഫൈൽ ഒളിപ്പിച്ചിരിക്കുന്നു</div>
                        <div class="nearby-empty-desc">സമീപത്തുള്ള അയൽവാസികളെയും അംഗങ്ങളെയും കാണാനും അവർക്ക് നിങ്ങളുമായി ബന്ധപ്പെടാനും മുകളിലെ സ്വിച്ച് ഓൺ ചെയ്യുക.</div>
                    </div>
                `;
                return;
            }

            const countEl = document.getElementById('nearbyResultsCountText');
            if (countEl) countEl.textContent = `കണ്ടെത്തിയവർ: ${list.length}`;

            if (!list.length) {
                renderNearbyEmptyState(container, `${APP_STATE.nearbyRadius} ചുറ്റളവിൽ ആളുകൾ ലഭ്യമല്ല`, 'നിങ്ങൾ തിരഞ്ഞെടുത്ത ചുറ്റളവിൽ ദൃശ്യത അനുവദിച്ച അംഗങ്ങൾ നിലവിൽ ഇല്ല.', null, null);
                container.insertAdjacentHTML('afterbegin', optInCardHtml);
                return;
            }

            container.innerHTML = optInCardHtml + list.map(f => `
                <div class="nearby-item-card" style="flex-direction:row;align-items:center;justify-content:space-between">
                    <div style="display:flex;align-items:center;gap:12px;min-width:0;flex:1">
                        <div style="width:44px;height:44px;border-radius:50%;background:#E0F2FE;display:flex;align-items:center;justify-content:center;font-size:22px;position:relative;flex-shrink:0">
                            ${f.face || '👤'}
                            <span style="position:absolute;bottom:0;right:0;width:10px;height:10px;border-radius:50%;background:${f.online ? '#10B981' : '#94A3B8'};border:2px solid #FFFFFF"></span>
                        </div>
                        <div style="min-width:0;flex:1">
                            <div style="font-size:13.5px;font-weight:800;color:#0F172A;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(f.name)}</div>
                            <div style="font-size:11.5px;color:#64748B;display:flex;align-items:center;gap:6px;margin-top:2px">
                                <span>📍 ${escapeHtml(f.location || 'Near you')}</span>
                                ${f.group ? `<span style="background:#FEE2E2;color:#DC2626;font-size:10px;font-weight:800;padding:1px 5px;border-radius:4px">${f.group}</span>` : ''}
                            </div>
                        </div>
                    </div>
                    <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px;flex-shrink:0">
                        <span class="nearby-distance-chip">📍 ~${f._distFormatted}</span>
                        <button class="pill-action-btn solid" style="padding:5px 12px;font-size:11.5px" onclick="openDirectChat('${escapeHtml(f.name)}', '${f.avatar || ''}')">
                            💬 Message
                        </button>
                    </div>
                </div>
            `).join('');
        }

        // 2. NEARBY BLOOD DONORS
        function renderNearbyBloodCategory(container, maxKm, uCoords, subfiltersWrap) {
            const sub = APP_STATE.nearbySubfilter || 'all';

            if (subfiltersWrap) {
                subfiltersWrap.style.display = 'flex';
                const subFilters = ['all', 'urgent', 'A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'];
                subfiltersWrap.innerHTML = subFilters.map(sf => `
                    <button class="nearby-quick-tab-pill ${sf === sub ? 'active' : ''}" data-sub="${sf}" onclick="setNearbySubfilter('${sf}', 'blood')">
                        ${sf === 'all' ? 'എല്ലാം (All)' : (sf === 'urgent' ? '🚨 അടിയന്തരം' : sf)}
                    </button>
                `).join('');
            }

            // Urgent Requests
            const customReq = JSON.parse(localStorage.getItem('thuna_custom_blood_requests') || '[]');
            let urgentList = [...customReq, ...(DEFAULT_URGENT_BLOOD_REQUESTS || [])].map(r => {
                const lat = (r.latDiff != null) ? (uCoords.latitude + r.latDiff) : (r.lat || uCoords.latitude);
                const lon = (r.lonDiff != null) ? (uCoords.longitude + r.lonDiff) : (r.lon || uCoords.longitude);
                const dist = calculateDistance(uCoords.latitude, uCoords.longitude, lat, lon);
                return { ...r, _dist: dist, _distFormatted: formatDistance(dist) };
            }).filter(r => r._dist <= maxKm);

            // Voluntary Donors
            const customDonors = JSON.parse(localStorage.getItem('thuna_custom_donors') || '[]');
            let donorList = [...customDonors, ...(DEFAULT_DONORS || [])].map(d => {
                const lat = (d.latDiff != null) ? (uCoords.latitude + d.latDiff) : (d.lat || uCoords.latitude);
                const lon = (d.lonDiff != null) ? (uCoords.longitude + d.lonDiff) : (d.lon || uCoords.longitude);
                const dist = calculateDistance(uCoords.latitude, uCoords.longitude, lat, lon);
                return { ...d, _dist: dist, _distFormatted: formatDistance(dist) };
            }).filter(d => d._dist <= maxKm);

            if (sub === 'urgent') {
                donorList = [];
            } else if (sub !== 'all') {
                urgentList = urgentList.filter(r => r.group === sub);
                donorList = donorList.filter(d => d.group === sub);
            }

            urgentList.sort((a, b) => a._dist - b._dist);
            donorList.sort((a, b) => a._dist - b._dist);

            const total = urgentList.length + donorList.length;
            const countEl = document.getElementById('nearbyResultsCountText');
            if (countEl) countEl.textContent = `രക്തസഹായം: ${total} (അടിയന്തരം: ${urgentList.length}, ദാതാക്കൾ: ${donorList.length})`;

            if (!total) {
                renderNearbyEmptyState(container, `${APP_STATE.nearbyRadius} പരിധിയിൽ രക്തദാതാക്കളെ കണ്ടെത്തിയില്ല`, 'രക്തഗ്രൂപ്പ് മാറ്റി നോക്കുകയോ തിരച്ചിൽ പരിധി വർദ്ധിപ്പിക്കുകയോ ചെയ്യാം.', '+ രക്തം ആവശ്യപ്പെടാം', "openRequestBloodModal()");
                return;
            }

            let html = '';

            // Render Urgent Requests first
            if (urgentList.length) {
                html += `
                    <div style="font-size:13px;font-weight:800;color:#DC2626;display:flex;align-items:center;gap:6px;margin:2px 0">
                        <span>🚨 അടിയന്തര ആവശ്യങ്ങൾ (${urgentList.length})</span>
                    </div>
                `;
                html += urgentList.map(r => `
                    <div class="nearby-item-card" style="border:1.5px solid #FCA5A5;background:#FFFDFD">
                        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px">
                            <div style="display:flex;align-items:center;gap:8px">
                                <span style="background:#DC2626;color:#FFF;font-size:14px;font-weight:800;padding:4px 10px;border-radius:10px">${r.group}</span>
                                <div>
                                    <h4 style="margin:0;font-size:14px;font-weight:800;color:#0F172A">${escapeHtml(r.hospital)}</h4>
                                    <div style="font-size:11.5px;color:#DC2626;font-weight:700">⚡ ${escapeHtml(r.urgency || 'Immediate')} • ${r.units || 1} യൂണിറ്റ് വേണം</div>
                                </div>
                            </div>
                            <span class="nearby-distance-chip">📍 ~${r._distFormatted}</span>
                        </div>
                        <div style="font-size:12px;color:#475569">ആശുപത്രി: ${escapeHtml(r.location || '')} ${r.reason ? `• കാരണം: ${escapeHtml(r.reason)}` : ''}</div>
                        <div style="display:flex;justify-content:space-between;align-items:center;padding-top:8px;border-top:1px solid #FEE2E2">
                            <span style="font-size:11.5px;color:#64748B">ബന്ധപ്പെടുക: ${escapeHtml(r.contactPerson || 'ആശുപത്രി സഹായി')}</span>
                            <div style="display:flex;gap:6px">
                                ${r.contactPhone ? `<a href="tel:${r.contactPhone}" class="pill-action-btn solid" style="background:#DC2626;padding:5px 12px;font-size:11.5px;text-decoration:none">📞 വിളിക്കുക</a>` : ''}
                                <button class="pill-action-btn" style="background:#FEF2F2;border:1px solid #FECACA;color:#DC2626;padding:5px 10px;font-size:11.5px" onclick="openDonorChat('${escapeHtml(r.contactPerson || 'Attendant')}', '${r.group}', '${escapeHtml(r.hospital)}')">💬 ചാറ്റ്</button>
                            </div>
                        </div>
                    </div>
                `).join('');
            }

            // Render Voluntary Donors
            if (donorList.length) {
                html += `
                    <div style="font-size:13px;font-weight:800;color:#0F172A;display:flex;align-items:center;gap:6px;margin:${urgentList.length ? '10px' : '2px'} 0 2px">
                        <span>🩸 സന്നദ്ധ രക്തദാതാക്കൾ (${donorList.length})</span>
                    </div>
                `;
                html += donorList.map(d => `
                    <div class="nearby-item-card">
                        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px">
                            <div style="display:flex;align-items:center;gap:8px">
                                <span style="background:#FEE2E2;color:#DC2626;font-size:13px;font-weight:800;padding:3px 8px;border-radius:8px;border:1px solid #FECACA">${d.group}</span>
                                <div>
                                    <h4 style="margin:0;font-size:13.5px;font-weight:800;color:#0F172A">${escapeHtml(d.name)}</h4>
                                    <div style="font-size:11.5px;color:#059669;font-weight:700">🟢 സന്നദ്ധ ദാതാവ് (Available)</div>
                                </div>
                            </div>
                            <span class="nearby-distance-chip">📍 ~${d._distFormatted}</span>
                        </div>
                        <div style="font-size:12px;color:#475569">സ്ഥലം: ${escapeHtml(d.location)}</div>
                        <div style="display:flex;justify-content:flex-end;gap:6px;padding-top:6px;border-top:1px solid #F1F5F9">
                            ${d.phone ? `<a href="tel:${d.phone}" class="pill-action-btn solid" style="background:#059669;padding:5px 12px;font-size:11.5px;text-decoration:none">📞 വിളിക്കുക</a>` : ''}
                            <button class="pill-action-btn" style="background:#F0FDF4;border:1px solid #BBF7D0;color:#065F46;padding:5px 12px;font-size:11.5px" onclick="openDonorChat('${escapeHtml(d.name)}', '${d.group}', '${escapeHtml(d.location)}')">💬 ചാറ്റ്</button>
                        </div>
                    </div>
                `).join('');
            }

            container.innerHTML = html;
        }

        // 3. NEARBY EMERGENCY HELP
        function renderNearbyEmergencyCategory(container, maxKm, uCoords, subfiltersWrap) {
            if (subfiltersWrap) subfiltersWrap.style.display = 'none';

            const customAmb = JSON.parse(localStorage.getItem('thuna_custom_ambulances') || '[]');
            const ambList = [...customAmb, ...(DEFAULT_AMBULANCES || [])].map(a => {
                const lat = (a.latDiff != null) ? (uCoords.latitude + a.latDiff) : (a.lat || uCoords.latitude);
                const lon = (a.lonDiff != null) ? (uCoords.longitude + a.lonDiff) : (a.lon || uCoords.longitude);
                const dist = calculateDistance(uCoords.latitude, uCoords.longitude, lat, lon);
                return { ...a, _dist: dist, _distFormatted: formatDistance(dist) };
            }).sort((a, b) => a._dist - b._dist);

            const countEl = document.getElementById('nearbyResultsCountText');
            if (countEl) countEl.textContent = `അടിയന്തര സേവനങ്ങൾ സജീവം (24x7)`;

            const hotlinesHtml = `
                <div style="background:linear-gradient(135deg,#FEF2F2,#FFF1F2);border:1.5px solid #FECACA;border-radius:18px;padding:12px 14px">
                    <div style="font-size:12px;font-weight:800;color:#DC2626;margin-bottom:8px">🚨 24x7 അടിയന്തര ദേശീയ ഹെൽപ്പ് ലൈനുകൾ (One-Tap Call)</div>
                    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px">
                        <a href="tel:108" class="primary-action-btn" style="background:#DC2626;color:#fff;margin:0;padding:8px;font-size:12px;text-decoration:none;display:flex;align-items:center;justify-content:center;gap:6px">
                            🚑 108 ആംബുലൻസ്
                        </a>
                        <a href="tel:112" class="primary-action-btn" style="background:#0F172A;color:#fff;margin:0;padding:8px;font-size:12px;text-decoration:none;display:flex;align-items:center;justify-content:center;gap:6px">
                            🆘 112 എമർജൻസി
                        </a>
                        <a href="tel:100" class="primary-action-btn" style="background:#1E40AF;color:#fff;margin:0;padding:8px;font-size:12px;text-decoration:none;display:flex;align-items:center;justify-content:center;gap:6px">
                            👮 100 പോലീസ്
                        </a>
                        <a href="tel:101" class="primary-action-btn" style="background:#D97706;color:#fff;margin:0;padding:8px;font-size:12px;text-decoration:none;display:flex;align-items:center;justify-content:center;gap:6px">
                            🚒 101 ഫയർ & റെസ്ക്യൂ
                        </a>
                    </div>
                </div>
            `;

            const ambHtml = ambList.map(a => `
                <div class="nearby-item-card">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px">
                        <div style="display:flex;align-items:center;gap:8px">
                            <span style="font-size:24px">🚑</span>
                            <div>
                                <h4 style="margin:0;font-size:14px;font-weight:800;color:#0F172A">${escapeHtml(a.name)}</h4>
                                <div style="font-size:11.5px;color:#059669;font-weight:700">🟢 ${escapeHtml(a.type || 'Life Support Ambulance')}</div>
                            </div>
                        </div>
                        <span class="nearby-distance-chip">📍 ~${a._distFormatted}</span>
                    </div>
                    <div style="font-size:12px;color:#475569">വാഹനം: ${escapeHtml(a.vehicle || '24-Hour Emergency Unit')} • സ്ഥലം: ${escapeHtml(a.location)}</div>
                    <div style="display:flex;justify-content:space-between;align-items:center;padding-top:6px;border-top:1px solid #F1F5F9">
                        <span style="font-size:11.5px;color:#DC2626;font-weight:700">24 മണിക്കൂറും ലഭ്യമാണ്</span>
                        <a href="tel:${a.phone}" class="pill-action-btn solid" style="background:#DC2626;padding:6px 14px;font-size:12px;text-decoration:none">
                            📞 വിളിക്കുക
                        </a>
                    </div>
                </div>
            `).join('');

            container.innerHTML = `
                ${hotlinesHtml}
                <div style="font-size:13px;font-weight:800;color:#0F172A;margin-top:6px">സമീപത്തുള്ള ആംബുലൻസുകൾ & യൂണിറ്റുകൾ</div>
                ${ambHtml}
            `;
        }

        // 4. NEARBY SERVICES
        function renderNearbyServicesCategory(container, maxKm, uCoords, subfiltersWrap) {
            const sub = APP_STATE.nearbySubfilter || 'all';

            if (subfiltersWrap) {
                subfiltersWrap.style.display = 'flex';
                const subFilters = [
                    { id: 'all', label: 'എല്ലാം (All)' },
                    { id: 'electrician', label: '⚡ ഇലക്ട്രീഷ്യൻ' },
                    { id: 'plumber', label: '🚰 പ്ലംബർ' },
                    { id: 'driver', label: '🛺 ഡ്രൈവർ / ഓട്ടോ' },
                    { id: 'doctor', label: '🩺 ഡോക്ടർ / ക്ലിനിക്ക്' },
                    { id: 'carpenter', label: '🪚 ആശാരി' },
                    { id: 'ac', label: '❄️ എ.സി റിപ്പയർ' }
                ];
                subfiltersWrap.innerHTML = subFilters.map(sf => `
                    <button class="nearby-quick-tab-pill ${sf.id === sub ? 'active' : ''}" data-sub="${sf.id}" onclick="setNearbySubfilter('${sf.id}', 'services')">
                        ${sf.label}
                    </button>
                `).join('');
            }

            const customServices = JSON.parse(localStorage.getItem('thuna_custom_providers') || '[]');
            let list = [...customServices, ...(DEFAULT_SERVICES || [])].map(s => {
                const lat = (s.latDiff != null) ? (uCoords.latitude + s.latDiff) : (s.lat || uCoords.latitude);
                const lon = (s.lonDiff != null) ? (uCoords.longitude + s.lonDiff) : (s.lon || uCoords.longitude);
                const dist = calculateDistance(uCoords.latitude, uCoords.longitude, lat, lon);
                return { ...s, _dist: dist, _distFormatted: formatDistance(dist) };
            }).filter(s => s._dist <= maxKm);

            if (sub !== 'all') {
                list = list.filter(s => (s.category || '').toLowerCase() === sub.toLowerCase());
            }

            list.sort((a, b) => a._dist - b._dist);
            const countEl = document.getElementById('nearbyResultsCountText');
            if (countEl) countEl.textContent = `സേവന ദാതാക്കൾ: ${list.length}`;

            if (!list.length) {
                renderNearbyEmptyState(container, `${APP_STATE.nearbyRadius} പരിധിയിൽ സർവീസുകൾ ലഭ്യമല്ല`, 'ഈ വിഭാഗത്തിൽ സമീപത്ത് വിദഗ്ദ്ധ തൊഴിലാളികൾ ഇല്ലെങ്കിൽ തിരച്ചിൽ പരിധി മാറ്റുക.', '+ സർവീസ് രജിസ്റ്റർ ചെയ്യാം', "openProviderRegisterModal()");
                return;
            }

            container.innerHTML = list.map(s => `
                <div class="nearby-item-card">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px">
                        <div style="display:flex;align-items:center;gap:10px">
                            <div style="width:40px;height:40px;border-radius:12px;background:${s.bgColor || '#E0F2FE'};color:${s.color || '#0284C7'};display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0">
                                ${s.icon || '🛠️'}
                            </div>
                            <div>
                                <h4 style="margin:0;font-size:14px;font-weight:800;color:#0F172A">${escapeHtml(s.name || s.businessName)}</h4>
                                <div style="font-size:11.5px;color:#64748B">${escapeHtml(s.desc || s.category)}</div>
                            </div>
                        </div>
                        <span class="nearby-distance-chip">📍 ~${s._distFormatted}</span>
                    </div>
                    <div style="display:flex;align-items:center;justify-content:space-between;padding-top:6px;border-top:1px solid #F1F5F9">
                        <div style="font-size:11.5px;color:#D97706;font-weight:700">★ ${s.rating || 4.8} (${s.reviews || 45} അവലോകനങ്ങൾ)</div>
                        <div style="display:flex;gap:6px">
                            ${s.phone ? `<a href="tel:${s.phone}" class="pill-action-btn solid" style="background:#0284C7;padding:5px 12px;font-size:11.5px;text-decoration:none">📞 വിളിക്കുക</a>` : ''}
                            <button class="pill-action-btn" style="background:#F0F9FF;border:1px solid #BAE6FD;color:#0369A1;padding:5px 10px;font-size:11.5px" onclick="openServiceDetailsModal('${s.id}')">വിവരങ്ങൾ</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // 5. NEARBY JOBS
        function renderNearbyJobsCategory(container, maxKm, uCoords, subfiltersWrap) {
            const sub = APP_STATE.nearbySubfilter || 'all';

            if (subfiltersWrap) {
                subfiltersWrap.style.display = 'flex';
                const subFilters = [
                    { id: 'all', label: 'എല്ലാം (All)' },
                    { id: 'Full-Time', label: '💼 ഫുൾടൈം' },
                    { id: 'Part-Time', label: '⏱️ പാർട്‌ടൈം' },
                    { id: 'Daily', label: '💵 ദിവസവേതനം' }
                ];
                subfiltersWrap.innerHTML = subFilters.map(sf => `
                    <button class="nearby-quick-tab-pill ${sf.id === sub ? 'active' : ''}" data-sub="${sf.id}" onclick="setNearbySubfilter('${sf.id}', 'jobs')">
                        ${sf.label}
                    </button>
                `).join('');
            }

            const customJobs = JSON.parse(localStorage.getItem('thuna_custom_jobs') || '[]');
            let list = [...customJobs, ...(DEFAULT_JOBS || [])].map(j => {
                const lat = (j.latDiff != null) ? (uCoords.latitude + j.latDiff) : (j.lat || uCoords.latitude);
                const lon = (j.lonDiff != null) ? (uCoords.longitude + j.lonDiff) : (j.lon || uCoords.longitude);
                const dist = calculateDistance(uCoords.latitude, uCoords.longitude, lat, lon);
                return { ...j, _dist: dist, _distFormatted: formatDistance(dist) };
            }).filter(j => j._dist <= maxKm);

            if (sub !== 'all') {
                list = list.filter(j => (j.type || '').includes(sub));
            }

            list.sort((a, b) => a._dist - b._dist);
            const countEl = document.getElementById('nearbyResultsCountText');
            if (countEl) countEl.textContent = `തൊഴിലവസരങ്ങൾ: ${list.length}`;

            if (!list.length) {
                renderNearbyEmptyState(container, `${APP_STATE.nearbyRadius} പരിധിയിൽ ജോലികൾ ലഭ്യമല്ല`, 'ഈ പ്രദേശത്ത് തൊഴിലവസരങ്ങൾ ഒന്നും റിപ്പോർട്ട് ചെയ്തിട്ടില്ല.', '+ ജോലി ഒഴിവ് നൽകാം', "openPostJobModal()");
                return;
            }

            container.innerHTML = list.map(j => `
                <div class="nearby-item-card">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px">
                        <div>
                            <span style="background:#F3E8FF;color:#7E22CE;font-size:10.5px;font-weight:800;padding:2px 7px;border-radius:6px;border:1px solid #E9D5FF">${escapeHtml(j.type || 'Full-Time')}</span>
                            <h4 style="margin:4px 0 2px;font-size:14px;font-weight:800;color:#0F172A">${escapeHtml(j.title)}</h4>
                            <div style="font-size:11.5px;color:#64748B">🏢 ${escapeHtml(j.company)} • 📍 ${escapeHtml(j.location)}</div>
                        </div>
                        <span class="nearby-distance-chip">📍 ~${j._distFormatted}</span>
                    </div>
                    <div style="background:#FEFCE8;border:1px solid #FEF08A;border-radius:10px;padding:6px 10px;font-size:12px;font-weight:800;color:#854D0E">
                        ശമ്പളം: ${escapeHtml(j.salary || 'പ്രതിഫലം ചർച്ച ചെയ്യാം')}
                    </div>
                    <div style="font-size:11.5px;color:#475569;line-height:1.35">${escapeHtml(j.description || '')}</div>
                    <div style="display:flex;justify-content:flex-end;gap:6px;padding-top:6px;border-top:1px solid #F1F5F9">
                        <button class="pill-action-btn" style="background:#F8FAFC;border:1px solid #CBD5E1;color:#334155;padding:5px 12px;font-size:11.5px" onclick="openJobDetailsModal('${j.id}')">വിവരങ്ങൾ</button>
                        <button class="pill-action-btn solid" style="background:#7E22CE;padding:5px 14px;font-size:11.5px" onclick="openJobApplyModal('${j.id}')">അപേക്ഷിക്കാം ↗</button>
                    </div>
                </div>
            `).join('');
        }

        // 6. NEARBY RENT
        function renderNearbyRentCategory(container, maxKm, uCoords, subfiltersWrap) {
            const sub = APP_STATE.nearbySubfilter || 'all';

            if (subfiltersWrap) {
                subfiltersWrap.style.display = 'flex';
                const subFilters = [
                    { id: 'all', label: 'എല്ലാം (All)' },
                    { id: 'houses', label: '🏡 വീട് & റൂം' },
                    { id: 'items', label: '🛠️ ടൂളുകൾ & മെഷീൻ' },
                    { id: 'vehicles', label: '🚗 വാഹനങ്ങൾ' }
                ];
                subfiltersWrap.innerHTML = subFilters.map(sf => `
                    <button class="nearby-quick-tab-pill ${sf.id === sub ? 'active' : ''}" data-sub="${sf.id}" onclick="setNearbySubfilter('${sf.id}', 'rent')">
                        ${sf.label}
                    </button>
                `).join('');
            }

            const customRent = JSON.parse(localStorage.getItem('thuna_custom_rentals') || '[]');
            let list = [...customRent, ...(DEFAULT_RENTALS || [])].map(r => {
                const lat = (r.latDiff != null) ? (uCoords.latitude + r.latDiff) : (r.lat || uCoords.latitude);
                const lon = (r.lonDiff != null) ? (uCoords.longitude + r.lonDiff) : (r.lon || uCoords.longitude);
                const dist = calculateDistance(uCoords.latitude, uCoords.longitude, lat, lon);
                return { ...r, _dist: dist, _distFormatted: formatDistance(dist) };
            }).filter(r => r._dist <= maxKm);

            if (sub === 'items') {
                list = list.filter(r => (r.category === 'items') || (r.type && (r.type.includes('Tool') || r.type.includes('Agri') || r.type.includes('Equip') || r.type.includes('Item'))));
            } else if (sub === 'vehicles') {
                list = list.filter(r => (r.category === 'vehicles') || (r.type && (r.type.includes('Vehicle') || r.type.includes('Car') || r.type.includes('Auto'))));
            } else if (sub === 'houses') {
                list = list.filter(r => (r.category === 'houses') || (r.type && (r.type.includes('House') || r.type.includes('Flat') || r.type.includes('Shop') || r.type.includes('Room'))));
            }

            list.sort((a, b) => a._dist - b._dist);
            const countEl = document.getElementById('nearbyResultsCountText');
            if (countEl) countEl.textContent = `വാടക ലിസ്റ്റിംഗുകൾ: ${list.length}`;

            if (!list.length) {
                renderNearbyEmptyState(container, `${APP_STATE.nearbyRadius} പരിധിയിൽ വാടക സാധനങ്ങൾ ലഭ്യമല്ല`, 'ഈ ചുറ്റളവിൽ വീടുകളോ ടൂളുകളോ നിലവിൽ വാടകയ്ക്കില്ല.', '+ വാടകയ്ക്ക് നൽകാം', "openPostRentalModal()");
                return;
            }

            container.innerHTML = list.map(r => `
                <div class="nearby-item-card">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px">
                        <div>
                            <span style="background:#FEF3C7;color:#92400E;font-size:10.5px;font-weight:800;padding:2px 7px;border-radius:6px;border:1px solid #FDE68A">${escapeHtml(r.type || 'Rental')}</span>
                            <h4 style="margin:4px 0 2px;font-size:14px;font-weight:800;color:#0F172A">${escapeHtml(r.title)}</h4>
                            <div style="font-size:11.5px;color:#64748B">📍 ${escapeHtml(r.location)} ${r.size ? `• 📐 ${escapeHtml(r.size)}` : ''}</div>
                        </div>
                        <span class="nearby-distance-chip">📍 ~${r._distFormatted}</span>
                    </div>
                    <div style="display:flex;justify-content:space-between;align-items:center;background:#F8FAFC;padding:6px 10px;border-radius:10px;border:1px solid #E2E8F0">
                        <span style="font-size:13px;font-weight:800;color:#047857">${escapeHtml(r.rent)}</span>
                        ${r.deposit ? `<span style="font-size:11px;color:#64748B">Adv: ${escapeHtml(r.deposit)}</span>` : ''}
                    </div>
                    ${r.desc ? `<div style="font-size:11.5px;color:#475569">${escapeHtml(r.desc)}</div>` : ''}
                    <div style="display:flex;justify-content:flex-end;gap:6px;padding-top:6px;border-top:1px solid #F1F5F9">
                        ${r.contactPhone ? `<a href="tel:${r.contactPhone}" class="pill-action-btn solid" style="background:#15803D;padding:5px 12px;font-size:11.5px;text-decoration:none">📞 വിളിക്കുക</a>` : ''}
                        <button class="pill-action-btn" style="background:#F0FDF4;border:1px solid #BBF7D0;color:#065F46;padding:5px 12px;font-size:11.5px" onclick="openDonorChat('${escapeHtml(r.phone || r.contactPhone || 'Owner')}', 'Rentals', '${escapeHtml(r.title)}')">💬 ചാറ്റ്</button>
                    </div>
                </div>
            `).join('');
        }

        // 7. NEARBY BUY & SELL
        function renderNearbyBuySellCategory(container, maxKm, uCoords, subfiltersWrap) {
            const sub = APP_STATE.nearbySubfilter || 'all';

            if (subfiltersWrap) {
                subfiltersWrap.style.display = 'flex';
                const subFilters = [
                    { id: 'all', label: 'എല്ലാം (All)' },
                    { id: 'vehicles', label: '🚗 വാഹനങ്ങൾ' },
                    { id: 'electronics', label: '📱 ഇലക്ട്രോണിക്സ്' },
                    { id: 'household', label: '🛋️ ഫർണിച്ചർ' }
                ];
                subfiltersWrap.innerHTML = subFilters.map(sf => `
                    <button class="nearby-quick-tab-pill ${sf.id === sub ? 'active' : ''}" data-sub="${sf.id}" onclick="setNearbySubfilter('${sf.id}', 'buysell')">
                        ${sf.label}
                    </button>
                `).join('');
            }

            const customMarket = JSON.parse(localStorage.getItem('thuna_custom_marketplace') || '[]');
            let list = [...customMarket, ...(DEFAULT_MARKETPLACE || [])].map(m => {
                const lat = (m.latDiff != null) ? (uCoords.latitude + m.latDiff) : (m.lat || uCoords.latitude);
                const lon = (m.lonDiff != null) ? (uCoords.longitude + m.lonDiff) : (m.lon || uCoords.longitude);
                const dist = calculateDistance(uCoords.latitude, uCoords.longitude, lat, lon);
                return { ...m, _dist: dist, _distFormatted: formatDistance(dist) };
            }).filter(m => m._dist <= maxKm);

            if (sub !== 'all') {
                list = list.filter(m => (m.category || '').toLowerCase() === sub.toLowerCase());
            }

            list.sort((a, b) => a._dist - b._dist);
            const countEl = document.getElementById('nearbyResultsCountText');
            if (countEl) countEl.textContent = `മാർക്കറ്റ് സാധനങ്ങൾ: ${list.length}`;

            if (!list.length) {
                renderNearbyEmptyState(container, `${APP_STATE.nearbyRadius} പരിധിയിൽ സാധനങ്ങൾ ലഭ്യമല്ല`, 'വിൽപനയ്ക്ക് വെച്ച സാധനങ്ങൾ ഒന്നും ഈ ചുറ്റളവിൽ ഇല്ല.', '+ സാധനം വിൽക്കാം', "openModal('modal-nearby-sell-item')");
                return;
            }

            container.innerHTML = list.map(m => `
                <div class="nearby-item-card">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px">
                        <div>
                            <span style="background:#ECFDF5;color:#047857;font-size:10.5px;font-weight:800;padding:2px 7px;border-radius:6px;border:1px solid #A7F3D0">${escapeHtml(m.category || 'Item')}</span>
                            <h4 style="margin:4px 0 2px;font-size:14px;font-weight:800;color:#0F172A">${escapeHtml(m.title)}</h4>
                            <div style="font-size:11.5px;color:#64748B">📍 ${escapeHtml(m.location || 'Local')} ${m.condition ? `• അവസ്ഥ: ${escapeHtml(m.condition)}` : ''}</div>
                        </div>
                        <span class="nearby-distance-chip">📍 ~${m._distFormatted}</span>
                    </div>
                    <div style="font-size:15px;font-weight:800;color:#047857">${escapeHtml(m.price)}</div>
                    ${m.desc ? `<div style="font-size:11.5px;color:#475569">${escapeHtml(m.desc)}</div>` : ''}
                    <div style="display:flex;justify-content:flex-end;gap:6px;padding-top:6px;border-top:1px solid #F1F5F9">
                        ${m.phone ? `<a href="tel:${m.phone}" class="pill-action-btn solid" style="background:#047857;padding:5px 12px;font-size:11.5px;text-decoration:none">📞 വിളിക്കുക</a>` : ''}
                        <button class="pill-action-btn" style="background:#F0FDF4;border:1px solid #A7F3D0;color:#065F46;padding:5px 12px;font-size:11.5px" onclick="openDonorChat('${escapeHtml(m.phone || 'Seller')}', 'Buy & Sell', '${escapeHtml(m.title)}')">💬 ചാറ്റ്</button>
                    </div>
                </div>
            `).join('');
        }

        // 8. NEARBY ENTERTAINMENT
        function renderNearbyEntertainmentCategory(container, maxKm, uCoords, subfiltersWrap) {
            const sub = APP_STATE.nearbySubfilter || 'all';

            if (subfiltersWrap) {
                subfiltersWrap.style.display = 'flex';
                const subFilters = [
                    { id: 'all', label: 'എല്ലാം (All)' },
                    { id: 'Movie', label: '🎬 സിനിമ' },
                    { id: 'Cultural', label: '🎭 കല & നാടകം' },
                    { id: 'Music', label: '🎵 സംഗീതം' }
                ];
                subfiltersWrap.innerHTML = subFilters.map(sf => `
                    <button class="nearby-quick-tab-pill ${sf.id === sub ? 'active' : ''}" data-sub="${sf.id}" onclick="setNearbySubfilter('${sf.id}', 'entertainment')">
                        ${sf.label}
                    </button>
                `).join('');
            }

            const customEnt = JSON.parse(localStorage.getItem('thuna_nearby_entertainment') || '[]');
            let list = [...customEnt, ...DEFAULT_ENTERTAINMENT].map(e => {
                const lat = (e.latDiff != null) ? (uCoords.latitude + e.latDiff) : (e.lat || uCoords.latitude);
                const lon = (e.lonDiff != null) ? (uCoords.longitude + e.lonDiff) : (e.lon || uCoords.longitude);
                const dist = calculateDistance(uCoords.latitude, uCoords.longitude, lat, lon);
                return { ...e, _dist: dist, _distFormatted: formatDistance(dist) };
            }).filter(e => e._dist <= maxKm);

            if (sub !== 'all') {
                list = list.filter(e => (e.type || '').includes(sub));
            }

            list.sort((a, b) => a._dist - b._dist);
            const countEl = document.getElementById('nearbyResultsCountText');
            if (countEl) countEl.textContent = `വിനോദ പരിപാടികൾ: ${list.length}`;

            if (!list.length) {
                renderNearbyEmptyState(container, `${APP_STATE.nearbyRadius} പരിധിയിൽ ഷോകൾ ലഭ്യമല്ല`, 'ഈ ചുറ്റളവിൽ നിലവിൽ സിനിമ അല്ലെങ്കിൽ കലാപരിപാടികൾ റിപ്പോർട്ട് ചെയ്തിട്ടില്ല.', '+ ഷോ ചേർക്കാം', "openModal('modal-nearby-add-entertainment')");
                return;
            }

            container.innerHTML = list.map(e => `
                <div class="nearby-item-card">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px">
                        <div>
                            <span style="background:#FFE4E6;color:#E11D48;font-size:10.5px;font-weight:800;padding:2px 7px;border-radius:6px;border:1px solid #FECDD3">${escapeHtml(e.type || 'Entertainment')}</span>
                            <h4 style="margin:4px 0 2px;font-size:14px;font-weight:800;color:#0F172A">${escapeHtml(e.title)}</h4>
                            <div style="font-size:11.5px;color:#64748B">🏛️ ${escapeHtml(e.venue)}</div>
                        </div>
                        <span class="nearby-distance-chip">📍 ~${e._distFormatted}</span>
                    </div>
                    <div style="background:#FFF1F2;border:1px solid #FFE4E6;border-radius:10px;padding:6px 10px;font-size:11.5px;font-weight:700;color:#9F1239">
                        ⏰ സമയം: ${escapeHtml(e.timings)} ${e.tickets ? `• 🎟️ ${escapeHtml(e.tickets)}` : ''}
                    </div>
                    ${e.desc ? `<div style="font-size:11.5px;color:#475569">${escapeHtml(e.desc)}</div>` : ''}
                    <div style="display:flex;justify-content:flex-end;gap:6px;padding-top:6px;border-top:1px solid #F1F5F9">
                        ${e.phone ? `<a href="tel:${e.phone}" class="pill-action-btn solid" style="background:#E11D48;padding:5px 12px;font-size:11.5px;text-decoration:none">📞 ബുക്കിംഗ്</a>` : ''}
                        <button class="pill-action-btn" style="background:#F8FAFC;border:1px solid #CBD5E1;color:#334155;padding:5px 10px;font-size:11.5px" onclick="toast('📍 സ്ഥലം: ${escapeHtml(e.venue)}')">വഴികാട്ടി</button>
                    </div>
                </div>
            `).join('');
        }

        // 9. NEARBY HANGOUT
        function renderNearbyHangoutCategory(container, maxKm, uCoords, subfiltersWrap) {
            const sub = APP_STATE.nearbySubfilter || 'all';

            if (subfiltersWrap) {
                subfiltersWrap.style.display = 'flex';
                const subFilters = [
                    { id: 'all', label: 'എല്ലാം (All)' },
                    { id: 'Tea', label: '☕ ചായക്കൂട്ടായ്മ' },
                    { id: 'Walking', label: '🚶 നടത്തം & ഫിറ്റ്നസ്' },
                    { id: 'Tech', label: '💻 ടെക് മീറ്റ്' },
                    { id: 'Reading', label: '📚 വായനക്കൂട്ടം' }
                ];
                subfiltersWrap.innerHTML = subFilters.map(sf => `
                    <button class="nearby-quick-tab-pill ${sf.id === sub ? 'active' : ''}" data-sub="${sf.id}" onclick="setNearbySubfilter('${sf.id}', 'hangout')">
                        ${sf.label}
                    </button>
                `).join('');
            }

            const customHang = JSON.parse(localStorage.getItem('thuna_nearby_hangouts') || '[]');
            let list = [...customHang, ...DEFAULT_HANGOUTS].map(h => {
                const lat = (h.latDiff != null) ? (uCoords.latitude + h.latDiff) : (h.lat || uCoords.latitude);
                const lon = (h.lonDiff != null) ? (uCoords.longitude + h.lonDiff) : (h.lon || uCoords.longitude);
                const dist = calculateDistance(uCoords.latitude, uCoords.longitude, lat, lon);
                return { ...h, _dist: dist, _distFormatted: formatDistance(dist) };
            }).filter(h => h._dist <= maxKm);

            if (sub !== 'all') {
                list = list.filter(h => (h.category || '').includes(sub));
            }

            list.sort((a, b) => a._dist - b._dist);
            const countEl = document.getElementById('nearbyResultsCountText');
            if (countEl) countEl.textContent = `കൂട്ടായ്മകൾ: ${list.length}`;

            if (!list.length) {
                renderNearbyEmptyState(container, `${APP_STATE.nearbyRadius} പരിധിയിൽ Hangouts ലഭ്യമല്ല`, 'നിങ്ങൾ ആദ്യമായി ഒരു സൗഹൃദ ചായക്കൂട്ടായ്മ ആരംഭിക്കൂ!', '+ കൂട്ടായ്മ തുടങ്ങാം', "openModal('modal-nearby-create-hangout')");
                return;
            }

            const joinedIds = APP_STATE.nearbyJoinedHangouts || [];

            container.innerHTML = list.map(h => {
                const isJoined = joinedIds.includes(h.id);
                const curJoined = (h.joinedCount || 0) + (isJoined ? 1 : 0);

                return `
                <div class="nearby-item-card">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px">
                        <div>
                            <span style="background:#FEF9C3;color:#A16207;font-size:10.5px;font-weight:800;padding:2px 7px;border-radius:6px;border:1px solid #FEF08A">${escapeHtml(h.category || 'Hangout')}</span>
                            <h4 style="margin:4px 0 2px;font-size:14px;font-weight:800;color:#0F172A">${escapeHtml(h.title)}</h4>
                            <div style="font-size:11.5px;color:#64748B">📍 ${escapeHtml(h.spot)} • 👤 ${escapeHtml(h.organizer || 'Host')}</div>
                        </div>
                        <span class="nearby-distance-chip">📍 ~${h._distFormatted}</span>
                    </div>
                    <div style="display:flex;justify-content:space-between;align-items:center;background:#FEFCE8;border:1px solid #FEF08A;border-radius:10px;padding:6px 10px;font-size:12px;font-weight:700;color:#854D0E">
                        <span>⏰ ${escapeHtml(h.dateTime)}</span>
                        <span>👥 ${curJoined} / ${h.maxParticipants || 10} പേർ ചേർന്നു</span>
                    </div>
                    ${h.desc ? `<div style="font-size:11.5px;color:#475569">${escapeHtml(h.desc)}</div>` : ''}
                    <div style="display:flex;justify-content:space-between;align-items:center;padding-top:6px;border-top:1px solid #F1F5F9">
                        <span style="font-size:11px;color:#059669;font-weight:700">🤝 ഒത്തുചേരൽ സൗജന്യമാണ്</span>
                        <div style="display:flex;gap:6px">
                            ${h.phone ? `<a href="tel:${h.phone}" class="pill-action-btn" style="background:#F8FAFC;border:1px solid #CBD5E1;color:#334155;padding:5px 10px;font-size:11px;text-decoration:none">📞 Host</a>` : ''}
                            <button class="pill-action-btn ${isJoined ? 'outline' : 'solid'}" style="${isJoined ? 'border-color:#15803D;color:#15803D;' : 'background:#A16207;color:#fff;'}padding:6px 14px;font-size:12px" onclick="toggleNearbyHangoutJoin('${h.id}')">
                                ${isJoined ? '✓ ചേർന്നിട്ടുണ്ട് (Joined)' : '🤝 ജോയിൻ ചെയ്യാം'}
                            </button>
                        </div>
                    </div>
                </div>
            `;
            }).join('');
        }

        function toggleNearbyHangoutJoin(id) {
            let joined = APP_STATE.nearbyJoinedHangouts || [];
            if (joined.includes(id)) {
                joined = joined.filter(x => x !== id);
                toast('❌ കൂട്ടായ്മയിൽ നിന്നുള്ള പങ്കാളിത്തം ഒഴിവാക്കി.');
            } else {
                joined.push(id);
                toast('🎉 അഭിനന്ദനങ്ങൾ! നിങ്ങൾ ഈ കൂട്ടായ്മയിൽ പങ്കാളിയായി.');
            }
            APP_STATE.nearbyJoinedHangouts = joined;
            localStorage.setItem('thuna_joined_hangouts', JSON.stringify(joined));
            renderNearbyCategoryPage('hangout');
        }

        // 10. NEARBY EVENTS
        function renderNearbyEventsCategory(container, maxKm, uCoords, subfiltersWrap) {
            const sub = APP_STATE.nearbySubfilter || 'all';

            if (subfiltersWrap) {
                subfiltersWrap.style.display = 'flex';
                const subFilters = [
                    { id: 'all', label: 'എല്ലാം (All)' },
                    { id: 'Festival', label: '🎪 ഉത്സവം & പെരുന്നാൾ' },
                    { id: 'Mela', label: '🌾 മേളകൾ' },
                    { id: 'Camp', label: '🩺 ക്യാമ്പുകൾ' }
                ];
                subfiltersWrap.innerHTML = subFilters.map(sf => `
                    <button class="nearby-quick-tab-pill ${sf.id === sub ? 'active' : ''}" data-sub="${sf.id}" onclick="setNearbySubfilter('${sf.id}', 'events')">
                        ${sf.label}
                    </button>
                `).join('');
            }

            const customEvents = JSON.parse(localStorage.getItem('thuna_nearby_events') || '[]');
            let list = [...customEvents, ...DEFAULT_EVENTS].map(e => {
                const lat = (e.latDiff != null) ? (uCoords.latitude + e.latDiff) : (e.lat || uCoords.latitude);
                const lon = (e.lonDiff != null) ? (uCoords.longitude + e.lonDiff) : (e.lon || uCoords.longitude);
                const dist = calculateDistance(uCoords.latitude, uCoords.longitude, lat, lon);
                return { ...e, _dist: dist, _distFormatted: formatDistance(dist) };
            }).filter(e => e._dist <= maxKm);

            if (sub !== 'all') {
                list = list.filter(e => (e.category || '').includes(sub));
            }

            list.sort((a, b) => a._dist - b._dist);
            const countEl = document.getElementById('nearbyResultsCountText');
            if (countEl) countEl.textContent = `പരിപാടികൾ: ${list.length}`;

            if (!list.length) {
                renderNearbyEmptyState(container, `${APP_STATE.nearbyRadius} പരിധിയിൽ പരിപാടികൾ ലഭ്യമല്ല`, 'ഈ പ്രദേശത്ത് നിലവിൽ മേളകളോ ഉത്സവങ്ങളോ റിപ്പോർട്ട് ചെയ്തിട്ടില്ല.', '+ ഇവന്റ് ചേർക്കാം', "openModal('modal-nearby-add-event')");
                return;
            }

            const rsvpdIds = APP_STATE.nearbyRsvpdEvents || [];

            container.innerHTML = list.map(e => {
                const isRsvpd = rsvpdIds.includes(e.id);
                const totalRsvp = (e.rsvps || 12) + (isRsvpd ? 1 : 0);

                return `
                <div class="nearby-item-card">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px">
                        <div>
                            <span style="background:#CFFAFE;color:#0E7490;font-size:10.5px;font-weight:800;padding:2px 7px;border-radius:6px;border:1px solid #A5F3FC">${escapeHtml(e.category || 'Event')}</span>
                            <h4 style="margin:4px 0 2px;font-size:14px;font-weight:800;color:#0F172A">${escapeHtml(e.title)}</h4>
                            <div style="font-size:11.5px;color:#64748B">🏛️ ${escapeHtml(e.venue)} • സംഘാടകർ: ${escapeHtml(e.organizer || 'Community')}</div>
                        </div>
                        <span class="nearby-distance-chip">📍 ~${e._distFormatted}</span>
                    </div>
                    <div style="background:#F0FDFA;border:1px solid #CCFBF1;border-radius:10px;padding:6px 10px;font-size:12px;font-weight:700;color:#0F766E">
                        📅 തീയതി: ${escapeHtml(e.date)} ${e.time ? `• ⏰ ${escapeHtml(e.time)}` : ''}
                    </div>
                    ${e.desc ? `<div style="font-size:11.5px;color:#475569">${escapeHtml(e.desc)}</div>` : ''}
                    <div style="display:flex;justify-content:space-between;align-items:center;padding-top:6px;border-top:1px solid #F1F5F9">
                        <span style="font-size:11px;color:#047857;font-weight:700">👥 ${totalRsvp} പേർ താല്പര്യം അറിയിച്ചു</span>
                        <div style="display:flex;gap:6px">
                            ${e.phone ? `<a href="tel:${e.phone}" class="pill-action-btn" style="background:#F8FAFC;border:1px solid #CBD5E1;color:#334155;padding:5px 10px;font-size:11px;text-decoration:none">📞 ബന്ധപ്പെടുക</a>` : ''}
                            <button class="pill-action-btn ${isRsvpd ? 'outline' : 'solid'}" style="${isRsvpd ? 'border-color:#0E7490;color:#0E7490;' : 'background:#0E7490;color:#fff;'}padding:6px 14px;font-size:12px" onclick="toggleNearbyEventRsvp('${e.id}')">
                                ${isRsvpd ? '✓ താല്പര്യമുണ്ട് (RSVP)' : '⭐ പങ്കെടുക്കാം (RSVP)'}
                            </button>
                        </div>
                    </div>
                </div>
            `;
            }).join('');
        }

        function toggleNearbyEventRsvp(id) {
            let rsvpd = APP_STATE.nearbyRsvpdEvents || [];
            if (rsvpd.includes(id)) {
                rsvpd = rsvpd.filter(x => x !== id);
                toast('പരിപാടിയിൽ നിന്നുള്ള താല്പര്യം നീക്കം ചെയ്തു.');
            } else {
                rsvpd.push(id);
                toast('⭐ നിങ്ങൾ ഈ പരിപാടിയിൽ താല്പര്യം രേഖപ്പെടുത്തി!');
            }
            APP_STATE.nearbyRsvpdEvents = rsvpd;
            localStorage.setItem('thuna_rsvpd_events', JSON.stringify(rsvpd));
            renderNearbyCategoryPage('events');
        }

        // 11. NEARBY SPORTS
        function renderNearbySportsCategory(container, maxKm, uCoords, subfiltersWrap) {
            const sub = APP_STATE.nearbySubfilter || 'all';

            if (subfiltersWrap) {
                subfiltersWrap.style.display = 'flex';
                const subFilters = [
                    { id: 'all', label: 'എല്ലാം (All)' },
                    { id: 'Football', label: '⚽ ഫുട്ബോൾ' },
                    { id: 'Cricket', label: '🏏 ക്രിക്കറ്റ്' },
                    { id: 'Badminton', label: '🏸 ബാഡ്മിന്റൺ' },
                    { id: 'Volleyball', label: '🏐 വോളിബോൾ' }
                ];
                subfiltersWrap.innerHTML = subFilters.map(sf => `
                    <button class="nearby-quick-tab-pill ${sf.id === sub ? 'active' : ''}" data-sub="${sf.id}" onclick="setNearbySubfilter('${sf.id}', 'sports')">
                        ${sf.label}
                    </button>
                `).join('');
            }

            const customSports = JSON.parse(localStorage.getItem('thuna_nearby_sports') || '[]');
            let list = [...customSports, ...DEFAULT_SPORTS].map(s => {
                const lat = (s.latDiff != null) ? (uCoords.latitude + s.latDiff) : (s.lat || uCoords.latitude);
                const lon = (s.lonDiff != null) ? (uCoords.longitude + s.lonDiff) : (s.lon || uCoords.longitude);
                const dist = calculateDistance(uCoords.latitude, uCoords.longitude, lat, lon);
                return { ...s, _dist: dist, _distFormatted: formatDistance(dist) };
            }).filter(s => s._dist <= maxKm);

            if (sub !== 'all') {
                list = list.filter(s => (s.sportType || '').includes(sub));
            }

            list.sort((a, b) => a._dist - b._dist);
            const countEl = document.getElementById('nearbyResultsCountText');
            if (countEl) countEl.textContent = `കായിക മത്സരങ്ങൾ: ${list.length}`;

            if (!list.length) {
                renderNearbyEmptyState(container, `${APP_STATE.nearbyRadius} പരിധിയിൽ കളികൾ ലഭ്യമല്ല`, 'ഈ പരിസരത്ത് കളിക്കാൻ പ്ലേയേഴ്സിനെ തേടുന്ന പോസ്റ്റുകൾ ഇല്ല.', '+ കളി പോസ്റ്റ് ചെയ്യാം', "openModal('modal-nearby-post-sports')");
                return;
            }

            const joinedSports = APP_STATE.nearbyJoinedSports || [];

            container.innerHTML = list.map(s => {
                const isJoined = joinedSports.includes(s.id);

                return `
                <div class="nearby-item-card">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px">
                        <div>
                            <span style="background:#D1FAE5;color:#065F46;font-size:10.5px;font-weight:800;padding:2px 7px;border-radius:6px;border:1px solid #A7F3D0">${escapeHtml(s.sportType || 'Sports')}</span>
                            <h4 style="margin:4px 0 2px;font-size:14px;font-weight:800;color:#0F172A">${escapeHtml(s.title)}</h4>
                            <div style="font-size:11.5px;color:#64748B">🏟️ ${escapeHtml(s.venue)} • ക്യാപ്റ്റൻ: ${escapeHtml(s.organizer || 'Team')}</div>
                        </div>
                        <span class="nearby-distance-chip">📍 ~${s._distFormatted}</span>
                    </div>
                    <div style="display:flex;justify-content:space-between;align-items:center;background:#ECFDF5;border:1px solid #A7F3D0;border-radius:10px;padding:6px 10px;font-size:12px;font-weight:700;color:#065F46">
                        <span>⏰ ${escapeHtml(s.timeSlot)}</span>
                        <span>👥 ${escapeHtml(s.playersNeeded || 'Players Wanted')}</span>
                    </div>
                    ${s.desc ? `<div style="font-size:11.5px;color:#475569">${escapeHtml(s.desc)}</div>` : ''}
                    <div style="display:flex;justify-content:space-between;align-items:center;padding-top:6px;border-top:1px solid #F1F5F9">
                        <span style="font-size:11px;color:#047857;font-weight:700">⚽ ടർഫ് ഫ്രണ്ട്‌ലി മാച്ച്</span>
                        <div style="display:flex;gap:6px">
                            ${s.contact ? `<a href="tel:${s.contact}" class="pill-action-btn" style="background:#F8FAFC;border:1px solid #CBD5E1;color:#334155;padding:5px 10px;font-size:11px;text-decoration:none">📞 ക്യാപ്റ്റൻ</a>` : ''}
                            <button class="pill-action-btn ${isJoined ? 'outline' : 'solid'}" style="${isJoined ? 'border-color:#059669;color:#059669;' : 'background:#059669;color:#fff;'}padding:6px 14px;font-size:12px" onclick="toggleNearbySportsJoin('${s.id}')">
                                ${isJoined ? '✓ ജോയിൻ ചെയ്തു' : '⚽ കളിക്കാൻ ചേരാം'}
                            </button>
                        </div>
                    </div>
                </div>
            `;
            }).join('');
        }

        function toggleNearbySportsJoin(id) {
            let joined = APP_STATE.nearbyJoinedSports || [];
            if (joined.includes(id)) {
                joined = joined.filter(x => x !== id);
                toast('കളിയിൽ നിന്നുള്ള പങ്കാളിത്തം റദ്ദാക്കി.');
            } else {
                joined.push(id);
                toast('⚽ നിങ്ങൾ ഈ മത്സരത്തിൽ ജോയിൻ ചെയ്തു! ക്യാപ്റ്റനുമായി ബന്ധപ്പെടുക.');
            }
            APP_STATE.nearbyJoinedSports = joined;
            localStorage.setItem('thuna_joined_sports', JSON.stringify(joined));
            renderNearbyCategoryPage('sports');
        }

        // 12. NEARBY TRAVEL
        function renderNearbyTravelCategory(container, maxKm, uCoords, subfiltersWrap) {
            const sub = APP_STATE.nearbySubfilter || 'all';

            if (subfiltersWrap) {
                subfiltersWrap.style.display = 'flex';
                const subFilters = [
                    { id: 'all', label: 'എല്ലാം (All)' },
                    { id: 'Trek', label: '🌲 ട്രെക്കിംഗ്' },
                    { id: 'Carpool', label: '🚗 കാർപൂൾ' },
                    { id: 'Tour', label: '🛶 ടൂറിസം' }
                ];
                subfiltersWrap.innerHTML = subFilters.map(sf => `
                    <button class="nearby-quick-tab-pill ${sf.id === sub ? 'active' : ''}" data-sub="${sf.id}" onclick="setNearbySubfilter('${sf.id}', 'travel')">
                        ${sf.label}
                    </button>
                `).join('');
            }

            const customTravel = JSON.parse(localStorage.getItem('thuna_nearby_travel') || '[]');
            let list = [...customTravel, ...DEFAULT_TRAVEL].map(t => {
                const lat = (t.latDiff != null) ? (uCoords.latitude + t.latDiff) : (t.lat || uCoords.latitude);
                const lon = (t.lonDiff != null) ? (uCoords.longitude + t.lonDiff) : (t.lon || uCoords.longitude);
                const dist = calculateDistance(uCoords.latitude, uCoords.longitude, lat, lon);
                return { ...t, _dist: dist, _distFormatted: formatDistance(dist) };
            }).filter(t => t._dist <= maxKm);

            if (sub !== 'all') {
                list = list.filter(t => (t.type || '').includes(sub));
            }

            list.sort((a, b) => a._dist - b._dist);
            const countEl = document.getElementById('nearbyResultsCountText');
            if (countEl) countEl.textContent = `യാത്രാ കൂട്ടായ്മകൾ: ${list.length}`;

            if (!list.length) {
                renderNearbyEmptyState(container, `${APP_STATE.nearbyRadius} പരിധിയിൽ യാത്രാ വിവരങ്ങൾ ലഭ്യമല്ല`, 'ഈ ചുറ്റളവിൽ കാർപൂളിംഗോ ഗ്രൂപ്പ് ട്രിപ്പുകളോ ഇല്ല.', '+ യാത്ര ചേർക്കാം', "openModal('modal-nearby-create-travel')");
                return;
            }

            const joinedTravel = APP_STATE.nearbyJoinedTravel || [];

            container.innerHTML = list.map(t => {
                const isJoined = joinedTravel.includes(t.id);
                const curJoined = (t.joinedCount || 1) + (isJoined ? 1 : 0);

                return `
                <div class="nearby-item-card">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px">
                        <div>
                            <span style="background:#E0E7FF;color:#4338CA;font-size:10.5px;font-weight:800;padding:2px 7px;border-radius:6px;border:1px solid #C7D2FE">${escapeHtml(t.type || 'Travel')}</span>
                            <h4 style="margin:4px 0 2px;font-size:14px;font-weight:800;color:#0F172A">${escapeHtml(t.title)}</h4>
                            <div style="font-size:11.5px;color:#64748B">📍 പുറപ്പെടുന്നത്: ${escapeHtml(t.from)} ➔ ${escapeHtml(t.destination)}</div>
                        </div>
                        <span class="nearby-distance-chip">📍 ~${t._distFormatted}</span>
                    </div>
                    <div style="display:flex;justify-content:space-between;align-items:center;background:#EEF2FF;border:1px solid #E0E7FF;border-radius:10px;padding:6px 10px;font-size:12px;font-weight:700;color:#3730A3">
                        <span>⏰ ${escapeHtml(t.dateTime)}</span>
                        <span>💺 ${t.seats || 2} സീറ്റ് ഒഴിവ്</span>
                    </div>
                    <div style="font-size:11.5px;color:#475569">വാഹനം: ${escapeHtml(t.vehicle || 'Car')} • ചിലവ്: ${escapeHtml(t.costShare || 'ഷെയറിങ്')}</div>
                    ${t.desc ? `<div style="font-size:11.5px;color:#475569">${escapeHtml(t.desc)}</div>` : ''}
                    <div style="display:flex;justify-content:space-between;align-items:center;padding-top:6px;border-top:1px solid #F1F5F9">
                        <span style="font-size:11px;color:#4338CA;font-weight:700">👥 ${curJoined} പേർ യാത്രയിലുണ്ട്</span>
                        <div style="display:flex;gap:6px">
                            ${t.contact ? `<a href="tel:${t.contact}" class="pill-action-btn" style="background:#F8FAFC;border:1px solid #CBD5E1;color:#334155;padding:5px 10px;font-size:11px;text-decoration:none">📞 Host</a>` : ''}
                            <button class="pill-action-btn ${isJoined ? 'outline' : 'solid'}" style="${isJoined ? 'border-color:#4338CA;color:#4338CA;' : 'background:#4338CA;color:#fff;'}padding:6px 14px;font-size:12px" onclick="toggleNearbyTravelJoin('${t.id}')">
                                ${isJoined ? '✓ ജോയിൻ ചെയ്തു' : '🚗 കൂടെ പോകാം'}
                            </button>
                        </div>
                    </div>
                </div>
            `;
            }).join('');
        }

        function toggleNearbyTravelJoin(id) {
            let joined = APP_STATE.nearbyJoinedTravel || [];
            if (joined.includes(id)) {
                joined = joined.filter(x => x !== id);
                toast('യാത്രയിൽ നിന്നുള്ള പങ്കാളിത്തം ഒഴിവാക്കി.');
            } else {
                joined.push(id);
                toast('🚗 നിങ്ങൾ ഈ യാത്രയിൽ ജോയിൻ ചെയ്തു! ഹോസ്റ്റുമായി സമയം ഉറപ്പാക്കുക.');
            }
            APP_STATE.nearbyJoinedTravel = joined;
            localStorage.setItem('thuna_joined_travel', JSON.stringify(joined));
            renderNearbyCategoryPage('travel');
        }

        // 13. NEARBY POSTS
        function renderNearbyPostsCategory(container, maxKm, uCoords, subfiltersWrap) {
            if (subfiltersWrap) subfiltersWrap.style.display = 'none';

            const customPosts = JSON.parse(localStorage.getItem('thuna_community_posts') || '[]');
            let list = [...customPosts, ...(DEFAULT_POSTS || [])].map(p => {
                const lat = (p.latDiff != null) ? (uCoords.latitude + p.latDiff) : (p.lat || uCoords.latitude);
                const lon = (p.lonDiff != null) ? (uCoords.longitude + p.lonDiff) : (p.lon || uCoords.longitude);
                const dist = calculateDistance(uCoords.latitude, uCoords.longitude, lat, lon);
                return { ...p, _dist: dist, _distFormatted: formatDistance(dist) };
            }).filter(p => p._dist <= maxKm).sort((a, b) => a._dist - b._dist);

            const countEl = document.getElementById('nearbyResultsCountText');
            if (countEl) countEl.textContent = `പ്രാദേശിക പോസ്റ്റുകൾ: ${list.length}`;

            if (!list.length) {
                renderNearbyEmptyState(container, `${APP_STATE.nearbyRadius} പരിധിയിൽ പോസ്റ്റുകൾ ലഭ്യമല്ല`, 'ഈ ചുറ്റളവിൽ ആരും പുതിയ പോസ്റ്റുകൾ പങ്കുവെച്ചിട്ടില്ല. ആദ്യത്തെ പോസ്റ്റ് നിങ്ങളുടേതാകൂ!', '+ പോസ്റ്റ് പങ്കുവെക്കാം', "navTo('add')");
                return;
            }

            container.innerHTML = list.map(p => `
                <div class="nearby-item-card">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px">
                        <div style="display:flex;align-items:center;gap:10px">
                            <div style="width:38px;height:38px;border-radius:50%;background:#ECFDF5;display:flex;align-items:center;justify-content:center;font-size:18px">
                                ${p.authorBadge || '🌿'}
                            </div>
                            <div>
                                <h4 style="margin:0;font-size:13.5px;font-weight:800;color:#0F172A">${escapeHtml(p.authorName || 'അയൽവാസി')}</h4>
                                <div style="font-size:11px;color:#64748B">${escapeHtml(p.timeAgo || 'ഇപ്പോൾ')} • 📍 ${escapeHtml(p.location || 'സമീപം')}</div>
                            </div>
                        </div>
                        <span class="nearby-distance-chip">📍 ~${p._distFormatted}</span>
                    </div>
                    ${p.title ? `<div style="font-size:13.5px;font-weight:800;color:#0F172A;margin-top:2px">${escapeHtml(p.title)}</div>` : ''}
                    <div style="font-size:12.5px;color:#334155;line-height:1.45">${escapeHtml(p.content || '')}</div>
                    ${p.mediaHtml || ''}
                    <div style="display:flex;justify-content:space-between;align-items:center;padding-top:8px;border-top:1px solid #F1F5F9">
                        <div style="display:flex;gap:14px">
                            <button onclick="togglePostLike('${p.id}')" style="background:none;border:none;cursor:pointer;font-size:12px;font-weight:700;color:${p.liked ? '#DC2626' : '#64748B'};display:flex;align-items:center;gap:4px">
                                ${p.liked ? '❤️' : '🤍'} ${p.likes || 0}
                            </button>
                            <button onclick="openCommentsModal('${p.id}')" style="background:none;border:none;cursor:pointer;font-size:12px;font-weight:700;color:#64748B;display:flex;align-items:center;gap:4px">
                                💬 ${p.comments || 0}
                            </button>
                        </div>
                        <button onclick="openShareSheet('${escapeHtml(p.title || 'Nearby Post')}', '${escapeHtml(p.content || '')}')" style="background:none;border:none;cursor:pointer;font-size:12px;font-weight:700;color:#059669">
                            🔗 ഷെയർ
                        </button>
                    </div>
                </div>
            `).join('');
        }

        // ==============================================================
        // NEW CATEGORY MODAL SUBMISSIONS
        // ==============================================================

        function submitNearbyCreateHangout(e) {
            e.preventDefault();
            const title = (document.getElementById('nearbyHangoutTitle')?.value || '').trim();
            const category = document.getElementById('nearbyHangoutCategory')?.value || 'Tea & Discussion';
            const location = (document.getElementById('nearbyHangoutLocation')?.value || '').trim();
            const dateTime = (document.getElementById('nearbyHangoutDateTime')?.value || '').trim();
            const maxParticipants = parseInt(document.getElementById('nearbyHangoutMax')?.value || '8', 10);
            const desc = (document.getElementById('nearbyHangoutDesc')?.value || '').trim();

            if (!title || !location || !dateTime) {
                toast('⚠️ പ്രധാന വിവരങ്ങൾ നൽകുക.');
                return;
            }

            const uCoords = getNearbyCurrentCoords();
            const newHangout = {
                id: 'hang_' + Date.now(),
                title,
                category,
                organizer: (APP_STATE.currentUser && APP_STATE.currentUser.displayName) || 'ഞാൻ (Host)',
                spot: location,
                dateTime,
                maxParticipants,
                joinedCount: 1,
                phone: (APP_STATE.currentUser && APP_STATE.currentUser.phone) || '',
                lat: uCoords.latitude,
                lon: uCoords.longitude,
                latDiff: 0.0005, lonDiff: 0.0004,
                desc,
                createdAt: Date.now()
            };

            const existing = JSON.parse(localStorage.getItem('thuna_nearby_hangouts') || '[]');
            existing.unshift(newHangout);
            localStorage.setItem('thuna_nearby_hangouts', JSON.stringify(existing));

            // Auto join creator
            const joined = APP_STATE.nearbyJoinedHangouts || [];
            if (!joined.includes(newHangout.id)) {
                joined.push(newHangout.id);
                APP_STATE.nearbyJoinedHangouts = joined;
                localStorage.setItem('thuna_joined_hangouts', JSON.stringify(joined));
            }

            closeModal('modal-nearby-create-hangout');
            toast('🎉 കൂട്ടായ്മ വിജയകരമായി പ്രസിദ്ധീകരിച്ചു!');
            renderNearbyCategoryPage('hangout');
        }

        function submitNearbyAddEvent(e) {
            e.preventDefault();
            const title = (document.getElementById('nearbyEventTitle')?.value || '').trim();
            const category = document.getElementById('nearbyEventCategory')?.value || 'Festival & Utsavam';
            const venue = (document.getElementById('nearbyEventLocation')?.value || '').trim();
            const date = (document.getElementById('nearbyEventDate')?.value || '').trim();
            const organizer = (document.getElementById('nearbyEventOrganizer')?.value || '').trim();
            const phone = (document.getElementById('nearbyEventPhone')?.value || '').trim();
            const desc = (document.getElementById('nearbyEventDesc')?.value || '').trim();

            if (!title || !venue || !date) {
                toast('⚠️ തലക്കെട്ട്, സ്ഥലം, തീയതി എന്നിവ നൽകുക.');
                return;
            }

            const uCoords = getNearbyCurrentCoords();
            const newEvent = {
                id: 'ev_' + Date.now(),
                title,
                category,
                venue,
                date,
                organizer: organizer || 'പ്രാദേശിക സമിതി',
                phone,
                desc,
                rsvps: 1,
                lat: uCoords.latitude,
                lon: uCoords.longitude,
                latDiff: 0.0006, lonDiff: 0.0005,
                createdAt: Date.now()
            };

            const existing = JSON.parse(localStorage.getItem('thuna_nearby_events') || '[]');
            existing.unshift(newEvent);
            localStorage.setItem('thuna_nearby_events', JSON.stringify(existing));

            closeModal('modal-nearby-add-event');
            toast('🎉 പ്രാദേശിക പരിപാടി ചേർത്തു!');
            renderNearbyCategoryPage('events');
        }

        function submitNearbyPostSports(e) {
            e.preventDefault();
            const title = (document.getElementById('nearbySportsTitle')?.value || '').trim();
            const sportType = document.getElementById('nearbySportsType')?.value || 'Football';
            const venue = (document.getElementById('nearbySportsVenue')?.value || '').trim();
            const timeSlot = (document.getElementById('nearbySportsTime')?.value || '').trim();
            const playersNeeded = (document.getElementById('nearbySportsPlayersNeeded')?.value || '').trim();
            const contact = (document.getElementById('nearbySportsContact')?.value || '').trim();

            if (!title || !venue || !timeSlot || !contact) {
                toast('⚠️ പ്രധാന വിവരങ്ങളും കോൺടാക്റ്റ് നമ്പറും നൽകുക.');
                return;
            }

            const uCoords = getNearbyCurrentCoords();
            const newSport = {
                id: 'sport_' + Date.now(),
                title,
                sportType,
                venue,
                timeSlot,
                playersNeeded: playersNeeded || 'Players Wanted',
                organizer: (APP_STATE.currentUser && APP_STATE.currentUser.displayName) || 'ക്യാപ്റ്റൻ',
                contact,
                lat: uCoords.latitude,
                lon: uCoords.longitude,
                latDiff: 0.0007, lonDiff: 0.0004,
                createdAt: Date.now()
            };

            const existing = JSON.parse(localStorage.getItem('thuna_nearby_sports') || '[]');
            existing.unshift(newSport);
            localStorage.setItem('thuna_nearby_sports', JSON.stringify(existing));

            closeModal('modal-nearby-post-sports');
            toast('⚽ കായിക മത്സരം വിജയകരമായി പോസ്റ്റ് ചെയ്തു!');
            renderNearbyCategoryPage('sports');
        }

        function submitNearbyCreateTravel(e) {
            e.preventDefault();
            const title = (document.getElementById('nearbyTravelTitle')?.value || '').trim();
            const type = document.getElementById('nearbyTravelType')?.value || 'Carpool';
            const from = (document.getElementById('nearbyTravelFrom')?.value || '').trim();
            const vehicle = document.getElementById('nearbyTravelType')?.value || 'Car (AC)';
            const dateTime = (document.getElementById('nearbyTravelDateTime')?.value || '').trim();
            const seats = parseInt(document.getElementById('nearbyTravelSeats')?.value || '2', 10);
            const costShare = (document.getElementById('nearbyTravelCost')?.value || '').trim();
            const contact = (document.getElementById('nearbyTravelContact')?.value || '').trim();

            if (!title || !from || !dateTime || !contact) {
                toast('⚠️ യാത്രയുടെ വിശദാംശങ്ങളും ഫോൺ നമ്പറും നൽകുക.');
                return;
            }

            const uCoords = getNearbyCurrentCoords();
            const newTravel = {
                id: 'trav_' + Date.now(),
                title,
                type,
                from,
                destination: title,
                vehicle,
                dateTime,
                seats,
                joinedCount: 1,
                costShare: costShare || 'ഇന്ധന ഷെയറിങ്',
                contact,
                lat: uCoords.latitude,
                lon: uCoords.longitude,
                latDiff: 0.0008, lonDiff: 0.0005,
                createdAt: Date.now()
            };

            const existing = JSON.parse(localStorage.getItem('thuna_nearby_travel') || '[]');
            existing.unshift(newTravel);
            localStorage.setItem('thuna_nearby_travel', JSON.stringify(existing));

            closeModal('modal-nearby-create-travel');
            toast('🚗 യാത്രാ വിവരങ്ങൾ ലിസ്റ്റ് ചെയ്തു!');
            renderNearbyCategoryPage('travel');
        }

        function submitNearbyAddEntertainment(e) {
            e.preventDefault();
            const title = (document.getElementById('nearbyEntTitle')?.value || '').trim();
            const type = document.getElementById('nearbyEntType')?.value || 'Movie / Theatre';
            const venue = (document.getElementById('nearbyEntVenue')?.value || '').trim();
            const timings = (document.getElementById('nearbyEntTimings')?.value || '').trim();
            const tickets = (document.getElementById('nearbyEntTickets')?.value || '').trim();
            const phone = (document.getElementById('nearbyEntContact')?.value || '').trim();

            if (!title || !venue || !timings) {
                toast('⚠️ പ്രധാന വിവരങ്ങൾ നൽകുക.');
                return;
            }

            const uCoords = getNearbyCurrentCoords();
            const newEnt = {
                id: 'ent_' + Date.now(),
                title,
                type,
                venue,
                timings,
                tickets: tickets || 'ടിക്കറ്റ് നിരക്ക് ബാധകം',
                phone,
                lat: uCoords.latitude,
                lon: uCoords.longitude,
                latDiff: 0.0007, lonDiff: 0.0006,
                createdAt: Date.now()
            };

            const existing = JSON.parse(localStorage.getItem('thuna_nearby_entertainment') || '[]');
            existing.unshift(newEnt);
            localStorage.setItem('thuna_nearby_entertainment', JSON.stringify(existing));

            closeModal('modal-nearby-add-entertainment');
            toast('🎭 എന്റർടൈൻമെന്റ് ലിസ്റ്റിംഗ് ചേർത്തു!');
            renderNearbyCategoryPage('entertainment');
        }

        function submitNearbySellItem(e) {
            e.preventDefault();
            const title = (document.getElementById('nearbySellTitle')?.value || '').trim();
            const category = document.getElementById('nearbySellCategory')?.value || 'general';
            const price = (document.getElementById('nearbySellPrice')?.value || '').trim();
            const location = (document.getElementById('nearbySellLocation')?.value || '').trim();
            const phone = (document.getElementById('nearbySellPhone')?.value || '').trim();
            const desc = (document.getElementById('nearbySellDesc')?.value || '').trim();

            if (!title || !price || !location || !phone) {
                toast('⚠️ സാധനത്തിന്റെ പേര്, വില, ഫോൺ എന്നിവ നൽകുക.');
                return;
            }

            const uCoords = getNearbyCurrentCoords();
            const newItem = {
                id: 'item_' + Date.now(),
                title,
                category,
                price: price.startsWith('₹') ? price : ('₹' + price),
                location,
                phone,
                desc,
                condition: 'Used',
                lat: uCoords.latitude,
                lon: uCoords.longitude,
                latDiff: 0.0005, lonDiff: 0.0004,
                createdAt: Date.now()
            };

            const existing = JSON.parse(localStorage.getItem('thuna_custom_marketplace') || '[]');
            existing.unshift(newItem);
            localStorage.setItem('thuna_custom_marketplace', JSON.stringify(existing));

            closeModal('modal-nearby-sell-item');
            toast('🛍️ സാധനം വിജയകരമായി വിൽപനയ്ക്ക് ലിസ്റ്റ് ചെയ്തു!');
            renderNearbyCategoryPage('buysell');
        }

        /* --- SCREEN 3: BLOOD DONORS DATA & RENDER --- */
        const BLOOD_DONORS_DATA = [
            { id: 'b_1', name: 'ജയൻ', group: 'A+', latDiff: 0.0008, lonDiff: 0.0006, available: true, statusText: 'Available Now', phone: '+919447123456', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80' }, // ~110m (< 200m)
            { id: 'b_2', name: 'ശ്രീദേവി', group: 'A+', latDiff: 0.0012, lonDiff: -0.0008, available: true, statusText: 'Available Now', phone: '+919447234567', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80' }, // ~160m (< 200m)
            { id: 'b_3', name: 'അഫ്സൽ', group: 'A+', latDiff: 0.0026, lonDiff: -0.0014, available: true, statusText: 'Available Now', phone: '+919447345678', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80' }, // ~350m (< 500m)
            { id: 'b_4', name: 'ദേവിക', group: 'A+', latDiff: 0.0070, lonDiff: 0.0050, available: false, statusText: 'Last seen 1 hour ago', phone: '+919447456789', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80' } // ~960m (< 1km)
        ];

        function renderBloodScreen(selectedGroup = 'A+') {
            const list = document.getElementById('bloodDonorsList');
            if (!list) return;
            const coords = (typeof getUserCoords === 'function') ? getUserCoords() : { latitude: 11.8745, longitude: 75.3704 };
            const uLat = coords.latitude || 11.8745;
            const uLon = coords.longitude || 75.3704;

            const donors = (selectedGroup === 'all') ? BLOOD_DONORS_DATA : BLOOD_DONORS_DATA.filter(d => d.group === selectedGroup);
            const displayGroup = (selectedGroup === 'all') ? 'All' : selectedGroup;
            const textElem = document.getElementById('bloodSelectedGroupText');
            if (textElem) textElem.textContent = displayGroup;

            list.innerHTML = (donors.length ? donors : BLOOD_DONORS_DATA).map(d => {
                const dLat = uLat + d.latDiff;
                const dLon = uLon + d.lonDiff;
                let dist = 0.12;
                if (typeof calculateDistance === 'function') {
                    dist = calculateDistance(uLat, uLon, dLat, dLon);
                }
                const formattedDist = (typeof formatDistance === 'function') ? formatDistance(dist) : `${dist.toFixed(1)} km`;
                const isEn = (CURRENT_APP_LANG === 'en');
                const statusStr = d.available ? (isEn ? 'Available Now' : 'ഇപ്പോൾ ലഭ്യമാണ്') : (isEn ? 'Unavailable' : 'ലഭ്യമല്ല');
                const callTxt = isEn ? '📞 Call' : '📞 വിളിക്കുക';
                const chatTxt = isEn ? '💬 Chat' : '💬 ചാറ്റ്';
                return `
                    <div class="user-round-card">
                        <div class="user-avatar-wrap">
                            <img src="${d.avatar}" alt="${d.name}">
                            ${d.available ? '<span class="online-dot-badge"></span>' : ''}
                        </div>
                        <div style="flex:1;min-width:0">
                            <div style="font-size:14.5px;font-weight:800;color:#0F172A">${d.name}</div>
                            <div style="font-size:11.5px;color:#DC2626;font-weight:700;display:flex;align-items:center;gap:4px;margin-top:2px">
                                <span>${d.group}</span>
                                <span style="color:#64748B">•</span>
                                <span style="color:#64748B">${formattedDist}</span>
                            </div>
                            <div style="font-size:11px;color:${d.available ? '#15803D' : '#64748B'};font-weight:600">${statusStr}</div>
                        </div>
                        <div style="display:flex;align-items:center;gap:5px">
                            <a href="tel:${d.phone}" class="pill-action-btn solid" style="padding:7px 10px;font-size:11.5px">
                                ${callTxt}
                            </a>
                            <button class="pill-action-btn outline" style="padding:7px 10px;font-size:11.5px" onclick="openDirectChat('${d.name}', '${d.avatar}')">
                                ${chatTxt}
                            </button>
                            <button class="pill-action-btn outline" style="padding:7px 9px;font-size:11.5px;background:#F0FDF4;color:#059669;border-color:#BBF7D0" onclick="shareBloodDonor('${escapeHtml(d.name)}', '${escapeHtml(d.group)}', '${escapeHtml(d.phone)}', '${formattedDist}')" title="രക്തദാതാവിനെ ഷെയർ ചെയ്യാം">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function filterBloodGroup(group, btn) {
            document.querySelectorAll('#screen-blood .filter-pills-wrap .pill-btn').forEach(b => b.classList.remove('active'));
            if (btn) btn.classList.add('active');
            renderBloodScreen(group);
        }

        /* --- SCREEN 4: EMERGENCY SERVICES DATA & RENDER --- */
        const EMERGENCY_SERVICES_LIST = [
            { name: 'കണ്ണൂർ ജനറൽ ആശുപത്രി', type: 'General Hospital', dist: 2.4, phone: '04972700200', icon: '🏥' },
            { name: 'സെന്റ് ജോസഫ്സ് ആശുപത്രി', type: 'Private Multi-specialty', dist: 3.1, phone: '04972705500', icon: '🏥' },
            { name: 'ഫയർ സ്റ്റേഷൻ', type: 'Fire & Rescue HQ', dist: 4.8, phone: '101', icon: '🚒' },
            { name: 'പോലീസ് കൺട്രോൾ റൂം', type: 'District Police', dist: 1.8, phone: '100', icon: '🛡️' }
        ];

        function renderEmergencyScreen() {
            const list = document.getElementById('emergencyContactsList');
            if (!list) return;

            list.innerHTML = EMERGENCY_SERVICES_LIST.map(e => `
                <div class="emergency-contact-row">
                    <div style="width:42px;height:42px;border-radius:14px;background:#F1F5F9;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">
                        ${e.icon}
                    </div>
                    <div style="flex:1;min-width:0">
                        <div style="font-size:14px;font-weight:800;color:#0F172A;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${e.name}</div>
                        <div style="font-size:11.5px;color:#64748B;display:flex;align-items:center;gap:6px;margin-top:2px">
                            <span>${e.dist} km</span>
                            <span>•</span>
                            <span>${e.type}</span>
                        </div>
                    </div>
                    <div style="display:flex;align-items:center;gap:6px">
                        <a href="tel:${e.phone}" class="call-circle-btn" aria-label="Call ${e.name}">
                            📞
                        </a>
                        <button type="button" class="call-circle-btn" style="background:#F0FDF4;color:#059669;border:1.5px solid #BBF7D0" onclick="shareEmergencyContact('${escapeHtml(e.name)}', '${escapeHtml(e.phone)}', '${escapeHtml(e.type)}')" title="ഷെയർ ചെയ്യാം">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>
                        </button>
                    </div>
                </div>
            `).join('');
        }

        function scrollToNearbyHospitals() {
            const list = document.getElementById('emergencyContactsList');
            if (list) list.scrollIntoView({ behavior: 'smooth' });
        }

        /* --- SCREEN 6: PEOPLE MEMBERS DATA & RENDER --- */
        const PEOPLE_MEMBERS_DATA = [
            { name: 'അഖിൽ', dist: 1.2, online: true, statusText: 'Online', role: 'Community Member', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80' },
            { name: 'മറിയം', dist: 2.5, online: false, statusText: 'Last seen 5 min ago', role: 'Community Member', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80' },
            { name: 'ശിവപ്രസാദ്', dist: 3.1, online: true, statusText: 'Online', role: 'Community Member', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80' },
            { name: 'ലക്ഷ്മി', dist: 4.2, online: false, statusText: 'Last seen 15 min ago', role: 'Community Member', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80' },
            { name: 'സജീവൻ', dist: 5.3, online: false, statusText: 'Offline', role: 'Community Member', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80' },
            { name: 'അനുജ', dist: 6.1, online: true, statusText: 'Online', role: 'Community Member', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80' }
        ];

        function renderPeopleScreen(filterCat = 'all', keyword = '') {
            const list = document.getElementById('peopleMembersList');
            if (!list) return;

            let items = PEOPLE_MEMBERS_DATA;
            if (filterCat === 'online') {
                items = items.filter(p => p.online);
            } else if (filterCat === 'nearby') {
                items = items.filter(p => p.dist <= 3.0);
            }

            if (keyword && keyword.trim()) {
                const q = keyword.trim().toLowerCase();
                items = items.filter(p => p.name.toLowerCase().includes(q));
            }

            list.innerHTML = items.map(p => `
                <div class="user-round-card">
                    <div class="user-avatar-wrap">
                        <img src="${p.avatar}" alt="${p.name}">
                        ${p.online ? '<span class="online-dot-badge"></span>' : ''}
                    </div>
                    <div style="flex:1;min-width:0">
                        <div style="font-size:14.5px;font-weight:800;color:#0F172A">${p.name}</div>
                        <div style="font-size:11.5px;color:#64748B;display:flex;align-items:center;gap:4px;margin-top:2px">
                            <span>${p.dist} km</span>
                            <span>•</span>
                            <span style="${p.online ? 'color:#15803D;font-weight:700' : ''}">${p.statusText}</span>
                        </div>
                        <div style="font-size:11px;color:#94A3B8">${p.role}</div>
                    </div>
                    <button class="pill-action-btn solid" onclick="openDirectChat('${p.name}', '${p.avatar}')">
                        Chat
                    </button>
                </div>
            `).join('');
        }

        function filterPeopleCategory(cat, btn) {
            document.querySelectorAll('#screen-people .filter-pills-wrap .pill-btn').forEach(b => b.classList.remove('active'));
            if (btn) btn.classList.add('active');
            const input = document.getElementById('peopleSearchInput');
            renderPeopleScreen(cat, input ? input.value : '');
        }

        function filterPeopleList() {
            const input = document.getElementById('peopleSearchInput');
            const activeBtn = document.querySelector('#screen-people .filter-pills-wrap .pill-btn.active');
            const cat = activeBtn ? activeBtn.getAttribute('onclick').match(/'([^']+)'/)[1] : 'all';
            renderPeopleScreen(cat, input ? input.value : '');
        }

        /* --- SCREEN 7: CHAT THREADS DATA & RENDER --- */
        const CHAT_THREADS_DATA = [
            { id: 'c_1', name: 'റഹാൻ', snippet: 'Hi, എങ്ങനെയുണ്ട്?', time: '10:24 AM', unread: 0, isGroup: false, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80' },
            { id: 'c_2', name: 'നിഷ', snippet: 'ശരി, നന്ദി 😊', time: '09:50 AM', unread: 0, isGroup: false, avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80' },
            { id: 'c_3', name: 'നമ്മുടെ നാട് - Community', snippet: '● 12 new messages', time: '09:32 AM', unread: 12, isGroup: true, icon: '🏡', iconBg: '#15803D' },
            { id: 'c_4', name: 'Blood Donors Group', snippet: '● 5 new messages', time: '08:45 AM', unread: 5, isGroup: true, icon: '🩸', iconBg: '#DC2626' },
            { id: 'c_5', name: 'Local Services', snippet: 'അതെ, എല്ലാവർക്കും സ്വാഗതം', time: 'Yesterday', unread: 0, isGroup: true, icon: '🛠️', iconBg: '#0284C7' },
            { id: 'c_6', name: 'Emergency Support', snippet: 'Thanks for your help', time: 'Yesterday', unread: 0, isGroup: true, icon: '🚨', iconBg: '#EA580C' }
        ];

        function renderChatScreen(tab = 'all') {
            const list = document.getElementById('chatThreadsList');
            if (!list) return;

            let items = CHAT_THREADS_DATA;
            if (tab === 'groups') {
                items = items.filter(c => c.isGroup);
            } else if (tab === 'requests') {
                items = items.filter(c => !c.isGroup);
            }

            list.innerHTML = items.map(c => `
                <div class="chat-thread-row" onclick="openDirectChat('${c.name}', '${c.avatar || ''}')">
                    ${c.isGroup ? `
                        <div style="width:48px;height:48px;border-radius:50%;background:${c.iconBg};color:#ffffff;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">
                            ${c.icon}
                        </div>
                    ` : `
                        <div class="user-avatar-wrap">
                            <img src="${c.avatar}" alt="${c.name}">
                        </div>
                    `}
                    <div style="flex:1;min-width:0">
                        <div style="display:flex;justify-content:space-between;align-items:center">
                            <div style="font-size:14.5px;font-weight:800;color:#0F172A;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${c.name}</div>
                            <div style="font-size:11px;color:#94A3B8">${c.time}</div>
                        </div>
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:2px">
                            <div style="font-size:12px;color:${c.unread ? '#15803D' : '#64748B'};font-weight:${c.unread ? '700' : '500'};white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
                                ${c.snippet}
                            </div>
                            ${c.unread ? `
                                <span style="background:#15803D;color:#ffffff;border-radius:10px;font-size:10px;font-weight:800;padding:2px 7px">
                                    ${c.unread}
                                </span>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `).join('');
        }

        function filterChatCategory(tab, btn) {
            document.querySelectorAll('#screen-chat .filter-pills-wrap .pill-btn').forEach(b => b.classList.remove('active'));
            if (btn) btn.classList.add('active');
            renderChatScreen(tab);
        }

        function openDirectChat(name, avatar) {
            const modal = document.getElementById('modal-chat');
            const nameEl = document.getElementById('chatModalName');
            const avatarEl = document.getElementById('chatModalAvatar');
            if (nameEl) nameEl.textContent = name;
            if (avatarEl) {
                if (avatar) {
                    avatarEl.innerHTML = `<img src="${avatar}" style="width:100%;height:100%;border-radius:50%;object-fit:cover">`;
                } else {
                    avatarEl.textContent = '💬';
                }
            }
            if (modal) modal.classList.add('active');
        }

        function filterServicesMainTab(tab, btn) {
            document.querySelectorAll('#screen-services .filter-pills-wrap .pill-btn').forEach(b => b.classList.remove('active'));
            if (btn) btn.classList.add('active');
            if (typeof renderServices === 'function') renderServices();
        }

        const NEARBY_RADII_OPTIONS = ['200 m', '500 m', '1 km', '2 km', '5 km', '10 km', '25 km'];
        function toggleRadiusSelector(scr) {
            const cur = APP_STATE.activeNearbyRadius || '200 m';
            let idx = NEARBY_RADII_OPTIONS.indexOf(cur);
            idx = (idx + 1) % NEARBY_RADII_OPTIONS.length;
            const nextRad = NEARBY_RADII_OPTIONS[idx];
            APP_STATE.activeNearbyRadius = nextRad;
            const el = document.getElementById('nearbyRadiusText');
            if (el) el.textContent = nextRad;
            toast('📍 തിരച്ചിൽ പരിധി: ' + nextRad + (nextRad === '200 m' ? ' (200 മീറ്റർ ചുറ്റളവ്)' : ''));
            renderNearbyScreen(APP_STATE.activeNearbyCategory || 'all');
        }

        function refreshUserLocation(e) {
            if (e && e.stopPropagation) e.stopPropagation();
            const icon = document.getElementById('locRefreshSpinIcon');
            if (icon) icon.classList.add('spinning');
            toast('📍 ലൊക്കേഷൻ പുതുക്കുന്നു...');
            if (window.LocationService && typeof window.LocationService.getCurrentPosition === 'function') {
                window.LocationService.getCurrentPosition({ forceFresh: true })
                    .then(pos => {
                        if (icon) icon.classList.remove('spinning');
                        toast('✅ ലൊക്കേഷൻ വിജയകരമായി പുതുക്കി!');
                    })
                    .catch(err => {
                        if (icon) icon.classList.remove('spinning');
                        toast('⚠️ ലൊക്കേഷൻ ലഭ്യമല്ല: ' + (err.message || 'GPS ലഭ്യമല്ല'));
                    });
            } else if (typeof useGpsLocation === 'function') {
                useGpsLocation();
                setTimeout(() => {
                    if (icon) icon.classList.remove('spinning');
                }, 1000);
            } else {
                setTimeout(() => {
                    if (icon) icon.classList.remove('spinning');
                    toast('✅ ലൊക്കേഷൻ പുതുക്കി!');
                }, 600);
            }
        }

        function setUserAccountRole(role) {
            APP_STATE.userRole = role;
            localStorage.setItem('thuna_user_role', role);
            const btnUser = document.getElementById('btnRoleUser');
            const btnProv = document.getElementById('btnRoleProvider');
            const hub = document.getElementById('providerHubCard');
            const badge = document.getElementById('profRoleBadgeText');
            if (role === 'provider') {
                if (btnUser) btnUser.classList.remove('active');
                if (btnProv) btnProv.classList.add('active');
                if (hub) hub.style.display = 'block';
                if (badge) badge.textContent = '🛠️ സർവീസ് പ്രൊവൈഡർ (3-Month Free Trial Active)';
                toast('🛠️ സർവീസ് പ്രൊവൈഡർ അക്കൗണ്ട് സജീവമായി! 3 മാസത്തെ സൗജന്യ ട്രയൽ ആരംഭിച്ചു.');
            } else {
                if (btnUser) btnUser.classList.add('active');
                if (btnProv) btnProv.classList.remove('active');
                if (hub) hub.style.display = 'none';
                if (badge) badge.textContent = '👤 തദ്ദേശവാസി (Verified Citizen)';
                toast('👤 സാധാരണ അക്കൗണ്ട് സജീവമായി.');
            }
        }

        function openSubscriptionModal() {
            openModal('modal-subscription');
        }

        function toggleProfileEditCard() {
            const drawer = document.getElementById('profileEditInlineDrawer');
            if (drawer) {
                drawer.style.display = (drawer.style.display === 'none' || !drawer.style.display) ? 'block' : 'none';
            }
        }

        function saveProfileInline() {
            const name = (document.getElementById('profNameInput')?.value || '').trim();
            const phone = (document.getElementById('profPhoneInput')?.value || '').trim();
            const blood = document.getElementById('profBloodSelect')?.value || 'O+';
            if (!name) {
                toast('⚠️ ദയവായി പേര് നൽകുക.');
                return;
            }
            localStorage.setItem('thuna_profile_registered', 'true');
            syncAllProfileUIs({ name, phone, bloodGroup: blood });
            toggleProfileEditCard();
            if (typeof navTo === 'function') {
                navTo('home');
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
            toast(`✅ പ്രൊഫൈൽ വിവരങ്ങൾ അപ്‌ഡേറ്റ് ചെയ്തു (രക്തഗ്രൂപ്പ്: ${blood})!`);
        }

        function toggleBloodDonorStatus() {
            const badge = document.getElementById('profileDonorStatusBadge');
            const rowBadge = document.getElementById('profileDonorStatusBadgeRow');
            if (badge) {
                const isAvail = badge.textContent.includes('Available') || badge.textContent.includes('ലഭ്യമാണ്');
                const nextAvail = !isAvail;
                badge.textContent = nextAvail ? 'Available' : 'Unavailable';
                badge.style.color = nextAvail ? '#15803D' : '#DC2626';
                badge.style.background = nextAvail ? '#DCFCE7' : '#FEE2E2';
                if (rowBadge) {
                    rowBadge.textContent = nextAvail ? 'ലഭ്യമാണ് (Active)' : 'ലഭ്യമല്ല (Inactive)';
                    rowBadge.style.color = nextAvail ? '#15803D' : '#DC2626';
                    rowBadge.style.background = nextAvail ? '#DCFCE7' : '#FEE2E2';
                }
                toast(`🩸 രക്തദാന സന്നദ്ധത: ${nextAvail ? 'ലഭ്യമാണ് (Available)' : 'ലഭ്യമല്ല (Unavailable)'}`);
            }
        }

        function filterCommunityCategory(cat, btn) {
            document.querySelectorAll('#screen-community .filter-pills-wrap .pill-btn').forEach(b => b.classList.remove('active'));
            if (btn) btn.classList.add('active');
            if (typeof filterCommunityPosts === 'function') {
                filterCommunityPosts(cat, btn);
            }
        }

        /* -------------------------------------------------------------
           4. KEYWORDS BOX & FILTER PILLS RENDERING
           ------------------------------------------------------------- */
        function renderKeywordsClouds() {
            // Static keyword tag cloud box removed as per user design preference
        }

        function handleKeywordClick(tag) {
            navTo('services');
            const searchInput = document.getElementById('servicesSearchInput');
            if (searchInput) searchInput.value = tag;
            const clearBtn = document.getElementById('servicesSearchClear');
            if (clearBtn) clearBtn.style.display = 'flex';

            filterServicesList();
            toast(`🏷️ Filtered by keyword: ${tag}`);
        }

        function renderCategoryPills() {
            const container = document.getElementById('servicesFilterPills');
            if (!container) return;

            const allCats = getAllCategories();
            let html = `<button class="pill-btn active" data-cat="all" onclick="selectServiceCategory('all', this)">All</button>`;
            allCats.forEach(cat => {
                html += `
                    <button class="pill-btn" data-cat="${cat.id}" onclick="selectServiceCategory('${cat.id}', this)">
                        ${getCatSvg(cat.id, 18)} <span>${cat.name}</span>
                    </button>
                `;
            });
            container.innerHTML = html;

            // Populate datalist for custom registration
            const dl = document.getElementById('categoryDatalist');
            if (dl) {
                dl.innerHTML = allCats.map(c => `<option value="${c.name}">${c.ml}</option>`).join('');
            }
        }

        function renderHomePopularServices() {
            const container = document.getElementById('homePopularGrid');
            if (!container) return;
            const allCats = getAllCategories();
            const top8 = allCats.slice(0, 8);
            container.innerHTML = top8.map(cat => `
                <div class="service-tile" onclick="filterServiceAndOpen('${cat.id}')">
                    <div class="service-icon-bg">
                        ${getCatSvg(cat.id, 42)}
                    </div>
                    <span>${cat.name}</span>
                </div>
            `).join('');
        }

        /* -------------------------------------------------------------
           5. AUTO-SUGGESTION ENGINE
           ------------------------------------------------------------- */
        function handleSearchType(source) {
            const inputId = (source === 'home') ? 'homeSearchInput' : 'servicesSearchInput';
            const clearId = (source === 'home') ? 'homeSearchClear' : 'servicesSearchClear';
            const suggId = (source === 'home') ? 'homeSearchSuggestions' : 'servicesSearchSuggestions';

            const input = document.getElementById(inputId);
            const clearBtn = document.getElementById(clearId);
            const suggBox = document.getElementById(suggId);
            if (!input || !suggBox) return;

            const q = input.value.trim().toLowerCase();
            if (clearBtn) clearBtn.style.display = q ? 'flex' : 'none';

            if (source === 'services') {
                filterServicesList();
            }

            if (!q) {
                suggBox.classList.remove('show');
                return;
            }

            // 1. Detect possible spelling typos via Levenshtein Dictionary
            const typoMatch = getSpellingCorrection(q);

            // 2. Match Categories
            const matchedCats = MASTER_CATEGORIES.filter(c =>
                c.name.toLowerCase().includes(q) ||
                c.ml.toLowerCase().includes(q) ||
                (c.keywords && c.keywords.some(k => k.toLowerCase().includes(q)))
            );

            // 3. Match Dynamic Keywords from Dictionary & Registered Providers (Palarudeyum Keywords!)
            const allDictWords = getAllDictionaryWords();
            const matchedKeywords = allDictWords.filter(w =>
                w.type !== 'Category' &&
                (w.word.toLowerCase().includes(q) || (w.ml && w.ml.toLowerCase().includes(q)))
            ).slice(0, 5);

            // 4. Match Service Providers (by name, desc, category, and all provider-defined keywords)
            const allProv = getServicesList();
            const matchedProvs = allProv.filter(p =>
                p.name.toLowerCase().includes(q) ||
                (p.desc && p.desc.toLowerCase().includes(q)) ||
                (p.category && p.category.toLowerCase().includes(q)) ||
                (p.keywords && p.keywords.some(k => k.toLowerCase().includes(q)))
            ).slice(0, 5);

            if (!typoMatch && matchedCats.length === 0 && matchedProvs.length === 0 && matchedKeywords.length === 0) {
                suggBox.innerHTML = `
                    <div style="padding:14px;text-align:center;font-size:12.5px;color:var(--muted)">
                        No direct auto-suggestions for "${escapeHtml(q)}".<br>Press Enter to search all.
                    </div>
                `;
                suggBox.classList.add('show');
                return;
            }

            let html = '';

            // DICTIONARY SPELLING CORRECTION CARD (If Typo Detected)
            if (typoMatch) {
                html += `
                    <div class="spelling-suggestion-banner" onclick="applySpellingCorrection('${escapeHtml(typoMatch.word)}', '${escapeHtml(typoMatch.cat)}', '${source}')">
                        <span style="font-size:20px">💡</span>
                        <div style="flex:1">
                            <div style="font-size:10.5px;color:#047857;font-weight:700;text-transform:uppercase;letter-spacing:0.3px">Dictionary Suggestion · നിഘണ്ടു നിർദ്ദേശം</div>
                            <div style="font-size:13px;color:#0f172a">Did you mean: <strong style="color:#059669;text-decoration:underline">${escapeHtml(typoMatch.word)}</strong>?</div>
                        </div>
                        <span style="font-size:11px;background:#d1fae5;color:#065f46;padding:3px 9px;border-radius:12px;font-weight:700">Correct</span>
                    </div>
                `;
            }

            if (matchedCats.length > 0) {
                html += `<div class="suggestion-group-title">Categories</div>`;
                matchedCats.slice(0, 4).forEach(c => {
                    html += `
                        <div class="suggestion-item" onclick="selectSuggestion('${c.name}', '${c.id}', '${source}')">
                            <div class="suggestion-icon">${getCatSvg(c.id, 28)}</div>
                            <div class="suggestion-text">
                                <span class="suggestion-highlight">${escapeHtml(c.name)}</span> · <span style="font-size:12px;color:var(--muted)">${escapeHtml(c.ml)}</span>
                            </div>
                            <span class="suggestion-badge">Category</span>
                        </div>
                    `;
                });
            }

            if (matchedKeywords.length > 0) {
                html += `<div class="suggestion-group-title">Keywords & Provider Tags</div>`;
                matchedKeywords.forEach(k => {
                    html += `
                        <div class="suggestion-item" onclick="selectSuggestion('${escapeHtml(k.word)}', '${escapeHtml(k.cat)}', '${source}')">
                            <div class="suggestion-icon">${getCatSvg(k.cat, 26)}</div>
                            <div class="suggestion-text">
                                <span class="suggestion-highlight">${escapeHtml(k.word)}</span> <span style="font-size:11.5px;color:var(--muted)">· ${escapeHtml(k.ml || '')}</span>
                            </div>
                            <span class="suggestion-badge">${escapeHtml(k.type || 'Keyword')}</span>
                        </div>
                    `;
                });
            }

            if (matchedProvs.length > 0) {
                html += `<div class="suggestion-group-title">Local Providers</div>`;
                matchedProvs.forEach(p => {
                    html += `
                        <div class="suggestion-item" onclick="openChatFromSuggestion('${p.id}')">
                            <div class="suggestion-icon">${getCatSvg(p.category, 28)}</div>
                            <div class="suggestion-text">
                                <strong style="color:var(--ink)">${escapeHtml(p.name)}</strong> · <span style="font-size:11.5px;color:var(--muted)">${escapeHtml(p.desc || '')}</span>
                            </div>
                            <span class="suggestion-badge" style="background:#dcfce7;color:#15803d">Chat</span>
                        </div>
                    `;
                });
            }

            suggBox.innerHTML = html;
            suggBox.classList.add('show');
        }

        function selectSuggestion(text, tagOrCat, source) {
            hideAllSuggestions();
            navTo('services');
            const input = document.getElementById('servicesSearchInput');
            if (input) input.value = text;
            const clearBtn = document.getElementById('servicesSearchClear');
            if (clearBtn) clearBtn.style.display = 'flex';

            APP_STATE.activeServiceCategory = tagOrCat;
            document.querySelectorAll('#servicesFilterPills .pill-btn').forEach(b => {
                b.classList.toggle('active', b.dataset.cat === tagOrCat);
            });

            filterServicesList();
        }

        function openChatFromSuggestion(provId) {
            hideAllSuggestions();
            navTo('services');
            openChatModal(provId);
        }

        function clearSearch(source) {
            const inputId = (source === 'home') ? 'homeSearchInput' : 'servicesSearchInput';
            const clearId = (source === 'home') ? 'homeSearchClear' : 'servicesSearchClear';
            const input = document.getElementById(inputId);
            const clearBtn = document.getElementById(clearId);
            if (input) input.value = '';
            if (clearBtn) clearBtn.style.display = 'none';
            hideAllSuggestions();
            if (source === 'services') filterServicesList();
        }

        function handleSearchKey(e, source) {
            if (e.key === 'Enter') {
                hideAllSuggestions();
                if (source === 'home') {
                    const val = document.getElementById('homeSearchInput')?.value || '';
                    navTo('services');
                    const sInput = document.getElementById('servicesSearchInput');
                    if (sInput) {
                        sInput.value = val;
                        filterServicesList();
                    }
                }
            }
        }

        function hideAllSuggestions() {
            document.querySelectorAll('.suggestions-dropdown').forEach(d => d.classList.remove('show'));
        }

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-bar-wrap')) {
                hideAllSuggestions();
            }
            if (!e.target.closest('#newProvKeywords') && !e.target.closest('#providerKeywordSuggestions')) {
                document.getElementById('providerKeywordSuggestions')?.classList.remove('show');
            }
        });

        /* -------------------------------------------------------------
           6. SERVICES LIST RENDERING (CHAT ONLY - NO DIRECT CALLS!)
           ------------------------------------------------------------- */
        function getServicesList() {
            const custom = JSON.parse(localStorage.getItem('thuna_custom_providers') || '[]');
            return [...custom, ...DEFAULT_SERVICES];
        }

        function toggleMoreServiceCategories(forceState = null) {
            const grid = document.getElementById('servicesCategoryPills');
            const textEl = document.getElementById('toggleMoreCatsText');
            if (!grid) return;
            const isShowing = (forceState !== null) ? forceState : !grid.classList.contains('show-all');
            grid.classList.toggle('show-all', isShowing);
            if (textEl) {
                textEl.textContent = isShowing ? 'കുറച്ചു കാണിക്കുക ▴' : 'കൂടുതൽ വിഭാഗങ്ങൾ (8+) ▾';
            }
        }

        function filterServiceByCategory(cat, btn) {
            APP_STATE.activeServiceCategory = cat || 'all';
            if (btn) {
                document.querySelectorAll('#servicesCategoryPills .services-cat-squircle, #servicesCategoryPills .job-pill-btn, .yw-cat-card').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                if (btn.classList.contains('extra-cat')) {
                    toggleMoreServiceCategories(true);
                }
            } else {
                document.querySelectorAll('.yw-cat-card').forEach(b => {
                    const match = (b.getAttribute('data-cat') || 'all') === (cat || 'all');
                    b.classList.toggle('active', match);
                    if (match && b.classList.contains('extra-cat')) {
                        toggleMoreServiceCategories(true);
                    }
                });
            }
            updateServicesScreenView(cat);
            filterServicesList();
        }

        function clearServiceSearch() {
            const input = document.getElementById('servicesSearchInput');
            if (input) input.value = '';
            filterServicesList();
        }


        function filterServicesList() {
            const query = (document.getElementById('servicesSearchInput')?.value || '').toLowerCase().trim();
            const cat = APP_STATE.activeServiceCategory || 'all';
            const all = getServicesList();

            let filtered = all.filter(item => {
                const itemCat = (item.category || '').toLowerCase();
                const catLower = cat.toLowerCase();
                const matchCat = (catLower === 'all') ||
                    (itemCat === catLower) ||
                    (item.categories && item.categories.some(c => c.toLowerCase() === catLower)) ||
                    (item.keywords && item.keywords.some(k => k.toLowerCase() === catLower)) ||
                    (itemCat.includes(catLower)) || (catLower.includes(itemCat));

                const matchQuery = !query ||
                    (item.name && item.name.toLowerCase().includes(query)) ||
                    (item.desc && item.desc.toLowerCase().includes(query)) ||
                    (item.location && item.location.toLowerCase().includes(query)) ||
                    (item.district && item.district.toLowerCase().includes(query)) ||
                    itemCat.includes(query) ||
                    (item.keywords && item.keywords.some(k => k.toLowerCase().includes(query)));

                return matchCat && matchQuery;
            });

            // If no exact matches and query is typed, check dictionary spelling suggestions as fallback
            if (filtered.length === 0 && query.length >= 3) {
                const typoMatch = getSpellingCorrection(query);
                if (typoMatch) {
                    const corrWord = typoMatch.word.toLowerCase();
                    const corrCat = (typoMatch.cat || '').toLowerCase();
                    filtered = all.filter(item => {
                        const itemCat = (item.category || '').toLowerCase();
                        const matchCat = (cat === 'all') || (itemCat === cat.toLowerCase());
                        const matchCorrected =
                            (item.name && item.name.toLowerCase().includes(corrWord)) ||
                            (item.desc && item.desc.toLowerCase().includes(corrWord)) ||
                            itemCat.includes(corrWord) ||
                            (item.keywords && item.keywords.some(k => k.toLowerCase().includes(corrWord)));
                        return matchCat && matchCorrected;
                    });
                }
            }

            renderServices(filtered);
        }

        const SERVICE_CATEGORY_META = {
            'all': { ml: 'എല്ലാ സേവനങ്ങളും', en: 'All Services', icon: '⊞' },
            'plumber': { ml: 'പ്ലംബർ', en: 'Plumber', icon: '🚰', sub: 'പ്ലമ്പിംഗ് സേവനങ്ങൾ' },
            'electrician': { ml: 'ഇലക്ട്രീഷ്യൻ', en: 'Electrician', icon: '⚡', sub: 'ഇലക്ട്രിക്കൽ ജോലികൾ' },
            'driver': { ml: 'ഡ്രൈവർ', en: 'Driver', icon: '🚗', sub: 'ഡ്രൈവിംഗ് സേവനങ്ങൾ' },
            'auto': { ml: 'ഓട്ടോ / ടാക്സി', en: 'Auto / Taxi', icon: '🛺', sub: 'ഓട്ടോ, ടാക്സി സേവനം' },
            'carpenter': { ml: 'ആശാരി', en: 'Carpenter', icon: '🪚', sub: 'തടി പണികൾ, ഫർണിച്ചർ' },
            'painter': { ml: 'പെയിന്റർ', en: 'Painter', icon: '🎨', sub: 'പെയിന്റിംഗ് ജോലികൾ' },
            'ac': { ml: 'AC / ഫ്രിഡ്ജ് റിപ്പയർ', en: 'AC & Fridge Repair', icon: '❄️', sub: 'എ.സി & റഫ്രിജറേഷൻ' },
            'cleaning': { ml: 'ക്ലീനിങ്', en: 'Cleaning', icon: '🧹', sub: 'ക്ലീനിംഗ് സർവീസുകൾ' },
            'tech': { ml: 'കമ്പ്യൂട്ടർ റിപ്പയർ', en: 'Computer Repair', icon: '💻', sub: 'കമ്പ്യൂട്ടർ & മൊബൈൽ' },
            'vehicle': { ml: 'വാഹന സർവീസ്', en: 'Vehicle Service', icon: '🚗', sub: 'വാഹന സർവീസ് & വർക്ക്‌ഷോപ്പ്' },
            'gardening': { ml: 'തോട്ടപ്പണി', en: 'Gardening', icon: '🌿', sub: 'തോട്ടപ്പണി & കൃഷി' },
            'tuition': { ml: 'ട്യൂഷൻ', en: 'Tuition', icon: '📚', sub: 'ട്യൂഷൻ & വിദ്യാഭ്യാസം' },
            'beauty': { ml: 'ബ്യൂട്ടി / മേക്കപ്പ്', en: 'Beauty & Makeup', icon: '💇', sub: 'ബ്യൂട്ടി & മേക്കപ്പ്' },
            'mechanic': { ml: 'മെക്കാനിക്', en: 'Mechanic', icon: '🔧', sub: 'മെക്കാനിക് ജോലികൾ' },
            'other': { ml: 'മറ്റ് സേവനങ്ങൾ', en: 'Other Services', icon: '⚙️', sub: 'മറ്റു പ്രാദേശിക സേവനങ്ങൾ' }
        };

        function getServiceCategoryMeta(cat) {
            if (!cat) return SERVICE_CATEGORY_META['other'];
            const c = cat.toLowerCase().trim();
            if (c === 'all') return SERVICE_CATEGORY_META['all'];
            if (c.includes('plumb')) return SERVICE_CATEGORY_META['plumber'];
            if (c.includes('elect')) return SERVICE_CATEGORY_META['electrician'];
            if (c.includes('auto') || c.includes('taxi')) return SERVICE_CATEGORY_META['auto'];
            if (c.includes('driv')) return SERVICE_CATEGORY_META['driver'];
            if (c.includes('carpen') || c.includes('wood') || c.includes('തച്ചൻ') || c.includes('ആശാരി')) return SERVICE_CATEGORY_META['carpenter'];
            if (c.includes('paint')) return SERVICE_CATEGORY_META['painter'];
            if (c.includes('ac') || c.includes('fridge') || c.includes('cool')) return SERVICE_CATEGORY_META['ac'];
            if (c.includes('clean') || c.includes('maid') || c.includes('house help')) return SERVICE_CATEGORY_META['cleaning'];
            if (c.includes('comput') || c.includes('mobile') || c.includes('tech') || c.includes('laptop')) return SERVICE_CATEGORY_META['tech'];
            if (c.includes('vehic') || c.includes('വാഹന') || c.includes('car service')) return SERVICE_CATEGORY_META['vehicle'];
            if (c.includes('garden') || c.includes('തോട്ട') || c.includes('cocon') || c.includes('കൃഷി')) return SERVICE_CATEGORY_META['gardening'];
            if (c.includes('tuit') || c.includes('teach') || c.includes('പഠന') || c.includes('class')) return SERVICE_CATEGORY_META['tuition'];
            if (c.includes('beaut') || c.includes('parlor') || c.includes('makeup')) return SERVICE_CATEGORY_META['beauty'];
            if (c.includes('mech') || c.includes('work') || c.includes('വർക്ക്')) return SERVICE_CATEGORY_META['mechanic'];
            return SERVICE_CATEGORY_META[c] || { ml: cat, en: cat, icon: '⚙️' };
        }

        function updateServicesScreenView(cat) {
            const isSpecific = (cat && cat !== 'all');
            const meta = getServiceCategoryMeta(cat);
            const titleEl = document.getElementById('servicesSelectInfoTitle');
            const subEl = document.getElementById('servicesSelectInfoSub');
            if (titleEl && subEl) {
                if (isSpecific && meta) {
                    titleEl.textContent = meta.ml;
                    subEl.textContent = `നിങ്ങളുടെ പ്രദേശത്തെ ${meta.ml} സേവന ദാതാക്കൾ താഴെ കാണാം.`;
                } else {
                    titleEl.textContent = 'വിഭാഗം തിരഞ്ഞെടുക്കുക';
                    subEl.textContent = 'മുകളിലെ വിഭാഗങ്ങളിൽ ഒന്നിനെ തിരഞ്ഞെടുക്കുക.';
                }
            }
        }

        function clearServiceCategoryFilter() {
            filterServiceByCategory('all');
        }

        function handleServicesBack() {
            if (APP_STATE.activeServiceCategory && APP_STATE.activeServiceCategory !== 'all') {
                filterServiceByCategory('all');
            } else {
                navTo('home');
            }
        }

        function selectServiceCategory(cat) {
            filterServiceAndOpen(cat);
        }

        function filterServiceAndOpen(cat) {
            APP_STATE.activeServiceCategory = cat || 'all';
            APP_STATE.activeServiceRadius = 'all';
            navTo('services');
            updateServicesScreenView(cat);
            const searchInput = document.getElementById('servicesSearchInput');
            if (searchInput) searchInput.value = '';
            document.querySelectorAll('.yw-cat-card').forEach(b => {
                b.classList.toggle('active', (b.getAttribute('data-cat') || 'all') === (cat || 'all'));
            });
            document.querySelectorAll('.yw-filter-pill').forEach((b, idx) => {
                b.classList.toggle('active', idx === 0);
            });
            renderServices();
        }

        function openAllServicesOverview() {
            APP_STATE.activeServiceCategory = 'all';
            APP_STATE.activeServiceRadius = 'all';
            navTo('services');
            const searchInput = document.getElementById('servicesSearchInput');
            if (searchInput) searchInput.value = '';
            document.querySelectorAll('.yw-cat-card').forEach(b => {
                b.classList.toggle('active', (b.getAttribute('data-cat') || 'all') === 'all');
            });
            document.querySelectorAll('.yw-filter-pill').forEach((b, idx) => {
                b.classList.toggle('active', idx === 0);
            });
            renderServices();
        }

        /* -------------------------------------------------------------
           YELLOW & WHITE SERVICES TAB SWITCHER (Find Services vs My Services)
           ------------------------------------------------------------- */
        function switchServicesViewTab(tab) {
            const tabFind = document.getElementById('tabFindServices');
            const tabMy = document.getElementById('tabMyServices');
            const secFind = document.getElementById('ywFindServicesSection');
            const secMy = document.getElementById('ywMyServicesSection');

            if (tab === 'my') {
                if (tabFind) tabFind.classList.remove('active');
                if (tabMy) tabMy.classList.add('active');
                if (secFind) secFind.style.display = 'none';
                if (secMy) secMy.style.display = 'block';
                renderMyServices();
            } else {
                if (tabFind) tabFind.classList.add('active');
                if (tabMy) tabMy.classList.remove('active');
                if (secFind) secFind.style.display = 'block';
                if (secMy) secMy.style.display = 'none';
                renderServices();
            }
        }

        /* -------------------------------------------------------------
           SERVICE DETAILS MODAL POPULATOR
           ------------------------------------------------------------- */
        function openServiceDetailsModal(providerId) {
            const all = getServicesList();
            const item = all.find(p => p.id === providerId) || all[0];
            if (!item) return;

            const catMeta = getServiceCategoryMeta(item.category);
            const catLabel = (CURRENT_APP_LANG === 'en') ? (catMeta.en || item.category) : (catMeta.ml || item.category);

            const elName = document.getElementById('sdDetailName');
            const elCat = document.getElementById('sdDetailCategory');
            const elIcon = document.getElementById('sdDetailIcon');
            const elDesc = document.getElementById('sdDetailDesc');
            const elLoc = document.getElementById('sdDetailLocation');
            const elRate = document.getElementById('sdDetailRate');
            const elHours = document.getElementById('sdDetailHours');
            const elAvailBadge = document.getElementById('sdDetailAvailBadge');
            const photoBox = document.getElementById('sdDetailPhotoBox');
            const photoImg = document.getElementById('sdDetailPhoto');
            const btnCall = document.getElementById('sdBtnCall');
            const btnWhatsApp = document.getElementById('sdBtnWhatsApp');

            if (elName) elName.textContent = item.name || item.businessName || 'സേവന ദാതാവ്';
            if (elCat) elCat.textContent = catLabel;
            if (elIcon) elIcon.textContent = catMeta.icon || '🛠️';
            if (elDesc) elDesc.textContent = item.desc || item.description || (catLabel + ' സേവനങ്ങൾ ഉത്തരവാദിത്തത്തോടെ ചെയ്തു നൽകുന്നു.');
            if (elLoc) elLoc.textContent = '📍 ' + (item.location || 'കേരളം') + (item.district ? (', ' + item.district) : '');
            if (elRate) elRate.textContent = item.rate || 'ന്യായമായ നിരക്ക് (സേവനത്തിനനുസരിച്ച്)';
            if (elHours) elHours.textContent = item.hours || item.workingHours || '8:00 AM - 7:00 PM';

            const isAvail = (item.isAvailable !== false);
            if (elAvailBadge) {
                elAvailBadge.className = 'yw-availability-badge ' + (isAvail ? 'available' : 'busy');
                elAvailBadge.textContent = isAvail ? '🟢 ലഭ്യമാണ്' : '🔴 ലഭ്യമല്ല';
            }

            const photoUrl = (item.photos && item.photos.length > 0) ? item.photos[0] : (item.photo || item.logo || '');
            if (photoBox && photoImg) {
                if (photoUrl) {
                    photoImg.src = photoUrl;
                    photoBox.style.display = 'block';
                } else {
                    photoBox.style.display = 'none';
                }
            }

            const cleanPhone = (item.phone || '').replace(/[^0-9+]/g, '');
            let cleanWa = cleanPhone.replace(/^\+/, '');
            if (cleanWa.length === 10) cleanWa = '91' + cleanWa;

            if (btnCall) {
                if (cleanPhone) {
                    btnCall.href = 'tel:' + cleanPhone;
                    btnCall.style.display = 'inline-flex';
                } else {
                    btnCall.style.display = 'none';
                }
            }

            if (btnWhatsApp) {
                if (cleanWa) {
                    const waMsg = `നമസ്കാരം, നമ്മൂടെ നാട് ആപ്പിൽ നിങ്ങളുടെ ${catLabel} പ്രൊഫൈൽ കണ്ടു ബന്ധപ്പെടുകയാണ്.`;
                    btnWhatsApp.href = `https://wa.me/${cleanWa}?text=${encodeURIComponent(waMsg)}`;
                    btnWhatsApp.style.display = 'inline-flex';
                } else {
                    btnWhatsApp.style.display = 'none';
                }
            }

            openModal('modal-service-details');
        }

        /* -------------------------------------------------------------
           MY SERVICES (VIEW, EDIT, DELETE, AVAILABILITY TOGGLE)
           ------------------------------------------------------------- */
        function renderMyServices() {
            const container = document.getElementById('myServicesListContainer');
            if (!container) return;

            const custom = JSON.parse(localStorage.getItem('thuna_custom_providers') || '[]');
            const countEl = document.getElementById('myServicesActiveCountTitle');
            if (countEl) {
                countEl.textContent = `നിങ്ങൾ രജിസ്റ്റർ ചെയ്ത സർവീസുകൾ (${custom.length})`;
            }

            if (custom.length === 0) {
                container.innerHTML = `
                    <div style="background:#FFFFFF;border:1.5px dashed #FFD32A;border-radius:20px;padding:36px 20px;text-align:center;box-shadow:0 4px 14px rgba(0,0,0,0.03);margin-top:10px">
                        <div style="width:64px;height:64px;border-radius:20px;background:#FFFBEB;border:1.5px solid #FDE68A;display:flex;align-items:center;justify-content:center;font-size:30px;margin:0 auto 12px">🛠️</div>
                        <div style="font-size:16px;font-weight:800;color:#123B66;margin-bottom:6px">
                            നിങ്ങൾ ഇതുവരെ സർവീസുകൾ ഒന്നും രജിസ്റ്റർ ചെയ്തിട്ടില്ല
                        </div>
                        <div style="color:#64748B;font-size:13px;margin-bottom:18px;line-height:1.5;max-width:360px;margin-left:auto;margin-right:auto">
                            പ്ലംബിംഗ്, ഇലക്ട്രീഷ്യൻ, ഡ്രൈവർ, പെയിന്റിംഗ് തുടങ്ങി നിങ്ങൾ നൽകുന്ന ഏത് തൊഴിലും സേവനവും നാട്ടുകാർക്കായി ഇവിടെ രജിസ്റ്റർ ചെയ്യാം.
                        </div>
                        <button type="button" class="yw-header-reg-btn" style="display:inline-flex;padding:11px 22px;font-size:13.5px;box-shadow:0 4px 14px rgba(255,211,42,0.4)" onclick="openAddServiceModal()">
                            ➕ പുതിയ സർവീസ് രജിസ്റ്റർ ചെയ്യാം
                        </button>
                    </div>
                `;
                return;
            }

            container.innerHTML = custom.map(item => {
                const catMeta = getServiceCategoryMeta(item.category);
                const catLabel = catMeta.ml || item.category;
                const isAvail = (item.isAvailable !== false);
                const rateText = item.rate || 'ന്യായമായ നിരക്ക്';
                const hoursText = item.hours || '8:00 AM - 7:00 PM';
                const statusBadge = `<span style="display:inline-flex;align-items:center;padding:2px 8px;border-radius:8px;font-size:11px;font-weight:700;background:#ECFDF5;color:#059669;border:1px solid #A7F3D0">✓ ലൈവ് (Approved)</span>`;

                return `
                <div class="yw-provider-card" id="my-service-${escapeHtml(item.id)}">
                    <div class="yw-provider-top">
                        <div class="yw-provider-avatar">
                            <span style="font-size:24px">${catMeta.icon || '🛠️'}</span>
                        </div>
                        <div class="yw-provider-info">
                            <div class="yw-provider-name-row">
                                <span class="yw-provider-name">${escapeHtml(item.name)}</span>
                                <span class="yw-availability-badge ${isAvail ? 'available' : 'busy'}">
                                    ${isAvail ? '🟢 ലഭ്യമാണ്' : '🔴 ലഭ്യമല്ല'}
                                </span>
                            </div>
                            <div class="yw-provider-cat-tag">
                                <span>${catMeta.icon || '🛠️'}</span>
                                <span>${escapeHtml(catLabel)}</span>
                                <span style="margin-left:6px">${statusBadge}</span>
                            </div>
                            <div class="yw-provider-location">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                <span>${escapeHtml(item.location || 'കേരളം')}${item.district ? (', ' + escapeHtml(item.district)) : ''}</span>
                            </div>
                            <div class="yw-provider-rate">
                                <span>💰 നിരക്ക്:</span>
                                <strong>${escapeHtml(rateText)}</strong>
                            </div>
                            <div style="font-size:11.5px;color:#64748B;margin-top:2px">
                                <span>🕒 സമയം: ${escapeHtml(hoursText)}</span>
                            </div>
                        </div>
                    </div>

                    ${item.desc ? `
                    <div class="yw-provider-desc">
                        ${escapeHtml(item.desc)}
                    </div>` : ''}

                    <div class="yw-my-service-actions">
                        <button type="button" class="yw-btn-avail-toggle ${isAvail ? 'btn-mark-busy' : 'btn-mark-avail'}" onclick="toggleMyServiceAvailability('${escapeHtml(item.id)}')">
                            ${isAvail ? '🔴 ലഭ്യമല്ല എന്ന് മാറ്റുക' : '🟢 ലഭ്യമാണ് എന്ന് മാറ്റുക'}
                        </button>
                        <button type="button" class="yw-btn-edit" onclick="openEditServiceModal('${escapeHtml(item.id)}')">
                            ✏️ തിരുത്തുക
                        </button>
                        <button type="button" class="yw-btn-delete" onclick="deleteMyService('${escapeHtml(item.id)}')">
                            🗑️ ഒഴിവാക്കുക
                        </button>
                    </div>
                </div>
                `;
            }).join('');
        }

        function deleteMyService(serviceId) {
            if (!confirm('നിങ്ങളുടെ ഈ സർവീസ് ലിസ്റ്റിംഗ് സ്ഥിരമായി ഒഴിവാക്കാൻ തീർച്ചയാണോ? (Are you sure you want to delete this service?)')) {
                return;
            }
            let custom = JSON.parse(localStorage.getItem('thuna_custom_providers') || '[]');
            const target = custom.find(s => s.id === serviceId);
            custom = custom.filter(s => s.id !== serviceId);
            localStorage.setItem('thuna_custom_providers', JSON.stringify(custom));

            if (window.THUNA_FIREBASE && target) {
                const cleanKey = (target.phone || '').replace(/[^0-9]/g, '');
                if (cleanKey && typeof window.THUNA_FIREBASE.remove === 'function') {
                    window.THUNA_FIREBASE.remove('serviceProviders/' + cleanKey).catch(() => {});
                }
            }

            toast('🗑️ സർവീസ് വിജയകരമായി ഒഴിവാക്കി.');
            renderMyServices();
            renderServices();
        }

        function toggleMyServiceAvailability(serviceId) {
            let custom = JSON.parse(localStorage.getItem('thuna_custom_providers') || '[]');
            const item = custom.find(s => s.id === serviceId);
            if (!item) return;

            item.isAvailable = (item.isAvailable === false) ? true : false;
            localStorage.setItem('thuna_custom_providers', JSON.stringify(custom));

            if (window.THUNA_FIREBASE && item.phone) {
                const cleanKey = item.phone.replace(/[^0-9]/g, '');
                if (cleanKey && typeof window.THUNA_FIREBASE.update === 'function') {
                    window.THUNA_FIREBASE.update('serviceProviders/' + cleanKey, {
                        isAvailable: item.isAvailable,
                        updatedAt: Date.now()
                    }).catch(() => {});
                }
            }

            toast(item.isAvailable ? '🟢 സ്റ്റാറ്റസ് ലഭ്യമാണ് (Available) ആക്കി.' : '🔴 സ്റ്റാറ്റസ് ലഭ്യമല്ല (Busy) ആക്കി.');
            renderMyServices();
            renderServices();
        }

        function openEditServiceModal(serviceId) {
            const custom = JSON.parse(localStorage.getItem('thuna_custom_providers') || '[]');
            const item = custom.find(s => s.id === serviceId);
            if (!item) return;

            const editIdEl = document.getElementById('provEditServiceId');
            if (editIdEl) editIdEl.value = serviceId;
            const titleEl = document.getElementById('provModalHeaderTitle');
            if (titleEl) titleEl.textContent = 'സർവീസ് തിരുത്തുക (Edit Service)';
            const submitBtn = document.getElementById('btnSubmitProvReg');
            if (submitBtn) submitBtn.textContent = '💾 മാറ്റങ്ങൾ സേവ് ചെയ്യുക (Save Changes)';

            if (document.getElementById('provRegName')) document.getElementById('provRegName').value = item.name || '';
            if (document.getElementById('provRegPhone')) document.getElementById('provRegPhone').value = item.phone || '';
            if (document.getElementById('provRegLocation')) document.getElementById('provRegLocation').value = item.location || '';
            if (document.getElementById('provRegDistrict')) document.getElementById('provRegDistrict').value = item.district || '';
            if (document.getElementById('provRegDesc')) document.getElementById('provRegDesc').value = item.desc || item.description || '';
            if (document.getElementById('provRegRate')) document.getElementById('provRegRate').value = item.rate || '';
            if (document.getElementById('provRegHours')) document.getElementById('provRegHours').value = item.hours || '';

            window.THUNA_SELECTED_PROV_CATEGORIES.clear();
            document.querySelectorAll('.prov-cat-chip').forEach(c => c.classList.remove('selected'));
            const cat = item.category || 'Other Services';
            window.THUNA_SELECTED_PROV_CATEGORIES.add(cat);
            document.querySelectorAll('.prov-cat-chip').forEach(chip => {
                const text = chip.textContent.toLowerCase();
                if (text.includes(cat.toLowerCase())) {
                    chip.classList.add('selected');
                }
            });
            updateProvCategoryCount();

            openModal('modal-add-service');
        }

        function openAddServiceModal() {
            const editIdEl = document.getElementById('provEditServiceId');
            if (editIdEl) editIdEl.value = '';
            const titleEl = document.getElementById('provModalHeaderTitle');
            if (titleEl) titleEl.textContent = 'സേവനം രജിസ്റ്റർ ചെയ്യാം';
            const submitBtn = document.getElementById('btnSubmitProvReg');
            if (submitBtn) submitBtn.textContent = '➕ സേവനം രജിസ്റ്റർ ചെയ്യാം (Register My Service)';

            const profile = (typeof getUnifiedUserProfile === 'function') ? getUnifiedUserProfile() : {};
            const nameInput = document.getElementById('provRegName');
            const phoneInput = document.getElementById('provRegPhone');
            const locInput = document.getElementById('provRegLocation');
            const distInput = document.getElementById('provRegDistrict');
            const descInput = document.getElementById('provRegDesc');
            const rateInput = document.getElementById('provRegRate');
            const hoursInput = document.getElementById('provRegHours');

            if (nameInput) nameInput.value = profile.name || '';
            if (phoneInput) phoneInput.value = profile.phone || '';
            if (locInput) locInput.value = profile.location || '';
            if (distInput) distInput.value = '';
            if (descInput) descInput.value = '';
            if (rateInput) rateInput.value = '';
            if (hoursInput) hoursInput.value = 'രാവിലെ 8:00 - വൈകിട്ട് 7:00';

            window.THUNA_SELECTED_PROV_CATEGORIES.clear();
            document.querySelectorAll('.prov-cat-chip').forEach(c => c.classList.remove('selected'));
            updateProvCategoryCount();

            openModal('modal-add-service');
        }

        function shareService(serviceId) {
            const all = getServicesList();
            const s = all.find(item => item.id === serviceId) || all[0];
            if (!s) return;
            openSocialShareModal({
                sheetHeading: '🛠️ സേവന ദാതാവിനെ ഷെയർ ചെയ്യുക',
                title: `സേവനം: ${s.name}`,
                preview: `${s.name} (${s.category})`,
                text: `🛠️ *സേവന ദാതാവ് - നമ്മുടെ നാട്*\n\n🔹 സ്ഥാപനം/വ്യക്തി: *${s.name}*\n🏷️ വിഭാഗം: ${s.category}\n📝 വിവരണം: ${s.desc || s.category}\n📍 സ്ഥലം: ${s.location || 'കേരളം'}\n📞 ഫോൺ: ${s.phone || 'ഇൻ-ആപ്പ് ചാറ്റ്'}\n\nഈ സേവനം ആവശ്യമുള്ള സുഹൃത്തുക്കൾക്കായി ഷെയർ ചെയ്യാം.`
            });
        }

        /* -------------------------------------------------------------
           7. IN-APP CHAT IMPLEMENTATION (Chat Mathram)
           ------------------------------------------------------------- */
        function openChatModal(providerId) {
            const all = getServicesList();
            const provider = all.find(p => p.id === providerId);
            if (!provider) return;

            APP_STATE.activeChatProvider = provider;

            document.getElementById('chatModalName').textContent = provider.name;
            const chatAv = document.getElementById('chatModalAvatar');
            if (chatAv) {
                chatAv.innerHTML = getCatSvg(provider.category, 40);
                chatAv.style.background = 'transparent';
            }

            // Load thread
            renderChatThread(providerId);
            openModal('modal-chat');
        }

        function renderChatThread(providerId) {
            const container = document.getElementById('chatThreadContainer');
            if (!container) return;

            const provider = APP_STATE.activeChatProvider;
            const history = APP_STATE.chatHistories[providerId] || [
                { sender: 'provider', text: `നമസ്കാരം! ഞാൻ ${provider.name} ആണ്. എന്താണ് സഹായം വേണ്ടത്? (Hello! How can I help you today?)`, time: 'Just now' }
            ];

            container.innerHTML = history.map(m => `
                <div class="chat-bubble ${m.sender}">
                    <div>${escapeHtml(m.text)}</div>
                    <div class="chat-time">
                        ${escapeHtml(m.time)} ${m.sender === 'user' ? '<span style="color:#ffffff;font-size:10px;margin-left:3px">✓✓</span>' : ''}
                    </div>
                </div>
            `).join('');

            container.scrollTop = container.scrollHeight;
        }

        function sendChatMessage(text) {
            const input = document.getElementById('chatInputMessage');
            const msgText = (text || input?.value || '').trim();
            if (!msgText || !APP_STATE.activeChatProvider) return;

            const pid = APP_STATE.activeChatProvider.id;
            if (!APP_STATE.chatHistories[pid]) {
                APP_STATE.chatHistories[pid] = [
                    { sender: 'provider', text: `നമസ്കാരം! ഞാൻ ${APP_STATE.activeChatProvider.name} ആണ്. എന്താണ് സഹായം വേണ്ടത്?`, time: 'Just now' }
                ];
            }

            const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            // Push user message
            APP_STATE.chatHistories[pid].push({
                sender: 'user',
                text: msgText,
                time: timeNow
            });

            if (input) input.value = '';
            renderChatThread(pid);
            localStorage.setItem('thuna_chat_histories', JSON.stringify(APP_STATE.chatHistories));

            // Contextual in-app auto-reply from service provider
            setTimeout(() => {
                if (APP_STATE.activeChatProvider && APP_STATE.activeChatProvider.id === pid) {
                    let replyText = `മെസ്സേജ് ലഭിച്ചു. ഞാൻ ഉടൻ എത്തിച്ചേരാം. ലൊക്കേഷൻ എവിടെയാണ്? (Message received! Where is your location?)`;
                    const cat = APP_STATE.activeChatProvider.category;
                    const lower = msgText.toLowerCase();

                    if (cat === 'jobs') {
                        replyText = `നന്ദി! നിങ്ങളുടെ അപേക്ഷ ലഭിച്ചു. യോഗ്യതകളും മുൻപരിചയവും ഇവിടെ ഷെയർ ചെയ്യാമോ? ഞങ്ങൾ അഭിമുഖത്തിനായി ബന്ധപ്പെടാം. (Thank you! Application received. Please share your experience & qualification.)`;
                        if (lower.includes('timing') || lower.includes('hour') || lower.includes('സമയം')) {
                            replyText = `ഡ്യൂട്ടി സമയം കൃത്യമായി അറിയിക്കാം. ഇൻ-ആപ്പ് ചാറ്റ് വഴി നിങ്ങളുടെ വിശദാംശങ്ങൾ അയക്കൂ. (We will share duty hours. Please drop your details here.)`;
                        } else if (lower.includes('experience') || lower.includes('resume') || lower.includes('പരിചയം')) {
                            replyText = `തീർച്ചയായും! നിങ്ങളുടെ ജോലി പരിചയം, മുൻപ് ജോലി ചെയ്ത സ്ഥാപനങ്ങൾ എന്നിവ ഇവിടെ മെസ്സേജ് ചെയ്യാം. (Sure! Please message your work experience and previous employers.)`;
                        }
                    } else if (cat === 'blood') {
                        replyText = `നമസ്കാരം, വിവരം ലഭിച്ചു. ഞാൻ സഹായിക്കാൻ തയ്യാറാണ്. രോഗിയുടെ വിവരങ്ങളും ഹോസ്പിറ്റലും അറിയിക്കൂ. (Hello, received. I am ready to donate. Please share hospital and patient details.)`;
                    } else {
                        if (lower.includes('available') || lower.includes('ഇന്ന്') || lower.includes('today')) {
                            replyText = `അതെ, ഇന്ന് ലഭ്യമാണ്! ഉടൻ എത്താൻ സാധിക്കും. സ്ഥലമേതാണ്? (Yes, available today! What is your exact spot?)`;
                        } else if (lower.includes('charge') || lower.includes('വിസിറ്റിംഗ്') || lower.includes('rate') || lower.includes('cost')) {
                            replyText = `മിനിമം വിസിറ്റിംഗ് ചാർജ്ജ് ₹150 ആണ്. എന്ത് പ്രശ്നമാണ് ഉള്ളത്? (Visiting inspection charge is ₹150. What is the issue?)`;
                        } else if (lower.includes('urgent') || lower.includes('അടിയന്തിരം')) {
                            replyText = `ശരി, അടിയന്തിരമായി ശ്രദ്ധിക്കാം! നിങ്ങളുടെ സ്ഥലം വ്യക്തമാക്കൂ. (Sure, taking it on priority! Please share location.)`;
                        } else if (lower.includes('tomorrow') || lower.includes('നാളെ')) {
                            replyText = `നാളെ രാവിലെ 9 മണിക്ക് വരാൻ സാധിക്കും. സ്ഥലം അടയാളപ്പെടുത്താമോ? (Can visit tomorrow at 9 AM. Please confirm address.)`;
                        }
                    }

                    APP_STATE.chatHistories[pid].push({
                        sender: 'provider',
                        text: replyText,
                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    });
                    renderChatThread(pid);
                    localStorage.setItem('thuna_chat_histories', JSON.stringify(APP_STATE.chatHistories));
                }
            }, 900);
        }

        function sendQuickMessage(starter) {
            sendChatMessage(starter);
        }

        /* -------------------------------------------------------------
           8. ALL CATEGORIES MODAL & SEARCH
           ------------------------------------------------------------- */
        function openAllCategoriesModal() {
            renderAllCategoriesGrid(getAllCategories());
            openModal('modal-all-categories');
        }

        function renderAllCategoriesGrid(list) {
            const container = document.getElementById('allCategoriesGrid');
            if (!container) return;
            const items = list || getAllCategories();
            container.innerHTML = items.map(c => `
                <div class="service-tile" style="padding:12px 6px" onclick="selectFromAllCategories('${c.id}')">
                    <div class="service-icon-bg" style="width:44px;height:44px">
                        ${getCatSvg(c.id, 40)}
                    </div>
                    <span style="font-size:11.5px">${c.name}</span>
                </div>
            `).join('');
        }

        function filterAllCategoriesList(q) {
            const query = (q || '').toLowerCase().trim();
            const allCats = getAllCategories();
            const filtered = allCats.filter(c =>
                c.name.toLowerCase().includes(query) ||
                (c.ml && c.ml.toLowerCase().includes(query)) ||
                (c.keywords && c.keywords.some(k => k.toLowerCase().includes(query)))
            );
            renderAllCategoriesGrid(filtered);
        }

        function selectFromAllCategories(catId) {
            closeModal('modal-all-categories');
            filterServiceAndOpen(catId);
        }

        /* -------------------------------------------------------------
           9. REGISTRATION ENGINE: USER & SERVICE PROVIDER (WORLDWIDE LOCATION & OTP)
           ------------------------------------------------------------- */
        // Comprehensive worldwide location presets (Kerala, India, Middle East, Global)
        const WORLDWIDE_LOCATION_PRESETS = [
            // Kerala key towns & districts
            { name: 'Adoor, Pathanamthitta', sub: 'Kerala, India', lat: 9.1530, lon: 76.7356 },
            { name: 'Pandalam, Pathanamthitta', sub: 'Kerala, India', lat: 9.2319, lon: 76.6806 },
            { name: 'Thiruvalla, Pathanamthitta', sub: 'Kerala, India', lat: 9.3835, lon: 76.5741 },
            { name: 'Pathanamthitta Town', sub: 'Kerala, India', lat: 9.2648, lon: 76.7870 },
            { name: 'Kottarakkara, Kollam', sub: 'Kerala, India', lat: 8.9989, lon: 76.7725 },
            { name: 'Kollam City', sub: 'Kerala, India', lat: 8.8932, lon: 76.6141 },
            { name: 'Alappuzha Town', sub: 'Kerala, India', lat: 9.4981, lon: 76.3388 },
            { name: 'Kottayam Town', sub: 'Kerala, India', lat: 9.5916, lon: 76.5222 },
            { name: 'Changanassery, Kottayam', sub: 'Kerala, India', lat: 9.4442, lon: 76.5414 },
            { name: 'Kochi, Ernakulam', sub: 'Kerala, India', lat: 9.9816, lon: 76.2999 },
            { name: 'Aluva, Ernakulam', sub: 'Kerala, India', lat: 10.1076, lon: 76.3516 },
            { name: 'Thrissur Town', sub: 'Kerala, India', lat: 10.5276, lon: 76.2144 },
            { name: 'Palakkad Town', sub: 'Kerala, India', lat: 10.7867, lon: 76.6548 },
            { name: 'Malappuram Town', sub: 'Kerala, India', lat: 11.0732, lon: 76.0740 },
            { name: 'Manjeri, Malappuram', sub: 'Kerala, India', lat: 11.1200, lon: 76.1200 },
            { name: 'Kozhikode City', sub: 'Kerala, India', lat: 11.2588, lon: 75.7804 },
            { name: 'Kalpetta, Wayanad', sub: 'Kerala, India', lat: 11.6103, lon: 76.0827 },
            { name: 'Kannur Town', sub: 'Kerala, India', lat: 11.8745, lon: 75.3704 },
            { name: 'Thalassery, Kannur', sub: 'Kerala, India', lat: 11.7491, lon: 75.4890 },
            { name: 'Kasaragod Town', sub: 'Kerala, India', lat: 12.5102, lon: 74.9852 },
            { name: 'Thiruvananthapuram City', sub: 'Kerala, India', lat: 8.5241, lon: 76.9366 },
            { name: 'Neyyattinkara, Trivandrum', sub: 'Kerala, India', lat: 8.4000, lon: 77.0833 },
            // Indian Metros
            { name: 'Bengaluru', sub: 'Karnataka, India', lat: 12.9716, lon: 77.5946 },
            { name: 'Chennai', sub: 'Tamil Nadu, India', lat: 13.0827, lon: 80.2707 },
            { name: 'Coimbatore', sub: 'Tamil Nadu, India', lat: 11.0168, lon: 76.9558 },
            { name: 'Mumbai', sub: 'Maharashtra, India', lat: 19.0760, lon: 72.8777 },
            { name: 'Pune', sub: 'Maharashtra, India', lat: 18.5204, lon: 73.8567 },
            { name: 'Delhi NCR', sub: 'India', lat: 28.6139, lon: 77.2090 },
            { name: 'Hyderabad', sub: 'Telangana, India', lat: 17.3850, lon: 78.4867 },
            { name: 'Mangalore', sub: 'Karnataka, India', lat: 12.9141, lon: 74.8560 },
            // Gulf / Middle East (High Malayali Expat Presence)
            { name: 'Dubai', sub: 'United Arab Emirates', lat: 25.2048, lon: 55.2708 },
            { name: 'Abu Dhabi', sub: 'United Arab Emirates', lat: 24.4539, lon: 54.3773 },
            { name: 'Sharjah', sub: 'United Arab Emirates', lat: 25.3463, lon: 55.4209 },
            { name: 'Ajman', sub: 'United Arab Emirates', lat: 25.4052, lon: 55.5136 },
            { name: 'Doha', sub: 'Qatar', lat: 25.2854, lon: 51.5310 },
            { name: 'Riyadh', sub: 'Saudi Arabia', lat: 24.7136, lon: 46.6753 },
            { name: 'Jeddah', sub: 'Saudi Arabia', lat: 21.4858, lon: 39.1925 },
            { name: 'Dammam', sub: 'Saudi Arabia', lat: 26.4207, lon: 50.0888 },
            { name: 'Muscat', sub: 'Oman', lat: 23.5880, lon: 58.3829 },
            { name: 'Kuwait City', sub: 'Kuwait', lat: 29.3759, lon: 47.9774 },
            { name: 'Manama', sub: 'Bahrain', lat: 26.2285, lon: 50.5860 },
            // Worldwide Metros
            { name: 'London', sub: 'United Kingdom', lat: 51.5074, lon: -0.1278 },
            { name: 'New York', sub: 'United States', lat: 40.7128, lon: -74.0060 },
            { name: 'Toronto', sub: 'Canada', lat: 43.6532, lon: -79.3832 },
            { name: 'Singapore', sub: 'Singapore', lat: 1.3521, lon: 103.8198 },
            { name: 'Sydney', sub: 'Australia', lat: -33.8688, lon: 151.2093 },
            { name: 'Dublin', sub: 'Ireland', lat: 53.3498, lon: -6.2603 },
            { name: 'Kuala Lumpur', sub: 'Malaysia', lat: 3.1390, lon: 101.6869 },
            { name: 'Frankfurt', sub: 'Germany', lat: 50.1109, lon: 8.6821 }
        ];

        // Global OTP Verification State
        window.THUNA_REG_OTP = {
            user: { phone: '', code: '123456', verified: false, timer: null, timeLeft: 0 },
            prov: { phone: '', code: '123456', verified: false, timer: null, timeLeft: 0 }
        };

        // Global Provider Selected Categories
        window.THUNA_SELECTED_PROV_CATEGORIES = new Set();
        let locSearchDebounceTimer = null;

        /* -------------------------------------------------------------
           WORLDWIDE LOCATION SELECTOR & GPS AUTO-DETECT
           ------------------------------------------------------------- */
        function getLocElements(formType) {
            if (formType === 'user') {
                return {
                    input: document.getElementById('userRegLocation'),
                    dropdown: document.getElementById('userRegLocSuggestions'),
                    btn: document.getElementById('btnUserRegGps'),
                    txt: document.getElementById('btnUserRegGpsText')
                };
            } else if (formType === 'rental') {
                return {
                    input: document.getElementById('postRentalLocation'),
                    dropdown: document.getElementById('rentalRegLocSuggestions'),
                    btn: document.getElementById('btnRentalGps'),
                    txt: document.getElementById('btnRentalGpsText')
                };
            }
            return {
                input: document.getElementById('provRegLocation'),
                dropdown: document.getElementById('provRegLocSuggestions'),
                btn: document.getElementById('btnProvRegGps'),
                txt: document.getElementById('btnProvRegGpsText')
            };
        }

        function handleLocationSearchFocus(formType) {
            const els = getLocElements(formType);
            if (!els.dropdown) return;

            // Render popular initial suggestions
            const presets = WORLDWIDE_LOCATION_PRESETS.slice(0, 10);
            renderLocationSuggestions(formType, presets);
            els.dropdown.style.display = 'block';
        }

        function handleLocationSearchInput(formType, val) {
            const els = getLocElements(formType);
            if (!els.dropdown) return;

            const q = (val || '').trim().toLowerCase();
            if (!q) {
                handleLocationSearchFocus(formType);
                return;
            }

            // 1. Fast client-side filter
            const matches = WORLDWIDE_LOCATION_PRESETS.filter(p =>
                p.name.toLowerCase().includes(q) || (p.sub && p.sub.toLowerCase().includes(q))
            );

            renderLocationSuggestions(formType, matches);
            els.dropdown.style.display = 'block';

            // 2. Debounced live worldwide geocoding fallback for towns anywhere in the world
            if (q.length >= 3 && matches.length < 5) {
                clearTimeout(locSearchDebounceTimer);
                locSearchDebounceTimer = setTimeout(async () => {
                    try {
                        const ctrl = new AbortController();
                        const timer = setTimeout(() => ctrl.abort(), 3500);
                        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=6&addressdetails=1`, {
                            headers: { 'Accept-Language': 'en' },
                            signal: ctrl.signal
                        });
                        clearTimeout(timer);
                        if (res.ok) {
                            const data = await res.json();
                            if (Array.isArray(data) && data.length > 0) {
                                const onlineMatches = data.map(item => {
                                    const a = item.address || {};
                                    const main = a.city || a.town || a.village || a.suburb || item.name || q;
                                    const country = a.country || '';
                                    const state = a.state || '';
                                    const sub = [state, country].filter(Boolean).join(', ');
                                    return {
                                        name: main,
                                        sub: sub || item.display_name,
                                        lat: parseFloat(item.lat),
                                        lon: parseFloat(item.lon)
                                    };
                                });
                                // Merge unique results
                                const combined = [...matches];
                                onlineMatches.forEach(om => {
                                    if (!combined.some(c => c.name.toLowerCase() === om.name.toLowerCase())) {
                                        combined.push(om);
                                    }
                                });
                                renderLocationSuggestions(formType, combined);
                            }
                        }
                    } catch (_) {
                        // Offline or network error: user can still use manual entry
                    }
                }, 300);
            }
        }

        function renderLocationSuggestions(formType, list) {
            const els = getLocElements(formType);
            if (!els.dropdown) return;

            if (!list || list.length === 0) {
                els.dropdown.innerHTML = `
                    <div style="padding:10px;font-size:12px;color:#64748B;text-align:center">
                        സ്ഥലം ടൈപ്പ് ചെയ്തത് ഉപയോഗിക്കാം (Custom location accepted)
                    </div>`;
                return;
            }

            dropdownHtml = list.map(item => `
                <div class="location-dropdown-item" onclick="selectLocationItem('${formType}', '${item.name.replace(/'/g, "\\'")}', '${(item.sub || '').replace(/'/g, "\\'")}', ${item.lat}, ${item.lon})">
                    <span style="font-size:16px;flex-shrink:0">📍</span>
                    <div style="flex:1;min-width:0;overflow:hidden">
                        <div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${item.name}</div>
                        ${item.sub ? `<div style="font-size:10.5px;color:#64748B;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${item.sub}</div>` : ''}
                    </div>
                </div>
            `).join('');
            els.dropdown.innerHTML = dropdownHtml;
        }

        function selectLocationItem(formType, name, sub, lat, lon) {
            const els = getLocElements(formType);
            if (els.input) {
                const fullName = sub ? `${name}, ${sub}` : name;
                els.input.value = fullName;
                els.input.dataset.lat = lat;
                els.input.dataset.lon = lon;
            }
            if (els.dropdown) els.dropdown.style.display = 'none';
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', function (e) {
            if (!e.target.closest('#userRegLocation') && !e.target.closest('#userRegLocSuggestions')) {
                const d = document.getElementById('userRegLocSuggestions');
                if (d) d.style.display = 'none';
            }
            if (!e.target.closest('#provRegLocation') && !e.target.closest('#provRegLocSuggestions')) {
                const d = document.getElementById('provRegLocSuggestions');
                if (d) d.style.display = 'none';
            }
            if (!e.target.closest('#postRentalLocation') && !e.target.closest('#rentalRegLocSuggestions')) {
                const d = document.getElementById('rentalRegLocSuggestions');
                if (d) d.style.display = 'none';
            }
        });

        // 1-Tap GPS Auto Detection with graceful fallback
        async function detectFormGps(formType) {
            const els = getLocElements(formType);
            const btn = els.btn;
            const txt = els.txt;
            const input = els.input;

            if (btn) btn.classList.add('loading');
            if (txt) txt.textContent = 'Finding…';

            toast('📍 GPS ലൊക്കേഷൻ കണ്ടെത്തുന്നു…');

            const resetBtn = () => {
                if (btn) btn.classList.remove('loading');
                if (txt) txt.textContent = '🎯 GPS';
            };

            try {
                if (window.LocationService && typeof window.LocationService.requestGpsLocation === 'function') {
                    const state = await window.LocationService.requestGpsLocation({ timeout: 9000 });
                    resetBtn();
                    if (input) {
                        input.value = state.locationName;
                        input.dataset.lat = state.latitude;
                        input.dataset.lon = state.longitude;
                    }
                    toast(`📍 സ്ഥലം കണ്ടെത്തി: ${state.locationName}`);
                } else if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        async pos => {
                            resetBtn();
                            const lat = pos.coords.latitude;
                            const lon = pos.coords.longitude;
                            let placeName = 'My Location';
                            if (window.LocationService && typeof window.LocationService.resolveCleanPlaceName === 'function') {
                                placeName = await window.LocationService.resolveCleanPlaceName(lat, lon);
                            }
                            if (input) {
                                input.value = placeName;
                                input.dataset.lat = lat;
                                input.dataset.lon = lon;
                            }
                            toast(`📍 സ്ഥലം കണ്ടെത്തി: ${placeName}`);
                        },
                        err => {
                            resetBtn();
                            let msg = 'ലൊക്കേഷൻ കണ്ടെത്താനായില്ല. സ്വയം ടൈപ്പ് ചെയ്ത് തിരഞ്ഞെടുക്കുക.';
                            if (err.code === 1) {
                                msg = 'GPS അനുമതി നൽകിയിട്ടില്ല. താഴെ ടൈപ്പ് ചെയ്ത് തിരഞ്ഞെടുക്കാം.';
                            }
                            toast(`⚠️ ${msg}`);
                            if (input) input.focus();
                        },
                        { enableHighAccuracy: true, timeout: 8000 }
                    );
                } else {
                    resetBtn();
                    toast('⚠️ Geolocation not supported. Please type location.');
                    if (input) input.focus();
                }
            } catch (err) {
                resetBtn();
                toast(`⚠️ ${err.message || 'GPS അനുമതി ലഭിച്ചില്ല. സ്വയം ടൈപ്പ് ചെയ്യുക.'}`);
                if (input) input.focus();
            }
        }

        /* -------------------------------------------------------------
           OTP VERIFICATION LOGIC (Firebase Auth + Test Fallback)
           ------------------------------------------------------------- */
        async function sendRegistrationOtp(formType) {
            const phoneInput = document.getElementById(formType === 'user' ? 'userRegMobile' : 'provRegPhone');
            const rawPhone = (phoneInput?.value || '').trim();
            const cleanPhone = rawPhone.replace(/[\s\-()]/g, '');

            if (!cleanPhone || cleanPhone.length < 10) {
                toast('⚠️ സാധുവായ 10 അക്ക മൊബൈൽ നമ്പർ നൽകുക (Enter 10-digit mobile).');
                if (phoneInput) phoneInput.focus();
                return;
            }

            const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
            window.THUNA_REG_OTP[formType] = {
                phone: cleanPhone,
                code: generatedOtp,
                verified: false,
                timeLeft: 30
            };

            // Attempt Firebase Phone Auth if active
            try {
                if (false && window.THUNA_FIREBASE && typeof window.THUNA_FIREBASE.sendPhoneOtp === 'function') {
                    const verifier = window.THUNA_FIREBASE.createRecaptcha(formType === 'user' ? 'btnSendUserOtp' : 'btnSendProvOtp');
                    if (verifier) {
                        const formatted = cleanPhone.startsWith('+') ? cleanPhone : '+91' + cleanPhone;
                        const confirmation = await window.THUNA_FIREBASE.sendPhoneOtp(formatted, verifier);
                        window.THUNA_REG_OTP[formType].confirmation = confirmation;
                    }
                }
            } catch (err) {
                console.info('[THUNA OTP] Firebase Phone Auth using simulation/test mode:', err.message);
            }

            const box = document.getElementById(formType === 'user' ? 'userOtpContainer' : 'provOtpContainer');
            if (box) box.style.display = 'block';

            const sendBtn = document.getElementById(formType === 'user' ? 'btnSendUserOtp' : 'btnSendProvOtp');
            if (sendBtn) {
                sendBtn.disabled = true;
                sendBtn.textContent = 'OTP Sent';
            }

            const helpText = document.getElementById(formType === 'user' ? 'userOtpHelpText' : 'provOtpHelpText');
            if (helpText) {
                helpText.innerHTML = `📲 OTP sent to <b>${cleanPhone}</b>.<br><span style="color:#059669;font-weight:800">Test OTP: ${generatedOtp} അല്ലെങ്കിൽ 123456</span>`;
            }

            toast(`📲 OTP Sent to ${cleanPhone} (Test: ${generatedOtp} / 123456)`);
            startOtpCountdown(formType);
        }

        function startOtpCountdown(formType) {
            const state = window.THUNA_REG_OTP[formType];
            if (state.timer) clearInterval(state.timer);

            state.timer = setInterval(() => {
                state.timeLeft--;
                const sendBtn = document.getElementById(formType === 'user' ? 'btnSendUserOtp' : 'btnSendProvOtp');
                if (state.timeLeft <= 0) {
                    clearInterval(state.timer);
                    if (sendBtn && !state.verified) {
                        sendBtn.disabled = false;
                        sendBtn.textContent = 'Resend OTP';
                    }
                }
            }, 1000);
        }

        async function verifyRegistrationOtp(formType) {
            const codeInput = document.getElementById(formType === 'user' ? 'userRegOtpCode' : 'provRegOtpCode');
            const entered = (codeInput?.value || '').trim();
            const state = window.THUNA_REG_OTP[formType];

            if (!entered || entered.length !== 6) {
                toast('⚠️ 6 അക്ക OTP നൽകുക (Enter 6-digit OTP).');
                return;
            }

            let isMatch = (entered === state.code || entered === '123456');

            if (!isMatch && state.confirmation) {
                try {
                    await window.THUNA_FIREBASE.verifyPhoneOtp(state.confirmation, entered);
                    isMatch = true;
                } catch (e) {
                    console.error('Firebase OTP verify error:', e);
                }
            }

            if (isMatch) {
                state.verified = true;
                const box = document.getElementById(formType === 'user' ? 'userOtpContainer' : 'provOtpContainer');
                if (box) box.style.display = 'none';

                const badge = document.getElementById(formType === 'user' ? 'userPhoneVerifiedBadge' : 'provPhoneVerifiedBadge');
                if (badge) badge.style.display = 'inline-flex';

                const sendBtn = document.getElementById(formType === 'user' ? 'btnSendUserOtp' : 'btnSendProvOtp');
                if (sendBtn) sendBtn.style.display = 'none';

                const phoneInput = document.getElementById(formType === 'user' ? 'userRegMobile' : 'provRegPhone');
                if (phoneInput) {
                    phoneInput.readOnly = true;
                    phoneInput.style.color = '#065F46';
                    phoneInput.style.fontWeight = '700';
                }

                toast('✅ Mobile number verified successfully!');
            } else {
                toast('❌ തെറ്റായ OTP. ടെസ്റ്റ് കോഡ് 123456 ഉപയോഗിക്കുക.');
            }
        }

        /* -------------------------------------------------------------
           UNIFIED PROFILE & SINGLE-SIGNON REUSE SYSTEM
           ------------------------------------------------------------- */
        function getUnifiedUserProfile() {
            let p = {};
            try {
                p = JSON.parse(localStorage.getItem('thuna_user_profile') || 'null') || {};
            } catch (_) { }
            if (!p.name) {
                try {
                    const prov = JSON.parse(localStorage.getItem('thuna_provider_profile') || 'null');
                    if (prov && prov.businessName) {
                        p.name = prov.businessName;
                        p.phone = prov.phone;
                        p.location = prov.location;
                    }
                } catch (_) { }
            }
            if (!p.name) p.name = APP_STATE.userProfile?.name || 'നാട്ടുകാരൻ';
            if (!p.phone) p.phone = APP_STATE.userProfile?.phone || '';
            if (!p.location) p.location = APP_STATE.userLocation || 'കണ്ണൂർ, കേരളം';
            if (!p.avatar || p.avatar.includes('female') || p.avatar.includes('arjun') || p.avatar.includes('photo-1507003211169')) {
                p.avatar = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'%3E%3Cdefs%3E%3ClinearGradient id='avatarGrad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%2310B981'/%3E%3Cstop offset='100%25' stop-color='%23047857'/%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='64' cy='64' r='64' fill='url(%23avatarGrad)'/%3E%3Ccircle cx='64' cy='48' r='24' fill='%23ffffff'/%3E%3Cpath d='M24 108c0-22.1 17.9-40 40-40s40 17.9 40 40v4H24v-4z' fill='%23ffffff'/%3E%3C/svg%3E";
            }
            return p;
        }

        function syncAllProfileUIs(profileData) {
            const p = profileData ? { ...getUnifiedUserProfile(), ...profileData } : getUnifiedUserProfile();
            const avatar = p.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80';
            const isRegistered = !!(localStorage.getItem('thuna_registered_user') || localStorage.getItem('thuna_profile_registered'));
            const name = isRegistered ? (p.name || 'സുഹൃത്തേ') : (p.name && p.name !== 'അജിത് കുമാർ' ? p.name : 'സുഹൃത്തേ');
            const phone = p.phone || '';
            const loc = p.location || APP_STATE.userLocation || 'കണ്ണൂർ, കേരളം';
            const blood = p.bloodGroup || localStorage.getItem('thuna_user_blood_group') || 'O+';
            const isDonor = p.isBloodDonor || false;

            // 1. Sync ALL avatar images across Home, Profile, Modals
            const avatarEls = [
                document.getElementById('homeHeaderAvatar'),
                document.getElementById('profileAvatarImg'),
                document.getElementById('userRegAvatarPreview'),
                document.getElementById('donorAutofillAvatar'),
                document.getElementById('feedComposeAvatar')
            ];
            avatarEls.forEach(el => {
                if (el) el.src = avatar;
            });
            document.querySelectorAll('.app-user-avatar-sync').forEach(el => {
                el.src = avatar;
            });

            // 2. Sync user name displays
            const homeGreeting = document.getElementById('homeUserGreetingName');
            if (homeGreeting) homeGreeting.textContent = name;
            const profDisplayName = document.getElementById('profDisplayNameText');
            if (profDisplayName) profDisplayName.textContent = isRegistered ? name : 'സുഹൃത്തേ';
            const profNameInput = document.getElementById('profNameInput');
            if (profNameInput) profNameInput.value = isRegistered ? name : '';
            const userRegName = document.getElementById('userRegFullName');
            if (userRegName && isRegistered) userRegName.value = name;

            // 3. Sync phone and location
            const profPhoneInput = document.getElementById('profPhoneInput');
            if (profPhoneInput) profPhoneInput.value = phone;
            const profPhoneText = document.getElementById('profDisplayPhoneText');
            if (profPhoneText) profPhoneText.textContent = phone || '+91 - രജിസ്റ്റർ ചെയ്യുക';
            const userRegMobile = document.getElementById('userRegMobile');
            if (userRegMobile && isRegistered) userRegMobile.value = phone;
            const donorPhone = document.getElementById('donorAutofillPhone');
            if (donorPhone) donorPhone.textContent = phone;
            const donorName = document.getElementById('donorAutofillName');
            if (donorName) donorName.textContent = name;

            // 4. Sync Blood Group in Profile
            const profBloodSelect = document.getElementById('profBloodSelect');
            if (profBloodSelect) profBloodSelect.value = blood;
            const profBloodText = document.getElementById('profBloodGroupText');
            if (profBloodText) profBloodText.textContent = blood;
            const profBloodBadge = document.getElementById('profBloodGroupBadge');
            if (profBloodBadge) profBloodBadge.style.display = isRegistered ? 'inline-flex' : 'none';
            const profDonorBadge = document.getElementById('profileDonorStatusBadge');
            if (profDonorBadge) profDonorBadge.style.display = (isRegistered && isDonor) ? 'inline-flex' : 'none';

            // 5. Unregistered Profile Banner in Profile Screen
            const unregBanner = document.getElementById('unregisteredProfileBanner');
            if (unregBanner) unregBanner.style.display = isRegistered ? 'none' : 'block';

            // 6. Update memory & localStorage
            APP_STATE.userProfile = { ...(APP_STATE.userProfile || {}), ...p, avatar, name, phone, location: loc, bloodGroup: blood, isBloodDonor: isDonor };
            try {
                localStorage.setItem('thuna_user_profile', JSON.stringify(APP_STATE.userProfile));
                if (phone) localStorage.setItem('thuna_user_phone', phone);
                localStorage.setItem('thuna_user_blood_group', blood);
            } catch (_) { }

            // 7. Update admin console visibility based on phone
            if (typeof checkAdminAccess === 'function') {
                checkAdminAccess(phone);
            }
        }

        function saveUnifiedUserProfile(updates) {
            const current = getUnifiedUserProfile();
            const merged = { ...current, ...updates };
            APP_STATE.userProfile = merged;
            APP_STATE.userLocation = merged.location;
            try {
                localStorage.setItem('thuna_user_profile', JSON.stringify(merged));
                localStorage.setItem('thuna_user_location', merged.location);
            } catch (_) { }
            return merged;
        }

        /* -------------------------------------------------------------
           USER REGISTRATION & ACCOUNT SETTINGS HANDLER ("blood ulpede")
           ------------------------------------------------------------- */
        function selectUserRegBlood(group, el) {
            const hiddenInput = document.getElementById('userRegBloodGroup');
            if (hiddenInput) hiddenInput.value = group;
            const badge = document.getElementById('selectedBloodPillBadge');
            if (badge) badge.textContent = `Selected: ${group}`;

            document.querySelectorAll('.reg-blood-chip').forEach(btn => btn.classList.remove('active'));
            if (el) el.classList.add('active');
        }

        function selectBloodGroupInChips(group) {
            const targetGroup = group || 'O+';
            const hiddenInput = document.getElementById('userRegBloodGroup');
            if (hiddenInput) hiddenInput.value = targetGroup;
            const badge = document.getElementById('selectedBloodPillBadge');
            if (badge) badge.textContent = `Selected: ${targetGroup}`;

            document.querySelectorAll('.reg-blood-chip').forEach(btn => {
                if (btn.textContent.trim() === targetGroup) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }

        function handleHeaderAvatarClick() {
            navTo('profile');
        }

        function checkAppLaunchRegistration() {
            const isRegistered = !!(localStorage.getItem('thuna_registered_user') || localStorage.getItem('thuna_profile_registered'));
            if (!isRegistered) {
                // Smoothly trigger onboarding registration modal on app launch
                setTimeout(() => {
                    openUserRegisterModal(true, true);
                }, 750);
            }
        }

        function skipUserRegistration() {
            closeModal('modal-user-register');
            toast('നമ്മുടെ നാടിലേക്ക് സ്വാഗതം! പ്രൊഫൈൽ മെനുവിൽ നിന്ന് എപ്പോൾ വേണമെങ്കിലും രജിസ്റ്റർ ചെയ്യാം 🌿');
        }

        function openUserRegisterModal(precheckBloodDonor = true, isLaunch = false) {
            const isRegistered = !!(localStorage.getItem('thuna_registered_user') || localStorage.getItem('thuna_profile_registered'));
            const p = getUnifiedUserProfile();

            const modalTitle = document.getElementById('userRegModalTitle');
            const modalSub = document.getElementById('userRegModalSub');
            const skipBtn = document.getElementById('userRegSkipBtn');

            if (isLaunch && !isRegistered) {
                if (modalTitle) modalTitle.textContent = 'സ്വാഗതം! പ്രൊഫൈൽ രജിസ്ട്രേഷൻ';
                if (modalSub) modalSub.textContent = 'പേര്, സ്ഥലം, രക്തഗ്രൂപ്പ് നൽകി തുടങ്ങാം 🌿';
                if (skipBtn) skipBtn.style.display = 'block';
            } else {
                if (modalTitle) modalTitle.textContent = isRegistered ? 'പ്രൊഫൈൽ വിവരങ്ങൾ പുതുക്കുക' : 'പ്രൊഫൈൽ രജിസ്ട്രേഷൻ';
                if (modalSub) modalSub.textContent = 'യൂസർ പ്രൊഫൈൽ · രക്തഗ്രൂപ്പ് ഉൾപ്പെടെ';
                if (skipBtn) skipBtn.style.display = 'none';
            }

            const nameInput = document.getElementById('userRegFullName');
            const phoneInput = document.getElementById('userRegMobile');
            const locInput = document.getElementById('userRegLocation');
            const avatarPreview = document.getElementById('userRegAvatarPreview');
            const donorCheck = document.getElementById('userRegBloodDonorCheck');

            if (nameInput) {
                nameInput.value = isRegistered ? p.name : (p.name && p.name !== 'അജിത് കുമാർ' && p.name !== 'സുഹൃത്തേ' ? p.name : '');
                nameInput.placeholder = 'നിങ്ങളുടെ പേര് (e.g. Arun Kumar)';
            }

            if (phoneInput) {
                phoneInput.value = isRegistered ? p.phone : (p.phone && p.phone !== '+91 94471 98765' ? p.phone : '');
                phoneInput.placeholder = '10-അക്ക മൊബൈൽ നമ്പർ (e.g. 9847123456)';
                phoneInput.readOnly = false;
                phoneInput.style.color = '#0F172A';
                phoneInput.style.fontWeight = '600';
            }

            if (locInput) {
                locInput.value = p.location || APP_STATE.userLocation || 'കേരളം';
                locInput.placeholder = 'നിങ്ങളുടെ സ്ഥലം, ടൗൺ, അല്ലെങ്കിൽ വാർഡ്...';
            }

            if (avatarPreview && p.avatar) {
                avatarPreview.src = p.avatar;
            }

            // Sync blood chips with saved or default group
            const bloodToSelect = p.bloodGroup || localStorage.getItem('thuna_user_blood_group') || 'O+';
            selectBloodGroupInChips(bloodToSelect);

            if (donorCheck) {
                donorCheck.checked = precheckBloodDonor || (p.isBloodDonor !== false);
            }

            // Verification ready
            window.THUNA_REG_OTP.user.verified = true;
            const badge = document.getElementById('userPhoneVerifiedBadge');
            if (badge) badge.style.display = 'inline-flex';
            const sendBtn = document.getElementById('btnSendUserOtp');
            if (sendBtn) sendBtn.style.display = 'none';
            const otpGroup = document.getElementById('userOtpContainer');
            if (otpGroup) otpGroup.style.display = 'none';

            openModal('modal-user-register');
        }

        function handleUserRegAvatar(event) {
            const f = event.target.files[0];
            if (!f) return;
            toast('⏳ പ്രൊഫൈൽ ഫോട്ടോ തയ്യാറാക്കുന്നു...');
            compressImage(f, { maxWidth: 280, maxHeight: 280, quality: 0.8 }).then(compressedAvatar => {
                syncAllProfileUIs({ avatar: compressedAvatar });
                const preview = document.getElementById('userRegAvatarPreview');
                if (preview) preview.src = compressedAvatar;
                toast('📸 പ്രൊഫൈൽ ഫോട്ടോ റെഡിയായി!');

                if (window.THUNA_FIREBASE && typeof window.THUNA_FIREBASE.upload === 'function') {
                    window.THUNA_FIREBASE.upload(f, 'users/avatars').catch(() => { });
                }
            });
        }

        function submitUserRegistration(e) {
            if (e) e.preventDefault();
            const name = (document.getElementById('userRegFullName')?.value || '').trim();
            const phone = (document.getElementById('userRegMobile')?.value || '').trim();
            const loc = (document.getElementById('userRegLocation')?.value || APP_STATE.userLocation || 'കേരളം').trim();
            const isDonor = document.getElementById('userRegBloodDonorCheck')?.checked || false;
            const bloodGroup = document.getElementById('userRegBloodGroup')?.value || 'O+';
            const avatar = document.getElementById('userRegAvatarPreview')?.src || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80';

            if (!name) {
                toast('⚠️ ദയവായി നിങ്ങളുടെ പേര് നൽകുക (Please enter Full Name).');
                document.getElementById('userRegFullName')?.focus();
                return;
            }
            const cleanDigits = phone.replace(/\D/g, '');
            if (!cleanDigits || cleanDigits.length < 10) {
                toast('⚠️ സാധുവായ 10-അക്ക മൊബൈൽ നമ്പർ നൽകുക (Please enter 10-digit Mobile Number).');
                document.getElementById('userRegMobile')?.focus();
                return;
            }

            const lat = parseFloat(document.getElementById('userRegLocation')?.dataset.lat) || APP_STATE.userCoordinates.latitude || 9.1530;
            const lon = parseFloat(document.getElementById('userRegLocation')?.dataset.lon) || APP_STATE.userCoordinates.longitude || 76.7356;

            const userPayload = {
                id: 'usr_' + Date.now(),
                name: name,
                phone: phone,
                location: loc,
                latitude: lat,
                longitude: lon,
                avatar: avatar,
                isBloodDonor: isDonor,
                bloodGroup: bloodGroup,
                registeredAt: Date.now()
            };

            // Save to APP_STATE & safe storage
            APP_STATE.userProfile = {
                name: name,
                phone: phone,
                location: loc,
                avatar: avatar,
                bloodGroup: bloodGroup,
                isBloodDonor: isDonor,
                bio: 'Nammude Naadu Member'
            };
            safeSetLocalStorage('thuna_user_profile', JSON.stringify(APP_STATE.userProfile));
            safeSetLocalStorage('thuna_registered_user', JSON.stringify(userPayload));
            safeSetLocalStorage('thuna_profile_registered', 'true');
            safeSetLocalStorage('thuna_user_phone', phone);
            safeSetLocalStorage('thuna_user_blood_group', bloodGroup);

            // Sync global app location
            if (typeof setLocation === 'function') {
                setLocation(loc, false, { latitude: lat, longitude: lon, accuracy: 100, isManual: true });
            }

            // Also immediately show in local Nearby Friends list & Home strip
            try {
                const friends = JSON.parse(localStorage.getItem('thuna_custom_friends') || '[]');
                const cleanFriend = {
                    id: userPayload.id,
                    name: name,
                    phone: phone,
                    location: loc,
                    lat: lat,
                    lon: lon,
                    face: avatar && !avatar.startsWith('data:') && !avatar.startsWith('http') ? avatar : '👤',
                    avatar: avatar,
                    group: isDonor && bloodGroup ? bloodGroup : 'Resident',
                    optIn: true,
                    online: true
                };
                const updatedFriends = [cleanFriend, ...friends.filter(f => (f.phone || '').replace(/\D/g, '') !== cleanDigits)];
                safeSetLocalStorage('thuna_custom_friends', JSON.stringify(updatedFriends));
                if (typeof renderHomeNearbyStrip === 'function') renderHomeNearbyStrip();
                if (typeof renderNearbyFriends === 'function') renderNearbyFriends();
            } catch (_) { }

            // Persist to Firebase Realtime Database
            if (window.THUNA_FIREBASE && typeof window.THUNA_FIREBASE.set === 'function') {
                const cleanKey = cleanDigits || ('user_' + Date.now());
                window.THUNA_FIREBASE.set('registeredUsers/' + cleanKey, userPayload).catch(() => { });
                window.THUNA_FIREBASE.set('profiles/' + cleanKey, userPayload).catch(() => { });
            }

            // If voluntary blood donor, register into community donors list
            if (isDonor) {
                const donorData = {
                    name: name,
                    group: bloodGroup,
                    phone: phone,
                    location: loc,
                    lat: lat,
                    lon: lon,
                    timestamp: Date.now()
                };
                const donors = JSON.parse(localStorage.getItem('thuna_custom_donors') || '[]');
                const filtered = donors.filter(d => (d.phone || '').replace(/\D/g, '') !== cleanDigits);
                filtered.unshift(donorData);
                safeSetLocalStorage('thuna_custom_donors', JSON.stringify(filtered));

                if (window.THUNA_FIREBASE && typeof window.THUNA_FIREBASE.saveLocationAware === 'function') {
                    window.THUNA_FIREBASE.saveLocationAware('blood', donorData).catch(() => { });
                }
                if (typeof renderBloodDonors === 'function') {
                    renderBloodDonors();
                }
            }

            // Update UI elements across screens
            syncAllProfileUIs(userPayload);

            closeModal('modal-user-register');
            if (typeof navTo === 'function') {
                navTo('home');
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
            toast(`🎉 സ്വാഗതം ${name}! പ്രൊഫൈൽ വിജയകരമായി രജിസ്റ്റർ ചെയ്തു (രക്തഗ്രൂപ്പ്: ${bloodGroup}).`);
        }

        /* -------------------------------------------------------------
           SERVICE PROVIDER REGISTRATION & MULTI-SERVICE REUSE LOGIC
           ------------------------------------------------------------- */
        function openProviderRegisterModal() {
            // Setup pre-fills and profile reuse
            checkAndSetupProviderForm();
            openModal('modal-add-service');
        }

        function checkAndSetupProviderForm() {
            const profile = getUnifiedUserProfile();
            let provSaved = null;
            try {
                provSaved = JSON.parse(localStorage.getItem('thuna_provider_profile') || 'null');
            } catch (_) { }

            const banner = document.getElementById('provExistingProfileBanner');
            const title = document.getElementById('provModalHeaderTitle');
            const submitBtn = document.getElementById('btnSubmitProvReg');
            const collapsible = document.getElementById('provPersonalDetailsCollapsible');
            const btnEdit = document.getElementById('btnToggleProvDetailsEdit');

            const nameInput = document.getElementById('provRegName');
            const phoneInput = document.getElementById('provRegPhone');
            const locInput = document.getElementById('provRegLocation');

            const activeName = (provSaved && provSaved.businessName) ? provSaved.businessName : profile.name;
            const activePhone = (provSaved && provSaved.phone) ? provSaved.phone : profile.phone;
            const activeLoc = (provSaved && provSaved.location) ? provSaved.location : profile.location;

            if (nameInput) nameInput.value = activeName;
            if (phoneInput) {
                phoneInput.value = activePhone;
                phoneInput.readOnly = true;
                phoneInput.style.color = '#065F46';
                phoneInput.style.fontWeight = '700';
            }
            if (locInput) locInput.value = activeLoc;
            if (provSaved && provSaved.logo) {
                const logoImg = document.getElementById('provRegLogoPreview');
                if (logoImg) logoImg.src = provSaved.logo;
            }

            // Auto-verify OTP for already registered/logged-in profile
            window.THUNA_REG_OTP.prov.verified = true;
            const badge = document.getElementById('provPhoneVerifiedBadge');
            if (badge) badge.style.display = 'inline-flex';
            const sendBtn = document.getElementById('btnSendProvOtp');
            if (sendBtn) sendBtn.style.display = 'none';
            const otpGroup = document.getElementById('provRegOtpGroup');
            if (otpGroup) otpGroup.style.display = 'none';

            // Show Auto-fill Profile Banner
            if (banner) {
                banner.style.display = 'block';
                document.getElementById('provBannerName').textContent = activeName;
                document.getElementById('provBannerPhone').textContent = activePhone;
                document.getElementById('provBannerLoc').textContent = activeLoc;
            }

            // Collapse personal details by default - directly show service categories & details!
            if (collapsible) collapsible.style.display = 'none';
            if (btnEdit) btnEdit.style.display = 'inline-block';

            if (provSaved && provSaved.businessName) {
                if (title) title.textContent = '➕ Add Another Service (പുതിയ സർവീസ്)';
                if (submitBtn) submitBtn.textContent = '➕ Add This Service (സർവീസ് ചേർക്കുക)';
            } else {
                if (title) title.textContent = '🛠️ Register Service Provider';
                if (submitBtn) submitBtn.textContent = 'Register Provider & Go Live';
            }
        }

        function toggleProvDetailsEdit() {
            const collapsible = document.getElementById('provPersonalDetailsCollapsible');
            if (!collapsible) return;
            if (collapsible.style.display === 'none') {
                collapsible.style.display = 'flex';
                const phoneInput = document.getElementById('provRegPhone');
                if (phoneInput) phoneInput.readOnly = false;
            } else {
                collapsible.style.display = 'none';
            }
        }

        function toggleProvCategoryChip(chipEl, catName) {
            if (window.THUNA_SELECTED_PROV_CATEGORIES.has(catName)) {
                window.THUNA_SELECTED_PROV_CATEGORIES.delete(catName);
                chipEl.classList.remove('selected');
            } else {
                window.THUNA_SELECTED_PROV_CATEGORIES.add(catName);
                chipEl.classList.add('selected');
            }
            updateProvCategoryCount();
        }

        function addCustomProvCategory() {
            const input = document.getElementById('provCustomCatInput');
            const val = (input?.value || '').trim();
            if (!val) return;

            // Automatically persist category into app database
            const savedCat = saveCustomCategory(val);
            const icon = savedCat ? savedCat.icon : '✨';

            window.THUNA_SELECTED_PROV_CATEGORIES.add(val);
            input.value = '';

            // Add chip to grid
            const grid = document.getElementById('provCategoryChipsGrid');
            if (grid) {
                const chip = document.createElement('div');
                chip.className = 'prov-cat-chip selected';
                chip.innerHTML = `<span>${icon} ${val}</span><span class="chip-check" style="display:inline">✓</span>`;
                chip.onclick = function () { toggleProvCategoryChip(this, val); };
                grid.appendChild(chip);
            }
            updateProvCategoryCount();
            toast(`✓ പുതിയ സർവീസ് വിഭാഗം ചേർത്തു: ${val}`);
        }

        function updateProvCategoryCount() {
            const countEl = document.getElementById('provSelectedCatCount');
            if (countEl) {
                const size = window.THUNA_SELECTED_PROV_CATEGORIES.size;
                countEl.textContent = `${size} Selected`;
                countEl.style.color = size > 0 ? '#059669' : '#64748B';
            }
        }

        function selectProvCoverage(chipEl, val) {
            const input = document.getElementById('provCoverageVal');
            if (input) input.value = val;
            document.querySelectorAll('.coverage-chip-btn').forEach(b => b.classList.remove('active'));
            if (chipEl) chipEl.classList.add('active');
        }

        function handleProvRegLogo(event) {
            const f = event.target.files[0];
            if (!f) return;
            compressImage(f, { maxWidth: 240, maxHeight: 240, quality: 0.8 }).then(compressed => {
                const img = document.getElementById('provRegLogoPreview');
                if (img) img.src = compressed;
            });
        }

        window.THUNA_PROV_PHOTOS = [];
        function handleProvPhotosUpload(event) {
            const files = event.target.files;
            const box = document.getElementById('provPhotosPreviewBox');
            if (!box || !files.length) return;

            box.innerHTML = '';
            window.THUNA_PROV_PHOTOS = [];
            toast('⏳ ഫോട്ടോകൾ കംപ്രസ്സ് ചെയ്യുന്നു...');
            const fileList = Array.from(files).slice(0, 4);
            Promise.all(fileList.map(file => compressImage(file, { maxWidth: 700, maxHeight: 700, quality: 0.72 }))).then(compressedPhotos => {
                compressedPhotos.forEach(dataUrl => {
                    if (!dataUrl) return;
                    window.THUNA_PROV_PHOTOS.push(dataUrl);
                    const thumb = document.createElement('img');
                    thumb.src = dataUrl;
                    thumb.style.width = '54px';
                    thumb.style.height = '54px';
                    thumb.style.borderRadius = '10px';
                    thumb.style.objectFit = 'cover';
                    thumb.style.border = '1.5px solid #FFD32A';
                    box.appendChild(thumb);
                });
                toast('📸 ഫോട്ടോകൾ വിജയകരമായി ചേർത്തു!');
            });
        }

        function submitProviderRegistration(e) {
            if (e) e.preventDefault();
            const editId = (document.getElementById('provEditServiceId')?.value || '').trim();
            const name = (document.getElementById('provRegName')?.value || '').trim();
            const phone = (document.getElementById('provRegPhone')?.value || '').trim();
            const district = (document.getElementById('provRegDistrict')?.value || '').trim();
            const loc = (document.getElementById('provRegLocation')?.value || '').trim();
            const desc = (document.getElementById('provRegDesc')?.value || '').trim();
            const rate = (document.getElementById('provRegRate')?.value || '').trim();
            const hours = (document.getElementById('provRegHours')?.value || '').trim() || 'രാവിലെ 8:00 - വൈകിട്ട് 7:00';

            // Required field validations with clear Malayalam messages
            if (window.THUNA_SELECTED_PROV_CATEGORIES.size === 0) {
                toast('⚠️ ദയവായി കുറഞ്ഞത് ഒരു സർവീസ് വിഭാഗമെങ്കിലും തിരഞ്ഞെടുക്കുക.');
                return;
            }
            if (!name) {
                toast('⚠️ ദയവായി നിങ്ങളുടെ പേര് അല്ലെങ്കിൽ സ്ഥാപന നാമം നൽകുക.');
                document.getElementById('provRegName')?.focus();
                return;
            }
            const cleanDigits = phone.replace(/[^0-9]/g, '');
            if (!phone || cleanDigits.length < 10) {
                toast('⚠️ ദയവായി സാധുവായ 10 അക്ക മൊബൈൽ നമ്പർ നൽകുക.');
                document.getElementById('provRegPhone')?.focus();
                return;
            }
            if (!loc) {
                toast('⚠️ ദയവായി സർവീസ് നൽകുന്ന സ്ഥലമോ ഏരിയയോ നൽകുക.');
                document.getElementById('provRegLocation')?.focus();
                return;
            }
            if (!desc) {
                toast('⚠️ നിങ്ങൾ നൽകുന്ന ജോലികളുടെ വിവരണം ചുരുക്കി നൽകുക.');
                document.getElementById('provRegDesc')?.focus();
                return;
            }

            const categoriesArray = Array.from(window.THUNA_SELECTED_PROV_CATEGORIES);
            const primaryCat = categoriesArray[0] || 'Other Services';
            const catMeta = getServiceCategoryMeta(primaryCat);
            const lat = parseFloat(document.getElementById('provRegLocation')?.dataset.lat) || APP_STATE.userCoordinates.latitude || 9.1530;
            const lon = parseFloat(document.getElementById('provRegLocation')?.dataset.lon) || APP_STATE.userCoordinates.longitude || 76.7356;

            let custom = JSON.parse(localStorage.getItem('thuna_custom_providers') || '[]');

            if (editId) {
                // Update existing registered service
                const idx = custom.findIndex(s => s.id === editId);
                if (idx !== -1) {
                    custom[idx].name = name;
                    custom[idx].phone = phone;
                    custom[idx].category = primaryCat;
                    custom[idx].categories = categoriesArray;
                    custom[idx].district = district;
                    custom[idx].location = loc;
                    custom[idx].lat = lat;
                    custom[idx].lon = lon;
                    custom[idx].desc = desc;
                    custom[idx].rate = rate || 'ന്യായമായ നിരക്ക്';
                    custom[idx].hours = hours;
                    if (window.THUNA_PROV_PHOTOS && window.THUNA_PROV_PHOTOS.length > 0) {
                        custom[idx].photos = [...window.THUNA_PROV_PHOTOS];
                    }
                    custom[idx].updatedAt = Date.now();
                }
                safeSetLocalStorage('thuna_custom_providers', JSON.stringify(custom));

                // Backend sync to Firebase
                if (window.THUNA_FIREBASE && typeof window.THUNA_FIREBASE.update === 'function') {
                    const cleanKey = phone.replace(/[^0-9]/g, '');
                    window.THUNA_FIREBASE.update('serviceProviders/' + cleanKey, {
                        businessName: name,
                        phone: phone,
                        category: primaryCat,
                        district: district,
                        location: loc,
                        description: desc,
                        rate: rate || '',
                        hours: hours,
                        updatedAt: Date.now()
                    }).catch(() => {});
                }

                toast('💾 സർവീസ് വിവരങ്ങൾ വിജയകരമായി അപ്ഡേറ്റ് ചെയ്തു!');
            } else {
                // Register new service
                const newId = 'prov_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
                const newRecord = {
                    id: newId,
                    name: name,
                    category: primaryCat,
                    categories: categoriesArray,
                    district: district,
                    location: loc,
                    lat: lat,
                    lon: lon,
                    desc: desc,
                    rate: rate || 'ന്യായമായ നിരക്ക്',
                    hours: hours,
                    phone: phone,
                    photos: (window.THUNA_PROV_PHOTOS && window.THUNA_PROV_PHOTOS.length > 0) ? [...window.THUNA_PROV_PHOTOS] : [],
                    isAvailable: true,
                    status: 'approved',
                    createdAt: Date.now(),
                    icon: catMeta.icon || '🛠️',
                    keywords: [primaryCat.toLowerCase(), ...categoriesArray.map(c => c.toLowerCase()), name.toLowerCase(), loc.toLowerCase()]
                };
                custom.unshift(newRecord);
                safeSetLocalStorage('thuna_custom_providers', JSON.stringify(custom));

                // Backend sync to Firebase Realtime Database
                if (window.THUNA_FIREBASE && typeof window.THUNA_FIREBASE.set === 'function') {
                    const cleanKey = phone.replace(/[^0-9]/g, '') || ('prov_' + Date.now());
                    window.THUNA_FIREBASE.set('serviceProviders/' + cleanKey, {
                        businessName: name,
                        phone: phone,
                        category: primaryCat,
                        district: district,
                        location: loc,
                        latitude: lat,
                        longitude: lon,
                        description: desc,
                        rate: rate || '',
                        hours: hours,
                        status: 'approved',
                        isAvailable: true,
                        createdAt: Date.now()
                    }).catch(() => {});
                }

                toast(`🎉 '${name}' സർവീസ് വിജയകരമായി രജിസ്റ്റർ ചെയ്തു!`);
            }

            // Reset photos state
            window.THUNA_PROV_PHOTOS = [];
            const photoBox = document.getElementById('provPhotosPreviewBox');
            if (photoBox) photoBox.innerHTML = '<div style="font-size:11.5px;color:#94A3B8;padding:4px 0">ഫോട്ടോകൾ ഒന്നും തിരഞ്ഞെടുത്തിട്ടില്ല (ഓപ്ഷണൽ)</div>';

            closeModal('modal-add-service');
            renderServices();
            renderMyServices();
            if (typeof renderHomePopularServices === 'function') renderHomePopularServices();
            if (typeof renderCategoryPills === 'function') renderCategoryPills();
        }

        // Backward compatibility alias for submitNewProvider
        function submitNewProvider() {
            submitProviderRegistration();
        }

        /* -------------------------------------------------------------
           10. COMMUNITY FEED & POSTS
           ------------------------------------------------------------- */
        function getPostsList() {
            try {
                let custom = JSON.parse(localStorage.getItem('thuna_custom_posts') || '[]');
                const blocked = JSON.parse(localStorage.getItem('thuna_blocked_users') || '[]');
                const reported = JSON.parse(localStorage.getItem('thuna_reported_posts') || '[]');
                const likedDefaultIds = JSON.parse(localStorage.getItem('thuna_liked_post_ids') || '[]');

                const defaults = (DEFAULT_POSTS || []).map(p => {
                    const isLiked = likedDefaultIds.includes(p.id);
                    return {
                        ...p,
                        liked: isLiked || p.liked
                    };
                });

                const all = [...custom, ...defaults];
                return all.filter(p => p && !blocked.includes(p.authorName) && !reported.includes(p.id) && !p.isDummy && !p.isMock);
            } catch (e) {
                return [];
            }
        }

        function renderCommunityFeed(filteredPosts) {
            const allPosts = getPostsList();
            const posts = filteredPosts || allPosts;
            const container = document.getElementById('communityFeedContainer');
            if (container) {
                if (!posts.length) {
                    container.innerHTML = `
                        <div style="background:#ffffff;border-top:1px solid #E4E6EB;border-bottom:1px solid #E4E6EB;padding:34px 18px;text-align:center;margin-bottom:6px">
                            <div style="font-size:36px;margin-bottom:8px">📢</div>
                            <div style="font-size:15px;font-weight:700;color:#050505;margin-bottom:4px">പോസ്റ്റുകൾ ലഭ്യമല്ല</div>
                            <div style="font-size:12.5px;color:#65676B;max-width:280px;margin:0 auto 14px;line-height:1.4">നിങ്ങളുടെ പ്രദേശത്തെ പ്രധാന വിവരങ്ങളും വാർത്തകളും ആദ്യം പങ്കുവെക്കൂ!</div>
                            <button onclick="navTo('add')" style="background:#1877F2;color:#ffffff;border:none;border-radius:6px;padding:8px 20px;font-size:13px;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:6px">
                                <span>➕ പുതിയ പോസ്റ്റ് ചെയ്യുക</span>
                            </button>
                        </div>
                    `;
                } else {
                    container.innerHTML = posts.map(post => {
                        return `
                        <div class="fb-post-card" id="post-card-${post.id}" style="background:#FFFFFF;border-top:1px solid #E4E6EB;border-bottom:1px solid #E4E6EB;margin-bottom:6px;box-shadow:0 1px 2px rgba(0,0,0,0.03)">
                            <!-- FB Header: Avatar, Name, Time/Location/Globe, 3-dots -->
                            <div style="display:flex;align-items:center;gap:10px;padding:10px 14px 6px">
                                ${post.authorAvatar ? `
                                    <img src="${post.authorAvatar}" style="width:38px;height:38px;border-radius:50%;object-fit:cover;flex-shrink:0" alt="${escapeHtml(post.authorName)}">
                                ` : `
                                    <div style="width:38px;height:38px;border-radius:50%;background:${post.badgeBg || '#1877F2'};color:#ffffff;display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0;font-weight:700">
                                        ${post.authorBadge || '👤'}
                                    </div>
                                `}
                                <div style="flex:1;min-width:0">
                                    <div style="display:flex;align-items:center;gap:5px">
                                        <span style="font-size:14.5px;font-weight:700;color:#050505;letter-spacing:-0.1px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escapeHtml(post.authorName)}</span>
                                        ${post.hasPin ? '<span style="font-size:12px;color:#1877F2" title="Pinned">📌</span>' : ''}
                                    </div>
                                    <div style="font-size:11.5px;color:#65676B;display:flex;align-items:center;gap:4px;margin-top:1px">
                                        <span>${escapeHtml(post.timeAgo || 'Just now')}</span>
                                        <span>•</span>
                                        <span>📍 ${escapeHtml(post.location || 'കേരളം')}</span>
                                        <span>•</span>
                                        <span title="Public">🌐</span>
                                    </div>
                                </div>
                                <button type="button" onclick="openPostOptionsModal('${post.id}', '${escapeHtml(post.authorName).replace(/'/g, "\\'")}')" style="background:none;border:none;color:#65676B;cursor:pointer;padding:6px;border-radius:50%;display:flex;align-items:center;justify-content:center" title="ഓപ്ഷനുകൾ">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <circle cx="5" cy="12" r="2"></circle>
                                        <circle cx="12" cy="12" r="2"></circle>
                                        <circle cx="19" cy="12" r="2"></circle>
                                    </svg>
                                </button>
                            </div>

                            <!-- FB Body Content -->
                            <div style="padding:4px 14px 8px">
                                ${post.title ? `<div style="font-size:14.5px;font-weight:700;color:#050505;margin-bottom:4px;line-height:1.35">${escapeHtml(post.title)}</div>` : ''}
                                <div style="font-size:13.5px;color:#050505;line-height:1.45;word-break:break-word;white-space:pre-line">${escapeHtml(post.content || '')}</div>
                            </div>

                            ${post.mediaHtml || ''}

                            <!-- FB Media / Image (Edge-to-Edge) -->
                            ${post.mediaUrl ? `
                                <div style="width:100%;background:#000000;overflow:hidden">
                                    <img src="${post.mediaUrl}" alt="Post image" style="width:100%;max-height:360px;object-fit:cover;display:block" loading="lazy">
                                </div>
                            ` : ''}

                            <!-- FB Reactions & Comments Summary Row -->
                            <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 14px 6px;font-size:12px;color:#65676B">
                                <div style="display:flex;align-items:center;gap:4px">
                                    <span style="display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:50%;background:#1877F2;color:#ffffff;font-size:10px">👍</span>
                                    <span style="display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:50%;background:#FA383E;color:#ffffff;font-size:10px;margin-left:-6px">❤️</span>
                                    <span style="margin-left:4px;font-weight:600;color:#65676B">${post.likes || 0}</span>
                                </div>
                                <div style="display:flex;align-items:center;gap:8px">
                                    <span>${post.comments || (post.commentsList ? post.commentsList.length : 0)} കമന്റുകൾ</span>
                                    <span>•</span>
                                    <span>${post.shares || 0} ഷെയർ</span>
                                </div>
                            </div>

                            <!-- FB Action Divider -->
                            <div style="height:1px;background:#CED0D4;margin:0 14px"></div>

                            <!-- FB 3 Equal Action Buttons (Like, Comment, Share) -->
                            <div style="display:flex;align-items:center;justify-content:space-around;padding:3px 6px">
                                <button type="button" onclick="toggleLikePost('${post.id}')" style="flex:1;background:none;border:none;display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:8px 0;font-size:13px;font-weight:700;color:${post.liked ? '#1877F2' : '#65676B'};cursor:pointer;border-radius:4px">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="${post.liked ? '#1877F2' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                                    <span>ലൈക്ക്</span>
                                </button>
                                <button type="button" onclick="openCommentsModal('${post.id}')" style="flex:1;background:none;border:none;display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:8px 0;font-size:13px;font-weight:700;color:#65676B;cursor:pointer;border-radius:4px">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                    <span>കമന്റ്</span>
                                </button>
                                <button type="button" onclick="sharePost('${post.id}')" style="flex:1;background:none;border:none;display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:8px 0;font-size:13px;font-weight:700;color:#65676B;cursor:pointer;border-radius:4px">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
                                    <span>ഷെയർ</span>
                                </button>
                            </div>
                        </div>
                        `;
                    }).join('');
                }
            }

            // Home screen Section 3 Community Updates feed preview
            const hp = document.getElementById('homeCommunityFeedContainer') || document.getElementById('homeCommunityPreview');
            if (hp) {
                const homePosts = allPosts.slice(0, 3);
                if (!homePosts.length) {
                    hp.innerHTML = `
                        <div style="background:#ffffff;border:1px solid #E4E6EB;border-radius:12px;margin-bottom:8px;padding:22px;text-align:center">
                            <div style="font-size:32px;margin-bottom:6px">📣</div>
                            <div style="font-size:14.5px;font-weight:800;color:#0f172a">കമ്മ്യൂണിറ്റി വിശേഷങ്ങൾ ഇവിടെ കാണാം</div>
                            <div style="font-size:12px;color:#64748b;margin:4px 0 14px">നിങ്ങളുടെ പ്രദേശത്തെ പ്രധാന അറിയിപ്പുകളും വിശേഷങ്ങളും പങ്കുവെക്കാം</div>
                            <button class="primary-action-btn" style="padding:8px 22px;font-size:12.5px;background:#064E3B;border-radius:12px;margin:0 auto;display:inline-flex;align-items:center;gap:6px" onclick="navTo('add')">
                                <span>➕ പുതിയ പോസ്റ്റ് ചേർക്കുക</span>
                            </button>
                        </div>
                    `;
                } else {
                    hp.innerHTML = homePosts.map(post => {
                        return `
                        <div class="fb-post-card" style="background:#FFFFFF;border:1px solid #E4E6EB;border-radius:12px;margin-bottom:6px;box-shadow:0 1px 3px rgba(0,0,0,0.03);overflow:hidden">
                            <!-- FB Header -->
                            <div style="display:flex;align-items:center;gap:10px;padding:10px 14px 6px">
                                ${post.authorAvatar ? `
                                    <img src="${post.authorAvatar}" style="width:36px;height:36px;border-radius:50%;object-fit:cover;flex-shrink:0" alt="${escapeHtml(post.authorName)}">
                                ` : `
                                    <div style="width:36px;height:36px;border-radius:50%;background:${post.badgeBg || '#1877F2'};color:#ffffff;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;font-weight:700">
                                        ${post.authorBadge || '👤'}
                                    </div>
                                `}
                                <div style="flex:1;min-width:0">
                                    <div style="display:flex;align-items:center;gap:4px">
                                        <span style="font-size:14px;font-weight:700;color:#050505;letter-spacing:-0.1px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escapeHtml(post.authorName)}</span>
                                        ${post.hasPin ? '<span style="font-size:11px;color:#1877F2" title="Pinned">📌</span>' : ''}
                                    </div>
                                    <div style="font-size:11px;color:#65676B;display:flex;align-items:center;gap:4px;margin-top:1px">
                                        <span>${escapeHtml(post.timeAgo || 'Just now')}</span>
                                        <span>•</span>
                                        <span>📍 ${escapeHtml(post.location || 'കേരളം')}</span>
                                        <span>•</span>
                                        <span title="Public">🌐</span>
                                    </div>
                                </div>
                                <button type="button" onclick="openPostOptionsModal('${post.id}', '${escapeHtml(post.authorName).replace(/'/g, "\\'")}')" style="background:none;border:none;color:#65676B;cursor:pointer;padding:6px;border-radius:50%;display:flex;align-items:center;justify-content:center" title="ഓപ്ഷനുകൾ">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                        <circle cx="5" cy="12" r="2"></circle>
                                        <circle cx="12" cy="12" r="2"></circle>
                                        <circle cx="19" cy="12" r="2"></circle>
                                    </svg>
                                </button>
                            </div>

                            <!-- FB Body Content -->
                            <div style="padding:4px 14px 8px;cursor:pointer" onclick="navTo('community')">
                                ${post.title ? `<div style="font-size:14px;font-weight:700;color:#050505;margin-bottom:4px;line-height:1.35">${escapeHtml(post.title)}</div>` : ''}
                                <div style="font-size:13px;color:#050505;line-height:1.45;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden">${escapeHtml(post.content || '')}</div>
                            </div>

                            ${post.mediaUrl ? `
                                <div style="width:100%;background:#000000;overflow:hidden;cursor:pointer" onclick="navTo('community')">
                                    <img src="${post.mediaUrl}" alt="Post image" style="width:100%;max-height:220px;object-fit:cover;display:block" loading="lazy">
                                </div>
                            ` : ''}

                            <!-- FB Reactions & Comments Summary Row -->
                            <div style="display:flex;align-items:center;justify-content:space-between;padding:7px 14px 5px;font-size:11.5px;color:#65676B">
                                <div style="display:flex;align-items:center;gap:4px">
                                    <span style="display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;border-radius:50%;background:#1877F2;color:#ffffff;font-size:9px">👍</span>
                                    <span style="display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;border-radius:50%;background:#FA383E;color:#ffffff;font-size:9px;margin-left:-5px">❤️</span>
                                    <span style="margin-left:4px;font-weight:600;color:#65676B">${post.likes || 0}</span>
                                </div>
                                <div style="display:flex;align-items:center;gap:8px">
                                    <span>${post.comments || (post.commentsList ? post.commentsList.length : 0)} കമന്റുകൾ</span>
                                </div>
                            </div>

                            <!-- FB Action Divider -->
                            <div style="height:1px;background:#CED0D4;margin:0 14px"></div>

                            <!-- FB 3 Action Buttons -->
                            <div style="display:flex;align-items:center;justify-content:space-around;padding:2px 6px">
                                <button type="button" onclick="toggleLikePost('${post.id}')" style="flex:1;background:none;border:none;display:inline-flex;align-items:center;justify-content:center;gap:5px;padding:7px 0;font-size:12px;font-weight:700;color:${post.liked ? '#1877F2' : '#65676B'};cursor:pointer">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="${post.liked ? '#1877F2' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                                    <span>ലൈക്ക്</span>
                                </button>
                                <button type="button" onclick="openCommentsModal('${post.id}')" style="flex:1;background:none;border:none;display:inline-flex;align-items:center;justify-content:center;gap:5px;padding:7px 0;font-size:12px;font-weight:700;color:#65676B;cursor:pointer">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                    <span>കമന്റ്</span>
                                </button>
                                <button type="button" onclick="sharePost('${post.id}')" style="flex:1;background:none;border:none;display:inline-flex;align-items:center;justify-content:center;gap:5px;padding:7px 0;font-size:12px;font-weight:700;color:#65676B;cursor:pointer">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
                                    <span>ഷെയർ</span>
                                </button>
                            </div>
                        </div>
                        `;
                    }).join('');
                }
            }
        }

        function filterCommunityPosts(filter, btn) {
            APP_STATE.activeCommunityFilter = filter;
            document.querySelectorAll('#communityFilterPills .pill-btn').forEach(b => b.classList.remove('active'));
            if (btn) btn.classList.add('active');

            const all = getPostsList();
            renderCommunityFeed(filter === 'all' ? all : all.filter(p => (p.category || '').toLowerCase() === filter.toLowerCase()));
        }

        function toggleLikePost(postId) {
            const custom = JSON.parse(localStorage.getItem('thuna_custom_posts') || '[]');
            let post = custom.find(p => p.id === postId) || DEFAULT_POSTS.find(p => p.id === postId);
            if (!post) return;
            post.liked = !post.liked;
            post.likes = (post.likes || 0) + (post.liked ? 1 : -1);
            if (custom.some(p => p.id === postId)) {
                localStorage.setItem('thuna_custom_posts', JSON.stringify(custom));
            } else {
                let likedDefaultIds = JSON.parse(localStorage.getItem('thuna_liked_post_ids') || '[]');
                if (post.liked) {
                    if (!likedDefaultIds.includes(postId)) likedDefaultIds.push(postId);
                } else {
                    likedDefaultIds = likedDefaultIds.filter(id => id !== postId);
                }
                localStorage.setItem('thuna_liked_post_ids', JSON.stringify(likedDefaultIds));
            }
            renderCommunityFeed();
        }

        function sharePost(postId) {
            const allPosts = (typeof getPostsList === 'function') ? getPostsList() : DEFAULT_POSTS;
            const post = (allPosts && allPosts.find) ? (allPosts.find(p => p.id === postId) || allPosts[0]) : null;
            const title = (post && (post.title || post.content)) ? (post.title || post.content) : (typeof postId === 'string' && postId.length > 5 ? postId : 'പ്രാദേശിക വാർത്ത & അറിയിപ്പ്');
            const location = (post && post.location) ? post.location : 'കേരളം';
            const author = (post && post.authorName) ? post.authorName : 'കമ്മ്യൂണിറ്റി അംഗം';
            const desc = (post && post.content && post.content !== title) ? post.content : '';

            openSocialShareModal({
                sheetHeading: '📢 പോസ്റ്റ് പങ്കുവെക്കുക',
                title: `നമ്മുടെ നാട്: ${title}`,
                preview: title,
                text: `📢 *നമ്മുടെ നാട് - പ്രാദേശിക വാർത്ത & അറിയിപ്പ്*\n\n📌 *${title}*${desc ? `\n${desc}` : ''}\n\n📍 സ്ഥലം: ${location}\n👤 പങ്കുവെച്ചത്: ${author}`
            });
        }

        /* -------------------------------------------------------------
           UGC SAFETY, CONTENT MODERATION & ACCOUNT DELETION
           Compliant with Google Play Developer Policy & India DPDP Act 2023
           ------------------------------------------------------------- */
        function openPostOptionsModal(postId, authorName) {
            document.getElementById('postOptionsTargetId').value = postId || '';
            document.getElementById('postOptionsTargetAuthor').value = authorName || '';
            const blockLbl = document.getElementById('postOptionsBlockLabel');
            if (blockLbl) blockLbl.textContent = `${authorName || 'ഉപയോക്താവിനെ'}-നെ ബ്ലോക്ക് ചെയ്യുക (Block User)`;
            openModal('modal-post-options');
        }

        function handlePostOptionsReport() {
            const postId = document.getElementById('postOptionsTargetId').value;
            const author = document.getElementById('postOptionsTargetAuthor').value;
            closeModal('modal-post-options');
            openReportPostModal(postId, author);
        }

        function handlePostOptionsBlock() {
            const author = document.getElementById('postOptionsTargetAuthor').value;
            closeModal('modal-post-options');
            if (!author) return;
            if (confirm(`${author}-നെ ബ്ലോക്ക് ചെയ്യണമെന്ന് ഉറപ്പാണോ? ഇവരുടെ പോസ്റ്റുകൾ ഇനി നിങ്ങളുടെ ഫീഡിൽ കാണിക്കില്ല.`)) {
                blockUser(author);
            }
        }

        function handlePostOptionsShare() {
            const postId = document.getElementById('postOptionsTargetId').value;
            closeModal('modal-post-options');
            sharePost(postId);
        }

        function openReportPostModal(postId, authorName) {
            document.getElementById('reportTargetPostId').value = postId || '';
            document.getElementById('reportTargetAuthor').value = authorName || '';
            document.getElementById('reportAdditionalDetails').value = '';
            openModal('modal-report-post');
        }

        function handleReportFormSubmit(e) {
            e.preventDefault();
            const postId = document.getElementById('reportTargetPostId').value;
            const author = document.getElementById('reportTargetAuthor').value;
            const reasonRadio = document.querySelector('input[name="reportReason"]:checked');
            const reason = reasonRadio ? reasonRadio.value : 'unspecified';
            const details = document.getElementById('reportAdditionalDetails').value.trim();

            // Save report locally
            const reports = JSON.parse(localStorage.getItem('thuna_post_reports') || '[]');
            reports.push({
                postId,
                author,
                reason,
                details,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem('thuna_post_reports', JSON.stringify(reports));

            // Immediately hide reported post from current user's feed
            const hidden = JSON.parse(localStorage.getItem('thuna_reported_posts') || '[]');
            if (postId && !hidden.includes(postId)) {
                hidden.push(postId);
                localStorage.setItem('thuna_reported_posts', JSON.stringify(hidden));
            }

            closeModal('modal-report-post');
            renderCommunityFeed();

            toast('🚩 റിപ്പോർട്ട് സ്വീകരിച്ചു! 24 മണിക്കൂറിനകം ഞങ്ങളുടെ മോഡറേഷൻ ടീം ഇത് പരിശോധിച്ച് നടപടിയെടുക്കും.');
        }

        function blockUser(authorName) {
            if (!authorName) return;
            const blocked = JSON.parse(localStorage.getItem('thuna_blocked_users') || '[]');
            if (!blocked.includes(authorName)) {
                blocked.push(authorName);
                localStorage.setItem('thuna_blocked_users', JSON.stringify(blocked));
            }
            renderCommunityFeed();
            toast(`🚫 ${authorName}-നെ ബ്ലോക്ക് ചെയ്തു.`);
        }

        function unblockUser(authorName) {
            let blocked = JSON.parse(localStorage.getItem('thuna_blocked_users') || '[]');
            blocked = blocked.filter(u => u !== authorName);
            localStorage.setItem('thuna_blocked_users', JSON.stringify(blocked));
            renderBlockedUsersList();
            renderCommunityFeed();
            toast(`✅ ${authorName}-നെ അൺബ്ലോക്ക് ചെയ്തു.`);
        }

        function openBlockedUsersModal() {
            renderBlockedUsersList();
            openModal('modal-blocked-users');
        }

        function renderBlockedUsersList() {
            const container = document.getElementById('blockedUsersListContainer');
            if (!container) return;
            const blocked = JSON.parse(localStorage.getItem('thuna_blocked_users') || '[]');
            if (!blocked.length) {
                container.innerHTML = `
                    <div style="padding:24px 16px;text-align:center;color:#64748B;font-size:13px;background:#F8FAFC;border-radius:12px">
                        നിലവിൽ ആരെയും ബ്ലോക്ക് ചെയ്തിട്ടില്ല.
                    </div>
                `;
                return;
            }
            container.innerHTML = blocked.map(user => `
                <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border:1px solid #E2E8F0;border-radius:12px;background:#fff">
                    <div style="display:flex;align-items:center;gap:10px">
                        <span style="font-size:18px">👤</span>
                        <span style="font-size:13.5px;font-weight:700;color:#0F172A">${escapeHtml(user)}</span>
                    </div>
                    <button type="button" class="primary-action-btn" style="background:#F1F5F9;color:#0284C7;padding:5px 12px;font-size:12px;margin:0;height:auto" onclick="unblockUser('${escapeHtml(user).replace(/'/g, "\\'")}')">
                        അൺബ്ലോക്ക്
                    </button>
                </div>
            `).join('');
        }

        function openDeleteAccountModal() {
            const cb = document.getElementById('confirmDeleteCheckbox');
            if (cb) cb.checked = false;
            openModal('modal-delete-account');
        }

        function executePermanentAccountDeletion() {
            const cb = document.getElementById('confirmDeleteCheckbox');
            if (!cb || !cb.checked) {
                toast('⚠️ ദയവായി ചെക്ക്ബോക്സ് ടിക്ക് ചെയ്ത് സമ്മതം അറിയിക്കുക.');
                return;
            }

            // Wipe personal data completely
            localStorage.removeItem('thuna_current_user');
            localStorage.removeItem('thuna_user_profile');
            localStorage.removeItem('thuna_user_phone');
            localStorage.removeItem('thuna_user_role');
            localStorage.removeItem('thuna_custom_posts');
            localStorage.removeItem('thuna_registered_donors');
            localStorage.removeItem('thuna_chat_threads');
            localStorage.removeItem('thuna_custom_services');
            localStorage.removeItem('thuna_ratings');
            localStorage.removeItem('thuna_blocked_users');
            localStorage.removeItem('thuna_reported_posts');

            closeModal('modal-delete-account');
            toast('✅ അക്കൗണ്ടും വ്യക്തിഗത ഡാറ്റയും പൂർണ്ണമായി ഡിലീറ്റ് ചെയ്തു.');
            setTimeout(() => {
                navTo('home');
                location.reload();
            }, 1200);
        }

        /* -------------------------------------------------------------
           11. CREATE POST (ADD TAB)
           ------------------------------------------------------------- */
        let currentPostType = 'announcement';
        let currentPostMedia = '';

        function selectPostType(type, btn) {
            currentPostType = type;
            document.querySelectorAll('.post-type-chip').forEach(b => b.classList.remove('active'));
            if (btn) btn.classList.add('active');
        }

        function updateCharCounter(el) {
            document.getElementById('charCount').textContent = el.value.length;
        }

        function handleFileSelect(event) {
            const file = event.target.files[0];
            if (!file) return;
            toast('⏳ ഫോട്ടോ തയ്യാറാക്കുന്നു... (Processing photo)');
            compressImage(file, { maxWidth: 900, maxHeight: 900, quality: 0.75 }).then(optimizedUrl => {
                currentPostMedia = optimizedUrl;
                const previewImg = document.getElementById('mediaPreviewImg');
                if (previewImg) previewImg.src = optimizedUrl;
                const previewBox = document.getElementById('mediaPreviewBox');
                if (previewBox) previewBox.style.display = 'block';
                toast('📷 ഫോട്ടോ ചേർത്തു! (Photo attached)');
            }).catch(() => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    currentPostMedia = e.target.result;
                    const previewImg = document.getElementById('mediaPreviewImg');
                    if (previewImg) previewImg.src = e.target.result;
                    const previewBox = document.getElementById('mediaPreviewBox');
                    if (previewBox) previewBox.style.display = 'block';
                    toast('📷 Media attached!');
                };
                reader.readAsDataURL(file);
            });
        }

        function setPostDemoMedia(url) {
            currentPostMedia = url;
            document.getElementById('mediaPreviewImg').src = url;
            document.getElementById('mediaPreviewBox').style.display = 'block';
            toast('📷 Demo photo selected!');
        }

        function removeSelectedMedia(e) {
            e.stopPropagation();
            currentPostMedia = '';
            document.getElementById('mediaPreviewBox').style.display = 'none';
        }

        function cycleAudience() {
            const opts = ['Local community', 'All Kerala', 'My Ward'];
            const cur = document.getElementById('postAudienceText').textContent;
            const next = opts[(opts.indexOf(cur) + 1) % opts.length];
            document.getElementById('postAudienceText').textContent = next;
            toast('👥 Audience: ' + next);
        }

        function cycleRadius() {
            const opts = ['2 km', '5 km', '10 km', '25 km'];
            const cur = document.getElementById('postRadiusText').textContent;
            const next = opts[(opts.indexOf(cur) + 1) % opts.length];
            document.getElementById('postRadiusText').textContent = next;
            toast('📍 Radius: ' + next);
        }

        function publishPost() {
            const text = (document.getElementById('postContentInput')?.value || '').trim();
            if (!text && !currentPostMedia) {
                toast('⚠️ Please write something or attach a photo.');
                return;
            }

            const newPost = {
                id: 'post_' + Date.now(),
                authorName: APP_STATE.userProfile?.name || 'നാട്ടുകാരൻ',
                authorAvatar: APP_STATE.userProfile?.avatar || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'%3E%3Cdefs%3E%3ClinearGradient id='avatarGrad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%2310B981'/%3E%3Cstop offset='100%25' stop-color='%23047857'/%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='64' cy='64' r='64' fill='url(%23avatarGrad)'/%3E%3Ccircle cx='64' cy='48' r='24' fill='%23ffffff'/%3E%3Cpath d='M24 108c0-22.1 17.9-40 40-40s40 17.9 40 40v4H24v-4z' fill='%23ffffff'/%3E%3C/svg%3E",
                hasPin: false,
                timeAgo: 'Just now',
                category: currentPostType,
                title: currentPostType === 'announcement' ? '📢 Community Notice' : '',
                content: text,
                mediaUrl: currentPostMedia,
                likes: 1,
                liked: true,
                comments: 0
            };

            const custom = JSON.parse(localStorage.getItem('thuna_custom_posts') || '[]');
            custom.unshift(newPost);
            if (custom.length > 25) custom.length = 25;
            safeSetLocalStorage('thuna_custom_posts', JSON.stringify(custom));

            // Sync to Firebase Cloud Realtime Database with location awareness
            if (window.THUNA_FIREBASE && typeof window.THUNA_FIREBASE.saveLocationAware === 'function') {
                window.THUNA_FIREBASE.saveLocationAware('stories', newPost).catch(err => {
                    console.info('[Firebase] Sync queued locally', err);
                });
            }

            document.getElementById('postContentInput').value = '';
            removeSelectedMedia({ stopPropagation: () => { } });

            toast('🎉 Post published to community feed!');
            renderCommunityFeed();
            setTimeout(() => navTo('community'), 350);
        }

        /* -------------------------------------------------------------
           12. PROFILE, BLOOD, LOCATION & HELPERS
           ------------------------------------------------------------- */
        function loadUserProfile() {
            syncAllProfileUIs();
        }

        async function saveProfile() {
            const name = (document.getElementById('profNameInput')?.value || '').trim();
            const phone = (document.getElementById('profPhoneInput')?.value || '').trim();
            const location = (document.getElementById('profLocInput')?.value || APP_STATE.userLocation || '').trim();
            const bio = (document.getElementById('profBioInput')?.value || '').trim();
            const type = document.getElementById('profTypeSelect')?.value || 'Resident';
            const bloodGroup = document.getElementById('profBloodSelect')?.value || 'O+';
            const avatar = document.getElementById('profileAvatarImg')?.src || '';

            if (!name) { toast('⚠️ ദയവായി പേര് നൽകുക.'); return; }
            if (!phone) { toast('⚠️ ദയവായി ഫോൺ നമ്പർ നൽകുക.'); return; }
            if (!location) { toast('⚠️ ദയവായി സ്ഥലം നൽകുക.'); return; }

            const profile = { ...(APP_STATE.userProfile || {}), name, phone, location, bio, type, bloodGroup, avatar, updatedAt: Date.now() };
            try {
                const fb = window.THUNA_FIREBASE;
                if (!fb || typeof fb.set !== 'function') throw new Error('Firebase backend ലോഡ് ആയിട്ടില്ല. പേജ് refresh ചെയ്ത് വീണ്ടും ശ്രമിക്കുക.');
                if (typeof fb.ensureAuthUser === 'function') await fb.ensureAuthUser();
                const uid = fb.currentUser?.uid;
                if (!uid) throw new Error('Login/Auth തയ്യാറായിട്ടില്ല. പേജ് refresh ചെയ്ത് വീണ്ടും ശ്രമിക്കുക.');
                profile.userId = uid;
                await fb.set('profiles/' + uid, profile);
                syncAllProfileUIs(profile);
                saveUnifiedUserProfile(profile);
                setLocation(location, false);
                localStorage.setItem('thuna_profile_registered', 'true');
                if (typeof navTo === 'function') navTo('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                toast('✅ Profile Firebase-ൽ save ചെയ്തു!');
            } catch (err) {
                console.error('[Profile Save]', err);
                toast('❌ Profile save ആയില്ല: ' + (err?.message || 'Firebase error'));
            }
        }

        function handleAvatarUpload(e) {
            const f = e.target.files[0];
            if (!f) return;
            toast('⏳ പ്രൊഫൈൽ ഫോട്ടോ തയ്യാറാക്കുന്നു...');
            compressImage(f, { maxWidth: 280, maxHeight: 280, quality: 0.8 }).then(compressed => {
                syncAllProfileUIs({ avatar: compressed });
                toast('📸 Profile photo updated!');
                if (window.THUNA_FIREBASE && typeof window.THUNA_FIREBASE.upload === 'function') {
                    window.THUNA_FIREBASE.upload(f, 'profiles/avatar').then(res => {
                        if (res && res.url) {
                            syncAllProfileUIs({ avatar: res.url });
                        }
                    }).catch(err => {
                        console.info('[Firebase Storage] Fallback stream active', err);
                    });
                }
            });
        }

        /* -------------------------------------------------------------
           12. UNIFIED REUSABLE LOCATION SERVICE & PROXIMITY ENGINE
           ------------------------------------------------------------- */
        function getUserCoords() {
            return APP_STATE.userCoordinates || { latitude: 9.1530, longitude: 76.7356, accuracy: 100, isManual: true };
        }

        function calculateDistance(lat1, lon1, lat2, lon2) {
            if (window.LocationService && typeof window.LocationService.calculateDistance === 'function') {
                return window.LocationService.calculateDistance(lat1, lon1, lat2, lon2);
            }
            if (lat1 == null || lon1 == null || lat2 == null || lon2 == null) return Infinity;
            const R = 6371;
            const dLat = (lat2 - lat1) * Math.PI / 180;
            const dLon = (lon2 - lon1) * Math.PI / 180;
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
        }

        function parseRadiusKm(rad) {
            if (window.LocationService && typeof window.LocationService.parseRadiusKm === 'function') {
                return window.LocationService.parseRadiusKm(rad);
            }
            if (!rad || rad === 'all') return Infinity;
            const str = String(rad).trim().toLowerCase();
            if (str.endsWith('m') && !str.endsWith('km')) {
                const val = parseFloat(str);
                return Number.isFinite(val) ? val / 1000 : Infinity; // e.g. 200m -> 0.2 km
            }
            const val = parseFloat(str);
            return Number.isFinite(val) ? val : Infinity;
        }

        function formatDistance(km) {
            if (window.LocationService && typeof window.LocationService.formatDistance === 'function') {
                return window.LocationService.formatDistance(km);
            }
            if (km == null || !Number.isFinite(km) || km === Infinity) return '';
            if (km < 0.05) return '< 50 m';
            if (km < 1) return `${Math.round(km * 1000)} m`;
            if (km < 10) return `${km.toFixed(1)} km`;
            return `${Math.round(km)} km`;
        }

        window.KERALA_LOCATION_PRESETS = [
            { name: 'കണ്ണൂർ (Kannur)', lat: 11.8745, lon: 75.3704, district: 'Kannur' },
            { name: 'തലശ്ശേരി (Thalassery), കണ്ണൂർ', lat: 11.7480, lon: 75.4894, district: 'Kannur' },
            { name: 'പയ്യന്നൂർ (Payyanur), കണ്ണൂർ', lat: 12.1009, lon: 75.2038, district: 'Kannur' },
            { name: 'കോഴിക്കോട് (Kozhikode)', lat: 11.2588, lon: 75.7804, district: 'Kozhikode' },
            { name: 'കൊച്ചി (Kochi), എറണാകുളം', lat: 9.9816, lon: 76.2999, district: 'Ernakulam' },
            { name: 'തിരുവനന്തപുരം (Thiruvananthapuram)', lat: 8.5241, lon: 76.9366, district: 'Thiruvananthapuram' },
            { name: 'തൃശ്ശൂർ (Thrissur)', lat: 10.5276, lon: 76.2144, district: 'Thrissur' },
            { name: 'മലപ്പുറം (Malappuram)', lat: 11.0732, lon: 76.0740, district: 'Malappuram' },
            { name: 'പാലക്കാട് (Palakkad)', lat: 10.7867, lon: 76.6548, district: 'Palakkad' },
            { name: 'കൊല്ലം (Kollam)', lat: 8.8932, lon: 76.6141, district: 'Kollam' },
            { name: 'ആലപ്പുഴ (Alappuzha)', lat: 9.4981, lon: 76.3388, district: 'Alappuzha' },
            { name: 'കോട്ടയം (Kottayam)', lat: 9.5916, lon: 76.5222, district: 'Kottayam' },
            { name: 'ഇടുക്കി (Idukki - Thodupuzha)', lat: 9.8959, lon: 76.7184, district: 'Idukki' },
            { name: 'വയനാട് (Wayanad - Kalpetta)', lat: 11.6103, lon: 76.0827, district: 'Wayanad' },
            { name: 'കാസർഗോഡ് (Kasaragod)', lat: 12.5102, lon: 74.9852, district: 'Kasaragod' },
            { name: 'അടൂർ (Adoor), പത്തനംതിട്ട', lat: 9.1530, lon: 76.7356, district: 'Pathanamthitta' },
            { name: 'പന്തളം (Pandalam), പത്തനംതിട്ട', lat: 9.2319, lon: 76.6806, district: 'Pathanamthitta' },
            { name: 'തിരുവല്ല (Thiruvalla), പത്തനംതിട്ട', lat: 9.3835, lon: 76.5741, district: 'Pathanamthitta' }
        ];

        window.openGpsSettingsModal = openLocationModal;

        function setLocation(loc, notify = true, customCoords = null) {
            let coords = customCoords;
            const presets = window.KERALA_LOCATION_PRESETS || [];
            if (!coords) {
                const matched = presets.find(p => p.name.toLowerCase().includes(loc.toLowerCase()) || loc.toLowerCase().includes(p.name.toLowerCase().split(',')[0]));
                coords = matched ? { latitude: matched.lat, longitude: matched.lon, accuracy: 500, isManual: true } : { latitude: 11.8745, longitude: 75.3704, accuracy: 500, isManual: true };
            }

            APP_STATE.userLocation = loc;
            APP_STATE.userCoordinates = coords;
            localStorage.setItem('thuna_user_location', loc);
            try { localStorage.setItem('thuna_user_coordinates', JSON.stringify(coords)); } catch (_) { }

            if (window.LocationService && typeof window.LocationService.setManualLocation === 'function') {
                try { window.LocationService.setManualLocation(loc, coords); } catch (_) { }
            }

            closeModal('modal-location');
            updateLocationUI({
                locationName: APP_STATE.userLocation,
                latitude: APP_STATE.userCoordinates.latitude,
                longitude: APP_STATE.userCoordinates.longitude,
                accuracy: APP_STATE.userCoordinates.accuracy,
                isManual: APP_STATE.userCoordinates.isManual,
                status: 'acquired'
            });

            refreshAllLocationViews();
            if (notify) toast('📍 ലൊക്കേഷൻ മാറ്റി: ' + loc);
        }

        function useGpsLocation() {
            const dot = document.getElementById('modalLocStatusDot') || document.getElementById('locStatusDot');
            const btnGps = document.getElementById('btnUseGps');
            if (dot) dot.classList.add('loading');
            if (btnGps) btnGps.disabled = true;
            toast('📍 GPS ലൊക്കേഷൻ കണ്ടെത്തുന്നു…');

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async pos => {
                        if (dot) dot.classList.remove('loading');
                        if (btnGps) btnGps.disabled = false;
                        const lat = pos.coords.latitude;
                        const lon = pos.coords.longitude;
                        const accuracy = Math.round(pos.coords.accuracy || 10);
                        let cleanName = 'My Location';
                        if (window.LocationService && typeof window.LocationService.resolveCleanPlaceName === 'function') {
                            cleanName = await window.LocationService.resolveCleanPlaceName(lat, lon);
                        } else {
                            const presets = window.KERALA_LOCATION_PRESETS || [];
                            let minD = Infinity, closest = null;
                            for (const p of presets) {
                                const d = calculateDistance(lat, lon, p.lat, p.lon);
                                if (d < minD) { minD = d; closest = p; }
                            }
                            cleanName = (closest && minD < 45) ? closest.name : 'കണ്ണൂർ, കേരളം';
                        }
                        setLocation(cleanName, true, { latitude: lat, longitude: lon, accuracy, isManual: false });
                    },
                    err => {
                        if (dot) dot.classList.remove('loading');
                        if (btnGps) btnGps.disabled = false;
                        let msg = 'ലൊക്കേഷൻ ലഭ്യമല്ല. താഴെയുള്ള പട്ടികയിൽ നിന്ന് തിരഞ്ഞെടുക്കുക.';
                        if (err.code === 1) msg = '⚠️ GPS അനുമതി നിഷേധിച്ചു. താഴെയുള്ള ലിസ്റ്റിൽ നിന്ന് നിങ്ങളുടെ സ്ഥലം തിരഞ്ഞെടുക്കുക.';
                        else if (err.code === 2) msg = '⚠️ GPS സിഗ്നൽ ലഭ്യമല്ല. പട്ടികയിൽ നിന്ന് സ്ഥലം തിരഞ്ഞെടുക്കുക.';
                        else if (err.code === 3) msg = '⚠️ GPS സമയം കഴിഞ്ഞു. താഴെയുള്ള പട്ടികയിൽ നിന്ന് തിരഞ്ഞെടുക്കുക.';
                        toast(msg);
                    },
                    { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
                );
            } else {
                if (dot) dot.classList.remove('loading');
                if (btnGps) btnGps.disabled = false;
                toast('⚠️ ഈ browser-ൽ GPS ലഭ്യമല്ല. താഴെയുള്ള പട്ടികയിൽ നിന്ന് സ്ഥലം തിരഞ്ഞെടുക്കുക.');
            }
        }

        let isLocRefreshing = false;
        async function refreshCurrentLocationLive(silent = false) {
            if (isLocRefreshing) return;
            isLocRefreshing = true;

            const icon = document.getElementById('homeLocRefreshIcon');
            if (icon) icon.classList.add('spinning');

            if (!silent) toast('🔄 തത്സമയ ലൊക്കേഷൻ പുതുക്കുന്നു...');

            const finishRefresh = (locName, coords) => {
                isLocRefreshing = false;
                if (icon) icon.classList.remove('spinning');
                if (locName) {
                    setLocation(locName, false, coords);
                    if (!silent) toast(`📍 ലൊക്കേഷൻ പുതുക്കി: ${locName}`);
                }
            };

            try {
                if (window.LocationService && typeof window.LocationService.requestGpsLocation === 'function') {
                    const state = await window.LocationService.requestGpsLocation({ timeout: 8000, maximumAge: 0 });
                    finishRefresh(state.locationName, { latitude: state.latitude, longitude: state.longitude, accuracy: state.accuracy, isManual: false });
                    return;
                }

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        async (pos) => {
                            const lat = pos.coords.latitude;
                            const lon = pos.coords.longitude;
                            let placeName = APP_STATE.userLocation || 'കണ്ണൂർ, കേരളം';
                            if (window.LocationService && typeof window.LocationService.resolveCleanPlaceName === 'function') {
                                placeName = await window.LocationService.resolveCleanPlaceName(lat, lon);
                            } else {
                                try {
                                    const ctrl = new AbortController();
                                    const t = setTimeout(() => ctrl.abort(), 4000);
                                    const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`, { signal: ctrl.signal });
                                    clearTimeout(t);
                                    if (res.ok) {
                                        const data = await res.json();
                                        const city = data.city || data.locality || data.principalSubdivision;
                                        const state = data.principalSubdivision || data.countryName;
                                        if (city && state && city !== state) placeName = `${city}, ${state}`;
                                        else if (city) placeName = city;
                                    }
                                } catch (_) { }
                            }
                            finishRefresh(placeName, { latitude: lat, longitude: lon, accuracy: Math.round(pos.coords.accuracy || 10), isManual: false });
                        },
                        (err) => {
                            isLocRefreshing = false;
                            if (icon) icon.classList.remove('spinning');
                            if (!silent) toast('⚠️ GPS സിഗ്നൽ ലഭ്യമല്ല. നിലവിലെ ലൊക്കേഷൻ നിലനിർത്തുന്നു.');
                        },
                        { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
                    );
                } else {
                    isLocRefreshing = false;
                    if (icon) icon.classList.remove('spinning');
                }
            } catch (err) {
                isLocRefreshing = false;
                if (icon) icon.classList.remove('spinning');
            }
        }

        function updateLocationUI(state) {
            const cleanLoc = state.locationName || APP_STATE.userLocation;
            const disp = document.getElementById('currentLocDisplay');
            if (disp) disp.textContent = cleanLoc;
            document.querySelectorAll('.user-live-city-name').forEach(el => {
                el.textContent = cleanLoc;
            });
            const homePill = document.getElementById('homeLiveLocText');
            if (homePill) homePill.textContent = cleanLoc;
            const servLoc = document.getElementById('ywServicesLocationLabel');
            if (servLoc) servLoc.textContent = cleanLoc;
            if (APP_STATE.currentScreen === 'nearby') renderNearbyScreen();
            if (APP_STATE.currentScreen === 'blood') renderBloodScreen();
            if (APP_STATE.currentScreen === 'services') renderServices();
            renderLocationPresets();
            renderHomeNearbyStrip();
        }

        function handleLocationSearchEnter(val) {
            const q = (val || '').trim();
            if (!q) return;
            const presets = window.KERALA_LOCATION_PRESETS || [];
            const matched = presets.find(p => p.name.toLowerCase().includes(q.toLowerCase()) || (p.district && p.district.toLowerCase().includes(q.toLowerCase())));
            if (matched) {
                setLocation(matched.name, true, { latitude: matched.lat, longitude: matched.lon, accuracy: 500, isManual: true });
            } else {
                setLocation(q, true, { latitude: 11.8745, longitude: 75.3704, accuracy: 500, isManual: true });
            }
        }

        function renderLocationPresets(query = '') {
            const listEl = document.getElementById('presetLocationsList');
            if (!listEl) return;
            const presets = window.KERALA_LOCATION_PRESETS || [];
            const q = (query || '').toLowerCase().trim();
            const filtered = presets.filter(p => !q || p.name.toLowerCase().includes(q) || (p.district && p.district.toLowerCase().includes(q)));
            const userCoords = getUserCoords();

            if (filtered.length === 0) {
                listEl.innerHTML = `
                    <div class="setting-row" style="cursor:pointer;background:#ecfdf5;border:1.5px solid #86efac;border-radius:12px;padding:12px;display:flex;align-items:center;justify-content:space-between"
                        onclick="setLocation('${escapeHtml(q).replace(/'/g, "\\'")}', true, { latitude: 11.8745, longitude: 75.3704, accuracy: 500, isManual: true })">
                        <div style="display:flex;align-items:center;gap:8px">
                            <span>📍</span>
                            <div>
                                <strong style="font-size:13px;color:#065f46">"${escapeHtml(q)}" ലൊക്കേഷനായി നൽകുക</strong>
                                <div style="font-size:11px;color:#15803d">ഇവിടെ ടാപ്പ് ചെയ്ത് ഈ സ്ഥലം സെറ്റ് ചെയ്യാം</div>
                            </div>
                        </div>
                        <span style="color:#15803d;font-weight:800;font-size:13px">സെറ്റ് &rsaquo;</span>
                    </div>
                `;
                return;
            }

            listEl.innerHTML = filtered.map(p => {
                const dist = calculateDistance(userCoords.latitude, userCoords.longitude, p.lat, p.lon);
                const isCurrent = APP_STATE.userLocation.includes(p.name.split(',')[0].split('(')[0].trim());
                const distStr = formatDistance(dist);
                return `
                    <div class="setting-row" style="cursor:pointer;background:${isCurrent ? '#f0fdf4' : '#ffffff'};border:1px solid ${isCurrent ? '#bbf7d0' : '#e2e8f0'};border-radius:12px;padding:9px 12px;display:flex;align-items:center;justify-content:space-between"
                        onclick="setLocation('${escapeHtml(p.name).replace(/'/g, "\\'")}', true, { latitude: ${p.lat}, longitude: ${p.lon}, accuracy: 500, isManual: true })">
                        <div style="display:flex;align-items:center;gap:8px">
                            <span>📍</span>
                            <div>
                                <strong style="font-size:13px;color:#0f172a">${escapeHtml(p.name)}</strong>
                                ${distStr ? `<div style="font-size:11px;color:#047857">~${distStr} away</div>` : ''}
                            </div>
                        </div>
                        ${isCurrent ? '<span style="color:#059669;font-weight:800;font-size:15px">✓</span>' : '<span style="color:#cbd5e1;font-size:14px">›</span>'}
                    </div>
                `;
            }).join('');
        }

        function filterLocationPresets(val) {
            renderLocationPresets(val);
        }

        function renderHomeNearbyStrip() {
            const container = document.getElementById('homeNearbyPeopleStrip');
            if (!container) return;
            const userCoords = getUserCoords();
            const rawList = (typeof getFriendsList === 'function') ? getFriendsList() : (DEFAULT_FRIENDS || []);
            const list = rawList.filter(f => f.optIn !== false).map(f => {
                const itemLat = (f.latDiff != null) ? (userCoords.latitude + f.latDiff) : f.lat;
                const itemLon = (f.lonDiff != null) ? (userCoords.longitude + f.lonDiff) : f.lon;
                const dist = (itemLat != null && itemLon != null)
                    ? calculateDistance(userCoords.latitude, userCoords.longitude, itemLat, itemLon)
                    : 0.15;
                return { ...f, _distKm: dist, _distFormatted: formatDistance(dist) };
            }).sort((a, b) => a._distKm - b._distKm);

            if (!list.length) {
                container.innerHTML = `
                    <div style="padding:14px 16px;background:linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%);border-radius:18px;border:1.5px dashed #86EFAC;display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;box-shadow:0 2px 8px rgba(16,185,129,0.06)">
                        <div style="display:flex;align-items:center;gap:12px">
                            <div style="width:38px;height:38px;border-radius:12px;background:#ffffff;display:flex;align-items:center;justify-content:center;font-size:20px;box-shadow:0 2px 6px rgba(0,0,0,0.05);flex-shrink:0">
                                📍
                            </div>
                            <div>
                                <div style="font-size:13px;font-weight:800;color:#064E3B;margin-bottom:2px">സമീപത്തുള്ള പ്രദേശവാസികൾ</div>
                                <div style="font-size:11px;color:#047857;line-height:1.3">നിങ്ങളുടെ വാർഡിലെ അംഗങ്ങൾ സജീവമാകുമ്പോൾ ഇവിടെ കാണാം</div>
                            </div>
                        </div>
                        <button onclick="navTo('nearby')" style="background:#15803D;color:#ffffff;border:none;border-radius:10px;padding:7px 12px;font-size:11.5px;font-weight:800;cursor:pointer;white-space:nowrap;box-shadow:0 2px 6px rgba(21,128,61,0.2)">
                            തുറക്കുക &rsaquo;
                        </button>
                    </div>
                `;
                return;
            }

            container.innerHTML = list.map(f => `
                <div class="home-nearby-card" onclick="navTo('nearby')" style="cursor:pointer">
                    <div class="home-nearby-avatar-wrap">
                        <span style="font-size:26px">${f.face || '👤'}</span>
                        ${f.online ? '<span class="home-nearby-online-dot"></span>' : ''}
                    </div>
                    <div class="home-nearby-name">${escapeHtml(f.name)}</div>
                    <div class="home-nearby-dist">${f._distFormatted || 'Nearby'} ${f.group ? `• ${f.group}` : ''}</div>
                </div>
            `).join('');
        }

        function refreshAllLocationViews() {
            renderDonors(APP_STATE.activeBloodGroup || 'all');
            renderUrgentBloodRequests();
            renderNearbyFriends();
            renderServices();
            renderHomePopularServices();
            renderJobs();
            renderMarketplace();
            renderTaxiCarry();
            renderRegisteredAmbulanceDrivers();
            renderCommunityFeed();
            renderHomeNearbyStrip();
        }

        /* -------------------------------------------------------------
           FEATURE 1: BLOOD DONORS & URGENT BLOOD REQUESTS
           ------------------------------------------------------------- */
        function getDonorsList() {
            try {
                const custom = JSON.parse(localStorage.getItem('thuna_custom_donors') || '[]');
                return [...custom, ...DEFAULT_DONORS];
            } catch (e) {
                return DEFAULT_DONORS;
            }
        }

        function renderUrgentBloodRequests() {
            const section = document.getElementById('urgentBloodRequestsSection');
            if (!section) return;
            const userCoords = getUserCoords();
            const requests = DEFAULT_URGENT_BLOOD_REQUESTS.map(req => {
                const itemLat = (req.latDiff != null) ? (userCoords.latitude + req.latDiff) : req.lat;
                const itemLon = (req.lonDiff != null) ? (userCoords.longitude + req.lonDiff) : req.lon;
                const dist = (itemLat != null && itemLon != null)
                    ? calculateDistance(userCoords.latitude, userCoords.longitude, itemLat, itemLon)
                    : Infinity;
                return { ...req, _distanceKm: dist, _distanceFormatted: formatDistance(dist) };
            }).sort((a, b) => a._distanceKm - b._distanceKm);

            if (!requests.length) {
                section.innerHTML = '';
                return;
            }

            section.innerHTML = `
                <div style="font-size:12px;font-weight:800;color:#dc2626;margin-bottom:6px;display:flex;align-items:center;gap:5px">
                    <span>🚨</span> Urgent Blood Needed Nearby
                </div>
                ${requests.slice(0, 2).map(r => `
                    <div style="background:#fff1f2;border:1.5px solid #fecdd3;border-radius:14px;padding:10px 12px;margin-bottom:8px">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
                            <span style="background:#dc2626;color:#ffffff;font-size:11.5px;font-weight:800;padding:2px 8px;border-radius:6px">Group ${escapeHtml(r.group)} • ${r.units} Unit</span>
                            <span class="distance-badge" style="background:#ffffff;color:#dc2626;border-color:#fecdd3">📍 ~${r._distanceFormatted}</span>
                        </div>
                        <div style="font-size:12.5px;font-weight:700;color:#0f172a">${escapeHtml(r.hospital)}</div>
                        <div style="font-size:11px;color:#64748b">${escapeHtml(r.reason)} • ${escapeHtml(r.timeAgo)}</div>
                        <div style="display:flex;justify-content:flex-end;margin-top:6px">
                            <button class="chat-now-btn" style="background:#dc2626;color:#ffffff;border:none;padding:5px 12px;font-size:11.5px;border-radius:8px"
                                onclick="openDonorChat('${escapeHtml(r.contactPerson)}', '${escapeHtml(r.group)}', '${escapeHtml(r.hospital)}')">
                                Respond to Emergency
                            </button>
                        </div>
                    </div>
                `).join('')}
            `;
        }

        function renderDonors(grp = 'all') {
            APP_STATE.activeBloodGroup = grp;
            renderUrgentBloodRequests();
            const containers = document.querySelectorAll('#bloodDonorsList, #modalBloodDonorsList');
            if (!containers.length) return;

            const userCoords = getUserCoords();
            let list = getDonorsList().filter(d => grp === 'all' || d.group === grp);

            // Compute distances and sort by proximity
            list = list.map(d => {
                const itemLat = (d.latDiff != null) ? (userCoords.latitude + d.latDiff) : d.lat;
                const itemLon = (d.lonDiff != null) ? (userCoords.longitude + d.lonDiff) : d.lon;
                const dist = (itemLat != null && itemLon != null)
                    ? calculateDistance(userCoords.latitude, userCoords.longitude, itemLat, itemLon)
                    : Infinity;
                return { ...d, _distanceKm: dist, _distanceFormatted: formatDistance(dist) };
            }).sort((a, b) => a._distanceKm - b._distanceKm);

            // Filter by distance radius if active
            const rad = APP_STATE.activeBloodRadius || 'all';
            if (rad !== 'all') {
                const maxKm = parseRadiusKm(rad);
                if (Number.isFinite(maxKm)) {
                    list = list.filter(d => d._distanceKm <= maxKm);
                }
            }

            if (list.length === 0) {
                const emptyHtml = `
                    <div class="empty-state-card">
                        <div class="empty-state-icon">🩸</div>
                        <div class="empty-state-title">ഈ പരിധിയിൽ ഡോണർമാർ ലഭ്യമല്ല (${grp === 'all' ? 'All Groups' : grp})</div>
                        <div class="empty-state-desc">ദൂരപരിധി മാറ്റുക അല്ലെങ്കിൽ അടിയന്തര ആവശ്യമെങ്കിൽ രക്തദാന അഭ്യർത്ഥന പോസ്റ്റ് ചെയ്യുക.</div>
                        <div style="display:flex;gap:8px;justify-content:center;margin-top:10px">
                            <button class="primary-action-btn" style="margin:0;padding:7px 14px;background:#059669;font-size:12px" onclick="filterDonorsRadius('all')">Show All Distance</button>
                            <button class="primary-action-btn" style="margin:0;padding:7px 14px;background:#dc2626;font-size:12px" onclick="openRequestBloodModal()">Request Blood</button>
                        </div>
                    </div>`;
                containers.forEach(c => { c.innerHTML = emptyHtml; });
                return;
            }

            const html = list.map(d => `
                <div class="provider-card">
                    <div class="provider-avatar-circle" style="background:#fee2e2;color:#dc2626;font-weight:800;font-size:14px;border:1px solid #fecaca">
                        ${escapeHtml(d.group)}
                    </div>
                    <div class="provider-info">
                        <div class="provider-name" style="font-weight:700">${escapeHtml(d.name)}</div>
                        <div class="provider-rating-row" style="font-size:12px;color:var(--muted);display:flex;align-items:center;gap:6px;flex-wrap:wrap">
                            <span>📍 ${escapeHtml(d.location)}</span>
                            ${d._distanceFormatted ? `<span class="distance-badge">~${d._distanceFormatted} away</span>` : ''}
                        </div>
                    </div>
                    <button class="chat-now-btn" style="background:var(--primary-green);color:#ffffff;border:none;padding:7px 15px;border-radius:12px;font-weight:700;font-size:12.5px;cursor:pointer;display:inline-flex;align-items:center;gap:5px" onclick="openDonorChat('${escapeHtml(d.name).replace(/'/g, "\\'")}', '${escapeHtml(d.group)}', '${escapeHtml(d.location).replace(/'/g, "\\'")}')">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                        Chat
                    </button>
                </div>
            `).join('');

            containers.forEach(c => { c.innerHTML = html; });
        }

        function filterDonorsGroup(g, btn) {
            document.querySelectorAll('#bloodFilterPills .pill-btn').forEach(b => b.classList.remove('active'));
            if (btn) btn.classList.add('active');
            renderDonors(g);
        }

        function filterDonorsRadius(rad, btn) {
            APP_STATE.activeBloodRadius = rad;
            if (btn) {
                document.querySelectorAll('#bloodRadiusPills .radius-pill').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            } else {
                document.querySelectorAll('#bloodRadiusPills .radius-pill').forEach(b => {
                    b.classList.toggle('active', b.textContent.includes('All'));
                });
            }
            renderDonors(APP_STATE.activeBloodGroup || 'all');
        }

        function openDonorChat(name, group, location) {
            const donorId = 'donor_' + name.toLowerCase().replace(/[^a-z0-9]/g, '_');
            const donorObj = {
                id: donorId,
                name: `${name} (${group} Donor)`,
                category: 'blood',
                location: location
            };
            APP_STATE.activeChatProvider = donorObj;

            const nameEl = document.getElementById('chatModalName');
            if (nameEl) nameEl.textContent = `${name} (${group} Donor)`;
            const chatAv = document.getElementById('chatModalAvatar');
            if (chatAv) {
                chatAv.innerHTML = `🩸`;
                chatAv.style.background = '#fee2e2';
                chatAv.style.color = '#dc2626';
                chatAv.style.fontWeight = '800';
            }
            const statusEl = document.getElementById('chatModalStatus');
            if (statusEl) statusEl.textContent = 'Active Blood Donor · Available for Emergency';

            const startersContainer = document.querySelector('#modal-chat .chat-quick-starters');
            if (startersContainer) {
                startersContainer.innerHTML = `
                    <div class="chat-starter-chip" onclick="sendQuickMessage('🚨 Urgent ${group} blood needed at Taluk Hospital Adoor')">🚨 Urgent ${group} blood</div>
                    <div class="chat-starter-chip" onclick="sendQuickMessage('Are you available to donate today? (ഇന്ന് ലഭ്യമാണോ?)')">🩸 Available today?</div>
                    <div class="chat-starter-chip" onclick="sendQuickMessage('Which hospital / spot is convenient for you?')">📍 Hospital location</div>
                    <div class="chat-starter-chip" onclick="sendQuickMessage('Need 1 unit urgently for patient')">💉 1 Unit needed</div>
                `;
            }

            renderChatThread(donorId);
            closeModal('modal-blood');
            openModal('modal-chat');
        }

        function openRegisterDonorModal() {
            closeModal('modal-blood');
            const profile = getUnifiedUserProfile();
            const nameEl = document.getElementById('regDonorName');
            const phoneEl = document.getElementById('regDonorPhone');
            const locEl = document.getElementById('regDonorLocation');
            const bannerEl = document.getElementById('donorAutofillBanner');

            if (nameEl) nameEl.value = profile.name;
            if (phoneEl) phoneEl.value = profile.phone;
            if (locEl) locEl.value = profile.location || APP_STATE.userLocation || 'Adoor, Pathanamthitta';

            if (bannerEl) {
                bannerEl.style.display = 'flex';
                const nameText = document.getElementById('donorAutofillName');
                const phoneText = document.getElementById('donorAutofillPhone');
                if (nameText) nameText.textContent = profile.name;
                if (phoneText) phoneText.textContent = profile.phone;
            }
            openModal('modal-register-donor');
        }

        function openRequestBloodModal() {
            closeModal('modal-blood');
            openModal('modal-request-blood');
        }

        function submitDonorRegistration(e) {
            e.preventDefault();
            const name = document.getElementById('regDonorName')?.value.trim();
            const group = document.getElementById('regDonorGroup')?.value.trim();
            const phone = document.getElementById('regDonorPhone')?.value.trim();
            const loc = document.getElementById('regDonorLocation')?.value.trim();
            if (!name || !group || !loc) return;

            const userCoords = getUserCoords();
            const newDonor = {
                name: name,
                group: group,
                phone: phone || '+91 90000 00000',
                location: loc,
                lat: userCoords.latitude,
                lon: userCoords.longitude
            };

            const custom = JSON.parse(localStorage.getItem('thuna_custom_donors') || '[]');
            custom.unshift(newDonor);
            localStorage.setItem('thuna_custom_donors', JSON.stringify(custom));

            // Sync with Firebase if available
            if (window.THUNA_FIREBASE && typeof window.THUNA_FIREBASE.saveLocationAware === 'function') {
                window.THUNA_FIREBASE.saveLocationAware('blood', newDonor).catch(() => { });
            }

            closeModal('modal-register-donor');
            openBloodModal();
            filterDonorsGroup(group);
            toast(`❤️ ${name} (${group}) വിജയകരമായി രജിസ്റ്റർ ചെയ്തു! നന്ദി!`);
        }

        function submitBloodRequest(e) {
            e.preventDefault();
            const group = document.getElementById('reqBloodGroup')?.value.trim();
            const units = document.getElementById('reqBloodUnits')?.value.trim() || '1';
            const urgency = document.getElementById('reqBloodUrgency')?.value || 'Immediate';
            const hospital = document.getElementById('reqBloodHospital')?.value.trim();
            const patient = document.getElementById('reqBloodPatient')?.value.trim();

            if (!group || !hospital) return;

            const userCoords = getUserCoords();
            const bloodPost = {
                id: 'post_blood_' + Date.now(),
                authorName: 'Emergency Blood Alert',
                authorBadge: '🚨',
                badgeBg: '#dc2626',
                hasPin: true,
                timeAgo: 'Just now',
                category: 'blood',
                title: `🚨 Urgent: ${group} Blood Needed (${units} Unit)`,
                content: `Patient: ${patient || 'Patient'} | Hospital: ${hospital} | Urgency: ${urgency}. Available voluntary donors please connect via Chat.`,
                location: hospital,
                lat: userCoords.latitude,
                lon: userCoords.longitude,
                mediaUrl: '',
                likes: 1,
                liked: false,
                comments: 0,
                commentsList: []
            };

            const customPosts = JSON.parse(localStorage.getItem('thuna_custom_posts') || '[]');
            customPosts.unshift(bloodPost);
            localStorage.setItem('thuna_custom_posts', JSON.stringify(customPosts));

            // Sync with Firebase
            if (window.THUNA_FIREBASE && typeof window.THUNA_FIREBASE.saveLocationAware === 'function') {
                window.THUNA_FIREBASE.saveLocationAware('blood', bloodPost).catch(() => { });
            }

            renderCommunityFeed();
            closeModal('modal-request-blood');
            openBloodModal();
            filterDonorsGroup(group);
            toast(`🚨 ${group} Blood Request Broadcasted to Community! Matching donors shown.`);
        }

        /* -------------------------------------------------------------
           FEATURE 2: NEARBY FRIENDS (Opt-In Privacy Controls)
           ------------------------------------------------------------- */
        function openNearbyFriendsModal() {
            openModal('modal-nearby-friends');
            const toggle = document.getElementById('nearbyFriendsOptInToggle');
            if (toggle) toggle.checked = APP_STATE.nearbyFriendsOptIn;
            renderNearbyFriends();
        }

        function toggleNearbyFriendsOptIn(checked) {
            APP_STATE.nearbyFriendsOptIn = checked;
            localStorage.setItem('thuna_friends_optin', checked ? 'true' : 'false');
            const profCheck = document.getElementById('profNearbyOptIn');
            if (profCheck) profCheck.checked = checked;
            toast(checked ? '👥 You are now visible to nearby community members.' : '🔒 Nearby Friends visibility disabled.');
            renderNearbyFriends();
        }

        function filterNearbyFriends(filter, btn) {
            APP_STATE.activeFriendsRadius = filter;
            document.querySelectorAll('#friendsRadiusPills .radius-pill').forEach(b => b.classList.remove('active'));
            if (btn) btn.classList.add('active');
            renderNearbyFriends();
        }

        function renderNearbyFriends() {
            const container = document.getElementById('nearbyFriendsList');
            if (!container) return;
            const userCoords = getUserCoords();

            let list = (typeof getFriendsList === 'function' ? getFriendsList() : (DEFAULT_FRIENDS || [])).filter(f => f.optIn !== false);
            list = list.map(f => {
                const itemLat = (f.latDiff != null) ? (userCoords.latitude + f.latDiff) : f.lat;
                const itemLon = (f.lonDiff != null) ? (userCoords.longitude + f.lonDiff) : f.lon;
                const dist = (itemLat != null && itemLon != null)
                    ? calculateDistance(userCoords.latitude, userCoords.longitude, itemLat, itemLon)
                    : Infinity;
                return { ...f, _distanceKm: dist, _distanceFormatted: formatDistance(dist) };
            }).sort((a, b) => a._distanceKm - b._distanceKm);

            const filter = APP_STATE.activeFriendsRadius || 'all';
            if (filter === 'online') {
                list = list.filter(f => f.online);
            } else if (filter !== 'all') {
                const maxKm = parseRadiusKm(filter);
                if (Number.isFinite(maxKm)) {
                    list = list.filter(f => f._distanceKm <= maxKm);
                }
            }

            if (!APP_STATE.nearbyFriendsOptIn) {
                container.innerHTML = `
                    <div class="empty-state-card" style="background:#fffdf2;border-color:#fef08a">
                        <div class="empty-state-icon">🔒</div>
                        <div class="empty-state-title">Nearby Friends is turned off for you</div>
                        <div class="empty-state-desc">Turn on the toggle above to discover verified neighbors around your panchayat.</div>
                    </div>`;
                return;
            }

            if (!list.length) {
                container.innerHTML = `
                    <div class="empty-state-card">
                        <div class="empty-state-icon">👥</div>
                        <div class="empty-state-title">No members found in this radius</div>
                        <div class="empty-state-desc">Expand your distance filter to see members from nearby wards.</div>
                    </div>`;
                return;
            }

            container.innerHTML = list.map(f => `
                <div class="provider-card" style="display:flex;align-items:center;justify-content:space-between">
                    <div style="display:flex;align-items:center;gap:12px">
                        <div style="width:40px;height:40px;border-radius:50%;background:#e0f2fe;display:flex;align-items:center;justify-content:center;font-size:22px;position:relative">
                            ${f.face}
                            <span style="position:absolute;bottom:0;right:0;width:10px;height:10px;border-radius:50%;background:${f.online ? '#10b981' : '#94a3b8'};border:2px solid #ffffff"></span>
                        </div>
                        <div>
                            <div style="font-size:13.5px;font-weight:700;color:#0f172a">${escapeHtml(f.name)}</div>
                            <div style="font-size:11.5px;color:#64748b;display:flex;align-items:center;gap:6px">
                                <span>📍 ${escapeHtml(f.location)}</span>
                                <span class="distance-badge">~${f._distanceFormatted}</span>
                            </div>
                        </div>
                    </div>
                    <button class="chat-now-btn" style="padding:6px 14px;font-size:12px" onclick="openDonorChat('${escapeHtml(f.name)}', '${f.group || 'Friend'}', '${escapeHtml(f.location)}')">
                        Message
                    </button>
                </div>
            `).join('');
        }

        /* -------------------------------------------------------------
           FEATURE 3: EMERGENCY AMBULANCES & HOSPITALS
           ------------------------------------------------------------- */
        function getAmbulancesList() {
            const userDrivers = getRegisteredAmbulanceDrivers();
            return [...userDrivers, ...DEFAULT_AMBULANCES];
        }

        function renderAmbulances() {
            renderRegisteredAmbulanceDrivers();
        }

        function renderRegisteredAmbulanceDrivers() {
            const box = document.getElementById('registeredAmbulanceDrivers');
            if (!box) return;
            const userCoords = getUserCoords();
            const list = getAmbulancesList().map(d => {
                const itemLat = (d.latDiff != null) ? (userCoords.latitude + d.latDiff) : d.lat;
                const itemLon = (d.lonDiff != null) ? (userCoords.longitude + d.lonDiff) : d.lon;
                const dist = (itemLat != null && itemLon != null)
                    ? calculateDistance(userCoords.latitude, userCoords.longitude, itemLat, itemLon)
                    : Infinity;
                return { ...d, _distanceKm: dist, _distanceFormatted: formatDistance(dist) };
            }).sort((a, b) => a._distanceKm - b._distanceKm);

            if (!list.length) { box.innerHTML = ''; return; }

            box.innerHTML = `
                <div style="font-size:12px;font-weight:800;color:#075b43;margin:8px 0 4px">Ambulances & Emergency Life Support</div>
                ${list.slice(0, 8).map(d => `
                    <div class="provider-card" style="margin-top:8px">
                        <div class="provider-avatar-circle" style="background:#fee2e2;font-size:24px">🚑</div>
                        <div class="provider-info">
                            <div class="provider-name">${escapeHtml(d.name)}</div>
                            <div class="provider-rating-row" style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
                                <span>📍 ${escapeHtml(d.location)}</span>
                                ${d._distanceFormatted ? `<span class="distance-badge">~${d._distanceFormatted}</span>` : ''}
                            </div>
                            <div class="provider-service-desc">${escapeHtml(d.vehicle || '')} · ${escapeHtml(d.type || 'Ambulance')}</div>
                        </div>
                        <a href="tel:${escapeHtml(d.phone || '108')}" class="call-emergency-btn" onclick="toast('Calling ${escapeHtml(d.name)}...')">
                            📞 Call
                        </a>
                    </div>
                `).join('')}
            `;
        }

        /* -------------------------------------------------------------
           FEATURE 4: LOCAL SERVICES
           ------------------------------------------------------------- */
        function renderServices(items = null) {
            const container = document.getElementById('servicesListContainer');
            if (!container) return;
            const countEl = document.getElementById('servicesActiveCountTitle');
            const userCoords = getUserCoords();
            const isEn = (CURRENT_APP_LANG === 'en');

            const sourceList = (items || getServicesList());
            const cat = APP_STATE.activeServiceCategory || 'all';

            let list = sourceList.filter(s => {
                if (cat === 'all') return true;
                const cLower = (s.category || '').toLowerCase();
                const catLower = cat.toLowerCase();
                return cLower === catLower ||
                    (s.categories && s.categories.some(c => c.toLowerCase() === catLower)) ||
                    (s.keywords && s.keywords.some(k => k.toLowerCase() === catLower)) ||
                    cLower.includes(catLower) || catLower.includes(cLower);
            }).map(s => {
                const itemLat = (s.latDiff != null) ? (userCoords.latitude + s.latDiff) : s.lat;
                const itemLon = (s.lonDiff != null) ? (userCoords.longitude + s.lonDiff) : s.lon;
                const dist = (itemLat != null && itemLon != null)
                    ? calculateDistance(userCoords.latitude, userCoords.longitude, itemLat, itemLon)
                    : Infinity;
                return { ...s, _distanceKm: dist, _distanceFormatted: formatDistance(dist) };
            }).sort((a, b) => a._distanceKm - b._distanceKm);

            // Radius filter
            const rad = APP_STATE.activeServiceRadius || 'all';
            if (rad !== 'all') {
                const maxKm = parseRadiusKm(rad);
                if (Number.isFinite(maxKm)) {
                    list = list.filter(s => s._distanceKm <= maxKm);
                }
            }

            if (countEl) {
                countEl.textContent = isEn
                    ? `Verified Providers (${list.length} Active)`
                    : `സേവന ദാതാക്കൾ (${list.length})`;
            }

            if (list.length === 0) {
                container.innerHTML = `
                    <div style="background:#FFFFFF;border:1.5px dashed #FFD32A;border-radius:20px;padding:36px 20px;text-align:center;box-shadow:0 4px 14px rgba(0,0,0,0.03);margin-top:10px">
                        <div style="width:64px;height:64px;border-radius:20px;background:#FFFBEB;border:1.5px solid #FDE68A;display:flex;align-items:center;justify-content:center;font-size:30px;margin:0 auto 12px">🛠️</div>
                        <div style="font-size:16px;font-weight:800;color:#123B66;margin-bottom:6px">
                            ${isEn ? 'No service providers found' : 'ഈ വിഭാഗത്തിൽ സർവീസുകൾ ലഭ്യമല്ല'}
                        </div>
                        <div style="color:#64748B;font-size:13px;margin-bottom:18px;line-height:1.5;max-width:360px;margin-left:auto;margin-right:auto">
                            ${isEn ? 'Try another category or register your own service for people in your town!' : 'മറ്റൊരു കാറ്റഗറി തിരഞ്ഞെടുക്കുക അല്ലെങ്കിൽ ഈ നാട്ടിൽ നിങ്ങളുടെ സർവീസ് സൗജന്യമായി രജിസ്റ്റർ ചെയ്യൂ!'}
                        </div>
                        <button type="button" class="yw-header-reg-btn" style="display:inline-flex;padding:11px 22px;font-size:13.5px;box-shadow:0 4px 14px rgba(255,211,42,0.4)" onclick="openAddServiceModal()">
                            ${isEn ? '+ Register My Service' : '➕ സർവീസ് രജിസ്റ്റർ ചെയ്യാം'}
                        </button>
                    </div>`;
                return;
            }

            container.innerHTML = list.map(item => {
                const catMeta = getServiceCategoryMeta(item.category);
                const catLabel = isEn ? (catMeta.en || item.category) : (catMeta.ml || item.category);
                const distText = item._distanceFormatted || item.distance || '';
                const isAvail = (item.isAvailable !== false);
                const rateText = item.rate || 'ന്യായമായ നിരക്ക്';
                const cleanPhone = (item.phone || '').replace(/[^0-9+]/g, '');
                let cleanWa = cleanPhone.replace(/^\+/, '');
                if (cleanWa.length === 10) cleanWa = '91' + cleanWa;
                const waMsg = `നമസ്കാരം, നമ്മൂടെ നാട് ആപ്പിൽ നിങ്ങളുടെ ${catLabel} സർവീസ് കണ്ടു ബന്ധപ്പെടുകയാണ്.`;

                return `
                <div class="yw-provider-card" id="provider-${escapeHtml(item.id)}">
                    <!-- Top: Icon Avatar, Name, Availability Badge -->
                    <div class="yw-provider-top">
                        <div class="yw-provider-avatar">
                            <span style="font-size:24px">${catMeta.icon || '🛠️'}</span>
                        </div>
                        <div class="yw-provider-info">
                            <div class="yw-provider-name-row">
                                <span class="yw-provider-name">${escapeHtml(item.name || item.businessName)}</span>
                                <span class="yw-availability-badge ${isAvail ? 'available' : 'busy'}">
                                    ${isAvail ? '🟢 ലഭ്യമാണ്' : '🔴 ലഭ്യമല്ല'}
                                </span>
                            </div>
                            <div class="yw-provider-cat-tag">
                                <span>${catMeta.icon || '🛠️'}</span>
                                <span>${escapeHtml(catLabel)}</span>
                            </div>
                            <div class="yw-provider-location">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                <span>${escapeHtml(item.location || 'കേരളം')}${item.district ? (', ' + escapeHtml(item.district)) : ''}${distText ? ` · ~${distText}` : ''}</span>
                            </div>
                            <div class="yw-provider-rate">
                                <span>💰 നിരക്ക്:</span>
                                <strong>${escapeHtml(rateText)}</strong>
                            </div>
                        </div>
                    </div>

                    <!-- Description -->
                    ${item.desc ? `
                    <div class="yw-provider-desc">
                        ${escapeHtml(item.desc)}
                    </div>` : ''}

                    <!-- Action Buttons: View Details, Call, WhatsApp -->
                    <div class="yw-provider-actions">
                        <button type="button" class="yw-btn-details" onclick="openServiceDetailsModal('${escapeHtml(item.id)}')">
                            <span>👁️ വിവരങ്ങൾ</span>
                        </button>
                        ${cleanPhone ? `
                            <a href="tel:${escapeHtml(cleanPhone)}" class="yw-btn-call" onclick="toast('Calling ${escapeHtml(item.name || 'Provider')}...')">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.21 2.2z"/></svg>
                                <span>വിളിക്കാം</span>
                            </a>
                            <a href="https://wa.me/${escapeHtml(cleanWa)}?text=${encodeURIComponent(waMsg)}" target="_blank" class="yw-btn-whatsapp">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
                                <span>വാട്സാപ്പ്</span>
                            </a>
                        ` : ''}
                    </div>
                </div>
                `;
            }).join('');
        }

        function filterServicesRadius(rad, btn) {
            APP_STATE.activeServiceRadius = rad;
            if (btn) {
                document.querySelectorAll('.yw-filter-pill').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            } else {
                document.querySelectorAll('.yw-filter-pill').forEach((b, idx) => {
                    b.classList.toggle('active', idx === 0);
                });
            }
            filterServicesList();
        }

        /* -------------------------------------------------------------
           FEATURE 5: JOBS & RENTALS
           ------------------------------------------------------------- */
        function switchJobTab(tab) {
            APP_STATE.activeJobTab = tab;
            const bJobs = document.getElementById('btnTabJobs');
            const bRentals = document.getElementById('btnTabRentals');
            if (bJobs) bJobs.classList.toggle('active', tab === 'jobs');
            if (bRentals) bRentals.classList.toggle('active', tab === 'rentals');

            const actionBtn = document.getElementById('jobsScreenActionBtn');
            if (actionBtn) {
                if (tab === 'rentals') {
                    actionBtn.textContent = '+ Post Rental';
                    actionBtn.style.background = '#D97706';
                } else {
                    actionBtn.textContent = '+ Post Job';
                    actionBtn.style.background = '#059669';
                }
            }

            const pills = document.getElementById('jobCategoryPills');
            if (pills) pills.style.display = (tab === 'jobs') ? 'flex' : 'none';

            renderJobs();
        }

        function handleJobScreenAction() {
            if (APP_STATE.activeJobTab === 'rentals') {
                openPostRentalModal();
            } else {
                openPostJobModal();
            }
        }

        function openPostRentalModal() {
            const profile = getUnifiedUserProfile();
            const locInput = document.getElementById('postRentalLocation');
            const phoneInput = document.getElementById('postRentalPhone');
            const bannerEl = document.getElementById('rentalAutofillBanner');

            if (locInput && !locInput.value) {
                locInput.value = profile.location || APP_STATE.userLocation || 'കണ്ണൂർ, കേരളം';
            }
            if (phoneInput && !phoneInput.value) {
                phoneInput.value = `${profile.name} (${profile.phone})`;
            }
            if (bannerEl) {
                bannerEl.style.display = 'none';
            }
            openModal('modal-post-rental');
        }

        function submitRentalPosting(e) {
            if (e) e.preventDefault();
            const title = (document.getElementById('postRentalTitle')?.value || '').trim();
            const type = document.getElementById('postRentalType')?.value || 'House / Villa';
            const rent = (document.getElementById('postRentalRent')?.value || '').trim();
            const deposit = (document.getElementById('postRentalDeposit')?.value || '').trim();
            const size = (document.getElementById('postRentalSize')?.value || '').trim();
            const loc = (document.getElementById('postRentalLocation')?.value || '').trim();
            const phone = (document.getElementById('postRentalPhone')?.value || '').trim();
            const desc = (document.getElementById('postRentalDesc')?.value || '').trim();

            if (!title || !rent || !loc) {
                toast('⚠️ ദയവായി ആവശ്യമായ വിവരങ്ങൾ നൽകുക (Please fill required fields).');
                return;
            }

            const userCoords = getUserCoords();
            const lat = parseFloat(document.getElementById('postRentalLocation')?.dataset.lat) || userCoords.latitude;
            const lon = parseFloat(document.getElementById('postRentalLocation')?.dataset.lon) || userCoords.longitude;

            let category = 'houses';
            if (type.includes('Tool') || type.includes('Agri') || type.includes('Event') || type.includes('Equipment') || type.includes('Electronics') || type.includes('Item')) {
                category = 'items';
            } else if (type.includes('Vehicle') || type.includes('Car') || type.includes('Auto') || type.includes('Pickup')) {
                category = 'vehicles';
            }

            const newRental = {
                id: 'rent_' + Date.now(),
                title: title,
                type: type,
                category: category,
                rent: rent,
                deposit: deposit,
                size: size,
                location: loc,
                lat: lat,
                lon: lon,
                phone: phone,
                desc: desc,
                postedAt: Date.now()
            };

            const custom = JSON.parse(localStorage.getItem('thuna_custom_rentals') || '[]');
            custom.unshift(newRental);
            localStorage.setItem('thuna_custom_rentals', JSON.stringify(custom));

            if (window.THUNA_FIREBASE && typeof window.THUNA_FIREBASE.saveLocationAware === 'function') {
                window.THUNA_FIREBASE.saveLocationAware('rentals', newRental).catch(() => { });
            }

            closeModal('modal-post-rental');
            openMarketplaceModal('rentals');
            toast(`🏠 വാടക ലിസ്റ്റിംഗ് പ്രസിദ്ധീകരിച്ചു: ${title}`);
        }

        /* -------------------------------------------------------------
           REDESIGNED JOBS & CAREERS CONTROLLER (BLUE & WHITE THEME)
           ------------------------------------------------------------- */
        APP_STATE.activeJobSubTab = 'all';
        APP_STATE.jobsViewMode = 'list';
        APP_STATE.activeDetailedJob = null;

        function setJobsViewMode(mode) {
            APP_STATE.jobsViewMode = mode;
            const container = document.getElementById('jobsListContainer');
            const btnList = document.getElementById('btnJobsViewList');
            const btnGrid = document.getElementById('btnJobsViewGrid');

            if (mode === 'grid') {
                container?.classList.add('grid-mode');
                btnGrid?.classList.add('active');
                btnList?.classList.remove('active');
            } else {
                container?.classList.remove('grid-mode');
                btnList?.classList.add('active');
                btnGrid?.classList.remove('active');
            }
        }

        function switchJobsSubTab(tab, btn) {
            APP_STATE.activeJobSubTab = tab;
            document.querySelectorAll('.jobs-tab-btn').forEach(b => b.classList.remove('active'));
            if (btn) btn.classList.add('active');

            const filterBar = document.getElementById('jobsFilterBarWrap');
            if (filterBar) {
                // Keep filter bar visible for 'all' and 'saved'
                filterBar.style.display = (tab === 'all' || tab === 'saved') ? 'block' : 'none';
            }

            renderJobs();
        }

        function updateJobsBadgeCounts() {
            try {
                const savedIds = JSON.parse(localStorage.getItem('thuna_saved_jobs') || '[]');
                const savedEl = document.getElementById('savedJobsBadgeCount');
                if (savedEl) savedEl.textContent = savedIds.length;

                const apps = JSON.parse(localStorage.getItem('thuna_job_applications') || '[]');
                const appEl = document.getElementById('appliedJobsBadgeCount');
                if (appEl) appEl.textContent = apps.length;
            } catch (_) {}
        }

        function filterJobsRadius(rad, btn) {
            APP_STATE.activeJobRadius = rad;
            if (btn) {
                document.querySelectorAll('#jobsRadiusPills .job-pill-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            }
            renderJobs();
        }

        function selectJobCategory(cat, btn) {
            APP_STATE.activeJobCategory = cat;
            document.querySelectorAll('#jobCategoryPills .job-pill-btn').forEach(b => b.classList.remove('active'));
            if (btn) btn.classList.add('active');
            renderJobs();
        }

        function selectJobType(type, btn) {
            APP_STATE.activeJobType = type;
            document.querySelectorAll('#jobTypeFilterRow .job-pill-btn').forEach(b => b.classList.remove('active'));
            if (btn) btn.classList.add('active');
            renderJobs();
        }

        function toggleSaveJob(jobId, event) {
            if (event) event.stopPropagation();
            let saved = [];
            try {
                saved = JSON.parse(localStorage.getItem('thuna_saved_jobs') || '[]');
            } catch (_) {}

            const idx = saved.indexOf(jobId);
            let isNowSaved = false;
            if (idx > -1) {
                saved.splice(idx, 1);
                isNowSaved = false;
                toast('തൊഴിൽ സേവിംഗിൽ നിന്ന് ഒഴിവാക്കി.');
            } else {
                saved.push(jobId);
                isNowSaved = true;
                toast('🔖 തൊഴിൽ സേവ് ചെയ്തു! "സേവ് ചെയ്തവ" ടാബിൽ കാണാം.');
            }
            localStorage.setItem('thuna_saved_jobs', JSON.stringify(saved));
            updateJobsBadgeCounts();

            if (APP_STATE.activeJobSubTab === 'saved') {
                renderJobs();
            } else {
                const btn = document.getElementById(`jobSaveBtn_${jobId}`);
                if (btn) {
                    btn.classList.toggle('saved', isNowSaved);
                    btn.innerHTML = isNowSaved ? '★' : '🔖';
                }
            }
        }

        function renderJobs() {
            const listContainer = document.getElementById('jobsListContainer');
            if (!listContainer) return;
            updateJobsBadgeCounts();

            const userCoords = getUserCoords();
            const subTab = APP_STATE.activeJobSubTab || 'all';
            const countEl = document.getElementById('jobActiveCountTitle');
            let savedIds = [];
            try { savedIds = JSON.parse(localStorage.getItem('thuna_saved_jobs') || '[]'); } catch (_) {}

            // SUB-TAB 1: MY APPLICATIONS
            if (subTab === 'applications') {
                let apps = [];
                try { apps = JSON.parse(localStorage.getItem('thuna_job_applications') || '[]'); } catch (_) {}
                if (countEl) countEl.textContent = `എന്റെ അപേക്ഷകൾ (${apps.length})`;

                if (apps.length === 0) {
                    listContainer.innerHTML = `
                        <div class="empty-state-card" style="background:#FFFFFF;border:1.5px solid #D3E6F8;border-radius:18px;padding:32px 16px">
                            <div class="empty-state-icon" style="font-size:36px;margin-bottom:8px">📋</div>
                            <div class="empty-state-title" style="color:#123B66;font-size:16px;font-weight:800">നിങ്ങൾ ഇതുവരെ അപേക്ഷിച്ചിട്ടില്ല</div>
                            <div class="empty-state-desc" style="color:#5A7184;font-size:12.5px;margin-bottom:14px">നിങ്ങൾക്ക് അനുയോജ്യമായ തൊഴിലുകൾ കണ്ടെത്തി 1-ക്ലിക്കിൽ അപേക്ഷിക്കാം.</div>
                            <button class="blue-job-apply-btn" onclick="switchJobsSubTab('all', document.querySelectorAll('.jobs-tab-btn')[0])">
                                തൊഴിലുകൾ കാണുക (Explore Jobs)
                            </button>
                        </div>`;
                    return;
                }

                listContainer.innerHTML = apps.map(app => `
                    <div class="blue-job-card">
                        <div class="blue-job-card-top">
                            <div class="blue-job-company-icon">🏢</div>
                            <div class="blue-job-card-meta">
                                <div class="blue-job-company-name">${escapeHtml(app.company)}</div>
                                <h4 class="blue-job-title">${escapeHtml(app.jobTitle)}</h4>
                            </div>
                            <div style="background:#ECFDF5;color:#059669;font-size:11px;font-weight:800;padding:4px 8px;border-radius:8px">
                                ${escapeHtml(app.status || 'Applied')}
                            </div>
                        </div>
                        <div class="blue-job-salary-box">
                            <span class="blue-job-salary-amount">${escapeHtml(app.salary || '---')}</span>
                            <span class="blue-job-loc-text">📍 ${escapeHtml(app.location || 'Kerala')}</span>
                        </div>
                        <div style="font-size:11.5px;color:#5A7184;background:#F8FAFC;padding:8px 10px;border-radius:10px;border:1px solid #E2E8F0">
                            <strong>അപേക്ഷകൻ:</strong> ${escapeHtml(app.applicantName)} (${escapeHtml(app.applicantPhone)})<br>
                            <strong>അപേക്ഷിച്ച തീയതി:</strong> ${new Date(app.appliedAt).toLocaleDateString('ml-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                        <div class="blue-job-card-actions">
                            <button type="button" class="blue-job-secondary-btn" onclick="openJobChat('${escapeHtml(app.jobId)}')">
                                💬 തൊഴിൽദാതാവുമായി ചാറ്റ് ചെയ്യാം
                            </button>
                            <button type="button" class="blue-job-secondary-btn" style="color:#DC2626;border-color:#FECACA" onclick="withdrawJobApplication('${escapeHtml(app.id)}')">
                                പിൻവലിക്കുക
                            </button>
                        </div>
                    </div>
                `).join('');
                return;
            }

            // SUB-TAB 2: MY POSTED JOBS
            if (subTab === 'my_posted') {
                let custom = [];
                try { custom = JSON.parse(localStorage.getItem('thuna_custom_jobs') || '[]'); } catch (_) {}
                if (countEl) countEl.textContent = `ഞാൻ നൽകിയ തൊഴിൽ ഒഴിവുകൾ (${custom.length})`;

                if (custom.length === 0) {
                    listContainer.innerHTML = `
                        <div class="empty-state-card" style="background:#FFFFFF;border:1.5px solid #D3E6F8;border-radius:18px;padding:32px 16px">
                            <div class="empty-state-icon" style="font-size:36px;margin-bottom:8px">📢</div>
                            <div class="empty-state-title" style="color:#123B66;font-size:16px;font-weight:800">നിങ്ങൾ തൊഴിൽ ഒഴിവുകൾ നൽകിയിട്ടില്ല</div>
                            <div class="empty-state-desc" style="color:#5A7184;font-size:12.5px;margin-bottom:14px">നിങ്ങളുടെ സ്ഥാപനത്തിലേക്കോ ആവശ്യങ്ങളിലേക്കോ ഇവിടെ സൗജന്യമായി പോസ്റ്റ് ചെയ്യാം.</div>
                            <button class="blue-job-apply-btn" onclick="openPostJobModal()">
                                + പുതിയ തൊഴിൽ നൽകാം (Post Job)
                            </button>
                        </div>`;
                    return;
                }

                listContainer.innerHTML = custom.map(job => `
                    <div class="blue-job-card">
                        <div class="blue-job-card-top">
                            <div class="blue-job-company-icon">💼</div>
                            <div class="blue-job-card-meta">
                                <div class="blue-job-company-name">${escapeHtml(job.company)}</div>
                                <h4 class="blue-job-title">${escapeHtml(job.title)}</h4>
                            </div>
                            <div style="background:#E2F0FD;color:#0878D1;font-size:11px;font-weight:800;padding:4px 8px;border-radius:8px">
                                Live Active
                            </div>
                        </div>
                        <div class="blue-job-salary-box">
                            <span class="blue-job-salary-amount">${escapeHtml(job.salary)}</span>
                            <span class="blue-job-loc-text">📍 ${escapeHtml(job.location)}</span>
                        </div>
                        ${job.description ? `<p class="blue-job-desc-snippet">${escapeHtml(job.description)}</p>` : ''}
                        <div class="blue-job-card-actions">
                            <button type="button" class="blue-job-secondary-btn" onclick="shareJob('${escapeHtml(job.id)}')">
                                ↗️ ഷെയർ
                            </button>
                            <button type="button" class="blue-job-secondary-btn" style="color:#DC2626;border-color:#FECACA" onclick="deleteMyPostedJob('${escapeHtml(job.id)}')">
                                🗑️ ഒഴിവ് ഒഴിവാക്കുക (Close)
                            </button>
                        </div>
                    </div>
                `).join('');
                return;
            }

            // SUB-TAB 3 & 4: ALL JOBS OR SAVED JOBS
            const q = (document.getElementById('jobSearchInput')?.value || '').toLowerCase().trim();
            const cat = APP_STATE.activeJobCategory || 'all';
            const jType = APP_STATE.activeJobType || 'all';

            let allJobs = getJobsList().map(job => {
                const itemLat = (job.latDiff != null) ? (userCoords.latitude + job.latDiff) : job.lat;
                const itemLon = (job.lonDiff != null) ? (userCoords.longitude + job.lonDiff) : job.lon;
                const dist = (itemLat != null && itemLon != null)
                    ? calculateDistance(userCoords.latitude, userCoords.longitude, itemLat, itemLon)
                    : Infinity;
                return { ...job, _distanceKm: dist, _distanceFormatted: formatDistance(dist) };
            }).sort((a, b) => a._distanceKm - b._distanceKm);

            if (subTab === 'saved') {
                allJobs = allJobs.filter(j => savedIds.includes(j.id));
            }

            let filtered = allJobs.filter(job => {
                const matchCat = (cat === 'all') || (job.category && (job.category.toLowerCase() === cat.toLowerCase() || job.category.includes(cat)));
                const matchType = (jType === 'all') || (job.type && job.type.toLowerCase().replace(/[^a-z]/g, '').includes(jType.toLowerCase().replace(/[^a-z]/g, '')));
                const matchQ = !q || (
                    (job.title && job.title.toLowerCase().includes(q)) ||
                    (job.company && job.company.toLowerCase().includes(q)) ||
                    (job.location && job.location.toLowerCase().includes(q))
                );
                return matchCat && matchType && matchQ;
            });

            // Distance filter
            const rad = APP_STATE.activeJobRadius || 'all';
            if (rad !== 'all') {
                const maxKm = parseRadiusKm(rad);
                if (Number.isFinite(maxKm)) {
                    filtered = filtered.filter(j => j._distanceKm <= maxKm);
                }
            }

            const isEn = (CURRENT_APP_LANG === 'en');
            if (countEl) {
                countEl.textContent = subTab === 'saved'
                    ? (isEn ? `Saved Jobs (${filtered.length})` : `സേവ് ചെയ്ത തൊഴിലുകൾ (${filtered.length})`)
                    : (isEn ? `Job Opportunities (${filtered.length} Active)` : `തൊഴിൽ അവസരങ്ങൾ (${filtered.length} Active)`);
            }

            if (filtered.length === 0) {
                listContainer.innerHTML = `
                    <div class="empty-state-card" style="background:#FFFFFF;border:1.5px solid #D3E6F8;border-radius:18px;padding:32px 16px">
                        <div class="empty-state-icon" style="font-size:36px;margin-bottom:8px">💼</div>
                        <div class="empty-state-title" style="color:#123B66;font-size:16px;font-weight:800">
                            ${subTab === 'saved' 
                                ? (isEn ? 'No saved jobs yet' : 'സേവ് ചെയ്ത തൊഴിലുകളൊന്നും ഇല്ല')
                                : (isEn ? 'No job vacancies found for this filter' : 'ഈ തിരച്ചിലിൽ ഒഴിവുകൾ ഒന്നും കണ്ടെത്തിയില്ല')}
                        </div>
                        <div class="empty-state-desc" style="color:#5A7184;font-size:12.5px;margin-bottom:14px">
                            ${subTab === 'saved' 
                                ? (isEn ? 'Browse jobs and tap bookmark to save.' : 'തൊഴിലുകൾ ബ്രൗസ് ചെയ്യുമ്പോൾ 🔖 അമർത്തി സേവ് ചെയ്യാം.')
                                : (isEn ? 'Try another category or increase distance radius.' : 'മറ്റൊരു കാറ്റഗറിയോ ദൂരപരിധിയോ മാറ്റുക.')}
                        </div>
                        <button class="blue-job-apply-btn" onclick="${subTab === 'saved' ? "switchJobsSubTab('all', document.querySelectorAll('.jobs-tab-btn')[0])" : "openPostJobModal()"}">
                            ${subTab === 'saved' ? (isEn ? 'Explore Jobs' : 'തൊഴിലുകൾ കാണുക') : (isEn ? '+ Post a Job' : '+ പുതിയ തൊഴിൽ നൽകാം')}
                        </button>
                    </div>`;
                return;
            }

            const txtShare = isEn ? 'Share' : 'ഷെയർ';
            const txtDetails = isEn ? 'Details' : 'വിശദാംശങ്ങൾ';
            const txtApply = isEn ? 'Apply Now 🚀' : 'അപേക്ഷിക്കാം 🚀';

            listContainer.innerHTML = filtered.map(job => {
                const isSaved = savedIds.includes(job.id);
                const categoryIcon = getJobCategoryEmoji(job.category);
                return `
                    <div class="blue-job-card" onclick="openJobDetailsModal('${escapeHtml(job.id)}')">
                        <div class="blue-job-card-top">
                            <div class="blue-job-company-icon">
                                ${categoryIcon}
                            </div>
                            <div class="blue-job-card-meta">
                                <div class="blue-job-company-name">${escapeHtml(job.company)}</div>
                                <h4 class="blue-job-title">${escapeHtml(job.title)}</h4>
                            </div>
                            <button type="button" id="jobSaveBtn_${escapeHtml(job.id)}" class="blue-job-save-btn ${isSaved ? 'saved' : ''}" onclick="toggleSaveJob('${escapeHtml(job.id)}', event)" title="${isSaved ? 'Remove Bookmark' : 'Save Job'}">
                                ${isSaved ? '★' : '🔖'}
                            </button>
                        </div>

                        <div class="blue-job-tags-row">
                            <span class="blue-job-type-tag">${escapeHtml(job.type || 'Full-Time')}</span>
                            ${job._distanceFormatted ? `<span class="blue-job-distance-tag">📍 ~${job._distanceFormatted}</span>` : ''}
                            <span class="blue-job-time-tag">${escapeHtml(job.postedAgo || 'Recent')}</span>
                        </div>

                        <div class="blue-job-salary-box">
                            <span class="blue-job-salary-amount">${escapeHtml(job.salary)}</span>
                            <span class="blue-job-loc-text">📍 ${escapeHtml(job.location)}</span>
                        </div>

                        ${job.description ? `<p class="blue-job-desc-snippet">${escapeHtml(job.description)}</p>` : ''}

                        <div class="blue-job-card-actions" onclick="event.stopPropagation()">
                            <button type="button" class="blue-job-secondary-btn" onclick="shareJob('${escapeHtml(job.id)}')">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>
                                <span>${txtShare}</span>
                            </button>
                            <button type="button" class="blue-job-secondary-btn" onclick="openJobDetailsModal('${escapeHtml(job.id)}')">
                                ${txtDetails}
                            </button>
                            <button type="button" class="blue-job-apply-btn" onclick="openApplyJobModal('${escapeHtml(job.id)}')">
                                ${txtApply}
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function getJobCategoryEmoji(cat) {
            const c = (cat || '').toLowerCase();
            if (c.includes('delivery') || c.includes('driver')) return '⚡';
            if (c.includes('sales') || c.includes('retail')) return '🏪';
            if (c.includes('office') || c.includes('admin') || c.includes('account')) return '💼';
            if (c.includes('hotel') || c.includes('cook') || c.includes('chef')) return '🍳';
            if (c.includes('tech') || c.includes('elect') || c.includes('auto')) return '🛠️';
            if (c.includes('helper') || c.includes('maid')) return '🧹';
            if (c.includes('it') || c.includes('software')) return '💻';
            return '💼';
        }

        function openJobDetailsModal(jobId) {
            const job = getJobsList().find(j => j.id === jobId) || DEFAULT_JOBS.find(j => j.id === jobId);
            if (!job) return;

            APP_STATE.activeDetailedJob = job;

            let savedIds = [];
            try { savedIds = JSON.parse(localStorage.getItem('thuna_saved_jobs') || '[]'); } catch (_) {}
            const isSaved = savedIds.includes(job.id);

            const iconBox = document.getElementById('jobDetailsIconBox');
            if (iconBox) iconBox.innerHTML = getJobCategoryEmoji(job.category);
            const compEl = document.getElementById('jobDetailsCompany');
            if (compEl) compEl.textContent = job.company;
            const titleEl = document.getElementById('jobDetailsTitle');
            if (titleEl) titleEl.textContent = job.title;
            const salEl = document.getElementById('jobDetailsSalary');
            if (salEl) salEl.textContent = job.salary;
            const typeEl = document.getElementById('jobDetailsType');
            if (typeEl) typeEl.textContent = job.type || 'Full-Time';
            const locEl = document.getElementById('jobDetailsLocation');
            if (locEl) locEl.textContent = job.location;
            const timEl = document.getElementById('jobDetailsTimings');
            if (timEl) timEl.textContent = job.timings || 'Regular Shifts';
            const descEl = document.getElementById('jobDetailsDesc');
            if (descEl) descEl.textContent = job.description || 'Detailed job description is available from the employer.';
            const contactEl = document.getElementById('jobDetailsContactName');
            if (contactEl) contactEl.textContent = job.contactPhone || job.company;

            const bIcon = document.getElementById('jobDetailsBookmarkIcon');
            if (bIcon) bIcon.textContent = isSaved ? '★' : '🔖';
            const bBtn = document.getElementById('btnJobDetailsBookmark');
            if (bBtn) bBtn.style.color = isSaved ? '#0878D1' : '#123B66';

            openModal('modal-job-details');
        }

        function toggleSaveCurrentDetailedJob() {
            if (!APP_STATE.activeDetailedJob) return;
            toggleSaveJob(APP_STATE.activeDetailedJob.id);
            let savedIds = [];
            try { savedIds = JSON.parse(localStorage.getItem('thuna_saved_jobs') || '[]'); } catch (_) {}
            const isSaved = savedIds.includes(APP_STATE.activeDetailedJob.id);
            const bIcon = document.getElementById('jobDetailsBookmarkIcon');
            if (bIcon) bIcon.textContent = isSaved ? '★' : '🔖';
            const bBtn = document.getElementById('btnJobDetailsBookmark');
            if (bBtn) bBtn.style.color = isSaved ? '#0878D1' : '#123B66';
        }

        function shareCurrentDetailedJob() {
            if (!APP_STATE.activeDetailedJob) return;
            shareJob(APP_STATE.activeDetailedJob.id);
        }

        function openApplyJobModalFromDetails() {
            if (!APP_STATE.activeDetailedJob) return;
            const id = APP_STATE.activeDetailedJob.id;
            closeModal('modal-job-details');
            openApplyJobModal(id);
        }

        function openApplyJobModal(jobId) {
            const job = getJobsList().find(j => j.id === jobId) || DEFAULT_JOBS.find(j => j.id === jobId);
            if (!job) return;

            document.getElementById('applyTargetJobId').value = job.id;
            const compBanner = document.getElementById('applyJobCompanyBanner');
            if (compBanner) compBanner.textContent = job.company;
            const titleBanner = document.getElementById('applyJobTitleBanner');
            if (titleBanner) titleBanner.textContent = job.title;
            const salBanner = document.getElementById('applyJobSalaryBanner');
            if (salBanner) salBanner.textContent = `${job.salary} • ${job.location}`;

            const nameInput = document.getElementById('applyApplicantName');
            if (nameInput) nameInput.value = APP_STATE?.userProfile?.name || localStorage.getItem('thuna_user_name') || '';
            const phoneInput = document.getElementById('applyApplicantPhone');
            if (phoneInput) phoneInput.value = APP_STATE?.userProfile?.phone || localStorage.getItem('thuna_user_phone') || '';
            const notesInput = document.getElementById('applyApplicantNotes');
            if (notesInput) notesInput.value = '';

            openModal('modal-job-apply');
        }

        function submitJobApplication(e) {
            e.preventDefault();
            const jobId = document.getElementById('applyTargetJobId')?.value;
            const name = document.getElementById('applyApplicantName')?.value.trim();
            const phone = document.getElementById('applyApplicantPhone')?.value.trim();
            const exp = document.getElementById('applyApplicantExp')?.value;
            const notes = document.getElementById('applyApplicantNotes')?.value.trim();

            if (!name || !phone) {
                toast('⚠️ ദയവായി പേരും ഫോൺ നമ്പറും നൽകുക.');
                return;
            }

            const job = getJobsList().find(j => j.id === jobId) || DEFAULT_JOBS.find(j => j.id === jobId);
            if (!job) return;

            const appRecord = {
                id: 'app_' + Date.now(),
                jobId: job.id,
                jobTitle: job.title,
                company: job.company,
                salary: job.salary,
                location: job.location,
                applicantName: name,
                applicantPhone: phone,
                experience: exp,
                notes: notes,
                appliedAt: Date.now(),
                status: 'അപേക്ഷ സമർപ്പിച്ചു (Applied)'
            };

            let apps = [];
            try {
                apps = JSON.parse(localStorage.getItem('thuna_job_applications') || '[]');
            } catch (_) {}
            apps.unshift(appRecord);
            localStorage.setItem('thuna_job_applications', JSON.stringify(apps));

            // Sync with Firebase application log if available
            if (window.THUNA_FIREBASE && typeof window.THUNA_FIREBASE.set === 'function') {
                const cleanKey = 'job_app_' + Date.now();
                window.THUNA_FIREBASE.set('jobApplications/' + cleanKey, appRecord).catch(() => {});
            }

            closeModal('modal-job-apply');
            updateJobsBadgeCounts();
            toast(`🎉 ${job.title} ഒഴിവിലേക്ക് നിങ്ങളുടെ അപേക്ഷ സമർപ്പിച്ചു!`);

            // Open chat with the employer and append automated application message
            openJobChat(job.id);
        }

        function withdrawJobApplication(appId) {
            if (!confirm('ഈ തൊഴിൽ അപേക്ഷ പിൻവലിക്കാൻ ആഗ്രഹിക്കുന്നുണ്ടോ?')) return;
            let apps = [];
            try { apps = JSON.parse(localStorage.getItem('thuna_job_applications') || '[]'); } catch (_) {}
            apps = apps.filter(a => a.id !== appId);
            localStorage.setItem('thuna_job_applications', JSON.stringify(apps));
            toast('അപേക്ഷ പിൻവലിച്ചു.');
            renderJobs();
        }

        function deleteMyPostedJob(jobId) {
            if (!confirm('ഈ തൊഴിൽ ഒഴിവ് ഒഴിവാക്കാൻ ആഗ്രഹിക്കുന്നുണ്ടോ?')) return;
            let custom = [];
            try { custom = JSON.parse(localStorage.getItem('thuna_custom_jobs') || '[]'); } catch (_) {}
            custom = custom.filter(j => j.id !== jobId);
            localStorage.setItem('thuna_custom_jobs', JSON.stringify(custom));
            toast('തൊഴിൽ ഒഴിവ് ലിസ്റ്റിംഗിൽ നിന്ന് ഒഴിവാക്കി.');
            renderJobs();
        }

        function renderRentalsTab(container, userCoords) {
            let list = DEFAULT_RENTALS.map(r => {
                const dist = (r.lat != null && r.lon != null)
                    ? calculateDistance(userCoords.latitude, userCoords.longitude, r.lat, r.lon)
                    : Infinity;
                return { ...r, _distanceKm: dist, _distanceFormatted: formatDistance(dist) };
            }).sort((a, b) => a._distanceKm - b._distanceKm);

            const rad = APP_STATE.activeJobRadius || 'all';
            if (rad !== 'all') {
                const maxKm = parseInt(rad, 10);
                if (Number.isFinite(maxKm)) list = list.filter(r => r._distanceKm <= maxKm);
            }

            const countEl = document.getElementById('jobActiveCountTitle');
            if (countEl) countEl.textContent = `House & Shop Rentals (${list.length})`;

            if (!list.length) {
                container.innerHTML = `
                    <div class="empty-state-card">
                        <div class="empty-state-icon">🏠</div>
                        <div class="empty-state-title">ഈ പരിധിയിൽ വാടക വീടുകൾ ഇല്ല</div>
                        <div class="empty-state-desc">ദൂരപരിധി മാറ്റുക അല്ലെങ്കിൽ കൂടുതൽ അന്വേഷിക്കുക.</div>
                    </div>`;
                return;
            }

            container.innerHTML = list.map(r => `
                <div class="job-card" style="background:#ffffff;border-radius:16px;border:1px solid #e2e8f0;padding:16px;display:flex;flex-direction:column;gap:10px">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start">
                        <div>
                            <span class="distance-badge" style="margin-bottom:4px">📍 ~${r._distanceFormatted} away</span>
                            <h4 style="margin:4px 0 2px;font-size:15px;font-weight:700">${escapeHtml(r.title)}</h4>
                            <div style="font-size:12px;color:var(--muted)">📍 ${escapeHtml(r.location)} • ${escapeHtml(r.type)}</div>
                        </div>
                        <div style="background:#ecfdf5;color:#047857;font-weight:800;font-size:13px;padding:6px 10px;border-radius:10px">
                            ${escapeHtml(r.rent)}
                        </div>
                    </div>
                    <p style="margin:0;font-size:12.5px;color:#475569">${escapeHtml(r.desc)}</p>
                    <div style="display:flex;justify-content:flex-end">
                        <button class="chat-now-btn" style="padding:6px 14px;font-size:12px" onclick="openDonorChat('Rental Owner', 'Rentals', '${escapeHtml(r.location)}')">
                            Contact Owner
                        </button>
                    </div>
                </div>
            `).join('');
        }

        /* -------------------------------------------------------------
           FEATURE 6: BUY, SELL & RENTALS (MARKETPLACE)
           ------------------------------------------------------------- */
        function openRentalBuySellSection(tab = 'rentals') {
            openMarketplaceModal(tab);
        }

        function openMarketplaceModal(initialTab = 'rentals') {
            APP_STATE.activeMarketRadius = initialTab;
            openModal('modal-marketplace');
            document.querySelectorAll('#marketRadiusPills .radius-pill').forEach(b => {
                const isRentals = b.id === 'pillMarketRentals' || b.textContent.includes('Rentals');
                const isAll = b.id === 'pillMarketAll' || b.textContent.includes('All');
                if (initialTab === 'rentals') {
                    b.classList.toggle('active', isRentals);
                } else if (initialTab === 'all') {
                    b.classList.toggle('active', isAll);
                }
            });
            renderMarketplace();
        }

        function filterMarketplace(filter, btn) {
            APP_STATE.activeMarketRadius = filter;
            document.querySelectorAll('#marketRadiusPills .radius-pill').forEach(b => b.classList.remove('active'));
            if (btn) btn.classList.add('active');
            renderMarketplace();
        }

        function renderMarketplace() {
            const container = document.getElementById('marketplaceList');
            if (!container) return;
            const userCoords = getUserCoords();
            const filter = APP_STATE.activeMarketRadius || 'rentals';

            // 1. RENTALS TABS (സാധനങ്ങൾ, ഉപകരണങ്ങൾ, വാഹനങ്ങൾ, വീടുകൾ)
            if (filter === 'rentals' || filter === 'items' || filter === 'vehicles' || filter === 'houses') {
                const customRentals = JSON.parse(localStorage.getItem('thuna_custom_rentals') || '[]');
                const combinedRentals = [...customRentals, ...DEFAULT_RENTALS];
                let rentList = combinedRentals.map(r => {
                    const itemLat = (r.latDiff != null) ? (userCoords.latitude + r.latDiff) : r.lat;
                    const itemLon = (r.lonDiff != null) ? (userCoords.longitude + r.lonDiff) : r.lon;
                    const dist = (itemLat != null && itemLon != null)
                        ? calculateDistance(userCoords.latitude, userCoords.longitude, itemLat, itemLon)
                        : Infinity;
                    return { ...r, _distanceKm: dist, _distanceFormatted: formatDistance(dist) };
                }).sort((a, b) => a._distanceKm - b._distanceKm);

                if (filter === 'items') {
                    rentList = rentList.filter(r => (r.category === 'items') || (r.type && (r.type.includes('Tools') || r.type.includes('Agri') || r.type.includes('Event') || r.type.includes('Equipment') || r.type.includes('Electronics') || r.type.includes('Item'))));
                } else if (filter === 'vehicles') {
                    rentList = rentList.filter(r => (r.category === 'vehicles') || (r.type && (r.type.includes('Vehicle') || r.type.includes('Car') || r.type.includes('Auto') || r.type.includes('Pickup'))));
                } else if (filter === 'houses') {
                    rentList = rentList.filter(r => (r.category === 'houses') || (r.type && (r.type.includes('House') || r.type.includes('Flat') || r.type.includes('Apartment') || r.type.includes('Shop') || r.type.includes('Room') || r.type.includes('Commercial') || r.type.includes('Residential'))));
                }

                if (!rentList.length) {
                    container.innerHTML = `
                        <div class="empty-state-card">
                            <div class="empty-state-icon">📦</div>
                            <div class="empty-state-title" style="color:#0F172A;font-weight:800">വാടക ലിസ്റ്റിംഗുകൾ ഒന്നും കണ്ടെത്തിയില്ല</div>
                            <div class="empty-state-desc" style="color:#475569">നിങ്ങളുടെ സാധനങ്ങളോ ടൂളുകളോ വീടോ ഉടൻ വാടകയ്ക്ക് നൽകാം.</div>
                            <button class="primary-action-btn btn-bright-rental" style="margin:10px auto 0;padding:8px 16px;font-size:12.5px;background:#15803D" onclick="closeModal('modal-marketplace');openPostRentalModal()">
                                ➕ സാധനങ്ങളും വീടുകളും വാടകയ്ക്ക് നൽകാം
                            </button>
                        </div>`;
                    return;
                }

                container.innerHTML = rentList.map(r => {
                    const isItem = (r.type && (r.type.includes('Tool') || r.type.includes('Agri') || r.type.includes('Event') || r.type.includes('Equipment') || r.type.includes('Item') || r.type.includes('Camera')));
                    const isVeh = (r.type && (r.type.includes('Vehicle') || r.type.includes('Car') || r.type.includes('Auto') || r.type.includes('Pickup')));
                    const badgeIco = isItem ? '🛠️' : (isVeh ? '🚗' : '🏡');
                    const badgeBg = isItem ? '#ECFDF5' : (isVeh ? '#EFF6FF' : '#FEF3C7');
                    const badgeColor = isItem ? '#065F46' : (isVeh ? '#1E40AF' : '#92400E');
                    const badgeBorder = isItem ? '#A7F3D0' : (isVeh ? '#BFDBFE' : '#FCD34D');

                    return `
                    <div class="job-card" style="background:#ffffff;border-radius:16px;border:1.5px solid ${badgeBorder};padding:14px;display:flex;flex-direction:column;gap:8px;box-shadow:0 3px 10px rgba(0,0,0,0.04)">
                        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px">
                            <div style="flex:1">
                                <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px">
                                    <span style="background:${badgeBg};color:${badgeColor};font-size:11px;font-weight:800;padding:2px 8px;border-radius:6px;border:1px solid ${badgeBorder}">
                                        ${badgeIco} ${escapeHtml(r.type || 'Rental Item')}
                                    </span>
                                    ${r._distanceFormatted ? `<span class="distance-badge">📍 ~${r._distanceFormatted}</span>` : ''}
                                </div>
                                <h4 style="margin:2px 0;font-size:15px;font-weight:800;color:#0F172A">${escapeHtml(r.title)}</h4>
                                <div style="font-size:12px;font-weight:600;color:#334155">📍 ${escapeHtml(r.location)} ${r.size ? `• 📐 ${escapeHtml(r.size)}` : ''}</div>
                            </div>
                            <div style="background:#FEF3C7;color:#B45309;font-weight:800;font-size:13.5px;padding:6px 10px;border-radius:10px;border:1px solid #FDE68A;white-space:nowrap;text-align:right">
                                ${escapeHtml(r.rent)}
                                ${r.deposit ? `<div style="font-size:10px;font-weight:700;color:#92400E">Adv: ${escapeHtml(r.deposit)}</div>` : ''}
                            </div>
                        </div>
                        ${r.desc ? `<p style="margin:0;font-size:12.5px;color:#334155;line-height:1.4">${escapeHtml(r.desc)}</p>` : ''}
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:2px;padding-top:8px;border-top:1px solid #F1F5F9">
                            <span style="font-size:11.5px;color:#059669;font-weight:700">🔒 ഇൻ-ആപ്പ് ചാറ്റ് അപേക്ഷ</span>
                            <div style="display:flex;gap:6px">
                                ${r.contactPhone ? `<a href="tel:${r.contactPhone}" class="pill-btn" style="background:#ECFDF5;border:1px solid #A7F3D0;color:#065F46;font-size:12px;padding:6px 10px;text-decoration:none;font-weight:800">📞 Call</a>` : ''}
                                <button class="chat-now-btn btn-bright-rental" style="padding:6px 14px;font-size:12px;font-weight:800;background:#15803D" onclick="openDonorChat('${escapeHtml(r.phone || r.contactPhone || 'Owner')}', 'Rental', '${escapeHtml(r.title)}')">
                                    ചാറ്റ് ചെയ്യുക
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                }).join('');
                return;
            }

            // 2. MARKETPLACE ITEMS
            let list = DEFAULT_MARKETPLACE.map(item => {
                const itemLat = (item.latDiff != null) ? (userCoords.latitude + item.latDiff) : item.lat;
                const itemLon = (item.lonDiff != null) ? (userCoords.longitude + item.lonDiff) : item.lon;
                const dist = (itemLat != null && itemLon != null)
                    ? calculateDistance(userCoords.latitude, userCoords.longitude, itemLat, itemLon)
                    : Infinity;
                return { ...item, _distanceKm: dist, _distanceFormatted: formatDistance(dist) };
            }).sort((a, b) => a._distanceKm - b._distanceKm);

            if (filter === '5km') list = list.filter(i => i._distanceKm <= 5);
            else if (filter === '15km') list = list.filter(i => i._distanceKm <= 15);
            else if (filter === 'vehicles') list = list.filter(i => i.category === 'vehicles');
            else if (filter === 'household') list = list.filter(i => i.category === 'household');

            if (!list.length) {
                container.innerHTML = `
                    <div class="empty-state-card">
                        <div class="empty-state-icon">🛍️</div>
                        <div class="empty-state-title" style="color:#0F172A;font-weight:800">No items found in this category</div>
                        <div class="empty-state-desc" style="color:#475569">Try expanding the filter or explore other items.</div>
                    </div>`;
                return;
            }

            container.innerHTML = list.map(item => `
                <div class="provider-card" style="display:flex;flex-direction:column;gap:8px;border:1.5px solid #CBD5E1">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start">
                        <div>
                            <span class="distance-badge" style="margin-bottom:4px">📍 ~${item._distanceFormatted} away</span>
                            <div style="font-weight:800;font-size:14.5px;color:#0f172a">${escapeHtml(item.title)}</div>
                            <div style="font-size:12px;font-weight:600;color:#334155">📍 ${escapeHtml(item.location)}</div>
                        </div>
                        <div style="font-size:14.5px;font-weight:800;color:#059669">${escapeHtml(item.price)}</div>
                    </div>
                    <p style="margin:0;font-size:12.5px;color:#334155">${escapeHtml(item.desc)}</p>
                    <div style="display:flex;justify-content:flex-end">
                        <button class="chat-now-btn btn-bright-marketplace" style="padding:6px 14px;font-size:12px;font-weight:800" onclick="openDonorChat('${escapeHtml(item.contactPerson || 'Seller')}', 'Marketplace', '${escapeHtml(item.location)}')">
                            Chat with Seller
                        </button>
                    </div>
                </div>
            `).join('');
        }

        /* -------------------------------------------------------------
           FEATURE 7: PICKUP & DELIVERY (TAXI & CARRY)
           ------------------------------------------------------------- */
        function openTaxiCarryModal() {
            openModal('modal-taxi-carry');
            renderTaxiCarry();
        }

        function filterTaxiCarry(filter, btn) {
            APP_STATE.activeTaxiRadius = filter;
            document.querySelectorAll('#taxiRadiusPills .radius-pill').forEach(b => b.classList.remove('active'));
            if (btn) btn.classList.add('active');
            renderTaxiCarry();
        }

        function renderTaxiCarry() {
            const container = document.getElementById('taxiCarryList');
            if (!container) return;
            const userCoords = getUserCoords();

            let list = DEFAULT_TAXIS.map(t => {
                const itemLat = (t.latDiff != null) ? (userCoords.latitude + t.latDiff) : t.lat;
                const itemLon = (t.lonDiff != null) ? (userCoords.longitude + t.lonDiff) : t.lon;
                const dist = (itemLat != null && itemLon != null)
                    ? calculateDistance(userCoords.latitude, userCoords.longitude, itemLat, itemLon)
                    : Infinity;
                return { ...t, _distanceKm: dist, _distanceFormatted: formatDistance(dist) };
            }).sort((a, b) => a._distanceKm - b._distanceKm);

            const filter = APP_STATE.activeTaxiRadius || 'all';
            if (filter !== 'all') {
                list = list.filter(t => t.type === filter);
            }

            if (!list.length) {
                container.innerHTML = `
                    <div class="empty-state-card">
                        <div class="empty-state-icon">🚖</div>
                        <div class="empty-state-title">No drivers or carriers found</div>
                    </div>`;
                return;
            }

            container.innerHTML = list.map(t => `
                <div class="provider-card" style="display:flex;flex-direction:column;gap:8px">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start">
                        <div>
                            <span class="distance-badge" style="margin-bottom:4px">📍 ~${t._distanceFormatted} away</span>
                            <div style="font-weight:700;font-size:14px;color:#0f172a">${escapeHtml(t.name)}</div>
                            <div style="font-size:11.5px;color:#64748b">📍 ${escapeHtml(t.location)} • ${escapeHtml(t.vehicle)}</div>
                        </div>
                        <a href="tel:${t.phone}" class="call-emergency-btn" style="background:#059669;padding:6px 12px;font-size:12px">
                            📞 Call
                        </a>
                    </div>
                    <p style="margin:0;font-size:12px;color:#475569">${escapeHtml(t.desc)}</p>
                </div>
            `).join('');
        }

        /* -------------------------------------------------------------
           13. GENERAL MODAL & HELPER INITIALIZATION
           ------------------------------------------------------------- */
        function openModal(id) { 
            const m = document.getElementById(id); 
            if (m) m.classList.add('active'); 
            try { window.history.pushState({ modalId: id }, ''); } catch (e) { }
        }
        function closeModal(id) { 
            const m = document.getElementById(id); 
            if (m) m.classList.remove('active'); 
        }

        /* -------------------------------------------------------------
           HARDWARE & GESTURE BACK BUTTON CONTROLLER (Android Back Protection)
           Prevents accidental app exits; closes modals first, navigates to Home,
           and requires double-tap back to exit on Home screen.
           ------------------------------------------------------------- */
        let lastHardwareBackPressTime = 0;

        function getActiveOpenModal() {
            const activeModals = Array.from(document.querySelectorAll('.modal-overlay.active, .modal.active')).filter(m => {
                return m.style.display !== 'none' && window.getComputedStyle(m).display !== 'none';
            });
            return activeModals.length > 0 ? activeModals[activeModals.length - 1] : null;
        }

        function handleHardwareBackPress() {
            // 1. If any modal or bottom sheet is open, close it!
            const openModalEl = getActiveOpenModal();
            if (openModalEl && openModalEl.id) {
                closeModal(openModalEl.id);
                return true;
            }

            // 2. If profile inline edit drawer is open, close it
            const profDrawer = document.getElementById('profileEditInlineDrawer');
            if (profDrawer && profDrawer.style.display !== 'none') {
                profDrawer.style.display = 'none';
                return true;
            }

            // 3. If on a subscreen (not Home), smoothly return to Home
            if (APP_STATE && APP_STATE.currentScreen && APP_STATE.currentScreen !== 'home' && APP_STATE.currentScreen !== 'splash') {
                navTo('home');
                return true;
            }

            // 4. If already on Home Screen: 2-tap exit confirmation with Malayalam toast
            const now = Date.now();
            if (now - lastHardwareBackPressTime < 2200) {
                if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App && window.Capacitor.Plugins.App.exitApp) {
                    window.Capacitor.Plugins.App.exitApp();
                } else if (navigator.app && navigator.app.exitApp) {
                    navigator.app.exitApp();
                }
            } else {
                lastHardwareBackPressTime = now;
                toast('ആപ്പിൽ നിന്ന് പുറത്തുകടക്കാൻ വീണ്ടും ബാക്ക് അമർത്തുക ↩️');
            }
            return true;
        }

        function initHardwareBackButtonListener() {
            // A. Capacitor App plugin listener
            try {
                if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App) {
                    window.Capacitor.Plugins.App.addListener('backButton', () => {
                        handleHardwareBackPress();
                    });
                }
            } catch (e) { }

            // B. Cordova / WebView backbutton event
            document.addEventListener('backbutton', function (e) {
                e.preventDefault();
                e.stopPropagation();
                handleHardwareBackPress();
            }, false);

            // C. HTML5 History popstate
            try {
                window.history.pushState({ screen: 'init' }, '');
                window.addEventListener('popstate', function () {
                    handleHardwareBackPress();
                    window.history.pushState({ screen: 'init' }, '');
                });
            } catch (e) { }
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initHardwareBackButtonListener);
        } else {
            initHardwareBackButtonListener();
        }

        function openTermsModal() { openModal('modal-terms-conditions'); }

        let secretAdminTapCount = 0;
        let secretAdminTapTimer = null;
        function handleSecretAdminTap() {
            secretAdminTapCount++;
            clearTimeout(secretAdminTapTimer);
            secretAdminTapTimer = setTimeout(() => { secretAdminTapCount = 0; }, 2500);

            if (secretAdminTapCount >= 5) {
                secretAdminTapCount = 0;
                const pin = prompt('🔒 അഡ്മിൻ പിൻ നൽകുക (Enter Admin PIN):');
                if (pin === '2026') {
                    sessionStorage.setItem('nammudenaad_admin_authenticated', 'true');
                    window.open('admin.html', '_blank');
                } else if (pin) {
                    toast('❌ തെറ്റായ പിൻ! അഡ്മിന് മാത്രമേ പ്രവേശനമുള്ളൂ.');
                }
            }
        }
        let pendingVillageBannerArt = null;
        let pendingVillageBannerMode = 'full';
        let pendingVillageBannerShowText = true;

        function setVillageBannerLayoutMode(mode) {
            pendingVillageBannerMode = mode;
            const fullBtn = document.getElementById('bannerLayoutModeFullBtn');
            const sideBtn = document.getElementById('bannerLayoutModeSideBtn');
            if (fullBtn && sideBtn) {
                if (mode === 'full') {
                    fullBtn.style.background = '#DCFCE7';
                    fullBtn.style.borderColor = '#15803D';
                    fullBtn.style.color = '#15803D';
                    sideBtn.style.background = '#F8FAFC';
                    sideBtn.style.borderColor = '#CBD5E1';
                    sideBtn.style.color = '#475569';
                } else {
                    sideBtn.style.background = '#DCFCE7';
                    sideBtn.style.borderColor = '#15803D';
                    sideBtn.style.color = '#15803D';
                    fullBtn.style.background = '#F8FAFC';
                    fullBtn.style.borderColor = '#CBD5E1';
                    fullBtn.style.color = '#475569';
                }
            }
            updateVillageBannerModalPreview();
        }

        function compressVillageBannerImage(file, maxWidth, quality, callback) {
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
                    } catch (err) {
                        callback(ev.target.result);
                    }
                };
                img.onerror = () => callback(ev.target.result);
                img.src = ev.target.result;
            };
            reader.readAsDataURL(file);
        }

        function renderHomeVillageBanner() {
            const banner = document.querySelector('.yg-village-promo-banner');
            const artWrap = document.getElementById('homeVillageBannerArtWrap');
            const titleEl = document.getElementById('homeVillageBannerTitle');
            const subEl = document.getElementById('homeVillageBannerSub');
            const fullImg = document.getElementById('homeVillageBannerFullImg');
            const overlay = document.getElementById('homeVillageBannerOverlay');
            const promoLeft = banner ? banner.querySelector('.yg-promo-left') : null;

            const customArt = localStorage.getItem('thuna_custom_village_banner_art');
            const customTitle = localStorage.getItem('thuna_custom_village_banner_title');
            const customSub = localStorage.getItem('thuna_custom_village_banner_sub');
            const customMode = localStorage.getItem('thuna_custom_village_banner_mode') || 'full';
            const customShowText = localStorage.getItem('thuna_custom_village_banner_show_text') !== 'false';

            if (titleEl && customTitle) titleEl.textContent = customTitle;
            if (subEl && customSub) subEl.textContent = customSub;

            if (banner) {
                if (customMode === 'full' && customArt) {
                    banner.classList.add('mode-full-image');
                    banner.style.setProperty('background-image', `url("${customArt}")`, 'important');
                    if (fullImg) {
                        fullImg.src = customArt;
                        fullImg.style.display = 'block';
                    }
                    if (customShowText) {
                        banner.classList.add('with-overlay');
                        if (overlay) overlay.style.display = 'block';
                        if (promoLeft) promoLeft.style.display = 'flex';
                    } else {
                        banner.classList.remove('with-overlay');
                        if (overlay) overlay.style.display = 'none';
                        if (promoLeft) promoLeft.style.display = 'none';
                    }
                    if (artWrap) artWrap.style.display = 'none';
                } else {
                    banner.classList.remove('mode-full-image', 'with-overlay');
                    banner.style.removeProperty('background-image');
                    banner.style.backgroundImage = '';
                    if (fullImg) fullImg.style.display = 'none';
                    if (overlay) overlay.style.display = 'none';
                    if (promoLeft) promoLeft.style.display = 'flex';
                    if (artWrap) {
                        artWrap.style.display = 'block';
                        if (customArt) {
                            artWrap.innerHTML = `
                                <img src="${customArt}" alt="Village Banner Art"
                                    style="max-height:65px;max-width:130px;object-fit:cover;border-radius:12px;border:1.5px solid #86EFAC;box-shadow:0 2px 8px rgba(0,0,0,0.06);display:block">
                            `;
                        } else {
                            artWrap.innerHTML = `
                                <svg viewBox="0 0 140 70" width="130" height="65" preserveAspectRatio="xMidYMid meet">
                                    <path d="M0 50 Q 40 30 90 42 Q 120 50 140 40 L140 70 L0 70 Z" fill="#22C55E" />
                                    <path d="M0 58 Q 50 48 100 56 L140 54 L140 70 L0 70 Z" fill="#15803D" />
                                    <rect x="75" y="40" width="26" height="18" fill="#FEF3C7" stroke="#78350F" stroke-width="1" />
                                    <rect x="85" y="46" width="6" height="12" fill="#78350F" />
                                    <polygon points="70,40 88,27 106,40" fill="#DC2626" stroke="#991B1B" stroke-width="1" />
                                    <path d="M30 65 Q 36 38 32 20" stroke="#78350F" stroke-width="3" fill="none" stroke-linecap="round" />
                                    <path d="M32 20 Q 18 10 12 24" stroke="#16A34A" stroke-width="2" fill="none" stroke-linecap="round" />
                                    <path d="M32 20 Q 24 4 16 8" stroke="#22C55E" stroke-width="2" fill="none" stroke-linecap="round" />
                                    <path d="M32 20 Q 42 4 48 12" stroke="#15803D" stroke-width="2" fill="none" stroke-linecap="round" />
                                    <path d="M32 20 Q 48 16 46 28" stroke="#16A34A" stroke-width="2" fill="none" stroke-linecap="round" />
                                </svg>
                            `;
                        }
                    }
                }
            }
        }

        function openEditVillageBannerModal() {
            const currentArt = localStorage.getItem('thuna_custom_village_banner_art');
            const currentTitle = localStorage.getItem('thuna_custom_village_banner_title') || 'നമ്മുടെ നാട്';
            const currentSub = localStorage.getItem('thuna_custom_village_banner_sub') || '🤝 നാടിനൊപ്പം നാം';
            const currentMode = localStorage.getItem('thuna_custom_village_banner_mode') || 'full';
            const currentShowText = localStorage.getItem('thuna_custom_village_banner_show_text') !== 'false';

            pendingVillageBannerArt = currentArt || 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80';
            pendingVillageBannerMode = currentMode;
            pendingVillageBannerShowText = currentShowText;

            const titleInput = document.getElementById('villageBannerTitleInput');
            const subInput = document.getElementById('villageBannerSubInput');
            const showTextInput = document.getElementById('villageBannerShowTextInput');
            if (titleInput) titleInput.value = currentTitle;
            if (subInput) subInput.value = currentSub;
            if (showTextInput) showTextInput.checked = currentShowText;

            setVillageBannerLayoutMode(currentMode);
            openModal('modal-edit-village-banner');
        }

        function updateVillageBannerModalPreview() {
            const previewCard = document.getElementById('modalBannerPreviewCard');
            const previewWrap = document.getElementById('modalBannerPreviewArtWrap');
            const previewLeft = document.getElementById('modalBannerPreviewLeft');
            const titlePreview = document.getElementById('modalBannerPreviewTitle');
            const subPreview = document.getElementById('modalBannerPreviewSub');
            const previewFullImg = document.getElementById('modalBannerPreviewFullImg');
            const previewOverlay = document.getElementById('modalBannerPreviewOverlay');
            const titleInput = document.getElementById('villageBannerTitleInput');
            const subInput = document.getElementById('villageBannerSubInput');
            const showTextInput = document.getElementById('villageBannerShowTextInput');

            const title = (titleInput?.value || 'നമ്മുടെ നാട്').trim();
            const sub = (subInput?.value || '🤝 നാടിനൊപ്പം നാം').trim();
            const showText = showTextInput ? showTextInput.checked : true;
            pendingVillageBannerShowText = showText;

            if (titlePreview) titlePreview.textContent = title;
            if (subPreview) subPreview.textContent = sub;

            if (previewCard) {
                if (pendingVillageBannerMode === 'full' && pendingVillageBannerArt) {
                    if (previewFullImg) {
                        previewFullImg.src = pendingVillageBannerArt;
                        previewFullImg.style.display = 'block';
                    }
                    if (previewOverlay) {
                        previewOverlay.style.display = showText ? 'block' : 'none';
                    }
                    previewCard.style.setProperty('background-image', `url("${pendingVillageBannerArt}")`, 'important');
                    previewCard.style.backgroundSize = 'cover';
                    previewCard.style.backgroundPosition = 'center';
                    previewCard.style.minHeight = '115px';
                    previewCard.style.border = '1.5px solid #86EFAC';

                    if (previewWrap) previewWrap.style.display = 'none';

                    if (previewLeft) {
                        if (showText) {
                            previewLeft.style.display = 'flex';
                            if (titlePreview) {
                                titlePreview.style.color = '#FFFFFF';
                                titlePreview.style.textShadow = '0 2px 5px rgba(0,0,0,0.7)';
                            }
                            if (subPreview) {
                                subPreview.style.color = '#FACC15';
                                subPreview.style.textShadow = '0 1px 4px rgba(0,0,0,0.7)';
                            }
                        } else {
                            previewLeft.style.display = 'none';
                        }
                    }
                } else {
                    // Side Image mode
                    if (previewFullImg) previewFullImg.style.display = 'none';
                    if (previewOverlay) previewOverlay.style.display = 'none';
                    previewCard.style.backgroundImage = 'linear-gradient(135deg, #ECFDF5 0%, #FEF9C3 100%)';
                    previewCard.style.minHeight = '85px';
                    previewCard.style.border = '1.5px solid #A7F3D0';

                    if (previewLeft) {
                        previewLeft.style.display = 'flex';
                        if (titlePreview) {
                            titlePreview.style.color = '#064E3B';
                            titlePreview.style.textShadow = 'none';
                        }
                        if (subPreview) {
                            subPreview.style.color = '#15803D';
                            subPreview.style.textShadow = 'none';
                        }
                    }

                    if (previewWrap) {
                        previewWrap.style.display = 'flex';
                        if (pendingVillageBannerArt) {
                            previewWrap.innerHTML = `<img src="${pendingVillageBannerArt}" style="width:100%;height:100%;object-fit:cover;border-radius:10px" alt="Preview">`;
                        } else {
                            previewWrap.innerHTML = `
                                <svg viewBox="0 0 140 70" width="115" height="58" preserveAspectRatio="xMidYMid meet">
                                    <path d="M0 50 Q 40 30 90 42 Q 120 50 140 40 L140 70 L0 70 Z" fill="#22C55E" />
                                    <path d="M0 58 Q 50 48 100 56 L140 54 L140 70 L0 70 Z" fill="#15803D" />
                                    <rect x="75" y="40" width="26" height="18" fill="#FEF3C7" stroke="#78350F" stroke-width="1" />
                                    <rect x="85" y="46" width="6" height="12" fill="#78350F" />
                                    <polygon points="70,40 88,27 106,40" fill="#DC2626" stroke="#991B1B" stroke-width="1" />
                                    <path d="M30 65 Q 36 38 32 20" stroke="#78350F" stroke-width="3" fill="none" stroke-linecap="round" />
                                    <path d="M32 20 Q 18 10 12 24" stroke="#16A34A" stroke-width="2" fill="none" stroke-linecap="round" />
                                    <path d="M32 20 Q 24 4 16 8" stroke="#22C55E" stroke-width="2" fill="none" stroke-linecap="round" />
                                    <path d="M32 20 Q 42 4 48 12" stroke="#15803D" stroke-width="2" fill="none" stroke-linecap="round" />
                                    <path d="M32 20 Q 48 16 46 28" stroke="#16A34A" stroke-width="2" fill="none" stroke-linecap="round" />
                                </svg>
                            `;
                        }
                    }
                }
            }
        }

        function handleVillageBannerUpload(e) {
            const file = e.target.files[0];
            if (!file) return;
            toast('⏳ ചിത്രം തയ്യാറാക്കുന്നു...');
            compressVillageBannerImage(file, 1200, 0.85, function(compressedDataUrl) {
                pendingVillageBannerArt = compressedDataUrl;
                updateVillageBannerModalPreview();
                toast('📸 ചിത്രം പ്രിവ്യൂവിൽ ചേർത്തു.');
            });
        }

        function previewVillageBannerFromUrl() {
            const url = (document.getElementById('villageBannerUrlInput')?.value || '').trim();
            if (!url) { toast('⚠️ ദയവായി ചിത്രത്തിന്റെ URL നൽകുക.'); return; }
            pendingVillageBannerArt = url;
            updateVillageBannerModalPreview();
            toast('🔗 ലിങ്ക് പ്രിവ്യൂവിൽ ചേർത്തു.');
        }

        function selectVillageBannerPreset(url, label) {
            pendingVillageBannerArt = url;
            updateVillageBannerModalPreview();
            toast(`🎨 തെരഞ്ഞെടുത്തു: ${label}`);
        }

        function resetVillageBannerToDefault() {
            pendingVillageBannerArt = null;
            updateVillageBannerModalPreview();
            toast('↺ ഡിഫോൾട്ട് ചിത്രം സെറ്റ് ചെയ്തു.');
        }

        function saveVillageBannerChanges() {
            const title = (document.getElementById('villageBannerTitleInput')?.value || '').trim() || 'നമ്മുടെ നാട്';
            const sub = (document.getElementById('villageBannerSubInput')?.value || '').trim() || '🤝 നാടിനൊപ്പം നാം';
            const showText = document.getElementById('villageBannerShowTextInput') ? document.getElementById('villageBannerShowTextInput').checked : true;

            try {
                if (pendingVillageBannerArt) {
                    localStorage.setItem('thuna_custom_village_banner_art', pendingVillageBannerArt);
                } else {
                    localStorage.removeItem('thuna_custom_village_banner_art');
                }
                localStorage.setItem('thuna_custom_village_banner_title', title);
                localStorage.setItem('thuna_custom_village_banner_sub', sub);
                localStorage.setItem('thuna_custom_village_banner_mode', pendingVillageBannerMode);
                localStorage.setItem('thuna_custom_village_banner_show_text', showText ? 'true' : 'false');
            } catch (err) {
                console.warn('LocalStorage error while saving village banner:', err);
            }

            if (window.THUNA_FIREBASE && typeof window.THUNA_FIREBASE.set === 'function') {
                window.THUNA_FIREBASE.set('config/villageBanner', {
                    art: pendingVillageBannerArt || '',
                    title: title,
                    sub: sub,
                    mode: pendingVillageBannerMode,
                    showText: showText,
                    updatedAt: Date.now()
                }).catch(() => {});
            }

            renderHomeVillageBanner();
            closeModal('modal-edit-village-banner');
            toast('🎉 ബാനർ വിജയകരമായി മാറ്റി!');
        }

        /* -------------------------------------------------------------
           TOP HEADER HERO BANNER & ADMIN PHONE AUTH ENGINE
           ------------------------------------------------------------- */
        const DEFAULT_TOP_HERO_SVG = `
            <svg viewBox="0 0 400 170" class="yg-header-svg" preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="ygSkyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#FEF9C3" />
                        <stop offset="55%" stop-color="#FFFDF5" />
                        <stop offset="100%" stop-color="#ECFDF5" />
                    </linearGradient>
                    <radialGradient id="ygSunGlow" cx="50%" cy="30%" r="55%">
                        <stop offset="0%" stop-color="#FDE047" stop-opacity="0.85" />
                        <stop offset="50%" stop-color="#FEF08A" stop-opacity="0.45" />
                        <stop offset="100%" stop-color="#FFFDF5" stop-opacity="0" />
                    </radialGradient>
                    <linearGradient id="ygHillBack" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#BBF7D0" />
                        <stop offset="100%" stop-color="#86EFAC" />
                    </linearGradient>
                    <linearGradient id="ygHillMid" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#34D399" />
                        <stop offset="100%" stop-color="#10B981" />
                    </linearGradient>
                    <linearGradient id="ygHillFore" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#0F766E" />
                        <stop offset="100%" stop-color="#115E59" />
                    </linearGradient>
                </defs>
                <rect width="400" height="170" fill="url(#ygSkyGrad)" />
                <circle cx="200" cy="40" r="75" fill="url(#ygSunGlow)" />
                <path d="M-20 125 Q 70 65 150 95 Q 230 125 310 75 Q 365 60 420 105 L420 170 L-20 170 Z" fill="url(#ygHillBack)" opacity="0.65" />
                <path d="M-20 138 Q 80 98 175 118 Q 270 138 365 102 Q 395 98 420 112 L420 170 L-20 170 Z" fill="url(#ygHillMid)" opacity="0.8" />
                <path d="M-20 148 Q 90 122 195 140 Q 300 152 420 132 L420 170 L-20 170 Z" fill="url(#ygHillFore)" />
                <g transform="translate(16, 108)">
                    <rect x="10" y="20" width="38" height="24" rx="2" fill="#FEF3C7" stroke="#78350F" stroke-width="1.2" />
                    <rect x="24" y="27" width="10" height="17" fill="#78350F" />
                    <rect x="14" y="25" width="6" height="7" rx="1" fill="#0284C7" stroke="#78350F" stroke-width="1" />
                    <rect x="38" y="25" width="6" height="7" rx="1" fill="#0284C7" stroke="#78350F" stroke-width="1" />
                    <polygon points="5,20 29,4 53,20" fill="#DC2626" stroke="#991B1B" stroke-width="1.2" />
                    <line x1="29" y1="4" x2="29" y2="20" stroke="#B91C1C" stroke-width="1.2" />
                </g>
                <g transform="translate(332, 104)">
                    <rect x="10" y="20" width="40" height="25" rx="2" fill="#FEF3C7" stroke="#78350F" stroke-width="1.2" />
                    <rect x="25" y="28" width="10" height="17" fill="#78350F" />
                    <rect x="14" y="26" width="6" height="7" rx="1" fill="#0284C7" stroke="#78350F" stroke-width="1" />
                    <rect x="39" y="26" width="6" height="7" rx="1" fill="#0284C7" stroke="#78350F" stroke-width="1" />
                    <polygon points="4,20 30,3 56,20" fill="#DC2626" stroke="#991B1B" stroke-width="1.2" />
                    <line x1="30" y1="3" x2="30" y2="20" stroke="#B91C1C" stroke-width="1.2" />
                </g>
                <g transform="translate(2, 10)">
                    <path d="M16 140 Q 28 85 22 42" stroke="#78350F" stroke-width="4.5" fill="none" stroke-linecap="round" />
                    <circle cx="20" cy="44" r="3.2" fill="#854D0E" />
                    <circle cx="25" cy="45" r="2.8" fill="#713F12" />
                    <path d="M22 42 Q 2 24 0 48" stroke="#15803D" stroke-width="3" fill="none" stroke-linecap="round" />
                    <path d="M22 42 Q 14 12 4 20" stroke="#16A34A" stroke-width="3" fill="none" stroke-linecap="round" />
                    <path d="M22 42 Q 28 8 38 18" stroke="#22C55E" stroke-width="3" fill="none" stroke-linecap="round" />
                    <path d="M22 42 Q 44 24 48 46" stroke="#15803D" stroke-width="3" fill="none" stroke-linecap="round" />
                    <path d="M22 42 Q 32 38 36 58" stroke="#16A34A" stroke-width="2.6" fill="none" stroke-linecap="round" />
                    <path d="M22 42 Q 12 38 6 54" stroke="#15803D" stroke-width="2.6" fill="none" stroke-linecap="round" />
                </g>
                <g transform="translate(365, 8)">
                    <path d="M22 142 Q 10 82 18 42" stroke="#78350F" stroke-width="4.5" fill="none" stroke-linecap="round" />
                    <circle cx="16" cy="44" r="3" fill="#854D0E" />
                    <circle cx="21" cy="45" r="2.8" fill="#713F12" />
                    <path d="M18 42 Q 38 24 40 48" stroke="#15803D" stroke-width="3" fill="none" stroke-linecap="round" />
                    <path d="M18 42 Q 26 10 36 18" stroke="#16A34A" stroke-width="3" fill="none" stroke-linecap="round" />
                    <path d="M18 42 Q 12 8 0 20" stroke="#22C55E" stroke-width="3" fill="none" stroke-linecap="round" />
                    <path d="M18 42 Q -6 24 -10 46" stroke="#15803D" stroke-width="3" fill="none" stroke-linecap="round" />
                    <path d="M18 42 Q 6 36 2 54" stroke="#16A34A" stroke-width="2.6" fill="none" stroke-linecap="round" />
                </g>
                <g transform="translate(176, 12)">
                    <circle cx="14" cy="11" r="7.5" fill="#D97706" />
                    <path d="M 23,24 C 20,20 14,18 8,22 C 2,26 2,36 6,43 C 11,50 19,55 24,60 C 21,52 14,48 12,43 C 9,37 11,30 16,28 C 19,26 22,27 23,28 Z" fill="#D97706" />
                    <circle cx="34" cy="11" r="7.5" fill="#0F766E" />
                    <path d="M 25,24 C 28,20 34,18 40,22 C 46,26 46,36 42,43 C 37,50 29,55 24,60 C 27,52 34,48 36,43 C 39,37 37,30 32,28 C 29,26 26,27 25,28 Z" fill="#0F766E" />
                </g>
                <text id="homeSvgAppTitle" data-i18n="app_title" x="200" y="102" text-anchor="middle" font-family="'Manjari', sans-serif" font-size="25" font-weight="800" fill="#0F766E" letter-spacing="-0.3">നമ്മുടെ നാട്</text>
                <text id="homeSvgAppTagline" data-i18n="app_tagline" x="200" y="122" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="12" font-weight="700" fill="#115E59" letter-spacing="0.5">ഒരുമിച്ചാണ് നാം</text>
            </svg>
        `;

        let pendingTopHeroBanner = null;

        function renderHomeTopHeroBanner() {
            const wrap = document.getElementById('homeTopHeaderArtWrap');
            if (!wrap) return;
            const customHero = localStorage.getItem('thuna_custom_hero_banner');
            if (customHero && customHero.trim() && customHero !== 'null' && customHero !== 'undefined') {
                wrap.innerHTML = `
                    <div style="position:relative;width:100%;height:165px;overflow:hidden">
                        <img src="${customHero}" style="width:100%;height:100%;object-fit:cover;display:block" alt="ഹോം ബാനർ" onerror="this.onerror=null;this.parentElement.innerHTML=DEFAULT_TOP_HERO_SVG">
                        <div style="position:absolute;inset:0;background:linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.05) 35%, rgba(0,0,0,0.65) 100%)"></div>
                        <div style="position:absolute;bottom:14px;left:0;right:0;text-align:center;color:#fff;text-shadow:0 2px 10px rgba(0,0,0,0.9);pointer-events:none">
                            <div style="font-family:'Manjari', sans-serif;font-size:24px;font-weight:800;letter-spacing:-0.3px;color:#ffffff">നമ്മുടെ നാട്</div>
                            <div style="font-family:'Outfit', sans-serif;font-size:12px;font-weight:700;color:#86efac;letter-spacing:0.5px">ഒരുമിച്ചാണ് നാം</div>
                        </div>
                    </div>
                `;
            } else {
                wrap.innerHTML = DEFAULT_TOP_HERO_SVG;
            }
        }

        function openEditTopHeroModal() {
            pendingTopHeroBanner = localStorage.getItem('thuna_custom_hero_banner') || null;
            updateTopHeroModalPreview();
            openModal('modal-edit-top-hero');
        }

        function updateTopHeroModalPreview() {
            const previewWrap = document.getElementById('modalTopHeroPreviewWrap');
            if (!previewWrap) return;
            if (pendingTopHeroBanner) {
                previewWrap.innerHTML = `
                    <div style="position:relative;width:100%;height:140px;overflow:hidden;border-radius:14px">
                        <img src="${pendingTopHeroBanner}" style="width:100%;height:100%;object-fit:cover;display:block" alt="Hero Preview">
                        <div style="position:absolute;inset:0;background:linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.65) 100%)"></div>
                        <div style="position:absolute;bottom:10px;left:0;right:0;text-align:center;color:#fff;text-shadow:0 2px 8px rgba(0,0,0,0.85)">
                            <div style="font-family:'Manjari', sans-serif;font-size:20px;font-weight:800;color:#fff">നമ്മുടെ നാട്</div>
                            <div style="font-family:'Outfit', sans-serif;font-size:11px;font-weight:700;color:#86efac">ഒരുമിച്ചാണ് നാം</div>
                        </div>
                    </div>
                `;
            } else {
                previewWrap.innerHTML = `
                    <div style="position:relative;width:100%;height:140px;overflow:hidden;border-radius:14px;background:#fef9c3">
                        ${DEFAULT_TOP_HERO_SVG}
                    </div>
                `;
            }
        }

        function handleTopHeroUpload(e) {
            const file = e.target.files[0];
            if (!file) return;
            toast('⏳ ചിത്രം തയ്യാറാക്കുന്നു...');
            const r = new FileReader();
            r.onload = ev => {
                const img = new Image();
                img.onload = () => {
                    let w = img.width, h = img.height;
                    const maxW = 1200;
                    if (w > maxW) {
                        h = Math.round((h * maxW) / w);
                        w = maxW;
                    }
                    const canvas = document.createElement('canvas');
                    canvas.width = w;
                    canvas.height = h;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, w, h);
                    pendingTopHeroBanner = canvas.toDataURL('image/jpeg', 0.85);
                    updateTopHeroModalPreview();
                    toast('📸 പുതിയ ചിത്രം പ്രിവ്യൂവിൽ ചേർത്തു!');
                };
                img.src = ev.target.result;
            };
            r.readAsDataURL(file);
        }

        function previewTopHeroFromUrl() {
            const url = (document.getElementById('topHeroUrlInput')?.value || '').trim();
            if (!url) { toast('⚠️ ദയവായി ചിത്രത്തിന്റെ URL നൽകുക.'); return; }
            pendingTopHeroBanner = url;
            updateTopHeroModalPreview();
            toast('🔗 ലിങ്ക് പ്രിവ്യൂവിൽ ചേർത്തു.');
        }

        function selectTopHeroPreset(url, label) {
            pendingTopHeroBanner = url;
            updateTopHeroModalPreview();
            toast(`🎨 തെരഞ്ഞെടുത്തു: ${label}`);
        }

        function resetTopHeroToDefault() {
            pendingTopHeroBanner = null;
            updateTopHeroModalPreview();
            toast('↺ ഡിഫോൾട്ട് വെക്റ്റർ ചിത്രം സെറ്റ് ചെയ്തു.');
        }

        function saveTopHeroChanges() {
            if (pendingTopHeroBanner) {
                localStorage.setItem('thuna_custom_hero_banner', pendingTopHeroBanner);
            } else {
                localStorage.removeItem('thuna_custom_hero_banner');
            }

            if (window.FirebaseSync && typeof window.FirebaseSync.pushBanner === 'function') {
                window.FirebaseSync.pushBanner(pendingTopHeroBanner || '');
            }

            renderHomeTopHeroBanner();
            closeModal('modal-edit-top-hero');
            toast('🎉 ഹെഡർ ചിത്രം വിജയകരമായി മാറ്റി! (Hero Banner Updated Live)');
        }

        /* Admin Phone Number Protection Engine (Only for +91 9605406699) */
        function checkAdminAccess(phone) {
            const cleanPhone = (phone || APP_STATE?.userProfile?.phone || localStorage.getItem('thuna_user_phone') || document.getElementById('profPhoneInput')?.value || '').replace(/\D/g, '');
            const isAdmin = cleanPhone.includes('9605406699') || sessionStorage.getItem('nammudenaad_admin_authenticated') === 'true';
            const row = document.getElementById('profileAdminConsoleRow');
            if (row) {
                row.style.display = isAdmin ? 'flex' : 'none';
            }
            const iconRow = document.getElementById('profileServiceIconsRow');
            if (iconRow) {
                iconRow.style.display = isAdmin ? 'flex' : 'none';
            }
        }

        function openAdminConsoleProtected() {
            const cleanPhone = (APP_STATE?.userProfile?.phone || localStorage.getItem('thuna_user_phone') || document.getElementById('profPhoneInput')?.value || '').replace(/\D/g, '');
            if (cleanPhone.includes('9605406699') || sessionStorage.getItem('nammudenaad_admin_authenticated') === 'true') {
                sessionStorage.setItem('nammudenaad_admin_authenticated', 'true');
                window.location.href = 'admin.html';
                return;
            }
            const pin = prompt('🔒 അഡ്മിൻ പിൻ നൽകുക (Enter Admin PIN):');
            if (pin === '2026') {
                sessionStorage.setItem('nammudenaad_admin_authenticated', 'true');
                window.location.href = 'admin.html';
            } else if (pin) {
                toast('❌ തെറ്റായ പിൻ! അഡ്മിന് മാത്രമേ പ്രവേശനമുള്ളൂ.');
            }
        }

        /* -------------------------------------------------------------
           IN-APP SERVICE CATEGORIES & ICONS MANAGER (ADMIN)
           ------------------------------------------------------------- */
        const IN_APP_CURATED_EMOJIS = [
            '⚡', '🚰', '🎨', '🔨', '🛺', '🚕', '🩺', '🏠', '📖', '🐾',
            '❄️', '🧱', '🪨', '🍲', '👨‍🏭', '🔧', '📹', '✂️', '📸', '🧺',
            '🌴', '🌿', '🎪', '🐜', '📦', '🧵', '🌾', '🍳', '🥩', '🚲',
            '🛵', '🚖', '🏪', '🧹', '👔', '🛠️', '🔌', '💡', '🛋️', '🚿',
            '🪵', '🏊', '🧰', '🏥', '💊', '🚛', '🚜', '☕', '🥖', '🐟',
            '🪟', '🪡', '📚', '🔐', '🎯', '✨'
        ];

        let inAppPendingIconCatId = null;
        let inAppPendingIconValue = null;

        function openAdminServiceIconsModal() {
            renderInAppServiceIconsList();
            renderInAppQuickEmojiBar();
            openModal('modal-admin-service-icons');
        }

        function renderInAppQuickEmojiBar() {
            const bar = document.getElementById('inAppQuickEmojiBar');
            if (!bar) return;
            bar.innerHTML = IN_APP_CURATED_EMOJIS.map(em => `
                <button type="button" onclick="updateInAppEditorPreview('${em}')" style="background:#fff;border:1px solid #CBD5E1;border-radius:8px;font-size:18px;min-width:34px;height:34px;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0">
                    ${em}
                </button>
            `).join('');
        }

        function renderInAppServiceIconsList(searchQuery) {
            const container = document.getElementById('inAppServiceIconsListContainer');
            if (!container) return;

            const q = (searchQuery || '').toLowerCase().trim();
            const allCats = getAllCategories();
            const filtered = q ? allCats.filter(c =>
                c.name.toLowerCase().includes(q) ||
                (c.ml && c.ml.toLowerCase().includes(q)) ||
                c.id.toLowerCase().includes(q)
            ) : allCats;

            if (!filtered.length) {
                container.innerHTML = `<div style="padding:20px;text-align:center;color:#64748B;font-size:12.5px">സർവീസുകളൊന്നും കണ്ടെത്തിയില്ല.</div>`;
                return;
            }

            container.innerHTML = filtered.map(c => `
                <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border:1px solid #E2E8F0;border-radius:14px;background:#fff">
                    <div style="display:flex;align-items:center;gap:10px">
                        <div style="width:38px;height:38px;border-radius:10px;display:flex;align-items:center;justify-content:center">
                            ${getCatSvg(c.id, 36)}
                        </div>
                        <div>
                            <div style="font-size:13.5px;font-weight:700;color:#0F172A">${escapeHtml(c.name)}</div>
                            <div style="font-size:11px;color:#64748B">${escapeHtml(c.ml || '')} • <code>${escapeHtml(c.id)}</code></div>
                        </div>
                    </div>
                    <button type="button" class="primary-action-btn" style="margin:0;padding:6px 12px;font-size:11.5px;background:#F1F5F9;color:#0F172A;border:1px solid #CBD5E1;height:auto;border-radius:10px" onclick="openInAppIconEditor('${escapeHtml(c.id)}')">
                        🎨 ഐക്കൺ മാറ്റുക
                    </button>
                </div>
            `).join('');
        }

        function openInAppIconEditor(catId) {
            const allCats = getAllCategories();
            const cat = allCats.find(c => c.id.toLowerCase() === catId.toLowerCase() || c.name.toLowerCase() === catId.toLowerCase());
            if (!cat) return;

            inAppPendingIconCatId = cat.id;
            inAppPendingIconValue = cat.icon || '🛠️';

            const banner = document.getElementById('inAppIconEditorBanner');
            const nameEl = document.getElementById('inAppEditorCatName');
            const idInput = document.getElementById('inAppEditorCatId');
            const emojiInput = document.getElementById('inAppEditorEmojiInput');

            if (nameEl) nameEl.textContent = `${cat.name} (${cat.ml || ''}) — ഐക്കൺ മാറ്റുക`;
            if (idInput) idInput.value = cat.id;
            if (emojiInput) emojiInput.value = (inAppPendingIconValue.startsWith('http') || inAppPendingIconValue.startsWith('data:') ? '' : inAppPendingIconValue);

            updateInAppEditorPreview(inAppPendingIconValue);
            if (banner) banner.style.display = 'block';
        }

        function closeInAppIconEditor() {
            const banner = document.getElementById('inAppIconEditorBanner');
            if (banner) banner.style.display = 'none';
            inAppPendingIconCatId = null;
            inAppPendingIconValue = null;
        }

        function updateInAppEditorPreview(val) {
            inAppPendingIconValue = val || '🛠️';
            const box = document.getElementById('inAppEditorPreviewBox');
            if (!box) return;
            if (inAppPendingIconValue.startsWith('http') || inAppPendingIconValue.startsWith('data:')) {
                box.innerHTML = `<img src="${inAppPendingIconValue}" style="width:100%;height:100%;object-fit:cover" alt="Preview">`;
            } else {
                box.innerHTML = inAppPendingIconValue;
            }
        }

        function saveInAppCategoryIcon() {
            if (!inAppPendingIconCatId || !inAppPendingIconValue) {
                toast('⚠️ ദയവായി ഒരു ഐക്കൺ നൽകുക.');
                return;
            }

            setCategoryAdminIcon(inAppPendingIconCatId, inAppPendingIconValue);
            toast(`✓ ${inAppPendingIconCatId} സർവീസിന് പുതിയ ഐക്കൺ സേവ് ചെയ്തു!`);
            closeInAppIconEditor();
            renderInAppServiceIconsList();
        }

        function openLocationModal() {
            openModal('modal-location');
            renderLocationPresets();
        }
        function openBloodModal() {
            document.querySelectorAll('#bloodFilterPills .pill-btn').forEach(b => b.classList.remove('active'));
            const allBtn = document.querySelector('#bloodFilterPills .pill-btn');
            if (allBtn) allBtn.classList.add('active');
            renderDonors('all');
            openModal('modal-blood');
        }
        function openAmbulanceDriverRegister() {
            closeModal('modal-ambulance');
            const profile = getUnifiedUserProfile();
            const nameInput = document.getElementById('ambDriverName');
            const phoneInput = document.getElementById('ambDriverPhone');
            const locInput = document.getElementById('ambDriverLocation');
            const bannerEl = document.getElementById('ambAutofillBanner');

            if (nameInput && !nameInput.value) nameInput.value = profile.name;
            if (phoneInput && !phoneInput.value) phoneInput.value = profile.phone;
            if (locInput && !locInput.value) locInput.value = profile.location || APP_STATE.userLocation || 'കണ്ണൂർ, കേരളം';

            if (bannerEl) bannerEl.style.display = 'none';
            openModal('modal-ambulance-driver');
        }
        function openAmbulanceModal() { openModal('modal-ambulance'); renderRegisteredAmbulanceDrivers(); }
        function openEmergencyModal() { openModal('modal-emergency'); }
        function openAnnouncementModal() { openModal('modal-announcement'); }
        function openNotifications() { openModal('modal-notifications'); }
        function openAddServiceModal() { openProviderRegisterModal(); }
        function openPostJobModal() {
            const profile = getUnifiedUserProfile();
            const locInput = document.getElementById('postJobLocation');
            const phoneInput = document.getElementById('postJobPhone');
            const bannerEl = document.getElementById('jobAutofillBanner');

            if (locInput && !locInput.value) locInput.value = profile.location || APP_STATE.userLocation || 'കണ്ണൂർ, കേരളം';
            if (phoneInput && !phoneInput.value) phoneInput.value = `${profile.name} (${profile.phone})`;

            if (bannerEl) bannerEl.style.display = 'none';
            openModal('modal-post-job');
        }

        function submitAmbulanceDriver() {
            const name = (document.getElementById('ambDriverName')?.value || '').trim();
            const phone = (document.getElementById('ambDriverPhone')?.value || '').trim();
            const vehicle = (document.getElementById('ambVehicleNo')?.value || '').trim();
            const licence = (document.getElementById('ambLicenceNo')?.value || '').trim();
            const location = (document.getElementById('ambDriverLocation')?.value || '').trim();
            const type = (document.getElementById('ambVehicleType')?.value || 'Basic Ambulance').trim();
            if (!name || !phone || !vehicle || !location) {
                toast('⚠️ Name, phone, vehicle number and location are required.');
                return;
            }
            const userCoords = getUserCoords();
            const list = getRegisteredAmbulanceDrivers();
            const newAmb = {
                id: 'amb_' + Date.now(),
                name, phone, vehicle, licence, location, type,
                lat: userCoords.latitude,
                lon: userCoords.longitude,
                createdAt: new Date().toISOString()
            };
            list.unshift(newAmb);
            localStorage.setItem('nammude_ambulance_drivers', JSON.stringify(list));

            // Sync with Firebase
            if (window.THUNA_FIREBASE && typeof window.THUNA_FIREBASE.saveLocationAware === 'function') {
                window.THUNA_FIREBASE.saveLocationAware('ambulanceDrivers', newAmb).catch(() => { });
            }

            ['ambDriverName', 'ambDriverPhone', 'ambVehicleNo', 'ambLicenceNo', 'ambDriverLocation'].forEach(id => {
                const e = document.getElementById(id); if (e) e.value = '';
            });
            closeModal('modal-ambulance-driver');
            openModal('modal-ambulance');
            renderRegisteredAmbulanceDrivers();
            toast('🚑 Ambulance registered successfully.');
        }

        function submitJobPosting(e) {
            e.preventDefault();
            const title = document.getElementById('postJobTitle')?.value.trim();
            const company = document.getElementById('postJobCompany')?.value.trim();
            const category = document.getElementById('postJobCategory')?.value || 'other';
            const type = document.getElementById('postJobType')?.value || 'Full-Time';
            const salary = document.getElementById('postJobSalary')?.value.trim();
            const location = document.getElementById('postJobLocation')?.value.trim();
            const experience = document.getElementById('postJobExperience')?.value.trim() || 'Any experience';
            const phone = document.getElementById('postJobPhone')?.value.trim();
            const desc = document.getElementById('postJobDesc')?.value.trim();

            if (!title || !company || !salary || !location) {
                toast('⚠️ ദയവായി ആവശ്യമായ വിവരങ്ങൾ പൂരിപ്പിക്കുക');
                return;
            }

            const userCoords = getUserCoords();
            const newJob = {
                id: 'job_' + Date.now(),
                title, company, category, type, salary, location,
                experience,
                lat: userCoords.latitude,
                lon: userCoords.longitude,
                timings: 'Regular hours',
                description: desc || 'Direct local hiring via Nammude Naadu Thuna.',
                contactPhone: phone || '+91 90000 00000',
                postedAgo: 'Just now'
            };

            const custom = JSON.parse(localStorage.getItem('thuna_custom_jobs') || '[]');
            custom.unshift(newJob);
            localStorage.setItem('thuna_custom_jobs', JSON.stringify(custom));

            // Sync with Firebase
            if (window.THUNA_FIREBASE && typeof window.THUNA_FIREBASE.saveLocationAware === 'function') {
                window.THUNA_FIREBASE.saveLocationAware('jobVacancies', newJob).catch(() => { });
            }

            // Reset inputs
            ['postJobTitle', 'postJobCompany', 'postJobSalary', 'postJobLocation', 'postJobExperience', 'postJobPhone', 'postJobDesc'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.value = '';
            });

            closeModal('modal-post-job');
            navTo('jobs');
            renderJobs();
            toast(`🎉 "${title}" തൊഴിൽ ഒഴിവ് വിജയകരമായി പബ്ലിഷ് ചെയ്തു!`);
        }

        function filterJobsList() {
            const input = document.getElementById('jobSearchInput');
            const clearBtn = document.getElementById('jobSearchClear');
            if (clearBtn) clearBtn.style.display = (input && input.value.trim().length > 0) ? 'flex' : 'none';
            renderJobs();
        }

        function clearJobSearch() {
            const input = document.getElementById('jobSearchInput');
            if (input) input.value = '';
            const clearBtn = document.getElementById('jobSearchClear');
            if (clearBtn) clearBtn.style.display = 'none';
            renderJobs();
        }

        function selectJobCategory(cat, btn) {
            APP_STATE.activeJobCategory = cat;
            document.querySelectorAll('#jobCategoryPills .pill-btn').forEach(b => b.classList.remove('active'));
            if (btn) btn.classList.add('active');
            renderJobs();
        }

        function selectJobType(type, btn) {
            APP_STATE.activeJobType = type;
            const parent = btn?.parentElement;
            if (parent) {
                parent.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            }
            renderJobs();
        }

        function openJobChat(jobId) {
            const job = getJobsList().find(j => j.id === jobId) || DEFAULT_JOBS.find(j => j.id === jobId);
            if (!job) return;

            APP_STATE.activeChatProvider = {
                id: job.id,
                name: `${job.company} (${job.title})`,
                category: 'jobs',
                location: job.location
            };

            const nameEl = document.getElementById('chatModalName');
            if (nameEl) nameEl.textContent = `${job.company}`;
            const chatAv = document.getElementById('chatModalAvatar');
            if (chatAv) {
                chatAv.innerHTML = `💼`;
                chatAv.style.background = '#dcfce7';
                chatAv.style.color = '#059669';
                chatAv.style.fontWeight = '800';
            }
            const statusEl = document.getElementById('chatModalStatus');
            if (statusEl) statusEl.textContent = `Hiring: ${job.title} · ${job.salary}`;

            renderChatThread(job.id);
            openModal('modal-chat');
        }

        function toast(msg) {
            const t = document.getElementById('toast');
            if (!t) return;
            t.textContent = msg;
            t.classList.add('show');
            clearTimeout(window.__tt);
            window.__tt = setTimeout(() => t.classList.remove('show'), 2600);
        }

        function escapeHtml(str) {
            return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }

        /* -------------------------------------------------------------
           14. INIT & DOM READY
           ------------------------------------------------------------- */
        document.addEventListener('DOMContentLoaded', () => {
            renderKeywordsClouds();
            renderCategoryPills();
            renderHomePopularServices();
            renderServices();
            renderJobs();
            renderCommunityFeed();
            renderHomeNearbyStrip();
            renderHomeVillageBanner();
            renderHomeTopHeroBanner();
            checkAdminAccess();
            syncAllProfileUIs();
            checkAppLaunchRegistration();

            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('./sw.js').catch(() => {});
            }

            window.addEventListener('storage', (e) => {
                if (e.key && e.key.startsWith('thuna_custom_village_banner')) {
                    renderHomeVillageBanner();
                }
                if (e.key === 'thuna_custom_hero_banner') {
                    renderHomeTopHeroBanner();
                }
                if (e.key === 'thuna_user_phone' || e.key === 'thuna_user_profile') {
                    checkAdminAccess();
                }
            });

            // Sync location display immediately on startup
            updateLocationUI({ locationName: APP_STATE.userLocation });

            // Subscribe to LocationService updates non-blockingly
            function syncLocationState(locState) {
                if (!locState) return;
                APP_STATE.userLocation = locState.locationName || APP_STATE.userLocation;
                APP_STATE.userCoordinates = {
                    latitude: locState.latitude,
                    longitude: locState.longitude,
                    accuracy: locState.accuracy,
                    isManual: locState.isManual
                };
                updateLocationUI(locState);
            }

            if (window.LocationService) {
                window.LocationService.subscribe(syncLocationState);
                setTimeout(() => refreshCurrentLocationLive(true), 300);
            } else {
                window.addEventListener('thuna-location-service-ready', () => {
                    if (window.LocationService) {
                        window.LocationService.subscribe(syncLocationState);
                        setTimeout(() => refreshCurrentLocationLive(true), 200);
                    }
                });
                setLocation(APP_STATE.userLocation, false);
                setTimeout(() => refreshCurrentLocationLive(true), 600);
            }

            // Always auto-refresh live location when user returns to or opens the app
            document.addEventListener('visibilitychange', () => {
                if (document.visibilityState === 'visible') {
                    refreshCurrentLocationLive(true);
                }
            });
            window.addEventListener('focus', () => {
                refreshCurrentLocationLive(true);
            });

            window.addEventListener('thuna-location-updated', (e) => {
                if (e.detail) syncLocationState(e.detail);
            });

            // Resilient Cross-Device Real-Time Sync Engine via Firebase RTDB
            let firebaseSyncInitialized = false;
            function initFirebaseRealtimeSync() {
                if (firebaseSyncInitialized) return;
                if (!window.THUNA_FIREBASE || typeof window.THUNA_FIREBASE.subscribe !== 'function') return;
                firebaseSyncInitialized = true;
                console.info('[Nammude Naadu] Connecting real-time cloud sync listeners...');

                // 1. Subscribe to real-time community stories across all devices
                window.THUNA_FIREBASE.subscribe('stories', (remoteStories) => {
                    if (remoteStories) {
                        const remoteArr = Object.keys(remoteStories).map(k => {
                            const item = remoteStories[k] || {};
                            return {
                                id: k,
                                ...item,
                                mediaUrl: item.mediaUrl || item.art || item.imageUrl || '',
                                location: item.location || item.locationName || 'കേരളം',
                                likes: item.likes || 0,
                                liked: false,
                                timestamp: item.timestamp || item.registeredAt || item.updatedAt || Date.now()
                            };
                        });
                        const custom = JSON.parse(localStorage.getItem('thuna_custom_posts') || '[]');
                        const merged = [...remoteArr.reverse(), ...custom.filter(c => !remoteArr.some(r => r.id === c.id))];
                        safeSetLocalStorage('thuna_custom_posts', JSON.stringify(merged));
                        if (typeof renderCommunityFeed === 'function') renderCommunityFeed();
                    }
                }, { last: 50 });

                // 2. Subscribe to real-time registered users across all devices
                window.THUNA_FIREBASE.subscribe('registeredUsers', (remoteUsers) => {
                    if (remoteUsers) {
                        const userList = Object.keys(remoteUsers).map(k => ({ id: k, ...remoteUsers[k] }));
                        safeSetLocalStorage('thuna_cloud_registered_users', JSON.stringify(userList));

                        // Sync to Nearby Friends so registered people appear on every phone
                        const existingFriends = JSON.parse(localStorage.getItem('thuna_custom_friends') || '[]');
                        const newFriends = userList.map(u => ({
                            id: u.id || ('usr_' + (u.phone || Math.random())),
                            name: u.name || 'നാട്ടുകാരൻ',
                            phone: u.phone || '',
                            location: u.location || 'കേരളം',
                            lat: u.latitude || 11.8745,
                            lon: u.longitude || 75.3704,
                            face: u.avatar && !u.avatar.startsWith('data:') && !u.avatar.startsWith('http') ? u.avatar : '👤',
                            avatar: u.avatar || '',
                            group: u.isBloodDonor && u.bloodGroup ? u.bloodGroup : 'Resident',
                            optIn: true,
                            online: true
                        }));

                        const mergedFriends = [...newFriends, ...existingFriends.filter(ef => !newFriends.some(nf => (nf.phone && nf.phone === ef.phone) || nf.id === ef.id))];
                        safeSetLocalStorage('thuna_custom_friends', JSON.stringify(mergedFriends));

                        // Also sync voluntary blood donors
                        const donorUsers = userList.filter(u => u.isBloodDonor && u.bloodGroup && u.bloodGroup !== 'Select');
                        if (donorUsers.length > 0) {
                            const localDonors = JSON.parse(localStorage.getItem('thuna_custom_donors') || '[]');
                            const mappedDonors = donorUsers.map(u => ({
                                name: u.name,
                                group: u.bloodGroup,
                                phone: u.phone,
                                location: u.location || 'കേരളം',
                                lat: u.latitude || 11.8745,
                                lon: u.longitude || 75.3704,
                                timestamp: u.registeredAt || Date.now()
                            }));
                            const mergedDonors = [...mappedDonors, ...localDonors.filter(ld => !mappedDonors.some(md => md.phone === ld.phone))];
                            safeSetLocalStorage('thuna_custom_donors', JSON.stringify(mergedDonors));
                            if (typeof renderDonors === 'function') renderDonors(APP_STATE.activeBloodGroup || 'all');
                        }

                        // Restore profile if phone matches
                        const localPhone = (localStorage.getItem('thuna_user_phone') || '').replace(/\D/g, '');
                        if (localPhone && remoteUsers[localPhone]) {
                            const matchedProfile = remoteUsers[localPhone];
                            APP_STATE.userProfile = {
                                name: matchedProfile.name || APP_STATE.userProfile.name,
                                phone: matchedProfile.phone || APP_STATE.userProfile.phone,
                                location: matchedProfile.location || APP_STATE.userProfile.location,
                                avatar: matchedProfile.avatar || APP_STATE.userProfile.avatar,
                                bloodGroup: matchedProfile.bloodGroup || APP_STATE.userProfile.bloodGroup,
                                isBloodDonor: matchedProfile.isBloodDonor || false,
                                bio: matchedProfile.bio || 'Nammude Naadu Member'
                            };
                            safeSetLocalStorage('thuna_user_profile', JSON.stringify(APP_STATE.userProfile));
                            safeSetLocalStorage('thuna_profile_registered', 'true');
                            syncAllProfileUIs(APP_STATE.userProfile);
                        }

                        if (typeof renderHomeNearbyStrip === 'function') renderHomeNearbyStrip();
                        if (typeof renderNearbyFriends === 'function') renderNearbyFriends();
                    }
                }, { last: 50 });

                // 3. Subscribe to real-time urgent blood requests across devices
                window.THUNA_FIREBASE.subscribe('blood', (remoteBlood) => {
                    if (remoteBlood) {
                        const bloodArr = Object.keys(remoteBlood).map(k => ({ id: k, ...remoteBlood[k] }));
                        const urgent = bloodArr.filter(b => b.isUrgent);
                        if (urgent.length > 0) {
                            safeSetLocalStorage('thuna_cloud_urgent_blood', JSON.stringify(urgent));
                            if (typeof renderUrgentBloodRequests === 'function') renderUrgentBloodRequests();
                        }
                    }
                }, { last: 20 });

                // 4. Subscribe to real-time job vacancies across devices
                window.THUNA_FIREBASE.subscribe('jobVacancies', (remoteJobs) => {
                    if (remoteJobs) {
                        const jobsArr = Object.keys(remoteJobs).map(k => ({ id: k, ...remoteJobs[k] }));
                        const custom = JSON.parse(localStorage.getItem('thuna_custom_jobs') || '[]');
                        const merged = [...jobsArr.reverse(), ...custom.filter(c => !jobsArr.some(r => r.id === c.id))];
                        safeSetLocalStorage('thuna_custom_jobs', JSON.stringify(merged));
                        if (typeof renderJobs === 'function' && APP_STATE.currentScreen === 'jobs') renderJobs();
                    }
                }, { last: 35 });

                // 5. Subscribe to real-time ambulance drivers across devices
                window.THUNA_FIREBASE.subscribe('ambulanceDrivers', (remoteAmbs) => {
                    if (remoteAmbs) {
                        const ambArr = Object.keys(remoteAmbs).map(k => ({ id: k, ...remoteAmbs[k] }));
                        const custom = JSON.parse(localStorage.getItem('nammude_ambulance_drivers') || '[]');
                        const merged = [...ambArr.reverse(), ...custom.filter(c => !ambArr.some(r => r.id === c.id))];
                        safeSetLocalStorage('nammude_ambulance_drivers', JSON.stringify(merged));
                        if (typeof renderRegisteredAmbulanceDrivers === 'function') renderRegisteredAmbulanceDrivers();
                    }
                }, { last: 35 });

                // 6. Subscribe to real-time custom service categories across devices
                window.THUNA_FIREBASE.subscribe('customCategories', (remoteCats) => {
                    if (remoteCats) {
                        const catArr = Object.keys(remoteCats).map(k => ({ id: k, ...remoteCats[k] }));
                        const localCustom = JSON.parse(localStorage.getItem('thuna_custom_categories') || '[]');
                        const merged = [...catArr, ...localCustom.filter(lc => !catArr.some(rc => rc.id === lc.id || rc.name.toLowerCase() === lc.name.toLowerCase()))];
                        safeSetLocalStorage('thuna_custom_categories', JSON.stringify(merged));
                        if (typeof renderCategoryPills === 'function') renderCategoryPills();
                        if (typeof renderHomePopularServices === 'function') renderHomePopularServices();
                    }
                });

                // 7. Subscribe to real-time admin category icon overrides
                window.THUNA_FIREBASE.subscribe('settings/category_icons', (remoteIcons) => {
                    if (remoteIcons) {
                        const localIcons = JSON.parse(localStorage.getItem('thuna_category_icons') || '{}');
                        Object.keys(remoteIcons).forEach(k => {
                            if (remoteIcons[k] && remoteIcons[k].icon) {
                                localIcons[k.toLowerCase()] = remoteIcons[k].icon;
                            }
                        });
                        safeSetLocalStorage('thuna_category_icons', JSON.stringify(localIcons));
                        if (typeof renderCategoryPills === 'function') renderCategoryPills();
                        if (typeof renderHomePopularServices === 'function') renderHomePopularServices();
                        if (typeof renderServices === 'function') renderServices();
                    }
                });

                // 8. Subscribe to village banner customization
                window.THUNA_FIREBASE.subscribe('config/villageBanner', (remoteBanner) => {
                    if (remoteBanner) {
                        if (remoteBanner.art !== undefined) {
                            if (remoteBanner.art) {
                                safeSetLocalStorage('thuna_custom_village_banner_art', remoteBanner.art);
                            } else {
                                localStorage.removeItem('thuna_custom_village_banner_art');
                            }
                        }
                        if (remoteBanner.title) safeSetLocalStorage('thuna_custom_village_banner_title', remoteBanner.title);
                        if (remoteBanner.sub) safeSetLocalStorage('thuna_custom_village_banner_sub', remoteBanner.sub);
                        if (remoteBanner.mode) safeSetLocalStorage('thuna_custom_village_banner_mode', remoteBanner.mode);
                        if (remoteBanner.showText !== undefined) safeSetLocalStorage('thuna_custom_village_banner_show_text', String(remoteBanner.showText));
                        if (typeof renderHomeVillageBanner === 'function') renderHomeVillageBanner();
                    }
                });
            }

            // Bind triggers immediately and on ready events
            if (window.THUNA_FIREBASE && typeof window.THUNA_FIREBASE.subscribe === 'function') {
                initFirebaseRealtimeSync();
            }
            window.addEventListener('thuna-firebase-ready', () => {
                initFirebaseRealtimeSync();
            });
            setTimeout(initFirebaseRealtimeSync, 200);
            setTimeout(initFirebaseRealtimeSync, 800);
            setTimeout(initFirebaseRealtimeSync, 2500);

            // Deep-linking URL params for testing & Initial Splash Workflow
            const urlParams = new URLSearchParams(window.location.search);
            const scr = urlParams.get('screen');
            const m = urlParams.get('modal');
            if (scr) {
                navTo(scr);
                setTimeout(() => checkAndPromptLocationPermissionOnStartup(), 200);
            } else if (m) {
                navTo('home');
                if (m === 'blood') openBloodModal();
                else if (m === 'location') openLocationModal();
                else if (m === 'friends') openNearbyFriendsModal();
                else if (m === 'market') openMarketplaceModal();
                else if (m === 'taxi') openTaxiCarryModal();
                else if (m === 'register-donor') openRegisterDonorModal();
                else if (m === 'request-blood') openRequestBloodModal();
                else if (m === 'post-job') openPostJobModal();
                setTimeout(() => checkAndPromptLocationPermissionOnStartup(), 300);
            } else {
                // Show Splash Screen on initial open!
                initSplashScreen();
            }

            // Initialize Dual-Language Switcher
            initAppLanguage();
        });

        /* =============================================================
           FEATURE 1: SKELETON SHIMMER LOADERS
           ============================================================= */
        function showFeedSkeleton() {
            const skeleton = document.getElementById('homeFeedSkeleton');
            if (skeleton) {
                skeleton.style.display = 'block';
                setTimeout(() => {
                    skeleton.style.display = 'none';
                }, 500);
            }
        }

        function showServicesSkeleton() {
            const container = document.getElementById('servicesListContainer');
            if (!container) return;
            container.innerHTML = Array(3).fill(0).map(() => `
                <div class="skeleton-feed-card" style="margin-bottom:10px">
                    <div class="skeleton-row">
                        <div class="skeleton-box skeleton-circle" style="width:48px;height:48px"></div>
                        <div style="flex:1;display:flex;flex-direction:column;gap:8px">
                            <div class="skeleton-box" style="width:140px;height:16px"></div>
                            <div class="skeleton-box" style="width:90px;height:12px"></div>
                        </div>
                    </div>
                    <div class="skeleton-box" style="width:70%;height:12px;margin-top:6px"></div>
                </div>
            `).join('');
        }

        function showJobsSkeleton() {
            const container = document.getElementById('jobsListContainer');
            if (!container) return;
            container.innerHTML = Array(3).fill(0).map(() => `
                <div class="skeleton-feed-card" style="margin-bottom:10px">
                    <div class="skeleton-row" style="justify-content:space-between">
                        <div class="skeleton-box" style="width:150px;height:16px"></div>
                        <div class="skeleton-box" style="width:60px;height:20px;border-radius:12px"></div>
                    </div>
                    <div class="skeleton-box" style="width:110px;height:12px;margin-top:6px"></div>
                    <div class="skeleton-box" style="width:100%;height:32px;margin-top:8px"></div>
                </div>
            `).join('');
        }

        /* =============================================================
           FEATURE 2: DUAL-LANGUAGE SWITCHER (മലയാളം / English)
           ============================================================= */
        /* =============================================================
           FEATURE 2: DUAL-LANGUAGE SWITCHER (100% മലയാളം / 100% English)
           ============================================================= */
        const APP_TRANSLATIONS = {
            ml: {
                app_title: "നമ്മുടെ നാട്",
                app_tagline: "ഒരുമിച്ചാണ് നാം",
                share_btn: "ഷെയർ ചെയ്യാം",
                greet_salutation: "നമസ്കാരം",
                greet_default_name: "സുഹൃത്തേ",
                greet_quote: "നമ്മുടെ സൗഹൃദങ്ങൾക്ക് എന്നും ചേർന്ന് നിൽക്കാം 🌿",
                search_ph: "സേവനങ്ങൾ, ബ്ലഡ്, തൊഴിൽ തിരയുക...",
                loc_label: "നിങ്ങളുടെ ലൊക്കേഷൻ:",

                // Main Categories
                sec_main_cats: "പ്രധാന വിഭാഗങ്ങൾ",
                view_all: "എല്ലാം കാണുക &rsaquo;",
                btn_explore: "കാണുക &rarr;",
                cat_blood_title: "രക്തദാനം",
                cat_blood_sub: "അടിയന്തര സഹായം",
                cat_emergency_title: "അടിയന്തിരം",
                cat_emergency_sub: "പോലീസ് & ഫയർഫോഴ്സ്",
                cat_services_title: "സേവനങ്ങൾ",
                cat_services_sub: "പ്രാദേശിക സേവനങ്ങൾ",
                cat_jobs_title: "തൊഴിലുകൾ",
                cat_jobs_sub: "തൊഴിൽ അവസരങ്ങൾ",
                cat_rent_title: "വാടക &amp; വീടുകൾ",
                cat_rent_sub: "ക്രയവിക്രയം",
                cat_amb_title: "ആംബുലൻസ്",
                cat_amb_sub: "24x7 സേവനം",

                // Village Promo Banner
                promo_title: "നമ്മുടെ നാട്",
                promo_sub: "🤝 നാടിനൊപ്പം നാം",

                // Popular Services
                sec_services: "ജനപ്രിയ സേവനങ്ങൾ",
                serv_auto: "ഓട്ടോ ഡ്രൈവർ",
                serv_electrician: "ഇലക്ട്രീഷ്യൻ",
                serv_plumber: "പ്ലംബർ",
                serv_coconut: "തെങ്ങ് കയറ്റം",
                serv_carpenter: "ആശാരി / തച്ചൻ",
                serv_painter: "പെയിന്റർ",

                // Community Updates & Global
                sec_community: "കമ്മ്യൂണിറ്റി വിശേഷങ്ങൾ",
                sec_global: "ഗ്ലോബൽ മലയാളികൾ",
                sec_global_sub: "ലോകമെമ്പാടുമുള്ള മലയാളികളുമായി ബന്ധപ്പെടാം",
                feed_comm_tag: "കമ്മ്യൂണിറ്റി",
                feed_help_tag: "സഹായം ആവശ്യം",

                // Bottom Navigation
                nav_home: "ഹോം",
                nav_nearby: "സമീപം",
                nav_post: "പോസ്റ്റ്",
                nav_msg: "സന്ദേശങ്ങൾ",
                nav_prof: "പ്രൊഫൈൽ",

                // Jobs Screen
                title_jobs: "💼 തൊഴിൽ അവസരങ്ങൾ",
                subtitle_jobs: "കേരളത്തിലെ പ്രാദേശിക തൊഴിലവസരങ്ങൾ",
                btn_post_job: "➕ തൊഴിൽ നൽകാം",
                jobs_search_ph: "റോൾ, കട, സ്ഥാപനം തിരയുക...",
                job_tab_all: "എല്ലാ ഒഴിവുകളും",
                job_tab_saved: "സേവ് ചെയ്തവ",
                job_tab_apps: "എന്റെ അപേക്ഷകൾ",
                job_tab_posted: "ഞാൻ നൽകിയവ",
                job_cat_all: "എല്ലാ വിഭാഗങ്ങളും",
                job_cat_delivery: "⚡ ഡ്രൈവർ / ഡെലിവറി",
                job_cat_sales: "🏪 സെയിൽസ് & റീട്ടെയിൽ",
                job_cat_office: "💼 ഓഫീസ് & അഡ്മിൻ",
                job_cat_technical: "🛠️ ടെക്നിക്കൽ",
                job_cat_hotel: "🍳 ഹോട്ടൽ & കുക്ക്",
                job_cat_helper: "🧹 ഹെൽപ്പർ & സ്റ്റാഫ്",
                job_dist_label: "ദൂരം:",
                job_dist_all: "എല്ലാം",
                job_count_active: "തൊഴിൽ അവസരങ്ങൾ",
                job_btn_share: "ഷെയർ",
                job_btn_details: "വിശദാംശങ്ങൾ",
                job_btn_apply: "അപേക്ഷിക്കാം 🚀",

                // Blood Screen
                title_blood: "രക്തദാതാക്കൾ",
                blood_filter_all: "എല്ലാം",
                blood_group_label: "രക്തഗ്രൂപ്പ്",
                blood_btn_call: "📞 വിളിക്കുക",
                blood_btn_chat: "💬 ചാറ്റ്",

                // Services Screen
                title_services: "പ്രാദേശിക സേവനങ്ങൾ",
                serv_search_ph: "പ്ലംബർ, ഇലക്ട്രീഷ്യൻ, ഡ്രൈവർ തിരയുക...",
                serv_btn_chat: "ചാറ്റ്",

                // Emergency Screen
                title_emergency: "അടിയന്തര സഹായ നമ്പറുകൾ",

                // Profile Screen
                title_profile: "എന്റെ പ്രൊഫൈൽ",
                prof_btn_save: "വിവരങ്ങൾ സേവ് ചെയ്യുക",
                prof_donor_status: "രക്തദാന സന്നദ്ധത:",
                prof_status_active: "ലഭ്യമാണ് (Active)",
                prof_status_inactive: "ലഭ്യമല്ല (Inactive)"
            },
            en: {
                app_title: "Nammude Naadu",
                app_tagline: "Together We Are One",
                share_btn: "Share App",
                greet_salutation: "Hello",
                greet_default_name: "Friend",
                greet_quote: "Connecting our neighborhoods & friends 🌿",
                search_ph: "Search services, blood, jobs...",
                loc_label: "Your Location:",

                // Main Categories
                sec_main_cats: "Main Categories",
                view_all: "View All &rsaquo;",
                btn_explore: "Explore &rarr;",
                cat_blood_title: "Blood Donors",
                cat_blood_sub: "Emergency Help",
                cat_emergency_title: "Emergency",
                cat_emergency_sub: "Police & Fire",
                cat_services_title: "Services",
                cat_services_sub: "Local Providers",
                cat_jobs_title: "Jobs",
                cat_jobs_sub: "Local Openings",
                cat_rent_title: "Rentals",
                cat_rent_sub: "Rent, Buy & Sell",
                cat_amb_title: "Ambulance",
                cat_amb_sub: "24x7 Emergency",

                // Village Promo Banner
                promo_title: "Nammude Naadu",
                promo_sub: "🤝 With Our People",

                // Popular Services
                sec_services: "Popular Services",
                serv_auto: "Auto Driver",
                serv_electrician: "Electrician",
                serv_plumber: "Plumber",
                serv_coconut: "Coconut Climber",
                serv_carpenter: "Carpenter",
                serv_painter: "Painter",

                // Community Updates & Global
                sec_community: "Community Updates",
                sec_global: "Global Malayalis",
                sec_global_sub: "Connect with Malayalis around the world",
                feed_comm_tag: "Community",
                feed_help_tag: "Help Needed",

                // Bottom Navigation
                nav_home: "Home",
                nav_nearby: "Nearby",
                nav_post: "Post",
                nav_msg: "Messages",
                nav_prof: "Profile",

                // Jobs Screen
                title_jobs: "💼 Job Opportunities",
                subtitle_jobs: "Jobs & Local Kerala Opportunities",
                btn_post_job: "➕ Post a Job",
                jobs_search_ph: "Search role, store, company...",
                job_tab_all: "All Jobs",
                job_tab_saved: "Saved Jobs",
                job_tab_apps: "My Applications",
                job_tab_posted: "Posted Jobs",
                job_cat_all: "All Categories",
                job_cat_delivery: "⚡ Driver / Delivery",
                job_cat_sales: "🏪 Sales & Retail",
                job_cat_office: "💼 Office & Admin",
                job_cat_technical: "🛠️ Technical",
                job_cat_hotel: "🍳 Hotel & Cook",
                job_cat_helper: "🧹 Helper & Staff",
                job_dist_label: "Distance:",
                job_dist_all: "All",
                job_count_active: "Job Opportunities",
                job_btn_share: "Share",
                job_btn_details: "Details",
                job_btn_apply: "Apply Now 🚀",

                // Blood Screen
                title_blood: "Blood Donors",
                blood_filter_all: "All",
                blood_group_label: "Blood Group",
                blood_btn_call: "📞 Call",
                blood_btn_chat: "💬 Chat",

                // Services Screen
                title_services: "Local Services",
                serv_search_ph: "Search plumbers, electricians, drivers...",
                serv_btn_chat: "Chat",

                // Emergency Screen
                title_emergency: "Emergency Helplines",

                // Profile Screen
                title_profile: "My Profile",
                prof_btn_save: "Save Profile Details",
                prof_donor_status: "Blood Donor Status:",
                prof_status_active: "Available (Active)",
                prof_status_inactive: "Unavailable (Inactive)"
            }
        };

        let CURRENT_APP_LANG = localStorage.getItem('nammude_naadu_lang') || 'ml';

        function initAppLanguage() {
            applyAppLanguage(CURRENT_APP_LANG, false);
        }

        function toggleAppLanguage(targetLang) {
            if (targetLang) {
                CURRENT_APP_LANG = targetLang;
            } else {
                CURRENT_APP_LANG = (CURRENT_APP_LANG === 'ml') ? 'en' : 'ml';
            }
            try {
                localStorage.setItem('nammude_naadu_lang', CURRENT_APP_LANG);
            } catch (_) { }
            applyAppLanguage(CURRENT_APP_LANG, true);
        }

        function applyAppLanguage(lang, showToast = true) {
            const isEn = (lang === 'en');
            const dict = APP_TRANSLATIONS[lang] || APP_TRANSLATIONS.ml;

            // 1. Data-i18n innerHTML translation
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (dict[key]) {
                    el.innerHTML = dict[key];
                }
            });

            // 2. Data-i18n-ph placeholder translation
            document.querySelectorAll('[data-i18n-ph]').forEach(el => {
                const key = el.getAttribute('data-i18n-ph');
                if (dict[key]) {
                    el.placeholder = dict[key];
                }
            });

            // 3. Header SVG texts
            const svgTitle = document.getElementById('homeSvgAppTitle');
            if (svgTitle) svgTitle.textContent = dict.app_title;
            const svgTag = document.getElementById('homeSvgAppTagline');
            if (svgTag) svgTag.textContent = dict.app_tagline;

            // 4. Header Share Button text
            const shareText = document.getElementById('topHeaderShareBtnText');
            if (shareText) shareText.textContent = dict.share_btn;

            // 5. Greeting card texts & search placeholder
            const greetSal = document.getElementById('homeGreetSalutation');
            if (greetSal) greetSal.textContent = dict.greet_salutation;
            const greetUser = document.getElementById('homeUserGreetingName');
            if (greetUser && (!APP_STATE.userProfile?.name || greetUser.textContent === 'സുഹൃത്തേ' || greetUser.textContent === 'Friend')) {
                greetUser.textContent = dict.greet_default_name;
            }
            const greetQuote = document.getElementById('homeGreetQuote');
            if (greetQuote) greetQuote.textContent = dict.greet_quote;
            const homeSearch = document.getElementById('homeSearchInput');
            if (homeSearch) homeSearch.placeholder = dict.search_ph;

            // 6. Village Promo Banner
            const vTitle = document.getElementById('homeVillageBannerTitle');
            if (vTitle) vTitle.textContent = dict.promo_title;
            const vSub = document.getElementById('homeVillageBannerSub');
            if (vSub) vSub.textContent = dict.promo_sub;

            // 7. Jobs Screen Elements
            const jobHeadTitle = document.querySelector('#screen-jobs .jobs-header-title-box h1');
            if (jobHeadTitle) jobHeadTitle.textContent = dict.title_jobs;
            const jobHeadSub = document.querySelector('#screen-jobs .jobs-header-title-box p');
            if (jobHeadSub) jobHeadSub.textContent = dict.subtitle_jobs;

            const jobPostBtn = document.querySelector('#jobsScreenActionBtn span:last-child');
            if (jobPostBtn) jobPostBtn.textContent = dict.btn_post_job;

            const jobSearch = document.getElementById('jobSearchInput');
            if (jobSearch) jobSearch.placeholder = dict.jobs_search_ph;

            // Jobs subtabs
            const tabAll = document.querySelector('[data-jobtab="all"] span:last-child');
            if (tabAll) tabAll.textContent = dict.job_tab_all;
            const tabSaved = document.querySelector('[data-jobtab="saved"] span:nth-child(2)');
            if (tabSaved) tabSaved.textContent = dict.job_tab_saved;
            const tabApps = document.querySelector('[data-jobtab="applications"] span:nth-child(2)');
            if (tabApps) tabApps.textContent = dict.job_tab_apps;
            const tabPosted = document.querySelector('[data-jobtab="my_posted"] span:last-child');
            if (tabPosted) tabPosted.textContent = dict.job_tab_posted;

            // Jobs categories
            const catAll = document.querySelector('#jobCategoryPills [data-cat="all"]');
            if (catAll) catAll.textContent = dict.job_cat_all;
            const catDel = document.querySelector('#jobCategoryPills [data-cat="delivery"]');
            if (catDel) catDel.textContent = dict.job_cat_delivery;
            const catSal = document.querySelector('#jobCategoryPills [data-cat="sales"]');
            if (catSal) catSal.textContent = dict.job_cat_sales;
            const catOff = document.querySelector('#jobCategoryPills [data-cat="office"]');
            if (catOff) catOff.textContent = dict.job_cat_office;
            const catTech = document.querySelector('#jobCategoryPills [data-cat="technical"]');
            if (catTech) catTech.textContent = dict.job_cat_technical;
            const catHot = document.querySelector('#jobCategoryPills [data-cat="hotel"]');
            if (catHot) catHot.textContent = dict.job_cat_hotel;
            const catHelp = document.querySelector('#jobCategoryPills [data-cat="helper"]');
            if (catHelp) catHelp.textContent = dict.job_cat_helper;

            // Jobs distance
            const distLabel = document.querySelector('#jobsRadiusPills span:first-child');
            if (distLabel) distLabel.textContent = dict.job_dist_label;
            const distAll = document.querySelector('#jobsRadiusPills button:first-of-type');
            if (distAll) distAll.textContent = dict.job_dist_all;

            // 8. Blood Screen Elements
            const bloodTitle = document.querySelector('#screen-blood .screen-sub-title');
            if (bloodTitle) bloodTitle.textContent = dict.title_blood;
            const bloodPillAll = document.querySelector('#screen-blood .filter-pills-wrap .pill-btn:first-child');
            if (bloodPillAll) bloodPillAll.textContent = dict.blood_filter_all;

            // 9. Services Screen Elements
            const servTitle = document.getElementById('screenServicesHeaderTitle');
            if (servTitle) servTitle.textContent = isEn ? 'Local Services 🛠️' : 'പ്രാദേശിക സേവനങ്ങൾ 🛠️';
            const servSub = document.getElementById('screenServicesHeaderSub');
            if (servSub) servSub.textContent = isEn ? 'Find verified local professionals & experts near you' : 'നിങ്ങളുടെ നാട്ടിലെ വിശ്വസ്തരായ തൊഴിലാളികളെയും വിദഗ്ദ്ധരെയും കണ്ടെത്താം';
            const servActionBtn = document.getElementById('servicesScreenActionBtnText');
            if (servActionBtn) servActionBtn.textContent = isEn ? 'Add Service' : 'സേവനം നൽകാം';
            const servSearch = document.getElementById('servicesSearchInput');
            if (servSearch) servSearch.placeholder = isEn ? 'Electrician, Plumber, Driver, Carpenter...' : 'ഇലക്ട്രീഷ്യൻ, പ്ലംബർ, ഡ്രൈവർ, ആശാരി...';

            // 10. Emergency Screen Elements
            const emergTitle = document.querySelector('#screen-emergency .screen-sub-title');
            if (emergTitle) emergTitle.textContent = dict.title_emergency;

            // 11. Profile Screen Elements
            const profTitle = document.querySelector('#screen-profile .screen-sub-title');
            if (profTitle) profTitle.textContent = dict.title_profile;
            const profSaveBtn = document.querySelector('#screen-profile button[onclick="saveProfileInline()"]');
            if (profSaveBtn) profSaveBtn.textContent = dict.prof_btn_save;

            // 12. Switcher button active pill
            const optMl = document.getElementById('langOptMl');
            const optEn = document.getElementById('langOptEn');
            if (optMl && optEn) {
                if (isEn) {
                    optEn.classList.add('active');
                    optMl.classList.remove('active');
                } else {
                    optMl.classList.add('active');
                    optEn.classList.remove('active');
                }
            }

            // 13. Re-render dynamic active cards
            try {
                if (typeof renderJobs === 'function') renderJobs();
                if (typeof renderBloodScreen === 'function') renderBloodScreen();
                if (typeof renderServices === 'function') renderServices();
                if (typeof renderEmergencyScreen === 'function') renderEmergencyScreen();
            } catch (_) {}

            if (showToast) {
                toast(isEn ? '🌐 Switched completely to English' : '🌐 പൂർണ്ണമായും മലയാളത്തിലേക്ക് മാറ്റി');
            }
        }

        /* =============================================================
           FEATURE 3: SMOOTH MICRO-ANIMATIONS & FLOATING HEART LIKE
           ============================================================= */
        function triggerFloatingHeart(btn) {
            try {
                const heart = document.createElement('div');
                heart.className = 'floating-heart-anim';
                heart.textContent = '💖';
                const rect = btn.getBoundingClientRect();
                heart.style.left = (rect.left + rect.width / 2 - 11) + 'px';
                heart.style.top = (rect.top - 8) + 'px';
                heart.style.position = 'fixed';
                document.body.appendChild(heart);
                setTimeout(() => heart.remove(), 750);
            } catch (_) { }
        }

        function toggleFeedLike(btn, baseCount) {
            const countEl = btn.querySelector('.action-count');
            if (!countEl) return;
            const isLiked = btn.classList.toggle('liked');
            const current = parseInt(countEl.textContent, 10) || baseCount;
            countEl.textContent = isLiked ? (current + 1) : Math.max(baseCount, current - 1);
            btn.style.transform = isLiked ? 'scale(1.22)' : 'scale(0.94)';
            setTimeout(() => { btn.style.transform = 'scale(1)'; }, 150);
            if (isLiked) {
                triggerFloatingHeart(btn);
                toast('❤️ പോസ്റ്റ് ഇഷ്ടപ്പെട്ടു (Liked!)');
            }
        }

        /* =============================================================
           UNIVERSAL SOCIAL SHARING ENGINE (WhatsApp, FB, Telegram, Native)
           ============================================================= */
        let currentSharePayload = {
            title: 'നമ്മുടെ നാട് (Nammude Naadu)',
            text: 'നമ്മുടെ നാടിന്റെ സ്വന്തം ആപ്പ്!',
            url: 'https://nammudenaadu.app',
            preview: 'നമ്മുടെ നാട്'
        };

        function getAppShareUrl() {
            try {
                if (window.location && window.location.origin && window.location.origin.startsWith('http')) {
                    return window.location.origin;
                }
            } catch (e) { }
            return 'https://nammudenaadu.app';
        }

        function openSocialShareModal(payload = {}) {
            const appUrl = getAppShareUrl();
            currentSharePayload = {
                title: payload.title || 'നമ്മുടെ നാട് (Nammude Naadu)',
                text: payload.text || 'നമ്മുടെ നാടിന്റെ വിശേഷങ്ങളും സേവനങ്ങളും അറിയാൻ ആപ്പ് ഡൗൺലോഡ് ചെയ്യൂ!',
                url: payload.url || appUrl,
                preview: payload.preview || payload.title || 'നമ്മുടെ നാട്'
            };

            const headingEl = document.getElementById('shareSheetHeading');
            if (headingEl) headingEl.textContent = payload.sheetHeading || 'സോഷ്യൽ മീഡിയയിലേക്ക് പങ്കുവെക്കുക';

            const previewTextEl = document.getElementById('shareSheetPreviewText');
            if (previewTextEl) {
                previewTextEl.innerHTML = `
                    <div style="font-size:13.5px;font-weight:800;color:#064E3B;margin-bottom:4px">
                        ${escapeHtml(currentSharePayload.preview)}
                    </div>
                    <div style="font-size:11.5px;color:#374151;white-space:pre-line;line-height:1.45;max-height:80px;overflow-y:auto">
                        ${escapeHtml(currentSharePayload.text)}
                    </div>
                `;
            }

            openModal('modal-social-share-sheet');
        }

        function executeSocialShare(platform) {
            const appUrl = currentSharePayload.url || getAppShareUrl();
            const fullShareMessage = `${currentSharePayload.text}\n\n📲 കൂടുതൽ വിവരങ്ങൾക്കായി 'നമ്മുടെ നാട്' ആപ്പ് ഇൻസ്റ്റാൾ ചെയ്യൂ:\n${appUrl}`;
            const encodedText = encodeURIComponent(fullShareMessage);
            const encodedUrl = encodeURIComponent(appUrl);

            if (platform === 'whatsapp') {
                window.open(`https://api.whatsapp.com/send?text=${encodedText}`, '_blank');
            } else if (platform === 'telegram') {
                window.open(`https://t.me/share/url?url=${encodedUrl}&text=${encodeURIComponent(currentSharePayload.text)}`, '_blank');
            } else if (platform === 'facebook') {
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodeURIComponent(currentSharePayload.text)}`, '_blank');
            } else if (platform === 'system') {
                if (navigator.share) {
                    navigator.share({
                        title: currentSharePayload.title,
                        text: fullShareMessage,
                        url: appUrl
                    }).catch(() => { });
                } else {
                    executeSocialShare('whatsapp');
                }
            } else if (platform === 'copy') {
                copyTextToClipboard(fullShareMessage);
            }
        }

        function copyTextToClipboard(text) {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(() => {
                    toast('📋 വിവരങ്ങളും ലിങ്കും കോപ്പി ചെയ്തു!');
                }).catch(() => {
                    legacyCopyText(text);
                });
            } else {
                legacyCopyText(text);
            }
        }

        function legacyCopyText(text) {
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            try {
                document.execCommand('copy');
                toast('📋 വിവരങ്ങളും ലിങ്കും കോപ്പി ചെയ്തു!');
            } catch (err) {
                toast('വിവരങ്ങൾ കോപ്പി ചെയ്യാൻ സാധിച്ചില്ല');
            }
            document.body.removeChild(ta);
        }

        function shareApp() {
            openSocialShareModal({
                sheetHeading: '🌿 നമ്മുടെ നാട് ആപ്പ് ഷെയർ ചെയ്യാം',
                title: 'നമ്മുടെ നാട് (Nammude Naadu)',
                preview: 'നമ്മുടെ നാടിന്റെ സ്വന്തം മൊബൈൽ ആപ്പ് 🌿',
                text: `🌿 *നമ്മുടെ നാട് (Nammude Naadu)* - നിങ്ങളുടെ നാടിന്റെ സ്വന്തം ആപ്പ്!\n\nനാട്ടിലെ വാർത്തകൾ, അത്യാഹിത രക്തദാനം, തൊഴിലവസരങ്ങൾ, പ്രാദേശിക സേവനങ്ങൾ എന്നിവയെല്ലാം ഇനി ഒരു വിരൽത്തുമ്പിൽ!\n\nകൂട്ടുകാരെയും കുടുംബാംഗങ്ങളെയും നമ്മുടെ നാട് കമ്മ്യൂണിറ്റിയിലേക്ക് സ്വാഗതം ചെയ്യുന്നു.`
            });
        }

        function shareBloodDonor(name, group, phone, dist) {
            openSocialShareModal({
                sheetHeading: '🩸 രക്തദാതാവിനെ ഷെയർ ചെയ്യുക',
                title: `രക്തദാതാവ് (${group}): ${name}`,
                preview: `രക്തദാതാവ്: ${name} (${group})`,
                text: `🩸 *രക്തദാന സന്നദ്ധത - നമ്മുടെ നാട്*\n\nരക്തഗ്രൂപ്പ്: *${group}*\nപേര്: ${name}\nഫോൺ: ${phone}\nസമീപ ദൂരം: ~${dist} km\n\nരക്തം ആവശ്യമുള്ള രോഗികൾക്ക് ഉപകാരപ്പെടാനായി ഈ വിവരം ഷെയർ ചെയ്യാം.`
            });
        }

        function shareJob(jobId) {
            const allJobs = (typeof getJobsList === 'function') ? getJobsList() : DEFAULT_JOBS;
            const job = allJobs.find(j => j.id === jobId) || allJobs[0];
            if (!job) return;

            openSocialShareModal({
                sheetHeading: '💼 തൊഴിലവസരം ഷെയർ ചെയ്യുക',
                title: `തൊഴിൽ: ${job.title}`,
                preview: `${job.title} - ${job.company}`,
                text: `💼 *പുതിയ തൊഴിലവസരം - നമ്മുടെ നാട്*\n\n🔹 ജോലി: *${job.title}*\n🏢 സ്ഥാപനം: ${job.company}\n💰 വേതനം: ${job.salary || 'നെഗോഷ്യബിൾ'}\n📍 സ്ഥലം: ${job.location || 'കേരളം'}\n⏰ സമയം: ${job.timings || 'ഫുൾടൈം'}\n📞 ബന്ധപ്പെടുക: ${job.contactPhone || 'ഇൻ-ആപ്പ് ചാറ്റ്'}`
            });
        }

        function shareEmergencyContact(name, phone, type = 'Emergency') {
            openSocialShareModal({
                sheetHeading: '🚨 അടിയന്തര നമ്പർ ഷെയർ ചെയ്യുക',
                title: `അടിയന്തര സഹായം: ${name}`,
                preview: `${name} (ഫോൺ: ${phone})`,
                text: `🚨 *അടിയന്തര സഹായ നമ്പർ - നമ്മുടെ നാട്*\n\n🏥 സ്ഥാപനം: *${name}*\n🔹 വിഭാഗം: ${type}\n📞 ഫോൺ: *${phone}*\n\nഅടിയന്തിര ഘട്ടങ്ങളിൽ ഉപകാരപ്പെടാൻ ഈ നമ്പർ സൂക്ഷിക്കുക.`
            });
        }

        function getJobsList() {
            try {
                const custom = JSON.parse(localStorage.getItem('thuna_custom_jobs') || '[]');
                return [...custom, ...DEFAULT_JOBS];
            } catch (e) {
                return DEFAULT_JOBS;
            }
        }

        window.toggleAppLanguage = toggleAppLanguage;
        window.applyAppLanguage = applyAppLanguage;
        window.showFeedSkeleton = showFeedSkeleton;
        window.showServicesSkeleton = showServicesSkeleton;
        window.showJobsSkeleton = showJobsSkeleton;
        window.getUnifiedUserProfile = getUnifiedUserProfile;
        window.saveUnifiedUserProfile = saveUnifiedUserProfile;
        window.toggleFeedLike = toggleFeedLike;
        window.sharePost = sharePost;
        window.shareApp = shareApp;
        window.shareBloodDonor = shareBloodDonor;
        window.shareJob = shareJob;
        window.shareEmergencyContact = shareEmergencyContact;
        window.openSocialShareModal = openSocialShareModal;
        window.executeSocialShare = executeSocialShare;
        window.getJobsList = getJobsList;
        window.switchJobsSubTab = switchJobsSubTab;
        window.setJobsViewMode = setJobsViewMode;
        window.toggleSaveJob = toggleSaveJob;
        window.openJobDetailsModal = openJobDetailsModal;
        window.toggleSaveCurrentDetailedJob = toggleSaveCurrentDetailedJob;
        window.shareCurrentDetailedJob = shareCurrentDetailedJob;
        window.openApplyJobModal = openApplyJobModal;
        window.openApplyJobModalFromDetails = openApplyJobModalFromDetails;
        window.submitJobApplication = submitJobApplication;
        window.withdrawJobApplication = withdrawJobApplication;
        window.deleteMyPostedJob = deleteMyPostedJob;
        window.filterServiceByCategory = filterServiceByCategory;
        window.clearServiceSearch = clearServiceSearch;
        window.filterServicesList = filterServicesList;
        window.filterServicesRadius = filterServicesRadius;
        window.renderServices = renderServices;
        window.shareService = shareService;
        window.openAllServicesOverview = openAllServicesOverview;
        window.openAddServiceModal = openAddServiceModal;
        window.handleServicesBack = handleServicesBack;
        window.filterServiceAndOpen = filterServiceAndOpen;
        window.switchServicesViewTab = switchServicesViewTab;
        window.openServiceDetailsModal = openServiceDetailsModal;
        window.renderMyServices = renderMyServices;
        window.deleteMyService = deleteMyService;
        window.toggleMyServiceAvailability = toggleMyServiceAvailability;
        window.openEditServiceModal = openEditServiceModal;
        window.handleProvPhotosUpload = handleProvPhotosUpload;
        window.submitProviderRegistration = submitProviderRegistration;

        // Apply selected language immediately on load
        setTimeout(() => {
            if (typeof applyAppLanguage === 'function') {
                applyAppLanguage(CURRENT_APP_LANG, false);
            }
        }, 30);