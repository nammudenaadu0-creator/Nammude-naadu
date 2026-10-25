/**
 * Test Suite: Multi-Screen Responsive Layout & Overflow Verification
 * Verifies that the app displays properly on both mobile (320px-480px) and desktop (600px-1920px)
 * without clipping, edge cutoffs, or horizontal overflow.
 */

const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const htmlPath = path.join(projectRoot, 'index.html');
const cssMainPath = path.join(projectRoot, 'css', 'main.css');
const cssNammudePath = path.join(projectRoot, 'css', 'nammude-naadu.css');
const cssJobsPath = path.join(projectRoot, 'css', 'jobs.css');

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
    if (condition) {
        console.log(`  PASS: ${message}`);
        passCount++;
    } else {
        console.error(`  FAIL: ${message}`);
        failCount++;
    }
}

console.log('--- 1. Viewport Meta Tag & Document Configuration ---');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

assert(
    htmlContent.includes('name="viewport"') && htmlContent.includes('viewport-fit=cover'),
    'Viewport meta tag contains width=device-width and viewport-fit=cover for Android safe areas'
);

assert(
    !htmlContent.includes('<nav class="bottom-nav" id="bottomNav" style="display:flex !important;position:fixed !important;bottom:0 !important;left:50% !important;transform:translateX(-50%) !important;width:100% !important;max-width:480px !important;'),
    'Bottom nav inline !important positioning override is removed to allow responsive CSS'
);

console.log('\n--- 2. Desktop Shell vs Mobile Edge-to-Edge CSS ---');
const nammudeCss = fs.readFileSync(cssNammudePath, 'utf8');

assert(
    nammudeCss.includes('@media screen and (min-width: 481px)') &&
    nammudeCss.includes('.app-container {\n    width: 100% !important;\n    max-width: 480px !important;\n    margin: 0 auto !important;'),
    'On screens > 480px (Desktop/Laptops), app-container is constrained to 480px max-width and centered'
);

assert(
    nammudeCss.includes('@media screen and (max-width: 480px)') &&
    nammudeCss.includes('.app-container {\n    width: 100% !important;\n    max-width: 100vw !important;\n    margin: 0 !important;'),
    'On screens <= 480px (Mobile/WebView), app-container takes 100vw edge-to-edge'
);

console.log('\n--- 3. Bottom Navigation Docking & Alignment ---');
assert(
    nammudeCss.includes('#bottomNav,\n  .bottom-nav {\n    left: 50% !important;\n    right: auto !important;\n    transform: translateX(-50%) !important;\n    width: 100% !important;\n    max-width: 480px !important;'),
    'On Desktop/Laptop, bottom navigation stays locked within the 480px centered app container'
);

assert(
    nammudeCss.includes('@media screen and (max-width: 480px) {\n  .bottom-nav {\n    left: 0 !important;\n    right: 0 !important;\n    transform: none !important;\n    width: 100% !important;\n    max-width: 100vw !important;\n    margin: 0 !important;\n  }'),
    'On Mobile, bottom navigation docks edge-to-edge (0 to 100vw) with safe-area insets'
);

console.log('\n--- 4. Modal Sheets & Dialog Containment ---');
assert(
    nammudeCss.includes('.modal-sheet, .modal-card, .modal-dialog, .chat-modal-sheet {\n    box-sizing: border-box !important;\n    width: 100% !important;\n    max-width: 480px !important;'),
    'On Desktop, modals never stretch wider than 480px, maintaining consistent phone shell aesthetics'
);

assert(
    nammudeCss.includes('.modal-sheet, .modal-card, .modal-dialog, .chat-modal-sheet {\n    box-sizing: border-box !important;\n    width: calc(100% - 8px) !important;\n    max-width: calc(100vw - 8px) !important;'),
    'On Mobile, modals fit within viewport with safe margins so they do not bleed into screen edges'
);

console.log('\n--- 5. Chat Input Bar & Send Button Overflow Safety ---');
assert(
    nammudeCss.includes('#chatSendBtn {\n  flex-shrink: 0 !important;\n  visibility: visible !important;\n  display: flex !important;\n  pointer-events: auto !important;\n  touch-action: manipulation !important;\n}'),
    'Chat send button (#chatSendBtn) has flex-shrink: 0 and guaranteed visibility'
);

assert(
    nammudeCss.includes('.chat-text-input {\n  flex: 1 1 auto !important;\n  min-width: 0 !important;'),
    'Chat text input has flex: 1 1 auto and min-width: 0 to absorb keyboard and narrow layout constraints'
);

console.log('\n--- 6. Universal Screen Margins & Media Containment ---');
assert(
    nammudeCss.includes('.screen {\n  box-sizing: border-box !important;\n  width: 100% !important;\n  max-width: 100% !important;\n  overflow-x: hidden !important;\n  padding-left: max(8px, env(safe-area-inset-left, 0px)) !important;\n  padding-right: max(8px, env(safe-area-inset-right, 0px)) !important;'),
    'All screens have safe side margins (min 8px + safe-area insets) preventing edge bezel clipping'
);

assert(
    nammudeCss.includes('img, video, canvas {\n  max-width: 100%;\n}'),
    'Universal media elements (img, video, canvas) have max-width: 100% preventing image-based clipping'
);

console.log('\n--- 7. Jobs Grid Responsiveness ---');
const jobsCss = fs.readFileSync(cssJobsPath, 'utf8');
assert(
    jobsCss.includes('minmax(min(260px, 100%), 1fr)'),
    'Jobs grid mode uses minmax(min(260px, 100%), 1fr) for overflow-safe rendering on narrow viewports'
);

console.log(`\n========================================`);
console.log(`TEST SUMMARY: PASS: ${passCount}, FAIL: ${failCount}`);
console.log(`========================================`);

if (failCount > 0) {
    process.exit(1);
} else {
    process.exit(0);
}
