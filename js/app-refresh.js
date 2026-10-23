/**
 * Nammude Naadu — Modern Touch Pull-to-Refresh & In-App Sync Engine
 * Supports:
 * 1. Mobile touch pull-to-refresh gesture with physics damping
 * 2. Top-bar circular refresh button with 360° spin animation
 * 3. Bottom nav active tab tap-to-refresh
 * 4. Automatic background refresh when device comes back online
 */

(function () {
  'use strict';

  let isRefreshing = false;
  let startY = 0;
  let currentY = 0;
  let isTrackingTouch = false;
  let ptrPill = null;
  let ptrIcon = null;
  let ptrText = null;

  const PULL_THRESHOLD = 65; // pixels required to trigger refresh
  const MAX_PULL = 110;

  // Initialize once DOM is ready
  function init() {
    ptrPill = document.getElementById('pullToRefreshIndicator');
    ptrIcon = document.getElementById('ptrIcon');
    ptrText = document.getElementById('ptrText');

    setupTouchPullToRefresh();
    setupNetworkSync();
    setupBottomNavRefresh();
  }

  /**
   * Primary app data refresh routine
   */
  async function refreshActiveScreen(triggerBtn = null) {
    if (isRefreshing) return;
    isRefreshing = true;

    // 1. Start spinning animation
    const spinIcons = document.querySelectorAll('.refresh-spinner-icon, #ptrIcon');
    spinIcons.forEach(el => el.classList.add('refresh-spin-active'));

    if (triggerBtn) {
      triggerBtn.classList.add('refreshing-btn');
    }

    // 2. Light haptic tap on refresh start
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try { navigator.vibrate(30); } catch (_) {}
    }

    try {
      const cur = (typeof APP_STATE !== 'undefined' && APP_STATE.currentScreen) ? APP_STATE.currentScreen : 'home';
      const syncTasks = [];

      // A. Unread chat count update (lightweight)
      if (typeof window.updateUnreadBadge === 'function') {
        syncTasks.push(Promise.resolve().then(() => window.updateUnreadBadge()).catch(() => {}));
      }

      // B. Screen specific data sync (only network data, NO heavy GPS hardware spin-up)
      if (cur === 'home') {
        // Supabase Posts sync
        if (window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.syncPosts === 'function') {
          syncTasks.push(window.NN_SUPABASE_SERVICES.syncPosts().catch(() => {}));
        }

        await Promise.all(syncTasks);

        if (typeof window.renderHomeCommunityFeed === 'function') {
          window.renderHomeCommunityFeed();
        }
      } else if (cur === 'community') {
        if (typeof window.refreshCommunityFeedLive === 'function') {
          await window.refreshCommunityFeedLive();
        } else if (typeof window.renderCommunityFeed === 'function') {
          window.renderCommunityFeed();
        }
      } else if (cur === 'jobs') {
        if (typeof window.refreshJobsLive === 'function') {
          await window.refreshJobsLive();
        } else if (typeof window.renderJobsScreen === 'function') {
          window.renderJobsScreen();
        }
      } else if (cur === 'rentals') {
        if (typeof window.refreshRentalsLive === 'function') {
          await window.refreshRentalsLive();
        }
      } else if (cur === 'nearby' || cur === 'services') {
        if (typeof window.renderNearbyScreen === 'function') {
          window.renderNearbyScreen();
        }
      } else if (cur === 'blood') {
        if (typeof window.renderBloodScreen === 'function') {
          window.renderBloodScreen();
        }
      } else if (cur === 'chat') {
        if (typeof window.renderChatInbox === 'function') {
          window.renderChatInbox();
        }
      }

      // Keep transition natural
      await new Promise(r => setTimeout(r, 350));

      // Haptic confirmation
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        try { navigator.vibrate([25, 45, 25]); } catch (_) {}
      }

      if (typeof window.showToast === 'function') {
        window.showToast('✅ ആപ്പ് വിവരങ്ങൾ വിജയകരമായി പുതുക്കി!');
      }
    } catch (err) {
      console.warn('[AppRefresh] Refresh notice:', err);
      if (typeof window.showToast === 'function') {
        window.showToast('വിവരങ്ങൾ ലഭ്യമാക്കി ✅');
      }
    } finally {
      // Clean up UI states
      spinIcons.forEach(el => el.classList.remove('refresh-spin-active'));
      if (triggerBtn) {
        triggerBtn.classList.remove('refreshing-btn');
      }

      if (ptrPill) {
        if (ptrText) ptrText.textContent = 'വിജയകരമായി പുതുക്കി! ✅';
        setTimeout(() => {
          ptrPill.classList.remove('refreshing', 'pulling');
          ptrPill.style.transform = '';
          ptrPill.style.opacity = '';
          isRefreshing = false;
        }, 450);
      } else {
        isRefreshing = false;
      }
    }
  }

  /**
   * Setup Mobile Native Touch Pull-To-Refresh
   */
  function setupTouchPullToRefresh() {
    if (!('ontouchstart' in window)) return; // Only on touch-enabled devices

    window.addEventListener('touchstart', (e) => {
      if (isRefreshing) return;
      if (e.touches.length !== 1) return;

      // Don't pull-to-refresh if user has a modal open
      const openModal = document.querySelector('.modal-overlay.active, .modal-overlay[style*="display: flex"], .modal-overlay[style*="display: block"]');
      if (openModal) return;

      // Check if user is scrolled to the absolute top of the page
      const docScrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      if (docScrollTop <= 2) {
        startY = e.touches[0].clientY;
        isTrackingTouch = true;
      }
    }, { passive: true });

    let touchRaf = null;

    window.addEventListener('touchmove', (e) => {
      if (!isTrackingTouch || isRefreshing) return;
      currentY = e.touches[0].clientY;

      if (touchRaf) return;
      touchRaf = requestAnimationFrame(() => {
        touchRaf = null;
        if (!isTrackingTouch || isRefreshing) return;
        if (!ptrPill) ptrPill = document.getElementById('pullToRefreshIndicator');
        if (!ptrIcon) ptrIcon = document.getElementById('ptrIcon');
        if (!ptrText) ptrText = document.getElementById('ptrText');
        if (!ptrPill) return;

        const rawDelta = currentY - startY;

        // Only respond when pulling downwards from top
        if (rawDelta > 0) {
          const pullDistance = Math.min(MAX_PULL, rawDelta * 0.42);

          if (pullDistance > 8) {
            ptrPill.classList.add('pulling');
            ptrPill.style.transform = `translate(-50%, ${pullDistance - 45}px)`;
            ptrPill.style.opacity = Math.min(1, pullDistance / 40);

            if (pullDistance >= PULL_THRESHOLD) {
              if (ptrIcon) {
                ptrIcon.textContent = '✨';
                ptrIcon.style.transform = 'rotate(180deg)';
              }
              if (ptrText) ptrText.textContent = 'വിട്ടാൽ പുതുക്കും...';
            } else {
              if (ptrIcon) {
                ptrIcon.textContent = '⬇️';
                ptrIcon.style.transform = 'rotate(0deg)';
              }
              if (ptrText) ptrText.textContent = 'താഴേക്ക് വലിക്കുക...';
            }
          }
        } else {
          // Dragging upwards, cancel tracking
          isTrackingTouch = false;
          resetPill();
        }
      });
    }, { passive: true });

    window.addEventListener('touchend', () => {
      if (!isTrackingTouch || isRefreshing) return;
      isTrackingTouch = false;

      const rawDelta = currentY - startY;
      const pullDistance = Math.min(MAX_PULL, rawDelta * 0.42);

      if (pullDistance >= PULL_THRESHOLD) {
        // Trigger pull-to-refresh
        if (ptrPill) {
          ptrPill.classList.remove('pulling');
          ptrPill.classList.add('refreshing');
          if (ptrIcon) ptrIcon.textContent = '🔄';
          if (ptrText) ptrText.textContent = 'വിവരങ്ങൾ പുതുക്കുന്നു...';
        }
        refreshActiveScreen();
      } else {
        resetPill();
      }
      startY = 0;
      currentY = 0;
    }, { passive: true });
  }

  function resetPill() {
    if (!ptrPill) return;
    ptrPill.classList.remove('pulling', 'refreshing');
    ptrPill.style.transform = '';
    ptrPill.style.opacity = '';
    if (ptrIcon) {
      ptrIcon.textContent = '⬇️';
      ptrIcon.style.transform = 'rotate(0deg)';
    }
    if (ptrText) ptrText.textContent = 'താഴേക്ക് വലിക്കുക...';
  }

  /**
   * Listen for network reconnection to auto-refresh
   */
  function setupNetworkSync() {
    window.addEventListener('online', () => {
      if (typeof window.showToast === 'function') {
        window.showToast('🌐 ഇന്റർനെറ്റ് കണക്റ്റായി! വിവരങ്ങൾ പുതുക്കുന്നു...');
      }
      setTimeout(() => {
        refreshActiveScreen();
      }, 800);
    });
  }

  /**
   * Re-tapping active bottom nav tab triggers refresh
   */
  function setupBottomNavRefresh() {
    document.querySelectorAll('.bottom-nav .nav-item').forEach(item => {
      item.addEventListener('click', () => {
        const page = item.dataset.page;
        if (typeof APP_STATE !== 'undefined' && APP_STATE.currentScreen === page) {
          // Already on this page!
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setTimeout(() => {
            refreshActiveScreen();
          }, 150);
        }
      });
    });
  }

  // Export globally
  window.refreshActiveScreen = refreshActiveScreen;
  window.initAppRefresh = init;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
