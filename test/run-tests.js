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

  const expectedVersion = '1.0.23';
  assert.strictEqual(pkg.version, expectedVersion, `package.json version is ${pkg.version}`);
  assert.strictEqual(pkgLock.version, expectedVersion, `package-lock.json version is ${pkgLock.version}`);
  assert.strictEqual(versionJson.versionName, expectedVersion, `version.json versionName is ${versionJson.versionName}`);
  assert.ok(buildGradle.includes(`versionName "${expectedVersion}"`), 'build.gradle versionName matches');
  assert.ok(buildGradle.includes(`versionCode 23`), 'build.gradle versionCode is 23');
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

console.log(`\n========================================`);
console.log(`🏁 Test Results: ${passedTests} passed, ${failedTests} failed.`);
console.log(`========================================\n`);

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
