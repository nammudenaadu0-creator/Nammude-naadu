/**
 * Nammude Naadu - Automated Test Suite
 * Validates Security, Consistency, and Play Store Readiness
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

let passedTests = 0;
let failedTests = 0;

function runTest(testName, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${testName}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${testName}`);
    console.error(`     Error: ${err.message}`);
    failedTests++;
  }
}

console.log('\n🧪 [Nammude Naadu] Running Pre-Release Automated Tests...\n');

// 1. Version Synchronization
runTest('Versions are synchronized across all configuration files', () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));
  const pkgLock = JSON.parse(fs.readFileSync(path.join(__dirname, '../package-lock.json'), 'utf8'));
  const versionJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../version.json'), 'utf8'));
  const buildGradle = fs.readFileSync(path.join(__dirname, '../android/app/build.gradle'), 'utf8');

  const expectedVersion = '1.0.29';
  assert.strictEqual(pkg.version, expectedVersion, `package.json version is ${pkg.version}`);
  assert.strictEqual(pkgLock.version, expectedVersion, `package-lock.json version is ${pkgLock.version}`);
  assert.strictEqual(versionJson.versionName, expectedVersion, `version.json versionName is ${versionJson.versionName}`);
  assert.ok(buildGradle.includes(`versionName "${expectedVersion}"`), 'build.gradle versionName matches');
  assert.ok(buildGradle.includes(`versionCode 29`), 'build.gradle versionCode is 29');
});

runTest('English is the migrated default while language selection remains available', () => {
  const i18n = fs.readFileSync(path.join(__dirname, '../js/i18n-translations.js'), 'utf8');
  const engine = fs.readFileSync(path.join(__dirname, '../js/nammude-naadu-engine.js'), 'utf8');
  const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
  const admin = fs.readFileSync(path.join(__dirname, '../admin.html'), 'utf8');
  assert.ok(i18n.includes("currentLang = 'en'"), 'First-time and upgraded installs default to English');
  assert.ok(i18n.includes("setItem('nn_app_english_default_v1', 'true')"), 'Existing language preferences receive a one-time English migration');
  assert.ok(i18n.includes("if (!TRANSLATIONS[lang]) lang = 'en'"), 'Invalid locale values fall back to English');
  assert.ok(html.includes('<html lang="en">'), 'App document declares English');
  assert.ok(html.includes("onclick=\"setAppLanguage('ml')\"") && html.includes("onclick=\"setAppLanguage('hi')\""), 'Malayalam and Hindi can still be selected');
  assert.ok(html.includes('>Categories</span>') && html.includes('>Nearby Help</div>'), 'Home category labels are displayed in English');
  assert.ok(admin.includes('Admin Authentication') && admin.includes('Welcome, Admin!'), 'Admin authentication is displayed in English');
});

// 2. Android Security Settings
runTest('Android network security (cleartext & mixed content disabled)', () => {
  const capConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '../capacitor.config.json'), 'utf8'));
  assert.strictEqual(capConfig.server.cleartext, false, 'cleartext must be false');
  assert.strictEqual(capConfig.android.allowMixedContent, false, 'allowMixedContent must be false');
});

// 3. Supabase Schema Security
runTest('Supabase Database RLS policies are strictly hardened', () => {
  const schema = fs.readFileSync(path.join(__dirname, '../supabase-schema.sql'), 'utf8');
  assert.ok(!schema.includes('create policy "Allow public select messages" on public.messages for select using (true);'), 'Insecure public messages select must be removed');
  assert.ok(!schema.includes('create policy "Allow public delete messages" on public.messages for delete using (true);'), 'Insecure public messages delete must be removed');
  assert.ok(schema.includes('create policy "Deny public update messages" on public.messages'), 'Messages must deny public updates');
  assert.ok(schema.includes('create policy "Allow delete own messages" on public.messages'), 'Messages delete must verify sender');
  assert.ok(schema.includes('create policy "Allow update own posts" on public.posts'), 'Posts update must verify author');
  assert.ok(schema.includes('create policy "Allow delete own posts" on public.posts'), 'Posts delete must verify author');
  assert.ok(schema.includes('create policy "Allow update own donor profile" on public.blood_donors'), 'Blood donor update must verify donor');
});

// 4. Service Worker Offline Error Handling
runTest('Service Worker handles offline states without null response', () => {
  const sw = fs.readFileSync(path.join(__dirname, '../sw.js'), 'utf8');
  assert.ok(!sw.includes('.catch(() => null);\n\n      return cachedResponse || fetchPromise || caches.match'), 'Unsafe fetchPromise fallback removed from sw.js');
  assert.ok(sw.includes('return new Response('), 'sw.js provides valid Response fallback on offline error');
});

// 5. OneSignal REST Key Protection
runTest('OneSignal REST API key is not stored in public localStorage', () => {
  const onesignal = fs.readFileSync(path.join(__dirname, '../js/onesignal-service.js'), 'utf8');
  assert.ok(!onesignal.includes("localStorage.getItem('nn_onesignal_rest_key')"), 'Insecure REST key retrieval removed');
});

// 6. Account Deletion Safety & Atomic Verification
runTest('Account deletion uses atomic validation preventing partial or wildcard deletion', () => {
  const schema = fs.readFileSync(path.join(__dirname, '../supabase-schema.sql'), 'utf8');
  const backend = fs.readFileSync(path.join(__dirname, '../js/supabase-backend.js'), 'utf8');
  assert.ok(schema.includes('function public.delete_user_account_secure'), 'Secure atomic account deletion stored procedure exists in SQL');
  assert.ok(backend.includes("cleanPhone.length < 10"), 'Backend strictly validates 10-digit phone before purging');
  assert.ok(backend.includes("delete_user_account_secure"), 'Backend calls atomic RPC delete_user_account_secure');
});

// 7. Chat Message Deletion Integrity
runTest('Chat message deletion verifies database success before broadcasting delete event', () => {
  const backend = fs.readFileSync(path.join(__dirname, '../js/supabase-backend.js'), 'utf8');
  assert.ok(backend.includes('if (!dbDeleted)'), 'Backend checks dbDeleted flag');
  assert.ok(backend.includes('Message delete failed on database. Broadcast skipped to maintain integrity'), 'Broadcast skipped on database delete failure');
});

runTest('Chat only broadcasts saved messages and reports failed sends', () => {
  const backend = fs.readFileSync(path.join(__dirname, '../js/supabase-backend.js'), 'utf8');
  const engine = fs.readFileSync(path.join(__dirname, '../js/nammude-naadu-engine.js'), 'utf8');
  const saveIndex = backend.indexOf("client.from('messages').insert({");
  const broadcastIndex = backend.indexOf("event: 'chat_message',", saveIndex);
  assert.ok(saveIndex >= 0 && broadcastIndex > saveIndex, 'Database insert happens before realtime broadcast');
  assert.ok(backend.includes('if (insertError)') && backend.includes('Chat message could not be saved'), 'Database insert errors are surfaced');
  assert.ok(backend.includes("event: 'chat_delivered'"), 'Recipients send a delivery receipt');
  assert.ok(backend.includes("message.status = 'delivered'"), 'Delivery receipt updates the sender message status');
  assert.ok(engine.includes("localMessage.status = 'failed'"), 'Failed local messages display a failure state');
  assert.ok(engine.includes("msg.status === 'failed'"), 'Failed message state is rendered in chat UI');
  assert.ok(engine.includes('ഈ ചാറ്റ് എൻഡ്-ടു-എൻഡ് എൻക്രിപ്റ്റ് ചെയ്തതല്ല'), 'Chat does not claim unsupported end-to-end encryption');
});

runTest('Chat notification sound plays once and active-thread push alerts are suppressed', () => {
  const backend = fs.readFileSync(path.join(__dirname, '../js/supabase-backend.js'), 'utf8');
  const engine = fs.readFileSync(path.join(__dirname, '../js/nammude-naadu-engine.js'), 'utf8');
  const fcm = fs.readFileSync(path.join(__dirname, '../js/fcm-push-service.js'), 'utf8');
  const soundFn = backend.slice(backend.indexOf('function playNotificationSound'), backend.indexOf('// Native phone notification'));
  assert.strictEqual((soundFn.match(/new Audio\(/g) || []).length, 1, 'Fallback notification plays only one audio source');
  assert.ok(backend.includes('if (!notificationScheduled) playNotificationSound()'), 'System notification sound replaces the custom fallback');
  assert.ok(engine.includes('window.ACTIVE_CHAT_KEY = chatKey'), 'Opening chat marks the active thread');
  assert.ok(fcm.includes('window.ACTIVE_CHAT_KEY === data.chatKey'), 'Foreground duplicate alert is suppressed for the active thread');
  assert.ok(engine.includes('osc.frequency.setValueAtTime(784, now)'), 'In-chat received chime uses one tone');
});

runTest('Chat uses a consistent WhatsApp-inspired palette and full-screen mobile layout', () => {
  const styles = fs.readFileSync(path.join(__dirname, '../css/nammude-naadu.css'), 'utf8');
  assert.ok(styles.includes('#modal-chat .chat-modal-header {\n  background: #075E54'), 'Chat header uses WhatsApp dark green');
  assert.ok(styles.includes('#modal-chat .chat-thread-box {\n  background-color: #ECE5DD'), 'Chat wallpaper uses warm WhatsApp neutral');
  assert.ok(styles.includes('#modal-chat .chat-bubble.outgoing {\n  background: #DCF8C6'), 'Outgoing messages use WhatsApp light green');
  assert.ok(styles.includes('#modal-chat .chat-send-btn {\n  background: #128C7E'), 'Send button uses WhatsApp teal');
  assert.ok(styles.includes('width: 100% !important;\n    max-width: none !important;\n    height: 100dvh !important'), 'Mobile chat fills the screen');
});

runTest('Unauthenticated BEAM sockets cannot join chat channels or delete messages', () => {
  const socket = fs.readFileSync(path.join(__dirname, '../backend/nammude_chat_beam/lib/nammude_chat_beam_web/channels/user_socket.ex'), 'utf8');
  const channel = fs.readFileSync(path.join(__dirname, '../backend/nammude_chat_beam/lib/nammude_chat_beam_web/channels/chat_channel.ex'), 'utf8');
  assert.ok(socket.includes('assign(:authenticated, false)'), 'Client-supplied identity is not treated as authenticated');
  assert.ok(channel.includes('reason: "authentication_required"'), 'Unauthenticated channel joins are rejected');
  assert.ok(channel.includes('reason: "message_deletion_not_supported"'), 'Unauthenticated delete-for-everyone is disabled');
});

runTest('Service registration waits for cloud save and opens the refreshed service directory', () => {
  const backend = fs.readFileSync(path.join(__dirname, '../js/supabase-backend.js'), 'utf8');
  const engine = fs.readFileSync(path.join(__dirname, '../js/nammude-naadu-engine.js'), 'utf8');
  const registerFn = engine.slice(engine.indexOf('async function submitServiceRegistration'), engine.indexOf('window.submitServiceRegistration'));
  assert.ok(backend.includes("db.from('services').upsert("), 'Service registration is saved in Supabase');
  assert.ok(backend.includes('return { success: false, error: error.message'), 'Cloud save failures are returned to the form');
  assert.ok(registerFn.includes('await saveService.call('), 'The registration form waits for the cloud save');
  assert.ok(registerFn.includes('if (!result || result.success !== true)'), 'The form does not show success on failed saves');
  assert.ok(registerFn.includes("APP_STATE.activeServiceCategory = 'all'"), 'The service directory category filter is reset');
  assert.ok(registerFn.includes("navTo('services')"), 'Successful registration opens the service directory');
});

runTest('Location is refreshed on app launch and foreground resume', () => {
  const engine = fs.readFileSync(path.join(__dirname, '../js/nammude-naadu-engine.js'), 'utf8');
  assert.ok(engine.includes('setTimeout(refreshLocationOnAppOpen, 1000)'), 'Location refresh starts after app initialization');
  assert.ok(engine.includes("addEventListener('visibilitychange'"), 'Location refresh listens for web app foreground');
  assert.ok(engine.includes("addListener('appStateChange'"), 'Location refresh listens for native app resume');
  assert.ok(engine.includes('now - lastAppLocationRefreshAt < 30000'), 'Repeated lifecycle events are throttled');
});

// 8. Admin Panel Live Supabase Integration
runTest('Admin panel operations are connected to live Supabase backend', () => {
  const adminHtml = fs.readFileSync(path.join(__dirname, '../admin.html'), 'utf8');
  const backend = fs.readFileSync(path.join(__dirname, '../js/supabase-backend.js'), 'utf8');
  assert.ok(adminHtml.includes('approveServiceProvider'), 'admin.html connects provider approval to Supabase');
  assert.ok(adminHtml.includes('rejectServiceProvider'), 'admin.html connects provider rejection to Supabase');
  assert.ok(adminHtml.includes('banUserAccount'), 'admin.html connects user banning to Supabase');
  assert.ok(adminHtml.includes('loadLiveAdminDashboardStats'), 'admin.html loads live dashboard statistics');
  assert.ok(backend.includes('approveServiceProvider'), 'supabase-backend.js provides approveServiceProvider');
  assert.ok(backend.includes('fetchAdminDashboardStats'), 'supabase-backend.js provides fetchAdminDashboardStats');
});

// 9. Build Script Strict Assertion & macOS System File Filtering
runTest('Build script copy-to-www.js validates required files and filters __MACOSX / .DS_Store', () => {
  const copyScript = fs.readFileSync(path.join(__dirname, '../copy-to-www.js'), 'utf8');
  assert.ok(copyScript.includes('CRITICAL BUILD ERROR'), 'copy-to-www.js throws error on missing files');
  assert.ok(copyScript.includes(".filter(f => !f.startsWith('.') && f !== '__MACOSX')"), 'copy-to-www.js filters hidden and __MACOSX files');
  assert.ok(copyScript.includes("base !== '.DS_Store' && base !== '__MACOSX'"), 'copy-to-www.js filters macOS system files in assets');
});

// 10. Admin Authentication Security Gate
runTest('Admin panel protects sensitive consoles with Master PIN Barrier', () => {
  const adminHtml = fs.readFileSync(path.join(__dirname, '../admin.html'), 'utf8');
  assert.ok(adminHtml.includes('id="adminAuthGate"'), 'adminAuthGate barrier element exists in admin.html');
  assert.ok(adminHtml.includes('submitAdminGatePin'), 'PIN verification function exists in admin.html');
});

// 11. Native FCM Push Notification Service
runTest('FCM Push Notification Service provides complete native background registration & tap handling', () => {
  const fcmService = fs.readFileSync(path.join(__dirname, '../js/fcm-push-service.js'), 'utf8');
  assert.ok(fcmService.includes("window.NN_FCM = {"), 'NN_FCM global service defined');
  assert.ok(fcmService.includes("nammude_naadu_messages"), 'Chat messages channel defined');
  assert.ok(fcmService.includes("nammude_naadu_alerts"), 'Alerts channel defined');
  assert.ok(fcmService.includes("pushNotificationActionPerformed"), 'System tray notification tap listener registered');
  assert.ok(fcmService.includes("syncTokenWithSupabase"), 'Supabase profile token sync implemented');
  assert.ok(fcmService.includes("handleLogout"), 'FCM token logout detachment handler implemented');
});

// 12. Capacitor Local Notifications Configuration
runTest('Capacitor configuration enables LocalNotifications with sound and icon', () => {
  const capConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '../capacitor.config.json'), 'utf8'));
  assert.ok(capConfig.plugins.LocalNotifications, 'LocalNotifications plugin configured');
  assert.strictEqual(capConfig.plugins.LocalNotifications.sound, 'notification_sound.wav', 'Sound asset is configured');
});

// 13. Android Native MainActivity Channels & Notification Intent Forwarding
runTest('MainActivity configures high-importance notification channels and handles onNewIntent', () => {
  const mainActivity = fs.readFileSync(path.join(__dirname, '../android/app/src/main/java/com/nammudenaadu/app/MainActivity.java'), 'utf8');
  assert.ok(mainActivity.includes('nammude_naadu_messages'), 'MainActivity contains nammude_naadu_messages channel');
  assert.ok(mainActivity.includes('nammude_naadu_alerts'), 'MainActivity contains nammude_naadu_alerts channel');
  assert.ok(mainActivity.includes('onNewIntent'), 'MainActivity implements onNewIntent to refresh notification click intents');
  assert.ok(mainActivity.includes('setIntent(intent)'), 'MainActivity calls setIntent to preserve latest notification data');
});

// 14. Supabase Schema FCM Migration & RLS Security
runTest('Supabase schema contains fcm_token and hardened notifications audit table with RLS', () => {
  const schema = fs.readFileSync(path.join(__dirname, '../supabase-schema.sql'), 'utf8');
  assert.ok(schema.includes('alter table public.profiles add column if not exists fcm_token text;'), 'fcm_token column in schema');
  assert.ok(schema.includes('create table if not exists public.notifications'), 'notifications table in schema');
  assert.ok(schema.includes('create policy "Allow select own notifications" on public.notifications'), 'Notifications table has RLS select policy');
  assert.ok(schema.includes('create policy "Allow service insert notifications" on public.notifications'), 'Notifications table has RLS insert policy');
});

// 15. Supabase Edge Function FCM HTTP v1 Implementation
runTest('Supabase Edge Function implements secure FCM HTTP v1 without leaking secrets', () => {
  const edgeFn = fs.readFileSync(path.join(__dirname, '../supabase/functions/send-push-notification/index.ts'), 'utf8');
  assert.ok(edgeFn.includes('fcm.googleapis.com/v1/projects'), 'Edge Function targets FCM HTTP v1 API');
  assert.ok(edgeFn.includes('getGoogleAccessToken'), 'Edge Function generates OAuth2 access token via RS256 JWT');
  assert.ok(edgeFn.includes('UNREGISTERED') && edgeFn.includes('fcm_token: null'), 'Edge Function purges expired/dead tokens from profiles');
  assert.ok(edgeFn.includes('idempotencyKey'), 'Edge Function protects against duplicate sends');
});

// 16. Legal Compliance & Google Play UGC Requirements
runTest('Legal compliance: Terms of Service, Grievance Officer, and UGC Report mechanism are configured', () => {
  assert.ok(fs.existsSync(path.join(__dirname, '../terms.html')), 'terms.html exists in root');
  assert.ok(fs.existsSync(path.join(__dirname, '../privacy-policy.html')), 'privacy-policy.html exists in root');
  const terms = fs.readFileSync(path.join(__dirname, '../terms.html'), 'utf8');
  const privacy = fs.readFileSync(path.join(__dirname, '../privacy-policy.html'), 'utf8');
  const engine = fs.readFileSync(path.join(__dirname, '../js/nammude-naadu-engine.js'), 'utf8');
  const indexHtml = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');

  assert.ok(terms.includes('Section 79'), 'Terms of Service specifies IT Act Section 79 intermediary status');
  assert.ok(terms.includes('Grievance Officer'), 'Terms of Service specifies statutory Grievance Officer');
  assert.ok(privacy.includes('DPDP Act') || privacy.includes('Grievance'), 'Privacy Policy includes statutory grievance redressal cell');
  assert.ok(engine.includes('function reportPost'), 'Engine implements UGC reportPost function');
  assert.ok(indexHtml.includes('terms.html'), 'index.html links to terms.html');
});

console.log(`\n========================================`);
console.log(`🏁 Test Results: ${passedTests} passed, ${failedTests} failed.`);
console.log(`========================================\n`);

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
