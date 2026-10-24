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

  const expectedVersion = '1.0.24';
  assert.strictEqual(pkg.version, expectedVersion, `package.json version is ${pkg.version}`);
  assert.strictEqual(pkgLock.version, expectedVersion, `package-lock.json version is ${pkgLock.version}`);
  assert.strictEqual(versionJson.versionName, expectedVersion, `version.json versionName is ${versionJson.versionName}`);
  assert.ok(buildGradle.includes(`versionName "${expectedVersion}"`), 'build.gradle versionName matches');
  assert.ok(buildGradle.includes(`versionCode 24`), 'build.gradle versionCode is 24');
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

console.log(`\n========================================`);
console.log(`🏁 Test Results: ${passedTests} passed, ${failedTests} failed.`);
console.log(`========================================\n`);

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
