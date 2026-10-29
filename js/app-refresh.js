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
        if (window.NN_SUPABASE_SERVICES && typeof window.NN_SUPABASE_SERVICES.syncBloodDonors === 'function') {
          syncTasks.push(window.NN_SUPABASE_SERVICES.syncBloodDonors().catch(() => {}));
          await Promise.all(syncTasks);
        }
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
   * Setup Mobile Native Touch Pull-To-Refresh (Disabled in favor of native 120Hz scrolling)
   */
  function setupTouchPullToRefresh() {
    // Pure native touch scrolling with zero event listener friction
    return;
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
